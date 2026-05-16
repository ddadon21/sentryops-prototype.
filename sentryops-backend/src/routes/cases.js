'use strict';

const express         = require('express');
const PDFDocument     = require('pdfkit');
const { pool }        = require('../../db');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

router.use(requireAuth);

const VALID_PRIORITIES = ['low', 'medium', 'high', 'critical'];
const VALID_STATUSES   = ['submitted', 'in_progress', 'pending_review', 'pending_signature', 'complete'];

// Priority sort order for consistent list ordering
const PRIORITY_ORDER = `CASE c.priority
  WHEN 'critical' THEN 1
  WHEN 'high'     THEN 2
  WHEN 'medium'   THEN 3
  WHEN 'low'      THEN 4
  ELSE 5 END`;

async function writeAuditLog(client, { user_id, action, record_id, notes }) {
  await client.query(
    `INSERT INTO audit_log (user_id, action, table_affected, record_id, notes)
     VALUES ($1, $2, 'cases', $3, $4)`,
    [user_id, action, record_id, notes ?? null]
  );
}

// ---------------------------------------------------------------------------
// POST /cases — create a new background investigation case
// ---------------------------------------------------------------------------
router.post('/', async (req, res) => {
  const { candidate_id, priority, notes } = req.body;

  if (!candidate_id) {
    return res.status(400).json({ error: 'candidate_id is required.' });
  }
  if (!priority || !VALID_PRIORITIES.includes(priority)) {
    return res.status(400).json({ error: `priority must be one of: ${VALID_PRIORITIES.join(', ')}.` });
  }

  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const candidateCheck = await client.query(
      'SELECT id FROM candidates WHERE id = $1',
      [candidate_id]
    );
    if (candidateCheck.rowCount === 0) {
      await client.query('ROLLBACK');
      return res.status(404).json({ error: 'Candidate not found.' });
    }

    const result = await client.query(
      `INSERT INTO cases (candidate_id, status, priority)
       VALUES ($1, 'submitted', $2)
       RETURNING *`,
      [candidate_id, priority]
    );

    const newCase = result.rows[0];

    await writeAuditLog(client, {
      user_id:   req.user.id,
      action:    'CASE_CREATED',
      record_id: newCase.id,
      notes,
    });

    await client.query('COMMIT');
    return res.status(201).json({ case: newCase });
  } catch (err) {
    await client.query('ROLLBACK');
    if (err.code === '23503') return res.status(404).json({ error: 'Candidate not found.' });
    console.error('[cases] POST / error:', err.message);
    return res.status(500).json({ error: 'Failed to create case.' });
  } finally {
    client.release();
  }
});

// ---------------------------------------------------------------------------
// GET /cases — list all cases with candidate info joined
// Optional filters: ?status=submitted  ?investigator_id=1
// ---------------------------------------------------------------------------
router.get('/', async (req, res) => {
  const { status, investigator_id } = req.query;

  if (status && !VALID_STATUSES.includes(status)) {
    return res.status(400).json({ error: `status must be one of: ${VALID_STATUSES.join(', ')}.` });
  }

  const conditions = [];
  const params     = [];
  let   idx        = 1;

  if (status) {
    conditions.push(`c.status = $${idx++}`);
    params.push(status);
  }
  if (investigator_id) {
    conditions.push(`c.assigned_investigator_id = $${idx++}`);
    params.push(parseInt(investigator_id, 10));
  }

  const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';

  try {
    const result = await pool.query(
      `SELECT
         c.id, c.status, c.priority, c.created_at, c.updated_at,
         c.candidate_id, c.assigned_investigator_id,
         ca.first_name, ca.last_name, ca.position_applied, ca.application_date,
         ca.email AS candidate_email, ca.phone AS candidate_phone,
         u.full_name  AS investigator_name,
         u.badge_number AS investigator_badge
       FROM cases c
       JOIN candidates ca ON ca.id = c.candidate_id
       LEFT JOIN users u  ON u.id  = c.assigned_investigator_id
       ${where}
       ORDER BY ${PRIORITY_ORDER}, c.created_at DESC`,
      params
    );

    return res.json({ cases: result.rows, total: result.rowCount });
  } catch (err) {
    console.error('[cases] GET / error:', err.message);
    return res.status(500).json({ error: 'Failed to fetch cases.' });
  }
});

// ---------------------------------------------------------------------------
// GET /cases/:id — single case with candidate, documents, and audit history
// ---------------------------------------------------------------------------
router.get('/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) return res.status(400).json({ error: 'Invalid case ID.' });

  try {
    const [caseResult, docsResult, auditResult] = await Promise.all([
      pool.query(
        `SELECT
           c.*,
           ca.first_name, ca.last_name, ca.date_of_birth, ca.ssn_last_four,
           ca.phone, ca.email AS candidate_email, ca.address,
           ca.position_applied, ca.application_date,
           u.full_name    AS investigator_name,
           u.badge_number AS investigator_badge,
           u.email        AS investigator_email
         FROM cases c
         JOIN candidates ca ON ca.id = c.candidate_id
         LEFT JOIN users u  ON u.id  = c.assigned_investigator_id
         WHERE c.id = $1`,
        [id]
      ),
      pool.query(
        `SELECT d.*, u.full_name AS uploaded_by_name
         FROM documents d
         LEFT JOIN users u ON u.id = d.uploaded_by
         WHERE d.case_id = $1
         ORDER BY d.uploaded_at DESC`,
        [id]
      ),
      // Full audit trail doubles as the case notes history (CJIS 5.4)
      pool.query(
        `SELECT al.id, al.action, al.notes, al.timestamp,
                u.full_name AS actor_name, u.badge_number AS actor_badge
         FROM audit_log al
         LEFT JOIN users u ON u.id = al.user_id
         WHERE al.table_affected = 'cases' AND al.record_id = $1
         ORDER BY al.timestamp DESC`,
        [id]
      ),
    ]);

    if (caseResult.rowCount === 0) {
      return res.status(404).json({ error: 'Case not found.' });
    }

    return res.json({
      case:      caseResult.rows[0],
      documents: docsResult.rows,
      notes:     auditResult.rows,
    });
  } catch (err) {
    console.error('[cases] GET /:id error:', err.message);
    return res.status(500).json({ error: 'Failed to fetch case.' });
  }
});

// ---------------------------------------------------------------------------
// POST /cases/:id/export — generate and stream a PDF investigation report
// ---------------------------------------------------------------------------
router.post('/:id/export', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) return res.status(400).json({ error: 'Invalid case ID.' });

  let c;
  try {
    const r = await pool.query(
      `SELECT c.*,
              ca.first_name, ca.last_name, ca.date_of_birth, ca.ssn_last_four,
              ca.phone, ca.email AS candidate_email, ca.address,
              ca.position_applied, ca.application_date,
              u.full_name    AS investigator_name,
              u.badge_number AS investigator_badge
       FROM cases c
       JOIN candidates ca ON ca.id = c.candidate_id
       LEFT JOIN users u  ON u.id  = c.assigned_investigator_id
       WHERE c.id = $1`,
      [id]
    );
    if (r.rowCount === 0) return res.status(404).json({ error: 'Case not found.' });
    c = r.rows[0];
  } catch (err) {
    console.error('[cases] export fetch error:', err.message);
    return res.status(500).json({ error: 'Failed to fetch case.' });
  }

  // ── Derived values ────────────────────────────────────────────
  const caseId   = `BI-${String(c.id).padStart(7, '0')}`;
  const daysOpen = Math.max(0, Math.floor((Date.now() - new Date(c.created_at)) / 86400000));

  const STATUS_DISPLAY = {
    submitted:    'Initial Review',
    in_progress:  'In Progress',
    under_review: 'Supervisor Review',
    on_hold:      'On Hold',
    completed:    'Completed',
  };
  const NEXT_ACTION = {
    submitted:    'Complete initial document review',
    in_progress:  'Continue active investigation stages',
    under_review: 'Awaiting supervisor adjudication decision',
    on_hold:      'Awaiting applicant or external response',
    completed:    'Case closed — no further action required',
  };

  const STAGE_NAMES = [
    'Initial Review', 'Criminal History', 'Reference Checks',
    'Employment Verification', 'Financial Review', 'Supervisor Review',
  ];
  const stages = STAGE_NAMES.map((name, i) => {
    let status = 'Not Started';
    if      (c.status === 'completed')    status = 'Completed';
    else if (c.status === 'submitted')    status = i === 0 ? 'In Progress' : 'Not Started';
    else if (c.status === 'in_progress')  status = i === 0 ? 'Completed' : i === 1 ? 'In Progress' : 'Not Started';
    else if (c.status === 'under_review') status = i < 5 ? 'Completed' : 'In Progress';
    else if (c.status === 'on_hold')      status = i === 0 ? 'Completed' : i === 1 ? 'On Hold' : 'Pending';
    return { name, status };
  });

  // ── Stream PDF ────────────────────────────────────────────────
  const filename = `SentryOps-${caseId}-${new Date().toISOString().slice(0, 10)}.pdf`;
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);

  const doc = new PDFDocument({ margin: 0, size: 'LETTER' });
  doc.pipe(res);

  const PW     = doc.page.width;   // 612 pt
  const MARGIN = 50;
  const CW     = PW - MARGIN * 2;  // 512 pt

  // ── HEADER ────────────────────────────────────────────────────
  doc.rect(0, 0, PW, 72).fill('#1a2e4a');
  doc.fillColor('white').font('Helvetica-Bold').fontSize(20)
     .text('SENTRYOPS', MARGIN, 16, { characterSpacing: 3, lineBreak: false });
  doc.font('Helvetica').fontSize(9)
     .text("Gwinnett County Sheriff's Office  |  Background Investigations Unit", MARGIN, 40, { lineBreak: false });
  doc.fontSize(8)
     .text('BACKGROUND INVESTIGATION REPORT', 0, 28, { align: 'right', width: PW - MARGIN, lineBreak: false });

  // ── CASE BANNER ───────────────────────────────────────────────
  doc.rect(MARGIN, 82, CW, 32).fillAndStroke('#eef2f7', '#c8d6e8');
  doc.fillColor('#1a2e4a').font('Helvetica-Bold').fontSize(11)
     .text(`Case ID: ${caseId}`, MARGIN + 10, 91, { lineBreak: false });
  const genDate = new Date().toLocaleString('en-US', { dateStyle: 'long', timeStyle: 'short' });
  doc.fillColor('#555').font('Helvetica').fontSize(9)
     .text(`Generated: ${genDate}`, 0, 94, { align: 'right', width: PW - MARGIN - 10, lineBreak: false });
  doc.fillColor('#b91c1c').font('Helvetica-Bold').fontSize(7.5)
     .text('CONFIDENTIAL  —  LAW ENFORCEMENT SENSITIVE  —  NOT FOR PUBLIC RELEASE',
           0, 107, { align: 'center', width: PW, lineBreak: false });

  // ── Layout helpers ────────────────────────────────────────────
  let y = 132;

  const sectionHead = (title) => {
    y += 8;
    doc.rect(MARGIN, y, CW, 19).fill('#1a2e4a');
    doc.fillColor('white').font('Helvetica-Bold').fontSize(8)
       .text(title, MARGIN + 10, y + 5, { characterSpacing: 0.8, lineBreak: false });
    y += 27;
  };

  // label + value cell at fixed coordinates; does not move y
  const cell = (label, value, cx, cy, cw) => {
    doc.fillColor('#8899aa').font('Helvetica-Bold').fontSize(7)
       .text(label, cx, cy, { width: cw, lineBreak: false });
    doc.fillColor('#111111').font('Helvetica').fontSize(9.5)
       .text(String(value ?? '—'), cx, cy + 11, { width: cw, lineBreak: false });
  };

  // ── CANDIDATE INFORMATION ─────────────────────────────────────
  sectionHead('CANDIDATE INFORMATION');
  cell('FULL NAME',        `${c.first_name} ${c.last_name}`,
       MARGIN,       y, 160);
  cell('DATE OF BIRTH',    c.date_of_birth
         ? new Date(c.date_of_birth).toLocaleDateString('en-US')
         : '—',
       MARGIN + 175, y, 145);
  cell('SSN (LAST 4)',     c.ssn_last_four ? `XXX-XX-${c.ssn_last_four}` : '—',
       MARGIN + 335, y, 175);
  y += 36;

  cell('POSITION APPLIED', c.position_applied || '—', MARGIN,       y, 200);
  cell('PHONE',            c.phone            || '—', MARGIN + 215, y, 140);
  cell('EMAIL',            c.candidate_email  || '—', MARGIN + 370, y, 140);
  y += 36;

  cell('ADDRESS', c.address || '—', MARGIN, y, CW);
  y += 40;

  // ── CASE DETAILS ──────────────────────────────────────────────
  sectionHead('CASE DETAILS');
  cell('STATUS',           STATUS_DISPLAY[c.status] || c.status,  MARGIN,       y, 155);
  cell('PRIORITY',         (c.priority || '').toUpperCase(),       MARGIN + 170, y, 130);
  cell('DAYS IN PROCESS',  `${daysOpen} days  (SLA target: <18)`, MARGIN + 315, y, 195);
  y += 36;

  cell('ASSIGNED INVESTIGATOR', c.investigator_name  || 'Unassigned', MARGIN,       y, 200);
  cell('BADGE NUMBER',          c.investigator_badge || '—',           MARGIN + 215, y, 140);
  cell('OPENED',
       new Date(c.created_at).toLocaleDateString('en-US', { dateStyle: 'long' }),
       MARGIN + 370, y, 140);
  y += 42;

  // ── INVESTIGATION STAGES ─────────────────────────────────────
  sectionHead('INVESTIGATION STAGES');
  const BOX_W = 157, BOX_H = 36, BOX_GAP = 10;
  stages.forEach(({ name, status }, i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const bx  = MARGIN + col * (BOX_W + BOX_GAP);
    const by  = y + row * (BOX_H + 8);

    const bg = status === 'Completed'  ? '#d1fae5'
             : status === 'In Progress' ? '#fef3c7'
             : status === 'On Hold'     ? '#fee2e2'
             : '#f1f5f9';
    const bd = status === 'Completed'  ? '#10b981'
             : status === 'In Progress' ? '#f59e0b'
             : status === 'On Hold'     ? '#ef4444'
             : '#cbd5e1';
    const tc = status === 'Completed'  ? '#065f46'
             : status === 'In Progress' ? '#78350f'
             : status === 'On Hold'     ? '#991b1b'
             : '#64748b';

    doc.rect(bx, by, BOX_W, BOX_H).fillAndStroke(bg, bd);
    doc.fillColor('#222').font('Helvetica-Bold').fontSize(7.5)
       .text(name,   bx + 8, by + 7,  { width: BOX_W - 16, lineBreak: false });
    doc.fillColor(tc).font('Helvetica').fontSize(8)
       .text(status, bx + 8, by + 20, { width: BOX_W - 16, lineBreak: false });
  });
  y += 2 * (BOX_H + 8) + 10;

  // ── NEXT ACTION ──────────────────────────────────────────────
  sectionHead('NEXT ACTION REQUIRED');
  doc.rect(MARGIN, y, CW, 30).fillAndStroke('#fffbeb', '#fcd34d');
  doc.fillColor('#333333').font('Helvetica').fontSize(10)
     .text(NEXT_ACTION[c.status] || 'Review case details.',
           MARGIN + 12, y + 9, { width: CW - 24, lineBreak: false });
  y += 44;

  // ── FOOTER ───────────────────────────────────────────────────
  const FY = doc.page.height - 56;
  doc.rect(0, FY, PW, 56).fillAndStroke('#f8fafc', '#e2e8f0');
  doc.fillColor('#667788').font('Helvetica').fontSize(6.5)
     .text(
       'CJIS COMPLIANCE NOTICE: This document contains Criminal Justice Information (CJI) subject to FBI CJIS Security Policy v5.9. ' +
       'Unauthorized access, use, or distribution is a federal offense. Retain and destroy per GCSO Records Retention Schedule 4.12.',
       MARGIN, FY + 8, { width: CW }
     );
  doc.fillColor('#334455').font('Helvetica-Bold').fontSize(7)
     .text('CONFIDENTIAL  —  FOR AUTHORIZED LAW ENFORCEMENT USE ONLY  —  NOT FOR PUBLIC DISCLOSURE',
           MARGIN, FY + 30, { align: 'center', width: CW, lineBreak: false });
  doc.fillColor('#99aabb').font('Helvetica').fontSize(6)
     .text(
       `SentryOps Background Investigations  |  ${new Date().toISOString()}  |  ${caseId}`,
       MARGIN, FY + 43, { align: 'center', width: CW, lineBreak: false }
     );

  doc.end();
});

// ---------------------------------------------------------------------------
// PATCH /cases/:id/status — update case status, log every change
// ---------------------------------------------------------------------------
router.patch('/:id/status', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) return res.status(400).json({ error: 'Invalid case ID.' });

  const { status, notes } = req.body;

  if (!status || !VALID_STATUSES.includes(status)) {
    return res.status(400).json({ error: `status must be one of: ${VALID_STATUSES.join(', ')}.` });
  }

  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const result = await client.query(
      `UPDATE cases
       SET status = $1, updated_at = NOW()
       WHERE id = $2
       RETURNING *`,
      [status, id]
    );

    if (result.rowCount === 0) {
      await client.query('ROLLBACK');
      return res.status(404).json({ error: 'Case not found.' });
    }

    await writeAuditLog(client, {
      user_id:   req.user.id,
      action:    `STATUS_CHANGED_TO_${status.toUpperCase()}`,
      record_id: id,
      notes,
    });

    await client.query('COMMIT');
    return res.json({ case: result.rows[0] });
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('[cases] PATCH /:id/status error:', err.message);
    return res.status(500).json({ error: 'Failed to update status.' });
  } finally {
    client.release();
  }
});

// ---------------------------------------------------------------------------
// PATCH /cases/:id/assign — assign an investigator to a case
// ---------------------------------------------------------------------------
router.patch('/:id/assign', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) return res.status(400).json({ error: 'Invalid case ID.' });

  const { investigator_id } = req.body;
  if (!investigator_id) {
    return res.status(400).json({ error: 'investigator_id is required.' });
  }

  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const invResult = await client.query(
      'SELECT id, full_name, badge_number, role FROM users WHERE id = $1',
      [investigator_id]
    );
    if (invResult.rowCount === 0) {
      await client.query('ROLLBACK');
      return res.status(404).json({ error: 'Investigator not found.' });
    }

    const investigator = invResult.rows[0];

    const result = await client.query(
      `UPDATE cases
       SET assigned_investigator_id = $1, updated_at = NOW()
       WHERE id = $2
       RETURNING *`,
      [investigator_id, id]
    );

    if (result.rowCount === 0) {
      await client.query('ROLLBACK');
      return res.status(404).json({ error: 'Case not found.' });
    }

    await writeAuditLog(client, {
      user_id:   req.user.id,
      action:    'INVESTIGATOR_ASSIGNED',
      record_id: id,
      notes:     `Assigned to ${investigator.full_name} (badge: ${investigator.badge_number ?? 'N/A'})`,
    });

    await client.query('COMMIT');
    return res.json({ case: result.rows[0], investigator });
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('[cases] PATCH /:id/assign error:', err.message);
    return res.status(500).json({ error: 'Failed to assign investigator.' });
  } finally {
    client.release();
  }
});

module.exports = router;

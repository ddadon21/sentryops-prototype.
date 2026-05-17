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
// POST /cases/:id/export — generate and stream a professionally designed PDF
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

  // Color palette
  const NAVY        = '#0a1f3d';
  const NAVY_MID    = '#112d52';
  const GOLD        = '#c9a84c';
  const GRAY_BG     = '#f7f8fa';
  const CREAM       = '#fdf8ee';
  const TEXT_MUTED  = '#888888';
  const GREEN_DARK  = '#1e4d2b';
  const GREEN_LIGHT = '#7fc99a';

  // ── Derived values ────────────────────────────────────────────
  const caseId   = `BI-${String(c.id).padStart(7, '0')}`;
  const daysOpen = Math.max(0, Math.floor((Date.now() - new Date(c.created_at)) / 86400000));

  const now      = new Date();
  const dateStr  = now.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'America/New_York' });
  const timeStr  = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true, timeZone: 'America/New_York' });
  const genTimestamp = `${dateStr} · ${timeStr} EST`;

  const STATUS_LABEL = {
    submitted:         'Submitted',
    in_progress:       'In Progress',
    pending_review:    'Pending Review',
    pending_signature: 'Pending Signature',
    complete:          'Complete',
  };
  const NEXT_ACTION = {
    submitted:         'Complete initial document review and verify all applicant materials.',
    in_progress:       'Continue active investigation — all stages must be completed before supervisor review.',
    pending_review:    'Awaiting supervisor adjudication decision.',
    pending_signature: 'Pending supervisor signature before case can be closed.',
    complete:          'Case closed — no further action required.',
  };

  const STAGE_NAMES = [
    'Initial Review', 'Criminal History', 'Reference Checks',
    'Employment Verification', 'Financial Review', 'Supervisor Review',
  ];
  const stages = STAGE_NAMES.map((name, i) => {
    let status = 'Not Started';
    if      (c.status === 'complete')          status = 'Completed';
    else if (c.status === 'submitted')         status = i === 0 ? 'In Progress' : 'Not Started';
    else if (c.status === 'in_progress')       status = i === 0 ? 'Completed' : i === 1 ? 'In Progress' : 'Not Started';
    else if (c.status === 'pending_review')    status = i < 5   ? 'Completed' : 'In Progress';
    else if (c.status === 'pending_signature') status = 'Completed';
    return { name, status };
  });

  // ── Stream PDF ────────────────────────────────────────────────
  const filename = `SentryOps-${caseId}-${now.toISOString().slice(0, 10)}.pdf`;
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);

  const doc = new PDFDocument({ margin: 0, size: 'LETTER' });
  doc.pipe(res);

  const PW     = doc.page.width;   // 612 pt
  const PH     = doc.page.height;  // 792 pt
  const MARGIN = 44;
  const CW     = PW - MARGIN * 2;  // 524 pt

  // ── 1. NAVY HEADER BLOCK ──────────────────────────────────────
  doc.rect(0, 0, PW, 80).fill(NAVY);
  doc.rect(MARGIN, 16, 6, 48).fill(GOLD);
  doc.fillColor('white').font('Helvetica-Bold').fontSize(16)
     .text('SENTRYOPS', MARGIN + 16, 20, { characterSpacing: 2, lineBreak: false });
  doc.fillColor(GOLD).font('Helvetica-Bold').fontSize(7.5)
     .text('BACKGROUND INVESTIGATIONS UNIT', MARGIN + 16, 42, { characterSpacing: 1.5, lineBreak: false });
  doc.fillColor('white').font('Helvetica').fontSize(8)
     .text("Gwinnett County Sheriff's Office", MARGIN + 16, 57, { lineBreak: false });
  doc.fillColor(GOLD).font('Helvetica-Bold').fontSize(8.5)
     .text('BACKGROUND INVESTIGATION REPORT', 0, 28, { align: 'right', width: PW - MARGIN, lineBreak: false });
  doc.fillColor('#aabbcc').font('Helvetica').fontSize(7.5)
     .text('CONFIDENTIAL  ·  LAW ENFORCEMENT SENSITIVE', 0, 44, { align: 'right', width: PW - MARGIN, lineBreak: false });

  // ── 2. CASE ID BANNER ─────────────────────────────────────────
  doc.rect(0, 80, PW, 38).fill(NAVY_MID);
  doc.rect(0, 80, 4, 38).fill(GOLD);
  doc.fillColor(GOLD).font('Helvetica-Bold').fontSize(13)
     .text(caseId, MARGIN, 91, { characterSpacing: 1, lineBreak: false });
  doc.fillColor('#ccddee').font('Helvetica').fontSize(8)
     .text(`Generated: ${genTimestamp}`, 0, 95, { align: 'right', width: PW - MARGIN, lineBreak: false });

  let y = 136;

  // ── Helper: navy section heading bar ─────────────────────────
  const secHead = (title) => {
    y += 10;
    doc.rect(MARGIN, y, CW, 20).fill(NAVY);
    doc.rect(MARGIN, y, 3, 20).fill(GOLD);
    doc.fillColor('white').font('Helvetica-Bold').fontSize(7.5)
       .text(title, MARGIN + 12, y + 6, { characterSpacing: 1, lineBreak: false });
    y += 28;
  };

  // ── Helper: label-value (does NOT advance y) ──────────────────
  const lv = (label, value, cx, cy, cw) => {
    doc.fillColor(TEXT_MUTED).font('Helvetica-Bold').fontSize(6.5)
       .text(label, cx, cy, { width: cw, lineBreak: false });
    doc.fillColor('#111111').font('Helvetica').fontSize(9)
       .text(String(value ?? '—'), cx, cy + 10, { width: cw, lineBreak: false });
  };

  // ── Helper: shaded detail box ─────────────────────────────────
  const detailBox = (label, value, bx, by, bw, bh, bg) => {
    doc.rect(bx, by, bw, bh).fill(bg || GRAY_BG);
    lv(label, value, bx + 8, by + 7, bw - 16);
  };

  // ── Helper: investigation stage card ─────────────────────────
  const stageCard = (name, status, bx, by, bw, bh) => {
    const bg          = status === 'Completed'   ? '#dff6ea' : status === 'In Progress' ? CREAM       : '#f2f4f7';
    const borderColor = status === 'Completed'   ? GREEN_LIGHT : status === 'In Progress' ? GOLD      : '#d0d5dd';
    const statusColor = status === 'Completed'   ? GREEN_DARK  : status === 'In Progress' ? '#7a5c00' : '#555555';
    const dot         = status === 'Completed'   ? GREEN_LIGHT : status === 'In Progress' ? GOLD      : '#aaaaaa';

    doc.rect(bx, by, bw, bh).fill(bg);
    doc.rect(bx, by, 3, bh).fill(borderColor);
    doc.fillColor('#222222').font('Helvetica-Bold').fontSize(7.5)
       .text(name, bx + 10, by + 8, { width: bw - 20, lineBreak: false });
    doc.circle(bx + 13, by + bh - 13, 3).fill(dot);
    doc.fillColor(statusColor).font('Helvetica').fontSize(7.5)
       .text(status, bx + 22, by + bh - 18, { width: bw - 32, lineBreak: false });
  };

  // ── 3. CANDIDATE INFORMATION ──────────────────────────────────
  secHead('CANDIDATE INFORMATION');

  const COL3 = Math.floor(CW / 3);
  detailBox('FULL NAME',      `${c.first_name} ${c.last_name}`,                                          MARGIN,            y, COL3 - 6, 42, GRAY_BG);
  detailBox('DATE OF BIRTH',  c.date_of_birth ? new Date(c.date_of_birth).toLocaleDateString('en-US') : '—', MARGIN + COL3, y, COL3 - 6, 42, GRAY_BG);
  detailBox('SSN (LAST 4)',   c.ssn_last_four ? `XXX-XX-${c.ssn_last_four}` : '—',                      MARGIN + COL3 * 2, y, COL3,     42, GRAY_BG);
  y += 50;

  detailBox('POSITION APPLIED', c.position_applied || '—', MARGIN,            y, COL3 - 6, 42, GRAY_BG);
  detailBox('PHONE',            c.phone            || '—', MARGIN + COL3,     y, COL3 - 6, 42, GRAY_BG);
  detailBox('EMAIL',            c.candidate_email  || '—', MARGIN + COL3 * 2, y, COL3,     42, GRAY_BG);
  y += 50;

  detailBox('ADDRESS', c.address || '—', MARGIN, y, CW, 34, GRAY_BG);
  y += 42;

  // ── 4. CASE DETAILS ───────────────────────────────────────────
  secHead('CASE DETAILS');

  const COL4 = Math.floor(CW / 4);
  detailBox('STATUS',          STATUS_LABEL[c.status] || c.status,   MARGIN,            y, COL4 - 5, 42, CREAM);
  detailBox('PRIORITY',        (c.priority || '').toUpperCase(),      MARGIN + COL4,     y, COL4 - 5, 42, CREAM);
  detailBox('DAYS IN PROCESS', `${daysOpen} days`,                    MARGIN + COL4 * 2, y, COL4 - 5, 42, CREAM);
  detailBox('DATE OPENED',
    new Date(c.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    MARGIN + COL4 * 3, y, COL4, 42, CREAM);
  y += 50;

  // Investigator row — omit badge field entirely when absent
  const investigatorName = c.investigator_name || 'Pending Assignment';
  if (c.investigator_badge) {
    const INV_W = Math.floor(CW * 0.55);
    const BDG_W = CW - INV_W - 6;
    detailBox('ASSIGNED INVESTIGATOR', investigatorName,      MARGIN,              y, INV_W, 36, CREAM);
    detailBox('BADGE NUMBER',          c.investigator_badge,  MARGIN + INV_W + 6,  y, BDG_W, 36, CREAM);
  } else {
    detailBox('ASSIGNED INVESTIGATOR', investigatorName, MARGIN, y, CW, 36, CREAM);
  }
  y += 44;

  // ── 5. INVESTIGATION STAGES ───────────────────────────────────
  secHead('INVESTIGATION STAGES');

  const SCOLS    = 3;
  const SGAP     = 8;
  const SW       = Math.floor((CW - SGAP * (SCOLS - 1)) / SCOLS);
  const SH       = 52;
  const SROW_GAP = 8;

  stages.forEach(({ name, status }, i) => {
    const col = i % SCOLS;
    const row = Math.floor(i / SCOLS);
    stageCard(name, status, MARGIN + col * (SW + SGAP), y + row * (SH + SROW_GAP), SW, SH);
  });
  y += Math.ceil(stages.length / SCOLS) * (SH + SROW_GAP) + 4;

  // ── 6. NEXT ACTION ────────────────────────────────────────────
  secHead('NEXT ACTION REQUIRED');
  const ACTION_H   = 36;
  const actionText = NEXT_ACTION[c.status] || 'Review case details and proceed accordingly.';
  doc.rect(MARGIN, y, CW, ACTION_H).fill('#fffaeb');
  doc.rect(MARGIN, y, 4, ACTION_H).fill(GOLD);
  doc.fillColor('#444400').font('Helvetica-Bold').fontSize(8)
     .text('ACTION:', MARGIN + 12, y + 10, { lineBreak: false });
  doc.fillColor('#333300').font('Helvetica').fontSize(9)
     .text(actionText, MARGIN + 58, y + 9, { width: CW - 70, lineBreak: false });
  y += ACTION_H + 10;

  // ── 7. NAVY FOOTER ────────────────────────────────────────────
  const FH = 52;
  const FY = PH - FH;
  doc.rect(0, FY, PW, FH).fill(NAVY);
  doc.rect(0, FY, PW, 1).fill(GOLD);
  doc.fillColor('#aabbcc').font('Helvetica').fontSize(6.5)
     .text(
       'CJIS COMPLIANCE NOTICE: This document contains Criminal Justice Information (CJI) subject to FBI CJIS Security Policy v5.9. ' +
       'Unauthorized access, use, or distribution is a federal offense. Retain and destroy per GCSO Records Retention Schedule 4.12.',
       MARGIN, FY + 10, { width: CW, align: 'center' }
     );
  doc.fillColor(GOLD).font('Helvetica-Bold').fontSize(6.5)
     .text(
       `SentryOps  ·  ${caseId}  ·  ${genTimestamp}  ·  FOR AUTHORIZED LAW ENFORCEMENT USE ONLY`,
       MARGIN, FY + 34, { width: CW, align: 'center', lineBreak: false }
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

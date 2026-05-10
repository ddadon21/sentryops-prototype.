'use strict';

const express             = require('express');
const { pool }            = require('../../db');
const { requireAuth }     = require('../middleware/auth');

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

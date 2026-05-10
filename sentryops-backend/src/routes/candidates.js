'use strict';

const express         = require('express');
const { pool }        = require('../../db');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

router.use(requireAuth);

// ---------------------------------------------------------------------------
// POST /candidates — create a new candidate record
// ---------------------------------------------------------------------------
router.post('/', async (req, res) => {
  const {
    first_name,
    last_name,
    date_of_birth,
    ssn_last_four,
    phone,
    email,
    address,
    position_applied,
    application_date,
  } = req.body;

  if (!first_name || !last_name || !date_of_birth || !ssn_last_four) {
    return res.status(400).json({
      error: 'first_name, last_name, date_of_birth, and ssn_last_four are required.',
    });
  }
  if (!/^\d{4}$/.test(ssn_last_four)) {
    return res.status(400).json({ error: 'ssn_last_four must be exactly 4 digits.' });
  }

  try {
    const result = await pool.query(
      `INSERT INTO candidates
         (first_name, last_name, date_of_birth, ssn_last_four,
          phone, email, address, position_applied, application_date)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
       RETURNING *`,
      [
        first_name.trim(),
        last_name.trim(),
        date_of_birth,
        ssn_last_four,
        phone            ?? null,
        email?.trim()    ?? null,
        address          ?? null,
        position_applied ?? null,
        application_date ?? null,
      ]
    );

    // Audit the creation (CJIS 5.4 — sensitive PII record created)
    await pool.query(
      `INSERT INTO audit_log (user_id, action, table_affected, record_id)
       VALUES ($1, 'CANDIDATE_CREATED', 'candidates', $2)`,
      [req.user.id, result.rows[0].id]
    );

    return res.status(201).json({ candidate: result.rows[0] });
  } catch (err) {
    console.error('[candidates] POST / error:', err.message);
    return res.status(500).json({ error: 'Failed to create candidate.' });
  }
});

module.exports = router;

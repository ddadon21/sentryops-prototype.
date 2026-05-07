'use strict';

const express  = require('express');
const bcrypt   = require('bcryptjs');
const jwt      = require('jsonwebtoken');
const { pool } = require('../../db');

const router = express.Router();

const VALID_ROLES   = ['investigator', 'supervisor', 'hr', 'command'];
const BCRYPT_ROUNDS = 12; // NIST 800-63B recommends slowing brute-force; 12 is production-safe
const TOKEN_TTL     = '8h'; // Matches a standard law-enforcement shift length

function signToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: TOKEN_TTL, algorithm: 'HS256' }
  );
}

// ---------------------------------------------------------------------------
// POST /auth/register
// ---------------------------------------------------------------------------
router.post('/register', async (req, res) => {
  const { email, password, full_name, role, badge_number } = req.body;

  // --- Input validation ---
  if (!email || !password || !full_name || !role) {
    return res.status(400).json({ error: 'email, password, full_name, and role are required.' });
  }
  if (!VALID_ROLES.includes(role)) {
    return res.status(400).json({ error: `role must be one of: ${VALID_ROLES.join(', ')}.` });
  }
  if (password.length < 12) {
    return res.status(400).json({ error: 'Password must be at least 12 characters (CJIS policy 5.6.2.1).' });
  }
  // Basic email shape check — full validation happens at the DB unique constraint
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Invalid email address.' });
  }

  try {
    const password_hash = await bcrypt.hash(password, BCRYPT_ROUNDS);

    const result = await pool.query(
      `INSERT INTO users (email, password_hash, role, full_name, badge_number)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, email, role, full_name, badge_number, created_at`,
      [email.toLowerCase().trim(), password_hash, role, full_name.trim(), badge_number || null]
    );

    const user  = result.rows[0];
    const token = signToken(user);

    // Write to audit_log — every account creation must be traceable (CJIS 5.4)
    await pool.query(
      `INSERT INTO audit_log (user_id, action, table_affected, record_id)
       VALUES ($1, 'USER_REGISTERED', 'users', $2)`,
      [user.id, user.id]
    );

    return res.status(201).json({
      token,
      user: { id: user.id, email: user.email, role: user.role, full_name: user.full_name, badge_number: user.badge_number },
    });
  } catch (err) {
    // Unique constraint on email or badge_number
    if (err.code === '23505') {
      const field = err.constraint?.includes('badge') ? 'badge_number' : 'email';
      return res.status(409).json({ error: `An account with that ${field} already exists.` });
    }
    console.error('[auth] register error:', err.message);
    return res.status(500).json({ error: 'Registration failed. Please try again.' });
  }
});

// ---------------------------------------------------------------------------
// POST /auth/login
// ---------------------------------------------------------------------------
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'email and password are required.' });
  }

  try {
    const result = await pool.query(
      'SELECT id, email, password_hash, role, full_name, badge_number FROM users WHERE email = $1',
      [email.toLowerCase().trim()]
    );

    const user = result.rows[0];

    // Use a constant-time compare for the not-found path too — prevents
    // timing attacks that could reveal whether an email exists in the system.
    const dummyHash = '$2a$12$invalidhashusedfortimingattackprevention000000000000000';
    const match     = await bcrypt.compare(password, user?.password_hash ?? dummyHash);

    if (!user || !match) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const token = signToken(user);

    // Audit every login (CJIS 5.4 — access accountability)
    await pool.query(
      `INSERT INTO audit_log (user_id, action, table_affected, record_id)
       VALUES ($1, 'USER_LOGIN', 'users', $2)`,
      [user.id, user.id]
    );

    return res.json({
      token,
      user: { id: user.id, email: user.email, role: user.role, full_name: user.full_name, badge_number: user.badge_number },
    });
  } catch (err) {
    console.error('[auth] login error:', err.message);
    return res.status(500).json({ error: 'Login failed. Please try again.' });
  }
});

module.exports = router;

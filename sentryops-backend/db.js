'use strict';

require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }, // required for Supabase
  idleTimeoutMillis:       30000,
  connectionTimeoutMillis: 5000,
});

async function initializeTables() {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // users — platform accounts with role-based access
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id            SERIAL PRIMARY KEY,
        email         VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        role          VARCHAR(20)  NOT NULL
                        CHECK (role IN ('investigator', 'supervisor', 'hr', 'command')),
        full_name     VARCHAR(255) NOT NULL,
        badge_number  VARCHAR(100) UNIQUE,
        created_at    TIMESTAMPTZ  NOT NULL DEFAULT NOW()
      );
    `);

    // candidates — individuals under background investigation
    await client.query(`
      CREATE TABLE IF NOT EXISTS candidates (
        id               SERIAL PRIMARY KEY,
        first_name       VARCHAR(255) NOT NULL,
        last_name        VARCHAR(255) NOT NULL,
        date_of_birth    DATE         NOT NULL,
        ssn_last_four    CHAR(4)      NOT NULL,
        phone            VARCHAR(20),
        email            VARCHAR(255),
        address          TEXT,
        position_applied VARCHAR(255),
        application_date DATE,
        created_at       TIMESTAMPTZ  NOT NULL DEFAULT NOW()
      );
    `);

    // cases — one investigation per candidate assignment
    await client.query(`
      CREATE TABLE IF NOT EXISTS cases (
        id                       SERIAL PRIMARY KEY,
        candidate_id             INTEGER NOT NULL
                                   REFERENCES candidates(id) ON DELETE RESTRICT,
        assigned_investigator_id INTEGER
                                   REFERENCES users(id) ON DELETE SET NULL,
        status                   VARCHAR(30) NOT NULL DEFAULT 'submitted'
                                   CHECK (status IN (
                                     'submitted',
                                     'in_progress',
                                     'pending_review',
                                     'pending_signature',
                                     'complete'
                                   )),
        priority                 VARCHAR(20),
        created_at               TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at               TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    // documents — files attached to a case
    await client.query(`
      CREATE TABLE IF NOT EXISTS documents (
        id          SERIAL PRIMARY KEY,
        case_id     INTEGER      NOT NULL REFERENCES cases(id) ON DELETE CASCADE,
        file_name   VARCHAR(255) NOT NULL,
        file_url    TEXT         NOT NULL,
        file_type   VARCHAR(100),
        uploaded_by INTEGER      REFERENCES users(id) ON DELETE SET NULL,
        uploaded_at TIMESTAMPTZ  NOT NULL DEFAULT NOW()
      );
    `);

    // audit_log — immutable record of every significant action (CJIS requirement)
    await client.query(`
      CREATE TABLE IF NOT EXISTS audit_log (
        id             SERIAL PRIMARY KEY,
        user_id        INTEGER REFERENCES users(id) ON DELETE SET NULL,
        action         VARCHAR(255) NOT NULL,
        table_affected VARCHAR(100),
        record_id      INTEGER,
        timestamp      TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    await client.query('COMMIT');
    console.log('[db] All tables verified / created.');
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
}

module.exports = { pool, initializeTables };

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
        notes          TEXT,
        timestamp      TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    // Migrate: add notes column to audit_log if it was created before this column existed
    await client.query(`
      ALTER TABLE audit_log ADD COLUMN IF NOT EXISTS notes TEXT;
    `);

    // Migrate: candidates table may have been created before these columns were added
    await client.query(`
      ALTER TABLE candidates ADD COLUMN IF NOT EXISTS position_applied VARCHAR(255);
    `);
    await client.query(`
      ALTER TABLE candidates ADD COLUMN IF NOT EXISTS application_date DATE;
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

// ---------------------------------------------------------------------------
// seedDemoData — inserts GCSO demo candidates/cases if they don't exist yet.
// Idempotent: guarded by checking for Darius Thompson's candidate record.
// ---------------------------------------------------------------------------
async function seedDemoData() {
  const client = await pool.connect();
  try {
    // Patch any demo candidates that were inserted before position_applied column existed
    const patches = [
      { first_name: 'Darius',   last_name: 'Thompson', position: 'Deputy Sheriff',       app_date: '2026-05-06' },
      { first_name: 'Ashley',   last_name: 'Reeves',   position: 'Correctional Officer', app_date: '2026-05-10' },
      { first_name: 'James',    last_name: 'Okafor',   position: 'Deputy Sheriff',       app_date: '2026-05-02' },
      { first_name: 'Brittany', last_name: 'Salazar',  position: 'Communications Officer', app_date: '2026-05-13' },
    ];
    for (const p of patches) {
      await client.query(
        `UPDATE candidates SET position_applied = $1, application_date = $2
         WHERE first_name = $3 AND last_name = $4 AND position_applied IS NULL`,
        [p.position, p.app_date, p.first_name, p.last_name]
      );
    }

    const check = await client.query(
      `SELECT id FROM candidates WHERE first_name = 'Darius' AND last_name = 'Thompson' LIMIT 1`
    );
    if (check.rowCount > 0) {
      console.log('[seed] Demo candidates already present — skipping inserts.');
      return;
    }

    const now = Date.now();
    const daysAgo = (n) => new Date(now - n * 86400000).toISOString();

    const demos = [
      {
        first_name: 'Darius',   last_name: 'Thompson',
        dob: '1995-03-22', ssn: '3847', phone: '678-555-0247',
        email: 'darius.thompson@gmail.com',
        address: '2847 Sugarloaf Pkwy, Lawrenceville, GA 30045',
        position: 'Deputy Sheriff',     app_date: '2026-05-06',
        status: 'in_progress',  priority: 'high',   days: 12,
      },
      {
        first_name: 'Ashley',   last_name: 'Reeves',
        dob: '1991-08-14', ssn: '5291', phone: '770-555-0318',
        email: 'ashley.reeves@gmail.com',
        address: '1124 Pleasant Hill Rd, Duluth, GA 30096',
        position: 'Correctional Officer', app_date: '2026-05-10',
        status: 'in_progress',  priority: 'medium', days: 8,
      },
      {
        first_name: 'James',    last_name: 'Okafor',
        dob: '1988-11-30', ssn: '7463', phone: '678-555-0491',
        email: 'james.okafor@outlook.com',
        address: '3391 Satellite Blvd Apt 204, Duluth, GA 30096',
        position: 'Deputy Sheriff',     app_date: '2026-05-02',
        status: 'pending_review', priority: 'high',  days: 16,
      },
      {
        first_name: 'Brittany', last_name: 'Salazar',
        dob: '1997-02-07', ssn: '2918', phone: '770-555-0162',
        email: 'brittany.salazar@yahoo.com',
        address: '715 Old Norcross Rd, Lawrenceville, GA 30044',
        position: 'Communications Officer', app_date: '2026-05-13',
        status: 'submitted',    priority: 'medium', days: 5,
      },
    ];

    for (const d of demos) {
      const cRes = await client.query(
        `INSERT INTO candidates
           (first_name, last_name, date_of_birth, ssn_last_four,
            phone, email, address, position_applied, application_date)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING id`,
        [d.first_name, d.last_name, d.dob, d.ssn,
         d.phone, d.email, d.address, d.position, d.app_date]
      );
      const ts = daysAgo(d.days);
      const caseRes = await client.query(
        `INSERT INTO cases (candidate_id, status, priority, created_at, updated_at)
         VALUES ($1,$2,$3,$4,$4) RETURNING id`,
        [cRes.rows[0].id, d.status, d.priority, ts]
      );
      console.log(
        `[seed] ${d.first_name} ${d.last_name} → candidate #${cRes.rows[0].id}` +
        `  case BI-${String(caseRes.rows[0].id).padStart(7,'0')}` +
        `  ${d.status}  ${d.priority}  ${d.days}d ago`
      );
    }
    console.log('[seed] Demo seed complete.');
  } catch (err) {
    console.error('[seed] Error:', err.message);
  } finally {
    client.release();
  }
}

module.exports = { pool, initializeTables, seedDemoData };

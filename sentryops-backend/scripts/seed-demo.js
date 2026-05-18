'use strict';

require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

const candidates = [
  {
    first_name:       'Darius',
    last_name:        'Thompson',
    date_of_birth:    '1995-03-22',
    ssn_last_four:    '3847',
    phone:            '678-555-0247',
    email:            'darius.thompson@gmail.com',
    address:          '2847 Sugarloaf Pkwy, Lawrenceville, GA 30045',
    position_applied: 'Deputy Sheriff',
    application_date: '2026-05-06',
    // case: in_progress (Criminal History), HIGH, 12 days
    case_status:   'in_progress',
    priority:      'high',
    days_ago:      12,
  },
  {
    first_name:       'Ashley',
    last_name:        'Reeves',
    date_of_birth:    '1991-08-14',
    ssn_last_four:    '5291',
    phone:            '770-555-0318',
    email:            'ashley.reeves@gmail.com',
    address:          '1124 Pleasant Hill Rd, Duluth, GA 30096',
    position_applied: 'Correctional Officer',
    application_date: '2026-05-10',
    // case: in_progress (Employment Verification), MEDIUM, 8 days
    case_status:   'in_progress',
    priority:      'medium',
    days_ago:      8,
  },
  {
    first_name:       'James',
    last_name:        'Okafor',
    date_of_birth:    '1988-11-30',
    ssn_last_four:    '7463',
    phone:            '678-555-0491',
    email:            'james.okafor@outlook.com',
    address:          '3391 Satellite Blvd Apt 204, Duluth, GA 30096',
    position_applied: 'Deputy Sheriff',
    application_date: '2026-05-02',
    // case: pending_review (Supervisor Review), HIGH, 16 days
    case_status:   'pending_review',
    priority:      'high',
    days_ago:      16,
  },
  {
    first_name:       'Brittany',
    last_name:        'Salazar',
    date_of_birth:    '1997-02-07',
    ssn_last_four:    '2918',
    phone:            '770-555-0162',
    email:            'brittany.salazar@yahoo.com',
    address:          '715 Old Norcross Rd, Lawrenceville, GA 30044',
    position_applied: 'Communications Officer',
    application_date: '2026-05-13',
    // case: submitted (Reference Checks / early stage), MEDIUM, 5 days
    case_status:   'submitted',
    priority:      'medium',
    days_ago:      5,
  },
];

async function seed() {
  const client = await pool.connect();
  try {
    // Show current state
    const before = await client.query('SELECT COUNT(*) FROM candidates');
    console.log(`[seed] Existing candidates: ${before.rows[0].count}`);

    for (const c of candidates) {
      // Insert candidate
      const cRes = await client.query(
        `INSERT INTO candidates
           (first_name, last_name, date_of_birth, ssn_last_four,
            phone, email, address, position_applied, application_date)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
         RETURNING id`,
        [c.first_name, c.last_name, c.date_of_birth, c.ssn_last_four,
         c.phone, c.email, c.address, c.position_applied, c.application_date]
      );
      const candidateId = cRes.rows[0].id;

      const createdAt = new Date(Date.now() - c.days_ago * 86400000).toISOString();

      // Insert case
      const caseRes = await client.query(
        `INSERT INTO cases
           (candidate_id, status, priority, created_at, updated_at)
         VALUES ($1, $2, $3, $4, $4)
         RETURNING id`,
        [candidateId, c.case_status, c.priority, createdAt]
      );
      const caseId = caseRes.rows[0].id;

      console.log(
        `[seed] Inserted: ${c.first_name} ${c.last_name}  ` +
        `→ candidate #${candidateId}  case #${caseId} (BI-${String(caseId).padStart(7,'0')})  ` +
        `status=${c.case_status}  priority=${c.priority}  ${c.days_ago}d ago`
      );
    }

    const after = await client.query('SELECT COUNT(*) FROM cases');
    console.log(`[seed] Total cases now: ${after.rows[0].count}`);
  } finally {
    client.release();
    await pool.end();
  }
}

seed().catch(err => {
  console.error('[seed] Error:', err.message);
  process.exit(1);
});

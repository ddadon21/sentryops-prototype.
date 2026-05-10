'use strict';

require('dotenv').config();
const express    = require('express');
const cors       = require('cors');
const { pool, initializeTables } = require('./db');
const authRoutes       = require('./src/routes/auth');
const casesRoutes      = require('./src/routes/cases');
const candidatesRoutes = require('./src/routes/candidates');

if (!process.env.JWT_SECRET) {
  console.error('[server] JWT_SECRET is not set. Refusing to start.');
  process.exit(1);
}

const app  = express();
const PORT = process.env.PORT || 3001;

const ALLOWED_ORIGINS = [
  'https://sentryops-prototype-qzgoqgywe-dwights-projects-8a9a094f.vercel.app',
  'https://sentryops-prototype.vercel.app',
  'http://localhost:5173',
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, curl, Postman)
    if (!origin || ALLOWED_ORIGINS.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS: origin '${origin}' not allowed`));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

app.use(express.json());

// ---------------------------------------------------------------------------
// Routes
// ---------------------------------------------------------------------------
app.use('/auth',       authRoutes);
app.use('/cases',      casesRoutes);
app.use('/candidates', candidatesRoutes);

// ---------------------------------------------------------------------------
// Health check — returns live DB connectivity status
// ---------------------------------------------------------------------------
app.get('/health', async (req, res) => {
  let dbStatus = 'ok';
  let dbError  = null;

  try {
    const result = await pool.query('SELECT NOW() AS time');
    dbStatus = 'ok';
    res.json({
      status:   'ok',
      database: { status: dbStatus, serverTime: result.rows[0].time },
      uptime:   process.uptime(),
    });
  } catch (err) {
    dbError  = err.message;
    dbStatus = 'error';
    res.status(503).json({
      status:   'degraded',
      database: { status: dbStatus, error: dbError },
      uptime:   process.uptime(),
    });
  }
});

// ---------------------------------------------------------------------------
// Bootstrap
// ---------------------------------------------------------------------------
async function start() {
  try {
    await initializeTables();

    // Verify the connection pool can reach the database.
    const result = await pool.query('SELECT NOW() AS time');
    console.log(`[db] Connected — server time: ${result.rows[0].time}`);

    app.listen(PORT, () => {
      console.log(`[server] SentryOps backend listening on port ${PORT} (${process.env.NODE_ENV})`);
    });
  } catch (err) {
    console.error('[server] Startup failed:', err.message);
    process.exit(1);
  }
}

start();

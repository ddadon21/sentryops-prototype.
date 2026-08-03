import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';

// ── Brief content — single day snapshot (Aug 3, 2026) ───────────
const attentionItems = [
  { text: 'Use-of-Force review UOF-2026-114 — approval window closes today', due: 'by 1700', action: 'Review', severity: 'red' },
  { text: 'Sector 4 day-shift coverage request — 2 deputies below minimum', due: 'by 0700', action: 'Approve', severity: 'amber' },
  { text: 'Quarterly CJIS compliance attestation due', due: 'Aug 5', action: 'Open', severity: 'amber' },
  { text: 'County Commission budget session — your appearance scheduled', due: '1400', action: 'Prep', severity: 'gray' },
];

const incidents = [
  { time: '22:14', type: 'BARRICADE', color: 'text-red-400', text: 'Armed barricade, 4400 Blk Mercer Ave — negotiated surrender, no injuries', status: 'Arrest' },
  { time: '01:47', type: 'DUI', color: 'text-amber-400', text: 'Injury collision, SR-12 MM 34 — driver arrested, passenger transported', status: 'Arrest' },
  { time: '02:30', type: 'BURGLARY', color: 'text-amber-400', text: 'Commercial burglary, Eastgate Plaza — forced entry, under investigation', status: 'Open' },
  { time: '03:55', type: 'JAIL', color: 'text-slate-400', text: 'Medical transport from C-block — inmate returned 0512, stable', status: 'Resolved' },
  { time: '04:41', type: 'PURSUIT', color: 'text-amber-400', text: 'Vehicle pursuit terminated per policy at county line — BOLO issued', status: 'BOLO' },
];

// value/min drive the fill; max sets the bar scale so the min tick sits inside the track
const posture = [
  { label: 'Patrol — Day shift', value: 26, min: 30, max: 33, display: '26 / min 30', fill: 'bg-amber-400', valueColor: 'text-amber-400' },
  { label: 'Patrol — Night shift', value: 27, min: 26, max: 30, display: '27 / min 26', fill: 'bg-emerald-400', valueColor: 'text-slate-300' },
  { label: 'Jail population', value: 412, min: 437, max: 460, display: '412 / 460', fill: 'bg-slate-500', valueColor: 'text-slate-300' },
  { label: 'Court security', value: 8, min: 8, max: 8, display: '8 / min 8', fill: 'bg-emerald-400', valueColor: 'text-slate-300' },
];

const schedule = [
  { time: '0800', text: 'Inmate transports — 3 to county court, 1 to state facility' },
  { time: '1400', text: 'County Commission budget session (Sheriff appearance)' },
  { time: '1800', text: 'National Night Out — community event, Sector 2 (4 deputies assigned)' },
];

const trends = [
  {
    dir: 'up', pct: '40%', color: 'text-red-400', stroke: '#f87171',
    text: 'Burglaries in Sector 4 up over 3 weeks — 7 commercial, clustered near Eastgate',
    sub: 'Pattern analysis suggests same crew; detective bureau briefed',
    points: [22, 21, 19, 18, 16, 13, 10],
  },
  {
    dir: 'down', pct: '18%', color: 'text-emerald-400', stroke: '#34d399',
    text: 'Response times improving county-wide since beat realignment',
    sub: 'Priority-1 median now 6.4 min vs 7.8 min prior period',
    points: [10, 11, 12, 13, 14, 15, 17],
  },
  {
    dir: 'up', pct: '12%', color: 'text-amber-400', stroke: '#fbbf24',
    text: 'Jail bookings trending up month-over-month',
    sub: 'Projected to reach 95% capacity by Aug 20 at current rate',
    points: [19, 18, 18, 17, 15, 14, 12],
  },
];

const watchItems = [
  { day: 'Day 23', text: 'IA case 2026-08 — deputy on administrative leave, interview phase', status: 'On track' },
  { day: 'Day 11', text: 'CJIS technical audit — remediation of 3 findings in progress', status: 'Due Aug 15' },
  { day: 'Day 6', text: 'Body-cam vendor contract renewal — legal review', status: 'Pending legal' },
];

const dotColor = { red: 'bg-red-500', amber: 'bg-amber-400', gray: 'bg-slate-600' };
const dueColor = { red: 'text-red-400', amber: 'text-amber-400', gray: 'text-slate-400' };

function Sparkline({ points, stroke }) {
  const w = 90, h = 24, pad = 2;
  const min = Math.min(...points), max = Math.max(...points);
  const range = max - min || 1;
  const path = points
    .map((p, i) => `${pad + (i * (w - pad * 2)) / (points.length - 1)},${pad + ((p - min) / range) * (h - pad * 2)}`)
    .join(' ');
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="flex-shrink-0">
      <polyline points={path} fill="none" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SectionLabel({ children, right, tone = 'text-slate-500' }) {
  return (
    <div className="flex items-baseline justify-between mb-3.5">
      <p className={`text-[10px] font-bold uppercase tracking-[0.15em] ${tone}`}>{children}</p>
      {right && <span className="text-[10px] text-slate-500">{right}</span>}
    </div>
  );
}

export default function DailyCommandBrief() {
  const navigate = useNavigate();
  const [acknowledged, setAcknowledged] = useState(false);

  return (
    <DashboardLayout>
      <div className="min-h-full bg-[#0A0A0B] px-6 py-8 lg:py-10">
        <div className="max-w-[880px] mx-auto">

          {/* ── Header ─────────────────────────────────────── */}
          <div className="flex items-start justify-between gap-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-red-500/90">
              Law Enforcement Sensitive — Internal Use Only
            </p>
            <div className="flex items-center gap-4 text-[11px] flex-shrink-0">
              <button className="text-amber-500 hover:text-amber-400 transition-colors">← Aug 2</button>
              <span className="text-slate-400">Aug 3, 2026</span>
              <span className="text-slate-600 cursor-default">Aug 4 →</span>
            </div>
          </div>

          <h1 className="text-[22px] font-bold text-slate-100 mt-3 mb-1.5">Daily Command Brief</h1>
          <p className="text-[12px] text-slate-400">Monday, August 3, 2026 · 0600 hrs · Covering 0600 Aug 2 – 0600 Aug 3</p>
          <p className="text-[10.5px] text-slate-500 mt-1">Auto-generated from CAD · JMS · RMS · HR — Reviewed by Analyst K. Whitfield, 0547</p>

          <div className="border-b border-slate-500/60 mt-4" />

          {/* ── Overnight Summary ──────────────────────────── */}
          <section className="pt-6 pb-6 border-b border-slate-800/70">
            <SectionLabel>Overnight Summary</SectionLabel>
            <p className="text-[12.5px] text-slate-300 leading-[1.7]">
              A quiet-to-moderate overnight. Deputies handled <span className="font-semibold text-slate-100">31 calls for service</span> (7-day
              avg: 34), with one significant incident — a barricade on Mercer Ave resolved by negotiated surrender at 2214 with
              no injuries. Jail count stands at <span className="font-semibold text-slate-100">412 of 460</span> after 9 bookings and 6
              releases. Day-shift patrol opens <span className="font-semibold text-amber-400/90">2 deputies below minimum</span> in Sector 4
              due to two unplanned absences; a coverage request is pending your approval below.
            </p>
            <p className="text-[10px] text-slate-500 mt-3">Sources: CAD 0553 · JMS 0551 · HR scheduling 0549 · Confidence: high</p>
          </section>

          {/* ── Requires Your Attention ────────────────────── */}
          <section className="pt-6 pb-3 border-b border-slate-800/70">
            <SectionLabel tone="text-amber-500/90" right={`${attentionItems.length} items`}>Requires Your Attention Today</SectionLabel>
            <div className="divide-y divide-slate-800/50">
              {attentionItems.map((item, i) => (
                <div key={i} className="flex items-center gap-3 py-3">
                  <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${dotColor[item.severity]}`} />
                  <p className="text-[12px] text-slate-300 flex-1 min-w-0">{item.text}</p>
                  <span className={`text-[10.5px] font-mono flex-shrink-0 ${dueColor[item.severity]}`}>{item.due}</span>
                  <button className="text-[11.5px] font-semibold text-amber-500 hover:text-amber-400 transition-colors flex-shrink-0 w-[72px] text-right">
                    {item.action} →
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* ── Overnight Incidents ────────────────────────── */}
          <section className="pt-6 pb-5 border-b border-slate-800/70">
            <SectionLabel>Overnight Incidents</SectionLabel>
            <div className="divide-y divide-slate-800/50">
              {incidents.map((inc, i) => (
                <div key={i} className="flex items-center gap-4 py-2.5">
                  <span className="text-[10.5px] font-mono text-slate-500 w-10 flex-shrink-0">{inc.time}</span>
                  <span className={`text-[10.5px] font-bold w-20 flex-shrink-0 ${inc.color}`}>{inc.type}</span>
                  <p className="text-[12px] text-slate-300 flex-1 min-w-0">{inc.text}</p>
                  <span className="text-[10.5px] text-slate-500 flex-shrink-0">{inc.status}</span>
                </div>
              ))}
            </div>
            <p className="text-[10px] text-slate-500 mt-3">
              Significant incidents only · full log in{' '}
              <button onClick={() => navigate('/patrol/cad')} className="text-amber-500/90 hover:text-amber-400 transition-colors">CAD history</button>
              {' '}· Source: CAD 0553
            </p>
          </section>

          {/* ── Today's Posture ────────────────────────────── */}
          <section className="pt-6 pb-6 border-b border-slate-800/70">
            <SectionLabel>Today's Posture</SectionLabel>
            <div className="space-y-4">
              {posture.map((row) => (
                <div key={row.label} className="flex items-center gap-5">
                  <p className="text-[12px] font-medium text-slate-300 w-40 flex-shrink-0">{row.label}</p>
                  <div className="flex-1 relative h-1">
                    <div className="absolute inset-0 bg-slate-800/80 rounded-full" />
                    <div className={`absolute inset-y-0 left-0 rounded-full ${row.fill}`} style={{ width: `${(row.value / row.max) * 100}%` }} />
                    <div className="absolute top-1/2 -translate-y-1/2 w-px h-2.5 bg-slate-400" style={{ left: `${(row.min / row.max) * 100}%` }} />
                  </div>
                  <span className={`text-[11px] font-mono flex-shrink-0 w-24 text-right ${row.valueColor}`}>{row.display}</span>
                </div>
              ))}
            </div>

            <p className="text-[11px] font-semibold text-slate-400 mt-6 mb-2.5">Scheduled today</p>
            <div className="space-y-2">
              {schedule.map((e) => (
                <div key={e.time} className="flex gap-5">
                  <span className="text-[10.5px] font-mono text-slate-500 w-10 flex-shrink-0">{e.time}</span>
                  <p className="text-[12px] text-slate-300">{e.text}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── Trends Worth Noting ────────────────────────── */}
          <section className="pt-6 pb-5 border-b border-slate-800/70">
            <SectionLabel>Trends Worth Noting</SectionLabel>
            <div className="space-y-4">
              {trends.map((t, i) => (
                <div key={i} className="flex items-start gap-4">
                  <span className={`text-[11px] font-bold flex-shrink-0 w-14 ${t.color}`}>
                    {t.dir === 'up' ? '▲' : '▼'} {t.pct}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] text-slate-300">{t.text}</p>
                    <p className="text-[10.5px] text-slate-500 mt-0.5">{t.sub}</p>
                  </div>
                  <Sparkline points={t.points} stroke={t.stroke} />
                </div>
              ))}
            </div>
            <p className="text-[10px] text-slate-500 mt-4">Flagged by Analyst K. Whitfield · 21-day window vs prior period</p>
          </section>

          {/* ── Watch Items ────────────────────────────────── */}
          <section className="pt-6 pb-3 border-b border-slate-800/70">
            <SectionLabel>Watch Items</SectionLabel>
            <div className="divide-y divide-slate-800/50">
              {watchItems.map((item, i) => (
                <div key={i} className="flex items-center gap-4 py-3">
                  <span className="text-[10.5px] font-mono text-slate-500 w-12 flex-shrink-0">{item.day}</span>
                  <p className="text-[12px] text-slate-300 flex-1 min-w-0">{item.text}</p>
                  <span className="text-[10.5px] text-slate-500 flex-shrink-0">{item.status}</span>
                </div>
              ))}
            </div>
          </section>

          {/* ── Acknowledge footer ─────────────────────────── */}
          <div className="flex items-center justify-between gap-4 pt-6 pb-3">
            <p className="text-[11px] text-slate-500">
              {acknowledged ? 'Brief acknowledged — recorded to the audit trail.' : 'Acknowledgment is recorded to the audit trail.'}
            </p>
            <button
              onClick={() => setAcknowledged(true)}
              disabled={acknowledged}
              className={`px-4 py-2 rounded-lg border text-[12px] font-semibold transition-colors ${
                acknowledged
                  ? 'border-emerald-500/40 text-emerald-400 cursor-default'
                  : 'border-amber-500/40 text-amber-400/90 hover:bg-amber-500/10'
              }`}
            >
              {acknowledged ? '✓ Acknowledged' : 'Acknowledge brief'}
            </button>
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
}

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';

// ── Mock briefs, oldest → newest. Each day is a full snapshot. ──
const briefs = [
  {
    id: 'aug1',
    shortLabel: 'Aug 1',
    navLabel: 'Aug 1, 2026',
    dateLine: 'Saturday, August 1, 2026 · 0600 hrs · Covering 0600 Jul 31 – 0600 Aug 1',
    reviewLine: 'Auto-generated from CAD · JMS · RMS · HR — Reviewed by Analyst K. Whitfield, 0544',
    acknowledgedAt: '0655',
    summary: [
      { t: 'A quiet overnight. Deputies handled ' },
      { t: '29 calls for service', b: 'white' },
      { t: ' (7-day avg: 33) with no major incidents — the most serious was an overdose at Riverside Park reversed with Narcan on scene. Jail count stands at ' },
      { t: '403 of 460', b: 'white' },
      { t: ' after 7 bookings and 8 releases. ' },
      { t: 'All shifts open at or above minimum', b: 'white' },
      { t: '; extra Sector 4 patrols begin tonight in response to the burglary series.' },
    ],
    sourcesLine: 'Sources: CAD 0549 · JMS 0546 · HR scheduling 0542 · Confidence: high',
    attentionItems: [
      { text: 'National Night Out staffing plan — draft ready for your review', due: 'by Aug 2', action: 'Review', severity: 'amber' },
      { text: 'Budget session prep materials from Finance', due: 'by 1700', action: 'Open', severity: 'amber' },
      { text: 'POST recertification roster confirmation', due: 'Aug 4', action: 'Open', severity: 'gray' },
    ],
    incidents: [
      { time: '22:40', type: 'OVERDOSE', color: 'text-amber-400', text: 'Overdose, Riverside Park — Narcan administered on scene, transported', status: 'Resolved' },
      { time: '00:28', type: 'DOMESTIC', color: 'text-amber-400', text: 'Domestic disturbance, Cedar Ct — one arrest, victim services notified', status: 'Arrest' },
      { time: '02:51', type: 'BURGLARY', color: 'text-amber-400', text: 'Commercial burglary, Eastgate corridor — 5th in series, under investigation', status: 'Open' },
      { time: '04:12', type: 'ALARM', color: 'text-slate-400', text: 'Audible alarm, Westfield warehouse — false activation, keyholder notified', status: 'Cleared' },
    ],
    posture: [
      { label: 'Patrol — Day shift', value: 31, min: 30, max: 33, display: '31 / min 30', fill: 'bg-emerald-400', valueColor: 'text-slate-300' },
      { label: 'Patrol — Night shift', value: 27, min: 26, max: 30, display: '27 / min 26', fill: 'bg-emerald-400', valueColor: 'text-slate-300' },
      { label: 'Jail population', value: 403, min: 437, max: 460, display: '403 / 460', fill: 'bg-slate-500', valueColor: 'text-slate-300' },
      { label: 'Court security', value: 8, min: 8, max: 8, display: '8 / min 8', fill: 'bg-emerald-400', valueColor: 'text-slate-300' },
    ],
    schedule: [
      { time: '0900', text: 'SWAT quarterly training block — range 2' },
      { time: '1300', text: 'Fleet inspections — 6 units due at county motor pool' },
      { time: '1900', text: 'Sector 4 directed patrols begin (burglary series)' },
    ],
    trends: [
      {
        dir: 'up', pct: '33%', color: 'text-red-400', stroke: '#f87171',
        text: 'Burglaries in Sector 4 up over 3 weeks — 5 commercial, clustered near Eastgate',
        sub: 'Pattern analysis suggests same crew; directed patrols start tonight',
        points: [22, 21, 20, 19, 17, 15, 13],
      },
      {
        dir: 'down', pct: '12%', color: 'text-emerald-400', stroke: '#34d399',
        text: 'Response times improving county-wide since beat realignment',
        sub: 'Priority-1 median now 6.9 min vs 7.8 min prior period',
        points: [10, 11, 11, 12, 13, 14, 15],
      },
      {
        dir: 'up', pct: '8%', color: 'text-amber-400', stroke: '#fbbf24',
        text: 'Jail bookings trending up month-over-month',
        sub: 'Projected to reach 95% capacity by Aug 24 at current rate',
        points: [19, 19, 18, 17, 16, 15, 14],
      },
    ],
    trendsFooter: 'Flagged by Analyst K. Whitfield · 21-day window vs prior period',
    watchItems: [
      { day: 'Day 21', text: 'IA case 2026-08 — deputy on administrative leave, interview phase', status: 'On track' },
      { day: 'Day 9', text: 'CJIS technical audit — remediation of 3 findings in progress', status: 'Due Aug 15' },
      { day: 'Day 4', text: 'Body-cam vendor contract renewal — legal review', status: 'Pending legal' },
    ],
  },
  {
    id: 'aug2',
    shortLabel: 'Aug 2',
    navLabel: 'Aug 2, 2026',
    dateLine: 'Sunday, August 2, 2026 · 0600 hrs · Covering 0600 Aug 1 – 0600 Aug 2',
    reviewLine: 'Auto-generated from CAD · JMS · RMS · HR — Reviewed by Analyst K. Whitfield, 0551',
    acknowledgedAt: '0708',
    summary: [
      { t: 'A busy Saturday night. Deputies handled ' },
      { t: '38 calls for service', b: 'white' },
      { t: ' (7-day avg: 34), including a bar fight on Commerce St with three arrests and a stolen-vehicle recovery near Eastgate. The burglary series reached ' },
      { t: '6 commercial break-ins', b: 'amber' },
      { t: ' with another forced entry at the Eastgate Plaza strip. Jail count stands at ' },
      { t: '409 of 460', b: 'white' },
      { t: ' after 11 bookings and 5 releases. Night shift ran at minimum with no coverage gaps.' },
    ],
    sourcesLine: 'Sources: CAD 0555 · JMS 0552 · HR scheduling 0547 · Confidence: high',
    attentionItems: [
      { text: 'Use-of-Force review UOF-2026-114 — packet ready, window closes Aug 3', due: 'by Aug 3', action: 'Review', severity: 'red' },
      { text: 'National Night Out staffing plan — final sign-off', due: 'by 1200', action: 'Approve', severity: 'amber' },
      { text: 'Quarterly CJIS compliance attestation due', due: 'Aug 5', action: 'Open', severity: 'gray' },
    ],
    incidents: [
      { time: '23:05', type: 'ASSAULT', color: 'text-red-400', text: 'Bar fight, 1200 Blk Commerce St — three arrests, one minor injury', status: 'Arrest' },
      { time: '23:52', type: 'STOLEN VEH', color: 'text-amber-400', text: 'Stolen vehicle recovered near Eastgate — driver in custody', status: 'Arrest' },
      { time: '01:15', type: 'BURGLARY', color: 'text-amber-400', text: 'Commercial burglary, Eastgate Plaza strip — 6th in series', status: 'Open' },
      { time: '03:20', type: 'JAIL', color: 'text-slate-400', text: 'Detainee altercation, C-block — separated, no injuries, report filed', status: 'Resolved' },
      { time: '05:05', type: 'DUI', color: 'text-amber-400', text: 'Traffic stop, SR-9 — driver arrested, vehicle impounded', status: 'Arrest' },
    ],
    posture: [
      { label: 'Patrol — Day shift', value: 30, min: 30, max: 33, display: '30 / min 30', fill: 'bg-emerald-400', valueColor: 'text-slate-300' },
      { label: 'Patrol — Night shift', value: 26, min: 26, max: 30, display: '26 / min 26', fill: 'bg-emerald-400', valueColor: 'text-slate-300' },
      { label: 'Jail population', value: 409, min: 437, max: 460, display: '409 / 460', fill: 'bg-slate-500', valueColor: 'text-slate-300' },
      { label: 'Court security', value: 2, min: 2, max: 2, display: '2 / min 2', fill: 'bg-emerald-400', valueColor: 'text-slate-300' },
    ],
    schedule: [
      { time: '1000', text: 'Community event patrols — Sector 2 church corridor' },
      { time: '1400', text: 'Shift-change briefing — new beat maps take effect' },
      { time: '1800', text: 'National Night Out walk-through with event coordinators' },
    ],
    trends: [
      {
        dir: 'up', pct: '36%', color: 'text-red-400', stroke: '#f87171',
        text: 'Burglaries in Sector 4 up over 3 weeks — 6 commercial, clustered near Eastgate',
        sub: 'Same-crew pattern holding; detective bureau assigned',
        points: [22, 21, 20, 18, 16, 14, 11],
      },
      {
        dir: 'down', pct: '15%', color: 'text-emerald-400', stroke: '#34d399',
        text: 'Response times improving county-wide since beat realignment',
        sub: 'Priority-1 median now 6.6 min vs 7.8 min prior period',
        points: [10, 11, 12, 12, 13, 14, 16],
      },
      {
        dir: 'up', pct: '10%', color: 'text-amber-400', stroke: '#fbbf24',
        text: 'Jail bookings trending up month-over-month',
        sub: 'Projected to reach 95% capacity by Aug 22 at current rate',
        points: [19, 18, 18, 17, 16, 14, 13],
      },
    ],
    trendsFooter: 'Flagged by Analyst K. Whitfield · 21-day window vs prior period',
    watchItems: [
      { day: 'Day 22', text: 'IA case 2026-08 — deputy on administrative leave, interview phase', status: 'On track' },
      { day: 'Day 10', text: 'CJIS technical audit — remediation of 3 findings in progress', status: 'Due Aug 15' },
      { day: 'Day 5', text: 'Body-cam vendor contract renewal — legal review', status: 'Pending legal' },
    ],
  },
  {
    id: 'aug3',
    shortLabel: 'Aug 3',
    navLabel: 'Aug 3, 2026',
    dateLine: 'Monday, August 3, 2026 · 0600 hrs · Covering 0600 Aug 2 – 0600 Aug 3',
    reviewLine: 'Auto-generated from CAD · JMS · RMS · HR — Reviewed by Analyst K. Whitfield, 0547',
    acknowledgedAt: null,
    summary: [
      { t: 'A quiet-to-moderate overnight. Deputies handled ' },
      { t: '31 calls for service', b: 'white' },
      { t: ' (7-day avg: 34), with one significant incident — a barricade on Mercer Ave resolved by negotiated surrender at 2214 with no injuries. Jail count stands at ' },
      { t: '412 of 460', b: 'white' },
      { t: ' after 9 bookings and 6 releases. Day-shift patrol opens ' },
      { t: '2 deputies below minimum', b: 'amber' },
      { t: ' in Sector 4 due to two unplanned absences; a coverage request is pending your approval below.' },
    ],
    sourcesLine: 'Sources: CAD 0553 · JMS 0551 · HR scheduling 0549 · Confidence: high',
    attentionItems: [
      { text: 'Use-of-Force review UOF-2026-114 — approval window closes today', due: 'by 1700', action: 'Review', severity: 'red' },
      { text: 'Sector 4 day-shift coverage request — 2 deputies below minimum', due: 'by 0700', action: 'Approve', severity: 'amber' },
      { text: 'Quarterly CJIS compliance attestation due', due: 'Aug 5', action: 'Open', severity: 'amber' },
      { text: 'County Commission budget session — your appearance scheduled', due: '1400', action: 'Prep', severity: 'gray' },
    ],
    incidents: [
      { time: '22:14', type: 'BARRICADE', color: 'text-red-400', text: 'Armed barricade, 4400 Blk Mercer Ave — negotiated surrender, no injuries', status: 'Arrest' },
      { time: '01:47', type: 'DUI', color: 'text-amber-400', text: 'Injury collision, SR-12 MM 34 — driver arrested, passenger transported', status: 'Arrest' },
      { time: '02:30', type: 'BURGLARY', color: 'text-amber-400', text: 'Commercial burglary, Eastgate Plaza — forced entry, under investigation', status: 'Open' },
      { time: '03:55', type: 'JAIL', color: 'text-slate-400', text: 'Medical transport from C-block — inmate returned 0512, stable', status: 'Resolved' },
      { time: '04:41', type: 'PURSUIT', color: 'text-amber-400', text: 'Vehicle pursuit terminated per policy at county line — BOLO issued', status: 'BOLO' },
    ],
    posture: [
      { label: 'Patrol — Day shift', value: 26, min: 30, max: 33, display: '26 / min 30', fill: 'bg-amber-400', valueColor: 'text-amber-400' },
      { label: 'Patrol — Night shift', value: 27, min: 26, max: 30, display: '27 / min 26', fill: 'bg-emerald-400', valueColor: 'text-slate-300' },
      { label: 'Jail population', value: 412, min: 437, max: 460, display: '412 / 460', fill: 'bg-slate-500', valueColor: 'text-slate-300' },
      { label: 'Court security', value: 8, min: 8, max: 8, display: '8 / min 8', fill: 'bg-emerald-400', valueColor: 'text-slate-300' },
    ],
    schedule: [
      { time: '0800', text: 'Inmate transports — 3 to county court, 1 to state facility' },
      { time: '1400', text: 'County Commission budget session (Sheriff appearance)' },
      { time: '1800', text: 'National Night Out — community event, Sector 2 (4 deputies assigned)' },
    ],
    trends: [
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
    ],
    trendsFooter: 'Flagged by Analyst K. Whitfield · 21-day window vs prior period',
    watchItems: [
      { day: 'Day 23', text: 'IA case 2026-08 — deputy on administrative leave, interview phase', status: 'On track' },
      { day: 'Day 11', text: 'CJIS technical audit — remediation of 3 findings in progress', status: 'Due Aug 15' },
      { day: 'Day 6', text: 'Body-cam vendor contract renewal — legal review', status: 'Pending legal' },
    ],
  },
];

const dotColor = { red: 'bg-red-500', amber: 'bg-amber-400', gray: 'bg-slate-600' };
const dueColor = { red: 'text-red-400', amber: 'text-amber-400', gray: 'text-slate-400' };
const summaryTone = { white: 'font-semibold text-slate-100', amber: 'font-semibold text-amber-400/90' };

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
  const [dayIndex, setDayIndex] = useState(briefs.length - 1);
  const [userAcks, setUserAcks] = useState({});

  const brief = briefs[dayIndex];
  const prev = briefs[dayIndex - 1];
  const next = briefs[dayIndex + 1];
  const acknowledged = Boolean(brief.acknowledgedAt || userAcks[brief.id]);
  const ackLine = brief.acknowledgedAt
    ? `Acknowledged ${brief.acknowledgedAt} — recorded to the audit trail.`
    : acknowledged
      ? 'Brief acknowledged — recorded to the audit trail.'
      : 'Acknowledgment is recorded to the audit trail.';

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
              {prev ? (
                <button onClick={() => setDayIndex(dayIndex - 1)} className="text-amber-500 hover:text-amber-400 transition-colors">
                  ← {prev.shortLabel}
                </button>
              ) : (
                <span className="text-slate-600 cursor-default">← Jul 31</span>
              )}
              <span className="text-slate-400">{brief.navLabel}</span>
              {next ? (
                <button onClick={() => setDayIndex(dayIndex + 1)} className="text-amber-500 hover:text-amber-400 transition-colors">
                  {next.shortLabel} →
                </button>
              ) : (
                <span className="text-slate-600 cursor-default">Aug 4 →</span>
              )}
            </div>
          </div>

          <h1 className="text-[22px] font-bold text-slate-100 mt-3 mb-1.5">Daily Command Brief</h1>
          <p className="text-[12px] text-slate-400">{brief.dateLine}</p>
          <p className="text-[10.5px] text-slate-500 mt-1">{brief.reviewLine}</p>

          <div className="border-b border-slate-500/60 mt-4" />

          {/* ── Overnight Summary ──────────────────────────── */}
          <section className="pt-6 pb-6 border-b border-slate-800/70">
            <SectionLabel>Overnight Summary</SectionLabel>
            <p className="text-[12.5px] text-slate-300 leading-[1.7]">
              {brief.summary.map((part, i) =>
                part.b ? <span key={i} className={summaryTone[part.b]}>{part.t}</span> : <React.Fragment key={i}>{part.t}</React.Fragment>
              )}
            </p>
            <p className="text-[10px] text-slate-500 mt-3">{brief.sourcesLine}</p>
          </section>

          {/* ── Requires Your Attention ────────────────────── */}
          <section className="pt-6 pb-3 border-b border-slate-800/70">
            <SectionLabel tone="text-amber-500/90" right={`${brief.attentionItems.length} items`}>Requires Your Attention Today</SectionLabel>
            <div className="divide-y divide-slate-800/50">
              {brief.attentionItems.map((item, i) => (
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
              {brief.incidents.map((inc, i) => (
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
              {brief.posture.map((row) => (
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
              {brief.schedule.map((e) => (
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
              {brief.trends.map((t, i) => (
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
            <p className="text-[10px] text-slate-500 mt-4">{brief.trendsFooter}</p>
          </section>

          {/* ── Watch Items ────────────────────────────────── */}
          <section className="pt-6 pb-3 border-b border-slate-800/70">
            <SectionLabel>Watch Items</SectionLabel>
            <div className="divide-y divide-slate-800/50">
              {brief.watchItems.map((item, i) => (
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
            <p className="text-[11px] text-slate-500">{ackLine}</p>
            <button
              onClick={() => setUserAcks({ ...userAcks, [brief.id]: true })}
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

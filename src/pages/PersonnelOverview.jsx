import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';

// ── Function readiness — strength / authorized / minimum ────────
const functions = [
  {
    name: 'Patrol', strength: 53, auth: 60, min: 56,
    outlook: [54, 54, 53, 53, 53, 52, 53, 53, 52, 52, 53, 53, 53, 53],
    color: '#f87171', status: 'SHORTFALL', statusColor: 'text-red-400', stripe: 'border-red-500/70',
    projection: 'Below min now — OT bridging', projectionColor: 'text-red-400',
    action: { label: 'Open coverage request', route: '/command/approvals' },
  },
  {
    name: 'Jail', strength: 41, auth: 44, min: 40,
    outlook: [41, 41, 41, 41, 41, 41, 41, 40, 40, 40, 40, 39, 39, 39],
    color: '#fbbf24', status: 'STRAINED', statusColor: 'text-amber-400', stripe: 'border-transparent',
    projection: 'Falls below min Aug 20', projectionColor: 'text-amber-400',
    action: { label: 'Expedite pipeline', route: '/bi/dashboard' },
  },
  {
    name: 'Court Security', strength: 8, auth: 8, min: 8,
    outlook: [8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8],
    color: '#34d399', status: 'READY', statusColor: 'text-emerald-400', stripe: 'border-transparent',
    projection: 'Stable through Sep', projectionColor: 'text-slate-400',
    action: null,
  },
  {
    name: 'Investigations', strength: 14, auth: 16, min: 12,
    outlook: [14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14],
    color: '#34d399', status: 'READY', statusColor: 'text-emerald-400', stripe: 'border-transparent',
    projection: '−1 retirement Oct 1', projectionColor: 'text-slate-400',
    action: null,
  },
  {
    name: 'Dispatch', strength: 11, auth: 12, min: 10,
    outlook: [11, 11, 10, 10, 10, 10, 10, 10, 11, 11, 11, 11, 11, 11],
    color: '#fbbf24', status: 'STRAINED', statusColor: 'text-amber-400', stripe: 'border-amber-500/60',
    projection: '1 FMLA return Aug 25', projectionColor: 'text-slate-400',
    action: { label: 'Open coverage request', route: '/command/approvals' },
  },
];

// ── Pipeline vs attrition ───────────────────────────────────────
const pipeline = [
  { month: 'Aug', movement: 'Academy cohort 26-B mid-training · 1 resignation effective Aug 15', incoming: '0', leaving: '−1', net: '−1', netColor: 'text-red-400' },
  { month: 'Sep', movement: 'Cohort 26-B graduates Sep 12 (4) · 1 retirement', incoming: '+4', leaving: '−1', net: '+3', netColor: 'text-emerald-400' },
  { month: 'Oct', movement: '1 retirement (Investigations) · lateral hire in final BI stage', incoming: '+1', leaving: '−2', net: '−1', netColor: 'text-red-400' },
  { month: 'Nov', movement: 'Cohort 26-C projected start returns nothing until Mar · 2 laterals projected', incoming: '+2', leaving: '0', net: '+2', netColor: 'text-emerald-400' },
];

// ── Availability drains ─────────────────────────────────────────
const drains = [
  { label: 'Light duty', count: 4, bar: 'bg-amber-400', pct: 33, note: '1 extension pending your decision', link: '/command/approvals' },
  { label: 'FMLA / medical leave', count: 3, bar: 'bg-slate-500', pct: 25, note: '1 return Aug 25' },
  { label: 'Military leave', count: 2, bar: 'bg-slate-500', pct: 17, note: 'Both return Q4' },
  { label: 'Administrative leave', count: 1, bar: 'bg-red-500', pct: 8, note: 'IA case 2026-08' },
  { label: 'Extended training', count: 2, bar: 'bg-slate-500', pct: 17, note: 'K-9 school through Sep' },
];

// ── Overtime pressure ───────────────────────────────────────────
const otRows = [
  { unit: 'Patrol — Sector 4', hours: 312, spend: '$14,820', signal: '⚑ Masking a structural 2-FTE gap — 3rd consecutive month', signalColor: 'text-red-400', stripe: 'border-red-500/70' },
  { unit: 'Jail — C-block', hours: 188, spend: '$8,660', signal: 'Nurse vacancy coverage — contract relief starts Aug 5', signalColor: 'text-amber-400', stripe: 'border-transparent' },
  { unit: 'Patrol — other sectors', hours: 204, spend: '$9,470', signal: 'Within seasonal norm', signalColor: 'text-slate-400', stripe: 'border-transparent' },
  { unit: 'Court / transport', hours: 96, spend: '$4,450', signal: 'Within seasonal norm', signalColor: 'text-slate-400', stripe: 'border-transparent' },
];

// ── Qualification readiness ─────────────────────────────────────
const quals = [
  { name: 'Firearms qualification', dot: 'bg-amber-400', value: '186 / 204', color: 'text-slate-300' },
  { name: 'CIT certified', dot: 'bg-slate-600', value: '88 / target 100', color: 'text-slate-400' },
  { name: 'Jail officer cert', dot: 'bg-emerald-400', value: '44 / 44', color: 'text-emerald-400' },
  { name: 'FTO qualified', dot: 'bg-emerald-400', value: '19 / min 16', color: 'text-emerald-400' },
];

// ── Fatigue drill-in (names on demand only) ─────────────────────
const fatigueDetail = [
  { name: 'Dep. Torres', reason: '68 OT hrs this month' },
  { name: 'Dep. Park', reason: '66 OT hrs this month' },
  { name: 'Dep. Nguyen', reason: '63 OT hrs this month' },
  { name: 'Dep. Hale', reason: '61 OT hrs this month' },
  { name: 'Dep. Cole', reason: '6th consecutive shift' },
  { name: 'Dep. Tran', reason: '6th consecutive shift' },
];

const weekDraws = [
  { day: 'Tue', event: 'National Night Out — Sector 2', count: '4' },
  { day: 'Wed', event: 'Court calendar peak — 3 trials', count: '6' },
  { day: 'Thu', event: 'State facility transport', count: '2' },
  { day: 'Fri', event: 'Cohort 26-B range week begins', count: '2 FTO' },
];

function OutlookSpark({ points, min, color }) {
  const w = 170, h = 30, pad = 3;
  const all = [...points, min];
  const lo = Math.min(...all) - 1, hi = Math.max(...all) + 1;
  const y = (v) => pad + (1 - (v - lo) / (hi - lo)) * (h - pad * 2);
  const x = (i) => pad + (i * (w - pad * 2)) / (points.length - 1);
  const path = points.map((p, i) => `${x(i)},${y(p)}`).join(' ');
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="flex-shrink-0">
      <line x1={pad} x2={w - pad} y1={y(min)} y2={y(min)} stroke="#475569" strokeWidth="1" strokeDasharray="3 3" />
      <polyline points={path} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SectionLabel({ children }) {
  return <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500 pb-3 border-b border-slate-800/70">{children}</p>;
}

export default function PersonnelOverview() {
  const navigate = useNavigate();
  const [queued, setQueued] = useState(false);
  const [fatigueOpen, setFatigueOpen] = useState(false);

  return (
    <DashboardLayout>
      <div className="min-h-full bg-[#0A0A0B] px-6 py-8">
        <div className="max-w-[1500px] mx-auto">

          {/* ── Header ─────────────────────────────────────── */}
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-[19px] font-bold text-slate-100">Workforce Readiness</h1>
            <span className="text-[11px] text-slate-500">As of 06:12 · sources: HR scheduling · Training · BI pipeline · Finance</span>
            <button
              onClick={() => setQueued(true)}
              disabled={queued}
              className={`ml-auto px-3.5 py-2 border rounded-lg text-[11.5px] font-semibold transition-colors ${
                queued ? 'border-emerald-500/40 text-emerald-400 cursor-default' : 'border-slate-700/60 text-slate-200 hover:bg-zinc-900/60'
              }`}
            >
              {queued ? '✓ Queued for Aug 4 brief' : "Add to tomorrow's Daily Brief"}
            </button>
          </div>

          {/* ── Function readiness table ───────────────────── */}
          <div className="mt-6">
            <div className="flex items-center gap-4 pb-2 border-b border-slate-800/70 pl-3">
              <span className="text-[9px] font-bold uppercase tracking-[0.12em] text-slate-500 w-36 flex-shrink-0">Function</span>
              <span className="text-[9px] font-bold uppercase tracking-[0.12em] text-slate-500 w-36 flex-shrink-0">Strength / Auth / Min</span>
              <span className="text-[9px] font-bold uppercase tracking-[0.12em] text-slate-500 flex-1">14-Day Outlook</span>
              <span className="text-[9px] font-bold uppercase tracking-[0.12em] text-slate-500 w-24 flex-shrink-0">Status</span>
              <span className="text-[9px] font-bold uppercase tracking-[0.12em] text-slate-500 w-56 flex-shrink-0">Projection / Action</span>
            </div>
            <div className="divide-y divide-slate-800/50">
              {functions.map((fn) => (
                <div key={fn.name} className={`flex items-center gap-4 py-4 pl-3 border-l-2 ${fn.stripe}`}>
                  <span className="text-[13px] font-bold text-slate-100 w-36 flex-shrink-0">{fn.name}</span>
                  <span className="text-[12px] font-mono w-36 flex-shrink-0">
                    <span className="text-slate-200">{fn.strength}</span>
                    <span className="text-slate-600"> / </span>
                    <span className="text-slate-400">{fn.auth}</span>
                    <span className="text-slate-600"> / </span>
                    <span className="text-slate-500">{fn.min}</span>
                  </span>
                  <div className="flex-1"><OutlookSpark points={fn.outlook} min={fn.min} color={fn.color} /></div>
                  <span className={`text-[11px] font-bold tracking-wide w-24 flex-shrink-0 ${fn.statusColor}`}>{fn.status}</span>
                  <div className="w-56 flex-shrink-0">
                    <p className={`text-[11.5px] ${fn.projectionColor}`}>{fn.projection}</p>
                    {fn.action && (
                      <button onClick={() => navigate(fn.action.route)} className="text-[11.5px] font-semibold text-amber-500 hover:text-amber-400 transition-colors mt-0.5">
                        {fn.action.label} →
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <p className="text-[10px] text-slate-500 mt-2.5">Outlook assumes no unplanned absences · known leave, academy graduations, and separations only · dashed line = minimum</p>
          </div>

          {/* ── Two-column body ────────────────────────────── */}
          <div className="mt-8 grid grid-cols-1 xl:grid-cols-[1fr,440px] gap-10">

            {/* Left column */}
            <div>
              {/* Pipeline vs attrition */}
              <SectionLabel>Pipeline vs Attrition — Sworn</SectionLabel>
              <div className="flex items-center gap-4 py-2 border-b border-slate-800/50">
                <span className="text-[9px] font-bold uppercase tracking-[0.12em] text-slate-500 w-10 flex-shrink-0">Month</span>
                <span className="text-[9px] font-bold uppercase tracking-[0.12em] text-slate-500 flex-1">Movement</span>
                <span className="text-[9px] font-bold uppercase tracking-[0.12em] text-slate-500 w-16 flex-shrink-0 text-right">Incoming</span>
                <span className="text-[9px] font-bold uppercase tracking-[0.12em] text-slate-500 w-14 flex-shrink-0 text-right">Leaving</span>
                <span className="text-[9px] font-bold uppercase tracking-[0.12em] text-slate-500 w-10 flex-shrink-0 text-right">Net</span>
              </div>
              <div className="divide-y divide-slate-800/50">
                {pipeline.map((row) => (
                  <div key={row.month} className="flex items-center gap-4 py-3">
                    <span className="text-[12.5px] font-bold text-slate-100 w-10 flex-shrink-0">{row.month}</span>
                    <p className="text-[12px] text-slate-300 flex-1 min-w-0 leading-snug">{row.movement}</p>
                    <span className={`text-[11.5px] font-mono w-16 flex-shrink-0 text-right ${row.incoming === '0' ? 'text-slate-500' : 'text-emerald-400'}`}>{row.incoming}</span>
                    <span className={`text-[11.5px] font-mono w-14 flex-shrink-0 text-right ${row.leaving === '0' ? 'text-slate-500' : 'text-red-400'}`}>{row.leaving}</span>
                    <span className={`text-[11.5px] font-mono font-bold w-10 flex-shrink-0 text-right ${row.netColor}`}>{row.net}</span>
                  </div>
                ))}
              </div>
              <p className="text-[10px] text-slate-500 mt-2.5">
                BI pipeline: 11 candidates in background · 4 projected to academy Jan cohort ·{' '}
                <button onClick={() => navigate('/bi/dashboard')} className="text-amber-500/90 hover:text-amber-400 transition-colors">Open BI module</button>
              </p>

              {/* Availability drains */}
              <div className="mt-8">
                <SectionLabel>Availability Drains — 12 Personnel Unavailable or Restricted</SectionLabel>
                <div className="divide-y divide-slate-800/50">
                  {drains.map((d) => (
                    <div key={d.label} className="flex items-center gap-4 py-3">
                      <span className="text-[12px] text-slate-200 w-44 flex-shrink-0">{d.label}</span>
                      <span className="text-[12px] font-mono font-bold text-slate-200 w-5 flex-shrink-0 text-right">{d.count}</span>
                      <div className="flex-1 h-1 bg-slate-800/70 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${d.bar}`} style={{ width: `${d.pct}%` }} />
                      </div>
                      <div className="w-56 flex-shrink-0">
                        {d.link ? (
                          <button onClick={() => navigate(d.link)} className="text-[11px] text-slate-400 hover:text-amber-400 transition-colors text-left">{d.note} →</button>
                        ) : (
                          <span className="text-[11px] text-slate-400">{d.note}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Overtime pressure */}
              <div className="mt-8">
                <SectionLabel>Overtime Pressure — August MTD</SectionLabel>
                <div className="flex items-center gap-4 py-2 border-b border-slate-800/50 pl-3">
                  <span className="text-[9px] font-bold uppercase tracking-[0.12em] text-slate-500 w-44 flex-shrink-0">Unit</span>
                  <span className="text-[9px] font-bold uppercase tracking-[0.12em] text-slate-500 w-14 flex-shrink-0 text-right">Hours</span>
                  <span className="text-[9px] font-bold uppercase tracking-[0.12em] text-slate-500 w-20 flex-shrink-0 text-right">Spend</span>
                  <span className="text-[9px] font-bold uppercase tracking-[0.12em] text-slate-500 flex-1 pl-4">Signal</span>
                </div>
                <div className="divide-y divide-slate-800/50">
                  {otRows.map((row) => (
                    <div key={row.unit} className={`flex items-center gap-4 py-3 pl-3 border-l-2 ${row.stripe}`}>
                      <span className="text-[12px] font-semibold text-slate-200 w-44 flex-shrink-0">{row.unit}</span>
                      <span className="text-[11.5px] font-mono text-slate-300 w-14 flex-shrink-0 text-right">{row.hours}</span>
                      <span className="text-[11.5px] font-mono text-slate-300 w-20 flex-shrink-0 text-right">{row.spend}</span>
                      <p className={`text-[11.5px] flex-1 min-w-0 pl-4 leading-snug ${row.signalColor}`}>{row.signal}</p>
                    </div>
                  ))}
                </div>
                <p className="text-[10px] text-slate-500 mt-2.5">Monthly OT budget $60,000 · committed $37,400 (62%) · structural-gap flag raised when unit OT exceeds 1.5 FTE-equivalent for 2+ months</p>
              </div>
            </div>

            {/* Right column */}
            <div>
              {/* Qualification readiness */}
              <SectionLabel>Qualification Readiness</SectionLabel>
              <div className="mt-3 border border-red-500/30 rounded-xl px-4 py-3">
                <p className="text-[12.5px] font-bold text-red-400">3 deputies cannot deploy</p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Lapsed CPR/First Aid — retraining scheduled Aug 6.{' '}
                  <button onClick={() => navigate('/hr/training')} className="text-amber-500/90 hover:text-amber-400 transition-colors font-semibold">View</button>
                </p>
              </div>
              <div className="divide-y divide-slate-800/50 mt-2">
                {quals.map((q) => (
                  <div key={q.name} className="flex items-center gap-3 py-2.5">
                    <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${q.dot}`} />
                    <p className="text-[12px] text-slate-200 flex-1 min-w-0">{q.name}</p>
                    <span className={`text-[11px] font-mono flex-shrink-0 ${q.color}`}>{q.value}</span>
                  </div>
                ))}
              </div>

              {/* Fatigue watch */}
              <div className="mt-8">
                <SectionLabel>Fatigue Watch</SectionLabel>
                <div className="flex items-baseline gap-2.5 mt-3">
                  <span className="text-[26px] font-bold text-amber-400 leading-none">6</span>
                  <span className="text-[13px] text-slate-200">deputies over threshold</span>
                  <button onClick={() => setFatigueOpen(!fatigueOpen)} className="ml-auto text-[11.5px] font-semibold text-amber-500 hover:text-amber-400 transition-colors">
                    {fatigueOpen ? 'Hide' : 'Review'}
                  </button>
                </div>
                <p className="text-[11.5px] text-slate-400 mt-2 leading-relaxed">4 over 60 OT hours this month · 2 on a 6th consecutive shift. Names visible on drill-in only.</p>
                {fatigueOpen && (
                  <div className="mt-2.5 border border-slate-800/80 rounded-xl divide-y divide-slate-800/50">
                    {fatigueDetail.map((f) => (
                      <div key={f.name} className="flex items-center gap-3 px-3.5 py-2">
                        <p className="text-[12px] text-slate-200 flex-1">{f.name}</p>
                        <span className="text-[10.5px] text-amber-400/90 font-mono">{f.reason}</span>
                      </div>
                    ))}
                  </div>
                )}
                <p className="text-[10px] text-slate-500 mt-2">Threshold: 60 OT hrs/mo or 6+ consecutive shifts (Policy 2.2 §8)</p>
              </div>

              {/* Drawing staff this week */}
              <div className="mt-8">
                <SectionLabel>Drawing Staff This Week</SectionLabel>
                <div className="divide-y divide-slate-800/50">
                  {weekDraws.map((w) => (
                    <div key={w.day} className="flex items-center gap-4 py-3">
                      <span className="text-[10.5px] font-mono text-slate-500 w-8 flex-shrink-0">{w.day}</span>
                      <p className="text-[12px] text-slate-200 flex-1 min-w-0">{w.event}</p>
                      <span className="text-[11px] font-mono text-slate-300 flex-shrink-0">{w.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
}

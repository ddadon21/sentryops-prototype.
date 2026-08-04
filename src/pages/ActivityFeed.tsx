import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';

// ── Operational Timeline — read-only projection of source systems ──
// Minute scale: 0 = Aug 2, 06:00. Negative = earlier days.

const LANES = ['CAD', 'JAIL', 'INVESTIGATIONS', 'PERSONNEL', 'FLEET', 'COMPLIANCE', 'COMMAND'];

const DAY_NAMES = ['Jul 31', 'Aug 1', 'Aug 2', 'Aug 3'];
const fmt = (min: number) => {
  const epoch = min + 3240; // minutes since Jul 31 00:00
  const day = Math.floor(epoch / 1440);
  const clock = epoch % 1440;
  const h = String(Math.floor(clock / 60)).padStart(2, '0');
  const m = String(clock % 60).padStart(2, '0');
  return { clock: `${h}:${m}`, day: DAY_NAMES[day] ?? '' };
};

type Ev = {
  id: string; lane: string; min: number; title: string;
  sev: 'critical' | 'notable' | 'routine';
  flag?: string; thread?: string; src?: string; desc?: string;
  link?: { route: string; label: string };
};

const EVENTS: Ev[] = [
  // ── CAD ──
  { id: 'c1', lane: 'CAD', min: 41, title: 'Welfare check — Riverside Park', sev: 'routine' },
  { id: 'c2', lane: 'CAD', min: 115, title: 'Traffic stop — SR-9', sev: 'routine' },
  { id: 'c3', lane: 'CAD', min: 192, title: 'Alarm call — cleared, false activation', sev: 'routine' },
  { id: 'c4', lane: 'CAD', min: 266, title: 'Civil standby — Cedar Ct', sev: 'routine' },
  { id: 'c5', lane: 'CAD', min: 447, title: 'Shoplifting report — Eastgate Plaza', sev: 'routine' },
  { id: 'c6', lane: 'CAD', min: 542, title: 'Traffic stop — warning issued', sev: 'routine' },
  { id: 'c7', lane: 'CAD', min: 648, title: 'Parking complaint — resolved', sev: 'routine' },
  { id: 'c8', lane: 'CAD', min: 793, title: '911 — shots heard, 4400 Blk Mercer Ave', sev: 'critical', flag: 'Barricade begins', thread: 'mercer', src: 'CAD-88274', desc: 'Multiple callers; units staged at Mercer & 4th.' },
  { id: 'c9', lane: 'CAD', min: 806, title: 'Perimeter established — Mercer Ave', sev: 'notable', thread: 'mercer', src: 'CAD-88291' },
  { id: 'c10', lane: 'CAD', min: 848, title: 'SWAT-1 on scene', sev: 'notable', thread: 'mercer', src: 'CAD-88302' },
  { id: 'c11', lane: 'CAD', min: 968, title: 'Barricade resolved — negotiated surrender', sev: 'critical', flag: 'Surrender 22:14', thread: 'mercer', src: 'CAD-88347', desc: 'Subject in custody; no injuries.' },
  { id: 'c12', lane: 'CAD', min: 1187, title: 'Injury collision, SR-12 — DUI arrest', sev: 'notable', flag: 'DUI collision', src: 'CAD-88389' },
  { id: 'c13', lane: 'CAD', min: 1358, title: 'Vehicle pursuit initiated — stolen vehicle', sev: 'notable', thread: 'pursuit', src: 'CAD-88412' },
  { id: 'c14', lane: 'CAD', min: 1361, title: 'Pursuit terminated per policy — county line', sev: 'notable', flag: 'Pursuit terminated', thread: 'pursuit', src: 'CAD-88413', desc: 'BOLO issued; AVL telemetry attached to the record.' },
  // earlier days (72h view / previous ranges)
  { id: 'p1', lane: 'CAD', min: -1880, title: 'Overdose — Riverside Park, Narcan administered', sev: 'notable', flag: 'Overdose', src: 'CAD-87911' },
  { id: 'p2', lane: 'CAD', min: -1772, title: 'Domestic disturbance — Cedar Ct, one arrest', sev: 'notable', src: 'CAD-87944' },
  { id: 'p3', lane: 'CAD', min: -1629, title: 'Commercial burglary — Eastgate corridor, 5th in series', sev: 'notable', flag: 'Burglary #5', src: 'CAD-87968' },
  { id: 'p4', lane: 'CAD', min: -1056, title: 'Taser deployment — arrest at Eastgate Plaza', sev: 'critical', flag: 'UOF — Eastgate', src: 'CAD-88102', link: { route: '/command/approvals', label: 'Open in Decision Center' }, desc: 'Subject of review UOF-2026-114.' },
  { id: 'p5', lane: 'CAD', min: -415, title: 'Bar fight — Commerce St, three arrests', sev: 'notable', flag: 'Commerce St fight', src: 'CAD-88190' },
  { id: 'p6', lane: 'CAD', min: -368, title: 'Stolen vehicle recovered — Eastgate', sev: 'notable', src: 'CAD-88201' },
  // ── JAIL ──
  { id: 'j1', lane: 'JAIL', min: 140, title: 'Headcount reconciled — 409', sev: 'routine' },
  { id: 'j2', lane: 'JAIL', min: 365, title: 'Court transport returned — 3 detainees', sev: 'routine' },
  { id: 'j3', lane: 'JAIL', min: 700, title: 'Intake screening exceeded 4h standard', sev: 'notable', flag: 'Intake delay', src: 'JMS-4471', link: { route: '/command/risk', label: 'Open in Risk Center' }, desc: 'Feeds the open ACA intake finding.' },
  { id: 'j4', lane: 'JAIL', min: 1030, title: 'Booking — barricade arrest', sev: 'notable', thread: 'mercer', src: 'JMS-4479' },
  { id: 'j5', lane: 'JAIL', min: 1315, title: 'Medical transport — C-block, returned stable', sev: 'routine' },
  { id: 'j6', lane: 'JAIL', min: 1420, title: 'Headcount reconciled — 412', sev: 'routine' },
  // ── INVESTIGATIONS ──
  { id: 'i1', lane: 'INVESTIGATIONS', min: 210, title: 'Case 2026-4462 — evidence logged', sev: 'routine' },
  { id: 'i2', lane: 'INVESTIGATIONS', min: 435, title: 'Witness interview — case 2026-4455', sev: 'routine' },
  { id: 'i3', lane: 'INVESTIGATIONS', min: 1230, title: 'Commercial burglary — Eastgate Plaza, 7th in series', sev: 'notable', flag: 'Burglary — Eastgate', src: 'RMS-2026-4471', desc: 'Same-crew pattern holding; detective bureau briefed 05:10.' },
  { id: 'i4', lane: 'INVESTIGATIONS', min: 1390, title: 'Detective bureau assigned — burglary series', sev: 'routine' },
  { id: 'i5', lane: 'INVESTIGATIONS', min: -285, title: 'Commercial burglary — Eastgate strip, 6th in series', sev: 'notable', flag: 'Burglary #6', src: 'RMS-2026-4468' },
  // ── PERSONNEL ──
  { id: 'pe1', lane: 'PERSONNEL', min: 15, title: 'Day-shift roster posted — full strength', sev: 'routine' },
  { id: 'pe2', lane: 'PERSONNEL', min: 480, title: 'Shift-change briefing — B watch', sev: 'routine' },
  { id: 'pe3', lane: 'PERSONNEL', min: 1429, title: 'Sector 4 day shift — 2 below minimum', sev: 'critical', flag: 'Sector 4 short', src: 'HR-0803', link: { route: '/command/approvals', label: 'Open in Decision Center' }, desc: 'Coverage request pending decision by 0700.' },
  // ── FLEET ──
  { id: 'f1', lane: 'FLEET', min: 280, title: 'Unit 307 — state inspection passed', sev: 'routine' },
  { id: 'f2', lane: 'FLEET', min: 1210, title: 'AVL telemetry gaps — 3 pursuit-rated units', sev: 'notable', flag: 'AVL gaps', thread: 'pursuit', src: 'FLT-1183', desc: 'Units 231, 244, 251 intermittent overnight.' },
  { id: 'f3', lane: 'FLEET', min: 1390, title: 'Modem firmware pushed — units restored', sev: 'routine', thread: 'pursuit', src: 'FLT-1184' },
  // ── COMPLIANCE ──
  { id: 'co1', lane: 'COMPLIANCE', min: 180, title: 'CJIS audit evidence bundle updated', sev: 'routine' },
  { id: 'co2', lane: 'COMPLIANCE', min: 494, title: 'UOF-2026-114 routed for agency-head decision', sev: 'notable', flag: 'UOF routed', src: 'IA-114', link: { route: '/command/approvals', label: 'Open in Decision Center' }, desc: 'Review board 4–1 within policy; window closes Aug 3, 1700.' },
  { id: 'co3', lane: 'COMPLIANCE', min: 1438, title: 'CJIS attestation compiled for signature', sev: 'routine' },
  // ── COMMAND ──
  { id: 'cm1', lane: 'COMMAND', min: 800, title: 'War Room activated — INC-2026-0847', sev: 'critical', flag: 'War Room on', thread: 'mercer', src: 'CMD-0847', link: { route: '/command/warroom', label: 'Open War Room' } },
  { id: 'cm2', lane: 'COMMAND', min: 852, title: 'Evacuation ordered — 4408 Mercer', sev: 'notable', thread: 'mercer', src: 'CMD-0848' },
  { id: 'cm3', lane: 'COMMAND', min: 1364, title: 'BOLO issued — pursuit vehicle', sev: 'notable', thread: 'pursuit', src: 'CMD-0851' },
  { id: 'cm4', lane: 'COMMAND', min: 1427, title: 'Night shift report filed — Lt. Harmon', sev: 'routine' },
];

const sevMarker = {
  critical: 'w-2.5 h-2.5 rounded-full bg-red-500',
  notable: 'w-2 h-2 rounded-full bg-amber-400',
  routine: 'w-[3px] h-3 rounded-sm bg-slate-600',
};

const flagChip = {
  critical: 'border-red-500/50 text-red-400',
  notable: 'border-amber-500/50 text-amber-400',
  routine: 'border-slate-600 text-slate-400',
};

export default function ActivityFeed() {
  const navigate = useNavigate();
  const [view, setView] = useState<'shift' | '24h' | '72h'>('24h');
  const [dayOffset, setDayOffset] = useState(0); // 0 = latest window (Aug 2–3)
  const [filter, setFilter] = useState('');
  const [flaggedOnly, setFlaggedOnly] = useState(false);
  const [selectedId, setSelectedId] = useState('c9');

  const domain = useMemo<[number, number]>(() => {
    const base = dayOffset * 1440;
    if (view === '72h') return [-2880, 1440];
    if (view === 'shift') return [base + 720, base + 1440];
    return [base, base + 1440];
  }, [view, dayOffset]);

  const span = domain[1] - domain[0];
  const pct = (min: number) => ((min - domain[0]) / span) * 100;
  const inDomain = (e: Ev) => e.min >= domain[0] && e.min <= domain[1];
  const matches = (e: Ev) => !filter || e.title.toLowerCase().includes(filter.toLowerCase());

  const visible = EVENTS.filter(e => inDomain(e) && (!flaggedOnly || e.sev !== 'routine'));
  const selected = EVENTS.find(e => e.id === selectedId) || null;
  const threadEvents = selected?.thread
    ? EVENTS.filter(e => e.thread === selected.thread).sort((a, b) => a.min - b.min)
    : [];

  const narrative = EVENTS.filter(e => inDomain(e) && e.flag && matches(e)).sort((a, b) => a.min - b.min);
  const narrativeIdx = narrative.findIndex(e => e.id === selectedId);
  const step = (dir: number) => {
    if (!narrative.length) return;
    const idx = narrativeIdx === -1
      ? (dir > 0 ? 0 : narrative.length - 1)
      : Math.min(narrative.length - 1, Math.max(0, narrativeIdx + dir));
    setSelectedId(narrative[idx].id);
  };

  const ticks = useMemo(() => {
    const stepMin = view === '72h' ? 720 : view === 'shift' ? 120 : 120;
    const out: number[] = [];
    for (let t = domain[0]; t <= domain[1]; t += stepMin) out.push(t);
    return out;
  }, [domain, view]);

  // Night-shift bands (1800 → 0600) intersected with the domain
  const bands = useMemo(() => {
    const out: [number, number][] = [];
    for (let k = -3; k <= 1; k++) {
      const s = Math.max(domain[0], k * 1440 + 720);
      const e = Math.min(domain[1], k * 1440 + 1440);
      if (e > s) out.push([s, e]);
    }
    return out;
  }, [domain]);

  const rangeLabel = `${fmt(domain[0]).clock.replace(':', '')} ${fmt(domain[0]).day} – ${fmt(domain[1]).clock.replace(':', '')} ${fmt(domain[1]).day}`;
  const laneCount = (lane: string) => visible.filter(e => e.lane === lane).length;

  return (
    <DashboardLayout>
      <div className="min-h-full bg-[#0A0A0B] flex flex-col">

        {/* ── Header ─────────────────────────────────────── */}
        <div className="px-6 py-3.5 border-b border-slate-800/70 flex items-center gap-3 flex-wrap">
          <h1 className="text-[16px] font-bold text-slate-100">Operational Timeline</h1>
          <span className="text-[11px] text-slate-500 hidden lg:inline">Read-only projection of CAD · JMS · RMS · HR · Audit — records are not editable here</span>
          <div className="ml-auto flex items-center gap-2 flex-wrap">
            <div className="flex items-center border border-slate-800 rounded-lg overflow-hidden">
              {(['shift', '24h', '72h'] as const).map(v => (
                <button key={v} onClick={() => setView(v)}
                  className={`px-3 py-1.5 text-[11.5px] font-semibold transition-colors ${view === v ? 'bg-amber-500/15 text-amber-400' : 'text-slate-400 hover:text-slate-200'}`}>
                  {v === 'shift' ? 'Shift' : v}
                </button>
              ))}
            </div>
            {view !== '72h' && (
              <div className="flex items-center gap-1.5">
                <button onClick={() => setDayOffset(Math.max(-2, dayOffset - 1))} disabled={dayOffset <= -2}
                  className="px-2 py-1.5 border border-slate-800 rounded-lg text-[11px] text-slate-300 hover:bg-zinc-900/60 disabled:opacity-30 transition-colors">←</button>
                <span className="text-[11px] font-mono text-slate-400 whitespace-nowrap">{rangeLabel}</span>
                <button onClick={() => setDayOffset(Math.min(0, dayOffset + 1))} disabled={dayOffset >= 0}
                  className="px-2 py-1.5 border border-slate-800 rounded-lg text-[11px] text-slate-300 hover:bg-zinc-900/60 disabled:opacity-30 transition-colors">→</button>
              </div>
            )}
            <button onClick={() => setFlaggedOnly(!flaggedOnly)}
              className={`px-3 py-1.5 border rounded-lg text-[11.5px] font-semibold transition-colors ${flaggedOnly ? 'border-amber-500/40 text-amber-400 bg-amber-500/10' : 'border-slate-800 text-slate-400 hover:text-slate-200'}`}>
              Flagged only
            </button>
            <input
              type="text" value={filter} onChange={e => setFilter(e.target.value)}
              placeholder="Filter — unit, case #, location"
              className="w-52 px-3 py-1.5 bg-zinc-900/50 border border-slate-800 rounded-lg text-[11.5px] text-slate-200 placeholder-slate-600 focus:outline-none focus:border-amber-500/40 transition-colors"
            />
            <button className="px-3 py-1.5 border border-slate-700/60 rounded-lg text-[11.5px] font-semibold text-slate-200 hover:bg-zinc-900/60 transition-colors">Export range — PDF</button>
          </div>
        </div>

        <div className="flex-1 grid grid-cols-1 xl:grid-cols-[1fr,320px] min-h-0">
          <div className="flex flex-col min-h-0">

            {/* ── Canvas ─────────────────────────────────── */}
            <div className="px-6 pt-4 pb-2">
              <div className="flex">
                {/* Lane labels */}
                <div className="w-36 flex-shrink-0">
                  <div className="h-7" />
                  {LANES.map(lane => (
                    <div key={lane} className="h-14 flex flex-col justify-center pr-3">
                      <p className="text-[10.5px] font-bold text-slate-300 text-right tracking-wide">{lane}</p>
                      <p className="text-[9.5px] text-slate-600 text-right">{laneCount(lane)} events</p>
                    </div>
                  ))}
                </div>

                {/* Tracks */}
                <div className="flex-1 min-w-0">
                  {/* Axis */}
                  <div className="relative h-7">
                    {ticks.map(t => (
                      <span key={t} className="absolute -translate-x-1/2 text-[9.5px] font-mono text-slate-500 top-1 whitespace-nowrap" style={{ left: `${pct(t)}%` }}>
                        {view === '72h' ? `${fmt(t).day} ${fmt(t).clock}` : fmt(t).clock}
                      </span>
                    ))}
                  </div>

                  <div className="relative">
                    {/* Night-shift bands */}
                    {bands.map(([s, e], i) => (
                      <div key={i} className="absolute inset-y-0 bg-zinc-900/50 pointer-events-none" style={{ left: `${pct(s)}%`, width: `${pct(e) - pct(s)}%` }}>
                        {view === '24h' && <span className="absolute top-0.5 left-1.5 text-[8.5px] uppercase tracking-wider text-slate-600">night shift</span>}
                      </div>
                    ))}

                    {/* Thread connector */}
                    {selected?.thread && (
                      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <polyline
                          points={threadEvents.filter(inDomain).map(e => `${pct(e.min)},${(LANES.indexOf(e.lane) + 0.62) * (100 / LANES.length)}`).join(' ')}
                          fill="none" stroke="#f59e0b" strokeOpacity="0.5" strokeWidth={1.2} vectorEffect="non-scaling-stroke" strokeDasharray="3 3"
                        />
                      </svg>
                    )}

                    {/* Scrubber */}
                    {selected && inDomain(selected) && (
                      <div className="absolute inset-y-0 w-px bg-amber-500/70 pointer-events-none z-10" style={{ left: `${pct(selected.min)}%` }}>
                        <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full px-1.5 py-px border border-amber-500/60 bg-[#0A0A0B] rounded text-[9.5px] font-mono text-amber-400 whitespace-nowrap">{fmt(selected.min).clock}</span>
                      </div>
                    )}

                    {/* Lane rows */}
                    {LANES.map(lane => (
                      <div key={lane} className="h-14 border-b border-slate-800/40 relative">
                        {visible.filter(e => e.lane === lane).map(e => {
                          const dim = (selected?.thread && e.thread !== selected.thread) || !matches(e);
                          const showChip = e.flag && (view !== '72h' || e.sev === 'critical');
                          return (
                            <React.Fragment key={e.id}>
                              {showChip && (
                                <button
                                  onClick={() => setSelectedId(e.id)}
                                  className={`absolute top-1 -translate-x-1/2 px-1.5 py-px border rounded bg-[#0A0A0B] text-[9px] font-semibold whitespace-nowrap z-20 transition-opacity ${flagChip[e.sev]} ${dim ? 'opacity-20' : ''}`}
                                  style={{ left: `${pct(e.min)}%` }}
                                >{e.flag}</button>
                              )}
                              {showChip && <div className={`absolute top-[20px] bottom-[16px] w-px ${e.sev === 'critical' ? 'bg-red-500/40' : 'bg-amber-500/40'} ${dim ? 'opacity-20' : ''}`} style={{ left: `${pct(e.min)}%` }} />}
                              <button
                                onClick={() => setSelectedId(e.id)}
                                title={`${fmt(e.min).clock} — ${e.title}`}
                                className={`absolute top-[62%] -translate-x-1/2 -translate-y-1/2 transition-opacity ${sevMarker[e.sev]} ${dim ? 'opacity-20' : ''} ${selected?.id === e.id ? 'ring-2 ring-amber-400/70 ring-offset-1 ring-offset-black' : ''}`}
                                style={{ left: `${pct(e.min)}%` }}
                              />
                            </React.Fragment>
                          );
                        })}
                      </div>
                    ))}
                  </div>

                  {/* Legend */}
                  <div className="flex items-center gap-4 pt-2.5 flex-wrap">
                    <span className="flex items-center gap-1.5 text-[9.5px] text-slate-500"><span className="w-2 h-2 rounded-full bg-red-500 inline-block" /> critical</span>
                    <span className="flex items-center gap-1.5 text-[9.5px] text-slate-500"><span className="w-2 h-2 rounded-full bg-amber-400 inline-block" /> flagged</span>
                    <span className="flex items-center gap-1.5 text-[9.5px] text-slate-500"><span className="w-[3px] h-2.5 rounded-sm bg-slate-600 inline-block" /> routine</span>
                    <span className="flex items-center gap-1.5 text-[9.5px] text-slate-500"><span className="w-4 border-t border-dashed border-amber-500/60 inline-block" /> incident thread</span>
                    <span className="flex items-center gap-1.5 text-[9.5px] text-slate-500"><span className="w-3 h-2.5 bg-zinc-900/80 border border-slate-800 inline-block" /> night shift</span>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Narrative ──────────────────────────────── */}
            <div className="border-t border-slate-800/70 px-6 py-4 flex-1">
              <div className="flex items-center gap-3 mb-3">
                <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500">Flagged Events — Narrative</p>
                <span className="text-[10px] text-slate-600">{narrative.length} flagged in range</span>
                <div className="ml-auto flex items-center gap-1.5">
                  <span className="text-[10.5px] text-slate-500 mr-1">Step</span>
                  <button onClick={() => step(-1)} className="px-2.5 py-1 border border-slate-800 rounded-lg text-[11px] text-slate-300 hover:bg-zinc-900/60 transition-colors">←</button>
                  <button onClick={() => step(1)} className="px-2.5 py-1 border border-slate-800 rounded-lg text-[11px] text-slate-300 hover:bg-zinc-900/60 transition-colors">→</button>
                </div>
              </div>
              <div className="divide-y divide-slate-800/40">
                {narrative.map(e => (
                  <button key={e.id} onClick={() => setSelectedId(e.id)}
                    className={`w-full text-left flex items-center gap-3 py-2 px-2 -mx-2 rounded transition-colors ${selectedId === e.id ? 'bg-zinc-900/60' : 'hover:bg-zinc-900/30'}`}>
                    <span className="text-[10.5px] font-mono text-slate-500 w-12 flex-shrink-0">{fmt(e.min).clock}</span>
                    <span className={`text-[9.5px] font-bold w-24 flex-shrink-0 ${e.sev === 'critical' ? 'text-red-400' : 'text-amber-400'}`}>{e.lane}</span>
                    <p className="text-[12px] text-slate-200 flex-1 min-w-0 truncate">{e.title}</p>
                    {view === '72h' && <span className="text-[10px] text-slate-600 flex-shrink-0">{fmt(e.min).day}</span>}
                  </button>
                ))}
                {narrative.length === 0 && <p className="text-[11.5px] text-slate-600 py-2">No flagged events match this range and filter.</p>}
              </div>
            </div>
          </div>

          {/* ── Right rail ─────────────────────────────────── */}
          <div className="border-t xl:border-t-0 xl:border-l border-slate-800/70 px-5 py-5 overflow-y-auto">
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500 mb-3">Selected Event</p>
            {selected ? (
              <>
                <div className="flex items-baseline gap-2">
                  <span className="text-[12px] font-mono font-bold text-slate-200">{fmt(selected.min).clock}</span>
                  <span className="text-[10px] text-slate-500">{fmt(selected.min).day}</span>
                  <span className={`text-[9.5px] font-bold ${selected.sev === 'critical' ? 'text-red-400' : selected.sev === 'notable' ? 'text-amber-400' : 'text-slate-500'}`}>{selected.lane}</span>
                </div>
                <h2 className="text-[14px] font-bold text-slate-100 mt-2 leading-snug">{selected.title}</h2>
                <p className="text-[11.5px] text-slate-400 mt-1.5 leading-relaxed">{selected.desc || 'Routine entry — full detail in the source record.'}</p>
                <p className="text-[10.5px] text-slate-500 mt-2.5">
                  Source record: <span className="text-amber-500/90">{selected.src || `${selected.lane} daily log`}</span>
                </p>
                {selected.link && (
                  <button onClick={() => navigate(selected.link!.route)}
                    className="mt-3 px-3 py-1.5 border border-amber-500/40 rounded-lg text-[11px] font-semibold text-amber-400 hover:bg-amber-500/10 transition-colors">
                    {selected.link.label} →
                  </button>
                )}

                <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500 mt-7 mb-1">Related Events</p>
                {selected.thread ? (
                  <div className="divide-y divide-slate-800/40">
                    {threadEvents.map(e => (
                      <button key={e.id} onClick={() => setSelectedId(e.id)}
                        className={`w-full text-left py-2.5 transition-colors ${e.id === selected.id ? '' : 'hover:bg-zinc-900/30'}`}>
                        <div className="flex items-baseline gap-2.5">
                          <span className="text-[10px] font-mono text-slate-500 flex-shrink-0 w-9">{fmt(e.min).clock}</span>
                          <p className={`text-[12px] flex-1 min-w-0 leading-snug ${e.id === selected.id ? 'text-amber-400 font-semibold' : 'text-slate-200'}`}>{e.title}</p>
                        </div>
                        <p className="text-[9.5px] text-slate-600 mt-0.5 ml-[46px]">{e.lane} · {selected.thread}</p>
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="text-[11px] text-slate-600 py-2">No linked events — this entry is not part of an incident thread.</p>
                )}
              </>
            ) : (
              <p className="text-[11.5px] text-slate-600">Select an event on the timeline.</p>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

import { useEffect, useRef, useState } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import { Plus, X, FileText } from 'lucide-react';

// ── Types ─────────────────────────────────────────────────────

type LogSource = 'CAD' | 'RADIO' | 'MANUAL' | 'DECISION';

interface LogEntry {
  time: string;
  source: LogSource;
  text: string;
  by?: string;
}

type UnitGroup = 'scene' | 'perimeter' | 'staging';

interface Unit {
  id: string;
  role: string;
  group: UnitGroup;
  onTaskSec: number;
  x: number;
  y: number;
}

interface Decision {
  id: string;
  title: string;
  desc: string;
  remaining: number;          // seconds until the request expires
  requiresConfirm?: boolean;  // force-level decisions take a two-step confirm
  status: 'pending' | 'authorized' | 'denied' | 'expired';
  armed?: boolean;
  denying?: boolean;
  reason: string;
  resolvedAt?: string;
}

type Phase = 'ACTIVE' | 'CONTAINED' | 'RESOLVED';

// ── Static data ────────────────────────────────────────────────

const IC_NAME = 'Capt. M. Rodriguez';

const initialLog: LogEntry[] = [
  { time: '14:52:56', source: 'RADIO',  text: 'Negotiator reports subject calm, dialogue continuing.' },
  { time: '14:52:44', source: 'CAD',    text: 'Traffic diversion active at 5th & Mercer.' },
  { time: '14:52:32', source: 'CAD',    text: 'Channel 3 designated tactical — all units acknowledge.' },
  { time: '14:52:20', source: 'RADIO',  text: 'Perimeter check complete, all posts holding.' },
  { time: '14:52:08', source: 'RADIO',  text: 'Subject visible at second-floor window, no shots fired.' },
  { time: '14:50:41', source: 'CAD',    text: 'U-231 repositioned to outer perimeter, 5th & Mercer.' },
  { time: '14:47:19', source: 'MANUAL', text: 'Ordered evacuation of adjacent residence 4408.', by: IC_NAME },
  { time: '14:44:02', source: 'RADIO',  text: 'Negotiator has subject on the phone. Line stable.' },
  { time: '14:39:55', source: 'CAD',    text: 'SWAT-1 on scene, staging north of inner perimeter.' },
  { time: '14:31:10', source: 'MANUAL', text: 'Inner perimeter established, 150m radius.', by: IC_NAME },
  { time: '14:22:47', source: 'CAD',    text: 'U-114 first on scene. Subject barricaded, armed.' },
  { time: '14:19:03', source: 'CAD',    text: 'INC-2026-0847 opened — armed barricade, 4400 Blk Mercer Ave.' },
];

// Entries that stream into the log every ~12s to keep the room feeling live.
const streamQueue: { source: LogSource; text: string }[] = [
  { source: 'RADIO', text: 'Negotiator: subject requesting phone contact with brother.' },
  { source: 'CAD',   text: 'MED-4 repositioned to staging point Bravo.' },
  { source: 'RADIO', text: 'Inner perimeter holding. No movement on second floor.' },
  { source: 'CAD',   text: 'Metro PD SWAT element ETA update — 8 min.' },
  { source: 'RADIO', text: 'Subject away from window. TV audio audible inside.' },
  { source: 'CAD',   text: 'PD directing traffic at Mercer & 6th, backlog clearing.' },
  { source: 'RADIO', text: 'Negotiator reports tone steady. No demands change.' },
];

const initialUnits: Unit[] = [
  { id: 'SWAT-1', role: 'Tactical element',  group: 'scene',     onTaskSec: 38 * 60, x: 530, y: 175 },
  { id: 'U-114',  role: 'First on scene',    group: 'scene',     onTaskSec: 35 * 60, x: 620, y: 330 },
  { id: 'U-208',  role: 'West cordon',       group: 'scene',     onTaskSec: 35 * 60, x: 465, y: 365 },
  { id: 'NEG-2',  role: 'Crisis negotiator', group: 'scene',     onTaskSec: 35 * 60, x: 500, y: 250 },
  { id: 'U-231',  role: 'Outer perimeter',   group: 'perimeter', onTaskSec: 35 * 60, x: 700, y: 435 },
  { id: 'U-117',  role: 'Outer perimeter',   group: 'perimeter', onTaskSec: 35 * 60, x: 360, y: 470 },
  { id: 'MED-4',  role: 'EMS staging',       group: 'staging',   onTaskSec: 12 * 60, x: 775, y: 200 },
];

const initialDecisions: Decision[] = [
  {
    id: 'gas',
    title: 'Authorize gas deployment',
    desc: 'SWAT requests authorization for CS gas if negotiation fails. Requires IC approval.',
    remaining: 8 * 60 + 50,
    requiresConfirm: true,
    status: 'pending',
    reason: '',
  },
  {
    id: 'evac',
    title: 'Extend evacuation zone',
    desc: 'Expand evacuation to 4416–4420 Mercer per negotiator assessment.',
    remaining: 23 * 60 + 25,
    status: 'pending',
    reason: '',
  },
];

const situation = [
  { label: 'Subject',   value: '1 male, alone',        warn: false },
  { label: 'Weapons',   value: 'Handgun confirmed',    warn: true },
  { label: 'Hostages',  value: 'None confirmed',       warn: false },
  { label: 'Injuries',  value: 'None reported',        warn: false },
  { label: 'Structure', value: '2-story residence',    warn: false },
];

// County coverage impact of units committed to this incident (from patrol beat data).
const coverageImpact = {
  covered: 5,
  total: 7,
  flags: [
    { text: 'Beat 7 West — UNCOVERED · U-117, U-231 committed here', severity: 'red' },
    { text: 'Beat 2 NE Quad — thin · 1 of 2 units on post', severity: 'amber' },
  ],
};

const cameras = [
  { id: 'CAM-12', x: 655, y: 288 },
  { id: 'CAM-07', x: 415, y: 482 },
  { id: 'CAM-31', x: 820, y: 148 },
];

// ── Helpers ───────────────────────────────────────────────────

const pad = (n: number) => String(n).padStart(2, '0');
const fmtHMS = (s: number) => `${pad(Math.floor(s / 3600))}:${pad(Math.floor(s / 60) % 60)}:${pad(s % 60)}`;
const fmtMS  = (s: number) => `${pad(Math.floor(s / 60))}:${pad(s % 60)}`;
const fmtHM  = (s: number) => `${pad(Math.floor(s / 3600))}:${pad(Math.floor(s / 60) % 60)}`;
const nowStr = () => {
  const d = new Date();
  return `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
};

const sourceBadge: Record<LogSource, string> = {
  CAD:      'text-sky-700 dark:text-sky-400 border-sky-500/40 bg-sky-500/10',
  RADIO:    'text-amber-700 dark:text-amber-400 border-amber-500/40 bg-amber-500/10',
  MANUAL:   'text-orange-700 dark:text-orange-400 border-orange-500/50 bg-orange-500/10',
  DECISION: 'text-emerald-700 dark:text-emerald-400 border-emerald-500/40 bg-emerald-500/10',
};

const groupMeta: Record<UnitGroup, { label: string; dot: string; ring: string; fill: string }> = {
  scene:     { label: 'On scene',  dot: 'bg-emerald-500', ring: '#10B981', fill: '#065F46' },
  perimeter: { label: 'Perimeter', dot: 'bg-amber-400',   ring: '#F59E0B', fill: '#78350F' },
  staging:   { label: 'Staging',   dot: 'bg-slate-400',   ring: '#94A3B8', fill: '#334155' },
};

const phases: Phase[] = ['ACTIVE', 'CONTAINED', 'RESOLVED'];

// ── Component ─────────────────────────────────────────────────

export default function CommandWarRoom() {
  const [elapsed, setElapsed] = useState(48 * 60 + 2);
  const [log, setLog] = useState<LogEntry[]>(initialLog);
  const [units, setUnits] = useState<Unit[]>(initialUnits);
  const [decisions, setDecisions] = useState<Decision[]>(initialDecisions);
  const [phase, setPhase] = useState<Phase>('ACTIVE');
  const [outerOn, setOuterOn] = useState(true);
  const [selectedUnit, setSelectedUnit] = useState<string | null>(null);
  const [etaSec, setEtaSec] = useState(11 * 60);
  const [logModalOpen, setLogModalOpen] = useState(false);
  const [logDraft, setLogDraft] = useState('');
  const queueRef = useRef([...streamQueue]);
  const tickRef = useRef(0);

  const pushLog = (source: LogSource, text: string, by?: string) => {
    setLog(prev => [{ time: nowStr(), source, text, by }, ...prev]);
  };

  // Single 1s heartbeat drives the elapsed clock, decision countdowns,
  // time-on-task counters, mutual-aid ETA, and the log stream.
  useEffect(() => {
    const t = setInterval(() => {
      setElapsed(e => e + 1);
      setEtaSec(e => Math.max(0, e - 1));
      setUnits(us => us.map(u => ({ ...u, onTaskSec: u.onTaskSec + 1 })));
      setDecisions(ds => ds.map(d => {
        if (d.status !== 'pending') return d;
        const remaining = Math.max(0, d.remaining - 1);
        return { ...d, remaining, status: remaining === 0 ? 'expired' : 'pending' };
      }));
      tickRef.current += 1;
      if (tickRef.current % 12 === 0 && queueRef.current.length > 0) {
        const next = queueRef.current.shift()!;
        setLog(prev => [{ time: nowStr(), ...next }, ...prev]);
      }
    }, 1000);
    return () => clearInterval(t);
  }, []);

  const handlePhase = (p: Phase) => {
    if (p === phase) return;
    setPhase(p);
    pushLog('MANUAL', `Incident phase changed to ${p}.`, IC_NAME);
  };

  const authorize = (id: string) => {
    setDecisions(ds => ds.map(d => {
      if (d.id !== id || d.status !== 'pending') return d;
      if (d.requiresConfirm && !d.armed) return { ...d, armed: true, denying: false };
      return { ...d, status: 'authorized', armed: false, resolvedAt: nowStr() };
    }));
    const d = decisions.find(x => x.id === id);
    if (d && d.status === 'pending' && (!d.requiresConfirm || d.armed)) {
      pushLog('DECISION', `AUTHORIZED — ${d.title}.`, IC_NAME);
    }
  };

  const startDeny = (id: string) => {
    setDecisions(ds => ds.map(d => d.id === id ? { ...d, denying: true, armed: false } : d));
  };

  const confirmDeny = (id: string) => {
    const d = decisions.find(x => x.id === id);
    if (!d || !d.reason.trim()) return;
    setDecisions(ds => ds.map(x => x.id === id ? { ...x, status: 'denied', denying: false, resolvedAt: nowStr() } : x));
    pushLog('DECISION', `DENIED — ${d.title}. Reason: ${d.reason.trim()}`, IC_NAME);
  };

  const reassign = (id: string, group: UnitGroup) => {
    const meta = groupMeta[group];
    setUnits(us => us.map(u => u.id === id ? { ...u, group, role: group === 'staging' ? 'Staged' : u.role } : u));
    pushLog('CAD', `${id} reassigned to ${meta.label.toLowerCase()} per IC.`);
    setSelectedUnit(null);
  };

  const submitLogDecision = () => {
    if (!logDraft.trim()) return;
    pushLog('MANUAL', logDraft.trim(), IC_NAME);
    setLogDraft('');
    setLogModalOpen(false);
  };

  const selUnit = units.find(u => u.id === selectedUnit) ?? null;
  const groups: { key: UnitGroup; units: Unit[] }[] = (['scene', 'perimeter', 'staging'] as UnitGroup[])
    .map(key => ({ key, units: units.filter(u => u.group === key) }))
    .filter(g => g.units.length > 0);

  return (
    <DashboardLayout>
      <div className="p-3 lg:p-4 space-y-3">

        {/* ── Incident banner ─────────────────────────────── */}
        <div className="bg-white dark:bg-[#0D0F12] border border-slate-200 dark:border-slate-700/30 border-b-2 border-b-red-500/60 rounded-xl px-4 py-2.5 flex flex-wrap items-center gap-x-4 gap-y-2">
          <span className="font-mono text-[12px] font-bold text-red-700 dark:text-red-400 tracking-wide">INC-2026-0847</span>
          <h1 className="text-[15px] font-bold text-slate-900 dark:text-white">Armed Barricade — 4400 Blk Mercer Ave</h1>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded border border-red-500/50 bg-red-500/10 text-red-700 dark:text-red-400 tracking-widest">CRITICAL</span>
          <div className="flex items-center gap-1">
            {phases.map(p => (
              <button
                key={p}
                onClick={() => handlePhase(p)}
                className={`text-[10px] font-bold px-2.5 py-1 rounded border tracking-widest transition-colors ${
                  phase === p
                    ? 'border-amber-500/60 bg-amber-500/10 text-amber-700 dark:text-amber-400'
                    : 'border-slate-200 dark:border-slate-700/40 text-slate-400 dark:text-slate-600 hover:text-slate-600 dark:hover:text-slate-400'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
          <div className="ml-auto flex items-center gap-4">
            <div className="text-right">
              <p className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Incident Commander</p>
              <p className="text-[12px] font-semibold text-slate-900 dark:text-white">
                {IC_NAME}{' '}
                <button
                  onClick={() => pushLog('MANUAL', 'Command transfer requested — pending acceptance.', IC_NAME)}
                  className="text-amber-600 dark:text-amber-400 text-[11px] font-medium hover:underline"
                >
                  Transfer
                </button>
              </p>
            </div>
            <div className="h-8 w-px bg-slate-200 dark:bg-slate-700/40" />
            <div className="text-right">
              <p className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Elapsed</p>
              <p className="font-mono text-[18px] font-bold text-slate-900 dark:text-white leading-none tabular-nums">{fmtHMS(elapsed)}</p>
            </div>
          </div>
        </div>

        {/* ── Three-zone grid ─────────────────────────────── */}
        <div className="grid grid-cols-1 xl:grid-cols-[300px_minmax(0,1fr)_330px] gap-3 items-start">

          {/* ════ LEFT — Incident log ════ */}
          <div className="bg-white dark:bg-zinc-900/25 border border-slate-200 dark:border-slate-700/30 rounded-xl flex flex-col h-[480px] xl:h-[calc(100vh-190px)]">
            <div className="flex items-center justify-between px-3.5 py-2.5 border-b border-slate-200 dark:border-slate-700/20">
              <h3 className="text-[11px] font-black text-slate-900 dark:text-white uppercase tracking-widest">Incident Log</h3>
              <span className="text-[10px] text-slate-500">{log.length} entries · immutable</span>
            </div>
            <div className="flex-1 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/30">
              {log.map((e, i) => (
                <div key={`${e.time}-${i}`} className="px-3.5 py-2">
                  <div className="flex items-start gap-2">
                    <span className="font-mono text-[10px] text-slate-400 dark:text-slate-500 tabular-nums flex-shrink-0 mt-0.5">{e.time}</span>
                    <span className={`text-[8.5px] font-bold px-1.5 py-px rounded border tracking-wider flex-shrink-0 mt-0.5 ${sourceBadge[e.source]}`}>{e.source}</span>
                    <p className="text-[11.5px] text-slate-800 dark:text-slate-200 leading-snug min-w-0">{e.text}</p>
                  </div>
                  {e.by && <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5 pl-[52px]">— {e.by}</p>}
                </div>
              ))}
            </div>
            <div className="p-2.5 border-t border-slate-200 dark:border-slate-700/20">
              <button
                onClick={() => setLogModalOpen(true)}
                className="w-full py-2 rounded-lg border border-slate-200 dark:border-slate-700/40 bg-slate-50 dark:bg-zinc-900/40 hover:bg-slate-100 dark:hover:bg-zinc-900/70 text-[12px] font-semibold text-slate-700 dark:text-slate-200 transition-colors flex items-center justify-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" /> Log decision
              </button>
            </div>
          </div>

          {/* ════ CENTER — Tactical map ════ */}
          <div className="relative bg-[#0B0E13] border border-slate-200 dark:border-slate-700/30 rounded-xl overflow-hidden h-[480px] xl:h-[calc(100vh-190px)]">
            {/* Map header chips */}
            <div className="absolute top-3 left-3 right-3 z-10 flex items-center gap-2 flex-wrap">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/50 border border-white/10 backdrop-blur-sm">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                </span>
                <span className="text-[10px] font-bold text-slate-200 tracking-wide">CAD LIVE · 4s refresh</span>
              </div>
              <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-black/50 border border-white/10 backdrop-blur-sm text-[10px] text-slate-300">
                <span className="flex items-center gap-1"><span className="text-red-400">◆</span> Incident</span>
                <span className="flex items-center gap-1"><span className="text-emerald-400">●</span> Unit</span>
                <span className="flex items-center gap-1"><span className="text-slate-400">◇</span> Camera</span>
              </div>
              <button
                onClick={() => setOuterOn(o => !o)}
                className={`px-3 py-1.5 rounded-lg border backdrop-blur-sm text-[10px] font-semibold transition-colors ${
                  outerOn ? 'bg-amber-500/15 border-amber-500/40 text-amber-300' : 'bg-black/50 border-white/10 text-slate-500'
                }`}
              >
                Outer perimeter {outerOn ? 'ON' : 'OFF'}
              </button>
            </div>

            <svg viewBox="0 0 1000 620" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
              {/* Grid */}
              {Array.from({ length: 13 }, (_, i) => (
                <line key={`v${i}`} x1={i * 80} y1={0} x2={i * 80} y2={620} stroke="#ffffff" strokeOpacity={0.03} />
              ))}
              {Array.from({ length: 8 }, (_, i) => (
                <line key={`h${i}`} x1={0} y1={i * 80} x2={1000} y2={i * 80} stroke="#ffffff" strokeOpacity={0.03} />
              ))}
              {/* Streets */}
              <rect x={0} y={296} width={1000} height={30} fill="#ffffff" fillOpacity={0.05} />
              <rect x={702} y={0} width={26} height={620} fill="#ffffff" fillOpacity={0.05} />
              <rect x={356} y={0} width={22} height={620} fill="#ffffff" fillOpacity={0.035} />
              <text x={18} y={290} fill="#64748B" fontSize={11} fontFamily="monospace" letterSpacing={3}>MERCER AVE</text>
              <text x={740} y={90} fill="#64748B" fontSize={11} fontFamily="monospace" letterSpacing={3} transform="rotate(90 740 90)">5TH ST</text>

              {/* Outer perimeter */}
              {outerOn && (
                <g>
                  <circle cx={560} cy={310} r={272} fill="none" stroke="#F59E0B" strokeOpacity={0.35} strokeDasharray="2 7" />
                  <text x={560} y={604} textAnchor="middle" fill="#F59E0B" fillOpacity={0.7} fontSize={11} fontFamily="monospace" letterSpacing={3} fontWeight="bold">OUTER PERIMETER</text>
                </g>
              )}
              {/* Inner perimeter */}
              <circle cx={560} cy={310} r={168} fill="none" stroke="#EF4444" strokeOpacity={0.5} strokeDasharray="7 5" />
              <text x={560} y={498} textAnchor="middle" fill="#EF4444" fillOpacity={0.8} fontSize={11} fontFamily="monospace" letterSpacing={3} fontWeight="bold">INNER PERIMETER</text>

              {/* Incident marker */}
              <g transform="translate(560 310)">
                <rect x={-9} y={-9} width={18} height={18} fill="#EF4444" transform="rotate(45)" stroke="#FCA5A5" strokeWidth={1.5}>
                  <animate attributeName="opacity" values="1;0.6;1" dur="1.6s" repeatCount="indefinite" />
                </rect>
              </g>

              {/* Cameras */}
              {cameras.map(c => (
                <g key={c.id} transform={`translate(${c.x} ${c.y})`}>
                  <rect x={-5} y={-5} width={10} height={10} fill="none" stroke="#94A3B8" strokeOpacity={0.7} transform="rotate(45)" />
                  <title>{c.id}</title>
                </g>
              ))}

              {/* Units */}
              {units.map(u => {
                const meta = groupMeta[u.group];
                const selected = selectedUnit === u.id;
                return (
                  <g key={u.id} transform={`translate(${u.x} ${u.y})`} className="cursor-pointer" onClick={() => setSelectedUnit(selected ? null : u.id)}>
                    {u.group === 'scene' && (
                      <circle r={9} fill="none" stroke={meta.ring} strokeOpacity={0.8}>
                        <animate attributeName="r" values="9;16" dur="1.8s" repeatCount="indefinite" />
                        <animate attributeName="stroke-opacity" values="0.8;0" dur="1.8s" repeatCount="indefinite" />
                      </circle>
                    )}
                    <circle r={9} fill={meta.fill} stroke={meta.ring} strokeWidth={selected ? 3 : 2} />
                    <circle r={3.5} fill={meta.ring} />
                    <text y={26} textAnchor="middle" fill="#E2E8F0" fontSize={11} fontFamily="monospace" fontWeight="bold">{u.id}</text>
                  </g>
                );
              })}
            </svg>

            <p className="absolute bottom-2 right-3 text-[9px] text-slate-600 font-mono">Stylized display — production build sits on live CAD/AVL basemap</p>

            {/* Unit detail card */}
            {selUnit && (
              <div className="absolute bottom-3 left-3 z-10 w-60 bg-black/70 backdrop-blur-md border border-white/15 rounded-xl p-3">
                <div className="flex items-start justify-between mb-1.5">
                  <div>
                    <p className="font-mono text-[13px] font-bold text-white">{selUnit.id}</p>
                    <p className="text-[11px] text-slate-300">{selUnit.role}</p>
                  </div>
                  <button onClick={() => setSelectedUnit(null)} className="text-slate-400 hover:text-white"><X className="w-3.5 h-3.5" /></button>
                </div>
                <div className="flex items-center gap-2 text-[10px] text-slate-400 mb-2">
                  <span className={`w-1.5 h-1.5 rounded-full ${groupMeta[selUnit.group].dot}`} />
                  <span>{groupMeta[selUnit.group].label}</span>
                  <span className="font-mono tabular-nums ml-auto">on task {fmtHM(selUnit.onTaskSec)}</span>
                </div>
                <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1">Reassign to</p>
                <div className="flex gap-1.5">
                  {(['scene', 'perimeter', 'staging'] as UnitGroup[]).filter(g => g !== selUnit.group).map(g => (
                    <button
                      key={g}
                      onClick={() => reassign(selUnit.id, g)}
                      className="flex-1 py-1.5 rounded-lg border border-white/15 bg-white/5 hover:bg-white/15 text-[10px] font-semibold text-slate-200 transition-colors"
                    >
                      {groupMeta[g].label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ════ RIGHT — Situation / decisions / units ════ */}
          <div className="space-y-3 min-w-0">

            {/* Situation */}
            <div className="bg-white dark:bg-zinc-900/25 border border-slate-200 dark:border-slate-700/30 rounded-xl p-3.5">
              <h3 className="text-[11px] font-black text-slate-900 dark:text-white uppercase tracking-widest mb-2">Situation</h3>
              <div className="space-y-1">
                {situation.map(s => (
                  <div key={s.label} className="flex items-center justify-between text-[11.5px]">
                    <span className="text-slate-500">{s.label}</span>
                    <span className={s.warn ? 'text-red-700 dark:text-red-400 font-semibold' : 'text-slate-800 dark:text-slate-200'}>{s.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pending decisions */}
            <div className="bg-white dark:bg-zinc-900/25 border border-slate-200 dark:border-slate-700/30 rounded-xl p-3.5">
              <h3 className="text-[11px] font-black text-slate-900 dark:text-white uppercase tracking-widest mb-2.5">Pending Decisions</h3>
              <div className="space-y-2.5">
                {decisions.map(d => {
                  if (d.status === 'authorized' || d.status === 'denied') {
                    const ok = d.status === 'authorized';
                    return (
                      <div key={d.id} className={`rounded-lg border px-3 py-2 ${ok ? 'border-emerald-500/30 bg-emerald-500/5' : 'border-red-500/30 bg-red-500/5'}`}>
                        <p className="text-[12px] font-semibold text-slate-800 dark:text-slate-200">{d.title}</p>
                        <p className={`text-[10px] font-bold mt-0.5 ${ok ? 'text-emerald-700 dark:text-emerald-400' : 'text-red-700 dark:text-red-400'}`}>
                          {ok ? 'AUTHORIZED' : 'DENIED'} · {d.resolvedAt} · {IC_NAME}
                        </p>
                      </div>
                    );
                  }
                  const expired = d.status === 'expired';
                  return (
                    <div key={d.id} className={`rounded-lg border p-3 ${d.requiresConfirm ? 'border-red-500/40' : 'border-slate-200 dark:border-slate-700/40'}`}>
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <p className="text-[12.5px] font-bold text-slate-900 dark:text-white">{d.title}</p>
                        {expired ? (
                          <span className="text-[10px] font-bold text-red-700 dark:text-red-400">EXPIRED</span>
                        ) : (
                          <span className="font-mono text-[11px] font-bold text-amber-600 dark:text-amber-400 tabular-nums" title="Time until request expires">
                            expires {fmtMS(d.remaining)}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug mb-2.5">{d.desc}</p>
                      {d.denying ? (
                        <div>
                          <textarea
                            value={d.reason}
                            onChange={e => setDecisions(ds => ds.map(x => x.id === d.id ? { ...x, reason: e.target.value } : x))}
                            placeholder="Reason for denial (required, logged)…"
                            rows={2}
                            className="w-full px-2.5 py-1.5 bg-slate-50 dark:bg-zinc-900/60 border border-slate-200 dark:border-slate-700/40 rounded-lg text-[11px] text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:border-red-400 dark:focus:border-red-500/50 resize-none mb-1.5"
                          />
                          <div className="flex gap-1.5">
                            <button
                              onClick={() => confirmDeny(d.id)}
                              disabled={!d.reason.trim()}
                              className="flex-1 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-[11px] font-bold transition-colors"
                            >
                              Confirm denial
                            </button>
                            <button
                              onClick={() => setDecisions(ds => ds.map(x => x.id === d.id ? { ...x, denying: false, reason: '' } : x))}
                              className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700/40 text-[11px] text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex gap-2">
                          <button
                            onClick={() => authorize(d.id)}
                            disabled={expired}
                            className={`flex-1 py-1.5 rounded-lg text-[11px] font-bold transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${
                              d.armed
                                ? 'bg-red-600 hover:bg-red-700 text-white'
                                : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                            }`}
                          >
                            {d.armed ? 'Confirm authorization' : 'Authorize'}
                          </button>
                          <button
                            onClick={() => startDeny(d.id)}
                            disabled={expired}
                            className="flex-1 py-1.5 rounded-lg border border-red-500/40 text-red-700 dark:text-red-400 hover:bg-red-500/10 text-[11px] font-bold transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                          >
                            Deny
                          </button>
                        </div>
                      )}
                      {d.armed && <p className="text-[9.5px] text-red-600 dark:text-red-400 mt-1.5">Force-level decision — confirm to authorize. Entry is logged.</p>}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Units roster */}
            <div className="bg-white dark:bg-zinc-900/25 border border-slate-200 dark:border-slate-700/30 rounded-xl p-3.5">
              <h3 className="text-[11px] font-black text-slate-900 dark:text-white uppercase tracking-widest mb-2.5">Units — {units.length} committed</h3>
              <div className="space-y-2.5">
                {groups.map(g => (
                  <div key={g.key}>
                    <p className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">{groupMeta[g.key].label} · {g.units.length}</p>
                    <div className="space-y-0.5">
                      {g.units.map(u => (
                        <button
                          key={u.id}
                          onClick={() => setSelectedUnit(u.id)}
                          className="w-full flex items-center gap-2 px-1.5 py-1 rounded-md hover:bg-slate-50 dark:hover:bg-zinc-900/40 transition-colors text-left"
                        >
                          <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${groupMeta[g.key].dot}`} />
                          <span className="font-mono text-[11px] font-bold text-slate-900 dark:text-white w-14 flex-shrink-0">{u.id}</span>
                          <span className="text-[11px] text-slate-600 dark:text-slate-400 truncate flex-1">{u.role}</span>
                          <span className="font-mono text-[10px] text-slate-400 dark:text-slate-500 tabular-nums flex-shrink-0">{fmtHM(u.onTaskSec)}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* County coverage impact (from patrol beat data) */}
            <div className="bg-white dark:bg-zinc-900/25 border border-amber-500/30 rounded-xl p-3.5">
              <div className="flex items-center justify-between mb-1.5">
                <h3 className="text-[11px] font-black text-slate-900 dark:text-white uppercase tracking-widest">Coverage Impact</h3>
                <span className="text-[10px] font-bold text-amber-700 dark:text-amber-400 tabular-nums">{coverageImpact.covered}/{coverageImpact.total} beats covered</span>
              </div>
              <div className="space-y-1">
                {coverageImpact.flags.map((f, i) => (
                  <div key={i} className="flex items-start gap-1.5">
                    <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1 ${f.severity === 'red' ? 'bg-red-500' : 'bg-amber-400'}`} />
                    <p className={`text-[10.5px] leading-snug ${f.severity === 'red' ? 'text-red-700 dark:text-red-400 font-medium' : 'text-slate-600 dark:text-slate-400'}`}>{f.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Mutual aid */}
            <div className="bg-white dark:bg-zinc-900/25 border border-slate-200 dark:border-slate-700/30 rounded-xl px-3.5 py-3 flex items-center justify-between gap-2">
              <div>
                <p className="text-[12px] font-bold text-slate-900 dark:text-white">Mutual aid — Metro PD</p>
                <p className="text-[10.5px] text-slate-500">SWAT element · ETA {Math.max(1, Math.ceil(etaSec / 60))} min</p>
              </div>
              <span className="text-[10px] font-black text-amber-600 dark:text-amber-400 tracking-widest">{etaSec === 0 ? 'ARRIVED' : 'EN ROUTE'}</span>
            </div>

          </div>
        </div>
      </div>

      {/* ── Log decision modal ─────────────────────────────── */}
      {logModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setLogModalOpen(false)} />
          <div className="relative bg-white dark:bg-zinc-950 border border-slate-200 dark:border-slate-700/50 rounded-2xl p-6 max-w-md w-full shadow-2xl">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center border border-slate-200 dark:border-slate-700/50 flex-shrink-0">
                <FileText className="w-5 h-5 text-slate-600 dark:text-slate-300" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-slate-900 dark:text-white">Log a command decision</h3>
                <p className="text-xs text-slate-500">Written to the immutable incident log, attributed to {IC_NAME}.</p>
              </div>
            </div>
            <textarea
              value={logDraft}
              onChange={e => setLogDraft(e.target.value)}
              placeholder="Decision and rationale…"
              rows={4}
              autoFocus
              className="w-full px-3 py-2.5 bg-slate-50 dark:bg-zinc-900/60 border border-slate-200 dark:border-slate-700/40 rounded-xl text-[13px] text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:border-amber-400 dark:focus:border-amber-500/50 resize-none mb-4"
            />
            <div className="flex gap-2.5">
              <button
                onClick={() => setLogModalOpen(false)}
                className="flex-1 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700/50 text-slate-700 dark:text-white text-[13px] font-medium hover:bg-slate-50 dark:hover:bg-zinc-900/60 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={submitLogDecision}
                disabled={!logDraft.trim()}
                className="flex-1 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-[13px] font-bold transition-colors"
              >
                Log entry
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

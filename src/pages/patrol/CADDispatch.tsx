import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';

// ── Types ─────────────────────────────────────────────────────

interface Zone {
  zone: string;
  precinct: string;
  min: number;
  assigned: number;
  available: number;
  holding: number;
  avgP1: string;
  p1Over?: boolean;
  constraint: string;
}

interface Call {
  id: string;
  pri: 'P1' | 'P2' | 'P3' | 'P4';
  type: string;
  location: string;
  zone: string;
  holding: string;
  nearest: string;
  outOfZone?: boolean;
}

interface Unit {
  unit: string;
  officer: string;
  zone: string;
  status: 'IN SERVICE' | 'ON SCENE' | 'EN ROUTE' | 'REPORT WRITING' | 'TRANSPORT' | 'MEAL' | 'COURT' | 'OUT — VEHICLE';
  inStatus: string;
  activity: string;
  /** No CAD update in over 90 minutes — the supervisor's cue to force a check. */
  stale?: boolean;
  activityTone?: 'red' | 'amber';
}

// ── Watch state ────────────────────────────────────────────────

const watch = {
  letter: 'B',
  hours: '0600–1400',
  supervisor: 'Lt. Harmon',
  elapsed: '02:26',
  p1Median: '8:14',
  p1Standard: '8:00',
  p1Calls: 9,
  p1Over: 2,
  p1Compliance: 78,
  selfInitiated: 34,
  perUnit: '4.1',
};

// A zone is "below minimum" on available units, not assigned — a unit on scene
// is not coverage. Available = assigned minus on-scene, en route, out of service.
const zones: Zone[] = [
  { zone: 'Zone 1 — Duluth',        precinct: 'West Precinct · beats 11–14',    min: 3, assigned: 3, available: 1, holding: 1, avgP1: '6:41',  constraint: 'At minimum strength' },
  { zone: 'Zone 2 — Lawrenceville', precinct: 'Central Precinct · beats 21–25', min: 4, assigned: 3, available: 1, holding: 1, avgP1: '8:52', p1Over: true, constraint: 'SR-316 closure extending east-side response' },
  { zone: 'Zone 3 — Snellville',    precinct: 'South Precinct · beats 31–34',   min: 3, assigned: 2, available: 1, holding: 1, avgP1: '7:12',  constraint: '2C34 on prisoner transport' },
  { zone: 'Zone 4 — Norcross',      precinct: 'West Precinct · beats 41–45',    min: 4, assigned: 2, available: 0, holding: 2, avgP1: '11:24', p1Over: true, constraint: '2D44 vehicle down — covered by Zone 1 and 3' },
  { zone: 'Zone 5 — Sugar Hill',    precinct: 'North Precinct · beats 51–53',   min: 2, assigned: 2, available: 1, holding: 0, avgP1: '6:08',  constraint: 'At minimum strength' },
  { zone: 'Zone 6 — Grayson',       precinct: 'South Precinct · beats 61–63',   min: 2, assigned: 2, available: 1, holding: 1, avgP1: '7:47',  constraint: '2F64 in Superior Court until 1100' },
  { zone: 'Zone 7 — Buford',        precinct: 'North Precinct · beats 71–74',   min: 2, assigned: 2, available: 1, holding: 1, avgP1: '6:55',  constraint: 'At minimum strength' },
];

const callQueue: Call[] = [
  { id: '26-08856', pri: 'P1', type: 'Domestic in progress',  location: '2100 blk Sever Rd',      zone: 'Zone 4 — Norcross',      holding: '1h 36m', nearest: '2A11', outOfZone: true },
  { id: '26-08857', pri: 'P1', type: 'Injury collision',      location: 'SR-316 at Collins Hill', zone: 'Zone 2 — Lawrenceville', holding: '1h 34m', nearest: '2B21' },
  { id: '26-08850', pri: 'P2', type: 'Shoplifting',           location: '4400 blk Peachtree',     zone: 'Zone 1 — Duluth',        holding: '1h 57m', nearest: '2A11' },
  { id: '26-08854', pri: 'P2', type: 'Commercial alarm',      location: 'Eastgate Plaza',         zone: 'Zone 4 — Norcross',      holding: '1h 49m', nearest: '2A11', outOfZone: true },
  { id: '26-08843', pri: 'P3', type: 'Parking complaint',     location: 'Buford Dr at Hamilton',  zone: 'Zone 7 — Buford',        holding: '2h 31m', nearest: '2G74' },
  { id: '26-08848', pri: 'P3', type: 'Theft report',          location: '900 blk Grayson Hwy',    zone: 'Zone 6 — Grayson',       holding: '2h 14m', nearest: '2F61' },
  { id: '26-08840', pri: 'P4', type: 'Cold burglary',         location: '3200 blk Ronald Reagan', zone: 'Zone 3 — Snellville',    holding: '2h 58m', nearest: '2C31' },
];

const units: Unit[] = [
  { unit: '2A11', officer: 'Dep. Whitaker', zone: 'Zone 1 — Duluth',        status: 'IN SERVICE',     inStatus: '1h 34m', activity: 'Cleared 26-08841 at 0812' },
  { unit: '2A14', officer: 'Dep. Bhatt',    zone: 'Zone 1 — Duluth',        status: 'ON SCENE',       inStatus: '1h 52m', activity: '26-08849 theft report · welfare check pending', stale: true, activityTone: 'red' },
  { unit: '2A17', officer: 'Dep. Corley',   zone: 'Zone 1 — Duluth',        status: 'REPORT WRITING', inStatus: '2h 11m', activity: '26-08836 burglary narrative' },
  { unit: '2B21', officer: 'Dep. Ferrell',  zone: 'Zone 2 — Lawrenceville', status: 'IN SERVICE',     inStatus: '1h 41m', activity: 'Self-initiated traffic 0819' },
  { unit: '2B24', officer: 'Dep. Osei',     zone: 'Zone 2 — Lawrenceville', status: 'EN ROUTE',       inStatus: '1h 36m', activity: '26-08853 alarm' },
  { unit: '2B27', officer: 'Dep. Lindqvist', zone: 'Zone 2 — Lawrenceville', status: 'ON SCENE',      inStatus: '3h 07m', activity: '26-08812 collision — no update', stale: true, activityTone: 'red' },
  { unit: '2C31', officer: 'Dep. Mancuso',  zone: 'Zone 3 — Snellville',    status: 'IN SERVICE',     inStatus: '1h 38m', activity: 'Cleared 26-08844 at 0821' },
  { unit: '2C34', officer: 'Dep. Achebe',   zone: 'Zone 3 — Snellville',    status: 'TRANSPORT',      inStatus: '2h 04m', activity: 'Prisoner transport to detention' },
  { unit: '2D41', officer: 'Dep. Reyes',    zone: 'Zone 4 — Norcross',      status: 'ON SCENE',       inStatus: '2h 22m', activity: '26-08829 domestic · welfare check', stale: true, activityTone: 'red' },
  { unit: '2D44', officer: 'Dep. Palmer',   zone: 'Zone 4 — Norcross',      status: 'OUT — VEHICLE',  inStatus: '2h 43m', activity: 'Unit 44 towed 0708 — fleet notified', activityTone: 'amber' },
  { unit: '2E51', officer: 'Dep. Nakamura', zone: 'Zone 5 — Sugar Hill',    status: 'IN SERVICE',     inStatus: '1h 49m', activity: 'Cleared 26-08839 at 0810' },
  { unit: '2E54', officer: 'Dep. Vance',    zone: 'Zone 5 — Sugar Hill',    status: 'MEAL',           inStatus: '1h 44m', activity: '10-7 meal 0815' },
  { unit: '2F61', officer: 'Dep. Okonkwo',  zone: 'Zone 6 — Grayson',       status: 'IN SERVICE',     inStatus: '1h 33m', activity: 'Self-initiated premise check 0806' },
  { unit: '2F64', officer: 'Dep. Salinas',  zone: 'Zone 6 — Grayson',       status: 'COURT',          inStatus: '3h 38m', activity: 'Superior Court — returns 1100' },
  { unit: '2G71', officer: 'Dep. Bright',   zone: 'Zone 7 — Buford',        status: 'REPORT WRITING', inStatus: '1h 59m', activity: '26-08847 fraud narrative' },
  { unit: '2G74', officer: 'Dep. Tan',      zone: 'Zone 7 — Buford',        status: 'IN SERVICE',     inStatus: '1h 37m', activity: 'Cleared 26-08851 at 0818' },
];

const p1Misses = [
  { time: '0712', call: 'Domestic in progress — 2100 blk Sever Rd', note: 'Zone 4 short, unit responded from Zone 1', elapsed: '14:22' },
  { time: '0748', call: 'Injury collision — SR-316 at Collins Hill', note: 'Construction closure detour',              elapsed: '11:07' },
];

const outOfService = [
  { reason: 'Report writing',        units: '2A17, 2G71', count: 2, eta: '~25m'  },
  { reason: 'Prisoner transport',    units: '2C34',       count: 1, eta: '~40m'  },
  { reason: 'Court appearance',      units: '2F64',       count: 1, eta: '1100'  },
  { reason: 'Meal period',           units: '2E54',       count: 1, eta: '~16m'  },
  { reason: 'Vehicle out of service', units: '2D44',      count: 1, eta: 'fleet', tone: 'red' as const },
];

const specialAssignments = [
  { time: '1600', title: 'National Night Out — Zone 2 staging', note: 'Community event · overlap staffing',  drawn: 6 },
  { time: '0700', title: 'School zone posts — 4 elementary',    note: 'Daily assignment through 0830',       drawn: 4 },
  { time: '0900', title: 'Warrant service detail — Zone 3',     note: 'Fugitive unit supported by patrol',   drawn: 2 },
  { time: '1000', title: 'Superior Court security overflow',    note: 'Requested by court services',         drawn: 1 },
];

const bolos = [
  { dot: 'bg-red-500',   title: 'Silver sedan — pursuit terminated at county line', meta: '26-08829 · partial tag · armed occupant',        age: '3h' },
  { dot: 'bg-amber-400', title: 'Missing adult — endangered, medical condition',    meta: "26-08801 · last seen Duluth · Mattie's Call pending", age: '9h' },
  { dot: 'bg-slate-600', title: 'Commercial burglary crew — Eastgate cluster',      meta: 'RMS pattern · 7 incidents · detective bureau',    age: '6d' },
];

const supervisorItems = [
  { title: 'Pursuit review — 26-08829 termination', note: 'Policy 4.2 · supervisor narrative due 12h', action: 'Review'      },
  { title: 'Use-of-force notification — 26-08822',  note: 'Taser display, no deployment · IA notified', action: 'Sign off'   },
  { title: 'Mutual-aid request — Duluth PD perimeter', note: '2 units requested · 90 minutes',          action: 'Approve'    },
  { title: 'Vehicle damage report — 2D44',          note: 'Fleet 8846 · no collision · mechanical',     action: 'Acknowledge' },
];

const initialPassDown = [
  { time: '0605', text: 'Zone 4 short two units — 2D44 vehicle down, coverage from Zone 1 and 3.' },
  { time: '0640', text: 'SR-316 construction closure through 1400 — expect extended response east of Collins Hill.' },
  { time: '0705', text: '2B27 on scene 26-08812 collision, extended investigation. No status update since.' },
  { time: '0740', text: 'Night Out staging begins 1600 — 6 units committed from B and C watch overlap.' },
];

// ── Helpers ────────────────────────────────────────────────────

const priBadge: Record<Call['pri'], string> = {
  P1: 'border-red-500/60 text-red-400',
  P2: 'border-amber-500/60 text-amber-400',
  P3: 'border-slate-600 text-slate-400',
  P4: 'border-slate-700 text-slate-500',
};

const statusTone: Record<Unit['status'], { dot: string; text: string }> = {
  'IN SERVICE':     { dot: 'bg-emerald-400', text: 'text-emerald-400' },
  'ON SCENE':       { dot: 'bg-amber-400',   text: 'text-amber-400'   },
  'EN ROUTE':       { dot: 'bg-amber-400',   text: 'text-amber-400'   },
  'REPORT WRITING': { dot: 'bg-slate-600',   text: 'text-slate-400'   },
  'TRANSPORT':      { dot: 'bg-slate-600',   text: 'text-slate-400'   },
  'MEAL':           { dot: 'bg-slate-600',   text: 'text-slate-400'   },
  'COURT':          { dot: 'bg-slate-600',   text: 'text-slate-400'   },
  'OUT — VEHICLE':  { dot: 'bg-red-500',     text: 'text-red-400'     },
};

/** "2h 58m" → 178. Lets the banner and the tile quote the queue rather than a literal. */
const toMinutes = (s: string) => {
  const m = s.match(/(?:(\d+)h)?\s*(?:(\d+)m)?/);
  return (Number(m?.[1] ?? 0) * 60) + Number(m?.[2] ?? 0);
};

function SectionLabel({ children, right }: { children: React.ReactNode; right?: React.ReactNode }) {
  return (
    <div className="flex items-baseline justify-between gap-3 mb-3">
      <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500">{children}</p>
      {right}
    </div>
  );
}

function Stat({ label, value, unit, sub, tone = 'text-slate-100' }: {
  label: string; value: string; unit?: string; sub: string; tone?: string;
}) {
  return (
    <div className="px-5 py-4">
      <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500 mb-2">{label}</p>
      <p className="leading-none">
        <span className={`text-[24px] font-bold ${tone}`}>{value}</span>
        {unit && <span className="text-[11.5px] text-slate-400 ml-2">{unit}</span>}
      </p>
      <p className="text-[10.5px] text-slate-500 mt-2">{sub}</p>
    </div>
  );
}

function CADDispatch() {
  const navigate = useNavigate();
  const [passDown, setPassDown] = useState(initialPassDown);
  const [note, setNote] = useState('');

  const addNote = () => {
    const text = note.trim();
    if (!text) return;
    setPassDown((prev) => [...prev, { time: '0826', text }]);
    setNote('');
  };

  const totals = zones.reduce(
    (a, z) => ({
      min: a.min + z.min,
      assigned: a.assigned + z.assigned,
      available: a.available + z.available,
      holding: a.holding + z.holding,
    }),
    { min: 0, assigned: 0, available: 0, holding: 0 },
  );

  const inService = units.filter((u) => u.status === 'IN SERVICE').length;
  const staleUnits = units.filter((u) => u.stale).length;
  const belowMin = zones.filter((z) => z.available < z.min).length;
  const belowMinHolding = zones.filter((z) => z.available < z.min && z.holding > 0).length;
  const p1p2Holding = callQueue.filter((c) => c.pri === 'P1' || c.pri === 'P2').length;
  const oosUnits = outOfService.reduce((a, o) => a + o.count, 0);
  const drawnOff = specialAssignments.reduce((a, s) => a + s.drawn, 0);

  const shortZones = zones.filter((z) => z.available < z.min && z.holding > 0)
    .map((z) => z.zone.split('— ')[1]).join(', ');
  const oldestHold = callQueue.reduce((a, c) => (toMinutes(c.holding) > toMinutes(a) ? c.holding : a), '0m');

  return (
    <DashboardLayout>
      <div className="min-h-full bg-[#0A0A0B] px-6 py-8">
        <div className="max-w-[1900px] mx-auto">

          {/* ── Header ─────────────────────────────────────── */}
          <div className="flex flex-col lg:flex-row lg:items-center gap-3 lg:gap-4">
            <div className="flex items-baseline gap-3 flex-wrap">
              <h1 className="text-[19px] font-bold text-slate-100">Field Operations</h1>
              <span className="text-[11px] text-slate-500">Patrol Division · {watch.letter} Watch floor board · CAD live 4s · AVL · RMS</span>
            </div>
            <div className="flex items-center gap-2.5 lg:ml-auto flex-wrap">
              <button
                onClick={() => navigate('/command/warroom')}
                className="px-3.5 py-2 border border-red-500/40 rounded-lg text-[11.5px] font-semibold text-slate-200 hover:bg-red-500/10 transition-colors"
              >
                Escalate to War Room
              </button>
              <button className="px-3.5 py-2 border border-amber-500/60 rounded-lg text-[11.5px] font-semibold text-amber-400 hover:bg-amber-500/10 transition-colors">
                End watch &amp; hand off
              </button>
            </div>
          </div>

          {/* ── Coverage alert ─────────────────────────────── */}
          <div className="mt-4 border border-red-500/40 bg-red-500/[0.07] rounded-xl px-5 py-3.5 flex items-baseline gap-4 flex-wrap">
            <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-red-400 flex-shrink-0">Coverage alert</span>
            <p className="text-[12px] text-slate-200 flex-1 min-w-[300px] leading-relaxed">
              {shortZones} below minimum with calls holding — {callQueue.length} calls in queue division-wide, oldest {oldestHold}.
            </p>
            <button className="text-[11.5px] font-semibold text-amber-500/90 hover:text-amber-400 transition-colors flex-shrink-0">
              Work the queue →
            </button>
          </div>

          {/* ── Status bar ─────────────────────────────────── */}
          <div className="mt-4 border border-slate-800/80 rounded-xl overflow-hidden">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 divide-y sm:divide-y-0 sm:divide-x divide-slate-800/60 border-b border-slate-800/60">
              <Stat label="Watch" value={watch.letter} unit={watch.hours}
                sub={`${watch.supervisor} · ${watch.elapsed} elapsed`} />
              <Stat label="Units in service" value={`${inService} of ${units.length}`} unit={`min ${totals.min}`} tone="text-red-400"
                sub={`${totals.min - inService} below division minimum`} />
              <Stat label="Calls holding" value={String(callQueue.length)} unit="unassigned" tone="text-red-400"
                sub={`${p1p2Holding} at Priority 1–2 · oldest ${oldestHold}`} />
              <Stat label="Priority-1 median" value={watch.p1Median} unit={`standard ${watch.p1Standard}`} tone="text-amber-400"
                sub={`${watch.p1Over} of ${watch.p1Calls} over standard this watch`} />
              <Stat label="Zones below minimum" value={String(belowMin)} unit={`of ${zones.length}`} tone="text-red-400"
                sub={`${belowMinHolding} with calls holding`} />
            </div>
            <Stat label="Self-initiated" value={String(watch.selfInitiated)} unit="activities"
              sub={`traffic, premise checks · ${watch.perUnit}/unit this watch`} />
          </div>

          {/* ── Main grid ──────────────────────────────────── */}
          <div className="mt-7 grid grid-cols-1 xl:grid-cols-2 gap-8">

            {/* ══ Left column ═══════════════════════════════ */}
            <div>
              {/* Zone coverage */}
              <SectionLabel right={<span className="text-[10px] text-slate-500">red = below minimum with calls holding</span>}>
                Zone coverage — precincts 1–4 · {watch.letter} watch
              </SectionLabel>
              <div className="flex items-end gap-3 pb-2 border-b border-slate-800/70 pl-3 text-[9px] font-bold uppercase tracking-[0.12em] text-slate-500">
                <span className="flex-1 min-w-0">Zone / precinct</span>
                <span className="w-10 text-right flex-shrink-0">Min</span>
                <span className="w-12 text-right flex-shrink-0">Assign</span>
                <span className="w-12 text-right flex-shrink-0">Avail</span>
                <span className="w-14 text-right flex-shrink-0">Holding</span>
                <span className="w-14 text-right flex-shrink-0">Avg P1</span>
                <span className="w-52 flex-shrink-0">Constraint</span>
              </div>
              <div className="divide-y divide-slate-800/50">
                {zones.map((z) => (
                  <div key={z.zone} className={`flex items-center gap-3 py-3 pl-3 border-l-2 ${z.holding > 0 ? 'border-red-500/70' : 'border-transparent'}`}>
                    <div className="flex-1 min-w-0">
                      <p className="text-[12px] font-semibold text-slate-100 truncate">{z.zone}</p>
                      <p className="text-[10px] text-slate-500 truncate">{z.precinct}</p>
                    </div>
                    <span className="w-10 text-right text-[11px] font-mono text-slate-300 flex-shrink-0">{z.min}</span>
                    <span className="w-12 text-right text-[11px] font-mono text-slate-100 flex-shrink-0">{z.assigned}</span>
                    <span className={`w-12 text-right text-[11px] font-mono flex-shrink-0 ${z.available === 0 ? 'text-red-400' : 'text-amber-400'}`}>{z.available}</span>
                    <span className={`w-14 text-right text-[11px] font-mono flex-shrink-0 ${z.holding > 1 ? 'text-red-400' : z.holding > 0 ? 'text-amber-400' : 'text-slate-600'}`}>{z.holding}</span>
                    <span className={`w-14 text-right text-[11px] font-mono flex-shrink-0 ${z.p1Over ? 'text-red-400' : 'text-slate-300'}`}>{z.avgP1}</span>
                    <span className="w-52 text-[10.5px] text-amber-400/90 flex-shrink-0 truncate">{z.constraint}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-start gap-3 py-3 pl-3 border-t border-slate-800/70">
                <span className="flex-1 min-w-0 text-[12px] font-bold text-slate-100">Division total</span>
                <span className="w-10 text-right text-[11px] font-mono font-bold text-slate-200 flex-shrink-0">{totals.min}</span>
                <span className="w-12 text-right text-[11px] font-mono font-bold text-slate-100 flex-shrink-0">{totals.assigned}</span>
                <span className="w-12 text-right text-[11px] font-mono font-bold text-red-400 flex-shrink-0">{totals.available}</span>
                <span className="w-14 text-right text-[11px] font-mono font-bold text-red-400 flex-shrink-0">{totals.holding}</span>
                <span className="w-14 text-right text-[11px] font-mono font-bold text-slate-200 flex-shrink-0">{watch.p1Median}</span>
                <p className="w-52 text-[10.5px] text-slate-500 leading-relaxed flex-shrink-0">
                  Available = assigned minus on-scene, en route, and out of service. {oosUnits} units out of service division-wide.
                </p>
              </div>

              {/* Call queue */}
              <div className="mt-7">
                <SectionLabel right={<span className="text-[10px] text-slate-500">ordered by priority, then hold time · standards P1 10m · P2 30m · P3 60m</span>}>
                  Call queue — holding for assignment
                </SectionLabel>
                <div className="flex items-end gap-3 pb-2 border-b border-slate-800/70 pl-3 text-[9px] font-bold uppercase tracking-[0.12em] text-slate-500">
                  <span className="w-[68px] flex-shrink-0">Call</span>
                  <span className="w-10 flex-shrink-0">Pri</span>
                  <span className="flex-1 min-w-0">Type / location</span>
                  <span className="w-40 flex-shrink-0">Zone</span>
                  <span className="w-16 text-right flex-shrink-0">Holding</span>
                  <span className="w-36 flex-shrink-0">Nearest available</span>
                  <span className="w-[86px] text-right flex-shrink-0">Action</span>
                </div>
                <div className="divide-y divide-slate-800/50">
                  {callQueue.map((c) => (
                    <div key={c.id} className={`flex items-center gap-3 py-3 pl-3 border-l-2 ${
                      c.pri === 'P1' || c.pri === 'P2' ? 'border-red-500/70' : 'border-amber-500/60'
                    }`}>
                      <span className="w-[68px] text-[10.5px] font-mono text-slate-500 flex-shrink-0">{c.id}</span>
                      <span className={`w-10 flex-shrink-0 text-center border rounded px-1 py-0.5 text-[9.5px] font-bold ${priBadge[c.pri]}`}>{c.pri}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-[12px] text-slate-100 truncate">{c.type}</p>
                        <p className="text-[10px] text-slate-500 truncate">{c.location}</p>
                      </div>
                      <span className="w-40 text-[11px] text-slate-400 flex-shrink-0 truncate">{c.zone}</span>
                      <span className="w-16 text-right text-[11px] font-mono text-red-400 flex-shrink-0">{c.holding}</span>
                      <span className="w-36 text-[11px] flex-shrink-0 truncate">
                        <span className="text-slate-300">{c.nearest}</span>
                        <span className={c.outOfZone ? 'text-amber-400' : 'text-slate-500'}> · {c.outOfZone ? 'out of zone' : 'in zone'}</span>
                      </span>
                      <span className="w-[86px] text-right flex-shrink-0">
                        <button className="px-2.5 py-1 border border-amber-500/60 rounded text-[10.5px] font-semibold text-amber-400 hover:bg-amber-500/10 transition-colors whitespace-nowrap">
                          Dispatch
                        </button>
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Unit status board */}
              <div className="mt-7">
                <SectionLabel right={<span className="text-[10px] text-amber-400/90">{staleUnits} units with no CAD update over 90 minutes</span>}>
                  Unit status board
                </SectionLabel>
                <div className="flex items-end gap-3 pb-2 border-b border-slate-800/70 pl-3 text-[9px] font-bold uppercase tracking-[0.12em] text-slate-500">
                  <span className="w-12 flex-shrink-0">Unit</span>
                  <span className="w-32 flex-shrink-0">Officer</span>
                  <span className="w-36 flex-shrink-0">Zone</span>
                  <span className="w-36 flex-shrink-0">Status</span>
                  <span className="w-16 text-right flex-shrink-0">In status</span>
                  <span className="flex-1 min-w-0">Last CAD activity</span>
                </div>
                <div className="divide-y divide-slate-800/50">
                  {units.map((u) => {
                    const tone = statusTone[u.status];
                    return (
                      <div key={u.unit} className={`flex items-center gap-3 py-2.5 pl-3 border-l-2 ${u.stale ? 'border-red-500/70' : 'border-transparent'}`}>
                        <span className="w-12 text-[11px] font-mono font-bold text-slate-100 flex-shrink-0">{u.unit}</span>
                        <span className="w-32 text-[12px] text-slate-200 flex-shrink-0 truncate">{u.officer}</span>
                        <span className="w-36 text-[11px] text-slate-400 flex-shrink-0 truncate">{u.zone}</span>
                        <span className="w-36 flex items-center gap-2 flex-shrink-0">
                          <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${tone.dot}`} />
                          <span className={`text-[10.5px] font-bold tracking-wider ${tone.text}`}>{u.status}</span>
                        </span>
                        <span className={`w-16 text-right text-[11px] font-mono flex-shrink-0 ${u.stale ? 'text-red-400' : 'text-slate-400'}`}>{u.inStatus}</span>
                        <span className={`flex-1 min-w-0 text-[11px] truncate ${
                          u.activityTone === 'red' ? 'text-red-400' : u.activityTone === 'amber' ? 'text-amber-400' : 'text-slate-500'
                        }`}>
                          {u.activity}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* ══ Right column ══════════════════════════════ */}
            <div>
              {/* Priority-1 compliance */}
              <SectionLabel right={<span className="text-[10px] text-amber-400/90">{watch.p1Compliance}% this watch</span>}>
                Priority-1 compliance
              </SectionLabel>
              <p className="leading-none">
                <span className="text-[26px] font-bold text-amber-400">{watch.p1Median}</span>
                <span className="text-[12px] text-slate-400 ml-2.5">median dispatch to arrival</span>
              </p>
              <p className="text-[10.5px] text-slate-500 mt-2">
                Standard {watch.p1Standard} · {watch.p1Calls} Priority-1 calls this watch · {watch.p1Over} over standard
              </p>
              <div className="mt-3 divide-y divide-slate-800/50 border-t border-slate-800/70">
                {p1Misses.map((m) => (
                  <div key={m.time} className="flex items-start gap-3 py-2.5">
                    <span className="text-[11px] font-mono text-slate-500 flex-shrink-0 w-9">{m.time}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-[12px] text-slate-100">{m.call}</p>
                      <p className="text-[10.5px] text-slate-500">{m.note}</p>
                    </div>
                    <span className="text-[11px] font-mono font-bold text-red-400 flex-shrink-0">{m.elapsed}</span>
                  </div>
                ))}
              </div>

              {/* Out of service */}
              <div className="mt-7">
                <SectionLabel right={<span className="text-[10px] text-slate-500">{oosUnits} units · {inService} of {units.length} in service</span>}>
                  Out of service
                </SectionLabel>
                <div className="divide-y divide-slate-800/50">
                  {outOfService.map((o) => (
                    <div key={o.reason} className="flex items-center gap-3 py-2.5">
                      <div className="flex-1 min-w-0">
                        <p className="text-[12px] text-slate-100 truncate">{o.reason}</p>
                        <p className="text-[10px] font-mono text-slate-500 truncate">{o.units}</p>
                      </div>
                      <span className="text-[13px] font-mono font-bold text-slate-100 flex-shrink-0">{o.count}</span>
                      <span className={`w-14 text-right text-[10.5px] font-mono flex-shrink-0 ${o.tone === 'red' ? 'text-red-400' : 'text-slate-500'}`}>{o.eta}</span>
                    </div>
                  ))}
                </div>
                <p className="text-[10px] text-slate-500 mt-2.5">Columns: units · ETA back in service. Report writing is the largest recoverable block.</p>
              </div>

              {/* Special assignments */}
              <div className="mt-7">
                <SectionLabel>Special assignments</SectionLabel>
                <div className="divide-y divide-slate-800/50">
                  {specialAssignments.map((s) => (
                    <div key={s.title} className="flex items-start gap-3 py-2.5">
                      <span className="text-[11px] font-mono text-slate-500 flex-shrink-0 w-9">{s.time}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-[12px] text-slate-100 truncate">{s.title}</p>
                        <p className="text-[10.5px] text-slate-500 truncate">{s.note}</p>
                      </div>
                      <span className="text-[11px] font-mono text-amber-400 flex-shrink-0">−{s.drawn}</span>
                    </div>
                  ))}
                </div>
                <p className="text-[10px] text-slate-500 mt-2.5">{drawnOff} units drawn off patrol this watch.</p>
              </div>

              {/* Active BOLOs */}
              <div className="mt-7">
                <SectionLabel right={<span className="text-[10px] text-slate-500">{bolos.length} active</span>}>
                  Active BOLOs
                </SectionLabel>
                <div className="divide-y divide-slate-800/50">
                  {bolos.map((b) => (
                    <div key={b.title} className="flex items-start gap-2.5 py-2.5">
                      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5 ${b.dot}`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-[12px] text-slate-100">{b.title}</p>
                        <p className="text-[10.5px] text-slate-500">{b.meta}</p>
                      </div>
                      <span className="text-[10.5px] font-mono text-slate-500 flex-shrink-0">{b.age}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Supervisor items */}
              <div className="mt-7">
                <SectionLabel right={<span className="text-[10px] text-amber-400/90">{supervisorItems.length} pending</span>}>
                  Supervisor items
                </SectionLabel>
                <div className="divide-y divide-slate-800/50">
                  {supervisorItems.map((s) => (
                    <div key={s.title} className="flex items-start gap-3 py-2.5">
                      <div className="flex-1 min-w-0">
                        <p className="text-[12px] text-slate-100">{s.title}</p>
                        <p className="text-[10.5px] text-slate-500">{s.note}</p>
                      </div>
                      <button
                        onClick={() => navigate('/command/approvals')}
                        className="text-[11px] font-semibold text-amber-500/90 hover:text-amber-400 transition-colors flex-shrink-0 whitespace-nowrap"
                      >
                        {s.action} →
                      </button>
                    </div>
                  ))}
                </div>
                <p className="text-[10px] text-slate-500 mt-2.5">Sign-offs route to the Decision Center and are logged.</p>
              </div>

              {/* Pass-down log */}
              <div className="mt-7">
                <SectionLabel>Pass-down log</SectionLabel>
                <div className="divide-y divide-slate-800/50">
                  {passDown.map((p, i) => (
                    <div key={`${p.time}-${i}`} className="flex items-start gap-3 py-2.5">
                      <span className="text-[11px] font-mono text-slate-500 flex-shrink-0 w-9">{p.time}</span>
                      <p className="text-[11.5px] text-slate-300 leading-relaxed">{p.text}</p>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-2 mt-3">
                  <input
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') addNote(); }}
                    placeholder="Add pass-down note..."
                    className="flex-1 px-3 py-2 bg-zinc-900/60 border border-slate-700/60 rounded-lg text-[11.5px] text-slate-200 placeholder-slate-500 focus:outline-none focus:border-slate-500"
                  />
                  <button
                    onClick={addNote}
                    className="px-3.5 py-2 border border-slate-700/60 rounded-lg text-[11.5px] font-semibold text-slate-200 hover:bg-zinc-900/60 transition-colors flex-shrink-0"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default CADDispatch;

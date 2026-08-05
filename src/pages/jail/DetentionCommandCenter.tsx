import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Flag } from 'lucide-react';
import DashboardLayout from '../../layouts/DashboardLayout';

// ── Types ─────────────────────────────────────────────────────

interface BedClass { label: string; cur: number; cap: number }
interface IntakeRow { id: string; name: string; stage: string; mins: number }
interface CheckRow { unit: string; held: number; lastAgo: number; documented: number }
interface HoldRow { id: string; name: string; type: string; mins: number }
interface RiskRow { label: string; count: string; dot: string }
interface PostRow { post: string; state: 'FILLED' | 'OVERTIME' | 'UNMANNED' }
interface Movement { time: string; what: string; detail: string; state: 'READY' | 'PENDING' | 'AT RISK' }

// ── Facility state — JMS system of record ──────────────────────

const facility = {
  population: 416,
  beds: 470,
  lastCount: { time: '0500', cleared: 416, discrepancies: 0, next: '0900' },
  bookings: 9,
  releases: 6,
  net: 3,
};

// Free beds only count if they match the classification — a free male-medium
// bed does nothing for a female intake, which is why this is a per-class board
// rather than a single occupancy number.
const bedClasses: BedClass[] = [
  { label: 'Maximum',        cur: 74,  cap: 80  },
  { label: 'Medium',         cur: 168, cap: 190 },
  { label: 'Minimum',        cur: 96,  cap: 110 },
  { label: 'Female',         cur: 52,  cap: 56  },
  { label: 'Juvenile',       cur: 3,   cap: 8   },
  { label: 'Medical',        cur: 14,  cap: 14  },
  { label: 'Isolation / seg', cur: 9,  cap: 12  },
];

// Minutes in custody. The 4-hour medical screening standard is the clock that
// matters — past it the facility is out of compliance, not merely behind.
const INTAKE_STANDARD = 240;
const intakeQueue: IntakeRow[] = [
  { id: 'B-26-4431', name: 'Mercer, D.',   stage: 'Awaiting medical screening', mins: 329 },
  { id: 'B-26-4433', name: 'Aldridge, R.', stage: 'Screening in progress',      mins: 278 },
  { id: 'B-26-4436', name: 'Oyelaran, T.', stage: 'Classification interview',   mins: 170 },
  { id: 'B-26-4437', name: 'Sanchez, L.',  stage: 'Property / photo',           mins: 118 },
];

const CHECK_INTERVAL = 30;
const wellnessChecks: CheckRow[] = [
  { unit: 'A Block',     held: 96,  lastAgo: 23, documented: 100 },
  { unit: 'B Block',     held: 88,  lastAgo: 31, documented: 100 },
  { unit: 'C Block',     held: 104, lastAgo: 4,  documented: 93  },
  { unit: 'Female Unit', held: 52,  lastAgo: 20, documented: 100 },
  { unit: 'Medical',     held: 14,  lastAgo: 10, documented: 98  },
  { unit: 'Segregation', held: 9,   lastAgo: 19, documented: 100 },
];

// Negative minutes are past the deadline. A missed release is unlawful
// detention, so these outrank everything else on the page.
const holds: HoldRow[] = [
  { id: 'B-26-4009', name: 'Pratt, S.',     type: 'Segregation review',      mins: -503 },
  { id: 'B-26-4302', name: 'Whitcombe, J.', type: '48-hour hold',            mins: -45  },
  { id: 'B-26-4188', name: 'Renner, K.',    type: 'Court-ordered release',   mins: 85   },
  { id: 'B-26-4377', name: 'Bell, A.',      type: 'State facility transfer', mins: 217  },
  { id: 'B-26-4211', name: 'Doyle, M.',     type: 'Immigration detainer',    mins: 937  },
];

const populationRisk: RiskRow[] = [
  { label: 'Suicide watch',      count: '2 active',  dot: 'bg-amber-400' },
  { label: 'Medical watch',      count: '5 active',  dot: 'bg-slate-600' },
  { label: 'Detox / withdrawal', count: '3 active',  dot: 'bg-amber-400' },
  { label: 'Keep-separate pairs', count: '7 tracked', dot: 'bg-slate-600' },
  { label: 'Administrative seg', count: '9 held',    dot: 'bg-slate-600' },
];

const medicalQueue = [
  { label: 'Sick calls pending',        value: '11',  color: 'text-slate-300' },
  { label: 'Medication passes due 0700', value: '64', color: 'text-slate-300' },
  { label: 'Off-site appointments today', value: '2', color: 'text-slate-300' },
  { label: 'Nurse coverage',            value: '2 of 3 posts', color: 'text-amber-400' },
];

// Every post the facility cannot legally run without — custody and support
// alike. Food service is a mandatory post: meals are a court-ordered standard,
// not an amenity, and the kitchen carries its own staffing clock.
const mandatoryPosts: PostRow[] = [
  { post: 'Master control',       state: 'FILLED'   },
  { post: 'A/B Block floor',      state: 'FILLED'   },
  { post: 'C Block floor',        state: 'OVERTIME' },
  { post: 'Intake / booking',     state: 'OVERTIME' },
  { post: 'Medical escort',       state: 'UNMANNED' },
  { post: 'Kitchen / food service', state: 'FILLED' },
  { post: 'Cook — second shift',  state: 'OVERTIME' },
  { post: 'Perimeter / transport', state: 'FILLED'  },
];

const movements: Movement[] = [
  { time: '0800', what: 'County court — 3 inmates',            detail: '2 deputies · Sgt. Vega',          state: 'READY'   },
  { time: '0900', what: 'Court-ordered release — Renner, K.',  detail: 'Property retrieved',              state: 'READY'   },
  { time: '1100', what: 'State facility transfer — Bell, A.',  detail: '2 deputies · pending assignment', state: 'PENDING' },
  { time: '1330', what: 'Off-site medical — 2 inmates',        detail: '1 deputy · unmanned post',        state: 'AT RISK' },
];

// ── Helpers ────────────────────────────────────────────────────

const hm = (m: number) => {
  const a = Math.abs(m);
  const h = Math.floor(a / 60);
  return h ? `${h}h ${a % 60}m` : `${a}m`;
};

const bedTone = (free: number) =>
  free === 0
    ? { card: 'border-red-500/50',   bar: 'bg-red-500',   free: 'text-red-400' }
    : free <= 3
      ? { card: 'border-slate-800',  bar: 'bg-amber-400', free: 'text-slate-200' }
      : { card: 'border-slate-800',  bar: 'bg-slate-500', free: 'text-slate-200' };

const postTone: Record<PostRow['state'], string> = {
  FILLED:   'text-emerald-400',
  OVERTIME: 'text-amber-400',
  UNMANNED: 'text-red-400',
};
const postDot: Record<PostRow['state'], string> = {
  FILLED:   'bg-emerald-400',
  OVERTIME: 'bg-amber-400',
  UNMANNED: 'bg-red-500',
};
const moveTone: Record<Movement['state'], string> = {
  READY:     'text-emerald-400',
  PENDING:   'text-amber-400',
  'AT RISK': 'text-red-400',
};

function SectionLabel({ children, right }: { children: React.ReactNode; right?: React.ReactNode }) {
  return (
    <div className="flex items-baseline justify-between mb-3">
      <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500">{children}</p>
      {right}
    </div>
  );
}

export default function DetentionCommandCenter() {
  const navigate = useNavigate();

  // The clocks on this page are the point of it, so they run. One tick a
  // minute is enough — anything faster is motion without information.
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setTick((n) => n + 1), 60_000);
    return () => clearInterval(t);
  }, []);

  const intakeNow = intakeQueue.map((r) => ({ ...r, mins: r.mins + tick }));
  const checksNow = wellnessChecks.map((r) => ({ ...r, lastAgo: r.lastAgo + tick }));
  const holdsNow = holds.map((r) => ({ ...r, mins: r.mins - tick }));

  // The header's overdue count is the sum of every breached clock below it,
  // so the number and the list can never disagree.
  const overdueClocks =
    intakeNow.filter((r) => r.mins > INTAKE_STANDARD).length +
    checksNow.filter((r) => r.lastAgo >= CHECK_INTERVAL).length +
    holdsNow.filter((r) => r.mins < 0).length;

  const otPosts = mandatoryPosts.filter((p) => p.state === 'OVERTIME').length;
  const pct = Math.round((facility.population / facility.beds) * 100);

  return (
    <DashboardLayout>
      <div className="min-h-full bg-[#0A0A0B] px-6 py-8">
        <div className="max-w-[1500px] mx-auto">

          {/* ── Header ─────────────────────────────────────── */}
          <div className="flex flex-col lg:flex-row lg:items-center gap-3 lg:gap-4 pb-5 border-b border-slate-800/70">
            <div className="flex items-baseline gap-3 flex-wrap">
              <h1 className="text-[19px] font-bold text-slate-100">Detention Command</h1>
              <span className="text-[11px] text-slate-500">County Detention Facility · as of 06:12 · JMS system of record</span>
            </div>
            <div className="flex items-center gap-4 lg:ml-auto flex-wrap">
              <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-red-400/70">
                Protected — <span className="text-red-400">Medical / PREA</span> · Access logged
              </span>
              <button
                onClick={() => navigate('/command/warroom')}
                className="px-3.5 py-2 border border-red-500/40 rounded-lg text-[11.5px] font-semibold text-slate-200 hover:bg-red-500/10 transition-colors"
              >
                Escalate to War Room
              </button>
            </div>
          </div>

          {/* ── Status bar ─────────────────────────────────── */}
          <div className="mt-5 border border-slate-800/80 rounded-xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-800/60">
            <div className="px-5 py-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500 mb-2">Population</p>
              <p className="text-[26px] font-bold text-slate-100 leading-none">
                {facility.population}
                <span className="text-[12px] font-normal text-slate-500 ml-1.5">/ {facility.beds} beds · {pct}%</span>
              </p>
            </div>
            <div className="px-5 py-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500 mb-2">Last formal count</p>
              <p className="text-[13px] font-semibold text-emerald-400">
                {facility.lastCount.time} — {facility.lastCount.cleared} cleared, {facility.lastCount.discrepancies} discrepancies
              </p>
              <p className="text-[10.5px] text-slate-500 mt-1">
                Next count {facility.lastCount.next} ·{' '}
                <button className="text-amber-500/90 hover:text-amber-400 transition-colors">Log count</button>
              </p>
            </div>
            <div className="px-5 py-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500 mb-2">Today</p>
              <p className="text-[15px] font-mono text-slate-200">{facility.bookings} bookings · {facility.releases} releases</p>
              <p className="text-[10.5px] text-slate-500 mt-1">+{facility.net} net since 0000</p>
            </div>
            <div className="px-5 py-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500 mb-2">Overdue clocks</p>
              <p className="text-[15px]">
                <span className="text-[22px] font-bold text-red-400 leading-none">{overdueClocks}</span>
                <span className="text-[11.5px] text-slate-400 ml-2">clocks past due — see below</span>
              </p>
            </div>
          </div>

          {/* ── Beds by classification ─────────────────────── */}
          <div className="mt-6">
            <SectionLabel>Beds by classification — <span className="text-slate-600">free beds must match classification</span></SectionLabel>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3">
              {bedClasses.map((b) => {
                const free = b.cap - b.cur;
                const tone = bedTone(free);
                return (
                  <div key={b.label} className={`border rounded-xl px-3.5 py-3 ${tone.card}`}>
                    <div className="flex items-baseline justify-between gap-2">
                      <p className="text-[12px] font-semibold text-slate-100 truncate">{b.label}</p>
                      <p className={`text-[11px] font-mono flex-shrink-0 ${tone.free}`}>{free} free</p>
                    </div>
                    <div className="w-full h-1 bg-zinc-800/70 rounded-full overflow-hidden my-2">
                      <div className={`h-full rounded-full ${tone.bar}`} style={{ width: `${(b.cur / b.cap) * 100}%` }} />
                    </div>
                    <p className="text-[10px] font-mono text-slate-500">{b.cur} / {b.cap}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── Main grid ──────────────────────────────────── */}
          <div className="mt-7 grid grid-cols-1 xl:grid-cols-[1fr,440px] gap-8">

            {/* ── Left column ─────────────────────────────── */}
            <div>
              {/* Intake queue */}
              <SectionLabel right={<span className="text-[10px] text-slate-500">{intakeNow.length} in intake</span>}>
                Intake queue — 4h medical screening standard
              </SectionLabel>
              <div className="divide-y divide-slate-800/50">
                {intakeNow.map((r) => {
                  const over = r.mins - INTAKE_STANDARD;
                  return (
                    <div key={r.id} className={`flex items-center gap-3 py-3 pl-3 border-l-2 ${over > 0 ? 'border-red-500/70' : 'border-transparent'}`}>
                      <span className="text-[10.5px] font-mono text-slate-500 w-[76px] flex-shrink-0">{r.id}</span>
                      <span className="text-[12px] text-slate-100 w-32 flex-shrink-0 truncate">{r.name}</span>
                      <span className="text-[11.5px] text-slate-400 flex-1 min-w-0 truncate">{r.stage}</span>
                      <span className={`text-[11px] font-mono w-16 flex-shrink-0 text-right ${over > 0 ? 'text-red-400' : 'text-slate-300'}`}>{hm(r.mins)}</span>
                      <span className="text-[10.5px] font-bold text-red-400 w-36 flex-shrink-0 text-right">
                        {over > 0 ? `OVERDUE ${hm(over)} over` : ''}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Wellness checks */}
              <div className="mt-7">
                <SectionLabel right={<span className="text-[10px] text-slate-500">documentation compliance shown per unit</span>}>
                  Wellness checks — 30 min interval
                </SectionLabel>
                <div className="divide-y divide-slate-800/50">
                  {checksNow.map((c) => {
                    const due = CHECK_INTERVAL - c.lastAgo;
                    return (
                      <div key={c.unit} className={`flex items-center gap-3 py-3 pl-3 border-l-2 ${due <= 0 ? 'border-red-500/70' : 'border-transparent'}`}>
                        <span className="text-[12px] font-semibold text-slate-100 w-28 flex-shrink-0">{c.unit}</span>
                        <span className="text-[11px] font-mono text-slate-400 w-20 flex-shrink-0">{c.held} <span className="text-slate-600">held</span></span>
                        <span className="text-[11px] font-mono text-slate-500 w-28 flex-shrink-0">last {c.lastAgo}m ago</span>
                        <span className={`text-[11px] font-mono w-24 flex-shrink-0 ${due <= 0 ? 'text-red-400 font-bold' : 'text-slate-300'}`}>
                          {due <= 0 ? `${Math.abs(due)}m over` : `due in ${due}m`}
                        </span>
                        <span className={`text-[11px] flex-1 min-w-0 ${c.documented === 100 ? 'text-emerald-400' : 'text-amber-400'}`}>
                          {c.documented}% documented
                        </span>
                        <button className="px-2.5 py-1 border border-slate-700/60 rounded text-[10.5px] font-semibold text-slate-300 hover:bg-zinc-900/60 transition-colors flex-shrink-0">
                          Log check
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Holds & release deadlines */}
              <div className="mt-7">
                <SectionLabel right={<span className="text-[10px] text-red-400/80">missed release = unlawful detention</span>}>
                  Holds & release deadlines
                </SectionLabel>
                <div className="divide-y divide-slate-800/50">
                  {holdsNow.map((h) => (
                    <div key={h.id} className={`flex items-center gap-3 py-3 pl-3 border-l-2 ${h.mins < 0 ? 'border-red-500/70' : 'border-transparent'}`}>
                      <span className="text-[10.5px] font-mono text-slate-500 w-[76px] flex-shrink-0">{h.id}</span>
                      <span className="text-[12px] text-slate-100 w-32 flex-shrink-0 truncate">{h.name}</span>
                      <span className="text-[11.5px] text-slate-400 flex-1 min-w-0 truncate">{h.type}</span>
                      <span className={`text-[11px] font-mono w-24 flex-shrink-0 text-right ${h.mins < 0 ? 'text-red-400' : 'text-slate-300'}`}>
                        {hm(h.mins)}{h.mins < 0 ? ' over' : ''}
                      </span>
                      <span className="text-[10.5px] font-bold text-red-400 w-20 flex-shrink-0 text-right">
                        {h.mins < 0 ? 'ACT NOW' : ''}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Right column ────────────────────────────── */}
            <div>
              {/* Population risk */}
              <SectionLabel>Population risk</SectionLabel>
              <div className="border border-red-500/40 bg-red-500/[0.07] rounded-xl px-4 py-3">
                <p className="text-[12px] font-bold text-red-400 flex items-center gap-1.5">
                  <Flag className="w-3 h-3 flex-shrink-0" />
                  Keep-separate conflict
                </p>
                <p className="text-[11.5px] text-slate-300 mt-1 leading-relaxed">
                  Pratt, S. (B-26-4009) and Doyle, M. (B-26-4211) both housed in Segregation — flagged keep-separate.{' '}
                  <button className="text-amber-500/90 hover:text-amber-400 transition-colors">Reassign housing</button>
                </p>
              </div>
              <div className="mt-2 divide-y divide-slate-800/50">
                {populationRisk.map((r) => (
                  <div key={r.label} className="flex items-center gap-2.5 py-2.5">
                    <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${r.dot}`} />
                    <span className="text-[12px] text-slate-200 flex-1 min-w-0 truncate">{r.label}</span>
                    <span className="text-[11px] font-mono text-slate-400 flex-shrink-0">{r.count}</span>
                    <button className="text-[11px] font-semibold text-amber-500/90 hover:text-amber-400 transition-colors flex-shrink-0">View</button>
                  </div>
                ))}
              </div>

              {/* Medical queue */}
              <div className="mt-7">
                <SectionLabel>Medical queue</SectionLabel>
                <div className="divide-y divide-slate-800/50">
                  {medicalQueue.map((m) => (
                    <div key={m.label} className="flex items-center justify-between gap-3 py-2.5">
                      <span className="text-[12px] text-slate-200 min-w-0 truncate">{m.label}</span>
                      <span className={`text-[11px] font-mono flex-shrink-0 ${m.color}`}>{m.value}</span>
                    </div>
                  ))}
                </div>
                <p className="text-[10px] text-slate-500 mt-2.5">Detail restricted — need-to-know. Views logged.</p>
              </div>

              {/* Mandatory posts */}
              <div className="mt-7">
                <SectionLabel>Mandatory posts</SectionLabel>
                <div className="divide-y divide-slate-800/50">
                  {mandatoryPosts.map((p) => (
                    <div key={p.post} className="flex items-center gap-2.5 py-2.5">
                      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${postDot[p.state]}`} />
                      <span className="text-[12px] text-slate-200 flex-1 min-w-0 truncate">{p.post}</span>
                      <span className={`text-[10.5px] font-bold tracking-wider flex-shrink-0 ${postTone[p.state]}`}>{p.state}</span>
                    </div>
                  ))}
                </div>
                <p className="text-[10px] text-slate-500 mt-2.5">
                  {otPosts} posts on overtime ·{' '}
                  <button onClick={() => navigate('/command/personnel')} className="text-amber-500/90 hover:text-amber-400 transition-colors">Workforce Readiness</button>
                </p>
              </div>

              {/* Today's movements */}
              <div className="mt-7">
                <SectionLabel>Today's movements</SectionLabel>
                <div className="divide-y divide-slate-800/50">
                  {movements.map((m) => (
                    <div key={m.time + m.what} className="flex items-start gap-3 py-3">
                      <span className="text-[11px] font-mono text-slate-500 w-10 flex-shrink-0">{m.time}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-[12px] text-slate-100 truncate">{m.what}</p>
                        <p className="text-[10.5px] text-slate-500 truncate">{m.detail}</p>
                      </div>
                      <span className={`text-[10.5px] font-bold tracking-wider flex-shrink-0 ${moveTone[m.state]}`}>{m.state}</span>
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

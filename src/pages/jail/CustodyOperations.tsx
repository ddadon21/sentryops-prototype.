import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';

// ── Types ─────────────────────────────────────────────────────

interface Unit {
  name: string;
  classification: string;
  rated: number;
  held: number;
  /** Placeable beds — free AND classification-matched. `null` renders as "–". */
  placeable: number | null;
  officers: string;
  lead: string;
  lastCheck: string;
  openItems: string;
  tone?: 'red' | 'amber';
}

interface Post {
  post: string;
  requirement: string;
  staffed: number;
  required: number;
  lead: string;
  relief: string;
  due: string;
  overdue?: boolean;
}

interface Move {
  time: string;
  what: string;
  detail: string;
  state: 'IN TRANSIT' | 'STAGED';
  action: string;
  tone?: 'red' | 'amber';
}

interface Driver {
  driver: string;
  note: string;
  inmates: number;
  los: string;
  delta: number;
  owner: string;
  action: string;
  tone?: 'red' | 'amber';
}

interface Tier {
  id: string;
  title: string;
  body: string;
  trigger: string;
  authority: string;
  state: 'CLEARED' | 'ACTIVE' | 'NOT ACTIVE' | string;
  tone: 'slate' | 'amber' | 'red';
}

// ── Shift & facility state ─────────────────────────────────────

const shift = {
  letter: 'B',
  hours: '0600–1400',
  supervisor: 'Lt. Moore',
  elapsed: '02:14',
  inCustody: 2783,
  rated: 2616,
  housedHere: 2641,
  boardedOut: 142,
  perDay: 7,
  daysOver: 47,
  tempBunks: 105,
  tempBunkCap: 240,
  tierSince: 'Jun 20',
};

// A bed is only a bed if the classification matches. Segregation is excluded
// from overflow entirely — it cannot absorb general population at any census.
const units: Unit[] = [
  { name: 'Tower A — general population', classification: 'Medium male · 22 on temporary bunks', rated: 512, held: 534, placeable: 0,  officers: '6 of 6', lead: 'Ndiaye',       lastCheck: '11m', openItems: 'none',                 tone: 'red'   },
  { name: 'Tower B — general population', classification: 'Medium / minimum male · 31 on temp bunks', rated: 512, held: 528, placeable: 0, officers: '5 of 6', lead: 'Barrett', lastCheck: '27m', openItems: '1 grievance',          tone: 'red'   },
  { name: 'Tower C — high security',      classification: 'Maximum male · placement restricted',  rated: 384, held: 372, placeable: 12, officers: '5 of 5', lead: 'Vance',        lastCheck: '9m',  openItems: 'none'                                },
  { name: 'Tower D — intake',             classification: 'Unclassified first 72h · 52 on temp bunks', rated: 288, held: 311, placeable: 0, officers: '7 of 8', lead: 'Salas',   lastCheck: '14m', openItems: '3 screening overdue',   tone: 'red'   },
  { name: 'Female housing',               classification: 'Over rated — no female beds available', rated: 352, held: 379, placeable: 0,  officers: '5 of 5', lead: 'Delgado',      lastCheck: '8m',  openItems: '2 pending classification', tone: 'red' },
  { name: 'Mental health unit',           classification: '41 awaiting state hospital placement',  rated: 96,  held: 113, placeable: 0,  officers: '3 of 4', lead: 'Pike',         lastCheck: '6m',  openItems: '2 suicide watch',       tone: 'red'   },
  { name: 'Infirmary',                    classification: 'Full — off-site referral in use',       rated: 64,  held: 64,  placeable: 0,  officers: 'Medical staff', lead: '',      lastCheck: '33m', openItems: 'escort post unmanned',  tone: 'amber' },
  { name: 'Segregation',                  classification: 'Not usable for general population',     rated: 112, held: 97,  placeable: null, officers: '4 of 4', lead: 'Rowe',       lastCheck: '6m',  openItems: '1 review overdue'                    },
  { name: 'Work release / re-entry',      classification: 'Eligibility-limited — 53 beds idle',    rated: 296, held: 243, placeable: 53, officers: '2 of 2', lead: 'Kim',          lastCheck: '21m', openItems: 'none'                                },
];

const posts: Post[] = [
  { post: 'Master control',      requirement: 'Senior cert · 2 required',    staffed: 2, required: 2, lead: 'Ofc. Rowe',    relief: 'Break rotation complete',            due: '1h 52m' },
  { post: 'Tower A floor',       requirement: 'Jail cert · 6 required',      staffed: 6, required: 6, lead: 'Cpl. Ndiaye',  relief: '2 awaiting relief',                  due: '38m'    },
  { post: 'Tower B floor',       requirement: 'Jail cert · 6 required',      staffed: 5, required: 6, lead: 'Ofc. Barrett', relief: 'Relief overdue — 6th hour on post',  due: '12m over', overdue: true },
  { post: 'Tower C high security', requirement: 'Advanced cert · 5 required', staffed: 5, required: 5, lead: 'Cpl. Vance',  relief: 'Break rotation on schedule',         due: '1h 04m' },
  { post: 'Tower D intake',      requirement: 'Jail cert · 8 required',      staffed: 7, required: 8, lead: 'Ofc. Salas',   relief: 'Intake surge — relief deferred',     due: '22m'    },
  { post: 'Female housing',      requirement: 'Female officer · 5 required', staffed: 5, required: 5, lead: 'Cpl. Delgado', relief: 'Break rotation complete',            due: '1h 36m' },
  { post: 'Mental health unit',  requirement: 'CIT certified · 4 required',  staffed: 3, required: 4, lead: 'Ofc. Pike',    relief: '1 short — CIT qualified relief only', due: '41m'   },
  { post: 'Infirmary escort',    requirement: 'Escort qualified · 2 required', staffed: 0, required: 2, lead: 'UNMANNED',   relief: 'Post unmanned since 0600',           due: '–'      },
  { post: 'Transport / perimeter', requirement: 'Transport qual · 4 required', staffed: 4, required: 4, lead: 'Ofc. Kim',   relief: 'Break scheduled 1030',               due: '2h 23m' },
];

const floorPool = [
  { name: 'Ofc. Trent',    quals: 'Jail cert · escort qualified · transport' },
  { name: 'Ofc. Aguilar',  quals: 'Jail cert · female housing · CIT' },
  { name: 'Ofc. Boyd',     quals: 'Jail cert · advanced security' },
  { name: 'Ofc. Nakamura', quals: 'Jail cert · escort qualified' },
];

const movements: Move[] = [
  { time: '0800', what: 'Superior Court calendar — 34 inmates, 4 courtrooms', detail: '8 deputies · Cpl. Vance',              state: 'IN TRANSIT', action: 'Returned'   },
  { time: '0830', what: 'Magistrate first appearance — 22 inmates',            detail: 'Tower D staff · no transport',         state: 'IN TRANSIT', action: 'Returned'   },
  { time: '0900', what: 'Court-ordered releases — 11 inmates',                 detail: 'Intake processing · records verified', state: 'STAGED',     action: 'In transit' },
  { time: '1000', what: 'GDC transfer — 18 sentenced to state facilities',     detail: '6 deputies · 2 buses',                 state: 'STAGED',     action: 'In transit' },
  { time: '1100', what: 'Board-out transfer — 12 to Jackson County',           detail: 'Unassigned — 4 required',              state: 'STAGED',     action: 'In transit', tone: 'amber' },
  { time: '1330', what: 'Off-site medical — 6 inmates, 3 facilities',          detail: 'Requires infirmary escort post — unmanned', state: 'STAGED', action: 'In transit', tone: 'red' },
];

// Ranked by beds consumed — the census is an output of these, not a thing that
// can be managed directly.
const drivers: Driver[] = [
  { driver: 'GDC transfer backlog',       note: 'Sentenced state inmates awaiting Georgia DOC intake', inmates: 428, los: '71d',  delta: 63,  owner: 'GDC — external',         action: 'Escalate',      tone: 'red'   },
  { driver: 'Pretrial over 90 days',      note: 'Awaiting Superior Court disposition, no trial date',  inmates: 347, los: '148d', delta: 21,  owner: 'Superior Court calendar', action: 'Court liaison', tone: 'red'   },
  { driver: 'Competency / state hospital', note: 'Court-ordered evaluation, no DBHDD bed assigned',    inmates: 41,  los: '94d',  delta: 6,   owner: 'DBHDD — external',        action: 'Escalate',      tone: 'red'   },
  { driver: 'Probation / parole violations', note: 'Detainer-held pending revocation hearing',         inmates: 286, los: '38d',  delta: -12, owner: 'Probation · Parole Board', action: 'Calendar'                    },
  { driver: 'Bond set, unable to post',   note: 'Under $2,500 outstanding 14+ days',                   inmates: 193, los: '29d',  delta: 8,   owner: 'Pretrial Services',       action: 'Review',        tone: 'amber' },
  { driver: 'ICE / out-of-county detainers', note: 'Local charges resolved, outside detainer holding', inmates: 118, los: '22d',  delta: -4,  owner: 'Records · Legal',         action: 'Audit'                       },
  { driver: 'Awaiting transport to other jurisdictions', note: 'Holds for other Georgia jurisdictions', inmates: 64, los: '17d',  delta: 0,   owner: 'Transport unit',          action: 'Plan'                        },
];

const tasks = [
  { task: '0600 formal count — all units',        meta: '0614 · cleared',        done: true  },
  { task: 'Breakfast service — 9 units',          meta: '0705',                  done: true  },
  { task: 'Medication pass — AM cycle',           meta: '0740 · 812 of 812',     done: true  },
  { task: 'Temporary bunk classification audit',  meta: 'Tier 2 daily requirement', done: false },
  { task: 'Cell search — 3 random units',         meta: 'due 1200',              done: false },
  { task: 'Recreation — Towers A, B',             meta: 'due 1000',              done: false },
  { task: '0900 formal count',                    meta: 'due 0900',              done: false },
  { task: 'Commissary distribution',              meta: 'due 1300',              done: false },
];

// Each tier names the authority that can pull it. A ladder without named
// authority is a wish list.
const tiers: Tier[] = [
  { id: 'T1', title: 'Normal operations',              body: 'Standard classification placement, no temporary housing.',            trigger: 'Trigger below 95% rated',        authority: 'Jail commander',          state: 'CLEARED',         tone: 'slate' },
  { id: 'T2', title: 'Temporary housing authorized',   body: 'Dayroom bunks in Towers A, B, D up to 240. Daily classification audit required.', trigger: 'Trigger 100% rated, 7 days', authority: 'Sheriff — Jun 20', state: 'ACTIVE',    tone: 'amber' },
  { id: 'T3', title: 'Board-out expansion + court petition', body: 'Raise partner cap to 300, petition Superior Court for calendar relief.', trigger: 'Trigger 108% or temp cap reached', authority: 'Sheriff + County Manager', state: 'PROJECTED SEP 22', tone: 'red' },
  { id: 'T4', title: 'Population emergency declaration', body: 'County declaration, expedited pretrial review, non-violent intake diversion.', trigger: 'Trigger 112% sustained 14 days', authority: 'Sheriff + Commissioners', state: 'NOT ACTIVE', tone: 'slate' },
  { id: 'T5', title: 'Court-ordered population cap',   body: 'Externally imposed cap with mandated release schedule. Loss of local control.', trigger: 'Trigger consent decree',   authority: 'Court order',             state: 'NOT ACTIVE',      tone: 'slate' },
];

// Eligibility is advisory only — every row names who actually decides.
const releaseValves = [
  { label: 'Bond under $2,500 unpaid 14+ days', authority: 'Pretrial recommends · Judge decides',  count: 193 },
  { label: 'Time-served eligible at next review', authority: 'Records verifies · Judge signs',     count: 86  },
  { label: 'Work-release eligible, unplaced',   authority: 'Classification decides — 53 beds idle', count: 61  },
  { label: 'Pretrial diversion candidates',     authority: 'DA · Pretrial Services',               count: 128 },
  { label: 'GDC-ready, transport not scheduled', authority: 'GDC accepts · transport moves',       count: 209 },
  { label: 'Detainer expired or unverified',    authority: 'Legal review required',                count: 64  },
];

const partners = [
  { county: 'Barrow County', terms: 'Contract · medium male',        boarded: 48, available: 12, rate: 58 },
  { county: 'Hall County',   terms: 'Contract · medium / minimum',   boarded: 44, available: 0,  rate: 62 },
  { county: 'Jackson County', terms: 'Contract · minimum male',      boarded: 31, available: 19, rate: 55 },
  { county: 'Walton County', terms: 'Spot agreement · female',       boarded: 19, available: 7,  rate: 64 },
  { county: 'Newton County', terms: 'Pending contract execution',    boarded: 0,  available: 40, rate: 60 },
];

const floorItems = [
  { dot: 'bg-red-500',   title: 'No female beds available — 379 held against 352 rated', note: 'Female board-out limited to Walton (7 beds). Next intake requires temporary bunk.' },
  { dot: 'bg-red-500',   title: 'Infirmary full — 64 of 64, escort post unmanned',       note: 'Off-site referral averages $2,100/day. 1330 medical run at risk.' },
  { dot: 'bg-red-500',   title: 'Tower B cell 214 — door lock sticking',                 note: 'Work order 8841 · maintenance en route · safety' },
  { dot: 'bg-amber-400', title: 'Grievance filed — Tower B, food service',               note: 'GRV-2026-221 · 5-day response clock started' },
  { dot: 'bg-amber-400', title: '53 work-release beds idle but eligibility-restricted',  note: 'Cannot absorb general population — classification bars placement.' },
];

const passDown = [
  { time: '0605', text: 'Tower B cell 214 door lock sticking — work order 8841 filed, maintenance en route.' },
  { time: '0640', text: 'Intake backlog from night shift — 3 cases past the 4-hour screening standard.' },
  { time: '0705', text: 'No female beds available. Two overnight female intakes on temporary bunks pending classification.' },
  { time: '0730', text: 'Infirmary escort post unmanned — 1330 off-site medical run at risk.' },
];

// ── Helpers ────────────────────────────────────────────────────

const n = (v: number) => v.toLocaleString();

const utilTone = (pct: number) =>
  pct > 100 ? { bar: 'bg-red-500', text: 'text-red-400' }
    : pct >= 95 ? { bar: 'bg-amber-400', text: 'text-amber-400' }
      : { bar: 'bg-slate-500', text: 'text-slate-400' };

const staffTone = (staffed: number, required: number) =>
  staffed === 0 ? 'text-red-400' : staffed < required ? 'text-amber-400' : 'text-emerald-400';

const tierTone: Record<Tier['tone'], { card: string; state: string }> = {
  slate: { card: 'border-slate-800',      state: 'text-slate-500' },
  amber: { card: 'border-amber-500/50 bg-amber-500/[0.05]', state: 'text-amber-400' },
  red:   { card: 'border-red-500/40',     state: 'text-red-400' },
};

const rowAccent = (tone?: 'red' | 'amber') =>
  tone === 'red' ? 'border-red-500/70' : tone === 'amber' ? 'border-amber-500/60' : 'border-transparent';

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

export default function CustodyOperations() {
  const navigate = useNavigate();

  const totals = units.reduce(
    (a, u) => ({ rated: a.rated + u.rated, held: a.held + u.held, placeable: a.placeable + (u.placeable ?? 0) }),
    { rated: 0, held: 0, placeable: 0 },
  );
  const facilityPct = Math.round((totals.held / totals.rated) * 100);
  const custodyPct = Math.round((shift.inCustody / shift.rated) * 100);

  const postsAtStrength = posts.filter((p) => p.staffed >= p.required).length;
  const belowStrength = posts.filter((p) => p.staffed < p.required).length;
  const tasksDone = tasks.filter((t) => t.done).length;

  const reviewable = releaseValves.reduce((a, v) => a + v.count, 0);
  const boarded = partners.reduce((a, p) => a + p.boarded, 0);
  const boardCost = partners.reduce((a, p) => a + p.boarded * p.rate, 0);

  return (
    <DashboardLayout>
      <div className="min-h-full bg-[#0A0A0B] px-6 py-8">
        <div className="max-w-[1900px] mx-auto">

          {/* ── Header ─────────────────────────────────────── */}
          <div className="flex flex-col lg:flex-row lg:items-center gap-3 lg:gap-4">
            <div className="flex items-baseline gap-3 flex-wrap">
              <h1 className="text-[19px] font-bold text-slate-100">Custody Operations</h1>
              <span className="text-[11px] text-slate-500">Detention Center · {shift.letter} Shift floor board · JMS · Superior Court · GDC transfer queue</span>
            </div>
            <div className="flex items-center gap-2.5 lg:ml-auto flex-wrap">
              <button className="px-3.5 py-2 border border-slate-700/60 rounded-lg text-[11.5px] font-semibold text-slate-200 hover:bg-zinc-900/60 transition-colors">
                Escalate overflow tier
              </button>
              <button className="px-3.5 py-2 border border-amber-500/60 rounded-lg text-[11.5px] font-semibold text-amber-400 hover:bg-amber-500/10 transition-colors">
                End shift &amp; hand off
              </button>
            </div>
          </div>

          {/* ── Capacity banner ────────────────────────────── */}
          <div className="mt-4 border border-red-500/40 bg-red-500/[0.07] rounded-xl px-5 py-3.5 flex items-baseline gap-4 flex-wrap">
            <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-red-400 flex-shrink-0">Over rated capacity</span>
            <p className="text-[12px] text-slate-200 flex-1 min-w-[300px] leading-relaxed">
              {n(shift.inCustody)} in custody against {n(shift.rated)} rated beds ({custodyPct}%) — {shift.daysOver} consecutive days over capacity.
              {' '}{n(shift.housedHere)} housed here on {shift.tempBunks} temporary bunks over rated, {shift.boardedOut} boarded to partner counties.
            </p>
            <span className="text-[10.5px] font-mono text-slate-500 flex-shrink-0">Tier 2 protocols active since {shift.tierSince}</span>
          </div>

          {/* ── Status bar ─────────────────────────────────── */}
          <div className="mt-4 border border-slate-800/80 rounded-xl overflow-hidden">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-800/60 border-b border-slate-800/60">
              <Stat label="Shift" value={shift.letter} unit={shift.hours}
                sub={`${shift.supervisor} supervising · ${shift.elapsed} elapsed`} />
              <Stat label="In custody" value={n(shift.inCustody)} unit={`of ${n(shift.rated)} rated`} tone="text-red-400"
                sub={`${custodyPct}% · ${n(shift.housedHere)} housed + ${shift.boardedOut} boarded · +${shift.perDay}/day`} />
              <Stat label="Placeable beds" value={String(totals.placeable)} unit="classification-matched" tone="text-amber-400"
                sub="53 work-release restricted · 12 maximum only" />
              <Stat label="Posts staffed" value={`${postsAtStrength} of ${posts.length}`} unit="at strength" tone="text-red-400"
                sub={`infirmary escort unmanned · ${belowStrength} below strength`} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-slate-800/60">
              <Stat label="Temporary bunks" value={String(shift.tempBunks)} unit={`of ${shift.tempBunkCap} cap`} tone="text-amber-400"
                sub="Tier 2 · daily classification audit required" />
              <Stat label="Shift tasks" value={`${tasksDone} of ${tasks.length}`} unit="documented"
                sub="0900 count next · temp bunk audit due" />
              <Stat label="Open floor items" value={String(floorItems.length)} unit="this shift" tone="text-amber-400"
                sub="1 safety work order · 2 constraints" />
            </div>
          </div>

          {/* ── Main grid ──────────────────────────────────── */}
          <div className="mt-7 grid grid-cols-1 xl:grid-cols-2 gap-8">

            {/* ══ Left column ═══════════════════════════════ */}
            <div>
              {/* Housing units */}
              <SectionLabel right={<span className="text-[10px] text-slate-500">a free bed is only usable if classification matches</span>}>
                Housing units — capacity and floor state
              </SectionLabel>
              <div className="flex items-end gap-2 pb-2 border-b border-slate-800/70 pl-3 text-[9px] font-bold uppercase tracking-[0.12em] text-slate-500">
                <span className="flex-1 min-w-0">Unit / classification</span>
                <span className="w-12 text-right flex-shrink-0">Rated</span>
                <span className="w-12 text-right flex-shrink-0">Held</span>
                <span className="w-12 text-right flex-shrink-0">Place.</span>
                <span className="w-[86px] text-right flex-shrink-0">Util</span>
                <span className="w-28 flex-shrink-0">Floor officers</span>
                <span className="w-16 text-right flex-shrink-0">Last check</span>
                <span className="w-24 text-right flex-shrink-0">Open items</span>
              </div>
              <div className="divide-y divide-slate-800/50">
                {units.map((u) => {
                  const pct = Math.round((u.held / u.rated) * 100);
                  const tone = utilTone(pct);
                  return (
                    <div key={u.name} className={`flex items-center gap-2 py-3 pl-3 border-l-2 ${rowAccent(u.tone)}`}>
                      <div className="flex-1 min-w-0">
                        <p className="text-[12px] font-semibold text-slate-100 truncate">{u.name}</p>
                        <p className={`text-[10px] truncate ${u.tone === 'red' ? 'text-amber-400/80' : 'text-slate-500'}`}>{u.classification}</p>
                      </div>
                      <span className="w-12 text-right text-[11px] font-mono text-slate-300 flex-shrink-0">{n(u.rated)}</span>
                      <span className="w-12 text-right text-[11px] font-mono text-slate-100 flex-shrink-0">{n(u.held)}</span>
                      <span className={`w-12 text-right text-[11px] font-mono flex-shrink-0 ${
                        u.placeable === null ? 'text-slate-600' : u.placeable === 0 ? 'text-red-400' : 'text-emerald-400'
                      }`}>
                        {u.placeable === null ? '–' : u.placeable}
                      </span>
                      <span className="w-[86px] flex items-center justify-end gap-2 flex-shrink-0">
                        <span className="w-8 h-1 bg-zinc-800/70 rounded-full overflow-hidden">
                          <span className={`block h-full rounded-full ${tone.bar}`} style={{ width: `${Math.min(pct, 100)}%` }} />
                        </span>
                        <span className={`text-[11px] font-mono ${tone.text}`}>{pct}%</span>
                      </span>
                      <span className="w-28 text-[11px] text-slate-400 flex-shrink-0 truncate">
                        {u.officers}{u.lead && ` · ${u.lead}`}
                      </span>
                      <span className="w-16 text-right text-[11px] font-mono text-slate-400 flex-shrink-0">{u.lastCheck}</span>
                      <span className={`w-24 text-right text-[10.5px] flex-shrink-0 truncate ${u.openItems === 'none' ? 'text-slate-600' : 'text-amber-400'}`}>
                        {u.openItems}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Facility total */}
              <div className="flex items-start gap-2 py-3 pl-3 border-t border-slate-800/70">
                <span className="flex-1 min-w-0 text-[12px] font-bold text-slate-100">Facility total</span>
                <span className="w-12 text-right text-[11px] font-mono font-bold text-slate-200 flex-shrink-0">{n(totals.rated)}</span>
                <span className="w-12 text-right text-[11px] font-mono font-bold text-slate-100 flex-shrink-0">{n(totals.held)}</span>
                <span className="w-12 text-right text-[11px] font-mono font-bold text-amber-400 flex-shrink-0">{totals.placeable}</span>
                <span className="w-[86px] text-right text-[11px] font-mono font-bold text-red-400 flex-shrink-0">{facilityPct}%</span>
                <p className="w-[268px] text-[10.5px] text-slate-500 leading-relaxed flex-shrink-0">
                  {n(totals.held)} housed here + {shift.boardedOut} boarded out = {n(shift.inCustody)} in custody ({custodyPct}% of rated).
                  {' '}{totals.placeable} placeable beds: 53 work-release restricted, 12 maximum-security only. Segregation excluded — not usable for overflow.
                </p>
              </div>

              {/* Post assignments */}
              <div className="mt-7">
                <SectionLabel right={<span className="text-[10px] text-slate-500">unrelieved posts drive documentation lapses</span>}>
                  Post assignments &amp; relief
                </SectionLabel>
                <div className="flex items-end gap-3 pb-2 border-b border-slate-800/70 pl-3 text-[9px] font-bold uppercase tracking-[0.12em] text-slate-500">
                  <span className="flex-1 min-w-0">Post</span>
                  <span className="w-14 text-right flex-shrink-0">Staffed</span>
                  <span className="w-24 flex-shrink-0">Lead</span>
                  <span className="flex-1 min-w-0">Relief / break</span>
                  <span className="w-16 text-right flex-shrink-0">Due</span>
                  <span className="w-[92px] text-right flex-shrink-0">Action</span>
                </div>
                <div className="divide-y divide-slate-800/50">
                  {posts.map((p) => {
                    const short = p.staffed < p.required;
                    return (
                      <div key={p.post} className={`flex items-center gap-3 py-3 pl-3 border-l-2 ${rowAccent(p.staffed === 0 ? 'red' : short ? 'amber' : undefined)}`}>
                        <div className="flex-1 min-w-0">
                          <p className="text-[12px] font-semibold text-slate-100 truncate">{p.post}</p>
                          <p className="text-[10px] text-slate-500 truncate">{p.requirement}</p>
                        </div>
                        <span className={`w-14 text-right text-[11px] font-mono flex-shrink-0 ${staffTone(p.staffed, p.required)}`}>
                          {p.staffed} of {p.required}
                        </span>
                        <span className={`w-24 text-[11px] flex-shrink-0 truncate ${p.lead === 'UNMANNED' ? 'text-red-400 font-semibold' : 'text-slate-300'}`}>{p.lead}</span>
                        <span className="flex-1 min-w-0 text-[11px] text-slate-400 truncate">{p.relief}</span>
                        <span className={`w-16 text-right text-[11px] font-mono flex-shrink-0 ${p.overdue ? 'text-red-400' : 'text-amber-400'}`}>{p.due}</span>
                        <span className="w-[92px] text-right flex-shrink-0">
                          <button className={`px-2.5 py-1 rounded text-[10.5px] font-semibold whitespace-nowrap transition-colors ${
                            short
                              ? 'border border-amber-500/60 text-amber-400 hover:bg-amber-500/10'
                              : 'border border-slate-700/60 text-slate-300 hover:bg-zinc-900/60'
                          }`}>
                            {short ? 'Assign' : 'Log relief'}
                          </button>
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Movement board */}
              <div className="mt-7">
                <SectionLabel right={<span className="text-[10px] text-slate-500">return-overdue flags raise automatically</span>}>
                  Movement board — this shift
                </SectionLabel>
                <div className="divide-y divide-slate-800/50">
                  {movements.map((m) => (
                    <div key={m.time + m.what} className={`flex items-center gap-3 py-3 pl-3 border-l-2 ${rowAccent(m.tone)}`}>
                      <span className="w-10 text-[11px] font-mono text-slate-500 flex-shrink-0">{m.time}</span>
                      <span className="flex-1 min-w-0 text-[12px] text-slate-100 truncate">{m.what}</span>
                      <span className="w-44 text-[10.5px] text-slate-500 flex-shrink-0 truncate">{m.detail}</span>
                      <span className={`w-20 text-[10.5px] font-bold tracking-wider flex-shrink-0 ${m.state === 'IN TRANSIT' ? 'text-amber-400' : 'text-slate-500'}`}>
                        {m.state}
                      </span>
                      <button className="px-2.5 py-1 border border-slate-700/60 rounded text-[10.5px] font-semibold text-slate-300 hover:bg-zinc-900/60 transition-colors flex-shrink-0 w-[84px] whitespace-nowrap">
                        {m.action}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Population drivers */}
              <div className="mt-7">
                <SectionLabel right={<span className="text-[10px] text-slate-500">ranked by beds consumed</span>}>
                  What is holding population up
                </SectionLabel>
                <div className="flex items-end gap-3 pb-2 border-b border-slate-800/70 pl-3 text-[9px] font-bold uppercase tracking-[0.12em] text-slate-500">
                  <span className="flex-1 min-w-0">Driver</span>
                  <span className="w-14 text-right flex-shrink-0">Inmates</span>
                  <span className="w-14 text-right flex-shrink-0">Avg LOS</span>
                  <span className="w-12 text-right flex-shrink-0">30d</span>
                  <span className="w-44 flex-shrink-0">Owner / dependency</span>
                  <span className="w-24 text-right flex-shrink-0">Action</span>
                </div>
                <div className="divide-y divide-slate-800/50">
                  {drivers.map((d) => (
                    <div key={d.driver} className={`flex items-center gap-3 py-3 pl-3 border-l-2 ${rowAccent(d.tone)}`}>
                      <div className="flex-1 min-w-0">
                        <p className="text-[12px] font-semibold text-slate-100 truncate">{d.driver}</p>
                        <p className="text-[10px] text-slate-500 truncate">{d.note}</p>
                      </div>
                      <span className="w-14 text-right text-[12px] font-mono font-bold text-slate-100 flex-shrink-0">{d.inmates}</span>
                      <span className="w-14 text-right text-[11px] font-mono text-red-400 flex-shrink-0">{d.los}</span>
                      <span className={`w-12 text-right text-[11px] font-mono flex-shrink-0 ${
                        d.delta > 0 ? 'text-red-400' : d.delta < 0 ? 'text-emerald-400' : 'text-slate-600'
                      }`}>
                        {d.delta > 0 ? `▲ ${d.delta}` : d.delta < 0 ? `▼ ${Math.abs(d.delta)}` : '– 0'}
                      </span>
                      <span className="w-44 text-[11px] text-slate-400 flex-shrink-0 truncate">{d.owner}</span>
                      <span className="w-24 text-right flex-shrink-0">
                        <button className="text-[11px] font-semibold text-amber-500/90 hover:text-amber-400 transition-colors">{d.action} →</button>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ══ Right column ══════════════════════════════ */}
            <div>
              {/* Floor pool */}
              <SectionLabel right={<span className="text-[10px] text-slate-500">{floorPool.length} unassigned</span>}>
                Floor pool
              </SectionLabel>
              <div className="divide-y divide-slate-800/50">
                {floorPool.map((o) => (
                  <div key={o.name} className="py-2.5">
                    <p className="text-[12px] text-slate-100">{o.name}</p>
                    <p className="text-[10.5px] text-slate-500">{o.quals}</p>
                  </div>
                ))}
              </div>

              {/* Shift task checklist */}
              <div className="mt-7">
                <SectionLabel>Shift task checklist</SectionLabel>
                <div className="divide-y divide-slate-800/50">
                  {tasks.map((t) => (
                    <div key={t.task} className="flex items-center gap-2.5 py-2.5">
                      <span className={`w-4 h-4 rounded flex items-center justify-center flex-shrink-0 text-[10px] font-bold ${
                        t.done ? 'bg-emerald-500/20 border border-emerald-500/50 text-emerald-400' : 'border border-slate-700'
                      }`}>
                        {t.done ? '✓' : ''}
                      </span>
                      <span className={`text-[12px] flex-1 min-w-0 truncate ${t.done ? 'text-slate-300' : 'text-slate-200'}`}>{t.task}</span>
                      <span className="text-[10px] font-mono text-slate-500 flex-shrink-0">{t.meta}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Overflow escalation ladder */}
              <div className="mt-7">
                <SectionLabel>Overflow escalation ladder</SectionLabel>
                <div className="space-y-2">
                  {tiers.map((t) => {
                    const tone = tierTone[t.tone];
                    return (
                      <div key={t.id} className={`border rounded-xl px-4 py-3 ${tone.card}`}>
                        <div className="flex items-baseline gap-2">
                          <span className="text-[10px] font-mono font-bold text-slate-500 flex-shrink-0">{t.id}</span>
                          <p className="text-[12px] font-bold text-slate-100 flex-1 min-w-0">{t.title}</p>
                          <span className={`text-[10px] font-bold tracking-wider flex-shrink-0 ${tone.state}`}>{t.state}</span>
                        </div>
                        <p className="text-[11.5px] text-slate-300 mt-1 leading-relaxed">{t.body}</p>
                        <div className="flex items-baseline justify-between gap-3 mt-1.5">
                          <span className="text-[10px] text-slate-500">{t.trigger}</span>
                          <span className="text-[10px] text-slate-500 flex-shrink-0">{t.authority}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Release valves */}
              <div className="mt-7">
                <SectionLabel right={<span className="text-[10px] text-slate-500">{n(reviewable)} reviewable</span>}>
                  Release valves
                </SectionLabel>
                <div className="divide-y divide-slate-800/50">
                  {releaseValves.map((v) => (
                    <div key={v.label} className="flex items-center gap-3 py-2.5">
                      <div className="flex-1 min-w-0">
                        <p className="text-[12px] text-slate-100 truncate">{v.label}</p>
                        <p className="text-[10px] text-slate-500 truncate">{v.authority}</p>
                      </div>
                      <span className="text-[13px] font-mono font-bold text-slate-100 flex-shrink-0">{v.count}</span>
                      <button className="text-[11px] font-semibold text-amber-500/90 hover:text-amber-400 transition-colors flex-shrink-0 w-14 text-right">Review</button>
                    </div>
                  ))}
                </div>
                <p className="text-[10px] text-slate-500 mt-2.5">Eligibility is advisory. No release without the deciding authority named on the row.</p>
              </div>

              {/* Board-out partners */}
              <div className="mt-7">
                <SectionLabel right={<span className="text-[10px] text-slate-500">{boarded} boarded · ${n(boardCost)}/day</span>}>
                  Board-out partners
                </SectionLabel>
                <div className="divide-y divide-slate-800/50">
                  {partners.map((p) => (
                    <div key={p.county} className="flex items-center gap-3 py-2.5">
                      <div className="flex-1 min-w-0">
                        <p className="text-[12px] text-slate-100 truncate">{p.county}</p>
                        <p className="text-[10px] text-slate-500 truncate">{p.terms}</p>
                      </div>
                      <span className="w-10 text-right text-[11px] font-mono text-slate-200 flex-shrink-0">{p.boarded}</span>
                      <span className={`w-10 text-right text-[11px] font-mono flex-shrink-0 ${p.available === 0 ? 'text-red-400' : 'text-emerald-400'}`}>{p.available}</span>
                      <span className="w-10 text-right text-[11px] font-mono text-slate-400 flex-shrink-0">${p.rate}</span>
                    </div>
                  ))}
                </div>
                <p className="text-[10px] text-slate-500 mt-2.5">boarded · beds available · $/day · contract cap 180 · YTD $1.94M</p>
              </div>

              {/* Open floor items */}
              <div className="mt-7">
                <SectionLabel>Open floor items &amp; constraints</SectionLabel>
                <div className="divide-y divide-slate-800/50">
                  {floorItems.map((f) => (
                    <div key={f.title} className="flex items-start gap-2.5 py-2.5">
                      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5 ${f.dot}`} />
                      <div className="min-w-0">
                        <p className="text-[12px] text-slate-100">{f.title}</p>
                        <p className="text-[10.5px] text-slate-500 leading-relaxed">{f.note}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pass-down log */}
              <div className="mt-7">
                <SectionLabel>Pass-down log</SectionLabel>
                <div className="divide-y divide-slate-800/50">
                  {passDown.map((p) => (
                    <div key={p.time} className="flex items-start gap-3 py-2.5">
                      <span className="text-[11px] font-mono text-slate-500 flex-shrink-0 w-10">{p.time}</span>
                      <p className="text-[11.5px] text-slate-300 leading-relaxed">{p.text}</p>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => navigate('/jail/command')}
                  className="text-[11px] font-semibold text-amber-500/90 hover:text-amber-400 transition-colors mt-3"
                >
                  Detention Command →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

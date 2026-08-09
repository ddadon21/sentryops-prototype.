import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';

// ── Types ─────────────────────────────────────────────────────

type Risk = 'CRITICAL' | 'HIGH' | 'MODERATE';

interface Factor { label: string; text: string; tone: 'red' | 'amber' | 'slate' | 'blue' }

interface QueueCase {
  id: string;
  pri: 'P1' | 'P2';
  title: string;
  status: string;
  unit: string;
  lead: string;
  open: string;
  action: string;
  due: string;
  dueTone: 'red' | 'amber' | 'slate';
  /** Days until the decision is due — drives the awaiting-decision filter. */
  dueDays: number;
  risk: Risk;
  stalled?: boolean;
  summary?: {
    confidence: number;
    text: string;
    factors: Factor[];
    sources: string;
  };
}

interface UnitRow {
  unit: string;
  note: string;
  noteTone?: 'red';
  active: number;
  load: number;
  standard: number;
  clr: string;
  age: string;
  overdue: number;
  staffing: string;
  staffTone: 'emerald' | 'amber' | 'red';
}

interface Stage {
  stage: string;
  note: string;
  cases: number;
  median: string;
  aging: number;
  flow: 'WITHIN TARGET' | 'SLOWING' | 'BOTTLENECK';
}

interface Metric { label: string; value: string; delta: number; up: 'good' | 'bad'; sub: string; tone?: string }

// ── Division metrics ───────────────────────────────────────────

// `up` says which direction is good, so the arrow tone is a property of the
// metric rather than something restated at every call site.
const metrics: Metric[] = [
  { label: 'Active investigations',  value: '636', delta: 34, up: 'bad',     sub: 'vs 30 days prior' },
  { label: 'High-priority cases',    value: '87',  delta: 6,  up: 'bad',     sub: 'P1 and P2 designations',        tone: 'text-amber-400' },
  { label: 'Homicide investigations', value: '31', delta: 2,  up: 'bad',     sub: '4 opened this quarter' },
  { label: 'Officer-involved',       value: '2',   delta: 0,  up: 'bad',     sub: '1 GBI primary · 1 admin review' },
  { label: 'Cold cases under review', value: '214', delta: -3, up: 'bad',    sub: '23 homicide · 41 SVU' },
  { label: 'Clearance rate',         value: '38%', delta: 4,  up: 'good',    sub: 'quarter to date · UCR-comparable', tone: 'text-emerald-400' },
];

const secondaryMetrics: Metric[] = [
  { label: 'Average days open',  value: '96',  delta: 11, up: 'bad', sub: 'division median across units',  tone: 'text-amber-400' },
  { label: 'Awaiting prosecutor', value: '112', delta: 18, up: 'bad', sub: '148-day median in prosecution', tone: 'text-amber-400' },
];

// ── Executive attention queue ──────────────────────────────────

const queue: QueueCase[] = [
  {
    id: '26-04471', pri: 'P1',
    title: 'Homicide — Sever Road shooting',
    status: 'Suspect development · warrant drafted, not executed',
    unit: 'Homicide', lead: 'Det. Abara', open: '3d',
    action: 'Warrant execution decision', due: 'within 24h', dueTone: 'amber', dueDays: 1, risk: 'CRITICAL',
    summary: {
      confidence: 0.86,
      text: 'Third Sever Road corridor shooting in 19 days, second with ballistic linkage to the same firearm. Suspect developed through CCTV and phone records; warrant drafted. Execution needs a tactical element — the address has two prior armed encounters — and the SWAT request awaits command authorization. Delay past 24 hours risks relocation; the subject left the county twice this week.',
      factors: [
        { label: 'Officer safety',  text: 'Armed subject, two prior armed encounters at address',            tone: 'red'   },
        { label: 'Community impact', text: 'Third corridor shooting in 19 days; two community meetings requested', tone: 'amber' },
        { label: 'Media exposure',  text: 'Two outlets have filed open-records requests',                     tone: 'slate' },
        { label: 'Interagency',     text: 'GBI ballistics; Duluth PD holds a linked case',                    tone: 'blue'  },
      ],
      sources: 'RMS 26-04471 · NIBIN ballistic linkage · CAD 26-08791 · CCTV custodian log · open-records queue',
    },
  },
  {
    id: '26-04302', pri: 'P1',
    title: 'Sexual assault — adult victim, uncharged suspect',
    status: 'Stalled 34 days · SAK result 22 days past GBI turnaround',
    unit: 'Special Victims', lead: 'Det. Okafor', open: '142d',
    action: 'Escalate lab request to GBI agency head', due: 'due now', dueTone: 'red', dueDays: 0, risk: 'HIGH', stalled: true,
    summary: {
      confidence: 0.81,
      text: 'Case has not advanced since the sexual assault kit went to GBI 56 days ago against a 34-day published turnaround. The suspect is identified but uncharged, and the victim has been given three revised timelines. Agency-head escalation is drafted and awaiting signature — the only remaining step under agency control.',
      factors: [
        { label: 'Victim obligation', text: 'Third revised timeline given to the victim',        tone: 'red'   },
        { label: 'Legal exposure',    text: 'Uncharged identified suspect at 142 days',          tone: 'red'   },
        { label: 'External dependency', text: 'GBI lab queue — outside agency control',          tone: 'amber' },
        { label: 'Interagency',       text: 'Escalation requires agency-head signature',         tone: 'blue'  },
      ],
      sources: 'RMS 26-04302 · GBI lab queue · SVU case notes · victim contact log',
    },
  },
  {
    id: '26-04188', pri: 'P1',
    title: 'Officer-involved shooting — administrative review',
    status: 'GBI holds criminal investigation · agency review parallel',
    unit: 'Crimes Against Persons', lead: 'Det. Rowland', open: '11d',
    action: 'Administrative review board', due: '3 days', dueTone: 'amber', dueDays: 3, risk: 'CRITICAL',
    summary: {
      confidence: 0.9,
      text: 'GBI holds the criminal investigation at day 11 of a 30-day expectation while the agency administrative review runs in parallel. Five open-records requests are pending with one appeal, and the Commission has asked for a briefing. The review board convenes in three days and needs a command decision on scope before it sits.',
      factors: [
        { label: 'Political',    text: 'Commission briefing requested',                  tone: 'red'   },
        { label: 'Media',        text: 'Five open-records requests, one under appeal',   tone: 'red'   },
        { label: 'Legal exposure', text: 'Parallel criminal and administrative tracks',  tone: 'amber' },
        { label: 'Interagency',  text: 'GBI primary on the criminal investigation',      tone: 'blue'  },
      ],
      sources: 'GBI case file · Prof. Standards review · open-records queue · Commission correspondence',
    },
  },
  {
    id: '26-03998', pri: 'P2',
    title: 'Commercial burglary enterprise — Eastgate cluster',
    status: 'Seven linked cases · tool-mark comparison pending 41 days',
    unit: 'Property Crimes', lead: 'Det. Kestrel', open: '212d',
    action: 'Task-force decision — dedicated detail', due: '6 days', dueTone: 'slate', dueDays: 6, risk: 'MODERATE',
    summary: {
      confidence: 0.74,
      text: 'Seven linked commercial burglaries with $340,000 in cumulative loss, held on a tool-mark comparison that has been pending 41 days. A franchise operator has escalated to the Commission, and an evidence-destruction review lands in 34 days. Property Crimes is at 27 cases per detective against a 25 standard, so a dedicated detail means taking capacity from somewhere else.',
      factors: [
        { label: 'Financial',       text: '$340,000 cumulative loss across seven cases',   tone: 'amber' },
        { label: 'Community impact', text: 'Franchise operator escalated to the Commission', tone: 'amber' },
        { label: 'Evidence risk',   text: 'Destruction review in 34 days',                  tone: 'red'   },
        { label: 'Capacity',        text: 'Unit at 108% of the per-detective standard',     tone: 'slate' },
      ],
      sources: 'RMS 26-03998 + 6 linked · CSU tool-mark queue · Commission correspondence',
    },
  },
  {
    id: '26-04388', pri: 'P2',
    title: 'Elder financial exploitation — organized',
    status: 'Subpoena return in 3 days · three linked victims',
    unit: 'Financial Crimes', lead: 'Det. Salvatierra', open: '38d',
    action: 'Multi-agency referral decision', due: '3 days', dueTone: 'amber', dueDays: 3, risk: 'MODERATE',
    summary: {
      confidence: 0.71,
      text: 'Three linked elderly victims with an identical phone-based approach. Two adjacent counties report comparable loss profiles, which makes a joint USPIS referral viable if the subpoena return shows interstate accounts. That return lands in three days and decides whether this stays local or becomes a federal referral.',
      factors: [
        { label: 'Victim obligation', text: 'Three elderly victims, ongoing loss',          tone: 'amber' },
        { label: 'Financial',         text: 'Interstate accounts suspected',                tone: 'amber' },
        { label: 'Interagency',       text: 'USPIS referral viable on subpoena return',     tone: 'blue'  },
        { label: 'Timing',            text: 'Referral decision gated on a 3-day return',    tone: 'slate' },
      ],
      sources: 'RMS 26-04388 · subpoena docket · adjacent-agency bulletins',
    },
  },
  {
    id: '26-04104', pri: 'P1',
    title: 'Child exploitation — ICAC referral',
    status: 'Two devices in forensic queue · analysis ETA 12 days',
    unit: 'Digital Forensics', lead: 'Det. Ferreira', open: '88d',
    action: 'Forensic prioritization decision', due: '12 days', dueTone: 'amber', dueDays: 12, risk: 'HIGH',
    summary: {
      confidence: 0.83,
      text: 'Two devices sit at position 7 of 19 in a forensic queue served by a single examiner, producing a 71-day median against a 60-day expectation. The federal prosecution option depends on timely analysis. Prioritizing this case only reorders the harm — it does not add capacity, and the second examiner position is unfunded.',
      factors: [
        { label: 'Victim obligation', text: 'ICAC matter with a federal prosecution option', tone: 'red'   },
        { label: 'Capacity',          text: 'One examiner against 19 queued items',          tone: 'red'   },
        { label: 'Interagency',       text: 'Federal referral depends on analysis timing',   tone: 'blue'  },
        { label: 'Trade-off',         text: 'Prioritization reorders harm, does not add capacity', tone: 'amber' },
      ],
      sources: 'ICAC referral · Digital forensics queue · position control',
    },
  },
];

// ── Unit health ────────────────────────────────────────────────

const unitHealth: UnitRow[] = [
  { unit: 'Homicide',             note: '2 active death investigations this week',       active: 31,  load: 8,  standard: 8,  clr: '61%', age: '88d',  overdue: 3,  staffing: 'AT STRENGTH', staffTone: 'emerald' },
  { unit: 'Robbery',              note: 'Commercial series under review',                active: 44,  load: 11, standard: 12, clr: '42%', age: '64d',  overdue: 6,  staffing: 'AT STRENGTH', staffTone: 'emerald' },
  { unit: 'Crimes Against Persons', note: 'Carrying OIS administrative review',          active: 96,  load: 16, standard: 15, clr: '48%', age: '71d',  overdue: 11, staffing: '1 VACANCY',   staffTone: 'amber'   },
  { unit: 'Property Crimes',      note: 'Eastgate cluster consuming lead capacity',      active: 214, load: 27, standard: 25, clr: '23%', age: '124d', overdue: 38, staffing: '2 VACANCIES', staffTone: 'amber'   },
  { unit: 'Financial Crimes',     note: 'Elder exploitation volume rising',              active: 78,  load: 20, standard: 20, clr: '31%', age: '96d',  overdue: 9,  staffing: 'AT STRENGTH', staffTone: 'emerald' },
  { unit: 'Narcotics',            note: 'Two long-term operations active',               active: 52,  load: 9,  standard: 10, clr: '57%', age: '48d',  overdue: 4,  staffing: 'AT STRENGTH', staffTone: 'emerald' },
  { unit: 'Gangs',                note: 'Corridor violence linkage work',                active: 38,  load: 10, standard: 12, clr: '39%', age: '82d',  overdue: 7,  staffing: '1 VACANCY',   staffTone: 'amber'   },
  { unit: 'Digital Forensics',    note: 'Single examiner · second position unfunded', noteTone: 'red', active: 19, load: 19, standard: 14, clr: '—', age: '71d', overdue: 6, staffing: 'CRITICAL', staffTone: 'red' },
  { unit: 'Special Victims',      note: 'Vacancy open 61 days',                          active: 64,  load: 13, standard: 12, clr: '54%', age: '92d',  overdue: 8,  staffing: '1 VACANCY',   staffTone: 'amber'   },
];

const pipeline: Stage[] = [
  { stage: 'New assignment',        note: '2 unassigned past the 5-day threshold', cases: 34,  median: '2d',   aging: 2,  flow: 'WITHIN TARGET' },
  { stage: 'Evidence collection',   note: 'CSU turnaround within target',          cases: 88,  median: '9d',   aging: 4,  flow: 'WITHIN TARGET' },
  { stage: 'Active investigation',  note: 'Largest stage · 31 past target',        cases: 241, median: '41d',  aging: 31, flow: 'WITHIN TARGET' },
  { stage: 'Suspect development',   note: 'Lab dependency on 14 cases',            cases: 96,  median: '34d',  aging: 22, flow: 'BOTTLENECK'    },
  { stage: 'Warrant preparation',   note: '3 awaiting judicial availability',      cases: 41,  median: '6d',   aging: 3,  flow: 'WITHIN TARGET' },
  { stage: 'Charges filed',         note: 'DA intake queue slowing',               cases: 78,  median: '11d',  aging: 9,  flow: 'SLOWING'       },
  { stage: 'Prosecution',           note: 'Superior Court calendar constraint',    cases: 112, median: '148d', aging: 47, flow: 'BOTTLENECK'    },
  { stage: 'Closed — pending review', note: 'Supervisory closure review',          cases: 36,  median: '8d',   aging: 0,  flow: 'WITHIN TARGET' },
];

const resources = [
  { resource: 'Detectives',                committed: '42 of 46',    util: 109, constraint: '4 vacancies · 2 in background',        action: 'Reallocate' },
  { resource: 'Digital Forensics examiners', committed: '1 of 2',    util: 136, constraint: 'Second position unfunded · 19 items queued', action: 'Escalate' },
  { resource: 'Crime Scene Unit',          committed: '6 of 8',      util: 82,  constraint: 'Within capacity · 2 on training',      action: 'View' },
  { resource: 'Search warrants pending',   committed: '41',          util: 71,  constraint: '3 awaiting judicial availability',     action: 'View' },
  { resource: 'Major operations',          committed: '3 active',    util: 94,  constraint: 'Narcotics ×2, Gangs ×1 · 11 detectives', action: 'Review' },
  { resource: 'Task force / overtime',     committed: '$62,400 MTD', util: 88,  constraint: '88% of investigative OT budget',       action: 'Review' },
];

// ── Right column ───────────────────────────────────────────────

const highRisk = [
  {
    id: '26-04188', title: 'Officer-involved shooting', tier: 1,
    body: 'GBI criminal investigation with parallel agency administrative review at day 11 of 30. Five open-records requests, one appeal. Commission briefing requested.',
    tags: ['POLITICAL', 'MEDIA', 'OPEN RECORDS', 'MULTI-AGENCY'],
    owner: 'Lt. Ibarra · Prof. Standards', next: 'Review board in 3d',
  },
  {
    id: '26-04471', title: 'Sever Road corridor homicide', tier: 1,
    body: 'Warrant execution pending tactical support authorization. Third corridor shooting in 19 days with ballistic linkage. Two community meetings requested.',
    tags: ['OFFICER SAFETY', 'COMMUNITY IMPACT', 'MEDIA'],
    owner: 'Capt. — Investigations (vacant seat)', next: 'Execution decision in 1d',
  },
  {
    id: '26-03998', title: 'Eastgate burglary enterprise', tier: 2,
    body: 'Seven linked cases, $340,000 cumulative loss. Franchise operator escalated to the Commission. Evidence destruction review in 34 days.',
    tags: ['FINANCIAL', 'COMMUNITY IMPACT'],
    owner: 'Sgt. Liu · Property', next: 'Task-force decision in 6d',
  },
  {
    id: '26-04104', title: 'ICAC digital exploitation', tier: 2,
    body: 'Two devices held in a forensics queue running 71 days against a 60-day expectation. Single examiner; federal prosecution option depends on timely analysis.',
    tags: ['VICTIM OBLIGATION', 'MULTI-AGENCY'],
    owner: 'Sgt. Dawes · SVU', next: 'Prioritization in 12d',
  },
];

const brief = [
  {
    kind: 'Emerging trend', confidence: 0.89,
    headline: 'Sever Road corridor violence is a single linked series, not three incidents',
    body: 'NIBIN links two of three shootings to the same firearm; the third shares location and time-of-day pattern. Treating the corridor as one investigation consolidates three case files under Homicide and would justify a dedicated corridor detail.',
    sources: 'NIBIN · RMS 26-04471, 26-04390, 26-04361 · CAD geospatial cluster',
    recommended: 'Consolidate under Homicide with a corridor detail; brief Commission before the next community meeting.',
  },
  {
    kind: 'Resource shortage', confidence: 0.94,
    headline: 'Digital Forensics is the binding constraint on six investigations',
    body: 'One examiner against 19 queued items produces a 71-day median versus a 60-day expectation. Six active cases, including one ICAC matter with a federal prosecution option, cannot advance until analysis completes. Prioritization only reorders the harm.',
    sources: 'Digital forensics queue · position control · 6 linked case files',
    recommended: 'Fund the second examiner position in the FY27 request; seek GBI overflow agreement for interim relief.',
  },
  {
    kind: 'Investigation bottleneck', confidence: 0.83,
    headline: 'Prosecution stage holds 112 cases at a 148-day median',
    body: 'The stage exceeds its 120-day target with 47 cases aging. The constraint is the Superior Court calendar rather than agency work product, and it correlates with the 347 pretrial detainees held over 90 days in the detention population.',
    sources: 'DA case management · Superior Court calendar · JMS pretrial population',
    recommended: 'Joint calendar-relief petition with Detention; the capacity case and the case-aging case are the same argument.',
  },
  {
    kind: 'Repeat offender', confidence: 0.76,
    headline: 'Nine property cases trace to four subjects already in custody',
    body: 'Booking records intersect open property-case suspect fields and pawn transactions. In-custody interviews are cheaper than field investigation and may clear several cases at once.',
    sources: 'JMS bookings · RMS suspect fields · pawn database',
    recommended: 'Assign one property detective to in-custody interviews this week.',
  },
  {
    kind: 'Interagency opportunity', confidence: 0.71,
    headline: 'Elder exploitation method appears in two adjacent counties',
    body: 'Identical phone-based approach and comparable loss profile in two neighboring agencies. Joint USPIS referral becomes viable if the subpoena return shows interstate accounts.',
    sources: 'Adjacent-agency bulletins · RMS 26-04388 · subpoena docket',
    recommended: 'Hold three days for the subpoena return, then refer jointly.',
  },
];

const activity = [
  { time: '06:04',       kind: 'ESCALATION',  tone: 'red',     text: '26-04471 escalated to command — tactical support requested for warrant execution', meta: 'Sgt. Liu · routed to Decision Center' },
  { time: '05:47',       kind: 'EVIDENCE',    tone: 'violet',  text: 'NIBIN linkage confirmed between 26-04471 and 26-04390',                            meta: 'GBI · received by Det. Abara' },
  { time: '04:22',       kind: 'CLOSURE',     tone: 'slate',   text: '26-04211 closed exceptionally — pending captain approval',                         meta: 'Det. Nguyen · Property Crimes' },
  { time: '02:15',       kind: 'ARREST',      tone: 'emerald', text: 'Arrest made on 26-04455 residential burglary — suspect in custody',                meta: 'Det. Kestrel · booking B-26-4436' },
  { time: 'Aug 6 22:40', kind: 'WARRANT',     tone: 'blue',    text: 'Search warrant approved — 26-04388 financial records, two institutions',           meta: 'Judge Whitmore · Det. Salvatierra' },
  { time: 'Aug 6 19:08', kind: 'ASSIGNMENT',  tone: 'blue',    text: '26-04468 armed robbery assigned to Det. Rowland after 6 days unassigned',          meta: 'Sgt. Liu · assignment threshold exceeded' },
  { time: 'Aug 6 16:52', kind: 'PROSECUTION', tone: 'violet',  text: 'Case file submitted to DA — 26-04102 aggravated assault',                          meta: 'Det. Abara · DA intake 26-1188' },
  { time: 'Aug 6 14:31', kind: 'EVIDENCE',    tone: 'violet',  text: 'Two devices imaged for 26-04104 — analysis queued, position 7 of 19',              meta: 'Digital Forensics · Examiner Pike' },
  { time: 'Aug 6 11:19', kind: 'ESCALATION',  tone: 'red',     text: 'GBI lab escalation drafted for 26-04302 SAK, 22 days past turnaround',             meta: 'Sgt. Dawes · awaiting agency-head signature' },
  { time: 'Aug 6 09:05', kind: 'ASSIGNMENT',  tone: 'blue',    text: 'Corridor violence analytic packet distributed to Homicide and Gangs',              meta: 'Analyst K. Whitfield' },
  { time: 'Aug 6 08:12', kind: 'WARRANT',     tone: 'blue',    text: 'Warrant application returned for correction — 26-03998 tool-mark affidavit',       meta: 'Judge Alcott · Det. Kestrel' },
];

// ── Helpers ────────────────────────────────────────────────────

const riskTone: Record<Risk, string> = {
  CRITICAL: 'text-red-400',
  HIGH:     'text-amber-400',
  MODERATE: 'text-slate-400',
};

const flowTone: Record<Stage['flow'], { text: string; bar: string }> = {
  'WITHIN TARGET': { text: 'text-emerald-400', bar: 'bg-slate-600' },
  SLOWING:         { text: 'text-amber-400',   bar: 'bg-amber-400' },
  BOTTLENECK:      { text: 'text-red-400',     bar: 'bg-red-500'   },
};

const staffTone = { emerald: 'text-emerald-400', amber: 'text-amber-400', red: 'text-red-400' };

const factorTone = {
  red:   { border: 'border-red-500/70',   label: 'text-red-400'   },
  amber: { border: 'border-amber-500/70', label: 'text-amber-400' },
  slate: { border: 'border-slate-600',    label: 'text-slate-400' },
  blue:  { border: 'border-blue-500/70',  label: 'text-blue-400'  },
};

const kindTone: Record<string, string> = {
  red: 'text-red-400', violet: 'text-violet-400', blue: 'text-blue-400',
  emerald: 'text-emerald-400', slate: 'text-slate-400',
};

const utilTone = (u: number) =>
  u >= 120 ? { bar: 'bg-red-500', text: 'text-red-400' }
    : u > 100 ? { bar: 'bg-amber-400', text: 'text-amber-400' }
      : { bar: 'bg-slate-600', text: 'text-slate-400' };

function Delta({ value, up }: { value: number; up: 'good' | 'bad' }) {
  if (value === 0) return <span className="text-[11px] font-mono text-slate-600">— 0</span>;
  const rising = value > 0;
  const good = up === 'good' ? rising : !rising;
  return (
    <span className={`text-[11px] font-mono ${good ? 'text-emerald-400' : 'text-red-400'}`}>
      {rising ? '▲' : '▼'} {Math.abs(value)}
    </span>
  );
}

function SectionLabel({ children, right }: { children: React.ReactNode; right?: React.ReactNode }) {
  return (
    <div className="flex items-baseline justify-between gap-3 mb-3">
      <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500">{children}</p>
      {right}
    </div>
  );
}

function ActiveCasesDashboard() {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState<string | null>(queue[0].id);
  const [filter, setFilter] = useState<'all' | 'critical' | 'stalled' | 'decision'>('all');

  const counts = {
    all: queue.length,
    critical: queue.filter((c) => c.risk === 'CRITICAL').length,
    stalled: queue.filter((c) => c.stalled).length,
    decision: queue.filter((c) => c.dueDays <= 3).length,
  };
  const shown = queue.filter((c) =>
    filter === 'all' ? true
      : filter === 'critical' ? c.risk === 'CRITICAL'
        : filter === 'stalled' ? !!c.stalled
          : c.dueDays <= 3);

  const pipelineTotal = pipeline.reduce((a, s) => a + s.cases, 0);
  const maxStage = Math.max(...pipeline.map((s) => s.cases));
  const overCapacity = unitHealth.filter((u) => u.load > u.standard).length;
  const bottlenecks = pipeline.filter((s) => s.flow === 'BOTTLENECK');
  const divisionActive = unitHealth.reduce((a, u) => a + u.active, 0);
  const divisionOverdue = unitHealth.reduce((a, u) => a + u.overdue, 0);
  const avgLoad = (unitHealth.reduce((a, u) => a + u.load, 0) / unitHealth.reduce((a, u) => a + u.standard, 0)).toFixed(2);
  const decisionCases = queue.filter((c) => c.due === 'within 24h' || c.due === 'due now');

  const filters = [
    { id: 'all' as const,      label: 'All',              n: counts.all },
    { id: 'critical' as const, label: 'Critical risk',    n: counts.critical },
    { id: 'stalled' as const,  label: 'Stalled',          n: counts.stalled },
    { id: 'decision' as const, label: 'Awaiting decision', n: counts.decision },
  ];

  return (
    <DashboardLayout>
      <div className="min-h-full bg-[#0A0A0B] px-6 py-8">
        <div className="max-w-[1500px] mx-auto">

          {/* ── Header ─────────────────────────────────────── */}
          <div className="flex flex-col lg:flex-row lg:items-center gap-3 lg:gap-4">
            <div className="flex items-baseline gap-3 flex-wrap">
              <h1 className="text-[19px] font-bold text-slate-100">Criminal Investigations</h1>
              <span className="text-[11px] text-slate-500">Command Module · executive oversight · as of 06:12 · RMS · GBI lab · DA case management · CAD</span>
            </div>
            <div className="flex items-center gap-4 lg:ml-auto flex-wrap">
              <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-red-400/80">Law enforcement sensitive · Access logged</span>
              <button
                onClick={() => window.print()}
                className="px-3.5 py-2 border border-slate-700/60 rounded-lg text-[11.5px] font-semibold text-slate-200 hover:bg-zinc-900/60 transition-colors"
              >
                Command briefing — PDF
              </button>
            </div>
          </div>

          {/* ── Command attention ──────────────────────────── */}
          <div className="mt-4 border border-red-500/40 bg-red-500/[0.07] rounded-xl px-5 py-3.5 flex items-baseline gap-4 flex-wrap">
            <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-red-400 flex-shrink-0">Command attention</span>
            <p className="text-[12px] text-slate-200 flex-1 min-w-[300px] leading-relaxed">
              {decisionCases.length} investigations require a command decision within 24 hours — {decisionCases.map((c) => c.id).join(', ')}.
              {' '}{counts.critical} cases carry critical operational risk.
            </p>
            <span className="text-[10.5px] font-mono text-slate-500 flex-shrink-0">
              {overCapacity} of {unitHealth.length} units over capacity · {bottlenecks.length} pipeline bottlenecks
            </span>
          </div>

          {/* ── Metrics ────────────────────────────────────── */}
          <div className="mt-4 border border-slate-800/80 rounded-xl overflow-hidden">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 divide-x divide-y lg:divide-y-0 divide-slate-800/60 border-b border-slate-800/60">
              {metrics.map((m) => (
                <div key={m.label} className="px-4 py-3.5">
                  <p className="text-[10px] font-bold uppercase tracking-[0.13em] text-slate-500 mb-2">{m.label}</p>
                  <p className="flex items-baseline gap-2 leading-none">
                    <span className={`text-[22px] font-bold ${m.tone ?? 'text-slate-100'}`}>{m.value}</span>
                    <Delta value={m.delta} up={m.up} />
                  </p>
                  <p className="text-[10px] text-slate-500 mt-2">{m.sub}</p>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-slate-800/60">
              {secondaryMetrics.map((m) => (
                <div key={m.label} className="px-4 py-3.5">
                  <p className="text-[10px] font-bold uppercase tracking-[0.13em] text-slate-500 mb-2">{m.label}</p>
                  <p className="flex items-baseline gap-2 leading-none">
                    <span className={`text-[22px] font-bold ${m.tone}`}>{m.value}</span>
                    <Delta value={m.delta} up="bad" />
                  </p>
                  <p className="text-[10px] text-slate-500 mt-2">{m.sub}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Executive attention queue ──────────────────── */}
          <div className="mt-7">
            <SectionLabel
              right={
                <span className="flex items-center gap-4">
                  {filters.map((f) => (
                    <button
                      key={f.id}
                      onClick={() => setFilter(f.id)}
                      className={`text-[11px] transition-colors ${
                        filter === f.id ? 'text-slate-100 font-semibold underline underline-offset-4' : 'text-slate-500 hover:text-slate-300'
                      }`}
                    >
                      {f.label} <span className="font-mono text-slate-500">{f.n}</span>
                    </button>
                  ))}
                </span>
              }
            >
              Executive attention queue
            </SectionLabel>

            <div className="flex items-end gap-3 pb-2 border-b border-slate-800/70 pl-3 text-[9px] font-bold uppercase tracking-[0.12em] text-slate-500">
              <span className="w-[68px] flex-shrink-0">Case</span>
              <span className="flex-1 min-w-0">Investigation / status</span>
              <span className="w-40 flex-shrink-0">Unit</span>
              <span className="w-32 flex-shrink-0">Lead detective</span>
              <span className="w-10 text-right flex-shrink-0">Open</span>
              <span className="w-52 flex-shrink-0">Next critical action</span>
              <span className="w-20 text-right flex-shrink-0">Risk</span>
              <span className="w-4 flex-shrink-0" />
            </div>

            <div className="divide-y divide-slate-800/50">
              {shown.map((c) => {
                const open = expanded === c.id;
                return (
                  <div key={c.id} className={`border-l-2 ${c.risk === 'CRITICAL' ? 'border-red-500/70' : c.risk === 'HIGH' ? 'border-amber-500/60' : 'border-transparent'}`}>
                    <button
                      onClick={() => setExpanded(open ? null : c.id)}
                      className="w-full flex items-center gap-3 py-3 pl-3 text-left hover:bg-zinc-900/40 transition-colors"
                    >
                      <span className="w-[68px] text-[10.5px] font-mono text-slate-500 flex-shrink-0">{c.id}</span>
                      <div className="flex-1 min-w-0">
                        <span className="flex items-center gap-2">
                          <span className={`border rounded px-1 py-0.5 text-[9px] font-bold flex-shrink-0 ${
                            c.pri === 'P1' ? 'border-red-500/60 text-red-400' : 'border-amber-500/60 text-amber-400'
                          }`}>{c.pri}</span>
                          <span className="text-[12.5px] font-semibold text-slate-100 truncate">{c.title}</span>
                        </span>
                        <p className="text-[10px] text-slate-500 truncate mt-0.5">{c.status}</p>
                      </div>
                      <span className="w-40 text-[11px] text-slate-400 flex-shrink-0 truncate">{c.unit}</span>
                      <span className="w-32 text-[11px] text-slate-300 flex-shrink-0 truncate">{c.lead}</span>
                      <span className="w-10 text-right text-[11px] font-mono text-slate-400 flex-shrink-0">{c.open}</span>
                      <span className="w-52 flex-shrink-0 min-w-0">
                        <span className="block text-[11px] text-slate-200 truncate">{c.action}</span>
                        <span className={`block text-[10px] font-mono ${
                          c.dueTone === 'red' ? 'text-red-400' : c.dueTone === 'amber' ? 'text-amber-400' : 'text-slate-500'
                        }`}>{c.due}</span>
                      </span>
                      <span className={`w-20 text-right text-[10.5px] font-bold tracking-wider flex-shrink-0 ${riskTone[c.risk]}`}>{c.risk}</span>
                      <span className="w-4 text-slate-600 text-[9px] flex-shrink-0">{open ? '▾' : '▸'}</span>
                    </button>

                    {open && c.summary && (
                      <div className="mx-3 mb-3 border border-slate-800/80 rounded-xl px-4 py-3.5">
                        <p className="flex items-baseline gap-2">
                          <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500">AI executive summary</span>
                          <span className="text-[10px] text-slate-600">confidence</span>
                          <span className="text-[10.5px] font-mono text-emerald-400">{c.summary.confidence.toFixed(2)}</span>
                        </p>
                        <p className="text-[12px] text-slate-300 leading-relaxed mt-2.5">{c.summary.text}</p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-3 mt-4">
                          {c.summary.factors.map((f) => (
                            <div key={f.label} className={`border-l-2 pl-3 ${factorTone[f.tone].border}`}>
                              <p className={`text-[9px] font-bold uppercase tracking-[0.12em] ${factorTone[f.tone].label}`}>{f.label}</p>
                              <p className="text-[11px] text-slate-300 leading-snug mt-1">{f.text}</p>
                            </div>
                          ))}
                        </div>

                        <p className="text-[10px] text-slate-500 mt-4">Sources: {c.summary.sources}</p>

                        <div className="flex items-center gap-2.5 mt-3.5 flex-wrap">
                          <button className="px-3 py-1.5 border border-amber-500/60 bg-amber-500/10 rounded text-[11px] font-semibold text-amber-400 hover:bg-amber-500/20 transition-colors">Review case</button>
                          <button className="px-3 py-1.5 border border-slate-700/60 rounded text-[11px] font-semibold text-slate-200 hover:bg-zinc-900/60 transition-colors">View briefing</button>
                          <button className="px-3 py-1.5 border border-slate-700/60 rounded text-[11px] font-semibold text-slate-200 hover:bg-zinc-900/60 transition-colors">Allocate resources</button>
                          <button
                            onClick={() => navigate('/command/approvals')}
                            className="px-3 py-1.5 border border-red-500/50 rounded text-[11px] font-semibold text-red-400 hover:bg-red-500/10 transition-colors"
                          >
                            Escalate to command
                          </button>
                          <span className="ml-auto text-[10px] text-slate-600">Every action here is logged to the audit trail with actor and timestamp.</span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <p className="text-[10px] text-slate-500 mt-3">
              Rows expand to the executive summary with confidence and sources. Risk combines operational, legal, financial, and public-safety exposure — not case severity alone.
            </p>
          </div>

          {/* ── Main grid ──────────────────────────────────── */}
          <div className="mt-7 grid grid-cols-1 xl:grid-cols-2 gap-8">

            {/* ══ Left column ═══════════════════════════════ */}
            <div>
              {/* Unit health */}
              <SectionLabel right={<span className="text-[10px] text-slate-500">red = over operational capacity</span>}>
                Investigative unit health
              </SectionLabel>
              <div className="flex items-end gap-3 pb-2 border-b border-slate-800/70 pl-3 text-[9px] font-bold uppercase tracking-[0.12em] text-slate-500">
                <span className="flex-1 min-w-0">Unit</span>
                <span className="w-12 text-right flex-shrink-0">Active</span>
                <span className="w-[110px] flex-shrink-0">Workload</span>
                <span className="w-10 text-right flex-shrink-0">Clr</span>
                <span className="w-12 text-right flex-shrink-0">Age</span>
                <span className="w-12 text-right flex-shrink-0">Overdue</span>
                <span className="w-24 flex-shrink-0">Staffing</span>
              </div>
              <div className="divide-y divide-slate-800/50">
                {unitHealth.map((u) => {
                  const over = u.load > u.standard;
                  const critical = u.load > u.standard * 1.2;
                  return (
                    <div key={u.unit} className={`flex items-center gap-3 py-3 pl-3 border-l-2 ${critical ? 'border-red-500/70' : over ? 'border-amber-500/60' : 'border-transparent'}`}>
                      <div className="flex-1 min-w-0">
                        <p className="text-[12px] font-semibold text-slate-100 truncate">{u.unit}</p>
                        <p className={`text-[10px] truncate ${u.noteTone === 'red' ? 'text-red-400/90' : 'text-slate-500'}`}>{u.note}</p>
                      </div>
                      <span className="w-12 text-right text-[11px] font-mono text-slate-100 flex-shrink-0">{u.active}</span>
                      <span className="w-[110px] flex items-center gap-2 flex-shrink-0">
                        <span className="flex-1 h-1 bg-zinc-800/70 rounded-full overflow-hidden">
                          <span className={`block h-full rounded-full ${critical ? 'bg-red-500' : over ? 'bg-amber-400' : 'bg-slate-600'}`}
                            style={{ width: `${Math.min((u.load / u.standard) * 100, 100)}%` }} />
                        </span>
                        <span className={`text-[10.5px] font-mono flex-shrink-0 ${critical ? 'text-red-400' : over ? 'text-amber-400' : 'text-slate-400'}`}>
                          {u.load} / {u.standard}
                        </span>
                      </span>
                      <span className="w-10 text-right text-[11px] font-mono text-slate-300 flex-shrink-0">{u.clr}</span>
                      <span className="w-12 text-right text-[11px] font-mono text-slate-400 flex-shrink-0">{u.age}</span>
                      <span className="w-12 text-right text-[11px] font-mono text-slate-300 flex-shrink-0">{u.overdue}</span>
                      <span className={`w-24 text-[10px] font-bold tracking-wider flex-shrink-0 ${staffTone[u.staffTone]}`}>{u.staffing}</span>
                    </div>
                  );
                })}
              </div>
              <div className="flex items-start gap-3 py-3 pl-3 border-t border-slate-800/70">
                <span className="flex-1 min-w-0 text-[12px] font-bold text-slate-100">Division</span>
                <span className="w-12 text-right text-[11px] font-mono font-bold text-slate-100 flex-shrink-0">{divisionActive}</span>
                <span className="w-[110px] text-[10.5px] font-mono text-slate-300 flex-shrink-0">{avgLoad} avg</span>
                <span className="w-10 text-right text-[11px] font-mono font-bold text-slate-200 flex-shrink-0">38%</span>
                <span className="w-12 text-right text-[11px] font-mono text-slate-400 flex-shrink-0">96d</span>
                <span className="w-12 text-right text-[11px] font-mono font-bold text-red-400 flex-shrink-0">{divisionOverdue}</span>
                <span className="w-24 text-[10px] text-slate-500 leading-relaxed flex-shrink-0">
                  {overCapacity} of {unitHealth.length} units over capacity · workload shown per detective against unit standard
                </span>
              </div>

              {/* Pipeline */}
              <div className="mt-7">
                <SectionLabel right={<span className="text-[10px] text-slate-500">{pipelineTotal} investigations in pipeline</span>}>
                  Investigation pipeline
                </SectionLabel>
                <div className="flex items-end gap-3 pb-2 border-b border-slate-800/70 pl-3 text-[9px] font-bold uppercase tracking-[0.12em] text-slate-500">
                  <span className="flex-1 min-w-0">Stage</span>
                  <span className="w-12 text-right flex-shrink-0">Cases</span>
                  <span className="w-12 text-right flex-shrink-0">Median</span>
                  <span className="w-10 text-right flex-shrink-0">Aging</span>
                  <span className="w-44 flex-shrink-0">Volume</span>
                  <span className="w-28 text-right flex-shrink-0">Flow</span>
                </div>
                <div className="divide-y divide-slate-800/50">
                  {pipeline.map((s, i) => {
                    const tone = flowTone[s.flow];
                    return (
                      <div key={s.stage} className={`flex items-center gap-3 py-3 pl-3 border-l-2 ${
                        s.flow === 'BOTTLENECK' ? 'border-red-500/70' : s.flow === 'SLOWING' ? 'border-amber-500/60' : 'border-transparent'
                      }`}>
                        <div className="flex-1 min-w-0">
                          <p className="text-[12px] font-semibold text-slate-100 truncate">
                            <span className="font-mono text-[9px] text-slate-600 mr-1.5">{i + 1}</span>
                            {s.stage}
                          </p>
                          <p className="text-[10px] text-slate-500 truncate">{s.note}</p>
                        </div>
                        <span className="w-12 text-right text-[12px] font-mono font-bold text-slate-100 flex-shrink-0">{s.cases}</span>
                        <span className="w-12 text-right text-[11px] font-mono text-slate-300 flex-shrink-0">{s.median}</span>
                        <span className={`w-10 text-right text-[11px] font-mono flex-shrink-0 ${s.aging > 20 ? 'text-red-400' : s.aging > 5 ? 'text-amber-400' : 'text-slate-500'}`}>{s.aging}</span>
                        <span className="w-44 flex-shrink-0">
                          <span className="block h-1.5 bg-zinc-800/70 rounded-full overflow-hidden">
                            <span className={`block h-full rounded-full ${tone.bar}`} style={{ width: `${(s.cases / maxStage) * 100}%` }} />
                          </span>
                        </span>
                        <span className={`w-28 text-right text-[10px] font-bold tracking-wider flex-shrink-0 ${tone.text}`}>{s.flow}</span>
                      </div>
                    );
                  })}
                </div>
                <p className="text-[10px] text-slate-500 mt-3">
                  Aging = cases exceeding the stage target. Median = days in current stage. Bottlenecks: {bottlenecks.map((b) => b.stage.toLowerCase()).join(', ')}.
                </p>
              </div>

              {/* Resource allocation */}
              <div className="mt-7">
                <SectionLabel right={<span className="text-[10px] text-slate-500">utilization above 100% indicates committed beyond authorized strength</span>}>
                  Resource allocation
                </SectionLabel>
                <div className="flex items-end gap-3 pb-2 border-b border-slate-800/70 pl-3 text-[9px] font-bold uppercase tracking-[0.12em] text-slate-500">
                  <span className="w-40 flex-shrink-0">Resource</span>
                  <span className="w-24 text-right flex-shrink-0">Committed</span>
                  <span className="w-[120px] flex-shrink-0">Utilization</span>
                  <span className="flex-1 min-w-0">Constraint</span>
                  <span className="w-24 text-right flex-shrink-0">Action</span>
                </div>
                <div className="divide-y divide-slate-800/50">
                  {resources.map((r) => {
                    const tone = utilTone(r.util);
                    return (
                      <div key={r.resource} className={`flex items-center gap-3 py-3 pl-3 border-l-2 ${r.util > 100 ? (r.util >= 120 ? 'border-red-500/70' : 'border-amber-500/60') : 'border-transparent'}`}>
                        <span className="w-40 text-[12px] font-semibold text-slate-100 flex-shrink-0 truncate">{r.resource}</span>
                        <span className="w-24 text-right text-[11px] font-mono text-slate-200 flex-shrink-0">{r.committed}</span>
                        <span className="w-[120px] flex items-center gap-2 flex-shrink-0">
                          <span className="flex-1 h-1 bg-zinc-800/70 rounded-full overflow-hidden">
                            <span className={`block h-full rounded-full ${tone.bar}`} style={{ width: `${Math.min(r.util, 100)}%` }} />
                          </span>
                          <span className={`text-[10.5px] font-mono flex-shrink-0 ${tone.text}`}>{r.util}%</span>
                        </span>
                        <span className="flex-1 min-w-0 text-[11px] text-slate-400 truncate">{r.constraint}</span>
                        <span className="w-24 text-right flex-shrink-0">
                          <button className="text-[11px] font-semibold text-amber-500/90 hover:text-amber-400 transition-colors">{r.action} →</button>
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* ══ Right column ══════════════════════════════ */}
            <div>
              {/* High-risk investigations */}
              <SectionLabel right={<span className="text-[10px] text-slate-500">{highRisk.length} tracked</span>}>
                High-risk investigations
              </SectionLabel>
              <div className="space-y-2.5">
                {highRisk.map((h) => (
                  <div key={h.id} className={`border rounded-xl px-4 py-3.5 ${h.tier === 1 ? 'border-slate-700/70' : 'border-slate-800'}`}>
                    <div className="flex items-baseline gap-2">
                      <span className="text-[10px] font-mono text-slate-500 flex-shrink-0">{h.id}</span>
                      <p className="text-[12.5px] font-bold text-slate-100 flex-1 min-w-0">{h.title}</p>
                      <span className={`text-[10px] font-bold tracking-wider flex-shrink-0 ${h.tier === 1 ? 'text-red-400' : 'text-amber-400'}`}>TIER {h.tier}</span>
                    </div>
                    <p className="text-[11.5px] text-slate-300 leading-relaxed mt-1.5">{h.body}</p>
                    <div className="flex items-center gap-1.5 flex-wrap mt-2.5">
                      {h.tags.map((t) => (
                        <span key={t} className={`border rounded px-1.5 py-0.5 text-[9px] font-bold tracking-wider ${
                          h.tier === 1 ? 'border-red-500/50 text-red-400' : 'border-amber-500/50 text-amber-400'
                        }`}>{t}</span>
                      ))}
                    </div>
                    <div className="flex items-baseline justify-between gap-3 mt-2.5">
                      <span className="text-[10px] text-slate-500 truncate">{h.owner}</span>
                      <span className="text-[10px] text-slate-500 flex-shrink-0">{h.next}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Executive intelligence brief */}
              <div className="mt-7">
                <SectionLabel right={<span className="text-[10px] text-slate-500">generated 05:58</span>}>
                  Executive intelligence brief
                </SectionLabel>
                <div className="space-y-4">
                  {brief.map((b) => {
                    const hot = b.confidence >= 0.85;
                    return (
                      <div key={b.headline} className={`border-l-2 pl-3.5 ${hot ? 'border-red-500/70' : 'border-amber-500/60'}`}>
                        <p className="flex items-baseline gap-2">
                          <span className={`text-[9px] font-bold uppercase tracking-[0.13em] flex-1 ${hot ? 'text-red-400' : 'text-amber-400'}`}>{b.kind}</span>
                          <span className="text-[10.5px] font-mono text-emerald-400 flex-shrink-0">{b.confidence.toFixed(2)}</span>
                        </p>
                        <p className="text-[12.5px] font-bold text-slate-100 mt-1 leading-snug">{b.headline}</p>
                        <p className="text-[11.5px] text-slate-400 leading-relaxed mt-1">{b.body}</p>
                        <p className="text-[10px] text-slate-600 mt-1.5">Sources: {b.sources}</p>
                        <p className="text-[11px] text-amber-400/90 mt-1.5 leading-relaxed">Recommended: {b.recommended}</p>
                      </div>
                    );
                  })}
                </div>
                <p className="text-[10px] text-slate-500 mt-4">
                  Confidence reflects source completeness, not investigative certainty. No recommendation executes without command action.
                </p>
              </div>

              {/* Operational activity */}
              <div className="mt-7">
                <SectionLabel right={<span className="text-[10px] text-slate-500">last 24 hours · {activity.length} entries</span>}>
                  Operational activity
                </SectionLabel>
                <div className="divide-y divide-slate-800/50">
                  {activity.map((a, i) => (
                    <div key={i} className="flex items-start gap-3 py-2.5">
                      <span className="w-20 text-[10.5px] font-mono text-slate-500 flex-shrink-0">{a.time}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-[11.5px] text-slate-200 leading-snug">
                          <span className={`text-[9.5px] font-bold tracking-wider mr-1.5 ${kindTone[a.tone]}`}>{a.kind}</span>
                          {a.text}
                        </p>
                        <p className="text-[10px] text-slate-500 mt-0.5">{a.meta}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-[10px] text-slate-500 mt-3">All entries are audit-logged with actor, timestamp, and source system.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default ActiveCasesDashboard;

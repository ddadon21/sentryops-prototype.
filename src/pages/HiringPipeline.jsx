import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';
import { hrNavigation, hrProfile, hrNotifications } from '../config/hrConfig';

// ── Pipeline by stage ──────────────────────────────────────────
// Every candidate in process sits in exactly one stage, so the in-process
// count, the aging total and the track tabs are all sums of these rows.
//
// `median` is days in stage against that stage's own target — the pair is what
// makes a bottleneck legible. `passRate` is the share advancing from the stage.

const TRACKS = ['Deputy sheriff', 'Detention officer', 'Communications', 'Civilian'];

const stages = [
  {
    stage: 'Application received', note: 'Minimum-qualification screen · automated',
    median: 4, target: 10, aging: 0, passRate: 67, byTrack: [28, 27, 7, 2],
  },
  {
    stage: 'Written examination', note: 'Monthly test date · next Aug 22',
    median: 16, target: 21, aging: 2, passRate: 71, byTrack: [17, 16, 4, 1],
  },
  {
    stage: 'Physical assessment', note: 'POST standard battery · retest permitted once',
    median: 11, target: 14, aging: 1, passRate: 74, byTrack: [12, 11, 3, 1],
  },
  {
    stage: 'Oral board', note: 'Three-member panel · scheduled weekly',
    median: 13, target: 18, aging: 1, passRate: 82, byTrack: [8, 8, 2, 1],
  },
  {
    stage: 'Conditional offer', note: 'Offer letter · 10-day acceptance window',
    median: 6, target: 10, aging: 0, passRate: 89, byTrack: [6, 5, 2, 1],
  },
  {
    stage: 'Background investigation', short: 'Background', flag: 'BOTTLENECK',
    note: 'Four investigators · 47 active against a capacity of 40', noteTone: 'amber',
    median: 63, target: 45, aging: 22, passRate: 66, byTrack: [21, 20, 4, 2],
    detail: 'This is the binding constraint on the entire pipeline. Four investigators carry 47 active cases against a working capacity of 40, and the median has run 63 days against a 45-day target for two consecutive quarters. Twenty-two cases are past target. Every day added here is a day a candidate with a competing offer is unattended: three of the last nine withdrawals occurred during background, all after day 50. A fifth investigator, or contracting the civilian-track cases, is the only lever that moves the pipeline median.',
    withdrawalsHere: '3 of 9 in 90 days',
  },
  {
    stage: 'Polygraph · psych · medical', short: 'Poly · psych · med', flag: 'SLOWING',
    note: 'Contract vendor · scheduling constrained to one day a week', noteTone: 'amber',
    median: 24, target: 21, aging: 4, passRate: 77, byTrack: [6, 8, 1, 1],
    detail: 'A single contract vendor schedules one day a week. The stage runs three days past its target with four candidates aging, but the volume is small enough that a second vendor day clears it without a contract amendment.',
    withdrawalsHere: '1 of 9 in 90 days',
  },
  {
    stage: 'Academy seat assignment', short: 'Academy seat', flag: 'WAITING',
    note: 'Next cohort May 4 · 9 cleared and waiting', noteTone: 'red',
    median: 19, target: 14, aging: 3, passRate: null, byTrack: [5, 4, 0, 0],
    detail: 'Nine candidates have cleared every stage and are waiting on a start date. Five are deputies with seats in the current cohort; four are detention, where no academy is scheduled at all. The agency has already spent the full cost of hire on each of them.',
    withdrawalsHere: '4 of 9 in 90 days',
  },
];

const hire = {
  medianDays: 168,
  target: 150,
  twelveMonthsAgo: 138,
  backgroundNow: 63,
  backgroundThen: 41,
};

// ── Candidate roster ───────────────────────────────────────────
// The working applicant list, merged in from Applicant Tracking. `blocker` is
// what is holding the candidate; a row with one is what "requires action"
// means, so the count and the filter cannot drift apart.

const candidates = [
  { id: 'A-26-1184', req: 'Deputy Sheriff',    track: 'Deputy sheriff',    source: 'POST job board',  note: 'Competing offer from Cobb County · decision requested', stage: 'Background',         blocker: 'Investigator load',  inStage: 71, decision: 'OVERDUE' },
  { id: 'A-26-1209', req: 'Detention Officer', track: 'Detention officer', source: 'GovernmentJobs',  note: 'Prior-employer verification outstanding 24 days',       stage: 'Background',         blocker: 'Investigator load',  inStage: 66, decision: 'OVERDUE' },
  { id: 'A-26-1156', req: 'Deputy Sheriff',    track: 'Deputy sheriff',    source: 'Employee referral', note: 'Cleared all stages Jun 18 · waiting on a seat',       stage: 'Academy wait',       blocker: 'No cohort seat',     inStage: 54, decision: 'AT RISK' },
  { id: 'A-26-1163', req: 'Detention Officer', track: 'Detention officer', source: 'GovernmentJobs',  note: 'Detention academy has no scheduled start',              stage: 'Academy wait',       blocker: 'Cohort unscheduled', inStage: 47, decision: 'AT RISK' },
  { id: 'A-26-1247', req: 'Deputy Sheriff',    track: 'Deputy sheriff',    source: 'Career fair',     note: 'Scheduled Aug 19 · earliest available vendor slot',     stage: 'Poly · psych · med', blocker: 'Vendor slot',        inStage: 31, decision: '7 DAYS'  },
  { id: 'A-26-1288', req: 'Communications',    track: 'Communications',    source: 'Indeed',          note: 'Offer expires Aug 14 · no response to two contacts',    stage: 'Conditional offer',  blocker: 'Acceptance window',  inStage: 8,  decision: '3 DAYS'  },
  { id: 'A-26-1198', req: 'Deputy Sheriff',    track: 'Deputy sheriff',    source: 'GovernmentJobs',  note: 'Out-of-state records request pending since Jul 3',      stage: 'Background',         blocker: 'Records request',    inStage: 58, decision: '14 DAYS' },
  { id: 'A-26-1221', req: 'Detention Officer', track: 'Detention officer', source: 'Employee referral', note: 'Board scheduled Aug 20 · panel member on leave',      stage: 'Oral board',         blocker: 'Panel availability', inStage: 17, decision: '10 DAYS' },

  { id: 'A-26-1302', req: 'Deputy Sheriff',    track: 'Deputy sheriff',    source: 'Military transition', note: 'SkillBridge candidate · separates Oct 3',           stage: 'Background',         blocker: null, inStage: 22, decision: 'ON TRACK' },
  { id: 'A-26-1295', req: 'Detention Officer', track: 'Detention officer', source: 'GovernmentJobs',  note: 'Packet complete · queued for adjudication',             stage: 'Background',         blocker: null, inStage: 19, decision: 'ON TRACK' },
  { id: 'A-26-1311', req: 'Communications',    track: 'Communications',    source: 'Employee referral', note: 'Offer accepted · start date Aug 25',                  stage: 'Conditional offer',  blocker: null, inStage: 4,  decision: 'ON TRACK' },
  { id: 'A-26-1276', req: 'Deputy Sheriff',    track: 'Deputy sheriff',    source: 'POST job board',  note: 'Lateral transfer · academy waiver under review',        stage: 'Academy wait',       blocker: null, inStage: 11, decision: 'ON TRACK' },
  { id: 'A-26-1318', req: 'Detention Officer', track: 'Detention officer', source: 'Career fair',     note: 'Oral board scheduled Aug 15',                           stage: 'Oral board',         blocker: null, inStage: 6,  decision: 'ON TRACK' },
  { id: 'A-26-1324', req: 'Fleet Technician',  track: 'Civilian',          source: 'Indeed',          note: 'ASE certification verified',                            stage: 'Conditional offer',  blocker: null, inStage: 3,  decision: 'ON TRACK' },
  { id: 'A-26-1330', req: 'Records Technician', track: 'Civilian',         source: 'GovernmentJobs',  note: 'Background packet returned Aug 6',                      stage: 'Background',         blocker: null, inStage: 9,  decision: 'ON TRACK' },
  { id: 'A-26-1341', req: 'Deputy Sheriff',    track: 'Deputy sheriff',    source: 'GovernmentJobs',  note: 'Written exam Aug 22',                                   stage: 'Written examination', blocker: null, inStage: 12, decision: 'ON TRACK' },
  { id: 'A-26-1347', req: 'Detention Officer', track: 'Detention officer', source: 'Employee referral', note: 'Physical assessment passed Aug 4',                    stage: 'Physical assessment', blocker: null, inStage: 5,  decision: 'ON TRACK' },
  { id: 'A-26-1352', req: 'Communications',    track: 'Communications',    source: 'Career fair',     note: 'Minimum qualifications cleared',                        stage: 'Application received', blocker: null, inStage: 2, decision: 'ON TRACK' },
];

const ROSTER_FILTERS = ['Requires action', 'Background', 'Academy wait', 'Offer out', 'All shown'];

// ── Right column ───────────────────────────────────────────────

const CASES_PER_INVESTIGATOR = 10;
const investigators = [
  { name: 'Inv. Halloran',  note: 'Oldest case 71 days · 6 past target',        active: 14 },
  { name: 'Inv. Sedgwick',  note: 'Oldest case 66 days · 6 past target',        active: 13 },
  { name: 'Inv. Brannigan', note: 'Oldest case 52 days · 5 past target',        active: 11 },
  { name: 'Inv. Okoro',     note: 'Returned from leave Jul 28 · 5 past target', active: 9  },
];

// `agency` marks losses that trace to process delay or capacity rather than to
// a candidate failing a standard — the ones that are actually actionable.
const attrition = [
  { reason: 'Accepted competing offer',            note: 'Cobb 5 · Atlanta PD 4 · DeKalb 3 · other 2', count: 14, agency: true  },
  { reason: 'Withdrew during background',          note: 'All after day 50 in stage',                  count: 9,  agency: true  },
  { reason: 'Failed background',                   note: 'Disqualifying history · policy 2.4',         count: 8,  agency: false },
  { reason: 'Failed written or physical',          note: 'Retest available on both',                   count: 11, agency: false },
  { reason: 'Withdrew awaiting academy',           note: 'Cleared all stages, no seat available',      count: 4,  agency: true  },
  { reason: 'Polygraph or psych disqualification', note: 'Contract vendor determination',              count: 6,  agency: false },
  { reason: 'Non-responsive',                      note: 'No contact through two attempts',            count: 7,  agency: false },
];

const cohorts = [
  { cohort: 'Deputy Academy 26-C',    dates: 'May 4 – Sep 12',  seated: 19, capacity: 24, note: '5 seats open · 5 candidates cleared and eligible' },
  { cohort: 'Detention Academy 26-B', dates: 'Unscheduled',     seated: 0,  capacity: 20, note: 'Instructor unassigned · 4 candidates waiting', unscheduled: true },
  { cohort: 'Communications 26-A',    dates: 'Sep 8 – Nov 14',  seated: 6,  capacity: 8,  note: '2 seats open · pipeline supports 2' },
  { cohort: 'Deputy Academy 27-A',    dates: 'Jan 12 – May 22', seated: 0,  capacity: 24, note: 'Opens for assignment Oct 1' },
];

// Rolling median time to hire, oldest month first.
const timeToHire = [
  { month: 'Sep 2025', days: 138 }, { month: 'Oct', days: 141 }, { month: 'Nov', days: 144 },
  { month: 'Dec', days: 147 },      { month: 'Jan', days: 152 }, { month: 'Feb', days: 149 },
  { month: 'Mar', days: 155 },      { month: 'Apr', days: 158 }, { month: 'May', days: 161 },
  { month: 'Jun', days: 163 },      { month: 'Jul', days: 166 }, { month: 'Aug 2026', days: 168 },
];

const intelligence = [
  {
    title: 'Background is the whole problem', tone: 'red',
    body: null, // templated from the trend
    action: 'Fund a fifth background investigator in the FY27 request; contract civilian-track cases now.',
    sources: 'Applicant tracking · background case management · 12-month trend',
  },
  {
    title: 'Nine candidates cleared, no seat', tone: 'red',
    body: null, // templated from the academy stage split
    action: 'Assign a detention academy instructor and set a start date before the next withdrawal.',
    sources: 'Academy schedule · applicant tracking · Training Division',
  },
  {
    title: 'Testing cadence costs eleven days', tone: 'amber',
    body: 'Monthly written exams mean a candidate applying just after a test date waits five weeks. The exam is proctored by existing training staff, so a second monthly date adds no headcount.',
    action: 'Move to twice-monthly written testing beginning September.',
    sources: 'Training Division schedule · stage median analysis',
  },
];

// ── Helpers ────────────────────────────────────────────────────

const pct = (n, d) => (d ? (n / d) * 100 : 0);

const flowOf = (s) => {
  if (s.flag === 'BOTTLENECK') return 'BOTTLENECK';
  if (s.flag === 'WAITING') return 'WAITING';
  return s.median > s.target ? 'SLOWING' : 'WITHIN TARGET';
};
const flowTone = {
  'WITHIN TARGET': 'text-emerald-400',
  SLOWING:         'text-amber-400',
  BOTTLENECK:      'text-red-400',
  WAITING:         'text-amber-400',
};
const flagTone = {
  BOTTLENECK: 'border-red-500/60 text-red-400',
  SLOWING:    'border-amber-500/60 text-amber-400',
  WAITING:    'border-amber-500/60 text-amber-400',
};
const decisionTone = (d) =>
  d === 'OVERDUE' ? 'text-red-400' : d === 'AT RISK' ? 'text-amber-400'
    : d === 'ON TRACK' ? 'text-slate-500' : 'text-amber-400/80';

const dotTone = { emerald: 'bg-emerald-400', amber: 'bg-amber-400', red: 'bg-red-500', slate: 'bg-slate-600' };
const textTone = { emerald: 'text-emerald-400', amber: 'text-amber-400', red: 'text-red-400', slate: 'text-slate-400' };

function SectionLabel({ children, right }) {
  return (
    <div className="flex items-baseline justify-between gap-3 mb-3">
      <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500">{children}</p>
      {right}
    </div>
  );
}

function Meter({ value, tone = 'bg-slate-600' }) {
  return (
    <span className="block h-1 bg-zinc-800/70 rounded-full">
      <span className={`block h-full rounded-full ${tone}`} style={{ width: `${Math.min(value, 100)}%` }} />
    </span>
  );
}

export default function HiringPipeline() {
  const navigate = useNavigate();
  const [openStage, setOpenStage] = useState('Background investigation');
  const [track, setTrack] = useState('All tracks');
  const [roster, setRoster] = useState('Requires action');
  const [query, setQuery] = useState('');

  // ── Pipeline roll-up ────────────────────────────────────────
  const withTotals = stages.map((s) => ({
    ...s,
    inStage: s.byTrack.reduce((a, n) => a + n, 0),
    flow: flowOf(s),
  }));
  const inProcess = withTotals.reduce((a, s) => a + s.inStage, 0);
  const agingTotal = withTotals.reduce((a, s) => a + s.aging, 0);
  const tabs = [
    { track: 'All tracks', n: inProcess },
    ...TRACKS.map((t, i) => ({ track: t, n: stages.reduce((a, s) => a + s.byTrack[i], 0) })),
  ];
  const trackIndex = TRACKS.indexOf(track);

  const background = withTotals.find((s) => s.stage === 'Background investigation');
  const academy = withTotals.find((s) => s.stage === 'Academy seat assignment');

  // ── Background load ─────────────────────────────────────────
  const bgActive = investigators.reduce((a, i) => a + i.active, 0);
  const bgCapacity = investigators.length * CASES_PER_INVESTIGATOR;
  const bgOver = investigators.filter((i) => i.active > CASES_PER_INVESTIGATOR).length;

  // ── Attrition ───────────────────────────────────────────────
  const lost = attrition.reduce((a, r) => a + r.count, 0);
  const actionable = attrition.filter((r) => r.agency).reduce((a, r) => a + r.count, 0);

  // ── Cohorts and trend ───────────────────────────────────────
  const unscheduled = cohorts.filter((c) => c.unscheduled).length;
  const trendMax = Math.max(...timeToHire.map((m) => m.days));
  const trendMin = Math.min(...timeToHire.map((m) => m.days));
  const grew = hire.medianDays - hire.twelveMonthsAgo;
  const bgGrew = hire.backgroundNow - hire.backgroundThen;

  const pastDecision = candidates.filter((c) => c.decision === 'OVERDUE').length;
  const atRisk = candidates.filter((c) => c.decision === 'AT RISK').length;

  // Roster: "requires action" is exactly the rows carrying a blocker, so the
  // chip count and the filtered list are the same predicate.
  const matchesFilter = (c) =>
    roster === 'All shown' ? true
      : roster === 'Requires action' ? !!c.blocker
        : roster === 'Background' ? c.stage === 'Background'
          : roster === 'Academy wait' ? c.stage === 'Academy wait'
            : c.stage === 'Conditional offer';
  const rosterCount = (f) => candidates.filter((c) =>
    f === 'All shown' ? true
      : f === 'Requires action' ? !!c.blocker
        : f === 'Background' ? c.stage === 'Background'
          : f === 'Academy wait' ? c.stage === 'Academy wait'
            : c.stage === 'Conditional offer').length;
  const q = query.trim().toLowerCase();
  const rosterRows = candidates
    .filter(matchesFilter)
    .filter((c) => !q || `${c.id} ${c.req} ${c.stage} ${c.source} ${c.note}`.toLowerCase().includes(q));

  const cards = intelligence.map((c) => {
    if (c.body) return c;
    if (c.title.startsWith('Background')) {
      return { ...c, body: `Time to hire grew ${grew} days over twelve months. Background investigation grew ${bgGrew} of those days, and the rest is the academy gap. No other stage moved materially.` };
    }
    return {
      ...c,
      body: `${academy.inStage} candidates have passed every stage and are waiting on a cohort. `
        + `${academy.byTrack[1]} of them are detention, where no academy is scheduled at all. `
        + 'The agency has already spent the full cost of hire on each.',
    };
  });

  return (
    <DashboardLayout navigation={hrNavigation} profile={hrProfile} notifications={hrNotifications} settingsRoute="/hr/settings" profileRoute="/hr/profile" activityRoute="/hr/activity" activityModuleFilter="hr">
      <div className="min-h-full bg-[#0A0A0B] px-6 py-8">
        <div className="max-w-[1500px] mx-auto">

          {/* ── Header ─────────────────────────────────────── */}
          <div className="flex flex-col lg:flex-row lg:items-center gap-3 lg:gap-4">
            <div className="flex items-baseline gap-3 flex-wrap">
              <h1 className="text-[19px] font-bold text-slate-100">Hiring Pipeline</h1>
              <span className="text-[11px] text-slate-500">
                Candidates in process from application to academy seat · applicant tracking · POST records · background case management
              </span>
            </div>
            <div className="flex items-center gap-4 lg:ml-auto flex-wrap">
              <span className="text-[11px] text-amber-400/90">
                {pastDecision} candidates past decision date · background is the binding constraint
              </span>
              <button
                onClick={() => window.print()}
                className="px-3.5 py-2 border border-amber-500/60 rounded-lg text-[11.5px] font-semibold text-amber-400 hover:bg-amber-500/10 transition-colors"
              >
                Pipeline report
              </button>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 xl:grid-cols-2 gap-8">

            {/* ══ Left column ═══════════════════════════════ */}
            <div>
              {/* Headline */}
              <div className="border border-slate-800/80 rounded-xl grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-slate-800/60">
                <div className="px-5 py-4 border-b border-slate-800/60">
                  <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500 mb-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500" />In process
                  </p>
                  <p className="leading-none">
                    <span className="text-[24px] font-bold text-slate-100">{inProcess}</span>
                    <span className="text-[11.5px] text-slate-400 ml-2">all tracks</span>
                  </p>
                  <p className="text-[10.5px] text-amber-400/90 mt-2">{agingTotal} candidates past stage target</p>
                </div>
                <div className="px-5 py-4 border-b border-slate-800/60">
                  <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500 mb-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500" />Time to hire
                  </p>
                  <p className="leading-none">
                    <span className="text-[24px] font-bold text-slate-100">{hire.medianDays}</span>
                    <span className="text-[11.5px] text-slate-400 ml-2">days median</span>
                  </p>
                  <p className="text-[10.5px] text-red-400/90 mt-2">target {hire.target} · up {grew} days over 12 months</p>
                </div>
                <div className="px-5 py-4">
                  <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500 mb-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500" />Background queue
                  </p>
                  <p className="leading-none">
                    <span className="text-[24px] font-bold text-slate-100">{bgActive}</span>
                    <span className="text-[11.5px] text-slate-400 ml-2">of {bgCapacity} capacity</span>
                  </p>
                  <p className="text-[10.5px] text-amber-400/90 mt-2">
                    median {background.median} days against a {background.target}-day target
                  </p>
                </div>
                <div className="px-5 py-4">
                  <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500 mb-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500" />Lost — 90 days
                  </p>
                  <p className="leading-none">
                    <span className="text-[24px] font-bold text-slate-100">{lost}</span>
                    <span className="text-[11.5px] text-slate-400 ml-2">candidates</span>
                  </p>
                  <p className="text-[10.5px] text-amber-400/90 mt-2">{actionable} to causes the agency controls</p>
                </div>
              </div>

              {/* Pipeline by stage */}
              <div className="mt-7">
                <SectionLabel right={
                  <span className="flex items-center gap-4 flex-wrap">
                    {tabs.map((t) => (
                      <button
                        key={t.track}
                        onClick={() => setTrack(t.track)}
                        className={`text-[11px] transition-colors ${
                          track === t.track ? 'text-slate-100 font-semibold underline underline-offset-4' : 'text-slate-500 hover:text-slate-300'
                        }`}
                      >
                        {t.track} <span className="font-mono text-slate-500">{t.n}</span>
                      </button>
                    ))}
                  </span>
                }>
                  Pipeline by stage
                </SectionLabel>

                <div className="flex items-end gap-3 pb-2 border-b border-slate-800/70 pl-3 text-[9px] font-bold uppercase tracking-[0.12em] text-slate-500">
                  <span className="flex-1 min-w-0">Stage</span>
                  <span className="w-14 text-right flex-shrink-0">In stage</span>
                  <span className="w-14 text-right flex-shrink-0">Median</span>
                  <span className="w-12 text-right flex-shrink-0">Aging</span>
                  <span className="w-[92px] flex-shrink-0">Pass rate</span>
                  <span className="w-28 text-right flex-shrink-0">Flow</span>
                </div>

                <div className="divide-y divide-slate-800/50">
                  {withTotals.map((s, i) => {
                    const isOpen = openStage === s.stage;
                    const count = track === 'All tracks' ? s.inStage : s.byTrack[trackIndex];
                    const over = s.median > s.target;
                    return (
                      <div key={s.stage} className={`border-l-2 ${
                        s.flow === 'BOTTLENECK' ? 'border-red-500/70' : s.flow === 'WITHIN TARGET' ? 'border-transparent' : 'border-amber-500/60'
                      }`}>
                        <button
                          onClick={() => setOpenStage(isOpen ? null : s.stage)}
                          className="w-full flex items-center gap-3 py-3 pl-3 text-left hover:bg-zinc-900/40 transition-colors"
                        >
                          <div className="flex-1 min-w-0">
                            <span className="flex items-center gap-2">
                              <span className="font-mono text-[9px] text-slate-600">{i + 1}</span>
                              <span className="text-[12.5px] font-semibold text-slate-100 truncate">{s.short ?? s.stage}</span>
                              {s.flag && (
                                <span className={`border rounded px-1.5 py-0.5 text-[9px] font-bold tracking-wider flex-shrink-0 ${flagTone[s.flag]}`}>
                                  {s.flag}
                                </span>
                              )}
                            </span>
                            <p className={`text-[10px] truncate mt-0.5 ${
                              s.noteTone === 'red' ? 'text-red-400/90' : s.noteTone === 'amber' ? 'text-amber-400/80' : 'text-slate-500'
                            }`}>{s.note}</p>
                          </div>
                          <span className="w-14 text-right text-[12px] font-mono font-bold text-slate-100 flex-shrink-0">{count}</span>
                          <span className={`w-14 text-right text-[11px] font-mono flex-shrink-0 ${over ? 'text-red-400' : 'text-slate-300'}`}>{s.median}d</span>
                          <span className={`w-12 text-right text-[11px] font-mono flex-shrink-0 ${
                            s.aging === 0 ? 'text-slate-600' : s.aging > 10 ? 'text-red-400' : 'text-amber-400'
                          }`}>
                            {s.aging === 0 ? '—' : s.aging}
                          </span>
                          <span className="w-[92px] flex items-center gap-2 flex-shrink-0">
                            {s.passRate === null ? (
                              <span className="text-[10.5px] font-mono text-slate-600">—</span>
                            ) : (
                              <>
                                <span className="flex-1"><Meter value={s.passRate} tone={s.passRate < 70 ? 'bg-amber-400' : 'bg-slate-600'} /></span>
                                <span className="text-[10.5px] font-mono text-slate-400">{s.passRate}%</span>
                              </>
                            )}
                          </span>
                          <span className={`w-28 text-right text-[10px] font-bold tracking-wider flex-shrink-0 ${flowTone[s.flow]}`}>{s.flow}</span>
                        </button>

                        {isOpen && s.detail && (
                          <div className="px-3 pb-4">
                            <p className="text-[12px] text-slate-300 leading-relaxed">{s.detail}</p>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-3 mt-3.5">
                              <div className="border-l-2 border-slate-600 pl-3">
                                <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-slate-500">Active · capacity</p>
                                <p className="text-[11px] text-slate-200 mt-1">{s.inStage} of {s.stage === 'Background investigation' ? bgCapacity : s.inStage}</p>
                              </div>
                              <div className="border-l-2 border-slate-600 pl-3">
                                <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-slate-500">Median</p>
                                <p className="text-[11px] text-slate-200 mt-1">{s.median} days · target {s.target}</p>
                              </div>
                              <div className="border-l-2 border-amber-500/70 pl-3">
                                <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-amber-400">Past target</p>
                                <p className="text-[11px] text-slate-200 mt-1">{s.aging} cases</p>
                              </div>
                              <div className="border-l-2 border-red-500/70 pl-3">
                                <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-red-400">Withdrawals here</p>
                                <p className="text-[11px] text-slate-200 mt-1">{s.withdrawalsHere}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2.5 mt-4 flex-wrap">
                              <button
                                onClick={() => navigate('/hr/jobs')}
                                className="px-3 py-1.5 border border-amber-500/60 bg-amber-500/10 rounded text-[11px] font-semibold text-amber-400 hover:bg-amber-500/20 transition-colors"
                              >
                                Review candidates
                              </button>
                              <button className="px-3 py-1.5 border border-slate-700/60 rounded text-[11px] font-semibold text-slate-200 hover:bg-zinc-900/60 transition-colors">Add capacity</button>
                              <button className="px-3 py-1.5 border border-slate-700/60 rounded text-[11px] font-semibold text-slate-200 hover:bg-zinc-900/60 transition-colors">Schedule next event</button>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
                <p className="text-[10px] text-slate-500 mt-3 leading-relaxed">
                  Pass rate is the share advancing from each stage. Median is days in stage against the stage target. Rows expand
                  to the constraint and the lever available.
                </p>
              </div>

              {/* Candidate roster */}
              <div className="mt-7">
                <SectionLabel right={
                  <span className="text-[10px] text-red-400/90">{pastDecision} overdue · {atRisk} at risk</span>
                }>
                  Candidate roster
                </SectionLabel>

                <div className="flex items-center gap-3 flex-wrap mb-3">
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search identifier, requisition, stage, or source"
                    className="w-72 px-3 py-1.5 bg-zinc-900/60 border border-slate-700/60 rounded-lg text-[11.5px] text-slate-200 placeholder-slate-500 focus:outline-none focus:border-slate-500"
                  />
                  <span className="flex items-center gap-3 flex-wrap">
                    {ROSTER_FILTERS.map((f) => (
                      <button
                        key={f}
                        onClick={() => setRoster(f)}
                        className={`text-[11px] transition-colors ${
                          roster === f ? 'text-slate-100 font-semibold underline underline-offset-4' : 'text-slate-500 hover:text-slate-300'
                        }`}
                      >
                        {f} <span className="font-mono text-slate-500">{rosterCount(f)}</span>
                      </button>
                    ))}
                  </span>
                </div>

                <div className="flex items-end gap-3 pb-2 border-b border-slate-800/70 pl-3 text-[9px] font-bold uppercase tracking-[0.12em] text-slate-500">
                  <span className="flex-1 min-w-0">Candidate / requisition</span>
                  <span className="w-28 flex-shrink-0">Stage</span>
                  <span className="w-28 flex-shrink-0">Blocker</span>
                  <span className="w-28 flex-shrink-0">Source</span>
                  <span className="w-14 text-right flex-shrink-0">In stage</span>
                  <span className="w-[72px] text-right flex-shrink-0">Decision</span>
                </div>
                <div className="divide-y divide-slate-800/50">
                  {rosterRows.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => navigate(`/hr/jobs`)}
                      className={`w-full flex items-center gap-3 py-3 pl-3 text-left hover:bg-zinc-900/40 transition-colors border-l-2 ${
                        c.decision === 'OVERDUE' ? 'border-red-500/70' : c.decision === 'AT RISK' ? 'border-amber-500/60' : 'border-transparent'
                      }`}
                    >
                      <div className="flex-1 min-w-0">
                        <span className="flex items-baseline gap-2">
                          <span className="text-[11.5px] font-mono font-bold text-slate-100">{c.id}</span>
                          <span className="text-[10.5px] text-slate-500 truncate">{c.req}</span>
                        </span>
                        <p className="text-[10px] text-slate-500 truncate mt-0.5">{c.note}</p>
                      </div>
                      <span className="w-28 text-[11px] text-slate-300 flex-shrink-0 truncate">{c.stage}</span>
                      <span className={`w-28 text-[11px] flex-shrink-0 truncate ${c.blocker ? 'text-amber-400' : 'text-slate-600'}`}>
                        {c.blocker ?? '—'}
                      </span>
                      <span className="w-28 text-[10.5px] text-slate-500 flex-shrink-0 truncate">{c.source}</span>
                      <span className={`w-14 text-right text-[11px] font-mono flex-shrink-0 ${c.inStage > 45 ? 'text-red-400' : 'text-slate-400'}`}>{c.inStage}d</span>
                      <span className={`w-[72px] text-right text-[10.5px] font-bold tracking-wider whitespace-nowrap flex-shrink-0 ${decisionTone(c.decision)}`}>{c.decision}</span>
                    </button>
                  ))}
                  {rosterRows.length === 0 && (
                    <p className="py-6 text-[11.5px] text-slate-500 text-center">No candidates match that search in this filter.</p>
                  )}
                </div>
                <p className="text-[10px] text-slate-500 mt-3 leading-relaxed">
                  Rows open the applicant record — stage history, background packet, assigned staff, and contact log. Identifiers
                  are used at command level; opening a record is logged. The roster lists candidates with an open item or activity
                  in the last fourteen days; all {inProcess} in process are searchable.
                </p>
              </div>

              {/* Pipeline intelligence */}
              <div className="mt-7">
                <SectionLabel right={<span className="text-[10px] text-slate-500">AI-assisted synthesis · 5 sources · confidence 84% · 22m ago</span>}>
                  Pipeline intelligence
                </SectionLabel>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {cards.map((c) => (
                    <div key={c.title} className="border border-slate-800/80 rounded-xl px-4 py-3.5">
                      <p className="flex items-center gap-2">
                        <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${dotTone[c.tone]}`} />
                        <span className={`text-[12px] font-bold ${textTone[c.tone]}`}>{c.title}</span>
                      </p>
                      <p className="text-[11.5px] text-slate-300 leading-relaxed mt-2">{c.body}</p>
                      <p className="text-[11px] text-slate-100 leading-relaxed mt-2.5">→ {c.action}</p>
                      <p className="text-[10px] text-slate-600 mt-2.5">{c.sources}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ══ Right column ══════════════════════════════ */}
            <div>
              {/* Background investigation load */}
              <SectionLabel right={
                <span className="text-[10px] text-red-400/90">{bgActive} of {bgCapacity} · {bgOver} of {investigators.length} over</span>
              }>
                Background investigation load
              </SectionLabel>
              <div className="divide-y divide-slate-800/50">
                {investigators.map((inv) => {
                  const over = inv.active > CASES_PER_INVESTIGATOR;
                  const heavy = inv.active >= CASES_PER_INVESTIGATOR * 1.3;
                  return (
                    <div key={inv.name} className="flex items-center gap-3 py-3">
                      <div className="flex-1 min-w-0">
                        <p className="text-[12.5px] font-semibold text-slate-100 truncate">{inv.name}</p>
                        <p className={`text-[10.5px] truncate ${over ? 'text-amber-400/80' : 'text-slate-500'}`}>{inv.note}</p>
                      </div>
                      <span className="w-20 flex-shrink-0">
                        <Meter
                          value={pct(inv.active, CASES_PER_INVESTIGATOR * 1.5)}
                          tone={heavy ? 'bg-red-500' : over ? 'bg-amber-400' : 'bg-slate-600'}
                        />
                      </span>
                      <span className={`w-14 text-right text-[11.5px] font-mono flex-shrink-0 ${
                        heavy ? 'text-red-400' : over ? 'text-amber-400' : 'text-slate-400'
                      }`}>
                        {inv.active} / {CASES_PER_INVESTIGATOR}
                      </span>
                    </div>
                  );
                })}
              </div>
              <p className="text-[10px] text-slate-500 mt-2.5 leading-relaxed">
                Capacity is {CASES_PER_INVESTIGATOR} concurrent cases per investigator at the current standard. A fifth position
                would return the median to target within one quarter; contracting the civilian-track cases would recover roughly
                seven cases immediately.
              </p>

              {/* Attrition */}
              <div className="mt-7">
                <SectionLabel right={<span className="text-[10px] text-slate-500">{lost} candidates lost</span>}>
                  Attrition — 90 days
                </SectionLabel>
                <div className="divide-y divide-slate-800/50">
                  {attrition.map((r) => (
                    <div key={r.reason} className="flex items-start gap-2.5 py-3">
                      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5 ${r.agency ? 'bg-red-500' : 'bg-slate-600'}`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-[12.5px] font-semibold text-slate-100 truncate">{r.reason}</p>
                        <p className="text-[10.5px] text-slate-500 truncate">{r.note}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-[12.5px] font-mono font-bold text-slate-100">{r.count}</p>
                        <p className={`text-[10px] font-mono ${r.agency ? 'text-amber-400' : 'text-slate-500'}`}>{Math.round(pct(r.count, lost))}%</p>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-[10px] text-slate-500 mt-2.5 leading-relaxed">
                  {actionable} of {lost} losses trace to process delay or capacity rather than candidate disqualification. Those
                  are the ones the agency can act on.
                </p>
              </div>

              {/* Academy cohorts */}
              <div className="mt-7">
                <SectionLabel right={<span className="text-[10px] text-amber-400/90">{unscheduled} cohort unscheduled</span>}>
                  Academy cohorts
                </SectionLabel>
                <div className="divide-y divide-slate-800/50">
                  {cohorts.map((c) => (
                    <div key={c.cohort} className="py-3">
                      <div className="flex items-baseline gap-2.5">
                        <p className="text-[12.5px] font-semibold text-slate-100">{c.cohort}</p>
                        <span className={`text-[10.5px] ${c.unscheduled ? 'text-amber-400' : 'text-slate-500'}`}>{c.dates}</span>
                        <span className={`ml-auto text-[11.5px] font-mono flex-shrink-0 ${
                          c.unscheduled ? 'text-red-400' : c.seated === c.capacity ? 'text-emerald-400' : 'text-slate-200'
                        }`}>
                          {c.seated} / {c.capacity}
                        </span>
                      </div>
                      <span className="block mt-2">
                        <Meter value={pct(c.seated, c.capacity)} tone={c.unscheduled ? 'bg-red-500' : 'bg-amber-500'} />
                      </span>
                      <p className={`text-[10.5px] mt-1.5 ${c.unscheduled ? 'text-amber-400/90' : 'text-slate-500'}`}>{c.note}</p>
                    </div>
                  ))}
                </div>
                <p className="text-[10px] text-slate-500 mt-2.5 leading-relaxed">
                  A candidate who clears every stage but misses a cohort waits for the next start date. Two of the last four
                  withdrawals happened in that gap.
                </p>
              </div>

              {/* Time to hire trend */}
              <div className="mt-7">
                <SectionLabel right={<span className="text-[10px] text-slate-500">median {hire.medianDays} days</span>}>
                  Time to hire — 12 months
                </SectionLabel>
                <div className="flex items-end gap-1.5 h-24">
                  {timeToHire.map((m) => {
                    const over = m.days > hire.target;
                    // Scale from a floor below the minimum so month-to-month movement reads.
                    const h = ((m.days - (trendMin - 12)) / (trendMax - (trendMin - 12))) * 100;
                    return (
                      <span
                        key={m.month}
                        title={`${m.month} · ${m.days} days`}
                        className={`flex-1 rounded-t-sm ${over ? 'bg-red-500' : 'bg-slate-600'}`}
                        style={{ height: `${h}%` }}
                      />
                    );
                  })}
                </div>
                <div className="flex items-baseline justify-between mt-1.5">
                  <span className="text-[10px] text-slate-500">{timeToHire[0].month}</span>
                  <span className="text-[10px] text-slate-500">{timeToHire[timeToHire.length - 1].month}</span>
                </div>
                <div className="flex items-center gap-4 mt-2">
                  <span className="flex items-center gap-1.5 text-[10px] text-slate-500">
                    <span className="w-3 h-1 rounded-full bg-red-500" />above {hire.target}-day target
                  </span>
                  <span className="flex items-center gap-1.5 text-[10px] text-slate-500">
                    <span className="w-3 h-1 rounded-full bg-slate-600" />within target
                  </span>
                </div>
                <p className="text-[10px] text-slate-500 mt-2.5 leading-relaxed">
                  Median has moved from {hire.twelveMonthsAgo} to {hire.medianDays} days over twelve months. The increase is
                  almost entirely background investigation, which grew from {hire.backgroundThen} to {hire.backgroundNow} days
                  across the same period.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

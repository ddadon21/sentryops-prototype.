import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';
import { hrNavigation, hrProfile, hrNotifications } from '../config/hrConfig';

// ── Position control ───────────────────────────────────────────
// Position control is the spine of this page: every strength figure is summed
// from the division rows, never stated separately.
//
// Two distinctions this page keeps explicit, because conflating them is how
// workforce numbers stop agreeing with operations numbers:
//
//   positions vacant  — funded or held seats with nobody in them
//   posts uncovered   — vacancies PLUS people on the roster who cannot stand a
//                       post today (light duty, FMLA, military, admin leave)
//
// Detention shows 59 of the first and 84 of the second. Custody Operations and
// Budget & Operations both quote 84, because a post board counts coverage, not
// headcount.

const divisions = [
  { division: 'Patrol',                 kind: 'Sworn · deputy through captain',        auth: 412, filled: 371, sworn: 371, funded: 33, pipeline: 22, net90: 4,  offDuty: 24 },
  { division: 'Detention',              kind: 'Sworn · detention officer through captain', auth: 486, filled: 427, sworn: 427, funded: 48, pipeline: 31, net90: -6, offDuty: 25 },
  { division: 'Court Services',         kind: 'Sworn · civil process and courthouse',  auth: 118, filled: 112, sworn: 112, funded: 6,  pipeline: 3,  net90: 1,  offDuty: 7  },
  { division: 'Criminal Investigations', kind: 'Sworn · detective and supervisory',    auth: 46,  filled: 42,  sworn: 42,  funded: 4,  pipeline: 2,  net90: -1, offDuty: 3  },
  { division: 'Communications',         kind: 'Civilian · 911 dispatch and records',   auth: 96,  filled: 79,  sworn: 0,   funded: 14, pipeline: 14, net90: -2, offDuty: 11 },
  { division: 'Support Services',       kind: 'Civilian · records, property, fleet',   auth: 104, filled: 96,  sworn: 0,   funded: 5,  pipeline: 5,  net90: 0,  offDuty: 12 },
  { division: 'Training',               kind: 'Sworn and civilian · academy and range', auth: 22, filled: 20,  sworn: 14,  funded: 1,  pipeline: 1,  net90: 0,  offDuty: 3  },
  { division: 'Administration',         kind: 'Sworn and civilian · command and business', auth: 38, filled: 36, sworn: 18, funded: 1, pipeline: 2, net90: 1,  offDuty: 4  },
];

const strength = {
  timeToHire: 147,
  hireTarget: 90,
  backgroundDays: 74,
  attritionAssumption: 8.5,
  nextCohort: 'May 2027',
};

// ── Recruiting pipeline ────────────────────────────────────────
// `inStage` is a work-in-progress snapshot. `passRate` is the trailing
// twelve-month yield for that stage, measured on completed cohorts. They are
// different measurements and the page says so rather than implying the counts
// multiply down the funnel.

const pipeline = [
  { stage: 'Applications received',    note: 'Rolling posting · 12-week intake window', inStage: 284, passRate: null, median: 0,  flow: 'WITHIN TARGET' },
  { stage: 'Minimum qualifications',   note: 'Automated screen against POST eligibility', inStage: 171, passRate: 60, median: 6,  flow: 'WITHIN TARGET' },
  { stage: 'Written and physical',     note: 'Monthly testing cycle',                   inStage: 98,  passRate: 57, median: 11, flow: 'WITHIN TARGET' },
  { stage: 'Background investigation', note: 'Four investigators · 38 active files', noteTone: 'amber', inStage: 38, passRate: 39, median: 74, flow: 'BOTTLENECK' },
  { stage: 'Polygraph',                note: 'Single contracted examiner', noteTone: 'amber', inStage: 14, passRate: 71, median: 22, flow: 'BOTTLENECK' },
  { stage: 'Psychological and medical', note: 'Contracted provider',                   inStage: 11,  passRate: 86, median: 19, flow: 'WITHIN TARGET' },
  { stage: 'Conditional offer',        note: 'Awaiting Sheriff signature on 3',        inStage: 9,   passRate: 92, median: 8,  flow: 'WITHIN TARGET' },
  { stage: 'Academy assignment',       note: 'Next cohort May 2027 — third cohort deferred', noteTone: 'red', inStage: 0, passRate: null, median: 0, flow: 'NO COHORT' },
];

const separations = [
  { reason: 'Resignation — other agency', note: 'Primarily Detention and Communications',  count: 34, delta: 9  },
  { reason: 'Retirement',                 note: 'Median 27 years of service',               count: 28, delta: 4  },
  { reason: 'Resignation — left the field', note: 'Exit interviews cite scheduling and overtime', count: 19, delta: 6 },
  { reason: 'Probationary release',       note: 'Within first 12 months',                   count: 11, delta: -2 },
  { reason: 'Termination',                note: 'Sustained policy violation',               count: 6,  delta: 0  },
  { reason: 'Medical separation',         note: 'Duty and non-duty related',                count: 4,  delta: 0  },
];

// ── Right column ───────────────────────────────────────────────

const personnelActions = [
  { action: 'Promotional appointments',           note: 'Captain of Investigations · 2 sergeant', count: 3,  oldest: 34, tone: 'amber' },
  { action: 'Transfer requests',                  note: 'Bid cycle closed Aug 1',                 count: 11, oldest: 9,  tone: 'slate' },
  { action: 'Conditional offers awaiting signature', note: 'Sheriff approval required',           count: 3,  oldest: 12, tone: 'red'   },
  { action: 'Reclassification requests',          note: 'Position control amendment',             count: 4,  oldest: 61, tone: 'amber' },
  { action: 'Probationary evaluations due',       note: '6-month and 12-month reviews',           count: 5,  oldest: null, overdue: 2, tone: 'amber' },
  { action: 'Grievances in process',              note: 'Step 2 and Step 3',                      count: 1,  oldest: 22, tone: 'slate' },
];

const offFullDuty = [
  { status: 'FMLA',                  note: 'Continuous and intermittent',              count: 31 },
  { status: "Workers' compensation", note: '19 duty-related · median 41 days out',     count: 24 },
  { status: 'Light duty',            note: 'Restricted assignment · not post-eligible', count: 18 },
  { status: 'Military leave',        note: 'Title 10 and drill obligations',           count: 9  },
  { status: 'Administrative leave',  note: 'Includes one deputy since Jul 27 — OIS review', count: 3 },
  { status: 'Extended unpaid',       note: 'Approved through Personnel Board',         count: 4  },
];

const backgrounds = [
  { stage: 'Personal history review',      note: 'Initial packet and references', count: 12, median: 18, tone: 'slate'   },
  { stage: 'Employment and residence',     note: 'Field verification',            count: 9,  median: 41, tone: 'amber'   },
  { stage: 'Criminal history and NCIC',    note: 'GCIC and interstate returns',   count: 7,  median: 26, tone: 'slate'   },
  { stage: 'Awaiting investigator assignment', note: 'No investigator available', count: 8,  median: 31, tone: 'red'     },
  { stage: 'Ready for adjudication',       note: 'Packet complete · command review', count: 2, median: 6, tone: 'emerald' },
];

const retention = [
  { measure: 'Retirement-eligible within 24 months', note: 'Modeled from service date and plan tier', value: '94',   tone: 'amber'   },
  { measure: 'Eligible in supervisory ranks',        note: 'Sergeant and above',                      value: '31',   tone: 'amber'   },
  { measure: 'Median agency tenure',                 note: 'Down from 9.2 years in FY24',             value: '7.8y', tone: 'amber'   },
  { measure: 'First-year separation rate',           note: 'Probationary and voluntary',              value: '14.2%', tone: 'red'    },
  { measure: 'Internal promotion fill rate',         note: 'Supervisory vacancies filled internally', value: '88%',  tone: 'emerald' },
];

// ── Compensation ───────────────────────────────────────────────
// The largest separation category is resignation to another agency, so the
// board carries the market position that explains it.

// Agency rates are the pay-grade figures Job Postings quotes on each
// requisition, so the two pages cannot disagree about our own payroll. The
// market column differs between the pages by design: this is the broader
// regional survey, Job Postings compares against the six metro agencies the
// county actually loses candidates to.
const compensation = [
  { class: 'Deputy — entry',            agency: 52180, market: 57900, incumbents: 148 },
  { class: 'Deputy — 5 year',           agency: 61200, market: 64800, incumbents: 214 },
  { class: 'Detention officer — entry', agency: 47320, market: 52100, incumbents: 341 },
  { class: 'Telecommunicator — entry',  agency: 44900, market: 49600, incumbents: 79  },
  { class: 'Sergeant',                  agency: 74300, market: 76200, incumbents: 96  },
  { class: 'Detective — mid-range',     agency: 69400, market: 70100, incumbents: 42  },
];

// ── Applicant flow — EEO / adverse impact ──────────────────────
// Selection-rate ratios against the highest-selecting group. Below 0.80 is the
// federal four-fifths benchmark for adverse impact and requires validation of
// the stage, not a defence of the outcome.

const FOUR_FIFTHS = 0.8;
const applicantFlow = [
  { group: 'White',              applied: 121, offered: 5 },
  { group: 'Black',              applied: 98,  offered: 2 },
  { group: 'Hispanic',           applied: 41,  offered: 1 },
  { group: 'Asian / Pacific Is.', applied: 16, offered: 1 },
  { group: 'Two or more / other', applied: 8,  offered: 0 },
];
const applicantSex = [
  { group: 'Male',   applied: 219, offered: 8 },
  { group: 'Female', applied: 65,  offered: 1 },
];

// ── Leave and accommodation clocks ─────────────────────────────
// Counts are a roster; clocks are the liability. These are the dates that
// generate an obligation if they pass unattended.

const leaveClocks = [
  { clock: 'FMLA entitlement exhausting',   note: '12-week allotment · 4 within 30 days', count: 7,  tone: 'red'   },
  { clock: 'Light duty past policy maximum', note: '90-day restricted assignment cap',    count: 5,  tone: 'red'   },
  { clock: 'ADA interactive process open',  note: 'Accommodation request unresolved',     count: 6,  tone: 'amber' },
  { clock: 'Return-to-work exam pending',   note: "Workers' comp release on file",        count: 4,  tone: 'amber' },
  { clock: 'USERRA reinstatement window',   note: 'Reemployment right on return',         count: 2,  tone: 'slate' },
];

const dueProcess = [
  { item: 'Loudermill hearing due',        note: 'Pre-disciplinary · statutory notice',  count: 2, oldest: 'due in 4d',  tone: 'red'   },
  { item: 'Appeals before Personnel Board', note: 'Two terminations, one demotion',      count: 3, oldest: 'oldest 71d', tone: 'amber' },
  { item: 'POST decertification exposure', note: 'Sustained findings reportable to POST', count: 1, oldest: 'report 30d', tone: 'red'  },
  { item: 'Employees on paid admin leave', note: 'Salary continuing pending outcome',    count: 3, oldest: 'oldest 13d', tone: 'amber' },
];

const intelligence = [
  {
    title: 'Background investigation is the hiring constraint', tone: 'red',
    body: 'Thirty-eight active files against four investigators produce a 74-day median where the target is 45. Half of the 147-day time to hire sits in this one stage.',
    action: 'Two contract background investigators would return the stage to target within one cycle at roughly the cost of six weeks of Detention overtime.',
    sources: 'Applicant tracking · BI module · position control · overtime ledger',
  },
  {
    title: 'Detention attrition and overtime are one loop', tone: 'amber',
    body: 'Detention carries the highest vacancy rate and the highest mandatory overtime, and separations there have outpaced hires for four consecutive months.',
    action: 'Model the cost of a targeted retention incentive against the overtime it displaces before the FY27 request is finalized.',
    sources: 'Position control · payroll · exit interviews · Custody Operations',
  },
  {
    title: 'The deferred cohort has a delivery date', tone: 'amber',
    body: 'With the third academy cohort deferred, twenty-four sworn positions that would have been filled in January now have no delivery date before May.',
    action: 'Present the deferral as a strength timeline in the FY27 request rather than as a savings line.',
    sources: 'Training division · budget amendment · position control',
  },
  {
    title: 'Detention officer pay is the resignation driver', tone: 'red',
    // Body is templated because it quotes two figures the compensation table computes.
    body: null,
    action: 'A market adjustment for the detention series costs less than the overtime the resulting vacancies generate; model both in the same FY27 line.',
    sources: 'County payroll · regional salary survey · exit interviews',
  },
];

// ── Helpers ────────────────────────────────────────────────────

const pct = (n, d) => (d ? (n / d) * 100 : 0);
const money = (n) => `$${(n / 1000).toFixed(1)}K`;

const vacancyTone = (rate) => (rate > 12 ? 'text-red-400' : rate >= 10 ? 'text-amber-400' : 'text-slate-400');
const vacancyBar = (rate) => (rate > 12 ? 'bg-red-500' : rate >= 10 ? 'bg-amber-400' : 'bg-slate-600');

const flowTone = {
  'WITHIN TARGET': 'text-emerald-400',
  BOTTLENECK:      'text-red-400',
  'NO COHORT':     'text-red-400',
};

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

function Meter({ value, tone = 'bg-slate-600', tick }) {
  return (
    <span className="relative block h-1 bg-zinc-800/70 rounded-full">
      <span className={`block h-full rounded-full ${tone}`} style={{ width: `${Math.min(value, 100)}%` }} />
      {tick !== undefined && (
        <span className="absolute top-[-2px] bottom-[-2px] w-px bg-slate-500" style={{ left: `${tick}%` }} />
      )}
    </span>
  );
}

export default function HRDashboard() {
  const navigate = useNavigate();
  const [flowBasis, setFlowBasis] = useState('race');

  // ── Position control roll-up ────────────────────────────────
  const t = divisions.reduce(
    (a, d) => ({
      auth: a.auth + d.auth,
      filled: a.filled + d.filled,
      funded: a.funded + d.funded,
      pipeline: a.pipeline + d.pipeline,
      net90: a.net90 + d.net90,
      offDuty: a.offDuty + d.offDuty,
    }),
    { auth: 0, filled: 0, funded: 0, pipeline: 0, net90: 0, offDuty: 0 },
  );
  const vacant = t.auth - t.filled;
  const vacancyRate = pct(vacant, t.auth);
  const held = vacant - t.funded;

  // Sworn strength is what POST currency on Performance & Compliance measures against.
  const swornFilled = divisions.reduce((a, d) => a + d.sworn, 0);
  const civilianFilled = t.filled - swornFilled;

  const separationTotal = separations.reduce((a, s) => a + s.count, 0);
  const attrition = pct(separationTotal, t.filled);
  const sepMax = Math.max(...separations.map((s) => s.count));

  const actionsPending = personnelActions.reduce((a, p) => a + p.count, 0);
  const offDutyTotal = offFullDuty.reduce((a, o) => a + o.count, 0);
  const offDutyShare = pct(offDutyTotal, t.filled);
  // The largest division the off-duty roster outnumbers — the strongest true comparison.
  const outnumbered = [...divisions].filter((d) => d.filled < offDutyTotal).sort((a, b) => b.filled - a.filled)[0];
  const backgroundsActive = backgrounds.reduce((a, b) => a + b.count, 0);

  const atOffer = pipeline.find((p) => p.stage === 'Conditional offer').inStage;
  const applications = pipeline[0].inStage;
  const wipYield = pct(atOffer, applications);
  const bottlenecks = pipeline.filter((p) => p.flow === 'BOTTLENECK');
  const maxInStage = Math.max(...pipeline.map((p) => p.inStage));

  // Posts uncovered = vacancies plus roster who cannot stand a post.
  const detention = divisions.find((d) => d.division === 'Detention');
  const detentionUncovered = detention.auth - detention.filled + detention.offDuty;

  // ── Compensation ────────────────────────────────────────────
  const withGap = compensation.map((c) => ({ ...c, gap: pct(c.agency - c.market, c.market) }));
  const weightedGap =
    withGap.reduce((a, c) => a + c.gap * c.incumbents, 0) / withGap.reduce((a, c) => a + c.incumbents, 0);
  const worstClass = [...withGap].sort((a, b) => a.gap - b.gap)[0];
  const detentionPay = withGap.find((c) => c.class.startsWith('Detention officer'));
  const cards = intelligence.map((c) => c.body ? c : ({
    ...c,
    body: `Detention officers sit ${Math.abs(detentionPay.gap).toFixed(1)}% below market against a `
      + `${Math.abs(weightedGap).toFixed(1)}% agency-wide gap, and Detention supplies the largest share of `
      + `resignations to other agencies.`,
  }));

  // ── Adverse impact ──────────────────────────────────────────
  const flowRows = flowBasis === 'race' ? applicantFlow : applicantSex;
  const rates = flowRows.map((r) => ({ ...r, rate: pct(r.offered, r.applied) }));
  const bestRate = Math.max(...rates.map((r) => r.rate));
  const scored = rates.map((r) => ({ ...r, ratio: bestRate ? r.rate / bestRate : 0 }));
  const flagged = scored.filter((r) => r.applied >= 30 && r.ratio < FOUR_FIFTHS).length;

  const leaveExposure = leaveClocks.reduce((a, c) => a + c.count, 0);
  const dueProcessOpen = dueProcess.reduce((a, d) => a + d.count, 0);

  return (
    <DashboardLayout
      navigation={hrNavigation}
      profile={hrProfile}
      notifications={hrNotifications}
      settingsRoute="/hr/settings"
      profileRoute="/hr/profile"
      activityRoute="/hr/activity"
      activityModuleFilter="hr"
    >
      <div className="min-h-full bg-[#0A0A0B] px-6 py-8">
        <div className="max-w-[1500px] mx-auto">

          {/* ── Header ─────────────────────────────────────── */}
          <div className="flex flex-col lg:flex-row lg:items-center gap-3 lg:gap-4">
            <div className="flex items-baseline gap-3 flex-wrap">
              <h1 className="text-[19px] font-bold text-slate-100">Workforce &amp; Human Resources</h1>
              <span className="text-[11px] text-slate-500">
                Pay period 16 · position control · applicant tracking · Georgia POST · county payroll
              </span>
            </div>
            <div className="flex items-center gap-4 lg:ml-auto flex-wrap">
              <span className="text-[11px] text-amber-400/90">
                Communications at {pct(96 - 79, 96).toFixed(1)}% vacancy · no academy cohort until May
              </span>
              <button
                onClick={() => window.print()}
                className="px-3.5 py-2 border border-slate-700/60 rounded-lg text-[11.5px] font-semibold text-slate-200 hover:bg-zinc-900/60 transition-colors"
              >
                Strength report — PDF
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
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />Filled strength
                  </p>
                  <p className="leading-none">
                    <span className="text-[24px] font-bold text-slate-100">{t.filled.toLocaleString()}</span>
                    <span className="text-[11.5px] text-slate-400 ml-2">of {t.auth.toLocaleString()} authorized</span>
                  </p>
                  <p className="text-[10.5px] text-amber-400/90 mt-2">
                    {vacant} vacant · {vacancyRate.toFixed(1)}% agency-wide · {t.funded} funded, {held} held
                  </p>
                </div>
                <div className="px-5 py-4 border-b border-slate-800/60">
                  <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500 mb-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500" />Net change 90 days
                  </p>
                  <p className="leading-none">
                    <span className="text-[24px] font-bold text-slate-100">{t.net90 > 0 ? '+' : ''}{t.net90}</span>
                    <span className="text-[11.5px] text-slate-400 ml-2">positions</span>
                  </p>
                  <p className="text-[10.5px] text-red-400/90 mt-2">separations outpacing hires</p>
                </div>
                <div className="px-5 py-4">
                  <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500 mb-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500" />Time to hire
                  </p>
                  <p className="leading-none">
                    <span className="text-[24px] font-bold text-slate-100">{strength.timeToHire}</span>
                    <span className="text-[11.5px] text-slate-400 ml-2">days median to offer</span>
                  </p>
                  <p className="text-[10.5px] text-red-400/90 mt-2">
                    background stage is {strength.backgroundDays} of those days · target {strength.hireTarget}
                  </p>
                </div>
                <div className="px-5 py-4">
                  <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500 mb-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />12-month attrition
                  </p>
                  <p className="leading-none">
                    <span className="text-[24px] font-bold text-slate-100">{attrition.toFixed(1)}%</span>
                    <span className="text-[11.5px] text-slate-400 ml-2">{separationTotal} separations</span>
                  </p>
                  <p className="text-[10.5px] text-amber-400/90 mt-2">
                    above the {strength.attritionAssumption}% planning assumption
                  </p>
                </div>
              </div>

              {/* Strength by division */}
              <div className="mt-7">
                <SectionLabel right={<span className="text-[10px] text-slate-500">red = vacancy rate above 12%</span>}>
                  Strength by division
                </SectionLabel>
                <div className="flex items-end gap-3 pb-2 border-b border-slate-800/70 pl-3 text-[9px] font-bold uppercase tracking-[0.12em] text-slate-500">
                  <span className="flex-1 min-w-0">Division</span>
                  <span className="w-10 text-right flex-shrink-0">Auth</span>
                  <span className="w-10 text-right flex-shrink-0">Filled</span>
                  <span className="w-10 text-right flex-shrink-0">Vacant</span>
                  <span className="w-[104px] flex-shrink-0">Vacancy rate</span>
                  <span className="w-12 text-right flex-shrink-0">Pipeline</span>
                  <span className="w-10 text-right flex-shrink-0">90-day</span>
                </div>
                <div className="divide-y divide-slate-800/50">
                  {divisions.map((d) => {
                    const v = d.auth - d.filled;
                    const rate = pct(v, d.auth);
                    return (
                      <div key={d.division} className={`flex items-center gap-3 py-3 pl-3 border-l-2 ${
                        rate > 12 ? 'border-red-500/70' : rate >= 10 ? 'border-amber-500/60' : 'border-transparent'
                      }`}>
                        <div className="flex-1 min-w-0">
                          <p className="text-[12px] font-semibold text-slate-100 truncate">{d.division}</p>
                          <p className="text-[10px] text-slate-500 truncate">{d.kind}</p>
                        </div>
                        <span className="w-10 text-right text-[11px] font-mono text-slate-400 flex-shrink-0">{d.auth}</span>
                        <span className="w-10 text-right text-[11px] font-mono font-bold text-slate-100 flex-shrink-0">{d.filled}</span>
                        <span className={`w-10 text-right text-[11px] font-mono flex-shrink-0 ${vacancyTone(rate)}`}>{v}</span>
                        <span className="w-[104px] flex items-center gap-2 flex-shrink-0">
                          <span className="flex-1"><Meter value={rate * 5} tone={vacancyBar(rate)} /></span>
                          <span className={`w-10 text-right text-[10.5px] font-mono ${vacancyTone(rate)}`}>{rate.toFixed(1)}%</span>
                        </span>
                        <span className="w-12 text-right text-[11px] font-mono text-slate-300 flex-shrink-0">{d.pipeline}</span>
                        <span className={`w-10 text-right text-[11px] font-mono flex-shrink-0 ${
                          d.net90 > 0 ? 'text-emerald-400' : d.net90 < 0 ? 'text-red-400' : 'text-slate-600'
                        }`}>
                          {d.net90 > 0 ? '+' : ''}{d.net90 === 0 ? '0' : d.net90}
                        </span>
                      </div>
                    );
                  })}
                </div>
                <div className="flex items-center gap-3 py-3 pl-3 border-t border-slate-800/70">
                  <span className="flex-1 min-w-0 text-[12px] font-bold text-slate-100">Agency total</span>
                  <span className="w-10 text-right text-[11px] font-mono font-bold text-slate-200 flex-shrink-0">{t.auth.toLocaleString()}</span>
                  <span className="w-10 text-right text-[11px] font-mono font-bold text-slate-100 flex-shrink-0">{t.filled.toLocaleString()}</span>
                  <span className="w-10 text-right text-[11px] font-mono font-bold text-amber-400 flex-shrink-0">{vacant}</span>
                  <span className="w-[104px] text-[10.5px] font-mono text-amber-400 flex-shrink-0">{vacancyRate.toFixed(1)}% agency-wide</span>
                  <span className="w-12 text-right text-[11px] font-mono font-bold text-slate-200 flex-shrink-0">{t.pipeline}</span>
                  <span className="w-10 text-right text-[11px] font-mono font-bold text-red-400 flex-shrink-0">{t.net90}</span>
                </div>
                <p className="text-[10px] text-slate-500 mt-2 leading-relaxed">
                  Pipeline = candidates in process against that division's vacancies. 90-day = net change in filled positions.
                  Filled strength is {swornFilled} sworn and {civilianFilled} civilian — sworn strength is the denominator for POST currency on Performance &amp; Compliance.
                  {' '}Detention carries {detention.auth - detention.filled} vacant positions but {detentionUncovered} uncovered posts once
                  {' '}{detention.offDuty} off-full-duty personnel are counted — post boards quote the second number.
                </p>
              </div>

              {/* Recruiting pipeline */}
              <div className="mt-7">
                <SectionLabel right={<span className="text-[10px] text-slate-500">{applications} applications · {atOffer} at conditional offer</span>}>
                  Recruiting pipeline
                </SectionLabel>
                <div className="flex items-end gap-3 pb-2 border-b border-slate-800/70 pl-3 text-[9px] font-bold uppercase tracking-[0.12em] text-slate-500">
                  <span className="flex-1 min-w-0">Stage</span>
                  <span className="w-14 text-right flex-shrink-0">In stage</span>
                  <span className="w-[92px] flex-shrink-0">Stage yield</span>
                  <span className="w-12 text-right flex-shrink-0">Median</span>
                  <span className="w-28 text-right flex-shrink-0">Flow</span>
                </div>
                <div className="divide-y divide-slate-800/50">
                  {pipeline.map((s, i) => (
                    <div key={s.stage} className={`flex items-center gap-3 py-3 pl-3 border-l-2 ${
                      s.flow === 'WITHIN TARGET' ? 'border-transparent' : 'border-red-500/70'
                    }`}>
                      <div className="flex-1 min-w-0">
                        <p className="text-[12px] font-semibold text-slate-100 truncate">
                          <span className="font-mono text-[9px] text-slate-600 mr-1.5">{i + 1}</span>{s.stage}
                        </p>
                        <p className={`text-[10px] truncate ${
                          s.noteTone === 'red' ? 'text-red-400/90' : s.noteTone === 'amber' ? 'text-amber-400/80' : 'text-slate-500'
                        }`}>{s.note}</p>
                      </div>
                      <span className="w-14 text-right text-[12px] font-mono font-bold text-slate-100 flex-shrink-0">{s.inStage}</span>
                      <span className="w-[92px] flex items-center gap-2 flex-shrink-0">
                        {s.passRate === null ? (
                          <span className="text-[10.5px] font-mono text-slate-600">—</span>
                        ) : (
                          <>
                            <span className="flex-1"><Meter value={s.passRate} tone={s.passRate < 50 ? 'bg-red-500' : 'bg-slate-600'} /></span>
                            <span className={`text-[10.5px] font-mono ${s.passRate < 50 ? 'text-red-400' : 'text-slate-400'}`}>{s.passRate}%</span>
                          </>
                        )}
                      </span>
                      <span className={`w-12 text-right text-[11px] font-mono flex-shrink-0 ${s.median > 40 ? 'text-red-400' : 'text-slate-400'}`}>{s.median}d</span>
                      <span className={`w-28 text-right text-[10px] font-bold tracking-wider flex-shrink-0 ${flowTone[s.flow]}`}>{s.flow}</span>
                    </div>
                  ))}
                </div>
                <p className="text-[10px] text-slate-500 mt-3 leading-relaxed">
                  In stage is a snapshot of files in process; stage yield is the trailing twelve-month pass rate for that stage, measured
                  on completed cohorts — the two are different measurements and the counts do not multiply down the funnel.
                  Bottleneck: {bottlenecks.map((b) => b.stage.toLowerCase()).join(' and ')}. Median time to hire is {strength.timeToHire} days
                  against a {strength.hireTarget}-day target, and background investigation accounts for {Math.round(pct(strength.backgroundDays, strength.timeToHire))}% of it.
                  Of the {applications} applications now in process, {atOffer} have reached conditional offer ({wipYield.toFixed(1)}%).
                </p>
              </div>

              {/* Compensation position */}
              <div className="mt-7">
                <SectionLabel right={
                  <span className="text-[10px] text-red-400/90">{weightedGap.toFixed(1)}% below market, weighted by incumbents</span>
                }>
                  Compensation position
                </SectionLabel>
                <div className="flex items-end gap-3 pb-2 border-b border-slate-800/70 pl-3 text-[9px] font-bold uppercase tracking-[0.12em] text-slate-500">
                  <span className="flex-1 min-w-0">Class</span>
                  <span className="w-16 text-right flex-shrink-0">Agency</span>
                  <span className="w-16 text-right flex-shrink-0">Market</span>
                  <span className="w-[92px] flex-shrink-0">Gap</span>
                  <span className="w-16 text-right flex-shrink-0">Incumbents</span>
                </div>
                <div className="divide-y divide-slate-800/50">
                  {withGap.map((c) => (
                    <div key={c.class} className={`flex items-center gap-3 py-3 pl-3 border-l-2 ${
                      c.gap <= -10 ? 'border-red-500/70' : c.gap <= -5 ? 'border-amber-500/60' : 'border-transparent'
                    }`}>
                      <span className="flex-1 min-w-0 text-[12px] font-semibold text-slate-100 truncate">{c.class}</span>
                      <span className="w-16 text-right text-[11px] font-mono text-slate-100 flex-shrink-0">{money(c.agency)}</span>
                      <span className="w-16 text-right text-[11px] font-mono text-slate-400 flex-shrink-0">{money(c.market)}</span>
                      <span className="w-[92px] flex items-center gap-2 flex-shrink-0">
                        <span className="flex-1">
                          <Meter value={Math.abs(c.gap) * 8} tone={c.gap <= -10 ? 'bg-red-500' : c.gap <= -5 ? 'bg-amber-400' : 'bg-slate-600'} />
                        </span>
                        <span className={`text-[10.5px] font-mono ${c.gap <= -10 ? 'text-red-400' : c.gap <= -5 ? 'text-amber-400' : 'text-slate-400'}`}>
                          {c.gap.toFixed(1)}%
                        </span>
                      </span>
                      <span className="w-16 text-right text-[11px] font-mono text-slate-300 flex-shrink-0">{c.incumbents}</span>
                    </div>
                  ))}
                </div>
                <p className="text-[10px] text-slate-500 mt-3 leading-relaxed">
                  Market is the regional survey median for comparable agencies. {worstClass.class} carries the widest gap at
                  {' '}{worstClass.gap.toFixed(1)}%, and the detention series the widest gap by headcount at {detentionPay.gap.toFixed(1)}% across
                  {' '}{detentionPay.incumbents} incumbents — the two series the separations table names as the source of resignations to other agencies.
                </p>
              </div>

              {/* Separations */}
              <div className="mt-7">
                <SectionLabel right={<span className="text-[10px] text-slate-500">{separationTotal} separations · {attrition.toFixed(1)}% attrition</span>}>
                  Separations — trailing 12 months
                </SectionLabel>
                <div className="divide-y divide-slate-800/50">
                  {separations.map((s, i) => (
                    <div key={s.reason} className={`flex items-center gap-4 py-3.5 pl-3 border-l-2 ${i < 3 ? 'border-amber-500/60' : 'border-transparent'}`}>
                      <div className="w-52 flex-shrink-0 min-w-0">
                        <p className="text-[12px] font-semibold text-slate-100">{s.reason}</p>
                        <p className="text-[10px] text-slate-500 truncate">{s.note}</p>
                      </div>
                      <span className="w-8 text-right text-[12px] font-mono font-bold text-slate-100 flex-shrink-0">{s.count}</span>
                      <span className="flex-1 min-w-0">
                        <Meter value={pct(s.count, sepMax)} tone={i < 3 ? 'bg-amber-400' : 'bg-slate-600'} />
                      </span>
                      <span className={`w-28 text-right text-[10.5px] flex-shrink-0 ${
                        s.delta > 0 ? 'text-red-400' : s.delta < 0 ? 'text-emerald-400' : 'text-slate-500'
                      }`}>
                        {s.delta === 0 ? '— level' : `${s.delta > 0 ? '▲' : '▼'} ${Math.abs(s.delta)} vs prior year`}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="text-[10px] text-slate-500 mt-3 leading-relaxed">
                  Voluntary resignations to other agencies are the largest category and the fastest growing. Exit interviews in Detention
                  and Communications cite mandatory overtime and schedule predictability before compensation.
                </p>
              </div>

              {/* Workforce intelligence */}
              <div className="mt-7">
                <SectionLabel right={<span className="text-[10px] text-slate-500">AI-assisted synthesis · 5 sources · confidence 84% · 22m ago</span>}>
                  Workforce intelligence
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
              {/* Personnel actions */}
              <SectionLabel right={<span className="text-[10px] text-slate-500">{actionsPending} pending</span>}>
                Personnel actions
              </SectionLabel>
              <div className="divide-y divide-slate-800/50">
                {personnelActions.map((p) => (
                  <div key={p.action} className="flex items-start gap-2.5 py-3">
                    <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5 ${dotTone[p.tone]}`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-[12.5px] font-semibold text-slate-100 truncate">{p.action}</p>
                      <p className="text-[10.5px] text-slate-500 truncate">{p.note}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className={`text-[12.5px] font-mono font-bold ${textTone[p.tone]}`}>{p.count}</p>
                      <p className="text-[10px] text-slate-500">
                        {p.overdue ? `${p.overdue} overdue` : `oldest ${p.oldest}d`}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-[10px] text-slate-500 mt-2.5">
                Sign-offs route to the{' '}
                <button onClick={() => navigate('/command/approvals')} className="text-amber-500/90 hover:text-amber-400 transition-colors">Decision Center</button>.
                {' '}Promotional actions require Sheriff approval.
              </p>

              {/* Off full duty */}
              <div className="mt-7">
                <SectionLabel right={<span className="text-[10px] text-slate-500">{offDutyTotal} of {t.filled.toLocaleString()}</span>}>
                  Off full duty
                </SectionLabel>
                <div className="divide-y divide-slate-800/50">
                  {offFullDuty.map((o) => (
                    <div key={o.status} className="flex items-center gap-3 py-3">
                      <div className="flex-1 min-w-0">
                        <p className="text-[12.5px] text-slate-100 truncate">{o.status}</p>
                        <p className="text-[10.5px] text-slate-500 truncate">{o.note}</p>
                      </div>
                      <span className="text-[13px] font-mono font-bold text-amber-400 flex-shrink-0">{o.count}</span>
                    </div>
                  ))}
                </div>
                <p className="text-[10px] text-slate-500 mt-2.5 leading-relaxed">
                  {offDutyTotal} personnel are unavailable for full-duty assignment, equal to {offDutyShare.toFixed(1)}% of filled
                  strength — larger than the {outnumbered.division} division.
                </p>
              </div>

              {/* Leave and accommodation clocks */}
              <div className="mt-7">
                <SectionLabel right={<span className="text-[10px] text-red-400/90">{leaveExposure} clocks running</span>}>
                  Leave &amp; accommodation clocks
                </SectionLabel>
                <div className="divide-y divide-slate-800/50">
                  {leaveClocks.map((c) => (
                    <div key={c.clock} className="flex items-start gap-2.5 py-3">
                      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5 ${dotTone[c.tone]}`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-[12.5px] font-semibold text-slate-100 truncate">{c.clock}</p>
                        <p className="text-[10.5px] text-slate-500 truncate">{c.note}</p>
                      </div>
                      <span className={`text-[12.5px] font-mono font-bold flex-shrink-0 ${textTone[c.tone]}`}>{c.count}</span>
                    </div>
                  ))}
                </div>
                <p className="text-[10px] text-slate-500 mt-2.5 leading-relaxed">
                  The roster above is a count; these are the dates that create an obligation if they pass unattended. Individual
                  medical detail stays in the employee record and is not surfaced at command level.
                </p>
              </div>

              {/* Applicant flow / adverse impact */}
              <div className="mt-7">
                <SectionLabel right={
                  <span className="flex items-center gap-3">
                    {['race', 'sex'].map((b) => (
                      <button
                        key={b}
                        onClick={() => setFlowBasis(b)}
                        className={`text-[11px] capitalize transition-colors ${
                          flowBasis === b ? 'text-slate-100 font-semibold underline underline-offset-4' : 'text-slate-500 hover:text-slate-300'
                        }`}
                      >
                        {b}
                      </button>
                    ))}
                  </span>
                }>
                  Applicant flow — adverse impact
                </SectionLabel>
                <div className="flex items-end gap-3 pb-2 border-b border-slate-800/70 text-[9px] font-bold uppercase tracking-[0.12em] text-slate-500">
                  <span className="flex-1 min-w-0">Group</span>
                  <span className="w-12 text-right flex-shrink-0">Applied</span>
                  <span className="w-12 text-right flex-shrink-0">Offered</span>
                  <span className="w-14 text-right flex-shrink-0">Rate</span>
                  <span className="w-16 text-right flex-shrink-0">Ratio</span>
                </div>
                <div className="divide-y divide-slate-800/50">
                  {scored.map((r) => {
                    const small = r.applied < 30;
                    const fails = !small && r.ratio < FOUR_FIFTHS;
                    return (
                      <div key={r.group} className="flex items-center gap-3 py-2.5">
                        <span className="flex-1 min-w-0 text-[12px] text-slate-100 truncate">{r.group}</span>
                        <span className="w-12 text-right text-[11px] font-mono text-slate-300 flex-shrink-0">{r.applied}</span>
                        <span className="w-12 text-right text-[11px] font-mono text-slate-300 flex-shrink-0">{r.offered}</span>
                        <span className="w-14 text-right text-[11px] font-mono text-slate-400 flex-shrink-0">{r.rate.toFixed(1)}%</span>
                        <span className={`w-16 text-right text-[11px] font-mono flex-shrink-0 ${
                          small ? 'text-slate-600' : fails ? 'text-red-400' : 'text-emerald-400'
                        }`}>
                          {small ? 'n < 30' : r.ratio.toFixed(2)}
                        </span>
                      </div>
                    );
                  })}
                </div>
                <p className="text-[10px] text-slate-500 mt-2.5 leading-relaxed">
                  Selection rate is conditional offers over applications; ratio compares each group against the highest-selecting group.
                  Below {FOUR_FIFTHS.toFixed(2)} is the federal four-fifths benchmark —{' '}
                  <span className={flagged ? 'text-red-400' : 'text-emerald-400'}>
                    {flagged === 0 ? 'no group is below it on this basis' : `${flagged} ${flagged === 1 ? 'group is' : 'groups are'} below it`}
                  </span>
                  . Groups under thirty applicants are not scored. A flagged stage requires validation of the selection procedure,
                  not a defence of the outcome.
                </p>
              </div>

              {/* Background investigations */}
              <div className="mt-7">
                <SectionLabel right={<span className="text-[10px] text-slate-500">{backgroundsActive} active</span>}>
                  Background investigations
                </SectionLabel>
                <div className="divide-y divide-slate-800/50">
                  {backgrounds.map((b) => (
                    <div key={b.stage} className="flex items-start gap-2.5 py-3">
                      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5 ${dotTone[b.tone]}`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-[12.5px] font-semibold text-slate-100 truncate">{b.stage}</p>
                        <p className="text-[10.5px] text-slate-500 truncate">{b.note}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-[12.5px] font-mono font-bold text-slate-100">{b.count}</p>
                        <p className={`text-[10px] font-mono ${textTone[b.tone]}`}>median {b.median}d</p>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-[10px] text-slate-500 mt-2.5 leading-relaxed">
                  Candidate identities are held in the Background Investigations module and are not surfaced at command level.
                </p>
              </div>

              {/* Due process & standing */}
              <div className="mt-7">
                <SectionLabel right={<span className="text-[10px] text-amber-400/90">{dueProcessOpen} open</span>}>
                  Due process &amp; POST standing
                </SectionLabel>
                <div className="divide-y divide-slate-800/50">
                  {dueProcess.map((d) => (
                    <div key={d.item} className="flex items-start gap-2.5 py-3">
                      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5 ${dotTone[d.tone]}`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-[12.5px] font-semibold text-slate-100 truncate">{d.item}</p>
                        <p className="text-[10.5px] text-slate-500 truncate">{d.note}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className={`text-[12.5px] font-mono font-bold ${textTone[d.tone]}`}>{d.count}</p>
                        <p className="text-[10px] font-mono text-slate-500">{d.oldest}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-[10px] text-slate-500 mt-2.5 leading-relaxed">
                  Employment consequences of Professional Standards findings. Case detail stays in the IA file; this view carries
                  only the clocks HR owns.
                </p>
              </div>

              {/* Retention exposure */}
              <div className="mt-7">
                <SectionLabel right={<span className="text-[10px] text-amber-400/90">94 retirement-eligible</span>}>
                  Retention exposure
                </SectionLabel>
                <div className="divide-y divide-slate-800/50">
                  {retention.map((r) => (
                    <div key={r.measure} className="flex items-center gap-3 py-3">
                      <div className="flex-1 min-w-0">
                        <p className="text-[12.5px] text-slate-100 truncate">{r.measure}</p>
                        <p className="text-[10.5px] text-slate-500 truncate">{r.note}</p>
                      </div>
                      <span className={`text-[13px] font-mono font-bold flex-shrink-0 ${textTone[r.tone]}`}>{r.value}</span>
                    </div>
                  ))}
                </div>
                <p className="text-[10px] text-slate-500 mt-2.5 leading-relaxed">
                  Retirement eligibility is a modeled projection from service date and plan tier, not a declared intent.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

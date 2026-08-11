import React, { useState } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';

// ── Measures against published standards ───────────────────────
// `meets` is a predicate on the measured value, not a stored verdict — the
// footnote promises status derives from the measurement, so it does.

const BELOW_BAND = 5; // points inside the standard before a miss reads as deficient

const measures = [
  { measure: 'Priority-1 response time',        authority: 'Agency standard · 8:00 dispatch to arrival', group: 'Field',
    standard: '≤ 8:00',  actual: '8:14',    gap: -2.9,  trend: -3   },
  { measure: 'Calls holding over standard',     authority: 'Agency standard · P1 10m, P2 30m',           group: 'Field',
    standard: '≤ 2%',    actual: '4.1%',    gap: -105,  trend: -1.4 },
  { measure: 'Body-worn camera activation',     authority: 'Policy 4.8 · CALEA 41.3.8',                  group: 'Field',
    standard: '≥ 98%',   actual: '97.2%',   gap: -0.8,  trend: 0.6  },
  { measure: 'Use of force per 1,000 arrests',  authority: 'CALEA 4.2 · reported to GBI',                group: 'Field',
    standard: '≤ 18.0',  actual: '14.2',    gap: 21.1,  trend: -1.8 },
  { measure: 'Welfare check interval compliance', authority: 'ACA 4-ALDF-2A-25 · 30-minute standard',    group: 'Detention',
    standard: '≥ 99%',   actual: '96.8%',   gap: -2.2,  trend: -1.1 },
  { measure: 'Intake medical screening within 4h', authority: 'ACA 4-ALDF-4C-01',                        group: 'Detention',
    standard: '≥ 98%',   actual: '94.1%',   gap: -4.0,  trend: -2.3 },
  { measure: 'Classification review within 72h', authority: 'ACA 4-ALDF-2A-30',                          group: 'Detention',
    standard: '≥ 95%',   actual: '89.4%',   gap: -5.9,  trend: -4.1 },
  { measure: 'PREA reporting and response',     authority: '28 CFR 115 · PREA standard',                 group: 'Detention',
    standard: '100%',    actual: '100%',    gap: 0,     trend: null },
  { measure: 'Case clearance rate',             authority: 'UCR-comparable · agency target',             group: 'Investigations',
    standard: '≥ 35%',   actual: '38%',     gap: 8.6,   trend: 4    },
  { measure: 'Case assignment within 5 days',   authority: 'Policy 6.1 · supervisory standard',          group: 'Investigations',
    standard: '≥ 95%',   actual: '91.2%',   gap: -4.0,  trend: -2.8 },
  { measure: 'Victim contact within 48h',       authority: "Marsy's Law · agency policy",                group: 'Investigations',
    standard: '≥ 95%',   actual: '96%',     gap: 1.1,   trend: 1    },
  { measure: 'Complaint investigation within 60 days', authority: 'Policy 2.4 · CALEA 52.2.3',           group: 'Personnel',
    standard: '≥ 90%',   actual: '87.5%',   gap: -2.8,  trend: 3.2  },
  { measure: 'Annual POST training hours',      authority: 'Georgia POST · 20 hours annual',             group: 'Personnel',
    standard: '100%',    actual: '93.8%',   gap: -6.2,  trend: 5.1  },
  { measure: 'Open-records response time',      authority: 'O.C.G.A. 50-18-71 · 3 business days',        group: 'Personnel',
    standard: '≤ 3 days', actual: '4.2 days', gap: -40, trend: -1.1 },
];

// ── Accreditation bodies ───────────────────────────────────────

const bodies = [
  {
    body: 'ACA — Adult Local Detention', scope: 'Detention Center · reaccreditation', milestone: 'Audit Nov 3–6', urgent: true,
    compliant: 378, atRisk: 14, nonCompliant: 3, proof: 'Proof file 91% assembled',
    note: 'Three non-compliant standards are welfare-check interval, classification timeliness, and intake screening — all three trace to operating over rated capacity.',
  },
  {
    body: 'CALEA — Law Enforcement', scope: 'Agency-wide · year 2 of 4', milestone: 'Assessment Mar 2027',
    compliant: 461, atRisk: 9, nonCompliant: 1, proof: 'Proof file 74% assembled',
    note: 'One non-compliant standard is open-records response time, which is measured continuously and currently exceeds the statutory window.',
  },
  {
    body: 'PREA — 28 CFR 115', scope: 'Detention Center · triennial', milestone: 'Audit Aug 2027',
    compliant: 47, atRisk: 0, nonCompliant: 0, proof: 'Proof file current',
  },
  {
    body: 'Georgia POST — Agency Certification', scope: 'Sworn personnel · annual', milestone: 'Filing Dec 31',
    compliant: 22, atRisk: 2, nonCompliant: 0, proof: 'Training records 93.8% current',
    // Shortfall is templated from the POST course row so it cannot drift from
    // the bar and percentage printed beside it.
    note: null,
  },
];

// ── Right column ───────────────────────────────────────────────

const earlyIntervention = [
  { indicator: 'Use-of-force incidents', criterion: '3 or more in 12 months', count: 6, reviewed: 6 },
  { indicator: 'Citizen complaints',     criterion: '3 or more in 12 months', count: 4, reviewed: 4 },
  { indicator: 'Vehicle pursuits',       criterion: '2 or more in 6 months',  count: 3, reviewed: 2 },
  { indicator: 'Preventable collisions', criterion: '2 or more in 12 months', count: 1, reviewed: 1 },
  { indicator: 'Sick-leave pattern',     criterion: 'Policy 2.9 threshold',   count: 0, reviewed: 0 },
];

// Accreditation courses are marked at 95%; CIT carries an agency target of 60%.
const ACCREDITATION_FLOOR = 95;
// Denominators come from HR position control: 984 sworn of 1,183 filled. CJIS
// is scoped to authorized system users, PREA to staff with inmate contact —
// both subsets of filled strength, neither of it a different agency size.
const SWORN = 984;
const training = [
  { course: 'POST annual 20 hours',        note: 'state mandate',      current: 923,  total: SWORN, floor: ACCREDITATION_FLOOR },
  { course: 'Use of force / de-escalation', note: 'CALEA 4.3',         current: 963,  total: SWORN, floor: ACCREDITATION_FLOOR },
  { course: 'Firearms qualification',      note: 'biannual',           current: 977,  total: SWORN, floor: ACCREDITATION_FLOOR },
  { course: 'PREA refresher',              note: '28 CFR 115 · staff with inmate contact', current: 604, total: 641, floor: ACCREDITATION_FLOOR },
  { course: 'CJIS security awareness',     note: 'biennial · authorized users', current: 1127, total: 1142, floor: ACCREDITATION_FLOOR },
  { course: 'Crisis intervention (CIT)',   note: 'agency target 60%',  current: 481,  total: SWORN, floor: 60 },
];

const mandated = [
  { report: 'UCR / NIBRS submission',      authority: 'GBI · monthly',                  due: 'Aug 15', days: 6,   state: 'in progress' },
  { report: 'Use-of-force annual report',  authority: 'GBI · statutory',                due: 'Sep 1',  days: 23,  state: 'drafting'    },
  { report: 'Jail population report',      authority: "Georgia Sheriffs' Association",  due: 'Sep 30', days: 52,  state: 'automated'   },
  { report: 'PREA annual report',          authority: 'DOJ · 28 CFR 115.403',           due: 'Jan 31', days: 175, state: 'not started' },
  { report: 'Racial profiling data',       authority: 'State · annual',                 due: 'Feb 28', days: 203, state: 'automated'   },
];

const publicMeasures = [
  { measure: 'Use of force per 1,000 arrests', context: 'State median 16.4',              value: '14.2', tone: 'emerald' },
  { measure: 'Complaints sustained',           context: '11 of 42 dispositions',          value: '26%',  tone: 'slate'   },
  { measure: 'Open-records response',          context: 'Statutory standard 3 days',      value: '4.2d', tone: 'red'     },
  { measure: 'Priority-1 response time',       context: 'Agency standard 8:00',           value: '8:14', tone: 'amber'   },
  { measure: 'Case clearance rate',            context: 'Target 35%',                     value: '38%',  tone: 'emerald' },
  { measure: 'In-custody deaths',              context: 'Reported to DOJ within 30 days', value: '0',    tone: 'emerald' },
];

const intelligence = [
  {
    title: 'Three ACA findings share one cause', tone: 'red',
    body: 'Welfare-check intervals, classification timeliness, and intake screening are all non-compliant, and all three degrade only in units operating over rated capacity.',
    action: 'Present capacity as the root cause in the audit response rather than three separate corrective plans.',
    sources: 'ACA standards file · JMS housing · welfare-check log · Custody Operations',
  },
  {
    title: 'Open records is a staffing measure', tone: 'amber',
    body: 'Response time is 4.2 days against a 3-day statutory standard, with five requests and one appeal tied to a single incident against one records position.',
    action: 'Temporary records support through the OIS review period; the measure recovers without a policy change.',
    sources: 'Open-records queue · O.C.G.A. 50-18-71 · position control',
  },
  {
    title: 'Use of force is a defensible number', tone: 'emerald',
    body: 'At 14.2 per 1,000 arrests the agency is below its own ceiling and below the state median of 16.4, with the rate declining.',
    action: 'Publish with the quarterly transparency release; it is the strongest measure the agency has.',
    sources: 'GBI UOF reporting · arrest records · state comparison set',
  },
];

// ── Helpers ────────────────────────────────────────────────────

/** Status is a function of the gap to standard, never a stored assessment. */
const statusOf = (gap) => (gap >= 0 ? 'MEETS' : gap > -BELOW_BAND ? 'BELOW' : 'DEFICIENT');

const statusTone = {
  MEETS:     { text: 'text-emerald-400', value: 'text-emerald-400', bar: 'bg-slate-600' },
  BELOW:     { text: 'text-amber-400',   value: 'text-amber-400',   bar: 'bg-amber-400' },
  DEFICIENT: { text: 'text-red-400',     value: 'text-red-400',     bar: 'bg-red-500'   },
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

function Meter({ pct, tone = 'bg-slate-600', tick }) {
  return (
    <span className="relative block h-1 bg-zinc-800/70 rounded-full">
      <span className={`block h-full rounded-full ${tone}`} style={{ width: `${Math.min(pct, 100)}%` }} />
      {tick !== undefined && (
        <span className="absolute top-[-2px] bottom-[-2px] w-px bg-slate-500" style={{ left: `${tick}%` }} />
      )}
    </span>
  );
}

export default function PerformanceCompliance() {
  const [group, setGroup] = useState('All');

  const withStatus = measures.map((m) => ({ ...m, status: statusOf(m.gap) }));
  const meeting = withStatus.filter((m) => m.status === 'MEETS').length;
  const below = withStatus.filter((m) => m.status === 'BELOW').length;
  const deficient = withStatus.filter((m) => m.status === 'DEFICIENT').length;

  const groups = ['All', 'Field', 'Detention', 'Investigations', 'Personnel'];
  const countIn = (g) => (g === 'All' ? withStatus.length : withStatus.filter((m) => m.group === g).length);
  const shown = group === 'All' ? withStatus : withStatus.filter((m) => m.group === group);

  const totals = bodies.reduce(
    (a, b) => ({
      compliant: a.compliant + b.compliant,
      atRisk: a.atRisk + b.atRisk,
      nonCompliant: a.nonCompliant + b.nonCompliant,
    }),
    { compliant: 0, atRisk: 0, nonCompliant: 0 },
  );
  const allStandards = totals.compliant + totals.atRisk + totals.nonCompliant;
  const compliancePct = (totals.compliant / allStandards) * 100;
  const bodiesWithFindings = bodies.filter((b) => b.nonCompliant > 0).length;

  const aca = bodies[0];
  const atThreshold = earlyIntervention.reduce((a, e) => a + e.count, 0);
  const dueSoon = mandated.filter((r) => r.days <= 30).length;

  const post = training[0];
  const sworn = post.total;
  const trainingCurrency = (post.current / post.total) * 100;
  const shortOfMandate = post.total - post.current;
  const spell = { 61: 'Sixty-one', 62: 'Sixty-two', 63: 'Sixty-three', 64: 'Sixty-four', 65: 'Sixty-five' };
  const bodyRows = bodies.map((b) => b.note ? b : ({
    ...b,
    note: `${spell[shortOfMandate] ?? shortOfMandate} personnel short of the twenty-hour annual mandate `
      + 'with five months remaining in the training year.',
  }));

  return (
    <DashboardLayout>
      <div className="min-h-full bg-[#0A0A0B]">

        {/* ── Identity strip ───────────────────────────────── */}
        <div className="px-6 py-3 border-b border-slate-800/70 flex items-center gap-3 flex-wrap">
          <h1 className="text-[13px] font-bold text-slate-100">Performance &amp; Compliance</h1>
          <span className="text-slate-700">|</span>
          <span className="text-[11.5px] text-slate-400">Sheriff Thompson · Administrator</span>
          <div className="ml-auto flex items-center gap-4 flex-wrap">
            <span className="text-[11.5px] text-slate-400">Sun, Aug 9, 2026 · 06:12 EST</span>
            <span className="flex items-center gap-2 text-[11.5px] text-slate-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />Reporting period closed Jul 31
            </span>
          </div>
        </div>

        <div className="px-6 py-6">
          <div className="max-w-[1500px] mx-auto">

            {/* ── Scope row ────────────────────────────────── */}
            <div className="flex items-center gap-4 flex-wrap pb-6">
              <span className="text-[11.5px] text-slate-500">
                Q3 FY26 · measured against published standards · CALEA · ACA · PREA · Georgia POST · Open Records Act
              </span>
              <div className="ml-auto flex items-center gap-4 flex-wrap">
                <span className="text-[11.5px] text-slate-400">ACA reaccreditation audit Nov 3–6 · 86 days</span>
                <button
                  onClick={() => window.print()}
                  className="px-3.5 py-2 border border-slate-700/60 rounded-lg text-[11.5px] font-semibold text-slate-200 hover:bg-zinc-900/60 transition-colors"
                >
                  Export scorecard — PDF
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

              {/* ══ Left column ═══════════════════════════════ */}
              <div>
                {/* Headline */}
                <div className="border border-slate-800/80 rounded-xl grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-slate-800/60">
                  <div className="px-5 py-4 border-b border-slate-800/60">
                    <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500 mb-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500" />Measures meeting standard
                    </p>
                    <p className="leading-none">
                      <span className="text-[24px] font-bold text-slate-100">{meeting} of {withStatus.length}</span>
                      <span className="text-[11.5px] text-slate-400 ml-2">{Math.round((meeting / withStatus.length) * 100)}%</span>
                    </p>
                    <p className="text-[10.5px] text-red-400/90 mt-2">{below} below standard · {deficient} deficient</p>
                  </div>
                  <div className="px-5 py-4 border-b border-slate-800/60">
                    <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500 mb-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />Accreditation compliance
                    </p>
                    <p className="leading-none">
                      <span className="text-[24px] font-bold text-slate-100">{compliancePct.toFixed(1)}%</span>
                      <span className="text-[11.5px] text-slate-400 ml-2">{allStandards} standards</span>
                    </p>
                    <p className="text-[10.5px] text-amber-400/90 mt-2">{totals.nonCompliant} non-compliant · {totals.atRisk} at risk</p>
                  </div>
                  <div className="px-5 py-4">
                    <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500 mb-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500" />ACA audit
                    </p>
                    <p className="leading-none">
                      <span className="text-[24px] font-bold text-slate-100">86</span>
                      <span className="text-[11.5px] text-slate-400 ml-2">days out</span>
                    </p>
                    <p className="text-[10.5px] text-red-400/90 mt-2">proof file 91% · {aca.nonCompliant} standards non-compliant</p>
                  </div>
                  <div className="px-5 py-4">
                    <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500 mb-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />Training currency
                    </p>
                    <p className="leading-none">
                      <span className="text-[24px] font-bold text-slate-100">{trainingCurrency.toFixed(1)}%</span>
                      <span className="text-[11.5px] text-slate-400 ml-2">of {sworn.toLocaleString()} sworn</span>
                    </p>
                    <p className="text-[10.5px] text-amber-400/90 mt-2">{shortOfMandate} short of POST annual mandate</p>
                  </div>
                </div>

                {/* Performance against standard */}
                <div className="mt-7">
                  <SectionLabel
                    right={
                      <span className="flex items-center gap-4">
                        {groups.map((g) => (
                          <button
                            key={g}
                            onClick={() => setGroup(g)}
                            className={`text-[11px] transition-colors ${
                              group === g ? 'text-slate-100 font-semibold underline underline-offset-4' : 'text-slate-500 hover:text-slate-300'
                            }`}
                          >
                            {g} <span className="font-mono text-slate-500">{countIn(g)}</span>
                          </button>
                        ))}
                      </span>
                    }
                  >
                    Performance against standard
                  </SectionLabel>

                  <div className="flex items-end gap-3 pb-2 border-b border-slate-800/70 pl-3 text-[9px] font-bold uppercase tracking-[0.12em] text-slate-500">
                    <span className="flex-1 min-w-0">Measure</span>
                    <span className="w-16 text-right flex-shrink-0">Standard</span>
                    <span className="w-16 text-right flex-shrink-0">Actual</span>
                    <span className="w-[104px] flex-shrink-0">90-day trend</span>
                    <span className="w-20 text-right flex-shrink-0">Status</span>
                  </div>
                  <div className="divide-y divide-slate-800/50">
                    {shown.map((m) => {
                      const tone = statusTone[m.status];
                      // Bar length reads as distance from standard: full when met,
                      // shorter the further the measure has fallen.
                      const fill = m.status === 'MEETS' ? 100 : Math.max(20, 100 + Math.max(m.gap, -60));
                      return (
                        <div key={m.measure} className={`flex items-center gap-3 py-3 pl-3 border-l-2 ${
                          m.status === 'DEFICIENT' ? 'border-red-500/70' : m.status === 'BELOW' ? 'border-amber-500/60' : 'border-transparent'
                        }`}>
                          <div className="flex-1 min-w-0">
                            <p className="text-[12px] font-semibold text-slate-100 truncate">{m.measure}</p>
                            <p className="text-[10px] text-slate-500 truncate">{m.authority}</p>
                          </div>
                          <span className="w-16 text-right text-[11px] font-mono text-slate-400 flex-shrink-0">{m.standard}</span>
                          <span className={`w-16 text-right text-[12px] font-mono font-bold flex-shrink-0 ${tone.value}`}>{m.actual}</span>
                          <span className="w-[104px] flex items-center gap-2 flex-shrink-0">
                            <span className="flex-1"><Meter pct={fill} tone={tone.bar} /></span>
                            <span className={`w-8 text-right text-[10.5px] font-mono ${
                              m.trend === null ? 'text-slate-600' : m.trend > 0 ? 'text-emerald-400' : 'text-red-400'
                            }`}>
                              {m.trend === null ? '—' : `${m.trend > 0 ? '+' : ''}${m.trend}`}
                            </span>
                          </span>
                          <span className={`w-20 text-right text-[10.5px] font-bold tracking-wider flex-shrink-0 ${tone.text}`}>{m.status}</span>
                        </div>
                      );
                    })}
                  </div>
                  <p className="text-[10px] text-slate-500 mt-3 leading-relaxed">
                    Trend bar shows performance against standard over the last 90 days; the number is change versus the prior quarter.
                    Status derives from the measured value, not from assessment.
                  </p>
                </div>

                {/* Accreditation readiness */}
                <div className="mt-7">
                  <SectionLabel right={
                    <span className="text-[10px] text-slate-500">
                      {compliancePct.toFixed(1)}% · {totals.nonCompliant} non-compliant across {bodies.length} bodies
                    </span>
                  }>
                    Accreditation readiness
                  </SectionLabel>
                  <div className="space-y-5">
                    {bodyRows.map((b) => {
                      const total = b.compliant + b.atRisk + b.nonCompliant;
                      const accent = b.nonCompliant > 0 ? 'border-red-500/70' : b.atRisk > 0 ? 'border-amber-500/60' : 'border-transparent';
                      return (
                        <div key={b.body} className={`border-l-2 pl-4 ${accent}`}>
                          <div className="flex items-baseline gap-2.5 flex-wrap">
                            <p className="text-[13px] font-bold text-slate-100">{b.body}</p>
                            <span className="text-[10.5px] text-slate-500">{b.scope}</span>
                            <span className={`ml-auto text-[11px] ${b.urgent ? 'text-amber-400' : 'text-slate-400'}`}>{b.milestone}</span>
                          </div>
                          <span className="flex h-1.5 rounded-full overflow-hidden mt-2.5 bg-zinc-800/70">
                            <span className="bg-emerald-500" style={{ width: `${(b.compliant / total) * 100}%` }} />
                            <span className="bg-amber-400" style={{ width: `${(b.atRisk / total) * 100}%` }} />
                            <span className="bg-red-500" style={{ width: `${(b.nonCompliant / total) * 100}%` }} />
                          </span>
                          <div className="flex items-baseline gap-3 mt-2 flex-wrap">
                            <span className="text-[11px] text-slate-500">
                              <span className="font-mono font-bold text-emerald-400">{b.compliant}</span> compliant
                            </span>
                            <span className="text-[11px] text-slate-500">
                              <span className="font-mono font-bold text-amber-400">{b.atRisk}</span> at risk
                            </span>
                            <span className="text-[11px] text-slate-500">
                              <span className={`font-mono font-bold ${b.nonCompliant > 0 ? 'text-red-400' : 'text-slate-400'}`}>{b.nonCompliant}</span> non-compliant
                            </span>
                            <span className="ml-auto text-[10.5px] text-slate-500">{b.proof}</span>
                          </div>
                          {b.note && <p className="text-[11px] text-amber-400/90 leading-relaxed mt-2">{b.note}</p>}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Performance intelligence */}
                <div className="mt-7">
                  <SectionLabel right={<span className="text-[10px] text-slate-500">AI-assisted synthesis · 6 sources · confidence 86% · 11m ago</span>}>
                    Performance intelligence
                  </SectionLabel>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {intelligence.map((c) => (
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
                {/* Early intervention */}
                <SectionLabel right={<span className="text-[10px] text-amber-400/90">{atThreshold} at threshold</span>}>
                  Early intervention
                </SectionLabel>
                <div className="divide-y divide-slate-800/50">
                  {earlyIntervention.map((e) => {
                    const tone = e.count === 0 ? 'emerald' : e.reviewed < e.count ? 'red' : e.count > 2 ? 'amber' : 'slate';
                    return (
                      <div key={e.indicator} className="flex items-start gap-2.5 py-3">
                        <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5 ${dotTone[tone]}`} />
                        <div className="flex-1 min-w-0">
                          <p className="text-[12.5px] font-semibold text-slate-100 truncate">{e.indicator}</p>
                          <p className="text-[10.5px] text-slate-500 truncate">{e.criterion}</p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className={`text-[12.5px] font-mono font-bold ${textTone[tone]}`}>{e.count}</p>
                          <p className="text-[10px] text-slate-500">{e.count === 0 ? '—' : `${e.reviewed} reviewed`}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <p className="text-[10px] text-slate-500 mt-2.5 leading-relaxed">
                  Counts only at command level. Individual records require Professional Standards access and are logged on view.
                </p>

                {/* Training currency */}
                <div className="mt-7">
                  <SectionLabel right={<span className="text-[10px] text-slate-500">{sworn.toLocaleString()} sworn · {trainingCurrency.toFixed(1)}% current</span>}>
                    Training currency
                  </SectionLabel>
                  <div className="divide-y divide-slate-800/50">
                    {training.map((t) => {
                      const pct = (t.current / t.total) * 100;
                      const short = t.floor - pct;
                      const tone = short > 10 ? 'red' : short > 0 ? 'amber' : 'slate';
                      return (
                        <div key={t.course} className="py-2.5">
                          <div className="flex items-baseline justify-between gap-3 mb-1.5">
                            <span className="text-[12px] text-slate-200 min-w-0 truncate">
                              {t.course}<span className="text-[10px] text-slate-500 ml-2">{t.note}</span>
                            </span>
                            <span className={`text-[11px] font-mono flex-shrink-0 ${textTone[tone]}`}>
                              {t.current}/{t.total} · {pct.toFixed(1)}%
                            </span>
                          </div>
                          <Meter pct={pct} tone={dotTone[tone]} tick={t.floor} />
                        </div>
                      );
                    })}
                  </div>
                  <p className="text-[10px] text-slate-500 mt-2.5">
                    <span className="text-slate-600">|</span> each course is marked against its own threshold — {ACCREDITATION_FLOOR}% accreditation, 60% CIT agency target
                  </p>
                </div>

                {/* Mandated reporting */}
                <div className="mt-7">
                  <SectionLabel right={<span className="text-[10px] text-amber-400/90">{dueSoon} due within 30 days</span>}>
                    Mandated reporting
                  </SectionLabel>
                  <div className="divide-y divide-slate-800/50">
                    {mandated.map((r) => (
                      <div key={r.report} className="flex items-start gap-2.5 py-3">
                        <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5 ${
                          r.days <= 30 ? 'bg-amber-400' : r.state === 'not started' ? 'bg-slate-600' : 'bg-emerald-400'
                        }`} />
                        <div className="flex-1 min-w-0">
                          <p className="text-[12.5px] font-semibold text-slate-100 truncate">{r.report}</p>
                          <p className="text-[10.5px] text-slate-500 truncate">{r.authority}</p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className={`text-[11.5px] ${r.days <= 30 ? 'text-amber-400' : 'text-slate-300'}`}>{r.due}</p>
                          <p className="text-[10px] text-slate-500">{r.state}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Public accountability */}
                <div className="mt-7">
                  <SectionLabel right={<span className="text-[10px] text-slate-500">published quarterly</span>}>
                    Public accountability
                  </SectionLabel>
                  <div className="divide-y divide-slate-800/50">
                    {publicMeasures.map((m) => (
                      <div key={m.measure} className="flex items-center gap-3 py-3">
                        <div className="flex-1 min-w-0">
                          <p className="text-[12.5px] text-slate-100 truncate">{m.measure}</p>
                          <p className="text-[10.5px] text-slate-500 truncate">{m.context}</p>
                        </div>
                        <span className={`text-[13px] font-mono font-bold flex-shrink-0 ${textTone[m.tone]}`}>{m.value}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-[10px] text-slate-500 mt-2.5 leading-relaxed">
                    Figures publish to the county transparency portal at quarter close. Open-records response time is measured
                    against the three-business-day statutory standard.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

import React from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';

// ── Fiscal position ────────────────────────────────────────────
// Everything on this page is denominated in dollars and derived from the
// tables below it, so a headline can never disagree with its own detail.

const fiscal = {
  yearElapsed: 60.5,
  monthsRemaining: 4,
  otBudget: 7.15,      // $M annual overtime allocation
  otExhaustDays: 9,
  vacancySavings: 4.1, // $M
  vacantPositions: 112,
  reserves: 1.34,      // $M across 3 accounts
  reserveAccounts: 3,
  facilitiesReserve: 400, // $K
  capitalReleased: 42,
  grantsDrawn: 71,
};

// ── Decisions awaiting the sheriff ─────────────────────────────

const decisions = [
  {
    title: 'Emergency HVAC replacement — Tower D', level: 'CRITICAL', pending: '2d 4h pending',
    detail: 'Facilities · intake housing · vendor quote expires Aug 14',
    amount: 284, unit: 'K', due: 'due in 2d', dueTone: 'amber',
  },
  {
    title: 'Detention overtime authorization — Q3 extension', level: 'CRITICAL', pending: '1d 6h pending',
    detail: 'Detention Services · 84 vacancies · mandatory post coverage',
    amount: 1240, unit: 'K', due: 'due today', dueTone: 'red',
  },
  {
    title: 'Inmate medical services — contract amendment', level: 'HIGH', pending: '4d pending',
    detail: 'Detention Services · pharmacy and off-site utilization above contract cap',
    amount: 680, unit: 'K', due: 'due in 6d', dueTone: 'slate',
  },
  {
    title: 'Digital forensics examiner — position request', level: 'HIGH', pending: '6d pending',
    detail: 'Criminal Investigations · second examiner · FY27 position control',
    amount: 112, unit: 'K', due: 'due in 12d', dueTone: 'slate',
  },
  {
    title: 'Fleet replacement — 18 patrol vehicles', level: null, pending: '9d pending',
    detail: 'Fleet · units over 120,000 miles · state contract pricing',
    amount: 1080, unit: 'K', due: 'due in 21d', dueTone: 'slate',
  },
];

// ── Budget by division ─────────────────────────────────────────
// Variance is spend-rate minus elapsed-rate, computed rather than stated, so
// the pace column and the variance column can never tell different stories.

const divisions = [
  { division: 'Detention Services',        note: '84 vacancies · mandatory post coverage', budget: 71.4, spent: 45.9 },
  { division: 'Field Operations',          note: 'On pace · 6 vacancies',                  budget: 28.6, spent: 17.1 },
  { division: 'Criminal Investigations',   note: 'Lab and forensics costs rising',         budget: 14.2, spent: 8.4  },
  { division: 'Court Services',            note: 'Transport volume above projection',      budget: 11.8, spent: 7.4  },
  { division: 'Administration',            note: 'On pace',                                budget: 8.4,  spent: 4.9  },
  { division: 'Training & Prof. Standards', note: 'Academy cohort front-loaded', noteTone: 'amber', budget: 4.2, spent: 2.9 },
  { division: 'Fleet & Facilities',        note: 'Emergency repairs drawing reserve', noteTone: 'amber', budget: 4.2, spent: 3.1 },
];

// ── Overtime drivers ───────────────────────────────────────────

const otDrivers = [
  { driver: 'Mandatory detention post coverage', note: '84 vacancies · every shift below minimum',     amount: 3.84, lever: 'Hiring',        leverTone: 'amber' },
  { driver: 'Court transport and security',      note: 'Superior Court calendar · pretrial population', amount: 1.12, lever: 'Calendar relief', leverTone: 'amber' },
  { driver: 'Shift relief and callouts',         note: 'Sick and FMLA coverage · within historic norm', amount: 0.684, lever: 'None',          leverTone: 'slate' },
  { driver: 'Special events and details',        note: 'Reimbursed at 61% · Night Out, school details', amount: 0.412, lever: 'Reimbursement', leverTone: 'slate' },
  { driver: 'Investigative callout',             note: 'Homicide and major-case response · corridor series', amount: 0.238, lever: 'None',     leverTone: 'slate' },
];

// ── Right column ───────────────────────────────────────────────

const capital = [
  { project: 'Jail housing unit renovation', note: 'Tower B · phase 2 of 3',       amount: 6.8,  status: 'On schedule',        tone: 'emerald' },
  { project: 'Radio system replacement',     note: 'County-wide · P25 migration',  amount: 4.2,  status: 'Delayed 8 weeks',    tone: 'amber'   },
  { project: 'Fleet replacement — 18 units', note: 'Awaiting release',             amount: 1.08, status: 'Pending approval',   tone: 'amber'   },
  { project: 'Body camera refresh',          note: 'Year 3 of 5 · contract',       amount: 1.4,  status: 'On schedule',        tone: 'emerald' },
  { project: 'Training facility range',      note: 'Design complete',              amount: 1.1,  status: 'Awaiting Commission', tone: 'amber'  },
];

const grants = [
  { grant: 'Byrne JAG — equipment',        note: 'Performance report due Sep 30', noteTone: 'amber', amount: 1.24, drawn: 82, tone: 'amber'   },
  { grant: 'COPS hiring — 8 positions',    note: 'Retention clause · 3-year obligation',             amount: 1.10, drawn: 64, tone: 'emerald' },
  { grant: 'SCAAP reimbursement',          note: 'Award cycle closed · FY27 pending',                amount: 0.78, drawn: 100, tone: 'emerald' },
  { grant: 'Mental health diversion',      note: 'Underspent — clawback risk at year end', noteTone: 'red', amount: 0.72, drawn: 38, tone: 'red' },
];

// 85% is the readiness floor below which a category cannot cover its posts.
const READINESS_FLOOR = 85;
const fleet = [
  { category: 'Patrol vehicles',        note: '18 over replacement threshold',          ready: 198, total: 224 },
  { category: 'Detention transport',    note: '2 in extended repair',                   ready: 31,  total: 38  },
  { category: 'Investigative / unmarked', note: '',                                     ready: 52,  total: 56  },
  { category: 'Specialty and support',  note: 'SWAT, K9, marine, mobile command',       ready: 78,  total: 94  },
];

const renewals = [
  { contract: 'Inmate medical services',        note: 'Detention · full clinical coverage', value: '$5.96M/yr', date: 'Sep 30', days: 52  },
  { contract: 'Commissary and trust accounting', note: 'Detention · revenue share',         value: '$0 net',    date: 'Oct 15', days: 67  },
  { contract: 'RMS / CAD maintenance',          note: 'Agency-wide · system of record',     value: '$1.42M/yr', date: 'Nov 1',  days: 84  },
  { contract: 'Food services',                  note: 'Detention · 2,616 rated beds',       value: '$3.10M/yr', date: 'Nov 30', days: 113 },
];

const intelligence = [
  {
    title: 'Overtime and vacancies are one problem', tone: 'red',
    body: 'Detention OT is 88% consumed while 84 vacancies generate $1.9M in salary savings. The agency is paying a premium to cover positions it is funded to fill.',
    action: 'Transfer vacancy savings to OT and accelerate the deferred academy cohort.',
    sources: 'Financial system · position control · Workforce Readiness',
  },
  {
    title: 'Court calendar drives two budgets', tone: 'amber',
    body: 'Transport OT is 14% above pace for the same reason 347 pretrial detainees are held past 90 days — Superior Court calendar throughput.',
    action: 'Joint calendar-relief petition; the capacity case and the transport-cost case are the same argument.',
    sources: 'Court Services · JMS pretrial population · DA case management',
  },
  {
    title: 'Reserve is one emergency deep', tone: 'amber',
    body: 'Approving the Tower D HVAC leaves $116K in facilities reserve against four months and a pending USMS inspection.',
    action: 'Approve the repair, then request a mid-year reserve replenishment.',
    sources: 'Facilities reserve ledger · maintenance work orders · USMS schedule',
  },
];

// ── Helpers ────────────────────────────────────────────────────

// Millions carry two decimals under $10M and one above, with trailing zeros
// dropped — $1.08M keeps its cents, $4.10M reads as $4.1M. Under $1M reads in
// thousands, since "$0.68M" is not how anyone says it.
const money = (m) => {
  if (m < 1) return `$${Math.round(m * 1000)}K`;
  const s = m.toFixed(m < 10 ? 2 : 1).replace(/0+$/, '').replace(/\.$/, '');
  return `$${s}M`;
};
const dollars = (amount, unit) => (unit === 'K' && amount >= 1000 ? `$${(amount / 1000).toFixed(2)}M` : `$${amount}K`);

// Variance: how far ahead of (or behind) the calendar a budget is running.
const varianceTone = (v) => (v >= 3 ? 'text-red-400' : v >= 1 ? 'text-amber-400' : 'text-slate-400');
const paceTone = (v) => (v >= 5 ? 'bg-red-500' : v >= 1 ? 'bg-amber-400' : 'bg-slate-600');

const dueTone = { red: 'text-red-400', amber: 'text-amber-400', slate: 'text-slate-500' };
const statusTone = { emerald: 'text-emerald-400', amber: 'text-amber-400', red: 'text-red-400' };
const dotTone = { emerald: 'bg-emerald-400', amber: 'bg-amber-400', red: 'bg-red-500', slate: 'bg-slate-600' };

function SectionLabel({ children, right }) {
  return (
    <div className="flex items-baseline justify-between gap-3 mb-3">
      <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500">{children}</p>
      {right}
    </div>
  );
}

/** Horizontal meter with an optional threshold tick. */
function Meter({ pct, tone = 'bg-slate-600', tick }) {
  return (
    <span className="relative block h-1 bg-zinc-800/70 rounded-full overflow-visible">
      <span className={`block h-full rounded-full ${tone}`} style={{ width: `${Math.min(pct, 100)}%` }} />
      {tick !== undefined && (
        <span className="absolute top-[-2px] bottom-[-2px] w-px bg-slate-500" style={{ left: `${tick}%` }} />
      )}
    </span>
  );
}

export default function BudgetResources() {
  const navigate = useNavigate();

  const totalBudget = divisions.reduce((a, d) => a + d.budget, 0);
  const totalSpent = divisions.reduce((a, d) => a + d.spent, 0);
  const consumed = (totalSpent / totalBudget) * 100;
  const agencyVariance = consumed - fiscal.yearElapsed;

  const otSpent = otDrivers.reduce((a, d) => a + d.amount, 0);
  const otPct = (otSpent / fiscal.otBudget) * 100;
  const otMax = Math.max(...otDrivers.map((d) => d.amount));
  const mandatoryShare = (otDrivers[0].amount / otSpent) * 100;

  const atStake = decisions.reduce((a, d) => a + d.amount, 0) / 1000;
  const capitalCommitted = capital.reduce((a, c) => a + c.amount, 0);
  const grantsActive = grants.reduce((a, g) => a + g.amount, 0);
  const fleetTotal = fleet.reduce((a, f) => a + f.total, 0);
  const fleetReady = fleet.reduce((a, f) => a + f.ready, 0);
  const renewalsSoon = renewals.filter((r) => r.days <= 90).length;

  const position = [
    { label: 'Fiscal year elapsed',      pct: fiscal.yearElapsed,   tone: 'bg-slate-600' },
    { label: 'Operating budget consumed', pct: consumed,            tone: 'bg-amber-400', text: 'text-amber-400' },
    { label: 'Overtime allocation',      pct: otPct,                tone: 'bg-red-500',   text: 'text-red-400' },
    { label: 'Capital released',         pct: fiscal.capitalReleased, tone: 'bg-slate-600' },
    { label: 'Grant funds drawn',        pct: fiscal.grantsDrawn,   tone: 'bg-slate-600' },
  ];

  return (
    <DashboardLayout>
      <div className="min-h-full bg-[#0A0A0B] px-6 py-8">
        <div className="max-w-[1500px] mx-auto">

          {/* ── Header ─────────────────────────────────────── */}
          <div className="flex flex-col lg:flex-row lg:items-center gap-3 lg:gap-4 pb-5">
            <div className="flex items-baseline gap-3 flex-wrap">
              <h1 className="text-[19px] font-bold text-slate-100">Budget &amp; Operations</h1>
              <span className="text-[11px] text-slate-500">
                FY26 · as of 06:12 · financial system · position control · grants · fleet
              </span>
            </div>
            <div className="flex items-center gap-2.5 lg:ml-auto flex-wrap">
              <span className="text-[11px] text-slate-500">
                Agency budget <span className="font-mono text-slate-300">{money(totalBudget)}</span> · {fiscal.monthsRemaining} months remaining
              </span>
              <button
                onClick={() => window.print()}
                className="px-3.5 py-2 border border-slate-700/60 rounded-lg text-[11.5px] font-semibold text-slate-200 hover:bg-zinc-900/60 transition-colors"
              >
                Fiscal briefing — PDF
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

            {/* ══ Left column ═══════════════════════════════ */}
            <div>
              {/* Headline position */}
              <div className="border border-slate-800/80 rounded-xl grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-slate-800/60">
                <div className="px-5 py-4 border-b border-slate-800/60">
                  <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500 mb-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />Budget consumed
                  </p>
                  <p className="leading-none">
                    <span className="text-[24px] font-bold text-slate-100">{consumed.toFixed(1)}%</span>
                    <span className="text-[11.5px] text-slate-400 ml-2">of {money(totalBudget)}</span>
                  </p>
                  <p className="text-[10.5px] text-amber-400/90 mt-2">
                    {fiscal.yearElapsed}% of year elapsed · +{agencyVariance.toFixed(1)} pts above pace
                  </p>
                </div>
                <div className="px-5 py-4 border-b border-slate-800/60">
                  <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500 mb-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500" />Overtime
                  </p>
                  <p className="leading-none">
                    <span className="text-[24px] font-bold text-slate-100">{Math.round(otPct)}%</span>
                    <span className="text-[11.5px] text-slate-400 ml-2">{money(otSpent)} of {money(fiscal.otBudget)}</span>
                  </p>
                  <p className="text-[10.5px] text-red-400/90 mt-2">exhausts in {fiscal.otExhaustDays} days at current burn</p>
                </div>
                <div className="px-5 py-4">
                  <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500 mb-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />Vacancy savings
                  </p>
                  <p className="leading-none">
                    <span className="text-[24px] font-bold text-slate-100">{money(fiscal.vacancySavings)}</span>
                    <span className="text-[11.5px] text-slate-400 ml-2">{fiscal.vacantPositions} positions</span>
                  </p>
                  <p className="text-[10.5px] text-amber-400/90 mt-2">offsets OT but requires transfer action</p>
                </div>
                <div className="px-5 py-4">
                  <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500 mb-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />Reserves
                  </p>
                  <p className="leading-none">
                    <span className="text-[24px] font-bold text-slate-100">{money(fiscal.reserves)}</span>
                    <span className="text-[11.5px] text-slate-400 ml-2">across {fiscal.reserveAccounts} accounts</span>
                  </p>
                  <p className="text-[10.5px] text-amber-400/90 mt-2">
                    facilities reserve ${fiscal.facilitiesReserve}K · one emergency deep
                  </p>
                </div>
              </div>

              {/* Fiscal decisions */}
              <div className="mt-7">
                <SectionLabel right={<span className="text-[10px] text-slate-500">{decisions.length} pending · ${atStake.toFixed(2)}M at stake</span>}>
                  Fiscal decisions — requires your action
                </SectionLabel>
                <div className="divide-y divide-slate-800/50">
                  {decisions.map((d) => (
                    <div key={d.title} className={`flex items-center gap-4 py-3.5 pl-3 border-l-2 ${
                      d.level === 'CRITICAL' ? 'border-red-500/70' : d.level === 'HIGH' ? 'border-amber-500/60' : 'border-transparent'
                    }`}>
                      <div className="flex-1 min-w-0">
                        <p className="flex items-center gap-2 flex-wrap">
                          <span className="text-[12.5px] font-semibold text-slate-100">{d.title}</span>
                          {d.level && (
                            <span className={`border rounded px-1.5 py-0.5 text-[9px] font-bold tracking-wider ${
                              d.level === 'CRITICAL' ? 'border-red-500/60 text-red-400' : 'border-amber-500/60 text-amber-400'
                            }`}>{d.level}</span>
                          )}
                          <span className="text-[10px] text-slate-500">{d.pending}</span>
                        </p>
                        <p className="text-[10.5px] text-slate-500 mt-0.5 truncate">{d.detail}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-[12px] font-mono font-bold text-slate-100">{dollars(d.amount, d.unit)}</p>
                        <p className={`text-[10px] font-mono ${dueTone[d.dueTone]}`}>{d.due}</p>
                      </div>
                      <button
                        onClick={() => navigate('/command/approvals')}
                        className="px-3 py-1.5 border border-slate-700/60 rounded text-[11px] font-semibold text-slate-200 hover:bg-zinc-900/60 transition-colors flex-shrink-0"
                      >
                        Review
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Budget by division */}
              <div className="mt-7">
                <SectionLabel right={<span className="text-[10px] text-slate-500">{fiscal.yearElapsed}% of fiscal year elapsed</span>}>
                  Budget by division
                </SectionLabel>
                <div className="flex items-end gap-3 pb-2 border-b border-slate-800/70 pl-3 text-[9px] font-bold uppercase tracking-[0.12em] text-slate-500">
                  <span className="flex-1 min-w-0">Division</span>
                  <span className="w-16 text-right flex-shrink-0">Budget</span>
                  <span className="w-16 text-right flex-shrink-0">Spent</span>
                  <span className="w-28 flex-shrink-0">Pace</span>
                  <span className="w-12 text-right flex-shrink-0">Var</span>
                </div>
                <div className="divide-y divide-slate-800/50">
                  {divisions.map((d) => {
                    const rate = (d.spent / d.budget) * 100;
                    const variance = rate - fiscal.yearElapsed;
                    return (
                      <div key={d.division} className={`flex items-center gap-3 py-3 pl-3 border-l-2 ${
                        variance >= 5 ? 'border-red-500/70' : variance >= 1 ? 'border-amber-500/60' : 'border-transparent'
                      }`}>
                        <div className="flex-1 min-w-0">
                          <p className="text-[12px] font-semibold text-slate-100 truncate">{d.division}</p>
                          <p className={`text-[10px] truncate ${d.noteTone === 'amber' ? 'text-amber-400/80' : 'text-slate-500'}`}>{d.note}</p>
                        </div>
                        <span className="w-16 text-right text-[11px] font-mono text-slate-300 flex-shrink-0">{money(d.budget)}</span>
                        <span className="w-16 text-right text-[11px] font-mono text-slate-100 flex-shrink-0">{money(d.spent)}</span>
                        <span className="w-28 flex-shrink-0">
                          <Meter pct={rate} tone={paceTone(variance)} tick={fiscal.yearElapsed} />
                        </span>
                        <span className={`w-12 text-right text-[11px] font-mono flex-shrink-0 ${varianceTone(variance)}`}>
                          {variance >= 0 ? '+' : ''}{variance.toFixed(1)}
                        </span>
                      </div>
                    );
                  })}
                </div>
                <div className="flex items-center gap-3 py-3 pl-3 border-t border-slate-800/70">
                  <span className="flex-1 min-w-0 text-[12px] font-bold text-slate-100">Agency total</span>
                  <span className="w-16 text-right text-[11px] font-mono font-bold text-slate-200 flex-shrink-0">{money(totalBudget)}</span>
                  <span className="w-16 text-right text-[12px] font-mono font-bold text-slate-100 flex-shrink-0">{money(totalSpent)}</span>
                  <span className="w-28 text-[10px] text-slate-500 flex-shrink-0">{consumed.toFixed(1)}% consumed</span>
                  <span className={`w-12 text-right text-[11px] font-mono font-bold flex-shrink-0 ${varianceTone(agencyVariance)}`}>
                    +{agencyVariance.toFixed(1)}
                  </span>
                </div>
                <p className="text-[10px] text-slate-500 mt-2">
                  <span className="text-slate-600">|</span> expected pace at {fiscal.yearElapsed}% elapsed · variance is spend above or below that pace
                </p>
              </div>

              {/* Overtime drivers */}
              <div className="mt-7">
                <SectionLabel right={<span className="text-[10px] text-red-400/90">{Math.round(otPct)}% of annual allocation consumed</span>}>
                  Overtime drivers
                </SectionLabel>
                <div className="divide-y divide-slate-800/50">
                  {otDrivers.map((d, i) => (
                    <div key={d.driver} className={`flex items-center gap-4 py-3.5 pl-3 border-l-2 ${i < 2 ? 'border-red-500/70' : 'border-transparent'}`}>
                      <div className="w-44 flex-shrink-0 min-w-0">
                        <p className="text-[12px] font-semibold text-slate-100">{d.driver}</p>
                        <p className="text-[10px] text-slate-500 truncate">{d.note}</p>
                      </div>
                      <span className="w-16 text-right text-[12px] font-mono font-bold text-slate-100 flex-shrink-0">{money(d.amount)}</span>
                      <span className="flex-1 min-w-0">
                        <Meter pct={(d.amount / otMax) * 100} tone={i < 2 ? 'bg-red-500' : i === 2 ? 'bg-amber-400' : 'bg-slate-600'} />
                      </span>
                      <span className={`w-28 text-right text-[11px] flex-shrink-0 ${d.leverTone === 'amber' ? 'text-amber-400' : 'text-slate-500'}`}>
                        {d.lever}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="text-[10px] text-slate-500 mt-3 leading-relaxed">
                  Mandatory post coverage is {Math.round(mandatoryShare)}% of overtime spend and is not discretionary — it is the arithmetic of 84 vacancies
                  against fixed post requirements. <span className="text-amber-400/80">Hiring</span> is the only lever that moves it.
                </p>
              </div>

              {/* Fiscal intelligence */}
              <div className="mt-7">
                <SectionLabel right={<span className="text-[10px] text-slate-500">AI-assisted synthesis · 5 sources · confidence 88% · 6m ago</span>}>
                  Fiscal intelligence
                </SectionLabel>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {intelligence.map((c) => (
                    <div key={c.title} className="border border-slate-800/80 rounded-xl px-4 py-3.5">
                      <p className="flex items-center gap-2">
                        <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${dotTone[c.tone]}`} />
                        <span className={`text-[12px] font-bold ${statusTone[c.tone]}`}>{c.title}</span>
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
              {/* Fiscal position */}
              <SectionLabel right={<span className="text-[10px] text-amber-400/90">{fiscal.monthsRemaining} months remaining</span>}>
                Fiscal position
              </SectionLabel>
              <div className="divide-y divide-slate-800/50">
                {position.map((p) => (
                  <div key={p.label} className="py-2.5">
                    <div className="flex items-baseline justify-between gap-3 mb-1.5">
                      <span className="text-[12px] text-slate-200">{p.label}</span>
                      <span className={`text-[11px] font-mono flex-shrink-0 ${p.text ?? 'text-slate-400'}`}>{p.pct.toFixed(1).replace(/\.0$/, '')}%</span>
                    </div>
                    <Meter pct={p.pct} tone={p.tone} />
                  </div>
                ))}
              </div>
              <p className="text-[10px] text-slate-500 mt-3 leading-relaxed">
                Projected year-end position: $2.1M over on operating, offset by {money(fiscal.vacancySavings)} vacancy savings if transfers are approved. Net favorable $2.0M.
              </p>

              {/* Capital projects */}
              <div className="mt-7">
                <SectionLabel right={<span className="text-[10px] text-slate-500">{money(capitalCommitted)} committed</span>}>
                  Capital projects
                </SectionLabel>
                <div className="divide-y divide-slate-800/50">
                  {capital.map((c) => (
                    <div key={c.project} className="flex items-start gap-2.5 py-3">
                      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5 ${dotTone[c.tone]}`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-[12px] font-semibold text-slate-100 truncate">{c.project}</p>
                        <p className="text-[10px] text-slate-500 truncate">{c.note}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-[11.5px] font-mono text-slate-100">{money(c.amount)}</p>
                        <p className={`text-[10px] ${statusTone[c.tone]}`}>{c.status}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Grant funding */}
              <div className="mt-7">
                <SectionLabel right={<span className="text-[10px] text-slate-500">{money(grantsActive)} active</span>}>
                  Grant funding
                </SectionLabel>
                <div className="divide-y divide-slate-800/50">
                  {grants.map((g) => (
                    <div key={g.grant} className="flex items-start gap-2.5 py-3">
                      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5 ${dotTone[g.tone]}`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-[12px] font-semibold text-slate-100 truncate">{g.grant}</p>
                        <p className={`text-[10px] truncate ${g.noteTone === 'red' ? 'text-red-400/90' : g.noteTone === 'amber' ? 'text-amber-400/80' : 'text-slate-500'}`}>{g.note}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-[11.5px] font-mono text-slate-100">{money(g.amount)}</p>
                        <p className="text-[10px] text-slate-500">{g.drawn}% drawn</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Fleet & assets */}
              <div className="mt-7">
                <SectionLabel right={<span className="text-[10px] text-slate-500">{fleetTotal} units · {Math.round((fleetReady / fleetTotal) * 100)}% ready</span>}>
                  Fleet &amp; assets
                </SectionLabel>
                <div className="divide-y divide-slate-800/50">
                  {fleet.map((f) => {
                    const pct = Math.round((f.ready / f.total) * 100);
                    const below = pct < READINESS_FLOOR;
                    return (
                      <div key={f.category} className="py-2.5">
                        <div className="flex items-baseline justify-between gap-3 mb-1.5">
                          <span className="text-[12px] text-slate-200 min-w-0 truncate">
                            {f.category}
                            {f.note && <span className="text-[10px] text-slate-500 ml-2">{f.note}</span>}
                          </span>
                          <span className={`text-[11px] font-mono flex-shrink-0 ${below ? 'text-red-400' : pct < 90 ? 'text-amber-400' : 'text-slate-400'}`}>
                            {f.ready}/{f.total} · {pct}%
                          </span>
                        </div>
                        <Meter pct={pct} tone={below ? 'bg-red-500' : pct < 90 ? 'bg-amber-400' : 'bg-slate-600'} tick={READINESS_FLOOR} />
                      </div>
                    );
                  })}
                </div>
                <p className="text-[10px] text-slate-500 mt-2.5">
                  <span className="text-slate-600">|</span> minimum operational readiness
                </p>
              </div>

              {/* Contract renewals */}
              <div className="mt-7">
                <SectionLabel right={<span className="text-[10px] text-amber-400/90">{renewalsSoon} within 90 days</span>}>
                  Contract renewals
                </SectionLabel>
                <div className="divide-y divide-slate-800/50">
                  {renewals.map((r) => (
                    <div key={r.contract} className="flex items-start gap-3 py-3">
                      <div className="flex-1 min-w-0">
                        <p className="text-[12px] font-semibold text-slate-100 truncate">{r.contract}</p>
                        <p className="text-[10px] text-slate-500 truncate">{r.note}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-[11.5px] font-mono text-slate-100">{r.value}</p>
                        <p className={`text-[10px] font-mono ${r.days <= 90 ? 'text-amber-400' : 'text-slate-500'}`}>{r.date} · {r.days}d</p>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-[10px] text-slate-500 mt-2.5">Renewals inside 30 days require Commission agenda placement.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

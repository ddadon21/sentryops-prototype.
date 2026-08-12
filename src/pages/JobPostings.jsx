import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';
import { hrNavigation, hrProfile, hrNotifications } from '../config/hrConfig';

// ── Open requisitions ──────────────────────────────────────────
// Every requisition is tied to a funded position in position control, so the
// openings, fill and application totals on this page are sums of these rows —
// the same discipline the HR dashboard applies to strength.
//
// `filled` is offers accepted, not candidates in process. A requisition that
// closes with openings unfilled hands them back to position control as
// vacancies, which is why the two pages have to agree.

const requisitions = [
  {
    id: 'detention-officer', title: 'Detention Officer', kind: 'Sworn · Detention · continuous posting',
    track: 'Sworn', openings: 59, apps: 112, qual: 41, filled: 6, days: 214, status: 'STALLED',
    grade: 'PS-14 · $47,320 start', posting: 'Continuous · 214 days', constraint: 'Detention academy unscheduled',
    withdrawals: '6 citing wait time',
    detail: 'The largest requisition in the agency and the one that governs whether Detention can stop running mandatory overtime. Continuous posting has produced 112 applications since it opened, but only six offers have been accepted because the detention academy has no scheduled start and no instructor assigned. Six of the forty-one qualified candidates have already withdrawn citing the wait.',
  },
  {
    id: 'deputy-sheriff', title: 'Deputy Sheriff', kind: 'Sworn · Patrol · continuous posting',
    track: 'Sworn', openings: 41, apps: 96, qual: 38, filled: 9, days: 186, status: 'STALLED',
    grade: 'PS-16 · $52,180 start', posting: 'Continuous · 186 days', constraint: '5 seats in cohort 26-C · 27-A opens Oct 1',
    withdrawals: '4 citing wait time',
    detail: 'Second continuous sworn posting. Five seats remain in the cohort now in session and assignment for the January cohort opens Oct 1, so the deputy track is seat-limited rather than blocked. Nine of the forty-one openings have been filled by lateral transfers who bypass the academy entirely.',
  },
  {
    id: 'communications', title: '911 Communications Officer', kind: 'Civilian · Communications',
    track: 'Civilian', openings: 17, apps: 64, qual: 19, filled: 3, days: 132, status: 'ACTIVE',
    grade: 'PS-11 · $44,900 start', posting: 'Continuous · 132 days', constraint: 'Six-week in-house academy',
    withdrawals: '3 citing shift schedule',
    detail: 'Communications carries the highest vacancy rate in the agency at 17.7%. This posting has no academy dependency — training is in-house over six weeks — so every qualified candidate here is convertible now.',
  },
  {
    id: 'background-investigator', title: 'Background Investigator', kind: 'Contract · Human Resources',
    track: 'Contract', openings: 2, apps: 14, qual: 8, filled: 0, days: 9, status: 'ACTIVE', flag: 'PRIORITY',
    grade: 'Contract · $58/hr', posting: 'Closes in 19 days', constraint: 'Adjudication required before close',
    withdrawals: 'None',
    detail: 'Two contract investigators against the stage that consumes 63 of the 168-day time to hire. This requisition is the one that unblocks every sworn posting behind it.',
  },
  {
    id: 'detective', title: 'Detective — Major Crimes', kind: 'Sworn · Criminal Investigations',
    track: 'Sworn', openings: 1, apps: 7, qual: 4, filled: 0, days: 61, status: 'INTERNAL', flag: '61 DAYS',
    grade: 'PS-18 · $69,400 mid', posting: 'Internal bid · closed Aug 1', constraint: 'Selection panel not convened',
    withdrawals: 'None',
    detail: 'Internal bid closed sixty-one days ago with four qualified applicants and no selection panel convened. The delay is administrative, not a candidate problem.',
  },
  {
    id: 'forensics-examiner', title: 'Digital Forensics Examiner', kind: 'Civilian · Criminal Investigations',
    track: 'Civilian', openings: 1, apps: 3, qual: 1, filled: 0, days: 44, status: 'ACTIVE', flag: 'UNFUNDED',
    grade: 'PS-17 · $71,400 start', posting: 'Open · 44 days', constraint: 'Position not funded in FY26',
    withdrawals: 'None',
    detail: 'The second examiner position Criminal Investigations has requested. It is posted but unfunded, so an accepted offer cannot be made until the reclassification clears position control.',
  },
  {
    id: 'records-technician', title: 'Records Technician', kind: 'Civilian · Support Services',
    track: 'Civilian', openings: 1, apps: 22, qual: 11, filled: 0, days: 12, status: 'ACTIVE',
    grade: 'PS-09 · $41,600 start', posting: 'Closes in 14 days', constraint: 'Adjudication required before close',
    withdrawals: 'None',
    detail: 'Eleven qualified candidates against one opening. Records is the position behind the open-records response time that currently exceeds the statutory standard.',
  },
  {
    id: 'sergeant-detention', title: 'Sergeant — Detention', kind: 'Sworn · Detention · promotional',
    track: 'Sworn', openings: 4, apps: 19, qual: 19, filled: 2, days: 38, status: 'INTERNAL',
    grade: 'PS-19 · promotional', posting: 'Promotional list · certified', constraint: 'Two selections pending Sheriff signature',
    withdrawals: 'None',
    detail: 'Promotional list is certified and every applicant is qualified. Two selections have been with the Sheriff for thirty-four days; the remaining two cannot be made until those clear.',
  },
  {
    id: 'fleet-maintenance', title: 'Fleet Maintenance Technician', kind: 'Civilian · Support Services',
    track: 'Civilian', openings: 2, apps: 31, qual: 14, filled: 1, days: 27, status: 'ACTIVE',
    grade: 'PS-12 · $46,100 start', posting: 'Closes in 21 days', constraint: 'ASE certification required',
    withdrawals: '1 declined offer',
    detail: 'One offer accepted against two openings, with thirteen qualified candidates still in process. No dependency beyond the ASE certification requirement.',
  },
];

// ── Source performance ─────────────────────────────────────────
// `spend` is ninety-day channel cost. Cost per hire is derived from it, because
// a channel that produces no hire has a cost per hire of infinity, not of zero.

const sources = [
  { channel: 'GovernmentJobs portal',    note: 'County posting system · no incremental cost', apps: 118, qual: 47, hired: 8, spend: 0    },
  { channel: 'Employee referral',        note: '$500 incentive on 12-month retention',        apps: 34,  qual: 24, hired: 7, spend: 1040 },
  { channel: 'Georgia POST job board',   note: 'Certified and lateral candidates',            apps: 41,  qual: 22, hired: 5, spend: 310  },
  { channel: 'Indeed sponsored',         note: 'Paid placement · civilian roles',             apps: 62,  qual: 14, hired: 2, spend: 4180 },
  { channel: 'Career fairs and outreach', note: 'Technical colleges, military bases',         apps: 22,  qual: 11, hired: 3, spend: 2640 },
  { channel: 'Military transition programs', note: 'SkillBridge and base liaison',            apps: 7,   qual: 6,  hired: 2, spend: 0    },
];

// Candidates standing at conditional offer right now, across every open
// requisition — the figure the Hiring Pipeline carries for that stage. It is
// not the same measure as the 90-day hire count below: a hire completed this
// quarter came from an earlier intake, so the two cannot be divided by the same
// denominator.
const AT_CONDITIONAL_OFFER = 14;

// ── Right column ───────────────────────────────────────────────

// Anything overdue or inside this window is on the HR director's desk now.
const ACTION_WINDOW = 20;
const postingActions = [
  { action: 'Records Technician closes',    note: '11 qualified · adjudication required', days: 14 },
  { action: 'Background Investigator closes', note: '8 qualified · priority requisition', days: 19 },
  { action: 'Fleet Technician closes',      note: '1 offer accepted · 1 outstanding',     days: 21 },
  { action: 'Sergeant selections to Sheriff', note: '2 pending signature · 34 days',      days: -1 },
  { action: '911 Communications closes',    note: '19 qualified · 17 openings',           days: 36 },
];

// Twelve weekly intakes, split into those that met minimum qualifications and
// those screened out. Volume is the story; the qualified share barely moves.
const applicantFlow = [
  { total: 25, qual: 10 }, { total: 27, qual: 11 }, { total: 21, qual: 8  }, { total: 31, qual: 13 },
  { total: 24, qual: 10 }, { total: 28, qual: 11 }, { total: 22, qual: 9  }, { total: 33, qual: 13 },
  { total: 26, qual: 10 }, { total: 24, qual: 10 }, { total: 18, qual: 7  }, { total: 9,  qual: 4  },
];

// Starting rates against the six metro agencies the county loses candidates to.
// The HR dashboard compares class averages against the broader regional survey,
// which is why the two pages carry different medians for the same title.
const payComparison = [
  { role: 'Deputy Sheriff — start',      agency: 52180, market: 54900 },
  { role: 'Detention Officer — start',   agency: 47320, market: 48100 },
  { role: '911 Communications — start',  agency: 44900, market: 43200 },
  { role: 'Detective — mid-range',       agency: 69400, market: 71800 },
  { role: 'Digital Forensics Examiner',  agency: 71400, market: 68900 },
];

const outreach = [
  { date: 'Aug 22', event: 'Gwinnett Technical College career fair', note: 'Criminal justice program · civilian and sworn', apps: 14, days: 13 },
  { date: 'Sep 05', event: 'Fort Eisenhower transition briefing',    note: 'SkillBridge · separating service members',      apps: 9,  days: 27 },
  { date: 'Sep 19', event: 'Regional POST lateral hiring event',     note: 'Certified officers · 6 agencies attending',     apps: 11, days: 41 },
  { date: 'Oct 03', event: 'Community open house — Lawrenceville',   note: 'Public tour and recruiting table',              apps: 6,  days: 55 },
  { date: 'Oct 17', event: 'HBCU criminal justice consortium',       note: 'Three campuses · sworn track',                  apps: 18, days: 69 },
];

const intelligence = [
  {
    title: 'Two postings would fix two compliance measures', tone: 'amber',
    body: 'The Background Investigator contract posting relieves the 74-day hiring bottleneck, and the Records Technician posting relieves the open-records response time that currently exceeds the statutory standard.',
    action: 'Both close within three weeks. Prioritize adjudication on these two over the continuous sworn postings, which are academy-limited regardless.',
    sources: 'Applicant tracking · BI queue · open-records queue · Performance & Compliance',
  },
  {
    title: 'Detention interest exists; seats do not', tone: 'red',
    body: 'Forty-one qualified Detention Officer candidates against fifty-nine openings, and six have already withdrawn waiting for an academy seat that does not exist until May.',
    action: 'A mid-cycle cohort or a shared academy agreement converts existing candidates without new recruiting spend.',
    sources: 'Applicant tracking · Training division · withdrawal reasons',
  },
  {
    title: 'Referral is the cheapest channel and the least used', tone: 'emerald',
    body: null, // templated from the source table
    action: 'Relaunch the referral incentive at the next shift briefing cycle before increasing sponsored placement spend.',
    sources: 'Applicant tracking · referral program records · recruiting ledger',
  },
];

// ── Helpers ────────────────────────────────────────────────────

const pct = (n, d) => (d ? (n / d) * 100 : 0);
const usd = (n) => `$${n.toLocaleString()}`;

const statusTone = {
  ACTIVE:   'text-emerald-400',
  STALLED:  'text-amber-400',
  INTERNAL: 'text-slate-400',
};
const flagTone = {
  PRIORITY:  'border-amber-500/60 text-amber-400',
  UNFUNDED:  'border-red-500/60 text-red-400',
  '61 DAYS': 'border-amber-500/60 text-amber-400',
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

function Meter({ value, tone = 'bg-slate-600' }) {
  return (
    <span className="block h-1 bg-zinc-800/70 rounded-full">
      <span className={`block h-full rounded-full ${tone}`} style={{ width: `${Math.min(value, 100)}%` }} />
    </span>
  );
}

export default function JobPostings() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(requisitions[0].id);
  const [track, setTrack] = useState('All');

  // ── Requisition roll-up ─────────────────────────────────────
  const totals = requisitions.reduce(
    (a, r) => ({
      openings: a.openings + r.openings,
      apps: a.apps + r.apps,
      filled: a.filled + r.filled,
    }),
    { openings: 0, apps: 0, filled: 0 },
  );
  const outstanding = totals.openings - totals.filled;
  const oldest = [...requisitions].sort((a, b) => b.days - a.days)[0];

  // A requisition is priority work if it is flagged or has stalled.
  const isPriority = (r) => r.flag === 'PRIORITY' || r.status === 'STALLED';
  const tracks = [
    { id: 'All',      label: 'All',      n: requisitions.length },
    { id: 'Sworn',    label: 'Sworn',    n: requisitions.filter((r) => r.track === 'Sworn').length },
    { id: 'Civilian', label: 'Civilian', n: requisitions.filter((r) => r.track === 'Civilian').length },
    { id: 'Priority', label: 'Priority', n: requisitions.filter(isPriority).length },
  ];
  const shown = track === 'All' ? requisitions
    : track === 'Priority' ? requisitions.filter(isPriority)
      : requisitions.filter((r) => r.track === track);

  // ── Source roll-up ──────────────────────────────────────────
  const srcTotals = sources.reduce(
    (a, s) => ({ apps: a.apps + s.apps, hired: a.hired + s.hired, spend: a.spend + s.spend }),
    { apps: 0, hired: 0, spend: 0 },
  );
  const blendedCost = srcTotals.spend / srcTotals.hired;
  const withYield = sources.map((s) => ({
    ...s,
    yield: pct(s.hired, s.apps),
    perHire: s.hired ? s.spend / s.hired : null,
    qualRate: pct(s.qual, s.apps),
  }));
  const dearest = [...withYield].filter((s) => s.perHire !== null).sort((a, b) => b.perHire - a.perHire)[0];
  const referral = withYield.find((s) => s.channel === 'Employee referral');
  const offerRate = pct(AT_CONDITIONAL_OFFER, srcTotals.apps);

  const cards = intelligence.map((c) => c.body ? c : ({
    ...c,
    body: `Employee referral produces the highest qualified rate at ${Math.round(referral.qualRate)}% and the lowest `
      + `cost per hire at ${usd(Math.round(referral.perHire))}, but generates only ${referral.apps} applications in 90 days.`,
  }));

  // ── Right column ────────────────────────────────────────────
  const actionsDue = postingActions.filter((a) => a.days < 0 || a.days <= ACTION_WINDOW).length;
  const flowTotal = applicantFlow.reduce((a, w) => a + w.total, 0);
  const flowQual = applicantFlow.reduce((a, w) => a + w.qual, 0);
  const flowMax = Math.max(...applicantFlow.map((w) => w.total));
  const belowMarket = payComparison.filter((p) => p.agency < p.market).length;
  const outreachWeeks = Math.round(Math.max(...outreach.map((o) => o.days)) / 7);

  return (
    <DashboardLayout navigation={hrNavigation} profile={hrProfile} notifications={hrNotifications} settingsRoute="/hr/settings" profileRoute="/hr/profile" activityRoute="/hr/activity" activityModuleFilter="hr">
      <div className="min-h-full bg-[#0A0A0B] px-6 py-8">
        <div className="max-w-[1500px] mx-auto">

          {/* ── Header ─────────────────────────────────────── */}
          <div className="flex flex-col lg:flex-row lg:items-center gap-3 lg:gap-4">
            <div className="flex items-baseline gap-3 flex-wrap">
              <h1 className="text-[19px] font-bold text-slate-100">Job Postings</h1>
              <span className="text-[11px] text-slate-500">
                Requisitions against position control · county HR portal · GovernmentJobs · POST job board · Indeed
              </span>
            </div>
            <div className="flex items-center gap-4 lg:ml-auto flex-wrap">
              <span className="text-[11px] text-slate-400">
                {totals.openings} openings posted · {totals.filled} filled · detention academy unscheduled
              </span>
              <button className="px-3.5 py-2 border border-amber-500/60 rounded-lg text-[11.5px] font-semibold text-amber-400 hover:bg-amber-500/10 transition-colors">
                New requisition
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
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />Open requisitions
                  </p>
                  <p className="leading-none">
                    <span className="text-[24px] font-bold text-slate-100">{requisitions.length}</span>
                    <span className="text-[11.5px] text-slate-400 ml-2">{totals.openings} openings</span>
                  </p>
                  <p className="text-[10.5px] text-amber-400/90 mt-2">{totals.filled} filled · {outstanding} outstanding</p>
                </div>
                <div className="px-5 py-4 border-b border-slate-800/60">
                  <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500 mb-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />Applications — 90 days
                  </p>
                  <p className="leading-none">
                    <span className="text-[24px] font-bold text-slate-100">{srcTotals.apps}</span>
                    <span className="text-[11.5px] text-slate-400 ml-2">all channels</span>
                  </p>
                  <p className="text-[10.5px] text-amber-400/90 mt-2">
                    {offerRate.toFixed(1)}% at conditional offer · {totals.apps} lifetime on open postings
                  </p>
                </div>
                <div className="px-5 py-4">
                  <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500 mb-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500" />Oldest posting
                  </p>
                  <p className="leading-none">
                    <span className="text-[24px] font-bold text-slate-100">{oldest.days}</span>
                    <span className="text-[11.5px] text-slate-400 ml-2">days · {oldest.title}</span>
                  </p>
                  <p className="text-[10.5px] text-red-400/90 mt-2">6 qualified candidates withdrawn</p>
                </div>
                <div className="px-5 py-4">
                  <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500 mb-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-600" />Cost per hire
                  </p>
                  <p className="leading-none">
                    <span className="text-[24px] font-bold text-slate-100">{usd(Math.round(blendedCost))}</span>
                    <span className="text-[11.5px] text-slate-400 ml-2">blended · {srcTotals.hired} hires</span>
                  </p>
                  <p className="text-[10.5px] text-slate-500 mt-2">
                    {dearest.channel.split(' ')[0]} at {usd(Math.round(dearest.perHire))} · referral at {usd(Math.round(referral.perHire))}
                  </p>
                </div>
              </div>

              {/* Open requisitions */}
              <div className="mt-7">
                <SectionLabel right={
                  <span className="flex items-center gap-4">
                    {tracks.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => setTrack(t.id)}
                        className={`text-[11px] transition-colors ${
                          track === t.id ? 'text-slate-100 font-semibold underline underline-offset-4' : 'text-slate-500 hover:text-slate-300'
                        }`}
                      >
                        {t.label} <span className="font-mono text-slate-500">{t.n}</span>
                      </button>
                    ))}
                  </span>
                }>
                  Open requisitions
                </SectionLabel>

                <div className="flex items-end gap-3 pb-2 border-b border-slate-800/70 pl-3 text-[9px] font-bold uppercase tracking-[0.12em] text-slate-500">
                  <span className="flex-1 min-w-0">Requisition</span>
                  <span className="w-14 text-right flex-shrink-0">Openings</span>
                  <span className="w-10 text-right flex-shrink-0">Apps</span>
                  <span className="w-10 text-right flex-shrink-0">Qual</span>
                  <span className="w-[104px] flex-shrink-0">Fill progress</span>
                  <span className="w-14 text-right flex-shrink-0">Days open</span>
                  <span className="w-16 text-right flex-shrink-0">Status</span>
                </div>

                <div className="divide-y divide-slate-800/50">
                  {shown.map((r) => {
                    const isOpen = open === r.id;
                    const fill = pct(r.filled, r.openings);
                    return (
                      <div key={r.id} className={`border-l-2 ${
                        r.status === 'STALLED' ? 'border-red-500/70' : r.flag === 'UNFUNDED' ? 'border-red-500/70'
                          : r.flag ? 'border-amber-500/60' : 'border-transparent'
                      }`}>
                        <button
                          onClick={() => setOpen(isOpen ? null : r.id)}
                          className="w-full flex items-center gap-3 py-3 pl-3 text-left hover:bg-zinc-900/40 transition-colors"
                        >
                          <div className="flex-1 min-w-0">
                            <span className="flex items-center gap-2">
                              <span className="text-[12.5px] font-semibold text-slate-100 truncate">{r.title}</span>
                              {r.flag && (
                                <span className={`border rounded px-1.5 py-0.5 text-[9px] font-bold tracking-wider flex-shrink-0 ${flagTone[r.flag]}`}>
                                  {r.flag}
                                </span>
                              )}
                            </span>
                            <p className="text-[10px] text-slate-500 truncate mt-0.5">{r.kind}</p>
                          </div>
                          <span className="w-14 text-right text-[12px] font-mono font-bold text-slate-100 flex-shrink-0">{r.openings}</span>
                          <span className="w-10 text-right text-[11px] font-mono text-slate-300 flex-shrink-0">{r.apps}</span>
                          <span className="w-10 text-right text-[11px] font-mono text-amber-400 flex-shrink-0">{r.qual}</span>
                          <span className="w-[104px] flex items-center gap-2 flex-shrink-0">
                            <span className="flex-1">
                              <Meter value={fill} tone={fill === 0 ? 'bg-slate-700' : fill < 25 ? 'bg-red-500' : 'bg-slate-500'} />
                            </span>
                            <span className={`text-[10.5px] font-mono ${fill === 0 ? 'text-slate-500' : fill < 25 ? 'text-red-400' : 'text-slate-300'}`}>
                              {r.filled}/{r.openings}
                            </span>
                          </span>
                          <span className={`w-14 text-right text-[11px] font-mono flex-shrink-0 ${r.days > 120 ? 'text-red-400' : 'text-slate-400'}`}>{r.days}</span>
                          <span className={`w-16 text-right text-[10.5px] font-bold tracking-wider flex-shrink-0 ${statusTone[r.status]}`}>{r.status}</span>
                        </button>

                        {isOpen && (
                          <div className="px-3 pb-4">
                            <p className="text-[12px] text-slate-300 leading-relaxed">{r.detail}</p>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-3 mt-3.5">
                              <div className="border-l-2 border-slate-600 pl-3">
                                <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-slate-500">Grade</p>
                                <p className="text-[11px] text-slate-200 mt-1">{r.grade}</p>
                              </div>
                              <div className="border-l-2 border-slate-600 pl-3">
                                <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-slate-500">Posting</p>
                                <p className="text-[11px] text-slate-200 mt-1">{r.posting}</p>
                              </div>
                              <div className="border-l-2 border-amber-500/70 pl-3">
                                <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-amber-400">Constraint</p>
                                <p className="text-[11px] text-slate-200 mt-1">{r.constraint}</p>
                              </div>
                              <div className="border-l-2 border-red-500/70 pl-3">
                                <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-red-400">Withdrawals</p>
                                <p className="text-[11px] text-slate-200 mt-1">{r.withdrawals}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2.5 mt-4 flex-wrap">
                              <button
                                onClick={() => navigate('/hr/applicants')}
                                className="px-3 py-1.5 border border-amber-500/60 bg-amber-500/10 rounded text-[11px] font-semibold text-amber-400 hover:bg-amber-500/20 transition-colors"
                              >
                                Review candidates
                              </button>
                              <button className="px-3 py-1.5 border border-slate-700/60 rounded text-[11px] font-semibold text-slate-200 hover:bg-zinc-900/60 transition-colors">Extend posting</button>
                              <button className="px-3 py-1.5 border border-slate-700/60 rounded text-[11px] font-semibold text-slate-200 hover:bg-zinc-900/60 transition-colors">Close requisition</button>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
                <p className="text-[10px] text-slate-500 mt-3 leading-relaxed">
                  Fill progress is offers accepted against openings. Every requisition is tied to a funded position in position
                  control; unfunded requests appear as reclassification actions on the HR Dashboard.
                </p>
              </div>

              {/* Source performance */}
              <div className="mt-7">
                <SectionLabel right={<span className="text-[10px] text-slate-500">{srcTotals.apps} applications · {srcTotals.hired} hires</span>}>
                  Source performance — 90 days
                </SectionLabel>
                <div className="flex items-end gap-3 pb-2 border-b border-slate-800/70 pl-3 text-[9px] font-bold uppercase tracking-[0.12em] text-slate-500">
                  <span className="flex-1 min-w-0">Channel</span>
                  <span className="w-10 text-right flex-shrink-0">Apps</span>
                  <span className="w-10 text-right flex-shrink-0">Qual</span>
                  <span className="w-10 text-right flex-shrink-0">Hired</span>
                  <span className="w-[92px] flex-shrink-0">Yield</span>
                  <span className="w-16 text-right flex-shrink-0">Spend</span>
                  <span className="w-16 text-right flex-shrink-0">$ / hire</span>
                </div>
                <div className="divide-y divide-slate-800/50">
                  {withYield.map((s) => {
                    const good = s.yield >= 20;
                    const poor = s.yield < 5;
                    return (
                      <div key={s.channel} className={`flex items-center gap-3 py-3 pl-3 border-l-2 ${poor ? 'border-red-500/70' : 'border-transparent'}`}>
                        <div className="flex-1 min-w-0">
                          <p className="text-[12px] font-semibold text-slate-100 truncate">{s.channel}</p>
                          <p className="text-[10px] text-slate-500 truncate">{s.note}</p>
                        </div>
                        <span className="w-10 text-right text-[11px] font-mono text-slate-300 flex-shrink-0">{s.apps}</span>
                        <span className="w-10 text-right text-[11px] font-mono text-slate-400 flex-shrink-0">{s.qual}</span>
                        <span className="w-10 text-right text-[12px] font-mono font-bold text-slate-100 flex-shrink-0">{s.hired}</span>
                        <span className="w-[92px] flex items-center gap-2 flex-shrink-0">
                          <span className="flex-1">
                            <Meter value={s.yield * 3} tone={good ? 'bg-emerald-500' : poor ? 'bg-red-500' : 'bg-slate-600'} />
                          </span>
                          <span className={`text-[10.5px] font-mono ${good ? 'text-emerald-400' : poor ? 'text-red-400' : 'text-slate-400'}`}>
                            {s.yield.toFixed(1)}%
                          </span>
                        </span>
                        <span className="w-16 text-right text-[11px] font-mono text-slate-400 flex-shrink-0">{usd(s.spend)}</span>
                        <span className={`w-16 text-right text-[11px] font-mono flex-shrink-0 ${
                          s.perHire === null ? 'text-slate-600' : s.perHire > 1500 ? 'text-amber-400' : 'text-slate-300'
                        }`}>
                          {s.perHire === null ? '—' : usd(Math.round(s.perHire))}
                        </span>
                      </div>
                    );
                  })}
                </div>
                <p className="text-[10px] text-slate-500 mt-3 leading-relaxed">
                  Employee referral converts at {referral.yield.toFixed(1)}% and costs {usd(Math.round(referral.perHire))} per hire;
                  {' '}{dearest.channel} converts at {dearest.yield.toFixed(1)}% and costs {usd(Math.round(dearest.perHire))}.
                  {' '}Referral volume, not conversion, is the limit — the incentive has not been promoted internally since FY25.
                </p>
              </div>

              {/* Recruiting intelligence */}
              <div className="mt-7">
                <SectionLabel right={<span className="text-[10px] text-slate-500">AI-assisted synthesis · 4 sources · confidence 81% · 34m ago</span>}>
                  Recruiting intelligence
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
              {/* Posting actions due */}
              <SectionLabel right={<span className="text-[10px] text-amber-400/90">{actionsDue} within {ACTION_WINDOW} days</span>}>
                Posting actions due
              </SectionLabel>
              <div className="divide-y divide-slate-800/50">
                {postingActions.map((a) => {
                  const overdue = a.days < 0;
                  const urgent = !overdue && a.days <= ACTION_WINDOW;
                  return (
                    <div key={a.action} className="flex items-start gap-2.5 py-3">
                      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5 ${
                        overdue ? 'bg-red-500' : urgent ? 'bg-amber-400' : a.days > 30 ? 'bg-emerald-400' : 'bg-slate-600'
                      }`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-[12.5px] font-semibold text-slate-100 truncate">{a.action}</p>
                        <p className="text-[10.5px] text-slate-500 truncate">{a.note}</p>
                      </div>
                      <span className={`text-[11.5px] font-mono flex-shrink-0 ${
                        overdue ? 'text-red-400 font-bold' : urgent ? 'text-amber-400' : 'text-slate-400'
                      }`}>
                        {overdue ? 'overdue' : `${a.days}d`}
                      </span>
                    </div>
                  );
                })}
              </div>
              <p className="text-[10px] text-slate-500 mt-2.5 leading-relaxed">
                Postings close automatically at the stated date. A closed requisition with unfilled openings returns to position
                control as a vacancy.
              </p>

              {/* Applicant flow */}
              <div className="mt-7">
                <SectionLabel right={<span className="text-[10px] text-slate-500">{flowTotal} applications</span>}>
                  Applicant flow — 12 weeks
                </SectionLabel>
                <div className="flex items-end gap-1.5 h-28">
                  {applicantFlow.map((w, i) => (
                    <span key={i} className="flex-1 flex flex-col justify-end" style={{ height: '100%' }}>
                      <span className="w-full bg-amber-500 rounded-t-sm" style={{ height: `${(w.qual / flowMax) * 100}%` }} />
                      <span className="w-full bg-slate-600" style={{ height: `${((w.total - w.qual) / flowMax) * 100}%` }} />
                    </span>
                  ))}
                </div>
                <div className="flex items-baseline justify-between mt-1.5">
                  <span className="text-[10px] text-slate-500">12 weeks ago</span>
                  <span className="text-[10px] text-slate-500">this week</span>
                </div>
                <div className="flex items-center gap-4 mt-2">
                  <span className="flex items-center gap-1.5 text-[10px] text-slate-500">
                    <span className="w-3 h-1 rounded-full bg-amber-500" />met minimum qualifications
                  </span>
                  <span className="flex items-center gap-1.5 text-[10px] text-slate-500">
                    <span className="w-3 h-1 rounded-full bg-slate-600" />screened out
                  </span>
                </div>
                <p className="text-[10px] text-slate-500 mt-2.5 leading-relaxed">
                  Application volume has declined for three consecutive weeks. The qualified share holds at roughly
                  {' '}{Math.round(pct(flowQual, flowTotal))}%, so the decline is reach rather than screening.
                </p>
              </div>

              {/* Compensation position */}
              <div className="mt-7">
                <SectionLabel right={
                  <span className="text-[10px] text-amber-400/90">below market on {belowMarket} of {payComparison.length} roles</span>
                }>
                  Compensation position
                </SectionLabel>
                <div className="divide-y divide-slate-800/50">
                  {payComparison.map((p) => {
                    const delta = p.agency - p.market;
                    return (
                      <div key={p.role} className="flex items-center gap-3 py-3">
                        <div className="flex-1 min-w-0">
                          <p className="text-[12.5px] text-slate-100 truncate">{p.role}</p>
                          <p className="text-[10.5px] text-slate-500 truncate">Metro comparison median {usd(p.market)}</p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="text-[12px] font-mono text-slate-100">{usd(p.agency)}</p>
                          <p className={`text-[10.5px] font-mono ${delta < 0 ? 'text-red-400' : 'text-emerald-400'}`}>
                            {delta < 0 ? '−' : '+'}{usd(Math.abs(delta))}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <p className="text-[10px] text-slate-500 mt-2.5 leading-relaxed">
                  Comparison set is the six metro Atlanta sheriff's offices and police departments the agency loses candidates to
                  most often. These are starting rates; the HR Dashboard compares class averages against the broader regional survey.
                </p>
              </div>

              {/* Outreach calendar */}
              <div className="mt-7">
                <SectionLabel right={<span className="text-[10px] text-slate-500">next {outreachWeeks} weeks</span>}>
                  Outreach calendar
                </SectionLabel>
                <div className="divide-y divide-slate-800/50">
                  {outreach.map((o) => (
                    <div key={o.event} className="flex items-start gap-3 py-3">
                      <span className="w-12 text-[11px] font-mono text-slate-500 flex-shrink-0">{o.date}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-[12.5px] text-slate-100 truncate">{o.event}</p>
                        <p className="text-[10.5px] text-slate-500 truncate">{o.note}</p>
                      </div>
                      <span className="text-[11px] font-mono text-amber-400 flex-shrink-0">{o.apps} apps</span>
                    </div>
                  ))}
                </div>
                <p className="text-[10px] text-slate-500 mt-2.5">
                  Right column is applications generated by the same event last cycle.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

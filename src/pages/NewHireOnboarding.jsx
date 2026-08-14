import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';
import { hrNavigation, hrProfile, hrNotifications } from '../config/hrConfig';

// ── Field training ─────────────────────────────────────────────
// A pairing holds only when a certified trainer works the trainee's own shift.
// That single rule decides the pairing status, the at-risk banner, the not-paired
// tab and the lost-day count, so none of them can disagree:
//
//   no trainer    — nobody assigned at all
//   cross-shift   — a trainer is assigned but works a different shift
//   paired        — trainer and trainee on the same shift
//
// A shift spent with an uncertified officer produces no observation report and
// does not count toward the phase. That is why lost days matter: the probation
// clock keeps running while the program does not.

const BELOW_STANDARD = 4.0;

const trainees = [
  {
    id: 'T-26-118', name: 'Dep. Sarah Mitchell', note: 'Solo evaluation scheduled Sep 2',
    assignment: 'Patrol · Shift C', shift: 'Shift C', phase: '3 — Independence', week: 11, ofWeeks: 16,
    trainer: 'Dep. Rodriguez', trainerShift: 'Shift C', dor: 5.2,
  },
  {
    id: 'T-26-104', name: 'Dep. Marcus Johnson', note: 'Phase 2 extension expires Aug 20 · second extension needs a board', noteTone: 'amber',
    assignment: 'Patrol · Shift A', shift: 'Shift A', phase: '2 — Instruction', week: 10, ofWeeks: 16,
    trainer: 'Cpl. J. Williams', trainerShift: 'Shift A', dor: 3.4,
  },
  {
    id: 'T-26-092', name: 'Dep. Alicia Boateng', note: 'Trainer recommends solo authorization · signature due Aug 18',
    assignment: 'Patrol · Shift B', shift: 'Shift B', phase: '4 — Evaluation', week: 16, ofWeeks: 16,
    trainer: 'Dep. Kirkland', trainerShift: 'Shift B', dor: 5.9,
  },
  {
    id: 'T-26-131', name: 'Dep. Ruben Ortega', note: 'Assigned trainer works Shift B · 3 shifts with no report', noteTone: 'amber',
    assignment: 'Patrol · Shift D', shift: 'Shift D', phase: '1 — Observation', week: 2, ofWeeks: 16,
    trainer: 'Dep. Kirkland', trainerShift: 'Shift B', dor: 4.6,
  },
  {
    id: 'T-26-127', name: 'Dep. Callum Byrne', note: 'Solo authorization recommendation due Aug 15',
    assignment: 'Patrol · Shift A', shift: 'Shift A', phase: '4 — Evaluation', week: 15, ofWeeks: 16,
    trainer: 'Cpl. J. Williams', trainerShift: 'Shift A', dor: 5.5,
  },
  {
    id: 'T-26-121', name: 'Ofc. Devon Castellanos', note: 'Eligible for Phase 3 on Aug 17',
    assignment: 'Detention · Tower 2', shift: 'Watch 2', phase: '2 — Instruction', week: 6, ofWeeks: 12,
    trainer: 'Sgt. Amaya', trainerShift: 'Watch 2', dor: 4.9,
  },
  {
    id: 'T-26-129', name: 'Ofc. Renata Villalobos', note: 'Booking floor rotation · first phase',
    assignment: 'Detention · Intake', shift: 'Watch 1', phase: '1 — Observation', week: 3, ofWeeks: 12,
    trainer: 'Cpl. Deshmukh', trainerShift: 'Watch 1', dor: 4.4,
  },
  {
    id: 'T-26-113', name: 'Ofc. Tobias Lindgren', note: 'No certified trainer since Aug 4 · 7 consecutive lost days', noteTone: 'red',
    assignment: 'Detention · Tower 1', shift: 'Watch 2', phase: '3 — Independence', week: 8, ofWeeks: 12,
    trainer: null, trainerShift: null, dor: 4.7,
  },
  {
    id: 'T-26-116', name: 'Ofc. Priya Raghunathan', note: 'Written remedial plan due Aug 19 · trainer on another watch', noteTone: 'amber',
    assignment: 'Detention · Medical', shift: 'Watch 3', phase: '2 — Instruction', week: 9, ofWeeks: 12,
    trainer: 'Sgt. Amaya', trainerShift: 'Watch 2', dor: 3.8,
  },
  {
    id: 'T-26-134', name: 'Ofc. Miriam Castellano', note: 'Started Aug 8 · first report due Aug 15 · trainer on Watch 1', noteTone: 'amber',
    assignment: 'Detention · Tower 3', shift: 'Watch 3', phase: '1 — Observation', week: 1, ofWeeks: 12,
    trainer: 'Cpl. Deshmukh', trainerShift: 'Watch 1', dor: null,
  },
  {
    id: 'T-26-124', name: 'Disp. Alina Petrosyan', note: 'Radio console next · certified on call-taking',
    assignment: 'Comms · A Watch', shift: 'A Watch', phase: '2 — Instruction', week: 5, ofWeeks: 10,
    trainer: 'Supv. Delacroix', trainerShift: 'A Watch', dor: 5.4,
  },
  {
    id: 'T-26-132', name: 'Disp. Hollis Nakamura', note: 'Trainer works A Watch · 2 shifts with no report', noteTone: 'amber',
    assignment: 'Comms · C Watch', shift: 'C Watch', phase: '1 — Observation', week: 2, ofWeeks: 10,
    trainer: 'Supv. Delacroix', trainerShift: 'A Watch', dor: 4.2,
  },
];

// ── Observation reports ────────────────────────────────────────

const reports = [
  {
    trainee: 'Dep. Marcus Johnson', context: 'Patrol · Shift A · 2 — Instruction', score: 3.4,
    flag: 'Officer safety 3.0 — third occurrence this phase',
    text: 'Approached a vehicle stop on the driver side without clearing the rear seat. Corrected on scene. Third occurrence documented in this phase.',
    filed: 'Filed Aug 12 23:41 by Cpl. J. Williams · Shift A', action: 'Open board packet',
  },
  {
    trainee: 'Ofc. Priya Raghunathan', context: 'Detention · Medical · 2 — Instruction', score: 3.8,
    flag: 'Medical emergency response 3.5 — fourth consecutive decline',
    text: 'Did not recognize alcohol withdrawal presentation during medication pass. Nurse initiated protocol. Trainee documented the event after prompting.',
    filed: 'Filed Aug 12 22:08 by Sgt. Amaya · Watch 1 overlap', action: 'Issue remedial plan',
  },
  {
    trainee: 'Dep. Alicia Boateng', context: 'Patrol · Shift B · 4 — Evaluation', score: 5.9,
    text: 'Shadow phase, second week. Made all decisions without prompting including a pursuit termination consistent with policy. Recommend solo authorization.',
    filed: 'Filed Aug 12 19:22 by Dep. Kirkland · Shift B', action: 'Recommend authorization',
  },
  {
    trainee: 'Dep. Sarah Mitchell', context: 'Patrol · Shift C · 3 — Independence', score: 5.4,
    text: 'Handled a domestic call as primary with no coaching. Report submitted before end of shift with no corrections required.',
    filed: 'Filed Aug 12 15:37 by Dep. Rodriguez · Shift C',
  },
  {
    trainee: 'Ofc. Devon Castellanos', context: 'Detention · Tower 2 · 2 — Instruction', score: 4.9,
    text: 'Housing unit rounds and count accurate. Handled an inmate grievance within policy and documented it correctly.',
    filed: 'Filed Aug 12 14:50 by Sgt. Amaya · Watch 2',
  },
];

const notFiled = [
  { trainee: 'Ofc. Tobias Lindgren',  reason: 'No certified trainer on Watch 2 since Aug 4', trainer: '— unassigned',    shifts: 7 },
  { trainee: 'Dep. Ruben Ortega',     reason: 'Trainer works Shift B, trainee on Shift D',   trainer: 'Dep. Kirkland',   shifts: 3 },
  { trainee: 'Ofc. Miriam Castellano', reason: 'No certified trainer on Watch 3',            trainer: 'Cpl. Deshmukh',   shifts: 3 },
  { trainee: 'Disp. Hollis Nakamura', reason: 'No watch overlap with certified trainer',     trainer: 'Supv. Delacroix', shifts: 2 },
];

// ── Decisions ──────────────────────────────────────────────────
// Ordered by the date the decision becomes irreversible, not by when it was
// raised — `days` is that horizon.

const decisions = [
  {
    kind: 'ASSIGN', title: 'Field trainer — Ofc. Tobias Lindgren', days: 0,
    body: 'Seven consecutive shifts with no report. He is above standard in every competency and the phase clock is running without documented progress.',
    route: 'Coordinator assignment · requires a Watch 2 certified trainer',
  },
  {
    kind: 'AUTHORIZE', title: 'Solo authorization — Dep. Callum Byrne', days: 2,
    body: 'Sixteenth week of a sixteen-week program. Without the recommendation he stays paired to Cpl. Williams, who also carries the remedial trainee on Shift A.',
    route: 'Coordinator recommendation, then division commander signature',
  },
  {
    kind: 'ADVANCE', title: 'Phase 3 advancement — Ofc. Devon Castellanos', days: 4,
    body: 'Eligible Aug 17. Advancing frees Sgt. Amaya to take the Tower 1 trainee who currently has none.',
    route: 'Coordinator signature',
  },
  {
    kind: 'AUTHORIZE', title: 'Solo authorization — Dep. Alicia Boateng', days: 5,
    body: 'Trainer recommends authorization. Every competency has improved across four reports and no remedial plan exists on the file.',
    route: 'Coordinator recommendation, then division commander signature',
  },
  {
    kind: 'REMEDIAL', title: 'Written remedial plan — Ofc. Priya Raghunathan', days: 6,
    body: 'Trainer requested review Aug 9. Policy 5.7 gives ten days for a written plan. Release for failure to progress without one is the agency’s exposure.',
    route: 'Coordinator signature · policy 5.7',
  },
  {
    kind: 'BOARD', title: 'Second extension — Dep. Marcus Johnson', days: 7,
    body: 'The Phase 2 extension expires Aug 20. A second extension requires a documented board finding; without one he must advance below standard or be released.',
    route: 'Review board · packet due Aug 18',
  },
];

// ── Right column ───────────────────────────────────────────────

const lostDays = [
  { cause: 'Trainer pulled to overtime post',        days: 14, note: 'Detention · one trainee affected for 7 consecutive shifts', tone: 'red'   },
  { cause: 'Trainer and trainee on different shifts', days: 9, note: 'Shift D, Watch 3, C Watch have no certified trainer',        tone: 'red'   },
  { cause: 'Trainer on leave, no substitute certified', days: 5, note: 'Patrol · substitute must also be FTO-certified',           tone: 'amber' },
  { cause: 'Trainer in court or in-service',         days: 3,  note: 'Patrol · scheduled, foreseeable',                            tone: 'slate' },
  { cause: 'Trainee call-out',                       days: 2,  note: 'Not recoverable',                                            tone: 'slate' },
];

const SLOTS_PER_TRAINER = 2;
const trainers = [
  { name: 'Cpl. J. Williams',  assignment: 'Patrol · Shift A',    carrying: 'Johnson, Byrne',            used: 2, recert: 'Mar 2027', recertSoon: false },
  { name: 'Dep. Rodriguez',    assignment: 'Patrol · Shift C',    carrying: 'Mitchell',                  used: 1, recert: 'Oct 2026', recertSoon: true  },
  { name: 'Dep. Kirkland',     assignment: 'Patrol · Shift B',    carrying: '1 trainee on another shift', used: 2, recert: 'Jan 2027', recertSoon: false, split: true },
  { name: 'Sgt. Amaya',        assignment: 'Detention · Watch 2', carrying: '1 trainee on another shift', used: 2, recert: 'Apr 2027', recertSoon: false, split: true },
  { name: 'Cpl. Deshmukh',     assignment: 'Detention · Watch 1', carrying: '1 trainee on another shift', used: 2, recert: 'Sep 2026', recertSoon: true,  split: true },
  { name: 'Supv. Delacroix',   assignment: 'Comms · A Watch',     carrying: '1 trainee on another shift', used: 2, recert: 'Jun 2027', recertSoon: false, split: true },
];

const UNCOVERED_SHIFTS = ['Patrol · Shift D', 'Detention · Watch 3', 'Comms · B Watch', 'Comms · C Watch'];

// `days` is days from today; anything inside a week is this week's work.
const documentation = [
  { item: 'Lindgren — 7 shifts with no report',        due: 'now',    days: 0,  tone: 'red',
    note: 'An undocumented gap cannot be reconstructed. Seven shifts of a twelve-week program have no evaluative record.' },
  { item: 'Byrne — solo authorization recommendation', due: 'Aug 15', days: 2,  tone: 'amber',
    note: 'Program week 16 of 16. A trainee held past program length without a documented reason is a grievance.' },
  { item: 'Johnson — board packet for second extension', due: 'Aug 18', days: 5, tone: 'amber',
    note: 'Extension expires Aug 20. Release without a board finding and a plan review is the agency’s exposure.' },
  { item: 'Raghunathan — written remedial plan',       due: 'Aug 19', days: 6,  tone: 'amber',
    note: 'Policy 5.7 gives ten days from the trainer’s request. Day nine is Aug 18.' },
  { item: 'Johnson — 30-day remedial plan review',     due: 'Aug 20', days: 7,  tone: 'amber',
    note: 'Plan signed Jul 21. The review must be signed before any release decision.' },
  { item: 'Deshmukh — FTO recertification',            due: 'Sep 30', days: 48, tone: 'slate',
    note: 'On expiry, Watch 1 loses its only certified trainer and two files stall.' },
];

const arriving = [
  { cohort: 'Deputy Academy 26-C graduates', note: 'Sep 12 · Shifts A and C have capacity, D has none', count: 5, status: '2 TRAINERS',  tone: 'amber'   },
  { cohort: 'Detention Academy 26-B',        note: 'No start date · instructor position vacant',        count: 0, status: 'UNSCHEDULED', tone: 'red'     },
  { cohort: 'Communications 26-A',           note: 'Sep 8 · both assigned to A Watch by default',       count: 2, status: '1 TRAINER',   tone: 'amber'   },
  { cohort: 'Lateral transfers — certified', note: 'Abbreviated 4-week program · Sep 2',                count: 2, status: 'READY',       tone: 'emerald' },
];

// ── Helpers ────────────────────────────────────────────────────

const pairingOf = (t) =>
  !t.trainer ? 'NO TRAINER' : t.trainerShift !== t.shift ? 'CROSS-SHIFT' : 'PAIRED';

const pairingTone = { PAIRED: 'text-emerald-400', 'CROSS-SHIFT': 'text-red-400', 'NO TRAINER': 'text-red-400' };

const kindTone = {
  ASSIGN:    'border-red-500/60 text-red-400',
  AUTHORIZE: 'border-emerald-500/60 text-emerald-400',
  ADVANCE:   'border-emerald-500/60 text-emerald-400',
  REMEDIAL:  'border-amber-500/60 text-amber-400',
  BOARD:     'border-red-500/60 text-red-400',
};

const dotTone = { emerald: 'bg-emerald-400', amber: 'bg-amber-400', red: 'bg-red-500', slate: 'bg-slate-600' };
const textTone = { emerald: 'text-emerald-400', amber: 'text-amber-400', red: 'text-red-400', slate: 'text-slate-400' };
const barTone = { red: 'bg-red-500', amber: 'bg-amber-400', slate: 'bg-slate-600', emerald: 'bg-emerald-500' };

const dorTone = (d) => (d === null ? 'text-slate-600' : d < BELOW_STANDARD ? 'text-red-400' : d >= 5 ? 'text-emerald-400' : 'text-slate-300');

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

export default function NewHireOnboarding() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('All');

  // ── Pairings ────────────────────────────────────────────────
  const withPairing = trainees.map((t) => ({ ...t, pairing: pairingOf(t) }));
  const holding = withPairing.filter((t) => t.pairing === 'PAIRED').length;
  const noTrainer = withPairing.filter((t) => t.pairing === 'NO TRAINER').length;
  const crossShift = withPairing.filter((t) => t.pairing === 'CROSS-SHIFT').length;
  const notPaired = noTrainer + crossShift;
  const belowStandard = withPairing.filter((t) => t.dor !== null && t.dor < BELOW_STANDARD).length;

  const tabs = [
    { id: 'All',            label: 'All',            n: withPairing.length },
    { id: 'Not paired',     label: 'Not paired',     n: notPaired },
    { id: 'Below standard', label: 'Below standard', n: belowStandard },
    { id: 'Decision due',   label: 'Decision due',   n: decisions.length },
  ];
  const decisionNames = new Set(decisions.map((d) => d.title.split('— ')[1]));
  const shown = withPairing.filter((t) =>
    tab === 'All' ? true
      : tab === 'Not paired' ? t.pairing !== 'PAIRED'
        : tab === 'Below standard' ? t.dor !== null && t.dor < BELOW_STANDARD
          : decisionNames.has(t.name));

  // ── Reports and gaps ────────────────────────────────────────
  const unreviewed = reports.length;
  const gapShifts = notFiled.reduce((a, r) => a + r.shifts, 0);
  const lostTotal = lostDays.reduce((a, r) => a + r.days, 0);
  const lostMax = Math.max(...lostDays.map((r) => r.days));

  // ── Trainer capacity ────────────────────────────────────────
  const slotsUsed = trainers.reduce((a, t) => a + t.used, 0);
  const slotsTotal = trainers.length * SLOTS_PER_TRAINER;
  const slotsFree = slotsTotal - slotsUsed;

  // ── Clocks ──────────────────────────────────────────────────
  const dueThisWeek = documentation.filter((d) => d.days <= 7).length;
  const irreversibleSoon = decisions.filter((d) => d.days <= 2).length;
  const arrivingTotal = arriving.reduce((a, c) => a + c.count, 0);

  return (
    <DashboardLayout navigation={hrNavigation} profile={hrProfile} notifications={hrNotifications} settingsRoute="/hr/settings" profileRoute="/hr/profile" activityRoute="/hr/activity" activityModuleFilter="hr">
      <div className="min-h-full bg-[#0A0A0B] px-6 py-8">
        <div className="max-w-[1600px] mx-auto">

          {/* ── Header ─────────────────────────────────────── */}
          <div className="flex flex-col lg:flex-row lg:items-center gap-3 lg:gap-4">
            <div className="flex items-baseline gap-3 flex-wrap">
              <h1 className="text-[19px] font-bold text-slate-100">Field Training</h1>
              <span className="text-[11px] text-slate-500">
                Field training from academy graduation to solo authorization · {trainees.length} trainees ·
                {' '}{trainers.length} certified trainers across 10 shifts
              </span>
            </div>
            <div className="flex items-center gap-2.5 lg:ml-auto flex-wrap">
              <button className="px-3.5 py-2 border border-amber-500/60 bg-amber-500/10 rounded-lg text-[11.5px] font-semibold text-amber-400 hover:bg-amber-500/20 transition-colors">
                Resolve today&rsquo;s pairings
              </button>
              <button
                onClick={() => window.print()}
                className="px-3.5 py-2 border border-slate-700/60 rounded-lg text-[11.5px] font-semibold text-slate-200 hover:bg-zinc-900/60 transition-colors"
              >
                Lost-day memo
              </button>
            </div>
          </div>

          {/* ── At-risk banner ─────────────────────────────── */}
          <div className="mt-4 border border-red-500/40 bg-red-500/[0.07] rounded-xl px-5 py-3.5 flex items-baseline gap-4 flex-wrap">
            <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-red-400 flex-shrink-0">Training day at risk</span>
            <p className="text-[12px] text-slate-200 flex-1 min-w-[320px] leading-relaxed">
              {notPaired} of {trainees.length} trainees have no certified trainer on their shift today — {noTrainer} with none
              assigned at all and {crossShift} paired across shifts. {gapShifts} shifts this month produced no observation report.
            </p>
            <span className="text-[10.5px] font-mono text-slate-500 flex-shrink-0">
              {holding} of {trainees.length} pairings hold
            </span>
          </div>

          {/* ── Metrics ────────────────────────────────────── */}
          <div className="mt-4 border border-slate-800/80 rounded-xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-800/60">
            <div className="px-5 py-4">
              <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500" />Pairings holding today
              </p>
              <p className="leading-none">
                <span className="text-[24px] font-bold text-red-400">{holding} of {trainees.length}</span>
                <span className="text-[11.5px] text-slate-400 ml-2">trainees</span>
              </p>
              <p className="text-[10.5px] text-amber-400/90 mt-2">{noTrainer} with no trainer · {crossShift} cross-shift</p>
            </div>
            <div className="px-5 py-4">
              <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />Reports to review
              </p>
              <p className="leading-none">
                <span className="text-[24px] font-bold text-amber-400">{unreviewed}</span>
                <span className="text-[11.5px] text-slate-400 ml-2">filed yesterday</span>
              </p>
              <p className="text-[10.5px] text-amber-400/90 mt-2">{gapShifts} shifts this month produced no report at all</p>
            </div>
            <div className="px-5 py-4">
              <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500" />Lost training days
              </p>
              <p className="leading-none">
                <span className="text-[24px] font-bold text-amber-400">{lostTotal}</span>
                <span className="text-[11.5px] text-slate-400 ml-2">this month</span>
              </p>
              <p className="text-[10.5px] text-amber-400/90 mt-2">
                roughly {Math.round(lostTotal / trainees.length)} trainees standing down for August
              </p>
            </div>
            <div className="px-5 py-4">
              <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />Decisions on my desk
              </p>
              <p className="leading-none">
                <span className="text-[24px] font-bold text-amber-400">{decisions.length}</span>
                <span className="text-[11.5px] text-slate-400 ml-2">this week</span>
              </p>
              <p className="text-[10.5px] text-amber-400/90 mt-2">{irreversibleSoon} become irreversible within 48 hours</p>
            </div>
          </div>

          {/* ── Today's pairings ───────────────────────────── */}
          <div className="mt-7">
            <SectionLabel right={
              <span className="flex items-center gap-4 flex-wrap">
                {tabs.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTab(t.id)}
                    className={`text-[11px] transition-colors ${
                      tab === t.id ? 'text-slate-100 font-semibold underline underline-offset-4' : 'text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    {t.label} <span className="font-mono text-slate-500">{t.n}</span>
                  </button>
                ))}
              </span>
            }>
              Today&rsquo;s pairings — Thursday, Aug 13
            </SectionLabel>

            <div className="flex items-end gap-3 pb-2 border-b border-slate-800/70 pl-3 text-[9px] font-bold uppercase tracking-[0.12em] text-slate-500">
              <span className="flex-1 min-w-0">Trainee</span>
              <span className="w-36 flex-shrink-0">Assignment</span>
              <span className="w-36 flex-shrink-0">Phase</span>
              <span className="w-32 flex-shrink-0">Field trainer</span>
              <span className="w-28 flex-shrink-0">Trainer shift</span>
              <span className="w-28 text-right flex-shrink-0">Pairing today</span>
              <span className="w-16 text-right flex-shrink-0">DOR avg</span>
            </div>
            <div className="divide-y divide-slate-800/50">
              {shown.map((t) => {
                const cross = t.pairing === 'CROSS-SHIFT';
                const none = t.pairing === 'NO TRAINER';
                return (
                  <div key={t.id} className={`flex items-center gap-3 py-3 pl-3 border-l-2 ${
                    none || cross ? 'border-red-500/70' : t.noteTone === 'amber' ? 'border-amber-500/60' : 'border-transparent'
                  }`}>
                    <div className="flex-1 min-w-0">
                      <span className="flex items-baseline gap-2">
                        <span className="text-[12.5px] font-semibold text-slate-100">{t.name}</span>
                        <span className="text-[10px] font-mono text-slate-500">{t.id}</span>
                      </span>
                      <p className={`text-[10px] truncate mt-0.5 ${
                        t.noteTone === 'red' ? 'text-red-400/90' : t.noteTone === 'amber' ? 'text-amber-400/80' : 'text-slate-500'
                      }`}>{t.note}</p>
                    </div>
                    <span className="w-36 text-[11px] text-slate-300 flex-shrink-0 truncate">{t.assignment}</span>
                    <span className="w-36 flex-shrink-0">
                      <span className="block text-[11px] text-slate-200 truncate">{t.phase}</span>
                      <span className="block text-[10px] font-mono text-slate-500">wk {t.week}/{t.ofWeeks}</span>
                    </span>
                    <span className={`w-32 text-[11px] flex-shrink-0 truncate ${none ? 'text-red-400' : 'text-slate-300'}`}>
                      {t.trainer ?? '— none assigned'}
                    </span>
                    <span className={`w-28 text-[11px] flex-shrink-0 truncate ${cross ? 'text-red-400' : 'text-slate-400'}`}>
                      {t.trainerShift ?? '—'}
                    </span>
                    <span className={`w-28 text-right text-[10.5px] font-bold tracking-wider flex-shrink-0 ${pairingTone[t.pairing]}`}>
                      {t.pairing}
                    </span>
                    <span className={`w-16 text-right text-[11.5px] font-mono flex-shrink-0 ${dorTone(t.dor)}`}>
                      {t.dor === null ? '—' : t.dor.toFixed(1)}
                    </span>
                  </div>
                );
              })}
            </div>
            <p className="text-[10px] text-slate-500 mt-3 leading-relaxed">
              A pairing holds only when a certified trainer works the trainee&rsquo;s shift. A shift spent with an uncertified
              officer produces no report and does not count toward the phase.
            </p>
          </div>

          {/* ── Main grid ──────────────────────────────────── */}
          <div className="mt-7 grid grid-cols-1 xl:grid-cols-2 gap-8">

            {/* ══ Left column ═══════════════════════════════ */}
            <div>
              {/* Observation reports */}
              <SectionLabel right={<span className="text-[10px] text-amber-400/90">{unreviewed} of {reports.length} unreviewed</span>}>
                Observation reports — Wednesday, Aug 12
              </SectionLabel>
              <div className="space-y-2.5">
                {reports.map((r) => {
                  const below = r.score < BELOW_STANDARD;
                  return (
                    <div key={r.trainee} className={`border rounded-xl px-4 py-3.5 ${below ? 'border-red-500/50' : 'border-slate-800/80'}`}>
                      <div className="flex items-baseline gap-2.5">
                        <p className="text-[12.5px] font-bold text-slate-100">{r.trainee}</p>
                        <span className="text-[10.5px] text-slate-500 truncate">{r.context}</span>
                        <span className={`ml-auto text-[12.5px] font-mono font-bold flex-shrink-0 ${dorTone(r.score)}`}>{r.score.toFixed(1)}</span>
                      </div>
                      {r.flag && (
                        <p className="flex items-baseline gap-2 mt-2 flex-wrap">
                          <span className="border border-red-500/60 rounded px-1.5 py-0.5 text-[9px] font-bold tracking-wider text-red-400">BELOW STANDARD</span>
                          <span className="text-[11px] text-amber-400">{r.flag}</span>
                        </p>
                      )}
                      <p className="text-[11.5px] text-slate-300 leading-relaxed mt-2">{r.text}</p>
                      <div className="flex items-center gap-2.5 mt-3 flex-wrap">
                        <span className="text-[10px] text-slate-600">{r.filed}</span>
                        <span className="ml-auto flex items-center gap-2">
                          <button className="px-2.5 py-1 border border-slate-700/60 rounded text-[10.5px] font-semibold text-slate-200 hover:bg-zinc-900/60 transition-colors">Mark reviewed</button>
                          {r.action && (
                            <button className="px-2.5 py-1 border border-amber-500/60 rounded text-[10.5px] font-semibold text-amber-400 hover:bg-amber-500/10 transition-colors">{r.action}</button>
                          )}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Not filed */}
              <div className="mt-7">
                <SectionLabel right={<span className="text-[10px] text-slate-500">{notFiled.length} trainees · {gapShifts} shifts this month</span>}>
                  <span className="text-red-400">Not filed</span>
                </SectionLabel>
                <div className="divide-y divide-slate-800/50">
                  {notFiled.map((r) => (
                    <div key={r.trainee} className="flex items-center gap-3 py-3 pl-3 border-l-2 border-red-500/70">
                      <div className="flex-1 min-w-0">
                        <p className="text-[12.5px] font-semibold text-slate-100 truncate">{r.trainee}</p>
                        <p className="text-[10.5px] text-amber-400/80 truncate">{r.reason}</p>
                      </div>
                      <span className="w-32 text-[11px] text-slate-400 flex-shrink-0 truncate">{r.trainer}</span>
                      <span className="w-20 text-right text-[11.5px] font-mono font-bold text-red-400 flex-shrink-0">{r.shifts} shifts</span>
                    </div>
                  ))}
                </div>
                <p className="text-[10px] text-slate-500 mt-3 leading-relaxed">
                  A shift with no observation report cannot be reconstructed later. Gaps in a training file are what a
                  wrongful-termination claim is built on.
                </p>
              </div>

              {/* Decisions */}
              <div className="mt-7">
                <SectionLabel right={<span className="text-[10px] text-red-400/90">{irreversibleSoon} within 48 hours</span>}>
                  Decisions on my desk
                </SectionLabel>
                <div className="space-y-2.5">
                  {decisions.map((d) => (
                    <div key={d.title} className={`border-l-2 pl-4 py-1 ${d.days <= 2 ? 'border-red-500/70' : 'border-slate-700'}`}>
                      <div className="flex items-baseline gap-2.5 flex-wrap">
                        <span className={`border rounded px-1.5 py-0.5 text-[9px] font-bold tracking-wider ${kindTone[d.kind]}`}>{d.kind}</span>
                        <p className="text-[12.5px] font-bold text-slate-100">{d.title}</p>
                        <span className={`ml-auto text-[11px] font-mono flex-shrink-0 ${d.days === 0 ? 'text-red-400' : d.days <= 2 ? 'text-amber-400' : 'text-slate-500'}`}>
                          {d.days === 0 ? 'today' : `${d.days}d`}
                        </span>
                      </div>
                      <p className="text-[11.5px] text-slate-300 leading-relaxed mt-1.5">{d.body}</p>
                      <p className="text-[10px] text-slate-600 mt-1.5">{d.route}</p>
                    </div>
                  ))}
                </div>
                <p className="text-[10px] text-slate-500 mt-3">
                  Ordered by the date the decision becomes irreversible, not by when it was raised.
                </p>
              </div>
            </div>

            {/* ══ Right column ══════════════════════════════ */}
            <div>
              {/* Lost training days */}
              <SectionLabel right={<span className="text-[10px] text-slate-500">{lostTotal} days</span>}>
                Lost training days — August
              </SectionLabel>
              <div className="divide-y divide-slate-800/50">
                {lostDays.map((r) => (
                  <div key={r.cause} className="py-3">
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="text-[12.5px] text-slate-100 min-w-0 truncate">{r.cause}</span>
                      <span className={`text-[12.5px] font-mono font-bold flex-shrink-0 ${textTone[r.tone]}`}>{r.days}</span>
                    </div>
                    <span className="block mt-2"><Meter value={(r.days / lostMax) * 100} tone={barTone[r.tone]} /></span>
                    <p className="text-[10.5px] text-slate-500 mt-1.5">{r.note}</p>
                  </div>
                ))}
              </div>
              <p className="text-[10px] text-slate-500 mt-2.5 leading-relaxed">
                {lostTotal} lost days across {trainees.length} trainees in thirteen days. Every lost day extends the program
                while the probation clock keeps running.
              </p>

              {/* Certified trainers */}
              <div className="mt-7">
                <SectionLabel right={
                  <span className="text-[10px] text-red-400/90">
                    {slotsUsed} of {slotsTotal} slots · {UNCOVERED_SHIFTS.length} shifts uncovered
                  </span>
                }>
                  Certified trainers
                </SectionLabel>
                <div className="divide-y divide-slate-800/50">
                  {trainers.map((t) => (
                    <div key={t.name} className={`flex items-center gap-3 py-3 pl-3 border-l-2 ${t.split ? 'border-amber-500/60' : 'border-transparent'}`}>
                      <div className="flex-1 min-w-0">
                        <span className="flex items-baseline gap-2">
                          <span className="text-[12.5px] font-semibold text-slate-100">{t.name}</span>
                          <span className="text-[10.5px] text-slate-500 truncate">{t.assignment}</span>
                        </span>
                        <p className={`text-[10.5px] truncate mt-0.5 ${t.split ? 'text-amber-400/80' : 'text-slate-500'}`}>{t.carrying}</p>
                      </div>
                      <span className={`w-14 text-right text-[11.5px] font-mono flex-shrink-0 ${
                        t.used >= SLOTS_PER_TRAINER ? 'text-slate-200' : 'text-emerald-400'
                      }`}>
                        {t.used} / {SLOTS_PER_TRAINER}
                      </span>
                      <span className={`w-20 text-right text-[11px] font-mono flex-shrink-0 ${t.recertSoon ? 'text-amber-400' : 'text-slate-500'}`}>
                        {t.recert}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="text-[10px] text-slate-500 mt-2.5 leading-relaxed">
                  Capacity is not the constraint — {trainers.length} trainers at {SLOTS_PER_TRAINER} trainees each covers all
                  {' '}{trainers.length * SLOTS_PER_TRAINER}. The constraint is distribution: {UNCOVERED_SHIFTS.join(', ')} have
                  no certified trainer at all.
                </p>
              </div>

              {/* Documentation clock */}
              <div className="mt-7">
                <SectionLabel right={<span className="text-[10px] text-amber-400/90">{dueThisWeek} due this week</span>}>
                  Documentation clock
                </SectionLabel>
                <div className="space-y-2.5">
                  {documentation.map((d) => (
                    <div key={d.item} className={`border-l-2 pl-3.5 ${d.tone === 'red' ? 'border-red-500/70' : d.tone === 'amber' ? 'border-amber-500/60' : 'border-slate-700'}`}>
                      <div className="flex items-baseline gap-3">
                        <p className="text-[12px] font-semibold text-slate-100 flex-1 min-w-0">{d.item}</p>
                        <span className={`text-[11px] font-mono flex-shrink-0 ${textTone[d.tone]}`}>{d.due}</span>
                      </div>
                      <p className={`text-[10.5px] leading-relaxed mt-0.5 ${d.tone === 'red' ? 'text-red-400/90' : d.tone === 'amber' ? 'text-amber-400/80' : 'text-slate-500'}`}>
                        {d.note}
                      </p>
                    </div>
                  ))}
                </div>
                <p className="text-[10px] text-slate-500 mt-2.5 leading-relaxed">
                  Policy 5.7 requires a written remedial plan before any release for failure to progress, and a signed review at
                  30 days.
                </p>
              </div>

              {/* Arriving */}
              <div className="mt-7">
                <SectionLabel right={<span className="text-[10px] text-amber-400/90">{arrivingTotal} arriving · {slotsFree} slot free</span>}>
                  Arriving — next 30 days
                </SectionLabel>
                <div className="divide-y divide-slate-800/50">
                  {arriving.map((c) => (
                    <div key={c.cohort} className="flex items-center gap-3 py-3">
                      <div className="flex-1 min-w-0">
                        <p className="text-[12.5px] font-semibold text-slate-100 truncate">{c.cohort}</p>
                        <p className={`text-[10.5px] truncate ${c.tone === 'red' ? 'text-red-400/90' : c.tone === 'amber' ? 'text-amber-400/80' : 'text-slate-500'}`}>
                          {c.note}
                        </p>
                      </div>
                      <span className="w-8 text-right text-[13px] font-mono font-bold text-slate-100 flex-shrink-0">{c.count}</span>
                      <span className={`w-28 text-right text-[10.5px] font-bold tracking-wider flex-shrink-0 ${textTone[c.tone]}`}>{c.status}</span>
                    </div>
                  ))}
                </div>
                <p className="text-[10px] text-slate-500 mt-2.5 leading-relaxed">
                  {arrivingTotal} arrivals in thirty days against {slotsFree} free trainer slot. Certifying trainers on Shift D,
                  Watch 3, and C Watch has to precede the September cohorts.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

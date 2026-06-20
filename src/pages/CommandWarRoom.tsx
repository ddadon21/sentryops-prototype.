import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';
import {
  Users, AlertTriangle, Radio, Target, Award,
  Circle, RefreshCw, Sparkles, AlertOctagon,
  MapPin, ChevronRight, Activity,
  Layers, ArrowRight, CheckCircle, Brain,
} from 'lucide-react';

// ── Types ─────────────────────────────────────────────────────

interface DivisionReadiness {
  name: string;
  bureau: string;
  authorized: number;
  filled: number;
  onDuty: number;
  vacancies: number;
  certRisk: number;
  status: 'Operational' | 'Reduced' | 'Critical';
  actingSupervisor?: boolean;
}

interface PatrolBeat {
  id: string;
  name: string;
  zone: string;
  units: number;
  required: number;
  primaryUnit: string;
  status: 'Covered' | 'Thin' | 'Uncovered';
  activeCall?: string;
}

interface CertAlert {
  deputy: string;
  badge: string;
  cert: string;
  expiresIn: number;
  severity: 'critical' | 'warning' | 'watch';
}

interface Deployment {
  name: string;
  type: string;
  personnel: number;
  lead: string;
  status: 'Active' | 'Staged' | 'En Route' | 'Completed';
  location: string;
  since: string;
}

interface CommandAlert {
  id: number;
  severity: 'critical' | 'warning' | 'info';
  title: string;
  detail: string;
  time: string;
  module: string;
}

// ── Static data ────────────────────────────────────────────────

const commandSnapshot = {
  authorizedStrength: 502,
  filled: 487,
  onDuty: 312,
  patrolCoverage: 89,
  certRiskCount: 14,
  openVacancies: 15,
  activeAlerts: 7,
  criticalAlerts: 2,
  activeDeployments: 8,
  mutualAidOut: 3,
  shiftHealth: 91,
  staffingReadiness: 92,
  coverageReadiness: 78,
  deploymentReadiness: 96,
  incidentLoad: 67,
  lastUpdated: '07:42',
};

const divisions: DivisionReadiness[] = [
  { name: 'Patrol Div. Alpha',       bureau: 'Field Ops',      authorized: 84, filled: 81, onDuty: 56, vacancies: 3, certRisk: 4, status: 'Operational' },
  { name: 'Patrol Div. Bravo',       bureau: 'Field Ops',      authorized: 80, filled: 74, onDuty: 48, vacancies: 6, certRisk: 3, status: 'Reduced', actingSupervisor: true },
  { name: 'Criminal Investigations', bureau: 'Investigations', authorized: 42, filled: 39, onDuty: 28, vacancies: 3, certRisk: 2, status: 'Operational' },
  { name: 'Special Operations',      bureau: 'Field Ops',      authorized: 28, filled: 26, onDuty: 22, vacancies: 2, certRisk: 1, status: 'Operational' },
  { name: 'Detention Operations',    bureau: 'Detention',      authorized: 96, filled: 92, onDuty: 71, vacancies: 4, certRisk: 2, status: 'Operational' },
  { name: 'Court Services',          bureau: 'Detention',      authorized: 38, filled: 34, onDuty: 26, vacancies: 4, certRisk: 1, status: 'Reduced' },
  { name: 'Admin & Support',         bureau: 'Admin',          authorized: 56, filled: 54, onDuty: 41, vacancies: 2, certRisk: 1, status: 'Operational' },
  { name: 'Community Affairs',       bureau: 'Field Ops',      authorized: 24, filled: 22, onDuty: 14, vacancies: 2, certRisk: 0, status: 'Reduced', actingSupervisor: true },
  { name: 'Traffic Enforcement',     bureau: 'Field Ops',      authorized: 36, filled: 33, onDuty: 21, vacancies: 3, certRisk: 0, status: 'Operational' },
];

const beats: PatrolBeat[] = [
  { id: 'B1', name: 'Beat 1 – North',   zone: 'Alpha', units: 3, required: 3, primaryUnit: 'Alpha-12', status: 'Covered' },
  { id: 'B2', name: 'Beat 2 – NE Quad', zone: 'Alpha', units: 2, required: 3, primaryUnit: 'Alpha-21', status: 'Thin',      activeCall: 'P2 active' },
  { id: 'B3', name: 'Beat 3 – Central', zone: 'Alpha', units: 3, required: 3, primaryUnit: 'Alpha-31', status: 'Covered' },
  { id: 'B4', name: 'Beat 4 – East',    zone: 'Bravo', units: 2, required: 2, primaryUnit: 'Bravo-41', status: 'Covered' },
  { id: 'B5', name: 'Beat 5 – SE Quad', zone: 'Bravo', units: 1, required: 2, primaryUnit: 'Bravo-51', status: 'Thin',      activeCall: 'Pursuit cleared' },
  { id: 'B6', name: 'Beat 6 – South',   zone: 'Bravo', units: 2, required: 2, primaryUnit: 'Bravo-61', status: 'Covered' },
  { id: 'B7', name: 'Beat 7 – West',    zone: 'Alpha', units: 0, required: 2, primaryUnit: '—',        status: 'Uncovered', activeCall: 'No units assigned' },
];

const certAlerts: CertAlert[] = [
  { deputy: 'Sgt. Rivera, M.',  badge: '1042', cert: 'Firearms Qualification', expiresIn: 4,  severity: 'critical' },
  { deputy: 'Dep. Chen, K.',    badge: '2081', cert: 'POST Basic',             expiresIn: 6,  severity: 'critical' },
  { deputy: 'Dep. Wallace, T.', badge: '2204', cert: 'Defensive Tactics',      expiresIn: 12, severity: 'warning' },
  { deputy: 'Dep. Okafor, S.',  badge: '2317', cert: 'Taser / CEW',            expiresIn: 14, severity: 'warning' },
  { deputy: 'Dep. Nguyen, L.',  badge: '2456', cert: 'First Aid / CPR',        expiresIn: 18, severity: 'warning' },
  { deputy: 'Lt. Harrison, D.', badge: '1015', cert: 'Command Leadership',     expiresIn: 22, severity: 'warning' },
];

const deployments: Deployment[] = [
  { name: 'Metro Fugitive Task Force',  type: 'Task Force',    personnel: 6,  lead: 'Det. Ortiz',  status: 'Active',   location: 'Multi-Jurisdiction', since: 'D-5' },
  { name: 'Downtown Security Detail',   type: 'Special Ops',   personnel: 8,  lead: 'Sgt. Patel',  status: 'Active',   location: 'Downtown District',  since: 'D-1' },
  { name: 'Court Transport – Superior', type: 'Court Ops',     personnel: 4,  lead: 'Dep. Flores', status: 'En Route', location: 'Superior Ct.',       since: '06:30' },
  { name: 'Gang Intel Surveillance',    type: 'Investigations', personnel: 3, lead: 'Det. Kim',    status: 'Active',   location: 'East Sector',        since: 'D-3' },
  { name: 'Mutual Aid – Northside PD',  type: 'Mutual Aid',    personnel: 4,  lead: 'Sgt. Walker', status: 'Active',   location: 'Northside PD AOR',   since: 'D-0' },
  { name: 'Warrant Sweep – Alpha Div.', type: 'Special Ops',   personnel: 12, lead: 'Lt. Grant',   status: 'Staged',   location: 'NE Quad Staging',    since: '07:00' },
];

const alerts: CommandAlert[] = [
  { id: 1, severity: 'critical', title: 'POST Cert Expiring — 4 Days',    detail: 'Sgt. Rivera #1042 firearms cert. Auto-restricted on day 0.',     time: '07:30', module: 'HR / Compliance' },
  { id: 2, severity: 'critical', title: 'Beat 7 West — Zero Coverage',    detail: 'Both units pulled for warrant sweep. Divert Alpha-12.',           time: '07:15', module: 'Patrol Ops' },
  { id: 3, severity: 'warning',  title: 'Bravo Division Understaffed',    detail: 'Acting supervisor in place. 6 vacancies. B-Shift at 73% cap.',    time: '06:50', module: 'Staffing' },
  { id: 4, severity: 'warning',  title: '14 Certs Expiring in 30 Days',   detail: '2 critical, 4 warning. Schedule remediation before month end.',   time: '06:00', module: 'HR / Training' },
  { id: 5, severity: 'warning',  title: 'Detention E-Pod Near Capacity',  detail: 'Medical pod at 92%. 3 isolation rooms active.',                   time: '05:45', module: 'Detention' },
  { id: 6, severity: 'info',     title: 'Warrant Sweep Staged – Alpha NE', detail: '12 deputies staged. Window: 08:00–12:00. SAC: Lt. Grant.',       time: '07:00', module: 'Special Ops' },
  { id: 7, severity: 'info',     title: 'Mutual Aid Request Approved',     detail: 'Northside PD — 4 deputies for Saturday 18:00–23:00.',            time: '04:30', module: 'Command' },
];

// ── Helpers ───────────────────────────────────────────────────

function getDivisionColors(status: DivisionReadiness['status']) {
  if (status === 'Critical') return { badge: 'bg-red-500/15 text-red-700 dark:text-red-400 border border-red-500/25',       dot: 'bg-red-500' };
  if (status === 'Reduced')  return { badge: 'bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-500/25', dot: 'bg-amber-400' };
  return { badge: 'bg-slate-100 dark:bg-zinc-800/30 text-secondary border border-border', dot: 'bg-slate-400' };
}

function getCertColors(severity: CertAlert['severity']) {
  if (severity === 'critical') return { row: 'border-l-2 border-l-red-500/70',   badge: 'bg-red-500/15 text-red-700 dark:text-red-400 border border-red-500/20',    days: 'text-red-700 dark:text-red-400 font-bold' };
  if (severity === 'warning')  return { row: 'border-l-2 border-l-amber-500/60', badge: 'bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-500/20', days: 'text-amber-700 dark:text-amber-400 font-semibold' };
  return { row: '', badge: 'bg-slate-100 dark:bg-zinc-800/30 text-secondary border border-border', days: 'text-slate-500' };
}

function getDeploymentStatusColors(status: Deployment['status']) {
  if (status === 'Active')   return 'bg-emerald-100 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20';
  if (status === 'En Route') return 'bg-blue-100 dark:bg-blue-500/15 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-500/20';
  if (status === 'Staged')   return 'bg-amber-100 dark:bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-500/20';
  return 'bg-slate-100 dark:bg-zinc-600/15 text-secondary border border-slate-200 dark:border-slate-500/20';
}

function getAlertColors(severity: CommandAlert['severity']) {
  if (severity === 'critical') return { border: 'border-l-red-500',   icon: 'text-red-700 dark:text-red-400',     label: 'bg-red-500/15 text-red-700 dark:text-red-400 border border-red-500/20' };
  if (severity === 'warning')  return { border: 'border-l-amber-500', icon: 'text-amber-700 dark:text-amber-400', label: 'bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-500/20' };
  return { border: 'border-l-slate-300 dark:border-l-slate-700', icon: 'text-slate-500', label: 'bg-slate-100 dark:bg-zinc-800/30 text-slate-700 dark:text-slate-500 border border-border' };
}

// ── Sub-components ─────────────────────────────────────────────

function ShiftHealthBar() {
  const s = commandSnapshot;
  const score = s.shiftHealth;
  const scoreColor = score >= 90 ? 'text-emerald-400' : score >= 75 ? 'text-amber-400' : 'text-red-400';
  const dotColor   = score >= 90 ? 'bg-emerald-500'  : score >= 75 ? 'bg-amber-400'   : 'bg-red-500';

  const metrics = [
    { label: 'Staffing',             value: `${s.staffingReadiness}%`,   ok: s.staffingReadiness >= 85 },
    { label: 'Patrol Coverage',      value: `${s.patrolCoverage}%`,      ok: s.patrolCoverage >= 90 },
    { label: 'Active Deployments',   value: `${s.activeDeployments}`,    ok: true },
    { label: 'Deployment Readiness', value: `${s.deploymentReadiness}%`, ok: true },
    { label: 'Critical Alerts',      value: `${s.criticalAlerts}`,       ok: s.criticalAlerts === 0 },
  ];

  return (
    <div className="bg-slate-900 dark:bg-black/80 border border-slate-700/50 rounded-xl px-5 py-3.5">
      <div className="flex items-center gap-5 flex-wrap">
        {/* Score */}
        <div className="flex items-center gap-3 min-w-fit">
          <div className={`w-2.5 h-2.5 rounded-full ${dotColor} ring-4 ring-current/20`} />
          <div>
            <span className="text-[10px] text-slate-400 uppercase tracking-widest">Operational Readiness</span>
            <div className={`text-[26px] font-black leading-none ${scoreColor}`}>{score}%</div>
          </div>
        </div>

        <div className="h-10 w-px bg-slate-700/60 hidden sm:block" />

        {/* Sub-metrics */}
        <div className="flex items-center gap-6 flex-wrap flex-1">
          {metrics.map(m => (
            <div key={m.label}>
              <span className="text-[10px] text-slate-500 uppercase tracking-wide block">{m.label}</span>
              <span className={`text-[15px] font-bold leading-tight ${m.ok ? 'text-slate-200' : 'text-red-400'}`}>{m.value}</span>
            </div>
          ))}
        </div>

        {/* Live pill */}
        <div className="flex items-center gap-2 ml-auto flex-shrink-0">
          <Circle className="w-1.5 h-1.5 fill-emerald-500 text-emerald-500" />
          <span className="text-[11px] text-slate-500">Live · {s.lastUpdated}</span>
          <button className="flex items-center gap-1 text-[11px] text-slate-500 hover:text-slate-300 transition-colors ml-2">
            <RefreshCw className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
}

function LiveOpsMap({ beats: bs }: { beats: PatrolBeat[] }) {
  const bm = Object.fromEntries(bs.map(b => [b.id, b]));

  // 3×3 grid layout: rows represent N→S, cols represent W→E / zone split
  const grid: (PatrolBeat | null)[][] = [
    [bm['B7'], bm['B1'], bm['B4']],
    [null,     bm['B3'], bm['B5']],
    [null,     bm['B2'], bm['B6']],
  ];

  const cellBg = (s?: string) => {
    if (s === 'Uncovered') return 'bg-red-500/20 border-red-500/55';
    if (s === 'Thin')      return 'bg-amber-500/12 border-amber-500/40';
    return 'bg-emerald-500/8 border-emerald-500/25';
  };
  const unitColor = (s?: string) => {
    if (s === 'Uncovered') return 'text-red-400';
    if (s === 'Thin')      return 'text-amber-400';
    return 'text-emerald-400';
  };

  const facilityAlerts = [
    { color: 'bg-red-500',    label: 'Detention E-Pod: 92% capacity' },
    { color: 'bg-amber-400',  label: 'B2/B5: Priority calls active' },
    { color: 'bg-blue-400',   label: 'Warrant sweep staged NE Quad 08:00' },
  ];

  return (
    <div className="bg-white dark:bg-zinc-900/25 border border-border dark:border-slate-700/30 rounded-xl overflow-hidden flex flex-col">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 px-5 py-3 border-b border-border dark:border-slate-700/20">
        <div className="flex items-center gap-2 flex-wrap">
          <Layers className="w-4 h-4 text-secondary" />
          <span className="text-[13px] font-semibold text-primary">Live Operations Map</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-red-500/15 text-red-700 dark:text-red-400 border border-red-500/20">1 Uncovered</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-500/20">2 Thin</span>
        </div>
        <div className="flex items-center gap-3 text-[9px] text-slate-500 flex-wrap">
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-emerald-500/20 border border-emerald-500/40 inline-block" />Covered</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-amber-500/15 border border-amber-500/40 inline-block" />Thin</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-red-500/25 border border-red-500/55 inline-block" />Uncovered</span>
        </div>
      </div>

      <div className="p-3 flex-1">
        {/* Zone header */}
        <div className="grid grid-cols-3 gap-2 mb-1.5">
          <div className="col-span-1 text-[9px] text-slate-400 uppercase tracking-wider pl-1">West · Alpha</div>
          <div className="text-[9px] text-slate-400 uppercase tracking-wider text-center">Central · Alpha</div>
          <div className="text-[9px] text-slate-400 uppercase tracking-wider text-center">East · Bravo</div>
        </div>

        {/* Beat cells */}
        <div className="space-y-1.5">
          {grid.map((row, ri) => (
            <div key={ri} className="grid grid-cols-3 gap-1.5">
              {row.map((beat, ci) => {
                if (!beat) return <div key={ci} className="rounded-lg border border-transparent bg-slate-50 dark:bg-zinc-900/10" />;
                return (
                  <div key={beat.id} className={`rounded-lg border p-2 ${cellBg(beat.status)} relative`}>
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300">{beat.id}</span>
                      {beat.activeCall && <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />}
                    </div>
                    <p className="text-[9px] text-slate-500 leading-tight truncate">{beat.name.replace(/Beat \d+ – /, '')}</p>
                    <div className="flex items-center justify-between mt-1">
                      <span className={`text-[12px] font-bold ${unitColor(beat.status)}`}>{beat.units}/{beat.required}</span>
                      <MapPin className={`w-3 h-3 opacity-60 ${unitColor(beat.status)}`} />
                    </div>
                    {beat.status !== 'Covered' && beat.activeCall && (
                      <p className="text-[8.5px] text-amber-500 mt-0.5 truncate">{beat.activeCall}</p>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* Facility / incident alerts */}
        <div className="mt-3 pt-2.5 border-t border-border dark:border-slate-700/20 space-y-1">
          {facilityAlerts.map((fa) => (
            <div key={fa.label} className="flex items-center gap-2">
              <div className={`w-1.5 h-1.5 rounded-full ${fa.color} flex-shrink-0`} />
              <span className="text-[10px] text-slate-500">{fa.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function OperationalPriorities() {
  const items = [
    { icon: AlertOctagon, color: 'text-red-700 dark:text-red-400', bg: 'bg-red-500/8 border-red-500/20',    label: 'Beat 7 West — Zero coverage',          action: 'Divert Alpha-12 immediately',          time: '07:15' },
    { icon: AlertOctagon, color: 'text-red-700 dark:text-red-400', bg: 'bg-red-500/8 border-red-500/20',    label: 'POST cert critical — Sgt. Rivera #1042', action: 'Contact Training by 08:00',            time: '07:30' },
    { icon: AlertTriangle, color: 'text-amber-700 dark:text-amber-400', bg: 'bg-amber-500/8 border-amber-500/20', label: 'Bravo Div. acting supervisor + 6 vac.', action: 'Escalate to HR for priority recruiting', time: '06:50' },
    { icon: AlertTriangle, color: 'text-amber-700 dark:text-amber-400', bg: 'bg-amber-500/8 border-amber-500/20', label: '14 certs expiring within 30 days',       action: 'Schedule remediation block this week',  time: '06:00' },
    { icon: AlertTriangle, color: 'text-amber-700 dark:text-amber-400', bg: 'bg-amber-500/8 border-amber-500/20', label: 'Detention E-Pod at 92% capacity',        action: 'Review medical pod transfers',         time: '05:45' },
  ];

  return (
    <div className="bg-white dark:bg-zinc-900/25 border border-border dark:border-slate-700/30 rounded-xl overflow-hidden flex flex-col">
      <div className="flex items-center gap-2 px-5 py-3 border-b border-border dark:border-slate-700/20">
        <Target className="w-4 h-4 text-secondary" />
        <span className="text-[13px] font-semibold text-primary">Operational Priorities</span>
        <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-red-500/15 text-red-700 dark:text-red-400 border border-red-500/20 ml-auto">
          2 Critical
        </span>
      </div>
      <div className="divide-y divide-slate-700/10 flex-1">
        {items.map((item, i) => {
          const Icon = item.icon;
          return (
            <div key={i} className={`flex gap-3 px-4 py-2.5 border-l-2 ${i < 2 ? 'border-l-red-500/70' : 'border-l-amber-500/50'} hover:bg-slate-50 dark:hover:bg-zinc-800/10 transition-colors`}>
              <Icon className={`w-3.5 h-3.5 mt-0.5 flex-shrink-0 ${item.color}`} />
              <div className="flex-1 min-w-0">
                <p className="text-[11.5px] font-medium text-primary leading-tight">{item.label}</p>
                <p className="text-[10.5px] text-secondary mt-0.5 leading-tight">{item.action}</p>
              </div>
              <span className="text-[9px] text-slate-500 flex-shrink-0 mt-0.5">{item.time}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function AIOperationsAdvisor() {
  const risks = [
    { level: 'high',   text: 'Beat 7 has zero patrol coverage — AOR exposed to unmitigated response gaps.' },
    { level: 'high',   text: 'Sgt. Rivera cert expires in 4 days. Restricted-duty status activates automatically.' },
    { level: 'medium', text: 'Bravo Division running 2 acting supervisors — command continuity risk if incidents spike.' },
    { level: 'low',    text: 'E-Pod at 92% — one major intake event could exceed capacity and trigger ACA flags.' },
  ];

  const actions = [
    { icon: ArrowRight, label: 'Divert Alpha-12 to Beat 7', impact: 'Eliminates coverage gap in <8 min', urgency: 'now' },
    { icon: ArrowRight, label: 'Contact Training re Rivera cert', impact: 'Prevents forced restricted duty', urgency: 'today' },
    { icon: ArrowRight, label: 'Activate Bravo overtime roster', impact: 'Restores 92% div. capacity',      urgency: 'today' },
  ];

  const staffingRecs = [
    'Offer voluntary OT to Bravo off-duty pool (6 vacancies)',
    'Convert 2 Admin deputies to Patrol field coverage through EOW',
    'Request mutual aid reciprocal unit from Northside PD',
  ];

  const levelColor = (l: string) => l === 'high' ? 'bg-red-500' : l === 'medium' ? 'bg-amber-400' : 'bg-blue-400';

  return (
    <div className="bg-white dark:bg-zinc-900/25 border border-border dark:border-slate-700/30 rounded-xl overflow-hidden flex flex-col">
      <div className="flex items-center gap-2 px-5 py-3 border-b border-border dark:border-slate-700/20">
        <Brain className="w-4 h-4 text-secondary" />
        <span className="text-[13px] font-semibold text-primary">AI Operations Advisor</span>
        <Sparkles className="w-3 h-3 text-slate-400 ml-auto" />
      </div>

      <div className="p-4 space-y-4 flex-1 overflow-y-auto">
        {/* Current risks */}
        <div>
          <p className="text-[10px] uppercase tracking-widest text-slate-500 mb-2">Current Operational Risks</p>
          <div className="space-y-1.5">
            {risks.map((r, i) => (
              <div key={i} className="flex gap-2.5 items-start">
                <div className={`w-1.5 h-1.5 rounded-full ${levelColor(r.level)} flex-shrink-0 mt-1`} />
                <p className="text-[11px] text-secondary leading-snug">{r.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended actions */}
        <div>
          <p className="text-[10px] uppercase tracking-widest text-slate-500 mb-2">Recommended Actions</p>
          <div className="space-y-1.5">
            {actions.map((a, i) => {
              const Icon = a.icon;
              return (
                <div key={i} className={`flex items-start gap-2 rounded-lg p-2 ${a.urgency === 'now' ? 'bg-red-500/8 border border-red-500/20' : 'bg-slate-50 dark:bg-zinc-800/20 border border-border dark:border-slate-700/20'}`}>
                  <Icon className={`w-3 h-3 mt-0.5 flex-shrink-0 ${a.urgency === 'now' ? 'text-red-700 dark:text-red-400' : 'text-secondary'}`} />
                  <div>
                    <p className="text-[11px] font-medium text-primary">{a.label}</p>
                    <p className="text-[10px] text-secondary">{a.impact}</p>
                  </div>
                  <span className={`ml-auto text-[9px] uppercase tracking-wide flex-shrink-0 font-bold mt-0.5 ${a.urgency === 'now' ? 'text-red-500' : 'text-slate-500'}`}>{a.urgency}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Staffing recs */}
        <div>
          <p className="text-[10px] uppercase tracking-widest text-slate-500 mb-2">Staffing Recommendations</p>
          <div className="space-y-1.5">
            {staffingRecs.map((rec, i) => (
              <div key={i} className="flex gap-2 items-start">
                <CheckCircle className="w-3 h-3 text-emerald-500 flex-shrink-0 mt-0.5" />
                <p className="text-[11px] text-secondary leading-snug">{rec}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Estimated impact */}
        <div className="pt-2 border-t border-border dark:border-slate-700/20">
          <p className="text-[10px] uppercase tracking-widest text-slate-500 mb-1.5">Estimated Operational Impact</p>
          <div className="flex items-center justify-between text-[11px] text-secondary">
            <span>If top 3 actions taken:</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold">+11% shift health</span>
          </div>
          <div className="mt-1 w-full h-1.5 bg-slate-100 dark:bg-zinc-800/40 rounded-full overflow-hidden">
            <div className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400" style={{ width: '91%' }} />
          </div>
          <div className="flex justify-between text-[9px] text-slate-500 mt-0.5">
            <span>Current: 91%</span>
            <span>Projected: ~100%</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Component ─────────────────────────────────────────────────

export default function CommandWarRoom() {
  const navigate = useNavigate();

  // Patrol coverage metrics
  const covered   = beats.filter(b => b.status === 'Covered').length;
  const thin      = beats.filter(b => b.status === 'Thin').length;
  const uncovered = beats.filter(b => b.status === 'Uncovered').length;
  const totalUnits = beats.reduce((s, b) => s + b.units, 0);
  const requiredUnits = beats.reduce((s, b) => s + b.required, 0);

  const aiPatrolRecs = [
    { text: 'Divert Alpha-12 (B1) → Beat 7 West. B1 has 3 of 3 — nearest available surplus.', urgency: 'critical' },
    { text: 'Move Bravo-51 backup from B5 once pursuit closes. SE Quad will hold on primary.', urgency: 'warning' },
    { text: 'Hold warrant sweep start until B7 coverage restored (~08:15 revised window).', urgency: 'info' },
  ];

  return (
    <DashboardLayout>
      <div className="p-5 space-y-4">

        {/* ── Page Header ────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4">
          <div className="min-w-0">
            <h1 className="text-xl font-bold text-primary mb-0.5">Command War Room</h1>
            <p className="text-[11px] text-slate-500 break-words">Full-agency readiness cockpit · Gwinnett County Sheriff's Office</p>
          </div>
        </div>

        {/* ── Shift Health Score ─────────────────────────── */}
        <ShiftHealthBar />

        {/* ── Row A: Operational Priorities | Live Ops Map | AI Advisor ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <div className="lg:col-span-3">
            <OperationalPriorities />
          </div>
          <div className="lg:col-span-5">
            <LiveOpsMap beats={beats} />
          </div>
          <div className="lg:col-span-4">
            <AIOperationsAdvisor />
          </div>
        </div>

        {/* ── Row B: Enhanced Patrol Beat | Staffing Readiness ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">

          {/* Enhanced Patrol Beat Coverage */}
          <div className="lg:col-span-5 bg-white dark:bg-zinc-900/25 border border-border dark:border-slate-700/30 rounded-xl overflow-hidden">
            <div className="flex items-center justify-between gap-2 px-5 py-3 border-b border-border dark:border-slate-700/20">
              <div className="flex items-center gap-2 min-w-0">
                <Radio className="w-4 h-4 text-secondary flex-shrink-0" />
                <span className="text-[13px] font-semibold text-primary">Patrol Beat Coverage</span>
              </div>
              <button onClick={() => navigate('/patrol/cad')} className="flex items-center gap-1 text-[11px] text-slate-500 hover:text-secondary transition-colors flex-shrink-0">
                CAD <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Coverage stats */}
            <div className="grid grid-cols-4 gap-3 px-5 py-3 border-b border-border dark:border-slate-700/10">
              <div>
                <p className="text-[22px] font-black text-primary">{commandSnapshot.patrolCoverage}%</p>
                <p className="text-[10px] text-slate-500 uppercase tracking-wide">Coverage</p>
              </div>
              <div>
                <p className="text-[22px] font-black text-primary">{totalUnits}<span className="text-[12px] text-slate-500 font-normal">/{requiredUnits}</span></p>
                <p className="text-[10px] text-slate-500 uppercase tracking-wide">Units</p>
              </div>
              <div>
                <p className={`text-[22px] font-black ${uncovered > 0 ? 'text-red-700 dark:text-red-400' : 'text-slate-400'}`}>{uncovered}</p>
                <p className="text-[10px] text-slate-500 uppercase tracking-wide">Uncovered</p>
              </div>
              <div>
                <p className={`text-[22px] font-black ${thin > 0 ? 'text-amber-700 dark:text-amber-400' : 'text-slate-400'}`}>{thin}</p>
                <p className="text-[10px] text-slate-500 uppercase tracking-wide">Thin</p>
              </div>
            </div>

            {/* Coverage bar */}
            <div className="px-5 py-2 border-b border-border dark:border-slate-700/10">
              <div className="flex gap-0.5">
                {beats.map(b => (
                  <div key={b.id} className={`flex-1 h-2 rounded-full ${b.status === 'Covered' ? 'bg-emerald-500' : b.status === 'Thin' ? 'bg-amber-400' : 'bg-red-500'}`} title={`${b.name}: ${b.status}`} />
                ))}
              </div>
              <div className="flex items-center gap-3 mt-1.5">
                <span className="flex items-center gap-1 text-[10px] text-slate-500"><span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />{covered} covered</span>
                <span className="flex items-center gap-1 text-[10px] text-slate-500"><span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />{thin} thin</span>
                <span className="flex items-center gap-1 text-[10px] text-red-700 dark:text-red-400 font-medium"><span className="w-2 h-2 rounded-full bg-red-500 inline-block" />{uncovered} uncovered</span>
              </div>
            </div>

            {/* Beat list */}
            <div className="divide-y divide-slate-700/10 max-h-52 overflow-y-auto">
              {beats.map((beat) => {
                const isUncovered = beat.status === 'Uncovered';
                const isThin = beat.status === 'Thin';
                return (
                  <div key={beat.id} className={`flex items-center gap-3 px-5 py-2 ${isUncovered ? 'bg-red-500/5' : isThin ? 'bg-amber-500/5' : ''}`}>
                    <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${isUncovered ? 'bg-red-500' : isThin ? 'bg-amber-400' : 'bg-emerald-500'}`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-[12px] font-medium text-primary">{beat.name}</p>
                      <p className="text-[10px] text-slate-500">{beat.primaryUnit} · Zone {beat.zone}</p>
                    </div>
                    <span className={`text-[11px] font-bold ${isUncovered ? 'text-red-700 dark:text-red-400' : isThin ? 'text-amber-700 dark:text-amber-400' : 'text-slate-500'}`}>
                      {beat.units}/{beat.required}
                    </span>
                    {beat.activeCall && (
                      <span className="text-[9px] text-slate-500 max-w-[80px] truncate">{beat.activeCall}</span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* AI recommendations */}
            <div className="border-t border-border dark:border-slate-700/20 p-4 bg-slate-50 dark:bg-zinc-900/10 space-y-1.5">
              <p className="text-[10px] uppercase tracking-widest text-slate-500 mb-2">AI Reassignment Recommendations</p>
              {aiPatrolRecs.map((rec, i) => (
                <div key={i} className="flex gap-2 items-start">
                  <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1 ${rec.urgency === 'critical' ? 'bg-red-500' : rec.urgency === 'warning' ? 'bg-amber-400' : 'bg-blue-400'}`} />
                  <p className="text-[11px] text-secondary leading-snug">{rec.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Staffing Readiness by Division */}
          <div className="lg:col-span-7 bg-white dark:bg-zinc-900/25 border border-border dark:border-slate-700/30 rounded-xl overflow-hidden">
            <div className="flex items-center justify-between px-5 py-3 border-b border-border dark:border-slate-700/20">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-secondary" />
                <span className="text-[13px] font-semibold text-primary">Staffing Readiness by Division</span>
              </div>
              <button onClick={() => navigate('/command/personnel')} className="flex items-center gap-1 text-[11px] text-slate-500 hover:text-secondary transition-colors">
                Full View <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Table header */}
            <div className="overflow-x-auto">
              <div className="min-w-[480px]">
                <div className="grid grid-cols-12 px-5 py-1.5 border-b border-border text-[10px] text-slate-500 uppercase tracking-wide">
                  <span className="col-span-4">Division</span>
                  <span className="col-span-2 text-center">Auth/Filled</span>
                  <span className="col-span-2 text-center">On-Duty</span>
                  <span className="col-span-1 text-center">Vac</span>
                  <span className="col-span-1 text-center">Cert↑</span>
                  <span className="col-span-2 text-right">Status</span>
                </div>

                <div className="divide-y divide-slate-700/10 overflow-y-auto max-h-[calc(100%-6rem)]">
                  {divisions.map((div) => {
                    const colors = getDivisionColors(div.status);
                    const pct = Math.round((div.onDuty / div.filled) * 100);
                    return (
                      <div key={div.name} className="grid grid-cols-12 items-center px-5 py-2 hover:bg-slate-50 dark:hover:bg-zinc-800/10 transition-colors">
                        <div className="col-span-4">
                          <p className="text-[12px] font-medium text-slate-900 dark:text-slate-200 leading-tight">{div.name}</p>
                          <p className="text-[10px] text-slate-500">{div.bureau}{div.actingSupervisor && <span className="ml-1 text-amber-700 dark:text-amber-400">⚡ Acting</span>}</p>
                        </div>
                        <div className="col-span-2 text-center">
                          <span className="text-[11.5px] text-secondary">{div.authorized}/{div.filled}</span>
                        </div>
                        <div className="col-span-2 text-center">
                          <div className="flex flex-col items-center gap-0.5">
                            <span className="text-[11.5px] text-secondary">{div.onDuty}</span>
                            <div className="w-12 h-1 bg-slate-200 dark:bg-zinc-800/50 rounded-full overflow-hidden">
                              <div className={`h-full rounded-full ${pct >= 70 ? 'bg-emerald-500' : pct >= 55 ? 'bg-amber-400' : 'bg-red-500'}`} style={{ width: `${pct}%` }} />
                            </div>
                          </div>
                        </div>
                        <div className="col-span-1 text-center">
                          <span className={`text-[11.5px] ${div.vacancies > 4 ? 'text-amber-700 dark:text-amber-400' : 'text-slate-500'}`}>{div.vacancies}</span>
                        </div>
                        <div className="col-span-1 text-center">
                          <span className={`text-[11.5px] ${div.certRisk > 3 ? 'text-red-700 dark:text-red-400' : div.certRisk > 1 ? 'text-amber-700 dark:text-amber-400' : 'text-slate-500'}`}>
                            {div.certRisk > 0 ? div.certRisk : '—'}
                          </span>
                        </div>
                        <div className="col-span-2 text-right">
                          <span className={`text-[10px] px-2 py-0.5 rounded-full ${colors.badge}`}>{div.status}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Row C: Cert Risk | Deployments | Alert Feed (consolidated) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

          {/* Certification Risk */}
          <div className="bg-white dark:bg-zinc-900/25 border border-border dark:border-slate-700/30 rounded-xl overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 px-5 py-3 border-b border-border dark:border-slate-700/20">
              <div className="flex items-center gap-2 flex-wrap">
                <Award className="w-4 h-4 text-secondary" />
                <span className="text-[13px] font-semibold text-primary">Certification Risk</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-red-500/15 text-red-700 dark:text-red-400 border border-red-500/20">2 Critical</span>
              </div>
              <button onClick={() => navigate('/hr/training')} className="flex items-center gap-1 text-[11px] text-slate-500 hover:text-secondary transition-colors self-start sm:self-auto">
                Training <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="divide-y divide-slate-700/10">
              {certAlerts.map((cert) => {
                const colors = getCertColors(cert.severity);
                return (
                  <div key={cert.badge} className={`flex items-center gap-3 px-5 py-2 ${colors.row} hover:bg-slate-50 dark:hover:bg-zinc-800/10 transition-colors`}>
                    <div className="flex-1 min-w-0">
                      <p className="text-[11.5px] font-medium text-slate-900 dark:text-slate-200">{cert.deputy}</p>
                      <p className="text-[10px] text-slate-500 truncate">{cert.cert}</p>
                    </div>
                    <span className={`text-[13px] ${colors.days} flex-shrink-0`}>{cert.expiresIn}d</span>
                    <span className={`text-[9px] px-1.5 py-0.5 rounded-full ${colors.badge} flex-shrink-0 uppercase tracking-wide`}>{cert.severity}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Active Deployments */}
          <div className="bg-white dark:bg-zinc-900/25 border border-border dark:border-slate-700/30 rounded-xl overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 px-5 py-3 border-b border-border dark:border-slate-700/20">
              <div className="flex items-center gap-2 flex-wrap">
                <Target className="w-4 h-4 text-secondary" />
                <span className="text-[13px] font-semibold text-primary">Active Deployments</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-slate-100 dark:bg-zinc-800/30 text-secondary border border-border">
                  {deployments.reduce((s, d) => s + d.personnel, 0)} dep.
                </span>
              </div>
              <button onClick={() => navigate('/command/personnel')} className="flex items-center gap-1 text-[11px] text-slate-500 hover:text-secondary transition-colors self-start sm:self-auto">
                Staffing <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="divide-y divide-slate-700/10">
              {deployments.map((dep) => (
                <div key={dep.name} className="flex items-center gap-3 px-5 py-2 hover:bg-slate-50 dark:hover:bg-zinc-800/10 transition-colors">
                  <div className="w-6 h-6 bg-slate-100 dark:bg-zinc-800/40 rounded-md flex items-center justify-center flex-shrink-0">
                    <span className="text-[10px] font-bold text-secondary">{dep.personnel}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11.5px] font-medium text-slate-900 dark:text-slate-200 truncate">{dep.name}</p>
                    <p className="text-[10px] text-slate-500">{dep.lead} · {dep.since}</p>
                  </div>
                  <span className={`text-[9.5px] px-1.5 py-0.5 rounded-full ${getDeploymentStatusColors(dep.status)} flex-shrink-0`}>{dep.status}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Command Alert Feed */}
          <div className="bg-white dark:bg-zinc-900/25 border border-border dark:border-slate-700/30 rounded-xl overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 px-5 py-3 border-b border-border dark:border-slate-700/20">
              <div className="flex items-center gap-2 flex-wrap">
                <AlertTriangle className="w-4 h-4 text-secondary" />
                <span className="text-[13px] font-semibold text-primary">Command Alerts</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-red-500/15 text-red-700 dark:text-red-400 border border-red-500/20">
                  {commandSnapshot.criticalAlerts} Critical
                </span>
              </div>
              <button onClick={() => navigate('/command/alerts')} className="flex items-center gap-1 text-[11px] text-slate-500 hover:text-secondary transition-colors self-start sm:self-auto">
                All <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="divide-y divide-slate-700/10">
              {alerts.map((alert) => {
                const colors = getAlertColors(alert.severity);
                const Icon = alert.severity === 'critical' ? AlertOctagon : alert.severity === 'warning' ? AlertTriangle : Activity;
                return (
                  <div key={alert.id} className={`flex gap-3 px-5 py-2.5 border-l-2 ${colors.border} hover:bg-slate-50 dark:hover:bg-zinc-800/10 transition-colors cursor-pointer`}>
                    <Icon className={`w-3.5 h-3.5 mt-0.5 flex-shrink-0 ${colors.icon}`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-1 mb-0.5">
                        <p className="text-[11.5px] font-medium text-slate-900 dark:text-slate-200 leading-tight">{alert.title}</p>
                        <span className="text-[9px] text-slate-500 flex-shrink-0">{alert.time}</span>
                      </div>
                      <p className="text-[10.5px] text-secondary leading-snug">{alert.detail}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
}

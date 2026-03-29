import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';
import {
  Users, AlertTriangle, Shield, Radio, Target, Award,
  TrendingUp, TrendingDown,
  Circle, ArrowRight, RefreshCw, Sparkles, AlertOctagon,
  MapPin, Zap, ChevronRight, Activity
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
  expiresIn: number; // days
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
  courtTransports: 5,
  lastUpdated: '07:42',
};

const divisions: DivisionReadiness[] = [
  { name: 'Patrol Div. Alpha',    bureau: 'Field Ops',  authorized: 84, filled: 81, onDuty: 56, vacancies: 3, certRisk: 4, status: 'Operational' },
  { name: 'Patrol Div. Bravo',    bureau: 'Field Ops',  authorized: 80, filled: 74, onDuty: 48, vacancies: 6, certRisk: 3, status: 'Reduced', actingSupervisor: true },
  { name: 'Criminal Investigations', bureau: 'Investigations', authorized: 42, filled: 39, onDuty: 28, vacancies: 3, certRisk: 2, status: 'Operational' },
  { name: 'Special Operations',   bureau: 'Field Ops',  authorized: 28, filled: 26, onDuty: 22, vacancies: 2, certRisk: 1, status: 'Operational' },
  { name: 'Detention Operations', bureau: 'Detention',  authorized: 96, filled: 92, onDuty: 71, vacancies: 4, certRisk: 2, status: 'Operational' },
  { name: 'Court Services',       bureau: 'Detention',  authorized: 38, filled: 34, onDuty: 26, vacancies: 4, certRisk: 1, status: 'Reduced' },
  { name: 'Admin & Support',      bureau: 'Admin',      authorized: 56, filled: 54, onDuty: 41, vacancies: 2, certRisk: 1, status: 'Operational' },
  { name: 'Community Affairs',    bureau: 'Field Ops',  authorized: 24, filled: 22, onDuty: 14, vacancies: 2, certRisk: 0, status: 'Reduced', actingSupervisor: true },
  { name: 'Background & HR',      bureau: 'Admin',      authorized: 18, filled: 17, onDuty: 12, vacancies: 1, certRisk: 0, status: 'Operational' },
  { name: 'Traffic Enforcement',  bureau: 'Field Ops',  authorized: 36, filled: 33, onDuty: 21, vacancies: 3, certRisk: 0, status: 'Operational' },
];

const beats: PatrolBeat[] = [
  { id: 'B1', name: 'Beat 1 – North',    zone: 'Alpha', units: 3, required: 3, primaryUnit: 'Alpha-12',  status: 'Covered' },
  { id: 'B2', name: 'Beat 2 – NE Quad',  zone: 'Alpha', units: 2, required: 3, primaryUnit: 'Alpha-21',  status: 'Thin',  activeCall: 'Priority 2 active' },
  { id: 'B3', name: 'Beat 3 – Central',  zone: 'Alpha', units: 3, required: 3, primaryUnit: 'Alpha-31',  status: 'Covered' },
  { id: 'B4', name: 'Beat 4 – East',     zone: 'Bravo', units: 2, required: 2, primaryUnit: 'Bravo-41',  status: 'Covered' },
  { id: 'B5', name: 'Beat 5 – SE Quad',  zone: 'Bravo', units: 1, required: 2, primaryUnit: 'Bravo-51',  status: 'Thin',  activeCall: 'Pursuit cleared' },
  { id: 'B6', name: 'Beat 6 – South',    zone: 'Bravo', units: 2, required: 2, primaryUnit: 'Bravo-61',  status: 'Covered' },
  { id: 'B7', name: 'Beat 7 – West',     zone: 'Alpha', units: 0, required: 2, primaryUnit: '—',         status: 'Uncovered', activeCall: 'No units assigned' },
];

const certAlerts: CertAlert[] = [
  { deputy: 'Sgt. Rivera, M.',    badge: '1042', cert: 'Firearms Qualification', expiresIn: 4,  severity: 'critical' },
  { deputy: 'Dep. Chen, K.',      badge: '2081', cert: 'POST Basic',             expiresIn: 6,  severity: 'critical' },
  { deputy: 'Dep. Wallace, T.',   badge: '2204', cert: 'Defensive Tactics',      expiresIn: 12, severity: 'warning' },
  { deputy: 'Dep. Okafor, S.',    badge: '2317', cert: 'Taser / CEW',            expiresIn: 14, severity: 'warning' },
  { deputy: 'Dep. Nguyen, L.',    badge: '2456', cert: 'First Aid / CPR',        expiresIn: 18, severity: 'warning' },
  { deputy: 'Lt. Harrison, D.',   badge: '1015', cert: 'Command Leadership',     expiresIn: 22, severity: 'warning' },
  { deputy: 'Dep. Brooks, J.',    badge: '2509', cert: 'Firearms Qualification', expiresIn: 25, severity: 'watch' },
  { deputy: 'Dep. Torres, A.',    badge: '2611', cert: 'Defensive Tactics',      expiresIn: 29, severity: 'watch' },
];

const deployments: Deployment[] = [
  { name: 'Metro Fugitive Task Force',    type: 'Task Force',    personnel: 6,  lead: 'Det. Ortiz',    status: 'Active',     location: 'Multi-Jurisdiction',  since: 'D-5' },
  { name: 'Downtown Security Detail',     type: 'Special Ops',   personnel: 8,  lead: 'Sgt. Patel',    status: 'Active',     location: 'Downtown District',   since: 'D-1' },
  { name: 'Court Transport – Superior',   type: 'Court Ops',     personnel: 4,  lead: 'Dep. Flores',   status: 'En Route',   location: 'Superior Ct.',        since: '06:30' },
  { name: 'Gang Intel Surveillance',      type: 'Investigations', personnel: 3, lead: 'Det. Kim',      status: 'Active',     location: 'East Sector',         since: 'D-3' },
  { name: 'Mutual Aid – Northside PD',    type: 'Mutual Aid',    personnel: 4,  lead: 'Sgt. Walker',   status: 'Active',     location: 'Northside PD AOR',    since: 'D-0' },
  { name: 'Mutual Aid – State Patrol',    type: 'Mutual Aid',    personnel: 2,  lead: 'Dep. Adams',    status: 'En Route',   location: 'I-85 Corridor',       since: '05:00' },
  { name: 'School Resource – Lincoln HS', type: 'Community',     personnel: 2,  lead: 'Dep. Brown',    status: 'Active',     location: 'Lincoln HS',          since: 'D-0' },
  { name: 'Warrant Sweep – Alpha Div.',   type: 'Special Ops',   personnel: 12, lead: 'Lt. Grant',     status: 'Staged',     location: 'NE Quad Staging',     since: '07:00' },
];

const alerts: CommandAlert[] = [
  { id: 1, severity: 'critical', title: 'POST Cert Expiring in 4 Days',     detail: 'Sgt. Rivera firearms qualification must be renewed before Dec 19. Deputy cannot carry without it.',  time: '07:30', module: 'HR / Compliance' },
  { id: 2, severity: 'critical', title: 'Beat 7 West — No Coverage',         detail: '2 required units both pulled for warrant sweep. No patrol coverage in effect. Recommend divert Alpha-12.', time: '07:15', module: 'Patrol Ops' },
  { id: 3, severity: 'warning',  title: 'Bravo Division Under Staffed',      detail: 'Acting supervisor in place, 6 vacancies unfilled. B-Shift running at 73% capacity.', time: '06:50', module: 'Staffing' },
  { id: 4, severity: 'warning',  title: '14 Certs Expiring Within 30 Days',  detail: '2 critical, 4 warning-level expirations. Schedule remediation before end of month.', time: '06:00', module: 'HR / Training' },
  { id: 5, severity: 'warning',  title: 'Detention E-Pod Near Capacity',     detail: 'Medical pod at 92% — 3 isolation rooms active. Hospital guard deputy extended a 3rd shift.', time: '05:45', module: 'Detention' },
  { id: 6, severity: 'info',     title: 'Warrant Sweep Staged – Alpha NE',   detail: '12 deputies staged at NE Quad. Operation window: 08:00–12:00. SAC: Lt. Grant.', time: '07:00', module: 'Special Ops' },
  { id: 7, severity: 'info',     title: 'Mutual Aid Request Approved',       detail: 'Northside PD requested 4 deputies for crowd management event (Saturday 18:00–23:00).', time: '04:30', module: 'Command' },
];

// ── Helpers ───────────────────────────────────────────────────

function getDivisionColors(status: DivisionReadiness['status']) {
  if (status === 'Critical')     return { badge: 'bg-red-500/15 text-red-600 dark:text-red-400 border border-red-500/25',       dot: 'bg-red-500' };
  if (status === 'Reduced')      return { badge: 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/25', dot: 'bg-amber-400' };
  return { badge: 'bg-slate-700/30 text-slate-600 dark:text-slate-400 border border-slate-700/20', dot: 'bg-slate-500' };
}

function getBeatColors(status: PatrolBeat['status']) {
  if (status === 'Uncovered') return { bg: 'bg-red-500/15 border-red-500/35', text: 'text-red-700 dark:text-red-300', dot: 'bg-red-500' };
  if (status === 'Thin')      return { bg: 'bg-amber-500/12 border-amber-500/30', text: 'text-amber-700 dark:text-amber-300', dot: 'bg-amber-400' };
  return { bg: 'bg-slate-50 dark:bg-slate-800/30 border-slate-200 dark:border-slate-700/30', text: 'text-slate-500', dot: 'bg-slate-500' };
}

function getCertColors(severity: CertAlert['severity']) {
  if (severity === 'critical') return { row: 'border-l-2 border-l-red-500/70',   badge: 'bg-red-500/15 text-red-600 dark:text-red-400 border border-red-500/20',    days: 'text-red-600 dark:text-red-400 font-bold' };
  if (severity === 'warning')  return { row: 'border-l-2 border-l-amber-500/60', badge: 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/20', days: 'text-amber-600 dark:text-amber-400 font-semibold' };
  return { row: '', badge: 'bg-slate-700/30 text-slate-600 dark:text-slate-400 border border-slate-700/20', days: 'text-slate-500' };
}

function getDeploymentStatusColors(status: Deployment['status']) {
  if (status === 'Active')     return 'bg-emerald-100 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20';
  if (status === 'En Route')   return 'bg-blue-100 dark:bg-blue-500/15 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-500/20';
  if (status === 'Staged')     return 'bg-amber-100 dark:bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-500/20';
  return 'bg-slate-100 dark:bg-slate-500/15 text-slate-700 dark:text-slate-400 border border-slate-200 dark:border-slate-500/20';
}

function getAlertColors(severity: CommandAlert['severity']) {
  if (severity === 'critical') return { border: 'border-l-red-500',   icon: 'text-red-600 dark:text-red-400',   label: 'bg-red-500/15 text-red-600 dark:text-red-400 border border-red-500/20' };
  if (severity === 'warning')  return { border: 'border-l-amber-500', icon: 'text-amber-600 dark:text-amber-400', label: 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/20' };
  return { border: 'border-l-slate-700', icon: 'text-slate-500', label: 'bg-slate-700/30 text-slate-500 border border-slate-700/20' };
}

// ── Component ─────────────────────────────────────────────────

export default function CommandWarRoom() {
  const navigate = useNavigate();
  const filledPct    = Math.round((commandSnapshot.filled / commandSnapshot.authorizedStrength) * 100);
  const onDutyPct    = Math.round((commandSnapshot.onDuty / commandSnapshot.filled) * 100);

  const kpis = [
    {
      label: 'Authorized Strength',
      value: `${commandSnapshot.filled}/${commandSnapshot.authorizedStrength}`,
      sub: `${filledPct}% filled · ${commandSnapshot.openVacancies} vacancies`,
      icon: Users,
      color: 'text-slate-900 dark:text-white',
      trend: null,
    },
    {
      label: 'On-Duty Now',
      value: `${commandSnapshot.onDuty}`,
      sub: `${onDutyPct}% of filled positions`,
      icon: Activity,
      color: 'text-slate-900 dark:text-white',
      trend: null,
    },
    {
      label: 'Patrol Coverage',
      value: `${commandSnapshot.patrolCoverage}%`,
      sub: '1 beat uncovered · 2 thin',
      icon: Radio,
      color: 'text-amber-600 dark:text-amber-400',
      trend: 'down',
    },
    {
      label: 'Cert Risk',
      value: `${commandSnapshot.certRiskCount}`,
      sub: '2 critical · 4 warning · 8 watch',
      icon: Award,
      color: 'text-red-600 dark:text-red-400',
      trend: 'up',
    },
    {
      label: 'Active Deployments',
      value: `${commandSnapshot.activeDeployments}`,
      sub: `${commandSnapshot.mutualAidOut} mutual aid out`,
      icon: Target,
      color: 'text-slate-900 dark:text-white',
      trend: null,
    },
    {
      label: 'Command Alerts',
      value: `${commandSnapshot.activeAlerts}`,
      sub: `${commandSnapshot.criticalAlerts} critical · needs action`,
      icon: AlertTriangle,
      color: 'text-red-600 dark:text-red-400',
      trend: null,
    },
  ];

  return (
    <DashboardLayout>
      <div className="p-6 space-y-8">

        {/* ── Page Header ─────────────────────────────────── */}
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white mb-1">Command War Room</h1>
            <p className="text-[11px] text-slate-500">
              Full-agency readiness cockpit · Updated {commandSnapshot.lastUpdated} · Gwinnett County Sheriff's Office
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 text-[11px] text-slate-500 bg-slate-50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700/30 rounded-lg px-3 py-1.5">
              <Circle className="w-1.5 h-1.5 fill-emerald-500 text-emerald-500" />
              Live Feed
            </div>
            <button className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700/30 rounded-lg text-[12px] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700/30 transition-all">
              <RefreshCw className="w-3.5 h-3.5" />
              Refresh
            </button>
          </div>
        </div>

        {/* ── Row 1: KPI Command Snapshot ─────────────────── */}
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-3">
          {kpis.map((kpi) => {
            const Icon = kpi.icon;
            return (
              <div key={kpi.label}
                className="bg-white dark:bg-slate-800/25 border border-slate-200 dark:border-slate-700/30 rounded-xl shadow-sm dark:shadow-none p-4"
              >
                <div className="flex items-center justify-between mb-3">
                  <Icon className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                  {kpi.trend === 'up'   && <TrendingUp   className="w-3.5 h-3.5 text-red-600 dark:text-red-400 opacity-60" />}
                  {kpi.trend === 'down' && <TrendingDown  className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 opacity-60" />}
                </div>
                <p className={`text-2xl font-bold mb-0.5 ${kpi.color}`}>{kpi.value}</p>
                <p className="text-[10px] text-slate-500 leading-tight uppercase tracking-wide">{kpi.label}</p>
                <p className="text-[10px] text-slate-500 mt-1 leading-tight">{kpi.sub}</p>
              </div>
            );
          })}
        </div>

        {/* ── Row 2: Staffing Readiness + Patrol Beat Coverage ── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">

          {/* Staffing Readiness by Division */}
          <div className="lg:col-span-3 bg-white dark:bg-slate-800/25 border border-slate-200 dark:border-slate-700/30 rounded-xl overflow-hidden">
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-700/20">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                <span className="text-[13px] font-semibold text-slate-900 dark:text-white">Staffing Readiness by Division</span>
              </div>
              <button
                onClick={() => navigate('/command/personnel')}
                className="flex items-center gap-1 text-[11px] text-slate-500 hover:text-slate-700 dark:text-slate-300 transition-colors"
              >
                Full View <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Table header */}
            <div className="grid grid-cols-12 px-5 py-2 border-b border-slate-700/10 text-[10px] text-slate-500 uppercase tracking-wide">
              <span className="col-span-4">Division</span>
              <span className="col-span-2 text-center">Auth / Filled</span>
              <span className="col-span-2 text-center">On-Duty</span>
              <span className="col-span-1 text-center">Vac</span>
              <span className="col-span-1 text-center">Cert↑</span>
              <span className="col-span-2 text-right">Status</span>
            </div>

            {/* Division rows */}
            <div className="divide-y divide-slate-700/10 max-h-72 overflow-y-auto">
              {divisions.map((div) => {
                const colors = getDivisionColors(div.status);
                const onDutyPct = Math.round((div.onDuty / div.filled) * 100);
                return (
                  <div key={div.name} className="grid grid-cols-12 items-center px-5 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-700/10 transition-colors">
                    <div className="col-span-4">
                      <p className="text-[12px] font-medium text-slate-900 dark:text-slate-200 leading-tight">{div.name}</p>
                      <p className="text-[10px] text-slate-500">{div.bureau}{div.actingSupervisor && <span className="ml-1 text-amber-600 dark:text-amber-400">⚡ Acting</span>}</p>
                    </div>
                    <div className="col-span-2 text-center">
                      <span className="text-[12px] text-slate-700 dark:text-slate-300">{div.authorized}/{div.filled}</span>
                    </div>
                    <div className="col-span-2 text-center">
                      <div className="flex flex-col items-center gap-0.5">
                        <span className="text-[12px] text-slate-700 dark:text-slate-300">{div.onDuty}</span>
                        <div className="w-12 h-1 bg-slate-700/50 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${onDutyPct >= 70 ? 'bg-emerald-500' : onDutyPct >= 55 ? 'bg-amber-400' : 'bg-red-500'}`}
                            style={{ width: `${onDutyPct}%` }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-span-1 text-center">
                      <span className={`text-[12px] ${div.vacancies > 4 ? 'text-amber-600 dark:text-amber-400' : 'text-slate-500'}`}>{div.vacancies}</span>
                    </div>
                    <div className="col-span-1 text-center">
                      <span className={`text-[12px] ${div.certRisk > 3 ? 'text-red-600 dark:text-red-400' : div.certRisk > 1 ? 'text-amber-600 dark:text-amber-400' : 'text-slate-500'}`}>
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

          {/* Patrol Beat Coverage */}
          <div className="lg:col-span-2 bg-white dark:bg-slate-800/25 border border-slate-200 dark:border-slate-700/30 rounded-xl overflow-hidden">
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-700/20">
              <div className="flex items-center gap-2">
                <Radio className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                <span className="text-[13px] font-semibold text-slate-900 dark:text-white">Patrol Beat Coverage</span>
              </div>
              <button
                onClick={() => navigate('/patrol/cad')}
                className="flex items-center gap-1 text-[11px] text-slate-500 hover:text-slate-700 dark:text-slate-300 transition-colors"
              >
                CAD <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Coverage summary strip */}
            <div className="flex gap-0.5 px-5 pt-3 pb-1">
              {beats.map(b => (
                <div
                  key={b.id}
                  className={`flex-1 h-1.5 rounded-full ${b.status === 'Covered' ? 'bg-emerald-500' : b.status === 'Thin' ? 'bg-amber-400' : 'bg-red-500'}`}
                  title={`${b.name}: ${b.status}`}
                />
              ))}
            </div>
            <p className="text-[10px] text-slate-500 px-5 pb-2">
              {beats.filter(b => b.status === 'Covered').length} covered ·{' '}
              {beats.filter(b => b.status === 'Thin').length} thin ·{' '}
              {beats.filter(b => b.status === 'Uncovered').length} uncovered
            </p>

            {/* Beat list */}
            <div className="divide-y divide-slate-700/10 px-2 pb-2 max-h-64 overflow-y-auto">
              {beats.map((beat) => {
                const colors = getBeatColors(beat.status);
                return (
                  <div key={beat.id} className={`mx-1 my-1 rounded-lg border p-2.5 ${colors.bg}`}>
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <div className={`w-1.5 h-1.5 rounded-full ${colors.dot}`} />
                          <span className={`text-[12px] font-medium ${colors.text}`}>{beat.name}</span>
                        </div>
                        <p className="text-[10px] text-slate-500 pl-3">
                          {beat.primaryUnit} · {beat.units}/{beat.required} units
                          {beat.activeCall && <span className="ml-1 text-slate-600 dark:text-slate-400">· {beat.activeCall}</span>}
                        </p>
                      </div>
                      <MapPin className={`w-3.5 h-3.5 mt-0.5 flex-shrink-0 ${colors.text} opacity-60`} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Row 3: Cert Risk + Deployments ──────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

          {/* Certification Risk Matrix */}
          <div className="bg-white dark:bg-slate-800/25 border border-slate-200 dark:border-slate-700/30 rounded-xl overflow-hidden">
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-700/20">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                <span className="text-[13px] font-semibold text-slate-900 dark:text-white">Certification Risk</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-500/15 text-red-600 dark:text-red-400 border border-red-500/20">
                  {certAlerts.filter(c => c.severity === 'critical').length} Critical
                </span>
              </div>
              <button
                onClick={() => navigate('/hr/training')}
                className="flex items-center gap-1 text-[11px] text-slate-500 hover:text-slate-700 dark:text-slate-300 transition-colors"
              >
                Training <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Legend */}
            <div className="flex items-center gap-4 px-5 py-2 border-b border-slate-700/10">
              <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
                <div className="w-2 h-2 rounded-full bg-red-500" /> Critical (&lt;7 days)
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
                <div className="w-2 h-2 rounded-full bg-amber-400" /> Warning (&lt;21 days)
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
                <div className="w-2 h-2 rounded-full bg-blue-400" /> Watch (&lt;30 days)
              </div>
            </div>

            <div className="divide-y divide-slate-700/10 max-h-64 overflow-y-auto">
              {certAlerts.map((cert) => {
                const colors = getCertColors(cert.severity);
                return (
                  <div key={cert.badge} className={`flex items-center gap-3 px-5 py-2.5 ${colors.row} hover:bg-slate-50 dark:hover:bg-slate-700/10 transition-colors`}>
                    <div className="flex-1 min-w-0">
                      <p className="text-[12px] font-medium text-slate-900 dark:text-slate-200">{cert.deputy}</p>
                      <p className="text-[10px] text-slate-500">{cert.cert} · Badge #{cert.badge}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className={`text-[13px] ${colors.days}`}>{cert.expiresIn}d</p>
                      <p className="text-[10px] text-slate-500">remaining</p>
                    </div>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full ${colors.badge} flex-shrink-0 uppercase tracking-wide`}>
                      {cert.severity}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Active Deployments */}
          <div className="bg-white dark:bg-slate-800/25 border border-slate-200 dark:border-slate-700/30 rounded-xl overflow-hidden">
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-700/20">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                <span className="text-[13px] font-semibold text-slate-900 dark:text-white">Active Deployments</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-700/30 text-slate-600 dark:text-slate-400 border border-slate-700/20">
                  {deployments.reduce((s, d) => s + d.personnel, 0)} deputies
                </span>
              </div>
              <button
                onClick={() => navigate('/command/personnel')}
                className="flex items-center gap-1 text-[11px] text-slate-500 hover:text-slate-700 dark:text-slate-300 transition-colors"
              >
                Staffing <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="divide-y divide-slate-700/10 max-h-72 overflow-y-auto">
              {deployments.map((dep) => (
                <div key={dep.name} className="flex items-start gap-3 px-5 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-700/10 transition-colors">
                  <div className="w-7 h-7 bg-slate-100 dark:bg-slate-700/40 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300">{dep.personnel}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] font-medium text-slate-900 dark:text-slate-200 leading-tight">{dep.name}</p>
                    <p className="text-[10px] text-slate-500">{dep.lead} · {dep.location} · since {dep.since}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1 flex-shrink-0">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full ${getDeploymentStatusColors(dep.status)}`}>
                      {dep.status}
                    </span>
                    <span className="text-[10px] text-slate-500">{dep.type}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Row 4: Command Alert Feed + AI Summary ───────── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">

          {/* Command Alert Feed */}
          <div className="lg:col-span-3 bg-white dark:bg-slate-800/25 border border-slate-200 dark:border-slate-700/30 rounded-xl overflow-hidden">
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-700/20">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                <span className="text-[13px] font-semibold text-slate-900 dark:text-white">Command Alert Feed</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-500/15 text-red-600 dark:text-red-400 border border-red-500/20">
                  {commandSnapshot.criticalAlerts} Critical
                </span>
              </div>
              <button
                onClick={() => navigate('/command/alerts')}
                className="flex items-center gap-1 text-[11px] text-slate-500 hover:text-slate-700 dark:text-slate-300 transition-colors"
              >
                All Alerts <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="divide-y divide-slate-700/10">
              {alerts.map((alert) => {
                const colors = getAlertColors(alert.severity);
                const Icon = alert.severity === 'critical' ? AlertOctagon : alert.severity === 'warning' ? AlertTriangle : Zap;
                return (
                  <div key={alert.id} className={`flex items-start gap-3 px-5 py-3 border-l-2 ${colors.border} hover:bg-slate-50 dark:hover:bg-slate-700/10 transition-colors cursor-pointer`}>
                    <Icon className={`w-4 h-4 mt-0.5 flex-shrink-0 ${colors.icon}`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-0.5">
                        <p className="text-[12px] font-medium text-slate-900 dark:text-slate-200">{alert.title}</p>
                        <div className="flex items-center gap-1.5 flex-shrink-0">
                          <span className="text-[10px] text-slate-500">{alert.time}</span>
                        </div>
                      </div>
                      <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">{alert.detail}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`text-[10px] px-1.5 py-0.5 rounded ${colors.label}`}>
                          {alert.severity.toUpperCase()}
                        </span>
                        <span className="text-[10px] text-slate-600">{alert.module}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Command Intelligence + Quick Actions */}
          <div className="lg:col-span-2 flex flex-col gap-4">

            {/* AI Command Intelligence */}
            <div className="bg-white dark:bg-slate-800/25 border border-slate-200 dark:border-slate-700/30 rounded-xl overflow-hidden flex-1">
              <div className="flex items-center gap-2 px-5 py-3.5 border-b border-slate-700/20">
                <Sparkles className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                <span className="text-[13px] font-semibold text-slate-900 dark:text-white">Command Intelligence</span>
              </div>
              <div className="p-5 space-y-3">
                <div className="flex gap-3">
                  <AlertOctagon className="w-4 h-4 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                  <p className="text-[12px] text-slate-700 dark:text-slate-300 leading-relaxed">
                    <span className="text-slate-900 dark:text-white font-medium">Immediate: </span>
                    Beat 7 West has zero coverage. Divert Alpha-12 from Beat 1 (currently overloaded) to restore patrol presence.
                  </p>
                </div>
                <div className="flex gap-3">
                  <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                  <p className="text-[12px] text-slate-700 dark:text-slate-300 leading-relaxed">
                    <span className="text-slate-900 dark:text-white font-medium">Today: </span>
                    Sgt. Rivera's firearms cert expires in 4 days. Restricted duty status applies automatically on day 0 unless renewed. Contact Training at 0800.
                  </p>
                </div>
                <div className="flex gap-3">
                  <Shield className="w-4 h-4 text-slate-600 dark:text-slate-400 flex-shrink-0 mt-0.5" />
                  <p className="text-[12px] text-slate-700 dark:text-slate-300 leading-relaxed">
                    <span className="text-slate-900 dark:text-white font-medium">This Week: </span>
                    Bravo Division is operating with 2 acting supervisors and 6 unfilled vacancies. Recommend priority recruiting review.
                  </p>
                </div>
                <div className="flex gap-3">
                  <TrendingUp className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                  <p className="text-[12px] text-slate-700 dark:text-slate-300 leading-relaxed">
                    <span className="text-slate-900 dark:text-white font-medium">Positive: </span>
                    Warrant sweep staged for 08:00. All 12 deputies confirmed. SAC Lt. Grant reports go/no-go ready.
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Command Actions */}
            <div className="bg-white dark:bg-slate-800/25 border border-slate-200 dark:border-slate-700/30 rounded-xl overflow-hidden">
              <div className="px-5 py-3.5 border-b border-slate-700/20">
                <span className="text-[13px] font-semibold text-slate-900 dark:text-white">Quick Actions</span>
              </div>
              <div className="p-3 space-y-1.5">
                {[
                  { label: 'Review Command Alerts',       route: '/command/alerts',   urgent: true },
                  { label: 'View Org Chart & Readiness',  route: '/command/orgchart', urgent: false },
                  { label: 'Detention Command Center',    route: '/jail/command',     urgent: false },
                  { label: 'Approve Pending Requests',    route: '/command/approvals', urgent: true },
                  { label: 'Training & Certifications',   route: '/hr/training',      urgent: false },
                ].map((action) => (
                  <button
                    key={action.label}
                    onClick={() => navigate(action.route)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-[12px] font-medium transition-all ${
                      action.urgent
                        ? 'bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-300 hover:bg-amber-500/15'
                        : 'bg-slate-50 dark:bg-slate-700/20 border border-slate-200 dark:border-slate-700/20 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/30'
                    }`}
                  >
                    {action.label}
                    <ArrowRight className="w-3.5 h-3.5 opacity-50" />
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}

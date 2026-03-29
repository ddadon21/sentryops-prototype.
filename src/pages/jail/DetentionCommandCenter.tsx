import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';
import {
  Building2, Users, AlertTriangle, Shield, Hospital, Truck,
  Activity, TrendingUp, TrendingDown, Clock, CheckCircle,
  Circle, ArrowRight, RefreshCw, Sparkles, X,
  Heart, Zap, AlertOctagon
} from 'lucide-react';

// ── Types ─────────────────────────────────────────────────────

interface HousingPod {
  id: string;
  name: string;
  type: string;
  capacity: number;
  current: number;
  security: string;
  status: 'Normal' | 'Near Capacity' | 'Over Capacity';
  notes?: string;
}

interface ShiftStatus {
  label: string;
  scheduled: number;
  present: number;
  supervisor: string;
  issue?: string;
}

interface CourtRun {
  court: string;
  time: string;
  inmates: number;
  deputy: string;
  status: 'Completed' | 'En Route' | 'Staging' | 'Scheduled';
  etaReturn?: string;
}

// ── Static data ────────────────────────────────────────────────

const facilityMetrics = {
  totalCapacity: 920,
  currentPopulation: 842,
  percentFull: 91.5,
  bookingsToday: 18,
  releasesToday: 14,
  netChange: +4,
  courtTransports: 31,
  sevenDayAverage: 843,
};

const populationTrend = [
  { date: 'D-7', pop: 838 },
  { date: 'D-6', pop: 841 },
  { date: 'D-5', pop: 839 },
  { date: 'D-4', pop: 845 },
  { date: 'D-3', pop: 848 },
  { date: 'D-2', pop: 844 },
  { date: 'D-1', pop: 846 },
  { date: 'Now',  pop: 842 },
];

const housingPods: HousingPod[] = [
  { id: 'A1',  name: 'A-Pod',   type: 'Male GP',          capacity: 96,  current: 94,  security: 'Med',  status: 'Near Capacity' },
  { id: 'A2',  name: 'A2-Pod',  type: 'Male GP',          capacity: 96,  current: 89,  security: 'Med',  status: 'Normal' },
  { id: 'B1',  name: 'B-Pod',   type: 'Male Max',         capacity: 64,  current: 61,  security: 'Max',  status: 'Normal' },
  { id: 'B2',  name: 'B2-Pod',  type: 'Disciplinary',     capacity: 32,  current: 28,  security: 'Max',  status: 'Normal' },
  { id: 'C1',  name: 'C-Pod',   type: 'Male Medium',      capacity: 128, current: 115, security: 'Med',  status: 'Normal' },
  { id: 'C2',  name: 'C2-Pod',  type: 'Work Release',     capacity: 48,  current: 42,  security: 'Min',  status: 'Normal' },
  { id: 'D1',  name: 'D-Pod',   type: 'Female GP',        capacity: 80,  current: 73,  security: 'Med',  status: 'Normal' },
  { id: 'D2',  name: 'D2-Pod',  type: 'Female Max',       capacity: 32,  current: 29,  security: 'Max',  status: 'Normal' },
  { id: 'E1',  name: 'E-Pod',   type: 'Medical',          capacity: 48,  current: 44,  security: 'Med',  status: 'Near Capacity', notes: '3 isolation active' },
  { id: 'E2',  name: 'E2-Pod',  type: 'Mental Health',    capacity: 40,  current: 38,  security: 'Med',  status: 'Near Capacity', notes: '24/7 monitoring' },
  { id: 'F1',  name: 'F-Pod',   type: 'Intake',           capacity: 64,  current: 52,  security: 'Hi',   status: 'Normal', notes: '12 pending class.' },
  { id: 'F2',  name: 'F2-Pod',  type: 'Prot. Custody',   capacity: 48,  current: 41,  security: 'Hi',   status: 'Normal' },
  { id: 'G1',  name: 'G-Pod',   type: 'Juvenile',         capacity: 24,  current: 18,  security: 'Med',  status: 'Normal' },
  { id: 'G2',  name: 'G2-Pod',  type: 'Pre-Release',      capacity: 40,  current: 35,  security: 'Min',  status: 'Normal' },
  { id: 'H1',  name: 'H-Pod',   type: 'Federal Hold',     capacity: 48,  current: 47,  security: 'Hi',   status: 'Near Capacity' },
  { id: 'H2',  name: 'H2-Pod',  type: 'ICE Hold',         capacity: 32,  current: 36,  security: 'Med',  status: 'Over Capacity', notes: 'Emergency beds in use' },
];

const shifts: ShiftStatus[] = [
  { label: 'A-Shift', scheduled: 15, present: 15, supervisor: 'Sgt. Williams' },
  { label: 'B-Shift', scheduled: 14, present: 13, supervisor: 'Sgt. Thompson', issue: 'Officer Smith — sick call 11:30 AM' },
  { label: 'C-Shift', scheduled: 14, present: 14, supervisor: 'Sgt. Davis' },
  { label: 'Medical', scheduled: 6,  present: 6,  supervisor: 'RN Martinez' },
];

const courtRuns: CourtRun[] = [
  { court: 'Superior Court',  time: '09:00', inmates: 8,  deputy: 'Sgt. Williams',  status: 'En Route',  etaReturn: '12:00' },
  { court: 'State Court',     time: '09:30', inmates: 12, deputy: 'Sgt. Martinez',  status: 'Staging',   etaReturn: '14:00' },
  { court: 'Magistrate Court',time: '13:00', inmates: 6,  deputy: 'Cpl. Johnson',   status: 'Scheduled', etaReturn: '15:00' },
  { court: 'Probate Court',   time: '14:00', inmates: 3,  deputy: 'Cpl. Davis',     status: 'Scheduled', etaReturn: '16:00' },
  { court: 'Juvenile Court',  time: '10:00', inmates: 2,  deputy: 'Det. Anderson',  status: 'Completed', etaReturn: 'Returned 11:45' },
];

const criticalTasks = [
  { text: 'Resolve H2-Pod over capacity — coordinate USMS transfer', urgency: 'critical', due: 'Before 1800' },
  { text: 'Authorize OT for B-Shift (Officer Smith callout)', urgency: 'high', due: 'ASAP' },
  { text: 'Request 5th transport van — 31 court runs tomorrow', urgency: 'high', due: 'Today 1700' },
  { text: 'E-Pod review with Medical Director Chen (44/48 beds)', urgency: 'medium', due: 'Today 1600' },
  { text: 'Federal audit Dec 12-14 — resolve capacity violations', urgency: 'medium', due: 'Dec 11' },
];

// ── Helper functions ───────────────────────────────────────────

const getPodColor = (pod: HousingPod) => {
  if (pod.status === 'Over Capacity') return { bg: 'bg-red-500/15 border-red-500/40', text: 'text-red-300', bar: 'bg-red-500' };
  if (pod.status === 'Near Capacity') return { bg: 'bg-amber-500/10 border-amber-500/30', text: 'text-amber-300', bar: 'bg-amber-500' };
  return { bg: 'bg-slate-800/35 border-slate-700/25', text: 'text-slate-400', bar: 'bg-slate-600/50' };
};

const getPct = (pod: HousingPod) => Math.round((pod.current / pod.capacity) * 100);

const getShiftColors = (shift: ShiftStatus) => {
  const pct = (shift.present / shift.scheduled) * 100;
  if (pct < 93) return { text: 'text-red-600 dark:text-red-400',   bg: 'bg-red-500/10 border-red-500/20',     dot: 'bg-red-400' };
  if (pct < 100) return { text: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20', dot: 'bg-amber-400' };
  return { text: 'text-slate-300', bg: 'bg-slate-800/35 border-slate-700/40', dot: 'bg-slate-500' };
};

const getRunStatus = (status: CourtRun['status']) => {
  switch (status) {
    case 'Completed': return 'text-slate-400';
    case 'En Route':  return 'text-slate-300';
    case 'Staging':   return 'text-amber-600 dark:text-amber-400';
    default:          return 'text-slate-500';
  }
};

const getUrgencyColors = (u: string) => {
  if (u === 'critical') return 'border-l-2 border-red-500 bg-red-500/8 text-red-300';
  if (u === 'high') return 'border-l-2 border-amber-500 bg-amber-500/8 text-amber-300';
  return 'border-l-2 border-slate-600/50 bg-slate-800/30 text-slate-300';
};

// ── Component ─────────────────────────────────────────────────

export default function DetentionCommandCenter() {
  const navigate = useNavigate();
  const [aiExpanded, setAiExpanded] = useState(true);
  const [activeAlerts, setActiveAlerts] = useState([
    { id: 1, msg: 'H2-Pod over capacity (36/32) — emergency beds in use', type: 'critical', visible: true },
    { id: 2, msg: 'B-Shift understaffed 13/14 — ACA minimum at risk',    type: 'critical', visible: true },
    { id: 3, msg: 'E-Pod medical housing at 92% — monitor closely',       type: 'warning',  visible: true },
  ]);

  const visibleAlerts = activeAlerts.filter(a => a.visible);
  const criticalCount = visibleAlerts.filter(a => a.type === 'critical').length;
  const warningCount = visibleAlerts.filter(a => a.type === 'warning').length;
  const dismiss = (id: number) => setActiveAlerts(prev => prev.map(a => a.id === id ? { ...a, visible: false } : a));

  const capacityPct = facilityMetrics.percentFull;
  const totalStaff = shifts.reduce((a, s) => a + s.scheduled, 0);
  const totalPresent = shifts.reduce((a, s) => a + s.present, 0);
  const staffPct = Math.round((totalPresent / totalStaff) * 100);

  // Readiness indicators for the status bar
  const facilityReadiness = capacityPct >= 95 ? 'Critical' : capacityPct >= 85 ? 'Warning' : 'Normal';
  const staffReadiness = staffPct < 93 ? 'Critical' : staffPct < 100 ? 'Warning' : 'Normal';
  const medicalReadiness = 'Warning'; // E-Pod 92%
  const overallReadiness = facilityReadiness === 'Critical' || staffReadiness === 'Critical' ? 'Critical' : 'Warning';

  const readinessBadge = (r: string) => {
    if (r === 'Critical') return 'bg-red-100 dark:bg-red-500/15 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-500/25';
    if (r === 'Warning')  return 'bg-amber-100 dark:bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-500/25';
    return 'bg-slate-100 dark:bg-slate-700/30 text-slate-700 dark:text-slate-400 border border-slate-200 dark:border-slate-700/40';
  };

  return (
    <DashboardLayout>
      <div className="p-4 lg:p-6 space-y-7">

        {/* ── Header ──────────────────────────────────────── */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-xl font-bold text-slate-900 dark:text-white">Detention Command Center</h1>
              <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${readinessBadge(overallReadiness)}`}>
                {overallReadiness === 'Critical' ? '⬤' : '⚠'} {overallReadiness}
              </span>
            </div>
            <p className="text-[11px] text-slate-500">Gwinnett County Detention Center · {criticalCount > 0 ? `${criticalCount} critical action${criticalCount > 1 ? 's' : ''} pending` : 'Monitoring'}</p>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-slate-500">
            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Last updated 6:38 PM EST</span>
            <button className="flex items-center gap-1 text-amber-600 dark:text-amber-400/70 hover:text-amber-600 dark:text-amber-400 transition-colors ml-2">
              <RefreshCw className="w-3 h-3" /> Refresh
            </button>
          </div>
        </div>

        {/* ── Row 1: Command Snapshot KPIs ───────────────── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {/* Facility Capacity */}
          <div className={`bg-slate-800/30 border rounded-xl p-4 ${capacityPct >= 95 ? 'border-red-500/30' : capacityPct >= 85 ? 'border-amber-500/30' : 'border-slate-700/50'}`}>
            <div className="flex items-center gap-1.5 mb-2">
              <Building2 className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" />
              <span className="text-[10px] text-slate-500 font-medium uppercase tracking-wide">Capacity</span>
            </div>
            <p className="text-xl font-bold text-slate-900 dark:text-white">{facilityMetrics.currentPopulation}<span className="text-sm text-slate-500">/{facilityMetrics.totalCapacity}</span></p>
            <p className={`text-[11px] font-semibold mt-0.5 ${capacityPct >= 95 ? 'text-red-600 dark:text-red-400' : capacityPct >= 85 ? 'text-amber-600 dark:text-amber-400' : 'text-slate-300'}`}>{capacityPct}% full</p>
            <div className="w-full h-1 bg-slate-700/50 rounded-full mt-1.5 overflow-hidden">
              <div className={`h-full rounded-full ${capacityPct >= 95 ? 'bg-red-500' : capacityPct >= 85 ? 'bg-amber-500' : 'bg-slate-500/60'}`} style={{ width: `${Math.min(capacityPct, 100)}%` }} />
            </div>
          </div>

          {/* Net Population Change */}
          <div className="bg-white dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700/50 rounded-xl shadow-sm dark:shadow-none p-4">
            <div className="flex items-center gap-1.5 mb-2">
              <Activity className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" />
              <span className="text-[10px] text-slate-500 font-medium uppercase tracking-wide">Population</span>
            </div>
            <p className="text-xl font-bold text-slate-900 dark:text-white">{facilityMetrics.bookingsToday}<span className="text-[11px] text-slate-600 dark:text-slate-400 ml-1">in</span></p>
            <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5">{facilityMetrics.releasesToday} releases</p>
            <p className={`text-[11px] font-semibold mt-0.5 flex items-center gap-0.5 ${facilityMetrics.netChange > 0 ? 'text-amber-600 dark:text-amber-400' : 'text-slate-400'}`}>
              {facilityMetrics.netChange > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              Net {facilityMetrics.netChange > 0 ? '+' : ''}{facilityMetrics.netChange} today
            </p>
          </div>

          {/* Staff Coverage */}
          <div className={`bg-slate-800/30 border rounded-xl p-4 ${staffReadiness === 'Critical' ? 'border-red-500/30' : staffReadiness === 'Warning' ? 'border-amber-500/30' : 'border-slate-700/50'}`}>
            <div className="flex items-center gap-1.5 mb-2">
              <Users className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" />
              <span className="text-[10px] text-slate-500 font-medium uppercase tracking-wide">Staff</span>
            </div>
            <p className="text-xl font-bold text-slate-900 dark:text-white">{totalPresent}<span className="text-sm text-slate-500">/{totalStaff}</span></p>
            <p className={`text-[11px] font-semibold mt-0.5 ${staffReadiness === 'Critical' ? 'text-red-600 dark:text-red-400' : staffReadiness === 'Warning' ? 'text-amber-600 dark:text-amber-400' : 'text-slate-300'}`}>{staffPct}% coverage</p>
            <p className="text-[10px] text-slate-500 mt-0.5">B-Shift gap</p>
          </div>

          {/* Active Alerts */}
          <div className={`bg-slate-800/30 border rounded-xl p-4 ${criticalCount > 0 ? 'border-red-500/30' : warningCount > 0 ? 'border-amber-500/30' : 'border-slate-700/50'}`}>
            <div className="flex items-center gap-1.5 mb-2">
              <AlertTriangle className="w-3.5 h-3.5 text-red-600 dark:text-red-400" />
              <span className="text-[10px] text-slate-500 font-medium uppercase tracking-wide">Alerts</span>
            </div>
            <p className="text-xl font-bold text-slate-900 dark:text-white">{visibleAlerts.length}</p>
            <p className="text-[11px] font-semibold mt-0.5 text-red-600 dark:text-red-400">{criticalCount} critical</p>
            <p className="text-[10px] text-slate-500 mt-0.5">{warningCount} warning</p>
          </div>

          {/* Medical Unit */}
          <div className={`bg-slate-800/30 border rounded-xl p-4 ${medicalReadiness === 'Warning' ? 'border-amber-500/30' : 'border-slate-700/50'}`}>
            <div className="flex items-center gap-1.5 mb-2">
              <Hospital className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" />
              <span className="text-[10px] text-slate-500 font-medium uppercase tracking-wide">Medical</span>
            </div>
            <p className="text-xl font-bold text-slate-900 dark:text-white">E-Pod</p>
            <p className="text-[11px] font-semibold mt-0.5 text-amber-600 dark:text-amber-400">92% occupied</p>
            <p className="text-[10px] text-slate-500 mt-0.5">44 / 48 beds</p>
          </div>

          {/* Court Transports */}
          <div className="bg-white dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700/50 rounded-xl shadow-sm dark:shadow-none p-4">
            <div className="flex items-center gap-1.5 mb-2">
              <Truck className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" />
              <span className="text-[10px] text-slate-500 font-medium uppercase tracking-wide">Transports</span>
            </div>
            <p className="text-xl font-bold text-slate-900 dark:text-white">{facilityMetrics.courtTransports}</p>
            <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5">5 runs today</p>
            <p className="text-[10px] text-amber-600 dark:text-amber-400 mt-0.5">31 tomorrow ⚠</p>
          </div>
        </div>

        {/* ── Row 2: Alerts + AI Intelligence ───────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">

          {/* Active Alerts */}
          <div className="lg:col-span-2 bg-white dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700/50 rounded-xl shadow-sm dark:shadow-none p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <AlertOctagon className="w-4 h-4 text-red-600 dark:text-red-400" />
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Active Alerts</h3>
                {criticalCount > 0 && (
                  <span className="px-1.5 py-0.5 bg-red-500/15 text-red-600 dark:text-red-400 text-[9px] font-bold rounded border border-red-500/20">{criticalCount} CRITICAL</span>
                )}
              </div>
            </div>
            <div className="space-y-2">
              {visibleAlerts.length === 0 ? (
                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 text-sm py-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>No active alerts</span>
                </div>
              ) : visibleAlerts.map(alert => (
                <div key={alert.id} className={`flex items-start gap-2.5 p-2.5 rounded-lg border text-[12px] ${
                  alert.type === 'critical'
                    ? 'bg-red-500/8 border-red-500/20'
                    : 'bg-amber-500/8 border-amber-500/20'
                }`}>
                  <AlertTriangle className={`w-3.5 h-3.5 flex-shrink-0 mt-0.5 ${alert.type === 'critical' ? 'text-red-600 dark:text-red-400' : 'text-amber-600 dark:text-amber-400'}`} />
                  <span className={alert.type === 'critical' ? 'text-red-200' : 'text-amber-200'}>{alert.msg}</span>
                  <button onClick={() => dismiss(alert.id)} className="ml-auto flex-shrink-0 text-slate-600 hover:text-slate-600 dark:text-slate-400 transition-colors">
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>

            {/* Readiness Status Bar */}
            <div className="mt-4 pt-3 border-t border-slate-700/50">
              <p className="text-[10px] text-slate-500 uppercase tracking-wide mb-2">System Readiness</p>
              <div className="grid grid-cols-2 gap-1.5">
                {[
                  { label: 'Capacity',  status: facilityReadiness },
                  { label: 'Staffing',  status: staffReadiness },
                  { label: 'Medical',   status: medicalReadiness },
                  { label: 'Court Ops', status: 'Normal' },
                ].map(item => (
                  <div key={item.label} className={`flex items-center justify-between px-2 py-1 rounded text-[10px] border ${readinessBadge(item.status)}`}>
                    <span>{item.label}</span>
                    <span className="font-semibold">{item.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* AI Command Intelligence */}
          <div className="lg:col-span-3 bg-white dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700/50 rounded-xl shadow-sm dark:shadow-none p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 bg-slate-700/30 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                </div>
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white">AI Command Intelligence</h3>
              </div>
              <button onClick={() => setAiExpanded(!aiExpanded)} className="text-slate-500 hover:text-slate-700 dark:text-slate-300 transition-colors text-[10px]">
                {aiExpanded ? 'Collapse' : 'Expand'}
              </button>
            </div>
            {aiExpanded && (
              <div className="space-y-2.5 text-[12px]">
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                  <p className="text-red-300 font-semibold mb-1 flex items-center gap-1.5"><Circle className="w-2.5 h-2.5 fill-red-400 text-red-600 dark:text-red-400" /> H2-Pod capacity violation — federal audit Dec 12</p>
                  <p className="text-slate-700 dark:text-slate-300">Transfer 2 minimum-security detainees to E-Pod observation beds (44/48 — space available) OR coordinate with USMS for early bond review.</p>
                </div>
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                  <p className="text-red-300 font-semibold mb-1 flex items-center gap-1.5"><Circle className="w-2.5 h-2.5 fill-red-400 text-red-600 dark:text-red-400" /> B-Shift below ACA minimum (13/14 officers for 842 inmates)</p>
                  <p className="text-slate-700 dark:text-slate-300">Authorize 8-hr OT for off-duty officer <span className="text-amber-300 font-medium">or</span> reassign Officer Johnson from A-Shift overlap (1400–1430).</p>
                </div>
                <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3">
                  <p className="text-amber-300 font-semibold mb-1 flex items-center gap-1.5"><Circle className="w-2.5 h-2.5 fill-amber-400 text-amber-600 dark:text-amber-400" /> 31 court transports tomorrow — only 4 vans available (need 5)</p>
                  <p className="text-slate-700 dark:text-slate-300">Request 1 additional van from Fleet or stagger: Group 1 depart 0630, Group 2 depart 0800.</p>
                </div>
              </div>
            )}
            {!aiExpanded && (
              <p className="text-[11px] text-slate-500">2 critical actions · 1 warning · Click expand to review</p>
            )}
            <div className="mt-3 pt-2.5 border-t border-slate-700/40 flex items-center justify-between">
              <span className="text-[10px] text-slate-600">AI-assisted · 4 sources · 3m ago</span>
              <button className="text-[11px] text-slate-600 dark:text-slate-400 hover:text-slate-700 dark:text-slate-300 transition-colors flex items-center gap-1">
                Full intelligence brief <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        {/* ── Row 3: Operational Risk ────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

          {/* Housing Unit Map */}
          <div className="bg-white dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700/50 rounded-xl shadow-sm dark:shadow-none p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Housing Unit Status</h3>
              </div>
              <div className="flex items-center gap-2 text-[9px] text-slate-500">
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-slate-600 inline-block" />Normal</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-amber-500/60 inline-block" />Near</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-red-500/60 inline-block" />Over</span>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-1.5">
              {housingPods.map(pod => {
                const colors = getPodColor(pod);
                const pct = getPct(pod);
                return (
                  <div key={pod.id} className={`rounded-lg border p-1.5 cursor-default ${colors.bg}`} title={`${pod.name} — ${pod.type}\n${pod.current}/${pod.capacity} (${pct}%)\n${pod.notes || ''}`}>
                    <p className="text-[9px] font-bold text-white truncate">{pod.id}</p>
                    <p className={`text-[10px] font-semibold ${colors.text}`}>{pct}%</p>
                    <div className="w-full h-0.5 bg-slate-700/50 rounded-full mt-1 overflow-hidden">
                      <div className={`h-full rounded-full ${colors.bar}`} style={{ width: `${Math.min(pct, 100)}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-3 pt-2.5 border-t border-slate-700/50 flex justify-between text-[10px] text-slate-500">
              <span>{housingPods.filter(p => p.status === 'Over Capacity').length} over · {housingPods.filter(p => p.status === 'Near Capacity').length} near capacity</span>
              <span>{housingPods.filter(p => p.status === 'Normal').length} normal</span>
            </div>
          </div>

          {/* Staff Coverage */}
          <div className="bg-white dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700/50 rounded-xl shadow-sm dark:shadow-none p-4">
            <div className="flex items-center gap-2 mb-3">
              <Users className="w-4 h-4 text-slate-600 dark:text-slate-400" />
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Staff Coverage</h3>
            </div>
            <div className="space-y-2.5">
              {shifts.map(shift => {
                const colors = getShiftColors(shift);
                const pct = Math.round((shift.present / shift.scheduled) * 100);
                return (
                  <div key={shift.label} className={`p-3 rounded-lg border ${colors.bg}`}>
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <div className={`w-1.5 h-1.5 rounded-full ${colors.dot}`} />
                        <span className="text-[12px] font-semibold text-white">{shift.label}</span>
                      </div>
                      <span className={`text-[11px] font-bold ${colors.text}`}>{shift.present}/{shift.scheduled}</span>
                    </div>
                    <div className="w-full h-1 bg-slate-700/50 rounded-full overflow-hidden mb-1.5">
                      <div className={`h-full rounded-full ${pct < 93 ? 'bg-red-500' : pct < 100 ? 'bg-amber-500' : 'bg-emerald-500'}`} style={{ width: `${pct}%` }} />
                    </div>
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="text-slate-500">{shift.supervisor}</span>
                      {shift.issue && <span className={`font-medium ${colors.text}`}>⚠ {shift.issue.split('—')[0]}</span>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Court Transport Schedule */}
          <div className="bg-white dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700/50 rounded-xl shadow-sm dark:shadow-none p-4">
            <div className="flex items-center gap-2 mb-3">
              <Truck className="w-4 h-4 text-slate-600 dark:text-slate-400" />
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Court Transport Schedule</h3>
            </div>
            <div className="space-y-2">
              {courtRuns.map((run, i) => (
                <div key={i} className="flex items-start gap-3 py-2 border-b border-slate-700/25 last:border-0">
                  <div className="w-12 text-right flex-shrink-0">
                    <p className="text-[11px] font-bold text-slate-700 dark:text-slate-300">{run.time}</p>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] font-medium text-white truncate">{run.court}</p>
                    <p className="text-[10px] text-slate-500">{run.inmates} inmates · {run.deputy}</p>
                  </div>
                  <div className="flex-shrink-0 text-right">
                    <span className={`text-[10px] font-semibold ${getRunStatus(run.status)}`}>{run.status}</span>
                    {run.etaReturn && <p className="text-[9px] text-slate-600">↩ {run.etaReturn}</p>}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-2 pt-2 border-t border-slate-700/50">
              <p className="text-[10px] text-amber-600 dark:text-amber-400 flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" />
                31 scheduled tomorrow — request 5th transport van
              </p>
            </div>
          </div>
        </div>

        {/* ── Row 4: Monitoring ─────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

          {/* Population Trend */}
          <div className="bg-white dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700/50 rounded-xl shadow-sm dark:shadow-none p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Population Trend</h3>
              </div>
              <span className="text-[10px] text-slate-500">7-day</span>
            </div>
            <div className="flex items-end gap-4">
              <div className="flex-1">
                <div className="flex items-end gap-1 h-14">
                  {populationTrend.map((d, i) => {
                    const min = 833;
                    const max = 853;
                    const pct = ((d.pop - min) / (max - min)) * 100;
                    const isNow = i === populationTrend.length - 1;
                    return (
                      <div key={d.date} className="flex-1 flex flex-col items-center gap-0.5" title={`${d.date}: ${d.pop}`}>
                        <div className="w-full rounded-t-sm" style={{ height: `${pct}%`, minHeight: 4, background: isNow ? 'rgba(245,158,11,0.7)' : 'rgba(100,116,139,0.5)' }} />
                      </div>
                    );
                  })}
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-[9px] text-slate-600">D-7</span>
                  <span className="text-[9px] text-slate-600">Now</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{facilityMetrics.currentPopulation}</p>
                <p className="text-[10px] text-slate-600 dark:text-slate-400">{facilityMetrics.sevenDayAverage} avg</p>
                <p className="text-[11px] text-amber-600 dark:text-amber-400 font-medium">+4 today</p>
              </div>
            </div>
            <div className="mt-3 pt-2.5 border-t border-slate-700/50 grid grid-cols-3 gap-2 text-center">
              <div>
                <p className="text-[10px] text-slate-500">Avg Stay</p>
                <p className="text-[12px] font-semibold text-white">23.4d</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-500">Longest</p>
                <p className="text-[12px] font-semibold text-white">847d</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-500">7-Day Fore.</p>
                <p className="text-[12px] font-semibold text-amber-600 dark:text-amber-400">840–850</p>
              </div>
            </div>
          </div>

          {/* Medical Monitoring */}
          <div className="bg-white dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700/50 rounded-xl shadow-sm dark:shadow-none p-4">
            <div className="flex items-center gap-2 mb-3">
              <Heart className="w-4 h-4 text-pink-400" />
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Medical Monitoring</h3>
            </div>
            <div className="space-y-2.5">
              {[
                { label: 'E-Pod Medical', value: '44/48', pct: 92, status: 'Near Capacity', note: '3 isolation cells active' },
                { label: 'E2 Mental Health', value: '38/40', pct: 95, status: 'Near Capacity', note: '24/7 monitoring' },
                { label: 'Hospital Guard', value: '1', pct: null, status: 'Active', note: 'Gwinnett Medical — Deputy Martinez' },
                { label: 'Pending Med Eval', value: '3', pct: null, status: 'Pending', note: 'Awaiting psych clearance' },
              ].map(item => (
                <div key={item.label} className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-0.5">
                      <p className="text-[11px] font-medium text-slate-200">{item.label}</p>
                      <span className={`text-[10px] font-semibold ${item.pct && item.pct >= 90 ? 'text-amber-600 dark:text-amber-400' : 'text-slate-400'}`}>{item.value}</span>
                    </div>
                    {item.pct !== null && (
                      <div className="w-full h-1 bg-slate-700/50 rounded-full overflow-hidden mb-0.5">
                        <div className={`h-full rounded-full ${item.pct >= 95 ? 'bg-red-500' : item.pct >= 85 ? 'bg-amber-500' : 'bg-emerald-500'}`} style={{ width: `${item.pct}%` }} />
                      </div>
                    )}
                    <p className="text-[10px] text-slate-600">{item.note}</p>
                  </div>
                </div>
              ))}
              <div className="pt-2 border-t border-slate-700/50">
                <p className="text-[10px] text-slate-500">Medical staff: 6/6 · RN Martinez on duty · Dr. Anderson on-call</p>
              </div>
            </div>
          </div>

          {/* Critical Tasks */}
          <div className="bg-white dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700/50 rounded-xl shadow-sm dark:shadow-none p-4">
            <div className="flex items-center gap-2 mb-3">
              <Zap className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Command Actions</h3>
            </div>
            <div className="space-y-2">
              {criticalTasks.map((task, i) => (
                <div key={i} className={`px-3 py-2 rounded-lg text-[11px] ${getUrgencyColors(task.urgency)}`}>
                  <div className="flex items-start justify-between gap-2">
                    <p className="leading-snug">{task.text}</p>
                  </div>
                  <p className={`text-[9px] mt-0.5 opacity-70 font-medium`}>Due: {task.due}</p>
                </div>
              ))}
            </div>
            <div className="mt-3 pt-2.5 border-t border-slate-700/50">
              <button
                onClick={() => navigate('/jail/dashboard')}
                className="w-full flex items-center justify-center gap-2 text-[11px] text-slate-600 dark:text-slate-400 hover:text-white transition-colors py-1"
              >
                <span>View Custody Operations</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}

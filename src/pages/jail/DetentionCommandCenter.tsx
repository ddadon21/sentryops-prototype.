import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';
import {
  Building2, Users, AlertTriangle, Shield, Hospital, Truck,
  Activity, TrendingUp, TrendingDown, Clock, CheckCircle,
  Circle, ArrowRight, RefreshCw, Sparkles, X,
  Heart, Zap, AlertOctagon, Calendar, FileText
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
  { text: 'Resolve H2-Pod over capacity — coordinate USMS transfer', urgency: 'critical', due: 'Before 1800', actionType: 'transfer',  label: 'Execute Transfer' },
  { text: 'Authorize OT for B-Shift (Officer Smith callout)',         urgency: 'high',     due: 'ASAP',         actionType: 'ot',         label: 'Authorize OT'    },
  { text: 'Request 5th transport van — 31 court runs tomorrow',       urgency: 'high',     due: 'Today 1700',   actionType: 'fleet',      label: 'Request Van'     },
  { text: 'E-Pod review with Medical Director Chen (44/48 beds)',     urgency: 'medium',   due: 'Today 1600',   actionType: 'medReview',  label: 'Schedule Review' },
  { text: 'Federal audit Dec 12-14 — resolve capacity violations',   urgency: 'medium',   due: 'Dec 11',       actionType: 'transfer',   label: 'Resolve Now'     },
];

// ── Helper functions ───────────────────────────────────────────

const getPodColor = (pod: HousingPod) => {
  if (pod.status === 'Over Capacity') return { bg: 'bg-red-500/15 border-red-500/40', text: 'text-red-300', bar: 'bg-red-500' };
  if (pod.status === 'Near Capacity') return { bg: 'bg-amber-500/10 border-amber-500/30', text: 'text-amber-300', bar: 'bg-amber-500' };
  return { bg: 'bg-slate-50 dark:bg-zinc-900/35 border-slate-200 dark:border-slate-700/25', text: 'text-slate-500', bar: 'bg-slate-600/50' };
};

const getPct = (pod: HousingPod) => Math.round((pod.current / pod.capacity) * 100);

const getShiftColors = (shift: ShiftStatus) => {
  const pct = (shift.present / shift.scheduled) * 100;
  if (pct < 93) return { text: 'text-red-600 dark:text-red-400',   bg: 'bg-red-500/10 border-red-500/20',     dot: 'bg-red-400' };
  if (pct < 100) return { text: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20', dot: 'bg-amber-400' };
  return { text: 'text-slate-500', bg: 'bg-slate-50 dark:bg-zinc-900/35 border-slate-700/40', dot: 'bg-slate-500' };
};

const getRunStatus = (status: CourtRun['status']) => {
  switch (status) {
    case 'Completed': return 'text-slate-500';
    case 'En Route':  return 'text-slate-500';
    case 'Staging':   return 'text-amber-600 dark:text-amber-400';
    default:          return 'text-slate-500';
  }
};

const getUrgencyColors = (u: string) => {
  if (u === 'critical') return 'border-l-2 border-red-500 bg-red-500/8 text-red-300';
  if (u === 'high') return 'border-l-2 border-amber-500 bg-amber-500/8 text-amber-300';
  return 'border-l-2 border-slate-600/50 bg-slate-100 dark:bg-zinc-900/30 text-slate-500';
};

// ── Component ─────────────────────────────────────────────────

export default function DetentionCommandCenter() {
  const navigate = useNavigate();
  const [aiExpanded, setAiExpanded] = useState(true);
  const [transferOpen, setTransferOpen] = useState(false);
  const [otOpen, setOtOpen] = useState(false);
  const [fleetOpen, setFleetOpen] = useState(false);
  const [medReviewOpen, setMedReviewOpen] = useState(false);
  const [transferDone, setTransferDone] = useState(false);
  const [otDone, setOtDone] = useState(false);
  const [fleetDone, setFleetDone] = useState(false);
  const [medReviewDone, setMedReviewDone] = useState(false);
  const [selectedTransfer, setSelectedTransfer] = useState(0);
  const [selectedOt, setSelectedOt] = useState(0);
  const [activeAlerts, setActiveAlerts] = useState([
    { id: 1, msg: 'H2-Pod over capacity (36/32) — emergency beds in use', type: 'critical', visible: true },
    { id: 2, msg: 'B-Shift understaffed 13/14 — ACA minimum at risk',    type: 'critical', visible: true },
    { id: 3, msg: 'E-Pod medical housing at 92% — monitor closely',       type: 'warning',  visible: true },
  ]);

  const visibleAlerts = activeAlerts.filter(a => a.visible);
  const criticalCount = visibleAlerts.filter(a => a.type === 'critical').length;
  const warningCount = visibleAlerts.filter(a => a.type === 'warning').length;
  const dismiss = (id: number) => setActiveAlerts(prev => prev.map(a => a.id === id ? { ...a, visible: false } : a));

  const handleTaskAction = (actionType: string) => {
    if (actionType === 'transfer')  { setTransferDone(false);   setTransferOpen(true);   }
    if (actionType === 'ot')        { setOtDone(false);         setOtOpen(true);         }
    if (actionType === 'fleet')     { setFleetDone(false);      setFleetOpen(true);      }
    if (actionType === 'medReview') { setMedReviewDone(false);  setMedReviewOpen(true);  }
  };

  const capacityPct = facilityMetrics.percentFull;
  const totalStaff = shifts.reduce((a, s) => a + s.scheduled, 0);
  const totalPresent = shifts.reduce((a, s) => a + s.present, 0);
  const staffPct = Math.round((totalPresent / totalStaff) * 100);

  // Readiness indicators for the status bar
  const facilityReadiness = capacityPct >= 95 ? 'Critical' : capacityPct >= 85 ? 'Warning' : 'Normal';
  const staffReadiness = staffPct < 93 ? 'Critical' : staffPct < 100 ? 'Warning' : 'Normal';
  const medicalReadiness = 'Warning'; // E-Pod 92%
  const overallReadiness = facilityReadiness === 'Critical' || staffReadiness === 'Critical' ? 'Critical' : 'Warning';

  // ── Detention Risk Score — composite 0–100 ──────────────────────────────
  const riskComponents = [
    { label: 'Housing',    score: 23, max: 25, detail: `${capacityPct}% capacity · H2 violation` },
    { label: 'Staffing',   score: 8,  max: 20, detail: `${staffPct}% coverage · B-Shift gap`     },
    { label: 'Medical',    score: 12, max: 20, detail: 'E-Pod 92% · E2-Pod 95%'                  },
    { label: 'Transports', score: 12, max: 15, detail: '31 runs tomorrow · 4 vans available'     },
    { label: 'Compliance', score: 13, max: 15, detail: 'Federal audit Dec 12 · H2 violation'     },
    { label: 'Incidents',  score: criticalCount >= 2 ? 5 : 3, max: 5, detail: `${criticalCount} critical · ${warningCount} warning` },
  ];
  const riskScore = riskComponents.reduce((s, c) => s + c.score, 0);
  const riskLevel = riskScore >= 70 ? 'Critical' : riskScore >= 40 ? 'Elevated' : 'Stable';
  const riskColor = riskScore >= 70 ? {
    bg: 'bg-red-500/8 border-red-500/25', icon: 'bg-red-500/20 border-red-500/30', text: 'text-red-400',
    bar: 'bg-red-500', badge: 'bg-red-500/15 border-red-500/30 text-red-400',
  } : riskScore >= 40 ? {
    bg: 'bg-amber-500/8 border-amber-500/25', icon: 'bg-amber-500/20 border-amber-500/30', text: 'text-amber-400',
    bar: 'bg-amber-500', badge: 'bg-amber-500/15 border-amber-500/30 text-amber-400',
  } : {
    bg: 'bg-emerald-500/8 border-emerald-500/25', icon: 'bg-emerald-500/20 border-emerald-500/30', text: 'text-emerald-400',
    bar: 'bg-emerald-500', badge: 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400',
  };

  const readinessBadge = (r: string) => {
    if (r === 'Critical') return 'bg-red-100 dark:bg-red-500/15 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-500/25';
    if (r === 'Warning')  return 'bg-amber-100 dark:bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-500/25';
    return 'bg-slate-100 dark:bg-zinc-800/30 text-slate-700 dark:text-slate-400 border border-slate-200 dark:border-slate-700/40';
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

        {/* ── Detention Risk Score ────────────────────────── */}
        <div className={`rounded-xl border px-5 py-3.5 flex flex-col sm:flex-row items-start sm:items-center gap-4 ${riskColor.bg}`}>
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${riskColor.icon}`}>
              <Shield className={`w-5 h-5 ${riskColor.text}`} />
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 mb-0.5">Detention Risk Score</p>
              <div className="flex items-center gap-2">
                <span className={`text-2xl font-bold ${riskColor.text}`}>{riskScore}<span className="text-sm font-normal text-slate-500">/100</span></span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${riskColor.badge}`}>{riskLevel.toUpperCase()}</span>
                <div className="w-20 h-1.5 bg-white dark:bg-zinc-800/60 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${riskColor.bar}`} style={{ width: `${riskScore}%` }} />
                </div>
              </div>
            </div>
          </div>
          <div className="hidden sm:block w-px h-10 bg-slate-200 dark:bg-zinc-800/50 flex-shrink-0" />
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-x-5 gap-y-1.5 flex-1">
            {riskComponents.map(c => {
              const hi = c.score >= c.max * 0.8;
              const med = c.score >= c.max * 0.5;
              return (
                <div key={c.label} title={c.detail}>
                  <div className="flex items-center gap-1 mb-0.5">
                    <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${hi ? 'bg-red-400' : med ? 'bg-amber-400' : 'bg-slate-500'}`} />
                    <p className="text-[9px] font-semibold text-slate-500 uppercase tracking-wide">{c.label}</p>
                  </div>
                  <p className={`text-[11px] font-bold ${hi ? 'text-red-400' : med ? 'text-amber-400' : 'text-slate-500'}`}>
                    {c.score}<span className="text-[9px] font-normal text-slate-600">/{c.max}</span>
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Row 1: Command Snapshot KPIs ───────────────── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {/* Facility Capacity */}
          <div className={`bg-slate-100 dark:bg-zinc-900/30 border rounded-xl p-4 ${capacityPct >= 95 ? 'border-red-500/30' : capacityPct >= 85 ? 'border-amber-500/30' : 'border-slate-700/50'}`}>
            <div className="flex items-center gap-1.5 mb-2">
              <Building2 className="w-3.5 h-3.5 text-slate-700 dark:text-slate-400" />
              <span className="text-[10px] text-slate-500 font-medium uppercase tracking-wide">Capacity</span>
            </div>
            <p className="text-xl font-bold text-slate-900 dark:text-white">{facilityMetrics.currentPopulation}<span className="text-sm text-slate-500">/{facilityMetrics.totalCapacity}</span></p>
            <p className={`text-[11px] font-semibold mt-0.5 ${capacityPct >= 95 ? 'text-red-600 dark:text-red-400' : capacityPct >= 85 ? 'text-amber-600 dark:text-amber-400' : 'text-slate-500'}`}>{capacityPct}% full</p>
            <div className="w-full h-1 bg-white dark:bg-zinc-800/50 rounded-full mt-1.5 overflow-hidden">
              <div className={`h-full rounded-full ${capacityPct >= 95 ? 'bg-red-500' : capacityPct >= 85 ? 'bg-amber-500' : 'bg-slate-500/60'}`} style={{ width: `${Math.min(capacityPct, 100)}%` }} />
            </div>
          </div>

          {/* Net Population Change */}
          <div className="bg-white dark:bg-zinc-900/30 border border-slate-200 dark:border-slate-700/50 rounded-xl shadow-sm dark:shadow-none p-4">
            <div className="flex items-center gap-1.5 mb-2">
              <Activity className="w-3.5 h-3.5 text-slate-700 dark:text-slate-400" />
              <span className="text-[10px] text-slate-500 font-medium uppercase tracking-wide">Population</span>
            </div>
            <p className="text-xl font-bold text-slate-900 dark:text-white">{facilityMetrics.bookingsToday}<span className="text-[11px] text-slate-700 dark:text-slate-400 ml-1">in</span></p>
            <p className="text-[11px] text-slate-700 dark:text-slate-400 mt-0.5">{facilityMetrics.releasesToday} releases</p>
            <p className={`text-[11px] font-semibold mt-0.5 flex items-center gap-0.5 ${facilityMetrics.netChange > 0 ? 'text-amber-600 dark:text-amber-400' : 'text-slate-500'}`}>
              {facilityMetrics.netChange > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              Net {facilityMetrics.netChange > 0 ? '+' : ''}{facilityMetrics.netChange} today
            </p>
          </div>

          {/* Staff Coverage */}
          <div className={`bg-slate-100 dark:bg-zinc-900/30 border rounded-xl p-4 ${staffReadiness === 'Critical' ? 'border-red-500/30' : staffReadiness === 'Warning' ? 'border-amber-500/30' : 'border-slate-700/50'}`}>
            <div className="flex items-center gap-1.5 mb-2">
              <Users className="w-3.5 h-3.5 text-slate-700 dark:text-slate-400" />
              <span className="text-[10px] text-slate-500 font-medium uppercase tracking-wide">Staff</span>
            </div>
            <p className="text-xl font-bold text-slate-900 dark:text-white">{totalPresent}<span className="text-sm text-slate-500">/{totalStaff}</span></p>
            <p className={`text-[11px] font-semibold mt-0.5 ${staffReadiness === 'Critical' ? 'text-red-600 dark:text-red-400' : staffReadiness === 'Warning' ? 'text-amber-600 dark:text-amber-400' : 'text-slate-500'}`}>{staffPct}% coverage</p>
            <p className="text-[10px] text-slate-500 mt-0.5">B-Shift gap</p>
          </div>

          {/* Active Alerts */}
          <div className={`bg-slate-100 dark:bg-zinc-900/30 border rounded-xl p-4 ${criticalCount > 0 ? 'border-red-500/30' : warningCount > 0 ? 'border-amber-500/30' : 'border-slate-700/50'}`}>
            <div className="flex items-center gap-1.5 mb-2">
              <AlertTriangle className="w-3.5 h-3.5 text-red-600 dark:text-red-400" />
              <span className="text-[10px] text-slate-500 font-medium uppercase tracking-wide">Alerts</span>
            </div>
            <p className="text-xl font-bold text-slate-900 dark:text-white">{visibleAlerts.length}</p>
            <p className="text-[11px] font-semibold mt-0.5 text-red-600 dark:text-red-400">{criticalCount} critical</p>
            <p className="text-[10px] text-slate-500 mt-0.5">{warningCount} warning</p>
          </div>

          {/* Medical Unit */}
          <div className={`bg-slate-100 dark:bg-zinc-900/30 border rounded-xl p-4 ${medicalReadiness === 'Warning' ? 'border-amber-500/30' : 'border-slate-700/50'}`}>
            <div className="flex items-center gap-1.5 mb-2">
              <Hospital className="w-3.5 h-3.5 text-slate-700 dark:text-slate-400" />
              <span className="text-[10px] text-slate-500 font-medium uppercase tracking-wide">Medical</span>
            </div>
            <p className="text-xl font-bold text-slate-900 dark:text-white">E-Pod</p>
            <p className="text-[11px] font-semibold mt-0.5 text-amber-600 dark:text-amber-400">92% occupied</p>
            <p className="text-[10px] text-slate-500 mt-0.5">44 / 48 beds</p>
          </div>

          {/* Court Transports */}
          <div className="bg-white dark:bg-zinc-900/30 border border-slate-200 dark:border-slate-700/50 rounded-xl shadow-sm dark:shadow-none p-4">
            <div className="flex items-center gap-1.5 mb-2">
              <Truck className="w-3.5 h-3.5 text-slate-700 dark:text-slate-400" />
              <span className="text-[10px] text-slate-500 font-medium uppercase tracking-wide">Transports</span>
            </div>
            <p className="text-xl font-bold text-slate-900 dark:text-white">{facilityMetrics.courtTransports}</p>
            <p className="text-[11px] text-slate-700 dark:text-slate-400 mt-0.5">5 runs today</p>
            <p className="text-[10px] text-amber-600 dark:text-amber-400 mt-0.5">31 tomorrow ⚠</p>
          </div>
        </div>

        {/* ── Row 2: Alerts + AI Intelligence ───────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">

          {/* Active Alerts */}
          <div className="lg:col-span-2 bg-white dark:bg-zinc-900/30 border border-slate-200 dark:border-slate-700/50 rounded-xl shadow-sm dark:shadow-none p-4">
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
                  <button onClick={() => dismiss(alert.id)} className="ml-auto flex-shrink-0 text-slate-700 hover:text-slate-600 dark:text-slate-400 transition-colors">
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>

            {/* Readiness Status Bar */}
            <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-700/50">
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
          <div className="lg:col-span-3 bg-white dark:bg-zinc-900/30 border border-slate-200 dark:border-slate-700/50 rounded-xl shadow-sm dark:shadow-none p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 bg-slate-100 dark:bg-zinc-800/30 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-slate-700 dark:text-slate-400" />
                </div>
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white">AI Command Intelligence</h3>
              </div>
              <button onClick={() => setAiExpanded(!aiExpanded)} className="text-slate-500 hover:text-slate-700 dark:text-slate-300 transition-colors text-[10px]">
                {aiExpanded ? 'Collapse' : 'Expand'}
              </button>
            </div>
            {aiExpanded && (
              <div className="space-y-2.5 text-[12px]">

                {/* H2-Pod */}
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                  <p className="text-red-300 font-semibold mb-1 flex items-center gap-1.5">
                    <Circle className="w-2.5 h-2.5 fill-red-400 text-red-600 dark:text-red-400" />
                    H2-Pod ICE Hold at 112.5% (36/32) — Federal audit Dec 12–14
                  </p>
                  <p className="text-slate-300 mb-2">Move 4 min-security detainees to C2-Pod (42/48 — 6 beds available). Expected results:</p>
                  <div className="flex flex-wrap gap-1.5 mb-2.5">
                    {['H2 drops to 100% (32/32)', 'Federal compliance restored', 'C2-Pod stays within limits', 'No staffing impact'].map(t => (
                      <span key={t} className="text-[10px] px-2 py-0.5 rounded-full border bg-emerald-500/10 border-emerald-500/20 text-emerald-400 font-medium">{t}</span>
                    ))}
                  </div>
                  <button onClick={() => { setTransferDone(false); setTransferOpen(true); }} className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-900 text-[11px] font-bold rounded-lg transition-colors">
                    Approve Transfer <ArrowRight className="w-3 h-3" />
                  </button>
                </div>

                {/* B-Shift OT */}
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                  <p className="text-red-300 font-semibold mb-1 flex items-center gap-1.5">
                    <Circle className="w-2.5 h-2.5 fill-red-400 text-red-600 dark:text-red-400" />
                    B-Shift at 92.9% (13/14) — ACA 1:60 ratio at risk with 842 inmates
                  </p>
                  <p className="text-slate-300 mb-2">Authorize 8-hr OT for Cpl. Davis (off-duty, certified). Cost: $234. Expected results:</p>
                  <div className="flex flex-wrap gap-1.5 mb-2.5">
                    {['B-Shift returns to 100% (14/14)', 'ACA compliance restored', 'Cost: $234 OT'].map(t => (
                      <span key={t} className="text-[10px] px-2 py-0.5 rounded-full border bg-emerald-500/10 border-emerald-500/20 text-emerald-400 font-medium">{t}</span>
                    ))}
                  </div>
                  <button onClick={() => { setOtDone(false); setOtOpen(true); }} className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-900 text-[11px] font-bold rounded-lg transition-colors">
                    Authorize Overtime <ArrowRight className="w-3 h-3" />
                  </button>
                </div>

                {/* Transport */}
                <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3">
                  <p className="text-amber-300 font-semibold mb-1 flex items-center gap-1.5">
                    <Circle className="w-2.5 h-2.5 fill-amber-400 text-amber-600 dark:text-amber-400" />
                    31 court transports tomorrow — only 4 vans available (need 5)
                  </p>
                  <p className="text-slate-300 mb-2">Request 1 additional van from Fleet OR stagger (Group 1: 06:30 / Group 2: 08:00). Expected results:</p>
                  <div className="flex flex-wrap gap-1.5 mb-2.5">
                    {['All 31 runs covered', 'No schedule delays', 'Fleet ETA: same day'].map(t => (
                      <span key={t} className="text-[10px] px-2 py-0.5 rounded-full border bg-emerald-500/10 border-emerald-500/20 text-emerald-400 font-medium">{t}</span>
                    ))}
                  </div>
                  <button onClick={() => { setFleetDone(false); setFleetOpen(true); }} className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-900 text-[11px] font-bold rounded-lg transition-colors">
                    Request Transport <ArrowRight className="w-3 h-3" />
                  </button>
                </div>

              </div>
            )}
            {!aiExpanded && (
              <p className="text-[11px] text-slate-500">2 critical actions · 1 warning · Click expand to review</p>
            )}
            <div className="mt-3 pt-2.5 border-t border-slate-200 dark:border-slate-700/40 flex items-center justify-between">
              <span className="text-[10px] text-slate-700">AI-assisted · 4 sources · 3m ago</span>
              <button className="text-[11px] text-slate-700 dark:text-slate-400 hover:text-slate-700 dark:text-slate-300 transition-colors flex items-center gap-1">
                Full intelligence brief <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        {/* ── Row 3: Operational Risk ────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

          {/* Housing Unit Map */}
          <div className="bg-white dark:bg-zinc-900/30 border border-slate-200 dark:border-slate-700/50 rounded-xl shadow-sm dark:shadow-none p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-slate-700 dark:text-slate-400" />
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
                    <p className="text-[9px] font-bold text-slate-900 dark:text-white truncate">{pod.id}</p>
                    <p className={`text-[10px] font-semibold ${colors.text}`}>{pct}%</p>
                    <div className="w-full h-0.5 bg-white dark:bg-zinc-800/50 rounded-full mt-1 overflow-hidden">
                      <div className={`h-full rounded-full ${colors.bar}`} style={{ width: `${Math.min(pct, 100)}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-3 pt-2.5 border-t border-slate-200 dark:border-slate-700/50 flex justify-between text-[10px] text-slate-500">
              <span>{housingPods.filter(p => p.status === 'Over Capacity').length} over · {housingPods.filter(p => p.status === 'Near Capacity').length} near capacity</span>
              <span>{housingPods.filter(p => p.status === 'Normal').length} normal</span>
            </div>
          </div>

          {/* Staff Coverage */}
          <div className="bg-white dark:bg-zinc-900/30 border border-slate-200 dark:border-slate-700/50 rounded-xl shadow-sm dark:shadow-none p-4">
            <div className="flex items-center gap-2 mb-3">
              <Users className="w-4 h-4 text-slate-700 dark:text-slate-400" />
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
                        <span className="text-[12px] font-semibold text-slate-900 dark:text-white">{shift.label}</span>
                      </div>
                      <span className={`text-[11px] font-bold ${colors.text}`}>{shift.present}/{shift.scheduled}</span>
                    </div>
                    <div className="w-full h-1 bg-white dark:bg-zinc-800/50 rounded-full overflow-hidden mb-1.5">
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
          <div className="bg-white dark:bg-zinc-900/30 border border-slate-200 dark:border-slate-700/50 rounded-xl shadow-sm dark:shadow-none p-4">
            <div className="flex items-center gap-2 mb-3">
              <Truck className="w-4 h-4 text-slate-700 dark:text-slate-400" />
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Court Transport Schedule</h3>
            </div>
            <div className="space-y-2">
              {courtRuns.map((run, i) => (
                <div key={i} className="flex items-start gap-3 py-2 border-b border-slate-200 dark:border-slate-200 dark:border-slate-700/25 last:border-0">
                  <div className="w-12 text-right flex-shrink-0">
                    <p className="text-[11px] font-bold text-slate-700 dark:text-slate-300">{run.time}</p>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] font-medium text-slate-900 dark:text-white truncate">{run.court}</p>
                    <p className="text-[10px] text-slate-500">{run.inmates} inmates · {run.deputy}</p>
                  </div>
                  <div className="flex-shrink-0 text-right">
                    <span className={`text-[10px] font-semibold ${getRunStatus(run.status)}`}>{run.status}</span>
                    {run.etaReturn && <p className="text-[9px] text-slate-700">↩ {run.etaReturn}</p>}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-2 pt-2 border-t border-slate-200 dark:border-slate-700/50">
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
          <div className="bg-white dark:bg-zinc-900/30 border border-slate-200 dark:border-slate-700/50 rounded-xl shadow-sm dark:shadow-none p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-slate-700 dark:text-slate-400" />
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
                  <span className="text-[9px] text-slate-700">D-7</span>
                  <span className="text-[9px] text-slate-700">Now</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{facilityMetrics.currentPopulation}</p>
                <p className="text-[10px] text-slate-700 dark:text-slate-400">{facilityMetrics.sevenDayAverage} avg</p>
                <p className="text-[11px] text-amber-600 dark:text-amber-400 font-medium">+4 today</p>
              </div>
            </div>
            <div className="mt-3 pt-2.5 border-t border-slate-200 dark:border-slate-700/50 grid grid-cols-3 gap-2 text-center">
              <div>
                <p className="text-[10px] text-slate-500">Avg Stay</p>
                <p className="text-[12px] font-semibold text-slate-900 dark:text-white">23.4d</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-500">Longest</p>
                <p className="text-[12px] font-semibold text-slate-900 dark:text-white">847d</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-500">7-Day Fore.</p>
                <p className="text-[12px] font-semibold text-amber-600 dark:text-amber-400">840–850</p>
              </div>
            </div>
          </div>

          {/* Medical Monitoring */}
          <div className="bg-white dark:bg-zinc-900/30 border border-slate-200 dark:border-slate-700/50 rounded-xl shadow-sm dark:shadow-none p-4">
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
                      <p className="text-[11px] font-medium text-slate-700 dark:text-slate-200">{item.label}</p>
                      <span className={`text-[10px] font-semibold ${item.pct && item.pct >= 90 ? 'text-amber-600 dark:text-amber-400' : 'text-slate-500'}`}>{item.value}</span>
                    </div>
                    {item.pct !== null && (
                      <div className="w-full h-1 bg-white dark:bg-zinc-800/50 rounded-full overflow-hidden mb-0.5">
                        <div className={`h-full rounded-full ${item.pct >= 95 ? 'bg-red-500' : item.pct >= 85 ? 'bg-amber-500' : 'bg-emerald-500'}`} style={{ width: `${item.pct}%` }} />
                      </div>
                    )}
                    <p className="text-[10px] text-slate-700">{item.note}</p>
                  </div>
                </div>
              ))}
              <div className="pt-2 border-t border-slate-200 dark:border-slate-700/50">
                <p className="text-[10px] text-slate-500">Medical staff: 6/6 · RN Martinez on duty · Dr. Anderson on-call</p>
              </div>
            </div>
          </div>

          {/* Critical Tasks */}
          <div className="bg-white dark:bg-zinc-900/30 border border-slate-200 dark:border-slate-700/50 rounded-xl shadow-sm dark:shadow-none p-4">
            <div className="flex items-center gap-2 mb-3">
              <Zap className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Command Actions</h3>
            </div>
            <div className="space-y-2">
              {criticalTasks.map((task, i) => (
                <div key={i} className={`px-3 py-2 rounded-lg text-[11px] ${getUrgencyColors(task.urgency)}`}>
                  <div className="flex items-start gap-2">
                    <p className="leading-snug flex-1">{task.text}</p>
                    <button
                      onClick={() => handleTaskAction(task.actionType)}
                      className="flex-shrink-0 flex items-center gap-1 px-2 py-1 bg-amber-500 hover:bg-amber-600 text-slate-900 rounded text-[9px] font-bold uppercase tracking-wide transition-colors whitespace-nowrap"
                    >
                      {task.label} <ArrowRight className="w-2.5 h-2.5" />
                    </button>
                  </div>
                  <p className="text-[9px] mt-0.5 opacity-70 font-medium">Due: {task.due}</p>
                </div>
              ))}
            </div>
            <div className="mt-3 pt-2.5 border-t border-slate-200 dark:border-slate-700/50">
              <button
                onClick={() => navigate('/jail/dashboard')}
                className="w-full flex items-center justify-center gap-2 text-[11px] text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:text-white transition-colors py-1"
              >
                <span>View Custody Operations</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* ── Transfer / Housing Workflow Modal ───────────────────────────────── */}
      {transferOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-10 overflow-y-auto">
          <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-sm" onClick={() => { setTransferOpen(false); setTransferDone(false); }} />
          <div className="relative w-full max-w-lg bg-white dark:bg-zinc-950 border border-slate-200 dark:border-slate-700/60 rounded-2xl shadow-2xl overflow-hidden mb-8">
            <div className="border-b border-slate-200 dark:border-slate-700/50 px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-red-500/15 border border-red-500/25 flex items-center justify-center">
                  <Building2 className="w-4 h-4 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-white">H2-Pod Overcapacity — Transfer Workflow</h3>
                  <p className="text-[10px] text-slate-500">Housing reassignment · USMS coordination</p>
                </div>
              </div>
              <button onClick={() => { setTransferOpen(false); setTransferDone(false); }} className="p-1.5 hover:bg-slate-100 dark:hover:bg-zinc-900/50 rounded-lg transition-colors">
                <X className="w-4 h-4 text-slate-500" />
              </button>
            </div>
            <div className="p-5">
              {!transferDone ? (
                <>
                  <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl mb-4">
                    <div className="grid grid-cols-3 gap-3 text-center">
                      {[
                        { label: 'H2-Pod', value: '36 / 32', sub: '112.5% — Violation', color: 'text-red-400' },
                        { label: 'Must Remove', value: '4+', sub: 'inmates to comply', color: 'text-slate-900 dark:text-white' },
                        { label: 'Federal Audit', value: '3 days', sub: 'Dec 12–14', color: 'text-amber-400' },
                      ].map(item => (
                        <div key={item.label}>
                          <p className="text-[10px] text-slate-500 uppercase font-semibold mb-0.5">{item.label}</p>
                          <p className={`text-xl font-bold ${item.color}`}>{item.value}</p>
                          <p className={`text-[10px] ${item.color === 'text-red-400' ? 'text-red-400' : 'text-slate-500'}`}>{item.sub}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-2">Select Resolution</p>
                  <div className="space-y-2 mb-4">
                    {[
                      {
                        id: 0, label: 'Internal Transfer — H2 → C2-Pod',
                        detail: 'C2-Pod (Work Release) has 6 available beds (42/48). Transfer 4 min-security ICE detainees. Immediate — no external coordination.',
                        outcomes: ['H2 drops to 100% (32/32)', 'Federal compliance restored', 'C2-Pod at 96% — within limits', 'No additional staffing needed'],
                        timeline: 'Immediate · 2 hrs',
                      },
                      {
                        id: 1, label: 'USMS Coordination — Early Bond Review',
                        detail: 'Request USMS schedule early bond hearing for 4 federal detainees. Reduces federal population long-term.',
                        outcomes: ['H2 drops to 100%', 'Long-term population reduction', 'Requires USMS scheduling'],
                        timeline: '18–24 hrs',
                      },
                      {
                        id: 2, label: 'Temporary Overflow — G2-Pod',
                        detail: 'G2-Pod (Pre-Release) has 5 beds available (35/40). Temporary housing with enhanced monitoring. Interim solution.',
                        outcomes: ['H2 at 100%', 'G2-Pod at 100%', 'Requires monitoring officer', 'Resolve by Dec 11'],
                        timeline: 'Immediate · Interim',
                      },
                    ].map(opt => (
                      <label key={opt.id} className={`block p-3 border rounded-xl cursor-pointer transition-all ${selectedTransfer === opt.id ? 'bg-amber-500/10 border-amber-500/30' : 'bg-slate-100/50 dark:bg-zinc-900/20 border-slate-700/30 hover:border-slate-600/50'}`}>
                        <div className="flex items-start gap-3">
                          <input type="radio" name="transferOption" checked={selectedTransfer === opt.id} onChange={() => setSelectedTransfer(opt.id)} className="mt-1 accent-amber-500 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-[12px] font-semibold text-slate-900 dark:text-white mb-0.5">{opt.label}</p>
                            <p className="text-[10px] text-slate-500 mb-1.5">{opt.detail}</p>
                            <div className="flex flex-wrap gap-1 mb-1">
                              {opt.outcomes.map(o => (
                                <span key={o} className="text-[9px] px-1.5 py-0.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-full">{o}</span>
                              ))}
                            </div>
                            <p className="text-[9px] text-slate-500">Timeline: {opt.timeline}</p>
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                  <button onClick={() => setTransferDone(true)} className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold rounded-xl text-sm transition-colors">
                    <CheckCircle className="w-4 h-4" />Approve Transfer Order
                  </button>
                </>
              ) : (
                <div className="py-4 text-center">
                  <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-emerald-500/15 border-2 border-emerald-500/30 flex items-center justify-center">
                    <CheckCircle className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white mb-1">Transfer Order Issued</h4>
                  <p className="text-sm text-slate-500 mb-4">Housing reassignment authorized and logged. Officers notified.</p>
                  <div className="text-left p-3.5 bg-slate-100/80 dark:bg-zinc-900/30 border border-slate-700/40 rounded-xl mb-4 space-y-1.5">
                    {['Transfer order created and logged', 'Classification officers notified', 'Housing records updated', 'Federal compliance flag cleared', 'Command calendar updated', 'Audit trail created'].map((a, i) => (
                      <div key={i} className="flex items-center gap-2 text-[11px] text-slate-900 dark:text-white">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />{a}
                      </div>
                    ))}
                  </div>
                  <button onClick={() => { setTransferOpen(false); setTransferDone(false); }} className="text-sm text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">Done</button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── OT Authorization Modal ──────────────────────────────────────────── */}
      {otOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-10 overflow-y-auto">
          <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-sm" onClick={() => { setOtOpen(false); setOtDone(false); }} />
          <div className="relative w-full max-w-lg bg-white dark:bg-zinc-950 border border-slate-200 dark:border-slate-700/60 rounded-2xl shadow-2xl overflow-hidden mb-8">
            <div className="border-b border-slate-200 dark:border-slate-700/50 px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-500/15 border border-amber-500/25 flex items-center justify-center">
                  <Users className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-white">B-Shift Staffing — OT Authorization</h3>
                  <p className="text-[10px] text-slate-500">Staffing approval · Officer Smith sick call</p>
                </div>
              </div>
              <button onClick={() => { setOtOpen(false); setOtDone(false); }} className="p-1.5 hover:bg-slate-100 dark:hover:bg-zinc-900/50 rounded-lg transition-colors">
                <X className="w-4 h-4 text-slate-500" />
              </button>
            </div>
            <div className="p-5">
              {!otDone ? (
                <>
                  <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl mb-4">
                    <div className="grid grid-cols-3 gap-3 text-center">
                      {[
                        { label: 'B-Shift', value: '13 / 14', sub: '92.9% — Gap', color: 'text-amber-400' },
                        { label: 'Population', value: '842', sub: '1:64.8 ratio', color: 'text-slate-900 dark:text-white' },
                        { label: 'ACA Minimum', value: '1:60', sub: 'Currently at risk', color: 'text-red-400' },
                      ].map(item => (
                        <div key={item.label}>
                          <p className="text-[10px] text-slate-500 uppercase font-semibold mb-0.5">{item.label}</p>
                          <p className={`text-xl font-bold ${item.color}`}>{item.value}</p>
                          <p className={`text-[10px] ${item.color === 'text-red-400' ? 'text-red-400' : item.color === 'text-amber-400' ? 'text-amber-400' : 'text-slate-500'}`}>{item.sub}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-2">Coverage Options</p>
                  <div className="space-y-2 mb-4">
                    {[
                      {
                        id: 0, label: 'Authorize OT — Cpl. Davis (Off-Duty)',
                        detail: 'Cpl. Davis is off-duty, B-Shift certified, and available. 8-hour authorization covers full shift through changeover.',
                        outcomes: ['B-Shift returns to 100% (14/14)', 'ACA ratio restored (1:60)', 'Cost: $234 overtime'],
                        note: 'Recommended — lowest operational impact',
                      },
                      {
                        id: 1, label: 'A-Shift Overlap — Reassign Officer Johnson',
                        detail: 'Officer Johnson available 14:00–14:30 during A/B overlap. Covers the gap for the transition window.',
                        outcomes: ['Covers gap at $0 OT cost', 'B-Shift at 100%', '30-minute window only'],
                        note: '$0 cost · Limited to overlap window',
                      },
                      {
                        id: 2, label: 'C-Shift Early Report — Volunteer OT',
                        detail: 'Request a C-Shift officer to report 2 hours early. Voluntary OT, covers full B-Shift gap through changeover.',
                        outcomes: ['Full gap covered', 'No mandatory OT', 'Requires volunteer availability'],
                        note: 'Contingency option',
                      },
                    ].map(opt => (
                      <label key={opt.id} className={`block p-3 border rounded-xl cursor-pointer transition-all ${selectedOt === opt.id ? 'bg-amber-500/10 border-amber-500/30' : 'bg-slate-100/50 dark:bg-zinc-900/20 border-slate-700/30 hover:border-slate-600/50'}`}>
                        <div className="flex items-start gap-3">
                          <input type="radio" name="otOption" checked={selectedOt === opt.id} onChange={() => setSelectedOt(opt.id)} className="mt-1 accent-amber-500 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-[12px] font-semibold text-slate-900 dark:text-white mb-0.5">{opt.label}</p>
                            <p className="text-[10px] text-slate-500 mb-1.5">{opt.detail}</p>
                            <div className="flex flex-wrap gap-1 mb-1">
                              {opt.outcomes.map(o => (
                                <span key={o} className="text-[9px] px-1.5 py-0.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-full">{o}</span>
                              ))}
                            </div>
                            <p className="text-[9px] text-slate-500">{opt.note}</p>
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                  <button onClick={() => setOtDone(true)} className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold rounded-xl text-sm transition-colors">
                    <CheckCircle className="w-4 h-4" />Authorize Coverage
                  </button>
                </>
              ) : (
                <div className="py-4 text-center">
                  <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-emerald-500/15 border-2 border-emerald-500/30 flex items-center justify-center">
                    <CheckCircle className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white mb-1">Coverage Authorized</h4>
                  <p className="text-sm text-slate-500 mb-4">B-Shift OT authorization logged. Officer notified.</p>
                  <div className="text-left p-3.5 bg-slate-100/80 dark:bg-zinc-900/30 border border-slate-700/40 rounded-xl mb-4 space-y-1.5">
                    {['OT authorization logged to payroll system', 'Officer notified via radio and text', 'Sgt. Thompson (B-Shift supervisor) notified', 'Scheduling records updated', 'ACA compliance gap resolved', 'Audit trail created'].map((a, i) => (
                      <div key={i} className="flex items-center gap-2 text-[11px] text-slate-900 dark:text-white">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />{a}
                      </div>
                    ))}
                  </div>
                  <button onClick={() => { setOtOpen(false); setOtDone(false); }} className="text-sm text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">Done</button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── Fleet Request Modal ─────────────────────────────────────────────── */}
      {fleetOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-10 overflow-y-auto">
          <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-sm" onClick={() => { setFleetOpen(false); setFleetDone(false); }} />
          <div className="relative w-full max-w-lg bg-white dark:bg-zinc-950 border border-slate-200 dark:border-slate-700/60 rounded-2xl shadow-2xl overflow-hidden mb-8">
            <div className="border-b border-slate-200 dark:border-slate-700/50 px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-500/15 border border-amber-500/25 flex items-center justify-center">
                  <Truck className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Fleet Resource Request</h3>
                  <p className="text-[10px] text-slate-500">Transport van request · Court operations</p>
                </div>
              </div>
              <button onClick={() => { setFleetOpen(false); setFleetDone(false); }} className="p-1.5 hover:bg-slate-100 dark:hover:bg-zinc-900/50 rounded-lg transition-colors">
                <X className="w-4 h-4 text-slate-500" />
              </button>
            </div>
            <div className="p-5">
              {!fleetDone ? (
                <>
                  <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl mb-4">
                    <div className="grid grid-cols-3 gap-3 text-center">
                      {[
                        { label: 'Runs Tomorrow', value: '31', sub: 'Court transports', color: 'text-amber-400' },
                        { label: 'Vans Available', value: '4', sub: 'Current fleet', color: 'text-slate-900 dark:text-white' },
                        { label: 'Shortfall', value: '1 van', sub: 'Need by 0600', color: 'text-red-400' },
                      ].map(item => (
                        <div key={item.label}>
                          <p className="text-[10px] text-slate-500 uppercase font-semibold mb-0.5">{item.label}</p>
                          <p className={`text-xl font-bold ${item.color}`}>{item.value}</p>
                          <p className={`text-[10px] ${item.color === 'text-red-400' ? 'text-red-400' : item.color === 'text-amber-400' ? 'text-amber-400' : 'text-slate-500'}`}>{item.sub}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-3 mb-4">
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { label: 'Vehicle Type',    value: 'Transport Van (12-passenger)' },
                        { label: 'Request Date',    value: 'Tomorrow — Dec 12, 2024' },
                        { label: 'Required By',     value: '06:00 — First run departure' },
                        { label: 'Return Time',     value: '17:00 est.' },
                      ].map(f => (
                        <div key={f.label} className="p-2.5 bg-slate-100/80 dark:bg-zinc-900/30 border border-slate-700/40 rounded-lg">
                          <p className="text-[10px] text-slate-500 uppercase font-semibold mb-0.5">{f.label}</p>
                          <p className="text-[12px] font-semibold text-slate-900 dark:text-white">{f.value}</p>
                        </div>
                      ))}
                    </div>
                    <div className="p-2.5 bg-slate-100/80 dark:bg-zinc-900/30 border border-slate-700/40 rounded-lg">
                      <p className="text-[10px] text-slate-500 uppercase font-semibold mb-1">Justification</p>
                      <p className="text-[12px] text-slate-900 dark:text-white">31 court transports scheduled for Dec 12. Current 4-van fleet capacity is insufficient. 1 additional van required for full coverage without schedule delays.</p>
                    </div>
                    <div className="p-2.5 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                      <p className="text-[10px] text-slate-500 uppercase font-semibold mb-1 flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-blue-400" />Alternative — Stagger Schedule
                      </p>
                      <p className="text-[11px] text-slate-700 dark:text-slate-300">If fleet request delayed: Group 1 depart 06:30 (16 inmates), Group 2 depart 08:00 (15 inmates). Same 4 vans — all runs completed by 17:00.</p>
                    </div>
                  </div>
                  <button onClick={() => setFleetDone(true)} className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold rounded-xl text-sm transition-colors">
                    <FileText className="w-4 h-4" />Submit Fleet Request
                  </button>
                </>
              ) : (
                <div className="py-4 text-center">
                  <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-emerald-500/15 border-2 border-emerald-500/30 flex items-center justify-center">
                    <CheckCircle className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white mb-1">Fleet Request Submitted</h4>
                  <p className="text-sm text-slate-500 mb-4">Request routed to Fleet Management. Confirmation expected within 2 hours.</p>
                  <div className="text-left p-3.5 bg-slate-100/80 dark:bg-zinc-900/30 border border-slate-700/40 rounded-xl mb-4 space-y-1.5">
                    {['Fleet request submitted to Fleet Management', 'Transport Coordinator notified', 'Court schedule updated with contingency stagger', 'Request logged to command record', 'Follow-up reminder set for 20:00'].map((a, i) => (
                      <div key={i} className="flex items-center gap-2 text-[11px] text-slate-900 dark:text-white">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />{a}
                      </div>
                    ))}
                  </div>
                  <button onClick={() => { setFleetOpen(false); setFleetDone(false); }} className="text-sm text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">Done</button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── Medical Review Modal ────────────────────────────────────────────── */}
      {medReviewOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-10 overflow-y-auto">
          <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-sm" onClick={() => { setMedReviewOpen(false); setMedReviewDone(false); }} />
          <div className="relative w-full max-w-lg bg-white dark:bg-zinc-950 border border-slate-200 dark:border-slate-700/60 rounded-2xl shadow-2xl overflow-hidden mb-8">
            <div className="border-b border-slate-200 dark:border-slate-700/50 px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-500/15 border border-amber-500/25 flex items-center justify-center">
                  <Hospital className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-white">E-Pod Medical Review</h3>
                  <p className="text-[10px] text-slate-500">Medical command review · Dr. Chen</p>
                </div>
              </div>
              <button onClick={() => { setMedReviewOpen(false); setMedReviewDone(false); }} className="p-1.5 hover:bg-slate-100 dark:hover:bg-zinc-900/50 rounded-lg transition-colors">
                <X className="w-4 h-4 text-slate-500" />
              </button>
            </div>
            <div className="p-5">
              {!medReviewDone ? (
                <>
                  <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl mb-4">
                    <div className="grid grid-cols-3 gap-3 text-center">
                      {[
                        { label: 'E-Pod Medical', value: '44 / 48', sub: '92% — Near capacity', color: 'text-amber-400' },
                        { label: 'E2 Mental Health', value: '38 / 40', sub: '95% — Near capacity', color: 'text-amber-400' },
                        { label: 'Isolation Cells', value: '3', sub: 'Active', color: 'text-slate-900 dark:text-white' },
                      ].map(item => (
                        <div key={item.label}>
                          <p className="text-[10px] text-slate-500 uppercase font-semibold mb-0.5">{item.label}</p>
                          <p className={`text-xl font-bold ${item.color}`}>{item.value}</p>
                          <p className="text-[10px] text-slate-500">{item.sub}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="mb-4">
                    <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-2">Review Agenda</p>
                    <div className="space-y-1.5">
                      {[
                        { item: 'E-Pod capacity management plan',          urgency: 'high',   note: '4 beds from capacity' },
                        { item: 'Active isolation cell assessments (3)',    urgency: 'high',   note: 'Protocols in place' },
                        { item: 'E2-Pod mental health unit at 95%',        urgency: 'medium', note: 'Monitor for 24 hrs' },
                        { item: 'Pending psych clearances (3 inmates)',    urgency: 'medium', note: 'Awaiting assessment' },
                        { item: 'Hospital guard rotation — Deputy Martinez', urgency: 'low',  note: 'Gwinnett Medical' },
                      ].map(({ item, urgency, note }) => (
                        <div key={item} className={`flex items-center justify-between px-3 py-2 rounded-lg border text-[11px] ${urgency === 'high' ? 'bg-amber-500/8 border-amber-500/20' : urgency === 'medium' ? 'bg-slate-100/50 dark:bg-zinc-900/20 border-slate-700/30' : 'bg-slate-100/50 dark:bg-zinc-900/20 border-slate-700/30'}`}>
                          <span className={urgency === 'high' ? 'text-amber-300' : 'text-slate-700 dark:text-slate-300'}>{item}</span>
                          <span className="text-[9px] text-slate-500 flex-shrink-0 ml-2">{note}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="p-3 bg-slate-100/80 dark:bg-zinc-900/30 border border-slate-700/40 rounded-xl mb-4">
                    <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-2">Meeting Details</p>
                    <div className="grid grid-cols-2 gap-2 text-[11px]">
                      <div className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-slate-400" /><span className="text-slate-900 dark:text-white">Today — Dec 11, 2024</span></div>
                      <div className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-slate-400" /><span className="text-slate-900 dark:text-white">16:00 — E-Pod Conference</span></div>
                      <div className="flex items-center gap-1.5 col-span-2"><Users className="w-3.5 h-3.5 text-slate-400" /><span className="text-slate-900 dark:text-white">Dr. Chen · RN Martinez · Shift Commander</span></div>
                    </div>
                  </div>
                  <button onClick={() => setMedReviewDone(true)} className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold rounded-xl text-sm transition-colors">
                    <Calendar className="w-4 h-4" />Confirm Medical Review
                  </button>
                </>
              ) : (
                <div className="py-4 text-center">
                  <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-emerald-500/15 border-2 border-emerald-500/30 flex items-center justify-center">
                    <CheckCircle className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white mb-1">Medical Review Scheduled</h4>
                  <p className="text-sm text-slate-500 mb-4">Review confirmed for today at 16:00 — E-Pod Conference Room.</p>
                  <div className="text-left p-3.5 bg-slate-100/80 dark:bg-zinc-900/30 border border-slate-700/40 rounded-xl mb-4 space-y-1.5">
                    {['Review scheduled on Command Calendar', 'Dr. Chen notified and confirmed', 'RN Martinez notified', 'Agenda distributed to attendees', 'E-Pod status flagged for review', 'Audit trail created'].map((a, i) => (
                      <div key={i} className="flex items-center gap-2 text-[11px] text-slate-900 dark:text-white">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />{a}
                      </div>
                    ))}
                  </div>
                  <button onClick={() => { setMedReviewOpen(false); setMedReviewDone(false); }} className="text-sm text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">Done</button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

    </DashboardLayout>
  );
}

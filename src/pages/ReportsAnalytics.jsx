import React, { useState, useRef } from 'react';
import {
  Users, FileText, TrendingUp, Search, DollarSign, CheckCircle, Shield,
  Download, Calendar, BarChart3, Activity, Clock, ArrowUpRight, ArrowDownRight,
  Eye, RefreshCw, FileSpreadsheet, Building2, Target, Plus, BookOpen,
  PlayCircle, Printer, ShieldCheck, Phone, CalendarClock, Zap, X
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';

// ── Design system constants (matches BudgetResources) ─────────
const CARD = 'bg-white dark:bg-slate-800/25 border border-slate-200 dark:border-slate-700/30 rounded-xl';
const CARD_HEADER = 'flex items-center justify-between px-5 py-3.5 border-b border-slate-100 dark:border-slate-800/60';
const BADGE = (color) => {
  if (color === 'red')    return 'px-2 py-0.5 text-[10px] font-bold rounded border bg-red-100 dark:bg-red-500/10 text-red-700 dark:text-red-400 border-red-200 dark:border-red-500/20';
  if (color === 'amber')  return 'px-2 py-0.5 text-[10px] font-bold rounded border bg-amber-100 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-500/20';
  if (color === 'green')  return 'px-2 py-0.5 text-[10px] font-bold rounded border bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20';
  if (color === 'blue')   return 'px-2 py-0.5 text-[10px] font-bold rounded border bg-blue-100 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-500/20';
  if (color === 'violet') return 'px-2 py-0.5 text-[10px] font-bold rounded border bg-violet-100 dark:bg-violet-500/10 text-violet-700 dark:text-violet-400 border-violet-200 dark:border-violet-500/20';
  return 'px-2 py-0.5 text-[10px] font-bold rounded border bg-slate-100 dark:bg-slate-700/40 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-600/30';
};
const primaryBtn = 'inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-lg text-[11px] font-bold bg-amber-500 hover:bg-amber-600 text-white border border-amber-600/40 transition-colors';
const secondaryBtn = 'inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-lg text-[11px] font-semibold bg-white dark:bg-slate-800/60 hover:bg-slate-50 dark:hover:bg-slate-700/60 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/40 transition-colors';

export default function PerformanceCompliance() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [timeRange, setTimeRange] = useState('ytd');
  const [reportDetailModal, setReportDetailModal] = useState(null);
  const [exportModal, setExportModal] = useState(false);
  const [scheduleModal, setScheduleModal] = useState(false);
  const [customReportModal, setCustomReportModal] = useState(false);
  const [comparisonModal, setComparisonModal] = useState(false);
  const [filterCategory, setFilterCategory] = useState('all');
  const [actionedIds, setActionedIds] = useState(new Set());
  const [toast, setToast] = useState(null);
  const toastTimerRef = useRef(null);

  const reportActions = [
    {
      id: 'ra-1',
      urgency: 'Critical',
      decision: 'Sign and submit USMS Inspection Compliance Report.',
      ifIgnored: 'ACA accreditation review blocked — finding risk increases.',
      countdown: '48 hrs',
      actionLabel: 'Sign & Submit',
    },
    {
      id: 'ra-2',
      urgency: 'Critical',
      decision: 'Approve Q4 Overtime Variance Report — Patrol 19% over allocation.',
      ifIgnored: 'Finance cannot close Q4 budget without command sign-off.',
      countdown: '3 days',
      actionLabel: 'Approve',
    },
    {
      id: 'ra-3',
      urgency: 'High',
      decision: 'Certify Annual POST Compliance Report — 8 deputies expiring.',
      ifIgnored: '8 deputies lose enforcement authority Jan 31.',
      countdown: '7 days',
      actionLabel: 'Certify',
    },
    {
      id: 'ra-4',
      urgency: 'Normal',
      decision: 'Schedule Q1 2026 Executive Performance Review Briefing.',
      ifIgnored: 'KPI review delayed — corrective actions pushed to Q2.',
      countdown: '14 days',
      actionLabel: 'Schedule',
    },
  ];

  const complianceStatus = [
    { label: 'CJIS Security', status: 'Compliant',      pct: 100, detail: 'v5.9 — All 164 staff certified',         nextReview: 'Nov 2026', route: '/command/risk' },
    { label: 'ACA Detention', status: 'At Risk',         pct: 62,  detail: '2 open findings — HVAC deadline 48 hrs', nextReview: 'Jan 2026', route: '/command/risk' },
    { label: 'PREA Standards', status: 'Compliant',     pct: 100, detail: 'Zero incidents YTD · 100% trained',       nextReview: 'Oct 2026', route: '/command/risk' },
    { label: 'GA POST Certs',  status: 'Action Needed', pct: 45,  detail: '8 deputies expiring within 30 days',      nextReview: 'Jan 2026', route: '/hr/training' },
  ];

  const keyMetrics = {
    callsForService:    { total: 145678,  change: 5.2  },
    responseTime:       { average: 8.4,   target: 8.0  },
    crimeClearanceRate: { rate: 68.5,     target: 70.0 },
    arrestsYTD:         { total: 12456,   change: -2.1 },
    staffing:           { current: 164,   authorized: 178, percentage: 92.1 },
    overtime:           { hours: 18943,   cost: 1247850,   change: -8.5  },
  };

  const divisionPerformance = [
    {
      name: 'Patrol Division', calls: 89234, responseTime: 7.8, clearanceRate: 45.2, staffing: 92, efficiency: 88,
      health: 'At Risk', healthColor: 'amber',
      strength: 'Response time 0.2 min under 8-min target — highest call volume in department',
      watch: 'Clearance rate 4.8 pts below dept avg — resource shortage driving investigative delays',
    },
    {
      name: 'Investigations', calls: 5643, responseTime: 24.5, clearanceRate: 82.3, staffing: 95, efficiency: 91,
      health: 'Healthy', healthColor: 'green',
      strength: '82.3% clearance rate — best in department, near-full staffing, felony conviction up 6%',
      watch: 'Case backlog growing +14% YoY in complex felonies — capacity ceiling approaching',
    },
    {
      name: 'Detention', calls: 0, responseTime: 0, clearanceRate: 0, staffing: 94, efficiency: 87, inmates: 842, capacity: 920,
      health: 'Healthy', healthColor: 'green',
      strength: 'Occupancy at 91.5% (within safe range), PREA compliant, zero safety incidents YTD',
      watch: 'ACA open finding — HVAC remediation required before 48-hr deadline',
    },
    {
      name: 'Support Services', calls: 12456, responseTime: 15.2, clearanceRate: 68.9, staffing: 89, efficiency: 85,
      health: 'Watch', healthColor: 'amber',
      strength: 'Clearance rate above department average, fleet utilization improving (+4%)',
      watch: 'Lowest staffing — 11% vacancy driving $588K annual OT exposure',
    },
  ];

  const monthlyTrends = [
    { month: 'Jan', calls: 12345, arrests: 1045, clearance: 66.2 },
    { month: 'Feb', calls: 11892, arrests: 1023, clearance: 67.1 },
    { month: 'Mar', calls: 13124, arrests: 1156, clearance: 68.3 },
    { month: 'Apr', calls: 12876, arrests: 1089, clearance: 67.8 },
    { month: 'May', calls: 13654, arrests: 1198, clearance: 69.1 },
    { month: 'Jun', calls: 14235, arrests: 1267, clearance: 68.9 },
    { month: 'Jul', calls: 15123, arrests: 1342, clearance: 69.5 },
    { month: 'Aug', calls: 14987, arrests: 1298, clearance: 68.7 },
    { month: 'Sep', calls: 13456, arrests: 1187, clearance: 67.9 },
    { month: 'Oct', calls: 12986, arrests: 1102, clearance: 68.5 },
  ];

  const crimeStats = [
    { category: 'Property Crime',    incidents: 4523, change: -5.8,  arrests: 3102, clearance: 68.6 },
    { category: 'Violent Crime',     incidents: 892,  change: 2.3,   arrests: 745,  clearance: 83.5 },
    { category: 'Drug Offenses',     incidents: 1876, change: -12.4, arrests: 1654, clearance: 88.2 },
    { category: 'Traffic Violations',incidents: 8934, change: 3.2,   arrests: 7823, clearance: 87.6 },
    { category: 'Public Order',      incidents: 2134, change: -1.5,  arrests: 1678, clearance: 78.6 },
  ];

  const availableReports = [
    { id: 1,  name: 'Executive Monthly Summary',    description: 'Command-level KPIs, trends, and decisions needed',          category: 'Executive',   frequency: 'Monthly',    icon: FileText,      scheduled: true,  views: 342, downloads: 89,  lastGenerated: 'May 28, 2026', pages: 12 },
    { id: 2,  name: 'Crime Statistics Report',      description: 'Detailed crime trends and clearance rates by category',     category: 'Operations',  frequency: 'Weekly',     icon: BarChart3,     scheduled: true,  views: 156, downloads: 45,  lastGenerated: 'May 26, 2026', pages: 8  },
    { id: 3,  name: 'Personnel Compliance Report',  description: 'Certifications, training status, POST compliance',          category: 'HR',          frequency: 'Weekly',     icon: Users,         scheduled: true,  views: 234, downloads: 67,  lastGenerated: 'May 25, 2026', pages: 6  },
    { id: 4,  name: 'Budget Variance Analysis',     description: 'YTD spending vs budget by division and category',           category: 'Finance',     frequency: 'Monthly',    icon: DollarSign,    scheduled: true,  views: 423, downloads: 124, lastGenerated: 'May 28, 2026', pages: 15 },
    { id: 5,  name: 'Use of Force Analysis',        description: 'Incidents, trends, and policy compliance review',           category: 'Operations',  frequency: 'Quarterly',  icon: Shield,        scheduled: true,  views: 178, downloads: 52,  lastGenerated: 'Apr 1, 2026',  pages: 18 },
    { id: 6,  name: 'Community Engagement Metrics', description: 'Public interactions and satisfaction survey results',        category: 'Community',   frequency: 'Monthly',    icon: Users,         scheduled: false, views: 89,  downloads: 23,  lastGenerated: 'Apr 28, 2026', pages: 5  },
    { id: 7,  name: 'Fleet Maintenance Report',     description: 'Vehicle status, maintenance costs, replacement schedule',   category: 'Support',     frequency: 'Monthly',    icon: Activity,      scheduled: true,  views: 145, downloads: 34,  lastGenerated: 'May 15, 2026', pages: 7  },
    { id: 8,  name: 'Training Completion Report',   description: 'Officer training hours and certification tracking',         category: 'Training',    frequency: 'Monthly',    icon: FileText,      scheduled: true,  views: 267, downloads: 78,  lastGenerated: 'May 20, 2026', pages: 9  },
    { id: 9,  name: 'Overtime Analysis Report',     description: 'Detailed OT tracking and cost analysis by division',       category: 'Finance',     frequency: 'Bi-Weekly',  icon: Clock,         scheduled: true,  views: 198, downloads: 56,  lastGenerated: 'May 24, 2026', pages: 6  },
    { id: 10, name: 'Detention Facility Report',    description: 'Inmate population, incidents, and facility operations',    category: 'Operations',  frequency: 'Weekly',     icon: Building2,     scheduled: true,  views: 187, downloads: 42,  lastGenerated: 'May 27, 2026', pages: 10 },
  ];

  const CATEGORY_STYLE = {
    Executive:  { badge: 'violet', iconBg: 'bg-violet-500/10',  iconColor: 'text-violet-500 dark:text-violet-400'  },
    Operations: { badge: 'blue',   iconBg: 'bg-blue-500/10',    iconColor: 'text-blue-500 dark:text-blue-400'      },
    HR:         { badge: 'green',  iconBg: 'bg-emerald-500/10', iconColor: 'text-emerald-600 dark:text-emerald-400'},
    Finance:    { badge: 'amber',  iconBg: 'bg-amber-500/10',   iconColor: 'text-amber-600 dark:text-amber-400'    },
    Training:   { badge: 'green',  iconBg: 'bg-emerald-500/10', iconColor: 'text-emerald-600 dark:text-emerald-400'},
    Support:    { badge: 'slate',  iconBg: 'bg-slate-500/10',   iconColor: 'text-slate-500 dark:text-slate-400'   },
    Community:  { badge: 'blue',   iconBg: 'bg-blue-500/10',    iconColor: 'text-blue-500 dark:text-blue-400'     },
  };

  const getChangeColor = (change) =>
    change > 0 ? 'text-emerald-600 dark:text-emerald-400' : change < 0 ? 'text-red-600 dark:text-red-400' : 'text-slate-500';

  const getChangeIcon = (change) =>
    change > 0 ? <ArrowUpRight className="w-4 h-4" /> : change < 0 ? <ArrowDownRight className="w-4 h-4" /> : null;

  const getUrgencyAccent = (u) =>
    u === 'Critical' ? 'border-l-red-500' : u === 'High' ? 'border-l-amber-500' : 'border-l-slate-400 dark:border-l-slate-600';

  const getUrgencyBadge = (u) =>
    u === 'Critical' ? BADGE('red') : u === 'High' ? BADGE('amber') : BADGE('slate');

  const getActionBtnClass = (u) => {
    if (u === 'Critical') return 'inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-[11px] font-bold uppercase tracking-wide transition-colors bg-red-600 border border-red-700 text-white hover:bg-red-700';
    if (u === 'High')     return 'inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-[11px] font-bold uppercase tracking-wide transition-colors bg-amber-500 border border-amber-600 text-white hover:bg-amber-600';
    return 'inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-[11px] font-bold uppercase tracking-wide transition-colors bg-slate-700 border border-slate-800 text-white hover:bg-slate-800 dark:bg-slate-600 dark:border-slate-700 dark:hover:bg-slate-700';
  };

  const getComplianceBar = (s) =>
    s === 'Compliant' ? 'bg-emerald-500' : s === 'At Risk' ? 'bg-red-500' : 'bg-amber-500';

  const getCompliancePctColor = (s) =>
    s === 'Compliant' ? 'text-emerald-600 dark:text-emerald-400' : s === 'At Risk' ? 'text-red-600 dark:text-red-400' : 'text-amber-700 dark:text-amber-400';

  const getComplianceBadge = (s) =>
    s === 'Compliant' ? BADGE('green') : s === 'At Risk' ? BADGE('red') : BADGE('amber');

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => setToast(null), 3500);
  };

  const handleReportAction = (action) => {
    setActionedIds(prev => new Set([...prev, action.id]));
    showToast(`${action.actionLabel} recorded — ${action.decision.slice(0, 55)}…`, 'success');
  };

  const filteredReports = filterCategory === 'all'
    ? availableReports
    : availableReports.filter(r => r.category === filterCategory);

  const pendingCount  = reportActions.filter(a => !actionedIds.has(a.id)).length;
  const criticalCount = reportActions.filter(a => a.urgency === 'Critical' && !actionedIds.has(a.id)).length;
  const maxCalls      = Math.max(...monthlyTrends.map(m => m.calls));

  return (
    <DashboardLayout>
      <div className="p-5 lg:p-8 space-y-6 bg-slate-100 dark:bg-transparent min-h-full">

        {/* ── Page Header ─────────────────────────── */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-1">Performance &amp; Compliance</h2>
            <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
              <span>FY 2025–26</span>
              <span>·</span>
              <span>Jan 1 – May 28, 2026</span>
              {pendingCount > 0 && (
                <>
                  <span>·</span>
                  <span className="text-amber-700 dark:text-amber-400 font-semibold">{pendingCount} decisions pending</span>
                </>
              )}
              <span>·</span>
              <span className="text-red-700 dark:text-red-400 font-semibold">1 compliance deadline in 48 hrs</span>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-3 py-2 bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/30 rounded-lg text-slate-700 dark:text-slate-300 text-sm focus:outline-none focus:border-amber-500/50"
            >
              <option value="ytd">Year to Date</option>
              <option value="last30">Last 30 Days</option>
              <option value="last90">Last 90 Days</option>
              <option value="thisMonth">This Month</option>
              <option value="lastMonth">Last Month</option>
              <option value="q4">This Quarter</option>
              <option value="lastQuarter">Last Quarter</option>
              <option value="fy2024">Fiscal Year 2024</option>
              <option value="fy2023">Fiscal Year 2023</option>
              <option value="custom">Custom Date Range...</option>
            </select>
            <button onClick={() => setComparisonModal(true)} className={secondaryBtn}><BarChart3 className="w-4 h-4" /> Compare</button>
            <button onClick={() => setCustomReportModal(true)} className={secondaryBtn}><Plus className="w-4 h-4" /> Custom</button>
            <button onClick={() => setExportModal(true)} className={secondaryBtn}><FileSpreadsheet className="w-4 h-4" /> Excel</button>
            <button onClick={() => setScheduleModal(true)} className={secondaryBtn}><CalendarClock className="w-4 h-4" /> Schedule</button>
            <button className={secondaryBtn}><Printer className="w-4 h-4" /> Print</button>
          </div>
        </div>

        {/* ── Command Decisions Required ───────────── */}
        <div className={CARD}>
          <div className={CARD_HEADER}>
            <div className="flex items-center gap-3">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              <span className="text-[11px] font-bold text-slate-700 dark:text-slate-200 uppercase tracking-widest">Command Decisions Required</span>
            </div>
            <div className="flex items-center gap-2">
              {criticalCount > 0 && <span className={BADGE('red')}>{criticalCount} Critical</span>}
              <span className="text-[11px] text-slate-500 dark:text-slate-400">{pendingCount} pending</span>
            </div>
          </div>
          <div className="divide-y divide-slate-100 dark:divide-slate-800/50">
            {reportActions.map((action) => {
              const isActioned = actionedIds.has(action.id);
              return (
                <div
                  key={action.id}
                  className={`flex items-center gap-4 px-5 py-3 border-l-[3px] transition-colors ${getUrgencyAccent(action.urgency)} ${
                    isActioned
                      ? 'bg-emerald-50/30 dark:bg-emerald-500/5 opacity-60'
                      : 'hover:bg-slate-50 dark:hover:bg-slate-900/20'
                  }`}
                >
                  {/* Status column */}
                  <div className="flex flex-col items-start gap-1 flex-shrink-0 w-[90px]">
                    {isActioned ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-[10px] font-bold">
                        <CheckCircle className="w-3 h-3" /> Done
                      </span>
                    ) : (
                      <>
                        <span className={getUrgencyBadge(action.urgency)}>{action.urgency}</span>
                        <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {action.countdown}
                        </span>
                      </>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <p className={`text-[13px] font-semibold leading-snug ${isActioned ? 'text-slate-400 dark:text-slate-500 line-through' : 'text-slate-800 dark:text-slate-100'}`}>
                      {action.decision}
                    </p>
                    {!isActioned && (
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-tight">
                        <span className="font-semibold text-slate-600 dark:text-slate-400">Risk: </span>{action.ifIgnored}
                      </p>
                    )}
                  </div>

                  {/* Buttons */}
                  {!isActioned && (
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button onClick={() => handleReportAction(action)} className={getActionBtnClass(action.urgency)}>
                        {action.actionLabel}
                      </button>
                      <button className={secondaryBtn}>Delegate</button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Compliance Status Overview ────────────── */}
        <div className={CARD}>
          <div className={CARD_HEADER}>
            <span className="text-[11px] font-bold text-slate-700 dark:text-slate-200 uppercase tracking-widest">Compliance Status Overview</span>
            <div className="flex items-center gap-3 text-[11px]">
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold">2 Compliant</span>
              <span className="text-red-600 dark:text-red-400 font-semibold">1 At Risk</span>
              <span className="text-amber-700 dark:text-amber-400 font-semibold">1 Action Needed</span>
            </div>
          </div>
          <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {complianceStatus.map((item) => (
              <div key={item.label} className="bg-slate-50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-700/30 rounded-xl p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">{item.label}</p>
                    <span className={getComplianceBadge(item.status)}>{item.status}</span>
                  </div>
                  <span className={`text-2xl font-bold leading-none ${getCompliancePctColor(item.status)}`}>{item.pct}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-700/50 rounded-full overflow-hidden mb-3">
                  <div className={`h-full rounded-full transition-all ${getComplianceBar(item.status)}`} style={{ width: `${item.pct}%` }} />
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 mb-3 leading-tight">{item.detail}</p>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-slate-400 dark:text-slate-500">Next review: {item.nextReview}</span>
                  <button onClick={() => navigate(item.route)} className="text-[11px] font-semibold text-amber-700 dark:text-amber-400 hover:underline">
                    Details →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Tabs ─────────────────────────────────── */}
        <div className="flex gap-1 border-b border-slate-200 dark:border-slate-700/30 overflow-x-auto">
          {[
            { id: 'overview',    label: 'Overview',       icon: Zap       },
            { id: 'operations',  label: 'Division Intel', icon: Activity  },
            { id: 'crime',       label: 'Crime Stats',    icon: Target    },
            { id: 'reports',     label: 'Reports Library',icon: BookOpen  },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-all relative whitespace-nowrap ${
                activeTab === tab.id
                  ? 'text-amber-700 dark:text-amber-400'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500" />
              )}
            </button>
          ))}
        </div>

        {/* ══════════════ OVERVIEW TAB ════════════════ */}
        {activeTab === 'overview' && (
          <div className="space-y-6">

            {/* Key Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

              {/* Calls for Service */}
              <div className={`${CARD} p-5`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 bg-blue-500/10 rounded-xl flex items-center justify-center">
                    <Phone className="w-4 h-4 text-blue-500 dark:text-blue-400" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wide text-blue-600 dark:text-blue-400">Calls for Service</span>
                </div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white mb-0.5">{keyMetrics.callsForService.total.toLocaleString()}</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-3">Year to Date</p>
                <div className="space-y-1.5 border-t border-slate-100 dark:border-slate-800/60 pt-3">
                  <div className="flex justify-between text-xs"><span className="text-slate-500 dark:text-slate-400">Trend vs 2025</span><span className={`font-bold flex items-center gap-1 ${getChangeColor(keyMetrics.callsForService.change)}`}>{getChangeIcon(keyMetrics.callsForService.change)}{Math.abs(keyMetrics.callsForService.change)}%</span></div>
                  <div className="flex justify-between text-xs"><span className="text-slate-500 dark:text-slate-400">Avg per day</span><span className="font-medium text-slate-700 dark:text-slate-300">6,936 calls</span></div>
                  <div className="flex justify-between text-xs"><span className="text-slate-500 dark:text-slate-400">Peak hours</span><span className="font-medium text-slate-700 dark:text-slate-300">1400–1800 hrs</span></div>
                </div>
              </div>

              {/* Avg Response Time */}
              <div className={`${CARD} p-5`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 bg-emerald-500/10 rounded-xl flex items-center justify-center">
                    <Clock className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wide text-emerald-600 dark:text-emerald-400">Avg Response Time</span>
                </div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white mb-0.5">{keyMetrics.responseTime.average} min</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-3">All priorities combined</p>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-slate-500 dark:text-slate-400">Target: {keyMetrics.responseTime.target} min</span>
                  <span className="font-bold text-amber-700 dark:text-amber-400">0.4 min above</span>
                </div>
                <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-700/50 rounded-full overflow-hidden mb-3">
                  <div className="h-full bg-emerald-500" style={{ width: '95%' }} />
                </div>
                <div className="space-y-1.5 border-t border-slate-100 dark:border-slate-800/60 pt-3">
                  <div className="flex justify-between text-xs"><span className="text-slate-500 dark:text-slate-400">P1 Emergency</span><span className="font-medium text-emerald-600 dark:text-emerald-400">3.2 min</span></div>
                  <div className="flex justify-between text-xs"><span className="text-slate-500 dark:text-slate-400">P2 Urgent</span><span className="font-medium text-emerald-600 dark:text-emerald-400">7.8 min</span></div>
                  <div className="flex justify-between text-xs"><span className="text-slate-500 dark:text-slate-400">P3 Routine</span><span className="font-medium text-emerald-600 dark:text-emerald-400">18.4 min</span></div>
                </div>
              </div>

              {/* Clearance Rate */}
              <div className={`${CARD} p-5`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 bg-purple-500/10 rounded-xl flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-purple-500 dark:text-purple-400" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wide text-purple-600 dark:text-purple-400">Clearance Rate</span>
                </div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white mb-0.5">{keyMetrics.crimeClearanceRate.rate}%</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-3">Cases closed vs total</p>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-slate-500 dark:text-slate-400">Target: {keyMetrics.crimeClearanceRate.target}%</span>
                  <span className="font-bold text-amber-700 dark:text-amber-400">1.5 pts below</span>
                </div>
                <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-700/50 rounded-full overflow-hidden mb-3">
                  <div className="h-full bg-purple-500" style={{ width: '97.9%' }} />
                </div>
                <div className="space-y-1.5 border-t border-slate-100 dark:border-slate-800/60 pt-3">
                  <div className="flex justify-between text-xs"><span className="text-slate-500 dark:text-slate-400">Violent crimes</span><span className="font-medium text-emerald-600 dark:text-emerald-400">82.1%</span></div>
                  <div className="flex justify-between text-xs"><span className="text-slate-500 dark:text-slate-400">Property crimes</span><span className="font-medium text-amber-700 dark:text-amber-400">56.8%</span></div>
                  <div className="flex justify-between text-xs"><span className="text-slate-500 dark:text-slate-400">YoY change</span><span className="font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1"><ArrowUpRight className="w-3 h-3" />+3.8 pts</span></div>
                </div>
              </div>

              {/* Arrests YTD */}
              <div className={`${CARD} p-5`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 bg-amber-500/10 rounded-xl flex items-center justify-center">
                    <ShieldCheck className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wide text-amber-700 dark:text-amber-400">Arrests (YTD)</span>
                </div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white mb-0.5">{keyMetrics.arrestsYTD.total.toLocaleString()}</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-3">Jan 1 – May 28, 2026</p>
                <div className="space-y-1.5 border-t border-slate-100 dark:border-slate-800/60 pt-3">
                  <div className="flex justify-between text-xs"><span className="text-slate-500 dark:text-slate-400">Trend vs 2025</span><span className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1"><ArrowDownRight className="w-3 h-3" />-2.1% (fewer crimes)</span></div>
                  <div className="flex justify-between text-xs"><span className="text-slate-500 dark:text-slate-400">Felony</span><span className="font-medium text-slate-700 dark:text-slate-300">3,487 (28%)</span></div>
                  <div className="flex justify-between text-xs"><span className="text-slate-500 dark:text-slate-400">Prosecution rate</span><span className="font-medium text-emerald-600 dark:text-emerald-400">87.4%</span></div>
                </div>
              </div>

              {/* Staffing Level */}
              <div className={`${CARD} p-5`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 bg-blue-500/10 rounded-xl flex items-center justify-center">
                    <Users className="w-4 h-4 text-blue-500 dark:text-blue-400" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wide text-blue-600 dark:text-blue-400">Staffing Level</span>
                </div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white mb-0.5">{keyMetrics.staffing.percentage}%</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-3">{keyMetrics.staffing.current} / {keyMetrics.staffing.authorized} positions</p>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-slate-500 dark:text-slate-400">Target: 95%</span>
                  <span className="font-bold text-amber-700 dark:text-amber-400">-5 positions</span>
                </div>
                <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-700/50 rounded-full overflow-hidden mb-3">
                  <div className="h-full bg-blue-500" style={{ width: `${keyMetrics.staffing.percentage}%` }} />
                </div>
                <div className="space-y-1.5 border-t border-slate-100 dark:border-slate-800/60 pt-3">
                  <div className="flex justify-between text-xs"><span className="text-slate-500 dark:text-slate-400">Vacancies</span><span className="font-medium text-amber-700 dark:text-amber-400">14 open positions</span></div>
                  <div className="flex justify-between text-xs"><span className="text-slate-500 dark:text-slate-400">Pipeline</span><span className="font-medium text-slate-700 dark:text-slate-300">12 candidates</span></div>
                  <div className="flex justify-between text-xs"><span className="text-slate-500 dark:text-slate-400">Vacancy OT cost</span><span className="font-medium text-red-600 dark:text-red-400">$588K/year</span></div>
                </div>
              </div>

              {/* Overtime Cost */}
              <div className={`${CARD} p-5`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 bg-emerald-500/10 rounded-xl flex items-center justify-center">
                    <DollarSign className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wide text-emerald-600 dark:text-emerald-400">Overtime Cost</span>
                </div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white mb-0.5">${(keyMetrics.overtime.cost / 1000000).toFixed(1)}M</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-3">{keyMetrics.overtime.hours.toLocaleString()} hours YTD</p>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-slate-500 dark:text-slate-400">Target: &lt;10% of budget</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">8.9%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-700/50 rounded-full overflow-hidden mb-3">
                  <div className="h-full bg-emerald-500" style={{ width: '89%' }} />
                </div>
                <div className="space-y-1.5 border-t border-slate-100 dark:border-slate-800/60 pt-3">
                  <div className="flex justify-between text-xs"><span className="text-slate-500 dark:text-slate-400">YoY change</span><span className="font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1"><ArrowDownRight className="w-3 h-3" />-8.5% ($110K saved)</span></div>
                  <div className="flex justify-between text-xs"><span className="text-slate-500 dark:text-slate-400">Shift coverage</span><span className="font-medium text-slate-700 dark:text-slate-300">54% of OT</span></div>
                  <div className="flex justify-between text-xs"><span className="text-slate-500 dark:text-slate-400">vs National avg</span><span className="font-medium text-emerald-600 dark:text-emerald-400">12–26% below</span></div>
                </div>
              </div>
            </div>

            {/* Monthly Trends */}
            <div className={CARD}>
              <div className={CARD_HEADER}>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-blue-500 dark:text-blue-400" />
                  <span className="text-[11px] font-bold text-slate-700 dark:text-slate-200 uppercase tracking-widest">Monthly Performance Trends</span>
                  <span className="text-[11px] text-slate-400 dark:text-slate-500">· Rolling 10 months</span>
                </div>
                <div className="flex items-center gap-3 text-[10px] text-slate-400 dark:text-slate-500">
                  <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-blue-400 inline-block" /> Call volume</span>
                  <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" /> Clearance %</span>
                </div>
              </div>

              {/* Intelligence callout */}
              <div className="mx-5 mt-4 mb-2 p-3 bg-amber-50 dark:bg-amber-500/5 border border-amber-200 dark:border-amber-500/20 rounded-lg flex items-start gap-2.5">
                <Zap className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                <p className="text-[11px] text-amber-800 dark:text-amber-300 leading-snug">
                  <span className="font-bold">SentryOps Intelligence:</span>{' '}
                  Clearance rate trending up +3.3 pts Jan–Oct. July peak (69.5%) coincides with tactical deployment surge. Q3 call volume +14% vs Q1 — FY27 summer staffing plan should account for this pattern.
                </p>
              </div>

              <div className="px-5 pb-4 space-y-0.5">
                {monthlyTrends.map((month, idx) => {
                  const isCurrent = idx === monthlyTrends.length - 1;
                  const callsPct  = Math.round((month.calls / maxCalls) * 100);
                  const clrTarget = 68;
                  return (
                    <div
                      key={idx}
                      className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-colors ${
                        isCurrent
                          ? 'bg-amber-50/60 dark:bg-amber-500/5 border border-amber-200/60 dark:border-amber-500/15'
                          : 'hover:bg-slate-50 dark:hover:bg-slate-900/20'
                      }`}
                    >
                      <div className="flex items-center gap-2 w-14 flex-shrink-0">
                        <span className="text-[12px] font-bold text-slate-700 dark:text-slate-300 w-7">{month.month}</span>
                        {isCurrent && <span className="text-[9px] font-bold text-amber-700 dark:text-amber-400 bg-amber-100 dark:bg-amber-500/20 px-1 py-0.5 rounded">NOW</span>}
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-1 bg-slate-200 dark:bg-slate-700/50 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-400 dark:bg-blue-500 rounded-full" style={{ width: `${callsPct}%` }} />
                          </div>
                          <span className="text-[10px] text-slate-500 dark:text-slate-400 w-24 text-right tabular-nums">{month.calls.toLocaleString()} calls</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-1 bg-slate-200 dark:bg-slate-700/50 rounded-full overflow-hidden">
                            <div className={`h-full rounded-full ${month.clearance >= clrTarget ? 'bg-emerald-500' : 'bg-amber-500'}`} style={{ width: `${month.clearance}%` }} />
                          </div>
                          <span className={`text-[10px] font-bold w-24 text-right tabular-nums ${month.clearance >= clrTarget ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-700 dark:text-amber-400'}`}>
                            {month.clearance}% clr
                          </span>
                        </div>
                      </div>
                      <span className="text-[10px] text-slate-400 dark:text-slate-500 flex-shrink-0 w-16 text-right tabular-nums">{month.arrests.toLocaleString()} arr</span>
                    </div>
                  );
                })}
              </div>

              <div className="border-t border-slate-100 dark:border-slate-800/60 px-5 py-4">
                <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-3">Seasonal Patterns</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { label: 'Summer Peak (Jun–Aug)', value: '14,782 calls/mo', sub: '+18% vs winter',    subColor: 'text-amber-700 dark:text-amber-400'  },
                    { label: 'Winter Low (Nov–Feb)',   value: '12,404 calls/mo', sub: 'Lowest volume',     subColor: 'text-emerald-600 dark:text-emerald-400' },
                    { label: 'YoY Total 2025',         value: '157,423 calls',  sub: '+5.0% vs 2024',     subColor: 'text-emerald-600 dark:text-emerald-400' },
                    { label: 'Best Clearance',         value: 'July — 69.5%',   sub: 'Peak performance',  subColor: 'text-emerald-600 dark:text-emerald-400' },
                  ].map((item, i) => (
                    <div key={i} className="bg-slate-50 dark:bg-slate-900/30 rounded-lg p-3">
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 mb-1.5 leading-tight">{item.label}</p>
                      <p className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-0.5">{item.value}</p>
                      <p className={`text-[10px] font-semibold ${item.subColor}`}>{item.sub}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ══════════════ DIVISION INTEL TAB ══════════ */}
        {activeTab === 'operations' && (
          <div className="space-y-4">
            {/* Intel header strip */}
            <div className="flex items-start gap-3 px-4 py-3 bg-slate-800 dark:bg-slate-900/60 border border-slate-700/40 rounded-xl">
              <Activity className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
              <p className="text-[12px] text-slate-300 leading-snug">
                <span className="font-bold text-amber-400">Division Intelligence:</span>{' '}
                Investigations leads in clearance efficiency (91%). Patrol facing resource pressure — 4.8 pts below clearance target. Support Services vacancy exposure requires Q1 hiring action.
              </p>
            </div>

            {divisionPerformance.map((division, idx) => (
              <div key={idx} className={CARD + ' overflow-hidden'}>
                {/* Division header */}
                <div className={CARD_HEADER}>
                  <div className="flex items-center gap-3">
                    <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${
                      division.healthColor === 'green' ? 'bg-emerald-500' :
                      division.healthColor === 'amber' ? 'bg-amber-500' : 'bg-red-500'
                    }`} />
                    <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100">{division.name}</h4>
                    <span className={
                      division.healthColor === 'green' ? BADGE('green') :
                      division.healthColor === 'amber' ? BADGE('amber') : BADGE('red')
                    }>{division.health}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    {/* Radial efficiency indicator */}
                    <div className="relative w-11 h-11 flex-shrink-0">
                      <svg viewBox="0 0 36 36" className="w-11 h-11 -rotate-90">
                        <circle cx="18" cy="18" r="14" fill="none"
                          className="stroke-slate-200 dark:stroke-slate-700/50" strokeWidth="3" />
                        <circle cx="18" cy="18" r="14" fill="none"
                          className={division.efficiency >= 90 ? 'stroke-emerald-500' : division.efficiency >= 85 ? 'stroke-amber-500' : 'stroke-red-500'}
                          strokeWidth="3"
                          strokeDasharray={`${(division.efficiency / 100) * 87.96} 87.96`}
                          strokeLinecap="round" />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className={`text-[10px] font-bold ${
                          division.efficiency >= 90 ? 'text-emerald-600 dark:text-emerald-400' :
                          division.efficiency >= 85 ? 'text-amber-700 dark:text-amber-400' : 'text-red-600 dark:text-red-400'
                        }`}>{division.efficiency}%</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[9px] text-slate-500 dark:text-slate-400 uppercase tracking-wider">Efficiency</p>
                      <p className={`text-sm font-bold ${
                        division.efficiency >= 90 ? 'text-emerald-600 dark:text-emerald-400' :
                        division.efficiency >= 85 ? 'text-amber-700 dark:text-amber-400' : 'text-red-600 dark:text-red-400'
                      }`}>{division.efficiency >= 90 ? 'Top Tier' : division.efficiency >= 85 ? 'On Target' : 'Below Target'}</p>
                    </div>
                  </div>
                </div>

                {/* Stats + Intelligence */}
                <div className="px-5 pt-4 pb-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    {division.calls > 0 && (
                      <div>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">Calls Handled</p>
                        <p className="text-xl font-bold text-slate-800 dark:text-slate-100">{division.calls.toLocaleString()}</p>
                      </div>
                    )}
                    {division.responseTime > 0 && (
                      <div>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">Resp. Time</p>
                        <p className="text-xl font-bold text-slate-800 dark:text-slate-100">{division.responseTime}<span className="text-xs font-normal text-slate-500 ml-1">min</span></p>
                      </div>
                    )}
                    {division.clearanceRate > 0 && (
                      <div>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">Clearance</p>
                        <p className={`text-xl font-bold ${division.clearanceRate >= 70 ? 'text-emerald-600 dark:text-emerald-400' : division.clearanceRate >= 50 ? 'text-amber-700 dark:text-amber-400' : 'text-red-600 dark:text-red-400'}`}>{division.clearanceRate}%</p>
                      </div>
                    )}
                    <div>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">Staffing</p>
                      <p className={`text-xl font-bold ${division.staffing >= 95 ? 'text-emerald-600 dark:text-emerald-400' : division.staffing >= 90 ? 'text-amber-700 dark:text-amber-400' : 'text-red-600 dark:text-red-400'}`}>{division.staffing}%</p>
                    </div>
                    {division.inmates !== undefined && (
                      <>
                        <div>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">Inmate Pop.</p>
                          <p className="text-xl font-bold text-slate-800 dark:text-slate-100">{division.inmates}</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">Occupancy</p>
                          <p className="text-xl font-bold text-emerald-600 dark:text-emerald-400">{Math.round((division.inmates / division.capacity) * 100)}%<span className="text-xs font-normal text-slate-500 ml-1">/ {division.capacity}</span></p>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Strength / Watch callouts */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 border-t border-slate-100 dark:border-slate-800/60 pt-3">
                    <div className="flex items-start gap-2 bg-emerald-50 dark:bg-emerald-500/5 border border-emerald-100 dark:border-emerald-500/15 rounded-lg px-3 py-2.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
                      <p className="text-[11px] text-slate-700 dark:text-slate-300 leading-snug">
                        <span className="font-bold text-emerald-700 dark:text-emerald-400">Strength: </span>
                        {division.strength}
                      </p>
                    </div>
                    <div className="flex items-start gap-2 bg-amber-50 dark:bg-amber-500/5 border border-amber-100 dark:border-amber-500/15 rounded-lg px-3 py-2.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 flex-shrink-0" />
                      <p className="text-[11px] text-slate-700 dark:text-slate-300 leading-snug">
                        <span className="font-bold text-amber-700 dark:text-amber-400">Watch: </span>
                        {division.watch}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ══════════════ CRIME STATS TAB ══════════════ */}
        {activeTab === 'crime' && (
          <div className={CARD + ' overflow-hidden'}>
            <div className={CARD_HEADER}>
              <span className="text-[11px] font-bold text-slate-700 dark:text-slate-200 uppercase tracking-widest">Crime Category Analysis — YTD 2026</span>
              <span className={BADGE('slate')}>5 categories</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 dark:bg-slate-900/40 border-b border-slate-200 dark:border-slate-700/30">
                  <tr>
                    {['Category', 'Incidents', 'YoY Change', 'Arrests', 'Clearance Rate'].map(h => (
                      <th key={h} className="px-5 py-3 text-left text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {crimeStats.map((stat, idx) => (
                    <tr key={idx} className="border-b border-slate-100 dark:border-slate-800/30 hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-colors">
                      <td className="px-5 py-3.5">
                        <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{stat.category}</p>
                      </td>
                      <td className="px-5 py-3.5">
                        <p className="text-sm font-medium text-slate-600 dark:text-slate-300 tabular-nums">{stat.incidents.toLocaleString()}</p>
                      </td>
                      <td className="px-5 py-3.5">
                        <div className={`flex items-center gap-1 ${getChangeColor(stat.change)}`}>
                          {getChangeIcon(stat.change)}
                          <span className="text-sm font-bold tabular-nums">{Math.abs(stat.change)}%</span>
                        </div>
                      </td>
                      <td className="px-5 py-3.5">
                        <p className="text-sm font-medium text-slate-600 dark:text-slate-300 tabular-nums">{stat.arrests.toLocaleString()}</p>
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <span className={`text-sm font-bold tabular-nums ${
                            stat.clearance >= 80 ? 'text-emerald-600 dark:text-emerald-400' :
                            stat.clearance >= 65 ? 'text-amber-700 dark:text-amber-400' : 'text-red-600 dark:text-red-400'
                          }`}>{stat.clearance}%</span>
                          <div className="flex-1 h-1.5 bg-slate-200 dark:bg-slate-700/50 rounded-full overflow-hidden max-w-[80px]">
                            <div className={`h-full ${
                              stat.clearance >= 80 ? 'bg-emerald-500' :
                              stat.clearance >= 65 ? 'bg-amber-500' : 'bg-red-500'
                            }`} style={{ width: `${stat.clearance}%` }} />
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ══════════════ REPORTS LIBRARY TAB ══════════ */}
        {activeTab === 'reports' && (
          <div className="space-y-4">
            {/* Search + filter */}
            <div className="flex items-center gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search reports by name or category..."
                  className="w-full pl-11 pr-4 py-2.5 bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/30 rounded-lg text-slate-700 dark:text-slate-300 placeholder-slate-400 text-sm focus:outline-none focus:border-amber-500/50"
                />
              </div>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-4 py-2.5 bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/30 rounded-lg text-slate-700 dark:text-slate-300 text-sm focus:outline-none focus:border-amber-500/50 cursor-pointer"
              >
                <option value="all">All Categories</option>
                <option value="Executive">Executive</option>
                <option value="Operations">Operations</option>
                <option value="HR">HR</option>
                <option value="Finance">Finance</option>
                <option value="Training">Training</option>
                <option value="Support">Support</option>
                <option value="Community">Community</option>
              </select>
            </div>

            {/* Report cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredReports.map(report => {
                const Icon = report.icon;
                const cat  = CATEGORY_STYLE[report.category] || CATEGORY_STYLE['Operations'];
                return (
                  <div key={report.id} className={`${CARD} p-5 hover:border-slate-400 dark:hover:border-slate-600/50 transition-all group`}>
                    <div className="flex items-start gap-4">
                      <div className={`w-10 h-10 ${cat.iconBg} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:opacity-80 transition-opacity`}>
                        <Icon className={`w-5 h-5 ${cat.iconColor}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        {/* Title row */}
                        <div className="flex items-start justify-between gap-2 mb-1.5">
                          <h4 className="text-[13px] font-bold text-slate-800 dark:text-slate-100 leading-tight">{report.name}</h4>
                          <div className="flex items-center gap-1.5 flex-shrink-0">
                            <span className={BADGE(cat.badge)}>{report.category}</span>
                            {report.scheduled && <span className={BADGE('green')}>Auto</span>}
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-3 leading-snug">{report.description}</p>

                        {/* Metadata row */}
                        <div className="flex items-center gap-4 text-[10px] text-slate-400 dark:text-slate-500 mb-3">
                          <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{report.frequency}</span>
                          <span className="flex items-center gap-1"><FileText className="w-3 h-3" />{report.pages}p</span>
                          <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{report.views}</span>
                          <span className="flex items-center gap-1"><Download className="w-3 h-3" />{report.downloads}</span>
                        </div>

                        {/* Footer row */}
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[10px] text-slate-400 dark:text-slate-500 flex-shrink-0">
                            Generated {report.lastGenerated}
                          </span>
                          <div className="flex items-center gap-2 flex-wrap justify-end">
                            <button onClick={() => setReportDetailModal(report)} className={primaryBtn}>
                              <Eye className="w-3 h-3" /> View
                            </button>
                            <button className={secondaryBtn}><Download className="w-3 h-3" /> Export</button>
                            <button className={secondaryBtn}><RefreshCw className="w-3 h-3" /> Run</button>
                            {!report.scheduled && (
                              <button onClick={() => setScheduleModal(report)} className={secondaryBtn}>
                                <PlayCircle className="w-3 h-3" /> Schedule
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>

      {/* Toast notification */}
      {toast && (
        <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg border text-sm font-medium ${
          toast.type === 'success'
            ? 'bg-emerald-50 dark:bg-emerald-900/30 border-emerald-200 dark:border-emerald-500/30 text-emerald-800 dark:text-emerald-300'
            : 'bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-500/30 text-red-800 dark:text-red-300'
        }`}>
          <CheckCircle className="w-4 h-4 flex-shrink-0" />
          {toast.message}
          <button onClick={() => setToast(null)} className="ml-1 opacity-60 hover:opacity-100">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </DashboardLayout>
  );
}

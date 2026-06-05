import React, { useState, useRef } from 'react';
import {
  Users, FileText, TrendingUp, Search, DollarSign, CheckCircle, Shield,
  Download, Calendar, BarChart3, Activity, Clock, ArrowUpRight, ArrowDownRight,
  Eye, RefreshCw, FileSpreadsheet, Building2, Target, Plus, BookOpen,
  PlayCircle, Printer, ShieldCheck, Phone, CalendarClock, Zap, X, AlertCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';

export default function ReportsAnalytics() {
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
      ifIgnored: 'ACA accreditation review blocked — inspection readiness drops below 94% and finding risk increases.',
      countdown: '48 hrs',
      actionLabel: 'Sign & Submit',
    },
    {
      id: 'ra-2',
      urgency: 'Critical',
      decision: 'Approve Q4 Overtime Variance Report — Patrol Division 19% over allocation.',
      ifIgnored: 'Finance cannot finalize Q4 budget close — year-end reporting stalls.',
      countdown: '3 days',
      actionLabel: 'Approve',
    },
    {
      id: 'ra-3',
      urgency: 'High',
      decision: 'Review and certify Annual POST Compliance Report for 8 deputies with expiring credentials.',
      ifIgnored: '8 deputies lose enforcement authority Jan 31 — patrol staffing drops below minimum.',
      countdown: '7 days',
      actionLabel: 'Review',
    },
    {
      id: 'ra-4',
      urgency: 'Normal',
      decision: 'Schedule Q1 2026 Executive Performance Review Briefing with division commanders.',
      ifIgnored: 'Q1 KPI review delayed — performance corrective actions pushed to Q2.',
      countdown: '14 days',
      actionLabel: 'Schedule',
    },
  ];

  const complianceStatus = [
    { label: 'CJIS Security', status: 'Compliant', pct: 100, detail: 'v5.9 — All 164 staff certified', route: '/command/risk' },
    { label: 'ACA Detention', status: 'At Risk', pct: 62, detail: '2 open findings — HVAC deadline in 48 hrs', route: '/command/risk' },
    { label: 'PREA Standards', status: 'Compliant', pct: 100, detail: 'Zero incidents YTD · 100% trained', route: '/command/risk' },
    { label: 'GA POST Certs', status: 'Action Needed', pct: 45, detail: '8 deputies expiring within 30 days', route: '/hr/training' },
  ];

  const keyMetrics = {
    callsForService: { total: 145678, change: 5.2 },
    responseTime: { average: 8.4, target: 8.0 },
    crimeClearanceRate: { rate: 68.5, target: 70.0 },
    arrestsYTD: { total: 12456, change: -2.1 },
    staffing: { current: 164, authorized: 178, percentage: 92.1 },
    overtime: { hours: 18943, cost: 1247850, change: -8.5 },
  };

  const divisionPerformance = [
    {
      name: 'Patrol Division', calls: 89234, responseTime: 7.8, clearanceRate: 45.2, staffing: 92, efficiency: 88,
      insight: 'Response time 0.2 min above target — 4 vacancies contributing to shift coverage pressure',
    },
    {
      name: 'Investigations', calls: 5643, responseTime: 24.5, clearanceRate: 82.3, staffing: 95, efficiency: 91,
      insight: 'Clearance rate leads all divisions — felony case velocity at 12-month high',
    },
    {
      name: 'Detention', calls: 0, responseTime: 0, clearanceRate: 0, staffing: 94, efficiency: 87, inmates: 842, capacity: 920,
      insight: 'Operating at 91.5% capacity — intake rate stable, within operational threshold',
    },
    {
      name: 'Support Services', calls: 12456, responseTime: 15.2, clearanceRate: 68.9, staffing: 89, efficiency: 85,
      insight: '5 open positions impacting efficiency — 4 candidates active in hiring pipeline',
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
    { category: 'Property Crime', incidents: 4523, change: -5.8, arrests: 3102, clearance: 68.6 },
    { category: 'Violent Crime', incidents: 892, change: 2.3, arrests: 745, clearance: 83.5 },
    { category: 'Drug Offenses', incidents: 1876, change: -12.4, arrests: 1654, clearance: 88.2 },
    { category: 'Traffic Violations', incidents: 8934, change: 3.2, arrests: 7823, clearance: 87.6 },
    { category: 'Public Order', incidents: 2134, change: -1.5, arrests: 1678, clearance: 78.6 },
  ];

  const availableReports = [
    { id: 1, name: 'Executive Monthly Summary', description: 'Comprehensive monthly overview for command staff', category: 'Executive', frequency: 'Monthly', icon: FileText, scheduled: true, views: 342, downloads: 89 },
    { id: 2, name: 'Crime Statistics Report', description: 'Detailed crime trends and clearance rates', category: 'Operations', frequency: 'Weekly', icon: BarChart3, scheduled: true, views: 156, downloads: 45 },
    { id: 3, name: 'Personnel Compliance Report', description: 'Certifications, training, and compliance status', category: 'HR', frequency: 'Weekly', icon: Users, scheduled: true, views: 234, downloads: 67 },
    { id: 4, name: 'Budget Variance Analysis', description: 'YTD spending vs budget by division', category: 'Finance', frequency: 'Monthly', icon: DollarSign, scheduled: true, views: 423, downloads: 124 },
    { id: 5, name: 'Use of Force Analysis', description: 'Incidents, trends, and policy compliance', category: 'Operations', frequency: 'Quarterly', icon: Shield, scheduled: true, views: 178, downloads: 52 },
    { id: 6, name: 'Community Engagement Metrics', description: 'Public interactions and satisfaction surveys', category: 'Community', frequency: 'Monthly', icon: Users, scheduled: false, views: 89, downloads: 23 },
    { id: 7, name: 'Fleet Maintenance Report', description: 'Vehicle status, maintenance costs, replacement needs', category: 'Support', frequency: 'Monthly', icon: Activity, scheduled: true, views: 145, downloads: 34 },
    { id: 8, name: 'Training Completion Report', description: 'Officer training hours and certification status', category: 'Training', frequency: 'Monthly', icon: FileText, scheduled: true, views: 267, downloads: 78 },
    { id: 9, name: 'Overtime Analysis Report', description: 'Detailed overtime tracking and cost analysis by division', category: 'Finance', frequency: 'Bi-Weekly', icon: Clock, scheduled: true, views: 198, downloads: 56 },
    { id: 10, name: 'Detention Facility Report', description: 'Inmate population, incidents, and facility operations', category: 'Operations', frequency: 'Weekly', icon: Building2, scheduled: true, views: 187, downloads: 42 },
  ];

  const maxCalls = Math.max(...monthlyTrends.map(m => m.calls));

  // ── Helpers ──────────────────────────────────────────────────

  const getChangeColor = (change) => {
    if (change > 0) return 'text-emerald-600 dark:text-emerald-400';
    if (change < 0) return 'text-red-600 dark:text-red-400';
    return 'text-slate-500';
  };

  const getChangeIcon = (change) => {
    if (change > 0) return <ArrowUpRight className="w-4 h-4" />;
    if (change < 0) return <ArrowDownRight className="w-4 h-4" />;
    return null;
  };

  const getUrgencyAccent = (u) => {
    if (u === 'Critical') return 'border-l-red-500';
    if (u === 'High') return 'border-l-amber-500';
    return 'border-l-blue-500';
  };

  const getUrgencyBadge = (u) => {
    if (u === 'Critical') return 'bg-red-100 border-red-200 text-red-700 dark:bg-red-500/10 dark:border-red-500/20 dark:text-red-400';
    if (u === 'High') return 'bg-amber-100 border-amber-200 text-amber-700 dark:bg-amber-500/10 dark:border-amber-500/20 dark:text-amber-400';
    return 'bg-blue-100 border-blue-200 text-blue-700 dark:bg-blue-500/10 dark:border-blue-500/20 dark:text-blue-400';
  };

  const getActionBtnClass = (u) => {
    if (u === 'Critical') return 'bg-red-600 border-red-700 text-white hover:bg-red-700';
    if (u === 'High') return 'bg-amber-600 border-amber-700 text-white hover:bg-amber-700';
    return 'bg-blue-600 border-blue-700 text-white hover:bg-blue-700';
  };

  const getComplianceBadge = (s) => {
    if (s === 'Compliant') return 'bg-emerald-100 border-emerald-200 text-emerald-700 dark:bg-emerald-500/10 dark:border-emerald-500/20 dark:text-emerald-400';
    if (s === 'At Risk') return 'bg-red-100 border-red-200 text-red-700 dark:bg-red-500/10 dark:border-red-500/20 dark:text-red-400';
    return 'bg-amber-100 border-amber-200 text-amber-700 dark:bg-amber-500/10 dark:border-amber-500/20 dark:text-amber-400';
  };

  const getComplianceBar = (s) => {
    if (s === 'Compliant') return 'bg-emerald-500';
    if (s === 'At Risk') return 'bg-red-500';
    return 'bg-amber-500';
  };

  const getComplianceIcon = (s) => {
    if (s === 'Compliant') return <CheckCircle className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400 flex-shrink-0" />;
    if (s === 'At Risk') return <AlertCircle className="w-3.5 h-3.5 text-red-500 dark:text-red-400 flex-shrink-0" />;
    return <AlertCircle className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400 flex-shrink-0" />;
  };

  const getDivisionHealthBadge = (e) => {
    if (e >= 90) return 'bg-emerald-100 border-emerald-200 text-emerald-700 dark:bg-emerald-500/10 dark:border-emerald-500/20 dark:text-emerald-400';
    if (e >= 87) return 'bg-blue-100 border-blue-200 text-blue-700 dark:bg-blue-500/10 dark:border-blue-500/20 dark:text-blue-400';
    if (e >= 85) return 'bg-amber-100 border-amber-200 text-amber-700 dark:bg-amber-500/10 dark:border-amber-500/20 dark:text-amber-400';
    return 'bg-red-100 border-red-200 text-red-700 dark:bg-red-500/10 dark:border-red-500/20 dark:text-red-400';
  };

  const getDivisionHealthDot = (e) => {
    if (e >= 90) return 'bg-emerald-500';
    if (e >= 87) return 'bg-blue-500';
    if (e >= 85) return 'bg-amber-500';
    return 'bg-red-500';
  };

  const getDivisionHealthBar = (e) => {
    if (e >= 90) return 'bg-emerald-500';
    if (e >= 87) return 'bg-blue-500';
    if (e >= 85) return 'bg-amber-500';
    return 'bg-red-500';
  };

  const getCategoryBadge = (cat) => {
    const map = {
      'Executive': 'bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-500/10 dark:text-purple-400 dark:border-purple-500/20',
      'Operations': 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20',
      'HR': 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20',
      'Finance': 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20',
      'Training': 'bg-sky-100 text-sky-700 border-sky-200 dark:bg-sky-500/10 dark:text-sky-400 dark:border-sky-500/20',
      'Support': 'bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-700/30 dark:text-slate-400 dark:border-slate-600/30',
      'Community': 'bg-teal-100 text-teal-700 border-teal-200 dark:bg-teal-500/10 dark:text-teal-400 dark:border-teal-500/20',
    };
    return map[cat] || 'bg-slate-100 text-slate-600 border-slate-200';
  };

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

  const pendingCount = reportActions.filter(a => !actionedIds.has(a.id)).length;
  const criticalCount = reportActions.filter(a => a.urgency === 'Critical').length;

  return (
    <DashboardLayout>
      <div className="p-5 lg:p-8 space-y-6 bg-slate-100 dark:bg-transparent min-h-full">

        {/* ── Page Header ─────────────────────────────────────── */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-1">Performance &amp; Compliance</h2>
            <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
              <span>FY 2025–26</span>
              <span>·</span>
              <span>Jan 1 – May 28, 2026</span>
              <span>·</span>
              <span className="text-amber-700 dark:text-amber-400 font-semibold">{pendingCount} report decisions pending</span>
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
            <button onClick={() => setComparisonModal(true)} className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/30 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-all text-sm">
              <BarChart3 className="w-4 h-4" />
              Compare
            </button>
            <button onClick={() => setCustomReportModal(true)} className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/30 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-all text-sm">
              <Plus className="w-4 h-4" />
              Custom
            </button>
            <button onClick={() => setExportModal(true)} className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/30 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-all text-sm">
              <FileSpreadsheet className="w-4 h-4" />
              Excel
            </button>
            <button onClick={() => setScheduleModal(true)} className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/30 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-all text-sm">
              <CalendarClock className="w-4 h-4" />
              Schedule
            </button>
            <button className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/30 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-all text-sm">
              <Printer className="w-4 h-4" />
              Print
            </button>
          </div>
        </div>

        {/* ── Report Command Actions ───────────────────────────── */}
        <div className="bg-white dark:bg-slate-800/25 border border-slate-200 dark:border-slate-700/30 rounded-xl shadow-sm dark:shadow-none overflow-hidden">
          <div className="flex items-center justify-between gap-3 px-5 py-3 border-b border-slate-200 dark:border-slate-700/30">
            <div className="flex items-center gap-3">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-widest">
                Report Command Actions — Immediate Decisions Required
              </span>
            </div>
            <span className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-700/30 border border-slate-200 dark:border-slate-600/30 text-[11px] font-bold text-slate-800 dark:text-slate-200">
              {criticalCount} Critical
            </span>
          </div>
          <div className="p-4 space-y-2">
            {reportActions.map((action) => {
              const isActioned = actionedIds.has(action.id);
              return (
                <div
                  key={action.id}
                  className={`rounded-lg border border-l-[3px] ${getUrgencyAccent(action.urgency)} transition-all ${
                    isActioned
                      ? 'bg-emerald-50/40 dark:bg-emerald-500/5 border-slate-200 dark:border-slate-700/20 opacity-60'
                      : 'bg-slate-50 dark:bg-slate-900/30 border-slate-200 dark:border-slate-700/30'
                  }`}
                >
                  {isActioned ? (
                    <div className="flex items-center gap-3 px-3 py-2.5">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded border bg-emerald-100 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-[10px] font-bold uppercase tracking-wide flex-shrink-0">
                        <CheckCircle className="w-3 h-3" /> Actioned
                      </span>
                      <p className="text-[12px] text-slate-400 dark:text-slate-500 line-through truncate">{action.decision}</p>
                    </div>
                  ) : (
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 px-3 py-3">
                      {/* Status column */}
                      <div className="flex sm:flex-col gap-1.5 items-center sm:items-start sm:w-[88px] flex-shrink-0">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded border text-[10px] font-bold uppercase tracking-wide ${getUrgencyBadge(action.urgency)}`}>
                          {action.urgency}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-700/40 text-slate-700 dark:text-slate-200 text-[10px] font-semibold tracking-wide whitespace-nowrap">
                          {action.countdown}
                        </span>
                      </div>
                      {/* Text column */}
                      <div className="flex-1 min-w-0">
                        <p className="text-[13px] font-bold text-slate-900 dark:text-slate-100 leading-5 mb-0.5">{action.decision}</p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-4">
                          <span className="font-semibold text-slate-600 dark:text-slate-300">If ignored: </span>{action.ifIgnored}
                        </p>
                      </div>
                      {/* Action column */}
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <button
                          onClick={() => handleReportAction(action)}
                          className={`px-3 py-1.5 rounded border text-[11px] font-bold uppercase tracking-wide transition-colors whitespace-nowrap ${getActionBtnClass(action.urgency)}`}
                        >
                          {action.actionLabel}
                        </button>
                        <button className="px-3 py-1.5 rounded border border-slate-300 dark:border-slate-600/50 bg-white dark:bg-slate-800/40 text-slate-600 dark:text-slate-400 text-[11px] font-semibold uppercase tracking-wide hover:bg-slate-50 dark:hover:bg-slate-700/40 transition-colors whitespace-nowrap">
                          Delegate
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Compliance Status Overview ───────────────────────── */}
        <div className="bg-white dark:bg-slate-800/25 border border-slate-200 dark:border-slate-700/30 rounded-xl shadow-sm dark:shadow-none overflow-hidden">
          <div className="px-5 py-3 border-b border-slate-200 dark:border-slate-700/30 bg-slate-50/80 dark:bg-slate-900/20">
            <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-widest">Compliance Status Overview</span>
          </div>
          <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {complianceStatus.map((item) => (
              <div key={item.label} className="bg-slate-50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-700/30 rounded-lg p-4">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="text-[13px] font-bold text-slate-800 dark:text-slate-100 leading-tight">{item.label}</span>
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded border text-[10px] font-bold uppercase tracking-wide flex-shrink-0 ${getComplianceBadge(item.status)}`}>
                    {getComplianceIcon(item.status)}
                    {item.status}
                  </span>
                </div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{item.pct}%</p>
                <div className="mb-3">
                  <div className="w-full h-2 bg-slate-200 dark:bg-slate-700/50 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full transition-all ${getComplianceBar(item.status)}`} style={{ width: `${item.pct}%` }} />
                  </div>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-2 leading-4">{item.detail}</p>
                <button
                  onClick={() => navigate(item.route)}
                  className="text-[11px] font-semibold text-amber-700 dark:text-amber-400 hover:underline"
                >
                  View Details →
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* ── Tabs ─────────────────────────────────────────────── */}
        <div className="flex gap-2 border-b border-slate-200 dark:border-slate-700/30 overflow-x-auto">
          {[
            { id: 'overview', label: 'Overview', icon: Zap },
            { id: 'operations', label: 'Operations', icon: Activity },
            { id: 'crime', label: 'Crime Stats', icon: Target },
            { id: 'reports', label: 'Reports Library', icon: BookOpen },
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
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500"></div>
              )}
            </button>
          ))}
        </div>

        {/* ── OVERVIEW TAB ─────────────────────────────────────── */}
        {activeTab === 'overview' && (
          <div className="space-y-6">

            {/* KPI Metrics */}
            <div className="bg-white dark:bg-slate-800/25 border border-slate-200 dark:border-slate-700/30 rounded-xl shadow-sm dark:shadow-none overflow-hidden">
              <div className="px-5 py-3 border-b border-slate-200 dark:border-slate-700/30 bg-slate-50/80 dark:bg-slate-900/20">
                <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-widest">Key Performance Indicators — YTD 2025–26</span>
              </div>
              <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

                {/* Calls for Service */}
                <div className="bg-slate-50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-700/30 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-9 h-9 bg-blue-500/10 rounded-lg flex items-center justify-center">
                      <Phone className="w-4 h-4 text-blue-500 dark:text-blue-400" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wide text-blue-600 dark:text-blue-400">Calls for Service</span>
                  </div>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white mb-0.5">{keyMetrics.callsForService.total.toLocaleString()}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">Year to Date</p>
                  <div className="space-y-1.5 border-t border-slate-200 dark:border-slate-700/30 pt-3">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500 dark:text-slate-400">Trend vs 2025:</span>
                      <span className={`font-bold flex items-center gap-1 ${getChangeColor(keyMetrics.callsForService.change)}`}>
                        {getChangeIcon(keyMetrics.callsForService.change)}{Math.abs(keyMetrics.callsForService.change)}%
                      </span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500 dark:text-slate-400">Avg per day:</span>
                      <span className="font-medium text-slate-700 dark:text-slate-300">6,936 calls</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500 dark:text-slate-400">Peak hours:</span>
                      <span className="font-medium text-slate-700 dark:text-slate-300">1400–1800 hrs</span>
                    </div>
                  </div>
                </div>

                {/* Avg Response Time */}
                <div className="bg-slate-50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-700/30 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-9 h-9 bg-emerald-500/10 rounded-lg flex items-center justify-center">
                      <Clock className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wide text-emerald-600 dark:text-emerald-400">Avg Response Time</span>
                  </div>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white mb-0.5">{keyMetrics.responseTime.average} min</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">All priorities combined</p>
                  <div className="mb-3">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-500 dark:text-slate-400">Target: {keyMetrics.responseTime.target} min</span>
                      <span className="font-bold text-amber-700 dark:text-amber-400">0.4 min above</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-700/50 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500" style={{ width: '95%' }} />
                    </div>
                  </div>
                  <div className="space-y-1.5 border-t border-slate-200 dark:border-slate-700/30 pt-3">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500 dark:text-slate-400">P1 (Emergency):</span>
                      <span className="font-medium text-emerald-600 dark:text-emerald-400">3.2 min</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500 dark:text-slate-400">P2 (Urgent):</span>
                      <span className="font-medium text-emerald-600 dark:text-emerald-400">7.8 min</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500 dark:text-slate-400">P3 (Routine):</span>
                      <span className="font-medium text-emerald-600 dark:text-emerald-400">18.4 min</span>
                    </div>
                  </div>
                </div>

                {/* Clearance Rate */}
                <div className="bg-slate-50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-700/30 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-9 h-9 bg-purple-500/10 rounded-lg flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-purple-500 dark:text-purple-400" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wide text-purple-600 dark:text-purple-400">Clearance Rate</span>
                  </div>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white mb-0.5">{keyMetrics.crimeClearanceRate.rate}%</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">Cases closed vs total</p>
                  <div className="mb-3">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-500 dark:text-slate-400">Target: {keyMetrics.crimeClearanceRate.target}%</span>
                      <span className="font-bold text-amber-700 dark:text-amber-400">1.5 pts below</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-700/50 rounded-full overflow-hidden">
                      <div className="h-full bg-purple-500" style={{ width: '97.9%' }} />
                    </div>
                  </div>
                  <div className="space-y-1.5 border-t border-slate-200 dark:border-slate-700/30 pt-3">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500 dark:text-slate-400">Violent crimes:</span>
                      <span className="font-medium text-emerald-600 dark:text-emerald-400">82.1%</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500 dark:text-slate-400">Property crimes:</span>
                      <span className="font-medium text-amber-700 dark:text-amber-400">56.8%</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500 dark:text-slate-400">YoY change:</span>
                      <span className="font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                        <ArrowUpRight className="w-3 h-3" />+3.8 pts
                      </span>
                    </div>
                  </div>
                </div>

                {/* Arrests */}
                <div className="bg-slate-50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-700/30 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-9 h-9 bg-amber-500/10 rounded-lg flex items-center justify-center">
                      <ShieldCheck className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wide text-amber-700 dark:text-amber-400">Arrests (YTD)</span>
                  </div>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white mb-0.5">{keyMetrics.arrestsYTD.total.toLocaleString()}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">Jan 1 – May 28, 2026</p>
                  <div className="space-y-1.5 border-t border-slate-200 dark:border-slate-700/30 pt-3">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500 dark:text-slate-400">Trend vs 2025:</span>
                      <span className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                        <ArrowDownRight className="w-3 h-3" />-2.1% (fewer crimes)
                      </span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500 dark:text-slate-400">Felony:</span>
                      <span className="font-medium text-slate-700 dark:text-slate-300">3,487 (28%)</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500 dark:text-slate-400">Prosecution rate:</span>
                      <span className="font-medium text-emerald-600 dark:text-emerald-400">87.4%</span>
                    </div>
                  </div>
                </div>

                {/* Staffing Level */}
                <div className="bg-slate-50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-700/30 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-9 h-9 bg-blue-500/10 rounded-lg flex items-center justify-center">
                      <Users className="w-4 h-4 text-blue-500 dark:text-blue-400" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wide text-blue-600 dark:text-blue-400">Staffing Level</span>
                  </div>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white mb-0.5">{keyMetrics.staffing.percentage}%</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">{keyMetrics.staffing.current} / {keyMetrics.staffing.authorized} positions</p>
                  <div className="mb-3">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-500 dark:text-slate-400">Target: 95%</span>
                      <span className="font-bold text-amber-700 dark:text-amber-400">-5 positions</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-700/50 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500" style={{ width: `${keyMetrics.staffing.percentage}%` }} />
                    </div>
                  </div>
                  <div className="space-y-1.5 border-t border-slate-200 dark:border-slate-700/30 pt-3">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500 dark:text-slate-400">Vacancies:</span>
                      <span className="font-medium text-amber-700 dark:text-amber-400">14 open positions</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500 dark:text-slate-400">Pipeline:</span>
                      <span className="font-medium text-slate-700 dark:text-slate-300">12 candidates</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500 dark:text-slate-400">Vacancy OT cost:</span>
                      <span className="font-medium text-red-600 dark:text-red-400">$588K/year</span>
                    </div>
                  </div>
                </div>

                {/* Overtime Cost */}
                <div className="bg-slate-50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-700/30 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-9 h-9 bg-emerald-500/10 rounded-lg flex items-center justify-center">
                      <DollarSign className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wide text-emerald-600 dark:text-emerald-400">Overtime Cost</span>
                  </div>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white mb-0.5">${(keyMetrics.overtime.cost / 1000000).toFixed(1)}M</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">{keyMetrics.overtime.hours.toLocaleString()} hours YTD</p>
                  <div className="mb-3">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-500 dark:text-slate-400">Target: &lt;10% of budget</span>
                      <span className="font-bold text-emerald-600 dark:text-emerald-400">8.9%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-700/50 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500" style={{ width: '89%' }} />
                    </div>
                  </div>
                  <div className="space-y-1.5 border-t border-slate-200 dark:border-slate-700/30 pt-3">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500 dark:text-slate-400">YoY change:</span>
                      <span className="font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                        <ArrowDownRight className="w-3 h-3" />-8.5% ($110K saved)
                      </span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500 dark:text-slate-400">Shift coverage:</span>
                      <span className="font-medium text-slate-700 dark:text-slate-300">54% of OT</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500 dark:text-slate-400">vs National avg:</span>
                      <span className="font-medium text-emerald-600 dark:text-emerald-400">12–26% below</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Monthly Trends */}
            <div className="bg-white dark:bg-slate-800/25 border border-slate-200 dark:border-slate-700/30 rounded-xl shadow-sm dark:shadow-none overflow-hidden">
              <div className="px-5 py-3 border-b border-slate-200 dark:border-slate-700/30 bg-slate-50/80 dark:bg-slate-900/20 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-4 h-4 text-blue-500 dark:text-blue-400 flex-shrink-0" />
                  <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-widest">Operational Trend Metrics — Jan–Oct 2025</span>
                </div>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:block">Peak: July · 15,123 calls · 69.5% clearance</span>
              </div>
              <div className="p-4">
                <div className="space-y-1.5">
                  {monthlyTrends.map((month, idx) => {
                    const prev = idx > 0 ? monthlyTrends[idx - 1] : null;
                    const callsChange = prev ? ((month.calls - prev.calls) / prev.calls * 100).toFixed(1) : 0;
                    const barWidth = ((month.calls / maxCalls) * 100).toFixed(1);
                    return (
                      <div key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-900/30 rounded-lg px-2 py-2 -mx-2 transition-colors">
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2.5">
                            <span className="text-[13px] font-semibold text-slate-700 dark:text-slate-300 w-8">{month.month}</span>
                            {idx === monthlyTrends.length - 1 && (
                              <span className="text-[10px] px-1.5 py-0.5 bg-amber-500/20 text-amber-700 dark:text-amber-400 rounded font-semibold">Current</span>
                            )}
                          </div>
                          <div className="flex items-center gap-4 lg:gap-6 text-xs">
                            <div className="flex items-center gap-1.5">
                              <span className="text-slate-500 dark:text-slate-400 hidden sm:inline">Calls:</span>
                              <span className="font-bold text-slate-700 dark:text-slate-300">{month.calls.toLocaleString()}</span>
                              {prev && (
                                <span className={`font-medium hidden md:inline ${parseFloat(callsChange) >= 0 ? 'text-amber-700 dark:text-amber-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
                                  ({parseFloat(callsChange) >= 0 ? '+' : ''}{callsChange}%)
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-1.5">
                              <span className="text-slate-500 dark:text-slate-400 hidden sm:inline">Arrests:</span>
                              <span className="font-bold text-blue-500 dark:text-blue-400">{month.arrests.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <span className="text-slate-500 dark:text-slate-400 hidden sm:inline">Clear:</span>
                              <span className={`font-bold ${month.clearance >= 68 ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-700 dark:text-amber-400'}`}>{month.clearance}%</span>
                            </div>
                          </div>
                        </div>
                        <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-700/50 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-blue-500 to-blue-400 dark:from-blue-600 dark:to-blue-500 rounded-full"
                            style={{ width: `${barWidth}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700/30">
                  <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-3">Seasonal Patterns</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                    <div className="bg-slate-50 dark:bg-slate-900/30 rounded-lg p-3 border border-slate-200 dark:border-slate-700/30">
                      <p className="text-slate-500 dark:text-slate-400 mb-1">Summer Peak (Jun–Aug)</p>
                      <p className="font-bold text-slate-700 dark:text-slate-300">14,782 calls/mo</p>
                      <p className="text-amber-700 dark:text-amber-400">+18% vs winter</p>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-900/30 rounded-lg p-3 border border-slate-200 dark:border-slate-700/30">
                      <p className="text-slate-500 dark:text-slate-400 mb-1">Winter Low (Nov–Feb)</p>
                      <p className="font-bold text-slate-700 dark:text-slate-300">12,404 calls/mo</p>
                      <p className="text-emerald-600 dark:text-emerald-400">Lowest volume</p>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-900/30 rounded-lg p-3 border border-slate-200 dark:border-slate-700/30">
                      <p className="text-slate-500 dark:text-slate-400 mb-1">YoY Total 2025</p>
                      <p className="font-bold text-slate-700 dark:text-slate-300">157,423 calls</p>
                      <p className="text-emerald-600 dark:text-emerald-400">+5.0% vs 2024</p>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-900/30 rounded-lg p-3 border border-slate-200 dark:border-slate-700/30">
                      <p className="text-slate-500 dark:text-slate-400 mb-1">Best Clearance</p>
                      <p className="font-bold text-slate-700 dark:text-slate-300">July — 69.5%</p>
                      <p className="text-emerald-600 dark:text-emerald-400">Peak performance</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── OPERATIONS TAB ───────────────────────────────────── */}
        {activeTab === 'operations' && (
          <div className="space-y-4">
            <div className="bg-white dark:bg-slate-800/25 border border-slate-200 dark:border-slate-700/30 rounded-xl shadow-sm dark:shadow-none overflow-hidden">
              <div className="px-5 py-3 border-b border-slate-200 dark:border-slate-700/30 bg-slate-50/80 dark:bg-slate-900/20">
                <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-widest">Division Performance Intelligence</span>
              </div>
              <div className="p-4 space-y-3">
                {divisionPerformance.map((division, idx) => (
                  <div key={idx} className="bg-slate-50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-700/30 rounded-xl p-4">
                    {/* Division header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2.5">
                        <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${getDivisionHealthDot(division.efficiency)}`} />
                        <h4 className="text-[13px] font-bold text-slate-800 dark:text-slate-100">{division.name}</h4>
                      </div>
                      <span className={`px-2.5 py-1 rounded border text-[10px] font-bold uppercase tracking-wide ${getDivisionHealthBadge(division.efficiency)}`}>
                        {division.efficiency}% Efficiency
                      </span>
                    </div>

                    {/* Efficiency bar */}
                    <div className="mb-4">
                      <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-700/50 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${getDivisionHealthBar(division.efficiency)}`}
                          style={{ width: `${division.efficiency}%` }}
                        />
                      </div>
                    </div>

                    {/* Metrics grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      {division.calls > 0 && (
                        <div>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">Calls</p>
                          <p className="text-base font-bold text-slate-800 dark:text-slate-100">{division.calls.toLocaleString()}</p>
                        </div>
                      )}
                      {division.responseTime > 0 && (
                        <div>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">Response Time</p>
                          <p className="text-base font-bold text-slate-800 dark:text-slate-100">{division.responseTime} min</p>
                        </div>
                      )}
                      {division.clearanceRate > 0 && (
                        <div>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">Clearance Rate</p>
                          <p className="text-base font-bold text-slate-800 dark:text-slate-100">{division.clearanceRate}%</p>
                        </div>
                      )}
                      <div>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">Staffing</p>
                        <p className="text-base font-bold text-slate-800 dark:text-slate-100">{division.staffing}%</p>
                      </div>
                      {division.inmates && (
                        <>
                          <div>
                            <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">Inmates</p>
                            <p className="text-base font-bold text-slate-800 dark:text-slate-100">{division.inmates}</p>
                          </div>
                          <div>
                            <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">Capacity</p>
                            <p className="text-base font-bold text-slate-800 dark:text-slate-100">{division.capacity}</p>
                          </div>
                        </>
                      )}
                    </div>

                    {/* Insight line */}
                    <div className="flex items-start gap-2 pt-3 border-t border-slate-200 dark:border-slate-700/30">
                      <div className={`w-1.5 h-1.5 rounded-full mt-1 flex-shrink-0 ${getDivisionHealthDot(division.efficiency)}`} />
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-4">{division.insight}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── CRIME STATS TAB ──────────────────────────────────── */}
        {activeTab === 'crime' && (
          <div className="bg-white dark:bg-slate-800/25 border border-slate-200 dark:border-slate-700/30 rounded-xl shadow-sm dark:shadow-none overflow-hidden">
            <div className="px-5 py-3 border-b border-slate-200 dark:border-slate-700/30 bg-slate-50/80 dark:bg-slate-900/20">
              <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-widest">Crime Statistics — YTD 2025–26</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 dark:bg-slate-900/40 border-b border-slate-200 dark:border-slate-700/30">
                  <tr>
                    <th className="px-4 py-3 text-left text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Category</th>
                    <th className="px-4 py-3 text-left text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Incidents</th>
                    <th className="px-4 py-3 text-left text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">YoY Change</th>
                    <th className="px-4 py-3 text-left text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Arrests</th>
                    <th className="px-4 py-3 text-left text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Clearance Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {crimeStats.map((stat, idx) => (
                    <tr key={idx} className="border-b border-slate-100 dark:border-slate-800/30 hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-colors">
                      <td className="px-4 py-3.5">
                        <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{stat.category}</p>
                      </td>
                      <td className="px-4 py-3.5">
                        <p className="text-sm text-slate-600 dark:text-slate-300">{stat.incidents.toLocaleString()}</p>
                      </td>
                      <td className="px-4 py-3.5">
                        <div className={`flex items-center gap-1 ${getChangeColor(stat.change)}`}>
                          {getChangeIcon(stat.change)}
                          <span className="text-sm font-bold">{Math.abs(stat.change)}%</span>
                        </div>
                      </td>
                      <td className="px-4 py-3.5">
                        <p className="text-sm text-slate-600 dark:text-slate-300">{stat.arrests.toLocaleString()}</p>
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-3">
                          <span className={`text-sm font-bold ${
                            stat.clearance >= 80 ? 'text-emerald-600 dark:text-emerald-400' :
                            stat.clearance >= 65 ? 'text-amber-700 dark:text-amber-400' : 'text-red-600 dark:text-red-400'
                          }`}>{stat.clearance}%</span>
                          <div className="flex-1 h-1.5 bg-slate-200 dark:bg-slate-700/50 rounded-full overflow-hidden max-w-[100px]">
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

        {/* ── REPORTS LIBRARY TAB ──────────────────────────────── */}
        {activeTab === 'reports' && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search reports..."
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredReports.map(report => {
                const Icon = report.icon;
                return (
                  <div key={report.id} className="bg-white dark:bg-slate-800/25 border border-slate-200 dark:border-slate-700/30 rounded-xl p-4 hover:border-slate-300 dark:hover:border-slate-600/50 transition-all group">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800/60 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-blue-500/10 transition-colors">
                        <Icon className="w-5 h-5 text-slate-500 dark:text-slate-400 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors" />
                      </div>
                      <div className="flex-1 min-w-0">
                        {/* Title row */}
                        <div className="flex items-start gap-2 mb-1 flex-wrap">
                          <h4 className="text-[13px] font-bold text-slate-800 dark:text-slate-100 leading-tight">{report.name}</h4>
                          {report.scheduled && (
                            <span className="px-1.5 py-0.5 bg-emerald-100 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-[10px] font-bold rounded flex items-center gap-1 flex-shrink-0">
                              <Clock className="w-3 h-3" /> Auto
                            </span>
                          )}
                        </div>
                        {/* Description */}
                        <p className="text-xs text-slate-500 dark:text-slate-400 mb-2.5 leading-4">{report.description}</p>
                        {/* Meta row */}
                        <div className="flex items-center gap-2 flex-wrap mb-3">
                          <span className={`px-1.5 py-0.5 rounded border text-[10px] font-bold uppercase tracking-wide ${getCategoryBadge(report.category)}`}>
                            {report.category}
                          </span>
                          <span className="flex items-center gap-1 text-[11px] text-slate-400 dark:text-slate-500">
                            <Calendar className="w-3 h-3" />
                            {report.frequency}
                          </span>
                          <span className="flex items-center gap-1 text-[11px] text-slate-400 dark:text-slate-500">
                            <Eye className="w-3 h-3" />
                            {report.views}
                          </span>
                          <span className="flex items-center gap-1 text-[11px] text-slate-400 dark:text-slate-500">
                            <Download className="w-3 h-3" />
                            {report.downloads}
                          </span>
                        </div>
                        {/* Actions */}
                        <div className="flex items-center gap-2 flex-wrap">
                          <button
                            onClick={() => setReportDetailModal(report)}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-[11px] font-bold uppercase tracking-wide transition-all"
                          >
                            <Eye className="w-3 h-3" />
                            View
                          </button>
                          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-600/50 text-slate-600 dark:text-slate-400 rounded-lg text-[11px] font-semibold uppercase tracking-wide hover:bg-slate-50 dark:hover:bg-slate-700/40 transition-all">
                            <Download className="w-3 h-3" />
                            Download
                          </button>
                          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-600/50 text-slate-600 dark:text-slate-400 rounded-lg text-[11px] font-semibold uppercase tracking-wide hover:bg-slate-50 dark:hover:bg-slate-700/40 transition-all">
                            <RefreshCw className="w-3 h-3" />
                            Generate
                          </button>
                          {!report.scheduled && (
                            <button
                              onClick={() => setScheduleModal(report)}
                              className="flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-600/50 text-slate-600 dark:text-slate-400 rounded-lg text-[11px] font-semibold uppercase tracking-wide hover:bg-slate-50 dark:hover:bg-slate-700/40 transition-all"
                            >
                              <PlayCircle className="w-3 h-3" />
                              Schedule
                            </button>
                          )}
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

      {/* ── Toast ─────────────────────────────────────────────── */}
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

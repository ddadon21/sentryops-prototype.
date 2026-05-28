            {/* Page Header */}
            <div className="mb-6">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-1">Reports &amp; Compliance</h2>
              <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400 mb-3">
                <span>FY 2025–26</span>
                <span>·</span>
                <span>Jan 1 – May 28, 2026</span>
                <span>·</span>
                <span className="text-amber-700 dark:text-amber-400 font-semibold">2 critical reports pending command signature</span>
                <span>·</span>
                <span className="text-red-700 dark:text-red-400 font-semibold">1 compliance deadline in 48 hrs</span>
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
                <button
                  onClick={() => setComparisonModal(true)}
                  className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/30 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-all text-sm"
                >
                  <BarChart3 className="w-4 h-4" />
                  Compare
                </button>
                <button
                  onClick={() => setCustomReportModal(true)}
                  className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/30 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-all text-sm"
                >
                  <Plus className="w-4 h-4" />
                  Custom Report
                </button>
                <button
                  onClick={() => setExportModal(true)}
                  className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/30 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-all text-sm"
                >
                  <FileSpreadsheet className="w-4 h-4" />
                  Excel
                </button>
                <button
                  onClick={() => setScheduleModal(true)}
                  className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/30 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-all text-sm"
                >
                  <CalendarClock className="w-4 h-4" />
                  Schedule
                </button>
                <button
                  className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/30 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-all text-sm"
                >
                  <Printer className="w-4 h-4" />
                  Print
                </button>
              </div>
            </div>

            {/* Report Command Actions */}
            <div className="bg-white dark:bg-slate-800/25 border border-slate-200 dark:border-slate-700/30 rounded-xl shadow-sm dark:shadow-none overflow-hidden mb-6">
              <div className="flex items-center justify-between gap-3 px-5 py-3 border-b border-slate-200 dark:border-slate-700/30 bg-slate-50/80 dark:bg-slate-900/20">
                <div className="flex items-center gap-3">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                  </span>
                  <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-widest">
                    Report Command Actions — Immediate Decisions Required
                  </span>
                </div>
                <span className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/30 text-[11px] font-semibold text-slate-600 dark:text-slate-400">
                  {reportActions.filter(a => a.urgency === 'Critical').length} Critical Decisions
                </span>
              </div>
              <div className="p-4 space-y-3.5">
                {reportActions.map((action) => {
                  const isActioned = actionedIds.has(action.id);
                  const urgencyAccent = action.urgency === 'Critical'
                    ? 'border-red-400 dark:border-red-500 bg-red-50/60 dark:bg-red-900/10'
                    : action.urgency === 'High'
                    ? 'border-amber-400 dark:border-amber-500 bg-amber-50/60 dark:bg-amber-900/10'
                    : 'border-blue-300 dark:border-blue-600 bg-blue-50/40 dark:bg-blue-900/10';
                  const urgencyBadge = action.urgency === 'Critical'
                    ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800/50'
                    : action.urgency === 'High'
                    ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800/50'
                    : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800/50';
                  const actionBtn = action.urgency === 'Critical'
                    ? 'bg-red-600 hover:bg-red-700 text-white'
                    : action.urgency === 'High'
                    ? 'bg-amber-600 hover:bg-amber-700 text-white'
                    : 'bg-blue-600 hover:bg-blue-700 text-white';
                  return (
                    <div
                      key={action.id}
                      className={`rounded-lg border border-l-[3px] ${urgencyAccent} p-4 transition-opacity ${isActioned ? 'opacity-50' : ''}`}
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex flex-col items-center gap-1.5 flex-shrink-0 pt-0.5">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide ${urgencyBadge}`}>
                            {action.urgency}
                          </span>
                          <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 tabular-nums">
                            {action.countdown}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 leading-snug mb-1">
                            {action.decision}
                          </p>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mb-1.5">
                            <span className="font-medium text-red-600 dark:text-red-400">At risk if ignored:</span> {action.ifIgnored}
                          </p>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">{action.rationale}</p>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-[11px] text-slate-400 dark:text-slate-500">{action.timeSensitivity}</span>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2 flex-shrink-0">
                          <button
                            onClick={() => !isActioned && handleAction(action)}
                            disabled={isActioned}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${isActioned ? 'bg-slate-100 dark:bg-slate-700/40 text-slate-400 cursor-not-allowed' : actionBtn}`}
                          >
                            {isActioned ? 'Logged' : action.actionLabel}
                          </button>
                          <button className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/30 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/40 transition-all">
                            View
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Compliance Status Overview */}
            <div className="bg-white dark:bg-slate-800/25 border border-slate-200 dark:border-slate-700/30 rounded-xl shadow-sm dark:shadow-none overflow-hidden mb-6">
              <div className="flex items-center justify-between gap-3 px-5 py-3 border-b border-slate-200 dark:border-slate-700/30 bg-slate-50/80 dark:bg-slate-900/20">
                <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-widest">
                  Compliance Status Overview
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">Live · Updated daily</span>
              </div>
              <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {complianceStatus.map((item, idx) => {
                  const statusStyle = item.status === 'Compliant'
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800/50'
                    : item.status === 'At Risk'
                    ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800/50'
                    : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800/50';
                  const barStyle = item.status === 'Compliant'
                    ? 'bg-green-500'
                    : item.status === 'At Risk'
                    ? 'bg-amber-500'
                    : 'bg-red-500';
                  const barWidth = item.status === 'Compliant' ? '100%' : item.status === 'At Risk' ? '65%' : '30%';
                  return (
                    <div key={idx} className="bg-slate-50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-700/30 rounded-lg p-4 space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">{item.label}</span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${statusStyle}`}>
                          {item.status}
                        </span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-700/50 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${barStyle}`} style={{ width: barWidth }} />
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{item.detail}</p>
                      <button
                        onClick={() => navigate(item.route)}
                        className="text-[11px] font-semibold text-amber-700 dark:text-amber-400 hover:text-amber-800 dark:hover:text-amber-300 transition-colors"
                      >
                        View details →
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

import React, { useState, useEffect, useRef } from 'react';
import { Users, FileText, TrendingUp, AlertCircle, DollarSign, CheckCircle, Shield, X, Download, Calendar, Filter, BarChart3, Activity, Clock, ArrowUpRight, ArrowDownRight, Eye, RefreshCw, FileSpreadsheet, Building2, Target, Plus, BookOpen, PlayCircle, Printer, ChevronDown, ChevronUp, TrendingDown, Zap, AlertTriangle, CheckCircle2, ShieldCheck, Phone, Lightbulb, Bot, CalendarClock, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import DashboardLayout from '../layouts/DashboardLayout';

export default function ReportsAnalytics() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [timeRange, setTimeRange] = useState('ytd');
  const [selectedReport, setSelectedReport] = useState(null);
  const [reportDetailModal, setReportDetailModal] = useState(null);
  const [exportModal, setExportModal] = useState(false);
  const [scheduleModal, setScheduleModal] = useState(false);
  const [customReportModal, setCustomReportModal] = useState(false);
  const [comparisonModal, setComparisonModal] = useState(false);
  const [aiInsightsExpanded, setAiInsightsExpanded] = useState(true);
  const [expandedMetrics, setExpandedMetrics] = useState(new Set());
  const [selectedComparison, setSelectedComparison] = useState('yoy'); // yoy, mom, qoq
  const [filterCategory, setFilterCategory] = useState('all');

  const [actionedIds, setActionedIds] = useState(new Set());
  const [toast, setToast] = useState(null);
  const toastTimerRef = useRef(null);

  const reportActions = [
    {
      id: 'ra-1',
      urgency: 'Critical',
      decision: 'Sign USMS Inspection Compliance Report',
      ifIgnored: 'ACA accreditation review blocked — federal housing contract at risk',
      timeSensitivity: 'Due in 2 days',
      countdown: '48 hrs',
      rationale: 'USMS inspection Dec 12–14. Unsigned report prevents facility clearance. Major Anderson has prepared all supporting documentation.',
      actionLabel: 'Sign & Submit',
    },
    {
      id: 'ra-2',
      urgency: 'Critical',
      decision: 'Approve Q4 Overtime Variance Report for Board Submission',
      ifIgnored: 'Board meeting delayed — county finance review blocked without sign-off',
      timeSensitivity: 'Due Friday',
      countdown: '3 days',
      rationale: 'OT spend is 19% over allocation. Report documents approved exceptions and mitigating actions. Finance Dir. requires command signature before packet closes.',
      actionLabel: 'Approve',
    },
    {
      id: 'ra-3',
      urgency: 'High',
      decision: 'Review Annual POST Compliance Report — 8 deputies not certified',
      ifIgnored: 'Deputies face restricted-duty status on Jan 1 — patrol coverage gap',
      timeSensitivity: 'Within 7 days',
      countdown: '7 days',
      rationale: '8 deputies have lapsed or expiring POST certs. Training Division needs command authorization to fast-track recertification scheduling.',
      actionLabel: 'Review',
    },
    {
      id: 'ra-4',
      urgency: 'Normal',
      decision: 'Schedule Q1 2025 Executive Performance Review Briefing',
      ifIgnored: 'Department KPI baseline for next fiscal year not established on time',
      timeSensitivity: 'Within 14 days',
      countdown: '14 days',
      rationale: 'Annual performance briefing sets targets for clearance rate, response time, and staffing. Recommended before Jan 15 to align command priorities.',
      actionLabel: 'Schedule',
    },
  ];

  const complianceStatus = [
    { label: 'CJIS Security', status: 'Compliant', detail: 'v5.9 — All 158 staff trained', trend: 'stable', route: '/command/risk' },
    { label: 'ACA Detention', status: 'At Risk', detail: '2 open findings — HVAC deadline', trend: 'down', route: '/command/risk' },
    { label: 'PREA Standards', status: 'Compliant', detail: 'Zero incidents YTD · 100% trained', trend: 'stable', route: '/command/risk' },
    { label: 'GA POST Certs', status: 'Action Needed', detail: '8 deputies expiring within 30 days', trend: 'down', route: '/hr/training' },
  ];

  const showToast = (msg) => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setToast(msg);
    toastTimerRef.current = setTimeout(() => setToast(null), 3000);
  };

  const handleAction = (action) => {
    setActionedIds(prev => new Set([...prev, action.id]));
    showToast(`${action.actionLabel}: "${action.decision.slice(0, 50)}…" logged to audit trail.`);
  };

  // Key metrics data
  const keyMetrics = {
    callsForService: {
      total: 145678,
      change: 5.2,
      trend: 'up',
      ytd: 145678,
      lastYear: 138432
    },
    responseTime: {
      average: 8.4,
      change: -12.3,
      trend: 'down',
      target: 8.0,
      unit: 'minutes'
    },
    crimeClearanceRate: {
      rate: 68.5,
      change: 3.8,
      trend: 'up',
      target: 70.0,
      unit: '%'
    },
    arrestsYTD: {
      total: 12456,
      change: -2.1,
      trend: 'down',
      lastYear: 12724
    },
    staffing: {
      current: 164,
      authorized: 178,
      percentage: 92.1,
      change: 1.2
    },
    overtime: {
      hours: 18943,
      cost: 1247850,
      change: -8.5,
      trend: 'down'
    }
  };

  // Division performance data
  const divisionPerformance = [
    {
      name: 'Patrol Division',
      calls: 89234,
      responseTime: 7.8,
      clearanceRate: 45.2,
      staffing: 92,
      efficiency: 88
    },
    {
      name: 'Investigations',
      calls: 5643,
      responseTime: 24.5,
      clearanceRate: 82.3,
      staffing: 95,
      efficiency: 91
    },
    {
      name: 'Detention',
      calls: 0,
      responseTime: 0,
      clearanceRate: 0,
      staffing: 94,
      efficiency: 87,
      inmates: 842,
      capacity: 920
    },
    {
      name: 'Support Services',
      calls: 12456,
      responseTime: 15.2,
      clearanceRate: 68.9,
      staffing: 89,
      efficiency: 85
    }
  ];

  // Monthly trends
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
    { month: 'Oct', calls: 12986, arrests: 1102, clearance: 68.5 }
  ];

  // Crime statistics
  const crimeStats = [
    { category: 'Property Crime', incidents: 4523, change: -5.8, arrests: 3102, clearance: 68.6 },
    { category: 'Violent Crime', incidents: 892, change: 2.3, arrests: 745, clearance: 83.5 },
    { category: 'Drug Offenses', incidents: 1876, change: -12.4, arrests: 1654, clearance: 88.2 },
    { category: 'Traffic Violations', incidents: 8934, change: 3.2, arrests: 7823, clearance: 87.6 },
    { category: 'Public Order', incidents: 2134, change: -1.5, arrests: 1678, clearance: 78.6 }
  ];

  // Available reports with enhanced data
  const availableReports = [
    {
      id: 1,
      name: 'Executive Monthly Summary',
      description: 'Comprehensive monthly overview for command staff',
      category: 'Executive',
      lastGenerated: '2024-11-01',
      frequency: 'Monthly',
      icon: FileText,
      scheduled: true,
      recipients: 12,
      views: 342,
      downloads: 89,
      status: 'active',
      nextScheduled: '2024-12-01',
      dataPoints: ['Calls for Service', 'Response Times', 'Crime Clearance', 'Budget Status', 'Personnel'],
      fileSize: '2.4 MB'
    },
    {
      id: 2,
      name: 'Crime Statistics Report',
      description: 'Detailed crime trends and clearance rates',
      category: 'Operations',
      lastGenerated: '2024-11-03',
      frequency: 'Weekly',
      icon: BarChart3,
      scheduled: true,
      recipients: 8,
      views: 156,
      downloads: 45,
      status: 'active',
      nextScheduled: '2024-11-10',
      dataPoints: ['Incident Types', 'Clearance Rates', 'Arrest Data', 'Geographic Analysis'],
      fileSize: '1.8 MB'
    },
    {
      id: 3,
      name: 'Personnel Compliance Report',
      description: 'Certifications, training, and compliance status',
      category: 'HR',
      lastGenerated: '2024-11-02',
      frequency: 'Weekly',
      icon: Users,
      scheduled: true,
      recipients: 6,
      views: 234,
      downloads: 67,
      status: 'active',
      nextScheduled: '2024-11-09',
      dataPoints: ['Certifications', 'Training Hours', 'Expiring Credentials', 'Compliance Score'],
      fileSize: '1.2 MB'
    },
    {
      id: 4,
      name: 'Budget Variance Analysis',
      description: 'YTD spending vs budget by division',
      category: 'Finance',
      lastGenerated: '2024-11-01',
      frequency: 'Monthly',
      icon: DollarSign,
      scheduled: true,
      recipients: 15,
      views: 423,
      downloads: 124,
      status: 'active',
      nextScheduled: '2024-12-01',
      dataPoints: ['Division Budgets', 'Variance Analysis', 'Projections', 'Overtime Costs'],
      fileSize: '3.1 MB'
    },
    {
      id: 5,
      name: 'Use of Force Analysis',
      description: 'Incidents, trends, and policy compliance',
      category: 'Operations',
      lastGenerated: '2024-10-28',
      frequency: 'Quarterly',
      icon: Shield,
      scheduled: true,
      recipients: 10,
      views: 178,
      downloads: 52,
      status: 'active',
      nextScheduled: '2025-01-28',
      dataPoints: ['Incident Count', 'Force Types', 'Injury Rates', 'Officer Involved', 'Policy Compliance'],
      fileSize: '2.7 MB'
    },
    {
      id: 6,
      name: 'Community Engagement Metrics',
      description: 'Public interactions and satisfaction surveys',
      category: 'Community',
      lastGenerated: '2024-10-30',
      frequency: 'Monthly',
      icon: Users,
      scheduled: false,
      recipients: 5,
      views: 89,
      downloads: 23,
      status: 'active',
      nextScheduled: null,
      dataPoints: ['Public Contacts', 'Survey Results', 'Community Events', 'Satisfaction Scores'],
      fileSize: '1.5 MB'
    },
    {
      id: 7,
      name: 'Fleet Maintenance Report',
      description: 'Vehicle status, maintenance costs, replacement needs',
      category: 'Support',
      lastGenerated: '2024-11-02',
      frequency: 'Monthly',
      icon: Activity,
      scheduled: true,
      recipients: 7,
      views: 145,
      downloads: 34,
      status: 'active',
      nextScheduled: '2024-12-02',
      dataPoints: ['Vehicle Condition', 'Maintenance Costs', 'Downtime', 'Replacement Schedule'],
      fileSize: '1.9 MB'
    },
    {
      id: 8,
      name: 'Training Completion Report',
      description: 'Officer training hours and certification status',
      category: 'Training',
      lastGenerated: '2024-11-01',
      frequency: 'Monthly',
      icon: FileText,
      scheduled: true,
      recipients: 9,
      views: 267,
      downloads: 78,
      status: 'active',
      nextScheduled: '2024-12-01',
      dataPoints: ['Training Hours', 'Completion Rates', 'Certifications', 'Course Enrollment'],
      fileSize: '2.2 MB'
    },
    {
      id: 9,
      name: 'Overtime Analysis Report',
      description: 'Detailed overtime tracking and cost analysis by division',
      category: 'Finance',
      lastGenerated: '2024-11-03',
      frequency: 'Bi-Weekly',
      icon: Clock,
      scheduled: true,
      recipients: 11,
      views: 198,
      downloads: 56,
      status: 'active',
      nextScheduled: '2024-11-17',
      dataPoints: ['OT Hours', 'Cost by Division', 'Trends', 'Staff Utilization'],
      fileSize: '1.6 MB'
    },
    {
      id: 10,
      name: 'Detention Facility Report',
      description: 'Inmate population, incidents, and facility operations',
      category: 'Operations',
      lastGenerated: '2024-11-02',
      frequency: 'Weekly',
      icon: Building2,
      scheduled: true,
      recipients: 8,
      views: 187,
      downloads: 42,
      status: 'active',
      nextScheduled: '2024-11-09',
      dataPoints: ['Population', 'Capacity', 'Incidents', 'Medical', 'Classification'],
      fileSize: '2.0 MB'
    }
  ];

  const getChangeColor = (change) => {
    if (change > 0) return 'text-green-600 dark:text-green-400';
    if (change < 0) return 'text-red-700 dark:text-red-400';
    return 'text-slate-500';
  };

  const getChangeIcon = (change) => {
    if (change > 0) return <ArrowUpRight className="w-4 h-4" />;
    if (change < 0) return <ArrowDownRight className="w-4 h-4" />;
    return null;
  };

  const toggleMetricExpand = (metricId) => {
    const newExpanded = new Set(expandedMetrics);
    if (newExpanded.has(metricId)) {
      newExpanded.delete(metricId);
    } else {
      newExpanded.add(metricId);
    }
    setExpandedMetrics(newExpanded);
  };

  const filteredReports = filterCategory === 'all'
    ? availableReports
    : availableReports.filter(r => r.category === filterCategory);

  return (
    <DashboardLayout>
      <div className="p-5 lg:p-8 space-y-6 min-h-full">
          <div className="max-w-7xl mx-auto">

            {/* Page Header */}
            <div className="mb-6 pb-5 border-b border-border flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h2 className="text-2xl lg:text-3xl font-bold text-primary mb-0.5">Reports & Compliance</h2>
                <p className="text-sm text-muted">FY 2024 · Updated {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })} EST</p>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <select
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="px-3 py-2 bg-white dark:bg-slate-800/40 border border-border rounded-xl text-primary text-sm focus:outline-none focus:border-amber-500/50"
                >
                  <option value="ytd">Year to Date</option>
                  <option value="last30">Last 30 Days</option>
                  <option value="last90">Last 90 Days</option>
                  <option value="q4">This Quarter</option>
                  <option value="fy2024">Fiscal Year 2024</option>
                </select>
                <button onClick={() => setExportModal(true)} className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-slate-800/40 border border-border rounded-xl text-secondary hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-all text-sm">
                  <FileSpreadsheet className="w-4 h-4" />Export
                </button>
                <button onClick={() => setCustomReportModal(true)} className="flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded-xl text-white text-sm font-medium transition-all">
                  <Plus className="w-4 h-4" />Custom Report
                </button>
              </div>
            </div>

            {/* ── Report Command Actions ───────────────────── */}
            <div className="mb-6">
              <h3 className="text-xs font-semibold text-muted uppercase tracking-widest mb-3">Reports Requiring Action</h3>
              <div className="space-y-3">
                {reportActions.map((action) => {
                  const actioned = actionedIds.has(action.id);
                  const urgencyStyles =
                    action.urgency === 'Critical' ? { badge: 'bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400 border border-red-200 dark:border-red-500/20', strip: 'bg-red-500' } :
                    action.urgency === 'High'     ? { badge: 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400 border border-amber-200 dark:border-amber-500/20', strip: 'bg-amber-500' } :
                                                    { badge: 'bg-slate-100 text-slate-600 dark:bg-slate-700/30 dark:text-slate-400 border border-slate-200 dark:border-slate-600/30', strip: 'bg-slate-400' };
                  return (
                    <div key={action.id} className={`bg-white dark:bg-slate-800/25 border border-border dark:border-slate-700/30 rounded-xl overflow-hidden flex transition-opacity ${actioned ? 'opacity-60' : ''}`}>
                      <div className={`w-1 flex-shrink-0 ${urgencyStyles.strip}`} />
                      <div className="flex-1 p-4">
                        <div className="flex flex-col lg:flex-row lg:items-start gap-3">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                              <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${urgencyStyles.badge}`}>{action.urgency}</span>
                              <span className="text-[11px] text-muted">{action.countdown} remaining</span>
                              {actioned && <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20">Actioned</span>}
                            </div>
                            <p className="text-sm font-semibold text-primary mb-1">{action.decision}</p>
                            <p className="text-xs text-red-700 dark:text-red-400 mb-1.5"><span className="font-medium">If ignored: </span>{action.ifIgnored}</p>
                            <p className="text-[11px] text-muted leading-relaxed">{action.rationale}</p>
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <button
                              onClick={() => !actioned && handleAction(action)}
                              disabled={actioned}
                              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors ${actioned ? 'bg-slate-100 dark:bg-slate-700/30 text-slate-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
                            >
                              {action.actionLabel}
                            </button>
                            <button className="px-4 py-2 rounded-lg text-xs font-medium border border-slate-300 dark:border-slate-700/50 text-secondary hover:bg-slate-50 dark:hover:bg-slate-700/20 transition-colors">
                              Escalate
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ── Compliance Status Overview ───────────────── */}
            <div className="mb-6">
              <h3 className="text-xs font-semibold text-muted uppercase tracking-widest mb-3">Compliance Status</h3>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {complianceStatus.map((item) => {
                  const isRisk = item.status === 'At Risk' || item.status === 'Action Needed';
                  const statusStyle =
                    item.status === 'Compliant'      ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400' :
                    item.status === 'At Risk'         ? 'bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400' :
                                                       'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400';
                  return (
                    <button
                      key={item.label}
                      onClick={() => navigate(item.route)}
                      className="bg-white dark:bg-slate-800/25 border border-border dark:border-slate-700/30 rounded-xl p-4 text-left hover:shadow-md transition-all"
                    >
                      <p className="text-xs font-semibold text-muted uppercase tracking-wide mb-2">{item.label}</p>
                      <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${statusStyle}`}>{item.status}</span>
                      <p className="text-[11px] text-muted mt-2 leading-relaxed">{item.detail}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ── Performance Intelligence (flat, collapsible) ─ */}
            <div className="mb-6 bg-white dark:bg-slate-800/25 border border-border dark:border-slate-700/30 rounded-xl overflow-hidden">
              <button
                onClick={() => setAiInsightsExpanded(!aiInsightsExpanded)}
                className="w-full flex items-center justify-between px-5 py-3.5 hover:bg-slate-50 dark:hover:bg-slate-800/10 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Bot className="w-4 h-4 text-secondary" />
                  <span className="text-[13px] font-semibold text-primary">Performance Intelligence</span>
                  <span className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-700/30 text-[11px] text-slate-600 dark:text-slate-400 rounded">4 insights</span>
                </div>
                {aiInsightsExpanded ? <ChevronUp className="w-4 h-4 text-muted" /> : <ChevronDown className="w-4 h-4 text-muted" />}
              </button>
              {aiInsightsExpanded && (
                <div className="px-5 pb-5 border-t border-border grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 pt-4">
                  <div className="bg-white dark:bg-slate-900/40 rounded-lg p-4 border border-border">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">Performance</p>
                    </div>
                    <div className="space-y-1.5 text-xs text-secondary">
                      <div className="flex justify-between"><span>Patrol response:</span><span className="font-medium text-primary">7.8 min <span className="text-emerald-600 dark:text-emerald-400">↓0.6</span></span></div>
                      <div className="flex justify-between"><span>Case closure:</span><span className="font-medium text-primary">82.3% <span className="text-emerald-600 dark:text-emerald-400">↑4.1%</span></span></div>
                      <div className="flex justify-between"><span>Training:</span><span className="font-medium text-primary">94% <span className="text-emerald-600 dark:text-emerald-400">↑8%</span></span></div>
                    </div>
                  </div>
                  <div className="bg-white dark:bg-slate-900/40 rounded-lg p-4 border border-amber-200 dark:border-amber-500/20">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="w-4 h-4 text-amber-700 dark:text-amber-400" />
                      <p className="text-xs font-semibold text-amber-700 dark:text-amber-400">Attention Needed</p>
                    </div>
                    <div className="space-y-1.5 text-xs text-secondary">
                      <div className="flex justify-between"><span>Staffing:</span><span className="font-medium text-amber-700 dark:text-amber-400">92.1% (14 open)</span></div>
                      <div className="flex justify-between"><span>Certs expiring:</span><span className="font-medium text-amber-700 dark:text-amber-400">45 in 30 days</span></div>
                      <div className="flex justify-between"><span>Equip. budget:</span><span className="font-medium text-red-700 dark:text-red-400">95% used</span></div>
                    </div>
                  </div>
                  <div className="bg-white dark:bg-slate-900/40 rounded-lg p-4 border border-border">
                    <div className="flex items-center gap-2 mb-2">
                      <DollarSign className="w-4 h-4 text-secondary" />
                      <p className="text-xs font-semibold text-secondary">Budget</p>
                    </div>
                    <div className="space-y-1.5 text-xs text-secondary">
                      <div className="flex justify-between"><span>YTD spending:</span><span className="font-medium text-primary">85% of budget</span></div>
                      <div className="flex justify-between"><span>Year-end proj:</span><span className="font-medium text-amber-700 dark:text-amber-400">100.5%</span></div>
                      <div className="flex justify-between"><span>Recommend:</span><span className="font-medium text-secondary">$250K realloc</span></div>
                    </div>
                  </div>
                  <div className="bg-white dark:bg-slate-900/40 rounded-lg p-4 border border-border">
                    <div className="flex items-center gap-2 mb-2">
                      <Lightbulb className="w-4 h-4 text-secondary" />
                      <p className="text-xs font-semibold text-secondary">Recommendations</p>
                    </div>
                    <div className="space-y-1.5 text-xs text-secondary">
                      <p>• Focus hiring on patrol division</p>
                      <p>• Schedule cert training Q1 2025</p>
                      <p>• Review fleet replacement timeline</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Tabs */}
            <div className="mb-6 flex gap-2 border-b border-border overflow-x-auto">
              {[
                { id: 'overview', label: 'Overview', icon: Zap },
                { id: 'operations', label: 'Operations', icon: Activity },
                { id: 'crime', label: 'Crime Stats', icon: Target },
                { id: 'reports', label: 'Reports Library', icon: BookOpen }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-all relative whitespace-nowrap ${
                    activeTab === tab.id ? 'text-amber-700 dark:text-amber-400' : 'text-secondary hover:text-slate-300'
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

            {/* OVERVIEW TAB */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Enhanced Key Metrics Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* Calls for Service Card */}
                  <div className="bg-white dark:bg-slate-800/40 border border-blue-500/30 rounded-xl p-5">
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
                        <Phone className="w-5 h-5 text-blue-400" />
                      </div>
                      <span className="text-xs font-medium text-blue-400">CALLS FOR SERVICE</span>
                    </div>
                    <p className="text-2xl font-bold text-primary mb-1">{keyMetrics.callsForService.total.toLocaleString()}</p>
                    <p className="text-sm text-secondary mb-3">Year to Date (Jan 1 - Jan 21, 2026)</p>
                    <div className="space-y-1.5 border-t border-border pt-3">
                      <div className="flex justify-between text-xs">
                        <span className="text-secondary">Trend vs 2025:</span>
                        <span className={`font-bold flex items-center gap-1 ${getChangeColor(keyMetrics.callsForService.change)}`}>
                          {getChangeIcon(keyMetrics.callsForService.change)}
                          {Math.abs(keyMetrics.callsForService.change)}%
                        </span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-secondary">Avg per day:</span>
                        <span className="font-medium text-primary">6,936 calls</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-secondary">Peak hours:</span>
                        <span className="font-medium text-primary">1400-1800 hrs</span>
                      </div>
                    </div>
                  </div>

                  {/* Avg Response Time Card */}
                  <div className="bg-white dark:bg-slate-800/40 border border-green-500/30 rounded-xl p-5">
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center">
                        <Clock className="w-5 h-5 text-green-600 dark:text-green-400" />
                      </div>
                      <span className="text-xs font-medium text-green-600 dark:text-green-400">AVG RESPONSE TIME</span>
                    </div>
                    <p className="text-2xl font-bold text-primary mb-1">{keyMetrics.responseTime.average} min</p>
                    <p className="text-sm text-secondary mb-3">All priorities combined</p>
                    <div className="mb-3">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-secondary">Target: {keyMetrics.responseTime.target} min</span>
                        <span className="font-bold text-green-600 dark:text-green-400">0.4 min above</span>
                      </div>
                      <div className="w-full h-2 bg-white dark:bg-slate-700/50 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500" style={{ width: '95%' }} />
                      </div>
                    </div>
                    <div className="space-y-1.5 border-t border-border pt-3">
                      <div className="flex justify-between text-xs">
                        <span className="text-secondary">P1 (Emergency):</span>
                        <span className="font-medium text-green-600 dark:text-green-400">3.2 min <CheckCircle className="w-3 h-3 inline" /></span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-secondary">P2 (Urgent):</span>
                        <span className="font-medium text-green-600 dark:text-green-400">7.8 min <CheckCircle className="w-3 h-3 inline" /></span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-secondary">P3 (Routine):</span>
                        <span className="font-medium text-green-600 dark:text-green-400">18.4 min <CheckCircle className="w-3 h-3 inline" /></span>
                      </div>
                    </div>
                  </div>

                  {/* Crime Clearance Rate Card */}
                  <div className="bg-white dark:bg-slate-800/40 border border-purple-500/30 rounded-xl p-5">
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-purple-400" />
                      </div>
                      <span className="text-xs font-medium text-purple-400">CLEARANCE RATE</span>
                    </div>
                    <p className="text-2xl font-bold text-primary mb-1">{keyMetrics.crimeClearanceRate.rate}%</p>
                    <p className="text-sm text-secondary mb-3">Cases closed/solved vs total</p>
                    <div className="mb-3">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-secondary">Target: {keyMetrics.crimeClearanceRate.target}%</span>
                        <span className="font-bold text-amber-700 dark:text-amber-400">1.5 pts below</span>
                      </div>
                      <div className="w-full h-2 bg-white dark:bg-slate-700/50 rounded-full overflow-hidden">
                        <div className="h-full bg-purple-500" style={{ width: '97.9%' }} />
                      </div>
                    </div>
                    <div className="space-y-1.5 border-t border-border pt-3">
                      <div className="flex justify-between text-xs">
                        <span className="text-secondary">Violent crimes:</span>
                        <span className="font-medium text-green-600 dark:text-green-400">82.1% <CheckCircle className="w-3 h-3 inline" /></span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-secondary">Property crimes:</span>
                        <span className="font-medium text-amber-700 dark:text-amber-400">56.8%</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-secondary">YoY change:</span>
                        <span className="font-medium text-green-600 dark:text-green-400 flex items-center gap-1">
                          <ArrowUpRight className="w-3 h-3" />+3.8 pts
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Arrests Card */}
                  <div className="bg-white dark:bg-slate-800/40 border border-amber-500/30 rounded-xl p-5">
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 bg-amber-500/20 rounded-xl flex items-center justify-center">
                        <ShieldCheck className="w-5 h-5 text-amber-700 dark:text-amber-400" />
                      </div>
                      <span className="text-xs font-medium text-amber-700 dark:text-amber-400">ARRESTS (YTD)</span>
                    </div>
                    <p className="text-2xl font-bold text-primary mb-1">{keyMetrics.arrestsYTD.total.toLocaleString()}</p>
                    <p className="text-sm text-secondary mb-3">Jan 1 - Jan 21, 2026</p>
                    <div className="space-y-1.5 border-t border-border pt-3">
                      <div className="flex justify-between text-xs">
                        <span className="text-secondary">Trend vs 2025:</span>
                        <span className="font-bold text-green-600 dark:text-green-400 flex items-center gap-1">
                          <ArrowDownRight className="w-3 h-3" />-2.1% (fewer crimes)
                        </span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-secondary">Felony:</span>
                        <span className="font-medium text-primary">3,487 (28%)</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-secondary">Prosecution rate:</span>
                        <span className="font-medium text-green-600 dark:text-green-400">87.4% <CheckCircle className="w-3 h-3 inline" /></span>
                      </div>
                    </div>
                  </div>

                  {/* Staffing Level Card */}
                  <div className="bg-white dark:bg-slate-800/40 border border-blue-500/30 rounded-xl p-5">
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
                        <Users className="w-5 h-5 text-blue-400" />
                      </div>
                      <span className="text-xs font-medium text-blue-400">STAFFING LEVEL</span>
                    </div>
                    <p className="text-2xl font-bold text-primary mb-1">{keyMetrics.staffing.percentage}%</p>
                    <p className="text-sm text-secondary mb-3">{keyMetrics.staffing.current} / {keyMetrics.staffing.authorized} positions</p>
                    <div className="mb-3">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-secondary">Target: 95% (169 pos)</span>
                        <span className="font-bold text-amber-700 dark:text-amber-400">-5 positions</span>
                      </div>
                      <div className="w-full h-2 bg-white dark:bg-slate-700/50 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500" style={{ width: `${keyMetrics.staffing.percentage}%` }} />
                      </div>
                    </div>
                    <div className="space-y-1.5 border-t border-border pt-3">
                      <div className="flex justify-between text-xs">
                        <span className="text-secondary">Vacancies:</span>
                        <span className="font-medium text-amber-700 dark:text-amber-400">14 open positions</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-secondary">Pipeline:</span>
                        <span className="font-medium text-primary">12 candidates</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-secondary">Vacancy OT cost:</span>
                        <span className="font-medium text-red-700 dark:text-red-400">$588K/year</span>
                      </div>
                    </div>
                  </div>

                  {/* Overtime Cost Card */}
                  <div className="bg-white dark:bg-slate-800/40 border border-green-500/30 rounded-xl p-5">
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center">
                        <DollarSign className="w-5 h-5 text-green-600 dark:text-green-400" />
                      </div>
                      <span className="text-xs font-medium text-green-600 dark:text-green-400">OVERTIME COST</span>
                    </div>
                    <p className="text-2xl font-bold text-primary mb-1">${(keyMetrics.overtime.cost / 1000000).toFixed(1)}M</p>
                    <p className="text-sm text-secondary mb-3">{keyMetrics.overtime.hours.toLocaleString()} hours YTD</p>
                    <div className="mb-3">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-secondary">Target: &lt;10% of budget</span>
                        <span className="font-bold text-green-600 dark:text-green-400">8.9% <CheckCircle className="w-3 h-3 inline" /></span>
                      </div>
                      <div className="w-full h-2 bg-white dark:bg-slate-700/50 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500" style={{ width: '89%' }} />
                      </div>
                    </div>
                    <div className="space-y-1.5 border-t border-border pt-3">
                      <div className="flex justify-between text-xs">
                        <span className="text-secondary">YoY change:</span>
                        <span className="font-medium text-green-600 dark:text-green-400 flex items-center gap-1">
                          <ArrowDownRight className="w-3 h-3" />-8.5% ($110K saved)
                        </span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-secondary">Shift coverage:</span>
                        <span className="font-medium text-primary">54% of OT</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-secondary">vs National avg:</span>
                        <span className="font-medium text-green-600 dark:text-green-400">12-26% below</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Enhanced Monthly Trends */}
                <div className="bg-white dark:bg-slate-800/40 border border-border rounded-xl shadow-sm dark:shadow-none p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-blue-400" />
                      <h3 className="text-lg font-semibold text-primary">Monthly Trends</h3>
                      <span className="text-xs text-secondary">(Last 12 Months - Rolling)</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded">Click for details</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {monthlyTrends.map((month, idx) => {
                      const prevMonth = idx > 0 ? monthlyTrends[idx - 1] : null;
                      const callsChange = prevMonth ? ((month.calls - prevMonth.calls) / prevMonth.calls * 100).toFixed(1) : 0;
                      return (
                        <div key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-900/30 rounded-lg p-2 -mx-2 cursor-pointer transition-colors">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-3">
                              <span className="text-sm font-medium text-primary w-8">{month.month}</span>
                              {idx === monthlyTrends.length - 1 && (
                                <span className="text-xs px-1.5 py-0.5 bg-amber-500/20 text-amber-700 dark:text-amber-400 rounded">Current</span>
                              )}
                            </div>
                            <div className="flex items-center gap-6 text-xs">
                              <div className="flex items-center gap-2">
                                <Phone className="w-3 h-3 text-secondary" />
                                <span className="text-secondary">Calls:</span>
                                <span className="font-bold text-primary">{month.calls.toLocaleString()}</span>
                                {prevMonth && (
                                  <span className={`font-medium ${parseFloat(callsChange) >= 0 ? 'text-amber-700 dark:text-amber-400' : 'text-green-600 dark:text-green-400'}`}>
                                    ({parseFloat(callsChange) >= 0 ? '+' : ''}{callsChange}%)
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center gap-2">
                                <ShieldCheck className="w-3 h-3 text-blue-400" />
                                <span className="text-secondary">Arrests:</span>
                                <span className="font-bold text-blue-400">{month.arrests.toLocaleString()}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <CheckCircle className="w-3 h-3 text-green-600 dark:text-green-400" />
                                <span className="text-secondary">Clear:</span>
                                <span className={`font-bold ${month.clearance >= 68 ? 'text-green-600 dark:text-green-400' : 'text-amber-700 dark:text-amber-400'}`}>{month.clearance}%</span>
                              </div>
                            </div>
                          </div>
                          <div className="w-full h-2 bg-white dark:bg-slate-700/50 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-blue-500 to-green-500" style={{ width: `${(month.clearance / 100) * 100}%` }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Seasonal Patterns Summary */}
                  <div className="mt-4 pt-4 border-t border-border">
                    <h4 className="text-sm font-semibold text-primary mb-3">Seasonal Patterns Identified</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                      <div className="bg-white dark:bg-slate-900/40 rounded-lg p-3">
                        <p className="text-secondary mb-1">Summer Peak (Jun-Aug)</p>
                        <p className="font-bold text-primary">14,782 calls/mo</p>
                        <p className="text-amber-700 dark:text-amber-400">+18% vs winter</p>
                      </div>
                      <div className="bg-white dark:bg-slate-900/40 rounded-lg p-3">
                        <p className="text-secondary mb-1">Winter Low (Nov-Feb)</p>
                        <p className="font-bold text-primary">12,404 calls/mo</p>
                        <p className="text-green-600 dark:text-green-400">Lowest volume</p>
                      </div>
                      <div className="bg-white dark:bg-slate-900/40 rounded-lg p-3">
                        <p className="text-secondary mb-1">YoY Total 2025</p>
                        <p className="font-bold text-primary">157,423 calls</p>
                        <p className="text-green-600 dark:text-green-400">+5.0% vs 2024</p>
                      </div>
                      <div className="bg-white dark:bg-slate-900/40 rounded-lg p-3">
                        <p className="text-secondary mb-1">Best Clearance</p>
                        <p className="font-bold text-primary">July - 69.5%</p>
                        <p className="text-green-600 dark:text-green-400">Peak performance</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* OPERATIONS TAB */}
            {activeTab === 'operations' && (
              <div className="space-y-6">
                <div className="bg-white dark:bg-slate-800/40 border border-border rounded-xl shadow-sm dark:shadow-none p-6">
                  <h3 className="text-lg font-semibold text-primary mb-4">Division Performance</h3>
                  <div className="space-y-6">
                    {divisionPerformance.map((division, idx) => (
                      <div key={idx} className="bg-white dark:bg-slate-900/50 rounded-xl p-5">
                        <div className="flex items-center justify-between mb-6">
                          <h4 className="text-base font-semibold text-primary">{division.name}</h4>
                          <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                            division.efficiency >= 90 ? 'bg-green-500/20 text-green-600 dark:text-green-400' :
                            division.efficiency >= 85 ? 'bg-amber-500/20 text-amber-700 dark:text-amber-400' : 'bg-red-500/20 text-red-700 dark:text-red-400'
                          }`}>
                            {division.efficiency}% Efficiency
                          </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {division.calls > 0 && (
                            <div>
                              <p className="text-xs text-secondary mb-1">Calls</p>
                              <p className="text-lg font-bold text-primary">{division.calls.toLocaleString()}</p>
                            </div>
                          )}
                          {division.responseTime > 0 && (
                            <div>
                              <p className="text-xs text-secondary mb-1">Response Time</p>
                              <p className="text-lg font-bold text-primary">{division.responseTime} min</p>
                            </div>
                          )}
                          {division.clearanceRate > 0 && (
                            <div>
                              <p className="text-xs text-secondary mb-1">Clearance Rate</p>
                              <p className="text-lg font-bold text-primary">{division.clearanceRate}%</p>
                            </div>
                          )}
                          <div>
                            <p className="text-xs text-secondary mb-1">Staffing</p>
                            <p className="text-lg font-bold text-primary">{division.staffing}%</p>
                          </div>
                          {division.inmates && (
                            <>
                              <div>
                                <p className="text-xs text-secondary mb-1">Inmates</p>
                                <p className="text-lg font-bold text-primary">{division.inmates}</p>
                              </div>
                              <div>
                                <p className="text-xs text-secondary mb-1">Capacity</p>
                                <p className="text-lg font-bold text-primary">{division.capacity}</p>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* CRIME STATS TAB */}
            {activeTab === 'crime' && (
              <div className="space-y-6">
                <div className="bg-white dark:bg-slate-800/40 border border-border rounded-xl overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-slate-50 dark:bg-slate-900/50 border-b border-border">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-secondary uppercase tracking-wider">Category</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-secondary uppercase tracking-wider">Incidents</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-secondary uppercase tracking-wider">YoY Change</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-secondary uppercase tracking-wider">Arrests</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-secondary uppercase tracking-wider">Clearance Rate</th>
                        </tr>
                      </thead>
                      <tbody>
                        {crimeStats.map((stat, idx) => (
                          <tr key={idx} className="border-b border-border dark:border-slate-800/30 hover:bg-slate-100 dark:hover:bg-slate-800/30 transition-colors">
                            <td className="px-4 py-4">
                              <p className="text-sm font-medium text-primary">{stat.category}</p>
                            </td>
                            <td className="px-4 py-4">
                              <p className="text-sm text-secondary">{stat.incidents.toLocaleString()}</p>
                            </td>
                            <td className="px-4 py-4">
                              <div className={`flex items-center gap-1 ${getChangeColor(stat.change)}`}>
                                {getChangeIcon(stat.change)}
                                <span className="text-sm font-bold">{Math.abs(stat.change)}%</span>
                              </div>
                            </td>
                            <td className="px-4 py-4">
                              <p className="text-sm text-secondary">{stat.arrests.toLocaleString()}</p>
                            </td>
                            <td className="px-4 py-4">
                              <div className="flex items-center gap-3">
                                <span className={`text-sm font-bold ${
                                  stat.clearance >= 80 ? 'text-green-600 dark:text-green-400' :
                                  stat.clearance >= 65 ? 'text-amber-700 dark:text-amber-400' : 'text-red-700 dark:text-red-400'
                                }`}>{stat.clearance}%</span>
                                <div className="flex-1 h-2 bg-white dark:bg-slate-700/50 rounded-full overflow-hidden max-w-[100px]">
                                  <div className={`h-full ${
                                    stat.clearance >= 80 ? 'bg-green-500' :
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
              </div>
            )}

            {/* REPORTS LIBRARY TAB */}
            {activeTab === 'reports' && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                    <input
                      type="text"
                      placeholder="Search reports..."
                      className="w-full pl-12 pr-4 py-2.5 bg-white dark:bg-slate-800/40 border border-border rounded-xl text-primary placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-amber-500/50"
                    />
                  </div>
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="px-4 py-2.5 bg-white dark:bg-slate-800/40 border border-border rounded-xl text-primary text-sm focus:outline-none focus:border-amber-500/50 cursor-pointer"
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
                      <div key={report.id} className="bg-white dark:bg-slate-800/40 border border-border rounded-xl shadow-sm dark:shadow-none p-5 hover:border-slate-600/50 transition-all group">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-blue-500/30 transition-colors">
                            <Icon className="w-6 h-6 text-blue-400" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-1">
                              <h4 className="text-base font-semibold text-primary">{report.name}</h4>
                              <div className="flex items-center gap-1">
                                {report.scheduled && (
                                  <div className="px-2 py-0.5 bg-green-500/20 text-green-600 dark:text-green-400 text-xs rounded-full flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    Auto
                                  </div>
                                )}
                              </div>
                            </div>
                            <p className="text-sm text-secondary mb-3">{report.description}</p>
                            <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {report.frequency}
                              </span>
                              <span className="flex items-center gap-1">
                                <Eye className="w-3 h-3" />
                                {report.views} views
                              </span>
                              <span className="flex items-center gap-1">
                                <Download className="w-3 h-3" />
                                {report.downloads}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <button
                                onClick={() => setReportDetailModal(report)}
                                className="flex items-center gap-2 px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-xs font-medium transition-all"
                              >
                                <Eye className="w-3 h-3" />
                                View Details
                              </button>
                              <button className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 dark:bg-slate-700/40 hover:bg-slate-700/60 border border-slate-600/50 text-primary rounded-lg text-xs font-medium transition-all">
                                <Download className="w-3 h-3" />
                                Download
                              </button>
                              <button className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 dark:bg-slate-700/40 hover:bg-slate-700/60 border border-slate-600/50 text-primary rounded-lg text-xs font-medium transition-all">
                                <RefreshCw className="w-3 h-3" />
                                Generate
                              </button>
                              {!report.scheduled && (
                                <button
                                  onClick={() => setScheduleModal(report)}
                                  className="flex items-center gap-2 px-3 py-1.5 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 text-purple-300 rounded-lg text-xs font-medium transition-all"
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
      </div>
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50">
          <div className="px-4 py-3 rounded-lg border flex items-center gap-2 text-sm shadow-lg bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100">
            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
            <p className="max-w-xs">{toast}</p>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

import React, { useState, useEffect } from 'react';
import { Shield, X, Download, Filter, ChevronDown, ChevronRight, MessageCircle, ClipboardCheck, Scale, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import DashboardLayout from '../layouts/DashboardLayout';
import { biNavigation, biProfile, biNotifications } from '../config/biConfig';
import { api } from '../api';

// ── Component ─────────────────────────────────────────────────

const getDaysOld = (dateStr) => Math.floor((Date.now() - new Date(dateStr)) / 86400000);
const fmtCaseId = (id) => `BI-${String(id).padStart(7, '0')}`;

const STATUS_MAP = {
  submitted:         'Initial Review',
  in_progress:       'In Progress',
  pending_review:    'Pending Review',
  pending_signature: 'Pending Signature',
  complete:          'Complete',
  completed:         'Complete',
};

const formatStatus = (raw) =>
  STATUS_MAP[raw] ||
  String(raw).replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());

const NEXT_ACTION = {
  submitted:         'Complete initial document review',
  in_progress:       'Continue active investigation stages',
  pending_review:    'Awaiting supervisor adjudication decision',
  pending_signature: 'Awaiting supervisor signature before case can be closed',
  complete:          'Case closed — no further action required',
};

export default function BackgroundsDashboard() {
  const navigate = useNavigate();
  const [chatOpen, setChatOpen] = useState(false);
  const [timeRange, setTimeRange] = useState('month');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [supervisorReviewVisible, setSupervisorReviewVisible] = useState(true);
  const [filterOpen, setFilterOpen] = useState(false);
  const [casesData, setCasesData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/cases')
      .then(data => setCasesData(data ?? []))
      .catch(() => setCasesData([]))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterOpen && !event.target.closest('.filter-container')) {
        setFilterOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [filterOpen]);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  };

  // ── Derived metrics from real API data ───────────────────────
  const now = new Date();
  const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const activeCasesList   = casesData.filter(c => c.status !== 'complete' && c.status !== 'completed');
  const completedList     = casesData.filter(c => c.status === 'complete' || c.status === 'completed');
  const completedThisMo   = completedList.filter(c => new Date(c.updated_at) >= thisMonthStart);
  const underReviewList   = casesData.filter(c => c.status === 'pending_review');
  const slaBreachList     = activeCasesList.filter(c => getDaysOld(c.created_at) > 18);

  const avgCompletionDays = completedList.length
    ? +(completedList.reduce((s, c) =>
        s + Math.max(0, Math.floor((new Date(c.updated_at) - new Date(c.created_at)) / 86400000)), 0
      ) / completedList.length).toFixed(1)
    : '--';

  const avgCaseAgeVal = activeCasesList.length
    ? +(activeCasesList.reduce((s, c) => s + getDaysOld(c.created_at), 0) / activeCasesList.length).toFixed(1)
    : 0;

  const metrics = {
    activeCases:              activeCasesList.length,
    pendingReview:            underReviewList.length,
    completedThisMonth:       completedThisMo.length,
    avgCompletionDays,
    casesWithConcerns:        0,
    overdueItems:             slaBreachList.length,
    referencesPending:        0,
    clearedForHire:           0,
    notRecommended:           0,
    interviewsToday:          0,
    slaTarget:                18,
    awaitingSupervisorSignOff: underReviewList.length,
    avgSupervisorWait:        '--',
    slaBreachCases:           slaBreachList.length,
    avgCaseAge:               avgCaseAgeVal,
  };

  // ── Real supervisor-review cases ─────────────────────────────
  const supervisorReviewCases = underReviewList.map(c => ({
    id: c.id,
    subject: `${c.first_name ?? ''} ${c.last_name ?? ''}`.trim() || 'Unknown',
    issueType: 'Pending Adjudication',
    severity: c.priority === 'critical' || c.priority === 'high' ? 'high' : 'medium',
    daysOpen: getDaysOld(c.created_at),
    nextAction: 'Supervisor adjudication',
    detail: 'Case submitted for supervisor review',
    caseNumber: fmtCaseId(c.id),
  }));

  // ── Real priority cases ───────────────────────────────────────
  const priorityCases = casesData
    .filter(c => (c.priority === 'critical' || c.priority === 'high') && c.status !== 'completed')
    .slice(0, 5)
    .map(c => ({
      id: c.id,
      subject: `${c.first_name ?? ''} ${c.last_name ?? ''}`.trim() || 'Unknown',
      position: c.position_applied || '—',
      stage: formatStatus(c.status),
      daysOpen: getDaysOld(c.created_at),
      priority: 'high',
      investigator: c.investigator_name || 'Unassigned',
      nextAction: NEXT_ACTION[c.status] || 'Review case',
      caseNumber: fmtCaseId(c.id),
    }));

  // ── Pipeline stage counts derived from status ─────────────────
  const investigationStages = [
    { stage: 'Application Review',    count: casesData.filter(c => c.status === 'submitted').length,    description: 'Initial documentation review' },
    { stage: 'Reference Interviews',  count: casesData.filter(c => c.status === 'in_progress').length,  description: 'Active investigation' },
    { stage: 'Employment Verification', count: 0,                                                        description: 'Awaiting employer response' },
    { stage: 'Background Checks',     count: 0,                                                         description: 'Criminal, financial, digital footprint' },
    { stage: 'Supervisor Review',     count: underReviewList.length,                                     description: 'Final adjudication pending' },
  ];
  const totalActive = activeCasesList.length || 1;

  const recentActivity = [
    { id: 1, type: 'complete', message: 'Investigation finalized — Elena Rodriguez cleared for hire as Background Investigator', time: '30 min ago', detail: 'Case #BI-2024-0847', user: 'Inv. Smith' },
    { id: 2, type: 'flag', message: 'Documented concern — David Kim financial background requires supervisor adjudication', time: '2 hours ago', detail: 'Case #BI-2024-0863', user: 'Inv. Wilson' },
    { id: 3, type: 'interview', message: 'Reference interview completed — Marcus Johnson, former supervisor contacted', time: '3 hours ago', detail: 'Case #BI-2024-0831', user: 'Inv. Davis' },
    { id: 4, type: 'new', message: 'New investigation initiated — Sarah Chen applying for Detention Officer position', time: '5 hours ago', detail: 'Case #BI-2024-0892', user: 'System' },
    { id: 5, type: 'update', message: 'Employment confirmation received — Robert Martinez, Metro PD confirmed 3-year tenure', time: '1 day ago', detail: 'Case #BI-2024-0844', user: 'Inv. Smith' }
  ];

  const upcomingDeadlines = [
    { id: 1, subject: 'Marcus Johnson', task: 'Supervisor adjudication decision', dueDate: 'Today', daysLeft: 0, caseNumber: 'BI-2024-0831', compliance: 'POST certification timeline', urgencyGroup: 'today' },
    { id: 2, subject: 'Lisa Martinez', task: 'Complete reference interviews (3 remaining)', dueDate: 'Tomorrow', daysLeft: 1, caseNumber: 'BI-2024-0856', compliance: 'Hiring deadline: Dec 15', urgencyGroup: 'tomorrow' },
    { id: 3, subject: 'David Chen', task: 'Financial documentation review', dueDate: 'Dec 5', daysLeft: 3, caseNumber: 'BI-2024-0819', compliance: 'SLA: 18 days max', urgencyGroup: '3day' },
    { id: 4, subject: 'Sarah Thompson', task: 'Employment confirmation follow-up', dueDate: 'Dec 8', daysLeft: 6, caseNumber: 'BI-2024-0878', compliance: 'Standard SLA', urgencyGroup: '7day' }
  ];

  return (
    <DashboardLayout
      navigation={biNavigation}
      profile={biProfile}
      notifications={biNotifications}
      settingsRoute="/bi/settings"
    >
      <div className="p-6 lg:p-8 bg-transparent dark:bg-transparent min-h-full">
        <div className="max-w-7xl mx-auto">
          {loading && (
            <div className="mb-4 flex items-center gap-2 text-xs text-slate-500">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse inline-block"></span>
              Loading live data…
            </div>
          )}
          {/* Page Header */}
          <div className="mb-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-primary mb-1">Investigations Command Overview</h2>
              <div className="flex items-center gap-2 text-[11px] text-slate-500">
                <span>{formatDate(currentTime)}</span>
                <span className="text-slate-700">·</span>
                <span>{formatTime(currentTime)} EST</span>
                <span className="text-slate-700">·</span>
                <span>Updated 2 minutes ago</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800/40 border border-slate-700/40 text-secondary rounded-lg text-[13px] font-medium hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-all">
                <Download className="w-4 h-4" />
                Export Report
              </button>
              <div className="relative filter-container">
                <button
                  onClick={() => setFilterOpen(!filterOpen)}
                  className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800/40 border border-slate-700/40 text-secondary rounded-lg text-[13px] font-medium hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-all"
                >
                  <Filter className="w-4 h-4" />
                  Filter
                  <ChevronDown className="w-3 h-3" />
                </button>
                {filterOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-surface-raised backdrop-blur-xl border border-border rounded-lg shadow-2xl z-50 py-1">
                    <button className="w-full text-left px-4 py-2 text-[13px] text-secondary hover:bg-slate-100 dark:hover:bg-slate-800/50">All Cases</button>
                    <button className="w-full text-left px-4 py-2 text-[13px] text-secondary hover:bg-slate-100 dark:hover:bg-slate-800/50">With Concerns</button>
                    <button className="w-full text-left px-4 py-2 text-[13px] text-secondary hover:bg-slate-100 dark:hover:bg-slate-800/50">Pending Review</button>
                    <button className="w-full text-left px-4 py-2 text-[13px] text-secondary hover:bg-slate-100 dark:hover:bg-slate-800/50">Overdue</button>
                  </div>
                )}
              </div>
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-4 py-2 bg-white dark:bg-slate-800/40 border border-slate-700/40 rounded-lg text-secondary text-[13px] focus:outline-none focus:border-slate-600"
              >
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="quarter">This Quarter</option>
                <option value="year">This Year</option>
              </select>
            </div>
          </div>

          {/* Adjudication Exposure Console */}
          <div className="mb-8 flex items-center gap-6 px-5 py-3.5 bg-white dark:bg-slate-800/25 border border-border dark:border-slate-700/30 rounded-xl">
            <div className="flex items-center gap-2.5">
              <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
              <span className="text-[13px] font-semibold text-secondary">Cases Awaiting Sign-Off:</span>
              <span className="text-[13px] font-bold text-primary">{metrics.awaitingSupervisorSignOff}</span>
            </div>
            <div className="h-4 w-px bg-slate-600/40"></div>
            <div className="flex items-center gap-2.5">
              <span className="text-[13px] font-semibold text-secondary">Avg Wait:</span>
              <span className="text-[13px] font-bold text-primary">{metrics.avgSupervisorWait} days</span>
            </div>
            <div className="h-4 w-px bg-slate-600/40"></div>
            <div className="flex items-center gap-2.5">
              <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
              <span className="text-[13px] font-semibold text-secondary">SLA Breach:</span>
              <span className="text-[13px] font-bold text-primary">{metrics.slaBreachCases}</span>
            </div>
            <div className="h-4 w-px bg-slate-600/40"></div>
            <div className="flex items-center gap-2.5">
              <span className="text-[13px] font-semibold text-secondary">Avg Case Age:</span>
              <span className="text-[13px] font-bold text-primary">{metrics.avgCaseAge} days</span>
            </div>
          </div>

          {/* Supervisor Review Required */}
          {supervisorReviewVisible && (
            <div className="mb-8 bg-slate-100 dark:bg-slate-800/25 border border-border border-l-[3px] border-l-red-500/40 rounded-xl p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <h4 className="text-[13px] font-semibold text-primary uppercase tracking-wide">Supervisor Review Required</h4>
                  <span className="text-xs text-slate-500">{supervisorReviewCases.length} pending</span>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => navigate(createPageUrl('CaseManagement'))}
                    className="text-[13px] text-secondary hover:text-secondary font-medium"
                  >
                    Review All Pending →
                  </button>
                  <button
                    onClick={() => setSupervisorReviewVisible(false)}
                    className="text-slate-500 hover:text-slate-600 dark:text-slate-400 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-1">
                {supervisorReviewCases.map(caseItem => (
                  <div key={caseItem.id} className={`flex items-center gap-4 px-4 py-2.5 bg-slate-100 dark:bg-slate-900/20 rounded border-l-[3px] ${
                    caseItem.severity === 'high' ? 'border-l-red-500/30' : 'border-l-amber-500/30'
                  }`}>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3">
                        <span className="text-[13px] font-semibold text-primary">{caseItem.subject}</span>
                        <span className="text-xs text-slate-500">{caseItem.caseNumber}</span>
                      </div>
                      <p className="text-xs text-secondary mt-1">{caseItem.detail}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <span className="text-xs text-slate-500">{caseItem.issueType}</span>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`w-1.5 h-1.5 rounded-full ${caseItem.severity === 'high' ? 'bg-red-500' : 'bg-amber-500'}`}></span>
                        <span className="text-xs text-slate-500">{caseItem.daysOpen} days open</span>
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      <span className="text-xs text-secondary">{caseItem.nextAction}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Investigation Status Summary */}
          <div className="mb-8 bg-white dark:bg-slate-800/25 border border-border dark:border-slate-700/30 rounded-xl shadow-sm dark:shadow-none p-5">
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-[13px] font-semibold text-primary uppercase tracking-wide">Investigation Status Summary</h4>
              <span className="text-xs text-slate-500">Last sync: 2 min ago</span>
            </div>

            <div className="mb-5">
              <div className="flex items-center gap-2 mb-2.5">
                <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                <h5 className="text-[13px] font-semibold text-secondary">REQUIRES ACTION</h5>
              </div>
              <div className="space-y-1.5 text-[13px]">
                <div className="flex items-start gap-3 pl-4">
                  <span className="text-slate-700 flex-shrink-0">•</span>
                  <p className="text-secondary"><span className="text-primary font-medium">3 overdue items</span> — Reference checks pending for Thompson, Davis, Williams</p>
                </div>
                <div className="flex items-start gap-3 pl-4">
                  <span className="text-slate-700 flex-shrink-0">•</span>
                  <p className="text-secondary"><span className="text-primary font-medium">5 cases with documented concerns</span> — Awaiting supervisor adjudication</p>
                </div>
                <div className="flex items-start gap-3 pl-4">
                  <span className="text-slate-700 flex-shrink-0">•</span>
                  <p className="text-secondary"><span className="text-primary font-medium">2 compliance deadlines</span> — POST certification expires in 48 hours</p>
                </div>
              </div>
            </div>

            <div className="mb-5">
              <div className="flex items-center gap-2 mb-2.5">
                <div className="w-1.5 h-1.5 bg-amber-500 rounded-full"></div>
                <h5 className="text-[13px] font-semibold text-secondary">IN PROGRESS</h5>
              </div>
              <div className="space-y-1.5 text-[13px]">
                <div className="flex items-start gap-3 pl-4">
                  <span className="text-slate-700 flex-shrink-0">•</span>
                  <p className="text-secondary"><span className="text-primary font-medium">{metrics.activeCases} active investigations</span> — {casesData.filter(c => c.status === 'submitted').length} initial review, {casesData.filter(c => c.status === 'in_progress').length} in progress, {underReviewList.length} supervisor review, {casesData.filter(c => c.status === 'on_hold').length} on hold</p>
                </div>
                <div className="flex items-start gap-3 pl-4">
                  <span className="text-slate-700 flex-shrink-0">•</span>
                  <p className="text-secondary"><span className="text-primary font-medium">{metrics.overdueItems} cases exceeding SLA</span> — Cases open longer than 18-day target</p>
                </div>
                <div className="flex items-start gap-3 pl-4">
                  <span className="text-slate-700 flex-shrink-0">•</span>
                  <p className="text-secondary"><span className="text-primary font-medium">{metrics.pendingReview} awaiting supervisor review</span> — Avg case age: {metrics.avgCaseAge} days</p>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2.5">
                <div className="w-1.5 h-1.5 bg-slate-500 rounded-full"></div>
                <h5 className="text-[13px] font-semibold text-secondary">COMPLETED THIS MONTH</h5>
              </div>
              <div className="space-y-1.5 text-[13px]">
                <div className="flex items-start gap-3 pl-4">
                  <span className="text-slate-700 flex-shrink-0">•</span>
                  <p className="text-secondary"><span className="text-primary font-medium">{metrics.completedThisMonth} investigations finalized this month</span> — {completedList.length} total completed</p>
                </div>
                <div className="flex items-start gap-3 pl-4">
                  <span className="text-slate-700 flex-shrink-0">•</span>
                  <p className="text-secondary"><span className="text-primary font-medium">{metrics.avgCompletionDays} day average turnaround</span> — SLA target: 18 days</p>
                </div>
                <div className="flex items-start gap-3 pl-4">
                  <span className="text-slate-700 flex-shrink-0">•</span>
                  <p className="text-secondary"><span className="text-primary font-medium">{metrics.slaBreachCases} case(s) breaching 18-day SLA</span> — POST certification and hiring timelines may be affected</p>
                </div>
              </div>
            </div>
          </div>

          {/* Compliance Risk Indicator */}
          {metrics.slaBreachCases > 0 && (
            <div className="mb-8 bg-slate-100 dark:bg-slate-800/25 border border-border border-l-[3px] border-l-amber-500/30 rounded-xl px-5 py-3">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 bg-amber-500 rounded-full flex-shrink-0"></div>
                <div>
                  <p className="text-[13px] text-primary"><span className="text-secondary">Compliance Notice:</span> {metrics.slaBreachCases} case(s) have exceeded the 18-day SLA target.</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">POST certification and hiring timelines may be affected.</p>
                </div>
              </div>
            </div>
          )}

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            <button
              onClick={() => navigate(createPageUrl('ActiveCases'))}
              className="bg-white dark:bg-slate-800/25 border border-border dark:border-slate-700/30 rounded-xl shadow-sm dark:shadow-none p-5 hover:border-slate-600/40 transition-all text-left group"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-slate-500 rounded-full"></div>
                  <span className="text-xs text-slate-500 uppercase tracking-wide font-medium">Active Investigations</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-700 group-hover:text-slate-600 dark:text-slate-400 transition-all" />
              </div>
              <p className="text-2xl font-semibold text-primary mb-3">{metrics.activeCases}</p>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Initial Review</span>
                  <span className="text-secondary">12</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Reference Checks</span>
                  <span className="text-secondary">15</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Pending Review</span>
                  <span className="text-secondary">{metrics.pendingReview}</span>
                </div>
              </div>
            </button>

            <button
              onClick={() => navigate(createPageUrl('CriminalHistoryReview'))}
              className="bg-white dark:bg-slate-800/25 border border-border dark:border-slate-700/30 rounded-xl shadow-sm dark:shadow-none p-5 hover:border-slate-600/40 transition-all text-left group"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                  <span className="text-xs text-slate-500 uppercase tracking-wide font-medium">Documented Concerns</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-700 group-hover:text-slate-600 dark:text-slate-400 transition-all" />
              </div>
              <p className="text-2xl font-semibold text-primary mb-3">{metrics.casesWithConcerns}</p>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Criminal History</span>
                  <span className="text-secondary">3</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Financial Issues</span>
                  <span className="text-secondary">3</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Employment Gaps</span>
                  <span className="text-secondary">2</span>
                </div>
              </div>
            </button>

            <button
              onClick={() => navigate(createPageUrl('CaseClosure'))}
              className="bg-white dark:bg-slate-800/25 border border-border dark:border-slate-700/30 rounded-xl shadow-sm dark:shadow-none p-5 hover:border-slate-600/40 transition-all text-left group"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-slate-500 rounded-full"></div>
                  <span className="text-xs text-slate-500 uppercase tracking-wide font-medium">Completed This Month</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-700 group-hover:text-slate-600 dark:text-slate-400 transition-all" />
              </div>
              <p className="text-2xl font-semibold text-primary mb-3">{metrics.completedThisMonth}</p>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Cleared for Hire</span>
                  <span className="text-secondary">{metrics.clearedForHire}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Not Recommended</span>
                  <span className="text-secondary">{metrics.notRecommended}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Monthly Target</span>
                  <span className="text-secondary">35</span>
                </div>
              </div>
            </button>

            <button
              onClick={() => navigate(createPageUrl('BIReports'))}
              className="bg-white dark:bg-slate-800/25 border border-border dark:border-slate-700/30 rounded-xl shadow-sm dark:shadow-none p-5 hover:border-slate-600/40 transition-all text-left group"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-slate-500 rounded-full"></div>
                  <span className="text-xs text-slate-500 uppercase tracking-wide font-medium">Avg Turnaround</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-700 group-hover:text-slate-600 dark:text-slate-400 transition-all" />
              </div>
              <p className="text-2xl font-semibold text-primary mb-3">{metrics.avgCompletionDays}<span className="text-base text-slate-500 ml-1">days</span></p>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">SLA Target</span>
                  <span className="text-secondary">{metrics.slaTarget} days</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Ahead of Target</span>
                  <span className="text-secondary">3.5 days</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Fastest This Month</span>
                  <span className="text-secondary">8 days</span>
                </div>
              </div>
            </button>
          </div>

          {/* Secondary Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            <div className="bg-white dark:bg-slate-800/25 border border-border dark:border-slate-700/30 rounded-xl shadow-sm dark:shadow-none p-5">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1.5 h-1.5 bg-slate-500 rounded-full"></div>
                <span className="text-xs text-slate-500 uppercase tracking-wide font-medium">Today</span>
              </div>
              <p className="text-xl font-semibold text-primary mb-1">{metrics.interviewsToday}</p>
              <p className="text-xs text-secondary">Reference Interviews Scheduled</p>
              <p className="text-xs text-slate-500 mt-2">Next: 10:30 AM — Thompson ref #2</p>
            </div>

            <div className="bg-white dark:bg-slate-800/25 border border-border dark:border-slate-700/30 rounded-xl shadow-sm dark:shadow-none p-5">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1.5 h-1.5 bg-amber-500 rounded-full"></div>
                <span className="text-xs text-slate-500 uppercase tracking-wide font-medium">Pending</span>
              </div>
              <p className="text-xl font-semibold text-primary mb-1">{metrics.referencesPending}</p>
              <p className="text-xs text-secondary">References Awaiting Contact</p>
              <p className="text-xs text-slate-500 mt-2">Avg response time: 2.3 days</p>
            </div>

            <div className="bg-white dark:bg-slate-800/25 border border-border dark:border-slate-700/30 rounded-xl shadow-sm dark:shadow-none p-5">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                <span className="text-xs text-slate-500 uppercase tracking-wide font-medium">Overdue</span>
              </div>
              <p className="text-xl font-semibold text-primary mb-1">{metrics.overdueItems}</p>
              <p className="text-xs text-secondary">Overdue Items</p>
              <p className="text-xs text-slate-500 mt-2">Oldest: 4 days — Johnson refs</p>
            </div>

            <div className="bg-white dark:bg-slate-800/25 border border-border dark:border-slate-700/30 rounded-xl shadow-sm dark:shadow-none p-5">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1.5 h-1.5 bg-slate-500 rounded-full"></div>
                <span className="text-xs text-slate-500 uppercase tracking-wide font-medium">Queue</span>
              </div>
              <p className="text-xl font-semibold text-primary mb-1">{metrics.pendingReview}</p>
              <p className="text-xs text-secondary">Awaiting Supervisor Review</p>
              <p className="text-xs text-slate-500 mt-2">Avg wait: 1.2 days</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-8">
            {/* Investigation Pipeline */}
            <div className="bg-white dark:bg-slate-800/25 border border-border dark:border-slate-700/30 rounded-xl shadow-sm dark:shadow-none p-5">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="text-[13px] font-semibold text-primary uppercase tracking-wide">Investigation Pipeline</h3>
                  <p className="text-xs text-slate-500 mt-1">{metrics.activeCases} total active — SLA Breach: {metrics.slaBreachCases} case(s) — Avg Case Age: {metrics.avgCaseAge} days</p>
                </div>
                <button
                  onClick={() => navigate(createPageUrl('CaseManagement'))}
                  className="text-[13px] text-secondary hover:text-secondary"
                >
                  View All →
                </button>
              </div>
              <div className="space-y-3.5">
                {investigationStages.map((stage, idx) => {
                  const isBreaching = stage.stage === 'Supervisor Review';
                  return (
                    <div key={idx}>
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[13px] text-secondary">{stage.stage}</span>
                          <span className="text-xs text-slate-700">— {stage.description}</span>
                        </div>
                        <span className="text-[13px] font-semibold text-secondary">{stage.count}</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-700/30 rounded-full overflow-hidden relative">
                        <div
                          className={`h-full rounded-full transition-all ${isBreaching ? 'bg-red-500/40' : 'bg-slate-500/40'}`}
                          style={{ width: `${(stage.count / totalActive) * 100}%` }}
                        />
                        {isBreaching && (
                          <div className="absolute top-0 bottom-0 w-px bg-red-500/40" style={{ left: '21%' }}></div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-4 pt-3 border-t border-border dark:border-slate-700/20 grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-slate-500">Avg Pipeline Time:</span>
                  <span className="text-secondary ml-2 font-medium">14.5 days</span>
                </div>
                <div>
                  <span className="text-slate-500">SLA Target:</span>
                  <span className="text-secondary ml-2 font-medium">{metrics.slaTarget} days</span>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white dark:bg-slate-800/25 border border-border dark:border-slate-700/30 rounded-xl shadow-sm dark:shadow-none p-5">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-[13px] font-semibold text-primary uppercase tracking-wide">Recent Activity</h3>
                <span className="text-xs text-slate-500">Last 24 hours</span>
              </div>
              <div className="space-y-1">
                {recentActivity.map(activity => {
                  const statusDot = activity.type === 'flag' ? 'bg-red-500' :
                    activity.type === 'complete' ? 'bg-emerald-500' : 'bg-slate-600';
                  return (
                    <div key={activity.id} className="flex items-start gap-3 px-4 py-2.5 bg-slate-100 dark:bg-slate-900/20 rounded hover:bg-slate-100 dark:hover:bg-slate-800/30 transition-all cursor-pointer">
                      <div className={`w-1.5 h-1.5 rounded-full mt-[7px] flex-shrink-0 ${statusDot}`}></div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[13px] text-secondary leading-snug">{activity.message}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[11px] text-slate-500 font-medium">{activity.user}</span>
                          <span className="text-slate-700 text-[11px]">|</span>
                          <span className="text-[11px] text-slate-500">{activity.time}</span>
                          <span className="text-slate-700 text-[11px]">|</span>
                          <span className="text-[11px] text-slate-500">{activity.detail}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Priority Cases */}
          <div className="bg-white dark:bg-slate-800/25 border border-border dark:border-slate-700/30 rounded-xl shadow-sm dark:shadow-none p-5 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-[13px] font-semibold text-primary uppercase tracking-wide">Priority Cases Requiring Action</h3>
              <button
                onClick={() => navigate(createPageUrl('ActiveCases'))}
                className="text-[13px] text-secondary hover:text-secondary font-medium"
              >
                View All →
              </button>
            </div>
            <div className="space-y-1">
              {priorityCases.map(caseItem => (
                <div key={caseItem.id} className="flex items-center gap-4 px-4 py-3 bg-slate-100 dark:bg-slate-900/20 rounded hover:bg-slate-100 dark:hover:bg-slate-800/30 transition-all cursor-pointer">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-4">
                      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                        caseItem.priority === 'high' ? 'bg-red-500' :
                        caseItem.priority === 'medium' ? 'bg-amber-500' : 'bg-slate-600'
                      }`}></span>
                      <span className="text-[13px] font-semibold text-primary">{caseItem.subject}</span>
                      <span className="text-[11px] text-slate-700">{caseItem.caseNumber}</span>
                    </div>
                    <span className="text-[11px] text-slate-500 ml-[22px]">{caseItem.position}</span>
                  </div>
                  <div className="flex-shrink-0 text-center w-48">
                    <span className="text-[13px] text-secondary">{caseItem.stage}</span>
                    <div className="text-[11px] text-slate-500">{caseItem.daysOpen} days open</div>
                  </div>
                  <div className="flex-shrink-0 text-right w-56">
                    <span className="text-[13px] font-medium text-slate-700 dark:text-slate-200">{caseItem.nextAction}</span>
                    <div className="text-[11px] text-slate-500">{caseItem.investigator}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Deadlines */}
          <div className="bg-white dark:bg-slate-800/25 border border-border dark:border-slate-700/30 rounded-xl shadow-sm dark:shadow-none p-5 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-[13px] font-semibold text-primary uppercase tracking-wide">Upcoming Deadlines</h3>
              <span className="text-xs text-slate-500">Compliance and SLA-driven milestones</span>
            </div>

            {['today', 'tomorrow', '3day', '7day'].map(group => {
              const items = upcomingDeadlines.filter(d => d.urgencyGroup === group);
              if (items.length === 0) return null;

              const groupConfig = {
                today: { label: 'Today', dot: 'bg-red-500', border: 'border-l-red-500/30' },
                tomorrow: { label: 'Tomorrow', dot: 'bg-amber-500', border: 'border-l-amber-500/30' },
                '3day': { label: 'Within 3 Days', dot: 'bg-slate-500', border: 'border-l-slate-600/30' },
                '7day': { label: 'Within 7 Days', dot: 'bg-slate-600', border: 'border-l-slate-700/30' }
              }[group];

              return (
                <div key={group} className="mb-4 last:mb-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className={`w-1.5 h-1.5 ${groupConfig.dot} rounded-full`}></div>
                    <span className="text-[13px] font-semibold text-secondary uppercase tracking-wide">{groupConfig.label}</span>
                  </div>
                  {items.map(deadline => (
                    <div key={deadline.id} className={`flex items-center gap-4 px-4 py-2.5 bg-slate-100 dark:bg-slate-900/20 rounded border-l-[3px] ${groupConfig.border} ml-3`}>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3">
                          <span className="text-[13px] font-medium text-primary">{deadline.subject}</span>
                          <span className="text-[11px] text-slate-700">{deadline.caseNumber}</span>
                        </div>
                        <p className="text-[11px] text-secondary mt-0.5">{deadline.task}</p>
                      </div>
                      <div className="flex-shrink-0 text-right">
                        <span className="text-[13px] font-medium text-secondary">{deadline.dueDate}</span>
                        <p className="text-[11px] text-slate-500">{deadline.compliance}</p>
                      </div>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>

          {/* Audit Log Footer */}
          <div className="mb-4 px-5 py-3 bg-slate-50 dark:bg-slate-800/10 border border-border rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shield className="w-3.5 h-3.5 text-slate-700" />
                <span className="text-xs text-slate-700">All adjudication decisions logged with timestamp and user ID. Audit trail maintained per GCSO Policy 4.12.</span>
              </div>
              <button
                onClick={() => navigate(createPageUrl('InvestigationTimeline'))}
                className="text-xs text-slate-500 hover:text-slate-600 dark:text-slate-400"
              >
                View Audit Log
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Help Button */}
      <button
        onClick={() => setChatOpen(!chatOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-slate-600 dark:bg-slate-700 hover:bg-slate-500 dark:hover:bg-slate-600 rounded-full shadow-lg flex items-center justify-center transition-all z-40"
      >
        {chatOpen ? <X className="w-6 h-6 text-primary" /> : <MessageCircle className="w-6 h-6 text-secondary" />}
      </button>

      {chatOpen && (
        <div className="fixed bottom-24 right-6 w-full max-w-96 bg-surface-raised backdrop-blur-xl border border-border rounded-xl shadow-2xl flex flex-col z-40 mx-4 sm:mx-0">
          <div className="p-4 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-slate-200 dark:bg-slate-700 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <h3 className="text-[13px] font-semibold text-primary">BI Support & Resources</h3>
                <p className="text-xs text-slate-500">Quick links and assistance</p>
              </div>
            </div>
          </div>
          <div className="p-4 space-y-2">
            <button className="w-full flex items-center gap-3 p-3 bg-slate-100/80 dark:bg-slate-800/30 hover:bg-slate-100 dark:hover:bg-slate-800/50 rounded-lg transition-all text-left">
              <FileText className="w-5 h-5 text-secondary" />
              <div>
                <p className="text-[13px] text-primary font-medium">Investigation Guidelines</p>
                <p className="text-xs text-slate-500">POST standards & procedures</p>
              </div>
            </button>
            <button className="w-full flex items-center gap-3 p-3 bg-slate-100/80 dark:bg-slate-800/30 hover:bg-slate-100 dark:hover:bg-slate-800/50 rounded-lg transition-all text-left">
              <ClipboardCheck className="w-5 h-5 text-secondary" />
              <div>
                <p className="text-[13px] text-primary font-medium">Adjudication Checklist</p>
                <p className="text-xs text-slate-500">Review requirements</p>
              </div>
            </button>
            <button className="w-full flex items-center gap-3 p-3 bg-slate-100/80 dark:bg-slate-800/30 hover:bg-slate-100 dark:hover:bg-slate-800/50 rounded-lg transition-all text-left">
              <Phone className="w-5 h-5 text-secondary" />
              <div>
                <p className="text-[13px] text-primary font-medium">Contact IT Support</p>
                <p className="text-xs text-slate-500">Technical assistance</p>
              </div>
            </button>
            <button className="w-full flex items-center gap-3 p-3 bg-slate-100/80 dark:bg-slate-800/30 hover:bg-slate-100 dark:hover:bg-slate-800/50 rounded-lg transition-all text-left">
              <Scale className="w-5 h-5 text-secondary" />
              <div>
                <p className="text-[13px] text-primary font-medium">Legal Reference</p>
                <p className="text-xs text-slate-500">Compliance documentation</p>
              </div>
            </button>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

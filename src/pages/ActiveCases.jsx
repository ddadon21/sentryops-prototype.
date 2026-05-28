import React, { useState, useEffect } from 'react';
import { LayoutDashboard, FolderOpen, FileText, Clock, UserCheck, Calendar, FileCheck, CheckCircle, TrendingUp, AlertTriangle, DollarSign, Eye, Activity, XCircle, Settings, Bell, MessageCircle, Search, ChevronRight, Shield, X, Menu, ChevronLeft, LogOut, Download, RefreshCw, Users, Building2, Phone, CreditCard, Briefcase, Scale, ClipboardCheck, Printer, ChevronDown, Filter, CircleDot, Hourglass, AlertCircle, FileWarning, CheckCircle2, Circle, PauseCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import DashboardLayout from '../layouts/DashboardLayout';
import { biNavigation, biProfile, biNotifications } from '../config/biConfig';
import { api, API_BASE_URL } from '../api';

// ── Helpers ────────────────────────────────────────────────────

const STATUS_MAP = {
  submitted:         'Initial Review',
  initial_review:    'Initial Review',
  in_progress:       'In Progress',
  pending_review:    'Pending Review',
  pending_signature: 'Pending Signature',
  complete:          'Complete',
  completed:         'Complete',
};

// Converts any DB enum value to a human-readable label.
// Falls back to capitalising words if the key isn't in STATUS_MAP.
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

const deriveStages = (status) => {
  const names = ['Initial Review', 'Criminal History', 'Reference Checks', 'Employment Verification', 'Financial Review', 'Supervisor Review'];
  return names.map((name, i) => {
    if (status === 'complete' || status === 'pending_signature')
      return { name, status: 'completed', detail: 'Completed' };
    if (status === 'submitted')
      return i === 0
        ? { name, status: 'in_progress', detail: 'Under review' }
        : { name, status: 'pending', detail: 'Not started' };
    if (status === 'in_progress') {
      if (i === 0) return { name, status: 'completed', detail: 'Completed' };
      if (i === 1) return { name, status: 'in_progress', detail: 'In progress' };
      return { name, status: 'pending', detail: 'Not started' };
    }
    if (status === 'pending_review')
      return i < 5
        ? { name, status: 'completed', detail: 'Completed' }
        : { name, status: 'in_progress', detail: 'Pending supervisor decision' };
    return { name, status: 'pending', detail: 'Not started' };
  });
};

const relativeTime = (dateStr) => {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 2) return 'Just now';
  if (mins < 60) return `${mins} min ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} hour${hrs > 1 ? 's' : ''} ago`;
  const days = Math.floor(hrs / 24);
  return `${days} day${days > 1 ? 's' : ''} ago`;
};

const transformCase = (c) => {
  const daysOpen = Math.max(0, Math.floor((Date.now() - new Date(c.created_at)) / 86400000));
  const priorityMap = { critical: 'high', high: 'high', medium: 'standard', low: 'standard' };
  const uiPriority = c.status === 'on_hold' ? 'on_hold' : (priorityMap[c.priority] || 'standard');
  const investigator = c.investigator_name || 'Unassigned';
  return {
    rawId: c.id,
    id: `BI-${String(c.id).padStart(7, '0')}`,
    subject: `${c.first_name ?? ''} ${c.last_name ?? ''}`.trim() || 'Unknown',
    position: c.position_applied || '—',
    applicationDate: c.application_date
      ? new Date(c.application_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      : new Date(c.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    daysOpen,
    status: formatStatus(c.status),
    priority: uiPriority,
    priorityReason: uiPriority === 'high' ? `Priority level: ${c.priority}` : null,
    investigator,
    lastUpdate: relativeTime(c.updated_at),
    lastActivity: `Status updated to: ${formatStatus(c.status)}`,
    stages: deriveStages(c.status),
    nextAction: NEXT_ACTION[c.status] || 'Review case details',
  };
};

export default function ActiveCases() {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState('active-cases');
  const [chatOpen, setChatOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [logoutConfirmOpen, setLogoutConfirmOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [filterInvestigator, setFilterInvestigator] = useState('all');
  const [filterPosition, setFilterPosition] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [caseloadSummaryVisible, setCaseloadSummaryVisible] = useState(true);
  const [expandedCase, setExpandedCase] = useState(null);
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [exportingId, setExportingId] = useState(null);

  useEffect(() => {
    api.get('/cases')
      .then(data => setCases((Array.isArray(data) ? data : (data?.cases ?? [])).map(transformCase)))
      .catch(() => setCases([]))
      .finally(() => setLoading(false));
  }, []);

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const handleExportPDF = async (rawId, caseId) => {
    setExportingId(rawId);
    try {
      const token = localStorage.getItem('sentryops_token');
      const res = await fetch(`${API_BASE_URL}/cases/${rawId}/export`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Export failed');
      const blob = await res.blob();
      const url  = URL.createObjectURL(blob);
      const a    = document.createElement('a');
      a.href     = url;
      a.download = `SentryOps-${caseId}-${new Date().toISOString().slice(0, 10)}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      alert('Failed to generate PDF report. Please try again.');
    } finally {
      setExportingId(null);
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const navigation = [
    { id: 'bi-dashboard', label: 'BI Dashboard', icon: LayoutDashboard, page: 'BackgroundsDashboard' },
    { id: 'active-cases', label: 'Active Cases', icon: FolderOpen },
    { id: 'case-management', label: 'Case Management', icon: FileText, page: 'CaseManagement' },
    { id: 'investigation-timeline', label: 'Investigation Timeline', icon: Clock, page: 'InvestigationTimeline' },
    { id: 'subject-records', label: 'Subject Records', icon: UserCheck, page: 'SubjectRecords' },
    { id: 'interview-scheduling', label: 'Interview Scheduling', icon: Calendar, page: 'InterviewScheduling' },
    { id: 'evidence-tracking', label: 'Evidence Tracking', icon: FileCheck, page: 'EvidenceTracking' },
    { id: 'reference-checks', label: 'Reference Checks', icon: CheckCircle, page: 'ReferenceChecks' },
    { id: 'employment-verification', label: 'Employment Verification', icon: TrendingUp, page: 'EmploymentVerification' },
    { id: 'criminal-history', label: 'Criminal History Review', icon: AlertTriangle, page: 'CriminalHistoryReview' },
    { id: 'financial-background', label: 'Financial Background', icon: DollarSign, page: 'FinancialBackground' },
    { id: 'social-media', label: 'Social Media Analysis', icon: Eye, page: 'SocialMediaAnalysis' },
    { id: 'bi-reports', label: 'BI Reports', icon: Activity, page: 'BIReports' },
    { id: 'case-closure', label: 'Case Closure', icon: XCircle, page: 'CaseClosure' }
  ];

  // Investigator workload derived from live cases
  const investigatorWorkload = Object.entries(
    cases.reduce((acc, c) => {
      const name = c.investigator === 'Unassigned' ? 'Unassigned' : `Agent ${c.investigator}`;
      acc[name] = (acc[name] || 0) + 1;
      return acc;
    }, {})
  ).map(([name, count]) => ({ name, cases: count }));

  const notifications = [
    { id: 1, title: '3 Cases Awaiting Review', message: 'Final approval needed', time: '10 min ago', urgent: true },
    { id: 2, title: 'Interview Scheduled', message: 'Subject: Martinez - Tomorrow 2PM', time: '1 hour ago', urgent: false }
  ];

  const filteredCases = cases.filter(c => {
    const matchesStatus = filterStatus === 'all' || c.status.toLowerCase().includes(filterStatus.toLowerCase());
    const matchesPriority = filterPriority === 'all' || c.priority === filterPriority;
    const matchesInvestigator = filterInvestigator === 'all' || c.investigator === filterInvestigator;
    const matchesPosition = filterPosition === 'all' || c.position === filterPosition;
    const matchesSearch = c.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         c.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         c.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         c.investigator.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesPriority && matchesInvestigator && matchesPosition && matchesSearch;
  });

  // Calculate summary stats
  const summaryStats = {
    totalActive: cases.length,
    requireingSupervisor: cases.filter(c => c.status.includes('Supervisor')).length,
    onHold: cases.filter(c => c.priority === 'on_hold').length,
    standardProcessing: cases.filter(c => c.priority === 'standard' && !c.status.includes('Supervisor')).length,
    avgDaysInProcess: Math.round(cases.reduce((sum, c) => sum + c.daysOpen, 0) / cases.length * 10) / 10,
    longestCase: Math.max(...cases.map(c => c.daysOpen)),
    shortestCase: Math.min(...cases.map(c => c.daysOpen))
  };

  const getStageIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle2 className="w-4 h-4 text-green-400" />;
      case 'in_progress': return <Clock className="w-4 h-4 text-amber-700 animate-pulse" />;
      case 'partial': return <PauseCircle className="w-4 h-4 text-blue-400" />;
      case 'blocked': return <AlertCircle className="w-4 h-4 text-red-400" />;
      case 'not_required': return <Circle className="w-4 h-4 text-slate-500" />;
      default: return <Circle className="w-4 h-4 text-slate-700" />;
    }
  };

  const getPriorityDisplay = (priority) => {
    switch (priority) {
      case 'high': return { label: 'HIGH PRIORITY', color: 'bg-red-500/20 text-red-400 border-red-500/30' };
      case 'on_hold': return { label: 'ON HOLD', color: 'bg-slate-500/20 text-secondary border-slate-500/30' };
      default: return { label: 'STANDARD', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30' };
    }
  };

  const handleNavigation = (item) => {
    if (item.page) {
      navigate(createPageUrl(item.page));
    } else {
      setActivePage(item.id);
      setSidebarOpen(false);
    }
  };

  const handleLogout = () => {
    navigate(createPageUrl('SignIn'));
  };

  return (
    <DashboardLayout
      navigation={biNavigation}
      profile={biProfile}
      notifications={biNotifications}
      settingsRoute="/bi/settings"
    >
      <div className="p-5 lg:p-8 space-y-8 min-h-full">
          <div className="max-w-7xl mx-auto">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-2xl lg:text-3xl font-bold text-primary">Active Cases</h2>
                <span className="px-3 py-1 bg-green-500/20 border border-green-500/30 text-green-400 text-xs font-bold rounded-full flex items-center gap-1.5">
                  <CircleDot className="w-3 h-3" />
                  LIVE
                </span>
              </div>
              <div className="flex items-center gap-3 text-secondary flex-wrap">
                <span className="text-sm">Background investigations currently assigned and in progress</span>
                <span className="text-slate-700">•</span>
                <span className="text-sm">Updated: {formatTime(currentTime)} EST</span>
                <span className="text-slate-700">•</span>
                <span className="text-sm">{formatDate(currentTime)}</span>
              </div>
              <p className="text-sm text-slate-500 mt-2">Showing {filteredCases.length} of {cases.length} active cases</p>
            </div>

            {/* Caseload Summary */}
            {caseloadSummaryVisible && (
              <div className="mb-6 bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/20 rounded-xl p-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <ClipboardCheck className="w-6 h-6 text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-6">
                      <h4 className="text-base font-semibold text-primary">CASELOAD SUMMARY</h4>
                      <button
                        onClick={() => setCaseloadSummaryVisible(false)}
                        className="text-secondary hover:text-primary transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      {/* Total Active Cases */}
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <FolderOpen className="w-4 h-4 text-blue-400" />
                          <span className="text-sm font-semibold text-blue-400">Total Active Cases: {summaryStats.totalActive}</span>
                        </div>
                        <div className="space-y-1.5 text-sm">
                          <div className="flex items-center justify-between">
                            <span className="text-secondary">Assigned to investigators</span>
                            <span className="text-secondary">{summaryStats.totalActive} cases</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-secondary">Requiring supervisor action</span>
                            <span className="text-amber-700">{summaryStats.requireingSupervisor} cases</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-secondary">On hold (external response)</span>
                            <span className="text-secondary">{summaryStats.onHold} cases</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-secondary">Standard processing</span>
                            <span className="text-green-400">{summaryStats.standardProcessing} cases</span>
                          </div>
                        </div>
                      </div>

                      {/* Average Days */}
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <Clock className="w-4 h-4 text-amber-700" />
                          <span className="text-sm font-semibold text-amber-700">Average Days in Process: {summaryStats.avgDaysInProcess}</span>
                        </div>
                        <div className="space-y-1.5 text-sm">
                          <div className="flex items-center justify-between">
                            <span className="text-secondary">Agency target</span>
                            <span className="text-secondary">&lt;18 days</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-secondary">Longest case</span>
                            <span className="text-red-400">{summaryStats.longestCase} days (on hold)</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-secondary">Shortest case</span>
                            <span className="text-green-400">{summaryStats.shortestCase} days (new)</span>
                          </div>
                        </div>
                      </div>

                      {/* Investigator Workload */}
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <Users className="w-4 h-4 text-purple-400" />
                          <span className="text-sm font-semibold text-purple-400">Investigator Workload</span>
                        </div>
                        <div className="space-y-1.5 text-sm">
                          {investigatorWorkload.map((inv, idx) => (
                            <div key={idx} className="flex items-center justify-between">
                              <span className="text-secondary">{inv.name}</span>
                              <span className="text-secondary">{inv.cases} cases</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-blue-500/20 flex items-center gap-3">
                      <button className="px-4 py-2 bg-blue-500/20 border border-blue-500/30 text-blue-400 rounded-xl text-sm font-medium hover:bg-blue-500/30 transition-all">
                        View Pipeline Status
                      </button>
                      <button className="px-4 py-2 bg-red-500/20 border border-red-500/30 text-red-400 rounded-xl text-sm font-medium hover:bg-red-500/30 transition-all">
                        View Overdue Items
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Search and Filters */}
            <div className="mb-6 bg-white dark:bg-slate-800/40 border border-border rounded-xl shadow-sm dark:shadow-none p-4 lg:p-6">
              <div className="flex items-center gap-2 mb-4">
                <Filter className="w-5 h-5 text-secondary" />
                <h3 className="text-sm font-semibold text-primary uppercase">Search Active Cases</h3>
                <span className="text-xs text-slate-500 ml-2">Search by: Applicant name, case ID, position, or investigator</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
                <div className="lg:col-span-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search cases..."
                      className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-900/40 border border-border rounded-xl text-primary placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-amber-500/50"
                    />
                  </div>
                </div>
                <div>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="w-full px-4 py-2.5 bg-white dark:bg-slate-900/40 border border-border rounded-xl text-primary focus:outline-none focus:border-amber-500/50 text-sm"
                  >
                    <option value="all">All Status</option>
                    <option value="initial">Initial Review</option>
                    <option value="criminal">Criminal History Review</option>
                    <option value="reference">Reference Checks</option>
                    <option value="employment">Employment Verification</option>
                    <option value="financial">Financial Review</option>
                    <option value="supervisor">Supervisor Review</option>
                    <option value="on hold">On Hold</option>
                  </select>
                </div>
                <div>
                  <select
                    value={filterPriority}
                    onChange={(e) => setFilterPriority(e.target.value)}
                    className="w-full px-4 py-2.5 bg-white dark:bg-slate-900/40 border border-border rounded-xl text-primary focus:outline-none focus:border-amber-500/50 text-sm"
                  >
                    <option value="all">All Priority</option>
                    <option value="high">High (deadline within 14 days)</option>
                    <option value="standard">Standard (no urgent deadline)</option>
                    <option value="on_hold">On Hold</option>
                  </select>
                </div>
                <div>
                  <select
                    value={filterInvestigator}
                    onChange={(e) => setFilterInvestigator(e.target.value)}
                    className="w-full px-4 py-2.5 bg-white dark:bg-slate-900/40 border border-border rounded-xl text-primary focus:outline-none focus:border-amber-500/50 text-sm"
                  >
                    <option value="all">All Investigators</option>
                    <option value="Brooks">Agent Brooks</option>
                    <option value="Davis">Agent Davis</option>
                    <option value="Thompson">Agent Thompson</option>
                    <option value="Wilson">Agent Wilson</option>
                  </select>
                </div>
                <div>
                  <select
                    value={filterPosition}
                    onChange={(e) => setFilterPosition(e.target.value)}
                    className="w-full px-4 py-2.5 bg-white dark:bg-slate-900/40 border border-border rounded-xl text-primary focus:outline-none focus:border-amber-500/50 text-sm"
                  >
                    <option value="all">All Positions</option>
                    <option value="Deputy Sheriff">Deputy Sheriff</option>
                    <option value="Detention Officer">Detention Officer</option>
                    <option value="Background Investigator">Background Investigator</option>
                    <option value="Court Security">Court Security</option>
                  </select>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-border dark:border-slate-700/30 flex items-center justify-between flex-wrap gap-3">
                <p className="text-sm text-secondary">Showing: <span className="text-primary font-medium">{filteredCases.length} of {cases.length}</span> cases</p>
                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-2 px-4 py-2 bg-slate-50 dark:bg-slate-700/40 border border-slate-600/50 text-secondary rounded-xl text-sm font-medium hover:bg-slate-700/60 transition-all">
                    <Download className="w-4 h-4" />
                    Export to Excel
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-slate-50 dark:bg-slate-700/40 border border-slate-600/50 text-secondary rounded-xl text-sm font-medium hover:bg-slate-700/60 transition-all">
                    <Printer className="w-4 h-4" />
                    Print Case List
                  </button>
                  <div className="relative">
                    <button className="flex items-center gap-2 px-4 py-2 bg-amber-500/20 border border-amber-500/30 text-amber-700 rounded-xl text-sm font-medium hover:bg-amber-500/30 transition-all">
                      Bulk Actions
                      <ChevronDown className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Cases List */}
            {loading && (
              <div className="flex items-center justify-center py-16 text-slate-500 text-sm gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse inline-block"></span>
                Loading cases…
              </div>
            )}
            {!loading && cases.length === 0 && (
              <div className="flex flex-col items-center justify-center py-16 text-slate-500 text-sm gap-2">
                <FolderOpen className="w-10 h-10 text-slate-600 mb-2" />
                <p className="font-medium text-primary">No active cases</p>
                <p>Cases will appear here once investigations are opened in the backend.</p>
              </div>
            )}
            <div className="space-y-6">
              {filteredCases.map((case_item) => {
                const priorityDisplay = getPriorityDisplay(case_item.priority);
                const isExpanded = expandedCase === case_item.id;

                return (
                  <div
                    key={case_item.id}
                    className={`bg-white dark:bg-slate-800/40 border rounded-xl overflow-hidden transition-all ${
                      case_item.priority === 'high' ? 'border-red-500/30' :
                      case_item.priority === 'on_hold' ? 'border-slate-600/50' : 'border-slate-700/50'
                    } hover:border-amber-500/30`}
                  >
                    {/* Case Header */}
                    <div className="p-5">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <h3 className="text-lg font-semibold text-primary">{case_item.subject}</h3>
                          <span className={`px-2.5 py-1 rounded text-xs font-bold border ${priorityDisplay.color}`}>
                            {priorityDisplay.label}
                          </span>
                        </div>
                        <span className="text-sm text-slate-500">Case ID: {case_item.id}</span>
                      </div>

                      {/* Case Info Grid */}
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                        <div>
                          <p className="text-xs text-slate-500 mb-1">Position</p>
                          <p className="text-sm text-secondary">{case_item.position}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500 mb-1">Application Date</p>
                          <p className="text-sm text-secondary">{case_item.applicationDate}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500 mb-1">Days in Process</p>
                          <p className={`text-sm font-medium ${case_item.daysOpen > 18 ? 'text-amber-700' : 'text-green-400'}`}>
                            {case_item.daysOpen} days
                            <span className="text-slate-500 font-normal"> (target: &lt;18)</span>
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500 mb-1">Assigned Investigator</p>
                          <p className="text-sm text-secondary">Agent {case_item.investigator}</p>
                        </div>
                      </div>

                      {/* Priority Reason */}
                      {case_item.priorityReason && (
                        <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                          <div className="flex items-center gap-2">
                            <AlertCircle className="w-4 h-4 text-red-400" />
                            <span className="text-xs font-semibold text-red-400 uppercase">Priority Reason</span>
                          </div>
                          <p className="text-sm text-secondary mt-1">{case_item.priorityReason}</p>
                        </div>
                      )}

                      {/* Current Status */}
                      <div className="mb-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Clock className="w-4 h-4 text-amber-700" />
                          <span className="text-sm font-semibold text-primary">CURRENT STATUS:</span>
                          <span className="text-sm text-amber-700 font-medium">{case_item.status}</span>
                        </div>
                        <p className="text-xs text-secondary">Last Activity: {case_item.lastActivity} — {case_item.lastUpdate}</p>
                      </div>

                      {/* Investigation Stages */}
                      <div className="mb-4">
                        <p className="text-xs font-semibold text-secondary uppercase mb-3">Investigation Stages</p>
                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
                          {case_item.stages.map((stage, idx) => (
                            <div
                              key={idx}
                              className={`p-2.5 rounded-lg border ${
                                stage.status === 'completed' ? 'bg-green-500/10 border-green-500/20' :
                                stage.status === 'in_progress' ? 'bg-amber-500/10 border-amber-500/20' :
                                stage.status === 'partial' ? 'bg-blue-500/10 border-blue-500/20' :
                                stage.status === 'blocked' ? 'bg-red-500/10 border-red-500/20' :
                                'bg-white dark:bg-slate-800/50 border-border'
                              }`}
                            >
                              <div className="flex items-center gap-2 mb-1">
                                {getStageIcon(stage.status)}
                                <span className={`text-xs font-medium ${
                                  stage.status === 'completed' ? 'text-green-400' :
                                  stage.status === 'in_progress' ? 'text-amber-700' :
                                  stage.status === 'partial' ? 'text-blue-400' :
                                  stage.status === 'blocked' ? 'text-red-400' :
                                  'text-slate-500'
                                }`}>{stage.name}</span>
                              </div>
                              <p className="text-xs text-secondary">{stage.detail}</p>
                              {stage.subDetail && (
                                <p className="text-xs text-slate-500 mt-0.5">{stage.subDetail}</p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Next Action */}
                      <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg mb-4">
                        <div className="flex items-center gap-2 mb-1">
                          <ChevronRight className="w-4 h-4 text-blue-400" />
                          <span className="text-xs font-semibold text-blue-400 uppercase">Next Action Required</span>
                        </div>
                        <p className="text-sm text-secondary">{case_item.nextAction}</p>
                      </div>

                      {/* Blockers/Hold Reason */}
                      {case_item.blockers && (
                        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg mb-4">
                          <div className="flex items-center gap-2 mb-1">
                            <AlertTriangle className="w-4 h-4 text-red-400" />
                            <span className="text-xs font-semibold text-red-400 uppercase">Blockers/Delays</span>
                          </div>
                          <p className="text-sm text-secondary">{case_item.blockers}</p>
                        </div>
                      )}

                      {case_item.holdReason && (
                        <div className="p-3 bg-slate-100 dark:bg-slate-700/30 border border-slate-600/30 rounded-lg mb-4">
                          <div className="flex items-center gap-2 mb-1">
                            <Hourglass className="w-4 h-4 text-secondary" />
                            <span className="text-xs font-semibold text-secondary uppercase">Hold Reason</span>
                          </div>
                          <p className="text-sm text-secondary">{case_item.holdReason}</p>
                          {case_item.contactAttempts && (
                            <div className="mt-2 pt-2 border-t border-slate-600/30">
                              <p className="text-xs text-slate-500 mb-1">Documented Contact Attempts:</p>
                              {case_item.contactAttempts.map((attempt, idx) => (
                                <p key={idx} className="text-xs text-secondary">• {attempt}</p>
                              ))}
                            </div>
                          )}
                        </div>
                      )}

                      {/* Documented Concerns */}
                      {case_item.documentedConcerns && (
                        <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg mb-4">
                          <div className="flex items-center gap-2 mb-2">
                            <FileWarning className="w-4 h-4 text-amber-700" />
                            <span className="text-xs font-semibold text-amber-700 uppercase">Documented Concerns (Investigation Complete)</span>
                          </div>
                          <div className="space-y-2">
                            {case_item.documentedConcerns.map((concern, idx) => (
                              <div key={idx} className="text-sm">
                                <p className="text-secondary"><span className="text-amber-700 font-medium">{concern.type}:</span> {concern.detail}</p>
                                <p className="text-xs text-slate-500 mt-0.5">Mitigation: {concern.mitigation}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Recommendation */}
                      {case_item.recommendation && (
                        <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg mb-4">
                          <div className="flex items-center gap-2 mb-1">
                            <CheckCircle className="w-4 h-4 text-green-400" />
                            <span className="text-xs font-semibold text-green-400 uppercase">Investigator Recommendation</span>
                          </div>
                          <p className="text-sm text-secondary">{case_item.recommendation}</p>
                        </div>
                      )}

                      {/* Extended Timeline Reason */}
                      {case_item.extendedReason && (
                        <div className="p-3 bg-slate-100 dark:bg-slate-700/30 border border-slate-600/30 rounded-lg mb-4">
                          <div className="flex items-center gap-2 mb-1">
                            <Clock className="w-4 h-4 text-secondary" />
                            <span className="text-xs font-semibold text-secondary uppercase">Reason for Extended Timeline</span>
                          </div>
                          <p className="text-sm text-secondary">{case_item.extendedReason}</p>
                        </div>
                      )}

                      {/* Lateral Notes */}
                      {case_item.lateralNotes && (
                        <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg mb-4">
                          <div className="flex items-center gap-2 mb-1">
                            <Briefcase className="w-4 h-4 text-purple-400" />
                            <span className="text-xs font-semibold text-purple-400 uppercase">Lateral Hire Notes</span>
                          </div>
                          <p className="text-sm text-secondary">{case_item.lateralNotes}</p>
                        </div>
                      )}

                      {/* Case Notes */}
                      {case_item.notes && (
                        <div className="p-3 bg-slate-100 dark:bg-slate-700/30 border border-slate-600/30 rounded-lg mb-4">
                          <div className="flex items-center gap-2 mb-1">
                            <FileText className="w-4 h-4 text-secondary" />
                            <span className="text-xs font-semibold text-secondary uppercase">Notes</span>
                          </div>
                          <p className="text-sm text-secondary">{case_item.notes}</p>
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="flex items-center gap-2 pt-4 border-t border-border dark:border-slate-700/30 flex-wrap">
                        <button className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-sm font-medium transition-all">
                          <Eye className="w-4 h-4" />
                          View Full Case File
                        </button>
                        <button
                          onClick={() => handleExportPDF(case_item.rawId, case_item.id)}
                          disabled={exportingId === case_item.rawId}
                          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-wait text-white rounded-xl text-sm font-medium transition-all"
                        >
                          <Download className="w-4 h-4" />
                          {exportingId === case_item.rawId ? 'Generating…' : 'Export PDF'}
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 bg-slate-50 dark:bg-slate-700/40 border border-slate-600/50 text-secondary rounded-xl text-sm font-medium hover:bg-slate-700/60 transition-all">
                          <Phone className="w-4 h-4" />
                          Contact Investigator
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 bg-slate-50 dark:bg-slate-700/40 border border-slate-600/50 text-secondary rounded-xl text-sm font-medium hover:bg-slate-700/60 transition-all">
                          <Clock className="w-4 h-4" />
                          Case Timeline
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
      </div>
    </DashboardLayout>
  );
}

import React, { useState, useEffect } from 'react';
import { LayoutDashboard, FolderOpen, FileText, Clock, UserCheck, Calendar, FileCheck, CheckCircle, TrendingUp, AlertTriangle, DollarSign, Eye, Activity, XCircle, Settings, Bell, MessageCircle, Search, ChevronRight, Shield, X, Menu, ChevronLeft, LogOut, Download, RefreshCw, Users, Building2, Phone, CreditCard, Briefcase, Scale, ClipboardCheck, Printer, ChevronDown, Filter, CircleDot, Hourglass, AlertCircle, FileWarning, CheckCircle2, Circle, PauseCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import DashboardLayout from '../layouts/DashboardLayout';
import { biNavigation, biProfile, biNotifications } from '../config/biConfig';

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

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

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

  const cases = [
    {
      id: 'BI-2024-145',
      subject: 'Robert Martinez',
      position: 'Deputy Sheriff',
      applicationDate: 'Dec 31, 2025',
      daysOpen: 23,
      status: 'Reference Checks',
      priority: 'high',
      priorityReason: 'Conditional offer expires in 7 days (Jan 30)',
      investigator: 'Brooks',
      lastUpdate: '2 hours ago',
      lastActivity: 'Reference interview completed',
      stages: [
        { name: 'Initial Review', status: 'completed', detail: 'Packet received Dec 31' },
        { name: 'Criminal History', status: 'completed', detail: 'GCIC/FBI clear - no hits' },
        { name: 'Reference Checks', status: 'in_progress', detail: '3 of 5 completed', subDetail: 'Personal: 2/3, Employment: 1/2' },
        { name: 'Employment Verification', status: 'pending', detail: 'Not started' },
        { name: 'Financial Review', status: 'pending', detail: 'Not started' },
        { name: 'Supervisor Review', status: 'pending', detail: 'Not started' }
      ],
      nextAction: 'Complete remaining reference checks by Jan 25',
      blockers: 'Former supervisor not returning calls (documented 3 attempts)'
    },
    {
      id: 'BI-2024-143',
      subject: 'Sarah Chen',
      position: 'Detention Officer',
      applicationDate: 'Dec 9, 2025',
      daysOpen: 45,
      status: 'Supervisor Review',
      priority: 'standard',
      priorityReason: null,
      investigator: 'Davis',
      lastUpdate: '1 day ago',
      lastActivity: 'Submitted to supervisor for review',
      stages: [
        { name: 'Initial Review', status: 'completed', detail: 'Completed' },
        { name: 'Criminal History', status: 'completed', detail: 'GCIC clear' },
        { name: 'Reference Checks', status: 'completed', detail: '5 of 5 - all positive' },
        { name: 'Employment Verification', status: 'completed', detail: 'All confirmed' },
        { name: 'Financial Review', status: 'completed', detail: 'No concerns' },
        { name: 'Supervisor Review', status: 'in_progress', detail: 'Submitted Jan 22 - pending decision' }
      ],
      nextAction: 'Supervisor to review by Jan 24',
      recommendation: 'Clear for hire (no disqualifying factors)',
      extendedReason: 'Applicant out of state - employment verification delayed. Prior employer HR took 3 weeks to respond.'
    },
    {
      id: 'BI-2024-141',
      subject: 'James Wilson',
      position: 'Deputy Sheriff',
      applicationDate: 'Jan 11, 2026',
      daysOpen: 12,
      status: 'Criminal History Review',
      priority: 'high',
      priorityReason: 'Lateral hire - academy starts Feb 10',
      investigator: 'Brooks',
      lastUpdate: '3 hours ago',
      lastActivity: 'Criminal history results received',
      stages: [
        { name: 'Initial Review', status: 'completed', detail: 'Packet received Jan 11' },
        { name: 'Criminal History', status: 'in_progress', detail: 'Results received Jan 23', subDetail: 'Minor traffic citation 2023 - reviewing' },
        { name: 'Reference Checks', status: 'pending', detail: 'Scheduled to begin Jan 24' },
        { name: 'Employment Verification', status: 'pending', detail: 'Not started' },
        { name: 'Financial Review', status: 'not_required', detail: 'Lateral hire exception' },
        { name: 'Supervisor Review', status: 'pending', detail: 'Not started' }
      ],
      nextAction: 'Complete criminal history review today, begin reference checks tomorrow',
      lateralNotes: 'Currently employed: Atlanta PD (6 years, good standing). POST certified.'
    },
    {
      id: 'BI-2024-138',
      subject: 'Maria Rodriguez',
      position: 'Detention Officer',
      applicationDate: 'Nov 17, 2025',
      daysOpen: 67,
      status: 'On Hold (Awaiting Applicant)',
      priority: 'on_hold',
      priorityReason: null,
      investigator: 'Thompson',
      lastUpdate: '5 days ago',
      lastActivity: 'Waiting on applicant documentation',
      stages: [
        { name: 'Initial Review', status: 'completed', detail: 'Completed' },
        { name: 'Criminal History', status: 'partial', detail: '1 hit requires explanation', subDetail: '2019 misdemeanor arrest - no disposition on file' },
        { name: 'Reference Checks', status: 'blocked', detail: 'Waiting on crim history resolution' },
        { name: 'Employment Verification', status: 'pending', detail: 'Not started' },
        { name: 'Financial Review', status: 'pending', detail: 'Not started' },
        { name: 'Supervisor Review', status: 'pending', detail: 'Not started' }
      ],
      nextAction: 'If no response by Jan 30, recommend case closure',
      holdReason: 'Applicant must provide court disposition records for 2019 misdemeanor arrest',
      contactAttempts: ['Nov 22: Initial request (certified mail)', 'Dec 15: Reminder email', 'Jan 18: Phone message (no callback)']
    },
    {
      id: 'BI-2024-136',
      subject: 'David Kim',
      position: 'Deputy Sheriff',
      applicationDate: 'Dec 20, 2025',
      daysOpen: 34,
      status: 'Financial Review',
      priority: 'standard',
      priorityReason: null,
      investigator: 'Davis',
      lastUpdate: '4 hours ago',
      lastActivity: 'Financial review completed',
      stages: [
        { name: 'Initial Review', status: 'completed', detail: 'Completed' },
        { name: 'Criminal History', status: 'completed', detail: 'GCIC clear' },
        { name: 'Reference Checks', status: 'completed', detail: '5 of 5 - all positive' },
        { name: 'Employment Verification', status: 'completed', detail: 'All confirmed' },
        { name: 'Financial Review', status: 'completed', detail: 'Score 712 (acceptable), no concerns' },
        { name: 'Supervisor Review', status: 'pending', detail: 'Submitting today' }
      ],
      nextAction: 'Submit to supervisor for review by EOD Jan 23',
      recommendation: 'Clear for hire (no disqualifying factors)',
      extendedReason: 'Holiday processing delays (Dec 23-Jan 2 closure). 2 references out of town.'
    },
    {
      id: 'BI-2024-134',
      subject: 'Lisa Anderson',
      position: 'Detention Officer',
      applicationDate: 'Jan 4, 2026',
      daysOpen: 19,
      status: 'Employment Verification',
      priority: 'standard',
      priorityReason: null,
      investigator: 'Brooks',
      lastUpdate: '1 hour ago',
      lastActivity: 'Employment verification request sent',
      stages: [
        { name: 'Initial Review', status: 'completed', detail: 'Completed' },
        { name: 'Criminal History', status: 'completed', detail: 'GCIC clear' },
        { name: 'Reference Checks', status: 'completed', detail: '5 of 5 completed' },
        { name: 'Employment Verification', status: 'in_progress', detail: '2 of 3 verified', subDetail: 'Awaiting current employer response' },
        { name: 'Financial Review', status: 'pending', detail: 'Not started' },
        { name: 'Supervisor Review', status: 'pending', detail: 'Not started' }
      ],
      nextAction: 'Follow up with current employer by Jan 25'
    },
    {
      id: 'BI-2024-132',
      subject: 'Michael Brown',
      position: 'Deputy Sheriff',
      applicationDate: 'Dec 2, 2025',
      daysOpen: 52,
      status: 'Supervisor Review',
      priority: 'standard',
      priorityReason: null,
      investigator: 'Thompson',
      lastUpdate: '2 days ago',
      lastActivity: 'Submitted to supervisor',
      stages: [
        { name: 'Initial Review', status: 'completed', detail: 'Completed' },
        { name: 'Criminal History', status: 'completed', detail: 'See documented concerns' },
        { name: 'Reference Checks', status: 'completed', detail: '5 of 5 completed' },
        { name: 'Employment Verification', status: 'completed', detail: 'All confirmed' },
        { name: 'Financial Review', status: 'completed', detail: 'See documented concerns' },
        { name: 'Supervisor Review', status: 'in_progress', detail: 'Submitted Jan 21 - pending decision' }
      ],
      nextAction: 'Supervisor to review findings and recommendation by Jan 25',
      recommendation: 'Conditional hire - concerns mitigated by documented explanations',
      documentedConcerns: [
        { type: 'Criminal History', detail: '2018 DUI conviction (misdemeanor)', mitigation: 'Disclosed on application, completed court-ordered classes, 6+ years ago' },
        { type: 'Financial', detail: 'Credit score 580 (below 650 threshold)', mitigation: 'Medical debt from 2020, payment plan in place, current on payments' }
      ]
    },
    {
      id: 'BI-2024-129',
      subject: 'Jennifer Lee',
      position: 'Detention Officer',
      applicationDate: 'Dec 26, 2025',
      daysOpen: 28,
      status: 'Reference Checks',
      priority: 'standard',
      priorityReason: null,
      investigator: 'Davis',
      lastUpdate: '6 hours ago',
      lastActivity: 'Reference interview completed',
      stages: [
        { name: 'Initial Review', status: 'completed', detail: 'Completed' },
        { name: 'Criminal History', status: 'completed', detail: 'GCIC clear' },
        { name: 'Reference Checks', status: 'in_progress', detail: '4 of 5 completed', subDetail: 'Personal: 3/3, Employment: 1/2' },
        { name: 'Employment Verification', status: 'partial', detail: '2 of 3 verified' },
        { name: 'Financial Review', status: 'pending', detail: 'Not started' },
        { name: 'Supervisor Review', status: 'pending', detail: 'Not started' }
      ],
      nextAction: 'Complete final reference interview Jan 24 (scheduled 1800 hrs)',
      notes: 'Applicant currently employed - scheduling reference interviews during non-work hours'
    }
  ];

  // Investigator workload data
  const investigatorWorkload = [
    { name: 'Agent Brooks', cases: 3 },
    { name: 'Agent Davis', cases: 3 },
    { name: 'Agent Thompson', cases: 2 }
  ];

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
      case 'in_progress': return <Clock className="w-4 h-4 text-amber-400 animate-pulse" />;
      case 'partial': return <PauseCircle className="w-4 h-4 text-blue-400" />;
      case 'blocked': return <AlertCircle className="w-4 h-4 text-red-400" />;
      case 'not_required': return <Circle className="w-4 h-4 text-slate-500" />;
      default: return <Circle className="w-4 h-4 text-slate-600" />;
    }
  };

  const getPriorityDisplay = (priority) => {
    switch (priority) {
      case 'high': return { label: 'HIGH PRIORITY', color: 'bg-red-500/20 text-red-400 border-red-500/30' };
      case 'on_hold': return { label: 'ON HOLD', color: 'bg-slate-500/20 text-slate-600 dark:text-slate-400 border-slate-500/30' };
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
      <div className="p-5 lg:p-8 space-y-8 bg-slate-100 dark:bg-transparent min-h-full">
          <div className="max-w-7xl mx-auto">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-2xl lg:text-3xl font-bold text-white">Active Cases</h2>
                <span className="px-3 py-1 bg-green-500/20 border border-green-500/30 text-green-400 text-xs font-bold rounded-full flex items-center gap-1.5">
                  <CircleDot className="w-3 h-3" />
                  LIVE
                </span>
              </div>
              <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400 flex-wrap">
                <span className="text-sm">Background investigations currently assigned and in progress</span>
                <span className="text-slate-600">•</span>
                <span className="text-sm">Updated: {formatTime(currentTime)} EST</span>
                <span className="text-slate-600">•</span>
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
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-base font-semibold text-slate-900 dark:text-white">CASELOAD SUMMARY</h4>
                      <button
                        onClick={() => setCaseloadSummaryVisible(false)}
                        className="text-slate-600 dark:text-slate-400 hover:text-white transition-colors"
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
                            <span className="text-slate-600 dark:text-slate-400">Assigned to investigators</span>
                            <span className="text-slate-700 dark:text-slate-300">{summaryStats.totalActive} cases</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-slate-600 dark:text-slate-400">Requiring supervisor action</span>
                            <span className="text-amber-400">{summaryStats.requireingSupervisor} cases</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-slate-600 dark:text-slate-400">On hold (external response)</span>
                            <span className="text-slate-600 dark:text-slate-400">{summaryStats.onHold} cases</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-slate-600 dark:text-slate-400">Standard processing</span>
                            <span className="text-green-400">{summaryStats.standardProcessing} cases</span>
                          </div>
                        </div>
                      </div>

                      {/* Average Days */}
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <Clock className="w-4 h-4 text-amber-400" />
                          <span className="text-sm font-semibold text-amber-400">Average Days in Process: {summaryStats.avgDaysInProcess}</span>
                        </div>
                        <div className="space-y-1.5 text-sm">
                          <div className="flex items-center justify-between">
                            <span className="text-slate-600 dark:text-slate-400">Agency target</span>
                            <span className="text-slate-700 dark:text-slate-300">&lt;18 days</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-slate-600 dark:text-slate-400">Longest case</span>
                            <span className="text-red-400">{summaryStats.longestCase} days (on hold)</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-slate-600 dark:text-slate-400">Shortest case</span>
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
                              <span className="text-slate-600 dark:text-slate-400">{inv.name}</span>
                              <span className="text-slate-700 dark:text-slate-300">{inv.cases} cases</span>
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
            <div className="mb-6 bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/50 rounded-xl p-4 lg:p-6">
              <div className="flex items-center gap-2 mb-4">
                <Filter className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase">Search Active Cases</h3>
                <span className="text-xs text-slate-500 ml-2">Search by: Applicant name, case ID, position, or investigator</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
                <div className="lg:col-span-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600 dark:text-slate-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search cases..."
                      className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50"
                    />
                  </div>
                </div>
                <div>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="w-full px-4 py-2.5 bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-700/50 rounded-xl text-white focus:outline-none focus:border-amber-500/50 text-sm"
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
                    className="w-full px-4 py-2.5 bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-700/50 rounded-xl text-white focus:outline-none focus:border-amber-500/50 text-sm"
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
                    className="w-full px-4 py-2.5 bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-700/50 rounded-xl text-white focus:outline-none focus:border-amber-500/50 text-sm"
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
                    className="w-full px-4 py-2.5 bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-700/50 rounded-xl text-white focus:outline-none focus:border-amber-500/50 text-sm"
                  >
                    <option value="all">All Positions</option>
                    <option value="Deputy Sheriff">Deputy Sheriff</option>
                    <option value="Detention Officer">Detention Officer</option>
                    <option value="Background Investigator">Background Investigator</option>
                    <option value="Court Security">Court Security</option>
                  </select>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-700/30 flex items-center justify-between flex-wrap gap-3">
                <p className="text-sm text-slate-600 dark:text-slate-400">Showing: <span className="text-white font-medium">{filteredCases.length} of {cases.length}</span> cases</p>
                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-2 px-4 py-2 bg-slate-700/40 border border-slate-600/50 text-slate-700 dark:text-slate-300 rounded-xl text-sm font-medium hover:bg-slate-700/60 transition-all">
                    <Download className="w-4 h-4" />
                    Export to Excel
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-slate-700/40 border border-slate-600/50 text-slate-700 dark:text-slate-300 rounded-xl text-sm font-medium hover:bg-slate-700/60 transition-all">
                    <Printer className="w-4 h-4" />
                    Print Case List
                  </button>
                  <div className="relative">
                    <button className="flex items-center gap-2 px-4 py-2 bg-amber-500/20 border border-amber-500/30 text-amber-400 rounded-xl text-sm font-medium hover:bg-amber-500/30 transition-all">
                      Bulk Actions
                      <ChevronDown className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Cases List */}
            <div className="space-y-4">
              {filteredCases.map((case_item) => {
                const priorityDisplay = getPriorityDisplay(case_item.priority);
                const isExpanded = expandedCase === case_item.id;

                return (
                  <div
                    key={case_item.id}
                    className={`bg-slate-800/40 border rounded-xl overflow-hidden transition-all ${
                      case_item.priority === 'high' ? 'border-red-500/30' :
                      case_item.priority === 'on_hold' ? 'border-slate-600/50' : 'border-slate-700/50'
                    } hover:border-amber-500/30`}
                  >
                    {/* Case Header */}
                    <div className="p-5">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{case_item.subject}</h3>
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
                          <p className="text-sm text-slate-700 dark:text-slate-300">{case_item.position}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500 mb-1">Application Date</p>
                          <p className="text-sm text-slate-700 dark:text-slate-300">{case_item.applicationDate}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500 mb-1">Days in Process</p>
                          <p className={`text-sm font-medium ${case_item.daysOpen > 18 ? 'text-amber-400' : 'text-green-400'}`}>
                            {case_item.daysOpen} days
                            <span className="text-slate-500 font-normal"> (target: &lt;18)</span>
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500 mb-1">Assigned Investigator</p>
                          <p className="text-sm text-slate-700 dark:text-slate-300">Agent {case_item.investigator}</p>
                        </div>
                      </div>

                      {/* Priority Reason */}
                      {case_item.priorityReason && (
                        <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                          <div className="flex items-center gap-2">
                            <AlertCircle className="w-4 h-4 text-red-400" />
                            <span className="text-xs font-semibold text-red-400 uppercase">Priority Reason</span>
                          </div>
                          <p className="text-sm text-slate-700 dark:text-slate-300 mt-1">{case_item.priorityReason}</p>
                        </div>
                      )}

                      {/* Current Status */}
                      <div className="mb-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Clock className="w-4 h-4 text-amber-400" />
                          <span className="text-sm font-semibold text-slate-900 dark:text-white">CURRENT STATUS:</span>
                          <span className="text-sm text-amber-400 font-medium">{case_item.status}</span>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-400">Last Activity: {case_item.lastActivity} — {case_item.lastUpdate}</p>
                      </div>

                      {/* Investigation Stages */}
                      <div className="mb-4">
                        <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase mb-3">Investigation Stages</p>
                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
                          {case_item.stages.map((stage, idx) => (
                            <div
                              key={idx}
                              className={`p-2.5 rounded-lg border ${
                                stage.status === 'completed' ? 'bg-green-500/10 border-green-500/20' :
                                stage.status === 'in_progress' ? 'bg-amber-500/10 border-amber-500/20' :
                                stage.status === 'partial' ? 'bg-blue-500/10 border-blue-500/20' :
                                stage.status === 'blocked' ? 'bg-red-500/10 border-red-500/20' :
                                'bg-slate-800/50 border-slate-700/30'
                              }`}
                            >
                              <div className="flex items-center gap-2 mb-1">
                                {getStageIcon(stage.status)}
                                <span className={`text-xs font-medium ${
                                  stage.status === 'completed' ? 'text-green-400' :
                                  stage.status === 'in_progress' ? 'text-amber-400' :
                                  stage.status === 'partial' ? 'text-blue-400' :
                                  stage.status === 'blocked' ? 'text-red-400' :
                                  'text-slate-500'
                                }`}>{stage.name}</span>
                              </div>
                              <p className="text-xs text-slate-600 dark:text-slate-400">{stage.detail}</p>
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
                        <p className="text-sm text-slate-700 dark:text-slate-300">{case_item.nextAction}</p>
                      </div>

                      {/* Blockers/Hold Reason */}
                      {case_item.blockers && (
                        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg mb-4">
                          <div className="flex items-center gap-2 mb-1">
                            <AlertTriangle className="w-4 h-4 text-red-400" />
                            <span className="text-xs font-semibold text-red-400 uppercase">Blockers/Delays</span>
                          </div>
                          <p className="text-sm text-slate-700 dark:text-slate-300">{case_item.blockers}</p>
                        </div>
                      )}

                      {case_item.holdReason && (
                        <div className="p-3 bg-slate-700/30 border border-slate-600/30 rounded-lg mb-4">
                          <div className="flex items-center gap-2 mb-1">
                            <Hourglass className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                            <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase">Hold Reason</span>
                          </div>
                          <p className="text-sm text-slate-700 dark:text-slate-300">{case_item.holdReason}</p>
                          {case_item.contactAttempts && (
                            <div className="mt-2 pt-2 border-t border-slate-600/30">
                              <p className="text-xs text-slate-500 mb-1">Documented Contact Attempts:</p>
                              {case_item.contactAttempts.map((attempt, idx) => (
                                <p key={idx} className="text-xs text-slate-600 dark:text-slate-400">• {attempt}</p>
                              ))}
                            </div>
                          )}
                        </div>
                      )}

                      {/* Documented Concerns */}
                      {case_item.documentedConcerns && (
                        <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg mb-4">
                          <div className="flex items-center gap-2 mb-2">
                            <FileWarning className="w-4 h-4 text-amber-400" />
                            <span className="text-xs font-semibold text-amber-400 uppercase">Documented Concerns (Investigation Complete)</span>
                          </div>
                          <div className="space-y-2">
                            {case_item.documentedConcerns.map((concern, idx) => (
                              <div key={idx} className="text-sm">
                                <p className="text-slate-700 dark:text-slate-300"><span className="text-amber-400 font-medium">{concern.type}:</span> {concern.detail}</p>
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
                          <p className="text-sm text-slate-700 dark:text-slate-300">{case_item.recommendation}</p>
                        </div>
                      )}

                      {/* Extended Timeline Reason */}
                      {case_item.extendedReason && (
                        <div className="p-3 bg-slate-700/30 border border-slate-600/30 rounded-lg mb-4">
                          <div className="flex items-center gap-2 mb-1">
                            <Clock className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                            <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase">Reason for Extended Timeline</span>
                          </div>
                          <p className="text-sm text-slate-700 dark:text-slate-300">{case_item.extendedReason}</p>
                        </div>
                      )}

                      {/* Lateral Notes */}
                      {case_item.lateralNotes && (
                        <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg mb-4">
                          <div className="flex items-center gap-2 mb-1">
                            <Briefcase className="w-4 h-4 text-purple-400" />
                            <span className="text-xs font-semibold text-purple-400 uppercase">Lateral Hire Notes</span>
                          </div>
                          <p className="text-sm text-slate-700 dark:text-slate-300">{case_item.lateralNotes}</p>
                        </div>
                      )}

                      {/* Case Notes */}
                      {case_item.notes && (
                        <div className="p-3 bg-slate-700/30 border border-slate-600/30 rounded-lg mb-4">
                          <div className="flex items-center gap-2 mb-1">
                            <FileText className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                            <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase">Notes</span>
                          </div>
                          <p className="text-sm text-slate-700 dark:text-slate-300">{case_item.notes}</p>
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="flex items-center gap-2 pt-4 border-t border-slate-700/30">
                        <button className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-sm font-medium transition-all">
                          <Eye className="w-4 h-4" />
                          View Full Case File
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 bg-slate-700/40 border border-slate-600/50 text-slate-700 dark:text-slate-300 rounded-xl text-sm font-medium hover:bg-slate-700/60 transition-all">
                          <Phone className="w-4 h-4" />
                          Contact Investigator
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 bg-slate-700/40 border border-slate-600/50 text-slate-700 dark:text-slate-300 rounded-xl text-sm font-medium hover:bg-slate-700/60 transition-all">
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

import React, { useState, useEffect } from 'react';
import { LayoutDashboard, FolderOpen, FileText, Clock, UserCheck, Calendar, FileCheck, CheckCircle, TrendingUp, AlertTriangle, DollarSign, Eye, Activity, XCircle, Settings, Bell, MessageCircle, Search, ChevronRight, Shield, X, Menu, ChevronLeft, LogOut, Filter, Users, Target, Download, Briefcase, ClipboardCheck, Scale, Building2, ChevronDown, User, RefreshCw, CalendarClock, AlertCircle, FileWarning, ShieldAlert, FileSearch, Phone, Gavel, CreditCard, Hourglass, CheckCircle2, CircleDot } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function BackgroundsDashboard() {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState('bi-dashboard');
  const [chatOpen, setChatOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [logoutConfirmOpen, setLogoutConfirmOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [timeRange, setTimeRange] = useState('month');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [supervisorReviewVisible, setSupervisorReviewVisible] = useState(true);
  const [filterOpen, setFilterOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuOpen && !event.target.closest('.profile-menu-container')) {
        setProfileMenuOpen(false);
      }
      if (notificationsOpen && !event.target.closest('.notifications-container')) {
        setNotificationsOpen(false);
      }
      if (filterOpen && !event.target.closest('.filter-container')) {
        setFilterOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [profileMenuOpen, notificationsOpen, filterOpen]);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  };

  // Renamed sidebar navigation — procedural, adjudication-grade language
  const navigation = [
    { id: 'bi-dashboard', label: 'Investigations Command Overview', icon: LayoutDashboard },
    { id: 'active-cases', label: 'Open Investigations', icon: FolderOpen, page: 'ActiveCases' },
    { id: 'case-management', label: 'Investigation Case Files', icon: FileText, page: 'CaseManagement' },
    { id: 'investigation-timeline', label: 'Case Activity & Audit Log', icon: Clock, page: 'InvestigationTimeline' },
    { id: 'subject-records', label: 'Applicant Records', icon: UserCheck, page: 'SubjectRecords' },
    { id: 'interview-scheduling', label: 'Interview Coordination', icon: Calendar, page: 'InterviewScheduling' },
    { id: 'evidence-tracking', label: 'Documentation & Evidence', icon: FileCheck, page: 'EvidenceTracking' },
    { id: 'reference-checks', label: 'Reference Verification', icon: CheckCircle, page: 'ReferenceChecks' },
    { id: 'employment-verification', label: 'Employment Confirmation', icon: TrendingUp, page: 'EmploymentVerification' },
    { id: 'criminal-history', label: 'Criminal Record Adjudication', icon: AlertTriangle, page: 'CriminalHistoryReview' },
    { id: 'financial-background', label: 'Financial Risk Review', icon: DollarSign, page: 'FinancialBackground' },
    { id: 'social-media', label: 'Digital Footprint Review', icon: Eye, page: 'SocialMediaAnalysis' },
    { id: 'bi-reports', label: 'Adjudication Reports', icon: Activity, page: 'BIReports' },
    { id: 'case-closure', label: 'Final Determinations', icon: XCircle, page: 'CaseClosure' }
  ];

  const notifications = [
    { id: 1, title: 'Investigation Finalized', message: 'Marcus Johnson — Deputy Sheriff cleared', time: '15 min ago', urgent: false },
    { id: 2, title: 'Criminal Record Flag', message: 'Robert Martinez — requires supervisor adjudication', time: '1 hour ago', urgent: true },
    { id: 3, title: 'Employment Gap Identified', message: 'Lisa Chen — 6-month gap documented', time: '2 hours ago', urgent: true },
    { id: 4, title: 'Reference Interview Due', message: '3 reference calls scheduled today', time: '3 hours ago', urgent: true },
    { id: 5, title: 'Case Deadline Approaching', message: 'Thompson case — 5 days remaining', time: '4 hours ago', urgent: false }
  ];

  const metrics = {
    activeCases: 47,
    pendingReview: 12,
    completedThisMonth: 28,
    avgCompletionDays: 14.5,
    casesWithConcerns: 8,
    overdueItems: 3,
    referencesPending: 15,
    clearedForHire: 22,
    notRecommended: 6,
    interviewsToday: 8,
    slaTarget: 18,
    awaitingSupervisorSignOff: 5,
    avgSupervisorWait: 1.2,
    slaBreachCases: 2,
    avgCaseAge: 11.3
  };

  const investigationStages = [
    { stage: 'Application Review', count: 12, description: 'Initial documentation review' },
    { stage: 'Reference Interviews', count: 15, description: '8 scheduled today' },
    { stage: 'Employment Verification', count: 8, description: '3 awaiting employer response' },
    { stage: 'Background Checks', count: 7, description: 'Criminal, financial, digital footprint' },
    { stage: 'Supervisor Review', count: 5, description: 'Final adjudication pending' }
  ];

  const recentActivity = [
    { id: 1, type: 'complete', message: 'Investigation finalized — Elena Rodriguez cleared for hire as Background Investigator', time: '30 min ago', detail: 'Case #BI-2024-0847', user: 'Inv. Smith' },
    { id: 2, type: 'flag', message: 'Documented concern — David Kim financial background requires supervisor adjudication', time: '2 hours ago', detail: 'Case #BI-2024-0863', user: 'Inv. Wilson' },
    { id: 3, type: 'interview', message: 'Reference interview completed — Marcus Johnson, former supervisor contacted', time: '3 hours ago', detail: 'Case #BI-2024-0831', user: 'Inv. Davis' },
    { id: 4, type: 'new', message: 'New investigation initiated — Sarah Chen applying for Detention Officer position', time: '5 hours ago', detail: 'Case #BI-2024-0892', user: 'System' },
    { id: 5, type: 'update', message: 'Employment confirmation received — Robert Martinez, Metro PD confirmed 3-year tenure', time: '1 day ago', detail: 'Case #BI-2024-0844', user: 'Inv. Smith' }
  ];

  // Supervisor review cases — unified list, not grouped by category
  const supervisorReviewCases = [
    { id: 1, subject: 'Marcus Johnson', issueType: 'Criminal Record Flag', severity: 'high', daysOpen: 12, nextAction: 'Supervisor adjudication', detail: 'Prior misdemeanor arrest (2019), requires adjudication review', caseNumber: 'BI-2024-0831' },
    { id: 2, subject: 'Robert Martinez', issueType: 'Criminal Record Flag', severity: 'high', daysOpen: 9, nextAction: 'Supervisor adjudication', detail: 'Discrepancy in disclosed vs. documented history', caseNumber: 'BI-2024-0844' },
    { id: 3, subject: 'David Kim', issueType: 'Financial Risk', severity: 'high', daysOpen: 7, nextAction: 'Supervisor adjudication', detail: 'Outstanding debt exceeds threshold ($47,500)', caseNumber: 'BI-2024-0863' },
    { id: 4, subject: 'Jennifer Lopez', issueType: 'Financial Risk', severity: 'medium', daysOpen: 5, nextAction: 'Supervisor adjudication', detail: 'Recent bankruptcy filing requires evaluation', caseNumber: 'BI-2024-0871' },
    { id: 5, subject: 'Lisa Chen', issueType: 'Employment Discrepancy', severity: 'medium', daysOpen: 4, nextAction: 'Supervisor adjudication', detail: '6-month gap in employment history unexplained', caseNumber: 'BI-2024-0856' }
  ];

  const priorityCases = [
    { id: 1, subject: 'Marcus Johnson', position: 'Deputy Sheriff', stage: 'Supervisor Review', daysOpen: 12, priority: 'high', investigator: 'Inv. Smith', nextAction: 'Supervisor sign-off needed', caseNumber: 'BI-2024-0831' },
    { id: 2, subject: 'Lisa Martinez', position: 'Background Investigator', stage: 'Reference Verification', daysOpen: 8, priority: 'high', investigator: 'Inv. Wilson', nextAction: 'Attempt alternate contacts', caseNumber: 'BI-2024-0856' },
    { id: 3, subject: 'David Chen', position: 'Deputy Sheriff', stage: 'Financial Risk Review', daysOpen: 15, priority: 'medium', investigator: 'Inv. Smith', nextAction: 'Request documentation', caseNumber: 'BI-2024-0819' },
    { id: 4, subject: 'Sarah Thompson', position: 'Detention Officer', stage: 'Employment Confirmation', daysOpen: 5, priority: 'low', investigator: 'Inv. Davis', nextAction: 'Follow up Friday', caseNumber: 'BI-2024-0878' }
  ];

  const upcomingDeadlines = [
    { id: 1, subject: 'Marcus Johnson', task: 'Supervisor adjudication decision', dueDate: 'Today', daysLeft: 0, caseNumber: 'BI-2024-0831', compliance: 'POST certification timeline', urgencyGroup: 'today' },
    { id: 2, subject: 'Lisa Martinez', task: 'Complete reference interviews (3 remaining)', dueDate: 'Tomorrow', daysLeft: 1, caseNumber: 'BI-2024-0856', compliance: 'Hiring deadline: Dec 15', urgencyGroup: 'tomorrow' },
    { id: 3, subject: 'David Chen', task: 'Financial documentation review', dueDate: 'Dec 5', daysLeft: 3, caseNumber: 'BI-2024-0819', compliance: 'SLA: 18 days max', urgencyGroup: '3day' },
    { id: 4, subject: 'Sarah Thompson', task: 'Employment confirmation follow-up', dueDate: 'Dec 8', daysLeft: 6, caseNumber: 'BI-2024-0878', compliance: 'Standard SLA', urgencyGroup: '7day' }
  ];

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
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex">
      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 border-r border-slate-800/50 backdrop-blur-xl bg-slate-900/30 flex flex-col transform transition-all lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} ${sidebarCollapsed ? 'w-20' : 'w-64'}`}>
        <div className="p-4 border-b border-slate-700/50 flex items-center justify-between">
          {!sidebarCollapsed && (
            <div className="flex items-center gap-2">
              <Shield className="w-8 h-8 text-amber-500" />
              <h1 className="text-xl font-bold text-white">SentryOps</h1>
            </div>
          )}
          {sidebarCollapsed && (
            <Shield className="w-8 h-8 text-amber-500 mx-auto" />
          )}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-2 hover:bg-slate-800/50 rounded-lg transition-colors hidden lg:block"
          >
            {sidebarCollapsed ? <ChevronRight className="w-5 h-5 text-slate-400" /> : <ChevronLeft className="w-5 h-5 text-slate-400" />}
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {navigation.map(item => {
            const Icon = item.icon;
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavigation(item)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${
                  isActive ? 'bg-slate-700/50 text-white border-l-2 border-amber-500' : 'text-slate-400 hover:bg-slate-800/30 hover:text-slate-300'
                } ${sidebarCollapsed ? 'justify-center' : ''}`}
                title={sidebarCollapsed ? item.label : ''}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {!sidebarCollapsed && (
                  <span className="flex-1 text-left text-[13px] font-medium truncate">{item.label}</span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="border-t border-slate-700/50">
          {!sidebarCollapsed && (
            <div className="px-4 py-3">
              <p className="text-xs text-slate-500 text-center">Gwinnett County Sheriff's Office</p>
            </div>
          )}

          <div className="p-4">
            <button
              onClick={() => setLogoutConfirmOpen(true)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all text-slate-400 hover:bg-slate-800/30 hover:text-slate-300 ${sidebarCollapsed ? 'justify-center' : ''}`}
              title={sidebarCollapsed ? 'Sign Out' : ''}
            >
              <LogOut className="w-5 h-5 flex-shrink-0" />
              {!sidebarCollapsed && (
                <span className="flex-1 text-left text-[13px] font-medium">Sign Out</span>
              )}
            </button>
          </div>
        </div>
      </aside>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {logoutConfirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setLogoutConfirmOpen(false)}
          />
          <div className="relative bg-slate-900 border border-slate-700/50 rounded-xl p-6 max-w-sm w-full shadow-2xl">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-slate-800/60 rounded-xl flex items-center justify-center">
                <LogOut className="w-6 h-6 text-slate-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Sign Out</h3>
                <p className="text-sm text-slate-400">Are you sure you want to sign out?</p>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setLogoutConfirmOpen(false)}
                className="flex-1 px-4 py-2.5 bg-slate-800/40 hover:bg-slate-800/60 border border-slate-700/50 rounded-xl text-white font-medium transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 px-4 py-2.5 bg-slate-700/40 hover:bg-slate-700/60 border border-slate-600/50 rounded-xl text-white font-medium transition-all"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col min-w-0">
        {/* Header — clean, hierarchical */}
        <header className="border-b border-slate-800/50 backdrop-blur-xl bg-slate-900/30">
          <div className="px-4 lg:px-6 py-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4 flex-1 min-w-0">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 hover:bg-slate-800/50 rounded-lg"
              >
                <Menu className="w-5 h-5 text-slate-400" />
              </button>
              <div className="flex-1 max-w-xl relative hidden sm:block">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input type="text" placeholder="Search cases, applicants, investigators..." className="w-full pl-12 pr-4 py-2 bg-slate-800/40 border border-slate-700/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-slate-600 text-[13px]" />
              </div>
            </div>
            <div className="flex items-center gap-2 lg:gap-3">
              <div className="relative notifications-container">
                <button
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                  className="p-2 hover:bg-slate-800/50 rounded-lg relative"
                >
                  <Bell className="w-5 h-5 text-slate-400" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>

                {notificationsOpen && (
                  <div className="absolute right-0 top-full mt-2 w-96 bg-slate-900/95 backdrop-blur-xl border border-slate-700/50 rounded-xl shadow-2xl z-50">
                    <div className="p-4 border-b border-slate-700/50">
                      <div className="flex items-center justify-between">
                        <h3 className="text-[13px] font-semibold text-white">Notifications</h3>
                        <span className="text-xs text-slate-500">{notifications.filter(n => n.urgent).length} requiring attention</span>
                      </div>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.map(notification => (
                        <div key={notification.id} className={`p-4 border-b border-slate-800/30 hover:bg-slate-800/30 cursor-pointer transition-colors`}>
                          <div className="flex items-start gap-3">
                            <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${notification.urgent ? 'bg-red-400' : 'bg-slate-500'}`}></div>
                            <div className="flex-1 min-w-0">
                              <p className="text-[13px] font-medium text-white mb-1">{notification.title}</p>
                              <p className="text-xs text-slate-400 mb-2">{notification.message}</p>
                              <p className="text-xs text-slate-500">{notification.time}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-3 border-t border-slate-700/50">
                      <button className="w-full text-center text-[13px] text-slate-400 hover:text-slate-300 font-medium">View All Notifications</button>
                    </div>
                  </div>
                )}
              </div>

              <div className="h-8 w-px bg-slate-700/50"></div>

              <div className="relative profile-menu-container">
                <button
                  onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                  className="flex items-center gap-3 p-1.5 pr-3 hover:bg-slate-800/50 rounded-lg transition-colors"
                >
                  <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center">
                    <span className="text-white text-[13px] font-medium">BI</span>
                  </div>
                  <div className="hidden sm:block text-left">
                    <p className="text-[13px] font-medium text-white">BI Supervisor</p>
                    <p className="text-xs text-slate-500">Background Investigations</p>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-slate-400 hidden sm:block transition-transform ${profileMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {profileMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-56 bg-slate-900/95 backdrop-blur-xl border border-slate-700/50 rounded-xl shadow-2xl z-50 py-2">
                    <div className="px-4 py-3 border-b border-slate-700/50">
                      <p className="text-[13px] font-medium text-white">BI Supervisor</p>
                      <p className="text-xs text-slate-500">bi.supervisor@gcso.gov</p>
                    </div>
                    <div className="py-1">
                      <button className="w-full flex items-center gap-3 px-4 py-2 text-[13px] text-slate-300 hover:bg-slate-800/50 transition-colors">
                        <User className="w-4 h-4" />
                        View Profile
                      </button>
                      <button
                        onClick={() => navigate(createPageUrl('BISettings'))}
                        className="w-full flex items-center gap-3 px-4 py-2 text-[13px] text-slate-300 hover:bg-slate-800/50 transition-colors"
                      >
                        <Settings className="w-4 h-4" />
                        Settings
                      </button>
                    </div>
                    <div className="border-t border-slate-700/50 py-1">
                      <button
                        onClick={() => setLogoutConfirmOpen(true)}
                        className="w-full flex items-center gap-3 px-4 py-2 text-[13px] text-slate-400 hover:bg-slate-800/50 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {/* Page Header — clean, procedural */}
            <div className="mb-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold text-white mb-2">Investigations Command Overview</h2>
                <div className="flex items-center gap-3 text-slate-500 text-[13px]">
                  <span>{formatDate(currentTime)}</span>
                  <span className="text-slate-700">|</span>
                  <span>{formatTime(currentTime)} EST</span>
                  <span className="text-slate-700">|</span>
                  <span>Last sync: 2 min ago</span>
                  <span className="text-slate-700">|</span>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                    <span>Data status: Healthy</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button className="flex items-center gap-2 px-4 py-2 bg-slate-800/40 border border-slate-700/50 text-slate-300 rounded-lg text-[13px] font-medium hover:bg-slate-800/60 transition-all">
                  <Download className="w-4 h-4" />
                  Export Report
                </button>
                <div className="relative filter-container">
                  <button
                    onClick={() => setFilterOpen(!filterOpen)}
                    className="flex items-center gap-2 px-4 py-2 bg-slate-800/40 border border-slate-700/50 text-slate-300 rounded-lg text-[13px] font-medium hover:bg-slate-800/60 transition-all"
                  >
                    <Filter className="w-4 h-4" />
                    Filter
                    <ChevronDown className="w-3 h-3" />
                  </button>
                  {filterOpen && (
                    <div className="absolute right-0 top-full mt-2 w-48 bg-slate-900/95 backdrop-blur-xl border border-slate-700/50 rounded-lg shadow-2xl z-50 py-1">
                      <button className="w-full text-left px-4 py-2 text-[13px] text-slate-300 hover:bg-slate-800/50">All Cases</button>
                      <button className="w-full text-left px-4 py-2 text-[13px] text-slate-300 hover:bg-slate-800/50">With Concerns</button>
                      <button className="w-full text-left px-4 py-2 text-[13px] text-slate-300 hover:bg-slate-800/50">Pending Review</button>
                      <button className="w-full text-left px-4 py-2 text-[13px] text-slate-300 hover:bg-slate-800/50">Overdue</button>
                    </div>
                  )}
                </div>
                <select
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="px-4 py-2 bg-slate-800/40 border border-slate-700/50 rounded-lg text-slate-300 text-[13px] focus:outline-none focus:border-slate-600"
                >
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                  <option value="quarter">This Quarter</option>
                  <option value="year">This Year</option>
                </select>
              </div>
            </div>

            {/* Adjudication Exposure Indicator — political risk bar */}
            <div className="mb-8 flex items-center gap-6 px-5 py-3 bg-slate-800/30 border border-slate-700/40 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                <span className="text-[13px] text-slate-400">Cases Awaiting Supervisor Sign-Off:</span>
                <span className="text-[13px] font-semibold text-white">{metrics.awaitingSupervisorSignOff}</span>
              </div>
              <div className="h-4 w-px bg-slate-700/50"></div>
              <div className="flex items-center gap-3">
                <span className="text-[13px] text-slate-400">Avg Wait Time:</span>
                <span className="text-[13px] font-semibold text-white">{metrics.avgSupervisorWait} days</span>
              </div>
              <div className="h-4 w-px bg-slate-700/50"></div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                <span className="text-[13px] text-slate-400">SLA Breach Cases:</span>
                <span className="text-[13px] font-semibold text-white">{metrics.slaBreachCases}</span>
              </div>
              <div className="h-4 w-px bg-slate-700/50"></div>
              <div className="flex items-center gap-3">
                <span className="text-[13px] text-slate-400">Avg Case Age:</span>
                <span className="text-[13px] font-semibold text-white">{metrics.avgCaseAge} days</span>
              </div>
            </div>

            {/* Supervisor Review Required — neutral bg, left border accent */}
            {supervisorReviewVisible && (
              <div className="mb-8 bg-slate-800/20 border border-slate-700/40 border-l-4 border-l-red-500 rounded-lg p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <h4 className="text-[13px] font-semibold text-white uppercase tracking-wide">Supervisor Review Required</h4>
                    <span className="text-xs text-slate-500">{supervisorReviewCases.length} pending</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => navigate(createPageUrl('CaseManagement'))}
                      className="text-[13px] text-slate-400 hover:text-slate-300 font-medium"
                    >
                      Review All Pending →
                    </button>
                    <button
                      onClick={() => setSupervisorReviewVisible(false)}
                      className="text-slate-500 hover:text-slate-400 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Stacked case rows — uniform, not grouped by category */}
                <div className="space-y-2">
                  {supervisorReviewCases.map(caseItem => (
                    <div key={caseItem.id} className={`flex items-center gap-4 px-4 py-3 bg-slate-900/40 rounded-lg border-l-4 ${
                      caseItem.severity === 'high' ? 'border-l-red-500/70' : 'border-l-amber-500/70'
                    }`}>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3">
                          <span className="text-[13px] font-semibold text-white">{caseItem.subject}</span>
                          <span className="text-xs text-slate-500">{caseItem.caseNumber}</span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1">{caseItem.detail}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <span className="text-xs text-slate-500">{caseItem.issueType}</span>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`w-1.5 h-1.5 rounded-full ${caseItem.severity === 'high' ? 'bg-red-400' : 'bg-amber-400'}`}></span>
                          <span className="text-xs text-slate-500">{caseItem.daysOpen} days open</span>
                        </div>
                      </div>
                      <div className="flex-shrink-0">
                        <span className="text-xs text-slate-400">{caseItem.nextAction}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Investigation Status Summary — neutral, status dots only */}
            <div className="mb-8 bg-slate-800/20 border border-slate-700/40 rounded-lg p-5">
              <div className="flex items-center justify-between mb-5">
                <h4 className="text-[13px] font-semibold text-white uppercase tracking-wide">Investigation Status Summary</h4>
                <span className="text-xs text-slate-500">Last sync: 2 min ago</span>
              </div>

              {/* REQUIRES ACTION */}
              <div className="mb-4 pb-4 border-b border-slate-700/30">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                  <h5 className="text-[13px] font-semibold text-slate-300">REQUIRES ACTION</h5>
                </div>
                <div className="space-y-2 text-[13px]">
                  <div className="flex items-start gap-3 pl-4">
                    <span className="text-slate-500 flex-shrink-0">•</span>
                    <p className="text-slate-400"><span className="text-white font-medium">3 overdue items</span> — Reference checks pending for Thompson, Davis, Williams</p>
                  </div>
                  <div className="flex items-start gap-3 pl-4">
                    <span className="text-slate-500 flex-shrink-0">•</span>
                    <p className="text-slate-400"><span className="text-white font-medium">5 cases with documented concerns</span> — Awaiting supervisor adjudication</p>
                  </div>
                  <div className="flex items-start gap-3 pl-4">
                    <span className="text-slate-500 flex-shrink-0">•</span>
                    <p className="text-slate-400"><span className="text-white font-medium">2 compliance deadlines</span> — POST certification expires in 48 hours</p>
                  </div>
                </div>
              </div>

              {/* IN PROGRESS */}
              <div className="mb-4 pb-4 border-b border-slate-700/30">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                  <h5 className="text-[13px] font-semibold text-slate-300">IN PROGRESS</h5>
                </div>
                <div className="space-y-2 text-[13px]">
                  <div className="flex items-start gap-3 pl-4">
                    <span className="text-slate-500 flex-shrink-0">•</span>
                    <p className="text-slate-400"><span className="text-white font-medium">47 active investigations</span> — 12 initial review, 15 reference checks, 8 verifications, 7 history review, 5 final review</p>
                  </div>
                  <div className="flex items-start gap-3 pl-4">
                    <span className="text-slate-500 flex-shrink-0">•</span>
                    <p className="text-slate-400"><span className="text-white font-medium">15 reference checks pending</span> — 8 interviews scheduled today</p>
                  </div>
                  <div className="flex items-start gap-3 pl-4">
                    <span className="text-slate-500 flex-shrink-0">•</span>
                    <p className="text-slate-400"><span className="text-white font-medium">12 awaiting supervisor review</span> — Average wait: 1.2 days</p>
                  </div>
                </div>
              </div>

              {/* COMPLETED THIS MONTH */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <h5 className="text-[13px] font-semibold text-slate-300">COMPLETED THIS MONTH</h5>
                </div>
                <div className="space-y-2 text-[13px]">
                  <div className="flex items-start gap-3 pl-4">
                    <span className="text-slate-500 flex-shrink-0">•</span>
                    <p className="text-slate-400"><span className="text-white font-medium">28 investigations finalized</span> — 22 cleared for hire, 6 not recommended</p>
                  </div>
                  <div className="flex items-start gap-3 pl-4">
                    <span className="text-slate-500 flex-shrink-0">•</span>
                    <p className="text-slate-400"><span className="text-white font-medium">14.5 day average turnaround</span> — 3.5 days ahead of 18-day SLA target</p>
                  </div>
                  <div className="flex items-start gap-3 pl-4">
                    <span className="text-slate-500 flex-shrink-0">•</span>
                    <p className="text-slate-400"><span className="text-white font-medium">On track for monthly target</span> — 28 of 35 projected (80%)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Compliance Risk Indicator */}
            {metrics.slaBreachCases > 0 && (
              <div className="mb-8 bg-slate-800/20 border border-slate-700/40 border-l-4 border-l-amber-500 rounded-lg px-5 py-3">
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 bg-amber-400 rounded-full flex-shrink-0"></div>
                  <span className="text-[13px] text-slate-400">Compliance Notice:</span>
                  <span className="text-[13px] text-white">{metrics.slaBreachCases} case(s) have exceeded the 18-day SLA target.</span>
                  <span className="text-[13px] text-slate-500">POST certification and hiring timelines may be affected.</span>
                </div>
              </div>
            )}

            {/* Key Metrics Grid — flat, neutral, tiny colored dot */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {/* Active Cases */}
              <button
                onClick={() => navigate(createPageUrl('ActiveCases'))}
                className="bg-slate-800/20 border border-slate-700/40 rounded-lg p-5 hover:bg-slate-800/30 transition-all text-left group"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
                    <span className="text-xs text-slate-500 uppercase tracking-wide font-medium">Active Investigations</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-slate-400 transition-all" />
                </div>
                <p className="text-2xl font-semibold text-white mb-3">{metrics.activeCases}</p>
                <div className="space-y-1.5 mb-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">Initial Review</span>
                    <span className="text-slate-300">12</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">Reference Checks</span>
                    <span className="text-slate-300">15</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">Pending Review</span>
                    <span className="text-slate-300">{metrics.pendingReview}</span>
                  </div>
                </div>
                <div className="pt-2 border-t border-slate-700/30">
                  <span className="text-xs text-slate-500">+8 this week</span>
                </div>
              </button>

              {/* Cases w/ Concerns */}
              <button
                onClick={() => navigate(createPageUrl('CriminalHistoryReview'))}
                className="bg-slate-800/20 border border-slate-700/40 rounded-lg p-5 hover:bg-slate-800/30 transition-all text-left group"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                    <span className="text-xs text-slate-500 uppercase tracking-wide font-medium">Documented Concerns</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-slate-400 transition-all" />
                </div>
                <p className="text-2xl font-semibold text-white mb-3">{metrics.casesWithConcerns}</p>
                <div className="space-y-1.5 mb-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">Criminal History</span>
                    <span className="text-slate-300">3</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">Financial Issues</span>
                    <span className="text-slate-300">3</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">Employment Gaps</span>
                    <span className="text-slate-300">2</span>
                  </div>
                </div>
                <div className="pt-2 border-t border-slate-700/30">
                  <span className="text-xs text-slate-500">5 awaiting review</span>
                </div>
              </button>

              {/* Completed */}
              <button
                onClick={() => navigate(createPageUrl('CaseClosure'))}
                className="bg-slate-800/20 border border-slate-700/40 rounded-lg p-5 hover:bg-slate-800/30 transition-all text-left group"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-xs text-slate-500 uppercase tracking-wide font-medium">Completed This Month</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-slate-400 transition-all" />
                </div>
                <p className="text-2xl font-semibold text-white mb-3">{metrics.completedThisMonth}</p>
                <div className="space-y-1.5 mb-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">Cleared for Hire</span>
                    <span className="text-slate-300">{metrics.clearedForHire}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">Not Recommended</span>
                    <span className="text-slate-300">{metrics.notRecommended}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">Monthly Target</span>
                    <span className="text-slate-300">35</span>
                  </div>
                </div>
                <div className="pt-2 border-t border-slate-700/30">
                  <span className="text-xs text-slate-500">+15% vs. last month</span>
                </div>
              </button>

              {/* Avg Turnaround */}
              <button
                onClick={() => navigate(createPageUrl('BIReports'))}
                className="bg-slate-800/20 border border-slate-700/40 rounded-lg p-5 hover:bg-slate-800/30 transition-all text-left group"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
                    <span className="text-xs text-slate-500 uppercase tracking-wide font-medium">Avg Turnaround</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-slate-400 transition-all" />
                </div>
                <p className="text-2xl font-semibold text-white mb-3">{metrics.avgCompletionDays}<span className="text-base text-slate-500 ml-1">days</span></p>
                <div className="space-y-1.5 mb-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">SLA Target</span>
                    <span className="text-slate-300">{metrics.slaTarget} days</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">Ahead of Target</span>
                    <span className="text-slate-300">3.5 days</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">Fastest This Month</span>
                    <span className="text-slate-300">8 days</span>
                  </div>
                </div>
                <div className="pt-2 border-t border-slate-700/30">
                  <span className="text-xs text-slate-500">-2 days vs. Q3</span>
                </div>
              </button>
            </div>

            {/* Secondary Metrics — flat, uniform */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="bg-slate-800/20 border border-slate-700/40 rounded-lg p-5">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
                  <span className="text-xs text-slate-500 uppercase tracking-wide font-medium">Today</span>
                </div>
                <p className="text-xl font-semibold text-white mb-1">{metrics.interviewsToday}</p>
                <p className="text-xs text-slate-400">Reference Interviews Scheduled</p>
                <p className="text-xs text-slate-500 mt-2">Next: 10:30 AM — Thompson ref #2</p>
              </div>

              <div className="bg-slate-800/20 border border-slate-700/40 rounded-lg p-5">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                  <span className="text-xs text-slate-500 uppercase tracking-wide font-medium">Pending</span>
                </div>
                <p className="text-xl font-semibold text-white mb-1">{metrics.referencesPending}</p>
                <p className="text-xs text-slate-400">References Awaiting Contact</p>
                <p className="text-xs text-slate-500 mt-2">Avg response time: 2.3 days</p>
              </div>

              <div className="bg-slate-800/20 border border-slate-700/40 rounded-lg p-5">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                  <span className="text-xs text-slate-500 uppercase tracking-wide font-medium">Overdue</span>
                </div>
                <p className="text-xl font-semibold text-white mb-1">{metrics.overdueItems}</p>
                <p className="text-xs text-slate-400">Overdue Items</p>
                <p className="text-xs text-slate-500 mt-2">Oldest: 4 days — Johnson refs</p>
              </div>

              <div className="bg-slate-800/20 border border-slate-700/40 rounded-lg p-5">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
                  <span className="text-xs text-slate-500 uppercase tracking-wide font-medium">Queue</span>
                </div>
                <p className="text-xl font-semibold text-white mb-1">{metrics.pendingReview}</p>
                <p className="text-xs text-slate-400">Awaiting Supervisor Review</p>
                <p className="text-xs text-slate-500 mt-2">Avg wait: 1.2 days</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Investigation Pipeline — neutral bars, SLA stats */}
              <div className="bg-slate-800/20 border border-slate-700/40 rounded-lg p-5">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <h3 className="text-[13px] font-semibold text-white uppercase tracking-wide">Investigation Pipeline</h3>
                    <p className="text-xs text-slate-500 mt-1">47 total active investigations by stage</p>
                  </div>
                  <button
                    onClick={() => navigate(createPageUrl('CaseManagement'))}
                    className="text-[13px] text-slate-400 hover:text-slate-300"
                  >
                    View All →
                  </button>
                </div>
                <div className="space-y-4">
                  {investigationStages.map((stage, idx) => {
                    const isBreaching = stage.stage === 'Supervisor Review';
                    return (
                      <div key={idx}>
                        <div className="flex items-center justify-between mb-1.5">
                          <div className="flex items-center gap-2">
                            <span className="text-[13px] text-slate-300">{stage.stage}</span>
                            <span className="text-xs text-slate-600">— {stage.description}</span>
                          </div>
                          <span className="text-[13px] font-semibold text-slate-300">{stage.count}</span>
                        </div>
                        <div className="w-full h-2 bg-slate-700/40 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all ${isBreaching ? 'bg-red-500/70' : 'bg-slate-500/60'}`}
                            style={{ width: `${(stage.count / 47) * 100}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-5 pt-4 border-t border-slate-700/30 grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-slate-500">Avg Case Age:</span>
                    <span className="text-white ml-2 font-medium">{metrics.avgCaseAge} days</span>
                  </div>
                  <div>
                    <span className="text-slate-500">SLA Breach Cases:</span>
                    <span className="text-white ml-2 font-medium">{metrics.slaBreachCases}</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Avg Pipeline Time:</span>
                    <span className="text-white ml-2 font-medium">14.5 days</span>
                  </div>
                  <div>
                    <span className="text-slate-500">SLA Target:</span>
                    <span className="text-white ml-2 font-medium">{metrics.slaTarget} days</span>
                  </div>
                </div>
              </div>

              {/* Recent Activity — monochrome, consistent metadata */}
              <div className="bg-slate-800/20 border border-slate-700/40 rounded-lg p-5">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-[13px] font-semibold text-white uppercase tracking-wide">Recent Activity</h3>
                  <span className="text-xs text-slate-500">Last 24 hours</span>
                </div>
                <div className="space-y-2">
                  {recentActivity.map(activity => {
                    const statusDot = activity.type === 'flag' ? 'bg-red-400' :
                      activity.type === 'complete' ? 'bg-green-400' : 'bg-slate-500';
                    return (
                      <div key={activity.id} className="flex items-start gap-3 px-4 py-3 bg-slate-900/30 rounded-lg hover:bg-slate-800/30 transition-all cursor-pointer">
                        <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${statusDot}`}></div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[13px] text-slate-300">{activity.message}</p>
                          <div className="flex items-center gap-2 mt-1.5">
                            <span className="text-xs text-slate-500">{activity.user}</span>
                            <span className="text-slate-700">|</span>
                            <span className="text-xs text-slate-500">{activity.time}</span>
                            <span className="text-slate-700">|</span>
                            <span className="text-xs text-slate-500">{activity.detail}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Priority Cases — structured rows, minimal color */}
            <div className="bg-slate-800/20 border border-slate-700/40 rounded-lg p-5 mb-8">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-[13px] font-semibold text-white uppercase tracking-wide">Priority Cases Requiring Action</h3>
                <button
                  onClick={() => navigate(createPageUrl('ActiveCases'))}
                  className="text-[13px] text-slate-400 hover:text-slate-300 font-medium"
                >
                  View All →
                </button>
              </div>
              <div className="space-y-2">
                {priorityCases.map(caseItem => (
                  <div key={caseItem.id} className="flex items-center gap-4 px-4 py-4 bg-slate-900/30 rounded-lg hover:bg-slate-800/30 transition-all cursor-pointer">
                    {/* Left: Name, Case ID, Position */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3">
                        <span className={`w-2 h-2 rounded-full flex-shrink-0 ${
                          caseItem.priority === 'high' ? 'bg-red-400' :
                          caseItem.priority === 'medium' ? 'bg-amber-400' : 'bg-slate-500'
                        }`}></span>
                        <span className="text-[13px] font-semibold text-white">{caseItem.subject}</span>
                        <span className="text-xs text-slate-600">{caseItem.caseNumber}</span>
                      </div>
                      <span className="text-xs text-slate-500 ml-5">{caseItem.position}</span>
                    </div>

                    {/* Center: Stage, Days Open */}
                    <div className="flex-shrink-0 text-center w-48">
                      <span className="text-[13px] text-slate-300">{caseItem.stage}</span>
                      <div className="text-xs text-slate-500">{caseItem.daysOpen} days open</div>
                    </div>

                    {/* Right: Next Action, Investigator */}
                    <div className="flex-shrink-0 text-right w-56">
                      <span className="text-[13px] text-slate-300">{caseItem.nextAction}</span>
                      <div className="text-xs text-slate-500">{caseItem.investigator}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Deadlines — timeline-based by urgency window */}
            <div className="bg-slate-800/20 border border-slate-700/40 rounded-lg p-5 mb-8">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-[13px] font-semibold text-white uppercase tracking-wide">Upcoming Deadlines</h3>
                <span className="text-xs text-slate-500">Compliance and SLA-driven milestones</span>
              </div>

              {/* Today */}
              {upcomingDeadlines.filter(d => d.urgencyGroup === 'today').length > 0 && (
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Today</span>
                  </div>
                  {upcomingDeadlines.filter(d => d.urgencyGroup === 'today').map(deadline => (
                    <div key={deadline.id} className="flex items-center gap-4 px-4 py-3 bg-slate-900/30 rounded-lg border-l-4 border-l-red-500/70 ml-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3">
                          <span className="text-[13px] font-semibold text-white">{deadline.subject}</span>
                          <span className="text-xs text-slate-600">{deadline.caseNumber}</span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1">{deadline.task}</p>
                      </div>
                      <span className="text-xs text-slate-500">{deadline.compliance}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Tomorrow */}
              {upcomingDeadlines.filter(d => d.urgencyGroup === 'tomorrow').length > 0 && (
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Tomorrow</span>
                  </div>
                  {upcomingDeadlines.filter(d => d.urgencyGroup === 'tomorrow').map(deadline => (
                    <div key={deadline.id} className="flex items-center gap-4 px-4 py-3 bg-slate-900/30 rounded-lg border-l-4 border-l-amber-500/50 ml-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3">
                          <span className="text-[13px] font-semibold text-white">{deadline.subject}</span>
                          <span className="text-xs text-slate-600">{deadline.caseNumber}</span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1">{deadline.task}</p>
                      </div>
                      <span className="text-xs text-slate-500">{deadline.compliance}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* 3 Days */}
              {upcomingDeadlines.filter(d => d.urgencyGroup === '3day').length > 0 && (
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-slate-500 rounded-full"></div>
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Within 3 Days</span>
                  </div>
                  {upcomingDeadlines.filter(d => d.urgencyGroup === '3day').map(deadline => (
                    <div key={deadline.id} className="flex items-center gap-4 px-4 py-3 bg-slate-900/30 rounded-lg border-l-4 border-l-slate-600/50 ml-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3">
                          <span className="text-[13px] font-semibold text-white">{deadline.subject}</span>
                          <span className="text-xs text-slate-600">{deadline.caseNumber}</span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1">{deadline.task}</p>
                      </div>
                      <span className="text-xs text-slate-500">{deadline.compliance}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* 7 Days */}
              {upcomingDeadlines.filter(d => d.urgencyGroup === '7day').length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-slate-600 rounded-full"></div>
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Within 7 Days</span>
                  </div>
                  {upcomingDeadlines.filter(d => d.urgencyGroup === '7day').map(deadline => (
                    <div key={deadline.id} className="flex items-center gap-4 px-4 py-3 bg-slate-900/30 rounded-lg border-l-4 border-l-slate-700/50 ml-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3">
                          <span className="text-[13px] font-semibold text-white">{deadline.subject}</span>
                          <span className="text-xs text-slate-600">{deadline.caseNumber}</span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1">{deadline.task}</p>
                      </div>
                      <span className="text-xs text-slate-500">{deadline.compliance}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Audit Log Footer — institutional trust */}
            <div className="mb-4 px-5 py-3 bg-slate-800/10 border border-slate-800/30 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Shield className="w-3.5 h-3.5 text-slate-600" />
                  <span className="text-xs text-slate-600">All adjudication decisions logged with timestamp and user ID. Audit trail maintained per GCSO Policy 4.12.</span>
                </div>
                <button
                  onClick={() => navigate(createPageUrl('InvestigationTimeline'))}
                  className="text-xs text-slate-500 hover:text-slate-400"
                >
                  View Audit Log
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Quick Help Button */}
      <button
        onClick={() => setChatOpen(!chatOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-slate-700 hover:bg-slate-600 rounded-full shadow-lg flex items-center justify-center transition-all z-40"
      >
        {chatOpen ? <X className="w-6 h-6 text-white" /> : <MessageCircle className="w-6 h-6 text-slate-300" />}
      </button>

      {chatOpen && (
        <div className="fixed bottom-24 right-6 w-full max-w-96 bg-slate-900/95 backdrop-blur-xl border border-slate-700/50 rounded-xl shadow-2xl flex flex-col z-40 mx-4 sm:mx-0">
          <div className="p-4 border-b border-slate-700/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-slate-300" />
              </div>
              <div>
                <h3 className="text-[13px] font-semibold text-white">BI Support & Resources</h3>
                <p className="text-xs text-slate-500">Quick links and assistance</p>
              </div>
            </div>
          </div>
          <div className="p-4 space-y-2">
            <button className="w-full flex items-center gap-3 p-3 bg-slate-800/30 hover:bg-slate-800/50 rounded-lg transition-all text-left">
              <FileText className="w-5 h-5 text-slate-400" />
              <div>
                <p className="text-[13px] text-white font-medium">Investigation Guidelines</p>
                <p className="text-xs text-slate-500">POST standards & procedures</p>
              </div>
            </button>
            <button className="w-full flex items-center gap-3 p-3 bg-slate-800/30 hover:bg-slate-800/50 rounded-lg transition-all text-left">
              <ClipboardCheck className="w-5 h-5 text-slate-400" />
              <div>
                <p className="text-[13px] text-white font-medium">Adjudication Checklist</p>
                <p className="text-xs text-slate-500">Review requirements</p>
              </div>
            </button>
            <button className="w-full flex items-center gap-3 p-3 bg-slate-800/30 hover:bg-slate-800/50 rounded-lg transition-all text-left">
              <Phone className="w-5 h-5 text-slate-400" />
              <div>
                <p className="text-[13px] text-white font-medium">Contact IT Support</p>
                <p className="text-xs text-slate-500">Technical assistance</p>
              </div>
            </button>
            <button className="w-full flex items-center gap-3 p-3 bg-slate-800/30 hover:bg-slate-800/50 rounded-lg transition-all text-left">
              <Scale className="w-5 h-5 text-slate-400" />
              <div>
                <p className="text-[13px] text-white font-medium">Legal Reference</p>
                <p className="text-xs text-slate-500">Compliance documentation</p>
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

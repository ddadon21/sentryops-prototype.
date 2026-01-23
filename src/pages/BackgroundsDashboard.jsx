import React, { useState, useEffect } from 'react';
import { LayoutDashboard, FolderOpen, FileText, Clock, UserCheck, Calendar, FileCheck, CheckCircle, TrendingUp, AlertTriangle, DollarSign, Eye, Activity, XCircle, Settings, Bell, MessageCircle, Search, ChevronRight, Shield, X, Menu, ChevronLeft, LogOut, Filter, Users, Target, ArrowUpRight, ArrowDownRight, Download, Briefcase, ClipboardCheck, Scale, Building2, ChevronDown, User, RefreshCw, CalendarClock, AlertCircle, FileWarning, ShieldAlert, FileSearch, Phone, Gavel, CreditCard, Hourglass, CheckCircle2, CircleDot } from 'lucide-react';
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

  // Update time every minute
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
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [profileMenuOpen, notificationsOpen]);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  };

  const navigation = [
    { id: 'bi-dashboard', label: 'BI Dashboard', icon: LayoutDashboard },
    { id: 'active-cases', label: 'Active Cases', icon: FolderOpen, page: 'ActiveCases' },
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
    { id: 'case-closure', label: 'Case Closure', icon: XCircle, page: 'CaseClosure' },
    { id: 'settings', label: 'Settings', icon: Settings, page: 'BISettings' }
  ];

  const notifications = [
    { id: 1, title: 'Background Check Complete', message: 'Marcus Johnson - Deputy Sheriff cleared', time: '15 min ago', urgent: false },
    { id: 2, title: 'Criminal History Flag', message: 'Robert Martinez - requires review', time: '1 hour ago', urgent: true },
    { id: 3, title: 'Employment Gap Detected', message: 'Lisa Chen - 6 month gap found', time: '2 hours ago', urgent: true },
    { id: 4, title: 'Reference Interview Due', message: '3 reference calls scheduled today', time: '3 hours ago', urgent: true },
    { id: 5, title: 'Case Deadline Approaching', message: 'Thompson case - 5 days remaining', time: '4 hours ago', urgent: false }
  ];

  // Key metrics
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
    slaTarget: 18
  };

  // Active investigations by stage
  const investigationStages = [
    { stage: 'Application Review', count: 12, color: 'blue', description: 'Initial documentation review' },
    { stage: 'Reference Interviews', count: 15, color: 'purple', description: '8 scheduled today' },
    { stage: 'Employment Verification', count: 8, color: 'amber', description: '3 awaiting employer response' },
    { stage: 'Background Checks', count: 7, color: 'red', description: 'Criminal, financial, social media' },
    { stage: 'Supervisor Review', count: 5, color: 'green', description: 'Final adjudication pending' }
  ];

  // Recent case activity
  const recentActivity = [
    { id: 1, type: 'complete', message: 'Investigation finalized — Elena Rodriguez cleared for hire as Background Investigator', time: '30 min ago', icon: CheckCircle, color: 'green', detail: 'Case #BI-2024-0847' },
    { id: 2, type: 'flag', message: 'Documented concern — David Kim (Deputy Sheriff) financial background requires supervisor review', time: '2 hours ago', icon: AlertCircle, color: 'red', detail: 'Outstanding debt: $47,500' },
    { id: 3, type: 'interview', message: 'Reference interview completed — Marcus Johnson, former supervisor contacted', time: '3 hours ago', icon: Phone, color: 'purple', detail: 'Positive feedback documented' },
    { id: 4, type: 'new', message: 'New investigation initiated — Sarah Chen applying for Detention Officer position', time: '5 hours ago', icon: FolderOpen, color: 'blue', detail: 'Case #BI-2024-0892 assigned' },
    { id: 5, type: 'update', message: 'Employment verification received — Robert Martinez, Metro PD confirmed 3-year tenure', time: '1 day ago', icon: Building2, color: 'amber', detail: 'No adverse findings' }
  ];

  // Priority cases requiring attention
  const priorityCases = [
    { id: 1, subject: 'Marcus Johnson', position: 'Deputy Sheriff', status: 'Supervisor Review', daysOpen: 12, priority: 'high', investigator: 'Inv. Smith', reason: 'Prior misdemeanor requires adjudication', nextAction: 'Supervisor sign-off needed', caseNumber: 'BI-2024-0831' },
    { id: 2, subject: 'Lisa Martinez', position: 'Background Investigator', status: 'Reference Checks', daysOpen: 8, priority: 'high', investigator: 'Inv. Wilson', reason: '2 of 5 references unresponsive', nextAction: 'Attempt alternate contacts', caseNumber: 'BI-2024-0856' },
    { id: 3, subject: 'David Chen', position: 'Deputy Sheriff', status: 'Financial Review', daysOpen: 15, priority: 'medium', investigator: 'Inv. Smith', reason: 'Credit report shows collections', nextAction: 'Request documentation', caseNumber: 'BI-2024-0819' },
    { id: 4, subject: 'Sarah Thompson', position: 'Detention Officer', status: 'Employment Verification', daysOpen: 5, priority: 'low', investigator: 'Inv. Davis', reason: 'Employer HR slow to respond', nextAction: 'Follow up Friday', caseNumber: 'BI-2024-0878' }
  ];

  // Upcoming deadlines
  const upcomingDeadlines = [
    { id: 1, subject: 'Marcus Johnson', task: 'Supervisor adjudication decision', dueDate: 'Today', daysLeft: 0, caseNumber: 'BI-2024-0831', compliance: 'POST certification timeline' },
    { id: 2, subject: 'Lisa Martinez', task: 'Complete reference interviews (3 remaining)', dueDate: 'Tomorrow', daysLeft: 1, caseNumber: 'BI-2024-0856', compliance: 'Hiring deadline: Dec 15' },
    { id: 3, subject: 'David Chen', task: 'Financial documentation review', dueDate: 'Dec 5', daysLeft: 3, caseNumber: 'BI-2024-0819', compliance: 'SLA: 18 days max' }
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

  const getChangeIcon = (value) => {
    return value > 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />;
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

        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {navigation.map(item => {
            const Icon = item.icon;
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavigation(item)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/20' : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
                } ${sidebarCollapsed ? 'justify-center' : ''}`}
                title={sidebarCollapsed ? item.label : ''}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {!sidebarCollapsed && (
                  <>
                    <span className="flex-1 text-left text-sm font-medium truncate">{item.label}</span>
                    {item.badge && <span className={`px-2 py-0.5 rounded-full text-xs ${isActive ? 'bg-white/20' : 'bg-red-500 text-white'}`}>{item.badge}</span>}
                  </>
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
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-slate-400 hover:bg-slate-800/40 hover:text-slate-300 ${sidebarCollapsed ? 'justify-center' : ''}`}
              title={sidebarCollapsed ? 'Sign Out' : ''}
            >
              <LogOut className="w-5 h-5 flex-shrink-0" />
              {!sidebarCollapsed && (
                <span className="flex-1 text-left text-sm font-medium">Sign Out</span>
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
          <div className="relative bg-slate-900 border border-slate-700/50 rounded-2xl p-6 max-w-sm w-full shadow-2xl">
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
                <input type="text" placeholder="Search cases, subjects, investigators..." className="w-full pl-12 pr-4 py-2 bg-slate-800/40 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50" />
              </div>
            </div>
            <div className="flex items-center gap-2 lg:gap-3">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-4 py-2 bg-slate-800/40 border border-slate-700/50 rounded-xl text-white text-sm focus:outline-none focus:border-amber-500/50"
              >
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="quarter">This Quarter</option>
                <option value="year">This Year</option>
              </select>

              <div className="relative">
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
                        <h3 className="text-sm font-semibold text-white">Notifications</h3>
                        <span className="px-2 py-0.5 bg-red-500/20 border border-red-500/30 text-red-400 text-xs rounded-full">{notifications.filter(n => n.urgent).length} urgent</span>
                      </div>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.map(notification => (
                        <div key={notification.id} className={`p-4 border-b border-slate-800/30 hover:bg-slate-800/30 cursor-pointer transition-colors ${notification.urgent ? 'bg-amber-500/5' : ''}`}>
                          <div className="flex items-start gap-3">
                            <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${notification.urgent ? 'bg-amber-400' : 'bg-blue-400'}`}></div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-white mb-1">{notification.title}</p>
                              <p className="text-xs text-slate-400 mb-2">{notification.message}</p>
                              <p className="text-xs text-slate-500">{notification.time}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-3 border-t border-slate-700/50">
                      <button className="w-full text-center text-sm text-amber-400 hover:text-amber-300 font-medium">View All Notifications</button>
                    </div>
                  </div>
                )}
              </div>

              <div className="h-8 w-px bg-slate-700/50"></div>

              <div className="relative profile-menu-container">
                <button
                  onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                  className="flex items-center gap-3 p-1.5 pr-3 hover:bg-slate-800/50 rounded-xl transition-colors"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">BI</span>
                  </div>
                  <div className="hidden sm:block text-left">
                    <p className="text-sm font-medium text-white">BI Supervisor</p>
                    <p className="text-xs text-slate-400">Background Investigations</p>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-slate-400 hidden sm:block transition-transform ${profileMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {profileMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-56 bg-slate-900/95 backdrop-blur-xl border border-slate-700/50 rounded-xl shadow-2xl z-50 py-2">
                    <div className="px-4 py-3 border-b border-slate-700/50">
                      <p className="text-sm font-medium text-white">BI Supervisor</p>
                      <p className="text-xs text-slate-400">bi.supervisor@gcso.gov</p>
                    </div>
                    <div className="py-1">
                      <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-300 hover:bg-slate-800/50 transition-colors">
                        <User className="w-4 h-4" />
                        View Profile
                      </button>
                      <button
                        onClick={() => navigate(createPageUrl('BISettings'))}
                        className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-300 hover:bg-slate-800/50 transition-colors"
                      >
                        <Settings className="w-4 h-4" />
                        Settings
                      </button>
                    </div>
                    <div className="border-t border-slate-700/50 py-1">
                      <button
                        onClick={() => setLogoutConfirmOpen(true)}
                        className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-400 hover:bg-slate-800/50 transition-colors"
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

        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <div className="max-w-7xl mx-auto">
            {/* Header with date and quick actions */}
            <div className="mb-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-2xl lg:text-3xl font-bold text-white">Background Investigations Overview</h2>
                  <span className="px-3 py-1 bg-green-500/20 border border-green-500/30 text-green-400 text-xs font-bold rounded-full flex items-center gap-1.5">
                    <CircleDot className="w-3 h-3" />
                    LIVE
                  </span>
                </div>
                <div className="flex items-center gap-3 text-slate-400 flex-wrap">
                  <span className="text-sm">{formatDate(currentTime)}</span>
                  <span className="text-slate-600">•</span>
                  <span className="text-amber-400 font-medium">{formatTime(currentTime)} EST</span>
                  <span className="text-slate-600">•</span>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <RefreshCw className="w-3 h-3" />
                    <span>Auto-refresh: 2 min</span>
                  </div>
                </div>
              </div>

              {/* Quick Actions Bar */}
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={() => navigate(createPageUrl('ActiveCases'))}
                  className="flex items-center gap-2 px-4 py-2 bg-purple-500/20 border border-purple-500/30 text-purple-400 rounded-xl text-sm font-medium hover:bg-purple-500/30 transition-all"
                >
                  <FolderOpen className="w-4 h-4" />
                  Active Cases
                </button>
                <button
                  onClick={() => navigate(createPageUrl('CriminalHistoryReview'))}
                  className="flex items-center gap-2 px-4 py-2 bg-red-500/20 border border-red-500/30 text-red-400 rounded-xl text-sm font-medium hover:bg-red-500/30 transition-all"
                >
                  <AlertCircle className="w-4 h-4" />
                  Cases w/ Concerns
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-amber-500/20 border border-amber-500/30 text-amber-400 rounded-xl text-sm font-medium hover:bg-amber-500/30 transition-all">
                  <FileSearch className="w-4 h-4" />
                  Pending Review
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-slate-700/40 border border-slate-600/50 text-slate-300 rounded-xl text-sm font-medium hover:bg-slate-700/60 transition-all">
                  <Download className="w-4 h-4" />
                  Export Report
                </button>
              </div>
            </div>

            {/* Supervisor Review Required Banner */}
            {supervisorReviewVisible && (
              <div className="mb-6 bg-gradient-to-br from-red-500/10 to-amber-500/5 border border-red-500/20 rounded-xl p-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-red-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <ShieldAlert className="w-6 h-6 text-red-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <h4 className="text-base font-semibold text-white">SUPERVISOR REVIEW REQUIRED</h4>
                        <span className="px-2 py-0.5 bg-red-500/20 border border-red-500/30 text-red-400 text-xs font-bold rounded-full">5 PENDING</span>
                      </div>
                      <button
                        onClick={() => setSupervisorReviewVisible(false)}
                        className="text-slate-400 hover:text-white transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {/* Criminal History Concerns */}
                      <div className="bg-slate-900/50 rounded-lg p-3 border border-red-500/20">
                        <div className="flex items-center gap-2 mb-2">
                          <Gavel className="w-4 h-4 text-red-400" />
                          <span className="text-xs font-semibold text-red-400 uppercase">Criminal History</span>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-start gap-2">
                            <AlertCircle className="w-3.5 h-3.5 text-red-400 mt-0.5 flex-shrink-0" />
                            <p className="text-xs text-slate-300"><span className="font-semibold text-white">Marcus Johnson</span> — Prior misdemeanor arrest (2019), requires adjudication review</p>
                          </div>
                          <div className="flex items-start gap-2">
                            <AlertCircle className="w-3.5 h-3.5 text-red-400 mt-0.5 flex-shrink-0" />
                            <p className="text-xs text-slate-300"><span className="font-semibold text-white">Robert Martinez</span> — Discrepancy in disclosed vs. documented history</p>
                          </div>
                        </div>
                      </div>

                      {/* Financial Concerns */}
                      <div className="bg-slate-900/50 rounded-lg p-3 border border-amber-500/20">
                        <div className="flex items-center gap-2 mb-2">
                          <CreditCard className="w-4 h-4 text-amber-400" />
                          <span className="text-xs font-semibold text-amber-400 uppercase">Financial Background</span>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-start gap-2">
                            <AlertTriangle className="w-3.5 h-3.5 text-amber-400 mt-0.5 flex-shrink-0" />
                            <p className="text-xs text-slate-300"><span className="font-semibold text-white">David Kim</span> — Outstanding debt exceeds threshold ($47,500)</p>
                          </div>
                          <div className="flex items-start gap-2">
                            <AlertTriangle className="w-3.5 h-3.5 text-amber-400 mt-0.5 flex-shrink-0" />
                            <p className="text-xs text-slate-300"><span className="font-semibold text-white">Jennifer Lopez</span> — Recent bankruptcy filing requires evaluation</p>
                          </div>
                        </div>
                      </div>

                      {/* Employment Verification Issues */}
                      <div className="bg-slate-900/50 rounded-lg p-3 border border-blue-500/20">
                        <div className="flex items-center gap-2 mb-2">
                          <Building2 className="w-4 h-4 text-blue-400" />
                          <span className="text-xs font-semibold text-blue-400 uppercase">Employment Discrepancy</span>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-start gap-2">
                            <FileWarning className="w-3.5 h-3.5 text-blue-400 mt-0.5 flex-shrink-0" />
                            <p className="text-xs text-slate-300"><span className="font-semibold text-white">Lisa Chen</span> — 6-month gap in employment history unexplained</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-slate-700/50 flex items-center justify-between">
                      <p className="text-xs text-slate-500">Cases requiring supervisor sign-off before proceeding</p>
                      <button
                        onClick={() => navigate(createPageUrl('CaseManagement'))}
                        className="text-sm text-amber-400 hover:text-amber-300 font-medium"
                      >
                        Review All Pending →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Investigation Status Summary */}
            <div className="mb-6 bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/20 rounded-xl p-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <ClipboardCheck className="w-6 h-6 text-blue-400" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-base font-semibold text-white">Investigation Status Summary</h4>
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <RefreshCw className="w-3 h-3" />
                      <span>Last sync: 2 min ago</span>
                    </div>
                  </div>

                  {/* REQUIRES ACTION */}
                  <div className="mb-4 pb-4 border-b border-blue-500/20">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <h5 className="text-sm font-semibold text-red-400">REQUIRES ACTION</h5>
                    </div>
                    <div className="space-y-1.5 text-sm">
                      <div className="flex items-start gap-2">
                        <Hourglass className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                        <p className="text-slate-300"><span className="font-semibold text-red-400">3 overdue items</span> — Reference checks pending for Thompson, Davis, Williams</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <ShieldAlert className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                        <p className="text-slate-300"><span className="font-semibold text-red-400">5 cases with documented concerns</span> — Awaiting supervisor adjudication</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <FileWarning className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                        <p className="text-slate-300"><span className="font-semibold text-red-400">2 compliance deadlines</span> — POST certification expires in 48 hours</p>
                      </div>
                    </div>
                  </div>

                  {/* IN PROGRESS */}
                  <div className="mb-4 pb-4 border-b border-blue-500/20">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                      <h5 className="text-sm font-semibold text-amber-400">IN PROGRESS</h5>
                    </div>
                    <div className="space-y-1.5 text-sm">
                      <div className="flex items-start gap-2">
                        <FolderOpen className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                        <p className="text-slate-300"><span className="font-semibold text-amber-400">47 active investigations</span> — 12 initial review, 15 reference checks, 8 verifications, 7 history review, 5 final review</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <Phone className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                        <p className="text-slate-300"><span className="font-semibold text-amber-400">15 reference checks pending</span> — 8 interviews scheduled today</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <FileSearch className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                        <p className="text-slate-300"><span className="font-semibold text-amber-400">12 awaiting supervisor review</span> — Average wait: 1.2 days</p>
                      </div>
                    </div>
                  </div>

                  {/* COMPLETED THIS MONTH */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <h5 className="text-sm font-semibold text-green-400">COMPLETED THIS MONTH</h5>
                    </div>
                    <div className="space-y-1.5 text-sm">
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <p className="text-slate-300"><span className="font-semibold text-green-400">28 investigations finalized</span> — 22 cleared for hire, 6 not recommended</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <Clock className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <p className="text-slate-300"><span className="font-semibold text-green-400">14.5 day average turnaround</span> — 3.5 days ahead of 18-day SLA target</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <Target className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <p className="text-slate-300"><span className="font-semibold text-green-400">On track for monthly target</span> — 28 of 35 projected (80%)</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6">
              {/* Active Cases Card */}
              <button
                onClick={() => navigate(createPageUrl('ActiveCases'))}
                className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-6 hover:border-slate-600/50 transition-all text-left group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-purple-500/20">
                    <FolderOpen className="w-6 h-6 text-purple-400" />
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
                </div>
                <p className="text-3xl font-bold text-white mb-1">{metrics.activeCases}</p>
                <p className="text-sm text-slate-400 mb-3">Active Investigations</p>
                <div className="space-y-1.5 mb-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">Initial Review</span>
                    <span className="text-purple-400 font-medium">12</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">Reference Checks</span>
                    <span className="text-purple-400 font-medium">15</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">Pending Review</span>
                    <span className="text-amber-400 font-medium">{metrics.pendingReview}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-slate-700/30">
                  <span className="text-xs font-medium text-green-400">+8 this week</span>
                  <span className="text-xs text-slate-500">vs. last month</span>
                </div>
              </button>

              {/* Cases w/ Concerns Card */}
              <button
                onClick={() => navigate(createPageUrl('CriminalHistoryReview'))}
                className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-6 hover:border-slate-600/50 transition-all text-left group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-red-500/20">
                    <AlertCircle className="w-6 h-6 text-red-400" />
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
                </div>
                <p className="text-3xl font-bold text-white mb-1">{metrics.casesWithConcerns}</p>
                <p className="text-sm text-slate-400 mb-3">Cases w/ Documented Concerns</p>
                <div className="space-y-1.5 mb-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">Criminal History</span>
                    <span className="text-red-400 font-medium">3</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">Financial Issues</span>
                    <span className="text-amber-400 font-medium">3</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">Employment Gaps</span>
                    <span className="text-blue-400 font-medium">2</span>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-slate-700/30">
                  <span className="text-xs font-medium text-red-400">5 awaiting review</span>
                  <span className="text-xs text-slate-500">Supervisor queue</span>
                </div>
              </button>

              {/* Completed Card */}
              <button
                onClick={() => navigate(createPageUrl('CaseClosure'))}
                className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-6 hover:border-slate-600/50 transition-all text-left group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-green-500/20">
                    <CheckCircle className="w-6 h-6 text-green-400" />
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
                </div>
                <p className="text-3xl font-bold text-white mb-1">{metrics.completedThisMonth}</p>
                <p className="text-sm text-slate-400 mb-3">Completed This Month</p>
                <div className="space-y-1.5 mb-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">Cleared for Hire</span>
                    <span className="text-green-400 font-medium">{metrics.clearedForHire}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">Not Recommended</span>
                    <span className="text-red-400 font-medium">{metrics.notRecommended}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">Monthly Target</span>
                    <span className="text-slate-400 font-medium">35</span>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-slate-700/30">
                  <span className="text-xs font-medium text-green-400">+15% vs. last month</span>
                  <span className="text-xs text-slate-500">80% of target</span>
                </div>
              </button>

              {/* Avg Turnaround Card */}
              <button
                onClick={() => navigate(createPageUrl('BIReports'))}
                className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-6 hover:border-slate-600/50 transition-all text-left group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-blue-500/20">
                    <Clock className="w-6 h-6 text-blue-400" />
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
                </div>
                <p className="text-3xl font-bold text-white mb-1">{metrics.avgCompletionDays}<span className="text-lg text-slate-400 ml-1">days</span></p>
                <p className="text-sm text-slate-400 mb-3">Avg Turnaround Time</p>
                <div className="space-y-1.5 mb-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">SLA Target</span>
                    <span className="text-slate-400 font-medium">{metrics.slaTarget} days</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">Ahead of Target</span>
                    <span className="text-green-400 font-medium">3.5 days</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">Fastest This Month</span>
                    <span className="text-blue-400 font-medium">8 days</span>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-slate-700/30">
                  <span className="text-xs font-medium text-green-400">-2 days vs. Q3</span>
                  <span className="text-xs text-slate-500">Improving</span>
                </div>
              </button>
            </div>

            {/* Secondary Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-5">
                <div className="flex items-center justify-between mb-2">
                  <Phone className="w-5 h-5 text-purple-400" />
                  <span className="px-2 py-0.5 bg-purple-500/20 text-purple-400 text-xs font-bold rounded-full">TODAY</span>
                </div>
                <p className="text-xl font-bold text-white mb-1">{metrics.interviewsToday}</p>
                <p className="text-xs text-slate-400">Reference Interviews Scheduled</p>
                <p className="text-xs text-slate-500 mt-1">Next: 10:30 AM — Thompson ref #2</p>
              </div>

              <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-5">
                <div className="flex items-center justify-between mb-2">
                  <Users className="w-5 h-5 text-amber-400" />
                  <span className="px-2 py-0.5 bg-amber-500/20 text-amber-400 text-xs font-bold rounded-full">PENDING</span>
                </div>
                <p className="text-xl font-bold text-white mb-1">{metrics.referencesPending}</p>
                <p className="text-xs text-slate-400">References Awaiting Contact</p>
                <p className="text-xs text-slate-500 mt-1">Avg response time: 2.3 days</p>
              </div>

              <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-5">
                <div className="flex items-center justify-between mb-2">
                  <Hourglass className="w-5 h-5 text-red-400" />
                  <span className="px-2 py-0.5 bg-red-500/20 text-red-400 text-xs font-bold rounded-full">URGENT</span>
                </div>
                <p className="text-xl font-bold text-white mb-1">{metrics.overdueItems}</p>
                <p className="text-xs text-slate-400">Overdue Items</p>
                <p className="text-xs text-slate-500 mt-1">Oldest: 4 days — Johnson refs</p>
              </div>

              <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-5">
                <div className="flex items-center justify-between mb-2">
                  <FileSearch className="w-5 h-5 text-blue-400" />
                  <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 text-xs font-bold rounded-full">QUEUE</span>
                </div>
                <p className="text-xl font-bold text-white mb-1">{metrics.pendingReview}</p>
                <p className="text-xs text-slate-400">Awaiting Supervisor Review</p>
                <p className="text-xs text-slate-500 mt-1">Avg wait: 1.2 days</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* Investigation Pipeline */}
              <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white">Investigation Pipeline</h3>
                    <p className="text-xs text-slate-500 mt-1">47 total active investigations by stage</p>
                  </div>
                  <button
                    onClick={() => navigate(createPageUrl('CaseManagement'))}
                    className="text-sm text-amber-400 hover:text-amber-300"
                  >
                    View All →
                  </button>
                </div>
                <div className="space-y-4">
                  {investigationStages.map((stage, idx) => (
                    <div key={idx}>
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-slate-300">{stage.stage}</span>
                          <span className="text-xs text-slate-500">— {stage.description}</span>
                        </div>
                        <span className={`text-sm font-bold ${
                          stage.color === 'blue' ? 'text-blue-400' :
                          stage.color === 'purple' ? 'text-purple-400' :
                          stage.color === 'amber' ? 'text-amber-400' :
                          stage.color === 'red' ? 'text-red-400' : 'text-green-400'
                        }`}>{stage.count}</span>
                      </div>
                      <div className="w-full h-2.5 bg-slate-700/50 rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all ${
                            stage.color === 'blue' ? 'bg-blue-500' :
                            stage.color === 'purple' ? 'bg-purple-500' :
                            stage.color === 'amber' ? 'bg-amber-500' :
                            stage.color === 'red' ? 'bg-red-500' : 'bg-green-500'
                          }`}
                          style={{ width: `${(stage.count / 47) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-slate-700/30 flex items-center justify-between text-xs">
                  <span className="text-slate-500">Avg time in pipeline: 14.5 days</span>
                  <span className="text-green-400">3.5 days ahead of SLA</span>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">Recent Activity</h3>
                  <span className="text-xs text-slate-500">Last 24 hours</span>
                </div>
                <div className="space-y-3">
                  {recentActivity.map(activity => {
                    const Icon = activity.icon;
                    return (
                      <div key={activity.id} className="flex items-start gap-3 p-3 bg-slate-900/50 rounded-lg hover:bg-slate-800/50 transition-all cursor-pointer">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                          activity.color === 'blue' ? 'bg-blue-500/20' :
                          activity.color === 'green' ? 'bg-green-500/20' :
                          activity.color === 'purple' ? 'bg-purple-500/20' :
                          activity.color === 'amber' ? 'bg-amber-500/20' : 'bg-red-500/20'
                        }`}>
                          <Icon className={`w-4 h-4 ${
                            activity.color === 'blue' ? 'text-blue-400' :
                            activity.color === 'green' ? 'text-green-400' :
                            activity.color === 'purple' ? 'text-purple-400' :
                            activity.color === 'amber' ? 'text-amber-400' : 'text-red-400'
                          }`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-slate-300">{activity.message}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-slate-500">{activity.time}</span>
                            <span className="text-slate-600">•</span>
                            <span className="text-xs text-slate-500">{activity.detail}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Priority Cases */}
            <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-white">Priority Cases Requiring Action</h3>
                  <p className="text-xs text-slate-500 mt-1">Cases flagged for immediate attention</p>
                </div>
                <button
                  onClick={() => navigate(createPageUrl('ActiveCases'))}
                  className="flex items-center gap-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-xl text-sm font-medium transition-all"
                >
                  <Eye className="w-4 h-4" />
                  View All
                </button>
              </div>
              <div className="space-y-3">
                {priorityCases.map(caseItem => (
                  <div key={caseItem.id} className="p-4 bg-slate-900/50 rounded-xl hover:bg-slate-800/50 transition-all cursor-pointer border border-slate-700/30">
                    <div className="flex items-start justify-between flex-wrap gap-3 mb-3">
                      <div className="flex items-center gap-3">
                        <h4 className="text-base font-semibold text-white">{caseItem.subject}</h4>
                        <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                          caseItem.priority === 'high' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                          caseItem.priority === 'medium' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                          'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                        }`}>
                          {caseItem.priority.toUpperCase()}
                        </span>
                        <span className="text-xs text-slate-500">{caseItem.caseNumber}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <span className="text-slate-400">{caseItem.position}</span>
                        <span className="text-purple-400 font-semibold">{caseItem.status}</span>
                        <span className="text-slate-500">{caseItem.daysOpen} days open</span>
                        <span className="text-slate-500">{caseItem.investigator}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-slate-700/30">
                      <div className="flex items-center gap-2">
                        <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
                        <span className="text-xs text-slate-400"><span className="text-amber-400">Reason:</span> {caseItem.reason}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <ChevronRight className="w-3.5 h-3.5 text-blue-400" />
                        <span className="text-xs text-slate-400"><span className="text-blue-400">Next:</span> {caseItem.nextAction}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Deadlines */}
            <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-white">Upcoming Deadlines</h3>
                  <p className="text-xs text-slate-500 mt-1">Compliance and SLA-driven milestones</p>
                </div>
                <button className="text-sm text-amber-400 hover:text-amber-300">View Calendar →</button>
              </div>
              <div className="space-y-3">
                {upcomingDeadlines.map(deadline => (
                  <div key={deadline.id} className="p-4 bg-slate-900/50 rounded-xl hover:bg-slate-800/50 transition-all border border-slate-700/30">
                    <div className="flex items-start justify-between flex-wrap gap-3">
                      <div className="flex items-start gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                          deadline.daysLeft === 0 ? 'bg-red-500/20 border border-red-500/30' : deadline.daysLeft <= 2 ? 'bg-amber-500/20 border border-amber-500/30' : 'bg-blue-500/20 border border-blue-500/30'
                        }`}>
                          <Hourglass className={`w-5 h-5 ${
                            deadline.daysLeft === 0 ? 'text-red-400' : deadline.daysLeft <= 2 ? 'text-amber-400' : 'text-blue-400'
                          }`} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <p className="text-sm font-semibold text-white">{deadline.subject}</p>
                            <span className="text-xs text-slate-500">{deadline.caseNumber}</span>
                          </div>
                          <p className="text-xs text-slate-400 mb-2">{deadline.task}</p>
                          <div className="flex items-center gap-1.5">
                            <CalendarClock className="w-3 h-3 text-slate-500" />
                            <span className="text-xs text-slate-500">{deadline.compliance}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`text-sm font-bold ${
                          deadline.daysLeft === 0 ? 'text-red-400' : deadline.daysLeft <= 2 ? 'text-amber-400' : 'text-slate-300'
                        }`}>{deadline.dueDate}</p>
                        <p className={`text-xs ${
                          deadline.daysLeft === 0 ? 'text-red-400' : 'text-slate-500'
                        }`}>{deadline.daysLeft === 0 ? 'DUE TODAY' : `${deadline.daysLeft} days left`}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Quick Help Button */}
      <button
        onClick={() => setChatOpen(!chatOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110 z-40"
      >
        {chatOpen ? <X className="w-6 h-6 text-white" /> : <MessageCircle className="w-6 h-6 text-white" />}
      </button>

      {chatOpen && (
        <div className="fixed bottom-24 right-6 w-full max-w-96 bg-slate-900/95 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl flex flex-col z-40 mx-4 sm:mx-0">
          <div className="p-4 border-b border-slate-700/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">BI Support & Resources</h3>
                <p className="text-xs text-slate-400">Quick links and assistance</p>
              </div>
            </div>
          </div>
          <div className="p-4 space-y-3">
            <button className="w-full flex items-center gap-3 p-3 bg-slate-800/40 hover:bg-slate-800/60 rounded-xl transition-all text-left">
              <FileText className="w-5 h-5 text-blue-400" />
              <div>
                <p className="text-sm text-white font-medium">Investigation Guidelines</p>
                <p className="text-xs text-slate-500">POST standards & procedures</p>
              </div>
            </button>
            <button className="w-full flex items-center gap-3 p-3 bg-slate-800/40 hover:bg-slate-800/60 rounded-xl transition-all text-left">
              <ClipboardCheck className="w-5 h-5 text-green-400" />
              <div>
                <p className="text-sm text-white font-medium">Adjudication Checklist</p>
                <p className="text-xs text-slate-500">Review requirements</p>
              </div>
            </button>
            <button className="w-full flex items-center gap-3 p-3 bg-slate-800/40 hover:bg-slate-800/60 rounded-xl transition-all text-left">
              <Phone className="w-5 h-5 text-purple-400" />
              <div>
                <p className="text-sm text-white font-medium">Contact IT Support</p>
                <p className="text-xs text-slate-500">Technical assistance</p>
              </div>
            </button>
            <button className="w-full flex items-center gap-3 p-3 bg-slate-800/40 hover:bg-slate-800/60 rounded-xl transition-all text-left">
              <Scale className="w-5 h-5 text-amber-400" />
              <div>
                <p className="text-sm text-white font-medium">Legal Reference</p>
                <p className="text-xs text-slate-500">Compliance documentation</p>
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

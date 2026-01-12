import React, { useState, useEffect } from 'react';
import { LayoutDashboard, FolderOpen, FileText, Clock, UserCheck, Calendar, FileCheck, CheckCircle, TrendingUp, AlertTriangle, DollarSign, Eye, Activity, XCircle, Settings, Bell, MessageCircle, Search, ChevronRight, Shield, Sparkles, X, Send, Menu, ChevronLeft, LogOut, Filter, Users, Target, ArrowUpRight, ArrowDownRight, Download, Briefcase, ClipboardCheck, Scale, Building2, ChevronDown, User } from 'lucide-react';
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
  const [aiInsightsVisible, setAiInsightsVisible] = useState(true);

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
    passRate: 78.5,
    flaggedCases: 8,
    overdueItems: 3,
    referencesPending: 15
  };

  // Active investigations by stage
  const investigationStages = [
    { stage: 'Initial Review', count: 12, color: 'blue' },
    { stage: 'Reference Checks', count: 15, color: 'purple' },
    { stage: 'Employment Verify', count: 8, color: 'amber' },
    { stage: 'Criminal History', count: 7, color: 'red' },
    { stage: 'Final Review', count: 5, color: 'green' }
  ];

  // Recent case activity
  const recentActivity = [
    { id: 1, type: 'complete', message: 'Background cleared: Elena Rodriguez - Background Investigator', time: '30 min ago', icon: CheckCircle, color: 'green' },
    { id: 2, type: 'flag', message: 'Financial concern flagged: David Kim - Deputy Sheriff', time: '2 hours ago', icon: AlertTriangle, color: 'red' },
    { id: 3, type: 'interview', message: 'Reference interview completed: Marcus Johnson', time: '3 hours ago', icon: Users, color: 'purple' },
    { id: 4, type: 'new', message: 'New case assigned: Sarah Chen - Detention Officer', time: '5 hours ago', icon: FolderOpen, color: 'blue' },
    { id: 5, type: 'update', message: 'Employment verification received: Robert Martinez', time: '1 day ago', icon: Building2, color: 'amber' }
  ];

  // Priority cases requiring attention
  const priorityCases = [
    { id: 1, subject: 'Marcus Johnson', position: 'Deputy Sheriff', status: 'Criminal History Review', daysOpen: 12, priority: 'high', investigator: 'Agent Smith' },
    { id: 2, subject: 'Lisa Martinez', position: 'Background Investigator', status: 'Reference Checks', daysOpen: 8, priority: 'high', investigator: 'Agent Wilson' },
    { id: 3, subject: 'David Chen', position: 'Deputy Sheriff', status: 'Financial Review', daysOpen: 15, priority: 'medium', investigator: 'Agent Smith' },
    { id: 4, subject: 'Sarah Thompson', position: 'Detention Officer', status: 'Employment Verification', daysOpen: 5, priority: 'low', investigator: 'Agent Davis' }
  ];

  // Upcoming deadlines
  const upcomingDeadlines = [
    { id: 1, subject: 'Marcus Johnson', task: 'Criminal history review', dueDate: 'Today', daysLeft: 0 },
    { id: 2, subject: 'Lisa Martinez', task: 'Complete reference checks', dueDate: 'Tomorrow', daysLeft: 1 },
    { id: 3, subject: 'David Chen', task: 'Financial background report', dueDate: 'Dec 5', daysLeft: 3 }
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
            {/* Header with greeting and quick actions */}
            <div className="mb-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h2 className="text-2xl lg:text-3xl font-bold text-white mb-2">Good morning, BI Supervisor</h2>
                <div className="flex items-center gap-3 text-slate-400">
                  <span>Background Investigations Dashboard</span>
                  <span className="text-slate-600">•</span>
                  <span className="text-amber-400 font-medium">{formatTime(currentTime)} EST</span>
                  <span className="text-slate-600">•</span>
                  <span className="text-xs text-slate-500">Updated 2 min ago</span>
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
                  <AlertTriangle className="w-4 h-4" />
                  Flagged Cases
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-slate-700/40 border border-slate-600/50 text-slate-300 rounded-xl text-sm font-medium hover:bg-slate-700/60 transition-all">
                  <Download className="w-4 h-4" />
                  BI Report
                </button>
              </div>
            </div>

            {/* AI Insights Banner */}
            {aiInsightsVisible && (
              <div className="mb-6 bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-500/20 rounded-xl p-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-6 h-6 text-purple-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-base font-semibold text-white">AI Insights & Risk Analysis</h4>
                      <button
                        onClick={() => setAiInsightsVisible(false)}
                        className="text-slate-400 hover:text-white transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-slate-300"><span className="text-red-400 font-semibold">3 cases overdue</span> - immediate attention required on reference checks</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-slate-300"><span className="text-amber-400 font-semibold">8 flagged cases</span> - financial and criminal history concerns detected by AI screening</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-slate-300"><span className="text-green-400 font-semibold">78.5% pass rate</span> this month - above department average of 72%</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-slate-300"><span className="text-blue-400 font-semibold">14.5 day avg completion</span> - 2 days faster than previous quarter</p>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-purple-500/20">
                      <button className="text-sm text-purple-400 hover:text-purple-300 font-medium">
                        View Full Risk Analysis →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Executive Summary */}
            <div className="mb-6 bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/20 rounded-xl p-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <ClipboardCheck className="w-6 h-6 text-blue-400" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-base font-semibold text-white">Investigation Status Summary</h4>
                    <span className="text-xs text-slate-400">Updated 2 min ago</span>
                  </div>

                  {/* Action Required */}
                  <div className="mb-4 pb-4 border-b border-blue-500/20">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <h5 className="text-sm font-semibold text-red-400">ACTION REQUIRED</h5>
                    </div>
                    <div className="space-y-1.5 text-sm">
                      <div className="flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                        <p className="text-slate-300"><span className="font-semibold text-red-400">3 overdue tasks</span> - reference checks and verifications pending</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <Scale className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                        <p className="text-slate-300"><span className="font-semibold text-red-400">2 criminal history flags</span> - supervisor review required</p>
                      </div>
                    </div>
                  </div>

                  {/* In Progress */}
                  <div className="mb-4 pb-4 border-b border-blue-500/20">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                      <h5 className="text-sm font-semibold text-amber-400">IN PROGRESS</h5>
                    </div>
                    <div className="space-y-1.5 text-sm">
                      <div className="flex items-start gap-2">
                        <FolderOpen className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                        <p className="text-slate-300"><span className="font-semibold text-amber-400">47 active investigations</span> - across all stages</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <Users className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                        <p className="text-slate-300"><span className="font-semibold text-amber-400">15 reference checks pending</span> - 8 interviews scheduled today</p>
                      </div>
                    </div>
                  </div>

                  {/* Completed */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <h5 className="text-sm font-semibold text-green-400">COMPLETED THIS MONTH</h5>
                    </div>
                    <div className="space-y-1.5 text-sm">
                      <div className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <p className="text-slate-300"><span className="font-semibold text-green-400">28 investigations completed</span> - 22 cleared, 6 disqualified</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <Target className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <p className="text-slate-300"><span className="font-semibold text-green-400">14.5 day average</span> - ahead of 18-day target</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6">
              {[
                {
                  label: 'Active Cases',
                  value: metrics.activeCases,
                  sublabel: '12 pending review',
                  icon: FolderOpen,
                  color: 'purple',
                  trend: 'up',
                  trendValue: '↑ 8',
                  comparison: 'vs. last month',
                  route: 'ActiveCases'
                },
                {
                  label: 'Flagged Cases',
                  value: metrics.flaggedCases,
                  sublabel: 'Requires attention',
                  icon: AlertTriangle,
                  color: 'red',
                  trend: 'up',
                  trendValue: '↑ 2',
                  comparison: 'vs. last week',
                  route: 'CriminalHistoryReview'
                },
                {
                  label: 'Completed',
                  value: metrics.completedThisMonth,
                  sublabel: 'This month',
                  icon: CheckCircle,
                  color: 'green',
                  trend: 'up',
                  trendValue: '↑ 15.3%',
                  comparison: 'vs. last month',
                  route: 'CaseClosure'
                },
                {
                  label: 'Pass Rate',
                  value: `${metrics.passRate}%`,
                  sublabel: '22 cleared / 28 total',
                  icon: Target,
                  color: 'blue',
                  trend: 'up',
                  trendValue: '↑ 4.2%',
                  comparison: 'vs. last month',
                  route: 'BIReports'
                }
              ].map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <button
                    key={idx}
                    onClick={() => navigate(createPageUrl(stat.route))}
                    className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-6 hover:border-slate-600/50 transition-all text-left group"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        stat.color === 'purple' ? 'bg-purple-500/20' :
                        stat.color === 'red' ? 'bg-red-500/20' :
                        stat.color === 'green' ? 'bg-green-500/20' : 'bg-blue-500/20'
                      }`}>
                        <Icon className={`w-6 h-6 ${
                          stat.color === 'purple' ? 'text-purple-400' :
                          stat.color === 'red' ? 'text-red-400' :
                          stat.color === 'green' ? 'text-green-400' : 'text-blue-400'
                        }`} />
                      </div>
                      <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
                    </div>
                    <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
                    <p className="text-sm text-slate-400 mb-2">{stat.label}</p>
                    <p className="text-xs text-slate-500 mb-2">{stat.sublabel}</p>
                    <div className="flex items-center justify-between pt-2 border-t border-slate-700/30">
                      <span className={`text-xs font-medium ${
                        stat.color === 'red' ? 'text-red-400' : 'text-green-400'
                      }`}>{stat.trendValue}</span>
                      <span className="text-xs text-slate-500">{stat.comparison}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Secondary Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-5">
                <div className="flex items-center justify-between mb-2">
                  <Clock className="w-5 h-5 text-slate-400" />
                  <div className="flex items-center gap-1 text-sm text-green-400">
                    {getChangeIcon(-2)}
                    <span className="font-bold">2 days</span>
                  </div>
                </div>
                <p className="text-xl font-bold text-white mb-1">{metrics.avgCompletionDays} days</p>
                <p className="text-xs text-slate-400">Avg Completion Time</p>
              </div>

              <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-5">
                <div className="flex items-center justify-between mb-2">
                  <Users className="w-5 h-5 text-slate-400" />
                  <div className="flex items-center gap-1 text-sm text-amber-400">
                    <span className="font-bold">{metrics.referencesPending}</span>
                  </div>
                </div>
                <p className="text-xl font-bold text-white mb-1">{metrics.referencesPending}</p>
                <p className="text-xs text-slate-400">References Pending</p>
              </div>

              <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-5">
                <div className="flex items-center justify-between mb-2">
                  <AlertTriangle className="w-5 h-5 text-slate-400" />
                  <div className="flex items-center gap-1 text-sm text-red-400">
                    <span className="font-bold">Urgent</span>
                  </div>
                </div>
                <p className="text-xl font-bold text-white mb-1">{metrics.overdueItems}</p>
                <p className="text-xs text-slate-400">Overdue Items</p>
              </div>

              <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-5">
                <div className="flex items-center justify-between mb-2">
                  <FileCheck className="w-5 h-5 text-slate-400" />
                  <div className="flex items-center gap-1 text-sm text-blue-400">
                    <span className="font-bold">Queue</span>
                  </div>
                </div>
                <p className="text-xl font-bold text-white mb-1">{metrics.pendingReview}</p>
                <p className="text-xs text-slate-400">Pending Review</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* Investigation Pipeline */}
              <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">Investigation Pipeline</h3>
                  <button
                    onClick={() => navigate(createPageUrl('CaseManagement'))}
                    className="text-sm text-amber-400 hover:text-amber-300"
                  >
                    View All →
                  </button>
                </div>
                <div className="space-y-3">
                  {investigationStages.map((stage, idx) => (
                    <div key={idx}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-slate-300">{stage.stage}</span>
                        <span className="text-sm font-bold text-white">{stage.count}</span>
                      </div>
                      <div className="w-full h-2 bg-slate-700/50 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${
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
              </div>

              {/* Recent Activity */}
              <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  {recentActivity.map(activity => {
                    const Icon = activity.icon;
                    return (
                      <div key={activity.id} className="flex items-start gap-3 p-3 bg-slate-900/50 rounded-lg hover:bg-slate-800/50 transition-all">
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
                          <p className="text-xs text-slate-500 mt-1">{activity.time}</p>
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
                <h3 className="text-lg font-semibold text-white">Priority Cases</h3>
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
                  <div key={caseItem.id} className="p-4 bg-slate-900/50 rounded-xl hover:bg-slate-800/50 transition-all cursor-pointer">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-3">
                        <h4 className="text-base font-semibold text-white">{caseItem.subject}</h4>
                        <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                          caseItem.priority === 'high' ? 'bg-red-500/20 text-red-400' :
                          caseItem.priority === 'medium' ? 'bg-amber-500/20 text-amber-400' :
                          'bg-blue-500/20 text-blue-400'
                        }`}>
                          {caseItem.priority.toUpperCase()}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-slate-400">{caseItem.position}</span>
                        <span className="text-purple-400 font-semibold">{caseItem.status}</span>
                        <span className="text-slate-500">{caseItem.daysOpen} days</span>
                        <span className="text-slate-500">{caseItem.investigator}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Deadlines */}
            <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Upcoming Deadlines</h3>
              <div className="space-y-3">
                {upcomingDeadlines.map(deadline => (
                  <div key={deadline.id} className="p-4 bg-slate-900/50 rounded-xl hover:bg-slate-800/50 transition-all">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          deadline.daysLeft === 0 ? 'bg-red-500/20' : deadline.daysLeft <= 2 ? 'bg-amber-500/20' : 'bg-blue-500/20'
                        }`}>
                          <Clock className={`w-5 h-5 ${
                            deadline.daysLeft === 0 ? 'text-red-400' : deadline.daysLeft <= 2 ? 'text-amber-400' : 'text-blue-400'
                          }`} />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-white">{deadline.subject}</p>
                          <p className="text-xs text-slate-400">{deadline.task}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`text-sm font-semibold ${
                          deadline.daysLeft === 0 ? 'text-red-400' : deadline.daysLeft <= 2 ? 'text-amber-400' : 'text-slate-300'
                        }`}>{deadline.dueDate}</p>
                        <p className="text-xs text-slate-500">{deadline.daysLeft === 0 ? 'Due Today' : `${deadline.daysLeft} days left`}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* AI Chat Button */}
      <button
        onClick={() => setChatOpen(!chatOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-400 hover:to-purple-500 rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110 z-40"
      >
        {chatOpen ? <X className="w-6 h-6 text-white" /> : <MessageCircle className="w-6 h-6 text-white" />}
        {!chatOpen && <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-slate-900 animate-pulse"></span>}
      </button>

      {chatOpen && (
        <div className="fixed bottom-24 right-6 w-full max-w-96 h-[500px] bg-slate-900/95 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl flex flex-col z-40 mx-4 sm:mx-0">
          <div className="p-4 border-b border-slate-700/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">BI AI Assistant</h3>
                <p className="text-xs text-green-400">Online</p>
              </div>
            </div>
          </div>
          <div className="flex-1 p-4 overflow-y-auto">
            <div className="flex gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <div className="bg-slate-800/60 p-3 rounded-xl">
                  <p className="text-sm text-slate-200">Hi! I can help you analyze case data, identify risk patterns, check investigation timelines, and flag potential issues. What would you like to investigate?</p>
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 border-t border-slate-700/50">
            <div className="flex items-center gap-2">
              <input type="text" placeholder="Ask about investigations..." className="flex-1 px-4 py-2 bg-slate-800/40 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/50" />
              <button className="w-10 h-10 bg-purple-500 rounded-xl flex items-center justify-center">
                <Send className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

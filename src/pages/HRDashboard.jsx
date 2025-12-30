import React, { useState, useEffect } from 'react';
import { Users, FileText, LayoutDashboard, TrendingUp, Settings, Bell, MessageCircle, Search, ChevronRight, CheckCircle, Shield, Sparkles, X, Send, Menu, ChevronLeft, LogOut, UserPlus, Briefcase, Clock, Award, AlertTriangle, TrendingDown, Calendar, FileCheck, Target, ArrowUpRight, ArrowDownRight, Eye, Download, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function HRDashboard() {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState('hr-dashboard');
  const [chatOpen, setChatOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [logoutConfirmOpen, setLogoutConfirmOpen] = useState(false);
  const [timeRange, setTimeRange] = useState('month');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [aiInsightsVisible, setAiInsightsVisible] = useState(true);

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
  };

  const navigation = [
    { id: 'hr-dashboard', label: 'HR Dashboard', icon: Users },
    { id: 'job-postings', label: 'Job Postings', icon: Briefcase, page: 'JobPostings' },
    { id: 'applicant-tracking', label: 'Applicant Tracking', icon: UserPlus, page: 'ApplicantTracking' },
    { id: 'hiring-pipeline', label: 'Hiring Pipeline', icon: TrendingUp, page: 'HiringPipeline' },
    { id: 'onboarding', label: 'New Hire Onboarding', icon: FileCheck, page: 'NewHireOnboarding' },
    { id: 'employee-records', label: 'Employee Records', icon: FileText, page: 'EmployeeRecords' },
    { id: 'time-off', label: 'Time Off Management', icon: Calendar, page: 'TimeOffManagement' },
    { id: 'performance', label: 'Performance Reviews', icon: Award, page: 'PerformanceReviews' },
    { id: 'hr-reports', label: 'HR Reports', icon: LayoutDashboard, page: 'HRReports' },
    { id: 'settings', label: 'Settings', icon: Settings, page: 'HRSettings' }
  ];

  const notifications = [
    { id: 1, title: '5 New Applications', message: 'Deputy Sheriff position received 5 applications', time: '15 min ago', urgent: false },
    { id: 2, title: 'Interview Scheduled', message: 'Background investigator interview - Tomorrow 10 AM', time: '1 hour ago', urgent: true },
    { id: 3, title: '3 Onboarding Tasks Due', message: 'New hire paperwork pending completion', time: '2 hours ago', urgent: true },
    { id: 4, title: 'Certification Expiring', message: 'Deputy Williams P.O.S.T. certification expires in 30 days', time: '3 hours ago', urgent: true },
    { id: 5, title: 'Background Check Complete', message: 'Elena Rodriguez cleared for hire', time: '4 hours ago', urgent: false }
  ];

  // Key metrics
  const metrics = {
    totalEmployees: 178,
    openPositions: 12,
    activeApplicants: 47,
    pendingOnboarding: 3,
    avgTimeToHire: 45,
    offerAcceptanceRate: 87.5,
    turnoverRate: 8.2,
    certificationCompliance: 94.3
  };

  // Recent activity
  const recentActivity = [
    { id: 1, type: 'application', message: 'New application: Marcus Johnson - Deputy Sheriff', time: '10 min ago', icon: UserPlus, color: 'blue' },
    { id: 2, type: 'hire', message: 'Offer accepted: Sarah Chen - Background Investigator', time: '2 hours ago', icon: CheckCircle, color: 'green' },
    { id: 3, type: 'interview', message: 'Interview completed: Robert Martinez', time: '5 hours ago', icon: Users, color: 'purple' },
    { id: 4, type: 'certification', message: 'P.O.S.T. certification renewed: Deputy Williams', time: '1 day ago', icon: Award, color: 'amber' },
    { id: 5, type: 'alert', message: '3 certifications expiring this month', time: '1 day ago', icon: AlertTriangle, color: 'red' }
  ];

  // Hiring funnel data
  const hiringFunnel = [
    { stage: 'Applications', count: 47, percentage: 100 },
    { stage: 'Screening', count: 28, percentage: 60 },
    { stage: 'Interviews', count: 15, percentage: 32 },
    { stage: 'Background Check', count: 8, percentage: 17 },
    { stage: 'Offers', count: 3, percentage: 6 }
  ];

  // Open positions
  const openPositions = [
    { id: 1, title: 'Deputy Sheriff', department: 'Patrol Division', applicants: 23, daysOpen: 15, priority: 'high' },
    { id: 2, title: 'Background Investigator', department: 'HR', applicants: 12, daysOpen: 22, priority: 'high' },
    { id: 3, title: 'Detention Officer', department: 'Detention', applicants: 8, daysOpen: 8, priority: 'medium' },
    { id: 4, title: 'Administrative Assistant', department: 'Admin Services', applicants: 4, daysOpen: 5, priority: 'low' }
  ];

  // Upcoming interviews
  const upcomingInterviews = [
    { id: 1, candidate: 'Marcus Johnson', position: 'Deputy Sheriff', date: '2024-11-05', time: '10:00 AM', interviewer: 'Captain Anderson' },
    { id: 2, candidate: 'Lisa Martinez', position: 'Background Investigator', date: '2024-11-05', time: '2:00 PM', interviewer: 'HR Director' },
    { id: 3, candidate: 'David Chen', position: 'Deputy Sheriff', date: '2024-11-06', time: '9:00 AM', interviewer: 'Major Davis' }
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
                <input type="text" placeholder="Search employees, applicants, positions..." className="w-full pl-12 pr-4 py-2 bg-slate-800/40 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50" />
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

              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">HR</span>
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-white">HR Director</p>
                  <p className="text-xs text-slate-400">Human Resources</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <div className="max-w-7xl mx-auto">
            {/* Header with greeting and quick actions */}
            <div className="mb-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h2 className="text-2xl lg:text-3xl font-bold text-white mb-2">Good morning, HR Director</h2>
                <div className="flex items-center gap-3 text-slate-400">
                  <span>Human Resources Dashboard</span>
                  <span className="text-slate-600">•</span>
                  <span className="text-amber-400 font-medium">{formatTime(currentTime)} EST</span>
                  <span className="text-slate-600">•</span>
                  <span className="text-xs text-slate-500">Updated 2 min ago</span>
                </div>
              </div>

              {/* Quick Actions Bar */}
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={() => navigate(createPageUrl('JobPostings'))}
                  className="flex items-center gap-2 px-4 py-2 bg-green-500/20 border border-green-500/30 text-green-400 rounded-xl text-sm font-medium hover:bg-green-500/30 transition-all"
                >
                  <Briefcase className="w-4 h-4" />
                  Post New Job
                </button>
                <button
                  onClick={() => navigate(createPageUrl('ApplicantTracking'))}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-500/20 border border-blue-500/30 text-blue-400 rounded-xl text-sm font-medium hover:bg-blue-500/30 transition-all"
                >
                  <UserPlus className="w-4 h-4" />
                  Review Applicants
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-slate-700/40 border border-slate-600/50 text-slate-300 rounded-xl text-sm font-medium hover:bg-slate-700/60 transition-all">
                  <Download className="w-4 h-4" />
                  HR Report
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
                      <h4 className="text-base font-semibold text-white">AI Insights & Recommendations</h4>
                      <button
                        onClick={() => setAiInsightsVisible(false)}
                        className="text-slate-400 hover:text-white transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-slate-300"><span className="text-green-400 font-semibold">Hiring velocity up 22%</span> - streamlined screening is improving time-to-hire significantly</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-slate-300"><span className="text-blue-400 font-semibold">3 candidates ready</span> for background checks this week - prioritize Deputy Sheriff positions</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-slate-300"><span className="text-amber-400 font-semibold">3 certifications expiring</span> within 30 days - automated renewal reminders have been sent</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-slate-300"><span className="text-purple-400 font-semibold">87.5% offer acceptance</span> - candidate experience metrics are excellent, maintain current approach</p>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-purple-500/20">
                      <button className="text-sm text-purple-400 hover:text-purple-300 font-medium">
                        View Detailed Analysis →
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
                  <TrendingUp className="w-6 h-6 text-blue-400" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-base font-semibold text-white">HR Executive Summary</h4>
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
                        <UserPlus className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                        <p className="text-slate-300"><span className="font-semibold text-red-400">3 pending onboarding tasks</span> - new hire paperwork due this week</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <Award className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                        <p className="text-slate-300"><span className="font-semibold text-red-400">3 certifications expiring</span> - P.O.S.T. renewals needed within 30 days</p>
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
                        <Users className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                        <p className="text-slate-300"><span className="font-semibold text-amber-400">8 candidates in background check</span> - average completion time 12 days</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <Calendar className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                        <p className="text-slate-300"><span className="font-semibold text-amber-400">3 interviews scheduled</span> - Deputy Sheriff and Background Investigator positions</p>
                      </div>
                    </div>
                  </div>

                  {/* Operational Status */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <h5 className="text-sm font-semibold text-green-400">OPERATIONAL STATUS</h5>
                    </div>
                    <div className="space-y-1.5 text-sm">
                      <div className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <p className="text-slate-300"><span className="font-semibold text-green-400">178 total employees</span> - 164 active, 14 positions vacant</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <Target className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <p className="text-slate-300"><span className="font-semibold text-green-400">94.3% certification compliance</span> - exceeds 90% department goal</p>
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
                  label: 'Total Employees',
                  value: metrics.totalEmployees,
                  sublabel: '164 active',
                  icon: Users,
                  color: 'blue',
                  trend: 'up',
                  trendValue: '↑ 2.3%',
                  comparison: 'vs. last month',
                  route: 'EmployeeRecords'
                },
                {
                  label: 'Open Positions',
                  value: metrics.openPositions,
                  sublabel: '4 high priority',
                  icon: Briefcase,
                  color: 'amber',
                  trend: 'neutral',
                  trendValue: '→ Same',
                  comparison: 'vs. last month',
                  route: 'JobPostings'
                },
                {
                  label: 'Active Applicants',
                  value: metrics.activeApplicants,
                  sublabel: '8 in background check',
                  icon: UserPlus,
                  color: 'green',
                  trend: 'up',
                  trendValue: '↑ 15.2%',
                  comparison: 'vs. last month',
                  route: 'ApplicantTracking'
                },
                {
                  label: 'Pending Onboarding',
                  value: metrics.pendingOnboarding,
                  sublabel: 'Tasks due this week',
                  icon: FileCheck,
                  color: 'purple',
                  trend: 'down',
                  trendValue: '↓ 2',
                  comparison: 'vs. last week',
                  route: 'NewHireOnboarding'
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
                        stat.color === 'blue' ? 'bg-blue-500/20' :
                        stat.color === 'amber' ? 'bg-amber-500/20' :
                        stat.color === 'green' ? 'bg-green-500/20' : 'bg-purple-500/20'
                      }`}>
                        <Icon className={`w-6 h-6 ${
                          stat.color === 'blue' ? 'text-blue-400' :
                          stat.color === 'amber' ? 'text-amber-400' :
                          stat.color === 'green' ? 'text-green-400' : 'text-purple-400'
                        }`} />
                      </div>
                      <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
                    </div>
                    <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
                    <p className="text-sm text-slate-400 mb-2">{stat.label}</p>
                    <p className="text-xs text-slate-500 mb-2">{stat.sublabel}</p>
                    <div className="flex items-center justify-between pt-2 border-t border-slate-700/30">
                      <span className={`text-xs font-medium ${
                        stat.trend === 'up' ? 'text-green-400' :
                        stat.trend === 'down' ? 'text-red-400' : 'text-slate-400'
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
                    {getChangeIcon(-8.5)}
                    <span className="font-bold">8.5%</span>
                  </div>
                </div>
                <p className="text-xl font-bold text-white mb-1">{metrics.avgTimeToHire} days</p>
                <p className="text-xs text-slate-400">Avg Time to Hire</p>
              </div>

              <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-5">
                <div className="flex items-center justify-between mb-2">
                  <Target className="w-5 h-5 text-slate-400" />
                  <div className="flex items-center gap-1 text-sm text-green-400">
                    {getChangeIcon(3.2)}
                    <span className="font-bold">3.2%</span>
                  </div>
                </div>
                <p className="text-xl font-bold text-white mb-1">{metrics.offerAcceptanceRate}%</p>
                <p className="text-xs text-slate-400">Offer Acceptance Rate</p>
              </div>

              <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-5">
                <div className="flex items-center justify-between mb-2">
                  <TrendingDown className="w-5 h-5 text-slate-400" />
                  <div className="flex items-center gap-1 text-sm text-green-400">
                    {getChangeIcon(-1.8)}
                    <span className="font-bold">1.8%</span>
                  </div>
                </div>
                <p className="text-xl font-bold text-white mb-1">{metrics.turnoverRate}%</p>
                <p className="text-xs text-slate-400">Turnover Rate</p>
              </div>

              <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-5">
                <div className="flex items-center justify-between mb-2">
                  <Award className="w-5 h-5 text-slate-400" />
                  <div className="flex items-center gap-1 text-sm text-green-400">
                    {getChangeIcon(2.1)}
                    <span className="font-bold">2.1%</span>
                  </div>
                </div>
                <p className="text-xl font-bold text-white mb-1">{metrics.certificationCompliance}%</p>
                <p className="text-xs text-slate-400">Certification Compliance</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* Hiring Funnel */}
              <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">Hiring Funnel</h3>
                  <button
                    onClick={() => navigate(createPageUrl('HiringPipeline'))}
                    className="text-sm text-amber-400 hover:text-amber-300"
                  >
                    View Details →
                  </button>
                </div>
                <div className="space-y-3">
                  {hiringFunnel.map((stage, idx) => (
                    <div key={idx}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-slate-300">{stage.stage}</span>
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-bold text-white">{stage.count}</span>
                          <span className="text-xs text-slate-500">{stage.percentage}%</span>
                        </div>
                      </div>
                      <div className="w-full h-2 bg-slate-700/50 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                          style={{ width: `${stage.percentage}%` }}
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

            {/* Open Positions */}
            <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Open Positions</h3>
                <button
                  onClick={() => navigate(createPageUrl('JobPostings'))}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl text-sm font-medium transition-all"
                >
                  <Eye className="w-4 h-4" />
                  View All
                </button>
              </div>
              <div className="space-y-3">
                {openPositions.map(position => (
                  <div key={position.id} className="p-4 bg-slate-900/50 rounded-xl hover:bg-slate-800/50 transition-all cursor-pointer">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-3">
                        <h4 className="text-base font-semibold text-white">{position.title}</h4>
                        <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                          position.priority === 'high' ? 'bg-red-500/20 text-red-400' :
                          position.priority === 'medium' ? 'bg-amber-500/20 text-amber-400' :
                          'bg-blue-500/20 text-blue-400'
                        }`}>
                          {position.priority.toUpperCase()}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-slate-400">{position.department}</span>
                        <span className="text-blue-400 font-semibold">{position.applicants} applicants</span>
                        <span className="text-slate-500">{position.daysOpen} days open</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Interviews */}
            <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Upcoming Interviews</h3>
              <div className="space-y-3">
                {upcomingInterviews.map(interview => (
                  <div key={interview.id} className="p-4 bg-slate-900/50 rounded-xl hover:bg-slate-800/50 transition-all">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
                          <Users className="w-5 h-5 text-blue-400" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-white">{interview.candidate}</p>
                          <p className="text-xs text-slate-400">{interview.position}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-slate-300">{interview.date} • {interview.time}</p>
                        <p className="text-xs text-slate-500">Interviewer: {interview.interviewer}</p>
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
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110 z-40"
      >
        {chatOpen ? <X className="w-6 h-6 text-white" /> : <MessageCircle className="w-6 h-6 text-white" />}
        {!chatOpen && <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-slate-900 animate-pulse"></span>}
      </button>

      {chatOpen && (
        <div className="fixed bottom-24 right-6 w-full max-w-96 h-[500px] bg-slate-900/95 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl flex flex-col z-40 mx-4 sm:mx-0">
          <div className="p-4 border-b border-slate-700/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">HR AI Assistant</h3>
                <p className="text-xs text-green-400">Online</p>
              </div>
            </div>
          </div>
          <div className="flex-1 p-4 overflow-y-auto">
            <div className="flex gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <div className="bg-slate-800/60 p-3 rounded-xl">
                  <p className="text-sm text-slate-200">Hi! I can help you track recruitment metrics, screen candidates, schedule interviews, analyze hiring trends, and answer HR questions. What do you need?</p>
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 border-t border-slate-700/50">
            <div className="flex items-center gap-2">
              <input type="text" placeholder="Ask about HR..." className="flex-1 px-4 py-2 bg-slate-800/40 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50" />
              <button className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
                <Send className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

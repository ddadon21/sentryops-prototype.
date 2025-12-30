import React, { useState } from 'react';
import { Home, Users, FileText, LayoutDashboard, TrendingUp, AlertCircle, Settings, Bell, MessageCircle, Search, ChevronRight, DollarSign, CheckCircle, Shield, Sparkles, X, Send, Menu, ChevronLeft, LogOut, UserPlus, Briefcase, Clock, Award, AlertTriangle, TrendingDown, Calendar, FileCheck, Target, Activity, ArrowUpRight, ArrowDownRight, Eye } from 'lucide-react';
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

  const navigation = [
    { id: 'command-dashboard', label: 'Command Dashboard', icon: Home, page: 'CommandDashboard' },
    { id: 'hr-dashboard', label: 'HR Dashboard', icon: Users },
    { id: 'applicant-tracking', label: 'Applicant Tracking', icon: UserPlus, page: 'ApplicantTracking' },
    { id: 'job-postings', label: 'Job Postings', icon: Briefcase, page: 'JobPostings' },
    { id: 'hiring-pipeline', label: 'Hiring Pipeline', icon: TrendingUp, page: 'HiringPipeline' },
    { id: 'onboarding', label: 'New Hire Onboarding', icon: FileCheck, page: 'NewHireOnboarding' },
    { id: 'employee-records', label: 'Employee Records', icon: FileText, page: 'EmployeeRecords' },
    { id: 'time-off', label: 'Time Off Management', icon: Calendar, page: 'TimeOffManagement' },
    { id: 'performance', label: 'Performance Reviews', icon: Award, page: 'PerformanceReviews' },
    { id: 'hr-reports', label: 'HR Reports', icon: LayoutDashboard, page: 'HRReports' },
    { id: 'settings', label: 'Settings', icon: Settings, page: 'Settings' }
  ];

  const notifications = [
    { id: 1, title: '5 New Applications', message: 'Deputy Sheriff position received 5 applications', time: '15 min ago', urgent: false },
    { id: 2, title: 'Interview Scheduled', message: 'Background investigator interview - Tomorrow 10 AM', time: '1 hour ago', urgent: true },
    { id: 3, title: '3 Onboarding Tasks Due', message: 'New hire paperwork pending completion', time: '2 hours ago', urgent: true }
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

  const getChangeColor = (value) => {
    return value > 0 ? 'text-green-400' : 'text-red-400';
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
              <div className="flex items-center gap-2 text-sm">
                <span className="text-white">HR Dashboard</span>
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
                      <h3 className="text-sm font-semibold text-white">Notifications</h3>
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
                      <button className="w-full text-center text-sm text-amber-400 hover:text-amber-300 font-medium">View All</button>
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
            <div className="mb-6">
              <h2 className="text-2xl lg:text-3xl font-bold text-white mb-2">HR Dashboard</h2>
              <p className="text-slate-400">Recruitment, onboarding, and employee management overview</p>
            </div>

            {/* AI Insights */}
            <div className="mb-6 bg-gradient-to-br from-blue-500/10 to-purple-500/5 border border-blue-500/20 rounded-xl p-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-6 h-6 text-blue-400" />
                </div>
                <div className="flex-1">
                  <h4 className="text-base font-semibold text-white mb-2">AI HR Intelligence</h4>
                  <div className="space-y-2 text-sm text-slate-300">
                    <p>• <span className="font-bold text-green-400">Hiring velocity up 22%</span> - streamlined screening improving time-to-hire</p>
                    <p>• <span className="font-bold text-blue-400">47 active applicants</span> with 3 ready for background checks this week</p>
                    <p>• <span className="font-bold text-amber-400">3 certifications expiring</span> - automated renewal reminders sent</p>
                    <p>• <span className="font-bold text-purple-400">87.5% offer acceptance rate</span> - excellent candidate experience</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
                    <Users className="w-5 h-5 text-blue-400" />
                  </div>
                  <div className="flex items-center gap-1 text-sm text-green-400">
                    {getChangeIcon(2.3)}
                    <span className="font-bold">2.3%</span>
                  </div>
                </div>
                <p className="text-2xl font-bold text-white mb-1">{metrics.totalEmployees}</p>
                <p className="text-sm text-slate-400">Total Employees</p>
              </div>

              <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 bg-amber-500/20 rounded-xl flex items-center justify-center">
                    <Briefcase className="w-5 h-5 text-amber-400" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-white mb-1">{metrics.openPositions}</p>
                <p className="text-sm text-slate-400">Open Positions</p>
              </div>

              <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center">
                    <UserPlus className="w-5 h-5 text-green-400" />
                  </div>
                  <div className="flex items-center gap-1 text-sm text-green-400">
                    {getChangeIcon(15.2)}
                    <span className="font-bold">15.2%</span>
                  </div>
                </div>
                <p className="text-2xl font-bold text-white mb-1">{metrics.activeApplicants}</p>
                <p className="text-sm text-slate-400">Active Applicants</p>
              </div>

              <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center">
                    <FileCheck className="w-5 h-5 text-purple-400" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-white mb-1">{metrics.pendingOnboarding}</p>
                <p className="text-sm text-slate-400">Pending Onboarding</p>
              </div>
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
                <h3 className="text-lg font-semibold text-white mb-4">Hiring Funnel</h3>
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
                    <div className="flex items-center justify-between mb-2">
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
                    <div className="flex items-center justify-between">
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

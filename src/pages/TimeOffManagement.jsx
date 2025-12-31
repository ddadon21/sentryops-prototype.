import React, { useState } from 'react';
import { Home, Users, FileText, LayoutDashboard, TrendingUp, AlertCircle, Settings, Bell, MessageCircle, Search, ChevronRight, DollarSign, CheckCircle, Shield, Sparkles, X, Send, Menu, ChevronLeft, LogOut, UserPlus, Briefcase, Clock, Award, Filter, Download, Eye, Calendar, Phone, Mail, MapPin, CheckCircle2, XCircle, AlertTriangle, ClipboardCheck, GraduationCap, FileCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function TimeOffManagement() {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState('time-off');
  const [chatOpen, setChatOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [logoutConfirmOpen, setLogoutConfirmOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('pending');
  const [selectedRequest, setSelectedRequest] = useState(null);

  const navigation = [
    { id: 'hr-dashboard', label: 'HR Dashboard', icon: Users, page: 'HRDashboard' },
    { id: 'job-postings', label: 'Job Postings', icon: Briefcase, page: 'JobPostings' },
    { id: 'applicant-tracking', label: 'Applicant Tracking', icon: UserPlus, page: 'ApplicantTracking' },
    { id: 'hiring-pipeline', label: 'Hiring Pipeline', icon: TrendingUp, page: 'HiringPipeline' },
    { id: 'compliance', label: 'HR Compliance', icon: ClipboardCheck, page: 'ComplianceManagement' },
    { id: 'onboarding', label: 'New Hire Onboarding', icon: FileCheck, page: 'NewHireOnboarding' },
    { id: 'training-certifications', label: 'Training & Certifications', icon: GraduationCap, page: 'TrainingCertifications' },
    { id: 'employee-records', label: 'Employee Records', icon: FileText, page: 'EmployeeRecords' },
    { id: 'time-off', label: 'Time Off Management', icon: Calendar },
    { id: 'performance', label: 'Performance Reviews', icon: Award, page: 'PerformanceReviews' },
    { id: 'hr-reports', label: 'HR Reports', icon: LayoutDashboard, page: 'HRReports' },
    { id: 'settings', label: 'Settings', icon: Settings, page: 'HRSettings' }
  ];

  const notifications = [
    { id: 1, title: '5 Leave Requests Pending', message: 'Requires manager approval', time: '15 min ago', urgent: true },
    { id: 2, title: 'Holiday Coverage Alert', message: 'Thanksgiving week needs staffing', time: '1 hour ago', urgent: true },
    { id: 3, title: 'PTO Balance Low', message: '3 employees below 40 hours', time: '2 hours ago', urgent: false }
  ];

  const [timeOffRequests] = useState([
    {
      id: 1,
      employee: 'Marcus Chen',
      badge: 'D-2145',
      department: 'Patrol Division',
      type: 'Annual Leave',
      startDate: '2024-12-15',
      endDate: '2024-12-22',
      days: 6,
      reason: 'Family vacation',
      status: 'pending',
      submittedDate: '2024-11-01',
      currentBalance: 120,
      impactAnalysis: { coverage: 'adequate', conflicts: 0, recommendation: 'approve' }
    },
    {
      id: 2,
      employee: 'Sarah Williams',
      badge: 'D-1987',
      department: 'Patrol Division',
      type: 'Sick Leave',
      startDate: '2024-11-06',
      endDate: '2024-11-08',
      days: 3,
      reason: 'Medical appointment and recovery',
      status: 'pending',
      submittedDate: '2024-11-03',
      currentBalance: 88,
      impactAnalysis: { coverage: 'tight', conflicts: 1, recommendation: 'review' }
    },
    {
      id: 3,
      employee: 'Robert Martinez',
      badge: 'D-2301',
      department: 'Patrol Division',
      type: 'Personal Leave',
      startDate: '2024-11-20',
      endDate: '2024-11-21',
      days: 2,
      reason: 'Personal matter',
      status: 'pending',
      submittedDate: '2024-11-02',
      currentBalance: 64,
      impactAnalysis: { coverage: 'adequate', conflicts: 0, recommendation: 'approve' }
    },
    {
      id: 4,
      employee: 'Jennifer Taylor',
      badge: 'ADM-0145',
      department: 'Administrative Services',
      type: 'Annual Leave',
      startDate: '2024-12-23',
      endDate: '2024-12-31',
      days: 7,
      reason: 'Holiday vacation',
      status: 'pending',
      submittedDate: '2024-11-04',
      currentBalance: 96,
      impactAnalysis: { coverage: 'low', conflicts: 2, recommendation: 'review' }
    },
    {
      id: 5,
      employee: 'Amanda Garcia',
      badge: 'BI-0032',
      department: 'Human Resources',
      type: 'FMLA',
      startDate: '2024-11-25',
      endDate: '2024-12-06',
      days: 10,
      reason: 'Medical leave (FMLA qualified)',
      status: 'pending',
      submittedDate: '2024-11-01',
      currentBalance: 0,
      impactAnalysis: { coverage: 'critical', conflicts: 0, recommendation: 'approve-legal' }
    },
    {
      id: 6,
      employee: 'Daniel Wilson',
      badge: 'D-2405',
      department: 'Patrol Division',
      type: 'Annual Leave',
      startDate: '2024-11-10',
      endDate: '2024-11-14',
      days: 5,
      reason: 'Extended weekend trip',
      status: 'approved',
      submittedDate: '2024-10-20',
      approvedDate: '2024-10-22',
      approvedBy: 'Captain Anderson',
      currentBalance: 72
    },
    {
      id: 7,
      employee: 'Emily Johnson',
      badge: 'BI-0032',
      department: 'Human Resources',
      type: 'Sick Leave',
      startDate: '2024-10-28',
      endDate: '2024-10-29',
      days: 2,
      reason: 'Illness',
      status: 'approved',
      submittedDate: '2024-10-27',
      approvedDate: '2024-10-27',
      approvedBy: 'HR Director',
      currentBalance: 56
    },
    {
      id: 8,
      employee: 'Michael Davis',
      badge: 'DET-0098',
      department: 'Detention Center',
      type: 'Annual Leave',
      startDate: '2024-12-02',
      endDate: '2024-12-05',
      days: 4,
      reason: 'Family event',
      status: 'denied',
      submittedDate: '2024-10-25',
      deniedDate: '2024-10-27',
      deniedBy: 'Major Wilson',
      denialReason: 'Insufficient coverage during requested period',
      currentBalance: 104
    }
  ]);

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

  const getStatusConfig = (status) => {
    const configs = {
      pending: { bg: 'bg-amber-500/20', text: 'text-amber-400', border: 'border-amber-500/30', label: 'PENDING' },
      approved: { bg: 'bg-green-500/20', text: 'text-green-400', border: 'border-green-500/30', label: 'APPROVED' },
      denied: { bg: 'bg-red-500/20', text: 'text-red-400', border: 'border-red-500/30', label: 'DENIED' }
    };
    return configs[status] || configs.pending;
  };

  const getTypeColor = (type) => {
    if (type === 'Annual Leave') return 'text-blue-400';
    if (type === 'Sick Leave') return 'text-purple-400';
    if (type === 'Personal Leave') return 'text-cyan-400';
    if (type === 'FMLA') return 'text-red-400';
    return 'text-slate-400';
  };

  const filteredRequests = timeOffRequests.filter(req => {
    if (activeTab === 'all') return true;
    return req.status === activeTab;
  });

  const statusCounts = {
    all: timeOffRequests.length,
    pending: timeOffRequests.filter(r => r.status === 'pending').length,
    approved: timeOffRequests.filter(r => r.status === 'approved').length,
    denied: timeOffRequests.filter(r => r.status === 'denied').length
  };

  const upcomingAbsences = timeOffRequests.filter(r =>
    r.status === 'approved' && new Date(r.startDate) > new Date()
  ).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex">
      {/* Sidebar - same structure */}
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
                <button
                  onClick={() => navigate(createPageUrl('HRDashboard'))}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  HR Dashboard
                </button>
                <ChevronRight className="w-4 h-4 text-slate-600" />
                <span className="text-white">Time Off Management</span>
              </div>
            </div>
            <div className="flex items-center gap-2 lg:gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-slate-800/40 border border-slate-700/50 rounded-xl text-slate-300 hover:bg-slate-800/60 transition-all">
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Export</span>
              </button>

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
              <h2 className="text-2xl lg:text-3xl font-bold text-white mb-2">Time Off Management</h2>
              <p className="text-slate-400">Review and approve employee leave requests</p>
            </div>

            {/* AI Insights */}
            <div className="mb-6 bg-gradient-to-br from-blue-500/10 to-cyan-500/5 border border-blue-500/20 rounded-xl p-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-6 h-6 text-blue-400" />
                </div>
                <div className="flex-1">
                  <h4 className="text-base font-semibold text-white mb-2">AI Coverage Intelligence</h4>
                  <div className="space-y-2 text-sm text-slate-300">
                    <p>• <span className="font-bold text-green-400">3 requests safe to approve:</span> Marcus Chen, Robert Martinez, and Daniel Wilson have adequate coverage</p>
                    <p>• <span className="font-bold text-amber-400">2 requests need review:</span> Sarah Williams and Jennifer Taylor have coverage conflicts</p>
                    <p>• <span className="font-bold text-red-400">FMLA request detected:</span> Amanda Garcia - legally protected, recommend immediate approval</p>
                    <p>• <span className="font-bold text-blue-400">Holiday coverage alert:</span> Thanksgiving week needs 2 additional patrol officers</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 bg-amber-500/20 rounded-xl flex items-center justify-center">
                    <Clock className="w-5 h-5 text-amber-400" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-white mb-1">{statusCounts.pending}</p>
                <p className="text-sm text-slate-400">Pending Requests</p>
              </div>

              <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-white mb-1">{statusCounts.approved}</p>
                <p className="text-sm text-slate-400">Approved This Month</p>
              </div>

              <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-blue-400" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-white mb-1">{upcomingAbsences}</p>
                <p className="text-sm text-slate-400">Upcoming Absences</p>
              </div>

              <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 bg-red-500/20 rounded-xl flex items-center justify-center">
                    <XCircle className="w-5 h-5 text-red-400" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-white mb-1">{statusCounts.denied}</p>
                <p className="text-sm text-slate-400">Denied Requests</p>
              </div>
            </div>

            {/* Status Tabs */}
            <div className="mb-6 flex gap-2 border-b border-slate-700/50 overflow-x-auto">
              {[
                { id: 'all', label: 'All Requests', count: statusCounts.all },
                { id: 'pending', label: 'Pending', count: statusCounts.pending },
                { id: 'approved', label: 'Approved', count: statusCounts.approved },
                { id: 'denied', label: 'Denied', count: statusCounts.denied }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-all relative whitespace-nowrap ${
                    activeTab === tab.id ? 'text-amber-400' : 'text-slate-400 hover:text-slate-300'
                  }`}
                >
                  {tab.label}
                  <span className={`px-2 py-0.5 rounded-full text-xs ${
                    activeTab === tab.id ? 'bg-amber-500/20 text-amber-400' : 'bg-slate-700/50 text-slate-400'
                  }`}>{tab.count}</span>
                  {activeTab === tab.id && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500"></div>
                  )}
                </button>
              ))}
            </div>

            {/* Time Off Requests List */}
            <div className="space-y-4">
              {filteredRequests.map(request => {
                const statusConfig = getStatusConfig(request.status);
                const typeColor = getTypeColor(request.type);

                return (
                  <div
                    key={request.id}
                    className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-5 hover:bg-slate-800/50 transition-all cursor-pointer"
                    onClick={() => setSelectedRequest(request)}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                          <Calendar className="w-6 h-6 text-blue-400" />
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2 flex-wrap">
                            <h3 className="text-lg font-semibold text-white">{request.employee}</h3>
                            <span className="px-2 py-1 bg-slate-700/50 rounded text-xs text-slate-300 font-mono">{request.badge}</span>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold border ${statusConfig.bg} ${statusConfig.text} ${statusConfig.border}`}>
                              {statusConfig.label}
                            </span>
                            {request.status === 'pending' && request.impactAnalysis.coverage === 'critical' && (
                              <span className="px-2 py-1 bg-red-500/20 border border-red-500/30 rounded text-xs text-red-400 font-bold">
                                CRITICAL COVERAGE
                              </span>
                            )}
                          </div>

                          <p className={`text-sm font-medium mb-3 ${typeColor}`}>{request.type} • {request.department}</p>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs text-slate-400 mb-3">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-3 h-3" />
                              <span>{new Date(request.startDate).toLocaleDateString()} - {new Date(request.endDate).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="w-3 h-3" />
                              <span>{request.days} days</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Users className="w-3 h-3" />
                              <span>Balance: {request.currentBalance}h</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <FileText className="w-3 h-3" />
                              <span>Submitted: {new Date(request.submittedDate).toLocaleDateString()}</span>
                            </div>
                          </div>

                          <p className="text-sm text-slate-300 mb-3"><span className="font-semibold">Reason:</span> {request.reason}</p>

                          {request.status === 'pending' && request.impactAnalysis && (
                            <div className={`p-3 rounded-lg ${
                              request.impactAnalysis.recommendation === 'approve' ? 'bg-green-500/10 border border-green-500/20' :
                              request.impactAnalysis.recommendation === 'approve-legal' ? 'bg-purple-500/10 border border-purple-500/20' :
                              'bg-amber-500/10 border border-amber-500/20'
                            }`}>
                              <p className="text-xs font-semibold text-white mb-1">AI Impact Analysis</p>
                              <div className="flex items-center gap-3 text-xs">
                                <span className="text-slate-300">Coverage: <span className="font-bold">{request.impactAnalysis.coverage}</span></span>
                                <span className="text-slate-300">Conflicts: <span className="font-bold">{request.impactAnalysis.conflicts}</span></span>
                                <span className={`font-bold ${
                                  request.impactAnalysis.recommendation === 'approve' ? 'text-green-400' :
                                  request.impactAnalysis.recommendation === 'approve-legal' ? 'text-purple-400' :
                                  'text-amber-400'
                                }`}>
                                  {request.impactAnalysis.recommendation === 'approve-legal' ? 'APPROVE (FMLA)' : request.impactAnalysis.recommendation.toUpperCase()}
                                </span>
                              </div>
                            </div>
                          )}

                          {request.status === 'denied' && (
                            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                              <p className="text-xs font-semibold text-red-400 mb-1">Denial Reason</p>
                              <p className="text-xs text-slate-300">{request.denialReason}</p>
                              <p className="text-xs text-slate-500 mt-1">Denied by {request.deniedBy} on {new Date(request.deniedDate).toLocaleDateString()}</p>
                            </div>
                          )}
                        </div>
                      </div>

                      {request.status === 'pending' && (
                        <div className="flex items-center gap-2">
                          <button className="px-4 py-2 bg-green-500/20 hover:bg-green-500/30 border border-green-500/30 text-green-400 rounded-lg text-sm font-medium transition-all">
                            Approve
                          </button>
                          <button className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-400 rounded-lg text-sm font-medium transition-all">
                            Deny
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </main>
      </div>

      {/* AI Chat */}
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
                <h3 className="text-sm font-semibold text-white">Time Off AI Assistant</h3>
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
                  <p className="text-sm text-slate-200">Hi! I can help you analyze coverage impacts, identify conflicts, recommend approvals, and answer questions about time off policies. What do you need?</p>
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 border-t border-slate-700/50">
            <div className="flex items-center gap-2">
              <input type="text" placeholder="Ask about time off..." className="flex-1 px-4 py-2 bg-slate-800/40 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50" />
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

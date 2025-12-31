import React, { useState } from 'react';
import { Home, Users, FileText, LayoutDashboard, TrendingUp, AlertCircle, Settings, Bell, MessageCircle, Search, ChevronRight, DollarSign, CheckCircle, Shield, Sparkles, X, Send, Menu, ChevronLeft, LogOut, UserPlus, Briefcase, Clock, Award, Filter, Download, Eye, Calendar, Phone, Mail, MapPin, Star, FileCheck, Upload, CheckCircle2, Circle, AlertTriangle, ClipboardCheck, GraduationCap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function NewHireOnboarding() {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState('onboarding');
  const [chatOpen, setChatOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [logoutConfirmOpen, setLogoutConfirmOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('active');
  const [selectedNewHire, setSelectedNewHire] = useState(null);

  const navigation = [
    { id: 'hr-dashboard', label: 'HR Dashboard', icon: Users, page: 'HRDashboard' },
    { id: 'job-postings', label: 'Job Postings', icon: Briefcase, page: 'JobPostings' },
    { id: 'applicant-tracking', label: 'Applicant Tracking', icon: UserPlus, page: 'ApplicantTracking' },
    { id: 'hiring-pipeline', label: 'Hiring Pipeline', icon: TrendingUp, page: 'HiringPipeline' },
    { id: 'compliance', label: 'HR Compliance', icon: ClipboardCheck, page: 'ComplianceManagement' },
    { id: 'onboarding', label: 'New Hire Onboarding', icon: FileCheck },
    { id: 'training-certifications', label: 'Training & Certifications', icon: GraduationCap, page: 'TrainingCertifications' },
    { id: 'employee-records', label: 'Employee Records', icon: FileText, page: 'EmployeeRecords' },
    { id: 'time-off', label: 'Time Off Management', icon: Calendar, page: 'TimeOffManagement' },
    { id: 'performance', label: 'Performance Reviews', icon: Award, page: 'PerformanceReviews' },
    { id: 'hr-reports', label: 'HR Reports', icon: LayoutDashboard, page: 'HRReports' },
    { id: 'settings', label: 'Settings', icon: Settings, page: 'HRSettings' }
  ];

  const notifications = [
    { id: 1, title: '5 New Applications', message: 'Deputy Sheriff position received 5 applications', time: '15 min ago', urgent: false },
    { id: 2, title: 'Interview Scheduled', message: 'Background investigator interview - Tomorrow 10 AM', time: '1 hour ago', urgent: true },
    { id: 3, title: '3 Onboarding Tasks Due', message: 'New hire paperwork pending completion', time: '2 hours ago', urgent: true }
  ];

  const [newHires] = useState([
    {
      id: 1,
      name: 'Christopher Lee',
      position: 'Deputy Sheriff',
      department: 'Patrol Division',
      startDate: '2024-11-15',
      email: 'christopher.lee@gwinnettso.gov',
      phone: '(555) 123-4567',
      status: 'in-progress',
      completion: 65,
      daysUntilStart: 11,
      tasks: [
        { id: 1, category: 'Paperwork', name: 'I-9 Form', status: 'completed', dueDate: '2024-11-08', completedDate: '2024-11-06' },
        { id: 2, category: 'Paperwork', name: 'W-4 Tax Form', status: 'completed', dueDate: '2024-11-08', completedDate: '2024-11-07' },
        { id: 3, category: 'Paperwork', name: 'Direct Deposit Form', status: 'completed', dueDate: '2024-11-08', completedDate: '2024-11-07' },
        { id: 4, category: 'Paperwork', name: 'Benefits Enrollment', status: 'in-progress', dueDate: '2024-11-10', completedDate: null },
        { id: 5, category: 'Equipment', name: 'Badge Assignment', status: 'pending', dueDate: '2024-11-12', completedDate: null },
        { id: 6, category: 'Equipment', name: 'Uniform Fitting', status: 'pending', dueDate: '2024-11-12', completedDate: null },
        { id: 7, category: 'IT Setup', name: 'Email Account', status: 'completed', dueDate: '2024-11-09', completedDate: '2024-11-08' },
        { id: 8, category: 'IT Setup', name: 'System Access', status: 'pending', dueDate: '2024-11-14', completedDate: null },
        { id: 9, category: 'Training', name: 'Orientation Session', status: 'scheduled', dueDate: '2024-11-15', completedDate: null },
        { id: 10, category: 'Training', name: 'Safety Training', status: 'pending', dueDate: '2024-11-16', completedDate: null }
      ]
    },
    {
      id: 2,
      name: 'Nicole Brown',
      position: 'Detention Officer',
      department: 'Detention Center',
      startDate: '2024-11-18',
      email: 'nicole.brown@gwinnettso.gov',
      phone: '(555) 234-5678',
      status: 'in-progress',
      completion: 40,
      daysUntilStart: 14,
      tasks: [
        { id: 1, category: 'Paperwork', name: 'I-9 Form', status: 'completed', dueDate: '2024-11-08', completedDate: '2024-11-07' },
        { id: 2, category: 'Paperwork', name: 'W-4 Tax Form', status: 'completed', dueDate: '2024-11-08', completedDate: '2024-11-07' },
        { id: 3, category: 'Paperwork', name: 'Direct Deposit Form', status: 'pending', dueDate: '2024-11-10', completedDate: null },
        { id: 4, category: 'Paperwork', name: 'Benefits Enrollment', status: 'pending', dueDate: '2024-11-12', completedDate: null },
        { id: 5, category: 'Equipment', name: 'Badge Assignment', status: 'pending', dueDate: '2024-11-15', completedDate: null },
        { id: 6, category: 'Equipment', name: 'Uniform Fitting', status: 'pending', dueDate: '2024-11-15', completedDate: null },
        { id: 7, category: 'IT Setup', name: 'Email Account', status: 'pending', dueDate: '2024-11-12', completedDate: null },
        { id: 8, category: 'IT Setup', name: 'System Access', status: 'pending', dueDate: '2024-11-17', completedDate: null },
        { id: 9, category: 'Training', name: 'Orientation Session', status: 'pending', dueDate: '2024-11-18', completedDate: null },
        { id: 10, category: 'Training', name: 'Safety Training', status: 'pending', dueDate: '2024-11-19', completedDate: null }
      ]
    },
    {
      id: 3,
      name: 'Emily Johnson',
      position: 'Background Investigator',
      department: 'Human Resources',
      startDate: '2024-11-20',
      email: 'emily.johnson@gwinnettso.gov',
      phone: '(555) 345-6789',
      status: 'not-started',
      completion: 0,
      daysUntilStart: 16,
      tasks: [
        { id: 1, category: 'Paperwork', name: 'I-9 Form', status: 'pending', dueDate: '2024-11-12', completedDate: null },
        { id: 2, category: 'Paperwork', name: 'W-4 Tax Form', status: 'pending', dueDate: '2024-11-12', completedDate: null },
        { id: 3, category: 'Paperwork', name: 'Direct Deposit Form', status: 'pending', dueDate: '2024-11-12', completedDate: null },
        { id: 4, category: 'Paperwork', name: 'Benefits Enrollment', status: 'pending', dueDate: '2024-11-15', completedDate: null },
        { id: 5, category: 'Equipment', name: 'Badge Assignment', status: 'pending', dueDate: '2024-11-18', completedDate: null },
        { id: 6, category: 'Equipment', name: 'Office Setup', status: 'pending', dueDate: '2024-11-18', completedDate: null },
        { id: 7, category: 'IT Setup', name: 'Email Account', status: 'pending', dueDate: '2024-11-15', completedDate: null },
        { id: 8, category: 'IT Setup', name: 'System Access', status: 'pending', dueDate: '2024-11-19', completedDate: null },
        { id: 9, category: 'Training', name: 'Orientation Session', status: 'pending', dueDate: '2024-11-20', completedDate: null },
        { id: 10, category: 'Training', name: 'CJIS Training', status: 'pending', dueDate: '2024-11-21', completedDate: null }
      ]
    },
    {
      id: 4,
      name: 'Daniel Wilson',
      position: 'Deputy Sheriff',
      department: 'Patrol Division',
      startDate: '2024-10-15',
      email: 'daniel.wilson@gwinnettso.gov',
      phone: '(555) 456-7890',
      status: 'completed',
      completion: 100,
      daysUntilStart: -20,
      tasks: [
        { id: 1, category: 'Paperwork', name: 'I-9 Form', status: 'completed', dueDate: '2024-10-08', completedDate: '2024-10-05' },
        { id: 2, category: 'Paperwork', name: 'W-4 Tax Form', status: 'completed', dueDate: '2024-10-08', completedDate: '2024-10-05' },
        { id: 3, category: 'Paperwork', name: 'Direct Deposit Form', status: 'completed', dueDate: '2024-10-08', completedDate: '2024-10-06' },
        { id: 4, category: 'Paperwork', name: 'Benefits Enrollment', status: 'completed', dueDate: '2024-10-10', completedDate: '2024-10-08' },
        { id: 5, category: 'Equipment', name: 'Badge Assignment', status: 'completed', dueDate: '2024-10-12', completedDate: '2024-10-11' },
        { id: 6, category: 'Equipment', name: 'Uniform Fitting', status: 'completed', dueDate: '2024-10-12', completedDate: '2024-10-11' },
        { id: 7, category: 'IT Setup', name: 'Email Account', status: 'completed', dueDate: '2024-10-10', completedDate: '2024-10-09' },
        { id: 8, category: 'IT Setup', name: 'System Access', status: 'completed', dueDate: '2024-10-14', completedDate: '2024-10-13' },
        { id: 9, category: 'Training', name: 'Orientation Session', status: 'completed', dueDate: '2024-10-15', completedDate: '2024-10-15' },
        { id: 10, category: 'Training', name: 'Safety Training', status: 'completed', dueDate: '2024-10-16', completedDate: '2024-10-16' }
      ]
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
      'not-started': { bg: 'bg-slate-500/20', text: 'text-slate-400', border: 'border-slate-500/30', label: 'NOT STARTED' },
      'in-progress': { bg: 'bg-blue-500/20', text: 'text-blue-400', border: 'border-blue-500/30', label: 'IN PROGRESS' },
      'completed': { bg: 'bg-green-500/20', text: 'text-green-400', border: 'border-green-500/30', label: 'COMPLETED' },
      'overdue': { bg: 'bg-red-500/20', text: 'text-red-400', border: 'border-red-500/30', label: 'OVERDUE' }
    };
    return configs[status] || configs['not-started'];
  };

  const getTaskStatusIcon = (status) => {
    if (status === 'completed') return <CheckCircle2 className="w-4 h-4 text-green-400" />;
    if (status === 'in-progress') return <Clock className="w-4 h-4 text-blue-400" />;
    if (status === 'scheduled') return <Calendar className="w-4 h-4 text-purple-400" />;
    return <Circle className="w-4 h-4 text-slate-500" />;
  };

  const filteredNewHires = newHires.filter(hire => {
    if (activeTab === 'all') return true;
    if (activeTab === 'active') return hire.status === 'in-progress' || hire.status === 'not-started';
    return hire.status === activeTab;
  });

  const statusCounts = {
    all: newHires.length,
    active: newHires.filter(h => h.status === 'in-progress' || h.status === 'not-started').length,
    'in-progress': newHires.filter(h => h.status === 'in-progress').length,
    completed: newHires.filter(h => h.status === 'completed').length
  };

  const overdueTasks = newHires
    .flatMap(hire => hire.tasks.filter(task => task.status !== 'completed' && new Date(task.dueDate) < new Date()))
    .length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex">
      {/* Sidebar - Same as previous pages */}
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
                <span className="text-white">New Hire Onboarding</span>
              </div>
            </div>
            <div className="flex items-center gap-2 lg:gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl text-sm font-medium transition-all">
                <UserPlus className="w-4 h-4" />
                <span className="hidden sm:inline">Add New Hire</span>
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
              <h2 className="text-2xl lg:text-3xl font-bold text-white mb-2">New Hire Onboarding</h2>
              <p className="text-slate-400">Track and manage new employee onboarding tasks</p>
            </div>

            {/* AI Insights */}
            <div className="mb-6 bg-gradient-to-br from-green-500/10 to-emerald-500/5 border border-green-500/20 rounded-xl p-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-6 h-6 text-green-400" />
                </div>
                <div className="flex-1">
                  <h4 className="text-base font-semibold text-white mb-2">AI Onboarding Intelligence</h4>
                  <div className="space-y-2 text-sm text-slate-300">
                    <p>• <span className="font-bold text-green-400">Christopher Lee at 65% completion</span> - on track for Nov 15 start date</p>
                    <p>• <span className="font-bold text-amber-400">Nicole Brown needs attention:</span> 4 pending tasks with approaching deadlines</p>
                    <p>• <span className="font-bold text-red-400">Emily Johnson not started:</span> Send automated reminder for paperwork</p>
                    <p>• <span className="font-bold text-blue-400">Efficiency insight:</span> Avg onboarding completion time: 12 days (industry: 15 days)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
                    <UserPlus className="w-5 h-5 text-blue-400" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-white mb-1">{statusCounts.active}</p>
                <p className="text-sm text-slate-400">Active Onboarding</p>
              </div>

              <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-white mb-1">{statusCounts.completed}</p>
                <p className="text-sm text-slate-400">Completed This Month</p>
              </div>

              <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 bg-red-500/20 rounded-xl flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5 text-red-400" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-white mb-1">{overdueTasks}</p>
                <p className="text-sm text-slate-400">Overdue Tasks</p>
              </div>

              <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center">
                    <Clock className="w-5 h-5 text-purple-400" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-white mb-1">12</p>
                <p className="text-sm text-slate-400">Avg Days to Complete</p>
              </div>
            </div>

            {/* Status Tabs */}
            <div className="mb-6 flex gap-2 border-b border-slate-700/50 overflow-x-auto">
              {[
                { id: 'all', label: 'All New Hires', count: statusCounts.all },
                { id: 'active', label: 'Active', count: statusCounts.active },
                { id: 'in-progress', label: 'In Progress', count: statusCounts['in-progress'] },
                { id: 'completed', label: 'Completed', count: statusCounts.completed }
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

            {/* New Hires List */}
            <div className="space-y-4">
              {filteredNewHires.map(hire => {
                const statusConfig = getStatusConfig(hire.status);
                const completedTasks = hire.tasks.filter(t => t.status === 'completed').length;
                const totalTasks = hire.tasks.length;

                return (
                  <div
                    key={hire.id}
                    className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-5 hover:bg-slate-800/50 transition-all"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                          <Users className="w-6 h-6 text-blue-400" />
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2 flex-wrap">
                            <h3 className="text-lg font-semibold text-white">{hire.name}</h3>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold border ${statusConfig.bg} ${statusConfig.text} ${statusConfig.border}`}>
                              {statusConfig.label}
                            </span>
                            {hire.daysUntilStart > 0 && hire.daysUntilStart <= 7 && (
                              <span className="px-2 py-1 bg-amber-500/20 border border-amber-500/30 rounded text-xs text-amber-400 font-bold">
                                STARTS IN {hire.daysUntilStart} DAYS
                              </span>
                            )}
                          </div>

                          <p className="text-sm text-slate-300 mb-3">{hire.position} • {hire.department}</p>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs text-slate-400 mb-4">
                            <div className="flex items-center gap-2">
                              <Mail className="w-3 h-3" />
                              <span>{hire.email}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Phone className="w-3 h-3" />
                              <span>{hire.phone}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar className="w-3 h-3" />
                              <span>Start: {new Date(hire.startDate).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <FileCheck className="w-3 h-3" />
                              <span>{completedTasks}/{totalTasks} Tasks Complete</span>
                            </div>
                          </div>

                          <div className="mb-3">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-xs text-slate-400">Overall Progress</span>
                              <span className="text-xs font-bold text-white">{hire.completion}%</span>
                            </div>
                            <div className="w-full h-2 bg-slate-700/50 rounded-full overflow-hidden">
                              <div
                                className={`h-full transition-all ${
                                  hire.completion === 100 ? 'bg-green-500' :
                                  hire.completion >= 50 ? 'bg-blue-500' : 'bg-amber-500'
                                }`}
                                style={{ width: `${hire.completion}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => setSelectedNewHire(hire)}
                        className="px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 text-blue-400 rounded-lg text-sm font-medium transition-all"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </main>
      </div>

      {/* New Hire Detail Modal */}
      {selectedNewHire && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedNewHire(null)}
          />
          <div className="relative bg-slate-900 border border-slate-700/50 rounded-2xl p-6 max-w-4xl w-full shadow-2xl max-h-[80vh] overflow-y-auto">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">{selectedNewHire.name}</h3>
                <p className="text-sm text-slate-400">{selectedNewHire.position} • {selectedNewHire.department}</p>
              </div>
              <button
                onClick={() => setSelectedNewHire(null)}
                className="p-2 hover:bg-slate-800/50 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-300">Overall Progress</span>
                <span className="text-sm font-bold text-white">{selectedNewHire.completion}%</span>
              </div>
              <div className="w-full h-3 bg-slate-700/50 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-green-500 transition-all"
                  style={{ width: `${selectedNewHire.completion}%` }}
                />
              </div>
            </div>

            <div className="space-y-4">
              {['Paperwork', 'Equipment', 'IT Setup', 'Training'].map(category => {
                const categoryTasks = selectedNewHire.tasks.filter(t => t.category === category);
                return (
                  <div key={category} className="bg-slate-800/40 rounded-xl p-5 border border-slate-700/50">
                    <h4 className="text-base font-semibold text-white mb-4">{category}</h4>
                    <div className="space-y-3">
                      {categoryTasks.map(task => (
                        <div key={task.id} className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg">
                          <div className="flex items-center gap-3 flex-1">
                            {getTaskStatusIcon(task.status)}
                            <div className="flex-1">
                              <p className="text-sm font-medium text-white">{task.name}</p>
                              <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                                <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                                {task.completedDate && (
                                  <span className="text-green-400">Completed: {new Date(task.completedDate).toLocaleDateString()}</span>
                                )}
                              </div>
                            </div>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                            task.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                            task.status === 'in-progress' ? 'bg-blue-500/20 text-blue-400' :
                            task.status === 'scheduled' ? 'bg-purple-500/20 text-purple-400' :
                            'bg-slate-500/20 text-slate-400'
                          }`}>
                            {task.status.toUpperCase().replace('-', ' ')}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex gap-3 pt-6 border-t border-slate-700/50 mt-6">
              <button className="flex-1 px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-medium transition-all">
                Send Reminder
              </button>
              <button className="flex-1 px-4 py-3 bg-green-500/20 hover:bg-green-500/30 border border-green-500/30 text-green-400 rounded-xl font-medium transition-all">
                Mark Task Complete
              </button>
              <button className="px-4 py-3 bg-slate-700/40 hover:bg-slate-700/60 border border-slate-600/50 text-white rounded-xl font-medium transition-all">
                Export Checklist
              </button>
            </div>
          </div>
        </div>
      )}

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
                <h3 className="text-sm font-semibold text-white">Onboarding AI Assistant</h3>
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
                  <p className="text-sm text-slate-200">Hi! I can help you track onboarding progress, send automated reminders, identify bottlenecks, and answer questions about new hire processes. What do you need?</p>
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 border-t border-slate-700/50">
            <div className="flex items-center gap-2">
              <input type="text" placeholder="Ask about onboarding..." className="flex-1 px-4 py-2 bg-slate-800/40 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50" />
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

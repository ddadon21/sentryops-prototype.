import React, { useState } from 'react';
import { Users, FileText, LayoutDashboard, TrendingUp, Settings, Bell, MessageCircle, Search, ChevronRight, CheckCircle, Shield, Sparkles, X, Send, Menu, ChevronLeft, LogOut, UserPlus, Briefcase, Clock, Award, Download, Calendar, Phone, Mail, Star, FileCheck, BadgeCheck, AlertTriangle, AlertCircle, XCircle, ClipboardCheck, GraduationCap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function EmployeeRecords() {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState('employee-records');
  const [chatOpen, setChatOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [logoutConfirmOpen, setLogoutConfirmOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const navigation = [
    { id: 'hr-dashboard', label: 'HR Dashboard', icon: Users, page: 'HRDashboard' },
    { id: 'job-postings', label: 'Job Postings', icon: Briefcase, page: 'JobPostings' },
    { id: 'applicant-tracking', label: 'Applicant Tracking', icon: UserPlus, page: 'ApplicantTracking' },
    { id: 'hiring-pipeline', label: 'Hiring Pipeline', icon: TrendingUp, page: 'HiringPipeline' },
    { id: 'compliance', label: 'HR Compliance', icon: ClipboardCheck, page: 'ComplianceManagement' },
    { id: 'onboarding', label: 'New Hire Onboarding', icon: FileCheck, page: 'NewHireOnboarding' },
    { id: 'training-certifications', label: 'Training & Certifications', icon: GraduationCap, page: 'TrainingCertifications' },
    { id: 'employee-records', label: 'Employee Records', icon: FileText },
    { id: 'time-off', label: 'Time Off Management', icon: Calendar, page: 'TimeOffManagement' },
    { id: 'performance', label: 'Performance Reviews', icon: Award, page: 'PerformanceReviews' },
    { id: 'hr-reports', label: 'HR Reports', icon: LayoutDashboard, page: 'HRReports' },
    { id: 'settings', label: 'Settings', icon: Settings, page: 'HRSettings' }
  ];

  const notifications = [
    { id: 1, title: '3 Certifications Expiring', message: 'Firearms, CPR, P.O.S.T. renewals needed', time: '15 min ago', urgent: true },
    { id: 2, title: 'Performance Review Due', message: '5 quarterly reviews need completion', time: '1 hour ago', urgent: true },
    { id: 3, title: 'New Employee Added', message: 'Christopher Lee - Deputy Sheriff', time: '2 hours ago', urgent: false }
  ];

  const [employees] = useState([
    {
      id: 1,
      name: 'Marcus Chen',
      badge: 'D-2145',
      position: 'Deputy Sheriff',
      department: 'Patrol Division',
      division: 'Field Operations',
      status: 'active',
      hireDate: '2018-03-15',
      email: 'marcus.chen@gwinnettso.gov',
      phone: '(555) 234-5678',
      supervisor: 'Captain Anderson',
      yearsOfService: 6,
      certifications: [
        { name: 'P.O.S.T. Certification', status: 'valid', expires: '2025-06-30', daysUntilExpiry: 221 },
        { name: 'Firearms Qualification', status: 'valid', expires: '2025-03-15', daysUntilExpiry: 114 },
        { name: 'CPR/First Aid', status: 'expiring', expires: '2024-12-10', daysUntilExpiry: 19 },
        { name: 'Defensive Tactics', status: 'valid', expires: '2025-08-20', daysUntilExpiry: 272 }
      ],
      performanceRating: 4.8,
      lastReview: '2024-08-15',
      nextReview: '2025-02-15'
    },
    {
      id: 2,
      name: 'Sarah Williams',
      badge: 'D-1987',
      position: 'Sergeant',
      department: 'Patrol Division',
      division: 'Field Operations',
      status: 'active',
      hireDate: '2015-06-20',
      email: 'sarah.williams@gwinnettso.gov',
      phone: '(555) 345-6789',
      supervisor: 'Major Davis',
      yearsOfService: 9,
      certifications: [
        { name: 'P.O.S.T. Certification', status: 'valid', expires: '2025-12-31', daysUntilExpiry: 405 },
        { name: 'Firearms Qualification', status: 'valid', expires: '2025-05-20', daysUntilExpiry: 180 },
        { name: 'CPR/First Aid', status: 'valid', expires: '2025-09-15', daysUntilExpiry: 298 },
        { name: 'Supervisor Training', status: 'valid', expires: '2025-11-30', daysUntilExpiry: 374 }
      ],
      performanceRating: 4.9,
      lastReview: '2024-09-20',
      nextReview: '2025-03-20'
    },
    {
      id: 3,
      name: 'Robert Martinez',
      badge: 'D-2301',
      position: 'Deputy Sheriff',
      department: 'Patrol Division',
      division: 'Field Operations',
      status: 'active',
      hireDate: '2020-01-10',
      email: 'robert.martinez@gwinnettso.gov',
      phone: '(555) 456-7890',
      supervisor: 'Sergeant Williams',
      yearsOfService: 4,
      certifications: [
        { name: 'P.O.S.T. Certification', status: 'valid', expires: '2026-01-10', daysUntilExpiry: 415 },
        { name: 'Firearms Qualification', status: 'expired', expires: '2024-10-10', daysUntilExpiry: -25 },
        { name: 'CPR/First Aid', status: 'valid', expires: '2025-07-20', daysUntilExpiry: 241 },
        { name: 'Defensive Tactics', status: 'valid', expires: '2025-04-15', daysUntilExpiry: 145 }
      ],
      performanceRating: 4.6,
      lastReview: '2024-07-10',
      nextReview: '2025-01-10'
    },
    {
      id: 4,
      name: 'Jennifer Taylor',
      badge: 'ADM-0145',
      position: 'Administrative Assistant',
      department: 'Administrative Services',
      division: 'Support Services',
      status: 'active',
      hireDate: '2019-09-05',
      email: 'jennifer.taylor@gwinnettso.gov',
      phone: '(555) 567-8901',
      supervisor: 'Director Johnson',
      yearsOfService: 5,
      certifications: [
        { name: 'CJIS Security Training', status: 'valid', expires: '2025-09-05', daysUntilExpiry: 288 },
        { name: 'Records Management', status: 'valid', expires: '2025-11-15', daysUntilExpiry: 359 }
      ],
      performanceRating: 4.7,
      lastReview: '2024-09-05',
      nextReview: '2025-03-05'
    },
    {
      id: 5,
      name: 'Amanda Garcia',
      badge: 'BI-0032',
      position: 'Background Investigator',
      department: 'Human Resources',
      division: 'Support Services',
      status: 'active',
      hireDate: '2021-11-01',
      email: 'amanda.garcia@gwinnettso.gov',
      phone: '(555) 678-9012',
      supervisor: 'HR Director',
      yearsOfService: 3,
      certifications: [
        { name: 'CJIS Certification', status: 'valid', expires: '2025-11-01', daysUntilExpiry: 345 },
        { name: 'Interview & Interrogation', status: 'valid', expires: '2025-06-15', daysUntilExpiry: 206 },
        { name: 'Background Investigation', status: 'valid', expires: '2025-12-30', daysUntilExpiry: 404 }
      ],
      performanceRating: 4.9,
      lastReview: '2024-11-01',
      nextReview: '2025-05-01'
    },
    {
      id: 6,
      name: 'Michael Davis',
      badge: 'DET-0098',
      position: 'Detention Officer',
      department: 'Detention Center',
      division: 'Detention',
      status: 'on-leave',
      hireDate: '2017-04-20',
      email: 'michael.davis@gwinnettso.gov',
      phone: '(555) 789-0123',
      supervisor: 'Major Wilson',
      yearsOfService: 7,
      certifications: [
        { name: 'Corrections Certification', status: 'valid', expires: '2025-04-20', daysUntilExpiry: 150 },
        { name: 'CPR/First Aid', status: 'valid', expires: '2025-08-10', daysUntilExpiry: 262 },
        { name: 'Crisis Intervention', status: 'valid', expires: '2025-10-15', daysUntilExpiry: 328 }
      ],
      performanceRating: 4.5,
      lastReview: '2024-04-20',
      nextReview: '2024-10-20'
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

  const getCertificationStatus = (cert) => {
    if (cert.status === 'expired') return { bg: 'bg-red-500/20', text: 'text-red-400', border: 'border-red-500/30', label: 'EXPIRED' };
    if (cert.status === 'expiring' || cert.daysUntilExpiry <= 30) return { bg: 'bg-amber-500/20', text: 'text-amber-400', border: 'border-amber-500/30', label: 'EXPIRING' };
    return { bg: 'bg-green-500/20', text: 'text-green-400', border: 'border-green-500/30', label: 'VALID' };
  };

  const getEmployeeStatus = (status) => {
    const configs = {
      active: { bg: 'bg-green-500/20', text: 'text-green-400', border: 'border-green-500/30', label: 'ACTIVE' },
      'on-leave': { bg: 'bg-amber-500/20', text: 'text-amber-400', border: 'border-amber-500/30', label: 'ON LEAVE' },
      inactive: { bg: 'bg-slate-500/20', text: 'text-slate-400', border: 'border-slate-500/30', label: 'INACTIVE' }
    };
    return configs[status] || configs.active;
  };

  const filteredEmployees = employees.filter(emp => {
    const deptMatch = filterDepartment === 'all' || emp.department === filterDepartment;
    const statusMatch = filterStatus === 'all' || emp.status === filterStatus;
    return deptMatch && statusMatch;
  });

  const expiringCerts = employees.flatMap(emp =>
    emp.certifications.filter(cert => cert.daysUntilExpiry <= 30 && cert.daysUntilExpiry > 0)
  ).length;

  const expiredCerts = employees.flatMap(emp =>
    emp.certifications.filter(cert => cert.status === 'expired')
  ).length;

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
                <button
                  onClick={() => navigate(createPageUrl('HRDashboard'))}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  HR Dashboard
                </button>
                <ChevronRight className="w-4 h-4 text-slate-600" />
                <span className="text-white">Employee Records</span>
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
              <h2 className="text-2xl lg:text-3xl font-bold text-white mb-2">Employee Records</h2>
              <p className="text-slate-400">Comprehensive employee information and certification tracking</p>
            </div>

            {/* AI Insights */}
            <div className="mb-6 bg-gradient-to-br from-red-500/10 to-amber-500/5 border border-red-500/20 rounded-xl p-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-red-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-6 h-6 text-red-400" />
                </div>
                <div className="flex-1">
                  <h4 className="text-base font-semibold text-white mb-2">AI Compliance Alert</h4>
                  <div className="space-y-2 text-sm text-slate-300">
                    <p>• <span className="font-bold text-red-400">CRITICAL: 1 expired certification</span> - Robert Martinez firearms qualification expired 25 days ago</p>
                    <p>• <span className="font-bold text-amber-400">3 certifications expiring soon:</span> Marcus Chen CPR (19 days), 2 others within 30 days</p>
                    <p>• <span className="font-bold text-blue-400">Performance reviews current:</span> 5 upcoming reviews scheduled, all on track</p>
                    <p>• <span className="font-bold text-green-400">Compliance rate: 94.3%</span> - above 90% target threshold</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
                    <Users className="w-5 h-5 text-blue-400" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-white mb-1">{employees.length}</p>
                <p className="text-sm text-slate-400">Total Employees</p>
              </div>

              <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center">
                    <BadgeCheck className="w-5 h-5 text-green-400" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-white mb-1">{employees.filter(e => e.status === 'active').length}</p>
                <p className="text-sm text-slate-400">Active Personnel</p>
              </div>

              <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 bg-amber-500/20 rounded-xl flex items-center justify-center">
                    <AlertCircle className="w-5 h-5 text-amber-400" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-white mb-1">{expiringCerts}</p>
                <p className="text-sm text-slate-400">Certs Expiring Soon</p>
              </div>

              <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 bg-red-500/20 rounded-xl flex items-center justify-center">
                    <XCircle className="w-5 h-5 text-red-400" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-white mb-1">{expiredCerts}</p>
                <p className="text-sm text-slate-400">Expired Certifications</p>
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search employees..."
                  className="w-full pl-12 pr-4 py-2.5 bg-slate-800/40 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50"
                />
              </div>
              <select
                value={filterDepartment}
                onChange={(e) => setFilterDepartment(e.target.value)}
                className="px-4 py-2.5 bg-slate-800/40 border border-slate-700/50 rounded-xl text-white text-sm focus:outline-none focus:border-amber-500/50 cursor-pointer"
              >
                <option value="all">All Departments</option>
                <option value="Patrol Division">Patrol Division</option>
                <option value="Administrative Services">Administrative Services</option>
                <option value="Human Resources">Human Resources</option>
                <option value="Detention Center">Detention Center</option>
              </select>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2.5 bg-slate-800/40 border border-slate-700/50 rounded-xl text-white text-sm focus:outline-none focus:border-amber-500/50 cursor-pointer"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="on-leave">On Leave</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            {/* Employee List */}
            <div className="space-y-4">
              {filteredEmployees.map(employee => {
                const statusConfig = getEmployeeStatus(employee.status);
                const expiringSoon = employee.certifications.filter(c => c.daysUntilExpiry <= 30 && c.daysUntilExpiry > 0).length;
                const expired = employee.certifications.filter(c => c.status === 'expired').length;

                return (
                  <div
                    key={employee.id}
                    className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-5 hover:bg-slate-800/50 transition-all cursor-pointer"
                    onClick={() => setSelectedEmployee(employee)}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                          <Users className="w-6 h-6 text-blue-400" />
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2 flex-wrap">
                            <h3 className="text-lg font-semibold text-white">{employee.name}</h3>
                            <span className="px-2 py-1 bg-slate-700/50 rounded text-xs text-slate-300 font-mono">{employee.badge}</span>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold border ${statusConfig.bg} ${statusConfig.text} ${statusConfig.border}`}>
                              {statusConfig.label}
                            </span>
                            {expired > 0 && (
                              <span className="px-2 py-1 bg-red-500/20 border border-red-500/30 rounded text-xs text-red-400 font-bold">
                                {expired} EXPIRED
                              </span>
                            )}
                            {expiringSoon > 0 && (
                              <span className="px-2 py-1 bg-amber-500/20 border border-amber-500/30 rounded text-xs text-amber-400 font-bold">
                                {expiringSoon} EXPIRING
                              </span>
                            )}
                          </div>

                          <p className="text-sm text-slate-300 mb-3">{employee.position} • {employee.department}</p>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs text-slate-400 mb-3">
                            <div className="flex items-center gap-2">
                              <Mail className="w-3 h-3" />
                              <span>{employee.email}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Phone className="w-3 h-3" />
                              <span>{employee.phone}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar className="w-3 h-3" />
                              <span>Hired: {new Date(employee.hireDate).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Users className="w-3 h-3" />
                              <span>Reports to: {employee.supervisor}</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-4 text-xs">
                            <div className="flex items-center gap-2">
                              <Clock className="w-3 h-3 text-blue-400" />
                              <span className="text-slate-300">{employee.yearsOfService} years of service</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                              <span className="text-slate-300">Rating: {employee.performanceRating}/5.0</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <BadgeCheck className="w-3 h-3 text-green-400" />
                              <span className="text-slate-300">{employee.certifications.length} certifications</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <button className="px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 text-blue-400 rounded-lg text-sm font-medium transition-all">
                        View Full Record
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </main>
      </div>

      {/* Employee Detail Modal */}
      {selectedEmployee && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedEmployee(null)}
          />
          <div className="relative bg-slate-900 border border-slate-700/50 rounded-2xl p-6 max-w-4xl w-full shadow-2xl max-h-[80vh] overflow-y-auto">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">{selectedEmployee.name}</h3>
                <p className="text-sm text-slate-400">{selectedEmployee.position} • Badge {selectedEmployee.badge}</p>
              </div>
              <button
                onClick={() => setSelectedEmployee(null)}
                className="p-2 hover:bg-slate-800/50 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-slate-800/40 rounded-xl p-4 border border-slate-700/50">
                  <p className="text-xs text-slate-400 mb-1">Department</p>
                  <p className="text-sm font-medium text-white">{selectedEmployee.department}</p>
                </div>
                <div className="bg-slate-800/40 rounded-xl p-4 border border-slate-700/50">
                  <p className="text-xs text-slate-400 mb-1">Hire Date</p>
                  <p className="text-sm font-medium text-white">{new Date(selectedEmployee.hireDate).toLocaleDateString()}</p>
                </div>
                <div className="bg-slate-800/40 rounded-xl p-4 border border-slate-700/50">
                  <p className="text-xs text-slate-400 mb-1">Years of Service</p>
                  <p className="text-sm font-medium text-white">{selectedEmployee.yearsOfService}</p>
                </div>
                <div className="bg-slate-800/40 rounded-xl p-4 border border-slate-700/50">
                  <p className="text-xs text-slate-400 mb-1">Supervisor</p>
                  <p className="text-sm font-medium text-white">{selectedEmployee.supervisor}</p>
                </div>
                <div className="bg-slate-800/40 rounded-xl p-4 border border-slate-700/50">
                  <p className="text-xs text-slate-400 mb-1">Performance Rating</p>
                  <p className="text-sm font-medium text-white">{selectedEmployee.performanceRating}/5.0</p>
                </div>
                <div className="bg-slate-800/40 rounded-xl p-4 border border-slate-700/50">
                  <p className="text-xs text-slate-400 mb-1">Next Review</p>
                  <p className="text-sm font-medium text-white">{new Date(selectedEmployee.nextReview).toLocaleDateString()}</p>
                </div>
              </div>

              <div>
                <h4 className="text-base font-semibold text-white mb-4">Certifications</h4>
                <div className="space-y-3">
                  {selectedEmployee.certifications.map((cert, idx) => {
                    const certStatus = getCertificationStatus(cert);
                    return (
                      <div key={idx} className="flex items-center justify-between p-4 bg-slate-800/40 rounded-xl border border-slate-700/50">
                        <div className="flex-1">
                          <p className="text-sm font-medium text-white mb-1">{cert.name}</p>
                          <p className="text-xs text-slate-400">
                            Expires: {new Date(cert.expires).toLocaleDateString()}
                            {cert.daysUntilExpiry > 0 && ` (${cert.daysUntilExpiry} days)`}
                            {cert.daysUntilExpiry < 0 && ` (${Math.abs(cert.daysUntilExpiry)} days overdue)`}
                          </p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${certStatus.bg} ${certStatus.text} ${certStatus.border}`}>
                          {certStatus.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-slate-700/50">
                <button className="flex-1 px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-medium transition-all">
                  Edit Record
                </button>
                <button className="flex-1 px-4 py-3 bg-green-500/20 hover:bg-green-500/30 border border-green-500/30 text-green-400 rounded-xl font-medium transition-all">
                  View Performance
                </button>
                <button className="px-4 py-3 bg-slate-700/40 hover:bg-slate-700/60 border border-slate-600/50 text-white rounded-xl font-medium transition-all">
                  Download PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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
                <h3 className="text-sm font-semibold text-white">Employee Records AI</h3>
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
                  <p className="text-sm text-slate-200">Hi! I can help you track certifications, identify compliance issues, analyze performance data, and answer questions about employee records. What do you need?</p>
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 border-t border-slate-700/50">
            <div className="flex items-center gap-2">
              <input type="text" placeholder="Ask about employees..." className="flex-1 px-4 py-2 bg-slate-800/40 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50" />
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

import React, { useState } from 'react';
import { Users, FileText, LayoutDashboard, TrendingUp, Settings, Bell, MessageCircle, Search, ChevronRight, Shield, Sparkles, X, Send, Menu, ChevronLeft, LogOut, GraduationCap, BookOpen, Award, Calendar, Clock, Play, Download, Upload, UserPlus, Briefcase, ClipboardCheck, FileCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function TrainingCertifications() {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState('training-certifications');
  const [chatOpen, setChatOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [logoutConfirmOpen, setLogoutConfirmOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');

  const navigation = [
    { id: 'hr-dashboard', label: 'HR Dashboard', icon: Users, page: 'HRDashboard' },
    { id: 'job-postings', label: 'Job Postings', icon: Briefcase, page: 'JobPostings' },
    { id: 'applicant-tracking', label: 'Applicant Tracking', icon: UserPlus, page: 'ApplicantTracking' },
    { id: 'hiring-pipeline', label: 'Hiring Pipeline', icon: TrendingUp, page: 'HiringPipeline' },
    { id: 'compliance', label: 'HR Compliance', icon: ClipboardCheck, page: 'ComplianceManagement' },
    { id: 'onboarding', label: 'New Hire Onboarding', icon: FileCheck, page: 'NewHireOnboarding' },
    { id: 'training-certifications', label: 'Training & Certifications', icon: GraduationCap },
    { id: 'employee-records', label: 'Employee Records', icon: FileText, page: 'EmployeeRecords' },
    { id: 'time-off', label: 'Time Off Management', icon: Calendar, page: 'TimeOffManagement' },
    { id: 'performance', label: 'Performance Reviews', icon: Award, page: 'PerformanceReviews' },
    { id: 'hr-reports', label: 'HR Reports', icon: LayoutDashboard, page: 'HRReports' },
    { id: 'settings', label: 'Settings', icon: Settings, page: 'HRSettings' }
  ];

  const trainingPrograms = [
    {
      id: 1,
      employeeName: 'Robert Martinez',
      department: 'Patrol Division',
      programName: 'Crisis Intervention Training (CIT)',
      category: 'Mental Health',
      status: 'Completed',
      completedDate: 'Nov 15, 2024',
      expiryDate: 'Nov 15, 2026',
      certificateNumber: 'CIT-2024-1847',
      hours: 40,
      instructor: 'Dr. Sarah Johnson',
      score: '95%'
    },
    {
      id: 2,
      employeeName: 'Robert Martinez',
      department: 'Patrol Division',
      programName: 'Defensive Tactics Recertification',
      category: 'Physical Training',
      status: 'Completed',
      completedDate: 'Oct 22, 2024',
      expiryDate: 'Oct 22, 2025',
      certificateNumber: 'DT-2024-8921',
      hours: 16,
      instructor: 'Sgt. Michael Chen',
      score: '98%'
    },
    {
      id: 3,
      employeeName: 'Sarah Chen',
      department: 'Investigations',
      programName: 'Advanced Interview Techniques',
      category: 'Investigative',
      status: 'In Progress',
      completedDate: null,
      expiryDate: null,
      certificateNumber: null,
      hours: 24,
      instructor: 'Lt. James Wilson',
      progress: '65%'
    },
    {
      id: 4,
      employeeName: 'Maria Rodriguez',
      department: 'Administration',
      programName: 'HIPAA Compliance Annual Training',
      category: 'Compliance',
      status: 'Overdue',
      completedDate: 'Nov 10, 2023',
      expiryDate: 'Nov 10, 2024',
      certificateNumber: 'HIPAA-2023-5512',
      hours: 4,
      instructor: 'Online Course',
      daysOverdue: 18
    },
    {
      id: 5,
      employeeName: 'James Wilson',
      department: 'K-9 Unit',
      programName: 'K-9 Handler Certification',
      category: 'Specialized',
      status: 'Completed',
      completedDate: 'Sep 5, 2024',
      expiryDate: 'Sep 5, 2027',
      certificateNumber: 'K9-2024-3301',
      hours: 120,
      instructor: 'Officer David Brooks',
      score: '92%'
    },
    {
      id: 6,
      employeeName: 'Sarah Chen',
      department: 'Investigations',
      programName: 'Use of Force Annual Recertification',
      category: 'Physical Training',
      status: 'Upcoming',
      scheduledDate: 'Dec 15, 2024',
      expiryDate: null,
      certificateNumber: null,
      hours: 8,
      instructor: 'Sgt. Michael Chen'
    }
  ];

  const certifications = [
    {
      id: 1,
      name: 'Georgia Peace Officer Standards & Training (POST)',
      issuingOrganization: 'Georgia POST',
      employees: 142,
      expiringIn30Days: 8,
      expiringIn60Days: 15,
      expired: 2
    },
    {
      id: 2,
      name: 'CPR/First Aid',
      issuingOrganization: 'American Red Cross',
      employees: 156,
      expiringIn30Days: 12,
      expiringIn60Days: 23,
      expired: 4
    },
    {
      id: 3,
      name: 'Firearms Qualification',
      issuingOrganization: 'GCSO Range',
      employees: 138,
      expiringIn30Days: 6,
      expiringIn60Days: 11,
      expired: 1
    },
    {
      id: 4,
      name: 'Taser Certification',
      issuingOrganization: 'Axon',
      employees: 125,
      expiringIn30Days: 5,
      expiringIn60Days: 9,
      expired: 3
    }
  ];

  const notifications = [
    { id: 1, title: 'Certification Expiring', message: '8 POST certifications expire in 30 days', time: '1 hour ago', urgent: true },
    { id: 2, title: 'Training Completed', message: 'Robert Martinez - CIT Training', time: '3 hours ago', urgent: false },
    { id: 3, title: 'Overdue Training', message: 'Maria Rodriguez - HIPAA overdue by 18 days', time: '5 hours ago', urgent: true }
  ];

  const filteredTraining = selectedFilter === 'all'
    ? trainingPrograms
    : trainingPrograms.filter(t => t.status.toLowerCase() === selectedFilter.toLowerCase());

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
                  <span className="flex-1 text-left text-sm font-medium truncate">{item.label}</span>
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

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Logout Modal */}
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

      {/* Main Content */}
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
                <span className="text-white">Training & Certifications</span>
              </div>
            </div>
            <div className="flex items-center gap-2 lg:gap-3">
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
                <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">HR</span>
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-white">HR Manager</p>
                  <p className="text-xs text-slate-400">Human Resources</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-6">
              <h2 className="text-2xl lg:text-3xl font-bold text-white mb-2">Training & Certifications</h2>
              <p className="text-slate-400">Manage employee training programs and professional certifications</p>
            </div>

            {/* AI Insights */}
            <div className="mb-6 bg-gradient-to-br from-blue-500/10 to-indigo-600/5 border border-blue-500/20 rounded-xl p-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-6 h-6 text-blue-400" />
                </div>
                <div className="flex-1">
                  <h4 className="text-base font-semibold text-white mb-2">AI Training Insights</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-300">
                    <p>• 23 certifications expiring within 60 days require attention</p>
                    <p>• 85% overall training completion rate this quarter</p>
                    <p>• 6 employees need overdue compliance training</p>
                    <p>• Defensive tactics recertification due for 34 employees in Q1 2025</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Certification Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              {certifications.map((cert) => (
                <div key={cert.id} className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <Award className="w-8 h-8 text-blue-400" />
                    <span className="text-xs px-2 py-1 bg-blue-500/10 text-blue-400 rounded font-medium">{cert.employees} Active</span>
                  </div>
                  <h4 className="text-sm font-semibold text-white mb-1">{cert.name}</h4>
                  <p className="text-xs text-slate-400 mb-3">{cert.issuingOrganization}</p>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-500">30 days:</span>
                      <span className="text-amber-400 font-medium">{cert.expiringIn30Days}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">60 days:</span>
                      <span className="text-blue-400 font-medium">{cert.expiringIn60Days}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Expired:</span>
                      <span className="text-red-400 font-medium">{cert.expired}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-3 mb-6 flex-wrap">
              <button className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-medium transition-colors">
                <Upload className="w-5 h-5" />
                Upload Certificate
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/50 text-blue-400 rounded-xl font-medium transition-colors">
                <Download className="w-5 h-5" />
                Export Report
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-slate-800/40 hover:bg-slate-800/60 border border-slate-700/50 text-slate-300 rounded-xl font-medium transition-colors">
                <Calendar className="w-5 h-5" />
                Schedule Training
              </button>
            </div>

            {/* Filter Tabs */}
            <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl overflow-hidden mb-6">
              <div className="flex border-b border-slate-700/50">
                {['all', 'completed', 'in progress', 'upcoming', 'overdue'].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setSelectedFilter(filter)}
                    className={`px-6 py-4 text-sm font-medium transition-all capitalize ${
                      selectedFilter === filter
                        ? 'bg-amber-500/10 text-amber-400 border-b-2 border-amber-500'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            {/* Training Records */}
            <div className="space-y-4">
              {filteredTraining.map((training) => (
                <div key={training.id} className={`bg-slate-800/40 border rounded-xl p-6 ${
                  training.status === 'Overdue' ? 'border-red-500/30' :
                  training.status === 'Completed' ? 'border-green-500/30' :
                  training.status === 'In Progress' ? 'border-blue-500/30' : 'border-slate-700/50'
                }`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="w-14 h-14 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                        <BookOpen className="w-7 h-7 text-blue-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-white mb-1">{training.programName}</h3>
                        <p className="text-sm text-amber-400 mb-2">{training.employeeName} • {training.department}</p>
                        <div className="flex items-center gap-4 text-xs text-slate-400">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {training.hours} hours
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            {training.instructor}
                          </span>
                          <span className="px-2 py-1 bg-purple-500/10 text-purple-400 rounded">
                            {training.category}
                          </span>
                        </div>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-lg text-xs font-medium ${
                      training.status === 'Completed' ? 'bg-green-500/10 text-green-400' :
                      training.status === 'In Progress' ? 'bg-blue-500/10 text-blue-400' :
                      training.status === 'Upcoming' ? 'bg-purple-500/10 text-purple-400' :
                      'bg-red-500/10 text-red-400'
                    }`}>
                      {training.status}
                    </span>
                  </div>

                  {training.status === 'Completed' && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="bg-slate-900/40 rounded-lg p-3">
                        <p className="text-xs text-slate-500 mb-1">Completed Date</p>
                        <p className="text-sm text-white font-medium">{training.completedDate}</p>
                      </div>
                      <div className="bg-slate-900/40 rounded-lg p-3">
                        <p className="text-xs text-slate-500 mb-1">Certificate Number</p>
                        <p className="text-sm text-white font-mono">{training.certificateNumber}</p>
                      </div>
                      <div className="bg-slate-900/40 rounded-lg p-3">
                        <p className="text-xs text-slate-500 mb-1">Score</p>
                        <p className="text-sm text-green-400 font-bold">{training.score}</p>
                      </div>
                    </div>
                  )}

                  {training.status === 'In Progress' && (
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-slate-400">Progress</span>
                        <span className="text-xs text-blue-400 font-medium">{training.progress}</span>
                      </div>
                      <div className="w-full bg-slate-700/30 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: training.progress }}></div>
                      </div>
                    </div>
                  )}

                  {training.status === 'Overdue' && (
                    <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 mb-4">
                      <p className="text-sm text-red-400 font-medium">
                        Training overdue by {training.daysOverdue} days - Immediate action required
                      </p>
                    </div>
                  )}

                  {training.status === 'Upcoming' && (
                    <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-3 mb-4">
                      <p className="text-sm text-purple-400">
                        Scheduled for: {training.scheduledDate}
                      </p>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t border-slate-700/30">
                    <div className="text-sm text-slate-400">
                      {training.expiryDate && (
                        <span>Expires: <span className="text-white">{training.expiryDate}</span></span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {training.status === 'Completed' && (
                        <button className="px-4 py-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded-xl text-sm font-medium transition-colors">
                          Download Certificate
                        </button>
                      )}
                      {training.status === 'In Progress' && (
                        <button className="px-4 py-2 bg-green-500/10 hover:bg-green-500/20 text-green-400 rounded-xl text-sm font-medium transition-colors flex items-center gap-2">
                          <Play className="w-4 h-4" />
                          Continue Training
                        </button>
                      )}
                      <button className="px-4 py-2 bg-slate-700/40 hover:bg-slate-700/60 text-slate-300 rounded-xl text-sm font-medium transition-colors">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

      {/* AI Chat Widget */}
      <button
        onClick={() => setChatOpen(!chatOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110 z-50"
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
            <div className="flex gap-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <div className="bg-slate-800/60 p-3 rounded-xl">
                  <p className="text-sm text-slate-200">I can help track training completion, identify expiring certifications, generate compliance reports, and suggest training schedules. What do you need?</p>
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 border-t border-slate-700/50">
            <div className="flex items-center gap-2">
              <input type="text" placeholder="Ask about training..." className="flex-1 px-4 py-2 bg-slate-800/40 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50" />
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

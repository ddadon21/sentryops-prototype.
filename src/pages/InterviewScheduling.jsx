import React, { useState, useEffect } from 'react';
import { LayoutDashboard, FolderOpen, FileText, Clock, UserCheck, Calendar, FileCheck, CheckCircle, TrendingUp, AlertTriangle, DollarSign, Eye, Activity, XCircle, Settings, Bell, MessageCircle, Search, ChevronRight, Shield, Sparkles, X, Send, Menu, ChevronLeft, LogOut, Plus, Video, Phone, MapPin, Edit, Trash2, Users, AlertCircle, ChevronDown, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function InterviewScheduling() {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState('interview-scheduling');
  const [chatOpen, setChatOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [logoutConfirmOpen, setLogoutConfirmOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [selectedView, setSelectedView] = useState('upcoming');

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

  const navigation = [
    { id: 'bi-dashboard', label: 'BI Dashboard', icon: LayoutDashboard, page: 'BackgroundsDashboard' },
    { id: 'active-cases', label: 'Active Cases', icon: FolderOpen, page: 'ActiveCases' },
    { id: 'case-management', label: 'Case Management', icon: FileText, page: 'CaseManagement' },
    { id: 'investigation-timeline', label: 'Investigation Timeline', icon: Clock, page: 'InvestigationTimeline' },
    { id: 'subject-records', label: 'Subject Records', icon: UserCheck, page: 'SubjectRecords' },
    { id: 'interview-scheduling', label: 'Interview Scheduling', icon: Calendar },
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

  const upcomingInterviews = [
    {
      id: 1,
      subject: 'Robert Martinez',
      caseId: 'BI-2024-145',
      type: 'Subject Interview',
      date: 'Nov 23, 2024',
      time: '2:00 PM',
      duration: '60 min',
      location: 'Conference Room B',
      method: 'In-Person',
      investigator: 'Investigator Brooks',
      status: 'Confirmed',
      notes: 'Initial background interview - bring application packet'
    },
    {
      id: 2,
      subject: 'Sarah Chen - Reference',
      caseId: 'BI-2024-143',
      type: 'Reference Check',
      date: 'Nov 24, 2024',
      time: '10:00 AM',
      duration: '30 min',
      location: 'Phone Call',
      method: 'Phone',
      investigator: 'Investigator Davis',
      status: 'Pending',
      notes: 'Previous supervisor at Metro PD'
    },
    {
      id: 3,
      subject: 'James Wilson',
      caseId: 'BI-2024-141',
      type: 'Follow-up Interview',
      date: 'Nov 25, 2024',
      time: '3:30 PM',
      duration: '45 min',
      location: 'Virtual Meeting',
      method: 'Video',
      investigator: 'Investigator Brooks',
      status: 'Confirmed',
      notes: 'Clarify employment gap from 2019-2020'
    },
    {
      id: 4,
      subject: 'Maria Rodriguez - Employer',
      caseId: 'BI-2024-138',
      type: 'Employment Verification',
      date: 'Nov 26, 2024',
      time: '11:00 AM',
      duration: '20 min',
      location: 'Phone Call',
      method: 'Phone',
      investigator: 'Investigator Thompson',
      status: 'Scheduled',
      notes: 'Contact: HR Director at previous employer'
    }
  ];

  const completedInterviews = [
    {
      id: 5,
      subject: 'Robert Martinez',
      caseId: 'BI-2024-145',
      type: 'Initial Interview',
      date: 'Nov 5, 2024',
      time: '3:45 PM',
      investigator: 'Investigator Brooks',
      outcome: 'Positive - Candidate appears qualified',
      status: 'Complete'
    },
    {
      id: 6,
      subject: 'David Kim - Reference',
      caseId: 'BI-2024-136',
      type: 'Reference Check',
      date: 'Nov 4, 2024',
      time: '2:00 PM',
      investigator: 'Investigator Davis',
      outcome: 'Excellent recommendation received',
      status: 'Complete'
    }
  ];

  const notifications = [
    { id: 1, title: 'Interview Tomorrow', message: 'Robert Martinez - 2:00 PM', time: '1 hour ago', urgent: true },
    { id: 2, title: 'Confirmation Needed', message: 'Sarah Chen reference check pending', time: '3 hours ago', urgent: false }
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
              <div className="flex-1 max-w-xl relative hidden sm:block">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input type="text" placeholder="Search interviews..." className="w-full pl-12 pr-4 py-2 bg-slate-800/40 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50" />
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
            <div className="mb-6">
              <h2 className="text-2xl lg:text-3xl font-bold text-white mb-2">Interview Scheduling</h2>
              <p className="text-slate-400">Manage subject and reference interviews</p>
            </div>

            {/* AI Insights Banner */}
            <div className="mb-6 bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-500/20 rounded-xl p-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-6 h-6 text-purple-400" />
                </div>
                <div className="flex-1">
                  <h4 className="text-base font-semibold text-white mb-2">Schedule Intelligence</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-300">
                    <p>• {upcomingInterviews.length} interviews scheduled this week</p>
                    <p>• 1 interview requires confirmation</p>
                    <p>• Next interview: Tomorrow at 2:00 PM</p>
                    <p>• {completedInterviews.length} interviews completed this month</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-6">
                <div className="flex items-center justify-between mb-2">
                  <Calendar className="w-8 h-8 text-blue-400" />
                  <span className="text-2xl font-bold text-white">{upcomingInterviews.length}</span>
                </div>
                <p className="text-sm text-slate-400">Upcoming</p>
              </div>

              <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-6">
                <div className="flex items-center justify-between mb-2">
                  <Clock className="w-8 h-8 text-green-400" />
                  <span className="text-2xl font-bold text-white">1</span>
                </div>
                <p className="text-sm text-slate-400">Today</p>
              </div>

              <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-6">
                <div className="flex items-center justify-between mb-2">
                  <AlertCircle className="w-8 h-8 text-amber-400" />
                  <span className="text-2xl font-bold text-white">1</span>
                </div>
                <p className="text-sm text-slate-400">Pending Confirm</p>
              </div>

              <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-6">
                <div className="flex items-center justify-between mb-2">
                  <CheckCircle className="w-8 h-8 text-purple-400" />
                  <span className="text-2xl font-bold text-white">{completedInterviews.length}</span>
                </div>
                <p className="text-sm text-slate-400">Completed</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 mb-6">
              <button className="flex items-center gap-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-xl font-medium transition-colors">
                <Plus className="w-5 h-5" />
                Schedule Interview
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-slate-800/40 hover:bg-slate-800/60 border border-slate-700/50 text-slate-300 rounded-xl font-medium transition-colors">
                <Calendar className="w-5 h-5" />
                Calendar View
              </button>
            </div>

            {/* View Tabs */}
            <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl overflow-hidden mb-6">
              <div className="flex border-b border-slate-700/50">
                <button
                  onClick={() => setSelectedView('upcoming')}
                  className={`px-6 py-4 text-sm font-medium transition-all ${selectedView === 'upcoming' ? 'bg-purple-500/10 text-purple-400 border-b-2 border-purple-500' : 'text-slate-400 hover:text-white'}`}
                >
                  Upcoming ({upcomingInterviews.length})
                </button>
                <button
                  onClick={() => setSelectedView('completed')}
                  className={`px-6 py-4 text-sm font-medium transition-all ${selectedView === 'completed' ? 'bg-purple-500/10 text-purple-400 border-b-2 border-purple-500' : 'text-slate-400 hover:text-white'}`}
                >
                  Completed ({completedInterviews.length})
                </button>
              </div>
            </div>

            {/* Upcoming Interviews */}
            {selectedView === 'upcoming' && (
              <div className="space-y-4">
                {upcomingInterviews.map((interview) => (
                  <div key={interview.id} className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-6 hover:border-purple-500/30 transition-all">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-1">{interview.subject}</h3>
                        <p className="text-sm text-purple-400 mb-2">{interview.caseId} • {interview.type}</p>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {interview.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {interview.time} ({interview.duration})
                          </span>
                          <span className="flex items-center gap-1">
                            {interview.method === 'In-Person' ? <MapPin className="w-4 h-4" /> :
                             interview.method === 'Video' ? <Video className="w-4 h-4" /> :
                             <Phone className="w-4 h-4" />}
                            {interview.location}
                          </span>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-lg text-xs font-medium ${
                        interview.status === 'Confirmed' ? 'bg-green-500/10 text-green-400' :
                        interview.status === 'Pending' ? 'bg-amber-500/10 text-amber-400' :
                        'bg-blue-500/10 text-blue-400'
                      }`}>
                        {interview.status}
                      </span>
                    </div>

                    <div className="bg-slate-900/40 rounded-lg p-3 mb-4">
                      <p className="text-xs text-slate-500 mb-1">Notes</p>
                      <p className="text-sm text-slate-300">{interview.notes}</p>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-slate-700/30">
                      <div className="flex items-center gap-2 text-sm text-slate-400">
                        <Users className="w-4 h-4" />
                        <span>{interview.investigator}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="p-2 bg-blue-500/10 hover:bg-blue-500/20 rounded-lg transition-colors">
                          <Edit className="w-4 h-4 text-blue-400" />
                        </button>
                        <button className="p-2 bg-red-500/10 hover:bg-red-500/20 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4 text-red-400" />
                        </button>
                        <button className="px-4 py-2 bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 rounded-xl text-sm font-medium transition-colors">
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Completed Interviews */}
            {selectedView === 'completed' && (
              <div className="space-y-4">
                {completedInterviews.map((interview) => (
                  <div key={interview.id} className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-1">{interview.subject}</h3>
                        <p className="text-sm text-purple-400 mb-2">{interview.caseId} • {interview.type}</p>
                        <div className="flex items-center gap-4 text-sm text-slate-400">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {interview.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {interview.time}
                          </span>
                        </div>
                      </div>
                      <span className="px-3 py-1 bg-green-500/10 text-green-400 rounded-lg text-xs font-medium">
                        {interview.status}
                      </span>
                    </div>

                    <div className="bg-slate-900/40 rounded-lg p-3 mb-4">
                      <p className="text-xs text-slate-500 mb-1">Outcome</p>
                      <p className="text-sm text-slate-300">{interview.outcome}</p>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-slate-700/30">
                      <div className="flex items-center gap-2 text-sm text-slate-400">
                        <Users className="w-4 h-4" />
                        <span>{interview.investigator}</span>
                      </div>
                      <button className="px-4 py-2 bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 rounded-xl text-sm font-medium transition-colors">
                        View Report
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>

      {/* AI Chat Widget */}
      <button
        onClick={() => setChatOpen(!chatOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-400 hover:to-purple-500 rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110 z-40"
      >
        {chatOpen ? <X className="w-6 h-6 text-white" /> : <MessageCircle className="w-6 h-6 text-white" />}
        {!chatOpen && <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-slate-900 animate-pulse"></span>}
      </button>

      {/* AI Chat Panel */}
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
            <div className="flex gap-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <div className="bg-slate-800/60 p-3 rounded-xl">
                  <p className="text-sm text-slate-200">I can help schedule interviews, find optimal meeting times, send reminders, and suggest interview questions. What do you need?</p>
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 border-t border-slate-700/50">
            <div className="flex items-center gap-2">
              <input type="text" placeholder="Ask about scheduling..." className="flex-1 px-4 py-2 bg-slate-800/40 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/50" />
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

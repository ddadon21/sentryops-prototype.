import React, { useState, useEffect } from 'react';
import { LayoutDashboard, FolderOpen, FileText, Clock, UserCheck, Calendar, FileCheck, CheckCircle, TrendingUp, AlertTriangle, DollarSign, Eye, Activity, XCircle, Settings, Bell, MessageCircle, Search, ChevronRight, Shield, Sparkles, X, Send, Menu, ChevronLeft, LogOut, Filter, Play, Pause, ChevronDown, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function InvestigationTimeline() {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState('investigation-timeline');
  const [chatOpen, setChatOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [logoutConfirmOpen, setLogoutConfirmOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [selectedCase, setSelectedCase] = useState('BI-2024-145');
  const [filterOpen, setFilterOpen] = useState(false);

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
    { id: 'investigation-timeline', label: 'Investigation Timeline', icon: Clock },
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

  const cases = [
    { id: 'BI-2024-145', subject: 'Robert Martinez', position: 'Deputy Sheriff', status: 'In Progress' },
    { id: 'BI-2024-144', subject: 'Sarah Chen', position: 'Corrections Officer', status: 'In Progress' },
    { id: 'BI-2024-143', subject: 'Michael Thompson', position: 'Dispatcher', status: 'Pending Review' }
  ];

  const timelineEvents = [
    {
      id: 1,
      date: 'Nov 7, 2024',
      time: '10:30 AM',
      title: 'Criminal History Check Complete',
      description: 'Background check returned clean - no criminal records found in state or federal databases.',
      type: 'milestone',
      status: 'complete',
      actor: 'Investigator Brooks',
      category: 'Criminal History'
    },
    {
      id: 2,
      date: 'Nov 6, 2024',
      time: '3:45 PM',
      title: 'Employment Verification Sent',
      description: 'Verification request sent to previous employer: Metro Police Department.',
      type: 'action',
      status: 'pending',
      actor: 'System',
      category: 'Employment'
    },
    {
      id: 3,
      date: 'Nov 5, 2024',
      time: '2:00 PM',
      title: 'Initial Interview Completed',
      description: 'Subject interview conducted. Candidate appears qualified and professional. All basic questions answered satisfactorily.',
      type: 'milestone',
      status: 'complete',
      actor: 'Investigator Brooks',
      category: 'Interview'
    },
    {
      id: 4,
      date: 'Nov 4, 2024',
      time: '11:15 AM',
      title: 'Reference Check Started',
      description: 'Initiated contact with 3 professional references and 2 personal references.',
      type: 'action',
      status: 'in-progress',
      actor: 'Investigator Brooks',
      category: 'References'
    },
    {
      id: 5,
      date: 'Nov 3, 2024',
      time: '9:00 AM',
      title: 'Financial Background Request',
      description: 'Credit check and financial background verification requested.',
      type: 'action',
      status: 'pending',
      actor: 'System',
      category: 'Financial'
    },
    {
      id: 6,
      date: 'Nov 1, 2024',
      time: '4:30 PM',
      title: 'Social Media Review Initiated',
      description: 'Comprehensive social media analysis started for all major platforms.',
      type: 'action',
      status: 'in-progress',
      actor: 'Investigator Williams',
      category: 'Social Media'
    },
    {
      id: 7,
      date: 'Oct 28, 2024',
      time: '10:00 AM',
      title: 'Application Documents Received',
      description: 'Complete application package received including resume, certifications, and personal statement.',
      type: 'document',
      status: 'complete',
      actor: 'System',
      category: 'Documentation'
    },
    {
      id: 8,
      date: 'Oct 15, 2024',
      time: '9:30 AM',
      title: 'Case Opened',
      description: 'Background investigation case initiated for Deputy Sheriff position.',
      type: 'milestone',
      status: 'complete',
      actor: 'HR Department',
      category: 'Case Management'
    }
  ];

  const milestones = [
    { name: 'Case Opened', status: 'complete', date: 'Oct 15' },
    { name: 'Documents Received', status: 'complete', date: 'Oct 28' },
    { name: 'Initial Interview', status: 'complete', date: 'Nov 5' },
    { name: 'Criminal History', status: 'complete', date: 'Nov 7' },
    { name: 'Employment Verification', status: 'in-progress', date: 'Est. Nov 12' },
    { name: 'Reference Checks', status: 'in-progress', date: 'Est. Nov 14' },
    { name: 'Financial Review', status: 'pending', date: 'Est. Nov 18' },
    { name: 'Final Review', status: 'pending', date: 'Est. Nov 22' }
  ];

  const notifications = [
    { id: 1, title: 'Reference Response', message: 'Professional reference completed form', time: '1 hour ago', urgent: false },
    { id: 2, title: 'Deadline Approaching', message: 'Employment verification due in 3 days', time: '3 hours ago', urgent: true }
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

  const getStatusColor = (status) => {
    switch (status) {
      case 'complete': return 'bg-green-500';
      case 'in-progress': return 'bg-blue-500';
      case 'pending': return 'bg-amber-500';
      default: return 'bg-slate-500';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'milestone': return <CheckCircle className="w-5 h-5" />;
      case 'action': return <Play className="w-5 h-5" />;
      case 'document': return <FileText className="w-5 h-5" />;
      default: return <Clock className="w-5 h-5" />;
    }
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
                <input type="text" placeholder="Search timeline events..." className="w-full pl-12 pr-4 py-2 bg-slate-800/40 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50" />
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
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl lg:text-3xl font-bold text-white mb-2">Investigation Timeline</h2>
                <p className="text-slate-400">Track investigation progress and milestones</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <button
                    onClick={() => setFilterOpen(!filterOpen)}
                    className="flex items-center gap-2 px-4 py-2 bg-slate-800/40 border border-slate-700/50 rounded-xl text-slate-300 hover:bg-slate-800/60 transition-colors"
                  >
                    <Filter className="w-4 h-4" />
                    <span className="text-sm">Filter</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </div>
                <select
                  value={selectedCase}
                  onChange={(e) => setSelectedCase(e.target.value)}
                  className="px-4 py-2 bg-slate-800/40 border border-slate-700/50 rounded-xl text-white focus:outline-none focus:border-purple-500/50"
                >
                  {cases.map(c => (
                    <option key={c.id} value={c.id}>{c.id} - {c.subject}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* AI Insights Banner */}
            <div className="mb-6 bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-500/20 rounded-xl p-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-6 h-6 text-purple-400" />
                </div>
                <div className="flex-1">
                  <h4 className="text-base font-semibold text-white mb-2">Timeline Analysis</h4>
                  <p className="text-sm text-slate-300">Case <span className="text-purple-400 font-semibold">{selectedCase}</span> is progressing well with <span className="text-green-400 font-semibold">4 of 8 milestones</span> complete. Employment verification is the current bottleneck - consider follow-up with previous employer. <span className="text-amber-400 font-semibold">Estimated completion: Nov 22, 2024</span> based on current velocity.</p>
                </div>
              </div>
            </div>

            {/* Milestone Progress */}
            <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-6 mb-6">
              <h3 className="text-lg font-semibold text-white mb-4">Milestone Progress</h3>
              <div className="relative">
                <div className="absolute top-4 left-0 right-0 h-1 bg-slate-700/50 rounded-full"></div>
                <div className="absolute top-4 left-0 h-1 bg-gradient-to-r from-green-500 to-blue-500 rounded-full" style={{ width: '50%' }}></div>
                <div className="relative flex justify-between">
                  {milestones.map((milestone, idx) => (
                    <div key={idx} className="flex flex-col items-center" style={{ width: `${100 / milestones.length}%` }}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center z-10 ${
                        milestone.status === 'complete' ? 'bg-green-500' :
                        milestone.status === 'in-progress' ? 'bg-blue-500 animate-pulse' :
                        'bg-slate-600'
                      }`}>
                        {milestone.status === 'complete' ? (
                          <CheckCircle className="w-4 h-4 text-white" />
                        ) : milestone.status === 'in-progress' ? (
                          <Play className="w-4 h-4 text-white" />
                        ) : (
                          <Pause className="w-4 h-4 text-slate-400" />
                        )}
                      </div>
                      <p className="text-xs text-white mt-2 text-center font-medium">{milestone.name}</p>
                      <p className="text-xs text-slate-500 mt-1">{milestone.date}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Timeline and Stats Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Timeline Events */}
              <div className="lg:col-span-2 space-y-4">
                <h3 className="text-lg font-semibold text-white mb-4">Activity Timeline</h3>
                <div className="relative">
                  {/* Timeline line */}
                  <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-slate-700/50"></div>

                  <div className="space-y-4">
                    {timelineEvents.map((event, idx) => (
                      <div key={event.id} className="relative pl-16">
                        {/* Timeline dot */}
                        <div className={`absolute left-4 w-5 h-5 rounded-full ${getStatusColor(event.status)} flex items-center justify-center -translate-x-1/2`}>
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>

                        <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-5 hover:border-purple-500/30 transition-colors">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                event.type === 'milestone' ? 'bg-green-500/10 text-green-400' :
                                event.type === 'document' ? 'bg-blue-500/10 text-blue-400' :
                                'bg-purple-500/10 text-purple-400'
                              }`}>
                                {getTypeIcon(event.type)}
                              </div>
                              <div>
                                <h4 className="text-sm font-semibold text-white">{event.title}</h4>
                                <p className="text-xs text-slate-500">{event.actor}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-xs font-medium text-slate-300">{event.date}</p>
                              <p className="text-xs text-slate-500">{event.time}</p>
                            </div>
                          </div>
                          <p className="text-sm text-slate-400 mb-3">{event.description}</p>
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-1 bg-slate-700/50 rounded text-xs text-slate-300">{event.category}</span>
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              event.status === 'complete' ? 'bg-green-500/10 text-green-400' :
                              event.status === 'in-progress' ? 'bg-blue-500/10 text-blue-400' :
                              'bg-amber-500/10 text-amber-400'
                            }`}>
                              {event.status === 'complete' ? 'Complete' : event.status === 'in-progress' ? 'In Progress' : 'Pending'}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Stats Sidebar */}
              <div className="space-y-6">
                <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-6">
                  <h4 className="text-sm font-semibold text-white mb-4">Timeline Stats</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-400">Total Events</span>
                      <span className="text-lg font-bold text-white">{timelineEvents.length}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-400">Completed</span>
                      <span className="text-lg font-bold text-green-400">{timelineEvents.filter(e => e.status === 'complete').length}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-400">In Progress</span>
                      <span className="text-lg font-bold text-blue-400">{timelineEvents.filter(e => e.status === 'in-progress').length}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-400">Pending</span>
                      <span className="text-lg font-bold text-amber-400">{timelineEvents.filter(e => e.status === 'pending').length}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-6">
                  <h4 className="text-sm font-semibold text-white mb-4">Case Summary</h4>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-slate-500 mb-1">Subject</p>
                      <p className="text-sm font-medium text-white">Robert Martinez</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 mb-1">Position</p>
                      <p className="text-sm font-medium text-white">Deputy Sheriff</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 mb-1">Days Open</p>
                      <p className="text-sm font-medium text-white">23 days</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 mb-1">Investigator</p>
                      <p className="text-sm font-medium text-white">Investigator Brooks</p>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-6">
                  <h4 className="text-sm font-semibold text-white mb-4">Upcoming Deadlines</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-amber-500/10 rounded-lg">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-amber-400" />
                        <span className="text-sm text-white">Employment Verification</span>
                      </div>
                      <span className="text-xs text-amber-400 font-medium">3 days</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-slate-400" />
                        <span className="text-sm text-white">Reference Checks</span>
                      </div>
                      <span className="text-xs text-slate-400 font-medium">5 days</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-slate-400" />
                        <span className="text-sm text-white">Financial Review</span>
                      </div>
                      <span className="text-xs text-slate-400 font-medium">11 days</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
                  <p className="text-sm text-slate-200">I can help analyze timeline patterns, identify bottlenecks, predict completion dates, and suggest actions to accelerate investigations. What would you like to know?</p>
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 border-t border-slate-700/50">
            <div className="flex items-center gap-2">
              <input type="text" placeholder="Ask about the timeline..." className="flex-1 px-4 py-2 bg-slate-800/40 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/50" />
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

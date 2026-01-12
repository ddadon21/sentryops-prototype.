import React, { useState, useEffect } from 'react';
import { LayoutDashboard, FolderOpen, FileText, Clock, UserCheck, Calendar, FileCheck, CheckCircle, TrendingUp, AlertTriangle, DollarSign, Eye, Activity, XCircle, Settings, Bell, MessageCircle, Search, ChevronRight, Shield, Sparkles, X, Send, Menu, ChevronLeft, LogOut, Edit, Phone, Mail, ChevronDown, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function SubjectRecords() {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState('subject-records');
  const [chatOpen, setChatOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [logoutConfirmOpen, setLogoutConfirmOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState('personal');

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
    { id: 'subject-records', label: 'Subject Records', icon: UserCheck },
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

  const subjectData = {
    personal: {
      fullName: 'Robert Anthony Martinez',
      dob: 'March 15, 1992',
      age: '32',
      ssn: '***-**-4567',
      driversLicense: 'GA-123456789',
      phone: '(770) 555-0123',
      email: 'r.martinez@email.com',
      address: '1234 Peachtree St NE, Atlanta, GA 30309',
      emergencyContact: 'Maria Martinez (Spouse) - (770) 555-0124'
    },
    employment: [
      {
        employer: 'Metro Atlanta Police Department',
        position: 'Patrol Officer',
        duration: 'Jan 2018 - Present',
        supervisor: 'Sgt. John Davis',
        reason: 'Career advancement',
        status: 'Verified'
      },
      {
        employer: 'Atlanta Security Services',
        position: 'Security Supervisor',
        duration: 'Jun 2015 - Dec 2017',
        supervisor: 'Mike Johnson',
        reason: 'Joined law enforcement',
        status: 'Verified'
      },
      {
        employer: 'Campus Safety - Georgia State',
        position: 'Security Officer',
        duration: 'Aug 2012 - May 2015',
        supervisor: 'Linda Chen',
        reason: 'Career growth',
        status: 'Verified'
      }
    ],
    education: [
      {
        institution: 'Georgia State University',
        degree: 'Bachelor of Science in Criminal Justice',
        graduated: '2015',
        gpa: '3.7'
      },
      {
        institution: 'Georgia Police Academy',
        degree: 'P.O.S.T. Certification',
        graduated: '2018',
        gpa: 'Honors Graduate'
      }
    ],
    certifications: [
      { name: 'P.O.S.T. Certification', issued: 'Jan 2018', expires: 'Jan 2026', status: 'Active' },
      { name: 'Advanced Firearms', issued: 'Mar 2019', expires: 'Mar 2025', status: 'Active' },
      { name: 'Crisis Intervention', issued: 'Jun 2020', expires: 'Jun 2025', status: 'Active' },
      { name: 'CPR/First Aid', issued: 'Jan 2024', expires: 'Jan 2026', status: 'Active' }
    ],
    references: [
      { name: 'Sgt. John Davis', relationship: 'Current Supervisor', phone: '(404) 555-0101', status: 'Contacted' },
      { name: 'Captain Sarah Williams', relationship: 'Previous Supervisor', phone: '(404) 555-0102', status: 'Contacted' },
      { name: 'Officer Michael Brown', relationship: 'Colleague', phone: '(404) 555-0103', status: 'Pending' }
    ]
  };

  const notifications = [
    { id: 1, title: 'Record Updated', message: 'Employment history verified', time: '20 min ago', urgent: false },
    { id: 2, title: 'Certification Expiring', message: 'Advanced Firearms - 4 months', time: '1 hour ago', urgent: true }
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
                <input type="text" placeholder="Search records..." className="w-full pl-12 pr-4 py-2 bg-slate-800/40 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50" />
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
              <h2 className="text-2xl lg:text-3xl font-bold text-white mb-2">Subject Records</h2>
              <p className="text-slate-400">Comprehensive subject information and verification</p>
            </div>

            {/* AI Insights Banner */}
            <div className="mb-6 bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-500/20 rounded-xl p-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-6 h-6 text-purple-400" />
                </div>
                <div className="flex-1">
                  <h4 className="text-base font-semibold text-white mb-2">Record Verification Status</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-300">
                    <p>• All employment records verified</p>
                    <p>• 4 active certifications on file</p>
                    <p>• Education credentials confirmed</p>
                    <p>• 1 reference check pending response</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Subject Profile Header */}
            <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-6 mb-6">
              <div className="flex flex-col md:flex-row items-start gap-6">
                <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center text-white text-3xl font-bold flex-shrink-0">
                  RM
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-2">{subjectData.personal.fullName}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center gap-2 text-slate-300">
                      <Calendar className="w-4 h-4 text-slate-500" />
                      <span>DOB: {subjectData.personal.dob} ({subjectData.personal.age} years old)</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-300">
                      <Phone className="w-4 h-4 text-slate-500" />
                      <span>{subjectData.personal.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-300">
                      <Mail className="w-4 h-4 text-slate-500" />
                      <span>{subjectData.personal.email}</span>
                    </div>
                  </div>
                </div>
                <button className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-xl text-sm font-medium transition-colors flex items-center gap-2">
                  <Edit className="w-4 h-4" />
                  Edit
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl overflow-hidden">
              <div className="flex border-b border-slate-700/50 overflow-x-auto">
                <button
                  onClick={() => setSelectedTab('personal')}
                  className={`px-6 py-4 text-sm font-medium transition-all whitespace-nowrap ${selectedTab === 'personal' ? 'bg-purple-500/10 text-purple-400 border-b-2 border-purple-500' : 'text-slate-400 hover:text-white'}`}
                >
                  Personal Info
                </button>
                <button
                  onClick={() => setSelectedTab('employment')}
                  className={`px-6 py-4 text-sm font-medium transition-all whitespace-nowrap ${selectedTab === 'employment' ? 'bg-purple-500/10 text-purple-400 border-b-2 border-purple-500' : 'text-slate-400 hover:text-white'}`}
                >
                  Employment History
                </button>
                <button
                  onClick={() => setSelectedTab('education')}
                  className={`px-6 py-4 text-sm font-medium transition-all whitespace-nowrap ${selectedTab === 'education' ? 'bg-purple-500/10 text-purple-400 border-b-2 border-purple-500' : 'text-slate-400 hover:text-white'}`}
                >
                  Education
                </button>
                <button
                  onClick={() => setSelectedTab('certifications')}
                  className={`px-6 py-4 text-sm font-medium transition-all whitespace-nowrap ${selectedTab === 'certifications' ? 'bg-purple-500/10 text-purple-400 border-b-2 border-purple-500' : 'text-slate-400 hover:text-white'}`}
                >
                  Certifications
                </button>
                <button
                  onClick={() => setSelectedTab('references')}
                  className={`px-6 py-4 text-sm font-medium transition-all whitespace-nowrap ${selectedTab === 'references' ? 'bg-purple-500/10 text-purple-400 border-b-2 border-purple-500' : 'text-slate-400 hover:text-white'}`}
                >
                  References
                </button>
              </div>

              <div className="p-6">
                {/* Personal Info Tab */}
                {selectedTab === 'personal' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs text-slate-500 mb-1">Full Name</label>
                        <p className="text-sm text-white font-medium">{subjectData.personal.fullName}</p>
                      </div>
                      <div>
                        <label className="block text-xs text-slate-500 mb-1">Date of Birth</label>
                        <p className="text-sm text-white font-medium">{subjectData.personal.dob}</p>
                      </div>
                      <div>
                        <label className="block text-xs text-slate-500 mb-1">SSN</label>
                        <p className="text-sm text-white font-medium">{subjectData.personal.ssn}</p>
                      </div>
                      <div>
                        <label className="block text-xs text-slate-500 mb-1">Driver's License</label>
                        <p className="text-sm text-white font-medium">{subjectData.personal.driversLicense}</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs text-slate-500 mb-1">Phone</label>
                        <p className="text-sm text-white font-medium">{subjectData.personal.phone}</p>
                      </div>
                      <div>
                        <label className="block text-xs text-slate-500 mb-1">Email</label>
                        <p className="text-sm text-white font-medium">{subjectData.personal.email}</p>
                      </div>
                      <div>
                        <label className="block text-xs text-slate-500 mb-1">Address</label>
                        <p className="text-sm text-white font-medium">{subjectData.personal.address}</p>
                      </div>
                      <div>
                        <label className="block text-xs text-slate-500 mb-1">Emergency Contact</label>
                        <p className="text-sm text-white font-medium">{subjectData.personal.emergencyContact}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Employment Tab */}
                {selectedTab === 'employment' && (
                  <div className="space-y-4">
                    {subjectData.employment.map((job, idx) => (
                      <div key={idx} className="bg-slate-900/40 rounded-xl p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="text-base font-semibold text-white mb-1">{job.position}</h4>
                            <p className="text-sm text-purple-400">{job.employer}</p>
                          </div>
                          <span className="px-3 py-1 bg-green-500/10 text-green-400 rounded-lg text-xs font-medium">
                            {job.status}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <p className="text-slate-500 text-xs mb-1">Duration</p>
                            <p className="text-slate-300">{job.duration}</p>
                          </div>
                          <div>
                            <p className="text-slate-500 text-xs mb-1">Supervisor</p>
                            <p className="text-slate-300">{job.supervisor}</p>
                          </div>
                          <div>
                            <p className="text-slate-500 text-xs mb-1">Reason for Leaving</p>
                            <p className="text-slate-300">{job.reason}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Education Tab */}
                {selectedTab === 'education' && (
                  <div className="space-y-4">
                    {subjectData.education.map((edu, idx) => (
                      <div key={idx} className="bg-slate-900/40 rounded-xl p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="text-base font-semibold text-white mb-1">{edu.degree}</h4>
                            <p className="text-sm text-purple-400">{edu.institution}</p>
                          </div>
                          <span className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-lg text-xs font-medium">
                            {edu.graduated}
                          </span>
                        </div>
                        <p className="text-sm text-slate-400">GPA: {edu.gpa}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Certifications Tab */}
                {selectedTab === 'certifications' && (
                  <div className="space-y-4">
                    {subjectData.certifications.map((cert, idx) => (
                      <div key={idx} className="bg-slate-900/40 rounded-xl p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="text-base font-semibold text-white mb-1">{cert.name}</h4>
                            <div className="flex items-center gap-4 text-sm text-slate-400">
                              <span>Issued: {cert.issued}</span>
                              <span>•</span>
                              <span>Expires: {cert.expires}</span>
                            </div>
                          </div>
                          <span className="px-3 py-1 bg-green-500/10 text-green-400 rounded-lg text-xs font-medium">
                            {cert.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* References Tab */}
                {selectedTab === 'references' && (
                  <div className="space-y-4">
                    {subjectData.references.map((ref, idx) => (
                      <div key={idx} className="bg-slate-900/40 rounded-xl p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="text-base font-semibold text-white mb-1">{ref.name}</h4>
                            <p className="text-sm text-slate-400 mb-2">{ref.relationship}</p>
                            <p className="text-sm text-slate-500">{ref.phone}</p>
                          </div>
                          <span className={`px-3 py-1 rounded-lg text-xs font-medium ${ref.status === 'Contacted' ? 'bg-green-500/10 text-green-400' : 'bg-amber-500/10 text-amber-400'}`}>
                            {ref.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
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
                  <p className="text-sm text-slate-200">I can help verify subject information, flag discrepancies, check certification expiration dates, and answer questions about records. What do you need?</p>
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 border-t border-slate-700/50">
            <div className="flex items-center gap-2">
              <input type="text" placeholder="Ask about records..." className="flex-1 px-4 py-2 bg-slate-800/40 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/50" />
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

import React, { useState } from 'react';
import { Home, Users, FileText, LayoutDashboard, TrendingUp, AlertCircle, Settings, Bell, MessageCircle, Search, ChevronRight, DollarSign, CheckCircle, Shield, Sparkles, X, Send, Menu, ChevronLeft, LogOut, UserPlus, Briefcase, Clock, Award, Filter, Download, Eye, Mail, Phone, MapPin, Calendar, Star, ThumbsUp, ThumbsDown, FileCheck, XCircle, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function ApplicantTracking() {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState('applicant-tracking');
  const [chatOpen, setChatOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [logoutConfirmOpen, setLogoutConfirmOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPosition, setFilterPosition] = useState('all');
  const [selectedApplicant, setSelectedApplicant] = useState(null);

  const navigation = [
    { id: 'hr-dashboard', label: 'HR Dashboard', icon: Users, page: 'HRDashboard' },
    { id: 'job-postings', label: 'Job Postings', icon: Briefcase, page: 'JobPostings' },
    { id: 'applicant-tracking', label: 'Applicant Tracking', icon: UserPlus },
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
    { id: 3, title: '3 Onboarding Tasks Due', message: 'New hire paperwork pending completion', time: '2 hours ago', urgent: true }
  ];

  const [applicants] = useState([
    {
      id: 1,
      name: 'Marcus Johnson',
      position: 'Deputy Sheriff',
      appliedDate: '2024-11-01',
      status: 'screening',
      email: 'marcus.johnson@email.com',
      phone: '(555) 234-5678',
      experience: '5 years',
      education: 'Bachelor - Criminal Justice',
      rating: 4.5,
      location: 'Lawrenceville, GA',
      resume: true,
      coverLetter: true,
      aiScore: 92,
      aiNotes: 'Strong law enforcement background, excellent communication skills, P.O.S.T. certified'
    },
    {
      id: 2,
      name: 'Sarah Chen',
      position: 'Background Investigator',
      appliedDate: '2024-10-28',
      status: 'interview',
      email: 'sarah.chen@email.com',
      phone: '(555) 345-6789',
      experience: '7 years',
      education: 'Master - Psychology',
      rating: 4.8,
      location: 'Duluth, GA',
      resume: true,
      coverLetter: true,
      aiScore: 95,
      aiNotes: 'Exceptional investigative experience, advanced degree, detail-oriented'
    },
    {
      id: 3,
      name: 'Robert Martinez',
      position: 'Deputy Sheriff',
      appliedDate: '2024-10-30',
      status: 'offer',
      email: 'robert.martinez@email.com',
      phone: '(555) 456-7890',
      experience: '8 years',
      education: 'Associate - Law Enforcement',
      rating: 4.6,
      location: 'Suwanee, GA',
      resume: true,
      coverLetter: true,
      aiScore: 94,
      aiNotes: 'Veteran officer, strong leadership qualities, clean record'
    },
    {
      id: 4,
      name: 'Lisa Williams',
      position: 'Detention Officer',
      appliedDate: '2024-11-02',
      status: 'new',
      email: 'lisa.williams@email.com',
      phone: '(555) 567-8901',
      experience: '3 years',
      education: 'High School Diploma',
      rating: 4.2,
      location: 'Snellville, GA',
      resume: true,
      coverLetter: false,
      aiScore: 78,
      aiNotes: 'Meets basic qualifications, limited experience, requires training'
    },
    {
      id: 5,
      name: 'David Brown',
      position: 'Deputy Sheriff',
      appliedDate: '2024-10-25',
      status: 'background',
      email: 'david.brown@email.com',
      phone: '(555) 678-9012',
      experience: '6 years',
      education: 'Bachelor - Criminal Justice',
      rating: 4.7,
      location: 'Buford, GA',
      resume: true,
      coverLetter: true,
      aiScore: 91,
      aiNotes: 'Excellent references, specialized training, community-oriented'
    },
    {
      id: 6,
      name: 'Jennifer Taylor',
      position: 'Administrative Assistant',
      appliedDate: '2024-11-03',
      status: 'screening',
      email: 'jennifer.taylor@email.com',
      phone: '(555) 789-0123',
      experience: '4 years',
      education: 'Associate - Business Admin',
      rating: 4.3,
      location: 'Lawrenceville, GA',
      resume: true,
      coverLetter: true,
      aiScore: 85,
      aiNotes: 'Strong administrative skills, organized, tech-savvy'
    },
    {
      id: 7,
      name: 'Michael Davis',
      position: 'Deputy Sheriff',
      appliedDate: '2024-10-29',
      status: 'rejected',
      email: 'michael.davis@email.com',
      phone: '(555) 890-1234',
      experience: '2 years',
      education: 'High School Diploma',
      rating: 3.5,
      location: 'Norcross, GA',
      resume: true,
      coverLetter: false,
      aiScore: 62,
      aiNotes: 'Insufficient experience, does not meet P.O.S.T. requirements'
    },
    {
      id: 8,
      name: 'Amanda Garcia',
      position: 'Background Investigator',
      appliedDate: '2024-11-01',
      status: 'interview',
      email: 'amanda.garcia@email.com',
      phone: '(555) 901-2345',
      experience: '9 years',
      education: 'Master - Criminal Justice',
      rating: 4.9,
      location: 'Duluth, GA',
      resume: true,
      coverLetter: true,
      aiScore: 96,
      aiNotes: 'Outstanding credentials, FBI background, advanced certifications'
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
      new: { bg: 'bg-blue-500/20', text: 'text-blue-400', border: 'border-blue-500/30', label: 'NEW' },
      screening: { bg: 'bg-purple-500/20', text: 'text-purple-400', border: 'border-purple-500/30', label: 'SCREENING' },
      interview: { bg: 'bg-amber-500/20', text: 'text-amber-400', border: 'border-amber-500/30', label: 'INTERVIEW' },
      background: { bg: 'bg-cyan-500/20', text: 'text-cyan-400', border: 'border-cyan-500/30', label: 'BACKGROUND' },
      offer: { bg: 'bg-green-500/20', text: 'text-green-400', border: 'border-green-500/30', label: 'OFFER' },
      rejected: { bg: 'bg-red-500/20', text: 'text-red-400', border: 'border-red-500/30', label: 'REJECTED' }
    };
    return configs[status] || configs.new;
  };

  const filteredApplicants = applicants.filter(applicant => {
    const statusMatch = activeTab === 'all' || applicant.status === activeTab;
    const positionMatch = filterPosition === 'all' || applicant.position === filterPosition;
    return statusMatch && positionMatch;
  });

  const statusCounts = {
    all: applicants.length,
    new: applicants.filter(a => a.status === 'new').length,
    screening: applicants.filter(a => a.status === 'screening').length,
    interview: applicants.filter(a => a.status === 'interview').length,
    background: applicants.filter(a => a.status === 'background').length,
    offer: applicants.filter(a => a.status === 'offer').length,
    rejected: applicants.filter(a => a.status === 'rejected').length
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
                <button
                  onClick={() => navigate(createPageUrl('HRDashboard'))}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  HR Dashboard
                </button>
                <ChevronRight className="w-4 h-4 text-slate-600" />
                <span className="text-white">Applicant Tracking</span>
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
              <h2 className="text-2xl lg:text-3xl font-bold text-white mb-2">Applicant Tracking</h2>
              <p className="text-slate-400">Manage and review all job applications</p>
            </div>

            {/* AI Insights */}
            <div className="mb-6 bg-gradient-to-br from-purple-500/10 to-blue-500/5 border border-purple-500/20 rounded-xl p-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-6 h-6 text-purple-400" />
                </div>
                <div className="flex-1">
                  <h4 className="text-base font-semibold text-white mb-2">AI Applicant Intelligence</h4>
                  <div className="space-y-2 text-sm text-slate-300">
                    <p>• <span className="font-bold text-green-400">Top candidates identified:</span> Sarah Chen (95 score) and Amanda Garcia (96 score) for Background Investigator</p>
                    <p>• <span className="font-bold text-blue-400">3 applicants ready for interview:</span> Marcus Johnson, Jennifer Taylor, and David Brown</p>
                    <p>• <span className="font-bold text-amber-400">1 offer pending acceptance:</span> Robert Martinez for Deputy Sheriff position</p>
                    <p>• <span className="font-bold text-purple-400">Recommendation:</span> Fast-track Amanda Garcia - exceptional FBI background and credentials</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Status Tabs */}
            <div className="mb-6 flex gap-2 border-b border-slate-700/50 overflow-x-auto">
              {[
                { id: 'all', label: 'All Applicants', count: statusCounts.all },
                { id: 'new', label: 'New', count: statusCounts.new },
                { id: 'screening', label: 'Screening', count: statusCounts.screening },
                { id: 'interview', label: 'Interview', count: statusCounts.interview },
                { id: 'background', label: 'Background', count: statusCounts.background },
                { id: 'offer', label: 'Offer', count: statusCounts.offer },
                { id: 'rejected', label: 'Rejected', count: statusCounts.rejected }
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

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search applicants..."
                  className="w-full pl-12 pr-4 py-2.5 bg-slate-800/40 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50"
                />
              </div>
              <select
                value={filterPosition}
                onChange={(e) => setFilterPosition(e.target.value)}
                className="px-4 py-2.5 bg-slate-800/40 border border-slate-700/50 rounded-xl text-white text-sm focus:outline-none focus:border-amber-500/50 cursor-pointer"
              >
                <option value="all">All Positions</option>
                <option value="Deputy Sheriff">Deputy Sheriff</option>
                <option value="Background Investigator">Background Investigator</option>
                <option value="Detention Officer">Detention Officer</option>
                <option value="Administrative Assistant">Administrative Assistant</option>
              </select>
              <button className="flex items-center gap-2 px-4 py-2.5 bg-slate-800/40 border border-slate-700/50 rounded-xl text-white text-sm hover:bg-slate-800/60 transition-all">
                <Filter className="w-4 h-4" />
                More Filters
              </button>
            </div>

            {/* Applicants List */}
            <div className="space-y-4">
              {filteredApplicants.map(applicant => {
                const statusConfig = getStatusConfig(applicant.status);
                return (
                  <div
                    key={applicant.id}
                    className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-5 hover:bg-slate-800/50 transition-all cursor-pointer"
                    onClick={() => setSelectedApplicant(applicant)}
                  >
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                          <Users className="w-6 h-6 text-blue-400" />
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2 flex-wrap">
                            <h3 className="text-lg font-semibold text-white">{applicant.name}</h3>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold border ${statusConfig.bg} ${statusConfig.text} ${statusConfig.border}`}>
                              {statusConfig.label}
                            </span>
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                              <span className="text-sm font-bold text-amber-400">{applicant.rating}</span>
                            </div>
                            {applicant.aiScore >= 90 && (
                              <span className="px-2 py-1 bg-purple-500/20 border border-purple-500/30 rounded text-xs text-purple-400 font-bold">
                                AI: {applicant.aiScore}
                              </span>
                            )}
                          </div>

                          <p className="text-sm text-slate-300 mb-3 font-medium">{applicant.position}</p>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs text-slate-400 mb-3">
                            <div className="flex items-center gap-2">
                              <Mail className="w-3 h-3" />
                              <span>{applicant.email}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Phone className="w-3 h-3" />
                              <span>{applicant.phone}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="w-3 h-3" />
                              <span>{applicant.location}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="w-3 h-3" />
                              <span>Applied: {new Date(applicant.appliedDate).toLocaleDateString()}</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-4 text-xs">
                            <span className="text-slate-300"><span className="font-semibold">Experience:</span> {applicant.experience}</span>
                            <span className="text-slate-300"><span className="font-semibold">Education:</span> {applicant.education}</span>
                            <div className="flex items-center gap-2">
                              {applicant.resume && (
                                <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs">Resume</span>
                              )}
                              {applicant.coverLetter && (
                                <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs">Cover Letter</span>
                              )}
                            </div>
                          </div>

                          {applicant.aiScore >= 85 && (
                            <div className="mt-3 p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                              <p className="text-xs text-purple-300"><span className="font-bold">AI Analysis:</span> {applicant.aiNotes}</p>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <button className="p-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 rounded-lg transition-all">
                          <Eye className="w-4 h-4 text-blue-400" />
                        </button>
                        <button className="p-2 bg-green-500/20 hover:bg-green-500/30 border border-green-500/30 rounded-lg transition-all">
                          <ThumbsUp className="w-4 h-4 text-green-400" />
                        </button>
                        <button className="p-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 rounded-lg transition-all">
                          <ThumbsDown className="w-4 h-4 text-red-400" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </main>
      </div>

      {/* Applicant Detail Modal */}
      {selectedApplicant && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedApplicant(null)}
          />
          <div className="relative bg-slate-900 border border-slate-700/50 rounded-2xl p-6 max-w-2xl w-full shadow-2xl max-h-[80vh] overflow-y-auto">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-white mb-2">{selectedApplicant.name}</h3>
                <p className="text-sm text-slate-400">{selectedApplicant.position}</p>
              </div>
              <button
                onClick={() => setSelectedApplicant(null)}
                className="p-2 hover:bg-slate-800/50 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-800/40 rounded-xl p-4 border border-slate-700/50">
                  <p className="text-xs text-slate-400 mb-1">Email</p>
                  <p className="text-sm font-medium text-white">{selectedApplicant.email}</p>
                </div>
                <div className="bg-slate-800/40 rounded-xl p-4 border border-slate-700/50">
                  <p className="text-xs text-slate-400 mb-1">Phone</p>
                  <p className="text-sm font-medium text-white">{selectedApplicant.phone}</p>
                </div>
                <div className="bg-slate-800/40 rounded-xl p-4 border border-slate-700/50">
                  <p className="text-xs text-slate-400 mb-1">Location</p>
                  <p className="text-sm font-medium text-white">{selectedApplicant.location}</p>
                </div>
                <div className="bg-slate-800/40 rounded-xl p-4 border border-slate-700/50">
                  <p className="text-xs text-slate-400 mb-1">Applied Date</p>
                  <p className="text-sm font-medium text-white">{new Date(selectedApplicant.appliedDate).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-4">
                <p className="text-sm font-semibold text-purple-400 mb-2">AI Analysis Score: {selectedApplicant.aiScore}/100</p>
                <p className="text-sm text-slate-300">{selectedApplicant.aiNotes}</p>
              </div>

              <div className="flex gap-3 pt-4 border-t border-slate-700/50">
                <button className="flex-1 px-4 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-medium transition-all">
                  Move to Next Stage
                </button>
                <button className="flex-1 px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-medium transition-all">
                  Schedule Interview
                </button>
                <button className="px-4 py-3 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-400 rounded-xl font-medium transition-all">
                  Reject
                </button>
              </div>
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
                <h3 className="text-sm font-semibold text-white">Applicant AI Assistant</h3>
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
                  <p className="text-sm text-slate-200">Hi! I can help you screen applicants, identify top candidates, schedule interviews, and answer questions about qualifications. What do you need?</p>
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 border-t border-slate-700/50">
            <div className="flex items-center gap-2">
              <input type="text" placeholder="Ask about applicants..." className="flex-1 px-4 py-2 bg-slate-800/40 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50" />
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

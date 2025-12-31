import React, { useState } from 'react';
import { Users, FileText, LayoutDashboard, TrendingUp, Settings, Bell, MessageCircle, Search, ChevronRight, CheckCircle, Shield, Sparkles, X, Send, Menu, ChevronLeft, LogOut, UserPlus, Briefcase, Clock, Award, Filter, Eye, Edit, Trash2, Plus, MapPin, Calendar, DollarSign, FileCheck, ClipboardCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function JobPostings() {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState('job-postings');
  const [chatOpen, setChatOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [logoutConfirmOpen, setLogoutConfirmOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('active');
  const [selectedJob, setSelectedJob] = useState(null);
  const [createJobModal, setCreateJobModal] = useState(false);

  const navigation = [
    { id: 'hr-dashboard', label: 'HR Dashboard', icon: Users, page: 'HRDashboard' },
    { id: 'job-postings', label: 'Job Postings', icon: Briefcase },
    { id: 'applicant-tracking', label: 'Applicant Tracking', icon: UserPlus, page: 'ApplicantTracking' },
    { id: 'hiring-pipeline', label: 'Hiring Pipeline', icon: TrendingUp, page: 'HiringPipeline' },
    { id: 'compliance', label: 'HR Compliance', icon: ClipboardCheck, page: 'ComplianceManagement' },
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

  const [jobPostings] = useState([
    {
      id: 1,
      title: 'Deputy Sheriff',
      department: 'Patrol Division',
      location: 'Gwinnett County, GA',
      type: 'Full-Time',
      salary: '$48,000 - $62,000',
      postedDate: '2024-10-15',
      closingDate: '2024-12-15',
      status: 'active',
      applicants: 23,
      views: 156,
      priority: 'high',
      description: 'Sworn law enforcement officer responsible for patrol duties, emergency response, and community policing.',
      requirements: [
        'High school diploma or GED',
        'Valid Georgia driver\'s license',
        'P.O.S.T. certification or ability to obtain',
        'Pass background investigation',
        'Physical fitness standards'
      ],
      responsibilities: [
        'Patrol assigned areas and respond to calls',
        'Enforce laws and ordinances',
        'Investigate crimes and accidents',
        'Prepare detailed reports',
        'Testify in court proceedings'
      ]
    },
    {
      id: 2,
      title: 'Background Investigator',
      department: 'Human Resources',
      location: 'Lawrenceville, GA',
      type: 'Full-Time',
      salary: '$55,000 - $68,000',
      postedDate: '2024-10-20',
      closingDate: '2024-12-20',
      status: 'active',
      applicants: 12,
      views: 89,
      priority: 'high',
      description: 'Conduct comprehensive background investigations for law enforcement candidates.',
      requirements: [
        'Bachelor\'s degree in Criminal Justice or related field',
        '3+ years investigative experience',
        'Valid driver\'s license',
        'Excellent written communication',
        'CJIS clearance'
      ],
      responsibilities: [
        'Conduct thorough background investigations',
        'Interview references and employers',
        'Review criminal and credit history',
        'Prepare detailed investigation reports',
        'Maintain confidentiality and security'
      ]
    },
    {
      id: 3,
      title: 'Detention Officer',
      department: 'Detention Center',
      location: 'Lawrenceville, GA',
      type: 'Full-Time',
      salary: '$42,000 - $52,000',
      postedDate: '2024-10-28',
      closingDate: '2024-12-28',
      status: 'active',
      applicants: 8,
      views: 67,
      priority: 'medium',
      description: 'Supervise and manage inmates in detention facility, ensuring security and safety.',
      requirements: [
        'High school diploma or GED',
        'Valid driver\'s license',
        '21 years of age or older',
        'No felony convictions',
        'Pass physical and psychological evaluations'
      ],
      responsibilities: [
        'Supervise inmates and maintain order',
        'Conduct security checks and counts',
        'Process intake and release procedures',
        'Respond to emergencies',
        'Document incidents and activities'
      ]
    },
    {
      id: 4,
      title: 'Administrative Assistant',
      department: 'Administrative Services',
      location: 'Lawrenceville, GA',
      type: 'Full-Time',
      salary: '$38,000 - $45,000',
      postedDate: '2024-11-01',
      closingDate: '2024-12-01',
      status: 'active',
      applicants: 4,
      views: 45,
      priority: 'low',
      description: 'Provide administrative support to department leadership and staff.',
      requirements: [
        'High school diploma or equivalent',
        '2+ years office experience',
        'Proficiency in Microsoft Office',
        'Strong organizational skills',
        'Excellent communication'
      ],
      responsibilities: [
        'Manage schedules and appointments',
        'Handle correspondence and phone calls',
        'Maintain files and records',
        'Coordinate meetings and events',
        'Assist with special projects'
      ]
    },
    {
      id: 5,
      title: 'Crime Scene Technician',
      department: 'Investigations Division',
      location: 'Gwinnett County, GA',
      type: 'Full-Time',
      salary: '$50,000 - $60,000',
      postedDate: '2024-09-15',
      closingDate: '2024-11-15',
      status: 'closed',
      applicants: 18,
      views: 134,
      priority: 'high',
      description: 'Collect, preserve, and analyze physical evidence from crime scenes.',
      requirements: [
        'Bachelor\'s degree in Forensic Science',
        'Experience with evidence collection',
        'Valid driver\'s license',
        'Certification preferred',
        'Available for on-call duty'
      ],
      responsibilities: [
        'Process crime scenes and collect evidence',
        'Photograph and document scenes',
        'Maintain chain of custody',
        'Prepare evidence reports',
        'Testify in court as needed'
      ]
    },
    {
      id: 6,
      title: 'K9 Handler',
      department: 'Patrol Division',
      location: 'Gwinnett County, GA',
      type: 'Full-Time',
      salary: '$52,000 - $65,000',
      postedDate: '2024-08-01',
      closingDate: '2024-10-01',
      status: 'filled',
      applicants: 15,
      views: 201,
      priority: 'high',
      description: 'Handle and train K9 unit for patrol, drug detection, and tracking operations.',
      requirements: [
        'Current Deputy Sheriff',
        '3+ years patrol experience',
        'K9 handler certification or willingness to obtain',
        'Physical fitness requirements',
        'Home with fenced yard for K9'
      ],
      responsibilities: [
        'Train and care for assigned K9',
        'Conduct patrol and detection operations',
        'Perform building and vehicle searches',
        'Track suspects and missing persons',
        'Maintain K9 equipment and records'
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
      active: { bg: 'bg-green-500/20', text: 'text-green-400', border: 'border-green-500/30', label: 'ACTIVE' },
      closed: { bg: 'bg-amber-500/20', text: 'text-amber-400', border: 'border-amber-500/30', label: 'CLOSED' },
      filled: { bg: 'bg-blue-500/20', text: 'text-blue-400', border: 'border-blue-500/30', label: 'FILLED' },
      draft: { bg: 'bg-slate-500/20', text: 'text-slate-400', border: 'border-slate-500/30', label: 'DRAFT' }
    };
    return configs[status] || configs.active;
  };

  const filteredJobs = jobPostings.filter(job => {
    if (activeTab === 'all') return true;
    return job.status === activeTab;
  });

  const statusCounts = {
    all: jobPostings.length,
    active: jobPostings.filter(j => j.status === 'active').length,
    closed: jobPostings.filter(j => j.status === 'closed').length,
    filled: jobPostings.filter(j => j.status === 'filled').length,
    draft: jobPostings.filter(j => j.status === 'draft').length
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
                <span className="text-white">Job Postings</span>
              </div>
            </div>
            <div className="flex items-center gap-2 lg:gap-3">
              <button
                onClick={() => setCreateJobModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl text-sm font-medium transition-all"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Create Job Posting</span>
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
              <h2 className="text-2xl lg:text-3xl font-bold text-white mb-2">Job Postings</h2>
              <p className="text-slate-400">Create and manage open positions</p>
            </div>

            {/* AI Insights */}
            <div className="mb-6 bg-gradient-to-br from-green-500/10 to-blue-500/5 border border-green-500/20 rounded-xl p-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-6 h-6 text-green-400" />
                </div>
                <div className="flex-1">
                  <h4 className="text-base font-semibold text-white mb-2">AI Job Posting Intelligence</h4>
                  <div className="space-y-2 text-sm text-slate-300">
                    <p>• <span className="font-bold text-green-400">Deputy Sheriff posting performing well:</span> 23 applicants, 156 views (above average)</p>
                    <p>• <span className="font-bold text-blue-400">Background Investigator needs promotion:</span> Only 89 views - recommend boost on LinkedIn</p>
                    <p>• <span className="font-bold text-amber-400">Best posting times:</span> Tuesday-Thursday mornings yield 40% more applications</p>
                    <p>• <span className="font-bold text-purple-400">Salary competitive:</span> Deputy Sheriff range matches 85% of regional agencies</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center">
                    <Briefcase className="w-5 h-5 text-green-400" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-white mb-1">{statusCounts.active}</p>
                <p className="text-sm text-slate-400">Active Postings</p>
              </div>

              <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
                    <Users className="w-5 h-5 text-blue-400" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-white mb-1">{jobPostings.filter(j => j.status === 'active').reduce((sum, j) => sum + j.applicants, 0)}</p>
                <p className="text-sm text-slate-400">Total Applicants</p>
              </div>

              <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center">
                    <Eye className="w-5 h-5 text-purple-400" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-white mb-1">{jobPostings.filter(j => j.status === 'active').reduce((sum, j) => sum + j.views, 0)}</p>
                <p className="text-sm text-slate-400">Total Views</p>
              </div>

              <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 bg-amber-500/20 rounded-xl flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-amber-400" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-white mb-1">{statusCounts.filled}</p>
                <p className="text-sm text-slate-400">Positions Filled</p>
              </div>
            </div>

            {/* Status Tabs */}
            <div className="mb-6 flex gap-2 border-b border-slate-700/50 overflow-x-auto">
              {[
                { id: 'all', label: 'All Jobs', count: statusCounts.all },
                { id: 'active', label: 'Active', count: statusCounts.active },
                { id: 'closed', label: 'Closed', count: statusCounts.closed },
                { id: 'filled', label: 'Filled', count: statusCounts.filled }
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
                  placeholder="Search job postings..."
                  className="w-full pl-12 pr-4 py-2.5 bg-slate-800/40 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50"
                />
              </div>
              <select className="px-4 py-2.5 bg-slate-800/40 border border-slate-700/50 rounded-xl text-white text-sm focus:outline-none focus:border-amber-500/50 cursor-pointer">
                <option value="all">All Departments</option>
                <option value="patrol">Patrol Division</option>
                <option value="hr">Human Resources</option>
                <option value="detention">Detention Center</option>
                <option value="admin">Administrative Services</option>
              </select>
              <button className="flex items-center gap-2 px-4 py-2.5 bg-slate-800/40 border border-slate-700/50 rounded-xl text-white text-sm hover:bg-slate-800/60 transition-all">
                <Filter className="w-4 h-4" />
                More Filters
              </button>
            </div>

            {/* Job Postings Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {filteredJobs.map(job => {
                const statusConfig = getStatusConfig(job.status);
                return (
                  <div
                    key={job.id}
                    className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-5 hover:bg-slate-800/50 transition-all cursor-pointer"
                    onClick={() => setSelectedJob(job)}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2 flex-wrap">
                          <h3 className="text-lg font-semibold text-white">{job.title}</h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-bold border ${statusConfig.bg} ${statusConfig.text} ${statusConfig.border}`}>
                            {statusConfig.label}
                          </span>
                          {job.priority === 'high' && (
                            <span className="px-2 py-1 bg-red-500/20 border border-red-500/30 rounded text-xs text-red-400 font-bold">
                              HIGH PRIORITY
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-slate-400 mb-3">{job.department}</p>
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-slate-300">
                        <MapPin className="w-4 h-4 text-slate-500" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-300">
                        <DollarSign className="w-4 h-4 text-slate-500" />
                        <span>{job.salary}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-300">
                        <Calendar className="w-4 h-4 text-slate-500" />
                        <span>Posted: {new Date(job.postedDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-300">
                        <Clock className="w-4 h-4 text-slate-500" />
                        <span>Closes: {new Date(job.closingDate).toLocaleDateString()}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-slate-700/50">
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-blue-400" />
                          <span className="text-blue-400 font-semibold">{job.applicants} applicants</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Eye className="w-4 h-4 text-slate-400" />
                          <span className="text-slate-400">{job.views} views</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => { e.stopPropagation(); }}
                          className="p-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 rounded-lg transition-all"
                        >
                          <Edit className="w-4 h-4 text-blue-400" />
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); }}
                          className="p-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 rounded-lg transition-all"
                        >
                          <Trash2 className="w-4 h-4 text-red-400" />
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

      {/* Job Detail Modal */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedJob(null)}
          />
          <div className="relative bg-slate-900 border border-slate-700/50 rounded-2xl p-6 max-w-3xl w-full shadow-2xl max-h-[80vh] overflow-y-auto">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">{selectedJob.title}</h3>
                <p className="text-sm text-slate-400">{selectedJob.department} • {selectedJob.location}</p>
              </div>
              <button
                onClick={() => setSelectedJob(null)}
                className="p-2 hover:bg-slate-800/50 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-semibold text-white mb-3">Job Details</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-800/40 rounded-xl p-4 border border-slate-700/50">
                    <p className="text-xs text-slate-400 mb-1">Salary Range</p>
                    <p className="text-sm font-medium text-white">{selectedJob.salary}</p>
                  </div>
                  <div className="bg-slate-800/40 rounded-xl p-4 border border-slate-700/50">
                    <p className="text-xs text-slate-400 mb-1">Job Type</p>
                    <p className="text-sm font-medium text-white">{selectedJob.type}</p>
                  </div>
                  <div className="bg-slate-800/40 rounded-xl p-4 border border-slate-700/50">
                    <p className="text-xs text-slate-400 mb-1">Applicants</p>
                    <p className="text-sm font-medium text-white">{selectedJob.applicants}</p>
                  </div>
                  <div className="bg-slate-800/40 rounded-xl p-4 border border-slate-700/50">
                    <p className="text-xs text-slate-400 mb-1">Views</p>
                    <p className="text-sm font-medium text-white">{selectedJob.views}</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-white mb-3">Description</h4>
                <p className="text-sm text-slate-300">{selectedJob.description}</p>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-white mb-3">Requirements</h4>
                <ul className="space-y-2">
                  {selectedJob.requirements.map((req, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-slate-300">
                      <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-white mb-3">Responsibilities</h4>
                <ul className="space-y-2">
                  {selectedJob.responsibilities.map((resp, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-slate-300">
                      <ChevronRight className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex gap-3 pt-4 border-t border-slate-700/50">
                <button
                  onClick={() => navigate(createPageUrl('ApplicantTracking'))}
                  className="flex-1 px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-medium transition-all"
                >
                  View Applicants
                </button>
                <button className="flex-1 px-4 py-3 bg-green-500/20 hover:bg-green-500/30 border border-green-500/30 text-green-400 rounded-xl font-medium transition-all">
                  Edit Posting
                </button>
                <button className="px-4 py-3 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-400 rounded-xl font-medium transition-all">
                  Close
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
                <h3 className="text-sm font-semibold text-white">Job Posting AI Assistant</h3>
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
                  <p className="text-sm text-slate-200">Hi! I can help you write job descriptions, optimize posting performance, suggest salary ranges, and answer questions about recruitment best practices. What do you need?</p>
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 border-t border-slate-700/50">
            <div className="flex items-center gap-2">
              <input type="text" placeholder="Ask about job postings..." className="flex-1 px-4 py-2 bg-slate-800/40 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50" />
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

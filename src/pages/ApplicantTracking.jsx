import React, { useState } from 'react';
import {
  Users, FileText, LayoutDashboard, TrendingUp, Bell, MessageCircle,
  Search, ChevronRight, CheckCircle, Shield, X, Send, Menu, ChevronLeft,
  LogOut, UserPlus, Briefcase, Clock, Award, Filter, Download, Eye, Mail,
  Phone, MapPin, Calendar, FileCheck, ClipboardCheck, GraduationCap,
  ChevronDown, ChevronUp, AlertTriangle, AlertCircle, Building, User,
  ExternalLink, Printer, Flag, MessageSquare, Car, BadgeCheck
} from 'lucide-react';
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
  const [filterPosition, setFilterPosition] = useState('all');
  const [expandedApplicant, setExpandedApplicant] = useState('marcus');

  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: '2-digit'
  });
  const formattedTime = currentDate.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  });

  const navigation = [
    { id: 'hr-dashboard', label: 'HR Dashboard', icon: Users, page: 'HRDashboard' },
    { id: 'job-postings', label: 'Job Postings', icon: Briefcase, page: 'JobPostings' },
    { id: 'applicant-tracking', label: 'Applicant Tracking', icon: UserPlus },
    { id: 'hiring-pipeline', label: 'Hiring Pipeline', icon: TrendingUp, page: 'HiringPipeline' },
    { id: 'compliance', label: 'HR Compliance', icon: ClipboardCheck, page: 'ComplianceManagement' },
    { id: 'onboarding', label: 'New Hire Onboarding', icon: FileCheck, page: 'NewHireOnboarding' },
    { id: 'training-certifications', label: 'Training & Certifications', icon: GraduationCap, page: 'TrainingCertifications' },
    { id: 'employee-records', label: 'Employee Records', icon: FileText, page: 'EmployeeRecords' },
    { id: 'time-off', label: 'Time Off Management', icon: Calendar, page: 'TimeOffManagement' },
    { id: 'performance', label: 'Performance Reviews', icon: Award, page: 'PerformanceReviews' },
    { id: 'hr-reports', label: 'HR Reports', icon: LayoutDashboard, page: 'HRReports' }
  ];

  const notifications = [
    { id: 1, title: '8 Oral Boards Scheduled', message: 'Deputy Sheriff interviews Feb 06, 2026 - review files', time: '15 min ago', urgent: true },
    { id: 2, title: 'Offer Deadline', message: 'J. Wilson acceptance deadline Feb 05 - follow up required', time: '1 hour ago', urgent: true },
    { id: 3, title: 'Background Complete', message: 'R. Martinez background cleared - ready for medical', time: '2 hours ago', urgent: false }
  ];

  const statusCounts = {
    all: 77,
    new: 8,
    screening: 12,
    interview: 17,
    background: 5,
    offer: 3,
    rejected: 9
  };

  const toggleApplicant = (id) => {
    setExpandedApplicant(expandedApplicant === id ? null : id);
  };

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
        {/* Header */}
        <header className="border-b border-slate-800/50 backdrop-blur-xl bg-slate-900/30">
          <div className="px-4 lg:px-6 py-4">
            <div className="flex items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-4 flex-1 min-w-0">
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="lg:hidden p-2 hover:bg-slate-800/50 rounded-lg"
                >
                  <Menu className="w-5 h-5 text-slate-400" />
                </button>
                <div>
                  <h1 className="text-xl lg:text-2xl font-bold text-white">Applicant Tracking & Pipeline Management</h1>
                  <p className="text-sm text-slate-400">Gwinnett County Sheriff's Office • Lawrenceville, Georgia</p>
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

            {/* Date/Time and System Info */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 mb-4">
              <span>{formattedDate} • {formattedTime} EST</span>
              <span className="text-slate-600">|</span>
              <span>Total Active Applicants: <span className="text-white font-medium">77</span></span>
              <span className="text-slate-600">|</span>
              <span>Sheriff: <span className="text-amber-400 font-medium">Keybo Taylor</span></span>
            </div>

            {/* Pipeline Status */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 mb-4">
              <span>Pipeline Status:</span>
              <span className="px-2 py-1 bg-amber-500/20 text-amber-400 rounded">9 interviews scheduled</span>
              <span className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded">5 backgrounds in progress</span>
              <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded">3 offers pending</span>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap gap-2 mb-4">
              <button className="flex items-center gap-2 px-3 py-2 bg-slate-800/60 hover:bg-slate-800/80 border border-slate-700/50 text-slate-300 rounded-lg text-sm transition-all">
                <Download className="w-4 h-4" />
                Export Applicant List
              </button>
              <button className="flex items-center gap-2 px-3 py-2 bg-slate-800/60 hover:bg-slate-800/80 border border-slate-700/50 text-slate-300 rounded-lg text-sm transition-all">
                <Mail className="w-4 h-4" />
                Bulk Email Applicants
              </button>
              <button className="flex items-center gap-2 px-3 py-2 bg-slate-800/60 hover:bg-slate-800/80 border border-slate-700/50 text-slate-300 rounded-lg text-sm transition-all">
                <Calendar className="w-4 h-4" />
                Schedule Interviews
              </button>
              <button className="flex items-center gap-2 px-3 py-2 bg-slate-800/60 hover:bg-slate-800/80 border border-slate-700/50 text-slate-300 rounded-lg text-sm transition-all">
                <LayoutDashboard className="w-4 h-4" />
                Pipeline Analytics
              </button>
            </div>

            {/* Alert Context Bar */}
            <div className="space-y-2">
              <div className="flex items-center gap-3 px-4 py-2.5 bg-amber-500/10 border border-amber-500/30 rounded-lg">
                <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span className="text-sm text-amber-200">
                  <span className="font-semibold">8 oral board interviews</span> scheduled Feb 06, 2026 - Deputy Sheriff candidates (review files)
                </span>
              </div>
              <div className="flex items-center gap-3 px-4 py-2.5 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                <AlertCircle className="w-4 h-4 text-purple-400 flex-shrink-0" />
                <span className="text-sm text-purple-200">
                  <span className="font-semibold">5 background investigations</span> in progress - Lt. Hayes, Cpl. Adams (avg 67 days to complete)
                </span>
              </div>
              <div className="flex items-center gap-3 px-4 py-2.5 bg-red-500/10 border border-red-500/30 rounded-lg">
                <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0" />
                <span className="text-sm text-red-200">
                  <span className="font-semibold">1 offer pending</span> acceptance deadline Feb 05, 2026 - J. Wilson (Deputy Sheriff) - follow up required
                </span>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <div className="max-w-7xl mx-auto">

            {/* Section Title */}
            <div className="border-b border-slate-700/50 pb-4 mb-6">
              <h2 className="text-lg font-bold text-white tracking-wide">APPLICANT PIPELINE - GWINNETT COUNTY SHERIFF'S OFFICE</h2>
            </div>

            {/* Status Tabs */}
            <div className="mb-6 flex gap-2 border-b border-slate-700/50 overflow-x-auto">
              {[
                { id: 'all', label: 'All Applicants', count: statusCounts.all },
                { id: 'new', label: 'New', count: statusCounts.new },
                { id: 'screening', label: 'Screening', count: statusCounts.screening },
                { id: 'interview', label: 'Interview', count: statusCounts.interview },
                { id: 'background', label: 'Background Check', count: statusCounts.background },
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
                  placeholder="Search applicants by name, reference #, position..."
                  className="w-full pl-12 pr-4 py-2.5 bg-slate-800/40 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50"
                />
              </div>
              <select
                value={filterPosition}
                onChange={(e) => setFilterPosition(e.target.value)}
                className="px-4 py-2.5 bg-slate-800/40 border border-slate-700/50 rounded-xl text-white text-sm focus:outline-none focus:border-amber-500/50 cursor-pointer"
              >
                <option value="all">All Positions</option>
                <option value="deputy">Deputy Sheriff (23)</option>
                <option value="investigator">Background Investigator (12)</option>
                <option value="detention">Detention Officer (8)</option>
                <option value="admin">Administrative Assistant (4)</option>
              </select>
              <select className="px-4 py-2.5 bg-slate-800/40 border border-slate-700/50 rounded-xl text-white text-sm focus:outline-none focus:border-amber-500/50 cursor-pointer">
                <option>Sort: Application Date</option>
                <option>Sort: Last Name A-Z</option>
                <option>Sort: Position</option>
                <option>Sort: Pipeline Stage</option>
              </select>
              <button className="flex items-center gap-2 px-4 py-2.5 bg-slate-800/40 border border-slate-700/50 rounded-xl text-white text-sm hover:bg-slate-800/60 transition-all">
                <Filter className="w-4 h-4" />
                More Filters
              </button>
            </div>

            {/* Applicant List */}
            <div className="space-y-4">

              {/* Marcus Johnson - Screening Stage */}
              <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl overflow-hidden">
                <button
                  onClick={() => toggleApplicant('marcus')}
                  className="w-full p-5 flex items-center justify-between hover:bg-slate-800/60 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-purple-400" />
                    </div>
                    <div className="text-left">
                      <div className="flex items-center gap-3 flex-wrap">
                        <h3 className="text-lg font-bold text-white">MARCUS JOHNSON</h3>
                        <span className="px-2 py-1 bg-purple-500/20 border border-purple-500/30 rounded text-xs text-purple-400 font-bold">SCREENING</span>
                      </div>
                      <p className="text-sm text-slate-400">Deputy Sheriff (Patrol Division) • Ref: 2026-APP-0142</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right hidden md:block">
                      <p className="text-sm text-white font-medium">Applied: Oct 12, 2024</p>
                      <p className="text-xs text-amber-400">Interview Scheduled: Feb 06</p>
                    </div>
                    {expandedApplicant === 'marcus' ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                  </div>
                </button>

                {expandedApplicant === 'marcus' && (
                  <div className="px-5 pb-5 space-y-5 border-t border-slate-700/50">
                    {/* Contact Info */}
                    <div className="pt-5 grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="w-4 h-4 text-slate-500" />
                        <span className="text-slate-300">marcus.johnson@email.com</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="w-4 h-4 text-slate-500" />
                        <span className="text-slate-300">(555) 234-5678</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="w-4 h-4 text-slate-500" />
                        <span className="text-slate-300">Lawrenceville, GA 30046</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="w-4 h-4 text-slate-500" />
                        <span className="text-slate-300">Applied: Oct 12, 2024 (113 days)</span>
                      </div>
                    </div>

                    {/* Qualifications */}
                    <div>
                      <h4 className="text-sm font-bold text-amber-400 uppercase tracking-wide mb-3">Qualifications Summary</h4>
                      <div className="bg-slate-900/40 rounded-lg p-4 border border-slate-700/30 space-y-3">
                        <div>
                          <p className="text-xs text-slate-500 mb-1">Experience</p>
                          <p className="text-sm text-white font-medium">5 years law enforcement</p>
                          <p className="text-xs text-slate-400">Metro Atlanta Police Department (2019-2024) • Patrol Officer, North Precinct</p>
                          <p className="text-xs text-slate-400">Reason for leaving: Seeking career advancement with GCSO</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-xs text-slate-500 mb-1">Education</p>
                            <p className="text-sm text-white">Bachelor's Degree - Criminal Justice</p>
                            <p className="text-xs text-slate-400">Georgia State University (Graduated 2018)</p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-500 mb-1">POST Certification</p>
                            <p className="text-sm text-white">Georgia POST Basic #48291</p>
                            <p className="text-xs text-green-400">Issued: 06/15/2019 • Expires: 06/15/2027 (Current ✓)</p>
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500 mb-1">Additional Certifications</p>
                          <div className="flex flex-wrap gap-2">
                            <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs">Field Training Officer (2022)</span>
                            <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs">Crisis Intervention (2021)</span>
                            <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs">Defensive Tactics Instructor (2023)</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Documents */}
                    <div>
                      <h4 className="text-sm font-bold text-amber-400 uppercase tracking-wide mb-3">Documents Submitted</h4>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          <span className="text-slate-300">Employment Application</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          <span className="text-slate-300">Resume (2 pages)</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          <span className="text-slate-300">Cover Letter</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          <span className="text-slate-300">POST Certificate</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          <span className="text-slate-300">College Transcript</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                          <div className="w-4 h-4 border border-slate-600 rounded-full"></div>
                          <span>References (3 listed, not contacted)</span>
                        </div>
                      </div>
                    </div>

                    {/* Screening Status */}
                    <div>
                      <h4 className="text-sm font-bold text-amber-400 uppercase tracking-wide mb-3">Screening Status</h4>
                      <div className="bg-slate-900/40 rounded-lg p-4 border border-slate-700/30 space-y-3">
                        <div className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-sm text-white font-medium">Initial Application Review: PASSED (10/15/2024)</p>
                            <p className="text-xs text-slate-400">Reviewed by: HR Specialist J. Martinez</p>
                            <p className="text-xs text-slate-400">Met minimum qualifications: Age 21+ ✓, POST cert ✓, HS/GED ✓</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-sm text-white font-medium">Background Pre-Screen: PASSED (10/18/2024)</p>
                            <p className="text-xs text-slate-400">GCIC check: No disqualifying convictions ✓</p>
                            <p className="text-xs text-slate-400">Driving record: Clean ✓ | Employment: Verified current employment ✓</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-sm text-white font-medium">Physical Fitness Test: PASSED (10/22/2024)</p>
                            <p className="text-xs text-slate-400">Location: GCSO Training Center (Cooper Standards)</p>
                            <p className="text-xs text-slate-400">1.5-mi run: 11:45 (PASS) | Push-ups: 42 (PASS) | Sit-ups: 48 (PASS) | 300m: 52s (PASS)</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Next Steps */}
                    <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <Calendar className="w-5 h-5 text-amber-400" />
                        <span className="text-sm font-bold text-amber-400">ORAL BOARD INTERVIEW SCHEDULED</span>
                      </div>
                      <div className="text-sm text-slate-300 space-y-1">
                        <p><span className="text-white font-medium">Date:</span> February 06, 2026 • 09:30 AM (30-minute slot)</p>
                        <p><span className="text-white font-medium">Location:</span> GCSO Headquarters, 2900 Commons Dr, Conference Room B</p>
                        <p><span className="text-white font-medium">Panel:</span> Major R. Davis (Chair), Lt. K. Williams, Lt. M. Thompson</p>
                        <p><span className="text-white font-medium">Format:</span> Structured interview (30 questions, scenario-based, writing sample)</p>
                        <p><span className="text-green-400">✓ Applicant Confirmed Attendance: 01/26/2026</span></p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-3 pt-4 border-t border-slate-700/50">
                      <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-all">
                        <Eye className="w-4 h-4" />
                        View Full Application
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 bg-slate-700/60 hover:bg-slate-700/80 text-white rounded-lg text-sm transition-all">
                        <Mail className="w-4 h-4" />
                        Email Applicant
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 bg-slate-700/60 hover:bg-slate-700/80 text-white rounded-lg text-sm transition-all">
                        <Printer className="w-4 h-4" />
                        Print Interview Score Sheet
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 bg-slate-700/60 hover:bg-slate-700/80 text-white rounded-lg text-sm transition-all">
                        <Flag className="w-4 h-4" />
                        Flag for Review
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Sarah Chen - Interview Stage */}
              <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl overflow-hidden">
                <button
                  onClick={() => toggleApplicant('sarah')}
                  className="w-full p-5 flex items-center justify-between hover:bg-slate-800/60 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-amber-500/20 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-amber-400" />
                    </div>
                    <div className="text-left">
                      <div className="flex items-center gap-3 flex-wrap">
                        <h3 className="text-lg font-bold text-white">SARAH CHEN</h3>
                        <span className="px-2 py-1 bg-amber-500/20 border border-amber-500/30 rounded text-xs text-amber-400 font-bold">INTERVIEW COMPLETED</span>
                        <span className="px-2 py-1 bg-green-500/20 border border-green-500/30 rounded text-xs text-green-400 font-bold">TOP CANDIDATE</span>
                      </div>
                      <p className="text-sm text-slate-400">Background Investigator (HR/IA) • Ref: 2026-APP-0087</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right hidden md:block">
                      <p className="text-sm text-white font-medium">Interview Score: 144/150 (96%)</p>
                      <p className="text-xs text-green-400">Ranked #1 - Awaiting Sheriff Approval</p>
                    </div>
                    {expandedApplicant === 'sarah' ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                  </div>
                </button>

                {expandedApplicant === 'sarah' && (
                  <div className="px-5 pb-5 space-y-5 border-t border-slate-700/50">
                    {/* Contact Info */}
                    <div className="pt-5 grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="w-4 h-4 text-slate-500" />
                        <span className="text-slate-300">sarah.chen@email.com</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="w-4 h-4 text-slate-500" />
                        <span className="text-slate-300">(555) 345-6789</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="w-4 h-4 text-slate-500" />
                        <span className="text-slate-300">Duluth, GA 30096</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="w-4 h-4 text-slate-500" />
                        <span className="text-slate-300">Applied: Oct 27, 2024 (98 days)</span>
                      </div>
                    </div>

                    {/* Qualifications */}
                    <div>
                      <h4 className="text-sm font-bold text-amber-400 uppercase tracking-wide mb-3">Qualifications Summary</h4>
                      <div className="bg-slate-900/40 rounded-lg p-4 border border-slate-700/30 space-y-3">
                        <div>
                          <p className="text-xs text-slate-500 mb-1">Experience</p>
                          <p className="text-sm text-white font-medium">7 years FBI Special Agent</p>
                          <p className="text-xs text-slate-400">FBI Atlanta Field Office (2017-2024) • Public Corruption Unit</p>
                          <p className="text-xs text-slate-400">Reason: Seeking work-life balance, local LE closer to family</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-xs text-slate-500 mb-1">Education</p>
                            <p className="text-sm text-white">Master's Degree - Psychology (Emory 2016)</p>
                            <p className="text-xs text-slate-400">Bachelor's - Criminal Justice (UGA 2014)</p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-500 mb-1">POST & Federal Certifications</p>
                            <p className="text-sm text-white">GA POST Basic #41203 (valid through 05/2027)</p>
                            <p className="text-xs text-green-400">FBI Academy Graduate (Quantico 2017)</p>
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500 mb-1">Specialized Training</p>
                          <div className="flex flex-wrap gap-2">
                            <span className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded text-xs">Polygraph Examiner (FBI 2020)</span>
                            <span className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded text-xs">Advanced Interrogation (FBI 2019)</span>
                            <span className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded text-xs">Background Investigations (FBI 2018)</span>
                            <span className="px-2 py-1 bg-amber-500/20 text-amber-400 rounded text-xs">TOP SECRET/SCI Clearance (Active)</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Interview Results */}
                    <div>
                      <h4 className="text-sm font-bold text-amber-400 uppercase tracking-wide mb-3">Interview Results</h4>
                      <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <p className="text-sm font-bold text-green-400">ORAL BOARD INTERVIEW COMPLETED</p>
                            <p className="text-xs text-slate-400">February 11, 2026 • GCSO HQ, Sheriff's Conference Room</p>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-green-400">144/150</p>
                            <p className="text-xs text-green-400">96.0% - HIGHEST SCORE</p>
                          </div>
                        </div>
                        <div className="space-y-2 mb-4">
                          <p className="text-xs text-slate-400">Panel Scoring (50 pts each, 150 max):</p>
                          <div className="grid grid-cols-3 gap-2 text-sm">
                            <div className="bg-slate-800/40 rounded p-2 text-center">
                              <p className="text-white font-medium">Major R. Davis</p>
                              <p className="text-green-400 font-bold">48/50</p>
                            </div>
                            <div className="bg-slate-800/40 rounded p-2 text-center">
                              <p className="text-white font-medium">HR Director</p>
                              <p className="text-green-400 font-bold">49/50</p>
                            </div>
                            <div className="bg-slate-800/40 rounded p-2 text-center">
                              <p className="text-white font-medium">Lt. K. Hayes</p>
                              <p className="text-green-400 font-bold">47/50</p>
                            </div>
                          </div>
                        </div>
                        <div className="text-sm text-slate-300 space-y-1">
                          <p><span className="text-white font-medium">Panel Comments:</span></p>
                          <p className="text-xs italic">"Exceptional interview - most qualified candidate for this position"</p>
                          <p className="text-xs italic">"FBI investigative experience directly applicable to GCSO backgrounds"</p>
                          <p><span className="text-white font-medium">Writing Sample:</span> <span className="text-green-400">EXCELLENT</span></p>
                          <p><span className="text-white font-medium">Panel Recommendation:</span> <span className="text-green-400 font-bold">STRONGLY RECOMMEND FOR HIRE</span></p>
                        </div>
                      </div>
                    </div>

                    {/* Next Steps */}
                    <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertCircle className="w-5 h-5 text-amber-400" />
                        <span className="text-sm font-bold text-amber-400">AWAITING SHERIFF'S APPROVAL FOR CONDITIONAL OFFER</span>
                      </div>
                      <div className="text-sm text-slate-300 space-y-1">
                        <p>• Interview panel recommendation forwarded to Sheriff Taylor: 02/11/2026</p>
                        <p>• Sheriff review meeting: <span className="text-white font-medium">February 14, 2026</span></p>
                        <p>• If approved: Conditional offer pending GCSO background, medical, psychological</p>
                        <p>• Anticipated salary: <span className="text-green-400">$65,000-68,000</span> (top of range for exceptional qualifications)</p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-3 pt-4 border-t border-slate-700/50">
                      <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-all">
                        <Eye className="w-4 h-4" />
                        View Full Application
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 bg-slate-700/60 hover:bg-slate-700/80 text-white rounded-lg text-sm transition-all">
                        <FileText className="w-4 h-4" />
                        View Interview Score Sheets
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm transition-all">
                        <FileCheck className="w-4 h-4" />
                        Prepare Conditional Offer
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Robert Martinez - Offer Stage */}
              <div className="bg-slate-800/40 border border-green-500/30 rounded-xl overflow-hidden">
                <button
                  onClick={() => toggleApplicant('robert')}
                  className="w-full p-5 flex items-center justify-between hover:bg-slate-800/60 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-green-400" />
                    </div>
                    <div className="text-left">
                      <div className="flex items-center gap-3 flex-wrap">
                        <h3 className="text-lg font-bold text-white">ROBERT MARTINEZ</h3>
                        <span className="px-2 py-1 bg-green-500/20 border border-green-500/30 rounded text-xs text-green-400 font-bold">OFFER ACCEPTED</span>
                      </div>
                      <p className="text-sm text-slate-400">Deputy Sheriff (Patrol Division) • Ref: 2026-APP-0124</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right hidden md:block">
                      <p className="text-sm text-green-400 font-medium">Start Date: March 03, 2026</p>
                      <p className="text-xs text-slate-400">Lateral from Clayton County Sheriff</p>
                    </div>
                    {expandedApplicant === 'robert' ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                  </div>
                </button>

                {expandedApplicant === 'robert' && (
                  <div className="px-5 pb-5 space-y-5 border-t border-slate-700/50">
                    {/* Hiring Process Completed */}
                    <div className="pt-5">
                      <h4 className="text-sm font-bold text-amber-400 uppercase tracking-wide mb-3">Hiring Process - COMPLETED</h4>
                      <div className="bg-slate-900/40 rounded-lg p-4 border border-slate-700/30 space-y-2">
                        <div className="flex items-center gap-3 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          <span className="text-slate-300">Application Received: 10/23/2024</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          <span className="text-slate-300">Initial Screening: PASSED (10/25/2024)</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          <span className="text-slate-300">Physical Fitness: PASSED (10/30/2024)</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          <span className="text-slate-300">Oral Board Interview: 136/150 (90.7%) - 11/15/2024</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          <span className="text-slate-300">Background Investigation: CLEARED (01/20/2026) - Lt. K. Hayes</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          <span className="text-slate-300">Medical Exam: PASSED (01/24/2026)</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          <span className="text-slate-300">Psychological Eval: PASSED (01/27/2026)</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          <span className="text-slate-300">Sheriff's Approval: APPROVED (01/30/2026)</span>
                        </div>
                      </div>
                    </div>

                    {/* Offer Details */}
                    <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <CheckCircle className="w-5 h-5 text-green-400" />
                        <span className="text-sm font-bold text-green-400">CONDITIONAL OFFER ACCEPTED</span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-300">
                        <div>
                          <p><span className="text-white font-medium">Offer Extended:</span> February 01, 2026</p>
                          <p><span className="text-white font-medium">Salary:</span> $55,200/year (Step 5 - 8 yrs exp)</p>
                          <p><span className="text-white font-medium">Shift:</span> B-Shift (14:00-02:00) Patrol</p>
                        </div>
                        <div>
                          <p><span className="text-white font-medium">Start Date:</span> March 03, 2026</p>
                          <p><span className="text-white font-medium">Notice Period:</span> Submitted to Clayton County 02/01</p>
                          <p><span className="text-white font-medium">Last Day Clayton:</span> 02/14/2026</p>
                        </div>
                      </div>
                    </div>

                    {/* Onboarding Status */}
                    <div>
                      <h4 className="text-sm font-bold text-amber-400 uppercase tracking-wide mb-3">Pre-Start Onboarding Status</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="flex items-center gap-2 text-sm">
                          <div className="w-4 h-4 border border-amber-500 rounded-full"></div>
                          <span className="text-slate-400">I-9 Form - Due: 03/03/2026</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <div className="w-4 h-4 border border-slate-600 rounded-full"></div>
                          <span className="text-slate-400">W-4/G-4 Tax Forms - Pending</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          <span className="text-slate-300">POST Cert Transfer - VERIFIED</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          <span className="text-slate-300">Oath of Office - Scheduled 03/03 08:00 AM</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          <span className="text-slate-300">Uniform/Equipment - Pickup 02/28</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          <span className="text-slate-300">Duty Weapon - Glock 17 #GC48291</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          <span className="text-slate-300">FTO Assigned - Cpl. J. Williams (B-Shift)</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          <span className="text-slate-300">Patrol Vehicle - Unit 391 (2023 Tahoe)</span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-3 pt-4 border-t border-slate-700/50">
                      <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-all">
                        <Eye className="w-4 h-4" />
                        View Full Hiring File
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 bg-slate-700/60 hover:bg-slate-700/80 text-white rounded-lg text-sm transition-all">
                        <Mail className="w-4 h-4" />
                        Send Document Reminder
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 bg-slate-700/60 hover:bg-slate-700/80 text-white rounded-lg text-sm transition-all">
                        <ClipboardCheck className="w-4 h-4" />
                        Onboarding Checklist
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm transition-all">
                        <CheckCircle className="w-4 h-4" />
                        Mark as Hired
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* David Brown - Background Check Stage */}
              <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl overflow-hidden">
                <button
                  onClick={() => toggleApplicant('david')}
                  className="w-full p-5 flex items-center justify-between hover:bg-slate-800/60 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-cyan-500/20 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-cyan-400" />
                    </div>
                    <div className="text-left">
                      <div className="flex items-center gap-3 flex-wrap">
                        <h3 className="text-lg font-bold text-white">DAVID BROWN</h3>
                        <span className="px-2 py-1 bg-cyan-500/20 border border-cyan-500/30 rounded text-xs text-cyan-400 font-bold">BACKGROUND CHECK</span>
                      </div>
                      <p className="text-sm text-slate-400">Deputy Sheriff (Patrol Division) • Ref: 2026-APP-0178</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right hidden md:block">
                      <p className="text-sm text-white font-medium">67 days in progress</p>
                      <p className="text-xs text-cyan-400">Investigator: Cpl. J. Adams</p>
                    </div>
                    {expandedApplicant === 'david' ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                  </div>
                </button>

                {expandedApplicant === 'david' && (
                  <div className="px-5 pb-5 space-y-5 border-t border-slate-700/50">
                    {/* Contact & Qualifications */}
                    <div className="pt-5 grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="w-4 h-4 text-slate-500" />
                        <span className="text-slate-300">david.brown@email.com</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="w-4 h-4 text-slate-500" />
                        <span className="text-slate-300">(555) 678-9012</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="w-4 h-4 text-slate-500" />
                        <span className="text-slate-300">Buford, GA 30518</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <BadgeCheck className="w-4 h-4 text-slate-500" />
                        <span className="text-slate-300">6 yrs Hall County Sheriff</span>
                      </div>
                    </div>

                    {/* Background Investigation Status */}
                    <div>
                      <h4 className="text-sm font-bold text-amber-400 uppercase tracking-wide mb-3">Background Investigation Status</h4>
                      <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4 mb-4">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <p className="text-sm font-bold text-cyan-400">IN PROGRESS - 67 DAYS</p>
                            <p className="text-xs text-slate-400">Case #: BI-2024-0178 | Investigator: Cpl. J. Adams (GCSO IA)</p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-slate-400">Target Completion</p>
                            <p className="text-sm text-white font-medium">Feb 15, 2026</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-slate-900/40 rounded-lg p-4 border border-slate-700/30 space-y-3">
                        <div className="flex items-start gap-3">
                          <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                          <div className="flex-1">
                            <p className="text-sm text-white">Initial Interview - COMPLETED (11/25/2024)</p>
                            <p className="text-xs text-slate-400">2 hours at GCSO HQ. Notes: "Applicant cooperative, professional, no concerns."</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                          <div className="flex-1">
                            <p className="text-sm text-white">Criminal History Check - COMPLETED (11/26/2024)</p>
                            <p className="text-xs text-slate-400">GCIC/NCIC: No record ✓ | FBI fingerprint: No arrests ✓ | Court records: Clear ✓</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                          <div className="flex-1">
                            <p className="text-sm text-white">Driving Record - COMPLETED (11/26/2024)</p>
                            <p className="text-xs text-slate-400">1 speeding ticket (2021, 15 mph over, paid). No DUI/suspensions. Acceptable ✓</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                          <div className="flex-1">
                            <p className="text-sm text-white">Employment Verification - COMPLETED (12/10/2024)</p>
                            <p className="text-xs text-slate-400">Hall County Sheriff: "Good deputy, reliable, no disciplinary issues, eligible for rehire"</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                          <div className="flex-1">
                            <p className="text-sm text-white">Education/Residence Verification - COMPLETED</p>
                            <p className="text-xs text-slate-400">UNG Bachelor's CJ (2017) verified ✓ | Current address verified ✓</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                          <div className="flex-1">
                            <p className="text-sm text-white">Credit History - COMPLETED (01/25/2026)</p>
                            <p className="text-xs text-slate-400">Score: 720 (Good). No bankruptcies, collections, or judgments ✓</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-4 h-4 border-2 border-amber-400 rounded-full flex-shrink-0 mt-0.5 animate-pulse"></div>
                          <div className="flex-1">
                            <p className="text-sm text-amber-400">Reference Interviews - IN PROGRESS (4 of 5)</p>
                            <p className="text-xs text-slate-400">Reference #5 (Lt. J. Davis) scheduled 02/05/2026 - Lt. returning from vacation</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-4 h-4 border border-slate-600 rounded-full flex-shrink-0 mt-0.5"></div>
                          <div className="flex-1">
                            <p className="text-sm text-white">Polygraph Examination - SCHEDULED</p>
                            <p className="text-xs text-slate-400">February 12, 2026 • 09:00 AM • Examiner: Sgt. R. Johnson (ret. GBI)</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Investigator Notes */}
                    <div className="bg-slate-900/40 rounded-lg p-4 border border-slate-700/30">
                      <p className="text-xs text-slate-500 mb-2">INVESTIGATOR NOTES (Cpl. Adams - 02/02/2026):</p>
                      <p className="text-sm text-slate-300 italic">"Background investigation proceeding well. No disqualifying issues to date. Strong recommendations from Hall County. Awaiting final reference (02/05) and polygraph (02/12). Preliminary assessment: Likely to recommend for hire pending successful polygraph."</p>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-3 pt-4 border-t border-slate-700/50">
                      <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-all">
                        <Eye className="w-4 h-4" />
                        View Investigation File
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 bg-slate-700/60 hover:bg-slate-700/80 text-white rounded-lg text-sm transition-all">
                        <Mail className="w-4 h-4" />
                        Email Investigator
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 bg-slate-700/60 hover:bg-slate-700/80 text-white rounded-lg text-sm transition-all">
                        <Calendar className="w-4 h-4" />
                        Investigation Timeline
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Lisa Williams - New Stage */}
              <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl overflow-hidden">
                <button
                  onClick={() => toggleApplicant('lisa')}
                  className="w-full p-5 flex items-center justify-between hover:bg-slate-800/60 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-blue-400" />
                    </div>
                    <div className="text-left">
                      <div className="flex items-center gap-3 flex-wrap">
                        <h3 className="text-lg font-bold text-white">LISA WILLIAMS</h3>
                        <span className="px-2 py-1 bg-blue-500/20 border border-blue-500/30 rounded text-xs text-blue-400 font-bold">NEW</span>
                      </div>
                      <p className="text-sm text-slate-400">Detention Officer • Ref: 2026-APP-0201</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right hidden md:block">
                      <p className="text-sm text-white font-medium">Applied: Nov 01, 2024</p>
                      <p className="text-xs text-amber-400">Pending Initial Screening</p>
                    </div>
                    {expandedApplicant === 'lisa' ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                  </div>
                </button>

                {expandedApplicant === 'lisa' && (
                  <div className="px-5 pb-5 space-y-5 border-t border-slate-700/50">
                    <div className="pt-5">
                      <div className="bg-slate-900/40 rounded-lg p-4 border border-slate-700/30 space-y-3">
                        <div>
                          <p className="text-xs text-slate-500 mb-1">Experience</p>
                          <p className="text-sm text-white font-medium">3 years GA Dept of Corrections</p>
                          <p className="text-xs text-slate-400">Correctional Officer II, Metro State Prison (2021-2024)</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-xs text-slate-500 mb-1">Education</p>
                            <p className="text-sm text-white">High School Diploma (South Gwinnett HS, 2020)</p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-500 mb-1">POST Certification</p>
                            <p className="text-sm text-white">GA POST Basic Corrections #52019</p>
                            <p className="text-xs text-green-400">Valid through 08/2029 ✓</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertCircle className="w-5 h-5 text-amber-400" />
                        <span className="text-sm font-bold text-amber-400">PENDING INITIAL SCREENING REVIEW</span>
                      </div>
                      <div className="text-sm text-slate-300 space-y-1">
                        <p>• Application received 93 days ago - awaiting HR review</p>
                        <p>• Assigned to: HR Specialist J. Martinez</p>
                        <p>• Status: Backlog due to Deputy Sheriff hiring priority</p>
                        <p>• Expected review: Week of February 09, 2026</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3 pt-4 border-t border-slate-700/50">
                      <button className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-sm font-medium transition-all">
                        <AlertCircle className="w-4 h-4" />
                        Priority Review
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm transition-all">
                        <Eye className="w-4 h-4" />
                        View Application
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 bg-slate-700/60 hover:bg-slate-700/80 text-white rounded-lg text-sm transition-all">
                        <ChevronRight className="w-4 h-4" />
                        Advance to Screening
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Michael Davis - Rejected */}
              <div className="bg-slate-800/40 border border-red-500/30 rounded-xl overflow-hidden">
                <button
                  onClick={() => toggleApplicant('michael')}
                  className="w-full p-5 flex items-center justify-between hover:bg-slate-800/60 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-red-400" />
                    </div>
                    <div className="text-left">
                      <div className="flex items-center gap-3 flex-wrap">
                        <h3 className="text-lg font-bold text-white">MICHAEL DAVIS</h3>
                        <span className="px-2 py-1 bg-red-500/20 border border-red-500/30 rounded text-xs text-red-400 font-bold">DISQUALIFIED</span>
                      </div>
                      <p className="text-sm text-slate-400">Deputy Sheriff • Ref: 2026-APP-0156</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right hidden md:block">
                      <p className="text-sm text-red-400 font-medium">Did not meet POST requirements</p>
                      <p className="text-xs text-slate-400">Disqualified: 10/31/2024</p>
                    </div>
                    {expandedApplicant === 'michael' ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                  </div>
                </button>

                {expandedApplicant === 'michael' && (
                  <div className="px-5 pb-5 space-y-4 border-t border-slate-700/50">
                    <div className="pt-5">
                      <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                        <p className="text-sm font-bold text-red-400 mb-2">DISQUALIFICATION REASON:</p>
                        <p className="text-sm text-slate-300">Applicant is 19 years old. Georgia POST requires age 21+ for armed patrol deputy positions. Applicant does not meet minimum age requirement per POST standards and GCSO Policy 2.01.</p>
                        <p className="text-xs text-slate-400 mt-2">Reviewed by: HR Specialist J. Martinez (10/31/2024)</p>
                        <p className="text-xs text-slate-400">Notification sent: 11/01/2024 via email and certified mail</p>
                      </div>
                    </div>
                    <div className="text-xs text-slate-500">
                      <p>Note: Applicant may reapply after reaching age 21 (estimated eligibility: August 2027)</p>
                    </div>
                  </div>
                )}
              </div>

            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-slate-800/50 px-6 py-3 bg-slate-900/30">
          <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500">
            <span>System: GCSO-HRIS v4.2 | Last Updated: {formattedTime} EST</span>
            <span>Gwinnett County Sheriff's Office • Human Resources Division</span>
          </div>
        </footer>
      </div>

      {/* Chat Button */}
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
                <MessageSquare className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">GCSO HR Assistant</h3>
                <p className="text-xs text-green-400">Online</p>
              </div>
            </div>
          </div>
          <div className="flex-1 p-4 overflow-y-auto">
            <div className="flex gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <MessageSquare className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <div className="bg-slate-800/60 p-3 rounded-xl">
                  <p className="text-sm text-slate-200">Hi! I can help you track applicant status, schedule interviews, check background investigation progress, and prepare offer letters. What do you need help with?</p>
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

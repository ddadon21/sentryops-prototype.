import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import {
  LayoutDashboard,
  Users,
  FileText,
  TrendingUp,
  Settings,
  Bell,
  MessageCircle,
  Search,
  ChevronRight,
  Shield,
  Sparkles,
  X,
  Send,
  Menu,
  ChevronLeft,
  LogOut,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  Download,
  Eye,
  AlertTriangle,
  FolderOpen,
  UserCheck,
  FileCheck,
  DollarSign
} from 'lucide-react';

export default function BIReports() {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState('bi-reports');
  const [chatOpen, setChatOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [logoutConfirmOpen, setLogoutConfirmOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');

  const navigation = [
    { id: 'bi-dashboard', label: 'BI Dashboard', icon: LayoutDashboard, page: 'BackgroundsDashboard' },
    { id: 'active-cases', label: 'Active Cases', icon: FolderOpen, page: 'ActiveCases' },
    { id: 'case-management', label: 'Case Management', icon: FileText, page: 'CaseManagement' },
    { id: 'investigation-timeline', label: 'Investigation Timeline', icon: Clock, page: 'InvestigationTimeline' },
    { id: 'subject-records', label: 'Subject Records', icon: UserCheck, page: 'SubjectRecords' },
    { id: 'interview-scheduling', label: 'Interview Scheduling', icon: Calendar, page: 'InterviewScheduling' },
    { id: 'evidence-tracking', label: 'Evidence Tracking', icon: FileCheck, page: 'EvidenceTracking' },
    { id: 'reference-checks', label: 'Reference Checks', icon: CheckCircle, page: 'ReferenceChecks' },
    { id: 'employment-verification', label: 'Employment Verification', icon: TrendingUp, page: 'EmploymentVerification' },
    { id: 'criminal-history', label: 'Criminal History Review', icon: AlertTriangle, page: 'CriminalHistoryReview' },
    { id: 'financial-background', label: 'Financial Background', icon: DollarSign, page: 'FinancialBackground' },
    { id: 'social-media', label: 'Social Media Analysis', icon: Eye, page: 'SocialMediaAnalysis' },
    { id: 'bi-reports', label: 'BI Reports', icon: LayoutDashboard },
    { id: 'case-closure', label: 'Case Closure', icon: XCircle, page: 'CaseClosure' },
    { id: 'settings', label: 'Settings', icon: Settings, page: 'BISettings' }
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

  const backgroundReports = [
    {
      id: 1,
      employeeName: 'Robert Martinez',
      employeeId: 'EMP-2024-001',
      department: 'Patrol Division',
      position: 'Deputy Sheriff',
      hireDate: 'Nov 8, 2024',
      reportDate: 'Nov 7, 2024',
      status: 'Cleared',
      criminalCheck: 'Clear',
      creditCheck: 'Acceptable',
      employmentVerification: 'Verified',
      educationVerification: 'Verified',
      referenceChecks: 'Positive',
      drugScreen: 'Negative',
      overallRisk: 'Low',
      investigator: 'Investigator Brooks',
      notes: 'All background checks cleared. Clean record with excellent references.'
    },
    {
      id: 2,
      employeeName: 'Sarah Chen',
      employeeId: 'EMP-2024-002',
      department: 'Investigations',
      position: 'Detective',
      hireDate: 'Oct 15, 2024',
      reportDate: 'Oct 12, 2024',
      status: 'Cleared',
      criminalCheck: 'Clear',
      creditCheck: 'Excellent',
      employmentVerification: 'Verified',
      educationVerification: 'Verified',
      referenceChecks: 'Highly Recommended',
      drugScreen: 'Negative',
      overallRisk: 'Low',
      investigator: 'Investigator Davis',
      notes: 'Outstanding candidate. All checks exceeded requirements.'
    },
    {
      id: 3,
      employeeName: 'James Wilson',
      employeeId: 'EMP-2024-003',
      department: 'K-9 Unit',
      position: 'K-9 Handler',
      hireDate: 'Sep 20, 2024',
      reportDate: 'Sep 15, 2024',
      status: 'Cleared with Notes',
      criminalCheck: 'Clear',
      creditCheck: 'Fair',
      employmentVerification: 'Verified',
      educationVerification: 'Verified',
      referenceChecks: 'Positive',
      drugScreen: 'Negative',
      overallRisk: 'Low-Medium',
      investigator: 'Investigator Brooks',
      notes: 'Single dismissed arrest from college (2015). Credit history shows past financial stress, now resolved. Approved with supervisor awareness.'
    },
    {
      id: 4,
      employeeName: 'Maria Rodriguez',
      employeeId: 'PENDING-2024-004',
      department: 'Administration',
      position: 'HR Coordinator',
      hireDate: null,
      reportDate: 'Nov 20, 2024',
      status: 'In Progress',
      criminalCheck: 'In Progress',
      creditCheck: 'Pending',
      employmentVerification: 'In Progress',
      educationVerification: 'Verified',
      referenceChecks: 'Pending',
      drugScreen: 'Scheduled',
      overallRisk: 'Pending',
      investigator: 'Investigator Davis',
      notes: 'Background investigation initiated. Expected completion Nov 28, 2024.'
    },
    {
      id: 5,
      employeeName: 'David Thompson',
      employeeId: 'PENDING-2024-005',
      department: 'Communications',
      position: 'Dispatcher',
      hireDate: null,
      reportDate: 'Nov 18, 2024',
      status: 'Review Required',
      criminalCheck: 'Flag',
      creditCheck: 'Poor',
      employmentVerification: 'Verified',
      educationVerification: 'Verified',
      referenceChecks: 'Mixed',
      drugScreen: 'Negative',
      overallRisk: 'Medium',
      investigator: 'Investigator Brooks',
      notes: 'Criminal history shows DUI from 2019 (completed diversion). Credit issues from medical debt. Requires director review before final decision.'
    }
  ];

  const notifications = [
    { id: 1, title: 'Review Required', message: 'David Thompson - Director review needed', time: '30 min ago', urgent: true },
    { id: 2, title: 'Report Complete', message: 'Robert Martinez - All clear', time: '2 hours ago', urgent: false },
    { id: 3, title: 'Background In Progress', message: 'Maria Rodriguez - 60% complete', time: '4 hours ago', urgent: false }
  ];

  const filteredReports = selectedFilter === 'all'
    ? backgroundReports
    : backgroundReports.filter(r => r.status.toLowerCase().replace(' ', '-') === selectedFilter);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex">
      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 border-r border-slate-800/50 backdrop-blur-xl bg-slate-900/30 flex flex-col transform transition-all lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} ${sidebarCollapsed ? 'w-20' : 'w-64'}`}>
        <div className="p-4 border-b border-slate-700/50 flex items-center justify-between">
          {!sidebarCollapsed && (
            <div className="flex items-center gap-2">
              <Shield className="w-8 h-8 text-purple-500" />
              <h1 className="text-xl font-bold text-white">SentryOps</h1>
            </div>
          )}
          {sidebarCollapsed && (
            <Shield className="w-8 h-8 text-purple-500 mx-auto" />
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
                  isActive ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/20' : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
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
                className="flex-1 px-4 py-2.5 bg-purple-600/40 hover:bg-purple-600/60 border border-purple-500/50 rounded-xl text-white font-medium transition-all"
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
              <div className="flex-1 max-w-xl relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input type="text" placeholder="Search background reports..." className="w-full pl-12 pr-4 py-2 bg-slate-800/40 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/50" />
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
                        <div key={notification.id} className={`p-4 border-b border-slate-800/30 hover:bg-slate-800/30 cursor-pointer transition-colors ${notification.urgent ? 'bg-purple-500/5' : ''}`}>
                          <div className="flex items-start gap-3">
                            <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${notification.urgent ? 'bg-purple-400' : 'bg-blue-400'}`}></div>
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
                      <button className="w-full text-center text-sm text-purple-400 hover:text-purple-300 font-medium">View All</button>
                    </div>
                  </div>
                )}
              </div>

              <div className="h-8 w-px bg-slate-700/50"></div>

              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">BI</span>
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-white">BI Supervisor</p>
                  <p className="text-xs text-slate-400">Background Investigations</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <div className="mb-6">
            <h2 className="text-2xl lg:text-3xl font-bold text-white mb-2">Background Investigation Reports</h2>
            <p className="text-slate-400">Pre-employment and ongoing background screening reports</p>
          </div>

          <div className="mb-6 bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-500/20 rounded-xl p-5">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-6 h-6 text-purple-400" />
              </div>
              <div className="flex-1">
                <h4 className="text-base font-semibold text-white mb-2">AI Background Screening Insights</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-300">
                  <p>• 5 background checks completed this month</p>
                  <p>• 80% cleared without issues</p>
                  <p>• 1 report pending director review</p>
                  <p>• Average processing time: 4.2 days</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-6">
              <div className="flex items-center justify-between mb-2">
                <CheckCircle className="w-8 h-8 text-green-400" />
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <p className="text-sm text-slate-400">Cleared</p>
            </div>

            <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-6">
              <div className="flex items-center justify-between mb-2">
                <AlertTriangle className="w-8 h-8 text-amber-400" />
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <p className="text-sm text-slate-400">Review Required</p>
            </div>

            <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-6">
              <div className="flex items-center justify-between mb-2">
                <Clock className="w-8 h-8 text-blue-400" />
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <p className="text-sm text-slate-400">In Progress</p>
            </div>

            <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-6">
              <div className="flex items-center justify-between mb-2">
                <FileText className="w-8 h-8 text-purple-400" />
                <span className="text-2xl font-bold text-white">5</span>
              </div>
              <p className="text-sm text-slate-400">Total Reports</p>
            </div>
          </div>

          <div className="flex items-center gap-3 mb-6">
            <button className="flex items-center gap-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-xl font-medium transition-colors">
              <Download className="w-5 h-5" />
              Export All Reports
            </button>
          </div>

          <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl overflow-hidden mb-6">
            <div className="flex border-b border-slate-700/50">
              {['all', 'cleared', 'review-required', 'in-progress'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setSelectedFilter(filter)}
                  className={`px-6 py-4 text-sm font-medium transition-all capitalize ${
                    selectedFilter === filter
                      ? 'bg-purple-500/10 text-purple-400 border-b-2 border-purple-500'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {filter.replace('-', ' ')}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {filteredReports.map((report) => (
              <div key={report.id} className={`bg-slate-800/40 border rounded-xl p-6 ${
                report.status === 'Cleared' ? 'border-green-500/30' :
                report.status === 'Review Required' ? 'border-red-500/30' :
                report.status === 'Cleared with Notes' ? 'border-amber-500/30' :
                'border-slate-700/50'
              }`}>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">{report.employeeName}</h3>
                    <p className="text-sm text-purple-400 mb-2">{report.employeeId} • {report.position}</p>
                    <p className="text-sm text-slate-400">{report.department}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className={`px-3 py-1 rounded-lg text-xs font-medium ${
                      report.status === 'Cleared' ? 'bg-green-500/10 text-green-400' :
                      report.status === 'Cleared with Notes' ? 'bg-amber-500/10 text-amber-400' :
                      report.status === 'Review Required' ? 'bg-red-500/10 text-red-400' :
                      'bg-blue-500/10 text-blue-400'
                    }`}>
                      {report.status}
                    </span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      report.overallRisk === 'Low' ? 'bg-green-500/10 text-green-400' :
                      report.overallRisk === 'Low-Medium' ? 'bg-blue-500/10 text-blue-400' :
                      report.overallRisk === 'Medium' ? 'bg-amber-500/10 text-amber-400' :
                      'bg-slate-500/10 text-slate-400'
                    }`}>
                      Risk: {report.overallRisk}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="bg-slate-900/40 rounded-lg p-3">
                    <p className="text-xs text-slate-500 mb-1">Criminal Check</p>
                    <p className={`text-sm font-medium ${
                      report.criminalCheck === 'Clear' ? 'text-green-400' :
                      report.criminalCheck === 'Flag' ? 'text-red-400' : 'text-blue-400'
                    }`}>{report.criminalCheck}</p>
                  </div>
                  <div className="bg-slate-900/40 rounded-lg p-3">
                    <p className="text-xs text-slate-500 mb-1">Credit Check</p>
                    <p className={`text-sm font-medium ${
                      report.creditCheck === 'Excellent' || report.creditCheck === 'Acceptable' ? 'text-green-400' :
                      report.creditCheck === 'Fair' ? 'text-amber-400' :
                      report.creditCheck === 'Poor' ? 'text-red-400' : 'text-blue-400'
                    }`}>{report.creditCheck}</p>
                  </div>
                  <div className="bg-slate-900/40 rounded-lg p-3">
                    <p className="text-xs text-slate-500 mb-1">Employment</p>
                    <p className={`text-sm font-medium ${
                      report.employmentVerification === 'Verified' ? 'text-green-400' : 'text-blue-400'
                    }`}>{report.employmentVerification}</p>
                  </div>
                  <div className="bg-slate-900/40 rounded-lg p-3">
                    <p className="text-xs text-slate-500 mb-1">Drug Screen</p>
                    <p className={`text-sm font-medium ${
                      report.drugScreen === 'Negative' ? 'text-green-400' :
                      report.drugScreen === 'Scheduled' ? 'text-blue-400' : 'text-red-400'
                    }`}>{report.drugScreen}</p>
                  </div>
                </div>

                <div className="bg-slate-900/40 rounded-lg p-3 mb-4">
                  <p className="text-xs text-slate-500 mb-1">Investigator Notes</p>
                  <p className="text-sm text-slate-300">{report.notes}</p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-700/30">
                  <div className="flex items-center gap-4 text-sm text-slate-400">
                    <span>Report Date: <span className="text-white">{report.reportDate}</span></span>
                    {report.hireDate && (
                      <>
                        <span>•</span>
                        <span>Hire Date: <span className="text-white">{report.hireDate}</span></span>
                      </>
                    )}
                    <span>•</span>
                    <span>Investigator: <span className="text-white">{report.investigator}</span></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="px-4 py-2 bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 rounded-xl text-sm font-medium transition-colors flex items-center gap-2">
                      <Eye className="w-4 h-4" />
                      View Full Report
                    </button>
                    <button className="px-4 py-2 bg-green-500/10 hover:bg-green-500/20 text-green-400 rounded-xl text-sm font-medium transition-colors flex items-center gap-2">
                      <Download className="w-4 h-4" />
                      Download
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      <button
        onClick={() => setChatOpen(!chatOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-400 hover:to-purple-500 rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110 z-50"
      >
        {chatOpen ? <X className="w-6 h-6 text-white" /> : <MessageCircle className="w-6 h-6 text-white" />}
      </button>

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
                  <p className="text-sm text-slate-200">I can help interpret background reports, assess risk levels, flag concerning patterns, and recommend next steps. What do you need?</p>
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 border-t border-slate-700/50">
            <div className="flex items-center gap-2">
              <input type="text" placeholder="Ask about backgrounds..." className="flex-1 px-4 py-2 bg-slate-800/40 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/50" />
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

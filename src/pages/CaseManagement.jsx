import React, { useState } from 'react';
import { LayoutDashboard, FolderOpen, FileText, Clock, UserCheck, Calendar, FileCheck, CheckCircle, TrendingUp, AlertTriangle, DollarSign, Eye, Activity, XCircle, Settings, Bell, MessageCircle, Search, ChevronRight, Shield, Sparkles, X, Send, Menu, ChevronLeft, LogOut, Edit, Plus, Trash2, Download, Upload, Paperclip } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function CaseManagement() {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState('case-management');
  const [chatOpen, setChatOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [logoutConfirmOpen, setLogoutConfirmOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState('overview');

  const navigation = [
    { id: 'bi-dashboard', label: 'BI Dashboard', icon: LayoutDashboard, page: 'BackgroundsDashboard' },
    { id: 'active-cases', label: 'Active Cases', icon: FolderOpen, page: 'ActiveCases' },
    { id: 'case-management', label: 'Case Management', icon: FileText },
    { id: 'investigation-timeline', label: 'Investigation Timeline', icon: Clock, page: 'InvestigationTimeline' },
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

  const caseDetails = {
    id: 'BI-2024-145',
    subject: 'Robert Martinez',
    position: 'Deputy Sheriff',
    dateOpened: 'Oct 15, 2024',
    daysOpen: 23,
    priority: 'High',
    status: 'In Progress',
    investigator: 'Investigator Brooks',
    completion: 78,
    sections: [
      { name: 'Personal Information', status: 'Complete', progress: 100 },
      { name: 'Criminal History', status: 'Complete', progress: 100 },
      { name: 'Employment Verification', status: 'In Progress', progress: 75 },
      { name: 'Reference Checks', status: 'In Progress', progress: 60 },
      { name: 'Financial Background', status: 'Pending', progress: 40 },
      { name: 'Social Media Review', status: 'Pending', progress: 30 }
    ],
    notes: [
      { date: '2 hours ago', author: 'Brooks', text: 'Criminal history check returned clean - no flags' },
      { date: '1 day ago', author: 'System', text: 'Employment verification request sent to previous employer' },
      { date: '2 days ago', author: 'Brooks', text: 'Initial interview completed - candidate appears qualified' }
    ],
    documents: [
      { name: 'Application Form', type: 'PDF', uploaded: 'Oct 15, 2024', size: '2.4 MB' },
      { name: 'Criminal History Report', type: 'PDF', uploaded: 'Oct 18, 2024', size: '856 KB' },
      { name: 'Resume', type: 'PDF', uploaded: 'Oct 15, 2024', size: '1.2 MB' },
      { name: 'Photo ID', type: 'JPG', uploaded: 'Oct 15, 2024', size: '3.1 MB' }
    ]
  };

  const notifications = [
    { id: 1, title: 'Document Uploaded', message: 'New reference letter received', time: '30 min ago', urgent: false },
    { id: 2, title: 'Status Update Required', message: 'Employment verification pending', time: '2 hours ago', urgent: true }
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
                <input type="text" placeholder="Search cases..." className="w-full pl-12 pr-4 py-2 bg-slate-800/40 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50" />
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
          <div className="max-w-7xl mx-auto">
            <div className="mb-6">
              <h2 className="text-2xl lg:text-3xl font-bold text-white mb-2">Case Management</h2>
              <p className="text-slate-400">Detailed case view and documentation</p>
            </div>

            {/* AI Insights Banner */}
            <div className="mb-6 bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-500/20 rounded-xl p-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-6 h-6 text-purple-400" />
                </div>
                <div className="flex-1">
                  <h4 className="text-base font-semibold text-white mb-2">Case Intelligence</h4>
                  <p className="text-sm text-slate-300">Case <span className="text-purple-400 font-semibold">BI-2024-145</span> is <span className="text-green-400 font-semibold">78% complete</span> and progressing well. Criminal history cleared with no flags. Employment verification pending response (requested 1 day ago). Recommended next action: <span className="text-amber-400 font-semibold">Complete reference checks (currently 60%)</span>.</p>
                </div>
              </div>
            </div>

            {/* Case Header */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <div className="lg:col-span-2 bg-slate-800/40 border border-slate-700/50 rounded-xl p-6">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">{caseDetails.subject}</h3>
                    <p className="text-purple-400 font-medium mb-2">{caseDetails.id}</p>
                    <p className="text-slate-400 text-sm">{caseDetails.position}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 bg-slate-700/50 hover:bg-slate-700 rounded-lg transition-colors">
                      <Edit className="w-5 h-5 text-slate-300" />
                    </button>
                    <button className="p-2 bg-red-500/10 hover:bg-red-500/20 rounded-lg transition-colors">
                      <Trash2 className="w-5 h-5 text-red-400" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Date Opened</p>
                    <p className="text-sm text-white font-medium">{caseDetails.dateOpened}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Days Open</p>
                    <p className="text-sm text-white font-medium">{caseDetails.daysOpen} days</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Priority</p>
                    <span className={`inline-block px-3 py-1 rounded-lg text-xs font-medium ${caseDetails.priority === 'High' ? 'bg-red-500/10 text-red-400' : 'bg-amber-500/10 text-amber-400'}`}>
                      {caseDetails.priority}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Status</p>
                    <span className="inline-block px-3 py-1 rounded-lg text-xs font-medium bg-blue-500/10 text-blue-400">
                      {caseDetails.status}
                    </span>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-400">Overall Progress</span>
                    <span className="text-sm font-medium text-white">{caseDetails.completion}%</span>
                  </div>
                  <div className="h-3 bg-slate-700/50 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-purple-500 to-purple-400" style={{ width: `${caseDetails.completion}%` }}></div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-white mb-3">Investigation Sections</h4>
                  <div className="space-y-3">
                    {caseDetails.sections.map((section, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 bg-slate-900/40 rounded-lg">
                        <div className="flex-1">
                          <p className="text-sm text-white mb-1">{section.name}</p>
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-2 bg-slate-700/50 rounded-full overflow-hidden">
                              <div className={`h-full ${section.progress === 100 ? 'bg-green-500' : section.progress >= 50 ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${section.progress}%` }}></div>
                            </div>
                            <span className="text-xs text-slate-400 w-12 text-right">{section.progress}%</span>
                          </div>
                        </div>
                        <span className={`ml-4 px-2 py-1 rounded text-xs font-medium ${section.status === 'Complete' ? 'bg-green-500/10 text-green-400' : section.status === 'In Progress' ? 'bg-blue-500/10 text-blue-400' : 'bg-slate-500/10 text-slate-400'}`}>
                          {section.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-6">
                  <h4 className="text-sm font-semibold text-white mb-4">Quick Actions</h4>
                  <div className="space-y-2">
                    <button className="w-full px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-2">
                      <Upload className="w-4 h-4" />
                      Upload Document
                    </button>
                    <button className="w-full px-4 py-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-2">
                      <Plus className="w-4 h-4" />
                      Add Note
                    </button>
                    <button className="w-full px-4 py-2 bg-green-500/10 hover:bg-green-500/20 text-green-400 rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Schedule Interview
                    </button>
                    <button className="w-full px-4 py-2 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-2">
                      <Download className="w-4 h-4" />
                      Export Case
                    </button>
                  </div>
                </div>

                <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-6">
                  <h4 className="text-sm font-semibold text-white mb-4">Assigned To</h4>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center font-bold text-white">IB</div>
                    <div>
                      <p className="text-sm font-medium text-white">{caseDetails.investigator}</p>
                      <p className="text-xs text-slate-400">Lead Investigator</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl overflow-hidden">
              <div className="flex border-b border-slate-700/50">
                <button
                  onClick={() => setSelectedTab('overview')}
                  className={`px-6 py-4 text-sm font-medium transition-all ${selectedTab === 'overview' ? 'bg-purple-500/10 text-purple-400 border-b-2 border-purple-500' : 'text-slate-400 hover:text-white'}`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setSelectedTab('documents')}
                  className={`px-6 py-4 text-sm font-medium transition-all ${selectedTab === 'documents' ? 'bg-purple-500/10 text-purple-400 border-b-2 border-purple-500' : 'text-slate-400 hover:text-white'}`}
                >
                  Documents ({caseDetails.documents.length})
                </button>
                <button
                  onClick={() => setSelectedTab('notes')}
                  className={`px-6 py-4 text-sm font-medium transition-all ${selectedTab === 'notes' ? 'bg-purple-500/10 text-purple-400 border-b-2 border-purple-500' : 'text-slate-400 hover:text-white'}`}
                >
                  Notes ({caseDetails.notes.length})
                </button>
                <button
                  onClick={() => setSelectedTab('history')}
                  className={`px-6 py-4 text-sm font-medium transition-all ${selectedTab === 'history' ? 'bg-purple-500/10 text-purple-400 border-b-2 border-purple-500' : 'text-slate-400 hover:text-white'}`}
                >
                  History
                </button>
              </div>

              <div className="p-6">
                {selectedTab === 'documents' && (
                  <div className="space-y-3">
                    {caseDetails.documents.map((doc, idx) => (
                      <div key={idx} className="flex items-center justify-between p-4 bg-slate-900/40 rounded-lg hover:bg-slate-900/60 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center">
                            <Paperclip className="w-5 h-5 text-purple-400" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-white">{doc.name}</p>
                            <p className="text-xs text-slate-400">{doc.type} • {doc.size} • Uploaded {doc.uploaded}</p>
                          </div>
                        </div>
                        <button className="px-3 py-1 bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 rounded-lg text-xs font-medium transition-colors">
                          View
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {selectedTab === 'notes' && (
                  <div className="space-y-4">
                    {caseDetails.notes.map((note, idx) => (
                      <div key={idx} className="p-4 bg-slate-900/40 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-medium text-purple-400">{note.author}</span>
                          <span className="text-xs text-slate-500">{note.date}</span>
                        </div>
                        <p className="text-sm text-slate-300">{note.text}</p>
                      </div>
                    ))}
                  </div>
                )}

                {selectedTab === 'overview' && (
                  <div className="text-center py-8">
                    <FileText className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                    <p className="text-slate-400">Case overview and summary information</p>
                  </div>
                )}

                {selectedTab === 'history' && (
                  <div className="text-center py-8">
                    <Clock className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                    <p className="text-slate-400">Activity history and timeline</p>
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
                  <p className="text-sm text-slate-200">I can help analyze this case, suggest next steps, flag potential issues, and answer questions about the investigation. What do you need?</p>
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 border-t border-slate-700/50">
            <div className="flex items-center gap-2">
              <input type="text" placeholder="Ask about this case..." className="flex-1 px-4 py-2 bg-slate-800/40 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/50" />
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

import React, { useState, useEffect } from 'react';
import { LayoutDashboard, FolderOpen, FileText, Clock, UserCheck, Calendar, FileCheck, CheckCircle, CheckCircle2, TrendingUp, AlertTriangle, DollarSign, Eye, Activity, XCircle, Settings, Bell, Search, ChevronRight, Shield, X, Menu, ChevronLeft, LogOut, Edit, Plus, Trash2, Download, Upload, Paperclip, Circle, PauseCircle, User, Phone, Mail, HelpCircle, BookOpen, ExternalLink, ArrowLeft, Archive, History, Flag, Share2, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function CaseManagement() {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState('case-management');
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [logoutConfirmOpen, setLogoutConfirmOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState('overview');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
  };

  const getStageIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle2 className="w-4 h-4 text-green-400" />;
      case 'in_progress': return <Clock className="w-4 h-4 text-amber-400 animate-pulse" />;
      case 'partial': return <PauseCircle className="w-4 h-4 text-blue-400" />;
      case 'blocked': return <AlertTriangle className="w-4 h-4 text-red-400" />;
      case 'not_required': return <Circle className="w-4 h-4 text-slate-500" />;
      default: return <Circle className="w-4 h-4 text-slate-600" />;
    }
  };

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
    { id: 'case-closure', label: 'Case Closure', icon: XCircle, page: 'CaseClosure' }
  ];

  const caseDetails = {
    id: 'BI-2024-145',
    subject: 'Robert Martinez',
    position: 'Deputy Sheriff',
    department: 'Patrol Division',
    applicationDate: 'Dec 31, 2025',
    dateOpened: 'Jan 2, 2026',
    daysOpen: 23,
    conditionalOfferDate: 'Dec 28, 2025',
    conditionalOfferExpires: 'Jan 30, 2026',
    priority: 'high',
    priorityReason: 'Conditional offer expires in 7 days (Jan 30)',
    currentStage: 'Reference Checks',
    investigator: {
      name: 'Inv. Marcus Brooks',
      badge: '#4521',
      email: 'mbrooks@sheriff.gov',
      phone: 'x4521',
      activeCases: 12,
      avgTurnaround: '18 days'
    },
    supervisor: {
      name: 'Sgt. Patricia Chen',
      badge: '#2105'
    },
    stages: [
      {
        name: 'Initial Review',
        status: 'completed',
        detail: 'Application packet verified complete',
        completedDate: 'Jan 3, 2026',
        completedBy: 'Brooks'
      },
      {
        name: 'Criminal History',
        status: 'completed',
        detail: 'GCIC/FBI clear - no hits',
        completedDate: 'Jan 8, 2026',
        completedBy: 'Brooks',
        source: 'GCIC/NCIC Query #GC-2026-00892'
      },
      {
        name: 'Reference Checks',
        status: 'in_progress',
        detail: '3 of 5 references completed',
        subDetail: 'Personal: 2/3, Employment: 1/2',
        pendingItems: [
          'Former supervisor J. Adams - 3 call attempts documented',
          'Personal reference K. Williams - interview scheduled Jan 25'
        ]
      },
      {
        name: 'Employment Verification',
        status: 'partial',
        detail: '2 of 3 employers verified',
        subDetail: 'Current: Verified, Previous: Verified, Prior: Pending',
        pendingItems: [
          'ABC Security (2019-2021) - HR response pending since Jan 15'
        ]
      },
      {
        name: 'Financial Review',
        status: 'pending',
        detail: 'Credit authorization received',
        nextStep: 'Request credit report from TransUnion'
      },
      {
        name: 'Social Media Review',
        status: 'pending',
        detail: 'Not yet started',
        nextStep: 'Conduct open-source review after reference checks'
      },
      {
        name: 'Supervisor Review',
        status: 'pending',
        detail: 'Awaiting investigation completion'
      }
    ],
    nextAction: 'Complete remaining reference checks by Jan 25',
    blockers: 'Former supervisor J. Adams not returning calls (documented 3 attempts)',
    notes: [
      {
        date: 'Jan 23, 2026 at 2:15 PM',
        author: 'Inv. Brooks',
        authorBadge: '#4521',
        text: 'Criminal history check returned clear - no hits in GCIC or FBI databases. Verified through NCIC query.',
        category: 'Criminal History'
      },
      {
        date: 'Jan 22, 2026 at 10:30 AM',
        author: 'Inv. Brooks',
        authorBadge: '#4521',
        text: 'Employment verification request sent to ABC Security HR department. Contact: hr@abcsecurity.com. No response received yet.',
        category: 'Employment'
      },
      {
        date: 'Jan 18, 2026 at 3:45 PM',
        author: 'Inv. Brooks',
        authorBadge: '#4521',
        text: 'Initial interview completed with applicant. Verified all information on application matches verbal statements. No discrepancies noted.',
        category: 'Interview'
      },
      {
        date: 'Jan 15, 2026 at 9:00 AM',
        author: 'Inv. Brooks',
        authorBadge: '#4521',
        text: 'Third voicemail left for former supervisor J. Adams at (770) 555-1234. Will document inability to contact if no response by Jan 28.',
        category: 'Reference Check'
      }
    ],
    documents: [
      { name: 'Background Investigation Application', type: 'PDF', uploaded: 'Jan 2, 2026', uploadedBy: 'HR Intake', size: '2.4 MB', status: 'verified' },
      { name: 'Criminal History Report - GCIC/FBI', type: 'PDF', uploaded: 'Jan 8, 2026', uploadedBy: 'Inv. Brooks', size: '856 KB', status: 'verified' },
      { name: 'Employment Verification - Current', type: 'PDF', uploaded: 'Jan 12, 2026', uploadedBy: 'Inv. Brooks', size: '245 KB', status: 'verified' },
      { name: 'Employment Verification - Previous', type: 'PDF', uploaded: 'Jan 15, 2026', uploadedBy: 'Inv. Brooks', size: '198 KB', status: 'verified' },
      { name: 'Reference Interview - D. Thompson', type: 'PDF', uploaded: 'Jan 18, 2026', uploadedBy: 'Inv. Brooks', size: '312 KB', status: 'verified' },
      { name: 'Reference Interview - M. Garcia', type: 'PDF', uploaded: 'Jan 20, 2026', uploadedBy: 'Inv. Brooks', size: '287 KB', status: 'verified' },
      { name: 'Applicant Resume', type: 'PDF', uploaded: 'Jan 2, 2026', uploadedBy: 'HR Intake', size: '1.2 MB', status: 'verified' },
      { name: 'Government-Issued Photo ID', type: 'JPG', uploaded: 'Jan 2, 2026', uploadedBy: 'HR Intake', size: '3.1 MB', status: 'verified' }
    ],
    activityHistory: [
      { date: 'Jan 23, 2026 at 2:15 PM', action: 'Note added', detail: 'Criminal history documentation completed', user: 'Inv. Brooks' },
      { date: 'Jan 22, 2026 at 10:30 AM', action: 'Document uploaded', detail: 'Reference Interview - M. Garcia', user: 'Inv. Brooks' },
      { date: 'Jan 20, 2026 at 4:00 PM', action: 'Stage updated', detail: 'Reference Checks marked as In Progress', user: 'Inv. Brooks' },
      { date: 'Jan 18, 2026 at 3:45 PM', action: 'Interview completed', detail: 'Initial applicant interview', user: 'Inv. Brooks' },
      { date: 'Jan 15, 2026 at 9:00 AM', action: 'Contact attempt', detail: 'Voicemail left for J. Adams (attempt #3)', user: 'Inv. Brooks' },
      { date: 'Jan 12, 2026 at 2:30 PM', action: 'Document uploaded', detail: 'Employment Verification - Current', user: 'Inv. Brooks' },
      { date: 'Jan 8, 2026 at 11:00 AM', action: 'Stage completed', detail: 'Criminal History cleared', user: 'Inv. Brooks' },
      { date: 'Jan 3, 2026 at 9:15 AM', action: 'Stage completed', detail: 'Initial Review completed', user: 'Inv. Brooks' },
      { date: 'Jan 2, 2026 at 8:00 AM', action: 'Case opened', detail: 'Case assigned to Inv. Brooks', user: 'Sgt. Chen' }
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
            {/* Case-Specific Page Header */}
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                <button
                  onClick={() => navigate(createPageUrl('ActiveCases'))}
                  className="p-2 hover:bg-slate-800/50 rounded-lg transition-colors"
                >
                  <ArrowLeft className="w-5 h-5 text-slate-400" />
                </button>
                <div className="flex-1">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h2 className="text-2xl lg:text-3xl font-bold text-white">{caseDetails.subject}</h2>
                    <span className="px-3 py-1 bg-slate-700/50 rounded-lg text-sm font-mono text-slate-300">{caseDetails.id}</span>
                    <span className={`px-3 py-1 rounded-lg text-xs font-semibold uppercase tracking-wide ${
                      caseDetails.priority === 'high' ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                    }`}>
                      {caseDetails.priority === 'high' ? 'HIGH PRIORITY' : 'STANDARD'}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 mt-2 text-sm text-slate-400">
                    <span>{caseDetails.position} • {caseDetails.department}</span>
                    <span className="hidden sm:inline">|</span>
                    <span className="hidden sm:inline">Assigned to {caseDetails.investigator.name}</span>
                  </div>
                </div>
                <div className="hidden md:flex items-center gap-2 text-xs text-slate-500">
                  <span className="px-2 py-1 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                    LIVE
                  </span>
                  <span>{formatTime(currentTime)} • {formatDate(currentTime)}</span>
                </div>
              </div>
            </div>

            {/* Investigation Status Summary (replaced AI Insights) */}
            <div className="mb-6 bg-slate-800/40 border border-slate-700/50 rounded-xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-base font-semibold text-white">Investigation Status Summary</h4>
                <span className="text-xs text-slate-500">Last updated: {caseDetails.activityHistory[0]?.date}</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-slate-900/40 rounded-lg p-4">
                  <p className="text-xs text-slate-500 uppercase tracking-wide mb-2">Current Stage</p>
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-amber-400 animate-pulse" />
                    <span className="text-lg font-semibold text-white">{caseDetails.currentStage}</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    {caseDetails.stages.find(s => s.name === caseDetails.currentStage)?.detail}
                  </p>
                </div>
                <div className="bg-slate-900/40 rounded-lg p-4">
                  <p className="text-xs text-slate-500 uppercase tracking-wide mb-2">Next Required Action</p>
                  <p className="text-sm text-amber-400 font-medium">{caseDetails.nextAction}</p>
                  {caseDetails.blockers && (
                    <p className="text-xs text-red-400 mt-2 flex items-start gap-1">
                      <AlertTriangle className="w-3 h-3 mt-0.5 flex-shrink-0" />
                      {caseDetails.blockers}
                    </p>
                  )}
                </div>
                <div className="bg-slate-900/40 rounded-lg p-4">
                  <p className="text-xs text-slate-500 uppercase tracking-wide mb-2">Timeline Status</p>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Days Open</span>
                      <span className="text-white font-medium">{caseDetails.daysOpen} days</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Offer Expires</span>
                      <span className="text-red-400 font-medium">{caseDetails.conditionalOfferExpires}</span>
                    </div>
                    <p className="text-xs text-amber-400 mt-1">7 days remaining</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Case Details and Investigation Stages */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <div className="lg:col-span-2 bg-slate-800/40 border border-slate-700/50 rounded-xl p-6">
                {/* Case Information */}
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Case Information</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-xs text-slate-500 mb-1">Application Date</p>
                        <p className="text-sm text-white font-medium">{caseDetails.applicationDate}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 mb-1">Case Opened</p>
                        <p className="text-sm text-white font-medium">{caseDetails.dateOpened}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 mb-1">Conditional Offer</p>
                        <p className="text-sm text-white font-medium">{caseDetails.conditionalOfferDate}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 mb-1">Offer Expires</p>
                        <p className="text-sm text-red-400 font-medium">{caseDetails.conditionalOfferExpires}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 bg-slate-700/50 hover:bg-slate-700 rounded-lg transition-colors" title="Edit Case">
                      <Edit className="w-5 h-5 text-slate-300" />
                    </button>
                    <button className="p-2 bg-slate-700/50 hover:bg-slate-700 rounded-lg transition-colors" title="Share Case">
                      <Share2 className="w-5 h-5 text-slate-300" />
                    </button>
                  </div>
                </div>

                {/* Priority Notice */}
                {caseDetails.priority === 'high' && (
                  <div className="mb-6 bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                    <div className="flex items-center gap-2 text-red-400">
                      <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                      <span className="text-sm font-medium">{caseDetails.priorityReason}</span>
                    </div>
                  </div>
                )}

                {/* Investigation Stages */}
                <div>
                  <h4 className="text-sm font-semibold text-white mb-3">Investigation Stages</h4>
                  <div className="space-y-3">
                    {caseDetails.stages.map((stage, idx) => (
                      <div key={idx} className={`p-4 rounded-lg ${
                        stage.status === 'completed' ? 'bg-green-500/5 border border-green-500/20' :
                        stage.status === 'in_progress' ? 'bg-amber-500/5 border border-amber-500/20' :
                        stage.status === 'partial' ? 'bg-blue-500/5 border border-blue-500/20' :
                        stage.status === 'blocked' ? 'bg-red-500/5 border border-red-500/20' :
                        'bg-slate-900/40 border border-slate-700/30'
                      }`}>
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3">
                            <div className="mt-0.5">{getStageIcon(stage.status)}</div>
                            <div className="flex-1">
                              <p className="text-sm font-medium text-white">{stage.name}</p>
                              <p className="text-xs text-slate-400 mt-0.5">{stage.detail}</p>
                              {stage.subDetail && (
                                <p className="text-xs text-slate-500 mt-0.5">{stage.subDetail}</p>
                              )}
                              {stage.completedDate && (
                                <p className="text-xs text-green-400 mt-1">
                                  Completed {stage.completedDate} by {stage.completedBy}
                                </p>
                              )}
                              {stage.source && (
                                <p className="text-xs text-slate-500 mt-0.5">Source: {stage.source}</p>
                              )}
                              {stage.nextStep && (
                                <p className="text-xs text-amber-400 mt-1">Next: {stage.nextStep}</p>
                              )}
                              {stage.pendingItems && stage.pendingItems.length > 0 && (
                                <div className="mt-2 space-y-1">
                                  {stage.pendingItems.map((item, i) => (
                                    <p key={i} className="text-xs text-slate-400 flex items-start gap-1">
                                      <span className="text-slate-600">•</span> {item}
                                    </p>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                          <span className={`px-2 py-1 rounded text-xs font-medium whitespace-nowrap ${
                            stage.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                            stage.status === 'in_progress' ? 'bg-amber-500/20 text-amber-400' :
                            stage.status === 'partial' ? 'bg-blue-500/20 text-blue-400' :
                            stage.status === 'blocked' ? 'bg-red-500/20 text-red-400' :
                            'bg-slate-700/50 text-slate-400'
                          }`}>
                            {stage.status === 'completed' ? 'COMPLETED' :
                             stage.status === 'in_progress' ? 'IN PROGRESS' :
                             stage.status === 'partial' ? 'PARTIAL' :
                             stage.status === 'blocked' ? 'BLOCKED' :
                             'PENDING'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Quick Actions - Grouped */}
                <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-6">
                  <h4 className="text-sm font-semibold text-white mb-4">Quick Actions</h4>

                  {/* Documentation Actions */}
                  <div className="mb-4">
                    <p className="text-xs text-slate-500 uppercase tracking-wide mb-2">Documentation</p>
                    <div className="space-y-2">
                      <button className="w-full px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-2">
                        <Upload className="w-4 h-4" />
                        Upload Document
                      </button>
                      <button className="w-full px-4 py-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-2">
                        <Plus className="w-4 h-4" />
                        Add Investigator Note
                      </button>
                    </div>
                  </div>

                  {/* Investigation Actions */}
                  <div className="mb-4">
                    <p className="text-xs text-slate-500 uppercase tracking-wide mb-2">Investigation</p>
                    <div className="space-y-2">
                      <button className="w-full px-4 py-2 bg-green-500/10 hover:bg-green-500/20 text-green-400 rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Schedule Interview
                      </button>
                      <button className="w-full px-4 py-2 bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-2">
                        <Phone className="w-4 h-4" />
                        Log Contact Attempt
                      </button>
                    </div>
                  </div>

                  {/* Case Management Actions */}
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wide mb-2">Case Management</p>
                    <div className="space-y-2">
                      <button className="w-full px-4 py-2 bg-slate-700/50 hover:bg-slate-700 text-slate-300 rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-2">
                        <Flag className="w-4 h-4" />
                        Request Supervisor Review
                      </button>
                      <button className="w-full px-4 py-2 bg-slate-700/50 hover:bg-slate-700 text-slate-300 rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-2">
                        <Download className="w-4 h-4" />
                        Export Case File
                      </button>
                      <button className="w-full px-4 py-2 bg-slate-700/50 hover:bg-slate-700 text-slate-300 rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-2">
                        <Archive className="w-4 h-4" />
                        Close Case
                      </button>
                    </div>
                  </div>
                </div>

                {/* Assigned Investigator */}
                <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-6">
                  <h4 className="text-sm font-semibold text-white mb-4">Assigned Investigator</h4>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center font-bold text-white">MB</div>
                    <div>
                      <p className="text-sm font-medium text-white">{caseDetails.investigator.name}</p>
                      <p className="text-xs text-slate-400">Badge {caseDetails.investigator.badge}</p>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-slate-400">
                      <Mail className="w-4 h-4" />
                      <span>{caseDetails.investigator.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-400">
                      <Phone className="w-4 h-4" />
                      <span>{caseDetails.investigator.phone}</span>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-slate-700/50">
                    <div className="grid grid-cols-2 gap-3 text-center">
                      <div>
                        <p className="text-lg font-semibold text-white">{caseDetails.investigator.activeCases}</p>
                        <p className="text-xs text-slate-500">Active Cases</p>
                      </div>
                      <div>
                        <p className="text-lg font-semibold text-white">{caseDetails.investigator.avgTurnaround}</p>
                        <p className="text-xs text-slate-500">Avg Turnaround</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-slate-700/50">
                    <p className="text-xs text-slate-500 mb-1">Supervisor</p>
                    <p className="text-sm text-white">{caseDetails.supervisor.name} <span className="text-slate-500">{caseDetails.supervisor.badge}</span></p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl overflow-hidden">
              <div className="flex border-b border-slate-700/50 overflow-x-auto">
                <button
                  onClick={() => setSelectedTab('overview')}
                  className={`px-6 py-4 text-sm font-medium transition-all whitespace-nowrap ${selectedTab === 'overview' ? 'bg-amber-500/10 text-amber-400 border-b-2 border-amber-500' : 'text-slate-400 hover:text-white'}`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setSelectedTab('documents')}
                  className={`px-6 py-4 text-sm font-medium transition-all whitespace-nowrap ${selectedTab === 'documents' ? 'bg-amber-500/10 text-amber-400 border-b-2 border-amber-500' : 'text-slate-400 hover:text-white'}`}
                >
                  Documents ({caseDetails.documents.length})
                </button>
                <button
                  onClick={() => setSelectedTab('notes')}
                  className={`px-6 py-4 text-sm font-medium transition-all whitespace-nowrap ${selectedTab === 'notes' ? 'bg-amber-500/10 text-amber-400 border-b-2 border-amber-500' : 'text-slate-400 hover:text-white'}`}
                >
                  Investigator Notes ({caseDetails.notes.length})
                </button>
                <button
                  onClick={() => setSelectedTab('history')}
                  className={`px-6 py-4 text-sm font-medium transition-all whitespace-nowrap ${selectedTab === 'history' ? 'bg-amber-500/10 text-amber-400 border-b-2 border-amber-500' : 'text-slate-400 hover:text-white'}`}
                >
                  Activity History ({caseDetails.activityHistory.length})
                </button>
              </div>

              <div className="p-6">
                {/* Overview Tab */}
                {selectedTab === 'overview' && (
                  <div className="space-y-6">
                    {/* Applicant Information */}
                    <div>
                      <h5 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                        <User className="w-4 h-4 text-slate-400" />
                        Applicant Information
                      </h5>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-slate-900/40 rounded-lg p-4">
                        <div>
                          <p className="text-xs text-slate-500 mb-1">Full Name</p>
                          <p className="text-sm text-white">{caseDetails.subject}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500 mb-1">Position Applied</p>
                          <p className="text-sm text-white">{caseDetails.position}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500 mb-1">Department</p>
                          <p className="text-sm text-white">{caseDetails.department}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500 mb-1">Application Date</p>
                          <p className="text-sm text-white">{caseDetails.applicationDate}</p>
                        </div>
                      </div>
                    </div>

                    {/* Investigation Summary */}
                    <div>
                      <h5 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                        <FileCheck className="w-4 h-4 text-slate-400" />
                        Investigation Summary
                      </h5>
                      <div className="bg-slate-900/40 rounded-lg p-4">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div className="text-center">
                            <p className="text-2xl font-bold text-green-400">
                              {caseDetails.stages.filter(s => s.status === 'completed').length}
                            </p>
                            <p className="text-xs text-slate-500">Completed</p>
                          </div>
                          <div className="text-center">
                            <p className="text-2xl font-bold text-amber-400">
                              {caseDetails.stages.filter(s => s.status === 'in_progress' || s.status === 'partial').length}
                            </p>
                            <p className="text-xs text-slate-500">In Progress</p>
                          </div>
                          <div className="text-center">
                            <p className="text-2xl font-bold text-slate-400">
                              {caseDetails.stages.filter(s => s.status === 'pending').length}
                            </p>
                            <p className="text-xs text-slate-500">Pending</p>
                          </div>
                          <div className="text-center">
                            <p className="text-2xl font-bold text-white">{caseDetails.stages.length}</p>
                            <p className="text-xs text-slate-500">Total Stages</p>
                          </div>
                        </div>

                        {/* Key Findings */}
                        <div className="border-t border-slate-700/50 pt-4">
                          <p className="text-xs text-slate-500 uppercase tracking-wide mb-2">Key Findings</p>
                          <ul className="space-y-2 text-sm">
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                              <span className="text-slate-300">Criminal history clear - no hits in GCIC/FBI databases</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                              <span className="text-slate-300">Employment at current and previous employer verified</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <Clock className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                              <span className="text-slate-300">3 of 5 references completed - 2 pending contact</span>
                            </li>
                          </ul>
                        </div>

                        {/* Documented Concerns */}
                        {caseDetails.blockers && (
                          <div className="border-t border-slate-700/50 pt-4 mt-4">
                            <p className="text-xs text-slate-500 uppercase tracking-wide mb-2">Documented Concerns</p>
                            <div className="flex items-start gap-2 text-sm">
                              <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                              <span className="text-amber-400">{caseDetails.blockers}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Timeline Overview */}
                    <div>
                      <h5 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                        <Clock className="w-4 h-4 text-slate-400" />
                        Timeline Overview
                      </h5>
                      <div className="bg-slate-900/40 rounded-lg p-4">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div>
                            <p className="text-xs text-slate-500 mb-1">Case Opened</p>
                            <p className="text-sm text-white">{caseDetails.dateOpened}</p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-500 mb-1">Days Open</p>
                            <p className="text-sm text-white">{caseDetails.daysOpen} days</p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-500 mb-1">Conditional Offer Expires</p>
                            <p className="text-sm text-red-400 font-medium">{caseDetails.conditionalOfferExpires}</p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-500 mb-1">Days Remaining</p>
                            <p className="text-sm text-amber-400 font-medium">7 days</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Documents Tab */}
                {selectedTab === 'documents' && (
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-sm text-slate-400">{caseDetails.documents.length} documents on file</p>
                      <button className="px-3 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 rounded-lg text-xs font-medium transition-colors flex items-center gap-1">
                        <Upload className="w-3 h-3" />
                        Upload New
                      </button>
                    </div>
                    <div className="space-y-3">
                      {caseDetails.documents.map((doc, idx) => (
                        <div key={idx} className="flex items-center justify-between p-4 bg-slate-900/40 rounded-lg hover:bg-slate-900/60 transition-colors">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                              doc.status === 'verified' ? 'bg-green-500/10' : 'bg-amber-500/10'
                            }`}>
                              <FileText className={`w-5 h-5 ${doc.status === 'verified' ? 'text-green-400' : 'text-amber-400'}`} />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <p className="text-sm font-medium text-white">{doc.name}</p>
                                {doc.status === 'verified' && (
                                  <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
                                )}
                              </div>
                              <p className="text-xs text-slate-400">
                                {doc.type} • {doc.size} • Uploaded {doc.uploaded} by {doc.uploadedBy}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button className="px-3 py-1 bg-slate-700/50 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-medium transition-colors">
                              Download
                            </button>
                            <button className="px-3 py-1 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 rounded-lg text-xs font-medium transition-colors">
                              View
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Investigator Notes Tab */}
                {selectedTab === 'notes' && (
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-sm text-slate-400">{caseDetails.notes.length} investigator notes</p>
                      <button className="px-3 py-1.5 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded-lg text-xs font-medium transition-colors flex items-center gap-1">
                        <Plus className="w-3 h-3" />
                        Add Note
                      </button>
                    </div>
                    <div className="space-y-4">
                      {caseDetails.notes.map((note, idx) => (
                        <div key={idx} className="p-4 bg-slate-900/40 rounded-lg border-l-4 border-amber-500/50">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium text-white">{note.author}</span>
                              <span className="text-xs text-slate-500">{note.authorBadge}</span>
                              <span className="px-2 py-0.5 bg-slate-700/50 rounded text-xs text-slate-400">{note.category}</span>
                            </div>
                            <span className="text-xs text-slate-500">{note.date}</span>
                          </div>
                          <p className="text-sm text-slate-300">{note.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Activity History Tab */}
                {selectedTab === 'history' && (
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-sm text-slate-400">Complete audit trail for case {caseDetails.id}</p>
                      <button className="px-3 py-1.5 bg-slate-700/50 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-medium transition-colors flex items-center gap-1">
                        <Download className="w-3 h-3" />
                        Export Log
                      </button>
                    </div>
                    <div className="relative">
                      {/* Timeline line */}
                      <div className="absolute left-4 top-2 bottom-2 w-px bg-slate-700/50"></div>

                      <div className="space-y-4">
                        {caseDetails.activityHistory.map((activity, idx) => (
                          <div key={idx} className="flex gap-4 relative">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 z-10 ${
                              activity.action === 'Stage completed' ? 'bg-green-500/20' :
                              activity.action === 'Case opened' ? 'bg-amber-500/20' :
                              activity.action === 'Document uploaded' ? 'bg-blue-500/20' :
                              'bg-slate-700/50'
                            }`}>
                              {activity.action === 'Stage completed' && <CheckCircle2 className="w-4 h-4 text-green-400" />}
                              {activity.action === 'Case opened' && <FolderOpen className="w-4 h-4 text-amber-400" />}
                              {activity.action === 'Document uploaded' && <Upload className="w-4 h-4 text-blue-400" />}
                              {activity.action === 'Note added' && <FileText className="w-4 h-4 text-slate-400" />}
                              {activity.action === 'Stage updated' && <Clock className="w-4 h-4 text-amber-400" />}
                              {activity.action === 'Interview completed' && <Users className="w-4 h-4 text-purple-400" />}
                              {activity.action === 'Contact attempt' && <Phone className="w-4 h-4 text-slate-400" />}
                            </div>
                            <div className="flex-1 pb-4">
                              <div className="flex items-center justify-between">
                                <p className="text-sm font-medium text-white">{activity.action}</p>
                                <span className="text-xs text-slate-500">{activity.date}</span>
                              </div>
                              <p className="text-xs text-slate-400 mt-0.5">{activity.detail}</p>
                              <p className="text-xs text-slate-500 mt-0.5">by {activity.user}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Support & Resources Button */}
      <button
        onClick={() => setResourcesOpen(!resourcesOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110 z-40"
      >
        {resourcesOpen ? <X className="w-6 h-6 text-white" /> : <HelpCircle className="w-6 h-6 text-white" />}
      </button>

      {/* Support & Resources Panel */}
      {resourcesOpen && (
        <div className="fixed bottom-24 right-6 w-full max-w-96 bg-slate-900/95 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl flex flex-col z-40 mx-4 sm:mx-0">
          <div className="p-4 border-b border-slate-700/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">Support & Resources</h3>
                <p className="text-xs text-slate-400">Case management help</p>
              </div>
            </div>
          </div>
          <div className="p-4 space-y-4 max-h-96 overflow-y-auto">
            {/* Quick Links */}
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wide mb-2">Quick Links</p>
              <div className="space-y-2">
                <a href="#" className="flex items-center gap-2 p-2 bg-slate-800/40 hover:bg-slate-800/60 rounded-lg text-sm text-slate-300 transition-colors">
                  <BookOpen className="w-4 h-4 text-amber-400" />
                  BI Investigation Procedures Manual
                  <ExternalLink className="w-3 h-3 ml-auto text-slate-500" />
                </a>
                <a href="#" className="flex items-center gap-2 p-2 bg-slate-800/40 hover:bg-slate-800/60 rounded-lg text-sm text-slate-300 transition-colors">
                  <FileText className="w-4 h-4 text-amber-400" />
                  Document Requirements Checklist
                  <ExternalLink className="w-3 h-3 ml-auto text-slate-500" />
                </a>
                <a href="#" className="flex items-center gap-2 p-2 bg-slate-800/40 hover:bg-slate-800/60 rounded-lg text-sm text-slate-300 transition-colors">
                  <Clock className="w-4 h-4 text-amber-400" />
                  Timeline & Deadline Guidelines
                  <ExternalLink className="w-3 h-3 ml-auto text-slate-500" />
                </a>
              </div>
            </div>

            {/* Contact Support */}
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wide mb-2">Contact Support</p>
              <div className="space-y-2">
                <div className="p-3 bg-slate-800/40 rounded-lg">
                  <p className="text-sm text-white font-medium">BI Unit Supervisor</p>
                  <p className="text-xs text-slate-400 mt-1">For case reassignment or escalation</p>
                  <p className="text-xs text-amber-400 mt-1">Sgt. Patricia Chen • x2105</p>
                </div>
                <div className="p-3 bg-slate-800/40 rounded-lg">
                  <p className="text-sm text-white font-medium">IT Help Desk</p>
                  <p className="text-xs text-slate-400 mt-1">Technical issues with SentryOps</p>
                  <p className="text-xs text-amber-400 mt-1">x5000 • helpdesk@sheriff.gov</p>
                </div>
                <div className="p-3 bg-slate-800/40 rounded-lg">
                  <p className="text-sm text-white font-medium">HR Liaison</p>
                  <p className="text-xs text-slate-400 mt-1">Applicant status or offer questions</p>
                  <p className="text-xs text-amber-400 mt-1">Maria Santos • x3200</p>
                </div>
              </div>
            </div>

            {/* System Info */}
            <div className="pt-3 border-t border-slate-700/50">
              <p className="text-xs text-slate-500 text-center">SentryOps v2.4.1 • Case ID: {caseDetails.id}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

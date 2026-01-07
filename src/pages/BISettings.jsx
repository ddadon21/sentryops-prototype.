import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import {
  LayoutDashboard,
  FileText,
  TrendingUp,
  Settings,
  Bell,
  MessageCircle,
  ChevronRight,
  Shield,
  Sparkles,
  X,
  Send,
  Menu,
  ChevronLeft,
  LogOut,
  FolderOpen,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  UserCheck,
  FileCheck,
  DollarSign,
  Eye,
  EyeOff,
  User,
  Lock,
  Palette,
  Link,
  Mail,
  Moon,
  Sun,
  Save,
  Camera,
  Database,
  Key,
  Zap,
  Activity,
  CheckCircle2,
  Smartphone,
  RefreshCw
} from 'lucide-react';

export default function BISettings() {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState('settings');
  const [chatOpen, setChatOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [logoutConfirmOpen, setLogoutConfirmOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('profile');
  const [showApiKey, setShowApiKey] = useState({});
  const [saveSuccess, setSaveSuccess] = useState(false);

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
    { id: 'bi-reports', label: 'BI Reports', icon: LayoutDashboard, page: 'BIReports' },
    { id: 'case-closure', label: 'Case Closure', icon: XCircle, page: 'CaseClosure' },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const settingsTabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'display', label: 'Display', icon: Palette },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'integrations', label: 'BI Integrations', icon: Link }
  ];

  const notifications = [
    { id: 1, title: 'Profile Updated', message: 'Your profile information was saved', time: '15 min ago', urgent: false },
    { id: 2, title: 'NCIC Synced', message: 'Criminal records sync completed', time: '1 hour ago', urgent: false },
    { id: 3, title: 'Password Expiring', message: 'Your password expires in 14 days', time: '2 hours ago', urgent: true }
  ];

  const [profileSettings, setProfileSettings] = useState({
    fullName: 'Michael Brooks',
    email: 'michael.brooks@gwinnettcounty.gov',
    employeeId: 'BI-0042',
    phone: '(770) 619-6545',
    department: 'Background Investigations',
    position: 'Lead Investigator',
    division: 'Sheriff Administration',
    hireDate: '2018-06-15',
    certifications: 'CFE, CPBI, POST Certified'
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: true,
    pushNotifications: true,
    caseAssignments: true,
    caseStatusUpdates: true,
    interviewReminders: true,
    deadlineAlerts: true,
    referenceResponses: true,
    criminalRecordAlerts: true,
    financialAlerts: true,
    supervisorReviewRequired: true,
    systemUpdates: false
  });

  const [displaySettings, setDisplaySettings] = useState({
    theme: 'dark',
    sidebarCollapsed: false,
    dateFormat: 'MM/DD/YYYY',
    timeFormat: '12h',
    language: 'en',
    timezone: 'America/New_York',
    density: 'comfortable',
    animations: true
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: true,
    sessionTimeout: '30',
    loginNotifications: true,
    passwordExpiry: '90',
    auditLogging: true
  });

  const [integrations] = useState({
    ncic: {
      name: 'NCIC/GCIC',
      vendor: 'FBI/GBI',
      type: 'Criminal Records',
      status: 'connected',
      version: 'v2024.1',
      endpoint: 'https://ncic.fbi.gov/gcic-gateway',
      apiKey: 'ncic_live_8K2L3M4N5P6Q7R8S',
      lastSync: '5 min ago',
      syncFrequency: 'Real-time',
      dataTypes: ['Criminal History', 'Warrants', 'Stolen Property', 'Missing Persons'],
      monthlyRequests: 45678,
      requestLimit: 100000,
      uptime: 99.98,
      description: 'National Crime Information Center for criminal history checks'
    },
    experian: {
      name: 'Experian Credit',
      vendor: 'Experian',
      type: 'Financial Background',
      status: 'connected',
      version: 'v3.2.1',
      endpoint: 'https://api.experian.com/credit/v3',
      apiKey: 'exp_live_1L2M3N4P5Q6R7S8T',
      lastSync: '15 min ago',
      syncFrequency: 'On-demand',
      dataTypes: ['Credit Reports', 'Credit Scores', 'Public Records', 'Inquiries'],
      monthlyRequests: 12345,
      requestLimit: 50000,
      uptime: 99.95,
      description: 'Consumer credit reports and financial background checks'
    },
    everify: {
      name: 'E-Verify',
      vendor: 'USCIS/DHS',
      type: 'Employment Verification',
      status: 'connected',
      version: 'v2.8.0',
      endpoint: 'https://everify.uscis.gov/api/v2',
      apiKey: 'ever_live_3N4P5Q6R7S8T9U1V',
      lastSync: '1 hour ago',
      syncFrequency: 'On-demand',
      dataTypes: ['Employment Eligibility', 'SSN Verification', 'Work Authorization'],
      monthlyRequests: 8901,
      requestLimit: 25000,
      uptime: 99.90,
      description: 'Employment eligibility and work authorization verification'
    },
    workNumber: {
      name: 'The Work Number',
      vendor: 'Equifax',
      type: 'Employment History',
      status: 'connected',
      version: 'v4.1.0',
      endpoint: 'https://api.theworknumber.com/v4',
      apiKey: 'twn_live_4P5Q6R7S8T9U1V2W',
      lastSync: '30 min ago',
      syncFrequency: 'On-demand',
      dataTypes: ['Employment History', 'Income Verification', 'Employer Contacts'],
      monthlyRequests: 15678,
      requestLimit: 40000,
      uptime: 99.92,
      description: 'Employment history and income verification database'
    },
    socialSearch: {
      name: 'Social Intelligence',
      vendor: 'Fama Technologies',
      type: 'Social Media Analysis',
      status: 'connected',
      version: 'v2.5.3',
      endpoint: 'https://api.fama.io/v2/screening',
      apiKey: 'fama_live_5Q6R7S8T9U1V2W3X',
      lastSync: '2 hours ago',
      syncFrequency: 'On-demand',
      dataTypes: ['Social Media Profiles', 'Public Content', 'Risk Indicators'],
      monthlyRequests: 3456,
      requestLimit: 10000,
      uptime: 99.88,
      description: 'AI-powered social media screening and analysis'
    }
  });

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

  const handleSave = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const toggleApiKeyVisibility = (key) => {
    setShowApiKey(prev => ({ ...prev, [key]: !prev[key] }));
  };

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
              <div className="flex items-center gap-2 text-sm">
                <button
                  onClick={() => navigate(createPageUrl('BackgroundsDashboard'))}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  BI Dashboard
                </button>
                <ChevronRight className="w-4 h-4 text-slate-600" />
                <span className="text-white">Settings</span>
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
                  <span className="text-white text-sm font-bold">MB</span>
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-white">{profileSettings.fullName}</p>
                  <p className="text-xs text-slate-400">{profileSettings.department}</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <div className="max-w-6xl mx-auto">
            <div className="mb-6">
              <h2 className="text-2xl lg:text-3xl font-bold text-white mb-2">BI Settings</h2>
              <p className="text-slate-400">Manage your account, notifications, and investigation system integrations</p>
            </div>

            {/* Save Success Banner */}
            {saveSuccess && (
              <div className="mb-6 bg-green-500/20 border border-green-500/30 rounded-xl p-4 flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-400" />
                <span className="text-green-400 font-medium">Settings saved successfully</span>
              </div>
            )}

            {/* System Status Banner */}
            <div className="mb-6 bg-gradient-to-r from-green-500/10 to-emerald-500/5 border border-green-500/20 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 text-green-400" />
                  </div>
                  <div>
                    <h4 className="text-base font-semibold text-white">All Investigation Systems Operational</h4>
                    <p className="text-sm text-slate-300">5 integrations active • 99.93% average uptime • Last sync: 5 min ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-lg">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm font-semibold text-green-400 uppercase">Live</span>
                </div>
              </div>
            </div>

            {/* Role Badge */}
            <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 bg-purple-500/20 border border-purple-500/30 rounded-xl">
              <Shield className="w-4 h-4 text-purple-400" />
              <span className="text-sm font-semibold text-purple-400 uppercase">Background Investigations Access Level</span>
            </div>

            {/* Settings Navigation Tabs */}
            <div className="mb-6 flex gap-2 border-b border-slate-700/50 overflow-x-auto">
              {settingsTabs.map(tab => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveSection(tab.id)}
                    className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-all relative whitespace-nowrap ${
                      activeSection === tab.id ? 'text-purple-400' : 'text-slate-400 hover:text-slate-300'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                    {activeSection === tab.id && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-500"></div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Settings Content */}
            <div className="space-y-6">
              {/* Profile Settings */}
              {activeSection === 'profile' && (
                <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-white">Profile Information</h3>
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/20 border border-green-500/30 rounded-lg">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-xs font-medium text-green-400">Verified Account</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 mb-8">
                    <div className="relative">
                      <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-2xl font-bold">MB</span>
                      </div>
                      <button className="absolute bottom-0 right-0 w-8 h-8 bg-purple-500 hover:bg-purple-400 rounded-full flex items-center justify-center transition-colors">
                        <Camera className="w-4 h-4 text-white" />
                      </button>
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-white">{profileSettings.fullName}</h4>
                      <p className="text-slate-400">{profileSettings.position}</p>
                      <p className="text-sm text-slate-500">{profileSettings.department}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Full Name</label>
                      <input
                        type="text"
                        value={profileSettings.fullName}
                        onChange={(e) => setProfileSettings({...profileSettings, fullName: e.target.value})}
                        className="w-full px-4 py-2.5 bg-slate-800/40 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/50 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
                      <input
                        type="email"
                        value={profileSettings.email}
                        onChange={(e) => setProfileSettings({...profileSettings, email: e.target.value})}
                        className="w-full px-4 py-2.5 bg-slate-800/40 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/50 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Employee ID</label>
                      <input
                        type="text"
                        value={profileSettings.employeeId}
                        disabled
                        className="w-full px-4 py-2.5 bg-slate-800/20 border border-slate-700/50 rounded-xl text-slate-400 cursor-not-allowed"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Phone Number</label>
                      <input
                        type="tel"
                        value={profileSettings.phone}
                        onChange={(e) => setProfileSettings({...profileSettings, phone: e.target.value})}
                        className="w-full px-4 py-2.5 bg-slate-800/40 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/50 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Department</label>
                      <input
                        type="text"
                        value={profileSettings.department}
                        disabled
                        className="w-full px-4 py-2.5 bg-slate-800/20 border border-slate-700/50 rounded-xl text-slate-400 cursor-not-allowed"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Position</label>
                      <input
                        type="text"
                        value={profileSettings.position}
                        disabled
                        className="w-full px-4 py-2.5 bg-slate-800/20 border border-slate-700/50 rounded-xl text-slate-400 cursor-not-allowed"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Hire Date</label>
                      <input
                        type="text"
                        value={new Date(profileSettings.hireDate).toLocaleDateString()}
                        disabled
                        className="w-full px-4 py-2.5 bg-slate-800/20 border border-slate-700/50 rounded-xl text-slate-400 cursor-not-allowed"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-slate-300 mb-2">Certifications</label>
                      <input
                        type="text"
                        value={profileSettings.certifications}
                        onChange={(e) => setProfileSettings({...profileSettings, certifications: e.target.value})}
                        className="w-full px-4 py-2.5 bg-slate-800/40 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/50 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end">
                    <button
                      onClick={handleSave}
                      className="flex items-center gap-2 px-6 py-2.5 bg-purple-500 hover:bg-purple-400 rounded-xl text-white font-medium transition-all"
                    >
                      <Save className="w-4 h-4" />
                      Save Changes
                    </button>
                  </div>
                </div>
              )}

              {/* Notification Settings */}
              {activeSection === 'notifications' && (
                <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-6">Notification Preferences</h3>

                  <div className="space-y-6">
                    <div>
                      <h4 className="text-sm font-semibold text-slate-300 mb-4 uppercase tracking-wide">Delivery Methods</h4>
                      <div className="space-y-4">
                        {[
                          { key: 'emailNotifications', label: 'Email Notifications', desc: 'Receive notifications via email', icon: Mail },
                          { key: 'smsNotifications', label: 'SMS Notifications', desc: 'Receive urgent alerts via text', icon: Smartphone },
                          { key: 'pushNotifications', label: 'Push Notifications', desc: 'Browser and mobile push alerts', icon: Bell }
                        ].map(item => {
                          const Icon = item.icon;
                          return (
                            <div key={item.key} className="flex items-center justify-between p-4 bg-slate-800/40 border border-slate-700/50 rounded-xl">
                              <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-slate-700/50 rounded-xl flex items-center justify-center">
                                  <Icon className="w-5 h-5 text-slate-400" />
                                </div>
                                <div>
                                  <p className="text-white font-medium">{item.label}</p>
                                  <p className="text-sm text-slate-400">{item.desc}</p>
                                </div>
                              </div>
                              <button
                                onClick={() => setNotificationSettings({...notificationSettings, [item.key]: !notificationSettings[item.key]})}
                                className={`w-12 h-6 rounded-full transition-colors ${notificationSettings[item.key] ? 'bg-purple-500' : 'bg-slate-600'}`}
                              >
                                <div className={`w-5 h-5 bg-white rounded-full transition-transform ${notificationSettings[item.key] ? 'translate-x-6' : 'translate-x-0.5'}`}></div>
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-slate-300 mb-4 uppercase tracking-wide">Investigation Alert Types</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                          { key: 'caseAssignments', label: 'Case Assignments', desc: 'New case notifications' },
                          { key: 'caseStatusUpdates', label: 'Case Status Updates', desc: 'Progress and status changes' },
                          { key: 'interviewReminders', label: 'Interview Reminders', desc: 'Scheduled interview alerts' },
                          { key: 'deadlineAlerts', label: 'Deadline Alerts', desc: 'Case deadline notifications' },
                          { key: 'referenceResponses', label: 'Reference Responses', desc: 'New reference check responses' },
                          { key: 'criminalRecordAlerts', label: 'Criminal Record Alerts', desc: 'NCIC/GCIC hit notifications' },
                          { key: 'financialAlerts', label: 'Financial Alerts', desc: 'Credit check notifications' },
                          { key: 'supervisorReviewRequired', label: 'Supervisor Review', desc: 'Cases needing approval' }
                        ].map(item => (
                          <div key={item.key} className="flex items-center justify-between p-4 bg-slate-800/40 border border-slate-700/50 rounded-xl">
                            <div>
                              <p className="text-white font-medium">{item.label}</p>
                              <p className="text-xs text-slate-400">{item.desc}</p>
                            </div>
                            <button
                              onClick={() => setNotificationSettings({...notificationSettings, [item.key]: !notificationSettings[item.key]})}
                              className={`w-12 h-6 rounded-full transition-colors ${notificationSettings[item.key] ? 'bg-purple-500' : 'bg-slate-600'}`}
                            >
                              <div className={`w-5 h-5 bg-white rounded-full transition-transform ${notificationSettings[item.key] ? 'translate-x-6' : 'translate-x-0.5'}`}></div>
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end">
                    <button
                      onClick={handleSave}
                      className="flex items-center gap-2 px-6 py-2.5 bg-purple-500 hover:bg-purple-400 rounded-xl text-white font-medium transition-all"
                    >
                      <Save className="w-4 h-4" />
                      Save Preferences
                    </button>
                  </div>
                </div>
              )}

              {/* Display Settings */}
              {activeSection === 'display' && (
                <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-6">Display & Appearance</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-3">Theme</label>
                      <div className="flex gap-3">
                        <button
                          onClick={() => setDisplaySettings({...displaySettings, theme: 'dark'})}
                          className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border transition-all ${
                            displaySettings.theme === 'dark' ? 'bg-purple-500/20 border-purple-500/50 text-purple-400' : 'bg-slate-800/40 border-slate-700/50 text-slate-400'
                          }`}
                        >
                          <Moon className="w-5 h-5" />
                          Dark
                        </button>
                        <button
                          onClick={() => setDisplaySettings({...displaySettings, theme: 'light'})}
                          className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border transition-all ${
                            displaySettings.theme === 'light' ? 'bg-purple-500/20 border-purple-500/50 text-purple-400' : 'bg-slate-800/40 border-slate-700/50 text-slate-400'
                          }`}
                        >
                          <Sun className="w-5 h-5" />
                          Light
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-3">Date Format</label>
                      <select
                        value={displaySettings.dateFormat}
                        onChange={(e) => setDisplaySettings({...displaySettings, dateFormat: e.target.value})}
                        className="w-full px-4 py-2.5 bg-slate-800/40 border border-slate-700/50 rounded-xl text-white focus:outline-none focus:border-purple-500/50"
                      >
                        <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                        <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                        <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-3">Time Format</label>
                      <select
                        value={displaySettings.timeFormat}
                        onChange={(e) => setDisplaySettings({...displaySettings, timeFormat: e.target.value})}
                        className="w-full px-4 py-2.5 bg-slate-800/40 border border-slate-700/50 rounded-xl text-white focus:outline-none focus:border-purple-500/50"
                      >
                        <option value="12h">12-hour</option>
                        <option value="24h">24-hour</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-3">Timezone</label>
                      <select
                        value={displaySettings.timezone}
                        onChange={(e) => setDisplaySettings({...displaySettings, timezone: e.target.value})}
                        className="w-full px-4 py-2.5 bg-slate-800/40 border border-slate-700/50 rounded-xl text-white focus:outline-none focus:border-purple-500/50"
                      >
                        <option value="America/New_York">Eastern Time (ET)</option>
                        <option value="America/Chicago">Central Time (CT)</option>
                        <option value="America/Denver">Mountain Time (MT)</option>
                        <option value="America/Los_Angeles">Pacific Time (PT)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-3">Display Density</label>
                      <select
                        value={displaySettings.density}
                        onChange={(e) => setDisplaySettings({...displaySettings, density: e.target.value})}
                        className="w-full px-4 py-2.5 bg-slate-800/40 border border-slate-700/50 rounded-xl text-white focus:outline-none focus:border-purple-500/50"
                      >
                        <option value="compact">Compact</option>
                        <option value="comfortable">Comfortable</option>
                        <option value="spacious">Spacious</option>
                      </select>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-slate-800/40 border border-slate-700/50 rounded-xl">
                      <div>
                        <p className="text-white font-medium">Animations</p>
                        <p className="text-sm text-slate-400">Enable UI animations</p>
                      </div>
                      <button
                        onClick={() => setDisplaySettings({...displaySettings, animations: !displaySettings.animations})}
                        className={`w-12 h-6 rounded-full transition-colors ${displaySettings.animations ? 'bg-purple-500' : 'bg-slate-600'}`}
                      >
                        <div className={`w-5 h-5 bg-white rounded-full transition-transform ${displaySettings.animations ? 'translate-x-6' : 'translate-x-0.5'}`}></div>
                      </button>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end">
                    <button
                      onClick={handleSave}
                      className="flex items-center gap-2 px-6 py-2.5 bg-purple-500 hover:bg-purple-400 rounded-xl text-white font-medium transition-all"
                    >
                      <Save className="w-4 h-4" />
                      Save Display Settings
                    </button>
                  </div>
                </div>
              )}

              {/* Security Settings */}
              {activeSection === 'security' && (
                <div className="space-y-6">
                  <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-6">Security Settings</h3>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-slate-800/40 border border-slate-700/50 rounded-xl">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center">
                            <Lock className="w-5 h-5 text-green-400" />
                          </div>
                          <div>
                            <p className="text-white font-medium">Two-Factor Authentication</p>
                            <p className="text-sm text-slate-400">Add an extra layer of security</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          {securitySettings.twoFactorAuth && (
                            <span className="px-2 py-1 bg-green-500/20 border border-green-500/30 rounded text-xs text-green-400 font-medium">Enabled</span>
                          )}
                          <button
                            onClick={() => setSecuritySettings({...securitySettings, twoFactorAuth: !securitySettings.twoFactorAuth})}
                            className={`w-12 h-6 rounded-full transition-colors ${securitySettings.twoFactorAuth ? 'bg-green-500' : 'bg-slate-600'}`}
                          >
                            <div className={`w-5 h-5 bg-white rounded-full transition-transform ${securitySettings.twoFactorAuth ? 'translate-x-6' : 'translate-x-0.5'}`}></div>
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-slate-800/40 border border-slate-700/50 rounded-xl">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-slate-700/50 rounded-xl flex items-center justify-center">
                            <Clock className="w-5 h-5 text-slate-400" />
                          </div>
                          <div>
                            <p className="text-white font-medium">Session Timeout</p>
                            <p className="text-sm text-slate-400">Auto-logout after inactivity</p>
                          </div>
                        </div>
                        <select
                          value={securitySettings.sessionTimeout}
                          onChange={(e) => setSecuritySettings({...securitySettings, sessionTimeout: e.target.value})}
                          className="px-4 py-2 bg-slate-800/40 border border-slate-700/50 rounded-xl text-white focus:outline-none focus:border-purple-500/50"
                        >
                          <option value="15">15 minutes</option>
                          <option value="30">30 minutes</option>
                          <option value="60">1 hour</option>
                          <option value="120">2 hours</option>
                        </select>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-slate-800/40 border border-slate-700/50 rounded-xl">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-slate-700/50 rounded-xl flex items-center justify-center">
                            <Bell className="w-5 h-5 text-slate-400" />
                          </div>
                          <div>
                            <p className="text-white font-medium">Login Notifications</p>
                            <p className="text-sm text-slate-400">Get alerted for new sign-ins</p>
                          </div>
                        </div>
                        <button
                          onClick={() => setSecuritySettings({...securitySettings, loginNotifications: !securitySettings.loginNotifications})}
                          className={`w-12 h-6 rounded-full transition-colors ${securitySettings.loginNotifications ? 'bg-purple-500' : 'bg-slate-600'}`}
                        >
                          <div className={`w-5 h-5 bg-white rounded-full transition-transform ${securitySettings.loginNotifications ? 'translate-x-6' : 'translate-x-0.5'}`}></div>
                        </button>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-slate-800/40 border border-slate-700/50 rounded-xl">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-slate-700/50 rounded-xl flex items-center justify-center">
                            <Activity className="w-5 h-5 text-slate-400" />
                          </div>
                          <div>
                            <p className="text-white font-medium">Audit Logging</p>
                            <p className="text-sm text-slate-400">Track all account activity</p>
                          </div>
                        </div>
                        <button
                          onClick={() => setSecuritySettings({...securitySettings, auditLogging: !securitySettings.auditLogging})}
                          className={`w-12 h-6 rounded-full transition-colors ${securitySettings.auditLogging ? 'bg-purple-500' : 'bg-slate-600'}`}
                        >
                          <div className={`w-5 h-5 bg-white rounded-full transition-transform ${securitySettings.auditLogging ? 'translate-x-6' : 'translate-x-0.5'}`}></div>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Change Password</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Current Password</label>
                        <input
                          type="password"
                          placeholder="••••••••"
                          className="w-full px-4 py-2.5 bg-slate-800/40 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/50"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">New Password</label>
                        <input
                          type="password"
                          placeholder="••••••••"
                          className="w-full px-4 py-2.5 bg-slate-800/40 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/50"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Confirm Password</label>
                        <input
                          type="password"
                          placeholder="••••••••"
                          className="w-full px-4 py-2.5 bg-slate-800/40 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/50"
                        />
                      </div>
                    </div>
                    <div className="mt-4 flex justify-end">
                      <button className="flex items-center gap-2 px-6 py-2.5 bg-purple-500 hover:bg-purple-400 rounded-xl text-white font-medium transition-all">
                        <Key className="w-4 h-4" />
                        Update Password
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Integrations */}
              {activeSection === 'integrations' && (
                <div className="space-y-6">
                  <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h3 className="text-lg font-semibold text-white">Background Investigation Integrations</h3>
                        <p className="text-sm text-slate-400">Connected systems and data sources for investigations</p>
                      </div>
                      <button className="flex items-center gap-2 px-4 py-2 bg-slate-700/50 hover:bg-slate-700/70 border border-slate-600/50 rounded-xl text-slate-300 transition-all">
                        <RefreshCw className="w-4 h-4" />
                        Sync All
                      </button>
                    </div>

                    <div className="space-y-4">
                      {Object.entries(integrations).map(([key, integration]) => (
                        <div key={key} className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-5">
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-4">
                              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                                integration.status === 'connected' ? 'bg-green-500/20' : 'bg-slate-700/50'
                              }`}>
                                <Database className={`w-6 h-6 ${
                                  integration.status === 'connected' ? 'text-green-400' : 'text-slate-400'
                                }`} />
                              </div>
                              <div>
                                <div className="flex items-center gap-3 mb-1">
                                  <h4 className="text-white font-semibold">{integration.name}</h4>
                                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                                    integration.status === 'connected' ? 'bg-green-500/20 text-green-400' : 'bg-slate-600/50 text-slate-400'
                                  }`}>
                                    {integration.status === 'connected' ? 'Connected' : 'Disconnected'}
                                  </span>
                                </div>
                                <p className="text-sm text-slate-400 mb-2">{integration.vendor} • {integration.type}</p>
                                <p className="text-xs text-slate-500">{integration.description}</p>

                                <div className="flex items-center gap-4 mt-3 text-xs text-slate-400">
                                  <span className="flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    Last sync: {integration.lastSync}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Activity className="w-3 h-3" />
                                    {integration.uptime}% uptime
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Zap className="w-3 h-3" />
                                    {integration.syncFrequency}
                                  </span>
                                </div>

                                <div className="flex flex-wrap gap-2 mt-3">
                                  {integration.dataTypes.map((type, idx) => (
                                    <span key={idx} className="px-2 py-1 bg-slate-700/50 rounded text-xs text-slate-300">
                                      {type}
                                    </span>
                                  ))}
                                </div>

                                <div className="mt-4 flex items-center gap-2">
                                  <span className="text-xs text-slate-500">API Key:</span>
                                  <code className="px-2 py-1 bg-slate-900/50 rounded text-xs text-slate-400 font-mono">
                                    {showApiKey[key] ? integration.apiKey : '••••••••••••••••'}
                                  </code>
                                  <button
                                    onClick={() => toggleApiKeyVisibility(key)}
                                    className="p-1 hover:bg-slate-700/50 rounded transition-colors"
                                  >
                                    {showApiKey[key] ? (
                                      <EyeOff className="w-3 h-3 text-slate-400" />
                                    ) : (
                                      <Eye className="w-3 h-3 text-slate-400" />
                                    )}
                                  </button>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <div className="text-right mr-4">
                                <p className="text-xs text-slate-400">Monthly Requests</p>
                                <p className="text-sm text-white font-medium">
                                  {integration.monthlyRequests.toLocaleString()} / {integration.requestLimit.toLocaleString()}
                                </p>
                                <div className="w-24 h-1.5 bg-slate-700 rounded-full mt-1">
                                  <div
                                    className="h-full bg-purple-500 rounded-full"
                                    style={{ width: `${(integration.monthlyRequests / integration.requestLimit) * 100}%` }}
                                  ></div>
                                </div>
                              </div>
                              <button className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors">
                                <Settings className="w-4 h-4 text-slate-400" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* AI Chat */}
      <button
        onClick={() => setChatOpen(!chatOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-400 hover:to-purple-500 rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110 z-40"
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
                <h3 className="text-sm font-semibold text-white">BI Settings Assistant</h3>
                <p className="text-xs text-green-400">Online</p>
              </div>
            </div>
          </div>
          <div className="flex-1 p-4 overflow-y-auto">
            <div className="flex gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <div className="bg-slate-800/60 p-3 rounded-xl">
                  <p className="text-sm text-slate-200">Hi! I can help you configure your BI settings, manage database integrations, set up notifications, and troubleshoot connectivity issues. What do you need help with?</p>
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 border-t border-slate-700/50">
            <div className="flex items-center gap-2">
              <input type="text" placeholder="Ask about settings..." className="flex-1 px-4 py-2 bg-slate-800/40 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/50" />
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

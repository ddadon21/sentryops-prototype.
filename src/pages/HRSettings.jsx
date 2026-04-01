import React, { useState, useEffect } from 'react';
import { Users, FileText, LayoutDashboard, TrendingUp, Settings, Bell, MessageCircle, ChevronRight, CheckCircle, Shield, Sparkles, X, Send, Menu, ChevronLeft, LogOut, UserPlus, Briefcase, Clock, Award, Calendar, User, Lock, Palette, Globe, Mail, Moon, Sun, Save, Camera, Database, Key, Cloud, Zap, Activity, CheckCircle2, ClipboardCheck, GraduationCap, FileCheck, Eye, EyeOff, Smartphone, Link, RefreshCw, AlertTriangle, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function HRSettings() {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState('settings');
  const [chatOpen, setChatOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [logoutConfirmOpen, setLogoutConfirmOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('profile');
  const [showApiKey, setShowApiKey] = useState({});
  const [saveSuccess, setSaveSuccess] = useState(false);

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
    { id: 'hr-dashboard', label: 'HR Dashboard', icon: Users, page: 'HRDashboard' },
    { id: 'job-postings', label: 'Job Postings', icon: Briefcase, page: 'JobPostings' },
    { id: 'applicant-tracking', label: 'Applicant Tracking', icon: UserPlus, page: 'ApplicantTracking' },
    { id: 'hiring-pipeline', label: 'Hiring Pipeline', icon: TrendingUp, page: 'HiringPipeline' },
    { id: 'compliance', label: 'HR Compliance', icon: ClipboardCheck, page: 'ComplianceManagement' },
    { id: 'onboarding', label: 'New Hire Onboarding', icon: FileCheck, page: 'NewHireOnboarding' },
    { id: 'training-certifications', label: 'Training & Certifications', icon: GraduationCap, page: 'TrainingCertifications' },
    { id: 'employee-records', label: 'Employee Records', icon: FileText, page: 'EmployeeRecords' },
    { id: 'time-off', label: 'Time Off Management', icon: Calendar, page: 'TimeOffManagement' },
    { id: 'performance', label: 'Performance Reviews', icon: Award, page: 'PerformanceReviews' },
    { id: 'hr-reports', label: 'HR Reports', icon: LayoutDashboard, page: 'HRReports' },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const settingsTabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'display', label: 'Display', icon: Palette },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'integrations', label: 'HR Integrations', icon: Link }
  ];

  const notifications = [
    { id: 1, title: 'Profile Updated', message: 'Your profile information was saved', time: '15 min ago', urgent: false },
    { id: 2, title: 'NeoGov Synced', message: 'Applicant data sync completed', time: '1 hour ago', urgent: false },
    { id: 3, title: 'Password Expiring', message: 'Your password expires in 14 days', time: '2 hours ago', urgent: true }
  ];

  const [profileSettings, setProfileSettings] = useState({
    fullName: 'Patricia Henderson',
    email: 'patricia.henderson@gwinnettcounty.gov',
    employeeId: 'HR-0015',
    phone: '(770) 619-6520',
    department: 'Human Resources',
    position: 'HR Director',
    division: 'Sheriff Administration',
    hireDate: '2015-03-20',
    certifications: 'PHR, SHRM-CP'
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    applicantAlerts: true,
    hiringPipelineUpdates: true,
    onboardingReminders: true,
    complianceAlerts: true,
    certificationExpiry: true,
    performanceReviewDue: true,
    timeOffRequests: true,
    policyUpdates: true,
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
    neoGov: {
      name: 'NeoGov',
      vendor: 'NEOGOV',
      type: 'Recruiting & Onboarding',
      status: 'connected',
      version: 'v2024.1',
      endpoint: 'https://api.neogov.com/gwinnett/v2',
      apiKey: 'ng_live_9K1L2M3N4P5Q6R7S',
      lastSync: '15 min ago',
      syncFrequency: 'Every 30 minutes',
      dataTypes: ['Applicants', 'Job Postings', 'Onboarding', 'Background Checks'],
      monthlyRequests: 67890,
      requestLimit: 150000,
      uptime: 99.93,
      description: 'Recruiting, applicant tracking, and onboarding platform'
    },
    sapHR: {
      name: 'SAP HR/Payroll',
      vendor: 'SAP',
      type: 'HRIS & Payroll',
      status: 'connected',
      version: 'S/4HANA 2023',
      endpoint: 'https://sap.gwinnettcounty.gov/api/hr/v2',
      apiKey: 'sap_hr_1L2M3N4P5Q6R7S8T',
      lastSync: '10 min ago',
      syncFrequency: 'Every 15 minutes',
      dataTypes: ['Employee Records', 'Payroll', 'Benefits', 'Time & Attendance'],
      monthlyRequests: 234567,
      requestLimit: 500000,
      uptime: 99.97,
      description: 'Core HR, payroll processing, and benefits administration'
    },
    gaPOST: {
      name: 'GA POST Certification',
      vendor: 'Georgia POST',
      type: 'Training & Compliance',
      status: 'connected',
      version: 'v3.1.5',
      endpoint: 'https://post.ga.gov/api/certifications',
      apiKey: 'post_live_3N4P5Q6R7S8T9U1V',
      lastSync: '1 hour ago',
      syncFrequency: 'Daily',
      dataTypes: ['Certifications', 'Training Hours', 'Compliance Status'],
      monthlyRequests: 12456,
      requestLimit: 50000,
      uptime: 99.85,
      description: 'Peace Officer certification tracking and compliance'
    },
    powerDMS: {
      name: 'PowerDMS',
      vendor: 'NEOGOV',
      type: 'Policy Management',
      status: 'connected',
      version: 'v5.2.1',
      endpoint: 'https://powerdms.gwinnettcounty.gov/api/v1',
      apiKey: 'pdms_live_4P5Q6R7S8T9U1V2W',
      lastSync: '30 min ago',
      syncFrequency: 'Every hour',
      dataTypes: ['Policies', 'Acknowledgments', 'Training Records'],
      monthlyRequests: 45678,
      requestLimit: 100000,
      uptime: 99.91,
      description: 'Policy distribution and compliance tracking'
    },
    gcWorkplace: {
      name: 'GC Workplace',
      vendor: 'Gwinnett County IT',
      type: 'Employee Portal',
      status: 'connected',
      version: 'v3.5.2',
      endpoint: 'https://gcworkplace.gwinnettcounty.gov/api',
      apiKey: 'gcw_live_2M3N4P5Q6R7S8T9U',
      lastSync: '5 min ago',
      syncFrequency: 'Every 10 minutes',
      dataTypes: ['Employee Resources', 'Forms', 'Benefits Info'],
      monthlyRequests: 89012,
      requestLimit: 200000,
      uptime: 99.95,
      description: 'Internal employee portal and self-service'
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
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-slate-100/80 to-slate-100 dark:bg-gradient-to-br dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 flex">
      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 border-r border-slate-200/70 dark:border-slate-800/50 backdrop-blur-xl bg-white/95 dark:bg-slate-900/30 shadow-[2px_0_20px_rgba(0,0,0,0.04)] dark:shadow-none flex flex-col transform transition-all lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} ${sidebarCollapsed ? 'w-20' : 'w-64'}`}>
        <div className="p-4 border-b border-border flex items-center justify-between">
          {!sidebarCollapsed && (
            <div className="flex items-center gap-2">
              <Shield className="w-8 h-8 text-amber-500" />
              <h1 className="text-xl font-bold text-primary">SentryOps</h1>
            </div>
          )}
          {sidebarCollapsed && (
            <Shield className="w-8 h-8 text-amber-500 mx-auto" />
          )}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-100 dark:hover:bg-slate-800/50 rounded-lg transition-colors hidden lg:block"
          >
            {sidebarCollapsed ? <ChevronRight className="w-5 h-5 text-secondary" /> : <ChevronLeft className="w-5 h-5 text-secondary" />}
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
                  isActive ? 'bg-amber-500 text-primary shadow-lg shadow-amber-500/20' : 'text-secondary hover:bg-slate-50 dark:hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-900 dark:hover:text-white'
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

        <div className="border-t border-border">
          {!sidebarCollapsed && (
            <div className="px-4 py-3">
              <p className="text-xs text-slate-500 text-center">Gwinnett County Sheriff's Office</p>
            </div>
          )}

          <div className="p-4">
            <button
              onClick={() => setLogoutConfirmOpen(true)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-secondary hover:bg-slate-100 dark:hover:bg-slate-100 dark:hover:bg-slate-800/40 hover:text-slate-800 dark:hover:text-secondary dark:text-slate-300 ${sidebarCollapsed ? 'justify-center' : ''}`}
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
          <div className="relative bg-white dark:bg-slate-900 border border-border rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800/60 rounded-xl flex items-center justify-center">
                <LogOut className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-primary">Sign Out</h3>
                <p className="text-sm text-secondary">Are you sure you want to sign out?</p>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setLogoutConfirmOpen(false)}
                className="flex-1 px-4 py-2.5 bg-slate-100 dark:bg-slate-800/40 hover:bg-slate-200 dark:hover:bg-slate-100 dark:hover:bg-slate-800/60 border border-border rounded-xl text-primary font-medium transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 px-4 py-2.5 bg-slate-50 dark:bg-slate-700/40 hover:bg-slate-700/60 border border-slate-600/50 rounded-xl text-primary font-medium transition-all"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col min-w-0">
        <header className="border-b border-slate-200/60 dark:border-slate-800/50 backdrop-blur-lg bg-white/75 dark:bg-slate-900/30 shadow-[0_2px_20px_rgba(0,0,0,0.06)] dark:shadow-none">
          <div className="px-4 lg:px-6 py-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4 flex-1 min-w-0">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 hover:bg-slate-100 dark:hover:bg-slate-800/50 rounded-lg"
              >
                <Menu className="w-5 h-5 text-secondary" />
              </button>
              <div className="flex items-center gap-2 text-sm">
                <button
                  onClick={() => navigate(createPageUrl('HRDashboard'))}
                  className="text-secondary hover:text-primary transition-colors"
                >
                  HR Dashboard
                </button>
                <ChevronRight className="w-4 h-4 text-slate-700" />
                <span className="text-primary">Settings</span>
              </div>
            </div>
            <div className="flex items-center gap-2 lg:gap-3">
              <div className="relative">
                <button
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                  className="p-2 hover:bg-slate-100 dark:hover:bg-slate-100 dark:hover:bg-slate-800/50 rounded-lg relative"
                >
                  <Bell className="w-5 h-5 text-secondary" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>

                {notificationsOpen && (
                  <div className="absolute right-0 top-full mt-2 w-96 bg-surface-raised backdrop-blur-xl border border-border rounded-xl shadow-2xl z-50">
                    <div className="p-4 border-b border-border">
                      <h3 className="text-sm font-semibold text-primary">Notifications</h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.map(notification => (
                        <div key={notification.id} className={`p-4 border-b border-slate-100 dark:border-border hover:bg-slate-50 dark:hover:bg-slate-100 dark:hover:bg-slate-100 dark:hover:bg-slate-800/30 cursor-pointer transition-colors ${notification.urgent ? 'bg-amber-500/5' : ''}`}>
                          <div className="flex items-start gap-3">
                            <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${notification.urgent ? 'bg-amber-400' : 'bg-blue-400'}`}></div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-primary mb-1">{notification.title}</p>
                              <p className="text-xs text-secondary mb-2">{notification.message}</p>
                              <p className="text-xs text-slate-500">{notification.time}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-3 border-t border-border">
                      <button className="w-full text-center text-sm text-amber-600 dark:text-amber-400 hover:text-amber-300 font-medium">View All</button>
                    </div>
                  </div>
                )}
              </div>

              <div className="h-8 w-px bg-white dark:bg-slate-700/50"></div>

              <div className="relative profile-menu-container">
                <button
                  onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                  className="flex items-center gap-3 p-1.5 pr-3 hover:bg-white dark:bg-slate-800/50 rounded-xl transition-colors"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-primary text-sm font-bold">HR</span>
                  </div>
                  <div className="hidden sm:block text-left">
                    <p className="text-sm font-medium text-primary">{profileSettings.fullName}</p>
                    <p className="text-xs text-secondary">{profileSettings.department}</p>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-secondary hidden sm:block transition-transform ${profileMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {profileMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-56 bg-surface-raised backdrop-blur-xl border border-border rounded-xl shadow-2xl z-50 py-2">
                    <div className="px-4 py-3 border-b border-border">
                      <p className="text-sm font-medium text-primary">{profileSettings.fullName}</p>
                      <p className="text-xs text-secondary">{profileSettings.email}</p>
                    </div>
                    <div className="py-1">
                      <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-secondary hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors">
                        <User className="w-4 h-4" />
                        View Profile
                      </button>
                      <button
                        onClick={() => setActiveSection('profile')}
                        className="w-full flex items-center gap-3 px-4 py-2 text-sm text-secondary hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors"
                      >
                        <Settings className="w-4 h-4" />
                        Settings
                      </button>
                    </div>
                    <div className="border-t border-border py-1">
                      <button
                        onClick={() => setLogoutConfirmOpen(true)}
                        className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors"
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
          <div className="max-w-6xl mx-auto">
            <div className="mb-6">
              <h2 className="text-2xl lg:text-3xl font-bold text-primary mb-2">HR Settings</h2>
              <p className="text-secondary">Manage your account, notifications, and HR system integrations</p>
            </div>

            {/* Save Success Banner */}
            {saveSuccess && (
              <div className="mb-6 bg-green-500/20 border border-green-500/30 rounded-xl p-4 flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
                <span className="text-green-600 dark:text-green-400 font-medium">Settings saved successfully</span>
              </div>
            )}

            {/* System Status Banner */}
            <div className="mb-6 bg-gradient-to-r from-green-500/10 to-emerald-500/5 border border-green-500/20 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h4 className="text-base font-semibold text-primary">All HR Systems Operational</h4>
                    <p className="text-sm text-secondary">5 integrations active • 99.92% average uptime • Last sync: 5 min ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-lg">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm font-semibold text-green-600 dark:text-green-400 uppercase">Live</span>
                </div>
              </div>
            </div>

            {/* Role Badge */}
            <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 border border-blue-500/30 rounded-xl">
              <Users className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-semibold text-blue-400 uppercase">Human Resources Access Level</span>
            </div>

            {/* Settings Navigation Tabs */}
            <div className="mb-6 flex gap-2 border-b border-border overflow-x-auto">
              {settingsTabs.map(tab => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveSection(tab.id)}
                    className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-all relative whitespace-nowrap ${
                      activeSection === tab.id ? 'text-amber-600 dark:text-amber-400' : 'text-secondary hover:text-slate-300'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                    {activeSection === tab.id && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500"></div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Settings Content */}
            <div className="space-y-6">
              {/* Profile Settings */}
              {activeSection === 'profile' && (
                <div className="bg-white dark:bg-slate-800/40 border border-border rounded-xl shadow-sm dark:shadow-none p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-primary">Profile Information</h3>
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/20 border border-green-500/30 rounded-lg">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-xs font-medium text-green-600 dark:text-green-400">Verified Account</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 mb-8">
                    <div className="relative">
                      <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-primary text-2xl font-bold">PH</span>
                      </div>
                      <button className="absolute bottom-0 right-0 w-8 h-8 bg-amber-500 hover:bg-amber-400 rounded-full flex items-center justify-center transition-colors">
                        <Camera className="w-4 h-4 text-primary" />
                      </button>
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-primary">{profileSettings.fullName}</h4>
                      <p className="text-secondary">{profileSettings.position}</p>
                      <p className="text-sm text-slate-500">{profileSettings.department}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-secondary mb-2">Full Name</label>
                      <input
                        type="text"
                        value={profileSettings.fullName}
                        onChange={(e) => setProfileSettings({...profileSettings, fullName: e.target.value})}
                        className="w-full px-4 py-2.5 bg-white dark:bg-slate-800/40 border border-border rounded-xl text-primary placeholder-slate-400 dark:placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-amber-500/50 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-secondary mb-2">Email Address</label>
                      <input
                        type="email"
                        value={profileSettings.email}
                        onChange={(e) => setProfileSettings({...profileSettings, email: e.target.value})}
                        className="w-full px-4 py-2.5 bg-white dark:bg-slate-800/40 border border-border rounded-xl text-primary placeholder-slate-400 dark:placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-amber-500/50 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-secondary mb-2">Employee ID</label>
                      <input
                        type="text"
                        value={profileSettings.employeeId}
                        disabled
                        className="w-full px-4 py-2.5 bg-slate-100 dark:bg-slate-800/20 border border-slate-700/50 rounded-xl text-secondary cursor-not-allowed"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-secondary mb-2">Phone Number</label>
                      <input
                        type="tel"
                        value={profileSettings.phone}
                        onChange={(e) => setProfileSettings({...profileSettings, phone: e.target.value})}
                        className="w-full px-4 py-2.5 bg-white dark:bg-slate-800/40 border border-border rounded-xl text-primary placeholder-slate-400 dark:placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-amber-500/50 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-secondary mb-2">Department</label>
                      <input
                        type="text"
                        value={profileSettings.department}
                        disabled
                        className="w-full px-4 py-2.5 bg-slate-100 dark:bg-slate-800/20 border border-slate-700/50 rounded-xl text-secondary cursor-not-allowed"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-secondary mb-2">Position</label>
                      <input
                        type="text"
                        value={profileSettings.position}
                        disabled
                        className="w-full px-4 py-2.5 bg-slate-100 dark:bg-slate-800/20 border border-slate-700/50 rounded-xl text-secondary cursor-not-allowed"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-secondary mb-2">Hire Date</label>
                      <input
                        type="text"
                        value={new Date(profileSettings.hireDate).toLocaleDateString()}
                        disabled
                        className="w-full px-4 py-2.5 bg-slate-100 dark:bg-slate-800/20 border border-slate-700/50 rounded-xl text-secondary cursor-not-allowed"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-secondary mb-2">Certifications</label>
                      <input
                        type="text"
                        value={profileSettings.certifications}
                        onChange={(e) => setProfileSettings({...profileSettings, certifications: e.target.value})}
                        className="w-full px-4 py-2.5 bg-white dark:bg-slate-800/40 border border-border rounded-xl text-primary placeholder-slate-400 dark:placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-amber-500/50 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end">
                    <button
                      onClick={handleSave}
                      className="flex items-center gap-2 px-6 py-2.5 bg-amber-500 hover:bg-amber-400 rounded-xl text-primary font-medium transition-all"
                    >
                      <Save className="w-4 h-4" />
                      Save Changes
                    </button>
                  </div>
                </div>
              )}

              {/* Notification Settings */}
              {activeSection === 'notifications' && (
                <div className="bg-white dark:bg-slate-800/40 border border-border rounded-xl shadow-sm dark:shadow-none p-6">
                  <h3 className="text-lg font-semibold text-primary mb-6">Notification Preferences</h3>

                  <div className="space-y-6">
                    <div>
                      <h4 className="text-sm font-semibold text-secondary mb-4 uppercase tracking-wide">Delivery Methods</h4>
                      <div className="space-y-6">
                        {[
                          { key: 'emailNotifications', label: 'Email Notifications', desc: 'Receive notifications via email', icon: Mail },
                          { key: 'smsNotifications', label: 'SMS Notifications', desc: 'Receive urgent alerts via text', icon: Smartphone },
                          { key: 'pushNotifications', label: 'Push Notifications', desc: 'Browser and mobile push alerts', icon: Bell }
                        ].map(item => {
                          const Icon = item.icon;
                          return (
                            <div key={item.key} className="flex items-center justify-between p-4 bg-white dark:bg-slate-800/40 border border-border rounded-xl">
                              <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-white dark:bg-slate-700/50 rounded-xl flex items-center justify-center">
                                  <Icon className="w-5 h-5 text-secondary" />
                                </div>
                                <div>
                                  <p className="text-primary font-medium">{item.label}</p>
                                  <p className="text-sm text-secondary">{item.desc}</p>
                                </div>
                              </div>
                              <button
                                onClick={() => setNotificationSettings({...notificationSettings, [item.key]: !notificationSettings[item.key]})}
                                className={`w-12 h-6 rounded-full transition-colors ${notificationSettings[item.key] ? 'bg-amber-500' : 'bg-slate-600'}`}
                              >
                                <div className={`w-5 h-5 bg-white rounded-full transition-transform ${notificationSettings[item.key] ? 'translate-x-6' : 'translate-x-0.5'}`}></div>
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-secondary mb-4 uppercase tracking-wide">HR Alert Types</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                          { key: 'applicantAlerts', label: 'Applicant Alerts', desc: 'New applications and status changes' },
                          { key: 'hiringPipelineUpdates', label: 'Hiring Pipeline', desc: 'Candidate progression updates' },
                          { key: 'onboardingReminders', label: 'Onboarding Reminders', desc: 'New hire task deadlines' },
                          { key: 'complianceAlerts', label: 'Compliance Alerts', desc: 'Policy and compliance deadlines' },
                          { key: 'certificationExpiry', label: 'Certification Expiry', desc: 'Training and cert renewals' },
                          { key: 'performanceReviewDue', label: 'Performance Reviews', desc: 'Review cycle reminders' },
                          { key: 'timeOffRequests', label: 'Time Off Requests', desc: 'Leave request notifications' },
                          { key: 'policyUpdates', label: 'Policy Updates', desc: 'New policies and changes' }
                        ].map(item => (
                          <div key={item.key} className="flex items-center justify-between p-4 bg-white dark:bg-slate-800/40 border border-border rounded-xl">
                            <div>
                              <p className="text-primary font-medium">{item.label}</p>
                              <p className="text-xs text-secondary">{item.desc}</p>
                            </div>
                            <button
                              onClick={() => setNotificationSettings({...notificationSettings, [item.key]: !notificationSettings[item.key]})}
                              className={`w-12 h-6 rounded-full transition-colors ${notificationSettings[item.key] ? 'bg-amber-500' : 'bg-slate-600'}`}
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
                      className="flex items-center gap-2 px-6 py-2.5 bg-amber-500 hover:bg-amber-400 rounded-xl text-primary font-medium transition-all"
                    >
                      <Save className="w-4 h-4" />
                      Save Preferences
                    </button>
                  </div>
                </div>
              )}

              {/* Display Settings */}
              {activeSection === 'display' && (
                <div className="bg-white dark:bg-slate-800/40 border border-border rounded-xl shadow-sm dark:shadow-none p-6">
                  <h3 className="text-lg font-semibold text-primary mb-6">Display & Appearance</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-secondary mb-3">Theme</label>
                      <div className="flex gap-3">
                        <button
                          onClick={() => setDisplaySettings({...displaySettings, theme: 'dark'})}
                          className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border transition-all ${
                            displaySettings.theme === 'dark' ? 'bg-amber-500/20 border-amber-500/50 text-amber-600 dark:text-amber-400' : 'bg-white dark:bg-slate-800/40 border-slate-700/50 text-slate-500'
                          }`}
                        >
                          <Moon className="w-5 h-5" />
                          Dark
                        </button>
                        <button
                          onClick={() => setDisplaySettings({...displaySettings, theme: 'light'})}
                          className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border transition-all ${
                            displaySettings.theme === 'light' ? 'bg-amber-500/20 border-amber-500/50 text-amber-600 dark:text-amber-400' : 'bg-white dark:bg-slate-800/40 border-slate-700/50 text-slate-500'
                          }`}
                        >
                          <Sun className="w-5 h-5" />
                          Light
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-secondary mb-3">Date Format</label>
                      <select
                        value={displaySettings.dateFormat}
                        onChange={(e) => setDisplaySettings({...displaySettings, dateFormat: e.target.value})}
                        className="w-full px-4 py-2.5 bg-white dark:bg-slate-800/40 border border-border rounded-xl text-slate-900 dark:text-primary focus:outline-none focus:border-amber-500/50"
                      >
                        <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                        <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                        <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-secondary mb-3">Time Format</label>
                      <select
                        value={displaySettings.timeFormat}
                        onChange={(e) => setDisplaySettings({...displaySettings, timeFormat: e.target.value})}
                        className="w-full px-4 py-2.5 bg-white dark:bg-slate-800/40 border border-border rounded-xl text-slate-900 dark:text-primary focus:outline-none focus:border-amber-500/50"
                      >
                        <option value="12h">12-hour</option>
                        <option value="24h">24-hour</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-secondary mb-3">Timezone</label>
                      <select
                        value={displaySettings.timezone}
                        onChange={(e) => setDisplaySettings({...displaySettings, timezone: e.target.value})}
                        className="w-full px-4 py-2.5 bg-white dark:bg-slate-800/40 border border-border rounded-xl text-slate-900 dark:text-primary focus:outline-none focus:border-amber-500/50"
                      >
                        <option value="America/New_York">Eastern Time (ET)</option>
                        <option value="America/Chicago">Central Time (CT)</option>
                        <option value="America/Denver">Mountain Time (MT)</option>
                        <option value="America/Los_Angeles">Pacific Time (PT)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-secondary mb-3">Display Density</label>
                      <select
                        value={displaySettings.density}
                        onChange={(e) => setDisplaySettings({...displaySettings, density: e.target.value})}
                        className="w-full px-4 py-2.5 bg-white dark:bg-slate-800/40 border border-border rounded-xl text-slate-900 dark:text-primary focus:outline-none focus:border-amber-500/50"
                      >
                        <option value="compact">Compact</option>
                        <option value="comfortable">Comfortable</option>
                        <option value="spacious">Spacious</option>
                      </select>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-white dark:bg-slate-800/40 border border-border rounded-xl">
                      <div>
                        <p className="text-primary font-medium">Animations</p>
                        <p className="text-sm text-secondary">Enable UI animations</p>
                      </div>
                      <button
                        onClick={() => setDisplaySettings({...displaySettings, animations: !displaySettings.animations})}
                        className={`w-12 h-6 rounded-full transition-colors ${displaySettings.animations ? 'bg-amber-500' : 'bg-slate-600'}`}
                      >
                        <div className={`w-5 h-5 bg-white rounded-full transition-transform ${displaySettings.animations ? 'translate-x-6' : 'translate-x-0.5'}`}></div>
                      </button>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end">
                    <button
                      onClick={handleSave}
                      className="flex items-center gap-2 px-6 py-2.5 bg-amber-500 hover:bg-amber-400 rounded-xl text-primary font-medium transition-all"
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
                  <div className="bg-white dark:bg-slate-800/40 border border-border rounded-xl shadow-sm dark:shadow-none p-6">
                    <h3 className="text-lg font-semibold text-primary mb-6">Security Settings</h3>

                    <div className="space-y-6">
                      <div className="flex items-center justify-between p-4 bg-white dark:bg-slate-800/40 border border-border rounded-xl">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center">
                            <Lock className="w-5 h-5 text-green-600 dark:text-green-400" />
                          </div>
                          <div>
                            <p className="text-primary font-medium">Two-Factor Authentication</p>
                            <p className="text-sm text-secondary">Add an extra layer of security</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          {securitySettings.twoFactorAuth && (
                            <span className="px-2 py-1 bg-green-500/20 border border-green-500/30 rounded text-xs text-green-600 dark:text-green-400 font-medium">Enabled</span>
                          )}
                          <button
                            onClick={() => setSecuritySettings({...securitySettings, twoFactorAuth: !securitySettings.twoFactorAuth})}
                            className={`w-12 h-6 rounded-full transition-colors ${securitySettings.twoFactorAuth ? 'bg-green-500' : 'bg-slate-600'}`}
                          >
                            <div className={`w-5 h-5 bg-white rounded-full transition-transform ${securitySettings.twoFactorAuth ? 'translate-x-6' : 'translate-x-0.5'}`}></div>
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-white dark:bg-slate-800/40 border border-border rounded-xl">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-white dark:bg-slate-700/50 rounded-xl flex items-center justify-center">
                            <Clock className="w-5 h-5 text-secondary" />
                          </div>
                          <div>
                            <p className="text-primary font-medium">Session Timeout</p>
                            <p className="text-sm text-secondary">Auto-logout after inactivity</p>
                          </div>
                        </div>
                        <select
                          value={securitySettings.sessionTimeout}
                          onChange={(e) => setSecuritySettings({...securitySettings, sessionTimeout: e.target.value})}
                          className="px-4 py-2 bg-white dark:bg-slate-800/40 border border-border rounded-xl text-slate-900 dark:text-primary focus:outline-none focus:border-amber-500/50"
                        >
                          <option value="15">15 minutes</option>
                          <option value="30">30 minutes</option>
                          <option value="60">1 hour</option>
                          <option value="120">2 hours</option>
                        </select>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-white dark:bg-slate-800/40 border border-border rounded-xl">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-white dark:bg-slate-700/50 rounded-xl flex items-center justify-center">
                            <Bell className="w-5 h-5 text-secondary" />
                          </div>
                          <div>
                            <p className="text-primary font-medium">Login Notifications</p>
                            <p className="text-sm text-secondary">Get alerted for new sign-ins</p>
                          </div>
                        </div>
                        <button
                          onClick={() => setSecuritySettings({...securitySettings, loginNotifications: !securitySettings.loginNotifications})}
                          className={`w-12 h-6 rounded-full transition-colors ${securitySettings.loginNotifications ? 'bg-amber-500' : 'bg-slate-600'}`}
                        >
                          <div className={`w-5 h-5 bg-white rounded-full transition-transform ${securitySettings.loginNotifications ? 'translate-x-6' : 'translate-x-0.5'}`}></div>
                        </button>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-white dark:bg-slate-800/40 border border-border rounded-xl">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-white dark:bg-slate-700/50 rounded-xl flex items-center justify-center">
                            <Activity className="w-5 h-5 text-secondary" />
                          </div>
                          <div>
                            <p className="text-primary font-medium">Audit Logging</p>
                            <p className="text-sm text-secondary">Track all account activity</p>
                          </div>
                        </div>
                        <button
                          onClick={() => setSecuritySettings({...securitySettings, auditLogging: !securitySettings.auditLogging})}
                          className={`w-12 h-6 rounded-full transition-colors ${securitySettings.auditLogging ? 'bg-amber-500' : 'bg-slate-600'}`}
                        >
                          <div className={`w-5 h-5 bg-white rounded-full transition-transform ${securitySettings.auditLogging ? 'translate-x-6' : 'translate-x-0.5'}`}></div>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-slate-800/40 border border-border rounded-xl shadow-sm dark:shadow-none p-6">
                    <h3 className="text-lg font-semibold text-primary mb-4">Change Password</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-secondary mb-2">Current Password</label>
                        <input
                          type="password"
                          placeholder="••••••••"
                          className="w-full px-4 py-2.5 bg-white dark:bg-slate-800/40 border border-border rounded-xl text-primary placeholder-slate-400 dark:placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-amber-500/50"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-secondary mb-2">New Password</label>
                        <input
                          type="password"
                          placeholder="••••••••"
                          className="w-full px-4 py-2.5 bg-white dark:bg-slate-800/40 border border-border rounded-xl text-primary placeholder-slate-400 dark:placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-amber-500/50"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-secondary mb-2">Confirm Password</label>
                        <input
                          type="password"
                          placeholder="••••••••"
                          className="w-full px-4 py-2.5 bg-white dark:bg-slate-800/40 border border-border rounded-xl text-primary placeholder-slate-400 dark:placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-amber-500/50"
                        />
                      </div>
                    </div>
                    <div className="mt-4 flex justify-end">
                      <button className="flex items-center gap-2 px-6 py-2.5 bg-amber-500 hover:bg-amber-400 rounded-xl text-primary font-medium transition-all">
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
                  <div className="bg-white dark:bg-slate-800/40 border border-border rounded-xl shadow-sm dark:shadow-none p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h3 className="text-lg font-semibold text-primary">HR System Integrations</h3>
                        <p className="text-sm text-secondary">Connected systems and data sources</p>
                      </div>
                      <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-700/50 hover:bg-slate-700/70 border border-slate-600/50 rounded-xl text-secondary transition-all">
                        <RefreshCw className="w-4 h-4" />
                        Sync All
                      </button>
                    </div>

                    <div className="space-y-6">
                      {Object.entries(integrations).map(([key, integration]) => (
                        <div key={key} className="bg-white dark:bg-slate-800/40 border border-border rounded-xl shadow-sm dark:shadow-none p-5">
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-4">
                              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                                integration.status === 'connected' ? 'bg-green-500/20' : 'bg-white dark:bg-slate-700/50'
                              }`}>
                                <Database className={`w-6 h-6 ${
                                  integration.status === 'connected' ? 'text-green-600 dark:text-green-400' : 'text-slate-500'
                                }`} />
                              </div>
                              <div>
                                <div className="flex items-center gap-3 mb-1">
                                  <h4 className="text-primary font-semibold">{integration.name}</h4>
                                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                                    integration.status === 'connected' ? 'bg-green-500/20 text-green-600 dark:text-green-400' : 'bg-slate-600/50 text-slate-500'
                                  }`}>
                                    {integration.status === 'connected' ? 'Connected' : 'Disconnected'}
                                  </span>
                                </div>
                                <p className="text-sm text-secondary mb-2">{integration.vendor} • {integration.type}</p>
                                <p className="text-xs text-slate-500">{integration.description}</p>

                                <div className="flex items-center gap-4 mt-3 text-xs text-secondary">
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
                                    <span key={idx} className="px-2 py-1 bg-white dark:bg-slate-700/50 rounded text-xs text-secondary">
                                      {type}
                                    </span>
                                  ))}
                                </div>

                                <div className="mt-4 flex items-center gap-2">
                                  <span className="text-xs text-slate-500">API Key:</span>
                                  <code className="px-2 py-1 bg-white dark:bg-slate-900/50 rounded text-xs text-secondary font-mono">
                                    {showApiKey[key] ? integration.apiKey : '••••••••••••••••'}
                                  </code>
                                  <button
                                    onClick={() => toggleApiKeyVisibility(key)}
                                    className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700/50 rounded transition-colors"
                                  >
                                    {showApiKey[key] ? (
                                      <EyeOff className="w-3 h-3 text-secondary" />
                                    ) : (
                                      <Eye className="w-3 h-3 text-secondary" />
                                    )}
                                  </button>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <div className="text-right mr-4">
                                <p className="text-xs text-secondary">Monthly Requests</p>
                                <p className="text-sm text-primary font-medium">
                                  {integration.monthlyRequests.toLocaleString()} / {integration.requestLimit.toLocaleString()}
                                </p>
                                <div className="w-24 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full mt-1">
                                  <div
                                    className="h-full bg-amber-500 rounded-full"
                                    style={{ width: `${(integration.monthlyRequests / integration.requestLimit) * 100}%` }}
                                  ></div>
                                </div>
                              </div>
                              <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700/50 rounded-lg transition-colors">
                                <Settings className="w-4 h-4 text-secondary" />
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
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110 z-40"
      >
        {chatOpen ? <X className="w-6 h-6 text-primary" /> : <MessageCircle className="w-6 h-6 text-primary" />}
      </button>

      {chatOpen && (
        <div className="fixed bottom-24 right-6 w-full max-w-96 h-[500px] bg-surface-raised backdrop-blur-xl border border-border rounded-2xl shadow-2xl flex flex-col z-40 mx-4 sm:mx-0">
          <div className="p-4 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-primary">Settings AI Assistant</h3>
                <p className="text-xs text-green-600 dark:text-green-400">Online</p>
              </div>
            </div>
          </div>
          <div className="flex-1 p-4 overflow-y-auto">
            <div className="flex gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1">
                <div className="bg-white dark:bg-slate-800/60 p-3 rounded-xl">
                  <p className="text-sm text-slate-700 dark:text-slate-200">Hi! I can help you configure your HR settings, manage integrations, set up notifications, and troubleshoot connectivity issues. What do you need help with?</p>
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 border-t border-border">
            <div className="flex items-center gap-2">
              <input type="text" placeholder="Ask about settings..." className="flex-1 px-4 py-2 bg-white dark:bg-slate-800/40 border border-border rounded-xl text-primary placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500/50" />
              <button className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
                <Send className="w-5 h-5 text-primary" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

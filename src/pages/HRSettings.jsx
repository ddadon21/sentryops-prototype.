import React, { useState } from 'react';
import { Bell, MessageCircle, CheckCircle2, Settings, Sparkles, X, Send, User, Lock, Palette, Link, Mail, Smartphone, Moon, Sun, Save, Camera, Database, Key, Activity, Eye, EyeOff, Clock, Zap, RefreshCw, Users } from 'lucide-react';
import DashboardLayout from '../layouts/DashboardLayout';
import { hrNavigation, hrProfile as hrProfileConfig, hrNotifications } from '../config/hrConfig';

export default function HRSettings() {
  const [chatOpen, setChatOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('profile');
  const [showApiKey, setShowApiKey] = useState({});
  const [saveSuccess, setSaveSuccess] = useState(false);

  const settingsTabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'display', label: 'Display', icon: Palette },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'integrations', label: 'HR Integrations', icon: Link }
  ];

  const [profileSettings, setProfileSettings] = useState({
    fullName: hrProfileConfig.name,
    email: hrProfileConfig.email,
    employeeId: 'HR-0015',
    phone: '(770) 619-6520',
    department: 'Human Resources',
    position: hrProfileConfig.role,
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
    dateFormat: 'MM/DD/YYYY',
    timeFormat: '12h',
    timezone: 'America/New_York',
    density: 'comfortable',
    animations: true
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: true,
    sessionTimeout: '30',
    loginNotifications: true,
    auditLogging: true
  });

  const [integrations] = useState({
    neoGov: {
      name: 'NeoGov',
      vendor: 'NEOGOV',
      type: 'Recruiting & Onboarding',
      status: 'connected',
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

  const handleSave = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const toggleApiKeyVisibility = (key) => {
    setShowApiKey(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <DashboardLayout
      navigation={hrNavigation}
      profile={hrProfileConfig}
      notifications={hrNotifications}
      settingsRoute="/hr/settings"
      profileRoute="/hr/profile"
      activityRoute="/hr/activity"
      activityModuleFilter="hr"
    >
      <div className="p-4 lg:p-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6 pb-4 border-b border-border">
            <h2 className="text-2xl lg:text-3xl font-bold text-primary mb-2">HR Settings</h2>
            <p className="text-secondary">Manage your account, notifications, and HR system integrations</p>
          </div>

          {saveSuccess && (
            <div className="mb-6 bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <span className="text-emerald-600 dark:text-emerald-400 font-medium">Settings saved successfully</span>
            </div>
          )}

          <div className="mb-6 bg-gradient-to-r from-emerald-50 to-emerald-100 dark:from-emerald-950/20 dark:to-emerald-900/20 border border-emerald-200 dark:border-emerald-800/30 rounded-xl p-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-base font-semibold text-primary break-words">All HR Systems Operational</h4>
                  <p className="text-sm text-secondary break-words">5 integrations active · 99.92% average uptime · Last sync: 5 min ago</p>
                </div>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-emerald-100 dark:bg-emerald-500/20 border border-emerald-200 dark:border-emerald-500/30 rounded-lg self-start sm:self-auto flex-shrink-0">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-semibold text-emerald-700 dark:text-emerald-400 uppercase">Live</span>
              </div>
            </div>
          </div>

          <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 rounded-xl">
            <Users className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-semibold text-blue-700 dark:text-blue-400 uppercase">Human Resources Access Level</span>
          </div>

          <div className="mb-6 flex gap-2 border-b border-border overflow-x-auto">
            {settingsTabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveSection(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-all relative whitespace-nowrap ${
                    activeSection === tab.id ? 'text-amber-700 dark:text-amber-400' : 'text-secondary hover:text-primary'
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

          <div className="space-y-6">
            {activeSection === 'profile' && (
              <div className="bg-surface border border-border rounded-xl shadow-sm dark:shadow-none p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6">
                  <h3 className="text-lg font-semibold text-primary">Profile Information</h3>
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-100 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 rounded-lg self-start flex-shrink-0">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    <span className="text-xs font-medium text-emerald-700 dark:text-emerald-400">Verified Account</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center sm:items-center gap-6 mb-8 text-center sm:text-left">
                  <div className="relative flex-shrink-0">
                    <div className="w-24 h-24 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-2xl font-bold">{hrProfileConfig.initials}</span>
                    </div>
                    <button className="absolute bottom-0 right-0 w-8 h-8 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center transition-colors">
                      <Camera className="w-4 h-4 text-white" />
                    </button>
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xl font-semibold text-primary break-words">{profileSettings.fullName}</h4>
                    <p className="text-secondary break-words">{profileSettings.position}</p>
                    <p className="text-sm text-muted break-words">{profileSettings.department}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-secondary mb-2">Full Name</label>
                    <input
                      type="text"
                      value={profileSettings.fullName}
                      onChange={(e) => setProfileSettings({ ...profileSettings, fullName: e.target.value })}
                      className="w-full px-4 py-2.5 bg-white dark:bg-zinc-900/40 border border-border rounded-xl text-primary focus:outline-none focus:border-amber-500/50 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-secondary mb-2">Email Address</label>
                    <input
                      type="email"
                      value={profileSettings.email}
                      onChange={(e) => setProfileSettings({ ...profileSettings, email: e.target.value })}
                      className="w-full px-4 py-2.5 bg-white dark:bg-zinc-900/40 border border-border rounded-xl text-primary focus:outline-none focus:border-amber-500/50 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-secondary mb-2">Employee ID</label>
                    <input
                      type="text"
                      value={profileSettings.employeeId}
                      disabled
                      className="w-full px-4 py-2.5 bg-slate-100 dark:bg-zinc-900/20 border border-border rounded-xl text-muted cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-secondary mb-2">Phone Number</label>
                    <input
                      type="tel"
                      value={profileSettings.phone}
                      onChange={(e) => setProfileSettings({ ...profileSettings, phone: e.target.value })}
                      className="w-full px-4 py-2.5 bg-white dark:bg-zinc-900/40 border border-border rounded-xl text-primary focus:outline-none focus:border-amber-500/50 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-secondary mb-2">Department</label>
                    <input
                      type="text"
                      value={profileSettings.department}
                      disabled
                      className="w-full px-4 py-2.5 bg-slate-100 dark:bg-zinc-900/20 border border-border rounded-xl text-muted cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-secondary mb-2">Position</label>
                    <input
                      type="text"
                      value={profileSettings.position}
                      disabled
                      className="w-full px-4 py-2.5 bg-slate-100 dark:bg-zinc-900/20 border border-border rounded-xl text-muted cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-secondary mb-2">Hire Date</label>
                    <input
                      type="text"
                      value={new Date(profileSettings.hireDate).toLocaleDateString()}
                      disabled
                      className="w-full px-4 py-2.5 bg-slate-100 dark:bg-zinc-900/20 border border-border rounded-xl text-muted cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-secondary mb-2">Certifications</label>
                    <input
                      type="text"
                      value={profileSettings.certifications}
                      onChange={(e) => setProfileSettings({ ...profileSettings, certifications: e.target.value })}
                      className="w-full px-4 py-2.5 bg-white dark:bg-zinc-900/40 border border-border rounded-xl text-primary focus:outline-none focus:border-amber-500/50 transition-colors"
                    />
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 px-6 py-2.5 bg-amber-500 hover:bg-amber-400 rounded-xl text-white font-medium transition-all"
                  >
                    <Save className="w-4 h-4" />
                    Save Changes
                  </button>
                </div>
              </div>
            )}

            {activeSection === 'notifications' && (
              <div className="bg-surface border border-border rounded-xl shadow-sm dark:shadow-none p-6">
                <h3 className="text-lg font-semibold text-primary mb-6">Notification Preferences</h3>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-semibold text-muted mb-4 uppercase tracking-wide">Delivery Methods</h4>
                    <div className="space-y-3">
                      {[
                        { key: 'emailNotifications', label: 'Email Notifications', desc: 'Receive notifications via email', icon: Mail },
                        { key: 'smsNotifications', label: 'SMS Notifications', desc: 'Receive urgent alerts via text', icon: Smartphone },
                        { key: 'pushNotifications', label: 'Push Notifications', desc: 'Browser and mobile push alerts', icon: Bell }
                      ].map(item => {
                        const Icon = item.icon;
                        return (
                          <div key={item.key} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 bg-white dark:bg-zinc-900/40 border border-border rounded-xl">
                            <div className="flex items-center gap-4 min-w-0">
                              <div className="w-10 h-10 bg-slate-100 dark:bg-zinc-800/50 rounded-xl flex items-center justify-center flex-shrink-0">
                                <Icon className="w-5 h-5 text-secondary" />
                              </div>
                              <div className="min-w-0">
                                <p className="text-primary font-medium break-words">{item.label}</p>
                                <p className="text-sm text-secondary break-words">{item.desc}</p>
                              </div>
                            </div>
                            <button
                              onClick={() => setNotificationSettings({ ...notificationSettings, [item.key]: !notificationSettings[item.key] })}
                              className={`w-12 h-6 rounded-full transition-colors flex-shrink-0 self-start sm:self-auto ${notificationSettings[item.key] ? 'bg-amber-500' : 'bg-slate-300 dark:bg-slate-600'}`}
                            >
                              <div className={`w-5 h-5 bg-white rounded-full transition-transform ${notificationSettings[item.key] ? 'translate-x-6' : 'translate-x-0.5'}`}></div>
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-muted mb-4 uppercase tracking-wide">HR Alert Types</h4>
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
                        <div key={item.key} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 bg-white dark:bg-zinc-900/40 border border-border rounded-xl">
                          <div className="min-w-0">
                            <p className="text-primary font-medium break-words">{item.label}</p>
                            <p className="text-xs text-secondary break-words">{item.desc}</p>
                          </div>
                          <button
                            onClick={() => setNotificationSettings({ ...notificationSettings, [item.key]: !notificationSettings[item.key] })}
                            className={`w-12 h-6 rounded-full transition-colors flex-shrink-0 self-start sm:self-auto ${notificationSettings[item.key] ? 'bg-amber-500' : 'bg-slate-300 dark:bg-slate-600'}`}
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
                    className="flex items-center gap-2 px-6 py-2.5 bg-amber-500 hover:bg-amber-400 rounded-xl text-white font-medium transition-all"
                  >
                    <Save className="w-4 h-4" />
                    Save Preferences
                  </button>
                </div>
              </div>
            )}

            {activeSection === 'display' && (
              <div className="bg-surface border border-border rounded-xl shadow-sm dark:shadow-none p-6">
                <h3 className="text-lg font-semibold text-primary mb-6">Display & Appearance</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-secondary mb-3">Theme</label>
                    <div className="flex gap-3">
                      <button
                        onClick={() => setDisplaySettings({ ...displaySettings, theme: 'dark' })}
                        className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border transition-all ${
                          displaySettings.theme === 'dark' ? 'bg-amber-50 dark:bg-amber-500/10 border-amber-300 dark:border-amber-500/40 text-amber-700 dark:text-amber-400' : 'bg-white dark:bg-zinc-900/40 border-border text-secondary'
                        }`}
                      >
                        <Moon className="w-5 h-5" />
                        Dark
                      </button>
                      <button
                        onClick={() => setDisplaySettings({ ...displaySettings, theme: 'light' })}
                        className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border transition-all ${
                          displaySettings.theme === 'light' ? 'bg-amber-50 dark:bg-amber-500/10 border-amber-300 dark:border-amber-500/40 text-amber-700 dark:text-amber-400' : 'bg-white dark:bg-zinc-900/40 border-border text-secondary'
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
                      onChange={(e) => setDisplaySettings({ ...displaySettings, dateFormat: e.target.value })}
                      className="w-full px-4 py-2.5 bg-white dark:bg-zinc-900/40 border border-border rounded-xl text-primary focus:outline-none focus:border-amber-500/50"
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
                      onChange={(e) => setDisplaySettings({ ...displaySettings, timeFormat: e.target.value })}
                      className="w-full px-4 py-2.5 bg-white dark:bg-zinc-900/40 border border-border rounded-xl text-primary focus:outline-none focus:border-amber-500/50"
                    >
                      <option value="12h">12-hour</option>
                      <option value="24h">24-hour</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-secondary mb-3">Timezone</label>
                    <select
                      value={displaySettings.timezone}
                      onChange={(e) => setDisplaySettings({ ...displaySettings, timezone: e.target.value })}
                      className="w-full px-4 py-2.5 bg-white dark:bg-zinc-900/40 border border-border rounded-xl text-primary focus:outline-none focus:border-amber-500/50"
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
                      onChange={(e) => setDisplaySettings({ ...displaySettings, density: e.target.value })}
                      className="w-full px-4 py-2.5 bg-white dark:bg-zinc-900/40 border border-border rounded-xl text-primary focus:outline-none focus:border-amber-500/50"
                    >
                      <option value="compact">Compact</option>
                      <option value="comfortable">Comfortable</option>
                      <option value="spacious">Spacious</option>
                    </select>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 bg-white dark:bg-zinc-900/40 border border-border rounded-xl">
                    <div className="min-w-0">
                      <p className="text-primary font-medium break-words">Animations</p>
                      <p className="text-sm text-secondary break-words">Enable UI animations</p>
                    </div>
                    <button
                      onClick={() => setDisplaySettings({ ...displaySettings, animations: !displaySettings.animations })}
                      className={`w-12 h-6 rounded-full transition-colors flex-shrink-0 self-start sm:self-auto ${displaySettings.animations ? 'bg-amber-500' : 'bg-slate-300 dark:bg-slate-600'}`}
                    >
                      <div className={`w-5 h-5 bg-white rounded-full transition-transform ${displaySettings.animations ? 'translate-x-6' : 'translate-x-0.5'}`}></div>
                    </button>
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 px-6 py-2.5 bg-amber-500 hover:bg-amber-400 rounded-xl text-white font-medium transition-all"
                  >
                    <Save className="w-4 h-4" />
                    Save Display Settings
                  </button>
                </div>
              </div>
            )}

            {activeSection === 'security' && (
              <div className="space-y-6">
                <div className="bg-surface border border-border rounded-xl shadow-sm dark:shadow-none p-6">
                  <h3 className="text-lg font-semibold text-primary mb-6">Security Settings</h3>

                  <div className="space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 bg-white dark:bg-zinc-900/40 border border-border rounded-xl">
                      <div className="flex items-center gap-4 min-w-0">
                        <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                          <Lock className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-primary font-medium break-words">Two-Factor Authentication</p>
                          <p className="text-sm text-secondary break-words">Add an extra layer of security</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 flex-shrink-0 self-start sm:self-auto">
                        {securitySettings.twoFactorAuth && (
                          <span className="px-2 py-1 bg-emerald-100 dark:bg-emerald-500/20 border border-emerald-200 dark:border-emerald-500/30 rounded text-xs text-emerald-700 dark:text-emerald-400 font-medium">Enabled</span>
                        )}
                        <button
                          onClick={() => setSecuritySettings({ ...securitySettings, twoFactorAuth: !securitySettings.twoFactorAuth })}
                          className={`w-12 h-6 rounded-full transition-colors ${securitySettings.twoFactorAuth ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-600'}`}
                        >
                          <div className={`w-5 h-5 bg-white rounded-full transition-transform ${securitySettings.twoFactorAuth ? 'translate-x-6' : 'translate-x-0.5'}`}></div>
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 bg-white dark:bg-zinc-900/40 border border-border rounded-xl">
                      <div className="flex items-center gap-4 min-w-0">
                        <div className="w-10 h-10 bg-slate-100 dark:bg-zinc-800/50 rounded-xl flex items-center justify-center flex-shrink-0">
                          <Clock className="w-5 h-5 text-secondary" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-primary font-medium break-words">Session Timeout</p>
                          <p className="text-sm text-secondary break-words">Auto-logout after inactivity</p>
                        </div>
                      </div>
                      <select
                        value={securitySettings.sessionTimeout}
                        onChange={(e) => setSecuritySettings({ ...securitySettings, sessionTimeout: e.target.value })}
                        className="px-4 py-2 bg-white dark:bg-zinc-900/40 border border-border rounded-xl text-primary focus:outline-none focus:border-amber-500/50 flex-shrink-0 w-full sm:w-auto"
                      >
                        <option value="15">15 minutes</option>
                        <option value="30">30 minutes</option>
                        <option value="60">1 hour</option>
                        <option value="120">2 hours</option>
                      </select>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 bg-white dark:bg-zinc-900/40 border border-border rounded-xl">
                      <div className="flex items-center gap-4 min-w-0">
                        <div className="w-10 h-10 bg-slate-100 dark:bg-zinc-800/50 rounded-xl flex items-center justify-center flex-shrink-0">
                          <Bell className="w-5 h-5 text-secondary" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-primary font-medium break-words">Login Notifications</p>
                          <p className="text-sm text-secondary break-words">Get alerted for new sign-ins</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setSecuritySettings({ ...securitySettings, loginNotifications: !securitySettings.loginNotifications })}
                        className={`w-12 h-6 rounded-full transition-colors flex-shrink-0 self-start sm:self-auto ${securitySettings.loginNotifications ? 'bg-amber-500' : 'bg-slate-300 dark:bg-slate-600'}`}
                      >
                        <div className={`w-5 h-5 bg-white rounded-full transition-transform ${securitySettings.loginNotifications ? 'translate-x-6' : 'translate-x-0.5'}`}></div>
                      </button>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 bg-white dark:bg-zinc-900/40 border border-border rounded-xl">
                      <div className="flex items-center gap-4 min-w-0">
                        <div className="w-10 h-10 bg-slate-100 dark:bg-zinc-800/50 rounded-xl flex items-center justify-center flex-shrink-0">
                          <Activity className="w-5 h-5 text-secondary" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-primary font-medium break-words">Audit Logging</p>
                          <p className="text-sm text-secondary break-words">Track all account activity</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setSecuritySettings({ ...securitySettings, auditLogging: !securitySettings.auditLogging })}
                        className={`w-12 h-6 rounded-full transition-colors flex-shrink-0 self-start sm:self-auto ${securitySettings.auditLogging ? 'bg-amber-500' : 'bg-slate-300 dark:bg-slate-600'}`}
                      >
                        <div className={`w-5 h-5 bg-white rounded-full transition-transform ${securitySettings.auditLogging ? 'translate-x-6' : 'translate-x-0.5'}`}></div>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-surface border border-border rounded-xl shadow-sm dark:shadow-none p-6">
                  <h3 className="text-lg font-semibold text-primary mb-4">Change Password</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-secondary mb-2">Current Password</label>
                      <input
                        type="password"
                        placeholder="••••••••"
                        className="w-full px-4 py-2.5 bg-white dark:bg-zinc-900/40 border border-border rounded-xl text-primary placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-amber-500/50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-secondary mb-2">New Password</label>
                      <input
                        type="password"
                        placeholder="••••••••"
                        className="w-full px-4 py-2.5 bg-white dark:bg-zinc-900/40 border border-border rounded-xl text-primary placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-amber-500/50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-secondary mb-2">Confirm Password</label>
                      <input
                        type="password"
                        placeholder="••••••••"
                        className="w-full px-4 py-2.5 bg-white dark:bg-zinc-900/40 border border-border rounded-xl text-primary placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-amber-500/50"
                      />
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <button className="flex items-center gap-2 px-6 py-2.5 bg-amber-500 hover:bg-amber-400 rounded-xl text-white font-medium transition-all">
                      <Key className="w-4 h-4" />
                      Update Password
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'integrations' && (
              <div className="space-y-6">
                <div className="bg-surface border border-border rounded-xl shadow-sm dark:shadow-none p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-lg font-semibold text-primary">HR System Integrations</h3>
                      <p className="text-sm text-secondary">Connected systems and data sources</p>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-zinc-800/50 hover:bg-slate-50 dark:hover:bg-zinc-800/70 border border-border rounded-xl text-secondary transition-all">
                      <RefreshCw className="w-4 h-4" />
                      Sync All
                    </button>
                  </div>

                  <div className="space-y-6">
                    {Object.entries(integrations).map(([key, integration]) => (
                      <div key={key} className="bg-white dark:bg-zinc-900/40 border border-border rounded-xl shadow-sm dark:shadow-none p-5">
                        <div className="flex items-start justify-between flex-wrap gap-4">
                          <div className="flex items-start gap-4">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                              integration.status === 'connected' ? 'bg-emerald-100 dark:bg-emerald-500/20' : 'bg-slate-100 dark:bg-zinc-800/50'
                            }`}>
                              <Database className={`w-6 h-6 ${
                                integration.status === 'connected' ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-500'
                              }`} />
                            </div>
                            <div>
                              <div className="flex items-center gap-3 mb-1">
                                <h4 className="text-primary font-semibold">{integration.name}</h4>
                                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                                  integration.status === 'connected' ? 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400' : 'bg-slate-200 dark:bg-slate-600/50 text-slate-500'
                                }`}>
                                  {integration.status === 'connected' ? 'Connected' : 'Disconnected'}
                                </span>
                              </div>
                              <p className="text-sm text-secondary mb-2">{integration.vendor} · {integration.type}</p>
                              <p className="text-xs text-muted">{integration.description}</p>

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
                                  <span key={idx} className="px-2 py-1 bg-slate-100 dark:bg-zinc-800/50 rounded text-xs text-secondary">
                                    {type}
                                  </span>
                                ))}
                              </div>

                              <div className="mt-4 flex items-center gap-2">
                                <span className="text-xs text-muted">API Key:</span>
                                <code className="px-2 py-1 bg-slate-50 dark:bg-zinc-950/50 rounded text-xs text-secondary font-mono">
                                  {showApiKey[key] ? integration.apiKey : '••••••••••••••••'}
                                </code>
                                <button
                                  onClick={() => toggleApiKeyVisibility(key)}
                                  className="p-1 hover:bg-slate-100 dark:hover:bg-zinc-800/50 rounded transition-colors"
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
                              <div className="w-24 h-1.5 bg-slate-200 dark:bg-zinc-800 rounded-full mt-1">
                                <div
                                  className="h-full bg-amber-500 rounded-full"
                                  style={{ width: `${(integration.monthlyRequests / integration.requestLimit) * 100}%` }}
                                ></div>
                              </div>
                            </div>
                            <button className="p-2 hover:bg-slate-100 dark:hover:bg-zinc-800/50 rounded-lg transition-colors">
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
      </div>

      {/* AI Chat */}
      <button
        onClick={() => setChatOpen(!chatOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110 z-40"
      >
        {chatOpen ? <X className="w-6 h-6 text-white" /> : <MessageCircle className="w-6 h-6 text-white" />}
      </button>

      {chatOpen && (
        <div className="fixed bottom-24 right-6 w-full max-w-96 h-[500px] bg-surface-raised backdrop-blur-xl border border-border rounded-2xl shadow-2xl flex flex-col z-40 mx-4 sm:mx-0">
          <div className="p-4 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-primary">Settings AI Assistant</h3>
                <p className="text-xs text-emerald-600 dark:text-emerald-400">Online</p>
              </div>
            </div>
          </div>
          <div className="flex-1 p-4 overflow-y-auto">
            <div className="flex gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <div className="bg-slate-100 dark:bg-zinc-900/60 p-3 rounded-xl">
                  <p className="text-sm text-secondary">Hi! I can help you configure your HR settings, manage integrations, set up notifications, and troubleshoot connectivity issues. What do you need help with?</p>
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 border-t border-border">
            <div className="flex items-center gap-2">
              <input type="text" placeholder="Ask about settings..." className="flex-1 px-4 py-2 bg-white dark:bg-zinc-900/40 border border-border rounded-xl text-primary placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500/50" />
              <button className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
                <Send className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

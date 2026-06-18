import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import {
  LayoutDashboard, FileText, TrendingUp, Bell, ChevronRight,
  Shield, X, Menu, ChevronLeft, LogOut, FolderOpen, Calendar,
  Clock, CheckCircle, XCircle, AlertTriangle, UserCheck, FileCheck,
  DollarSign, Eye, EyeOff, User, Lock, Globe, Mail, Moon, Sun, Save,
  Camera, Database, Key, Zap, Activity, CheckCircle2, Smartphone,
  RefreshCw, ChevronDown, ChevronUp, Monitor, Download, Copy, Wifi,
  Webhook, Plus, Edit3, Trash2, BarChart3, FileJson, Server, Link,
  Users, GraduationCap
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';
import { biNavigation, biProfile, biNotifications } from '../config/biConfig';

export default function BISettings() {
  const navigate = useNavigate();
  const { theme: activeTheme, setTheme } = useTheme();
  const [activeSection, setActiveSection] = useState('integrations');
  const [showApiKey, setShowApiKey] = useState({});
  const [testingConnection, setTestingConnection] = useState(null);
  const [expandedIntegration, setExpandedIntegration] = useState(null);

  const [profileSettings, setProfileSettings] = useState({
    fullName: 'Marcus Williams',
    email: 'marcus.williams@gwinnettcounty.gov',
    badge: 'BI-0001',
    phone: '(770) 619-6540',
    department: 'Backgrounds Investigation',
    position: 'BI Supervisor',
    division: 'Professional Standards',
    hireDate: '2012-07-01',
    certificationExpiry: '2026-12-31',
  });

  const [notificationSettings, setNotificationSettings] = useState({
    slaWarning: true,
    integrationFailure: true,
    backgroundCleared: true,
    referenceCheckDue: true,
    caseAssigned: true,
  });

  const [displaySettings, setDisplaySettings] = useState({
    timezone: 'America/New_York',
    dateFormat: 'MM/DD/YYYY',
    density: 'comfortable',
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: true,
    sessionTimeout: '30',
    loginNotifications: true,
    passwordExpiry: '90',
    ipWhitelist: false,
    ssoEnabled: true,
  });

  const [integrations] = useState({
    neoGov: {
      name: 'NeoGov',
      vendor: 'NEOGOV',
      type: 'hr',
      status: 'connected',
      version: 'v2024.1',
      endpoint: 'https://api.neogov.com/gwinnett/v2',
      authMethod: 'OAuth 2.0 + County SSO',
      apiKey: 'ng_live_9K1L2M3N4P5Q6R7S',
      lastSync: '15 min ago',
      syncFrequency: 'Every 30 minutes',
      dataTypes: ['Applicants', 'Background Check Requests', 'Investigation Status', 'Clearance Flags'],
      monthlyRequests: 67890,
      requestLimit: 150000,
      uptime: 99.93,
      avgResponseTime: '285ms',
      errors24h: 2,
      activeRequisitions: 12,
      pendingOnboarding: 8,
      webhooks: ['applicant.submitted', 'background.completed'],
    },
    gcicNCIC: {
      name: 'GCIC/NCIC',
      vendor: 'Georgia Bureau of Investigation',
      type: 'criminal-data',
      status: 'connected',
      version: 'CJIS v5.9',
      endpoint: 'https://gcic.georgia.gov/cjis/secure',
      authMethod: 'CJIS Certified Connection',
      apiKey: 'GCIC_CERT_2024_GCS001',
      lastSync: '30 sec ago',
      syncFrequency: 'Real-time',
      dataTypes: ['Criminal History', 'Warrants', 'Stolen Property', 'Missing Persons', 'NCIC Records'],
      monthlyRequests: 425678,
      requestLimit: 1000000,
      uptime: 99.99,
      avgResponseTime: '89ms',
      errors24h: 0,
      webhooks: [],
    },
    tylerOdyssey: {
      name: 'Tyler Odyssey',
      vendor: 'Tyler Technologies',
      type: 'courts',
      status: 'connected',
      version: 'v2024.2',
      endpoint: 'https://odyssey.gwinnettcounty.gov/api/v1',
      authMethod: 'API Key + County SSO',
      apiKey: 'ody_live_6R7S8T9U1V2W3X4Y',
      lastSync: '15 min ago',
      syncFrequency: 'Every 30 minutes',
      dataTypes: ['Court Cases', 'Warrants', 'Commitments', 'Dispositions', 'Citations'],
      monthlyRequests: 178456,
      requestLimit: 300000,
      uptime: 99.95,
      avgResponseTime: '285ms',
      errors24h: 2,
      activeWarrants: 234,
      webhooks: ['warrant.issued', 'case.updated'],
    },
    smartJAIL: {
      name: 'SmartJAIL (SmartCOP)',
      vendor: 'SmartCOP',
      type: 'jail',
      status: 'connected',
      version: 'v12.8.4',
      endpoint: 'https://smartjail.gwinnettcounty.gov/api/v2',
      authMethod: 'API Key + SAML SSO',
      apiKey: 'sj_live_3C4D5E6F7G8H9J1K',
      lastSync: '2 min ago',
      syncFrequency: 'Every 2 minutes',
      dataTypes: ['Custody Status', 'Bookings', 'Releases', 'Classifications', 'Criminal History'],
      monthlyRequests: 456892,
      requestLimit: 750000,
      uptime: 99.96,
      avgResponseTime: '165ms',
      errors24h: 3,
      currentInmates: 842,
      capacity: 920,
      webhooks: ['inmate.booked', 'inmate.released'],
    },
    microsoft365: {
      name: 'Microsoft 365',
      vendor: 'Microsoft',
      type: 'email-collab',
      status: 'connected',
      version: 'Exchange Online',
      endpoint: 'https://graph.microsoft.com/v1.0',
      authMethod: 'OAuth 2.0 + Azure AD',
      apiKey: 'ms_live_8T9U1V2W3X4Y5Z6A',
      lastSync: '1 min ago',
      syncFrequency: 'Real-time',
      dataTypes: ['Email', 'Calendar', 'Contacts', 'Teams', 'SharePoint'],
      monthlyRequests: 1567890,
      requestLimit: 5000000,
      uptime: 99.99,
      avgResponseTime: '78ms',
      errors24h: 1,
      activeUsers: 12,
      webhooks: ['email.received', 'meeting.created'],
    },
    gaPOST: {
      name: 'GA POST Certification',
      vendor: 'Georgia Peace Officer Standards & Training',
      type: 'training',
      status: 'connected',
      version: 'v3.1.5',
      endpoint: 'https://post.ga.gov/api/certifications',
      authMethod: 'API Key + Agency Certificate',
      apiKey: 'post_live_3N4P5Q6R7S8T9U1V',
      lastSync: '1 hour ago',
      syncFrequency: 'Daily',
      dataTypes: ['Investigator Certifications', 'POST Compliance', 'Training Records'],
      monthlyRequests: 12456,
      requestLimit: 50000,
      uptime: 99.85,
      avgResponseTime: '450ms',
      errors24h: 0,
      expiringSoon: 3,
      webhooks: ['cert.expiring'],
    },
  });

  const settingsTabs = [
    { id: 'integrations', label: 'Integrations',       icon: Link,     tier: 1 },
    { id: 'security',     label: 'Security',            icon: Lock,     tier: 1 },
    { id: 'audit',        label: 'Audit & Compliance',  icon: FileText, tier: 1 },
    { id: 'data',         label: 'Backup & Retention',  icon: Database, tier: 1 },
    { id: 'profile',      label: 'Profile',             icon: User,     tier: 2 },
    { id: 'notifications',label: 'Notifications',       icon: Bell,     tier: 2 },
    { id: 'display',      label: 'Display',             icon: Monitor,  tier: 2 },
  ];

  const getIntegrationIcon = (type) => {
    const icons = { 'hr': Users, 'criminal-data': Shield, 'courts': FileText, 'jail': Database, 'email-collab': Mail, 'training': GraduationCap };
    return icons[type] || Server;
  };

  const getStatusColor  = (s) => s === 'connected' ? 'text-green-400' : 'text-red-400';
  const getStatusBg     = (s) => s === 'connected' ? 'bg-green-500/20' : 'bg-red-500/20';
  const getStatusBorder = (s) => s === 'connected' ? 'border-green-500/30' : 'border-red-500/30';

  const handleTestConnection = async (key) => {
    setTestingConnection(key);
    await new Promise(r => setTimeout(r, 2000));
    setTestingConnection(null);
    alert(`Connection test successful for ${integrations[key].name}`);
  };

  const handleCopyApiKey = (val) => {
    navigator.clipboard.writeText(val);
    alert('Copied to clipboard');
  };

  const handleSaveSettings = () => alert('Settings saved successfully!');

  return (
    <DashboardLayout navigation={biNavigation} profile={biProfile} notifications={biNotifications}>
      <div className="p-5 lg:p-8 space-y-8 min-h-full">
        <div className="max-w-[1600px] mx-auto">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-primary mb-1">Settings & Configuration</h2>
            <p className="text-xs text-slate-500">Manage your account, BI system integrations, and enterprise settings</p>
          </div>

          {/* System Status Banner */}
          <div className="mb-6 bg-gradient-to-r from-green-500/10 to-emerald-500/5 border border-green-500/20 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <h4 className="text-base font-semibold text-primary">All Systems Operational</h4>
                  <p className="text-sm text-secondary">6 integrations active • 99.93% average uptime • Last sync: 1 min ago</p>
                </div>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-lg">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-semibold text-green-400 uppercase">Live</span>
              </div>
            </div>
          </div>

          {/* Role Badge */}
          <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 bg-amber-500/20 border border-amber-500/30 rounded-xl">
            <Shield className="w-4 h-4 text-amber-700" />
            <span className="text-sm font-semibold text-amber-700 uppercase">Backgrounds Investigation Access Level</span>
          </div>

          {/* Tab Navigation */}
          <div className="mb-6 flex gap-1 border-b border-border overflow-x-auto scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
            {settingsTabs.map((tab, idx) => {
              const Icon = tab.icon;
              const prevTier = idx > 0 ? settingsTabs[idx - 1].tier : tab.tier;
              const showDivider = tab.tier !== prevTier;
              return (
                <React.Fragment key={tab.id}>
                  {showDivider && <div className="self-center mx-1 w-px h-5 bg-white dark:bg-zinc-800/60" />}
                  <button
                    onClick={() => setActiveSection(tab.id)}
                    className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-all relative whitespace-nowrap ${
                      activeSection === tab.id ? 'text-amber-700' : 'text-muted hover:text-slate-700 dark:hover:text-slate-300'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                    {activeSection === tab.id && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500"></div>}
                  </button>
                </React.Fragment>
              );
            })}
          </div>

          <div className="space-y-6">

            {/* Integrations */}
            {activeSection === 'integrations' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-sm font-semibold text-primary">BI System Integrations</h3>
                  <span className="text-[10px] text-slate-500">Last updated: {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                </div>
                {Object.entries(integrations).map(([key, integration]) => {
                  const Icon = getIntegrationIcon(integration.type);
                  const isExpanded = expandedIntegration === key;
                  return (
                    <div key={key} className="bg-white dark:bg-zinc-900/25 border border-border dark:border-slate-700/30 rounded-xl overflow-hidden shadow-sm dark:shadow-none">
                      <div onClick={() => setExpandedIntegration(isExpanded ? null : key)} className="p-6 cursor-pointer hover:bg-slate-50 dark:hover:bg-zinc-900/20 transition-colors">
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 ${getStatusBg(integration.status)} border ${getStatusBorder(integration.status)} rounded-xl flex items-center justify-center`}>
                            <Icon className={`w-6 h-6 ${getStatusColor(integration.status)}`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 mb-1">
                              <h4 className="text-base font-semibold text-primary">{integration.name}</h4>
                              <div className={`flex items-center gap-1.5 px-2 py-1 ${getStatusBg(integration.status)} border ${getStatusBorder(integration.status)} rounded-md`}>
                                <div className={`w-1.5 h-1.5 ${integration.status === 'connected' ? 'bg-green-400' : 'bg-red-400'} rounded-full`}></div>
                                <span className={`text-xs font-medium ${getStatusColor(integration.status)}`}>{integration.status === 'connected' ? 'Connected' : 'Disconnected'}</span>
                              </div>
                              <span className="text-xs text-muted">{integration.version}</span>
                            </div>
                            <div className="flex items-center gap-4 text-xs text-muted">
                              <span className="flex items-center gap-1"><Activity className="w-3 h-3" />{integration.uptime}% uptime</span>
                              <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{integration.avgResponseTime}</span>
                              <span className="flex items-center gap-1"><RefreshCw className="w-3 h-3" />{integration.lastSync}</span>
                            </div>
                          </div>
                          <button className="p-2 hover:bg-slate-200 dark:hover:bg-zinc-800/40 rounded-lg transition-colors">
                            {isExpanded ? <ChevronUp className="w-5 h-5 text-muted" /> : <ChevronDown className="w-5 h-5 text-muted" />}
                          </button>
                        </div>
                      </div>
                      {isExpanded && (
                        <div className="px-6 pb-6 border-t border-border dark:border-slate-700/30">
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                            <div className="space-y-6">
                              <div><p className="text-xs font-medium text-muted mb-2">Vendor</p><p className="text-sm text-primary">{integration.vendor}</p></div>
                              <div>
                                <p className="text-xs font-medium text-muted mb-2">API Endpoint</p>
                                <div className="flex items-center gap-2">
                                  <code className="flex-1 text-xs text-blue-400 bg-slate-100 dark:bg-zinc-950/50 px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700/50 overflow-x-auto">{integration.endpoint}</code>
                                  <button onClick={() => handleCopyApiKey(integration.endpoint)} className="p-2 hover:bg-slate-200 dark:hover:bg-zinc-800/40 rounded-lg transition-colors"><Copy className="w-4 h-4 text-muted" /></button>
                                </div>
                              </div>
                              <div><p className="text-xs font-medium text-muted mb-2">Authentication Method</p><p className="text-sm text-primary">{integration.authMethod}</p></div>
                              <div>
                                <p className="text-xs font-medium text-muted mb-2">API Key</p>
                                <div className="flex items-center gap-2">
                                  <code className="flex-1 text-xs text-amber-700 bg-slate-100 dark:bg-zinc-950/50 px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700/50">
                                    {showApiKey[key] ? integration.apiKey : '••••••••••••••••••••'}
                                  </code>
                                  <button onClick={() => setShowApiKey({...showApiKey, [key]: !showApiKey[key]})} className="p-2 hover:bg-slate-200 dark:hover:bg-zinc-800/40 rounded-lg transition-colors">
                                    {showApiKey[key] ? <EyeOff className="w-4 h-4 text-muted" /> : <Eye className="w-4 h-4 text-muted" />}
                                  </button>
                                  <button onClick={() => handleCopyApiKey(integration.apiKey)} className="p-2 hover:bg-slate-200 dark:hover:bg-zinc-800/40 rounded-lg transition-colors"><Copy className="w-4 h-4 text-muted" /></button>
                                </div>
                              </div>
                            </div>
                            <div className="space-y-6">
                              <div><p className="text-xs font-medium text-muted mb-2">Sync Frequency</p><p className="text-sm text-primary">{integration.syncFrequency}</p></div>
                              <div>
                                <p className="text-xs font-medium text-muted mb-2">Data Types</p>
                                <div className="flex flex-wrap gap-2">
                                  {integration.dataTypes.map((type, i) => (
                                    <span key={i} className="px-2 py-1 bg-slate-200 dark:bg-zinc-800/40 border border-slate-300 dark:border-slate-600/50 rounded-md text-xs text-secondary">{type}</span>
                                  ))}
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-6">
                                <div>
                                  <p className="text-xs font-medium text-muted mb-2">Monthly Requests</p>
                                  <p className="text-sm text-primary">{integration.monthlyRequests.toLocaleString()} / {integration.requestLimit.toLocaleString()}</p>
                                  <div className="mt-2 h-2 bg-slate-200 dark:bg-zinc-800/40 rounded-full overflow-hidden">
                                    <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-500" style={{width: `${(integration.monthlyRequests / integration.requestLimit) * 100}%`}}></div>
                                  </div>
                                </div>
                                <div><p className="text-xs font-medium text-muted mb-2">24h Errors</p><p className="text-sm text-primary">{integration.errors24h} errors</p></div>
                              </div>
                              {integration.webhooks && integration.webhooks.length > 0 && (
                                <div>
                                  <p className="text-xs font-medium text-muted mb-2">Active Webhooks</p>
                                  <div className="space-y-1">
                                    {integration.webhooks.map((wh, i) => (
                                      <div key={i} className="flex items-center gap-2 text-xs text-secondary">
                                        <Webhook className="w-3 h-3 text-muted" />
                                        <code className="text-green-400">{wh}</code>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                          {(integration.activeRequisitions || integration.pendingOnboarding || integration.currentInmates || integration.activeUsers || integration.expiringSoon || integration.activeWarrants) && (
                            <div className="mt-6 pt-6 border-t border-border dark:border-slate-700/30">
                              <p className="text-xs font-medium text-muted mb-3">Live Metrics</p>
                              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                {integration.activeRequisitions && <div className="bg-slate-50 dark:bg-zinc-950/50 border border-border rounded-xl p-4"><p className="text-xs text-muted mb-1">Active Requisitions</p><p className="text-sm font-semibold text-primary">{integration.activeRequisitions}</p></div>}
                                {integration.pendingOnboarding && <div className="bg-slate-50 dark:bg-zinc-950/50 border border-border rounded-xl p-4"><p className="text-xs text-muted mb-1">Pending Background Checks</p><p className="text-sm font-semibold text-amber-700">{integration.pendingOnboarding}</p></div>}
                                {integration.currentInmates && <div className="bg-slate-50 dark:bg-zinc-950/50 border border-border rounded-xl p-4"><p className="text-xs text-muted mb-1">Current Inmates</p><p className="text-sm font-semibold text-primary">{integration.currentInmates}/{integration.capacity}</p></div>}
                                {integration.activeUsers && <div className="bg-slate-50 dark:bg-zinc-950/50 border border-border rounded-xl p-4"><p className="text-xs text-muted mb-1">Active Investigators</p><p className="text-sm font-semibold text-primary">{integration.activeUsers}</p></div>}
                                {integration.expiringSoon && <div className="bg-slate-50 dark:bg-zinc-950/50 border border-border rounded-xl p-4"><p className="text-xs text-muted mb-1">Certs Expiring Soon</p><p className="text-sm font-semibold text-red-400">{integration.expiringSoon}</p></div>}
                                {integration.activeWarrants && <div className="bg-slate-50 dark:bg-zinc-950/50 border border-border rounded-xl p-4"><p className="text-xs text-muted mb-1">Active Warrants</p><p className="text-sm font-semibold text-amber-700">{integration.activeWarrants}</p></div>}
                              </div>
                            </div>
                          )}
                          <div className="mt-6 flex items-center gap-3">
                            <button onClick={() => handleTestConnection(key)} disabled={testingConnection === key} className="flex items-center gap-2 px-4 py-2 bg-blue-500/20 border border-blue-500/30 text-blue-400 rounded-xl text-sm font-medium hover:bg-blue-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                              {testingConnection === key ? <><RefreshCw className="w-4 h-4 animate-spin" />Testing...</> : <><Wifi className="w-4 h-4" />Test Connection</>}
                            </button>
                            <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-zinc-800/40 border border-slate-300 dark:border-slate-600/50 text-secondary rounded-xl text-sm font-medium hover:bg-slate-200 dark:hover:bg-zinc-800/60 transition-all"><RefreshCw className="w-4 h-4" />Sync Now</button>
                            <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-zinc-800/40 border border-slate-300 dark:border-slate-600/50 text-secondary rounded-xl text-sm font-medium hover:bg-slate-200 dark:hover:bg-zinc-800/60 transition-all"><Shield className="w-4 h-4" />Configure</button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* Security */}
            {activeSection === 'security' && (
              <div className="space-y-6">
                <div className="bg-white dark:bg-zinc-900/25 border border-border dark:border-slate-700/30 rounded-xl shadow-sm dark:shadow-none p-6">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-sm font-semibold text-primary">Authentication & Access</h3>
                    <span className="text-[10px] text-slate-500">Last updated: Dec 9, 2025 11:42 AM</span>
                  </div>
                  <p className="text-xs text-slate-500 mb-6">Multi-factor authentication, session management, and CJIS-compliant access controls.</p>
                  <div className="space-y-6">
                    {[
                      { key: 'twoFactorAuth', label: 'Two-Factor Authentication', desc: 'Required for CJIS compliance — all BI access', extra: 'CJIS Required' },
                      { key: 'loginNotifications', label: 'Login Notifications', desc: 'Notify on new device login' },
                      { key: 'ipWhitelist', label: 'IP Whitelist', desc: 'Restrict GCIC/NCIC access to approved IPs' },
                    ].map((item) => (
                      <div key={item.key} className="flex items-center justify-between py-3 border-b border-border dark:border-slate-700/30">
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-primary">{item.label}</h4>
                          <p className="text-xs text-muted mt-1">{item.desc}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          {item.extra && <span className="text-xs font-medium text-green-400">{item.extra}</span>}
                          <button onClick={() => setSecuritySettings({...securitySettings, [item.key]: !securitySettings[item.key]})} className={`relative w-12 h-6 rounded-full transition-colors ${securitySettings[item.key] ? 'bg-green-500' : 'bg-slate-600'}`}>
                            <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${securitySettings[item.key] ? 'translate-x-6' : 'translate-x-0'}`}></div>
                          </button>
                        </div>
                      </div>
                    ))}
                    <div>
                      <label className="block text-sm font-medium text-secondary mb-2">Session Timeout (minutes)</label>
                      <select value={securitySettings.sessionTimeout} onChange={(e) => setSecuritySettings({...securitySettings, sessionTimeout: e.target.value})} className="w-full px-4 py-2.5 bg-white dark:bg-zinc-900/40 border border-slate-300 dark:border-slate-700/50 rounded-xl text-slate-900 dark:text-primary focus:outline-none focus:border-amber-500/50 transition-colors">
                        <option value="15">15 minutes</option>
                        <option value="30">30 minutes</option>
                        <option value="60">1 hour</option>
                        <option value="120">2 hours</option>
                        <option value="480">8 hours</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-secondary mb-2">Password Expiry (days)</label>
                      <select value={securitySettings.passwordExpiry} onChange={(e) => setSecuritySettings({...securitySettings, passwordExpiry: e.target.value})} className="w-full px-4 py-2.5 bg-white dark:bg-zinc-900/40 border border-slate-300 dark:border-slate-700/50 rounded-xl text-slate-900 dark:text-primary focus:outline-none focus:border-amber-500/50 transition-colors">
                        <option value="30">30 days</option>
                        <option value="60">60 days</option>
                        <option value="90">90 days (CJIS Recommended)</option>
                        <option value="180">180 days</option>
                      </select>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-border dark:border-slate-700/30">
                      <div className="flex-1"><h4 className="text-sm font-medium text-primary">Audit Logging</h4><p className="text-xs text-muted mt-1">CJIS mandated — all GCIC/NCIC queries are logged</p></div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-medium text-green-400">CJIS Required</span>
                        <button disabled className="relative w-12 h-6 rounded-full bg-green-500 cursor-not-allowed opacity-75"><div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full translate-x-6"></div></button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between py-3">
                      <div className="flex-1"><h4 className="text-sm font-medium text-primary">SSO Integration</h4><p className="text-xs text-muted mt-1">Single Sign-On with County AD</p></div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-medium text-green-400">Active</span>
                        <button onClick={() => setSecuritySettings({...securitySettings, ssoEnabled: !securitySettings.ssoEnabled})} className={`relative w-12 h-6 rounded-full transition-colors ${securitySettings.ssoEnabled ? 'bg-green-500' : 'bg-slate-600'}`}>
                          <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${securitySettings.ssoEnabled ? 'translate-x-6' : 'translate-x-0'}`}></div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-white dark:bg-zinc-900/25 border border-border dark:border-slate-700/30 rounded-xl shadow-sm dark:shadow-none p-6">
                  <h3 className="text-sm font-semibold text-primary mb-6">Active Sessions</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-zinc-900/30 border border-border dark:border-slate-700/30 rounded-xl">
                      <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center"><Monitor className="w-5 h-5 text-green-400" /></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-primary">Chrome on Windows • Current Session</p>
                        <p className="text-xs text-muted">BI Investigations Unit • 172.16.45.120</p>
                        <p className="text-xs text-slate-500 mt-1">Last active: Just now</p>
                      </div>
                      <div className="px-3 py-1.5 bg-green-500/20 border border-green-500/30 rounded-lg"><span className="text-xs font-medium text-green-400">Active</span></div>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-zinc-900/30 border border-border dark:border-slate-700/30 rounded-xl">
                      <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center"><Monitor className="w-5 h-5 text-blue-400" /></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-primary">Chrome on MacBook • Investigator Workstation</p>
                        <p className="text-xs text-muted">BI Office • 172.16.45.122</p>
                        <p className="text-xs text-slate-500 mt-1">Last active: 2 hours ago</p>
                      </div>
                      <button className="px-3 py-1.5 bg-red-500/20 border border-red-500/30 text-red-400 rounded-lg text-xs font-medium hover:bg-red-500/30 transition-all">Revoke</button>
                    </div>
                  </div>
                </div>
                <div className="bg-white dark:bg-zinc-900/25 border border-border dark:border-slate-700/30 rounded-xl shadow-sm dark:shadow-none p-6">
                  <h3 className="text-sm font-semibold text-primary mb-4">Change Password</h3>
                  <div className="space-y-6">
                    {['Current Password', 'New Password', 'Confirm New Password'].map((label, i) => (
                      <div key={i}>
                        <label className="block text-sm font-medium text-secondary mb-2">{label}</label>
                        <input type="password" className="w-full px-4 py-2.5 bg-white dark:bg-zinc-900/40 border border-slate-300 dark:border-slate-700/50 rounded-xl text-primary placeholder-slate-500 focus:outline-none focus:border-amber-500/50 transition-colors" placeholder={`Enter ${label.toLowerCase()}`} />
                      </div>
                    ))}
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-500/20 border border-blue-500/30 text-blue-400 rounded-xl text-sm font-medium hover:bg-blue-500/30 transition-all"><Key className="w-4 h-4" />Update Password</button>
                  </div>
                </div>
              </div>
            )}

            {/* Audit & Compliance */}
            {activeSection === 'audit' && (
              <div className="bg-white dark:bg-zinc-900/25 border border-border dark:border-slate-700/30 rounded-xl shadow-sm dark:shadow-none p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-sm font-semibold text-primary">Audit & Compliance Trail</h3>
                    <p className="text-xs text-slate-500 mt-1">Recent BI actions, GCIC queries, and system events. All changes are logged per CJIS requirements.</p>
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2 bg-blue-500/20 border border-blue-500/30 text-blue-400 rounded-xl text-sm font-medium hover:bg-blue-500/30 transition-all"><Download className="w-4 h-4" />Export Logs</button>
                </div>
                <div className="space-y-3">
                  {[
                    { Icon: FileText, bg: 'bg-blue-500/20', iconColor: 'text-blue-400', title: 'Case Opened', tag: 'BI Action', tagBg: 'bg-blue-500/20', tagBorder: 'border-blue-500/30', tagText: 'text-blue-400', desc: 'Inv. Rodriguez opened background investigation for Deputy Candidate Williams (BI-0000009)', meta: ['Case: BI-0000009', 'Investigator: Rodriguez', '20 minutes ago'] },
                    { Icon: Lock, bg: 'bg-green-500/20', iconColor: 'text-green-400', title: 'Successful Login', tag: 'Authentication', tagBg: 'bg-green-500/20', tagBorder: 'border-green-500/30', tagText: 'text-green-400', desc: 'BI Supervisor logged in from Investigations Unit', meta: ['IP: 172.16.45.120', '2FA: Verified', '2 hours ago'] },
                    { Icon: RefreshCw, bg: 'bg-purple-500/20', iconColor: 'text-purple-400', title: 'NeoGov Synced', tag: 'Integration', tagBg: 'bg-purple-500/20', tagBorder: 'border-purple-500/30', tagText: 'text-purple-400', desc: 'Background check queue sync completed: 2 new cases received', meta: ['Records: 2 new', 'Duration: 0.9s', '3 hours ago'] },
                    { Icon: CheckCircle, bg: 'bg-green-500/20', iconColor: 'text-green-400', title: 'Background Cleared', tag: 'BI Action', tagBg: 'bg-blue-500/20', tagBorder: 'border-blue-500/30', tagText: 'text-blue-400', desc: 'Inv. Chen cleared candidate Thompson — no disqualifying findings (BI-0000006)', meta: ['Case: BI-0000006', 'Cleared by: Inv. Chen', '5 hours ago'] },
                    { Icon: AlertTriangle, bg: 'bg-amber-500/20', iconColor: 'text-amber-700', title: 'SLA Warning Logged', tag: 'Compliance', tagBg: 'bg-amber-500/20', tagBorder: 'border-amber-500/30', tagText: 'text-amber-700', desc: 'BI-0000007 Ramirez hit day 12 — supervisor notified per SLA policy', meta: ['Case: BI-0000007', 'Day 12 of 18', '8 hours ago'] },
                    { Icon: FileCheck, bg: 'bg-slate-500/20', iconColor: 'text-slate-400', title: 'Adjudication Submitted', tag: 'BI Action', tagBg: 'bg-blue-500/20', tagBorder: 'border-blue-500/30', tagText: 'text-blue-400', desc: 'Case BI-0000003 Martinez submitted for final adjudication review', meta: ['Case: BI-0000003', 'Stage: Final Review', '12 hours ago'] },
                  ].map((event, i) => (
                    <div key={i} className="flex items-start gap-4 p-4 bg-slate-50 dark:bg-zinc-900/30 border border-border dark:border-slate-700/30 rounded-xl">
                      <div className={`w-10 h-10 ${event.bg} rounded-xl flex items-center justify-center flex-shrink-0`}><event.Icon className={`w-5 h-5 ${event.iconColor}`} /></div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="text-sm font-medium text-primary">{event.title}</p>
                          <span className={`px-2 py-0.5 ${event.tagBg} border ${event.tagBorder} rounded text-xs ${event.tagText}`}>{event.tag}</span>
                        </div>
                        <p className="text-xs text-muted">{event.desc}</p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-slate-500">
                          {event.meta.map((m, j) => <span key={j}>{m}</span>)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex justify-center">
                  <button className="px-4 py-2 bg-slate-100 dark:bg-zinc-800/40 border border-slate-300 dark:border-slate-600/50 text-secondary rounded-xl text-sm font-medium hover:bg-slate-200 dark:hover:bg-zinc-800/60 transition-all">Load More</button>
                </div>
              </div>
            )}

            {/* Backup & Retention */}
            {activeSection === 'data' && (
              <div className="space-y-6">
                <div className="bg-white dark:bg-zinc-900/25 border border-border dark:border-slate-700/30 rounded-xl shadow-sm dark:shadow-none p-6">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-sm font-semibold text-primary">Data Export</h3>
                    <span className="text-[10px] text-slate-500">Last updated: {new Date().toLocaleDateString()} 02:00 AM</span>
                  </div>
                  <p className="text-xs text-slate-500 mb-6">Export investigation case files, reference logs, CJIS query logs, and audit trails.</p>
                  <div className="space-y-6">
                    {[
                      { Icon: FileText, color: 'blue', label: 'Investigation Case Files', desc: 'Export all background investigation records', fmt: 'Export CSV' },
                      { Icon: UserCheck, color: 'green', label: 'Interview & Reference Logs', desc: 'Export interview notes and reference check records', fmt: 'Export PDF' },
                      { Icon: Shield, color: 'purple', label: 'GCIC/NCIC Query Logs', desc: 'CJIS-required query log export', fmt: 'Export JSON' },
                      { Icon: FileCheck, color: 'amber', label: 'Audit Trail', desc: 'Export full BI operations audit log', fmt: 'Export CSV' },
                    ].map((item, i) => (
                      <div key={i} className="p-4 bg-slate-50 dark:bg-zinc-900/30 border border-border dark:border-slate-700/30 rounded-xl">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 bg-${item.color}-500/20 rounded-xl flex items-center justify-center`}><item.Icon className={`w-5 h-5 text-${item.color}-400`} /></div>
                            <div><h4 className="text-sm font-medium text-primary">{item.label}</h4><p className="text-xs text-muted">{item.desc}</p></div>
                          </div>
                          <button className="flex items-center gap-2 px-4 py-2 bg-blue-500/20 border border-blue-500/30 text-blue-400 rounded-xl text-sm font-medium hover:bg-blue-500/30 transition-all"><Download className="w-4 h-4" />{item.fmt}</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-white dark:bg-zinc-900/25 border border-border dark:border-slate-700/30 rounded-xl shadow-sm dark:shadow-none p-6">
                  <h3 className="text-sm font-semibold text-primary mb-6">Backup & Restore</h3>
                  <div className="space-y-6">
                    <div className="p-4 bg-slate-50 dark:bg-zinc-900/30 border border-border dark:border-slate-700/30 rounded-xl">
                      <div className="flex items-center justify-between mb-3">
                        <div><h4 className="text-sm font-medium text-primary mb-1">Last Backup</h4><p className="text-xs text-muted">Today at 2:00 AM EST</p></div>
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/20 border border-green-500/30 rounded-lg"><CheckCircle2 className="w-4 h-4 text-green-400" /><span className="text-xs font-medium text-green-400">Successful</span></div>
                      </div>
                      <div className="flex gap-3 mt-4">
                        <button className="flex items-center gap-2 px-4 py-2 bg-blue-500/20 border border-blue-500/30 text-blue-400 rounded-xl text-sm font-medium hover:bg-blue-500/30 transition-all"><Download className="w-4 h-4" />Download Backup</button>
                        <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-zinc-800/40 border border-slate-300 dark:border-slate-600/50 text-secondary rounded-xl text-sm font-medium hover:bg-slate-200 dark:hover:bg-zinc-800/60 transition-all"><RefreshCw className="w-4 h-4" />Create New Backup</button>
                      </div>
                    </div>
                    <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="w-5 h-5 text-amber-700 mt-0.5 flex-shrink-0" />
                        <div><p className="text-sm font-medium text-amber-300">Backup Schedule</p><p className="text-xs text-amber-200/70 mt-1">Automated backups run daily at 2:00 AM EST. Case records are retained per law enforcement records management standards. CJIS query logs are separately archived.</p></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-white dark:bg-zinc-900/25 border border-border dark:border-slate-700/30 rounded-xl shadow-sm dark:shadow-none p-6">
                  <h3 className="text-sm font-semibold text-primary mb-6">Data Retention</h3>
                  <div className="space-y-6">
                    {[
                      { label: 'Case Records Retention', opts: [['2555','7 years (LE Standard)'],['3650','10 years'],['permanent','Permanent']] },
                      { label: 'CJIS Query Logs Retention', opts: [['365','1 year (CJIS Required)'],['730','2 years'],['1825','5 years']] },
                      { label: 'Integration Logs Retention', opts: [['30','30 days (Recommended)'],['60','60 days'],['90','90 days']] },
                      { label: 'Audit Trail Retention', opts: [['1825','5 years (Recommended)'],['3650','10 years'],['permanent','Permanent']] },
                    ].map((item, i) => (
                      <div key={i}>
                        <label className="block text-sm font-medium text-secondary mb-2">{item.label}</label>
                        <select className="w-full px-4 py-2.5 bg-white dark:bg-zinc-900/40 border border-slate-300 dark:border-slate-700/50 rounded-xl text-slate-900 dark:text-primary focus:outline-none focus:border-amber-500/50 transition-colors">
                          {item.opts.map(([val, label]) => <option key={val} value={val}>{label}</option>)}
                        </select>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Profile */}
            {activeSection === 'profile' && (
              <>
                <div className="bg-white dark:bg-zinc-900/25 border border-border dark:border-slate-700/30 rounded-xl shadow-sm dark:shadow-none p-6">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-sm font-semibold text-primary">Profile Information</h3>
                    <span className="text-[10px] text-slate-500">Last updated: Dec 11, 2025 09:14 AM</span>
                  </div>
                  <div className="flex items-center gap-2 mb-6"><div className="w-2 h-2 bg-green-400 rounded-full"></div><span className="text-xs font-medium text-green-400">Verified Account</span></div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                      { label: 'Full Name', field: 'fullName', type: 'text', editable: true },
                      { label: 'Email Address', field: 'email', type: 'email', editable: true },
                      { label: 'Badge Number', field: 'badge', type: 'text', editable: false },
                      { label: 'Phone Number', field: 'phone', type: 'tel', editable: true },
                      { label: 'Department', field: 'department', type: 'text', editable: false },
                      { label: 'Position', field: 'position', type: 'text', editable: false },
                      { label: 'Division', field: 'division', type: 'text', editable: false },
                      { label: 'Hire Date', field: 'hireDate', type: 'text', editable: false },
                      { label: 'Certification Expiry', field: 'certificationExpiry', type: 'text', editable: false },
                    ].map((f) => (
                      <div key={f.field}>
                        <label className="block text-sm font-medium text-secondary mb-2">{f.label}</label>
                        <input type={f.type} value={profileSettings[f.field]} disabled={!f.editable} onChange={(e) => f.editable && setProfileSettings({...profileSettings, [f.field]: e.target.value})}
                          className={`w-full px-4 py-2.5 border rounded-xl text-primary focus:outline-none transition-colors ${f.editable ? 'bg-white dark:bg-zinc-900/40 border-slate-300 dark:border-slate-700/50 focus:border-amber-500/50' : 'bg-slate-100 dark:bg-zinc-900/20 border-border text-muted cursor-not-allowed'}`} />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-white dark:bg-zinc-900/40 border border-border rounded-xl shadow-sm dark:shadow-none p-6">
                  <h3 className="text-lg font-semibold text-primary mb-4">Profile Photo</h3>
                  <div className="flex items-center gap-6">
                    <div className="w-24 h-24 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center"><span className="text-primary text-3xl font-bold">MW</span></div>
                    <div className="flex-1">
                      <p className="text-sm text-secondary mb-3">Update your profile photo. Recommended size: 400x400px</p>
                      <div className="flex gap-3">
                        <button className="flex items-center gap-2 px-4 py-2 bg-blue-500/20 border border-blue-500/30 text-blue-400 rounded-xl text-sm font-medium hover:bg-blue-500/30 transition-all"><Camera className="w-4 h-4" />Upload Photo</button>
                        <button className="px-4 py-2 bg-slate-100 dark:bg-zinc-800/40 border border-slate-300 dark:border-slate-600/50 text-secondary rounded-xl text-sm font-medium hover:bg-slate-200 dark:hover:bg-zinc-800/60 transition-all">Remove</button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Notifications */}
            {activeSection === 'notifications' && (
              <div className="bg-white dark:bg-zinc-900/25 border border-border dark:border-slate-700/30 rounded-xl shadow-sm dark:shadow-none p-6">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-sm font-semibold text-primary">Operational Alert Preferences</h3>
                  <span className="text-[10px] text-slate-500">Last updated: Dec 11, 2025 09:14 AM</span>
                </div>
                <p className="text-xs text-slate-500 mb-6">Only critical BI operational events are surfaced here.</p>
                <div className="space-y-6">
                  {[
                    { key: 'slaWarning', title: 'SLA Deadline Warning', desc: 'Alert when a case approaches its SLA ceiling with no stage clearance' },
                    { key: 'integrationFailure', title: 'Integration Failure', desc: 'Alert when GCIC/NCIC or NeoGov sync fails or loses connection' },
                    { key: 'backgroundCleared', title: 'Background Cleared / Denied', desc: 'Alert when a final adjudication decision is recorded' },
                    { key: 'referenceCheckDue', title: 'Reference Check Due', desc: 'Alert when a scheduled reference call has not been completed' },
                    { key: 'caseAssigned', title: 'Case Assigned to Investigator', desc: 'Alert when a new case is routed to an investigator queue' },
                  ].map((item, idx, arr) => (
                    <div key={item.key} className={`flex items-center justify-between py-3 ${idx < arr.length - 1 ? 'border-b border-border dark:border-slate-700/20' : ''}`}>
                      <div className="flex-1"><h4 className="text-sm font-medium text-primary">{item.title}</h4><p className="text-xs text-muted mt-1">{item.desc}</p></div>
                      <button onClick={() => setNotificationSettings({...notificationSettings, [item.key]: !notificationSettings[item.key]})} className={`relative w-12 h-6 rounded-full transition-colors ${notificationSettings[item.key] ? 'bg-green-500' : 'bg-slate-600'}`}>
                        <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${notificationSettings[item.key] ? 'translate-x-6' : 'translate-x-0'}`}></div>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Display */}
            {activeSection === 'display' && (
              <div className="bg-white dark:bg-zinc-900/25 border border-border dark:border-slate-700/30 rounded-xl shadow-sm dark:shadow-none p-6">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-sm font-semibold text-primary">Display Preferences</h3>
                  <span className="text-[10px] text-slate-500">Last updated: Dec 10, 2025 02:30 PM</span>
                </div>
                <p className="text-xs text-slate-500 mb-6">Theme, timezone, date format, and dashboard density.</p>
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-secondary mb-3">Theme</label>
                    <div className="grid grid-cols-3 gap-3">
                      {[{ value: 'dark', label: 'Dark', Icon: Moon }, { value: 'light', label: 'Light', Icon: Sun }, { value: 'auto', label: 'Auto', Icon: Monitor }].map(t => (
                        <button key={t.value} onClick={() => setTheme(t.value)} className={`p-4 rounded-xl border-2 transition-all ${activeTheme === t.value ? 'border-amber-500 bg-amber-100 dark:bg-zinc-900/60' : 'border-border bg-white dark:bg-zinc-900/20 hover:bg-slate-50 dark:hover:bg-zinc-900/40'}`}>
                          <t.Icon className="w-6 h-6 text-secondary mb-2" />
                          <p className="text-sm font-medium text-slate-800 dark:text-white">{t.label}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-secondary mb-2">Timezone</label>
                    <select value={displaySettings.timezone} onChange={(e) => setDisplaySettings({...displaySettings, timezone: e.target.value})} className="w-full px-4 py-2.5 bg-white dark:bg-zinc-900/40 border border-slate-300 dark:border-slate-700/50 rounded-xl text-slate-900 dark:text-primary focus:outline-none focus:border-amber-500/50 transition-colors">
                      <option value="America/New_York">Eastern Time (ET)</option>
                      <option value="America/Chicago">Central Time (CT)</option>
                      <option value="America/Denver">Mountain Time (MT)</option>
                      <option value="America/Los_Angeles">Pacific Time (PT)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-secondary mb-2">Date Format</label>
                    <select value={displaySettings.dateFormat} onChange={(e) => setDisplaySettings({...displaySettings, dateFormat: e.target.value})} className="w-full px-4 py-2.5 bg-white dark:bg-zinc-900/40 border border-slate-300 dark:border-slate-700/50 rounded-xl text-slate-900 dark:text-primary focus:outline-none focus:border-amber-500/50 transition-colors">
                      <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                      <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                      <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-secondary mb-2">Dashboard Density</label>
                    <select value={displaySettings.density} onChange={(e) => setDisplaySettings({...displaySettings, density: e.target.value})} className="w-full px-4 py-2.5 bg-white dark:bg-zinc-900/40 border border-slate-300 dark:border-slate-700/50 rounded-xl text-slate-900 dark:text-primary focus:outline-none focus:border-amber-500/50 transition-colors">
                      <option value="compact">Compact</option>
                      <option value="comfortable">Comfortable</option>
                      <option value="spacious">Spacious</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Save Changes Footer */}
          <div className="mt-8 flex items-center justify-between p-5 bg-white dark:bg-zinc-900/25 border border-border dark:border-slate-700/30 rounded-xl shadow-sm dark:shadow-none">
            <div>
              <p className="text-sm font-medium text-primary">Unsaved Changes</p>
              <p className="text-xs text-muted mt-1">Save your changes to apply the new settings</p>
            </div>
            <div className="flex gap-3">
              <button className="px-6 py-2.5 bg-slate-100 dark:bg-zinc-800/40 border border-slate-300 dark:border-slate-600/50 text-secondary rounded-xl text-sm font-medium hover:bg-slate-200 dark:hover:bg-zinc-800/60 transition-all">Reset</button>
              <button onClick={handleSaveSettings} className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 rounded-xl text-primary text-sm font-medium shadow-lg shadow-amber-500/20 transition-all"><Save className="w-4 h-4" />Save Changes</button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

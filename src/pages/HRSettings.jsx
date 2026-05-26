import React, { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import {
  Users, FileText, LayoutDashboard, TrendingUp, Bell, ChevronRight,
  CheckCircle, Shield, X, Menu, ChevronLeft, LogOut, UserPlus, Briefcase,
  Clock, Award, Calendar, User, Lock, Globe, Mail, Moon, Sun, Save, Camera,
  Database, Key, Zap, Activity, CheckCircle2, ClipboardCheck, GraduationCap,
  FileCheck, Eye, EyeOff, Smartphone, Link, RefreshCw, AlertTriangle,
  ChevronDown, ChevronUp, Monitor, Download, Copy, Wifi, Webhook, Plus,
  Edit3, Trash2, BarChart3, FileJson, Server, HardDrive, Cpu
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';

const hrNavigation = [
  { id: 'hr-dashboard',            label: 'HR Dashboard',             icon: Users,          route: '/hr/dashboard' },
  { id: 'job-postings',            label: 'Job Postings',             icon: Briefcase,      route: '/hr/jobs' },
  { id: 'applicant-tracking',      label: 'Applicant Tracking',       icon: UserPlus,       route: '/hr/applicants' },
  { id: 'hiring-pipeline',         label: 'Hiring Pipeline',          icon: TrendingUp,     route: '/hr/pipeline' },
  { id: 'onboarding',              label: 'New Hire Onboarding',      icon: FileCheck,      route: '/hr/onboarding' },
  { id: 'training-certifications', label: 'Training & Certifications',icon: GraduationCap,  route: '/hr/training' },
  { id: 'employee-records',        label: 'Employee Records',         icon: FileText,       route: '/hr/records' },
  { id: 'time-off',                label: 'Time Off Management',      icon: Calendar,       route: '/hr/timeoff' },
  { id: 'performance',             label: 'Performance Reviews',      icon: Award,          route: '/hr/reviews' },
  { id: 'compliance',              label: 'HR Compliance',            icon: ClipboardCheck, route: '/hr/compliance' },
  { id: 'hr-reports',              label: 'HR Reports',               icon: LayoutDashboard,route: '/hr/reports' },
  { id: 'hr-calendar',             label: 'HR Calendar',              icon: Calendar,       route: '/hr/calendar' },
];

const hrProfile = {
  name: 'HR Director',
  role: 'Human Resources',
  email: 'hr.director@gcso.gov',
  initials: 'HR',
};

const hrNotifications = [
  { id: 1, title: 'POST Cert Expiring', message: 'Sgt. Thompson — cert expires in 7 days, training not scheduled', time: '30 min ago', urgent: true },
  { id: 2, title: 'FMLA Deadline Today', message: 'Deputy Chen FMLA designation notice due by 17:00', time: '1 hour ago', urgent: true },
  { id: 3, title: 'New Applicant Submitted', message: 'Deputy Sheriff — 3 new applications received', time: '2 hours ago', urgent: false },
];

export default function HRSettings() {
  const navigate = useNavigate();
  const { theme: activeTheme, setTheme } = useTheme();
  const [activeSection, setActiveSection] = useState('integrations');
  const [showApiKey, setShowApiKey] = useState({});
  const [testingConnection, setTestingConnection] = useState(null);
  const [expandedIntegration, setExpandedIntegration] = useState(null);

  const [profileSettings, setProfileSettings] = useState({
    fullName: 'Patricia Henderson',
    email: 'patricia.henderson@gwinnettcounty.gov',
    badge: 'HR-0015',
    phone: '(770) 619-6520',
    department: 'Human Resources',
    position: 'HR Director',
    division: 'Sheriff Administration',
    hireDate: '2015-03-20',
    certificationExpiry: '2026-09-30',
  });

  const [notificationSettings, setNotificationSettings] = useState({
    postCertExpiring: true,
    fmlaDeadlines: true,
    integrationFailure: true,
    newApplicant: true,
    performanceOverdue: true,
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

  const [integrations, setIntegrations] = useState({
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
      dataTypes: ['Applicants', 'Recruiting', 'Onboarding', 'Positions', 'Applications', 'Background Checks'],
      monthlyRequests: 67890,
      requestLimit: 150000,
      uptime: 99.93,
      avgResponseTime: '285ms',
      errors24h: 2,
      activeRequisitions: 12,
      pendingOnboarding: 8,
      webhooks: ['applicant.submitted', 'onboarding.started', 'background.completed'],
    },
    sapERP: {
      name: 'SAP ERP (HR/Payroll)',
      vendor: 'SAP',
      type: 'erp',
      status: 'connected',
      version: 'S/4HANA 2023',
      endpoint: 'https://sap.gwinnettcounty.gov/api/odata/v2',
      authMethod: 'SAP SSO + API Key',
      apiKey: 'sap_live_1L2M3N4P5Q6R7S8T',
      lastSync: '10 min ago',
      syncFrequency: 'Every 15 minutes',
      dataTypes: ['HR', 'Payroll', 'Finance', 'Employees', 'Time & Attendance', 'Benefits'],
      monthlyRequests: 534567,
      requestLimit: 1000000,
      uptime: 99.97,
      avgResponseTime: '195ms',
      errors24h: 1,
      employees: 856,
      webhooks: ['payroll.processed', 'employee.updated', 'timesheet.submitted'],
    },
    gcWorkplace: {
      name: 'GC Workplace',
      vendor: 'Gwinnett County IT',
      type: 'employee-portal',
      status: 'connected',
      version: 'v3.5.2',
      endpoint: 'https://gcworkplace.gwinnettcounty.gov/api',
      authMethod: 'County AD + SSO',
      apiKey: 'gcw_live_2M3N4P5Q6R7S8T9U',
      lastSync: '5 min ago',
      syncFrequency: 'Every 10 minutes',
      dataTypes: ['Procedures', 'Forms', 'Benefits', 'Policies', 'Documents'],
      monthlyRequests: 123456,
      requestLimit: 300000,
      uptime: 99.95,
      avgResponseTime: '145ms',
      errors24h: 0,
      activeUsers: 856,
      webhooks: ['document.published', 'form.submitted'],
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
      dataTypes: ['Certifications', 'Training Hours', 'Renewals', 'Compliance', 'Officer Records'],
      monthlyRequests: 12456,
      requestLimit: 50000,
      uptime: 99.85,
      avgResponseTime: '450ms',
      errors24h: 0,
      expiringSoon: 8,
      webhooks: ['cert.expiring', 'training.completed'],
    },
    uPerform: {
      name: 'UPerform',
      vendor: 'Ancile Solutions',
      type: 'learning',
      status: 'connected',
      version: 'v8.4.2',
      endpoint: 'https://uperform.gwinnettcounty.gov/api/v1',
      authMethod: 'County SSO',
      apiKey: 'up_live_4P5Q6R7S8T9U1V2W',
      lastSync: '30 min ago',
      syncFrequency: 'Every hour',
      dataTypes: ['Training Content', 'Performance Support', 'Tutorials', 'Documentation'],
      monthlyRequests: 34567,
      requestLimit: 100000,
      uptime: 99.91,
      avgResponseTime: '265ms',
      errors24h: 1,
      activeCourses: 47,
      webhooks: ['training.completed', 'content.accessed'],
    },
    powerDMS: {
      name: 'PowerDMS',
      vendor: 'NEOGOV',
      type: 'policy',
      status: 'connected',
      version: 'v9.7.3',
      endpoint: 'https://api.powerdms.com/v3',
      authMethod: 'API Key',
      apiKey: 'pdms_live_5Q6R7S8T9U1V2W3X',
      lastSync: '20 min ago',
      syncFrequency: 'Every 30 minutes',
      dataTypes: ['Policies', 'Training', 'Acknowledgments', 'Compliance', 'Accreditation'],
      monthlyRequests: 45678,
      requestLimit: 100000,
      uptime: 99.93,
      avgResponseTime: '195ms',
      errors24h: 3,
      pendingAcknowledgments: 23,
      webhooks: ['policy.updated', 'training.assigned', 'compliance.due'],
    },
  });

  const [apiKeys, setApiKeys] = useState([
    { id: 1, name: 'SentryOps HR Portal', key: 'sk_live_HR4F8K9N2P5Q7R8S', created: '2024-01-15', lastUsed: '2 min ago', permissions: 'Full Access', status: 'active' },
    { id: 2, name: 'Mobile Application', key: 'sk_live_HR7H8J9K1L2M3N4P', created: '2024-03-22', lastUsed: '12 min ago', permissions: 'Read Only', status: 'active' },
  ]);

  const settingsTabs = [
    { id: 'integrations', label: 'Integrations', icon: Link, tier: 1 },
    { id: 'security',     label: 'Security',     icon: Lock, tier: 1 },
    { id: 'audit',        label: 'Audit & Compliance', icon: FileText, tier: 1 },
    { id: 'data',         label: 'Backup & Retention', icon: Database, tier: 1 },
    { id: 'profile',      label: 'Profile',      icon: User, tier: 2 },
    { id: 'notifications',label: 'Notifications',icon: Bell, tier: 2 },
    { id: 'display',      label: 'Display',      icon: Monitor, tier: 2 },
  ];

  const getIntegrationIcon = (type) => {
    const icons = { 'hr': Users, 'erp': Database, 'employee-portal': Globe, 'training': FileCheck, 'learning': FileText, 'policy': Shield };
    return icons[type] || Server;
  };

  const getStatusColor = (status) => status === 'connected' ? 'text-green-400' : 'text-red-400';
  const getStatusBg    = (status) => status === 'connected' ? 'bg-green-500/20' : 'bg-red-500/20';
  const getStatusBorder= (status) => status === 'connected' ? 'border-green-500/30' : 'border-red-500/30';

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
    <DashboardLayout navigation={hrNavigation} profile={hrProfile} notifications={hrNotifications}>
      <div className="p-5 lg:p-8 space-y-8 min-h-full">
        <div className="max-w-[1600px] mx-auto">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-primary mb-1">Settings & Configuration</h2>
            <p className="text-xs text-slate-500">Manage your account, HR system integrations, and enterprise settings</p>
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
            <span className="text-sm font-semibold text-amber-700 uppercase">Human Resources Access Level</span>
          </div>

          {/* Settings Tab Navigation */}
          <div className="mb-6 flex gap-1 border-b border-border overflow-x-auto scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
            {settingsTabs.map((tab, idx) => {
              const Icon = tab.icon;
              const prevTier = idx > 0 ? settingsTabs[idx - 1].tier : tab.tier;
              const showDivider = tab.tier !== prevTier;
              return (
                <React.Fragment key={tab.id}>
                  {showDivider && <div className="self-center mx-1 w-px h-5 bg-white dark:bg-slate-700/60" />}
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

          {/* Settings Content */}
          <div className="space-y-6">

            {/* Integrations */}
            {activeSection === 'integrations' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-sm font-semibold text-primary">HR System Integrations</h3>
                  <span className="text-[10px] text-slate-500">Last updated: {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                </div>
                {Object.entries(integrations).map(([key, integration]) => {
                  const Icon = getIntegrationIcon(integration.type);
                  const isExpanded = expandedIntegration === key;
                  return (
                    <div key={key} className="bg-white dark:bg-slate-800/25 border border-border dark:border-slate-700/30 rounded-xl overflow-hidden shadow-sm dark:shadow-none">
                      <div onClick={() => setExpandedIntegration(isExpanded ? null : key)} className="p-6 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-colors">
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
                          <button className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700/40 rounded-lg transition-colors">
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
                                  <code className="flex-1 text-xs text-blue-400 bg-slate-100 dark:bg-slate-900/50 px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700/50 overflow-x-auto">{integration.endpoint}</code>
                                  <button onClick={() => handleCopyApiKey(integration.endpoint)} className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700/40 rounded-lg transition-colors"><Copy className="w-4 h-4 text-muted" /></button>
                                </div>
                              </div>
                              <div><p className="text-xs font-medium text-muted mb-2">Authentication Method</p><p className="text-sm text-primary">{integration.authMethod}</p></div>
                              <div>
                                <p className="text-xs font-medium text-muted mb-2">API Key</p>
                                <div className="flex items-center gap-2">
                                  <code className="flex-1 text-xs text-amber-700 bg-slate-100 dark:bg-slate-900/50 px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700/50">
                                    {showApiKey[key] ? integration.apiKey : '••••••••••••••••••••'}
                                  </code>
                                  <button onClick={() => setShowApiKey({...showApiKey, [key]: !showApiKey[key]})} className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700/40 rounded-lg transition-colors">
                                    {showApiKey[key] ? <EyeOff className="w-4 h-4 text-muted" /> : <Eye className="w-4 h-4 text-muted" />}
                                  </button>
                                  <button onClick={() => handleCopyApiKey(integration.apiKey)} className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700/40 rounded-lg transition-colors"><Copy className="w-4 h-4 text-muted" /></button>
                                </div>
                              </div>
                            </div>
                            <div className="space-y-6">
                              <div><p className="text-xs font-medium text-muted mb-2">Sync Frequency</p><p className="text-sm text-primary">{integration.syncFrequency}</p></div>
                              <div>
                                <p className="text-xs font-medium text-muted mb-2">Data Types</p>
                                <div className="flex flex-wrap gap-2">
                                  {integration.dataTypes.map((type, i) => (
                                    <span key={i} className="px-2 py-1 bg-slate-200 dark:bg-slate-700/40 border border-slate-300 dark:border-slate-600/50 rounded-md text-xs text-secondary">{type}</span>
                                  ))}
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-6">
                                <div>
                                  <p className="text-xs font-medium text-muted mb-2">Monthly Requests</p>
                                  <p className="text-sm text-primary">{integration.monthlyRequests.toLocaleString()} / {integration.requestLimit.toLocaleString()}</p>
                                  <div className="mt-2 h-2 bg-slate-200 dark:bg-slate-700/40 rounded-full overflow-hidden">
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
                          {(integration.activeRequisitions || integration.pendingOnboarding || integration.employees || integration.activeUsers || integration.expiringSoon || integration.pendingAcknowledgments || integration.activeCourses) && (
                            <div className="mt-6 pt-6 border-t border-border dark:border-slate-700/30">
                              <p className="text-xs font-medium text-muted mb-3">Live Metrics</p>
                              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                {integration.activeRequisitions && <div className="bg-slate-50 dark:bg-slate-900/50 border border-border rounded-xl p-4"><p className="text-xs text-muted mb-1">Open Requisitions</p><p className="text-sm font-semibold text-primary">{integration.activeRequisitions}</p></div>}
                                {integration.pendingOnboarding && <div className="bg-slate-50 dark:bg-slate-900/50 border border-border rounded-xl p-4"><p className="text-xs text-muted mb-1">Pending Onboarding</p><p className="text-sm font-semibold text-amber-700">{integration.pendingOnboarding}</p></div>}
                                {integration.employees && <div className="bg-slate-50 dark:bg-slate-900/50 border border-border rounded-xl p-4"><p className="text-xs text-muted mb-1">Employees</p><p className="text-sm font-semibold text-primary">{integration.employees}</p></div>}
                                {integration.activeUsers && <div className="bg-slate-50 dark:bg-slate-900/50 border border-border rounded-xl p-4"><p className="text-xs text-muted mb-1">Active Users</p><p className="text-sm font-semibold text-primary">{integration.activeUsers}</p></div>}
                                {integration.expiringSoon && <div className="bg-slate-50 dark:bg-slate-900/50 border border-border rounded-xl p-4"><p className="text-xs text-muted mb-1">Certs Expiring Soon</p><p className="text-sm font-semibold text-red-400">{integration.expiringSoon}</p></div>}
                                {integration.pendingAcknowledgments && <div className="bg-slate-50 dark:bg-slate-900/50 border border-border rounded-xl p-4"><p className="text-xs text-muted mb-1">Pending Acknowledgments</p><p className="text-sm font-semibold text-amber-700">{integration.pendingAcknowledgments}</p></div>}
                                {integration.activeCourses && <div className="bg-slate-50 dark:bg-slate-900/50 border border-border rounded-xl p-4"><p className="text-xs text-muted mb-1">Active Courses</p><p className="text-sm font-semibold text-primary">{integration.activeCourses}</p></div>}
                              </div>
                            </div>
                          )}
                          <div className="mt-6 flex items-center gap-3">
                            <button onClick={() => handleTestConnection(key)} disabled={testingConnection === key} className="flex items-center gap-2 px-4 py-2 bg-blue-500/20 border border-blue-500/30 text-blue-400 rounded-xl text-sm font-medium hover:bg-blue-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                              {testingConnection === key ? <><RefreshCw className="w-4 h-4 animate-spin" />Testing...</> : <><Wifi className="w-4 h-4" />Test Connection</>}
                            </button>
                            <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-700/40 border border-slate-300 dark:border-slate-600/50 text-secondary rounded-xl text-sm font-medium hover:bg-slate-200 dark:hover:bg-slate-700/60 transition-all"><RefreshCw className="w-4 h-4" />Sync Now</button>
                            <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-700/40 border border-slate-300 dark:border-slate-600/50 text-secondary rounded-xl text-sm font-medium hover:bg-slate-200 dark:hover:bg-slate-700/60 transition-all"><Shield className="w-4 h-4" />Configure</button>
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
                <div className="bg-white dark:bg-slate-800/25 border border-border dark:border-slate-700/30 rounded-xl shadow-sm dark:shadow-none p-6">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-sm font-semibold text-primary">Authentication & Access</h3>
                    <span className="text-[10px] text-slate-500">Last updated: Dec 9, 2025 11:42 AM</span>
                  </div>
                  <p className="text-xs text-slate-500 mb-6">Multi-factor authentication, session management, and access controls.</p>
                  <div className="space-y-6">
                    {[
                      { key: 'twoFactorAuth', label: 'Two-Factor Authentication', desc: 'Require 2FA for account access', extra: 'Enabled' },
                      { key: 'loginNotifications', label: 'Login Notifications', desc: 'Notify on new device login' },
                      { key: 'ipWhitelist', label: 'IP Whitelist', desc: 'Restrict access to approved IPs' },
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
                      <select value={securitySettings.sessionTimeout} onChange={(e) => setSecuritySettings({...securitySettings, sessionTimeout: e.target.value})} className="w-full px-4 py-2.5 bg-white dark:bg-slate-800/40 border border-slate-300 dark:border-slate-700/50 rounded-xl text-slate-900 dark:text-primary focus:outline-none focus:border-amber-500/50 transition-colors">
                        <option value="15">15 minutes</option>
                        <option value="30">30 minutes</option>
                        <option value="60">1 hour</option>
                        <option value="120">2 hours</option>
                        <option value="480">8 hours</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-secondary mb-2">Password Expiry (days)</label>
                      <select value={securitySettings.passwordExpiry} onChange={(e) => setSecuritySettings({...securitySettings, passwordExpiry: e.target.value})} className="w-full px-4 py-2.5 bg-white dark:bg-slate-800/40 border border-slate-300 dark:border-slate-700/50 rounded-xl text-slate-900 dark:text-primary focus:outline-none focus:border-amber-500/50 transition-colors">
                        <option value="30">30 days</option>
                        <option value="60">60 days</option>
                        <option value="90">90 days</option>
                        <option value="180">180 days</option>
                        <option value="never">Never</option>
                      </select>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-border dark:border-slate-700/30">
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-primary">Audit Logging</h4>
                        <p className="text-xs text-muted mt-1">Track all user actions</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-medium text-green-400">Required</span>
                        <button disabled className="relative w-12 h-6 rounded-full bg-green-500 cursor-not-allowed opacity-75">
                          <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full translate-x-6"></div>
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between py-3">
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-primary">SSO Integration</h4>
                        <p className="text-xs text-muted mt-1">Single Sign-On with County AD</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-medium text-green-400">Active</span>
                        <button onClick={() => setSecuritySettings({...securitySettings, ssoEnabled: !securitySettings.ssoEnabled})} className={`relative w-12 h-6 rounded-full transition-colors ${securitySettings.ssoEnabled ? 'bg-green-500' : 'bg-slate-600'}`}>
                          <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${securitySettings.ssoEnabled ? 'translate-x-6' : 'translate-x-0'}`}></div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-white dark:bg-slate-800/25 border border-border dark:border-slate-700/30 rounded-xl shadow-sm dark:shadow-none p-6">
                  <h3 className="text-sm font-semibold text-primary mb-6">Active Sessions</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-800/30 border border-border dark:border-slate-700/30 rounded-xl">
                      <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center"><Monitor className="w-5 h-5 text-green-400" /></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-primary">Chrome on Windows • Current Session</p>
                        <p className="text-xs text-muted">GCSO HR Office • 172.16.45.110</p>
                        <p className="text-xs text-slate-500 mt-1">Last active: Just now</p>
                      </div>
                      <div className="px-3 py-1.5 bg-green-500/20 border border-green-500/30 rounded-lg"><span className="text-xs font-medium text-green-400">Active</span></div>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-800/30 border border-border dark:border-slate-700/30 rounded-xl">
                      <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center"><Smartphone className="w-5 h-5 text-blue-400" /></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-primary">Mobile App • iPhone 14</p>
                        <p className="text-xs text-muted">HR Director • Mobile Network</p>
                        <p className="text-xs text-slate-500 mt-1">Last active: 1 hour ago</p>
                      </div>
                      <button className="px-3 py-1.5 bg-red-500/20 border border-red-500/30 text-red-400 rounded-lg text-xs font-medium hover:bg-red-500/30 transition-all">Revoke</button>
                    </div>
                  </div>
                </div>
                <div className="bg-white dark:bg-slate-800/25 border border-border dark:border-slate-700/30 rounded-xl shadow-sm dark:shadow-none p-6">
                  <h3 className="text-sm font-semibold text-primary mb-4">Change Password</h3>
                  <div className="space-y-6">
                    {['Current Password', 'New Password', 'Confirm New Password'].map((label, i) => (
                      <div key={i}>
                        <label className="block text-sm font-medium text-secondary mb-2">{label}</label>
                        <input type="password" className="w-full px-4 py-2.5 bg-white dark:bg-slate-800/40 border border-slate-300 dark:border-slate-700/50 rounded-xl text-primary placeholder-slate-500 focus:outline-none focus:border-amber-500/50 transition-colors" placeholder={`Enter ${label.toLowerCase()}`} />
                      </div>
                    ))}
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-500/20 border border-blue-500/30 text-blue-400 rounded-xl text-sm font-medium hover:bg-blue-500/30 transition-all"><Key className="w-4 h-4" />Update Password</button>
                  </div>
                </div>
              </div>
            )}

            {/* Audit & Compliance */}
            {activeSection === 'audit' && (
              <div className="bg-white dark:bg-slate-800/25 border border-border dark:border-slate-700/30 rounded-xl shadow-sm dark:shadow-none p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-sm font-semibold text-primary">Audit & Compliance Trail</h3>
                    <p className="text-xs text-slate-500 mt-1">Recent HR actions, security events, and integration activity. All changes are logged.</p>
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2 bg-blue-500/20 border border-blue-500/30 text-blue-400 rounded-xl text-sm font-medium hover:bg-blue-500/30 transition-all"><Download className="w-4 h-4" />Export Logs</button>
                </div>
                <div className="space-y-3">
                  {[
                    { Icon: CheckCircle2, bg: 'bg-green-500/20', iconColor: 'text-green-400', title: 'Employee Record Accessed', tag: 'HR Action', tagBg: 'bg-blue-500/20', tagBorder: 'border-blue-500/30', tagText: 'text-blue-400', desc: 'HR Director reviewed Deputy Martinez personnel file', meta: ['IP: 172.16.45.110', 'Device: Chrome on Windows', '10 minutes ago'] },
                    { Icon: Lock, bg: 'bg-blue-500/20', iconColor: 'text-blue-400', title: 'Successful Login', tag: 'Authentication', tagBg: 'bg-green-500/20', tagBorder: 'border-green-500/30', tagText: 'text-green-400', desc: 'HR Director logged in from HR Office', meta: ['IP: 172.16.45.110', '2FA: Verified', '2 hours ago'] },
                    { Icon: RefreshCw, bg: 'bg-purple-500/20', iconColor: 'text-purple-400', title: 'NeoGov Synced', tag: 'Integration', tagBg: 'bg-purple-500/20', tagBorder: 'border-purple-500/30', tagText: 'text-purple-400', desc: 'Applicant data sync completed: 3 new applications received', meta: ['Records: 3 new', 'Duration: 1.2s', '3 hours ago'] },
                    { Icon: Shield, bg: 'bg-amber-500/20', iconColor: 'text-amber-700', title: 'POST Cert Updated', tag: 'Compliance', tagBg: 'bg-amber-500/20', tagBorder: 'border-amber-500/30', tagText: 'text-amber-700', desc: 'Sgt. Thompson POST certification renewal processed via GA POST API', meta: ['Cert #: POST-2025-8841', 'Expires: Dec 2027', '5 hours ago'] },
                    { Icon: CheckCircle, bg: 'bg-green-500/20', iconColor: 'text-green-400', title: 'FMLA Approved', tag: 'HR Action', tagBg: 'bg-blue-500/20', tagBorder: 'border-blue-500/30', tagText: 'text-blue-400', desc: 'Deputy Rodriguez 12-week FMLA approved by HR Director', meta: ['Start: Jun 1, 2026', 'Return: Aug 24, 2026', '8 hours ago'] },
                    { Icon: FileText, bg: 'bg-slate-500/20', iconColor: 'text-slate-400', title: 'Performance Review Submitted', tag: 'HR Action', tagBg: 'bg-blue-500/20', tagBorder: 'border-blue-500/30', tagText: 'text-blue-400', desc: 'Q2 patrol evaluation submitted for Deputy Chen by Sgt. Williams', meta: ['Rating: Meets Expectations', 'Q2 2026', '12 hours ago'] },
                  ].map((event, i) => (
                    <div key={i} className="flex items-start gap-4 p-4 bg-slate-50 dark:bg-slate-800/30 border border-border dark:border-slate-700/30 rounded-xl">
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
                  <button className="px-4 py-2 bg-slate-100 dark:bg-slate-700/40 border border-slate-300 dark:border-slate-600/50 text-secondary rounded-xl text-sm font-medium hover:bg-slate-200 dark:hover:bg-slate-700/60 transition-all">Load More</button>
                </div>
              </div>
            )}

            {/* Backup & Retention */}
            {activeSection === 'data' && (
              <div className="space-y-6">
                <div className="bg-white dark:bg-slate-800/25 border border-border dark:border-slate-700/30 rounded-xl shadow-sm dark:shadow-none p-6">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-sm font-semibold text-primary">Data Export</h3>
                    <span className="text-[10px] text-slate-500">Last updated: {new Date().toLocaleDateString()} 02:00 AM</span>
                  </div>
                  <p className="text-xs text-slate-500 mb-6">Export personnel records, training data, compliance documents, and integration logs.</p>
                  <div className="space-y-6">
                    {[
                      { Icon: Database, color: 'blue', label: 'Personnel Records', desc: 'Export all employee data', fmt: 'Export CSV' },
                      { Icon: GraduationCap, color: 'green', label: 'Training Records', desc: 'Export POST cert and training history', fmt: 'Export CSV' },
                      { Icon: FileCheck, color: 'purple', label: 'Compliance Documents', desc: 'Export FMLA, ADA, and compliance records', fmt: 'Export PDF' },
                      { Icon: FileJson, color: 'amber', label: 'Integration Logs', desc: 'Export NeoGov/SAP sync logs', fmt: 'Export JSON' },
                    ].map((item, i) => (
                      <div key={i} className="p-4 bg-slate-50 dark:bg-slate-800/30 border border-border dark:border-slate-700/30 rounded-xl">
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
                <div className="bg-white dark:bg-slate-800/25 border border-border dark:border-slate-700/30 rounded-xl shadow-sm dark:shadow-none p-6">
                  <h3 className="text-sm font-semibold text-primary mb-6">Backup & Restore</h3>
                  <div className="space-y-6">
                    <div className="p-4 bg-slate-50 dark:bg-slate-800/30 border border-border dark:border-slate-700/30 rounded-xl">
                      <div className="flex items-center justify-between mb-3">
                        <div><h4 className="text-sm font-medium text-primary mb-1">Last Backup</h4><p className="text-xs text-muted">Today at 2:00 AM EST</p></div>
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/20 border border-green-500/30 rounded-lg"><CheckCircle2 className="w-4 h-4 text-green-400" /><span className="text-xs font-medium text-green-400">Successful</span></div>
                      </div>
                      <div className="flex gap-3 mt-4">
                        <button className="flex items-center gap-2 px-4 py-2 bg-blue-500/20 border border-blue-500/30 text-blue-400 rounded-xl text-sm font-medium hover:bg-blue-500/30 transition-all"><Download className="w-4 h-4" />Download Backup</button>
                        <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-700/40 border border-slate-300 dark:border-slate-600/50 text-secondary rounded-xl text-sm font-medium hover:bg-slate-200 dark:hover:bg-slate-700/60 transition-all"><RefreshCw className="w-4 h-4" />Create New Backup</button>
                      </div>
                    </div>
                    <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="w-5 h-5 text-amber-700 mt-0.5 flex-shrink-0" />
                        <div><p className="text-sm font-medium text-amber-300">Backup Schedule</p><p className="text-xs text-amber-200/70 mt-1">Automated backups run daily at 2:00 AM EST. Personnel records retained per GCSO policy. Backups stored in encrypted cloud storage.</p></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-white dark:bg-slate-800/25 border border-border dark:border-slate-700/30 rounded-xl shadow-sm dark:shadow-none p-6">
                  <h3 className="text-sm font-semibold text-primary mb-6">Data Retention</h3>
                  <div className="space-y-6">
                    {[
                      { label: 'Audit Log Retention', opts: [['90','90 days'],['180','180 days'],['365','1 year'],['1825','5 years (Recommended)']] },
                      { label: 'Personnel Records Retention', opts: [['1825','5 years'],['3650','10 years (Recommended)'],['permanent','Permanent']] },
                      { label: 'Training Records Retention', opts: [['1825','5 years (Recommended)'],['3650','10 years'],['permanent','Permanent']] },
                      { label: 'HR Reports Retention', opts: [['365','1 year'],['730','2 years'],['1825','5 years (Recommended)']] },
                    ].map((item, i) => (
                      <div key={i}>
                        <label className="block text-sm font-medium text-secondary mb-2">{item.label}</label>
                        <select className="w-full px-4 py-2.5 bg-white dark:bg-slate-800/40 border border-slate-300 dark:border-slate-700/50 rounded-xl text-slate-900 dark:text-primary focus:outline-none focus:border-amber-500/50 transition-colors">
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
                <div className="bg-white dark:bg-slate-800/25 border border-border dark:border-slate-700/30 rounded-xl shadow-sm dark:shadow-none p-6">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-sm font-semibold text-primary">Profile Information</h3>
                    <span className="text-[10px] text-slate-500">Last updated: Dec 11, 2025 09:14 AM</span>
                  </div>
                  <div className="flex items-center gap-2 mb-6"><div className="w-2 h-2 bg-green-400 rounded-full"></div><span className="text-xs font-medium text-green-400">Verified Account</span></div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                      { label: 'Full Name', field: 'fullName', type: 'text', editable: true },
                      { label: 'Email Address', field: 'email', type: 'email', editable: true },
                      { label: 'Employee ID', field: 'badge', type: 'text', editable: false },
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
                          className={`w-full px-4 py-2.5 border rounded-xl text-primary focus:outline-none transition-colors ${f.editable ? 'bg-white dark:bg-slate-800/40 border-slate-300 dark:border-slate-700/50 focus:border-amber-500/50' : 'bg-slate-100 dark:bg-slate-800/20 border-border text-muted cursor-not-allowed'}`} />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-white dark:bg-slate-800/40 border border-border rounded-xl shadow-sm dark:shadow-none p-6">
                  <h3 className="text-lg font-semibold text-primary mb-4">Profile Photo</h3>
                  <div className="flex items-center gap-6">
                    <div className="w-24 h-24 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center"><span className="text-primary text-3xl font-bold">PH</span></div>
                    <div className="flex-1">
                      <p className="text-sm text-secondary mb-3">Update your profile photo. Recommended size: 400x400px</p>
                      <div className="flex gap-3">
                        <button className="flex items-center gap-2 px-4 py-2 bg-blue-500/20 border border-blue-500/30 text-blue-400 rounded-xl text-sm font-medium hover:bg-blue-500/30 transition-all"><Camera className="w-4 h-4" />Upload Photo</button>
                        <button className="px-4 py-2 bg-slate-100 dark:bg-slate-700/40 border border-slate-300 dark:border-slate-600/50 text-secondary rounded-xl text-sm font-medium hover:bg-slate-200 dark:hover:bg-slate-700/60 transition-all">Remove</button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Notifications */}
            {activeSection === 'notifications' && (
              <div className="bg-white dark:bg-slate-800/25 border border-border dark:border-slate-700/30 rounded-xl shadow-sm dark:shadow-none p-6">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-sm font-semibold text-primary">Operational Alert Preferences</h3>
                  <span className="text-[10px] text-slate-500">Last updated: Dec 11, 2025 09:14 AM</span>
                </div>
                <p className="text-xs text-slate-500 mb-6">Only critical HR operational events are surfaced here.</p>
                <div className="space-y-6">
                  {[
                    { key: 'postCertExpiring', title: 'POST Certification Expiring', desc: 'Alert when a deputy certification is within 30 days of expiry' },
                    { key: 'fmlaDeadlines', title: 'FMLA Designation Deadlines', desc: 'Alert when pending FMLA actions reach the 5-day notice window' },
                    { key: 'integrationFailure', title: 'Integration Failure', desc: 'Alert when NeoGov or SAP ERP sync fails or loses connection' },
                    { key: 'newApplicant', title: 'New Applicant Submitted', desc: 'Alert when an applicant submits to an open requisition' },
                    { key: 'performanceOverdue', title: 'Performance Review Overdue', desc: 'Alert when an evaluation is past its due date' },
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
              <div className="bg-white dark:bg-slate-800/25 border border-border dark:border-slate-700/30 rounded-xl shadow-sm dark:shadow-none p-6">
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
                        <button key={t.value} onClick={() => setTheme(t.value)} className={`p-4 rounded-xl border-2 transition-all ${activeTheme === t.value ? 'border-amber-500 bg-amber-100 dark:bg-slate-800/60' : 'border-border bg-white dark:bg-slate-800/20 hover:bg-slate-50 dark:hover:bg-slate-800/40'}`}>
                          <t.Icon className="w-6 h-6 text-secondary mb-2" />
                          <p className="text-sm font-medium text-slate-800 dark:text-white">{t.label}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-secondary mb-2">Timezone</label>
                    <select value={displaySettings.timezone} onChange={(e) => setDisplaySettings({...displaySettings, timezone: e.target.value})} className="w-full px-4 py-2.5 bg-white dark:bg-slate-800/40 border border-slate-300 dark:border-slate-700/50 rounded-xl text-slate-900 dark:text-primary focus:outline-none focus:border-amber-500/50 transition-colors">
                      <option value="America/New_York">Eastern Time (ET)</option>
                      <option value="America/Chicago">Central Time (CT)</option>
                      <option value="America/Denver">Mountain Time (MT)</option>
                      <option value="America/Los_Angeles">Pacific Time (PT)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-secondary mb-2">Date Format</label>
                    <select value={displaySettings.dateFormat} onChange={(e) => setDisplaySettings({...displaySettings, dateFormat: e.target.value})} className="w-full px-4 py-2.5 bg-white dark:bg-slate-800/40 border border-slate-300 dark:border-slate-700/50 rounded-xl text-slate-900 dark:text-primary focus:outline-none focus:border-amber-500/50 transition-colors">
                      <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                      <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                      <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-secondary mb-2">Dashboard Density</label>
                    <select value={displaySettings.density} onChange={(e) => setDisplaySettings({...displaySettings, density: e.target.value})} className="w-full px-4 py-2.5 bg-white dark:bg-slate-800/40 border border-slate-300 dark:border-slate-700/50 rounded-xl text-slate-900 dark:text-primary focus:outline-none focus:border-amber-500/50 transition-colors">
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
          <div className="mt-8 flex items-center justify-between p-5 bg-white dark:bg-slate-800/25 border border-border dark:border-slate-700/30 rounded-xl shadow-sm dark:shadow-none">
            <div>
              <p className="text-sm font-medium text-primary">Unsaved Changes</p>
              <p className="text-xs text-muted mt-1">Save your changes to apply the new settings</p>
            </div>
            <div className="flex gap-3">
              <button className="px-6 py-2.5 bg-slate-100 dark:bg-slate-700/40 border border-slate-300 dark:border-slate-600/50 text-secondary rounded-xl text-sm font-medium hover:bg-slate-200 dark:hover:bg-slate-700/60 transition-all">Reset</button>
              <button onClick={handleSaveSettings} className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 rounded-xl text-primary text-sm font-medium shadow-lg shadow-amber-500/20 transition-all"><Save className="w-4 h-4" />Save Changes</button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

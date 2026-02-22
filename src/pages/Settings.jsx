import React, { useState, useEffect } from 'react';
import { Home, Users, FileText, LayoutDashboard, TrendingUp, AlertCircle, Settings, Bell, MessageCircle, Search, ChevronRight, DollarSign, CheckCircle, Shield, ShieldCheck, Sparkles, X, Send, Menu, ChevronLeft, LogOut, User, Lock, Palette, Globe, Clock, Smartphone, Mail, Monitor, Moon, Sun, Save, Camera, Building2, Radio, Target, Database, Wifi, Link, Key, HardDrive, Cloud, Zap, Server, Activity, RefreshCw, Download, Upload, Code, ExternalLink, Copy, Eye, EyeOff, AlertTriangle, Info, Cpu, HelpCircle, BarChart3, Package, Webhook, Terminal, FileJson, Settings as SettingsIcon, ChevronDown, ChevronUp, CheckCircle2, XCircle, Trash2, Plus, Edit3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import DashboardLayout from '../layouts/DashboardLayout';

export default function SettingsPage() {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState('settings');
  const [chatOpen, setChatOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    const saved = localStorage.getItem('sidebarCollapsed');
    return saved === 'true';
  });
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [logoutConfirmOpen, setLogoutConfirmOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('profile');
  const [selectedIntegration, setSelectedIntegration] = useState(null);
  const [showApiKey, setShowApiKey] = useState({});
  const [testingConnection, setTestingConnection] = useState(null);
  const [expandedIntegration, setExpandedIntegration] = useState(null);
  const [staffingExpanded, setStaffingExpanded] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  // Get user role from localStorage (default to 'command' for demo)
  const [userRole, setUserRole] = useState('command');

  useEffect(() => {
    const storedRole = localStorage.getItem('userRole') || 'command';
    setUserRole(storedRole);
  }, []);

  // Persist sidebar collapsed state
  useEffect(() => {
    localStorage.setItem('sidebarCollapsed', sidebarCollapsed.toString());
  }, [sidebarCollapsed]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const target = event.target;
      if (!target.closest('.notifications-dropdown') && !target.closest('.notifications-trigger')) {
        setNotificationsOpen(false);
      }
      if (!target.closest('.profile-dropdown') && !target.closest('.profile-trigger')) {
        setProfileMenuOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const navigation = [
    { id: 'command-overview', label: 'Command Overview', icon: Home, route: '/command/dashboard' },
    { id: 'daily-brief', label: 'Daily Command Brief', icon: FileText, route: '/command/brief' },
    { id: 'alerts', label: 'Command Alerts', icon: AlertCircle, badge: '3', route: '/command/alerts' },
    { id: 'approvals', label: 'Command Approvals', icon: CheckCircle, badge: '8', route: '/command/approvals' },
    { id: 'risk-compliance', label: 'Risk & Compliance', icon: ShieldCheck, route: '/command/risk' },
    { id: 'staffing', label: 'Staffing & Readiness', icon: Users, hasSubmenu: true },
    { id: 'custody', label: 'Custody Operations', icon: Building2, route: '/jail/dashboard' },
    { id: 'field-ops', label: 'Field Operations (Overview)', icon: Radio, route: '/patrol/cad' },
    { id: 'investigative', label: 'Investigative Oversight', icon: Target, route: '/investigations/cases' },
    { id: 'budget', label: 'Budget & Assets', icon: DollarSign, route: '/command/budget' },
    { id: 'reports', label: 'Reports & Compliance', icon: TrendingUp, route: '/command/reports' }
  ];

  const staffingSubmenu = [
    { id: 'staffing-overview', label: 'Staffing Overview', route: '/command/personnel' },
    { id: 'org-chart', label: 'Org Chart', route: '/command/orgchart' }
  ];

  const notifications = [
    { id: 1, title: 'Critical Incident - Detention', message: 'Use of force incident in B-Pod. Deputy Johnson. Review required.', time: '15 min ago', urgent: true },
    { id: 2, title: 'Facility Alert - HVAC Failure', message: 'H2-Pod temperature 84°F. Emergency repair needed.', time: '32 min ago', urgent: true },
    { id: 3, title: 'Staffing Emergency - B-Shift', message: '3 deputies out. Below minimum staffing.', time: '1 hour ago', urgent: true },
    { id: 4, title: 'Budget Approval Required', message: 'Q1 2025 Training Budget: $45,000', time: '2 hours ago', urgent: false },
    { id: 5, title: 'Leave Request Submitted', message: 'Deputy Marcus Chen - Dec 15-22', time: '3 hours ago', urgent: false }
  ];

  const [profileSettings, setProfileSettings] = useState({
    fullName: 'Sheriff Thompson',
    email: 'sheriff.thompson@gwinnettcounty.gov',
    badge: 'GCSO-001',
    phone: '(770) 619-6500',
    department: 'Command Staff',
    position: 'Sheriff',
    division: 'Office of the Sheriff',
    hireDate: '2018-01-15',
    certificationExpiry: '2025-12-31'
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: true,
    pushNotifications: true,
    criticalAlerts: true,
    reportReminders: true,
    systemUpdates: true,
    personnelAlerts: true,
    budgetAlerts: true,
    complianceAlerts: true,
    integrationAlerts: true,
    securityAlerts: true
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
    ipWhitelist: false,
    auditLogging: true,
    apiRateLimit: '1000',
    ssoEnabled: true
  });

  // Comprehensive integration configurations - Actual Gwinnett County Systems
  const [integrations, setIntegrations] = useState({
    // Integrated Public Safety Stack (County-Wide Shared)
    integratedCAD: {
      name: 'Integrated CAD/RMS System',
      vendor: 'County Public Safety Stack',
      type: 'dispatch',
      status: 'connected',
      version: 'v2024.3',
      endpoint: 'https://publicsafety.gwinnettcounty.gov/api/v2',
      authMethod: 'County SSO + API Key',
      apiKey: 'ps_live_4F8K9N2P5Q7R8S1T',
      lastSync: '1 min ago',
      syncFrequency: 'Real-time',
      dataTypes: ['CAD', 'RMS', 'Mobile', 'AVL', 'GIS', 'Units', 'Incidents', 'Reports'],
      monthlyRequests: 1284567,
      requestLimit: 2000000,
      uptime: 99.98,
      avgResponseTime: '98ms',
      errors24h: 2,
      description: 'Shared with Police, Fire, and 911 - County-wide integrated public safety environment',
      webhooks: ['incident.created', 'unit.dispatched', 'report.filed', 'avl.update']
    },

    // Criminal Justice Information Systems
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
      dataTypes: ['Warrants', 'Criminal History', 'Stolen Property', 'Missing Persons', 'NCIC Records'],
      monthlyRequests: 425678,
      requestLimit: 1000000,
      uptime: 99.99,
      avgResponseTime: '89ms',
      errors24h: 0,
      compliance: 'CJIS Security Policy 5.9 Compliant',
      webhooks: []
    },

    // Jail Management Systems
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
      dataTypes: ['Inmates', 'Bookings', 'Releases', 'Classifications', 'Medical', 'Programs', 'Diversion Center'],
      monthlyRequests: 456892,
      requestLimit: 750000,
      uptime: 99.96,
      avgResponseTime: '165ms',
      errors24h: 3,
      currentInmates: 842,
      capacity: 920,
      facilities: 'Jail, Correctional Institute, Diversion Center',
      webhooks: ['inmate.booked', 'inmate.released', 'classification.changed', 'medical.alert']
    },
    jailView: {
      name: 'JAIL View (Public Portal)',
      vendor: 'SmartCOP',
      type: 'public-portal',
      status: 'connected',
      version: 'Web Client v8.2',
      endpoint: 'https://jailview.gwinnettcounty.gov/api',
      authMethod: 'Public API Key',
      apiKey: 'jv_public_8J9K1L2M3N4P5Q6R',
      lastSync: '5 min ago',
      syncFrequency: 'Every 5 minutes',
      dataTypes: ['Public Inmate Search', 'Booking Records', 'Mugshots', 'Charges', 'Bond Information'],
      monthlyRequests: 89234,
      requestLimit: 200000,
      uptime: 99.94,
      avgResponseTime: '245ms',
      errors24h: 1,
      description: 'Public-facing inmate search portal powered by SmartJAIL',
      webhooks: []
    },

    // HR & Personnel Systems
    neoGov: {
      name: 'NeoGov',
      vendor: 'NEOGOV',
      type: 'hr-recruiting',
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
      description: 'County-wide recruiting and onboarding platform for all departments including Sheriff',
      webhooks: ['applicant.submitted', 'onboarding.started', 'background.completed']
    },
    sapERP: {
      name: 'SAP ERP (HR/Payroll/Finance)',
      vendor: 'SAP',
      type: 'erp',
      status: 'connected',
      version: 'S/4HANA 2023',
      endpoint: 'https://sap.gwinnettcounty.gov/api/odata/v2',
      authMethod: 'SAP SSO + API Key',
      apiKey: 'sap_live_1L2M3N4P5Q6R7S8T',
      lastSync: '10 min ago',
      syncFrequency: 'Every 15 minutes',
      dataTypes: ['HR', 'Payroll', 'Finance', 'Supply Chain', 'Employees', 'Time & Attendance', 'Benefits'],
      monthlyRequests: 534567,
      requestLimit: 1000000,
      uptime: 99.97,
      avgResponseTime: '195ms',
      errors24h: 1,
      employees: 856,
      modules: 'HR, Payroll, Finance, Supply Chain',
      description: 'County-wide SAP ERP for all business processes including Sheriff administration',
      webhooks: ['payroll.processed', 'employee.updated', 'timesheet.submitted']
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
      dataTypes: ['Procedures', 'Forms', 'Benefits', 'Policies', 'Documents', 'Employee Resources'],
      monthlyRequests: 123456,
      requestLimit: 300000,
      uptime: 99.95,
      avgResponseTime: '145ms',
      errors24h: 0,
      activeUsers: 856,
      description: 'Internal employee portal for procedures, forms, and benefits - used by all Sheriff staff',
      webhooks: ['document.published', 'form.submitted']
    },

    // Training & Compliance
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
      description: 'Georgia Peace Officer Standards & Training certification system',
      webhooks: ['cert.expiring', 'training.completed']
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
      dataTypes: ['Training Content', 'Performance Support', 'Tutorials', 'Documentation', 'User Guides'],
      monthlyRequests: 34567,
      requestLimit: 100000,
      uptime: 99.91,
      avgResponseTime: '265ms',
      errors24h: 1,
      activeCourses: 47,
      description: 'Learning and performance support platform integrated with county systems',
      webhooks: ['training.completed', 'content.accessed']
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
      description: 'Policy and training management system',
      webhooks: ['policy.updated', 'training.assigned', 'compliance.due']
    },

    // Courts & Justice
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
      dataTypes: ['Court Cases', 'Warrants', 'Commitments', 'Scheduling', 'Dispositions', 'Citations'],
      monthlyRequests: 178456,
      requestLimit: 300000,
      uptime: 99.95,
      avgResponseTime: '285ms',
      errors24h: 2,
      activeWarrants: 234,
      pendingCommitments: 12,
      description: 'County courts system - Sheriff operations integration for warrants and commitments',
      webhooks: ['warrant.issued', 'commitment.created', 'case.updated']
    },

    // Asset & Fleet Management
    assetWorks: {
      name: 'AssetWorks',
      vendor: 'AssetWorks LLC',
      type: 'asset-fleet',
      status: 'connected',
      version: 'v21.3',
      endpoint: 'https://assetworks.gwinnettcounty.gov/api/v2',
      authMethod: 'API Key + County SSO',
      apiKey: 'aw_live_7S8T9U1V2W3X4Y5Z',
      lastSync: '25 min ago',
      syncFrequency: 'Every 15 minutes',
      dataTypes: ['Fleet', 'Equipment', 'Vehicles', 'Maintenance', 'Work Orders', 'Asset Tracking'],
      monthlyRequests: 89456,
      requestLimit: 200000,
      uptime: 99.92,
      avgResponseTime: '265ms',
      errors24h: 4,
      vehiclesInService: 109,
      vehiclesInMaintenance: 6,
      equipmentAssets: 1247,
      description: 'County-wide asset and fleet management for Sheriff vehicles and equipment',
      webhooks: ['maintenance.due', 'workorder.completed', 'asset.updated']
    },

    // Document Management & Automation (In Procurement)
    digitalAutomation: {
      name: 'Digital Automation / ECM',
      vendor: 'TBD (In Procurement)',
      type: 'ecm-automation',
      status: 'planning',
      version: 'N/A',
      endpoint: 'https://ecm.gwinnettcounty.gov/api/v1',
      authMethod: 'To Be Configured',
      apiKey: 'Pending Implementation',
      lastSync: 'Not yet deployed',
      syncFrequency: 'N/A',
      dataTypes: ['Documents', 'Records', 'Workflows', 'Automation', 'Digital Forms', 'Content Management'],
      monthlyRequests: 0,
      requestLimit: 500000,
      uptime: 0,
      avgResponseTime: 'N/A',
      errors24h: 0,
      description: 'Enterprise digital automation and records management platform being procured - will integrate with NeoGov, Odyssey, UPerform, AssetWorks',
      integrationTargets: 'NeoGov, Odyssey, UPerform, AssetWorks, SAP',
      webhooks: []
    },

    // Communications
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
      dataTypes: ['Email', 'Calendar', 'Contacts', 'Teams', 'SharePoint', 'OneDrive'],
      monthlyRequests: 1567890,
      requestLimit: 5000000,
      uptime: 99.99,
      avgResponseTime: '78ms',
      errors24h: 1,
      activeUsers: 856,
      description: 'County-wide email and collaboration platform',
      webhooks: ['email.received', 'meeting.created']
    },
    motorolaP25: {
      name: 'Motorola P25 Radio System',
      vendor: 'Motorola Solutions',
      type: 'radio',
      status: 'connected',
      version: 'Phase 2',
      endpoint: 'https://p25.gwinnettcounty.gov/api',
      authMethod: 'Encrypted Certificate',
      apiKey: 'moto_live_9U1V2W3X4Y5Z6A7B',
      lastSync: 'Real-time',
      syncFrequency: 'Real-time',
      dataTypes: ['Radio Status', 'GPS Tracking', 'Emergency Alerts', 'Unit Availability', 'Talk Groups'],
      monthlyRequests: 2345678,
      requestLimit: 10000000,
      uptime: 99.99,
      avgResponseTime: '45ms',
      errors24h: 0,
      unitsOnline: 164,
      description: 'County-wide P25 digital radio system',
      webhooks: ['emergency.activated', 'unit.status.changed']
    }
  });

  const [apiKeys, setApiKeys] = useState([
    { id: 1, name: 'SentryOps Web Portal', key: 'sk_live_4F8K9N2P5Q7R8S1T', created: '2024-01-15', lastUsed: '2 min ago', permissions: 'Full Access', status: 'active' },
    { id: 2, name: 'Mobile Application', key: 'sk_live_7H8J9K1L2M3N4P5Q', created: '2024-03-22', lastUsed: '5 min ago', permissions: 'Read Only', status: 'active' },
    { id: 3, name: 'Third-party Integration', key: 'sk_live_2A3B4C5D6E7F8G9H', created: '2024-06-10', lastUsed: '30 days ago', permissions: 'Limited', status: 'inactive' }
  ]);

  const handleNavigation = (item) => {
    if (item.hasSubmenu) {
      setStaffingExpanded(!staffingExpanded);
    } else if (item.route) {
      navigate(item.route);
      setSidebarOpen(false);
    }
  };

  const handleSubmenuNavigation = (route) => {
    navigate(route);
    setSidebarOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    navigate('/signin');
  };

  const handleSaveSettings = () => {
    alert('Settings saved successfully!');
  };

  const handleTestConnection = async (integrationKey) => {
    setTestingConnection(integrationKey);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setTestingConnection(null);
    alert(`Connection test successful for ${integrations[integrationKey].name}`);
  };

  const handleCopyApiKey = (key) => {
    navigator.clipboard.writeText(key);
    alert('API key copied to clipboard');
  };

  const getIntegrationIcon = (type) => {
    const icons = {
      'dispatch': Radio,
      'records': Database,
      'criminal-data': Shield,
      'evidence': FileText,
      'bodycam': Camera,
      'jail': Building2,
      'communications': Smartphone,
      'commissary': DollarSign,
      'hr': Users,
      'training': FileText,
      'policy': FileText,
      'finance': DollarSign,
      'fleet': Activity,
      'fuel': Zap,
      'email': Mail,
      'radio': Radio,
      'mass-notification': Bell,
      'license-plate': Camera,
      'equipment': Shield
    };
    return icons[type] || Server;
  };

  const getStatusColor = (status) => {
    return status === 'connected' ? 'text-green-400' : status === 'error' ? 'text-red-400' : 'text-yellow-400';
  };

  const getStatusBg = (status) => {
    return status === 'connected' ? 'bg-green-500/20' : status === 'error' ? 'bg-red-500/20' : 'bg-yellow-500/20';
  };

  const getStatusBorder = (status) => {
    return status === 'connected' ? 'border-green-500/30' : status === 'error' ? 'border-red-500/30' : 'border-yellow-500/30';
  };

  const getSettingsTabs = () => {
    const baseTabs = [
      { id: 'profile', label: 'Profile', icon: User },
      { id: 'notifications', label: 'Notifications', icon: Bell },
      { id: 'display', label: 'Display', icon: Monitor },
      { id: 'security', label: 'Security', icon: Lock }
    ];

    if (userRole === 'command' || userRole === 'admin') {
      return [
        ...baseTabs,
        { id: 'integrations', label: 'Integrations', icon: Link },
        { id: 'api', label: 'API Management', icon: Code },
        { id: 'data', label: 'Data & Export', icon: Database },
        { id: 'system', label: 'System', icon: Settings },
        { id: 'audit', label: 'Audit Logs', icon: FileText }
      ];
    }

    if (userRole === 'hr') {
      return [
        ...baseTabs,
        { id: 'integrations', label: 'Integrations', icon: Link },
        { id: 'system', label: 'System', icon: Settings }
      ];
    }

    return baseTabs;
  };

  const settingsTabs = getSettingsTabs();

  return (
    <DashboardLayout>
      <div className="p-5 lg:p-8 space-y-8">
          <div className="max-w-[1600px] mx-auto">
            <div className="mb-6">
              <h2 className="text-2xl lg:text-3xl font-bold text-white mb-2">Settings & Configuration</h2>
              <p className="text-slate-400">Manage your account, system integrations, and enterprise settings</p>
            </div>

            {/* System Status Banner */}
            <div className="mb-6 bg-gradient-to-r from-green-500/10 to-emerald-500/5 border border-green-500/20 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 text-green-400" />
                  </div>
                  <div>
                    <h4 className="text-base font-semibold text-white">All Systems Operational</h4>
                    <p className="text-sm text-slate-300">14 integrations active, 1 in planning • 99.97% average uptime • Last sync: 1 min ago</p>
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
              <Shield className="w-4 h-4 text-amber-400" />
              <span className="text-sm font-semibold text-amber-400 uppercase">{userRole === 'command' ? 'Command Staff' : userRole === 'hr' ? 'Human Resources' : 'Officer'} Access Level</span>
            </div>

            {/* Settings Navigation */}
            <div className="mb-6 flex gap-2 border-b border-slate-700/50 overflow-x-auto scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
              {settingsTabs.map(tab => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveSection(tab.id)}
                    className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-all relative whitespace-nowrap ${
                      activeSection === tab.id ? 'text-amber-400' : 'text-slate-400 hover:text-slate-300'
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
                <>
                  <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-semibold text-white">Profile Information</h3>
                      <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/20 border border-green-500/30 rounded-lg">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span className="text-xs font-medium text-green-400">Verified Account</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Full Name</label>
                        <input
                          type="text"
                          value={profileSettings.fullName}
                          onChange={(e) => setProfileSettings({...profileSettings, fullName: e.target.value})}
                          className="w-full px-4 py-2.5 bg-slate-800/40 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
                        <input
                          type="email"
                          value={profileSettings.email}
                          onChange={(e) => setProfileSettings({...profileSettings, email: e.target.value})}
                          className="w-full px-4 py-2.5 bg-slate-800/40 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Badge Number</label>
                        <input
                          type="text"
                          value={profileSettings.badge}
                          onChange={(e) => setProfileSettings({...profileSettings, badge: e.target.value})}
                          className="w-full px-4 py-2.5 bg-slate-800/40 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Phone Number</label>
                        <input
                          type="tel"
                          value={profileSettings.phone}
                          onChange={(e) => setProfileSettings({...profileSettings, phone: e.target.value})}
                          className="w-full px-4 py-2.5 bg-slate-800/40 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50 transition-colors"
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
                        <label className="block text-sm font-medium text-slate-300 mb-2">Division</label>
                        <input
                          type="text"
                          value={profileSettings.division}
                          disabled
                          className="w-full px-4 py-2.5 bg-slate-800/20 border border-slate-700/50 rounded-xl text-slate-400 cursor-not-allowed"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Hire Date</label>
                        <input
                          type="text"
                          value={profileSettings.hireDate}
                          disabled
                          className="w-full px-4 py-2.5 bg-slate-800/20 border border-slate-700/50 rounded-xl text-slate-400 cursor-not-allowed"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Certification Expiry</label>
                        <input
                          type="text"
                          value={profileSettings.certificationExpiry}
                          disabled
                          className="w-full px-4 py-2.5 bg-slate-800/20 border border-slate-700/50 rounded-xl text-slate-400 cursor-not-allowed"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Profile Photo */}
                  <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Profile Photo</h3>
                    <div className="flex items-center gap-6">
                      <div className="w-24 h-24 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-3xl font-bold">ST</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-slate-300 mb-3">Update your profile photo. Recommended size: 400x400px</p>
                        <div className="flex gap-3">
                          <button className="flex items-center gap-2 px-4 py-2 bg-blue-500/20 border border-blue-500/30 text-blue-400 rounded-xl text-sm font-medium hover:bg-blue-500/30 transition-all">
                            <Upload className="w-4 h-4" />
                            Upload Photo
                          </button>
                          <button className="px-4 py-2 bg-slate-700/40 border border-slate-600/50 text-slate-300 rounded-xl text-sm font-medium hover:bg-slate-700/60 transition-all">
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Notifications Settings */}
              {activeSection === 'notifications' && (
                <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-6">Notification Preferences</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-3 border-b border-slate-700/30">
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-white">Email Notifications</h4>
                        <p className="text-xs text-slate-400 mt-1">Receive notifications via email</p>
                      </div>
                      <button
                        onClick={() => setNotificationSettings({...notificationSettings, emailNotifications: !notificationSettings.emailNotifications})}
                        className={`relative w-12 h-6 rounded-full transition-colors ${notificationSettings.emailNotifications ? 'bg-green-500' : 'bg-slate-600'}`}
                      >
                        <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${notificationSettings.emailNotifications ? 'translate-x-6' : 'translate-x-0'}`}></div>
                      </button>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-slate-700/30">
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-white">SMS Notifications</h4>
                        <p className="text-xs text-slate-400 mt-1">Receive text message alerts</p>
                      </div>
                      <button
                        onClick={() => setNotificationSettings({...notificationSettings, smsNotifications: !notificationSettings.smsNotifications})}
                        className={`relative w-12 h-6 rounded-full transition-colors ${notificationSettings.smsNotifications ? 'bg-green-500' : 'bg-slate-600'}`}
                      >
                        <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${notificationSettings.smsNotifications ? 'translate-x-6' : 'translate-x-0'}`}></div>
                      </button>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-slate-700/30">
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-white">Push Notifications</h4>
                        <p className="text-xs text-slate-400 mt-1">Browser and mobile push notifications</p>
                      </div>
                      <button
                        onClick={() => setNotificationSettings({...notificationSettings, pushNotifications: !notificationSettings.pushNotifications})}
                        className={`relative w-12 h-6 rounded-full transition-colors ${notificationSettings.pushNotifications ? 'bg-green-500' : 'bg-slate-600'}`}
                      >
                        <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${notificationSettings.pushNotifications ? 'translate-x-6' : 'translate-x-0'}`}></div>
                      </button>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-slate-700/30">
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-white">Critical Alerts</h4>
                        <p className="text-xs text-slate-400 mt-1">High-priority operational alerts</p>
                      </div>
                      <button
                        onClick={() => setNotificationSettings({...notificationSettings, criticalAlerts: !notificationSettings.criticalAlerts})}
                        className={`relative w-12 h-6 rounded-full transition-colors ${notificationSettings.criticalAlerts ? 'bg-green-500' : 'bg-slate-600'}`}
                      >
                        <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${notificationSettings.criticalAlerts ? 'translate-x-6' : 'translate-x-0'}`}></div>
                      </button>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-slate-700/30">
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-white">Report Reminders</h4>
                        <p className="text-xs text-slate-400 mt-1">Due date reminders for reports</p>
                      </div>
                      <button
                        onClick={() => setNotificationSettings({...notificationSettings, reportReminders: !notificationSettings.reportReminders})}
                        className={`relative w-12 h-6 rounded-full transition-colors ${notificationSettings.reportReminders ? 'bg-green-500' : 'bg-slate-600'}`}
                      >
                        <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${notificationSettings.reportReminders ? 'translate-x-6' : 'translate-x-0'}`}></div>
                      </button>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-slate-700/30">
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-white">System Updates</h4>
                        <p className="text-xs text-slate-400 mt-1">Software updates and maintenance</p>
                      </div>
                      <button
                        onClick={() => setNotificationSettings({...notificationSettings, systemUpdates: !notificationSettings.systemUpdates})}
                        className={`relative w-12 h-6 rounded-full transition-colors ${notificationSettings.systemUpdates ? 'bg-green-500' : 'bg-slate-600'}`}
                      >
                        <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${notificationSettings.systemUpdates ? 'translate-x-6' : 'translate-x-0'}`}></div>
                      </button>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-slate-700/30">
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-white">Personnel Alerts</h4>
                        <p className="text-xs text-slate-400 mt-1">Staff changes and updates</p>
                      </div>
                      <button
                        onClick={() => setNotificationSettings({...notificationSettings, personnelAlerts: !notificationSettings.personnelAlerts})}
                        className={`relative w-12 h-6 rounded-full transition-colors ${notificationSettings.personnelAlerts ? 'bg-green-500' : 'bg-slate-600'}`}
                      >
                        <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${notificationSettings.personnelAlerts ? 'translate-x-6' : 'translate-x-0'}`}></div>
                      </button>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-slate-700/30">
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-white">Budget Alerts</h4>
                        <p className="text-xs text-slate-400 mt-1">Budget thresholds and approvals</p>
                      </div>
                      <button
                        onClick={() => setNotificationSettings({...notificationSettings, budgetAlerts: !notificationSettings.budgetAlerts})}
                        className={`relative w-12 h-6 rounded-full transition-colors ${notificationSettings.budgetAlerts ? 'bg-green-500' : 'bg-slate-600'}`}
                      >
                        <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${notificationSettings.budgetAlerts ? 'translate-x-6' : 'translate-x-0'}`}></div>
                      </button>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-slate-700/30">
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-white">Compliance Alerts</h4>
                        <p className="text-xs text-slate-400 mt-1">Training and certification expiry</p>
                      </div>
                      <button
                        onClick={() => setNotificationSettings({...notificationSettings, complianceAlerts: !notificationSettings.complianceAlerts})}
                        className={`relative w-12 h-6 rounded-full transition-colors ${notificationSettings.complianceAlerts ? 'bg-green-500' : 'bg-slate-600'}`}
                      >
                        <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${notificationSettings.complianceAlerts ? 'translate-x-6' : 'translate-x-0'}`}></div>
                      </button>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-slate-700/30">
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-white">Integration Alerts</h4>
                        <p className="text-xs text-slate-400 mt-1">Integration sync and errors</p>
                      </div>
                      <button
                        onClick={() => setNotificationSettings({...notificationSettings, integrationAlerts: !notificationSettings.integrationAlerts})}
                        className={`relative w-12 h-6 rounded-full transition-colors ${notificationSettings.integrationAlerts ? 'bg-green-500' : 'bg-slate-600'}`}
                      >
                        <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${notificationSettings.integrationAlerts ? 'translate-x-6' : 'translate-x-0'}`}></div>
                      </button>
                    </div>
                    <div className="flex items-center justify-between py-3">
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-white">Security Alerts</h4>
                        <p className="text-xs text-slate-400 mt-1">Login attempts and security events</p>
                      </div>
                      <button
                        onClick={() => setNotificationSettings({...notificationSettings, securityAlerts: !notificationSettings.securityAlerts})}
                        className={`relative w-12 h-6 rounded-full transition-colors ${notificationSettings.securityAlerts ? 'bg-green-500' : 'bg-slate-600'}`}
                      >
                        <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${notificationSettings.securityAlerts ? 'translate-x-6' : 'translate-x-0'}`}></div>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Display Settings */}
              {activeSection === 'display' && (
                <div className="space-y-6">
                  <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-6">Appearance</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-3">Theme</label>
                        <div className="grid grid-cols-3 gap-3">
                          <button
                            onClick={() => setDisplaySettings({...displaySettings, theme: 'dark'})}
                            className={`p-4 rounded-xl border-2 transition-all ${displaySettings.theme === 'dark' ? 'border-amber-500 bg-slate-800/60' : 'border-slate-700/50 bg-slate-800/20 hover:bg-slate-800/40'}`}
                          >
                            <Moon className="w-6 h-6 text-slate-300 mb-2" />
                            <p className="text-sm font-medium text-white">Dark</p>
                          </button>
                          <button
                            onClick={() => setDisplaySettings({...displaySettings, theme: 'light'})}
                            className={`p-4 rounded-xl border-2 transition-all ${displaySettings.theme === 'light' ? 'border-amber-500 bg-slate-800/60' : 'border-slate-700/50 bg-slate-800/20 hover:bg-slate-800/40'}`}
                          >
                            <Sun className="w-6 h-6 text-slate-300 mb-2" />
                            <p className="text-sm font-medium text-white">Light</p>
                          </button>
                          <button
                            onClick={() => setDisplaySettings({...displaySettings, theme: 'auto'})}
                            className={`p-4 rounded-xl border-2 transition-all ${displaySettings.theme === 'auto' ? 'border-amber-500 bg-slate-800/60' : 'border-slate-700/50 bg-slate-800/20 hover:bg-slate-800/40'}`}
                          >
                            <Monitor className="w-6 h-6 text-slate-300 mb-2" />
                            <p className="text-sm font-medium text-white">Auto</p>
                          </button>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Date Format</label>
                        <select
                          value={displaySettings.dateFormat}
                          onChange={(e) => setDisplaySettings({...displaySettings, dateFormat: e.target.value})}
                          className="w-full px-4 py-2.5 bg-slate-800/40 border border-slate-700/50 rounded-xl text-white focus:outline-none focus:border-amber-500/50 transition-colors"
                        >
                          <option value="MM/DD/YYYY">MM/DD/YYYY (12/11/2025)</option>
                          <option value="DD/MM/YYYY">DD/MM/YYYY (11/12/2025)</option>
                          <option value="YYYY-MM-DD">YYYY-MM-DD (2025-12-11)</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Time Format</label>
                        <select
                          value={displaySettings.timeFormat}
                          onChange={(e) => setDisplaySettings({...displaySettings, timeFormat: e.target.value})}
                          className="w-full px-4 py-2.5 bg-slate-800/40 border border-slate-700/50 rounded-xl text-white focus:outline-none focus:border-amber-500/50 transition-colors"
                        >
                          <option value="12h">12-hour (3:45 PM)</option>
                          <option value="24h">24-hour (15:45)</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Timezone</label>
                        <select
                          value={displaySettings.timezone}
                          onChange={(e) => setDisplaySettings({...displaySettings, timezone: e.target.value})}
                          className="w-full px-4 py-2.5 bg-slate-800/40 border border-slate-700/50 rounded-xl text-white focus:outline-none focus:border-amber-500/50 transition-colors"
                        >
                          <option value="America/New_York">Eastern Time (ET)</option>
                          <option value="America/Chicago">Central Time (CT)</option>
                          <option value="America/Denver">Mountain Time (MT)</option>
                          <option value="America/Los_Angeles">Pacific Time (PT)</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Density</label>
                        <select
                          value={displaySettings.density}
                          onChange={(e) => setDisplaySettings({...displaySettings, density: e.target.value})}
                          className="w-full px-4 py-2.5 bg-slate-800/40 border border-slate-700/50 rounded-xl text-white focus:outline-none focus:border-amber-500/50 transition-colors"
                        >
                          <option value="compact">Compact</option>
                          <option value="comfortable">Comfortable</option>
                          <option value="spacious">Spacious</option>
                        </select>
                      </div>
                      <div className="flex items-center justify-between py-3">
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-white">Animations</h4>
                          <p className="text-xs text-slate-400 mt-1">Enable interface animations</p>
                        </div>
                        <button
                          onClick={() => setDisplaySettings({...displaySettings, animations: !displaySettings.animations})}
                          className={`relative w-12 h-6 rounded-full transition-colors ${displaySettings.animations ? 'bg-green-500' : 'bg-slate-600'}`}
                        >
                          <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${displaySettings.animations ? 'translate-x-6' : 'translate-x-0'}`}></div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Security Settings */}
              {activeSection === 'security' && (
                <div className="space-y-6">
                  <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-6">Authentication & Access</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between py-3 border-b border-slate-700/30">
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-white">Two-Factor Authentication</h4>
                          <p className="text-xs text-slate-400 mt-1">Require 2FA for account access</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-medium text-green-400">Enabled</span>
                          <button
                            onClick={() => setSecuritySettings({...securitySettings, twoFactorAuth: !securitySettings.twoFactorAuth})}
                            className={`relative w-12 h-6 rounded-full transition-colors ${securitySettings.twoFactorAuth ? 'bg-green-500' : 'bg-slate-600'}`}
                          >
                            <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${securitySettings.twoFactorAuth ? 'translate-x-6' : 'translate-x-0'}`}></div>
                          </button>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Session Timeout (minutes)</label>
                        <select
                          value={securitySettings.sessionTimeout}
                          onChange={(e) => setSecuritySettings({...securitySettings, sessionTimeout: e.target.value})}
                          className="w-full px-4 py-2.5 bg-slate-800/40 border border-slate-700/50 rounded-xl text-white focus:outline-none focus:border-amber-500/50 transition-colors"
                        >
                          <option value="15">15 minutes</option>
                          <option value="30">30 minutes</option>
                          <option value="60">1 hour</option>
                          <option value="120">2 hours</option>
                          <option value="480">8 hours</option>
                        </select>
                      </div>
                      <div className="flex items-center justify-between py-3 border-b border-slate-700/30">
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-white">Login Notifications</h4>
                          <p className="text-xs text-slate-400 mt-1">Notify on new device login</p>
                        </div>
                        <button
                          onClick={() => setSecuritySettings({...securitySettings, loginNotifications: !securitySettings.loginNotifications})}
                          className={`relative w-12 h-6 rounded-full transition-colors ${securitySettings.loginNotifications ? 'bg-green-500' : 'bg-slate-600'}`}
                        >
                          <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${securitySettings.loginNotifications ? 'translate-x-6' : 'translate-x-0'}`}></div>
                        </button>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Password Expiry (days)</label>
                        <select
                          value={securitySettings.passwordExpiry}
                          onChange={(e) => setSecuritySettings({...securitySettings, passwordExpiry: e.target.value})}
                          className="w-full px-4 py-2.5 bg-slate-800/40 border border-slate-700/50 rounded-xl text-white focus:outline-none focus:border-amber-500/50 transition-colors"
                        >
                          <option value="30">30 days</option>
                          <option value="60">60 days</option>
                          <option value="90">90 days</option>
                          <option value="180">180 days</option>
                          <option value="never">Never</option>
                        </select>
                      </div>
                      <div className="flex items-center justify-between py-3 border-b border-slate-700/30">
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-white">IP Whitelist</h4>
                          <p className="text-xs text-slate-400 mt-1">Restrict access to approved IPs</p>
                        </div>
                        <button
                          onClick={() => setSecuritySettings({...securitySettings, ipWhitelist: !securitySettings.ipWhitelist})}
                          className={`relative w-12 h-6 rounded-full transition-colors ${securitySettings.ipWhitelist ? 'bg-green-500' : 'bg-slate-600'}`}
                        >
                          <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${securitySettings.ipWhitelist ? 'translate-x-6' : 'translate-x-0'}`}></div>
                        </button>
                      </div>
                      <div className="flex items-center justify-between py-3 border-b border-slate-700/30">
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-white">Audit Logging</h4>
                          <p className="text-xs text-slate-400 mt-1">Track all user actions</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-medium text-green-400">Required</span>
                          <button
                            disabled
                            className="relative w-12 h-6 rounded-full bg-green-500 cursor-not-allowed opacity-75"
                          >
                            <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full translate-x-6"></div>
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between py-3">
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-white">SSO Integration</h4>
                          <p className="text-xs text-slate-400 mt-1">Single Sign-On with County AD</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-medium text-green-400">Active</span>
                          <button
                            onClick={() => setSecuritySettings({...securitySettings, ssoEnabled: !securitySettings.ssoEnabled})}
                            className={`relative w-12 h-6 rounded-full transition-colors ${securitySettings.ssoEnabled ? 'bg-green-500' : 'bg-slate-600'}`}
                          >
                            <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${securitySettings.ssoEnabled ? 'translate-x-6' : 'translate-x-0'}`}></div>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-6">Active Sessions</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-4 p-4 bg-slate-800/30 border border-slate-700/30 rounded-xl">
                        <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center">
                          <Monitor className="w-5 h-5 text-green-400" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-white">Chrome on Windows • Current Session</p>
                          <p className="text-xs text-slate-400">Gwinnett County Sheriff HQ • 172.16.45.102</p>
                          <p className="text-xs text-slate-500 mt-1">Last active: Just now</p>
                        </div>
                        <div className="px-3 py-1.5 bg-green-500/20 border border-green-500/30 rounded-lg">
                          <span className="text-xs font-medium text-green-400">Active</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 p-4 bg-slate-800/30 border border-slate-700/30 rounded-xl">
                        <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
                          <Smartphone className="w-5 h-5 text-blue-400" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-white">Mobile App • iPhone 14 Pro</p>
                          <p className="text-xs text-slate-400">Patrol Unit 203 • Mobile Network</p>
                          <p className="text-xs text-slate-500 mt-1">Last active: 45 min ago</p>
                        </div>
                        <button className="px-3 py-1.5 bg-red-500/20 border border-red-500/30 text-red-400 rounded-lg text-xs font-medium hover:bg-red-500/30 transition-all">
                          Revoke
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Change Password</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Current Password</label>
                        <input
                          type="password"
                          className="w-full px-4 py-2.5 bg-slate-800/40 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50 transition-colors"
                          placeholder="Enter current password"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">New Password</label>
                        <input
                          type="password"
                          className="w-full px-4 py-2.5 bg-slate-800/40 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50 transition-colors"
                          placeholder="Enter new password"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Confirm New Password</label>
                        <input
                          type="password"
                          className="w-full px-4 py-2.5 bg-slate-800/40 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50 transition-colors"
                          placeholder="Confirm new password"
                        />
                      </div>
                      <button className="flex items-center gap-2 px-4 py-2 bg-blue-500/20 border border-blue-500/30 text-blue-400 rounded-xl text-sm font-medium hover:bg-blue-500/30 transition-all">
                        <Key className="w-4 h-4" />
                        Update Password
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Integrations Settings */}
              {activeSection === 'integrations' && (
                <div className="space-y-4">
                  {Object.entries(integrations).map(([key, integration]) => {
                    const Icon = getIntegrationIcon(integration.type);
                    const isExpanded = expandedIntegration === key;
                    return (
                      <div key={key} className="bg-slate-800/40 border border-slate-700/50 rounded-xl overflow-hidden">
                        <div
                          onClick={() => setExpandedIntegration(isExpanded ? null : key)}
                          className="p-6 cursor-pointer hover:bg-slate-800/20 transition-colors"
                        >
                          <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 ${getStatusBg(integration.status)} border ${getStatusBorder(integration.status)} rounded-xl flex items-center justify-center`}>
                              <Icon className={`w-6 h-6 ${getStatusColor(integration.status)}`} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-3 mb-1">
                                <h4 className="text-base font-semibold text-white">{integration.name}</h4>
                                <div className={`flex items-center gap-1.5 px-2 py-1 ${getStatusBg(integration.status)} border ${getStatusBorder(integration.status)} rounded-md`}>
                                  <div className={`w-1.5 h-1.5 ${integration.status === 'connected' ? 'bg-green-400' : 'bg-red-400'} rounded-full`}></div>
                                  <span className={`text-xs font-medium ${getStatusColor(integration.status)}`}>
                                    {integration.status === 'connected' ? 'Connected' : 'Disconnected'}
                                  </span>
                                </div>
                                <span className="text-xs text-slate-400">{integration.version}</span>
                              </div>
                              <div className="flex items-center gap-4 text-xs text-slate-400">
                                <span className="flex items-center gap-1">
                                  <Activity className="w-3 h-3" />
                                  {integration.uptime}% uptime
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {integration.avgResponseTime}
                                </span>
                                <span className="flex items-center gap-1">
                                  <RefreshCw className="w-3 h-3" />
                                  {integration.lastSync}
                                </span>
                              </div>
                            </div>
                            <button className="p-2 hover:bg-slate-700/40 rounded-lg transition-colors">
                              {isExpanded ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                            </button>
                          </div>
                        </div>

                        {isExpanded && (
                          <div className="px-6 pb-6 border-t border-slate-700/30">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                              <div className="space-y-4">
                                <div>
                                  <p className="text-xs font-medium text-slate-400 mb-2">Vendor</p>
                                  <p className="text-sm text-white">{integration.vendor}</p>
                                </div>
                                <div>
                                  <p className="text-xs font-medium text-slate-400 mb-2">API Endpoint</p>
                                  <div className="flex items-center gap-2">
                                    <code className="flex-1 text-xs text-blue-400 bg-slate-900/50 px-3 py-2 rounded-lg border border-slate-700/50 overflow-x-auto">{integration.endpoint}</code>
                                    <button
                                      onClick={() => handleCopyApiKey(integration.endpoint)}
                                      className="p-2 hover:bg-slate-700/40 rounded-lg transition-colors"
                                      title="Copy endpoint"
                                    >
                                      <Copy className="w-4 h-4 text-slate-400" />
                                    </button>
                                  </div>
                                </div>
                                <div>
                                  <p className="text-xs font-medium text-slate-400 mb-2">Authentication Method</p>
                                  <p className="text-sm text-white">{integration.authMethod}</p>
                                </div>
                                <div>
                                  <p className="text-xs font-medium text-slate-400 mb-2">API Key</p>
                                  <div className="flex items-center gap-2">
                                    <code className="flex-1 text-xs text-amber-400 bg-slate-900/50 px-3 py-2 rounded-lg border border-slate-700/50">
                                      {showApiKey[key] ? integration.apiKey : '••••••••••••••••••••'}
                                    </code>
                                    <button
                                      onClick={() => setShowApiKey({...showApiKey, [key]: !showApiKey[key]})}
                                      className="p-2 hover:bg-slate-700/40 rounded-lg transition-colors"
                                      title={showApiKey[key] ? 'Hide' : 'Show'}
                                    >
                                      {showApiKey[key] ? <EyeOff className="w-4 h-4 text-slate-400" /> : <Eye className="w-4 h-4 text-slate-400" />}
                                    </button>
                                    <button
                                      onClick={() => handleCopyApiKey(integration.apiKey)}
                                      className="p-2 hover:bg-slate-700/40 rounded-lg transition-colors"
                                      title="Copy API key"
                                    >
                                      <Copy className="w-4 h-4 text-slate-400" />
                                    </button>
                                  </div>
                                </div>
                              </div>

                              <div className="space-y-4">
                                <div>
                                  <p className="text-xs font-medium text-slate-400 mb-2">Sync Frequency</p>
                                  <p className="text-sm text-white">{integration.syncFrequency}</p>
                                </div>
                                <div>
                                  <p className="text-xs font-medium text-slate-400 mb-2">Data Types</p>
                                  <div className="flex flex-wrap gap-2">
                                    {integration.dataTypes.map((type, idx) => (
                                      <span key={idx} className="px-2 py-1 bg-slate-700/40 border border-slate-600/50 rounded-md text-xs text-slate-300">
                                        {type}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <p className="text-xs font-medium text-slate-400 mb-2">Monthly Requests</p>
                                    <p className="text-sm text-white">{integration.monthlyRequests.toLocaleString()} / {integration.requestLimit.toLocaleString()}</p>
                                    <div className="mt-2 h-2 bg-slate-700/40 rounded-full overflow-hidden">
                                      <div
                                        className="h-full bg-gradient-to-r from-blue-500 to-cyan-500"
                                        style={{width: `${(integration.monthlyRequests / integration.requestLimit) * 100}%`}}
                                      ></div>
                                    </div>
                                  </div>
                                  <div>
                                    <p className="text-xs font-medium text-slate-400 mb-2">24h Errors</p>
                                    <p className="text-sm text-white">{integration.errors24h} errors</p>
                                  </div>
                                </div>
                                {integration.webhooks && integration.webhooks.length > 0 && (
                                  <div>
                                    <p className="text-xs font-medium text-slate-400 mb-2">Active Webhooks</p>
                                    <div className="space-y-1">
                                      {integration.webhooks.map((webhook, idx) => (
                                        <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                                          <Webhook className="w-3 h-3 text-slate-400" />
                                          <code className="text-green-400">{webhook}</code>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Integration-specific metrics */}
                            {(integration.storage || integration.devicesActive || integration.currentInmates || integration.callsToday || integration.ordersToday || integration.employees || integration.expiringSoon || integration.pendingAcknowledgments || integration.policyUpdates || integration.pendingApprovals || integration.vehiclesInService || integration.monthlySpend || integration.activeUsers || integration.unitsOnline || integration.contacts || integration.readsToday || integration.deploymentsMonth) && (
                              <div className="mt-6 pt-6 border-t border-slate-700/30">
                                <p className="text-xs font-medium text-slate-400 mb-3">Live Metrics</p>
                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                  {integration.storage && (
                                    <div className="bg-slate-900/50 border border-slate-700/50 rounded-xl p-4">
                                      <p className="text-xs text-slate-400 mb-1">Storage</p>
                                      <p className="text-sm font-semibold text-white">{integration.storage}</p>
                                    </div>
                                  )}
                                  {integration.devicesActive !== undefined && (
                                    <div className="bg-slate-900/50 border border-slate-700/50 rounded-xl p-4">
                                      <p className="text-xs text-slate-400 mb-1">Devices</p>
                                      <p className="text-sm font-semibold text-white">{integration.devicesActive}/{integration.devicesTotal}</p>
                                    </div>
                                  )}
                                  {integration.currentInmates !== undefined && (
                                    <div className="bg-slate-900/50 border border-slate-700/50 rounded-xl p-4">
                                      <p className="text-xs text-slate-400 mb-1">Inmates</p>
                                      <p className="text-sm font-semibold text-white">{integration.currentInmates}/{integration.capacity}</p>
                                    </div>
                                  )}
                                  {integration.callsToday && (
                                    <div className="bg-slate-900/50 border border-slate-700/50 rounded-xl p-4">
                                      <p className="text-xs text-slate-400 mb-1">Calls Today</p>
                                      <p className="text-sm font-semibold text-white">{integration.callsToday}</p>
                                    </div>
                                  )}
                                  {integration.ordersToday && (
                                    <div className="bg-slate-900/50 border border-slate-700/50 rounded-xl p-4">
                                      <p className="text-xs text-slate-400 mb-1">Orders Today</p>
                                      <p className="text-sm font-semibold text-white">{integration.ordersToday}</p>
                                    </div>
                                  )}
                                  {integration.employees && (
                                    <div className="bg-slate-900/50 border border-slate-700/50 rounded-xl p-4">
                                      <p className="text-xs text-slate-400 mb-1">Employees</p>
                                      <p className="text-sm font-semibold text-white">{integration.employees}</p>
                                    </div>
                                  )}
                                  {integration.expiringSoon && (
                                    <div className="bg-slate-900/50 border border-slate-700/50 rounded-xl p-4">
                                      <p className="text-xs text-slate-400 mb-1">Expiring Soon</p>
                                      <p className="text-sm font-semibold text-amber-400">{integration.expiringSoon}</p>
                                    </div>
                                  )}
                                  {integration.pendingAcknowledgments && (
                                    <div className="bg-slate-900/50 border border-slate-700/50 rounded-xl p-4">
                                      <p className="text-xs text-slate-400 mb-1">Pending</p>
                                      <p className="text-sm font-semibold text-amber-400">{integration.pendingAcknowledgments}</p>
                                    </div>
                                  )}
                                  {integration.policyUpdates && (
                                    <div className="bg-slate-900/50 border border-slate-700/50 rounded-xl p-4">
                                      <p className="text-xs text-slate-400 mb-1">Policy Updates</p>
                                      <p className="text-sm font-semibold text-blue-400">{integration.policyUpdates}</p>
                                    </div>
                                  )}
                                  {integration.pendingApprovals && (
                                    <div className="bg-slate-900/50 border border-slate-700/50 rounded-xl p-4">
                                      <p className="text-xs text-slate-400 mb-1">Pending Approvals</p>
                                      <p className="text-sm font-semibold text-amber-400">{integration.pendingApprovals}</p>
                                    </div>
                                  )}
                                  {integration.vehiclesInService !== undefined && (
                                    <div className="bg-slate-900/50 border border-slate-700/50 rounded-xl p-4">
                                      <p className="text-xs text-slate-400 mb-1">Vehicles</p>
                                      <p className="text-sm font-semibold text-white">{integration.vehiclesInService} active, {integration.vehiclesInMaintenance} maintenance</p>
                                    </div>
                                  )}
                                  {integration.monthlySpend && (
                                    <div className="bg-slate-900/50 border border-slate-700/50 rounded-xl p-4">
                                      <p className="text-xs text-slate-400 mb-1">Monthly Spend</p>
                                      <p className="text-sm font-semibold text-white">{integration.monthlySpend}</p>
                                    </div>
                                  )}
                                  {integration.activeUsers && (
                                    <div className="bg-slate-900/50 border border-slate-700/50 rounded-xl p-4">
                                      <p className="text-xs text-slate-400 mb-1">Active Users</p>
                                      <p className="text-sm font-semibold text-white">{integration.activeUsers}</p>
                                    </div>
                                  )}
                                  {integration.unitsOnline && (
                                    <div className="bg-slate-900/50 border border-slate-700/50 rounded-xl p-4">
                                      <p className="text-xs text-slate-400 mb-1">Units Online</p>
                                      <p className="text-sm font-semibold text-green-400">{integration.unitsOnline}</p>
                                    </div>
                                  )}
                                  {integration.contacts && (
                                    <div className="bg-slate-900/50 border border-slate-700/50 rounded-xl p-4">
                                      <p className="text-xs text-slate-400 mb-1">Contacts</p>
                                      <p className="text-sm font-semibold text-white">{integration.contacts.toLocaleString()}</p>
                                    </div>
                                  )}
                                  {integration.readsToday && (
                                    <div className="bg-slate-900/50 border border-slate-700/50 rounded-xl p-4">
                                      <p className="text-xs text-slate-400 mb-1">Reads Today</p>
                                      <p className="text-sm font-semibold text-white">{integration.readsToday.toLocaleString()}</p>
                                    </div>
                                  )}
                                  {integration.hotlistMatches !== undefined && (
                                    <div className="bg-slate-900/50 border border-slate-700/50 rounded-xl p-4">
                                      <p className="text-xs text-slate-400 mb-1">Hotlist Matches</p>
                                      <p className="text-sm font-semibold text-red-400">{integration.hotlistMatches}</p>
                                    </div>
                                  )}
                                  {integration.deploymentsMonth && (
                                    <div className="bg-slate-900/50 border border-slate-700/50 rounded-xl p-4">
                                      <p className="text-xs text-slate-400 mb-1">Deployments (Month)</p>
                                      <p className="text-sm font-semibold text-white">{integration.deploymentsMonth}</p>
                                    </div>
                                  )}
                                </div>
                              </div>
                            )}

                            <div className="mt-6 flex items-center gap-3">
                              <button
                                onClick={() => handleTestConnection(key)}
                                disabled={testingConnection === key}
                                className="flex items-center gap-2 px-4 py-2 bg-blue-500/20 border border-blue-500/30 text-blue-400 rounded-xl text-sm font-medium hover:bg-blue-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                {testingConnection === key ? (
                                  <>
                                    <RefreshCw className="w-4 h-4 animate-spin" />
                                    Testing...
                                  </>
                                ) : (
                                  <>
                                    <Wifi className="w-4 h-4" />
                                    Test Connection
                                  </>
                                )}
                              </button>
                              <button className="flex items-center gap-2 px-4 py-2 bg-slate-700/40 border border-slate-600/50 text-slate-300 rounded-xl text-sm font-medium hover:bg-slate-700/60 transition-all">
                                <RefreshCw className="w-4 h-4" />
                                Sync Now
                              </button>
                              <button className="flex items-center gap-2 px-4 py-2 bg-slate-700/40 border border-slate-600/50 text-slate-300 rounded-xl text-sm font-medium hover:bg-slate-700/60 transition-all">
                                <Settings className="w-4 h-4" />
                                Configure
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* API Management */}
              {activeSection === 'api' && (
                <div className="space-y-6">
                  <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h3 className="text-lg font-semibold text-white">API Keys</h3>
                        <p className="text-sm text-slate-400 mt-1">Manage API access keys for SentryOps platform</p>
                      </div>
                      <button className="flex items-center gap-2 px-4 py-2 bg-blue-500/20 border border-blue-500/30 text-blue-400 rounded-xl text-sm font-medium hover:bg-blue-500/30 transition-all">
                        <Plus className="w-4 h-4" />
                        Generate New Key
                      </button>
                    </div>

                    <div className="space-y-3">
                      {apiKeys.map(apiKey => (
                        <div key={apiKey.id} className="flex items-center gap-4 p-4 bg-slate-800/30 border border-slate-700/30 rounded-xl">
                          <div className={`w-10 h-10 ${apiKey.status === 'active' ? 'bg-green-500/20' : 'bg-slate-700/40'} rounded-xl flex items-center justify-center`}>
                            <Key className={`w-5 h-5 ${apiKey.status === 'active' ? 'text-green-400' : 'text-slate-500'}`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-white">{apiKey.name}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <code className="text-xs text-amber-400 bg-slate-900/50 px-2 py-1 rounded border border-slate-700/50">
                                {showApiKey[`api_${apiKey.id}`] ? apiKey.key : '••••••••••••••••••••'}
                              </code>
                              <button
                                onClick={() => setShowApiKey({...showApiKey, [`api_${apiKey.id}`]: !showApiKey[`api_${apiKey.id}`]})}
                                className="p-1 hover:bg-slate-700/40 rounded transition-colors"
                              >
                                {showApiKey[`api_${apiKey.id}`] ? <EyeOff className="w-3 h-3 text-slate-400" /> : <Eye className="w-3 h-3 text-slate-400" />}
                              </button>
                              <button
                                onClick={() => handleCopyApiKey(apiKey.key)}
                                className="p-1 hover:bg-slate-700/40 rounded transition-colors"
                              >
                                <Copy className="w-3 h-3 text-slate-400" />
                              </button>
                            </div>
                            <div className="flex items-center gap-4 mt-2 text-xs text-slate-400">
                              <span>Created: {apiKey.created}</span>
                              <span>Last used: {apiKey.lastUsed}</span>
                              <span>Permissions: {apiKey.permissions}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className={`px-3 py-1.5 ${apiKey.status === 'active' ? 'bg-green-500/20 border-green-500/30' : 'bg-slate-700/40 border-slate-600/50'} border rounded-lg`}>
                              <span className={`text-xs font-medium ${apiKey.status === 'active' ? 'text-green-400' : 'text-slate-400'}`}>
                                {apiKey.status === 'active' ? 'Active' : 'Inactive'}
                              </span>
                            </div>
                            <button className="p-2 hover:bg-slate-700/40 rounded-lg transition-colors">
                              <Edit3 className="w-4 h-4 text-slate-400" />
                            </button>
                            <button className="p-2 hover:bg-red-500/20 rounded-lg transition-colors">
                              <Trash2 className="w-4 h-4 text-red-400" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-6">API Usage Statistics</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="bg-slate-900/50 border border-slate-700/50 rounded-xl p-4">
                        <div className="flex items-center gap-3 mb-2">
                          <BarChart3 className="w-5 h-5 text-blue-400" />
                          <p className="text-xs font-medium text-slate-400">Total Requests (30d)</p>
                        </div>
                        <p className="text-2xl font-bold text-white">8.2M</p>
                        <p className="text-xs text-green-400 mt-1">+12% vs last month</p>
                      </div>
                      <div className="bg-slate-900/50 border border-slate-700/50 rounded-xl p-4">
                        <div className="flex items-center gap-3 mb-2">
                          <Activity className="w-5 h-5 text-green-400" />
                          <p className="text-xs font-medium text-slate-400">Success Rate</p>
                        </div>
                        <p className="text-2xl font-bold text-white">99.7%</p>
                        <p className="text-xs text-slate-400 mt-1">24,891 errors</p>
                      </div>
                      <div className="bg-slate-900/50 border border-slate-700/50 rounded-xl p-4">
                        <div className="flex items-center gap-3 mb-2">
                          <Clock className="w-5 h-5 text-amber-400" />
                          <p className="text-xs font-medium text-slate-400">Avg Response Time</p>
                        </div>
                        <p className="text-2xl font-bold text-white">187ms</p>
                        <p className="text-xs text-green-400 mt-1">-23ms vs last month</p>
                      </div>
                      <div className="bg-slate-900/50 border border-slate-700/50 rounded-xl p-4">
                        <div className="flex items-center gap-3 mb-2">
                          <Zap className="w-5 h-5 text-purple-400" />
                          <p className="text-xs font-medium text-slate-400">Peak RPS</p>
                        </div>
                        <p className="text-2xl font-bold text-white">1,247</p>
                        <p className="text-xs text-slate-400 mt-1">requests/second</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-6">Rate Limiting</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Default Rate Limit (requests/hour)</label>
                        <select
                          value={securitySettings.apiRateLimit}
                          onChange={(e) => setSecuritySettings({...securitySettings, apiRateLimit: e.target.value})}
                          className="w-full px-4 py-2.5 bg-slate-800/40 border border-slate-700/50 rounded-xl text-white focus:outline-none focus:border-amber-500/50 transition-colors"
                        >
                          <option value="100">100 requests/hour (Basic)</option>
                          <option value="500">500 requests/hour (Standard)</option>
                          <option value="1000">1,000 requests/hour (Professional)</option>
                          <option value="5000">5,000 requests/hour (Enterprise)</option>
                          <option value="unlimited">Unlimited</option>
                        </select>
                      </div>
                      <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                        <div className="flex items-start gap-3">
                          <Info className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-sm font-medium text-blue-300">Rate Limit Information</p>
                            <p className="text-xs text-blue-200/70 mt-1">Rate limits apply per API key. Exceeding limits will result in HTTP 429 responses. Contact your system administrator to increase limits.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Data & Export */}
              {activeSection === 'data' && (
                <div className="space-y-6">
                  <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-6">Data Export</h3>
                    <div className="space-y-4">
                      <div className="p-4 bg-slate-800/30 border border-slate-700/30 rounded-xl">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
                              <Database className="w-5 h-5 text-blue-400" />
                            </div>
                            <div>
                              <h4 className="text-sm font-medium text-white">Personnel Records</h4>
                              <p className="text-xs text-slate-400">Export all personnel data</p>
                            </div>
                          </div>
                          <button className="flex items-center gap-2 px-4 py-2 bg-blue-500/20 border border-blue-500/30 text-blue-400 rounded-xl text-sm font-medium hover:bg-blue-500/30 transition-all">
                            <Download className="w-4 h-4" />
                            Export CSV
                          </button>
                        </div>
                      </div>
                      <div className="p-4 bg-slate-800/30 border border-slate-700/30 rounded-xl">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center">
                              <FileText className="w-5 h-5 text-green-400" />
                            </div>
                            <div>
                              <h4 className="text-sm font-medium text-white">Reports & Analytics</h4>
                              <p className="text-xs text-slate-400">Export all generated reports</p>
                            </div>
                          </div>
                          <button className="flex items-center gap-2 px-4 py-2 bg-blue-500/20 border border-blue-500/30 text-blue-400 rounded-xl text-sm font-medium hover:bg-blue-500/30 transition-all">
                            <Download className="w-4 h-4" />
                            Export PDF
                          </button>
                        </div>
                      </div>
                      <div className="p-4 bg-slate-800/30 border border-slate-700/30 rounded-xl">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center">
                              <FileJson className="w-5 h-5 text-purple-400" />
                            </div>
                            <div>
                              <h4 className="text-sm font-medium text-white">Integration Logs</h4>
                              <p className="text-xs text-slate-400">Export API sync logs</p>
                            </div>
                          </div>
                          <button className="flex items-center gap-2 px-4 py-2 bg-blue-500/20 border border-blue-500/30 text-blue-400 rounded-xl text-sm font-medium hover:bg-blue-500/30 transition-all">
                            <Download className="w-4 h-4" />
                            Export JSON
                          </button>
                        </div>
                      </div>
                      <div className="p-4 bg-slate-800/30 border border-slate-700/30 rounded-xl">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-amber-500/20 rounded-xl flex items-center justify-center">
                              <Shield className="w-5 h-5 text-amber-400" />
                            </div>
                            <div>
                              <h4 className="text-sm font-medium text-white">Audit Trail</h4>
                              <p className="text-xs text-slate-400">Export security audit logs</p>
                            </div>
                          </div>
                          <button className="flex items-center gap-2 px-4 py-2 bg-blue-500/20 border border-blue-500/30 text-blue-400 rounded-xl text-sm font-medium hover:bg-blue-500/30 transition-all">
                            <Download className="w-4 h-4" />
                            Export CSV
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-6">Backup & Restore</h3>
                    <div className="space-y-4">
                      <div className="p-4 bg-slate-800/30 border border-slate-700/30 rounded-xl">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h4 className="text-sm font-medium text-white mb-1">Last Backup</h4>
                            <p className="text-xs text-slate-400">December 11, 2025 at 2:00 AM EST</p>
                          </div>
                          <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/20 border border-green-500/30 rounded-lg">
                            <CheckCircle2 className="w-4 h-4 text-green-400" />
                            <span className="text-xs font-medium text-green-400">Successful</span>
                          </div>
                        </div>
                        <div className="flex gap-3 mt-4">
                          <button className="flex items-center gap-2 px-4 py-2 bg-blue-500/20 border border-blue-500/30 text-blue-400 rounded-xl text-sm font-medium hover:bg-blue-500/30 transition-all">
                            <Download className="w-4 h-4" />
                            Download Backup
                          </button>
                          <button className="flex items-center gap-2 px-4 py-2 bg-slate-700/40 border border-slate-600/50 text-slate-300 rounded-xl text-sm font-medium hover:bg-slate-700/60 transition-all">
                            <RefreshCw className="w-4 h-4" />
                            Create New Backup
                          </button>
                        </div>
                      </div>
                      <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl">
                        <div className="flex items-start gap-3">
                          <AlertTriangle className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-sm font-medium text-amber-300">Backup Schedule</p>
                            <p className="text-xs text-amber-200/70 mt-1">Automated backups run daily at 2:00 AM EST. Backups are retained for 90 days and stored in encrypted cloud storage with geographic redundancy.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-6">Data Retention</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Audit Log Retention</label>
                        <select
                          className="w-full px-4 py-2.5 bg-slate-800/40 border border-slate-700/50 rounded-xl text-white focus:outline-none focus:border-amber-500/50 transition-colors"
                        >
                          <option value="90">90 days</option>
                          <option value="180">180 days</option>
                          <option value="365">1 year</option>
                          <option value="730">2 years</option>
                          <option value="1825">5 years (Recommended)</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Integration Logs Retention</label>
                        <select
                          className="w-full px-4 py-2.5 bg-slate-800/40 border border-slate-700/50 rounded-xl text-white focus:outline-none focus:border-amber-500/50 transition-colors"
                        >
                          <option value="30">30 days (Recommended)</option>
                          <option value="60">60 days</option>
                          <option value="90">90 days</option>
                          <option value="180">180 days</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Personnel Records Retention</label>
                        <select
                          className="w-full px-4 py-2.5 bg-slate-800/40 border border-slate-700/50 rounded-xl text-white focus:outline-none focus:border-amber-500/50 transition-colors"
                        >
                          <option value="1825">5 years</option>
                          <option value="3650">10 years (Recommended)</option>
                          <option value="permanent">Permanent</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* System Settings */}
              {activeSection === 'system' && (
                <div className="space-y-6">
                  <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-6">System Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs font-medium text-slate-400 mb-2">Platform Version</p>
                        <p className="text-sm text-white">SentryOps v3.8.2 (Build 20251211)</p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-slate-400 mb-2">Database Version</p>
                        <p className="text-sm text-white">PostgreSQL 15.4</p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-slate-400 mb-2">Cache Server</p>
                        <p className="text-sm text-white">Redis 7.2.3</p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-slate-400 mb-2">Web Server</p>
                        <p className="text-sm text-white">Nginx 1.25.3</p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-slate-400 mb-2">Last System Update</p>
                        <p className="text-sm text-white">December 8, 2025</p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-slate-400 mb-2">Uptime</p>
                        <p className="text-sm text-white">47 days, 12 hours</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-6">System Health</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="bg-slate-900/50 border border-slate-700/50 rounded-xl p-4">
                        <div className="flex items-center gap-3 mb-2">
                          <Cpu className="w-5 h-5 text-blue-400" />
                          <p className="text-xs font-medium text-slate-400">CPU Usage</p>
                        </div>
                        <p className="text-2xl font-bold text-white">34%</p>
                        <div className="mt-2 h-2 bg-slate-700/40 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-500" style={{width: '34%'}}></div>
                        </div>
                      </div>
                      <div className="bg-slate-900/50 border border-slate-700/50 rounded-xl p-4">
                        <div className="flex items-center gap-3 mb-2">
                          <HardDrive className="w-5 h-5 text-green-400" />
                          <p className="text-xs font-medium text-slate-400">Memory Usage</p>
                        </div>
                        <p className="text-2xl font-bold text-white">67%</p>
                        <div className="mt-2 h-2 bg-slate-700/40 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-green-500 to-emerald-500" style={{width: '67%'}}></div>
                        </div>
                      </div>
                      <div className="bg-slate-900/50 border border-slate-700/50 rounded-xl p-4">
                        <div className="flex items-center gap-3 mb-2">
                          <Database className="w-5 h-5 text-amber-400" />
                          <p className="text-xs font-medium text-slate-400">Storage Used</p>
                        </div>
                        <p className="text-2xl font-bold text-white">42%</p>
                        <div className="mt-2 h-2 bg-slate-700/40 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-amber-500 to-orange-500" style={{width: '42%'}}></div>
                        </div>
                      </div>
                      <div className="bg-slate-900/50 border border-slate-700/50 rounded-xl p-4">
                        <div className="flex items-center gap-3 mb-2">
                          <Activity className="w-5 h-5 text-purple-400" />
                          <p className="text-xs font-medium text-slate-400">Active Connections</p>
                        </div>
                        <p className="text-2xl font-bold text-white">234</p>
                        <p className="text-xs text-slate-400 mt-1">connections</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-6">Maintenance</h3>
                    <div className="space-y-3">
                      <button className="w-full flex items-center justify-between p-4 bg-slate-800/30 border border-slate-700/30 rounded-xl hover:bg-slate-800/50 transition-all">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
                            <RefreshCw className="w-5 h-5 text-blue-400" />
                          </div>
                          <div className="text-left">
                            <p className="text-sm font-medium text-white">Clear Cache</p>
                            <p className="text-xs text-slate-400">Clear system and application cache</p>
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-slate-400" />
                      </button>
                      <button className="w-full flex items-center justify-between p-4 bg-slate-800/30 border border-slate-700/30 rounded-xl hover:bg-slate-800/50 transition-all">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-amber-500/20 rounded-xl flex items-center justify-center">
                            <Database className="w-5 h-5 text-amber-400" />
                          </div>
                          <div className="text-left">
                            <p className="text-sm font-medium text-white">Optimize Database</p>
                            <p className="text-xs text-slate-400">Run database optimization tasks</p>
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-slate-400" />
                      </button>
                      <button className="w-full flex items-center justify-between p-4 bg-slate-800/30 border border-slate-700/30 rounded-xl hover:bg-slate-800/50 transition-all">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center">
                            <Download className="w-5 h-5 text-green-400" />
                          </div>
                          <div className="text-left">
                            <p className="text-sm font-medium text-white">Check for Updates</p>
                            <p className="text-xs text-slate-400">Check for system updates</p>
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-slate-400" />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Audit Logs */}
              {activeSection === 'audit' && (
                <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-lg font-semibold text-white">Audit Trail</h3>
                      <p className="text-sm text-slate-400 mt-1">Recent security and system events</p>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-500/20 border border-blue-500/30 text-blue-400 rounded-xl text-sm font-medium hover:bg-blue-500/30 transition-all">
                      <Download className="w-4 h-4" />
                      Export Logs
                    </button>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-start gap-4 p-4 bg-slate-800/30 border border-slate-700/30 rounded-xl">
                      <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="w-5 h-5 text-green-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="text-sm font-medium text-white">Settings Updated</p>
                          <span className="px-2 py-0.5 bg-blue-500/20 border border-blue-500/30 rounded text-xs text-blue-400">Settings</span>
                        </div>
                        <p className="text-xs text-slate-400">Sheriff Thompson updated notification preferences</p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-slate-500">
                          <span>IP: 172.16.45.102</span>
                          <span>Device: Chrome on Windows</span>
                          <span>15 minutes ago</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-4 bg-slate-800/30 border border-slate-700/30 rounded-xl">
                      <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Lock className="w-5 h-5 text-blue-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="text-sm font-medium text-white">Successful Login</p>
                          <span className="px-2 py-0.5 bg-green-500/20 border border-green-500/30 rounded text-xs text-green-400">Authentication</span>
                        </div>
                        <p className="text-xs text-slate-400">Sheriff Thompson logged in from headquarters</p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-slate-500">
                          <span>IP: 172.16.45.102</span>
                          <span>2FA: Verified</span>
                          <span>2 hours ago</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-4 bg-slate-800/30 border border-slate-700/30 rounded-xl">
                      <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                        <RefreshCw className="w-5 h-5 text-purple-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="text-sm font-medium text-white">Integration Synced</p>
                          <span className="px-2 py-0.5 bg-purple-500/20 border border-purple-500/30 rounded text-xs text-purple-400">Integration</span>
                        </div>
                        <p className="text-xs text-slate-400">Versaterm CAD completed automatic sync</p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-slate-500">
                          <span>284,567 records processed</span>
                          <span>Duration: 2.3s</span>
                          <span>3 hours ago</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-4 bg-slate-800/30 border border-slate-700/30 rounded-xl">
                      <div className="w-10 h-10 bg-amber-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Key className="w-5 h-5 text-amber-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="text-sm font-medium text-white">API Key Rotated</p>
                          <span className="px-2 py-0.5 bg-amber-500/20 border border-amber-500/30 rounded text-xs text-amber-400">Security</span>
                        </div>
                        <p className="text-xs text-slate-400">Axon Evidence.com API key was rotated</p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-slate-500">
                          <span>Action: Automatic rotation</span>
                          <span>Old key revoked</span>
                          <span>5 hours ago</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-4 bg-slate-800/30 border border-slate-700/30 rounded-xl">
                      <div className="w-10 h-10 bg-red-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                        <AlertTriangle className="w-5 h-5 text-red-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="text-sm font-medium text-white">Failed Login Attempt</p>
                          <span className="px-2 py-0.5 bg-red-500/20 border border-red-500/30 rounded text-xs text-red-400">Security Alert</span>
                        </div>
                        <p className="text-xs text-slate-400">Multiple failed login attempts detected</p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-slate-500">
                          <span>IP: 203.45.67.89 (Blocked)</span>
                          <span>Attempts: 5</span>
                          <span>8 hours ago</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-4 bg-slate-800/30 border border-slate-700/30 rounded-xl">
                      <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Database className="w-5 h-5 text-green-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="text-sm font-medium text-white">Database Backup</p>
                          <span className="px-2 py-0.5 bg-green-500/20 border border-green-500/30 rounded text-xs text-green-400">System</span>
                        </div>
                        <p className="text-xs text-slate-400">Automated database backup completed successfully</p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-slate-500">
                          <span>Size: 24.7 GB</span>
                          <span>Duration: 8m 42s</span>
                          <span>12 hours ago</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-center">
                    <button className="px-4 py-2 bg-slate-700/40 border border-slate-600/50 text-slate-300 rounded-xl text-sm font-medium hover:bg-slate-700/60 transition-all">
                      Load More
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Save Changes Button */}
            <div className="mt-8 flex items-center justify-between p-6 bg-slate-800/40 border border-slate-700/50 rounded-xl">
              <div>
                <p className="text-sm font-medium text-white">Unsaved Changes</p>
                <p className="text-xs text-slate-400 mt-1">Save your changes to apply the new settings</p>
              </div>
              <div className="flex gap-3">
                <button className="px-6 py-2.5 bg-slate-700/40 border border-slate-600/50 text-slate-300 rounded-xl text-sm font-medium hover:bg-slate-700/60 transition-all">
                  Reset
                </button>
                <button
                  onClick={handleSaveSettings}
                  className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 rounded-xl text-white text-sm font-medium shadow-lg shadow-amber-500/20 transition-all"
                >
                  <Save className="w-4 h-4" />
                  Save Changes
                </button>
              </div>
            </div>
          </div>
      </div>
    </DashboardLayout>
  );
}

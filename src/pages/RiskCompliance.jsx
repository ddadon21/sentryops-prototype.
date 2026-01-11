import React, { useState, useEffect } from 'react';
import { Home, Users, FileText, TrendingUp, AlertCircle, Settings, Bell, Search, ChevronRight, DollarSign, CheckCircle, Shield, ShieldCheck, Menu, ChevronLeft, LogOut, ChevronDown, Building2, Radio, Target, User, AlertTriangle, FileCheck, Scale, ClipboardCheck, Calendar, CheckCircle2, XCircle, Clock, Eye, Filter, Download, RefreshCw, BarChart3, TrendingDown, ArrowUpRight, ArrowDownRight, Info, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function RiskCompliance() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    const saved = localStorage.getItem('sidebarCollapsed');
    return saved === 'true';
  });
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [logoutConfirmOpen, setLogoutConfirmOpen] = useState(false);
  const [staffingExpanded, setStaffingExpanded] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedRisk, setSelectedRisk] = useState(null);

  useEffect(() => {
    localStorage.setItem('sidebarCollapsed', sidebarCollapsed.toString());
  }, [sidebarCollapsed]);

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

  const riskItems = [
    { id: 1, title: 'Detention Facility Overcrowding', category: 'Operations', severity: 'critical', status: 'active', owner: 'Major Williams', dueDate: '2024-11-15', progress: 35, description: 'Current population at 112% capacity. Risk of safety incidents and legal liability.', mitigation: 'Accelerate early release program, coordinate with courts on bond review.' },
    { id: 2, title: 'Body Camera Policy Non-Compliance', category: 'Policy', severity: 'high', status: 'in-progress', owner: 'Captain Rodriguez', dueDate: '2024-11-20', progress: 65, description: '23% of patrol deputies not meeting activation requirements.', mitigation: 'Implement automated activation, increase spot audits, progressive discipline.' },
    { id: 3, title: 'Firearms Certification Gaps', category: 'Training', severity: 'high', status: 'active', owner: 'Lt. Training Division', dueDate: '2024-11-10', progress: 45, description: '12 deputies with expired firearms certifications still on active duty.', mitigation: 'Schedule emergency qualification sessions, temporary desk assignments.' },
    { id: 4, title: 'Evidence Room Access Controls', category: 'Security', severity: 'medium', status: 'in-progress', owner: 'Sgt. Evidence Unit', dueDate: '2024-12-01', progress: 80, description: 'Audit revealed gaps in access logging for evidence room.', mitigation: 'Install biometric access, implement dual-custody for high-value evidence.' },
    { id: 5, title: 'Vehicle Fleet Maintenance Backlog', category: 'Operations', severity: 'medium', status: 'monitoring', owner: 'Fleet Manager', dueDate: '2024-11-30', progress: 55, description: '15 vehicles overdue for scheduled maintenance.', mitigation: 'Prioritize high-mileage units, temporary rental vehicles if needed.' },
    { id: 6, title: 'CJIS Security Audit Findings', category: 'Compliance', severity: 'high', status: 'active', owner: 'IT Security', dueDate: '2024-11-25', progress: 40, description: '3 medium-priority findings from recent CJIS audit require remediation.', mitigation: 'Implement MFA for all terminals, update encryption protocols.' }
  ];

  const complianceMetrics = [
    { name: 'Use of Force Reporting', compliance: 98, trend: 'up', target: 100 },
    { name: 'Body Camera Activation', compliance: 77, trend: 'down', target: 95 },
    { name: 'Training Requirements', compliance: 89, trend: 'up', target: 100 },
    { name: 'Vehicle Inspections', compliance: 94, trend: 'stable', target: 100 },
    { name: 'Evidence Chain of Custody', compliance: 96, trend: 'up', target: 100 },
    { name: 'Incident Documentation', compliance: 91, trend: 'up', target: 95 }
  ];

  const upcomingAudits = [
    { id: 1, name: 'PREA Compliance Audit', date: '2024-11-18', type: 'External', status: 'scheduled', department: 'Detention' },
    { id: 2, name: 'ACA Accreditation Review', date: '2024-12-05', type: 'External', status: 'preparing', department: 'Agency-wide' },
    { id: 3, name: 'Internal Use of Force Review', date: '2024-11-22', type: 'Internal', status: 'scheduled', department: 'Patrol' },
    { id: 4, name: 'Evidence Room Audit', date: '2024-11-28', type: 'Internal', status: 'scheduled', department: 'Investigations' }
  ];

  const recentIncidents = [
    { id: 1, type: 'Use of Force', date: '2024-11-03', division: 'Detention', status: 'Under Review', severity: 'high' },
    { id: 2, type: 'Vehicle Accident', date: '2024-11-02', division: 'Patrol', status: 'Closed', severity: 'low' },
    { id: 3, type: 'Inmate Grievance', date: '2024-11-01', division: 'Detention', status: 'Investigating', severity: 'medium' },
    { id: 4, type: 'Policy Violation', date: '2024-10-30', division: 'Patrol', status: 'Closed', severity: 'medium' }
  ];

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
    navigate('/signin');
  };

  const getSeverityConfig = (severity) => {
    const configs = {
      critical: { bg: 'bg-red-500/10', border: 'border-red-500/30', text: 'text-red-400', badge: 'bg-red-500' },
      high: { bg: 'bg-amber-500/10', border: 'border-amber-500/30', text: 'text-amber-400', badge: 'bg-amber-500' },
      medium: { bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', text: 'text-yellow-400', badge: 'bg-yellow-500' },
      low: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-400', badge: 'bg-blue-500' }
    };
    return configs[severity] || configs.medium;
  };

  const getStatusConfig = (status) => {
    const configs = {
      'active': { bg: 'bg-red-500/20', text: 'text-red-400' },
      'in-progress': { bg: 'bg-amber-500/20', text: 'text-amber-400' },
      'monitoring': { bg: 'bg-blue-500/20', text: 'text-blue-400' },
      'resolved': { bg: 'bg-emerald-500/20', text: 'text-emerald-400' }
    };
    return configs[status] || configs.active;
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

        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {navigation.map(item => {
            const Icon = item.icon;
            const isActive = window.location.pathname === item.route;
            const isStaffingActive = item.id === 'staffing' &&
              (window.location.pathname === '/command/personnel' || window.location.pathname === '/command/orgchart');

            return (
              <div key={item.id}>
                <button
                  onClick={() => handleNavigation(item)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    isActive || isStaffingActive ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/20' : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
                  } ${sidebarCollapsed ? 'justify-center' : ''}`}
                  title={sidebarCollapsed ? item.label : ''}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {!sidebarCollapsed && (
                    <>
                      <span className="flex-1 text-left text-sm font-medium truncate">{item.label}</span>
                      {item.badge && <span className={`px-2 py-0.5 rounded-full text-xs ${isActive ? 'bg-white/20' : 'bg-red-500 text-white'}`}>{item.badge}</span>}
                      {item.hasSubmenu && (
                        <ChevronDown className={`w-4 h-4 transition-transform ${staffingExpanded ? 'rotate-180' : ''}`} />
                      )}
                    </>
                  )}
                </button>

                {item.hasSubmenu && staffingExpanded && !sidebarCollapsed && (
                  <div className="ml-4 mt-1 space-y-1">
                    {staffingSubmenu.map(sub => {
                      const isSubActive = window.location.pathname === sub.route;
                      return (
                        <button
                          key={sub.id}
                          onClick={() => handleSubmenuNavigation(sub.route)}
                          className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-all text-sm ${
                            isSubActive ? 'bg-amber-500/20 text-amber-400' : 'text-slate-500 hover:bg-slate-800/30 hover:text-slate-300'
                          }`}
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-current"></div>
                          <span>{sub.label}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
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
              {!sidebarCollapsed && <span className="flex-1 text-left text-sm font-medium">Sign Out</span>}
            </button>
          </div>
        </div>
      </aside>

      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {logoutConfirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setLogoutConfirmOpen(false)} />
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
              <button onClick={() => setLogoutConfirmOpen(false)} className="flex-1 px-4 py-2.5 bg-slate-800/40 hover:bg-slate-800/60 border border-slate-700/50 rounded-xl text-white font-medium transition-all">Cancel</button>
              <button onClick={handleLogout} className="flex-1 px-4 py-2.5 bg-slate-700/40 hover:bg-slate-700/60 border border-slate-600/50 rounded-xl text-white font-medium transition-all">Sign Out</button>
            </div>
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col min-w-0">
        <header className="border-b border-slate-800/50 backdrop-blur-xl bg-slate-900/30 sticky top-0 z-30">
          <div className="px-4 lg:px-6 py-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4 flex-1 min-w-0">
              <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden p-2 hover:bg-slate-800/50 rounded-lg">
                <Menu className="w-5 h-5 text-slate-400" />
              </button>
              <div className="flex-1 max-w-xl relative hidden sm:block">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input type="text" placeholder="Search anything..." className="w-full pl-12 pr-4 py-2 bg-slate-800/40 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50" />
              </div>
            </div>

            <div className="flex items-center gap-2 lg:gap-3">
              <div className="relative">
                <button onClick={() => setNotificationsOpen(!notificationsOpen)} className="notifications-trigger p-2 hover:bg-slate-800/50 rounded-lg relative">
                  <Bell className="w-5 h-5 text-slate-400" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>

                {notificationsOpen && (
                  <div className="notifications-dropdown absolute right-0 top-full mt-2 w-96 bg-slate-900/95 backdrop-blur-xl border border-slate-700/50 rounded-xl shadow-2xl z-50">
                    <div className="p-4 border-b border-slate-700/50">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-semibold text-white">Notifications</h3>
                        <span className="px-2 py-0.5 bg-red-500/20 border border-red-500/30 text-red-400 text-xs rounded-full">{notifications.filter(n => n.urgent).length} urgent</span>
                      </div>
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
                      <button className="w-full text-center text-sm text-amber-400 hover:text-amber-300 font-medium">View All Notifications</button>
                    </div>
                  </div>
                )}
              </div>

              <div className="h-8 w-px bg-slate-700/50 hidden sm:block"></div>

              <div className="relative">
                <button onClick={() => setProfileMenuOpen(!profileMenuOpen)} className="profile-trigger flex items-center gap-2 hover:bg-slate-800/50 rounded-lg p-1.5 transition-colors">
                  <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">ST</span>
                  </div>
                  <div className="hidden sm:block text-left">
                    <p className="text-sm font-medium text-white">Sheriff Thompson</p>
                    <p className="text-xs text-slate-400">Administrator</p>
                  </div>
                  <ChevronDown className="w-4 h-4 text-slate-400 hidden sm:block" />
                </button>

                {profileMenuOpen && (
                  <div className="profile-dropdown absolute right-0 top-full mt-2 w-56 bg-slate-900/95 backdrop-blur-xl border border-slate-700/50 rounded-xl shadow-2xl z-50">
                    <div className="p-3 border-b border-slate-700/50">
                      <p className="text-sm font-medium text-white">Sheriff Thompson</p>
                      <p className="text-xs text-slate-400">sheriff.thompson@gwinnettcounty.com</p>
                      <span className="inline-block mt-2 px-2 py-0.5 bg-amber-500/20 border border-amber-500/30 text-amber-400 text-xs rounded-full">Administrator</span>
                    </div>
                    <div className="p-2">
                      <button onClick={() => setProfileMenuOpen(false)} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-800/50 hover:text-white transition-colors text-sm">
                        <User className="w-4 h-4" /><span>My Profile</span>
                      </button>
                      <button onClick={() => { setProfileMenuOpen(false); navigate('/command/settings'); }} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-800/50 hover:text-white transition-colors text-sm">
                        <Settings className="w-4 h-4" /><span>Settings</span><span className="ml-auto px-1.5 py-0.5 bg-slate-700/50 text-slate-400 text-xs rounded">Admin</span>
                      </button>
                    </div>
                    <div className="p-2 border-t border-slate-700/50">
                      <button onClick={() => { setProfileMenuOpen(false); setLogoutConfirmOpen(true); }} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-slate-400 hover:bg-slate-800/50 hover:text-red-400 transition-colors text-sm">
                        <LogOut className="w-4 h-4" /><span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-white">Risk & Compliance</h1>
                <p className="text-slate-400 mt-1">Agency-wide risk management and compliance monitoring</p>
              </div>
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 px-4 py-2 bg-slate-800/40 hover:bg-slate-800/60 border border-slate-700/50 text-white rounded-xl transition-colors">
                  <Download className="w-4 h-4" />
                  <span className="text-sm font-medium">Export Report</span>
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-amber-500/90 hover:bg-amber-500 text-white rounded-xl transition-colors">
                  <RefreshCw className="w-4 h-4" />
                  <span className="text-sm font-medium">Refresh Data</span>
                </button>
              </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 bg-red-500/20 rounded-xl flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5 text-red-400" />
                  </div>
                  <span className="text-xs text-red-400 font-medium flex items-center gap-1">
                    <ArrowUpRight className="w-3 h-3" /> +2 this week
                  </span>
                </div>
                <p className="text-2xl font-bold text-white mb-1">{riskItems.filter(r => r.status === 'active').length}</p>
                <p className="text-sm text-slate-400">Active Risk Items</p>
              </div>

              <div className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  </div>
                  <span className="text-xs text-emerald-400 font-medium flex items-center gap-1">
                    <ArrowUpRight className="w-3 h-3" /> +3% MTD
                  </span>
                </div>
                <p className="text-2xl font-bold text-white mb-1">91%</p>
                <p className="text-sm text-slate-400">Overall Compliance</p>
              </div>

              <div className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
                    <ClipboardCheck className="w-5 h-5 text-blue-400" />
                  </div>
                  <span className="text-xs text-slate-400 font-medium">Next: Nov 18</span>
                </div>
                <p className="text-2xl font-bold text-white mb-1">{upcomingAudits.length}</p>
                <p className="text-sm text-slate-400">Upcoming Audits</p>
              </div>

              <div className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 bg-amber-500/20 rounded-xl flex items-center justify-center">
                    <FileCheck className="w-5 h-5 text-amber-400" />
                  </div>
                  <span className="text-xs text-amber-400 font-medium flex items-center gap-1">
                    <ArrowDownRight className="w-3 h-3" /> -1 this week
                  </span>
                </div>
                <p className="text-2xl font-bold text-white mb-1">{recentIncidents.filter(i => i.status !== 'Closed').length}</p>
                <p className="text-sm text-slate-400">Open Incidents</p>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 border-b border-slate-700/50">
              {['overview', 'risks', 'compliance', 'audits'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-3 text-sm font-medium transition-all relative ${activeTab === tab ? 'text-amber-400' : 'text-slate-400 hover:text-slate-300'}`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  {activeTab === tab && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500"></div>}
                </button>
              ))}
            </div>

            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Risk Register */}
                <div className="lg:col-span-2 bg-slate-800/30 border border-slate-700/50 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white">Active Risk Register</h3>
                    <button className="text-sm text-amber-400 hover:text-amber-300">View All</button>
                  </div>
                  <div className="space-y-3">
                    {riskItems.slice(0, 4).map(risk => {
                      const severity = getSeverityConfig(risk.severity);
                      const status = getStatusConfig(risk.status);
                      return (
                        <div key={risk.id} className={`${severity.bg} border ${severity.border} rounded-xl p-4 cursor-pointer hover:bg-opacity-20 transition-all`} onClick={() => setSelectedRisk(risk)}>
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <span className={`px-2 py-0.5 ${severity.badge} text-white text-xs font-medium rounded-full capitalize`}>{risk.severity}</span>
                                <span className={`px-2 py-0.5 ${status.bg} ${status.text} text-xs font-medium rounded-full capitalize`}>{risk.status.replace('-', ' ')}</span>
                              </div>
                              <h4 className="text-sm font-medium text-white mb-1">{risk.title}</h4>
                              <p className="text-xs text-slate-400">{risk.category} • Owner: {risk.owner}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-xs text-slate-500 mb-1">Due: {new Date(risk.dueDate).toLocaleDateString()}</p>
                              <div className="w-20 bg-slate-700/50 rounded-full h-1.5">
                                <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: `${risk.progress}%` }}></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Compliance Metrics */}
                <div className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Compliance Metrics</h3>
                  <div className="space-y-4">
                    {complianceMetrics.map((metric, idx) => (
                      <div key={idx}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-slate-300">{metric.name}</span>
                          <div className="flex items-center gap-2">
                            <span className={`text-sm font-medium ${metric.compliance >= metric.target ? 'text-emerald-400' : metric.compliance >= 80 ? 'text-amber-400' : 'text-red-400'}`}>{metric.compliance}%</span>
                            {metric.trend === 'up' && <ArrowUpRight className="w-3 h-3 text-emerald-400" />}
                            {metric.trend === 'down' && <ArrowDownRight className="w-3 h-3 text-red-400" />}
                          </div>
                        </div>
                        <div className="w-full bg-slate-700/50 rounded-full h-2">
                          <div className={`h-2 rounded-full ${metric.compliance >= metric.target ? 'bg-emerald-500' : metric.compliance >= 80 ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${metric.compliance}%` }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Upcoming Audits */}
                <div className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Upcoming Audits</h3>
                  <div className="space-y-3">
                    {upcomingAudits.map(audit => (
                      <div key={audit.id} className="flex items-center gap-4 p-3 bg-slate-900/30 rounded-xl">
                        <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                          <Calendar className="w-5 h-5 text-blue-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-white truncate">{audit.name}</p>
                          <p className="text-xs text-slate-400">{audit.department} • {audit.type}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-white">{new Date(audit.date).toLocaleDateString()}</p>
                          <p className={`text-xs ${audit.status === 'preparing' ? 'text-amber-400' : 'text-slate-400'}`}>{audit.status}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Incidents */}
                <div className="lg:col-span-2 bg-slate-800/30 border border-slate-700/50 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white">Recent Incidents</h3>
                    <button className="text-sm text-amber-400 hover:text-amber-300">View All</button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="text-left text-xs text-slate-500 border-b border-slate-700/50">
                          <th className="pb-3 font-medium">Type</th>
                          <th className="pb-3 font-medium">Date</th>
                          <th className="pb-3 font-medium">Division</th>
                          <th className="pb-3 font-medium">Severity</th>
                          <th className="pb-3 font-medium">Status</th>
                        </tr>
                      </thead>
                      <tbody className="text-sm">
                        {recentIncidents.map(incident => {
                          const severity = getSeverityConfig(incident.severity);
                          return (
                            <tr key={incident.id} className="border-b border-slate-800/30 hover:bg-slate-800/20">
                              <td className="py-3 text-white">{incident.type}</td>
                              <td className="py-3 text-slate-400">{new Date(incident.date).toLocaleDateString()}</td>
                              <td className="py-3 text-slate-400">{incident.division}</td>
                              <td className="py-3"><span className={`px-2 py-0.5 ${severity.bg} ${severity.text} text-xs rounded-full capitalize`}>{incident.severity}</span></td>
                              <td className="py-3"><span className={`text-xs ${incident.status === 'Closed' ? 'text-emerald-400' : incident.status === 'Under Review' ? 'text-amber-400' : 'text-blue-400'}`}>{incident.status}</span></td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'risks' && (
              <div className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-white">Risk Register</h3>
                  <div className="flex items-center gap-2">
                    <button className="flex items-center gap-2 px-3 py-1.5 bg-slate-700/50 rounded-lg text-sm text-slate-300">
                      <Filter className="w-4 h-4" /> Filter
                    </button>
                  </div>
                </div>
                <div className="space-y-4">
                  {riskItems.map(risk => {
                    const severity = getSeverityConfig(risk.severity);
                    const status = getStatusConfig(risk.status);
                    return (
                      <div key={risk.id} className={`${severity.bg} border ${severity.border} rounded-xl p-5`}>
                        <div className="flex items-start justify-between gap-4 mb-3">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <span className={`px-2 py-0.5 ${severity.badge} text-white text-xs font-medium rounded-full capitalize`}>{risk.severity}</span>
                              <span className={`px-2 py-0.5 ${status.bg} ${status.text} text-xs font-medium rounded-full capitalize`}>{risk.status.replace('-', ' ')}</span>
                              <span className="px-2 py-0.5 bg-slate-700/50 text-slate-300 text-xs rounded-full">{risk.category}</span>
                            </div>
                            <h4 className="text-base font-medium text-white">{risk.title}</h4>
                          </div>
                          <button className="p-2 hover:bg-slate-700/30 rounded-lg">
                            <Eye className="w-4 h-4 text-slate-400" />
                          </button>
                        </div>
                        <p className="text-sm text-slate-400 mb-3">{risk.description}</p>
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-4">
                            <span className="text-slate-500">Owner: <span className="text-slate-300">{risk.owner}</span></span>
                            <span className="text-slate-500">Due: <span className="text-slate-300">{new Date(risk.dueDate).toLocaleDateString()}</span></span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-slate-500">Progress:</span>
                            <div className="w-24 bg-slate-700/50 rounded-full h-1.5">
                              <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: `${risk.progress}%` }}></div>
                            </div>
                            <span className="text-slate-300">{risk.progress}%</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {activeTab === 'compliance' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Compliance by Category</h3>
                  <div className="space-y-4">
                    {complianceMetrics.map((metric, idx) => (
                      <div key={idx} className="p-4 bg-slate-900/30 rounded-xl">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-white">{metric.name}</span>
                          <span className={`text-lg font-bold ${metric.compliance >= metric.target ? 'text-emerald-400' : metric.compliance >= 80 ? 'text-amber-400' : 'text-red-400'}`}>{metric.compliance}%</span>
                        </div>
                        <div className="w-full bg-slate-700/50 rounded-full h-3">
                          <div className={`h-3 rounded-full ${metric.compliance >= metric.target ? 'bg-emerald-500' : metric.compliance >= 80 ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${metric.compliance}%` }}></div>
                        </div>
                        <p className="text-xs text-slate-500 mt-2">Target: {metric.target}%</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Regulatory Status</h3>
                  <div className="space-y-3">
                    {[
                      { name: 'CJIS Security Policy', status: 'Compliant', lastAudit: '2024-08-15', nextAudit: '2025-02-15' },
                      { name: 'PREA Standards', status: 'Compliant', lastAudit: '2024-06-20', nextAudit: '2024-11-18' },
                      { name: 'ACA Accreditation', status: 'Pending Review', lastAudit: '2023-12-10', nextAudit: '2024-12-05' },
                      { name: 'POST Training Requirements', status: 'Compliant', lastAudit: '2024-09-01', nextAudit: '2025-03-01' }
                    ].map((reg, idx) => (
                      <div key={idx} className="p-4 bg-slate-900/30 rounded-xl flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-white">{reg.name}</p>
                          <p className="text-xs text-slate-500">Next audit: {new Date(reg.nextAudit).toLocaleDateString()}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${reg.status === 'Compliant' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}>{reg.status}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'audits' && (
              <div className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Audit Schedule</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-xs text-slate-500 border-b border-slate-700/50">
                        <th className="pb-3 font-medium">Audit Name</th>
                        <th className="pb-3 font-medium">Date</th>
                        <th className="pb-3 font-medium">Type</th>
                        <th className="pb-3 font-medium">Department</th>
                        <th className="pb-3 font-medium">Status</th>
                        <th className="pb-3 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      {upcomingAudits.map(audit => (
                        <tr key={audit.id} className="border-b border-slate-800/30 hover:bg-slate-800/20">
                          <td className="py-4 text-white font-medium">{audit.name}</td>
                          <td className="py-4 text-slate-300">{new Date(audit.date).toLocaleDateString()}</td>
                          <td className="py-4"><span className={`px-2 py-0.5 rounded-full text-xs ${audit.type === 'External' ? 'bg-purple-500/20 text-purple-400' : 'bg-blue-500/20 text-blue-400'}`}>{audit.type}</span></td>
                          <td className="py-4 text-slate-400">{audit.department}</td>
                          <td className="py-4"><span className={`px-2 py-0.5 rounded-full text-xs ${audit.status === 'preparing' ? 'bg-amber-500/20 text-amber-400' : 'bg-slate-700/50 text-slate-300'}`}>{audit.status}</span></td>
                          <td className="py-4">
                            <button className="p-1.5 hover:bg-slate-700/50 rounded-lg"><Eye className="w-4 h-4 text-slate-400" /></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Risk Detail Modal */}
      {selectedRisk && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedRisk(null)} />
          <div className="relative bg-slate-900 border border-slate-700/50 rounded-2xl p-6 max-w-2xl w-full shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`px-2 py-0.5 ${getSeverityConfig(selectedRisk.severity).badge} text-white text-xs font-medium rounded-full capitalize`}>{selectedRisk.severity}</span>
                  <span className={`px-2 py-0.5 ${getStatusConfig(selectedRisk.status).bg} ${getStatusConfig(selectedRisk.status).text} text-xs font-medium rounded-full capitalize`}>{selectedRisk.status.replace('-', ' ')}</span>
                </div>
                <h3 className="text-xl font-semibold text-white">{selectedRisk.title}</h3>
              </div>
              <button onClick={() => setSelectedRisk(null)} className="p-2 hover:bg-slate-800/50 rounded-lg">
                <XCircle className="w-5 h-5 text-slate-400" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-slate-400 mb-1">Description</h4>
                <p className="text-sm text-slate-300">{selectedRisk.description}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-slate-400 mb-1">Mitigation Strategy</h4>
                <p className="text-sm text-slate-300">{selectedRisk.mitigation}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-slate-800/50 rounded-xl">
                  <p className="text-xs text-slate-500 mb-1">Owner</p>
                  <p className="text-sm text-white">{selectedRisk.owner}</p>
                </div>
                <div className="p-3 bg-slate-800/50 rounded-xl">
                  <p className="text-xs text-slate-500 mb-1">Due Date</p>
                  <p className="text-sm text-white">{new Date(selectedRisk.dueDate).toLocaleDateString()}</p>
                </div>
                <div className="p-3 bg-slate-800/50 rounded-xl">
                  <p className="text-xs text-slate-500 mb-1">Category</p>
                  <p className="text-sm text-white">{selectedRisk.category}</p>
                </div>
                <div className="p-3 bg-slate-800/50 rounded-xl">
                  <p className="text-xs text-slate-500 mb-1">Progress</p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-slate-700/50 rounded-full h-2">
                      <div className="bg-amber-500 h-2 rounded-full" style={{ width: `${selectedRisk.progress}%` }}></div>
                    </div>
                    <span className="text-sm text-white">{selectedRisk.progress}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

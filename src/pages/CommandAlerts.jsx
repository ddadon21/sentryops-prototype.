import React, { useState, useEffect } from 'react';
import { Home, Users, FileText, LayoutDashboard, TrendingUp, AlertCircle, Settings, Bell, MessageCircle, Search, ChevronRight, DollarSign, CheckCircle, Shield, ShieldCheck, Sparkles, X, Send, Menu, ChevronLeft, LogOut, Filter, Clock, MapPin, Phone, Mail, ExternalLink, AlertTriangle, Info, CheckCircle2, XCircle, Zap, Calendar, User, FileWarning, Building2, Radio, Target, Download, ChevronDown, Eye, UserPlus, Link2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function CommandAlerts() {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState('alerts');
  const [activeTab, setActiveTab] = useState('active');
  const [chatOpen, setChatOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    const saved = localStorage.getItem('sidebarCollapsed');
    return saved === 'true';
  });
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [logoutConfirmOpen, setLogoutConfirmOpen] = useState(false);
  const [filterSeverity, setFilterSeverity] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterDivision, setFilterDivision] = useState('all');
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [acknowledgedAlerts, setAcknowledgedAlerts] = useState(new Set());
  const [assignModalOpen, setAssignModalOpen] = useState(false);
  const [resolveModalOpen, setResolveModalOpen] = useState(false);
  const [alertToAction, setAlertToAction] = useState(null);
  const [expandedAlerts, setExpandedAlerts] = useState(new Set());
  const [assignPersonnel, setAssignPersonnel] = useState('');
  const [resolveNotes, setResolveNotes] = useState('');
  const [staffingExpanded, setStaffingExpanded] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

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

  const [alerts, setAlerts] = useState([
    {
      id: 1,
      severity: 'critical',
      category: 'personnel',
      title: 'Critical Staffing Shortage - Night Shift',
      description: 'Night shift patrol is 4 deputies below minimum safe staffing levels. Immediate action required.',
      timestamp: '2024-11-04T02:15:00',
      location: 'Patrol Division - Night Shift',
      assignedTo: 'Major Davis',
      status: 'active',
      impact: 'High - Public safety risk',
      recommendations: ['Mandatory overtime authorization', 'Request mutual aid', 'Shift coverage from adjacent zones'],
      relatedData: {
        required: 12,
        current: 8,
        shortage: 4
      }
    },
    {
      id: 2,
      severity: 'high',
      category: 'compliance',
      title: 'Multiple Certifications Expiring This Week',
      description: '8 deputies have critical certifications (P.O.S.T., Firearms) expiring within 7 days.',
      timestamp: '2024-11-04T08:30:00',
      location: 'Multiple Divisions',
      assignedTo: 'Training Division',
      status: 'active',
      impact: 'Medium - Operational capacity',
      recommendations: ['Schedule emergency training sessions', 'Notify affected personnel', 'Temporary duty reassignment if needed'],
      affectedPersonnel: ['Deputy Johnson', 'Deputy Martinez', 'Deputy Chen', 'Sgt. Williams', '4 others']
    },
    {
      id: 3,
      severity: 'high',
      category: 'equipment',
      title: 'Fleet Maintenance - Multiple Vehicles Out of Service',
      description: '6 patrol vehicles are currently out of service due to maintenance issues. Fleet capacity at 85%.',
      timestamp: '2024-11-04T06:45:00',
      location: 'Fleet Maintenance',
      assignedTo: 'Support Services',
      status: 'active',
      impact: 'Medium - Reduced patrol coverage',
      recommendations: ['Expedite critical repairs', 'Deploy reserve vehicles', 'Coordinate vehicle sharing between shifts'],
      relatedData: {
        totalVehicles: 128,
        inService: 109,
        maintenance: 6,
        reserve: 13
      }
    },
    {
      id: 4,
      severity: 'medium',
      category: 'budget',
      title: 'Budget Threshold Alert - Patrol Division Overtime',
      description: 'Patrol Division overtime spending has reached 92% of quarterly allocation with 3 weeks remaining.',
      timestamp: '2024-11-04T09:00:00',
      location: 'Patrol Division',
      assignedTo: 'Deputy Chief Jones',
      status: 'active',
      impact: 'Medium - Budget overrun risk',
      recommendations: ['Review and approve additional funds', 'Implement overtime restrictions', 'Analyze root causes'],
      relatedData: {
        allocated: 125000,
        spent: 115000,
        remaining: 10000,
        projectedNeed: 18000
      }
    },
    {
      id: 5,
      severity: 'medium',
      category: 'facilities',
      title: 'Detention Capacity Warning',
      description: 'Detention center at 91.5% capacity. Approaching maximum operational threshold.',
      timestamp: '2024-11-04T07:20:00',
      location: 'Gwinnett County Detention Center',
      assignedTo: 'Major Wilson',
      status: 'active',
      impact: 'Medium - Capacity constraints',
      recommendations: ['Coordinate with courts for expedited hearings', 'Review early release candidates', 'Prepare overflow protocols'],
      relatedData: {
        capacity: 920,
        current: 842,
        percentage: 91.5
      }
    },
    {
      id: 6,
      severity: 'low',
      category: 'training',
      title: 'Quarterly Training Requirements - Q4 Deadline',
      description: '23 personnel have not completed mandatory Q4 training with 4 weeks until deadline.',
      timestamp: '2024-11-04T10:15:00',
      location: 'Training Division',
      assignedTo: 'Training Division',
      status: 'active',
      impact: 'Low - Compliance tracking',
      recommendations: ['Send reminder notifications', 'Schedule makeup sessions', 'Monitor completion rates'],
      affectedCount: 23
    },
    {
      id: 7,
      severity: 'info',
      category: 'operations',
      title: 'Special Event - High School Football Game',
      description: 'Large attendance expected at regional championship. Extra patrol requested.',
      timestamp: '2024-11-04T11:00:00',
      location: 'Gwinnett Stadium',
      assignedTo: 'Patrol Division',
      status: 'active',
      impact: 'Info - Resource allocation',
      recommendations: ['Deploy 4 additional officers', 'Coordinate with event security', 'Traffic control plan'],
      eventDate: '2024-11-08T19:00:00',
      expectedAttendance: 8500
    },
    {
      id: 8,
      severity: 'critical',
      category: 'equipment',
      title: 'Body Camera System Malfunction',
      description: 'Primary body camera server experiencing issues. 45 cameras unable to upload footage.',
      timestamp: '2024-11-03T22:30:00',
      location: 'IT Department',
      assignedTo: 'IT Department',
      status: 'resolved',
      impact: 'High - Evidence integrity risk',
      resolution: 'Server backup restored. All cameras now syncing properly. No footage lost.',
      resolvedAt: '2024-11-04T03:15:00',
      resolvedBy: 'IT Team Lead'
    },
    {
      id: 9,
      severity: 'high',
      category: 'personnel',
      title: 'FMLA Request - Investigations Supervisor',
      description: 'Lt. Garcia requesting 6-week FMLA leave. Coverage plan needed for Special Investigations unit.',
      timestamp: '2024-11-03T14:20:00',
      location: 'Investigations Division',
      assignedTo: 'Captain Johnson',
      status: 'resolved',
      impact: 'Medium - Leadership continuity',
      resolution: 'Temporary supervisor assigned. Sgt. Thompson to act as interim supervisor. Training transition scheduled.',
      resolvedAt: '2024-11-04T09:30:00',
      resolvedBy: 'Captain Johnson'
    },
    {
      id: 10,
      severity: 'medium',
      category: 'compliance',
      title: 'Annual Use of Force Policy Review Due',
      description: 'Annual review and update of Use of Force policy required by state mandate.',
      timestamp: '2024-11-03T08:00:00',
      location: 'Policy Division',
      assignedTo: 'Chief Deputy Anderson',
      status: 'resolved',
      impact: 'Medium - Compliance requirement',
      resolution: 'Policy review completed and approved. Updated policy distributed to all personnel. Training scheduled for next month.',
      resolvedAt: '2024-11-04T16:45:00',
      resolvedBy: 'Chief Deputy Anderson'
    }
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
    navigate('/signin');
  };

  const getSeverityConfig = (severity) => {
    const configs = {
      critical: {
        bg: 'bg-red-500/10',
        border: 'border-red-500/30',
        text: 'text-red-400',
        icon: AlertTriangle,
        label: 'CRITICAL'
      },
      high: {
        bg: 'bg-orange-500/10',
        border: 'border-orange-500/30',
        text: 'text-orange-400',
        icon: AlertCircle,
        label: 'HIGH'
      },
      medium: {
        bg: 'bg-amber-500/10',
        border: 'border-amber-500/30',
        text: 'text-amber-400',
        icon: AlertCircle,
        label: 'MEDIUM'
      },
      low: {
        bg: 'bg-blue-500/10',
        border: 'border-blue-500/30',
        text: 'text-blue-400',
        icon: Info,
        label: 'LOW'
      },
      info: {
        bg: 'bg-slate-500/10',
        border: 'border-slate-500/30',
        text: 'text-slate-400',
        icon: Info,
        label: 'INFO'
      }
    };
    return configs[severity] || configs.info;
  };

  const getCategoryIcon = (category) => {
    const icons = {
      personnel: Users,
      compliance: FileWarning,
      equipment: Zap,
      budget: DollarSign,
      facilities: Home,
      training: FileText,
      operations: Shield
    };
    return icons[category] || AlertCircle;
  };

  const filteredAlerts = alerts.filter(alert => {
    const severityMatch = filterSeverity === 'all' || alert.severity === filterSeverity;
    const categoryMatch = filterCategory === 'all' || alert.category === filterCategory;
    const statusMatch = activeTab === 'all' || alert.status === activeTab;
    const divisionMatch = filterDivision === 'all' || alert.division === filterDivision;
    return severityMatch && categoryMatch && statusMatch && divisionMatch;
  });

  const activeAlerts = alerts.filter(a => a.status === 'active');
  const criticalCount = activeAlerts.filter(a => a.severity === 'critical').length;
  const highCount = activeAlerts.filter(a => a.severity === 'high').length;

  const getWorkflowStatusConfig = (status) => {
    const configs = {
      'under_review': {
        label: 'Under Review',
        bg: 'bg-slate-500/20',
        border: 'border-slate-500/30',
        text: 'text-slate-400',
        icon: Eye
      },
      'assigned': {
        label: 'Assigned',
        bg: 'bg-blue-500/20',
        border: 'border-blue-500/30',
        text: 'text-blue-400',
        icon: UserPlus
      },
      'in_progress': {
        label: 'In Progress',
        bg: 'bg-amber-500/20',
        border: 'border-amber-500/30',
        text: 'text-amber-400',
        icon: Clock
      },
      'resolved': {
        label: 'Resolved',
        bg: 'bg-green-500/20',
        border: 'border-green-500/30',
        text: 'text-green-400',
        icon: CheckCircle2
      }
    };
    return configs[status] || configs['under_review'];
  };

  const getTimePending = (timestamp) => {
    const now = new Date();
    const alertTime = new Date(timestamp);
    const diffMs = now - alertTime;
    const diffDays = Math.floor(diffMs / 86400000);
    const diffHours = Math.floor(diffMs / 3600000);
    
    if (diffDays > 0) return `Pending ${diffDays} day${diffDays > 1 ? 's' : ''}`;
    if (diffHours > 0) return `Pending ${diffHours} hour${diffHours > 1 ? 's' : ''}`;
    return `Pending ${Math.floor(diffMs / 60000)} min`;
  };

  const handleAcknowledgeAll = () => {
    const allActiveIds = alerts.filter(a => a.status === 'active').map(a => a.id);
    setAcknowledgedAlerts(new Set(allActiveIds));
  };

  const handleAssign = (alertId) => {
    const alert = alerts.find(a => a.id === alertId);
    if (alert && assignPersonnel) {
      setAlerts(prev => prev.map(a => 
        a.id === alertId 
          ? { 
              ...a, 
              assignedPersonnel: assignPersonnel,
              assignedTo: assignPersonnel,
              workflowStatus: 'assigned',
              timeline: [
                ...(a.timeline || []),
                { 
                  action: 'assigned', 
                  timestamp: new Date().toISOString(), 
                  user: 'Sheriff Thompson', 
                  notes: `Assigned to ${assignPersonnel}` 
                }
              ]
            }
          : a
      ));
      setAssignModalOpen(false);
      setAlertToAction(null);
      setAssignPersonnel('');
    }
  };

  const handleResolve = (alertId) => {
    if (resolveNotes) {
      setAlerts(prev => prev.map(a => 
        a.id === alertId 
          ? { 
              ...a, 
              status: 'resolved',
              workflowStatus: 'resolved',
              resolvedAt: new Date().toISOString(),
              resolvedBy: 'Sheriff Thompson',
              resolution: resolveNotes,
              timeline: [
                ...(a.timeline || []),
                { 
                  action: 'resolved', 
                  timestamp: new Date().toISOString(), 
                  user: 'Sheriff Thompson', 
                  notes: resolveNotes
                }
              ]
            }
          : a
      ));
      setResolveModalOpen(false);
      setAlertToAction(null);
      setResolveNotes('');
    }
  };

  const handleExportReport = () => {
    const reportData = filteredAlerts.map(alert => ({
      id: alert.id,
      title: alert.title,
      severity: alert.severity,
      category: alert.category,
      status: alert.status,
      assignedTo: alert.assignedPersonnel || alert.assignedTo,
      created: alert.timestamp,
      location: alert.location
    }));
    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `alerts-report-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const toggleExpandedAlert = (alertId) => {
    setExpandedAlerts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(alertId)) {
        newSet.delete(alertId);
      } else {
        newSet.add(alertId);
      }
      return newSet;
    });
  };

  const acknowledgeAlert = (alertId) => {
    setAcknowledgedAlerts(prev => {
      const newSet = new Set(prev);
      newSet.add(alertId);
      return newSet;
    });
  };

  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const alertTime = new Date(timestamp);
    const diffMs = now - alertTime;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins} min ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
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

                {/* Staffing Submenu */}
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
                className="flex-1 px-4 py-2.5 bg-slate-700/40 hover:bg-slate-700/60 border border-slate-600/50 rounded-xl text-white font-medium transition-all"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Command Bar */}
        <header className="border-b border-slate-800/50 backdrop-blur-xl bg-slate-900/30 sticky top-0 z-30">
          <div className="px-4 lg:px-6 py-4 flex items-center justify-between gap-4">
            {/* Mobile menu button and Search */}
            <div className="flex items-center gap-4 flex-1 min-w-0">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 hover:bg-slate-800/50 rounded-lg"
              >
                <Menu className="w-5 h-5 text-slate-400" />
              </button>
              <div className="flex-1 max-w-xl relative hidden sm:block">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search anything..."
                  className="w-full pl-12 pr-4 py-2 bg-slate-800/40 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50"
                />
              </div>
            </div>

            {/* Right side - Notifications and Profile */}
            <div className="flex items-center gap-2 lg:gap-3">
              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                  className="notifications-trigger p-2 hover:bg-slate-800/50 rounded-lg relative"
                >
                  <Bell className="w-5 h-5 text-slate-400" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>

                {notificationsOpen && (
                  <div className="notifications-dropdown absolute right-0 top-full mt-2 w-96 bg-slate-900/95 backdrop-blur-xl border border-slate-700/50 rounded-xl shadow-2xl z-50">
                    <div className="p-4 border-b border-slate-700/50">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-semibold text-white">Notifications</h3>
                        <span className="px-2 py-0.5 bg-red-500/20 border border-red-500/30 text-red-400 text-xs rounded-full">
                          {notifications.filter(n => n.urgent).length} urgent
                        </span>
                      </div>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.map(notification => (
                        <div
                          key={notification.id}
                          className={`p-4 border-b border-slate-800/30 hover:bg-slate-800/30 cursor-pointer transition-colors ${
                            notification.urgent ? 'bg-amber-500/5' : ''
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                              notification.urgent ? 'bg-amber-400' : 'bg-blue-400'
                            }`}></div>
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
                      <button className="w-full text-center text-sm text-amber-400 hover:text-amber-300 font-medium">
                        View All Notifications
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="h-8 w-px bg-slate-700/50 hidden sm:block"></div>

              {/* Profile Menu */}
              <div className="relative">
                <button
                  onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                  className="profile-trigger flex items-center gap-2 hover:bg-slate-800/50 rounded-lg p-1.5 transition-colors"
                >
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
                      <span className="inline-block mt-2 px-2 py-0.5 bg-amber-500/20 border border-amber-500/30 text-amber-400 text-xs rounded-full">
                        Administrator
                      </span>
                    </div>
                    <div className="p-2">
                      <button
                        onClick={() => {
                          setProfileMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-800/50 hover:text-white transition-colors text-sm"
                      >
                        <User className="w-4 h-4" />
                        <span>My Profile</span>
                      </button>
                      <button
                        onClick={() => {
                          setProfileMenuOpen(false);
                          navigate('/command/settings');
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-800/50 hover:text-white transition-colors text-sm"
                      >
                        <Settings className="w-4 h-4" />
                        <span>Settings</span>
                        <span className="ml-auto px-1.5 py-0.5 bg-slate-700/50 text-slate-400 text-xs rounded">Admin</span>
                      </button>
                    </div>
                    <div className="p-2 border-t border-slate-700/50">
                      <button
                        onClick={() => {
                          setProfileMenuOpen(false);
                          setLogoutConfirmOpen(true);
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-slate-400 hover:bg-slate-800/50 hover:text-red-400 transition-colors text-sm"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl lg:text-3xl font-bold text-white mb-2">Command Alerts</h2>
                <p className="text-slate-400">Critical notifications and operational alerts</p>
              </div>
              <div className="flex items-center gap-3">
                {criticalCount > 0 && (
                  <span className="px-4 py-2 bg-red-500/20 border border-red-500/30 rounded-xl text-red-400 font-bold text-sm">
                    {criticalCount} CRITICAL
                  </span>
                )}
                {highCount > 0 && (
                  <span className="px-4 py-2 bg-orange-500/20 border border-orange-500/30 rounded-xl text-orange-400 font-semibold text-sm">
                    {highCount} HIGH
                  </span>
                )}
              </div>
            </div>

            {/* AI Insights Banner */}
            <div className="mb-6 bg-slate-800/60 border border-amber-500/30 rounded-xl p-6 shadow-xl">
              <div className="flex items-center gap-3 mb-5">
                <Sparkles className="w-6 h-6 text-amber-400" />
                <h3 className="text-xl font-bold text-white">AI Insights</h3>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* CRITICAL Section */}
                <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <AlertTriangle className="w-5 h-5 text-red-400" />
                    <h4 className="text-sm font-bold text-red-400 uppercase">Critical</h4>
                  </div>
                  <ul className="space-y-2 text-sm text-slate-200">
                    <li className="flex items-start gap-2">
                      <span className="text-red-400 mt-1">•</span>
                      <span>Night shift patrol at dangerous staffing level - immediate action required</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-400 mt-1">•</span>
                      <span>Body camera system malfunction requires immediate resolution</span>
                    </li>
                  </ul>
                </div>

                {/* MONITORING Section */}
                <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <AlertCircle className="w-5 h-5 text-amber-400" />
                    <h4 className="text-sm font-bold text-amber-400 uppercase">Monitoring</h4>
                  </div>
                  <ul className="space-y-2 text-sm text-slate-200">
                    <li className="flex items-start gap-2">
                      <span className="text-amber-400 mt-1">•</span>
                      <span>8 deputies with expiring certifications - monitor training schedules</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-400 mt-1">•</span>
                      <span>Patrol overtime on track to exceed budget - recommend review</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-400 mt-1">•</span>
                      <span>Fleet capacity at 85% - monitor maintenance schedule</span>
                    </li>
                  </ul>
                </div>

                {/* OPERATIONAL STATUS Section */}
                <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle2 className="w-5 h-5 text-green-400" />
                    <h4 className="text-sm font-bold text-green-400 uppercase">Operational Status</h4>
                  </div>
                  <ul className="space-y-2 text-sm text-slate-200">
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-1">•</span>
                      <span>3 alerts resolved in last 24 hours</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-1">•</span>
                      <span>All critical systems operational</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-1">•</span>
                      <span>Response times within normal parameters</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Quick Actions Bar */}
            <div className="mb-6 bg-slate-800/40 border border-slate-700/50 rounded-xl p-4">
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={handleAcknowledgeAll}
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-sm font-medium transition-all flex items-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Acknowledge All
                </button>
                
                <select
                  value={filterSeverity}
                  onChange={(e) => setFilterSeverity(e.target.value)}
                  className="px-4 py-2 bg-slate-800/60 border border-slate-700/50 rounded-lg text-white text-sm focus:outline-none focus:border-amber-500/50 cursor-pointer"
                >
                  <option value="all">Filter by Severity</option>
                  <option value="critical">Critical</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                  <option value="info">Info</option>
                </select>

                <select
                  value={filterDivision}
                  onChange={(e) => setFilterDivision(e.target.value)}
                  className="px-4 py-2 bg-slate-800/60 border border-slate-700/50 rounded-lg text-white text-sm focus:outline-none focus:border-amber-500/50 cursor-pointer"
                >
                  <option value="all">Filter by Division</option>
                  <option value="Patrol Division">Patrol Division</option>
                  <option value="Detention Division">Detention Division</option>
                  <option value="Investigations Division">Investigations Division</option>
                  <option value="Training Division">Training Division</option>
                  <option value="Support Services">Support Services</option>
                  <option value="IT Department">IT Department</option>
                  <option value="Policy Division">Policy Division</option>
                </select>

                <button
                  onClick={handleExportReport}
                  className="px-4 py-2 bg-slate-700/60 hover:bg-slate-700/80 border border-slate-600/50 text-white rounded-lg text-sm font-medium transition-all flex items-center gap-2 ml-auto"
                >
                  <Download className="w-4 h-4" />
                  Export Report
                </button>
              </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 bg-red-500/20 rounded-xl flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5 text-red-400" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-white mb-1">{criticalCount}</p>
                <p className="text-sm text-slate-400">Critical Alerts</p>
              </div>

              <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 bg-orange-500/20 rounded-xl flex items-center justify-center">
                    <AlertCircle className="w-5 h-5 text-orange-400" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-white mb-1">{highCount}</p>
                <p className="text-sm text-slate-400">High Priority</p>
              </div>

              <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
                    <Clock className="w-5 h-5 text-blue-400" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-white mb-1">{activeAlerts.length}</p>
                <p className="text-sm text-slate-400">Active Alerts</p>
              </div>

              <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-green-400" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-white mb-1">{alerts.filter(a => a.status === 'resolved').length}</p>
                <p className="text-sm text-slate-400">Resolved Today</p>
              </div>
            </div>

            {/* Tabs */}
            <div className="mb-6 flex gap-2 border-b border-slate-700/50">
              {[
                { id: 'active', label: 'Active', count: activeAlerts.length },
                { id: 'resolved', label: 'Resolved', count: alerts.filter(a => a.status === 'resolved').length },
                { id: 'all', label: 'All Alerts', count: alerts.length }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-all relative ${
                    activeTab === tab.id ? 'text-amber-400' : 'text-slate-400 hover:text-slate-300'
                  }`}
                >
                  {tab.label}
                  <span className={`px-2 py-0.5 rounded-full text-xs ${
                    activeTab === tab.id ? 'bg-amber-500/20 text-amber-400' : 'bg-slate-700/50 text-slate-400'
                  }`}>{tab.count}</span>
                  {activeTab === tab.id && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500"></div>
                  )}
                </button>
              ))}
            </div>

            {/* Search and Category Filter */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search alerts..."
                  className="w-full pl-12 pr-4 py-2.5 bg-slate-800/40 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50"
                />
              </div>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-4 py-2.5 bg-slate-800/40 border border-slate-700/50 rounded-xl text-white text-sm focus:outline-none focus:border-amber-500/50 cursor-pointer"
              >
                <option value="all">All Categories</option>
                <option value="personnel">Personnel</option>
                <option value="compliance">Compliance</option>
                <option value="equipment">Equipment</option>
                <option value="budget">Budget</option>
                <option value="facilities">Facilities</option>
                <option value="training">Training</option>
                <option value="operations">Operations</option>
              </select>
            </div>

            {/* Alerts List */}
            <div className="space-y-4">
              {filteredAlerts.map(alert => {
                const severityConfig = getSeverityConfig(alert.severity);
                const CategoryIcon = getCategoryIcon(alert.category);
                const SeverityIcon = severityConfig.icon;
                const isAcknowledged = acknowledgedAlerts.has(alert.id);
                const workflowStatusConfig = getWorkflowStatusConfig(alert.workflowStatus || (alert.status === 'resolved' ? 'resolved' : 'under_review'));
                const WorkflowIcon = workflowStatusConfig.icon;
                const isExpanded = expandedAlerts.has(alert.id);

                return (
                  <div
                    key={alert.id}
                    className={`bg-slate-800/40 border rounded-xl p-5 hover:bg-slate-800/50 transition-all ${
                      alert.status === 'resolved' ? 'border-slate-700/50 opacity-75' : severityConfig.border
                    } ${isAcknowledged ? 'opacity-60' : ''}`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4 flex-1">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${severityConfig.bg}`}>
                          <SeverityIcon className={`w-6 h-6 ${severityConfig.text}`} />
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2 flex-wrap">
                            <span className={`px-2 py-0.5 rounded text-xs font-bold ${severityConfig.bg} ${severityConfig.text} border ${severityConfig.border}`}>
                              {severityConfig.label}
                            </span>
                            <span className="px-2 py-0.5 bg-slate-700/50 rounded text-xs text-slate-300 capitalize">
                              {alert.category}
                            </span>
                            <span className={`px-2 py-0.5 rounded text-xs font-semibold ${workflowStatusConfig.bg} ${workflowStatusConfig.text} border ${workflowStatusConfig.border} flex items-center gap-1`}>
                              <WorkflowIcon className="w-3 h-3" />
                              {workflowStatusConfig.label}
                            </span>
                            {alert.status === 'resolved' && (
                              <span className="px-2 py-0.5 bg-green-500/20 border border-green-500/30 rounded text-xs text-green-400 font-bold">
                                RESOLVED
                              </span>
                            )}
                            {isAcknowledged && alert.status === 'active' && (
                              <span className="px-2 py-0.5 bg-blue-500/20 border border-blue-500/30 rounded text-xs text-blue-400 font-bold">
                                ACKNOWLEDGED
                              </span>
                            )}
                          </div>

                          <h3 className="text-lg font-semibold text-white mb-2">{alert.title}</h3>
                          <p className="text-sm text-slate-300 mb-3">{alert.description}</p>

                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-3">
                            <div className="flex items-center gap-2 text-xs text-slate-400">
                              <Clock className="w-3 h-3" />
                              <span>{getTimePending(alert.timestamp)}</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-slate-400">
                              <MapPin className="w-3 h-3" />
                              <span>{alert.location}</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-slate-400">
                              <User className="w-3 h-3" />
                              <span>{alert.assignedPersonnel || alert.assignedTo}</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-slate-400">
                              <Building2 className="w-3 h-3" />
                              <span>{alert.division || alert.location}</span>
                            </div>
                          </div>

                          <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3 mb-3">
                            <p className="text-xs font-semibold text-amber-400 mb-1">Impact Assessment</p>
                            <p className="text-sm text-slate-200">{alert.impact}</p>
                          </div>

                          {alert.relatedDocuments && alert.relatedDocuments.length > 0 && (
                            <div className="mb-3">
                              <p className="text-xs text-slate-400 mb-2">Related Documents:</p>
                              <div className="flex flex-wrap gap-2">
                                {alert.relatedDocuments.map((doc, idx) => (
                                  <a
                                    key={idx}
                                    href={doc.url}
                                    className="flex items-center gap-1 px-2 py-1 bg-slate-700/50 hover:bg-slate-700/70 rounded text-xs text-slate-300 hover:text-amber-400 transition-all"
                                  >
                                    <Link2 className="w-3 h-3" />
                                    {doc.name}
                                  </a>
                                ))}
                              </div>
                            </div>
                          )}

                          {alert.status === 'active' && alert.recommendations && (
                            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 mb-3">
                              <p className="text-xs font-semibold text-blue-400 mb-2">Recommended Actions:</p>
                              <ul className="space-y-1">
                                {alert.recommendations.map((rec, idx) => (
                                  <li key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                                    <ChevronRight className="w-3 h-3 mt-0.5 text-blue-400 flex-shrink-0" />
                                    <span>{rec}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {alert.status === 'resolved' && (
                            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3 mb-3">
                              <p className="text-xs font-semibold text-green-400 mb-2">Resolution:</p>
                              <p className="text-sm text-slate-300 mb-2">{alert.resolution}</p>
                              <div className="flex items-center gap-3 text-xs text-slate-400">
                                <span>Resolved by: {alert.resolvedBy}</span>
                                <span>•</span>
                                <span>{new Date(alert.resolvedAt).toLocaleString()}</span>
                              </div>
                            </div>
                          )}

                          {/* Timeline Section - Collapsible */}
                          {alert.timeline && alert.timeline.length > 0 && (
                            <div className="mt-3">
                              <button
                                onClick={() => toggleExpandedAlert(alert.id)}
                                className="flex items-center gap-2 text-xs text-amber-400 hover:text-amber-300 font-medium mb-2"
                              >
                                <ChevronDown className={`w-3 h-3 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                                Alert Timeline ({alert.timeline.length} events)
                              </button>
                              {isExpanded && (
                                <div className="bg-slate-900/50 rounded-lg p-3 space-y-3">
                                  {alert.timeline.map((event, idx) => (
                                    <div key={idx} className="flex gap-3">
                                      <div className="flex flex-col items-center">
                                        <div className={`w-2 h-2 rounded-full ${
                                          event.action === 'created' ? 'bg-blue-400' :
                                          event.action === 'acknowledged' ? 'bg-amber-400' :
                                          event.action === 'assigned' ? 'bg-purple-400' :
                                          event.action === 'status_changed' ? 'bg-yellow-400' :
                                          'bg-green-400'
                                        }`}></div>
                                        {idx < alert.timeline.length - 1 && (
                                          <div className="w-px h-full bg-slate-700 mt-1 min-h-[30px]"></div>
                                        )}
                                      </div>
                                      <div className="flex-1 pb-2">
                                        <div className="flex items-center gap-2 mb-1">
                                          <span className="text-xs font-semibold text-white capitalize">{event.action.replace('_', ' ')}</span>
                                          <span className="text-xs text-slate-500">by {event.user}</span>
                                          <span className="text-xs text-slate-600">•</span>
                                          <span className="text-xs text-slate-500">{new Date(event.timestamp).toLocaleString()}</span>
                                        </div>
                                        {event.notes && (
                                          <p className="text-xs text-slate-400">{event.notes}</p>
                                        )}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Workflow Actions */}
                      {alert.status === 'active' && (
                        <div className="flex flex-col gap-2 min-w-[140px]">
                          <button
                            onClick={() => {
                              setSelectedAlert(alert);
                              toggleExpandedAlert(alert.id);
                            }}
                            className="px-3 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-xs font-medium transition-all flex items-center justify-center gap-1"
                          >
                            <Eye className="w-3 h-3" />
                            View Details
                          </button>
                          <button
                            onClick={() => acknowledgeAlert(alert.id)}
                            className="px-3 py-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 text-blue-400 rounded-lg text-xs font-medium transition-all flex items-center justify-center gap-1"
                          >
                            <CheckCircle2 className="w-3 h-3" />
                            Acknowledge
                          </button>
                          <button
                            onClick={() => {
                              setAlertToAction(alert);
                              setAssignModalOpen(true);
                            }}
                            className="px-3 py-2 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 text-purple-400 rounded-lg text-xs font-medium transition-all flex items-center justify-center gap-1"
                          >
                            <UserPlus className="w-3 h-3" />
                            Assign
                          </button>
                          <button
                            onClick={() => {
                              setAlertToAction(alert);
                              setResolveModalOpen(true);
                            }}
                            className="px-3 py-2 bg-green-500/20 hover:bg-green-500/30 border border-green-500/30 text-green-400 rounded-lg text-xs font-medium transition-all flex items-center justify-center gap-1"
                          >
                            <CheckCircle2 className="w-3 h-3" />
                            Resolve
                          </button>
                        </div>
                      )}
                      {alert.status === 'resolved' && (
                        <div className="flex flex-col gap-2 min-w-[140px]">
                          <button
                            onClick={() => setSelectedAlert(alert)}
                            className="px-3 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-xs font-medium transition-all flex items-center justify-center gap-1"
                          >
                            <Eye className="w-3 h-3" />
                            View Details
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </main>
      </div>

      {/* Alert Detail Modal */}
      {selectedAlert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedAlert(null)}
          />
          <div className="relative bg-slate-900 border border-slate-700/50 rounded-2xl p-6 max-w-2xl w-full shadow-2xl max-h-[80vh] overflow-y-auto">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-white mb-2">{selectedAlert.title}</h3>
                <div className="flex items-center gap-2">
                  {(() => {
                    const config = getSeverityConfig(selectedAlert.severity);
                    return (
                      <span className={`px-3 py-1 rounded text-xs font-bold ${config.bg} ${config.text} border ${config.border}`}>
                        {config.label}
                      </span>
                    );
                  })()}
                  <span className="px-3 py-1 bg-slate-700/50 rounded text-xs text-slate-300 capitalize">
                    {selectedAlert.category}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedAlert(null)}
                className="p-2 hover:bg-slate-800/50 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-sm text-slate-400 mb-1">Description</p>
                <p className="text-base text-slate-200">{selectedAlert.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-800/40 rounded-xl p-4 border border-slate-700/50">
                  <p className="text-xs text-slate-400 mb-1">Location</p>
                  <p className="text-sm font-medium text-white">{selectedAlert.location}</p>
                </div>
                <div className="bg-slate-800/40 rounded-xl p-4 border border-slate-700/50">
                  <p className="text-xs text-slate-400 mb-1">Assigned To</p>
                  <p className="text-sm font-medium text-white">{selectedAlert.assignedTo}</p>
                </div>
              </div>

              <div className="bg-slate-800/40 rounded-xl p-4 border border-slate-700/50">
                <p className="text-xs text-slate-400 mb-1">Impact Assessment</p>
                <p className="text-sm text-slate-200">{selectedAlert.impact}</p>
              </div>

              {selectedAlert.relatedData && (
                <div className="bg-slate-800/40 rounded-xl p-4 border border-slate-700/50">
                  <p className="text-xs text-slate-400 mb-3">Related Data</p>
                  <div className="grid grid-cols-2 gap-3">
                    {Object.entries(selectedAlert.relatedData).map(([key, value]) => (
                      <div key={key}>
                        <p className="text-xs text-slate-500 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                        <p className="text-lg font-bold text-white">{typeof value === 'number' ? value.toLocaleString() : value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedAlert.recommendations && (
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
                  <p className="text-sm font-semibold text-blue-400 mb-3">Recommended Actions</p>
                  <ul className="space-y-2">
                    {selectedAlert.recommendations.map((rec, idx) => (
                      <li key={idx} className="text-sm text-slate-300 flex items-start gap-2">
                        <ChevronRight className="w-4 h-4 mt-0.5 text-blue-400 flex-shrink-0" />
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex gap-3 pt-4 border-t border-slate-700/50">
                <button
                  onClick={() => {
                    acknowledgeAlert(selectedAlert.id);
                    setSelectedAlert(null);
                  }}
                  className="flex-1 px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-medium transition-all"
                >
                  Acknowledge Alert
                </button>
                <button
                  onClick={() => setSelectedAlert(null)}
                  className="flex-1 px-4 py-3 bg-slate-700/40 hover:bg-slate-700/60 border border-slate-600/50 text-white rounded-xl font-medium transition-all"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Assign Modal */}
      {assignModalOpen && alertToAction && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => {
              setAssignModalOpen(false);
              setAlertToAction(null);
              setAssignPersonnel('');
            }}
          />
          <div className="relative bg-slate-900 border border-slate-700/50 rounded-2xl p-6 max-w-md w-full shadow-2xl">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                <UserPlus className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Assign Alert</h3>
                <p className="text-sm text-slate-400">{alertToAction.title}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Assign to Personnel</label>
                <input
                  type="text"
                  value={assignPersonnel}
                  onChange={(e) => setAssignPersonnel(e.target.value)}
                  placeholder="Enter personnel name..."
                  className="w-full px-4 py-2.5 bg-slate-800/40 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => {
                    setAssignModalOpen(false);
                    setAlertToAction(null);
                    setAssignPersonnel('');
                  }}
                  className="flex-1 px-4 py-2.5 bg-slate-800/40 hover:bg-slate-800/60 border border-slate-700/50 rounded-xl text-white font-medium transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleAssign(alertToAction.id)}
                  className="flex-1 px-4 py-2.5 bg-purple-500 hover:bg-purple-600 text-white rounded-xl font-medium transition-all"
                >
                  Assign
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Resolve Modal */}
      {resolveModalOpen && alertToAction && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => {
              setResolveModalOpen(false);
              setAlertToAction(null);
              setResolveNotes('');
            }}
          />
          <div className="relative bg-slate-900 border border-slate-700/50 rounded-2xl p-6 max-w-md w-full shadow-2xl">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Resolve Alert</h3>
                <p className="text-sm text-slate-400">{alertToAction.title}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Resolution Notes</label>
                <textarea
                  value={resolveNotes}
                  onChange={(e) => setResolveNotes(e.target.value)}
                  placeholder="Describe how this alert was resolved..."
                  rows={4}
                  className="w-full px-4 py-2.5 bg-slate-800/40 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50 resize-none"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => {
                    setResolveModalOpen(false);
                    setAlertToAction(null);
                    setResolveNotes('');
                  }}
                  className="flex-1 px-4 py-2.5 bg-slate-800/40 hover:bg-slate-800/60 border border-slate-700/50 rounded-xl text-white font-medium transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleResolve(alertToAction.id)}
                  className="flex-1 px-4 py-2.5 bg-green-500 hover:bg-green-600 text-white rounded-xl font-medium transition-all"
                >
                  Resolve
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AI Chat Button */}
      <button
        onClick={() => setChatOpen(!chatOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110 z-40"
      >
        {chatOpen ? <X className="w-6 h-6 text-white" /> : <MessageCircle className="w-6 h-6 text-white" />}
      </button>

      {chatOpen && (
        <div className="fixed bottom-24 right-6 w-full max-w-96 h-[500px] bg-slate-900/95 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl flex flex-col z-40 mx-4 sm:mx-0">
          <div className="p-4 border-b border-slate-700/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">Alerts AI Assistant</h3>
                <p className="text-xs text-green-400">Online</p>
              </div>
            </div>
          </div>
          <div className="flex-1 p-4 overflow-y-auto">
            <div className="flex gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <div className="bg-slate-800/60 p-3 rounded-xl">
                  <p className="text-sm text-slate-200">Hi! I can help you prioritize alerts, analyze trends, recommend actions, coordinate responses, and answer questions about operational issues. What do you need?</p>
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 border-t border-slate-700/50">
            <div className="flex items-center gap-2">
              <input type="text" placeholder="Ask about alerts..." className="flex-1 px-4 py-2 bg-slate-800/40 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50" />
              <button className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
                <Send className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { Home, Users, FileText, LayoutDashboard, TrendingUp, AlertCircle, Settings, Bell, MessageCircle, Search, ChevronRight, DollarSign, CheckCircle, Shield, Sparkles, X, Send, Menu, ChevronLeft, LogOut, Download, Calendar, Filter, BarChart3, PieChart, LineChart, Activity, Clock, ArrowUpRight, ArrowDownRight, Eye, RefreshCw, FileSpreadsheet, Mail, Share2, Building2, Radio, Target, Plus, Sliders, BookOpen, PlayCircle, PauseCircle, Printer, FileDown, ChevronDown, ChevronUp, TrendingDown, Zap, Info, Star, AlertTriangle, CheckCircle2, Maximize2, Minimize2, ShieldCheck, User, Phone, Lightbulb, Bot, CalendarClock, Library } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function ReportsAnalytics() {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState('reports');
  const [activeTab, setActiveTab] = useState('overview');
  const [chatOpen, setChatOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    const saved = localStorage.getItem('sidebarCollapsed');
    return saved === 'true';
  });
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [logoutConfirmOpen, setLogoutConfirmOpen] = useState(false);
  const [staffingExpanded, setStaffingExpanded] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [timeRange, setTimeRange] = useState('ytd');
  const [selectedReport, setSelectedReport] = useState(null);
  const [reportDetailModal, setReportDetailModal] = useState(null);
  const [exportModal, setExportModal] = useState(false);
  const [scheduleModal, setScheduleModal] = useState(false);
  const [customReportModal, setCustomReportModal] = useState(false);
  const [comparisonModal, setComparisonModal] = useState(false);
  const [aiInsightsExpanded, setAiInsightsExpanded] = useState(true);
  const [expandedMetrics, setExpandedMetrics] = useState(new Set());
  const [selectedComparison, setSelectedComparison] = useState('yoy'); // yoy, mom, qoq
  const [filterCategory, setFilterCategory] = useState('all');

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
    { id: 1, title: '3 Certifications Expiring Soon', message: 'CPR, Firearms, and P.O.S.T. renewals needed', time: '10 min ago', urgent: true },
    { id: 2, title: 'Budget Approval Required', message: 'Q1 2025 Training Budget: $45,000', time: '1 hour ago', urgent: true },
    { id: 3, title: 'Leave Request Submitted', message: 'Deputy Marcus Chen - Dec 15-22', time: '2 hours ago', urgent: false }
  ];

  // Key metrics data
  const keyMetrics = {
    callsForService: {
      total: 145678,
      change: 5.2,
      trend: 'up',
      ytd: 145678,
      lastYear: 138432
    },
    responseTime: {
      average: 8.4,
      change: -12.3,
      trend: 'down',
      target: 8.0,
      unit: 'minutes'
    },
    crimeClearanceRate: {
      rate: 68.5,
      change: 3.8,
      trend: 'up',
      target: 70.0,
      unit: '%'
    },
    arrestsYTD: {
      total: 12456,
      change: -2.1,
      trend: 'down',
      lastYear: 12724
    },
    staffing: {
      current: 164,
      authorized: 178,
      percentage: 92.1,
      change: 1.2
    },
    overtime: {
      hours: 18943,
      cost: 1247850,
      change: -8.5,
      trend: 'down'
    }
  };

  // Division performance data
  const divisionPerformance = [
    {
      name: 'Patrol Division',
      calls: 89234,
      responseTime: 7.8,
      clearanceRate: 45.2,
      staffing: 92,
      efficiency: 88
    },
    {
      name: 'Investigations',
      calls: 5643,
      responseTime: 24.5,
      clearanceRate: 82.3,
      staffing: 95,
      efficiency: 91
    },
    {
      name: 'Detention',
      calls: 0,
      responseTime: 0,
      clearanceRate: 0,
      staffing: 94,
      efficiency: 87,
      inmates: 842,
      capacity: 920
    },
    {
      name: 'Support Services',
      calls: 12456,
      responseTime: 15.2,
      clearanceRate: 68.9,
      staffing: 89,
      efficiency: 85
    }
  ];

  // Monthly trends
  const monthlyTrends = [
    { month: 'Jan', calls: 12345, arrests: 1045, clearance: 66.2 },
    { month: 'Feb', calls: 11892, arrests: 1023, clearance: 67.1 },
    { month: 'Mar', calls: 13124, arrests: 1156, clearance: 68.3 },
    { month: 'Apr', calls: 12876, arrests: 1089, clearance: 67.8 },
    { month: 'May', calls: 13654, arrests: 1198, clearance: 69.1 },
    { month: 'Jun', calls: 14235, arrests: 1267, clearance: 68.9 },
    { month: 'Jul', calls: 15123, arrests: 1342, clearance: 69.5 },
    { month: 'Aug', calls: 14987, arrests: 1298, clearance: 68.7 },
    { month: 'Sep', calls: 13456, arrests: 1187, clearance: 67.9 },
    { month: 'Oct', calls: 12986, arrests: 1102, clearance: 68.5 }
  ];

  // Crime statistics
  const crimeStats = [
    { category: 'Property Crime', incidents: 4523, change: -5.8, arrests: 3102, clearance: 68.6 },
    { category: 'Violent Crime', incidents: 892, change: 2.3, arrests: 745, clearance: 83.5 },
    { category: 'Drug Offenses', incidents: 1876, change: -12.4, arrests: 1654, clearance: 88.2 },
    { category: 'Traffic Violations', incidents: 8934, change: 3.2, arrests: 7823, clearance: 87.6 },
    { category: 'Public Order', incidents: 2134, change: -1.5, arrests: 1678, clearance: 78.6 }
  ];

  // Available reports with enhanced data
  const availableReports = [
    {
      id: 1,
      name: 'Executive Monthly Summary',
      description: 'Comprehensive monthly overview for command staff',
      category: 'Executive',
      lastGenerated: '2024-11-01',
      frequency: 'Monthly',
      icon: FileText,
      scheduled: true,
      recipients: 12,
      views: 342,
      downloads: 89,
      status: 'active',
      nextScheduled: '2024-12-01',
      dataPoints: ['Calls for Service', 'Response Times', 'Crime Clearance', 'Budget Status', 'Personnel'],
      fileSize: '2.4 MB'
    },
    {
      id: 2,
      name: 'Crime Statistics Report',
      description: 'Detailed crime trends and clearance rates',
      category: 'Operations',
      lastGenerated: '2024-11-03',
      frequency: 'Weekly',
      icon: BarChart3,
      scheduled: true,
      recipients: 8,
      views: 156,
      downloads: 45,
      status: 'active',
      nextScheduled: '2024-11-10',
      dataPoints: ['Incident Types', 'Clearance Rates', 'Arrest Data', 'Geographic Analysis'],
      fileSize: '1.8 MB'
    },
    {
      id: 3,
      name: 'Personnel Compliance Report',
      description: 'Certifications, training, and compliance status',
      category: 'HR',
      lastGenerated: '2024-11-02',
      frequency: 'Weekly',
      icon: Users,
      scheduled: true,
      recipients: 6,
      views: 234,
      downloads: 67,
      status: 'active',
      nextScheduled: '2024-11-09',
      dataPoints: ['Certifications', 'Training Hours', 'Expiring Credentials', 'Compliance Score'],
      fileSize: '1.2 MB'
    },
    {
      id: 4,
      name: 'Budget Variance Analysis',
      description: 'YTD spending vs budget by division',
      category: 'Finance',
      lastGenerated: '2024-11-01',
      frequency: 'Monthly',
      icon: DollarSign,
      scheduled: true,
      recipients: 15,
      views: 423,
      downloads: 124,
      status: 'active',
      nextScheduled: '2024-12-01',
      dataPoints: ['Division Budgets', 'Variance Analysis', 'Projections', 'Overtime Costs'],
      fileSize: '3.1 MB'
    },
    {
      id: 5,
      name: 'Use of Force Analysis',
      description: 'Incidents, trends, and policy compliance',
      category: 'Operations',
      lastGenerated: '2024-10-28',
      frequency: 'Quarterly',
      icon: Shield,
      scheduled: true,
      recipients: 10,
      views: 178,
      downloads: 52,
      status: 'active',
      nextScheduled: '2025-01-28',
      dataPoints: ['Incident Count', 'Force Types', 'Injury Rates', 'Officer Involved', 'Policy Compliance'],
      fileSize: '2.7 MB'
    },
    {
      id: 6,
      name: 'Community Engagement Metrics',
      description: 'Public interactions and satisfaction surveys',
      category: 'Community',
      lastGenerated: '2024-10-30',
      frequency: 'Monthly',
      icon: Users,
      scheduled: false,
      recipients: 5,
      views: 89,
      downloads: 23,
      status: 'active',
      nextScheduled: null,
      dataPoints: ['Public Contacts', 'Survey Results', 'Community Events', 'Satisfaction Scores'],
      fileSize: '1.5 MB'
    },
    {
      id: 7,
      name: 'Fleet Maintenance Report',
      description: 'Vehicle status, maintenance costs, replacement needs',
      category: 'Support',
      lastGenerated: '2024-11-02',
      frequency: 'Monthly',
      icon: Activity,
      scheduled: true,
      recipients: 7,
      views: 145,
      downloads: 34,
      status: 'active',
      nextScheduled: '2024-12-02',
      dataPoints: ['Vehicle Condition', 'Maintenance Costs', 'Downtime', 'Replacement Schedule'],
      fileSize: '1.9 MB'
    },
    {
      id: 8,
      name: 'Training Completion Report',
      description: 'Officer training hours and certification status',
      category: 'Training',
      lastGenerated: '2024-11-01',
      frequency: 'Monthly',
      icon: FileText,
      scheduled: true,
      recipients: 9,
      views: 267,
      downloads: 78,
      status: 'active',
      nextScheduled: '2024-12-01',
      dataPoints: ['Training Hours', 'Completion Rates', 'Certifications', 'Course Enrollment'],
      fileSize: '2.2 MB'
    },
    {
      id: 9,
      name: 'Overtime Analysis Report',
      description: 'Detailed overtime tracking and cost analysis by division',
      category: 'Finance',
      lastGenerated: '2024-11-03',
      frequency: 'Bi-Weekly',
      icon: Clock,
      scheduled: true,
      recipients: 11,
      views: 198,
      downloads: 56,
      status: 'active',
      nextScheduled: '2024-11-17',
      dataPoints: ['OT Hours', 'Cost by Division', 'Trends', 'Staff Utilization'],
      fileSize: '1.6 MB'
    },
    {
      id: 10,
      name: 'Detention Facility Report',
      description: 'Inmate population, incidents, and facility operations',
      category: 'Operations',
      lastGenerated: '2024-11-02',
      frequency: 'Weekly',
      icon: Building2,
      scheduled: true,
      recipients: 8,
      views: 187,
      downloads: 42,
      status: 'active',
      nextScheduled: '2024-11-09',
      dataPoints: ['Population', 'Capacity', 'Incidents', 'Medical', 'Classification'],
      fileSize: '2.0 MB'
    }
  ];

  useEffect(() => {
    localStorage.setItem('sidebarCollapsed', sidebarCollapsed);
  }, [sidebarCollapsed]);

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

  const handleNavigation = (item) => {
    if (item.hasSubmenu) {
      setStaffingExpanded(!staffingExpanded);
    } else {
      navigate(item.route);
      setSidebarOpen(false);
    }
  };

  const handleSubmenuNavigation = (item) => {
    navigate(item.route);
    setSidebarOpen(false);
  };

  const handleLogout = () => {
    navigate(createPageUrl('SignIn'));
  };

  const getChangeColor = (change) => {
    if (change > 0) return 'text-green-400';
    if (change < 0) return 'text-red-400';
    return 'text-slate-400';
  };

  const getChangeIcon = (change) => {
    if (change > 0) return <ArrowUpRight className="w-4 h-4" />;
    if (change < 0) return <ArrowDownRight className="w-4 h-4" />;
    return null;
  };

  const toggleMetricExpand = (metricId) => {
    const newExpanded = new Set(expandedMetrics);
    if (newExpanded.has(metricId)) {
      newExpanded.delete(metricId);
    } else {
      newExpanded.add(metricId);
    }
    setExpandedMetrics(newExpanded);
  };

  const filteredReports = filterCategory === 'all'
    ? availableReports
    : availableReports.filter(r => r.category === filterCategory);

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
            const isActive = item.route && window.location.pathname === item.route;
            const isStaffingActive = item.hasSubmenu && staffingSubmenu.some(sub => window.location.pathname === sub.route);
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
                  <div className="ml-4 mt-1 space-y-1 border-l border-slate-700/50 pl-4">
                    {staffingSubmenu.map(subItem => (
                      <button
                        key={subItem.id}
                        onClick={() => handleSubmenuNavigation(subItem)}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all text-sm ${
                          window.location.pathname === subItem.route
                            ? 'bg-amber-500/20 text-amber-400'
                            : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
                        }`}
                      >
                        {subItem.label}
                      </button>
                    ))}
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

      <div className="flex-1 flex flex-col min-w-0">
        <header className="border-b border-slate-800/50 backdrop-blur-xl bg-slate-900/30 sticky top-0 z-30">
          <div className="px-4 lg:px-6 py-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4 flex-1 min-w-0">
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="lg:hidden p-2 hover:bg-slate-800/50 rounded-lg"
                >
                  <Menu className="w-5 h-5 text-slate-400" />
                </button>
                <div className="hidden md:flex items-center flex-1 max-w-md">
                  <div className="relative w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      type="text"
                      placeholder="Search anything..."
                      className="w-full pl-10 pr-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 lg:gap-4">
                <div className="relative notifications-container">
                  <button
                    onClick={() => setNotificationsOpen(!notificationsOpen)}
                    className="p-2 hover:bg-slate-800/50 rounded-lg transition-colors relative"
                  >
                    <Bell className="w-5 h-5 text-slate-400" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                  </button>

                  {notificationsOpen && (
                    <div className="absolute right-0 top-full mt-2 w-96 bg-slate-900/95 backdrop-blur-xl border border-slate-700/50 rounded-xl shadow-2xl z-50">
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

                <div className="h-8 w-px bg-slate-700/50"></div>

                <div className="relative profile-menu-container">
                  <button
                    onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                    className="flex items-center gap-3 p-1.5 pr-3 hover:bg-slate-800/50 rounded-xl transition-colors"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">ST</span>
                    </div>
                    <div className="hidden sm:block text-left">
                      <p className="text-sm font-medium text-white">Sheriff Thompson</p>
                      <p className="text-xs text-slate-400">Administrator</p>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-slate-400 hidden sm:block transition-transform ${profileMenuOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {profileMenuOpen && (
                    <div className="absolute right-0 top-full mt-2 w-56 bg-slate-900/95 backdrop-blur-xl border border-slate-700/50 rounded-xl shadow-2xl z-50 py-2">
                      <div className="px-4 py-3 border-b border-slate-700/50">
                        <p className="text-sm font-medium text-white">Sheriff Thompson</p>
                        <p className="text-xs text-slate-400">sheriff.thompson@gcso.gov</p>
                      </div>
                      <div className="py-1">
                        <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-300 hover:bg-slate-800/50 transition-colors">
                          <User className="w-4 h-4" />
                          View Profile
                        </button>
                        <button
                          onClick={() => navigate('/command/settings')}
                          className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-300 hover:bg-slate-800/50 transition-colors"
                        >
                          <Settings className="w-4 h-4" />
                          Settings
                        </button>
                      </div>
                      <div className="border-t border-slate-700/50 py-1">
                        <button
                          onClick={() => setLogoutConfirmOpen(true)}
                          className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-400 hover:bg-slate-800/50 transition-colors"
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
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <div className="max-w-7xl mx-auto">
            {/* Enhanced Page Header with KPI Metrics */}
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 mb-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-2xl lg:text-3xl font-bold text-white">Reports & Compliance</h2>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 bg-green-500/20 border border-green-500/40 rounded-lg">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-xs font-bold text-green-400">LIVE DATA</span>
                  </div>
                </div>
                <p className="text-slate-400 text-sm mb-3">Enterprise-grade insights and performance intelligence</p>

                {/* YTD Performance At-a-Glance */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                    <Phone className="w-4 h-4 text-blue-400" />
                    <span className="text-slate-400">YTD:</span>
                    <span className="font-bold text-blue-400">{keyMetrics.callsForService.total.toLocaleString()} calls</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 border border-green-500/30 rounded-lg">
                    <Clock className="w-4 h-4 text-green-400" />
                    <span className="text-slate-400">Avg Response:</span>
                    <span className="font-bold text-green-400">{keyMetrics.responseTime.average} min</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                    <CheckCircle className="w-4 h-4 text-purple-400" />
                    <span className="text-slate-400">Clearance:</span>
                    <span className="font-bold text-purple-400">{keyMetrics.crimeClearanceRate.rate}%</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-500/10 border border-amber-500/30 rounded-lg">
                    <Users className="w-4 h-4 text-amber-400" />
                    <span className="text-slate-400">Staffing:</span>
                    <span className="font-bold text-amber-400">{keyMetrics.staffing.percentage}%</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 flex-wrap">
                <select
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="px-3 py-2 bg-slate-800/40 border border-slate-700/50 rounded-xl text-white text-sm focus:outline-none focus:border-amber-500/50"
                >
                  <option value="ytd">Year to Date</option>
                  <option value="last30">Last 30 Days</option>
                  <option value="last90">Last 90 Days</option>
                  <option value="thisMonth">This Month</option>
                  <option value="lastMonth">Last Month</option>
                  <option value="q4">This Quarter</option>
                  <option value="lastQuarter">Last Quarter</option>
                  <option value="fy2024">Fiscal Year 2024</option>
                  <option value="fy2023">Fiscal Year 2023</option>
                  <option value="custom">Custom Date Range...</option>
                </select>
                <button
                  onClick={() => setComparisonModal(true)}
                  className="hidden md:flex items-center gap-2 px-3 py-2 bg-slate-800/40 border border-slate-700/50 rounded-xl text-slate-300 hover:bg-slate-800/60 transition-all"
                >
                  <BarChart3 className="w-4 h-4" />
                  <span className="text-sm">Compare</span>
                </button>
                <button
                  onClick={() => setCustomReportModal(true)}
                  className="hidden md:flex items-center gap-2 px-3 py-2 bg-purple-500/20 border border-purple-500/30 rounded-xl text-purple-300 hover:bg-purple-500/30 transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span className="text-sm">Custom Report</span>
                </button>
                <button
                  onClick={() => setExportModal(true)}
                  className="flex items-center gap-2 px-3 py-2 bg-slate-800/40 border border-slate-700/50 rounded-xl text-slate-300 hover:bg-slate-800/60 transition-all"
                >
                  <FileSpreadsheet className="w-4 h-4" />
                  <span className="hidden sm:inline text-sm">Excel</span>
                </button>
                <button
                  onClick={() => setScheduleModal(true)}
                  className="hidden lg:flex items-center gap-2 px-3 py-2 bg-slate-800/40 border border-slate-700/50 rounded-xl text-slate-300 hover:bg-slate-800/60 transition-all"
                >
                  <CalendarClock className="w-4 h-4" />
                  <span className="text-sm">Schedule</span>
                </button>
                <button
                  className="flex items-center gap-2 px-3 py-2 bg-amber-500/20 border border-amber-500/30 rounded-xl text-amber-300 hover:bg-amber-500/30 transition-all"
                >
                  <Printer className="w-4 h-4" />
                  <span className="hidden sm:inline text-sm">Print</span>
                </button>
              </div>
            </div>

            {/* Enhanced AI Analytics Intelligence - 3 Column Grid */}
            <div className="mb-6 bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-500/20 rounded-xl overflow-hidden">
              <div className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Bot className="w-6 h-6 text-purple-400" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-white flex items-center gap-2">
                        AI Analytics Intelligence
                      </h4>
                      <div className="flex items-center gap-3 text-xs text-slate-400">
                        <span className="flex items-center gap-1.5">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                          <span className="text-green-400 font-medium">LIVE</span>
                        </span>
                        <span>Last updated: 4:23 PM</span>
                        <span>Auto-refresh: Every 15 min</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setAiInsightsExpanded(!aiInsightsExpanded)}
                    className="px-3 py-1.5 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 text-purple-400 rounded-lg text-xs font-medium transition-all"
                  >
                    {aiInsightsExpanded ? 'COLLAPSE' : 'EXPAND'}
                  </button>
                </div>

                {aiInsightsExpanded && (
                  <div className="space-y-4">
                    {/* Performance Highlights Summary */}
                    <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <TrendingUp className="w-4 h-4 text-green-400" />
                        <h5 className="text-sm font-bold text-green-400">PERFORMANCE HIGHLIGHTS</h5>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                        <div className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                          <p className="text-slate-300"><span className="font-bold text-green-400">Response times improved 12.3%</span> this month - excellent progress toward 8-minute target</p>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                          <p className="text-slate-300"><span className="font-bold text-blue-400">Crime clearance rate</span> at 68.5%, up 3.8% YoY - investigations performing well</p>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                          <p className="text-slate-300"><span className="font-bold text-amber-400">Property crime down 5.8%</span> - community policing initiatives showing impact</p>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                          <p className="text-slate-300"><span className="font-bold text-purple-400">Overtime costs decreased 8.5%</span> - efficient scheduling reducing budget pressure</p>
                        </div>
                      </div>
                    </div>

                    {/* Detailed Analytics - 4 Column Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                      {/* Performance Improvements */}
                      <div className="bg-slate-900/40 rounded-lg p-4 border border-slate-700/30">
                        <div className="flex items-center gap-2 mb-3">
                          <TrendingUp className="w-4 h-4 text-green-400" />
                          <p className="text-xs font-bold text-green-400">PERFORMANCE</p>
                        </div>
                        <div className="space-y-2 text-xs text-slate-300">
                          <div className="flex justify-between">
                            <span>Patrol response:</span>
                            <span className="font-bold text-white">7.8 min <span className="text-green-400">(↓0.6)</span></span>
                          </div>
                          <div className="flex justify-between">
                            <span>Case closure:</span>
                            <span className="font-bold text-white">82.3% <span className="text-green-400">(↑4.1%)</span></span>
                          </div>
                          <div className="flex justify-between">
                            <span>Training complete:</span>
                            <span className="font-bold text-white">94% <span className="text-green-400">(↑8%)</span></span>
                          </div>
                        </div>
                      </div>

                      {/* Areas Requiring Attention */}
                      <div className="bg-slate-900/40 rounded-lg p-4 border border-amber-500/30">
                        <div className="flex items-center gap-2 mb-3">
                          <AlertTriangle className="w-4 h-4 text-amber-400" />
                          <p className="text-xs font-bold text-amber-400">ATTENTION NEEDED</p>
                        </div>
                        <div className="space-y-2 text-xs text-slate-300">
                          <div className="flex justify-between">
                            <span>Staffing level:</span>
                            <span className="font-bold text-amber-400">92.1% (14 open)</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Certs expiring:</span>
                            <span className="font-bold text-amber-400">45 in 30 days</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Equipment budget:</span>
                            <span className="font-bold text-red-400">95% utilized</span>
                          </div>
                        </div>
                      </div>

                      {/* Budget Insights */}
                      <div className="bg-slate-900/40 rounded-lg p-4 border border-slate-700/30">
                        <div className="flex items-center gap-2 mb-3">
                          <DollarSign className="w-4 h-4 text-blue-400" />
                          <p className="text-xs font-bold text-blue-400">BUDGET INSIGHTS</p>
                        </div>
                        <div className="space-y-2 text-xs text-slate-300">
                          <div className="flex justify-between">
                            <span>YTD spending:</span>
                            <span className="font-bold text-white">85% of budget</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Year-end proj:</span>
                            <span className="font-bold text-amber-400">100.5%</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Recommend:</span>
                            <span className="font-bold text-blue-400">$250K realloc</span>
                          </div>
                        </div>
                      </div>

                      {/* Recommendations */}
                      <div className="bg-slate-900/40 rounded-lg p-4 border border-slate-700/30">
                        <div className="flex items-center gap-2 mb-3">
                          <Lightbulb className="w-4 h-4 text-purple-400" />
                          <p className="text-xs font-bold text-purple-400">RECOMMENDATIONS</p>
                        </div>
                        <div className="space-y-2 text-xs text-slate-300">
                          <div className="flex items-start gap-1.5">
                            <span className="text-purple-400 mt-0.5">•</span>
                            <span>Focus hiring on patrol division</span>
                          </div>
                          <div className="flex items-start gap-1.5">
                            <span className="text-purple-400 mt-0.5">•</span>
                            <span>Schedule cert training Q1 2025</span>
                          </div>
                          <div className="flex items-start gap-1.5">
                            <span className="text-purple-400 mt-0.5">•</span>
                            <span>Review fleet replacement</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      <button className="flex items-center gap-2 px-3 py-1.5 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 text-blue-400 rounded-lg text-xs font-medium transition-all">
                        <Eye className="w-3.5 h-3.5" />
                        VIEW FULL ANALYSIS
                      </button>
                      <button className="flex items-center gap-2 px-3 py-1.5 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 text-purple-400 rounded-lg text-xs font-medium transition-all">
                        <Download className="w-3.5 h-3.5" />
                        EXPORT INSIGHTS
                      </button>
                      <button
                        onClick={() => setComparisonModal(true)}
                        className="flex items-center gap-2 px-3 py-1.5 bg-green-500/20 hover:bg-green-500/30 border border-green-500/30 text-green-400 rounded-lg text-xs font-medium transition-all"
                      >
                        <BarChart3 className="w-3.5 h-3.5" />
                        COMPARE PERIODS
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Tabs */}
            <div className="mb-6 flex gap-2 border-b border-slate-700/50 overflow-x-auto">
              {[
                { id: 'overview', label: 'Overview', icon: Zap },
                { id: 'operations', label: 'Operations', icon: Activity },
                { id: 'crime', label: 'Crime Stats', icon: Target },
                { id: 'reports', label: 'Reports Library', icon: BookOpen }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-all relative whitespace-nowrap ${
                    activeTab === tab.id ? 'text-amber-400' : 'text-slate-400 hover:text-slate-300'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                  {activeTab === tab.id && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500"></div>
                  )}
                </button>
              ))}
            </div>

            {/* OVERVIEW TAB */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Enhanced Key Metrics Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* Calls for Service Card */}
                  <div className="bg-slate-800/40 border border-blue-500/30 rounded-xl p-5">
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
                        <Phone className="w-5 h-5 text-blue-400" />
                      </div>
                      <span className="text-xs font-medium text-blue-400">CALLS FOR SERVICE</span>
                    </div>
                    <p className="text-2xl font-bold text-white mb-1">{keyMetrics.callsForService.total.toLocaleString()}</p>
                    <p className="text-sm text-slate-400 mb-3">Year to Date (Jan 1 - Jan 21, 2026)</p>
                    <div className="space-y-1.5 border-t border-slate-700/50 pt-3">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Trend vs 2025:</span>
                        <span className={`font-bold flex items-center gap-1 ${getChangeColor(keyMetrics.callsForService.change)}`}>
                          {getChangeIcon(keyMetrics.callsForService.change)}
                          {Math.abs(keyMetrics.callsForService.change)}%
                        </span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Avg per day:</span>
                        <span className="font-medium text-white">6,936 calls</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Peak hours:</span>
                        <span className="font-medium text-white">1400-1800 hrs</span>
                      </div>
                    </div>
                  </div>

                  {/* Avg Response Time Card */}
                  <div className="bg-slate-800/40 border border-green-500/30 rounded-xl p-5">
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center">
                        <Clock className="w-5 h-5 text-green-400" />
                      </div>
                      <span className="text-xs font-medium text-green-400">AVG RESPONSE TIME</span>
                    </div>
                    <p className="text-2xl font-bold text-white mb-1">{keyMetrics.responseTime.average} min</p>
                    <p className="text-sm text-slate-400 mb-3">All priorities combined</p>
                    <div className="mb-3">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-400">Target: {keyMetrics.responseTime.target} min</span>
                        <span className="font-bold text-green-400">0.4 min above</span>
                      </div>
                      <div className="w-full h-2 bg-slate-700/50 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500" style={{ width: '95%' }} />
                      </div>
                    </div>
                    <div className="space-y-1.5 border-t border-slate-700/50 pt-3">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">P1 (Emergency):</span>
                        <span className="font-medium text-green-400">3.2 min <CheckCircle className="w-3 h-3 inline" /></span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">P2 (Urgent):</span>
                        <span className="font-medium text-green-400">7.8 min <CheckCircle className="w-3 h-3 inline" /></span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">P3 (Routine):</span>
                        <span className="font-medium text-green-400">18.4 min <CheckCircle className="w-3 h-3 inline" /></span>
                      </div>
                    </div>
                  </div>

                  {/* Crime Clearance Rate Card */}
                  <div className="bg-slate-800/40 border border-purple-500/30 rounded-xl p-5">
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-purple-400" />
                      </div>
                      <span className="text-xs font-medium text-purple-400">CLEARANCE RATE</span>
                    </div>
                    <p className="text-2xl font-bold text-white mb-1">{keyMetrics.crimeClearanceRate.rate}%</p>
                    <p className="text-sm text-slate-400 mb-3">Cases closed/solved vs total</p>
                    <div className="mb-3">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-400">Target: {keyMetrics.crimeClearanceRate.target}%</span>
                        <span className="font-bold text-amber-400">1.5 pts below</span>
                      </div>
                      <div className="w-full h-2 bg-slate-700/50 rounded-full overflow-hidden">
                        <div className="h-full bg-purple-500" style={{ width: '97.9%' }} />
                      </div>
                    </div>
                    <div className="space-y-1.5 border-t border-slate-700/50 pt-3">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Violent crimes:</span>
                        <span className="font-medium text-green-400">82.1% <CheckCircle className="w-3 h-3 inline" /></span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Property crimes:</span>
                        <span className="font-medium text-amber-400">56.8%</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">YoY change:</span>
                        <span className="font-medium text-green-400 flex items-center gap-1">
                          <ArrowUpRight className="w-3 h-3" />+3.8 pts
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Arrests Card */}
                  <div className="bg-slate-800/40 border border-amber-500/30 rounded-xl p-5">
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 bg-amber-500/20 rounded-xl flex items-center justify-center">
                        <ShieldCheck className="w-5 h-5 text-amber-400" />
                      </div>
                      <span className="text-xs font-medium text-amber-400">ARRESTS (YTD)</span>
                    </div>
                    <p className="text-2xl font-bold text-white mb-1">{keyMetrics.arrestsYTD.total.toLocaleString()}</p>
                    <p className="text-sm text-slate-400 mb-3">Jan 1 - Jan 21, 2026</p>
                    <div className="space-y-1.5 border-t border-slate-700/50 pt-3">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Trend vs 2025:</span>
                        <span className="font-bold text-green-400 flex items-center gap-1">
                          <ArrowDownRight className="w-3 h-3" />-2.1% (fewer crimes)
                        </span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Felony:</span>
                        <span className="font-medium text-white">3,487 (28%)</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Prosecution rate:</span>
                        <span className="font-medium text-green-400">87.4% <CheckCircle className="w-3 h-3 inline" /></span>
                      </div>
                    </div>
                  </div>

                  {/* Staffing Level Card */}
                  <div className="bg-slate-800/40 border border-blue-500/30 rounded-xl p-5">
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
                        <Users className="w-5 h-5 text-blue-400" />
                      </div>
                      <span className="text-xs font-medium text-blue-400">STAFFING LEVEL</span>
                    </div>
                    <p className="text-2xl font-bold text-white mb-1">{keyMetrics.staffing.percentage}%</p>
                    <p className="text-sm text-slate-400 mb-3">{keyMetrics.staffing.current} / {keyMetrics.staffing.authorized} positions</p>
                    <div className="mb-3">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-400">Target: 95% (169 pos)</span>
                        <span className="font-bold text-amber-400">-5 positions</span>
                      </div>
                      <div className="w-full h-2 bg-slate-700/50 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500" style={{ width: `${keyMetrics.staffing.percentage}%` }} />
                      </div>
                    </div>
                    <div className="space-y-1.5 border-t border-slate-700/50 pt-3">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Vacancies:</span>
                        <span className="font-medium text-amber-400">14 open positions</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Pipeline:</span>
                        <span className="font-medium text-white">12 candidates</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Vacancy OT cost:</span>
                        <span className="font-medium text-red-400">$588K/year</span>
                      </div>
                    </div>
                  </div>

                  {/* Overtime Cost Card */}
                  <div className="bg-slate-800/40 border border-green-500/30 rounded-xl p-5">
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center">
                        <DollarSign className="w-5 h-5 text-green-400" />
                      </div>
                      <span className="text-xs font-medium text-green-400">OVERTIME COST</span>
                    </div>
                    <p className="text-2xl font-bold text-white mb-1">${(keyMetrics.overtime.cost / 1000000).toFixed(1)}M</p>
                    <p className="text-sm text-slate-400 mb-3">{keyMetrics.overtime.hours.toLocaleString()} hours YTD</p>
                    <div className="mb-3">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-400">Target: &lt;10% of budget</span>
                        <span className="font-bold text-green-400">8.9% <CheckCircle className="w-3 h-3 inline" /></span>
                      </div>
                      <div className="w-full h-2 bg-slate-700/50 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500" style={{ width: '89%' }} />
                      </div>
                    </div>
                    <div className="space-y-1.5 border-t border-slate-700/50 pt-3">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">YoY change:</span>
                        <span className="font-medium text-green-400 flex items-center gap-1">
                          <ArrowDownRight className="w-3 h-3" />-8.5% ($110K saved)
                        </span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Shift coverage:</span>
                        <span className="font-medium text-white">54% of OT</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">vs National avg:</span>
                        <span className="font-medium text-green-400">12-26% below</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Enhanced Monthly Trends */}
                <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-blue-400" />
                      <h3 className="text-lg font-semibold text-white">Monthly Trends</h3>
                      <span className="text-xs text-slate-400">(Last 12 Months - Rolling)</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded">Click for details</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {monthlyTrends.map((month, idx) => {
                      const prevMonth = idx > 0 ? monthlyTrends[idx - 1] : null;
                      const callsChange = prevMonth ? ((month.calls - prevMonth.calls) / prevMonth.calls * 100).toFixed(1) : 0;
                      return (
                        <div key={idx} className="hover:bg-slate-900/30 rounded-lg p-2 -mx-2 cursor-pointer transition-colors">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-3">
                              <span className="text-sm font-medium text-white w-8">{month.month}</span>
                              {idx === monthlyTrends.length - 1 && (
                                <span className="text-xs px-1.5 py-0.5 bg-amber-500/20 text-amber-400 rounded">Current</span>
                              )}
                            </div>
                            <div className="flex items-center gap-6 text-xs">
                              <div className="flex items-center gap-2">
                                <Phone className="w-3 h-3 text-slate-400" />
                                <span className="text-slate-400">Calls:</span>
                                <span className="font-bold text-white">{month.calls.toLocaleString()}</span>
                                {prevMonth && (
                                  <span className={`font-medium ${parseFloat(callsChange) >= 0 ? 'text-amber-400' : 'text-green-400'}`}>
                                    ({parseFloat(callsChange) >= 0 ? '+' : ''}{callsChange}%)
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center gap-2">
                                <ShieldCheck className="w-3 h-3 text-blue-400" />
                                <span className="text-slate-400">Arrests:</span>
                                <span className="font-bold text-blue-400">{month.arrests.toLocaleString()}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <CheckCircle className="w-3 h-3 text-green-400" />
                                <span className="text-slate-400">Clear:</span>
                                <span className={`font-bold ${month.clearance >= 68 ? 'text-green-400' : 'text-amber-400'}`}>{month.clearance}%</span>
                              </div>
                            </div>
                          </div>
                          <div className="w-full h-2 bg-slate-700/50 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-blue-500 to-green-500" style={{ width: `${(month.clearance / 100) * 100}%` }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Seasonal Patterns Summary */}
                  <div className="mt-4 pt-4 border-t border-slate-700/50">
                    <h4 className="text-sm font-semibold text-white mb-3">Seasonal Patterns Identified</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                      <div className="bg-slate-900/40 rounded-lg p-3">
                        <p className="text-slate-400 mb-1">Summer Peak (Jun-Aug)</p>
                        <p className="font-bold text-white">14,782 calls/mo</p>
                        <p className="text-amber-400">+18% vs winter</p>
                      </div>
                      <div className="bg-slate-900/40 rounded-lg p-3">
                        <p className="text-slate-400 mb-1">Winter Low (Nov-Feb)</p>
                        <p className="font-bold text-white">12,404 calls/mo</p>
                        <p className="text-green-400">Lowest volume</p>
                      </div>
                      <div className="bg-slate-900/40 rounded-lg p-3">
                        <p className="text-slate-400 mb-1">YoY Total 2025</p>
                        <p className="font-bold text-white">157,423 calls</p>
                        <p className="text-green-400">+5.0% vs 2024</p>
                      </div>
                      <div className="bg-slate-900/40 rounded-lg p-3">
                        <p className="text-slate-400 mb-1">Best Clearance</p>
                        <p className="font-bold text-white">July - 69.5%</p>
                        <p className="text-green-400">Peak performance</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* OPERATIONS TAB */}
            {activeTab === 'operations' && (
              <div className="space-y-6">
                <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Division Performance</h3>
                  <div className="space-y-4">
                    {divisionPerformance.map((division, idx) => (
                      <div key={idx} className="bg-slate-900/50 rounded-xl p-5">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="text-base font-semibold text-white">{division.name}</h4>
                          <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                            division.efficiency >= 90 ? 'bg-green-500/20 text-green-400' :
                            division.efficiency >= 85 ? 'bg-amber-500/20 text-amber-400' : 'bg-red-500/20 text-red-400'
                          }`}>
                            {division.efficiency}% Efficiency
                          </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {division.calls > 0 && (
                            <div>
                              <p className="text-xs text-slate-400 mb-1">Calls</p>
                              <p className="text-lg font-bold text-white">{division.calls.toLocaleString()}</p>
                            </div>
                          )}
                          {division.responseTime > 0 && (
                            <div>
                              <p className="text-xs text-slate-400 mb-1">Response Time</p>
                              <p className="text-lg font-bold text-white">{division.responseTime} min</p>
                            </div>
                          )}
                          {division.clearanceRate > 0 && (
                            <div>
                              <p className="text-xs text-slate-400 mb-1">Clearance Rate</p>
                              <p className="text-lg font-bold text-white">{division.clearanceRate}%</p>
                            </div>
                          )}
                          <div>
                            <p className="text-xs text-slate-400 mb-1">Staffing</p>
                            <p className="text-lg font-bold text-white">{division.staffing}%</p>
                          </div>
                          {division.inmates && (
                            <>
                              <div>
                                <p className="text-xs text-slate-400 mb-1">Inmates</p>
                                <p className="text-lg font-bold text-white">{division.inmates}</p>
                              </div>
                              <div>
                                <p className="text-xs text-slate-400 mb-1">Capacity</p>
                                <p className="text-lg font-bold text-white">{division.capacity}</p>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* CRIME STATS TAB */}
            {activeTab === 'crime' && (
              <div className="space-y-6">
                <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-slate-900/50 border-b border-slate-700/50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Category</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Incidents</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">YoY Change</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Arrests</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Clearance Rate</th>
                        </tr>
                      </thead>
                      <tbody>
                        {crimeStats.map((stat, idx) => (
                          <tr key={idx} className="border-b border-slate-800/30 hover:bg-slate-800/30 transition-colors">
                            <td className="px-4 py-4">
                              <p className="text-sm font-medium text-white">{stat.category}</p>
                            </td>
                            <td className="px-4 py-4">
                              <p className="text-sm text-slate-300">{stat.incidents.toLocaleString()}</p>
                            </td>
                            <td className="px-4 py-4">
                              <div className={`flex items-center gap-1 ${getChangeColor(stat.change)}`}>
                                {getChangeIcon(stat.change)}
                                <span className="text-sm font-bold">{Math.abs(stat.change)}%</span>
                              </div>
                            </td>
                            <td className="px-4 py-4">
                              <p className="text-sm text-slate-300">{stat.arrests.toLocaleString()}</p>
                            </td>
                            <td className="px-4 py-4">
                              <div className="flex items-center gap-3">
                                <span className={`text-sm font-bold ${
                                  stat.clearance >= 80 ? 'text-green-400' :
                                  stat.clearance >= 65 ? 'text-amber-400' : 'text-red-400'
                                }`}>{stat.clearance}%</span>
                                <div className="flex-1 h-2 bg-slate-700/50 rounded-full overflow-hidden max-w-[100px]">
                                  <div className={`h-full ${
                                    stat.clearance >= 80 ? 'bg-green-500' :
                                    stat.clearance >= 65 ? 'bg-amber-500' : 'bg-red-500'
                                  }`} style={{ width: `${stat.clearance}%` }} />
                                </div>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* REPORTS LIBRARY TAB */}
            {activeTab === 'reports' && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                    <input
                      type="text"
                      placeholder="Search reports..."
                      className="w-full pl-12 pr-4 py-2.5 bg-slate-800/40 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50"
                    />
                  </div>
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="px-4 py-2.5 bg-slate-800/40 border border-slate-700/50 rounded-xl text-white text-sm focus:outline-none focus:border-amber-500/50 cursor-pointer"
                  >
                    <option value="all">All Categories</option>
                    <option value="Executive">Executive</option>
                    <option value="Operations">Operations</option>
                    <option value="HR">HR</option>
                    <option value="Finance">Finance</option>
                    <option value="Training">Training</option>
                    <option value="Support">Support</option>
                    <option value="Community">Community</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredReports.map(report => {
                    const Icon = report.icon;
                    return (
                      <div key={report.id} className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-5 hover:border-slate-600/50 transition-all group">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-blue-500/30 transition-colors">
                            <Icon className="w-6 h-6 text-blue-400" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-1">
                              <h4 className="text-base font-semibold text-white">{report.name}</h4>
                              <div className="flex items-center gap-1">
                                {report.scheduled && (
                                  <div className="px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded-full flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    Auto
                                  </div>
                                )}
                              </div>
                            </div>
                            <p className="text-sm text-slate-400 mb-3">{report.description}</p>
                            <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {report.frequency}
                              </span>
                              <span className="flex items-center gap-1">
                                <Eye className="w-3 h-3" />
                                {report.views} views
                              </span>
                              <span className="flex items-center gap-1">
                                <Download className="w-3 h-3" />
                                {report.downloads}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <button
                                onClick={() => setReportDetailModal(report)}
                                className="flex items-center gap-2 px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-xs font-medium transition-all"
                              >
                                <Eye className="w-3 h-3" />
                                View Details
                              </button>
                              <button className="flex items-center gap-2 px-3 py-1.5 bg-slate-700/40 hover:bg-slate-700/60 border border-slate-600/50 text-white rounded-lg text-xs font-medium transition-all">
                                <Download className="w-3 h-3" />
                                Download
                              </button>
                              <button className="flex items-center gap-2 px-3 py-1.5 bg-slate-700/40 hover:bg-slate-700/60 border border-slate-600/50 text-white rounded-lg text-xs font-medium transition-all">
                                <RefreshCw className="w-3 h-3" />
                                Generate
                              </button>
                              {!report.scheduled && (
                                <button
                                  onClick={() => setScheduleModal(report)}
                                  className="flex items-center gap-2 px-3 py-1.5 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 text-purple-300 rounded-lg text-xs font-medium transition-all"
                                >
                                  <PlayCircle className="w-3 h-3" />
                                  Schedule
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

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
                <h3 className="text-sm font-semibold text-white">Analytics AI Assistant</h3>
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
                  <p className="text-sm text-slate-200">Hi! I can help you analyze trends, generate custom reports, compare metrics, identify patterns, and answer questions about performance data. What would you like to explore?</p>
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 border-t border-slate-700/50">
            <div className="flex items-center gap-2">
              <input type="text" placeholder="Ask about analytics..." className="flex-1 px-4 py-2 bg-slate-800/40 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50" />
              <button className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
                <Send className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Report Detail Modal */}
      {reportDetailModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setReportDetailModal(null)}
          />
          <div className="relative bg-slate-900 border border-slate-700/50 rounded-2xl p-6 max-w-3xl w-full shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-blue-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <reportDetailModal.icon className="w-7 h-7 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-1">{reportDetailModal.name}</h3>
                  <p className="text-sm text-slate-400">{reportDetailModal.description}</p>
                </div>
              </div>
              <button
                onClick={() => setReportDetailModal(null)}
                className="p-2 hover:bg-slate-800/50 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-slate-800/40 rounded-xl p-4">
                <p className="text-xs text-slate-400 mb-1">Category</p>
                <p className="text-sm font-semibold text-white">{reportDetailModal.category}</p>
              </div>
              <div className="bg-slate-800/40 rounded-xl p-4">
                <p className="text-xs text-slate-400 mb-1">Frequency</p>
                <p className="text-sm font-semibold text-white">{reportDetailModal.frequency}</p>
              </div>
              <div className="bg-slate-800/40 rounded-xl p-4">
                <p className="text-xs text-slate-400 mb-1">File Size</p>
                <p className="text-sm font-semibold text-white">{reportDetailModal.fileSize}</p>
              </div>
              <div className="bg-slate-800/40 rounded-xl p-4">
                <p className="text-xs text-slate-400 mb-1">Recipients</p>
                <p className="text-sm font-semibold text-white">{reportDetailModal.recipients} users</p>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-sm font-semibold text-white mb-3">Report Metrics</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="bg-slate-800/40 rounded-xl p-3 flex items-center gap-3">
                  <Eye className="w-5 h-5 text-blue-400" />
                  <div>
                    <p className="text-xs text-slate-400">Total Views</p>
                    <p className="text-lg font-bold text-white">{reportDetailModal.views}</p>
                  </div>
                </div>
                <div className="bg-slate-800/40 rounded-xl p-3 flex items-center gap-3">
                  <Download className="w-5 h-5 text-green-400" />
                  <div>
                    <p className="text-xs text-slate-400">Downloads</p>
                    <p className="text-lg font-bold text-white">{reportDetailModal.downloads}</p>
                  </div>
                </div>
                <div className="bg-slate-800/40 rounded-xl p-3 flex items-center gap-3">
                  <Clock className="w-5 h-5 text-amber-400" />
                  <div>
                    <p className="text-xs text-slate-400">Last Generated</p>
                    <p className="text-sm font-semibold text-white">
                      {new Date(reportDetailModal.lastGenerated).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-sm font-semibold text-white mb-3">Data Points Included</h4>
              <div className="flex flex-wrap gap-2">
                {reportDetailModal.dataPoints.map((point, idx) => (
                  <span key={idx} className="px-3 py-1.5 bg-slate-800/40 border border-slate-700/50 rounded-lg text-xs text-slate-300">
                    {point}
                  </span>
                ))}
              </div>
            </div>

            {reportDetailModal.scheduled && reportDetailModal.nextScheduled && (
              <div className="mb-6 bg-green-500/10 border border-green-500/20 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                  <h4 className="text-sm font-semibold text-green-400">Scheduled Report</h4>
                </div>
                <p className="text-sm text-slate-300">
                  Next generation scheduled for{' '}
                  <span className="font-bold text-white">
                    {new Date(reportDetailModal.nextScheduled).toLocaleDateString()}
                  </span>
                </p>
              </div>
            )}

            <div className="flex gap-3">
              <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-medium transition-all">
                <Download className="w-4 h-4" />
                Download Report
              </button>
              <button className="flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-800/40 hover:bg-slate-800/60 border border-slate-700/50 text-white rounded-xl font-medium transition-all">
                <RefreshCw className="w-4 h-4" />
                Regenerate
              </button>
              <button
                onClick={() => {
                  setReportDetailModal(null);
                  setScheduleModal(reportDetailModal);
                }}
                className="flex items-center justify-center gap-2 px-4 py-2.5 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 text-purple-300 rounded-xl font-medium transition-all"
              >
                <Calendar className="w-4 h-4" />
                Schedule
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Export Modal */}
      {exportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setExportModal(false)}
          />
          <div className="relative bg-slate-900 border border-slate-700/50 rounded-2xl p-6 max-w-lg w-full shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white">Export Analytics Data</h3>
              <button
                onClick={() => setExportModal(false)}
                className="p-2 hover:bg-slate-800/50 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-white mb-2">Export Format</label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { format: 'PDF', icon: FileText, desc: 'Formatted report' },
                    { format: 'Excel', icon: FileSpreadsheet, desc: 'Data spreadsheet' },
                    { format: 'CSV', icon: FileDown, desc: 'Raw data' },
                    { format: 'JSON', icon: FileDown, desc: 'API format' }
                  ].map((option) => (
                    <button
                      key={option.format}
                      className="flex items-center gap-3 p-3 bg-slate-800/40 border border-slate-700/50 rounded-xl hover:bg-slate-800/60 hover:border-amber-500/50 transition-all group"
                    >
                      <option.icon className="w-5 h-5 text-slate-400 group-hover:text-amber-400" />
                      <div className="text-left">
                        <p className="text-sm font-medium text-white">{option.format}</p>
                        <p className="text-xs text-slate-400">{option.desc}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">Time Range</label>
                <select className="w-full px-4 py-2.5 bg-slate-800/40 border border-slate-700/50 rounded-xl text-white focus:outline-none focus:border-amber-500/50">
                  <option>Year to Date</option>
                  <option>Last Quarter</option>
                  <option>Last Month</option>
                  <option>Last Week</option>
                  <option>Custom Range...</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">Include</label>
                <div className="space-y-2">
                  {['Summary Statistics', 'Detailed Metrics', 'Charts & Graphs', 'Trend Analysis', 'Recommendations'].map((item) => (
                    <label key={item} className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-slate-700 bg-slate-800 text-amber-500" />
                      <span className="text-sm text-slate-300">{item}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setExportModal(false)}
                className="flex-1 px-4 py-2.5 bg-slate-800/40 hover:bg-slate-800/60 border border-slate-700/50 rounded-xl text-white font-medium transition-all"
              >
                Cancel
              </button>
              <button className="flex-1 px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-medium transition-all flex items-center justify-center gap-2">
                <Download className="w-4 h-4" />
                Export Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Schedule Modal */}
      {scheduleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setScheduleModal(false)}
          />
          <div className="relative bg-slate-900 border border-slate-700/50 rounded-2xl p-6 max-w-lg w-full shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white">Schedule Report</h3>
              <button
                onClick={() => setScheduleModal(false)}
                className="p-2 hover:bg-slate-800/50 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-white mb-2">Report Name</label>
                <input
                  type="text"
                  value={scheduleModal.name || ''}
                  readOnly
                  className="w-full px-4 py-2.5 bg-slate-800/40 border border-slate-700/50 rounded-xl text-white focus:outline-none focus:border-amber-500/50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">Frequency</label>
                <select className="w-full px-4 py-2.5 bg-slate-800/40 border border-slate-700/50 rounded-xl text-white focus:outline-none focus:border-amber-500/50">
                  <option>Daily</option>
                  <option>Weekly</option>
                  <option>Bi-Weekly</option>
                  <option>Monthly</option>
                  <option>Quarterly</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">Start Date</label>
                <input
                  type="date"
                  className="w-full px-4 py-2.5 bg-slate-800/40 border border-slate-700/50 rounded-xl text-white focus:outline-none focus:border-amber-500/50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">Recipients (Email)</label>
                <textarea
                  placeholder="Enter email addresses separated by commas..."
                  rows="3"
                  className="w-full px-4 py-2.5 bg-slate-800/40 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-slate-700 bg-slate-800 text-amber-500" />
                  <span className="text-sm text-slate-300">Automatically generate and send report</span>
                </label>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setScheduleModal(false)}
                className="flex-1 px-4 py-2.5 bg-slate-800/40 hover:bg-slate-800/60 border border-slate-700/50 rounded-xl text-white font-medium transition-all"
              >
                Cancel
              </button>
              <button className="flex-1 px-4 py-2.5 bg-purple-500 hover:bg-purple-600 text-white rounded-xl font-medium transition-all flex items-center justify-center gap-2">
                <PlayCircle className="w-4 h-4" />
                Activate Schedule
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Custom Report Modal */}
      {customReportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setCustomReportModal(false)}
          />
          <div className="relative bg-slate-900 border border-slate-700/50 rounded-2xl p-6 max-w-2xl w-full shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center">
                  <Plus className="w-5 h-5 text-purple-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">Custom Report Builder</h3>
              </div>
              <button
                onClick={() => setCustomReportModal(false)}
                className="p-2 hover:bg-slate-800/50 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-white mb-2">Report Name</label>
                <input
                  type="text"
                  placeholder="Enter custom report name..."
                  className="w-full px-4 py-2.5 bg-slate-800/40 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">Data Sources</label>
                <div className="grid grid-cols-2 gap-2">
                  {['Operations', 'Personnel', 'Budget', 'Crime Stats', 'Training', 'Fleet', 'Detention', 'Community'].map((source) => (
                    <label key={source} className="flex items-center gap-2 p-3 bg-slate-800/40 border border-slate-700/50 rounded-lg hover:bg-slate-800/60 cursor-pointer transition-colors">
                      <input type="checkbox" className="w-4 h-4 rounded border-slate-700 bg-slate-800 text-purple-500" />
                      <span className="text-sm text-slate-300">{source}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">Metrics to Include</label>
                <div className="space-y-2">
                  {['Trends & Patterns', 'Performance Indicators', 'Cost Analysis', 'Compliance Status', 'Predictive Analytics'].map((metric) => (
                    <label key={metric} className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-slate-700 bg-slate-800 text-purple-500" />
                      <span className="text-sm text-slate-300">{metric}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Time Range</label>
                  <select className="w-full px-4 py-2.5 bg-slate-800/40 border border-slate-700/50 rounded-xl text-white focus:outline-none focus:border-amber-500/50">
                    <option>Last 30 Days</option>
                    <option>Last Quarter</option>
                    <option>Year to Date</option>
                    <option>Custom...</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Output Format</label>
                  <select className="w-full px-4 py-2.5 bg-slate-800/40 border border-slate-700/50 rounded-xl text-white focus:outline-none focus:border-amber-500/50">
                    <option>PDF Report</option>
                    <option>Excel Workbook</option>
                    <option>Dashboard View</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setCustomReportModal(false)}
                className="flex-1 px-4 py-2.5 bg-slate-800/40 hover:bg-slate-800/60 border border-slate-700/50 rounded-xl text-white font-medium transition-all"
              >
                Cancel
              </button>
              <button className="flex-1 px-4 py-2.5 bg-purple-500 hover:bg-purple-600 text-white rounded-xl font-medium transition-all flex items-center justify-center gap-2">
                <Zap className="w-4 h-4" />
                Generate Report
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Comparison Modal */}
      {comparisonModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setComparisonModal(false)}
          />
          <div className="relative bg-slate-900 border border-slate-700/50 rounded-2xl p-6 max-w-4xl w-full shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">Performance Comparison</h3>
              </div>
              <button
                onClick={() => setComparisonModal(false)}
                className="p-2 hover:bg-slate-800/50 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <div className="mb-6">
              <div className="flex gap-2 mb-4">
                {[
                  { id: 'yoy', label: 'Year over Year' },
                  { id: 'mom', label: 'Month over Month' },
                  { id: 'qoq', label: 'Quarter over Quarter' }
                ].map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setSelectedComparison(option.id)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                      selectedComparison === option.id
                        ? 'bg-blue-500 text-white'
                        : 'bg-slate-800/40 text-slate-300 hover:bg-slate-800/60'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-slate-800/40 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-slate-400">Calls for Service</p>
                    <TrendingUp className="w-4 h-4 text-green-400" />
                  </div>
                  <p className="text-2xl font-bold text-white mb-1">+5.2%</p>
                  <p className="text-xs text-slate-500">145,678 vs 138,432</p>
                </div>
                <div className="bg-slate-800/40 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-slate-400">Response Time</p>
                    <TrendingDown className="w-4 h-4 text-green-400" />
                  </div>
                  <p className="text-2xl font-bold text-white mb-1">-12.3%</p>
                  <p className="text-xs text-slate-500">8.4 min vs 9.6 min</p>
                </div>
                <div className="bg-slate-800/40 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-slate-400">Clearance Rate</p>
                    <TrendingUp className="w-4 h-4 text-green-400" />
                  </div>
                  <p className="text-2xl font-bold text-white mb-1">+3.8%</p>
                  <p className="text-xs text-slate-500">68.5% vs 66.0%</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/40 rounded-xl p-4">
              <h4 className="text-sm font-semibold text-white mb-3">Division Comparison</h4>
              <div className="space-y-3">
                {[
                  { name: 'Patrol', current: 88, previous: 85, change: 3.5 },
                  { name: 'Investigations', current: 91, previous: 87, change: 4.6 },
                  { name: 'Detention', current: 87, previous: 89, change: -2.2 },
                  { name: 'Support Services', current: 85, previous: 83, change: 2.4 }
                ].map((div) => (
                  <div key={div.name} className="flex items-center gap-4">
                    <div className="w-32">
                      <p className="text-sm text-white font-medium">{div.name}</p>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-slate-700/50 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-blue-500 to-green-500" style={{ width: `${div.current}%` }} />
                        </div>
                        <span className="text-sm font-bold text-white w-12">{div.current}%</span>
                      </div>
                    </div>
                    <div className={`flex items-center gap-1 w-16 ${div.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {div.change >= 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                      <span className="text-sm font-bold">{Math.abs(div.change)}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setComparisonModal(false)}
                className="flex-1 px-4 py-2.5 bg-slate-800/40 hover:bg-slate-800/60 border border-slate-700/50 rounded-xl text-white font-medium transition-all"
              >
                Close
              </button>
              <button className="flex-1 px-4 py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-medium transition-all flex items-center justify-center gap-2">
                <Download className="w-4 h-4" />
                Export Comparison
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

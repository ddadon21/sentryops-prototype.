import React, { useState, useEffect } from 'react';
import {
  Clock,
  Printer,
  Download,
  RefreshCw,
  Shield,
  ChevronDown,
  ChevronUp,
  Phone,
  Radio,
  X,
  User,
  Building2,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';

export default function DailyCommandBrief() {
  const navigate = useNavigate();
  const [expandedItem, setExpandedItem] = useState(null);
  const [contactModal, setContactModal] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Live clock — matches Executive Command Dashboard pattern
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  };

  // Brief generation timestamp (snapshot mode — generated at 0600 daily)
  const briefGeneratedAt = '06:00';

  // System integrity data
  const systemIntegrity = {
    integrationsHealthy: true,
    failedFeeds: 0,
    staleModules: 0,
    lastSync: '2 min ago'
  };

  // Command Summary Data — with trend intelligence
  const summaryData = {
    criticalAlerts: { count: 3, trend: 'up', change: 1, yesterday: 2, sparkline: [1, 2, 1, 2, 3, 2, 3] },
    pendingApprovals: { count: 6, trend: 'down', change: 2, yesterday: 8, sparkline: [12, 10, 9, 8, 7, 8, 6] },
    staffingStatus: { division: 'Patrol', shift: 'B', percentage: 75, trend: 'down', change: 8, yesterday: 83, sparkline: [92, 88, 85, 83, 80, 83, 75] },
    complianceDeadline: { event: 'Federal audit', hoursUntil: 48, trend: 'down', change: 24, sparkline: [168, 144, 120, 96, 72, 60, 48] }
  };

  // Priority Items Data — with execution state and escalation tier
  const priorityItems = [
    {
      id: 'pri-001',
      rank: 1,
      severity: 'critical',
      title: 'H2-Pod HVAC Failure',
      description: 'Temperature 84°F, exceeds ACA maximum (80°F). Federal audit in 48 hours.',
      actionRequired: 'Emergency repair approval ($23.5K) required immediately.',
      responsible: { name: 'Facilities Director Chen', badge: 'FAC-001', phone: '770-555-0123' },
      deadlineHours: 4,
      status: 'escalated',
      escalationTier: 'External Compliance (USMS)',
      expandedContent: {
        fullDescription: 'H2-Pod HVAC system experienced complete compressor failure at 0300 hrs. Current temperature 84°F exceeds ACA maximum of 80°F. Federal housing inspection scheduled Dec 12-14. Emergency repair contractor available with 4-hour response time. Repair cost $23,500 from Facilities Maintenance budget.',
        timeline: [
          { time: '03:00', event: 'HVAC failure detected by automated monitoring' },
          { time: '03:15', event: 'Facilities on-call notified' },
          { time: '04:00', event: 'Emergency contractor quote received ($23.5K)' },
          { time: '05:30', event: 'Approval request submitted to Command' }
        ]
      }
    },
    {
      id: 'pri-002',
      rank: 2,
      severity: 'high',
      title: 'B-Shift Patrol Below Minimum',
      description: 'Operating at 9/12 deputies (75%). Two zones single-officer (4, 7).',
      actionRequired: 'OT authorization required for safe coverage.',
      responsible: { name: 'Capt. Rodriguez', badge: '3042', phone: '770-555-3042' },
      deadlineHours: 6,
      status: 'pending',
      escalationTier: 'Command',
      expandedContent: {
        fullDescription: 'B-Shift currently operating with 9 of 12 minimum deputies. Three deputies out: Martinez (#4521) FMLA, Chen (#4167) FMLA, Williams (#4089) Workers Comp. Zones 4 (Lawrenceville) and 7 (Snellville) operating single-officer against policy. OT authorization of $8,320 requested for 160 hours coverage over next 2 weeks.',
        timeline: [
          { time: '14:00', event: 'Shift started with 9/12 deputies' },
          { time: '14:15', event: 'Zone coverage assessment completed' },
          { time: '14:30', event: 'OT authorization request submitted' }
        ]
      }
    },
    {
      id: 'pri-003',
      rank: 3,
      severity: 'high',
      title: 'Use of Force Compliance Overdue',
      description: 'Deputy Johnson incident report due 8 hours ago. State reporting deadline in 4 hours.',
      actionRequired: 'IA Supervisor Williams must submit report or request extension.',
      responsible: { name: 'IA Supervisor Williams', badge: '5012', phone: '770-555-5012' },
      deadlineHours: 4,
      status: 'overdue',
      escalationTier: 'Legal / State Reporting',
      expandedContent: {
        fullDescription: 'Use of force incident #2024-0847 involving Deputy Johnson (#D-4167) occurred in B-Pod at 14:47 yesterday. OC spray deployment on inmate MARTINEZ, Carlos #2024-7234. Medical evaluation completed, no injuries. Body camera footage BC-4167-1210-1447 secured. State reporting requires submission within 24 hours. Currently 8 hours overdue for internal review.',
        timeline: [
          { time: 'Yesterday 14:47', event: 'Incident occurred - OC spray deployed' },
          { time: 'Yesterday 15:15', event: 'Medical evaluation completed' },
          { time: 'Yesterday 16:00', event: 'Initial report filed by Deputy Johnson' },
          { time: 'Today 06:00', event: 'Internal review deadline passed' }
        ]
      }
    },
    {
      id: 'pri-004',
      rank: 4,
      severity: 'medium',
      title: 'Jail Population Approaching Capacity',
      description: 'Current 848/920 beds (92%). Trend projects 95% by Friday.',
      actionRequired: 'Review early release candidates and coordinate with courts.',
      responsible: { name: 'Detention Major Wilson', badge: '2145', phone: '770-555-2145' },
      deadlineHours: 24,
      status: 'in_progress',
      escalationTier: 'Command',
      expandedContent: {
        fullDescription: 'Jail population at 848/920 (92%). Net increase of +6 in last 24 hours (18 bookings, 12 releases). H2-Pod federal housing at 112% (36/32) using emergency beds. Current trajectory projects 95% capacity by Friday. Early release review of 23 eligible inmates scheduled. Courts coordination meeting at 1400.',
        timeline: [
          { time: '06:00', event: 'Population count: 848/920' },
          { time: '06:15', event: 'Trend analysis completed' },
          { time: '08:00', event: 'Early release list generated (23 candidates)' }
        ]
      }
    },
    {
      id: 'pri-005',
      rank: 5,
      severity: 'medium',
      title: 'Fleet Maintenance Backlog',
      description: '9 patrol units pending maintenance (14% of fleet). 2 units overdue for state inspection.',
      actionRequired: 'Authorize overtime for mechanics or contract repairs.',
      responsible: { name: 'Fleet Manager Anderson', badge: 'FLT-002', phone: '770-555-0199' },
      deadlineHours: 48,
      status: 'pending',
      escalationTier: 'Command',
      expandedContent: {
        fullDescription: '9 of 64 patrol units currently out of service for maintenance. Units 247 (totaled in pursuit), 312, 318, 324, 327, 331, 342, 355, 361 awaiting repairs. 2 units (312, 318) overdue for state inspection - must be completed by Friday or units cannot be deployed. Overtime authorization for mechanics or contract repair services requested.',
        timeline: [
          { time: 'Yesterday', event: 'Unit 247 totaled in pursuit' },
          { time: 'This week', event: '8 additional units queued for service' },
          { time: 'Friday', event: 'State inspection deadline for units 312, 318' }
        ]
      }
    }
  ];

  // Upcoming Risk Horizon (72 Hours) — predictive, not current-state
  const riskHorizon = [
    {
      id: 'risk-001',
      title: 'POST Certification Expiration — 8 Deputies',
      severity: 'critical',
      hoursUntil: 48,
      linkedModule: '/command/risk',
      category: 'Compliance',
      projectedImpact: 'Deputies lose certification, suspended from duty'
    },
    {
      id: 'risk-002',
      title: 'Jail Population Projected to 95% Capacity',
      severity: 'high',
      hoursUntil: 72,
      linkedModule: '/command/calendar',
      category: 'Operations',
      projectedImpact: 'Intake restrictions, early release review needed'
    },
    {
      id: 'risk-003',
      title: 'B-Shift Staffing — Weekend Coverage Gap',
      severity: 'high',
      hoursUntil: 36,
      linkedModule: '/command/personnel',
      category: 'Staffing',
      projectedImpact: 'OT burn rate $4,160/day if not addressed'
    },
    {
      id: 'risk-004',
      title: 'Fleet Units 312/318 — State Inspection Overdue Friday',
      severity: 'high',
      hoursUntil: 60,
      linkedModule: '/command/budget',
      category: 'Maintenance',
      projectedImpact: '2 patrol units pulled from service'
    }
  ];

  // Accountability data
  const accountabilityData = {
    activeCommandTasks: 5,
    awaitingReview: 2,
    escalatedToSheriff: 1,
    missedDeadlines24h: 0
  };

  // Operational Highlights Data
  const operationalHighlights = [
    { text: 'Jail population +6 net (848/920, 92%) — approaching capacity threshold', severity: 'warning' },
    { text: '2 hospital transports (chest pain, laceration) — both inmates returned by 0200 hrs', severity: 'info' },
    { text: 'B-Shift use of force under review — Deputy Johnson, OC spray, no injuries', severity: 'info' },
    { text: 'Narcotics seizure (I-85 traffic stop) — 4.2 kg cocaine, 1 arrest, DEA notified', severity: 'positive' },
    { text: 'No pursuits, no injuries, no critical incidents overnight', severity: 'positive' }
  ];

  // On Duty Today Data
  const onDutyData = {
    watchCommander: { name: 'Major Wilson', badge: '2145', radio: 'Command-1', phone: '770-555-2145', email: 'wilson@gwinnettso.gov', onDutySince: '06:00' },
    patrolSupervisors: [
      { name: 'Sgt. Williams', badge: '4028', radio: 'P-Supervisor-1', phone: '770-555-4028', shift: 'B', onDutySince: '14:00' },
      { name: 'Sgt. Chen', badge: '4103', radio: 'P-Supervisor-2', phone: '770-555-4103', shift: 'B', onDutySince: '14:00' }
    ],
    detentionCommander: { name: 'Capt. Rodriguez', badge: '3042', radio: 'Detention-1', phone: '770-555-3042', onDutySince: '06:00' },
    onCallCommand: { name: 'Chief Deputy Harris', title: 'Chief Deputy', phone: '770-555-0001' }
  };

  // Scheduled Events Data
  const scheduledEvents = [
    { id: 'evt-001', time: '09:00', title: 'Federal audit walkthrough', location: 'H-Pod', lead: 'Major Wilson', category: 'compliance', hoursUntil: 3 },
    { id: 'evt-002', time: '13:00', title: 'Use-of-force review board', location: 'Admin 2nd floor', lead: 'Chief Deputy Harris', category: 'internal', hoursUntil: 7 },
    { id: 'evt-003', time: '14:00', title: 'Courts coordination meeting', location: 'Admin Conference Room', lead: 'Major Wilson', category: 'operational', hoursUntil: 8 },
    { id: 'evt-004', time: '18:00', title: 'County Council public safety update', location: 'Government Center', lead: 'Sheriff Thompson', category: 'external', hoursUntil: 12 }
  ];

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  // Severity left-strip color — matches Executive Dashboard tier strips
  const getSeverityStripColor = (severity) => {
    if (severity === 'critical') return 'bg-red-500';
    if (severity === 'high') return 'bg-amber-500';
    return 'bg-slate-600';
  };

  // Badge system — unified with Executive Dashboard getTierBadge pattern
  const getSeverityBadge = (severity, deadlineHours) => {
    if (severity === 'critical') return { text: `CRITICAL · ${deadlineHours}h`, classes: 'bg-red-500/10 border-red-500/20 text-red-400' };
    if (severity === 'high') return { text: `ACTION · ${deadlineHours}h`, classes: 'bg-amber-500/10 border-amber-500/20 text-amber-400' };
    return null;
  };

  // Execution status badge
  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending': return { text: 'Pending', classes: 'bg-amber-500/10 border-amber-500/20 text-amber-400' };
      case 'in_progress': return { text: 'In Progress', classes: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' };
      case 'escalated': return { text: 'Escalated', classes: 'bg-red-500/10 border-red-500/20 text-red-400' };
      case 'overdue': return { text: 'Overdue', classes: 'bg-red-500/10 border-red-500/20 text-red-400' };
      case 'resolved': return { text: 'Resolved', classes: 'bg-slate-500/10 border-slate-500/20 text-slate-400' };
      default: return { text: status, classes: 'bg-slate-500/10 border-slate-500/20 text-slate-400' };
    }
  };

  // Operational highlight dot color — system palette
  const getHighlightDot = (severity) => {
    switch (severity) {
      case 'warning': return 'bg-amber-500';
      case 'positive': return 'bg-emerald-500';
      case 'info': return 'bg-slate-500';
      default: return 'bg-slate-500';
    }
  };

  // Event category label color
  const getCategoryColor = (category) => {
    switch (category) {
      case 'compliance': return 'text-amber-400';
      case 'operational': return 'text-amber-400';
      case 'external': return 'text-slate-400';
      case 'internal': return 'text-slate-400';
      default: return 'text-slate-400';
    }
  };

  // Sparkline renderer — inline SVG, no dependencies
  const Sparkline = ({ data, color = 'text-slate-400' }) => {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min || 1;
    const points = data.map((v, i) => `${(i / (data.length - 1)) * 56},${14 - ((v - min) / range) * 12}`).join(' ');
    return (
      <svg className={`w-14 h-4 ${color}`} viewBox="0 0 56 16" fill="none">
        <polyline points={points} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
      </svg>
    );
  };

  return (
    <DashboardLayout>
      <div className="p-5 lg:p-8">
        <div className="max-w-7xl mx-auto">

        {/* Page Header */}
        <div className="mb-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-white mb-1">Daily Command Brief</h2>
            <div className="flex items-center gap-2 text-[11px] text-slate-500">
              <span>{formatDate(currentTime)}</span>
              <span className="text-slate-700">·</span>
              <span>{formatTime(currentTime)} EST</span>
              <span className="text-slate-700">·</span>
              <span>Generated at {briefGeneratedAt} EST</span>
              <span className="text-slate-700">·</span>
              <span>Data snapshot integrity: Synced {systemIntegrity.lastSync}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 bg-slate-800/40 border border-slate-700/40 text-slate-300 rounded-lg text-[13px] font-medium hover:bg-slate-800/60 transition-all"
            >
              <Printer className="w-4 h-4" />
              Print
            </button>
            <button
              className="flex items-center gap-2 px-4 py-2 bg-slate-800/40 border border-slate-700/40 text-slate-300 rounded-lg text-[13px] font-medium hover:bg-slate-800/60 transition-all"
            >
              <Download className="w-4 h-4" />
              PDF
            </button>
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="flex items-center gap-2 px-4 py-2 bg-slate-800/40 border border-slate-700/40 text-slate-300 rounded-lg text-[13px] font-medium hover:bg-slate-800/60 transition-all disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>
        </div>

        {/* System Integrity Strip — matches Settings System Health pattern */}
        <div className="mb-8 flex items-center gap-6 px-5 py-3 bg-slate-800/25 border border-slate-700/30 rounded-xl">
          <div className="flex items-center gap-2.5">
            <Shield className="w-4 h-4 text-slate-500" />
            <span className="text-[13px] font-semibold text-slate-300">System Integrity</span>
          </div>
          <div className="h-4 w-px bg-slate-600/40"></div>
          <div className="flex items-center gap-2.5">
            <div className={`w-1.5 h-1.5 rounded-full ${systemIntegrity.integrationsHealthy ? 'bg-emerald-500' : 'bg-red-500'}`}></div>
            <span className="text-[13px] text-slate-400">Integrations {systemIntegrity.integrationsHealthy ? 'healthy' : 'degraded'}</span>
          </div>
          <div className="h-4 w-px bg-slate-600/40"></div>
          <div className="flex items-center gap-2.5">
            <div className={`w-1.5 h-1.5 rounded-full ${systemIntegrity.failedFeeds === 0 ? 'bg-emerald-500' : 'bg-red-500'}`}></div>
            <span className="text-[13px] text-slate-400">{systemIntegrity.failedFeeds} failed data feeds</span>
          </div>
          <div className="h-4 w-px bg-slate-600/40"></div>
          <div className="flex items-center gap-2.5">
            <div className={`w-1.5 h-1.5 rounded-full ${systemIntegrity.staleModules === 0 ? 'bg-emerald-500' : 'bg-amber-500'}`}></div>
            <span className="text-[13px] text-slate-400">{systemIntegrity.staleModules} stale modules</span>
          </div>
        </div>

        {/* Command Summary — with 7-day trend sparklines */}
        <div className="mb-8 grid grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Critical Alerts */}
          <button
            onClick={() => navigate('/command/alerts')}
            className="bg-slate-800/25 border border-slate-700/30 rounded-xl p-5 text-left hover:border-slate-600/40 transition-colors"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
                <span className="text-xs text-slate-500 font-medium uppercase tracking-wide">Critical Issues</span>
              </div>
              <Sparkline data={summaryData.criticalAlerts.sparkline} color="text-red-400" />
            </div>
            <div className="flex items-baseline gap-2 mb-1">
              <p className="text-2xl font-semibold text-white">{summaryData.criticalAlerts.count}</p>
              <span className="flex items-center gap-0.5 text-red-400 text-xs font-medium">
                <ArrowUpRight className="w-3 h-3" />+{summaryData.criticalAlerts.change}
              </span>
            </div>
            <p className="text-[11px] text-slate-400">+{summaryData.criticalAlerts.change} from yesterday ({summaryData.criticalAlerts.yesterday})</p>
          </button>

          {/* Pending Approvals */}
          <button
            onClick={() => navigate('/command/approvals')}
            className="bg-slate-800/25 border border-slate-700/30 rounded-xl p-5 text-left hover:border-slate-600/40 transition-colors"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div>
                <span className="text-xs text-slate-500 font-medium uppercase tracking-wide">Pending Approvals</span>
              </div>
              <Sparkline data={summaryData.pendingApprovals.sparkline} color="text-emerald-400" />
            </div>
            <div className="flex items-baseline gap-2 mb-1">
              <p className="text-2xl font-semibold text-white">{summaryData.pendingApprovals.count}</p>
              <span className="flex items-center gap-0.5 text-emerald-400 text-xs font-medium">
                <ArrowDownRight className="w-3 h-3" />-{summaryData.pendingApprovals.change}
              </span>
            </div>
            <p className="text-[11px] text-slate-400">-{summaryData.pendingApprovals.change} from yesterday ({summaryData.pendingApprovals.yesterday})</p>
          </button>

          {/* Staffing Status */}
          <button
            onClick={() => navigate('/command/personnel')}
            className="bg-slate-800/25 border border-slate-700/30 rounded-xl p-5 text-left hover:border-slate-600/40 transition-colors"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
                <span className="text-xs text-slate-500 font-medium uppercase tracking-wide">{summaryData.staffingStatus.shift}-Shift {summaryData.staffingStatus.division}</span>
              </div>
              <Sparkline data={summaryData.staffingStatus.sparkline} color="text-red-400" />
            </div>
            <div className="flex items-baseline gap-2 mb-1">
              <p className="text-2xl font-semibold text-white">{summaryData.staffingStatus.percentage}%</p>
              <span className="flex items-center gap-0.5 text-red-400 text-xs font-medium">
                <ArrowDownRight className="w-3 h-3" />-{summaryData.staffingStatus.change}%
              </span>
            </div>
            <p className="text-[11px] text-red-400">Below minimum staffing (was {summaryData.staffingStatus.yesterday}%)</p>
          </button>

          {/* Compliance Deadline */}
          <button
            onClick={() => navigate('/command/risk')}
            className="bg-slate-800/25 border border-slate-700/30 rounded-xl p-5 text-left hover:border-slate-600/40 transition-colors"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div>
                <span className="text-xs text-slate-500 font-medium uppercase tracking-wide">{summaryData.complianceDeadline.event}</span>
              </div>
              <Sparkline data={summaryData.complianceDeadline.sparkline} color="text-amber-400" />
            </div>
            <div className="flex items-baseline gap-2 mb-1">
              <p className="text-2xl font-semibold text-white">{summaryData.complianceDeadline.hoursUntil}</p>
              <span className="text-xs text-slate-400">hours</span>
            </div>
            <p className="text-[11px] text-amber-400">USMS inspection window approaching</p>
          </button>
        </div>

        {/* Priority Items — with execution state and escalation tier */}
        <div className="mb-8 bg-slate-800/25 border border-slate-700/30 rounded-xl">
          <div className="flex items-center justify-between px-5 py-4 pb-3">
            <h3 className="text-[13px] font-semibold text-white uppercase tracking-wide">Priority Items Requiring Command Attention</h3>
            <span className="text-xs text-slate-500">{priorityItems.length} items ranked</span>
          </div>
          <div className="px-5 pb-5 space-y-2">
            {priorityItems.map((item) => {
              const badge = getSeverityBadge(item.severity, item.deadlineHours);
              const statusBadge = getStatusBadge(item.status);
              return (
                <div
                  key={item.id}
                  className="rounded-lg border border-slate-700/20 hover:bg-slate-800/20 transition-colors"
                >
                  <div
                    className="flex items-center gap-4 p-3 cursor-pointer"
                    onClick={() => setExpandedItem(expandedItem === item.id ? null : item.id)}
                  >
                    <div className={`w-0.5 self-stretch rounded-full flex-shrink-0 ${getSeverityStripColor(item.severity)}`}></div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <p className="text-sm font-medium text-white">{item.title}</p>
                        {badge && <span className={`px-1.5 py-0.5 border rounded text-[11px] font-medium ${badge.classes}`}>{badge.text}</span>}
                        <span className={`px-1.5 py-0.5 border rounded text-[11px] font-medium ${statusBadge.classes}`}>{statusBadge.text}</span>
                      </div>
                      <div className="flex items-center gap-2 text-[11px]">
                        <span className="text-slate-400">{item.description}</span>
                      </div>
                      <div className="flex items-center gap-2 text-[11px] mt-1">
                        <span className="text-slate-500">{item.responsible.name}</span>
                        <span className="text-slate-600">·</span>
                        <span className="text-slate-500">#{item.responsible.badge}</span>
                        <span className="text-slate-600">·</span>
                        <span className={item.severity === 'critical' ? 'text-red-400' : item.severity === 'high' ? 'text-amber-400' : 'text-slate-400'}>
                          {item.deadlineHours}h deadline
                        </span>
                        <span className="text-slate-600">·</span>
                        <span className="text-slate-600">Escalation: {item.escalationTier}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      {expandedItem === item.id ? <ChevronUp className="w-4 h-4 text-slate-600" /> : <ChevronDown className="w-4 h-4 text-slate-600" />}
                    </div>
                  </div>

                  {/* Expanded Content */}
                  {expandedItem === item.id && (
                    <div className="px-3 pb-3 ml-[10px] space-y-3 border-t border-slate-700/20 pt-3">
                      <p className="text-[13px] text-slate-300 leading-relaxed">{item.expandedContent.fullDescription}</p>

                      <div>
                        <h4 className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-2">Timeline</h4>
                        <div className="space-y-1">
                          {item.expandedContent.timeline.map((entry, idx) => (
                            <div key={idx} className="flex items-start gap-3 text-[13px]">
                              <span className="font-mono text-slate-500 w-24 flex-shrink-0">{entry.time}</span>
                              <span className="text-slate-300">{entry.event}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Action affordance */}
                      <div className="flex gap-2 pt-1">
                        <button className="px-3 py-1.5 text-xs font-medium text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/10 rounded-lg transition-colors">
                          View Details
                        </button>
                        <button className="px-3 py-1.5 text-xs font-medium text-slate-400 border border-slate-700/30 hover:bg-slate-700/20 rounded-lg transition-colors">
                          Assign
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-2 px-3 pb-2 ml-[10px] text-[10px] text-slate-500">
                    <Shield className="w-3 h-3 text-slate-600" />
                    <span>Logged to audit trail</span>
                    <span className="text-slate-600">·</span>
                    <span>Action: {item.actionRequired.split('.')[0]}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Upcoming Risk Horizon (72 Hours) — predictive intelligence */}
        <div className="mb-8 bg-slate-800/25 border border-slate-700/30 rounded-xl p-5">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <h3 className="text-[13px] font-semibold text-white uppercase tracking-wide">Upcoming Risk Horizon (72 Hours)</h3>
            </div>
            <span className="text-xs text-slate-500">Predictive — projected escalation items</span>
          </div>

          <div className="space-y-2">
            {riskHorizon.map(risk => (
              <button
                key={risk.id}
                onClick={() => navigate(risk.linkedModule)}
                className="w-full rounded-lg border border-slate-700/20 hover:bg-slate-800/20 transition-colors text-left"
              >
                <div className="flex items-center gap-4 p-3">
                  <div className={`w-0.5 self-stretch rounded-full flex-shrink-0 ${risk.severity === 'critical' ? 'bg-red-500' : 'bg-amber-500'}`}></div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-medium text-white">{risk.title}</p>
                      <span className={`px-1.5 py-0.5 border rounded text-[11px] font-medium ${
                        risk.severity === 'critical' ? 'bg-red-500/10 border-red-500/20 text-red-400' : 'bg-amber-500/10 border-amber-500/20 text-amber-400'
                      }`}>
                        {risk.hoursUntil}h
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-[11px]">
                      <span className="text-slate-500">{risk.category}</span>
                      <span className="text-slate-600">·</span>
                      <span className="text-slate-400">{risk.projectedImpact}</span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-8">
          {/* Operational Highlights */}
          <div className="bg-slate-800/25 border border-slate-700/30 rounded-xl p-5">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-[13px] font-semibold text-white uppercase tracking-wide">Operational Highlights</h3>
              <span className="text-xs text-slate-500">Last 24 hours</span>
            </div>

            <div className="space-y-3">
              {operationalHighlights.map((highlight, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${getHighlightDot(highlight.severity)}`}></div>
                  <p className="text-[13px] text-slate-300">{highlight.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* On Duty Today */}
          <div className="bg-slate-800/25 border border-slate-700/30 rounded-xl p-5">
            <h3 className="text-[13px] font-semibold text-white uppercase tracking-wide mb-5">On Duty Today</h3>

            <div className="space-y-4">
              {/* Watch Commander */}
              <div>
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Watch Commander</span>
                <div className="mt-1.5 flex items-center gap-2">
                  <button
                    onClick={() => setContactModal(onDutyData.watchCommander)}
                    className="text-sm font-medium text-white hover:text-slate-300 transition-colors"
                  >
                    {onDutyData.watchCommander.name}
                  </button>
                  <span className="text-[11px] text-slate-500">#{onDutyData.watchCommander.badge}</span>
                  <span className="text-slate-600 text-[11px]">·</span>
                  <span className="text-[11px] text-slate-500">Radio: {onDutyData.watchCommander.radio}</span>
                </div>
              </div>

              {/* Patrol Supervisors */}
              <div className="border-t border-slate-700/20 pt-3">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Patrol Supervisors</span>
                <div className="mt-1.5 space-y-1">
                  {onDutyData.patrolSupervisors.map((sup, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <button
                        onClick={() => setContactModal(sup)}
                        className="text-sm font-medium text-white hover:text-slate-300 transition-colors"
                      >
                        {sup.name}
                      </button>
                      <span className="text-[11px] text-slate-500">#{sup.badge}</span>
                      <span className="text-slate-600 text-[11px]">·</span>
                      <span className="text-[11px] text-slate-500">Radio: {sup.radio}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Detention Commander */}
              <div className="border-t border-slate-700/20 pt-3">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Detention Commander</span>
                <div className="mt-1.5 flex items-center gap-2">
                  <button
                    onClick={() => setContactModal(onDutyData.detentionCommander)}
                    className="text-sm font-medium text-white hover:text-slate-300 transition-colors"
                  >
                    {onDutyData.detentionCommander.name}
                  </button>
                  <span className="text-[11px] text-slate-500">#{onDutyData.detentionCommander.badge}</span>
                  <span className="text-slate-600 text-[11px]">·</span>
                  <span className="text-[11px] text-slate-500">Radio: {onDutyData.detentionCommander.radio}</span>
                </div>
              </div>

              {/* On-Call Command */}
              <div className="border-t border-slate-700/20 pt-3">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">On-Call Command</span>
                <div className="mt-1.5 flex items-center gap-2">
                  <button
                    onClick={() => setContactModal(onDutyData.onCallCommand)}
                    className="text-sm font-medium text-white hover:text-slate-300 transition-colors"
                  >
                    {onDutyData.onCallCommand.name}
                  </button>
                  <span className="text-slate-600 text-[11px]">·</span>
                  <span className="text-[11px] text-slate-500">Cell: {onDutyData.onCallCommand.phone}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Accountability Summary Strip — execution velocity snapshot */}
        <div className="mb-8 flex items-center gap-6 px-5 py-3.5 bg-slate-800/25 border border-slate-700/30 rounded-xl">
          <div className="flex items-center gap-2.5">
            <CheckCircle className="w-4 h-4 text-slate-500" />
            <span className="text-[13px] font-semibold text-slate-300">Execution Snapshot</span>
          </div>
          <div className="h-4 w-px bg-slate-600/40"></div>
          <div className="flex items-center gap-2.5">
            <span className="px-2 py-0.5 bg-slate-500/10 border border-slate-500/20 rounded text-[11px] font-medium text-slate-300">
              {accountabilityData.activeCommandTasks} Active Tasks
            </span>
          </div>
          <div className="flex items-center gap-2.5">
            <span className="px-2 py-0.5 bg-amber-500/10 border border-amber-500/20 rounded text-[11px] font-medium text-amber-400">
              {accountabilityData.awaitingReview} Awaiting Review
            </span>
          </div>
          <div className="flex items-center gap-2.5">
            <span className="px-2 py-0.5 bg-red-500/10 border border-red-500/20 rounded text-[11px] font-medium text-red-400">
              {accountabilityData.escalatedToSheriff} Escalated to Sheriff
            </span>
          </div>
          <div className="flex items-center gap-2.5">
            <span className={`px-2 py-0.5 border rounded text-[11px] font-medium ${
              accountabilityData.missedDeadlines24h === 0
                ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                : 'bg-red-500/10 border-red-500/20 text-red-400'
            }`}>
              {accountabilityData.missedDeadlines24h} Missed Deadlines (24h)
            </span>
          </div>
        </div>

        {/* Scheduled Events */}
        <div className="mb-8 bg-slate-800/25 border border-slate-700/30 rounded-xl p-5">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-[13px] font-semibold text-white uppercase tracking-wide">Scheduled Events (Command-Level)</h3>
            <button
              onClick={() => navigate('/command/calendar')}
              className="text-xs text-amber-400/80 hover:text-amber-300"
            >
              View Full Calendar →
            </button>
          </div>

          <div className="space-y-1">
            {scheduledEvents.map((event) => (
              <div
                key={event.id}
                className={`flex items-center gap-4 px-4 py-2.5 rounded ${
                  event.hoursUntil <= 2 ? 'bg-amber-500/5 border-l-[3px] border-l-amber-500/30' : 'bg-slate-900/20 hover:bg-slate-800/30 transition-all'
                }`}
              >
                <span className="text-[13px] font-mono font-semibold text-slate-300 w-14 flex-shrink-0">{event.time}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    {event.hoursUntil <= 2 && <Clock className="w-3.5 h-3.5 text-amber-400" />}
                    <span className="text-[13px] font-medium text-white">{event.title}</span>
                    {event.hoursUntil <= 2 && (
                      <span className="px-1.5 py-0.5 bg-amber-500/10 border border-amber-500/20 rounded text-[11px] font-medium text-amber-400">
                        Starting soon
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-0.5 text-[11px]">
                    <span className="text-slate-400">{event.location}</span>
                    <span className="text-slate-600">·</span>
                    <span className="text-slate-400">{event.lead}</span>
                    <span className="text-slate-600">·</span>
                    <span className={getCategoryColor(event.category)}>
                      {event.category === 'compliance' && 'Compliance'}
                      {event.category === 'external' && 'External Briefing'}
                      {event.category === 'internal' && 'Internal Review'}
                      {event.category === 'operational' && 'Operational'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Data Freshness Footer */}
        <div className="mb-4 px-5 py-3 bg-slate-800/10 border border-slate-800/30 rounded-lg">
          <div className="flex items-center gap-2">
            <Shield className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-xs text-slate-600">Snapshot brief auto-generated at {briefGeneratedAt} EST daily. Data reflects state at generation time. Use Refresh for live updates.</span>
          </div>
        </div>

        </div>
      </div>

      {/* Contact Modal */}
      {contactModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setContactModal(null)}
          />
          <div className="relative bg-slate-900 border border-slate-700/50 rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <div className="flex items-start gap-3 mb-5">
              <div className="flex-1">
                <h3 className="text-base font-semibold text-white mb-0.5">Contact: {contactModal.name}</h3>
                {contactModal.title && (
                  <p className="text-xs text-slate-400">{contactModal.title}</p>
                )}
              </div>
              <button
                onClick={() => setContactModal(null)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-sm">
              {contactModal.badge && (
                <div className="flex items-center gap-3">
                  <User className="w-4 h-4 text-slate-500" />
                  <span className="text-slate-300">Badge: #{contactModal.badge}</span>
                </div>
              )}
              {contactModal.radio && (
                <div className="flex items-center gap-3">
                  <Radio className="w-4 h-4 text-slate-500" />
                  <span className="text-slate-300">Radio: {contactModal.radio}</span>
                </div>
              )}
              {contactModal.phone && (
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-slate-500" />
                  <span className="text-slate-300">Cell: {contactModal.phone}</span>
                </div>
              )}
              {contactModal.email && (
                <div className="flex items-center gap-3">
                  <Building2 className="w-4 h-4 text-slate-500" />
                  <span className="text-slate-300">{contactModal.email}</span>
                </div>
              )}
              {contactModal.onDutySince && (
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-slate-500" />
                  <span className="text-slate-300">On Duty Since: {contactModal.onDutySince}</span>
                </div>
              )}
            </div>

            <div className="flex gap-3 mt-6">
              <button className="flex-1 px-4 py-2.5 text-xs font-medium text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/10 rounded-xl transition-colors">
                Call Cell
              </button>
              {contactModal.radio && (
                <button className="flex-1 px-4 py-2.5 text-xs font-medium text-slate-400 border border-slate-700/30 hover:bg-slate-700/20 rounded-xl transition-colors">
                  Radio Contact
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

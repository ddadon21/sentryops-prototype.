import React, { useState, useEffect } from 'react';
import {
  AlertCircle,
  ClipboardCheck,
  Users,
  FileCheck,
  Clock,
  Printer,
  Download,
  RefreshCw,
  CheckCircle,
  Shield,
  Calendar,
  ChevronDown,
  ChevronUp,
  Phone,
  Radio,
  MapPin,
  X,
  User,
  Building2,
  TrendingUp,
  Package,
  Activity
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';

export default function DailyCommandBrief() {
  const navigate = useNavigate();
  const [expandedItem, setExpandedItem] = useState(null);
  const [contactModal, setContactModal] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Command Summary Data
  const summaryData = {
    criticalAlerts: { count: 3, trend: 'up', change: 1 },
    pendingApprovals: { count: 6, oldestHours: 14 },
    staffingStatus: { division: 'Patrol', shift: 'B', percentage: 75, status: 'below_minimum' },
    complianceDeadline: { event: 'Federal audit', hoursUntil: 48 }
  };

  // Priority Items Data
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

  // Operational Highlights Data
  const operationalHighlights = [
    { icon: Users, text: 'Jail population +6 net (848/920, 92%) – approaching capacity threshold', severity: 'warning' },
    { icon: Activity, text: '2 hospital transports (chest pain, laceration) – both inmates returned by 0200 hrs', severity: 'info' },
    { icon: Shield, text: 'B-Shift use of force under review – Deputy Johnson, OC spray, no injuries', severity: 'info' },
    { icon: Package, text: 'Narcotics seizure (I-85 traffic stop) – 4.2 kg cocaine, 1 arrest, DEA notified', severity: 'positive' },
    { icon: CheckCircle, text: 'No pursuits, no injuries, no critical incidents overnight', severity: 'positive' }
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

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-yellow-500';
      case 'medium': return 'bg-blue-500';
      default: return 'bg-slate-500';
    }
  };

  const getDeadlineBadgeStyle = (hours) => {
    if (hours <= 4) return 'bg-red-900/50 text-red-300 border-red-500/30';
    if (hours <= 24) return 'bg-yellow-900/50 text-yellow-300 border-yellow-500/30';
    return 'bg-blue-900/50 text-blue-300 border-blue-500/30';
  };

  const getHighlightIconColor = (severity) => {
    switch (severity) {
      case 'warning': return 'text-yellow-400';
      case 'positive': return 'text-green-400';
      case 'info': return 'text-slate-400';
      default: return 'text-slate-400';
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'compliance': return 'text-blue-400';
      case 'external': return 'text-purple-400';
      case 'internal': return 'text-slate-400';
      case 'operational': return 'text-amber-400';
      default: return 'text-slate-400';
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-white tracking-tight">Daily Command Brief</h1>
            <p className="text-sm text-slate-400 mt-1">Executive operational summary for command staff • Auto-generated at 0600</p>
            <p className="text-slate-400 mt-1">{currentDate} • Last updated: 06:00 EST</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-3 py-2 bg-slate-800/40 border border-slate-700/50 rounded-lg text-slate-300 hover:bg-slate-700/50 transition-colors"
              title="Print"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline text-sm">Print</span>
            </button>
            <button
              className="flex items-center gap-2 px-3 py-2 bg-slate-800/40 border border-slate-700/50 rounded-lg text-slate-300 hover:bg-slate-700/50 transition-colors"
              title="Download PDF"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline text-sm">PDF</span>
            </button>
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="flex items-center gap-2 px-3 py-2 bg-slate-800/40 border border-slate-700/50 rounded-lg text-slate-300 hover:bg-slate-700/50 transition-colors disabled:opacity-50"
              title="Refresh"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline text-sm">Refresh</span>
            </button>
          </div>
        </div>

        {/* Command Summary Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Critical Alerts Tile */}
          <button
            onClick={() => navigate('/command/alerts')}
            className="bg-slate-800 border border-slate-700 rounded-lg p-5 hover:bg-slate-700 transition-colors text-left relative h-[120px]"
          >
            <AlertCircle className="w-5 h-5 text-red-400 absolute top-4 left-4" />
            <div className="flex flex-col items-center justify-center h-full">
              <span className="text-5xl font-bold text-red-400 tabular-nums">{summaryData.criticalAlerts.count}</span>
            </div>
            <div className="absolute bottom-4 left-4">
              <span className="text-sm text-slate-400">Critical Issues</span>
            </div>
            <div className="absolute bottom-4 right-4">
              <span className="text-xs text-slate-500">↑ {summaryData.criticalAlerts.change} from yesterday</span>
            </div>
          </button>

          {/* Pending Approvals Tile */}
          <button
            onClick={() => navigate('/command/approvals')}
            className="bg-slate-800 border border-slate-700 rounded-lg p-5 hover:bg-slate-700 transition-colors text-left relative h-[120px]"
          >
            <ClipboardCheck className="w-5 h-5 text-yellow-400 absolute top-4 left-4" />
            <div className="flex flex-col items-center justify-center h-full">
              <span className="text-5xl font-bold text-yellow-400 tabular-nums">{summaryData.pendingApprovals.count}</span>
            </div>
            <div className="absolute bottom-4 left-4">
              <span className="text-sm text-slate-400">Pending Approvals</span>
            </div>
            <div className="absolute bottom-4 right-4">
              <span className="text-xs text-slate-500">Oldest: {summaryData.pendingApprovals.oldestHours} hrs</span>
            </div>
          </button>

          {/* Staffing Status Tile */}
          <button
            onClick={() => navigate('/staffing')}
            className="bg-slate-800 border border-slate-700 rounded-lg p-5 hover:bg-slate-700 transition-colors text-left relative h-[120px]"
          >
            <Users className="w-5 h-5 text-slate-400 absolute top-4 left-4" />
            <div className="flex flex-col items-center justify-center h-full">
              <span className="text-5xl font-bold text-orange-400 tabular-nums">{summaryData.staffingStatus.percentage}%</span>
            </div>
            <div className="absolute bottom-4 left-4">
              <span className="text-sm text-slate-400">{summaryData.staffingStatus.shift}-Shift {summaryData.staffingStatus.division}</span>
            </div>
            <div className="absolute bottom-4 right-4">
              <span className="text-xs text-red-400">Below minimum</span>
            </div>
          </button>

          {/* Compliance Deadline Tile */}
          <button
            onClick={() => navigate('/risk-compliance')}
            className="bg-slate-800 border border-slate-700 rounded-lg p-5 hover:bg-slate-700 transition-colors text-left relative h-[120px]"
          >
            <FileCheck className="w-5 h-5 text-blue-400 absolute top-4 left-4" />
            <div className="flex flex-col items-center justify-center h-full">
              <span className="text-5xl font-bold text-blue-400 tabular-nums">{summaryData.complianceDeadline.hoursUntil}</span>
            </div>
            <div className="absolute bottom-4 left-4">
              <span className="text-sm text-slate-400">{summaryData.complianceDeadline.event}</span>
            </div>
            <div className="absolute bottom-4 right-4">
              <span className="text-xs text-slate-500">Hours until</span>
            </div>
          </button>
        </div>

        {/* Priority Items Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white uppercase tracking-wide">Priority Items Requiring Command Attention</h2>

          <div className="space-y-0 divide-y divide-slate-700">
            {priorityItems.map((item) => (
              <div key={item.id} className="py-4">
                <div
                  className="cursor-pointer"
                  onClick={() => setExpandedItem(expandedItem === item.id ? null : item.id)}
                >
                  <div className="flex items-start gap-4">
                    {/* Rank Number */}
                    <span className="text-2xl font-bold text-slate-300 w-8">{item.rank}</span>

                    {/* Severity Dot */}
                    <div className={`w-2 h-2 ${getSeverityColor(item.severity)} rounded-full mt-2.5 flex-shrink-0`}></div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-4 mb-2">
                        <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getDeadlineBadgeStyle(item.deadlineHours)}`}>
                          {item.deadlineHours} hrs
                        </span>
                      </div>

                      <p className="text-sm text-slate-300 leading-relaxed mb-2">{item.description}</p>

                      <p className="text-sm text-white mb-1">
                        <span className="font-semibold">Action:</span> {item.actionRequired}
                      </p>

                      <p className="text-sm text-slate-400">
                        <span className="font-medium">Responsible:</span> {item.responsible.name} (#{item.responsible.badge})
                      </p>

                      <button className="text-sm text-slate-500 hover:text-slate-300 mt-2 flex items-center gap-1">
                        {expandedItem === item.id ? (
                          <>Collapse <ChevronUp className="w-4 h-4" /></>
                        ) : (
                          <>Expand for details <ChevronDown className="w-4 h-4" /></>
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Expanded Content */}
                {expandedItem === item.id && (
                  <div className="mt-4 ml-14 pl-4 border-l-2 border-slate-700 space-y-4">
                    <p className="text-sm text-slate-300 leading-relaxed">{item.expandedContent.fullDescription}</p>

                    <div>
                      <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Timeline</h4>
                      <div className="space-y-1">
                        {item.expandedContent.timeline.map((entry, idx) => (
                          <div key={idx} className="flex items-start gap-3 text-sm">
                            <span className="font-mono text-slate-500 w-24 flex-shrink-0">{entry.time}</span>
                            <span className="text-slate-300">{entry.event}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <button className="px-3 py-1.5 bg-blue-500/20 border border-blue-500/30 text-blue-400 rounded text-sm hover:bg-blue-500/30 transition-colors">
                        View Details
                      </button>
                      <button className="px-3 py-1.5 bg-slate-700/40 border border-slate-600/50 text-slate-300 rounded text-sm hover:bg-slate-700/60 transition-colors">
                        Assign
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Two Column Layout: Operational Highlights + On Duty Today */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Operational Highlights */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white uppercase tracking-wide">Operational Highlights</h2>
              <span className="text-xs text-slate-500">Last 24 Hours</span>
            </div>

            <div className="space-y-3">
              {operationalHighlights.map((highlight, idx) => {
                const Icon = highlight.icon;
                return (
                  <div key={idx} className="flex items-start gap-3">
                    <Icon className={`w-4 h-4 ${getHighlightIconColor(highlight.severity)} mt-0.5 flex-shrink-0`} />
                    <p className="text-sm text-slate-300">{highlight.text}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* On Duty Today */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-white uppercase tracking-wide">On Duty Today</h2>

            <div className="space-y-4 divide-y divide-slate-700">
              {/* Watch Commander */}
              <div className="pt-0">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Watch Commander</span>
                <div className="mt-2">
                  <button
                    onClick={() => setContactModal(onDutyData.watchCommander)}
                    className="text-base font-medium text-white hover:text-blue-400 transition-colors"
                  >
                    {onDutyData.watchCommander.name}
                  </button>
                  <span className="text-slate-500 ml-1">(#{onDutyData.watchCommander.badge})</span>
                  <span className="text-slate-400 font-mono text-sm ml-2">• Radio: {onDutyData.watchCommander.radio}</span>
                </div>
              </div>

              {/* Patrol Supervisors */}
              <div className="pt-4">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Patrol Supervisors</span>
                <div className="mt-2 space-y-1">
                  {onDutyData.patrolSupervisors.map((sup, idx) => (
                    <div key={idx}>
                      <button
                        onClick={() => setContactModal(sup)}
                        className="text-base font-medium text-white hover:text-blue-400 transition-colors"
                      >
                        {sup.name}
                      </button>
                      <span className="text-slate-500 ml-1">(#{sup.badge})</span>
                      <span className="text-slate-400 font-mono text-sm ml-2">• Radio: {sup.radio}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Detention Commander */}
              <div className="pt-4">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Detention Commander</span>
                <div className="mt-2">
                  <button
                    onClick={() => setContactModal(onDutyData.detentionCommander)}
                    className="text-base font-medium text-white hover:text-blue-400 transition-colors"
                  >
                    {onDutyData.detentionCommander.name}
                  </button>
                  <span className="text-slate-500 ml-1">(#{onDutyData.detentionCommander.badge})</span>
                  <span className="text-slate-400 font-mono text-sm ml-2">• Radio: {onDutyData.detentionCommander.radio}</span>
                </div>
              </div>

              {/* On-Call Command */}
              <div className="pt-4">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">On-Call Command</span>
                <div className="mt-2">
                  <button
                    onClick={() => setContactModal(onDutyData.onCallCommand)}
                    className="text-base font-medium text-white hover:text-blue-400 transition-colors"
                  >
                    {onDutyData.onCallCommand.name}
                  </button>
                  <span className="text-slate-500 ml-2">• Cell: {onDutyData.onCallCommand.phone}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scheduled Events */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white uppercase tracking-wide">Scheduled Events (Command-Level)</h2>
            <button
              onClick={() => navigate('/calendar')}
              className="text-sm text-amber-400 hover:text-amber-300"
            >
              View Full Calendar →
            </button>
          </div>

          <div className="space-y-0 divide-y divide-slate-700">
            {scheduledEvents.map((event) => (
              <div
                key={event.id}
                className={`py-4 ${event.hoursUntil <= 2 ? 'bg-yellow-900/10 -mx-4 px-4 rounded-lg' : ''}`}
              >
                <div className="flex items-start gap-4">
                  <span className="text-base font-mono font-bold text-slate-300 w-14">{event.time}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      {event.hoursUntil <= 2 && <Clock className="w-4 h-4 text-yellow-400" />}
                      <h3 className="text-base font-semibold text-white">{event.title}</h3>
                      {event.hoursUntil <= 2 && (
                        <span className="px-2 py-0.5 bg-yellow-900/50 border border-yellow-500/30 rounded text-xs text-yellow-300">
                          Starting soon
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-slate-400 mt-1">
                      Location: {event.location} | Lead: {event.lead}
                    </p>
                    <span className={`text-xs ${getCategoryColor(event.category)}`}>
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
      </div>

      {/* Contact Modal */}
      {contactModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setContactModal(null)}
          />
          <div className="relative bg-slate-900 border border-slate-700/50 rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Contact: {contactModal.name}</h3>
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
                  <User className="w-4 h-4 text-slate-400" />
                  <span className="text-slate-300">Badge: #{contactModal.badge}</span>
                </div>
              )}
              {contactModal.radio && (
                <div className="flex items-center gap-3">
                  <Radio className="w-4 h-4 text-slate-400" />
                  <span className="text-slate-300">Radio: {contactModal.radio}</span>
                </div>
              )}
              {contactModal.phone && (
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-slate-400" />
                  <span className="text-slate-300">Cell: {contactModal.phone}</span>
                </div>
              )}
              {contactModal.email && (
                <div className="flex items-center gap-3">
                  <Building2 className="w-4 h-4 text-slate-400" />
                  <span className="text-slate-300">{contactModal.email}</span>
                </div>
              )}
              {contactModal.onDutySince && (
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-slate-400" />
                  <span className="text-slate-300">On Duty Since: {contactModal.onDutySince}</span>
                </div>
              )}
              {contactModal.title && (
                <div className="flex items-center gap-3">
                  <User className="w-4 h-4 text-slate-400" />
                  <span className="text-slate-300">Title: {contactModal.title}</span>
                </div>
              )}
            </div>

            <div className="flex gap-2 mt-6">
              <button className="flex-1 px-4 py-2 bg-blue-500/20 border border-blue-500/30 text-blue-400 rounded-lg text-sm hover:bg-blue-500/30 transition-colors">
                Call Cell
              </button>
              {contactModal.radio && (
                <button className="flex-1 px-4 py-2 bg-slate-700/40 border border-slate-600/50 text-slate-300 rounded-lg text-sm hover:bg-slate-700/60 transition-colors">
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

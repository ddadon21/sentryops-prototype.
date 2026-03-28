import React, { useState, useEffect, useRef } from 'react';
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
  AlertTriangle,
  Gauge,
  Target,
  Zap
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';

export default function DailyCommandBrief() {
  const navigate = useNavigate();
  const [expandedItem, setExpandedItem] = useState(null);
  const [contactModal, setContactModal] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const decisionsSectionRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
  const formatDate = (date) => date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  const briefGeneratedAt = '06:00';

  // ============================================================
  // COMMAND PRESSURE INDEX — one-glance health signal
  // Calculated from: critical issues, compliance deadlines <72h,
  // staffing below threshold
  // ============================================================
  const pressureFactors = {
    criticalIssues: 3,
    complianceDeadlinesUnder72h: 2,
    staffingBelowThreshold: true,
    overdueItems: 1
  };

  const computePressureLevel = () => {
    let score = 0;
    score += pressureFactors.criticalIssues * 3;
    score += pressureFactors.complianceDeadlinesUnder72h * 2;
    if (pressureFactors.staffingBelowThreshold) score += 4;
    score += pressureFactors.overdueItems * 2;
    if (score >= 15) return { level: 'CRITICAL', color: 'red', bg: 'bg-red-500/[0.08]', border: 'border-red-500/30', text: 'text-red-600 dark:text-red-400', dot: 'bg-red-500', barWidth: '92%' };
    if (score >= 10) return { level: 'ELEVATED', color: 'amber', bg: 'bg-amber-500/[0.06]', border: 'border-amber-500/25', text: 'text-amber-600 dark:text-amber-400', dot: 'bg-amber-500', barWidth: '68%' };
    if (score >= 5) return { level: 'MODERATE', color: 'amber', bg: 'bg-amber-500/[0.04]', border: 'border-amber-500/15', text: 'text-amber-600 dark:text-amber-400', dot: 'bg-amber-400', barWidth: '45%' };
    return { level: 'LOW', color: 'emerald', bg: 'bg-emerald-500/[0.04]', border: 'border-emerald-500/15', text: 'text-emerald-600 dark:text-emerald-400', dot: 'bg-emerald-500', barWidth: '15%' };
  };

  const pressure = computePressureLevel();

  // ============================================================
  // SECTION A — COMMAND DECISIONS TODAY
  // Format: Title / Deadline / Exposure Type / Required Action / Escalation
  // ============================================================
  const commandDecisions = [
    {
      id: 'dec-001',
      title: 'H2-Pod HVAC Failure — Emergency Repair',
      deadline: '10:00 EST Today',
      deadlineHours: 4,
      exposureType: 'Compliance',
      exposureColor: 'text-red-600 dark:text-red-400',
      requiredAction: 'Authorize emergency HVAC contract ($23.5K) — required before 10:00 EST',
      owner: { name: 'Facilities Director Chen', badge: 'FAC-001', phone: '770-555-0123' },
      escalation: 'USMS / External Compliance',
      severity: 'critical',
      status: 'escalated',
      consequence: 'Federal audit failure — housing contract at risk',
      timeline: [
        { time: '03:00', event: 'HVAC compressor failure detected' },
        { time: '04:00', event: 'Emergency contractor quote: $23.5K' },
        { time: '05:30', event: 'Approval request submitted to Command' }
      ]
    },
    {
      id: 'dec-002',
      title: 'B-Shift Patrol Below Minimum — 9/12 Deputies',
      deadline: '12:00 EST Today',
      deadlineHours: 6,
      exposureType: 'Staffing',
      exposureColor: 'text-amber-600 dark:text-amber-400',
      requiredAction: 'Authorize B-Shift OT ($8.3K) — Zones 4 & 7 single-officer before 12:00 EST',
      owner: { name: 'Capt. Rodriguez', badge: '3042', phone: '770-555-3042' },
      escalation: 'Command',
      severity: 'high',
      status: 'pending',
      consequence: 'Two zones single-officer — liability exposure',
      timeline: [
        { time: '14:00', event: 'B-Shift started at 75% strength' },
        { time: '14:15', event: 'Zone coverage gap identified (4, 7)' },
        { time: '14:30', event: 'OT authorization request submitted' }
      ]
    },
    {
      id: 'dec-003',
      title: 'Use-of-Force Report — State Deadline Imminent',
      deadline: '10:00 EST Today',
      deadlineHours: 4,
      exposureType: 'Legal',
      exposureColor: 'text-red-600 dark:text-red-400',
      requiredAction: 'Direct Williams: submit UoF report or file state extension — deadline 10:00 EST',
      owner: { name: 'IA Supervisor Williams', badge: '5012', phone: '770-555-5012' },
      escalation: 'Legal / State Reporting',
      severity: 'high',
      status: 'overdue',
      consequence: 'State reporting violation — potential sanction',
      timeline: [
        { time: 'Yesterday 14:47', event: 'OC spray incident — Deputy Johnson, B-Pod' },
        { time: 'Yesterday 16:00', event: 'Initial report filed' },
        { time: 'Today 06:00', event: 'Internal review deadline passed (8h overdue)' }
      ]
    }
  ];

  // ============================================================
  // SECTION B — ESCALATING RISK (72 HOURS)
  // Items that worsen if untouched. Each has consequence line.
  // ============================================================
  const escalatingRisks = [
    {
      id: 'esc-001',
      title: 'POST Certification Expiration — 8 Deputies',
      hoursUntil: 48,
      category: 'Compliance',
      severity: 'critical',
      riskScore: 'High',
      owner: 'IA Supervisor Williams',
      ifNotResolved: 'Deputies lose certification → suspended from duty. 8-deputy staffing gap.',
      linkedModule: '/command/risk'
    },
    {
      id: 'esc-002',
      title: 'Jail Population Trending to 95% Capacity',
      hoursUntil: 72,
      category: 'Operations',
      severity: 'high',
      riskScore: 'High',
      owner: 'Detention Major Wilson',
      ifNotResolved: 'Intake restrictions triggered → court coordination required. 23 early release candidates pending.',
      linkedModule: '/command/calendar'
    },
    {
      id: 'esc-003',
      title: 'B-Shift Weekend Coverage Gap',
      hoursUntil: 36,
      category: 'Staffing',
      severity: 'high',
      riskScore: 'High',
      owner: 'Capt. Rodriguez',
      ifNotResolved: 'OT burn rate $4,160/day through weekend. 3 FMLA/Workers Comp absences unresolved.',
      linkedModule: '/command/personnel'
    },
    {
      id: 'esc-004',
      title: 'Fleet Units 312/318 — State Inspection Overdue Friday',
      hoursUntil: 60,
      category: 'Maintenance',
      severity: 'high',
      riskScore: 'Moderate',
      owner: 'Fleet Manager Anderson',
      ifNotResolved: '2 patrol units pulled from service → fleet at 86% availability.',
      linkedModule: '/command/budget'
    }
  ];

  // ============================================================
  // SECTION C — STRATEGIC EXPOSURE (7–14 DAYS)
  // Fixed countdowns, readiness %, owner, risk color
  // ============================================================
  const strategicExposure = [
    {
      id: 'str-001',
      title: 'USMS Federal Housing Inspection',
      countdown: '48h',
      countdownLabel: 'Inspection Window Opens',
      readiness: 82,
      openDeficiencies: 3,
      owner: 'Major Wilson',
      riskColor: 'red',
      impactTypes: ['Compliance', 'Political'],
      notes: 'H2-Pod HVAC (critical), C-Pod camera gap, documentation gaps'
    },
    {
      id: 'str-002',
      title: 'POST Certification Submission Window',
      countdown: '8 days',
      countdownLabel: 'Final Submission Deadline',
      readiness: 65,
      openDeficiencies: 8,
      owner: 'IA Supervisor Williams',
      riskColor: 'red',
      impactTypes: ['Compliance', 'Operational'],
      notes: '8 deputies at risk. Training records incomplete for 3.'
    },
    {
      id: 'str-003',
      title: 'Holiday Staffing Plan — Christmas/NYE',
      countdown: '10 days',
      countdownLabel: 'Coverage Begins',
      readiness: 40,
      openDeficiencies: null,
      owner: 'Capt. Rodriguez',
      riskColor: 'amber',
      impactTypes: ['Operational', 'Budget'],
      notes: 'Patrol min: 14/shift. Detention min: 22. OT budget not yet approved.'
    },
    {
      id: 'str-004',
      title: 'County Council Public Safety Briefing',
      countdown: '6 days',
      countdownLabel: 'Presentation Date',
      readiness: 70,
      openDeficiencies: null,
      owner: 'Sheriff Thompson',
      riskColor: 'amber',
      impactTypes: ['Political'],
      notes: 'Crime stats compiled. Staffing narrative needs update. Budget projections pending.'
    }
  ];

  // ============================================================
  // OPERATIONAL HIGHLIGHTS — Compressed to liability/staffing/compliance only
  // ============================================================
  const operationalHighlights = [
    { text: 'Jail at 92% capacity (848/920) — intake restrictions trigger at 95%', type: 'Compliance', severity: 'warning' },
    { text: 'UoF state report 8h overdue — sanctions possible if not filed by 10:00', type: 'Legal', severity: 'warning' },
    { text: '4.2 kg cocaine seizure, I-85 — media inquiry received, PIO response pending', type: 'Political', severity: 'info' }
  ];

  // Scheduled Events Data
  const scheduledEvents = [
    { id: 'evt-001', time: '09:00', title: 'Federal audit walkthrough', location: 'H-Pod', lead: 'Major Wilson', category: 'compliance', hoursUntil: 3 },
    { id: 'evt-002', time: '13:00', title: 'Use-of-force review board', location: 'Admin 2nd floor', lead: 'Chief Deputy Harris', category: 'internal', hoursUntil: 7 },
    { id: 'evt-003', time: '14:00', title: 'Courts coordination meeting', location: 'Admin Conference Room', lead: 'Major Wilson', category: 'operational', hoursUntil: 8 },
    { id: 'evt-004', time: '18:00', title: 'County Council public safety update', location: 'Government Center', lead: 'Sheriff Thompson', category: 'external', hoursUntil: 12 }
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

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 2000);
  };

  const getSeverityStripColor = (severity) => {
    if (severity === 'critical') return 'bg-red-500';
    if (severity === 'high') return 'bg-amber-500';
    return 'bg-slate-600';
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending': return { text: 'Pending', classes: 'bg-amber-100 border-amber-200 text-amber-700 dark:bg-amber-500/10 dark:border-amber-500/20 dark:text-amber-400' };
      case 'in_progress': return { text: 'In Progress', classes: 'bg-emerald-100 border-emerald-200 text-emerald-700 dark:bg-emerald-500/10 dark:border-emerald-500/20 dark:text-emerald-400' };
      case 'escalated': return { text: 'Escalated', classes: 'bg-red-100 border-red-200 text-red-700 dark:bg-red-500/10 dark:border-red-500/20 dark:text-red-400' };
      case 'overdue': return { text: 'Overdue', classes: 'bg-red-100 border-red-200 text-red-700 dark:bg-red-500/10 dark:border-red-500/20 dark:text-red-400' };
      default: return { text: status, classes: 'bg-slate-500/10 border-slate-500/20 text-slate-400' };
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'compliance': return 'text-amber-600 dark:text-amber-400';
      case 'operational': return 'text-amber-600 dark:text-amber-400';
      case 'external': return 'text-slate-400';
      case 'internal': return 'text-slate-400';
      default: return 'text-slate-400';
    }
  };

  return (
    <DashboardLayout>
      <div className="p-5 lg:p-8 bg-slate-100 dark:bg-transparent min-h-full">
        <div className="max-w-7xl mx-auto">

        {/* Page Header */}
        <div className="mb-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-1">Daily Command Brief</h2>
            <div className="flex items-center gap-2 text-[11px] text-slate-500">
              <span>{formatDate(currentTime)}</span>
              <span className="text-slate-700">·</span>
              <span>{formatTime(currentTime)} EST</span>
              <span className="text-slate-700">·</span>
              <span>Generated at {briefGeneratedAt} EST</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => window.print()} className="flex items-center gap-2 px-4 py-2 bg-slate-800/40 border border-slate-700/40 text-slate-700 dark:text-slate-300 rounded-lg text-[13px] font-medium hover:bg-slate-800/60 transition-all">
              <Printer className="w-4 h-4" />Print
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-slate-800/40 border border-slate-700/40 text-slate-700 dark:text-slate-300 rounded-lg text-[13px] font-medium hover:bg-slate-800/60 transition-all">
              <Download className="w-4 h-4" />PDF
            </button>
            <button onClick={handleRefresh} disabled={isRefreshing} className="flex items-center gap-2 px-4 py-2 bg-slate-800/40 border border-slate-700/40 text-slate-700 dark:text-slate-300 rounded-lg text-[13px] font-medium hover:bg-slate-800/60 transition-all disabled:opacity-50">
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />Refresh
            </button>
          </div>
        </div>

        {/* ================================================================
            COMMAND PRESSURE INDEX — Above everything
            One-glance health signal for the Sheriff
            ================================================================ */}
        <div className={`mb-5 ${pressure.bg} border ${pressure.border} rounded-xl overflow-hidden`}>
          <div className="px-5 py-3.5">
            {/* Line 1: Decision count — the headline */}
            <p className="text-[13px] text-white font-semibold mb-1">
              {commandDecisions.length} decisions required before 12:00 EST
            </p>
            {/* Line 2: Exposure categories — lighter weight */}
            <p className="text-[11px] text-slate-600 dark:text-slate-400 mb-2">
              Exposure: <span className="text-red-600 dark:text-red-400 font-medium">Compliance</span> + <span className="text-amber-600 dark:text-amber-400 font-medium">Staffing</span>
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Gauge className={`w-4 h-4 ${pressure.text}`} />
                <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest">Pressure</span>
                <div className="flex items-center gap-1.5">
                  <div className={`w-2 h-2 rounded-full ${pressure.dot} animate-pulse`}></div>
                  <span className={`text-sm font-bold tracking-wide ${pressure.text}`}>{pressure.level}</span>
                </div>
              </div>
              <div className="flex items-center gap-4 text-[11px]">
                <span className="text-slate-500"><span className="text-white font-semibold">{pressureFactors.criticalIssues}</span> critical</span>
                <span className="text-slate-600">|</span>
                <span className="text-slate-500"><span className="text-white font-semibold">{pressureFactors.complianceDeadlinesUnder72h}</span> compliance &lt;72h</span>
                <span className="text-slate-600">|</span>
                <span className={pressureFactors.staffingBelowThreshold ? 'text-red-600 dark:text-red-400 text-[11px] font-semibold' : 'text-emerald-600 dark:text-emerald-400 text-[11px]'}>{pressureFactors.staffingBelowThreshold ? 'Staffing deficit' : 'Staffing OK'}</span>
                <span className="text-slate-600">|</span>
                <span className="text-slate-500"><span className="text-white font-semibold">{pressureFactors.overdueItems}</span> overdue</span>
              </div>
            </div>
            {/* Line 3: Driver — small, diagnostic */}
            <p className="mt-1.5 text-[10px] text-slate-500">Driver: <span className={`font-semibold ${pressure.text}`}>Federal inspection (48h)</span> · HVAC open deficiency · B-Shift at 75%</p>
          </div>
          <div className="h-1 bg-slate-800/40">
            <div className={`h-full ${pressure.dot} transition-all duration-1000`} style={{ width: pressure.barWidth }}></div>
          </div>
        </div>

        {/* Commander Focus — mental anchor */}
        <div className="mb-5 px-5 py-2.5 bg-amber-500/[0.04] border border-amber-500/15 rounded-xl">
          <div className="flex items-start gap-2">
            <Target className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
            <span className="text-[13px] font-semibold text-amber-600 dark:text-amber-400 whitespace-nowrap">Command Focus Today:</span>
            <span className="text-[13px] text-slate-700 dark:text-slate-300">
              {commandDecisions.map((item, i) => (
                <span key={item.id}>
                  {i > 0 && <span className="text-slate-600"> · </span>}
                  <span className="text-white font-medium">{item.title.split('—')[0].trim()}</span>
                  <span className="text-slate-500"> ({item.deadlineHours}h)</span>
                </span>
              ))}
            </span>
          </div>
        </div>

        {/* ================================================================
            SECTION A — COMMAND DECISIONS TODAY
            "What decisions must I make today?"
            No narrative. Decision-focused.
            ================================================================ */}
        <div ref={decisionsSectionRef} className="mb-5 bg-white dark:bg-slate-800/25 border border-slate-200 dark:border-slate-700/30 rounded-xl">
          <div className="flex items-center justify-between px-5 py-3 border-b border-slate-700/15">
            <div className="flex items-center gap-2.5">
              <Zap className="w-4 h-4 text-red-600 dark:text-red-400" />
              <h3 className="text-[13px] font-semibold text-slate-900 dark:text-white uppercase tracking-wide">Command Decisions — Today</h3>
            </div>
            <span className="text-[11px] text-slate-500">{commandDecisions.length} items requiring decision</span>
          </div>

          <div className="px-5 py-3 space-y-1">
            {commandDecisions.map((item) => {
              const statusBadge = getStatusBadge(item.status);
              const isExpanded = expandedItem === item.id;
              return (
                <div
                  key={item.id}
                  className={`rounded-lg border transition-colors ${
                    item.severity === 'critical'
                      ? 'border-red-500/20 bg-red-500/[0.03]'
                      : 'border-slate-700/20'
                  }`}
                >
                  <div
                    className="p-3 cursor-pointer hover:bg-slate-800/20 transition-colors"
                    onClick={() => setExpandedItem(isExpanded ? null : item.id)}
                  >
                    {/* Row 1: Title + Status badges */}
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`w-1 self-stretch rounded-full flex-shrink-0 ${getSeverityStripColor(item.severity)}`}></div>
                      <p className="text-sm font-semibold text-slate-900 dark:text-white flex-1">{item.title}</p>
                      <span className={`px-1.5 py-0.5 border rounded text-[11px] font-medium ${statusBadge.classes}`}>{statusBadge.text}</span>
                      {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-600" /> : <ChevronDown className="w-4 h-4 text-slate-600" />}
                    </div>

                    {/* Row 2: Decision metadata — structured, not narrative */}
                    <div className="ml-3 grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-1.5 text-[11px]">
                      <div>
                        <span className="text-slate-600 uppercase tracking-wider text-[10px]">Deadline</span>
                        <p className={`font-semibold mt-0.5 ${item.severity === 'critical' ? 'text-red-600 dark:text-red-400' : 'text-amber-600 dark:text-amber-400'}`}>{item.deadline}</p>
                      </div>
                      <div>
                        <span className="text-slate-600 uppercase tracking-wider text-[10px]">Exposure</span>
                        <p className={`font-semibold mt-0.5 ${item.exposureColor}`}>{item.exposureType}</p>
                      </div>
                      <div className="col-span-2 lg:col-span-1">
                        <span className="text-slate-600 uppercase tracking-wider text-[10px]">Required Action</span>
                        <p className="text-white font-medium mt-0.5">{item.requiredAction}</p>
                      </div>
                      <div>
                        <span className="text-slate-600 uppercase tracking-wider text-[10px]">Escalation</span>
                        <p className="text-slate-600 dark:text-slate-400 mt-0.5">{item.escalation}</p>
                      </div>
                    </div>

                    {/* Row 3: Owner + consequence */}
                    <div className="ml-3 mt-2 flex items-center gap-3 text-[11px]">
                      <span className="text-slate-500">{item.owner.name} · #{item.owner.badge}</span>
                      <span className="text-slate-700">|</span>
                      <span className="text-red-600 dark:text-red-400/70">If delayed → {item.consequence}</span>
                    </div>
                  </div>

                  {/* Expanded: Timeline only (no paragraph) */}
                  {isExpanded && (
                    <div className="px-3 pb-3 ml-3 border-t border-slate-700/15 pt-3">
                      <div className="flex items-start gap-6">
                        <div className="flex-1">
                          <h4 className="text-[10px] font-semibold text-slate-600 uppercase tracking-widest mb-2">Event Timeline</h4>
                          <div className="space-y-1">
                            {item.timeline.map((entry, idx) => (
                              <div key={idx} className="flex items-start gap-3 text-[12px]">
                                <span className="font-mono text-slate-500 w-28 flex-shrink-0">{entry.time}</span>
                                <span className="text-slate-700 dark:text-slate-300">{entry.event}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={(e) => { e.stopPropagation(); setContactModal(item.owner); }}
                            className="px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-400 border border-slate-700/30 hover:bg-slate-700/20 rounded-lg transition-colors"
                          >
                            Contact Owner
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ================================================================
            SECTION B — STRATEGIC EXPOSURE (7–14 DAYS)
            Countdowns, readiness %, owner, risk color
            ================================================================ */}
        <div className="mb-5 bg-white dark:bg-slate-800/25 border border-slate-200 dark:border-slate-700/30 rounded-xl">
          <div className="flex items-center justify-between px-5 py-3 border-b border-slate-700/15">
            <div className="flex items-center gap-2.5">
              <Shield className="w-4 h-4 text-slate-600 dark:text-slate-400" />
              <h3 className="text-[13px] font-semibold text-slate-900 dark:text-white uppercase tracking-wide">Strategic Exposure — 7 to 14 Days</h3>
            </div>
            <span className="text-[11px] text-slate-500">Audit, certification & inspection readiness</span>
          </div>

          <div className="px-5 py-3 grid grid-cols-1 lg:grid-cols-2 gap-3">
            {strategicExposure.map(item => {
              const riskColors = {
                red: { bg: 'bg-red-500/[0.04]', border: 'border-red-500/15', text: 'text-red-600 dark:text-red-400', bar: 'bg-red-500' },
                amber: { bg: 'bg-amber-500/[0.03]', border: 'border-amber-500/12', text: 'text-amber-600 dark:text-amber-400', bar: 'bg-amber-500' }
              };
              const rc = riskColors[item.riskColor];
              return (
                <div key={item.id} className={`${rc.bg} border ${rc.border} rounded-lg p-3.5`}>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="text-sm font-semibold text-slate-900 dark:text-white leading-tight">{item.title}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <span className="text-[10px] text-slate-500">Impact:</span>
                        {item.impactTypes.map(type => (
                          <span key={type} className={`px-1 py-0 border rounded text-[9px] font-semibold ${
                            type === 'Compliance' ? 'bg-red-100 border-red-200 text-red-700 dark:bg-red-500/10 dark:border-red-500/20 dark:text-red-400' :
                            type === 'Political' ? 'bg-purple-500/10 border-purple-500/20 text-purple-400' :
                            type === 'Budget' ? 'bg-amber-100 border-amber-200 text-amber-700 dark:bg-amber-500/10 dark:border-amber-500/20 dark:text-amber-400' :
                            'bg-slate-500/10 border-slate-500/20 text-slate-400'
                          }`}>{type}</span>
                        ))}
                      </div>
                    </div>
                    <div className={`flex-shrink-0 ml-3 text-right`}>
                      <p className={`text-xl font-bold ${rc.text}`}>{item.countdown}</p>
                      <p className="text-[10px] text-slate-500 mt-0.5">{item.countdownLabel}</p>
                    </div>
                  </div>

                  {/* Readiness bar */}
                  <div className="mb-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Readiness</span>
                      <span className={`text-[12px] font-bold ${item.readiness >= 80 ? 'text-emerald-600 dark:text-emerald-400' : item.readiness >= 60 ? 'text-amber-600 dark:text-amber-400' : 'text-red-600 dark:text-red-400'}`}>{item.readiness}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-700/30 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${item.readiness >= 80 ? 'bg-emerald-500' : item.readiness >= 60 ? 'bg-amber-500' : 'bg-red-500'}`}
                        style={{ width: `${item.readiness}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Metadata */}
                  <div className="flex items-center gap-3 text-[11px]">
                    <span className="text-slate-500">Owner: <span className="text-slate-700 dark:text-slate-300">{item.owner}</span></span>
                    {item.openDeficiencies !== null && (
                      <>
                        <span className="text-slate-700">|</span>
                        <span className={`${rc.text}`}>{item.openDeficiencies} open deficiencies</span>
                      </>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1.5">{item.notes}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* ================================================================
            SECTION C — ESCALATING RISK (72 HOURS)
            Visually subordinate — items that worsen if untouched
            ================================================================ */}
        <div className="mb-5 bg-slate-800/15 border border-slate-700/20 rounded-lg">
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-700/10">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400/70" />
              <h3 className="text-[12px] font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wide">Escalating Risk — Next 72 Hours</h3>
            </div>
            <span className="text-[10px] text-slate-500">Worsens if untouched</span>
          </div>

          <div className="px-4 py-2.5 space-y-0.5">
            {escalatingRisks.map(risk => (
              <button
                key={risk.id}
                onClick={() => navigate(risk.linkedModule)}
                className="w-full rounded border border-slate-700/15 hover:bg-slate-50 dark:hover:bg-slate-800/15 transition-colors text-left"
              >
                <div className="px-3 py-2">
                  <div className="flex items-center gap-2 mb-1">
                    <div className={`w-0.5 h-3.5 rounded-full flex-shrink-0 ${risk.severity === 'critical' ? 'bg-red-500' : 'bg-amber-500/70'}`}></div>
                    <p className="text-[13px] font-medium text-slate-200 flex-1">{risk.title}</p>
                    <span className={`px-1.5 py-0.5 border rounded text-[10px] font-semibold ${
                      risk.severity === 'critical' ? 'bg-red-100 border-red-200 text-red-700 dark:bg-red-500/10 dark:border-red-500/20 dark:text-red-400' : 'bg-amber-500/10 border-amber-500/15 text-amber-600 dark:text-amber-400/80'
                    }`}>
                      {risk.hoursUntil}h
                    </span>
                    <span className={`px-1.5 py-0.5 border rounded text-[10px] font-semibold ${
                      risk.riskScore === 'High' ? 'bg-red-500/10 border-red-500/15 text-red-600 dark:text-red-400/80' :
                      'bg-amber-500/8 border-amber-500/12 text-amber-600 dark:text-amber-400/70'
                    }`}>
                      {risk.riskScore}
                    </span>
                  </div>
                  <div className="ml-2.5 flex items-center gap-2 text-[11px]">
                    <span className="text-red-600 dark:text-red-400/60">If not resolved → {risk.ifNotResolved}</span>
                  </div>
                  <div className="ml-2.5 mt-1 text-[10px] text-slate-500">
                    {risk.owner} · {risk.category}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Two Column Layout — Compressed highlights + On Duty */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-5">
          {/* Operational Highlights — liability/staffing/compliance ONLY */}
          <div className="bg-white dark:bg-slate-800/25 border border-slate-200 dark:border-slate-700/30 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-[13px] font-semibold text-slate-900 dark:text-white uppercase tracking-wide">Operational Highlights</h3>
              <span className="text-[11px] text-slate-500">Liability · Staffing · Compliance only</span>
            </div>

            <div className="space-y-2.5">
              {operationalHighlights.map((highlight, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${highlight.severity === 'warning' ? 'bg-amber-500' : 'bg-slate-500'}`}></div>
                  <div>
                    <p className="text-[13px] text-slate-700 dark:text-slate-300">{highlight.text}</p>
                    <span className={`text-[10px] font-semibold uppercase tracking-wider ${
                      highlight.type === 'Legal' || highlight.type === 'Compliance' ? 'text-red-600 dark:text-red-400/60' :
                      highlight.type === 'Political' ? 'text-amber-600 dark:text-amber-400/60' : 'text-slate-500'
                    }`}>{highlight.type}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* On Duty Today */}
          <div className="bg-white dark:bg-slate-800/25 border border-slate-200 dark:border-slate-700/30 rounded-xl p-4">
            <h3 className="text-[13px] font-semibold text-slate-900 dark:text-white uppercase tracking-wide mb-3">On Duty Today</h3>
            <div className="space-y-3">
              <div>
                <span className="text-[10px] font-semibold text-slate-600 uppercase tracking-wider">Watch Commander</span>
                <div className="mt-1 flex items-center gap-2">
                  <button onClick={() => setContactModal(onDutyData.watchCommander)} className="text-sm font-medium text-slate-900 dark:text-white hover:text-slate-700 dark:text-slate-300 transition-colors">{onDutyData.watchCommander.name}</button>
                  <span className="text-[11px] text-slate-500">#{onDutyData.watchCommander.badge} · Radio: {onDutyData.watchCommander.radio}</span>
                </div>
              </div>
              <div className="border-t border-slate-700/20 pt-2.5">
                <span className="text-[10px] font-semibold text-slate-600 uppercase tracking-wider">Patrol Supervisors</span>
                <div className="mt-1 space-y-1">
                  {onDutyData.patrolSupervisors.map((sup, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <button onClick={() => setContactModal(sup)} className="text-sm font-medium text-slate-900 dark:text-white hover:text-slate-700 dark:text-slate-300 transition-colors">{sup.name}</button>
                      <span className="text-[11px] text-slate-500">#{sup.badge} · {sup.radio}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="border-t border-slate-700/20 pt-2.5">
                <span className="text-[10px] font-semibold text-slate-600 uppercase tracking-wider">Detention Commander</span>
                <div className="mt-1 flex items-center gap-2">
                  <button onClick={() => setContactModal(onDutyData.detentionCommander)} className="text-sm font-medium text-slate-900 dark:text-white hover:text-slate-700 dark:text-slate-300 transition-colors">{onDutyData.detentionCommander.name}</button>
                  <span className="text-[11px] text-slate-500">#{onDutyData.detentionCommander.badge} · {onDutyData.detentionCommander.radio}</span>
                </div>
              </div>
              <div className="border-t border-slate-700/20 pt-2.5">
                <span className="text-[10px] font-semibold text-slate-600 uppercase tracking-wider">On-Call Command</span>
                <div className="mt-1 flex items-center gap-2">
                  <button onClick={() => setContactModal(onDutyData.onCallCommand)} className="text-sm font-medium text-slate-900 dark:text-white hover:text-slate-700 dark:text-slate-300 transition-colors">{onDutyData.onCallCommand.name}</button>
                  <span className="text-[11px] text-slate-500">Cell: {onDutyData.onCallCommand.phone}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scheduled Events — Compact */}
        <div className="mb-5 bg-white dark:bg-slate-800/25 border border-slate-200 dark:border-slate-700/30 rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-[13px] font-semibold text-slate-900 dark:text-white uppercase tracking-wide">Today's Schedule</h3>
            <button onClick={() => navigate('/command/calendar')} className="text-xs text-amber-600 dark:text-amber-400/80 hover:text-amber-300">View Full Calendar →</button>
          </div>
          <div className="space-y-1">
            {scheduledEvents.map((event) => (
              <div
                key={event.id}
                className={`flex items-center gap-4 px-4 py-2 rounded ${
                  event.hoursUntil <= 2 ? 'bg-amber-500/5 border-l-[3px] border-l-amber-500/30' : 'bg-slate-900/20 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-all'
                }`}
              >
                <div className="flex flex-col items-start w-14 flex-shrink-0">
                  <span className="text-[13px] font-mono font-semibold text-slate-700 dark:text-slate-300">{event.time}</span>
                  <span className="text-[10px] text-slate-500">in {event.hoursUntil}h</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    {event.hoursUntil <= 2 && <Clock className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />}
                    <span className="text-[13px] font-medium text-slate-900 dark:text-white">{event.title}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-0.5 text-[11px]">
                    <span className="text-slate-600 dark:text-slate-400">{event.location}</span>
                    <span className="text-slate-600">·</span>
                    <span className="text-slate-600 dark:text-slate-400">{event.lead}</span>
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
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setContactModal(null)} />
          <div className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/50 rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <div className="flex items-start gap-3 mb-5">
              <div className="flex-1">
                <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-0.5">Contact: {contactModal.name}</h3>
                {contactModal.title && <p className="text-xs text-slate-600 dark:text-slate-400">{contactModal.title}</p>}
              </div>
              <button onClick={() => setContactModal(null)} className="text-slate-600 dark:text-slate-400 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-3 text-sm">
              {contactModal.badge && (
                <div className="flex items-center gap-3"><User className="w-4 h-4 text-slate-500" /><span className="text-slate-700 dark:text-slate-300">Badge: #{contactModal.badge}</span></div>
              )}
              {contactModal.radio && (
                <div className="flex items-center gap-3"><Radio className="w-4 h-4 text-slate-500" /><span className="text-slate-700 dark:text-slate-300">Radio: {contactModal.radio}</span></div>
              )}
              {contactModal.phone && (
                <div className="flex items-center gap-3"><Phone className="w-4 h-4 text-slate-500" /><span className="text-slate-700 dark:text-slate-300">Cell: {contactModal.phone}</span></div>
              )}
              {contactModal.email && (
                <div className="flex items-center gap-3"><Building2 className="w-4 h-4 text-slate-500" /><span className="text-slate-700 dark:text-slate-300">{contactModal.email}</span></div>
              )}
              {contactModal.onDutySince && (
                <div className="flex items-center gap-3"><Clock className="w-4 h-4 text-slate-500" /><span className="text-slate-700 dark:text-slate-300">On Duty Since: {contactModal.onDutySince}</span></div>
              )}
            </div>
            <div className="flex gap-3 mt-6">
              <button className="flex-1 px-4 py-2.5 text-xs font-medium text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/10 rounded-xl transition-colors">Call Cell</button>
              {contactModal.radio && (
                <button className="flex-1 px-4 py-2.5 text-xs font-medium text-slate-600 dark:text-slate-400 border border-slate-700/30 hover:bg-slate-700/20 rounded-xl transition-colors">Radio Contact</button>
              )}
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

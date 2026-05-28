import React, { useState, useEffect, useRef } from 'react';
import {
  Users, AlertCircle, CheckCircle, Shield, ThumbsUp, XCircle,
  ChevronDown, ChevronUp, ArrowUpRight, ArrowDownRight, ArrowRight,
  Zap, Clock, AlertTriangle, Activity, TrendingUp, TrendingDown,
  MapPin, FileText, Target, Building2, UserCheck, ShieldAlert,
  BadgeCheck
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import DashboardLayout from '../layouts/DashboardLayout';

export default function CommandDashboard() {
  const navigate = useNavigate();

  // ── existing state ──────────────────────────────────────────────────────────
  const [selectedApproval, setSelectedApproval] = useState(null);
  const [approvalAction, setApprovalAction] = useState(null);
  const [actionComment, setActionComment] = useState('');
  const [toastMessage, setToastMessage] = useState(null);
  const [aiBriefExpanded, setAiBriefExpanded] = useState(false);
  const [hoveredDivision, setHoveredDivision] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  // ── new state ────────────────────────────────────────────────────────────────
  const [actionedCommandActions, setActionedCommandActions] = useState(new Set());
  const toastTimerRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) =>
    date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });

  const formatDate = (date) =>
    date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  const getGreeting = (date, name) => {
    const hour = date.getHours();
    let greeting;
    if (hour >= 5 && hour < 12) greeting = 'Good morning';
    else if (hour >= 12 && hour < 17) greeting = 'Good afternoon';
    else if (hour >= 17 && hour < 21) greeting = 'Good evening';
    else greeting = 'Hey';
    return name ? `${greeting}, ${name}` : greeting;
  };

  // ── Command Actions data ────────────────────────────────────────────────────
  const commandActions = [
    {
      id: 'ca-1',
      urgency: 'Critical',
      decision: 'Approve emergency HVAC repair for Detention H2-Pod.',
      ifIgnored: 'If ignored, ACA accreditation is at risk and USMS inspection fails — pod temperature at 84°F.',
      timeSensitivity: 'Deadline: Within 72 hours',
      countdown: '2 days remaining',
      immediateImpact: 'Repair contractor is dispatched, ACA compliance clock stops.',
      shortTermOutcome: 'H2-Pod temperature restored before USMS inspection Dec 12.',
      rationale: 'Based on ACA compliance threshold and USMS inspection window.',
      actionLabel: 'Approve',
      financial: '$23,500'
    },
    {
      id: 'ca-2',
      urgency: 'Critical',
      decision: 'Authorize B-Shift overtime to restore minimum patrol coverage.',
      ifIgnored: 'If ignored, Patrol B-Shift stays at 75% — response time degrades 18% in Zones 4 and 7.',
      timeSensitivity: 'Deadline: Next shift briefing',
      countdown: 'Before 18:00 today',
      immediateImpact: 'OT roster filled and Zone 4 / 7 coverage restored.',
      shortTermOutcome: 'Response time returns to baseline within first hour of shift.',
      rationale: 'Based on CAD roster gap and minimum-safe-staffing thresholds.',
      actionLabel: 'Approve',
      financial: '$8,320'
    },
    {
      id: 'ca-3',
      urgency: 'High',
      decision: 'Extend DEA surveillance authorization for Narcotics Case #2024-1847.',
      ifIgnored: 'If ignored, multi-agency operation halts tonight and fentanyl targets disperse.',
      timeSensitivity: 'Deadline: End of day',
      countdown: '8h remaining',
      immediateImpact: 'Surveillance authority remains active through next operational cycle.',
      shortTermOutcome: 'Task force maintains controlled tracking on all targets.',
      rationale: 'Based on expiring legal authorization and active DEA dependency.',
      actionLabel: 'Approve',
      financial: '$12,000'
    },
    {
      id: 'ca-4',
      urgency: 'Normal',
      decision: 'Sign 3 policy documents pending command signature before USMS inspection.',
      ifIgnored: 'If ignored, USMS inspection readiness drops below 94% — finding risk increases.',
      timeSensitivity: 'Deadline: Dec 11 (day before inspection)',
      immediateImpact: 'Policy tracker shows full signature compliance.',
      shortTermOutcome: 'USMS inspection readiness reaches 100% for policy category.',
      rationale: 'Based on USMS inspection checklist and outstanding signature log.',
      actionLabel: 'Escalate',
      financial: null
    }
  ];

  // ── Cross-Module Risk data ──────────────────────────────────────────────────
  const moduleRisks = [
    {
      id: 'mod-patrol',
      module: 'Patrol Ops',
      utilization: 75,
      risk: 'High',
      bottleneck: 'B-Shift at 75% — Zones 4 & 7 uncovered. OT authorization pending.',
      action: 'Review Staffing',
      route: 'PersonnelOverview'
    },
    {
      id: 'mod-detention',
      module: 'Detention',
      utilization: 91,
      risk: 'High',
      bottleneck: '91.5% capacity. H2-Pod HVAC failure. USMS inspection in 2 days.',
      action: 'View Approvals',
      route: 'Approvals'
    },
    {
      id: 'mod-investigations',
      module: 'Criminal Investigations',
      utilization: 88,
      risk: 'Moderate',
      bottleneck: 'DEA surveillance expires today. 4 critical-priority cases require command decisions.',
      action: 'View Cases',
      route: 'ActiveCases'
    },
    {
      id: 'mod-hr',
      module: 'HR & Staffing',
      utilization: 92,
      risk: 'Moderate',
      bottleneck: '14 vacancies (7.8%). OT spend 19% above allocation. 2 FMLA absences in Patrol.',
      action: 'View Personnel',
      route: 'PersonnelOverview'
    }
  ];

  // ── Approval items ──────────────────────────────────────────────────────────
  const dashboardApprovals = [
    {
      id: 1, type: 'Use of Force Review', name: 'Deputy Johnson, Marcus #D-4167',
      details: 'B-Pod incident — OC spray deployment on inmate MARTINEZ',
      tier: 'critical', division: 'Detention', title: 'Use of Force Review',
      context: 'Inmate refused direct orders, took fighting stance. OC spray deployed. Full restraint applied. Medical evaluation completed — no injuries. Body cam footage available.',
      submittedBy: 'Shift Supervisor Williams', timePendingMinutes: 15,
      deadline: '24 hours', impact: 'Compliance deadline', financial: null
    },
    {
      id: 2, type: 'Emergency Purchase', name: 'Detention — Major Wilson',
      details: 'H2-Pod HVAC Repairs', tier: 'critical', division: 'Detention Facilities',
      title: 'Emergency Purchase Order',
      context: 'Critical HVAC failure in H2-Pod. Temperature at 84°F. Immediate repair required to maintain ACA accreditation standards.',
      submittedBy: 'Facilities Director Chen', timePendingMinutes: 120,
      deadline: 'Immediate', impact: 'ACA compliance risk', financial: '$23,500'
    },
    {
      id: 3, type: 'Overtime Authorization', name: 'Patrol — Capt. Rodriguez',
      details: 'B-Shift staffing shortage — 160 hrs @ $52/hr',
      tier: 'action', division: 'Patrol', title: 'Overtime Authorization',
      context: '3 deputies out (2 FMLA, 1 Workers Comp). Minimum staffing requires 12 road deputies. Requesting OT authorization for next 2 weeks.',
      submittedBy: 'Capt. Rodriguez', timePendingMinutes: 90,
      deadline: '48 hours', impact: 'Below min staffing', financial: '$8,320'
    },
    {
      id: 4, type: 'Vehicle Replacement', name: 'Fleet Mgmt — Anderson',
      details: 'Patrol Unit 247 — total loss (pursuit)',
      tier: 'action', division: 'Support Services', title: 'Emergency Vehicle Replacement',
      context: 'Unit 247 totaled in pursuit. Insurance claim filed. Immediate replacement needed — patrol fleet at minimum operational capacity.',
      submittedBy: 'Fleet Manager Anderson', timePendingMinutes: 240,
      deadline: '72 hours', impact: 'Fleet at min capacity', financial: '$48,500'
    },
    {
      id: 5, type: 'Hiring Decision', name: 'Rodriguez, Elena M.',
      details: 'Certified CO — Detention Division', tier: 'standard', division: 'Detention',
      title: 'Hiring Decision',
      context: 'Background investigation complete. 5 years experience. All certifications current. Detention at 94% staffing — approval needed to extend offer.',
      submittedBy: 'HR Director Thompson', timePendingMinutes: 1440,
      deadline: '5 days', impact: 'Position vacant 45 days', financial: null
    },
    {
      id: 6, type: 'Policy Exception', name: 'Lt. Anderson — Investigations',
      details: 'Extended surveillance — Narcotics Case #2024-1847',
      tier: 'standard', division: 'Investigations', title: 'Policy Exception Request',
      context: 'Multi-agency narcotics investigation. DEA requesting 30-day extension for surveillance operations.',
      submittedBy: 'Lt. Anderson', timePendingMinutes: 2880,
      deadline: '7 days', impact: null, financial: '$12,000'
    },
    {
      id: 7, type: 'Leave Request', name: 'Deputy Chen, Michael #D-4521',
      details: 'FMLA — Medical leave: Dec 15 – Jan 5',
      tier: 'standard', division: 'Detention', title: 'FMLA Leave Request',
      context: 'Approved medical procedure. FMLA documentation complete. Coverage plan submitted by Sgt. Williams.',
      submittedBy: 'Deputy Chen', timePendingMinutes: 720,
      deadline: '10 days', impact: null, financial: null
    },
    {
      id: 8, type: 'Training Authorization', name: 'Detention — Sgt. Williams',
      details: 'CIT Training — 8 deputies', tier: 'standard', division: 'Training',
      title: 'Training Authorization',
      context: '40-hour CIT certification. Addresses mental health incidents in detention. Grant funding available for 50% reimbursement.',
      submittedBy: 'Training Coordinator Smith', timePendingMinutes: 4320,
      deadline: '14 days', impact: null, financial: '$6,400'
    }
  ];

  const divisions = [
    { name: 'Patrol', status: 'B-Shift 75%', severity: 'red', staffing: '56/65', route: 'PersonnelOverview',
      drill: 'Min required: 12 deputies\nCurrently deployed: 9\nCoverage risk: Zones 4, 7' },
    { name: 'Detention', status: '91.5% Capacity', severity: 'amber', staffing: '45/48', route: null,
      drill: 'Population: 1,098 / 1,200\nFederal holds: 247\nMedical: 14 current' },
    { name: 'Investigations', status: '1 Escalation', severity: 'amber', staffing: '22/25', route: null,
      drill: 'Active cases: 142\nDEA joint op pending\n3 positions posted' },
    { name: 'Court Services', status: 'Stable', severity: 'green', staffing: '18/18', route: null,
      drill: 'All courtrooms covered\nTransport schedule nominal' },
    { name: 'Support Services', status: 'Stable', severity: 'green', staffing: '23/22', route: null,
      drill: '1 grant-funded position\nFleet at min capacity' }
  ];

  const activeIncidentCount = 3;
  const topApprovals = dashboardApprovals.slice(0, 3);

  // ── Helpers ─────────────────────────────────────────────────────────────────
  const getTimePending = (minutesAgo) => {
    if (minutesAgo < 60) return `${minutesAgo}m`;
    if (minutesAgo < 1440) return `${Math.floor(minutesAgo / 60)}h`;
    return `${Math.floor(minutesAgo / 1440)}d`;
  };

  const getTierBadge = (tier) => {
    if (tier === 'critical') return { text: 'CRITICAL', classes: 'bg-red-100 border-red-200 text-red-700 dark:bg-red-500/10 dark:border-red-500/20 dark:text-red-400' };
    if (tier === 'action') return { text: 'ACTION', classes: 'bg-amber-100 border-amber-200 text-amber-700 dark:bg-amber-500/10 dark:border-amber-500/20 dark:text-amber-400' };
    return null;
  };

  const getUrgencyAccent = (urgency) => {
    if (urgency === 'Critical') return 'border-l-red-500';
    if (urgency === 'High') return 'border-l-amber-500';
    return 'border-l-blue-500';
  };

  const getUrgencyBadge = (urgency) => {
    if (urgency === 'Critical') return 'bg-red-100 border-red-200 text-red-700 dark:bg-red-500/10 dark:border-red-500/20 dark:text-red-400';
    if (urgency === 'High') return 'bg-amber-100 border-amber-200 text-amber-700 dark:bg-amber-500/10 dark:border-amber-500/20 dark:text-amber-400';
    return 'bg-blue-100 border-blue-200 text-blue-700 dark:bg-blue-500/10 dark:border-blue-500/20 dark:text-blue-400';
  };

  const getActionBtnClass = (urgency) => {
    if (urgency === 'Critical') return 'bg-red-600 border-red-700 text-white hover:bg-red-700';
    if (urgency === 'High') return 'bg-amber-600 border-amber-700 text-white hover:bg-amber-700';
    return 'bg-blue-600 border-blue-700 text-white hover:bg-blue-700';
  };

  const getRiskBadge = (risk) => {
    if (risk === 'High') return 'bg-red-100 border-red-200 text-red-700 dark:bg-red-500/10 dark:border-red-500/20 dark:text-red-400';
    if (risk === 'Moderate') return 'bg-amber-100 border-amber-200 text-amber-700 dark:bg-amber-500/10 dark:border-amber-500/20 dark:text-amber-400';
    return 'bg-emerald-100 border-emerald-200 text-emerald-700 dark:bg-emerald-500/10 dark:border-emerald-500/20 dark:text-emerald-400';
  };

  const getRiskBar = (risk) => {
    if (risk === 'High') return 'bg-red-500';
    if (risk === 'Moderate') return 'bg-amber-500';
    return 'bg-emerald-500';
  };

  // ── Action handlers ──────────────────────────────────────────────────────────
  const handleCommandAction = (action) => {
    setActionedCommandActions(prev => new Set([...prev, action.id]));
    showToast(`${action.actionLabel} recorded — ${action.decision.slice(0, 60)}…`, 'success');
  };

  const openApprovalModal = (approval, action, e) => {
    e.stopPropagation();
    setSelectedApproval(approval);
    setApprovalAction(action);
    setActionComment('');
  };

  const closeApprovalModal = () => {
    setSelectedApproval(null);
    setApprovalAction(null);
    setActionComment('');
  };

  const confirmApprovalAction = () => {
    if (approvalAction === 'deny' && !actionComment.trim()) {
      showToast('Please provide a reason for denial', 'error');
      return;
    }
    const actionText = approvalAction === 'approve' ? 'approved' : 'denied';
    showToast(`${selectedApproval.title} ${actionText} successfully`, 'success');
    closeApprovalModal();
  };

  const showToast = (message, type = 'success') => {
    setToastMessage({ message, type });
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => setToastMessage(null), 3500);
  };

  const criticalActionCount = commandActions.filter(a => a.urgency === 'Critical').length;
  const pendingActionCount = commandActions.filter(a => !actionedCommandActions.has(a.id)).length;

  return (
    <DashboardLayout>
      <div className="p-5 lg:p-8 space-y-8 bg-slate-100 dark:bg-transparent min-h-full">

        {/* Page Header */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
              {getGreeting(currentTime, 'Sheriff Thompson')}
            </h2>
            <div className="flex items-center gap-2 text-[11px] text-slate-500">
              <span>{formatDate(currentTime)}</span>
              <span>·</span>
              <span>{formatTime(currentTime)} EST</span>
              <span>·</span>
              <span>Updated 2 minutes ago</span>
              <span>·</span>
              <span className="text-amber-700 dark:text-amber-400 font-semibold">{pendingActionCount} command decisions pending</span>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/30 rounded-lg">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
              <span className="text-xs font-medium text-slate-600 dark:text-slate-300">All Systems Operational</span>
            </div>
          </div>
        </div>

        {/* COMMAND ACTIONS */}
        <div className="bg-white dark:bg-slate-800/25 border border-slate-200 dark:border-slate-700/30 rounded-xl shadow-sm dark:shadow-none overflow-hidden">
          <div className="flex items-center justify-between gap-3 px-5 py-3 border-b border-slate-200 dark:border-slate-700/30">
            <div className="flex items-center gap-3">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-widest">
                Command Actions — Immediate Decisions Required
              </span>
            </div>
            <span className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-700/30 border border-slate-200 dark:border-slate-600/30 text-[11px] font-bold text-slate-800 dark:text-slate-200">
              {criticalActionCount} Critical Decisions
            </span>
          </div>

          <div className="p-4 space-y-3.5">
            {commandActions.map((action) => {
              const isActioned = actionedCommandActions.has(action.id);
              return (
                <div
                  key={action.id}
                  className={`rounded-lg border border-l-[3px] ${getUrgencyAccent(action.urgency)} p-4 transition-all ${
                    isActioned
                      ? 'bg-emerald-50/40 dark:bg-emerald-500/5 border-slate-200 dark:border-slate-700/20 opacity-70'
                      : 'bg-slate-50 dark:bg-slate-900/30 border-slate-200 dark:border-slate-700/30'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    {/* Left badges */}
                    <div className="flex flex-col gap-2 items-start flex-shrink-0">
                      {isActioned ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded border bg-emerald-100 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-[10px] font-bold uppercase tracking-wide">
                          <CheckCircle className="w-3 h-3" /> Actioned
                        </span>
                      ) : (
                        <>
                          <span className={`inline-flex items-center px-2 py-0.5 rounded border text-[10px] font-bold uppercase tracking-wide ${getUrgencyBadge(action.urgency)}`}>
                            {action.urgency}
                          </span>
                          {action.countdown && (
                            <span className="px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-700/40 text-slate-700 dark:text-slate-200 text-[10px] font-semibold tracking-wide">
                              {action.countdown}
                            </span>
                          )}
                        </>
                      )}
                    </div>

                    {/* Main content */}
                    <div className="flex-1 min-w-0 space-y-1.5">
                      <p className={`text-[14px] font-bold leading-5 ${isActioned ? 'text-slate-500 dark:text-slate-400 line-through' : 'text-slate-900 dark:text-slate-100'}`}>
                        Decision required: {action.decision}
                      </p>
                      {!isActioned && (
                        <>
                          <p className="text-[12px] text-slate-800 dark:text-slate-200 font-medium">
                            At risk if ignored: {action.ifIgnored}
                          </p>
                          <p className="text-[12px] text-slate-700 dark:text-slate-300 font-semibold">
                            {action.timeSensitivity}
                            {action.financial && (
                              <span className="ml-2 text-slate-500 font-normal">· {action.financial}</span>
                            )}
                          </p>
                          <p className="text-[11px] text-slate-600 dark:text-slate-400">
                            AI reasoning: {action.rationale}
                          </p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[10px] pt-0.5">
                            <div>
                              <p className="font-semibold text-slate-700 dark:text-slate-200 uppercase tracking-wide">Immediate Impact</p>
                              <p className="text-slate-600 dark:text-slate-300">{action.immediateImpact}</p>
                            </div>
                            <div>
                              <p className="font-semibold text-slate-700 dark:text-slate-200 uppercase tracking-wide">Short-Term Outcome</p>
                              <p className="text-slate-600 dark:text-slate-300">{action.shortTermOutcome}</p>
                            </div>
                          </div>
                        </>
                      )}
                      {isActioned && (
                        <p className="text-[12px] text-emerald-600 dark:text-emerald-400">Action recorded — logged to audit trail.</p>
                      )}
                    </div>

                    {/* Action buttons */}
                    {!isActioned && (
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <button
                          onClick={() => handleCommandAction(action)}
                          className={`px-3 py-1.5 border rounded text-[12px] font-bold transition-all ${getActionBtnClass(action.urgency)}`}
                        >
                          {action.actionLabel}
                        </button>
                        <button className="px-3 py-1.5 bg-transparent border border-slate-300 dark:border-slate-600/50 text-slate-700 dark:text-slate-200 rounded text-[12px] font-semibold hover:bg-slate-100 dark:hover:bg-slate-700/40 transition-all">
                          View
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CROSS-MODULE OPERATIONAL RISK */}
        <div className="bg-white dark:bg-slate-800/25 border border-slate-200 dark:border-slate-700/30 rounded-xl shadow-sm dark:shadow-none overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3 border-b border-slate-200 dark:border-slate-700/30">
            <div className="flex items-center gap-3">
              <Activity className="w-4 h-4 text-slate-500 dark:text-slate-400" />
              <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-widest">
                Cross-Module Operational Risk
              </span>
            </div>
            <span className="text-[10px] text-slate-500">
              {moduleRisks.filter(m => m.risk === 'High').length} high-risk modules
            </span>
          </div>
          <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {moduleRisks.map((mod) => (
              <div
                key={mod.id}
                className="bg-slate-50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-700/30 rounded-lg p-4 space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="text-[13px] font-semibold text-slate-900 dark:text-slate-100">{mod.module}</span>
                  <span className={`flex-shrink-0 inline-flex items-center px-2 py-0.5 rounded border text-[10px] font-bold uppercase tracking-wide ${getRiskBadge(mod.risk)}`}>
                    {mod.risk}
                  </span>
                </div>

                {/* Utilization bar */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] text-slate-500 uppercase tracking-wide">Utilization</span>
                    <span className={`text-[11px] font-bold ${
                      mod.utilization >= 90 ? 'text-red-700 dark:text-red-400' :
                      mod.utilization >= 80 ? 'text-amber-700 dark:text-amber-400' :
                      'text-emerald-700 dark:text-emerald-400'
                    }`}>{mod.utilization}%</span>
                  </div>
                  <div className="h-1.5 bg-slate-200 dark:bg-slate-700/50 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${getRiskBar(mod.risk)}`}
                      style={{ width: `${Math.min(mod.utilization, 100)}%` }}
                    />
                  </div>
                </div>

                <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">{mod.bottleneck}</p>

                <button
                  onClick={() => mod.route && navigate(createPageUrl(mod.route))}
                  className="w-full flex items-center justify-center gap-1.5 px-3 py-1.5 bg-slate-100 dark:bg-slate-700/30 border border-slate-300 dark:border-slate-600/40 text-slate-700 dark:text-slate-300 rounded text-[11px] font-semibold hover:bg-slate-200 dark:hover:bg-slate-700/50 transition-all"
                >
                  <ArrowRight className="w-3 h-3" />
                  {mod.action}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* EXECUTIVE SNAPSHOT */}
        <div className="bg-white dark:bg-slate-800/25 border border-slate-200 dark:border-slate-700/30 rounded-xl shadow-sm dark:shadow-none overflow-hidden">
          <div className="px-5 py-3 border-b border-slate-200 dark:border-slate-700/30">
            <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-widest">Executive Snapshot</span>
          </div>
          <div className="p-4 grid grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Personnel */}
            <button
              onClick={() => navigate(createPageUrl('PersonnelOverview'))}
              className="text-left p-4 rounded-lg bg-slate-50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-700/30 hover:border-slate-400 dark:hover:border-slate-600/50 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] text-slate-500 font-medium uppercase tracking-wide">Personnel</span>
                <div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div>
              </div>
              <p className="text-2xl font-bold text-slate-900 dark:text-white mb-0.5">164</p>
              <p className="text-[11px] text-slate-500 mb-0.5">14 Vacancies (7.8%)</p>
              <p className="text-[10px] text-red-700 dark:text-red-400">3 below safety threshold</p>
            </button>

            {/* Active Incidents */}
            <button
              onClick={() => navigate(createPageUrl('Approvals'))}
              className="text-left p-4 rounded-lg bg-slate-50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-700/30 hover:border-slate-400 dark:hover:border-slate-600/50 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] text-slate-500 font-medium uppercase tracking-wide">Active Incidents</span>
                {activeIncidentCount > 0 && (
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                  </span>
                )}
              </div>
              <p className="text-2xl font-bold text-slate-900 dark:text-white mb-0.5">{activeIncidentCount}</p>
              <p className="text-[11px] text-slate-500 mb-0.5">1 UOF · 1 Facility · 1 Staffing</p>
              <p className="text-[10px] text-amber-700 dark:text-amber-400">2 escalated · oldest 1h 22m</p>
            </button>

            {/* Compliance */}
            <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-700/30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] text-slate-500 font-medium uppercase tracking-wide">Compliance</span>
                <div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div>
              </div>
              <p className="text-2xl font-bold text-slate-900 dark:text-white mb-0.5">94%</p>
              <p className="text-[11px] text-slate-500 mb-0.5">Policies 94% · Training 91%</p>
              <p className="text-[10px] text-amber-700 dark:text-amber-400">USMS inspection in 2 days</p>
            </div>

            {/* Budget */}
            <button
              onClick={() => navigate(createPageUrl('BudgetResources'))}
              className="text-left p-4 rounded-lg bg-slate-50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-700/30 hover:border-slate-400 dark:hover:border-slate-600/50 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] text-slate-500 font-medium uppercase tracking-wide">Budget Utilization</span>
                <div className="w-1.5 h-1.5 rounded-full bg-slate-500"></div>
              </div>
              <div className="flex items-baseline gap-2 mb-0.5">
                <p className="text-2xl font-bold text-slate-900 dark:text-white">85%</p>
                <span className="flex items-center gap-0.5 text-amber-700 dark:text-amber-400 text-[11px] font-medium">
                  <ArrowUpRight className="w-3 h-3" />+1.2%
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mb-0.5">Forecast variance +1.2% from plan</p>
              <p className="text-[10px] text-amber-700 dark:text-amber-400">OT spend 19% above baseline</p>
            </button>
          </div>
        </div>

        {/* EXECUTIVE INTELLIGENCE SUMMARY */}
        <div className="bg-white dark:bg-slate-800/25 border border-slate-200 dark:border-slate-700/30 border-l-2 border-l-blue-500 dark:border-l-blue-500/50 rounded-xl shadow-sm dark:shadow-none">
          <button
            onClick={() => setAiBriefExpanded(!aiBriefExpanded)}
            className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-slate-50 dark:hover:bg-slate-800/10 transition-colors rounded-xl"
          >
            <div className="flex items-center gap-3">
              <h3 className="text-[13px] font-semibold text-slate-900 dark:text-white uppercase tracking-wide">Executive Intelligence Summary</h3>
              <span className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-700/30 text-[11px] text-slate-500 rounded">3 Insights</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="hidden sm:inline text-[10px] text-slate-500">AI-assisted synthesis · 4 sources · 3m ago</span>
              {aiBriefExpanded ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
            </div>
          </button>

          {aiBriefExpanded && (
            <div className="px-5 pb-5 space-y-4 border-t border-slate-200 dark:border-slate-700/30 pt-4">
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 flex-shrink-0"></div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-red-700 dark:text-red-400">Staffing Risk — B-Shift @ 75%</p>
                  <ul className="space-y-0.5 text-[13px] text-slate-700 dark:text-slate-300">
                    <li>Minimum threshold breached (9 of 12 required)</li>
                    <li>2 deputies recommended within 4 hrs</li>
                    <li>Impact: Patrol response time +18%</li>
                  </ul>
                  <p className="text-[10px] text-slate-500 pt-0.5">CAD roster · HR scheduling · patrol deployment log</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 flex-shrink-0"></div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-amber-700 dark:text-amber-400">Budget Alert — OT 19% Over Allocation</p>
                  <ul className="space-y-0.5 text-[13px] text-slate-700 dark:text-slate-300">
                    <li>OT spend $78,240 vs $65,000 allocation</li>
                    <li>2 lateral hires would reduce year-end overage by $23K</li>
                    <li>Action: Initiate hiring by Dec 15</li>
                  </ul>
                  <p className="text-[10px] text-slate-500 pt-0.5">Finance system · HR vacancy data · payroll records</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 flex-shrink-0"></div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-amber-700 dark:text-amber-400">Compliance — USMS Inspection Dec 12–14</p>
                  <ul className="space-y-0.5 text-[13px] text-slate-700 dark:text-slate-300">
                    <li>H2-Pod HVAC repair requires approval within 48 hrs</li>
                    <li>3 policies require command signature before inspection</li>
                    <li>Risk: ACA non-compliance if HVAC unresolved</li>
                  </ul>
                  <p className="text-[10px] text-slate-500 pt-0.5">Compliance database · facilities management · policy tracker</p>
                </div>
              </div>
              <div className="pt-2 text-[10px] text-slate-500">
                Confidence: 92% · Model last trained on agency data 12h ago
              </div>
            </div>
          )}
        </div>

        {/* PENDING APPROVALS (top 3) */}
        <div className="bg-white dark:bg-slate-800/25 border border-slate-200 dark:border-slate-700/30 rounded-xl shadow-sm dark:shadow-none overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 dark:border-slate-700/30">
            <span className="text-sm font-semibold text-slate-900 dark:text-white">Pending Approvals</span>
            <button
              onClick={() => navigate(createPageUrl('Approvals'))}
              className="text-xs text-amber-700 dark:text-amber-400 hover:text-amber-800 dark:hover:text-amber-300 font-medium"
            >
              View all {dashboardApprovals.length} approvals →
            </button>
          </div>
          <div className="px-5 py-4 space-y-2">
            {topApprovals.map((item) => {
              const badge = getTierBadge(item.tier);
              return (
                <div
                  key={item.id}
                  className={`rounded-lg border border-slate-200 dark:border-slate-700/30 hover:bg-slate-50 dark:hover:bg-slate-800/35 transition-colors ${
                    item.tier === 'critical'
                      ? 'border-l-4 border-l-red-500'
                      : item.tier === 'action'
                      ? 'border-l-4 border-l-amber-500'
                      : 'border-l-4 border-l-slate-300 dark:border-l-slate-600'
                  }`}
                >
                  <div className="flex items-center gap-4 p-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-sm font-medium text-slate-900 dark:text-white">{item.type}</p>
                        {badge && <span className={`px-1.5 py-0.5 border rounded text-[11px] font-medium ${badge.classes}`}>{badge.text}</span>}
                        <span className="text-[11px] text-slate-500">{getTimePending(item.timePendingMinutes)} ago</span>
                      </div>
                      <div className="flex items-center gap-2 text-[11px]">
                        <span className="text-slate-500">{item.division}</span>
                        <span className="text-slate-400">·</span>
                        <span className="text-slate-500">{item.name}</span>
                        {item.financial && (
                          <>
                            <span className="text-slate-400">·</span>
                            <span className="text-slate-500">{item.financial}</span>
                          </>
                        )}
                        {item.impact && (
                          <>
                            <span className="text-slate-400">·</span>
                            <span className={item.tier === 'critical' ? 'text-red-700 dark:text-red-400' : item.tier === 'action' ? 'text-amber-700 dark:text-amber-400' : 'text-slate-500'}>{item.impact}</span>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button
                        onClick={(e) => openApprovalModal(item, 'approve', e)}
                        className="px-3 py-1.5 text-xs font-semibold bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors"
                      >
                        Approve
                      </button>
                      <button
                        onClick={(e) => openApprovalModal(item, 'deny', e)}
                        className="px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 border border-slate-300 dark:border-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-700/20 rounded-lg transition-colors"
                      >
                        Escalate
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 px-3 pb-2 ml-[10px] text-[10px] text-slate-500">
                    <Shield className="w-3 h-3 text-slate-400" />
                    <span>Logged to audit trail</span>
                    {item.impact && (
                      <>
                        <span className="text-slate-400">·</span>
                        <span>Impact: {item.impact}</span>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* DIVISION STATUS */}
        <div className="bg-white dark:bg-slate-800/25 border border-slate-200 dark:border-slate-700/30 rounded-xl shadow-sm dark:shadow-none overflow-hidden">
          <div className="px-5 py-3 border-b border-slate-200 dark:border-slate-700/30">
            <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-widest">Division Status</span>
          </div>
          <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {divisions.map((div, idx) => (
              <button
                key={idx}
                onClick={() => div.route && navigate(createPageUrl(div.route))}
                onMouseEnter={() => setHoveredDivision(idx)}
                onMouseLeave={() => setHoveredDivision(null)}
                className="bg-slate-50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-700/30 rounded-lg p-4 text-left hover:border-slate-400 dark:hover:border-slate-600/50 transition-colors relative"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[13px] font-semibold text-slate-900 dark:text-white">{div.name}</span>
                  <div className={`w-2 h-2 rounded-full ${
                    div.severity === 'red' ? 'bg-red-500' :
                    div.severity === 'amber' ? 'bg-amber-500' : 'bg-emerald-500'
                  }`}></div>
                </div>
                <p className="text-[12px] text-slate-700 dark:text-slate-300 mb-1">{div.status}</p>
                <p className="text-[11px] text-slate-500">{div.staffing} staffed</p>
                {hoveredDivision === idx && (
                  <div className="absolute left-0 right-0 top-full mt-1 z-20 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/50 rounded-lg p-3 shadow-xl">
                    {div.drill.split('\n').map((line, i) => (
                      <p key={i} className="text-[11px] text-slate-700 dark:text-slate-300 leading-relaxed">{line}</p>
                    ))}
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* STAFFING LEVELS */}
        <div className="bg-white dark:bg-slate-800/25 border border-slate-200 dark:border-slate-700/30 rounded-xl shadow-sm dark:shadow-none overflow-hidden">
          <div className="px-5 py-3 border-b border-slate-200 dark:border-slate-700/30 flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-widest">Staffing Levels</span>
            <span className="text-[11px] text-slate-500">164/178 authorized (92.1%)</span>
          </div>
          <div className="p-5 space-y-3.5">
            {[
              { division: 'Patrol Division', current: 56, authorized: 65, percentage: 86, minThreshold: 80, note: 'B-Shift critical' },
              { division: 'Investigations', current: 22, authorized: 25, percentage: 88, minThreshold: 80, note: '3 positions posted' },
              { division: 'Detention', current: 45, authorized: 48, percentage: 94, minThreshold: 85, note: 'Rodriguez starting Mon' },
              { division: 'Court Services', current: 18, authorized: 18, percentage: 100, minThreshold: 90, note: '' },
              { division: 'Support Services', current: 23, authorized: 22, percentage: 105, minThreshold: 85, note: 'Grant-funded' }
            ].map((div, idx) => (
              <div key={idx}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-slate-800 dark:text-slate-300">{div.division}</span>
                    {div.note && <span className="text-[10px] text-slate-500">({div.note})</span>}
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className="text-xs text-slate-500">{div.current}/{div.authorized}</span>
                    <span className={`text-sm font-semibold ${div.percentage >= 90 ? 'text-emerald-600 dark:text-emerald-400' : div.percentage >= div.minThreshold ? 'text-amber-700 dark:text-amber-400' : 'text-red-700 dark:text-red-400'}`}>
                      {div.percentage}%
                    </span>
                  </div>
                </div>
                <div className="relative w-full h-1 bg-slate-200 dark:bg-slate-800/50 rounded-full overflow-visible">
                  <div
                    className={`h-full rounded-full ${div.percentage >= 90 ? 'bg-emerald-500 dark:bg-emerald-500/40' : div.percentage >= div.minThreshold ? 'bg-amber-500 dark:bg-amber-500/40' : 'bg-red-500 dark:bg-red-500/40'}`}
                    style={{ width: `${Math.min(div.percentage, 100)}%` }}
                  />
                  <div
                    className="absolute top-[-3px] w-[1.5px] h-[calc(100%+6px)] bg-red-500/50 rounded-full"
                    style={{ left: `${div.minThreshold}%` }}
                    title={`Min safe: ${div.minThreshold}%`}
                  />
                </div>
              </div>
            ))}
            <div className="flex items-center gap-3 pt-2 text-[10px] text-slate-500">
              <div className="flex items-center gap-1.5">
                <div className="w-[1.5px] h-2.5 bg-red-500/50 rounded-full"></div>
                <span>Min safe threshold</span>
              </div>
            </div>
          </div>
        </div>

        {/* FEDERAL COMPLIANCE & AUDITS */}
        <div className="bg-white dark:bg-slate-800/25 border border-slate-200 dark:border-slate-700/30 rounded-xl shadow-sm dark:shadow-none overflow-hidden">
          <div className="px-5 py-3 border-b border-slate-200 dark:border-slate-700/30 flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-widest">Federal Compliance & Audits</span>
            <span className="px-1.5 py-0.5 bg-red-100 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-700 dark:text-red-400 text-[10px] font-semibold rounded">USMS Dec 12–14</span>
          </div>
          <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* USMS Readiness */}
            <div className="bg-slate-50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-700/30 rounded-lg p-5">
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                <span className="text-sm font-medium text-slate-900 dark:text-white">USMS Inspection Readiness</span>
              </div>
              <div className="space-y-3">
                {[
                  { label: 'Databases', value: '47/47', pct: 100, color: 'bg-emerald-500 dark:bg-emerald-500/40', warn: false },
                  { label: 'Policies', value: '44/47', pct: 94, color: 'bg-amber-500 dark:bg-amber-500/40', warn: true },
                  { label: 'Training Records', value: '156/164', pct: 95, color: 'bg-amber-500 dark:bg-amber-500/40', warn: true }
                ].map((row) => (
                  <div key={row.label}>
                    <div className="flex items-center justify-between mb-1 text-xs">
                      <span className="text-slate-500">{row.label}</span>
                      <span className={row.warn ? 'text-amber-700 dark:text-amber-400' : 'text-slate-700 dark:text-slate-300'}>{row.value}</span>
                    </div>
                    <div className="w-full h-1 bg-slate-200 dark:bg-slate-800/50 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${row.color}`} style={{ width: `${row.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-700/30 text-[11px] text-slate-500">
                <p>3 policies pending review · 8 deputies need recertification</p>
                <p className="mt-1">POC: Major Anderson (Detention)</p>
              </div>
            </div>

            {/* ACA Status */}
            <div className="bg-slate-50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-700/30 rounded-lg p-5">
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                <span className="text-sm font-medium text-slate-900 dark:text-white">ACA Re-Accreditation</span>
              </div>
              <div className="space-y-2.5 text-xs">
                {[
                  { label: 'Status', value: 'Accredited', cls: 'text-emerald-600 dark:text-emerald-400 font-medium' },
                  { label: 'Expires', value: 'August 2025', cls: 'text-slate-700 dark:text-slate-300' },
                  { label: 'Next Review', value: '184 days', cls: 'text-slate-700 dark:text-slate-300' },
                  { label: 'Risk Level', value: 'Moderate', cls: 'text-amber-700 dark:text-amber-400 font-medium' },
                  { label: 'Issue', value: 'H2 HVAC — 72h window', cls: 'text-red-700 dark:text-red-400' },
                  { label: 'Repair', value: 'Pending approval', cls: 'text-amber-700 dark:text-amber-400' },
                  { label: 'Assigned To', value: 'Facilities Director Chen', cls: 'text-slate-700 dark:text-slate-300' }
                ].map((row) => (
                  <div key={row.label} className="flex justify-between">
                    <span className="text-slate-500">{row.label}</span>
                    <span className={row.cls}>{row.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* APPROVAL MODAL */}
      {selectedApproval && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={closeApprovalModal} />
          <div className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/50 rounded-2xl p-8 max-w-md w-full shadow-2xl">
            <div className="flex items-start gap-3 mb-5">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center border ${approvalAction === 'approve' ? 'border-emerald-500/20' : 'border-red-500/20'}`}>
                {approvalAction === 'approve' ? (
                  <ThumbsUp className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-700 dark:text-red-400" />
                )}
              </div>
              <div className="flex-1">
                <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-0.5">
                  {approvalAction === 'approve' ? 'Approve' : 'Deny'} {selectedApproval.title}?
                </h3>
                <p className="text-xs text-slate-500">
                  {selectedApproval.name} · {selectedApproval.details}
                </p>
              </div>
            </div>
            <div className="mb-5">
              <label className="block text-sm text-slate-500 mb-2">
                {approvalAction === 'approve' ? 'Comments (optional)' : 'Reason for denial (required)'}
              </label>
              <textarea
                value={actionComment}
                onChange={(e) => setActionComment(e.target.value)}
                placeholder={approvalAction === 'approve' ? 'Add any comments...' : 'Please provide a reason...'}
                rows={3}
                className="w-full px-3.5 py-2.5 bg-slate-100 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-700/50 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:border-slate-400 dark:focus:border-slate-600 resize-none text-sm"
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={closeApprovalModal}
                className="flex-1 px-4 py-2.5 bg-slate-100 dark:bg-slate-800/30 hover:bg-slate-200 dark:hover:bg-slate-800/60 border border-slate-200 dark:border-slate-700/30 rounded-xl text-slate-900 dark:text-white text-sm font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmApprovalAction}
                className={`flex-1 px-4 py-2.5 rounded-xl text-white text-sm font-medium transition-colors ${approvalAction === 'approve' ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-red-600 hover:bg-red-700'}`}
              >
                Confirm {approvalAction === 'approve' ? 'Approval' : 'Denial'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TOAST */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50">
          <div className={`px-4 py-3 rounded-lg border flex items-center gap-2 text-sm shadow-lg ${
            toastMessage.type === 'success'
              ? 'bg-slate-900 border-emerald-500/20 text-emerald-400'
              : 'bg-slate-900 border-red-500/20 text-red-400'
          }`}>
            {toastMessage.type === 'success' ? (
              <CheckCircle className="w-4 h-4 flex-shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
            )}
            <p className="max-w-xs">{toastMessage.message}</p>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

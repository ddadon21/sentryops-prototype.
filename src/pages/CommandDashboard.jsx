import React, { useState, useEffect, useRef } from 'react';
import {
  AlertCircle, CheckCircle, Shield, ThumbsUp, XCircle,
  ArrowRight, Clock, Activity, Zap,
  FileText, Users, ChevronDown, ChevronUp
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import DashboardLayout from '../layouts/DashboardLayout';

// ── Agency Health Score radial gauge ─────────────────────────────────────────
function HealthGauge({ score }) {
  const r = 32, circ = 2 * Math.PI * r, filled = (score / 100) * circ;
  const color = score >= 85 ? '#22c55e' : score >= 70 ? '#f59e0b' : '#ef4444';
  return (
    <svg viewBox="0 0 80 80" className="w-14 h-14 flex-shrink-0">
      <circle cx="40" cy="40" r={r} fill="none" strokeWidth="7" stroke="rgba(148,163,184,0.15)" />
      <circle cx="40" cy="40" r={r} fill="none" strokeWidth="7" stroke={color}
        strokeDasharray={`${filled} ${circ}`} strokeLinecap="round"
        transform="rotate(-90 40 40)" />
      <text x="40" y="37" textAnchor="middle" fontSize="16" fontWeight="900" fill={color}>{score}</text>
      <text x="40" y="52" textAnchor="middle" fontSize="8" fill="rgba(148,163,184,0.55)">/100</text>
    </svg>
  );
}

export default function CommandDashboard() {
  const navigate = useNavigate();

  const [selectedApproval, setSelectedApproval] = useState(null);
  const [approvalAction, setApprovalAction] = useState(null);
  const [actionComment, setActionComment] = useState('');
  const [toastMessage, setToastMessage] = useState(null);
  const [hoveredDivision, setHoveredDivision] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [actionedCommandActions, setActionedCommandActions] = useState(new Set());
  const [secondaryTab, setSecondaryTab] = useState('staffing');
  const toastTimerRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (d) =>
    d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
  const formatDate = (d) =>
    d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
  const getGreeting = (d, name) => {
    const h = d.getHours();
    const g = h >= 5 && h < 12 ? 'Good morning' : h >= 12 && h < 17 ? 'Good afternoon' : h >= 17 && h < 21 ? 'Good evening' : 'Hey';
    return name ? `${g}, ${name}` : g;
  };

  // ── Static data ───────────────────────────────────────────────────────────────
  const agencyHealthScore = 78;

  const chiefOfStaffActions = [
    { id: 1, action: 'Approve HVAC repair', module: 'Detention', time: '~2 min', impact: 'Stops ACA compliance risk', urgency: 'critical', financial: '$23,500' },
    { id: 2, action: 'Authorize B-Shift overtime', module: 'Patrol', time: '~1 min', impact: 'Restores Zone 4 & 7 coverage', urgency: 'critical', financial: '$8,320' },
    { id: 3, action: 'Extend DEA surveillance auth', module: 'Investigations', time: '~1 min', impact: 'Prevents case collapse tonight', urgency: 'high', financial: '$12,000' },
    { id: 4, action: 'Sign 3 compliance policies', module: 'Compliance', time: '~8 min', impact: 'USMS readiness → 100%', urgency: 'normal', financial: null },
  ];

  const commandActions = [
    {
      id: 'ca-1', urgency: 'Critical',
      decision: 'Approve emergency HVAC repair for Detention H2-Pod.',
      ifIgnored: 'ACA accreditation at risk and USMS inspection fails — pod temperature at 84°F.',
      timeSensitivity: 'Deadline: Within 72 hours', countdown: '2 days remaining',
      immediateImpact: 'Repair contractor dispatched, ACA compliance clock stops.',
      shortTermOutcome: 'H2-Pod temperature restored before USMS inspection Dec 12.',
      rationale: 'Based on ACA compliance threshold and USMS inspection window.',
      actionLabel: 'Approve', financial: '$23,500'
    },
    {
      id: 'ca-2', urgency: 'Critical',
      decision: 'Authorize B-Shift overtime to restore minimum patrol coverage.',
      ifIgnored: 'Patrol B-Shift stays at 75% — response time degrades 18% in Zones 4 and 7.',
      timeSensitivity: 'Deadline: Next shift briefing', countdown: 'Before 18:00 today',
      immediateImpact: 'OT roster filled and Zone 4 / 7 coverage restored.',
      shortTermOutcome: 'Response time returns to baseline within first hour of shift.',
      rationale: 'Based on CAD roster gap and minimum-safe-staffing thresholds.',
      actionLabel: 'Approve', financial: '$8,320'
    },
    {
      id: 'ca-3', urgency: 'High',
      decision: 'Extend DEA surveillance authorization for Narcotics Case #2024-1847.',
      ifIgnored: 'Multi-agency operation halts tonight and fentanyl targets disperse.',
      timeSensitivity: 'Deadline: End of day', countdown: '8h remaining',
      immediateImpact: 'Surveillance authority remains active through next operational cycle.',
      shortTermOutcome: 'Task force maintains controlled tracking on all targets.',
      rationale: 'Based on expiring legal authorization and active DEA dependency.',
      actionLabel: 'Approve', financial: '$12,000'
    },
    {
      id: 'ca-4', urgency: 'Normal',
      decision: 'Sign 3 policy documents pending command signature before USMS inspection.',
      ifIgnored: 'USMS inspection readiness drops below 94% — finding risk increases.',
      timeSensitivity: 'Deadline: Dec 11 (day before inspection)',
      immediateImpact: 'Policy tracker shows full signature compliance.',
      shortTermOutcome: 'USMS inspection readiness reaches 100% for policy category.',
      rationale: 'Based on USMS inspection checklist and outstanding signature log.',
      actionLabel: 'Escalate', financial: null
    }
  ];

  const moduleRisks = [
    { id: 'mod-patrol', module: 'Patrol Ops', utilization: 75, risk: 'High', bottleneck: 'B-Shift at 75% — Zones 4 & 7 uncovered. OT authorization pending.', action: 'Review Staffing', route: 'PersonnelOverview' },
    { id: 'mod-detention', module: 'Detention', utilization: 91, risk: 'High', bottleneck: '91.5% capacity. H2-Pod HVAC failure. USMS inspection in 2 days.', action: 'View Approvals', route: 'Approvals' },
    { id: 'mod-investigations', module: 'Investigations', utilization: 88, risk: 'Moderate', bottleneck: 'DEA surveillance expires today. 4 critical cases require decisions.', action: 'View Cases', route: 'ActiveCases' },
    { id: 'mod-hr', module: 'HR & Staffing', utilization: 92, risk: 'Moderate', bottleneck: '14 vacancies (7.8%). OT spend 19% above allocation.', action: 'View Personnel', route: 'PersonnelOverview' }
  ];

  const dashboardApprovals = [
    { id: 1, type: 'Use of Force Review', name: 'Deputy Johnson, Marcus #D-4167', details: 'B-Pod incident — OC spray deployment', tier: 'critical', division: 'Detention', title: 'Use of Force Review', context: 'Inmate refused direct orders, took fighting stance. OC spray deployed. Medical evaluation completed — no injuries.', submittedBy: 'Shift Supervisor Williams', timePendingMinutes: 15, deadline: '24 hours', impact: 'Compliance deadline', financial: null },
    { id: 2, type: 'Emergency Purchase', name: 'Detention — Major Wilson', details: 'H2-Pod HVAC Repairs', tier: 'critical', division: 'Detention Facilities', title: 'Emergency Purchase Order', context: 'Critical HVAC failure in H2-Pod. Temperature at 84°F. Immediate repair required to maintain ACA accreditation standards.', submittedBy: 'Facilities Director Chen', timePendingMinutes: 120, deadline: 'Immediate', impact: 'ACA compliance risk', financial: '$23,500' },
    { id: 3, type: 'Overtime Authorization', name: 'Patrol — Capt. Rodriguez', details: 'B-Shift staffing shortage — 160 hrs @ $52/hr', tier: 'action', division: 'Patrol', title: 'Overtime Authorization', context: '3 deputies out (2 FMLA, 1 Workers Comp). Minimum staffing requires 12 road deputies.', submittedBy: 'Capt. Rodriguez', timePendingMinutes: 90, deadline: '48 hours', impact: 'Below min staffing', financial: '$8,320' },
    { id: 4, type: 'Vehicle Replacement', name: 'Fleet Mgmt — Anderson', details: 'Patrol Unit 247 — total loss (pursuit)', tier: 'action', division: 'Support Services', title: 'Emergency Vehicle Replacement', context: 'Unit 247 totaled in pursuit. Insurance claim filed. Patrol fleet at minimum operational capacity.', submittedBy: 'Fleet Manager Anderson', timePendingMinutes: 240, deadline: '72 hours', impact: 'Fleet at min capacity', financial: '$48,500' },
    { id: 5, type: 'Hiring Decision', name: 'Rodriguez, Elena M.', details: 'Certified CO — Detention Division', tier: 'standard', division: 'Detention', title: 'Hiring Decision', context: 'Background investigation complete. 5 years experience. All certifications current.', submittedBy: 'HR Director Thompson', timePendingMinutes: 1440, deadline: '5 days', impact: 'Position vacant 45 days', financial: null },
    { id: 6, type: 'Policy Exception', name: 'Lt. Anderson — Investigations', details: 'Extended surveillance — Narcotics Case #2024-1847', tier: 'standard', division: 'Investigations', title: 'Policy Exception Request', context: 'Multi-agency narcotics investigation. DEA requesting 30-day extension.', submittedBy: 'Lt. Anderson', timePendingMinutes: 2880, deadline: '7 days', impact: null, financial: '$12,000' },
    { id: 7, type: 'Leave Request', name: 'Deputy Chen, Michael #D-4521', details: 'FMLA — Medical leave: Dec 15 – Jan 5', tier: 'standard', division: 'Detention', title: 'FMLA Leave Request', context: 'Approved medical procedure. FMLA documentation complete.', submittedBy: 'Deputy Chen', timePendingMinutes: 720, deadline: '10 days', impact: null, financial: null },
    { id: 8, type: 'Training Authorization', name: 'Detention — Sgt. Williams', details: 'CIT Training — 8 deputies', tier: 'standard', division: 'Training', title: 'Training Authorization', context: '40-hour CIT certification. Grant funding available for 50% reimbursement.', submittedBy: 'Training Coordinator Smith', timePendingMinutes: 4320, deadline: '14 days', impact: null, financial: '$6,400' }
  ];

  const divisions = [
    { name: 'Patrol', status: 'B-Shift 75%', severity: 'red', staffing: '56/65', route: 'PersonnelOverview', drill: 'Min required: 12 deputies\nCurrently deployed: 9\nCoverage risk: Zones 4, 7' },
    { name: 'Detention', status: '91.5% Capacity', severity: 'amber', staffing: '45/48', route: null, drill: 'Population: 1,098 / 1,200\nFederal holds: 247\nMedical: 14 current' },
    { name: 'Investigations', status: '1 Escalation', severity: 'amber', staffing: '22/25', route: null, drill: 'Active cases: 142\nDEA joint op pending\n3 positions posted' },
    { name: 'Court Services', status: 'Stable', severity: 'green', staffing: '18/18', route: null, drill: 'All courtrooms covered\nTransport schedule nominal' },
    { name: 'Support Services', status: 'Stable', severity: 'green', staffing: '23/22', route: null, drill: '1 grant-funded position\nFleet at min capacity' }
  ];

  const staffingLevels = [
    { division: 'Patrol Division', current: 56, authorized: 65, percentage: 86, minThreshold: 80, note: 'B-Shift critical' },
    { division: 'Investigations', current: 22, authorized: 25, percentage: 88, minThreshold: 80, note: '3 positions posted' },
    { division: 'Detention', current: 45, authorized: 48, percentage: 94, minThreshold: 85, note: 'Rodriguez starting Mon' },
    { division: 'Court Services', current: 18, authorized: 18, percentage: 100, minThreshold: 90, note: '' },
    { division: 'Support Services', current: 23, authorized: 22, percentage: 105, minThreshold: 85, note: 'Grant-funded' }
  ];

  const topApprovals = dashboardApprovals.slice(0, 3);

  // ── Helpers ───────────────────────────────────────────────────────────────────
  const getTimePending = (m) => m < 60 ? `${m}m` : m < 1440 ? `${Math.floor(m / 60)}h` : `${Math.floor(m / 1440)}d`;

  const getTierBadge = (tier) => {
    if (tier === 'critical') return { text: 'CRITICAL', classes: 'bg-red-100 border-red-200 text-red-700 dark:bg-red-500/10 dark:border-red-500/20 dark:text-red-400' };
    if (tier === 'action') return { text: 'ACTION', classes: 'bg-amber-100 border-amber-200 text-amber-700 dark:bg-amber-500/10 dark:border-amber-500/20 dark:text-amber-400' };
    return null;
  };

  const getUrgencyAccent = (u) => u === 'Critical' ? 'border-l-red-500' : u === 'High' ? 'border-l-amber-500' : 'border-l-blue-500';

  const getUrgencyBadge = (u) => {
    if (u === 'Critical') return 'bg-red-100 border-red-200 text-red-700 dark:bg-red-500/10 dark:border-red-500/20 dark:text-red-400';
    if (u === 'High') return 'bg-amber-100 border-amber-200 text-amber-700 dark:bg-amber-500/10 dark:border-amber-500/20 dark:text-amber-400';
    return 'bg-blue-100 border-blue-200 text-blue-700 dark:bg-blue-500/10 dark:border-blue-500/20 dark:text-blue-400';
  };

  const getActionBtnClass = (u) => {
    if (u === 'Critical') return 'bg-red-600 border-red-700 text-white hover:bg-red-700';
    if (u === 'High') return 'bg-amber-600 border-amber-700 text-white hover:bg-amber-700';
    return 'bg-blue-600 border-blue-700 text-white hover:bg-blue-700';
  };

  const getRiskBadge = (r) => {
    if (r === 'High') return 'bg-red-100 border-red-200 text-red-700 dark:bg-red-500/10 dark:border-red-500/20 dark:text-red-400';
    if (r === 'Moderate') return 'bg-amber-100 border-amber-200 text-amber-700 dark:bg-amber-500/10 dark:border-amber-500/20 dark:text-amber-400';
    return 'bg-emerald-100 border-emerald-200 text-emerald-700 dark:bg-emerald-500/10 dark:border-emerald-500/20 dark:text-emerald-400';
  };

  const getRiskBar = (r) => r === 'High' ? 'bg-red-500' : r === 'Moderate' ? 'bg-amber-500' : 'bg-emerald-500';

  const cosUrgencyDot = (u) => u === 'critical' ? 'bg-red-500' : u === 'high' ? 'bg-amber-500' : 'bg-blue-400';
  const cosUrgencyText = (u) => u === 'critical' ? 'text-red-400' : u === 'high' ? 'text-amber-400' : 'text-blue-400';

  // ── Action handlers ───────────────────────────────────────────────────────────
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

  const closeApprovalModal = () => { setSelectedApproval(null); setApprovalAction(null); setActionComment(''); };

  const confirmApprovalAction = () => {
    if (approvalAction === 'deny' && !actionComment.trim()) { showToast('Please provide a reason for denial', 'error'); return; }
    showToast(`${selectedApproval.title} ${approvalAction === 'approve' ? 'approved' : 'denied'} successfully`, 'success');
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
      <div className="p-5 lg:p-7 space-y-5 bg-slate-100 dark:bg-transparent min-h-full">

        {/* ── HERO: Title + Metrics ← → AI Chief of Staff ──────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-5 items-start">

          {/* Left: page title + 4 executive metric cards */}
          <div className="space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                  Executive Command Center
                </h1>
                <div className="flex items-center flex-wrap gap-x-2 gap-y-1 mt-1 text-[11px] text-slate-500">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">{getGreeting(currentTime, 'Sheriff Thompson')}</span>
                  <span>·</span>
                  <span>{formatDate(currentTime)}</span>
                  <span>·</span>
                  <span>{formatTime(currentTime)} EST</span>
                  <span>·</span>
                  <span className="text-amber-700 dark:text-amber-400 font-semibold">{pendingActionCount} command decisions pending</span>
                </div>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white dark:bg-zinc-900/40 border border-slate-200 dark:border-slate-700/30 rounded-lg flex-shrink-0">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                <span className="text-[11px] font-medium text-slate-600 dark:text-slate-300 hidden sm:inline">Systems Operational</span>
              </div>
            </div>

            {/* 4 Executive Metric Cards */}
            <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">

              {/* Agency Health Score */}
              <div className="bg-white dark:bg-zinc-900/30 border border-amber-200/60 dark:border-amber-500/20 border-l-[3px] border-l-amber-500 rounded-xl p-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-amber-500/[0.03] pointer-events-none" />
                <p className="text-[9px] font-black uppercase tracking-[0.15em] text-amber-700 dark:text-amber-400 mb-3">Agency Health Score</p>
                <div className="flex items-center gap-3">
                  <HealthGauge score={agencyHealthScore} />
                  <div>
                    <p className="text-[10px] font-black text-amber-700 dark:text-amber-400 uppercase tracking-wide">Moderate Risk</p>
                    <p className="text-[9px] text-slate-500 mt-0.5 leading-relaxed">Staffing · Compliance<br />OT overage · 2 ops risks</p>
                  </div>
                </div>
              </div>

              {/* Active Critical Risks */}
              <div className="bg-white dark:bg-zinc-900/30 border border-red-200/60 dark:border-red-500/20 border-l-[3px] border-l-red-500 rounded-xl p-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-red-500/[0.03] pointer-events-none" />
                <p className="text-[9px] font-black uppercase tracking-[0.15em] text-red-700 dark:text-red-400 mb-2">Active Critical Risks</p>
                <p className="text-5xl font-black tabular-nums text-slate-900 dark:text-white leading-none mb-1">3</p>
                <p className="text-[10px] font-black text-red-700 dark:text-red-400 uppercase tracking-wide">Immediate Action</p>
                <p className="text-[9px] text-slate-500 mt-0.5">2 Critical · 1 High · 0 Cleared</p>
              </div>

              {/* Staffing Readiness */}
              <div className="bg-white dark:bg-zinc-900/30 border border-amber-200/60 dark:border-amber-500/20 border-l-[3px] border-l-amber-500 rounded-xl p-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-amber-500/[0.03] pointer-events-none" />
                <p className="text-[9px] font-black uppercase tracking-[0.15em] text-amber-700 dark:text-amber-400 mb-2">Staffing Readiness</p>
                <p className="text-5xl font-black tabular-nums text-slate-900 dark:text-white leading-none mb-1">92%</p>
                <p className="text-[10px] font-black text-amber-700 dark:text-amber-400 uppercase tracking-wide">Watch Zone</p>
                <p className="text-[9px] text-slate-500 mt-0.5">164/178 auth · B-Shift below threshold</p>
              </div>

              {/* Compliance Readiness */}
              <div className="bg-white dark:bg-zinc-900/30 border border-red-200/60 dark:border-red-500/20 border-l-[3px] border-l-red-500 rounded-xl p-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-red-500/[0.03] pointer-events-none" />
                <p className="text-[9px] font-black uppercase tracking-[0.15em] text-red-700 dark:text-red-400 mb-2">Compliance Readiness</p>
                <p className="text-5xl font-black tabular-nums text-slate-900 dark:text-white leading-none mb-1">94%</p>
                <p className="text-[10px] font-black text-red-700 dark:text-red-400 uppercase tracking-wide">USMS In 2 Days</p>
                <p className="text-[9px] text-slate-500 mt-0.5">3 actions required before Dec 12</p>
              </div>

            </div>
          </div>

          {/* Right: AI Chief of Staff panel */}
          <div className="bg-white dark:bg-zinc-950/70 border border-slate-200 dark:border-slate-700/40 border-t-[3px] border-t-amber-500 rounded-xl overflow-hidden">
            <div className="flex items-center gap-2.5 px-4 py-3 bg-slate-50 dark:bg-zinc-900/40 border-b border-slate-200 dark:border-slate-700/40">
              <div className="w-7 h-7 rounded-lg bg-amber-500/10 dark:bg-amber-500/15 border border-amber-500/25 flex items-center justify-center flex-shrink-0">
                <Zap className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.15em] text-slate-900 dark:text-white">AI Chief of Staff</p>
                <p className="text-[9px] text-slate-500 tracking-wide">Priority command actions</p>
              </div>
            </div>

            <div className="divide-y divide-slate-100 dark:divide-slate-800/40">
              {chiefOfStaffActions.map((item) => (
                <div key={item.id} className="px-4 py-3 flex items-start gap-3 hover:bg-slate-50 dark:hover:bg-zinc-900/30 transition-colors">
                  <div className="w-5 h-5 rounded-full bg-slate-200 dark:bg-zinc-800/60 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-[9px] font-black text-slate-700 dark:text-slate-200">{item.id}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${cosUrgencyDot(item.urgency)}`}></div>
                      <p className="text-[12px] font-semibold text-slate-900 dark:text-slate-100 leading-tight">{item.action}</p>
                    </div>
                    <p className="text-[10px] text-slate-500 mb-0.5">{item.module} · {item.time}{item.financial ? ` · ${item.financial}` : ''}</p>
                    <p className={`text-[10px] font-medium ${cosUrgencyText(item.urgency)}`}>→ {item.impact}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2 px-4 py-2.5 bg-slate-50 dark:bg-zinc-900/40 border-t border-slate-200 dark:border-slate-700/40">
              <Clock className="w-3 h-3 text-slate-400" />
              <span className="text-[10px] text-slate-500">Est. review time: <span className="font-semibold text-slate-700 dark:text-slate-200">4 minutes</span></span>
            </div>
          </div>

        </div>

        {/* ── COMMAND ACTIONS ────────────────────────────────────────────────── */}
        <div className="bg-white dark:bg-zinc-900/25 border border-slate-200 dark:border-slate-700/30 rounded-xl shadow-sm dark:shadow-none overflow-hidden">
          <div className="flex items-center justify-between gap-3 px-5 py-3 border-b border-slate-200 dark:border-slate-700/30 bg-red-50/50 dark:bg-red-500/5">
            <div className="flex items-center gap-3">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              <span className="text-[11px] font-black text-slate-900 dark:text-white uppercase tracking-widest">Command Actions</span>
              <span className="text-[10px] text-red-700 dark:text-red-400 font-semibold hidden sm:inline">— Immediate Decisions Required</span>
            </div>
            <span className="px-2 py-1 rounded bg-red-100 dark:bg-red-500/15 border border-red-200 dark:border-red-500/20 text-[11px] font-black text-red-800 dark:text-red-300">
              {criticalActionCount} Critical
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
                      : 'bg-slate-50 dark:bg-zinc-950/30 border-slate-200 dark:border-slate-700/30'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
                    <div className="flex flex-row sm:flex-col gap-2 items-start flex-wrap sm:flex-shrink-0">
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
                            <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-slate-200 dark:bg-zinc-800/40 text-slate-700 dark:text-slate-200 text-[10px] font-semibold">
                              <Clock className="w-2.5 h-2.5" />{action.countdown}
                            </span>
                          )}
                        </>
                      )}
                    </div>

                    <div className="flex-1 min-w-0 space-y-1.5 w-full sm:w-auto">
                      <p className={`text-[14px] font-bold leading-5 ${isActioned ? 'text-slate-500 dark:text-slate-400 line-through' : 'text-slate-900 dark:text-slate-100'}`}>
                        Decision required: {action.decision}
                      </p>
                      {!isActioned && (
                        <>
                          <p className="text-[12px] text-slate-800 dark:text-slate-200 font-medium">At risk if ignored: {action.ifIgnored}</p>
                          <p className="text-[12px] text-slate-700 dark:text-slate-300 font-semibold">
                            {action.timeSensitivity}
                            {action.financial && <span className="ml-2 text-slate-500 font-normal">· {action.financial}</span>}
                          </p>
                          <p className="text-[11px] text-slate-600 dark:text-slate-400">AI reasoning: {action.rationale}</p>
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
                      {isActioned && <p className="text-[12px] text-emerald-600 dark:text-emerald-400">Action recorded — logged to audit trail.</p>}
                    </div>

                    {!isActioned && (
                      <div className="flex items-center gap-2 flex-wrap sm:flex-shrink-0">
                        <button onClick={() => handleCommandAction(action)} className={`px-3 py-1.5 border rounded text-[12px] font-bold transition-all ${getActionBtnClass(action.urgency)}`}>
                          {action.actionLabel}
                        </button>
                        <button className="px-3 py-1.5 bg-transparent border border-slate-300 dark:border-slate-600/50 text-slate-700 dark:text-slate-200 rounded text-[12px] font-semibold hover:bg-slate-100 dark:hover:bg-zinc-800/40 transition-all">
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

        {/* ── 2-COL: Executive Intelligence Summary + Operational Risk ─────── */}
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-5">

          {/* Executive Intelligence Summary — always visible, AI briefing style */}
          <div className="bg-white dark:bg-zinc-900/25 border border-blue-200/50 dark:border-blue-500/20 border-l-[3px] border-l-blue-500 rounded-xl shadow-sm dark:shadow-none overflow-hidden">
            <div className="flex items-center justify-between px-5 py-3 bg-blue-50/40 dark:bg-blue-500/5 border-b border-blue-200/50 dark:border-blue-500/20">
              <div className="flex items-center gap-3">
                <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span className="text-[11px] font-black text-slate-900 dark:text-white uppercase tracking-widest">Executive Intelligence Summary</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-1.5 py-0.5 bg-blue-100 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 text-[9px] font-black text-blue-700 dark:text-blue-400 rounded tracking-widest uppercase">AI Briefing</span>
                <span className="text-[10px] text-slate-400 hidden sm:inline">4 sources · 3m ago</span>
              </div>
            </div>
            <div className="p-5 space-y-3.5">
              <div className="flex items-start gap-3 p-3.5 rounded-lg bg-red-50/60 dark:bg-red-500/5 border border-red-100 dark:border-red-500/15">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 flex-shrink-0"></div>
                <div className="space-y-1 flex-1">
                  <p className="text-[13px] font-bold text-red-700 dark:text-red-400">Staffing Risk — B-Shift @ 75%</p>
                  <ul className="space-y-0.5 text-[12px] text-slate-700 dark:text-slate-300">
                    <li>Minimum threshold breached (9 of 12 required)</li>
                    <li>2 deputies recommended within 4 hrs</li>
                    <li>Impact: Patrol response time +18%</li>
                  </ul>
                  <p className="text-[10px] text-slate-500 pt-0.5">CAD roster · HR scheduling · patrol deployment log</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3.5 rounded-lg bg-amber-50/60 dark:bg-amber-500/5 border border-amber-100 dark:border-amber-500/15">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 flex-shrink-0"></div>
                <div className="space-y-1 flex-1">
                  <p className="text-[13px] font-bold text-amber-700 dark:text-amber-400">Budget Alert — OT 19% Over Allocation</p>
                  <ul className="space-y-0.5 text-[12px] text-slate-700 dark:text-slate-300">
                    <li>OT spend $78,240 vs $65,000 allocation</li>
                    <li>2 lateral hires would reduce year-end overage by $23K</li>
                    <li>Action: Initiate hiring by Dec 15</li>
                  </ul>
                  <p className="text-[10px] text-slate-500 pt-0.5">Finance system · HR vacancy data · payroll records</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3.5 rounded-lg bg-amber-50/60 dark:bg-amber-500/5 border border-amber-100 dark:border-amber-500/15">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 flex-shrink-0"></div>
                <div className="space-y-1 flex-1">
                  <p className="text-[13px] font-bold text-amber-700 dark:text-amber-400">Compliance — USMS Inspection Dec 12–14</p>
                  <ul className="space-y-0.5 text-[12px] text-slate-700 dark:text-slate-300">
                    <li>H2-Pod HVAC repair requires approval within 48 hrs</li>
                    <li>3 policies require command signature before inspection</li>
                    <li>Risk: ACA non-compliance if HVAC unresolved</li>
                  </ul>
                  <p className="text-[10px] text-slate-500 pt-0.5">Compliance database · facilities management · policy tracker</p>
                </div>
              </div>
              <p className="text-[10px] text-slate-400 pt-1">Confidence: 92% · Model last trained on agency data 12h ago</p>
            </div>
          </div>

          {/* Cross-Module Operational Risk */}
          <div className="bg-white dark:bg-zinc-900/25 border border-slate-200 dark:border-slate-700/30 rounded-xl shadow-sm dark:shadow-none overflow-hidden">
            <div className="flex items-center justify-between px-5 py-3 border-b border-slate-200 dark:border-slate-700/30">
              <div className="flex items-center gap-2.5">
                <Activity className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                <span className="text-[11px] font-black text-slate-900 dark:text-white uppercase tracking-widest">Operational Risk</span>
              </div>
              <span className="text-[10px] text-slate-500">{moduleRisks.filter(m => m.risk === 'High').length} high-risk modules</span>
            </div>
            <div className="p-4 space-y-3">
              {moduleRisks.map((mod) => (
                <div key={mod.id} className="bg-slate-50 dark:bg-zinc-950/30 border border-slate-200 dark:border-slate-700/30 rounded-lg p-3.5 space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[13px] font-semibold text-slate-900 dark:text-slate-100">{mod.module}</span>
                    <span className={`flex-shrink-0 inline-flex items-center px-1.5 py-0.5 rounded border text-[10px] font-bold uppercase tracking-wide ${getRiskBadge(mod.risk)}`}>
                      {mod.risk}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] text-slate-500 uppercase tracking-wide">Utilization</span>
                      <span className={`text-[11px] font-bold tabular-nums ${mod.utilization >= 90 ? 'text-red-700 dark:text-red-400' : mod.utilization >= 80 ? 'text-amber-700 dark:text-amber-400' : 'text-emerald-700 dark:text-emerald-400'}`}>
                        {mod.utilization}%
                      </span>
                    </div>
                    <div className="h-1 bg-slate-200 dark:bg-zinc-800/50 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${getRiskBar(mod.risk)}`} style={{ width: `${Math.min(mod.utilization, 100)}%` }} />
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">{mod.bottleneck}</p>
                  <button
                    onClick={() => mod.route && navigate(createPageUrl(mod.route))}
                    className="w-full flex items-center justify-center gap-1 px-2.5 py-1.5 bg-slate-100 dark:bg-zinc-800/30 border border-slate-300 dark:border-slate-600/40 text-slate-700 dark:text-slate-300 rounded text-[11px] font-semibold hover:bg-slate-200 dark:hover:bg-zinc-800/50 transition-all"
                  >
                    <ArrowRight className="w-3 h-3" />{mod.action}
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* ── 2-COL: Division Status + Staffing/Compliance tabs ─────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

          {/* Division Status */}
          <div className="bg-white dark:bg-zinc-900/25 border border-slate-200 dark:border-slate-700/30 rounded-xl shadow-sm dark:shadow-none overflow-hidden">
            <div className="px-5 py-3 border-b border-slate-200 dark:border-slate-700/30">
              <span className="text-[11px] font-black text-slate-900 dark:text-white uppercase tracking-widest">Division Status</span>
            </div>
            <div className="p-4 space-y-2">
              {divisions.map((div, idx) => (
                <button
                  key={idx}
                  onClick={() => div.route && navigate(createPageUrl(div.route))}
                  onMouseEnter={() => setHoveredDivision(idx)}
                  onMouseLeave={() => setHoveredDivision(null)}
                  className="w-full bg-slate-50 dark:bg-zinc-950/30 border border-slate-200 dark:border-slate-700/30 rounded-lg px-4 py-3 text-left hover:border-slate-400 dark:hover:border-slate-600/50 transition-colors relative"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full flex-shrink-0 ${div.severity === 'red' ? 'bg-red-500' : div.severity === 'amber' ? 'bg-amber-500' : 'bg-emerald-500'}`}></div>
                      <span className="text-[13px] font-semibold text-slate-900 dark:text-white">{div.name}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-[12px] text-slate-700 dark:text-slate-300">{div.status}</span>
                      <span className="text-[11px] text-slate-500 tabular-nums">{div.staffing}</span>
                    </div>
                  </div>
                  {hoveredDivision === idx && (
                    <div className="absolute left-0 right-0 top-full mt-1 z-20 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-slate-700/50 rounded-lg p-3 shadow-xl">
                      {div.drill.split('\n').map((line, i) => (
                        <p key={i} className="text-[11px] text-slate-700 dark:text-slate-300 leading-relaxed">{line}</p>
                      ))}
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Staffing + Compliance tabbed panel */}
          <div className="bg-white dark:bg-zinc-900/25 border border-slate-200 dark:border-slate-700/30 rounded-xl shadow-sm dark:shadow-none overflow-hidden">
            <div className="flex border-b border-slate-200 dark:border-slate-700/30">
              <button
                onClick={() => setSecondaryTab('staffing')}
                className={`flex-1 px-4 py-3 text-[11px] font-black uppercase tracking-widest transition-colors ${
                  secondaryTab === 'staffing'
                    ? 'text-slate-900 dark:text-white border-b-2 border-amber-500 bg-amber-50/40 dark:bg-amber-500/5'
                    : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                }`}
              >
                Staffing Levels
              </button>
              <button
                onClick={() => setSecondaryTab('compliance')}
                className={`flex-1 px-4 py-3 text-[11px] font-black uppercase tracking-widest transition-colors ${
                  secondaryTab === 'compliance'
                    ? 'text-slate-900 dark:text-white border-b-2 border-red-500 bg-red-50/40 dark:bg-red-500/5'
                    : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                }`}
              >
                Federal Compliance
                <span className="ml-1.5 px-1 py-0.5 bg-red-100 dark:bg-red-500/15 border border-red-200 dark:border-red-500/20 text-red-700 dark:text-red-400 text-[9px] font-bold rounded">USMS</span>
              </button>
            </div>

            {secondaryTab === 'staffing' && (
              <div className="p-5 space-y-3">
                <div className="flex items-center justify-between text-[10px] text-slate-500 mb-1">
                  <span>164/178 authorized</span>
                  <span className="font-semibold text-amber-700 dark:text-amber-400">92.1% staffed</span>
                </div>
                {staffingLevels.map((div, idx) => (
                  <div key={idx}>
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-[13px] text-slate-800 dark:text-slate-300">{div.division}</span>
                        {div.note && <span className="text-[10px] text-slate-500">({div.note})</span>}
                      </div>
                      <div className="flex items-center gap-2.5">
                        <span className="text-[11px] text-slate-500 tabular-nums">{div.current}/{div.authorized}</span>
                        <span className={`text-[13px] font-bold tabular-nums ${div.percentage >= 90 ? 'text-emerald-600 dark:text-emerald-400' : div.percentage >= div.minThreshold ? 'text-amber-700 dark:text-amber-400' : 'text-red-700 dark:text-red-400'}`}>
                          {div.percentage}%
                        </span>
                      </div>
                    </div>
                    <div className="relative w-full h-1 bg-slate-200 dark:bg-zinc-900/50 rounded-full overflow-visible">
                      <div
                        className={`h-full rounded-full ${div.percentage >= 90 ? 'bg-emerald-500 dark:bg-emerald-500/40' : div.percentage >= div.minThreshold ? 'bg-amber-500 dark:bg-amber-500/40' : 'bg-red-500 dark:bg-red-500/40'}`}
                        style={{ width: `${Math.min(div.percentage, 100)}%` }}
                      />
                      <div className="absolute top-[-3px] w-[1.5px] h-[calc(100%+6px)] bg-red-500/50 rounded-full" style={{ left: `${div.minThreshold}%` }} />
                    </div>
                  </div>
                ))}
                <div className="flex items-center gap-1.5 pt-1 text-[10px] text-slate-500">
                  <div className="w-[1.5px] h-2.5 bg-red-500/50 rounded-full"></div>
                  <span>Min safe threshold</span>
                </div>
              </div>
            )}

            {secondaryTab === 'compliance' && (
              <div className="p-5 space-y-5">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-slate-500" />
                      <span className="text-[13px] font-semibold text-slate-900 dark:text-white">USMS Inspection Readiness</span>
                    </div>
                    <span className="px-1.5 py-0.5 bg-red-100 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-700 dark:text-red-400 text-[10px] font-bold rounded">Dec 12–14</span>
                  </div>
                  <div className="space-y-3">
                    {[
                      { label: 'Databases', value: '47/47', pct: 100, color: 'bg-emerald-500 dark:bg-emerald-500/40', warn: false },
                      { label: 'Policies', value: '44/47', pct: 94, color: 'bg-amber-500 dark:bg-amber-500/40', warn: true },
                      { label: 'Training Records', value: '156/164', pct: 95, color: 'bg-amber-500 dark:bg-amber-500/40', warn: true }
                    ].map((row) => (
                      <div key={row.label}>
                        <div className="flex items-center justify-between mb-1 text-[12px]">
                          <span className="text-slate-500">{row.label}</span>
                          <span className={row.warn ? 'text-amber-700 dark:text-amber-400 font-medium' : 'text-slate-700 dark:text-slate-300'}>{row.value}</span>
                        </div>
                        <div className="w-full h-1 bg-slate-200 dark:bg-zinc-900/50 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${row.color}`} style={{ width: `${row.pct}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="text-[10px] text-slate-500 mt-3">3 policies pending · 8 deputies need recertification · POC: Major Anderson</p>
                </div>
                <div className="border-t border-slate-200 dark:border-slate-700/30 pt-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Shield className="w-4 h-4 text-slate-500" />
                    <span className="text-[13px] font-semibold text-slate-900 dark:text-white">ACA Re-Accreditation</span>
                  </div>
                  <div className="space-y-2 text-[12px]">
                    {[
                      { label: 'Status', value: 'Accredited', cls: 'text-emerald-600 dark:text-emerald-400 font-medium' },
                      { label: 'Expires', value: 'August 2025', cls: 'text-slate-700 dark:text-slate-300' },
                      { label: 'Risk Level', value: 'Moderate', cls: 'text-amber-700 dark:text-amber-400 font-medium' },
                      { label: 'Issue', value: 'H2 HVAC — 72h window', cls: 'text-red-700 dark:text-red-400 font-medium' },
                      { label: 'Repair', value: 'Pending approval', cls: 'text-amber-700 dark:text-amber-400' },
                    ].map((row) => (
                      <div key={row.label} className="flex justify-between">
                        <span className="text-slate-500">{row.label}</span>
                        <span className={row.cls}>{row.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>

        {/* ── PENDING APPROVALS ──────────────────────────────────────────────── */}
        <div className="bg-white dark:bg-zinc-900/25 border border-slate-200 dark:border-slate-700/30 rounded-xl shadow-sm dark:shadow-none overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3 border-b border-slate-200 dark:border-slate-700/30">
            <span className="text-[11px] font-black text-slate-900 dark:text-white uppercase tracking-widest">Pending Approvals</span>
            <button onClick={() => navigate(createPageUrl('Approvals'))} className="text-[11px] text-amber-700 dark:text-amber-400 hover:text-amber-800 dark:hover:text-amber-300 font-semibold">
              View all {dashboardApprovals.length} →
            </button>
          </div>
          <div className="px-5 py-4 space-y-2">
            {topApprovals.map((item) => {
              const badge = getTierBadge(item.tier);
              return (
                <div
                  key={item.id}
                  className={`rounded-lg border border-slate-200 dark:border-slate-700/30 hover:bg-slate-50 dark:hover:bg-zinc-900/35 transition-colors ${
                    item.tier === 'critical' ? 'border-l-4 border-l-red-500' :
                    item.tier === 'action' ? 'border-l-4 border-l-amber-500' : 'border-l-4 border-l-slate-300 dark:border-l-slate-600'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 p-3">
                    <div className="flex-1 min-w-0 w-full sm:w-auto">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <p className="text-[13px] font-semibold text-slate-900 dark:text-white">{item.type}</p>
                        {badge && <span className={`px-1.5 py-0.5 border rounded text-[10px] font-bold ${badge.classes}`}>{badge.text}</span>}
                        <span className="text-[10px] text-slate-500">{getTimePending(item.timePendingMinutes)} ago</span>
                      </div>
                      <div className="flex items-center flex-wrap gap-x-2 gap-y-0.5 text-[11px]">
                        <span className="text-slate-500">{item.division}</span>
                        <span className="text-slate-400">·</span>
                        <span className="text-slate-500">{item.name}</span>
                        {item.financial && <><span className="text-slate-400">·</span><span className="text-slate-500">{item.financial}</span></>}
                        {item.impact && <><span className="text-slate-400">·</span><span className={item.tier === 'critical' ? 'text-red-700 dark:text-red-400' : item.tier === 'action' ? 'text-amber-700 dark:text-amber-400' : 'text-slate-500'}>{item.impact}</span></>}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap sm:flex-shrink-0">
                      <button onClick={(e) => openApprovalModal(item, 'approve', e)} className="px-3 py-1.5 text-[12px] font-semibold bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors">
                        Approve
                      </button>
                      <button onClick={(e) => openApprovalModal(item, 'deny', e)} className="px-3 py-1.5 text-[12px] font-medium text-slate-600 dark:text-slate-300 border border-slate-300 dark:border-slate-700/50 hover:bg-slate-100 dark:hover:bg-zinc-800/20 rounded-lg transition-colors">
                        Escalate
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 px-3 pb-2 ml-[10px] text-[10px] text-slate-500">
                    <Shield className="w-3 h-3 text-slate-400" />
                    <span>Logged to audit trail</span>
                    {item.impact && <><span className="text-slate-400">·</span><span>Impact: {item.impact}</span></>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* ── APPROVAL MODAL ─────────────────────────────────────────────────────── */}
      {selectedApproval && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={closeApprovalModal} />
          <div className="relative bg-white dark:bg-zinc-950 border border-slate-200 dark:border-slate-700/50 rounded-2xl p-8 max-w-md w-full shadow-2xl">
            <div className="flex items-start gap-3 mb-5">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center border ${approvalAction === 'approve' ? 'border-emerald-500/20' : 'border-red-500/20'}`}>
                {approvalAction === 'approve'
                  ? <ThumbsUp className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  : <XCircle className="w-5 h-5 text-red-700 dark:text-red-400" />}
              </div>
              <div className="flex-1">
                <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-0.5">
                  {approvalAction === 'approve' ? 'Approve' : 'Deny'} {selectedApproval.title}?
                </h3>
                <p className="text-xs text-slate-500">{selectedApproval.name} · {selectedApproval.details}</p>
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
                className="w-full px-3.5 py-2.5 bg-slate-100 dark:bg-black/50 border border-slate-200 dark:border-slate-700/50 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:border-slate-400 dark:focus:border-slate-600 resize-none text-sm"
              />
            </div>
            <div className="flex gap-3">
              <button onClick={closeApprovalModal} className="flex-1 px-4 py-2.5 bg-slate-100 dark:bg-zinc-900/30 hover:bg-slate-200 dark:hover:bg-zinc-900/60 border border-slate-200 dark:border-slate-700/30 rounded-xl text-slate-900 dark:text-white text-sm font-medium transition-colors">
                Cancel
              </button>
              <button onClick={confirmApprovalAction} className={`flex-1 px-4 py-2.5 rounded-xl text-white text-sm font-medium transition-colors ${approvalAction === 'approve' ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-red-600 hover:bg-red-700'}`}>
                Confirm {approvalAction === 'approve' ? 'Approval' : 'Denial'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── TOAST ──────────────────────────────────────────────────────────────── */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50">
          <div className={`px-4 py-3 rounded-lg border flex items-center gap-2 text-sm shadow-lg ${
            toastMessage.type === 'success' ? 'bg-slate-900 border-emerald-500/20 text-emerald-400' : 'bg-slate-900 border-red-500/20 text-red-400'
          }`}>
            {toastMessage.type === 'success'
              ? <CheckCircle className="w-4 h-4 flex-shrink-0" />
              : <AlertCircle className="w-4 h-4 flex-shrink-0" />}
            <p className="max-w-xs">{toastMessage.message}</p>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

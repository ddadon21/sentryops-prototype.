import React, { useState, useEffect, useRef } from 'react';
import {
  Clock, Printer, Download, RefreshCw, Shield,
  ChevronDown, ChevronUp, Phone, Radio, X, User, Building2,
  AlertTriangle, Target, Zap, Sparkles, CheckCircle,
  AlertOctagon, TrendingUp, TrendingDown, ArrowRight,
  Calendar, DollarSign, Users, Award
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';

export default function DailyCommandBrief() {
  const navigate = useNavigate();
  const [expandedDecision, setExpandedDecision] = useState(null);
  const [contactModal, setContactModal] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (d) => d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
  const formatDate = (d) => d.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  const handleRefresh = () => { setIsRefreshing(true); setTimeout(() => setIsRefreshing(false), 1800); };

  // ── AI Executive Summary ──────────────────────────────────────
  const aiSummary = {
    generatedAt: '06:00',
    updatedAt: '07:42',
    keyRisks: [
      { text: 'Federal USMS inspection opens in 48h — H2-Pod HVAC deficiency remains open. Failure triggers housing contract review.', severity: 'critical' },
      { text: 'Beat 7 West has zero patrol coverage for second consecutive day. Single-officer liability exposure in adjacent zones.', severity: 'critical' },
      { text: 'POST certification for 8 deputies expires within 8 days — suspension from duty is automatic on day 0.', severity: 'high' },
    ],
    requiredDecisions: [
      'Authorize H2-Pod HVAC emergency repair ($23.5K) before 10:00 EST — federal compliance.',
      'Approve B-Shift OT ($8.3K) before 12:00 EST — Zone 4 & 7 coverage restoration.',
      'Direct IA Supervisor Williams to submit UoF report or file state extension by 10:00 EST.',
    ],
    staffingConcerns: 'B-Shift operating at 75% strength (9/12). Bravo Division has 6 vacancies and 2 acting supervisors. Q4 OT budget $47K over projection.',
    complianceConcerns: 'USMS inspection scope expanded to include H2-Pod HVAC. UoF state report 8h overdue. 8 POST certifications expiring within 8 days.',
    budgetConcerns: 'OT actuals $47K over Q4 projection. HVAC emergency repair $23.5K unbudgeted. Fleet units 312/318 inspection overdue — risk of service removal.',
    operationalOutlook: 'Agency is functional but pressure is elevated. If today\'s decisions are executed before noon, shift health recovers to ~94%. Warrant sweep staged for 08:00 — positive enforcement action.',
  };

  // ── Executive Priority Scorecard ──────────────────────────────
  const scorecard = [
    { label: 'Decisions Due Today', value: 3, sub: 'Before 12:00 EST', icon: Zap, color: 'text-red-700 dark:text-red-400', bg: 'bg-red-500/8 border-red-500/20' },
    { label: 'Compliance Deadlines', value: 2, sub: 'Next 48 hours', icon: Shield, color: 'text-red-700 dark:text-red-400', bg: 'bg-red-500/8 border-red-500/20' },
    { label: 'Staffing Risks', value: 4, sub: 'Active gaps', icon: Users, color: 'text-amber-700 dark:text-amber-400', bg: 'bg-amber-500/8 border-amber-500/20' },
    { label: 'Budget Alerts', value: 2, sub: '$47K OT overage', icon: DollarSign, color: 'text-amber-700 dark:text-amber-400', bg: 'bg-amber-500/8 border-amber-500/20' },
    { label: 'Critical Incidents', value: 1, sub: 'UoF report overdue', icon: AlertOctagon, color: 'text-red-700 dark:text-red-400', bg: 'bg-red-500/8 border-red-500/20' },
  ];

  // ── What Changed Since Yesterday ──────────────────────────────
  const changes = [
    { type: 'new',      category: 'Compliance', text: 'USMS inspection scope expanded — H2-Pod HVAC now on primary checklist.' },
    { type: 'new',      category: 'Staffing',   text: 'Dep. Marcus called out FMLA — Beat 7 unmanned for second consecutive day.' },
    { type: 'resolved', category: 'Operations', text: 'B-Pod medical isolation cleared — 2 detainees transferred to County Hospital.' },
    { type: 'resolved', category: 'Fleet',      text: 'Unit 307 returned to service after passing State inspection.' },
    { type: 'change',   category: 'Budget',     text: 'Q4 overtime actuals now $47K over projection — driven by B-Shift gaps.' },
    { type: 'change',   category: 'Compliance', text: 'POST Board moved submission deadline 2 days earlier — now Dec 28.' },
  ];

  // ── Command Decisions ─────────────────────────────────────────
  const commandDecisions = [
    {
      id: 'dec-001', title: 'H2-Pod HVAC Failure — Emergency Repair',
      deadline: '10:00 EST Today', deadlineHours: 4,
      exposureType: 'Compliance', exposureColor: 'text-red-700 dark:text-red-400',
      requiredAction: 'Authorize emergency HVAC contract ($23.5K)',
      owner: { name: 'Facilities Director Chen', badge: 'FAC-001', phone: '770-555-0123' },
      escalation: 'USMS / External Compliance', severity: 'critical', status: 'escalated',
      consequence: 'Federal audit failure — housing contract at risk',
      aiRec: 'Issue verbal authorization now, written to follow. Delay past 10:00 puts H2-Pod on USMS deficiency list.',
      timeline: [
        { time: '03:00', event: 'HVAC compressor failure detected' },
        { time: '04:00', event: 'Emergency contractor quote: $23.5K' },
        { time: '05:30', event: 'Approval request submitted to Command' },
      ],
    },
    {
      id: 'dec-002', title: 'B-Shift Patrol Below Minimum — 9/12 Deputies',
      deadline: '12:00 EST Today', deadlineHours: 6,
      exposureType: 'Staffing', exposureColor: 'text-amber-700 dark:text-amber-400',
      requiredAction: 'Authorize B-Shift OT ($8.3K)',
      owner: { name: 'Capt. Rodriguez', badge: '3042', phone: '770-555-3042' },
      escalation: 'Command', severity: 'high', status: 'pending',
      consequence: 'Two zones single-officer — liability exposure',
      aiRec: 'Activate OT roster. Priority contact: Deputies Torres and Park (previously volunteered). $8.3K is within Q4 contingency.',
      timeline: [
        { time: '14:00', event: 'B-Shift started at 75% strength' },
        { time: '14:15', event: 'Zone coverage gap identified (4, 7)' },
        { time: '14:30', event: 'OT authorization request submitted' },
      ],
    },
    {
      id: 'dec-003', title: 'Use-of-Force Report — State Deadline Imminent',
      deadline: '10:00 EST Today', deadlineHours: 4,
      exposureType: 'Legal', exposureColor: 'text-red-700 dark:text-red-400',
      requiredAction: 'Direct Williams: submit UoF report or file state extension',
      owner: { name: 'IA Supervisor Williams', badge: '5012', phone: '770-555-5012' },
      escalation: 'Legal / State Reporting', severity: 'high', status: 'overdue',
      consequence: 'State reporting violation — potential sanction',
      aiRec: 'Call Williams directly. If report cannot be finalized, file a 48h extension request with State at ga-uof-extension@gbi.gov before 09:30.',
      timeline: [
        { time: 'Yesterday 14:47', event: 'OC spray incident — Deputy Johnson, B-Pod' },
        { time: 'Yesterday 16:00', event: 'Initial report filed' },
        { time: 'Today 06:00', event: 'Internal review deadline passed — 8h overdue' },
      ],
    },
  ];

  // ── Strategic Deadlines ───────────────────────────────────────
  const strategicDeadlines = {
    '7 Days': [
      { title: 'USMS Federal Inspection', date: 'Dec 18', readiness: 82, risk: 'critical', aiRec: 'Resolve HVAC today. Assign 2-person team to close C-Pod camera gap before Dec 17.' },
      { title: 'County Council Briefing', date: 'Dec 17', readiness: 70, risk: 'warning', aiRec: 'Update staffing narrative. Confirm budget projections with Finance by EOD tomorrow.' },
    ],
    '30 Days': [
      { title: 'POST Certification Window', date: 'Dec 28', readiness: 65, risk: 'critical', aiRec: 'Schedule 3-day training block this week. Prioritize Rivera (#1042) and Chen (#2081).' },
      { title: 'Holiday Staffing Plan', date: 'Dec 25–Jan 1', readiness: 40, risk: 'warning', aiRec: 'Activate 1.5x OT incentive immediately. Min 14 patrol / 22 detention required per shift.' },
      { title: 'Q4 Budget Close', date: 'Dec 31', readiness: 55, risk: 'warning', aiRec: 'Freeze discretionary spending now. Request Q4 amendment for $47K OT overage from Finance.' },
    ],
    '60 Days': [
      { title: 'Annual UoF Report', date: 'Feb 1', readiness: 60, risk: 'warning', aiRec: 'IA to compile incident log. 3 pending reports must close by Jan 15.' },
      { title: 'Jail Capacity Review', date: 'Jan 30', readiness: 75, risk: 'info', aiRec: 'Current trajectory hits 95% by Jan 20. Initiate early release review for 23 candidates.' },
    ],
    '90 Days': [
      { title: 'Fleet Budget Submission', date: 'Mar 15', readiness: 45, risk: 'warning', aiRec: 'Fleet Manager to finalize 6-vehicle replacement list. Est. $420K — include in FY26 request.' },
      { title: 'CALEA Pre-Assessment', date: 'Mar 1', readiness: 58, risk: 'info', aiRec: 'Assign accreditation coordinator. Begin gap analysis against CALEA standards immediately.' },
    ],
  };

  // ── Escalating Risks ──────────────────────────────────────────
  const escalatingRisks = [
    { id: 'e1', title: 'POST Certs — 8 Deputies Expiring', hours: 48, category: 'Compliance', severity: 'critical', owner: 'IA Williams', consequence: 'Deputies auto-suspended from duty', aiRec: 'Contact POST Board for emergency training slot. Rivera is priority #1.' },
    { id: 'e2', title: 'Jail Population at 92% Capacity', hours: 72, category: 'Operations', severity: 'high', owner: 'Maj. Wilson', consequence: 'Intake restrictions + court coordination', aiRec: 'Begin early release candidate review today. Notify courts of 23 eligible detainees.' },
    { id: 'e3', title: 'B-Shift Weekend Coverage Gap', hours: 36, category: 'Staffing', severity: 'high', owner: 'Capt. Rodriguez', consequence: '$4,160/day OT burn + 3 FMLA unresolved', aiRec: 'Pull from voluntary OT list. Contact off-duty Bravo roster before weekend roster locks.' },
    { id: 'e4', title: 'Fleet 312/318 — Inspection Overdue', hours: 60, category: 'Maintenance', severity: 'warning', owner: 'Fleet Mgr. Anderson', consequence: 'Units pulled → fleet at 86% availability', aiRec: 'Schedule both vehicles for Friday 0700 slot at county motor pool.' },
  ];

  // ── On Duty ───────────────────────────────────────────────────
  const onDuty = {
    watchCommander: { name: 'Major Wilson', badge: '2145', radio: 'Command-1', phone: '770-555-2145', email: 'wilson@gwinnettso.gov', onDutySince: '06:00' },
    patrolSupervisors: [
      { name: 'Sgt. Williams', badge: '4028', radio: 'P-Supervisor-1', phone: '770-555-4028' },
      { name: 'Sgt. Chen', badge: '4103', radio: 'P-Supervisor-2', phone: '770-555-4103' },
    ],
    detentionCommander: { name: 'Capt. Rodriguez', badge: '3042', radio: 'Detention-1', phone: '770-555-3042', onDutySince: '06:00' },
    onCallCommand: { name: 'Chief Deputy Harris', title: 'Chief Deputy', phone: '770-555-0001' },
  };

  const scheduledEvents = [
    { time: '09:00', title: 'Federal audit walkthrough', location: 'H-Pod', lead: 'Major Wilson', hoursUntil: 2, category: 'compliance' },
    { time: '10:00', title: 'HVAC authorization deadline', location: 'Command', lead: 'Sheriff Thompson', hoursUntil: 3, category: 'compliance' },
    { time: '13:00', title: 'Use-of-force review board', location: 'Admin 2F', lead: 'Chief Deputy Harris', hoursUntil: 6, category: 'internal' },
    { time: '14:00', title: 'Courts coordination meeting', location: 'Admin Conference', lead: 'Major Wilson', hoursUntil: 7, category: 'operational' },
    { time: '18:00', title: 'County Council public safety update', location: 'Government Center', lead: 'Sheriff Thompson', hoursUntil: 11, category: 'external' },
  ];

  // ── Helpers ───────────────────────────────────────────────────
  const getStatusBadge = (status) => {
    if (status === 'pending')  return 'bg-amber-500/10 border-amber-500/20 text-amber-700 dark:text-amber-400';
    if (status === 'escalated') return 'bg-red-500/10 border-red-500/20 text-red-700 dark:text-red-400';
    if (status === 'overdue')  return 'bg-red-500/10 border-red-500/20 text-red-700 dark:text-red-400';
    return 'bg-slate-500/10 border-slate-500/20 text-slate-500';
  };

  const riskColor = (r) => {
    if (r === 'critical') return { bar: 'bg-red-500', text: 'text-red-700 dark:text-red-400', pct: 'text-red-700 dark:text-red-400' };
    if (r === 'warning')  return { bar: 'bg-amber-500', text: 'text-amber-700 dark:text-amber-400', pct: 'text-amber-700 dark:text-amber-400' };
    return { bar: 'bg-blue-400', text: 'text-blue-700 dark:text-blue-400', pct: 'text-slate-500' };
  };

  const changeIcon = (type) => {
    if (type === 'new')      return { icon: TrendingUp, color: 'text-red-700 dark:text-red-400', label: 'NEW RISK', dot: 'bg-red-500' };
    if (type === 'resolved') return { icon: CheckCircle, color: 'text-emerald-600 dark:text-emerald-400', label: 'RESOLVED', dot: 'bg-emerald-500' };
    return { icon: TrendingDown, color: 'text-amber-700 dark:text-amber-400', label: 'CHANGE', dot: 'bg-amber-400' };
  };

  return (
    <DashboardLayout>
      <div className="p-5 lg:p-6 min-h-full">
        <div className="max-w-7xl mx-auto space-y-4">

          {/* ── Header ─────────────────────────────────────── */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h1 className="text-xl font-bold text-primary mb-0.5">Executive Briefing</h1>
              <p className="text-[11px] text-slate-500">
                {formatDate(currentTime)} · {formatTime(currentTime)} EST · Generated {aiSummary.generatedAt} · Updated {aiSummary.updatedAt}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => window.print()} className="flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-zinc-900/40 border border-border dark:border-slate-700/40 text-secondary rounded-lg text-[12px] hover:bg-slate-50 dark:hover:bg-zinc-900/60 transition-all">
                <Printer className="w-3.5 h-3.5" />Print
              </button>
              <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-zinc-900/40 border border-border dark:border-slate-700/40 text-secondary rounded-lg text-[12px] hover:bg-slate-50 dark:hover:bg-zinc-900/60 transition-all">
                <Download className="w-3.5 h-3.5" />PDF
              </button>
              <button onClick={handleRefresh} disabled={isRefreshing} className="flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-zinc-900/40 border border-border dark:border-slate-700/40 text-secondary rounded-lg text-[12px] hover:bg-slate-50 dark:hover:bg-zinc-900/60 transition-all disabled:opacity-50">
                <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />Refresh
              </button>
            </div>
          </div>

          {/* ── AI Executive Summary ────────────────────────── */}
          <div className="bg-slate-900 dark:bg-black/70 border border-slate-700/50 rounded-xl overflow-hidden">
            <div className="flex items-center gap-2 px-5 py-3 border-b border-slate-700/40">
              <Sparkles className="w-4 h-4 text-slate-400" />
              <span className="text-[12px] font-semibold text-slate-300 uppercase tracking-wider">AI Executive Summary</span>
              <span className="text-[10px] text-slate-500 ml-auto">Generated {aiSummary.generatedAt} · Updated {aiSummary.updatedAt} EST</span>
            </div>
            <div className="p-5 grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-4">
              {/* Key Risks */}
              <div className="lg:col-span-2">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Key Risks</p>
                <div className="space-y-1.5">
                  {aiSummary.keyRisks.map((r, i) => (
                    <div key={i} className="flex gap-2.5 items-start">
                      <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5 ${r.severity === 'critical' ? 'bg-red-500' : 'bg-amber-400'}`} />
                      <p className="text-[12px] text-slate-300 leading-snug">{r.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Required Decisions */}
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Required Decisions</p>
                <div className="space-y-1.5">
                  {aiSummary.requiredDecisions.map((d, i) => (
                    <div key={i} className="flex gap-2.5 items-start">
                      <ArrowRight className="w-3 h-3 text-amber-400 flex-shrink-0 mt-0.5" />
                      <p className="text-[12px] text-slate-300 leading-snug">{d}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right column: Staffing + Compliance */}
              <div className="space-y-3">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Staffing Concerns</p>
                  <p className="text-[12px] text-slate-300 leading-snug">{aiSummary.staffingConcerns}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Compliance Concerns</p>
                  <p className="text-[12px] text-slate-300 leading-snug">{aiSummary.complianceConcerns}</p>
                </div>
              </div>

              {/* Budget + Outlook */}
              <div className="space-y-3">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Budget Concerns</p>
                  <p className="text-[12px] text-slate-300 leading-snug">{aiSummary.budgetConcerns}</p>
                </div>
              </div>
              <div>
                <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest mb-1">Operational Outlook</p>
                <p className="text-[12px] text-slate-300 leading-snug">{aiSummary.operationalOutlook}</p>
              </div>
            </div>
          </div>

          {/* ── Executive Priority Scorecard ───────────────── */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {scorecard.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.label} className={`border rounded-xl p-3.5 ${s.bg}`}>
                  <div className="flex items-center justify-between mb-2">
                    <Icon className={`w-4 h-4 ${s.color}`} />
                  </div>
                  <p className={`text-[28px] font-black leading-none mb-0.5 ${s.color}`}>{s.value}</p>
                  <p className="text-[10px] text-slate-500 uppercase tracking-wide leading-tight">{s.label}</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">{s.sub}</p>
                </div>
              );
            })}
          </div>

          {/* ── What Changed + Today's Schedule ────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

            {/* What Changed Since Yesterday */}
            <div className="bg-white dark:bg-zinc-900/25 border border-border dark:border-slate-700/30 rounded-xl overflow-hidden">
              <div className="flex items-center gap-2 px-5 py-3 border-b border-border dark:border-slate-700/20">
                <TrendingUp className="w-4 h-4 text-secondary" />
                <span className="text-[13px] font-semibold text-primary">What Changed Since Yesterday</span>
              </div>
              <div className="divide-y divide-slate-700/10">
                {changes.map((c, i) => {
                  const cfg = changeIcon(c.type);
                  const Icon = cfg.icon;
                  return (
                    <div key={i} className="flex gap-3 px-5 py-2.5">
                      <Icon className={`w-3.5 h-3.5 flex-shrink-0 mt-0.5 ${cfg.color}`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-[11.5px] text-primary leading-snug">{c.text}</p>
                        <p className={`text-[9.5px] font-bold uppercase tracking-wider mt-0.5 ${cfg.color}`}>{cfg.label} · {c.category}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Today's Schedule */}
            <div className="bg-white dark:bg-zinc-900/25 border border-border dark:border-slate-700/30 rounded-xl overflow-hidden">
              <div className="flex items-center justify-between px-5 py-3 border-b border-border dark:border-slate-700/20">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-secondary" />
                  <span className="text-[13px] font-semibold text-primary">Today's Schedule</span>
                </div>
                <button onClick={() => navigate('/command/calendar')} className="text-[11px] text-slate-500 hover:text-secondary transition-colors">
                  Full Calendar <ArrowRight className="w-3 h-3 inline" />
                </button>
              </div>
              <div className="divide-y divide-slate-700/10">
                {scheduledEvents.map((e) => (
                  <div key={e.time} className={`flex items-center gap-4 px-5 py-2.5 ${e.hoursUntil <= 3 ? 'bg-amber-500/5' : ''}`}>
                    <div className="w-14 flex-shrink-0">
                      <p className="text-[12px] font-mono font-semibold text-secondary">{e.time}</p>
                      <p className="text-[9.5px] text-slate-500">in {e.hoursUntil}h</p>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        {e.hoursUntil <= 3 && <Clock className="w-3 h-3 text-amber-700 dark:text-amber-400 flex-shrink-0" />}
                        <p className="text-[12px] font-medium text-primary truncate">{e.title}</p>
                      </div>
                      <p className="text-[10px] text-slate-500">{e.location} · {e.lead}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Command Decisions Today ─────────────────────── */}
          <div className="bg-white dark:bg-zinc-900/25 border border-border dark:border-slate-700/30 rounded-xl overflow-hidden">
            <div className="flex items-center justify-between px-5 py-3 border-b border-border dark:border-slate-700/20">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-red-700 dark:text-red-400" />
                <span className="text-[13px] font-semibold text-primary uppercase tracking-wide">Command Decisions — Today</span>
              </div>
              <span className="text-[11px] text-slate-500">{commandDecisions.length} items · decision required</span>
            </div>

            <div className="px-4 py-3 space-y-2">
              {commandDecisions.map((item) => {
                const isExpanded = expandedDecision === item.id;
                return (
                  <div key={item.id} className={`rounded-xl border ${item.severity === 'critical' ? 'border-red-500/20 bg-red-500/[0.02]' : 'border-border dark:border-slate-700/30'}`}>
                    <div className="p-3.5 cursor-pointer hover:bg-slate-50 dark:hover:bg-zinc-900/20 transition-colors rounded-xl" onClick={() => setExpandedDecision(isExpanded ? null : item.id)}>
                      <div className="flex items-start gap-3 mb-2">
                        <div className={`w-1 self-stretch rounded-full flex-shrink-0 mt-0.5 ${item.severity === 'critical' ? 'bg-red-500' : 'bg-amber-500'}`} />
                        <p className="text-[13px] font-semibold text-primary flex-1 min-w-0">{item.title}</p>
                        <span className={`text-[10px] px-1.5 py-0.5 border rounded font-semibold flex-shrink-0 ${getStatusBadge(item.status)}`}>{item.status.toUpperCase()}</span>
                        {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-500 flex-shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-500 flex-shrink-0" />}
                      </div>
                      <div className="ml-4 grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-1.5 text-[11px]">
                        <div><p className="text-[9.5px] text-slate-500 uppercase tracking-wide">Deadline</p><p className={`font-semibold mt-0.5 ${item.severity === 'critical' ? 'text-red-700 dark:text-red-400' : 'text-amber-700 dark:text-amber-400'}`}>{item.deadline}</p></div>
                        <div><p className="text-[9.5px] text-slate-500 uppercase tracking-wide">Exposure</p><p className={`font-semibold mt-0.5 ${item.exposureColor}`}>{item.exposureType}</p></div>
                        <div className="col-span-2 lg:col-span-1"><p className="text-[9.5px] text-slate-500 uppercase tracking-wide">Action Required</p><p className="text-primary font-medium mt-0.5">{item.requiredAction}</p></div>
                        <div><p className="text-[9.5px] text-slate-500 uppercase tracking-wide">Owner</p><p className="text-secondary mt-0.5">{item.owner.name}</p></div>
                      </div>
                      <div className="ml-4 mt-2 flex items-center gap-2 text-[11px] flex-wrap">
                        <span className="text-red-700 dark:text-red-400">If delayed → {item.consequence}</span>
                      </div>
                      {/* AI recommendation always visible */}
                      <div className="ml-4 mt-2 flex gap-2 items-start bg-slate-50 dark:bg-zinc-900/30 rounded-lg px-3 py-2">
                        <Sparkles className="w-3 h-3 text-slate-400 flex-shrink-0 mt-0.5" />
                        <p className="text-[11px] text-secondary leading-snug">{item.aiRec}</p>
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="px-5 pb-3.5 pt-2 border-t border-border dark:border-slate-700/20">
                        <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-8">
                          <div className="flex-1 min-w-0 w-full sm:w-auto">
                            <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest mb-1.5">Event Timeline</p>
                            <div className="space-y-1">
                              {item.timeline.map((entry, idx) => (
                                <div key={idx} className="flex gap-3 text-[11.5px]">
                                  <span className="font-mono text-slate-500 w-32 flex-shrink-0">{entry.time}</span>
                                  <span className="text-secondary">{entry.event}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          <button onClick={(e) => { e.stopPropagation(); setContactModal(item.owner); }} className="px-3 py-1.5 text-[12px] font-medium text-secondary border border-border hover:bg-slate-100 dark:hover:bg-zinc-800/20 rounded-lg transition-colors flex-shrink-0">
                            Contact Owner
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── Upcoming Strategic Deadlines ───────────────── */}
          <div className="bg-white dark:bg-zinc-900/25 border border-border dark:border-slate-700/30 rounded-xl overflow-hidden">
            <div className="flex items-center gap-2 px-5 py-3 border-b border-border dark:border-slate-700/20">
              <Target className="w-4 h-4 text-secondary" />
              <span className="text-[13px] font-semibold text-primary uppercase tracking-wide">Upcoming Strategic Deadlines</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 divide-x-0 sm:divide-x divide-border dark:divide-slate-700/30">
              {Object.entries(strategicDeadlines).map(([horizon, items]) => (
                <div key={horizon} className="p-4">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">{horizon}</p>
                  <div className="space-y-3">
                    {items.map((item, i) => {
                      const rc = riskColor(item.risk);
                      return (
                        <div key={i} className="space-y-1.5">
                          <div className="flex items-start justify-between gap-2">
                            <p className="text-[11.5px] font-semibold text-primary leading-tight">{item.title}</p>
                            <span className={`text-[9.5px] font-bold ${rc.text} flex-shrink-0`}>{item.date}</span>
                          </div>
                          {item.readiness !== undefined && (
                            <div>
                              <div className="flex justify-between text-[9.5px] mb-0.5">
                                <span className="text-slate-500">Readiness</span>
                                <span className={rc.pct}>{item.readiness}%</span>
                              </div>
                              <div className="w-full h-1 bg-slate-100 dark:bg-zinc-800/40 rounded-full overflow-hidden">
                                <div className={`h-full rounded-full ${rc.bar}`} style={{ width: `${item.readiness}%` }} />
                              </div>
                            </div>
                          )}
                          <div className="flex gap-1.5 items-start">
                            <Sparkles className="w-2.5 h-2.5 text-slate-400 flex-shrink-0 mt-0.5" />
                            <p className="text-[10.5px] text-slate-500 leading-snug">{item.aiRec}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Escalating Risk + On Duty ───────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

            {/* Escalating Risk 72h */}
            <div className="bg-white dark:bg-zinc-900/25 border border-border dark:border-slate-700/30 rounded-xl overflow-hidden">
              <div className="flex items-center gap-2 px-5 py-3 border-b border-border dark:border-slate-700/20">
                <AlertTriangle className="w-4 h-4 text-amber-700 dark:text-amber-400" />
                <span className="text-[13px] font-semibold text-primary">Escalating Risk — Next 72 Hours</span>
                <span className="text-[10px] text-slate-500 ml-auto">Worsens if untouched</span>
              </div>
              <div className="divide-y divide-slate-700/10">
                {escalatingRisks.map((r) => (
                  <div key={r.id} className="px-5 py-3 hover:bg-slate-50 dark:hover:bg-zinc-800/10 transition-colors">
                    <div className="flex items-start gap-2 mb-1.5">
                      <div className={`w-0.5 self-stretch rounded-full flex-shrink-0 ${r.severity === 'critical' ? 'bg-red-500' : r.severity === 'high' ? 'bg-amber-500' : 'bg-blue-400'}`} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <p className="text-[12px] font-semibold text-primary flex-1">{r.title}</p>
                          <span className={`text-[10px] px-1.5 py-0.5 rounded border flex-shrink-0 ${r.severity === 'critical' ? 'bg-red-500/10 border-red-500/20 text-red-700 dark:text-red-400' : 'bg-amber-500/10 border-amber-500/20 text-amber-700 dark:text-amber-400'}`}>{r.hours}h</span>
                        </div>
                        <p className="text-[10.5px] text-red-700 dark:text-red-400/70 mb-1">If not resolved → {r.consequence}</p>
                        <div className="flex gap-1.5 items-start">
                          <Sparkles className="w-2.5 h-2.5 text-slate-400 flex-shrink-0 mt-0.5" />
                          <p className="text-[10.5px] text-secondary">{r.aiRec}</p>
                        </div>
                        <p className="text-[9.5px] text-slate-500 mt-1">{r.owner} · {r.category}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* On Duty Today */}
            <div className="bg-white dark:bg-zinc-900/25 border border-border dark:border-slate-700/30 rounded-xl overflow-hidden">
              <div className="flex items-center gap-2 px-5 py-3 border-b border-border dark:border-slate-700/20">
                <Users className="w-4 h-4 text-secondary" />
                <span className="text-[13px] font-semibold text-primary">Command Staff On Duty</span>
              </div>
              <div className="p-5 space-y-4">
                <div>
                  <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest mb-1.5">Watch Commander</p>
                  <div className="flex items-center gap-2">
                    <button onClick={() => setContactModal(onDuty.watchCommander)} className="text-[13px] font-semibold text-primary hover:text-secondary transition-colors">{onDuty.watchCommander.name}</button>
                    <span className="text-[11px] text-slate-500">#{onDuty.watchCommander.badge} · {onDuty.watchCommander.radio}</span>
                  </div>
                  <p className="text-[10px] text-slate-500">On duty since {onDuty.watchCommander.onDutySince}</p>
                </div>
                <div className="border-t border-border dark:border-slate-700/20 pt-3">
                  <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest mb-1.5">Patrol Supervisors</p>
                  {onDuty.patrolSupervisors.map((s, i) => (
                    <div key={i} className="flex items-center gap-2 mb-1">
                      <button onClick={() => setContactModal(s)} className="text-[12px] font-medium text-primary hover:text-secondary transition-colors">{s.name}</button>
                      <span className="text-[11px] text-slate-500">#{s.badge} · {s.radio}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-border dark:border-slate-700/20 pt-3">
                  <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest mb-1.5">Detention Commander</p>
                  <div className="flex items-center gap-2">
                    <button onClick={() => setContactModal(onDuty.detentionCommander)} className="text-[12px] font-medium text-primary hover:text-secondary transition-colors">{onDuty.detentionCommander.name}</button>
                    <span className="text-[11px] text-slate-500">#{onDuty.detentionCommander.badge} · {onDuty.detentionCommander.radio}</span>
                  </div>
                </div>
                <div className="border-t border-border dark:border-slate-700/20 pt-3">
                  <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest mb-1.5">On-Call Command</p>
                  <div className="flex items-center gap-2">
                    <button onClick={() => setContactModal(onDuty.onCallCommand)} className="text-[12px] font-medium text-primary hover:text-secondary transition-colors">{onDuty.onCallCommand.name}</button>
                    <span className="text-[11px] text-slate-500">{onDuty.onCallCommand.phone}</span>
                  </div>
                </div>
              </div>
              {/* Footer */}
              <div className="px-5 py-3 border-t border-border dark:border-slate-700/20 bg-slate-50 dark:bg-zinc-900/10 flex items-center gap-2">
                <Shield className="w-3 h-3 text-slate-500" />
                <span className="text-[10px] text-slate-500">Brief auto-generated {aiSummary.generatedAt} EST daily. Refresh for live updates.</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Contact Modal */}
      {contactModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setContactModal(null)} />
          <div className="relative bg-white dark:bg-zinc-950 border border-border rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <div className="flex items-start justify-between gap-3 mb-5">
              <div>
                <h3 className="text-base font-semibold text-primary mb-0.5">{contactModal.name}</h3>
                {contactModal.title && <p className="text-xs text-secondary">{contactModal.title}</p>}
              </div>
              <button onClick={() => setContactModal(null)} className="text-secondary hover:text-primary transition-colors"><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-3 text-sm">
              {contactModal.badge    && <div className="flex items-center gap-3"><User className="w-4 h-4 text-slate-500" /><span className="text-secondary">Badge #{contactModal.badge}</span></div>}
              {contactModal.radio    && <div className="flex items-center gap-3"><Radio className="w-4 h-4 text-slate-500" /><span className="text-secondary">Radio: {contactModal.radio}</span></div>}
              {contactModal.phone    && <div className="flex items-center gap-3"><Phone className="w-4 h-4 text-slate-500" /><span className="text-secondary">{contactModal.phone}</span></div>}
              {contactModal.email    && <div className="flex items-center gap-3"><Building2 className="w-4 h-4 text-slate-500" /><span className="text-secondary">{contactModal.email}</span></div>}
              {contactModal.onDutySince && <div className="flex items-center gap-3"><Clock className="w-4 h-4 text-slate-500" /><span className="text-secondary">On Duty Since {contactModal.onDutySince}</span></div>}
            </div>
            <div className="flex gap-3 mt-6">
              <button className="flex-1 px-4 py-2.5 text-xs font-medium text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/10 rounded-xl transition-colors">Call Cell</button>
              {contactModal.radio && <button className="flex-1 px-4 py-2.5 text-xs font-medium text-secondary border border-border hover:bg-slate-100 dark:hover:bg-zinc-800/20 rounded-xl transition-colors">Radio Contact</button>}
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

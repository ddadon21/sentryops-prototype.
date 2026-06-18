import React, { useState, useEffect } from 'react';
import {
  Clock, Shield, X, ChevronDown, ChevronUp, Users, Zap,
  ChevronRight, AlertCircle, Sparkles, TrendingUp, TrendingDown,
  Minus, UserCheck, Timer, AlertTriangle, CheckCircle
} from 'lucide-react';
import DashboardLayout from '../layouts/DashboardLayout';

// ── Alert Data ────────────────────────────────────────────────────
// Each alert has: impact score (0-100), AI trigger explanation,
// consequence if ignored, recommended command action, trend direction,
// and target resolution hours for TTR tracking.
const INITIAL_ALERTS = [
  {
    id: 1,
    severity: 'critical',
    category: 'personnel',
    title: 'Critical Staffing Shortage — B-Shift Patrol',
    impact: 'Two zones single-officer — safety compromised',
    description: 'B-Shift patrol operating at 9/12 deputies (75%). 2 FMLA absences, 1 workers comp, 1 emergency leave. Zones 4 & 7 single-officer patrol.',
    timestamp: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(),
    detectedTime: '08:42',
    owner: 'Patrol Major Davis',
    status: 'new',
    impactScore: 91,
    trend: 'worsening',
    aiTrigger: 'B-Shift fell to 75% strength (threshold: 85%). Zones 4 and 7 dropped to single-officer coverage, breaching the minimum two-officer patrol policy.',
    consequenceIfIgnored: 'Within 4 hours: any Zone 4/7 incident requiring backup will have 8–12 min delayed response. Liability exposure begins immediately on any use-of-force call.',
    commandAction: 'Authorize mandatory OT for 3 deputies now — covering B-Shift until 1800.',
    targetResolutionHours: 2,
    recommendations: ['Authorize mandatory OT — 6 hours coverage ($312)', 'Request mutual aid — Lawrenceville PD for zone 4', 'Shift coverage from Zone 3 overlap into Zone 7'],
    relatedData: { required: 12, current: 9, shortage: 3 }
  },
  {
    id: 2,
    severity: 'critical',
    category: 'equipment',
    title: 'Body Camera System Failure — 47 Units Offline',
    impact: 'State compliance violation if unresolved in 24h',
    description: 'Primary body camera server failure. 47 cameras (68% of patrol fleet) unable to upload footage. Evidence integrity at risk.',
    timestamp: new Date(Date.now() - 28 * 60 * 60 * 1000).toISOString(),
    detectedTime: '03:15',
    owner: 'IT Director Harrison',
    status: 'resolved',
    impactScore: 88,
    trend: 'improving',
    aiTrigger: 'Body camera upload server went offline at 03:14. 47 cameras stopped syncing. GA POST evidence integrity mandate requires continuous upload capability during active patrol shifts.',
    consequenceIfIgnored: 'After 24 hours: state compliance violation filed. Any use-of-force incident without recorded footage creates civil liability gap — unrecorded incidents are undefendable in court.',
    commandAction: 'Emergency IT response authorized. Confirm backup server is fully synced before morning briefing.',
    targetResolutionHours: 4,
    recommendations: ['Emergency IT response dispatched', 'Activate backup server', 'Manual footage collection as interim'],
    resolution: 'Server backup restored at 03:15. All 47 cameras syncing. Backlog cleared by 06:00. No footage lost.',
    resolvedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    resolvedBy: 'IT Team Lead Harrison'
  },
  {
    id: 3,
    severity: 'high',
    category: 'compliance',
    title: 'POST Certifications Expiring — 8 Deputies',
    impact: 'Deputies lose duty status if not renewed',
    description: '8 deputies approaching POST certification expiration. Training records incomplete for 3. State mandate requires completion.',
    timestamp: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
    detectedTime: '06:00',
    owner: 'Training Dir. Martinez',
    status: 'new',
    impactScore: 74,
    trend: 'stable',
    aiTrigger: 'System detected 8 deputy POST certifications within 60-day expiration window. 3 have incomplete training records — these will not qualify for renewal without remediation.',
    consequenceIfIgnored: 'By Jan 31: 8 deputies become non-deployable pending recertification. Three shifts will fall below minimum staffing. POST inspection exposure documented.',
    commandAction: 'Confirm Dec 18–20 makeup sessions are locked and require supervisor sign-off on the 3 incomplete records this week.',
    targetResolutionHours: 336,
    recommendations: ['Schedule makeup sessions — Dec 18, 19, 20 booked', 'Supervisor follow-up on 3 incomplete records', 'Weekly tracking to command staff']
  },
  {
    id: 4,
    severity: 'high',
    category: 'equipment',
    title: 'Fleet at 86% — 6 Vehicles Out of Service',
    impact: 'No margin for additional breakdowns',
    description: '56/65 patrol units operational. 3 units awaiting transmission repairs (return Jan 20), 2 in collision repair, 1 state inspection overdue.',
    timestamp: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
    detectedTime: '07:00',
    owner: 'Fleet Mgr. Anderson',
    status: 'acknowledged',
    impactScore: 67,
    trend: 'stable',
    aiTrigger: 'Fleet availability dropped to 86% (threshold: 90%). With 6 units offline simultaneously, any additional breakdown will push operational zones below minimum vehicle requirements.',
    consequenceIfIgnored: 'If one more unit breaks down: two patrol zones will have no dedicated vehicle. Insurance carrier flags agency for non-compliance after 7 days at sub-90%.',
    commandAction: 'Reassign 2 admin vehicles to patrol rotation immediately — no cost, no approval needed.',
    targetResolutionHours: 72,
    recommendations: ['Authorize weekend mechanic OT ($840)', 'Reassign 2 admin units to patrol', 'A/B shift overlap vehicle sharing'],
    relatedData: { total: 65, inService: 56, maintenance: 6, reserve: 3 }
  },
  {
    id: 5,
    severity: 'medium',
    category: 'budget',
    title: 'Patrol OT at 126% of Quarterly Allocation',
    impact: 'Projects $32K overage by quarter end',
    description: '$78K spent / $62K budgeted. Primary drivers: B-Shift shortage (62%), special events (22%), training backfill (16%).',
    timestamp: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
    detectedTime: '09:00',
    owner: 'Deputy Chief Jones',
    status: 'acknowledged',
    impactScore: 52,
    trend: 'worsening',
    aiTrigger: 'Patrol OT spend crossed 125% of quarterly budget. Current trajectory projects $32K overage. B-Shift shortage is the primary driver — it adds ~$312/day in mandatory OT spend.',
    consequenceIfIgnored: 'By quarter end: $32K overage requires unplanned budget transfer or supplemental appropriation. Finance committee review triggered at 130% spend.',
    commandAction: 'Transfer $35K from training underspend to OT budget — Finance Director can execute same-day.',
    targetResolutionHours: 48,
    recommendations: ['Transfer $35K from training underspend', 'OT >4hrs requires Captain approval', 'Accelerate 2 deputy positions to Q1 hiring']
  },
  {
    id: 6,
    severity: 'medium',
    category: 'facilities',
    title: 'Detention at 91.5% Capacity (842/920)',
    impact: 'Intake restrictions trigger at 95% — projected Friday',
    description: 'H2-Pod at 113% (36/32 beds). 4 inmates on emergency mattresses. 18 early release candidates pending judge approval.',
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    detectedTime: '06:00',
    owner: 'Det. Major Wilson',
    status: 'new',
    impactScore: 59,
    trend: 'worsening',
    aiTrigger: 'Facility capacity crossed 91% with H2-Pod at 113%. At current intake rate (+8/day), the 95% threshold that triggers mandatory intake restrictions will be reached by Friday morning.',
    consequenceIfIgnored: 'By Friday: intake restrictions require county-wide booking diversion. Arresting agencies redirect to other facilities. Federal housing contract review triggered. ACA compliance at risk.',
    commandAction: 'Contact Superior Court admin today to expedite hearings on the 18 early release candidates.',
    targetResolutionHours: 72,
    recommendations: ['Expedite court hearings — contact Superior Court admin', 'Review 18 early release candidates', 'Activate E-Pod overflow (6 beds)']
  },
  {
    id: 7,
    severity: 'low',
    category: 'training',
    title: 'Q4 Training — 23 Personnel Incomplete',
    impact: 'State mandate deadline Dec 31',
    description: 'Patrol (15), Detention (6), Investigations (2). Gaps: defensive tactics refresher, emergency response procedures.',
    timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    detectedTime: '06:00',
    owner: 'Training Dir. Martinez',
    status: 'acknowledged',
    impactScore: 38,
    trend: 'improving',
    aiTrigger: '23 personnel have not completed mandatory Q4 training with 19 days until the Dec 31 state mandate deadline. At current completion rate, 7–9 will remain incomplete.',
    consequenceIfIgnored: 'After Dec 31: non-compliant personnel flagged in POST records. Training compliance rate drops from 91.8% to ~88%. Agency cited in next POST review.',
    commandAction: 'Send supervisor-addressed compliance notices to the 23 — individual accountability closes this faster than group sessions.',
    targetResolutionHours: 240,
    recommendations: ['Automated reminders + supervisor follow-up', 'Makeup sessions: Dec 18, 19, 20', 'Weekly completion tracking']
  },
  {
    id: 8,
    severity: 'info',
    category: 'operations',
    title: 'Special Event — Regional Championship Game Friday',
    impact: '4 units requested for traffic control',
    description: 'Gwinnett Stadium 7:30 PM. Expected 8-10K attendance. Standard event rate: $52/hr per unit (4 hrs).',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    detectedTime: '10:00',
    owner: 'Capt. Rodriguez',
    status: 'acknowledged',
    impactScore: 18,
    trend: 'stable',
    aiTrigger: 'Event coordination request received from stadium management. Standard event profile: 4 OT units, 4-hour window. Event reimbursed at $52/hr per unit — net agency cost: $0.',
    consequenceIfIgnored: 'If units not confirmed by Thursday: stadium requests mutual aid from Lawrenceville PD. Agency loses event revenue relationship.',
    commandAction: 'Confirm 4 OT units for Friday 1900–2300. Joint briefing Thursday 1600.',
    targetResolutionHours: 24,
    recommendations: ['Deploy 4 OT units A-Shift overlap ($832)', 'Joint briefing Thursday 1600', 'Traffic plan: Sugarloaf/Satellite intersection']
  },
  {
    id: 9,
    severity: 'high',
    category: 'personnel',
    title: 'FMLA Request — Investigations Lt. Garcia',
    impact: '6-week gap in Special Investigations leadership',
    description: 'Effective Jan 20. Coverage needed for 8 detectives, 2 active major cases. Interim supervisor assignment required.',
    timestamp: new Date(Date.now() - 36 * 60 * 60 * 1000).toISOString(),
    detectedTime: '14:00',
    owner: 'Captain Johnson',
    status: 'resolved',
    impactScore: 71,
    trend: 'improving',
    aiTrigger: 'FMLA paperwork submitted for Lt. Garcia with Jan 20 start. Two active major cases (Case 24-1847, Case 24-2103) have no designated supervisor and cannot proceed without one.',
    consequenceIfIgnored: 'Without interim assignment: two major cases stall on Jan 20. Prosecution timelines missed on Case 24-1847 (scheduled Feb hearing).',
    commandAction: 'Appoint interim supervisor before Jan 15 to allow two-week handoff period.',
    targetResolutionHours: 48,
    recommendations: ['Assign Sgt. Thompson as interim supervisor', 'Case transition briefing Dec 15', 'Active cases reassigned with documentation'],
    resolution: 'Sgt. Thompson assigned interim supervisor. Training transition completed Dec 10. Active cases reassigned.',
    resolvedAt: new Date(Date.now() - 20 * 60 * 60 * 1000).toISOString(),
    resolvedBy: 'Captain Johnson'
  },
  {
    id: 10,
    severity: 'medium',
    category: 'compliance',
    title: 'Use-of-Force Policy Review Due',
    impact: 'State mandate — SOP-127 last updated Jan 2024',
    description: 'GA POST Rule 464-5-.03 requires annual review. Deadline Dec 31.',
    timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
    detectedTime: '08:00',
    owner: 'Chief Deputy Anderson',
    status: 'resolved',
    impactScore: 44,
    trend: 'improving',
    aiTrigger: 'Annual policy review clock triggered on SOP-127 (Use of Force). GA POST Rule 464-5-.03 mandates review within 12 months of last update. Last update: Jan 8, 2024. Deadline: Dec 31.',
    consequenceIfIgnored: 'After Dec 31: POST compliance violation documented. Policy cannot be cited in use-of-force defense without current approval signature.',
    commandAction: 'Review and sign revised SOP-127-R1 draft — takes 15 minutes.',
    targetResolutionHours: 24,
    recommendations: ['Review SOP-127-R1 draft', 'Distribute to all personnel upon approval'],
    resolution: 'Policy SOP-127-R1 approved Dec 8. Distributed to all personnel.',
    resolvedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    resolvedBy: 'Chief Deputy Anderson'
  }
];

export default function CommandAlerts() {
  const [filterSeverity, setFilterSeverity] = useState('all');
  const [acknowledgedAlerts, setAcknowledgedAlerts] = useState(new Set());
  const [expandedAlerts, setExpandedAlerts] = useState(new Set());
  const [assignModalOpen, setAssignModalOpen] = useState(false);
  const [resolveModalOpen, setResolveModalOpen] = useState(false);
  const [alertToAction, setAlertToAction] = useState(null);
  const [assignPersonnel, setAssignPersonnel] = useState('');
  const [resolveNotes, setResolveNotes] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [alerts, setAlerts] = useState(INITIAL_ALERTS);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 30000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
  const formatDate = (date) => date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  const ESCALATION_THRESHOLDS = {
    critical: { escalateMs: 1 * 60 * 60 * 1000, overdueMs: 4 * 60 * 60 * 1000 },
    high: { escalateMs: 4 * 60 * 60 * 1000, overdueMs: null }
  };

  const getEscalationState = (alert) => {
    if (alert.status === 'resolved') return null;
    if (acknowledgedAlerts.has(alert.id) && alert.severity !== 'critical') return null;
    const thresholds = ESCALATION_THRESHOLDS[alert.severity];
    if (!thresholds) return null;
    const elapsed = Date.now() - new Date(alert.timestamp).getTime();
    if (thresholds.overdueMs && elapsed >= thresholds.overdueMs) return 'overdue';
    if (elapsed >= thresholds.escalateMs) return 'escalating';
    return null;
  };

  const getSeverityConfig = (severity) => ({
    critical: { strip: 'bg-red-500', pill: 'bg-red-100 border-red-200 text-red-700 dark:bg-red-500/10 dark:border-red-500/20 dark:text-red-400', label: 'Critical' },
    high:     { strip: 'bg-amber-500', pill: 'bg-amber-100 border-amber-200 text-amber-700 dark:bg-amber-500/10 dark:border-amber-500/20 dark:text-amber-400', label: 'High' },
    medium:   { strip: 'bg-amber-500/60', pill: 'bg-amber-500/8 border-amber-500/15 text-amber-700 dark:text-amber-400/80', label: 'Medium' },
    low:      { strip: 'bg-slate-400', pill: 'bg-slate-500/10 border-slate-500/20 text-slate-500', label: 'Low' },
    info:     { strip: 'bg-slate-500', pill: 'bg-slate-500/10 border-slate-500/20 text-slate-500', label: 'Info' },
  }[severity] || { strip: 'bg-slate-500', pill: 'bg-slate-500/10 border-slate-500/20 text-slate-500', label: severity });

  const getStatusConfig = (status, escalation) => {
    if (escalation === 'overdue') return { pill: 'bg-red-500/15 border-red-500/25 text-red-700 dark:text-red-400', label: 'Overdue' };
    if (escalation === 'escalating') return { pill: 'bg-red-100 border-red-200 text-red-700 dark:bg-red-500/10 dark:border-red-500/20 dark:text-red-400', label: 'Escalating' };
    return {
      new:          { pill: 'bg-amber-100 border-amber-200 text-amber-700 dark:bg-amber-500/10 dark:border-amber-500/20 dark:text-amber-400', label: 'New' },
      acknowledged: { pill: 'bg-slate-500/10 border-slate-500/20 text-slate-500', label: 'Ack\'d' },
      resolved:     { pill: 'bg-emerald-100 border-emerald-200 text-emerald-700 dark:bg-emerald-500/10 dark:border-emerald-500/20 dark:text-emerald-400', label: 'Resolved' },
    }[status] || { pill: 'bg-slate-500/10 border-slate-500/20 text-slate-500', label: status };
  };

  const getImpactScoreColor = (score) => {
    if (score >= 80) return 'text-red-700 dark:text-red-400';
    if (score >= 60) return 'text-amber-700 dark:text-amber-400';
    if (score >= 40) return 'text-amber-600 dark:text-amber-500';
    return 'text-slate-500';
  };

  const getImpactScoreBg = (score) => {
    if (score >= 80) return 'bg-red-500/8 border-red-500/20';
    if (score >= 60) return 'bg-amber-500/8 border-amber-500/15';
    if (score >= 40) return 'bg-amber-500/5 border-amber-500/10';
    return 'bg-slate-100 dark:bg-zinc-800/20 border-slate-200 dark:border-slate-700/30';
  };

  const TrendIcon = ({ trend, size = 'w-3 h-3' }) => {
    if (trend === 'worsening') return <TrendingUp className={`${size} text-red-700 dark:text-red-400`} />;
    if (trend === 'improving') return <TrendingDown className={`${size} text-green-600 dark:text-green-400`} />;
    return <Minus className={`${size} text-slate-500`} />;
  };

  const getTTRDisplay = (alert) => {
    if (alert.status === 'resolved' && alert.resolvedAt) {
      const elapsed = new Date(alert.resolvedAt) - new Date(alert.timestamp);
      const hrs = Math.floor(elapsed / 3600000);
      const mins = Math.floor((elapsed % 3600000) / 60000);
      return { label: `Resolved in ${hrs}h ${mins}m`, color: 'text-green-600 dark:text-green-400', onTarget: true };
    }
    const elapsed = Date.now() - new Date(alert.timestamp).getTime();
    const targetMs = alert.targetResolutionHours * 3600000;
    const elapsedHrs = Math.floor(elapsed / 3600000);
    const remainingMs = targetMs - elapsed;
    if (remainingMs < 0) {
      const overdueHrs = Math.abs(Math.floor(remainingMs / 3600000));
      return { label: `${overdueHrs}h past target`, color: 'text-red-700 dark:text-red-400', onTarget: false };
    }
    const remainingHrs = Math.floor(remainingMs / 3600000);
    const pct = Math.min(100, Math.round((elapsed / targetMs) * 100));
    return { label: `${remainingHrs}h of ${alert.targetResolutionHours}h target`, color: pct > 75 ? 'text-amber-700 dark:text-amber-400' : 'text-slate-500', onTarget: true, pct };
  };

  const getOpenDuration = (timestamp) => {
    const diffMs = Date.now() - new Date(timestamp).getTime();
    const mins = Math.floor(diffMs / 60000);
    const hrs = Math.floor(mins / 60);
    const days = Math.floor(hrs / 24);
    if (days > 0) return `${days}d ${hrs % 24}h`;
    if (hrs > 0) return `${hrs}h ${mins % 60}m`;
    return `${mins}m`;
  };

  const severityWeight = { critical: 0, high: 1, medium: 2, low: 3, info: 4 };

  const filteredAlerts = alerts
    .filter(alert => {
      if (filterSeverity === 'active') return alert.status !== 'resolved';
      if (filterSeverity === 'all') return true;
      return alert.severity === filterSeverity;
    })
    .sort((a, b) => {
      if (a.status === 'resolved' && b.status !== 'resolved') return 1;
      if (a.status !== 'resolved' && b.status === 'resolved') return -1;
      const sevDiff = (severityWeight[a.severity] ?? 4) - (severityWeight[b.severity] ?? 4);
      if (sevDiff !== 0) return sevDiff;
      return new Date(b.timestamp) - new Date(a.timestamp);
    });

  const activeAlerts = alerts.filter(a => a.status !== 'resolved');
  const criticalActiveCount = activeAlerts.filter(a => a.severity === 'critical').length;
  const worseningCount = activeAlerts.filter(a => a.trend === 'worsening').length;
  const improvingCount = activeAlerts.filter(a => a.trend === 'improving').length;

  // Top unresolved alerts for AI summary (highest impact score)
  const attentionAlerts = activeAlerts
    .filter(a => a.status !== 'resolved')
    .sort((a, b) => b.impactScore - a.impactScore)
    .slice(0, 3);

  const toggleExpanded = (alertId) => {
    setExpandedAlerts(prev => {
      const next = new Set(prev);
      next.has(alertId) ? next.delete(alertId) : next.add(alertId);
      return next;
    });
  };

  const acknowledgeAlert = (alertId) => {
    setAcknowledgedAlerts(prev => new Set(prev).add(alertId));
  };

  const handleAssign = (alertId) => {
    if (assignPersonnel) {
      setAlerts(prev => prev.map(a => a.id === alertId ? { ...a, owner: assignPersonnel, status: 'acknowledged' } : a));
      setAssignModalOpen(false);
      setAlertToAction(null);
      setAssignPersonnel('');
    }
  };

  const handleResolve = (alertId) => {
    if (resolveNotes) {
      setAlerts(prev => prev.map(a =>
        a.id === alertId ? { ...a, status: 'resolved', resolution: resolveNotes, resolvedAt: new Date().toISOString(), resolvedBy: 'Sheriff Thompson' } : a
      ));
      setResolveModalOpen(false);
      setAlertToAction(null);
      setResolveNotes('');
    }
  };

  const filterOptions = [
    { id: 'all', label: 'All', count: alerts.length },
    { id: 'active', label: 'Active', count: activeAlerts.length },
    { id: 'critical', label: 'Critical', count: alerts.filter(a => a.severity === 'critical').length },
    { id: 'high', label: 'High', count: alerts.filter(a => a.severity === 'high').length },
    { id: 'medium', label: 'Medium', count: alerts.filter(a => a.severity === 'medium').length },
    { id: 'low', label: 'Low', count: alerts.filter(a => a.severity === 'low').length },
  ];

  return (
    <DashboardLayout>
      <div className="p-5 lg:p-7">
        <div className="max-w-[1200px] mx-auto">

          {/* ── Page Header ────────────────────────────────── */}
          <div className="mb-4">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-bold text-primary mb-1">Command Notifications Center</h2>
                <div className="flex items-center gap-2 text-[11px] text-slate-500">
                  <span>{formatDate(currentTime)}</span>
                  <span className="text-slate-700">·</span>
                  <span>{formatTime(currentTime)} EST</span>
                  <span className="text-slate-700">·</span>
                  <span>{activeAlerts.length} active</span>
                  {criticalActiveCount > 0 && (
                    <>
                      <span className="text-slate-700">·</span>
                      <span className="text-red-700 dark:text-red-400 font-semibold">{criticalActiveCount} critical</span>
                    </>
                  )}
                  {worseningCount > 0 && (
                    <>
                      <span className="text-slate-700">·</span>
                      <span className="text-red-700 dark:text-red-400">{worseningCount} worsening</span>
                    </>
                  )}
                  {improvingCount > 0 && (
                    <>
                      <span className="text-slate-700">·</span>
                      <span className="text-green-600 dark:text-green-400">{improvingCount} improving</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* ── AI Command Attention Required ─────────────── */}
          <div className="mb-4 bg-slate-900 dark:bg-black border border-slate-700/60 rounded-xl overflow-hidden">
            <div className="px-4 py-2.5 border-b border-slate-700/50 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-violet-400" />
              <span className="text-[11px] font-bold text-white uppercase tracking-wider">AI Command Attention Required</span>
              <div className="ml-auto flex items-center gap-2 text-[10px]">
                <span className="text-slate-400">{attentionAlerts.length} items needing command decision</span>
                {worseningCount > 0 && (
                  <span className="flex items-center gap-1 text-red-400">
                    <TrendingUp className="w-3 h-3" />{worseningCount} worsening
                  </span>
                )}
              </div>
            </div>
            <div className="divide-y divide-slate-700/40">
              {attentionAlerts.map((alert, i) => (
                <div key={alert.id} className="flex items-start gap-3 px-4 py-2.5">
                  <div className="flex items-center gap-1.5 flex-shrink-0 mt-0.5">
                    <span className="text-[10px] font-black text-slate-500 w-3">{i + 1}</span>
                    <div className={`text-[11px] font-black font-mono ${getImpactScoreColor(alert.impactScore)}`}>{alert.impactScore}</div>
                    <TrendIcon trend={alert.trend} size="w-3 h-3" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-semibold text-white leading-tight mb-0.5">{alert.title}</p>
                    <p className="text-[10px] text-slate-300 leading-snug">
                      <span className="text-violet-300 font-semibold">Action: </span>{alert.commandAction}
                    </p>
                  </div>
                  <div className="flex-shrink-0 text-right">
                    <p className="text-[9px] text-slate-400 font-mono">{getOpenDuration(alert.timestamp)} open</p>
                    <p className="text-[9px] text-slate-500 capitalize">{alert.owner}</p>
                  </div>
                </div>
              ))}
              {attentionAlerts.length === 0 && (
                <div className="flex items-center gap-2 px-4 py-3">
                  <CheckCircle className="w-3.5 h-3.5 text-green-400" />
                  <span className="text-[11px] text-green-300">No active alerts requiring immediate command attention.</span>
                </div>
              )}
            </div>
          </div>

          {/* ── Filter Pills ────────────────────────────────── */}
          <div className="mb-3 flex items-center gap-1.5 flex-wrap">
            {filterOptions.map(opt => (
              <button
                key={opt.id}
                onClick={() => setFilterSeverity(opt.id)}
                className={`px-2.5 py-1 rounded text-[11px] font-medium border transition-all ${
                  filterSeverity === opt.id
                    ? 'bg-slate-200 dark:bg-zinc-800/50 border-slate-300 dark:border-slate-600/50 text-primary'
                    : 'bg-transparent border-slate-300 dark:border-slate-700/40 text-slate-500 hover:text-secondary hover:border-slate-400 dark:hover:border-slate-600/30'
                }`}
              >
                {opt.label}
                <span className={`ml-1 ${filterSeverity === opt.id ? 'text-slate-500' : 'text-slate-700'}`}>{opt.count}</span>
              </button>
            ))}
          </div>

          {/* ── Alert Feed ──────────────────────────────────── */}
          <div className="space-y-px">
            {filteredAlerts.map(alert => {
              const sev = getSeverityConfig(alert.severity);
              const escalation = getEscalationState(alert);
              const stat = getStatusConfig(alert.status, escalation);
              const isAcknowledged = acknowledgedAlerts.has(alert.id);
              const isExpanded = expandedAlerts.has(alert.id);
              const isResolved = alert.status === 'resolved';
              const ttr = getTTRDisplay(alert);

              return (
                <div
                  key={alert.id}
                  className={`rounded border transition-colors ${
                    isResolved
                      ? 'border-border bg-slate-50 dark:bg-zinc-900/[0.06] opacity-30'
                      : isAcknowledged
                      ? 'border-border dark:border-slate-700/30 bg-white dark:bg-zinc-900/15 opacity-70'
                      : 'border-border dark:border-slate-700/30 bg-white dark:bg-zinc-900/15 hover:bg-slate-50 dark:hover:bg-zinc-900/30'
                  }`}
                >
                  {/* ── Compact Row ── */}
                  <div className="flex items-center gap-2.5 px-3.5 py-[9px]">
                    <div className={`w-[4px] self-stretch rounded-full flex-shrink-0 ${sev.strip}`} />

                    {/* Impact Score */}
                    <div className={`px-1.5 py-px border rounded text-[10px] font-black font-mono flex-shrink-0 leading-tight ${getImpactScoreBg(alert.impactScore)} ${getImpactScoreColor(alert.impactScore)}`}>
                      {alert.impactScore}
                    </div>

                    <span className={`px-1.5 py-px border rounded text-[10px] font-semibold flex-shrink-0 leading-tight ${sev.pill}`}>
                      {sev.label}
                    </span>

                    <span className={`text-[13px] font-bold flex-1 min-w-0 truncate ${isResolved ? 'text-slate-500' : 'text-primary'}`}>
                      {alert.title}
                    </span>

                    {/* Trend */}
                    <TrendIcon trend={alert.trend} size="w-3.5 h-3.5" />

                    {/* Owner */}
                    <span className="hidden lg:block text-[10px] text-slate-500 flex-shrink-0 max-w-[120px] truncate">
                      {alert.owner}
                    </span>

                    {/* TTR */}
                    {!isResolved && (
                      <span className={`hidden xl:block text-[10px] flex-shrink-0 font-mono whitespace-nowrap ${ttr.color}`}>
                        {ttr.label}
                      </span>
                    )}

                    {/* Open duration */}
                    {!isResolved && (
                      <span className={`text-[10px] flex-shrink-0 font-mono whitespace-nowrap ${escalation === 'overdue' ? 'text-red-700 dark:text-red-400 font-semibold' : 'text-slate-700'}`}>
                        {getOpenDuration(alert.timestamp)}
                      </span>
                    )}

                    <span className={`px-1.5 py-px border rounded text-[10px] font-semibold flex-shrink-0 leading-tight ${stat.pill}`}>
                      {stat.label}
                    </span>

                    {escalation && !isResolved && (
                      <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 animate-pulse ${escalation === 'overdue' ? 'bg-red-500' : 'bg-amber-500'}`} />
                    )}

                    <div className="flex items-center gap-1 flex-shrink-0 ml-1">
                      {!isResolved && !isAcknowledged && (
                        <button
                          onClick={(e) => { e.stopPropagation(); acknowledgeAlert(alert.id); }}
                          className="px-2 py-0.5 text-[10px] font-medium text-slate-500 hover:text-white border border-border hover:border-slate-600/30 rounded transition-colors"
                        >
                          Ack
                        </button>
                      )}
                      <button onClick={() => toggleExpanded(alert.id)} className="p-0.5 text-slate-500 hover:text-secondary transition-colors">
                        {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                      </button>
                    </div>
                  </div>

                  {/* Mobile impact line */}
                  <div className="xl:hidden px-3.5 pb-1.5 -mt-0.5 pl-[46px]">
                    <span className="text-[10px] text-secondary">{alert.impact}</span>
                  </div>

                  {/* ── Expanded Detail ── */}
                  {isExpanded && (
                    <div className="border-t border-border dark:border-slate-700/30 ml-[22px]">

                      {/* Why this alert fired */}
                      <div className="px-3 pt-2.5 pb-2 border-b border-border dark:border-slate-700/20">
                        <p className="text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-1">Why This Alert Was Triggered</p>
                        <p className="text-[11px] text-secondary leading-relaxed">{alert.aiTrigger}</p>
                      </div>

                      {/* 3-col: Consequence · Recommended Action · TTR + Ownership */}
                      {!isResolved && (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-slate-100 dark:bg-zinc-800/20 border-b border-border dark:border-slate-700/20">
                          {/* Consequence */}
                          <div className="px-3 py-2 bg-white dark:bg-zinc-900/15">
                            <p className="text-[9px] font-bold text-red-700 dark:text-red-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                              <AlertTriangle className="w-2.5 h-2.5" />
                              Consequence If Ignored
                            </p>
                            <p className="text-[10px] text-secondary leading-snug">{alert.consequenceIfIgnored}</p>
                          </div>
                          {/* Recommended action */}
                          <div className="px-3 py-2 bg-white dark:bg-zinc-900/15">
                            <p className="text-[9px] font-bold text-violet-600 dark:text-violet-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                              <Sparkles className="w-2.5 h-2.5" />
                              Recommended Command Action
                            </p>
                            <p className="text-[11px] font-semibold text-primary leading-snug">{alert.commandAction}</p>
                          </div>
                          {/* TTR + ownership */}
                          <div className="px-3 py-2 bg-white dark:bg-zinc-900/15">
                            <div className="flex items-center gap-2 mb-1.5">
                              <Timer className="w-2.5 h-2.5 text-slate-500" />
                              <p className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">Time-to-Resolution</p>
                            </div>
                            <div className="mb-1">
                              <div className="flex items-center justify-between text-[10px] mb-0.5">
                                <span className={ttr.color}>{ttr.label}</span>
                                {ttr.pct !== undefined && <span className="text-slate-500">{ttr.pct}%</span>}
                              </div>
                              {ttr.pct !== undefined && (
                                <div className="w-full bg-slate-200 dark:bg-zinc-800/50 rounded-full h-1">
                                  <div className={`h-1 rounded-full ${ttr.pct > 75 ? 'bg-amber-500' : ttr.pct > 50 ? 'bg-amber-400' : 'bg-green-500'}`} style={{ width: `${ttr.pct}%` }} />
                                </div>
                              )}
                            </div>
                            <div className="flex items-center gap-1 text-[10px] text-slate-500 mt-1.5">
                              <UserCheck className="w-2.5 h-2.5" />
                              <span>Owner: <span className="text-secondary font-medium">{alert.owner}</span></span>
                            </div>
                            <div className="flex items-center gap-1 text-[10px] mt-0.5">
                              <TrendIcon trend={alert.trend} size="w-2.5 h-2.5" />
                              <span className={`font-semibold capitalize ${alert.trend === 'worsening' ? 'text-red-700 dark:text-red-400' : alert.trend === 'improving' ? 'text-green-600 dark:text-green-400' : 'text-slate-500'}`}>
                                {alert.trend}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Resolution (if resolved) */}
                      {isResolved && alert.resolution && (
                        <div className="px-3 py-2.5 border-b border-border dark:border-slate-700/20">
                          <p className="text-[9px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-1">Resolution</p>
                          <p className="text-[11px] text-secondary">{alert.resolution}</p>
                          <div className="flex items-center gap-2 text-[9px] text-slate-500 mt-1">
                            <span>{alert.resolvedBy}</span>
                            <span>·</span>
                            <span>{alert.resolvedAt && new Date(alert.resolvedAt).toLocaleString()}</span>
                            <span>·</span>
                            <span className="text-green-600 dark:text-green-400">{ttr.label}</span>
                          </div>
                        </div>
                      )}

                      {/* Description + Additional options */}
                      <div className="px-3 py-2.5">
                        <p className="text-[10px] text-secondary leading-relaxed mb-2">{alert.description}</p>

                        {alert.recommendations && !isResolved && (
                          <div className="mb-2">
                            <p className="text-[9px] font-semibold text-slate-500 uppercase tracking-wider mb-1">Additional Options</p>
                            <div className="space-y-0.5">
                              {alert.recommendations.map((rec, idx) => (
                                <div key={idx} className="flex items-start gap-1.5 text-[10px]">
                                  <ChevronRight className="w-2.5 h-2.5 mt-0.5 text-slate-700 flex-shrink-0" />
                                  <span className="text-secondary">{rec}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Actions */}
                        {!isResolved && (
                          <div className="flex items-center gap-1.5 pt-1.5 border-t border-border">
                            {!isAcknowledged && (
                              <button
                                onClick={() => acknowledgeAlert(alert.id)}
                                className="px-2.5 py-1 text-[10px] font-medium text-secondary border border-border hover:bg-slate-100 dark:hover:bg-zinc-800/20 rounded transition-colors"
                              >
                                Acknowledge
                              </button>
                            )}
                            <button
                              onClick={() => { setAlertToAction(alert); setAssignModalOpen(true); }}
                              className="px-2.5 py-1 text-[10px] font-medium text-secondary border border-border hover:bg-slate-100 dark:hover:bg-zinc-800/20 rounded transition-colors"
                            >
                              Reassign
                            </button>
                            <button
                              onClick={() => { setAlertToAction(alert); setResolveModalOpen(true); }}
                              className="px-2.5 py-1 text-[10px] font-medium text-secondary border border-slate-600/30 hover:bg-slate-100 dark:hover:bg-zinc-800/20 rounded transition-colors"
                            >
                              Resolve
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* ── Data Confidence Strip ──────────────────────── */}
          <div className="mt-4 px-4 py-2 bg-slate-50 dark:bg-zinc-900/[0.06] border border-border dark:border-slate-800/20 rounded flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-1.5">
              <Shield className="w-3 h-3 text-slate-700" />
              <span className="text-[10px] text-slate-700">Live sources</span>
            </div>
            <div className="flex items-center gap-2">
              {['CAD', 'RMS', 'Detention', 'Fleet', 'Compliance', 'Budget'].map(mod => (
                <span key={mod} className="flex items-center gap-1 text-[10px] text-slate-500">
                  <div className="w-1 h-1 rounded-full bg-green-500" />
                  {mod}
                </span>
              ))}
            </div>
            <span className="text-[10px] text-slate-500 ml-auto">Last sync: 1m ago</span>
          </div>

        </div>
      </div>

      {/* ── Assign Modal ── */}
      {assignModalOpen && alertToAction && (
        <>
          <div className="fixed inset-0 bg-black/40 z-40" onClick={() => { setAssignModalOpen(false); setAlertToAction(null); setAssignPersonnel(''); }} />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-zinc-950 border border-border rounded-xl p-5 max-w-sm w-full shadow-2xl">
              <h3 className="text-sm font-semibold text-primary mb-1">Reassign Alert</h3>
              <p className="text-[11px] text-secondary mb-3">{alertToAction.title}</p>
              <input
                type="text"
                value={assignPersonnel}
                onChange={(e) => setAssignPersonnel(e.target.value)}
                placeholder="Personnel name or unit..."
                className="w-full px-3 py-2 bg-surface border border-slate-300 dark:border-slate-700/40 rounded-lg text-sm text-primary placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500/50 mb-3"
              />
              <div className="flex gap-2">
                <button
                  onClick={() => { setAssignModalOpen(false); setAlertToAction(null); setAssignPersonnel(''); }}
                  className="flex-1 px-3 py-1.5 text-xs font-medium text-slate-700 border border-slate-300 hover:bg-slate-50 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleAssign(alertToAction.id)}
                  className="flex-1 px-3 py-1.5 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                >
                  Assign
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* ── Resolve Modal ── */}
      {resolveModalOpen && alertToAction && (
        <>
          <div className="fixed inset-0 bg-black/40 z-40" onClick={() => { setResolveModalOpen(false); setAlertToAction(null); setResolveNotes(''); }} />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-zinc-950 border border-border rounded-xl p-5 max-w-sm w-full shadow-2xl">
              <h3 className="text-sm font-semibold text-primary mb-1">Resolve Alert</h3>
              <p className="text-[11px] text-secondary mb-3">{alertToAction.title}</p>
              <textarea
                value={resolveNotes}
                onChange={(e) => setResolveNotes(e.target.value)}
                placeholder="Resolution notes..."
                rows={3}
                className="w-full px-3 py-2 bg-surface border border-slate-300 dark:border-slate-700/40 rounded-lg text-sm text-primary placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500/50 mb-3 resize-none"
              />
              <div className="flex gap-2">
                <button
                  onClick={() => { setResolveModalOpen(false); setAlertToAction(null); setResolveNotes(''); }}
                  className="flex-1 px-3 py-1.5 text-xs font-medium text-slate-700 border border-slate-300 hover:bg-slate-50 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleResolve(alertToAction.id)}
                  className="flex-1 px-3 py-1.5 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                >
                  Resolve
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </DashboardLayout>
  );
}

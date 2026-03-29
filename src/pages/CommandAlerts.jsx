import React, { useState, useEffect } from 'react';
import {
  Clock,
  Shield,
  X,
  ChevronDown,
  ChevronUp,
  Users,
  Zap,
  FileWarning,
  DollarSign,
  Home,
  FileText,
  ChevronRight,
  AlertCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';

export default function CommandAlerts() {
  const navigate = useNavigate();
  const [filterSeverity, setFilterSeverity] = useState('all');
  const [acknowledgedAlerts, setAcknowledgedAlerts] = useState(new Set());
  const [expandedAlerts, setExpandedAlerts] = useState(new Set());
  const [assignModalOpen, setAssignModalOpen] = useState(false);
  const [resolveModalOpen, setResolveModalOpen] = useState(false);
  const [alertToAction, setAlertToAction] = useState(null);
  const [assignPersonnel, setAssignPersonnel] = useState('');
  const [resolveNotes, setResolveNotes] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());

  // Tick every 30s so "Open" durations stay live
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 30000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
  const formatDate = (date) => date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  // ============================================================
  // ESCALATION THRESHOLDS
  // Critical: 1h → Escalating, 4h → Overdue
  // High: 4h → Escalating
  // ============================================================
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

  // ============================================================
  // ALERT DATA — Operational deviations from thresholds
  // ============================================================
  const [alerts, setAlerts] = useState([
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
      owner: 'IT Director',
      status: 'resolved',
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
      recommendations: ['Transfer $35K from training underspend', 'OT >4hrs requires Captain approval', 'Accelerate 2 deputy positions to Q1 hiring']
    },
    {
      id: 6,
      severity: 'medium',
      category: 'facilities',
      title: 'Detention at 91.5% Capacity (842/920)',
      impact: 'Intake restrictions trigger at 95% — projected Fri',
      description: 'H2-Pod at 113% (36/32 beds). 4 inmates on emergency mattresses. 18 early release candidates pending judge approval.',
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      detectedTime: '06:00',
      owner: 'Det. Major Wilson',
      status: 'new',
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
      resolution: 'Policy SOP-127-R1 approved Dec 8. Distributed to all personnel.',
      resolvedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
      resolvedBy: 'Chief Deputy Anderson'
    }
  ]);

  // ============================================================
  // SEVERITY & STATUS CONFIG
  // ============================================================
  const getSeverityConfig = (severity) => {
    const configs = {
      critical: { strip: 'bg-red-500', pill: 'bg-red-50 border-red-200 text-red-700 dark:bg-red-500/10 dark:border-red-500/20 dark:text-red-400', label: 'Critical' },
      high: { strip: 'bg-amber-500', pill: 'bg-amber-50 border-amber-200 text-amber-700 dark:bg-amber-500/10 dark:border-amber-500/20 dark:text-amber-400', label: 'High' },
      medium: { strip: 'bg-amber-500/60', pill: 'bg-amber-500/8 border-amber-500/15 text-amber-600 dark:text-amber-400/80', label: 'Medium' },
      low: { strip: 'bg-slate-400', pill: 'bg-slate-500/10 border-slate-500/20 text-slate-500', label: 'Low' },
      info: { strip: 'bg-slate-500', pill: 'bg-slate-500/10 border-slate-500/20 text-slate-500', label: 'Info' }
    };
    return configs[severity] || configs.info;
  };

  const getStatusConfig = (status, escalation) => {
    if (escalation === 'overdue') return { pill: 'bg-red-500/15 border-red-500/25 text-red-600 dark:text-red-400', label: 'Overdue' };
    if (escalation === 'escalating') return { pill: 'bg-red-50 border-red-200 text-red-700 dark:bg-red-500/10 dark:border-red-500/20 dark:text-red-400', label: 'Escalating' };
    const configs = {
      new: { pill: 'bg-amber-50 border-amber-200 text-amber-700 dark:bg-amber-500/10 dark:border-amber-500/20 dark:text-amber-400', label: 'New' },
      acknowledged: { pill: 'bg-slate-500/10 border-slate-500/20 text-slate-500', label: 'Acknowledged' },
      resolved: { pill: 'bg-emerald-50 border-emerald-200 text-emerald-700 dark:bg-emerald-500/10 dark:border-emerald-500/20 dark:text-emerald-400', label: 'Resolved' }
    };
    return configs[status] || configs.acknowledged;
  };

  // ============================================================
  // FILTERING & SORTING
  // Critical pinned at top. Never mix severity groups.
  // ============================================================
  const severityWeight = { critical: 0, high: 1, medium: 2, low: 3, info: 4 };

  const filteredAlerts = alerts
    .filter(alert => {
      if (filterSeverity === 'acknowledged') return acknowledgedAlerts.has(alert.id);
      if (filterSeverity === 'all') return true;
      return alert.severity === filterSeverity;
    })
    .sort((a, b) => {
      // Resolved always at bottom
      if (a.status === 'resolved' && b.status !== 'resolved') return 1;
      if (a.status !== 'resolved' && b.status === 'resolved') return -1;
      // Severity groups — never mix
      const sevDiff = (severityWeight[a.severity] ?? 4) - (severityWeight[b.severity] ?? 4);
      if (sevDiff !== 0) return sevDiff;
      // Within same severity: newest first
      return new Date(b.timestamp) - new Date(a.timestamp);
    });

  const activeAlerts = alerts.filter(a => a.status !== 'resolved');
  const criticalActiveCount = activeAlerts.filter(a => a.severity === 'critical').length;

  // ============================================================
  // TIME HELPERS
  // ============================================================
  const getOpenDuration = (timestamp) => {
    const diffMs = Date.now() - new Date(timestamp).getTime();
    const mins = Math.floor(diffMs / 60000);
    const hrs = Math.floor(mins / 60);
    const days = Math.floor(hrs / 24);
    if (days > 0) return `Open ${days}d ${hrs % 24}h`;
    if (hrs > 0) return `Open ${hrs}h ${mins % 60}m`;
    return `Open ${mins}m`;
  };

  const toggleExpanded = (alertId) => {
    setExpandedAlerts(prev => {
      const next = new Set(prev);
      if (next.has(alertId)) next.delete(alertId);
      else next.add(alertId);
      return next;
    });
  };

  const acknowledgeAlert = (alertId) => {
    setAcknowledgedAlerts(prev => new Set(prev).add(alertId));
  };

  const handleAssign = (alertId) => {
    if (assignPersonnel) {
      setAlerts(prev => prev.map(a =>
        a.id === alertId ? { ...a, owner: assignPersonnel, status: 'acknowledged' } : a
      ));
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

  // Filter pills
  const filterOptions = [
    { id: 'all', label: 'All', count: alerts.length },
    { id: 'critical', label: 'Critical', count: alerts.filter(a => a.severity === 'critical').length },
    { id: 'high', label: 'High', count: alerts.filter(a => a.severity === 'high').length },
    { id: 'medium', label: 'Medium', count: alerts.filter(a => a.severity === 'medium').length },
    { id: 'low', label: 'Low', count: alerts.filter(a => a.severity === 'low').length },
    { id: 'info', label: 'Info', count: alerts.filter(a => a.severity === 'info').length },
    { id: 'acknowledged', label: 'Acknowledged', count: acknowledgedAlerts.size }
  ];

  return (
    <DashboardLayout>
      <div className="p-4 lg:p-6">
        <div className="max-w-[1400px] mx-auto">

        {/* ── Page Header ────────────────────────────────── */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-1">Command Alerts</h2>
          <div className="flex items-center gap-2 text-[11px] text-slate-500">
            <span>{formatDate(currentTime)}</span>
            <span className="text-slate-700">·</span>
            <span>{formatTime(currentTime)} EST</span>
            <span className="text-slate-700">·</span>
            <span>Operational deviation feed</span>
          </div>
        </div>

        {/* ── Severity Filter Pills ──────────────────────── */}
        <div className="mb-4 flex items-center gap-1.5 flex-wrap">
          {filterOptions.map(opt => (
            <button
              key={opt.id}
              onClick={() => setFilterSeverity(opt.id)}
              className={`px-2.5 py-1 rounded text-[11px] font-medium border transition-all ${
                filterSeverity === opt.id
                  ? 'bg-slate-200 dark:bg-slate-700/50 border-slate-300 dark:border-slate-600/50 text-slate-900 dark:text-white'
                  : 'bg-transparent border-slate-300 dark:border-slate-700/40 text-slate-500 hover:text-slate-700 dark:text-slate-300 hover:border-slate-400 dark:hover:border-slate-600/30'
              }`}
            >
              {opt.label}
              <span className={`ml-1 ${filterSeverity === opt.id ? 'text-slate-500' : 'text-slate-600'}`}>{opt.count}</span>
            </button>
          ))}
        </div>

        {/* ================================================================
            ALERT FEED — Compact signal rows
            Scannable in under 20 seconds.
            Critical pinned. Severity grouped. No mixing.
            ================================================================ */}
        <div className="space-y-px">
          {filteredAlerts.map(alert => {
            const sev = getSeverityConfig(alert.severity);
            const escalation = getEscalationState(alert);
            const stat = getStatusConfig(alert.status, escalation);
            const isAcknowledged = acknowledgedAlerts.has(alert.id);
            const isExpanded = expandedAlerts.has(alert.id);
            const isResolved = alert.status === 'resolved';

            return (
              <div
                key={alert.id}
                className={`rounded border transition-colors ${
                  isResolved
                    ? 'border-slate-200 dark:border-slate-800/10 bg-slate-50 dark:bg-slate-800/[0.06] opacity-[0.30]'
                    : isAcknowledged
                    ? 'border-slate-200 dark:border-slate-700/30 bg-white dark:bg-slate-800/15 opacity-70'
                    : 'border-slate-200 dark:border-slate-700/30 bg-white dark:bg-slate-800/15 hover:bg-slate-50 dark:hover:bg-slate-800/30'
                }`}
              >
                {/* ── Compact Row ──────────────────────── */}
                <div className="flex items-center gap-2.5 px-3.5 py-[9px]">
                  {/* Severity strip */}
                  <div className={`w-[4px] self-stretch rounded-full flex-shrink-0 ${sev.strip}`}></div>

                  {/* Severity pill */}
                  <span className={`px-1.5 py-px border rounded text-[10px] font-semibold flex-shrink-0 leading-tight ${sev.pill}`}>
                    {sev.label}
                  </span>

                  {/* Title */}
                  <span className={`text-[13px] font-bold flex-1 min-w-0 truncate ${isResolved ? 'text-slate-500' : 'text-slate-900 dark:text-white'}`}>
                    {alert.title}
                  </span>

                  {/* Impact — max ~12 words */}
                  <span className="hidden xl:block text-[10px] text-slate-600 dark:text-slate-400 max-w-[240px] truncate flex-shrink-0">
                    {alert.impact}
                  </span>

                  {/* Owner */}
                  <span className="hidden lg:block text-[10px] text-slate-500 flex-shrink-0 max-w-[120px] truncate">
                    {alert.owner}
                  </span>

                  {/* Detected time — exact, not relative */}
                  <span className="text-[10px] text-slate-600 flex-shrink-0 font-mono whitespace-nowrap">
                    {alert.detectedTime}
                  </span>

                  {/* Open duration */}
                  {!isResolved && (
                    <span className={`text-[10px] flex-shrink-0 font-mono whitespace-nowrap ${
                      escalation === 'overdue' ? 'text-red-600 dark:text-red-400 font-semibold' : 'text-slate-600'
                    }`}>
                      {getOpenDuration(alert.timestamp)}
                    </span>
                  )}

                  {/* Status pill (reflects escalation state) */}
                  <span className={`px-1.5 py-px border rounded text-[10px] font-semibold flex-shrink-0 leading-tight ${stat.pill}`}>
                    {stat.label}
                  </span>

                  {/* Escalation pulse — visual urgency */}
                  {escalation && !isResolved && (
                    <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 animate-pulse ${
                      escalation === 'overdue' ? 'bg-red-500' : 'bg-amber-500'
                    }`}></div>
                  )}

                  {/* Actions: Ack + View */}
                  <div className="flex items-center gap-1 flex-shrink-0 ml-1">
                    {!isResolved && !isAcknowledged && (
                      <button
                        onClick={(e) => { e.stopPropagation(); acknowledgeAlert(alert.id); }}
                        className="px-2 py-0.5 text-[10px] font-medium text-slate-500 hover:text-white border border-slate-700/30 hover:border-slate-600/30 rounded transition-colors"
                      >
                        Ack
                      </button>
                    )}
                    <button
                      onClick={() => toggleExpanded(alert.id)}
                      className="p-0.5 text-slate-500 hover:text-slate-700 dark:text-slate-300 transition-colors"
                    >
                      {isExpanded
                        ? <ChevronUp className="w-3 h-3" />
                        : <ChevronDown className="w-3 h-3" />
                      }
                    </button>
                  </div>
                </div>

                {/* Mobile: impact line */}
                <div className="xl:hidden px-3.5 pb-1.5 -mt-0.5 pl-[26px]">
                  <span className="text-[10px] text-slate-600 dark:text-slate-400">{alert.impact}</span>
                </div>

                {/* ── Expanded Detail ───────────────────── */}
                {isExpanded && (
                  <div className="px-3 pb-2.5 border-t border-slate-200 dark:border-slate-700/8 pt-2.5 ml-[22px]">
                    <p className="text-[11px] text-slate-600 dark:text-slate-400 mb-2 leading-relaxed max-w-3xl">{alert.description}</p>

                    {/* Metadata */}
                    <div className="flex items-center gap-3 mb-2 text-[10px] text-slate-500 flex-wrap">
                      <span>Owner: <span className="text-slate-700 dark:text-slate-300">{alert.owner}</span></span>
                      <span className="text-slate-700">|</span>
                      <span>Detected {alert.detectedTime}</span>
                      <span className="text-slate-700">|</span>
                      <span className="capitalize">{alert.category}</span>
                      {escalation && (
                        <>
                          <span className="text-slate-700">|</span>
                          <span className={escalation === 'overdue' ? 'text-red-600 dark:text-red-400 font-bold' : 'text-red-600 dark:text-red-400 font-semibold'}>
                            {escalation === 'overdue' ? 'OVERDUE' : 'Escalating'}
                          </span>
                        </>
                      )}
                    </div>

                    {/* Recommendations — expanded only */}
                    {alert.recommendations && !isResolved && (
                      <div className="mb-2">
                        <span className="text-[9px] font-semibold text-slate-500 uppercase tracking-wider">Recommended Actions</span>
                        <div className="mt-1 space-y-0.5">
                          {alert.recommendations.map((rec, idx) => (
                            <div key={idx} className="flex items-start gap-1.5 text-[10px]">
                              <ChevronRight className="w-2.5 h-2.5 mt-0.5 text-slate-600 flex-shrink-0" />
                              <span className="text-slate-600 dark:text-slate-400">{rec}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Resolution */}
                    {isResolved && alert.resolution && (
                      <div className="mb-2 bg-slate-50 dark:bg-slate-700/20 border border-slate-200 dark:border-slate-700/50 rounded px-2.5 py-1.5">
                        <span className="text-[9px] font-semibold text-slate-500/70 uppercase tracking-wider">Resolution</span>
                        <p className="text-[10px] text-slate-600 dark:text-slate-400 mt-0.5">{alert.resolution}</p>
                        <div className="mt-0.5 text-[9px] text-slate-500">
                          {alert.resolvedBy} · {alert.resolvedAt && new Date(alert.resolvedAt).toLocaleString()}
                        </div>
                      </div>
                    )}

                    {/* Related data */}
                    {alert.relatedData && !isResolved && (
                      <div className="flex items-center gap-3 mb-2 text-[10px]">
                        {Object.entries(alert.relatedData).map(([key, value]) => (
                          <span key={key} className="text-slate-500">
                            <span className="text-slate-700 dark:text-slate-300 font-medium">{value}</span>{' '}
                            {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Expanded actions: Assign + Resolve */}
                    {!isResolved && (
                      <div className="flex items-center gap-1.5 pt-1.5 border-t border-slate-200 dark:border-slate-700/8">
                        {!isAcknowledged && (
                          <button
                            onClick={() => acknowledgeAlert(alert.id)}
                            className="px-2.5 py-1 text-[10px] font-medium text-slate-600 dark:text-slate-400 border border-slate-700/30 hover:bg-slate-700/15 rounded transition-colors"
                          >
                            Acknowledge
                          </button>
                        )}
                        <button
                          onClick={() => { setAlertToAction(alert); setAssignModalOpen(true); }}
                          className="px-2.5 py-1 text-[10px] font-medium text-slate-600 dark:text-slate-400 border border-slate-700/30 hover:bg-slate-700/15 rounded transition-colors"
                        >
                          Assign
                        </button>
                        <button
                          onClick={() => { setAlertToAction(alert); setResolveModalOpen(true); }}
                          className="px-2.5 py-1 text-[10px] font-medium text-slate-700 dark:text-slate-300 border border-slate-600/30 hover:bg-slate-700/20 rounded transition-colors"
                        >
                          Resolve
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* ── Data Confidence Strip ──────────────────────── */}
        <div className="mt-4 px-4 py-2 bg-slate-50 dark:bg-slate-800/[0.06] border border-slate-200 dark:border-slate-800/20 rounded">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-1.5">
              <Shield className="w-3 h-3 text-slate-600" />
              <span className="text-[10px] text-slate-600">Sources</span>
            </div>
            <div className="flex items-center gap-2">
              {['CAD', 'RMS', 'Detention', 'Fleet', 'Compliance', 'Budget'].map(mod => (
                <span key={mod} className="flex items-center gap-1 text-[10px] text-slate-500">
                  <div className="w-1 h-1 rounded-full bg-slate-500/70"></div>
                  {mod}
                </span>
              ))}
            </div>
            <div className="h-3 w-px bg-slate-700/20"></div>
            <span className="text-[10px] text-slate-500">Last sync: 1m ago</span>
          </div>
        </div>

        </div>
      </div>

      {/* ── Assign Modal ─────────────────────────────────── */}
      {assignModalOpen && alertToAction && (
        <>
          <div className="fixed inset-0 bg-black/40 z-40" onClick={() => { setAssignModalOpen(false); setAlertToAction(null); setAssignPersonnel(''); }} />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/50 rounded-xl p-5 max-w-sm w-full shadow-2xl">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-1">Assign Alert</h3>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 mb-3">{alertToAction.title}</p>
              <input
                type="text"
                value={assignPersonnel}
                onChange={(e) => setAssignPersonnel(e.target.value)}
                placeholder="Personnel name..."
                className="w-full px-3 py-2 bg-white dark:bg-slate-800/30 border border-slate-300 dark:border-slate-700/40 rounded-lg text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500/50 mb-3"
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

      {/* ── Resolve Modal ────────────────────────────────── */}
      {resolveModalOpen && alertToAction && (
        <>
          <div className="fixed inset-0 bg-black/40 z-40" onClick={() => { setResolveModalOpen(false); setAlertToAction(null); setResolveNotes(''); }} />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/50 rounded-xl p-5 max-w-sm w-full shadow-2xl">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-1">Resolve Alert</h3>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 mb-3">{alertToAction.title}</p>
              <textarea
                value={resolveNotes}
                onChange={(e) => setResolveNotes(e.target.value)}
                placeholder="Resolution notes..."
                rows={3}
                className="w-full px-3 py-2 bg-white dark:bg-slate-800/30 border border-slate-300 dark:border-slate-700/40 rounded-lg text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500/50 mb-3 resize-none"
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

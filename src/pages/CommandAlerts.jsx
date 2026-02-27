import React, { useState, useEffect } from 'react';
import {
  Clock,
  Shield,
  X,
  ExternalLink,
  AlertTriangle,
  AlertCircle,
  Info,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Eye,
  UserPlus,
  Users,
  Zap,
  User,
  FileWarning,
  DollarSign,
  Home,
  FileText,
  ChevronRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';

export default function CommandAlerts() {
  const navigate = useNavigate();
  const [filterSeverity, setFilterSeverity] = useState('all');
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [acknowledgedAlerts, setAcknowledgedAlerts] = useState(new Set());
  const [expandedAlerts, setExpandedAlerts] = useState(new Set());
  const [assignModalOpen, setAssignModalOpen] = useState(false);
  const [resolveModalOpen, setResolveModalOpen] = useState(false);
  const [alertToAction, setAlertToAction] = useState(null);
  const [assignPersonnel, setAssignPersonnel] = useState('');
  const [resolveNotes, setResolveNotes] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
  const formatDate = (date) => date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  // ============================================================
  // ALERT DATA — Operational deviations from thresholds
  // ============================================================
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      severity: 'critical',
      category: 'personnel',
      title: 'Critical Staffing Shortage — B-Shift Patrol',
      impact: 'Two zones single-officer — officer safety compromised',
      description: 'B-Shift patrol operating at 9/12 deputies (75%). 2 FMLA absences, 1 workers comp, 1 emergency leave. Zones 4 & 7 single-officer patrol.',
      timestamp: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(),
      detectedTime: '08:42',
      owner: 'Patrol Major Davis',
      status: 'new',
      escalating: true,
      recommendations: ['Authorize mandatory OT — 6 hours coverage ($312)', 'Request mutual aid — Lawrenceville PD for zone 4', 'Shift coverage from Zone 3 overlap into Zone 7'],
      relatedData: { required: 12, current: 9, shortage: 3 }
    },
    {
      id: 2,
      severity: 'critical',
      category: 'equipment',
      title: 'Body Camera System Failure — 47 Units Offline',
      impact: 'State compliance violation if unresolved within 24h',
      description: 'Primary body camera server failure. 47 cameras (68% of patrol fleet) unable to upload footage. Evidence integrity at risk.',
      timestamp: new Date(Date.now() - 28 * 60 * 60 * 1000).toISOString(),
      detectedTime: '03:15',
      owner: 'IT Director',
      status: 'acknowledged',
      escalating: false,
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
      impact: 'Deputies lose duty status if not submitted by deadline',
      description: '8 deputies approaching POST certification expiration. Training records incomplete for 3. State mandate requires completion.',
      timestamp: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
      detectedTime: '06:00',
      owner: 'Training Director Martinez',
      status: 'escalating',
      escalating: true,
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
      owner: 'Fleet Manager Anderson',
      status: 'acknowledged',
      escalating: false,
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
      escalating: false,
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
      owner: 'Detention Major Wilson',
      status: 'new',
      escalating: true,
      recommendations: ['Expedite court hearings — contact Superior Court admin', 'Review 18 early release candidates', 'Activate E-Pod overflow (6 beds)']
    },
    {
      id: 7,
      severity: 'low',
      category: 'training',
      title: 'Q4 Training Requirements — 23 Personnel Incomplete',
      impact: 'State mandate deadline Dec 31',
      description: 'Patrol (15), Detention (6), Investigations (2). Gaps: defensive tactics refresher, emergency response procedures.',
      timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      detectedTime: '06:00',
      owner: 'Training Director Martinez',
      status: 'acknowledged',
      escalating: false,
      recommendations: ['Automated reminders + supervisor follow-up', 'Makeup sessions: Dec 18, 19, 20', 'Weekly completion tracking']
    },
    {
      id: 8,
      severity: 'info',
      category: 'operations',
      title: 'Special Event — Regional Championship Game Friday',
      impact: '4 additional units requested for traffic control',
      description: 'Gwinnett Stadium 7:30 PM. Expected 8-10K attendance. Standard event rate: $52/hr per unit (4 hrs). No unusual risk factors.',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      detectedTime: '10:00',
      owner: 'Capt. Rodriguez',
      status: 'acknowledged',
      escalating: false,
      recommendations: ['Deploy 4 OT units A-Shift overlap ($832)', 'Joint briefing Thursday 1600', 'Traffic plan: Sugarloaf/Satellite intersection']
    },
    {
      id: 9,
      severity: 'high',
      category: 'personnel',
      title: 'FMLA Request — Investigations Supervisor Lt. Garcia',
      impact: '6-week gap in Special Investigations leadership',
      description: 'Effective Jan 20. Coverage needed for 8 detectives, 2 active major cases. Interim supervisor assignment required.',
      timestamp: new Date(Date.now() - 36 * 60 * 60 * 1000).toISOString(),
      detectedTime: '14:00',
      owner: 'Captain Johnson',
      status: 'resolved',
      escalating: false,
      resolution: 'Sgt. Thompson assigned interim supervisor. Training transition completed Dec 10. Active cases reassigned.',
      resolvedAt: new Date(Date.now() - 20 * 60 * 60 * 1000).toISOString(),
      resolvedBy: 'Captain Johnson'
    },
    {
      id: 10,
      severity: 'medium',
      category: 'compliance',
      title: 'Annual Use-of-Force Policy Review Due',
      impact: 'State mandate — SOP-127 last updated Jan 2024',
      description: 'GA POST Rule 464-5-.03 requires annual review. Deadline Dec 31. Updated policy distributed via PowerDMS.',
      timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
      detectedTime: '08:00',
      owner: 'Chief Deputy Anderson',
      status: 'resolved',
      escalating: false,
      resolution: 'Policy SOP-127-R1 approved Dec 8. Distributed to all personnel. Mandatory acknowledgment by Dec 20.',
      resolvedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
      resolvedBy: 'Chief Deputy Anderson'
    }
  ]);

  // ============================================================
  // SEVERITY CONFIG — consistent with Brief/Calendar color system
  // ============================================================
  const getSeverityConfig = (severity) => {
    const configs = {
      critical: { strip: 'bg-red-500', pill: 'bg-red-500/10 border-red-500/20 text-red-400', label: 'Critical' },
      high: { strip: 'bg-amber-500', pill: 'bg-amber-500/10 border-amber-500/20 text-amber-400', label: 'High' },
      medium: { strip: 'bg-amber-500/60', pill: 'bg-amber-500/8 border-amber-500/15 text-amber-400/80', label: 'Medium' },
      low: { strip: 'bg-slate-400', pill: 'bg-slate-500/10 border-slate-500/20 text-slate-400', label: 'Low' },
      info: { strip: 'bg-slate-500', pill: 'bg-slate-500/10 border-slate-500/20 text-slate-500', label: 'Info' }
    };
    return configs[severity] || configs.info;
  };

  const getStatusConfig = (status) => {
    const configs = {
      new: { pill: 'bg-red-500/10 border-red-500/20 text-red-400', label: 'New' },
      escalating: { pill: 'bg-red-500/10 border-red-500/20 text-red-400', label: 'Escalating' },
      acknowledged: { pill: 'bg-slate-500/10 border-slate-500/20 text-slate-400', label: 'Acknowledged' },
      resolved: { pill: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400', label: 'Resolved' }
    };
    return configs[status] || configs.acknowledged;
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

  // ============================================================
  // FILTERING & SORTING
  // Severity first (critical pinned), then recency
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
      // Then severity
      const sevDiff = (severityWeight[a.severity] ?? 4) - (severityWeight[b.severity] ?? 4);
      if (sevDiff !== 0) return sevDiff;
      // Then recency
      return new Date(b.timestamp) - new Date(a.timestamp);
    });

  const activeAlerts = alerts.filter(a => a.status !== 'resolved');
  const criticalCount = activeAlerts.filter(a => a.severity === 'critical').length;

  const getTimeAgo = (timestamp) => {
    const diffMs = Date.now() - new Date(timestamp).getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
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

  // Severity filter pills
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
      <div className="p-5 lg:p-8">
        <div className="max-w-7xl mx-auto">

        {/* Page Header */}
        <div className="mb-5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-white mb-1">Command Alerts</h2>
            <div className="flex items-center gap-2 text-[11px] text-slate-500">
              <span>{formatDate(currentTime)}</span>
              <span className="text-slate-700">·</span>
              <span>{formatTime(currentTime)} EST</span>
              <span className="text-slate-700">·</span>
              <span>Live operational deviation feed</span>
            </div>
          </div>
          {criticalCount > 0 && (
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
              <span className="text-[13px] font-semibold text-red-400">{criticalCount} Critical Active</span>
            </div>
          )}
        </div>

        {/* Severity Filter Pills */}
        <div className="mb-5 flex items-center gap-1.5 flex-wrap">
          {filterOptions.map(opt => (
            <button
              key={opt.id}
              onClick={() => setFilterSeverity(opt.id)}
              className={`px-3 py-1.5 rounded-lg text-[12px] font-medium border transition-all ${
                filterSeverity === opt.id
                  ? 'bg-slate-700/50 border-slate-600/50 text-white'
                  : 'bg-slate-800/20 border-slate-700/20 text-slate-500 hover:text-slate-300 hover:border-slate-600/30'
              }`}
            >
              {opt.label}
              <span className={`ml-1.5 ${filterSeverity === opt.id ? 'text-slate-400' : 'text-slate-600'}`}>{opt.count}</span>
            </button>
          ))}
        </div>

        {/* ================================================================
            ALERT FEED — Compact signal rows
            Scannable in under 20 seconds
            ================================================================ */}
        <div className="space-y-1">
          {filteredAlerts.map(alert => {
            const sev = getSeverityConfig(alert.severity);
            const stat = getStatusConfig(alert.status);
            const isAcknowledged = acknowledgedAlerts.has(alert.id);
            const isExpanded = expandedAlerts.has(alert.id);
            const isResolved = alert.status === 'resolved';

            return (
              <div
                key={alert.id}
                className={`rounded-lg border transition-colors ${
                  isResolved
                    ? 'border-slate-700/15 bg-slate-800/10 opacity-60'
                    : isAcknowledged
                    ? 'border-slate-700/15 bg-slate-800/15 opacity-70'
                    : 'border-slate-700/20 bg-slate-800/20 hover:bg-slate-800/30'
                }`}
              >
                {/* Compact Row */}
                <div className="flex items-center gap-3 px-4 py-2.5">
                  {/* Severity strip */}
                  <div className={`w-0.5 h-8 rounded-full flex-shrink-0 ${sev.strip}`}></div>

                  {/* Severity pill */}
                  <span className={`px-1.5 py-0.5 border rounded text-[10px] font-semibold flex-shrink-0 ${sev.pill}`}>
                    {sev.label}
                  </span>

                  {/* Title */}
                  <p className={`text-[13px] font-medium flex-1 min-w-0 truncate ${isResolved ? 'text-slate-400' : 'text-white'}`}>
                    {alert.title}
                  </p>

                  {/* Impact statement — max ~12 words */}
                  <span className="hidden lg:block text-[11px] text-slate-500 max-w-[240px] truncate flex-shrink-0">
                    {alert.impact}
                  </span>

                  {/* Owner */}
                  <span className="hidden md:block text-[11px] text-slate-500 flex-shrink-0 max-w-[140px] truncate">
                    {alert.owner}
                  </span>

                  {/* Detected time */}
                  <span className="text-[10px] text-slate-600 flex-shrink-0 font-mono">
                    {getTimeAgo(alert.timestamp)}
                  </span>

                  {/* Status pill */}
                  <span className={`px-1.5 py-0.5 border rounded text-[10px] font-semibold flex-shrink-0 ${stat.pill}`}>
                    {stat.label}
                  </span>

                  {/* Escalating indicator */}
                  {alert.escalating && !isResolved && (
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse flex-shrink-0"></div>
                  )}

                  {/* Actions: Acknowledge + Expand */}
                  <div className="flex items-center gap-1 flex-shrink-0">
                    {!isResolved && !isAcknowledged && (
                      <button
                        onClick={(e) => { e.stopPropagation(); acknowledgeAlert(alert.id); }}
                        className="px-2 py-1 text-[10px] font-medium text-slate-400 hover:text-white border border-slate-700/20 hover:border-slate-600/30 rounded transition-colors"
                      >
                        Ack
                      </button>
                    )}
                    <button
                      onClick={() => toggleExpanded(alert.id)}
                      className="p-1 text-slate-500 hover:text-slate-300 transition-colors"
                    >
                      {isExpanded
                        ? <ChevronUp className="w-3.5 h-3.5" />
                        : <ChevronDown className="w-3.5 h-3.5" />
                      }
                    </button>
                  </div>
                </div>

                {/* Mobile: impact line */}
                <div className="lg:hidden px-4 pb-2 -mt-1">
                  <span className="text-[11px] text-slate-500">{alert.impact}</span>
                </div>

                {/* Expanded Detail View */}
                {isExpanded && (
                  <div className="px-4 pb-3 border-t border-slate-700/10 pt-3 ml-7">
                    {/* Description */}
                    <p className="text-[12px] text-slate-400 mb-3 leading-relaxed">{alert.description}</p>

                    {/* Metadata row */}
                    <div className="flex items-center gap-4 mb-3 text-[11px] text-slate-500 flex-wrap">
                      <span>Owner: <span className="text-slate-300">{alert.owner}</span></span>
                      <span className="text-slate-700">|</span>
                      <span>Detected: {alert.detectedTime}</span>
                      <span className="text-slate-700">|</span>
                      <span className="capitalize">{alert.category}</span>
                      {alert.escalating && !isResolved && (
                        <>
                          <span className="text-slate-700">|</span>
                          <span className="text-red-400 font-semibold">Escalating</span>
                        </>
                      )}
                    </div>

                    {/* Recommendations — only in expanded */}
                    {alert.recommendations && !isResolved && (
                      <div className="mb-3">
                        <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Recommended Actions</span>
                        <div className="mt-1.5 space-y-1">
                          {alert.recommendations.map((rec, idx) => (
                            <div key={idx} className="flex items-start gap-2 text-[11px]">
                              <ChevronRight className="w-3 h-3 mt-0.5 text-slate-600 flex-shrink-0" />
                              <span className="text-slate-400">{rec}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Resolution — if resolved */}
                    {isResolved && alert.resolution && (
                      <div className="mb-3 bg-emerald-500/[0.04] border border-emerald-500/10 rounded-lg px-3 py-2">
                        <span className="text-[10px] font-semibold text-emerald-400/80 uppercase tracking-wider">Resolution</span>
                        <p className="text-[11px] text-slate-400 mt-1">{alert.resolution}</p>
                        <div className="mt-1 text-[10px] text-slate-500">
                          {alert.resolvedBy} · {alert.resolvedAt && new Date(alert.resolvedAt).toLocaleString()}
                        </div>
                      </div>
                    )}

                    {/* Related data */}
                    {alert.relatedData && !isResolved && (
                      <div className="flex items-center gap-4 mb-3 text-[11px]">
                        {Object.entries(alert.relatedData).map(([key, value]) => (
                          <span key={key} className="text-slate-500">
                            <span className="text-slate-300 font-medium">{value}</span>{' '}
                            {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Expanded actions: Assign + Resolve */}
                    {!isResolved && (
                      <div className="flex items-center gap-2 pt-2 border-t border-slate-700/10">
                        {!isAcknowledged && (
                          <button
                            onClick={() => acknowledgeAlert(alert.id)}
                            className="px-3 py-1.5 text-[11px] font-medium text-slate-400 border border-slate-700/20 hover:bg-slate-700/20 rounded-lg transition-colors"
                          >
                            Acknowledge
                          </button>
                        )}
                        <button
                          onClick={() => { setAlertToAction(alert); setAssignModalOpen(true); }}
                          className="px-3 py-1.5 text-[11px] font-medium text-slate-400 border border-slate-700/20 hover:bg-slate-700/20 rounded-lg transition-colors"
                        >
                          Assign
                        </button>
                        <button
                          onClick={() => { setAlertToAction(alert); setResolveModalOpen(true); }}
                          className="px-3 py-1.5 text-[11px] font-medium text-emerald-400/80 border border-emerald-500/15 hover:bg-emerald-500/10 rounded-lg transition-colors"
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

        {/* Data Confidence Strip */}
        <div className="mt-5 px-5 py-2.5 bg-slate-800/10 border border-slate-800/30 rounded-lg">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Shield className="w-3.5 h-3.5 text-slate-600" />
              <span className="text-[11px] text-slate-600">Alerts sourced from</span>
            </div>
            <div className="flex items-center gap-2">
              {['CAD', 'RMS', 'Detention', 'Fleet', 'Compliance', 'Budget'].map(mod => (
                <span key={mod} className="flex items-center gap-1 text-[11px] text-slate-500">
                  <div className="w-1 h-1 rounded-full bg-emerald-500/60"></div>
                  {mod}
                </span>
              ))}
            </div>
            <div className="h-3 w-px bg-slate-700/30"></div>
            <span className="text-[11px] text-slate-500">Last sync: 1m ago</span>
          </div>
        </div>

        </div>
      </div>

      {/* Slide-Over Detail Panel */}
      {selectedAlert && (
        <>
          <div className="fixed inset-0 bg-black/30 z-40" onClick={() => setSelectedAlert(null)} />
          <div className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-slate-900 border-l border-slate-700/50 shadow-2xl z-50 overflow-y-auto">
            <div className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <h3 className="text-base font-semibold text-white mb-2">{selectedAlert.title}</h3>
                  <div className="flex items-center gap-2">
                    <span className={`px-1.5 py-0.5 border rounded text-[11px] font-semibold ${getSeverityConfig(selectedAlert.severity).pill}`}>
                      {getSeverityConfig(selectedAlert.severity).label}
                    </span>
                    <span className={`px-1.5 py-0.5 border rounded text-[11px] font-semibold ${getStatusConfig(selectedAlert.status).pill}`}>
                      {getStatusConfig(selectedAlert.status).label}
                    </span>
                  </div>
                </div>
                <button onClick={() => setSelectedAlert(null)} className="text-slate-400 hover:text-white transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-5">
                <div>
                  <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Impact</span>
                  <p className="text-sm text-white mt-1">{selectedAlert.impact}</p>
                </div>
                <div className="border-t border-slate-700/20 pt-3">
                  <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Description</span>
                  <p className="text-[13px] text-slate-300 leading-relaxed mt-1">{selectedAlert.description}</p>
                </div>
                <div className="border-t border-slate-700/20 pt-3">
                  <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Owner</span>
                  <p className="text-sm text-white mt-1">{selectedAlert.owner}</p>
                </div>
                {selectedAlert.recommendations && (
                  <div className="border-t border-slate-700/20 pt-3">
                    <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Recommended Actions</span>
                    <div className="mt-2 space-y-1.5">
                      {selectedAlert.recommendations.map((rec, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-[12px]">
                          <ChevronRight className="w-3 h-3 mt-0.5 text-slate-600 flex-shrink-0" />
                          <span className="text-slate-300">{rec}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                <div className="flex gap-2 pt-3 border-t border-slate-700/20">
                  <button
                    onClick={() => { acknowledgeAlert(selectedAlert.id); setSelectedAlert(null); }}
                    className="flex-1 px-3 py-2 text-xs font-medium text-slate-400 border border-slate-700/30 hover:bg-slate-700/20 rounded-lg transition-colors"
                  >
                    Acknowledge
                  </button>
                  <button
                    onClick={() => setSelectedAlert(null)}
                    className="flex-1 px-3 py-2 text-xs font-medium text-slate-400 border border-slate-700/30 hover:bg-slate-700/20 rounded-lg transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Assign Modal */}
      {assignModalOpen && alertToAction && (
        <>
          <div className="fixed inset-0 bg-black/40 z-40" onClick={() => { setAssignModalOpen(false); setAlertToAction(null); setAssignPersonnel(''); }} />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-700/50 rounded-xl p-5 max-w-sm w-full shadow-2xl">
              <h3 className="text-sm font-semibold text-white mb-1">Assign Alert</h3>
              <p className="text-[12px] text-slate-400 mb-4">{alertToAction.title}</p>
              <input
                type="text"
                value={assignPersonnel}
                onChange={(e) => setAssignPersonnel(e.target.value)}
                placeholder="Personnel name..."
                className="w-full px-3 py-2 bg-slate-800/40 border border-slate-700/40 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-slate-600 mb-4"
              />
              <div className="flex gap-2">
                <button
                  onClick={() => { setAssignModalOpen(false); setAlertToAction(null); setAssignPersonnel(''); }}
                  className="flex-1 px-3 py-2 text-xs font-medium text-slate-400 border border-slate-700/30 hover:bg-slate-700/20 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleAssign(alertToAction.id)}
                  className="flex-1 px-3 py-2 text-xs font-medium text-white bg-slate-700/50 hover:bg-slate-700/70 rounded-lg transition-colors"
                >
                  Assign
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Resolve Modal */}
      {resolveModalOpen && alertToAction && (
        <>
          <div className="fixed inset-0 bg-black/40 z-40" onClick={() => { setResolveModalOpen(false); setAlertToAction(null); setResolveNotes(''); }} />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-700/50 rounded-xl p-5 max-w-sm w-full shadow-2xl">
              <h3 className="text-sm font-semibold text-white mb-1">Resolve Alert</h3>
              <p className="text-[12px] text-slate-400 mb-4">{alertToAction.title}</p>
              <textarea
                value={resolveNotes}
                onChange={(e) => setResolveNotes(e.target.value)}
                placeholder="Resolution notes..."
                rows={3}
                className="w-full px-3 py-2 bg-slate-800/40 border border-slate-700/40 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-slate-600 mb-4 resize-none"
              />
              <div className="flex gap-2">
                <button
                  onClick={() => { setResolveModalOpen(false); setAlertToAction(null); setResolveNotes(''); }}
                  className="flex-1 px-3 py-2 text-xs font-medium text-slate-400 border border-slate-700/30 hover:bg-slate-700/20 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleResolve(alertToAction.id)}
                  className="flex-1 px-3 py-2 text-xs font-medium text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/10 rounded-lg transition-colors"
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

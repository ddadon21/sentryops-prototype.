import React, { useState } from 'react';
import {
  AlertTriangle, Calendar, CheckCircle, Shield, FileText,
  ChevronDown, ChevronUp, TrendingUp, TrendingDown, Download,
  Sparkles, Link2, Zap, Gauge, X, Clock, UserCheck, FileSignature,
  Lock, ArrowRight, CircleDot, History
} from 'lucide-react';
import DashboardLayout from '../layouts/DashboardLayout';

export default function RiskCompliance() {
  const [expandedRisks, setExpandedRisks] = useState([]);
  const [riskFilter, setRiskFilter] = useState('all');
  const [aiSummaryExpanded, setAiSummaryExpanded] = useState(false);
  const [actionLog, setActionLog] = useState([]);
  const [approvalModal, setApprovalModal] = useState(null);
  const [approvalNote, setApprovalNote] = useState('');
  const [approvalDecision, setApprovalDecision] = useState(null);

  // ── Compliance Standards Data ──────────────────────
  const complianceStandards = [
    {
      id: 'cjis',
      name: 'CJIS Security Policy',
      status: 'compliant',
      lastAudit: 'Sep 2024',
      nextAudit: 'Sep 2025',
      openFindings: 0,
      trend: 'stable',
      exposure: 'low',
      detail: 'v5.9 | All 158 staff training current | TAC audit passed'
    },
    {
      id: 'aca',
      name: 'ACA Detention Standards',
      status: 'compliant',
      statusLabel: 'Accredited',
      lastAudit: 'Feb 2024',
      nextAudit: 'Feb 2025',
      openFindings: 2,
      trend: 'down',
      exposure: 'moderate',
      exposureNote: '2 open findings',
      detail: '3 findings resolved, 2 minor remaining (documentation gaps)'
    },
    {
      id: 'prea',
      name: 'PREA Compliance',
      status: 'compliant',
      lastAudit: 'Nov 2023',
      nextAudit: 'Nov 2026',
      openFindings: 0,
      trend: 'stable',
      exposure: 'low',
      detail: 'Zero substantiated incidents YTD | Staff training: 100%'
    },
    {
      id: 'post',
      name: 'GA P.O.S.T. Certification',
      status: 'warning',
      lastAudit: 'Ongoing',
      nextAudit: 'Continuous',
      openFindings: 2,
      trend: 'up',
      exposure: 'high',
      exposureNote: 'Escalating + expiring certs',
      detail: '156/158 certified | 2 expiring Jan 2025',
      autoAction: 'Training approval created · Command alert sent'
    }
  ];

  // ── Open Risk Items ──────────────────────────────
  const openRisks = [
    {
      id: 1,
      severity: 'critical',
      title: 'H2-Pod HVAC System Failure',
      description: 'Temperature 84°F — exceeds ACA max (78°F). 36 inmates in pod.',
      impactTags: ['Inmate Safety', 'Federal Compliance', 'Civil Liability'],
      owner: 'Facilities Director Brooks',
      due: 'Dec 13, 2024',
      dueUrgency: 'critical',
      daysLeft: 5,
      status: 'Emergency repair approved — contractor on-site',
      linkedApproval: { id: 4, title: 'Emergency HVAC Repair', amount: 18500, status: 'approved' },
      auditImpact: 'U.S. Marshals H-Pod inspection Dec 12-14',
      ifUnresolved: [
        'Federal housing contract exposure: $1.2M/yr',
        'ACA accreditation status: jeopardized',
        'Inmate transfer required (36 inmates, facility at 91.5% capacity)',
        'State detention standards violation filed'
      ]
    },
    {
      id: 2,
      severity: 'critical',
      title: 'Body Camera System End-of-Life',
      description: '68 Axon Body 2 cameras reach EOL Dec 31. Vendor discontinuing cloud storage.',
      impactTags: ['Evidence Integrity', 'State Compliance', 'Civil Liability'],
      owner: 'IT Director Harrison',
      due: 'Dec 31, 2024',
      dueUrgency: 'soon',
      daysLeft: 23,
      status: 'Replacement purchase pending Sheriff approval',
      linkedApproval: { id: 5, title: 'Body Camera Upgrade', amount: 125000, status: 'pending' },
      auditImpact: 'State evidence integrity requirements',
      ifUnresolved: [
        'Evidence chain-of-custody gaps: 142 active cases affected',
        'GA POST mandate violation: state compliance status revoked',
        'Civil liability exposure: unrecorded UOF incidents',
        'Equipment compliance projection: 86% → 72%',
        'Risk trend trajectory: +16% and accelerating'
      ]
    },
    {
      id: 3,
      severity: 'medium',
      title: 'Patrol Vehicle Inspections Overdue',
      description: '9 of 64 units (14%) past state inspection date.',
      impactTags: ['Insurance Liability', 'Operational'],
      owner: 'Fleet Manager Anderson',
      due: 'Jan 15, 2025',
      dueUrgency: 'soon',
      daysLeft: 38,
      status: 'Inspection appointments scheduled — 3 complete, 6 remaining',
      linkedApproval: null,
      auditImpact: 'Insurance liability, operational restrictions',
      ifUnresolved: [
        'Insurance carrier action: 9 vehicles flagged non-compliant',
        'Patrol capacity reduced: 9 units restricted from duty',
        'Equipment compliance projection: 86% → 78%'
      ]
    },
    {
      id: 4,
      severity: 'medium',
      title: 'P.O.S.T. Certifications Expiring',
      description: '2 deputies (Chen, Williams) certifications expire Jan 31, 2025.',
      impactTags: ['Personnel Compliance', 'Staffing'],
      owner: 'Training Director Martinez',
      due: 'Jan 31, 2025',
      dueUrgency: 'monitor',
      daysLeft: 54,
      status: 'Training sessions scheduled Jan 18-19',
      linkedApproval: { id: 2, title: 'Q1 Training Budget', amount: 43000, status: 'pending' },
      auditImpact: 'Deputies cannot patrol without active certification',
      ifUnresolved: [
        'Patrol staffing impact: 2 deputies removed, 97% → 96%',
        'Training compliance projection: 91.8% → 90.6%',
        'Staffing & Readiness alert auto-generated',
        'POST inspection exposure: certification gap documented'
      ]
    },
    {
      id: 5,
      severity: 'low',
      title: 'ACA Documentation Gaps',
      description: '2 minor documentation findings from Feb 2024 inspection.',
      impactTags: ['Accreditation'],
      owner: 'Chief Deputy Harris',
      due: 'Feb 18, 2025',
      dueUrgency: 'monitor',
      daysLeft: 72,
      status: 'Corrective action plans drafted — review pending',
      linkedApproval: null,
      auditImpact: 'ACA re-accreditation inspection Feb 18-21',
      ifUnresolved: [
        'ACA re-accreditation exposure: conditional status probable',
        'Inspection report: repeat findings documented'
      ]
    }
  ];

  // ── Upcoming Audits ──────────────────────────────
  const upcomingAudits = [
    {
      id: 1,
      date: 'Dec 12-14',
      agency: 'U.S. Marshals Service',
      scope: 'H-Pod Federal Housing',
      lead: 'Major Wilson',
      readiness: 95,
      daysOut: 4,
      risks: 1
    },
    {
      id: 2,
      date: 'Feb 18-21',
      agency: 'ACA',
      scope: 'Full Facility Re-Accreditation',
      lead: 'Chief Deputy Harris',
      readiness: 62,
      daysOut: 72,
      risks: 2
    },
    {
      id: 3,
      date: 'Apr 10',
      agency: 'State Fire Marshal',
      scope: 'Detention Fire Safety',
      lead: 'Facilities Mgr Anderson',
      readiness: 40,
      daysOut: 123,
      risks: 0
    }
  ];

  // ── Policy Compliance ──────────────────────────────
  const policyCompliance = [
    {
      name: 'Use of Force Reviews',
      rate: 97.2,
      detail: '154/158 incidents reviewed on time',
      status: 'SOP-127 updated Nov 2024',
      trend: 'stable',
      threshold: 95,
      operationalImpact: null,
      autoActions: null
    },
    {
      name: 'Training Certifications',
      rate: 91.8,
      detail: '156/170 deputies current',
      warning: '14 due Jan-Feb 2025',
      trend: 'down',
      threshold: 95,
      operationalImpact: '14 deputies uncertified, 3 shifts below staffing threshold',
      autoActions: [
        'Training approval auto-created ($43K)',
        'Staffing readiness alert triggered',
        'Audit readiness recalculated'
      ]
    },
    {
      name: 'Equipment Compliance',
      rate: 86.0,
      detail: 'Body cams: 100% operational',
      warning: 'Fleet: 86% inspection current (9 overdue)',
      trend: 'down',
      threshold: 90,
      operationalImpact: '9 patrol units restricted, 2 zones below minimum vehicle count',
      autoActions: [
        'Command alert generated',
        'Risk item auto-escalated',
        'Equipment approval flagged for priority'
      ]
    }
  ];

  // ── Risk Trend Insights ──────────────────────────────
  const riskInsights = [
    { label: 'Top Escalating', value: 'Equipment & Facility', change: '+16%', direction: 'up', detail: 'HVAC failure + camera EOL driving increase' },
    { label: 'Most Improved', value: 'Training Deficiencies', change: '-40%', direction: 'down', detail: 'POST recert sessions + PREA training completed' },
    { label: 'Stable', value: 'Policy Compliance', change: '0%', direction: 'stable', detail: 'UOF reviews on track, SOP updates current' },
  ];

  // ── Computed values ──────────────────────────────
  const criticalCount = openRisks.filter(r => r.severity === 'critical').length;
  const mediumCount = openRisks.filter(r => r.severity === 'medium').length;
  const lowCount = openRisks.filter(r => r.severity === 'low').length;
  const overallCompliance = 94.7;
  const nextAudit = upcomingAudits[0];
  const pendingApprovalCount = openRisks.filter(r => r.linkedApproval?.status === 'pending').length;

  // ══════════════════════════════════════════════════════════════════
  // OPERATIONAL PRESSURE INDEX (OPI) — Defensible Composite Formula
  // ══════════════════════════════════════════════════════════════════
  //
  // OPI = (W_risk × RiskSeverityScore)
  //     + (W_findings × OpenFindingsScore)
  //     + (W_audit × AuditProximityFactor)
  //     + (W_staffing × StaffingDeviationMultiplier)
  //     + (W_equipment × EquipmentComplianceDelta)
  //     + (W_trend × TrendTrajectoryScore)
  //
  // Each component is normalized to a 0-25 range, then summed.
  // Final score capped at 100. Weights sum to 1.0.
  // ──────────────────────────────────────────────────────────────────

  // Weights — tunable per agency policy, must sum to 1.0
  const OPI_WEIGHTS = {
    risk: 0.30,       // W_risk: weighted critical risks
    findings: 0.15,   // W_findings: open audit findings
    audit: 0.20,      // W_audit: audit proximity factor
    staffing: 0.15,   // W_staffing: staffing deviation from authorized strength
    equipment: 0.10,  // W_equipment: equipment compliance delta from threshold
    trend: 0.10,      // W_trend: trend trajectory (escalating risk directions)
  };

  // ── Component 1: Risk Severity Score (max raw = 25) ──
  // Formula: (critical × 12) + (medium × 5) + (low × 1.5), normalized to 0-25
  const riskSeverityRaw = (criticalCount * 12) + (mediumCount * 5) + (lowCount * 1.5);
  const riskSeverityNorm = Math.min(25, riskSeverityRaw);

  // ── Component 2: Open Findings Score (max raw = 25) ──
  // Formula: sum of open findings across all standards × 3, normalized to 0-25
  const totalOpenFindings = complianceStandards.reduce((sum, s) => sum + s.openFindings, 0);
  const openFindingsRaw = totalOpenFindings * 3;
  const openFindingsNorm = Math.min(25, openFindingsRaw);

  // ── Component 3: Audit Proximity Factor (max raw = 25) ──
  // Formula: per audit, score = max(0, (30 - daysOut) / 30) × 15 for imminent
  //          audits, plus readiness penalty: (100 - readiness) / 100 × 10
  const auditProximityRaw = upcomingAudits.reduce((sum, a) => {
    const proximityScore = a.daysOut < 30 ? ((30 - a.daysOut) / 30) * 15 : 0;
    const readinessPenalty = ((100 - a.readiness) / 100) * 10;
    return sum + proximityScore + (a.daysOut < 90 ? readinessPenalty : 0);
  }, 0);
  const auditProximityNorm = Math.min(25, auditProximityRaw);

  // ── Component 4: Staffing Deviation Multiplier (max raw = 25) ──
  // Formula: |actual_staffing_rate - authorized_target| / authorized_target × 100
  // Baseline: 170 authorized sworn, 158 currently deployable (12 non-deployable:
  //   2 POST expiring, 1 desk duty, 3 FMLA, 6 training pipeline)
  const authorizedStrength = 170;
  const deployableStrength = 158;
  const staffingDeviation = ((authorizedStrength - deployableStrength) / authorizedStrength) * 100;
  const staffingDeviationNorm = Math.min(25, staffingDeviation * 2.5); // 1% deviation = 2.5 points

  // ── Component 5: Equipment Compliance Delta (max raw = 25) ──
  // Formula: (equipment_threshold - actual_equipment_rate) × multiplier
  // Only contributes when below threshold
  const equipmentPolicy = policyCompliance.find(p => p.name === 'Equipment Compliance');
  const equipmentRate = equipmentPolicy ? equipmentPolicy.rate : 100;
  const equipmentThreshold = equipmentPolicy ? equipmentPolicy.threshold : 90;
  const equipmentDelta = Math.max(0, equipmentThreshold - equipmentRate);
  const equipmentDeltaNorm = Math.min(25, equipmentDelta * 2); // 1% below threshold = 2 points

  // ── Component 6: Trend Trajectory Score (max raw = 25) ──
  // Formula: escalating_trends × 8, minus improving_trends × 3
  const escalatingCount = riskInsights.filter(i => i.direction === 'up').length;
  const improvingCount = riskInsights.filter(i => i.direction === 'down').length;
  const trendTrajectoryRaw = Math.max(0, (escalatingCount * 8) - (improvingCount * 3));
  const trendTrajectoryNorm = Math.min(25, trendTrajectoryRaw);

  // ── Final OPI Calculation ──
  const opiComponents = {
    risk: riskSeverityNorm,
    findings: openFindingsNorm,
    audit: auditProximityNorm,
    staffing: staffingDeviationNorm,
    equipment: equipmentDeltaNorm,
    trend: trendTrajectoryNorm,
  };

  const opiScore = Math.min(100, Math.round(
    (OPI_WEIGHTS.risk * opiComponents.risk / 25 * 100) +
    (OPI_WEIGHTS.findings * opiComponents.findings / 25 * 100) +
    (OPI_WEIGHTS.audit * opiComponents.audit / 25 * 100) +
    (OPI_WEIGHTS.staffing * opiComponents.staffing / 25 * 100) +
    (OPI_WEIGHTS.equipment * opiComponents.equipment / 25 * 100) +
    (OPI_WEIGHTS.trend * opiComponents.trend / 25 * 100)
  ));

  const opiLevel = opiScore >= 75 ? 'Critical' : opiScore >= 50 ? 'High' : opiScore >= 25 ? 'Moderate' : 'Low';
  const opiColor = opiScore >= 75 ? 'text-red-400' : opiScore >= 50 ? 'text-amber-400' : 'text-green-400';

  const opiBreakdown = [
    { label: 'Risk severity', weight: OPI_WEIGHTS.risk, score: opiComponents.risk, max: 25, detail: `${criticalCount}×12 + ${mediumCount}×5 + ${lowCount}×1.5 = ${riskSeverityRaw.toFixed(1)}`, weighted: Math.round(OPI_WEIGHTS.risk * opiComponents.risk / 25 * 100) },
    { label: 'Open findings', weight: OPI_WEIGHTS.findings, score: opiComponents.findings, max: 25, detail: `${totalOpenFindings} findings × 3 = ${openFindingsRaw}`, weighted: Math.round(OPI_WEIGHTS.findings * opiComponents.findings / 25 * 100) },
    { label: 'Audit proximity', weight: OPI_WEIGHTS.audit, score: opiComponents.audit, max: 25, detail: `${upcomingAudits.filter(a => a.daysOut < 30).length} imminent + readiness gaps`, weighted: Math.round(OPI_WEIGHTS.audit * opiComponents.audit / 25 * 100) },
    { label: 'Staffing deviation', weight: OPI_WEIGHTS.staffing, score: opiComponents.staffing, max: 25, detail: `${deployableStrength}/${authorizedStrength} deployable (${staffingDeviation.toFixed(1)}% gap)`, weighted: Math.round(OPI_WEIGHTS.staffing * opiComponents.staffing / 25 * 100) },
    { label: 'Equipment delta', weight: OPI_WEIGHTS.equipment, score: opiComponents.equipment, max: 25, detail: `${equipmentRate}% vs ${equipmentThreshold}% threshold (${equipmentDelta > 0 ? '-' : ''}${equipmentDelta.toFixed(1)}%)`, weighted: Math.round(OPI_WEIGHTS.equipment * opiComponents.equipment / 25 * 100) },
    { label: 'Trend trajectory', weight: OPI_WEIGHTS.trend, score: opiComponents.trend, max: 25, detail: `${escalatingCount} escalating − ${improvingCount} improving`, weighted: Math.round(OPI_WEIGHTS.trend * opiComponents.trend / 25 * 100) },
  ];

  const filteredRisks = openRisks.filter(r => {
    if (riskFilter === 'all') return true;
    return r.severity === riskFilter;
  });

  const toggleRiskExpand = (id) => {
    setExpandedRisks(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const getReadinessColor = (readiness, daysOut) => {
    if (readiness < 70 && daysOut < 30) return 'text-red-400';
    if (readiness < 80 && daysOut < 60) return 'text-amber-400';
    return 'text-green-400';
  };

  const getReadinessWarning = (readiness, daysOut) => {
    if (readiness < 70 && daysOut < 30) return 'AT RISK';
    if (readiness < 80 && daysOut < 60) return 'MONITOR';
    return null;
  };

  // ══════════════════════════════════════════════════════════════════
  // ACTION REQUIRED WORKFLOW ENGINE
  // ══════════════════════════════════════════════════════════════════
  // Every pending approval becomes an actionable workflow item.
  // Decisions are logged with timestamps, actors, and rationale.
  // This is the ownership layer — it drives the system, not cosmetic.

  const pendingActions = openRisks
    .filter(r => r.linkedApproval?.status === 'pending')
    .map(r => ({
      riskId: r.id,
      approvalId: r.linkedApproval.id,
      title: r.linkedApproval.title,
      amount: r.linkedApproval.amount,
      riskTitle: r.title,
      severity: r.severity,
      daysLeft: r.daysLeft,
      owner: r.owner,
      cascadeCount: r.ifUnresolved?.length || 0,
      auditImpact: r.auditImpact,
    }));

  const handleApprovalAction = (action) => {
    const now = new Date();
    const logEntry = {
      id: `LOG-${Date.now()}`,
      timestamp: now.toISOString(),
      displayTime: now.toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      approvalId: approvalModal.approvalId,
      approvalTitle: approvalModal.title,
      riskId: approvalModal.riskId,
      riskTitle: approvalModal.riskTitle,
      decision: action, // 'approved' | 'denied' | 'escalated' | 'deferred'
      amount: approvalModal.amount,
      actor: 'Sheriff K. Conway',
      role: 'Authorizing Official',
      note: approvalNote,
      opiAtDecision: opiScore,
      complianceAtDecision: overallCompliance,
    };

    setActionLog(prev => [logEntry, ...prev]);
    setApprovalDecision({ action, entry: logEntry });
    setApprovalNote('');
  };

  const closeApprovalModal = () => {
    setApprovalModal(null);
    setApprovalDecision(null);
    setApprovalNote('');
  };

  const getDecisionConfig = (decision) => {
    const configs = {
      approved: { bg: 'bg-green-500/10', border: 'border-green-500/20', text: 'text-green-400', label: 'APPROVED', icon: CheckCircle },
      denied: { bg: 'bg-red-500/10', border: 'border-red-500/20', text: 'text-red-400', label: 'DENIED', icon: X },
      escalated: { bg: 'bg-amber-500/10', border: 'border-amber-500/20', text: 'text-amber-400', label: 'ESCALATED', icon: ArrowRight },
      deferred: { bg: 'bg-slate-700/20', border: 'border-slate-600/20', text: 'text-slate-400', label: 'DEFERRED', icon: Clock },
    };
    return configs[decision] || configs.deferred;
  };

  return (
    <DashboardLayout>
      <div className="p-4 lg:p-6">
        <div className="max-w-[1400px] mx-auto">

          {/* ═══════════════════════════════════════════════════
               ZONE 1: STATUS — Are we in danger?
               ═══════════════════════════════════════════════════ */}

          {/* ── Page Header ────────────────────────────────── */}
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white mb-1">Risk & Compliance</h2>
                <div className="flex items-center gap-2 text-[11px] text-slate-500">
                  <span>Early warning + audit defense</span>
                  <span className="text-slate-700">&middot;</span>
                  <span>{openRisks.length} open risks</span>
                  {criticalCount > 0 && (
                    <>
                      <span className="text-slate-700">&middot;</span>
                      <span className="text-red-400 font-semibold">{criticalCount} critical</span>
                    </>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-2.5 py-1 bg-green-500/8 border border-green-500/15 rounded text-[10px] font-semibold ${overallCompliance >= 90 ? 'text-green-400' : 'text-amber-400'}`}>
                  {overallCompliance}% Compliant
                </span>
                <button className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-800/40 border border-slate-700/30 rounded-lg text-[11px] text-slate-400 hover:text-white transition-colors">
                  <Download className="w-3 h-3" />
                  Compliance Report
                </button>
              </div>
            </div>
          </div>

          {/* ── Top Summary — 4 Cards ────────────────────── */}
          <div className="grid grid-cols-4 gap-3 mb-4">
            {/* Operational Pressure Index */}
            <div className={`bg-slate-800/20 border rounded-xl px-3 py-2.5 ${
              opiScore >= 75 ? 'border-red-500/20' : opiScore >= 50 ? 'border-amber-500/20' : 'border-slate-700/15'
            }`}>
              <div className="flex items-center gap-2 mb-1.5">
                <Gauge className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">Pressure Index</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className={`text-xl font-bold ${opiColor}`}>{opiScore}</span>
                <span className="text-[10px] text-slate-600">/ 100</span>
                <span className={`px-1.5 py-px rounded text-[9px] font-bold uppercase border ${
                  opiScore >= 75 ? 'bg-red-500/10 border-red-500/20 text-red-400' :
                  opiScore >= 50 ? 'bg-amber-500/10 border-amber-500/20 text-amber-400' :
                  'bg-green-500/10 border-green-500/20 text-green-400'
                }`}>{opiLevel}</span>
              </div>
              <div className="mt-1 space-y-px">
                {opiBreakdown.filter(b => b.score > 0).map((b, i) => (
                  <div key={i} className="flex items-center gap-1 text-[9px] text-slate-600 leading-tight">
                    <span className="text-slate-500 font-mono w-[28px]">{(b.weight * 100).toFixed(0)}%</span>
                    <span className="flex-1">{b.label}: {b.score.toFixed(1)}/{b.max}</span>
                    <span className="font-mono text-slate-500">+{b.weighted}</span>
                  </div>
                ))}
                <div className="flex items-center gap-1 text-[9px] text-slate-500 leading-tight pt-0.5 border-t border-slate-700/20 mt-0.5">
                  <span className="font-mono w-[28px]">Σ</span>
                  <span className="flex-1 font-semibold">Composite OPI</span>
                  <span className="font-mono font-bold text-white">={opiScore}</span>
                </div>
              </div>
            </div>

            {/* Open Risk Items */}
            <div className="bg-slate-800/20 border border-slate-700/25 rounded-xl px-3 py-2.5">
              <div className="flex items-center gap-2 mb-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">Open Risks</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-bold text-white">{openRisks.length}</span>
                <div className="flex items-center gap-1.5 text-[10px]">
                  <span className="text-red-400 font-semibold">{criticalCount} critical</span>
                  <span className="text-slate-700">&middot;</span>
                  <span className="text-amber-400">{mediumCount} medium</span>
                  {lowCount > 0 && (
                    <>
                      <span className="text-slate-700">&middot;</span>
                      <span className="text-slate-400">{lowCount} low</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Next Audit */}
            <div className="bg-slate-800/20 border border-slate-700/25 rounded-xl px-3 py-2.5">
              <div className="flex items-center gap-2 mb-1.5">
                <Calendar className="w-3.5 h-3.5 text-purple-400" />
                <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">Next Audit</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-[13px] font-bold text-white">{nextAudit.agency}</span>
                <span className="text-[10px] text-slate-500">{nextAudit.date}</span>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] mt-0.5">
                <span className={getReadinessColor(nextAudit.readiness, nextAudit.daysOut)}>
                  {nextAudit.readiness}% ready
                </span>
                <span className="text-slate-700">&middot;</span>
                <span className="text-slate-500">{nextAudit.daysOut}d out</span>
                {nextAudit.risks > 0 && (
                  <>
                    <span className="text-slate-700">&middot;</span>
                    <span className="text-red-400">{nextAudit.risks} linked risk</span>
                  </>
                )}
              </div>
            </div>

            {/* Compliance Rate */}
            <div className="bg-slate-800/20 border border-slate-700/25 rounded-xl px-3 py-2.5">
              <div className="flex items-center gap-2 mb-1.5">
                <Shield className="w-3.5 h-3.5 text-green-400" />
                <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">Compliance Rate</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className={`text-xl font-bold ${overallCompliance >= 90 ? 'text-green-400' : 'text-amber-400'}`}>{overallCompliance}%</span>
                <div className="flex items-center gap-1 text-[10px] text-green-400">
                  <TrendingUp className="w-3 h-3" />
                  +1.2% vs Q3
                </div>
              </div>
            </div>
          </div>

          {/* ── AI Summary Bar ────────────────────────────── */}
          <div className="mb-4">
            <button
              onClick={() => setAiSummaryExpanded(!aiSummaryExpanded)}
              className="w-full flex items-center gap-2 px-3 py-2 bg-slate-800/20 border border-slate-700/15 rounded hover:bg-slate-800/30 transition-colors"
            >
              <Sparkles className="w-3 h-3 text-slate-500" />
              <span className="text-[11px] text-slate-300 flex-1 text-left">
                {criticalCount} critical risks threaten Dec 12 audit. Equipment ↑16%. {pendingApprovalCount} approvals pending — projected compliance: 96.1% if approved.
              </span>
              <span className="text-[10px] text-slate-600 flex-shrink-0">{aiSummaryExpanded ? 'Less' : 'Details'}</span>
              {aiSummaryExpanded ? <ChevronUp className="w-3 h-3 text-slate-600" /> : <ChevronDown className="w-3 h-3 text-slate-600" />}
            </button>

            {aiSummaryExpanded && (
              <div className="mt-1 px-3 py-2.5 bg-slate-800/15 border border-slate-700/10 rounded space-y-1.5">
                <p className="text-[10px] text-red-400">&bull; HVAC 84&deg;F. USMS inspection in 4 days. Federal housing contract exposure: $1.2M/yr. Contractor on-site.</p>
                <p className="text-[10px] text-red-400">&bull; Body cams EOL Dec 31. $125K approval pending. If denied: 142 active cases with evidence gaps. State compliance revoked.</p>
                <p className="text-[10px] text-amber-400">&bull; ACA re-accreditation: 62% ready, 72 days out. 2 documentation findings open. Below 70% at 30d triggers AT RISK.</p>
                <p className="text-[10px] text-amber-400">&bull; 2 POST certifications expire Jan 31. Training budget ($43K) pending. If denied: 2 deputies removed from patrol.</p>
                <p className="text-[10px] text-green-400">&bull; CJIS: compliant. PREA: compliant. UOF review rate: 97.2%. Training deficiency trend: &darr;40%.</p>
                <p className="text-[10px] text-slate-400">&bull; {pendingApprovalCount} pending approvals ($186K) resolve {pendingApprovalCount} of {openRisks.length} open risks. Projected compliance: 94.7% &rarr; 96.1%.</p>
              </div>
            )}
          </div>

          {/* ═══════════════════════════════════════════════════
               ZONE 2: REQUIRED ACTIONS — What's causing it? What must I approve?
               ═══════════════════════════════════════════════════ */}

          {/* ── Open Risk Items ────────────────────────────── */}
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2 px-1">
              <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
              <span className="text-[12px] font-bold text-white">Open Risk Items</span>
              <span className="px-1.5 py-px bg-red-500/10 border border-red-500/20 rounded text-[10px] font-bold text-red-400">
                {openRisks.length}
              </span>
              <div className="flex-1" />

              {/* Filter pills */}
              <div className="flex items-center gap-1">
                {[
                  { id: 'all', label: 'All', count: openRisks.length },
                  { id: 'critical', label: 'Critical', count: criticalCount },
                  { id: 'medium', label: 'Medium', count: mediumCount },
                  { id: 'low', label: 'Low', count: lowCount },
                ].filter(opt => opt.id === 'all' || opt.count > 0).map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => setRiskFilter(opt.id)}
                    className={`px-2 py-0.5 rounded text-[10px] font-medium border transition-all ${
                      riskFilter === opt.id
                        ? 'bg-slate-700/50 border-slate-600/50 text-white'
                        : 'bg-transparent border-slate-700/20 text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    {opt.label} <span className={riskFilter === opt.id ? 'text-slate-400' : 'text-slate-600'}>{opt.count}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-px">
              {filteredRisks.map((risk) => {
                const isExpanded = expandedRisks.includes(risk.id);

                return (
                  <div
                    key={risk.id}
                    className="rounded border border-slate-700/15 bg-slate-800/15 hover:bg-slate-800/25 transition-colors"
                  >
                    {/* Compact Row */}
                    <div className="flex items-center gap-2.5 px-3.5 py-[9px]">
                      {/* Severity strip */}
                      <div className={`w-[4px] self-stretch rounded-full flex-shrink-0 ${
                        risk.severity === 'critical' ? 'bg-red-500' :
                        risk.severity === 'medium' ? 'bg-amber-500' :
                        'bg-slate-500'
                      }`}></div>

                      {/* Severity pill */}
                      <span className={`px-1.5 py-px border rounded text-[10px] font-bold flex-shrink-0 uppercase leading-tight ${
                        risk.severity === 'critical' ? 'bg-red-500/10 border-red-500/20 text-red-400' :
                        risk.severity === 'medium' ? 'bg-amber-500/10 border-amber-500/20 text-amber-400' :
                        'bg-slate-400/10 border-slate-400/20 text-slate-400'
                      }`}>
                        {risk.severity}
                      </span>

                      {/* Impact tags */}
                      <span className="hidden md:flex items-center gap-1 flex-shrink-0">
                        {risk.impactTags.slice(0, 2).map((tag, i) => (
                          <span key={i} className={`px-1 py-px rounded text-[9px] font-semibold border ${
                            tag.includes('Liability') || tag.includes('Safety') ? 'bg-red-500/8 border-red-500/15 text-red-400/90' :
                            tag.includes('Compliance') || tag.includes('Integrity') ? 'bg-amber-500/8 border-amber-500/15 text-amber-400/90' :
                            'bg-slate-700/30 border-slate-700/20 text-slate-400'
                          }`}>{tag}</span>
                        ))}
                        {risk.impactTags.length > 2 && (
                          <span className="text-[9px] text-slate-600">+{risk.impactTags.length - 2}</span>
                        )}
                      </span>

                      {/* Title */}
                      <span className="text-[13px] font-bold flex-1 min-w-0 truncate text-white">
                        {risk.title}
                      </span>

                      {/* Owner */}
                      <span className="hidden lg:block text-[10px] text-slate-500 flex-shrink-0 max-w-[160px] truncate">
                        {risk.owner}
                      </span>

                      {/* Due date */}
                      <span className={`px-1.5 py-px border rounded text-[10px] font-bold flex-shrink-0 ${
                        risk.dueUrgency === 'critical' ? 'bg-red-500/10 border-red-500/20 text-red-400' :
                        risk.dueUrgency === 'soon' ? 'bg-amber-500/8 border-amber-500/15 text-amber-400' :
                        'bg-slate-700/30 border-slate-700/20 text-slate-400'
                      }`}>
                        {risk.daysLeft}d left
                      </span>

                      {/* Linked approval indicator */}
                      {risk.linkedApproval && (
                        <span className={`hidden md:inline-flex items-center gap-1 px-1.5 py-px rounded text-[10px] font-semibold flex-shrink-0 ${
                          risk.linkedApproval.status === 'approved' ? 'text-green-400/80' :
                          risk.linkedApproval.status === 'pending' ? 'text-amber-400/80' :
                          'text-slate-400'
                        }`}>
                          <Link2 className="w-2.5 h-2.5" />
                          {risk.linkedApproval.status === 'pending' ? 'Approval pending' : 'Approved'}
                        </span>
                      )}

                      {/* Expand */}
                      <button
                        onClick={() => toggleRiskExpand(risk.id)}
                        className="p-1 rounded hover:bg-slate-700/30 transition-colors flex-shrink-0"
                      >
                        {isExpanded ? <ChevronUp className="w-3.5 h-3.5 text-slate-500" /> : <ChevronDown className="w-3.5 h-3.5 text-slate-500" />}
                      </button>
                    </div>

                    {/* Expanded Details */}
                    {isExpanded && (
                      <div className="px-3.5 pb-3 pt-1 ml-[26px] space-y-2">
                        {/* Description + impact tags */}
                        <div>
                          <p className="text-[11px] text-slate-400 mb-1.5">{risk.description}</p>
                          <div className="flex items-center gap-1 flex-wrap">
                            {risk.impactTags.map((tag, i) => (
                              <span key={i} className={`px-1.5 py-px rounded text-[9px] font-semibold border ${
                                tag.includes('Liability') || tag.includes('Safety') ? 'bg-red-500/8 border-red-500/15 text-red-400' :
                                tag.includes('Compliance') || tag.includes('Integrity') || tag.includes('Accreditation') ? 'bg-amber-500/8 border-amber-500/15 text-amber-400' :
                                'bg-slate-700/30 border-slate-700/20 text-slate-400'
                              }`}>{tag}</span>
                            ))}
                          </div>
                        </div>

                        {/* Key details row */}
                        <div className="flex items-center gap-3 text-[10px] text-slate-400 flex-wrap">
                          <span>Owner: <span className="text-white font-medium">{risk.owner}</span></span>
                          <span className="text-slate-700">&middot;</span>
                          <span>Due: <span className="text-white font-medium">{risk.due}</span></span>
                        </div>

                        {/* Status */}
                        <div className="bg-slate-900/30 rounded p-2 border border-slate-700/15">
                          <p className="text-[10px] text-slate-500 font-semibold mb-0.5">Current Status</p>
                          <p className="text-[11px] text-slate-300">{risk.status}</p>
                        </div>

                        {/* Audit impact */}
                        {risk.auditImpact && (
                          <div className="flex items-center gap-2 text-[10px] text-amber-400">
                            <AlertTriangle className="w-3 h-3 flex-shrink-0" />
                            <span>Audit impact: {risk.auditImpact}</span>
                          </div>
                        )}

                        {/* If unresolved — cascade chain */}
                        {risk.ifUnresolved && (
                          <div className="bg-red-500/[0.02] border border-red-500/10 rounded p-2">
                            <p className="text-[10px] text-red-400 font-bold mb-1">IF UNRESOLVED:</p>
                            {risk.ifUnresolved.map((consequence, i) => (
                              <p key={i} className="text-[10px] text-red-400/80 pl-2">→ {consequence}</p>
                            ))}
                          </div>
                        )}

                        {/* Linked approval */}
                        {risk.linkedApproval && (() => {
                          const isLogged = actionLog.some(l => l.approvalId === risk.linkedApproval.id);
                          const logEntry = actionLog.find(l => l.approvalId === risk.linkedApproval.id);
                          const displayStatus = isLogged ? logEntry.decision : risk.linkedApproval.status;
                          const statusCfg = isLogged ? getDecisionConfig(logEntry.decision) : null;

                          return (
                            <div
                              className={`flex items-center gap-2 px-2.5 py-1.5 rounded border text-[10px] ${
                                isLogged
                                  ? `${statusCfg.bg} ${statusCfg.border}`
                                  : risk.linkedApproval.status === 'approved'
                                    ? 'bg-green-500/[0.03] border-green-500/15 text-green-400'
                                    : 'bg-amber-500/[0.03] border-amber-500/15 text-amber-400 cursor-pointer hover:bg-amber-500/[0.06]'
                              } transition-all`}
                              onClick={() => {
                                if (!isLogged && risk.linkedApproval.status === 'pending') {
                                  const action = pendingActions.find(a => a.approvalId === risk.linkedApproval.id);
                                  if (action) setApprovalModal(action);
                                }
                              }}
                            >
                              <Link2 className="w-3 h-3 flex-shrink-0" />
                              <span className="font-semibold">Linked Approval:</span>
                              <span className="text-white">{risk.linkedApproval.title}</span>
                              <span className="font-mono">${risk.linkedApproval.amount.toLocaleString()}</span>
                              <span className="text-slate-700">&mdash;</span>
                              <span className={`font-bold uppercase ${
                                isLogged ? statusCfg.text :
                                risk.linkedApproval.status === 'approved' ? 'text-green-400' : 'text-amber-400'
                              }`}>
                                {displayStatus}
                              </span>
                              {isLogged && logEntry && (
                                <span className="text-[9px] text-slate-600 font-mono ml-1">{logEntry.displayTime}</span>
                              )}
                              {!isLogged && risk.linkedApproval.status === 'pending' && (
                                <span className="text-[9px] text-amber-400/70 ml-1">→ Click to decide</span>
                              )}
                            </div>
                          );
                        })()}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── Upcoming Audits & Inspections ─────────────── */}
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2 px-1">
              <Calendar className="w-3.5 h-3.5 text-purple-400" />
              <span className="text-[12px] font-bold text-white">Upcoming Audits</span>
            </div>
            <div className="border border-slate-700/25 rounded-xl overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-700/20">
                    <th className="px-3 py-2 text-left text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Date</th>
                    <th className="px-3 py-2 text-left text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Agency</th>
                    <th className="px-3 py-2 text-left text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Scope</th>
                    <th className="px-3 py-2 text-left text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Lead</th>
                    <th className="px-3 py-2 text-left text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Readiness</th>
                    <th className="px-3 py-2 text-left text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Risks</th>
                  </tr>
                </thead>
                <tbody>
                  {upcomingAudits.map((audit) => {
                    const readinessWarning = getReadinessWarning(audit.readiness, audit.daysOut);
                    const isAtRisk = readinessWarning === 'AT RISK';
                    const isMonitor = readinessWarning === 'MONITOR';
                    const shouldPulse = audit.readiness < 75 && audit.daysOut < 30;
                    return (
                      <tr key={audit.id} className={`border-b transition-colors ${
                        shouldPulse ? 'border-red-500/20 audit-pulse' :
                        isAtRisk ? 'border-red-500/15 bg-red-500/[0.03] hover:bg-red-500/[0.06]' :
                        isMonitor ? 'border-amber-500/10 bg-amber-500/[0.02] hover:bg-amber-500/[0.04]' :
                        'border-slate-800/10 hover:bg-slate-800/15'
                      }`}>
                        <td className="px-3 py-2.5">
                          <div className="flex items-center gap-1.5">
                            <span className="text-[11px] font-semibold text-white">{audit.date}</span>
                            <span className="text-[10px] text-slate-600 font-mono">{audit.daysOut}d</span>
                          </div>
                        </td>
                        <td className="px-3 py-2.5">
                          <span className="text-[11px] font-semibold text-white">{audit.agency}</span>
                        </td>
                        <td className="px-3 py-2.5">
                          <span className="text-[11px] text-slate-400">{audit.scope}</span>
                        </td>
                        <td className="px-3 py-2.5">
                          <span className="text-[10px] text-slate-500">{audit.lead}</span>
                        </td>
                        <td className="px-3 py-2.5">
                          <div className="flex items-center gap-1.5">
                            <span className={`text-[11px] font-bold ${getReadinessColor(audit.readiness, audit.daysOut)}`}>
                              {audit.readiness}%
                            </span>
                            {readinessWarning && (
                              <span className={`px-1 py-px rounded text-[9px] font-bold border ${
                                readinessWarning === 'AT RISK'
                                  ? 'bg-red-500/10 border-red-500/20 text-red-400'
                                  : 'bg-amber-500/10 border-amber-500/20 text-amber-400'
                              }`}>
                                {readinessWarning}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-3 py-2.5">
                          {audit.risks > 0 ? (
                            <span className="text-[10px] font-semibold text-red-400">{audit.risks} linked</span>
                          ) : (
                            <span className="text-[10px] text-slate-600">0</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════
               ZONE 3: FORWARD PROJECTION — What happens if we don't act?
               ═══════════════════════════════════════════════════ */}

          {/* ── Risk Trends + Policy Compliance ─────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-4">

            {/* Risk Trends — Narrative */}
            <div className="bg-slate-800/20 border border-slate-700/25 rounded-xl p-3">
              <div className="flex items-center gap-2 mb-2.5">
                <TrendingUp className="w-3.5 h-3.5 text-purple-400" />
                <span className="text-[12px] font-bold text-white">Risk Trends</span>
                <span className="text-[10px] text-slate-600 ml-1">6-month analysis</span>
              </div>

              <div className="space-y-2.5">
                {riskInsights.map((insight, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <div className={`w-[4px] self-stretch rounded-full flex-shrink-0 mt-0.5 ${
                      insight.direction === 'up' ? 'bg-red-500' :
                      insight.direction === 'down' ? 'bg-green-500' :
                      'bg-slate-600'
                    }`}></div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-semibold text-slate-500 uppercase">{insight.label}</span>
                        <span className={`text-[10px] font-bold ${
                          insight.direction === 'up' ? 'text-red-400' :
                          insight.direction === 'down' ? 'text-green-400' :
                          'text-slate-400'
                        }`}>
                          {insight.direction === 'up' ? '↑' : insight.direction === 'down' ? '↓' : '→'} {insight.change}
                        </span>
                      </div>
                      <p className="text-[11px] font-semibold text-white">{insight.value}</p>
                      <p className="text-[10px] text-slate-500">{insight.detail}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-3 pt-2.5 border-t border-red-500/10">
                <p className="text-[10px] text-red-400 font-semibold">
                  Projected risk exposure if no action: <span className="text-red-300">+9% next 30 days</span>
                </p>
                <p className="text-[9px] text-slate-600 mt-0.5">Driven by equipment EOL + ACA readiness gap + 2 expiring certs</p>
              </div>

              <div className="mt-2 pt-2 border-t border-slate-700/15 flex items-center gap-3 text-[10px] text-slate-500">
                <span>Total events: <span className="text-white font-semibold">24</span> (↓14% vs H1)</span>
                <span className="text-slate-700">&middot;</span>
                <span>Avg resolution: <span className="text-white font-semibold">8.3d</span> (target: &lt;10d)</span>
              </div>
            </div>

            {/* Policy Compliance */}
            <div className="bg-slate-800/20 border border-slate-700/25 rounded-xl p-3">
              <div className="flex items-center gap-2 mb-2.5">
                <FileText className="w-3.5 h-3.5 text-blue-400" />
                <span className="text-[12px] font-bold text-white">Policy Compliance</span>
              </div>

              <div className="space-y-2">
                {policyCompliance.map((policy, idx) => {
                  const breached = policy.rate < policy.threshold;
                  return (
                    <div key={idx} className={`rounded p-2.5 border ${
                      breached ? 'bg-red-500/[0.02] border-red-500/10' : 'bg-slate-900/20 border-slate-700/10'
                    }`}>
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-semibold text-white">{policy.name}</span>
                          {breached && (
                            <span className="px-1 py-px rounded text-[9px] font-bold border bg-red-500/10 border-red-500/20 text-red-400">
                              BELOW {policy.threshold}%
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className={`text-[13px] font-bold ${
                            policy.rate >= policy.threshold ? 'text-green-400' :
                            policy.rate >= policy.threshold - 5 ? 'text-amber-400' :
                            'text-red-400'
                          }`}>{policy.rate}%</span>
                          <span className={`text-[10px] font-semibold ${
                            policy.trend === 'down' ? 'text-red-400' :
                            policy.trend === 'up' ? 'text-green-400' :
                            'text-slate-500'
                          }`}>
                            {policy.trend === 'down' ? '↓' : policy.trend === 'up' ? '↑' : '→'}
                          </span>
                        </div>
                      </div>
                      <p className="text-[10px] text-slate-500">{policy.detail}</p>
                      {policy.status && <p className="text-[10px] text-slate-500">{policy.status}</p>}
                      {policy.warning && <p className="text-[10px] text-amber-400">{policy.warning}</p>}
                      {breached && policy.operationalImpact && (
                        <p className="text-[10px] text-red-400 mt-0.5">
                          <span className="font-semibold">Impact:</span> {policy.operationalImpact}
                        </p>
                      )}
                      {breached && policy.autoActions && (
                        <div className="mt-1.5 pt-1.5 border-t border-red-500/10">
                          <p className="text-[9px] text-red-400/80 font-bold uppercase mb-0.5">Auto-escalation triggered:</p>
                          {policy.autoActions.map((action, i) => (
                            <p key={i} className="text-[10px] text-red-400/70 pl-2">→ {action}</p>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ── 30-Day Cascade Projection ───────────────────── */}
          <div className="border border-red-500/15 rounded overflow-hidden">
            <div className="px-3 py-2.5 bg-red-500/[0.03] border-b border-red-500/10">
              <div className="flex items-center gap-2">
                <Zap className="w-3.5 h-3.5 text-red-400" />
                <span className="text-[12px] font-bold text-white">30-Day Cascade Projection</span>
                <span className="px-1.5 py-px bg-red-500/10 border border-red-500/20 rounded text-[9px] font-bold text-red-400 uppercase">If Unresolved</span>
              </div>
              <p className="text-[10px] text-slate-500 mt-0.5 ml-[22px]">Projected system state if POST, Training, and Equipment issues remain unresolved through Jan 8, 2025</p>
            </div>

            {/* Projected Metrics */}
            <div className="grid grid-cols-5 gap-px bg-slate-800/10">
              {[
                { label: 'Overall Compliance', current: '94.7%', projected: '89.2%', direction: 'down', severity: 'critical' },
                { label: 'Insurance Risk Score', current: 'Moderate', projected: 'High', direction: 'up', severity: 'critical' },
                { label: 'Federal Funding Risk', current: 'Low', projected: 'Elevated', direction: 'up', severity: 'warning' },
                { label: 'Command Brief Status', current: 'Amber', projected: 'Red', direction: 'up', severity: 'critical' },
                { label: 'Budget Reallocation', current: '$0', projected: '$168K', direction: 'up', severity: 'warning' },
              ].map((metric, idx) => (
                <div key={idx} className="px-3 py-2.5 bg-slate-900/30">
                  <p className="text-[9px] font-semibold text-slate-500 uppercase tracking-wider mb-1">{metric.label}</p>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] text-slate-500 line-through">{metric.current}</span>
                    <span className="text-[10px] text-slate-600">→</span>
                    <span className={`text-[11px] font-bold ${
                      metric.severity === 'critical' ? 'text-red-400' : 'text-amber-400'
                    }`}>{metric.projected}</span>
                    {metric.direction === 'down'
                      ? <TrendingDown className="w-2.5 h-2.5 text-red-400" />
                      : <TrendingUp className="w-2.5 h-2.5 text-red-400" />
                    }
                  </div>
                </div>
              ))}
            </div>

            {/* Cascade Chains */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-slate-800/10">
              {/* POST Chain */}
              <div className="px-3 py-2.5 bg-slate-900/20">
                <p className="text-[10px] font-bold text-red-400 mb-1.5">POST Certification Cascade</p>
                <div className="space-y-1">
                  <p className="text-[10px] text-slate-400">Trigger: 2 certifications expire Jan 31</p>
                  <p className="text-[10px] text-red-400/80 pl-1.5">→ Uncertified deputies: 14 of 170</p>
                  <p className="text-[10px] text-red-400/80 pl-3">→ Staffing projection: 97% → 93.5%</p>
                  <p className="text-[10px] text-red-400/80 pl-4.5">→ Shift coverage: 3 below minimum staffing</p>
                  <p className="text-[10px] text-red-400/80 pl-6">→ POST inspection exposure: documented finding</p>
                </div>
              </div>

              {/* Equipment Chain */}
              <div className="px-3 py-2.5 bg-slate-900/20">
                <p className="text-[10px] font-bold text-red-400 mb-1.5">Equipment Compliance Cascade</p>
                <div className="space-y-1">
                  <p className="text-[10px] text-slate-400">Trigger: 68 body cams EOL Dec 31 + 9 fleet overdue</p>
                  <p className="text-[10px] text-red-400/80 pl-1.5">→ Equipment compliance projection: 86% → 72%</p>
                  <p className="text-[10px] text-red-400/80 pl-3">→ Evidence integrity: 142 active cases affected</p>
                  <p className="text-[10px] text-red-400/80 pl-4.5">→ Civil liability exposure: unrecorded UOF incidents</p>
                  <p className="text-[10px] text-red-400/80 pl-6">→ Insurance carrier action: agency flagged</p>
                </div>
              </div>

              {/* ACA Chain */}
              <div className="px-3 py-2.5 bg-slate-900/20">
                <p className="text-[10px] font-bold text-amber-400 mb-1.5">ACA Accreditation Cascade</p>
                <div className="space-y-1">
                  <p className="text-[10px] text-slate-400">Trigger: Readiness 62%, 2 documentation findings open</p>
                  <p className="text-[10px] text-amber-400/80 pl-1.5">→ Feb 18 audit readiness projection: below 50%</p>
                  <p className="text-[10px] text-amber-400/80 pl-3">→ Re-accreditation outcome: conditional status</p>
                  <p className="text-[10px] text-amber-400/80 pl-4.5">→ Federal housing contract: under review</p>
                  <p className="text-[10px] text-amber-400/80 pl-6">→ USMS revenue exposure: $1.2M/yr</p>
                </div>
              </div>
            </div>

            {/* Cross-System Ripple */}
            <div className="px-3 py-2.5 bg-slate-900/40 border-t border-red-500/10">
              <p className="text-[10px] font-bold text-white mb-1.5">Cross-System Ripple</p>
              <div className="grid grid-cols-2 lg:grid-cols-5 gap-2">
                {[
                  { system: 'Command Alerts', action: '3 critical alerts auto-generated', color: 'red' },
                  { system: 'Approvals', action: '2 emergency approvals auto-created', color: 'amber' },
                  { system: 'Daily Brief', action: 'Risk headline status: RED', color: 'red' },
                  { system: 'Staffing', action: 'Readiness projection: below 94%', color: 'amber' },
                  { system: 'Budget', action: 'Reallocation recommendation: $168K', color: 'amber' },
                ].map((ripple, idx) => (
                  <div key={idx} className={`px-2 py-1.5 rounded border ${
                    ripple.color === 'red'
                      ? 'bg-red-500/[0.03] border-red-500/15'
                      : 'bg-amber-500/[0.02] border-amber-500/15'
                  }`}>
                    <p className={`text-[9px] font-bold uppercase ${
                      ripple.color === 'red' ? 'text-red-400' : 'text-amber-400'
                    }`}>{ripple.system}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">{ripple.action}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* ── ACTION REQUIRED: Workflow Driver ────────────── */}
            <div className="border-t border-amber-500/20 bg-gradient-to-r from-amber-500/[0.04] via-amber-500/[0.02] to-transparent">
              <div className="px-4 py-3">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-5 h-5 bg-amber-500/20 rounded flex items-center justify-center">
                    <FileSignature className="w-3 h-3 text-amber-400" />
                  </div>
                  <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">Action Required — {pendingActions.length} Pending Decisions</span>
                  <span className="text-[10px] text-slate-500 ml-1">${pendingActions.reduce((s, a) => s + a.amount, 0).toLocaleString()} total</span>
                </div>

                {pendingActions.length > 0 ? (
                  <div className="space-y-2">
                    {pendingActions.map(action => {
                      const isLogged = actionLog.some(l => l.approvalId === action.approvalId);
                      const logEntry = actionLog.find(l => l.approvalId === action.approvalId);
                      const decisionConfig = logEntry ? getDecisionConfig(logEntry.decision) : null;

                      return (
                        <div key={action.approvalId} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg border transition-all ${
                          isLogged
                            ? `${decisionConfig.bg} ${decisionConfig.border}`
                            : 'bg-slate-900/40 border-amber-500/15 hover:border-amber-500/30'
                        }`}>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-0.5">
                              <span className={`px-1.5 py-px rounded text-[9px] font-bold border ${
                                action.severity === 'critical' ? 'bg-red-500/10 border-red-500/20 text-red-400' : 'bg-amber-500/10 border-amber-500/20 text-amber-400'
                              }`}>{action.severity.toUpperCase()}</span>
                              <span className="text-[11px] font-semibold text-white truncate">{action.title}</span>
                              <span className="text-[10px] font-mono text-slate-400">${action.amount.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center gap-2 text-[10px] text-slate-500">
                              <span>Risk: {action.riskTitle}</span>
                              <span className="text-slate-700">&middot;</span>
                              <span>{action.daysLeft}d remaining</span>
                              <span className="text-slate-700">&middot;</span>
                              <span>{action.cascadeCount} cascade consequences</span>
                            </div>
                          </div>

                          {isLogged ? (
                            <div className="flex items-center gap-2 flex-shrink-0">
                              <div className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded ${decisionConfig.bg} ${decisionConfig.border} border`}>
                                <decisionConfig.icon className={`w-3 h-3 ${decisionConfig.text}`} />
                                <span className={`text-[10px] font-bold ${decisionConfig.text}`}>{decisionConfig.label}</span>
                              </div>
                              <span className="text-[9px] text-slate-600">{logEntry.displayTime}</span>
                            </div>
                          ) : (
                            <button
                              onClick={() => setApprovalModal(action)}
                              className="flex items-center gap-1.5 px-3 py-2 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/30 hover:border-amber-500/50 text-amber-400 rounded-lg text-[11px] font-bold transition-all flex-shrink-0"
                            >
                              <Lock className="w-3 h-3" />
                              Review & Decide
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-green-500/[0.03] border border-green-500/15">
                    <CheckCircle className="w-3.5 h-3.5 text-green-400" />
                    <p className="text-[10px] text-green-400 font-semibold">All pending approvals resolved. Projected compliance: 96.1% — GREEN status.</p>
                  </div>
                )}

                {/* Decision Audit Log */}
                {actionLog.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-slate-700/20">
                    <div className="flex items-center gap-2 mb-2">
                      <History className="w-3 h-3 text-slate-500" />
                      <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Decision Log</span>
                      <span className="text-[9px] text-slate-600">{actionLog.length} entries</span>
                    </div>
                    <div className="space-y-1">
                      {actionLog.slice(0, 5).map(entry => {
                        const cfg = getDecisionConfig(entry.decision);
                        return (
                          <div key={entry.id} className="flex items-center gap-2 text-[10px] px-2 py-1.5 rounded bg-slate-900/30">
                            <cfg.icon className={`w-3 h-3 flex-shrink-0 ${cfg.text}`} />
                            <span className={`font-bold ${cfg.text} w-[72px]`}>{cfg.label}</span>
                            <span className="text-white font-medium flex-1 truncate">{entry.approvalTitle}</span>
                            <span className="text-slate-500 font-mono">${entry.amount.toLocaleString()}</span>
                            <span className="text-slate-600">{entry.actor}</span>
                            <span className="text-slate-600 font-mono text-[9px]">{entry.displayTime}</span>
                            <span className="text-slate-600 font-mono text-[9px]">OPI:{entry.opiAtDecision}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ── Regulatory Standards (Reference) ─────────── */}
          <div className="mt-4">
            <div className="flex items-center gap-2 mb-2 px-1">
              <Shield className="w-3.5 h-3.5 text-blue-400" />
              <span className="text-[12px] font-bold text-white">Regulatory Standards</span>
              <span className="text-[10px] text-slate-600">Reference</span>
            </div>
            <div className="border border-slate-700/25 rounded-xl overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-700/20">
                    <th className="px-3 py-2 text-left text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Standard</th>
                    <th className="px-3 py-2 text-left text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                    <th className="px-3 py-2 text-left text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Exposure</th>
                    <th className="px-3 py-2 text-left text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Findings</th>
                    <th className="px-3 py-2 text-left text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Trend</th>
                    <th className="px-3 py-2 text-left text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Detail</th>
                  </tr>
                </thead>
                <tbody>
                  {complianceStandards.map((std) => (
                    <tr key={std.id} className="border-b border-slate-800/10 hover:bg-slate-800/15 transition-colors">
                      <td className="px-3 py-2">
                        <span className="text-[11px] font-semibold text-white">{std.name}</span>
                      </td>
                      <td className="px-3 py-2">
                        <span className={`inline-flex items-center gap-1 px-1.5 py-px rounded text-[10px] font-bold border ${
                          std.status === 'compliant'
                            ? 'bg-green-500/10 border-green-500/20 text-green-400'
                            : std.status === 'warning'
                            ? 'bg-amber-500/10 border-amber-500/20 text-amber-400'
                            : 'bg-red-500/10 border-red-500/20 text-red-400'
                        }`}>
                          {std.status === 'compliant' ? <CheckCircle className="w-2.5 h-2.5" /> : <AlertTriangle className="w-2.5 h-2.5" />}
                          {std.statusLabel || (std.status === 'compliant' ? 'Compliant' : std.status === 'warning' ? 'At Risk' : 'Non-Compliant')}
                        </span>
                      </td>
                      <td className="px-3 py-2">
                        <span className={`px-1.5 py-px rounded text-[9px] font-bold uppercase border ${
                          std.exposure === 'high' ? 'bg-red-500/10 border-red-500/20 text-red-400' :
                          std.exposure === 'moderate' ? 'bg-amber-500/10 border-amber-500/20 text-amber-400' :
                          'bg-slate-700/30 border-slate-700/20 text-slate-500'
                        }`}>{std.exposure}</span>
                      </td>
                      <td className="px-3 py-2">
                        {std.openFindings > 0 ? (
                          <span className="text-[10px] font-semibold text-amber-400">{std.openFindings} open</span>
                        ) : (
                          <span className="text-[10px] text-slate-600">0</span>
                        )}
                      </td>
                      <td className="px-3 py-2">
                        <span className={`text-[10px] font-semibold ${
                          std.trend === 'down' ? 'text-green-400' :
                          std.trend === 'up' ? 'text-red-400' :
                          'text-slate-500'
                        }`}>
                          {std.trend === 'down' ? '↓' : std.trend === 'up' ? '↑' : '→'}
                        </span>
                      </td>
                      <td className="px-3 py-2">
                        <span className="text-[10px] text-slate-500">{std.detail}</span>
                        {std.autoAction && (
                          <span className="text-[9px] text-amber-400 ml-1">⚡ {std.autoAction}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
      {/* ══════════════════════════════════════════════════
           APPROVAL DECISION MODAL
           Full workflow: Review → Decide → Log → Timestamp
           ══════════════════════════════════════════════════ */}
      {approvalModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={closeApprovalModal} />
          <div className="relative bg-slate-900 border border-slate-700/50 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden">

            {/* Modal Header */}
            <div className="px-5 py-4 border-b border-slate-700/50 bg-slate-800/30">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Lock className="w-4 h-4 text-amber-400" />
                    <h3 className="text-sm font-bold text-white">Authorization Required</h3>
                  </div>
                  <p className="text-[10px] text-slate-500">Decision will be logged with timestamp, actor, and OPI context</p>
                </div>
                <button onClick={closeApprovalModal} className="p-1.5 hover:bg-slate-800/50 rounded-lg transition-colors">
                  <X className="w-4 h-4 text-slate-400" />
                </button>
              </div>
            </div>

            {!approvalDecision ? (
              <>
                {/* Approval Details */}
                <div className="px-5 py-4 space-y-4">
                  <div className="bg-slate-800/40 rounded-xl p-4 border border-slate-700/30">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-1.5 py-px rounded text-[9px] font-bold border ${
                        approvalModal.severity === 'critical' ? 'bg-red-500/10 border-red-500/20 text-red-400' : 'bg-amber-500/10 border-amber-500/20 text-amber-400'
                      }`}>{approvalModal.severity.toUpperCase()}</span>
                      <span className="text-sm font-semibold text-white">{approvalModal.title}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-[10px]">
                      <div><span className="text-slate-500">Amount:</span> <span className="text-white font-bold font-mono">${approvalModal.amount.toLocaleString()}</span></div>
                      <div><span className="text-slate-500">Linked Risk:</span> <span className="text-white">{approvalModal.riskTitle}</span></div>
                      <div><span className="text-slate-500">Owner:</span> <span className="text-white">{approvalModal.owner}</span></div>
                      <div><span className="text-slate-500">Days Remaining:</span> <span className={`font-bold ${approvalModal.daysLeft <= 7 ? 'text-red-400' : 'text-amber-400'}`}>{approvalModal.daysLeft}d</span></div>
                      <div><span className="text-slate-500">Cascade Chains:</span> <span className="text-red-400 font-bold">{approvalModal.cascadeCount} consequences</span></div>
                      {approvalModal.auditImpact && <div><span className="text-slate-500">Audit Impact:</span> <span className="text-amber-400">{approvalModal.auditImpact}</span></div>}
                    </div>
                  </div>

                  {/* Context snapshot */}
                  <div className="bg-slate-800/20 rounded-lg p-3 border border-slate-700/20">
                    <p className="text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Decision Context Snapshot</p>
                    <div className="grid grid-cols-3 gap-2 text-[10px]">
                      <div className="text-center">
                        <p className="text-slate-500">Current OPI</p>
                        <p className={`font-bold text-sm ${opiColor}`}>{opiScore}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-slate-500">Compliance</p>
                        <p className="font-bold text-sm text-amber-400">{overallCompliance}%</p>
                      </div>
                      <div className="text-center">
                        <p className="text-slate-500">Timestamp</p>
                        <p className="font-bold text-[10px] text-slate-300 font-mono">{new Date().toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
                      </div>
                    </div>
                  </div>

                  {/* Decision note */}
                  <div>
                    <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5 block">Decision Rationale (required for audit trail)</label>
                    <textarea
                      value={approvalNote}
                      onChange={(e) => setApprovalNote(e.target.value)}
                      placeholder="Enter justification for this decision..."
                      className="w-full px-3 py-2.5 bg-slate-800/40 border border-slate-700/50 rounded-lg text-white text-xs placeholder-slate-600 focus:outline-none focus:border-amber-500/50 resize-none"
                      rows={3}
                    />
                  </div>
                </div>

                {/* Decision Buttons */}
                <div className="px-5 py-4 border-t border-slate-700/50 bg-slate-800/20">
                  <p className="text-[9px] text-slate-600 mb-3 flex items-center gap-1.5">
                    <UserCheck className="w-3 h-3" />
                    Authorizing Official: <span className="text-white font-semibold">Sheriff K. Conway</span> — decision is final and logged
                  </p>
                  <div className="grid grid-cols-4 gap-2">
                    <button
                      onClick={() => handleApprovalAction('approved')}
                      disabled={!approvalNote.trim()}
                      className="px-3 py-2.5 bg-green-500/20 hover:bg-green-500/30 border border-green-500/30 text-green-400 rounded-lg text-[11px] font-bold transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <CheckCircle className="w-3.5 h-3.5 mx-auto mb-1" />
                      Approve
                    </button>
                    <button
                      onClick={() => handleApprovalAction('denied')}
                      disabled={!approvalNote.trim()}
                      className="px-3 py-2.5 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-400 rounded-lg text-[11px] font-bold transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <X className="w-3.5 h-3.5 mx-auto mb-1" />
                      Deny
                    </button>
                    <button
                      onClick={() => handleApprovalAction('escalated')}
                      disabled={!approvalNote.trim()}
                      className="px-3 py-2.5 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/30 text-amber-400 rounded-lg text-[11px] font-bold transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <ArrowRight className="w-3.5 h-3.5 mx-auto mb-1" />
                      Escalate
                    </button>
                    <button
                      onClick={() => handleApprovalAction('deferred')}
                      disabled={!approvalNote.trim()}
                      className="px-3 py-2.5 bg-slate-700/30 hover:bg-slate-700/50 border border-slate-600/30 text-slate-400 rounded-lg text-[11px] font-bold transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <Clock className="w-3.5 h-3.5 mx-auto mb-1" />
                      Defer
                    </button>
                  </div>
                </div>
              </>
            ) : (
              /* ── Decision Confirmation ── */
              <div className="px-5 py-6">
                <div className="text-center mb-4">
                  {(() => {
                    const cfg = getDecisionConfig(approvalDecision.action);
                    const Icon = cfg.icon;
                    return (
                      <>
                        <div className={`w-14 h-14 ${cfg.bg} border ${cfg.border} rounded-full flex items-center justify-center mx-auto mb-3`}>
                          <Icon className={`w-7 h-7 ${cfg.text}`} />
                        </div>
                        <h4 className={`text-lg font-bold ${cfg.text}`}>{cfg.label}</h4>
                        <p className="text-xs text-slate-400 mt-1">{approvalModal.title} — ${approvalModal.amount.toLocaleString()}</p>
                      </>
                    );
                  })()}
                </div>

                <div className="bg-slate-800/40 rounded-lg p-3 border border-slate-700/30 space-y-2 text-[10px]">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Decision ID</span>
                    <span className="text-white font-mono">{approvalDecision.entry.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Timestamp</span>
                    <span className="text-white font-mono">{approvalDecision.entry.displayTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Authorized By</span>
                    <span className="text-white">{approvalDecision.entry.actor} ({approvalDecision.entry.role})</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">OPI at Decision</span>
                    <span className={`font-bold ${opiColor}`}>{approvalDecision.entry.opiAtDecision}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Compliance at Decision</span>
                    <span className="text-white">{approvalDecision.entry.complianceAtDecision}%</span>
                  </div>
                  {approvalDecision.entry.note && (
                    <div className="pt-2 border-t border-slate-700/30">
                      <span className="text-slate-500">Rationale:</span>
                      <p className="text-slate-300 mt-0.5">{approvalDecision.entry.note}</p>
                    </div>
                  )}
                </div>

                <div className="mt-4 p-2.5 bg-blue-500/5 border border-blue-500/15 rounded-lg">
                  <p className="text-[9px] text-blue-400 flex items-center gap-1.5">
                    <CircleDot className="w-3 h-3" />
                    This decision has been recorded to the audit trail and will persist across sessions. Cascade projections will recalculate on next refresh.
                  </p>
                </div>

                <button
                  onClick={closeApprovalModal}
                  className="mt-4 w-full px-4 py-2.5 bg-slate-800/40 hover:bg-slate-800/60 border border-slate-700/50 text-white rounded-xl text-sm font-medium transition-all"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

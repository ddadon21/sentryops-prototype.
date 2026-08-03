import React, { useState } from 'react';
import {
  AlertTriangle, Calendar, CheckCircle, Shield, FileText,
  ChevronDown, ChevronUp, TrendingUp, TrendingDown, Download,
  Sparkles, Link2, Zap, Gauge, X, Clock, UserCheck, FileSignature,
  Lock, ArrowRight, CircleDot, History, Target, DollarSign,
  Users, Activity, BarChart2, Flame
} from 'lucide-react';
import DashboardLayout from '../layouts/DashboardLayout';

export default function RiskCompliance() {
  const [expandedRisks, setExpandedRisks] = useState([]);
  const [riskFilter, setRiskFilter] = useState('all');
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
      trend: 'up',
      financialExposure: '$1.2M/yr',
      staffingExposure: '36 inmate transfers required',
      accreditationExposure: 'ACA status jeopardized',
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
      trend: 'up',
      financialExposure: '$125K replacement + civil liability',
      staffingExposure: '142 active cases at risk',
      accreditationExposure: 'GA POST compliance revoked',
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
      trend: 'stable',
      financialExposure: 'Insurance carrier action',
      staffingExposure: '9 units restricted from duty',
      accreditationExposure: 'Equipment compliance: 86% → 78%',
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
      trend: 'stable',
      financialExposure: '$43K training cost',
      staffingExposure: '2 deputies off patrol',
      accreditationExposure: 'POST inspection finding documented',
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
      trend: 'stable',
      financialExposure: 'Federal contract at risk',
      staffingExposure: 'No direct impact',
      accreditationExposure: 'ACA conditional status probable',
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

  // ── Risk Heat Map Categories ──────────────────────────────
  const riskCategories = [
    { id: 'compliance', label: 'Compliance', icon: Shield, score: 72, trend: 'up', color: 'amber', detail: 'POST certs + ACA findings', count: 3 },
    { id: 'equipment', label: 'Equipment & Tech', icon: Activity, score: 84, trend: 'up', color: 'red', detail: 'Body cams EOL + fleet 86%', count: 2 },
    { id: 'accreditation', label: 'Accreditation', icon: FileText, score: 61, trend: 'stable', color: 'amber', detail: 'ACA re-accred 62% ready', count: 1 },
    { id: 'staffing', label: 'Staffing', icon: Users, score: 47, trend: 'stable', color: 'green', detail: '158/170 deployable', count: 1 },
    { id: 'legal', label: 'Legal & Liability', icon: Target, score: 78, trend: 'up', color: 'red', detail: 'Evidence gaps + civil exposure', count: 2 },
    { id: 'financial', label: 'Financial', icon: DollarSign, score: 55, trend: 'stable', color: 'amber', detail: '$168K unresolved exposure', count: 2 },
  ];

  // ── Top 5 Agency Threats ──────────────────────────────
  const topThreats = [
    {
      rank: 1,
      title: 'Body Camera System End-of-Life',
      category: 'Equipment & Legal',
      trend: 'up',
      severity: 'critical',
      financialExposure: '$125K replacement + civil suits',
      staffingExposure: '142 cases, UOF integrity at risk',
      accreditationExposure: 'GA POST compliance revoked',
      aiRec: 'Approve $125K body camera upgrade immediately. Every day of delay expands evidence integrity exposure across 142 active cases and increases civil liability for unrecorded use-of-force incidents.',
      daysLeft: 23
    },
    {
      rank: 2,
      title: 'H2-Pod HVAC System Failure',
      category: 'Facility & Federal',
      trend: 'up',
      severity: 'critical',
      financialExposure: '$1.2M/yr federal contract at risk',
      staffingExposure: '36 inmate transfers if unresolved',
      accreditationExposure: 'ACA accreditation jeopardized',
      aiRec: 'Contractor is on-site. Confirm repair completion before Dec 12 USMS inspection. If HVAC not restored by Dec 11, activate emergency inmate transfer protocol and notify USMS proactively.',
      daysLeft: 5
    },
    {
      rank: 3,
      title: 'ACA Re-Accreditation Readiness Gap',
      category: 'Accreditation',
      trend: 'stable',
      severity: 'high',
      financialExposure: 'Federal housing revenue at risk',
      staffingExposure: 'No direct impact',
      accreditationExposure: 'Conditional status — 38% gap from passing',
      aiRec: 'Close 2 documentation findings within 30 days. Assign Chief Deputy Harris weekly check-ins. At current trajectory (62% ready, 72 days out), conditional status is the most likely outcome.',
      daysLeft: 72
    },
    {
      rank: 4,
      title: 'P.O.S.T. Certification Expiration',
      category: 'Staffing & Compliance',
      trend: 'stable',
      severity: 'medium',
      financialExposure: '$43K training budget pending',
      staffingExposure: '2 deputies off patrol after Jan 31',
      accreditationExposure: 'POST inspection finding documented',
      aiRec: 'Approve Q1 training budget ($43K) and confirm Jan 18-19 sessions are locked. Deputies Chen and Williams must complete recertification before Jan 31 or be removed from patrol.',
      daysLeft: 54
    },
    {
      rank: 5,
      title: 'Patrol Fleet Inspection Overdue',
      category: 'Equipment & Insurance',
      trend: 'stable',
      severity: 'medium',
      financialExposure: 'Insurance carrier action pending',
      staffingExposure: '9 units restricted, 2 zones undermanned',
      accreditationExposure: 'Equipment compliance 86% → 78%',
      aiRec: 'Complete remaining 6 fleet inspections before Jan 15. Fleet Manager Anderson has appointments scheduled — confirm completion dates and escalate if appointments slip.',
      daysLeft: 38
    }
  ];

  // ── Computed values ──────────────────────────────
  const criticalCount = openRisks.filter(r => r.severity === 'critical').length;
  const mediumCount = openRisks.filter(r => r.severity === 'medium').length;
  const lowCount = openRisks.filter(r => r.severity === 'low').length;
  const overallCompliance = 94.7;
  const nextAudit = upcomingAudits[0];
  const pendingApprovalCount = openRisks.filter(r => r.linkedApproval?.status === 'pending').length;

  // ══════════════════════════════════════════════════════════════════
  // AGENCY RISK SCORE — Defensible Composite Formula (0–100)
  // ══════════════════════════════════════════════════════════════════
  const OPI_WEIGHTS = {
    risk: 0.30,
    findings: 0.15,
    audit: 0.20,
    staffing: 0.15,
    equipment: 0.10,
    trend: 0.10,
  };

  const riskSeverityRaw = (criticalCount * 12) + (mediumCount * 5) + (lowCount * 1.5);
  const riskSeverityNorm = Math.min(25, riskSeverityRaw);

  const totalOpenFindings = complianceStandards.reduce((sum, s) => sum + s.openFindings, 0);
  const openFindingsNorm = Math.min(25, totalOpenFindings * 3);

  const auditProximityRaw = upcomingAudits.reduce((sum, a) => {
    const proximityScore = a.daysOut < 30 ? ((30 - a.daysOut) / 30) * 15 : 0;
    const readinessPenalty = ((100 - a.readiness) / 100) * 10;
    return sum + proximityScore + (a.daysOut < 90 ? readinessPenalty : 0);
  }, 0);
  const auditProximityNorm = Math.min(25, auditProximityRaw);

  const authorizedStrength = 170;
  const deployableStrength = 158;
  const staffingDeviation = ((authorizedStrength - deployableStrength) / authorizedStrength) * 100;
  const staffingDeviationNorm = Math.min(25, staffingDeviation * 2.5);

  const equipmentPolicy = policyCompliance.find(p => p.name === 'Equipment Compliance');
  const equipmentRate = equipmentPolicy ? equipmentPolicy.rate : 100;
  const equipmentThreshold = equipmentPolicy ? equipmentPolicy.threshold : 90;
  const equipmentDelta = Math.max(0, equipmentThreshold - equipmentRate);
  const equipmentDeltaNorm = Math.min(25, equipmentDelta * 2);

  const escalatingCount = riskInsights.filter(i => i.direction === 'up').length;
  const improvingCount = riskInsights.filter(i => i.direction === 'down').length;
  const trendTrajectoryNorm = Math.min(25, Math.max(0, (escalatingCount * 8) - (improvingCount * 3)));

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
  const opiColor = opiScore >= 75 ? 'text-red-700 dark:text-red-400' : opiScore >= 50 ? 'text-amber-700 dark:text-amber-400' : 'text-green-600 dark:text-green-400';
  const opiBarColor = opiScore >= 75 ? 'bg-red-500' : opiScore >= 50 ? 'bg-amber-500' : 'bg-green-500';

  const opiBreakdown = [
    { label: 'Risk severity', weight: OPI_WEIGHTS.risk, score: opiComponents.risk, max: 25, detail: `${criticalCount} critical, ${mediumCount} medium`, weighted: Math.round(OPI_WEIGHTS.risk * opiComponents.risk / 25 * 100) },
    { label: 'Open findings', weight: OPI_WEIGHTS.findings, score: opiComponents.findings, max: 25, detail: `${totalOpenFindings} across all standards`, weighted: Math.round(OPI_WEIGHTS.findings * opiComponents.findings / 25 * 100) },
    { label: 'Audit proximity', weight: OPI_WEIGHTS.audit, score: opiComponents.audit, max: 25, detail: `${upcomingAudits.filter(a => a.daysOut < 30).length} imminent + readiness gaps`, weighted: Math.round(OPI_WEIGHTS.audit * opiComponents.audit / 25 * 100) },
    { label: 'Staffing deviation', weight: OPI_WEIGHTS.staffing, score: opiComponents.staffing, max: 25, detail: `${deployableStrength}/${authorizedStrength} deployable`, weighted: Math.round(OPI_WEIGHTS.staffing * opiComponents.staffing / 25 * 100) },
    { label: 'Equipment delta', weight: OPI_WEIGHTS.equipment, score: opiComponents.equipment, max: 25, detail: `${equipmentRate}% vs ${equipmentThreshold}% threshold`, weighted: Math.round(OPI_WEIGHTS.equipment * opiComponents.equipment / 25 * 100) },
    { label: 'Trend trajectory', weight: OPI_WEIGHTS.trend, score: opiComponents.trend, max: 25, detail: `${escalatingCount} escalating, ${improvingCount} improving`, weighted: Math.round(OPI_WEIGHTS.trend * opiComponents.trend / 25 * 100) },
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
    if (readiness < 70 && daysOut < 30) return 'text-red-700 dark:text-red-400';
    if (readiness < 80 && daysOut < 60) return 'text-amber-700 dark:text-amber-400';
    return 'text-green-600 dark:text-green-400';
  };

  const getReadinessWarning = (readiness, daysOut) => {
    if (readiness < 70 && daysOut < 30) return 'AT RISK';
    if (readiness < 80 && daysOut < 60) return 'MONITOR';
    return null;
  };

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
      decision: action,
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
      approved: { bg: 'bg-green-500/10', border: 'border-green-500/20', text: 'text-green-600 dark:text-green-400', label: 'APPROVED', icon: CheckCircle },
      denied: { bg: 'bg-red-500/10', border: 'border-red-500/20', text: 'text-red-700 dark:text-red-400', label: 'DENIED', icon: X },
      escalated: { bg: 'bg-amber-500/10', border: 'border-amber-500/20', text: 'text-amber-700 dark:text-amber-400', label: 'ESCALATED', icon: ArrowRight },
      deferred: { bg: 'bg-slate-100 dark:bg-zinc-800/20', border: 'border-slate-600/20', text: 'text-slate-500', label: 'DEFERRED', icon: Clock },
    };
    return configs[decision] || configs.deferred;
  };

  const getThreatSeverityStyles = (severity) => {
    if (severity === 'critical') return { pill: 'bg-red-100 border-red-200 text-red-700 dark:bg-red-500/10 dark:border-red-500/20 dark:text-red-400', strip: 'bg-red-500', rank: 'bg-red-500' };
    if (severity === 'high') return { pill: 'bg-orange-100 border-orange-200 text-orange-700 dark:bg-orange-500/10 dark:border-orange-500/20 dark:text-orange-400', strip: 'bg-orange-500', rank: 'bg-orange-500' };
    return { pill: 'bg-amber-100 border-amber-200 text-amber-700 dark:bg-amber-500/10 dark:border-amber-500/20 dark:text-amber-400', strip: 'bg-amber-500', rank: 'bg-amber-500' };
  };

  const getHeatColor = (score, trend) => {
    if (score >= 75 || (score >= 65 && trend === 'up')) return { bg: 'bg-red-500/8 border-red-500/20', label: 'text-red-700 dark:text-red-400', bar: 'bg-red-500', badge: 'bg-red-100 border-red-200 text-red-700 dark:bg-red-500/10 dark:border-red-500/20 dark:text-red-400' };
    if (score >= 50 || trend === 'up') return { bg: 'bg-amber-500/6 border-amber-500/15', label: 'text-amber-700 dark:text-amber-400', bar: 'bg-amber-500', badge: 'bg-amber-100 border-amber-200 text-amber-700 dark:bg-amber-500/10 dark:border-amber-500/20 dark:text-amber-400' };
    return { bg: 'bg-green-500/5 border-green-500/15', label: 'text-green-600 dark:text-green-400', bar: 'bg-green-500', badge: 'bg-green-100 border-green-200 text-green-700 dark:bg-green-500/10 dark:border-green-500/20 dark:text-green-400' };
  };

  return (
    <DashboardLayout>
      <div className="p-5 lg:p-7">
        <div className="max-w-[1400px] mx-auto">

          {/* ── Page Header ────────────────────────────────── */}
          <div className="mb-5">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3">
              <div className="min-w-0">
                <h2 className="text-xl font-bold text-primary mb-1">Agency Risk Center</h2>
                <div className="flex items-center gap-2 text-[11px] text-slate-500 flex-wrap">
                  <span>Executive risk management</span>
                  <span className="text-slate-700">&middot;</span>
                  <span>{openRisks.length} open risks</span>
                  {criticalCount > 0 && (
                    <>
                      <span className="text-slate-700">&middot;</span>
                      <span className="text-red-700 dark:text-red-400 font-semibold">{criticalCount} critical</span>
                    </>
                  )}
                  <span className="text-slate-700">&middot;</span>
                  <span className="text-slate-500">{pendingApprovalCount} decisions pending</span>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-wrap flex-shrink-0">
                <span className={`px-2.5 py-1 bg-green-500/8 border border-green-500/15 rounded text-[10px] font-semibold ${overallCompliance >= 90 ? 'text-green-600 dark:text-green-400' : 'text-amber-700 dark:text-amber-400'}`}>
                  {overallCompliance}% Compliant
                </span>
                <button className="flex items-center gap-1.5 px-2.5 py-1 bg-surface border border-slate-300 dark:border-slate-700/50 rounded-lg text-[11px] text-secondary hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 transition-colors">
                  <Download className="w-3 h-3" />
                  Risk Report
                </button>
              </div>
            </div>
          </div>

          {/* ── AI Risk Assessment ─────────────────────────── */}
          <div className="mb-4 bg-slate-900 dark:bg-black border border-slate-700/60 rounded-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-700/50 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-violet-400" />
              <span className="text-[11px] font-bold text-white uppercase tracking-wider">AI Risk Assessment</span>
              <span className="ml-auto px-2 py-px bg-violet-500/20 border border-violet-500/30 rounded text-[9px] font-bold text-violet-300 uppercase">Generated Today</span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-slate-700/30">
              {/* Key Threats */}
              <div className="px-4 py-3 bg-slate-900 dark:bg-black">
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-2.5">Key Threats</p>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1 flex-shrink-0" />
                    <p className="text-[11px] text-slate-200 leading-snug">Body camera EOL Dec 31 — 142 active cases with evidence integrity exposure. $125K approval pending.</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1 flex-shrink-0" />
                    <p className="text-[11px] text-slate-200 leading-snug">HVAC 84°F in H2-Pod — USMS inspection in 4 days. Federal contract ($1.2M/yr) at risk if uncorrected.</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1 flex-shrink-0" />
                    <p className="text-[11px] text-slate-300 leading-snug">ACA re-accreditation 62% ready with 72 days remaining. Conditional status likely without intervention.</p>
                  </div>
                </div>
              </div>
              {/* Financial Exposure */}
              <div className="px-4 py-3 bg-slate-900 dark:bg-black">
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-2.5">Financial Exposure</p>
                <div className="space-y-1.5">
                  {[
                    { label: 'Federal housing contract at risk', amount: '$1.2M/yr', color: 'text-red-400' },
                    { label: 'Body camera replacement (pending)', amount: '$125K', color: 'text-red-400' },
                    { label: 'Training budget (pending)', amount: '$43K', color: 'text-amber-400' },
                    { label: 'Civil liability exposure (UOF)', amount: 'Unquantified', color: 'text-amber-400' },
                    { label: 'If all approved — resolved in 30d', amount: '$168K total', color: 'text-green-400' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <span className="text-[10px] text-slate-400">{item.label}</span>
                      <span className={`text-[10px] font-bold font-mono ${item.color}`}>{item.amount}</span>
                    </div>
                  ))}
                </div>
              </div>
              {/* Staffing & Accreditation + Trend */}
              <div className="px-4 py-3 bg-slate-900 dark:bg-black">
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-2.5">Staffing & Accreditation</p>
                <div className="space-y-1.5 mb-3">
                  <div className="flex justify-between text-[10px]">
                    <span className="text-slate-400">Deployable strength</span>
                    <span className="text-slate-200 font-semibold">158 / 170 (93%)</span>
                  </div>
                  <div className="flex justify-between text-[10px]">
                    <span className="text-slate-400">Certs expiring Jan 31</span>
                    <span className="text-amber-400 font-semibold">2 deputies</span>
                  </div>
                  <div className="flex justify-between text-[10px]">
                    <span className="text-slate-400">ACA readiness</span>
                    <span className="text-amber-400 font-semibold">62% — 72d out</span>
                  </div>
                  <div className="flex justify-between text-[10px]">
                    <span className="text-slate-400">Open audit findings</span>
                    <span className="text-amber-400 font-semibold">4 across 2 standards</span>
                  </div>
                </div>
                <div className="pt-2 border-t border-slate-700/50">
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Trend Direction</p>
                  <div className="flex items-center gap-3 flex-wrap">
                    <div className="flex items-center gap-1 text-[10px] text-red-400">
                      <TrendingUp className="w-3 h-3" />
                      <span>Equipment ↑16%</span>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] text-green-400">
                      <TrendingDown className="w-3 h-3" />
                      <span>Training ↓40%</span>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] text-slate-400">
                      <span>Policy →</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── AI Operations Advisor (moved from War Room) ── */}
          <div className="mb-4 bg-slate-900 dark:bg-black border border-slate-700/60 rounded-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-700/50 flex items-center gap-2">
              <Zap className="w-3.5 h-3.5 text-violet-400" />
              <span className="text-[11px] font-bold text-white uppercase tracking-wider">AI Operations Advisor</span>
              <span className="ml-auto px-2 py-px bg-violet-500/20 border border-violet-500/30 rounded text-[9px] font-bold text-violet-300 uppercase">Live Recommendations</span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-slate-700/30">
              {/* Recommended actions */}
              <div className="px-4 py-3 bg-slate-900 dark:bg-black">
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-2.5">Recommended Actions</p>
                <div className="space-y-1.5">
                  {[
                    { label: 'Divert Alpha-12 to Beat 7', impact: 'Eliminates coverage gap in <8 min', urgency: 'now' },
                    { label: 'Contact Training re Rivera cert', impact: 'Prevents forced restricted duty', urgency: 'today' },
                    { label: 'Activate Bravo overtime roster', impact: 'Restores 92% div. capacity', urgency: 'today' },
                  ].map((a, i) => (
                    <div key={i} className={`flex items-start gap-2 rounded-lg p-2 border ${a.urgency === 'now' ? 'bg-red-500/10 border-red-500/25' : 'bg-slate-800/40 dark:bg-zinc-900/40 border-slate-700/40'}`}>
                      <ArrowRight className={`w-3 h-3 mt-0.5 flex-shrink-0 ${a.urgency === 'now' ? 'text-red-400' : 'text-slate-400'}`} />
                      <div className="min-w-0">
                        <p className="text-[11px] font-medium text-slate-200">{a.label}</p>
                        <p className="text-[10px] text-slate-400">{a.impact}</p>
                      </div>
                      <span className={`ml-auto text-[9px] uppercase tracking-wide flex-shrink-0 font-bold mt-0.5 ${a.urgency === 'now' ? 'text-red-400' : 'text-slate-500'}`}>{a.urgency}</span>
                    </div>
                  ))}
                </div>
              </div>
              {/* Staffing recommendations */}
              <div className="px-4 py-3 bg-slate-900 dark:bg-black">
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-2.5">Staffing Recommendations</p>
                <div className="space-y-1.5">
                  {[
                    'Offer voluntary OT to Bravo off-duty pool (6 vacancies)',
                    'Convert 2 Admin deputies to Patrol field coverage through EOW',
                    'Request mutual aid reciprocal unit from Northside PD',
                  ].map((rec, i) => (
                    <div key={i} className="flex gap-2 items-start">
                      <CheckCircle className="w-3 h-3 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <p className="text-[11px] text-slate-300 leading-snug">{rec}</p>
                    </div>
                  ))}
                </div>
              </div>
              {/* Estimated impact */}
              <div className="px-4 py-3 bg-slate-900 dark:bg-black">
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-2.5">Estimated Operational Impact</p>
                <div className="flex items-center justify-between text-[11px] text-slate-300">
                  <span>If top 3 actions taken:</span>
                  <span className="text-emerald-400 font-semibold">+11% shift health</span>
                </div>
                <div className="mt-1.5 w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400" style={{ width: '91%' }} />
                </div>
                <div className="flex justify-between text-[9px] text-slate-500 mt-1">
                  <span>Current: 91%</span>
                  <span>Projected: ~100%</span>
                </div>
              </div>
            </div>
          </div>

          {/* ── Row: Agency Risk Score + Heat Map ────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-3 mb-4">

            {/* Agency Risk Score */}
            <div className="lg:col-span-2 bg-white dark:bg-zinc-900/35 border border-border dark:border-slate-700/30 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <Gauge className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />
                <span className="text-[12px] font-bold text-primary">Agency Risk Score</span>
                <span className="text-[10px] text-slate-500 ml-1">Composite index (0–100)</span>
              </div>

              <div className="flex items-center gap-5 mb-4">
                <div className="text-center">
                  <div className={`text-5xl font-black ${opiColor} leading-none`}>{opiScore}</div>
                  <div className="text-[10px] text-slate-500 mt-1">/ 100</div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className={`px-2 py-px border rounded text-[10px] font-bold uppercase ${
                      opiScore >= 75 ? 'bg-red-100 border-red-200 text-red-700 dark:bg-red-500/10 dark:border-red-500/20 dark:text-red-400' :
                      opiScore >= 50 ? 'bg-amber-100 border-amber-200 text-amber-700 dark:bg-amber-500/10 dark:border-amber-500/20 dark:text-amber-400' :
                      'bg-green-100 border-green-200 text-green-700 dark:bg-green-500/10 dark:border-green-500/20 dark:text-green-400'
                    }`}>{opiLevel} Risk</span>
                    <span className="text-[10px] text-slate-500">{opiScore < 25 ? 'Low' : opiScore < 50 ? 'Moderate' : opiScore < 75 ? 'High' : 'Critical'}</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-zinc-800/50 rounded-full h-2.5 mb-1">
                    <div className={`h-2.5 rounded-full transition-all ${opiBarColor}`} style={{ width: `${opiScore}%` }} />
                  </div>
                  <div className="flex justify-between text-[9px] text-slate-500">
                    <span>Low</span><span>Moderate</span><span>High</span><span>Critical</span>
                  </div>
                </div>
              </div>

              <div className="space-y-1 border-t border-border dark:border-slate-700/30 pt-3">
                {opiBreakdown.filter(b => b.score > 0).map((b, i) => (
                  <div key={i} className="flex items-center gap-2 text-[10px]">
                    <span className="text-slate-500 font-mono w-7">{(b.weight * 100).toFixed(0)}%</span>
                    <span className="flex-1 text-secondary">{b.label}</span>
                    <span className="text-slate-500 text-[9px]">{b.detail}</span>
                    <span className={`font-mono font-bold w-6 text-right ${b.weighted > 8 ? 'text-red-700 dark:text-red-400' : b.weighted > 4 ? 'text-amber-700 dark:text-amber-400' : 'text-slate-500'}`}>+{b.weighted}</span>
                  </div>
                ))}
                <div className="flex items-center gap-2 text-[10px] pt-1 border-t border-border dark:border-slate-700/30">
                  <span className="text-slate-500 font-mono w-7">Σ</span>
                  <span className="flex-1 font-semibold text-primary">Composite Score</span>
                  <span className={`font-mono font-black text-sm ${opiColor}`}>{opiScore}</span>
                </div>
              </div>
            </div>

            {/* Risk Heat Map */}
            <div className="lg:col-span-3 bg-white dark:bg-zinc-900/35 border border-border dark:border-slate-700/30 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <BarChart2 className="w-3.5 h-3.5 text-secondary" />
                <span className="text-[12px] font-bold text-primary">Risk Heat Map by Category</span>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
                {riskCategories.map((cat) => {
                  const heat = getHeatColor(cat.score, cat.trend);
                  const CatIcon = cat.icon;
                  return (
                    <div key={cat.id} className={`rounded-lg border p-2.5 ${heat.bg}`}>
                      <div className="flex items-center justify-between gap-1 mb-1.5">
                        <div className="flex items-center gap-1.5 min-w-0">
                          <CatIcon className={`w-3 h-3 flex-shrink-0 ${heat.label}`} />
                          <span className="text-[10px] font-bold text-primary break-words min-w-0">{cat.label}</span>
                        </div>
                        <span className={`px-1 py-px rounded border text-[9px] font-bold flex-shrink-0 ${heat.badge}`}>
                          {cat.score}
                        </span>
                      </div>
                      <div className="w-full bg-slate-200 dark:bg-zinc-800/50 rounded-full h-1 mb-1.5">
                        <div className={`h-1 rounded-full ${heat.bar}`} style={{ width: `${cat.score}%` }} />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] text-slate-500">{cat.detail}</span>
                        <span className={`text-[9px] font-bold ${cat.trend === 'up' ? 'text-red-700 dark:text-red-400' : cat.trend === 'down' ? 'text-green-600 dark:text-green-400' : 'text-slate-500'}`}>
                          {cat.trend === 'up' ? '↑' : cat.trend === 'down' ? '↓' : '→'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ── Top 5 Agency Threats ────────────────────────── */}
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2 px-1">
              <Flame className="w-3.5 h-3.5 text-red-700 dark:text-red-400" />
              <span className="text-[12px] font-bold text-slate-900 dark:text-primary">Top 5 Agency Threats</span>
              <span className="text-[10px] text-slate-500 ml-1">With projected exposure and AI mitigation recommendations</span>
            </div>
            <div className="space-y-2">
              {topThreats.map((threat) => {
                const styles = getThreatSeverityStyles(threat.severity);
                return (
                  <div key={threat.rank} className="bg-white dark:bg-zinc-900/20 border border-border dark:border-slate-700/30 rounded-xl overflow-hidden">
                    <div className="flex items-start gap-3 p-3">
                      {/* Rank badge */}
                      <div className={`w-6 h-6 ${styles.rank} rounded-full flex items-center justify-center flex-shrink-0 mt-0.5`}>
                        <span className="text-[10px] font-black text-white">{threat.rank}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className="text-[13px] font-bold text-primary break-words min-w-0">{threat.title}</span>
                          <span className={`px-1.5 py-px border rounded text-[9px] font-bold uppercase flex-shrink-0 ${styles.pill}`}>{threat.severity}</span>
                          <span className="text-[9px] text-slate-500 px-1.5 py-px bg-slate-100 dark:bg-zinc-800/30 rounded border border-slate-200 dark:border-slate-700/40 flex-shrink-0">{threat.category}</span>
                          <span className={`text-[10px] font-bold sm:ml-auto flex-shrink-0 ${threat.trend === 'up' ? 'text-red-700 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>
                            {threat.trend === 'up' ? '↑ Escalating' : '→ Stable'} · {threat.daysLeft}d left
                          </span>
                        </div>

                        {/* Exposure grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-2">
                          <div className="bg-red-500/5 border border-red-500/10 rounded p-1.5">
                            <p className="text-[9px] font-bold text-red-700 dark:text-red-400 uppercase mb-0.5">Financial</p>
                            <p className="text-[10px] text-secondary">{threat.financialExposure}</p>
                          </div>
                          <div className="bg-amber-500/5 border border-amber-500/10 rounded p-1.5">
                            <p className="text-[9px] font-bold text-amber-700 dark:text-amber-400 uppercase mb-0.5">Staffing</p>
                            <p className="text-[10px] text-secondary">{threat.staffingExposure}</p>
                          </div>
                          <div className="bg-slate-100 dark:bg-zinc-800/20 border border-slate-200 dark:border-slate-700/30 rounded p-1.5">
                            <p className="text-[9px] font-bold text-slate-500 uppercase mb-0.5">Accreditation</p>
                            <p className="text-[10px] text-secondary">{threat.accreditationExposure}</p>
                          </div>
                        </div>

                        {/* AI Recommendation */}
                        <div className="flex items-start gap-1.5 bg-slate-50 dark:bg-zinc-950/40 border border-slate-200 dark:border-slate-700/30 rounded px-2.5 py-1.5">
                          <Sparkles className="w-3 h-3 text-violet-500 dark:text-violet-400 flex-shrink-0 mt-0.5" />
                          <p className="text-[10px] text-secondary leading-snug">{threat.aiRec}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── 30-Day Cascade Projection ───────────────────── */}
          <div className="border border-red-500/15 rounded-xl overflow-hidden mb-4">
            <div className="px-3 py-2.5 bg-red-500/[0.03] border-b border-red-500/10">
              <div className="flex items-center gap-2">
                <Zap className="w-3.5 h-3.5 text-red-700 dark:text-red-400" />
                <span className="text-[12px] font-bold text-primary">30-Day Cascade Projection</span>
                <span className="px-1.5 py-px bg-red-500/10 border border-red-500/20 rounded text-[9px] font-bold text-red-700 dark:text-red-400 uppercase">If Unresolved</span>
              </div>
              <p className="text-[10px] text-slate-500 mt-0.5 ml-[22px]">Projected system state if POST, Training, and Equipment issues remain unresolved through Jan 8, 2025</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-px bg-slate-50 dark:bg-zinc-900/10">
              {[
                { label: 'Overall Compliance', current: '94.7%', projected: '89.2%', direction: 'down', severity: 'critical' },
                { label: 'Insurance Risk Score', current: 'Moderate', projected: 'High', direction: 'up', severity: 'critical' },
                { label: 'Federal Funding Risk', current: 'Low', projected: 'Elevated', direction: 'up', severity: 'warning' },
                { label: 'Agency Risk Status', current: 'Amber', projected: 'Red', direction: 'up', severity: 'critical' },
                { label: 'Budget Reallocation', current: '$0', projected: '$168K', direction: 'up', severity: 'warning' },
              ].map((metric, idx) => (
                <div key={idx} className="px-3 py-2.5 bg-slate-50 dark:bg-zinc-950/30">
                  <p className="text-[9px] font-semibold text-slate-500 uppercase tracking-wider mb-1">{metric.label}</p>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] text-slate-500 line-through">{metric.current}</span>
                    <span className="text-[10px] text-slate-700">→</span>
                    <span className={`text-[11px] font-bold ${metric.severity === 'critical' ? 'text-red-700 dark:text-red-400' : 'text-amber-700 dark:text-amber-400'}`}>{metric.projected}</span>
                    {metric.direction === 'down'
                      ? <TrendingDown className="w-2.5 h-2.5 text-red-700 dark:text-red-400" />
                      : <TrendingUp className="w-2.5 h-2.5 text-red-700 dark:text-red-400" />
                    }
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-slate-50 dark:bg-zinc-900/10">
              <div className="px-3 py-2.5 bg-slate-100 dark:bg-zinc-950/20">
                <p className="text-[10px] font-bold text-red-700 dark:text-red-400 mb-1.5">POST Certification Cascade</p>
                <div className="space-y-1">
                  <p className="text-[10px] text-secondary">Trigger: 2 certifications expire Jan 31</p>
                  <p className="text-[10px] text-red-700 dark:text-red-400/80 pl-1.5">→ Uncertified deputies: 14 of 170</p>
                  <p className="text-[10px] text-red-700 dark:text-red-400/80 pl-3">→ Staffing projection: 97% → 93.5%</p>
                  <p className="text-[10px] text-red-700 dark:text-red-400/80 pl-4.5">→ Shift coverage: 3 below minimum staffing</p>
                  <p className="text-[10px] text-red-700 dark:text-red-400/80 pl-6">→ POST inspection exposure: documented finding</p>
                </div>
              </div>
              <div className="px-3 py-2.5 bg-slate-100 dark:bg-zinc-950/20">
                <p className="text-[10px] font-bold text-red-700 dark:text-red-400 mb-1.5">Equipment Compliance Cascade</p>
                <div className="space-y-1">
                  <p className="text-[10px] text-secondary">Trigger: 68 body cams EOL Dec 31 + 9 fleet overdue</p>
                  <p className="text-[10px] text-red-700 dark:text-red-400/80 pl-1.5">→ Equipment compliance projection: 86% → 72%</p>
                  <p className="text-[10px] text-red-700 dark:text-red-400/80 pl-3">→ Evidence integrity: 142 active cases affected</p>
                  <p className="text-[10px] text-red-700 dark:text-red-400/80 pl-4.5">→ Civil liability exposure: unrecorded UOF incidents</p>
                  <p className="text-[10px] text-red-700 dark:text-red-400/80 pl-6">→ Insurance carrier action: agency flagged</p>
                </div>
              </div>
              <div className="px-3 py-2.5 bg-slate-100 dark:bg-zinc-950/20">
                <p className="text-[10px] font-bold text-amber-700 dark:text-amber-400 mb-1.5">ACA Accreditation Cascade</p>
                <div className="space-y-1">
                  <p className="text-[10px] text-secondary">Trigger: Readiness 62%, 2 documentation findings open</p>
                  <p className="text-[10px] text-amber-700 dark:text-amber-400/80 pl-1.5">→ Feb 18 audit readiness projection: below 50%</p>
                  <p className="text-[10px] text-amber-700 dark:text-amber-400/80 pl-3">→ Re-accreditation outcome: conditional status</p>
                  <p className="text-[10px] text-amber-700 dark:text-amber-400/80 pl-4.5">→ Federal housing contract: under review</p>
                  <p className="text-[10px] text-amber-700 dark:text-amber-400/80 pl-6">→ USMS revenue exposure: $1.2M/yr</p>
                </div>
              </div>
            </div>

            <div className="px-3 py-2.5 bg-white dark:bg-zinc-950/40 border-t border-red-500/10">
              <p className="text-[10px] font-bold text-primary mb-1.5">Cross-System Ripple</p>
              <div className="grid grid-cols-2 lg:grid-cols-5 gap-2">
                {[
                  { system: 'Command Alerts', action: '3 critical alerts auto-generated', color: 'red' },
                  { system: 'Approvals', action: '2 emergency approvals auto-created', color: 'amber' },
                  { system: 'Exec Briefing', action: 'Risk headline status: RED', color: 'red' },
                  { system: 'Staffing', action: 'Readiness projection: below 94%', color: 'amber' },
                  { system: 'Budget', action: 'Reallocation recommendation: $168K', color: 'amber' },
                ].map((ripple, idx) => (
                  <div key={idx} className={`px-2 py-1.5 rounded border ${ripple.color === 'red' ? 'bg-red-500/[0.03] border-red-500/15' : 'bg-amber-500/[0.02] border-amber-500/15'}`}>
                    <p className={`text-[9px] font-bold uppercase ${ripple.color === 'red' ? 'text-red-700 dark:text-red-400' : 'text-amber-700 dark:text-amber-400'}`}>{ripple.system}</p>
                    <p className="text-[10px] text-secondary mt-0.5">{ripple.action}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Open Risk Items + Right Column ─────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 mb-4">
            {/* Open Risk Items — 2/3 width */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-2 px-1 flex-wrap">
                <AlertTriangle className="w-3.5 h-3.5 text-red-700 dark:text-red-400" />
                <span className="text-[12px] font-bold text-slate-900 dark:text-primary">Open Risk Items</span>
                <span className="px-1.5 py-px bg-red-500/10 border border-red-500/20 rounded text-[10px] font-bold text-red-700 dark:text-red-400">{openRisks.length}</span>
                <div className="hidden sm:block flex-1" />
                <div className="flex items-center gap-1 flex-wrap">
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
                          ? 'bg-slate-200 dark:bg-zinc-800/50 border-slate-300 dark:border-slate-600/50 text-primary'
                          : 'bg-transparent border-slate-300 dark:border-slate-700/40 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                      }`}
                    >
                      {opt.label} <span className={riskFilter === opt.id ? 'text-slate-500' : 'text-slate-700'}>{opt.count}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-px">
                {filteredRisks.map((risk) => {
                  const isExpanded = expandedRisks.includes(risk.id);
                  return (
                    <div key={risk.id} className="rounded border border-border dark:border-slate-700/30 bg-white dark:bg-zinc-900/15 hover:bg-slate-50 dark:hover:bg-zinc-900/30 transition-colors">
                      <div className="flex items-center gap-2.5 px-3.5 py-[9px] flex-wrap sm:flex-nowrap">
                        <div className={`w-[4px] self-stretch rounded-full flex-shrink-0 ${risk.severity === 'critical' ? 'bg-red-500' : risk.severity === 'medium' ? 'bg-amber-500' : 'bg-slate-500'}`}></div>
                        <span className={`px-1.5 py-px border rounded text-[10px] font-bold flex-shrink-0 uppercase leading-tight ${
                          risk.severity === 'critical' ? 'bg-red-100 border-red-200 text-red-700 dark:bg-red-500/10 dark:border-red-500/20 dark:text-red-400' :
                          risk.severity === 'medium' ? 'bg-amber-100 border-amber-200 text-amber-700 dark:bg-amber-500/10 dark:border-amber-500/20 dark:text-amber-400' :
                          'bg-slate-400/10 border-slate-400/20 text-slate-500'
                        }`}>{risk.severity}</span>
                        <span className="hidden md:flex items-center gap-1 flex-shrink-0">
                          {risk.impactTags.slice(0, 2).map((tag, i) => (
                            <span key={i} className={`px-1 py-px rounded text-[9px] font-semibold border ${
                              tag.includes('Liability') || tag.includes('Safety') ? 'bg-red-500/8 border-red-500/15 text-red-700 dark:text-red-400/90' :
                              tag.includes('Compliance') || tag.includes('Integrity') ? 'bg-amber-500/8 border-amber-500/15 text-amber-700 dark:text-amber-400/90' :
                              'bg-slate-100 dark:bg-zinc-800/30 border-slate-700/40 text-slate-500'
                            }`}>{tag}</span>
                          ))}
                        </span>
                        <span className="text-[13px] font-bold flex-1 min-w-0 basis-full sm:basis-auto break-words text-primary order-first sm:order-none w-full sm:w-auto">{risk.title}</span>
                        <span className={`text-[9px] font-bold flex-shrink-0 ${risk.trend === 'up' ? 'text-red-700 dark:text-red-400' : 'text-slate-500'}`}>
                          {risk.trend === 'up' ? '↑' : '→'}
                        </span>
                        <span className={`px-1.5 py-px border rounded text-[10px] font-bold flex-shrink-0 ${
                          risk.dueUrgency === 'critical' ? 'bg-red-100 border-red-200 text-red-700 dark:bg-red-500/10 dark:border-red-500/20 dark:text-red-400' :
                          risk.dueUrgency === 'soon' ? 'bg-amber-500/8 border-amber-500/15 text-amber-700 dark:text-amber-400' :
                          'bg-slate-100 dark:bg-zinc-800/30 border-slate-700/40 text-slate-500'
                        }`}>{risk.daysLeft}d left</span>
                        {risk.linkedApproval && (
                          <span className={`hidden md:inline-flex items-center gap-1 px-1.5 py-px rounded text-[10px] font-semibold flex-shrink-0 ${
                            risk.linkedApproval.status === 'approved' ? 'text-green-600 dark:text-green-400/80' : 'text-amber-700 dark:text-amber-400/80'
                          }`}>
                            <Link2 className="w-2.5 h-2.5" />
                            {risk.linkedApproval.status === 'pending' ? 'Approval pending' : 'Approved'}
                          </span>
                        )}
                        <button onClick={() => toggleRiskExpand(risk.id)} className="p-1 rounded hover:bg-slate-100 dark:hover:bg-zinc-800/30 transition-colors flex-shrink-0">
                          {isExpanded ? <ChevronUp className="w-3.5 h-3.5 text-slate-500" /> : <ChevronDown className="w-3.5 h-3.5 text-slate-500" />}
                        </button>
                      </div>

                      {isExpanded && (
                        <div className="px-3.5 pb-3 pt-1 ml-[26px] space-y-2">
                          <p className="text-[11px] text-secondary">{risk.description}</p>
                          <div className="flex items-center gap-3 text-[10px] text-secondary flex-wrap">
                            <span>Owner: <span className="text-primary font-medium">{risk.owner}</span></span>
                            <span className="text-slate-700">&middot;</span>
                            <span>Due: <span className="text-primary font-medium">{risk.due}</span></span>
                          </div>
                          <div className="bg-slate-50 dark:bg-zinc-950/30 rounded border border-border dark:border-slate-700/30 px-2.5 py-1.5">
                            <p className="text-[10px] text-slate-500 font-semibold mb-0.5">Status</p>
                            <p className="text-[11px] text-secondary">{risk.status}</p>
                          </div>
                          {risk.auditImpact && (
                            <div className="flex items-center gap-2 text-[10px] text-amber-700 dark:text-amber-400">
                              <AlertTriangle className="w-3 h-3 flex-shrink-0" />
                              <span>Audit impact: {risk.auditImpact}</span>
                            </div>
                          )}
                          {risk.ifUnresolved && (
                            <div className="bg-red-500/[0.02] border border-red-500/10 rounded p-2">
                              <p className="text-[10px] text-red-700 dark:text-red-400 font-bold mb-1">IF UNRESOLVED:</p>
                              {risk.ifUnresolved.map((consequence, i) => (
                                <p key={i} className="text-[10px] text-red-700 dark:text-red-400/80 pl-2">→ {consequence}</p>
                              ))}
                            </div>
                          )}
                          {risk.linkedApproval && (() => {
                            const isLogged = actionLog.some(l => l.approvalId === risk.linkedApproval.id);
                            const logEntry = actionLog.find(l => l.approvalId === risk.linkedApproval.id);
                            const displayStatus = isLogged ? logEntry.decision : risk.linkedApproval.status;
                            const statusCfg = isLogged ? getDecisionConfig(logEntry.decision) : null;
                            return (
                              <div
                                className={`flex items-center gap-2 flex-wrap px-2.5 py-1.5 rounded border text-[10px] ${
                                  isLogged ? `${statusCfg.bg} ${statusCfg.border}` :
                                  risk.linkedApproval.status === 'approved' ? 'bg-green-500/[0.03] border-green-500/15 text-green-600 dark:text-green-400' :
                                  'bg-amber-500/[0.03] border-amber-500/15 text-amber-700 dark:text-amber-400 cursor-pointer hover:bg-amber-500/[0.06]'
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
                                <span className="text-primary">{risk.linkedApproval.title}</span>
                                <span className="font-mono">${risk.linkedApproval.amount.toLocaleString()}</span>
                                <span className="text-slate-700">&mdash;</span>
                                <span className={`font-bold uppercase ${isLogged ? statusCfg.text : risk.linkedApproval.status === 'approved' ? 'text-green-600 dark:text-green-400' : 'text-amber-700 dark:text-amber-400'}`}>
                                  {displayStatus}
                                </span>
                                {isLogged && logEntry && <span className="text-[9px] text-slate-700 font-mono ml-1">{logEntry.displayTime}</span>}
                                {!isLogged && risk.linkedApproval.status === 'pending' && <span className="text-[9px] text-amber-700 dark:text-amber-400/70 ml-1">→ Click to decide</span>}
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

            {/* Right column: Upcoming Audits + Policy Compliance */}
            <div className="space-y-3">
              {/* Upcoming Audits */}
              <div>
                <div className="flex items-center gap-2 mb-2 px-1">
                  <Calendar className="w-3.5 h-3.5 text-secondary" />
                  <span className="text-[12px] font-bold text-slate-900 dark:text-primary">Upcoming Audits</span>
                </div>
                <div className="space-y-1.5">
                  {upcomingAudits.map((audit) => {
                    const warning = getReadinessWarning(audit.readiness, audit.daysOut);
                    return (
                      <div key={audit.id} className="bg-white dark:bg-zinc-900/15 border border-border dark:border-slate-700/30 rounded-lg p-2.5">
                        <div className="flex items-start justify-between mb-1">
                          <div>
                            <p className="text-[11px] font-bold text-primary">{audit.agency}</p>
                            <p className="text-[10px] text-slate-500">{audit.scope}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-[10px] font-semibold text-slate-500">{audit.date}</p>
                            <p className="text-[9px] text-slate-700">{audit.daysOut}d out</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-slate-200 dark:bg-zinc-800/50 rounded-full h-1">
                            <div className={`h-1 rounded-full ${getReadinessColor(audit.readiness, audit.daysOut).includes('red') ? 'bg-red-500' : getReadinessColor(audit.readiness, audit.daysOut).includes('amber') ? 'bg-amber-500' : 'bg-green-500'}`} style={{ width: `${audit.readiness}%` }} />
                          </div>
                          <span className={`text-[10px] font-bold ${getReadinessColor(audit.readiness, audit.daysOut)}`}>{audit.readiness}%</span>
                          {warning && (
                            <span className={`px-1 py-px rounded text-[9px] font-bold border ${warning === 'AT RISK' ? 'bg-red-100 border-red-200 text-red-700 dark:bg-red-500/10 dark:border-red-500/20 dark:text-red-400' : 'bg-amber-100 border-amber-200 text-amber-700 dark:bg-amber-500/10 dark:border-amber-500/20 dark:text-amber-400'}`}>{warning}</span>
                          )}
                        </div>
                        <p className="text-[9px] text-slate-500 mt-1">Lead: {audit.lead}{audit.risks > 0 ? ` · ${audit.risks} linked risk` : ''}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Policy Compliance */}
              <div>
                <div className="flex items-center gap-2 mb-2 px-1">
                  <FileText className="w-3.5 h-3.5 text-secondary" />
                  <span className="text-[12px] font-bold text-slate-900 dark:text-primary">Policy Compliance</span>
                </div>
                <div className="space-y-1.5">
                  {policyCompliance.map((policy, idx) => {
                    const breached = policy.rate < policy.threshold;
                    return (
                      <div key={idx} className={`bg-white dark:bg-zinc-900/15 border rounded-lg p-2.5 ${breached ? 'border-red-500/20' : 'border-border dark:border-slate-700/30'}`}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[11px] font-bold text-primary">{policy.name}</span>
                          <div className="flex items-center gap-1.5">
                            <span className={`text-[12px] font-bold ${policy.rate >= policy.threshold ? 'text-green-600 dark:text-green-400' : policy.rate >= policy.threshold - 5 ? 'text-amber-700 dark:text-amber-400' : 'text-red-700 dark:text-red-400'}`}>{policy.rate}%</span>
                            <span className={`text-[10px] font-bold ${policy.trend === 'down' ? 'text-red-700 dark:text-red-400' : policy.trend === 'up' ? 'text-green-600 dark:text-green-400' : 'text-slate-500'}`}>
                              {policy.trend === 'down' ? '↓' : policy.trend === 'up' ? '↑' : '→'}
                            </span>
                          </div>
                        </div>
                        <div className="w-full bg-slate-200 dark:bg-zinc-800/50 rounded-full h-1 mb-1">
                          <div className={`h-1 rounded-full ${policy.rate >= policy.threshold ? 'bg-green-500' : policy.rate >= policy.threshold - 5 ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${policy.rate}%` }} />
                        </div>
                        <p className="text-[9px] text-slate-500">{policy.detail}</p>
                        {policy.warning && <p className="text-[9px] text-amber-700 dark:text-amber-400 mt-0.5">{policy.warning}</p>}
                        {breached && policy.operationalImpact && <p className="text-[9px] text-red-700 dark:text-red-400 mt-0.5">{policy.operationalImpact}</p>}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* ── ACTION REQUIRED Workflow ─────────────────────── */}
          <div className="border border-amber-500/20 rounded-xl overflow-hidden mb-4">
            <div className="bg-gradient-to-r from-amber-500/[0.04] via-amber-500/[0.02] to-transparent px-4 py-3">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-5 h-5 bg-amber-500/20 rounded flex items-center justify-center">
                  <FileSignature className="w-3 h-3 text-amber-700 dark:text-amber-400" />
                </div>
                <span className="text-[11px] font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider">Action Required — {pendingActions.length} Pending Decisions</span>
                <span className="text-[10px] text-slate-500 ml-1">${pendingActions.reduce((s, a) => s + a.amount, 0).toLocaleString()} total</span>
              </div>

              {pendingActions.length > 0 ? (
                <div className="space-y-2">
                  {pendingActions.map(action => {
                    const isLogged = actionLog.some(l => l.approvalId === action.approvalId);
                    const logEntry = actionLog.find(l => l.approvalId === action.approvalId);
                    const decisionConfig = logEntry ? getDecisionConfig(logEntry.decision) : null;
                    return (
                      <div key={action.approvalId} className={`flex flex-col sm:flex-row sm:items-center gap-3 px-3 py-2.5 rounded-lg border transition-all ${isLogged ? `${decisionConfig.bg} ${decisionConfig.border}` : 'bg-white dark:bg-zinc-950/40 border-amber-500/15 hover:border-amber-500/30'}`}>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                            <span className={`px-1.5 py-px rounded text-[9px] font-bold border flex-shrink-0 ${action.severity === 'critical' ? 'bg-red-100 border-red-200 text-red-700 dark:bg-red-500/10 dark:border-red-500/20 dark:text-red-400' : 'bg-amber-100 border-amber-200 text-amber-700 dark:bg-amber-500/10 dark:border-amber-500/20 dark:text-amber-400'}`}>{action.severity.toUpperCase()}</span>
                            <span className="text-[11px] font-semibold text-primary break-words min-w-0">{action.title}</span>
                            <span className="text-[10px] font-mono text-secondary flex-shrink-0">${action.amount.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center gap-2 text-[10px] text-slate-500 flex-wrap">
                            <span>Risk: {action.riskTitle}</span>
                            <span className="text-slate-700">&middot;</span>
                            <span>{action.daysLeft}d remaining</span>
                            <span className="text-slate-700">&middot;</span>
                            <span>{action.cascadeCount} cascade consequences</span>
                          </div>
                        </div>
                        {isLogged ? (
                          <div className="flex items-center gap-2 flex-wrap flex-shrink-0">
                            <div className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded ${decisionConfig.bg} ${decisionConfig.border} border`}>
                              <decisionConfig.icon className={`w-3 h-3 ${decisionConfig.text}`} />
                              <span className={`text-[10px] font-bold ${decisionConfig.text}`}>{decisionConfig.label}</span>
                            </div>
                            <span className="text-[9px] text-slate-700">{logEntry.displayTime}</span>
                          </div>
                        ) : (
                          <button
                            onClick={() => setApprovalModal(action)}
                            className="flex items-center justify-center gap-1.5 px-3 py-2 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/30 hover:border-amber-500/50 text-amber-700 dark:text-amber-400 rounded-lg text-[11px] font-bold transition-all flex-shrink-0 w-full sm:w-auto"
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
                  <CheckCircle className="w-3.5 h-3.5 text-green-600 dark:text-green-400" />
                  <p className="text-[10px] text-green-600 dark:text-green-400 font-semibold">All pending approvals resolved. Projected compliance: 96.1% — GREEN status.</p>
                </div>
              )}

              {actionLog.length > 0 && (
                <div className="mt-3 pt-3 border-t border-border">
                  <div className="flex items-center gap-2 mb-2">
                    <History className="w-3 h-3 text-slate-500" />
                    <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Decision Log</span>
                    <span className="text-[9px] text-slate-700">{actionLog.length} entries</span>
                  </div>
                  <div className="space-y-1">
                    {actionLog.slice(0, 5).map(entry => {
                      const cfg = getDecisionConfig(entry.decision);
                      return (
                        <div key={entry.id} className="flex items-center gap-2 flex-wrap text-[10px] px-2 py-1.5 rounded bg-slate-50 dark:bg-zinc-950/30">
                          <cfg.icon className={`w-3 h-3 flex-shrink-0 ${cfg.text}`} />
                          <span className={`font-bold ${cfg.text} w-[72px] flex-shrink-0`}>{cfg.label}</span>
                          <span className="text-primary font-medium flex-1 min-w-[100px] truncate">{entry.approvalTitle}</span>
                          <span className="text-slate-500 font-mono flex-shrink-0">${entry.amount.toLocaleString()}</span>
                          <span className="text-slate-700 flex-shrink-0">{entry.actor}</span>
                          <span className="text-slate-700 font-mono text-[9px] flex-shrink-0">{entry.displayTime}</span>
                          <span className="text-slate-700 font-mono text-[9px] flex-shrink-0">Risk:{entry.opiAtDecision}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ── Regulatory Standards (Reference) ─────────── */}
          <div>
            <div className="flex items-center gap-2 mb-2 px-1">
              <Shield className="w-3.5 h-3.5 text-secondary" />
              <span className="text-[12px] font-bold text-primary">Regulatory Standards</span>
              <span className="text-[10px] text-slate-700">Reference</span>
            </div>
            <div className="border border-border rounded-xl overflow-x-auto">
              <table className="w-full min-w-[640px]">
                <thead>
                  <tr className="border-b border-border">
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
                    <tr key={std.id} className="border-b border-border hover:bg-slate-50 dark:hover:bg-zinc-900/15 transition-colors">
                      <td className="px-3 py-2">
                        <span className="text-[11px] font-semibold text-primary">{std.name}</span>
                      </td>
                      <td className="px-3 py-2">
                        <span className={`inline-flex items-center gap-1 px-1.5 py-px rounded text-[10px] font-bold border ${
                          std.status === 'compliant' ? 'bg-green-100 border-green-200 text-green-700 dark:bg-green-500/10 dark:border-green-500/20 dark:text-green-400' :
                          std.status === 'warning' ? 'bg-amber-100 border-amber-200 text-amber-700 dark:bg-amber-500/10 dark:border-amber-500/20 dark:text-amber-400' :
                          'bg-red-100 border-red-200 text-red-700 dark:bg-red-500/10 dark:border-red-500/20 dark:text-red-400'
                        }`}>
                          {std.status === 'compliant' ? <CheckCircle className="w-2.5 h-2.5" /> : <AlertTriangle className="w-2.5 h-2.5" />}
                          {std.statusLabel || (std.status === 'compliant' ? 'Compliant' : std.status === 'warning' ? 'At Risk' : 'Non-Compliant')}
                        </span>
                      </td>
                      <td className="px-3 py-2">
                        <span className={`px-1.5 py-px rounded text-[9px] font-bold uppercase border ${
                          std.exposure === 'high' ? 'bg-red-100 border-red-200 text-red-700 dark:bg-red-500/10 dark:border-red-500/20 dark:text-red-400' :
                          std.exposure === 'moderate' ? 'bg-amber-100 border-amber-200 text-amber-700 dark:bg-amber-500/10 dark:border-amber-500/20 dark:text-amber-400' :
                          'bg-slate-100 dark:bg-zinc-800/30 border-slate-700/40 text-slate-500'
                        }`}>{std.exposure}</span>
                      </td>
                      <td className="px-3 py-2">
                        {std.openFindings > 0
                          ? <span className="text-[10px] font-semibold text-amber-700 dark:text-amber-400">{std.openFindings} open</span>
                          : <span className="text-[10px] text-slate-700">0</span>
                        }
                      </td>
                      <td className="px-3 py-2">
                        <span className={`text-[10px] font-semibold ${std.trend === 'down' ? 'text-green-600 dark:text-green-400' : std.trend === 'up' ? 'text-red-700 dark:text-red-400' : 'text-slate-500'}`}>
                          {std.trend === 'down' ? '↓' : std.trend === 'up' ? '↑' : '→'}
                        </span>
                      </td>
                      <td className="px-3 py-2">
                        <span className="text-[10px] text-slate-500">{std.detail}</span>
                        {std.autoAction && <span className="text-[9px] text-amber-700 dark:text-amber-400 ml-1">⚡ {std.autoAction}</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>

      {/* ── Approval Decision Modal ── */}
      {approvalModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={closeApprovalModal} />
          <div className="relative bg-white dark:bg-zinc-950 border border-border rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden">
            <div className="px-5 py-4 border-b border-border bg-slate-100/80 dark:bg-zinc-900/30">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Lock className="w-4 h-4 text-amber-700 dark:text-amber-400" />
                    <h3 className="text-sm font-bold text-primary">Authorization Required</h3>
                  </div>
                  <p className="text-[10px] text-slate-500">Decision will be logged with timestamp, actor, and risk context</p>
                </div>
                <button onClick={closeApprovalModal} className="p-1.5 hover:bg-slate-100 dark:hover:bg-zinc-900/50 rounded-lg transition-colors">
                  <X className="w-4 h-4 text-secondary" />
                </button>
              </div>
            </div>

            {!approvalDecision ? (
              <>
                <div className="px-5 py-4 space-y-4">
                  <div className="bg-slate-100/80 dark:bg-zinc-900/30 rounded-xl p-4 border border-slate-700/50">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-1.5 py-px rounded text-[9px] font-bold border ${approvalModal.severity === 'critical' ? 'bg-red-100 border-red-200 text-red-700 dark:bg-red-500/10 dark:border-red-500/20 dark:text-red-400' : 'bg-amber-100 border-amber-200 text-amber-700 dark:bg-amber-500/10 dark:border-amber-500/20 dark:text-amber-400'}`}>{approvalModal.severity.toUpperCase()}</span>
                      <span className="text-sm font-semibold text-slate-900 dark:text-primary">{approvalModal.title}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-[10px]">
                      <div><span className="text-slate-500">Amount:</span> <span className="text-primary font-bold font-mono">${approvalModal.amount.toLocaleString()}</span></div>
                      <div><span className="text-slate-500">Linked Risk:</span> <span className="text-primary">{approvalModal.riskTitle}</span></div>
                      <div><span className="text-slate-500">Owner:</span> <span className="text-primary">{approvalModal.owner}</span></div>
                      <div><span className="text-slate-500">Days Remaining:</span> <span className={`font-bold ${approvalModal.daysLeft <= 7 ? 'text-red-700 dark:text-red-400' : 'text-amber-700 dark:text-amber-400'}`}>{approvalModal.daysLeft}d</span></div>
                      <div><span className="text-slate-500">Cascade Chains:</span> <span className="text-red-700 dark:text-red-400 font-bold">{approvalModal.cascadeCount} consequences</span></div>
                      {approvalModal.auditImpact && <div><span className="text-slate-500">Audit Impact:</span> <span className="text-amber-700 dark:text-amber-400">{approvalModal.auditImpact}</span></div>}
                    </div>
                  </div>

                  <div className="bg-slate-50 dark:bg-zinc-900/35 rounded-lg p-3 border border-slate-700/40">
                    <p className="text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Decision Context Snapshot</p>
                    <div className="grid grid-cols-3 gap-2 text-[10px]">
                      <div className="text-center">
                        <p className="text-slate-500">Agency Risk Score</p>
                        <p className={`font-bold text-sm ${opiColor}`}>{opiScore}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-slate-500">Compliance</p>
                        <p className="font-bold text-sm text-amber-700 dark:text-amber-400">{overallCompliance}%</p>
                      </div>
                      <div className="text-center">
                        <p className="text-slate-500">Timestamp</p>
                        <p className="font-bold text-[10px] text-secondary font-mono">{new Date().toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-semibold text-secondary uppercase tracking-wider mb-1.5 block">Decision Rationale (required for audit trail)</label>
                    <textarea
                      value={approvalNote}
                      onChange={(e) => setApprovalNote(e.target.value)}
                      placeholder="Enter justification for this decision..."
                      className="w-full px-3 py-2.5 bg-slate-100/80 dark:bg-zinc-900/30 border border-slate-700/50 rounded-lg text-primary text-xs placeholder-slate-600 dark:placeholder-slate-500 focus:outline-none focus:border-amber-500/50 resize-none"
                      rows={3}
                    />
                  </div>
                </div>

                <div className="px-5 py-4 border-t border-border bg-slate-50 dark:bg-zinc-900/35">
                  <p className="text-[9px] text-slate-700 mb-3 flex items-center gap-1.5">
                    <UserCheck className="w-3 h-3" />
                    Authorizing Official: <span className="text-primary font-semibold">Sheriff K. Conway</span> — decision is final and logged
                  </p>
                  <div className="grid grid-cols-4 gap-2">
                    <button onClick={() => handleApprovalAction('approved')} disabled={!approvalNote.trim()} className="px-3 py-2.5 bg-green-500/20 hover:bg-green-500/30 border border-green-500/30 text-green-600 dark:text-green-400 rounded-lg text-[11px] font-bold transition-all disabled:opacity-30 disabled:cursor-not-allowed">
                      <CheckCircle className="w-3.5 h-3.5 mx-auto mb-1" />
                      Approve
                    </button>
                    <button onClick={() => handleApprovalAction('denied')} disabled={!approvalNote.trim()} className="px-3 py-2.5 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-700 dark:text-red-400 rounded-lg text-[11px] font-bold transition-all disabled:opacity-30 disabled:cursor-not-allowed">
                      <X className="w-3.5 h-3.5 mx-auto mb-1" />
                      Deny
                    </button>
                    <button onClick={() => handleApprovalAction('escalated')} disabled={!approvalNote.trim()} className="px-3 py-2.5 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/30 text-amber-700 dark:text-amber-400 rounded-lg text-[11px] font-bold transition-all disabled:opacity-30 disabled:cursor-not-allowed">
                      <ArrowRight className="w-3.5 h-3.5 mx-auto mb-1" />
                      Escalate
                    </button>
                    <button onClick={() => handleApprovalAction('deferred')} disabled={!approvalNote.trim()} className="px-3 py-2.5 bg-slate-100 dark:bg-zinc-800/30 hover:bg-slate-100 dark:hover:bg-zinc-800/50 border border-slate-600/30 text-secondary rounded-lg text-[11px] font-bold transition-all disabled:opacity-30 disabled:cursor-not-allowed">
                      <Clock className="w-3.5 h-3.5 mx-auto mb-1" />
                      Defer
                    </button>
                  </div>
                </div>
              </>
            ) : (
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
                        <p className="text-xs text-secondary mt-1">{approvalModal.title} — ${approvalModal.amount.toLocaleString()}</p>
                      </>
                    );
                  })()}
                </div>
                <div className="bg-slate-100/80 dark:bg-zinc-900/30 rounded-lg p-3 border border-slate-700/50 space-y-2 text-[10px]">
                  <div className="flex justify-between"><span className="text-slate-500">Decision ID</span><span className="text-primary font-mono">{approvalDecision.entry.id}</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">Timestamp</span><span className="text-primary font-mono">{approvalDecision.entry.displayTime}</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">Authorized By</span><span className="text-primary">{approvalDecision.entry.actor} ({approvalDecision.entry.role})</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">Agency Risk Score at Decision</span><span className={`font-bold ${opiColor}`}>{approvalDecision.entry.opiAtDecision}</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">Compliance at Decision</span><span className="text-primary">{approvalDecision.entry.complianceAtDecision}%</span></div>
                  {approvalDecision.entry.note && (
                    <div className="pt-2 border-t border-border">
                      <span className="text-slate-500">Rationale:</span>
                      <p className="text-secondary mt-0.5">{approvalDecision.entry.note}</p>
                    </div>
                  )}
                </div>
                <div className="mt-4 p-2.5 bg-slate-100/80 dark:bg-zinc-900/30 border border-slate-700/40 rounded-lg">
                  <p className="text-[9px] text-secondary flex items-center gap-1.5">
                    <CircleDot className="w-3 h-3" />
                    This decision has been recorded to the audit trail and will persist across sessions.
                  </p>
                </div>
                <button onClick={closeApprovalModal} className="mt-4 w-full px-4 py-2.5 bg-slate-100/80 dark:bg-zinc-900/30 hover:bg-slate-200 dark:hover:bg-zinc-900/60 border border-slate-300 dark:border-slate-700/50 text-slate-700 dark:text-white rounded-xl text-sm font-medium transition-all">
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

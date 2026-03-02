import React, { useState } from 'react';
import {
  AlertTriangle, Calendar, CheckCircle, Shield, FileText,
  ChevronDown, ChevronUp, TrendingUp, TrendingDown, Download,
  Sparkles, Link2, Zap
} from 'lucide-react';
import DashboardLayout from '../layouts/DashboardLayout';

export default function RiskCompliance() {
  const [expandedRisks, setExpandedRisks] = useState([]);
  const [riskFilter, setRiskFilter] = useState('all');
  const [aiSummaryExpanded, setAiSummaryExpanded] = useState(false);

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
        'Federal housing contract revoked — lose $1.2M/yr revenue',
        'ACA accreditation jeopardized',
        'Inmate transfer required (36 inmates, pods at 91.5%)',
        'State detention violation filed'
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
        'Evidence chain-of-custody gaps in active cases',
        'State compliance violation — GA POST mandate',
        'Increased civil liability in use-of-force cases',
        'Equipment compliance drops 86% → 72%',
        'Risk trend escalates further (+16% already)'
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
        'Insurance carrier flags non-compliant vehicles',
        '9 units restricted from patrol duty',
        'Equipment compliance drops further'
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
        'Deputies pulled from patrol — staffing at 97% → 96%',
        'Training compliance 91.8% → 90.6%',
        'Auto-alert generated for Staffing & Readiness',
        'POST audit finding if inspected'
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
        'ACA re-accreditation at risk — audit readiness drops',
        'Repeat findings flagged in inspection report'
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

  return (
    <DashboardLayout>
      <div className="p-4 lg:p-6">
        <div className="max-w-[1400px] mx-auto">

          {/* ── Page Header ────────────────────────────────── */}
          <div className="mb-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-white mb-0.5">Risk & Compliance</h2>
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
                <button className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-800/40 border border-slate-700/30 rounded text-[11px] text-slate-400 hover:text-white transition-colors">
                  <Download className="w-3 h-3" />
                  Compliance Report
                </button>
              </div>
            </div>
          </div>

          {/* ── Top Summary — 3 Cards ────────────────────── */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            {/* Open Risk Items */}
            <div className="bg-slate-800/15 border border-slate-700/15 rounded px-3 py-2.5">
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
            <div className="bg-slate-800/15 border border-slate-700/15 rounded px-3 py-2.5">
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
            <div className="bg-slate-800/15 border border-slate-700/15 rounded px-3 py-2.5">
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
                {criticalCount} critical risks threaten Dec 12 audit. Equipment ↑16%. 3 approvals would push compliance to 96.1%.
              </span>
              <span className="text-[10px] text-slate-600 flex-shrink-0">{aiSummaryExpanded ? 'Less' : 'Details'}</span>
              {aiSummaryExpanded ? <ChevronUp className="w-3 h-3 text-slate-600" /> : <ChevronDown className="w-3 h-3 text-slate-600" />}
            </button>

            {aiSummaryExpanded && (
              <div className="mt-1 px-3 py-2.5 bg-slate-800/15 border border-slate-700/10 rounded space-y-1.5">
                <p className="text-[10px] text-red-400">&bull; HVAC 84&deg;F. Marshals inspect in 4 days. If temp &gt;78&deg;F on Dec 12 &rarr; federal housing violation. Contractor on-site.</p>
                <p className="text-[10px] text-red-400">&bull; Body cams EOL Dec 31. $125K pending approval. If denied &rarr; evidence gaps, state violation, civil liability exposure.</p>
                <p className="text-[10px] text-amber-400">&bull; ACA re-accreditation 62% ready, 72 days out. 2 doc gaps unresolved. Below 70% at 30 days triggers AT RISK.</p>
                <p className="text-[10px] text-amber-400">&bull; 2 P.O.S.T. certs expire Jan 31. Training budget ($43K) pending. If denied &rarr; deputies can't patrol, staffing drops.</p>
                <p className="text-[10px] text-green-400">&bull; CJIS clean. PREA clean. UOF reviews 97.2%. Training trend ↓40%.</p>
                <p className="text-[10px] text-slate-400">&bull; Approval cascade: 3 pending approvals resolve 3 of 5 risks. Compliance projects 94.7% &rarr; 96.1%.</p>
              </div>
            )}
          </div>

          {/* ── Compliance Standards (Operational Table) ──── */}
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2 px-1">
              <Shield className="w-3.5 h-3.5 text-blue-400" />
              <span className="text-[12px] font-bold text-white">Regulatory Standards</span>
            </div>
            <div className="border border-slate-700/15 rounded overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-700/20">
                    <th className="px-3 py-2 text-left text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Standard</th>
                    <th className="px-3 py-2 text-left text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                    <th className="px-3 py-2 text-left text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Exposure</th>
                    <th className="px-3 py-2 text-left text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Last Audit</th>
                    <th className="px-3 py-2 text-left text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Next Audit</th>
                    <th className="px-3 py-2 text-left text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Findings</th>
                    <th className="px-3 py-2 text-left text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Trend</th>
                    <th className="px-3 py-2 text-left text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Detail</th>
                  </tr>
                </thead>
                <tbody>
                  {complianceStandards.map((std) => (
                    <tr key={std.id} className="border-b border-slate-800/10 hover:bg-slate-800/15 transition-colors">
                      <td className="px-3 py-2.5">
                        <span className="text-[11px] font-semibold text-white">{std.name}</span>
                      </td>
                      <td className="px-3 py-2.5">
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
                      <td className="px-3 py-2.5">
                        <div className="flex items-center gap-1">
                          <span className={`px-1.5 py-px rounded text-[9px] font-bold uppercase border ${
                            std.exposure === 'high' ? 'bg-red-500/10 border-red-500/20 text-red-400' :
                            std.exposure === 'moderate' ? 'bg-amber-500/10 border-amber-500/20 text-amber-400' :
                            'bg-slate-700/30 border-slate-700/20 text-slate-500'
                          }`}>{std.exposure}</span>
                        </div>
                        {std.exposureNote && (
                          <p className="text-[9px] text-slate-600 mt-0.5">{std.exposureNote}</p>
                        )}
                      </td>
                      <td className="px-3 py-2.5">
                        <span className="text-[10px] text-slate-400 font-mono">{std.lastAudit}</span>
                      </td>
                      <td className="px-3 py-2.5">
                        <span className="text-[10px] text-slate-400 font-mono">{std.nextAudit}</span>
                      </td>
                      <td className="px-3 py-2.5">
                        {std.openFindings > 0 ? (
                          <span className="text-[10px] font-semibold text-amber-400">{std.openFindings} open</span>
                        ) : (
                          <span className="text-[10px] text-slate-600">0</span>
                        )}
                      </td>
                      <td className="px-3 py-2.5">
                        <span className={`text-[10px] font-semibold ${
                          std.trend === 'down' ? 'text-green-400' :
                          std.trend === 'up' ? 'text-red-400' :
                          'text-slate-500'
                        }`}>
                          {std.trend === 'down' ? '↓ Improving' : std.trend === 'up' ? '↑ Escalating' : '→ Stable'}
                        </span>
                      </td>
                      <td className="px-3 py-2.5">
                        <span className="text-[10px] text-slate-500">{std.detail}</span>
                        {std.autoAction && (
                          <p className="text-[9px] text-amber-400 mt-0.5">⚡ {std.autoAction}</p>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* ── Open Risk Items (Core Section) ────────────── */}
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
                        {risk.linkedApproval && (
                          <div className={`flex items-center gap-2 px-2.5 py-1.5 rounded border text-[10px] ${
                            risk.linkedApproval.status === 'approved'
                              ? 'bg-green-500/[0.03] border-green-500/15 text-green-400'
                              : 'bg-amber-500/[0.03] border-amber-500/15 text-amber-400'
                          }`}>
                            <Link2 className="w-3 h-3 flex-shrink-0" />
                            <span className="font-semibold">Linked Approval:</span>
                            <span className="text-white">{risk.linkedApproval.title}</span>
                            <span className="font-mono">${risk.linkedApproval.amount.toLocaleString()}</span>
                            <span className="text-slate-700">&mdash;</span>
                            <span className={`font-bold uppercase ${
                              risk.linkedApproval.status === 'approved' ? 'text-green-400' : 'text-amber-400'
                            }`}>
                              {risk.linkedApproval.status}
                            </span>
                          </div>
                        )}
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
            <div className="border border-slate-700/15 rounded overflow-hidden">
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

          {/* ── Risk Trends (Narrative) + Policy Compliance ── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">

            {/* Risk Trends — Narrative */}
            <div className="bg-slate-800/15 border border-slate-700/15 rounded p-3">
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
            <div className="bg-slate-800/15 border border-slate-700/15 rounded p-3">
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
          <div className="mt-4 border border-red-500/15 rounded overflow-hidden">
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
                { label: 'Insurance Risk', current: 'Moderate', projected: 'High', direction: 'up', severity: 'critical' },
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
                  <p className="text-[10px] text-slate-400">2 certs expire Jan 31</p>
                  <p className="text-[10px] text-red-400/80 pl-1.5">→ 14 deputies total uncertified</p>
                  <p className="text-[10px] text-red-400/80 pl-3">→ Staffing drops 97% → 93.5%</p>
                  <p className="text-[10px] text-red-400/80 pl-4.5">→ 3 shifts below minimum threshold</p>
                  <p className="text-[10px] text-red-400/80 pl-6">→ POST audit finding if inspected</p>
                </div>
              </div>

              {/* Equipment Chain */}
              <div className="px-3 py-2.5 bg-slate-900/20">
                <p className="text-[10px] font-bold text-red-400 mb-1.5">Equipment Compliance Cascade</p>
                <div className="space-y-1">
                  <p className="text-[10px] text-slate-400">Body cams EOL Dec 31 + 9 fleet overdue</p>
                  <p className="text-[10px] text-red-400/80 pl-1.5">→ Equipment compliance 86% → 72%</p>
                  <p className="text-[10px] text-red-400/80 pl-3">→ Evidence integrity gaps in active cases</p>
                  <p className="text-[10px] text-red-400/80 pl-4.5">→ Civil liability exposure on UOF incidents</p>
                  <p className="text-[10px] text-red-400/80 pl-6">→ Insurance carrier flags agency</p>
                </div>
              </div>

              {/* ACA Chain */}
              <div className="px-3 py-2.5 bg-slate-900/20">
                <p className="text-[10px] font-bold text-amber-400 mb-1.5">ACA Accreditation Cascade</p>
                <div className="space-y-1">
                  <p className="text-[10px] text-slate-400">Readiness 62%, 2 doc gaps open</p>
                  <p className="text-[10px] text-amber-400/80 pl-1.5">→ Feb 18 audit readiness drops below 50%</p>
                  <p className="text-[10px] text-amber-400/80 pl-3">→ Re-accreditation fails — conditional status</p>
                  <p className="text-[10px] text-amber-400/80 pl-4.5">→ Federal housing contract reviewed</p>
                  <p className="text-[10px] text-amber-400/80 pl-6">→ $1.2M/yr USMS revenue at risk</p>
                </div>
              </div>
            </div>

            {/* Cross-System Ripple */}
            <div className="px-3 py-2.5 bg-slate-900/40 border-t border-red-500/10">
              <p className="text-[10px] font-bold text-white mb-1.5">Cross-System Ripple</p>
              <div className="grid grid-cols-2 lg:grid-cols-5 gap-2">
                {[
                  { system: 'Command Alerts', action: '3 new critical alerts generated', color: 'red' },
                  { system: 'Approvals', action: '2 emergency approvals auto-created', color: 'amber' },
                  { system: 'Daily Brief', action: 'Risk headline escalates to RED', color: 'red' },
                  { system: 'Staffing', action: 'Readiness drops below 94% threshold', color: 'amber' },
                  { system: 'Budget', action: '$168K reallocation recommendation', color: 'amber' },
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

            {/* Resolution Path */}
            <div className="px-3 py-2 bg-green-500/[0.02] border-t border-green-500/10">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-3 h-3 text-green-400 flex-shrink-0" />
                <p className="text-[10px] text-green-400">
                  <span className="font-bold">Resolution path:</span> Approve 3 pending items ($186K total) → compliance projects to 96.1% → all cascades neutralized → command brief returns to GREEN
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
}

import React, { useState } from 'react';
import {
  AlertTriangle, AlertCircle, Calendar, CheckCircle, Shield, FileText,
  ChevronDown, ChevronUp, TrendingUp, Download,
  Sparkles, Link2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';

export default function RiskCompliance() {
  const navigate = useNavigate();
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
      detail: '156/158 deputies certified | 2 expiring Jan 2025 — training scheduled'
    }
  ];

  // ── Open Risk Items ──────────────────────────────
  const openRisks = [
    {
      id: 1,
      severity: 'critical',
      title: 'H2-Pod HVAC System Failure',
      description: 'Temperature 84°F — exceeds ACA max (78°F). 36 inmates in pod.',
      impactCategory: 'Compliance',
      owner: 'Facilities Director Brooks',
      due: 'Dec 13, 2024',
      dueUrgency: 'critical',
      daysLeft: 5,
      status: 'Emergency repair approved — contractor on-site',
      linkedApproval: { id: 4, title: 'Emergency HVAC Repair', amount: 18500, status: 'approved' },
      auditImpact: 'U.S. Marshals H-Pod inspection Dec 12-14'
    },
    {
      id: 2,
      severity: 'critical',
      title: 'Body Camera System End-of-Life',
      description: '68 Axon Body 2 cameras reach EOL Dec 31. Vendor discontinuing cloud storage.',
      impactCategory: 'Compliance',
      owner: 'IT Director Harrison',
      due: 'Dec 31, 2024',
      dueUrgency: 'soon',
      daysLeft: 23,
      status: 'Replacement purchase pending Sheriff approval',
      linkedApproval: { id: 5, title: 'Body Camera Upgrade', amount: 125000, status: 'pending' },
      auditImpact: 'State evidence integrity requirements'
    },
    {
      id: 3,
      severity: 'medium',
      title: 'Patrol Vehicle Inspections Overdue',
      description: '9 of 64 units (14%) past state inspection date.',
      impactCategory: 'Operational',
      owner: 'Fleet Manager Anderson',
      due: 'Jan 15, 2025',
      dueUrgency: 'soon',
      daysLeft: 38,
      status: 'Inspection appointments scheduled — 3 complete, 6 remaining',
      linkedApproval: null,
      auditImpact: 'Insurance liability, operational restrictions'
    },
    {
      id: 4,
      severity: 'medium',
      title: 'P.O.S.T. Certifications Expiring',
      description: '2 deputies (Chen, Williams) certifications expire Jan 31, 2025.',
      impactCategory: 'Compliance',
      owner: 'Training Director Martinez',
      due: 'Jan 31, 2025',
      dueUrgency: 'monitor',
      daysLeft: 54,
      status: 'Training sessions scheduled Jan 18-19',
      linkedApproval: { id: 2, title: 'Q1 Training Budget', amount: 43000, status: 'pending' },
      auditImpact: 'Deputies cannot patrol without active certification'
    },
    {
      id: 5,
      severity: 'low',
      title: 'ACA Documentation Gaps',
      description: '2 minor documentation findings from Feb 2024 inspection.',
      impactCategory: 'Compliance',
      owner: 'Chief Deputy Harris',
      due: 'Feb 18, 2025',
      dueUrgency: 'monitor',
      daysLeft: 72,
      status: 'Corrective action plans drafted — review pending',
      linkedApproval: null,
      auditImpact: 'ACA re-accreditation inspection Feb 18-21'
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
      trend: 'stable'
    },
    {
      name: 'Training Certifications',
      rate: 91.8,
      detail: '156/170 deputies current',
      warning: '14 due Jan-Feb 2025',
      trend: 'down'
    },
    {
      name: 'Equipment Compliance',
      rate: 86.0,
      detail: 'Body cams: 100% operational',
      warning: 'Fleet: 86% inspection current (9 overdue)',
      trend: 'down'
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
              <span className="text-[11px] text-slate-400 flex-1 text-left">
                <span className="text-slate-500 font-medium">AI Summary:</span>{' '}
                <span className="text-red-400">{criticalCount} critical risks need resolution before Dec audit</span>
                <span className="text-slate-600 mx-1">&middot;</span>
                <span className="text-amber-400">Equipment risk trend escalating (+16%)</span>
                <span className="text-slate-600 mx-1">&middot;</span>
                <span className="text-green-400">Overall compliance strong at {overallCompliance}%</span>
              </span>
              {aiSummaryExpanded ? <ChevronUp className="w-3 h-3 text-slate-600" /> : <ChevronDown className="w-3 h-3 text-slate-600" />}
            </button>

            {aiSummaryExpanded && (
              <div className="mt-1 px-3 py-2.5 bg-slate-800/15 border border-slate-700/10 rounded space-y-1.5">
                <p className="text-[10px] text-red-400">&bull; HVAC repair in progress but U.S. Marshals inspection in 4 days. Temperature must be below 78&deg;F by Dec 12.</p>
                <p className="text-[10px] text-red-400">&bull; Body camera EOL Dec 31 &mdash; $125K replacement awaiting approval. State evidence compliance at risk if delayed.</p>
                <p className="text-[10px] text-amber-400">&bull; ACA re-accreditation Feb 18 at 62% readiness. 2 documentation gaps need resolution. Timeline is tight.</p>
                <p className="text-[10px] text-amber-400">&bull; 2 P.O.S.T. certifications expiring Jan 31 &mdash; training budget ($43K) pending approval to fund sessions.</p>
                <p className="text-[10px] text-green-400">&bull; CJIS and PREA fully compliant. Training deficiency trend improved 40%. Use-of-force reviews at 97.2%.</p>
                <p className="text-[10px] text-slate-400">&bull; If all pending approvals clear: 3 of 5 risks auto-resolve or downgrade. Compliance rate projects to 96.1%.</p>
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

                      {/* Impact category */}
                      <span className="px-1.5 py-px bg-slate-700/30 border border-slate-700/20 rounded text-[10px] font-medium text-slate-400 flex-shrink-0">
                        {risk.impactCategory}
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
                        {/* Description */}
                        <p className="text-[11px] text-slate-400">{risk.description}</p>

                        {/* Key details row */}
                        <div className="flex items-center gap-3 text-[10px] text-slate-400 flex-wrap">
                          <span>Owner: <span className="text-white font-medium">{risk.owner}</span></span>
                          <span className="text-slate-700">&middot;</span>
                          <span>Due: <span className="text-white font-medium">{risk.due}</span></span>
                          <span className="text-slate-700">&middot;</span>
                          <span>Impact: <span className="text-white font-medium">{risk.impactCategory}</span></span>
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
                    return (
                      <tr key={audit.id} className="border-b border-slate-800/10 hover:bg-slate-800/15 transition-colors">
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

              <div className="mt-3 pt-2.5 border-t border-slate-700/15 flex items-center gap-3 text-[10px] text-slate-500">
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
                {policyCompliance.map((policy, idx) => (
                  <div key={idx} className="bg-slate-900/20 border border-slate-700/10 rounded p-2.5">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[11px] font-semibold text-white">{policy.name}</span>
                      <div className="flex items-center gap-1.5">
                        <span className={`text-[13px] font-bold ${
                          policy.rate >= 95 ? 'text-green-400' :
                          policy.rate >= 90 ? 'text-amber-400' :
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
                  </div>
                ))}
              </div>

              {/* Escalation note */}
              <div className="mt-2.5 flex items-start gap-2 px-2 py-1.5 bg-amber-500/[0.03] border border-amber-500/10 rounded">
                <AlertTriangle className="w-3 h-3 text-amber-400 flex-shrink-0 mt-0.5" />
                <p className="text-[10px] text-amber-400">
                  Training compliance below 95% &mdash; auto-escalation triggered. Training approval pending ($43K).
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
}

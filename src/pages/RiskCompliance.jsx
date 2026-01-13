import React, { useState } from 'react';
import {
  ShieldCheck, AlertTriangle, FileCheck, Scale, ClipboardCheck, TrendingUp, Calendar,
  CheckCircle2, Check, Shield, FileText, AlertCircle, ChevronDown, ChevronUp,
  Upload, Download, HelpCircle, Clock, RefreshCw, ExternalLink
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';

export default function RiskCompliance() {
  const navigate = useNavigate();
  const [glossaryExpanded, setGlossaryExpanded] = useState(false);
  const [expandedRisk, setExpandedRisk] = useState(null);

  const complianceStatuses = [
    {
      id: 'cjis',
      name: 'CJIS Compliance',
      status: 'compliant',
      lastAudit: 'Sep 2024',
      nextAudit: 'Sep 2025',
      details: 'Security Policy v5.9 | All staff training current'
    },
    {
      id: 'aca',
      name: 'ACA Standards (Detention)',
      status: 'accredited',
      statusLabel: 'Accredited',
      expires: 'Aug 2025',
      lastInspection: 'Feb 2024',
      details: '3 minor findings resolved'
    },
    {
      id: 'prea',
      name: 'PREA Compliance',
      status: 'compliant',
      lastAudit: 'Nov 2023',
      nextAudit: 'Nov 2026 (3-year cycle)',
      details: 'Zero substantiated incidents YTD | Staff training: 100%'
    },
    {
      id: 'post',
      name: 'GA P.O.S.T. Certification',
      status: 'pending',
      pendingCount: 2,
      certified: 156,
      details: '2 certifications expiring Jan 2025 | Training sessions scheduled: Jan 18, 19'
    }
  ];

  const upcomingAudits = [
    {
      id: 1,
      date: 'Dec 12-14, 2024',
      type: 'U.S. Marshals Service',
      description: 'H-Pod Federal Housing Inspection',
      lead: 'Major Wilson',
      status: 'Preparation 95% complete',
      urgent: true
    },
    {
      id: 2,
      date: 'Feb 18-21, 2025',
      type: 'ACA Re-Accreditation',
      description: 'Full Facility Inspection',
      lead: 'Chief Deputy Harris',
      status: 'Pre-audit scheduled'
    },
    {
      id: 3,
      date: 'Apr 10, 2025',
      type: 'State Fire Marshal Inspection',
      description: 'Detention Center Fire Safety',
      lead: 'Facilities Manager Anderson',
      status: 'Annual inspection'
    }
  ];

  const openRisks = [
    {
      id: 1,
      severity: 'critical',
      title: 'H2-Pod HVAC System Failure',
      description: 'Temp exceeds ACA standard (84°F / max 80°F)',
      impact: 'Federal audit compliance risk',
      owner: 'Facilities Director Chen',
      due: 'Dec 13 (before audit)',
      status: 'Emergency repair approved, work in progress'
    },
    {
      id: 2,
      severity: 'critical',
      title: 'Body Camera System End-of-Life',
      description: '68 cameras reach EOL Dec 31, 2024',
      impact: 'State compliance violation, evidence integrity',
      owner: 'IT Director Harrison',
      due: 'Dec 31, 2024',
      status: 'Replacement purchase pending approval ($125K)'
    },
    {
      id: 3,
      severity: 'medium',
      title: 'Patrol Vehicle State Inspections Overdue',
      description: '9 units past inspection date (14% of fleet)',
      impact: 'Insurance liability, operational restrictions',
      owner: 'Fleet Manager Anderson',
      due: 'Jan 15, 2025',
      status: 'Inspection appointments scheduled'
    }
  ];

  const recentActions = [
    { date: 'Dec 8', action: 'PREA training completed for 23 new detention staff' },
    { date: 'Dec 5', action: 'Use of force policy updated (v4.8) - all staff notified' },
    { date: 'Nov 28', action: 'CJIS security incident response drill - passed' },
    { date: 'Nov 22', action: 'ACA pre-audit walkthrough completed - 2 findings' },
    { date: 'Nov 18', action: 'Firearms qualification makeup sessions - 12 deputies' }
  ];

  const riskTrends = [
    { category: 'Staffing Risks', count: 8, percent: 80, trend: 'down', change: '22%' },
    { category: 'Equipment/Facility', count: 7, percent: 70, trend: 'up', change: '16%' },
    { category: 'Policy Compliance', count: 4, percent: 40, trend: 'stable', change: '0%' },
    { category: 'Training Deficiencies', count: 3, percent: 30, trend: 'down', change: '40%' },
    { category: 'Budget/Resources', count: 2, percent: 20, trend: 'stable', change: '0%' }
  ];

  const glossaryItems = [
    { acronym: 'CJIS', definition: 'Criminal Justice Information Services (FBI security standards)' },
    { acronym: 'ACA', definition: 'American Correctional Association (detention standards)' },
    { acronym: 'PREA', definition: 'Prison Rape Elimination Act (sexual assault prevention)' },
    { acronym: 'CALEA', definition: 'Commission on Accreditation for Law Enforcement Agencies' },
    { acronym: 'P.O.S.T.', definition: 'Peace Officer Standards & Training (GA state certification)' },
    { acronym: 'NCIC', definition: 'National Crime Information Center (federal database)' },
    { acronym: 'TAC', definition: 'Terminal Agency Coordinator (CJIS system administrator)' }
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'compliant':
      case 'accredited':
        return (
          <span className="px-2.5 py-1 bg-green-900/30 text-green-300 border border-green-700/50 rounded-full text-xs font-medium flex items-center gap-1">
            <Check className="w-3 h-3" />
            {status === 'accredited' ? 'Accredited' : 'Compliant'}
          </span>
        );
      case 'pending':
        return (
          <span className="px-2.5 py-1 bg-yellow-900/30 text-yellow-300 border border-yellow-700/50 rounded-full text-xs font-medium flex items-center gap-1">
            <AlertTriangle className="w-3 h-3" />
            2 pending
          </span>
        );
      default:
        return null;
    }
  };

  const getComplianceColor = (percent) => {
    if (percent >= 91) return 'text-green-400';
    if (percent >= 81) return 'text-yellow-400';
    if (percent >= 71) return 'text-orange-400';
    return 'text-red-400';
  };

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-white">Risk & Compliance</h1>
            <p className="text-slate-400 mt-1">Agency-wide risk management, regulatory compliance tracking, and audit oversight</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Auto-refreshes every 15 min</span>
            </div>
            <button
              className="flex items-center gap-2 px-4 py-2 bg-amber-500/90 hover:bg-amber-500 text-white rounded-xl transition-colors"
              title="Generate comprehensive compliance report (PDF)"
            >
              <FileText className="w-4 h-4" />
              <span className="text-sm font-medium">Generate Compliance Report</span>
            </button>
          </div>
        </div>

        {/* Metric Tiles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-yellow-500/20 rounded-xl flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-yellow-400" />
              </div>
              <span className="text-sm font-medium text-slate-300">Open Risk Items</span>
            </div>
            <p className="text-2xl font-bold text-white mb-1">3 active</p>
            <p className="text-xs text-slate-500">2 critical, 1 medium</p>
          </div>

          <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-green-400" />
              </div>
              <span className="text-sm font-medium text-slate-300">Compliance Rate</span>
            </div>
            <p className="text-2xl font-bold text-green-400 mb-1">94.7%</p>
            <div className="flex items-center gap-1">
              <TrendingUp className="w-3 h-3 text-green-400" />
              <p className="text-xs text-green-400">+1.2% vs last quarter</p>
            </div>
          </div>

          <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
                <ClipboardCheck className="w-5 h-5 text-blue-400" />
              </div>
              <span className="text-sm font-medium text-slate-300">Audits This Year</span>
            </div>
            <p className="text-2xl font-bold text-white mb-1">7 completed</p>
            <p className="text-xs text-slate-500">2 pending, 1 in progress</p>
          </div>

          <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center">
                <Calendar className="w-5 h-5 text-purple-400" />
              </div>
              <span className="text-sm font-medium text-slate-300">Next Audit</span>
            </div>
            <p className="text-lg font-bold text-white mb-1">U.S. Marshals Service</p>
            <p className="text-xs text-slate-500">Dec 12-14, 2024 (H-Pod)</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm font-medium text-slate-400 mr-2">Quick Actions:</span>
            <button className="flex items-center gap-2 px-3 py-1.5 bg-slate-700/40 hover:bg-slate-700/60 border border-slate-600/50 rounded-lg text-sm text-slate-300 transition-colors">
              <FileText className="w-4 h-4" />
              Generate Report
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 bg-slate-700/40 hover:bg-slate-700/60 border border-slate-600/50 rounded-lg text-sm text-slate-300 transition-colors">
              <Calendar className="w-4 h-4" />
              Schedule Audit
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 bg-slate-700/40 hover:bg-slate-700/60 border border-slate-600/50 rounded-lg text-sm text-slate-300 transition-colors">
              <AlertCircle className="w-4 h-4" />
              Report Risk Item
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 bg-slate-700/40 hover:bg-slate-700/60 border border-slate-600/50 rounded-lg text-sm text-slate-300 transition-colors">
              <Upload className="w-4 h-4" />
              Upload Compliance Doc
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 bg-slate-700/40 hover:bg-slate-700/60 border border-slate-600/50 rounded-lg text-sm text-slate-300 transition-colors">
              <Download className="w-4 h-4" />
              Export Audit Log
            </button>
          </div>
        </div>

        {/* Description */}
        <div className="bg-gradient-to-br from-amber-500/10 to-amber-600/5 border border-amber-500/20 rounded-xl p-5">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-amber-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white mb-1">Compliance Dashboard</h3>
              <p className="text-sm text-slate-400">
                Real-time monitoring of federal and state compliance requirements (CJIS, ACA, PREA), audit schedules,
                policy adherence, and operational risk management across all divisions.
              </p>
              <p className="text-xs text-slate-500 mt-2">
                Data from: CAD system, RMS, training database, HR records | Last updated: Today at 14:32 EST
              </p>
            </div>
          </div>
        </div>

        {/* Regulatory Compliance Section */}
        <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <Shield className="w-5 h-5 text-blue-400" />
            <h3 className="text-lg font-semibold text-white">Regulatory Compliance</h3>
          </div>
          <p className="text-sm text-slate-400 mb-6">
            Federal and state compliance monitoring for Criminal Justice Information Services (CJIS), American Correctional Association (ACA),
            Prison Rape Elimination Act (PREA), CALEA accreditation, and Georgia Peace Officer Standards & Training (P.O.S.T.) requirements.
          </p>

          <div className="space-y-3">
            {complianceStatuses.map((item) => (
              <div key={item.id} className="bg-slate-900/50 border border-slate-700/30 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-semibold text-white">{item.name}</h4>
                  {getStatusBadge(item.status)}
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-400">
                  {item.lastAudit && <span>Last audit: {item.lastAudit}</span>}
                  {item.nextAudit && <span>| Next: {item.nextAudit}</span>}
                  {item.lastInspection && <span>Last inspection: {item.lastInspection}</span>}
                  {item.expires && <span>| Expires: {item.expires}</span>}
                  {item.certified && <span>{item.certified} deputies certified</span>}
                </div>
                <p className="text-xs text-slate-500 mt-2">{item.details}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Open Risk Items */}
        <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="w-5 h-5 text-red-400" />
            <h3 className="text-lg font-semibold text-white">Open Risk Items</h3>
            <span className="px-2 py-0.5 bg-red-500/20 border border-red-500/30 rounded text-xs text-red-400 font-medium">
              {openRisks.length} Active
            </span>
          </div>

          <div className="space-y-3">
            {openRisks.map((risk) => (
              <div
                key={risk.id}
                className={`border rounded-xl p-4 ${
                  risk.severity === 'critical'
                    ? 'bg-red-500/5 border-red-500/30'
                    : 'bg-yellow-500/5 border-yellow-500/30'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    {risk.severity === 'critical' ? (
                      <AlertCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                    )}
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-xs font-bold uppercase ${
                          risk.severity === 'critical' ? 'text-red-400' : 'text-yellow-400'
                        }`}>
                          {risk.severity}
                        </span>
                      </div>
                      <h4 className="text-sm font-semibold text-white mb-1">{risk.title}</h4>
                      <p className="text-xs text-slate-400 mb-2">{risk.description}</p>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
                        <span>Impact: {risk.impact}</span>
                        <span>| Owner: {risk.owner}</span>
                        <span>| Due: {risk.due}</span>
                      </div>
                      <p className="text-xs text-slate-400 mt-2">
                        <span className="text-slate-500">Status:</span> {risk.status}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Audits & Inspections */}
        <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <Calendar className="w-5 h-5 text-orange-400" />
            <h3 className="text-lg font-semibold text-white">Upcoming Audits & Inspections</h3>
          </div>

          <div className="space-y-3">
            {upcomingAudits.map((audit) => (
              <div
                key={audit.id}
                className={`bg-slate-900/50 border rounded-xl p-4 ${
                  audit.urgent ? 'border-orange-500/30' : 'border-slate-700/30'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-semibold text-amber-400">{audit.date}</span>
                      <span className="text-slate-600">|</span>
                      <span className="text-sm font-semibold text-white">{audit.type}</span>
                    </div>
                    <p className="text-sm text-slate-300 mb-2">{audit.description}</p>
                    <div className="flex flex-wrap gap-x-3 text-xs text-slate-500">
                      <span>Lead: {audit.lead}</span>
                      <span>| Status: {audit.status}</span>
                    </div>
                  </div>
                  <button className="px-3 py-1.5 bg-slate-700/40 hover:bg-slate-700/60 border border-slate-600/50 rounded-lg text-xs text-slate-300 transition-colors flex items-center gap-1">
                    <ExternalLink className="w-3 h-3" />
                    View Checklist
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Risk Trends & Policy Compliance - Two Column */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Risk Trends */}
          <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-5 h-5 text-purple-400" />
              <h3 className="text-lg font-semibold text-white">Risk Trends & Analysis</h3>
            </div>
            <p className="text-sm text-slate-400 mb-4">
              6-month trend analysis of identified risks, incident patterns, and mitigation effectiveness.
            </p>

            <div className="space-y-3">
              {riskTrends.map((trend, idx) => (
                <div key={idx}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-slate-300">{trend.category}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-400">{trend.count} incidents</span>
                      <span className={`text-xs font-medium ${
                        trend.trend === 'down' ? 'text-green-400' :
                        trend.trend === 'up' ? 'text-red-400' : 'text-slate-400'
                      }`}>
                        {trend.trend === 'down' ? '↓' : trend.trend === 'up' ? '↑' : '→'} {trend.change} vs H1
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-slate-700/50 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        trend.trend === 'down' ? 'bg-green-500' :
                        trend.trend === 'up' ? 'bg-red-500' : 'bg-blue-500'
                      }`}
                      style={{ width: `${trend.percent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-slate-700/50">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Total Risk Events: 24 (↓ 14% vs previous 6 months)</span>
              </div>
              <div className="flex justify-between text-xs mt-1">
                <span className="text-slate-400">Avg Resolution Time: 8.3 days (target: &lt;10 days)</span>
              </div>
            </div>
          </div>

          {/* Recent Compliance Actions */}
          <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle2 className="w-5 h-5 text-green-400" />
              <h3 className="text-lg font-semibold text-white">Recent Compliance Actions</h3>
              <span className="text-xs text-slate-500">(Last 30 Days)</span>
            </div>

            <div className="space-y-3">
              {recentActions.map((action, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-xs text-amber-400 font-medium">{action.date}:</span>
                    <span className="text-sm text-slate-300 ml-1">{action.action}</span>
                  </div>
                </div>
              ))}
            </div>

            <button className="mt-4 w-full px-3 py-2 bg-slate-700/40 hover:bg-slate-700/60 border border-slate-600/50 rounded-lg text-sm text-slate-300 transition-colors">
              View Full Compliance Log
            </button>
          </div>
        </div>

        {/* Policy Compliance Status */}
        <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <FileCheck className="w-5 h-5 text-blue-400" />
            <h3 className="text-lg font-semibold text-white">Policy Compliance Status</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-900/50 border border-slate-700/30 rounded-xl p-4">
              <p className="text-sm text-slate-400 mb-1">Use of Force Policies</p>
              <p className={`text-xl font-bold ${getComplianceColor(97.2)} mb-1`}>97.2% Compliant</p>
              <p className="text-xs text-slate-500">154/158 incidents reviewed on time</p>
              <p className="text-xs text-slate-500">Last update: Nov 2024</p>
            </div>
            <div className="bg-slate-900/50 border border-slate-700/30 rounded-xl p-4">
              <p className="text-sm text-slate-400 mb-1">Training Requirements</p>
              <p className={`text-xl font-bold ${getComplianceColor(91.8)} mb-1`}>91.8% Compliant</p>
              <p className="text-xs text-slate-500">156/170 deputies current</p>
              <p className="text-xs text-yellow-400">18 certifications due Jan-Feb 2025</p>
            </div>
            <div className="bg-slate-900/50 border border-slate-700/30 rounded-xl p-4">
              <p className="text-sm text-slate-400 mb-1">Equipment Certifications</p>
              <p className={`text-xl font-bold ${getComplianceColor(96.4)} mb-1`}>96.4% Compliant</p>
              <p className="text-xs text-slate-500">Body cameras: 100% operational</p>
              <p className="text-xs text-yellow-400">Patrol vehicles: 86% state inspection current</p>
            </div>
          </div>
        </div>

        {/* Compliance Standards Reference (Glossary) */}
        <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl">
          <button
            onClick={() => setGlossaryExpanded(!glossaryExpanded)}
            className="w-full p-4 flex items-center justify-between hover:bg-slate-800/60 rounded-xl transition-colors"
          >
            <div className="flex items-center gap-3">
              <HelpCircle className="w-5 h-5 text-slate-400" />
              <span className="text-sm font-medium text-slate-300">Compliance Standards Reference</span>
            </div>
            {glossaryExpanded ? (
              <ChevronUp className="w-5 h-5 text-slate-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-slate-400" />
            )}
          </button>

          {glossaryExpanded && (
            <div className="px-4 pb-4 border-t border-slate-700/50">
              <div className="pt-4 space-y-2">
                {glossaryItems.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-sm">
                    <span className="text-amber-400 font-medium min-w-[70px]">{item.acronym}</span>
                    <span className="text-slate-400">- {item.definition}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

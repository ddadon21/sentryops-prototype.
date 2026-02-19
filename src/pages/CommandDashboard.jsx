import React, { useState, useEffect } from 'react';
import { Users, AlertCircle, CheckCircle, Clock, Shield, ThumbsUp, XCircle, X, Menu, ChevronRight, DollarSign, Download, Eye, FileCheck, AlertTriangle, Calendar, User, Filter, ChevronDown, ChevronUp, Circle, Building2, Radio, Target } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import DashboardLayout from '../layouts/DashboardLayout';

export default function CommandDashboard() {
  const navigate = useNavigate();
  const [selectedApproval, setSelectedApproval] = useState(null);
  const [approvalAction, setApprovalAction] = useState(null);
  const [actionComment, setActionComment] = useState('');
  const [toastMessage, setToastMessage] = useState(null);
  const [approvalFilter, setApprovalFilter] = useState('all');
  const [aiBriefExpanded, setAiBriefExpanded] = useState(false);

  // Approval items with tiered urgency:
  // critical = life/safety or legal/compliance risk within 24h
  // action   = operational risk requiring near-term decision
  // standard = routine workflow
  const dashboardApprovals = [
    {
      id: 1,
      type: 'Use of Force Review',
      name: 'Deputy Johnson, Marcus #D-4167',
      details: 'B-Pod incident - OC spray deployment on inmate MARTINEZ',
      tier: 'critical',
      division: 'Detention Division',
      title: 'Use of Force Review',
      context: 'Inmate refused direct orders, took fighting stance. OC spray deployed. Full restraint applied. Medical evaluation completed - no injuries. Body cam footage available.',
      submittedBy: 'Shift Supervisor Williams',
      timePendingMinutes: 15,
      deadline: '24 hours',
      impact: 'Compliance deadline'
    },
    {
      id: 2,
      type: 'Emergency Purchase',
      name: 'Detention - Major Wilson',
      details: 'H2-Pod HVAC Repairs',
      tier: 'critical',
      division: 'Detention Facilities',
      title: 'Emergency Purchase Order',
      amount: 23500,
      context: 'Critical HVAC failure in H2-Pod. Temperature at 84°F. Immediate repair required to maintain ACA accreditation standards.',
      submittedBy: 'Facilities Director Chen',
      timePendingMinutes: 120,
      deadline: 'Immediate',
      impact: 'ACA compliance risk'
    },
    {
      id: 3,
      type: 'Overtime Authorization',
      name: 'Patrol Division - Capt. Rodriguez',
      details: 'B-Shift Staffing Shortage - 160 hours @ $52/hr',
      tier: 'action',
      division: 'Patrol Division',
      title: 'Overtime Authorization',
      amount: 8320,
      context: '3 deputies out (2 FMLA, 1 Workers Comp). Minimum staffing requires 12 road deputies. Requesting OT authorization for next 2 weeks.',
      submittedBy: 'Capt. Rodriguez',
      timePendingMinutes: 90,
      deadline: '48 hours',
      impact: 'Below minimum staffing'
    },
    {
      id: 4,
      type: 'Vehicle Replacement',
      name: 'Fleet Management - Anderson',
      details: 'Patrol Unit 247 - Total Loss (Pursuit Damage)',
      tier: 'action',
      division: 'Support Services',
      title: 'Emergency Vehicle Replacement',
      amount: 48500,
      context: 'Unit 247 totaled in pursuit. Insurance claim filed. Immediate replacement needed - patrol fleet at minimum operational capacity.',
      submittedBy: 'Fleet Manager Anderson',
      timePendingMinutes: 240,
      deadline: '72 hours',
      impact: 'Fleet at minimum capacity'
    },
    {
      id: 5,
      type: 'Hiring Decision',
      name: 'Rodriguez, Elena M.',
      details: 'Certified Correctional Officer - Detention Division',
      tier: 'standard',
      division: 'Detention Division',
      title: 'Hiring Decision',
      context: 'Background investigation complete. 5 years experience. All certifications current. Detention at 94% staffing - approval needed to extend offer.',
      submittedBy: 'HR Director Thompson',
      timePendingMinutes: 1440,
      deadline: '5 days',
      impact: 'Position vacant 45 days'
    },
    {
      id: 6,
      type: 'Policy Exception',
      name: 'Lt. Anderson - Investigations',
      details: 'Extended Surveillance - Narcotics Case #2024-1847',
      tier: 'standard',
      division: 'Investigations',
      title: 'Policy Exception Request',
      context: 'Multi-agency narcotics investigation. DEA requesting 30-day extension for surveillance operations. Additional overtime estimated $12,000.',
      submittedBy: 'Lt. Anderson',
      timePendingMinutes: 2880,
      deadline: '7 days',
      amount: 12000
    },
    {
      id: 7,
      type: 'Leave Request',
      name: 'Deputy Chen, Michael #D-4521',
      details: 'FMLA - Medical Leave: Dec 15 - Jan 5',
      tier: 'standard',
      division: 'Detention Division',
      title: 'FMLA Leave Request',
      context: 'Approved medical procedure. FMLA documentation complete. Coverage plan submitted by Sgt. Williams.',
      submittedBy: 'Deputy Chen',
      timePendingMinutes: 720,
      deadline: '10 days'
    },
    {
      id: 8,
      type: 'Training Authorization',
      name: 'Detention - Sgt. Williams',
      details: 'Crisis Intervention Team Training - 8 Deputies',
      tier: 'standard',
      division: 'Training Division',
      title: 'Training Authorization',
      amount: 6400,
      context: '40-hour CIT certification. Addresses mental health incidents in detention. Grant funding available for 50% reimbursement.',
      submittedBy: 'Training Coordinator Smith',
      timePendingMinutes: 4320,
      deadline: '14 days'
    }
  ];

  const filteredApprovals = approvalFilter === 'all' ? dashboardApprovals :
    approvalFilter === 'critical' ? dashboardApprovals.filter(a => a.tier === 'critical') :
    approvalFilter === 'action' ? dashboardApprovals.filter(a => a.tier === 'action') :
    dashboardApprovals.filter(a => a.tier === 'standard');

  const criticalCount = dashboardApprovals.filter(a => a.tier === 'critical').length;
  const actionCount = dashboardApprovals.filter(a => a.tier === 'action').length;

  const getTimePending = (minutesAgo) => {
    if (minutesAgo < 60) return `${minutesAgo}m`;
    if (minutesAgo < 1440) return `${Math.floor(minutesAgo / 60)}h`;
    return `${Math.floor(minutesAgo / 1440)}d`;
  };

  // Tier color helpers
  const getTierStripColor = (tier) => {
    if (tier === 'critical') return 'bg-red-500';
    if (tier === 'action') return 'bg-amber-500';
    return 'bg-slate-700';
  };

  const getTierBadge = (tier) => {
    if (tier === 'critical') return { text: 'CRITICAL', classes: 'bg-red-500/10 border-red-500/20 text-red-400' };
    if (tier === 'action') return { text: 'ACTION', classes: 'bg-amber-500/10 border-amber-500/20 text-amber-400' };
    return null;
  };

  const getTierImpactColor = (tier) => {
    if (tier === 'critical') return 'text-red-500';
    if (tier === 'action') return 'text-amber-500';
    return 'text-slate-600';
  };

  const openApprovalModal = (approval, action, e) => {
    e.stopPropagation();
    setSelectedApproval(approval);
    setApprovalAction(action);
    setActionComment('');
  };

  const closeApprovalModal = () => {
    setSelectedApproval(null);
    setApprovalAction(null);
    setActionComment('');
  };

  const confirmApprovalAction = () => {
    if (approvalAction === 'deny' && !actionComment.trim()) {
      showToast('Please provide a reason for denial', 'error');
      return;
    }
    const actionText = approvalAction === 'approve' ? 'approved' : 'denied';
    showToast(`${selectedApproval.title} ${actionText} successfully`, 'success');
    closeApprovalModal();
  };

  const showToast = (message, type = 'success') => {
    setToastMessage({ message, type });
    setTimeout(() => setToastMessage(null), 3000);
  };

  const activeIncidentCount = 3;

  return (
    <DashboardLayout>
      <div className="p-5 lg:p-8 space-y-8">

        {/* Page Header */}
        <div>
          <h2 className="text-xl font-bold text-white mb-1">Executive Command Dashboard</h2>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span>Administrator</span>
            <span>·</span>
            <span>Command Staff</span>
            <span>·</span>
            <span>Updated 2 minutes ago</span>
          </div>
        </div>

        {/* Executive Snapshot Row — Priority-weighted 4 cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Personnel */}
          <button
            onClick={() => navigate(createPageUrl('PersonnelOverview'))}
            className="bg-slate-800/25 border border-slate-700/30 rounded-xl p-5 text-left hover:border-slate-600/40 transition-colors"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-slate-500 font-medium">Personnel</span>
              <Circle className="w-2 h-2 fill-amber-500 text-amber-500" />
            </div>
            <p className="text-3xl font-bold text-white mb-1">164</p>
            <p className="text-xs text-slate-500">14 vacancies of 178 authorized</p>
          </button>

          {/* Active Critical Incidents — visually dominant */}
          <button
            onClick={() => navigate(createPageUrl('Approvals'))}
            className="bg-slate-800/25 border border-slate-700/40 rounded-xl p-5 text-left hover:border-slate-600/40 transition-colors"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-slate-500 font-medium">Active Critical Incidents</span>
              {activeIncidentCount > 0 && (
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                </span>
              )}
            </div>
            <p className="text-3xl font-extrabold text-white mb-1">{activeIncidentCount}</p>
            <p className="text-xs text-slate-500">1 UOF, 1 facility, 1 staffing</p>
          </button>

          {/* Compliance Status */}
          <div className="bg-slate-800/25 border border-slate-700/30 rounded-xl p-5 text-left">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-slate-500 font-medium">Compliance Status</span>
              <Circle className="w-2 h-2 fill-amber-500 text-amber-500" />
            </div>
            <p className="text-3xl font-bold text-white mb-1">94%</p>
            <p className="text-xs text-slate-500">USMS inspection in 2 days</p>
          </div>

          {/* Budget Snapshot */}
          <button
            onClick={() => navigate(createPageUrl('BudgetResources'))}
            className="bg-slate-800/25 border border-slate-700/30 rounded-xl p-5 text-left hover:border-slate-600/40 transition-colors"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-slate-500 font-medium">Budget Snapshot</span>
              <Circle className="w-2 h-2 fill-emerald-500 text-emerald-500" />
            </div>
            <p className="text-3xl font-bold text-white mb-1">85%</p>
            <p className="text-xs text-slate-500">YTD utilization on track</p>
          </button>
        </div>

        {/* AI Executive Brief — Advisory, not structural */}
        <div className="bg-slate-800/25 border border-slate-700/30 rounded-xl border-l-2 border-l-slate-600/40">
          <button
            onClick={() => setAiBriefExpanded(!aiBriefExpanded)}
            className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-slate-800/10 transition-colors rounded-xl"
          >
            <div className="flex items-center gap-3">
              <h3 className="text-sm font-medium text-slate-300">AI Executive Brief</h3>
              <span className="px-1.5 py-0.5 bg-slate-700/30 text-[11px] text-slate-500 rounded">3 Insights</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="hidden sm:inline text-[10px] text-slate-600">92% confidence · 4 sources · 3m ago</span>
              {aiBriefExpanded ? <ChevronUp className="w-4 h-4 text-slate-600" /> : <ChevronDown className="w-4 h-4 text-slate-600" />}
            </div>
          </button>

          {aiBriefExpanded && (
            <div className="px-5 pb-5 space-y-3 border-t border-slate-700/20 pt-3">
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 flex-shrink-0"></div>
                <div>
                  <p className="text-sm text-slate-300"><span className="text-red-400 font-medium">Staffing Risk:</span> B-Shift at 75% (9/12 deputies). Zones 4 and 7 operating single-officer. OT authorization pending approval.</p>
                  <p className="text-[10px] text-slate-600 mt-1">Sources: CAD roster, HR scheduling, patrol deployment log</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 flex-shrink-0"></div>
                <div>
                  <p className="text-sm text-slate-300"><span className="text-amber-400 font-medium">Budget Alert:</span> Overtime tracking 19% over allocation ($78,240/$65,000 YTD). Two lateral hires would reduce projected year-end overage by $23K.</p>
                  <p className="text-[10px] text-slate-600 mt-1">Sources: Finance system, HR vacancy data, payroll records</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 flex-shrink-0"></div>
                <div>
                  <p className="text-sm text-slate-300"><span className="text-amber-400 font-medium">Compliance:</span> U.S. Marshals inspection Dec 12-14. H2-Pod HVAC repair approval pending. 3 policies require signature before inspection date.</p>
                  <p className="text-[10px] text-slate-600 mt-1">Sources: Compliance database, facilities management, policy tracker</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Pending Approvals — Tiered urgency */}
        <div className="bg-slate-800/25 border border-slate-700/30 rounded-xl">
          <div className="flex items-center justify-between px-5 py-4 pb-3">
            <h3 className="text-sm font-medium text-white">Pending Approvals</h3>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 text-[11px]">
                <button
                  onClick={() => setApprovalFilter('all')}
                  className={`px-2 py-1 rounded ${approvalFilter === 'all' ? 'bg-slate-700/40 text-white' : 'text-slate-600 hover:text-slate-400'}`}
                >
                  All ({dashboardApprovals.length})
                </button>
                <button
                  onClick={() => setApprovalFilter('critical')}
                  className={`px-2 py-1 rounded ${approvalFilter === 'critical' ? 'bg-slate-700/40 text-white' : 'text-slate-600 hover:text-slate-400'}`}
                >
                  Critical ({criticalCount})
                </button>
                <button
                  onClick={() => setApprovalFilter('action')}
                  className={`px-2 py-1 rounded ${approvalFilter === 'action' ? 'bg-slate-700/40 text-white' : 'text-slate-600 hover:text-slate-400'}`}
                >
                  Action ({actionCount})
                </button>
                <button
                  onClick={() => setApprovalFilter('standard')}
                  className={`px-2 py-1 rounded ${approvalFilter === 'standard' ? 'bg-slate-700/40 text-white' : 'text-slate-600 hover:text-slate-400'}`}
                >
                  Standard ({dashboardApprovals.length - criticalCount - actionCount})
                </button>
              </div>
              <button
                onClick={() => navigate(createPageUrl('Approvals'))}
                className="text-xs text-slate-500 hover:text-slate-400"
              >
                View all
              </button>
            </div>
          </div>
          <div className="px-5 pb-5 space-y-2">
            {filteredApprovals.slice(0, 6).map((item) => {
              const badge = getTierBadge(item.tier);
              return (
                <div
                  key={item.id}
                  onClick={() => navigate(createPageUrl('Approvals'))}
                  className="flex items-center justify-between gap-4 p-3 rounded-lg border border-slate-700/20 cursor-pointer hover:bg-slate-800/20 transition-colors"
                >
                  {/* Left urgency strip — color-coded by tier */}
                  <div className={`w-0.5 self-stretch rounded-full flex-shrink-0 ${getTierStripColor(item.tier)}`}></div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-medium text-white">{item.type}</p>
                      {badge && <span className={`px-1.5 py-0.5 border rounded text-[11px] font-medium ${badge.classes}`}>{badge.text}</span>}
                      <span className="text-[11px] text-slate-600">{getTimePending(item.timePendingMinutes)} ago</span>
                    </div>
                    <div className="flex items-center gap-3 text-[11px] text-slate-500">
                      <span>{item.name}</span>
                      {item.amount && <span>${item.amount.toLocaleString()}</span>}
                      {item.impact && <span className={getTierImpactColor(item.tier)}>{item.impact}</span>}
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <button
                      onClick={(e) => openApprovalModal(item, 'approve', e)}
                      className="p-1.5 border border-slate-700/30 hover:bg-emerald-500/10 hover:border-emerald-500/20 rounded-lg transition-colors"
                      title="Approve"
                    >
                      <ThumbsUp className="w-3.5 h-3.5 text-slate-500 hover:text-emerald-400" />
                    </button>
                    <button
                      onClick={(e) => openApprovalModal(item, 'deny', e)}
                      className="p-1.5 border border-slate-700/30 hover:bg-red-500/10 hover:border-red-500/20 rounded-lg transition-colors"
                      title="Deny"
                    >
                      <XCircle className="w-3.5 h-3.5 text-slate-500 hover:text-red-400" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Division Status — Strict green/amber/red semantic colors */}
        <div>
          <h3 className="text-sm font-medium text-white mb-4">Division Status</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { name: 'Patrol', status: 'B-Shift 75%', severity: 'red', staffing: '56/65', route: 'PersonnelOverview' },
              { name: 'Detention', status: '91.5% Capacity', severity: 'amber', staffing: '45/48', route: null },
              { name: 'Investigations', status: '1 Escalation', severity: 'amber', staffing: '22/25', route: null },
              { name: 'Court Services', status: 'Stable', severity: 'green', staffing: '18/18', route: null },
              { name: 'Support Services', status: 'Stable', severity: 'green', staffing: '23/22', route: null }
            ].map((div, idx) => (
              <button
                key={idx}
                onClick={() => div.route && navigate(createPageUrl(div.route))}
                className="bg-slate-800/25 border border-slate-700/30 rounded-xl p-4 text-left hover:border-slate-600/40 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-white">{div.name}</span>
                  <div className={`w-2 h-2 rounded-full ${
                    div.severity === 'red' ? 'bg-red-500' :
                    div.severity === 'amber' ? 'bg-amber-500' : 'bg-emerald-500'
                  }`}></div>
                </div>
                <p className={`text-xs font-medium mb-1 ${
                  div.severity === 'red' ? 'text-red-400' :
                  div.severity === 'amber' ? 'text-amber-400' : 'text-emerald-400'
                }`}>{div.status}</p>
                <p className="text-[11px] text-slate-600">{div.staffing} staffed</p>
              </button>
            ))}
          </div>
        </div>

        {/* Staffing Levels — Reduced visual weight, % dominant */}
        <div className="bg-slate-800/25 border border-slate-700/30 rounded-xl p-5">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-sm font-medium text-white">Staffing Levels</h3>
            <span className="text-[11px] text-slate-600">164/178 authorized (92.1%)</span>
          </div>
          <div className="space-y-3.5">
            {[
              { division: 'Patrol Division', current: 56, authorized: 65, percentage: 86, note: 'B-Shift critical' },
              { division: 'Investigations', current: 22, authorized: 25, percentage: 88, note: '3 positions posted' },
              { division: 'Detention', current: 45, authorized: 48, percentage: 94, note: 'Rodriguez starting Mon' },
              { division: 'Court Services', current: 18, authorized: 18, percentage: 100, note: '' },
              { division: 'Support Services', current: 23, authorized: 22, percentage: 105, note: 'Grant-funded' }
            ].map((div, idx) => (
              <div key={idx}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-slate-400">{div.division}</span>
                    {div.note && <span className="text-[10px] text-slate-600">({div.note})</span>}
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className="text-xs text-slate-600">{div.current}/{div.authorized}</span>
                    <span className={`text-sm font-semibold ${div.percentage >= 90 ? 'text-emerald-500' : 'text-amber-500'}`}>{div.percentage}%</span>
                  </div>
                </div>
                <div className="w-full h-1 bg-slate-800/50 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${div.percentage >= 90 ? 'bg-emerald-500/40' : 'bg-amber-500/40'}`} style={{ width: `${Math.min(div.percentage, 100)}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Federal Compliance & Audits */}
        <div className="bg-slate-800/25 border border-slate-700/30 rounded-xl p-5">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <h3 className="text-sm font-medium text-white">Federal Compliance & Audits</h3>
              <span className="text-[10px] text-red-400 font-medium">USMS Dec 12-14</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* USMS Readiness */}
            <div className="border border-slate-700/20 rounded-lg p-5">
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-4 h-4 text-slate-500" />
                <span className="text-sm font-medium text-white">USMS Inspection Readiness</span>
              </div>
              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-1 text-xs">
                    <span className="text-slate-500">Databases</span>
                    <span className="text-emerald-500">47/47</span>
                  </div>
                  <div className="w-full h-1 bg-slate-800/50 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500/40 rounded-full" style={{width: '100%'}} />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1 text-xs">
                    <span className="text-slate-500">Policies</span>
                    <span className="text-amber-500">44/47</span>
                  </div>
                  <div className="w-full h-1 bg-slate-800/50 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500/40 rounded-full" style={{width: '94%'}} />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1 text-xs">
                    <span className="text-slate-500">Training Records</span>
                    <span className="text-amber-500">156/164</span>
                  </div>
                  <div className="w-full h-1 bg-slate-800/50 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500/40 rounded-full" style={{width: '95%'}} />
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-700/20 text-[11px] text-slate-500">
                <p>3 policies pending review · 8 deputies need recertification</p>
                <p className="text-slate-600 mt-1">POC: Major Anderson (Detention)</p>
              </div>
            </div>

            {/* ACA Status — Concise bullet-like format */}
            <div className="border border-slate-700/20 rounded-lg p-5">
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-4 h-4 text-slate-500" />
                <span className="text-sm font-medium text-white">ACA Re-Accreditation</span>
              </div>
              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Status</span>
                  <span className="text-emerald-500 font-medium">Accredited</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Expires</span>
                  <span className="text-slate-400">August 2025</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Issue</span>
                  <span className="text-red-400">H2 HVAC — 72h window</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Repair</span>
                  <span className="text-amber-400">Pending approval</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Approval/Deny Modal */}
      {selectedApproval && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={closeApprovalModal}
          />
          <div className="relative bg-slate-900 border border-slate-700/50 rounded-2xl p-6 max-w-md w-full shadow-2xl">
            <div className="flex items-start gap-3 mb-5">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center border ${
                approvalAction === 'approve' ? 'border-emerald-500/20' : 'border-red-500/20'
              }`}>
                {approvalAction === 'approve' ? (
                  <ThumbsUp className="w-5 h-5 text-emerald-400" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-400" />
                )}
              </div>
              <div className="flex-1">
                <h3 className="text-base font-semibold text-white mb-0.5">
                  {approvalAction === 'approve' ? 'Approve' : 'Deny'} {selectedApproval.title}?
                </h3>
                <p className="text-xs text-slate-500">
                  {selectedApproval.name} · {selectedApproval.details}
                </p>
              </div>
            </div>

            <div className="mb-5">
              <label className="block text-sm text-slate-400 mb-2">
                {approvalAction === 'approve' ? 'Comments (optional)' : 'Reason for denial (required)'}
              </label>
              <textarea
                value={actionComment}
                onChange={(e) => setActionComment(e.target.value)}
                placeholder={approvalAction === 'approve' ? 'Add any comments...' : 'Please provide a reason...'}
                rows={3}
                className="w-full px-3.5 py-2.5 bg-slate-950/50 border border-slate-700/40 rounded-lg text-white placeholder-slate-600 focus:outline-none focus:border-slate-600 resize-none text-sm"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={closeApprovalModal}
                className="flex-1 px-4 py-2.5 bg-slate-800/40 hover:bg-slate-800/60 border border-slate-700/50 rounded-xl text-white text-sm font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmApprovalAction}
                className={`flex-1 px-4 py-2.5 rounded-xl text-white text-sm font-medium transition-colors ${
                  approvalAction === 'approve'
                    ? 'bg-emerald-600 hover:bg-emerald-700'
                    : 'bg-red-600 hover:bg-red-700'
                }`}
              >
                Confirm {approvalAction === 'approve' ? 'Approval' : 'Denial'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50">
          <div className={`px-4 py-3 rounded-lg border flex items-center gap-2 text-sm ${
            toastMessage.type === 'success'
              ? 'bg-slate-900 border-emerald-500/20 text-emerald-400'
              : 'bg-slate-900 border-red-500/20 text-red-400'
          }`}>
            {toastMessage.type === 'success' ? (
              <CheckCircle className="w-4 h-4" />
            ) : (
              <AlertCircle className="w-4 h-4" />
            )}
            <p>{toastMessage.message}</p>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

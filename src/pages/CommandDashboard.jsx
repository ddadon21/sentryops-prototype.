import React, { useState } from 'react';
import { Users, AlertCircle, CheckCircle, Shield, ThumbsUp, XCircle, ChevronDown, ChevronUp, Circle, ArrowUpRight, ArrowDownRight, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import DashboardLayout from '../layouts/DashboardLayout';
import { MetricCard, MetricRow, SectionContainer, AlertStrip, PageHeader, SURFACE, SPACING, TYPE, STATUS_DOT, STATUS_DOT_MUTED, DOT_SIZE, DOT_SIZE_SMALL } from '../components/shared';

export default function CommandDashboard() {
  const navigate = useNavigate();
  const [selectedApproval, setSelectedApproval] = useState(null);
  const [approvalAction, setApprovalAction] = useState(null);
  const [actionComment, setActionComment] = useState('');
  const [toastMessage, setToastMessage] = useState(null);
  const [aiBriefExpanded, setAiBriefExpanded] = useState(false);
  const [hoveredDivision, setHoveredDivision] = useState(null);

  // Approval items with tiered urgency:
  // critical = life/safety or legal/compliance risk within 24h
  // action   = operational risk requiring near-term decision
  // standard = routine workflow
  const dashboardApprovals = [
    {
      id: 1,
      type: 'Use of Force Review',
      name: 'Deputy Johnson, Marcus #D-4167',
      details: 'B-Pod incident — OC spray deployment on inmate MARTINEZ',
      tier: 'critical',
      division: 'Detention',
      title: 'Use of Force Review',
      context: 'Inmate refused direct orders, took fighting stance. OC spray deployed. Full restraint applied. Medical evaluation completed — no injuries. Body cam footage available.',
      submittedBy: 'Shift Supervisor Williams',
      timePendingMinutes: 15,
      deadline: '24 hours',
      impact: 'Compliance deadline',
      financial: null
    },
    {
      id: 2,
      type: 'Emergency Purchase',
      name: 'Detention — Major Wilson',
      details: 'H2-Pod HVAC Repairs',
      tier: 'critical',
      division: 'Detention Facilities',
      title: 'Emergency Purchase Order',
      context: 'Critical HVAC failure in H2-Pod. Temperature at 84°F. Immediate repair required to maintain ACA accreditation standards.',
      submittedBy: 'Facilities Director Chen',
      timePendingMinutes: 120,
      deadline: 'Immediate',
      impact: 'ACA compliance risk',
      financial: '$23,500'
    },
    {
      id: 3,
      type: 'Overtime Authorization',
      name: 'Patrol — Capt. Rodriguez',
      details: 'B-Shift staffing shortage — 160 hrs @ $52/hr',
      tier: 'action',
      division: 'Patrol',
      title: 'Overtime Authorization',
      context: '3 deputies out (2 FMLA, 1 Workers Comp). Minimum staffing requires 12 road deputies. Requesting OT authorization for next 2 weeks.',
      submittedBy: 'Capt. Rodriguez',
      timePendingMinutes: 90,
      deadline: '48 hours',
      impact: 'Below min staffing',
      financial: '$8,320'
    },
    {
      id: 4,
      type: 'Vehicle Replacement',
      name: 'Fleet Mgmt — Anderson',
      details: 'Patrol Unit 247 — total loss (pursuit)',
      tier: 'action',
      division: 'Support Services',
      title: 'Emergency Vehicle Replacement',
      context: 'Unit 247 totaled in pursuit. Insurance claim filed. Immediate replacement needed — patrol fleet at minimum operational capacity.',
      submittedBy: 'Fleet Manager Anderson',
      timePendingMinutes: 240,
      deadline: '72 hours',
      impact: 'Fleet at min capacity',
      financial: '$48,500'
    },
    {
      id: 5,
      type: 'Hiring Decision',
      name: 'Rodriguez, Elena M.',
      details: 'Certified CO — Detention Division',
      tier: 'standard',
      division: 'Detention',
      title: 'Hiring Decision',
      context: 'Background investigation complete. 5 years experience. All certifications current. Detention at 94% staffing — approval needed to extend offer.',
      submittedBy: 'HR Director Thompson',
      timePendingMinutes: 1440,
      deadline: '5 days',
      impact: 'Position vacant 45 days',
      financial: null
    },
    {
      id: 6,
      type: 'Policy Exception',
      name: 'Lt. Anderson — Investigations',
      details: 'Extended surveillance — Narcotics Case #2024-1847',
      tier: 'standard',
      division: 'Investigations',
      title: 'Policy Exception Request',
      context: 'Multi-agency narcotics investigation. DEA requesting 30-day extension for surveillance operations.',
      submittedBy: 'Lt. Anderson',
      timePendingMinutes: 2880,
      deadline: '7 days',
      impact: null,
      financial: '$12,000'
    },
    {
      id: 7,
      type: 'Leave Request',
      name: 'Deputy Chen, Michael #D-4521',
      details: 'FMLA — Medical leave: Dec 15 – Jan 5',
      tier: 'standard',
      division: 'Detention',
      title: 'FMLA Leave Request',
      context: 'Approved medical procedure. FMLA documentation complete. Coverage plan submitted by Sgt. Williams.',
      submittedBy: 'Deputy Chen',
      timePendingMinutes: 720,
      deadline: '10 days',
      impact: null,
      financial: null
    },
    {
      id: 8,
      type: 'Training Authorization',
      name: 'Detention — Sgt. Williams',
      details: 'CIT Training — 8 deputies',
      tier: 'standard',
      division: 'Training',
      title: 'Training Authorization',
      context: '40-hour CIT certification. Addresses mental health incidents in detention. Grant funding available for 50% reimbursement.',
      submittedBy: 'Training Coordinator Smith',
      timePendingMinutes: 4320,
      deadline: '14 days',
      impact: null,
      financial: '$6,400'
    }
  ];

  const getTimePending = (minutesAgo) => {
    if (minutesAgo < 60) return `${minutesAgo}m`;
    if (minutesAgo < 1440) return `${Math.floor(minutesAgo / 60)}h`;
    return `${Math.floor(minutesAgo / 1440)}d`;
  };

  const getTierStripColor = (tier) => {
    if (tier === 'critical') return STATUS_DOT.critical;
    if (tier === 'action') return STATUS_DOT.warning;
    return 'bg-slate-600';
  };

  const getTierBadge = (tier) => {
    if (tier === 'critical') return { text: 'CRITICAL', classes: 'bg-red-500/10 border-red-500/20 text-red-400' };
    if (tier === 'action') return { text: 'ACTION', classes: 'bg-amber-500/10 border-amber-500/20 text-amber-400' };
    return null;
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

  // Top 3 approvals by severity
  const topApprovals = dashboardApprovals.slice(0, 3);

  // Division data with hover drill info
  const divisions = [
    { name: 'Patrol', status: 'B-Shift 75%', severity: 'red', staffing: '56/65', route: 'PersonnelOverview',
      drill: 'Min required: 12 deputies\nCurrently deployed: 9\nCoverage risk: Zones 4, 7' },
    { name: 'Detention', status: '91.5% Capacity', severity: 'amber', staffing: '45/48', route: null,
      drill: 'Population: 1,098 / 1,200\nFederal holds: 247\nMedical: 14 current' },
    { name: 'Investigations', status: '1 Escalation', severity: 'amber', staffing: '22/25', route: null,
      drill: 'Active cases: 142\nDEA joint op pending\n3 positions posted' },
    { name: 'Court Services', status: 'Stable', severity: 'green', staffing: '18/18', route: null,
      drill: 'All courtrooms covered\nTransport schedule nominal' },
    { name: 'Support Services', status: 'Stable', severity: 'green', staffing: '23/22', route: null,
      drill: '1 grant-funded position\nFleet at min capacity' }
  ];

  return (
    <DashboardLayout>
      <div className="p-5 lg:p-8 space-y-8">

        {/* Page Header — uses shared PageHeader */}
        <PageHeader
          title="Executive Command Dashboard"
          subtitle={
            <>
              <span>Administrator</span>
              <span>·</span>
              <span>Command Staff</span>
              <span>·</span>
              <span>Updated 2 minutes ago</span>
            </>
          }
        />

        {/* Executive Snapshot Row — uses shared MetricCard */}
        <div className={`grid grid-cols-2 lg:grid-cols-4 ${SPACING.gridGap}`}>
          {/* Personnel */}
          <MetricCard
            title="Personnel"
            value={164}
            status="warning"
            trend={{ direction: 'up', value: '+2', sentiment: 'positive' }}
            subtext="14 Vacancies (7.8%)"
            alert={{ text: '3 below safety threshold (Patrol B-Shift)', severity: 'critical' }}
            onClick={() => navigate(createPageUrl('PersonnelOverview'))}
          />

          {/* Active Critical Incidents — custom indicator (pulsing dot) */}
          <button
            onClick={() => navigate(createPageUrl('Approvals'))}
            className={`${SURFACE.card} ${SPACING.card} text-left ${SURFACE.cardHover} transition-colors`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className={TYPE.label}>Active Critical Incidents</span>
              {activeIncidentCount > 0 && (
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                </span>
              )}
            </div>
            <div className="flex items-baseline gap-2 mb-1">
              <p className="text-3xl font-extrabold text-white">{activeIncidentCount}</p>
              <span className={TYPE.meta}>Active (2 escalated)</span>
            </div>
            <p className="text-xs text-slate-400 mb-1">1 UOF · 1 Facility · 1 Staffing</p>
            <p className="text-[11px] text-amber-400">Oldest: 1h 22m</p>
          </button>

          {/* Compliance Status */}
          <MetricCard
            title="Compliance Readiness"
            value="94%"
            status="warning"
            subtext=""
          >
            <div className="flex items-center gap-2 text-[11px] text-slate-400 -mt-2 mb-1">
              <span>Policies 94%</span>
              <span className="text-slate-600">·</span>
              <span>Training 91%</span>
              <span className="text-slate-600">·</span>
              <span>Audit 100%</span>
            </div>
            <p className="text-[11px] text-amber-400">USMS inspection in 2 days</p>
          </MetricCard>

          {/* Budget Snapshot */}
          <MetricCard
            title="Budget Utilization"
            value="85%"
            status="success"
            trend={{ direction: 'up', value: '+1.2%', sentiment: 'negative' }}
            subtext="Forecast variance +1.2% from plan"
            alert={{ text: 'OT spend 19% above baseline', severity: 'warning' }}
            onClick={() => navigate(createPageUrl('BudgetResources'))}
          />
        </div>

        {/* Executive Intelligence Summary — uses AlertStrip */}
        <AlertStrip severity="neutral" className="!p-0">
          <div className="-ml-3 -mt-1.5">
            <button
              onClick={() => setAiBriefExpanded(!aiBriefExpanded)}
              className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-slate-800/10 transition-colors rounded-xl"
            >
              <div className="flex items-center gap-3">
                <h3 className={TYPE.h2}>Executive Intelligence Summary</h3>
                <span className="px-1.5 py-0.5 bg-slate-700/30 text-[11px] text-slate-500 rounded">3 Insights</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="hidden sm:inline text-[10px] text-slate-600">AI-assisted synthesis · 4 sources · 3m ago</span>
                {aiBriefExpanded ? <ChevronUp className="w-4 h-4 text-slate-600" /> : <ChevronDown className="w-4 h-4 text-slate-600" />}
              </div>
            </button>

            {aiBriefExpanded && (
              <div className="px-5 pb-5 space-y-4 border-t border-slate-700/20 pt-4">
                {/* Staffing Risk */}
                <div className="flex items-start gap-3">
                  <div className={`${DOT_SIZE_SMALL} ${STATUS_DOT.critical} mt-1.5 flex-shrink-0`}></div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-red-400">Staffing Risk — B-Shift @ 75%</p>
                    <ul className="space-y-0.5 text-[13px] text-slate-300">
                      <li>Minimum threshold breached (9 of 12 required)</li>
                      <li>2 deputies recommended within 4 hrs</li>
                      <li>Impact: Patrol response time +18%</li>
                    </ul>
                    <p className="text-[10px] text-slate-500 pt-0.5">CAD roster · HR scheduling · patrol deployment log</p>
                  </div>
                </div>

                {/* Budget Alert */}
                <div className="flex items-start gap-3">
                  <div className={`${DOT_SIZE_SMALL} ${STATUS_DOT.warning} mt-1.5 flex-shrink-0`}></div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-amber-400">Budget Alert — OT 19% Over Allocation</p>
                    <ul className="space-y-0.5 text-[13px] text-slate-300">
                      <li>OT spend $78,240 vs $65,000 allocation</li>
                      <li>2 lateral hires would reduce year-end overage by $23K</li>
                      <li>Action: Initiate hiring by Dec 15</li>
                    </ul>
                    <p className="text-[10px] text-slate-500 pt-0.5">Finance system · HR vacancy data · payroll records</p>
                  </div>
                </div>

                {/* Compliance */}
                <div className="flex items-start gap-3">
                  <div className={`${DOT_SIZE_SMALL} ${STATUS_DOT.warning} mt-1.5 flex-shrink-0`}></div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-amber-400">Compliance — USMS Inspection Dec 12–14</p>
                    <ul className="space-y-0.5 text-[13px] text-slate-300">
                      <li>H2-Pod HVAC repair requires approval within 48 hrs</li>
                      <li>3 policies require command signature before inspection</li>
                      <li>Risk: ACA non-compliance if HVAC unresolved</li>
                    </ul>
                    <p className="text-[10px] text-slate-500 pt-0.5">Compliance database · facilities management · policy tracker</p>
                  </div>
                </div>

                <div className="pt-2 text-[10px] text-slate-600">
                  Confidence: 92% · Model last trained on agency data 12h ago
                </div>
              </div>
            )}
          </div>
        </AlertStrip>

        {/* Pending Approvals — uses SectionContainer */}
        <SectionContainer
          title="Pending Approvals"
          headerRight={
            <button
              onClick={() => navigate(createPageUrl('Approvals'))}
              className="text-xs text-amber-400/80 hover:text-amber-300"
            >
              View all {dashboardApprovals.length} approvals →
            </button>
          }
        >
          <div className="space-y-2">
            {topApprovals.map((item) => {
              const badge = getTierBadge(item.tier);
              return (
                <div
                  key={item.id}
                  className="rounded-lg border border-slate-700/20 hover:bg-slate-800/20 transition-colors"
                >
                  <div className="flex items-center gap-4 p-3">
                    <div className={`w-0.5 self-stretch rounded-full flex-shrink-0 ${getTierStripColor(item.tier)}`}></div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-sm font-medium text-white">{item.type}</p>
                        {badge && <span className={`px-1.5 py-0.5 border rounded text-[11px] font-medium ${badge.classes}`}>{badge.text}</span>}
                        <span className={TYPE.micro}>{getTimePending(item.timePendingMinutes)} ago</span>
                      </div>
                      <div className="flex items-center gap-2 text-[11px]">
                        <span className="text-slate-400">{item.division}</span>
                        <span className="text-slate-600">·</span>
                        <span className="text-slate-400">{item.name}</span>
                        {item.financial && (
                          <>
                            <span className="text-slate-600">·</span>
                            <span className="text-slate-400">{item.financial}</span>
                          </>
                        )}
                        {item.impact && (
                          <>
                            <span className="text-slate-600">·</span>
                            <span className={item.tier === 'critical' ? 'text-red-400' : item.tier === 'action' ? 'text-amber-400' : 'text-slate-400'}>{item.impact}</span>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button
                        onClick={(e) => openApprovalModal(item, 'approve', e)}
                        className="px-3 py-1.5 text-xs font-medium text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/10 rounded-lg transition-colors"
                      >
                        Approve
                      </button>
                      <button
                        onClick={(e) => openApprovalModal(item, 'deny', e)}
                        className="px-3 py-1.5 text-xs font-medium text-slate-400 border border-slate-700/30 hover:bg-slate-700/20 rounded-lg transition-colors"
                      >
                        Escalate
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 px-3 pb-2 ml-[10px] text-[10px] text-slate-500">
                    <Shield className="w-3 h-3 text-slate-600" />
                    <span>Logged to audit trail</span>
                    {item.impact && (
                      <>
                        <span className="text-slate-600">·</span>
                        <span>Impact: {item.impact}</span>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </SectionContainer>

        {/* Federal Compliance & Audits — uses SectionContainer */}
        <SectionContainer
          title="Federal Compliance & Audits"
          headerRight={<span className="text-[10px] text-red-400 font-medium">USMS Dec 12–14</span>}
        >
          <div className={`grid grid-cols-1 md:grid-cols-2 ${SPACING.gridGap}`}>
            {/* USMS Readiness */}
            <div className="border border-slate-700/20 rounded-lg p-5">
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-4 h-4 text-slate-500" />
                <span className={TYPE.h2}>USMS Inspection Readiness</span>
              </div>
              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-1 text-xs">
                    <span className="text-slate-400">Databases</span>
                    <span className="text-emerald-400">47/47</span>
                  </div>
                  <div className="w-full h-1 bg-slate-800/50 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500/40 rounded-full" style={{width: '100%'}} />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1 text-xs">
                    <span className="text-slate-400">Policies</span>
                    <span className="text-amber-400">44/47</span>
                  </div>
                  <div className="w-full h-1 bg-slate-800/50 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500/40 rounded-full" style={{width: '94%'}} />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1 text-xs">
                    <span className="text-slate-400">Training Records</span>
                    <span className="text-amber-400">156/164</span>
                  </div>
                  <div className="w-full h-1 bg-slate-800/50 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500/40 rounded-full" style={{width: '95%'}} />
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-700/20 text-[11px] text-slate-400">
                <p>3 policies pending review · 8 deputies need recertification</p>
                <p className="text-slate-500 mt-1">POC: Major Anderson (Detention)</p>
              </div>
            </div>

            {/* ACA Status */}
            <div className="border border-slate-700/20 rounded-lg p-5">
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-4 h-4 text-slate-500" />
                <span className={TYPE.h2}>ACA Re-Accreditation</span>
              </div>
              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Status</span>
                  <span className="text-emerald-400 font-medium">Accredited</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Expires</span>
                  <span className="text-slate-300">August 2025</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Next Review</span>
                  <span className="text-slate-300">184 days</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Risk Level</span>
                  <span className="text-amber-400 font-medium">Moderate</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Issue</span>
                  <span className="text-red-400">H2 HVAC — 72h window</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Repair</span>
                  <span className="text-amber-400">Pending approval</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Assigned To</span>
                  <span className="text-slate-300">Facilities Director Chen</span>
                </div>
              </div>
            </div>
          </div>
        </SectionContainer>

        {/* Division Status — neutral text, colored dot only, hover drill */}
        <div>
          <h3 className={`${TYPE.h2} mb-4`}>Division Status</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {divisions.map((div, idx) => (
              <button
                key={idx}
                onClick={() => div.route && navigate(createPageUrl(div.route))}
                onMouseEnter={() => setHoveredDivision(idx)}
                onMouseLeave={() => setHoveredDivision(null)}
                className={`${SURFACE.card} p-4 text-left ${SURFACE.cardHover} transition-colors relative`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-white">{div.name}</span>
                  <div className={`${DOT_SIZE} ${
                    div.severity === 'red' ? STATUS_DOT.critical :
                    div.severity === 'amber' ? STATUS_DOT.warning : STATUS_DOT.success
                  }`}></div>
                </div>
                <p className="text-xs text-slate-300 mb-1">{div.status}</p>
                <p className={TYPE.micro}>{div.staffing} staffed</p>

                {/* Hover drill tooltip */}
                {hoveredDivision === idx && (
                  <div className="absolute left-0 right-0 top-full mt-1 z-20 bg-slate-800 border border-slate-700/50 rounded-lg p-3 shadow-xl">
                    {div.drill.split('\n').map((line, i) => (
                      <p key={i} className="text-[11px] text-slate-300 leading-relaxed">{line}</p>
                    ))}
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Staffing Levels — uses SectionContainer */}
        <SectionContainer
          title="Staffing Levels"
          headerRight={<span className={TYPE.micro}>164/178 authorized (92.1%)</span>}
        >
          <div className="space-y-3.5">
            {[
              { division: 'Patrol Division', current: 56, authorized: 65, percentage: 86, minThreshold: 80, note: 'B-Shift critical' },
              { division: 'Investigations', current: 22, authorized: 25, percentage: 88, minThreshold: 80, note: '3 positions posted' },
              { division: 'Detention', current: 45, authorized: 48, percentage: 94, minThreshold: 85, note: 'Rodriguez starting Mon' },
              { division: 'Court Services', current: 18, authorized: 18, percentage: 100, minThreshold: 90, note: '' },
              { division: 'Support Services', current: 23, authorized: 22, percentage: 105, minThreshold: 85, note: 'Grant-funded' }
            ].map((div, idx) => (
              <div key={idx}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-slate-300">{div.division}</span>
                    {div.note && <span className="text-[10px] text-slate-400">({div.note})</span>}
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className={TYPE.meta}>{div.current}/{div.authorized}</span>
                    <span className={`text-sm font-semibold ${div.percentage >= 90 ? 'text-emerald-400' : div.percentage >= div.minThreshold ? 'text-amber-400' : 'text-red-400'}`}>{div.percentage}%</span>
                  </div>
                </div>
                <div className="relative w-full h-1 bg-slate-800/50 rounded-full overflow-visible">
                  <div className={`h-full rounded-full ${div.percentage >= 90 ? 'bg-emerald-500/40' : div.percentage >= div.minThreshold ? 'bg-amber-500/40' : 'bg-red-500/40'}`} style={{ width: `${Math.min(div.percentage, 100)}%` }} />
                  {/* Min threshold marker */}
                  <div
                    className="absolute top-[-3px] w-[1.5px] h-[calc(100%+6px)] bg-red-500/50 rounded-full"
                    style={{ left: `${div.minThreshold}%` }}
                    title={`Min safe: ${div.minThreshold}%`}
                  />
                </div>
              </div>
            ))}
            <div className="flex items-center gap-3 pt-2 text-[10px] text-slate-500">
              <div className="flex items-center gap-1.5">
                <div className="w-[1.5px] h-2.5 bg-red-500/50 rounded-full"></div>
                <span>Min safe threshold</span>
              </div>
            </div>
          </div>
        </SectionContainer>

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
                <p className={TYPE.meta}>
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

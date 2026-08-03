import React, { useState, useEffect, useRef } from 'react';
import {
  AlertCircle, CheckCircle, Shield, ThumbsUp, XCircle, FileText
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import DashboardLayout from '../layouts/DashboardLayout';
import { KPICard, SectionHeader } from '../components/dashboard';

export default function CommandDashboard() {
  const navigate = useNavigate();

  const [selectedApproval, setSelectedApproval] = useState(null);
  const [actionComment, setActionComment] = useState('');
  const [toastMessage, setToastMessage] = useState(null);
  const [hoveredDivision, setHoveredDivision] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const toastTimerRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (d) =>
    d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
  const formatDate = (d) =>
    d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });

  // ── Static data ─────────────────────────────────────────────────────────────
  const dashboardApprovals = [
    { id: 1, type: 'Use of Force Review', name: 'Deputy Johnson, Marcus #D-4167', details: 'B-Pod incident — OC spray deployment', tier: 'critical', division: 'Detention', title: 'Use of Force Review', context: 'Inmate refused direct orders, took fighting stance. OC spray deployed. Medical evaluation completed — no injuries.', submittedBy: 'Shift Supervisor Williams', timePendingMinutes: 15, deadline: 'due 24 hours', impact: 'Compliance deadline', financial: null },
    { id: 2, type: 'Emergency Purchase', name: 'Detention — Major Wilson', details: 'H2-Pod HVAC Repairs', tier: 'critical', division: 'Detention Facilities', title: 'Emergency Purchase Order', context: 'Critical HVAC failure in H2-Pod. Temperature at 84°F. Immediate repair required to maintain ACA accreditation standards.', submittedBy: 'Facilities Director Chen', timePendingMinutes: 120, deadline: 'due Immediate', impact: 'ACA compliance risk', financial: '$23,500' },
    { id: 3, type: 'Overtime Authorization', name: 'Patrol — Capt. Rodriguez', details: 'B-Shift staffing shortage — 160 hrs @ $52/hr', tier: 'action', division: 'Patrol', title: 'Overtime Authorization', context: '3 deputies out (2 FMLA, 1 Workers Comp). Minimum staffing requires 12 road deputies.', submittedBy: 'Capt. Rodriguez', timePendingMinutes: 60, deadline: 'due 48 hours', impact: 'Below min staffing', financial: '$8,320' },
    { id: 4, type: 'Vehicle Replacement', name: 'Support Services · Fleet Mgmt — Anderson', details: 'Patrol Unit 247 — total loss (pursuit)', tier: 'action', division: 'Support Services', title: 'Emergency Vehicle Replacement', context: 'Unit 247 totaled in pursuit. Insurance claim filed. Patrol fleet at minimum operational capacity.', submittedBy: 'Fleet Manager Anderson', timePendingMinutes: 240, deadline: 'due 72 hours', impact: 'Fleet at min capacity', financial: '$48,500' },
    { id: 5, type: 'Hiring Decision', name: 'Rodriguez, Elena M.', details: 'Certified CO — Detention Division', tier: 'standard', division: 'Detention', title: 'Hiring Decision', context: 'Background investigation complete. 5 years experience. All certifications current.', submittedBy: 'HR Director Thompson', timePendingMinutes: 1440, deadline: 'due 5 days', impact: 'Position vacant 45 days', financial: null },
    { id: 6, type: 'Policy Exception', name: 'Lt. Anderson — Investigations', details: 'Extended surveillance — Narcotics Case #2024-1847', tier: 'standard', division: 'Investigations', title: 'Policy Exception Request', context: 'Multi-agency narcotics investigation. DEA requesting 30-day extension.', submittedBy: 'Lt. Anderson', timePendingMinutes: 2880, deadline: 'due 7 days', impact: null, financial: '$12,000' },
  ];

  const intelligence = [
    {
      tone: 'red', title: 'Staffing Risk — B-Shift @ 75%',
      body: 'Minimum threshold breached (9 of 12 required). Patrol response time +18%.',
      action: 'Assign 2 deputies within 4 hrs',
      sources: 'CAD roster · HR scheduling · deployment log'
    },
    {
      tone: 'amber', title: 'Budget — OT 19% Over',
      body: 'OT spend $78,240 vs $65,000 allocation. 2 lateral hires would cut year-end overage by $23K.',
      action: 'Initiate hiring by Dec 15',
      sources: 'Finance · HR vacancy data · payroll'
    },
    {
      tone: 'amber', title: 'Compliance — USMS Dec 12–14',
      body: 'H2-Pod HVAC repair needs approval within 48 hrs. 3 policies need command signature.',
      action: 'Approve HVAC PO (in queue above)',
      sources: 'Compliance DB · facilities · policy tracker'
    },
  ];

  const complianceBars = [
    { label: 'Databases', value: '47/47', pct: 100, warn: false },
    { label: 'Policies', value: '44/47', pct: 94, warn: true },
    { label: 'Training Records', value: '156/164', pct: 95, warn: true },
  ];

  const divisions = [
    { name: 'Patrol', status: 'B-Shift 75%', severity: 'red', staffing: '56/65', route: 'PersonnelOverview', drill: 'Min required: 12 deputies\nCurrently deployed: 9\nCoverage risk: Zones 4, 7' },
    { name: 'Detention', status: '91.5% capacity', severity: 'amber', staffing: '45/48', route: null, drill: 'Population: 1,098 / 1,200\nFederal holds: 247\nMedical: 14 current' },
    { name: 'Investigations', status: '1 escalation', severity: 'amber', staffing: '22/25', route: null, drill: 'Active cases: 142\nDEA joint op pending\n3 positions posted' },
    { name: 'Court Services', status: 'Stable', severity: 'green', staffing: '18/18', route: null, drill: 'All courtrooms covered\nTransport schedule nominal' },
    { name: 'Support Services', status: 'Stable', severity: 'green', staffing: '23/22', route: null, drill: '1 grant-funded position\nFleet at min capacity' },
  ];

  const staffingLevels = [
    { division: 'Patrol', current: 56, authorized: 65, percentage: 86, minThreshold: 80, note: 'B-Shift critical' },
    { division: 'Investigations', current: 22, authorized: 25, percentage: 88, minThreshold: 80, note: '3 posted' },
    { division: 'Detention', current: 45, authorized: 48, percentage: 94, minThreshold: 85, note: 'Rodriguez starts Mon' },
    { division: 'Court Services', current: 18, authorized: 18, percentage: 100, minThreshold: 90, note: '' },
    { division: 'Support Services', current: 23, authorized: 22, percentage: 105, minThreshold: 85, note: 'grant-funded' },
  ];

  // ── Helpers ─────────────────────────────────────────────────────────────────
  const getTimePending = (m) => m < 60 ? `${m}m` : m < 1440 ? `${Math.floor(m / 60)}h` : `${Math.floor(m / 1440)}d`;

  const getTierBadge = (tier) => {
    if (tier === 'critical') return { text: 'CRITICAL', classes: 'bg-red-100 border-red-200 text-red-700 dark:bg-red-500/10 dark:border-red-500/20 dark:text-red-400' };
    if (tier === 'action') return { text: 'ACTION', classes: 'bg-amber-100 border-amber-200 text-amber-700 dark:bg-amber-500/10 dark:border-amber-500/20 dark:text-amber-400' };
    return null;
  };

  const tierAccent = (tier) =>
    tier === 'critical' ? 'border-l-red-500' :
    tier === 'action' ? 'border-l-amber-500' : 'border-l-slate-300 dark:border-l-slate-700';

  const intelTone = (tone) => tone === 'red'
    ? { dot: 'bg-red-500', title: 'text-red-700 dark:text-red-400', box: 'bg-red-50/60 dark:bg-red-500/5 border-red-100 dark:border-red-500/15' }
    : { dot: 'bg-amber-500', title: 'text-amber-700 dark:text-amber-400', box: 'bg-amber-50/60 dark:bg-amber-500/5 border-amber-100 dark:border-amber-500/15' };

  // ── Approval modal ──────────────────────────────────────────────────────────
  const openReview = (item) => { setSelectedApproval(item); setActionComment(''); };
  const closeReview = () => { setSelectedApproval(null); setActionComment(''); };

  const resolveApproval = (verdict) => {
    if (verdict === 'deny' && !actionComment.trim()) { showToast('Please provide a reason for denial', 'error'); return; }
    showToast(`${selectedApproval.title} ${verdict === 'approve' ? 'approved' : 'denied'} successfully`, 'success');
    closeReview();
  };

  const showToast = (message, type = 'success') => {
    setToastMessage({ message, type });
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => setToastMessage(null), 3500);
  };

  const tierRank = { critical: 0, action: 1, standard: 2 };
  const sortedApprovals = [...dashboardApprovals].sort((a, b) => tierRank[a.tier] - tierRank[b.tier]);

  return (
    <DashboardLayout>
      <div className="p-4 lg:p-6 space-y-5 bg-slate-100 dark:bg-transparent min-h-full">

        {/* ── Page title row ──────────────────────────────────────────────── */}
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div>
            <h1 className="text-xl lg:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              Executive Command Center
            </h1>
            <div className="flex items-center flex-wrap gap-x-2 gap-y-1 mt-1 text-[11px] text-slate-500">
              <span className="font-semibold text-slate-700 dark:text-slate-300">Sheriff Thompson · Administrator</span>
              <span>·</span>
              <span>{formatDate(currentTime)}</span>
              <span>·</span>
              <span>{formatTime(currentTime)} EST</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white dark:bg-zinc-900/40 border border-slate-200 dark:border-slate-700/30 rounded-lg flex-shrink-0">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
            <span className="text-[11px] font-medium text-slate-600 dark:text-slate-300">Sync healthy · updated 2m ago</span>
          </div>
        </div>

        {/* ── Main 2-column layout (Claude Design hierarchy) ──────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-5 items-start">

          {/* ════ LEFT COLUMN ════ */}
          <div className="space-y-5 min-w-0">

            {/* KPI quad */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <KPICard
                accent="amber" label="Personnel" value="164"
                statusLabel="14 vacancies · 3 below safety threshold"
                detail="+2 this week · 164/178 authorized"
              />
              <KPICard
                accent="red" label="Critical Incidents" value="3"
                statusLabel="2 escalated"
                detail="1 UOF · 1 facility · 1 staffing · oldest 1h 22m"
              />
              <KPICard
                accent="red" label="Compliance" value="94%"
                statusLabel="USMS inspection in 2 days"
                detail="Audit 100% · 3 actions before Dec 12"
              />
              <KPICard
                accent="amber" label="Budget Utilization" value="85%"
                statusLabel="OT spend 19% above baseline"
                detail="+1.2% vs plan"
              />
            </div>

            {/* Pending Approvals — requires your action */}
            <div className="bg-white dark:bg-zinc-900/25 border border-slate-200 dark:border-slate-700/30 rounded-xl shadow-sm dark:shadow-none overflow-hidden">
              <div className="px-5 pt-4">
                <SectionHeader
                  title="Pending Approvals — Requires Your Action"
                  action={<span className="text-[10px] text-slate-500">{sortedApprovals.length} pending · sorted by severity</span>}
                />
              </div>
              <div className="divide-y divide-slate-100 dark:divide-slate-800/40">
                {sortedApprovals.map((item) => {
                  const badge = getTierBadge(item.tier);
                  return (
                    <div key={item.id} className={`border-l-[3px] ${tierAccent(item.tier)} px-4 py-3 hover:bg-slate-50 dark:hover:bg-zinc-900/35 transition-colors`}>
                      <div className="flex items-start gap-3 flex-wrap sm:flex-nowrap">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <p className="text-[13px] font-bold text-slate-900 dark:text-white">{item.type}</p>
                            {badge && <span className={`px-1.5 py-0.5 border rounded text-[9px] font-black tracking-wide ${badge.classes}`}>{badge.text}</span>}
                            <span className="text-[10px] text-slate-500">{getTimePending(item.timePendingMinutes)} pending</span>
                          </div>
                          <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5 break-words">
                            {item.division} · {item.name}{item.impact ? ` · ${item.impact}` : ''}
                          </p>
                        </div>
                        <div className="flex items-center gap-3 flex-shrink-0 ml-auto">
                          <div className="text-right">
                            <p className="text-[12px] font-bold tabular-nums text-slate-900 dark:text-white">{item.financial || '—'}</p>
                            <p className={`text-[10px] font-semibold ${item.tier === 'critical' ? 'text-red-700 dark:text-red-400' : item.tier === 'action' ? 'text-amber-700 dark:text-amber-400' : 'text-slate-500'}`}>
                              {item.deadline}
                            </p>
                          </div>
                          <button
                            onClick={() => openReview(item)}
                            className="px-3 py-1.5 text-[12px] font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-zinc-900/60 border border-slate-300 dark:border-slate-600/50 rounded-lg hover:bg-slate-100 dark:hover:bg-zinc-800/60 transition-colors"
                          >
                            Review
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Intelligence Summary */}
            <div className="bg-white dark:bg-zinc-900/25 border border-slate-200 dark:border-slate-700/30 rounded-xl shadow-sm dark:shadow-none overflow-hidden">
              <div className="px-5 pt-4">
                <SectionHeader
                  icon={FileText}
                  title="Intelligence Summary"
                  action={<span className="text-[10px] text-slate-500 hidden sm:inline">AI-assisted synthesis · 4 sources · confidence 92% · 3m ago</span>}
                />
              </div>
              <div className="px-4 pb-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                {intelligence.map((item, i) => {
                  const t = intelTone(item.tone);
                  return (
                    <div key={i} className={`rounded-lg border p-3.5 space-y-1.5 ${t.box}`}>
                      <div className="flex items-center gap-2">
                        <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${t.dot}`}></div>
                        <p className={`text-[13px] font-bold ${t.title}`}>{item.title}</p>
                      </div>
                      <p className="text-[12px] text-slate-700 dark:text-slate-300 leading-relaxed">{item.body}</p>
                      <p className="text-[12px] font-semibold text-slate-800 dark:text-slate-200">→ {item.action}</p>
                      <p className="text-[10px] text-slate-500 pt-0.5">{item.sources}</p>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* ════ RIGHT COLUMN ════ */}
          <div className="space-y-5 min-w-0">

            {/* Compliance */}
            <div className="bg-white dark:bg-zinc-900/25 border border-slate-200 dark:border-slate-700/30 rounded-xl shadow-sm dark:shadow-none p-5">
              <SectionHeader
                icon={Shield}
                title="Compliance"
                action={<span className="text-[10px] font-bold text-red-700 dark:text-red-400">USMS inspection Dec 12–14</span>}
              />
              <div className="space-y-3">
                {complianceBars.map((row) => (
                  <div key={row.label}>
                    <div className="flex items-center justify-between mb-1 text-[12px]">
                      <span className="text-slate-500">{row.label}</span>
                      <span className={row.warn ? 'text-amber-700 dark:text-amber-400 font-medium tabular-nums' : 'text-slate-700 dark:text-slate-300 tabular-nums'}>{row.value}</span>
                    </div>
                    <div className="w-full h-1 bg-slate-200 dark:bg-zinc-900/50 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${row.warn ? 'bg-amber-500 dark:bg-amber-500/40' : 'bg-emerald-500 dark:bg-emerald-500/40'}`} style={{ width: `${row.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-[10px] text-slate-500 mt-3">3 policies pending signature · 8 recertifications due · POC Major Anderson</p>
            </div>

            {/* Division Status */}
            <div className="bg-white dark:bg-zinc-900/25 border border-slate-200 dark:border-slate-700/30 rounded-xl shadow-sm dark:shadow-none p-5">
              <SectionHeader title="Division Status" />
              <div className="space-y-1">
                {divisions.map((div, idx) => (
                  <button
                    key={idx}
                    onClick={() => div.route && navigate(createPageUrl(div.route))}
                    onMouseEnter={() => setHoveredDivision(idx)}
                    onMouseLeave={() => setHoveredDivision(null)}
                    className="w-full flex items-center justify-between gap-3 px-2 py-2 rounded-lg text-left hover:bg-slate-50 dark:hover:bg-zinc-900/35 transition-colors relative"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className={`w-2 h-2 rounded-full flex-shrink-0 ${div.severity === 'red' ? 'bg-red-500' : div.severity === 'amber' ? 'bg-amber-500' : 'bg-emerald-500'}`}></div>
                      <span className="text-[13px] font-semibold text-slate-900 dark:text-white truncate">{div.name}</span>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <span className={`text-[12px] ${div.severity === 'red' ? 'text-red-700 dark:text-red-400 font-semibold' : div.severity === 'amber' ? 'text-amber-700 dark:text-amber-400' : 'text-slate-600 dark:text-slate-400'}`}>
                        {div.status}
                      </span>
                      <span className="text-[11px] text-slate-500 tabular-nums">{div.staffing}</span>
                    </div>
                    {hoveredDivision === idx && (
                      <div className="absolute left-0 right-0 top-full mt-1 z-20 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-slate-700/50 rounded-lg p-3 shadow-xl">
                        {div.drill.split('\n').map((line, i) => (
                          <p key={i} className="text-[11px] text-slate-700 dark:text-slate-300 leading-relaxed">{line}</p>
                        ))}
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Staffing */}
            <div className="bg-white dark:bg-zinc-900/25 border border-slate-200 dark:border-slate-700/30 rounded-xl shadow-sm dark:shadow-none p-5">
              <SectionHeader
                title="Staffing"
                action={<span className="text-[10px] text-slate-500">164/178 authorized · 92.1%</span>}
              />
              <div className="space-y-3">
                {staffingLevels.map((div, idx) => (
                  <div key={idx}>
                    <div className="flex items-center justify-between mb-1.5 gap-2">
                      <div className="flex items-baseline gap-1.5 min-w-0">
                        <span className="text-[13px] text-slate-800 dark:text-slate-300 truncate">{div.division}</span>
                        {div.note && <span className={`text-[10px] truncate ${div.percentage < div.minThreshold + 7 && div.percentage < 90 ? 'text-red-700 dark:text-red-400' : 'text-slate-500'}`}>{div.note}</span>}
                      </div>
                      <span className={`text-[12px] font-bold tabular-nums flex-shrink-0 ${div.percentage >= 90 ? 'text-emerald-600 dark:text-emerald-400' : div.percentage >= div.minThreshold ? 'text-amber-700 dark:text-amber-400' : 'text-red-700 dark:text-red-400'}`}>
                        {div.current}/{div.authorized} · {div.percentage}%
                      </span>
                    </div>
                    <div className="relative w-full h-1 bg-slate-200 dark:bg-zinc-900/50 rounded-full overflow-visible">
                      <div
                        className={`h-full rounded-full ${div.percentage >= 90 ? 'bg-emerald-500 dark:bg-emerald-500/40' : div.percentage >= div.minThreshold ? 'bg-amber-500 dark:bg-amber-500/40' : 'bg-red-500 dark:bg-red-500/40'}`}
                        style={{ width: `${Math.min(div.percentage, 100)}%` }}
                      />
                      <div className="absolute top-[-3px] w-[1.5px] h-[calc(100%+6px)] bg-red-500/50 rounded-full" style={{ left: `${div.minThreshold}%` }} />
                    </div>
                  </div>
                ))}
                <div className="flex items-center gap-1.5 pt-1 text-[10px] text-slate-500">
                  <div className="w-[1.5px] h-2.5 bg-red-500/50 rounded-full"></div>
                  <span>Min safe threshold</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ── REVIEW MODAL ────────────────────────────────────────────────────── */}
      {selectedApproval && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={closeReview} />
          <div className="relative bg-white dark:bg-zinc-950 border border-slate-200 dark:border-slate-700/50 rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center border border-slate-200 dark:border-slate-700/50 flex-shrink-0">
                <FileText className="w-5 h-5 text-slate-600 dark:text-slate-300" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-0.5 break-words">{selectedApproval.title}</h3>
                <p className="text-xs text-slate-500 break-words">{selectedApproval.name} · {selectedApproval.details}</p>
              </div>
            </div>
            <p className="text-[13px] text-slate-700 dark:text-slate-300 leading-relaxed mb-4">{selectedApproval.context}</p>
            <div className="flex items-center justify-between gap-3 text-[11px] text-slate-500 mb-4 flex-wrap">
              <span>Submitted by {selectedApproval.submittedBy}</span>
              {selectedApproval.financial && <span className="font-bold text-slate-800 dark:text-slate-200">{selectedApproval.financial}</span>}
            </div>
            <div className="mb-5">
              <label className="block text-sm text-slate-500 mb-2">Comments (required to deny)</label>
              <textarea
                value={actionComment}
                onChange={(e) => setActionComment(e.target.value)}
                placeholder="Add comments or reason for denial…"
                rows={3}
                className="w-full px-3.5 py-2.5 bg-slate-100 dark:bg-black/50 border border-slate-200 dark:border-slate-700/50 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:border-slate-400 dark:focus:border-slate-600 resize-none text-sm"
              />
            </div>
            <div className="flex gap-3 flex-wrap sm:flex-nowrap">
              <button onClick={closeReview} className="flex-1 px-4 py-2.5 bg-slate-100 dark:bg-zinc-900/30 hover:bg-slate-200 dark:hover:bg-zinc-900/60 border border-slate-200 dark:border-slate-700/30 rounded-xl text-slate-900 dark:text-white text-sm font-medium transition-colors">
                Cancel
              </button>
              <button onClick={() => resolveApproval('deny')} className="flex-1 px-4 py-2.5 rounded-xl text-white text-sm font-medium transition-colors bg-red-600 hover:bg-red-700 flex items-center justify-center gap-1.5">
                <XCircle className="w-4 h-4" /> Deny
              </button>
              <button onClick={() => resolveApproval('approve')} className="flex-1 px-4 py-2.5 rounded-xl text-white text-sm font-medium transition-colors bg-emerald-600 hover:bg-emerald-700 flex items-center justify-center gap-1.5">
                <ThumbsUp className="w-4 h-4" /> Approve
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── TOAST ───────────────────────────────────────────────────────────── */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50">
          <div className={`px-4 py-3 rounded-lg border flex items-center gap-2 text-sm shadow-lg ${
            toastMessage.type === 'success' ? 'bg-slate-900 border-emerald-500/20 text-emerald-400' : 'bg-slate-900 border-red-500/20 text-red-400'
          }`}>
            {toastMessage.type === 'success'
              ? <CheckCircle className="w-4 h-4 flex-shrink-0" />
              : <AlertCircle className="w-4 h-4 flex-shrink-0" />}
            <p className="max-w-xs">{toastMessage.message}</p>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

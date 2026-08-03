import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Paperclip, ChevronDown, ChevronUp, Zap, Download } from 'lucide-react';
import DashboardLayout from '../layouts/DashboardLayout';

// ── Category summary strip ──────────────────────────────────────
const categories = [
  { label: 'CJIS / Data', open: 2, dot: 'bg-red-500', delta: '▲ 1', deltaColor: 'text-red-400' },
  { label: 'Personnel', open: 2, dot: 'bg-slate-600', delta: '—', deltaColor: 'text-slate-600' },
  { label: 'Detention', open: 2, dot: 'bg-red-500', delta: '▼ 1', deltaColor: 'text-emerald-400' },
  { label: 'Fleet & Pursuit', open: 1, dot: 'bg-slate-600', delta: '▲ 1', deltaColor: 'text-red-400' },
  { label: 'Financial', open: 1, dot: 'bg-slate-600', delta: '—', deltaColor: 'text-slate-600' },
];

// ── AI risk assessment — top exposures ──────────────────────────
const aiThreats = [
  { severity: 'bg-red-500', text: 'CJIS technical audit in 12 days at 67% ready — the overdue advanced-authentication finding is the blocking item.', exposure: 'State CSO finding' },
  { severity: 'bg-red-500', text: 'Medical intake screening delay repeats a 2025 ACA finding — repeat findings drive conditional accreditation and USMS contract review.', exposure: '$1.2M/yr' },
  { severity: 'bg-amber-400', text: '18 firearms qualifications expiring and 3 lapsed CPR certs — lapsed certifications compound liability on every incident touched.', exposure: 'Civil liability' },
];

// ── Findings & obligations ──────────────────────────────────────
const typeBadge = {
  FINDING: 'border-red-500/40 text-red-400',
  DERIVED: 'border-amber-500/40 text-amber-400',
  OBLIGATION: 'border-blue-500/40 text-blue-400',
};

const statusColor = {
  Overdue: 'text-red-400',
  Pending: 'text-amber-400',
  'In progress': 'text-slate-400',
  'On track': 'text-emerald-400',
};

const findings = [
  { type: 'FINDING', title: 'Advanced authentication not enforced on remote CAD access', ref: 'CJIS 5.6.2.2 · CJIS / Data', evidence: true, owner: 'IT — R. Chen', open: '34d', due: '4d over', dueColor: 'text-red-400', status: 'Overdue', dot: 'bg-red-500', overdue: true },
  { type: 'DERIVED', title: 'Medical intake screening delays exceed 4-hour standard', ref: 'ACA 4-ALDF-4C-22 · Detention', evidence: true, owner: 'Jail — Lt. Moore', open: '26d', due: '1d over', dueColor: 'text-red-400', status: 'Overdue', dot: 'bg-red-500', overdue: true },
  { type: 'OBLIGATION', title: 'Quarterly CJIS security attestation', ref: 'CJIS 5.2.1 · CJIS / Data', evidence: false, owner: 'Sheriff Thompson', open: '5d', due: '2d', dueColor: 'text-amber-400', status: 'Pending', dot: 'bg-amber-400', overdue: false },
  { type: 'DERIVED', title: 'Pursuit policy gap — termination criteria undefined', ref: 'Policy 4.2 §7 · Personnel', evidence: true, owner: 'Legal — S. Ibarra', open: '12d', due: '9d', dueColor: 'text-slate-400', status: 'In progress', dot: 'bg-slate-600', overdue: false },
  { type: 'FINDING', title: 'Cell-check documentation gaps on night shift', ref: 'ACA 4-ALDF-2A-52 · Detention', evidence: true, owner: 'Jail — Lt. Moore', open: '19d', due: '11d', dueColor: 'text-slate-400', status: 'In progress', dot: 'bg-slate-600', overdue: false },
  { type: 'FINDING', title: 'AVL outage gaps in pursuit telemetry', ref: 'Policy 4.2 §12 · Fleet & Pursuit', evidence: true, owner: 'IT — R. Chen', open: '8d', due: '20d', dueColor: 'text-slate-400', status: 'In progress', dot: 'bg-slate-600', overdue: false },
  { type: 'OBLIGATION', title: 'Annual firearms qualification cycle', ref: 'Policy 3.1 · Personnel', evidence: false, owner: 'Training — Sgt. Diaz', open: '41d', due: '27d', dueColor: 'text-slate-400', status: 'On track', dot: 'bg-slate-600', overdue: false },
  { type: 'OBLIGATION', title: 'Asset forfeiture annual report', ref: 'RCW 10.105 · Financial', evidence: false, owner: 'Finance — T. Osei', open: '15d', due: '44d', dueColor: 'text-slate-400', status: 'On track', dot: 'bg-slate-600', overdue: false },
];

// ── Right column ────────────────────────────────────────────────
const audits = [
  { name: 'CJIS Technical Audit', days: '12d', daysColor: 'text-amber-400', meta: 'Aug 15 · State CSO · systems & policy', ready: 67, bar: 'bg-amber-400', readyColor: 'text-amber-400' },
  { name: 'Jail Health Inspection', days: '31d', daysColor: 'text-slate-300', meta: 'Sep 3 · County health dept · detention', ready: 82, bar: 'bg-emerald-400', readyColor: 'text-emerald-400' },
  { name: 'ACA Accreditation Review', days: '99d', daysColor: 'text-slate-300', meta: 'Nov 10 · Mock audit · all standards', ready: 54, bar: 'bg-slate-500', readyColor: 'text-slate-400' },
];

const certifications = [
  { name: 'Firearms qualification', dot: 'bg-amber-400', count: '18 expiring', color: 'text-amber-400' },
  { name: 'CPR / First Aid', dot: 'bg-red-500', count: '3 lapsed', color: 'text-red-400' },
  { name: 'Crisis Intervention (CIT)', dot: 'bg-slate-600', count: '7 expiring', color: 'text-slate-400' },
  { name: 'Jail officer certification', dot: 'bg-emerald-400', count: '0 lapsed', color: 'text-emerald-400' },
];

const policies = [
  { name: 'Pursuit policy rev. 4.2', outstanding: '12 outstanding', color: 'text-amber-400', bar: 'bg-amber-400', pct: 84 },
  { name: 'Body-cam policy rev. 2.1', outstanding: '3 outstanding', color: 'text-emerald-400', bar: 'bg-emerald-400', pct: 96 },
];

// ── 30-day cascade projection ───────────────────────────────────
const cascadeMetrics = [
  { label: 'CJIS Audit Readiness', current: '67%', projected: '52%' },
  { label: 'Accreditation Status', current: 'On track', projected: 'Conditional' },
  { label: 'Insurance Risk Score', current: 'Moderate', projected: 'High' },
  { label: 'Deployable Strength', current: '93%', projected: '88%' },
  { label: 'Liability Exposure', current: 'Contained', projected: '$340K est.' },
];

const cascadeChains = [
  {
    title: 'CJIS Access Cascade', color: 'text-red-400',
    trigger: 'Trigger: advanced-auth finding open at Aug 15 audit',
    steps: ['Audit finding formalized by State CSO', 'Corrective action plan — 30-day clock', 'Remote CAD access restrictions', 'Dispatch reverts to radio-only workflows'],
  },
  {
    title: 'Detention / ACA Cascade', color: 'text-red-400',
    trigger: 'Trigger: intake screening + cell-check findings unresolved',
    steps: ['Repeat findings cited at Nov 10 mock audit', 'ACA outcome projects conditional', 'USMS housing contract review opens', '$1.2M/yr federal revenue exposed'],
  },
  {
    title: 'Certification Cascade', color: 'text-amber-400',
    trigger: 'Trigger: 18 firearms quals + 3 CPR lapses uncorrected',
    steps: ['Lapsed deputies moved to restricted duty', 'Patrol drops below minimum on 2 shifts', 'OT burn +$4.1K/day to hold coverage', 'Liability multiplier on every incident'],
  },
];

function SectionLabel({ children, right }) {
  return (
    <div className="flex items-baseline justify-between mb-3">
      <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500">{children}</p>
      {right}
    </div>
  );
}

export default function RiskCompliance() {
  const navigate = useNavigate();
  const [cascadeOpen, setCascadeOpen] = useState(false);

  return (
    <DashboardLayout>
      <div className="min-h-full bg-[#0A0A0B] px-6 py-8">
        <div className="max-w-[1500px] mx-auto">

          {/* ── Header ─────────────────────────────────────── */}
          <div className="flex flex-col lg:flex-row lg:items-center gap-3 lg:gap-4 pb-5 border-b border-slate-800/70">
            <div className="flex items-baseline gap-3 flex-wrap">
              <h1 className="text-[19px] font-bold text-slate-100">Risk & Compliance Center</h1>
              <span className="text-[11px] text-slate-500">As of 06:12 · sources: IA · Training · CJIS tracker · JMS</span>
            </div>
            <div className="flex items-center gap-4 lg:ml-auto flex-wrap">
              <span className="text-[11px] text-slate-500">Risk index <span className="font-mono font-bold text-amber-400">58</span> · <span className="text-amber-400 font-semibold">High</span></span>
              <span className="text-[11px] text-slate-500">Accreditation cycle: ACA 2027 · Year 2 of 3</span>
              <button className="px-3.5 py-2 border border-slate-700/60 rounded-lg text-[11.5px] font-semibold text-slate-200 hover:bg-zinc-900/60 transition-colors flex items-center gap-1.5">
                <Download className="w-3 h-3" />
                Generate audit package — PDF
              </button>
            </div>
          </div>

          {/* ── Category strip ─────────────────────────────── */}
          <div className="mt-5 border border-slate-800/80 rounded-xl grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 divide-x divide-slate-800/60">
            {categories.map((cat) => (
              <div key={cat.label} className="px-4 py-3.5">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">{cat.label}</p>
                  <span className={`w-1.5 h-1.5 rounded-full ${cat.dot}`} />
                </div>
                <div className="flex items-end justify-between">
                  <p className="text-[20px] font-bold text-slate-100 leading-none">{cat.open} <span className="text-[10px] font-normal text-slate-500">open</span></p>
                  <span className={`text-[10px] font-semibold ${cat.deltaColor}`}>{cat.delta}</span>
                </div>
              </div>
            ))}
          </div>

          {/* ── AI risk assessment band ────────────────────── */}
          <div className="mt-4 border border-slate-800/80 rounded-xl overflow-hidden">
            <div className="px-4 py-2.5 border-b border-slate-800/60 flex items-center gap-2">
              <Sparkles className="w-3 h-3 text-violet-400" />
              <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">AI Risk Assessment</span>
              <span className="ml-auto px-2 py-px bg-violet-500/15 border border-violet-500/25 rounded text-[9px] font-bold text-violet-300 uppercase">Generated Today</span>
            </div>
            <div className="divide-y divide-slate-800/50">
              {aiThreats.map((t, i) => (
                <div key={i} className="flex items-center gap-3 px-4 py-2.5">
                  <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${t.severity}`} />
                  <p className="text-[12px] text-slate-300 flex-1 min-w-0">{t.text}</p>
                  <span className="text-[10.5px] font-mono text-slate-400 flex-shrink-0">{t.exposure}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Main grid ──────────────────────────────────── */}
          <div className="mt-6 grid grid-cols-1 xl:grid-cols-[1fr,440px] gap-8">

            {/* Findings & obligations */}
            <div>
              <SectionLabel
                right={
                  <span className="text-[10px] text-slate-500">
                    8 shown ·{' '}
                    <button onClick={() => navigate('/command/approvals')} className="text-red-400 hover:text-red-300 transition-colors">2 overdue</button>
                  </span>
                }
              >
                Findings & Obligations
              </SectionLabel>

              {/* Column headers */}
              <div className="flex items-center gap-3 pb-2 border-b border-slate-800/70 pl-2">
                <span className="w-1.5 flex-shrink-0" />
                <span className="text-[9px] font-bold uppercase tracking-[0.12em] text-slate-500 w-[76px] flex-shrink-0">Type</span>
                <span className="text-[9px] font-bold uppercase tracking-[0.12em] text-slate-500 flex-1">Finding</span>
                <span className="text-[9px] font-bold uppercase tracking-[0.12em] text-slate-500 w-32 flex-shrink-0 hidden sm:block">Owner</span>
                <span className="text-[9px] font-bold uppercase tracking-[0.12em] text-slate-500 w-9 flex-shrink-0 text-right">Open</span>
                <span className="text-[9px] font-bold uppercase tracking-[0.12em] text-slate-500 w-14 flex-shrink-0 text-right">Due in</span>
                <span className="text-[9px] font-bold uppercase tracking-[0.12em] text-slate-500 w-[72px] flex-shrink-0 text-right">Status</span>
              </div>

              <div className="divide-y divide-slate-800/50">
                {findings.map((f, i) => (
                  <div key={i} className={`flex items-center gap-3 py-3 pl-2 border-l-2 ${f.overdue ? 'border-red-500/70' : 'border-transparent'}`}>
                    <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${f.dot}`} />
                    <span className={`w-[76px] flex-shrink-0 text-center border rounded px-1 py-0.5 text-[8.5px] font-bold tracking-wider ${typeBadge[f.type]}`}>{f.type}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-[12px] text-slate-200 truncate">{f.title}</p>
                      <p className="text-[10px] text-slate-500 truncate flex items-center gap-1">
                        {f.ref}
                        {f.evidence && <><span>·</span><Paperclip className="w-2.5 h-2.5 inline flex-shrink-0" /><span>evidence</span></>}
                      </p>
                    </div>
                    <span className="text-[11px] text-slate-400 w-32 flex-shrink-0 truncate hidden sm:block">{f.owner}</span>
                    <span className="text-[10.5px] font-mono text-slate-400 w-9 flex-shrink-0 text-right">{f.open}</span>
                    <span className={`text-[10.5px] font-mono w-14 flex-shrink-0 text-right ${f.dueColor}`}>{f.due}</span>
                    <span className={`text-[11px] font-semibold w-[72px] flex-shrink-0 text-right ${statusColor[f.status]}`}>{f.status}</span>
                  </div>
                ))}
              </div>

              <p className="text-[10px] text-slate-500 mt-3">
                Standards detail moved to{' '}
                <button onClick={() => navigate('/hr/compliance')} className="text-amber-500/90 hover:text-amber-400 transition-colors">Compliance Management</button>
                {' '}· overdue items escalate in{' '}
                <button onClick={() => navigate('/command/approvals')} className="text-amber-500/90 hover:text-amber-400 transition-colors">Approvals</button>
              </p>

              {/* ── 30-day cascade projection (collapsible) ── */}
              <div className="mt-6 border border-slate-800/80 rounded-xl overflow-hidden">
                <button onClick={() => setCascadeOpen(!cascadeOpen)} className="w-full px-4 py-3 flex items-center gap-2 hover:bg-zinc-900/40 transition-colors">
                  <Zap className="w-3 h-3 text-red-400" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">30-Day Cascade Projection</span>
                  <span className="px-1.5 py-px bg-red-500/10 border border-red-500/25 rounded text-[9px] font-bold text-red-400 uppercase">If unresolved</span>
                  {cascadeOpen
                    ? <ChevronUp className="w-3.5 h-3.5 text-slate-500 ml-auto" />
                    : <ChevronDown className="w-3.5 h-3.5 text-slate-500 ml-auto" />}
                </button>

                {cascadeOpen && (
                  <div className="border-t border-slate-800/60">
                    <div className="grid grid-cols-2 sm:grid-cols-5 divide-x divide-slate-800/50 border-b border-slate-800/60">
                      {cascadeMetrics.map((m) => (
                        <div key={m.label} className="px-3 py-2.5">
                          <p className="text-[9px] font-semibold text-slate-500 uppercase tracking-wider mb-1">{m.label}</p>
                          <p className="text-[10.5px]">
                            <span className="text-slate-500 line-through">{m.current}</span>
                            <span className="text-slate-600 mx-1">→</span>
                            <span className="font-semibold text-red-400">{m.projected}</span>
                          </p>
                        </div>
                      ))}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-slate-800/50">
                      {cascadeChains.map((chain) => (
                        <div key={chain.title} className="px-4 py-3">
                          <p className={`text-[10.5px] font-bold mb-1 ${chain.color}`}>{chain.title}</p>
                          <p className="text-[10px] text-slate-400 mb-1.5">{chain.trigger}</p>
                          <div className="space-y-1">
                            {chain.steps.map((step, i) => (
                              <p key={i} className="text-[10px] text-slate-500" style={{ paddingLeft: `${i * 8}px` }}>→ {step}</p>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* ── Right column ───────────────────────────────── */}
            <div>
              <SectionLabel>Upcoming Audits</SectionLabel>
              <div className="space-y-3">
                {audits.map((a) => (
                  <div key={a.name} className="border border-slate-800/80 rounded-xl px-4 py-3.5">
                    <div className="flex items-baseline justify-between mb-0.5">
                      <p className="text-[13px] font-bold text-slate-100">{a.name}</p>
                      <span className={`text-[10.5px] font-mono font-semibold ${a.daysColor}`}>{a.days}</span>
                    </div>
                    <p className="text-[10.5px] text-slate-500 mb-2.5">{a.meta}</p>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-1 bg-slate-800/80 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${a.bar}`} style={{ width: `${a.ready}%` }} />
                      </div>
                      <span className={`text-[10px] font-mono flex-shrink-0 ${a.readyColor}`}>{a.ready}% ready</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-7">
                <SectionLabel>Certification Exposure</SectionLabel>
                <div className="divide-y divide-slate-800/50 border-t border-slate-800/70">
                  {certifications.map((c) => (
                    <div key={c.name} className="flex items-center gap-3 py-2.5">
                      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${c.dot}`} />
                      <p className="text-[12px] text-slate-300 flex-1 min-w-0">{c.name}</p>
                      <span className={`text-[10.5px] font-mono flex-shrink-0 ${c.color}`}>{c.count}</span>
                      <button className="text-[11px] font-semibold text-slate-300 hover:text-white transition-colors flex-shrink-0">View</button>
                    </div>
                  ))}
                </div>
                <p className="text-[10px] text-slate-500 mt-2.5">Lapsed = liability multiplier on every incident touched. Source: Training records 05:58</p>
              </div>

              <div className="mt-7">
                <SectionLabel>Policy Acknowledgments</SectionLabel>
                <div className="space-y-4">
                  {policies.map((p) => (
                    <div key={p.name}>
                      <div className="flex items-baseline justify-between mb-1.5">
                        <p className="text-[12px] text-slate-200">{p.name}</p>
                        <span className={`text-[10.5px] font-mono ${p.color}`}>{p.outstanding}</span>
                      </div>
                      <div className="w-full h-1 bg-slate-800/80 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${p.bar}`} style={{ width: `${p.pct}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
}

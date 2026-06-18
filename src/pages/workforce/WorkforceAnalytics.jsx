import React, { useState } from 'react';
import {
  X, BarChart3, TrendingUp, TrendingDown, Users, Briefcase,
  AlertTriangle, CheckCircle, Sparkles, FileText, Download,
  ArrowRight, RefreshCw, Target, Clock, Shield, Zap,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';

const DIVISION_COVERAGE = [
  { name: 'Communications', pct: 92, authorized: 12, filled: 11, status: 'ok' },
  { name: 'K9',             pct: 95, authorized: 6,  filled: 6,  status: 'ok' },
  { name: 'Investigations', pct: 89, authorized: 18, filled: 16, status: 'ok' },
  { name: 'Administration', pct: 88, authorized: 8,  filled: 7,  status: 'ok' },
  { name: 'SWAT',           pct: 80, authorized: 10, filled: 8,  status: 'watch' },
  { name: 'Detention',      pct: 86, authorized: 28, filled: 24, status: 'ok' },
  { name: 'Patrol',         pct: 75, authorized: 40, filled: 30, status: 'critical' },
];

const OPEN_POSITIONS = [
  { title: 'Patrol Deputy',       division: 'Patrol',         count: 4, priority: 'critical', daysOpen: 47 },
  { title: 'Corrections Officer', division: 'Detention',      count: 3, priority: 'high',     daysOpen: 31 },
  { title: 'Detective',           division: 'Investigations',  count: 2, priority: 'medium',   daysOpen: 22 },
  { title: 'Admin Specialist',    division: 'Administration',  count: 2, priority: 'medium',   daysOpen: 18 },
  { title: 'K9 Handler',          division: 'K9',             count: 1, priority: 'high',     daysOpen: 60 },
];

const HIRING_PIPELINE = [
  { stage: 'Application Received',  count: 28, color: 'blue' },
  { stage: 'Background Check',      count: 12, color: 'orange' },
  { stage: 'Hiring Board Review',   count: 6,  color: 'orange' },
  { stage: 'Offer Extended',        count: 3,  color: 'green' },
];

const RETENTION = [
  { metric: 'Turnover Rate YTD',  value: '6.5%',   target: '< 10%',   status: 'ok' },
  { metric: 'Average Tenure',     value: '8.4 yrs', target: '> 5 yrs', status: 'ok' },
  { metric: 'Retention Score',    value: '91/100',  target: '> 80',    status: 'ok' },
  { metric: 'Exit Interviews Done',value: '94%',    target: '> 90%',   status: 'ok' },
];

const FORECASTS = [
  {
    horizon: '30-Day Forecast',
    risk: 'high',
    headline: 'Patrol drops to 71% coverage unless 2 deputies hired by Jul 15',
    details: [
      '3 Patrol officers completing FMLA leave — not returning',
      'Current hiring pipeline yields 2 hires in 45-60 days — gap window exists',
      'Recommended: Temporary cross-assignment from Detention (2 certified deputies) bridges gap',
    ],
    action: 'Reallocate Personnel',
    actionType: 'reallocate',
  },
  {
    horizon: '90-Day Forecast',
    risk: 'high',
    headline: '3 CPR cert lapses + 2 Patrol retirements → coverage drops to 68%',
    details: [
      'Sgt. Williams (Patrol) and Lt. Reed (Admin) retirement-eligible — both likely separating in Sep',
      'CPR lapse in Patrol (3 personnel) restricts active coverage without immediate training',
      'Combined impact: Patrol below emergency minimum staffing by late September',
    ],
    action: 'Generate Briefing Package',
    actionType: 'briefing',
  },
  {
    horizon: '6-Month Forecast',
    risk: 'medium',
    headline: 'Retirement wave: 4 senior departures in Dec — replace now to avoid knowledge gap',
    details: [
      '4 deputies with 15+ years tenure eligible for full retirement in December',
      'Combined institutional knowledge: 64 years of field experience',
      'Recommended: Open 4 positions now, hire by Oct, shadow period Nov–Dec before separations',
    ],
    action: 'Create Hiring Package',
    actionType: 'hiring',
  },
];

const AI_WORKFORCE_INSIGHTS = [
  {
    icon: Target,
    color: 'red',
    title: 'Priority Hire: Patrol Deputies (4 Positions)',
    body: 'Patrol is the highest-risk open position set. Each additional deputy directly raises zone coverage. At current trajectory, hiring even 2 of 4 positions reduces OT cost by $14,000/month.',
  },
  {
    icon: RefreshCw,
    color: 'orange',
    title: 'Reallocate: 2 Detention → Patrol (Temporary)',
    body: 'Deputies Chen and Brown are cross-certified for Patrol. Temporary 90-day assignment during peak hiring period prevents minimum staffing violations with zero additional cost.',
  },
  {
    icon: Zap,
    color: 'blue',
    title: 'Batch Hiring: Accelerate Pipeline',
    body: 'Current avg time-to-hire is 42 days. Parallel-tracking background checks for the 12 in pipeline would reduce to 31 days. Recommend issuing conditional offers to top 3 candidates immediately.',
  },
];

const TABS = ['Staffing Health', 'Forecasts', 'Hiring Pipeline', 'AI Actions'];

const riskBadge = risk => risk === 'high' ? 'bg-red-500/15 border-red-500/25 text-red-600 dark:text-red-400' : risk === 'medium' ? 'bg-orange-500/15 border-orange-500/25 text-orange-600 dark:text-orange-400' : 'bg-green-500/15 border-green-500/25 text-green-600 dark:text-green-400';
const covBg    = pct => pct >= 90 ? 'bg-green-500/10 border-green-500/20' : pct >= 80 ? 'bg-orange-500/10 border-orange-500/15' : 'bg-red-500/10 border-red-500/20';
const covText  = pct => pct >= 90 ? 'text-green-600 dark:text-green-400' : pct >= 80 ? 'text-orange-600 dark:text-orange-400' : 'text-red-600 dark:text-red-400';
const covBar   = pct => pct >= 90 ? 'bg-green-500' : pct >= 80 ? 'bg-orange-500' : 'bg-red-500';

export default function WorkforceAnalytics({ isOpen, onClose }) {
  const navigate = useNavigate();
  const [tab, setTab] = useState('Staffing Health');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-8 overflow-y-auto">
      <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-5xl bg-white dark:bg-zinc-950 border border-border rounded-2xl shadow-2xl overflow-hidden mb-8">

        {/* Header */}
        <div className="bg-white dark:bg-zinc-950 border-b border-border px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-500/15 border border-blue-500/25 flex items-center justify-center">
                <BarChart3 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-primary">Workforce Intelligence Center</h3>
                <p className="text-[10px] text-secondary">Staffing health, predictive analytics &amp; command forecasts</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-zinc-900/50 rounded-lg transition-colors">
              <X className="w-5 h-5 text-secondary" />
            </button>
          </div>
          <div className="flex gap-1">
            {TABS.map(t => (
              <button key={t} onClick={() => setTab(t)}
                className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-colors ${tab === t ? 'bg-blue-500/15 border border-blue-500/25 text-blue-600 dark:text-blue-400' : 'text-secondary hover:text-primary hover:bg-slate-100/80 dark:hover:bg-zinc-900/30'}`}>
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">

          {/* ── STAFFING HEALTH ── */}
          {tab === 'Staffing Health' && (
            <div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
                {[
                  { label: 'Authorized Positions', value: '170',  sub: 'Across all divisions',   color: 'neutral' },
                  { label: 'Filled',               value: '158',  sub: '93% fill rate',           color: 'green' },
                  { label: 'Open Positions',        value: '12',   sub: '4 Patrol critical',       color: 'red' },
                  { label: 'Workforce Readiness',   value: '87',   sub: 'Score out of 100',        color: 'orange' },
                ].map(({ label, value, sub, color }) => (
                  <div key={label} className={`p-3 border rounded-xl ${color === 'green' ? 'bg-green-500/10 border-green-500/20' : color === 'red' ? 'bg-red-500/10 border-red-500/20' : color === 'orange' ? 'bg-orange-500/10 border-orange-500/20' : 'bg-slate-100/80 dark:bg-zinc-900/30 border-slate-700/40'}`}>
                    <p className="text-[10px] text-slate-500 uppercase font-semibold tracking-wider mb-1">{label}</p>
                    <p className={`text-2xl font-bold ${color === 'green' ? 'text-green-600 dark:text-green-400' : color === 'red' ? 'text-red-600 dark:text-red-400' : color === 'orange' ? 'text-orange-600 dark:text-orange-400' : 'text-primary'}`}>{value}</p>
                    <p className="text-[10px] text-secondary">{sub}</p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-5">
                {/* Coverage by division */}
                <div>
                  <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-2.5">Coverage by Division</p>
                  <div className="space-y-2">
                    {DIVISION_COVERAGE.sort((a, b) => a.pct - b.pct).map(d => (
                      <div key={d.name} className={`p-3 border rounded-xl ${covBg(d.pct)}`}>
                        <div className="flex items-center justify-between mb-1.5">
                          <div className="flex items-center gap-2">
                            {d.status === 'critical' ? <AlertTriangle className="w-3.5 h-3.5 text-red-600 dark:text-red-400" /> : d.status === 'watch' ? <Clock className="w-3.5 h-3.5 text-orange-600 dark:text-orange-400" /> : <CheckCircle className="w-3.5 h-3.5 text-green-600 dark:text-green-400" />}
                            <span className="text-[12px] font-semibold text-primary">{d.name}</span>
                          </div>
                          <span className={`text-[12px] font-bold ${covText(d.pct)}`}>{d.pct}% ({d.filled}/{d.authorized})</span>
                        </div>
                        <div className="w-full bg-slate-200 dark:bg-zinc-800 rounded-full h-1.5">
                          <div className={`h-1.5 rounded-full ${covBar(d.pct)}`} style={{ width: `${d.pct}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Metrics: overtime + retention */}
                <div className="space-y-3">
                  <div>
                    <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-2.5">Staffing Metrics — June 2026</p>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { label: 'OT Hours (Month)',  value: '342 hrs',  color: 'orange' },
                        { label: 'OT Cost (Month)',   value: '$28,600',  color: 'orange' },
                        { label: 'On Duty Today',     value: '127/158',  color: 'green' },
                        { label: 'Avg Time-to-Hire',  value: '42 days',  color: 'neutral' },
                      ].map(({ label, value, color }) => (
                        <div key={label} className={`p-3 border rounded-xl ${color === 'green' ? 'bg-green-500/10 border-green-500/20' : color === 'orange' ? 'bg-orange-500/10 border-orange-500/20' : 'bg-slate-100/80 dark:bg-zinc-900/30 border-slate-700/40'}`}>
                          <p className={`text-[14px] font-bold ${color === 'green' ? 'text-green-600 dark:text-green-400' : color === 'orange' ? 'text-orange-600 dark:text-orange-400' : 'text-primary'}`}>{value}</p>
                          <p className="text-[9px] text-secondary mt-0.5">{label}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-2.5">Retention Metrics</p>
                    <div className="space-y-1.5">
                      {RETENTION.map(r => (
                        <div key={r.metric} className="flex items-center justify-between p-2.5 bg-green-500/10 border border-green-500/15 rounded-lg">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-3.5 h-3.5 text-green-600 dark:text-green-400 flex-shrink-0" />
                            <span className="text-[11px] text-secondary">{r.metric}</span>
                          </div>
                          <div className="text-right">
                            <span className="text-[12px] font-bold text-green-600 dark:text-green-400">{r.value}</span>
                            <span className="text-[9px] text-slate-500 ml-2">target: {r.target}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-2.5">Staffing Trend — 6 Months</p>
                    <div className="flex items-end gap-1.5 h-16">
                      {[162, 159, 158, 156, 158, 158].map((n, i) => {
                        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
                        return (
                          <div key={i} className="flex-1 flex flex-col items-center gap-1">
                            <div className={`w-full rounded-t ${i === 5 ? 'bg-amber-500' : n < 158 ? 'bg-orange-500/60' : 'bg-slate-500/40'}`} style={{ height: `${((n - 150) / 15) * 52}px` }} />
                            <span className="text-[8px] text-secondary">{months[i]}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Retirement projections */}
              <div>
                <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-2.5">Retirement Projections</p>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { period: '12 Months', count: 8,  note: 'Includes 2 Patrol Sgts' },
                    { period: '24 Months', count: 14, note: 'Patrol impact: −6 deputies' },
                    { period: '36 Months', count: 21, note: 'Agency-wide: critical planning' },
                  ].map(({ period, count, note }) => (
                    <div key={period} className="p-3 bg-orange-500/10 border border-orange-500/20 rounded-xl">
                      <p className="text-[10px] text-slate-500 uppercase font-semibold tracking-wider mb-1">{period}</p>
                      <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">{count}</p>
                      <p className="text-[10px] text-secondary">{note}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── FORECASTS ── */}
          {tab === 'Forecasts' && (
            <div>
              <div className="flex items-center gap-2 mb-4 p-3 bg-slate-900 dark:bg-black border border-slate-700/60 rounded-xl">
                <Sparkles className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <p className="text-[11px] text-slate-300">AI predictive analysis based on current staffing, open positions, hiring pipeline velocity, and historical turnover patterns.</p>
              </div>

              <div className="space-y-4 mb-5">
                {FORECASTS.map((f, i) => (
                  <div key={i} className={`p-4 border rounded-xl ${f.risk === 'high' ? 'bg-red-500/5 border-red-500/20' : f.risk === 'medium' ? 'bg-orange-500/5 border-orange-500/15' : 'bg-green-500/5 border-green-500/20'}`}>
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className={`text-[9px] px-2 py-0.5 rounded-full border font-bold uppercase ${riskBadge(f.risk)}`}>{f.horizon}</span>
                        <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase ${riskBadge(f.risk)}`}>{f.risk} risk</span>
                      </div>
                    </div>
                    <p className="text-[13px] font-bold text-primary mb-2">{f.headline}</p>
                    <ul className="space-y-1 mb-3">
                      {f.details.map((d, j) => (
                        <li key={j} className="flex items-start gap-2 text-[11px] text-secondary">
                          <span className="w-1 h-1 rounded-full bg-slate-400 mt-2 flex-shrink-0" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Shortage predictions */}
              <div className="p-4 bg-slate-900 dark:bg-black border border-slate-700/60 rounded-xl">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-4 h-4 text-blue-400" />
                  <span className="text-sm font-bold text-white">AI Staffing Shortage Predictions</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {AI_WORKFORCE_INSIGHTS.map((insight, i) => {
                    const Icon = insight.icon;
                    return (
                      <div key={i} className="p-3 bg-slate-800/40 border border-slate-700/50 rounded-lg">
                        <div className="flex items-start gap-2 mb-1.5">
                          <Icon className={`w-3.5 h-3.5 flex-shrink-0 mt-0.5 ${insight.color === 'red' ? 'text-red-400' : insight.color === 'orange' ? 'text-orange-400' : 'text-blue-400'}`} />
                          <p className="text-[11px] font-bold text-white">{insight.title}</p>
                        </div>
                        <p className="text-[10px] text-slate-400 leading-relaxed">{insight.body}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* ── HIRING PIPELINE ── */}
          {tab === 'Hiring Pipeline' && (
            <div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
                {[
                  { label: 'Total Applicants',  value: '28', color: 'blue' },
                  { label: 'Avg Time-to-Hire',  value: '42d', color: 'neutral' },
                  { label: 'Offers Extended',   value: '3',  color: 'green' },
                  { label: 'Open Requisitions', value: '12', color: 'red' },
                ].map(({ label, value, color }) => (
                  <div key={label} className={`p-3 border rounded-xl ${color === 'blue' ? 'bg-blue-500/10 border-blue-500/20' : color === 'green' ? 'bg-green-500/10 border-green-500/20' : color === 'red' ? 'bg-red-500/10 border-red-500/20' : 'bg-slate-100/80 dark:bg-zinc-900/30 border-slate-700/40'}`}>
                    <p className={`text-2xl font-bold ${color === 'blue' ? 'text-blue-600 dark:text-blue-400' : color === 'green' ? 'text-green-600 dark:text-green-400' : color === 'red' ? 'text-red-600 dark:text-red-400' : 'text-primary'}`}>{value}</p>
                    <p className="text-[10px] text-secondary mt-0.5">{label}</p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-5">
                {/* Funnel */}
                <div>
                  <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-2.5">Pipeline Funnel</p>
                  <div className="space-y-2">
                    {HIRING_PIPELINE.map(stage => (
                      <div key={stage.stage} className="flex items-center gap-3">
                        <div className="flex-1 p-2.5 bg-slate-100/80 dark:bg-zinc-900/30 border border-slate-700/40 rounded-lg">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-[11px] font-medium text-primary">{stage.stage}</span>
                            <span className={`text-[13px] font-bold ${stage.color === 'green' ? 'text-green-600 dark:text-green-400' : stage.color === 'orange' ? 'text-orange-600 dark:text-orange-400' : 'text-blue-600 dark:text-blue-400'}`}>{stage.count}</span>
                          </div>
                          <div className="w-full bg-slate-200 dark:bg-zinc-800 rounded-full h-1">
                            <div className={`h-1 rounded-full ${stage.color === 'green' ? 'bg-green-500' : stage.color === 'orange' ? 'bg-orange-500' : 'bg-blue-500'}`} style={{ width: `${(stage.count / 28) * 100}%` }} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Open positions */}
                <div>
                  <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-2.5">Open Requisitions by Priority</p>
                  <div className="space-y-2">
                    {OPEN_POSITIONS.map(pos => (
                      <div key={pos.title} className={`flex items-center gap-3 p-3 border rounded-xl ${pos.priority === 'critical' ? 'bg-red-500/5 border-red-500/20' : pos.priority === 'high' ? 'bg-orange-500/5 border-orange-500/15' : 'bg-slate-100/50 dark:bg-zinc-900/20 border-slate-700/30'}`}>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-[12px] font-semibold text-primary">{pos.title}</span>
                            <span className={`text-[9px] px-1.5 py-0.5 rounded-full border font-bold uppercase ${pos.priority === 'critical' ? 'bg-red-500/15 border-red-500/25 text-red-600 dark:text-red-400' : pos.priority === 'high' ? 'bg-orange-500/15 border-orange-500/25 text-orange-600 dark:text-orange-400' : 'bg-slate-500/15 border-slate-500/25 text-slate-500'}`}>{pos.priority}</span>
                          </div>
                          <p className="text-[10px] text-secondary">{pos.division} &bull; Open {pos.daysOpen} days</p>
                        </div>
                        <span className="text-[16px] font-bold text-primary flex-shrink-0">{pos.count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                <div className="flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[12px] font-bold text-primary mb-1">AI Hiring Recommendation</p>
                    <p className="text-[11px] text-secondary leading-relaxed">
                      Parallel-tracking background checks for all 12 in-process candidates would reduce time-to-hire by 26%. Issuing conditional offers to the top 3 Patrol candidates simultaneously (rather than sequentially) fills critical positions 3 weeks faster. Estimated coverage improvement: Patrol from 75% to 83% within 60 days.
                    </p>
                    <button onClick={() => { navigate(createPageUrl('HiringPipeline')); onClose(); }}
                      className="mt-3 flex items-center gap-1.5 px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold rounded-lg text-[11px] transition-colors">
                      <ArrowRight className="w-3.5 h-3.5" />View Hiring Pipeline
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── AI ACTIONS ── */}
          {tab === 'AI Actions' && (
            <div>
              <div className="flex items-center gap-2 mb-4 p-3 bg-slate-900 dark:bg-black border border-slate-700/60 rounded-xl">
                <Sparkles className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <p className="text-[11px] text-slate-300">AI-recommended command actions ranked by operational impact. Each action includes one-click execution or package generation.</p>
              </div>

              <div className="space-y-3 mb-6">
                {[
                  {
                    priority: 1, color: 'red', icon: Target, title: 'Generate Workforce Report',
                    detail: 'Full staffing health summary, forecast projections, and compliance status — executive-ready PDF format.',
                    action: 'Generate Report',
                  },
                  {
                    priority: 2, color: 'red', icon: Briefcase, title: 'Create Hiring Recommendation Package',
                    detail: 'Justification memo + position descriptions for 4 Patrol Deputy openings, ready for county commission review.',
                    action: 'Create Package',
                  },
                  {
                    priority: 3, color: 'orange', icon: RefreshCw, title: 'Reallocate Personnel — Patrol Gap',
                    detail: 'Temporary cross-assignment of 2 Detention-certified deputies to Patrol for 90 days. No additional cost.',
                    action: 'Initiate Reallocation',
                  },
                  {
                    priority: 4, color: 'orange', icon: Users, title: 'Request Additional Positions',
                    detail: 'Submit formal request to county for 3 additional Patrol FTE positions based on population growth data.',
                    action: 'Submit Request',
                  },
                  {
                    priority: 5, color: 'blue', icon: FileText, title: 'Export Executive Briefing',
                    detail: '2-page command briefing: workforce health, critical risks, and recommended actions for sheriff/command staff review.',
                    action: 'Export Briefing',
                  },
                ].map(item => {
                  const Icon = item.icon;
                  return (
                    <div key={item.priority} className={`flex items-start gap-4 p-4 border rounded-xl ${item.color === 'red' ? 'bg-red-500/5 border-red-500/15' : item.color === 'orange' ? 'bg-orange-500/5 border-orange-500/15' : 'bg-blue-500/5 border-blue-500/15'}`}>
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${item.color === 'red' ? 'bg-red-500/15' : item.color === 'orange' ? 'bg-orange-500/15' : 'bg-blue-500/15'}`}>
                        <Icon className={`w-4 h-4 ${item.color === 'red' ? 'text-red-600 dark:text-red-400' : item.color === 'orange' ? 'text-orange-600 dark:text-orange-400' : 'text-blue-600 dark:text-blue-400'}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[9px] font-bold text-slate-400">#{item.priority}</span>
                          <span className="text-[13px] font-semibold text-primary">{item.title}</span>
                        </div>
                        <p className="text-[11px] text-secondary leading-relaxed">{item.detail}</p>
                      </div>
                      <button className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-2 font-semibold rounded-lg text-[11px] transition-colors ${item.priority <= 2 ? 'bg-amber-500 hover:bg-amber-600 text-slate-900' : 'bg-slate-100/80 dark:bg-zinc-900/30 hover:bg-slate-200 dark:hover:bg-zinc-900/60 border border-slate-700/50 text-secondary'}`}>
                        {item.action} <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

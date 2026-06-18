import React, { useState } from 'react';
import {
  X, Award, AlertCircle, AlertTriangle, CheckCircle, Clock,
  TrendingDown, TrendingUp, Sparkles, FileText, Bell, Download,
  Calendar, Users, Shield, ChevronRight,
} from 'lucide-react';

const DIVISION_COMPLIANCE = [
  { name: 'K9 Unit',        pct: 98, target: 95, status: 'compliant',   badge: 'D-K9'   },
  { name: 'Investigations', pct: 94, target: 95, status: 'watch',       badge: 'D-INV'  },
  { name: 'Communications', pct: 92, target: 95, status: 'watch',       badge: 'D-COM'  },
  { name: 'Administration', pct: 88, target: 95, status: 'watch',       badge: 'D-ADM'  },
  { name: 'Detention',      pct: 84, target: 95, status: 'at-risk',     badge: 'D-DET'  },
  { name: 'School Resource',pct: 80, target: 95, status: 'at-risk',     badge: 'D-SRO'  },
  { name: 'Patrol',         pct: 72, target: 95, status: 'critical',    badge: 'D-PAT'  },
];

const CERT_CATEGORIES = [
  { name: 'P.O.S.T. Basic',       compliant: 97, total: 158, expiring30: 2,  expiring60: 5  },
  { name: 'Firearms',             compliant: 89, total: 142, expiring30: 4,  expiring60: 9  },
  { name: 'Use of Force',         compliant: 91, total: 138, expiring30: 3,  expiring60: 6  },
  { name: 'Crisis Intervention',  compliant: 85, total: 96,  expiring30: 3,  expiring60: 7  },
  { name: 'CPR/First Aid',        compliant: 68, total: 158, expiring30: 17, expiring60: 29 },
];

const UPCOMING_RECERTS = [
  { cert: 'CPR/First Aid',   due: 'Aug 2026', count: 26, division: 'Patrol (14), Detention (8), Other (4)', urgency: 'high' },
  { cert: 'Firearms',        due: 'Sep 2026', count: 14, division: 'Patrol (10), SWAT (4)',                 urgency: 'medium' },
  { cert: 'P.O.S.T. Basic', due: 'Oct 2026', count: 8,  division: 'Patrol (5), Investigations (3)',        urgency: 'medium' },
  { cert: 'Use of Force',    due: 'Dec 2026', count: 22, division: 'All Divisions',                        urgency: 'low' },
];

const MISSED_CERTS = [
  { name: 'Sarah Johnson',    badge: 'D-4522', cert: 'CPR/First Aid',   expired: '2024-09-15', division: 'Investigations', impact: 'Field duty restricted' },
  { name: 'Thomas Hardy',     badge: 'D-4531', cert: 'Firearms Qual.',  expired: '2024-08-01', division: 'Patrol',         impact: 'Weapons carry suspended' },
  { name: 'Carol Nguyen',     badge: 'D-4534', cert: 'Use of Force',    expired: '2024-10-01', division: 'Patrol',         impact: 'Use of force restricted' },
  { name: 'Marcus Rivers',    badge: 'D-4537', cert: 'Crisis Interv.',  expired: '2024-09-20', division: 'Detention',      impact: 'Limited pod assignments' },
  { name: 'Diane Ellis',      badge: 'C-1109', cert: 'EMD Certified',   expired: '2024-10-10', division: 'Dispatch',       impact: 'Emergency dispatch restricted' },
];

const AI_INSIGHTS = [
  { icon: AlertCircle, color: 'red',   title: 'Highest-Risk Certification', body: 'CPR/First Aid affects 29 personnel over 60 days. If untreated, Patrol coverage drops from 72% to 58% — below emergency minimum. Schedule batch training immediately.' },
  { icon: Users,       color: 'orange',title: 'Most At-Risk Division',      body: 'Patrol Division at 72% compliance — 23 points below target. 4 expired certs + 14 expiring within 90 days. Single most impactful intervention: schedule Patrol CPR batch (14 personnel).' },
  { icon: AlertTriangle,color:'orange', title: 'Personnel Needing Immediate Action', body: '5 personnel have expired certifications. Sarah Johnson and Thomas Hardy have the highest operational impact — both restricted from primary duties. Require scheduling within 7 days.' },
  { icon: Clock,       color: 'blue',  title: 'Future Bottleneck — Aug 2026', body: '26 CPR/First Aid certs expire in August 2026. Training capacity is 12 per session — 3 sessions minimum needed. Scheduling must begin by June to avoid a compliance crisis.' },
];

const TABS = ['Overview', 'Personnel at Risk', 'Division Rankings', 'Trend Analysis'];

const divColor = pct => pct >= 95 ? 'text-green-600 dark:text-green-400' : pct >= 85 ? 'text-orange-600 dark:text-orange-400' : 'text-red-600 dark:text-red-400';
const divBg    = pct => pct >= 95 ? 'bg-green-500/10 border-green-500/20' : pct >= 85 ? 'bg-orange-500/10 border-orange-500/20' : 'bg-red-500/10 border-red-500/20';
const divBadge = status => status === 'compliant' ? 'bg-green-500/15 border-green-500/25 text-green-600 dark:text-green-400' : status === 'at-risk' ? 'bg-orange-500/15 border-orange-500/25 text-orange-600 dark:text-orange-400' : status === 'critical' ? 'bg-red-500/15 border-red-500/25 text-red-600 dark:text-red-400' : 'bg-slate-500/15 border-slate-500/25 text-slate-500';

export default function CertificationReport({ isOpen, onClose, personnel = [], onScheduleTraining }) {
  const [tab, setTab] = useState('Overview');

  if (!isOpen) return null;

  const atRisk = personnel.filter(p => p.certifications.some(c => c.status === 'expired' || c.status === 'expiring'));
  const expired = personnel.filter(p => p.certifications.some(c => c.status === 'expired'));

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-8 overflow-y-auto">
      <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-5xl bg-white dark:bg-zinc-950 border border-border rounded-2xl shadow-2xl overflow-hidden mb-8">

        {/* Header */}
        <div className="bg-white dark:bg-zinc-950 border-b border-border px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500/15 border border-amber-500/25 flex items-center justify-center">
                <Award className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-primary">Certification Intelligence Report</h3>
                <p className="text-[10px] text-secondary">Agency-wide compliance &bull; Real-time certification risk assessment</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-zinc-900/50 rounded-lg transition-colors">
              <X className="w-5 h-5 text-secondary" />
            </button>
          </div>
          <div className="flex gap-1">
            {TABS.map(t => (
              <button key={t} onClick={() => setTab(t)}
                className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-colors ${tab === t ? 'bg-amber-500/15 border border-amber-500/25 text-amber-600 dark:text-amber-400' : 'text-secondary hover:text-primary hover:bg-slate-100/80 dark:hover:bg-zinc-900/30'}`}>
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">

          {/* ── OVERVIEW ── */}
          {tab === 'Overview' && (
            <div>
              {/* Top stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                {[
                  { label: 'Overall Compliance', value: '86%',  sub: 'Target: 95%',      color: 'orange', icon: Shield },
                  { label: 'Expiring — 30 Days', value: '8',    sub: '5 in Patrol',      color: 'red',    icon: Clock },
                  { label: 'Expiring — 60 Days', value: '14',   sub: '9 in Patrol',      color: 'orange', icon: Clock },
                  { label: 'Expiring — 90 Days', value: '23',   sub: 'Across 5 divisions',color:'orange', icon: Clock },
                ].map(({ label, value, sub, color, icon: Icon }) => (
                  <div key={label} className={`p-3 border rounded-xl ${color === 'red' ? 'bg-red-500/10 border-red-500/20' : color === 'orange' ? 'bg-orange-500/10 border-orange-500/20' : 'bg-green-500/10 border-green-500/20'}`}>
                    <div className="flex items-center gap-1.5 mb-1">
                      <Icon className={`w-3.5 h-3.5 ${color === 'red' ? 'text-red-600 dark:text-red-400' : color === 'orange' ? 'text-orange-600 dark:text-orange-400' : 'text-green-600 dark:text-green-400'}`} />
                      <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">{label}</p>
                    </div>
                    <p className={`text-2xl font-bold ${color === 'red' ? 'text-red-600 dark:text-red-400' : color === 'orange' ? 'text-orange-600 dark:text-orange-400' : 'text-green-600 dark:text-green-400'}`}>{value}</p>
                    <p className="text-[10px] text-secondary">{sub}</p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
                {/* Certification categories */}
                <div>
                  <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-2.5">Certification Categories</p>
                  <div className="space-y-2">
                    {CERT_CATEGORIES.map(c => (
                      <div key={c.name} className={`p-3 border rounded-xl ${c.compliant < 80 ? 'bg-red-500/5 border-red-500/20' : c.compliant < 90 ? 'bg-orange-500/5 border-orange-500/15' : 'bg-slate-100/50 dark:bg-zinc-900/20 border-slate-700/30'}`}>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-[12px] font-semibold text-primary">{c.name}</span>
                          <div className="flex items-center gap-2">
                            {c.expiring30 > 0 && <span className="text-[9px] px-1.5 py-0.5 bg-orange-500/15 border border-orange-500/25 text-orange-600 dark:text-orange-400 rounded-full font-bold">{c.expiring30} exp. in 30d</span>}
                            <span className={`text-[12px] font-bold ${c.compliant < 80 ? 'text-red-600 dark:text-red-400' : c.compliant < 90 ? 'text-orange-600 dark:text-orange-400' : 'text-green-600 dark:text-green-400'}`}>{c.compliant}%</span>
                          </div>
                        </div>
                        <div className="w-full bg-slate-200 dark:bg-zinc-800 rounded-full h-1.5">
                          <div className={`h-1.5 rounded-full ${c.compliant < 80 ? 'bg-red-500' : c.compliant < 90 ? 'bg-orange-500' : 'bg-green-500'}`} style={{ width: `${c.compliant}%` }} />
                        </div>
                        <p className="text-[10px] text-secondary mt-1">{Math.round(c.total * c.compliant / 100)}/{c.total} compliant &bull; {c.expiring60} expiring in 60 days</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Training backlog + missed */}
                <div className="space-y-3">
                  <div>
                    <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-2.5">Training Backlog</p>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { label: 'Overdue',            value: '8 personnel', color: 'red' },
                        { label: 'Training Hours',     value: '31 hrs',      color: 'orange' },
                        { label: 'Sessions Pending',   value: '3',           color: 'blue' },
                      ].map(({ label, value, color }) => (
                        <div key={label} className={`p-3 border rounded-xl text-center ${color === 'red' ? 'bg-red-500/10 border-red-500/20' : color === 'orange' ? 'bg-orange-500/10 border-orange-500/20' : 'bg-blue-500/10 border-blue-500/20'}`}>
                          <p className={`text-[13px] font-bold ${color === 'red' ? 'text-red-600 dark:text-red-400' : color === 'orange' ? 'text-orange-600 dark:text-orange-400' : 'text-blue-600 dark:text-blue-400'}`}>{value}</p>
                          <p className="text-[9px] text-secondary mt-0.5">{label}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-2.5">Upcoming Required Recertifications</p>
                    <div className="space-y-1.5">
                      {UPCOMING_RECERTS.map(r => (
                        <div key={r.cert} className={`flex items-center justify-between p-2.5 border rounded-lg ${r.urgency === 'high' ? 'bg-red-500/5 border-red-500/20' : r.urgency === 'medium' ? 'bg-orange-500/5 border-orange-500/15' : 'bg-slate-100/50 dark:bg-zinc-900/20 border-slate-700/30'}`}>
                          <div>
                            <p className="text-[11px] font-semibold text-primary">{r.cert}</p>
                            <p className="text-[9px] text-secondary">{r.division}</p>
                          </div>
                          <div className="text-right">
                            <p className={`text-[11px] font-bold ${r.urgency === 'high' ? 'text-red-600 dark:text-red-400' : r.urgency === 'medium' ? 'text-orange-600 dark:text-orange-400' : 'text-slate-500'}`}>{r.count} personnel</p>
                            <p className="text-[9px] text-secondary">Due {r.due}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* AI insights */}
              <div className="mb-5 p-4 bg-slate-900 dark:bg-black border border-slate-700/60 rounded-xl">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-4 h-4 text-blue-400" />
                  <span className="text-sm font-bold text-white">AI Certification Intelligence</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {AI_INSIGHTS.map((insight, i) => {
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

              {/* Command actions */}
              <div>
                <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-2.5">Command Actions</p>
                <div className="flex flex-wrap gap-2">
                  <button onClick={() => { onClose(); onScheduleTraining && onScheduleTraining(); }}
                    className="flex items-center gap-1.5 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold rounded-lg text-[11px] transition-colors">
                    <Calendar className="w-3.5 h-3.5" />Schedule Training
                  </button>
                  <button className="flex items-center gap-1.5 px-4 py-2 bg-slate-100/80 dark:bg-zinc-900/30 hover:bg-slate-200 dark:hover:bg-zinc-900/60 border border-slate-700/50 text-secondary rounded-lg text-[11px] font-medium transition-colors">
                    <Bell className="w-3.5 h-3.5" />Notify Supervisors
                  </button>
                  <button className="flex items-center gap-1.5 px-4 py-2 bg-slate-100/80 dark:bg-zinc-900/30 hover:bg-slate-200 dark:hover:bg-zinc-900/60 border border-slate-700/50 text-secondary rounded-lg text-[11px] font-medium transition-colors">
                    <FileText className="w-3.5 h-3.5" />Generate Compliance Report
                  </button>
                  <button className="flex items-center gap-1.5 px-4 py-2 bg-slate-100/80 dark:bg-zinc-900/30 hover:bg-slate-200 dark:hover:bg-zinc-900/60 border border-slate-700/50 text-secondary rounded-lg text-[11px] font-medium transition-colors">
                    <Download className="w-3.5 h-3.5" />Export Audit Documentation
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ── PERSONNEL AT RISK ── */}
          {tab === 'Personnel at Risk' && (
            <div>
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-center">
                  <p className="text-2xl font-bold text-red-600 dark:text-red-400">{MISSED_CERTS.length}</p>
                  <p className="text-[10px] text-secondary">Expired — Duty Restricted</p>
                </div>
                <div className="p-3 bg-orange-500/10 border border-orange-500/20 rounded-xl text-center">
                  <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">{atRisk.length}</p>
                  <p className="text-[10px] text-secondary">Expiring in 30 Days (live)</p>
                </div>
                <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-center">
                  <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">23</p>
                  <p className="text-[10px] text-secondary">Expiring in 90 Days</p>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-2">Expired — Immediate Action Required</p>
                <div className="space-y-2">
                  {MISSED_CERTS.map((p, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-red-500/5 border border-red-500/20 rounded-xl">
                      <div className="w-8 h-8 rounded-lg bg-red-500/15 flex items-center justify-center flex-shrink-0">
                        <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-[12px] font-semibold text-amber-600 dark:text-amber-400">{p.name}</span>
                          <span className="text-[9px] text-secondary">{p.badge} &bull; {p.division}</span>
                        </div>
                        <p className="text-[10px] text-red-600 dark:text-red-400">{p.cert} expired {p.expired} &bull; {p.impact}</p>
                      </div>
                      <button onClick={() => { onClose(); onScheduleTraining && onScheduleTraining(); }}
                        className="flex-shrink-0 flex items-center gap-1 px-2.5 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold rounded-lg text-[10px] transition-colors whitespace-nowrap">
                        Schedule <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-2">Expiring Soon (Live Personnel)</p>
                <div className="space-y-2">
                  {atRisk.map(person => {
                    const riskCerts = person.certifications.filter(c => c.status === 'expired' || c.status === 'expiring');
                    const isExpired = riskCerts.some(c => c.status === 'expired');
                    return (
                      <div key={person.id} className={`flex items-center gap-3 p-3 border rounded-xl ${isExpired ? 'bg-red-500/5 border-red-500/20' : 'bg-orange-500/5 border-orange-500/15'}`}>
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                          <span className="text-white text-[10px] font-semibold">{person.photo}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-[12px] font-semibold text-amber-600 dark:text-amber-400">{person.name}</span>
                            <span className="text-[9px] text-secondary">{person.badge} &bull; {person.division}</span>
                          </div>
                          {riskCerts.map((c, i) => (
                            <p key={i} className={`text-[10px] ${c.status === 'expired' ? 'text-red-600 dark:text-red-400' : 'text-orange-600 dark:text-orange-400'}`}>
                              {c.name} — {c.status} (exp. {c.expires})
                            </p>
                          ))}
                        </div>
                        <button onClick={() => { onClose(); onScheduleTraining && onScheduleTraining(person, riskCerts[0]?.name); }}
                          className="flex-shrink-0 flex items-center gap-1 px-2.5 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold rounded-lg text-[10px] transition-colors whitespace-nowrap">
                          Schedule <ChevronRight className="w-3 h-3" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* ── DIVISION RANKINGS ── */}
          {tab === 'Division Rankings' && (
            <div>
              <div className="flex items-center gap-2 mb-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                <Sparkles className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <p className="text-[11px] text-slate-300 dark:text-slate-300">
                  <span className="text-white font-semibold">AI Analysis:</span>{' '}
                  Patrol Division is the most critical — 23 points below target, with CPR/First Aid as the primary driver. Addressing Patrol alone would raise agency-wide compliance from 86% to 91%.
                </p>
              </div>
              <div className="space-y-3">
                {DIVISION_COMPLIANCE.map((div, i) => (
                  <div key={div.name} className={`p-4 border rounded-xl ${divBg(div.pct)}`}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <span className="text-[11px] font-bold text-slate-400 w-5">#{i + 1}</span>
                        <span className="text-[13px] font-semibold text-primary">{div.name}</span>
                        <span className={`text-[9px] px-2 py-0.5 rounded-full border font-bold uppercase ${divBadge(div.status)}`}>{div.status}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        {div.pct >= div.target
                          ? <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-400" />
                          : <TrendingDown className="w-4 h-4 text-red-600 dark:text-red-400" />}
                        <span className={`text-xl font-bold ${divColor(div.pct)}`}>{div.pct}%</span>
                      </div>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-zinc-800 rounded-full h-2 mb-2">
                      <div className={`h-2 rounded-full transition-all ${div.pct >= 95 ? 'bg-green-500' : div.pct >= 85 ? 'bg-orange-500' : 'bg-red-500'}`} style={{ width: `${div.pct}%` }} />
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-[10px] text-secondary">Target: {div.target}% &bull; Gap: {div.target - div.pct > 0 ? `−${div.target - div.pct} pts` : 'Met'}</p>
                      {div.pct < div.target && (
                        <button onClick={() => { onClose(); onScheduleTraining && onScheduleTraining(); }}
                          className="text-[9px] px-2 py-1 bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold rounded transition-colors">
                          Schedule Training →
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── TREND ANALYSIS ── */}
          {tab === 'Trend Analysis' && (
            <div>
              <div className="mb-5">
                <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-3">Agency-Wide Compliance Trend (12 Months)</p>
                <div className="flex items-end gap-2 h-28 mb-2">
                  {[
                    { month: 'Jul', pct: 91 }, { month: 'Aug', pct: 90 }, { month: 'Sep', pct: 89 },
                    { month: 'Oct', pct: 88 }, { month: 'Nov', pct: 87 }, { month: 'Dec', pct: 88 },
                    { month: 'Jan', pct: 89 }, { month: 'Feb', pct: 88 }, { month: 'Mar', pct: 87 },
                    { month: 'Apr', pct: 87 }, { month: 'May', pct: 86 }, { month: 'Jun', pct: 86, current: true },
                  ].map(({ month, pct, current }) => (
                    <div key={month} className="flex-1 flex flex-col items-center gap-1">
                      <span className="text-[9px] text-secondary font-medium">{pct}%</span>
                      <div className="w-full rounded-t" style={{ height: `${(pct / 100) * 88}px`, background: current ? '#f59e0b' : pct >= 90 ? '#22c55e' : pct >= 85 ? '#f97316' : '#ef4444' }} />
                      <span className={`text-[9px] font-medium ${current ? 'text-amber-600 dark:text-amber-400' : 'text-secondary'}`}>{month}</span>
                    </div>
                  ))}
                </div>
                <p className="text-[10px] text-secondary">Compliance has declined 5 points over 12 months, driven primarily by CPR/First Aid lapse rate in Patrol.</p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-5">
                <div>
                  <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-2.5">CPR/First Aid Compliance Trend</p>
                  <div className="space-y-1.5">
                    {[
                      { period: 'Q3 2025', pct: 82 }, { period: 'Q4 2025', pct: 76 },
                      { period: 'Q1 2026', pct: 72 }, { period: 'Q2 2026', pct: 68 },
                    ].map(({ period, pct }) => (
                      <div key={period} className="flex items-center gap-2">
                        <span className="text-[10px] text-secondary w-16">{period}</span>
                        <div className="flex-1 bg-slate-200 dark:bg-zinc-800 rounded-full h-1.5">
                          <div className="h-1.5 rounded-full bg-red-500 transition-all" style={{ width: `${pct}%` }} />
                        </div>
                        <span className="text-[10px] font-bold text-red-600 dark:text-red-400 w-8 text-right">{pct}%</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-[10px] text-red-600 dark:text-red-400 mt-2 flex items-center gap-1"><TrendingDown className="w-3 h-3" />−14 pts over 4 quarters</p>
                </div>
                <div>
                  <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-2.5">Projected (Without Intervention)</p>
                  <div className="space-y-1.5">
                    {[
                      { period: 'Q3 2026', pct: 63, projected: true }, { period: 'Q4 2026', pct: 58, projected: true },
                      { period: 'Q1 2027', pct: 51, projected: true }, { period: 'Q2 2027', pct: 47, projected: true },
                    ].map(({ period, pct }) => (
                      <div key={period} className="flex items-center gap-2">
                        <span className="text-[10px] text-secondary w-16">{period}</span>
                        <div className="flex-1 bg-slate-200 dark:bg-zinc-800 rounded-full h-1.5">
                          <div className="h-1.5 rounded-full bg-red-400/60 transition-all" style={{ width: `${pct}%`, borderStyle: 'dashed' }} />
                        </div>
                        <span className="text-[10px] font-bold text-red-400 w-8 text-right">{pct}%</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-[10px] text-slate-500 mt-2">Projected minimum staffing breach: Q4 2026</p>
                </div>
              </div>

              <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                <div className="flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[12px] font-bold text-primary mb-1">AI Trend Conclusion</p>
                    <p className="text-[11px] text-secondary leading-relaxed">
                      Current trajectory projects agency CPR compliance dropping below 50% by Q2 2027 — a regulatory minimum staffing crisis. The intervention point is now. A batch CPR training program in Q3 2026 covering all Patrol, Detention, and Dispatch personnel (47 total across 4 sessions) would reverse the trend and project compliance back to 91% by Q1 2027.
                    </p>
                    <button onClick={() => { onClose(); onScheduleTraining && onScheduleTraining(); }}
                      className="mt-3 flex items-center gap-1.5 px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold rounded-lg text-[11px] transition-colors">
                      <Calendar className="w-3.5 h-3.5" />Schedule Batch CPR Training Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

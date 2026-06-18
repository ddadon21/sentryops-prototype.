import React, { useState, useMemo, useEffect } from 'react';
import {
  X, GraduationCap, CheckCircle, AlertTriangle, AlertCircle,
  ChevronRight, ArrowLeft, Sparkles, Search, Award, ExternalLink,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';

const CERT_TYPES = [
  'CPR/First Aid', 'P.O.S.T. Basic', 'P.O.S.T. Advanced',
  'Firearms Qualification', 'Corrections Officer Cert', 'Detective Certification',
  'K9 Handler', 'FTO Certification', 'Crisis Intervention',
  'Defensive Tactics', 'TASER Certification', 'Use of Force',
];
const LOCATIONS = [
  'Training Annex A', 'Training Annex B', 'HQ Conference Room 1',
  'HQ Conference Room 2', 'Firing Range', 'Regional Training Center',
];
const INSTRUCTORS = [
  'Sgt. Martinez — CPR/First Aid', 'Lt. Thompson — Firearms',
  'Capt. Wilson — P.O.S.T.', 'Sgt. Davis — Crisis Intervention',
  'Officer Robinson — TASER', 'External Contractor — Defensive Tactics',
];
const DURATIONS = ['2 hours', '4 hours', '8 hours (Full Day)', '2 Days', '3 Days'];
const TIME_SLOTS = ['07:00', '08:00', '09:00', '10:00', '13:00', '14:00'];

// Division staffing reflects live dashboard state (Patrol at 75% of 40 = 30 available)
const DIVISION_STAFFING = {
  'Patrol':         { total: 40, current: 30, minimum: 32 },
  'Investigations': { total: 18, current: 17, minimum: 14 },
  'Detention':      { total: 28, current: 25, minimum: 22 },
  'Dispatch':       { total: 12, current: 11, minimum: 10 },
  'School Resource':{ total: 8,  current: 7,  minimum: 6  },
  'K9':             { total: 6,  current: 6,  minimum: 5  },
  'Administration': { total: 8,  current: 8,  minimum: 6  },
  'SWAT':           { total: 10, current: 9,  minimum: 8  },
};

const FUTURE_DATES = [
  'Mon, Jun 23, 2026', 'Tue, Jun 24, 2026', 'Wed, Jun 25, 2026',
  'Thu, Jun 26, 2026', 'Mon, Jun 30, 2026', 'Tue, Jul 1, 2026',
  'Wed, Jul 2, 2026',  'Thu, Jul 3, 2026',  'Mon, Jul 7, 2026',
  'Tue, Jul 8, 2026',
];

const POST_ACTIONS = [
  'Synced to HR Training Management',
  'Employee notification sent',
  'Supervisor notification sent',
  'Certification records updated',
  'Compliance metrics refreshed',
  'Workforce readiness scores updated',
  'Certification risk removed from dashboard',
  'Added to Command Calendar',
  'Audit trail created',
];

const STEP_LABELS = ['Personnel', 'Details', 'Impact', 'Confirm'];

export default function ScheduleTrainingWorkflow({
  isOpen, onClose, personnel = [], preselectedPerson = null, preselectedCert = null,
}) {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedIds, setSelectedIds] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCertRisk, setFilterCertRisk] = useState(false);
  const [config, setConfig] = useState({ certType: '', date: '', time: '09:00', duration: '8 hours (Full Day)', location: '', instructor: '', capacity: 12 });
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    setStep(1);
    setSelectedIds(preselectedPerson ? [preselectedPerson.id] : []);
    setConfig({ certType: preselectedCert || '', date: '', time: '09:00', duration: '8 hours (Full Day)', location: '', instructor: '', capacity: 12 });
    setConfirmed(false);
    setSearchQuery('');
    setFilterCertRisk(false);
  }, [isOpen, preselectedPerson, preselectedCert]);

  const filteredPersonnel = useMemo(() => personnel.filter(p => {
    const q = searchQuery.toLowerCase();
    const matchSearch = !q || p.name.toLowerCase().includes(q) || p.badge.toLowerCase().includes(q) || p.division.toLowerCase().includes(q);
    const matchFilter = !filterCertRisk || p.certifications.some(c => c.status === 'expired' || c.status === 'expiring');
    return matchSearch && matchFilter;
  }), [personnel, searchQuery, filterCertRisk]);

  const selectedPeople = useMemo(() => personnel.filter(p => selectedIds.includes(p.id)), [personnel, selectedIds]);

  const impact = useMemo(() => {
    if (!selectedPeople.length || !config.date) return null;
    const byDiv = {};
    selectedPeople.forEach(p => { (byDiv[p.division] = byDiv[p.division] || []).push(p); });
    const divImpacts = Object.entries(byDiv).map(([div, people]) => {
      const s = DIVISION_STAFFING[div] || { total: 20, current: 18, minimum: 15 };
      const during = s.current - people.length;
      const pct = Math.round((during / s.total) * 100);
      return { division: div, training: people.length, during, total: s.total, minimum: s.minimum, pct, violation: during < s.minimum };
    });
    const hasViolation = divImpacts.some(d => d.violation);
    const complianceGains = selectedPeople.filter(p => p.certifications.some(c => c.status === 'expired' || c.status === 'expiring')).length;
    const otNeeded = divImpacts.filter(d => d.violation).reduce((s, d) => s + (d.minimum - d.during), 0);
    const altDates = hasViolation ? [
      { date: 'Mon, Jun 30, 2026', reason: 'Additional Patrol staff returns from leave', impact: 'No minimum staffing violations' },
      { date: 'Mon, Jul 7, 2026',  reason: '2 new Patrol hires projected on-boarded',   impact: 'OT cost eliminated — $0 backfill' },
    ] : [];
    return { divImpacts, hasViolation, complianceGains, otNeeded, altDates };
  }, [selectedPeople, config.date]);

  const toggleEmp = id => setSelectedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  const step1Valid = selectedIds.length > 0;
  const step2Valid = config.certType && config.date && config.location && config.instructor;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-10 overflow-y-auto">
      <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-3xl bg-white dark:bg-zinc-950 border border-border rounded-2xl shadow-2xl overflow-hidden mb-8">

        {/* Header */}
        <div className="bg-white dark:bg-zinc-950 border-b border-border px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-green-500/15 border border-green-500/25 flex items-center justify-center">
                <GraduationCap className="w-4 h-4 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-primary">Schedule Training</h3>
                <p className="text-[10px] text-secondary">Command Workflow &bull; HR Training Management</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-zinc-900/50 rounded-lg transition-colors">
              <X className="w-5 h-5 text-secondary" />
            </button>
          </div>
          {!confirmed && (
            <div className="flex items-center gap-2">
              {STEP_LABELS.map((label, idx) => {
                const n = idx + 1;
                const done = step > n;
                const active = step === n;
                return (
                  <React.Fragment key={n}>
                    <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold border transition-all ${done ? 'bg-green-500/15 border-green-500/25 text-green-600 dark:text-green-400' : active ? 'bg-amber-500/15 border-amber-500/25 text-amber-600 dark:text-amber-400' : 'bg-slate-100/80 dark:bg-zinc-900/30 border-slate-700/40 text-slate-500'}`}>
                      {done ? <CheckCircle className="w-3 h-3" /> : <span className="w-3 h-3 text-center leading-3">{n}</span>}
                      {label}
                    </div>
                    {idx < 3 && <ChevronRight className="w-3 h-3 text-slate-400 flex-shrink-0" />}
                  </React.Fragment>
                );
              })}
            </div>
          )}
        </div>

        <div className="p-6">

          {/* ── STEP 1: Personnel Selection ── */}
          {step === 1 && (
            <div>
              <p className="text-[11px] text-secondary mb-3">Select one or more employees. Personnel with active certification risk are highlighted.</p>
              <div className="flex items-center gap-2 mb-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                  <input type="text" placeholder="Search name, badge, or division…" value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                    className="w-full pl-8 pr-3 py-2 bg-slate-100/80 dark:bg-zinc-900/30 border border-slate-700/50 rounded-lg text-[12px] text-primary placeholder:text-slate-400 focus:outline-none focus:border-amber-500/50" />
                </div>
                <button onClick={() => setFilterCertRisk(v => !v)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg border text-[11px] font-medium transition-colors whitespace-nowrap ${filterCertRisk ? 'bg-orange-500/15 border-orange-500/30 text-orange-600 dark:text-orange-400' : 'bg-slate-100/80 dark:bg-zinc-900/30 border-slate-700/50 text-secondary'}`}>
                  <AlertTriangle className="w-3 h-3" />Cert Risk Only
                </button>
              </div>
              <div className="space-y-1.5 max-h-72 overflow-y-auto pr-0.5">
                {filteredPersonnel.map(p => {
                  const hasCertRisk = p.certifications.some(c => c.status === 'expired' || c.status === 'expiring');
                  const isSelected = selectedIds.includes(p.id);
                  const riskCerts = p.certifications.filter(c => c.status === 'expired' || c.status === 'expiring');
                  return (
                    <label key={p.id} className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${isSelected ? 'bg-amber-500/10 border-amber-500/30' : hasCertRisk ? 'bg-orange-500/5 border-orange-500/20 hover:border-orange-500/40' : 'bg-slate-100/50 dark:bg-zinc-900/20 border-slate-700/30 hover:border-slate-600/50'}`}>
                      <input type="checkbox" checked={isSelected} onChange={() => toggleEmp(p.id)} className="accent-amber-500 w-4 h-4 flex-shrink-0" />
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-[10px] font-semibold">{p.photo}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[12px] font-semibold text-amber-600 dark:text-amber-400">{p.name}</span>
                          {hasCertRisk && <span className="text-[9px] px-1.5 py-0.5 bg-orange-500/15 border border-orange-500/25 text-orange-600 dark:text-orange-400 rounded-full font-bold uppercase">Cert Risk</span>}
                          {p.status === 'on-leave' && <span className="text-[9px] px-1.5 py-0.5 bg-red-500/15 border border-red-500/25 text-red-600 dark:text-red-400 rounded-full font-bold uppercase">On Leave</span>}
                        </div>
                        <p className="text-[10px] text-secondary truncate">{p.rank} &bull; {p.division} &bull; Badge {p.badge}</p>
                      </div>
                      <div className="text-right flex-shrink-0 space-y-0.5">
                        {riskCerts.map((c, i) => (
                          <p key={i} className={`text-[9px] font-semibold ${c.status === 'expired' ? 'text-red-600 dark:text-red-400' : 'text-orange-600 dark:text-orange-400'}`}>{c.name} {c.status}</p>
                        ))}
                      </div>
                    </label>
                  );
                })}
              </div>
              <div className="mt-4 flex items-center justify-between pt-4 border-t border-border">
                <p className="text-[11px] text-secondary">{selectedIds.length > 0 ? <><span className="font-bold text-primary">{selectedIds.length}</span> employee{selectedIds.length > 1 ? 's' : ''} selected</> : 'No employees selected'}</p>
                <button onClick={() => setStep(2)} disabled={!step1Valid} className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 disabled:opacity-40 disabled:cursor-not-allowed text-slate-900 font-semibold rounded-lg text-sm transition-colors">
                  Training Details <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* ── STEP 2: Training Details ── */}
          {step === 2 && (
            <div>
              <div className="mb-4 p-3 bg-slate-100/80 dark:bg-zinc-900/30 border border-slate-700/40 rounded-xl">
                <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-2">Scheduling For</p>
                <div className="flex flex-wrap gap-2">
                  {selectedPeople.map(p => (
                    <span key={p.id} className="px-2 py-1 bg-white dark:bg-zinc-900 border border-slate-700/40 rounded-lg text-[11px] font-medium">
                      <span className="text-amber-600 dark:text-amber-400">{p.name}</span>
                      <span className="text-slate-400"> &bull; {p.division}</span>
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2">
                  <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Certification / Training Type</label>
                  <select value={config.certType} onChange={e => setConfig(c => ({ ...c, certType: e.target.value }))}
                    className="w-full px-3 py-2 bg-slate-100/80 dark:bg-zinc-900/30 border border-slate-700/50 rounded-lg text-[12px] text-primary focus:outline-none focus:border-amber-500/50">
                    <option value="">Select certification type…</option>
                    {CERT_TYPES.map(ct => <option key={ct} value={ct}>{ct}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Date</label>
                  <select value={config.date} onChange={e => setConfig(c => ({ ...c, date: e.target.value }))}
                    className="w-full px-3 py-2 bg-slate-100/80 dark:bg-zinc-900/30 border border-slate-700/50 rounded-lg text-[12px] text-primary focus:outline-none focus:border-amber-500/50">
                    <option value="">Select date…</option>
                    {FUTURE_DATES.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Start Time</label>
                  <select value={config.time} onChange={e => setConfig(c => ({ ...c, time: e.target.value }))}
                    className="w-full px-3 py-2 bg-slate-100/80 dark:bg-zinc-900/30 border border-slate-700/50 rounded-lg text-[12px] text-primary focus:outline-none focus:border-amber-500/50">
                    {TIME_SLOTS.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Duration</label>
                  <select value={config.duration} onChange={e => setConfig(c => ({ ...c, duration: e.target.value }))}
                    className="w-full px-3 py-2 bg-slate-100/80 dark:bg-zinc-900/30 border border-slate-700/50 rounded-lg text-[12px] text-primary focus:outline-none focus:border-amber-500/50">
                    {DURATIONS.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Capacity</label>
                  <select value={config.capacity} onChange={e => setConfig(c => ({ ...c, capacity: Number(e.target.value) }))}
                    className="w-full px-3 py-2 bg-slate-100/80 dark:bg-zinc-900/30 border border-slate-700/50 rounded-lg text-[12px] text-primary focus:outline-none focus:border-amber-500/50">
                    {[4, 6, 8, 10, 12, 16, 20, 24].map(n => <option key={n} value={n}>{n} participants</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Location</label>
                  <select value={config.location} onChange={e => setConfig(c => ({ ...c, location: e.target.value }))}
                    className="w-full px-3 py-2 bg-slate-100/80 dark:bg-zinc-900/30 border border-slate-700/50 rounded-lg text-[12px] text-primary focus:outline-none focus:border-amber-500/50">
                    <option value="">Select location…</option>
                    {LOCATIONS.map(l => <option key={l} value={l}>{l}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Instructor</label>
                  <select value={config.instructor} onChange={e => setConfig(c => ({ ...c, instructor: e.target.value }))}
                    className="w-full px-3 py-2 bg-slate-100/80 dark:bg-zinc-900/30 border border-slate-700/50 rounded-lg text-[12px] text-primary focus:outline-none focus:border-amber-500/50">
                    <option value="">Select instructor…</option>
                    {INSTRUCTORS.map(i => <option key={i} value={i}>{i}</option>)}
                  </select>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between pt-4 border-t border-border">
                <button onClick={() => setStep(1)} className="flex items-center gap-1.5 px-3 py-2 text-secondary hover:text-primary text-sm font-medium transition-colors">
                  <ArrowLeft className="w-4 h-4" />Back
                </button>
                <button onClick={() => setStep(3)} disabled={!step2Valid} className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 disabled:opacity-40 disabled:cursor-not-allowed text-slate-900 font-semibold rounded-lg text-sm transition-colors">
                  Review Impact <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* ── STEP 3: Staffing Impact Review ── */}
          {step === 3 && impact && (
            <div>
              <p className="text-[11px] text-secondary mb-4">
                <span className="font-semibold text-primary">{config.certType}</span>
                {' '}&bull; {config.date} &bull; {config.time} &bull; {config.duration} &bull; {config.location}
              </p>

              {impact.hasViolation && (
                <div className="mb-4 p-3 bg-red-500/10 border border-red-500/25 rounded-xl flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[12px] font-bold text-red-600 dark:text-red-400">Minimum Staffing Violation</p>
                    <p className="text-[11px] text-red-700 dark:text-red-400/80 mt-0.5">
                      Removing selected personnel will drop coverage below the required minimum threshold. Review alternatives or proceed with mandatory overtime backfill.
                    </p>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="p-3 bg-slate-100/80 dark:bg-zinc-900/30 border border-slate-700/40 rounded-xl text-center">
                  <p className="text-[10px] text-slate-500 uppercase font-semibold tracking-wider mb-1">In Training</p>
                  <p className="text-2xl font-bold text-primary">{selectedPeople.length}</p>
                  <p className="text-[10px] text-secondary">personnel</p>
                </div>
                <div className={`p-3 border rounded-xl text-center ${impact.complianceGains > 0 ? 'bg-green-500/10 border-green-500/25' : 'bg-slate-100/80 dark:bg-zinc-900/30 border-slate-700/40'}`}>
                  <p className="text-[10px] text-slate-500 uppercase font-semibold tracking-wider mb-1">Compliance Gain</p>
                  <p className={`text-2xl font-bold ${impact.complianceGains > 0 ? 'text-green-600 dark:text-green-400' : 'text-primary'}`}>+{impact.complianceGains}</p>
                  <p className="text-[10px] text-secondary">cert risks resolved</p>
                </div>
                <div className={`p-3 border rounded-xl text-center ${impact.otNeeded > 0 ? 'bg-orange-500/10 border-orange-500/25' : 'bg-slate-100/80 dark:bg-zinc-900/30 border-slate-700/40'}`}>
                  <p className="text-[10px] text-slate-500 uppercase font-semibold tracking-wider mb-1">OT Required</p>
                  <p className={`text-2xl font-bold ${impact.otNeeded > 0 ? 'text-orange-600 dark:text-orange-400' : 'text-primary'}`}>{impact.otNeeded}</p>
                  <p className="text-[10px] text-secondary">backfill positions</p>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-2">Division Coverage During Training Window</p>
                <div className="space-y-2">
                  {impact.divImpacts.map(d => (
                    <div key={d.division} className={`p-3 border rounded-xl ${d.violation ? 'bg-red-500/5 border-red-500/20' : 'bg-slate-100/50 dark:bg-zinc-900/20 border-slate-700/30'}`}>
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2">
                          {d.violation
                            ? <AlertCircle className="w-3.5 h-3.5 text-red-600 dark:text-red-400" />
                            : <CheckCircle className="w-3.5 h-3.5 text-green-600 dark:text-green-400" />}
                          <span className="text-[12px] font-semibold text-primary">{d.division}</span>
                          {d.violation && <span className="text-[9px] px-1.5 py-0.5 bg-red-500/15 border border-red-500/25 text-red-600 dark:text-red-400 rounded-full font-bold uppercase">Below Minimum</span>}
                        </div>
                        <span className={`text-[12px] font-bold ${d.violation ? 'text-red-600 dark:text-red-400' : 'text-primary'}`}>{d.during}/{d.total} available ({d.pct}%)</span>
                      </div>
                      <div className="w-full bg-slate-200 dark:bg-zinc-800 rounded-full h-1.5 mb-1">
                        <div className={`h-1.5 rounded-full ${d.violation ? 'bg-red-500' : d.pct < 88 ? 'bg-orange-500' : 'bg-green-500'}`} style={{ width: `${d.pct}%` }} />
                      </div>
                      <p className="text-[10px] text-secondary">Minimum required: {d.minimum} &bull; {d.training} scheduled for training</p>
                    </div>
                  ))}
                </div>
              </div>

              {impact.hasViolation && impact.altDates.length > 0 && (
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                    <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">AI — Alternative Dates (No Staffing Violations)</p>
                  </div>
                  <div className="space-y-2">
                    {impact.altDates.map((alt, i) => (
                      <button key={i} onClick={() => { setConfig(c => ({ ...c, date: alt.date })); setStep(3); }}
                        className="w-full text-left p-3 bg-blue-500/5 border border-blue-500/20 hover:border-blue-500/40 rounded-xl transition-colors">
                        <div className="flex items-center justify-between">
                          <span className="text-[12px] font-semibold text-primary">{alt.date}</span>
                          <span className="text-[10px] text-blue-600 dark:text-blue-400 font-medium">Select →</span>
                        </div>
                        <p className="text-[10px] text-secondary mt-0.5">{alt.reason} &bull; {alt.impact}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between pt-4 border-t border-border">
                <button onClick={() => setStep(2)} className="flex items-center gap-1.5 px-3 py-2 text-secondary hover:text-primary text-sm font-medium transition-colors">
                  <ArrowLeft className="w-4 h-4" />Back
                </button>
                <button onClick={() => setStep(4)} className={`flex items-center gap-2 px-4 py-2 font-semibold rounded-lg text-sm transition-colors ${impact.hasViolation ? 'bg-orange-500 hover:bg-orange-600 text-white' : 'bg-amber-500 hover:bg-amber-600 text-slate-900'}`}>
                  {impact.hasViolation ? 'Proceed with OT Backfill' : 'Confirm Training'}
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* ── STEP 4: Confirm & Execute ── */}
          {step === 4 && (
            <div>
              {!confirmed ? (
                <>
                  <p className="text-[11px] text-secondary mb-4">Review the training details. On confirmation, all actions below execute automatically.</p>
                  <div className="p-4 bg-slate-100/80 dark:bg-zinc-900/30 border border-slate-700/40 rounded-xl mb-4 space-y-2.5">
                    {[
                      ['Certification', config.certType],
                      ['Date & Time', `${config.date} • ${config.time}`],
                      ['Duration', config.duration],
                      ['Location', config.location],
                      ['Instructor', config.instructor],
                      ['Capacity', `${config.capacity} participants`],
                    ].map(([label, value]) => (
                      <div key={label} className="flex justify-between text-[12px]">
                        <span className="text-secondary">{label}</span>
                        <span className="text-primary font-semibold">{value}</span>
                      </div>
                    ))}
                    <div className="border-t border-slate-700/30 pt-2">
                      <span className="text-[12px] text-secondary">Personnel ({selectedPeople.length})</span>
                      <div className="flex flex-wrap gap-1.5 mt-1.5">
                        {selectedPeople.map(p => (
                          <span key={p.id} className="px-2 py-0.5 bg-white dark:bg-zinc-900 border border-slate-700/40 rounded text-[11px] font-semibold text-amber-600 dark:text-amber-400">{p.name}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="mb-5">
                    <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-2">Actions Executed On Confirmation</p>
                    <div className="grid grid-cols-2 gap-y-1.5 gap-x-4">
                      {POST_ACTIONS.map((a, i) => (
                        <div key={i} className="flex items-center gap-2 text-[11px] text-secondary">
                          <CheckCircle className="w-3 h-3 text-slate-400 flex-shrink-0" />{a}
                        </div>
                      ))}
                    </div>
                  </div>
                  <button onClick={() => setConfirmed(true)} className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold rounded-xl text-sm transition-colors">
                    <CheckCircle className="w-4 h-4" />Confirm &amp; Execute All Actions
                  </button>
                </>
              ) : (
                <div className="py-4 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/15 border-2 border-green-500/30 flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                  </div>
                  <h4 className="text-lg font-bold text-primary mb-1">Training Scheduled</h4>
                  <p className="text-sm text-secondary mb-5">{config.certType} training confirmed for {selectedPeople.length} employee{selectedPeople.length > 1 ? 's' : ''} on {config.date}.</p>
                  <div className="text-left mb-5 p-4 bg-slate-100/80 dark:bg-zinc-900/30 border border-slate-700/40 rounded-xl">
                    <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-2.5">Completed Actions</p>
                    <div className="space-y-1.5">
                      {POST_ACTIONS.map((a, i) => (
                        <div key={i} className="flex items-center gap-2 text-[11px] text-primary">
                          <CheckCircle className="w-3.5 h-3.5 text-green-600 dark:text-green-400 flex-shrink-0" />{a}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <button onClick={() => navigate(createPageUrl('TrainingCertifications'))}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-100/80 dark:bg-zinc-900/30 hover:bg-slate-200 dark:hover:bg-zinc-900/60 border border-slate-700/50 text-secondary hover:text-primary rounded-xl text-sm font-medium transition-colors">
                      <ExternalLink className="w-4 h-4" />View in HR &bull; Training Management
                    </button>
                    <button onClick={onClose} className="w-full px-4 py-2.5 text-secondary hover:text-primary text-sm font-medium transition-colors">Done</button>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

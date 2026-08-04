import React, { useState, useEffect, useCallback } from 'react';
import { Sparkles } from 'lucide-react';
import DashboardLayout from '../layouts/DashboardLayout';

// ── Decision queue — Aug 3 snapshot ─────────────────────────────
const categoryBadge = {
  UOF: 'border-red-500/40 text-red-400',
  STAFFING: 'border-amber-500/40 text-amber-400',
  FISCAL: 'border-emerald-500/40 text-emerald-400',
  PERSONNEL: 'border-blue-500/40 text-blue-400',
  POLICY: 'border-violet-500/40 text-violet-400',
};

const INITIAL_QUEUE = [
  {
    id: 'OT-2026-0803', category: 'STAFFING', expiring: true, requiresRationale: false,
    title: 'Sector 4 day-shift coverage — 2 below minimum',
    due: 'by 0700', dueColor: 'text-red-400', dot: 'bg-red-500',
    requester: 'Lt. Chen, Patrol', submitted: 'submitted Aug 3, 05:52',
    requires: 'Requires: Sheriff · OT above 4 hours per deputy',
    expiryNote: 'At 0700 the roster locks and Sector 4 beats consolidate automatically.',
    request: 'Two unplanned absences drop Sector 4 day shift to 26 deputies against a minimum of 28. Requesting overtime backfill for two deputies, 0700–1900, $1,870 total at 1.5x. Both volunteers are staged and under their monthly OT caps.',
    evidence: [
      { title: 'Roster snapshot', desc: 'Day shift at 26 of 28 after two call-outs; no reserve pool available today.', source: 'HR scheduling · 05:49' },
      { title: 'OT roster', desc: 'Deputies Torres and Park volunteered; both under monthly OT caps.', source: 'HR scheduling · 05:52' },
    ],
    policyBasis: 'Policy 2.7 — Minimum staffing. Sector coverage below minimum requires OT backfill or beat consolidation.',
    history: 'You have approved 9 of 10 coverage requests this quarter; average decision time 11 minutes.',
    impact: { approved: 'Coverage restored by 0700; monthly OT budget moves to 104%.', denied: 'Sector 4 runs single-officer beats all day; backup delay 8–12 min on priority calls.' },
    budget: null,
    ai: { verdict: 'Approve', confidence: 94, note: 'cheapest available coverage option; both volunteers under OT caps' },
    actionNote: 'Approval notifies both deputies and locks the 0700 roster.',
  },
  {
    id: 'UOF-2026-114', category: 'UOF', expiring: true, requiresRationale: true,
    title: 'Use-of-Force review — taser deployment, Aug 1',
    due: '11h left', dueColor: 'text-red-400', dot: 'bg-red-500',
    requester: 'Capt. Rodriguez, Patrol', submitted: 'submitted Aug 2, 14:20',
    requires: 'Requires: Sheriff · Review board recommendation attached',
    expiryNote: 'At 1700 the review window lapses to a state reporting exception.',
    request: 'Review board recommends finding of within-policy for taser deployment during the Aug 1 arrest at Eastgate Plaza. Subject was non-compliant and advancing; two verbal warnings given. One board member dissented on warning interval. Your decision closes the review.',
    evidence: [
      { title: 'Body-cam — Unit 114 (4:32)', desc: 'Full encounter. Warnings audible at 1:58 and 2:14; deployment at 2:21.', source: 'BWC system · Aug 1' },
      { title: 'Review board memo', desc: '4–1 within policy. Dissent: warning interval below training standard.', source: 'IA · Aug 2' },
      { title: 'Subject medical report', desc: 'Evaluated on scene, no injuries beyond probe sites.', source: 'EMS · Aug 1' },
    ],
    policyBasis: 'Policy 3.4 §6 — Electronic control devices. Deployment permitted against actively resisting subjects after warning where feasible.',
    history: 'You have closed 7 UOF reviews this year: 6 within policy, 1 referred to IA.',
    impact: { approved: 'Deputy returns to full duty; review closes with board finding adopted.', denied: 'Refers to IA for formal investigation; deputy remains on administrative assignment.' },
    budget: null,
    ai: { verdict: 'Approve', confidence: 91, note: 'board finding consistent with your 6 prior within-policy closures; dissent addressed in the training note' },
    actionNote: 'Approval closes UOF-2026-114 and notifies the review board and deputy.',
  },
  {
    id: 'FIS-2026-0219', category: 'FISCAL', expiring: false, requiresRationale: false,
    title: 'Body-cam storage expansion — $18,400',
    due: '2d', dueColor: 'text-slate-400', dot: 'bg-slate-600',
    requester: 'R. Chen, IT', submitted: 'submitted Aug 1, 09:10',
    requires: 'Requires: Sheriff · purchases above $15K',
    expiryNote: null,
    request: 'Evidence storage array is at 91% capacity and the retention policy requires 18 months. $18,400 expands capacity through FY27 on state-contract pricing; the quote is locked until Aug 12.',
    evidence: [
      { title: 'Capacity report', desc: '91% used; projected full by Sep 8 at current ingest rate.', source: 'BWC system · Aug 1' },
      { title: 'Vendor quote', desc: 'State-contract pricing SWC-114; 3-year warranty included.', source: 'Procurement · Jul 30' },
    ],
    policyBasis: 'Policy 5.1 — Evidence retention. 18-month body-cam retention is mandated; deletion before term is a compliance breach.',
    history: '3 fiscal approvals this quarter totaling $61K; all closed within budget.',
    impact: { approved: 'Retention compliance held through FY27; array headroom returns to 55%.', denied: 'Auto-deletion risk begins Sep 8 — evidence integrity exposure in active cases.' },
    budget: 'IT capital budget: 71% spent · $24K remaining after this approval.',
    ai: { verdict: 'Approve', confidence: 88, note: 'cheaper than cloud overflow at $2.1K/mo; quote lapses Aug 12' },
    actionNote: 'Approval issues the purchase order against state contract SWC-114.',
  },
  {
    id: 'PER-2026-0441', category: 'PERSONNEL', expiring: false, requiresRationale: false,
    title: 'Light-duty assignment extension — Dep. Walsh',
    due: '3d', dueColor: 'text-slate-400', dot: 'bg-slate-600',
    requester: 'HR — M. Torres', submitted: 'submitted Aug 1, 14:45',
    requires: 'Requires: Sheriff · extensions beyond 90 days',
    expiryNote: null,
    request: 'Dep. Walsh’s light-duty assignment in the records unit reaches the 90-day limit on Aug 6. The treating physician projects full-duty clearance in 4–6 weeks. HR requests a 45-day extension.',
    evidence: [
      { title: 'Physician statement', desc: 'Recovery progressing; full duty projected mid-September.', source: 'Occupational health · Jul 29' },
      { title: 'Assignment review', desc: 'Records unit assignment productive; no accommodation conflicts.', source: 'HR · Aug 1' },
    ],
    policyBasis: 'Policy 6.3 — Modified duty. Extensions beyond 90 days require agency-head approval.',
    history: '2 extensions approved this year; both deputies returned to full duty within projection.',
    impact: { approved: 'Walsh continues in records; clerical backlog stays covered.', denied: 'Walsh moves to the unpaid-leave pool; FMLA exposure and grievance risk.' },
    budget: null,
    ai: { verdict: 'Approve', confidence: 93, note: 'medical projection supports the extension; the assignment is productive' },
    actionNote: 'Approval notifies HR and updates the personnel record.',
  },
  {
    id: 'POL-2026-0087', category: 'POLICY', expiring: false, requiresRationale: false,
    title: 'Pursuit policy rev. 4.3 — route for command review',
    due: '4d', dueColor: 'text-slate-400', dot: 'bg-slate-600',
    requester: 'Legal — S. Ibarra', submitted: 'submitted Jul 31, 16:20',
    requires: 'Requires: Sheriff signature to open command review',
    expiryNote: null,
    request: 'Revision 4.3 adds explicit pursuit-termination criteria — closing the open Risk Center finding — and aligns AVL telemetry requirements with the state model policy. Legal requests routing to command staff for a 10-day review.',
    evidence: [
      { title: 'Redline draft', desc: 'Termination criteria added at §7; telemetry requirements at §12.', source: 'Legal · Jul 31' },
      { title: 'Risk finding reference', desc: 'Derived finding: pursuit termination criteria undefined.', source: 'Risk Center · Jul 22' },
    ],
    policyBasis: 'Policy 1.2 — Directive management. Policy revisions route through command review before issuance.',
    history: '4 policy revisions issued this year; median review cycle 12 days.',
    impact: { approved: 'Command review opens; Sep 1 issuance stays on track and closes the audit finding.', denied: 'The finding stays open into the Nov 10 ACA mock audit.' },
    budget: null,
    ai: { verdict: 'Approve', confidence: 90, note: 'closes an open derived finding; no fiscal impact' },
    actionNote: 'Routing notifies command staff and starts the 10-day review clock.',
  },
];

const TABS = [
  { key: 'all', label: 'All' },
  { key: 'expiring', label: 'Expiring today' },
  { key: 'UOF', label: 'UoF' },
  { key: 'FISCAL', label: 'Fiscal' },
  { key: 'STAFFING', label: 'Staffing' },
  { key: 'POLICY', label: 'Policy' },
  { key: 'PERSONNEL', label: 'Personnel' },
];

const verdictColor = {
  APPROVED: 'text-emerald-400',
  DENIED: 'text-red-400',
  ESCALATED: 'text-amber-400',
  'INFO REQUESTED': 'text-amber-400',
};

function SectionLabel({ children }) {
  return <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500 mb-2.5">{children}</p>;
}

export default function Approvals() {
  const [queue, setQueue] = useState(INITIAL_QUEUE);
  const [decided, setDecided] = useState([{ verdict: 'APPROVED', text: 'Jail nurse contract coverage', time: '05:58' }]);
  const [tab, setTab] = useState('all');
  const [selectedId, setSelectedId] = useState(INITIAL_QUEUE[1].id);
  const [held, setHeld] = useState({});
  const [rationale, setRationale] = useState('');
  const [rationaleWarn, setRationaleWarn] = useState(false);

  const filtered = queue.filter(item =>
    tab === 'all' ? true : tab === 'expiring' ? item.expiring : item.category === tab
  );
  const selected = queue.find(i => i.id === selectedId) || filtered[0] || null;
  const expiringCount = queue.filter(i => i.expiring).length;

  const tabCount = (key) =>
    key === 'all' ? queue.length : key === 'expiring' ? expiringCount : queue.filter(i => i.category === key).length;

  const decide = useCallback((verdict) => {
    if (!selected) return;
    if (selected.requiresRationale && !rationale.trim() && (verdict === 'APPROVED' || verdict === 'DENIED')) {
      setRationaleWarn(true);
      return;
    }
    const idx = filtered.findIndex(i => i.id === selected.id);
    const next = filtered[idx + 1] || filtered[idx - 1];
    setDecided(d => [{ verdict, text: selected.title, time: 'now' }, ...d]);
    setQueue(q => q.filter(i => i.id !== selected.id));
    setSelectedId(next ? next.id : null);
    setRationale('');
    setRationaleWarn(false);
  }, [selected, rationale, filtered]);

  const move = useCallback((dir) => {
    if (!filtered.length) return;
    const idx = Math.max(0, filtered.findIndex(i => i.id === selectedId));
    const next = filtered[Math.min(filtered.length - 1, Math.max(0, idx + dir))];
    if (next) setSelectedId(next.id);
  }, [filtered, selectedId]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const tag = e.target.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      if (e.key === 'j') move(1);
      else if (e.key === 'k') move(-1);
      else if (e.key === 'a' || e.key === 'A') decide('APPROVED');
      else if (e.key === 'd' || e.key === 'D') decide('DENIED');
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [move, decide]);

  return (
    <DashboardLayout>
      <div className="min-h-full bg-[#0A0A0B] flex flex-col">

        {/* ── Header ─────────────────────────────────────── */}
        <div className="px-6 py-4 border-b border-slate-800/70 flex items-center gap-3 flex-wrap">
          <h1 className="text-[16px] font-bold text-slate-100">Decision Center</h1>
          <span className="text-[11px] text-slate-500">As of 06:12 · keyboard: j / k to move · A approve · D deny</span>
          <span className="ml-auto text-[11px] text-slate-400">{queue.length} pending · {expiringCount} expiring today</span>
        </div>

        {/* ── Tabs ───────────────────────────────────────── */}
        <div className="px-6 border-b border-slate-800/70 flex items-center gap-1 overflow-x-auto">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`px-3.5 py-2.5 text-[12px] font-semibold whitespace-nowrap border-b-2 transition-colors ${
                tab === t.key ? 'text-slate-100 border-amber-500' : 'text-slate-500 border-transparent hover:text-slate-300'
              }`}
            >
              {t.label} <span className={tab === t.key ? 'text-amber-400' : 'text-slate-600'}>{tabCount(t.key)}</span>
            </button>
          ))}
        </div>

        {/* ── Split pane ─────────────────────────────────── */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-[400px,1fr] min-h-0">

          {/* Queue */}
          <div className="border-r border-slate-800/70 flex flex-col min-h-0">
            <div className="flex-1 overflow-y-auto">
              {filtered.map((item) => {
                const isSelected = selected && item.id === selected.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => { setSelectedId(item.id); setRationaleWarn(false); }}
                    className={`w-full text-left px-5 py-3.5 border-b border-slate-800/50 border-l-2 transition-colors ${
                      isSelected ? 'bg-zinc-900/60 border-l-amber-500' : 'border-l-transparent hover:bg-zinc-900/30'
                    }`}
                  >
                    <div className="flex items-baseline gap-2.5">
                      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 self-center ${item.dot}`} />
                      <p className="text-[12.5px] font-semibold text-slate-200 flex-1 min-w-0 leading-snug">{item.title}</p>
                      <span className={`text-[10px] font-mono flex-shrink-0 ${item.dueColor}`}>{item.due}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1.5 ml-4">
                      <span className={`border rounded px-1.5 py-px text-[8.5px] font-bold tracking-wider ${categoryBadge[item.category]}`}>{item.category}</span>
                      <span className="text-[10.5px] text-slate-500 truncate">{item.requester}</span>
                      {held[item.id] && <span className="text-[9.5px] text-slate-500 border border-slate-700/60 rounded px-1.5 py-px flex-shrink-0">Held until 1400</span>}
                    </div>
                  </button>
                );
              })}
              {filtered.length === 0 && (
                <p className="px-5 py-6 text-[11.5px] text-slate-600">No pending items in this view.</p>
              )}

              {/* Decided today */}
              <div className="px-5 pt-4 pb-4">
                <p className="text-[9.5px] font-bold uppercase tracking-[0.15em] text-slate-500 mb-2">Decided Today — {decided.length}</p>
                <div className="space-y-1.5">
                  {decided.map((d, i) => (
                    <div key={i} className="flex items-baseline gap-2.5">
                      <span className={`text-[10px] font-bold flex-shrink-0 ${verdictColor[d.verdict]}`}>{d.verdict}</span>
                      <p className="text-[11.5px] text-slate-400 flex-1 min-w-0 truncate">{d.text}</p>
                      <span className="text-[10px] font-mono text-slate-600 flex-shrink-0">{d.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="px-5 py-2.5 border-t border-slate-800/70">
              <p className="text-[10px] text-slate-600">Ordered by deadline · criticals pinned · deferrals resurface automatically</p>
            </div>
          </div>

          {/* Detail pane */}
          {selected ? (
            <div className="flex flex-col min-h-0">
              <div className="flex-1 overflow-y-auto px-8 py-6">
                <div className="max-w-[1000px]">
                  <div className="flex items-center gap-3">
                    <span className={`border rounded px-1.5 py-px text-[8.5px] font-bold tracking-wider ${categoryBadge[selected.category]}`}>{selected.category}</span>
                    <span className="text-[11px] text-slate-500">{selected.id}</span>
                    <span className={`ml-auto text-[12px] font-mono font-bold ${selected.dueColor}`}>{selected.due}</span>
                  </div>
                  <h2 className="text-[21px] font-bold text-slate-100 mt-3">{selected.title}</h2>
                  <p className="text-[12px] text-slate-400 mt-1.5">Requested by {selected.requester} · {selected.submitted}</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">{selected.requires}</p>
                  {selected.expiryNote && (
                    <p className="text-[11px] text-red-400/80 mt-1.5">{selected.expiryNote}</p>
                  )}

                  <div className="mt-6">
                    <SectionLabel>Request</SectionLabel>
                    <p className="text-[13px] text-slate-300 leading-[1.7]">{selected.request}</p>
                  </div>

                  <div className="mt-6">
                    <SectionLabel>Evidence</SectionLabel>
                    <div className="space-y-2.5">
                      {selected.evidence.map((ev, i) => (
                        <div key={i} className="border border-slate-800/80 rounded-xl px-4 py-3 flex items-start gap-4">
                          <div className="flex-1 min-w-0">
                            <p className="text-[12.5px] font-semibold text-amber-400/90">{ev.title}</p>
                            <p className="text-[12px] text-slate-300 mt-1">{ev.desc}</p>
                          </div>
                          <span className="text-[10.5px] text-slate-500 flex-shrink-0">{ev.source}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="border border-slate-800/80 rounded-xl px-4 py-3.5">
                      <SectionLabel>Policy Basis</SectionLabel>
                      <p className="text-[11.5px] text-slate-300 leading-relaxed">{selected.policyBasis}</p>
                    </div>
                    <div className="border border-slate-800/80 rounded-xl px-4 py-3.5">
                      <SectionLabel>Decision History</SectionLabel>
                      <p className="text-[11.5px] text-slate-300 leading-relaxed">{selected.history}</p>
                    </div>
                    <div className="border border-slate-800/80 rounded-xl px-4 py-3.5">
                      <SectionLabel>Impact</SectionLabel>
                      <p className="text-[11.5px] text-slate-300 leading-relaxed">
                        <span className="text-emerald-400/90 font-semibold">If approved:</span> {selected.impact.approved}
                      </p>
                      <p className="text-[11.5px] text-slate-300 leading-relaxed mt-1.5">
                        <span className="text-red-400/90 font-semibold">If denied:</span> {selected.impact.denied}
                      </p>
                    </div>
                  </div>

                  {selected.budget && (
                    <p className="text-[11px] text-slate-400 mt-3 font-mono">{selected.budget}</p>
                  )}
                </div>
              </div>

              {/* Action bar */}
              <div className="border-t border-slate-800/70 px-8 py-4">
                <div className="max-w-[1000px]">
                  <div className="flex items-center gap-2 mb-2.5">
                    <Sparkles className="w-3 h-3 text-violet-400 flex-shrink-0" />
                    <p className="text-[11px] text-slate-400">
                      AI: <span className="text-emerald-400 font-semibold">{selected.ai.verdict}</span>
                      <span className="text-slate-500 font-mono"> · {selected.ai.confidence}%</span>
                      <span className="text-slate-500"> — {selected.ai.note}</span>
                    </p>
                  </div>
                  <input
                    type="text"
                    value={rationale}
                    onChange={(e) => { setRationale(e.target.value); setRationaleWarn(false); }}
                    placeholder="Rationale — required for non-routine decisions, returned to requester"
                    className={`w-full px-4 py-2.5 bg-zinc-900/50 border rounded-lg text-[12px] text-slate-200 placeholder-slate-600 focus:outline-none transition-colors ${
                      rationaleWarn ? 'border-red-500/60' : 'border-slate-800 focus:border-amber-500/40'
                    }`}
                  />
                  {rationaleWarn && (
                    <p className="text-[10.5px] text-red-400 mt-1">Rationale is required for this decision — it is returned to the requester.</p>
                  )}
                  <div className="flex items-center gap-2 mt-3 flex-wrap">
                    <button onClick={() => decide('APPROVED')} className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/40 rounded-lg text-[12px] font-bold text-emerald-400 hover:bg-emerald-500/20 transition-colors">Approve</button>
                    <button onClick={() => decide('DENIED')} className="px-4 py-2 border border-red-500/40 rounded-lg text-[12px] font-bold text-red-400 hover:bg-red-500/10 transition-colors">Deny</button>
                    <button onClick={() => decide('ESCALATED')} className="px-4 py-2 border border-slate-700/60 rounded-lg text-[12px] font-semibold text-slate-300 hover:bg-zinc-900/60 transition-colors">Escalate</button>
                    <button onClick={() => decide('INFO REQUESTED')} className="px-4 py-2 border border-slate-700/60 rounded-lg text-[12px] font-semibold text-slate-300 hover:bg-zinc-900/60 transition-colors">Request info</button>
                    <button onClick={() => setHeld({ ...held, [selected.id]: true })} className="px-4 py-2 border border-slate-700/60 rounded-lg text-[12px] font-semibold text-slate-300 hover:bg-zinc-900/60 transition-colors">Hold until 1400</button>
                    <span className="text-[10.5px] text-slate-500 ml-1">{selected.actionNote}</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <div className="text-center">
                <p className="text-[14px] font-semibold text-slate-300">Queue clear</p>
                <p className="text-[11.5px] text-slate-500 mt-1">{decided.length} decisions closed today — all recorded to the audit trail.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

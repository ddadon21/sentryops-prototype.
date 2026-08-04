import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, X, ChevronDown, ChevronUp } from 'lucide-react';
import DashboardLayout from '../layouts/DashboardLayout';

// ── Notification doctrine data — Aug 3 snapshot ─────────────────
const INITIAL_ALERTS = [
  {
    id: 'a1',
    text: 'Pursuit initiated — U-231, SR-12 eastbound, speeds 90+',
    meta: 'CAD · Critical incidents always notify command',
    time: '06:14',
    acked: false,
  },
];

const INITIAL_DECISIONS = [
  { id: 'd1', text: 'Use-of-Force review UOF-2026-114 awaiting decision', meta: 'IA module · You are the approval authority', due: 'closes 1700', dueColor: 'text-red-400', action: 'Review', link: 'Open in IA', route: '/command/approvals', done: false },
  { id: 'd2', text: 'Sector 4 coverage request — 2 below minimum', meta: 'HR scheduling · You are the approval authority for Sector 4', due: 'by 0700', dueColor: 'text-amber-400', action: 'Approve', link: 'Open in Patrol', route: '/patrol/cad', done: false },
  { id: 'd3', text: 'CJIS quarterly attestation ready for signature', meta: 'Compliance · Requires agency-head signature', due: '2d', dueColor: 'text-slate-400', action: 'Sign', link: 'Open in Compliance', route: '/hr/compliance', done: false },
];

const INITIAL_INFO = [
  { id: 'i1', text: 'Daily Command Brief published — Aug 3', time: '06:00', read: false },
  { id: 'i2', text: 'Night shift report filed — Lt. Harmon', time: '05:47', read: false },
  { id: 'i3', text: 'Case 2026-4471 status changed to Cleared', time: '04:22', read: true },
  { id: 'i4', text: 'Jail count reconciled — 412', time: '04:00', read: true },
];

// ── Alert ledger — 24h, with AI depth per row ───────────────────
const severityDot = { critical: 'bg-red-500', high: 'bg-amber-400', medium: 'bg-slate-600' };
const statusColor = {
  Active: 'text-red-400',
  'Awaiting decision': 'text-amber-400',
  Pending: 'text-amber-400',
  Acknowledged: 'text-slate-400',
  Resolved: 'text-emerald-400',
};

const ledger = [
  {
    id: 'l1', severity: 'critical', title: 'Vehicle pursuit — U-231, SR-12 eastbound, speeds 90+',
    source: 'CAD', time: '06:14', owner: 'Watch Cmdr. Reyes', status: 'Active',
    trigger: 'CAD flagged pursuit speeds above 90 mph on a wet roadway — automatic command notification per Policy 4.2.',
    consequence: 'Policy requires continuous supervisor monitoring; unterminated pursuit past the county line becomes a mutual-aid and liability event.',
    action: 'Monitor in War Room. Pursuit supervisor holds termination authority — review criteria are live on the CAD panel.',
  },
  {
    id: 'l2', severity: 'critical', title: 'Sector 4 day-shift coverage — 2 deputies below minimum',
    source: 'HR scheduling', time: '05:49', owner: 'Capt. Vega', status: 'Awaiting decision',
    trigger: 'Two unplanned absences dropped projected day-shift strength below minimum when the 0549 roster locked.',
    consequence: 'Single-officer beats in Sector 4 from 0700; backup response delay of 8–12 minutes on any priority call.',
    action: 'Approve the overtime coverage request before 0700 — two qualified volunteers are staged on the OT roster.',
  },
  {
    id: 'l3', severity: 'high', title: 'Use-of-Force review UOF-2026-114 — window closes 1700',
    source: 'IA module', time: '06:00', owner: 'IA — Lt. Boyd', status: 'Awaiting decision',
    trigger: 'Review packet completed by IA and routed for agency-head decision; the 72-hour approval window ends today at 1700.',
    consequence: 'A lapsed window converts to a state reporting exception and appears on the next POST audit cycle.',
    action: 'Review the packet and approve or return with findings before 1700.',
  },
  {
    id: 'l4', severity: 'high', title: 'CJIS quarterly attestation ready for signature',
    source: 'Compliance', time: '05:58', owner: 'Sheriff Thompson', status: 'Pending',
    trigger: 'Quarterly security attestation compiled from CJIS tracker; requires agency-head signature by Aug 5.',
    consequence: 'Missing the deadline logs an attestation lapse with the State CSO — days ahead of the Aug 15 technical audit.',
    action: 'Sign in Compliance Management; the supporting evidence bundle is attached to the attestation record.',
  },
  {
    id: 'l5', severity: 'medium', title: 'Jail bookings +12% month-over-month',
    source: 'JMS', time: '04:00', owner: 'Det. Maj. Wilson', status: 'Acknowledged',
    trigger: 'Booking trend crossed the +10% monthly threshold; projection reaches 95% capacity by Aug 20 at current rate.',
    consequence: 'At 95%, intake restrictions trigger county-wide booking diversion and put the federal housing contract under review.',
    action: 'Begin early-release candidate review this week — 23 eligible detainees identified for court coordination.',
  },
  {
    id: 'l6', severity: 'medium', title: 'AVL telemetry gaps on 3 pursuit-rated units',
    source: 'Fleet telemetry', time: '02:10', owner: 'IT — R. Chen', status: 'Resolved',
    trigger: 'Overnight AVL heartbeat monitoring detected intermittent dropouts on units 231, 244, and 251.',
    consequence: 'Pursuit telemetry gaps weaken post-incident review evidence — an open finding in the Risk Center.',
    action: 'Modem firmware pushed at 0510; all three units reporting continuously since. No action required.',
  },
];

const doctrine = [
  { label: 'Critical', dot: 'bg-red-500', rule: 'Banner + War Room push. Requires acknowledgment — unacknowledged alerts escalate to the Undersheriff after 10 minutes.' },
  { label: 'Action', dot: 'bg-amber-400', rule: 'Queued in the decision list with a deadline and a deep link to the owning module. Escalates when the deadline passes.' },
  { label: 'Info', dot: 'bg-slate-600', rule: 'Silent feed — no interruption. Auto-marked read at the next 0600 brief.' },
];

const recentAcks = [
  { time: '05:58', text: 'CJIS attestation notice — Sheriff Thompson' },
  { time: '04:22', text: 'Case 2026-4471 clearance — auto-acknowledged' },
  { time: 'Aug 2 · 22:31', text: 'Barricade resolution, Mercer Ave — Sheriff Thompson' },
];

function SectionLabel({ children, right, tone = 'text-slate-500' }) {
  return (
    <div className="flex items-baseline justify-between mb-3">
      <p className={`text-[10px] font-bold uppercase tracking-[0.15em] ${tone}`}>{children}</p>
      {right}
    </div>
  );
}

export default function CommandAlerts() {
  const navigate = useNavigate();
  const [alerts, setAlerts] = useState(INITIAL_ALERTS);
  const [decisions, setDecisions] = useState(INITIAL_DECISIONS);
  const [info, setInfo] = useState(INITIAL_INFO);
  const [panelOpen, setPanelOpen] = useState(true);
  const [infoCollapsed, setInfoCollapsed] = useState(false);
  const [expandedRow, setExpandedRow] = useState(null);
  const [simCount, setSimCount] = useState(0);

  const activeAlert = alerts.find(a => !a.acked);
  const pendingDecisions = decisions.filter(d => !d.done);
  const badgeCount = alerts.filter(a => !a.acked).length + pendingDecisions.length;

  const acknowledge = (id) => setAlerts(alerts.map(a => a.id === id ? { ...a, acked: true } : a));
  const decide = (id) => setDecisions(decisions.map(d => d.id === id ? { ...d, done: true } : d));
  const markInfoRead = () => setInfo(info.map(n => ({ ...n, read: true })));

  const simulate = (kind) => {
    const n = simCount + 1;
    setSimCount(n);
    setPanelOpen(true);
    if (kind === 'critical') {
      setAlerts([{ id: `sim-a${n}`, text: `Shots fired call — Beat 3, units responding (simulated #${n})`, meta: 'CAD · Critical incidents always notify command', time: 'now', acked: false }, ...alerts]);
    } else if (kind === 'action') {
      setDecisions([{ id: `sim-d${n}`, text: `Emergency purchase approval — radio repeater (simulated #${n})`, meta: 'Finance · You are the approval authority', due: 'by EOD', dueColor: 'text-amber-400', action: 'Approve', link: 'Open in Finance', route: '/command/approvals', done: false }, ...decisions]);
    } else {
      setInfo([{ id: `sim-i${n}`, text: `Shift swap processed — Deputies Cole / Tran (simulated #${n})`, time: 'now', read: false }, ...info]);
    }
  };

  return (
    <DashboardLayout>
      <div className="min-h-full bg-[#0A0A0B]">

        {/* ── Critical alert banner ──────────────────────── */}
        {activeAlert && (
          <div className="bg-red-950/40 border-b border-red-500/40">
            <div className="max-w-[1500px] mx-auto px-6 py-3 flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse flex-shrink-0" />
              <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-red-400 flex-shrink-0">Alert</span>
              <p className="text-[12.5px] font-semibold text-slate-100 flex-1 min-w-0 truncate">{activeAlert.text}</p>
              <button onClick={() => navigate('/command/warroom')} className="text-[11px] font-semibold text-red-400 hover:text-red-300 border border-red-500/40 rounded px-2.5 py-1 transition-colors flex-shrink-0">Open War Room</button>
              <button onClick={() => acknowledge(activeAlert.id)} className="text-[11px] font-semibold text-slate-300 hover:text-white border border-slate-700/60 rounded px-2.5 py-1 transition-colors flex-shrink-0">Acknowledge</button>
            </div>
          </div>
        )}

        <div className="px-6 py-6">
          <div className="max-w-[1500px] mx-auto">

            {/* ── Page header ────────────────────────────── */}
            <div className="flex items-center gap-3 flex-wrap pb-5 border-b border-slate-800/70">
              <h1 className="text-[19px] font-bold text-slate-100">Command Notifications</h1>
              <span className="text-[11px] text-slate-500">Updated 06:12 · all systems nominal</span>
              <div className="ml-auto flex items-center gap-2 flex-wrap">
                <span className="text-[10px] text-slate-600 uppercase tracking-wider mr-1">Demo</span>
                <button onClick={() => simulate('critical')} className="px-2.5 py-1.5 border border-red-500/40 rounded-lg text-[11px] font-semibold text-red-400 hover:bg-red-500/10 transition-colors">Simulate critical alert</button>
                <button onClick={() => simulate('action')} className="px-2.5 py-1.5 border border-amber-500/40 rounded-lg text-[11px] font-semibold text-amber-400 hover:bg-amber-500/10 transition-colors">Simulate action item</button>
                <button onClick={() => simulate('info')} className="px-2.5 py-1.5 border border-slate-700/60 rounded-lg text-[11px] font-semibold text-slate-300 hover:bg-zinc-900/60 transition-colors">Simulate info</button>
                <button onClick={() => setPanelOpen(!panelOpen)} className="relative flex items-center gap-1.5 px-3 py-1.5 border border-slate-700/60 rounded-lg text-[11.5px] font-semibold text-slate-200 hover:bg-zinc-900/60 transition-colors ml-1">
                  <Bell className="w-3.5 h-3.5" />
                  Notifications
                  {badgeCount > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 min-w-[16px] h-4 px-1 bg-amber-500 rounded-full text-[9px] font-bold text-black flex items-center justify-center">{badgeCount}</span>
                  )}
                </button>
              </div>
            </div>

            {/* ── Body grid ──────────────────────────────── */}
            <div className="mt-6 grid grid-cols-1 xl:grid-cols-[1fr,380px] gap-8">

              {/* Alert ledger */}
              <div>
                <SectionLabel right={<span className="text-[10px] text-slate-500">last 24h · click a row for AI context</span>}>
                  Alert Ledger
                </SectionLabel>
                <div className="divide-y divide-slate-800/50 border-t border-slate-800/70">
                  {ledger.map((row) => {
                    const expanded = expandedRow === row.id;
                    return (
                      <div key={row.id}>
                        <button
                          onClick={() => setExpandedRow(expanded ? null : row.id)}
                          className="w-full flex items-center gap-3 py-3 text-left hover:bg-zinc-900/30 transition-colors"
                        >
                          <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${severityDot[row.severity]}`} />
                          <span className="text-[10.5px] font-mono text-slate-500 w-10 flex-shrink-0">{row.time}</span>
                          <div className="flex-1 min-w-0">
                            <p className="text-[12px] text-slate-200 truncate">{row.title}</p>
                            <p className="text-[10px] text-slate-500 truncate">{row.source} · {row.owner}</p>
                          </div>
                          <span className={`text-[11px] font-semibold flex-shrink-0 ${statusColor[row.status]}`}>{row.status}</span>
                          {expanded
                            ? <ChevronUp className="w-3.5 h-3.5 text-slate-600 flex-shrink-0" />
                            : <ChevronDown className="w-3.5 h-3.5 text-slate-600 flex-shrink-0" />}
                        </button>
                        {expanded && (
                          <div className="pb-3.5 pl-[26px] pr-2 space-y-2">
                            <div>
                              <p className="text-[9px] font-bold uppercase tracking-widest text-slate-500 mb-0.5">Why this fired</p>
                              <p className="text-[11.5px] text-slate-300 leading-relaxed">{row.trigger}</p>
                            </div>
                            <div>
                              <p className="text-[9px] font-bold uppercase tracking-widest text-red-400/80 mb-0.5">If ignored</p>
                              <p className="text-[11.5px] text-slate-300 leading-relaxed">{row.consequence}</p>
                            </div>
                            <div>
                              <p className="text-[9px] font-bold uppercase tracking-widest text-emerald-400/80 mb-0.5">Recommended action</p>
                              <p className="text-[11.5px] text-slate-300 leading-relaxed">{row.action}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right rail */}
              <div>
                <SectionLabel>Routing Doctrine</SectionLabel>
                <div className="border border-slate-800/80 rounded-xl divide-y divide-slate-800/50">
                  {doctrine.map((d) => (
                    <div key={d.label} className="px-4 py-3 flex gap-3">
                      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5 ${d.dot}`} />
                      <div className="min-w-0">
                        <p className="text-[11px] font-bold text-slate-200 uppercase tracking-wider mb-0.5">{d.label}</p>
                        <p className="text-[11px] text-slate-400 leading-relaxed">{d.rule}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6">
                  <SectionLabel>Quiet Hours & Escalation</SectionLabel>
                  <div className="border border-slate-800/80 rounded-xl px-4 py-3.5 space-y-2">
                    <p className="text-[11px] text-slate-400 leading-relaxed"><span className="text-slate-200 font-semibold">Off-duty 1800–0600:</span> action items route to Undersheriff Park; critical alerts always break through.</p>
                    <p className="text-[11px] text-slate-400 leading-relaxed"><span className="text-slate-200 font-semibold">Escalation chain:</span> Sheriff Thompson → Undersheriff Park → on-duty watch commander.</p>
                  </div>
                </div>

                <div className="mt-6">
                  <SectionLabel>Recent Acknowledgments</SectionLabel>
                  <div className="divide-y divide-slate-800/50 border-t border-slate-800/70">
                    {recentAcks.map((a, i) => (
                      <div key={i} className="flex items-center gap-3 py-2.5">
                        <span className="text-[10px] font-mono text-slate-500 w-20 flex-shrink-0">{a.time}</span>
                        <p className="text-[11.5px] text-slate-300 flex-1 min-w-0">{a.text}</p>
                      </div>
                    ))}
                  </div>
                  <p className="text-[10px] text-slate-500 mt-2.5">Acknowledgments are recorded to the audit trail.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Notifications drawer ─────────────────────────── */}
        {panelOpen && (
          <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[430px] bg-[#0C0C0D] border-l border-slate-800/80 shadow-2xl flex flex-col">
            <div className="px-5 py-4 flex items-center gap-3 border-b border-slate-800/70">
              <p className="text-[13px] font-bold text-slate-100">Notifications</p>
              <button onClick={markInfoRead} className="ml-auto text-[11px] text-amber-500 hover:text-amber-400 transition-colors">Mark info read</button>
              <button onClick={() => setPanelOpen(false)} className="text-slate-500 hover:text-slate-300 transition-colors"><X className="w-4 h-4" /></button>
            </div>

            <div className="flex-1 overflow-y-auto">
              {/* Alerts */}
              <div className="px-5 pt-4">
                <p className="text-[9.5px] font-bold uppercase tracking-[0.15em] text-red-400 mb-2">Alerts — Require Acknowledgment</p>
                {alerts.filter(a => !a.acked).length === 0 && (
                  <p className="text-[11px] text-slate-600 py-2">No unacknowledged alerts.</p>
                )}
                {alerts.filter(a => !a.acked).map((a) => (
                  <div key={a.id} className="border-l-2 border-red-500 pl-3 py-2 mb-2">
                    <div className="flex items-baseline gap-2">
                      <p className="text-[12.5px] font-bold text-slate-100 flex-1 min-w-0">{a.text}</p>
                      <span className="text-[10px] font-mono text-slate-500 flex-shrink-0">{a.time}</span>
                    </div>
                    <p className="text-[10.5px] text-slate-500 mt-0.5">{a.meta}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button onClick={() => navigate('/command/warroom')} className="px-2.5 py-1 bg-red-500/15 border border-red-500/40 rounded text-[11px] font-semibold text-red-400 hover:bg-red-500/25 transition-colors">Open War Room</button>
                      <button onClick={() => acknowledge(a.id)} className="px-2.5 py-1 border border-slate-700/60 rounded text-[11px] font-semibold text-slate-300 hover:bg-zinc-900/60 transition-colors">Acknowledge</button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Decisions */}
              <div className="px-5 pt-4">
                <p className="text-[9.5px] font-bold uppercase tracking-[0.15em] text-amber-500 mb-2">Awaiting Your Decision — {pendingDecisions.length}</p>
                <div className="divide-y divide-slate-800/50">
                  {decisions.map((d) => (
                    <div key={d.id} className={`py-3 ${d.done ? 'opacity-50' : ''}`}>
                      <div className="flex items-start gap-2.5">
                        <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5 ${d.done ? 'bg-emerald-500' : 'bg-amber-400'}`} />
                        <p className="text-[12px] text-slate-200 flex-1 min-w-0 leading-snug">{d.text}</p>
                        <span className={`text-[10px] font-mono flex-shrink-0 ${d.dueColor}`}>{d.due}</span>
                      </div>
                      <p className="text-[10.5px] text-slate-500 mt-0.5 ml-4">{d.meta}</p>
                      <div className="flex items-center gap-2.5 mt-2 ml-4">
                        {d.done ? (
                          <span className="text-[11px] font-semibold text-emerald-400">✓ {d.action === 'Sign' ? 'Signed' : d.action === 'Approve' ? 'Approved' : 'Reviewed'}</span>
                        ) : (
                          <>
                            <button onClick={() => decide(d.id)} className="px-2.5 py-1 border border-emerald-500/40 rounded text-[11px] font-semibold text-emerald-400 hover:bg-emerald-500/10 transition-colors">{d.action}</button>
                            <button onClick={() => navigate(d.route)} className="text-[11px] text-amber-500 hover:text-amber-400 transition-colors">{d.link} →</button>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Info */}
              <div className="px-5 pt-4 pb-4">
                <div className="flex items-baseline justify-between mb-2">
                  <p className="text-[9.5px] font-bold uppercase tracking-[0.15em] text-slate-500">Earlier — Info</p>
                  <button onClick={() => setInfoCollapsed(!infoCollapsed)} className="text-[11px] text-amber-500 hover:text-amber-400 transition-colors">{infoCollapsed ? 'Expand' : 'Collapse'}</button>
                </div>
                {!infoCollapsed && (
                  <div className="divide-y divide-slate-800/40">
                    {info.map((n) => (
                      <div key={n.id} className="flex items-center gap-2.5 py-2">
                        <span className={`w-1 h-1 rounded-full flex-shrink-0 ${n.read ? 'bg-slate-700' : 'bg-slate-500'}`} />
                        <p className={`text-[11.5px] flex-1 min-w-0 ${n.read ? 'text-slate-500' : 'text-slate-300'}`}>{n.text}</p>
                        <span className="text-[10px] font-mono text-slate-600 flex-shrink-0">{n.time}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="px-5 py-3 border-t border-slate-800/70 flex items-center gap-3">
              <p className="text-[10.5px] text-slate-500 flex-1">Off-duty 1800–0600: actions route to Undersheriff Park</p>
              <button className="text-[11px] font-semibold text-amber-500 hover:text-amber-400 transition-colors">Settings</button>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

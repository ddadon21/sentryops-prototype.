import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';

// ── Chain of command — HR system of record ──────────────────────
const tree = {
  id: 'sheriff', name: 'Sheriff Thompson', role: 'Sheriff', status: 'on', commands: 158,
  detail: 'Elected · term through 2028',
  children: [
    {
      id: 'under', name: 'Undersheriff Park', role: 'Undersheriff', status: 'on', commands: 157,
      detail: 'Holds command 1800–0600 · escalation chain step 2',
      children: [
        {
          id: 'patrol', name: 'Capt. Rodriguez', role: 'Captain — Patrol', status: 'on', commands: 53,
          detail: 'Coverage request for Sector 4 pending in Decision Center', link: { label: 'Open in Decision Center', route: '/command/approvals' },
          children: [
            {
              id: 'lt-chen', name: 'Lt. Chen', role: 'Lieutenant — Sectors 1–2', status: 'on', commands: 24,
              children: [
                { id: 'sgt-whitaker', name: 'Sgt. Whitaker', role: 'Sergeant — Sector 1', status: 'off', commands: 11 },
                { id: 'sgt-alvarez', name: 'Sgt. Alvarez', role: 'Sergeant — Sector 2', status: 'on', commands: 11 },
              ],
            },
            {
              id: 'lt-harmon', name: 'Lt. Harmon', role: 'Lieutenant — Sectors 3–4', status: 'off', commands: 20,
              detail: 'Night rotation — off duty as of 0600',
              children: [
                { id: 'sgt-okafor', name: 'Sgt. Okafor', role: 'Sergeant — Sector 3', status: 'on', commands: 10 },
                {
                  id: 'sgt-reyes', name: 'Sgt. Reyes', role: 'Sergeant — Sector 4', status: 'on', commands: 8,
                  detail: 'Sector running on OT — structural 2-FTE gap, coverage request pending', link: { label: 'Open in Decision Center', route: '/command/approvals' },
                },
              ],
            },
            { id: 'sgt-bloom', name: 'Sgt. Bloom', role: 'Sergeant — Traffic Unit', status: 'on', commands: 5 },
            { id: 'sgt-kaur', name: 'Sgt. Kaur', role: 'Sergeant — K-9 Unit', status: 'leave', commands: 4, detail: 'Extended training — K-9 school through Sep' },
          ],
        },
        {
          id: 'jail', name: 'Capt. Nguyen', role: 'Captain — Jail', status: 'on', commands: 49,
          detail: 'Also holds interim oversight of Investigations (47 days)',
          children: [
            {
              id: 'lt-moore', name: 'Lt. Moore', role: 'Lieutenant — Jail Ops', status: 'on', acting: true, commands: 33,
              detail: 'Acting since Jun 30 — promotion board Aug 15 · owns 2 open compliance items',
              children: [
                { id: 'cpl-finch', name: 'Cpl. Finch', role: 'Corporal — E-9 (Acting Sgt)', status: 'on', acting: true, commands: 6, detail: 'Acting sergeant for post E-9 pending Moore board outcome' },
                { id: 'sgt-pruitt', name: 'Sgt. Pruitt', role: 'Sergeant — Jail A/B Block', status: 'on', commands: 12 },
                { id: 'sgt-nash', name: 'Sgt. Nash', role: 'Sergeant — Jail C Block', status: 'off', commands: 10, detail: 'C-block carrying nurse-vacancy OT — contract relief starts Aug 5' },
                { id: 'habib', name: 'N. Habib', role: 'Supervisor — Jail Medical', status: 'on', commands: 4, detail: 'Civilian · RN vacancy under this post drives C-block OT' },
              ],
            },
            { id: 'sgt-vega', name: 'Sgt. Vega', role: 'Sergeant — Court Security', status: 'on', commands: 8 },
          ],
        },
        {
          id: 'inv-vacant', name: 'VACANT — 47 days', role: 'Captain — Investigations', status: 'vacant', commands: 14,
          detail: 'Interim oversight: Capt. Nguyen · promotion posting closed — 2 internal candidates', link: { label: 'Open in Decision Center', route: '/command/approvals' },
          children: [
            { id: 'sgt-lis', name: 'Sgt. Lis', role: 'Sergeant — Detectives', status: 'on', commands: 8 },
            { id: 'sgt-dawes', name: 'Sgt. Dawes', role: 'Sergeant — Special Victims', status: 'leave', commands: 4, detail: 'Military leave — returns Q4 · Sgt. Lis covering casework triage' },
          ],
        },
        {
          id: 'admin', name: 'Dir. Osei', role: 'Director — Admin Services', status: 'on', commands: 21,
          children: [
            { id: 'm-torres', name: 'M. Torres', role: 'Manager — Human Resources', status: 'on', commands: 6 },
            { id: 't-osei', name: 'T. Osei', role: 'Manager — Finance', status: 'on', commands: 5 },
            { id: 'r-chen', name: 'R. Chen', role: 'Manager — IT / Systems', status: 'on', commands: 4 },
            { id: 'rec-vacant', name: 'VACANT — 12 days', role: 'Manager — Records', status: 'vacant', commands: 5, detail: 'Duties split under Dir. Osei · posting active', link: { label: 'View posting', route: '/hr/jobs' } },
          ],
        },
        { id: 'lt-foster', name: 'Lt. Foster', role: 'Lieutenant — Dispatch / Comms', status: 'on', commands: 11 },
        { id: 'lt-reeve', name: 'Lt. Reeve', role: 'Lieutenant — Professional Standards', status: 'on', commands: 2 },
      ],
    },
  ],
};

const actingItems = [
  { who: 'Lt. Moore', what: 'Acting lieutenant — Jail Ops', since: 'since Jun 30 · board Aug 15' },
  { who: 'Cpl. Finch', what: 'Acting sergeant — post E-9', since: 'since Jul 21 · tied to Moore board' },
  { who: 'Capt. — Investigations', what: 'Vacant 47 days · interim: Capt. Nguyen', since: '2 internal candidates' },
  { who: 'Mgr. — Records', what: 'Vacant 12 days · split under Dir. Osei', since: 'posting active' },
];

const statusDot = { on: 'bg-emerald-400', off: 'bg-slate-500', leave: 'bg-amber-400' };
const statusLabel = { on: 'On duty', off: 'Off duty', leave: 'On leave', vacant: 'Vacant' };
const dutyBorder = { on: 'border-emerald-500/40', off: 'border-slate-700', leave: 'border-amber-500/50', vacant: '' };

// ── Tidy-tree layout (children of collapsed nodes are skipped) ──
const NODE_W = 178, NODE_H = 54, H_GAP = 18, V_GAP = 52;
function layoutTree(root, collapsed, keep) {
  const nodes = [], edges = [];
  let nextX = 0;
  const place = (n, depth) => {
    const visible = keep ? (n.children || []).filter((c) => keep(c)) : n.children || [];
    const kids = collapsed.has(n.id) ? [] : visible;
    let x;
    if (kids.length) {
      const xs = kids.map((c) => place(c, depth + 1));
      x = (Math.min(...xs) + Math.max(...xs)) / 2;
    } else {
      x = nextX;
      nextX += NODE_W + H_GAP;
    }
    const y = depth * (NODE_H + V_GAP);
    nodes.push({ ...n, x, y, depth, childCount: visible.length });
    kids.forEach((c) => edges.push({ from: { x, y }, toId: c.id }));
    return x;
  };
  place(root, 0);
  const byId = Object.fromEntries(nodes.map((n) => [n.id, n]));
  return {
    nodes,
    edges: edges.map((e) => ({ ...e, to: { x: byId[e.toId].x, y: byId[e.toId].y } })),
    width: Math.max(...nodes.map((n) => n.x)) + NODE_W,
    height: Math.max(...nodes.map((n) => n.y)) + NODE_H,
  };
}

// ── Tree helpers ────────────────────────────────────────────────
const walk = (n, fn, parent = null) => { fn(n, parent); (n.children || []).forEach((c) => walk(c, fn, n)); };
const parentOf = {};
walk(tree, (n, p) => { if (p) parentOf[n.id] = p.id; });
const allBranchIds = [];
walk(tree, (n) => { if (n.children?.length) allBranchIds.push(n.id); });
const branchDepth = {};
walk(tree, (n) => { branchDepth[n.id] = parentOf[n.id] === undefined ? 0 : branchDepth[parentOf[n.id]] + 1; });
// Default: everything below the captain tier folded away, so the chart is legible cold.
const collapsedToCaptains = () => new Set(allBranchIds.filter((id) => branchDepth[id] >= 2));

// Acting view prunes rather than dims: only delegations and the chain of command
// above them survive, which keeps the chart legible instead of a wall of faded nodes.
const isDelegation = (n) => n.acting || n.status === 'vacant';
const delegationPath = new Set();
(function mark(n) {
  const hit = (n.children || []).map(mark).some(Boolean) || isDelegation(n);
  if (hit) delegationPath.add(n.id);
  return hit;
})(tree);

export default function OrgChart() {
  const navigate = useNavigate();
  const [view, setView] = useState('command'); // 'command' | 'duty' | 'acting'
  const [query, setQuery] = useState('');
  const [scale, setScale] = useState(1);
  const [selected, setSelected] = useState(null);
  const [proposeMode, setProposeMode] = useState(false);
  const [collapsed, setCollapsed] = useState(collapsedToCaptains);
  const canvasRef = useRef(null);

  const { nodes, edges, width, height } = useMemo(
    () => layoutTree(tree, collapsed, view === 'acting' ? (n) => delegationPath.has(n.id) : null),
    [collapsed, view],
  );

  const fit = () => {
    const el = canvasRef.current;
    if (el) setScale(Math.min(1.2, Math.max(0.35, (el.clientWidth - 80) / width)));
  };

  // Re-fit only after a change that reshapes the tree — manual zoom is left alone.
  const [pendingFit, setPendingFit] = useState(true);
  useEffect(() => {
    if (!pendingFit) return;
    fit();
    setPendingFit(false);
  }, [pendingFit, width]); // eslint-disable-line react-hooks/exhaustive-deps

  const reshape = (next) => { setCollapsed(next); setPendingFit(true); };

  // Each view opens the branches it is actually about; duty keeps the current shape
  // because its story is the border colors and the sidebar counts, not the layout.
  const changeView = (v) => {
    setView(v);
    setSelected(null);
    if (v === 'command') reshape(collapsedToCaptains());
    if (v === 'acting') reshape(new Set());
  };

  const toggle = (id) => setCollapsed((prev) => {
    const next = new Set(prev);
    next.has(id) ? next.delete(id) : next.add(id);
    return next;
  });

  const q = query.trim().toLowerCase();
  const matches = (n) => !!q && `${n.name} ${n.role}`.toLowerCase().includes(q);

  // A search hit buried inside a folded branch is useless — open the path to it.
  useEffect(() => {
    if (!q) return;
    const need = new Set();
    walk(tree, (n) => {
      if (!`${n.name} ${n.role}`.toLowerCase().includes(q)) return;
      let p = parentOf[n.id];
      while (p) { need.add(p); p = parentOf[p]; }
    });
    if (need.size) setCollapsed((prev) => new Set([...prev].filter((id) => !need.has(id))));
  }, [q]);

  const dimmed = (n) => q && !matches(n);

  const dutyCounts = useMemo(() => {
    const c = { on: 0, off: 0, leave: 0, vacant: 0 };
    walk(tree, (n) => c[n.status]++);
    return c;
  }, []);

  return (
    <DashboardLayout>
      <div className="h-[calc(100vh-80px)] bg-[#0A0A0B] flex flex-col">

        {/* ── Header ─────────────────────────────────────── */}
        <div className="flex items-center gap-3 flex-wrap px-6 py-4 border-b border-slate-800/70">
          <h1 className="text-[17px] font-bold text-slate-100">Organization — Chain of Command</h1>
          <span className="text-[11px] text-slate-500">As of Aug 4, 06:12 · HR system of record</span>
          <div className="ml-auto flex items-center gap-2 flex-wrap">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Find person or position"
              className="w-60 px-3 py-2 bg-zinc-900/60 border border-slate-700/60 rounded-lg text-[11.5px] text-slate-200 placeholder-slate-500 focus:outline-none focus:border-slate-500"
            />
            <div className="flex items-center rounded-lg border border-slate-700/60 overflow-hidden">
              <button onClick={() => setScale((s) => Math.max(0.3, s - 0.1))} className="px-3 py-2 text-[12px] font-bold text-slate-300 hover:bg-zinc-900/60 transition-colors">−</button>
              <button onClick={() => setScale((s) => Math.min(1.6, s + 0.1))} className="px-3 py-2 text-[12px] font-bold text-slate-300 hover:bg-zinc-900/60 border-l border-slate-700/60 transition-colors">+</button>
              <button onClick={fit} className="px-3 py-2 text-[11.5px] font-semibold text-slate-300 hover:bg-zinc-900/60 border-l border-slate-700/60 transition-colors">Fit</button>
            </div>
            <button onClick={() => window.print()} className="px-3.5 py-2 border border-slate-700/60 rounded-lg text-[11.5px] font-semibold text-slate-200 hover:bg-zinc-900/60 transition-colors">
              Export — PDF
            </button>
            <button
              onClick={() => setProposeMode(!proposeMode)}
              className={`px-3.5 py-2 border rounded-lg text-[11.5px] font-semibold transition-colors ${
                proposeMode ? 'border-amber-500/60 text-amber-400 bg-amber-500/10' : 'border-slate-700/60 text-slate-200 hover:bg-zinc-900/60'
              }`}
            >
              {proposeMode ? 'Exit propose mode' : 'Propose change'}
            </button>
          </div>
        </div>

        <div className="flex-1 flex min-h-0">

          {/* ── Sidebar ────────────────────────────────────── */}
          <div className="w-60 flex-shrink-0 border-r border-slate-800/70 px-4 py-5 flex flex-col gap-6 overflow-y-auto">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500 mb-2.5">View</p>
              <div className="space-y-1.5">
                {[
                  { id: 'command', label: 'Command' },
                  { id: 'duty', label: 'Duty status' },
                  { id: 'acting', label: 'Acting / delegations' },
                ].map((v) => (
                  <button
                    key={v.id}
                    onClick={() => changeView(v.id)}
                    className={`w-full text-left px-3.5 py-2 border rounded-lg text-[12px] font-semibold transition-colors ${
                      view === v.id ? 'border-amber-500/50 text-amber-400 bg-amber-500/5' : 'border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    {v.label}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-3 mt-2.5">
                <button onClick={() => reshape(new Set())} className="text-[10.5px] font-semibold text-slate-400 hover:text-amber-400 transition-colors">Expand all</button>
                <span className="text-slate-700 text-[10px]">·</span>
                <button onClick={() => reshape(collapsedToCaptains())} className="text-[10.5px] font-semibold text-slate-400 hover:text-amber-400 transition-colors">Collapse</button>
              </div>
            </div>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500 mb-2.5">Legend</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2.5"><span className="w-2 h-2 rounded-full bg-emerald-400" /><span className="text-[11.5px] text-slate-300">On duty</span></div>
                <div className="flex items-center gap-2.5"><span className="w-2 h-2 rounded-full bg-slate-500" /><span className="text-[11.5px] text-slate-300">Off duty</span></div>
                <div className="flex items-center gap-2.5"><span className="w-2 h-2 rounded-full bg-amber-400" /><span className="text-[11.5px] text-slate-300">On leave</span></div>
                <div className="flex items-center gap-2.5"><span className="w-2.5 h-2.5 rounded-sm border border-dashed border-red-500/70" /><span className="text-[11.5px] text-slate-300">Vacant</span></div>
                <div className="flex items-center gap-2.5"><span className="text-[8px] font-bold text-amber-400 border border-amber-500/40 rounded px-1 leading-relaxed">ACT</span><span className="text-[11.5px] text-slate-300">Acting</span></div>
              </div>
            </div>

            {view === 'duty' && (
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500 mb-2.5">This Snapshot</p>
                <div className="space-y-1.5 text-[11.5px]">
                  <div className="flex justify-between"><span className="text-slate-300">On duty</span><span className="font-mono text-emerald-400">{dutyCounts.on}</span></div>
                  <div className="flex justify-between"><span className="text-slate-300">Off duty</span><span className="font-mono text-slate-400">{dutyCounts.off}</span></div>
                  <div className="flex justify-between"><span className="text-slate-300">On leave</span><span className="font-mono text-amber-400">{dutyCounts.leave}</span></div>
                  <div className="flex justify-between"><span className="text-slate-300">Vacant posts</span><span className="font-mono text-red-400">{dutyCounts.vacant}</span></div>
                </div>
                <p className="text-[10px] text-slate-500 mt-2.5 leading-relaxed">Supervisory positions only — line staff duty status lives in HR scheduling.</p>
              </div>
            )}

            {view === 'acting' && (
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500 mb-2.5">Open Delegations</p>
                <div className="space-y-3">
                  {actingItems.map((a) => (
                    <div key={a.who}>
                      <p className="text-[11.5px] font-semibold text-slate-200">{a.who}</p>
                      <p className="text-[10.5px] text-slate-400 leading-snug">{a.what}</p>
                      <p className="text-[10px] text-slate-500">{a.since}</p>
                    </div>
                  ))}
                </div>
                <button onClick={() => navigate('/command/approvals')} className="text-[11px] font-semibold text-amber-500 hover:text-amber-400 transition-colors mt-3">
                  Review in Decision Center →
                </button>
                <p className="text-[10px] text-slate-500 mt-3 leading-relaxed">Chart is filtered to open delegations and the chain of command above each one.</p>
              </div>
            )}

            <p className="text-[10.5px] text-slate-500 leading-relaxed mt-auto">
              <span className="text-slate-400">commands</span> = personnel under that position. Click a node for details, <span className="text-slate-400">+N</span> to open a branch. Structure edits require Propose mode — changes route to the Decision Center.
            </p>
          </div>

          {/* ── Canvas ─────────────────────────────────────── */}
          <div className="flex-1 relative min-w-0">
          <div
            ref={canvasRef}
            className="absolute inset-0 overflow-auto"
            style={{ backgroundImage: 'radial-gradient(circle, rgba(148,163,184,0.09) 1px, transparent 1px)', backgroundSize: '26px 26px' }}
          >
            {proposeMode && (
              <div className="sticky top-0 left-0 z-20 px-6 py-2 bg-amber-500/10 border-b border-amber-500/30 backdrop-blur-sm">
                <p className="text-[11px] text-amber-400">
                  <span className="font-bold">Propose mode</span> — select a position, then draft the change. Nothing here edits the live chart; drafts route to the Decision Center for approval.
                </p>
              </div>
            )}

            <div style={{ width: width * scale + 96, height: height * scale + 96, padding: 32 }}>
              <div style={{ width, height, transform: `scale(${scale})`, transformOrigin: 'top left' }} className="relative">
                <svg width={width} height={height} className="absolute inset-0 pointer-events-none">
                  {edges.map((e, i) => {
                    const px = e.from.x + NODE_W / 2, py = e.from.y + NODE_H;
                    const cx = e.to.x + NODE_W / 2, cy = e.to.y;
                    const midY = py + (cy - py) / 2;
                    return <path key={i} d={`M ${px} ${py} V ${midY} H ${cx} V ${cy}`} fill="none" stroke="#1e293b" strokeWidth="1.5" />;
                  })}
                </svg>

                {nodes.map((n) => {
                  const vacant = n.status === 'vacant';
                  const isSel = selected?.id === n.id;
                  const isCollapsed = collapsed.has(n.id);
                  return (
                    <div
                      key={n.id}
                      style={{ left: n.x, top: n.y, width: NODE_W }}
                      className={`absolute ${dimmed(n) ? 'opacity-25' : view === 'acting' && !isDelegation(n) ? 'opacity-55' : ''}`}
                    >
                      <button
                        onClick={() => setSelected(isSel ? null : n)}
                        style={{ width: NODE_W, height: NODE_H }}
                        className={`block text-left px-2.5 py-1.5 rounded-md bg-[#0d0e11] border transition-all ${
                          vacant
                            ? 'border-dashed border-red-500/60'
                            : view === 'duty'
                              ? dutyBorder[n.status]
                              : 'border-slate-800 hover:border-slate-600'
                        } ${isSel ? 'ring-1 ring-amber-400/80' : matches(n) ? 'ring-1 ring-amber-400/50' : ''}`}
                      >
                        <span className="flex items-center gap-1.5 min-w-0">
                          {!vacant && <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${statusDot[n.status]}`} />}
                          <span className={`text-[11px] font-bold truncate ${vacant ? 'text-red-400' : 'text-slate-100'}`}>{n.name}</span>
                          {n.acting && <span className="text-[7.5px] font-bold text-amber-400 border border-amber-500/40 rounded px-0.5 flex-shrink-0">ACT</span>}
                        </span>
                        <span className="block text-[9.5px] text-slate-500 truncate mt-0.5">{n.role}</span>
                        <span className="block text-[9px] text-slate-600 truncate">commands {n.commands}</span>
                      </button>
                      {n.childCount > 0 && (
                        <button
                          onClick={() => toggle(n.id)}
                          title={isCollapsed ? `Expand ${n.childCount} direct reports` : 'Collapse'}
                          style={{ top: NODE_H + 5 }}
                          className={`absolute left-1/2 -translate-x-1/2 z-10 h-5 min-w-[20px] px-1.5 rounded-full border text-[9px] font-bold leading-none transition-colors ${
                            isCollapsed
                              ? 'border-slate-600 bg-[#14161a] text-slate-300 hover:border-amber-500/60 hover:text-amber-400'
                              : 'border-slate-700 bg-[#0d0e11] text-slate-500 hover:text-slate-300'
                          }`}
                        >
                          {isCollapsed ? `+${n.childCount}` : '−'}
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

            {/* ── Detail card — anchored outside the scrolling canvas ── */}
            {selected && (
              <div className="absolute bottom-6 right-6 z-30 w-80 bg-[#0d0e11] border border-slate-700/70 rounded-xl p-4 shadow-[0_18px_50px_-10px_rgba(0,0,0,0.8)]">
                <div className="flex items-start gap-2">
                  <div className="min-w-0">
                    <p className={`text-[13px] font-bold ${selected.status === 'vacant' ? 'text-red-400' : 'text-slate-100'}`}>
                      {selected.name}
                      {selected.acting && <span className="text-[8px] font-bold text-amber-400 border border-amber-500/40 rounded px-1 ml-1.5 align-middle">ACT</span>}
                    </p>
                    <p className="text-[11px] text-slate-400 mt-0.5">{selected.role}</p>
                  </div>
                  <button onClick={() => setSelected(null)} className="ml-auto text-slate-500 hover:text-slate-300 text-[13px] leading-none flex-shrink-0">✕</button>
                </div>
                <div className="flex items-center gap-3 mt-2.5 text-[11px]">
                  <span className={selected.status === 'vacant' ? 'text-red-400' : selected.status === 'leave' ? 'text-amber-400' : selected.status === 'on' ? 'text-emerald-400' : 'text-slate-400'}>
                    {statusLabel[selected.status]}
                  </span>
                  <span className="text-slate-600">·</span>
                  <span className="text-slate-400">commands <span className="font-mono text-slate-300">{selected.commands}</span></span>
                </div>
                {selected.detail && <p className="text-[11px] text-slate-400 mt-2.5 leading-relaxed">{selected.detail}</p>}
                <div className="flex items-center gap-4 mt-3 pt-3 border-t border-slate-800/70">
                  {selected.link && (
                    <button onClick={() => navigate(selected.link.route)} className="text-[11px] font-semibold text-amber-500 hover:text-amber-400 transition-colors">
                      {selected.link.label} →
                    </button>
                  )}
                  {selected.status !== 'vacant' && (
                    <button onClick={() => navigate('/hr/records')} className="text-[11px] font-semibold text-slate-400 hover:text-slate-200 transition-colors">
                      Personnel file →
                    </button>
                  )}
                  {proposeMode && (
                    <button onClick={() => navigate('/command/approvals')} className="text-[11px] font-bold text-amber-400 hover:text-amber-300 transition-colors">
                      Draft change →
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

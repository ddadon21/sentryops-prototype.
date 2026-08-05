import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';

// ── Division / department accents ───────────────────────────────
// Class strings are written out in full — Tailwind scans source text, so any
// class assembled at runtime would never make it into the build.
const dept = {
  exec:      { tile: 'bg-slate-500/20 text-slate-200 border-slate-400/30',     label: 'text-slate-400',       dot: 'bg-slate-400' },
  patrol:    { tile: 'bg-blue-500/20 text-blue-200 border-blue-400/30',        label: 'text-blue-300/90',     dot: 'bg-blue-400' },
  invest:    { tile: 'bg-violet-500/20 text-violet-200 border-violet-400/30',  label: 'text-violet-300/90',   dot: 'bg-violet-400' },
  jail:      { tile: 'bg-amber-500/20 text-amber-200 border-amber-400/30',     label: 'text-amber-300/90',    dot: 'bg-amber-400' },
  medical:   { tile: 'bg-emerald-500/20 text-emerald-200 border-emerald-400/30', label: 'text-emerald-300/90', dot: 'bg-emerald-400' },
  court:     { tile: 'bg-indigo-500/20 text-indigo-200 border-indigo-400/30',  label: 'text-indigo-300/90',   dot: 'bg-indigo-400' },
  comms:     { tile: 'bg-cyan-500/20 text-cyan-200 border-cyan-400/30',        label: 'text-cyan-300/90',     dot: 'bg-cyan-400' },
  food:      { tile: 'bg-orange-500/20 text-orange-200 border-orange-400/30',  label: 'text-orange-300/90',   dot: 'bg-orange-400' },
  support:   { tile: 'bg-teal-500/20 text-teal-200 border-teal-400/30',        label: 'text-teal-300/90',     dot: 'bg-teal-400' },
  admin:     { tile: 'bg-slate-500/20 text-slate-200 border-slate-400/30',     label: 'text-slate-400',       dot: 'bg-slate-400' },
  standards: { tile: 'bg-rose-500/20 text-rose-200 border-rose-400/30',        label: 'text-rose-300/90',     dot: 'bg-rose-400' },
  training:  { tile: 'bg-lime-500/20 text-lime-200 border-lime-400/30',        label: 'text-lime-300/90',     dot: 'bg-lime-400' },
};

// ── Chain of command — HR system of record ──────────────────────
const tree = {
  id: 'sheriff', name: 'Sheriff Thompson', role: 'Sheriff', initials: 'ST',
  unit: 'Office of the Sheriff', d: 'exec', status: 'on', strength: [158, 168],
  detail: 'Elected · term through 2028',
  children: [
    {
      id: 'under', name: 'Undersheriff Park', role: 'Undersheriff', initials: 'UP',
      unit: 'Office of the Sheriff', d: 'exec', status: 'on', strength: [157, 167],
      detail: 'Holds command 1800–0600 · escalation chain step 2',
      children: [
        // ── Operations Bureau ──────────────────────────────
        {
          id: 'ops', name: 'Chief Dep. Vance', role: 'Chief Deputy', initials: 'CV',
          unit: 'Operations Bureau', d: 'patrol', status: 'on', strength: [78, 88],
          children: [
            {
              id: 'patrol', name: 'Capt. Rodriguez', role: 'Captain', initials: 'CR',
              unit: 'Patrol Division', d: 'patrol', status: 'on', strength: [53, 60],
              detail: 'Coverage request for Sector 4 pending in Decision Center',
              link: { label: 'Open in Decision Center', route: '/command/approvals' },
              children: [
                {
                  id: 'lt-chen', name: 'Lt. Chen', role: 'Lieutenant — Sectors 1–2', initials: 'LC',
                  unit: 'Patrol Division', d: 'patrol', status: 'on', strength: [24, 26],
                  children: [
                    { id: 'sgt-whitaker', name: 'Sgt. Whitaker', role: 'Sergeant', initials: 'SW', unit: 'Patrol — Sector 1', d: 'patrol', status: 'off', strength: [11, 12] },
                    { id: 'sgt-alvarez', name: 'Sgt. Alvarez', role: 'Sergeant', initials: 'SA', unit: 'Patrol — Sector 2', d: 'patrol', status: 'on', strength: [11, 12] },
                  ],
                },
                {
                  id: 'lt-harmon', name: 'Lt. Harmon', role: 'Lieutenant — Sectors 3–4', initials: 'LH',
                  unit: 'Patrol Division', d: 'patrol', status: 'off', strength: [20, 24],
                  detail: 'Night rotation — off duty as of 0600',
                  children: [
                    { id: 'sgt-okafor', name: 'Sgt. Okafor', role: 'Sergeant', initials: 'SO', unit: 'Patrol — Sector 3', d: 'patrol', status: 'on', strength: [10, 12] },
                    {
                      id: 'sgt-reyes', name: 'Sgt. Reyes', role: 'Sergeant', initials: 'SR',
                      unit: 'Patrol — Sector 4', d: 'patrol', status: 'on', strength: [8, 12],
                      detail: 'Sector running on OT — structural 2-FTE gap, 3rd consecutive month',
                      link: { label: 'Open in Decision Center', route: '/command/approvals' },
                    },
                  ],
                },
                { id: 'sgt-bloom', name: 'Sgt. Bloom', role: 'Sergeant', initials: 'SB', unit: 'Traffic Unit', d: 'patrol', status: 'on', strength: [5, 6] },
                { id: 'sgt-kaur', name: 'Sgt. Kaur', role: 'Sergeant', initials: 'SK', unit: 'K-9 Unit', d: 'patrol', status: 'leave', strength: [4, 4], detail: 'Extended training — K-9 school through Sep' },
              ],
            },
            {
              id: 'inv-vacant', name: 'VACANT — 47 days', role: 'Captain', initials: '—',
              unit: 'Investigations Division', d: 'invest', status: 'vacant', strength: [14, 16],
              detail: 'Interim oversight: Capt. Nguyen · promotion posting closed — 2 internal candidates',
              link: { label: 'Open in Decision Center', route: '/command/approvals' },
              children: [
                { id: 'sgt-lis', name: 'Sgt. Lis', role: 'Sergeant', initials: 'SL', unit: 'Major Crimes', d: 'invest', status: 'on', strength: [8, 9] },
                { id: 'sgt-dawes', name: 'Sgt. Dawes', role: 'Sergeant', initials: 'SD', unit: 'Special Victims', d: 'invest', status: 'leave', strength: [4, 5], detail: 'Military leave — returns Q4 · Sgt. Lis covering casework triage' },
                { id: 'evidence', name: 'E. Vance', role: 'Supervisor (civilian)', initials: 'EV', unit: 'Evidence & Property', d: 'invest', status: 'on', strength: [3, 3] },
              ],
            },
            {
              id: 'comms', name: 'Lt. Foster', role: 'Lieutenant', initials: 'LF',
              unit: 'Communications / 911', d: 'comms', status: 'on', strength: [11, 12],
              detail: '1 dispatcher returns from FMLA Aug 25',
              children: [
                { id: 'comms-sup', name: 'J. Ruiz', role: 'Supervisor (civilian)', initials: 'JR', unit: 'Dispatch Floor', d: 'comms', status: 'on', strength: [10, 11] },
              ],
            },
          ],
        },
        // ── Detention Bureau ───────────────────────────────
        {
          id: 'det', name: 'Chief Dep. Ellis', role: 'Chief Deputy', initials: 'CE',
          unit: 'Detention Bureau', d: 'jail', status: 'on', strength: [85, 94],
          children: [
            {
              id: 'jail', name: 'Capt. Nguyen', role: 'Captain', initials: 'CN',
              unit: 'Detention Division', d: 'jail', status: 'on', strength: [50, 54],
              detail: 'Also holds interim oversight of Investigations (47 days)',
              children: [
                {
                  id: 'lt-moore', name: 'Lt. Moore', role: 'Lieutenant', initials: 'LM', acting: true,
                  unit: 'Jail Operations', d: 'jail', status: 'on', strength: [33, 36],
                  detail: 'Acting since Jun 30 — promotion board Aug 15 · owns 2 open compliance items',
                  children: [
                    { id: 'cpl-finch', name: 'Cpl. Finch', role: 'Corporal', initials: 'CF', acting: true, unit: 'Housing Unit E-9', d: 'jail', status: 'on', strength: [6, 6], detail: 'Acting sergeant pending Moore board outcome' },
                    { id: 'sgt-pruitt', name: 'Sgt. Pruitt', role: 'Sergeant', initials: 'SP', unit: 'A / B Block', d: 'jail', status: 'on', strength: [12, 13] },
                    { id: 'sgt-nash', name: 'Sgt. Nash', role: 'Sergeant', initials: 'SN', unit: 'C Block', d: 'jail', status: 'off', strength: [10, 13], detail: 'C-block carrying nurse-vacancy OT — contract relief starts Aug 5' },
                  ],
                },
                { id: 'sgt-vega', name: 'Sgt. Vega', role: 'Sergeant', initials: 'SV', unit: 'Inmate Transport', d: 'jail', status: 'on', strength: [6, 6] },
                { id: 'sgt-cole', name: 'Sgt. Cole', role: 'Sergeant', initials: 'SC', unit: 'Booking & Classification', d: 'jail', status: 'on', strength: [9, 10] },
              ],
            },
            {
              id: 'medical', name: 'N. Habib, RN', role: 'Director (civilian)', initials: 'NH',
              unit: 'Correctional Health Services', d: 'medical', status: 'on', strength: [9, 12],
              detail: 'Medical intake screening delays are an open compliance finding',
              link: { label: 'Open in Risk Center', route: '/command/risk' },
              children: [
                {
                  id: 'med-vacant', name: 'VACANT — 21 days', role: 'Staff Nurse — Nights', initials: '—',
                  unit: 'Correctional Health Services', d: 'medical', status: 'vacant', strength: [0, 2],
                  detail: 'Drives the C-block overtime — contract relief starts Aug 5',
                  link: { label: 'View posting', route: '/hr/jobs' },
                },
                { id: 'behavioral', name: 'K. Duarte, LCSW', role: 'Supervisor (civilian)', initials: 'KD', unit: 'Behavioral Health Unit', d: 'medical', status: 'on', strength: [4, 5] },
              ],
            },
            {
              id: 'food', name: 'L. Okonkwo', role: 'Manager (civilian)', initials: 'LO',
              unit: 'Food Services', d: 'food', status: 'on', strength: [8, 9],
              detail: '~1,450 meals/day · second-shift line running on OT',
              children: [
                { id: 'cook-main', name: 'D. Whitfield', role: 'Lead Cook (civilian)', initials: 'DW', unit: 'Kitchen — Main Line', d: 'food', status: 'on', strength: [4, 4] },
                {
                  id: 'cook-vacant', name: 'VACANT — 34 days', role: 'Cook — Second Shift', initials: '—',
                  unit: 'Kitchen — Second Shift', d: 'food', status: 'vacant', strength: [2, 3],
                  detail: 'Second-shift line covered by OT since Jul 2 · posting active',
                  link: { label: 'View posting', route: '/hr/jobs' },
                },
                { id: 'cook-diet', name: 'M. Ferraro', role: 'Cook — Therapeutic Diets (civilian)', initials: 'MF', unit: 'Kitchen — Therapeutic Diets', d: 'food', status: 'on', strength: [2, 2], detail: 'Works medical-diet orders from Correctional Health Services' },
              ],
            },
            {
              id: 'support', name: 'B. Yates', role: 'Supervisor (civilian)', initials: 'BY',
              unit: 'Inmate Support Services', d: 'support', status: 'on', strength: [6, 7],
              children: [
                { id: 'commissary', name: 'H. Nakamura', role: 'Coordinator (civilian)', initials: 'HN', unit: 'Commissary & Inmate Trust', d: 'support', status: 'on', strength: [2, 2] },
                { id: 'laundry', name: 'G. Iverson', role: 'Coordinator (civilian)', initials: 'GI', unit: 'Laundry & Inmate Property', d: 'support', status: 'on', strength: [2, 3] },
                { id: 'chaplain', name: 'Rev. P. Achebe', role: 'Chaplain (contract)', initials: 'PA', unit: 'Chaplaincy & Programs', d: 'support', status: 'on', strength: [1, 1] },
              ],
            },
            {
              id: 'court', name: 'Capt. Bell', role: 'Captain', initials: 'CB',
              unit: 'Court Services Division', d: 'court', status: 'on', strength: [12, 12],
              children: [
                { id: 'sgt-marsh', name: 'Sgt. Marsh', role: 'Sergeant', initials: 'SM', unit: 'Courthouse Security', d: 'court', status: 'on', strength: [8, 8] },
                { id: 'sgt-ortiz', name: 'Sgt. Ortiz', role: 'Sergeant', initials: 'SO', unit: 'Civil Process & Warrants', d: 'court', status: 'on', strength: [4, 4] },
              ],
            },
          ],
        },
        // ── Administrative Bureau ──────────────────────────
        {
          id: 'admin', name: 'Dir. Osei', role: 'Director (civilian)', initials: 'DO',
          unit: 'Administrative Bureau', d: 'admin', status: 'on', strength: [21, 25],
          children: [
            { id: 'hr', name: 'M. Torres', role: 'Manager (civilian)', initials: 'MT', unit: 'Human Resources', d: 'admin', status: 'on', strength: [6, 6] },
            { id: 'finance', name: 'T. Quan', role: 'Manager (civilian)', initials: 'TQ', unit: 'Finance & Budget', d: 'admin', status: 'on', strength: [5, 5] },
            { id: 'it', name: 'R. Chen', role: 'Manager (civilian)', initials: 'RC', unit: 'Information Technology', d: 'admin', status: 'on', strength: [4, 4] },
            {
              id: 'rec-vacant', name: 'VACANT — 12 days', role: 'Manager', initials: '—',
              unit: 'Records Management', d: 'admin', status: 'vacant', strength: [5, 6],
              detail: 'Duties split under Dir. Osei · posting active',
              link: { label: 'View posting', route: '/hr/jobs' },
            },
            { id: 'fleet', name: 'S. Boyd', role: 'Manager (civilian)', initials: 'SB', unit: 'Fleet & Facilities', d: 'admin', status: 'on', strength: [5, 6] },
            { id: 'standards', name: 'Lt. Reeve', role: 'Lieutenant', initials: 'LR', unit: 'Professional Standards', d: 'standards', status: 'on', strength: [2, 3], detail: '1 deputy on administrative leave — IA case 2026-08' },
            { id: 'training', name: 'Sgt. Ibarra', role: 'Sergeant', initials: 'SI', unit: 'Training Academy', d: 'training', status: 'on', strength: [3, 4], detail: 'Cohort 26-B mid-training · range week begins Friday' },
          ],
        },
      ],
    },
  ],
};

const statusDot = { on: 'bg-emerald-400', off: 'bg-slate-500', leave: 'bg-amber-400' };
const statusLabel = { on: 'On duty', off: 'Off duty', leave: 'On leave', vacant: 'Vacant' };
const dutyRing = { on: 'ring-1 ring-emerald-500/50', off: '', leave: 'ring-1 ring-amber-500/50', vacant: '' };

// ── Tidy-tree layout (children of collapsed nodes are skipped) ──
const NODE_W = 202, NODE_H = 88, H_GAP = 20, V_GAP = 56;
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
// Default: folded to the bureau tier so the chart is legible cold.
const collapsedToBureaus = () => new Set(allBranchIds.filter((id) => branchDepth[id] >= 2));

// Acting view prunes rather than dims: only delegations and the chain of command
// above them survive, which keeps the chart legible instead of a wall of faded nodes.
const isDelegation = (n) => n.acting || n.status === 'vacant';
const delegationPath = new Set();
(function mark(n) {
  const hit = (n.children || []).map(mark).some(Boolean) || isDelegation(n);
  if (hit) delegationPath.add(n.id);
  return hit;
})(tree);

// Division roster for the rail — every department label in one place.
const roster = [];
walk(tree, (n) => { if (n.unit !== 'Office of the Sheriff') roster.push(n); });
const divisions = Object.values(
  roster.reduce((acc, n) => {
    acc[n.unit] = acc[n.unit] || { unit: n.unit, d: n.d, id: n.id, strength: n.strength };
    return acc;
  }, {}),
);

const actingItems = [
  { who: 'Lt. Moore', what: 'Acting lieutenant — Jail Operations', since: 'since Jun 30 · board Aug 15' },
  { who: 'Cpl. Finch', what: 'Acting sergeant — Housing Unit E-9', since: 'since Jul 21 · tied to Moore board' },
  { who: 'Capt. — Investigations', what: 'Vacant 47 days · interim: Capt. Nguyen', since: '2 internal candidates' },
  { who: 'Staff Nurse — Nights', what: 'Vacant 21 days · drives C-block OT', since: 'contract relief Aug 5' },
  { who: 'Cook — Second Shift', what: 'Vacant 34 days · kitchen line on OT', since: 'posting active' },
  { who: 'Mgr. — Records', what: 'Vacant 12 days · split under Dir. Osei', since: 'posting active' },
];

function StrengthPill({ strength }) {
  const [cur, auth] = strength;
  const pct = auth ? cur / auth : 1;
  const tone = pct >= 0.95 ? 'text-emerald-300 border-emerald-400/30 bg-emerald-500/10'
    : pct >= 0.85 ? 'text-amber-300 border-amber-400/30 bg-amber-500/10'
    : 'text-red-300 border-red-400/30 bg-red-500/10';
  return (
    <span className={`px-1.5 py-[1px] rounded border font-mono text-[9px] ${tone}`}>{cur}/{auth}</span>
  );
}

export default function OrgChart() {
  const navigate = useNavigate();
  const [view, setView] = useState('command'); // 'command' | 'duty' | 'acting'
  const [query, setQuery] = useState('');
  // Free-pan canvas: {x, y} translate + k zoom, applied as one transform. Panning
  // by scroll only worked when the tree overflowed, so at the default fit — where
  // it does not — dragging had nowhere to go and appeared broken.
  const [tf, setTf] = useState({ x: 0, y: 0, k: 1 });
  const tfRef = useRef(tf);
  useEffect(() => { tfRef.current = tf; }, [tf]);
  const [selected, setSelected] = useState(null);
  const [proposeMode, setProposeMode] = useState(false);
  const [collapsed, setCollapsed] = useState(collapsedToBureaus);
  const canvasRef = useRef(null);

  const { nodes, edges, width, height } = useMemo(
    () => layoutTree(tree, collapsed, view === 'acting' ? (n) => delegationPath.has(n.id) : null),
    [collapsed, view],
  );

  const clampK = (k) => Math.min(1.6, Math.max(0.25, k));

  // Fit both axes — a deep branch runs off the bottom just as easily as a wide one —
  // then centre what we just sized.
  const fit = () => {
    const el = canvasRef.current;
    if (!el) return;
    const k = Math.min(1.15, Math.max(0.3, Math.min((el.clientWidth - 80) / width, (el.clientHeight - 80) / height)));
    setTf({ k, x: (el.clientWidth - width * k) / 2, y: (el.clientHeight - height * k) / 2 });
  };

  // Zoom about a fixed viewport point so the thing under the cursor stays put.
  const zoomAt = (px, py, factor) => setTf((t) => {
    const k = clampK(t.k * factor);
    const r = k / t.k;
    return { k, x: px - (px - t.x) * r, y: py - (py - t.y) * r };
  });
  const zoomCentre = (factor) => {
    const el = canvasRef.current;
    if (el) zoomAt(el.clientWidth / 2, el.clientHeight / 2, factor);
  };

  // Re-fit only after a change that reshapes the tree — manual zoom is left alone.
  const [pendingFit, setPendingFit] = useState(true);
  useEffect(() => {
    if (!pendingFit) return;
    fit();
    setPendingFit(false);
  }, [pendingFit, width, height]); // eslint-disable-line react-hooks/exhaustive-deps

  const reshape = (next) => { setCollapsed(next); setPendingFit(true); };

  // ── Drag to pan ───────────────────────────────────────────────
  // Dragging works anywhere, cards included; a 4px threshold decides whether
  // the gesture was a pan or a click, and `dragged` swallows the click that
  // would otherwise fire on the card you grabbed.
  const dragged = useRef(false);
  const [grabbing, setGrabbing] = useState(false);

  const startPan = (e) => {
    if (e.button !== 0 && e.button !== 1) return;
    const start = { x: e.clientX, y: e.clientY, tx: tfRef.current.x, ty: tfRef.current.y };
    dragged.current = false;
    const move = (ev) => {
      const dx = ev.clientX - start.x, dy = ev.clientY - start.y;
      if (!dragged.current && Math.hypot(dx, dy) < 4) return;
      if (!dragged.current) { dragged.current = true; setGrabbing(true); }
      setTf((t) => ({ ...t, x: start.tx + dx, y: start.ty + dy }));
    };
    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
      setGrabbing(false);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };

  // Ctrl/⌘ + wheel zooms. Registered natively so preventDefault actually takes —
  // React's synthetic wheel handler is passive and cannot stop browser zoom.
  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;
    const onWheel = (e) => {
      if (!e.ctrlKey && !e.metaKey) return;
      e.preventDefault();
      const r = el.getBoundingClientRect();
      zoomAt(e.clientX - r.left, e.clientY - r.top, Math.exp(-e.deltaY * 0.0025));
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, []);

  // A pan should never be mistaken for a click on the card underneath.
  const clickIfNotDragging = (fn) => () => { if (!dragged.current) fn(); };

  // ── Full screen ───────────────────────────────────────────────
  const rootRef = useRef(null);
  const [isFull, setIsFull] = useState(false);
  useEffect(() => {
    // Covers Escape and the browser's own exit affordance, not just our button.
    const onChange = () => { setIsFull(!!document.fullscreenElement); setPendingFit(true); };
    document.addEventListener('fullscreenchange', onChange);
    return () => document.removeEventListener('fullscreenchange', onChange);
  }, []);
  const toggleFull = () => {
    if (document.fullscreenElement) document.exitFullscreen();
    else rootRef.current?.requestFullscreen?.();
  };

  const toggle = (id) => setCollapsed((prev) => {
    const next = new Set(prev);
    next.has(id) ? next.delete(id) : next.add(id);
    return next;
  });

  // Each view opens the branches it is actually about; duty keeps the current shape
  // because its story is the ring colors and the rail counts, not the layout.
  const changeView = (v) => {
    setView(v);
    setSelected(null);
    if (v === 'command') reshape(collapsedToBureaus());
    if (v === 'acting') reshape(new Set());
  };

  const q = query.trim().toLowerCase();
  const matches = (n) => !!q && `${n.name} ${n.role} ${n.unit}`.toLowerCase().includes(q);

  // A search hit buried inside a folded branch is useless — open the path to it.
  useEffect(() => {
    if (!q) return;
    const need = new Set();
    walk(tree, (n) => {
      if (!`${n.name} ${n.role} ${n.unit}`.toLowerCase().includes(q)) return;
      let p = parentOf[n.id];
      while (p) { need.add(p); p = parentOf[p]; }
    });
    if (need.size) setCollapsed((prev) => new Set([...prev].filter((id) => !need.has(id))));
  }, [q]);

  // Open a division straight from the rail.
  const focusDivision = (id) => {
    const need = new Set();
    let p = parentOf[id];
    while (p) { need.add(p); p = parentOf[p]; }
    reshape(new Set([...collapsed].filter((c) => !need.has(c) && c !== id)));
    const node = [];
    walk(tree, (n) => { if (n.id === id) node.push(n); });
    setSelected(node[0] || null);
  };

  const dimmed = (n) => q && !matches(n);

  const dutyCounts = useMemo(() => {
    const c = { on: 0, off: 0, leave: 0, vacant: 0 };
    walk(tree, (n) => c[n.status]++);
    return c;
  }, []);

  return (
    <DashboardLayout>
      <div ref={rootRef} className={`${isFull ? 'h-screen' : 'h-[calc(100vh-80px)]'} bg-[#0A0A0B] flex flex-col`}>

        {/* ── Header ─────────────────────────────────────── */}
        <div className="flex items-center gap-3 flex-wrap px-6 py-4 border-b border-slate-800/70">
          <h1 className="text-[17px] font-bold text-slate-100">Organization — Chain of Command</h1>
          <span className="text-[11px] text-slate-500">As of Aug 4, 06:12 · HR system of record</span>
          <div className="ml-auto flex items-center gap-2 flex-wrap">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Find person, position, or division"
              className="w-64 px-3 py-2 bg-zinc-900/60 border border-slate-700/60 rounded-lg text-[11.5px] text-slate-200 placeholder-slate-500 focus:outline-none focus:border-slate-500"
            />
            <div className="flex items-center rounded-lg border border-slate-700/60 overflow-hidden">
              <button onClick={() => zoomCentre(1 / 1.15)} className="px-3 py-2 text-[12px] font-bold text-slate-300 hover:bg-zinc-900/60 transition-colors">−</button>
              <button onClick={() => zoomCentre(1.15)} className="px-3 py-2 text-[12px] font-bold text-slate-300 hover:bg-zinc-900/60 border-l border-slate-700/60 transition-colors">+</button>
              <button onClick={fit} className="px-3 py-2 text-[11.5px] font-semibold text-slate-300 hover:bg-zinc-900/60 border-l border-slate-700/60 transition-colors">Fit</button>
            </div>
            <button onClick={toggleFull} className="px-3.5 py-2 border border-slate-700/60 rounded-lg text-[11.5px] font-semibold text-slate-200 hover:bg-zinc-900/60 transition-colors">
              {isFull ? 'Exit full screen' : 'Full screen'}
            </button>
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
                <button onClick={() => reshape(collapsedToBureaus())} className="text-[10.5px] font-semibold text-slate-400 hover:text-amber-400 transition-colors">Collapse</button>
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
                <div className="flex items-center gap-2.5"><span className="text-[8px] font-mono text-slate-300 border border-slate-600 rounded px-1 leading-relaxed">53/60</span><span className="text-[11.5px] text-slate-300">Strength / authorized</span></div>
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

            {view === 'command' && (
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500 mb-2.5">Divisions & Departments</p>
                <div className="space-y-0.5 -mx-1.5">
                  {divisions.map((dv) => (
                    <button
                      key={dv.unit}
                      onClick={() => focusDivision(dv.id)}
                      className="w-full flex items-center gap-2 px-1.5 py-1 rounded hover:bg-zinc-900/70 transition-colors text-left group"
                    >
                      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${dept[dv.d].dot}`} />
                      <span className="text-[11px] text-slate-300 group-hover:text-slate-100 flex-1 min-w-0 truncate">{dv.unit}</span>
                      <span className="text-[9.5px] font-mono text-slate-500 flex-shrink-0">{dv.strength[0]}/{dv.strength[1]}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <p className="text-[10.5px] text-slate-500 leading-relaxed mt-auto pt-2">
              Drag the canvas to pan · <span className="text-slate-400">⌘/Ctrl + scroll</span> to zoom. Click a node for details, <span className="text-slate-400">+N</span> to open a branch. Structure edits require Propose mode — changes route to the Decision Center.
            </p>
          </div>

          {/* ── Canvas — light grey ────────────────────────── */}
          <div className="flex-1 relative min-w-0">
            <div
              ref={canvasRef}
              onPointerDown={startPan}
              className={`absolute inset-0 overflow-hidden bg-[#33322F] select-none ${grabbing ? 'cursor-grabbing' : 'cursor-grab'}`}
              style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)', backgroundSize: '26px 26px' }}
            >
              {proposeMode && (
                <div className="absolute top-0 inset-x-0 z-20 px-6 py-2 bg-amber-500/15 border-b border-amber-500/40 backdrop-blur-sm">
                  <p className="text-[11px] text-amber-300">
                    <span className="font-bold">Propose mode</span> — select a position, then draft the change. Nothing here edits the live chart; drafts route to the Decision Center for approval.
                  </p>
                </div>
              )}

              <div
                style={{ width, height, transform: `translate(${tf.x}px, ${tf.y}px) scale(${tf.k})`, transformOrigin: 'top left' }}
                className="absolute top-0 left-0"
              >
                <div style={{ width, height }} className="relative">
                  <svg width={width} height={height} className="absolute inset-0 pointer-events-none">
                    {edges.map((e, i) => {
                      const px = e.from.x + NODE_W / 2, py = e.from.y + NODE_H;
                      const cx = e.to.x + NODE_W / 2, cy = e.to.y;
                      const midY = py + (cy - py) / 2;
                      return <path key={i} d={`M ${px} ${py} V ${midY} H ${cx} V ${cy}`} fill="none" stroke="#6E6D67" strokeWidth="1.5" />;
                    })}
                  </svg>

                  {nodes.map((n) => {
                    const vacant = n.status === 'vacant';
                    const isSel = selected?.id === n.id;
                    const isCollapsed = collapsed.has(n.id);
                    const accent = dept[n.d];
                    return (
                      <div
                        key={n.id}
                        style={{ left: n.x, top: n.y, width: NODE_W }}
                        className={`absolute ${dimmed(n) ? 'opacity-30' : view === 'acting' && !isDelegation(n) ? 'opacity-60' : ''}`}
                      >
                        <button
                          onClick={clickIfNotDragging(() => setSelected(isSel ? null : n))}
                          style={{ width: NODE_W, height: NODE_H }}
                          className={`relative block text-left px-3 py-2.5 rounded-xl bg-[#14171C] border transition-all shadow-[0_6px_16px_-6px_rgba(0,0,0,0.55)] hover:shadow-[0_10px_22px_-8px_rgba(0,0,0,0.7)] ${
                            vacant ? 'border-dashed border-red-500/70' : 'border-slate-700/70 hover:border-slate-500'
                          } ${view === 'duty' && !vacant ? dutyRing[n.status] : ''} ${
                            isSel ? 'ring-2 ring-amber-400' : matches(n) ? 'ring-2 ring-amber-400/60' : ''
                          }`}
                        >
                          {/* status dot */}
                          {!vacant && <span className={`absolute top-2.5 right-2.5 w-1.5 h-1.5 rounded-full ${statusDot[n.status]}`} />}

                          {/* identity row */}
                          <span className="flex items-center gap-2 min-w-0">
                            <span className={`w-7 h-7 rounded-lg border flex items-center justify-center flex-shrink-0 text-[10px] font-bold ${
                              vacant ? 'bg-red-500/15 text-red-300 border-red-500/40' : accent.tile
                            }`}>
                              {n.initials}
                            </span>
                            <span className="min-w-0 flex-1">
                              <span className="flex items-center gap-1">
                                <span className={`block text-[11.5px] font-bold truncate ${vacant ? 'text-red-400' : 'text-slate-100'}`}>{n.name}</span>
                                {n.acting && <span className="text-[7.5px] font-bold text-amber-300 border border-amber-500/50 rounded px-0.5 flex-shrink-0">ACT</span>}
                              </span>
                              <span className="block text-[9.5px] text-slate-400 truncate">{n.role}</span>
                            </span>
                          </span>

                          {/* division label */}
                          <span className={`block text-[8.5px] font-bold uppercase tracking-[0.09em] truncate mt-1.5 ${vacant ? 'text-red-400/80' : accent.label}`}>
                            {n.unit}
                          </span>

                          {/* strength + reports */}
                          <span className="flex items-center gap-1.5 mt-1">
                            <StrengthPill strength={n.strength} />
                            {n.childCount > 0 && <span className="text-[9px] text-slate-500">{n.childCount} direct</span>}
                          </span>
                        </button>

                        {n.childCount > 0 && (
                          <button
                            onClick={clickIfNotDragging(() => toggle(n.id))}
                            title={isCollapsed ? `Expand ${n.childCount} direct reports` : 'Collapse'}
                            style={{ top: NODE_H + 5 }}
                            className={`absolute left-1/2 -translate-x-1/2 z-10 h-5 min-w-[20px] px-1.5 rounded-full border text-[9px] font-bold leading-none transition-colors ${
                              isCollapsed
                                ? 'border-[#6E6D67] bg-[#1B1A18] text-slate-200 hover:border-amber-500 hover:text-amber-400'
                                : 'border-[#57565198] bg-[#2A2926] text-slate-500 hover:text-slate-200'
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
              <div className="absolute bottom-6 right-6 z-30 w-80 bg-[#14171C] border border-slate-700/70 rounded-xl p-4 shadow-[0_18px_50px_-10px_rgba(0,0,0,0.7)]">
                <div className="flex items-start gap-2.5">
                  <span className={`w-9 h-9 rounded-lg border flex items-center justify-center flex-shrink-0 text-[12px] font-bold ${
                    selected.status === 'vacant' ? 'bg-red-500/15 text-red-300 border-red-500/40' : dept[selected.d].tile
                  }`}>
                    {selected.initials}
                  </span>
                  <div className="min-w-0">
                    <p className={`text-[13px] font-bold ${selected.status === 'vacant' ? 'text-red-400' : 'text-slate-100'}`}>
                      {selected.name}
                      {selected.acting && <span className="text-[8px] font-bold text-amber-300 border border-amber-500/50 rounded px-1 ml-1.5 align-middle">ACT</span>}
                    </p>
                    <p className="text-[11px] text-slate-400 mt-0.5">{selected.role}</p>
                    <p className={`text-[9px] font-bold uppercase tracking-[0.09em] mt-0.5 ${dept[selected.d].label}`}>{selected.unit}</p>
                  </div>
                  <button onClick={() => setSelected(null)} className="ml-auto text-slate-500 hover:text-slate-300 text-[13px] leading-none flex-shrink-0">✕</button>
                </div>
                <div className="flex items-center gap-3 mt-3 text-[11px]">
                  <span className={selected.status === 'vacant' ? 'text-red-400' : selected.status === 'leave' ? 'text-amber-400' : selected.status === 'on' ? 'text-emerald-400' : 'text-slate-400'}>
                    {statusLabel[selected.status]}
                  </span>
                  <span className="text-slate-600">·</span>
                  <span className="text-slate-400">strength <span className="font-mono text-slate-300">{selected.strength[0]}/{selected.strength[1]}</span></span>
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

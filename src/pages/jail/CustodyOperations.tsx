import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';
import {
  Users, AlertTriangle, Shield, CheckCircle,
  Circle, ArrowRight, ChevronDown, ChevronUp,
  Truck, Heart, LogOut, ArrowLeftRight, AlertOctagon,
  UserCheck, MapPin, Plus, Zap, PhoneCall, Lock, UserX
} from 'lucide-react';

// ── Types ──────────────────────────────────────────────────────

interface Pod {
  id: string;
  name: string;
  type: string;
  security: 'Min' | 'Med' | 'Max' | 'Hi';
  capacity: number;
  current: number;
  assignedOfficer: string | null;
  status: 'Normal' | 'Near Capacity' | 'Over Capacity';
  notes?: string;
  activeMovements: number;
  incidents: number;
  trend: 'up' | 'down' | 'stable';
  projection?: string;
}

interface Movement {
  id: number;
  inmateName: string;
  inmateId: string;
  type: 'Court Transport' | 'Medical Visit' | 'Release' | 'Housing Transfer' | 'Intake';
  from: string;
  to: string;
  escort: string;
  startTime: string;
  eta: string;
  status: 'In Progress' | 'Staging' | 'Pending' | 'Completed';
}

interface Incident {
  id: number;
  type: 'Fight' | 'Rule Violation' | 'Contraband' | 'Medical Emergency' | 'Refusal' | 'Self-Harm Threat';
  pod: string;
  description: string;
  time: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  status: 'Open' | 'Under Review' | 'Resolved';
  reportingOfficer: string;
}

interface Officer {
  badge: string;
  name: string;
  rank: string;
  assignment: string;
  postType: 'Pod' | 'Transport' | 'Medical' | 'Control Room' | 'Float' | 'OT';
  onPostSince: string;
  status: 'On Post' | 'Transport' | 'Break' | 'Medical Escort' | 'OT Pending';
  hoursWorked: number;
}

// ── Static Data ────────────────────────────────────────────────

const currentShift = {
  label: 'B-Shift',
  window: '14:00 – 22:00',
  commander: 'Sgt. D. Thompson',
  badge: '1089',
  scheduled: 14,
  present: 13,
  note: 'Officer Smith — sick call 11:30 AM',
  incidentsThisShift: 3,
  activeMovements: 7,
  pendingActions: 4,
  shiftStart: '14:00',
};

const pods: Pod[] = [
  { id: 'A1',  name: 'A-Pod',   type: 'Male GP',       security: 'Med', capacity: 96,  current: 94,  assignedOfficer: 'Dep. Harris',   status: 'Near Capacity', activeMovements: 1, incidents: 0, trend: 'up',     projection: '2 intakes pending — may hit capacity by 16:00' },
  { id: 'A2',  name: 'A2-Pod',  type: 'Male GP',       security: 'Med', capacity: 96,  current: 89,  assignedOfficer: 'Dep. White',    status: 'Normal',        activeMovements: 0, incidents: 1, trend: 'stable' },
  { id: 'B1',  name: 'B-Pod',   type: 'Male Max',      security: 'Max', capacity: 64,  current: 61,  assignedOfficer: 'Dep. King',     status: 'Normal',        activeMovements: 0, incidents: 0, trend: 'stable' },
  { id: 'B2',  name: 'B2-Pod',  type: 'Disciplinary',  security: 'Max', capacity: 32,  current: 28,  assignedOfficer: 'Dep. Scott',    status: 'Normal',        activeMovements: 0, incidents: 1, trend: 'stable' },
  { id: 'C1',  name: 'C-Pod',   type: 'Male Medium',   security: 'Med', capacity: 128, current: 115, assignedOfficer: 'Dep. Rivera',   status: 'Normal',        activeMovements: 2, incidents: 0, trend: 'stable' },
  { id: 'C2',  name: 'C2-Pod',  type: 'Work Release',  security: 'Min', capacity: 48,  current: 42,  assignedOfficer: null,            status: 'Normal',        activeMovements: 1, incidents: 0, trend: 'up',     projection: 'Unassigned post — float coverage gap this shift', notes: 'Float coverage' },
  { id: 'D1',  name: 'D-Pod',   type: 'Female GP',     security: 'Med', capacity: 80,  current: 73,  assignedOfficer: 'Dep. Carter',   status: 'Normal',        activeMovements: 0, incidents: 0, trend: 'stable' },
  { id: 'D2',  name: 'D2-Pod',  type: 'Female Max',    security: 'Max', capacity: 32,  current: 29,  assignedOfficer: 'Dep. Lewis',    status: 'Normal',        activeMovements: 0, incidents: 0, trend: 'stable' },
  { id: 'E1',  name: 'E-Pod',   type: 'Medical',       security: 'Med', capacity: 48,  current: 44,  assignedOfficer: 'Dep. Martinez', status: 'Near Capacity', activeMovements: 1, incidents: 0, trend: 'up',     projection: '3 isolation active + incoming movement — pressure rising', notes: '3 isolation active' },
  { id: 'E2',  name: 'E2-Pod',  type: 'Mental Health', security: 'Med', capacity: 40,  current: 38,  assignedOfficer: 'Dep. Johnson',  status: 'Near Capacity', activeMovements: 0, incidents: 1, trend: 'up',     projection: 'Near cap + open contraband incident — risk increasing', notes: '24/7 monitoring' },
  { id: 'F1',  name: 'F-Pod',   type: 'Intake',        security: 'Hi',  capacity: 64,  current: 52,  assignedOfficer: 'Dep. Allen',    status: 'Normal',        activeMovements: 3, incidents: 0, trend: 'up',     projection: '12 pending classification — intake pressure next 2h', notes: '12 pending class.' },
  { id: 'F2',  name: 'F2-Pod',  type: 'Prot. Custody', security: 'Hi', capacity: 48,  current: 41,  assignedOfficer: 'Dep. Young',    status: 'Normal',        activeMovements: 0, incidents: 0, trend: 'stable' },
  { id: 'G1',  name: 'G-Pod',   type: 'Juvenile',      security: 'Med', capacity: 24,  current: 18,  assignedOfficer: 'Dep. Hill',     status: 'Normal',        activeMovements: 0, incidents: 0, trend: 'down',   projection: 'Below average occupancy — stable' },
  { id: 'G2',  name: 'G2-Pod',  type: 'Pre-Release',   security: 'Min', capacity: 40,  current: 35,  assignedOfficer: null,            status: 'Normal',        activeMovements: 1, incidents: 0, trend: 'stable', notes: 'Float coverage' },
  { id: 'H1',  name: 'H-Pod',   type: 'Federal Hold',  security: 'Hi',  capacity: 48,  current: 47,  assignedOfficer: 'Dep. Clark',    status: 'Near Capacity', activeMovements: 0, incidents: 0, trend: 'stable', projection: 'Federal intake frozen — no change expected' },
  { id: 'H2',  name: 'H2-Pod',  type: 'ICE Hold',      security: 'Med', capacity: 32,  current: 36,  assignedOfficer: 'Dep. Robinson', status: 'Over Capacity', activeMovements: 0, incidents: 0, trend: 'down',   projection: 'Transfer in progress — drops to 32 within ~45 min', notes: 'Emergency beds in use' },
];

const movements: Movement[] = [
  { id: 1, inmateName: 'Williams, D.',   inmateId: '#48821', type: 'Court Transport',  from: 'A-Pod',   to: 'Superior Court',     escort: 'Dep. Foster',    startTime: '08:45', eta: '12:00', status: 'In Progress' },
  { id: 2, inmateName: 'Gonzalez, M.',   inmateId: '#51044', type: 'Court Transport',  from: 'C-Pod',   to: 'State Court',        escort: 'Dep. Reed',      startTime: '09:15', eta: '14:00', status: 'In Progress' },
  { id: 3, inmateName: 'Baker, T.',      inmateId: '#39102', type: 'Medical Visit',    from: 'B-Pod',   to: 'E-Pod Medical',      escort: 'Dep. Price',     startTime: '14:20', eta: '15:30', status: 'In Progress' },
  { id: 4, inmateName: 'Moore, J.',      inmateId: '#62304', type: 'Housing Transfer', from: 'H2-Pod',  to: 'G2-Pod',             escort: 'Dep. Hayes',     startTime: '14:00', eta: '14:15', status: 'Staging' },
  { id: 5, inmateName: 'Anderson, K.',   inmateId: '#44719', type: 'Release',          from: 'G2-Pod',  to: 'Release Processing', escort: 'Dep. Barnes',    startTime: '14:45', eta: '15:15', status: 'Pending' },
  { id: 6, inmateName: 'Thomas, R.',     inmateId: '#57683', type: 'Intake',           from: 'Booking', to: 'F-Pod',              escort: 'Dep. Allen',     startTime: '15:00', eta: '15:20', status: 'Pending' },
  { id: 7, inmateName: 'Jackson, P.',    inmateId: '#33091', type: 'Medical Visit',    from: 'A2-Pod',  to: 'Gwinnett Medical',   escort: 'Dep. Martinez',  startTime: '13:30', eta: 'Returned',  status: 'Completed' },
];

const incidents: Incident[] = [
  { id: 1, type: 'Fight',              pod: 'A2-Pod',  description: 'Altercation between 2 inmates during recreation. One required medical eval.',    time: '13:45', severity: 'high',     status: 'Under Review', reportingOfficer: 'Dep. White' },
  { id: 2, type: 'Rule Violation',     pod: 'B2-Pod',  description: 'Inmate Harris refused direct order. Placed on disciplinary lockdown.',           time: '14:10', severity: 'medium',   status: 'Resolved',     reportingOfficer: 'Dep. Scott' },
  { id: 3, type: 'Contraband',         pod: 'E2-Pod',  description: 'Suspected contraband (cell phone components) found during routine shakedown.',    time: '14:30', severity: 'high',     status: 'Open',         reportingOfficer: 'Dep. Johnson' },
  { id: 4, type: 'Medical Emergency',  pod: 'E1-Pod',  description: 'Inmate collapsed during medication distribution. RN Martinez responded.',        time: '12:55', severity: 'critical', status: 'Resolved',     reportingOfficer: 'Dep. Martinez' },
  { id: 5, type: 'Refusal',            pod: 'H2-Pod',  description: 'Group refusal to return to cells after dayroom. Non-compliant x3 count.',        time: '13:00', severity: 'medium',   status: 'Resolved',     reportingOfficer: 'Dep. Robinson' },
];

const officers: Officer[] = [
  { badge: '2041', name: 'Harris, K.',    rank: 'Deputy',    assignment: 'A-Pod',         postType: 'Pod',          onPostSince: '14:00', status: 'On Post',        hoursWorked: 1 },
  { badge: '2088', name: 'White, S.',     rank: 'Deputy',    assignment: 'A2-Pod',        postType: 'Pod',          onPostSince: '14:00', status: 'On Post',        hoursWorked: 1 },
  { badge: '2110', name: 'King, D.',      rank: 'Deputy',    assignment: 'B-Pod',         postType: 'Pod',          onPostSince: '14:00', status: 'On Post',        hoursWorked: 1 },
  { badge: '2134', name: 'Scott, J.',     rank: 'Deputy',    assignment: 'B2-Pod',        postType: 'Pod',          onPostSince: '14:00', status: 'On Post',        hoursWorked: 1 },
  { badge: '2156', name: 'Rivera, M.',    rank: 'Deputy',    assignment: 'C-Pod',         postType: 'Pod',          onPostSince: '14:00', status: 'On Post',        hoursWorked: 1 },
  { badge: '2204', name: 'Carter, L.',    rank: 'Deputy',    assignment: 'D-Pod',         postType: 'Pod',          onPostSince: '14:00', status: 'On Post',        hoursWorked: 1 },
  { badge: '2217', name: 'Lewis, T.',     rank: 'Deputy',    assignment: 'D2-Pod',        postType: 'Pod',          onPostSince: '14:00', status: 'On Post',        hoursWorked: 1 },
  { badge: '2251', name: 'Martinez, R.',  rank: 'Deputy',    assignment: 'E-Pod',         postType: 'Medical',      onPostSince: '14:00', status: 'Medical Escort', hoursWorked: 9 },
  { badge: '2289', name: 'Johnson, C.',   rank: 'Deputy',    assignment: 'E2-Pod',        postType: 'Pod',          onPostSince: '14:00', status: 'On Post',        hoursWorked: 1 },
  { badge: '2301', name: 'Allen, P.',     rank: 'Deputy',    assignment: 'F-Pod / Intake',postType: 'Pod',          onPostSince: '14:00', status: 'On Post',        hoursWorked: 1 },
  { badge: '2318', name: 'Young, A.',     rank: 'Deputy',    assignment: 'F2-Pod',        postType: 'Pod',          onPostSince: '14:00', status: 'On Post',        hoursWorked: 1 },
  { badge: '2345', name: 'Clark, B.',     rank: 'Deputy',    assignment: 'H-Pod',         postType: 'Pod',          onPostSince: '14:00', status: 'On Post',        hoursWorked: 1 },
  { badge: '2367', name: 'Robinson, E.',  rank: 'Deputy',    assignment: 'H2-Pod',        postType: 'Pod',          onPostSince: '14:00', status: 'On Post',        hoursWorked: 9 },
  { badge: '2399', name: 'Hill, N.',      rank: 'Deputy',    assignment: 'G-Pod + Float', postType: 'Float',        onPostSince: '14:00', status: 'On Post',        hoursWorked: 1 },
];

// ── Helpers ────────────────────────────────────────────────────

const getPodColors = (pod: Pod) => {
  if (pod.status === 'Over Capacity') return {
    card: 'bg-red-500/10 border-red-500/40',
    pct: 'text-red-600 dark:text-red-400',
    bar: 'bg-red-500',
    badge: 'bg-red-500/15 text-red-600 dark:text-red-400 border border-red-500/20',
  };
  if (pod.status === 'Near Capacity') return {
    card: 'bg-amber-500/8 border-amber-500/30',
    pct: 'text-amber-600 dark:text-amber-400',
    bar: 'bg-amber-500',
    badge: 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/20',
  };
  return {
    card: 'bg-slate-50 dark:bg-slate-800/35 border-slate-200 dark:border-slate-700/25',
    pct: 'text-slate-500',
    bar: 'bg-slate-600/50',
    badge: 'bg-slate-100 dark:bg-slate-700/30 text-slate-700 dark:text-slate-400 border border-slate-200 dark:border-slate-700/40',
  };
};

const getMovementIcon = (type: Movement['type']) => {
  switch (type) {
    case 'Court Transport':  return Truck;
    case 'Medical Visit':    return Heart;
    case 'Release':          return LogOut;
    case 'Housing Transfer': return ArrowLeftRight;
    case 'Intake':           return ArrowRight;
  }
};

const getMovementColors = (status: Movement['status']) => {
  if (status === 'In Progress') return 'bg-amber-100 dark:bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-500/20';
  if (status === 'Staging')     return 'bg-amber-100 dark:bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-500/20';
  if (status === 'Pending')     return 'bg-slate-100 dark:bg-slate-700/30 text-slate-700 dark:text-slate-400 border border-slate-200 dark:border-slate-700/40';
  return 'bg-slate-100 dark:bg-slate-700/30 text-slate-700 dark:text-slate-400 border border-slate-200 dark:border-slate-700/40';
};

const getIncidentColors = (severity: Incident['severity'], status: Incident['status']) => {
  const resolved = status === 'Resolved';
  if (resolved) return { row: 'opacity-60', badge: 'bg-slate-500/15 text-slate-700 dark:text-slate-400 border border-slate-500/20', sev: '' };
  if (severity === 'critical') return { row: '', badge: 'bg-red-500/15 text-red-600 dark:text-red-400 border border-red-500/20',    sev: 'text-red-600 dark:text-red-400' };
  if (severity === 'high')     return { row: '', badge: 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/20', sev: 'text-amber-600 dark:text-amber-400' };
  return { row: '', badge: 'bg-slate-100 dark:bg-slate-700/30 text-slate-700 dark:text-slate-400 border border-slate-200 dark:border-slate-700/40', sev: 'text-slate-500' };
};

const getIncidentIcon = (type: Incident['type']) => {
  switch (type) {
    case 'Fight':             return AlertOctagon;
    case 'Medical Emergency': return Heart;
    case 'Contraband':        return AlertTriangle;
    default:                  return AlertTriangle;
  }
};

const getMovementDecision = (mov: Movement): { risk: string | null; action: string | null } => {
  if (mov.status === 'Completed') return { risk: null, action: null };
  switch (mov.type) {
    case 'Court Transport':
      return { risk: 'Delay risk: Missed appearance — rescheduling + judicial notice', action: null };
    case 'Medical Visit':
      return { risk: 'Delay risk: Medical window may close — physician availability limited', action: null };
    case 'Housing Transfer':
      return { risk: 'Delay risk: Source pod remains over capacity — ACA violation persists', action: 'Complete immediately — resolves H2 compliance' };
    case 'Release':
      return { risk: 'Delay risk: Wrongful detention liability after release time', action: 'Verify paperwork · clear by ETA' };
    case 'Intake':
      return { risk: null, action: 'Classification required before pod assignment' };
  }
};

const getOfficerStatusColors = (status: Officer['status']) => {
  if (status === 'On Post')        return 'bg-slate-100 dark:bg-slate-700/30 text-slate-700 dark:text-slate-400 border border-slate-200 dark:border-slate-700/40';
  if (status === 'Medical Escort') return 'bg-amber-100 dark:bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-500/20';
  if (status === 'OT Pending')     return 'bg-amber-100 dark:bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-500/20';
  if (status === 'Transport')      return 'bg-slate-100 dark:bg-slate-700/30 text-slate-700 dark:text-slate-400 border border-slate-200 dark:border-slate-700/40';
  return 'bg-slate-100 dark:bg-slate-700/30 text-slate-700 dark:text-slate-400 border border-slate-200 dark:border-slate-700/40';
};

// ── Component ──────────────────────────────────────────────────

type Priority = 'Immediate' | 'High Priority' | 'Monitor';

interface CriticalIssue {
  id: string;
  priority: Priority;
  severity: 'critical' | 'high' | 'medium';
  label: string;
  detail: string;
  impact: string[];
  recommendation: string;
  confidence: 'High' | 'Medium';
  outcome: string;
  actions: string[];
}

const PRIORITY_ORDER: Record<Priority, number> = { Immediate: 0, 'High Priority': 1, Monitor: 2 };

const IMPACT_PREVIEWS: Record<string, string[]> = {
  'Redistribute Inmates': [
    'H2-Pod: 36 → 28 inmates · reduces to 87% capacity',
    'G2-Pod: 35 → 43 inmates · remains within rated capacity',
    'ACA compliance violation on H2-Pod cleared',
    'Requires 2-officer escort team · estimated 45 min',
  ],
  'Call Backup': [
    'Off-duty Deputy eligible — estimated arrival 30 min',
    'Covers float gap on C2 / G2 rotation',
    'Overtime cost: ~$52/hr for remainder of shift',
    'Shift staffing: 13/14 → 14/14 · ACA minimum restored',
  ],
  'Approve OT': [
    'Smith absence covered through end of B-Shift (22:00)',
    'Staffing ratio: 93% → 100%',
    'Overtime cost: ~$52/hr · ~6 hours remaining',
    'Requires watch commander authorization',
  ],
  'Lock Unit': [
    'All inmates returned to cells — dayroom suspended',
    'Movement in/out of pod halted until command clearance',
    'Investigating officer and supervisor notified',
    'Duration: until incident resolved or cleared',
  ],
};

export default function CustodyOperations() {
  const navigate = useNavigate();
  const [expandedPod, setExpandedPod] = useState<string | null>(null);
  const [expandedIncident, setExpandedIncident] = useState<number | null>(null);
  const [activePreview, setActivePreview] = useState<{ issueId: string; action: string } | null>(null);
  const [showStatusDetail, setShowStatusDetail] = useState(false);

  const staffPct = Math.round((currentShift.present / currentShift.scheduled) * 100);
  const unassignedPods = pods.filter(p => !p.assignedOfficer).length;
  const openIncidents = incidents.filter(i => i.status !== 'Resolved').length;
  const activeMovementCount = movements.filter(m => m.status === 'In Progress' || m.status === 'Staging').length;
  const overCapacityPods = pods.filter(p => p.status === 'Over Capacity');
  const nearCapacityPods = pods.filter(p => p.status === 'Near Capacity');

  // ── System Status ─────────────────────────────────────────────
  const systemStatus: 'Critical' | 'Strained' | 'Stable' = (() => {
    const hasOpenCritical = incidents.some(i => i.status !== 'Resolved' && i.severity === 'critical');
    if (overCapacityPods.length > 0 || hasOpenCritical) return 'Critical';
    const hasOpenHigh = incidents.some(i => i.status !== 'Resolved' && i.severity === 'high');
    if (hasOpenHigh || staffPct < 93 || nearCapacityPods.length > 2) return 'Strained';
    return 'Stable';
  })();

  // ── System Status contributing factors ───────────────────────
  const statusFactors: string[] = [
    overCapacityPods.length > 0
      ? `${overCapacityPods.length} pod(s) over rated capacity — ACA violation active`
      : nearCapacityPods.length > 0
      ? `${nearCapacityPods.length} pod(s) near capacity — one intake from violation`
      : 'All housing units within rated capacity',
    incidents.filter(i => i.status !== 'Resolved' && (i.severity === 'critical' || i.severity === 'high')).length > 0
      ? `${incidents.filter(i => i.status !== 'Resolved' && (i.severity === 'critical' || i.severity === 'high')).length} high/critical incident(s) unresolved this shift`
      : 'No high-severity open incidents',
    staffPct < 100
      ? `Staffing at ${staffPct}% — ${currentShift.scheduled - currentShift.present} post(s) uncovered`
      : 'Full staffing complement on shift',
    unassignedPods > 0
      ? `${unassignedPods} pod(s) on float coverage — dedicated officer required`
      : 'All pods have dedicated officer assignments',
  ];

  // ── Critical Issues with Priority + Impact ────────────────────
  const criticalIssues: CriticalIssue[] = [
    ...overCapacityPods.map(p => ({
      id: `pod-${p.id}`,
      priority: 'Immediate' as Priority,
      severity: 'critical' as const,
      label: `${p.name} — Over Capacity`,
      detail: `${p.current}/${p.capacity} beds · ${Math.round((p.current / p.capacity) * 100)}% occupied · ${p.type}`,
      impact: [
        `ACA compliance violation active — reportable offense if unresolved by shift end (22:00)`,
        'Emergency beds exhausted — no capacity for medical overflow or additional intake',
        'Conflict risk increases ~40% above rated capacity — use-of-force likelihood elevated',
      ],
      recommendation: `Move ${p.current - p.capacity + 4} inmates to B-Pod (3 available beds) — restores compliance within ~45 min`,
      confidence: 'High' as const,
      outcome: 'ACA violation cleared · conflict risk reduced · medical overflow capacity restored',
      actions: ['Redistribute Inmates', 'Contact USMS'],
    })),
    ...incidents
      .filter(i => i.status !== 'Resolved' && (i.severity === 'critical' || i.severity === 'high'))
      .map(i => ({
        id: `inc-${i.id}`,
        priority: (i.severity === 'critical' ? 'Immediate' : 'High Priority') as Priority,
        severity: i.severity as 'critical' | 'high',
        label: `${i.type} — ${i.pod}`,
        detail: `${i.time} · ${i.reportingOfficer} · ${i.status}`,
        impact:
          i.type === 'Fight'
            ? [
                'Escalation risk increases significantly after 30 min without supervisor on-scene',
                'Injured inmate may require outside transport — pod movement halt for ~2 hours',
                'ACA incident report required within 24h — clock started at ' + i.time,
              ]
            : i.type === 'Contraband'
            ? [
                'Contraband in active unit elevates safety risk until sweep completed',
                `Intel report required within 24h per SOP — due by ${i.time.replace(':', '')}hrs + 24h`,
                'Investigative hold must be initiated before next shift change (22:00)',
              ]
            : [
                'Unresolved incident compounds if next count finds non-compliance',
                'ACA documentation requirement triggers if not resolved within current shift',
              ],
        recommendation:
          i.type === 'Fight'
            ? `Assign supervisor to ${i.pod} now — stabilize before 15:00 count · ${i.reportingOfficer} needs on-scene support`
            : i.type === 'Contraband'
            ? `Initiate ${i.pod} sweep immediately — ${i.reportingOfficer} to lead · Intel report due by 15:30`
            : `Assign supervisor to ${i.pod} to review and document — close before shift end`,
        confidence: (i.type === 'Fight' ? 'High' : 'Medium') as 'High' | 'Medium',
        outcome:
          i.type === 'Fight'
            ? 'Incident contained · documentation complete · pod count cycle preserved'
            : i.type === 'Contraband'
            ? 'Sweep complete · intel report filed · investigation hold initiated'
            : 'Incident closed · ACA documentation fulfilled · supervisor notified',
        actions: i.severity === 'critical' ? ['Escalate to Command', 'Lock Unit'] : ['Assign Supervisor', 'Escalate'],
      })),
    ...(staffPct < 93 ? [{
      id: 'staff-short',
      priority: 'High Priority' as Priority,
      severity: 'high' as const,
      label: 'Shift Understaffed',
      detail: `${currentShift.present}/${currentShift.scheduled} present · ${currentShift.note}`,
      impact: [
        'Post coverage gap persists for remaining ~6 hours of B-Shift if no action taken',
        'Float officers carrying dual-post load — fatigue risk compounds after hour 6',
        'ACA minimum ratio (1:64) requires full complement — current gap is non-compliant',
      ],
      recommendation: 'Approve OT for Smith replacement — covers C2 and G2 float gap · authorization required now',
      confidence: 'High' as const,
      outcome: 'Staffing restored to 100% · ACA minimum met · float gap eliminated for remainder of B-Shift',
      actions: ['Approve OT', 'Call Backup'],
    }] : []),
  ].sort((a, b) => PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority]);

  const togglePreview = (issueId: string, action: string) => {
    if (activePreview?.issueId === issueId && activePreview?.action === action) {
      setActivePreview(null);
    } else {
      setActivePreview({ issueId, action });
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6 space-y-5">

        {/* ── Page Header ─────────────────────────────────── */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white mb-1">Custody Operations</h1>
            <p className="text-[11px] text-slate-500">
              Watch commander control panel · {currentShift.label} · {currentShift.window} · Commander: <span className="text-slate-700 dark:text-slate-400">{currentShift.commander}</span>
            </p>
          </div>
          <div className="flex items-center gap-2">
            {/* System Status — clickable to show contributing factors */}
            <div className="relative">
              <button
                onClick={() => setShowStatusDetail(v => !v)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-[12px] font-semibold transition-colors ${
                  systemStatus === 'Critical' ? 'bg-red-500/10 border-red-500/30 text-red-600 dark:text-red-400 hover:bg-red-500/15' :
                  systemStatus === 'Strained' ? 'bg-amber-500/10 border-amber-500/30 text-amber-600 dark:text-amber-400 hover:bg-amber-500/15' :
                  'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/15'
                }`}
              >
                <Circle className={`w-1.5 h-1.5 ${
                  systemStatus === 'Critical' ? 'fill-red-500 text-red-500' :
                  systemStatus === 'Strained' ? 'fill-amber-400 text-amber-600 dark:text-amber-400' :
                  'fill-emerald-500 text-emerald-500'
                }`} />
                System: {systemStatus}
                <ChevronDown className={`w-3 h-3 transition-transform ${showStatusDetail ? 'rotate-180' : ''}`} />
              </button>

              {showStatusDetail && (
                <div className="absolute right-0 top-full mt-1.5 z-50 min-w-[280px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/60 rounded-xl shadow-xl overflow-hidden">
                  <div className="px-4 py-2.5 border-b border-slate-200 dark:border-slate-700/40">
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Why System is {systemStatus}</p>
                  </div>
                  <ul className="p-3 space-y-1.5">
                    {statusFactors.map((factor, i) => {
                      const isIssue = factor.includes('violation') || factor.includes('uncovered') || factor.includes('unresolved') || factor.includes('required');
                      return (
                        <li key={i} className="flex items-start gap-2 text-[11px]">
                          <span className={`mt-0.5 flex-shrink-0 font-bold ${isIssue ? 'text-amber-500' : 'text-emerald-600'}`}>{isIssue ? '—' : '✓'}</span>
                          <span className={isIssue ? 'text-slate-500' : 'text-slate-500'}>{factor}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-slate-500 bg-slate-100 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700/50 rounded-lg px-3 py-1.5">
              <Circle className="w-1.5 h-1.5 fill-emerald-500 text-emerald-500" />
              Live
            </div>
            <button
              onClick={() => navigate('/jail/command')}
              className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700/50 rounded-lg text-[12px] text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700/30 transition-all"
            >
              Command Center <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* ── Command Attention Needed ─────────────────────── */}
        {(() => {
          const complianceRisks = overCapacityPods.map(p => `${p.name} over capacity — ACA violation active`);
          const staffingRisks = [
            ...(staffPct < 100 ? [`${currentShift.scheduled - currentShift.present} post uncovered · ${currentShift.note.split('—')[0].trim()}`] : []),
            ...(officers.filter(o => o.hoursWorked >= 8).length > 0 ? [`${officers.filter(o => o.hoursWorked >= 8).length} officer(s) at fatigue threshold (8h+)`] : []),
          ];
          const activeEscalations = incidents
            .filter(i => i.status !== 'Resolved' && (i.severity === 'critical' || i.severity === 'high'))
            .map(i => `${i.type} · ${i.pod} · ${i.status}`);

          if (complianceRisks.length === 0 && staffingRisks.length === 0 && activeEscalations.length === 0) return null;

          return (
            <div className="grid grid-cols-3 gap-3">
              {/* Compliance Risks */}
              <div className={`rounded-xl border px-4 py-3 ${complianceRisks.length > 0 ? 'bg-red-500/5 border-red-500/25' : 'bg-slate-100 dark:bg-slate-800/20 border-slate-200 dark:border-slate-700/30'}`}>
                <div className="flex items-center gap-1.5 mb-2">
                  <AlertOctagon className={`w-3.5 h-3.5 ${complianceRisks.length > 0 ? 'text-red-600 dark:text-red-400' : 'text-slate-700'}`} />
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Compliance Risk</p>
                  {complianceRisks.length > 0 && (
                    <span className="text-[9px] px-1.5 py-0.5 bg-red-500/15 text-red-600 dark:text-red-400 border border-red-500/20 rounded-full font-bold ml-auto">{complianceRisks.length}</span>
                  )}
                </div>
                {complianceRisks.length === 0 ? (
                  <p className="text-[11px] text-slate-700">No active compliance violations</p>
                ) : (
                  <ul className="space-y-0.5">
                    {complianceRisks.map((r, i) => (
                      <li key={i} className="text-[11px] text-slate-700 dark:text-slate-300 flex items-start gap-1.5">
                        <span className="text-red-500 flex-shrink-0 mt-0.5">—</span>{r}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Staffing Risks */}
              <div className={`rounded-xl border px-4 py-3 ${staffingRisks.length > 0 ? 'bg-amber-500/5 border-amber-500/20' : 'bg-slate-100 dark:bg-slate-800/20 border-slate-200 dark:border-slate-700/30'}`}>
                <div className="flex items-center gap-1.5 mb-2">
                  <Users className={`w-3.5 h-3.5 ${staffingRisks.length > 0 ? 'text-amber-600 dark:text-amber-400' : 'text-slate-700'}`} />
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Staffing Risk</p>
                  {staffingRisks.length > 0 && (
                    <span className="text-[9px] px-1.5 py-0.5 bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/20 rounded-full font-bold ml-auto">{staffingRisks.length}</span>
                  )}
                </div>
                {staffingRisks.length === 0 ? (
                  <p className="text-[11px] text-slate-700">Staffing within normal parameters</p>
                ) : (
                  <ul className="space-y-0.5">
                    {staffingRisks.map((r, i) => (
                      <li key={i} className="text-[11px] text-slate-700 dark:text-slate-300 flex items-start gap-1.5">
                        <span className="text-amber-500 flex-shrink-0 mt-0.5">—</span>{r}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Active Escalations */}
              <div className={`rounded-xl border px-4 py-3 ${activeEscalations.length > 0 ? 'bg-amber-500/5 border-amber-500/20' : 'bg-slate-100 dark:bg-slate-800/20 border-slate-200 dark:border-slate-700/30'}`}>
                <div className="flex items-center gap-1.5 mb-2">
                  <AlertTriangle className={`w-3.5 h-3.5 ${activeEscalations.length > 0 ? 'text-amber-600 dark:text-amber-400' : 'text-slate-700'}`} />
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Active Escalations</p>
                  {activeEscalations.length > 0 && (
                    <span className="text-[9px] px-1.5 py-0.5 bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/20 rounded-full font-bold ml-auto">{activeEscalations.length}</span>
                  )}
                </div>
                {activeEscalations.length === 0 ? (
                  <p className="text-[11px] text-slate-700">No open high-severity incidents</p>
                ) : (
                  <ul className="space-y-0.5">
                    {activeEscalations.map((r, i) => (
                      <li key={i} className="text-[11px] text-slate-700 dark:text-slate-300 flex items-start gap-1.5">
                        <span className="text-amber-500 flex-shrink-0 mt-0.5">—</span>{r}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          );
        })()}

        {/* ── Critical Operational Issues ──────────────────── */}
        {criticalIssues.length > 0 && (
          <div className="border border-red-500/30 bg-red-500/5 rounded-xl overflow-hidden">
            <div className="flex items-center justify-between px-5 py-3 border-b border-red-500/20">
              <div className="flex items-center gap-2">
                <AlertOctagon className="w-4 h-4 text-red-600 dark:text-red-400" />
                <span className="text-[13px] font-bold text-red-600 dark:text-red-400 uppercase tracking-wide">
                  Critical Operational Issues
                </span>
                <span className="text-[10px] px-2 py-0.5 bg-red-500/15 text-red-600 dark:text-red-400 border border-red-500/20 rounded-full">
                  {criticalIssues.length} requiring action
                </span>
              </div>
              <span className="text-[10px] text-slate-500 flex items-center gap-1">
                <ArrowRight className="w-3 h-3" /> Synced to Command Center
              </span>
            </div>
            <div className="divide-y divide-red-500/10">
              {criticalIssues.map(issue => {
                const preview = activePreview?.issueId === issue.id ? IMPACT_PREVIEWS[activePreview.action] : null;
                return (
                  <div key={issue.id}>
                    <div className="flex items-start gap-4 px-5 py-4">
                      {/* Severity strip */}
                      <div className={`w-1 self-stretch rounded-full flex-shrink-0 ${issue.severity === 'critical' ? 'bg-red-500' : 'bg-amber-500'}`} />
                      <div className="flex-1 min-w-0">
                        {/* Priority + title */}
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider ${
                            issue.priority === 'Immediate'     ? 'bg-red-500/20 text-red-600 dark:text-red-400 border border-red-500/30' :
                            issue.priority === 'High Priority' ? 'bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30' :
                                                                 'bg-slate-100 dark:bg-slate-700/30 text-slate-700 dark:text-slate-400 border border-slate-200 dark:border-slate-700/40'
                          }`}>{issue.priority}</span>
                          <p className="text-[13px] font-semibold text-slate-900 dark:text-white">{issue.label}</p>
                        </div>
                        <p className="text-[11px] text-slate-700 dark:text-slate-400 mb-2.5">{issue.detail}</p>

                        {/* Operational Impact */}
                        <div className="bg-white dark:bg-slate-900/50 border border-slate-700/40 rounded-lg px-3 py-2.5">
                          <p className="text-[9px] text-slate-500 uppercase tracking-wider font-semibold mb-1.5">Operational Impact — if no action taken</p>
                          <ul className="space-y-1">
                            {issue.impact.map((line, i) => (
                              <li key={i} className="flex items-start gap-2 text-[11px] text-slate-700 dark:text-slate-300">
                                <span className="text-slate-700 mt-0.5 flex-shrink-0">—</span>
                                {line}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Recommended action + buttons */}
                      <div className="flex flex-col gap-2 flex-shrink-0 max-w-[210px]">
                        <div className="bg-white dark:bg-slate-800/60 border border-slate-700/50 rounded-lg px-2.5 py-2">
                          <div className="flex items-center justify-between mb-1">
                            <p className="text-[9px] text-slate-500 uppercase tracking-wider font-semibold">Recommended</p>
                            <span className={`text-[8px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider ${
                              issue.confidence === 'High'
                                ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                                : 'bg-slate-100 dark:bg-slate-700/30 text-slate-700 dark:text-slate-400 border border-slate-200 dark:border-slate-700/40'
                            }`}>{issue.confidence} confidence</span>
                          </div>
                          <p className="text-[11px] text-slate-700 dark:text-slate-200 leading-snug mb-1.5">{issue.recommendation}</p>
                          <p className="text-[10px] text-slate-500 leading-snug border-t border-slate-200 dark:border-slate-700/40 pt-1.5">
                            Expected: {issue.outcome}
                          </p>
                        </div>
                        <div className="flex flex-col gap-1">
                          {issue.actions.map(action => {
                            const hasPreview = !!IMPACT_PREVIEWS[action];
                            const isActive = activePreview?.issueId === issue.id && activePreview?.action === action;
                            const isDestructive = action.toLowerCase().includes('escalate') || action.toLowerCase().includes('lock');
                            return (
                              <button
                                key={action}
                                onClick={() => hasPreview ? togglePreview(issue.id, action) : undefined}
                                className={`text-[11px] px-3 py-1.5 rounded-lg font-medium transition-colors whitespace-nowrap ${
                                  isDestructive
                                    ? isActive
                                      ? 'bg-red-500/30 border border-red-500/50 text-red-300'
                                      : 'bg-red-500/15 border border-red-500/25 text-red-600 dark:text-red-400 hover:bg-red-500/25'
                                    : isActive
                                      ? 'bg-slate-600/60 border border-slate-500/60 text-slate-900 dark:text-white'
                                      : 'bg-white dark:bg-slate-700/50 border border-slate-600/50 text-slate-700 dark:text-slate-300 hover:bg-slate-700/70'
                                }`}
                              >
                                {action}
                                {hasPreview && (
                                  <span className="ml-1.5 text-[9px] opacity-50">{isActive ? '▲' : '▼'}</span>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Impact Preview — inline */}
                    {preview && (
                      <div className="mx-5 mb-4 bg-slate-50 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-700/60 rounded-lg p-3">
                        <p className="text-[9px] text-slate-500 uppercase tracking-wider font-semibold mb-2">Impact Preview — {activePreview!.action}</p>
                        <ul className="space-y-1 mb-3">
                          {preview.map((line, i) => (
                            <li key={i} className="flex items-start gap-2 text-[11px] text-slate-700 dark:text-slate-200">
                              <span className="text-emerald-600 flex-shrink-0 mt-0.5">→</span>
                              {line}
                            </li>
                          ))}
                        </ul>
                        <div className="flex items-center gap-2 pt-2 border-t border-slate-200 dark:border-slate-700/40">
                          <button className="text-[11px] px-3 py-1.5 bg-white dark:bg-slate-700/60 border border-slate-600/60 text-slate-900 dark:text-white rounded-lg hover:bg-slate-700 transition-colors font-medium">
                            Confirm — {activePreview!.action}
                          </button>
                          <button onClick={() => setActivePreview(null)} className="text-[11px] text-slate-500 hover:text-slate-700 dark:text-slate-300 transition-colors px-2 py-1.5">
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── Section 1: Shift Operations Overview ─────────── */}
        <div className="bg-white dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700/50 rounded-xl shadow-sm dark:shadow-none p-5">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-5">

            {/* Shift identity */}
            <div className="flex items-center gap-4 flex-shrink-0">
              <div className="w-12 h-12 bg-slate-100 dark:bg-slate-700/30 border border-slate-700/40 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-slate-700 dark:text-slate-400" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-[18px] font-bold text-slate-900 dark:text-white">{currentShift.label}</span>
                  <span className="text-[11px] px-2 py-0.5 bg-slate-100 dark:bg-slate-700/30 text-slate-700 dark:text-slate-400 border border-slate-700/40 rounded-full">Active</span>
                </div>
                <p className="text-[12px] text-slate-700 dark:text-slate-400">{currentShift.window} &nbsp;·&nbsp; Commander: <span className="text-slate-900 dark:text-white font-medium">{currentShift.commander}</span> #{currentShift.badge}</p>
              </div>
            </div>

            <div className="w-px h-10 bg-slate-50 dark:bg-slate-700/40 hidden lg:block flex-shrink-0" />

            {/* Staffing */}
            <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <p className="text-[10px] text-slate-500 uppercase tracking-wide mb-1">Staffing</p>
                <p className="text-[20px] font-bold text-slate-900 dark:text-white leading-none">
                  {currentShift.present}<span className="text-[13px] text-slate-500">/{currentShift.scheduled}</span>
                </p>
                <div className="flex items-center gap-1.5 mt-1.5">
                  <div className="flex-1 h-1 bg-white dark:bg-slate-700/50 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${staffPct < 93 ? 'bg-red-500' : staffPct < 100 ? 'bg-amber-400' : 'bg-slate-500'}`} style={{ width: `${staffPct}%` }} />
                  </div>
                  <span className={`text-[10px] ${staffPct < 93 ? 'text-red-600 dark:text-red-400' : staffPct < 100 ? 'text-amber-600 dark:text-amber-400' : 'text-slate-500'}`}>{staffPct}%</span>
                </div>
                {currentShift.note && <p className="text-[10px] text-amber-600 dark:text-amber-400 mt-1">⚠ {currentShift.note.split('—')[0].trim()}</p>}
              </div>

              <div>
                <p className="text-[10px] text-slate-500 uppercase tracking-wide mb-1">Active Movements</p>
                <p className="text-[20px] font-bold text-slate-900 dark:text-white leading-none">{activeMovementCount}</p>
                <p className="text-[10px] text-slate-500 mt-1">{movements.filter(m => m.status === 'Pending').length} pending</p>
              </div>

              <div>
                <p className="text-[10px] text-slate-500 uppercase tracking-wide mb-1">Open Incidents</p>
                <p className={`text-[20px] font-bold leading-none ${openIncidents > 0 ? 'text-amber-600 dark:text-amber-400' : 'text-slate-900 dark:text-white'}`}>{openIncidents}</p>
                <p className="text-[10px] text-slate-500 mt-1">this shift</p>
              </div>

              <div>
                <p className="text-[10px] text-slate-500 uppercase tracking-wide mb-1">Unassigned Pods</p>
                <p className={`text-[20px] font-bold leading-none ${unassignedPods > 0 ? 'text-amber-600 dark:text-amber-400' : 'text-slate-900 dark:text-white'}`}>{unassignedPods}</p>
                <p className="text-[10px] text-slate-500 mt-1">float coverage</p>
              </div>
            </div>

            {/* Pending actions badge */}
            {currentShift.pendingActions > 0 && (
              <div className="flex-shrink-0">
                <div className="flex items-center gap-2 px-3 py-2 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                  <Zap className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                  <span className="text-[12px] text-amber-300 font-medium">{currentShift.pendingActions} pending actions</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── Section 2: Housing Unit Management ──────────── */}
        <div className="bg-white dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700/50 rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-200 dark:border-slate-700/40">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-slate-700 dark:text-slate-400" />
              <span className="text-[13px] font-semibold text-slate-900 dark:text-white">Housing Unit Management</span>
              <span className="text-[10px] px-2 py-0.5 bg-slate-50 dark:bg-slate-700/40 text-slate-700 dark:text-slate-400 rounded-full">
                {pods.filter(p => p.status === 'Over Capacity').length} over · {pods.filter(p => p.status === 'Near Capacity').length} near · {pods.filter(p => p.status === 'Normal').length} stable
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-3 text-[10px] text-slate-500 mr-2">
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-slate-500 inline-block" />Stable</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />Near</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500 inline-block" />Over</span>
                <span className="text-slate-700">·</span>
                <span className="flex items-center gap-0.5 text-amber-600 dark:text-amber-400 font-bold">↑</span><span className="text-slate-500">worsening</span>
                <span className="flex items-center gap-0.5 text-emerald-500 font-bold">↓</span><span className="text-slate-500">improving</span>
              </div>
              <button className="flex items-center gap-1.5 text-[11px] text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-700/40 border border-slate-600/50 rounded-lg px-3 py-1.5 hover:bg-slate-700/60 transition-colors">
                <ArrowLeftRight className="w-3.5 h-3.5" /> Redistribute Inmates
              </button>
            </div>
          </div>

          <div className="p-4 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
            {pods.map(pod => {
              const colors = getPodColors(pod);
              const pct = Math.round((pod.current / pod.capacity) * 100);
              const isExpanded = expandedPod === pod.id;
              return (
                <div key={pod.id} className="col-span-1">
                  <button
                    onClick={() => setExpandedPod(isExpanded ? null : pod.id)}
                    title={pod.projection}
                    className={`w-full rounded-xl border p-2.5 text-left transition-all hover:ring-1 hover:ring-slate-500/40 ${colors.card} ${isExpanded ? 'ring-1 ring-slate-400/30' : ''}`}
                  >
                    <div className="flex items-start justify-between mb-1.5">
                      <span className="text-[11px] font-bold text-slate-900 dark:text-white">{pod.id}</span>
                      <div className="flex items-center gap-0.5">
                        {pod.trend === 'up'     && <span className={`text-[10px] font-bold leading-none ${pod.status === 'Over Capacity' ? 'text-red-600 dark:text-red-400' : 'text-amber-600 dark:text-amber-400'}`}>↑</span>}
                        {pod.trend === 'down'   && <span className="text-[10px] font-bold leading-none text-emerald-500">↓</span>}
                        {pod.incidents > 0      && <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-0.5" title="Active incident" />}
                        {pod.activeMovements > 0 && <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-0.5" title="Active movement" />}
                      </div>
                    </div>
                    <p className={`text-[13px] font-bold ${colors.pct}`}>{pct}%</p>
                    <p className="text-[9px] text-slate-500 mt-0.5">{pod.current}/{pod.capacity}</p>
                    <div className="w-full h-0.5 bg-white dark:bg-slate-700/50 rounded-full mt-1.5 overflow-hidden">
                      <div className={`h-full rounded-full ${colors.bar}`} style={{ width: `${Math.min(pct, 100)}%` }} />
                    </div>
                    <p className="text-[9px] text-slate-500 mt-1.5 truncate">{pod.assignedOfficer ? pod.assignedOfficer.replace('Dep. ', '') : '—'}</p>
                  </button>
                </div>
              );
            })}
          </div>

          {/* Expanded pod detail */}
          {expandedPod && (() => {
            const pod = pods.find(p => p.id === expandedPod)!;
            const colors = getPodColors(pod);
            const pct = Math.round((pod.current / pod.capacity) * 100);
            return (
              <div className="mx-4 mb-4 bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-700/50 rounded-xl p-4">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-[14px] font-bold text-slate-900 dark:text-white">{pod.name} — {pod.type}</h3>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full ${colors.badge}`}>{pod.status}</span>
                      <span className="text-[10px] text-slate-500">{pod.security} security</span>
                    </div>
                    <p className="text-[11px] text-slate-700 dark:text-slate-400">
                      {pod.current} / {pod.capacity} beds occupied ({pct}%)
                      {pod.notes && <span className="ml-2 text-amber-600 dark:text-amber-400">· {pod.notes}</span>}
                    </p>
                    {pod.projection && (
                      <p className="text-[11px] mt-1 flex items-center gap-1.5">
                        <span className={`font-bold ${pod.trend === 'up' ? (pod.status === 'Over Capacity' ? 'text-red-600 dark:text-red-400' : 'text-amber-600 dark:text-amber-400') : pod.trend === 'down' ? 'text-emerald-500' : 'text-slate-500'}`}>
                          {pod.trend === 'up' ? '↑' : pod.trend === 'down' ? '↓' : '→'}
                        </span>
                        <span className="text-slate-700 dark:text-slate-400">{pod.projection}</span>
                      </p>
                    )}
                  </div>
                  <button onClick={() => setExpandedPod(null)} className="text-slate-500 hover:text-slate-700 dark:text-slate-300 text-[11px] flex-shrink-0">Close</button>
                </div>

                {/* Operational Impact — only shown when there's a problem */}
                {(pod.status !== 'Normal' || !pod.assignedOfficer || pod.incidents > 0) && (
                  <div className="bg-white dark:bg-slate-900/50 border border-slate-700/40 rounded-lg px-3 py-2.5 mb-3">
                    <p className="text-[9px] text-slate-500 uppercase tracking-wider font-semibold mb-1.5">Operational Impact — if no action taken</p>
                    <ul className="space-y-0.5">
                      {pod.status === 'Over Capacity' && (
                        <>
                          <li className="flex items-start gap-2 text-[11px] text-slate-700 dark:text-slate-300"><span className="text-slate-700 mt-0.5 flex-shrink-0">—</span>ACA compliance violation — reportable offense if unresolved at shift end</li>
                          <li className="flex items-start gap-2 text-[11px] text-slate-700 dark:text-slate-300"><span className="text-slate-700 mt-0.5 flex-shrink-0">—</span>Emergency beds exhausted — no capacity for medical overflow or intake</li>
                        </>
                      )}
                      {pod.status === 'Near Capacity' && (
                        <li className="flex items-start gap-2 text-[11px] text-slate-700 dark:text-slate-300"><span className="text-slate-700 mt-0.5 flex-shrink-0">—</span>One additional intake pushes pod into non-compliance — no buffer remaining</li>
                      )}
                      {!pod.assignedOfficer && (
                        <li className="flex items-start gap-2 text-[11px] text-slate-700 dark:text-slate-300"><span className="text-slate-700 mt-0.5 flex-shrink-0">—</span>Unassigned post creates supervisory blind spot — float coverage is non-dedicated</li>
                      )}
                      {pod.incidents > 0 && (
                        <li className="flex items-start gap-2 text-[11px] text-slate-700 dark:text-slate-300"><span className="text-slate-700 mt-0.5 flex-shrink-0">—</span>Open incident may escalate — requires supervisory review and documentation</li>
                      )}
                    </ul>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* Officer assignment */}
                  <div className={`border rounded-lg p-3 ${!pod.assignedOfficer ? 'bg-amber-500/5 border-amber-500/25' : 'bg-slate-100 dark:bg-slate-800/30 border-slate-700/40'}`}>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-[10px] text-slate-500 uppercase tracking-wide">Assigned Officer</p>
                      {!pod.assignedOfficer && <span className="text-[9px] px-1.5 py-0.5 bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/20 rounded font-semibold uppercase">At Risk</span>}
                    </div>
                    {pod.assignedOfficer ? (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <UserCheck className="w-3.5 h-3.5 text-slate-700 dark:text-slate-400" />
                          <span className="text-[12px] font-medium text-slate-900 dark:text-white">{pod.assignedOfficer}</span>
                        </div>
                        <button className="text-[10px] px-2 py-1 bg-slate-50 dark:bg-slate-700/40 border border-slate-600/50 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:text-white rounded-lg transition-colors">
                          Reassign
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between">
                        <span className="text-[12px] text-amber-600 dark:text-amber-400">Float coverage only</span>
                        <button className="flex items-center gap-1 text-[10px] px-2 py-1 bg-slate-50 dark:bg-slate-700/40 border border-slate-600/50 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:text-white rounded-lg transition-colors">
                          <Plus className="w-3 h-3" /> Assign Now
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Active movements for this pod */}
                  <div className="bg-slate-100 dark:bg-slate-800/30 border border-slate-700/40 rounded-lg p-3">
                    <p className="text-[10px] text-slate-500 uppercase tracking-wide mb-2">Pod Movements ({pod.activeMovements})</p>
                    {pod.activeMovements === 0 ? (
                      <p className="text-[11px] text-slate-700">No active movements</p>
                    ) : (
                      movements.filter(m => m.from === pod.name || m.to === pod.name).slice(0, 2).map(m => (
                        <p key={m.id} className="text-[11px] text-slate-700 dark:text-slate-300 mb-1">{m.type} — {m.inmateName} <span className="text-slate-500">{m.status}</span></p>
                      ))
                    )}
                  </div>

                  {/* Actions */}
                  <div className="bg-slate-100 dark:bg-slate-800/30 border border-slate-700/40 rounded-lg p-3">
                    <p className="text-[10px] text-slate-500 uppercase tracking-wide mb-2">Actions</p>
                    <div className="space-y-1.5">
                      <button className="w-full flex items-center gap-2 text-[11px] text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:text-white px-2.5 py-1.5 bg-slate-100 dark:bg-slate-700/30 border border-slate-700/40 rounded-lg transition-colors">
                        <ArrowLeftRight className="w-3 h-3" /> Redistribute Inmates
                      </button>
                      <button className="w-full flex items-center gap-2 text-[11px] text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:text-white px-2.5 py-1.5 bg-slate-100 dark:bg-slate-700/30 border border-slate-700/40 rounded-lg transition-colors">
                        <Lock className="w-3 h-3" /> Lock Unit
                      </button>
                      <button className="w-full flex items-center gap-2 text-[11px] text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:text-white px-2.5 py-1.5 bg-slate-100 dark:bg-slate-700/30 border border-slate-700/40 rounded-lg transition-colors">
                        <AlertTriangle className="w-3 h-3" /> Log Incident
                      </button>
                    </div>
                  </div>
                </div>

                {/* Command uplink */}
                <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-200 dark:border-slate-700/30 flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-slate-700" />
                  <span className="text-[10px] text-slate-700">
                    {pod.status === 'Over Capacity' ? 'Impacts Command Risk Level — capacity violation flagged upward' : 'Pod status feeds Command Center housing overview'}
                  </span>
                </div>
              </div>
            );
          })()}
        </div>

        {/* ── Section 3: Movement Control + Incidents ──────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

          {/* Inmate Movement Control */}
          <div className="bg-white dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700/50 rounded-xl overflow-hidden">
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-200 dark:border-slate-700/40">
              <div className="flex items-center gap-2">
                <ArrowLeftRight className="w-4 h-4 text-slate-700 dark:text-slate-400" />
                <span className="text-[13px] font-semibold text-slate-900 dark:text-white">Inmate Movement Control</span>
                <span className="text-[10px] px-2 py-0.5 bg-slate-100 dark:bg-slate-700/30 text-slate-700 dark:text-slate-400 border border-slate-700/40 rounded-full">
                  {activeMovementCount} active
                </span>
              </div>
              <button
                onClick={() => navigate('/jail/inmates')}
                className="flex items-center gap-1 text-[11px] text-slate-500 hover:text-slate-700 dark:text-slate-300 transition-colors"
              >
                All Movements <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="divide-y divide-slate-700/10">
              {movements.map(mov => {
                const Icon = getMovementIcon(mov.type);
                const isActive = mov.status === 'In Progress' || mov.status === 'Staging';
                const decision = getMovementDecision(mov);
                return (
                  <div key={mov.id} className="flex items-start gap-3 px-5 py-3 hover:bg-slate-700/10 transition-colors">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 bg-slate-100 dark:bg-slate-700/30">
                      <Icon className="w-3.5 h-3.5 text-slate-700 dark:text-slate-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-0.5">
                        <p className="text-[12px] font-medium text-slate-700 dark:text-slate-200">{mov.inmateName} <span className="text-slate-500 font-normal">{mov.inmateId}</span></p>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded flex-shrink-0 ${getMovementColors(mov.status)}`}>{mov.status}</span>
                      </div>
                      <p className="text-[11px] text-slate-700 dark:text-slate-400">{mov.type} · {mov.from} → {mov.to}</p>
                      <p className="text-[10px] text-slate-500 mt-0.5">{mov.escort} · Started {mov.startTime} · ETA {mov.eta}</p>
                      {isActive && decision.risk && (
                        <p className="text-[10px] text-amber-600 dark:text-amber-400/80 mt-1">⚠ {decision.risk}</p>
                      )}
                      {isActive && decision.action && (
                        <p className="text-[10px] text-slate-700 dark:text-slate-400 mt-0.5">→ {decision.action}</p>
                      )}
                    </div>
                    {isActive && (
                      <div className="flex flex-col gap-1 flex-shrink-0">
                        <button className="text-[10px] px-2 py-1 bg-slate-50 dark:bg-slate-700/40 border border-slate-600/50 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:text-white rounded transition-colors whitespace-nowrap">
                          Delay
                        </button>
                        <button className="text-[10px] px-2 py-1 bg-slate-50 dark:bg-slate-700/40 border border-slate-600/50 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:text-white rounded transition-colors whitespace-nowrap">
                          Re-route
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="px-5 py-2.5 border-t border-slate-200 dark:border-slate-200 dark:border-slate-700/30">
              <p className="text-[10px] text-slate-700 flex items-center gap-1">
                <ArrowRight className="w-3 h-3" /> Active movements tracked in Command Center transport log
              </p>
            </div>
          </div>

          {/* Incident & Discipline Tracking */}
          <div className="bg-white dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700/50 rounded-xl overflow-hidden">
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-200 dark:border-slate-700/40">
              <div className="flex items-center gap-2">
                <AlertOctagon className="w-4 h-4 text-slate-700 dark:text-slate-400" />
                <span className="text-[13px] font-semibold text-slate-900 dark:text-white">Incident & Discipline</span>
                {openIncidents > 0 && (
                  <span className="text-[10px] px-2 py-0.5 bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/20 rounded-full">
                    {openIncidents} open
                  </span>
                )}
              </div>
              <button
                onClick={() => navigate('/jail/incidents')}
                className="flex items-center gap-1 text-[11px] text-slate-500 hover:text-slate-700 dark:text-slate-300 transition-colors"
              >
                Full Log <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="divide-y divide-slate-700/10">
              {incidents.map(inc => {
                const colors = getIncidentColors(inc.severity, inc.status);
                const Icon = getIncidentIcon(inc.type);
                const isExpanded = expandedIncident === inc.id;
                return (
                  <div key={inc.id} className={`transition-colors hover:bg-slate-700/10 ${colors.row}`}>
                    <button
                      onClick={() => setExpandedIncident(isExpanded ? null : inc.id)}
                      className="w-full flex items-start gap-3 px-5 py-3 text-left"
                    >
                      <Icon className={`w-4 h-4 flex-shrink-0 mt-0.5 ${colors.sev || 'text-slate-500'}`} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-0.5">
                          <div className="flex items-center gap-2 flex-wrap">
                            <p className="text-[12px] font-medium text-slate-700 dark:text-slate-200">{inc.type}</p>
                            <span className="text-[10px] text-slate-500">{inc.pod}</span>
                            {inc.status !== 'Resolved' && (
                              <span className={`text-[9px] px-1.5 py-0.5 rounded font-semibold uppercase tracking-wide ${
                                inc.severity === 'critical' ? 'bg-red-500/15 text-red-600 dark:text-red-400 border border-red-500/20' :
                                inc.severity === 'high' ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/20' :
                                'bg-slate-100 dark:bg-slate-700/30 text-slate-500 border border-slate-700/40'
                              }`}>
                                {inc.severity === 'critical' || inc.severity === 'high' ? 'Action Required' : 'Review'}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-1.5 flex-shrink-0">
                            <span className={`text-[10px] px-1.5 py-0.5 rounded ${colors.badge}`}>{inc.status}</span>
                            {isExpanded ? <ChevronUp className="w-3 h-3 text-slate-500" /> : <ChevronDown className="w-3 h-3 text-slate-500" />}
                          </div>
                        </div>
                        <p className="text-[11px] text-slate-500">{inc.time} · {inc.reportingOfficer}</p>
                      </div>
                    </button>
                    {isExpanded && (
                      <div className="px-5 pb-3 pl-12 space-y-2">
                        {/* Description */}
                        <p className="text-[11px] text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-900/30 rounded-lg p-3 border border-slate-700/40">
                          {inc.description}
                        </p>

                        {/* Escalation likelihood + recommended action — open incidents only */}
                        {inc.status !== 'Resolved' && (() => {
                          const escalation =
                            inc.type === 'Fight'
                              ? { level: 'High', text: 'Typically escalates to use-of-force within 30 min without supervisor on-scene', action: `Assign supervisor to ${inc.pod} — ${inc.reportingOfficer} needs immediate support` }
                              : inc.type === 'Contraband'
                              ? { level: 'Medium', text: 'Contained, but risk spreads if sweep not completed before next dayroom', action: 'Lock E2 for sweep — complete before 16:00 dayroom window' }
                              : { level: 'Low', text: 'Unlikely to escalate if documented and closed this shift', action: 'Supervisor sign-off required — close before 22:00' };
                          return (
                            <div className="flex items-stretch gap-2">
                              <div className="flex-1 bg-white dark:bg-slate-900/50 border border-slate-700/40 rounded-lg px-3 py-2">
                                <div className="flex items-center gap-1.5 mb-1">
                                  <p className="text-[9px] text-slate-500 uppercase tracking-wider font-semibold">Escalation Likelihood</p>
                                  <span className={`text-[8px] px-1.5 py-0.5 rounded font-bold uppercase ${
                                    escalation.level === 'High'   ? 'bg-red-500/15 text-red-600 dark:text-red-400 border border-red-500/20' :
                                    escalation.level === 'Medium' ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/20' :
                                                                    'bg-slate-100 dark:bg-slate-700/30 text-slate-700 dark:text-slate-400 border border-slate-200 dark:border-slate-700/40'
                                  }`}>{escalation.level}</span>
                                </div>
                                <p className="text-[11px] text-slate-700 dark:text-slate-300 leading-snug">{escalation.text}</p>
                              </div>
                              <div className="flex-1 bg-white dark:bg-slate-900/50 border border-slate-700/40 rounded-lg px-3 py-2">
                                <p className="text-[9px] text-slate-500 uppercase tracking-wider font-semibold mb-1">Recommended Action</p>
                                <p className="text-[11px] text-slate-700 dark:text-slate-200 leading-snug">{escalation.action}</p>
                              </div>
                            </div>
                          );
                        })()}

                        {/* Operational Impact — only for open incidents */}
                        {inc.status !== 'Resolved' && (
                          <div className="bg-white dark:bg-slate-900/50 border border-slate-700/40 rounded-lg px-3 py-2.5">
                            <p className="text-[9px] text-slate-500 uppercase tracking-wider font-semibold mb-1.5">Operational Impact — if no action taken</p>
                            <ul className="space-y-0.5">
                              {inc.type === 'Fight' && (
                                <>
                                  <li className="flex items-start gap-2 text-[11px] text-slate-700 dark:text-slate-300"><span className="text-slate-700 mt-0.5 flex-shrink-0">—</span>Risk of escalation to use-of-force without supervisory intervention</li>
                                  <li className="flex items-start gap-2 text-[11px] text-slate-700 dark:text-slate-300"><span className="text-slate-700 mt-0.5 flex-shrink-0">—</span>Injured inmate may require outside medical transport — pod movement halt</li>
                                </>
                              )}
                              {inc.type === 'Contraband' && (
                                <>
                                  <li className="flex items-start gap-2 text-[11px] text-slate-700 dark:text-slate-300"><span className="text-slate-700 mt-0.5 flex-shrink-0">—</span>Contraband in circulation elevates safety risk facility-wide</li>
                                  <li className="flex items-start gap-2 text-[11px] text-slate-700 dark:text-slate-300"><span className="text-slate-700 mt-0.5 flex-shrink-0">—</span>SOP requires intel report within 24 hours — documentation overdue</li>
                                </>
                              )}
                              {(inc.type !== 'Fight' && inc.type !== 'Contraband') && (
                                <li className="flex items-start gap-2 text-[11px] text-slate-700 dark:text-slate-300"><span className="text-slate-700 mt-0.5 flex-shrink-0">—</span>Unresolved incident may require ACA documentation — supervisor sign-off needed</li>
                              )}
                            </ul>
                          </div>
                        )}

                        {/* Actions */}
                        <div className="flex flex-wrap gap-1.5">
                          {inc.status !== 'Resolved' && inc.severity === 'critical' && (
                            <button className="text-[10px] px-2.5 py-1.5 bg-red-500/15 border border-red-500/25 text-red-600 dark:text-red-400 hover:bg-red-500/25 rounded-lg transition-colors font-medium">
                              Escalate to Command
                            </button>
                          )}
                          {inc.status !== 'Resolved' && (
                            <>
                              <button className="text-[10px] px-2.5 py-1.5 bg-slate-50 dark:bg-slate-700/40 border border-slate-600/50 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:text-white rounded-lg transition-colors">
                                Assign Supervisor
                              </button>
                              <button className="text-[10px] px-2.5 py-1.5 bg-slate-50 dark:bg-slate-700/40 border border-slate-600/50 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:text-white rounded-lg transition-colors">
                                Lock Unit
                              </button>
                              <button className="text-[10px] px-2.5 py-1.5 bg-slate-50 dark:bg-slate-700/40 border border-slate-600/50 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:text-white rounded-lg transition-colors">
                                Mark Resolved
                              </button>
                            </>
                          )}
                          <button className="text-[10px] px-2.5 py-1.5 bg-slate-100 dark:bg-slate-700/30 border border-slate-700/40 text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:text-white rounded-lg transition-colors">
                            View Report
                          </button>
                        </div>

                        {inc.severity !== 'low' && inc.status !== 'Resolved' && (
                          <p className="text-[10px] text-slate-700 flex items-center gap-1">
                            <ArrowRight className="w-3 h-3" /> {inc.severity === 'critical' ? 'Impacts Command Risk Level' : 'Reported to Command Center'}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Section 4: Officer Assignment Board ──────────── */}
        <div className="bg-white dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700/50 rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-200 dark:border-slate-700/40">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-slate-700 dark:text-slate-400" />
              <span className="text-[13px] font-semibold text-slate-900 dark:text-white">Officer Assignment Board</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full ${staffPct < 93 ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/20' : 'bg-slate-50 dark:bg-slate-700/40 text-slate-500'}`}>
                {currentShift.present}/{currentShift.scheduled} on shift
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-1.5 text-[11px] text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-700/40 border border-slate-600/50 rounded-lg px-3 py-1.5 hover:bg-slate-700/60 transition-colors">
                <PhoneCall className="w-3.5 h-3.5" /> Call Backup
              </button>
              <button className="flex items-center gap-1.5 text-[11px] text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-700/40 border border-slate-600/50 rounded-lg px-3 py-1.5 hover:bg-slate-700/60 transition-colors">
                <Plus className="w-3.5 h-3.5" /> Approve OT
              </button>
              <button className="flex items-center gap-1.5 text-[11px] text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-700/40 border border-slate-600/50 rounded-lg px-3 py-1.5 hover:bg-slate-700/60 transition-colors">
                <ArrowLeftRight className="w-3.5 h-3.5" /> Bulk Reassign
              </button>
            </div>
          </div>

          {/* Table header */}
          <div className="grid grid-cols-12 px-5 py-2 border-b border-slate-200 dark:border-slate-700/10 text-[10px] text-slate-500 uppercase tracking-wide">
            <span className="col-span-3">Officer</span>
            <span className="col-span-3">Assignment</span>
            <span className="col-span-2">Risk Signals</span>
            <span className="col-span-1 text-center">Hours</span>
            <span className="col-span-3 text-right">Status · Actions</span>
          </div>

          <div className="divide-y divide-slate-700/10">
            {officers.map(officer => {
              const isHighHours   = officer.hoursWorked >= 8;
              const isFatigueRisk = officer.hoursWorked >= 6;
              const isOffPost     = officer.status !== 'On Post';
              // Priority post: officer assigned to a pod that is over/near capacity or has incidents
              const assignedPod   = pods.find(p => p.assignedOfficer === officer.name || p.assignedOfficer === `Dep. ${officer.name.split(', ')[0]}`);
              const isPriorityPost = assignedPod && (assignedPod.status !== 'Normal' || assignedPod.incidents > 0);
              // Coverage gap: officer is off-post and pod has no backup
              const hasCoverageGap = isOffPost && assignedPod && assignedPod.incidents > 0;
              return (
                <div key={officer.badge} className={`grid grid-cols-12 items-center px-5 py-2.5 hover:bg-slate-700/10 transition-colors ${isHighHours ? 'bg-amber-500/[0.03]' : ''}`}>
                  <div className="col-span-3">
                    <p className="text-[12px] font-medium text-slate-700 dark:text-slate-200">{officer.name}</p>
                    <p className="text-[10px] text-slate-500">#{officer.badge} · {officer.rank}</p>
                  </div>
                  <div className="col-span-3">
                    <p className="text-[12px] text-slate-700 dark:text-slate-300">{officer.assignment}</p>
                    {isOffPost && <p className="text-[9px] text-amber-600 dark:text-amber-400 mt-0.5">Away from post</p>}
                  </div>
                  {/* Risk Signals */}
                  <div className="col-span-2">
                    <div className="flex flex-wrap gap-1">
                      {isHighHours && (
                        <span className="text-[9px] px-1.5 py-0.5 bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/20 rounded font-semibold uppercase tracking-wide" title="Officer at or over 8 hours — fatigue risk">
                          Fatigue
                        </span>
                      )}
                      {!isHighHours && isFatigueRisk && (
                        <span className="text-[9px] px-1.5 py-0.5 bg-slate-100 dark:bg-slate-700/30 text-slate-700 dark:text-slate-400 border border-slate-700/40 rounded font-semibold uppercase tracking-wide" title="Approaching 8-hour threshold">
                          6h+
                        </span>
                      )}
                      {isPriorityPost && (
                        <span className="text-[9px] px-1.5 py-0.5 bg-slate-100 dark:bg-slate-700/30 text-amber-500/80 border border-amber-500/20 rounded font-semibold uppercase tracking-wide" title="Assigned to high-priority housing unit">
                          Priority
                        </span>
                      )}
                      {hasCoverageGap && (
                        <span className="text-[9px] px-1.5 py-0.5 bg-red-500/15 text-red-600 dark:text-red-400 border border-red-500/20 rounded font-semibold uppercase tracking-wide" title="Off post with open incident in assigned unit">
                          Gap
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="col-span-1 text-center">
                    <span className={`text-[12px] font-semibold ${isHighHours ? 'text-amber-600 dark:text-amber-400' : 'text-slate-500'}`}>
                      {officer.hoursWorked}h
                    </span>
                    {isHighHours && <p className="text-[8px] text-amber-600 dark:text-amber-400/70 leading-none">OT</p>}
                  </div>
                  <div className="col-span-3 flex items-center justify-end gap-1.5">
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full flex-shrink-0 ${getOfficerStatusColors(officer.status)}`}>
                      {officer.status}
                    </span>
                    <button className="text-[10px] px-2 py-1 bg-slate-50 dark:bg-slate-700/40 border border-slate-600/50 text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:text-white rounded transition-colors flex-shrink-0">
                      Reassign
                    </button>
                  </div>
                </div>
              );
            })}

            {/* Missing officer row */}
            <div className="grid grid-cols-12 items-center px-5 py-2.5 bg-red-500/5 border-l-2 border-l-red-500/50">
              <div className="col-span-3">
                <div className="flex items-center gap-1.5">
                  <UserX className="w-3 h-3 text-red-600 dark:text-red-400" />
                  <p className="text-[12px] font-medium text-red-600 dark:text-red-400">Smith, Officer</p>
                </div>
                <p className="text-[10px] text-slate-500">#2176 · Deputy</p>
              </div>
              <div className="col-span-3">
                <p className="text-[11px] text-amber-600 dark:text-amber-400">Post uncovered</p>
                <p className="text-[10px] text-slate-700">Float or OT required</p>
              </div>
              <div className="col-span-1 text-center">
                <span className="text-[10px] text-slate-500">Pod</span>
              </div>
              <div className="col-span-1 text-center">
                <span className="text-[10px] text-slate-700">—</span>
              </div>
              <div className="col-span-1 text-center">
                <span className="text-[10px] text-slate-700">—</span>
              </div>
              <div className="col-span-3 flex items-center justify-end gap-1.5">
                <span className="text-[10px] px-1.5 py-0.5 bg-red-500/15 text-red-600 dark:text-red-400 border border-red-500/20 rounded-full flex-shrink-0">Sick Call</span>
                <button className="text-[10px] px-2 py-1 bg-slate-50 dark:bg-slate-700/40 border border-slate-600/50 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:text-white rounded transition-colors flex-shrink-0">
                  Approve OT
                </button>
                <button className="text-[10px] px-2 py-1 bg-slate-50 dark:bg-slate-700/40 border border-slate-600/50 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:text-white rounded transition-colors flex-shrink-0">
                  Call Backup
                </button>
              </div>
            </div>
          </div>

          <div className="px-5 py-3 border-t border-slate-200 dark:border-slate-200 dark:border-slate-700/30 flex items-center justify-between">
            <p className="text-[10px] text-slate-700">
              Officers at 8h+ highlighted · ACA minimum: 1 officer per 64 inmates
            </p>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 text-[10px]">
                <CheckCircle className="w-3 h-3 text-emerald-500" />
                <span className="text-slate-500">ACA minimum {currentShift.present >= 13 ? 'met' : 'NOT MET'}</span>
              </div>
              <span className="text-[10px] text-slate-700 flex items-center gap-1">
                <ArrowRight className="w-3 h-3" /> Staffing status reported to Command
              </span>
            </div>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}

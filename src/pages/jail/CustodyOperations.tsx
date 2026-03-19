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
  { id: 'A1',  name: 'A-Pod',   type: 'Male GP',       security: 'Med', capacity: 96,  current: 94,  assignedOfficer: 'Dep. Harris',   status: 'Near Capacity', activeMovements: 1, incidents: 0 },
  { id: 'A2',  name: 'A2-Pod',  type: 'Male GP',       security: 'Med', capacity: 96,  current: 89,  assignedOfficer: 'Dep. White',    status: 'Normal',        activeMovements: 0, incidents: 1 },
  { id: 'B1',  name: 'B-Pod',   type: 'Male Max',      security: 'Max', capacity: 64,  current: 61,  assignedOfficer: 'Dep. King',     status: 'Normal',        activeMovements: 0, incidents: 0 },
  { id: 'B2',  name: 'B2-Pod',  type: 'Disciplinary',  security: 'Max', capacity: 32,  current: 28,  assignedOfficer: 'Dep. Scott',    status: 'Normal',        activeMovements: 0, incidents: 1 },
  { id: 'C1',  name: 'C-Pod',   type: 'Male Medium',   security: 'Med', capacity: 128, current: 115, assignedOfficer: 'Dep. Rivera',   status: 'Normal',        activeMovements: 2, incidents: 0 },
  { id: 'C2',  name: 'C2-Pod',  type: 'Work Release',  security: 'Min', capacity: 48,  current: 42,  assignedOfficer: null,            status: 'Normal',        activeMovements: 1, incidents: 0, notes: 'Float coverage' },
  { id: 'D1',  name: 'D-Pod',   type: 'Female GP',     security: 'Med', capacity: 80,  current: 73,  assignedOfficer: 'Dep. Carter',   status: 'Normal',        activeMovements: 0, incidents: 0 },
  { id: 'D2',  name: 'D2-Pod',  type: 'Female Max',    security: 'Max', capacity: 32,  current: 29,  assignedOfficer: 'Dep. Lewis',    status: 'Normal',        activeMovements: 0, incidents: 0 },
  { id: 'E1',  name: 'E-Pod',   type: 'Medical',       security: 'Med', capacity: 48,  current: 44,  assignedOfficer: 'Dep. Martinez', status: 'Near Capacity', activeMovements: 1, incidents: 0, notes: '3 isolation active' },
  { id: 'E2',  name: 'E2-Pod',  type: 'Mental Health', security: 'Med', capacity: 40,  current: 38,  assignedOfficer: 'Dep. Johnson',  status: 'Near Capacity', activeMovements: 0, incidents: 1, notes: '24/7 monitoring' },
  { id: 'F1',  name: 'F-Pod',   type: 'Intake',        security: 'Hi',  capacity: 64,  current: 52,  assignedOfficer: 'Dep. Allen',    status: 'Normal',        activeMovements: 3, incidents: 0, notes: '12 pending class.' },
  { id: 'F2',  name: 'F2-Pod',  type: 'Prot. Custody', security: 'Hi', capacity: 48,  current: 41,  assignedOfficer: 'Dep. Young',    status: 'Normal',        activeMovements: 0, incidents: 0 },
  { id: 'G1',  name: 'G-Pod',   type: 'Juvenile',      security: 'Med', capacity: 24,  current: 18,  assignedOfficer: 'Dep. Hill',     status: 'Normal',        activeMovements: 0, incidents: 0 },
  { id: 'G2',  name: 'G2-Pod',  type: 'Pre-Release',   security: 'Min', capacity: 40,  current: 35,  assignedOfficer: null,            status: 'Normal',        activeMovements: 1, incidents: 0, notes: 'Float coverage' },
  { id: 'H1',  name: 'H-Pod',   type: 'Federal Hold',  security: 'Hi',  capacity: 48,  current: 47,  assignedOfficer: 'Dep. Clark',    status: 'Near Capacity', activeMovements: 0, incidents: 0 },
  { id: 'H2',  name: 'H2-Pod',  type: 'ICE Hold',      security: 'Med', capacity: 32,  current: 36,  assignedOfficer: 'Dep. Robinson', status: 'Over Capacity', activeMovements: 0, incidents: 0, notes: 'Emergency beds in use' },
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
    pct: 'text-red-400',
    bar: 'bg-red-500',
    badge: 'bg-red-500/15 text-red-400 border border-red-500/20',
  };
  if (pod.status === 'Near Capacity') return {
    card: 'bg-amber-500/8 border-amber-500/30',
    pct: 'text-amber-400',
    bar: 'bg-amber-500',
    badge: 'bg-amber-500/15 text-amber-400 border border-amber-500/20',
  };
  return {
    card: 'bg-slate-800/35 border-slate-700/25',
    pct: 'text-slate-400',
    bar: 'bg-slate-600/50',
    badge: 'bg-slate-700/30 text-slate-400 border border-slate-700/40',
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
  if (status === 'In Progress') return 'bg-amber-500/15 text-amber-400 border border-amber-500/20';
  if (status === 'Staging')     return 'bg-amber-500/15 text-amber-400 border border-amber-500/20';
  if (status === 'Pending')     return 'bg-slate-700/30 text-slate-400 border border-slate-700/40';
  return 'bg-slate-700/30 text-slate-400 border border-slate-700/40';
};

const getIncidentColors = (severity: Incident['severity'], status: Incident['status']) => {
  const resolved = status === 'Resolved';
  if (resolved) return { row: 'opacity-60', badge: 'bg-slate-500/15 text-slate-400 border border-slate-500/20', sev: '' };
  if (severity === 'critical') return { row: '', badge: 'bg-red-500/15 text-red-400 border border-red-500/20',    sev: 'text-red-400' };
  if (severity === 'high')     return { row: '', badge: 'bg-amber-500/15 text-amber-400 border border-amber-500/20', sev: 'text-amber-400' };
  return { row: '', badge: 'bg-slate-700/30 text-slate-400 border border-slate-700/40', sev: 'text-slate-400' };
};

const getIncidentIcon = (type: Incident['type']) => {
  switch (type) {
    case 'Fight':             return AlertOctagon;
    case 'Medical Emergency': return Heart;
    case 'Contraband':        return AlertTriangle;
    default:                  return AlertTriangle;
  }
};

const getOfficerStatusColors = (status: Officer['status']) => {
  if (status === 'On Post')        return 'bg-slate-700/30 text-slate-400 border border-slate-700/40';
  if (status === 'Medical Escort') return 'bg-amber-500/15 text-amber-400 border border-amber-500/20';
  if (status === 'OT Pending')     return 'bg-amber-500/15 text-amber-400 border border-amber-500/20';
  if (status === 'Transport')      return 'bg-slate-700/30 text-slate-400 border border-slate-700/40';
  return 'bg-slate-700/30 text-slate-400 border border-slate-700/40';
};

// ── Component ──────────────────────────────────────────────────

export default function CustodyOperations() {
  const navigate = useNavigate();
  const [expandedPod, setExpandedPod] = useState<string | null>(null);
  const [expandedIncident, setExpandedIncident] = useState<number | null>(null);

  const staffPct = Math.round((currentShift.present / currentShift.scheduled) * 100);
  const unassignedPods = pods.filter(p => !p.assignedOfficer).length;
  const openIncidents = incidents.filter(i => i.status !== 'Resolved').length;
  const activeMovementCount = movements.filter(m => m.status === 'In Progress' || m.status === 'Staging').length;

  // Derive critical issues for top panel
  const criticalIssues = [
    ...pods.filter(p => p.status === 'Over Capacity').map(p => ({
      id: `pod-${p.id}`, severity: 'critical' as const,
      label: `${p.name} — Over Capacity`,
      detail: `${p.current}/${p.capacity} beds (${Math.round((p.current / p.capacity) * 100)}%) · ${p.type}`,
      actions: ['Redistribute Inmates', 'Contact USMS'],
    })),
    ...incidents.filter(i => i.status !== 'Resolved' && (i.severity === 'critical' || i.severity === 'high')).map(i => ({
      id: `inc-${i.id}`, severity: i.severity,
      label: `${i.type} — ${i.pod}`,
      detail: `${i.time} · ${i.reportingOfficer} · ${i.status}`,
      actions: i.severity === 'critical' ? ['Escalate to Command', 'Lock Unit'] : ['Assign Supervisor', 'Escalate'],
    })),
    ...(staffPct < 93 ? [{
      id: 'staff-short', severity: 'high' as const,
      label: 'Shift Understaffed',
      detail: `${currentShift.present}/${currentShift.scheduled} present · ${currentShift.note}`,
      actions: ['Approve OT', 'Call Backup'],
    }] : []),
  ];

  return (
    <DashboardLayout>
      <div className="p-6 space-y-5">

        {/* ── Page Header ─────────────────────────────────── */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-white mb-1">Custody Operations</h1>
            <p className="text-[11px] text-slate-500">
              Watch commander control panel · {currentShift.label} · {currentShift.window} · Commander: <span className="text-slate-400">{currentShift.commander}</span>
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 text-[11px] text-slate-500 bg-slate-800/30 border border-slate-700/50 rounded-lg px-3 py-1.5">
              <Circle className="w-1.5 h-1.5 fill-emerald-500 text-emerald-500" />
              Live
            </div>
            <button
              onClick={() => navigate('/jail/command')}
              className="flex items-center gap-2 px-3 py-1.5 bg-slate-800/30 border border-slate-700/50 rounded-lg text-[12px] text-slate-400 hover:text-white hover:bg-slate-700/30 transition-all"
            >
              Command Center <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* ── Critical Operational Issues ──────────────────── */}
        {criticalIssues.length > 0 && (
          <div className="border border-red-500/30 bg-red-500/5 rounded-xl overflow-hidden">
            <div className="flex items-center justify-between px-5 py-3 border-b border-red-500/20">
              <div className="flex items-center gap-2">
                <AlertOctagon className="w-4 h-4 text-red-400" />
                <span className="text-[13px] font-bold text-red-400 uppercase tracking-wide">
                  Critical Operational Issues
                </span>
                <span className="text-[10px] px-2 py-0.5 bg-red-500/15 text-red-400 border border-red-500/20 rounded-full">
                  {criticalIssues.length} requiring action
                </span>
              </div>
              <span className="text-[10px] text-slate-500 flex items-center gap-1">
                <ArrowRight className="w-3 h-3" /> Reported to Command Center
              </span>
            </div>
            <div className="divide-y divide-red-500/10">
              {criticalIssues.map(issue => (
                <div key={issue.id} className="flex items-center gap-4 px-5 py-3">
                  <div className={`w-1.5 self-stretch rounded-full flex-shrink-0 ${issue.severity === 'critical' ? 'bg-red-500' : 'bg-amber-500'}`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className={`text-[11px] px-1.5 py-0.5 rounded font-semibold uppercase tracking-wide ${
                        issue.severity === 'critical'
                          ? 'bg-red-500/15 text-red-400 border border-red-500/20'
                          : 'bg-amber-500/15 text-amber-400 border border-amber-500/20'
                      }`}>Action Required</span>
                      <p className="text-[13px] font-semibold text-white">{issue.label}</p>
                    </div>
                    <p className="text-[11px] text-slate-400">{issue.detail}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {issue.actions.map(action => (
                      <button
                        key={action}
                        className={`text-[11px] px-3 py-1.5 rounded-lg font-medium transition-colors ${
                          action.toLowerCase().includes('escalate') || action.toLowerCase().includes('lock') || action.toLowerCase().includes('backup')
                            ? 'bg-red-500/15 border border-red-500/25 text-red-400 hover:bg-red-500/25'
                            : 'bg-slate-700/50 border border-slate-600/50 text-slate-300 hover:bg-slate-700/70'
                        }`}
                      >
                        {action}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Section 1: Shift Operations Overview ─────────── */}
        <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-5">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-5">

            {/* Shift identity */}
            <div className="flex items-center gap-4 flex-shrink-0">
              <div className="w-12 h-12 bg-slate-700/30 border border-slate-700/40 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-slate-400" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-[18px] font-bold text-white">{currentShift.label}</span>
                  <span className="text-[11px] px-2 py-0.5 bg-slate-700/30 text-slate-400 border border-slate-700/40 rounded-full">Active</span>
                </div>
                <p className="text-[12px] text-slate-400">{currentShift.window} &nbsp;·&nbsp; Commander: <span className="text-white font-medium">{currentShift.commander}</span> #{currentShift.badge}</p>
              </div>
            </div>

            <div className="w-px h-10 bg-slate-700/40 hidden lg:block flex-shrink-0" />

            {/* Staffing */}
            <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <p className="text-[10px] text-slate-500 uppercase tracking-wide mb-1">Staffing</p>
                <p className="text-[20px] font-bold text-white leading-none">
                  {currentShift.present}<span className="text-[13px] text-slate-500">/{currentShift.scheduled}</span>
                </p>
                <div className="flex items-center gap-1.5 mt-1.5">
                  <div className="flex-1 h-1 bg-slate-700/50 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${staffPct < 93 ? 'bg-red-500' : staffPct < 100 ? 'bg-amber-400' : 'bg-slate-500'}`} style={{ width: `${staffPct}%` }} />
                  </div>
                  <span className={`text-[10px] ${staffPct < 93 ? 'text-red-400' : staffPct < 100 ? 'text-amber-400' : 'text-slate-400'}`}>{staffPct}%</span>
                </div>
                {currentShift.note && <p className="text-[10px] text-amber-400 mt-1">⚠ {currentShift.note.split('—')[0].trim()}</p>}
              </div>

              <div>
                <p className="text-[10px] text-slate-500 uppercase tracking-wide mb-1">Active Movements</p>
                <p className="text-[20px] font-bold text-white leading-none">{activeMovementCount}</p>
                <p className="text-[10px] text-slate-500 mt-1">{movements.filter(m => m.status === 'Pending').length} pending</p>
              </div>

              <div>
                <p className="text-[10px] text-slate-500 uppercase tracking-wide mb-1">Open Incidents</p>
                <p className={`text-[20px] font-bold leading-none ${openIncidents > 0 ? 'text-amber-400' : 'text-white'}`}>{openIncidents}</p>
                <p className="text-[10px] text-slate-500 mt-1">this shift</p>
              </div>

              <div>
                <p className="text-[10px] text-slate-500 uppercase tracking-wide mb-1">Unassigned Pods</p>
                <p className={`text-[20px] font-bold leading-none ${unassignedPods > 0 ? 'text-amber-400' : 'text-white'}`}>{unassignedPods}</p>
                <p className="text-[10px] text-slate-500 mt-1">float coverage</p>
              </div>
            </div>

            {/* Pending actions badge */}
            {currentShift.pendingActions > 0 && (
              <div className="flex-shrink-0">
                <div className="flex items-center gap-2 px-3 py-2 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-[12px] text-amber-300 font-medium">{currentShift.pendingActions} pending actions</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── Section 2: Housing Unit Management ──────────── */}
        <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-700/40">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-slate-400" />
              <span className="text-[13px] font-semibold text-white">Housing Unit Management</span>
              <span className="text-[10px] px-2 py-0.5 bg-slate-700/40 text-slate-400 rounded-full">
                {pods.filter(p => p.status === 'Over Capacity').length} over · {pods.filter(p => p.status === 'Near Capacity').length} near · {pods.filter(p => p.status === 'Normal').length} stable
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-3 text-[10px] text-slate-500 mr-2">
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-slate-500 inline-block" />Stable</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />Near</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500 inline-block" />Over</span>
              </div>
              <button className="flex items-center gap-1.5 text-[11px] text-slate-300 bg-slate-700/40 border border-slate-600/50 rounded-lg px-3 py-1.5 hover:bg-slate-700/60 transition-colors">
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
                    className={`w-full rounded-xl border p-2.5 text-left transition-all hover:ring-1 hover:ring-slate-500/40 ${colors.card} ${isExpanded ? 'ring-1 ring-slate-400/30' : ''}`}
                  >
                    <div className="flex items-start justify-between mb-1.5">
                      <span className="text-[11px] font-bold text-white">{pod.id}</span>
                      <div className="flex gap-0.5">
                        {pod.incidents > 0 && <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-0.5" title="Active incident" />}
                        {pod.activeMovements > 0 && <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-0.5" title="Active movement" />}
                      </div>
                    </div>
                    <p className={`text-[13px] font-bold ${colors.pct}`}>{pct}%</p>
                    <p className="text-[9px] text-slate-500 mt-0.5">{pod.current}/{pod.capacity}</p>
                    <div className="w-full h-0.5 bg-slate-700/50 rounded-full mt-1.5 overflow-hidden">
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
              <div className="mx-4 mb-4 bg-slate-900/40 border border-slate-700/50 rounded-xl p-4">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-[14px] font-bold text-white">{pod.name} — {pod.type}</h3>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full ${colors.badge}`}>{pod.status}</span>
                      <span className="text-[10px] text-slate-500">{pod.security} security</span>
                    </div>
                    <p className="text-[11px] text-slate-400">
                      {pod.current} / {pod.capacity} beds occupied ({pct}%)
                      {pod.notes && <span className="ml-2 text-amber-400">· {pod.notes}</span>}
                    </p>
                  </div>
                  <button onClick={() => setExpandedPod(null)} className="text-slate-500 hover:text-slate-300 text-[11px] flex-shrink-0">Close</button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* Officer assignment */}
                  <div className={`border rounded-lg p-3 ${!pod.assignedOfficer ? 'bg-amber-500/5 border-amber-500/25' : 'bg-slate-800/30 border-slate-700/40'}`}>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-[10px] text-slate-500 uppercase tracking-wide">Assigned Officer</p>
                      {!pod.assignedOfficer && <span className="text-[9px] px-1.5 py-0.5 bg-amber-500/15 text-amber-400 border border-amber-500/20 rounded font-semibold uppercase">At Risk</span>}
                    </div>
                    {pod.assignedOfficer ? (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <UserCheck className="w-3.5 h-3.5 text-slate-400" />
                          <span className="text-[12px] font-medium text-white">{pod.assignedOfficer}</span>
                        </div>
                        <button className="text-[10px] px-2 py-1 bg-slate-700/40 border border-slate-600/50 text-slate-300 hover:text-white rounded-lg transition-colors">
                          Reassign Officer
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between">
                        <span className="text-[12px] text-amber-400">Float coverage only</span>
                        <button className="flex items-center gap-1 text-[10px] px-2 py-1 bg-slate-700/40 border border-slate-600/50 text-slate-300 hover:text-white rounded-lg transition-colors">
                          <Plus className="w-3 h-3" /> Assign Now
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Active movements for this pod */}
                  <div className="bg-slate-800/30 border border-slate-700/40 rounded-lg p-3">
                    <p className="text-[10px] text-slate-500 uppercase tracking-wide mb-2">Pod Movements ({pod.activeMovements})</p>
                    {pod.activeMovements === 0 ? (
                      <p className="text-[11px] text-slate-600">No active movements</p>
                    ) : (
                      movements.filter(m => m.from === pod.name || m.to === pod.name).slice(0, 2).map(m => (
                        <p key={m.id} className="text-[11px] text-slate-300 mb-1">{m.type} — {m.inmateName} <span className="text-slate-500">{m.status}</span></p>
                      ))
                    )}
                  </div>

                  {/* Actions */}
                  <div className="bg-slate-800/30 border border-slate-700/40 rounded-lg p-3">
                    <p className="text-[10px] text-slate-500 uppercase tracking-wide mb-2">Actions</p>
                    <div className="space-y-1.5">
                      <button className="w-full flex items-center gap-2 text-[11px] text-slate-300 hover:text-white px-2.5 py-1.5 bg-slate-700/30 border border-slate-700/40 rounded-lg transition-colors">
                        <ArrowLeftRight className="w-3 h-3" /> Redistribute Inmates
                      </button>
                      <button className="w-full flex items-center gap-2 text-[11px] text-slate-300 hover:text-white px-2.5 py-1.5 bg-slate-700/30 border border-slate-700/40 rounded-lg transition-colors">
                        <Lock className="w-3 h-3" /> Lock Unit
                      </button>
                      <button className="w-full flex items-center gap-2 text-[11px] text-slate-300 hover:text-white px-2.5 py-1.5 bg-slate-700/30 border border-slate-700/40 rounded-lg transition-colors">
                        <AlertTriangle className="w-3 h-3" /> Log Incident
                      </button>
                    </div>
                  </div>
                </div>

                {/* Command uplink */}
                <div className="mt-3 pt-3 border-t border-slate-700/30 flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-slate-600" />
                  <span className="text-[10px] text-slate-600">
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
          <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl overflow-hidden">
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-700/40">
              <div className="flex items-center gap-2">
                <ArrowLeftRight className="w-4 h-4 text-slate-400" />
                <span className="text-[13px] font-semibold text-white">Inmate Movement Control</span>
                <span className="text-[10px] px-2 py-0.5 bg-slate-700/30 text-slate-400 border border-slate-700/40 rounded-full">
                  {activeMovementCount} active
                </span>
              </div>
              <button
                onClick={() => navigate('/jail/inmates')}
                className="flex items-center gap-1 text-[11px] text-slate-500 hover:text-slate-300 transition-colors"
              >
                All Movements <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="divide-y divide-slate-700/10">
              {movements.map(mov => {
                const Icon = getMovementIcon(mov.type);
                const isActive = mov.status === 'In Progress' || mov.status === 'Staging';
                return (
                  <div key={mov.id} className="flex items-start gap-3 px-5 py-3 hover:bg-slate-700/10 transition-colors">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 bg-slate-700/30">
                      <Icon className="w-3.5 h-3.5 text-slate-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-0.5">
                        <p className="text-[12px] font-medium text-slate-200">{mov.inmateName} <span className="text-slate-500 font-normal">{mov.inmateId}</span></p>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded flex-shrink-0 ${getMovementColors(mov.status)}`}>{mov.status}</span>
                      </div>
                      <p className="text-[11px] text-slate-400">{mov.type} · {mov.from} → {mov.to}</p>
                      <p className="text-[10px] text-slate-500 mt-0.5">{mov.escort} · Started {mov.startTime} · ETA {mov.eta}</p>
                    </div>
                    {isActive && (
                      <div className="flex flex-col gap-1 flex-shrink-0">
                        <button className="text-[10px] px-2 py-1 bg-slate-700/40 border border-slate-600/50 text-slate-300 hover:text-white rounded transition-colors whitespace-nowrap">
                          Delay
                        </button>
                        <button className="text-[10px] px-2 py-1 bg-slate-700/40 border border-slate-600/50 text-slate-300 hover:text-white rounded transition-colors whitespace-nowrap">
                          Re-route
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="px-5 py-2.5 border-t border-slate-700/30">
              <p className="text-[10px] text-slate-600 flex items-center gap-1">
                <ArrowRight className="w-3 h-3" /> Active movements tracked in Command Center transport log
              </p>
            </div>
          </div>

          {/* Incident & Discipline Tracking */}
          <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl overflow-hidden">
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-700/40">
              <div className="flex items-center gap-2">
                <AlertOctagon className="w-4 h-4 text-slate-400" />
                <span className="text-[13px] font-semibold text-white">Incident & Discipline</span>
                {openIncidents > 0 && (
                  <span className="text-[10px] px-2 py-0.5 bg-amber-500/15 text-amber-400 border border-amber-500/20 rounded-full">
                    {openIncidents} open
                  </span>
                )}
              </div>
              <button
                onClick={() => navigate('/jail/incidents')}
                className="flex items-center gap-1 text-[11px] text-slate-500 hover:text-slate-300 transition-colors"
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
                            <p className="text-[12px] font-medium text-slate-200">{inc.type}</p>
                            <span className="text-[10px] text-slate-500">{inc.pod}</span>
                            {inc.status !== 'Resolved' && (
                              <span className={`text-[9px] px-1.5 py-0.5 rounded font-semibold uppercase tracking-wide ${
                                inc.severity === 'critical' ? 'bg-red-500/15 text-red-400 border border-red-500/20' :
                                inc.severity === 'high' ? 'bg-amber-500/15 text-amber-400 border border-amber-500/20' :
                                'bg-slate-700/30 text-slate-500 border border-slate-700/40'
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
                      <div className="px-5 pb-3 pl-12">
                        <p className="text-[11px] text-slate-300 leading-relaxed bg-slate-900/30 rounded-lg p-3 border border-slate-700/40 mb-2">
                          {inc.description}
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {inc.status !== 'Resolved' && inc.severity === 'critical' && (
                            <button className="text-[10px] px-2.5 py-1.5 bg-red-500/15 border border-red-500/25 text-red-400 hover:bg-red-500/25 rounded-lg transition-colors font-medium">
                              Escalate to Command
                            </button>
                          )}
                          {inc.status !== 'Resolved' && (
                            <>
                              <button className="text-[10px] px-2.5 py-1.5 bg-slate-700/40 border border-slate-600/50 text-slate-300 hover:text-white rounded-lg transition-colors">
                                Assign Supervisor
                              </button>
                              <button className="text-[10px] px-2.5 py-1.5 bg-slate-700/40 border border-slate-600/50 text-slate-300 hover:text-white rounded-lg transition-colors">
                                Lock Unit
                              </button>
                              <button className="text-[10px] px-2.5 py-1.5 bg-slate-700/40 border border-slate-600/50 text-slate-300 hover:text-white rounded-lg transition-colors">
                                Mark Resolved
                              </button>
                            </>
                          )}
                          <button className="text-[10px] px-2.5 py-1.5 bg-slate-700/30 border border-slate-700/40 text-slate-400 hover:text-white rounded-lg transition-colors">
                            View Report
                          </button>
                        </div>
                        {inc.severity !== 'low' && inc.status !== 'Resolved' && (
                          <p className="text-[10px] text-slate-600 mt-2 flex items-center gap-1">
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
        <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-700/40">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-slate-400" />
              <span className="text-[13px] font-semibold text-white">Officer Assignment Board</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full ${staffPct < 93 ? 'bg-amber-500/15 text-amber-400 border border-amber-500/20' : 'bg-slate-700/40 text-slate-400'}`}>
                {currentShift.present}/{currentShift.scheduled} on shift
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-1.5 text-[11px] text-slate-300 bg-slate-700/40 border border-slate-600/50 rounded-lg px-3 py-1.5 hover:bg-slate-700/60 transition-colors">
                <PhoneCall className="w-3.5 h-3.5" /> Call Backup
              </button>
              <button className="flex items-center gap-1.5 text-[11px] text-slate-300 bg-slate-700/40 border border-slate-600/50 rounded-lg px-3 py-1.5 hover:bg-slate-700/60 transition-colors">
                <Plus className="w-3.5 h-3.5" /> Approve OT
              </button>
              <button className="flex items-center gap-1.5 text-[11px] text-slate-300 bg-slate-700/40 border border-slate-600/50 rounded-lg px-3 py-1.5 hover:bg-slate-700/60 transition-colors">
                <ArrowLeftRight className="w-3.5 h-3.5" /> Bulk Reassign
              </button>
            </div>
          </div>

          {/* Table header */}
          <div className="grid grid-cols-12 px-5 py-2 border-b border-slate-700/10 text-[10px] text-slate-500 uppercase tracking-wide">
            <span className="col-span-3">Officer</span>
            <span className="col-span-3">Assignment</span>
            <span className="col-span-1 text-center">Post Type</span>
            <span className="col-span-1 text-center">On Post</span>
            <span className="col-span-1 text-center">Hours</span>
            <span className="col-span-3 text-right">Status · Actions</span>
          </div>

          <div className="divide-y divide-slate-700/10">
            {officers.map(officer => {
              const isHighHours = officer.hoursWorked >= 8;
              const isOffPost = officer.status !== 'On Post';
              return (
                <div key={officer.badge} className={`grid grid-cols-12 items-center px-5 py-2.5 hover:bg-slate-700/10 transition-colors ${isHighHours ? 'bg-amber-500/[0.03]' : ''}`}>
                  <div className="col-span-3">
                    <p className="text-[12px] font-medium text-slate-200">{officer.name}</p>
                    <p className="text-[10px] text-slate-500">#{officer.badge} · {officer.rank}</p>
                  </div>
                  <div className="col-span-3">
                    <p className="text-[12px] text-slate-300">{officer.assignment}</p>
                    {isOffPost && <p className="text-[9px] text-amber-400 mt-0.5">Away from post</p>}
                  </div>
                  <div className="col-span-1 text-center">
                    <span className="text-[10px] text-slate-400">{officer.postType}</span>
                  </div>
                  <div className="col-span-1 text-center">
                    <span className="text-[11px] text-slate-400">{officer.onPostSince}</span>
                  </div>
                  <div className="col-span-1 text-center">
                    <span className={`text-[12px] font-semibold ${isHighHours ? 'text-amber-400' : 'text-slate-400'}`}>
                      {officer.hoursWorked}h
                    </span>
                    {isHighHours && <p className="text-[8px] text-amber-400/70 leading-none">OT</p>}
                  </div>
                  <div className="col-span-3 flex items-center justify-end gap-1.5">
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full flex-shrink-0 ${getOfficerStatusColors(officer.status)}`}>
                      {officer.status}
                    </span>
                    <button className="text-[10px] px-2 py-1 bg-slate-700/40 border border-slate-600/50 text-slate-400 hover:text-white rounded transition-colors flex-shrink-0">
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
                  <UserX className="w-3 h-3 text-red-400" />
                  <p className="text-[12px] font-medium text-red-400">Smith, Officer</p>
                </div>
                <p className="text-[10px] text-slate-500">#2176 · Deputy</p>
              </div>
              <div className="col-span-3">
                <p className="text-[11px] text-amber-400">Post uncovered</p>
                <p className="text-[10px] text-slate-600">Float or OT required</p>
              </div>
              <div className="col-span-1 text-center">
                <span className="text-[10px] text-slate-500">Pod</span>
              </div>
              <div className="col-span-1 text-center">
                <span className="text-[10px] text-slate-600">—</span>
              </div>
              <div className="col-span-1 text-center">
                <span className="text-[10px] text-slate-600">—</span>
              </div>
              <div className="col-span-3 flex items-center justify-end gap-1.5">
                <span className="text-[10px] px-1.5 py-0.5 bg-red-500/15 text-red-400 border border-red-500/20 rounded-full flex-shrink-0">Sick Call</span>
                <button className="text-[10px] px-2 py-1 bg-slate-700/40 border border-slate-600/50 text-slate-300 hover:text-white rounded transition-colors flex-shrink-0">
                  Approve OT
                </button>
                <button className="text-[10px] px-2 py-1 bg-slate-700/40 border border-slate-600/50 text-slate-300 hover:text-white rounded transition-colors flex-shrink-0">
                  Call Backup
                </button>
              </div>
            </div>
          </div>

          <div className="px-5 py-3 border-t border-slate-700/30 flex items-center justify-between">
            <p className="text-[10px] text-slate-600">
              Officers at 8h+ highlighted · ACA minimum: 1 officer per 64 inmates
            </p>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 text-[10px]">
                <CheckCircle className="w-3 h-3 text-emerald-500" />
                <span className="text-slate-500">ACA minimum {currentShift.present >= 13 ? 'met' : 'NOT MET'}</span>
              </div>
              <span className="text-[10px] text-slate-600 flex items-center gap-1">
                <ArrowRight className="w-3 h-3" /> Staffing status reported to Command
              </span>
            </div>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}

import { useState } from 'react';
import {
  Radio, MapPin, Users, Car, ArrowRight, Circle, Siren,
  Timer, Phone, PhoneCall, Send, Megaphone, ChevronDown
} from 'lucide-react';
import DashboardLayout from '../../layouts/DashboardLayout';

interface ActiveCall {
  id: string;
  callNumber: string;
  priority: 'P1' | 'P2' | 'P3';
  type: string;
  location: string;
  coordinates: string;
  crossStreets?: string;
  zone?: string;
  caller: string;
  callerPhone?: string;
  callTime: string;
  elapsed: string;
  assignedUnits: string[];
  status: 'Dispatched' | 'En Route' | 'On Scene' | 'Clear' | 'Holding';
  notes: string;
  dispatchTime?: string;
  etaOnScene?: string;
  backupRequested?: boolean;
  supervisorNotified?: boolean;
  priorCallsAtLocation?: number;
  weaponsRegistered?: boolean;
}

interface PatrolUnit {
  id: string;
  callSign: string;
  officer: string;
  badge: string;
  status: 'Available' | 'Dispatched' | 'En Route' | 'On Scene' | 'Out of Service';
  currentCall?: string;
  location: string;
  lastUpdate: string;
  speed?: number;
  direction?: string;
  eta?: string;
  lastActivity?: string;
  oosReason?: string;
  oosETA?: string;
}

interface HoldingCall {
  callNumber: string;
  type: string;
  location: string;
  holdTime: string;
  priority: 'P1' | 'P2' | 'P3';
}

const CADDispatch = () => {
  const [selectedCall, setSelectedCall] = useState<string | null>(null);
  const [showPressureDetail, setShowPressureDetail] = useState(false);

  // Active calls for service
  const activeCalls: ActiveCall[] = [
    {
      id: 'C-2024-12847',
      callNumber: '24-12847',
      priority: 'P1',
      type: 'Domestic Violence - Weapons Involved',
      location: '4720 Lawrenceville Hwy, Lilburn',
      coordinates: '33.8901, -84.1432',
      crossStreets: 'Pleasant Hill Rd & Beaver Ruin Rd',
      zone: 'Beat 4, Sector A',
      caller: 'Neighbor - Anonymous',
      callerPhone: '(770) xxx-xxxx',
      callTime: '14:32',
      elapsed: '3 min',
      assignedUnits: ['247', '251'],
      status: 'En Route',
      notes: 'Male subject armed with knife. Victim barricaded in bedroom. Children in home (ages 4, 7). History: 3 prior DV calls at this address.',
      dispatchTime: '14:32 (immediate)',
      etaOnScene: '14:35 (2 min)',
      backupRequested: true,
      supervisorNotified: true,
      priorCallsAtLocation: 3,
      weaponsRegistered: true
    },
    {
      id: 'C-2024-12846',
      callNumber: '24-12846',
      priority: 'P2',
      type: 'Suspicious Person - Business District',
      location: '2100 Pleasant Hill Rd, Duluth',
      coordinates: '33.9512, -84.1467',
      crossStreets: 'Satellite Blvd & Pleasant Hill Rd',
      zone: 'Beat 2, Sector B',
      caller: 'Business owner (redacted)',
      callerPhone: '(770) xxx-xxxx',
      callTime: '14:23',
      elapsed: '12 min',
      assignedUnits: ['239'],
      status: 'On Scene',
      notes: 'Male subject loitering 30+ min. Asking customers for money. Not aggressive but persistent. Description: White male, 40s, gray jacket, jeans.',
      dispatchTime: '14:25 (2 min)',
      etaOnScene: '14:29',
      priorCallsAtLocation: 0
    },
    {
      id: 'C-2024-12845',
      callNumber: '24-12845',
      priority: 'P2',
      type: 'Traffic Accident - Injuries',
      location: 'I-85 NB @ SR 316',
      coordinates: '33.9823, -83.9876',
      crossStreets: 'I-85 & SR 316 Interchange',
      zone: 'Interstate Corridor',
      caller: 'Motorist',
      callerPhone: '(404) xxx-xxxx',
      callTime: '14:18',
      elapsed: '17 min',
      assignedUnits: ['243', '256'],
      status: 'On Scene',
      notes: '3-vehicle collision. 2 injuries reported non-life threatening. Left lane blocked. Fire/EMS en route. Tow requested.',
      dispatchTime: '14:19',
      backupRequested: false,
      supervisorNotified: false
    },
    {
      id: 'C-2024-12844',
      callNumber: '24-12844',
      priority: 'P3',
      type: 'Theft Report - Past Incident',
      location: '3355 Sugarloaf Pkwy, Lawrenceville',
      coordinates: '33.9634, -84.0123',
      zone: 'Beat 5',
      caller: 'Business Owner',
      callTime: '14:05',
      elapsed: '30 min',
      assignedUnits: ['241'],
      status: 'On Scene',
      notes: 'Shoplifting occurred yesterday. Video footage available. Suspect description provided. Report only.'
    },
    {
      id: 'C-2024-12843',
      callNumber: '24-12843',
      priority: 'P2',
      type: 'Alarm - Commercial',
      location: '1500 Mall of Georgia Blvd, Buford',
      coordinates: '34.0789, -83.9234',
      crossStreets: 'Mall Blvd & Buford Dr',
      zone: 'Beat 6',
      caller: 'Alarm Company',
      callerPhone: '1-800-xxx-xxxx',
      callTime: '14:01',
      elapsed: '34 min',
      assignedUnits: ['248'],
      status: 'Dispatched',
      notes: 'Rear door motion sensor activated. No answer from key holder. Requesting unit to check perimeter.',
      dispatchTime: '14:02',
      priorCallsAtLocation: 2
    },
    {
      id: 'C-2024-12842',
      callNumber: '24-12842',
      priority: 'P3',
      type: 'Animal Complaint',
      location: '875 Beaver Ruin Rd, Norcross',
      coordinates: '33.9456, -84.1987',
      zone: 'Beat 3',
      caller: 'Resident',
      callTime: '13:47',
      elapsed: '48 min',
      assignedUnits: ['252'],
      status: 'En Route',
      notes: 'Aggressive dog running loose in neighborhood. Caller states pit bull type breed. No injuries reported.',
      dispatchTime: '13:50'
    },
    {
      id: 'C-2024-12841',
      callNumber: '24-12841',
      priority: 'P2',
      type: 'Welfare Check',
      location: '2450 Steve Reynolds Blvd, Duluth',
      coordinates: '33.9678, -84.1234',
      zone: 'Beat 2',
      caller: 'Family Member',
      callTime: '13:38',
      elapsed: '57 min',
      assignedUnits: ['245'],
      status: 'On Scene',
      notes: 'Elderly male has not answered phone in 24 hours. Lives alone. Caller has key but lives out of state.',
      dispatchTime: '13:42'
    },
    {
      id: 'C-2024-12840',
      callNumber: '24-12840',
      priority: 'P3',
      type: 'Parking Complaint',
      location: '1200 Windward Concourse, Alpharetta',
      coordinates: '34.0512, -84.2134',
      zone: 'Beat 7',
      caller: 'Property Manager',
      callTime: '13:25',
      elapsed: '1 hr 10 min',
      assignedUnits: [],
      status: 'Holding',
      notes: 'Vehicle parked in fire lane for 2+ hours. No contact with owner. Requesting tow if owner not located.'
    }
  ];

  // Calls holding (unassigned)
  const holdingCalls: HoldingCall[] = [
    { callNumber: '24-12840', type: 'Parking Complaint', location: '1200 Windward Concourse', holdTime: '1 hr 10 min', priority: 'P3' },
    { callNumber: '24-12838', type: 'Found Property', location: '3500 Mall of Georgia Blvd', holdTime: '45 min', priority: 'P3' }
  ];

  // Patrol units
  const patrolUnits: PatrolUnit[] = [
    {
      id: '247',
      callSign: 'A-247',
      officer: 'Deputy Williams, T.',
      badge: 'P-4521',
      status: 'En Route',
      currentCall: '24-12847',
      location: 'Pleasant Hill Rd @ Lawrenceville Hwy',
      lastUpdate: '14:34',
      speed: 45,
      direction: 'Northeast',
      eta: '2 min',
      lastActivity: 'Dispatched to P1 call'
    },
    {
      id: '251',
      callSign: 'A-251',
      officer: 'Deputy Martinez, C.',
      badge: 'P-3892',
      status: 'En Route',
      currentCall: '24-12847',
      location: 'Lawrenceville Hwy @ McDonough Rd',
      lastUpdate: '14:33',
      speed: 48,
      direction: 'East',
      eta: '3 min',
      lastActivity: 'Backup to P1 call'
    },
    {
      id: '239',
      callSign: 'A-239',
      officer: 'Deputy Chen, M.',
      badge: 'P-2987',
      status: 'On Scene',
      currentCall: '24-12846',
      location: '2100 Pleasant Hill Rd',
      lastUpdate: '14:23',
      lastActivity: 'Subject contacted, no warrants'
    },
    {
      id: '243',
      callSign: 'A-243',
      officer: 'Deputy Johnson, K.',
      badge: 'P-4167',
      status: 'On Scene',
      currentCall: '24-12845',
      location: 'I-85 NB @ SR 316',
      lastUpdate: '14:19',
      lastActivity: 'Traffic control, awaiting tow'
    },
    {
      id: '256',
      callSign: 'A-256',
      officer: 'Deputy Anderson, L.',
      badge: 'P-3456',
      status: 'On Scene',
      currentCall: '24-12845',
      location: 'I-85 NB @ SR 316',
      lastUpdate: '14:20',
      lastActivity: 'Report writing'
    },
    {
      id: '241',
      callSign: 'A-241',
      officer: 'Deputy Brown, D.',
      badge: 'P-2134',
      status: 'On Scene',
      currentCall: '24-12844',
      location: '3355 Sugarloaf Pkwy',
      lastUpdate: '14:08',
      lastActivity: 'Taking theft report'
    },
    {
      id: '248',
      callSign: 'A-248',
      officer: 'Deputy Davis, R.',
      badge: 'P-5234',
      status: 'Dispatched',
      currentCall: '24-12843',
      location: 'Pleasant Hill Rd @ Mall Blvd',
      lastUpdate: '14:32',
      eta: '4 min',
      lastActivity: 'En route to alarm'
    },
    {
      id: '252',
      callSign: 'A-252',
      officer: 'Deputy Wilson, A.',
      badge: 'P-4892',
      status: 'En Route',
      currentCall: '24-12842',
      location: 'Beaver Ruin Rd @ Jimmy Carter',
      lastUpdate: '14:30',
      eta: '6 min',
      lastActivity: 'Animal complaint'
    },
    {
      id: '245',
      callSign: 'A-245',
      officer: 'Deputy Taylor, S.',
      badge: 'P-3729',
      status: 'On Scene',
      currentCall: '24-12841',
      location: '2450 Steve Reynolds Blvd',
      lastUpdate: '14:15',
      lastActivity: 'Welfare check in progress'
    },
    {
      id: '234',
      callSign: 'A-234',
      officer: 'Deputy Rodriguez, M.',
      badge: 'P-2845',
      status: 'Available',
      location: 'Patrol Zone 3 - Lawrenceville',
      lastUpdate: '14:35',
      lastActivity: 'Traffic stop completed 14:05'
    },
    {
      id: '238',
      callSign: 'A-238',
      officer: 'Deputy Clark, J.',
      badge: 'P-4678',
      status: 'Available',
      location: 'Patrol Zone 1 - Duluth',
      lastUpdate: '14:33',
      lastActivity: 'Patrol'
    },
    {
      id: '240',
      callSign: 'A-240',
      officer: 'Deputy Lee, K.',
      badge: 'P-3567',
      status: 'Available',
      location: 'Patrol Zone 4 - Norcross',
      lastUpdate: '14:31',
      lastActivity: 'Patrol'
    },
    {
      id: '235',
      callSign: 'A-235',
      officer: 'Deputy Thompson, E.',
      badge: 'P-3124',
      status: 'Out of Service',
      location: 'Gas station (I-85 & SR 316)',
      lastUpdate: '14:27',
      oosReason: 'Fueling',
      oosETA: '8 min',
      lastActivity: 'Fueling vehicle'
    },
    {
      id: '242',
      callSign: 'A-242',
      officer: 'Deputy Garcia, L.',
      badge: 'P-4923',
      status: 'Out of Service',
      location: 'HQ - Report Writing',
      lastUpdate: '14:10',
      oosReason: 'Break',
      oosETA: '12 min',
      lastActivity: 'Meal break'
    },
    {
      id: '257',
      callSign: 'A-257',
      officer: 'Deputy Nguyen, T.',
      badge: 'P-2678',
      status: 'Out of Service',
      location: 'HQ - Maintenance',
      lastUpdate: '14:00',
      oosReason: 'Equipment issue',
      oosETA: 'TBD',
      lastActivity: 'Radio malfunction'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Available': return 'bg-emerald-500/20 text-emerald-400';
      case 'Dispatched': return 'bg-blue-500/20 text-blue-400';
      case 'En Route': return 'bg-amber-500/20 text-amber-400';
      case 'On Scene': return 'bg-purple-500/20 text-purple-400';
      case 'Out of Service': return 'bg-slate-500/20 text-slate-400';
      case 'Holding': return 'bg-red-500/20 text-red-400';
      default: return 'bg-slate-500/20 text-slate-400';
    }
  };

  const stats = {
    totalCalls: activeCalls.filter(c => c.status !== 'Holding').length,
    priority1: activeCalls.filter(c => c.priority === 'P1').length,
    priority2: activeCalls.filter(c => c.priority === 'P2').length,
    unitsAvailable: patrolUnits.filter(u => u.status === 'Available').length,
    unitsDeployed: patrolUnits.filter(u => u.status !== 'Available' && u.status !== 'Out of Service').length,
    unitsOutOfService: patrolUnits.filter(u => u.status === 'Out of Service').length
  };

  // Operational Pressure
  const activeUnitCount = patrolUnits.filter(u => u.status !== 'Out of Service').length;
  const availablePct = Math.round((stats.unitsAvailable / activeUnitCount) * 100);
  const p1Active = activeCalls.filter(c => c.priority === 'P1' && c.status !== 'Holding').length;
  const operationalPressure: 'Low' | 'Moderate' | 'High' | 'Critical' = (() => {
    if (p1Active > 0 && availablePct <= 25) return 'Critical';
    if (p1Active > 0 || holdingCalls.length > 2 || availablePct < 30) return 'High';
    if (holdingCalls.length > 0 || availablePct < 50) return 'Moderate';
    return 'Low';
  })();
  const pressureFactors: string[] = [
    p1Active > 0 ? `${p1Active} active P1 emergency — all available units committed` : '✓ No active P1 emergencies',
    `Unit availability: ${availablePct}% (${stats.unitsAvailable}/${activeUnitCount}) — ${availablePct <= 25 ? 'critically low for new calls' : availablePct < 50 ? 'below optimal' : 'adequate'}`,
    holdingCalls.length > 0 ? `${holdingCalls.length} call(s) holding without assigned units` : '✓ No calls waiting assignment',
    stats.unitsOutOfService > 0 ? `${stats.unitsOutOfService} unit(s) out of service — ${patrolUnits.filter(u => u.status === 'Out of Service' && u.oosETA !== 'TBD').length} returning within 15 min` : '✓ All units operational',
  ];

  // Per-call risk intelligence
  const getCallRisk = (call: ActiveCall): { delayRisk: string | null; escalation: 'High' | 'Medium' | 'Low'; escalationText: string } => {
    if (call.priority === 'P3') return { delayRisk: null, escalation: 'Low', escalationText: 'Routine — low escalation potential' };
    switch (call.type) {
      case 'Domestic Violence - Weapons Involved':
        return { delayRisk: 'Victim injury or fatality risk — armed subject, children present', escalation: 'High', escalationText: 'High likelihood of use-of-force or hostage situation' };
      case 'Traffic Accident - Injuries':
        return { delayRisk: 'Secondary collision risk — active highway lane blocked', escalation: 'Medium', escalationText: 'May escalate if injuries worsen before EMS clears scene' };
      case 'Suspicious Person - Business District':
        return { delayRisk: 'Potential theft or confrontation if left unchecked', escalation: 'Low', escalationText: 'Subject not aggressive — low escalation expected' };
      case 'Alarm - Commercial':
        return { delayRisk: `${call.elapsed} response — property loss exposure increases with delay`, escalation: 'Low', escalationText: 'Likely false alarm — 2 prior calls at this location' };
      case 'Welfare Check':
        return { delayRisk: 'Medical emergency possible — subject uncontacted 24+ hours', escalation: 'Medium', escalationText: 'May escalate to medical emergency or found-deceased scenario' };
      default:
        return { delayRisk: null, escalation: 'Low', escalationText: 'Routine — low escalation potential' };
    }
  };

  // Unit reassign candidate check
  const isReassignCandidate = (unit: PatrolUnit): boolean => {
    if (!unit.currentCall || unit.status === 'Available') return false;
    const call = activeCalls.find(c => c.callNumber === unit.currentCall);
    return call?.priority === 'P3';
  };

  const sortedActiveCalls = [...activeCalls]
    .filter(c => c.status !== 'Holding')
    .sort((a, b) => ({ P1: 0, P2: 1, P3: 2 }[a.priority] - { P1: 0, P2: 1, P3: 2 }[b.priority]));

  const holdingActive = activeCalls.filter(c => c.status === 'Holding');

  return (
    <DashboardLayout>
      <div className="p-6 space-y-5">

        {/* ── Page Header ─────────────────────────────────── */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-white mb-1">Field Operations</h1>
            <p className="text-[11px] text-slate-500">
              CAD/Dispatch Console · A-Shift · 06:00–14:00 · Supervisor: <span className="text-slate-400">Sgt. Mitchell</span>
              <span className="mx-2 text-slate-700">·</span>
              <span className="text-slate-400">{patrolUnits.length} units on duty</span>
              <span className="mx-2 text-slate-700">·</span>
              <span className={availablePct <= 25 ? 'text-red-400' : availablePct < 50 ? 'text-amber-400' : 'text-emerald-400'}>
                {stats.unitsAvailable} available ({availablePct}%)
              </span>
            </p>
          </div>
          <div className="flex items-center gap-2">
            {/* Operational Pressure */}
            <div className="relative">
              <button
                onClick={() => setShowPressureDetail(v => !v)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-[12px] font-semibold transition-colors ${
                  operationalPressure === 'Critical' ? 'bg-red-500/10 border-red-500/30 text-red-400 hover:bg-red-500/15' :
                  operationalPressure === 'High'     ? 'bg-amber-500/10 border-amber-500/30 text-amber-400 hover:bg-amber-500/15' :
                  operationalPressure === 'Moderate' ? 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/15' :
                                                       'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/15'
                }`}
              >
                <Circle className={`w-1.5 h-1.5 ${
                  operationalPressure === 'Critical' ? 'fill-red-500 text-red-500' :
                  operationalPressure === 'High'     ? 'fill-amber-400 text-amber-400' :
                  operationalPressure === 'Moderate' ? 'fill-yellow-400 text-yellow-400' :
                                                       'fill-emerald-500 text-emerald-500'
                }`} />
                Pressure: {operationalPressure}
                <ChevronDown className={`w-3 h-3 transition-transform ${showPressureDetail ? 'rotate-180' : ''}`} />
              </button>
              {showPressureDetail && (
                <div className="absolute right-0 top-full mt-1.5 z-50 min-w-[280px] bg-slate-900 border border-slate-700/60 rounded-xl shadow-xl overflow-hidden">
                  <div className="px-4 py-2.5 border-b border-slate-700/40">
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Why Pressure is {operationalPressure}</p>
                  </div>
                  <ul className="p-3 space-y-1.5">
                    {pressureFactors.map((factor, i) => {
                      const isIssue = !factor.startsWith('✓');
                      return (
                        <li key={i} className="flex items-start gap-2 text-[11px]">
                          <span className={`mt-0.5 flex-shrink-0 font-bold ${isIssue ? 'text-amber-500' : 'text-emerald-600'}`}>{isIssue ? '—' : '✓'}</span>
                          <span className={isIssue ? 'text-slate-300' : 'text-slate-500'}>{factor.replace(/^✓ /, '')}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>
            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500/10 border border-red-500/25 text-red-400 rounded-lg text-[12px] font-medium hover:bg-red-500/15 transition-colors">
              <PhoneCall className="w-3.5 h-3.5" /> New Call
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800/30 border border-slate-700/50 rounded-lg text-[12px] text-slate-400 hover:text-white hover:bg-slate-700/30 transition-all">
              <Megaphone className="w-3.5 h-3.5" /> Broadcast
            </button>
            <div className="flex items-center gap-1.5 text-[11px] text-slate-500 bg-slate-800/30 border border-slate-700/50 rounded-lg px-3 py-1.5">
              <Circle className="w-1.5 h-1.5 fill-emerald-500 text-emerald-500" /> Live
            </div>
          </div>
        </div>

        {/* ── Command Attention Needed ─────────────────────── */}
        <div className="grid grid-cols-3 gap-3">
          {/* P1 Emergencies */}
          <div className={`rounded-xl border px-4 py-3 ${p1Active > 0 ? 'bg-red-500/5 border-red-500/25' : 'bg-slate-800/20 border-slate-700/30'}`}>
            <div className="flex items-center gap-1.5 mb-2">
              <Siren className={`w-3.5 h-3.5 ${p1Active > 0 ? 'text-red-400' : 'text-slate-600'}`} />
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">P1 Emergencies</p>
              {p1Active > 0 && (
                <span className="text-[9px] px-1.5 py-0.5 bg-red-500/15 text-red-400 border border-red-500/20 rounded-full font-bold ml-auto">{p1Active} active</span>
              )}
            </div>
            {p1Active === 0 ? (
              <p className="text-[11px] text-slate-600">No active P1 emergencies</p>
            ) : (
              <ul className="space-y-0.5">
                {activeCalls.filter(c => c.priority === 'P1').map(c => (
                  <li key={c.id} className="text-[11px] text-slate-300 flex items-start gap-1.5">
                    <span className="text-red-500 flex-shrink-0 mt-0.5">—</span>{c.type} · {c.elapsed}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Coverage Status */}
          <div className={`rounded-xl border px-4 py-3 ${availablePct <= 30 ? 'bg-red-500/5 border-red-500/25' : availablePct < 50 ? 'bg-amber-500/5 border-amber-500/20' : 'bg-slate-800/20 border-slate-700/30'}`}>
            <div className="flex items-center gap-1.5 mb-2">
              <Users className={`w-3.5 h-3.5 ${availablePct <= 30 ? 'text-red-400' : availablePct < 50 ? 'text-amber-400' : 'text-slate-600'}`} />
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Unit Coverage</p>
              <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold ml-auto border ${
                availablePct <= 30 ? 'bg-red-500/15 text-red-400 border-red-500/20' :
                availablePct < 50  ? 'bg-amber-500/15 text-amber-400 border-amber-500/20' :
                'bg-emerald-500/15 text-emerald-400 border-emerald-500/20'
              }`}>{availablePct <= 30 ? 'CRITICAL' : availablePct < 50 ? 'LOW' : 'ADEQUATE'}</span>
            </div>
            <ul className="space-y-0.5">
              <li className="text-[11px] text-slate-300 flex items-start gap-1.5">
                <span className="text-slate-600 flex-shrink-0 mt-0.5">—</span>
                {stats.unitsAvailable} of {activeUnitCount} units available ({availablePct}%)
              </li>
              <li className="text-[11px] text-slate-300 flex items-start gap-1.5">
                <span className="text-slate-600 flex-shrink-0 mt-0.5">—</span>
                {stats.unitsDeployed} deployed · {stats.unitsOutOfService} out of service
              </li>
              {stats.unitsOutOfService > 0 && (
                <li className="text-[11px] text-amber-400 flex items-start gap-1.5">
                  <span className="text-amber-500 flex-shrink-0 mt-0.5">—</span>
                  A-235 back in 8 min · A-242 back in 12 min
                </li>
              )}
            </ul>
          </div>

          {/* Calls Holding */}
          <div className={`rounded-xl border px-4 py-3 ${holdingCalls.length > 0 ? 'bg-amber-500/5 border-amber-500/20' : 'bg-slate-800/20 border-slate-700/30'}`}>
            <div className="flex items-center gap-1.5 mb-2">
              <Timer className={`w-3.5 h-3.5 ${holdingCalls.length > 0 ? 'text-amber-400' : 'text-slate-600'}`} />
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Calls Holding</p>
              {holdingCalls.length > 0 && (
                <span className="text-[9px] px-1.5 py-0.5 bg-amber-500/15 text-amber-400 border border-amber-500/20 rounded-full font-bold ml-auto">{holdingCalls.length}</span>
              )}
            </div>
            {holdingCalls.length === 0 ? (
              <p className="text-[11px] text-slate-600">No calls awaiting assignment</p>
            ) : (
              <ul className="space-y-0.5">
                {holdingCalls.map((c, i) => (
                  <li key={i} className="text-[11px] text-slate-300 flex items-start gap-1.5">
                    <span className="text-amber-500 flex-shrink-0 mt-0.5">—</span>
                    {c.type} · holding {c.holdTime}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* ── Active Calls for Service ──────────────────────── */}
        <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-700/40">
            <div className="flex items-center gap-2">
              <Radio className="w-4 h-4 text-slate-400" />
              <span className="text-[13px] font-semibold text-white">Active Calls for Service</span>
              <span className="text-[10px] px-2 py-0.5 bg-slate-700/40 text-slate-400 rounded-full">
                {sortedActiveCalls.filter(c => c.priority === 'P1').length} P1
                · {sortedActiveCalls.filter(c => c.priority === 'P2').length} P2
                · {sortedActiveCalls.filter(c => c.priority === 'P3').length} P3
              </span>
            </div>
            <div className="flex items-center gap-2 text-[10px] text-slate-500">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500 inline-block" />P1 Emergency</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />P2 Urgent</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-400 inline-block" />P3 Routine</span>
            </div>
          </div>

          <div className="divide-y divide-slate-700/30">
            {sortedActiveCalls.map(call => {
              const isExpanded = selectedCall === call.id;
              const risk = getCallRisk(call);
              const unitDetails = call.assignedUnits.map(id => patrolUnits.find(u => u.id === id)).filter(Boolean);
              return (
                <div key={call.id}>
                  <div
                    className="flex items-start gap-4 px-5 py-4 cursor-pointer hover:bg-slate-700/10 transition-colors"
                    onClick={() => setSelectedCall(isExpanded ? null : call.id)}
                  >
                    {/* Severity strip */}
                    <div className={`w-1 self-stretch rounded-full flex-shrink-0 ${
                      call.priority === 'P1' ? 'bg-red-500' :
                      call.priority === 'P2' ? 'bg-amber-400' :
                      'bg-blue-400'
                    }`} />

                    <div className="flex-1 min-w-0">
                      {/* Priority badge + type + elapsed */}
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <div className="flex items-center gap-2 min-w-0">
                          <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider flex-shrink-0 ${
                            call.priority === 'P1' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                            call.priority === 'P2' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                            'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                          }`}>{call.priority}</span>
                          <p className={`text-[13px] font-semibold truncate ${call.priority === 'P1' ? 'text-red-100' : 'text-white'}`}>{call.type}</p>
                          {call.backupRequested && (
                            <span className="text-[9px] px-1.5 py-0.5 bg-red-500/15 text-red-400 border border-red-500/20 rounded font-bold flex-shrink-0">BACKUP</span>
                          )}
                        </div>
                        <div className="flex items-center gap-3 flex-shrink-0">
                          <span className={`text-[13px] font-bold ${
                            call.elapsed.includes('hr') ? 'text-red-400' :
                            call.elapsed.includes('min') && parseInt(call.elapsed) > 20 ? 'text-amber-400' :
                            'text-slate-300'
                          }`}>{call.elapsed}</span>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${getStatusColor(call.status)}`}>{call.status}</span>
                        </div>
                      </div>

                      {/* Location + call number */}
                      <div className="flex items-center gap-3 mb-2">
                        <p className="text-[11px] text-slate-400 flex items-center gap-1">
                          <MapPin className="w-3 h-3 flex-shrink-0" />{call.location}
                        </p>
                        {call.zone && <span className="text-[10px] text-slate-600">· {call.zone}</span>}
                        <span className="text-[10px] text-slate-600">#{call.callNumber}</span>
                      </div>

                      {/* Risk layer for P1/P2 */}
                      {(call.priority === 'P1' || call.priority === 'P2') && (
                        <div className={`rounded-lg px-3 py-2 mb-2.5 ${
                          call.priority === 'P1' ? 'bg-red-950/40 border border-red-500/15' : 'bg-slate-900/50 border border-slate-700/40'
                        }`}>
                          <div className="grid grid-cols-2 gap-x-4">
                            {risk.delayRisk && (
                              <div>
                                <p className="text-[9px] text-slate-500 uppercase tracking-wider font-semibold mb-0.5">Risk if Delayed</p>
                                <p className="text-[11px] text-amber-200 leading-snug">{risk.delayRisk}</p>
                              </div>
                            )}
                            <div>
                              <p className="text-[9px] text-slate-500 uppercase tracking-wider font-semibold mb-0.5">Escalation</p>
                              <div className="flex items-center gap-1.5">
                                <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase ${
                                  risk.escalation === 'High'   ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                                  risk.escalation === 'Medium' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                                  'bg-slate-700/40 text-slate-400 border border-slate-700/50'
                                }`}>{risk.escalation}</span>
                                <p className="text-[10px] text-slate-400 leading-snug">{risk.escalationText}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Assigned units */}
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[10px] text-slate-500">Units:</span>
                        {unitDetails.length > 0 ? unitDetails.map((u, i) => (
                          <span key={i} className="text-[10px] px-2 py-0.5 bg-blue-500/15 text-blue-400 border border-blue-500/20 rounded font-medium">
                            {u!.callSign}{u!.eta ? ` · ${u!.eta}` : ''}
                          </span>
                        )) : (
                          <span className="text-[10px] px-2 py-0.5 bg-red-500/15 text-red-400 border border-red-500/20 rounded font-bold">NO UNITS</span>
                        )}
                        {call.priorCallsAtLocation! > 0 && (
                          <span className="text-[10px] px-2 py-0.5 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded">{call.priorCallsAtLocation} prior calls</span>
                        )}
                        {call.weaponsRegistered && (
                          <span className="text-[10px] px-2 py-0.5 bg-red-500/10 text-red-400 border border-red-500/20 rounded font-semibold">WEAPONS</span>
                        )}
                      </div>
                    </div>

                    {/* Recommended actions column */}
                    {(call.priority === 'P1' || call.priority === 'P2') && (
                      <div className="flex flex-col gap-1.5 flex-shrink-0 w-[160px]">
                        <div className="bg-slate-900/60 border border-slate-700/50 rounded-lg px-2.5 py-2">
                          <p className="text-[9px] text-slate-500 uppercase tracking-wider font-semibold mb-1">Action</p>
                          <p className="text-[11px] text-slate-200 leading-snug">
                            {call.priority === 'P1' && call.type.includes('Domestic') ? 'Stage additional unit — await scene clear before entry' :
                             call.priority === 'P1' ? 'Supervisor en route — monitor radio' :
                             call.type.includes('Accident') ? 'Request tow + clear lanes when EMS done' :
                             call.type.includes('Welfare') ? 'Contact medical if no response in 5 min' :
                             call.type.includes('Alarm') ? 'Key holder contact before unit arrival' :
                             'Continue monitoring'}
                          </p>
                        </div>
                        {call.priority === 'P1' && (
                          <button className="text-[11px] px-2.5 py-1.5 bg-red-500/15 border border-red-500/25 text-red-400 hover:bg-red-500/25 rounded-lg font-medium transition-colors">
                            Request Backup
                          </button>
                        )}
                        <button className="text-[11px] px-2.5 py-1.5 bg-slate-700/50 border border-slate-600/50 text-slate-300 hover:bg-slate-700/70 rounded-lg transition-colors">
                          Update Status
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Expanded detail */}
                  {isExpanded && (
                    <div className="mx-5 mb-4 bg-slate-900/60 border border-slate-700/50 rounded-lg p-4">
                      <div className="grid grid-cols-2 gap-4 mb-3">
                        <div>
                          <p className="text-[9px] text-slate-500 uppercase tracking-wider font-semibold mb-1">Call Information</p>
                          <div className="space-y-1 text-[11px]">
                            <div className="flex gap-2"><span className="text-slate-500 w-20">Caller:</span><span className="text-slate-300">{call.caller}</span></div>
                            <div className="flex gap-2"><span className="text-slate-500 w-20">Received:</span><span className="text-slate-300">{call.callTime}</span></div>
                            {call.dispatchTime && <div className="flex gap-2"><span className="text-slate-500 w-20">Dispatched:</span><span className="text-slate-300">{call.dispatchTime}</span></div>}
                            {call.etaOnScene && <div className="flex gap-2"><span className="text-slate-500 w-20">ETA Scene:</span><span className="text-blue-400 font-medium">{call.etaOnScene}</span></div>}
                            {call.crossStreets && <div className="flex gap-2"><span className="text-slate-500 w-20">Cross St:</span><span className="text-slate-300">{call.crossStreets}</span></div>}
                          </div>
                        </div>
                        <div>
                          <p className="text-[9px] text-slate-500 uppercase tracking-wider font-semibold mb-1">Assigned Units</p>
                          <div className="space-y-1.5">
                            {unitDetails.map((u, i) => (
                              <div key={i} className="flex items-center justify-between text-[11px] bg-slate-800/50 rounded px-2 py-1">
                                <span className="text-blue-400 font-medium">{u!.callSign}</span>
                                <span className="text-slate-400">{u!.officer}</span>
                                <span className={`text-[9px] px-1.5 py-0.5 rounded ${getStatusColor(u!.status)}`}>{u!.status}</span>
                              </div>
                            ))}
                            {unitDetails.length === 0 && (
                              <p className="text-[11px] text-red-400">No units assigned — dispatch immediately</p>
                            )}
                          </div>
                        </div>
                      </div>
                      {call.notes && (
                        <div className="bg-slate-800/40 border border-slate-700/40 rounded-lg px-3 py-2 mb-3">
                          <p className="text-[9px] text-slate-500 uppercase tracking-wider font-semibold mb-1">Notes</p>
                          <p className="text-[11px] text-slate-300 leading-relaxed">{call.notes}</p>
                        </div>
                      )}
                      <div className="flex items-center gap-2 pt-2 border-t border-slate-700/40">
                        <button className="text-[11px] px-3 py-1.5 bg-blue-500/15 border border-blue-500/25 text-blue-400 rounded-lg hover:bg-blue-500/25 transition-colors font-medium">
                          Assign Units
                        </button>
                        <button className="text-[11px] px-3 py-1.5 bg-slate-700/60 border border-slate-600/60 text-slate-300 rounded-lg hover:bg-slate-700 transition-colors font-medium">
                          Update Status
                        </button>
                        <button className="text-[11px] px-3 py-1.5 bg-emerald-500/15 border border-emerald-500/25 text-emerald-400 rounded-lg hover:bg-emerald-500/25 transition-colors font-medium">
                          Clear Call
                        </button>
                        <button onClick={() => setSelectedCall(null)} className="text-[11px] text-slate-500 hover:text-slate-300 ml-auto transition-colors px-2 py-1.5">
                          Collapse
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Calls Holding + Unit Status ──────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

          {/* Calls Holding — left column */}
          {holdingActive.length > 0 && (
            <div className="bg-slate-800/30 border border-amber-500/20 rounded-xl overflow-hidden">
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-700/40">
                <div className="flex items-center gap-2">
                  <Timer className="w-4 h-4 text-amber-400" />
                  <span className="text-[13px] font-semibold text-white">Calls Holding</span>
                  <span className="text-[9px] px-1.5 py-0.5 bg-amber-500/15 text-amber-400 border border-amber-500/20 rounded-full font-bold">{holdingActive.length}</span>
                </div>
                <button className="flex items-center gap-1.5 text-[11px] px-2.5 py-1 bg-blue-500/15 border border-blue-500/25 text-blue-400 rounded-lg hover:bg-blue-500/25 transition-colors">
                  <Send className="w-3 h-3" /> Auto-Assign
                </button>
              </div>
              <div className="divide-y divide-slate-700/30">
                {holdingActive.map((call, idx) => (
                  <div key={call.id} className="px-5 py-4">
                    <div className="flex items-start gap-3 mb-2.5">
                      <div className="w-1 self-stretch rounded-full bg-amber-400 flex-shrink-0" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-0.5">
                          <p className="text-[12px] font-semibold text-white">{call.type}</p>
                          <span className={`text-[12px] font-bold ${call.elapsed.includes('hr') ? 'text-red-400' : 'text-amber-400'}`}>{call.elapsed}</span>
                        </div>
                        <p className="text-[11px] text-slate-400 flex items-center gap-1 mb-2">
                          <MapPin className="w-3 h-3" />{call.location}
                        </p>
                        <div className="bg-slate-900/50 border border-slate-700/40 rounded-lg px-3 py-2">
                          <p className="text-[9px] text-slate-500 uppercase tracking-wider font-semibold mb-1">Risk if Not Handled</p>
                          <p className="text-[11px] text-amber-200 leading-snug">
                            {idx === 0 ? 'Fire lane blocked — liability if emergency access needed' : 'Property unclaimed — chain-of-custody risk beyond 2 hrs'}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-[11px] bg-emerald-500/5 border border-emerald-500/15 rounded-lg px-2.5 py-1.5">
                      <div className="flex items-center gap-2 text-slate-400">
                        <Car className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400 font-medium">{idx === 0 ? 'A-234' : 'A-238'}</span>
                        <span>ETA {idx === 0 ? '6' : '8'} min · {idx === 0 ? 'Zone 3 · 0 calls' : 'Zone 1 · 0 calls'}</span>
                      </div>
                      <button className="text-blue-400 hover:text-blue-300 font-medium flex items-center gap-1">
                        Assign <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Unit Status — right columns */}
          <div className={`bg-slate-800/30 border border-slate-700/50 rounded-xl overflow-hidden ${holdingActive.length > 0 ? 'lg:col-span-2' : 'lg:col-span-3'}`}>
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-700/40">
              <div className="flex items-center gap-2">
                <Car className="w-4 h-4 text-slate-400" />
                <span className="text-[13px] font-semibold text-white">Unit Status</span>
                <span className="text-[10px] px-2 py-0.5 bg-slate-700/40 text-slate-400 rounded-full">
                  {stats.unitsAvailable} available · {stats.unitsDeployed} deployed · {stats.unitsOutOfService} OOS
                </span>
              </div>
              <div className="flex items-center gap-3 text-[10px] text-slate-500">
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />Available</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />En Route</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-purple-400 inline-block" />On Scene</span>
              </div>
            </div>
            <div className={`grid gap-px bg-slate-700/20 ${holdingActive.length > 0 ? 'grid-cols-2 md:grid-cols-3' : 'grid-cols-2 md:grid-cols-4 lg:grid-cols-5'}`}>
              {patrolUnits.map(unit => {
                const assignedCall = unit.currentCall ? activeCalls.find(c => c.callNumber === unit.currentCall) : null;
                const isReassign = isReassignCandidate(unit);
                return (
                  <div
                    key={unit.id}
                    className={`px-3 py-3 ${
                      unit.status === 'Available'      ? 'bg-emerald-500/5' :
                      unit.status === 'En Route'       ? 'bg-amber-500/5' :
                      unit.status === 'On Scene'       ? 'bg-purple-500/5' :
                      unit.status === 'Dispatched'     ? 'bg-blue-500/5' :
                      'bg-slate-900/20'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-1.5">
                        <div className={`w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-bold ${
                          unit.status === 'Available'  ? 'bg-emerald-500/20 text-emerald-400' :
                          unit.status === 'En Route'   ? 'bg-amber-500/20 text-amber-400' :
                          unit.status === 'On Scene'   ? 'bg-purple-500/20 text-purple-400' :
                          unit.status === 'Dispatched' ? 'bg-blue-500/20 text-blue-400' :
                          'bg-slate-700 text-slate-400'
                        }`}>{unit.callSign.split('-')[1]}</div>
                        <span className="text-[12px] font-bold text-white">{unit.callSign}</span>
                      </div>
                      <span className={`text-[9px] px-1.5 py-0.5 rounded font-semibold ${getStatusColor(unit.status)}`}>
                        {unit.status === 'Out of Service' ? 'OOS' : unit.status === 'En Route' ? 'En Route' : unit.status}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-400 truncate mb-1" title={unit.officer}>{unit.officer}</p>
                    {unit.currentCall && (
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="text-[10px] text-slate-500">Call:</span>
                        <span className="text-[10px] text-amber-400 font-medium">{unit.currentCall}</span>
                        {assignedCall && (
                          <span className={`text-[9px] px-1 py-px rounded font-bold ${
                            assignedCall.priority === 'P1' ? 'bg-red-500/20 text-red-400' :
                            assignedCall.priority === 'P2' ? 'bg-amber-500/20 text-amber-400' :
                            'bg-blue-500/20 text-blue-400'
                          }`}>{assignedCall.priority}</span>
                        )}
                      </div>
                    )}
                    {unit.status === 'Out of Service' && unit.oosReason && (
                      <p className="text-[10px] text-slate-500 mb-1">{unit.oosReason} · back {unit.oosETA}</p>
                    )}
                    {isReassign && (
                      <div className="flex items-center gap-1 text-[9px] text-amber-400 font-semibold">
                        <ArrowRight className="w-2.5 h-2.5" /> Reassign Candidate
                      </div>
                    )}
                    {unit.status === 'Available' && (
                      <div className="flex gap-1 mt-1.5">
                        <button className="flex-1 text-[10px] px-2 py-1 bg-blue-500/15 border border-blue-500/20 text-blue-400 rounded font-medium hover:bg-blue-500/25 transition-colors flex items-center justify-center gap-1">
                          <Send className="w-2.5 h-2.5" /> Assign
                        </button>
                        <button className="text-[10px] px-2 py-1 bg-slate-700/40 border border-slate-600/40 text-slate-400 rounded hover:bg-slate-700/60 transition-colors">
                          <Phone className="w-2.5 h-2.5" />
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
};

export default CADDispatch;

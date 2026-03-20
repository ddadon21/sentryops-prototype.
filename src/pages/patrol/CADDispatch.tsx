import { useState } from 'react';
import {
  Radio, MapPin, Clock, Users, Car, Navigation, Sparkles, X,
  AlertTriangle, CheckCircle, TrendingUp, Target, Activity,
  Bell, Search, FileText, AlertCircle, Zap, ChevronRight,
  RefreshCw, Shield, Phone, Eye, ArrowRight, Circle, Siren,
  Timer, Gauge, BarChart3, User, PhoneCall, Send,
  Megaphone, History, XCircle, Wifi, Signal
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
  const [selectedCall, setSelectedCall] = useState<ActiveCall | null>(null);
  const [aiInsightsVisible, setAiInsightsVisible] = useState(true);
  const [showMetrics, setShowMetrics] = useState(false);
  const [showShiftStatus, setShowShiftStatus] = useState(false);
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

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'P1': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'P2': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'P3': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default: return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

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

  // Today's metrics
  const todaysMetrics = {
    totalCallsToday: 47,
    p1Calls: 8,
    p2Calls: 23,
    p3Calls: 16,
    avgResponseTimeP1: 3.2,
    avgResponseTimeP2: 7.8,
    avgResponseTimeP3: 14.6,
    callsCleared: 39,
    clearanceRate: 83,
    avgHandlingTime: 22
  };

  // Unit performance
  const unitPerformance = [
    { unit: 'A-247', officer: 'Deputy Williams', calls: 12, fastestResponse: 2.1 },
    { unit: 'A-251', officer: 'Deputy Martinez', calls: 11, fastestResponse: 2.8 },
    { unit: 'A-239', officer: 'Deputy Chen', calls: 10, fastestResponse: 3.5 }
  ];

  return (
    <DashboardLayout>
      <div className="p-4 lg:p-6">
        {/* Page Header with Quick Actions */}
        <div className="mb-6 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center">
              <Radio className="w-7 h-7 text-amber-400" />
            </div>
            <div>
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-2xl lg:text-3xl font-bold text-white">Field Operations</h1>
                <span className="px-2 py-1 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 rounded text-xs font-semibold flex items-center gap-1">
                  <Circle className="w-2 h-2 fill-emerald-400" />
                  LIVE
                </span>
                {/* Operational Pressure Badge */}
                <div className="relative">
                  <button
                    onClick={() => setShowPressureDetail(!showPressureDetail)}
                    className={`px-2.5 py-1 rounded text-xs font-bold flex items-center gap-1.5 border transition-all ${
                      operationalPressure === 'Critical' ? 'bg-red-500/20 border-red-500/40 text-red-400 hover:bg-red-500/30' :
                      operationalPressure === 'High' ? 'bg-amber-500/20 border-amber-500/40 text-amber-400 hover:bg-amber-500/30' :
                      operationalPressure === 'Moderate' ? 'bg-yellow-500/20 border-yellow-500/40 text-yellow-400 hover:bg-yellow-500/30' :
                      'bg-emerald-500/20 border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/30'
                    }`}
                  >
                    <Gauge className="w-3 h-3" />
                    Pressure: {operationalPressure.toUpperCase()}
                    <ChevronRight className={`w-3 h-3 transition-transform duration-150 ${showPressureDetail ? 'rotate-90' : ''}`} />
                  </button>
                  {showPressureDetail && (
                    <div className="absolute top-full left-0 mt-1.5 bg-slate-800 border border-slate-600 rounded-xl p-3 w-80 z-30 shadow-2xl">
                      <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold mb-2">
                        Why {operationalPressure}?
                      </p>
                      <ul className="space-y-1.5">
                        {pressureFactors.map((f, i) => (
                          <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                            <span className={`mt-0.5 flex-shrink-0 ${f.startsWith('✓') ? 'text-emerald-400' : 'text-amber-400'}`}>
                              {f.startsWith('✓') ? '✓' : '·'}
                            </span>
                            <span>{f.replace(/^✓ /, '')}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <span className="text-slate-400">CAD/Dispatch Console</span>
                <span className="text-slate-500">|</span>
                <span className="text-slate-400">A-Shift Active</span>
                <span className="text-slate-500">|</span>
                <span className="text-blue-400 font-medium">{patrolUnits.length} Units On Duty</span>
              </div>
            </div>
          </div>

          {/* Quick Actions Bar */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              className="flex items-center gap-2 px-3 py-2 bg-red-500/20 border border-red-500/30 text-red-400 rounded-lg text-sm font-medium hover:bg-red-500/30 transition-all"
              title="Create new call for service"
            >
              <PhoneCall className="w-4 h-4" />
              New Call
            </button>
            <button
              className="flex items-center gap-2 px-3 py-2 bg-blue-500/20 border border-blue-500/30 text-blue-400 rounded-lg text-sm font-medium hover:bg-blue-500/30 transition-all"
              title="Locate unit on map"
            >
              <MapPin className="w-4 h-4" />
              Locate Unit
            </button>
            <button
              className="flex items-center gap-2 px-3 py-2 bg-amber-500/20 border border-amber-500/30 text-amber-400 rounded-lg text-sm font-medium hover:bg-amber-500/30 transition-all"
              title="Send broadcast alert to all units"
            >
              <Megaphone className="w-4 h-4" />
              Broadcast
            </button>
            <button
              className="flex items-center gap-2 px-3 py-2 bg-purple-500/20 border border-purple-500/30 text-purple-400 rounded-lg text-sm font-medium hover:bg-purple-500/30 transition-all"
              title="Request backup for active call"
            >
              <Shield className="w-4 h-4" />
              Backup
            </button>
            <button
              className="flex items-center gap-2 px-3 py-2 bg-green-500/20 border border-green-500/30 text-green-400 rounded-lg text-sm font-medium hover:bg-green-500/30 transition-all"
              title="View shift report"
            >
              <FileText className="w-4 h-4" />
              Report
            </button>
            <button
              className="flex items-center gap-2 px-3 py-2 bg-slate-700/40 border border-slate-600/50 text-slate-300 rounded-lg text-sm font-medium hover:bg-slate-700/60 transition-all"
              title="Search call history"
            >
              <Search className="w-4 h-4" />
              Search
            </button>
            <div className="px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg flex items-center gap-3">
              <div>
                <div className="text-xs text-slate-400">Last Update</div>
                <div className="text-sm text-white font-medium">14:35:42</div>
              </div>
              <div className="flex items-center gap-1 text-emerald-400">
                <RefreshCw className="w-3 h-3 animate-spin" />
                <span className="text-xs">Auto</span>
              </div>
            </div>
          </div>
        </div>

        {/* AI Insights Banner */}
        {aiInsightsVisible && (
          <div className="mb-6 bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-500/20 rounded-xl p-5">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-6 h-6 text-purple-400" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <h4 className="text-base font-semibold text-white">AI Insights - Field Operations</h4>
                    <span className="text-xs text-slate-400 bg-slate-800 px-2 py-0.5 rounded">Updated 14:35</span>
                  </div>
                  <button
                    onClick={() => setAiInsightsVisible(false)}
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  {/* Critical Section */}
                  <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Siren className="w-4 h-4 text-red-400" />
                      <h5 className="text-sm font-bold text-red-400">CRITICAL ALERTS</h5>
                    </div>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-white font-medium">P1 DV-Weapons Active</p>
                          <p className="text-slate-400 text-xs">4720 Lawrenceville Hwy - 3 min elapsed</p>
                          <p className="text-red-300 text-xs mt-1">Units 247, 251 en route - ETA 2 min</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Users className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-white font-medium">Low Unit Availability</p>
                          <p className="text-slate-400 text-xs">Only 3 of 15 units available (20%)</p>
                          <p className="text-amber-300 text-xs mt-1">Recommend: Clear P3 calls faster</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-white font-medium">Hot Zone: Lawrenceville Hwy</p>
                          <p className="text-slate-400 text-xs">3 concurrent calls in corridor</p>
                          <p className="text-blue-300 text-xs mt-1">Consider zone saturation patrol</p>
                        </div>
                      </div>
                    </div>
                    <button className="mt-3 w-full text-xs text-red-400 hover:text-red-300 font-medium flex items-center justify-center gap-1">
                      View All Alerts <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>

                  {/* Monitoring Section */}
                  <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Eye className="w-4 h-4 text-amber-400" />
                      <h5 className="text-sm font-bold text-amber-400">MONITORING</h5>
                    </div>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-start gap-2">
                        <Timer className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-white font-medium">Response Time Trend</p>
                          <p className="text-slate-400 text-xs">P1 avg: 3.2 min (target &lt;5 min)</p>
                          <p className="text-emerald-300 text-xs mt-1">On target - Good performance</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Clock className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-white font-medium">Calls Holding Extended</p>
                          <p className="text-slate-400 text-xs">1 call over 1 hour (Parking)</p>
                          <p className="text-amber-300 text-xs mt-1">Assign when unit clears</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Activity className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-white font-medium">Shift Change Approaching</p>
                          <p className="text-slate-400 text-xs">B-Shift starts in 85 min</p>
                          <p className="text-blue-300 text-xs mt-1">Prepare handoff briefing</p>
                        </div>
                      </div>
                    </div>
                    <button className="mt-3 w-full text-xs text-amber-400 hover:text-amber-300 font-medium flex items-center justify-center gap-1">
                      View Details <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>

                  {/* Operational Status */}
                  <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                      <h5 className="text-sm font-bold text-emerald-400">OPERATIONAL STATUS</h5>
                    </div>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-start gap-2">
                        <Car className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-white font-medium">Unit Deployment</p>
                          <p className="text-slate-400 text-xs">9 deployed, 3 available, 3 OOS</p>
                          <p className="text-emerald-300 text-xs mt-1">Coverage: Adequate</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Target className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-white font-medium">P1 Coverage</p>
                          <p className="text-slate-400 text-xs">All P1 calls have assigned units</p>
                          <p className="text-emerald-300 text-xs mt-1">Emergency response active</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Gauge className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-white font-medium">Today's Clearance</p>
                          <p className="text-slate-400 text-xs">39/47 calls cleared (83%)</p>
                          <p className="text-emerald-300 text-xs mt-1">Above daily target (80%)</p>
                        </div>
                      </div>
                    </div>
                    <button className="mt-3 w-full text-xs text-emerald-400 hover:text-emerald-300 font-medium flex items-center justify-center gap-1">
                      Full Status <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-purple-500/20 flex items-center justify-between">
                  <div className="flex items-center gap-4 text-xs text-slate-400">
                    <span className="flex items-center gap-1"><Wifi className="w-3 h-3 text-emerald-400" /> CAD Connected</span>
                    <span className="flex items-center gap-1"><Signal className="w-3 h-3 text-emerald-400" /> Radio: All Clear</span>
                    <span>Analysis based on real-time dispatch data</span>
                  </div>
                  <button className="text-sm text-purple-400 hover:text-purple-300 font-medium flex items-center gap-1">
                    View Detailed Recommendations <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
          {/* Active Calls Card */}
          <div className="bg-slate-800 border border-blue-500/30 rounded-lg p-4 hover:border-blue-500/50 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-slate-400">Active Calls</div>
              <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <Radio className="w-4 h-4 text-blue-400" />
              </div>
            </div>
            <div className="text-3xl font-bold text-white mb-1">{stats.totalCalls}</div>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Dispatched:</span>
                <span className="text-blue-400 font-medium">2</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">En Route:</span>
                <span className="text-amber-400 font-medium">3</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">On Scene:</span>
                <span className="text-purple-400 font-medium">4</span>
              </div>
            </div>
            <div className="mt-2 pt-2 border-t border-slate-700 flex items-center justify-between text-xs">
              <span className="text-amber-400 font-bold">CALL LOAD: HIGH</span>
              <span className="text-slate-500 flex items-center gap-1"><TrendingUp className="w-3 h-3" />+2 / 15m</span>
            </div>
          </div>

          {/* P1 Card */}
          <div className="bg-slate-800 border border-red-500/30 rounded-lg p-4 hover:border-red-500/50 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-slate-400">Priority 1</div>
              <div className="w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center">
                <Siren className="w-4 h-4 text-red-400" />
              </div>
            </div>
            <div className="text-3xl font-bold text-red-400 mb-1">{stats.priority1}</div>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Avg Response:</span>
                <span className="text-emerald-400 font-medium">3.2 min</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Target:</span>
                <span className="text-slate-400">&lt;5 min</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Today Total:</span>
                <span className="text-white font-medium">8 calls</span>
              </div>
            </div>
            <div className="mt-2 pt-2 border-t border-slate-700 flex items-center gap-1 text-xs">
              <Circle className="w-2 h-2 fill-emerald-400 text-emerald-400" />
              <span className="text-emerald-400 font-bold">RESPONSE: ON TARGET</span>
            </div>
          </div>

          {/* P2 Card */}
          <div className="bg-slate-800 border border-amber-500/30 rounded-lg p-4 hover:border-amber-500/50 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-slate-400">Priority 2</div>
              <div className="w-8 h-8 bg-amber-500/20 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
              </div>
            </div>
            <div className="text-3xl font-bold text-amber-400 mb-1">{stats.priority2}</div>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Avg Response:</span>
                <span className="text-emerald-400 font-medium">7.8 min</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Target:</span>
                <span className="text-slate-400">&lt;10 min</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Today Total:</span>
                <span className="text-white font-medium">23 calls</span>
              </div>
            </div>
            <div className="mt-2 pt-2 border-t border-slate-700 flex items-center gap-1 text-xs">
              <Circle className="w-2 h-2 fill-emerald-400 text-emerald-400" />
              <span className="text-emerald-400 font-bold">RESPONSE: ON TARGET</span>
            </div>
          </div>

          {/* Units Available Card */}
          <div className="bg-slate-800 border border-emerald-500/30 rounded-lg p-4 hover:border-emerald-500/50 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-slate-400">Units Available</div>
              <div className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
              </div>
            </div>
            <div className="text-3xl font-bold text-emerald-400 mb-1">{stats.unitsAvailable}</div>
            <div className="space-y-1 text-xs">
              <div className="text-slate-400">Ready to dispatch:</div>
              <div className="flex flex-wrap gap-1">
                <span className="px-1.5 py-0.5 bg-emerald-500/20 text-emerald-400 rounded text-xs">A-234</span>
                <span className="px-1.5 py-0.5 bg-emerald-500/20 text-emerald-400 rounded text-xs">A-238</span>
                <span className="px-1.5 py-0.5 bg-emerald-500/20 text-emerald-400 rounded text-xs">A-240</span>
              </div>
            </div>
            <div className="mt-2 pt-2 border-t border-slate-700 flex items-center gap-1 text-xs">
              <Circle className="w-2 h-2 fill-red-400 text-red-400" />
              <span className="text-red-400 font-bold">COVERAGE: CRITICAL</span>
            </div>
          </div>

          {/* Units Deployed Card */}
          <div className="bg-slate-800 border border-purple-500/30 rounded-lg p-4 hover:border-purple-500/50 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-slate-400">Units Deployed</div>
              <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <Car className="w-4 h-4 text-purple-400" />
              </div>
            </div>
            <div className="text-3xl font-bold text-white mb-1">{stats.unitsDeployed}</div>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">On P1 calls:</span>
                <span className="text-red-400 font-medium">2</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">On P2 calls:</span>
                <span className="text-amber-400 font-medium">5</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">On P3 calls:</span>
                <span className="text-blue-400 font-medium">2</span>
              </div>
            </div>
            <div className="mt-2 pt-2 border-t border-slate-700 text-xs text-slate-400">
              Avg time on call: 18 min
            </div>
          </div>

          {/* Out of Service Card */}
          <div className="bg-slate-800 border border-slate-600/50 rounded-lg p-4 hover:border-slate-500/50 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-slate-400">Out of Service</div>
              <div className="w-8 h-8 bg-slate-700/50 rounded-lg flex items-center justify-center">
                <XCircle className="w-4 h-4 text-slate-400" />
              </div>
            </div>
            <div className="text-3xl font-bold text-slate-400 mb-1">{stats.unitsOutOfService}</div>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Fueling:</span>
                <span className="text-slate-300">1 (A-235)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Break:</span>
                <span className="text-slate-300">1 (A-242)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Maintenance:</span>
                <span className="text-slate-300">1 (A-257)</span>
              </div>
            </div>
            <div className="mt-2 pt-2 border-t border-slate-700 flex items-center gap-1 text-xs">
              <Clock className="w-3 h-3 text-blue-400" />
              <span className="text-blue-400">A-235 back in 8 min</span>
            </div>
          </div>
        </div>

        {/* Calls Holding Section */}
        {holdingCalls.length > 0 && (
          <div className="mb-6 bg-amber-500/10 border border-amber-500/30 rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-500/20 rounded-xl flex items-center justify-center">
                  <Timer className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Calls Holding</h3>
                  <p className="text-sm text-slate-400">Awaiting unit assignment</p>
                </div>
                <span className="px-3 py-1 bg-amber-500/20 border border-amber-500/30 text-amber-400 rounded-full text-sm font-bold">
                  {holdingCalls.length} calls
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button className="px-3 py-2 bg-blue-500/20 border border-blue-500/30 text-blue-400 rounded-lg text-sm hover:bg-blue-500/30 flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Auto-Assign
                </button>
              </div>
            </div>

            <div className="space-y-3">
              {holdingCalls.map((call, idx) => (
                <div key={idx} className={`bg-slate-900/70 border rounded-lg p-4 ${call.holdTime.includes('hr') ? 'border-red-500/30' : 'border-amber-500/20'}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <span className={`px-2.5 py-1 rounded text-xs font-bold border ${getPriorityColor(call.priority)}`}>
                        {call.priority}
                      </span>
                      <div>
                        <div className="text-white font-semibold">{call.type}</div>
                        <div className="flex items-center gap-2 mt-1 text-sm text-slate-400">
                          <MapPin className="w-3 h-3" />
                          <span>{call.location}</span>
                        </div>
                        <div className="text-xs text-slate-500 mt-1">Call #{call.callNumber}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-xs text-slate-400 mb-1">Hold Time</div>
                        <div className={`text-lg font-bold flex items-center gap-1 ${call.holdTime.includes('hr') ? 'text-red-400' : 'text-amber-400'}`}>
                          <Clock className="w-4 h-4" />
                          {call.holdTime}
                        </div>
                        {call.holdTime.includes('hr') && (
                          <div className="text-xs text-red-400 mt-1 flex items-center gap-1">
                            <AlertTriangle className="w-3 h-3" />
                            Overdue
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col gap-2">
                        <button className="px-4 py-2 bg-blue-500/20 border border-blue-500/30 text-blue-400 rounded-lg text-xs font-medium hover:bg-blue-500/30 flex items-center gap-1">
                          <Send className="w-3 h-3" />
                          Assign Now
                        </button>
                        <button className="px-4 py-2 bg-slate-700/40 border border-slate-600/50 text-slate-300 rounded-lg text-xs hover:bg-slate-700/60 flex items-center gap-1">
                          <XCircle className="w-3 h-3" />
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Decision support layer */}
                  <div className="mt-3 pt-3 border-t border-slate-700/50 space-y-2">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <p className="text-[9px] text-slate-500 uppercase tracking-wider font-semibold mb-0.5">Risk if Not Handled</p>
                        <p className="text-[11px] text-amber-300 leading-snug">
                          {idx === 0 ? 'Fire lane blocked — liability if emergency vehicle access needed' : 'Property left unclaimed — chain-of-custody risk beyond 2 hrs'}
                        </p>
                      </div>
                      <div>
                        <p className="text-[9px] text-slate-500 uppercase tracking-wider font-semibold mb-0.5">Recommended Action</p>
                        <p className="text-[11px] text-slate-300 leading-snug">
                          {idx === 0 ? 'Assign A-234 (Zone 3) — lowest workload, nearest available' : 'Assign A-238 (Zone 1) — 8 min ETA, completing patrol'}
                        </p>
                      </div>
                    </div>
                    {/* Smart assign suggestion */}
                    <div className="flex items-center justify-between text-xs bg-emerald-500/5 border border-emerald-500/15 rounded-lg px-2.5 py-1.5">
                      <div className="flex items-center gap-2 text-slate-400">
                        <Car className="w-3 h-3 text-emerald-400" />
                        <span>Recommended unit:</span>
                        <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 rounded font-medium">
                          {idx === 0 ? 'A-234' : 'A-238'}
                        </span>
                        <span className="text-slate-500">ETA {idx === 0 ? '6' : '8'} min</span>
                        <span className="text-slate-600">·</span>
                        <span className="text-slate-500">{idx === 0 ? 'Zone 3 — 0 active calls' : 'Zone 1 — 0 active calls'}</span>
                      </div>
                      <button className="text-blue-400 hover:text-blue-300 font-medium flex items-center gap-1">
                        Assign <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-amber-500/20 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-xl font-bold text-white">{holdingCalls.length}</div>
                <div className="text-xs text-slate-400">Total Holding</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-amber-400">58 min</div>
                <div className="text-xs text-slate-400">Avg Hold Time</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-red-400">1</div>
                <div className="text-xs text-slate-400">Over 1 Hour</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-emerald-400">{stats.unitsAvailable}</div>
                <div className="text-xs text-slate-400">Units Available</div>
              </div>
            </div>
          </div>
        )}

        {/* Shift Status Section */}
        <div className="mb-6 bg-slate-800 border border-slate-700 rounded-xl overflow-hidden">
          <button
            onClick={() => setShowShiftStatus(!showShiftStatus)}
            className="w-full flex items-center justify-between p-5 hover:bg-slate-700/30 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
                <Clock className="w-5 h-5 text-blue-400" />
              </div>
              <div className="text-left">
                <h3 className="text-lg font-bold text-white">Shift Status</h3>
                <p className="text-sm text-slate-400">A-Shift ends in 1 hr 25 min</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 rounded-full text-xs font-semibold">
                B-Shift Ready
              </span>
              <ChevronRight className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${showShiftStatus ? 'rotate-90' : ''}`} />
            </div>
          </button>

          {showShiftStatus && (
            <div className="p-5 pt-0 border-t border-slate-700/50">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                {/* Current Shift */}
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Circle className="w-3 h-3 fill-blue-400 text-blue-400" />
                    <span className="text-sm font-semibold text-blue-400">CURRENT SHIFT</span>
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">A-Shift</div>
                  <div className="text-lg text-slate-300">06:00 - 14:00</div>
                  <div className="mt-3 pt-3 border-t border-blue-500/20">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-400">Time Remaining:</span>
                      <span className="text-amber-400 font-bold">1 hr 25 min</span>
                    </div>
                    <div className="flex items-center justify-between text-sm mt-1">
                      <span className="text-slate-400">Supervisor:</span>
                      <span className="text-white">Sgt. Mitchell</span>
                    </div>
                  </div>
                </div>

                {/* Next Shift */}
                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <ArrowRight className="w-3 h-3 text-emerald-400" />
                    <span className="text-sm font-semibold text-emerald-400">NEXT SHIFT</span>
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">B-Shift</div>
                  <div className="text-lg text-slate-300">14:00 - 22:00</div>
                  <div className="mt-3 pt-3 border-t border-emerald-500/20">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-400">Staffing:</span>
                      <span className="text-emerald-400 font-bold flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" /> 14/14
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm mt-1">
                      <span className="text-slate-400">Supervisor:</span>
                      <span className="text-white">Sgt. Rodriguez</span>
                    </div>
                  </div>
                </div>

                {/* Handoff Checklist */}
                <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <FileText className="w-4 h-4 text-purple-400" />
                    <span className="text-sm font-semibold text-purple-400">HANDOFF CHECKLIST</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                      <span className="text-slate-300">Active calls briefed</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                      <span className="text-slate-300">Holding calls noted</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                      <span className="text-slate-300">Equipment checked</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Circle className="w-4 h-4 text-slate-500" />
                      <span className="text-slate-400">Final report pending</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Handoff Details */}
              <div className="mt-4 bg-slate-900/30 border border-slate-700/50 rounded-xl p-4">
                <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                  <Bell className="w-4 h-4 text-amber-400" />
                  Transfer Summary for B-Shift
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="text-center p-2 bg-slate-800/50 rounded-lg">
                    <div className="text-xl font-bold text-white">{stats.totalCalls}</div>
                    <div className="text-xs text-slate-400">Active Calls</div>
                  </div>
                  <div className="text-center p-2 bg-slate-800/50 rounded-lg">
                    <div className="text-xl font-bold text-amber-400">{holdingCalls.length}</div>
                    <div className="text-xs text-slate-400">Calls Holding</div>
                  </div>
                  <div className="text-center p-2 bg-slate-800/50 rounded-lg">
                    <div className="text-xl font-bold text-red-400">{stats.priority1}</div>
                    <div className="text-xs text-slate-400">P1 In Progress</div>
                  </div>
                  <div className="text-center p-2 bg-slate-800/50 rounded-lg">
                    <div className="text-xl font-bold text-emerald-400">{stats.unitsAvailable}</div>
                    <div className="text-xs text-slate-400">Units Available</div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 px-4 py-2 bg-blue-500/20 border border-blue-500/30 text-blue-400 rounded-lg text-sm font-medium hover:bg-blue-500/30 flex items-center justify-center gap-2">
                    <FileText className="w-4 h-4" />
                    View Shift Report
                  </button>
                  <button className="flex-1 px-4 py-2 bg-purple-500/20 border border-purple-500/30 text-purple-400 rounded-lg text-sm font-medium hover:bg-purple-500/30 flex items-center justify-center gap-2">
                    <Bell className="w-4 h-4" />
                    Notify B-Shift
                  </button>
                  <button className="px-4 py-2 bg-slate-700/40 border border-slate-600/50 text-slate-300 rounded-lg text-sm hover:bg-slate-700/60">
                    <Phone className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Today's Metrics Section */}
        <div className="mb-6 bg-slate-800 border border-slate-700 rounded-xl overflow-hidden">
          <button
            onClick={() => setShowMetrics(!showMetrics)}
            className="w-full flex items-center justify-between p-5 hover:bg-slate-700/30 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-purple-400" />
              </div>
              <div className="text-left">
                <h3 className="text-lg font-bold text-white">Today's Metrics</h3>
                <p className="text-sm text-slate-400">{todaysMetrics.totalCallsToday} calls today • {todaysMetrics.clearanceRate}% cleared</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-2 text-xs">
                <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded">Response: On Target</span>
              </div>
              <ChevronRight className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${showMetrics ? 'rotate-90' : ''}`} />
            </div>
          </button>

          {showMetrics && (
            <div className="p-5 pt-0 border-t border-slate-700/50">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
                {/* Call Volume */}
                <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/20 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Radio className="w-4 h-4 text-blue-400" />
                    <h4 className="text-sm font-semibold text-blue-400">CALL VOLUME</h4>
                  </div>
                  <div className="text-4xl font-bold text-white mb-3">{todaysMetrics.totalCallsToday}</div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                        <span className="text-slate-400">P1 Emergency:</span>
                      </div>
                      <span className="text-red-400 font-semibold">{todaysMetrics.p1Calls}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                        <span className="text-slate-400">P2 Urgent:</span>
                      </div>
                      <span className="text-amber-400 font-semibold">{todaysMetrics.p2Calls}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                        <span className="text-slate-400">P3 Routine:</span>
                      </div>
                      <span className="text-blue-400 font-semibold">{todaysMetrics.p3Calls}</span>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-blue-500/20 flex items-center gap-1 text-xs text-emerald-400">
                    <TrendingUp className="w-3 h-3" />
                    <span>+12% vs yesterday</span>
                  </div>
                </div>

                {/* Response Times */}
                <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border border-emerald-500/20 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Timer className="w-4 h-4 text-emerald-400" />
                    <h4 className="text-sm font-semibold text-emerald-400">RESPONSE TIMES</h4>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-slate-900/50 rounded-lg p-2">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-slate-400">P1 Emergency</span>
                        <span className="text-emerald-400 font-bold">{todaysMetrics.avgResponseTimeP1} min</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-1.5">
                        <div className="bg-emerald-400 h-1.5 rounded-full" style={{width: '64%'}}></div>
                      </div>
                      <div className="text-xs text-slate-500 mt-1">Target: &lt;5 min</div>
                    </div>
                    <div className="bg-slate-900/50 rounded-lg p-2">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-slate-400">P2 Urgent</span>
                        <span className="text-emerald-400 font-bold">{todaysMetrics.avgResponseTimeP2} min</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-1.5">
                        <div className="bg-emerald-400 h-1.5 rounded-full" style={{width: '78%'}}></div>
                      </div>
                      <div className="text-xs text-slate-500 mt-1">Target: &lt;10 min</div>
                    </div>
                    <div className="bg-slate-900/50 rounded-lg p-2">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-slate-400">P3 Routine</span>
                        <span className="text-emerald-400 font-bold">{todaysMetrics.avgResponseTimeP3} min</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-1.5">
                        <div className="bg-emerald-400 h-1.5 rounded-full" style={{width: '73%'}}></div>
                      </div>
                      <div className="text-xs text-slate-500 mt-1">Target: &lt;20 min</div>
                    </div>
                  </div>
                </div>

                {/* Clearance Rate */}
                <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-500/20 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle className="w-4 h-4 text-purple-400" />
                    <h4 className="text-sm font-semibold text-purple-400">CLEARANCE RATE</h4>
                  </div>
                  <div className="flex items-end gap-2 mb-3">
                    <div className="text-4xl font-bold text-emerald-400">{todaysMetrics.clearanceRate}%</div>
                    <div className="text-sm text-emerald-400 mb-1 flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      +3%
                    </div>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-3 mb-3">
                    <div className="bg-gradient-to-r from-emerald-500 to-emerald-400 h-3 rounded-full" style={{width: `${todaysMetrics.clearanceRate}%`}}></div>
                  </div>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Cleared:</span>
                      <span className="text-emerald-400 font-semibold">{todaysMetrics.callsCleared}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Active:</span>
                      <span className="text-amber-400 font-semibold">{stats.totalCalls}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Holding:</span>
                      <span className="text-red-400 font-semibold">{holdingCalls.length}</span>
                    </div>
                  </div>
                </div>

                {/* Handling Time */}
                <div className="bg-gradient-to-br from-amber-500/10 to-amber-600/5 border border-amber-500/20 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Clock className="w-4 h-4 text-amber-400" />
                    <h4 className="text-sm font-semibold text-amber-400">HANDLING TIME</h4>
                  </div>
                  <div className="text-4xl font-bold text-white mb-1">{todaysMetrics.avgHandlingTime}</div>
                  <div className="text-sm text-slate-400 mb-3">minutes average</div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm bg-slate-900/50 rounded-lg p-2">
                      <span className="text-slate-400">P1 Handling:</span>
                      <span className="text-white font-semibold">28 min</span>
                    </div>
                    <div className="flex items-center justify-between text-sm bg-slate-900/50 rounded-lg p-2">
                      <span className="text-slate-400">P2 Handling:</span>
                      <span className="text-white font-semibold">24 min</span>
                    </div>
                    <div className="flex items-center justify-between text-sm bg-slate-900/50 rounded-lg p-2">
                      <span className="text-slate-400">P3 Handling:</span>
                      <span className="text-white font-semibold">15 min</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Unit Performance */}
              <div className="mt-4 bg-slate-900/30 border border-slate-700/50 rounded-xl p-4">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                    <Target className="w-4 h-4 text-amber-400" />
                    Top Performing Units Today
                  </h4>
                  <button className="text-xs text-blue-400 hover:text-blue-300">View All Units</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {unitPerformance.map((perf, idx) => (
                    <div key={idx} className={`bg-slate-800/70 border rounded-xl p-4 ${
                      idx === 0 ? 'border-amber-500/30' : 'border-slate-700/50'
                    }`}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {idx === 0 && <span className="text-amber-400 text-lg">1st</span>}
                          {idx === 1 && <span className="text-slate-300 text-lg">2nd</span>}
                          {idx === 2 && <span className="text-amber-700 text-lg">3rd</span>}
                          <span className="text-white font-bold text-lg">{perf.unit}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-2xl font-bold text-amber-400">{perf.calls}</span>
                          <span className="text-xs text-slate-400 ml-1">calls</span>
                        </div>
                      </div>
                      <div className="text-sm text-slate-400 mb-2">{perf.officer}</div>
                      <div className="flex items-center gap-2 text-xs">
                        <Zap className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400">Fastest: {perf.fastestResponse} min response</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Active Calls - Left Column (2/3 width) */}
          <div className="lg:col-span-2">
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-amber-500/20 rounded-xl flex items-center justify-center">
                    <Radio className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">Active Calls for Service</h2>
                    <p className="text-sm text-slate-400">Real-time dispatch tracking</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="px-2 py-1 bg-red-500/20 text-red-400 rounded text-xs font-bold">P1: {stats.priority1}</span>
                    <span className="px-2 py-1 bg-amber-500/20 text-amber-400 rounded text-xs font-bold">P2: {stats.priority2}</span>
                    <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs font-bold">P3: {activeCalls.filter(c => c.priority === 'P3').length}</span>
                  </div>
                  <button className="px-3 py-1.5 bg-slate-700/50 border border-slate-600 text-slate-300 rounded-lg text-xs hover:bg-slate-700">
                    <BarChart3 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                {activeCalls.filter(c => c.status !== 'Holding').map((call) => (
                  <div
                    key={call.id}
                    onClick={() => setSelectedCall(call)}
                    className={`rounded-xl p-4 cursor-pointer transition-all hover:shadow-lg ${
                      call.priority === 'P1' ? 'bg-red-500/10 border-2 border-red-500/50 hover:border-red-500/70 shadow-red-500/5 shadow-md' :
                      call.priority === 'P2' ? 'bg-amber-500/5 border border-amber-500/30 hover:border-amber-500/50' :
                      'bg-slate-900/50 border border-slate-700/30 hover:border-slate-600'
                    }`}
                  >
                    {call.priority === 'P1' && (
                      <div className="flex items-center gap-2 mb-2.5 -mx-1">
                        <span className="flex items-center gap-1.5 px-2.5 py-1 bg-red-500/25 border border-red-500/40 text-red-300 rounded-lg text-[10px] font-bold uppercase tracking-widest">
                          <Siren className="w-3 h-3" /> EMERGENCY RESPONSE ACTIVE
                        </span>
                        {call.supervisorNotified && (
                          <span className="text-[10px] text-purple-400 font-semibold">· Supervisor Notified</span>
                        )}
                      </div>
                    )}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          call.priority === 'P1' ? 'bg-red-500/30' :
                          call.priority === 'P2' ? 'bg-amber-500/20' :
                          'bg-blue-500/20'
                        }`}>
                          <span className={`text-lg font-bold ${
                            call.priority === 'P1' ? 'text-red-300' :
                            call.priority === 'P2' ? 'text-amber-400' :
                            'text-blue-400'
                          }`}>{call.priority}</span>
                        </div>
                        <div>
                          <div className={`font-semibold text-lg ${call.priority === 'P1' ? 'text-red-100' : 'text-white'}`}>{call.type}</div>
                          <div className="flex items-center gap-2 text-xs text-slate-400">
                            <span>Call #{call.callNumber}</span>
                            {call.zone && (
                              <>
                                <span className="text-slate-600">|</span>
                                <span>{call.zone}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-2xl font-bold ${call.elapsed.includes('hr') ? 'text-red-400' : call.elapsed.includes('min') && parseInt(call.elapsed) > 20 ? 'text-amber-400' : 'text-white'}`}>
                          {call.elapsed}
                        </div>
                        <div className="text-xs text-slate-400">elapsed</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                      <div className="bg-slate-900/50 rounded-lg p-2.5">
                        <div className="flex items-start gap-2">
                          <MapPin className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                          <div>
                            <div className="text-white text-sm font-medium">{call.location}</div>
                            {call.crossStreets && (
                              <div className="text-xs text-slate-400 mt-0.5">Cross: {call.crossStreets}</div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="bg-slate-900/50 rounded-lg p-2.5">
                        <div className="flex items-start gap-2">
                          <Clock className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                          <div>
                            <div className="text-white text-sm font-medium">Received: {call.callTime}</div>
                            {call.dispatchTime && (
                              <div className="text-xs text-slate-400 mt-0.5">Dispatched: {call.dispatchTime}</div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Badges for special conditions */}
                    {(call.backupRequested || call.supervisorNotified || call.priorCallsAtLocation! > 0 || call.weaponsRegistered) && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {call.backupRequested && (
                          <span className="px-2 py-1 bg-red-500/20 border border-red-500/30 text-red-400 rounded-lg text-xs font-semibold flex items-center gap-1">
                            <Shield className="w-3 h-3" />
                            BACKUP REQUESTED
                          </span>
                        )}
                        {call.supervisorNotified && (
                          <span className="px-2 py-1 bg-purple-500/20 border border-purple-500/30 text-purple-400 rounded-lg text-xs font-semibold flex items-center gap-1">
                            <User className="w-3 h-3" />
                            SUPERVISOR NOTIFIED
                          </span>
                        )}
                        {call.priorCallsAtLocation! > 0 && (
                          <span className="px-2 py-1 bg-amber-500/20 border border-amber-500/30 text-amber-400 rounded-lg text-xs font-semibold flex items-center gap-1">
                            <History className="w-3 h-3" />
                            {call.priorCallsAtLocation} PRIOR CALLS
                          </span>
                        )}
                        {call.weaponsRegistered && (
                          <span className="px-2 py-1 bg-red-500/20 border border-red-500/30 text-red-400 rounded-lg text-xs font-semibold flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            WEAPONS FLAGGED
                          </span>
                        )}
                      </div>
                    )}

                    {/* Risk + Escalation layer for P1/P2 */}
                    {(call.priority === 'P1' || call.priority === 'P2') && (() => {
                      const risk = getCallRisk(call);
                      return (
                        <div className={`mb-3 rounded-lg px-3 py-2.5 ${
                          call.priority === 'P1' ? 'bg-red-950/40 border border-red-500/20' : 'bg-amber-500/5 border border-amber-500/15'
                        }`}>
                          <div className={`grid gap-x-4 gap-y-1.5 ${risk.delayRisk ? 'grid-cols-2' : 'grid-cols-1'}`}>
                            {risk.delayRisk && (
                              <div>
                                <p className="text-[9px] text-slate-500 uppercase tracking-wider font-semibold mb-0.5">Risk if Delayed</p>
                                <p className="text-[11px] text-amber-200 leading-snug">{risk.delayRisk}</p>
                              </div>
                            )}
                            <div>
                              <p className="text-[9px] text-slate-500 uppercase tracking-wider font-semibold mb-0.5">Escalation Likelihood</p>
                              <div className="flex items-center gap-1.5">
                                <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase ${
                                  risk.escalation === 'High' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                                  risk.escalation === 'Medium' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                                  'bg-slate-700/40 text-slate-400 border border-slate-700/50'
                                }`}>{risk.escalation}</span>
                                <p className="text-[10px] text-slate-400 leading-snug">{risk.escalationText}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })()}
                    <div className="flex items-center justify-between pt-3 border-t border-slate-700/50">
                      <div className="flex items-center gap-3 flex-wrap">
                        <div className="flex items-center gap-2">
                          <Car className="w-4 h-4 text-blue-400" />
                          <span className="text-sm text-slate-400">Units:</span>
                        </div>
                        {call.assignedUnits.length > 0 ? (
                          <div className="flex gap-1">
                            {call.assignedUnits.map((unit, idx) => {
                              const unitData = patrolUnits.find(u => u.id === unit);
                              return (
                                <div key={idx} className="px-2 py-1 bg-blue-500/20 border border-blue-500/30 text-blue-400 rounded-lg text-xs">
                                  <span className="font-medium">A-{unit}</span>
                                  {unitData?.eta && <span className="text-blue-300 ml-1">({unitData.eta})</span>}
                                </div>
                              );
                            })}
                          </div>
                        ) : (
                          <span className="px-2 py-1 bg-red-500/20 border border-red-500/30 text-red-400 rounded-lg text-xs font-semibold">
                            NO UNITS ASSIGNED
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${getStatusColor(call.status)}`}>
                          {call.status}
                        </span>
                        <button
                          className="p-1.5 bg-slate-700/50 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white transition-colors"
                          onClick={(e) => { e.stopPropagation(); setSelectedCall(call); }}
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Unit Status - Right Column */}
          <div className="lg:col-span-1">
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-5 sticky top-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-white">Unit Status</h2>
                    <p className="text-xs text-slate-400">{patrolUnits.length} units on duty</p>
                  </div>
                </div>
              </div>

              {/* Quick Status Summary */}
              <div className="grid grid-cols-4 gap-2 mb-4 p-2 bg-slate-900/50 rounded-lg">
                <div className="text-center">
                  <div className="text-lg font-bold text-emerald-400">{stats.unitsAvailable}</div>
                  <div className="text-xs text-slate-500">Avail</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-amber-400">{patrolUnits.filter(u => u.status === 'En Route').length}</div>
                  <div className="text-xs text-slate-500">Route</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-purple-400">{patrolUnits.filter(u => u.status === 'On Scene').length}</div>
                  <div className="text-xs text-slate-500">Scene</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-slate-400">{stats.unitsOutOfService}</div>
                  <div className="text-xs text-slate-500">OOS</div>
                </div>
              </div>

              <div className="space-y-2 max-h-[700px] overflow-y-auto pr-1">
                {patrolUnits.map((unit) => (
                  <div
                    key={unit.id}
                    className={`border rounded-lg p-3 transition-all hover:shadow-md ${
                      unit.status === 'Available' ? 'bg-emerald-500/5 border-emerald-500/30 hover:border-emerald-500/50' :
                      unit.status === 'En Route' ? 'bg-amber-500/5 border-amber-500/30 hover:border-amber-500/50' :
                      unit.status === 'On Scene' ? 'bg-purple-500/5 border-purple-500/30 hover:border-purple-500/50' :
                      unit.status === 'Dispatched' ? 'bg-blue-500/5 border-blue-500/30 hover:border-blue-500/50' :
                      'bg-slate-900/50 border-slate-700 hover:border-slate-600'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${
                          unit.status === 'Available' ? 'bg-emerald-500/20 text-emerald-400' :
                          unit.status === 'En Route' ? 'bg-amber-500/20 text-amber-400' :
                          unit.status === 'On Scene' ? 'bg-purple-500/20 text-purple-400' :
                          unit.status === 'Dispatched' ? 'bg-blue-500/20 text-blue-400' :
                          'bg-slate-700 text-slate-400'
                        }`}>
                          {unit.callSign.split('-')[1]}
                        </div>
                        <div>
                          <div className="font-bold text-white text-sm">{unit.callSign}</div>
                          <div className="text-xs text-slate-500">{unit.badge}</div>
                        </div>
                      </div>
                      <span className={`px-2 py-0.5 rounded-lg text-xs font-semibold ${getStatusColor(unit.status)}`}>
                        {unit.status === 'Out of Service' ? 'OOS' : unit.status}
                      </span>
                    </div>

                    <div className="text-sm text-slate-300 mb-2 truncate" title={unit.officer}>{unit.officer}</div>

                    {unit.currentCall && (
                      <div className="mb-2 p-2 bg-slate-900/50 rounded-lg">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-400">Call:</span>
                          <div className="flex items-center gap-1.5">
                            <span className="text-amber-400 font-medium">{unit.currentCall}</span>
                            {(() => {
                              const assignedCall = activeCalls.find(c => c.callNumber === unit.currentCall);
                              return assignedCall ? (
                                <span className={`text-[9px] px-1 py-0.5 rounded font-bold ${
                                  assignedCall.priority === 'P1' ? 'bg-red-500/20 text-red-400' :
                                  assignedCall.priority === 'P2' ? 'bg-amber-500/20 text-amber-400' :
                                  'bg-blue-500/20 text-blue-400'
                                }`}>{assignedCall.priority}</span>
                              ) : null;
                            })()}
                          </div>
                        </div>
                        {unit.eta && (
                          <div className="flex items-center justify-between text-xs mt-1">
                            <span className="text-slate-400">ETA:</span>
                            <span className="text-blue-400 font-medium">{unit.eta}</span>
                          </div>
                        )}
                      </div>
                    )}
                    {isReassignCandidate(unit) && (
                      <div className="mb-2 flex items-center justify-between px-2 py-1 bg-amber-500/8 border border-amber-500/20 rounded-lg">
                        <span className="text-[10px] text-amber-400 font-bold flex items-center gap-1">
                          <ArrowRight className="w-3 h-3" /> Reassign Candidate
                        </span>
                        <span className="text-[9px] text-slate-500">P3 — can redeploy</span>
                      </div>
                    )}

                    {unit.status === 'Out of Service' && unit.oosReason && (
                      <div className="mb-2 p-2 bg-slate-700/30 rounded-lg">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-400">Reason:</span>
                          <span className="text-slate-300">{unit.oosReason}</span>
                        </div>
                        {unit.oosETA && (
                          <div className="flex items-center justify-between text-xs mt-1">
                            <span className="text-slate-400">Back in:</span>
                            <span className="text-blue-400 font-medium">{unit.oosETA}</span>
                          </div>
                        )}
                      </div>
                    )}

                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-xs text-slate-400">
                        <Navigation className="w-3 h-3 flex-shrink-0" />
                        <span className="truncate" title={unit.location}>{unit.location}</span>
                      </div>
                      {unit.speed && unit.direction && (
                        <div className="flex items-center gap-2 text-xs">
                          <span className="text-blue-400">{unit.speed} mph {unit.direction}</span>
                          <span className="text-slate-600">|</span>
                          <span className="text-slate-500">{unit.lastUpdate}</span>
                        </div>
                      )}
                    </div>

                    {/* Quick Actions */}
                    {unit.status === 'Available' && (
                      <div className="mt-2 pt-2 border-t border-slate-700/50 flex gap-1">
                        <button className="flex-1 px-2 py-1.5 bg-blue-500/20 border border-blue-500/30 text-blue-400 rounded-lg text-xs font-medium hover:bg-blue-500/30 flex items-center justify-center gap-1">
                          <Send className="w-3 h-3" />
                          Assign
                        </button>
                        <button className="px-2 py-1.5 bg-slate-700/40 border border-slate-600/50 text-slate-300 rounded-lg text-xs hover:bg-slate-700/60">
                          <Phone className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                    {(unit.status === 'En Route' || unit.status === 'On Scene' || unit.status === 'Dispatched') && (
                      <div className="mt-2 pt-2 border-t border-slate-700/50 flex gap-1">
                        <button className="flex-1 px-2 py-1.5 bg-purple-500/20 border border-purple-500/30 text-purple-400 rounded-lg text-xs font-medium hover:bg-purple-500/30 flex items-center justify-center gap-1">
                          <MapPin className="w-3 h-3" />
                          Track
                        </button>
                        <button className="px-2 py-1.5 bg-slate-700/40 border border-slate-600/50 text-slate-300 rounded-lg text-xs hover:bg-slate-700/60">
                          <Phone className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                    {unit.status === 'Out of Service' && (
                      <div className="mt-2 pt-2 border-t border-slate-700/50">
                        <button className="w-full px-2 py-1.5 bg-slate-700/40 border border-slate-600/50 text-slate-300 rounded-lg text-xs hover:bg-slate-700/60 flex items-center justify-center gap-1">
                          <Phone className="w-3 h-3" />
                          Contact
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Call Detail Modal */}
        {selectedCall && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div className="bg-slate-800 border border-slate-700 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-slate-800 border-b border-slate-700 p-6 flex items-center justify-between z-10">
                <div>
                  <h2 className="text-2xl font-bold text-white">{selectedCall.type}</h2>
                  <p className="text-slate-400">Call #{selectedCall.callNumber}</p>
                </div>
                <button
                  onClick={() => setSelectedCall(null)}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                {/* Priority & Status */}
                <div className="flex items-center gap-4 flex-wrap">
                  <span className={`px-4 py-2 rounded font-bold border ${getPriorityColor(selectedCall.priority)}`}>
                    {selectedCall.priority} - {selectedCall.priority === 'P1' ? 'EMERGENCY' : selectedCall.priority === 'P2' ? 'URGENT' : 'ROUTINE'}
                  </span>
                  <span className={`px-4 py-2 rounded font-medium ${getStatusColor(selectedCall.status)}`}>
                    {selectedCall.status}
                  </span>
                  {selectedCall.backupRequested && (
                    <span className="px-4 py-2 bg-red-500/20 border border-red-500/30 text-red-400 rounded font-bold text-sm">
                      BACKUP REQUESTED
                    </span>
                  )}
                  {selectedCall.supervisorNotified && (
                    <span className="px-4 py-2 bg-purple-500/20 border border-purple-500/30 text-purple-400 rounded font-bold text-sm">
                      SUPERVISOR NOTIFIED
                    </span>
                  )}
                </div>

                {/* Location Info */}
                <div>
                  <h3 className="text-lg font-bold text-white mb-3">Location</h3>
                  <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4 space-y-2">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-amber-400" />
                      <span className="text-white font-medium">{selectedCall.location}</span>
                    </div>
                    {selectedCall.crossStreets && (
                      <div className="text-sm text-slate-400 ml-7">
                        Cross Streets: {selectedCall.crossStreets}
                      </div>
                    )}
                    <div className="text-sm text-slate-400 ml-7">
                      Coordinates: {selectedCall.coordinates}
                    </div>
                    {selectedCall.zone && (
                      <div className="text-sm text-slate-400 ml-7">
                        Zone: {selectedCall.zone}
                      </div>
                    )}
                  </div>
                </div>

                {/* Call Details */}
                <div>
                  <h3 className="text-lg font-bold text-white mb-3">Call Information</h3>
                  <div className="grid grid-cols-2 gap-4 bg-slate-900/50 border border-slate-700 rounded-lg p-4">
                    <div>
                      <div className="text-sm text-slate-400">Caller</div>
                      <div className="text-white font-medium">{selectedCall.caller}</div>
                      {selectedCall.callerPhone && (
                        <div className="text-xs text-slate-500 mt-1">{selectedCall.callerPhone}</div>
                      )}
                    </div>
                    <div>
                      <div className="text-sm text-slate-400">Callback Status</div>
                      <div className="text-emerald-400 font-medium">Available</div>
                    </div>
                    <div>
                      <div className="text-sm text-slate-400">Call Received</div>
                      <div className="text-white font-medium">{selectedCall.callTime}</div>
                    </div>
                    <div>
                      <div className="text-sm text-slate-400">Elapsed Time</div>
                      <div className="text-amber-400 font-bold">{selectedCall.elapsed}</div>
                    </div>
                    {selectedCall.dispatchTime && (
                      <div>
                        <div className="text-sm text-slate-400">Dispatched</div>
                        <div className="text-white font-medium">{selectedCall.dispatchTime}</div>
                      </div>
                    )}
                    {selectedCall.etaOnScene && (
                      <div>
                        <div className="text-sm text-slate-400">ETA On Scene</div>
                        <div className="text-blue-400 font-medium">{selectedCall.etaOnScene}</div>
                      </div>
                    )}
                  </div>
                </div>

                {/* History & Warnings */}
                {(selectedCall.priorCallsAtLocation! > 0 || selectedCall.weaponsRegistered) && (
                  <div>
                    <h3 className="text-lg font-bold text-white mb-3">History & Warnings</h3>
                    <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4 space-y-2">
                      {selectedCall.priorCallsAtLocation! > 0 && (
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="w-5 h-5 text-amber-400" />
                          <span className="text-amber-400 font-semibold">
                            History: {selectedCall.priorCallsAtLocation} prior DV calls at this address
                          </span>
                        </div>
                      )}
                      {selectedCall.weaponsRegistered && (
                        <div className="flex items-center gap-2">
                          <AlertCircle className="w-5 h-5 text-red-400" />
                          <span className="text-red-400 font-semibold">
                            Weapons registered: Firearm owner (2 handguns)
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Assigned Units */}
                <div>
                  <h3 className="text-lg font-bold text-white mb-3">Assigned Units</h3>
                  <div className="flex gap-2 flex-wrap">
                    {selectedCall.assignedUnits.map((unit, idx) => (
                      <div key={idx} className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-3">
                        <div className="text-blue-400 font-bold">A-{unit}</div>
                        <div className="text-xs text-slate-400 mt-1">
                          {patrolUnits.find(u => u.id === unit)?.officer}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Call Notes */}
                <div>
                  <h3 className="text-lg font-bold text-white mb-3">Call Notes & Details</h3>
                  <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
                    <p className="text-slate-300">{selectedCall.notes}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4 border-t border-slate-700 flex-wrap">
                  <button className="flex-1 min-w-[150px] px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors text-sm">
                    Assign Units
                  </button>
                  <button className="flex-1 min-w-[150px] px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white font-medium rounded-lg transition-colors text-sm">
                    Request Backup
                  </button>
                  <button className="flex-1 min-w-[150px] px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-900 font-medium rounded-lg transition-colors text-sm">
                    Update Status
                  </button>
                  <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-lg transition-colors text-sm">
                    Call Back
                  </button>
                  <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-lg transition-colors text-sm">
                    View History
                  </button>
                  <button className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-lg transition-colors text-sm">
                    Clear Call
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default CADDispatch;

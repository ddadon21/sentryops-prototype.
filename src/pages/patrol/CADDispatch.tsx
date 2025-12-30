import { useState } from 'react';
import {
  Radio, MapPin, Clock, Users, Car, Navigation, Sparkles, X,
  AlertTriangle, CheckCircle, TrendingUp, Target, Activity,
  Bell, Search, FileText,
  AlertCircle, Zap, ChevronRight, Plus
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
          <div className="flex items-center gap-3">
            <Radio className="w-8 h-8 text-amber-500" />
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-white">CAD/Dispatch</h1>
              <p className="text-slate-400">Patrol Operations - Real-Time Dispatch</p>
            </div>
          </div>

          {/* Quick Actions Bar */}
          <div className="flex flex-wrap items-center gap-2">
            <button className="flex items-center gap-2 px-3 py-2 bg-red-500/20 border border-red-500/30 text-red-400 rounded-lg text-sm font-medium hover:bg-red-500/30 transition-all">
              <Plus className="w-4 h-4" />
              New Call
            </button>
            <button className="flex items-center gap-2 px-3 py-2 bg-blue-500/20 border border-blue-500/30 text-blue-400 rounded-lg text-sm font-medium hover:bg-blue-500/30 transition-all">
              <MapPin className="w-4 h-4" />
              Locate Unit
            </button>
            <button className="flex items-center gap-2 px-3 py-2 bg-amber-500/20 border border-amber-500/30 text-amber-400 rounded-lg text-sm font-medium hover:bg-amber-500/30 transition-all">
              <Bell className="w-4 h-4" />
              Broadcast Alert
            </button>
            <button className="flex items-center gap-2 px-3 py-2 bg-purple-500/20 border border-purple-500/30 text-purple-400 rounded-lg text-sm font-medium hover:bg-purple-500/30 transition-all">
              <Users className="w-4 h-4" />
              Request Backup
            </button>
            <button className="flex items-center gap-2 px-3 py-2 bg-green-500/20 border border-green-500/30 text-green-400 rounded-lg text-sm font-medium hover:bg-green-500/30 transition-all">
              <FileText className="w-4 h-4" />
              Shift Report
            </button>
            <button className="flex items-center gap-2 px-3 py-2 bg-slate-700/40 border border-slate-600/50 text-slate-300 rounded-lg text-sm font-medium hover:bg-slate-700/60 transition-all">
              <Search className="w-4 h-4" />
              Search Calls
            </button>
            <div className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg">
              <div className="text-xs text-slate-400">Last Update</div>
              <div className="text-sm text-white font-medium">14:35:42</div>
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
                  <h4 className="text-base font-semibold text-white">AI Insights - Patrol Operations</h4>
                  <button
                    onClick={() => setAiInsightsVisible(false)}
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-3">
                  {/* Critical Section */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <h5 className="text-sm font-semibold text-red-400">CRITICAL</h5>
                    </div>
                    <div className="space-y-2 text-sm ml-4">
                      <div className="flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                        <p className="text-slate-300">P1 call elapsed 3 min - Domestic violence with weapons (4720 Lawrenceville Hwy)</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <Users className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                        <p className="text-slate-300">Only 3 units available - Consider bringing 2 units back from P3 calls</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                        <p className="text-slate-300">High call volume area: Lawrenceville Hwy corridor (3 active calls)</p>
                      </div>
                    </div>
                  </div>

                  {/* Monitoring Section */}
                  <div className="pt-3 border-t border-purple-500/20">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                      <h5 className="text-sm font-semibold text-amber-400">MONITORING</h5>
                    </div>
                    <div className="space-y-2 text-sm ml-4">
                      <div className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                        <p className="text-slate-300">Average response time today: 4.2 min (target &lt;5 min) - On track</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <Clock className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                        <p className="text-slate-300">12 min elapsed on P2 calls - Monitor closely</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <Activity className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                        <p className="text-slate-300">B-Shift starting in 90 min - Handoff prep needed</p>
                      </div>
                    </div>
                  </div>

                  {/* Operational Status */}
                  <div className="pt-3 border-t border-purple-500/20">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <h5 className="text-sm font-semibold text-green-400">OPERATIONAL STATUS</h5>
                    </div>
                    <div className="space-y-2 text-sm ml-4">
                      <div className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <p className="text-slate-300">9 units deployed, 3 available - Coverage good</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <Target className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <p className="text-slate-300">All P1 calls have units assigned - Emergency response active</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <Zap className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <p className="text-slate-300">No units overdue for end-of-shift</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-purple-500/20">
                  <button className="text-sm text-purple-400 hover:text-purple-300 font-medium">
                    View Detailed Recommendations →
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-slate-400">Active Calls</div>
              <Activity className="w-4 h-4 text-blue-400" />
            </div>
            <div className="text-2xl font-bold text-white mb-1">{stats.totalCalls}</div>
            <div className="text-xs text-slate-500">
              P1: {stats.priority1} | P2: {stats.priority2}
            </div>
            <div className="mt-2 flex items-center gap-1 text-xs">
              <TrendingUp className="w-3 h-3 text-emerald-400" />
              <span className="text-emerald-400">+2 last 15 min</span>
            </div>
          </div>

          <div className="bg-slate-800 border border-red-500/30 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-slate-400">Priority 1</div>
              <AlertCircle className="w-4 h-4 text-red-400" />
            </div>
            <div className="text-2xl font-bold text-red-400 mb-1">{stats.priority1}</div>
            <div className="text-xs text-slate-500">Avg: 3.2 min response</div>
            <div className="mt-2 flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-xs text-green-400">Under 5 min target</span>
            </div>
          </div>

          <div className="bg-slate-800 border border-amber-500/30 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-slate-400">Priority 2</div>
              <AlertTriangle className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl font-bold text-amber-400 mb-1">{stats.priority2}</div>
            <div className="text-xs text-slate-500">Avg: 7.8 min response</div>
            <div className="mt-2 flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-xs text-green-400">Under 10 min target</span>
            </div>
          </div>

          <div className="bg-slate-800 border border-emerald-500/30 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-slate-400">Units Available</div>
              <CheckCircle className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-bold text-emerald-400 mb-1">{stats.unitsAvailable}</div>
            <div className="text-xs text-slate-500">
              A-234, A-238, A-240
            </div>
            <div className="mt-2 flex items-center gap-1">
              <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
              <span className="text-xs text-amber-400">Below optimal (5+)</span>
            </div>
          </div>

          <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-slate-400">Units Deployed</div>
              <Car className="w-4 h-4 text-blue-400" />
            </div>
            <div className="text-2xl font-bold text-white mb-1">{stats.unitsDeployed}</div>
            <div className="text-xs text-slate-500">Avg deployment: 18 min</div>
            <div className="mt-2 text-xs text-slate-400">
              P1: 2 | P2: 4 | P3: 3
            </div>
          </div>

          <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-slate-400">Out of Service</div>
              <AlertTriangle className="w-4 h-4 text-slate-400" />
            </div>
            <div className="text-2xl font-bold text-slate-400 mb-1">{stats.unitsOutOfService}</div>
            <div className="text-xs text-slate-500">
              Fuel: 1 | Break: 1 | Maint: 1
            </div>
            <div className="mt-2 text-xs text-blue-400">
              A-235 back in 8 min
            </div>
          </div>
        </div>

        {/* Calls Holding Section */}
        {holdingCalls.length > 0 && (
          <div className="mb-6 bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-3">
              <Clock className="w-5 h-5 text-amber-400" />
              <h3 className="text-lg font-bold text-amber-400">Calls Holding (Awaiting Assignment)</h3>
              <span className="px-2 py-1 bg-amber-500/20 text-amber-400 rounded text-sm font-bold">
                {holdingCalls.length}
              </span>
            </div>
            <div className="space-y-2">
              {holdingCalls.map((call, idx) => (
                <div key={idx} className="bg-slate-900/50 border border-amber-500/20 rounded-lg p-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className={`px-2 py-1 rounded text-xs font-bold border ${getPriorityColor(call.priority)}`}>
                      {call.priority}
                    </span>
                    <div>
                      <div className="text-white font-medium text-sm">{call.type}</div>
                      <div className="text-xs text-slate-400">{call.location} • Call #{call.callNumber}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="text-xs text-slate-400">Holding</div>
                      <div className={`text-sm font-bold ${call.holdTime.includes('hr') ? 'text-red-400' : 'text-amber-400'}`}>
                        {call.holdTime}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="px-3 py-1 bg-blue-500/20 border border-blue-500/30 text-blue-400 rounded text-xs hover:bg-blue-500/30">
                        Assign Now
                      </button>
                      <button className="px-3 py-1 bg-slate-700/40 border border-slate-600/50 text-slate-300 rounded text-xs hover:bg-slate-700/60">
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3 pt-3 border-t border-amber-500/20 flex items-center justify-between text-sm">
              <div className="flex items-center gap-4">
                <span className="text-slate-400">Total Holding: <span className="text-white font-semibold">{holdingCalls.length} calls</span></span>
                <span className="text-slate-400">Avg Hold Time: <span className="text-amber-400 font-semibold">58 min</span></span>
              </div>
              <div className="flex items-center gap-2 text-red-400">
                <AlertTriangle className="w-4 h-4" />
                <span className="font-semibold">1 call over 1 hour</span>
              </div>
            </div>
          </div>
        )}

        {/* Shift Status Section */}
        <div className="mb-6 bg-slate-800 border border-slate-700 rounded-lg p-5">
          <button
            onClick={() => setShowShiftStatus(!showShiftStatus)}
            className="w-full flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-400" />
              <h3 className="text-lg font-bold text-white">Shift Status</h3>
            </div>
            <ChevronRight className={`w-5 h-5 text-slate-400 transition-transform ${showShiftStatus ? 'rotate-90' : ''}`} />
          </button>

          {showShiftStatus && (
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-slate-400 mb-2">Current Shift: A-Shift</div>
                <div className="text-2xl font-bold text-white mb-1">06:00-14:00</div>
                <div className="text-sm text-amber-400">End of shift: 1 hr 25 min</div>
              </div>
              <div>
                <div className="text-sm text-slate-400 mb-2">Next Shift: B-Shift</div>
                <div className="text-lg font-semibold text-white mb-1">14:00-22:00</div>
                <div className="flex items-center gap-1 text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-green-400">Staffing: 14/14 All covered</span>
                </div>
              </div>
              <div className="md:col-span-2 bg-slate-900/50 border border-slate-700 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-white mb-3">Handoff Preparation:</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-slate-300">Active calls: {stats.totalCalls} (will transfer to B-Shift)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-400" />
                    <span className="text-slate-300">{holdingCalls.length} calls holding (brief B-Shift)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-slate-300">No units overdue for EOD</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-slate-300">Shift report drafted</span>
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <button className="px-4 py-2 bg-blue-500/20 border border-blue-500/30 text-blue-400 rounded-lg text-sm hover:bg-blue-500/30">
                    View Shift Report
                  </button>
                  <button className="px-4 py-2 bg-slate-700/40 border border-slate-600/50 text-slate-300 rounded-lg text-sm hover:bg-slate-700/60">
                    Notify B-Shift Supervisor
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Today's Metrics Section */}
        <div className="mb-6 bg-slate-800 border border-slate-700 rounded-lg p-5">
          <button
            onClick={() => setShowMetrics(!showMetrics)}
            className="w-full flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-purple-400" />
              <h3 className="text-lg font-bold text-white">Today's Metrics</h3>
            </div>
            <ChevronRight className={`w-5 h-5 text-slate-400 transition-transform ${showMetrics ? 'rotate-90' : ''}`} />
          </button>

          {showMetrics && (
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Call Volume */}
              <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-white mb-3">Call Volume</h4>
                <div className="text-3xl font-bold text-white mb-2">{todaysMetrics.totalCallsToday}</div>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-400">P1:</span>
                    <span className="text-red-400 font-semibold">{todaysMetrics.p1Calls} (17%)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">P2:</span>
                    <span className="text-amber-400 font-semibold">{todaysMetrics.p2Calls} (49%)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">P3:</span>
                    <span className="text-blue-400 font-semibold">{todaysMetrics.p3Calls} (34%)</span>
                  </div>
                </div>
              </div>

              {/* Response Times */}
              <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-white mb-3">Response Times</h4>
                <div className="space-y-2 text-sm">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-slate-400">P1 avg:</span>
                      <span className="text-green-400 font-semibold">{todaysMetrics.avgResponseTimeP1} min</span>
                    </div>
                    <div className="text-xs text-green-400 flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      Under 5 min target
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-slate-400">P2 avg:</span>
                      <span className="text-green-400 font-semibold">{todaysMetrics.avgResponseTimeP2} min</span>
                    </div>
                    <div className="text-xs text-green-400 flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      Under 10 min target
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-slate-400">P3 avg:</span>
                      <span className="text-green-400 font-semibold">{todaysMetrics.avgResponseTimeP3} min</span>
                    </div>
                    <div className="text-xs text-green-400 flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      Under 20 min target
                    </div>
                  </div>
                </div>
              </div>

              {/* Clearance Rate */}
              <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-white mb-3">Clearance Rate</h4>
                <div className="text-3xl font-bold text-emerald-400 mb-2">{todaysMetrics.clearanceRate}%</div>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Cleared:</span>
                    <span className="text-white font-semibold">{todaysMetrics.callsCleared}/{todaysMetrics.totalCallsToday}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Active:</span>
                    <span className="text-amber-400 font-semibold">{stats.totalCalls}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Avg handling:</span>
                    <span className="text-white font-semibold">{todaysMetrics.avgHandlingTime} min</span>
                  </div>
                </div>
              </div>

              {/* Unit Performance */}
              <div className="md:col-span-3 bg-slate-900/50 border border-slate-700 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-white mb-3">Most Active Units Today</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {unitPerformance.map((perf, idx) => (
                    <div key={idx} className="bg-slate-800/50 border border-slate-700/50 rounded p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white font-bold">{perf.unit}</span>
                        <span className="text-amber-400 font-bold">{perf.calls} calls</span>
                      </div>
                      <div className="text-xs text-slate-400 mb-1">{perf.officer}</div>
                      <div className="text-xs text-green-400">Fastest response: {perf.fastestResponse} min</div>
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
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Radio className="w-5 h-5 text-amber-400" />
                  Active Calls for Service
                </h2>
                <div className="text-sm text-slate-400">
                  Sorted by Priority & Time
                </div>
              </div>

              <div className="space-y-3">
                {activeCalls.filter(c => c.status !== 'Holding').map((call) => (
                  <div
                    key={call.id}
                    onClick={() => setSelectedCall(call)}
                    className={`border rounded-lg p-4 cursor-pointer transition-all hover:border-amber-500/50 ${
                      call.priority === 'P1' ? 'bg-red-500/5 border-red-500/30' :
                      call.priority === 'P2' ? 'bg-amber-500/5 border-amber-500/30' :
                      'bg-slate-900/50 border-slate-700/30'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className={`px-3 py-1 rounded font-bold text-sm border ${getPriorityColor(call.priority)}`}>
                          {call.priority}
                        </span>
                        <div>
                          <div className="text-white font-semibold">{call.type}</div>
                          <div className="text-xs text-slate-400">Call #{call.callNumber}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-slate-400">Elapsed</div>
                        <div className={`font-bold ${call.elapsed.includes('hr') ? 'text-red-400' : 'text-amber-400'}`}>
                          {call.elapsed}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3 text-sm">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-slate-400 flex-shrink-0" />
                        <span className="text-slate-300">{call.location}</span>
                      </div>
                      {call.crossStreets && (
                        <div className="text-xs text-slate-500">
                          Cross: {call.crossStreets}
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-slate-400" />
                        <span className="text-slate-300">Received: {call.callTime}</span>
                      </div>
                      {call.zone && (
                        <div className="text-xs text-slate-500">
                          {call.zone}
                        </div>
                      )}
                    </div>

                    {/* Badges for special conditions */}
                    {(call.backupRequested || call.supervisorNotified || call.priorCallsAtLocation! > 0) && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {call.backupRequested && (
                          <span className="px-2 py-1 bg-red-500/20 border border-red-500/30 text-red-400 rounded text-xs font-semibold">
                            BACKUP REQUESTED
                          </span>
                        )}
                        {call.supervisorNotified && (
                          <span className="px-2 py-1 bg-purple-500/20 border border-purple-500/30 text-purple-400 rounded text-xs font-semibold">
                            SUPERVISOR NOTIFIED
                          </span>
                        )}
                        {call.priorCallsAtLocation! > 0 && (
                          <span className="px-2 py-1 bg-amber-500/20 border border-amber-500/30 text-amber-400 rounded text-xs font-semibold">
                            {call.priorCallsAtLocation} PRIOR CALLS
                          </span>
                        )}
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-3 border-t border-slate-700">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Car className="w-4 h-4 text-blue-400" />
                        <span className="text-sm text-slate-400">Assigned:</span>
                        {call.assignedUnits.length > 0 ? (
                          <div className="flex gap-1">
                            {call.assignedUnits.map((unit, idx) => (
                              <span key={idx} className="px-2 py-0.5 bg-blue-500/20 text-blue-400 rounded text-xs font-medium">
                                A-{unit}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <span className="text-red-400 text-sm font-semibold">No units assigned</span>
                        )}
                      </div>
                      <span className={`px-3 py-1 rounded text-xs font-medium ${getStatusColor(call.status)}`}>
                        {call.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Unit Status - Right Column */}
          <div className="lg:col-span-1">
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 sticky top-6">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-emerald-400" />
                Patrol Unit Status
              </h2>

              <div className="space-y-2 max-h-[800px] overflow-y-auto">
                {patrolUnits.map((unit) => (
                  <div
                    key={unit.id}
                    className={`border rounded-lg p-3 transition-colors ${
                      unit.status === 'Available' ? 'bg-emerald-500/5 border-emerald-500/30' :
                      unit.status === 'En Route' ? 'bg-amber-500/5 border-amber-500/30' :
                      unit.status === 'On Scene' ? 'bg-purple-500/5 border-purple-500/30' :
                      'bg-slate-900/50 border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-bold text-white">{unit.callSign}</div>
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${getStatusColor(unit.status)}`}>
                        {unit.status}
                      </span>
                    </div>
                    <div className="text-sm text-slate-400 mb-1">{unit.officer}</div>
                    <div className="text-xs text-slate-500">Badge: {unit.badge}</div>

                    {unit.currentCall && (
                      <div className="mt-2 pt-2 border-t border-slate-700 text-xs">
                        <span className="text-amber-400 font-medium">Call: {unit.currentCall}</span>
                        {unit.eta && (
                          <div className="text-slate-500 mt-1">ETA: {unit.eta}</div>
                        )}
                      </div>
                    )}

                    {unit.status === 'Out of Service' && unit.oosReason && (
                      <div className="mt-2 pt-2 border-t border-slate-700 text-xs">
                        <div className="text-slate-400">{unit.oosReason}</div>
                        {unit.oosETA && (
                          <div className="text-blue-400 font-medium mt-1">Expected back: {unit.oosETA}</div>
                        )}
                      </div>
                    )}

                    <div className="mt-2 space-y-1">
                      <div className="flex items-center gap-1 text-xs text-slate-500">
                        <Navigation className="w-3 h-3" />
                        <span>{unit.location}</span>
                      </div>
                      {unit.speed && unit.direction && (
                        <div className="text-xs text-blue-400">
                          {unit.speed} mph {unit.direction} • Updated {unit.lastUpdate}
                        </div>
                      )}
                      {unit.lastActivity && (
                        <div className="text-xs text-slate-500">
                          {unit.lastActivity}
                        </div>
                      )}
                    </div>

                    {/* Quick Actions */}
                    {unit.status === 'Available' && (
                      <div className="mt-2 pt-2 border-t border-slate-700 flex gap-1">
                        <button className="flex-1 px-2 py-1 bg-blue-500/20 border border-blue-500/30 text-blue-400 rounded text-xs hover:bg-blue-500/30">
                          Assign
                        </button>
                      </div>
                    )}
                    {(unit.status === 'En Route' || unit.status === 'On Scene') && (
                      <div className="mt-2 pt-2 border-t border-slate-700 flex gap-1">
                        <button className="flex-1 px-2 py-1 bg-purple-500/20 border border-purple-500/30 text-purple-400 rounded text-xs hover:bg-purple-500/30">
                          Track
                        </button>
                        <button className="flex-1 px-2 py-1 bg-slate-700/40 border border-slate-600/50 text-slate-300 rounded text-xs hover:bg-slate-700/60">
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

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';
import {
  Users, AlertTriangle, Activity, TrendingUp,
  Clock, Shield, Bed, Hospital, Scale, Calendar, UserCheck, MapPin,
  Sparkles, X, CheckCircle, Search, RefreshCw, Building2,
  ArrowRight, Eye, User, Heart, FileText, BookOpen,
  Target, Utensils, UserPlus, CalendarClock, AlertOctagon, Stethoscope,
  Phone, Mail, Truck, Video, ShoppingCart, AlertCircle, Circle, Check
} from 'lucide-react';

interface HousingUnit {
  id: string;
  name: string;
  type: string;
  capacity: number;
  current: number;
  security: string;
  status: string;
  notes?: string;
}

interface BookingRecord {
  id: string;
  inmateId: string;
  name: string;
  time: string;
  charges: string[];
  bond: string;
  status: string;
  bookingTime?: string;
  classification?: string;
  medicalScreening?: string;
  housing?: string;
  bondHearing?: string;
}

interface Incident {
  id: string;
  type: string;
  severity: string;
  location: string;
  time: string;
  status: string;
  description: string;
  inmates?: string[];
  staff?: string[];
  followUp?: string;
}

interface CourtTransport {
  court: string;
  time: string;
  inmates: number;
  deputy: string;
  status: string;
  vehicle?: string;
  departed?: string;
  etaReturn?: string;
}

const JailDashboard = () => {
  const navigate = useNavigate();
  const [aiInsightsVisible, setAiInsightsVisible] = useState(true);
  const [selectedPod, setSelectedPod] = useState<HousingUnit | null>(null);
  const [activeAlerts, setActiveAlerts] = useState([
    { id: 1, message: 'H2-Pod: Over capacity (36/32) - Emergency beds in use', type: 'critical', visible: true },
    { id: 2, message: 'E-Pod: Medical housing at 92% - Monitor closely', type: 'warning', visible: true },
    { id: 3, message: 'B-Shift: 1 position unfilled - Coverage adjusted', type: 'warning', visible: true }
  ]);

  // Real-time facility metrics
  const facilityMetrics = {
    totalCapacity: 920,
    currentPopulation: 842,
    percentFull: 91.5,
    maleInmates: 698,
    femaleInmates: 144,
    averageLength: 23.4, // days
    bookingsToday: 18,
    releasesToday: 14,
    courtTransports: 31,
    netChange: 4,
    sevenDayAverage: 843,
    longestStay: 847,
    medianStay: 18
  };

  // Population trend data (last 7 days)
  const populationTrend = [
    { date: 'Dec 4', population: 838 },
    { date: 'Dec 5', population: 841 },
    { date: 'Dec 6', population: 839 },
    { date: 'Dec 7', population: 845 },
    { date: 'Dec 8', population: 848 },
    { date: 'Dec 9', population: 844 },
    { date: 'Dec 10', population: 846 },
    { date: 'Dec 11', population: 842 }
  ];

  // Housing units with realistic pod structure
  const housingUnits: HousingUnit[] = [
    { id: 'A1', name: 'A-Pod (Male GP)', type: 'General Population', capacity: 96, current: 94, security: 'Medium', status: 'Near Capacity' },
    { id: 'A2', name: 'A2-Pod (Male GP)', type: 'General Population', capacity: 96, current: 89, security: 'Medium', status: 'Normal' },
    { id: 'B1', name: 'B-Pod (Male Max)', type: 'Maximum Security', capacity: 64, current: 61, security: 'Maximum', status: 'Normal' },
    { id: 'B2', name: 'B2-Pod (Disciplinary)', type: 'Segregation', capacity: 32, current: 28, security: 'Maximum', status: 'Normal' },
    { id: 'C1', name: 'C-Pod (Male Medium)', type: 'Medium Security', capacity: 128, current: 115, security: 'Medium', status: 'Normal' },
    { id: 'C2', name: 'C2-Pod (Work Release)', type: 'Minimum Security', capacity: 48, current: 42, security: 'Minimum', status: 'Normal' },
    { id: 'D1', name: 'D-Pod (Female GP)', type: 'General Population', capacity: 80, current: 73, security: 'Medium', status: 'Normal' },
    { id: 'D2', name: 'D2-Pod (Female Max)', type: 'Maximum Security', capacity: 32, current: 29, security: 'Maximum', status: 'Normal' },
    { id: 'E1', name: 'E-Pod (Medical)', type: 'Medical Housing', capacity: 48, current: 44, security: 'Medium', status: 'Near Capacity', notes: '3 isolation cells occupied' },
    { id: 'E2', name: 'E2-Pod (Mental Health)', type: 'Mental Health', capacity: 40, current: 38, security: 'Medium', status: 'Near Capacity', notes: '24/7 monitoring active' },
    { id: 'F1', name: 'F-Pod (Intake/Booking)', type: 'Intake', capacity: 64, current: 52, security: 'High', status: 'Normal', notes: '12 pending classification' },
    { id: 'F2', name: 'F2-Pod (Protective Custody)', type: 'Protective Custody', capacity: 48, current: 41, security: 'High', status: 'Normal' },
    { id: 'G1', name: 'G-Pod (Juvenile)', type: 'Juvenile', capacity: 24, current: 18, security: 'Medium', status: 'Normal', notes: 'State certified' },
    { id: 'G2', name: 'G2-Pod (Transitional)', type: 'Pre-Release', capacity: 40, current: 35, security: 'Minimum', status: 'Normal' },
    { id: 'H1', name: 'H-Pod (Federal Hold)', type: 'Federal Detainees', capacity: 48, current: 47, security: 'High', status: 'Near Capacity' },
    { id: 'H2', name: 'H2-Pod (ICE Hold)', type: 'Immigration Hold', capacity: 32, current: 36, security: 'Medium', status: 'Over Capacity', notes: 'Using emergency beds' }
  ];

  // Recent bookings with enhanced details
  const recentBookings: BookingRecord[] = [
    {
      id: 'BK-2024-3847',
      inmateId: '2024-089234',
      name: 'MARTINEZ, Carlos A.',
      time: '14:23',
      charges: ['Aggravated Assault', 'Possession Firearm by Felon'],
      bond: 'No Bond',
      status: 'Processing',
      bookingTime: '2 hours ago',
      classification: 'In progress (ETA 16:00)',
      medicalScreening: 'Complete',
      housing: 'Temporary holding',
      bondHearing: 'Not scheduled'
    },
    {
      id: 'BK-2024-3846',
      inmateId: '2024-089233',
      name: 'JOHNSON, Keisha M.',
      time: '13:45',
      charges: ['DUI', 'Reckless Driving'],
      bond: '$2,500',
      status: 'Processing Release',
      bookingTime: '3 hours ago',
      classification: 'Complete (Minimum Security)',
      medicalScreening: 'Complete',
      housing: 'F-Pod Cell 12',
      bondHearing: 'Bond posted - release at 17:00'
    },
    {
      id: 'BK-2024-3845',
      inmateId: '2024-089232',
      name: 'WILLIAMS, Terrance L.',
      time: '12:18',
      charges: ['Theft by Taking', 'Criminal Trespass'],
      bond: '$5,000',
      status: 'Housing Assigned',
      bookingTime: '4 hours ago',
      classification: 'Complete (Medium Security)',
      medicalScreening: 'Complete',
      housing: 'A-Pod Cell 45'
    },
    {
      id: 'BK-2024-3844',
      inmateId: '2024-089231',
      name: 'ANDERSON, Michael J.',
      time: '11:34',
      charges: ['Probation Violation'],
      bond: 'No Bond',
      status: 'Housing Assigned',
      bookingTime: '5 hours ago',
      classification: 'Complete (Medium Security)',
      medicalScreening: 'Complete',
      housing: 'C-Pod Cell 23'
    }
  ];

  // Recent incidents with enhanced details
  const recentIncidents: Incident[] = [
    {
      id: 'INC-2024-1182',
      type: 'Inmate Altercation',
      severity: 'Medium',
      location: 'A-Pod Dayroom',
      time: '13:15 (3 hours ago)',
      status: 'Resolved',
      description: 'Verbal dispute escalated, separated by staff',
      inmates: ['GARCIA (#2024-087123)', 'THOMPSON (#2024-085567)'],
      staff: ['Officer Williams', 'Officer Rodriguez'],
      followUp: 'Both inmates written up, no segregation required'
    },
    {
      id: 'INC-2024-1181',
      type: 'Medical Emergency',
      severity: 'High',
      location: 'C-Pod Cell 14',
      time: '11:42 (5 hours ago)',
      status: 'Transported',
      description: 'Chest pain complaint, EMS transport to Gwinnett Medical',
      inmates: ['ANDERSON (#2024-082231)'],
      staff: ['RN Martinez', 'Officer Johnson', 'Deputy Martinez (hospital guard)'],
      followUp: 'At Gwinnett Medical - Deputy Martinez on guard'
    },
    {
      id: 'INC-2024-1180',
      type: 'Contraband Found',
      severity: 'Medium',
      location: 'D-Pod Cell 22',
      time: '10:30 (6 hours ago)',
      status: 'Investigating',
      description: 'Cell phone discovered during routine search',
      inmates: ['WILLIAMS (#2024-078456)'],
      staff: ['Sgt. Anderson', 'Officer Chen'],
      followUp: 'Phone confiscated, inmate moved to B2-Pod (disciplinary)'
    },
    {
      id: 'INC-2024-1179',
      type: 'Use of Force',
      severity: 'High',
      location: 'B-Pod Corridor',
      time: '08:45 (8 hours ago)',
      status: 'Under Review',
      description: 'Restraint applied during non-compliant behavior',
      inmates: ['JOHNSON (#2024-089234)'],
      staff: ['Officer Davis', 'Officer Thompson'],
      followUp: 'Body cam footage under review by IA'
    }
  ];

  const classificationChanges = [
    { description: '2 inmates reclassified (Medium → Minimum)', time: 'Today 10:30' },
    { description: '1 inmate moved to protective custody', time: 'Today 09:15' },
    { description: '3 inmates pending reclassification review', time: 'Pending' }
  ];

  // Enhanced court schedule
  const courtSchedule: CourtTransport[] = [
    { court: 'Superior Court', time: '09:00', inmates: 8, deputy: 'Sgt. Williams', status: 'En Route', vehicle: 'Transport Van 3', departed: '08:15', etaReturn: '12:00' },
    { court: 'State Court', time: '09:30', inmates: 12, deputy: 'Sgt. Martinez', status: 'Staging', vehicle: 'Transport Van 1', departed: '09:00', etaReturn: '14:00' },
    { court: 'Magistrate Court', time: '13:00', inmates: 6, deputy: 'Cpl. Johnson', status: 'Scheduled', vehicle: 'Transport Van 2', departed: '12:30', etaReturn: '15:00' },
    { court: 'Probate Court', time: '14:00', inmates: 3, deputy: 'Cpl. Davis', status: 'Scheduled', vehicle: 'Transport Van 3', departed: '13:30', etaReturn: '16:00' },
    { court: 'Juvenile Court', time: '10:00', inmates: 2, deputy: 'Det. Anderson', status: 'Completed', vehicle: 'Patrol Unit 12', departed: '09:30', etaReturn: '11:45 (Returned)' }
  ];

  // Enhanced staff coverage with names
  const staffCoverage = {
    aShift: {
      scheduled: 15,
      present: 15,
      posts: 'All Covered',
      supervisor: 'Sgt. Williams',
      officers: ['Martinez', 'Chen', 'Rodriguez', 'Anderson', 'Johnson', '+10 more'],
      assignments: 'A-Pod: 2, B-Pod: 2, Control: 1, Intake: 2, Transport: 3, Patrol: 5'
    },
    bShift: {
      scheduled: 14,
      present: 13,
      posts: '1 Position Open',
      supervisor: 'Sgt. Thompson',
      issue: 'Officer Smith called out sick (11:30 AM)',
      coverage: 'Posts adjusted, no OT approved yet'
    },
    cShift: {
      scheduled: 14,
      present: 14,
      posts: 'All Covered',
      supervisor: 'Sgt. Davis'
    },
    medical: {
      scheduled: 6,
      present: 6,
      posts: 'All Covered',
      staff: ['RN Martinez', 'RN Chen (Day)', 'RN Johnson', 'RN Williams (Night)', 'Dr. Anderson (On-call)']
    },
    kitchen: {
      scheduled: 8,
      present: 7,
      posts: '1 Position Open',
      issue: 'Chronic vacancy - recommend hiring'
    }
  };

  // Enhanced services status
  const servicesStatus = [
    {
      service: 'Video Visitation',
      status: 'Operational',
      sessionsToday: 47,
      stationsTotal: 12,
      stationsInUse: 3,
      waitTime: '<5 minutes',
      nextMaintenance: 'Dec 15',
      staff: 'Officer Davis',
      issues: 'None'
    },
    {
      service: 'Commissary',
      status: 'Operational',
      ordersToday: 124,
      ordersInQueue: 89,
      nextDelivery: 'Tomorrow 10:00',
      outOfStock: 12,
      staff: '3/3 assigned (Chen, Martinez, Williams)',
      topItems: ['Ramen (45)', 'Coffee (38)', 'Snacks (32)']
    },
    {
      service: 'Inmate Phones',
      status: 'Operational',
      callsToday: 212,
      issues: '2 stations need repair',
      problemStations: ['Station 7: Low audio', 'Station 11: Keypad malfunction'],
      maintenance: 'Scheduled Dec 13',
      staff: 'IT notified'
    },
    {
      service: 'Mail Processing',
      status: 'Operational',
      incomingToday: 89,
      outgoingToday: 156,
      processingTime: '<24 hours',
      flaggedItems: 3,
      flaggedDetails: ['2 packages (unusual size)', '1 letter (suspicious content)'],
      staff: 'Officer Chen'
    },
    {
      service: 'Laundry Services',
      status: 'Operational',
      loadsTotal: 34,
      loadsCompleted: 28,
      nextLoad: '19:00',
      staff: '4/4 assigned',
      schedule: 'Pod laundry ongoing, Uniforms complete, Bedding in progress'
    },
    {
      service: 'Food Service',
      status: 'Operational',
      nextMeal: 'Dinner 17:00',
      menu: 'Baked chicken, rice, vegetables',
      specialDiets: 23,
      dietBreakdown: 'Diabetic: 12, Halal: 6, Kosher: 3, Vegetarian: 2',
      kitchenStaff: '7/8 (1 position open)',
      mealsToday: 'Breakfast: 842 served, Lunch: 842 served, Dinner: Preparing'
    }
  ];

  const getCapacityColor = (percent: number) => {
    if (percent >= 95) return 'text-red-600 dark:text-red-400';
    if (percent >= 85) return 'text-amber-600 dark:text-amber-400';
    return 'text-emerald-600 dark:text-emerald-400';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Normal': return 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400';
      case 'Near Capacity': return 'bg-amber-500/20 text-amber-600 dark:text-amber-400';
      case 'Over Capacity': return 'bg-red-500/20 text-red-600 dark:text-red-400';
      default: return 'bg-slate-500/20 text-slate-500';
    }
  };

  const dismissAlert = (id: number) => {
    setActiveAlerts(activeAlerts.map(alert =>
      alert.id === id ? { ...alert, visible: false } : alert
    ));
  };

  const visibleAlerts = activeAlerts.filter(a => a.visible);

  return (
    <DashboardLayout>
      <div className="p-4 lg:p-6">
        {/* Page Header with Quick Actions */}
        <div className="mb-6 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white mb-1">Detention Operations</h1>
            <p className="text-[11px] text-slate-500">Gwinnett County Detention Center · Real-time facility status</p>
            <p className="text-sm text-slate-500 mt-1 flex items-center gap-2 flex-wrap">
              <span className="font-medium text-amber-600 dark:text-amber-400">Capacity: 842/920 (91.5%)</span>
              <span className="text-slate-700">|</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                Last updated: 6:38 PM EST
              </span>
              <span className="text-slate-700">|</span>
              <span>Auto-refresh: Every 5 min</span>
              <button className="ml-2 text-slate-700 dark:text-slate-400 hover:text-slate-700 dark:text-slate-300 flex items-center gap-1 transition-colors">
                <RefreshCw className="w-3 h-3" />
                Refresh Now
              </button>
            </p>
          </div>

          {/* Quick Actions Bar */}
          <div className="flex flex-wrap items-center gap-2">
            <button className="flex items-center gap-2 px-3 py-2 bg-slate-50 dark:bg-slate-700/40 border border-slate-600/50 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-medium hover:bg-slate-700/60 transition-all" title="Start new inmate intake process">
              <UserPlus className="w-4 h-4" />
              New Booking
            </button>
            <button className="flex items-center gap-2 px-3 py-2 bg-slate-50 dark:bg-slate-700/40 border border-slate-600/50 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-medium hover:bg-slate-700/60 transition-all" title="Process scheduled release or early discharge">
              <UserCheck className="w-4 h-4" />
              Process Release
            </button>
            <button className="flex items-center gap-2 px-3 py-2 bg-red-500/20 border border-red-500/30 text-red-600 dark:text-red-400 rounded-lg text-sm font-medium hover:bg-red-500/30 transition-all" title="File incident/use of force report">
              <AlertCircle className="w-4 h-4" />
              Incident Report
            </button>
            <button className="flex items-center gap-2 px-3 py-2 bg-red-500/20 border border-red-500/30 text-red-600 dark:text-red-400 rounded-lg text-sm font-medium hover:bg-red-500/30 transition-all" title="Initiate emergency medical response">
              <Heart className="w-4 h-4" />
              Medical Emergency
            </button>
            <button className="flex items-center gap-2 px-3 py-2 bg-slate-50 dark:bg-slate-700/40 border border-slate-600/50 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-medium hover:bg-slate-700/60 transition-all" title="Generate facility operations report">
              <FileText className="w-4 h-4" />
              Daily Report
            </button>
            <button className="flex items-center gap-2 px-3 py-2 bg-slate-50 dark:bg-slate-700/40 border border-slate-600/50 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-medium hover:bg-slate-700/60 transition-all" title="Search by name, booking #, or DOC number">
              <Search className="w-4 h-4" />
              Search Inmate
            </button>
          </div>
        </div>

        {/* AI Insights Banner */}
        {aiInsightsVisible && (
          <div className="mb-6 bg-white dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700/50 rounded-xl shadow-sm dark:shadow-none p-5">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-white dark:bg-slate-700/60 rounded-xl flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-6 h-6 text-slate-700 dark:text-slate-400" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-base font-semibold text-slate-900 dark:text-white">AI Insights - Detention Operations</h4>
                  <button
                    onClick={() => setAiInsightsVisible(false)}
                    className="text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:text-white transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-4">
                  {/* Critical Section */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400" />
                      <h5 className="text-sm font-semibold text-red-600 dark:text-red-400">CRITICAL</h5>
                    </div>
                    <div className="space-y-3 text-sm ml-4">
                      <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                        <div className="flex items-start gap-2 mb-2">
                          <Circle className="w-3 h-3 fill-red-400 text-red-600 dark:text-red-400 mt-1 flex-shrink-0" />
                          <p className="text-slate-900 dark:text-white font-medium">H2-Pod over capacity (36/32 beds - 112%)</p>
                        </div>
                        <p className="text-slate-700 dark:text-slate-300 text-xs ml-5 mb-2">Federal housing pod exceeds ACA maximum capacity. 4 inmates on emergency mattresses (Booking #2024-18472, #2024-18483, #2024-18491, #2024-18502).</p>
                        <p className="text-amber-600 dark:text-amber-400 text-xs ml-5"><strong>Action Required:</strong> Transfer 2 minimum-security federal detainees to E-Pod medical observation beds (currently 44/48 - space available) OR coordinate with U.S. Marshals for early bond review hearing. Federal audit Dec 12-14 - capacity violation must be resolved.</p>
                      </div>
                      <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                        <div className="flex items-start gap-2 mb-2">
                          <Circle className="w-3 h-3 fill-red-400 text-red-600 dark:text-red-400 mt-1 flex-shrink-0" />
                          <p className="text-slate-900 dark:text-white font-medium">B-Shift understaffed (13/14 officers - 93%)</p>
                        </div>
                        <p className="text-slate-700 dark:text-slate-300 text-xs ml-5 mb-2">1 officer call-out (Officer Martinez - family emergency). Current staffing below ACA minimum for 842 inmates (requires 14 officers minimum for pod coverage).</p>
                        <p className="text-amber-600 dark:text-amber-400 text-xs ml-5"><strong>Action Required:</strong> Authorize 8-hour OT for off-duty officer OR reassign Officer Johnson from A-Shift overlap (1400-1430 hrs) to cover full B-Shift. All pods must maintain 1:60 officer-to-inmate ratio per policy.</p>
                      </div>
                    </div>
                  </div>

                  {/* Monitoring Section */}
                  <div className="pt-3 border-t border-purple-500/20">
                    <div className="flex items-center gap-2 mb-3">
                      <AlertTriangle className="w-4 h-4 text-amber-800" />
                      <h5 className="text-sm font-semibold text-amber-600 dark:text-amber-400">MONITORING</h5>
                    </div>
                    <div className="space-y-3 text-sm ml-4">
                      <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3">
                        <div className="flex items-start gap-2 mb-2">
                          <Circle className="w-3 h-3 fill-amber-400 text-amber-600 dark:text-amber-400 mt-1 flex-shrink-0" />
                          <p className="text-slate-900 dark:text-white font-medium">E-Pod medical housing at 92% (44/48 beds)</p>
                        </div>
                        <p className="text-slate-700 dark:text-slate-300 text-xs ml-5 mb-2">Medical observation housing approaching capacity. Current occupants: 18 general medical holds, 12 psychiatric observation, 8 infirmary, 6 substance withdrawal monitoring.</p>
                        <p className="text-slate-700 dark:text-slate-300 text-xs ml-5"><strong>Recommendation:</strong> Coordinate with Gwinnett Medical Center for 3 pending discharge evaluations (inmates cleared for general population but awaiting psych clearance). Review daily with Medical Director Chen.</p>
                      </div>
                      <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3">
                        <div className="flex items-start gap-2 mb-2">
                          <Circle className="w-3 h-3 fill-amber-400 text-amber-600 dark:text-amber-400 mt-1 flex-shrink-0" />
                          <p className="text-slate-900 dark:text-white font-medium">31 court transports scheduled tomorrow (Dec 13)</p>
                        </div>
                        <p className="text-slate-700 dark:text-slate-300 text-xs ml-5 mb-2">Superior Court: 17 inmates (arraignments), State Court: 9 inmates (hearings), Probation violations: 5 inmates.</p>
                        <p className="text-slate-700 dark:text-slate-300 text-xs ml-5"><strong>Verification needed:</strong> 4 vans available (need 5 for volume), 6 deputies assigned (adequate). Request 1 additional van from Fleet or stagger departure times: Group 1 depart 0630, Group 2 depart 0800.</p>
                      </div>
                      <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3">
                        <div className="flex items-start gap-2 mb-2">
                          <Circle className="w-3 h-3 fill-amber-400 text-amber-600 dark:text-amber-400 mt-1 flex-shrink-0" />
                          <p className="text-slate-900 dark:text-white font-medium">Average length of stay trending up (23.4 days, +1.2 days vs last month)</p>
                        </div>
                        <p className="text-slate-700 dark:text-slate-300 text-xs ml-5 mb-2">Contributing factors: Court backlog (COVID delays clearing), Public Defender caseload (3-week wait for appointed counsel), Bail amounts unchanged (inflation not adjusted).</p>
                        <p className="text-slate-700 dark:text-slate-300 text-xs ml-5"><strong>Recommendation:</strong> Coordinate with Court Administrator for expedited hearing slots. Review bond schedule with judges for misdemeanor cases. Consider early release program expansion for low-risk offenders.</p>
                      </div>
                    </div>
                  </div>

                  {/* Operational Status */}
                  <div className="pt-3 border-t border-purple-500/20">
                    <div className="flex items-center gap-2 mb-3">
                      <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                      <h5 className="text-sm font-semibold text-green-600 dark:text-green-400">OPERATIONAL STATUS</h5>
                    </div>
                    <div className="space-y-3 text-sm ml-4">
                      <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                        <div className="flex items-start gap-2 mb-2">
                          <Check className="w-4 h-4 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                          <p className="text-slate-900 dark:text-white font-medium">All facility services operational - No critical incidents in last 24 hours</p>
                        </div>
                        <p className="text-slate-700 dark:text-slate-300 text-xs ml-6">All housing pods staffed and secure. No medical emergencies requiring hospitalization. No use-of-force incidents. No escapes or escape attempts. Last critical incident: Dec 9 (inmate altercation, resolved).</p>
                      </div>
                      <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                        <div className="flex items-start gap-2 mb-2">
                          <Check className="w-4 h-4 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                          <p className="text-slate-900 dark:text-white font-medium">Population stable (842 inmates, +4 net today) - Within normal operating parameters</p>
                        </div>
                        <p className="text-slate-700 dark:text-slate-300 text-xs ml-6">18 bookings today (7 felony, 9 misdemeanor, 2 probation violations), 14 releases (8 bond posted, 4 time served, 2 transferred to state custody). 7-day trend: Stable population hovering 838-846. Forecast: 840-850 range next 7 days (manageable).</p>
                      </div>
                      <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                        <div className="flex items-start gap-2 mb-2">
                          <Check className="w-4 h-4 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                          <p className="text-slate-900 dark:text-white font-medium">All critical systems operational</p>
                        </div>
                        <p className="text-slate-700 dark:text-slate-300 text-xs ml-6">CAD (Computer Aided Dispatch) - Online, RMS (Records Management System) - Online, SmartJAIL (inmate management) - Online, Commissary system - Online, Video visitation - Online, Medical records (eClinicalWorks) - Online. Last system outage: Nov 28 (scheduled maintenance, 2-hour window).</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-purple-500/20">
                  <button className="text-sm text-slate-700 dark:text-slate-400 hover:text-slate-700 dark:text-slate-300 font-medium">
                    View Detailed Recommendations →
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* Facility Capacity Card - Enhanced */}
          <div className="bg-white dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700/50 rounded-xl shadow-sm dark:shadow-none p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-white dark:bg-slate-700/60 rounded-lg">
                <Building2 className="w-6 h-6 text-slate-700 dark:text-slate-400" />
              </div>
              <div className={`text-3xl font-bold ${getCapacityColor(facilityMetrics.percentFull)}`}>
                {facilityMetrics.percentFull}%
              </div>
            </div>
            <h3 className="text-slate-700 dark:text-slate-400 text-sm mb-1">Facility Capacity</h3>
            <p className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{facilityMetrics.currentPopulation} / {facilityMetrics.totalCapacity} beds</p>

            <div className="space-y-2 text-sm mb-3">
              <div className="flex justify-between">
                <span className="text-slate-700 dark:text-slate-400">Male Inmates:</span>
                <span className="text-slate-900 dark:text-white font-semibold">{facilityMetrics.maleInmates} (82.9%)</span>
              </div>
              <div className="text-xs text-slate-500 ml-4 space-y-0.5">
                <div>├─ General Population: 612</div>
                <div>├─ Disciplinary Segregation: 48</div>
                <div>├─ Administrative Seg: 28</div>
                <div>└─ Protective Custody: 10</div>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-700 dark:text-slate-400">Female Inmates:</span>
                <span className="text-slate-900 dark:text-white font-semibold">{facilityMetrics.femaleInmates} (17.1%)</span>
              </div>
              <div className="text-xs text-slate-500 ml-4 space-y-0.5">
                <div>├─ General Population: 128</div>
                <div>└─ Medical/Segregation: 16</div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200 dark:border-slate-700/50">
              <div className="text-xs text-slate-700 dark:text-slate-400 mb-1">Today's Activity (0000-1838 hrs):</div>
              <div className="text-xs text-slate-700 dark:text-slate-300 mb-1">Bookings: 18 (7 felony, 9 misdemeanor, 2 violations)</div>
              <div className="text-xs text-slate-700 dark:text-slate-300 mb-1">Releases: 14 (8 bond, 4 time served, 2 transfers)</div>
              <div className="flex items-center gap-1 text-sm">
                <span className="text-slate-700 dark:text-slate-400">Net Change:</span>
                <TrendingUp className="w-3 h-3 text-slate-700 dark:text-slate-400" />
                <span className="text-slate-700 dark:text-slate-300 font-bold">+{facilityMetrics.netChange}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-200 dark:border-slate-700/50 mt-2 text-xs space-y-1">
              <div className="flex items-center gap-1 text-amber-600 dark:text-amber-400">
                <AlertTriangle className="w-3 h-3" />
                <span>Approaching 95% threshold (876 inmates)</span>
              </div>
              <div className="text-slate-500">ACA capacity standard: &lt;95% for accreditation</div>
              <div className="text-slate-500">7-day average: {facilityMetrics.sevenDayAverage} inmates</div>
              <div className="text-slate-700 dark:text-slate-400">Forecast (7 days): 840-850 range</div>
            </div>
          </div>

          {/* Today's Activity Card - Enhanced */}
          <div className="bg-white dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700/50 rounded-xl shadow-sm dark:shadow-none p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-white dark:bg-slate-700/60 rounded-lg">
                <Activity className="w-6 h-6 text-slate-700 dark:text-slate-400" />
              </div>
              <div className="flex items-center gap-1">
                <TrendingUp className="w-5 h-5 text-slate-700 dark:text-slate-400" />
                <span className="text-slate-900 dark:text-white font-semibold text-2xl">+{facilityMetrics.netChange}</span>
              </div>
            </div>
            <h3 className="text-slate-700 dark:text-slate-400 text-sm mb-1">Today's Activity</h3>
            <p className="text-xs text-slate-500 mb-3">(0000-1838 hrs on Jan 18, 2026)</p>

            <div className="space-y-3">
              <div>
                <div className="flex justify-between items-center text-sm mb-1">
                  <span className="text-slate-700 dark:text-slate-300">Bookings:</span>
                  <span className="text-slate-900 dark:text-white font-bold">{facilityMetrics.bookingsToday} total</span>
                </div>
                <div className="text-xs text-slate-500 ml-2 space-y-0.5">
                  <div>├─ Felony: 7 (assault: 2, theft: 2, drugs: 2, burglary: 1)</div>
                  <div>├─ Misdemeanor: 9 (DUI: 4, battery: 3, shoplifting: 2)</div>
                  <div>└─ Probation Violations: 2</div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center text-sm mb-1">
                  <span className="text-slate-700 dark:text-slate-300">Releases:</span>
                  <span className="text-slate-900 dark:text-white font-bold">{facilityMetrics.releasesToday} total</span>
                </div>
                <div className="text-xs text-slate-500 ml-2 space-y-0.5">
                  <div>├─ Bond Posted: 8</div>
                  <div>├─ Time Served: 4</div>
                  <div>├─ Transferred to State: 2 (sentenced to GDOC)</div>
                  <div>└─ Court Ordered: 0</div>
                </div>
              </div>
              <div className="flex justify-between items-center text-sm pt-2 border-t border-slate-200 dark:border-slate-700/50">
                <span className="text-slate-700 dark:text-slate-400">Net Change:</span>
                <span className="text-slate-700 dark:text-slate-300 font-bold">+{facilityMetrics.netChange} (842 current)</span>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-700/50">
              <div className="flex items-center gap-2">
                <ArrowRight className="w-3 h-3 text-slate-700 dark:text-slate-400" />
                <span className="text-xs text-slate-700 dark:text-slate-300">Trend: Stable population</span>
              </div>
              <div className="text-xs text-slate-500 mt-1">Normal operations - weekend avg: 14-22 bookings/day</div>
            </div>
          </div>

          {/* Court Transports Card - Enhanced */}
          <div className="bg-white dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700/50 rounded-xl shadow-sm dark:shadow-none p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-amber-500/20 rounded-lg">
                <Calendar className="w-6 h-6 text-amber-600 dark:text-amber-400" />
              </div>
              <div className="text-3xl font-bold text-amber-600 dark:text-amber-400">5</div>
            </div>
            <h3 className="text-slate-700 dark:text-slate-400 text-sm mb-1">Court Transports Today</h3>
            <p className="text-xs text-slate-500 mb-3">(Jan 18, 2026 - Saturday)</p>

            <div className="space-y-2 text-sm">
              <div className="text-xs text-slate-700 dark:text-slate-400 mb-2">Today: 5 transports (weekend court)</div>
              <div className="text-xs text-slate-500 space-y-0.5">
                <div>├─ Magistrate Court: 3 (emergency bond hearings)</div>
                <div>├─ Superior Court: 2 (murder case - ongoing trial)</div>
                <div className="flex items-center gap-1 text-green-600 dark:text-green-400">└─ Status: All completed by 1600 hrs <Check className="w-3 h-3" /></div>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-700/50">
              <div className="text-xs text-amber-600 dark:text-amber-400 font-medium mb-2">Tomorrow's Schedule: 31 transports</div>
              <div className="text-xs text-slate-500 space-y-0.5">
                <div>├─ Superior Court: 17 (arraignments) - Depart 0630</div>
                <div>├─ State Court: 9 (hearings) - Depart 0730</div>
                <div>└─ Probation: 5 inmates - Depart 0800</div>
              </div>
              <div className="mt-2 p-2 bg-amber-500/10 border border-amber-500/20 rounded text-xs">
                <div className="flex items-center gap-1 text-amber-600 dark:text-amber-400">
                  <AlertTriangle className="w-3 h-3" />
                  <span>Resource Check Needed:</span>
                </div>
                <div className="text-slate-700 dark:text-slate-400 mt-1">4 vans available (need 5) - stagger departures</div>
              </div>
            </div>
          </div>

          {/* Average Length of Stay Card - Enhanced */}
          <div className="bg-white dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700/50 rounded-xl shadow-sm dark:shadow-none p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-white dark:bg-slate-700/60 rounded-lg">
                <Clock className="w-6 h-6 text-slate-700 dark:text-slate-400" />
              </div>
              <div className="text-3xl font-bold text-slate-900 dark:text-white">{facilityMetrics.averageLength}</div>
            </div>
            <h3 className="text-slate-700 dark:text-slate-400 text-sm mb-1">Average Length of Stay</h3>
            <p className="text-lg text-slate-900 dark:text-white mb-2">Days</p>

            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-1 text-amber-600 dark:text-amber-400">
                <TrendingUp className="w-4 h-4" />
                <span>+1.2 days vs last month (22.2 days)</span>
              </div>
              <div className="pt-2 border-t border-slate-200 dark:border-slate-700/50 text-xs space-y-1">
                <div className="text-slate-700 dark:text-slate-400">Current Breakdown:</div>
                <div className="text-slate-500 ml-2">├─ Median: {facilityMetrics.medianStay} days</div>
                <div className="text-slate-500 ml-2">├─ Shortest: &lt;1 day (bond posted same day)</div>
                <div className="text-slate-500 ml-2">└─ Longest: {facilityMetrics.longestStay} days (pre-trial murder)</div>
              </div>
              <div className="pt-2 border-t border-slate-200 dark:border-slate-700/50 text-xs space-y-1">
                <div className="text-slate-700 dark:text-slate-400">By Charge Type:</div>
                <div className="text-slate-500 ml-2">├─ Misdemeanor: Avg 8.4 days</div>
                <div className="text-slate-500 ml-2">├─ Felony (bondable): Avg 28.6 days</div>
                <div className="text-slate-500 ml-2">└─ No-bond holds: Avg 127 days</div>
              </div>
            </div>

            <div className="mt-2 pt-2 border-t border-slate-200 dark:border-slate-700/50 text-xs space-y-1">
              <div className="flex items-center gap-1">
                <Circle className="w-2 h-2 fill-green-400 text-green-600 dark:text-green-400" />
                <span className="text-green-600 dark:text-green-400">Performance: Below 25-day target</span>
              </div>
              <div className="text-slate-500">National average: 26 days (we're performing better)</div>
            </div>
          </div>
        </div>

        {/* Population Trend Chart */}
        <div className="mb-6 bg-white dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700/50 rounded-xl shadow-sm dark:shadow-none p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-slate-700 dark:text-slate-400" />
                Population Trend - Last 7 Days
              </h2>
              <p className="text-xs text-slate-500 mt-1">(Dec 4 - Dec 11, 2024)</p>
            </div>
            <button className="text-sm text-amber-600 dark:text-amber-400 hover:text-amber-300 font-medium">
              View 30-Day Trend →
            </button>
          </div>

          {/* Simple Bar Chart */}
          <div className="flex items-end gap-2 h-32 mb-4">
            {populationTrend.map((day, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-1 group">
                <div className="text-xs text-slate-700 dark:text-slate-400 mb-1">{day.population}</div>
                <div
                  className="w-full bg-slate-600 rounded-t hover:bg-slate-500 transition-colors cursor-pointer relative"
                  style={{ height: `${(day.population / 850) * 100}%` }}
                  title={`${day.date}: ${day.population} inmates`}
                />
                <div className="text-xs text-slate-500 mt-1">{day.date}</div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-200 dark:border-slate-700 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="text-sm mb-2">
                  <span className="text-slate-700 dark:text-slate-400">7-Day Average:</span>{' '}
                  <span className="text-slate-900 dark:text-white font-bold">{facilityMetrics.sevenDayAverage} inmates (91.6% of capacity)</span>
                </div>
                <div className="text-sm">
                  <span className="text-slate-700 dark:text-slate-400">Trend Analysis:</span>{' '}
                  <span className="text-slate-700 dark:text-slate-300 font-medium flex items-center gap-1 inline-flex">
                    <ArrowRight className="w-3 h-3" />
                    Stable
                  </span>
                </div>
                <div className="text-xs text-slate-500 ml-4 mt-1 space-y-0.5">
                  <div>├─ Daily variance: ±4 inmates (normal fluctuation)</div>
                  <div>├─ No significant spikes or drops</div>
                  <div>└─ Weekend booking patterns normal</div>
                </div>
              </div>
              <div>
                <div className="text-sm mb-2">
                  <span className="text-slate-700 dark:text-slate-400">Current Capacity:</span>{' '}
                  <span className="text-amber-600 dark:text-amber-400 font-bold">920 beds (91.5% occupied)</span>
                </div>
                <div className="text-xs text-slate-500 ml-4 space-y-0.5">
                  <div>├─ ACA Maximum: 874 beds (95% threshold)</div>
                  <div>├─ Current buffer: 32 beds to threshold</div>
                  <div>└─ Critical capacity: 78 beds to absolute max</div>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-slate-800/60 border border-slate-700/50 rounded-lg p-3">
              <div className="text-sm">
                <span className="text-slate-700 dark:text-slate-400">7-Day Forecast:</span>{' '}
                <span className="text-slate-700 dark:text-slate-300 font-bold">840-850 inmates</span>
              </div>
              <div className="text-xs text-slate-500 mt-1 space-y-0.5">
                <div>├─ Based on 30-day booking/release trends</div>
                <div>├─ Confidence: 85% (historical accuracy)</div>
                <div>└─ Risk factors: None identified (holiday season = lower bookings)</div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Active Alerts Banner with Actions */}
        {visibleAlerts.length > 0 && (
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-amber-600 dark:text-amber-400 font-semibold">Active Alerts ({visibleAlerts.length})</h4>
                  <div className="flex gap-2">
                    <button className="text-xs text-slate-700 dark:text-slate-400 hover:text-slate-700 dark:text-slate-300">Dismiss All</button>
                    <span className="text-slate-700">|</span>
                    <button className="text-xs text-slate-700 dark:text-slate-400 hover:text-slate-700 dark:text-slate-300">View Alert History</button>
                  </div>
                </div>
                <div className="space-y-3">
                  {/* Alert 1: H2-Pod Over Capacity */}
                  {visibleAlerts.find(a => a.id === 1)?.visible && (
                    <div className="bg-white dark:bg-slate-900/50 border border-red-500/30 rounded-lg p-4">
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex items-start gap-2 flex-1">
                          <Circle className="w-3 h-3 fill-red-500 text-red-500 mt-1 flex-shrink-0" />
                          <div>
                            <p className="text-sm text-slate-900 dark:text-white font-semibold">H2-Pod Over Capacity (36/32 beds - 112%)</p>
                            <p className="text-xs text-slate-700 dark:text-slate-400 mt-1">Federal housing pod - ICE detainee overflow</p>
                          </div>
                        </div>
                        <button onClick={() => dismissAlert(1)} className="text-slate-500 hover:text-slate-700 dark:text-slate-300 transition-colors">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="ml-5 text-xs space-y-2">
                        <div className="text-slate-700 dark:text-slate-300">4 inmates on emergency mattresses:</div>
                        <div className="text-slate-700 dark:text-slate-400 ml-2 space-y-0.5">
                          <div>• Booking #2024-18472 (Martinez, José - 12/15 booking)</div>
                          <div>• Booking #2024-18483 (Rodriguez, Carlos - 12/16 booking)</div>
                          <div>• Booking #2024-18491 (Hernandez, Luis - 12/17 booking)</div>
                          <div>• Booking #2024-18502 (Gomez, Miguel - 12/18 booking)</div>
                        </div>
                        <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 mt-2">
                          <AlertTriangle className="w-3 h-3" />
                          <span>ACA Violation: Exceeds maximum capacity</span>
                        </div>
                        <div className="text-red-600 dark:text-red-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          Federal audit: Dec 12-14 (3 days away)
                        </div>
                        <div className="mt-2 p-2 bg-white dark:bg-slate-800/60 border border-slate-700/50 rounded text-slate-700 dark:text-slate-300">
                          <strong>Recommended:</strong> Relocate Martinez and Rodriguez (lowest security risk) to E-Pod beds 45, 46 (currently vacant)
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-3 ml-5">
                        <button className="px-3 py-1.5 bg-slate-50 dark:bg-slate-700/40 border border-slate-600/50 text-slate-700 dark:text-slate-300 rounded text-xs hover:bg-slate-700/60">
                          Relocate 2 Inmates to E-Pod
                        </button>
                        <button className="px-3 py-1.5 bg-slate-50 dark:bg-slate-700/40 border border-slate-600/50 text-slate-700 dark:text-slate-300 rounded text-xs hover:bg-slate-700/60">
                          Request Bond Review
                        </button>
                        <button className="px-3 py-1.5 bg-slate-50 dark:bg-slate-700/40 border border-slate-600/50 text-slate-700 dark:text-slate-300 rounded text-xs hover:bg-slate-700/60">
                          View Full Pod Status
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Alert 2: E-Pod Medical Housing */}
                  {visibleAlerts.find(a => a.id === 2)?.visible && (
                    <div className="bg-white dark:bg-slate-900/50 border border-amber-500/30 rounded-lg p-4">
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex items-start gap-2 flex-1">
                          <Circle className="w-3 h-3 fill-amber-500 text-amber-700 mt-1 flex-shrink-0" />
                          <div>
                            <p className="text-sm text-slate-900 dark:text-white font-semibold">E-Pod: Medical Housing at 92% (44/48 beds)</p>
                            <p className="text-xs text-slate-700 dark:text-slate-400 mt-1">Medical observation pod approaching capacity</p>
                          </div>
                        </div>
                        <button onClick={() => dismissAlert(2)} className="text-slate-500 hover:text-slate-700 dark:text-slate-300 transition-colors">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="ml-5 text-xs space-y-2">
                        <div className="text-slate-700 dark:text-slate-300">Current Occupants (by type):</div>
                        <div className="text-slate-700 dark:text-slate-400 ml-2 space-y-0.5">
                          <div>• General medical holds: 18 inmates (chronic conditions, medications)</div>
                          <div>• Psychiatric observation: 12 inmates (suicide watch, mental health crisis)</div>
                          <div>• Infirmary: 8 inmates (post-hospitalization recovery)</div>
                          <div>• Substance withdrawal: 6 inmates (detox monitoring - 48-72 hr protocol)</div>
                        </div>
                        <div className="mt-2 text-slate-700 dark:text-slate-300">Pending Actions:</div>
                        <div className="text-slate-700 dark:text-slate-400 ml-2 space-y-0.5">
                          <div>• 3 inmates cleared by Gwinnett Medical for return to gen-pop</div>
                          <div className="text-slate-500 ml-2">- Waiting on psychiatric clearance (Dr. Anderson reviewing)</div>
                          <div>• 2 inmates scheduled for discharge tomorrow</div>
                        </div>
                        <div className="text-slate-700 dark:text-slate-400 flex items-center gap-1 mt-2">
                          <Clock className="w-3 h-3" />
                          Next Review: Tomorrow 0800 with Medical Director Chen
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-3 ml-5">
                        <button className="px-3 py-1.5 bg-slate-50 dark:bg-slate-700/40 border border-slate-600/50 text-slate-700 dark:text-slate-300 rounded text-xs hover:bg-slate-700/60">
                          View Medical Dashboard
                        </button>
                        <button className="px-3 py-1.5 bg-slate-50 dark:bg-slate-700/40 border border-slate-600/50 text-slate-700 dark:text-slate-300 rounded text-xs hover:bg-slate-700/60">
                          Discharge Review
                        </button>
                        <button className="px-3 py-1.5 bg-slate-50 dark:bg-slate-700/40 border border-slate-600/50 text-slate-700 dark:text-slate-300 rounded text-xs hover:bg-slate-700/60">
                          Contact Dr. Anderson
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Alert 3: B-Shift Staffing */}
                  {visibleAlerts.find(a => a.id === 3)?.visible && (
                    <div className="bg-white dark:bg-slate-900/50 border border-amber-500/30 rounded-lg p-4">
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex items-start gap-2 flex-1">
                          <Circle className="w-3 h-3 fill-amber-500 text-amber-700 mt-1 flex-shrink-0" />
                          <div>
                            <p className="text-sm text-slate-900 dark:text-white font-semibold">B-Shift: 1 position unfilled - Coverage adjusted</p>
                            <p className="text-xs text-slate-700 dark:text-slate-400 mt-1">Officer Martinez called out (family emergency - approved leave)</p>
                          </div>
                        </div>
                        <button onClick={() => dismissAlert(3)} className="text-slate-500 hover:text-slate-700 dark:text-slate-300 transition-colors">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="ml-5 text-xs space-y-2">
                        <div className="text-slate-700 dark:text-slate-300">Current staffing: 13/14 officers (93% - below policy minimum)</div>
                        <div className="mt-2 text-slate-700 dark:text-slate-300">Pod Coverage Status:</div>
                        <div className="text-slate-700 dark:text-slate-400 ml-2 space-y-0.5">
                          <div className="text-green-600 dark:text-green-400">✓ A-Pod (General Male): 2 officers (adequate)</div>
                          <div className="text-green-600 dark:text-green-400">✓ B-Pod (General Male): 2 officers (adequate)</div>
                          <div className="text-green-600 dark:text-green-400">✓ D-Pod (Female): 2 officers (adequate)</div>
                          <div className="text-green-600 dark:text-green-400">✓ E-Pod (Medical): 2 officers (adequate)</div>
                          <div className="text-amber-600 dark:text-amber-400 flex items-center gap-1"><AlertTriangle className="w-3 h-3" /> G-Pod (Juvenile): 1 officer (policy requires 2)</div>
                          <div className="text-green-600 dark:text-green-400">✓ Control Room: 2 officers (adequate)</div>
                        </div>
                        <div className="mt-2 p-2 bg-green-500/10 border border-green-500/20 rounded text-green-600 dark:text-green-400">
                          <strong>Current Solution:</strong> Officer Johnson (A-Shift) extended 4 hours (1400-1800 hrs) to cover G-Pod second position. Approved by Shift Commander Davis.
                        </div>
                        <div className="text-amber-600 dark:text-amber-400 flex items-center gap-1 mt-2">
                          <AlertTriangle className="w-3 h-3" />
                          Policy Violation: Temporary variance approved by Major Wilson (4 hours)
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-3 ml-5">
                        <button className="px-3 py-1.5 bg-green-500/20 border border-green-500/30 text-green-600 dark:text-green-400 rounded text-xs hover:bg-green-500/30">
                          Approve 8-Hr OT ($416 cost)
                        </button>
                        <button className="px-3 py-1.5 bg-slate-50 dark:bg-slate-700/40 border border-slate-600/50 text-slate-700 dark:text-slate-300 rounded text-xs hover:bg-slate-700/60">
                          Reassign from A-Shift
                        </button>
                        <button className="px-3 py-1.5 bg-slate-50 dark:bg-slate-700/40 border border-slate-600/50 text-slate-700 dark:text-slate-300 rounded text-xs hover:bg-slate-700/60">
                          Accept Temp Variance
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Critical Tasks Section */}
        <div className="mb-6 bg-gradient-to-br from-red-500/10 to-red-600/5 border border-red-500/20 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-red-600 dark:text-red-400" />
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Critical Tasks - Detention</h2>
            </div>
            <div className="text-xs text-slate-700 dark:text-slate-400">Current time: 1838 hrs (6:38 PM)</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Due Today */}
            <div className="bg-white dark:bg-slate-900/50 border border-red-500/20 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <Clock className="w-4 h-4 text-red-600 dark:text-red-400" />
                <h3 className="text-sm font-semibold text-red-600 dark:text-red-400">DUE TODAY (4 tasks)</h3>
              </div>
              <div className="space-y-3">
                {/* Overdue task 1 */}
                <div className="text-sm border-l-2 border-red-500 pl-3">
                  <div className="flex items-center gap-2 text-red-600 dark:text-red-400 font-medium">
                    <X className="w-3 h-3" />
                    <span>OVERDUE: Process 3 bond hearings</span>
                  </div>
                  <div className="text-xs text-slate-700 dark:text-slate-400 mt-1">Deadline: 1600 hrs (2h 38m overdue)</div>
                  <div className="text-xs text-slate-500 mt-1">Status: Magistrate Judge left at 1630 (weekend hours)</div>
                  <div className="text-xs text-amber-600 dark:text-amber-400 mt-1">Action: Reschedule for Monday 0900</div>
                </div>
                {/* Overdue task 2 - in progress */}
                <div className="text-sm border-l-2 border-amber-500 pl-3">
                  <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-medium">
                    <Clock className="w-3 h-3" />
                    <span>Complete 7 medical screenings</span>
                  </div>
                  <div className="text-xs text-slate-700 dark:text-slate-400 mt-1">Status: 4/7 completed (3 pending - new bookings)</div>
                  <div className="text-xs text-slate-500 mt-1">Assigned: RN Martinez (on duty until 2200)</div>
                  <div className="text-xs text-green-600 dark:text-green-400 mt-1">ETA finish: 1930 hrs</div>
                </div>
                {/* Completed task */}
                <div className="text-sm border-l-2 border-green-500 pl-3">
                  <div className="flex items-center gap-2 text-green-600 dark:text-green-400 font-medium">
                    <Check className="w-3 h-3" />
                    <span>Finalize 2 disciplinary hearings</span>
                  </div>
                  <div className="text-xs text-slate-700 dark:text-slate-400 mt-1">Completed at 1615 hrs</div>
                  <div className="text-xs text-slate-500 mt-1">Rodriguez: 5 days seg, Anderson: 10 days seg</div>
                </div>
                {/* Overdue task 3 */}
                <div className="text-sm border-l-2 border-red-500 pl-3">
                  <div className="flex items-center gap-2 text-red-600 dark:text-red-400 font-medium">
                    <X className="w-3 h-3" />
                    <span>OVERDUE: Submit federal housing report</span>
                  </div>
                  <div className="text-xs text-slate-700 dark:text-slate-400 mt-1">Deadline: 1640 hrs (1h 58m overdue)</div>
                  <div className="text-xs text-slate-500 mt-1">Status: Awaiting Sgt. Davis signature</div>
                  <div className="text-xs text-amber-600 dark:text-amber-400 mt-1">Action: Notify Sgt. Davis immediately</div>
                </div>
              </div>
            </div>

            {/* Overdue */}
            <div className="bg-white dark:bg-slate-900/50 border border-red-500/30 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400" />
                <h3 className="text-sm font-semibold text-red-600 dark:text-red-400">OVERDUE (3 tasks)</h3>
              </div>
              <div className="space-y-2 text-xs">
                <div className="p-2 bg-red-500/10 border border-red-500/20 rounded">
                  <div className="text-slate-700 dark:text-slate-300">Tasks moved from "Due Today" (past deadline):</div>
                  <div className="text-red-600 dark:text-red-400 mt-2 space-y-1">
                    <div>• Process 3 bond hearings (2h 38m overdue)</div>
                    <div>• Complete 7 medical screenings (1h 38m - in progress)</div>
                    <div>• Submit federal housing report (1h 58m - awaiting signature)</div>
                  </div>
                  <div className="text-amber-600 dark:text-amber-400 mt-2">All require immediate attention.</div>
                </div>
                <button className="w-full mt-2 px-3 py-1.5 bg-red-500/20 border border-red-500/30 text-red-600 dark:text-red-400 rounded text-xs hover:bg-red-500/30">
                  Escalate to Major Wilson
                </button>
              </div>
            </div>

            {/* Upcoming */}
            <div className="bg-white dark:bg-slate-900/50 border border-slate-700/50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <CalendarClock className="w-4 h-4 text-slate-700 dark:text-slate-400" />
                <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300">UPCOMING (Next 24-48 hours)</h3>
              </div>
              <div className="space-y-3 text-xs">
                <div>
                  <div className="text-slate-700 dark:text-slate-300 font-medium">Tomorrow (Monday, Dec 12):</div>
                  <div className="mt-1 space-y-2">
                    <div className="p-2 bg-amber-500/10 border border-amber-500/20 rounded">
                      <div className="flex items-center gap-1 text-amber-600 dark:text-amber-400">
                        <Truck className="w-3 h-3" />
                        <span className="font-medium">31 court transports</span>
                      </div>
                      <div className="text-slate-700 dark:text-slate-400 mt-1">Start: 0630 hrs | Lt. Thompson coordinating</div>
                      <div className="text-slate-500">4 vans available (need 5) - stagger planned</div>
                    </div>
                    <div className="p-2 bg-red-500/10 border border-red-500/20 rounded">
                      <div className="flex items-center gap-1 text-red-600 dark:text-red-400">
                        <Search className="w-3 h-3" />
                        <span className="font-medium">Federal audit begins</span>
                      </div>
                      <div className="text-slate-700 dark:text-slate-400 mt-1">Dec 12-14 | U.S. Marshals inspection</div>
                      <div className="text-slate-500">Status: 95% ready (H2-Pod issue pending)</div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="text-slate-700 dark:text-slate-300 font-medium">This Week:</div>
                  <div className="mt-1 space-y-1 text-slate-700 dark:text-slate-400">
                    <div className="flex items-center gap-1">
                      <FileText className="w-3 h-3" />
                      Monthly pod inspections (5 pending) - Dec 15
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      Staff performance reviews (3) - Dec 13-14
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 flex gap-2">
            <button className="px-4 py-2 bg-slate-50 dark:bg-slate-700/40 border border-slate-600/50 text-slate-700 dark:text-slate-300 rounded-lg text-sm hover:bg-slate-700/60">
              View Full Task Calendar
            </button>
            <button className="px-4 py-2 bg-slate-50 dark:bg-slate-700/40 border border-slate-600/50 text-slate-700 dark:text-slate-300 rounded-lg text-sm hover:bg-slate-700/60">
              Assign New Task
            </button>
            <button className="px-4 py-2 bg-slate-50 dark:bg-slate-700/40 border border-slate-600/50 text-slate-700 dark:text-slate-300 rounded-lg text-sm hover:bg-slate-700/60">
              Mark Complete
            </button>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Housing Units Status - Enhanced with Clickable Pods */}
          <div className="lg:col-span-2 bg-white dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700/50 rounded-xl shadow-sm dark:shadow-none p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Bed className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                Housing Units Status
              </h2>
              <button
                onClick={() => navigate('/jail/housing')}
                className="text-amber-600 dark:text-amber-400 hover:text-amber-300 text-sm font-medium"
              >
                View Details →
              </button>
            </div>
            <div className="space-y-2 max-h-[600px] overflow-y-auto">
              {housingUnits.map((unit) => (
                <div
                  key={unit.id}
                  className="bg-white dark:bg-slate-900/50 border border-slate-700 rounded-lg p-4 hover:border-slate-600 transition-colors cursor-pointer"
                  onClick={() => setSelectedPod(unit)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="text-lg font-bold text-slate-900 dark:text-white">{unit.name}</div>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(unit.status)}`}>
                        {unit.status}
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-slate-700 dark:text-slate-400">Capacity</div>
                      <div className={`text-lg font-bold ${getCapacityColor((unit.current / unit.capacity) * 100)}`}>
                        {unit.current}/{unit.capacity}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="text-slate-700 dark:text-slate-400">
                      {unit.type} • {unit.security} Security
                    </div>
                    <div className={`font-medium ${getCapacityColor((unit.current / unit.capacity) * 100)}`}>
                      {Math.round((unit.current / unit.capacity) * 100)}%
                    </div>
                  </div>
                  {unit.notes && (
                    <div className="mt-2 pt-2 border-t border-slate-200 dark:border-slate-700 text-sm flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0" />
                      <span className="text-amber-600 dark:text-amber-400">{unit.notes}</span>
                    </div>
                  )}
                  <div className="mt-2">
                    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all ${
                          (unit.current / unit.capacity) * 100 >= 95 ? 'bg-red-500' :
                          (unit.current / unit.capacity) * 100 >= 85 ? 'bg-amber-500' :
                          'bg-slate-500'
                        }`}
                        style={{ width: `${Math.min((unit.current / unit.capacity) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Enhanced Classification Breakdown */}
            <div className="bg-white dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700/50 rounded-xl shadow-sm dark:shadow-none p-5">
              <div className="flex items-center gap-2 mb-1">
                <Shield className="w-5 h-5 text-slate-700 dark:text-slate-400" />
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Inmate Classification</h2>
              </div>
              <p className="text-xs text-slate-500 mb-4">(Security & Housing Assignment System)</p>
              <p className="text-xs text-slate-700 dark:text-slate-400 mb-4">Total: 842 inmates (100%)</p>

              <div className="space-y-3 mb-4 max-h-[400px] overflow-y-auto pr-2">
                {/* Minimum Security */}
                <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-green-600 dark:text-green-400 font-medium flex items-center gap-1">
                      <Circle className="w-2 h-2 fill-green-400" />
                      Minimum Security
                    </span>
                    <span className="text-slate-900 dark:text-white font-semibold">117 (13.9%)</span>
                  </div>
                  <div className="text-xs text-slate-700 dark:text-slate-400 mt-1">
                    Criteria: Non-violent offenders, no escape risk, good behavior
                  </div>
                  <div className="text-xs text-slate-500 mt-1">Housing: G2-Pod (Transitional), minimum wings</div>
                  <div className="text-xs text-green-600 dark:text-green-400 mt-1">Privileges: Work release eligible, enhanced visitation</div>
                </div>

                {/* Medium Security */}
                <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-amber-800 font-medium flex items-center gap-1">
                      <Circle className="w-2 h-2 fill-yellow-400" />
                      Medium Security
                    </span>
                    <span className="text-slate-900 dark:text-white font-semibold">419 (49.8%)</span>
                  </div>
                  <div className="text-xs text-slate-700 dark:text-slate-400 mt-1">
                    Criteria: Standard inmates, moderate risk, most common classification
                  </div>
                  <div className="text-xs text-slate-500 mt-1">Housing: A-Pod, B-Pod (general population)</div>
                  <div className="text-xs text-amber-800 mt-1">Privileges: Standard visitation, commissary, recreation</div>
                </div>

                {/* Maximum Security */}
                <div className="p-3 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-orange-400 font-medium flex items-center gap-1">
                      <Circle className="w-2 h-2 fill-orange-400" />
                      Maximum Security
                    </span>
                    <span className="text-slate-900 dark:text-white font-semibold">148 (17.6%)</span>
                  </div>
                  <div className="text-xs text-slate-700 dark:text-slate-400 mt-1">
                    Criteria: Violent offenders, gang members, escape risks
                  </div>
                  <div className="text-xs text-slate-500 mt-1">Housing: Secure wings in A-Pod, B-Pod (restricted)</div>
                  <div className="text-xs text-orange-400 mt-1">Privileges: Limited - restricted movement, no contact visits</div>
                </div>

                {/* Administrative Segregation */}
                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-red-600 dark:text-red-400 font-medium flex items-center gap-1">
                      <Circle className="w-2 h-2 fill-red-400" />
                      Administrative Segregation
                    </span>
                    <span className="text-slate-900 dark:text-white font-semibold">28 (3.3%)</span>
                  </div>
                  <div className="text-xs text-slate-700 dark:text-slate-400 mt-1">
                    Purpose: Separated from general population for safety/security
                  </div>
                  <div className="text-xs text-slate-500 mt-1 space-y-0.5">
                    <div>├─ Disciplinary Seg: 12 (rule violations, fighting)</div>
                    <div>├─ Protective Custody: 8 (at risk from other inmates)</div>
                    <div>└─ Investigation Hold: 8 (pending investigation)</div>
                  </div>
                </div>

                {/* Protective Custody */}
                <div className="p-3 bg-white dark:bg-slate-800/60 border border-slate-700/50 rounded-lg">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-700 dark:text-slate-300 font-medium flex items-center gap-1">
                      <Shield className="w-3 h-3" />
                      Protective Custody (General)
                    </span>
                    <span className="text-slate-900 dark:text-white font-semibold">41 (4.9%)</span>
                  </div>
                  <div className="text-xs text-slate-700 dark:text-slate-400 mt-1">
                    Reason: Safety concerns (not disciplinary)
                  </div>
                  <div className="text-xs text-slate-500 mt-1 space-y-0.5">
                    <div>├─ Former law enforcement: 6</div>
                    <div>├─ Sex offenders: 18 (targeted by gen-pop)</div>
                    <div>├─ High-profile cases: 3 (media attention)</div>
                    <div>└─ Self-requested: 14 (voluntary segregation)</div>
                  </div>
                </div>

                {/* Medical Housing */}
                <div className="p-3 bg-white dark:bg-slate-800/60 border border-slate-700/50 rounded-lg">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-700 dark:text-slate-300 font-medium flex items-center gap-1">
                      <Hospital className="w-3 h-3" />
                      Medical Housing
                    </span>
                    <span className="text-slate-900 dark:text-white font-semibold">44 (5.2%)</span>
                  </div>
                  <div className="text-xs text-slate-700 dark:text-slate-400 mt-1">
                    E-Pod medical observation unit
                  </div>
                  <div className="text-xs text-slate-500 mt-1 space-y-0.5">
                    <div>├─ Chronic medical: 18 (diabetes, heart, etc.)</div>
                    <div>├─ Psychiatric observation: 12 (suicide watch, crisis)</div>
                    <div>├─ Infirmary care: 8 (post-hospitalization)</div>
                    <div>└─ Substance withdrawal: 6 (detox 48-72 hrs)</div>
                  </div>
                </div>

                {/* Mental Health */}
                <div className="p-3 bg-cyan-500/10 border border-cyan-500/20 rounded-lg">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-cyan-400 font-medium flex items-center gap-1">
                      <Activity className="w-3 h-3" />
                      Mental Health Housing
                    </span>
                    <span className="text-slate-900 dark:text-white font-semibold">38 (4.5%)</span>
                  </div>
                  <div className="text-xs text-slate-700 dark:text-slate-400 mt-1">
                    Specialized mental health treatment
                  </div>
                  <div className="text-xs text-slate-500 mt-1 space-y-0.5">
                    <div>├─ Severe mental illness: 22 (schizophrenia, bipolar)</div>
                    <div>├─ Suicide prevention: 8 (active monitoring 24/7)</div>
                    <div>└─ Competency evaluation: 8 (court-ordered psych eval)</div>
                  </div>
                </div>

                {/* Awaiting Classification */}
                <div className="p-3 bg-slate-500/10 border border-slate-500/20 rounded-lg">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-700 dark:text-slate-300 font-medium flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      Awaiting Classification
                    </span>
                    <span className="text-slate-900 dark:text-white font-semibold">7 (0.8%)</span>
                  </div>
                  <div className="text-xs text-slate-700 dark:text-slate-400 mt-1">
                    New bookings within last 24 hours
                  </div>
                  <div className="text-xs text-slate-500 mt-1">Process: Initial assessment → Medical → Classification committee</div>
                  <div className="text-xs text-slate-700 dark:text-slate-400 mt-1">Current: 5 booked today, 2 pending review tomorrow</div>
                </div>
              </div>

              {/* Recent Classification Changes */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-2">Recent Changes Today:</h3>
                <div className="space-y-2">
                  {classificationChanges.map((change, idx) => (
                    <div key={idx} className="text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-slate-500 rounded-full flex-shrink-0"></div>
                        <span className="text-slate-700 dark:text-slate-300">{change.description}</span>
                      </div>
                      <div className="text-slate-500 ml-3.5">{change.time}</div>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2 mt-3">
                  <button className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-xs font-medium">
                    View Classification Manual
                  </button>
                  <button className="flex-1 px-3 py-2 bg-slate-50 dark:bg-slate-700/40 border border-slate-600/50 text-slate-700 dark:text-slate-300 rounded-lg transition-colors text-xs font-medium hover:bg-slate-700/60">
                    Reclassification Requests (3)
                  </button>
                </div>
              </div>
            </div>

            {/* Enhanced Medical Alerts */}
            <div className="bg-white dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700/50 rounded-xl shadow-sm dark:shadow-none p-5">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Heart className="w-5 h-5 text-red-600 dark:text-red-400" />
                Medical Alerts
              </h2>
              <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                {/* Critical Medication */}
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-slate-900 dark:text-white font-medium text-sm flex items-center gap-2">
                      <Heart className="w-4 h-4 text-red-600 dark:text-red-400" />
                      Critical Medication
                    </span>
                    <span className="font-bold text-lg text-red-600 dark:text-red-400">12</span>
                  </div>
                  <p className="text-xs text-slate-700 dark:text-slate-300 mb-2">12 inmates require time-sensitive medications</p>
                  <div className="text-xs text-slate-500 mb-2 space-y-0.5">
                    <div>├─ Insulin (Diabetes): 5 inmates - every 6 hours</div>
                    <div>├─ Psychiatric meds: 4 inmates - daily at specific times</div>
                    <div>├─ Seizure meds: 2 inmates - every 8 hours</div>
                    <div>└─ HIV meds: 1 inmate - strict 12-hour schedule</div>
                  </div>
                  <div className="p-2 bg-white dark:bg-slate-900/50 rounded text-xs mb-2">
                    <div className="text-amber-600 dark:text-amber-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span className="font-medium">Next Medication Round: 1800 hrs (18 min from now)</span>
                    </div>
                    <div className="text-slate-700 dark:text-slate-400 mt-1">Assigned: RN Martinez (#MED-047), RN Chen (#MED-052)</div>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400">
                    <Check className="w-3 h-3" />
                    <span>Status: On schedule (98.7% compliance rate)</span>
                  </div>
                </div>

                {/* Medical Holds */}
                <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-slate-900 dark:text-white font-medium text-sm flex items-center gap-2">
                      <Stethoscope className="w-4 h-4 text-orange-400" />
                      Medical Holds
                    </span>
                    <span className="font-bold text-lg text-orange-400">8</span>
                  </div>
                  <p className="text-xs text-slate-700 dark:text-slate-300 mb-2">8 inmates cannot be released without medical clearance</p>
                  <div className="text-xs text-slate-500 mb-2 space-y-1">
                    <div className="text-slate-700 dark:text-slate-400 font-medium">Dental Clearances (3):</div>
                    <div className="ml-2 space-y-0.5">
                      <div>• Rodriguez (#18145) - extraction, Dec 12 at 0900</div>
                      <div>• Martinez (#17998) - abscess, Dec 12 at 1100</div>
                      <div>• Hernandez (#18201) - root canal, Dec 12 at 1400</div>
                    </div>
                    <div className="text-slate-700 dark:text-slate-400 font-medium mt-2">Injury Evaluations (5):</div>
                    <div className="ml-2 space-y-0.5">
                      <div>• Smith (#18312) - slip/fall, awaiting orthopedist</div>
                      <div>• Johnson (#17845) - fight injury, neurology pending</div>
                      <div>• Williams (#18156) - wrist pain, ortho Dec 13</div>
                      <div>• Davis (#17923) - chest pain, cardiology expected today</div>
                      <div>• Anderson (#18267) - laceration, sutures Dec 18</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-slate-700 dark:text-slate-400">
                    <User className="w-3 h-3" />
                    <span>Reviewing: Dr. Anderson | Next: Tomorrow 0800</span>
                  </div>
                </div>

                {/* Suicide Watch */}
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-slate-900 dark:text-white font-medium text-sm flex items-center gap-2">
                      <AlertOctagon className="w-4 h-4 text-red-600 dark:text-red-400" />
                      Suicide Watch
                    </span>
                    <span className="font-bold text-lg text-red-600 dark:text-red-400">4</span>
                  </div>
                  <p className="text-xs text-slate-700 dark:text-slate-300 mb-2">4 inmates on active suicide prevention protocol (24/7)</p>
                  <div className="text-xs space-y-2 mb-2">
                    <div className="p-2 bg-white dark:bg-slate-900/50 rounded">
                      <div className="text-slate-900 dark:text-white">1. Anderson, Michael (#18423)</div>
                      <div className="text-slate-700 dark:text-slate-400">E-Pod Cell 12 | Since Dec 11, 2200 hrs (20 hours)</div>
                      <div className="text-slate-500">Reason: Suicidal ideation at booking | Status: Stable</div>
                    </div>
                    <div className="p-2 bg-white dark:bg-slate-900/50 rounded">
                      <div className="text-slate-900 dark:text-white">2. Martinez, David (#17956)</div>
                      <div className="text-slate-700 dark:text-slate-400">E-Pod Cell 14 | Since Dec 9 (3 days, 4 hours)</div>
                      <div className="text-slate-500">Reason: Previous attempt | Status: Improving</div>
                    </div>
                    <div className="p-2 bg-white dark:bg-slate-900/50 rounded">
                      <div className="text-slate-900 dark:text-white">3. Johnson, Sarah (#18501)</div>
                      <div className="text-slate-700 dark:text-slate-400">E-Pod Cell 16 | Since Dec 11, 0800 hrs (34 hours)</div>
                      <div className="text-slate-500">Reason: Intent expressed | Status: No longer expressing</div>
                    </div>
                    <div className="p-2 bg-white dark:bg-slate-900/50 rounded">
                      <div className="text-slate-900 dark:text-white">4. Chen, Robert (#18145)</div>
                      <div className="text-slate-700 dark:text-slate-400">E-Pod Cell 18 | Since Dec 10 (2 days, 2 hours)</div>
                      <div className="text-slate-500">Reason: Hearing voices | Status: Responding to meds</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1 text-slate-700 dark:text-slate-400">
                      <Users className="w-3 h-3" />
                      <span>2 additional officers assigned</span>
                    </div>
                    <div className="text-green-600 dark:text-green-400">Last check: 2 min ago</div>
                  </div>
                  <div className="mt-2 p-2 bg-green-500/10 border border-green-500/20 rounded text-xs text-green-600 dark:text-green-400">
                    <div className="flex items-center gap-1">
                      <Check className="w-3 h-3" />
                      <span className="font-medium">Zero completed suicides: 1,247 days (agency record)</span>
                    </div>
                  </div>
                </div>

                {/* Infectious Disease */}
                <div className="bg-white dark:bg-slate-900/50 border border-slate-700 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-slate-900 dark:text-white font-medium text-sm">Infectious Disease</span>
                    <span className="font-bold text-lg text-slate-900 dark:text-white">3</span>
                  </div>
                  <p className="text-xs text-slate-700 dark:text-slate-400 mb-2">Isolation protocols in effect</p>
                  <div className="text-xs text-slate-500">COVID-19: 1 (Day 3), TB exposure: 2 (testing pending)</div>
                  <div className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400 mt-2">
                    <Check className="w-3 h-3" />
                    <span>Monitored, no spread</span>
                  </div>
                </div>

                {/* Wheelchair/ADA */}
                <div className="bg-white dark:bg-slate-900/50 border border-slate-700 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-slate-900 dark:text-white font-medium text-sm">Wheelchair/ADA</span>
                    <span className="font-bold text-lg text-slate-900 dark:text-white">11</span>
                  </div>
                  <p className="text-xs text-slate-700 dark:text-slate-400 mb-2">Special housing accommodations</p>
                  <div className="text-xs text-slate-500">2 pending ADA requests under review</div>
                  <div className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400 mt-2">
                    <Check className="w-3 h-3" />
                    <span>All housed appropriately</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => navigate('/jail/medical')}
                className="mt-4 w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium"
              >
                View Medical Dashboard
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced Recent Bookings & Incidents */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Enhanced Recent Bookings */}
          <div className="bg-white dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700/50 rounded-xl shadow-sm dark:shadow-none p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-slate-700 dark:text-slate-400" />
                Recent Bookings
              </h2>
              <button
                onClick={() => navigate('/jail/booking')}
                className="text-amber-600 dark:text-amber-400 hover:text-amber-300 text-sm font-medium"
              >
                View All →
              </button>
            </div>
            <div className="space-y-4">
              {recentBookings.slice(0, 3).map((booking) => (
                <div key={booking.id} className="bg-white dark:bg-slate-900/50 border border-slate-700 rounded-lg p-4 hover:border-slate-600 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="text-slate-900 dark:text-white font-semibold">{booking.name}</div>
                      <div className="text-sm text-slate-700 dark:text-slate-400">{booking.id} • Inmate #{booking.inmateId}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-slate-700 dark:text-slate-400">Booked</div>
                      <div className="text-slate-900 dark:text-white font-medium">{booking.time}</div>
                      <div className="text-xs text-slate-500">{booking.bookingTime}</div>
                    </div>
                  </div>

                  {/* Charges */}
                  <div className="mb-3">
                    <div className="text-xs text-slate-700 dark:text-slate-400 mb-1">Charges:</div>
                    <div className="space-y-1">
                      {booking.charges.map((charge, idx) => (
                        <div key={idx} className="text-sm text-amber-600 dark:text-amber-400 flex items-center gap-1">
                          <div className="w-1 h-1 bg-amber-400 rounded-full"></div>
                          {charge}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Status Timeline */}
                  {booking.classification && (
                    <div className="mb-3 p-2 bg-white dark:bg-slate-800/50 rounded text-xs space-y-1">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-3 h-3 text-green-600 dark:text-green-400" />
                        <span className="text-slate-700 dark:text-slate-300">Fingerprints & Photo: Complete</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-3 h-3 text-green-600 dark:text-green-400" />
                        <span className="text-slate-700 dark:text-slate-300">Medical Screening: {booking.medicalScreening}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {booking.classification.includes('In progress') ? (
                          <Clock className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                        ) : (
                          <CheckCircle className="w-3 h-3 text-green-600 dark:text-green-400" />
                        )}
                        <span className="text-slate-700 dark:text-slate-300">Classification: {booking.classification}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {booking.housing?.includes('Temporary') ? (
                          <Clock className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                        ) : (
                          <CheckCircle className="w-3 h-3 text-green-600 dark:text-green-400" />
                        )}
                        <span className="text-slate-700 dark:text-slate-300">Housing: {booking.housing}</span>
                      </div>
                    </div>
                  )}

                  {/* Bond Status */}
                  <div className="flex items-center justify-between pt-3 border-t border-slate-200 dark:border-slate-700">
                    <div className="text-sm">
                      <span className="text-slate-700 dark:text-slate-400">Bond:</span>{' '}
                      <span className={booking.bond === 'No Bond' ? 'text-red-600 dark:text-red-400 font-semibold' : 'text-emerald-600 dark:text-emerald-400 font-semibold'}>
                        {booking.bond}
                      </span>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      booking.status === 'Housing Assigned' ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400' :
                      booking.status === 'Processing Release' ? 'bg-green-500/20 text-green-600 dark:text-green-400' :
                      'bg-amber-500/20 text-amber-600 dark:text-amber-400'
                    }`}>
                      {booking.status}
                    </span>
                  </div>

                  {/* Actions */}
                  {booking.status === 'Processing' && (
                    <div className="flex gap-2 mt-3">
                      <button className="flex-1 px-2 py-1 bg-slate-50 dark:bg-slate-700/40 border border-slate-600/50 text-slate-700 dark:text-slate-300 rounded text-xs hover:bg-slate-700/60">
                        View Full Record
                      </button>
                      <button className="flex-1 px-2 py-1 bg-slate-50 dark:bg-slate-700/40 border border-slate-600/50 text-slate-700 dark:text-slate-300 rounded text-xs hover:bg-slate-700/60">
                        Assign Housing
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Enhanced Recent Incidents */}
          <div className="bg-white dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700/50 rounded-xl shadow-sm dark:shadow-none p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
                Recent Incidents
              </h2>
              <button
                onClick={() => navigate('/jail/incidents')}
                className="text-amber-600 dark:text-amber-400 hover:text-amber-300 text-sm font-medium"
              >
                View All →
              </button>
            </div>
            <div className="space-y-4">
              {recentIncidents.slice(0, 3).map((incident) => (
                <div key={incident.id} className="bg-white dark:bg-slate-900/50 border border-slate-700 rounded-lg p-4 hover:border-slate-600 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className={`px-2 py-1 rounded text-xs font-bold ${
                        incident.severity === 'High' ? 'bg-red-500/20 text-red-600 dark:text-red-400' :
                        incident.severity === 'Medium' ? 'bg-amber-500/20 text-amber-600 dark:text-amber-400' :
                        'bg-slate-50 dark:bg-slate-700/40 text-slate-500'
                      }`}>
                        {incident.severity.toUpperCase()}
                      </div>
                      <div className="text-slate-900 dark:text-white font-semibold text-sm">{incident.type}</div>
                    </div>
                    <div className="text-xs text-slate-700 dark:text-slate-400">{incident.time}</div>
                  </div>

                  <div className="flex items-center gap-2 mb-2 text-sm text-slate-700 dark:text-slate-400">
                    <MapPin className="w-4 h-4 flex-shrink-0" />
                    <span>{incident.location}</span>
                  </div>

                  <p className="text-sm text-slate-700 dark:text-slate-300 mb-3">{incident.description}</p>

                  {/* Involved Parties */}
                  {incident.inmates && (
                    <div className="mb-2 text-xs">
                      <div className="text-slate-500 mb-1">Involved Inmates:</div>
                      <div className="space-y-0.5">
                        {incident.inmates.map((inmate, idx) => (
                          <div key={idx} className="text-slate-700 dark:text-slate-300 ml-2">{inmate}</div>
                        ))}
                      </div>
                    </div>
                  )}

                  {incident.staff && (
                    <div className="mb-3 text-xs">
                      <div className="text-slate-500 mb-1">Staff Involved:</div>
                      <div className="text-slate-700 dark:text-slate-300 ml-2">{incident.staff.join(', ')}</div>
                    </div>
                  )}

                  {/* Status and Follow-up */}
                  <div className="flex items-center justify-between pt-3 border-t border-slate-200 dark:border-slate-700">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      incident.status === 'Resolved' ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400' :
                      incident.status === 'Under Review' ? 'bg-amber-500/20 text-amber-600 dark:text-amber-400' :
                      incident.status === 'Transported' ? 'bg-slate-50 dark:bg-slate-700/40 text-slate-500' :
                      'bg-slate-50 dark:bg-slate-700/40 text-slate-500'
                    }`}>
                      {incident.status}
                    </span>
                    <span className="text-xs text-slate-700 dark:text-slate-400">{incident.id}</span>
                  </div>

                  {incident.followUp && (
                    <div className="mt-2 text-xs text-slate-700 dark:text-slate-400 flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      <span>{incident.followUp}</span>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-2 mt-3">
                    <button className="flex-1 px-2 py-1 bg-slate-50 dark:bg-slate-700/40 border border-slate-600/50 text-slate-700 dark:text-slate-300 rounded text-xs hover:bg-slate-700/60">
                      View Report
                    </button>
                    {incident.status === 'Under Review' && (
                      <button className="flex-1 px-2 py-1 bg-slate-50 dark:bg-slate-700/40 border border-slate-600/50 text-slate-700 dark:text-slate-300 rounded text-xs hover:bg-slate-700/60">
                        Review Footage
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced Court Schedule & Staff Coverage */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Enhanced Court Schedule */}
          <div className="bg-white dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700/50 rounded-xl shadow-sm dark:shadow-none p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Scale className="w-5 h-5 text-slate-700 dark:text-slate-400" />
                Today's Court Schedule
              </h2>
              <div className="text-xs text-slate-700 dark:text-slate-400">31 Inmates | 5 Trips</div>
            </div>
            <div className="space-y-3">
              {courtSchedule.map((court, idx) => (
                <div key={idx} className="bg-white dark:bg-slate-900/50 border border-slate-700 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-slate-900 dark:text-white font-semibold">{court.court}</div>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      court.status === 'Completed' ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400' :
                      court.status === 'En Route' ? 'bg-slate-50 dark:bg-slate-700/40 text-slate-500' :
                      court.status === 'Staging' ? 'bg-amber-500/20 text-amber-600 dark:text-amber-400' :
                      'bg-slate-500/20 text-slate-500'
                    }`}>
                      {court.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-sm mb-2">
                    <div>
                      <span className="text-slate-700 dark:text-slate-400">Time:</span>{' '}
                      <span className="text-slate-900 dark:text-white font-medium">{court.time}</span>
                    </div>
                    <div>
                      <span className="text-slate-700 dark:text-slate-400">Inmates:</span>{' '}
                      <span className="text-slate-900 dark:text-white font-medium">{court.inmates}</span>
                    </div>
                  </div>

                  {/* Transport Details */}
                  <div className="space-y-1 text-xs pt-2 border-t border-slate-200 dark:border-slate-700/50">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-700 dark:text-slate-400">Deputy:</span>
                      <span className="text-slate-900 dark:text-white">{court.deputy}</span>
                    </div>
                    {court.vehicle && (
                      <div className="flex items-center justify-between">
                        <span className="text-slate-700 dark:text-slate-400">Vehicle:</span>
                        <span className="text-slate-900 dark:text-white">{court.vehicle}</span>
                      </div>
                    )}
                    {court.departed && (
                      <div className="flex items-center justify-between">
                        <span className="text-slate-700 dark:text-slate-400">Departed:</span>
                        <span className="text-slate-700 dark:text-slate-400">{court.departed}</span>
                      </div>
                    )}
                    {court.etaReturn && (
                      <div className="flex items-center justify-between">
                        <span className="text-slate-700 dark:text-slate-400">ETA Return:</span>
                        <span className="text-slate-700 dark:text-slate-400">{court.etaReturn}</span>
                      </div>
                    )}
                  </div>

                  {/* Actions for active transports */}
                  {court.status === 'En Route' && (
                    <div className="flex gap-2 mt-3">
                      <button className="flex-1 px-2 py-1 bg-slate-50 dark:bg-slate-700/40 border border-slate-600/50 text-slate-700 dark:text-slate-300 rounded text-xs hover:bg-slate-700/60">
                        Track Vehicle
                      </button>
                      <button className="flex-1 px-2 py-1 bg-slate-50 dark:bg-slate-700/40 border border-slate-600/50 text-slate-700 dark:text-slate-300 rounded text-xs hover:bg-slate-700/60">
                        Contact Deputy
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Tomorrow's Schedule Alert */}
            <div className="mt-4 p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
              <div className="flex items-center gap-2 text-sm">
                <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span className="text-amber-600 dark:text-amber-400 font-semibold">Tomorrow: 31 transports scheduled - verify vehicle availability</span>
              </div>
            </div>
          </div>

          {/* Enhanced Staff Coverage */}
          <div className="bg-white dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700/50 rounded-xl shadow-sm dark:shadow-none p-5">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-slate-700 dark:text-slate-400" />
              Staff Coverage
            </h2>
            <div className="space-y-3">
              {/* A-Shift */}
              <div className="bg-white dark:bg-slate-900/50 border border-slate-700 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-900 dark:text-white font-semibold">A-Shift (06:00-14:00)</span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-slate-900 dark:text-white font-bold">{staffCoverage.aShift.present}/{staffCoverage.aShift.scheduled}</span>
                  </div>
                </div>
                <div className="text-sm text-slate-700 dark:text-slate-400 mb-2">{staffCoverage.aShift.posts}</div>

                {/* Staff Details */}
                <div className="text-xs space-y-1 pt-2 border-t border-slate-200 dark:border-slate-700/50">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-700 dark:text-slate-400">Supervisor:</span>
                    <span className="text-slate-900 dark:text-white">{staffCoverage.aShift.supervisor}</span>
                  </div>
                  <div className="text-slate-700 dark:text-slate-400">Officers: {staffCoverage.aShift.officers.join(', ')}</div>
                  <div className="text-slate-500 text-xs mt-2">{staffCoverage.aShift.assignments}</div>
                </div>
              </div>

              {/* B-Shift with Issue */}
              <div className="bg-white dark:bg-slate-900/50 border border-amber-500/20 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-900 dark:text-white font-semibold">B-Shift (14:00-22:00)</span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                    <span className="text-amber-600 dark:text-amber-400 font-bold">{staffCoverage.bShift.present}/{staffCoverage.bShift.scheduled}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-amber-600 dark:text-amber-400 mb-2">
                  <AlertTriangle className="w-4 h-4" />
                  <span>{staffCoverage.bShift.posts}</span>
                </div>

                {/* Issue Details */}
                <div className="text-xs space-y-1 pt-2 border-t border-slate-200 dark:border-slate-700/50 mb-3">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-700 dark:text-slate-400">Supervisor:</span>
                    <span className="text-slate-900 dark:text-white">{staffCoverage.bShift.supervisor}</span>
                  </div>
                  <div className="text-red-600 dark:text-red-400">{staffCoverage.bShift.issue}</div>
                  <div className="text-slate-700 dark:text-slate-300">{staffCoverage.bShift.coverage}</div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button className="flex-1 px-2 py-1 bg-green-500/20 border border-green-500/30 text-green-600 dark:text-green-400 rounded text-xs hover:bg-green-500/30">
                    Approve 8HR OT
                  </button>
                  <button className="flex-1 px-2 py-1 bg-slate-50 dark:bg-slate-700/40 border border-slate-600/50 text-slate-700 dark:text-slate-300 rounded text-xs hover:bg-slate-700/60">
                    Reassign Staff
                  </button>
                </div>
              </div>

              {/* C-Shift */}
              <div className="bg-white dark:bg-slate-900/50 border border-slate-700 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-900 dark:text-white font-semibold">C-Shift (22:00-06:00)</span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-slate-900 dark:text-white font-bold">{staffCoverage.cShift.present}/{staffCoverage.cShift.scheduled}</span>
                  </div>
                </div>
                <div className="text-sm text-slate-700 dark:text-slate-400">{staffCoverage.cShift.posts}</div>
                <div className="text-xs text-slate-700 dark:text-slate-400 pt-2 border-t border-slate-200 dark:border-slate-700/50 mt-2">
                  Supervisor: {staffCoverage.cShift.supervisor}
                </div>
              </div>

              {/* Medical & Kitchen Staff */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white dark:bg-slate-900/50 border border-slate-700 rounded-lg p-4">
                  <div className="text-sm text-slate-700 dark:text-slate-400 mb-2">Medical Staff</div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="text-slate-900 dark:text-white font-bold">{staffCoverage.medical.present}/{staffCoverage.medical.scheduled}</div>
                  </div>
                  <div className="text-xs text-slate-700 dark:text-slate-400">{staffCoverage.medical.posts}</div>
                  <div className="text-xs text-slate-500 mt-2">
                    {staffCoverage.medical.staff?.slice(0, 2).join(', ')}...
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-900/50 border border-amber-500/20 rounded-lg p-4">
                  <div className="text-sm text-slate-700 dark:text-slate-400 mb-2">Kitchen Staff</div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                    <div className="text-slate-900 dark:text-white font-bold">{staffCoverage.kitchen.present}/{staffCoverage.kitchen.scheduled}</div>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-amber-600 dark:text-amber-400">
                    <AlertTriangle className="w-3 h-3" />
                    <span>{staffCoverage.kitchen.posts}</span>
                  </div>
                  <button className="mt-2 w-full px-2 py-1 bg-slate-50 dark:bg-slate-700/40 border border-slate-600/50 text-slate-700 dark:text-slate-300 rounded text-xs hover:bg-slate-700/60">
                    Post Job
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Inmate Programs & Services + Visitation Statistics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Inmate Programs & Services */}
          <div className="bg-white dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700/50 rounded-xl shadow-sm dark:shadow-none p-5">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-slate-700 dark:text-slate-400" />
              Inmate Programs & Services
            </h2>
            <div className="space-y-4">
              {/* Educational Programs */}
              <div className="bg-white dark:bg-slate-900/50 border border-slate-700 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Educational Programs</h3>
                <div className="text-xs text-slate-700 dark:text-slate-400 space-y-1">
                  <div className="flex justify-between">
                    <span>├─ GED classes:</span>
                    <span className="text-slate-900 dark:text-white">47 inmates enrolled (3 graduated this month)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>├─ Literacy program:</span>
                    <span className="text-slate-900 dark:text-white">23 inmates</span>
                  </div>
                  <div className="flex justify-between">
                    <span>└─ Computer skills:</span>
                    <span className="text-slate-900 dark:text-white">18 inmates</span>
                  </div>
                </div>
              </div>

              {/* Work Programs */}
              <div className="bg-white dark:bg-slate-900/50 border border-slate-700 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Work Programs</h3>
                <div className="text-xs text-slate-700 dark:text-slate-400 space-y-1">
                  <div className="flex justify-between">
                    <span>├─ Kitchen crew:</span>
                    <span className="text-slate-900 dark:text-white">12 inmates (meal preparation)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>├─ Laundry detail:</span>
                    <span className="text-slate-900 dark:text-white">8 inmates</span>
                  </div>
                  <div className="flex justify-between">
                    <span>├─ Maintenance:</span>
                    <span className="text-slate-900 dark:text-white">6 inmates (facility upkeep)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>└─ Work release (outside):</span>
                    <span className="text-slate-900 dark:text-white">18 inmates (12 full-time, 6 part-time)</span>
                  </div>
                </div>
              </div>

              {/* Treatment Programs */}
              <div className="bg-white dark:bg-slate-900/50 border border-slate-700 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Treatment Programs</h3>
                <div className="text-xs text-slate-700 dark:text-slate-400 space-y-1">
                  <div className="flex justify-between">
                    <span>├─ Substance abuse:</span>
                    <span className="text-slate-900 dark:text-white">34 inmates (AA/NA 3x weekly)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>├─ Anger management:</span>
                    <span className="text-slate-900 dark:text-white">21 inmates (court-ordered)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>└─ Life skills:</span>
                    <span className="text-slate-900 dark:text-white">28 inmates (re-entry preparation)</span>
                  </div>
                </div>
              </div>

              {/* Religious Services */}
              <div className="bg-white dark:bg-slate-900/50 border border-slate-700 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-amber-600 dark:text-amber-400 mb-2">Religious Services</h3>
                <div className="text-xs text-slate-700 dark:text-slate-400 space-y-1">
                  <div className="flex justify-between">
                    <span>├─ Christian services:</span>
                    <span className="text-slate-900 dark:text-white">Sundays 1000 hrs (avg 45 attendees)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>├─ Islamic services:</span>
                    <span className="text-slate-900 dark:text-white">Fridays 1300 hrs (avg 12 attendees)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>└─ Other faiths:</span>
                    <span className="text-slate-900 dark:text-white">By request</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Visitation Statistics */}
          <div className="bg-white dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700/50 rounded-xl shadow-sm dark:shadow-none p-5">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-slate-700 dark:text-slate-400" />
              Visitation Today
            </h2>
            <div className="space-y-4">
              {/* In-Person Visits */}
              <div className="bg-white dark:bg-slate-900/50 border border-slate-700 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300">In-Person Visits</h3>
                  <span className="text-xl font-bold text-slate-900 dark:text-white">23</span>
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-400 mb-2">(Saturday schedule - 0900-1500 hrs)</p>
                <div className="text-xs text-slate-500 space-y-0.5">
                  <div className="flex justify-between">
                    <span>├─ Male facility:</span>
                    <span className="text-slate-900 dark:text-white">18 visits</span>
                  </div>
                  <div className="flex justify-between">
                    <span>└─ Female facility:</span>
                    <span className="text-slate-900 dark:text-white">5 visits</span>
                  </div>
                </div>
              </div>

              {/* Video Visits */}
              <div className="bg-white dark:bg-slate-900/50 border border-slate-700 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300">Video Visits</h3>
                  <span className="text-xl font-bold text-slate-900 dark:text-white">47</span>
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-400 mb-2">(Remote visitation system)</p>
                <div className="text-xs text-slate-500 space-y-0.5">
                  <div className="flex justify-between">
                    <span>├─ Scheduled:</span>
                    <span className="text-slate-900 dark:text-white">52</span>
                  </div>
                  <div className="flex justify-between">
                    <span>├─ Completed:</span>
                    <span className="text-green-600 dark:text-green-400">47</span>
                  </div>
                  <div className="flex justify-between">
                    <span>└─ No-shows:</span>
                    <span className="text-amber-600 dark:text-amber-400">5 (visitors didn't connect)</span>
                  </div>
                </div>
              </div>

              {/* Attorney Visits */}
              <div className="bg-white dark:bg-slate-900/50 border border-slate-700 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300">Attorney Visits</h3>
                  <span className="text-xl font-bold text-slate-900 dark:text-white">8</span>
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-400 mb-2">(Privileged legal visits)</p>
                <div className="text-xs text-slate-500 space-y-0.5">
                  <div className="flex justify-between">
                    <span>├─ In progress:</span>
                    <span className="text-slate-700 dark:text-slate-300">2</span>
                  </div>
                  <div className="flex justify-between">
                    <span>└─ Completed today:</span>
                    <span className="text-green-600 dark:text-green-400">6</span>
                  </div>
                </div>
              </div>

              {/* Weekly Summary */}
              <div className="bg-white dark:bg-slate-800/60 border border-slate-700/50 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-2">Weekly Summary</h3>
                <div className="text-xs text-slate-700 dark:text-slate-400 space-y-1">
                  <div className="flex justify-between">
                    <span>Weekly Average:</span>
                    <span className="text-slate-900 dark:text-white font-medium">284 total visits (all types)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Most visited inmate:</span>
                    <span className="text-slate-900 dark:text-white">Rodriguez (#17123) - 12 visits this week</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Services Status */}
        <div className="bg-white dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700/50 rounded-xl shadow-sm dark:shadow-none p-5">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-slate-700 dark:text-slate-400" />
            Facility Services Status
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {servicesStatus.map((service, idx) => (
              <div key={idx} className="bg-white dark:bg-slate-900/50 border border-slate-700 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {service.service === 'Video Visitation' && <Video className="w-4 h-4 text-slate-700 dark:text-slate-400" />}
                    {service.service === 'Commissary' && <ShoppingCart className="w-4 h-4 text-slate-700 dark:text-slate-400" />}
                    {service.service === 'Inmate Phones' && <Phone className="w-4 h-4 text-slate-700 dark:text-slate-400" />}
                    {service.service === 'Mail Processing' && <Mail className="w-4 h-4 text-amber-600 dark:text-amber-400" />}
                    {service.service === 'Laundry Services' && <Activity className="w-4 h-4 text-cyan-400" />}
                    {service.service === 'Food Service' && <Utensils className="w-4 h-4 text-orange-400" />}
                    <span className="text-slate-900 dark:text-white font-semibold text-sm">{service.service}</span>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    service.status === 'Operational' ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400' :
                    'bg-red-500/20 text-red-600 dark:text-red-400'
                  }`}>
                    {service.status}
                  </span>
                </div>

                <div className="space-y-2 text-sm text-slate-700 dark:text-slate-400">
                  {'sessionsToday' in service && (
                    <>
                      <div className="flex justify-between">
                        <span>Sessions Today:</span>
                        <span className="text-slate-900 dark:text-white font-semibold">{service.sessionsToday}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Stations:</span>
                        <span className="text-slate-900 dark:text-white">{service.stationsInUse}/{service.stationsTotal}</span>
                      </div>
                      <div className="text-xs text-slate-700 dark:text-slate-400">Wait time: {service.waitTime}</div>
                    </>
                  )}

                  {'ordersToday' in service && (
                    <>
                      <div className="flex justify-between">
                        <span>Orders Today:</span>
                        <span className="text-slate-900 dark:text-white font-semibold">{service.ordersToday}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>In Queue:</span>
                        <span className="text-amber-600 dark:text-amber-400">{service.ordersInQueue}</span>
                      </div>
                      <div className="text-xs text-slate-500">Top: {service.topItems?.join(', ')}</div>
                    </>
                  )}

                  {'callsToday' in service && (
                    <>
                      <div className="flex justify-between">
                        <span>Calls Today:</span>
                        <span className="text-slate-900 dark:text-white font-semibold">{service.callsToday}</span>
                      </div>
                      {service.issues && service.issues !== '0 stations need repair' && (
                        <div className="flex items-center gap-1 text-xs text-amber-600 dark:text-amber-400">
                          <AlertTriangle className="w-3 h-3" />
                          <span>{service.issues}</span>
                        </div>
                      )}
                    </>
                  )}

                  {'incomingToday' in service && (
                    <>
                      <div className="flex justify-between">
                        <span>Incoming:</span>
                        <span className="text-slate-900 dark:text-white">{service.incomingToday}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Outgoing:</span>
                        <span className="text-slate-900 dark:text-white">{service.outgoingToday}</span>
                      </div>
                      {service.flaggedItems && service.flaggedItems > 0 && (
                        <div className="flex items-center gap-1 text-xs text-red-600 dark:text-red-400">
                          <AlertCircle className="w-3 h-3" />
                          <span>{service.flaggedItems} items flagged for review</span>
                        </div>
                      )}
                    </>
                  )}

                  {'loadsTotal' in service && (
                    <>
                      <div className="flex justify-between">
                        <span>Loads:</span>
                        <span className="text-slate-900 dark:text-white">{service.loadsCompleted}/{service.loadsTotal}</span>
                      </div>
                      <div className="text-xs text-slate-700 dark:text-slate-400">Next load: {service.nextLoad}</div>
                    </>
                  )}

                  {'nextMeal' in service && (
                    <>
                      <div className="flex justify-between">
                        <span>Next Meal:</span>
                        <span className="text-slate-900 dark:text-white font-semibold">{service.nextMeal}</span>
                      </div>
                      <div className="text-xs">{service.menu}</div>
                      <div className="text-xs text-slate-700 dark:text-slate-400">Special diets: {service.specialDiets}</div>
                    </>
                  )}

                  {/* Staff Assignment */}
                  {service.staff && (
                    <div className="pt-2 border-t border-slate-200 dark:border-slate-700/50 text-xs text-slate-500">
                      Staff: {service.staff}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pod Detail Modal */}
      {selectedPod && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedPod(null)}
          />
          <div className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/50 rounded-2xl p-6 max-w-2xl w-full shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{selectedPod.name}</h3>
                <p className="text-slate-700 dark:text-slate-400">{selectedPod.type} • {selectedPod.security} Security</p>
              </div>
              <button
                onClick={() => setSelectedPod(null)}
                className="text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Capacity Overview */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-white dark:bg-slate-800/50 border border-slate-700 rounded-lg p-4">
                <div className="text-sm text-slate-700 dark:text-slate-400 mb-1">Capacity</div>
                <div className={`text-2xl font-bold ${getCapacityColor((selectedPod.current / selectedPod.capacity) * 100)}`}>
                  {selectedPod.current}/{selectedPod.capacity}
                </div>
              </div>
              <div className="bg-white dark:bg-slate-800/50 border border-slate-700 rounded-lg p-4">
                <div className="text-sm text-slate-700 dark:text-slate-400 mb-1">Occupancy</div>
                <div className={`text-2xl font-bold ${getCapacityColor((selectedPod.current / selectedPod.capacity) * 100)}`}>
                  {Math.round((selectedPod.current / selectedPod.capacity) * 100)}%
                </div>
              </div>
              <div className="bg-white dark:bg-slate-800/50 border border-slate-700 rounded-lg p-4">
                <div className="text-sm text-slate-700 dark:text-slate-400 mb-1">Status</div>
                <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(selectedPod.status)}`}>
                  {selectedPod.status}
                </span>
              </div>
            </div>

            {/* Staff Assigned */}
            <div className="bg-white dark:bg-slate-800/50 border border-slate-700 rounded-lg p-4 mb-4">
              <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-3">Staff Assigned</h4>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-slate-700 dark:text-slate-400">Officers:</span>{' '}
                  <span className="text-slate-900 dark:text-white font-semibold">4/4</span>
                </div>
                <div className="text-slate-700 dark:text-slate-300">Officer Williams, Martinez, Chen, Rodriguez</div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white dark:bg-slate-800/50 border border-slate-700 rounded-lg p-4 mb-4">
              <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-3">Recent Activity</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-slate-700 dark:text-slate-400">Last booking:</span>
                  <span className="text-slate-900 dark:text-white">2 hours ago</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-700 dark:text-slate-400">Last incident:</span>
                  <span className="text-slate-700 dark:text-slate-300">3 days ago (resolved)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-700 dark:text-slate-400">Last inspection:</span>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="w-3 h-3 text-green-600 dark:text-green-400" />
                    <span className="text-green-600 dark:text-green-400">Dec 9 (passed)</span>
                  </div>
                </div>
              </div>
            </div>

            {selectedPod.notes && (
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4 mb-4">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 mt-0.5" />
                  <p className="text-sm text-amber-600 dark:text-amber-400">{selectedPod.notes}</p>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3">
              <button className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
                View Full Roster
              </button>
              <button className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
                Reassign Inmates
              </button>
              <button className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
                Incident Log
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default JailDashboard;

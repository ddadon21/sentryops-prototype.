import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';
import {
  Users, AlertTriangle, Activity, TrendingUp, TrendingDown,
  Clock, Shield, Bed, Hospital, Scale, Calendar, UserCheck, MapPin,
  Sparkles, X, CheckCircle, Search,
  Download, Zap, ArrowRight, Eye, User,
  Send, Target, Utensils,
  Phone, Mail, Truck, Video, ShoppingCart, AlertCircle, Plus
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

  // Classification breakdown with changes
  const classificationData = [
    { level: 'Minimum Security', count: 117, percentage: 13.9 },
    { level: 'Medium Security', count: 419, percentage: 49.8 },
    { level: 'Maximum Security', count: 148, percentage: 17.6 },
    { level: 'Administrative Segregation', count: 28, percentage: 3.3, breakdown: 'Disciplinary: 12, Protective: 9, Investigation: 7' },
    { level: 'Protective Custody', count: 41, percentage: 4.9 },
    { level: 'Medical Housing', count: 44, percentage: 5.2 },
    { level: 'Mental Health', count: 38, percentage: 4.5 },
    { level: 'Awaiting Classification', count: 7, percentage: 0.8 }
  ];

  const classificationChanges = [
    { description: '2 inmates reclassified (Medium → Minimum)', time: 'Today 10:30' },
    { description: '1 inmate moved to protective custody', time: 'Today 09:15' },
    { description: '3 inmates pending reclassification review', time: 'Pending' }
  ];

  // Enhanced medical alerts
  const medicalAlerts = [
    {
      type: 'Critical Medication',
      count: 12,
      description: 'Time-sensitive medications required',
      staff: 'RN Martinez, RN Chen',
      nextAction: 'Next med round: 18:00 (in 42 minutes)',
      status: 'On schedule'
    },
    {
      type: 'Medical Holds',
      count: 8,
      description: 'Cannot be released without medical clearance',
      staff: 'Dr. Anderson (reviewing)',
      nextAction: '3 dental clearances scheduled Dec 12, 5 injury evaluations pending',
      status: 'Processing'
    },
    {
      type: 'Suicide Watch',
      count: 4,
      description: 'Active monitoring 24/7',
      staff: '2 additional officers assigned',
      nextAction: 'Last check: 5 min ago. Next eval: Every 15 minutes',
      status: 'Active monitoring'
    },
    {
      type: 'Infectious Disease',
      count: 3,
      description: 'Isolation protocols in effect',
      staff: 'RN Johnson (isolation lead)',
      nextAction: 'COVID-19: 1 (Day 3), TB exposure: 2 (testing pending)',
      status: 'Monitored, no spread'
    },
    {
      type: 'Wheelchair/ADA',
      count: 11,
      description: 'Special housing accommodations',
      staff: 'Facilities Team',
      nextAction: '2 pending ADA requests under review',
      status: 'All housed appropriately'
    }
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

  // Critical tasks
  const criticalTasks = {
    dueToday: [
      { task: 'Process 3 bond hearings', deadline: '16:00', remaining: '2 hours' },
      { task: 'Complete 7 medical screenings (new bookings)', deadline: '17:00', remaining: '3 hours' },
      { task: 'Finalize 2 disciplinary hearings', deadline: '16:30', remaining: '2.5 hours' },
      { task: 'Submit federal housing report', deadline: '17:00', remaining: '3 hours' }
    ],
    overdue: [],
    upcoming: [
      { task: '31 court transports tomorrow', when: 'Tomorrow 08:00' },
      { task: 'Federal audit prep (Dec 12-14)', when: '1 day away' },
      { task: 'Monthly pod inspections (5 pending)', when: 'This week' },
      { task: 'Staff performance reviews (3 due)', when: 'This week' }
    ]
  };

  const getCapacityColor = (percent: number) => {
    if (percent >= 95) return 'text-red-400';
    if (percent >= 85) return 'text-amber-400';
    return 'text-emerald-400';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Normal': return 'bg-emerald-500/20 text-emerald-400';
      case 'Near Capacity': return 'bg-amber-500/20 text-amber-400';
      case 'Over Capacity': return 'bg-red-500/20 text-red-400';
      default: return 'bg-slate-500/20 text-slate-400';
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
            <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">Detention Operations</h1>
            <p className="text-slate-400">Gwinnett County Detention Center - Real-time Facility Status</p>
          </div>

          {/* Quick Actions Bar */}
          <div className="flex flex-wrap items-center gap-2">
            <button className="flex items-center gap-2 px-3 py-2 bg-blue-500/20 border border-blue-500/30 text-blue-400 rounded-lg text-sm font-medium hover:bg-blue-500/30 transition-all">
              <Plus className="w-4 h-4" />
              New Booking
            </button>
            <button className="flex items-center gap-2 px-3 py-2 bg-green-500/20 border border-green-500/30 text-green-400 rounded-lg text-sm font-medium hover:bg-green-500/30 transition-all">
              <Send className="w-4 h-4" />
              Process Release
            </button>
            <button className="flex items-center gap-2 px-3 py-2 bg-red-500/20 border border-red-500/30 text-red-400 rounded-lg text-sm font-medium hover:bg-red-500/30 transition-all">
              <AlertCircle className="w-4 h-4" />
              Incident Report
            </button>
            <button className="flex items-center gap-2 px-3 py-2 bg-purple-500/20 border border-purple-500/30 text-purple-400 rounded-lg text-sm font-medium hover:bg-purple-500/30 transition-all">
              <Hospital className="w-4 h-4" />
              Medical Emergency
            </button>
            <button className="flex items-center gap-2 px-3 py-2 bg-amber-500/20 border border-amber-500/30 text-amber-400 rounded-lg text-sm font-medium hover:bg-amber-500/30 transition-all">
              <Download className="w-4 h-4" />
              Daily Report
            </button>
            <button className="flex items-center gap-2 px-3 py-2 bg-slate-700/40 border border-slate-600/50 text-slate-300 rounded-lg text-sm font-medium hover:bg-slate-700/60 transition-all">
              <Search className="w-4 h-4" />
              Search Inmate
            </button>
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
                  <h4 className="text-base font-semibold text-white">AI Insights - Detention Operations</h4>
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
                        <p className="text-slate-300">H2-Pod over capacity (36/32) - Recommend transfer 2 inmates to E-Pod or request bond review</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <Users className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                        <p className="text-slate-300">B-Shift understaffed (13/14) - Approve 8hr OT or reassign from A-Shift to maintain coverage</p>
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
                        <Hospital className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                        <p className="text-slate-300">Medical housing at 92% - Monitor admissions closely, discharge review recommended</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <Truck className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                        <p className="text-slate-300">31 court transports tomorrow - Verify vehicle availability and deputy assignments</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <TrendingUp className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                        <p className="text-slate-300">Average length of stay trending up (+1.2 days vs last month) - Review case processing times</p>
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
                        <p className="text-slate-300">All facility services operational - No critical incidents in last 24 hours</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <Activity className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <p className="text-slate-300">Population stable (+4 net today) - Within normal operating parameters</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <Zap className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <p className="text-slate-300">All critical systems online - CAD, RMS, SmartJAIL operational</p>
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

        {/* Enhanced Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* Facility Capacity Card - Enhanced */}
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-500/20 rounded-lg">
                <Users className="w-6 h-6 text-blue-400" />
              </div>
              <div className={`text-3xl font-bold ${getCapacityColor(facilityMetrics.percentFull)}`}>
                {facilityMetrics.percentFull}%
              </div>
            </div>
            <h3 className="text-slate-400 text-sm mb-1">Facility Capacity</h3>
            <p className="text-2xl font-bold text-white mb-2">{facilityMetrics.currentPopulation} / {facilityMetrics.totalCapacity}</p>

            <div className="space-y-2 text-sm mb-3">
              <div className="flex justify-between">
                <span className="text-slate-400">Male:</span>
                <span className="text-white font-semibold">{facilityMetrics.maleInmates}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Female:</span>
                <span className="text-white font-semibold">{facilityMetrics.femaleInmates}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-700/30">
              <div className="text-xs text-slate-400 mb-1">Today's Activity:</div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  +{facilityMetrics.netChange} net
                </span>
                <span className="text-slate-500">{facilityMetrics.bookingsToday} in, {facilityMetrics.releasesToday} out</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-700/30 mt-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-amber-400 font-semibold">Approaching 95% threshold</span>
                <span className="text-slate-500">7-day avg: {facilityMetrics.sevenDayAverage}</span>
              </div>
            </div>
          </div>

          {/* Today's Activity Card - Enhanced */}
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-emerald-500/20 rounded-lg">
                <Activity className="w-6 h-6 text-emerald-400" />
              </div>
              <div className="flex items-center gap-1">
                <TrendingUp className="w-5 h-5 text-emerald-400" />
                <span className="text-emerald-400 font-semibold text-2xl">+{facilityMetrics.netChange}</span>
              </div>
            </div>
            <h3 className="text-slate-400 text-sm mb-3">Today's Activity</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-300">Bookings:</span>
                <span className="text-white font-bold">{facilityMetrics.bookingsToday}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-300">Releases:</span>
                <span className="text-white font-bold">{facilityMetrics.releasesToday}</span>
              </div>
              <div className="flex justify-between items-center text-sm pt-2 border-t border-slate-700/30">
                <span className="text-slate-400 text-xs">Net Change:</span>
                <span className="text-emerald-400 font-bold">+{facilityMetrics.netChange}</span>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-slate-700/30">
              <div className="text-xs text-slate-400 mb-1">Trend:</div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-xs text-slate-300">Stable population - normal operations</span>
              </div>
            </div>
          </div>

          {/* Court Transports Card - Enhanced */}
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-amber-500/20 rounded-lg">
                <Calendar className="w-6 h-6 text-amber-400" />
              </div>
              <div className="text-3xl font-bold text-amber-400">{facilityMetrics.courtTransports}</div>
            </div>
            <h3 className="text-slate-400 text-sm mb-1">Court Transports Today</h3>
            <p className="text-lg text-white mb-3">5 Trips Scheduled</p>

            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Next Transport:</span>
                <span className="text-white font-medium">Superior Court</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Status:</span>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-blue-400 font-semibold text-xs">En Route</span>
                </div>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-slate-700/30">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <span className="text-xs text-amber-400">31 transports scheduled tomorrow</span>
              </div>
            </div>
          </div>

          {/* Average Length of Stay Card - Enhanced */}
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-500/20 rounded-lg">
                <Clock className="w-6 h-6 text-purple-400" />
              </div>
              <div className="text-3xl font-bold text-purple-400">{facilityMetrics.averageLength}</div>
            </div>
            <h3 className="text-slate-400 text-sm mb-1">Average Length of Stay</h3>
            <p className="text-lg text-white mb-2">Days</p>

            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-1 text-emerald-400">
                <TrendingDown className="w-4 h-4" />
                <span>-1.2 days from last month</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-slate-700/30">
                <span className="text-slate-400 text-xs">Median:</span>
                <span className="text-white font-semibold text-xs">{facilityMetrics.medianStay} days</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 text-xs">Longest:</span>
                <span className="text-amber-400 font-semibold text-xs">{facilityMetrics.longestStay} days</span>
              </div>
            </div>

            <div className="mt-2 pt-2 border-t border-slate-700/30">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-xs text-green-400">Below 25-day target</span>
              </div>
            </div>
          </div>
        </div>

        {/* Population Trend Chart */}
        <div className="mb-6 bg-slate-800 border border-slate-700 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-400" />
              Population Trend - Last 7 Days
            </h2>
            <button className="text-sm text-amber-400 hover:text-amber-300 font-medium">
              View 30-Day Trend →
            </button>
          </div>

          {/* Simple Bar Chart */}
          <div className="flex items-end gap-2 h-32 mb-4">
            {populationTrend.map((day, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                <div className="text-xs text-slate-400 mb-1">{day.population}</div>
                <div
                  className="w-full bg-blue-500 rounded-t hover:bg-blue-400 transition-colors cursor-pointer"
                  style={{ height: `${(day.population / 850) * 100}%` }}
                  title={`${day.date}: ${day.population} inmates`}
                />
                <div className="text-xs text-slate-500 mt-1">{day.date}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 border-t border-slate-700">
            <div className="text-sm">
              <span className="text-slate-400">7-Day Average:</span>{' '}
              <span className="text-white font-bold">{facilityMetrics.sevenDayAverage} inmates</span>
            </div>
            <div className="text-sm">
              <span className="text-slate-400">Trend:</span>{' '}
              <span className="text-slate-300 font-medium flex items-center gap-1">
                <ArrowRight className="w-3 h-3" />
                Stable
              </span>
            </div>
            <div className="text-sm">
              <span className="text-slate-400">Capacity:</span>{' '}
              <span className="text-amber-400 font-bold">920 (91.5% current)</span>
            </div>
            <div className="text-sm">
              <span className="text-slate-400">Forecast:</span>{' '}
              <span className="text-blue-400 font-medium">840-850 range next 7 days</span>
            </div>
          </div>
        </div>

        {/* Enhanced Active Alerts Banner with Actions */}
        {visibleAlerts.length > 0 && (
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-amber-400 font-semibold">Active Alerts ({visibleAlerts.length})</h4>
                </div>
                <div className="space-y-3">
                  {visibleAlerts.map((alert) => (
                    <div key={alert.id} className="bg-slate-900/50 border border-slate-700/50 rounded-lg p-3">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-2 flex-1">
                          <div className={`w-2 h-2 rounded-full mt-1 flex-shrink-0 ${alert.type === 'critical' ? 'bg-red-500' : 'bg-amber-500'}`}></div>
                          <p className="text-sm text-slate-300">{alert.message}</p>
                        </div>
                        <button
                          onClick={() => dismissAlert(alert.id)}
                          className="text-slate-500 hover:text-slate-300 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="flex gap-2 mt-2 ml-4">
                        {alert.id === 1 && (
                          <>
                            <button className="px-3 py-1 bg-blue-500/20 border border-blue-500/30 text-blue-400 rounded text-xs hover:bg-blue-500/30">
                              Relocate 2 Inmates
                            </button>
                            <button className="px-3 py-1 bg-slate-700/40 border border-slate-600/50 text-slate-300 rounded text-xs hover:bg-slate-700/60">
                              Request Bond Review
                            </button>
                          </>
                        )}
                        {alert.id === 2 && (
                          <>
                            <button className="px-3 py-1 bg-purple-500/20 border border-purple-500/30 text-purple-400 rounded text-xs hover:bg-purple-500/30">
                              View Medical Dashboard
                            </button>
                            <button className="px-3 py-1 bg-slate-700/40 border border-slate-600/50 text-slate-300 rounded text-xs hover:bg-slate-700/60">
                              Discharge Review
                            </button>
                          </>
                        )}
                        {alert.id === 3 && (
                          <>
                            <button className="px-3 py-1 bg-green-500/20 border border-green-500/30 text-green-400 rounded text-xs hover:bg-green-500/30">
                              Approve 8HR OT
                            </button>
                            <button className="px-3 py-1 bg-slate-700/40 border border-slate-600/50 text-slate-300 rounded text-xs hover:bg-slate-700/60">
                              Reassign from A-Shift
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Critical Tasks Section */}
        <div className="mb-6 bg-gradient-to-br from-red-500/10 to-red-600/5 border border-red-500/20 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Target className="w-5 h-5 text-red-400" />
            <h2 className="text-xl font-bold text-white">Critical Tasks - Detention</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Due Today */}
            <div className="bg-slate-900/50 border border-red-500/20 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <Clock className="w-4 h-4 text-red-400" />
                <h3 className="text-sm font-semibold text-red-400">DUE TODAY ({criticalTasks.dueToday.length})</h3>
              </div>
              <div className="space-y-2">
                {criticalTasks.dueToday.map((task, idx) => (
                  <div key={idx} className="text-sm">
                    <div className="text-white font-medium">{task.task}</div>
                    <div className="flex items-center justify-between text-xs mt-1">
                      <span className="text-slate-400">By {task.deadline}</span>
                      <span className="text-red-400 font-semibold">{task.remaining} remaining</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Overdue */}
            <div className="bg-slate-900/50 border border-slate-700/50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <h3 className="text-sm font-semibold text-amber-400">OVERDUE ({criticalTasks.overdue.length})</h3>
              </div>
              {criticalTasks.overdue.length === 0 ? (
                <div className="flex items-center gap-2 text-sm text-green-400">
                  <CheckCircle className="w-4 h-4" />
                  <span>None - all tasks on schedule</span>
                </div>
              ) : (
                <div className="space-y-2">
                  {criticalTasks.overdue.map((task, idx) => (
                    <div key={idx} className="text-sm text-white">{task}</div>
                  ))}
                </div>
              )}
            </div>

            {/* Upcoming */}
            <div className="bg-slate-900/50 border border-slate-700/50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <Calendar className="w-4 h-4 text-blue-400" />
                <h3 className="text-sm font-semibold text-blue-400">UPCOMING (Next 24 hours)</h3>
              </div>
              <div className="space-y-2">
                {criticalTasks.upcoming.map((task, idx) => (
                  <div key={idx} className="text-sm">
                    <div className="text-white">{task.task}</div>
                    <div className="text-xs text-slate-400 mt-1">{task.when}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-4 flex gap-2">
            <button className="px-4 py-2 bg-blue-500/20 border border-blue-500/30 text-blue-400 rounded-lg text-sm hover:bg-blue-500/30">
              View All Tasks
            </button>
            <button className="px-4 py-2 bg-slate-700/40 border border-slate-600/50 text-slate-300 rounded-lg text-sm hover:bg-slate-700/60">
              Assign Task
            </button>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Housing Units Status - Enhanced with Clickable Pods */}
          <div className="lg:col-span-2 bg-slate-800 border border-slate-700 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Bed className="w-5 h-5 text-amber-400" />
                Housing Units Status
              </h2>
              <button
                onClick={() => navigate('/jail/housing')}
                className="text-amber-400 hover:text-amber-300 text-sm font-medium"
              >
                View Details →
              </button>
            </div>
            <div className="space-y-2 max-h-[600px] overflow-y-auto">
              {housingUnits.map((unit) => (
                <div
                  key={unit.id}
                  className="bg-slate-900/50 border border-slate-700 rounded-lg p-4 hover:border-slate-600 transition-colors cursor-pointer"
                  onClick={() => setSelectedPod(unit)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="text-lg font-bold text-white">{unit.name}</div>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(unit.status)}`}>
                        {unit.status}
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-slate-400">Capacity</div>
                      <div className={`text-lg font-bold ${getCapacityColor((unit.current / unit.capacity) * 100)}`}>
                        {unit.current}/{unit.capacity}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="text-slate-400">
                      {unit.type} • {unit.security} Security
                    </div>
                    <div className={`font-medium ${getCapacityColor((unit.current / unit.capacity) * 100)}`}>
                      {Math.round((unit.current / unit.capacity) * 100)}%
                    </div>
                  </div>
                  {unit.notes && (
                    <div className="mt-2 pt-2 border-t border-slate-700 text-sm flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0" />
                      <span className="text-amber-400">{unit.notes}</span>
                    </div>
                  )}
                  <div className="mt-2">
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all ${
                          (unit.current / unit.capacity) * 100 >= 95 ? 'bg-red-500' :
                          (unit.current / unit.capacity) * 100 >= 85 ? 'bg-amber-500' :
                          'bg-emerald-500'
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
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-amber-400" />
                Classification
              </h2>
              <div className="space-y-3 mb-4">
                {classificationData.map((item) => (
                  <div key={item.level} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-300">{item.level}</span>
                      <span className="text-white font-semibold">{item.count}</span>
                    </div>
                    {item.breakdown && (
                      <div className="text-xs text-slate-500 ml-2">{item.breakdown}</div>
                    )}
                    <div className="w-full bg-slate-700 rounded-full h-1.5">
                      <div
                        className="bg-amber-500 h-1.5 rounded-full"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Recent Classification Changes */}
              <div className="pt-4 border-t border-slate-700">
                <h3 className="text-sm font-semibold text-white mb-2">Recent Changes Today:</h3>
                <div className="space-y-2">
                  {classificationChanges.map((change, idx) => (
                    <div key={idx} className="text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0"></div>
                        <span className="text-slate-300">{change.description}</span>
                      </div>
                      <div className="text-slate-500 ml-3.5">{change.time}</div>
                    </div>
                  ))}
                </div>
                <button className="mt-3 w-full px-3 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors text-xs font-medium">
                  Review Pending Classifications
                </button>
              </div>
            </div>

            {/* Enhanced Medical Alerts */}
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Hospital className="w-5 h-5 text-red-400" />
                Medical Alerts
              </h2>
              <div className="space-y-3">
                {medicalAlerts.map((alert, idx) => (
                  <div key={idx} className="bg-slate-900/50 border border-slate-700 rounded p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white font-medium text-sm">{alert.type}</span>
                      <span className={`font-bold text-lg ${
                        alert.type === 'Critical Medication' ? 'text-red-400' :
                        alert.type === 'Suicide Watch' ? 'text-red-400' :
                        alert.type === 'Medical Holds' ? 'text-amber-400' :
                        'text-blue-400'
                      }`}>{alert.count}</span>
                    </div>
                    <p className="text-xs text-slate-400 mb-2">{alert.description}</p>

                    {/* Staff Assignment */}
                    <div className="flex items-center gap-1 text-xs text-slate-500 mb-1">
                      <User className="w-3 h-3" />
                      <span>{alert.staff}</span>
                    </div>

                    {/* Next Action */}
                    <div className="text-xs text-amber-400 mb-2">
                      {alert.nextAction}
                    </div>

                    {/* Status Badge */}
                    <div className="flex items-center gap-1">
                      <div className={`w-2 h-2 rounded-full ${
                        alert.status === 'On schedule' ? 'bg-green-500' :
                        alert.status === 'Active monitoring' ? 'bg-blue-500' :
                        'bg-amber-500'
                      }`}></div>
                      <span className="text-xs text-slate-400">{alert.status}</span>
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={() => navigate('/jail/medical')}
                className="mt-4 w-full px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors text-sm font-medium"
              >
                View Medical Dashboard
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced Recent Bookings & Incidents */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Enhanced Recent Bookings */}
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-blue-400" />
                Recent Bookings
              </h2>
              <button
                onClick={() => navigate('/jail/booking')}
                className="text-amber-400 hover:text-amber-300 text-sm font-medium"
              >
                View All →
              </button>
            </div>
            <div className="space-y-4">
              {recentBookings.slice(0, 3).map((booking) => (
                <div key={booking.id} className="bg-slate-900/50 border border-slate-700 rounded-lg p-4 hover:border-slate-600 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="text-white font-semibold">{booking.name}</div>
                      <div className="text-sm text-slate-400">{booking.id} • Inmate #{booking.inmateId}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-slate-400">Booked</div>
                      <div className="text-white font-medium">{booking.time}</div>
                      <div className="text-xs text-slate-500">{booking.bookingTime}</div>
                    </div>
                  </div>

                  {/* Charges */}
                  <div className="mb-3">
                    <div className="text-xs text-slate-400 mb-1">Charges:</div>
                    <div className="space-y-1">
                      {booking.charges.map((charge, idx) => (
                        <div key={idx} className="text-sm text-amber-400 flex items-center gap-1">
                          <div className="w-1 h-1 bg-amber-400 rounded-full"></div>
                          {charge}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Status Timeline */}
                  {booking.classification && (
                    <div className="mb-3 p-2 bg-slate-800/50 rounded text-xs space-y-1">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-3 h-3 text-green-400" />
                        <span className="text-slate-300">Fingerprints & Photo: Complete</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-3 h-3 text-green-400" />
                        <span className="text-slate-300">Medical Screening: {booking.medicalScreening}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {booking.classification.includes('In progress') ? (
                          <Clock className="w-3 h-3 text-amber-400" />
                        ) : (
                          <CheckCircle className="w-3 h-3 text-green-400" />
                        )}
                        <span className="text-slate-300">Classification: {booking.classification}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {booking.housing?.includes('Temporary') ? (
                          <Clock className="w-3 h-3 text-amber-400" />
                        ) : (
                          <CheckCircle className="w-3 h-3 text-green-400" />
                        )}
                        <span className="text-slate-300">Housing: {booking.housing}</span>
                      </div>
                    </div>
                  )}

                  {/* Bond Status */}
                  <div className="flex items-center justify-between pt-3 border-t border-slate-700">
                    <div className="text-sm">
                      <span className="text-slate-400">Bond:</span>{' '}
                      <span className={booking.bond === 'No Bond' ? 'text-red-400 font-semibold' : 'text-emerald-400 font-semibold'}>
                        {booking.bond}
                      </span>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      booking.status === 'Housing Assigned' ? 'bg-emerald-500/20 text-emerald-400' :
                      booking.status === 'Processing Release' ? 'bg-green-500/20 text-green-400' :
                      'bg-amber-500/20 text-amber-400'
                    }`}>
                      {booking.status}
                    </span>
                  </div>

                  {/* Actions */}
                  {booking.status === 'Processing' && (
                    <div className="flex gap-2 mt-3">
                      <button className="flex-1 px-2 py-1 bg-blue-500/20 border border-blue-500/30 text-blue-400 rounded text-xs hover:bg-blue-500/30">
                        View Full Record
                      </button>
                      <button className="flex-1 px-2 py-1 bg-slate-700/40 border border-slate-600/50 text-slate-300 rounded text-xs hover:bg-slate-700/60">
                        Assign Housing
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Enhanced Recent Incidents */}
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-400" />
                Recent Incidents
              </h2>
              <button
                onClick={() => navigate('/jail/incidents')}
                className="text-amber-400 hover:text-amber-300 text-sm font-medium"
              >
                View All →
              </button>
            </div>
            <div className="space-y-4">
              {recentIncidents.slice(0, 3).map((incident) => (
                <div key={incident.id} className="bg-slate-900/50 border border-slate-700 rounded-lg p-4 hover:border-slate-600 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className={`px-2 py-1 rounded text-xs font-bold ${
                        incident.severity === 'High' ? 'bg-red-500/20 text-red-400' :
                        incident.severity === 'Medium' ? 'bg-amber-500/20 text-amber-400' :
                        'bg-blue-500/20 text-blue-400'
                      }`}>
                        {incident.severity.toUpperCase()}
                      </div>
                      <div className="text-white font-semibold text-sm">{incident.type}</div>
                    </div>
                    <div className="text-xs text-slate-400">{incident.time}</div>
                  </div>

                  <div className="flex items-center gap-2 mb-2 text-sm text-slate-400">
                    <MapPin className="w-4 h-4 flex-shrink-0" />
                    <span>{incident.location}</span>
                  </div>

                  <p className="text-sm text-slate-300 mb-3">{incident.description}</p>

                  {/* Involved Parties */}
                  {incident.inmates && (
                    <div className="mb-2 text-xs">
                      <div className="text-slate-500 mb-1">Involved Inmates:</div>
                      <div className="space-y-0.5">
                        {incident.inmates.map((inmate, idx) => (
                          <div key={idx} className="text-slate-300 ml-2">{inmate}</div>
                        ))}
                      </div>
                    </div>
                  )}

                  {incident.staff && (
                    <div className="mb-3 text-xs">
                      <div className="text-slate-500 mb-1">Staff Involved:</div>
                      <div className="text-slate-300 ml-2">{incident.staff.join(', ')}</div>
                    </div>
                  )}

                  {/* Status and Follow-up */}
                  <div className="flex items-center justify-between pt-3 border-t border-slate-700">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      incident.status === 'Resolved' ? 'bg-emerald-500/20 text-emerald-400' :
                      incident.status === 'Under Review' ? 'bg-amber-500/20 text-amber-400' :
                      incident.status === 'Transported' ? 'bg-purple-500/20 text-purple-400' :
                      'bg-blue-500/20 text-blue-400'
                    }`}>
                      {incident.status}
                    </span>
                    <span className="text-xs text-slate-400">{incident.id}</span>
                  </div>

                  {incident.followUp && (
                    <div className="mt-2 text-xs text-blue-400 flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      <span>{incident.followUp}</span>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-2 mt-3">
                    <button className="flex-1 px-2 py-1 bg-blue-500/20 border border-blue-500/30 text-blue-400 rounded text-xs hover:bg-blue-500/30">
                      View Report
                    </button>
                    {incident.status === 'Under Review' && (
                      <button className="flex-1 px-2 py-1 bg-slate-700/40 border border-slate-600/50 text-slate-300 rounded text-xs hover:bg-slate-700/60">
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
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Scale className="w-5 h-5 text-purple-400" />
                Today's Court Schedule
              </h2>
              <div className="text-xs text-slate-400">31 Inmates | 5 Trips</div>
            </div>
            <div className="space-y-3">
              {courtSchedule.map((court, idx) => (
                <div key={idx} className="bg-slate-900/50 border border-slate-700 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-white font-semibold">{court.court}</div>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      court.status === 'Completed' ? 'bg-emerald-500/20 text-emerald-400' :
                      court.status === 'En Route' ? 'bg-blue-500/20 text-blue-400' :
                      court.status === 'Staging' ? 'bg-amber-500/20 text-amber-400' :
                      'bg-slate-500/20 text-slate-400'
                    }`}>
                      {court.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-sm mb-2">
                    <div>
                      <span className="text-slate-400">Time:</span>{' '}
                      <span className="text-white font-medium">{court.time}</span>
                    </div>
                    <div>
                      <span className="text-slate-400">Inmates:</span>{' '}
                      <span className="text-white font-medium">{court.inmates}</span>
                    </div>
                  </div>

                  {/* Transport Details */}
                  <div className="space-y-1 text-xs pt-2 border-t border-slate-700/50">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Deputy:</span>
                      <span className="text-white">{court.deputy}</span>
                    </div>
                    {court.vehicle && (
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Vehicle:</span>
                        <span className="text-white">{court.vehicle}</span>
                      </div>
                    )}
                    {court.departed && (
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Departed:</span>
                        <span className="text-blue-400">{court.departed}</span>
                      </div>
                    )}
                    {court.etaReturn && (
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">ETA Return:</span>
                        <span className="text-purple-400">{court.etaReturn}</span>
                      </div>
                    )}
                  </div>

                  {/* Actions for active transports */}
                  {court.status === 'En Route' && (
                    <div className="flex gap-2 mt-3">
                      <button className="flex-1 px-2 py-1 bg-blue-500/20 border border-blue-500/30 text-blue-400 rounded text-xs hover:bg-blue-500/30">
                        Track Vehicle
                      </button>
                      <button className="flex-1 px-2 py-1 bg-slate-700/40 border border-slate-600/50 text-slate-300 rounded text-xs hover:bg-slate-700/60">
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
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <span className="text-amber-400 font-semibold">Tomorrow: 31 transports scheduled - verify vehicle availability</span>
              </div>
            </div>
          </div>

          {/* Enhanced Staff Coverage */}
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-emerald-400" />
              Staff Coverage
            </h2>
            <div className="space-y-3">
              {/* A-Shift */}
              <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-semibold">A-Shift (06:00-14:00)</span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-emerald-400 font-bold">{staffCoverage.aShift.present}/{staffCoverage.aShift.scheduled}</span>
                  </div>
                </div>
                <div className="text-sm text-emerald-400 mb-2">{staffCoverage.aShift.posts}</div>

                {/* Staff Details */}
                <div className="text-xs space-y-1 pt-2 border-t border-slate-700/50">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Supervisor:</span>
                    <span className="text-white">{staffCoverage.aShift.supervisor}</span>
                  </div>
                  <div className="text-slate-400">Officers: {staffCoverage.aShift.officers.join(', ')}</div>
                  <div className="text-slate-500 text-xs mt-2">{staffCoverage.aShift.assignments}</div>
                </div>
              </div>

              {/* B-Shift with Issue */}
              <div className="bg-slate-900/50 border border-amber-500/20 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-semibold">B-Shift (14:00-22:00)</span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                    <span className="text-amber-400 font-bold">{staffCoverage.bShift.present}/{staffCoverage.bShift.scheduled}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-amber-400 mb-2">
                  <AlertTriangle className="w-4 h-4" />
                  <span>{staffCoverage.bShift.posts}</span>
                </div>

                {/* Issue Details */}
                <div className="text-xs space-y-1 pt-2 border-t border-slate-700/50 mb-3">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Supervisor:</span>
                    <span className="text-white">{staffCoverage.bShift.supervisor}</span>
                  </div>
                  <div className="text-red-400">{staffCoverage.bShift.issue}</div>
                  <div className="text-slate-300">{staffCoverage.bShift.coverage}</div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button className="flex-1 px-2 py-1 bg-green-500/20 border border-green-500/30 text-green-400 rounded text-xs hover:bg-green-500/30">
                    Approve 8HR OT
                  </button>
                  <button className="flex-1 px-2 py-1 bg-slate-700/40 border border-slate-600/50 text-slate-300 rounded text-xs hover:bg-slate-700/60">
                    Reassign Staff
                  </button>
                </div>
              </div>

              {/* C-Shift */}
              <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-semibold">C-Shift (22:00-06:00)</span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-emerald-400 font-bold">{staffCoverage.cShift.present}/{staffCoverage.cShift.scheduled}</span>
                  </div>
                </div>
                <div className="text-sm text-emerald-400">{staffCoverage.cShift.posts}</div>
                <div className="text-xs text-slate-400 pt-2 border-t border-slate-700/50 mt-2">
                  Supervisor: {staffCoverage.cShift.supervisor}
                </div>
              </div>

              {/* Medical & Kitchen Staff */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4">
                  <div className="text-sm text-slate-400 mb-2">Medical Staff</div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="text-white font-bold">{staffCoverage.medical.present}/{staffCoverage.medical.scheduled}</div>
                  </div>
                  <div className="text-xs text-emerald-400">{staffCoverage.medical.posts}</div>
                  <div className="text-xs text-slate-500 mt-2">
                    {staffCoverage.medical.staff?.slice(0, 2).join(', ')}...
                  </div>
                </div>

                <div className="bg-slate-900/50 border border-amber-500/20 rounded-lg p-4">
                  <div className="text-sm text-slate-400 mb-2">Kitchen Staff</div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                    <div className="text-white font-bold">{staffCoverage.kitchen.present}/{staffCoverage.kitchen.scheduled}</div>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-amber-400">
                    <AlertTriangle className="w-3 h-3" />
                    <span>{staffCoverage.kitchen.posts}</span>
                  </div>
                  <button className="mt-2 w-full px-2 py-1 bg-blue-500/20 border border-blue-500/30 text-blue-400 rounded text-xs hover:bg-blue-500/30">
                    Post Job
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Services Status */}
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-blue-400" />
            Facility Services Status
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {servicesStatus.map((service, idx) => (
              <div key={idx} className="bg-slate-900/50 border border-slate-700 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {service.service === 'Video Visitation' && <Video className="w-4 h-4 text-blue-400" />}
                    {service.service === 'Commissary' && <ShoppingCart className="w-4 h-4 text-emerald-400" />}
                    {service.service === 'Inmate Phones' && <Phone className="w-4 h-4 text-purple-400" />}
                    {service.service === 'Mail Processing' && <Mail className="w-4 h-4 text-amber-400" />}
                    {service.service === 'Laundry Services' && <Activity className="w-4 h-4 text-cyan-400" />}
                    {service.service === 'Food Service' && <Utensils className="w-4 h-4 text-orange-400" />}
                    <span className="text-white font-semibold text-sm">{service.service}</span>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    service.status === 'Operational' ? 'bg-emerald-500/20 text-emerald-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>
                    {service.status}
                  </span>
                </div>

                <div className="space-y-2 text-sm text-slate-400">
                  {'sessionsToday' in service && (
                    <>
                      <div className="flex justify-between">
                        <span>Sessions Today:</span>
                        <span className="text-white font-semibold">{service.sessionsToday}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Stations:</span>
                        <span className="text-white">{service.stationsInUse}/{service.stationsTotal}</span>
                      </div>
                      <div className="text-xs text-emerald-400">Wait time: {service.waitTime}</div>
                    </>
                  )}

                  {'ordersToday' in service && (
                    <>
                      <div className="flex justify-between">
                        <span>Orders Today:</span>
                        <span className="text-white font-semibold">{service.ordersToday}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>In Queue:</span>
                        <span className="text-amber-400">{service.ordersInQueue}</span>
                      </div>
                      <div className="text-xs text-slate-500">Top: {service.topItems?.join(', ')}</div>
                    </>
                  )}

                  {'callsToday' in service && (
                    <>
                      <div className="flex justify-between">
                        <span>Calls Today:</span>
                        <span className="text-white font-semibold">{service.callsToday}</span>
                      </div>
                      {service.issues && service.issues !== '0 stations need repair' && (
                        <div className="flex items-center gap-1 text-xs text-amber-400">
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
                        <span className="text-white">{service.incomingToday}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Outgoing:</span>
                        <span className="text-white">{service.outgoingToday}</span>
                      </div>
                      {service.flaggedItems && service.flaggedItems > 0 && (
                        <div className="flex items-center gap-1 text-xs text-red-400">
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
                        <span className="text-white">{service.loadsCompleted}/{service.loadsTotal}</span>
                      </div>
                      <div className="text-xs text-blue-400">Next load: {service.nextLoad}</div>
                    </>
                  )}

                  {'nextMeal' in service && (
                    <>
                      <div className="flex justify-between">
                        <span>Next Meal:</span>
                        <span className="text-white font-semibold">{service.nextMeal}</span>
                      </div>
                      <div className="text-xs">{service.menu}</div>
                      <div className="text-xs text-purple-400">Special diets: {service.specialDiets}</div>
                    </>
                  )}

                  {/* Staff Assignment */}
                  {service.staff && (
                    <div className="pt-2 border-t border-slate-700/30 text-xs text-slate-500">
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
          <div className="relative bg-slate-900 border border-slate-700/50 rounded-2xl p-6 max-w-2xl w-full shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">{selectedPod.name}</h3>
                <p className="text-slate-400">{selectedPod.type} • {selectedPod.security} Security</p>
              </div>
              <button
                onClick={() => setSelectedPod(null)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Capacity Overview */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
                <div className="text-sm text-slate-400 mb-1">Capacity</div>
                <div className={`text-2xl font-bold ${getCapacityColor((selectedPod.current / selectedPod.capacity) * 100)}`}>
                  {selectedPod.current}/{selectedPod.capacity}
                </div>
              </div>
              <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
                <div className="text-sm text-slate-400 mb-1">Occupancy</div>
                <div className={`text-2xl font-bold ${getCapacityColor((selectedPod.current / selectedPod.capacity) * 100)}`}>
                  {Math.round((selectedPod.current / selectedPod.capacity) * 100)}%
                </div>
              </div>
              <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
                <div className="text-sm text-slate-400 mb-1">Status</div>
                <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(selectedPod.status)}`}>
                  {selectedPod.status}
                </span>
              </div>
            </div>

            {/* Staff Assigned */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 mb-4">
              <h4 className="text-sm font-semibold text-white mb-3">Staff Assigned</h4>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-slate-400">Officers:</span>{' '}
                  <span className="text-emerald-400 font-semibold">4/4</span>
                </div>
                <div className="text-slate-300">Officer Williams, Martinez, Chen, Rodriguez</div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 mb-4">
              <h4 className="text-sm font-semibold text-white mb-3">Recent Activity</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Last booking:</span>
                  <span className="text-white">2 hours ago</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Last incident:</span>
                  <span className="text-slate-300">3 days ago (resolved)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Last inspection:</span>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="w-3 h-3 text-green-400" />
                    <span className="text-green-400">Dec 9 (passed)</span>
                  </div>
                </div>
              </div>
            </div>

            {selectedPod.notes && (
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4 mb-4">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5" />
                  <p className="text-sm text-amber-400">{selectedPod.notes}</p>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3">
              <button className="flex-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors">
                View Full Roster
              </button>
              <button className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium transition-colors">
                Reassign Inmates
              </button>
              <button className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium transition-colors">
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

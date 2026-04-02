import React, { useState, useEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Filter,
  Clock,
  Shield,
  X,
  ExternalLink,
  AlertTriangle,
  Eye,
  Users,
  Zap
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';

export default function CommandCalendar() {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [viewMode, setViewMode] = useState('month');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(11);
  const [currentYear, setCurrentYear] = useState(2024);
  const [showRiskOverlay, setShowRiskOverlay] = useState(false);
  const [showStaffingOverlay, setShowStaffingOverlay] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
  const formatDate = (date) => date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  // Full event data
  const calendarEvents = [
    {
      id: 'cal-001',
      title: 'USMS Federal Housing Inspection',
      category: 'compliance',
      severity: 'critical',
      linkedModule: '/command/risk',
      assignedTo: 'Major Wilson',
      deadlineTimestamp: '2024-12-12T09:00:00',
      status: 'pending',
      notes: 'H2-Pod HVAC must be resolved before inspection. ACA temperature compliance at risk. 3-day inspection window.',
      day: 12,
      time: '09:00'
    },
    {
      id: 'cal-002',
      title: 'Use-of-Force Review Board',
      category: 'operational',
      severity: 'high',
      linkedModule: '/command/approvals',
      assignedTo: 'Chief Deputy Harris',
      deadlineTimestamp: '2024-12-13T13:00:00',
      status: 'pending',
      notes: 'Deputy Johnson B-Pod OC spray incident. Body camera footage secured. State reporting deadline imminent.',
      day: 13,
      time: '13:00'
    },
    {
      id: 'cal-003',
      title: 'Courts Coordination Meeting',
      category: 'operational',
      severity: 'medium',
      linkedModule: '/command/approvals',
      assignedTo: 'Major Wilson',
      deadlineTimestamp: '2024-12-14T14:00:00',
      status: 'pending',
      notes: 'Review early release candidates (23 eligible). Jail population at 92% capacity. Coordinate scheduling.',
      day: 14,
      time: '14:00'
    },
    {
      id: 'cal-004',
      title: 'County Budget Review — Q1 Allocation',
      category: 'operational',
      severity: 'medium',
      linkedModule: '/command/budget',
      assignedTo: 'Sheriff Thompson',
      deadlineTimestamp: '2024-12-02T10:00:00',
      status: 'completed',
      notes: 'Q1 2025 budget allocation finalized. Fleet maintenance overspend flagged for review.',
      day: 2,
      time: '10:00'
    },
    {
      id: 'cal-005',
      title: 'Financial Documentation Deadline',
      category: 'compliance',
      severity: 'high',
      linkedModule: '/command/risk',
      assignedTo: 'Compliance Officer Davis',
      deadlineTimestamp: '2024-12-05T17:00:00',
      status: 'completed',
      notes: 'Annual financial disclosure submissions due. 3 outstanding submissions pending.',
      day: 5,
      time: '17:00'
    },
    {
      id: 'cal-006',
      title: 'Fleet State Inspection Deadline',
      category: 'maintenance',
      severity: 'high',
      linkedModule: '/command/budget',
      assignedTo: 'Fleet Manager Anderson',
      deadlineTimestamp: '2024-12-10T17:00:00',
      status: 'in_progress',
      notes: 'Units 312, 318 overdue for state inspection. Must be completed or units cannot be deployed. Mechanic OT authorized.',
      day: 10,
      time: '17:00'
    },
    {
      id: 'cal-007',
      title: 'CIT Training — 8 Deputies',
      category: 'training',
      severity: 'low',
      linkedModule: '/command/personnel',
      assignedTo: 'Training Sgt. Brooks',
      deadlineTimestamp: '2024-12-16T08:00:00',
      status: 'pending',
      notes: '40-hour Crisis Intervention Training. 8 deputies enrolled. Patrol coverage adjusted.',
      day: 16,
      time: '08:00',
      staffingImpact: true,
      deputiesAffected: 8
    },
    {
      id: 'cal-008',
      title: 'POST Certification Deadline',
      category: 'compliance',
      severity: 'critical',
      linkedModule: '/command/risk',
      assignedTo: 'IA Supervisor Williams',
      deadlineTimestamp: '2024-12-20T17:00:00',
      status: 'pending',
      notes: '8 deputies approaching POST certification expiration. Training records must be submitted. Failure results in suspended duty status.',
      day: 20,
      time: '17:00',
      staffingImpact: true,
      deputiesAffected: 8
    },
    {
      id: 'cal-009',
      title: 'County Council Public Safety Update',
      category: 'operational',
      severity: 'medium',
      linkedModule: '/command/reports',
      assignedTo: 'Sheriff Thompson',
      deadlineTimestamp: '2024-12-18T18:00:00',
      status: 'pending',
      notes: 'Quarterly public safety briefing. Crime stats, staffing updates, budget projections.',
      day: 18,
      time: '18:00'
    },
    {
      id: 'cal-010',
      title: 'Holiday Staffing Plan Due',
      category: 'staffing',
      severity: 'high',
      linkedModule: '/command/personnel',
      assignedTo: 'Capt. Rodriguez',
      deadlineTimestamp: '2024-12-22T12:00:00',
      status: 'pending',
      notes: 'Christmas/New Year staffing plan. Minimum coverage requirements. OT budget projection.',
      day: 22,
      time: '12:00',
      staffingImpact: true
    },
    {
      id: 'cal-011',
      title: 'Background Investigation — Martinez Final Review',
      category: 'investigations',
      severity: 'medium',
      linkedModule: '/bi/dashboard',
      assignedTo: 'BI Supervisor Chen',
      deadlineTimestamp: '2024-12-08T10:00:00',
      status: 'in_progress',
      notes: 'Employment verification complete. Reference checks pending. Criminal history clear. Final review needed before hire recommendation.',
      day: 8,
      time: '10:00'
    },
    {
      id: 'cal-012',
      title: 'Holiday Scheduling — Christmas/NYE',
      category: 'staffing',
      severity: 'medium',
      linkedModule: '/command/personnel',
      assignedTo: 'Capt. Rodriguez',
      deadlineTimestamp: '2024-12-24T06:00:00',
      status: 'pending',
      notes: 'Holiday shift coverage begins. Patrol minimum staffing: 14 per shift. Detention minimum: 22.',
      day: 24,
      time: '06:00',
      staffingImpact: true
    },
    {
      id: 'cal-013',
      title: 'Defensive Tactics Recertification',
      category: 'training',
      severity: 'low',
      linkedModule: '/command/personnel',
      assignedTo: 'Training Sgt. Brooks',
      deadlineTimestamp: '2024-12-27T08:00:00',
      status: 'pending',
      notes: 'Annual DT recertification for 12 deputies. Range and classroom sessions.',
      day: 27,
      time: '08:00',
      staffingImpact: true,
      deputiesAffected: 12
    },
    {
      id: 'cal-014',
      title: 'Jail Population Review — Early Release',
      category: 'operational',
      severity: 'high',
      linkedModule: '/command/approvals',
      assignedTo: 'Detention Major Wilson',
      deadlineTimestamp: '2024-12-12T14:00:00',
      status: 'pending',
      notes: 'Review 23 early release candidates before federal inspection. Judge Martinez to review eligible list.',
      day: 12,
      time: '14:00'
    },
    {
      id: 'cal-015',
      title: 'Emergency Generator Test — Main Facility',
      category: 'maintenance',
      severity: 'medium',
      linkedModule: '/command/budget',
      assignedTo: 'Facilities Director Chen',
      deadlineTimestamp: '2024-12-12T07:00:00',
      status: 'pending',
      notes: 'Monthly generator load test. Full facility backup power verification required before federal audit.',
      day: 12,
      time: '07:00'
    },
    {
      id: 'cal-016',
      title: 'Firearms Qualification — B-Shift',
      category: 'training',
      severity: 'medium',
      linkedModule: '/command/personnel',
      assignedTo: 'Training Sgt. Brooks',
      deadlineTimestamp: '2024-12-13T08:00:00',
      status: 'pending',
      notes: '12 deputies scheduled for quarterly firearms qualification. Range reserved 0800-1200.',
      day: 13,
      time: '08:00',
      staffingImpact: true,
      deputiesAffected: 12
    },
    {
      id: 'cal-017',
      title: 'PREA Compliance Audit Prep',
      category: 'compliance',
      severity: 'high',
      linkedModule: '/command/risk',
      assignedTo: 'Compliance Officer Davis',
      deadlineTimestamp: '2024-12-14T10:00:00',
      status: 'pending',
      notes: 'Prison Rape Elimination Act compliance documentation review. Camera coverage gap in C-Pod identified.',
      day: 14,
      time: '10:00'
    },
    {
      id: 'cal-018',
      title: 'Command Staff Meeting',
      category: 'operational',
      severity: 'medium',
      linkedModule: '/command/reports',
      assignedTo: 'Sheriff Thompson',
      deadlineTimestamp: '2024-12-18T09:00:00',
      status: 'pending',
      notes: 'Weekly command staff meeting. Agenda: holiday staffing, fleet status, federal audit debrief.',
      day: 18,
      time: '09:00'
    },
    {
      id: 'cal-019',
      title: 'Overtime Budget Review — Q4 Close',
      category: 'operational',
      severity: 'high',
      linkedModule: '/command/budget',
      assignedTo: 'Sheriff Thompson',
      deadlineTimestamp: '2024-12-20T10:00:00',
      status: 'pending',
      notes: 'Q4 overtime spending at 118% of projection. $47K over budget. Review mandatory before year-end reporting.',
      day: 20,
      time: '10:00'
    },
    {
      id: 'cal-020',
      title: 'Body Camera Policy Audit',
      category: 'compliance',
      severity: 'medium',
      linkedModule: '/command/risk',
      assignedTo: 'IA Supervisor Williams',
      deadlineTimestamp: '2024-12-20T14:00:00',
      status: 'pending',
      notes: 'Quarterly body camera activation audit. 3 non-activation incidents flagged for review.',
      day: 20,
      time: '14:00'
    },
    {
      id: 'cal-021',
      title: 'Transport Coordination — Federal Inmates',
      category: 'operational',
      severity: 'medium',
      linkedModule: '/command/approvals',
      assignedTo: 'Capt. Rodriguez',
      deadlineTimestamp: '2024-12-22T09:00:00',
      status: 'pending',
      notes: 'USMS transport of 6 federal inmates. Escort detail: 4 deputies. Route security coordination required.',
      day: 22,
      time: '09:00',
      staffingImpact: true,
      deputiesAffected: 4
    },
    {
      id: 'cal-022',
      title: 'Inmate Grievance Hearings',
      category: 'compliance',
      severity: 'medium',
      linkedModule: '/command/risk',
      assignedTo: 'Detention Major Wilson',
      deadlineTimestamp: '2024-12-10T09:00:00',
      status: 'in_progress',
      notes: '4 grievance hearings scheduled. Medical access complaint (C-Pod), food quality (2), commissary dispute.',
      day: 10,
      time: '09:00'
    },
    {
      id: 'cal-023',
      title: 'Shift Briefing Standardization Review',
      category: 'operational',
      severity: 'low',
      linkedModule: '/command/reports',
      assignedTo: 'Chief Deputy Harris',
      deadlineTimestamp: '2024-12-05T08:00:00',
      status: 'completed',
      notes: 'Review and update shift briefing templates. New intelligence sharing format rolled out.',
      day: 5,
      time: '08:00'
    }
  ];

  // ============================================================
  // CONFLICT DETECTION — Simulated intelligence
  // Detect overlapping events with shared personnel/resources
  // ============================================================
  const conflicts = [
    {
      id: 'conflict-001',
      title: 'USMS Inspection overlaps with Fleet Inspection Deadline',
      days: [10, 12],
      detail: 'Maintenance staff shared across generator test, fleet inspection, and federal audit',
      severity: 'high'
    },
    {
      id: 'conflict-002',
      title: 'Firearms Qualification removes 12 deputies during Use-of-Force Review',
      days: [13],
      detail: '12 deputies at range + UoF review board — B-Shift already below minimum',
      severity: 'high'
    },
    {
      id: 'conflict-003',
      title: 'POST Certification + OT Budget Review on same day',
      days: [20],
      detail: 'Sheriff needed for OT budget review while POST certification deadline looms',
      severity: 'medium'
    }
  ];

  // Staffing impact data per day — days where staffing is affected
  const staffingImpactDays = {
    10: { below80: false, label: 'Fleet maintenance reduces patrol units' },
    12: { below80: false, label: 'Federal inspection pulls supervisors' },
    13: { below80: true, label: 'B-Shift below 80% + 12 at firearms range' },
    16: { below80: true, label: '8 deputies in CIT training (40hr block)' },
    17: { below80: true, label: 'CIT training continues — 8 deputies out' },
    18: { below80: true, label: 'CIT training day 3 — 8 deputies out' },
    19: { below80: true, label: 'CIT training day 4 — 8 deputies out' },
    20: { below80: true, label: 'CIT training day 5 + POST cert expiring' },
    22: { below80: false, label: '4 deputies on federal transport detail' },
    24: { below80: false, label: 'Holiday coverage begins — OT required' },
    27: { below80: true, label: '12 deputies in DT recertification' }
  };

  // Category accent colors
  const getCategoryAccent = (category) => {
    switch (category) {
      case 'compliance': return 'bg-red-500';
      case 'staffing': return 'bg-amber-500';
      case 'operational': return 'bg-slate-400';
      case 'investigations': return 'bg-slate-500';
      case 'training': case 'maintenance': return 'bg-emerald-500';
      default: return 'bg-slate-500';
    }
  };

  const getCategoryLabel = (category) => {
    switch (category) {
      case 'compliance': return 'Compliance';
      case 'staffing': return 'Staffing';
      case 'operational': return 'Operational';
      case 'investigations': return 'Investigations';
      case 'training': return 'Training';
      case 'maintenance': return 'Maintenance';
      default: return category;
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending': return { text: 'Pending', classes: 'bg-amber-100 border-amber-200 text-amber-700 dark:bg-amber-500/10 dark:border-amber-500/20 dark:text-amber-400' };
      case 'in_progress': return { text: 'In Progress', classes: 'bg-emerald-100 border-emerald-200 text-emerald-700 dark:bg-emerald-500/10 dark:border-emerald-500/20 dark:text-emerald-400' };
      case 'completed': return { text: 'Completed', classes: 'bg-slate-500/10 border-slate-500/20 text-slate-500' };
      case 'overdue': return { text: 'Overdue', classes: 'bg-red-100 border-red-200 text-red-700 dark:bg-red-500/10 dark:border-red-500/20 dark:text-red-400' };
      default: return { text: status, classes: 'bg-slate-500/10 border-slate-500/20 text-slate-500' };
    }
  };

  const getRiskTypeBadge = (category) => {
    switch (category) {
      case 'compliance': return { text: 'Compliance', classes: 'bg-red-100 border-red-200 text-red-700 dark:bg-red-500/10 dark:border-red-500/20 dark:text-red-400' };
      case 'staffing': return { text: 'Staffing', classes: 'bg-amber-100 border-amber-200 text-amber-700 dark:bg-amber-500/10 dark:border-amber-500/20 dark:text-amber-400' };
      case 'operational': return { text: 'Operational', classes: 'bg-slate-500/10 border-slate-500/20 text-slate-500' };
      case 'training': return { text: 'Training', classes: 'bg-emerald-100 border-emerald-200 text-emerald-700 dark:bg-emerald-500/10 dark:border-emerald-500/20 dark:text-emerald-400' };
      case 'maintenance': return { text: 'Maintenance', classes: 'bg-emerald-100 border-emerald-200 text-emerald-700 dark:bg-emerald-500/10 dark:border-emerald-500/20 dark:text-emerald-400' };
      default: return { text: category, classes: 'bg-slate-500/10 border-slate-500/20 text-slate-500' };
    }
  };

  // Calendar grid
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(currentYear, currentMonth, 1).getDay();
  const monthName = new Date(currentYear, currentMonth, 1).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  const today = new Date();
  const isCurrentMonth = today.getMonth() === currentMonth && today.getFullYear() === currentYear;

  const calendarDays = [];
  for (let i = 0; i < firstDayOfWeek; i++) calendarDays.push(null);
  for (let d = 1; d <= daysInMonth; d++) calendarDays.push(d);
  while (calendarDays.length % 7 !== 0) calendarDays.push(null);

  const getEventsForDay = (day) => calendarEvents.filter(e => e.day === day);

  // ============================================================
  // RISK DENSITY — per day, computed from event count + severity
  // Light = 1 event, Medium = 2, Heavy = 3+
  // ============================================================
  const getRiskDensity = (day) => {
    const dayEvents = getEventsForDay(day).filter(e => e.status !== 'completed');
    const activeRiskEvents = dayEvents.filter(e =>
      e.category === 'compliance' || e.category === 'staffing' || e.severity === 'critical' || e.severity === 'high'
    );
    if (activeRiskEvents.length >= 3) return 'heavy';
    if (activeRiskEvents.length >= 2) return 'medium';
    if (activeRiskEvents.length >= 1) return 'light';
    return 'none';
  };

  const getDensityDots = (density) => {
    switch (density) {
      case 'heavy': return (
        <div className="flex items-center gap-0.5">
          <div className="w-1 h-1 rounded-full bg-red-500"></div>
          <div className="w-1 h-1 rounded-full bg-red-500"></div>
          <div className="w-1 h-1 rounded-full bg-red-500"></div>
        </div>
      );
      case 'medium': return (
        <div className="flex items-center gap-0.5">
          <div className="w-1 h-1 rounded-full bg-amber-500"></div>
          <div className="w-1 h-1 rounded-full bg-amber-500"></div>
        </div>
      );
      case 'light': return (
        <div className="flex items-center gap-0.5">
          <div className="w-1 h-1 rounded-full bg-slate-400"></div>
        </div>
      );
      default: return null;
    }
  };

  // Risk stats
  const upcomingCritical = calendarEvents.filter(e => e.severity === 'critical' && e.status !== 'completed');
  const upcomingStaffing = calendarEvents.filter(e => e.category === 'staffing' && e.status !== 'completed');

  // High priority upcoming — strict filtering:
  // Within 14 days, escalating, compliance/staffing/inspection only
  // Sort: compliance risk → staffing impact → deadline proximity
  const startDay = isCurrentMonth ? today.getDate() : 1;
  const upcomingDeadlines = calendarEvents
    .filter(e => {
      if (e.status === 'completed') return false;
      if (e.day < startDay || e.day > startDay + 14) return false;
      const isEscalating = e.severity === 'critical' || e.severity === 'high';
      const isRelevantCategory = ['compliance', 'staffing', 'maintenance'].includes(e.category);
      return isEscalating && isRelevantCategory;
    })
    .sort((a, b) => {
      const catWeight = { compliance: 0, staffing: 1, maintenance: 2 };
      const catA = catWeight[a.category] ?? 3;
      const catB = catWeight[b.category] ?? 3;
      if (catA !== catB) return catA - catB;
      const sw = { critical: 0, high: 1 };
      const sevDiff = (sw[a.severity] ?? 2) - (sw[b.severity] ?? 2);
      if (sevDiff !== 0) return sevDiff;
      return a.day - b.day;
    })
    .slice(0, 5);

  const prevMonth = () => {
    if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(y => y - 1); }
    else setCurrentMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(y => y + 1); }
    else setCurrentMonth(m => m + 1);
  };

  const getCountdown = (day) => {
    const targetDay = isCurrentMonth ? day - today.getDate() : day;
    if (targetDay <= 0) return 'Today';
    if (targetDay === 1) return '1 day';
    return `${targetDay} days`;
  };

  // Timeline view
  const todayDate = isCurrentMonth ? today.getDate() : 1;
  const timelineDays = [];
  for (let i = 0; i < 7; i++) {
    const d = todayDate + i;
    if (d <= daysInMonth) {
      timelineDays.push({
        day: d,
        dayName: new Date(currentYear, currentMonth, d).toLocaleDateString('en-US', { weekday: 'short' }),
        isToday: isCurrentMonth && d === today.getDate(),
        events: getEventsForDay(d)
      });
    }
  }
  const timelineHours = ['06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'];

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 bg-transparent dark:bg-transparent min-h-full">
        <div className="max-w-7xl mx-auto">

        {/* Page Header */}
        <div className="mb-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-primary mb-1">Calendar & Timeline</h2>
            <div className="flex items-center gap-2 text-[11px] text-slate-500">
              <span>{formatDate(currentTime)}</span>
              <span className="text-slate-700">·</span>
              <span>{formatTime(currentTime)} EST</span>
              <span className="text-slate-700">·</span>
              <span>Operational pressure mapping and deadline intelligence</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {/* Staffing Impact Toggle */}
            <button
              onClick={() => setShowStaffingOverlay(!showStaffingOverlay)}
              className={`flex items-center gap-2 px-3 py-2 border rounded-lg text-[13px] font-medium transition-all ${
                showStaffingOverlay
                  ? 'bg-amber-500/10 border-amber-500/30 text-amber-700 dark:text-amber-400'
                  : 'bg-white dark:bg-slate-800/40 border-slate-300 dark:border-slate-700/40 text-secondary hover:text-slate-900 dark:hover:text-slate-300'
              }`}
            >
              <Users className="w-4 h-4" />
              Staffing Impact
            </button>
            {/* Risk Overlay Toggle */}
            <button
              onClick={() => setShowRiskOverlay(!showRiskOverlay)}
              className={`flex items-center gap-2 px-3 py-2 border rounded-lg text-[13px] font-medium transition-all ${
                showRiskOverlay
                  ? 'bg-red-500/10 border-red-500/30 text-red-700 dark:text-red-400'
                  : 'bg-white dark:bg-slate-800/40 border-slate-300 dark:border-slate-700/40 text-secondary hover:text-slate-900 dark:hover:text-slate-300'
              }`}
            >
              <Eye className="w-4 h-4" />
              Risk Overlay
            </button>
            <div className="flex bg-white dark:bg-slate-800/40 border border-slate-300 dark:border-slate-700/40 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('month')}
                className={`px-3 py-2 text-[13px] font-medium transition-all ${viewMode === 'month' ? 'bg-slate-200 dark:bg-slate-700/50 text-primary' : 'text-secondary hover:text-slate-900 dark:hover:text-slate-300'}`}
              >
                Month
              </button>
              <button
                onClick={() => setViewMode('timeline')}
                className={`px-3 py-2 text-[13px] font-medium transition-all ${viewMode === 'timeline' ? 'bg-slate-200 dark:bg-slate-700/50 text-primary' : 'text-secondary hover:text-slate-900 dark:hover:text-slate-300'}`}
              >
                Timeline
              </button>
            </div>
          </div>
        </div>

        {/* ================================================================
            CONFLICT DETECTION BANNER
            "Where does operational pressure stack?"
            ================================================================ */}
        {conflicts.length > 0 && (
          <div className="mb-5 space-y-1.5">
            {conflicts.map(conflict => (
              <div
                key={conflict.id}
                className={`px-5 py-3 rounded-xl border flex items-start gap-3 ${
                  conflict.severity === 'high'
                    ? 'bg-amber-500/[0.05] border-amber-500/20'
                    : 'bg-slate-50 dark:bg-slate-800/25 border-border dark:border-slate-700/30'
                }`}
              >
                <Zap className={`w-4 h-4 mt-0.5 flex-shrink-0 ${conflict.severity === 'high' ? 'text-amber-700 dark:text-amber-400' : 'text-slate-500'}`} />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className={`text-[13px] font-semibold ${conflict.severity === 'high' ? 'text-amber-700 dark:text-amber-400' : 'text-slate-500'}`}>
                      Conflict Detected:
                    </span>
                    <span className="text-[13px] text-primary font-medium">{conflict.title}</span>
                    <span className={`px-1.5 py-0.5 border rounded text-[10px] font-semibold ${
                      conflict.severity === 'critical' ? 'bg-red-100 border-red-200 text-red-700 dark:bg-red-500/10 dark:border-red-500/20 dark:text-red-400' :
                      conflict.severity === 'high' ? 'bg-amber-100 border-amber-200 text-amber-700 dark:bg-amber-500/10 dark:border-amber-500/20 dark:text-amber-400' :
                      'bg-slate-500/10 border-slate-500/20 text-slate-500'
                    }`}>{conflict.severity === 'high' ? 'High' : conflict.severity === 'critical' ? 'Critical' : 'Moderate'}</span>
                  </div>
                  <p className="text-[11px] text-secondary mt-0.5">{conflict.detail}</p>
                </div>
                <span className="text-[11px] text-slate-500 flex-shrink-0">Dec {conflict.days.join(', ')}</span>
              </div>
            ))}
          </div>
        )}

        {/* ================================================================
            OPERATIONAL PRESSURE FORECAST — Next 7 Days
            Predictive, not reactive
            ================================================================ */}
        <div className="mb-4 px-4 py-2 bg-slate-50 dark:bg-slate-800/15 border border-border rounded-lg">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider flex-shrink-0">7-Day Pressure</span>
            <div className="h-3 w-px bg-slate-100 dark:bg-slate-700/25"></div>
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-1.5">
                <span className="px-1.5 py-0.5 bg-red-500/10 border border-red-500/20 rounded text-[10px] font-semibold text-red-700 dark:text-red-400">Elevated</span>
                <span className="text-[10px] text-slate-500">Compliance: Inspection / POST / PREA</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="px-1.5 py-0.5 bg-amber-500/10 border border-amber-500/20 rounded text-[10px] font-semibold text-amber-700 dark:text-amber-400">Moderate</span>
                <span className="text-[10px] text-slate-500">Staffing: B-Shift + 12 at range</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="px-1.5 py-0.5 bg-emerald-500/10 border border-emerald-500/20 rounded text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">Low</span>
                <span className="text-[10px] text-slate-500">Facility: HVAC contained to H2-Pod</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        {viewMode === 'month' ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-6">

            {/* Calendar Grid */}
            <div className="lg:col-span-2 bg-white dark:bg-slate-800/25 border border-border dark:border-slate-700/30 rounded-xl shadow-sm dark:shadow-none p-5">
              {/* Month Navigation */}
              <div className="flex items-center justify-between mb-6">
                <button onClick={prevMonth} className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700/30 rounded-lg transition-colors">
                  <ChevronLeft className="w-4 h-4 text-secondary" />
                </button>
                <h3 className="text-[13px] font-semibold text-primary uppercase tracking-wide">{monthName}</h3>
                <button onClick={nextMonth} className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700/30 rounded-lg transition-colors">
                  <ChevronRight className="w-4 h-4 text-secondary" />
                </button>
              </div>

              {/* Day Headers */}
              <div className="grid grid-cols-7 gap-px mb-1">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="text-center text-[11px] font-semibold text-slate-500 uppercase tracking-wider py-2">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-px">
                {calendarDays.map((day, idx) => {
                  if (day === null) return <div key={`empty-${idx}`} className="min-h-[85px] bg-slate-100 dark:bg-slate-900/10 rounded"></div>;
                  const dayEvents = getEventsForDay(day);
                  const isToday = isCurrentMonth && day === today.getDate();
                  const density = getRiskDensity(day);
                  const hasStaffingImpact = showStaffingOverlay && staffingImpactDays[day];
                  const staffingBelow80 = hasStaffingImpact && staffingImpactDays[day].below80;

                  // Background: always-on heat glow by risk density, overlays intensify
                  let bgClass = 'bg-white dark:bg-slate-900/20';
                  if (isToday) {
                    bgClass = 'ring-2 ring-amber-500/40 bg-amber-500/[0.07] shadow-[0_0_12px_rgba(245,158,11,0.08)]';
                  } else if (staffingBelow80) {
                    bgClass = 'bg-amber-500/[0.05] ring-1 ring-amber-500/15';
                  } else if (density === 'heavy') {
                    bgClass = showRiskOverlay
                      ? 'bg-red-500/[0.08] ring-1 ring-red-500/25 shadow-[0_0_8px_rgba(239,68,68,0.06)]'
                      : 'bg-red-500/[0.04]';
                  } else if (density === 'medium') {
                    bgClass = showRiskOverlay
                      ? 'bg-red-500/[0.05] ring-1 ring-red-500/15'
                      : 'bg-amber-500/[0.03]';
                  }

                  return (
                    <div
                      key={day}
                      className={`min-h-[85px] p-1.5 rounded transition-colors hover:bg-slate-100 dark:hover:bg-slate-800/30 ${bgClass}`}
                    >
                      {/* Day number + density dots */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <span className={`text-[11px] font-semibold ${isToday ? 'text-amber-700 dark:text-amber-400' : 'text-slate-500'}`}>{day}</span>
                          {isToday && <span className="text-[9px] text-amber-500/60 font-medium uppercase">Today</span>}
                        </div>
                        <div className="flex items-center gap-1">
                          {showStaffingOverlay && staffingImpactDays[day] && (
                            <Users className={`w-2.5 h-2.5 ${staffingBelow80 ? 'text-amber-700 dark:text-amber-400' : 'text-slate-500'}`} />
                          )}
                          {showRiskOverlay && getDensityDots(density)}
                        </div>
                      </div>

                      {/* Events */}
                      <div className="mt-1 space-y-0.5">
                        {dayEvents.slice(0, 2).map(event => (
                          <button
                            key={event.id}
                            onClick={() => setSelectedEvent(event)}
                            className="w-full flex items-center gap-1 px-1 py-0.5 rounded hover:bg-slate-100 dark:hover:bg-slate-700/30 transition-colors text-left group"
                          >
                            <div className={`w-0.5 h-3 rounded-full flex-shrink-0 ${getCategoryAccent(event.category)}`}></div>
                            <span className="text-[10px] text-secondary truncate group-hover:text-white transition-colors">{event.title}</span>
                          </button>
                        ))}
                        {dayEvents.length > 2 && (
                          <button
                            onClick={() => setSelectedEvent(dayEvents[2])}
                            className="text-[10px] text-slate-500 pl-2 hover:text-secondary transition-colors"
                          >
                            +{dayEvents.length - 2} more
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="flex items-center gap-4 mt-4 pt-3 border-t border-border dark:border-slate-700/20 flex-wrap">
                {[
                  { color: 'bg-red-500', label: 'Compliance' },
                  { color: 'bg-amber-500', label: 'Staffing' },
                  { color: 'bg-slate-400', label: 'Operational' },
                  { color: 'bg-emerald-500', label: 'Training/Maint.' }
                ].map(item => (
                  <div key={item.label} className="flex items-center gap-1.5">
                    <div className={`w-1.5 h-1.5 rounded-full ${item.color}`}></div>
                    <span className="text-[10px] text-slate-500">{item.label}</span>
                  </div>
                ))}
                {showRiskOverlay && (
                  <>
                    <div className="h-3 w-px bg-slate-100 dark:bg-slate-700/30"></div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <div className="w-1 h-1 rounded-full bg-slate-400"></div>
                        <span className="text-[10px] text-slate-500">Low</span>
                      </div>
                      <div className="flex items-center gap-0.5">
                        <div className="w-1 h-1 rounded-full bg-amber-500"></div>
                        <div className="w-1 h-1 rounded-full bg-amber-500"></div>
                        <span className="text-[10px] text-slate-500 ml-0.5">Med</span>
                      </div>
                      <div className="flex items-center gap-0.5">
                        <div className="w-1 h-1 rounded-full bg-red-500"></div>
                        <div className="w-1 h-1 rounded-full bg-red-500"></div>
                        <div className="w-1 h-1 rounded-full bg-red-500"></div>
                        <span className="text-[10px] text-slate-500 ml-0.5">Heavy</span>
                      </div>
                    </div>
                  </>
                )}
                {showStaffingOverlay && (
                  <>
                    <div className="h-3 w-px bg-slate-100 dark:bg-slate-700/30"></div>
                    <div className="flex items-center gap-1.5">
                      <Users className="w-2.5 h-2.5 text-amber-700 dark:text-amber-400" />
                      <span className="text-[10px] text-amber-700 dark:text-amber-400/60">Staffing impacted</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* ================================================================
                HIGH PRIORITY UPCOMING — Upgraded with risk type, escalation, readiness
                ================================================================ */}
            <div className="bg-white dark:bg-slate-800/25 border border-border dark:border-slate-700/30 rounded-xl shadow-sm dark:shadow-none p-5">
              <h3 className="text-[13px] font-semibold text-primary uppercase tracking-wide mb-4">High Priority Upcoming</h3>

              <div className="space-y-2">
                {upcomingDeadlines.map(event => {
                  const countdown = getCountdown(event.day);
                  const riskBadge = getRiskTypeBadge(event.category);
                  const isEscalating = event.severity === 'critical' || (event.severity === 'high' && event.day <= (isCurrentMonth ? today.getDate() + 3 : 3));
                  return (
                    <button
                      key={event.id}
                      onClick={() => setSelectedEvent(event)}
                      className={`w-full rounded-lg border border-border border-l-[3px] ${
                        event.severity === 'critical' ? 'border-l-red-500/60' :
                        event.severity === 'high' ? 'border-l-amber-500/50' :
                        'border-l-slate-500/30'
                      } hover:bg-slate-50 dark:hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-colors text-left`}
                    >
                      <div className="p-3">
                        {/* Title */}
                        <p className="text-[13px] font-medium text-primary mb-1.5 leading-tight">{event.title}</p>

                        {/* Badges row: risk type + severity + countdown */}
                        <div className="flex items-center gap-1.5 mb-1.5 flex-wrap">
                          <span className={`px-1.5 py-0.5 border rounded text-[10px] font-semibold ${riskBadge.classes}`}>
                            {riskBadge.text}
                          </span>
                          <span className={`px-1.5 py-0.5 border rounded text-[10px] font-semibold ${
                            event.severity === 'critical' ? 'bg-red-100 border-red-200 text-red-700 dark:bg-red-500/10 dark:border-red-500/20 dark:text-red-400' :
                            event.severity === 'high' ? 'bg-amber-100 border-amber-200 text-amber-700 dark:bg-amber-500/10 dark:border-amber-500/20 dark:text-amber-400' :
                            'bg-slate-500/10 border-slate-500/20 text-slate-500'
                          }`}>
                            {countdown}
                          </span>
                          {isEscalating && (
                            <span className="px-1.5 py-0.5 bg-red-500/10 border border-red-500/20 rounded text-[10px] font-semibold text-red-700 dark:text-red-400">
                              Escalating
                            </span>
                          )}
                          {event.staffingImpact && (
                            <span className="px-1.5 py-0.5 bg-amber-500/8 border border-amber-500/15 rounded text-[10px] font-medium text-amber-700 dark:text-amber-400/70">
                              <Users className="w-2.5 h-2.5 inline mr-0.5 -mt-0.5" />
                              {event.deputiesAffected ? `${event.deputiesAffected} deputies` : 'Staffing'}
                            </span>
                          )}
                        </div>

                        {/* Metadata */}
                        <div className="flex items-center gap-2 text-[11px]">
                          <span className="text-slate-500">{event.assignedTo}</span>
                          <span className="text-slate-700">·</span>
                          <span className="text-slate-500">Dec {event.day} · {event.time}</span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          /* ===== TIMELINE VIEW ===== */
          <div className="mb-6 bg-white dark:bg-slate-800/25 border border-border dark:border-slate-700/30 rounded-xl shadow-sm dark:shadow-none p-5">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-[13px] font-semibold text-primary uppercase tracking-wide">Next 7 Days — Hour by Hour</h3>
              <span className="text-xs text-slate-500">Dec {timelineDays[0]?.day} – Dec {timelineDays[timelineDays.length - 1]?.day}, {currentYear}</span>
            </div>

            <div className="overflow-x-auto">
              <div className="min-w-[800px]">
                {/* Day headers */}
                <div className="grid gap-px" style={{ gridTemplateColumns: '60px repeat(7, 1fr)' }}>
                  <div></div>
                  {timelineDays.map(d => {
                    const density = getRiskDensity(d.day);
                    const hasStaffing = showStaffingOverlay && staffingImpactDays[d.day];
                    return (
                      <div
                        key={d.day}
                        className={`text-center py-2 rounded-t-lg ${
                          d.isToday ? 'bg-amber-500/[0.07] ring-1 ring-amber-500/20' : ''
                        }`}
                      >
                        <span className={`text-[11px] font-semibold uppercase tracking-wider ${d.isToday ? 'text-amber-700 dark:text-amber-400' : 'text-slate-500'}`}>
                          {d.dayName}
                        </span>
                        <span className={`block text-[13px] font-semibold ${d.isToday ? 'text-amber-700 dark:text-amber-300' : 'text-primary'}`}>
                          {d.day}
                        </span>
                        <div className="flex items-center justify-center gap-1 mt-0.5">
                          {d.isToday && <span className="text-[9px] text-amber-500/60 font-medium">TODAY</span>}
                          {showRiskOverlay && getDensityDots(density)}
                          {hasStaffing && <Users className="w-2.5 h-2.5 text-amber-700 dark:text-amber-400/60" />}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Hourly rows */}
                {timelineHours.map(hour => {
                  const hourNum = parseInt(hour.split(':')[0]);
                  return (
                    <div key={hour} className="grid gap-px border-t border-border" style={{ gridTemplateColumns: '60px repeat(7, 1fr)' }}>
                      <div className="py-2 pr-2 text-right">
                        <span className="text-[11px] font-mono text-slate-700">{hour}</span>
                      </div>
                      {timelineDays.map(d => {
                        const hourEvents = d.events.filter(e => parseInt(e.time.split(':')[0]) === hourNum);
                        const hasStaffing = showStaffingOverlay && staffingImpactDays[d.day];
                        return (
                          <div
                            key={`${d.day}-${hour}`}
                            className={`min-h-[32px] py-1 px-1 ${
                              d.isToday ? 'bg-amber-500/[0.02]' : ''
                            } ${hasStaffing && showStaffingOverlay ? 'bg-amber-500/[0.02]' : ''}`}
                          >
                            {hourEvents.map(event => (
                              <button
                                key={event.id}
                                onClick={() => setSelectedEvent(event)}
                                className={`w-full flex items-center gap-1.5 px-2 py-1 rounded text-left transition-colors hover:bg-slate-100 dark:hover:bg-slate-700/30 ${
                                  event.severity === 'critical' ? 'bg-red-500/[0.06] border-l-2 border-l-red-500/40' :
                                  event.severity === 'high' ? 'bg-amber-500/[0.06] border-l-2 border-l-amber-500/40' :
                                  'bg-slate-100 dark:bg-slate-800/20 border-l-2 border-l-slate-500/30'
                                }`}
                              >
                                <div className={`w-1 h-1 rounded-full flex-shrink-0 ${getCategoryAccent(event.category)}`}></div>
                                <span className="text-[10px] text-secondary truncate">{event.title}</span>
                              </button>
                            ))}
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Data Confidence Strip */}
        <div className="mb-4 px-5 py-3 bg-slate-50 dark:bg-slate-800/10 border border-border dark:border-slate-800/30 rounded-lg">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Shield className="w-3.5 h-3.5 text-slate-700" />
              <span className="text-xs text-slate-700">Calendar synced from</span>
            </div>
            <div className="flex items-center gap-2">
              {['Compliance', 'Staffing', 'Approvals', 'Facilities', 'Investigations'].map(mod => (
                <span key={mod} className="flex items-center gap-1 text-[11px] text-slate-500">
                  <div className="w-1 h-1 rounded-full bg-emerald-500/60"></div>
                  {mod}
                </span>
              ))}
            </div>
            <div className="h-3 w-px bg-slate-100 dark:bg-slate-700/30"></div>
            <span className="text-[11px] text-slate-500">Last sync: 2m ago</span>
          </div>
        </div>

        </div>
      </div>

      {/* Slide-Over Detail Panel */}
      {selectedEvent && (
        <>
          <div className="fixed inset-0 bg-black/30 z-40" onClick={() => setSelectedEvent(null)} />
          <div className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white dark:bg-slate-900 border-l border-border shadow-2xl z-50 overflow-y-auto">
            <div className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <h3 className="text-base font-semibold text-primary mb-2">{selectedEvent.title}</h3>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`px-1.5 py-0.5 border rounded text-[11px] font-medium ${getStatusBadge(selectedEvent.status).classes}`}>
                      {getStatusBadge(selectedEvent.status).text}
                    </span>
                    <span className={`px-1.5 py-0.5 border rounded text-[11px] font-medium ${getRiskTypeBadge(selectedEvent.category).classes}`}>
                      {getRiskTypeBadge(selectedEvent.category).text}
                    </span>
                    <span className={`px-1.5 py-0.5 border rounded text-[11px] font-medium ${
                      selectedEvent.severity === 'critical' ? 'bg-red-100 border-red-200 text-red-700 dark:bg-red-500/10 dark:border-red-500/20 dark:text-red-400' :
                      selectedEvent.severity === 'high' ? 'bg-amber-100 border-amber-200 text-amber-700 dark:bg-amber-500/10 dark:border-amber-500/20 dark:text-amber-400' :
                      'bg-slate-500/10 border-slate-500/20 text-slate-500'
                    }`}>
                      {selectedEvent.severity.toUpperCase()}
                    </span>
                  </div>
                </div>
                <button onClick={() => setSelectedEvent(null)} className="text-secondary hover:text-white transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-5">
                {selectedEvent.status !== 'completed' && (
                  <div className="bg-white dark:bg-slate-800/25 border border-border dark:border-slate-700/30 rounded-xl shadow-sm dark:shadow-none p-4">
                    <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Countdown</span>
                    <div className="mt-2 flex items-baseline gap-2">
                      <p className="text-2xl font-semibold text-primary">{getCountdown(selectedEvent.day)}</p>
                      <span className="text-xs text-secondary">until deadline</span>
                    </div>
                  </div>
                )}

                <div className="space-y-3">
                  <div>
                    <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Assigned Lead</span>
                    <p className="text-sm text-primary mt-1">{selectedEvent.assignedTo}</p>
                  </div>
                  <div className="border-t border-border dark:border-slate-700/20 pt-3">
                    <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Date & Time</span>
                    <p className="text-sm text-primary mt-1">December {selectedEvent.day}, 2024 · {selectedEvent.time}</p>
                  </div>
                  {selectedEvent.staffingImpact && (
                    <div className="border-t border-border dark:border-slate-700/20 pt-3">
                      <span className="text-[11px] font-semibold text-amber-700 dark:text-amber-400/80 uppercase tracking-wider">Staffing Impact</span>
                      <p className="text-sm text-amber-700 dark:text-amber-400 mt-1">
                        {selectedEvent.deputiesAffected ? `${selectedEvent.deputiesAffected} deputies removed from field duty` : 'Staffing coverage affected'}
                      </p>
                    </div>
                  )}
                  <div className="border-t border-border dark:border-slate-700/20 pt-3">
                    <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Linked Module</span>
                    <button
                      onClick={() => { setSelectedEvent(null); navigate(selectedEvent.linkedModule); }}
                      className="flex items-center gap-1.5 mt-1 text-sm text-amber-700 dark:text-amber-400/80 hover:text-amber-300 transition-colors"
                    >
                      {selectedEvent.linkedModule}
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                  <div className="border-t border-border dark:border-slate-700/20 pt-3">
                    <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Notes</span>
                    <p className="text-[13px] text-secondary leading-relaxed mt-1">{selectedEvent.notes}</p>
                  </div>
                </div>

                <div className="flex gap-2 pt-3 border-t border-border dark:border-slate-700/20">
                  <button
                    onClick={() => { setSelectedEvent(null); navigate(selectedEvent.linkedModule); }}
                    className="flex-1 px-3 py-2 text-xs font-medium text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/10 rounded-lg transition-colors"
                  >
                    Open Module
                  </button>
                  <button className="flex-1 px-3 py-2 text-xs font-medium text-secondary border border-border hover:bg-slate-100 dark:hover:bg-slate-700/20 rounded-lg transition-colors">
                    Edit Event
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </DashboardLayout>
  );
}

import React, { useState, useEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Filter,
  Clock,
  Shield,
  X,
  ArrowUpRight,
  ExternalLink,
  AlertTriangle,
  Eye
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';

export default function CommandCalendar() {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [viewMode, setViewMode] = useState('month');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(11); // December (0-indexed)
  const [currentYear, setCurrentYear] = useState(2024);
  const [showRiskOverlay, setShowRiskOverlay] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
  const formatDate = (date) => date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  // Full event data architecture
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
      time: '08:00'
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
      time: '17:00'
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
      time: '12:00'
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
      time: '06:00'
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
      time: '08:00'
    }
  ];

  // Category accent colors — system palette
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

  // Severity border color for upcoming deadlines panel
  const getSeverityBorder = (severity) => {
    switch (severity) {
      case 'critical': return 'border-l-red-500/40';
      case 'high': return 'border-l-amber-500/40';
      default: return 'border-l-slate-500/30';
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
      case 'pending': return { text: 'Pending', classes: 'bg-amber-500/10 border-amber-500/20 text-amber-400' };
      case 'in_progress': return { text: 'In Progress', classes: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' };
      case 'completed': return { text: 'Completed', classes: 'bg-slate-500/10 border-slate-500/20 text-slate-400' };
      case 'overdue': return { text: 'Overdue', classes: 'bg-red-500/10 border-red-500/20 text-red-400' };
      default: return { text: status, classes: 'bg-slate-500/10 border-slate-500/20 text-slate-400' };
    }
  };

  // Calendar grid generation
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

  // Risk overlay: check if a day has risk-relevant events (compliance, staffing, expirations)
  const dayHasRisk = (day) => {
    const dayEvents = getEventsForDay(day);
    return dayEvents.some(e =>
      e.status !== 'completed' &&
      (e.category === 'compliance' || e.category === 'staffing' || e.severity === 'critical' || e.severity === 'high')
    );
  };

  // Risk assessment for next 7 days
  const upcomingCritical = calendarEvents.filter(e => e.severity === 'critical' && e.status !== 'completed');
  const upcomingStaffing = calendarEvents.filter(e => e.category === 'staffing' && e.status !== 'completed');
  const riskLevel = upcomingCritical.length > 0 ? 'critical' : upcomingStaffing.length > 0 ? 'elevated' : 'stable';

  // High priority upcoming (sorted by day)
  const upcomingDeadlines = calendarEvents
    .filter(e => e.status !== 'completed' && e.day >= (isCurrentMonth ? today.getDate() : 1))
    .sort((a, b) => a.day - b.day)
    .slice(0, 6);

  const prevMonth = () => {
    if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(y => y - 1); }
    else setCurrentMonth(m => m - 1);
  };

  const nextMonth = () => {
    if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(y => y + 1); }
    else setCurrentMonth(m => m + 1);
  };

  // Countdown helper
  const getCountdown = (day) => {
    const targetDay = isCurrentMonth ? day - today.getDate() : day;
    if (targetDay <= 0) return 'Today';
    if (targetDay === 1) return '1 day';
    return `${targetDay} days`;
  };

  // Timeline view: generate next 7 days with hourly blocks
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
      <div className="p-5 lg:p-8">
        <div className="max-w-7xl mx-auto">

        {/* Page Header */}
        <div className="mb-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-white mb-1">Calendar & Timeline</h2>
            <div className="flex items-center gap-2 text-[11px] text-slate-500">
              <span>{formatDate(currentTime)}</span>
              <span className="text-slate-700">·</span>
              <span>{formatTime(currentTime)} EST</span>
              <span className="text-slate-700">·</span>
              <span>Command-level operational scheduling, compliance deadlines, and strategic events</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {/* Risk Overlay Toggle */}
            <button
              onClick={() => setShowRiskOverlay(!showRiskOverlay)}
              className={`flex items-center gap-2 px-3 py-2 border rounded-lg text-[13px] font-medium transition-all ${
                showRiskOverlay
                  ? 'bg-red-500/10 border-red-500/30 text-red-400'
                  : 'bg-slate-800/40 border-slate-700/40 text-slate-400 hover:text-slate-300'
              }`}
            >
              <Eye className="w-4 h-4" />
              Risk Overlay
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-amber-500/20 border border-amber-500/30 text-amber-400 rounded-lg text-[13px] font-medium hover:bg-amber-500/30 transition-all">
              <Plus className="w-4 h-4" />
              Create Event
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-slate-800/40 border border-slate-700/40 text-slate-300 rounded-lg text-[13px] font-medium hover:bg-slate-800/60 transition-all">
              <Filter className="w-4 h-4" />
              Filter
            </button>
            <div className="flex bg-slate-800/40 border border-slate-700/40 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('month')}
                className={`px-3 py-2 text-[13px] font-medium transition-all ${viewMode === 'month' ? 'bg-slate-700/50 text-white' : 'text-slate-400 hover:text-slate-300'}`}
              >
                Month
              </button>
              <button
                onClick={() => setViewMode('timeline')}
                className={`px-3 py-2 text-[13px] font-medium transition-all ${viewMode === 'timeline' ? 'bg-slate-700/50 text-white' : 'text-slate-400 hover:text-slate-300'}`}
              >
                Timeline
              </button>
            </div>
          </div>
        </div>

        {/* Risk Timeline Strip */}
        <div className="mb-8 flex items-center gap-6 px-5 py-3.5 bg-slate-800/25 border border-slate-700/30 rounded-xl">
          <div className="flex items-center gap-2.5">
            <Shield className="w-4 h-4 text-slate-500" />
            <span className="text-[13px] font-semibold text-slate-300">Upcoming Command Risk (Next 7 Days)</span>
          </div>
          <div className="h-4 w-px bg-slate-600/40"></div>
          <div className="flex items-center gap-2.5">
            <div className={`w-2 h-2 rounded-full ${riskLevel === 'critical' ? 'bg-red-500' : riskLevel === 'elevated' ? 'bg-amber-500' : 'bg-emerald-500'}`}></div>
            <span className={`text-[13px] font-semibold ${riskLevel === 'critical' ? 'text-red-400' : riskLevel === 'elevated' ? 'text-amber-400' : 'text-emerald-400'}`}>
              {riskLevel === 'critical' ? 'Critical — Compliance deadline at risk' : riskLevel === 'elevated' ? 'Elevated — Staffing risk projected' : 'Stable — No critical items'}
            </span>
          </div>
          <div className="h-4 w-px bg-slate-600/40"></div>
          <div className="flex items-center gap-2.5">
            <span className="text-[13px] text-slate-400">{upcomingCritical.length} critical</span>
            <span className="text-slate-600">·</span>
            <span className="text-[13px] text-slate-400">{upcomingStaffing.length} staffing</span>
            <span className="text-slate-600">·</span>
            <span className="text-[13px] text-slate-400">{calendarEvents.filter(e => e.status !== 'completed').length} total pending</span>
          </div>
        </div>

        {/* Main Content */}
        {viewMode === 'month' ? (
          /* ===== MONTH VIEW ===== */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-8">

            {/* Calendar Grid */}
            <div className="lg:col-span-2 bg-slate-800/25 border border-slate-700/30 rounded-xl p-5">
              {/* Month Navigation */}
              <div className="flex items-center justify-between mb-5">
                <button onClick={prevMonth} className="p-1.5 hover:bg-slate-700/30 rounded-lg transition-colors">
                  <ChevronLeft className="w-4 h-4 text-slate-400" />
                </button>
                <h3 className="text-[13px] font-semibold text-white uppercase tracking-wide">{monthName}</h3>
                <button onClick={nextMonth} className="p-1.5 hover:bg-slate-700/30 rounded-lg transition-colors">
                  <ChevronRight className="w-4 h-4 text-slate-400" />
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
                  if (day === null) return <div key={`empty-${idx}`} className="min-h-[80px] bg-slate-900/10 rounded"></div>;
                  const dayEvents = getEventsForDay(day);
                  const isToday = isCurrentMonth && day === today.getDate();
                  const hasRisk = showRiskOverlay && dayHasRisk(day);
                  return (
                    <div
                      key={day}
                      className={`min-h-[80px] p-1.5 rounded transition-colors hover:bg-slate-800/30 ${
                        isToday
                          ? 'ring-2 ring-amber-500/40 bg-amber-500/[0.07] shadow-[0_0_12px_rgba(245,158,11,0.08)]'
                          : hasRisk
                            ? 'bg-red-500/[0.04] ring-1 ring-red-500/15'
                            : 'bg-slate-900/20'
                      }`}
                    >
                      <div className="flex items-center gap-1">
                        <span className={`text-[11px] font-semibold ${isToday ? 'text-amber-400' : 'text-slate-500'}`}>{day}</span>
                        {isToday && <span className="text-[9px] text-amber-500/60 font-medium uppercase">Today</span>}
                        {hasRisk && !isToday && <AlertTriangle className="w-2.5 h-2.5 text-red-400/50" />}
                      </div>
                      <div className="mt-1 space-y-0.5">
                        {dayEvents.slice(0, 3).map(event => (
                          <button
                            key={event.id}
                            onClick={() => setSelectedEvent(event)}
                            className="w-full flex items-center gap-1 px-1 py-0.5 rounded hover:bg-slate-700/30 transition-colors text-left group"
                          >
                            <div className={`w-0.5 h-3 rounded-full flex-shrink-0 ${getCategoryAccent(event.category)}`}></div>
                            <span className="text-[10px] text-slate-300 truncate group-hover:text-white transition-colors">{event.title}</span>
                          </button>
                        ))}
                        {dayEvents.length > 3 && (
                          <span className="text-[10px] text-slate-500 pl-2">+{dayEvents.length - 3} more</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Category Legend */}
              <div className="flex items-center gap-4 mt-4 pt-3 border-t border-slate-700/20">
                {[
                  { color: 'bg-red-500', label: 'Compliance' },
                  { color: 'bg-amber-500', label: 'Staffing' },
                  { color: 'bg-slate-400', label: 'Operational' },
                  { color: 'bg-slate-500', label: 'Investigations' },
                  { color: 'bg-emerald-500', label: 'Training/Maint.' }
                ].map(item => (
                  <div key={item.label} className="flex items-center gap-1.5">
                    <div className={`w-1.5 h-1.5 rounded-full ${item.color}`}></div>
                    <span className="text-[10px] text-slate-500">{item.label}</span>
                  </div>
                ))}
                {showRiskOverlay && (
                  <>
                    <div className="h-3 w-px bg-slate-700/30"></div>
                    <div className="flex items-center gap-1.5">
                      <AlertTriangle className="w-2.5 h-2.5 text-red-400/50" />
                      <span className="text-[10px] text-red-400/60">Risk day</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Upcoming Deadlines Panel — with severity left borders */}
            <div className="bg-slate-800/25 border border-slate-700/30 rounded-xl p-5">
              <h3 className="text-[13px] font-semibold text-white uppercase tracking-wide mb-5">High Priority Upcoming</h3>

              <div className="space-y-2">
                {upcomingDeadlines.map(event => {
                  const countdown = getCountdown(event.day);
                  return (
                    <button
                      key={event.id}
                      onClick={() => setSelectedEvent(event)}
                      className={`w-full rounded-lg border border-slate-700/20 border-l-[3px] ${getSeverityBorder(event.severity)} hover:bg-slate-800/20 transition-colors text-left`}
                    >
                      <div className="flex items-center gap-3 p-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="text-sm font-medium text-white truncate">{event.title}</p>
                          </div>
                          <div className="flex items-center gap-2 text-[11px]">
                            <span className={`px-1.5 py-0.5 border rounded font-medium ${
                              event.severity === 'critical' ? 'bg-red-500/10 border-red-500/20 text-red-400' :
                              event.severity === 'high' ? 'bg-amber-500/10 border-amber-500/20 text-amber-400' :
                              'bg-slate-500/10 border-slate-500/20 text-slate-400'
                            }`}>
                              {countdown}
                            </span>
                            <span className="text-slate-500">{getCategoryLabel(event.category)}</span>
                          </div>
                          <div className="flex items-center gap-2 text-[11px] mt-1">
                            <span className="text-slate-500">{event.assignedTo}</span>
                            <span className="text-slate-600">·</span>
                            <span className="text-slate-500">Dec {event.day} · {event.time}</span>
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          /* ===== TIMELINE VIEW — Next 7 Days Hour-by-Hour ===== */
          <div className="mb-8 bg-slate-800/25 border border-slate-700/30 rounded-xl p-5">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-[13px] font-semibold text-white uppercase tracking-wide">Next 7 Days — Hour by Hour</h3>
              <span className="text-xs text-slate-500">Dec {timelineDays[0]?.day} – Dec {timelineDays[timelineDays.length - 1]?.day}, {currentYear}</span>
            </div>

            <div className="overflow-x-auto">
              <div className="min-w-[800px]">
                {/* Day headers */}
                <div className="grid gap-px" style={{ gridTemplateColumns: '60px repeat(7, 1fr)' }}>
                  <div></div>
                  {timelineDays.map(d => (
                    <div
                      key={d.day}
                      className={`text-center py-2 rounded-t-lg ${
                        d.isToday ? 'bg-amber-500/[0.07] ring-1 ring-amber-500/20' : ''
                      }`}
                    >
                      <span className={`text-[11px] font-semibold uppercase tracking-wider ${d.isToday ? 'text-amber-400' : 'text-slate-500'}`}>
                        {d.dayName}
                      </span>
                      <span className={`block text-[13px] font-semibold ${d.isToday ? 'text-amber-300' : 'text-white'}`}>
                        {d.day}
                      </span>
                      {d.isToday && <span className="text-[9px] text-amber-500/60 font-medium">TODAY</span>}
                    </div>
                  ))}
                </div>

                {/* Hourly rows */}
                {timelineHours.map(hour => {
                  const hourNum = parseInt(hour.split(':')[0]);
                  return (
                    <div key={hour} className="grid gap-px border-t border-slate-700/10" style={{ gridTemplateColumns: '60px repeat(7, 1fr)' }}>
                      <div className="py-2 pr-2 text-right">
                        <span className="text-[11px] font-mono text-slate-600">{hour}</span>
                      </div>
                      {timelineDays.map(d => {
                        const hourEvents = d.events.filter(e => {
                          const eventHour = parseInt(e.time.split(':')[0]);
                          return eventHour === hourNum;
                        });
                        return (
                          <div
                            key={`${d.day}-${hour}`}
                            className={`min-h-[32px] py-1 px-1 ${
                              d.isToday ? 'bg-amber-500/[0.02]' : ''
                            } ${showRiskOverlay && dayHasRisk(d.day) ? 'bg-red-500/[0.02]' : ''}`}
                          >
                            {hourEvents.map(event => (
                              <button
                                key={event.id}
                                onClick={() => setSelectedEvent(event)}
                                className={`w-full flex items-center gap-1.5 px-2 py-1 rounded text-left transition-colors hover:bg-slate-700/30 ${
                                  event.severity === 'critical' ? 'bg-red-500/[0.06] border-l-2 border-l-red-500/40' :
                                  event.severity === 'high' ? 'bg-amber-500/[0.06] border-l-2 border-l-amber-500/40' :
                                  'bg-slate-800/20 border-l-2 border-l-slate-500/30'
                                }`}
                              >
                                <div className={`w-1 h-1 rounded-full flex-shrink-0 ${getCategoryAccent(event.category)}`}></div>
                                <span className="text-[10px] text-slate-300 truncate">{event.title}</span>
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
        <div className="mb-4 px-5 py-3 bg-slate-800/10 border border-slate-800/30 rounded-lg">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Shield className="w-3.5 h-3.5 text-slate-600" />
              <span className="text-xs text-slate-600">Calendar synced from</span>
            </div>
            <div className="flex items-center gap-2">
              {['Compliance', 'Staffing', 'Approvals', 'Facilities', 'Investigations'].map(mod => (
                <span key={mod} className="flex items-center gap-1 text-[11px] text-slate-500">
                  <div className="w-1 h-1 rounded-full bg-emerald-500/60"></div>
                  {mod}
                </span>
              ))}
            </div>
            <div className="h-3 w-px bg-slate-700/30"></div>
            <span className="text-[11px] text-slate-500">Last sync: 2m ago</span>
          </div>
        </div>

        </div>
      </div>

      {/* Slide-Over Detail Panel */}
      {selectedEvent && (
        <>
          <div className="fixed inset-0 bg-black/30 z-40" onClick={() => setSelectedEvent(null)} />
          <div className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-slate-900 border-l border-slate-700/50 shadow-2xl z-50 overflow-y-auto transform transition-transform">
            <div className="p-6">
              {/* Panel Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <h3 className="text-base font-semibold text-white mb-2">{selectedEvent.title}</h3>
                  <div className="flex items-center gap-2">
                    <span className={`px-1.5 py-0.5 border rounded text-[11px] font-medium ${getStatusBadge(selectedEvent.status).classes}`}>
                      {getStatusBadge(selectedEvent.status).text}
                    </span>
                    <div className={`w-1.5 h-1.5 rounded-full ${getCategoryAccent(selectedEvent.category)}`}></div>
                    <span className="text-[11px] text-slate-400">{getCategoryLabel(selectedEvent.category)}</span>
                  </div>
                </div>
                <button onClick={() => setSelectedEvent(null)} className="text-slate-400 hover:text-white transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Event Details */}
              <div className="space-y-5">
                {/* Countdown */}
                {selectedEvent.status !== 'completed' && (
                  <div className="bg-slate-800/25 border border-slate-700/30 rounded-xl p-4">
                    <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Countdown</span>
                    <div className="mt-2 flex items-baseline gap-2">
                      <p className="text-2xl font-semibold text-white">{getCountdown(selectedEvent.day)}</p>
                      <span className="text-xs text-slate-400">until deadline</span>
                    </div>
                  </div>
                )}

                {/* Details Grid */}
                <div className="space-y-3">
                  <div>
                    <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Assigned Lead</span>
                    <p className="text-sm text-white mt-1">{selectedEvent.assignedTo}</p>
                  </div>
                  <div className="border-t border-slate-700/20 pt-3">
                    <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Date & Time</span>
                    <p className="text-sm text-white mt-1">December {selectedEvent.day}, 2024 · {selectedEvent.time}</p>
                  </div>
                  <div className="border-t border-slate-700/20 pt-3">
                    <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Severity</span>
                    <div className="mt-1">
                      <span className={`px-1.5 py-0.5 border rounded text-[11px] font-medium ${
                        selectedEvent.severity === 'critical' ? 'bg-red-500/10 border-red-500/20 text-red-400' :
                        selectedEvent.severity === 'high' ? 'bg-amber-500/10 border-amber-500/20 text-amber-400' :
                        'bg-slate-500/10 border-slate-500/20 text-slate-400'
                      }`}>
                        {selectedEvent.severity.toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <div className="border-t border-slate-700/20 pt-3">
                    <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Linked Module</span>
                    <button
                      onClick={() => { setSelectedEvent(null); navigate(selectedEvent.linkedModule); }}
                      className="flex items-center gap-1.5 mt-1 text-sm text-amber-400/80 hover:text-amber-300 transition-colors"
                    >
                      {selectedEvent.linkedModule}
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                  <div className="border-t border-slate-700/20 pt-3">
                    <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Notes</span>
                    <p className="text-[13px] text-slate-300 leading-relaxed mt-1">{selectedEvent.notes}</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-3 border-t border-slate-700/20">
                  <button
                    onClick={() => { setSelectedEvent(null); navigate(selectedEvent.linkedModule); }}
                    className="flex-1 px-3 py-2 text-xs font-medium text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/10 rounded-lg transition-colors"
                  >
                    Open Module
                  </button>
                  <button className="flex-1 px-3 py-2 text-xs font-medium text-slate-400 border border-slate-700/30 hover:bg-slate-700/20 rounded-lg transition-colors">
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

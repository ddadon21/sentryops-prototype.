import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, X, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';
import { hrNavigation, hrProfile, hrNotifications } from '../config/hrConfig';

export default function HRCalendar() {
  const navigate = useNavigate();
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [viewMode, setViewMode] = useState('month');
  const [selectedEvent, setSelectedEvent] = useState(null);

  const calendarEvents = [
    {
      id: 'hr-001',
      title: 'Deputy Rodriguez — FMLA Return',
      category: 'compliance',
      severity: 'high',
      linkedModule: '/hr/timeoff',
      assignedTo: 'HR Director',
      status: 'pending',
      notes: 'Deputy R. Rodriguez returns from 12-week FMLA continuous leave. Medical clearance required before reinstatement to patrol duty. Return-to-work meeting scheduled 08:00.',
      day: 1,
      time: '08:00',
    },
    {
      id: 'hr-002',
      title: 'Detective Sergeant Job Posting Closes',
      category: 'compliance',
      severity: 'medium',
      linkedModule: '/hr/jobs',
      assignedTo: 'HR Recruiter',
      status: 'pending',
      notes: 'Competitive posting for Detective Sergeant (Criminal Investigations Division) closes at 23:59. 14 applications received — panel review scheduled May 9.',
      day: 2,
      time: '23:59',
    },
    {
      id: 'hr-003',
      title: 'New Hire Orientation — Deputy Mitchell',
      category: 'onboarding',
      severity: 'medium',
      linkedModule: '/hr/onboarding',
      assignedTo: 'HR Coordinator',
      status: 'pending',
      notes: 'Deputy Sarah Mitchell (Patrol Deputy, Shift C) first day. Oath of Office 08:00 with Sheriff. I-9 verification, benefits enrollment, FTO assignment — Deputy Rodriguez.',
      day: 5,
      time: '08:00',
    },
    {
      id: 'hr-004',
      title: 'POST Certification Deadline — Sgt. Thompson',
      category: 'compliance',
      severity: 'critical',
      linkedModule: '/hr/training',
      assignedTo: 'HR Director',
      status: 'pending',
      notes: 'Sgt. K. Thompson Intermediate POST certification expires. Training NOT scheduled — duty suspension required if cert lapses. Immediate supervisory intervention needed.',
      day: 7,
      time: '17:00',
    },
    {
      id: 'hr-005',
      title: 'Q2 2026 Performance Review Cycle Opens',
      category: 'review',
      severity: 'medium',
      linkedModule: '/hr/reviews',
      assignedTo: 'HR Director',
      status: 'pending',
      notes: 'Q2 performance evaluation cycle opens for all supervisors. 47 sworn and 12 civilian evaluations due by May 28. Supervisor access granted to evaluation portal.',
      day: 9,
      time: '08:00',
    },
    {
      id: 'hr-006',
      title: 'Benefits Enrollment Deadline — April Hires',
      category: 'compliance',
      severity: 'high',
      linkedModule: '/hr/onboarding',
      assignedTo: 'HR Coordinator',
      status: 'pending',
      notes: '30-day enrollment window closes for April new hires: Deputies Mitchell, Park (Records), Rodriguez (Dispatch). Late enrollment requires qualifying life event. Final reminder sent.',
      day: 12,
      time: '17:00',
    },
    {
      id: 'hr-007',
      title: 'Applicant Physical Agility Testing',
      category: 'training',
      severity: 'medium',
      linkedModule: '/hr/pipeline',
      assignedTo: 'HR Recruiter',
      status: 'pending',
      notes: '12 Deputy Sheriff applicants scheduled for Georgia POST Physical Agility Test (PAT). Testing facility: GCSO Training Annex. Evaluator: Lt. Davis. Patrol coverage adjusted.',
      day: 14,
      time: '07:00',
    },
    {
      id: 'hr-008',
      title: 'FMLA Designation Notice Due — Deputy Chen',
      category: 'compliance',
      severity: 'high',
      linkedModule: '/hr/timeoff',
      assignedTo: 'HR Director',
      status: 'pending',
      notes: 'Federal 5-day deadline to issue FMLA designation notice for Deputy J. Chen intermittent leave request. Failure to designate by 17:00 creates FMLA interference liability.',
      day: 16,
      time: '17:00',
    },
    {
      id: 'hr-009',
      title: 'Annual Evaluations Due — Patrol Division',
      category: 'review',
      severity: 'high',
      linkedModule: '/hr/reviews',
      assignedTo: 'Patrol Division Commander',
      status: 'pending',
      notes: '31 Patrol Division annual performance evaluations due — Q2 review cycle mid-point check. 8 overdue as of today. Division commander will be contacted for compliance action.',
      day: 19,
      time: '17:00',
    },
    {
      id: 'hr-010',
      title: 'Evidence Technician Job Posting Closes',
      category: 'compliance',
      severity: 'medium',
      linkedModule: '/hr/jobs',
      assignedTo: 'HR Recruiter',
      status: 'pending',
      notes: 'Evidence Technician (civilian) job posting closes. 7 applications received. Background investigation required pre-offer. Panel interviews scheduled May 28.',
      day: 21,
      time: '23:59',
    },
    {
      id: 'hr-011',
      title: 'New Hire Orientation — Detention Deputy Class',
      category: 'onboarding',
      severity: 'medium',
      linkedModule: '/hr/onboarding',
      assignedTo: 'HR Coordinator',
      status: 'pending',
      notes: '6-person Detention Deputy class orientation. Oath of Office 08:00, facility tour, policy review, equipment issue. Basic Jailer Certification training begins June 2.',
      day: 23,
      time: '08:00',
    },
    {
      id: 'hr-012',
      title: 'POST Certification Renewal — Deputy Williams',
      category: 'compliance',
      severity: 'critical',
      linkedModule: '/hr/training',
      assignedTo: 'HR Director',
      status: 'in_progress',
      notes: 'Deputy L. Williams Basic POST certification renewal deadline. Training scheduled (GPSTC May 19-23) — verification of completion and proof of submission to GA POST required.',
      day: 26,
      time: '17:00',
    },
    {
      id: 'hr-013',
      title: 'Q2 Performance Review Completion Deadline',
      category: 'review',
      severity: 'high',
      linkedModule: '/hr/reviews',
      assignedTo: 'HR Director',
      status: 'pending',
      notes: 'Hard deadline for all Q2 2026 performance evaluations — 47 sworn + 12 civilian. Incomplete evals trigger disciplinary action against supervising lieutenant per policy HR-3.4.',
      day: 28,
      time: '17:00',
    },
    {
      id: 'hr-014',
      title: 'Monthly HR Compliance Report — Command',
      category: 'compliance',
      severity: 'medium',
      linkedModule: '/hr/reports',
      assignedTo: 'HR Director',
      status: 'pending',
      notes: 'End-of-month HR compliance report to Sheriff\'s Office Command Staff. Metrics: POST certification status, FMLA activity, open positions, eval completion rates, turnover.',
      day: 30,
      time: '14:00',
    },
  ];

  const getCategoryAccent = (cat) => {
    switch (cat) {
      case 'compliance': return 'bg-red-500';
      case 'onboarding': return 'bg-amber-500';
      case 'review':     return 'bg-slate-400';
      case 'training':   return 'bg-emerald-500';
      default:           return 'bg-slate-500';
    }
  };

  const getCategoryLabel = (cat) => {
    switch (cat) {
      case 'compliance': return 'Compliance / Legal';
      case 'onboarding': return 'Onboarding';
      case 'review':     return 'Performance Review';
      case 'training':   return 'Training';
      default:           return cat;
    }
  };

  const getStatusBadge = (s) => {
    switch (s) {
      case 'pending':     return { text: 'Pending',     cls: 'bg-amber-500/10 border-amber-500/20 text-amber-700 dark:text-amber-400' };
      case 'in_progress': return { text: 'In Progress', cls: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400' };
      case 'completed':   return { text: 'Completed',   cls: 'bg-slate-500/10 border-slate-500/20 text-slate-500' };
      default:            return { text: s,             cls: 'bg-slate-500/10 border-slate-500/20 text-slate-500' };
    }
  };

  const getCatBadge = (cat) => {
    switch (cat) {
      case 'compliance': return 'bg-red-500/10 border-red-500/20 text-red-700 dark:text-red-400';
      case 'onboarding': return 'bg-amber-500/10 border-amber-500/20 text-amber-700 dark:text-amber-400';
      case 'review':     return 'bg-slate-500/10 border-slate-500/20 text-slate-500';
      case 'training':   return 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400';
      default:           return 'bg-slate-500/10 border-slate-500/20 text-slate-500';
    }
  };

  const monthName   = new Date(currentYear, currentMonth, 1).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  const shortMonth  = new Date(currentYear, currentMonth, 1).toLocaleDateString('en-US', { month: 'long' });
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDOW    = new Date(currentYear, currentMonth, 1).getDay();
  const isCurrentMo = today.getMonth() === currentMonth && today.getFullYear() === currentYear;

  const calendarDays = [];
  for (let i = 0; i < firstDOW; i++) calendarDays.push(null);
  for (let d = 1; d <= daysInMonth; d++) calendarDays.push(d);
  while (calendarDays.length % 7 !== 0) calendarDays.push(null);

  const getEventsForDay = (day) => calendarEvents.filter(e => e.day === day);

  const prevMonth = () => {
    if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(y => y - 1); }
    else setCurrentMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(y => y + 1); }
    else setCurrentMonth(m => m + 1);
  };

  const getCountdown = (day) => {
    if (!isCurrentMo) return `${shortMonth} ${day}`;
    const diff = day - today.getDate();
    if (diff < 0) return 'Past';
    if (diff === 0) return 'Today';
    if (diff === 1) return '1 day';
    return `${diff} days`;
  };

  const startDay = isCurrentMo ? today.getDate() : 1;
  const upcomingDeadlines = calendarEvents
    .filter(e => e.status !== 'completed' && e.day >= startDay && e.day <= startDay + 14
      && (e.severity === 'critical' || e.severity === 'high'))
    .sort((a, b) => {
      const sw = { critical: 0, high: 1 };
      const sd = (sw[a.severity] ?? 2) - (sw[b.severity] ?? 2);
      return sd !== 0 ? sd : a.day - b.day;
    })
    .slice(0, 6);

  const todayDate = isCurrentMo ? today.getDate() : 1;
  const timelineDays = [];
  for (let i = 0; i < 7; i++) {
    const d = todayDate + i;
    if (d <= daysInMonth) timelineDays.push({
      day: d,
      dayName: new Date(currentYear, currentMonth, d).toLocaleDateString('en-US', { weekday: 'short' }),
      isToday: isCurrentMo && d === today.getDate(),
      events: getEventsForDay(d),
    });
  }
  const timelineHours = ['07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];

  return (
    <DashboardLayout
      navigation={hrNavigation}
      profile={hrProfile}
      notifications={hrNotifications}
      settingsRoute="/hr/settings"
      profileRoute="/hr/profile"
      activityRoute="/hr/activity"
      activityModuleFilter="hr"
    >
      <div className="p-6 lg:p-8 min-h-full">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="mb-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold text-primary mb-1">HR Calendar</h2>
              <p className="text-secondary">Onboarding dates · POST certification deadlines · FMLA returns · Performance review cycles · Job posting windows</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex bg-white dark:bg-zinc-900/40 border border-slate-300 dark:border-slate-700/40 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('month')}
                  className={`px-3 py-2 text-[13px] font-medium transition-all ${viewMode === 'month' ? 'bg-slate-200 dark:bg-zinc-800/50 text-primary' : 'text-secondary'}`}
                >Month</button>
                <button
                  onClick={() => setViewMode('timeline')}
                  className={`px-3 py-2 text-[13px] font-medium transition-all ${viewMode === 'timeline' ? 'bg-slate-200 dark:bg-zinc-800/50 text-primary' : 'text-secondary'}`}
                >Timeline</button>
              </div>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="mb-4 px-4 py-2 bg-slate-50 dark:bg-zinc-900/15 border border-border rounded-lg">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">This Month</span>
              <div className="h-3 w-px bg-slate-200 dark:bg-zinc-800/30"></div>
              {[
                { label: `${calendarEvents.filter(e => e.severity === 'critical').length} POST / Compliance deadlines`, color: 'bg-red-500/10 border-red-500/20 text-red-700 dark:text-red-400' },
                { label: `${calendarEvents.filter(e => e.category === 'onboarding').length} New hire starts`, color: 'bg-amber-500/10 border-amber-500/20 text-amber-700 dark:text-amber-400' },
                { label: `${calendarEvents.filter(e => e.category === 'review').length} Performance review dates`, color: 'bg-slate-500/10 border-slate-500/20 text-slate-500' },
                { label: `${calendarEvents.filter(e => e.category === 'training').length} Training sessions`, color: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400' },
              ].map(item => (
                <span key={item.label} className={`px-1.5 py-0.5 border rounded text-[10px] font-medium ${item.color}`}>{item.label}</span>
              ))}
            </div>
          </div>

          {viewMode === 'month' ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-6">

              {/* Calendar Grid */}
              <div className="lg:col-span-2 bg-white dark:bg-zinc-900/25 border border-border dark:border-slate-700/30 rounded-xl p-5">
                <div className="flex items-center justify-between mb-6">
                  <button onClick={prevMonth} className="p-1.5 hover:bg-slate-100 dark:hover:bg-zinc-800/30 rounded-lg transition-colors">
                    <ChevronLeft className="w-4 h-4 text-secondary" />
                  </button>
                  <h3 className="text-[13px] font-semibold text-primary uppercase tracking-wide">{monthName}</h3>
                  <button onClick={nextMonth} className="p-1.5 hover:bg-slate-100 dark:hover:bg-zinc-800/30 rounded-lg transition-colors">
                    <ChevronRight className="w-4 h-4 text-secondary" />
                  </button>
                </div>

                <div className="grid grid-cols-7 gap-px mb-1">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
                    <div key={d} className="text-center text-[11px] font-semibold text-slate-500 uppercase tracking-wider py-2">{d}</div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-px">
                  {calendarDays.map((day, idx) => {
                    if (day === null) return <div key={`e-${idx}`} className="min-h-[85px] bg-slate-100 dark:bg-zinc-950/10 rounded" />;
                    const dayEvents = getEventsForDay(day);
                    const isToday = isCurrentMo && day === today.getDate();
                    const hasCritical = dayEvents.some(e => e.severity === 'critical');
                    const hasHigh = dayEvents.some(e => e.severity === 'high');
                    let bg = 'bg-white dark:bg-zinc-950/20';
                    if (isToday) bg = 'ring-2 ring-amber-500/40 bg-amber-500/[0.07]';
                    else if (hasCritical) bg = 'bg-red-500/[0.05] ring-1 ring-red-500/20';
                    else if (hasHigh) bg = 'bg-amber-500/[0.04]';
                    return (
                      <div key={day} className={`min-h-[85px] p-1.5 rounded transition-colors hover:bg-slate-100 dark:hover:bg-zinc-900/30 ${bg}`}>
                        <div className="flex items-center gap-1 mb-1">
                          <span className={`text-[11px] font-semibold ${isToday ? 'text-amber-700 dark:text-amber-400' : 'text-slate-500'}`}>{day}</span>
                          {isToday && <span className="text-[9px] text-amber-700/60 font-medium uppercase">Today</span>}
                        </div>
                        <div className="space-y-0.5">
                          {dayEvents.slice(0, 2).map(ev => (
                            <button
                              key={ev.id}
                              onClick={() => setSelectedEvent(ev)}
                              className="w-full flex items-center gap-1 px-1 py-0.5 rounded hover:bg-slate-100 dark:hover:bg-zinc-800/30 transition-colors text-left group"
                            >
                              <div className={`w-0.5 h-3 rounded-full flex-shrink-0 ${getCategoryAccent(ev.category)}`} />
                              <span className="text-[10px] text-secondary truncate group-hover:text-white transition-colors">{ev.title}</span>
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
                    { color: 'bg-red-500',     label: 'Compliance / Legal' },
                    { color: 'bg-amber-500',   label: 'Onboarding' },
                    { color: 'bg-slate-400',   label: 'Performance Review' },
                    { color: 'bg-emerald-500', label: 'Training' },
                  ].map(item => (
                    <div key={item.label} className="flex items-center gap-1.5">
                      <div className={`w-1.5 h-1.5 rounded-full ${item.color}`} />
                      <span className="text-[10px] text-slate-500">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Upcoming Panel */}
              <div className="bg-white dark:bg-zinc-900/25 border border-border dark:border-slate-700/30 rounded-xl p-5">
                <h3 className="text-[13px] font-semibold text-primary uppercase tracking-wide mb-4">Upcoming — 14 Days</h3>
                <div className="space-y-2">
                  {upcomingDeadlines.length === 0 ? (
                    <p className="text-xs text-slate-500 italic">No high-priority items in the next 14 days.</p>
                  ) : upcomingDeadlines.map(ev => (
                    <button
                      key={ev.id}
                      onClick={() => setSelectedEvent(ev)}
                      className={`w-full rounded-lg border border-border border-l-[3px] ${
                        ev.severity === 'critical' ? 'border-l-red-500/60' : 'border-l-amber-500/50'
                      } hover:bg-slate-50 dark:hover:bg-zinc-900/20 transition-colors text-left`}
                    >
                      <div className="p-3">
                        <p className="text-[13px] font-medium text-primary mb-1.5 leading-tight">{ev.title}</p>
                        <div className="flex items-center gap-1.5 flex-wrap mb-1.5">
                          <span className={`px-1.5 py-0.5 border rounded text-[10px] font-semibold ${getCatBadge(ev.category)}`}>
                            {getCategoryLabel(ev.category)}
                          </span>
                          <span className={`px-1.5 py-0.5 border rounded text-[10px] font-semibold ${
                            ev.severity === 'critical'
                              ? 'bg-red-500/10 border-red-500/20 text-red-700 dark:text-red-400'
                              : 'bg-amber-500/10 border-amber-500/20 text-amber-700 dark:text-amber-400'
                          }`}>
                            {getCountdown(ev.day)}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-500">{ev.assignedTo} · {shortMonth} {ev.day} · {ev.time}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* Timeline View */
            <div className="mb-6 bg-white dark:bg-zinc-900/25 border border-border dark:border-slate-700/30 rounded-xl p-5">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-[13px] font-semibold text-primary uppercase tracking-wide">Next 7 Days — Hour by Hour</h3>
                <span className="text-xs text-slate-500">
                  {timelineDays[0] && `${shortMonth} ${timelineDays[0].day} – ${shortMonth} ${timelineDays[timelineDays.length - 1]?.day}, ${currentYear}`}
                </span>
              </div>
              <div className="overflow-x-auto">
                <div className="min-w-[700px]">
                  <div className="grid gap-px" style={{ gridTemplateColumns: '60px repeat(7, 1fr)' }}>
                    <div />
                    {timelineDays.map(d => (
                      <div key={d.day} className={`text-center py-2 rounded-t-lg ${d.isToday ? 'bg-amber-500/[0.07] ring-1 ring-amber-500/20' : ''}`}>
                        <span className={`text-[11px] font-semibold uppercase tracking-wider ${d.isToday ? 'text-amber-700 dark:text-amber-400' : 'text-slate-500'}`}>{d.dayName}</span>
                        <span className={`block text-[13px] font-semibold ${d.isToday ? 'text-amber-700 dark:text-amber-300' : 'text-primary'}`}>{d.day}</span>
                        {d.isToday && <span className="text-[9px] text-amber-700/60 font-medium">TODAY</span>}
                      </div>
                    ))}
                  </div>
                  {timelineHours.map(hour => {
                    const hourNum = parseInt(hour.split(':')[0]);
                    return (
                      <div key={hour} className="grid gap-px border-t border-border" style={{ gridTemplateColumns: '60px repeat(7, 1fr)' }}>
                        <div className="py-2 pr-2 text-right">
                          <span className="text-[11px] font-mono text-slate-700">{hour}</span>
                        </div>
                        {timelineDays.map(d => {
                          const hourEvents = d.events.filter(e => parseInt(e.time.split(':')[0]) === hourNum);
                          return (
                            <div key={`${d.day}-${hour}`} className={`min-h-[32px] py-1 px-1 ${d.isToday ? 'bg-amber-500/[0.02]' : ''}`}>
                              {hourEvents.map(ev => (
                                <button
                                  key={ev.id}
                                  onClick={() => setSelectedEvent(ev)}
                                  className={`w-full flex items-center gap-1.5 px-2 py-1 rounded text-left transition-colors hover:bg-slate-100 dark:hover:bg-zinc-800/30 ${
                                    ev.severity === 'critical'
                                      ? 'bg-red-500/[0.06] border-l-2 border-l-red-500/40'
                                      : ev.severity === 'high'
                                      ? 'bg-amber-500/[0.06] border-l-2 border-l-amber-500/40'
                                      : 'bg-slate-100 dark:bg-zinc-900/20 border-l-2 border-l-slate-500/30'
                                  }`}
                                >
                                  <div className={`w-1 h-1 rounded-full flex-shrink-0 ${getCategoryAccent(ev.category)}`} />
                                  <span className="text-[10px] text-secondary truncate">{ev.title}</span>
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

        </div>
      </div>

      {/* Slide-Over */}
      {selectedEvent && (
        <>
          <div className="fixed inset-0 bg-black/30 z-40" onClick={() => setSelectedEvent(null)} />
          <div className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white dark:bg-zinc-950 border-l border-border shadow-2xl z-50 overflow-y-auto">
            <div className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <h3 className="text-base font-semibold text-primary mb-2">{selectedEvent.title}</h3>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`px-1.5 py-0.5 border rounded text-[11px] font-medium ${getStatusBadge(selectedEvent.status).cls}`}>
                      {getStatusBadge(selectedEvent.status).text}
                    </span>
                    <span className={`px-1.5 py-0.5 border rounded text-[11px] font-medium ${getCatBadge(selectedEvent.category)}`}>
                      {getCategoryLabel(selectedEvent.category)}
                    </span>
                    <span className={`px-1.5 py-0.5 border rounded text-[11px] font-medium ${
                      selectedEvent.severity === 'critical'
                        ? 'bg-red-500/10 border-red-500/20 text-red-700 dark:text-red-400'
                        : selectedEvent.severity === 'high'
                        ? 'bg-amber-500/10 border-amber-500/20 text-amber-700 dark:text-amber-400'
                        : 'bg-slate-500/10 border-slate-500/20 text-slate-500'
                    }`}>
                      {selectedEvent.severity.toUpperCase()}
                    </span>
                  </div>
                </div>
                <button onClick={() => setSelectedEvent(null)} className="text-secondary hover:text-white transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                {selectedEvent.status !== 'completed' && (
                  <div className="bg-slate-50 dark:bg-zinc-900/25 border border-border rounded-xl p-4">
                    <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Countdown</span>
                    <div className="mt-2 flex items-baseline gap-2">
                      <p className="text-2xl font-semibold text-primary">{getCountdown(selectedEvent.day)}</p>
                      <span className="text-xs text-secondary">until deadline</span>
                    </div>
                  </div>
                )}
                <div className="space-y-3">
                  <div>
                    <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Assigned To</span>
                    <p className="text-sm text-primary mt-1">{selectedEvent.assignedTo}</p>
                  </div>
                  <div className="border-t border-border dark:border-slate-700/20 pt-3">
                    <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Date & Time</span>
                    <p className="text-sm text-primary mt-1">{shortMonth} {selectedEvent.day}, {currentYear} · {selectedEvent.time}</p>
                  </div>
                  <div className="border-t border-border dark:border-slate-700/20 pt-3">
                    <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Notes</span>
                    <p className="text-[13px] text-secondary leading-relaxed mt-1">{selectedEvent.notes}</p>
                  </div>
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
                </div>
                <div className="flex gap-2 pt-3 border-t border-border dark:border-slate-700/20">
                  <button
                    onClick={() => { setSelectedEvent(null); navigate(selectedEvent.linkedModule); }}
                    className="flex-1 px-3 py-2 text-xs font-medium text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/10 rounded-lg transition-colors"
                  >
                    Open Module
                  </button>
                  <button className="flex-1 px-3 py-2 text-xs font-medium text-secondary border border-border hover:bg-slate-100 dark:hover:bg-zinc-800/20 rounded-lg transition-colors">
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

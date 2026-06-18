import React, { useState, useEffect } from 'react';
import { LayoutDashboard, FolderOpen, FileText, Clock, UserCheck, Calendar, FileCheck, CheckCircle, CheckCircle2, TrendingUp, AlertTriangle, DollarSign, Eye, Activity, XCircle, Settings, Bell, Search, ChevronRight, Shield, X, Menu, ChevronLeft, LogOut, Plus, Video, Phone, MapPin, Edit, Trash2, Users, AlertCircle, ChevronDown, User, Circle, HelpCircle, BookOpen, ExternalLink, Download, Mail, Printer, Filter, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import DashboardLayout from '../layouts/DashboardLayout';
import { biNavigation, biProfile, biNotifications } from '../config/biConfig';

// Helper function for confirmation status badges
const getConfirmationBadge = (status) => {
  switch (status) {
    case 'confirmed':
      return <span className="px-2.5 py-1 bg-green-500/10 text-green-400 rounded-lg text-xs font-medium flex items-center gap-1.5"><CheckCircle2 className="w-3 h-3" />Confirmed</span>;
    case 'pending':
      return <span className="px-2.5 py-1 bg-amber-500/10 text-amber-700 rounded-lg text-xs font-medium flex items-center gap-1.5"><Clock className="w-3 h-3" />Pending Confirmation</span>;
    case 'scheduled':
      return <span className="px-2.5 py-1 bg-blue-500/10 text-blue-400 rounded-lg text-xs font-medium flex items-center gap-1.5"><Calendar className="w-3 h-3" />Scheduled</span>;
    case 'completed':
      return <span className="px-2.5 py-1 bg-green-500/10 text-green-400 rounded-lg text-xs font-medium flex items-center gap-1.5"><CheckCircle2 className="w-3 h-3" />Completed</span>;
    case 'cancelled':
      return <span className="px-2.5 py-1 bg-red-500/10 text-red-400 rounded-lg text-xs font-medium flex items-center gap-1.5"><XCircle className="w-3 h-3" />Cancelled</span>;
    default:
      return <span className="px-2.5 py-1 bg-slate-500/10 text-secondary rounded-lg text-xs font-medium">{status}</span>;
  }
};

// Helper function for interview type icon
const getInterviewTypeIcon = (method) => {
  switch (method) {
    case 'In-Person':
      return <MapPin className="w-4 h-4 text-blue-400" />;
    case 'Video':
      return <Video className="w-4 h-4 text-purple-400" />;
    case 'Phone':
      return <Phone className="w-4 h-4 text-green-400" />;
    default:
      return <Calendar className="w-4 h-4 text-secondary" />;
  }
};

export default function InterviewScheduling() {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState('interview-scheduling');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [logoutConfirmOpen, setLogoutConfirmOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [selectedView, setSelectedView] = useState('upcoming');
  const [resourcesOpen, setResourcesOpen] = useState(false);

  // Current date/time and investigator context
  const currentDateTime = {
    date: 'Monday, January 27, 2025',
    time: '9:15 AM EST',
    weekRange: 'January 27 - February 2, 2025'
  };

  const investigatorInfo = {
    name: 'Agent Brooks',
    badge: 'BI-107',
    activeCases: 8,
    interviewsThisWeek: 4,
    pendingScheduling: 6,
    avgInterviewsPerWeek: '5-7'
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuOpen && !event.target.closest('.profile-menu-container')) {
        setProfileMenuOpen(false);
      }
      if (notificationsOpen && !event.target.closest('.notifications-container')) {
        setNotificationsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [profileMenuOpen, notificationsOpen]);

  const navigation = [
    { id: 'bi-dashboard', label: 'BI Dashboard', icon: LayoutDashboard, page: 'BackgroundsDashboard' },
    { id: 'active-cases', label: 'Active Cases', icon: FolderOpen, page: 'ActiveCases' },
    { id: 'case-management', label: 'Case Management', icon: FileText, page: 'CaseManagement' },
    { id: 'investigation-timeline', label: 'Investigation Timeline', icon: Clock, page: 'InvestigationTimeline' },
    { id: 'subject-records', label: 'Subject Records', icon: UserCheck, page: 'SubjectRecords' },
    { id: 'interview-scheduling', label: 'Interview Scheduling', icon: Calendar },
    { id: 'evidence-tracking', label: 'Evidence Tracking', icon: FileCheck, page: 'EvidenceTracking' },
    { id: 'reference-checks', label: 'Reference Checks', icon: CheckCircle, page: 'ReferenceChecks' },
    { id: 'employment-verification', label: 'Employment Verification', icon: TrendingUp, page: 'EmploymentVerification' },
    { id: 'criminal-history', label: 'Criminal History Review', icon: AlertTriangle, page: 'CriminalHistoryReview' },
    { id: 'financial-background', label: 'Financial Background', icon: DollarSign, page: 'FinancialBackground' },
    { id: 'social-media', label: 'Social Media Analysis', icon: Eye, page: 'SocialMediaAnalysis' },
    { id: 'bi-reports', label: 'BI Reports', icon: Activity, page: 'BIReports' },
    { id: 'case-closure', label: 'Case Closure', icon: XCircle, page: 'CaseClosure' }
  ];

  // Comprehensive upcoming interviews data
  const upcomingInterviews = [
    {
      id: 1,
      subject: 'James Wilson',
      applicantFor: 'Deputy Sheriff',
      caseId: 'BI-2025-0141',
      type: 'Follow-up Interview',
      typeDetail: 'Employment Gap Clarification',
      date: 'Monday, January 27, 2025',
      dateShort: 'Today',
      time: '3:30 PM EST',
      duration: '45 minutes',
      location: 'Virtual Meeting (Zoom)',
      meetingLink: 'https://zoom.us/j/123456789',
      meetingId: '123-456-789',
      method: 'Video',
      investigator: 'Agent Brooks',
      investigatorBadge: 'BI-107',
      confirmationStatus: 'confirmed',
      confirmedDate: 'January 24, 2025 at 2:15 PM',
      confirmedMethod: 'via email',
      calendarInviteSent: true,
      contactEmail: 'james.wilson@email.com',
      contactPhone: '(555) 123-4567',
      purpose: [
        'Clarify employment gap from 2019-2020',
        'Previous employer verification pending',
        'Need documentation of gap period activities'
      ],
      preparationNotes: [
        'Review employment application (2019-2020 gap)',
        'Prepare questions about gap period',
        'Request documentation (W-2s, tax returns if available)'
      ],
      documentsToReview: [
        'Employment application',
        'Previous interview notes (January 5, 2025)',
        'Employment history timeline'
      ]
    },
    {
      id: 2,
      subject: 'Sarah Chen',
      referenceFor: 'David Martinez (Applicant)',
      caseId: 'BI-2025-0143',
      type: 'Reference Check',
      typeDetail: 'Previous Supervisor',
      date: 'Tuesday, January 28, 2025',
      dateShort: 'Tomorrow',
      time: '10:00 AM EST',
      duration: '30 minutes',
      location: 'Phone Call',
      method: 'Phone',
      referencePhone: '(404) 555-0102',
      investigator: 'Agent Brooks',
      investigatorBadge: 'BI-107',
      confirmationStatus: 'pending',
      contactAttempts: [
        { date: 'January 20, 2025', method: 'Phone', result: 'Left voicemail' },
        { date: 'January 22, 2025', method: 'Phone', result: 'Left voicemail' }
      ],
      lastAttempt: 'January 22, 2025 at 3:00 PM',
      nextAction: 'Follow up January 27 if no response',
      referenceInfo: {
        name: 'Sarah Chen',
        title: 'Captain, Patrol Division',
        agency: 'Metro Atlanta Police Department',
        relationship: 'Previous supervisor (2018-2022)',
        yearsKnown: '4 years'
      },
      purpose: [
        'Reference check for David Martinez (BI-2025-0143)',
        'Former supervisor reference (2018-2022 employment)',
        'Verify employment, performance, disciplinary history'
      ],
      notes: 'May have limited availability (command duties). Now Captain at Metro PD.'
    },
    {
      id: 3,
      subject: 'Maria Rodriguez',
      employerFor: 'Robert Martinez (Applicant)',
      caseId: 'BI-2025-0142',
      type: 'Employment Verification',
      typeDetail: 'Current Employer HR',
      date: 'Wednesday, January 29, 2025',
      dateShort: 'Jan 29',
      time: '11:00 AM EST',
      duration: '20 minutes',
      location: 'Phone Call',
      method: 'Phone',
      employerPhone: '(770) 555-8900',
      investigator: 'Agent Thompson',
      investigatorBadge: 'BI-108',
      confirmationStatus: 'confirmed',
      confirmedDate: 'January 25, 2025 at 9:00 AM',
      confirmedMethod: 'via phone',
      employerInfo: {
        contact: 'Maria Rodriguez (HR Director)',
        company: 'ABC Security Company',
        employmentDates: '2023-Present',
        position: 'Security Supervisor'
      },
      purpose: [
        'Verify current employment dates (2023-Present)',
        'Verify position title (Security Supervisor)',
        'Verify salary ($52,000/year per application)',
        'Confirm eligible for rehire',
        'Check disciplinary history'
      ],
      documentsNeeded: [
        'Employment verification form (to be completed by HR)',
        'Applicant signed release (on file)'
      ],
      notes: 'HR may need to verify with direct supervisor.'
    },
    {
      id: 4,
      subject: 'Michael Thompson',
      applicantFor: 'Detention Officer',
      caseId: 'BI-2025-0147',
      type: 'Subject Interview',
      typeDetail: 'Initial Background Interview',
      date: 'Thursday, January 30, 2025',
      dateShort: 'Jan 30',
      time: '2:00 PM EST',
      duration: '60 minutes',
      location: 'Conference Room B',
      method: 'In-Person',
      investigator: 'Agent Brooks',
      investigatorBadge: 'BI-107',
      confirmationStatus: 'confirmed',
      confirmedDate: 'January 23, 2025 at 4:00 PM',
      confirmedMethod: 'via phone',
      contactEmail: 'm.thompson@email.com',
      contactPhone: '(678) 555-0198',
      purpose: [
        'Initial subject interview (background investigation)',
        'Review application for accuracy',
        'Discuss employment, criminal, financial history',
        'Explain background process and timeline'
      ],
      preparationNotes: [
        'Review application packet',
        'Prepare standard interview questions',
        'Print interview guide',
        'Reserve conference room'
      ],
      documentsToReview: [
        'Employment application',
        'Personal history statement',
        'Signed releases'
      ]
    }
  ];

  // Comprehensive completed interviews data
  const completedInterviews = [
    {
      id: 5,
      subject: 'Sgt. John Davis',
      referenceFor: 'Robert Martinez (Applicant)',
      caseId: 'BI-2025-0142',
      type: 'Reference Check',
      typeDetail: 'Current Supervisor',
      scheduledDate: 'January 23, 2025 at 10:00 AM EST',
      completedDate: 'January 23, 2025 at 10:22 AM EST',
      duration: '22 minutes (scheduled: 30 minutes)',
      location: 'Phone Call',
      method: 'Phone',
      investigator: 'Agent Brooks',
      investigatorBadge: 'BI-107',
      referenceInfo: {
        name: 'Sgt. John Davis',
        title: 'Patrol Sergeant',
        agency: 'Metro Atlanta Police Department',
        relationship: 'Current supervisor (3 years)',
        phone: '(404) 555-0101'
      },
      outcome: 'POSITIVE REFERENCE',
      recommendsHiring: true,
      performanceRating: 'Above average (top 25%)',
      disciplinaryHistory: 'None',
      bradyGiglio: 'No concerns identified',
      summary: 'Excellent judgment under pressure, outstanding report writing, strong community engagement. Could be more proactive with self-initiated activity. No disciplinary issues. Recommends highly for deputy position.',
      topicsCovered: [
        'Employment dates and position',
        'Performance evaluation',
        'Disciplinary history',
        'Work ethic and reliability',
        'Recommendation for hire'
      ],
      documentsGenerated: [
        'Reference interview notes (4 pages)',
        'Reference check form (completed)'
      ],
      followUpActions: [
        { action: 'Interview notes saved to case file', completed: true },
        { action: 'Reference marked as completed', completed: true },
        { action: 'Positive reference logged', completed: true }
      ]
    },
    {
      id: 6,
      subject: 'Robert Martinez',
      applicantFor: 'Deputy Sheriff',
      caseId: 'BI-2025-0142',
      type: 'Subject Interview',
      typeDetail: 'Initial Background Interview',
      scheduledDate: 'January 18, 2025 at 2:00 PM EST',
      completedDate: 'January 18, 2025 at 2:45 PM EST',
      duration: '45 minutes (scheduled: 60 minutes)',
      location: 'Background Investigations Office, Room 201',
      method: 'In-Person',
      investigator: 'Agent Brooks',
      investigatorBadge: 'BI-107',
      outcome: 'NO CONCERNS IDENTIFIED',
      applicantCooperative: true,
      answeredDirectly: true,
      noEvasiveness: true,
      voluntaryDisclosure: 'Disclosed prior traffic citation without prompting',
      summary: 'Applicant appeared professional and cooperative. Answered all questions directly without evasiveness. Disclosed 2022 traffic citation before being asked. Discussed employment history, explained career progression. No red flags identified. Ready to proceed with background investigation.',
      topicsCovered: [
        'Employment history (last 10 years)',
        'Criminal history disclosure',
        'Financial responsibility',
        'Reference contacts',
        'Background process explanation'
      ],
      documentsGenerated: [
        'Subject interview notes (6 pages)',
        'Application review checklist (completed)',
        'Investigator observations (documented)'
      ],
      followUpActions: [
        { action: 'Interview notes saved to case file', completed: true },
        { action: 'Application marked as reviewed', completed: true },
        { action: 'Ready to proceed to reference checks', completed: true },
        { action: 'Criminal history checks initiated', completed: true }
      ]
    }
  ];

  // Get pending confirmation interviews
  const pendingConfirmation = upcomingInterviews.filter(i => i.confirmationStatus === 'pending');

  const notifications = [
    { id: 1, title: 'Interview Today', message: 'James Wilson - Follow-up at 3:30 PM (Zoom)', time: '30 min ago', urgent: true },
    { id: 2, title: 'Confirmation Pending', message: 'Sarah Chen reference check - 2 contact attempts made', time: '2 hours ago', urgent: true },
    { id: 3, title: 'Interview Confirmed', message: 'Michael Thompson - Thursday at 2:00 PM confirmed', time: '4 hours ago', urgent: false },
    { id: 4, title: 'Completed Interview', message: 'Sgt. John Davis reference check notes saved', time: 'Yesterday', urgent: false }
  ];

  const handleNavigation = (item) => {
    if (item.page) {
      navigate(createPageUrl(item.page));
    } else {
      setActivePage(item.id);
      setSidebarOpen(false);
    }
  };

  const handleLogout = () => {
    navigate(createPageUrl('SignIn'));
  };

  return (
    <DashboardLayout
      navigation={biNavigation}
      profile={biProfile}
      notifications={biNotifications}
      settingsRoute="/bi/settings"
    >
      <div className="p-5 lg:p-8 space-y-8 min-h-full">
          <div className="max-w-7xl mx-auto">
            {/* Page Header with Date/Time Context */}
            <div className="mb-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
                <div>
                  <h2 className="text-2xl lg:text-3xl font-bold text-primary mb-2">Interview Scheduling</h2>
                  <p className="text-secondary">Schedule, track, and manage subject interviews, reference checks, and employment verifications</p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <button className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-medium transition-colors">
                    <Plus className="w-4 h-4" />
                    Schedule Interview
                  </button>
                  <button className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-zinc-900/40 hover:bg-slate-100 dark:hover:bg-zinc-900/60 border border-slate-700/50 text-secondary rounded-xl text-sm font-medium transition-colors">
                    <Calendar className="w-4 h-4" />
                    View Calendar
                  </button>
                  <button className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-zinc-900/40 hover:bg-slate-100 dark:hover:bg-zinc-900/60 border border-slate-700/50 text-secondary rounded-xl text-sm font-medium transition-colors">
                    <Printer className="w-4 h-4" />
                    Print Schedule
                  </button>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-sm text-secondary">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-slate-500" />
                  <span>{currentDateTime.date} at {currentDateTime.time}</span>
                </div>
                <span className="text-slate-700">•</span>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-slate-500" />
                  <span>Active investigator: <span className="text-secondary">{investigatorInfo.name}</span> (Badge #{investigatorInfo.badge})</span>
                </div>
                <span className="text-slate-700">•</span>
                <span>Caseload: <span className="text-amber-700">{investigatorInfo.activeCases} active cases</span></span>
              </div>
            </div>

            {/* Scheduling Overview */}
            <div className="mb-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* This Week's Schedule */}
              <div className="lg:col-span-2 bg-white dark:bg-zinc-900/40 border border-border rounded-xl shadow-sm dark:shadow-none p-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-amber-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-6 h-6 text-amber-700" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-base font-semibold text-primary mb-3">Scheduling Overview</h4>
                    <p className="text-xs text-slate-500 mb-4">Week of {currentDateTime.weekRange}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Upcoming This Week */}
                      <div>
                        <h5 className="text-sm font-medium text-secondary mb-2">Upcoming This Week</h5>
                        <div className="space-y-1 text-sm">
                          <div className="flex items-center justify-between text-secondary">
                            <span>Total scheduled:</span>
                            <span className="text-primary font-medium">{upcomingInterviews.length} interviews</span>
                          </div>
                          <div className="flex items-center justify-between text-secondary">
                            <span>Today (Jan 27):</span>
                            <span className="text-amber-700 font-medium">1 interview at 3:30 PM</span>
                          </div>
                          <div className="flex items-center justify-between text-secondary">
                            <span>Tomorrow (Jan 28):</span>
                            <span className="text-primary">1 interview</span>
                          </div>
                          <div className="flex items-center justify-between text-secondary">
                            <span>Remaining (Jan 29-30):</span>
                            <span className="text-primary">2 interviews</span>
                          </div>
                        </div>
                      </div>

                      {/* Requiring Action */}
                      <div>
                        <h5 className="text-sm font-medium text-secondary mb-2">Requiring Action</h5>
                        {pendingConfirmation.length > 0 ? (
                          <div className="space-y-2">
                            {pendingConfirmation.map((interview, idx) => (
                              <div key={idx} className="p-2 bg-amber-500/10 rounded-lg border border-amber-500/20">
                                <div className="flex items-center gap-2 text-amber-700 text-sm font-medium mb-1">
                                  <AlertCircle className="w-3.5 h-3.5" />
                                  Pending confirmation
                                </div>
                                <p className="text-xs text-secondary">{interview.subject} - {interview.type}</p>
                                <p className="text-xs text-slate-500">{interview.contactAttempts?.length || 0} contact attempts made</p>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-sm text-green-400">All interviews confirmed</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Investigator Workload */}
              <div className="bg-white dark:bg-zinc-900/40 border border-border rounded-xl shadow-sm dark:shadow-none p-5">
                <h4 className="text-sm font-semibold text-primary mb-4 flex items-center gap-2">
                  <Users className="w-4 h-4 text-amber-700" />
                  Investigator Workload
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-secondary">Active cases:</span>
                    <span className="text-primary font-medium">{investigatorInfo.activeCases}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-secondary">Interviews this week:</span>
                    <span className="text-primary font-medium">{investigatorInfo.interviewsThisWeek}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-secondary">Pending scheduling:</span>
                    <span className="text-primary font-medium">{investigatorInfo.pendingScheduling}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-secondary">Avg per week:</span>
                    <span className="text-primary font-medium">{investigatorInfo.avgInterviewsPerWeek}</span>
                  </div>
                  <div className="pt-2 border-t border-border">
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-green-400" />
                      <span className="text-green-400">Within normal range</span>
                    </div>
                  </div>
                </div>

                {/* Recently Completed */}
                <div className="mt-4 pt-4 border-t border-border">
                  <h5 className="text-xs font-medium text-secondary uppercase mb-2">Recently Completed</h5>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
                      <span className="text-secondary truncate">Sgt. John Davis - Reference (Jan 23)</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
                      <span className="text-secondary truncate">Robert Martinez - Subject (Jan 18)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Status Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              {/* Upcoming Interviews */}
              <div className="bg-white dark:bg-zinc-900/40 border border-border rounded-xl shadow-sm dark:shadow-none p-5">
                <div className="flex items-center justify-between mb-3">
                  <Calendar className="w-8 h-8 text-blue-400" />
                  <span className="text-2xl font-bold text-primary">{upcomingInterviews.length}</span>
                </div>
                <p className="text-sm font-medium text-primary mb-1">Upcoming Interviews</p>
                <p className="text-xs text-slate-500 mb-3">Next 7 days</p>
                <div className="space-y-1 text-xs text-secondary">
                  <div className="flex justify-between">
                    <span>Today:</span>
                    <span className="text-amber-700">1 interview</span>
                  </div>
                  <div className="flex justify-between">
                    <span>This week:</span>
                    <span>3 remaining</span>
                  </div>
                </div>
              </div>

              {/* Today's Interviews */}
              <div className="bg-white dark:bg-zinc-900/40 border border-border rounded-xl shadow-sm dark:shadow-none p-5">
                <div className="flex items-center justify-between mb-3">
                  <Clock className="w-8 h-8 text-green-400" />
                  <span className="text-2xl font-bold text-primary">1</span>
                </div>
                <p className="text-sm font-medium text-primary mb-1">Today's Interviews</p>
                <p className="text-xs text-slate-500 mb-3">January 27, 2025</p>
                <div className="p-2 bg-green-500/10 rounded-lg border border-green-500/20">
                  <p className="text-xs text-green-400 font-medium">3:30 PM - James Wilson</p>
                  <p className="text-xs text-slate-500">Follow-up Interview (Zoom)</p>
                </div>
              </div>

              {/* Pending Confirmation */}
              <div className="bg-white dark:bg-zinc-900/40 border border-amber-500/30 rounded-xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <AlertCircle className="w-8 h-8 text-amber-700" />
                  <span className="text-2xl font-bold text-amber-700">{pendingConfirmation.length}</span>
                </div>
                <p className="text-sm font-medium text-primary mb-1">Pending Confirmation</p>
                <p className="text-xs text-slate-500 mb-3">Awaiting response</p>
                {pendingConfirmation.length > 0 && (
                  <div className="p-2 bg-amber-500/10 rounded-lg border border-amber-500/20">
                    <p className="text-xs text-amber-700 font-medium">{pendingConfirmation[0].subject}</p>
                    <p className="text-xs text-slate-500">{pendingConfirmation[0].contactAttempts?.length || 0} contact attempts</p>
                  </div>
                )}
              </div>

              {/* Completed This Month */}
              <div className="bg-white dark:bg-zinc-900/40 border border-border rounded-xl shadow-sm dark:shadow-none p-5">
                <div className="flex items-center justify-between mb-3">
                  <CheckCircle className="w-8 h-8 text-green-400" />
                  <span className="text-2xl font-bold text-primary">{completedInterviews.length}</span>
                </div>
                <p className="text-sm font-medium text-primary mb-1">Completed This Month</p>
                <p className="text-xs text-slate-500 mb-3">January 2025</p>
                <div className="space-y-1 text-xs text-secondary">
                  <div className="flex justify-between">
                    <span>Subject interviews:</span>
                    <span>1</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Reference checks:</span>
                    <span>1</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white dark:bg-zinc-900/40 border border-border rounded-xl shadow-sm dark:shadow-none p-4 mb-6">
              <h4 className="text-sm font-semibold text-primary mb-3">Quick Actions</h4>
              <div className="flex flex-wrap gap-3">
                <button className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-sm font-medium transition-colors">
                  <Plus className="w-4 h-4" />
                  Schedule New Interview
                </button>
                <button className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-zinc-800/50 hover:bg-slate-700 border border-slate-600/50 text-secondary rounded-xl text-sm font-medium transition-colors">
                  <Phone className="w-4 h-4" />
                  Confirm Pending
                </button>
                <button className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-zinc-800/50 hover:bg-slate-700 border border-slate-600/50 text-secondary rounded-xl text-sm font-medium transition-colors">
                  <CheckCircle className="w-4 h-4" />
                  Mark Complete
                </button>
                <button className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-zinc-800/50 hover:bg-slate-700 border border-slate-600/50 text-secondary rounded-xl text-sm font-medium transition-colors">
                  <Download className="w-4 h-4" />
                  Export Schedule
                </button>
                <button className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-zinc-800/50 hover:bg-slate-700 border border-slate-600/50 text-secondary rounded-xl text-sm font-medium transition-colors">
                  <Bell className="w-4 h-4" />
                  Set Reminder
                </button>
              </div>
            </div>

            {/* View Tabs */}
            <div className="bg-white dark:bg-zinc-900/40 border border-border rounded-xl overflow-hidden mb-6">
              <div className="flex border-b border-border overflow-x-auto">
                <button
                  onClick={() => setSelectedView('upcoming')}
                  className={`px-6 py-4 text-sm font-medium transition-all whitespace-nowrap ${selectedView === 'upcoming' ? 'bg-amber-500/10 text-amber-700 border-b-2 border-amber-500' : 'text-secondary hover:text-slate-900 dark:hover:text-white'}`}
                >
                  Upcoming ({upcomingInterviews.length})
                </button>
                <button
                  onClick={() => setSelectedView('pending')}
                  className={`px-6 py-4 text-sm font-medium transition-all whitespace-nowrap ${selectedView === 'pending' ? 'bg-amber-500/10 text-amber-700 border-b-2 border-amber-500' : 'text-secondary hover:text-slate-900 dark:hover:text-white'}`}
                >
                  Pending Confirmation ({pendingConfirmation.length})
                </button>
                <button
                  onClick={() => setSelectedView('completed')}
                  className={`px-6 py-4 text-sm font-medium transition-all whitespace-nowrap ${selectedView === 'completed' ? 'bg-amber-500/10 text-amber-700 border-b-2 border-amber-500' : 'text-secondary hover:text-slate-900 dark:hover:text-white'}`}
                >
                  Completed ({completedInterviews.length})
                </button>
                <button
                  onClick={() => setSelectedView('all')}
                  className={`px-6 py-4 text-sm font-medium transition-all whitespace-nowrap ${selectedView === 'all' ? 'bg-amber-500/10 text-amber-700 border-b-2 border-amber-500' : 'text-secondary hover:text-slate-900 dark:hover:text-white'}`}
                >
                  All Interviews ({upcomingInterviews.length + completedInterviews.length})
                </button>
              </div>
            </div>

            {/* Upcoming Interviews */}
            {selectedView === 'upcoming' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-secondary">Upcoming Interviews (Next 7 Days)</h3>
                  <div className="flex items-center gap-2">
                    <button className="flex items-center gap-1 px-3 py-1.5 bg-white dark:bg-zinc-800/50 hover:bg-slate-700 border border-slate-600/50 rounded-lg text-xs text-secondary">
                      <Filter className="w-3 h-3" />
                      Filter
                    </button>
                  </div>
                </div>

                {upcomingInterviews.map((interview) => (
                  <div key={interview.id} className={`bg-white dark:bg-zinc-900/40 border rounded-xl p-5 ${interview.confirmationStatus === 'pending' ? 'border-amber-500/30' : 'border-slate-700/50'}`}>
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="text-lg font-semibold text-primary">{interview.subject}</h3>
                          {interview.dateShort === 'Today' && (
                            <span className="px-2 py-0.5 bg-amber-500/20 text-amber-700 rounded text-xs font-bold">TODAY</span>
                          )}
                        </div>
                        <p className="text-sm text-amber-700 mb-1">Case: {interview.caseId}</p>
                        <p className="text-sm text-secondary">{interview.type} — {interview.typeDetail}</p>
                        {interview.applicantFor && (
                          <p className="text-xs text-slate-500 mt-1">Position: {interview.applicantFor}</p>
                        )}
                        {interview.referenceFor && (
                          <p className="text-xs text-slate-500 mt-1">Reference for: {interview.referenceFor}</p>
                        )}
                        {interview.employerFor && (
                          <p className="text-xs text-slate-500 mt-1">Verification for: {interview.employerFor}</p>
                        )}
                      </div>
                      {getConfirmationBadge(interview.confirmationStatus)}
                    </div>

                    {/* Schedule Details */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 p-3 bg-white dark:bg-zinc-950/40 rounded-lg">
                      <div>
                        <p className="text-xs text-slate-500 mb-1">Date</p>
                        <p className="text-sm text-primary flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-slate-500" />
                          {interview.dateShort}
                        </p>
                        <p className="text-xs text-slate-500">{interview.date}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 mb-1">Time</p>
                        <p className="text-sm text-primary flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-slate-500" />
                          {interview.time}
                        </p>
                        <p className="text-xs text-slate-500">{interview.duration}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 mb-1">Location</p>
                        <p className="text-sm text-primary flex items-center gap-1">
                          {getInterviewTypeIcon(interview.method)}
                          {interview.location}
                        </p>
                        {interview.meetingLink && (
                          <p className="text-xs text-blue-400 truncate">Meeting ID: {interview.meetingId}</p>
                        )}
                        {interview.referencePhone && (
                          <p className="text-xs text-slate-500">{interview.referencePhone}</p>
                        )}
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 mb-1">Investigator</p>
                        <p className="text-sm text-primary">{interview.investigator}</p>
                        <p className="text-xs text-slate-500">Badge #{interview.investigatorBadge}</p>
                      </div>
                    </div>

                    {/* Confirmation Status Details */}
                    {interview.confirmationStatus === 'confirmed' && (
                      <div className="mb-4 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                        <div className="flex items-center gap-2 text-green-400 text-sm font-medium mb-1">
                          <CheckCircle2 className="w-4 h-4" />
                          Confirmed
                        </div>
                        <p className="text-xs text-secondary">Confirmed: {interview.confirmedDate} ({interview.confirmedMethod})</p>
                        {interview.calendarInviteSent && (
                          <p className="text-xs text-slate-500">Calendar invite sent</p>
                        )}
                      </div>
                    )}

                    {interview.confirmationStatus === 'pending' && interview.contactAttempts && (
                      <div className="mb-4 p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                        <div className="flex items-center gap-2 text-amber-700 text-sm font-medium mb-2">
                          <AlertCircle className="w-4 h-4" />
                          Pending Confirmation — Action Required
                        </div>
                        <div className="space-y-1 text-xs text-secondary mb-2">
                          <p>Contact attempts: {interview.contactAttempts.length}</p>
                          {interview.contactAttempts.map((attempt, idx) => (
                            <p key={idx} className="pl-3">• {attempt.date}: {attempt.result}</p>
                          ))}
                        </div>
                        <p className="text-xs text-amber-300 font-medium">Next action: {interview.nextAction}</p>
                      </div>
                    )}

                    {/* Interview Purpose */}
                    {interview.purpose && (
                      <div className="mb-4">
                        <p className="text-xs text-slate-500 mb-2 font-medium">Interview Purpose</p>
                        <ul className="space-y-1">
                          {interview.purpose.map((item, idx) => (
                            <li key={idx} className="text-sm text-secondary flex items-start gap-2">
                              <span className="text-slate-700 mt-1">•</span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Preparation Notes */}
                    {interview.preparationNotes && (
                      <div className="mb-4 p-3 bg-white dark:bg-zinc-950/40 rounded-lg">
                        <p className="text-xs text-slate-500 mb-2 font-medium">Preparation Notes</p>
                        <ul className="space-y-1">
                          {interview.preparationNotes.map((note, idx) => (
                            <li key={idx} className="text-sm text-secondary flex items-start gap-2">
                              <Circle className="w-2 h-2 text-slate-700 mt-1.5 flex-shrink-0" />
                              {note}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Reference/Employer Info */}
                    {interview.referenceInfo && (
                      <div className="mb-4 p-3 bg-white dark:bg-zinc-950/40 rounded-lg">
                        <p className="text-xs text-slate-500 mb-2 font-medium">Reference Information</p>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <span className="text-slate-500">Name:</span>
                            <span className="text-secondary ml-2">{interview.referenceInfo.name}</span>
                          </div>
                          <div>
                            <span className="text-slate-500">Title:</span>
                            <span className="text-secondary ml-2">{interview.referenceInfo.title}</span>
                          </div>
                          <div>
                            <span className="text-slate-500">Agency:</span>
                            <span className="text-secondary ml-2">{interview.referenceInfo.agency}</span>
                          </div>
                          <div>
                            <span className="text-slate-500">Years Known:</span>
                            <span className="text-secondary ml-2">{interview.referenceInfo.yearsKnown}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex items-center justify-between pt-4 border-t border-border dark:border-slate-700/30">
                      <div className="flex items-center gap-4 text-xs text-slate-500">
                        {interview.contactEmail && (
                          <span className="flex items-center gap-1">
                            <Mail className="w-3.5 h-3.5" />
                            {interview.contactEmail}
                          </span>
                        )}
                        {interview.contactPhone && (
                          <span className="flex items-center gap-1">
                            <Phone className="w-3.5 h-3.5" />
                            {interview.contactPhone}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="p-2 bg-white dark:bg-zinc-800/50 hover:bg-slate-700 rounded-lg transition-colors" title="Edit">
                          <Edit className="w-4 h-4 text-secondary" />
                        </button>
                        <button className="p-2 bg-white dark:bg-zinc-800/50 hover:bg-slate-700 rounded-lg transition-colors" title="Cancel">
                          <Trash2 className="w-4 h-4 text-secondary" />
                        </button>
                        {interview.confirmationStatus === 'pending' && (
                          <button className="px-3 py-2 bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 rounded-xl text-xs font-medium transition-colors flex items-center gap-1">
                            <Phone className="w-3.5 h-3.5" />
                            Call Now
                          </button>
                        )}
                        <button className="px-3 py-2 bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 rounded-xl text-xs font-medium transition-colors">
                          View Case
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pending Confirmation Tab */}
            {selectedView === 'pending' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-secondary">Interviews Pending Confirmation</h3>
                </div>

                {pendingConfirmation.length === 0 ? (
                  <div className="bg-white dark:bg-zinc-900/40 border border-border rounded-xl shadow-sm dark:shadow-none p-8 text-center">
                    <CheckCircle2 className="w-12 h-12 text-green-400 mx-auto mb-3" />
                    <p className="text-secondary font-medium">All interviews confirmed!</p>
                    <p className="text-sm text-slate-500 mt-1">No pending confirmations at this time.</p>
                  </div>
                ) : (
                  pendingConfirmation.map((interview) => (
                    <div key={interview.id} className="bg-white dark:bg-zinc-900/40 border border-amber-500/30 rounded-xl p-5">
                      {/* Same structure as upcoming, but only for pending */}
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-primary mb-1">{interview.subject}</h3>
                          <p className="text-sm text-amber-700">Case: {interview.caseId} • {interview.type}</p>
                        </div>
                        {getConfirmationBadge('pending')}
                      </div>

                      <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg mb-4">
                        <div className="flex items-center gap-2 text-amber-700 text-sm font-medium mb-2">
                          <AlertCircle className="w-4 h-4" />
                          ACTION REQUIRED
                        </div>
                        <p className="text-sm text-secondary mb-2">
                          Scheduled: {interview.date} at {interview.time}
                        </p>
                        <div className="space-y-1 text-xs text-secondary mb-2">
                          <p className="font-medium">Contact Attempts:</p>
                          {interview.contactAttempts?.map((attempt, idx) => (
                            <p key={idx} className="pl-3">• {attempt.date}: {attempt.result}</p>
                          ))}
                        </div>
                        <p className="text-xs text-amber-300 font-medium mt-2">Next action: {interview.nextAction}</p>
                      </div>

                      <div className="flex items-center justify-end gap-2">
                        <button className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-sm font-medium transition-colors flex items-center gap-2">
                          <Phone className="w-4 h-4" />
                          Call Now
                        </button>
                        <button className="px-4 py-2 bg-white dark:bg-zinc-800/50 hover:bg-slate-700 text-secondary rounded-xl text-sm font-medium transition-colors flex items-center gap-2">
                          <Mail className="w-4 h-4" />
                          Send Email
                        </button>
                        <button className="px-4 py-2 bg-white dark:bg-zinc-800/50 hover:bg-slate-700 text-secondary rounded-xl text-sm font-medium transition-colors">
                          Reschedule
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Completed Interviews */}
            {selectedView === 'completed' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-secondary">Completed Interviews (January 2025)</h3>
                  <div className="flex items-center gap-2">
                    <button className="flex items-center gap-1 px-3 py-1.5 bg-white dark:bg-zinc-800/50 hover:bg-slate-700 border border-slate-600/50 rounded-lg text-xs text-secondary">
                      <Filter className="w-3 h-3" />
                      Filter
                    </button>
                    <button className="flex items-center gap-1 px-3 py-1.5 bg-white dark:bg-zinc-800/50 hover:bg-slate-700 border border-slate-600/50 rounded-lg text-xs text-secondary">
                      <Download className="w-3 h-3" />
                      Export
                    </button>
                  </div>
                </div>

                {completedInterviews.map((interview) => (
                  <div key={interview.id} className="bg-white dark:bg-zinc-900/40 border border-border rounded-xl shadow-sm dark:shadow-none p-5">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <CheckCircle2 className="w-5 h-5 text-green-400" />
                          <h3 className="text-lg font-semibold text-primary">{interview.subject}</h3>
                        </div>
                        <p className="text-sm text-amber-700">Case: {interview.caseId}</p>
                        <p className="text-sm text-secondary">{interview.type} — {interview.typeDetail}</p>
                        {interview.referenceFor && (
                          <p className="text-xs text-slate-500 mt-1">Reference for: {interview.referenceFor}</p>
                        )}
                        {interview.applicantFor && (
                          <p className="text-xs text-slate-500 mt-1">Position: {interview.applicantFor}</p>
                        )}
                      </div>
                      {getConfirmationBadge('completed')}
                    </div>

                    {/* Schedule Info */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 p-3 bg-white dark:bg-zinc-950/40 rounded-lg">
                      <div>
                        <p className="text-xs text-slate-500 mb-1">Scheduled</p>
                        <p className="text-sm text-secondary">{interview.scheduledDate}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 mb-1">Completed</p>
                        <p className="text-sm text-secondary">{interview.completedDate}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 mb-1">Duration</p>
                        <p className="text-sm text-secondary">{interview.duration}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 mb-1">Conducted By</p>
                        <p className="text-sm text-secondary">{interview.investigator}</p>
                        <p className="text-xs text-slate-500">Badge #{interview.investigatorBadge}</p>
                      </div>
                    </div>

                    {/* Interview Outcome */}
                    <div className="mb-4 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-medium text-primary">Interview Outcome:</span>
                        <span className="px-2 py-0.5 bg-green-500/20 text-green-400 rounded text-xs font-bold">
                          {interview.outcome}
                        </span>
                      </div>
                      {interview.recommendsHiring !== undefined && (
                        <div className="flex items-center gap-4 text-sm mb-2">
                          <span className="text-secondary">Recommends hiring:</span>
                          {interview.recommendsHiring ? (
                            <span className="text-green-400 font-medium flex items-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5" /> Yes (strongly)
                            </span>
                          ) : (
                            <span className="text-red-400 font-medium flex items-center gap-1">
                              <XCircle className="w-3.5 h-3.5" /> No
                            </span>
                          )}
                        </div>
                      )}
                      {interview.performanceRating && (
                        <p className="text-sm text-secondary">Performance rating: <span className="text-secondary">{interview.performanceRating}</span></p>
                      )}
                      {interview.disciplinaryHistory && (
                        <p className="text-sm text-secondary">Disciplinary history: <span className="text-green-400">{interview.disciplinaryHistory}</span></p>
                      )}
                      {interview.bradyGiglio && (
                        <p className="text-sm text-secondary">Brady/Giglio: <span className="text-green-400">{interview.bradyGiglio}</span></p>
                      )}
                    </div>

                    {/* Summary */}
                    {interview.summary && (
                      <div className="mb-4 p-3 bg-white dark:bg-zinc-950/40 rounded-lg">
                        <p className="text-xs text-slate-500 mb-2 font-medium">Interview Notes Summary</p>
                        <p className="text-sm text-secondary italic">"{interview.summary}"</p>
                      </div>
                    )}

                    {/* Topics Covered */}
                    {interview.topicsCovered && (
                      <div className="mb-4">
                        <p className="text-xs text-slate-500 mb-2 font-medium">Topics Covered</p>
                        <div className="flex flex-wrap gap-2">
                          {interview.topicsCovered.map((topic, idx) => (
                            <span key={idx} className="px-2 py-1 bg-white dark:bg-zinc-800/50 rounded-lg text-xs text-secondary flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3 text-green-400" />
                              {topic}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Documents & Follow-up */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      {interview.documentsGenerated && (
                        <div className="p-3 bg-white dark:bg-zinc-950/40 rounded-lg">
                          <p className="text-xs text-slate-500 mb-2 font-medium">Documents Generated</p>
                          <ul className="space-y-1">
                            {interview.documentsGenerated.map((doc, idx) => (
                              <li key={idx} className="text-sm text-secondary flex items-center gap-2">
                                <FileText className="w-3.5 h-3.5 text-slate-500" />
                                {doc}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {interview.followUpActions && (
                        <div className="p-3 bg-white dark:bg-zinc-950/40 rounded-lg">
                          <p className="text-xs text-slate-500 mb-2 font-medium">Follow-up Actions</p>
                          <ul className="space-y-1">
                            {interview.followUpActions.map((action, idx) => (
                              <li key={idx} className="text-sm text-secondary flex items-center gap-2">
                                {action.completed ? (
                                  <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
                                ) : (
                                  <Circle className="w-3.5 h-3.5 text-slate-500" />
                                )}
                                <span className={action.completed ? 'text-slate-500' : 'text-slate-500'}>{action.action}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-end pt-4 border-t border-border dark:border-slate-700/30 gap-2">
                      <button className="px-3 py-2 bg-white dark:bg-zinc-800/50 hover:bg-slate-700 text-secondary rounded-xl text-xs font-medium transition-colors flex items-center gap-1">
                        <FileText className="w-3.5 h-3.5" />
                        View Complete Notes
                      </button>
                      <button className="px-3 py-2 bg-white dark:bg-zinc-800/50 hover:bg-slate-700 text-secondary rounded-xl text-xs font-medium transition-colors flex items-center gap-1">
                        <Printer className="w-3.5 h-3.5" />
                        Print Report
                      </button>
                      <button className="px-3 py-2 bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 rounded-xl text-xs font-medium transition-colors">
                        View Case File
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* All Interviews Tab */}
            {selectedView === 'all' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-secondary">All Interviews</h3>
                  <div className="flex items-center gap-2">
                    <button className="flex items-center gap-1 px-3 py-1.5 bg-white dark:bg-zinc-800/50 hover:bg-slate-700 border border-slate-600/50 rounded-lg text-xs text-secondary">
                      <Filter className="w-3 h-3" />
                      Filter
                    </button>
                  </div>
                </div>

                <div className="bg-white dark:bg-zinc-900/40 border border-border rounded-xl overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-slate-50 dark:bg-zinc-950/60">
                      <tr>
                        <th className="text-left text-xs font-medium text-secondary p-4">Subject/Reference</th>
                        <th className="text-left text-xs font-medium text-secondary p-4">Case ID</th>
                        <th className="text-left text-xs font-medium text-secondary p-4">Type</th>
                        <th className="text-left text-xs font-medium text-secondary p-4">Date</th>
                        <th className="text-left text-xs font-medium text-secondary p-4">Status</th>
                        <th className="text-left text-xs font-medium text-secondary p-4">Investigator</th>
                        <th className="text-right text-xs font-medium text-secondary p-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700/30">
                      {[...upcomingInterviews, ...completedInterviews].map((interview) => (
                        <tr key={interview.id} className="hover:bg-slate-100 dark:hover:bg-zinc-900/30">
                          <td className="p-4 text-sm text-primary">{interview.subject}</td>
                          <td className="p-4 text-sm text-amber-700">{interview.caseId}</td>
                          <td className="p-4 text-sm text-secondary">{interview.type}</td>
                          <td className="p-4 text-sm text-secondary">
                            {interview.dateShort || interview.completedDate?.split(' at')[0]}
                          </td>
                          <td className="p-4">
                            {getConfirmationBadge(interview.confirmationStatus || 'completed')}
                          </td>
                          <td className="p-4 text-sm text-secondary">{interview.investigator}</td>
                          <td className="p-4 text-right">
                            <button className="px-3 py-1.5 bg-white dark:bg-zinc-800/50 hover:bg-slate-700 text-secondary rounded-lg text-xs font-medium transition-colors">
                              View
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
      </div>
    </DashboardLayout>
  );
}

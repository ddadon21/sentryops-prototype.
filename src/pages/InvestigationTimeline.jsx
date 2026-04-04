import React, { useState, useEffect } from 'react';
import { LayoutDashboard, FolderOpen, FileText, Clock, UserCheck, Calendar, FileCheck, CheckCircle, CheckCircle2, TrendingUp, AlertTriangle, DollarSign, Eye, Activity, XCircle, Settings, Bell, Search, ChevronRight, Shield, X, Menu, ChevronLeft, LogOut, Filter, ChevronDown, User, Phone, Upload, Circle, PauseCircle, HelpCircle, BookOpen, ExternalLink, Download, Mail, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import DashboardLayout from '../layouts/DashboardLayout';
import { biNavigation, biProfile, biNotifications } from '../config/biConfig';

export default function InvestigationTimeline() {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState('investigation-timeline');
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [logoutConfirmOpen, setLogoutConfirmOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [selectedCase, setSelectedCase] = useState('BI-2024-145');
  const [filterOpen, setFilterOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

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

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
  };

  const getStageIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle2 className="w-5 h-5 text-green-400" />;
      case 'in_progress': return <Clock className="w-5 h-5 text-amber-700 animate-pulse" />;
      case 'partial': return <PauseCircle className="w-5 h-5 text-blue-400" />;
      case 'blocked': return <AlertTriangle className="w-5 h-5 text-red-400" />;
      default: return <Circle className="w-5 h-5 text-slate-700" />;
    }
  };

  const navigation = [
    { id: 'bi-dashboard', label: 'BI Dashboard', icon: LayoutDashboard, page: 'BackgroundsDashboard' },
    { id: 'active-cases', label: 'Active Cases', icon: FolderOpen, page: 'ActiveCases' },
    { id: 'case-management', label: 'Case Management', icon: FileText, page: 'CaseManagement' },
    { id: 'investigation-timeline', label: 'Investigation Timeline', icon: Clock },
    { id: 'subject-records', label: 'Subject Records', icon: UserCheck, page: 'SubjectRecords' },
    { id: 'interview-scheduling', label: 'Interview Scheduling', icon: Calendar, page: 'InterviewScheduling' },
    { id: 'evidence-tracking', label: 'Evidence Tracking', icon: FileCheck, page: 'EvidenceTracking' },
    { id: 'reference-checks', label: 'Reference Checks', icon: CheckCircle, page: 'ReferenceChecks' },
    { id: 'employment-verification', label: 'Employment Verification', icon: TrendingUp, page: 'EmploymentVerification' },
    { id: 'criminal-history', label: 'Criminal History Review', icon: AlertTriangle, page: 'CriminalHistoryReview' },
    { id: 'financial-background', label: 'Financial Background', icon: DollarSign, page: 'FinancialBackground' },
    { id: 'social-media', label: 'Social Media Analysis', icon: Eye, page: 'SocialMediaAnalysis' },
    { id: 'bi-reports', label: 'BI Reports', icon: Activity, page: 'BIReports' },
    { id: 'case-closure', label: 'Case Closure', icon: XCircle, page: 'CaseClosure' }
  ];

  const cases = [
    { id: 'BI-2024-145', subject: 'Robert Martinez', position: 'Deputy Sheriff', status: 'In Progress', currentStage: 'Reference Checks' },
    { id: 'BI-2024-144', subject: 'Sarah Chen', position: 'Corrections Officer', status: 'In Progress', currentStage: 'Employment Verification' },
    { id: 'BI-2024-143', subject: 'Michael Thompson', position: 'Dispatcher', status: 'Pending Review', currentStage: 'Supervisor Review' }
  ];

  const caseData = {
    id: 'BI-2024-145',
    subject: 'Robert Martinez',
    position: 'Deputy Sheriff',
    department: 'Patrol Division',
    caseOpened: 'Jan 2, 2026',
    daysOpen: 23,
    agencyTarget: 18,
    currentStage: 'Reference Checks',
    lastActivity: 'Reference Interview Completed',
    lastActivityDate: 'Jan 23, 2026 at 9:15 AM',
    investigator: {
      name: 'Agent Brooks',
      badge: '#BI-107',
      email: 'brooks@gwinnettso.gov',
      phone: 'x5421',
      activeCases: 8
    },
    conditionalOfferExpires: 'Jan 30, 2026',
    daysRemaining: 7,
    targetCompletion: 'Jan 27, 2026',
    extendedTimelineReason: 'Reference callbacks delayed (holiday period - documented)'
  };

  const investigationStages = [
    {
      name: 'Case Opened',
      status: 'completed',
      date: 'Jan 2, 2026 at 9:30 AM',
      completedBy: 'HR Department (auto-assigned to BI Unit)',
      detail: 'Case assigned to Agent Brooks based on current workload (7 active cases at time of assignment)',
      outcome: 'Complete'
    },
    {
      name: 'Documentation Received',
      status: 'completed',
      date: 'Jan 3, 2026 at 10:00 AM',
      completedBy: 'Agent Brooks (received complete background packet)',
      detail: 'Application, releases, personal history, photo ID all verified complete',
      outcome: 'Complete'
    },
    {
      name: 'Initial Interview',
      status: 'completed',
      date: 'Jan 8, 2026 at 2:00 PM',
      completedBy: 'Agent Brooks (in-person interview at BI office)',
      detail: 'Duration: 45 minutes. Applicant cooperative, no concerns identified',
      outcome: 'Complete - No Concerns'
    },
    {
      name: 'Criminal History Check',
      status: 'completed',
      date: 'Jan 10, 2026 at 10:30 AM',
      completedBy: 'System (GCIC/FBI results received)',
      detail: 'GCIC/FBI clear - no criminal records. Traffic citation 2022 (paid, closed)',
      outcome: 'Complete - CLEAR'
    },
    {
      name: 'Reference Checks',
      status: 'in_progress',
      date: 'Started Jan 12, 2026',
      completedBy: 'Agent Brooks',
      detail: '3 of 5 references completed. Personal: 2/3 (positive), Employment: 1/2 (positive)',
      outcome: 'In Progress',
      targetCompletion: 'Jan 25, 2026',
      pendingItems: [
        'Personal ref #3 - Awaiting callback (2 attempts documented)',
        'Employment ref #2 - Awaiting callback (1 attempt documented)'
      ]
    },
    {
      name: 'Employment Verification',
      status: 'pending',
      date: 'Planned Start: Jan 26, 2026',
      completedBy: 'Agent Brooks (assigned)',
      detail: 'Awaiting reference check completion. Employers to verify: 4 (last 10 years per policy)',
      outcome: 'Pending'
    },
    {
      name: 'Financial Review',
      status: 'pending',
      date: 'Planned Start: Jan 28, 2026',
      completedBy: 'Agent Brooks (assigned)',
      detail: 'Credit authorization received. Action: Pull credit report, review for judgments',
      outcome: 'Pending'
    },
    {
      name: 'Supervisor Review',
      status: 'pending',
      date: 'Planned Start: Jan 30, 2026',
      completedBy: 'BI Supervisor (assigned)',
      detail: 'Pending - investigator must complete all stages first. Supervisor will make hiring recommendation',
      outcome: 'Pending'
    }
  ];

  const timelineEvents = [
    {
      id: 1,
      date: 'Jan 23, 2026',
      time: '9:15 AM EST',
      title: 'Reference Interview Completed',
      type: 'stage_progress',
      status: 'complete',
      actor: 'Agent Brooks (Badge #BI-107)',
      category: 'Reference Check',
      description: 'Reference: David Johnson (Current supervisor at applicant\'s employer)',
      details: [
        'Contact Method: Phone interview (770-555-0142)',
        'Duration: 18 minutes',
        'Summary: Supervisor provided positive reference. Stated applicant is reliable, punctual, and handles high-stress situations well.',
        'Confirmed applicant is eligible for rehire. No disciplinary issues.',
        'Outcome: Positive reference received (3 of 5 now complete)'
      ],
      documentation: 'Interview notes saved to case file',
      tags: ['Reference Check', 'Complete', 'Positive Outcome']
    },
    {
      id: 2,
      date: 'Jan 22, 2026',
      time: '3:00 PM EST',
      title: 'Contact Attempt Logged',
      type: 'contact_attempt',
      status: 'pending',
      actor: 'Agent Brooks',
      category: 'Reference Check',
      description: 'Contact: Sarah Williams (Personal Reference #3)',
      details: [
        'Method: Phone (left voicemail at 770-555-1234)',
        'Attempt #: 2 (previous attempt Jan 20)',
        'Message: Identified self as background investigator, explained purpose, requested callback at 770-555-0142',
        'Next Action: If no response by Jan 25, attempt supervisor-to-supervisor contact'
      ],
      tags: ['Reference Check', 'Contact Attempt', 'Pending Response']
    },
    {
      id: 3,
      date: 'Jan 21, 2026',
      time: '10:15 AM EST',
      title: 'Contact Attempt Logged',
      type: 'contact_attempt',
      status: 'pending',
      actor: 'Agent Brooks',
      category: 'Reference Check',
      description: 'Contact: Michael Chen (Personal Reference #4)',
      details: [
        'Method: Phone (left voicemail at 404-555-5678)',
        'Attempt #: 1 (first contact attempt)',
        'Next Action: Follow up Jan 24 if no response'
      ],
      tags: ['Reference Check', 'Contact Attempt', 'Pending Response']
    },
    {
      id: 4,
      date: 'Jan 18, 2026',
      time: '2:30 PM EST',
      title: 'Reference Interview Completed',
      type: 'stage_progress',
      status: 'complete',
      actor: 'Agent Brooks (Badge #BI-107)',
      category: 'Reference Check',
      description: 'Reference: Maria Garcia (Personal Reference #2)',
      details: [
        'Contact Method: Phone interview',
        'Duration: 15 minutes',
        'Summary: Knows applicant for 5 years through community volunteer work.',
        'Described applicant as honest, dependable, and community-minded.',
        'Outcome: Positive reference received (2 of 5 complete at this time)'
      ],
      tags: ['Reference Check', 'Complete', 'Positive Outcome']
    },
    {
      id: 5,
      date: 'Jan 10, 2026',
      time: '10:30 AM EST',
      title: 'Criminal History Check Complete',
      type: 'stage_complete',
      status: 'complete',
      actor: 'System (GCIC/FBI results received) - Reviewed by Agent Brooks',
      category: 'Criminal History',
      description: 'All criminal history databases cleared',
      details: [
        'GCIC Results (Georgia): Submitted Jan 3, Results Jan 5 (2-day turnaround) - CLEAR',
        'FBI Results (National): Submitted Jan 3, Results Jan 6 (3-day turnaround) - CLEAR',
        'Local Checks: Gwinnett County CLEAR, Fulton County CLEAR',
        'Traffic History: 1 speeding citation (2022) - Paid and closed',
        'Assessment: No POST disqualifying criminal history. Meets standards for deputy sheriff position.'
      ],
      tags: ['Criminal History', 'Complete', 'Clear - No Issues']
    },
    {
      id: 6,
      date: 'Jan 8, 2026',
      time: '2:00 PM EST',
      title: 'Initial Interview Completed',
      type: 'stage_complete',
      status: 'complete',
      actor: 'Agent Brooks',
      category: 'Initial Interview',
      description: 'In-person initial interview at Background Investigations Office',
      details: [
        'Duration: 45 minutes',
        'Applicant: Robert Martinez (appeared as scheduled)',
        'Topics: Application accuracy, employment history (10 years), criminal history disclosure, financial responsibility, references review',
        'Observations: Applicant cooperative, professional, forthcoming. Disclosed traffic citation without prompting.',
        'Outcome: No concerns identified during initial interview'
      ],
      tags: ['Initial Interview', 'Complete', 'No Concerns']
    },
    {
      id: 7,
      date: 'Jan 3, 2026',
      time: '10:00 AM EST',
      title: 'Application Documents Received',
      type: 'stage_complete',
      status: 'complete',
      actor: 'HR Department (forwarded to BI Unit) - Received by Agent Brooks',
      category: 'Documentation',
      description: 'Complete application package verified',
      details: [
        '✓ Completed application form (signed and dated)',
        '✓ Background investigation release forms (signed)',
        '✓ Personal history statement (10 years - complete)',
        '✓ Resume and certifications',
        '✓ Photo identification (driver\'s license copy)',
        '✓ Reference contact information (5 references provided)',
        'Completeness Check: All required documents received. Ready for investigation.'
      ],
      tags: ['Documentation', 'Complete', 'Ready for Investigation']
    },
    {
      id: 8,
      date: 'Jan 2, 2026',
      time: '9:30 AM EST',
      title: 'Case Opened',
      type: 'case_opened',
      status: 'complete',
      actor: 'HR Department (auto-created) - Assigned to Agent Brooks (Badge #BI-107)',
      category: 'Case Management',
      description: 'Background investigation case initiated',
      details: [
        'Case ID: BI-2024-145',
        'Applicant: Robert Martinez',
        'Position: Deputy Sheriff (Patrol Division)',
        'Investigation Type: Full background investigation',
        'Assignment: Agent Brooks (7 active cases at assignment - within capacity)',
        'Next Action: Awaiting complete background packet (due within 10 days)'
      ],
      tags: ['Case Management', 'Complete', 'Case Opened']
    }
  ];

  const notifications = [
    { id: 1, title: 'Reference Response', message: 'Professional reference completed form', time: '1 hour ago', urgent: false },
    { id: 2, title: 'Deadline Approaching', message: 'Employment verification due in 3 days', time: '3 hours ago', urgent: true }
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

  const getStatusColor = (status) => {
    switch (status) {
      case 'complete': return 'bg-green-500';
      case 'in-progress': return 'bg-blue-500';
      case 'pending': return 'bg-amber-500';
      default: return 'bg-slate-500';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'milestone': return <CheckCircle className="w-5 h-5" />;
      case 'action': return <Play className="w-5 h-5" />;
      case 'document': return <FileText className="w-5 h-5" />;
      default: return <Clock className="w-5 h-5" />;
    }
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
            {/* Case-Specific Page Header */}
            <div className="mb-6">
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 flex-wrap mb-2">
                    <h2 className="text-2xl lg:text-3xl font-bold text-primary">Investigation Timeline: {caseData.id}</h2>
                    <span className="px-2 py-1 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400 text-xs flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                      LIVE
                    </span>
                  </div>
                  <p className="text-lg text-primary mb-1">{caseData.subject} - {caseData.position}</p>
                  <p className="text-secondary text-sm">Chronological record of all investigation activities and milestones</p>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-sm text-secondary">
                    <span>Case opened: {caseData.caseOpened}</span>
                    <span className="hidden sm:inline">|</span>
                    <span>Days in process: <span className={caseData.daysOpen > caseData.agencyTarget ? 'text-amber-700' : 'text-primary'}>{caseData.daysOpen} days</span></span>
                    <span className="hidden sm:inline">|</span>
                    <span>Current stage: <span className="text-amber-700">{caseData.currentStage}</span></span>
                  </div>
                  <div className="mt-1 text-sm text-slate-500">
                    Last activity: {caseData.lastActivity} - {caseData.lastActivityDate}
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                  <div className="text-xs text-slate-500 hidden md:block">
                    {formatTime(currentTime)} • {formatDate(currentTime)}
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <button
                        onClick={() => setFilterOpen(!filterOpen)}
                        className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800/40 border border-border rounded-xl text-secondary hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors"
                      >
                        <Filter className="w-4 h-4" />
                        <span className="text-sm">All Activities</span>
                        <ChevronDown className="w-4 h-4" />
                      </button>
                    </div>
                    <select
                      value={selectedCase}
                      onChange={(e) => setSelectedCase(e.target.value)}
                      className="px-4 py-2 bg-white dark:bg-slate-800/40 border border-border rounded-xl text-primary focus:outline-none focus:border-amber-500/50 text-sm"
                    >
                      {cases.map(c => (
                        <option key={c.id} value={c.id}>{c.id} - {c.subject}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="mt-3 text-sm text-secondary">
                Viewing: Complete timeline ({timelineEvents.length} events)
              </div>
            </div>

            {/* Case Progress Summary (replaced Timeline Analysis) */}
            <div className="mb-6 bg-white dark:bg-slate-800/40 border border-border rounded-xl shadow-sm dark:shadow-none p-5">
              <div className="flex items-center justify-between mb-6">
                <h4 className="text-base font-semibold text-primary">Case Progress Summary</h4>
                <div className="flex items-center gap-2">
                  <button className="px-3 py-1.5 bg-white dark:bg-slate-700/50 hover:bg-slate-700 text-secondary rounded-lg text-xs font-medium transition-colors">
                    View Detailed Status
                  </button>
                  <button className="px-3 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 rounded-lg text-xs font-medium transition-colors flex items-center gap-1">
                    <Download className="w-3 h-3" />
                    Export Timeline Report
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                {/* Investigation Status */}
                <div className="bg-white dark:bg-slate-900/40 rounded-lg p-4">
                  <p className="text-xs text-slate-500 uppercase tracking-wide mb-2">Investigation Status</p>
                  <div className="flex items-center gap-2 mb-1">
                    <Clock className="w-5 h-5 text-amber-700 animate-pulse" />
                    <span className="text-lg font-semibold text-primary">{caseData.currentStage}</span>
                    <span className="text-xs text-amber-700">(In Progress)</span>
                  </div>
                  <p className="text-xs text-secondary">Days in Process: {caseData.daysOpen} days</p>
                  <p className="text-xs text-slate-500">(Agency target: &lt;{caseData.agencyTarget} days - extended)</p>
                  {caseData.extendedTimelineReason && (
                    <p className="text-xs text-amber-700 mt-1">Reason: {caseData.extendedTimelineReason}</p>
                  )}
                </div>

                {/* Stage Completion */}
                <div className="bg-white dark:bg-slate-900/40 rounded-lg p-4">
                  <p className="text-xs text-slate-500 uppercase tracking-wide mb-2">Stage Completion</p>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-green-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Completed Stages
                      </span>
                      <span className="text-primary font-medium">{investigationStages.filter(s => s.status === 'completed').length}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-amber-700 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        In Progress
                      </span>
                      <span className="text-primary font-medium">{investigationStages.filter(s => s.status === 'in_progress').length}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-secondary flex items-center gap-1">
                        <Circle className="w-3.5 h-3.5" />
                        Pending Stages
                      </span>
                      <span className="text-primary font-medium">{investigationStages.filter(s => s.status === 'pending').length}</span>
                    </div>
                  </div>
                </div>

                {/* Timeline & Deadlines */}
                <div className="bg-white dark:bg-slate-900/40 rounded-lg p-4">
                  <p className="text-xs text-slate-500 uppercase tracking-wide mb-2">Timeline & Deadlines</p>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-secondary">Target Completion</span>
                      <span className="text-primary font-medium">{caseData.targetCompletion}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-secondary">Offer Expires</span>
                      <span className="text-red-400 font-medium">{caseData.conditionalOfferExpires}</span>
                    </div>
                    <p className="text-xs text-amber-700 mt-1">{caseData.daysRemaining} days remaining</p>
                    <p className="text-xs text-green-400">Status: On track if references completed by Jan 25</p>
                  </div>
                </div>
              </div>

              {/* Current Bottleneck */}
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-700 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-amber-700">Current Bottleneck: Reference Checks</p>
                    <p className="text-xs text-secondary mt-1">Issue: 2 references not returning calls (documented 2-3 contact attempts each)</p>
                    <p className="text-xs text-secondary">Action Plan: Continue daily contact attempts, escalate to supervisor-to-supervisor contact if no response by Jan 25</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Investigation Stages (Sequential) */}
            <div className="bg-white dark:bg-slate-800/40 border border-border rounded-xl shadow-sm dark:shadow-none p-6 mb-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-primary">Investigation Stages (Sequential)</h3>
                  <p className="text-xs text-slate-500 mt-1">Case: {caseData.id} - {caseData.subject} | Investigation Type: {caseData.position} (Full Background)</p>
                </div>
              </div>

              <div className="relative">
                {/* Vertical timeline line */}
                <div className="absolute left-6 top-4 bottom-4 w-0.5 bg-white dark:bg-slate-700/50"></div>

                <div className="space-y-6">
                  {investigationStages.map((stage, idx) => (
                    <div key={idx} className={`relative pl-16 ${
                      stage.status === 'completed' ? 'opacity-100' :
                      stage.status === 'in_progress' ? 'opacity-100' :
                      'opacity-70'
                    }`}>
                      {/* Stage icon */}
                      <div className={`absolute left-3 w-7 h-7 rounded-full flex items-center justify-center z-10 ${
                        stage.status === 'completed' ? 'bg-green-500/20 border border-green-500/50' :
                        stage.status === 'in_progress' ? 'bg-amber-500/20 border border-amber-500/50' :
                        'bg-white dark:bg-slate-700/50 border border-slate-600/50'
                      }`}>
                        {getStageIcon(stage.status)}
                      </div>

                      <div className={`rounded-lg p-4 ${
                        stage.status === 'completed' ? 'bg-green-500/5 border border-green-500/20' :
                        stage.status === 'in_progress' ? 'bg-amber-500/5 border border-amber-500/20' :
                        'bg-white dark:bg-slate-900/40 border border-border'
                      }`}>
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="text-sm font-semibold text-primary">{stage.name}</h4>
                            <p className="text-xs text-slate-500 mt-0.5">{stage.date}</p>
                          </div>
                          <span className={`px-2 py-1 rounded text-xs font-medium whitespace-nowrap ${
                            stage.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                            stage.status === 'in_progress' ? 'bg-amber-500/20 text-amber-700' :
                            'bg-white dark:bg-slate-700/50 text-slate-500'
                          }`}>
                            {stage.outcome}
                          </span>
                        </div>
                        <p className="text-xs text-secondary mb-1">By: {stage.completedBy}</p>
                        <p className="text-sm text-secondary">{stage.detail}</p>
                        {stage.targetCompletion && (
                          <p className="text-xs text-amber-700 mt-2">Target Completion: {stage.targetCompletion}</p>
                        )}
                        {stage.pendingItems && stage.pendingItems.length > 0 && (
                          <div className="mt-2 space-y-1">
                            <p className="text-xs text-slate-500">Pending:</p>
                            {stage.pendingItems.map((item, i) => (
                              <p key={i} className="text-xs text-secondary flex items-start gap-1 ml-2">
                                <span className="text-slate-700">•</span> {item}
                              </p>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <p className="text-xs text-slate-500 mt-4 italic">
                  Note: Stages must be completed sequentially. Dates for pending stages are estimates based on investigator planning and may change based on external response times.
                </p>
              </div>
            </div>

            {/* Chronological Activity Log and Stats Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Timeline Events */}
              <div className="lg:col-span-2 space-y-4">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-primary">Chronological Activity Log</h3>
                  <div className="flex items-center gap-2">
                    <button className="px-3 py-1.5 bg-white dark:bg-slate-700/50 hover:bg-slate-700 text-secondary rounded-lg text-xs font-medium transition-colors flex items-center gap-1">
                      <Download className="w-3 h-3" />
                      Export Timeline
                    </button>
                  </div>
                </div>
                <p className="text-xs text-slate-500 mb-4">All investigative actions, communications, and status changes</p>

                <div className="relative">
                  {/* Timeline line */}
                  <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-white dark:bg-slate-700/50"></div>

                  <div className="space-y-6">
                    {timelineEvents.map((event, idx) => (
                      <div key={event.id} className="relative pl-16">
                        {/* Timeline dot */}
                        <div className={`absolute left-3 w-7 h-7 rounded-full flex items-center justify-center z-10 ${
                          event.type === 'stage_complete' ? 'bg-green-500/20 border border-green-500/50' :
                          event.type === 'stage_progress' ? 'bg-green-500/20 border border-green-500/50' :
                          event.type === 'contact_attempt' ? 'bg-amber-500/20 border border-amber-500/50' :
                          event.type === 'case_opened' ? 'bg-amber-500/20 border border-amber-500/50' :
                          'bg-blue-500/20 border border-blue-500/50'
                        }`}>
                          {event.type === 'stage_complete' && <CheckCircle2 className="w-4 h-4 text-green-400" />}
                          {event.type === 'stage_progress' && <CheckCircle2 className="w-4 h-4 text-green-400" />}
                          {event.type === 'contact_attempt' && <Phone className="w-4 h-4 text-amber-700" />}
                          {event.type === 'case_opened' && <FolderOpen className="w-4 h-4 text-amber-700" />}
                          {event.type === 'document' && <Upload className="w-4 h-4 text-blue-400" />}
                        </div>

                        <div className="bg-white dark:bg-slate-800/40 border border-border rounded-xl shadow-sm dark:shadow-none p-5 hover:border-amber-500/30 transition-colors">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h4 className="text-sm font-semibold text-primary">{event.title}</h4>
                              <p className="text-xs text-slate-500">{event.actor}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-xs font-medium text-secondary">{event.date}</p>
                              <p className="text-xs text-slate-500">{event.time}</p>
                            </div>
                          </div>

                          <p className="text-sm text-secondary mb-3">{event.description}</p>

                          {event.details && event.details.length > 0 && (
                            <div className="bg-white dark:bg-slate-900/40 rounded-lg p-3 mb-3">
                              <div className="space-y-1">
                                {event.details.map((detail, i) => (
                                  <p key={i} className="text-xs text-secondary">{detail}</p>
                                ))}
                              </div>
                            </div>
                          )}

                          {event.documentation && (
                            <p className="text-xs text-slate-500 mb-2">Documentation: {event.documentation}</p>
                          )}

                          <div className="flex flex-wrap items-center gap-2">
                            {event.tags.map((tag, i) => (
                              <span key={i} className={`px-2 py-1 rounded text-xs ${
                                tag.includes('Complete') || tag.includes('Clear') || tag.includes('Positive') ? 'bg-green-500/10 text-green-400' :
                                tag.includes('Pending') || tag.includes('Contact') ? 'bg-amber-500/10 text-amber-700' :
                                'bg-white dark:bg-slate-700/50 text-slate-500'
                              }`}>
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <p className="text-xs text-slate-500 text-center mt-4">
                  Showing: {timelineEvents.length} of {timelineEvents.length} events (Complete timeline)
                </p>
              </div>

              {/* Stats Sidebar */}
              <div className="space-y-6">
                {/* Case Statistics */}
                <div className="bg-white dark:bg-slate-800/40 border border-border rounded-xl shadow-sm dark:shadow-none p-6">
                  <h4 className="text-sm font-semibold text-primary mb-4">Case Statistics</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-secondary">Investigation Opened</span>
                      <span className="text-primary">{caseData.caseOpened}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-secondary">Days in Process</span>
                      <span className={caseData.daysOpen > caseData.agencyTarget ? 'text-amber-700' : 'text-primary'}>{caseData.daysOpen} days</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-secondary">Agency Target</span>
                      <span className="text-slate-500">&lt;{caseData.agencyTarget} days (extended)</span>
                    </div>

                    <div className="border-t border-border pt-3 mt-3">
                      <p className="text-xs text-slate-500 uppercase tracking-wide mb-2">Activity Summary</p>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-secondary">Total Events Logged</span>
                          <span className="text-primary font-medium">{timelineEvents.length}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-secondary pl-2">├─ Stage completions</span>
                          <span className="text-green-400">{timelineEvents.filter(e => e.type === 'stage_complete' || e.type === 'stage_progress').length}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-secondary pl-2">├─ Contact attempts</span>
                          <span className="text-amber-700">{timelineEvents.filter(e => e.type === 'contact_attempt').length}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-secondary pl-2">└─ System actions</span>
                          <span className="text-secondary">{timelineEvents.filter(e => e.type === 'case_opened').length}</span>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-border pt-3 mt-3">
                      <p className="text-xs text-slate-500 uppercase tracking-wide mb-2">Contact Attempts</p>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-secondary">Total Attempts</span>
                          <span className="text-primary">4</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-secondary">Completed Contacts</span>
                          <span className="text-green-400">2</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-secondary">Pending Callbacks</span>
                          <span className="text-amber-700">2</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Case Information */}
                <div className="bg-white dark:bg-slate-800/40 border border-border rounded-xl shadow-sm dark:shadow-none p-6">
                  <h4 className="text-sm font-semibold text-primary mb-4">Case Information</h4>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-slate-500 mb-1">Case ID</p>
                      <p className="text-sm font-mono text-primary">{caseData.id}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 mb-1">Applicant</p>
                      <p className="text-sm font-medium text-primary">{caseData.subject}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 mb-1">Position</p>
                      <p className="text-sm text-primary">{caseData.position} ({caseData.department})</p>
                    </div>
                    <div className="border-t border-border pt-3 mt-3">
                      <p className="text-xs text-slate-500 mb-1">Assigned Investigator</p>
                      <p className="text-sm font-medium text-primary">{caseData.investigator.name}</p>
                      <p className="text-xs text-secondary">Badge {caseData.investigator.badge}</p>
                      <p className="text-xs text-slate-500 mt-1">Current Caseload: {caseData.investigator.activeCases} active cases</p>
                      <p className="text-xs text-amber-700 mt-1">{caseData.investigator.email} | {caseData.investigator.phone}</p>
                    </div>
                    <div className="border-t border-border pt-3 mt-3">
                      <span className="px-2 py-1 bg-red-500/20 text-red-400 rounded text-xs font-medium">HIGH PRIORITY</span>
                      <p className="text-xs text-secondary mt-1">Conditional offer expires {caseData.conditionalOfferExpires}</p>
                    </div>
                  </div>
                </div>

                {/* Upcoming Deadlines */}
                <div className="bg-white dark:bg-slate-800/40 border border-border rounded-xl shadow-sm dark:shadow-none p-6">
                  <h4 className="text-sm font-semibold text-primary mb-4">Upcoming Deadlines</h4>
                  <div className="space-y-3">
                    {/* Urgent */}
                    <div>
                      <p className="text-xs text-red-400 uppercase tracking-wide mb-2">⚠️ Urgent (Within 7 Days)</p>
                      <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-primary">Conditional Offer Expires</span>
                          <span className="text-xs text-red-400 font-medium">7 days</span>
                        </div>
                        <p className="text-xs text-secondary mt-1">Action: Must complete investigation by Jan 27</p>
                      </div>
                    </div>

                    {/* Critical */}
                    <div>
                      <p className="text-xs text-amber-700 uppercase tracking-wide mb-2">⚠️ Critical (Within 14 Days)</p>
                      <div className="space-y-2">
                        <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-primary">Reference Checks</span>
                            <span className="text-xs text-amber-700 font-medium">2 days</span>
                          </div>
                          <p className="text-xs text-secondary mt-1">Target: Jan 25 - Complete 2 pending callbacks</p>
                        </div>
                        <div className="p-3 bg-slate-100 dark:bg-slate-700/30 rounded-lg">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-primary">Employment Verification</span>
                            <span className="text-xs text-secondary font-medium">3 days</span>
                          </div>
                          <p className="text-xs text-secondary mt-1">Target start: Jan 26 - After references</p>
                        </div>
                        <div className="p-3 bg-slate-100 dark:bg-slate-700/30 rounded-lg">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-primary">Financial Review</span>
                            <span className="text-xs text-secondary font-medium">5 days</span>
                          </div>
                          <p className="text-xs text-secondary mt-1">Target: Jan 28 - Pull credit report</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
    </DashboardLayout>
  );
}

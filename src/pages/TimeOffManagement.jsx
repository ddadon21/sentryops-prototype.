import React, { useState } from 'react';
import { Users, FileText, LayoutDashboard, TrendingUp, Settings, Bell, Search, ChevronRight, CheckCircle, Shield, X, Menu, ChevronLeft, LogOut, UserPlus, Briefcase, Clock, Award, Download, Calendar, Phone, Mail, FileCheck, AlertTriangle, AlertCircle, ClipboardCheck, GraduationCap, ChevronDown, ChevronUp, Eye, CheckCircle2, Circle, ExternalLink, HelpCircle, Printer, XCircle, BarChart3, ClipboardList, Square, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import DashboardLayout from '../layouts/DashboardLayout';
import { hrNavigation, hrProfile, hrNotifications } from '../config/hrConfig';

export default function TimeOffManagement() {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState('time-off');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [logoutConfirmOpen, setLogoutConfirmOpen] = useState(false);
  const [supportOpen, setSupportOpen] = useState(false);

  // Expandable sections
  const [expandedFMLA, setExpandedFMLA] = useState(true);
  const [expandedRequests, setExpandedRequests] = useState({});

  // Filter state
  const [requestFilter, setRequestFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('date');

  // Modal states
  const [showApproveModal, setShowApproveModal] = useState(null);
  const [showDenyModal, setShowDenyModal] = useState(null);
  const [showRequestInfoModal, setShowRequestInfoModal] = useState(null);
  const [showCoverageModal, setShowCoverageModal] = useState(false);
  const [showFMLADashboard, setShowFMLADashboard] = useState(false);

  // Modal form state
  const [approveComment, setApproveComment] = useState('');
  const [denyReason, setDenyReason] = useState('');
  const [denyComment, setDenyComment] = useState('');
  const [requestInfoText, setRequestInfoText] = useState('');

  // Toast notifications
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 5000);
  };

  const navigation = [
    { id: 'hr-dashboard', label: 'HR Dashboard', icon: Users, page: 'HRDashboard' },
    { id: 'job-postings', label: 'Job Postings', icon: Briefcase, page: 'JobPostings' },
    { id: 'applicant-tracking', label: 'Applicant Tracking', icon: UserPlus, page: 'ApplicantTracking' },
    { id: 'hiring-pipeline', label: 'Hiring Pipeline', icon: TrendingUp, page: 'HiringPipeline' },
    { id: 'compliance', label: 'HR Compliance', icon: ClipboardCheck, page: 'ComplianceManagement' },
    { id: 'onboarding', label: 'New Hire Onboarding', icon: FileCheck, page: 'NewHireOnboarding' },
    { id: 'training-certifications', label: 'Training & Certifications', icon: GraduationCap, page: 'TrainingCertifications' },
    { id: 'employee-records', label: 'Employee Records', icon: FileText, page: 'EmployeeRecords' },
    { id: 'time-off', label: 'Time Off Management', icon: Calendar },
    { id: 'performance', label: 'Performance Reviews', icon: Award, page: 'PerformanceReviews' },
    { id: 'hr-reports', label: 'HR Reports', icon: LayoutDashboard, page: 'HRReports' },
    { id: 'settings', label: 'Settings', icon: Settings, page: 'HRSettings' }
  ];

  const notifications = [
    { id: 1, title: 'FMLA Deadline Alert', message: 'Amanda Garcia WH-382 due Nov 07, 2024 - federal compliance required', time: '30 min ago', urgent: true },
    { id: 2, title: 'Coverage Conflict', message: 'D-Shift Nov 5-7: Williams & K. Martinez both requesting - supervisor review needed', time: '1 hour ago', urgent: true },
    { id: 3, title: 'Thanksgiving Coverage', message: 'B-Shift Nov 25-29 below minimum if Taylor approved - OT coverage needed', time: '2 hours ago', urgent: true },
    { id: 4, title: 'Leave Request Submitted', message: 'Daniel Wilson - 1 day annual leave Nov 22 - adequate coverage', time: '4 hours ago', urgent: false }
  ];

  const leaveRequests = [
    {
      id: 1,
      name: 'Marcus Chen',
      badge: 'D-2345',
      position: 'Deputy Sheriff',
      department: 'Patrol Division',
      shift: 'C-Shift',
      shiftHours: '18:00-06:00',
      leaveType: 'Annual Leave',
      startDate: 'December 14, 2024',
      endDate: 'December 21, 2024',
      days: 6,
      hours: 48,
      shiftLength: 12,
      reason: 'Family vacation - pre-planned holiday travel',
      submitted: 'October 14, 2024',
      daysAgo: 27,
      status: 'pending',
      coverageStatus: 'adequate',
      balance: { available: 120, requested: 48, remaining: 72 },
      shiftCoverage: { normal: 8, onLeave: 1, remaining: 7, minimum: 6, buffer: 1 },
      conflicts: [],
      operational: { events: 'Holiday season - no scheduled special events', court: 'No court appearances', training: 'No scheduled training' },
      supervisor: { name: 'Sgt. Anderson', status: 'PENDING', notified: 'October 14, 2024' },
      seniority: '7 years, 11 months',
      seniorityNote: 'Early submission (27 days advance notice)',
      recommendation: 'approve',
      recommendReasons: [
        'Annual leave balance sufficient (120h available)',
        'C-Shift coverage adequate (7 of 6 minimum)',
        'No scheduling conflicts detected',
        'Early submission with 27 days advance notice',
        'No operational impacts identified'
      ]
    },
    {
      id: 2,
      name: 'Sarah Williams',
      badge: 'D-1397',
      position: 'Deputy Sheriff',
      department: 'Patrol Division',
      shift: 'D-Shift',
      shiftHours: '14:00-02:00',
      leaveType: 'Sick Leave',
      startDate: 'November 5, 2024',
      endDate: 'November 7, 2024',
      days: 3,
      hours: 36,
      shiftLength: 12,
      reason: 'Medical appointment and follow-up care',
      submitted: 'October 28, 2024',
      daysAgo: 13,
      status: 'pending',
      coverageStatus: 'conflict',
      balance: { available: 96, requested: 36, remaining: 60 },
      shiftCoverage: { normal: 8, onLeave: 2, remaining: 6, minimum: 6, buffer: 0 },
      conflicts: ['Deputy K. Martinez (D-Shift) - same dates Nov 5-7, submitted first'],
      operational: { events: 'None', court: 'No court appearances', training: 'No scheduled training' },
      supervisor: { name: 'Sgt. Torres', status: 'PENDING', notified: 'October 28, 2024' },
      seniority: '5 years, 3 months',
      seniorityNote: 'K. Martinez submitted first and has 6yr seniority',
      recommendation: 'review',
      reviewReasons: [
        'D-Shift at minimum staffing (6 of 6) if approved',
        'Conflict with Deputy K. Martinez (same dates, same shift)',
        'K. Martinez submitted request first (Oct 25)',
        'K. Martinez has greater seniority (6 years vs 5 years 3 months)',
        'Supervisor resolution required per GCSO leave policy'
      ],
      resolutionOptions: [
        'Approve one, deny other (seniority-based: K. Martinez priority)',
        'Approve both and authorize overtime coverage for D-Shift',
        'Deny both and request rescheduling to different dates'
      ]
    },
    {
      id: 3,
      name: 'Robert Martinez',
      badge: 'D-3178',
      position: 'Deputy Sheriff',
      department: 'Patrol Division',
      shift: 'A-Shift',
      shiftHours: '06:00-18:00',
      leaveType: 'Personal Leave',
      startDate: 'November 18, 2024',
      endDate: 'November 19, 2024',
      days: 2,
      hours: 24,
      shiftLength: 12,
      reason: 'Family obligation - school event',
      submitted: 'October 30, 2024',
      daysAgo: 11,
      status: 'pending',
      coverageStatus: 'adequate',
      balance: { available: 40, requested: 24, remaining: 16 },
      shiftCoverage: { normal: 9, onLeave: 1, remaining: 8, minimum: 6, buffer: 2 },
      conflicts: [],
      operational: { events: 'None scheduled', court: 'No court appearances', training: 'No scheduled training' },
      supervisor: { name: 'Sgt. Palmer', status: 'PENDING', notified: 'October 30, 2024' },
      seniority: '4 years, 2 months',
      seniorityNote: '11 days advance notice',
      recommendation: 'approve',
      recommendReasons: [
        'Personal leave balance sufficient (40h available)',
        'A-Shift coverage adequate (8 of 6 minimum, 2 buffer)',
        'No scheduling conflicts detected',
        'No operational impacts identified',
        'Adequate advance notice provided'
      ]
    },
    {
      id: 4,
      name: 'Jennifer Taylor',
      badge: 'D-2891',
      position: 'Deputy Sheriff',
      department: 'Patrol Division',
      shift: 'B-Shift',
      shiftHours: '14:00-02:00',
      leaveType: 'Annual Leave',
      startDate: 'November 25, 2024',
      endDate: 'November 29, 2024',
      days: 5,
      hours: 40,
      shiftLength: 8,
      reason: 'Thanksgiving travel - visiting family out of state',
      submitted: 'October 20, 2024',
      daysAgo: 21,
      status: 'pending',
      coverageStatus: 'conflict',
      balance: { available: 88, requested: 40, remaining: 48 },
      shiftCoverage: { normal: 8, onLeave: 3, remaining: 5, minimum: 6, buffer: -1 },
      conflicts: ['Deputy L. Park (B-Shift) - Nov 25-29, APPROVED', 'Deputy M. Howard (B-Shift) - Nov 25-27, APPROVED'],
      operational: { events: 'Thanksgiving - historically high activity period, Black Friday traffic enforcement', court: 'No court appearances', training: 'No scheduled training' },
      supervisor: { name: 'Sgt. Reeves', status: 'PENDING', notified: 'October 20, 2024' },
      seniority: '3 years, 8 months',
      seniorityNote: 'Two B-Shift deputies already approved for same dates',
      recommendation: 'review',
      reviewReasons: [
        'B-Shift BELOW minimum staffing (5 of 6 minimum)',
        'Two deputies already approved for Thanksgiving week (L. Park, M. Howard)',
        'Thanksgiving historically high activity period',
        'Black Friday traffic enforcement requires additional staffing',
        'No buffer deputies available for B-Shift'
      ],
      resolutionOptions: [
        'Deny request - B-Shift at maximum leave capacity for Thanksgiving',
        'Approve with mandatory overtime coverage (authorize OT for 1 deputy)',
        'Offer alternative dates (Dec 2-6, 2024)',
        'Coordinate temporary reassignment from A-Shift or C-Shift'
      ]
    },
    {
      id: 5,
      name: 'Daniel Wilson',
      badge: 'D-4102',
      position: 'Deputy Sheriff',
      department: 'Patrol Division',
      shift: 'A-Shift',
      shiftHours: '06:00-18:00',
      leaveType: 'Annual Leave',
      startDate: 'November 22, 2024',
      endDate: 'November 22, 2024',
      days: 1,
      hours: 12,
      shiftLength: 12,
      reason: 'Personal appointment',
      submitted: 'November 1, 2024',
      daysAgo: 9,
      status: 'pending',
      coverageStatus: 'adequate',
      balance: { available: 64, requested: 12, remaining: 52 },
      shiftCoverage: { normal: 9, onLeave: 1, remaining: 8, minimum: 6, buffer: 2 },
      conflicts: [],
      operational: { events: 'Pre-Thanksgiving - normal operations', court: 'No court appearances', training: 'No scheduled training' },
      supervisor: { name: 'Sgt. Palmer', status: 'PENDING', notified: 'November 1, 2024' },
      seniority: '2 years, 6 months',
      seniorityNote: '9 days advance notice',
      recommendation: 'approve',
      recommendReasons: [
        'Annual leave balance sufficient (64h available)',
        'A-Shift coverage adequate (8 of 6 minimum, 2 buffer)',
        'No scheduling conflicts detected',
        'Single day request - minimal operational impact',
        'No operational impacts identified'
      ]
    }
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

  const toggleRequest = (id) => {
    setExpandedRequests(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleApprove = (request) => {
    setShowApproveModal(null);
    setApproveComment('');
    addToast(`Leave request for ${request.name} forwarded to supervisor for final approval.`, 'success');
  };

  const handleDeny = (request) => {
    if (!denyReason) return;
    setShowDenyModal(null);
    setDenyReason('');
    setDenyComment('');
    addToast(`Leave request for ${request.name} denied. Employee will be notified.`, 'error');
  };

  const handleRequestInfo = (request) => {
    setShowRequestInfoModal(null);
    setRequestInfoText('');
    addToast(`Information request sent to ${request.name}.`, 'info');
  };

  const filteredRequests = leaveRequests.filter(req => {
    const filterMatch = requestFilter === 'all' ||
      (requestFilter === 'approve' && req.recommendation === 'approve') ||
      (requestFilter === 'review' && req.recommendation === 'review');
    const searchMatch = searchQuery === '' ||
      req.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.badge.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.leaveType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.shift.toLowerCase().includes(searchQuery.toLowerCase());
    return filterMatch && searchMatch;
  });

  return (
    <DashboardLayout navigation={hrNavigation} profile={hrProfile} notifications={hrNotifications} settingsRoute="/hr/settings">
      <div className="p-4 lg:p-6 min-h-full">
          <div className="max-w-7xl mx-auto">

            {/* Page Title Section */}
            <div className="mb-6">
              <h2 className="text-2xl lg:text-3xl font-bold text-primary mb-2">Leave Request Management & Shift Coverage Planning</h2>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-secondary">
                <span>Gwinnett County Sheriff's Office</span>
                <span className="text-slate-700">&bull;</span>
                <span>Lawrenceville, Georgia</span>
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-secondary mt-1">
                <span>Monday, February 08, 2026</span>
                <span className="text-slate-700">&bull;</span>
                <span>5:01 PM EST</span>
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 mt-1">
                <span>HR Director: M. Richardson</span>
                <span className="text-slate-700">|</span>
                <span>Sheriff: Keybo Taylor</span>
                <span className="text-slate-700">|</span>
                <span>Leave Administrator: C. Nguyen, HR Specialist</span>
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 mt-1">
                <span>Pending Leave Requests: 5</span>
                <span className="text-slate-700">|</span>
                <span className="text-red-400 font-medium">FMLA Requests: 1 (CRITICAL)</span>
                <span className="text-slate-700">|</span>
                <span>Upcoming Absences: 0</span>
                <span className="text-slate-700">|</span>
                <span>Denied: 1</span>
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 mt-1">
                <span>System: GCSO-HRIS v4.2</span>
              </div>
            </div>

            {/* Summary Stat Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
              <div className="bg-white dark:bg-zinc-900/40 border border-border rounded-xl shadow-sm dark:shadow-none p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-amber-500/20 rounded-lg flex items-center justify-center">
                    <Clock className="w-4 h-4 text-amber-700" />
                  </div>
                  <p className="text-xs text-secondary">Pending Requests</p>
                </div>
                <p className="text-2xl font-bold text-primary">5</p>
                <p className="text-[10px] text-slate-500">Awaiting review</p>
              </div>
              <div className="bg-white dark:bg-zinc-900/40 border border-red-500/30 rounded-xl p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center">
                    <ClipboardList className="w-4 h-4 text-red-400" />
                  </div>
                  <p className="text-xs text-secondary">FMLA Requests</p>
                </div>
                <p className="text-2xl font-bold text-red-400">1</p>
                <p className="text-[10px] text-red-400 font-medium">CRITICAL - Federal deadline</p>
              </div>
              <div className="bg-white dark:bg-zinc-900/40 border border-border rounded-xl shadow-sm dark:shadow-none p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <Calendar className="w-4 h-4 text-blue-400" />
                  </div>
                  <p className="text-xs text-secondary">Upcoming Absences</p>
                </div>
                <p className="text-2xl font-bold text-primary">0</p>
                <p className="text-[10px] text-slate-500">Next 7 days</p>
              </div>
              <div className="bg-white dark:bg-zinc-900/40 border border-border rounded-xl shadow-sm dark:shadow-none p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center">
                    <XCircle className="w-4 h-4 text-red-400" />
                  </div>
                  <p className="text-xs text-secondary">Denied Requests</p>
                </div>
                <p className="text-2xl font-bold text-primary">1</p>
                <p className="text-[10px] text-slate-500">This period</p>
              </div>
            </div>

            {/* Context Alert Bar */}
            <div className="mb-6 space-y-3">
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-red-400 mb-1">Amanda Garcia FMLA Request - 48-Hour Federal Deadline Compliance Required</p>
                    <p className="text-xs text-secondary">FMLA designation notice (WH-382) due by November 07, 2024. Federal law requires employer response within 5 business days of receiving medical certification.</p>
                  </div>
                  <span className="px-2 py-1 bg-red-500/20 border border-red-500/40 text-red-400 rounded-lg text-xs font-bold whitespace-nowrap">CRITICAL</span>
                </div>
              </div>

              <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-green-400 mb-1">3 Requests Safe to Approve - Adequate Coverage, No Conflicts</p>
                    <p className="text-xs text-secondary">Marcus Chen (C-Shift, Dec 14-21), Robert Martinez (A-Shift, Nov 18-19), Daniel Wilson (A-Shift, Nov 22). All shifts maintain minimum staffing. Pending supervisor review.</p>
                  </div>
                </div>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-amber-700 mb-1">2 Requests Need Review - Coverage Conflicts Require Supervisor Resolution</p>
                    <p className="text-xs text-secondary">Sarah Williams (D-Shift, Nov 5-7) - conflicts with K. Martinez same dates. Jennifer Taylor (B-Shift, Nov 25-29) - below minimum staffing for Thanksgiving week.</p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-blue-400 mb-1">Holiday Coverage Alert - Thanksgiving Week Needs 2 Additional Patrol Officers</p>
                    <p className="text-xs text-secondary">November 25-29, 2024: B-Shift currently 1 deputy below minimum staffing. Coordinate overtime or temporary reassignment to maintain coverage.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* ================================================================ */}
            {/* SECTION 1: FMLA LEAVE REQUESTS */}
            {/* ================================================================ */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center">
                  <ClipboardList className="w-5 h-5 text-red-400" />
                </div>
                <h3 className="text-lg font-bold text-primary">FMLA Leave Requests - Federal Law Compliance</h3>
                <span className="px-2 py-1 bg-red-500/20 border border-red-500/30 rounded text-xs text-red-400 font-bold">PRIORITY</span>
              </div>

              {/* Amanda Garcia FMLA Card */}
              <div className="bg-white dark:bg-zinc-900/40 border border-red-500/30 rounded-xl overflow-hidden">
                <button onClick={() => setExpandedFMLA(!expandedFMLA)} className="w-full px-5 py-4 flex items-center justify-between hover:bg-slate-100 dark:hover:bg-zinc-900/60 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-red-400 text-sm font-bold">AG</span>
                    </div>
                    <div className="text-left">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="text-sm font-semibold text-primary">AMANDA GARCIA</h4>
                        <span className="px-2 py-0.5 bg-red-500/20 border border-red-500/30 rounded text-[10px] text-red-400 font-bold">FMLA REQUEST</span>
                        <span className="px-2 py-0.5 bg-red-500/10 border border-red-500/20 rounded text-[10px] text-red-400">MEDICAL LEAVE</span>
                      </div>
                      <p className="text-xs text-secondary mt-0.5">Employee ID: BI-9012 | Background Investigator | Human Resources</p>
                      <p className="text-xs text-slate-500 mt-0.5">Request Submitted: October 31, 2024 &bull; 10:15 AM</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right hidden sm:block">
                      <p className="text-xs text-red-400 font-bold">48-HOUR FEDERAL DEADLINE</p>
                      <p className="text-[10px] text-slate-500">Due: November 07, 2024</p>
                    </div>
                    {expandedFMLA ? <ChevronUp className="w-4 h-4 text-secondary" /> : <ChevronDown className="w-4 h-4 text-secondary" />}
                  </div>
                </button>

                {expandedFMLA && (
                  <div className="px-5 pb-5 border-t border-red-500/20 space-y-4">

                    {/* a) Federal Deadline Box */}
                    <div className="mt-4 bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                      <h5 className="text-xs font-semibold text-red-400 mb-3 flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4" />
                        Federal Compliance Deadline
                      </h5>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                        <div>
                          <span className="text-slate-500">Request Received:</span>
                          <p className="text-primary font-medium mt-0.5">10/31/2024, 10:15 AM</p>
                        </div>
                        <div>
                          <span className="text-slate-500">Federal Deadline (WH-382):</span>
                          <p className="text-red-400 font-bold mt-0.5">11/07/2024, 10:15 AM</p>
                        </div>
                        <div>
                          <span className="text-slate-500">Time Remaining:</span>
                          <p className="text-amber-700 font-medium mt-0.5">6 days, 14 hours <span className="text-green-400 ml-1">(COMPLIANT)</span></p>
                        </div>
                      </div>
                    </div>

                    {/* b) Leave Request Details */}
                    <div className="bg-white dark:bg-zinc-950/40 border border-border rounded-lg p-4">
                      <h5 className="text-xs font-semibold text-secondary mb-3">Leave Request Details</h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-secondary">
                        <div><span className="text-slate-500">Leave Type:</span> FMLA - Serious Health Condition (29 CFR 825.113)</div>
                        <div><span className="text-slate-500">Dates Requested:</span> November 4 - December 5, 2024</div>
                        <div><span className="text-slate-500">Duration:</span> 10 working days continuous leave</div>
                        <div><span className="text-slate-500">Reason:</span> Medical leave requiring inpatient hospital care</div>
                      </div>
                    </div>

                    {/* c) FMLA Eligibility Verification */}
                    <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-4">
                      <h5 className="text-xs font-semibold text-green-400 mb-3 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4" />
                        FMLA Eligibility Verification
                      </h5>
                      <div className="space-y-2">
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                          <div className="text-xs text-secondary">
                            <span className="text-secondary font-medium">Employment Duration:</span> Hired October 31, 2021 (3 years). Requirement: 12+ months of employment.
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                          <div className="text-xs text-secondary">
                            <span className="text-secondary font-medium">Hours Worked:</span> 2,184 hours in preceding 12 months. Requirement: 1,250+ hours worked.
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                          <div className="text-xs text-secondary">
                            <span className="text-secondary font-medium">Employer Size:</span> 178 employees, all within 75-mile radius. Requirement: 50+ employees within 75 miles.
                          </div>
                        </div>
                      </div>
                      <div className="mt-3 px-3 py-2 bg-green-500/10 border border-green-500/20 rounded-lg">
                        <p className="text-xs text-green-400 font-bold flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4" />
                          FMLA ELIGIBLE - All requirements met
                        </p>
                      </div>
                    </div>

                    {/* d) Medical Certification WH-380 */}
                    <div className="bg-white dark:bg-zinc-950/40 border border-border rounded-lg p-4">
                      <h5 className="text-xs font-semibold text-secondary mb-3">Medical Certification (WH-380)</h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-secondary">
                        <div><span className="text-slate-500">Certification Submitted:</span> October 31, 2024</div>
                        <div><span className="text-slate-500">Healthcare Provider:</span> Dr. R. Kumar, MD - Orthopedic Surgery</div>
                        <div><span className="text-slate-500">Diagnosis:</span> <span className="text-amber-700 font-medium">CONFIDENTIAL - HIPAA Protected</span></div>
                        <div><span className="text-slate-500">Treatment Plan:</span> Inpatient surgery November 04, recovery period 4-6 weeks</div>
                        <div><span className="text-slate-500">Period of Incapacity:</span> November 04 - December 05, 2024</div>
                        <div><span className="text-slate-500">Certification Complete:</span> <span className="text-green-400">All fields completed</span> <CheckCircle2 className="w-3 h-3 text-green-400 inline ml-1" /></div>
                      </div>
                    </div>

                    {/* e) FMLA Entitlement Tracking */}
                    <div className="bg-white dark:bg-zinc-950/40 border border-border rounded-lg p-4">
                      <h5 className="text-xs font-semibold text-secondary mb-3">FMLA Entitlement Tracking</h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-secondary mb-3">
                        <div><span className="text-slate-500">Rolling 12-Month Period:</span> November 01, 2023 - October 31, 2024</div>
                        <div><span className="text-slate-500">Total FMLA Entitlement:</span> 480 hours (12 weeks)</div>
                        <div><span className="text-slate-500">Prior FMLA Used:</span> 0 hours</div>
                        <div><span className="text-slate-500">Current Request:</span> 80 hours (10 working days)</div>
                        <div><span className="text-slate-500">Remaining After Approval:</span> 400 hours (10 weeks)</div>
                      </div>
                      <div className="w-full bg-white dark:bg-zinc-800/50 rounded-full h-3">
                        <div className="bg-blue-500 h-3 rounded-full" style={{ width: '16.7%' }}></div>
                      </div>
                      <div className="flex justify-between mt-1 text-[10px] text-slate-500">
                        <span>80h requested (16.7%)</span>
                        <span>400h remaining</span>
                        <span>480h total</span>
                      </div>
                    </div>

                    {/* f) Required FMLA Notices */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <CheckCircle2 className="w-4 h-4 text-green-400" />
                          <h5 className="text-xs font-semibold text-green-400">WH-381 - Eligibility Notice</h5>
                        </div>
                        <div className="text-xs text-secondary space-y-1">
                          <p><span className="text-slate-500">Status:</span> <span className="text-green-400">SENT</span></p>
                          <p><span className="text-slate-500">Date Sent:</span> October 31, 2024</p>
                          <p><span className="text-slate-500">Method:</span> Email + US Mail (certified)</p>
                        </div>
                      </div>
                      <div className="bg-amber-500/5 border border-amber-500/20 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Square className="w-4 h-4 text-amber-700" />
                          <h5 className="text-xs font-semibold text-amber-700">WH-382 - Designation Notice</h5>
                        </div>
                        <div className="text-xs text-secondary space-y-1">
                          <p><span className="text-slate-500">Status:</span> <span className="text-amber-700 font-medium">PENDING</span></p>
                          <p><span className="text-slate-500">Due Date:</span> <span className="text-red-400">November 07, 2024</span></p>
                          <p><span className="text-slate-500">Action Required:</span> Complete and send to employee</p>
                        </div>
                      </div>
                    </div>

                    {/* g) Operational Impact */}
                    <div className="bg-white dark:bg-zinc-950/40 border border-border rounded-lg p-4">
                      <h5 className="text-xs font-semibold text-secondary mb-3">Operational Impact Assessment</h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-secondary">
                        <div><span className="text-slate-500">Position:</span> Background Investigator (BI), Human Resources</div>
                        <div><span className="text-slate-500">Active Caseload:</span> 3 active background investigations</div>
                        <div className="md:col-span-2"><span className="text-slate-500">Coverage Plan:</span> Lt. Hayes will reassign 2 cases to Cpl. Adams; 1 investigation placed on hold pending Garcia's return</div>
                        <div><span className="text-slate-500">Critical Deadlines:</span> No time-sensitive investigations affected</div>
                        <div><span className="text-slate-500">Court/Training:</span> No scheduled court appearances or training</div>
                      </div>
                    </div>

                    {/* h) Supervisor Notification */}
                    <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-4">
                      <h5 className="text-xs font-semibold text-green-400 mb-2 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4" />
                        Supervisor Notification
                      </h5>
                      <div className="text-xs text-secondary space-y-1">
                        <p><span className="text-slate-500">Supervisor:</span> Major R. Davis - notified October 31, 2024</p>
                        <p><span className="text-slate-500">Coverage:</span> Approved - cases reassigned to Cpl. Adams</p>
                        <p><span className="text-slate-500">Return Plan:</span> Expected return December 06, 2024 (first scheduled work day)</p>
                      </div>
                    </div>

                    {/* i) Payroll Notification */}
                    <div className="bg-amber-500/5 border border-amber-500/20 rounded-lg p-4">
                      <h5 className="text-xs font-semibold text-amber-700 mb-2 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4" />
                        Payroll Notification
                      </h5>
                      <div className="text-xs text-secondary space-y-1">
                        <p><span className="text-slate-500">Status:</span> <span className="text-amber-700 font-medium">PENDING</span> - Payroll department has not been notified</p>
                        <p><span className="text-slate-500">Leave Dates:</span> November 04 - December 05, 2024</p>
                        <p><span className="text-slate-500">Leave Type:</span> FMLA - job-protected unpaid leave</p>
                        <p><span className="text-slate-500">Benefits:</span> Benefits continuation required during FMLA leave</p>
                      </div>
                    </div>

                    {/* j) HR Decision */}
                    <div className="bg-white dark:bg-zinc-950/40 border border-green-500/30 rounded-lg p-4">
                      <div className="flex items-center gap-3 mb-4">
                        <CheckCircle2 className="w-5 h-5 text-green-400" />
                        <h5 className="text-sm font-bold text-green-400">FMLA LEAVE APPROVED (Legally Required)</h5>
                      </div>
                      <div className="space-y-2 mb-4">
                        <div className="flex items-start gap-2 text-xs text-secondary">
                          <CheckCircle2 className="w-3.5 h-3.5 text-green-400 mt-0.5 flex-shrink-0" />
                          <span>Employee meets all FMLA eligibility requirements</span>
                        </div>
                        <div className="flex items-start gap-2 text-xs text-secondary">
                          <CheckCircle2 className="w-3.5 h-3.5 text-green-400 mt-0.5 flex-shrink-0" />
                          <span>Medical certification (WH-380) complete and sufficient</span>
                        </div>
                        <div className="flex items-start gap-2 text-xs text-secondary">
                          <CheckCircle2 className="w-3.5 h-3.5 text-green-400 mt-0.5 flex-shrink-0" />
                          <span>Employer MUST approve qualifying FMLA leave under federal law</span>
                        </div>
                        <div className="flex items-start gap-2 text-xs text-secondary">
                          <CheckCircle2 className="w-3.5 h-3.5 text-green-400 mt-0.5 flex-shrink-0" />
                          <span>Operational coverage plan in place - supervisor approved</span>
                        </div>
                      </div>

                      <h6 className="text-xs font-semibold text-secondary mb-3">Required Actions Checklist:</h6>
                      <div className="space-y-2">
                        {[
                          { action: 'Complete WH-382 Designation Notice and send to employee', responsible: 'C. Nguyen, HR Specialist', deadline: 'By Nov 07, 2024' },
                          { action: 'Notify Payroll Department of leave dates and FMLA status', responsible: 'C. Nguyen, HR Specialist', deadline: 'By Nov 01, 2024' },
                          { action: 'Confirm benefits continuation during FMLA leave period', responsible: 'Benefits Administrator', deadline: 'By Nov 04, 2024' },
                          { action: 'Update HRIS system with approved FMLA leave dates', responsible: 'C. Nguyen, HR Specialist', deadline: 'By Nov 01, 2024' },
                          { action: 'File all FMLA documentation in employee personnel record', responsible: 'C. Nguyen, HR Specialist', deadline: 'By Nov 01, 2024' },
                          { action: 'Schedule return-to-work medical clearance for Dec 06, 2024', responsible: 'C. Nguyen, HR Specialist', deadline: 'By Nov 29, 2024' }
                        ].map((item, idx) => (
                          <div key={idx} className="flex items-start gap-3 px-3 py-2 rounded-lg bg-slate-50 dark:bg-zinc-950/30">
                            <Square className="w-4 h-4 text-slate-500 mt-0.5 flex-shrink-0" />
                            <div className="flex-1">
                              <p className="text-xs text-primary">{item.action}</p>
                              <p className="text-[10px] text-slate-500 mt-0.5">{item.responsible} &bull; {item.deadline}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* k) Action Buttons */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      <button className="px-3 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-400 rounded-lg text-xs font-medium transition-all flex items-center gap-2">
                        <ClipboardList className="w-3.5 h-3.5" />Complete WH-382 Form
                      </button>
                      <button className="px-3 py-2 bg-slate-50 dark:bg-zinc-800/40 hover:bg-slate-700/60 border border-slate-600/50 text-secondary rounded-lg text-xs font-medium transition-all flex items-center gap-2">
                        <Eye className="w-3.5 h-3.5" />View FMLA File
                      </button>
                      <button className="px-3 py-2 bg-slate-50 dark:bg-zinc-800/40 hover:bg-slate-700/60 border border-slate-600/50 text-secondary rounded-lg text-xs font-medium transition-all flex items-center gap-2">
                        <Printer className="w-3.5 h-3.5" />Print Notices
                      </button>
                      <button className="px-3 py-2 bg-slate-50 dark:bg-zinc-800/40 hover:bg-slate-700/60 border border-slate-600/50 text-secondary rounded-lg text-xs font-medium transition-all flex items-center gap-2">
                        <ExternalLink className="w-3.5 h-3.5" />DOL FMLA Regulations
                      </button>
                      <button className="px-3 py-2 bg-slate-50 dark:bg-zinc-800/40 hover:bg-slate-700/60 border border-slate-600/50 text-secondary rounded-lg text-xs font-medium transition-all flex items-center gap-2">
                        <BarChart3 className="w-3.5 h-3.5" />Track FMLA Balance
                      </button>
                      <button className="px-3 py-2 bg-slate-50 dark:bg-zinc-800/40 hover:bg-slate-700/60 border border-slate-600/50 text-secondary rounded-lg text-xs font-medium transition-all flex items-center gap-2">
                        <Mail className="w-3.5 h-3.5" />Notify Payroll
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* ================================================================ */}
            {/* SECTION 2: PENDING LEAVE REQUESTS */}
            {/* ================================================================ */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-blue-400" />
                </div>
                <h3 className="text-lg font-bold text-primary">Pending Leave Requests - Supervisor Review Required</h3>
                <span className="text-xs text-slate-500">Showing {filteredRequests.length} of {leaveRequests.length}</span>
              </div>

              {/* Filter Bar */}
              <div className="mb-4 flex flex-col sm:flex-row gap-3">
                <div className="flex gap-2">
                  <button
                    onClick={() => setRequestFilter('all')}
                    className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${requestFilter === 'all' ? 'bg-blue-500/20 border border-blue-500/30 text-blue-400' : 'bg-white dark:bg-zinc-900/40 border border-slate-700/50 text-secondary hover:text-slate-900 dark:hover:text-white'}`}
                  >
                    All Requests
                  </button>
                  <button
                    onClick={() => setRequestFilter('approve')}
                    className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${requestFilter === 'approve' ? 'bg-green-500/20 border border-green-500/30 text-green-400' : 'bg-white dark:bg-zinc-900/40 border border-slate-700/50 text-secondary hover:text-slate-900 dark:hover:text-white'}`}
                  >
                    Ready to Approve
                  </button>
                  <button
                    onClick={() => setRequestFilter('review')}
                    className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${requestFilter === 'review' ? 'bg-amber-500/20 border border-amber-500/30 text-amber-700' : 'bg-white dark:bg-zinc-900/40 border border-slate-700/50 text-secondary hover:text-slate-900 dark:hover:text-white'}`}
                  >
                    Needs Review
                  </button>
                </div>
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by name, badge, leave type, shift..."
                    className="w-full pl-10 pr-4 py-2 bg-white dark:bg-zinc-900/40 border border-border rounded-xl text-primary text-sm placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-amber-500/50"
                  />
                </div>
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="px-3 py-2 bg-white dark:bg-zinc-900/40 border border-border rounded-xl text-primary text-sm focus:outline-none focus:border-amber-500/50 cursor-pointer">
                  <option value="date">Sort by Date</option>
                  <option value="name">Sort by Name</option>
                  <option value="type">Sort by Type</option>
                  <option value="status">Sort by Status</option>
                </select>
              </div>

              {/* Leave Request Cards */}
              <div className="space-y-6">
                {filteredRequests.map(request => (
                  <div key={request.id} className={`bg-white dark:bg-zinc-900/40 border rounded-xl overflow-hidden ${request.coverageStatus === 'conflict' ? 'border-amber-500/30' : 'border-slate-700/50'}`}>
                    <button onClick={() => toggleRequest(request.id)} className="w-full px-5 py-4 flex items-center justify-between hover:bg-slate-100 dark:hover:bg-zinc-900/60 transition-colors">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${request.coverageStatus === 'conflict' ? 'bg-amber-500/20' : 'bg-blue-500/20'}`}>
                          <span className={`text-sm font-bold ${request.coverageStatus === 'conflict' ? 'text-amber-700' : 'text-blue-400'}`}>
                            {request.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div className="text-left flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h4 className="text-sm font-semibold text-primary">{request.name.toUpperCase()}</h4>
                            <span className="px-2 py-0.5 bg-white dark:bg-zinc-800/50 rounded text-[10px] text-secondary font-mono">{request.badge}</span>
                            <span className="px-2 py-0.5 bg-blue-500/20 border border-blue-500/30 rounded text-[10px] text-blue-400">{request.leaveType.toUpperCase()}</span>
                          </div>
                          <p className="text-xs text-secondary mt-0.5">{request.position} | {request.department} | {request.shift} ({request.shiftHours})</p>
                          <p className="text-xs text-slate-500 mt-0.5">{request.startDate} - {request.endDate} &bull; {request.days} day{request.days > 1 ? 's' : ''} ({request.hours}h) &bull; {request.reason}</p>
                          <p className="text-[10px] text-slate-500 mt-0.5">Submitted: {request.submitted} ({request.daysAgo} days ago)</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 flex-shrink-0">
                        <div className="flex flex-col items-end gap-1">
                          <span className="px-2 py-0.5 bg-amber-500/20 border border-amber-500/30 rounded text-[10px] text-amber-700 font-bold">PENDING</span>
                          {request.coverageStatus === 'adequate' && (
                            <span className="px-2 py-0.5 bg-green-500/20 border border-green-500/30 rounded text-[10px] text-green-400">Coverage Adequate</span>
                          )}
                          {request.coverageStatus === 'conflict' && (
                            <span className="px-2 py-0.5 bg-amber-500/20 border border-amber-500/30 rounded text-[10px] text-amber-700">Coverage Conflict</span>
                          )}
                        </div>
                        {expandedRequests[request.id] ? <ChevronUp className="w-4 h-4 text-secondary" /> : <ChevronDown className="w-4 h-4 text-secondary" />}
                      </div>
                    </button>

                    {expandedRequests[request.id] && (
                      <div className="px-5 pb-5 border-t border-border dark:border-slate-700/30 space-y-4">

                        {/* Leave Details */}
                        <div className="mt-4 bg-white dark:bg-zinc-950/40 border border-border rounded-lg p-4">
                          <h5 className="text-xs font-semibold text-secondary mb-3">Leave Request Details</h5>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-secondary">
                            <div><span className="text-slate-500">Leave Type:</span> {request.leaveType}</div>
                            <div><span className="text-slate-500">Dates:</span> {request.startDate} - {request.endDate}</div>
                            <div><span className="text-slate-500">Duration:</span> {request.days} day{request.days > 1 ? 's' : ''} ({request.hours} hours, {request.shiftLength}-hour shifts)</div>
                            <div><span className="text-slate-500">Reason:</span> {request.reason}</div>
                            <div><span className="text-slate-500">Submitted:</span> {request.submitted} ({request.daysAgo} days ago)</div>
                            <div><span className="text-slate-500">Shift:</span> {request.shift} ({request.shiftHours})</div>
                          </div>
                        </div>

                        {/* Leave Balance */}
                        <div className="bg-white dark:bg-zinc-950/40 border border-border rounded-lg p-4">
                          <h5 className="text-xs font-semibold text-secondary mb-3">Leave Balance</h5>
                          <div className="grid grid-cols-3 gap-3 text-center mb-3">
                            <div>
                              <p className="text-lg font-bold text-primary">{request.balance.available}h</p>
                              <p className="text-[10px] text-slate-500">Available</p>
                            </div>
                            <div>
                              <p className="text-lg font-bold text-amber-700">{request.balance.requested}h</p>
                              <p className="text-[10px] text-slate-500">Requested</p>
                            </div>
                            <div>
                              <p className="text-lg font-bold text-green-400">{request.balance.remaining}h</p>
                              <p className="text-[10px] text-slate-500">Remaining</p>
                            </div>
                          </div>
                          <div className="w-full bg-white dark:bg-zinc-800/50 rounded-full h-2">
                            <div className="bg-green-500 h-2 rounded-full" style={{ width: `${(request.balance.remaining / request.balance.available) * 100}%` }}></div>
                          </div>
                          <p className="text-[10px] text-green-400 mt-1 font-medium">SUFFICIENT - Balance adequate for request</p>
                        </div>

                        {/* Shift Coverage */}
                        <div className={`border rounded-lg p-4 ${
                          request.shiftCoverage.buffer < 0 ? 'bg-red-500/5 border-red-500/20' :
                          request.shiftCoverage.buffer === 0 ? 'bg-amber-500/5 border-amber-500/20' :
                          'bg-white dark:bg-zinc-950/40 border-border'
                        }`}>
                          <h5 className={`text-xs font-semibold mb-3 ${
                            request.shiftCoverage.buffer < 0 ? 'text-red-400' :
                            request.shiftCoverage.buffer === 0 ? 'text-amber-700' :
                            'text-slate-500'
                          }`}>
                            Shift Coverage Analysis - {request.shift} ({request.shiftHours})
                          </h5>
                          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-center mb-3">
                            <div>
                              <p className="text-lg font-bold text-primary">{request.shiftCoverage.normal}</p>
                              <p className="text-[10px] text-slate-500">Normal Staffing</p>
                            </div>
                            <div>
                              <p className="text-lg font-bold text-amber-700">{request.shiftCoverage.onLeave}</p>
                              <p className="text-[10px] text-slate-500">On Leave</p>
                            </div>
                            <div>
                              <p className={`text-lg font-bold ${request.shiftCoverage.remaining < request.shiftCoverage.minimum ? 'text-red-400' : request.shiftCoverage.remaining === request.shiftCoverage.minimum ? 'text-amber-700' : 'text-green-400'}`}>{request.shiftCoverage.remaining}</p>
                              <p className="text-[10px] text-slate-500">Remaining</p>
                            </div>
                            <div>
                              <p className="text-lg font-bold text-blue-400">{request.shiftCoverage.minimum}</p>
                              <p className="text-[10px] text-slate-500">Minimum Req.</p>
                            </div>
                            <div>
                              <p className={`text-lg font-bold ${request.shiftCoverage.buffer < 0 ? 'text-red-400' : request.shiftCoverage.buffer === 0 ? 'text-amber-700' : 'text-green-400'}`}>{request.shiftCoverage.buffer >= 0 ? '+' : ''}{request.shiftCoverage.buffer}</p>
                              <p className="text-[10px] text-slate-500">Buffer</p>
                            </div>
                          </div>

                          {/* Visual Staffing Bar */}
                          <div className="mb-3">
                            <div className="flex gap-1">
                              {Array.from({ length: request.shiftCoverage.normal }).map((_, i) => (
                                <div
                                  key={i}
                                  className={`h-6 flex-1 rounded ${
                                    i < request.shiftCoverage.remaining
                                      ? (i < request.shiftCoverage.minimum ? 'bg-blue-500/40' : 'bg-green-500/30')
                                      : 'bg-amber-500/30'
                                  }`}
                                />
                              ))}
                            </div>
                            <div className="flex justify-between mt-1 text-[10px] text-slate-500">
                              <span>Min required: {request.shiftCoverage.minimum}</span>
                              <span>
                                {request.shiftCoverage.remaining >= request.shiftCoverage.minimum
                                  ? (request.shiftCoverage.buffer === 0 ? 'AT MINIMUM - No buffer' : `ADEQUATE - ${request.shiftCoverage.buffer} buffer`)
                                  : `BELOW MINIMUM - ${Math.abs(request.shiftCoverage.buffer)} short`
                                }
                              </span>
                            </div>
                          </div>

                          {/* Conflicts */}
                          {request.conflicts.length > 0 && (
                            <div className="mt-3 bg-amber-500/5 border border-amber-500/20 rounded-lg p-3">
                              <p className="text-xs font-semibold text-amber-700 mb-2">Scheduling Conflicts:</p>
                              {request.conflicts.map((conflict, idx) => (
                                <div key={idx} className="flex items-start gap-2 text-xs text-secondary mb-1">
                                  <AlertCircle className="w-3.5 h-3.5 text-amber-700 mt-0.5 flex-shrink-0" />
                                  <span>{conflict}</span>
                                </div>
                              ))}
                            </div>
                          )}

                          {request.conflicts.length === 0 && (
                            <div className="flex items-center gap-2 text-xs text-green-400">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>No scheduling conflicts detected</span>
                            </div>
                          )}
                        </div>

                        {/* Resolution Options (for conflict requests) */}
                        {request.resolutionOptions && (
                          <div className="bg-amber-500/5 border border-amber-500/20 rounded-lg p-4">
                            <h5 className="text-xs font-semibold text-amber-700 mb-3">Resolution Options:</h5>
                            <div className="space-y-2">
                              {request.resolutionOptions.map((option, idx) => (
                                <div key={idx} className="flex items-start gap-3 px-3 py-2 rounded-lg bg-slate-50 dark:bg-zinc-950/30">
                                  <span className="text-xs text-amber-700 font-bold mt-0.5">{idx + 1}.</span>
                                  <p className="text-xs text-secondary">{option}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Operational Notes */}
                        <div className="bg-white dark:bg-zinc-950/40 border border-border rounded-lg p-4">
                          <h5 className="text-xs font-semibold text-secondary mb-3">Operational Assessment</h5>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs text-secondary">
                            <div><span className="text-slate-500">Events:</span> {request.operational.events}</div>
                            <div><span className="text-slate-500">Court:</span> {request.operational.court}</div>
                            <div><span className="text-slate-500">Training:</span> {request.operational.training}</div>
                          </div>
                        </div>

                        {/* Supervisor Status */}
                        <div className="bg-white dark:bg-zinc-950/40 border border-border rounded-lg p-4">
                          <h5 className="text-xs font-semibold text-secondary mb-2">Supervisor Review</h5>
                          <div className="flex items-center gap-3 text-xs text-secondary flex-wrap">
                            <span className="text-slate-500">Supervisor:</span>
                            <span>{request.supervisor.name}</span>
                            <span className="px-2 py-0.5 bg-amber-500/20 border border-amber-500/30 rounded text-[10px] text-amber-700 font-bold">{request.supervisor.status}</span>
                            <span className="text-slate-500">Notified: {request.supervisor.notified}</span>
                          </div>
                          <div className="flex items-center gap-3 text-xs text-secondary mt-1 flex-wrap">
                            <span className="text-slate-500">Seniority:</span>
                            <span>{request.seniority}</span>
                            <span className="text-slate-700">|</span>
                            <span className="text-slate-500">{request.seniorityNote}</span>
                          </div>
                        </div>

                        {/* Recommendation */}
                        {request.recommendation === 'approve' && (
                          <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-4">
                            <h5 className="text-xs font-bold text-green-400 mb-3 flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4" />
                              RECOMMEND APPROVAL
                            </h5>
                            <div className="space-y-1.5">
                              {request.recommendReasons.map((reason, idx) => (
                                <div key={idx} className="flex items-start gap-2 text-xs text-secondary">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-green-400 mt-0.5 flex-shrink-0" />
                                  <span>{reason}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {request.recommendation === 'review' && (
                          <div className="bg-amber-500/5 border border-amber-500/20 rounded-lg p-4">
                            <h5 className="text-xs font-bold text-amber-700 mb-3 flex items-center gap-2">
                              <AlertCircle className="w-4 h-4" />
                              REQUIRES SUPERVISOR REVIEW
                            </h5>
                            <div className="space-y-1.5">
                              {request.reviewReasons.map((reason, idx) => (
                                <div key={idx} className="flex items-start gap-2 text-xs text-secondary">
                                  <AlertCircle className="w-3.5 h-3.5 text-amber-700 mt-0.5 flex-shrink-0" />
                                  <span>{reason}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-2 pt-2">
                          <button
                            onClick={(e) => { e.stopPropagation(); setShowApproveModal(request); }}
                            className="px-3 py-2 bg-green-500/20 hover:bg-green-500/30 border border-green-500/30 text-green-400 rounded-lg text-xs font-medium transition-all flex items-center gap-2"
                          >
                            <CheckCircle className="w-3.5 h-3.5" />Approve
                          </button>
                          <button
                            onClick={(e) => { e.stopPropagation(); setShowDenyModal(request); }}
                            className="px-3 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-400 rounded-lg text-xs font-medium transition-all flex items-center gap-2"
                          >
                            <XCircle className="w-3.5 h-3.5" />Deny
                          </button>
                          <button
                            onClick={(e) => { e.stopPropagation(); setShowRequestInfoModal(request); }}
                            className="px-3 py-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 text-blue-400 rounded-lg text-xs font-medium transition-all flex items-center gap-2"
                          >
                            <Info className="w-3.5 h-3.5" />Request Info
                          </button>
                          <button className="px-3 py-2 bg-slate-50 dark:bg-zinc-800/40 hover:bg-slate-700/60 border border-slate-600/50 text-secondary rounded-lg text-xs font-medium transition-all flex items-center gap-2">
                            <Calendar className="w-3.5 h-3.5" />View Schedule
                          </button>
                          <button className="px-3 py-2 bg-slate-50 dark:bg-zinc-800/40 hover:bg-slate-700/60 border border-slate-600/50 text-secondary rounded-lg text-xs font-medium transition-all flex items-center gap-2">
                            <Eye className="w-3.5 h-3.5" />Calendar
                          </button>
                          <button className="px-3 py-2 bg-slate-50 dark:bg-zinc-800/40 hover:bg-slate-700/60 border border-slate-600/50 text-secondary rounded-lg text-xs font-medium transition-all flex items-center gap-2">
                            <Mail className="w-3.5 h-3.5" />Contact {request.supervisor.name}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* ================================================================ */}
            {/* SECTION 3: RECENTLY DENIED REQUESTS */}
            {/* ================================================================ */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center">
                  <XCircle className="w-5 h-5 text-red-400" />
                </div>
                <h3 className="text-lg font-bold text-primary">Recently Denied Requests</h3>
              </div>

              <div className="bg-white dark:bg-zinc-900/40 border border-border rounded-xl overflow-hidden">
                <div className="px-5 py-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-red-400 text-sm font-bold">TB</span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="text-sm font-semibold text-primary">DEPUTY T. BROOKS</h4>
                          <span className="px-2 py-0.5 bg-white dark:bg-zinc-800/50 rounded text-[10px] text-secondary font-mono">D-3890</span>
                          <span className="px-2 py-0.5 bg-red-500/20 border border-red-500/30 rounded text-[10px] text-red-400 font-bold">DENIED</span>
                        </div>
                        <p className="text-xs text-secondary mt-0.5">Deputy Sheriff | Patrol Division | B-Shift (14:00-02:00)</p>
                        <p className="text-xs text-slate-500 mt-0.5">Annual Leave - November 25-29, 2024 (5 days, 40 hours)</p>
                        <p className="text-xs text-slate-500 mt-0.5">Thanksgiving vacation</p>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-xs text-red-400 font-medium">Denied by Sgt. Reeves</p>
                      <p className="text-[10px] text-slate-500">October 15, 2024</p>
                    </div>
                  </div>
                  <div className="mt-3 bg-red-500/5 border border-red-500/20 rounded-lg p-3">
                    <p className="text-xs text-secondary">
                      <span className="text-red-400 font-medium">Denial Reason:</span> B-Shift Thanksgiving week (Nov 25-29) already at maximum leave capacity. Two deputies (L. Park, M. Howard) previously approved for same dates. Approving additional leave would reduce B-Shift below minimum staffing of 6 deputies.
                    </p>
                    <p className="text-xs text-secondary mt-2">
                      <span className="text-slate-500">Alternative Offered:</span> December 2-6, 2024 (following week) - adequate coverage available on B-Shift.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>

      {/* ================================================================ */}
      {/* APPROVE MODAL */}
      {/* ================================================================ */}
      {showApproveModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => { setShowApproveModal(null); setApproveComment(''); }} />
          <div className="relative bg-white dark:bg-zinc-950 border border-green-500/30 rounded-2xl p-8 max-w-md w-full shadow-2xl">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-primary">Approve Leave Request</h3>
                <p className="text-sm text-secondary">{showApproveModal.name} - {showApproveModal.leaveType}</p>
              </div>
            </div>
            <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-3 mb-4">
              <p className="text-xs text-secondary">
                <span className="text-green-400 font-medium">Dates:</span> {showApproveModal.startDate} - {showApproveModal.endDate} ({showApproveModal.days} day{showApproveModal.days > 1 ? 's' : ''})
              </p>
            </div>
            <div className="mb-4">
              <label className="text-xs text-secondary block mb-2">Comments (optional):</label>
              <textarea
                value={approveComment}
                onChange={(e) => setApproveComment(e.target.value)}
                placeholder="Add any notes for the supervisor..."
                className="w-full px-3 py-2 bg-white dark:bg-zinc-900/40 border border-border rounded-xl text-primary text-sm placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-green-500/50 resize-none h-20"
              />
            </div>
            <p className="text-[10px] text-slate-500 mb-4">Leave approval will be forwarded to supervisor ({showApproveModal.supervisor.name}) for final review and confirmation.</p>
            <div className="flex gap-3">
              <button onClick={() => { setShowApproveModal(null); setApproveComment(''); }} className="flex-1 px-4 py-2.5 bg-white dark:bg-zinc-900/40 hover:bg-slate-100 dark:hover:bg-zinc-900/60 border border-slate-700/50 rounded-xl text-primary font-medium transition-all text-sm">Cancel</button>
              <button onClick={() => handleApprove(showApproveModal)} className="flex-1 px-4 py-2.5 bg-green-500/20 hover:bg-green-500/30 border border-green-500/30 rounded-xl text-green-400 font-medium transition-all text-sm">Approve Request</button>
            </div>
          </div>
        </div>
      )}

      {/* ================================================================ */}
      {/* DENY MODAL */}
      {/* ================================================================ */}
      {showDenyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => { setShowDenyModal(null); setDenyReason(''); setDenyComment(''); }} />
          <div className="relative bg-white dark:bg-zinc-950 border border-red-500/30 rounded-2xl p-8 max-w-md w-full shadow-2xl">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center">
                <XCircle className="w-6 h-6 text-red-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-primary">Deny Leave Request</h3>
                <p className="text-sm text-secondary">{showDenyModal.name} - {showDenyModal.leaveType}</p>
              </div>
            </div>
            <div className="bg-red-500/5 border border-red-500/20 rounded-lg p-3 mb-4">
              <p className="text-xs text-secondary">
                <span className="text-red-400 font-medium">Dates:</span> {showDenyModal.startDate} - {showDenyModal.endDate} ({showDenyModal.days} day{showDenyModal.days > 1 ? 's' : ''})
              </p>
            </div>
            <div className="mb-4">
              <label className="text-xs text-secondary block mb-2">Denial Reason (required):</label>
              <select
                value={denyReason}
                onChange={(e) => setDenyReason(e.target.value)}
                className="w-full px-3 py-2 bg-white dark:bg-zinc-900/40 border border-border rounded-xl text-primary text-sm focus:outline-none focus:border-red-500/50 cursor-pointer mb-3"
              >
                <option value="">Select a reason...</option>
                <option value="staffing">Insufficient Staffing Coverage</option>
                <option value="conflict">Scheduling Conflict</option>
                <option value="operational">Operational Requirements</option>
                <option value="balance">Insufficient Leave Balance</option>
                <option value="notice">Insufficient Advance Notice</option>
                <option value="other">Other (specify in comments)</option>
              </select>
              <label className="text-xs text-secondary block mb-2">Additional Comments:</label>
              <textarea
                value={denyComment}
                onChange={(e) => setDenyComment(e.target.value)}
                placeholder="Provide details for the denial..."
                className="w-full px-3 py-2 bg-white dark:bg-zinc-900/40 border border-border rounded-xl text-primary text-sm placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-red-500/50 resize-none h-20"
              />
            </div>
            <div className="flex gap-3">
              <button onClick={() => { setShowDenyModal(null); setDenyReason(''); setDenyComment(''); }} className="flex-1 px-4 py-2.5 bg-white dark:bg-zinc-900/40 hover:bg-slate-100 dark:hover:bg-zinc-900/60 border border-slate-700/50 rounded-xl text-primary font-medium transition-all text-sm">Cancel</button>
              <button
                onClick={() => handleDeny(showDenyModal)}
                disabled={!denyReason}
                className={`flex-1 px-4 py-2.5 rounded-xl font-medium transition-all text-sm ${denyReason ? 'bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-400' : 'bg-slate-100 dark:bg-zinc-900/20 border border-border text-slate-700 cursor-not-allowed'}`}
              >
                Deny Request
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================================================================ */}
      {/* REQUEST INFO MODAL */}
      {/* ================================================================ */}
      {showRequestInfoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => { setShowRequestInfoModal(null); setRequestInfoText(''); }} />
          <div className="relative bg-white dark:bg-zinc-950 border border-blue-500/30 rounded-2xl p-8 max-w-md w-full shadow-2xl">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                <Info className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-primary">Request Additional Information</h3>
                <p className="text-sm text-secondary">{showRequestInfoModal.name} - {showRequestInfoModal.leaveType}</p>
              </div>
            </div>
            <div className="mb-4">
              <label className="text-xs text-secondary block mb-2">Information Needed:</label>
              <textarea
                value={requestInfoText}
                onChange={(e) => setRequestInfoText(e.target.value)}
                placeholder="Describe the additional information needed from the employee..."
                className="w-full px-3 py-2 bg-white dark:bg-zinc-900/40 border border-border rounded-xl text-primary text-sm placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500/50 resize-none h-24"
              />
            </div>
            <div className="flex gap-3">
              <button onClick={() => { setShowRequestInfoModal(null); setRequestInfoText(''); }} className="flex-1 px-4 py-2.5 bg-white dark:bg-zinc-900/40 hover:bg-slate-100 dark:hover:bg-zinc-900/60 border border-slate-700/50 rounded-xl text-primary font-medium transition-all text-sm">Cancel</button>
              <button
                onClick={() => handleRequestInfo(showRequestInfoModal)}
                disabled={!requestInfoText.trim()}
                className={`flex-1 px-4 py-2.5 rounded-xl font-medium transition-all text-sm ${requestInfoText.trim() ? 'bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 text-blue-400' : 'bg-slate-100 dark:bg-zinc-900/20 border border-border text-slate-700 cursor-not-allowed'}`}
              >
                Send Request
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================================================================ */}
      {/* COVERAGE ANALYSIS MODAL */}
      {/* ================================================================ */}
      {showCoverageModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowCoverageModal(false)} />
          <div className="relative bg-white dark:bg-zinc-950 border border-border rounded-2xl p-6 max-w-3xl w-full shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-primary mb-1">Shift Coverage Analysis</h3>
                <p className="text-sm text-secondary">Current staffing levels and leave impact by shift</p>
              </div>
              <button onClick={() => setShowCoverageModal(false)} className="p-2 hover:bg-slate-100 dark:hover:bg-zinc-900/50 rounded-lg transition-colors">
                <X className="w-5 h-5 text-secondary" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* A-Shift */}
              <div className="bg-white dark:bg-zinc-900/40 border border-green-500/30 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-semibold text-primary">A-Shift (06:00-18:00)</h4>
                  <span className="px-2 py-0.5 bg-green-500/20 border border-green-500/30 rounded text-[10px] text-green-400 font-bold">ADEQUATE</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center mb-3">
                  <div>
                    <p className="text-lg font-bold text-primary">9</p>
                    <p className="text-[10px] text-slate-500">Assigned</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-amber-700">1</p>
                    <p className="text-[10px] text-slate-500">On Leave</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-green-400">8</p>
                    <p className="text-[10px] text-slate-500">Available</p>
                  </div>
                </div>
                <div className="w-full bg-white dark:bg-zinc-800/50 rounded-full h-2 mb-1">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '88.9%' }}></div>
                </div>
                <p className="text-[10px] text-green-400">Minimum: 6 | Buffer: +2</p>
                <p className="text-[10px] text-slate-500 mt-1">Pending: R. Martinez (Nov 18-19), D. Wilson (Nov 22)</p>
              </div>

              {/* B-Shift */}
              <div className="bg-white dark:bg-zinc-900/40 border border-red-500/30 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-semibold text-primary">B-Shift (14:00-02:00)</h4>
                  <span className="px-2 py-0.5 bg-red-500/20 border border-red-500/30 rounded text-[10px] text-red-400 font-bold">CRITICAL</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center mb-3">
                  <div>
                    <p className="text-lg font-bold text-primary">8</p>
                    <p className="text-[10px] text-slate-500">Assigned</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-red-400">3</p>
                    <p className="text-[10px] text-slate-500">On Leave</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-red-400">5</p>
                    <p className="text-[10px] text-slate-500">Available</p>
                  </div>
                </div>
                <div className="w-full bg-white dark:bg-zinc-800/50 rounded-full h-2 mb-1">
                  <div className="bg-red-500 h-2 rounded-full" style={{ width: '62.5%' }}></div>
                </div>
                <p className="text-[10px] text-red-400 font-medium">Minimum: 6 | Buffer: -1 (BELOW MINIMUM)</p>
                <p className="text-[10px] text-slate-500 mt-1">Approved: L. Park, M. Howard (Nov 25-29). Pending: J. Taylor (Nov 25-29)</p>
                <p className="text-[10px] text-red-400 mt-1">Thanksgiving week - OT coverage required</p>
              </div>

              {/* C-Shift */}
              <div className="bg-white dark:bg-zinc-900/40 border border-green-500/30 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-semibold text-primary">C-Shift (18:00-06:00)</h4>
                  <span className="px-2 py-0.5 bg-green-500/20 border border-green-500/30 rounded text-[10px] text-green-400 font-bold">ADEQUATE</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center mb-3">
                  <div>
                    <p className="text-lg font-bold text-primary">8</p>
                    <p className="text-[10px] text-slate-500">Assigned</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-amber-700">1</p>
                    <p className="text-[10px] text-slate-500">On Leave</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-green-400">7</p>
                    <p className="text-[10px] text-slate-500">Available</p>
                  </div>
                </div>
                <div className="w-full bg-white dark:bg-zinc-800/50 rounded-full h-2 mb-1">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '87.5%' }}></div>
                </div>
                <p className="text-[10px] text-green-400">Minimum: 6 | Buffer: +1</p>
                <p className="text-[10px] text-slate-500 mt-1">Pending: M. Chen (Dec 14-21)</p>
              </div>

              {/* D-Shift */}
              <div className="bg-white dark:bg-zinc-900/40 border border-amber-500/30 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-semibold text-primary">D-Shift (14:00-02:00)</h4>
                  <span className="px-2 py-0.5 bg-amber-500/20 border border-amber-500/30 rounded text-[10px] text-amber-700 font-bold">AT MINIMUM</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center mb-3">
                  <div>
                    <p className="text-lg font-bold text-primary">8</p>
                    <p className="text-[10px] text-slate-500">Assigned</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-amber-700">2</p>
                    <p className="text-[10px] text-slate-500">On Leave</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-amber-700">6</p>
                    <p className="text-[10px] text-slate-500">Available</p>
                  </div>
                </div>
                <div className="w-full bg-white dark:bg-zinc-800/50 rounded-full h-2 mb-1">
                  <div className="bg-amber-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
                <p className="text-[10px] text-amber-700">Minimum: 6 | Buffer: 0 (AT MINIMUM)</p>
                <p className="text-[10px] text-slate-500 mt-1">Pending: S. Williams (Nov 5-7). Conflict: K. Martinez same dates.</p>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button onClick={() => setShowCoverageModal(false)} className="flex-1 px-4 py-2.5 bg-white dark:bg-zinc-900/40 hover:bg-slate-100 dark:hover:bg-zinc-900/60 border border-slate-700/50 rounded-xl text-primary font-medium transition-all text-sm">Close</button>
              <button className="flex-1 px-4 py-2.5 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 rounded-xl text-blue-400 font-medium transition-all text-sm flex items-center justify-center gap-2">
                <Printer className="w-4 h-4" />Print Coverage Report
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================================================================ */}
      {/* FMLA DASHBOARD MODAL */}
      {/* ================================================================ */}
      {showFMLADashboard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowFMLADashboard(false)} />
          <div className="relative bg-white dark:bg-zinc-950 border border-border rounded-2xl p-6 max-w-3xl w-full shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-primary mb-1">FMLA Dashboard</h3>
                <p className="text-sm text-secondary">Family and Medical Leave Act tracking and compliance</p>
              </div>
              <button onClick={() => setShowFMLADashboard(false)} className="p-2 hover:bg-slate-100 dark:hover:bg-zinc-900/50 rounded-lg transition-colors">
                <X className="w-5 h-5 text-secondary" />
              </button>
            </div>

            {/* FMLA Stats */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="bg-white dark:bg-zinc-900/40 border border-blue-500/30 rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-blue-400">1</p>
                <p className="text-xs text-secondary">Active FMLA Leave</p>
              </div>
              <div className="bg-white dark:bg-zinc-900/40 border border-green-500/30 rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-green-400">0</p>
                <p className="text-xs text-secondary">Completed This Year</p>
              </div>
              <div className="bg-white dark:bg-zinc-900/40 border border-red-500/30 rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-red-400">1</p>
                <p className="text-xs text-secondary">Pending Action</p>
              </div>
            </div>

            {/* Active FMLA Case */}
            <div className="bg-white dark:bg-zinc-900/40 border border-border rounded-xl shadow-sm dark:shadow-none p-4 mb-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center">
                  <span className="text-red-400 text-sm font-bold">AG</span>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-primary">Amanda Garcia</h4>
                  <p className="text-xs text-secondary">BI-9012 | Background Investigator | FMLA - Serious Health Condition</p>
                </div>
                <span className="ml-auto px-2 py-0.5 bg-blue-500/20 border border-blue-500/30 rounded text-[10px] text-blue-400 font-bold">ACTIVE</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs text-secondary">
                <div><span className="text-slate-500">Leave Period:</span><br />Nov 4 - Dec 5, 2024</div>
                <div><span className="text-slate-500">Duration:</span><br />10 days (80 hours)</div>
                <div><span className="text-slate-500">FMLA Used:</span><br />80h of 480h (16.7%)</div>
                <div><span className="text-slate-500">Return Date:</span><br />December 6, 2024</div>
              </div>
            </div>

            {/* Compliance Checklist */}
            <div className="bg-white dark:bg-zinc-900/40 border border-border rounded-xl shadow-sm dark:shadow-none p-4">
              <h4 className="text-sm font-semibold text-primary mb-3">FMLA Compliance Checklist - Garcia</h4>
              <div className="space-y-2">
                {[
                  { text: 'Eligibility determined (12 months, 1250 hours, 50 employees)', done: true },
                  { text: 'WH-381 Eligibility Notice sent to employee', done: true },
                  { text: 'WH-380 Medical Certification received and reviewed', done: true },
                  { text: 'Supervisor notified and coverage plan established', done: true },
                  { text: 'WH-382 Designation Notice sent to employee', done: false, urgent: true },
                  { text: 'Payroll notified of FMLA leave dates', done: false },
                  { text: 'Benefits continuation confirmed', done: false },
                  { text: 'Return-to-work clearance scheduled', done: false }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 px-3 py-2 rounded-lg bg-slate-50 dark:bg-zinc-950/30">
                    {item.done ? (
                      <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    ) : (
                      <Circle className={`w-4 h-4 mt-0.5 flex-shrink-0 ${item.urgent ? 'text-red-400' : 'text-slate-500'}`} />
                    )}
                    <span className={`text-xs ${item.done ? 'text-green-400' : item.urgent ? 'text-red-400 font-medium' : 'text-primary'}`}>{item.text}</span>
                    {item.urgent && <span className="px-1.5 py-0.5 bg-red-500/20 border border-red-500/30 rounded text-[9px] text-red-400 font-bold ml-auto">DUE NOV 07</span>}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button onClick={() => setShowFMLADashboard(false)} className="flex-1 px-4 py-2.5 bg-white dark:bg-zinc-900/40 hover:bg-slate-100 dark:hover:bg-zinc-900/60 border border-slate-700/50 rounded-xl text-primary font-medium transition-all text-sm">Close</button>
              <button className="flex-1 px-4 py-2.5 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 rounded-xl text-red-400 font-medium transition-all text-sm flex items-center justify-center gap-2">
                <ClipboardList className="w-4 h-4" />Complete WH-382
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================================================================ */}
      {/* TOAST NOTIFICATIONS */}
      {/* ================================================================ */}
      <div className="fixed bottom-6 right-24 z-50 space-y-2">
        {toasts.map(toast => (
          <div
            key={toast.id}
            className={`px-4 py-3 rounded-xl shadow-2xl border text-sm font-medium flex items-center gap-2 ${
              toast.type === 'success' ? 'bg-green-500/20 border-green-500/30 text-green-400' :
              toast.type === 'error' ? 'bg-red-500/20 border-red-500/30 text-red-400' :
              'bg-blue-500/20 border-blue-500/30 text-blue-400'
            }`}
          >
            {toast.type === 'success' && <CheckCircle className="w-4 h-4" />}
            {toast.type === 'error' && <XCircle className="w-4 h-4" />}
            {toast.type === 'info' && <Info className="w-4 h-4" />}
            {toast.message}
            <button onClick={() => setToasts(prev => prev.filter(t => t.id !== toast.id))} className="ml-2 hover:opacity-70">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

      {/* ================================================================ */}
      {/* SUPPORT FAB */}
      {/* ================================================================ */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setSupportOpen(!supportOpen)}
          className="w-14 h-14 bg-gradient-to-br from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110"
        >
          {supportOpen ? <X className="w-6 h-6 text-primary" /> : <HelpCircle className="w-6 h-6 text-primary" />}
        </button>

        {supportOpen && (
          <div className="absolute bottom-16 right-0 w-80 bg-surface-raised backdrop-blur-xl border border-border rounded-2xl shadow-2xl overflow-hidden">
            <div className="p-4 border-b border-border">
              <h3 className="text-sm font-semibold text-primary">Leave Administration Support</h3>
              <p className="text-xs text-secondary mt-1">GCSO Human Resources Division</p>
            </div>
            <div className="p-4 space-y-3">
              <div className="p-3 bg-white dark:bg-zinc-900/40 rounded-lg hover:bg-slate-100 dark:hover:bg-zinc-900/60 cursor-pointer transition-colors">
                <p className="text-sm font-medium text-primary">Leave Administration</p>
                <p className="text-xs text-secondary">C. Nguyen, HR Specialist</p>
                <p className="text-xs text-amber-700 mt-1">Ext. 4510</p>
              </div>
              <div className="p-3 bg-white dark:bg-zinc-900/40 rounded-lg hover:bg-slate-100 dark:hover:bg-zinc-900/60 cursor-pointer transition-colors">
                <p className="text-sm font-medium text-primary">HR Director</p>
                <p className="text-xs text-secondary">Leave policy, FMLA compliance</p>
                <p className="text-xs text-amber-700 mt-1">Ext. 4500</p>
              </div>
              <div className="p-3 bg-white dark:bg-zinc-900/40 rounded-lg hover:bg-slate-100 dark:hover:bg-zinc-900/60 cursor-pointer transition-colors">
                <p className="text-sm font-medium text-primary">Payroll Department</p>
                <p className="text-xs text-secondary">Leave balances, pay during leave</p>
                <p className="text-xs text-amber-700 mt-1">Ext. 4530</p>
              </div>
              <div className="p-3 bg-white dark:bg-zinc-900/40 rounded-lg hover:bg-slate-100 dark:hover:bg-zinc-900/60 cursor-pointer transition-colors">
                <p className="text-sm font-medium text-primary">FMLA Resources</p>
                <p className="text-xs text-secondary">DOL guidelines, WH forms</p>
              </div>
              <div className="p-3 bg-white dark:bg-zinc-900/40 rounded-lg hover:bg-slate-100 dark:hover:bg-zinc-900/60 cursor-pointer transition-colors">
                <p className="text-sm font-medium text-primary">GCSO Leave Policies</p>
                <p className="text-xs text-secondary">Annual, sick, personal, FMLA</p>
              </div>
            </div>
          </div>
        )}
      </div>
      </div>
    </DashboardLayout>
  );
}

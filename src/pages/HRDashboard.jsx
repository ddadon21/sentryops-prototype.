import React, { useState, useEffect } from 'react';
import {
  Users, FileText, LayoutDashboard, TrendingUp, Settings, Bell, MessageCircle,
  Search, ChevronRight, CheckCircle, Shield, Sparkles, X, Send, Menu, ChevronLeft,
  LogOut, UserPlus, Briefcase, Clock, Award, AlertTriangle, Calendar, FileCheck,
  ChevronDown, ChevronUp, User, AlertCircle, Building, Phone, Mail, MapPin,
  Scale, FileWarning, Heart, DollarSign, Activity, ClipboardList, Printer,
  Download, ExternalLink, UserCheck, BadgeCheck, GraduationCap, ClipboardCheck
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function HRDashboard() {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState('hr-dashboard');
  const [chatOpen, setChatOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [logoutConfirmOpen, setLogoutConfirmOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    certifications: true,
    onboarding: true,
    fmla: true,
    disciplinary: false
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
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
    { id: 'hr-dashboard', label: 'HR Dashboard', icon: Users },
    { id: 'job-postings', label: 'Job Postings', icon: Briefcase, page: 'JobPostings' },
    { id: 'applicant-tracking', label: 'Applicant Tracking', icon: UserPlus, page: 'ApplicantTracking' },
    { id: 'hiring-pipeline', label: 'Hiring Pipeline', icon: TrendingUp, page: 'HiringPipeline' },
    { id: 'compliance', label: 'HR Compliance', icon: ClipboardCheck, page: 'ComplianceManagement' },
    { id: 'onboarding', label: 'New Hire Onboarding', icon: FileCheck, page: 'NewHireOnboarding' },
    { id: 'training-certifications', label: 'Training & Certifications', icon: GraduationCap, page: 'TrainingCertifications' },
    { id: 'employee-records', label: 'Employee Records', icon: FileText, page: 'EmployeeRecords' },
    { id: 'time-off', label: 'Time Off Management', icon: Calendar, page: 'TimeOffManagement' },
    { id: 'performance', label: 'Performance Reviews', icon: Award, page: 'PerformanceReviews' },
    { id: 'hr-reports', label: 'HR Reports', icon: LayoutDashboard, page: 'HRReports' }
  ];

  const notifications = [
    { id: 1, title: 'FMLA Deadline Overdue', message: 'Deputy R. Martinez FMLA request - 48-hour federal deadline passed', time: '1 hour ago', urgent: true },
    { id: 2, title: 'POST Certification Critical', message: 'Sgt. K. Thompson - certification expires in 13 days, training not scheduled', time: '2 hours ago', urgent: true },
    { id: 3, title: 'Disciplinary Hearing Tomorrow', message: 'Deputy L. Thompson pre-disciplinary hearing - Feb 04, 10:00 AM', time: '3 hours ago', urgent: true },
    { id: 4, title: 'New Hire Documents Pending', message: 'Deputy Sarah Mitchell - I-9 and tax forms due before Feb 10 start date', time: '4 hours ago', urgent: false },
    { id: 5, title: 'Performance Evals Overdue', message: '23 annual evaluations past due date - supervisor meeting scheduled', time: '1 day ago', urgent: true }
  ];

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const currentTime = new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });

  // Certification data
  const expiringCertifications = [
    {
      id: 1,
      name: 'Deputy M. Rodriguez',
      badge: '#2847',
      certType: 'Basic POST',
      expires: 'February 28, 2026',
      daysLeft: 26,
      trainingStatus: 'Training scheduled Feb 10-14, 2026 (GPSTC-Atlanta)',
      renewalApp: 'Submitted to GA POST 01/15/2026',
      postApproval: 'Pending (typical processing: 14-21 days)',
      actionRequired: 'Verify training attendance, submit proof to POST by Feb 18, 2026',
      supervisor: 'Sgt. Williams (Patrol Division)',
      status: 'on-track'
    },
    {
      id: 2,
      name: 'Sgt. K. Thompson',
      badge: '#2193',
      certType: 'Intermediate POST',
      expires: 'February 15, 2026',
      daysLeft: 13,
      trainingStatus: 'CRITICAL - Training not yet scheduled',
      renewalApp: 'NOT SUBMITTED',
      postApproval: 'N/A',
      actionRequired: 'URGENT - Schedule training immediately, submit renewal application to POST by Feb 5, 2026 (3 days)',
      supervisor: 'Lt. Davis (Criminal Investigations)',
      coveragePlan: 'Sgt. Martinez assigned to cover CID shifts if certification lapses',
      status: 'critical'
    },
    {
      id: 3,
      name: 'Deputy J. Chen',
      badge: '#3012',
      certType: 'Basic POST + Firearms Instructor',
      expires: 'March 08, 2026 (Basic) / February 22, 2026 (Firearms)',
      daysLeft: 20,
      trainingStatus: 'Basic POST training scheduled, Firearms renewal requires 16-hour instructor recertification',
      renewalApp: 'Basic POST submitted, Firearms pending',
      postApproval: 'Basic POST pending',
      actionRequired: 'Enroll in Firearms Instructor Recert by Feb 8, 2026 - affects training division operations',
      supervisor: 'Training Division Commander',
      status: 'attention'
    }
  ];

  // New hire onboarding data
  const newHireOnboarding = [
    {
      id: 1,
      name: 'Deputy Sarah Mitchell',
      position: 'Patrol Deputy (Shift C) - Sworn Personnel',
      startDate: 'February 10, 2026',
      daysUntilStart: 8,
      hiringAuthority: "Sheriff's Order #2026-014 (01/20/2026)",
      backgroundComplete: '01/28/2026 (Investigator: Lt. Hayes)',
      postCert: 'Verified - Basic POST #GA-45829 (Valid through 08/15/2027)',
      outstandingDocs: [
        { doc: 'I-9 Employment Eligibility', due: 'First day of work', status: 'Section 1 completed, Section 2 pending (ID docs)', action: 'Verify documents on or before 02/10/2026' },
        { doc: 'W-4 Federal Tax Withholding', due: 'First payroll', status: 'Not submitted', action: 'Complete before 02/10/2026' },
        { doc: 'GA G-4 State Tax Withholding', due: 'First payroll', status: 'Not submitted', action: 'Complete before 02/10/2026' },
        { doc: 'Direct Deposit Authorization', due: 'First payroll', status: 'Not submitted', action: 'Complete before 02/10/2026' },
        { doc: 'Benefits Enrollment', due: '30 days from start', status: 'Enrollment packet sent 01/25/2026, not returned', action: 'Follow up by 02/05/2026 (must enroll by 03/12)' }
      ],
      completedItems: [
        'POST Certification Verification - COMPLETED 01/28/2026',
        'Background Investigation - COMPLETED 01/28/2026',
        'Oath of Office Scheduled - 02/10/2026, 08:00 (Sheriff)',
        'Uniform/Equipment Requisition - Submitted to Supply',
        'Firearm Assignment - Glock 17 Gen5 (#GC47829) assigned',
        'Radio Assignment - Unit 3-Charlie-47 assigned',
        'Patrol Vehicle Assignment - Unit 347 assigned (Shift C)',
        'Field Training Officer: Deputy M. Rodriguez (8-week FTO)'
      ]
    },
    {
      id: 2,
      name: 'Records Clerk David Park',
      position: 'Records Division Clerk - Civilian Personnel',
      startDate: 'February 12, 2026',
      daysUntilStart: 10,
      hiringAuthority: 'Department Order #2026-022 (01/28/2026)',
      backgroundComplete: '01/30/2026 (Investigator: Cpl. Adams)',
      gcicAccess: 'Security clearance approved 01/31/2026',
      outstandingDocs: [
        { doc: 'I-9 Employment Eligibility', due: '02/12/2026', status: 'Not started', action: 'Send forms' },
        { doc: 'W-4 Federal Tax Withholding', due: 'First payroll', status: 'Not submitted', action: 'Send forms' },
        { doc: 'GA G-4 State Tax Withholding', due: 'First payroll', status: 'Not submitted', action: 'Send forms' },
        { doc: 'Direct Deposit Authorization', due: 'First payroll', status: 'Not submitted', action: 'Send forms' },
        { doc: 'GCIC/NCIC Security Agreement', due: 'Before system access', status: 'Not submitted', action: 'Required before work' },
        { doc: 'Confidentiality Agreement', due: 'Before system access', status: 'Not submitted', action: 'Required before work' },
        { doc: 'Benefits Enrollment', due: '30 days from start', status: 'Packet not sent', action: 'Send enrollment packet' }
      ],
      completedItems: [
        'Background Investigation - COMPLETED 01/30/2026',
        'GCIC/NCIC Security Clearance - APPROVED 01/31/2026',
        'Employee Oath (Civilian) - Scheduled 02/12/2026, 09:00',
        'Records Division Training Plan - Assigned to J. Martinez'
      ]
    },
    {
      id: 3,
      name: 'Dispatcher Lisa Rodriguez',
      position: '911 Communications Dispatcher - Civilian Personnel',
      startDate: 'February 14, 2026',
      daysUntilStart: 12,
      hiringAuthority: 'Department Order #2026-025 (02/01/2026)',
      backgroundComplete: '02/01/2026 (Investigator: Cpl. Adams)',
      gcicAccess: 'Security clearance approved 02/02/2026',
      outstandingDocs: [
        { doc: 'I-9 Employment Eligibility', due: '02/14/2026', status: 'Not started', action: 'Send forms' },
        { doc: 'W-4 Federal Tax Withholding', due: 'First payroll', status: 'Not submitted', action: 'Send forms' },
        { doc: 'GA G-4 State Tax Withholding', due: 'First payroll', status: 'Not submitted', action: 'Send forms' },
        { doc: 'Direct Deposit Authorization', due: 'First payroll', status: 'Not submitted', action: 'Send forms' },
        { doc: 'GCIC/NCIC Security Agreement', due: 'Before system access', status: 'Not submitted', action: 'Required before work' },
        { doc: 'Confidentiality Agreement', due: 'Before system access', status: 'Not submitted', action: 'Required before work' },
        { doc: 'Benefits Enrollment', due: '30 days from start', status: 'Packet not sent', action: 'Send enrollment packet' }
      ],
      completedItems: [
        'Background Investigation - COMPLETED 02/01/2026',
        'GCIC/NCIC Security Clearance - APPROVED 02/02/2026',
        'Employee Oath (Civilian) - Scheduled 02/14/2026, 09:00',
        'Communications Training Plan - 12-week program, Trainer: Lead Dispatcher K. Thompson'
      ]
    }
  ];

  // FMLA requests data
  const fmlaRequests = [
    {
      id: 1,
      name: 'Deputy R. Martinez',
      badge: '#2756',
      position: 'Patrol Deputy (Shift A)',
      requestReceived: 'January 30, 2026 10:15 AM',
      federalDeadline: 'February 01, 2026 10:15 AM',
      overdueBy: '1 day, 11 hours, 32 minutes',
      leaveType: 'Intermittent Leave',
      reason: 'Serious health condition (requires medical cert)',
      requestedLeave: 'Intermittent leave, up to 2 days/week for medical appointments (anticipated 12-week duration)',
      eligibility: {
        employed12Months: { met: true, detail: 'Yes (hired 03/15/2022)' },
        worked1250Hours: { met: true, detail: 'Yes (2,080 hours)' },
        worksite50Employees: { met: true, detail: 'Yes (178 employees)' }
      },
      fmlaBalance: '12 weeks available (no prior FMLA usage)',
      medicalCert: 'Submitted 01/30/2026 (Dr. J. Kim) - Certification appears complete, serious health condition verified',
      coveragePlan: 'Shift Commander notified, overtime pool activated for coverage (Deputies Jackson, Williams available)',
      status: 'overdue'
    },
    {
      id: 2,
      name: 'Dispatcher K. Johnson',
      badge: '#4012',
      position: '911 Communications Dispatcher (Shift B)',
      requestReceived: 'February 01, 2026 02:30 PM',
      federalDeadline: 'February 03, 2026 02:30 PM',
      hoursLeft: 23,
      leaveType: 'Continuous Leave',
      reason: 'Childbirth and bonding with newborn',
      requestedLeave: 'Continuous leave, 12 weeks starting February 17, 2026 (anticipated due date)',
      eligibility: {
        employed12Months: { met: true, detail: 'Yes (hired 06/01/2023)' },
        worked1250Hours: { met: true, detail: 'Yes (2,040 hours)' },
        worksite50Employees: { met: true, detail: 'Yes (178 employees)' }
      },
      fmlaBalance: '12 weeks available (no prior FMLA usage)',
      medicalCert: 'Submitted 02/01/2026 (Dr. S. Patel) - Anticipated delivery date: February 17, 2026',
      coveragePlan: 'Communications Supervisor notified, part-time dispatcher M. Lewis available for temporary full-time assignment',
      status: 'pending'
    },
    {
      id: 3,
      name: 'Cpl. T. Anderson',
      badge: '#2534',
      position: 'Criminal Investigations Corporal',
      requestReceived: 'February 02, 2026 09:00 AM',
      federalDeadline: 'February 04, 2026 09:00 AM',
      hoursLeft: 48,
      leaveType: 'Intermittent Leave',
      reason: 'Care for spouse with serious health condition',
      requestedLeave: 'Intermittent leave, up to 3 days/month for spouse medical appointments and care (12-week duration)',
      eligibility: {
        employed12Months: { met: true, detail: 'Yes (hired 08/10/2019)' },
        worked1250Hours: { met: true, detail: 'Yes (2,100 hours)' },
        worksite50Employees: { met: true, detail: 'Yes (178 employees)' }
      },
      fmlaBalance: '9 weeks available (3 weeks used in 2025 for spouse\'s previous hospitalization)',
      medicalCert: 'Submitted 02/02/2026 (Dr. M. Cohen) - Serious health condition of spouse verified, care provider status confirmed',
      coveragePlan: 'Investigations Supervisor notified, case assignments adjusted during anticipated absence periods',
      status: 'pending'
    }
  ];

  // Disciplinary hearings data
  const disciplinaryHearings = [
    {
      id: 1,
      type: 'Pre-Disciplinary Hearing',
      employee: 'Deputy L. Thompson',
      badge: '#3156',
      hearingDate: 'February 04, 2026',
      hearingTime: '10:00 AM',
      location: 'Conference Room B',
      hearingOfficer: 'Major R. Davis (Internal Affairs Commander)',
      violation: 'Policy 3.12 - Use of Force Reporting (Failure to document use of force within required timeframe)',
      incidentDate: 'January 15, 2026',
      incidentDetails: 'Traffic stop / suspect resistance / OC spray deployed / report filed 36 hours late',
      investigation: 'Completed by Sgt. K. Williams (IA) 01/28/2026, Case #IA-2026-0015',
      proposedDiscipline: 'Written reprimand',
      priorDiscipline: 'None (clean record, 4 years service)',
      unionRep: 'Deputy requested FOP representation (Officer M. Jackson assigned)',
      dueProcessDocs: [
        { item: 'Notice of charges provided', date: '01/30/2026', status: 'complete' },
        { item: 'Investigation report provided', date: '01/30/2026', status: 'complete' },
        { item: 'Policy violations cited', date: '01/30/2026', status: 'complete' },
        { item: 'Proposed discipline disclosed', date: '01/30/2026', status: 'complete' },
        { item: 'Right to union representation', date: '01/30/2026', status: 'complete' },
        { item: 'Hearing date/time/location', date: '01/30/2026', status: 'complete' },
        { item: 'Hearing officer preparation', date: 'Before hearing', status: 'pending' },
        { item: 'Recording equipment test', date: 'Before hearing', status: 'pending' },
        { item: 'Witness availability confirmed', date: 'Before hearing', status: 'pending' }
      ]
    },
    {
      id: 2,
      type: 'Disciplinary Appeal Hearing',
      employee: 'Dispatcher J. Williams',
      badge: '#4089',
      hearingDate: 'February 05, 2026',
      hearingTime: '2:00 PM',
      location: "Sheriff's Office",
      hearingOfficer: 'Chief Deputy S. Martinez',
      originalDiscipline: '3-day suspension without pay',
      violation: 'Policy 5.04 - Attendance / Unexcused absence',
      originalHearingDate: 'January 22, 2026',
      disciplineImposed: 'January 25, 2026 (Lt. Henderson)',
      appealFiled: 'January 29, 2026 (within 10-day window)',
      appealGrounds: 'Claims medical documentation was provided timely, absence should be excused under sick leave policy',
      unionRep: 'Communications Workers Union (CWU), Rep: S. Parker',
      appealDocs: [
        { item: 'Original investigation file', status: 'Available' },
        { item: 'Original hearing recording', status: 'Available (01/22/2026)' },
        { item: 'Written decision', status: 'Issued 01/25/2026 (Lt. Henderson)' },
        { item: 'Appeal letter', status: 'Filed 01/29/2026 (grounds stated)' },
        { item: 'New evidence submitted', status: 'Medical documentation from Dr. R. Kim dated 01/20/2026' },
        { item: 'Supervisor verification', status: 'PENDING - Need to confirm if medical doc was received prior to original hearing' }
      ],
      possibleOutcomes: [
        'Uphold original discipline (3-day suspension)',
        'Modify discipline (reduce to written reprimand if medical documentation supports excused absence)',
        'Overturn discipline (if proper notification was provided)'
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

  return (
    <div className="min-h-screen bg-[#F5F7FA] dark:bg-gradient-to-br dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 flex">
      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 border-r border-black/[0.06] dark:border-slate-800/50 bg-white dark:bg-slate-900/30 shadow-[var(--shadow-sidebar)] dark:shadow-none flex flex-col transform transition-all lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} ${sidebarCollapsed ? 'w-20' : 'w-64'}`}>
        <div className="p-4 border-b border-border flex items-center justify-between">
          {!sidebarCollapsed && (
            <div className="flex items-center gap-2">
              <Shield className="w-8 h-8 text-amber-700" />
              <h1 className="text-xl font-bold text-primary">SentryOps</h1>
            </div>
          )}
          {sidebarCollapsed && (
            <Shield className="w-8 h-8 text-amber-700 mx-auto" />
          )}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800/50 rounded-lg transition-colors hidden lg:block"
          >
            {sidebarCollapsed ? <ChevronRight className="w-5 h-5 text-secondary" /> : <ChevronLeft className="w-5 h-5 text-secondary" />}
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {navigation.map(item => {
            const Icon = item.icon;
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavigation(item)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive ? 'bg-amber-500 text-primary shadow-lg shadow-amber-500/20' : 'text-secondary hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-900 dark:hover:text-white'
                } ${sidebarCollapsed ? 'justify-center' : ''}`}
                title={sidebarCollapsed ? item.label : ''}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {!sidebarCollapsed && (
                  <span className="flex-1 text-left text-sm font-medium truncate">{item.label}</span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="border-t border-border">
          {!sidebarCollapsed && (
            <div className="px-4 py-3">
              <p className="text-xs text-slate-500 text-center">Gwinnett County Sheriff's Office</p>
            </div>
          )}

          <div className="p-4">
            <button
              onClick={() => setLogoutConfirmOpen(true)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-secondary hover:bg-slate-100 dark:hover:bg-slate-800/40 hover:text-slate-800 dark:hover:text-secondary dark:text-slate-300 ${sidebarCollapsed ? 'justify-center' : ''}`}
              title={sidebarCollapsed ? 'Sign Out' : ''}
            >
              <LogOut className="w-5 h-5 flex-shrink-0" />
              {!sidebarCollapsed && (
                <span className="flex-1 text-left text-sm font-medium">Sign Out</span>
              )}
            </button>
          </div>
        </div>
      </aside>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Logout Modal */}
      {logoutConfirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setLogoutConfirmOpen(false)} />
          <div className="relative bg-white dark:bg-slate-900 border border-border rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800/60 rounded-xl flex items-center justify-center">
                <LogOut className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-primary">Sign Out</h3>
                <p className="text-sm text-secondary">Are you sure you want to sign out?</p>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setLogoutConfirmOpen(false)} className="flex-1 px-4 py-2.5 bg-slate-100 dark:bg-slate-800/40 hover:bg-slate-200 dark:hover:bg-slate-800/60 border border-border rounded-xl text-primary font-medium transition-all">
                Cancel
              </button>
              <button onClick={handleLogout} className="flex-1 px-4 py-2.5 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/50 rounded-xl text-amber-700 dark:text-amber-400 font-medium transition-all">
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="border-b border-black/[0.06] dark:border-slate-800/50 backdrop-blur-md bg-[#F8FAFC]/90 dark:bg-slate-900/30 shadow-[var(--shadow-nav)] dark:shadow-none">
          <div className="px-4 lg:px-6 py-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4 flex-1 min-w-0">
              <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden p-2 hover:bg-slate-100 dark:hover:bg-slate-800/50 rounded-lg">
                <Menu className="w-5 h-5 text-secondary" />
              </button>
              <div className="flex-1 max-w-xl relative hidden sm:block">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input type="text" placeholder="Search employees, applicants, positions..." className="w-full pl-12 pr-4 py-2 bg-white dark:bg-slate-800/40 border border-border rounded-xl text-primary placeholder-slate-400 dark:placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-amber-500/50" />
              </div>
            </div>
            <div className="flex items-center gap-2 lg:gap-3">
              <div className="relative notifications-container">
                <button onClick={() => setNotificationsOpen(!notificationsOpen)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800/50 rounded-lg relative">
                  <Bell className="w-5 h-5 text-secondary" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>

                {notificationsOpen && (
                  <div className="absolute right-0 top-full mt-2 w-96 bg-surface-raised backdrop-blur-xl border border-border rounded-xl shadow-2xl z-50">
                    <div className="p-4 border-b border-border">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-semibold text-primary">Notifications</h3>
                        <span className="px-2 py-0.5 bg-red-500/20 border border-red-500/30 text-red-700 dark:text-red-400 text-xs rounded-full">{notifications.filter(n => n.urgent).length} urgent</span>
                      </div>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.map(notification => (
                        <div key={notification.id} className={`p-4 border-b border-slate-100 dark:border-border hover:bg-slate-50 dark:hover:bg-slate-800/30 cursor-pointer transition-colors ${notification.urgent ? 'bg-red-500/5' : ''}`}>
                          <div className="flex items-start gap-3">
                            <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${notification.urgent ? 'bg-red-400' : 'bg-blue-400'}`}></div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-primary mb-1">{notification.title}</p>
                              <p className="text-xs text-secondary mb-2">{notification.message}</p>
                              <p className="text-xs text-slate-500">{notification.time}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-3 border-t border-border">
                      <button className="w-full text-center text-sm text-amber-700 dark:text-amber-400 hover:text-amber-300 font-medium">View All Notifications</button>
                    </div>
                  </div>
                )}
              </div>

              <div className="h-8 w-px bg-white dark:bg-slate-700/50"></div>

              <div className="relative profile-menu-container">
                <button onClick={() => setProfileMenuOpen(!profileMenuOpen)} className="flex items-center gap-3 p-1.5 pr-3 hover:bg-white dark:bg-slate-800/50 rounded-xl transition-colors">
                  <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center">
                    <span className="text-primary text-sm font-bold">HR</span>
                  </div>
                  <div className="hidden sm:block text-left">
                    <p className="text-sm font-medium text-primary">HR Director</p>
                    <p className="text-xs text-secondary">Human Resources</p>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-secondary hidden sm:block transition-transform ${profileMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {profileMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-56 bg-surface-raised backdrop-blur-xl border border-border rounded-xl shadow-2xl z-50 py-2">
                    <div className="px-4 py-3 border-b border-border">
                      <p className="text-sm font-medium text-primary">HR Director</p>
                      <p className="text-xs text-secondary">hr.director@gcso.gov</p>
                    </div>
                    <div className="py-1">
                      <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-secondary hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors">
                        <User className="w-4 h-4" />
                        View Profile
                      </button>
                      <button onClick={() => navigate(createPageUrl('HRSettings'))} className="w-full flex items-center gap-3 px-4 py-2 text-sm text-secondary hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors">
                        <Settings className="w-4 h-4" />
                        Settings
                      </button>
                    </div>
                    <div className="border-t border-border py-1">
                      <button onClick={() => setLogoutConfirmOpen(true)} className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-700 dark:text-red-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors">
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          {/* Page Header */}
          <div className="mb-6">
            <h2 className="text-2xl lg:text-3xl font-bold text-primary mb-2">Human Resources Operations Center</h2>
            <p className="text-secondary mb-4">Gwinnett County Sheriff's Office • {currentDate} • {currentTime} EST</p>

            <div className="bg-white dark:bg-slate-800/40 border border-border rounded-xl shadow-sm dark:shadow-none p-4 mb-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div>
                  <p className="text-xs text-slate-500 mb-1">HR Director</p>
                  <p className="text-sm text-primary font-medium">[Name]</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1">Personnel</p>
                  <p className="text-sm text-primary font-medium">178 total (164 sworn, 14 civilian)</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1">Last Updated</p>
                  <p className="text-sm text-primary font-medium">{currentTime} EST</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1">System</p>
                  <p className="text-sm text-primary font-medium">GCSO-HRIS v4.2</p>
                </div>
              </div>
            </div>

            {/* Alert Banner */}
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-700 dark:text-red-400" />
                  <span className="text-sm text-red-700 dark:text-red-400 font-medium">3 POST certifications expire within 30 days - renewal required</span>
                </div>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-700 dark:text-red-400" />
                  <span className="text-sm text-red-700 dark:text-red-400 font-medium">3 FMLA leave requests pending approval (48-hour response required)</span>
                </div>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-700 dark:text-red-400" />
                  <span className="text-sm text-red-700 dark:text-red-400 font-medium">2 disciplinary hearings scheduled this week - documentation review required</span>
                </div>
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-700 dark:text-amber-400" />
                  <span className="text-sm text-amber-700 dark:text-amber-400 font-medium">Annual performance evaluations: 23 overdue (&gt;90 days past due date)</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap gap-2">
              <button className="px-4 py-2 bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-400 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 border border-amber-500/20">
                <FileText className="w-4 h-4" />
                Personnel Action Form
              </button>
              <button className="px-4 py-2 bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-400 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 border border-amber-500/20">
                <ClipboardList className="w-4 h-4" />
                Workers' Comp Incident
              </button>
              <button className="px-4 py-2 bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-400 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 border border-amber-500/20">
                <Scale className="w-4 h-4" />
                Disciplinary Action
              </button>
              <button className="px-4 py-2 bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-400 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 border border-amber-500/20">
                <Download className="w-4 h-4" />
                Compliance Audit Export
              </button>
            </div>
          </div>

          {/* Critical Actions Queue */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="w-6 h-6 text-red-700 dark:text-red-400" />
              <h3 className="text-xl font-bold text-primary">CRITICAL ACTIONS - IMMEDIATE ATTENTION REQUIRED</h3>
            </div>

            {/* POST Certifications */}
            <div className="bg-white dark:bg-slate-800/40 border border-border rounded-xl mb-4 overflow-hidden">
              <button
                onClick={() => toggleSection('certifications')}
                className="w-full p-4 flex items-center justify-between hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-500/20 rounded-xl flex items-center justify-center">
                    <Award className="w-5 h-5 text-red-700 dark:text-red-400" />
                  </div>
                  <div className="text-left">
                    <h4 className="text-base font-semibold text-red-700 dark:text-red-400">CERTIFICATION COMPLIANCE - POST REQUIREMENTS</h4>
                    <p className="text-sm text-secondary">3 POST Certifications Expiring Within 30 Days</p>
                  </div>
                </div>
                {expandedSections.certifications ? <ChevronUp className="w-5 h-5 text-secondary" /> : <ChevronDown className="w-5 h-5 text-secondary" />}
              </button>

              {expandedSections.certifications && (
                <div className="p-4 border-t border-border space-y-4">
                  {expiringCertifications.map((cert, idx) => (
                    <div key={cert.id} className={`p-4 rounded-xl ${
                      cert.status === 'critical' ? 'bg-red-500/10 border border-red-500/30' :
                      cert.status === 'attention' ? 'bg-amber-500/10 border border-amber-500/30' :
                      'bg-white dark:bg-slate-900/40 border border-slate-700/50'
                    }`}>
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h5 className="text-sm font-semibold text-primary">{cert.name} ({cert.badge}) - {cert.certType}</h5>
                          <p className="text-xs text-secondary">Supervisor: {cert.supervisor}</p>
                        </div>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          cert.status === 'critical' ? 'bg-red-500/20 text-red-700 dark:text-red-400' :
                          cert.status === 'attention' ? 'bg-amber-500/20 text-amber-700 dark:text-amber-400' :
                          'bg-green-500/20 text-green-600 dark:text-green-400'
                        }`}>
                          {cert.daysLeft} days
                        </span>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-start gap-2">
                          <span className="text-slate-500">•</span>
                          <span className="text-secondary">Current Cert Expires:</span>
                          <span className="text-primary">{cert.expires}</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-slate-500">•</span>
                          <span className="text-secondary">Status:</span>
                          <span className={cert.status === 'critical' ? 'text-red-700 dark:text-red-400 font-medium' : 'text-primary'}>{cert.trainingStatus}</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-slate-500">•</span>
                          <span className="text-secondary">Renewal Application:</span>
                          <span className={cert.renewalApp === 'NOT SUBMITTED' ? 'text-red-700 dark:text-red-400 font-medium' : 'text-primary'}>{cert.renewalApp}</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-slate-500">•</span>
                          <span className="text-secondary">Action Required:</span>
                          <span className={cert.status === 'critical' ? 'text-red-700 dark:text-red-400 font-medium' : 'text-amber-700 dark:text-amber-400'}>{cert.actionRequired}</span>
                        </div>
                        {cert.coveragePlan && (
                          <div className="flex items-start gap-2">
                            <span className="text-slate-500">•</span>
                            <span className="text-secondary">Coverage Plan:</span>
                            <span className="text-primary">{cert.coveragePlan}</span>
                          </div>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-border">
                        <button className="px-3 py-1.5 bg-white dark:bg-slate-700/50 hover:bg-slate-700/70 text-secondary rounded-lg text-xs font-medium transition-colors">
                          View Full Certification Record
                        </button>
                        <button className="px-3 py-1.5 bg-white dark:bg-slate-700/50 hover:bg-slate-700/70 text-secondary rounded-lg text-xs font-medium transition-colors">
                          Contact Deputy
                        </button>
                        <button className="px-3 py-1.5 bg-white dark:bg-slate-700/50 hover:bg-slate-700/70 text-secondary rounded-lg text-xs font-medium transition-colors flex items-center gap-1">
                          <ExternalLink className="w-3 h-3" />
                          POST Portal
                        </button>
                        {cert.status === 'critical' && (
                          <button className="px-3 py-1.5 bg-red-500/20 hover:bg-red-500/30 text-red-700 dark:text-red-400 rounded-lg text-xs font-medium transition-colors">
                            URGENT: Schedule Training
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* New Hire Onboarding */}
            <div className="bg-white dark:bg-slate-800/40 border border-border rounded-xl mb-4 overflow-hidden">
              <button
                onClick={() => toggleSection('onboarding')}
                className="w-full p-4 flex items-center justify-between hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-500/20 rounded-xl flex items-center justify-center">
                    <UserPlus className="w-5 h-5 text-red-700 dark:text-red-400" />
                  </div>
                  <div className="text-left">
                    <h4 className="text-base font-semibold text-red-700 dark:text-red-400">NEW HIRE ONBOARDING - LEGAL COMPLIANCE DEADLINES</h4>
                    <p className="text-sm text-secondary">3 New Hires - Documentation Due This Week</p>
                  </div>
                </div>
                {expandedSections.onboarding ? <ChevronUp className="w-5 h-5 text-secondary" /> : <ChevronDown className="w-5 h-5 text-secondary" />}
              </button>

              {expandedSections.onboarding && (
                <div className="p-4 border-t border-border space-y-4">
                  {newHireOnboarding.map((hire) => (
                    <div key={hire.id} className="bg-white dark:bg-slate-900/40 border border-border rounded-xl p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h5 className="text-sm font-semibold text-primary">{hire.name}</h5>
                          <p className="text-xs text-secondary">{hire.position}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-amber-700 dark:text-amber-400 font-medium">Start Date: {hire.startDate}</p>
                          <p className="text-xs text-secondary">{hire.daysUntilStart} days until start</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 text-sm">
                        <div>
                          <span className="text-secondary">Hiring Authority:</span>
                          <span className="text-primary ml-2">{hire.hiringAuthority}</span>
                        </div>
                        <div>
                          <span className="text-secondary">Background:</span>
                          <span className="text-primary ml-2">Completed {hire.backgroundComplete}</span>
                        </div>
                        {hire.postCert && (
                          <div className="md:col-span-2">
                            <span className="text-secondary">POST Certification:</span>
                            <span className="text-green-600 dark:text-green-400 ml-2">{hire.postCert}</span>
                          </div>
                        )}
                        {hire.gcicAccess && (
                          <div className="md:col-span-2">
                            <span className="text-secondary">GCIC/NCIC Access:</span>
                            <span className="text-green-600 dark:text-green-400 ml-2">{hire.gcicAccess}</span>
                          </div>
                        )}
                      </div>

                      <div className="mb-4">
                        <p className="text-xs font-semibold text-amber-700 dark:text-amber-400 mb-2">OUTSTANDING REQUIRED DOCUMENTS (Legal Deadlines):</p>
                        <div className="space-y-2">
                          {hire.outstandingDocs.map((doc, idx) => (
                            <div key={idx} className="flex items-start gap-2 text-sm">
                              <span className="text-slate-500">□</span>
                              <div className="flex-1">
                                <span className="text-primary">{doc.doc}</span>
                                <span className="text-secondary ml-2">- DUE: {doc.due}</span>
                                <p className="text-xs text-slate-500">Status: {doc.status}</p>
                                <p className="text-xs text-amber-700 dark:text-amber-400">Action: {doc.action}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <p className="text-xs font-semibold text-green-600 dark:text-green-400 mb-2">COMPLETED ITEMS:</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
                          {hire.completedItems.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-xs text-secondary">
                              <CheckCircle className="w-3 h-3 text-green-600 dark:text-green-400" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mt-4 pt-3 border-t border-border">
                        <button className="px-3 py-1.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-700 dark:text-amber-400 rounded-lg text-xs font-medium transition-colors flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          Send Document Reminder Email
                        </button>
                        <button className="px-3 py-1.5 bg-white dark:bg-slate-700/50 hover:bg-slate-700/70 text-secondary rounded-lg text-xs font-medium transition-colors">
                          View Full Onboarding Checklist
                        </button>
                        <button className="px-3 py-1.5 bg-white dark:bg-slate-700/50 hover:bg-slate-700/70 text-secondary rounded-lg text-xs font-medium transition-colors">
                          Contact New Hire
                        </button>
                        <button className="px-3 py-1.5 bg-white dark:bg-slate-700/50 hover:bg-slate-700/70 text-secondary rounded-lg text-xs font-medium transition-colors flex items-center gap-1">
                          <Printer className="w-3 h-3" />
                          Print I-9 Form
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* FMLA Leave Requests */}
            <div className="bg-white dark:bg-slate-800/40 border border-border rounded-xl mb-4 overflow-hidden">
              <button
                onClick={() => toggleSection('fmla')}
                className="w-full p-4 flex items-center justify-between hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-500/20 rounded-xl flex items-center justify-center">
                    <Heart className="w-5 h-5 text-red-700 dark:text-red-400" />
                  </div>
                  <div className="text-left">
                    <h4 className="text-base font-semibold text-red-700 dark:text-red-400">FMLA LEAVE REQUESTS - FEDERAL LAW COMPLIANCE (48-HOUR RESPONSE)</h4>
                    <p className="text-sm text-secondary">3 FMLA Leave Requests Pending HR Review & Approval</p>
                  </div>
                </div>
                {expandedSections.fmla ? <ChevronUp className="w-5 h-5 text-secondary" /> : <ChevronDown className="w-5 h-5 text-secondary" />}
              </button>

              {expandedSections.fmla && (
                <div className="p-4 border-t border-border space-y-4">
                  {fmlaRequests.map((request) => (
                    <div key={request.id} className={`p-4 rounded-xl ${
                      request.status === 'overdue' ? 'bg-red-500/10 border border-red-500/30' : 'bg-white dark:bg-slate-900/40 border border-slate-700/50'
                    }`}>
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h5 className="text-sm font-semibold text-primary">{request.name} ({request.badge}) - FMLA {request.leaveType} Request</h5>
                          <p className="text-xs text-secondary">{request.position}</p>
                        </div>
                        {request.status === 'overdue' ? (
                          <span className="px-2 py-1 bg-red-500/20 text-red-700 dark:text-red-400 rounded text-xs font-medium">
                            OVERDUE BY: {request.overdueBy}
                          </span>
                        ) : (
                          <span className="px-2 py-1 bg-amber-500/20 text-amber-700 dark:text-amber-400 rounded text-xs font-medium">
                            {request.hoursLeft} hours left
                          </span>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4 text-sm">
                        <div>
                          <span className="text-secondary">Request Received:</span>
                          <span className="text-primary ml-2">{request.requestReceived}</span>
                        </div>
                        <div>
                          <span className="text-secondary">Federal Deadline:</span>
                          <span className={`ml-2 ${request.status === 'overdue' ? 'text-red-700 dark:text-red-400 font-medium' : 'text-amber-700 dark:text-amber-400'}`}>
                            {request.federalDeadline}
                          </span>
                        </div>
                        <div>
                          <span className="text-secondary">Reason:</span>
                          <span className="text-primary ml-2">{request.reason}</span>
                        </div>
                        <div>
                          <span className="text-secondary">Requested Leave:</span>
                          <span className="text-primary ml-2">{request.requestedLeave}</span>
                        </div>
                      </div>

                      <div className="mb-4 p-3 bg-white dark:bg-slate-800/40 rounded-lg">
                        <p className="text-xs font-semibold text-secondary mb-2">FMLA ELIGIBILITY:</p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-3 h-3 text-green-600 dark:text-green-400" />
                            <span className="text-secondary">Employed 12+ months:</span>
                            <span className="text-primary">{request.eligibility.employed12Months.detail}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-3 h-3 text-green-600 dark:text-green-400" />
                            <span className="text-secondary">Worked 1,250 hours:</span>
                            <span className="text-primary">{request.eligibility.worked1250Hours.detail}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-3 h-3 text-green-600 dark:text-green-400" />
                            <span className="text-secondary">Worksite 50+ employees:</span>
                            <span className="text-primary">{request.eligibility.worksite50Employees.detail}</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2 text-sm mb-4">
                        <div className="flex items-start gap-2">
                          <span className="text-slate-500">•</span>
                          <span className="text-secondary">FMLA Balance:</span>
                          <span className="text-primary">{request.fmlaBalance}</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-slate-500">•</span>
                          <span className="text-secondary">Medical Certification:</span>
                          <span className="text-primary">{request.medicalCert}</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-slate-500">•</span>
                          <span className="text-secondary">Coverage Plan:</span>
                          <span className="text-primary">{request.coveragePlan}</span>
                        </div>
                      </div>

                      <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg mb-4">
                        <p className="text-xs font-semibold text-amber-700 dark:text-amber-400 mb-2">ACTION REQUIRED{request.status === 'overdue' ? ' - URGENT (Federal deadline passed)' : ''}:</p>
                        <ul className="text-xs text-amber-200 space-y-1">
                          <li>• Complete FMLA Eligibility Notice (WH-381)</li>
                          <li>• Complete Rights & Responsibilities Notice (WH-381)</li>
                          <li>• Complete Designation Notice (WH-382)</li>
                          <li>• Notify payroll of {request.leaveType.toLowerCase()} leave approval</li>
                          <li>• Document in personnel file</li>
                          <li>• Email approval to employee & supervisor</li>
                        </ul>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <button className={`px-3 py-1.5 ${request.status === 'overdue' ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-green-500/20 hover:bg-green-500/30 text-green-600 dark:text-green-400'} rounded-lg text-xs font-medium transition-colors`}>
                          {request.status === 'overdue' ? '⚠️ APPROVE FMLA LEAVE' : 'APPROVE FMLA LEAVE'}
                        </button>
                        <button className="px-3 py-1.5 bg-white dark:bg-slate-700/50 hover:bg-slate-700/70 text-secondary rounded-lg text-xs font-medium transition-colors">
                          Generate FMLA Forms
                        </button>
                        <button className="px-3 py-1.5 bg-white dark:bg-slate-700/50 hover:bg-slate-700/70 text-secondary rounded-lg text-xs font-medium transition-colors">
                          View Medical Cert
                        </button>
                        <button className="px-3 py-1.5 bg-white dark:bg-slate-700/50 hover:bg-slate-700/70 text-secondary rounded-lg text-xs font-medium transition-colors">
                          Email Employee
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Disciplinary Hearings */}
            <div className="bg-white dark:bg-slate-800/40 border border-border rounded-xl mb-4 overflow-hidden">
              <button
                onClick={() => toggleSection('disciplinary')}
                className="w-full p-4 flex items-center justify-between hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-500/20 rounded-xl flex items-center justify-center">
                    <Scale className="w-5 h-5 text-red-700 dark:text-red-400" />
                  </div>
                  <div className="text-left">
                    <h4 className="text-base font-semibold text-red-700 dark:text-red-400">DISCIPLINARY HEARINGS - DUE PROCESS REQUIREMENTS</h4>
                    <p className="text-sm text-secondary">2 Disciplinary Hearings Scheduled This Week</p>
                  </div>
                </div>
                {expandedSections.disciplinary ? <ChevronUp className="w-5 h-5 text-secondary" /> : <ChevronDown className="w-5 h-5 text-secondary" />}
              </button>

              {expandedSections.disciplinary && (
                <div className="p-4 border-t border-border space-y-4">
                  {disciplinaryHearings.map((hearing) => (
                    <div key={hearing.id} className="bg-white dark:bg-slate-900/40 border border-border rounded-xl p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h5 className="text-sm font-semibold text-primary">{hearing.employee} ({hearing.badge}) - {hearing.type}</h5>
                          <p className="text-xs text-secondary">Hearing Officer: {hearing.hearingOfficer}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-amber-700 dark:text-amber-400 font-medium">{hearing.hearingDate} • {hearing.hearingTime}</p>
                          <p className="text-xs text-secondary">{hearing.location}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4 text-sm">
                        <div>
                          <span className="text-secondary">Alleged Violation:</span>
                          <span className="text-primary ml-2">{hearing.violation}</span>
                        </div>
                        {hearing.proposedDiscipline && (
                          <div>
                            <span className="text-secondary">Proposed Discipline:</span>
                            <span className="text-primary ml-2">{hearing.proposedDiscipline}</span>
                          </div>
                        )}
                        {hearing.originalDiscipline && (
                          <div>
                            <span className="text-secondary">Original Discipline:</span>
                            <span className="text-primary ml-2">{hearing.originalDiscipline}</span>
                          </div>
                        )}
                        {hearing.priorDiscipline && (
                          <div>
                            <span className="text-secondary">Prior Discipline:</span>
                            <span className="text-primary ml-2">{hearing.priorDiscipline}</span>
                          </div>
                        )}
                        <div>
                          <span className="text-secondary">Union Rep:</span>
                          <span className="text-primary ml-2">{hearing.unionRep}</span>
                        </div>
                      </div>

                      {hearing.dueProcessDocs && (
                        <div className="mb-4">
                          <p className="text-xs font-semibold text-secondary mb-2">DUE PROCESS DOCUMENTATION:</p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {hearing.dueProcessDocs.map((doc, idx) => (
                              <div key={idx} className="flex items-center gap-2 text-xs">
                                {doc.status === 'complete' ? (
                                  <CheckCircle className="w-3 h-3 text-green-600 dark:text-green-400" />
                                ) : (
                                  <span className="w-3 h-3 border border-amber-400 rounded-sm"></span>
                                )}
                                <span className={doc.status === 'complete' ? 'text-slate-500' : 'text-amber-700 dark:text-amber-400'}>
                                  {doc.item}: {doc.date}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {hearing.appealDocs && (
                        <div className="mb-4">
                          <p className="text-xs font-semibold text-secondary mb-2">APPEAL REVIEW DOCUMENTATION:</p>
                          <div className="space-y-1">
                            {hearing.appealDocs.map((doc, idx) => (
                              <div key={idx} className="flex items-start gap-2 text-xs">
                                <span className="text-slate-500">•</span>
                                <span className="text-secondary">{doc.item}:</span>
                                <span className={doc.status.includes('PENDING') ? 'text-amber-700 dark:text-amber-400' : 'text-primary'}>{doc.status}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {hearing.possibleOutcomes && (
                        <div className="mb-4 p-3 bg-white dark:bg-slate-800/40 rounded-lg">
                          <p className="text-xs font-semibold text-secondary mb-2">POSSIBLE OUTCOMES:</p>
                          <ul className="text-xs text-secondary space-y-1">
                            {hearing.possibleOutcomes.map((outcome, idx) => (
                              <li key={idx}>• {outcome}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <div className="flex flex-wrap gap-2">
                        <button className="px-3 py-1.5 bg-white dark:bg-slate-700/50 hover:bg-slate-700/70 text-secondary rounded-lg text-xs font-medium transition-colors">
                          View Investigation Report
                        </button>
                        <button className="px-3 py-1.5 bg-white dark:bg-slate-700/50 hover:bg-slate-700/70 text-secondary rounded-lg text-xs font-medium transition-colors">
                          View Policy
                        </button>
                        <button className="px-3 py-1.5 bg-white dark:bg-slate-700/50 hover:bg-slate-700/70 text-secondary rounded-lg text-xs font-medium transition-colors">
                          Hearing Preparation
                        </button>
                        <button className="px-3 py-1.5 bg-white dark:bg-slate-700/50 hover:bg-slate-700/70 text-secondary rounded-lg text-xs font-medium transition-colors">
                          Contact Employee
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Personnel Operations & Compliance Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Personnel Operations Summary */}
            <div className="bg-white dark:bg-slate-800/40 border border-border rounded-xl shadow-sm dark:shadow-none p-6">
              <h3 className="text-lg font-semibold text-primary mb-4">PERSONNEL OPERATIONS SUMMARY</h3>

              <div className="space-y-6">
                <div className="bg-white dark:bg-slate-900/40 rounded-xl p-4">
                  <h4 className="text-sm font-semibold text-amber-700 dark:text-amber-400 mb-3">AUTHORIZED POSITIONS & CURRENT STAFFING</h4>
                  <p className="text-2xl font-bold text-primary mb-2">178 <span className="text-sm font-normal text-secondary">Total Authorized</span></p>

                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="text-secondary font-medium">SWORN PERSONNEL (Law Enforcement)</p>
                      <div className="ml-4 space-y-1 text-xs text-secondary">
                        <p>• Authorized: 164 positions</p>
                        <p>• Filled: 152 positions (92.7% staffing level)</p>
                        <p>• Vacant: 12 positions (Patrol: 8, CID: 2, Court: 1, Training: 1)</p>
                        <p>• On Leave: 3 deputies (2 FMLA, 1 Military)</p>
                        <p>• Suspended: 1 deputy (pending IA investigation)</p>
                      </div>
                    </div>

                    <div>
                      <p className="text-secondary font-medium">CIVILIAN PERSONNEL (Non-Sworn)</p>
                      <div className="ml-4 space-y-1 text-xs text-secondary">
                        <p>• Authorized: 14 positions</p>
                        <p>• Filled: 12 positions (85.7% staffing level)</p>
                        <p>• Vacant: 2 positions (Dispatch: 1, Records: 1)</p>
                        <p>• On Leave: 1 employee (FMLA pending)</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-900/40 rounded-xl p-4">
                  <h4 className="text-sm font-semibold text-amber-700 dark:text-amber-400 mb-3">RECRUITMENT STATUS</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-secondary">Deputy Sheriff I/II (8 vacancies)</span>
                      <span className="text-primary">47 applicants</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-secondary">Detective - CID (2 vacancies)</span>
                      <span className="text-primary">12 applicants</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-secondary">911 Dispatcher (1 vacancy)</span>
                      <span className="text-primary">18 applicants</span>
                    </div>
                    <div className="pt-2 border-t border-border">
                      <div className="flex justify-between">
                        <span className="text-secondary">Background checks in progress</span>
                        <span className="text-amber-700 dark:text-amber-400 font-medium">12</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-secondary">Conditional offers extended</span>
                        <span className="text-green-600 dark:text-green-400 font-medium">4</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-secondary">Next oral board</span>
                        <span className="text-primary">Feb 06, 2026</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button onClick={() => navigate(createPageUrl('EmployeeRecords'))} className="px-3 py-1.5 bg-white dark:bg-slate-700/50 hover:bg-slate-700/70 text-secondary rounded-lg text-xs font-medium transition-colors">
                    View Detailed Org Chart
                  </button>
                  <button onClick={() => navigate(createPageUrl('JobPostings'))} className="px-3 py-1.5 bg-white dark:bg-slate-700/50 hover:bg-slate-700/70 text-secondary rounded-lg text-xs font-medium transition-colors">
                    Recruitment Status
                  </button>
                </div>
              </div>
            </div>

            {/* Compliance Monitoring */}
            <div className="bg-white dark:bg-slate-800/40 border border-border rounded-xl shadow-sm dark:shadow-none p-6">
              <h3 className="text-lg font-semibold text-primary mb-4">COMPLIANCE MONITORING - LEGAL REQUIREMENTS</h3>

              <div className="space-y-6">
                <div className="bg-white dark:bg-slate-900/40 rounded-xl p-4">
                  <h4 className="text-sm font-semibold text-green-600 dark:text-green-400 mb-3">POST CERTIFICATION STATUS (Sworn Personnel)</h4>
                  <p className="text-xs text-secondary mb-2">Georgia POST Certification Compliance: 100% REQUIRED</p>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-secondary">Current Status</span>
                      <span className="text-green-600 dark:text-green-400 font-bold">152/152 Current (100%)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-secondary">Basic POST</span>
                      <span className="text-primary">98 deputies</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-secondary">Intermediate POST</span>
                      <span className="text-primary">42 deputies</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-secondary">Advanced POST</span>
                      <span className="text-primary">12 deputies</span>
                    </div>
                    <div className="pt-2 border-t border-border">
                      <div className="flex justify-between">
                        <span className="text-amber-700 dark:text-amber-400">Expiring &lt;30 days</span>
                        <span className="text-amber-700 dark:text-amber-400 font-medium">3 deputies</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-secondary">Expiring 31-60 days</span>
                        <span className="text-primary">8 deputies</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-secondary">Expiring 61-90 days</span>
                        <span className="text-primary">12 deputies</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4">
                  <h4 className="text-sm font-semibold text-amber-700 dark:text-amber-400 mb-3">ANNUAL PERFORMANCE EVALUATIONS</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-secondary">2025 Evaluations Required</span>
                      <span className="text-primary">178</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-secondary">Completed</span>
                      <span className="text-green-600 dark:text-green-400">155 (87.1%)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-amber-700 dark:text-amber-400 font-medium">Overdue (&gt;90 days past due)</span>
                      <span className="text-red-700 dark:text-red-400 font-bold">23 (12.9%)</span>
                    </div>
                    <div className="pt-2 border-t border-amber-500/20 text-xs text-amber-200">
                      <p>Patrol Division: 14 overdue • CID: 5 overdue</p>
                      <p>Court Services: 2 overdue • Communications: 2 overdue</p>
                      <p className="mt-1 font-medium">Supervisor meeting scheduled Feb 05, 2026</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button onClick={() => navigate(createPageUrl('TrainingCertifications'))} className="px-3 py-1.5 bg-white dark:bg-slate-700/50 hover:bg-slate-700/70 text-secondary rounded-lg text-xs font-medium transition-colors">
                    View All POST Certifications
                  </button>
                  <button onClick={() => navigate(createPageUrl('PerformanceReviews'))} className="px-3 py-1.5 bg-white dark:bg-slate-700/50 hover:bg-slate-700/70 text-secondary rounded-lg text-xs font-medium transition-colors">
                    View Overdue Evaluations
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Key HR Metrics */}
          <div className="bg-white dark:bg-slate-800/40 border border-border rounded-xl shadow-sm dark:shadow-none p-6 mb-6">
            <h3 className="text-lg font-semibold text-primary mb-4">KEY HR METRICS (Informational - Last 30 Days)</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white dark:bg-slate-900/40 rounded-xl p-4">
                <h4 className="text-sm font-semibold text-secondary mb-3">STAFFING LEVELS</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-secondary">Total Authorized</span>
                    <span className="text-primary font-medium">178</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-secondary">Filled Positions</span>
                    <span className="text-primary font-medium">164</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-secondary">Vacant Positions</span>
                    <span className="text-amber-700 dark:text-amber-400 font-medium">14 (12 sworn, 2 civilian)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-secondary">Staffing Level</span>
                    <span className="text-primary font-medium">92.1%</span>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900/40 rounded-xl p-4">
                <h4 className="text-sm font-semibold text-secondary mb-3">RECRUITMENT</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-secondary">Active Applicants</span>
                    <span className="text-primary font-medium">47 (Deputy I/II)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-secondary">Background Checks</span>
                    <span className="text-primary font-medium">12 in progress</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-secondary">Avg BI Duration</span>
                    <span className="text-primary font-medium">67 days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-secondary">Conditional Offers</span>
                    <span className="text-green-600 dark:text-green-400 font-medium">3 pending start</span>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900/40 rounded-xl p-4">
                <h4 className="text-sm font-semibold text-secondary mb-3">RETENTION</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-secondary">Turnover Rate</span>
                    <span className="text-green-600 dark:text-green-400 font-medium">2.3% (12-month)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-secondary">Separations (12 mo)</span>
                    <span className="text-primary font-medium">4 (2 retire, 1 resign, 1 term)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-secondary">Avg Tenure (Sworn)</span>
                    <span className="text-primary font-medium">9.1 years</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-secondary">Avg Tenure (Civilian)</span>
                    <span className="text-primary font-medium">5.2 years</span>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900/40 rounded-xl p-4">
                <h4 className="text-sm font-semibold text-secondary mb-3">LEAVE MANAGEMENT</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-secondary">FMLA Requests Pending</span>
                    <span className="text-amber-700 dark:text-amber-400 font-medium">3 (48-hr deadline)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-secondary">Employees on Leave</span>
                    <span className="text-primary font-medium">4 (3 FMLA, 1 Military)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-secondary">Sick Leave (30 days)</span>
                    <span className="text-primary font-medium">67 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-secondary">Vacation (30 days)</span>
                    <span className="text-primary font-medium">142 hours</span>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900/40 rounded-xl p-4">
                <h4 className="text-sm font-semibold text-secondary mb-3">TRAINING COMPLIANCE</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-secondary">POST Certifications</span>
                    <span className="text-green-600 dark:text-green-400 font-medium">152/152 (100%)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-secondary">Expiring &lt;30 days</span>
                    <span className="text-amber-700 dark:text-amber-400 font-medium">3 deputies</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-secondary">Deputies in FTO</span>
                    <span className="text-primary font-medium">3 (8-12 weeks)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-secondary">Use of Force Recert Due</span>
                    <span className="text-primary font-medium">23 (March 2026)</span>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900/40 rounded-xl p-4">
                <h4 className="text-sm font-semibold text-secondary mb-3">WORKERS' COMP</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-secondary">Active Claims</span>
                    <span className="text-primary font-medium">8</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-secondary">New Claims (30 days)</span>
                    <span className="text-primary font-medium">2</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-secondary">Total Paid (YTD)</span>
                    <span className="text-primary font-medium">$12,450</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-secondary">Light Duty</span>
                    <span className="text-primary font-medium">2 employees</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border">
              <button onClick={() => navigate(createPageUrl('HRReports'))} className="px-4 py-2 bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-400 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 border border-amber-500/20">
                <Download className="w-4 h-4" />
                Export Metrics Report
              </button>
              <button onClick={() => navigate(createPageUrl('HRReports'))} className="px-4 py-2 bg-white dark:bg-slate-700/50 hover:bg-slate-700/70 text-secondary rounded-lg text-sm font-medium transition-colors">
                View Detailed Analytics
              </button>
            </div>
          </div>
        </main>
      </div>

      {/* Chat Button */}
      <button
        onClick={() => setChatOpen(!chatOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110 z-50"
      >
        {chatOpen ? <X className="w-6 h-6 text-primary" /> : <MessageCircle className="w-6 h-6 text-primary" />}
      </button>

      {/* Chat Panel */}
      {chatOpen && (
        <div className="fixed bottom-24 right-6 w-full max-w-96 h-[500px] bg-surface-raised backdrop-blur-xl border border-border rounded-2xl shadow-2xl flex flex-col z-40 mx-4 sm:mx-0">
          <div className="p-4 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-primary">HR Assistant</h3>
                <p className="text-xs text-green-600 dark:text-green-400">Online</p>
              </div>
            </div>
          </div>
          <div className="flex-1 p-4 overflow-y-auto">
            <div className="flex gap-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1">
                <div className="bg-white dark:bg-slate-800/60 p-3 rounded-xl">
                  <p className="text-sm text-slate-700 dark:text-slate-200">
                    Welcome to the HR Operations Center. I can help you with:
                  </p>
                  <ul className="text-sm text-secondary mt-2 space-y-1">
                    <li>• FMLA eligibility and documentation</li>
                    <li>• POST certification tracking</li>
                    <li>• Disciplinary process guidance</li>
                    <li>• Onboarding checklist compliance</li>
                    <li>• Policy and procedure questions</li>
                  </ul>
                  <p className="text-sm text-amber-300 mt-2">
                    Note: 3 FMLA requests require immediate attention (48-hour federal deadline).
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 border-t border-border">
            <div className="flex items-center gap-2">
              <input type="text" placeholder="Ask about HR compliance..." className="flex-1 px-4 py-2 bg-white dark:bg-slate-800/40 border border-border rounded-xl text-primary placeholder-slate-400 dark:placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-amber-500/50" />
              <button className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center">
                <Send className="w-5 h-5 text-primary" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

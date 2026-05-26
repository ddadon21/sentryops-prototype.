import React, { useState } from 'react';
import { Home, Users, FileText, LayoutDashboard, TrendingUp, AlertCircle, Settings, Bell, MessageCircle, Search, ChevronRight, DollarSign, CheckCircle, Shield, X, Send, Menu, ChevronLeft, LogOut, UserPlus, Briefcase, Clock, Award, Filter, Download, Eye, Calendar, CheckCircle2, XCircle, AlertTriangle, FileCheck, BookOpen, Scale, Gavel, ClipboardCheck, GraduationCap, Target, MapPin, ChevronDown, ChevronUp, User, FileWarning } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function ComplianceManagement() {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState('compliance');
  const [chatOpen, setChatOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [logoutConfirmOpen, setLogoutConfirmOpen] = useState(false);
  const [expandedViolation, setExpandedViolation] = useState('post-certs');
  const [expandedArea, setExpandedArea] = useState(null);

  const navigation = [
    { id: 'hr-dashboard', label: 'HR Dashboard', icon: Users, page: 'HRDashboard' },
    { id: 'job-postings', label: 'Job Postings', icon: Briefcase, page: 'JobPostings' },
    { id: 'applicant-tracking', label: 'Applicant Tracking', icon: UserPlus, page: 'ApplicantTracking' },
    { id: 'hiring-pipeline', label: 'Hiring Pipeline', icon: TrendingUp, page: 'HiringPipeline' },
    { id: 'compliance', label: 'HR Compliance', icon: ClipboardCheck },
    { id: 'onboarding', label: 'New Hire Onboarding', icon: FileCheck, page: 'NewHireOnboarding' },
    { id: 'training-certifications', label: 'Training & Certifications', icon: GraduationCap, page: 'TrainingCertifications' },
    { id: 'employee-records', label: 'Employee Records', icon: FileText, page: 'EmployeeRecords' },
    { id: 'time-off', label: 'Time Off Management', icon: Calendar, page: 'TimeOffManagement' },
    { id: 'performance', label: 'Performance Reviews', icon: Award, page: 'PerformanceReviews' },
    { id: 'hr-reports', label: 'HR Reports', icon: LayoutDashboard, page: 'HRReports' }
  ];

  const notifications = [
    { id: 1, title: 'POST Certification Overdue', message: 'Deputies Rodriguez and Thompson - 9 days overdue', time: '15 min ago', urgent: true },
    { id: 2, title: 'Firearms Qualification Overdue', message: '15 officers need immediate range qualification', time: '1 hour ago', urgent: true },
    { id: 3, title: 'CJIS Training Reminder', message: '8 employees need training by Nov 30', time: '2 hours ago', urgent: false }
  ];

  // Critical violations requiring immediate action
  const criticalViolations = [
    {
      id: 'post-certs',
      title: 'Georgia POST Certification Renewals',
      subtitle: '2 Deputies Overdue',
      severity: 'critical',
      regulatoryAuthority: 'Georgia Peace Officer Standards and Training Council (POST)',
      legalReference: 'O.C.G.A. § 35-8-1 et seq.',
      violationDescription: 'Sworn deputies operating with expired POST certifications',
      affectedPersonnel: [
        {
          name: 'Deputy M. Rodriguez',
          badge: '#2847',
          division: 'Patrol Division, C-Shift',
          certType: 'Basic POST #GA-45829',
          expirationDate: 'January 28, 2026',
          daysOverdue: 9,
          renewalStatus: 'NOT SUBMITTED',
          requiredTraining: '40-hour POST recertification course',
          trainingScheduled: false,
          supervisor: 'Sgt. Williams (C-Shift Commander)'
        },
        {
          name: 'Sgt. K. Thompson',
          badge: '#2193',
          division: 'Criminal Investigations Division',
          certType: 'Intermediate POST #GA-38192',
          expirationDate: 'January 28, 2026',
          daysOverdue: 9,
          renewalStatus: 'NOT SUBMITTED',
          requiredTraining: '20-hour specialized + 20-hour recertification',
          trainingScheduled: false,
          supervisor: 'Lt. Davis (CID Commander)'
        }
      ],
      consequences: [
        'Deputy CANNOT perform sworn law enforcement duties without current POST certification (O.C.G.A. § 35-8-7.1)',
        'Any arrests made = potential legal challenges to validity',
        'Any use of force = agency liability exposure',
        'Workers comp coverage may be affected if injured on duty',
        'POST Council may impose sanctions on GCSO for non-compliance'
      ],
      correctiveActions: [
        { action: 'Both deputies removed from patrol/investigative duties', status: 'completed', date: '02/06/2026', note: 'Reassigned to desk duties - report review, no field work' },
        { action: 'Enroll in next available POST recert course at GPSTC', status: 'pending', deadline: 'Within 7 days', note: 'Check GPSTC Columbus availability Week of Feb 10-14' },
        { action: 'Submit POST renewal applications', status: 'pending', deadline: 'Today (02/06/2026)', note: null },
        { action: 'Notify Sheriff Keybo Taylor of violation and corrective plan', status: 'pending', deadline: 'Today', note: 'Compliance Violation Report required' },
        { action: 'Document reassignment in personnel files', status: 'pending', deadline: 'Today', note: null },
        { action: 'Track POST approval of renewal (14-21 days typical)', status: 'pending', deadline: 'Ongoing', note: null },
        { action: 'Return to patrol duties after POST certification renewed', status: 'pending', deadline: '30 days', note: null }
      ],
      responsible: ['HR Director', 'Training Division', 'Major Davis'],
      deadline: 'Schedule training within 7 days, complete within 30 days'
    },
    {
      id: 'firearms',
      title: 'Firearms Qualifications',
      subtitle: '15 Officers Overdue',
      severity: 'critical',
      regulatoryAuthority: 'GCSO Policy 4.12 - Firearms Qualification Requirements',
      legalReference: 'Georgia POST firearms standards',
      violationDescription: 'Officers carrying firearms without current annual qualification',
      affectedBreakdown: {
        patrol: { count: 8, note: 'Various shifts' },
        cid: { count: 4, note: 'Detectives' },
        courtServices: { count: 2, note: 'Deputies' },
        administration: { count: 1, note: 'Lieutenant' }
      },
      qualificationRequirements: {
        frequency: 'Annual qualification required for all sworn personnel',
        course: 'Georgia POST firearms course of fire',
        minimumScore: '80% (240/300 points)',
        dueDate: 'January 31, 2026 (for 2026 calendar year)',
        graceExpired: 'February 05, 2026'
      },
      sampleAffected: [
        { name: 'Deputy J. Martinez', badge: '#2756', division: 'Patrol A-Shift', lastQual: 'January 15, 2025', scheduled: 'February 12, 2026' },
        { name: 'Deputy K. Williams', badge: '#2891', division: 'Patrol B-Shift', lastQual: 'December 20, 2024', scheduled: 'February 12, 2026' },
        { name: 'Detective R. Thompson', badge: '#2634', division: 'Criminal Investigations', lastQual: 'January 10, 2025', scheduled: 'February 12, 2026' }
      ],
      consequences: [
        'Officers carrying firearms without current qualification = GCSO policy violation (Policy 4.12)',
        'Potential liability if officer involved in shooting incident',
        'Workers comp coverage may be questioned if injured during firearms-related duty',
        'POST compliance issue (POST requires firearms proficiency)'
      ],
      correctiveActions: [
        { action: 'All 15 officers notified of overdue status', status: 'completed', date: '02/05/2026', note: null },
        { action: 'Range day scheduled', status: 'completed', date: 'February 12, 2026', note: '08:00-17:00, GCSO Training Center Range' },
        { action: 'Firearms Instructor assigned: Sgt. R. Martinez', status: 'completed', note: 'Lead Firearms Instructor' },
        { action: 'Supervisors notified to ensure attendance', status: 'completed', date: '02/05/2026', note: null },
        { action: 'Officers complete annual qualification', status: 'pending', deadline: 'February 12, 2026', note: null },
        { action: 'Qualification scores documented in training files', status: 'pending', deadline: 'February 12, 2026', note: null },
        { action: 'Remedial training for any failures', status: 'pending', deadline: 'Within 7 days of failure', note: 'Re-qualification required' }
      ],
      responsible: ['Training Division (Sgt. Martinez)', 'Division Commanders'],
      deadline: 'All qualifications complete by February 15, 2026'
    }
  ];

  // Compliance areas with detailed status
  const complianceAreas = [
    {
      id: 'eeo',
      category: 'Equal Employment Opportunity (EEO)',
      status: 'compliant',
      icon: Users,
      regulatoryAuthority: [
        'Title VII of the Civil Rights Act of 1964',
        'Equal Employment Opportunity Commission (EEOC)',
        'EEO-1 Component 1 Report (annual reporting requirement)'
      ],
      lastAudit: { date: 'September 14, 2024', auditor: 'Gwinnett County HR Compliance Division', result: 'No violations found' },
      nextReview: 'September 14, 2025',
      requirements: [
        {
          name: 'EEO-1 Annual Report (Component 1)',
          status: 'in-progress',
          details: '2025 Reporting Year - data snapshot October-December 2024',
          deadline: 'May 31, 2025 (EEOC portal opens March 31)',
          progress: '85% complete',
          missingData: 'Final December 2024 payroll data, verify EEO job categories for 12 new hires',
          responsible: 'HR Director, Payroll Coordinator',
          action: 'Complete data collection by March 2025'
        },
        {
          name: 'Diversity Metrics Tracking',
          status: 'compliant',
          details: 'Workforce demographics tracked and current',
          demographics: {
            total: 178,
            sworn: 164,
            civilian: 14,
            raceEthnicity: [
              { category: 'White', count: 98, percent: 55.1 },
              { category: 'Black/African American', count: 52, percent: 29.2 },
              { category: 'Hispanic/Latino', count: 18, percent: 10.1 },
              { category: 'Asian', count: 7, percent: 3.9 },
              { category: 'Two or More Races', count: 3, percent: 1.7 }
            ],
            gender: [
              { category: 'Male', count: 142, percent: 79.8 },
              { category: 'Female', count: 36, percent: 20.2 }
            ]
          }
        },
        {
          name: 'Anti-Discrimination Training',
          status: 'compliant',
          details: 'Annual EEO training required for all employees',
          completion: { completed: 165, total: 178, percent: 92.7 },
          pending: '8 new hires (in onboarding), 5 employees on extended leave',
          nextCycle: 'January 2026'
        },
        {
          name: 'Reasonable Accommodation Process',
          status: 'compliant',
          details: 'ADA interactive process documented and operational',
          pendingRequests: 0,
          activeAccommodations: 4
        }
      ]
    },
    {
      id: 'fmla',
      category: 'Family and Medical Leave Act (FMLA)',
      status: 'compliant',
      icon: FileCheck,
      regulatoryAuthority: [
        'Family and Medical Leave Act of 1993 (FMLA)',
        'Department of Labor (DOL) - Wage and Hour Division',
        '29 CFR Part 825 (FMLA regulations)'
      ],
      lastAudit: { date: 'September 19, 2024', auditor: 'Gwinnett County HR Compliance Division', result: 'No violations found, procedures properly documented' },
      nextReview: 'September 19, 2025',
      requirements: [
        {
          name: 'FMLA Eligibility Tracking',
          status: 'compliant',
          details: '12 months employed, 1,250 hours worked, 50+ employees within 75 miles',
          eligible: { count: 168, total: 178, percent: 94.4 },
          notEligible: '10 employees - new hires with <12 months or <1,250 hours'
        },
        {
          name: 'Leave Documentation',
          status: 'compliant',
          activeCases: [
            { name: 'Deputy R. Martinez', type: 'Intermittent FMLA', reason: 'Serious health condition', approved: '02/01/2026', entitlement: '12 weeks' },
            { name: 'Dispatcher K. Johnson', type: 'Continuous FMLA', reason: 'Childbirth', start: '02/17/2026', entitlement: '12 weeks' },
            { name: 'Cpl. T. Anderson', type: 'Intermittent FMLA', reason: 'Spouse care', approved: '02/04/2026', remaining: '9 weeks' },
            { name: 'Deputy S. Chen', type: 'Continuous FMLA', reason: 'Own serious health', approved: '01/15/2026', returnExpected: '03/15/2026' }
          ],
          documentation: ['WH-381 Eligibility Notice', 'WH-381 Rights & Responsibilities', 'WH-382 Designation Notice', 'WH-380 Medical Certification'],
          allDocumented: true
        },
        {
          name: 'Employee Notice Requirements',
          status: 'compliant',
          details: 'FMLA poster displayed at all locations, rights in handbook',
          responseRequirement: '48-hour response requirement met for all requests',
          lateResponses: 0,
          period: 'Past 12 months'
        },
        {
          name: 'Return-to-Work Procedures',
          status: 'compliant',
          details: 'Fitness-for-duty certification required for health condition leave',
          recentReturns: 2,
          period: 'Past 6 months',
          violations: 0,
          note: 'Both returned to same position and shift as required'
        }
      ]
    },
    {
      id: 'post',
      category: 'Georgia POST Certification',
      status: 'needs-attention',
      icon: Shield,
      regulatoryAuthority: [
        'Georgia Peace Officer Standards and Training Council (POST)',
        'O.C.G.A. § 35-8-1 et seq. (Georgia POST Act)',
        'Georgia POST Council Certification Requirements'
      ],
      lastAudit: { date: 'October 31, 2024', auditor: 'Georgia POST Council (random compliance audit)', result: 'No violations at time of audit' },
      nextReview: 'April 30, 2025 (POST Council annual review)',
      requirements: [
        {
          name: 'Officer Certifications Current',
          status: 'violation',
          current: 162,
          total: 164,
          percent: 98.8,
          overdue: 2,
          note: 'See CRITICAL VIOLATIONS section for details'
        },
        {
          name: 'POST Certification Levels',
          status: 'compliant',
          breakdown: [
            { level: 'Basic POST', count: 110, percent: 67.1 },
            { level: 'Intermediate POST', count: 42, percent: 25.6 },
            { level: 'Advanced POST', count: 12, percent: 7.3 }
          ]
        },
        {
          name: 'Training Hours Documentation',
          status: 'compliant',
          details: 'All sworn personnel training hours tracked in training management system',
          note: '2026 Training Year: On track for all deputies to meet minimum POST requirements'
        },
        {
          name: 'Continuing Education Credits',
          status: 'compliant',
          intermediate: '20 hours every 4 years - all current',
          advanced: '40 hours every 4 years - all current'
        },
        {
          name: 'Firearms Qualifications (POST Requirement)',
          status: 'violation',
          overdue: 15,
          note: 'See CRITICAL VIOLATIONS section - scheduled for February 12, 2026'
        }
      ]
    },
    {
      id: 'ada',
      category: 'Americans with Disabilities Act (ADA)',
      status: 'compliant',
      icon: Scale,
      regulatoryAuthority: [
        'Americans with Disabilities Act of 1990 (ADA)',
        'ADA Amendments Act of 2008',
        'Department of Justice (DOJ) - Civil Rights Division'
      ],
      lastAudit: { date: 'October 10, 2024', auditor: 'Gwinnett County HR Compliance Division', result: 'No violations found' },
      nextReview: 'October 10, 2025',
      requirements: [
        {
          name: 'Reasonable Accommodations',
          status: 'compliant',
          activeAccommodations: 4,
          pendingRequests: 0,
          details: 'All accommodation requests processed through interactive process'
        },
        {
          name: 'Accessibility Standards',
          status: 'compliant',
          details: 'GCSO facilities meet ADA accessibility requirements',
          lastInspection: 'July 2024'
        },
        {
          name: 'Interactive Process Documentation',
          status: 'compliant',
          details: 'All accommodation discussions documented per ADA requirements'
        },
        {
          name: 'Medical Documentation Procedures',
          status: 'compliant',
          details: 'Medical records stored separately, access restricted per GINA/ADA'
        }
      ]
    },
    {
      id: 'flsa',
      category: 'Fair Labor Standards Act (FLSA)',
      status: 'compliant',
      icon: DollarSign,
      regulatoryAuthority: [
        'Fair Labor Standards Act (FLSA)',
        'Department of Labor (DOL) - Wage and Hour Division',
        '29 CFR Part 553 (Law Enforcement Overtime)'
      ],
      lastAudit: { date: 'July 15, 2024', auditor: 'Gwinnett County Finance Department', result: 'No violations found' },
      nextReview: 'July 15, 2025',
      requirements: [
        {
          name: 'Overtime Calculations (7(k) Exemption)',
          status: 'compliant',
          details: 'GCSO uses 28-day work period under Section 7(k) exemption',
          threshold: '171 hours before overtime required',
          note: 'All overtime properly calculated and paid'
        },
        {
          name: 'Time Record Keeping',
          status: 'compliant',
          details: 'Electronic timekeeping system captures all hours worked',
          retention: '3 years as required by FLSA'
        },
        {
          name: 'Exempt/Non-Exempt Classifications',
          status: 'compliant',
          exempt: 12,
          nonExempt: 166,
          lastReview: 'January 2025',
          nextReview: 'January 2026'
        },
        {
          name: 'Minimum Wage Compliance',
          status: 'compliant',
          details: 'All employees paid above federal and Georgia minimum wage',
          lowestHourlyRate: '$23.08/hour (entry-level Deputy Sheriff)'
        }
      ]
    },
    {
      id: 'cjis',
      category: 'CJIS Security Compliance',
      status: 'needs-attention',
      icon: FileWarning,
      regulatoryAuthority: [
        'FBI Criminal Justice Information Services (CJIS) Security Policy',
        'Georgia Crime Information Center (GCIC)',
        'National Crime Information Center (NCIC)'
      ],
      lastAudit: { date: 'October 01, 2024', auditor: 'Georgia Bureau of Investigation (GBI) CJIS Audit Unit', result: 'Compliant with recommendations' },
      nextReview: 'April 01, 2025',
      requirements: [
        {
          name: 'Security Awareness Training',
          status: 'needs-attention',
          totalWithAccess: 92,
          trained: 84,
          needTraining: 8,
          deadline: 'November 30, 2024',
          daysRemaining: 294,
          note: 'Training sessions being scheduled'
        },
        {
          name: 'Personnel Security (Background Checks)',
          status: 'compliant',
          details: 'All CJIS-access personnel have current fingerprint-based background checks',
          renewalSchedule: 'Every 5 years'
        },
        {
          name: 'Access Control',
          status: 'compliant',
          details: 'Role-based access controls in place for GCIC/NCIC terminals',
          lastAccessAudit: 'September 2024',
          nextAudit: 'March 2025'
        },
        {
          name: 'Incident Response',
          status: 'compliant',
          details: 'CJIS security incident reporting procedures documented and trained',
          incidentsReported: 0,
          period: 'Past 12 months'
        }
      ]
    },
    {
      id: 'workers-comp',
      category: 'Workers Compensation',
      status: 'compliant',
      icon: ClipboardCheck,
      regulatoryAuthority: [
        'Georgia Workers Compensation Act (O.C.G.A. § 34-9)',
        'State Board of Workers Compensation',
        'Gwinnett County Risk Management'
      ],
      lastAudit: { date: 'September 01, 2024', auditor: 'Gwinnett County Risk Management', result: 'No violations found' },
      nextReview: 'March 01, 2025',
      requirements: [
        {
          name: 'Incident Reporting Procedures',
          status: 'compliant',
          details: 'WC-1 First Report of Injury filed within 7 days for all workplace injuries',
          incidentsYTD: 8,
          properlyFiled: 8,
          note: '100% on-time filing'
        },
        {
          name: 'Return-to-Work Program',
          status: 'compliant',
          details: 'Modified duty program available for injured employees',
          activeModifiedDuty: 2,
          avgReturnTime: '14 days'
        },
        {
          name: 'Safety Training Documentation',
          status: 'compliant',
          details: 'Required safety training tracked in training management system',
          deadline: 'December 31, 2024'
        },
        {
          name: 'Claims Management',
          status: 'compliant',
          openClaims: 3,
          closedYTD: 11,
          avgClaimDuration: '45 days'
        }
      ]
    },
    {
      id: 'i9',
      category: 'I-9 Employment Verification',
      status: 'compliant',
      icon: FileText,
      regulatoryAuthority: [
        'Immigration and Nationality Act (INA)',
        'U.S. Citizenship and Immigration Services (USCIS)',
        'E-Verify Program (mandatory for Georgia employers)'
      ],
      lastAudit: { date: 'October 20, 2024', auditor: 'Gwinnett County HR Compliance Division', result: 'No violations found' },
      nextReview: 'April 20, 2025',
      requirements: [
        {
          name: 'Form I-9 Completion',
          status: 'compliant',
          details: 'Section 1 completed by employee Day 1, Section 2 within 3 business days',
          complianceRate: '100%'
        },
        {
          name: 'Document Verification',
          status: 'compliant',
          details: 'Acceptable documents verified per I-9 List A, B, C requirements'
        },
        {
          name: 'E-Verify Participation',
          status: 'compliant',
          details: 'All new hires processed through E-Verify within 3 business days',
          casesYTD: 24,
          allCleared: true
        },
        {
          name: 'Retention Requirements',
          status: 'compliant',
          details: 'I-9 forms retained for 3 years after hire or 1 year after termination (whichever later)',
          retentionAudit: 'Current'
        }
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

  const getStatusConfig = (status) => {
    const configs = {
      compliant: { bg: 'bg-green-500/20', text: 'text-green-400', border: 'border-green-500/30', label: 'COMPLIANT', icon: CheckCircle2 },
      'in-progress': { bg: 'bg-blue-500/20', text: 'text-blue-400', border: 'border-blue-500/30', label: 'IN PROGRESS', icon: Clock },
      'needs-attention': { bg: 'bg-amber-500/20', text: 'text-amber-700', border: 'border-amber-500/30', label: 'NEEDS ATTENTION', icon: AlertTriangle },
      'violation': { bg: 'bg-red-500/20', text: 'text-red-400', border: 'border-red-500/30', label: 'VIOLATION', icon: XCircle }
    };
    return configs[status] || configs.compliant;
  };

  const compliantAreas = complianceAreas.filter(a => a.status === 'compliant').length;
  const attentionAreas = complianceAreas.filter(a => a.status === 'needs-attention').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex">
      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 border-r border-slate-800/50 backdrop-blur-xl bg-slate-50 dark:bg-slate-900/30 flex flex-col transform transition-all lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} ${sidebarCollapsed ? 'w-20' : 'w-64'}`}>
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
                  isActive ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/20' : 'text-secondary hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white'
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
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-secondary hover:bg-slate-100 dark:hover:bg-slate-800/40 hover:text-secondary ${sidebarCollapsed ? 'justify-center' : ''}`}
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

      {logoutConfirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setLogoutConfirmOpen(false)}
          />
          <div className="relative bg-white dark:bg-slate-900 border border-border rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-white dark:bg-slate-800/60 rounded-xl flex items-center justify-center">
                <LogOut className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-primary">Sign Out</h3>
                <p className="text-sm text-secondary">Are you sure you want to sign out?</p>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setLogoutConfirmOpen(false)}
                className="flex-1 px-4 py-2.5 bg-white dark:bg-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-800/60 border border-slate-700/50 rounded-xl text-primary font-medium transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 px-4 py-2.5 bg-slate-50 dark:bg-slate-700/40 hover:bg-slate-700/60 border border-slate-600/50 rounded-xl text-primary font-medium transition-all"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col min-w-0">
        <header className="border-b border-border backdrop-blur-xl bg-slate-50 dark:bg-slate-900/30">
          <div className="px-4 lg:px-6 py-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4 flex-1 min-w-0">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 hover:bg-slate-100 dark:hover:bg-slate-800/50 rounded-lg"
              >
                <Menu className="w-5 h-5 text-secondary" />
              </button>
              <div className="flex items-center gap-2 text-sm">
                <button
                  onClick={() => navigate(createPageUrl('HRDashboard'))}
                  className="text-secondary hover:text-primary transition-colors"
                >
                  HR Dashboard
                </button>
                <ChevronRight className="w-4 h-4 text-slate-700" />
                <span className="text-primary">HR Compliance</span>
              </div>
            </div>
            <div className="flex items-center gap-2 lg:gap-3">
              <button className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-slate-800/40 border border-border rounded-xl text-secondary hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-all text-sm">
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Export Report</span>
              </button>
              <button className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-slate-800/40 border border-border rounded-xl text-secondary hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-all text-sm">
                <Calendar className="w-4 h-4" />
                <span className="hidden sm:inline">Compliance Calendar</span>
              </button>

              <div className="relative">
                <button
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                  className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800/50 rounded-lg relative"
                >
                  <Bell className="w-5 h-5 text-secondary" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>

                {notificationsOpen && (
                  <div className="absolute right-0 top-full mt-2 w-96 bg-surface-raised backdrop-blur-xl border border-border rounded-xl shadow-2xl z-50">
                    <div className="p-4 border-b border-border">
                      <h3 className="text-sm font-semibold text-primary">Compliance Alerts</h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.map(notification => (
                        <div key={notification.id} className={`p-4 border-b border-border dark:border-slate-800/30 hover:bg-slate-100 dark:hover:bg-slate-800/30 cursor-pointer transition-colors ${notification.urgent ? 'bg-red-500/5' : ''}`}>
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
                  </div>
                )}
              </div>

              <div className="h-8 w-px bg-white dark:bg-slate-700/50"></div>

              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-primary text-sm font-bold">HR</span>
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-primary">HR Director</p>
                  <p className="text-xs text-secondary">Compliance Officer</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <div className="max-w-7xl mx-auto">
            {/* GCSO Header */}
            <div className="mb-6">
              <h2 className="text-2xl lg:text-3xl font-bold text-primary mb-1">HR Compliance & Regulatory Audit Management</h2>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-secondary mb-3">
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  Gwinnett County Sheriff's Office • Lawrenceville, Georgia
                </span>
                <span className="hidden sm:inline">•</span>
                <span>Thursday, February 06, 2026 • 1:00 PM EST</span>
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-500">
                <span>Sheriff: Keybo Taylor</span>
                <span className="hidden sm:inline">|</span>
                <span>Legal Counsel: Gwinnett County Attorney's Office</span>
                <span className="hidden sm:inline">|</span>
                <span>Last Audit: Various by agency</span>
              </div>
              <div className="text-xs text-slate-700 mt-1">
                System: GCSO-HRIS v4.2 | Last Updated: 13:00:08 EST
              </div>
            </div>

            {/* Critical Context Alert Bars */}
            <div className="space-y-2 mb-6">
              <div className="flex items-center gap-3 px-4 py-2.5 bg-red-500/10 border border-red-500/20 rounded-lg">
                <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                <span className="text-sm text-red-300">
                  <span className="font-bold">CRITICAL:</span> POST Certification Renewals: 2 certifications overdue (9 days) - Deputies affected removed from patrol
                </span>
              </div>
              <div className="flex items-center gap-3 px-4 py-2.5 bg-red-500/10 border border-red-500/20 rounded-lg">
                <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                <span className="text-sm text-red-300">
                  <span className="font-bold">CRITICAL:</span> Firearms Qualifications: 15 officers overdue (1 day) - Range day scheduled Feb 12
                </span>
              </div>
              <div className="flex items-center gap-3 px-4 py-2.5 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                <AlertTriangle className="w-4 h-4 text-amber-700 flex-shrink-0" />
                <span className="text-sm text-amber-300">
                  <span className="font-medium">CJIS Security Training:</span> 8 employees need training by Nov 30, 2024 (294 days remaining)
                </span>
              </div>
              <div className="flex items-center gap-3 px-4 py-2.5 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <Clock className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span className="text-sm text-blue-300">
                  <span className="font-medium">EEO-1 Report Prep:</span> Data collection 85% complete - filing deadline May 31, 2025
                </span>
              </div>
            </div>

            {/* Compliance Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 bg-red-500/20 rounded-xl flex items-center justify-center">
                    <XCircle className="w-5 h-5 text-red-400" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-red-400 mb-1">2</p>
                <p className="text-sm text-secondary">Critical Violations</p>
                <p className="text-xs text-red-400 mt-1">Immediate action required</p>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 bg-amber-500/20 rounded-xl flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5 text-amber-700" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-amber-700 mb-1">{attentionAreas}</p>
                <p className="text-sm text-secondary">Areas Need Attention</p>
                <p className="text-xs text-amber-700 mt-1">POST, CJIS training pending</p>
              </div>

              <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-green-400" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-green-400 mb-1">{compliantAreas}</p>
                <p className="text-sm text-secondary">Compliant Areas</p>
                <p className="text-xs text-green-400 mt-1">EEO, FMLA, ADA, FLSA, WC, I-9</p>
              </div>

              <div className="bg-white dark:bg-slate-800/40 border border-border rounded-xl shadow-sm dark:shadow-none p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-purple-400" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-primary mb-1">8</p>
                <p className="text-sm text-secondary">Total Compliance Areas</p>
                <p className="text-xs text-slate-500 mt-1">Tracked and documented</p>
              </div>
            </div>

            {/* Critical Violations Section */}
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-red-500/20 rounded-xl flex items-center justify-center">
                  <XCircle className="w-5 h-5 text-red-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-primary">Critical Compliance Violations</h3>
                  <p className="text-sm text-red-400">Immediate Action Required</p>
                </div>
              </div>

              <div className="space-y-6">
                {criticalViolations.map(violation => (
                  <div key={violation.id} className="bg-red-500/5 border border-red-500/30 rounded-xl overflow-hidden">
                    <div
                      className="p-5 cursor-pointer hover:bg-red-500/10 transition-all"
                      onClick={() => setExpandedViolation(expandedViolation === violation.id ? null : violation.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center">
                            <AlertCircle className="w-6 h-6 text-red-400" />
                          </div>
                          <div>
                            <div className="flex items-center gap-3 mb-1">
                              <h4 className="text-lg font-semibold text-primary">{violation.title}</h4>
                              <span className="px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-xs font-bold uppercase">
                                {violation.severity}
                              </span>
                            </div>
                            <p className="text-sm text-red-300">{violation.subtitle}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-xs text-slate-500">Deadline: {violation.deadline}</span>
                          {expandedViolation === violation.id ? (
                            <ChevronUp className="w-5 h-5 text-secondary" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-secondary" />
                          )}
                        </div>
                      </div>
                    </div>

                    {expandedViolation === violation.id && (
                      <div className="border-t border-red-500/20 p-5 bg-slate-50 dark:bg-slate-900/30">
                        {/* Regulatory Info */}
                        <div className="mb-4 p-3 bg-white dark:bg-slate-800/60 rounded-lg">
                          <p className="text-xs text-slate-500 mb-1">Regulatory Authority</p>
                          <p className="text-sm text-primary font-medium">{violation.regulatoryAuthority}</p>
                          <p className="text-xs text-secondary mt-1">Legal Reference: {violation.legalReference}</p>
                        </div>

                        <div className="mb-4">
                          <p className="text-xs text-slate-500 mb-1">Violation Description</p>
                          <p className="text-sm text-red-300">{violation.violationDescription}</p>
                        </div>

                        {/* Affected Personnel */}
                        {violation.affectedPersonnel && (
                          <div className="mb-4">
                            <h5 className="text-sm font-semibold text-primary mb-3">Affected Personnel</h5>
                            <div className="space-y-3">
                              {violation.affectedPersonnel.map((person, idx) => (
                                <div key={idx} className="p-4 bg-white dark:bg-slate-800/60 rounded-xl">
                                  <div className="flex items-center gap-3 mb-3">
                                    <div className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center">
                                      <User className="w-5 h-5 text-red-400" />
                                    </div>
                                    <div>
                                      <p className="text-sm font-semibold text-primary">{person.name} <span className="text-slate-500">{person.badge}</span></p>
                                      <p className="text-xs text-secondary">{person.division}</p>
                                    </div>
                                    <span className="ml-auto px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-xs font-bold">
                                      {person.daysOverdue} DAYS OVERDUE
                                    </span>
                                  </div>
                                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                                    <div>
                                      <p className="text-slate-500">Certification</p>
                                      <p className="text-primary">{person.certType}</p>
                                    </div>
                                    <div>
                                      <p className="text-slate-500">Expiration Date</p>
                                      <p className="text-red-400">{person.expirationDate}</p>
                                    </div>
                                    <div>
                                      <p className="text-slate-500">Renewal Status</p>
                                      <p className="text-amber-700">{person.renewalStatus}</p>
                                    </div>
                                    <div>
                                      <p className="text-slate-500">Supervisor</p>
                                      <p className="text-primary">{person.supervisor}</p>
                                    </div>
                                  </div>
                                  <div className="mt-3 pt-3 border-t border-border">
                                    <p className="text-xs text-slate-500">Required Training</p>
                                    <p className="text-sm text-primary">{person.requiredTraining}</p>
                                    <p className={`text-xs mt-1 ${person.trainingScheduled ? 'text-green-400' : 'text-red-400'}`}>
                                      Training Scheduled: {person.trainingScheduled ? 'Yes' : 'NO - URGENT'}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Affected Breakdown for firearms */}
                        {violation.affectedBreakdown && (
                          <div className="mb-4">
                            <h5 className="text-sm font-semibold text-primary mb-3">Affected Personnel Breakdown (15 officers)</h5>
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                              <div className="p-3 bg-white dark:bg-slate-800/60 rounded-lg">
                                <p className="text-xl font-bold text-primary">{violation.affectedBreakdown.patrol.count}</p>
                                <p className="text-xs text-secondary">Patrol Division</p>
                              </div>
                              <div className="p-3 bg-white dark:bg-slate-800/60 rounded-lg">
                                <p className="text-xl font-bold text-primary">{violation.affectedBreakdown.cid.count}</p>
                                <p className="text-xs text-secondary">Criminal Investigations</p>
                              </div>
                              <div className="p-3 bg-white dark:bg-slate-800/60 rounded-lg">
                                <p className="text-xl font-bold text-primary">{violation.affectedBreakdown.courtServices.count}</p>
                                <p className="text-xs text-secondary">Court Services</p>
                              </div>
                              <div className="p-3 bg-white dark:bg-slate-800/60 rounded-lg">
                                <p className="text-xl font-bold text-primary">{violation.affectedBreakdown.administration.count}</p>
                                <p className="text-xs text-secondary">Administration</p>
                              </div>
                            </div>

                            {violation.sampleAffected && (
                              <div className="mt-4">
                                <p className="text-xs text-slate-500 mb-2">Sample Affected Officers:</p>
                                <div className="space-y-2">
                                  {violation.sampleAffected.map((officer, idx) => (
                                    <div key={idx} className="flex items-center justify-between p-3 bg-white dark:bg-slate-800/40 rounded-lg">
                                      <div>
                                        <p className="text-sm font-medium text-primary">{officer.name} <span className="text-slate-500">{officer.badge}</span></p>
                                        <p className="text-xs text-secondary">{officer.division}</p>
                                      </div>
                                      <div className="text-right">
                                        <p className="text-xs text-slate-500">Last Qualification</p>
                                        <p className="text-sm text-red-400">{officer.lastQual}</p>
                                      </div>
                                      <div className="text-right">
                                        <p className="text-xs text-slate-500">Scheduled</p>
                                        <p className="text-sm text-green-400">{officer.scheduled}</p>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Consequences */}
                        <div className="mb-4">
                          <h5 className="text-sm font-semibold text-primary mb-2">Legal/Operational Consequences</h5>
                          <div className="space-y-1">
                            {violation.consequences.map((consequence, idx) => (
                              <div key={idx} className="flex items-start gap-2 text-xs text-secondary">
                                <span className="text-red-400 mt-0.5">•</span>
                                <span>{consequence}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Corrective Action Plan */}
                        <div className="mb-4">
                          <h5 className="text-sm font-semibold text-primary mb-3">Corrective Action Plan</h5>
                          <div className="space-y-2">
                            {violation.correctiveActions.map((action, idx) => (
                              <div key={idx} className={`flex items-start gap-3 p-3 rounded-lg ${action.status === 'completed' ? 'bg-green-500/10 border border-green-500/20' : 'bg-white dark:bg-slate-800/60'}`}>
                                <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${action.status === 'completed' ? 'bg-green-500/30' : 'bg-slate-700'}`}>
                                  {action.status === 'completed' ? (
                                    <CheckCircle2 className="w-3 h-3 text-green-400" />
                                  ) : (
                                    <span className="w-2 h-2 bg-amber-400 rounded-full"></span>
                                  )}
                                </div>
                                <div className="flex-1">
                                  <p className={`text-sm ${action.status === 'completed' ? 'text-green-300' : 'text-primary'}`}>
                                    {action.action}
                                  </p>
                                  <div className="flex items-center gap-3 mt-1 text-xs text-slate-500">
                                    {action.date && <span>{action.status === 'completed' ? 'Completed:' : 'Scheduled:'} {action.date}</span>}
                                    {action.deadline && <span>Deadline: {action.deadline}</span>}
                                    {action.note && <span className="text-secondary">• {action.note}</span>}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Responsible & Deadline */}
                        <div className="flex items-center justify-between p-3 bg-white dark:bg-slate-800/60 rounded-lg">
                          <div>
                            <p className="text-xs text-slate-500">Responsible</p>
                            <p className="text-sm text-primary">{violation.responsible.join(', ')}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-slate-500">Deadline</p>
                            <p className="text-sm text-amber-700 font-medium">{violation.deadline}</p>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3 mt-4">
                          <button className="flex-1 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-400 rounded-lg text-sm font-medium transition-all">
                            Schedule Training Immediately
                          </button>
                          <button className="flex-1 px-4 py-2 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/30 text-amber-700 rounded-lg text-sm font-medium transition-all">
                            Notify Sheriff - Violation Report
                          </button>
                          <button className="px-4 py-2 bg-slate-50 dark:bg-slate-700/40 hover:bg-slate-700/60 border border-slate-600/50 text-secondary rounded-lg text-sm font-medium transition-all">
                            Document Actions
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Compliance Areas */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-primary">Regulatory Compliance Areas</h3>
              {complianceAreas.map(area => {
                const statusConfig = getStatusConfig(area.status);
                const StatusIcon = statusConfig.icon;
                const AreaIcon = area.icon;
                const isExpanded = expandedArea === area.id;

                return (
                  <div
                    key={area.id}
                    className={`border rounded-xl overflow-hidden ${area.status === 'needs-attention' ? 'bg-amber-500/5 border-amber-500/30' : 'bg-white dark:bg-slate-800/40 border-slate-700/50'}`}
                  >
                    <div
                      className="p-5 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-all"
                      onClick={() => setExpandedArea(isExpanded ? null : area.id)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4 flex-1">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${statusConfig.bg}`}>
                            <AreaIcon className={`w-6 h-6 ${statusConfig.text}`} />
                          </div>

                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2 flex-wrap">
                              <h4 className="text-lg font-semibold text-primary">{area.category}</h4>
                              <span className={`px-3 py-1 rounded-full text-xs font-bold border ${statusConfig.bg} ${statusConfig.text} ${statusConfig.border}`}>
                                {statusConfig.label}
                              </span>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-xs text-secondary">
                              <div className="flex items-center gap-2">
                                <Calendar className="w-3 h-3" />
                                <span>Last Audit: {new Date(area.lastAudit.date).toLocaleDateString()}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Clock className="w-3 h-3" />
                                <span>Next Review: {new Date(area.nextReview).toLocaleDateString()}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Scale className="w-3 h-3" />
                                <span>{area.regulatoryAuthority[0]}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          {isExpanded ? (
                            <ChevronUp className="w-5 h-5 text-secondary" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-secondary" />
                          )}
                        </div>
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="border-t border-border p-5 bg-slate-50 dark:bg-slate-900/30">
                        {/* Regulatory Authority */}
                        <div className="mb-4 p-3 bg-white dark:bg-slate-800/60 rounded-lg">
                          <p className="text-xs text-slate-500 mb-2">Regulatory Authority</p>
                          <div className="space-y-1">
                            {area.regulatoryAuthority.map((auth, idx) => (
                              <p key={idx} className="text-sm text-primary">• {auth}</p>
                            ))}
                          </div>
                        </div>

                        {/* Audit Info */}
                        <div className="mb-4 p-3 bg-white dark:bg-slate-800/60 rounded-lg">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                            <div>
                              <p className="text-xs text-slate-500">Last Audit Date</p>
                              <p className="text-primary">{area.lastAudit.date}</p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-500">Auditor</p>
                              <p className="text-primary">{area.lastAudit.auditor}</p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-500">Result</p>
                              <p className="text-green-400">{area.lastAudit.result}</p>
                            </div>
                          </div>
                        </div>

                        {/* Requirements */}
                        <h5 className="text-sm font-semibold text-primary mb-3">Compliance Requirements</h5>
                        <div className="space-y-3">
                          {area.requirements.map((req, idx) => {
                            const reqStatusConfig = getStatusConfig(req.status);
                            return (
                              <div key={idx} className={`p-4 rounded-xl border ${reqStatusConfig.border} ${reqStatusConfig.bg}`}>
                                <div className="flex items-center gap-3 mb-2">
                                  <reqStatusConfig.icon className={`w-4 h-4 ${reqStatusConfig.text}`} />
                                  <span className="text-sm font-medium text-primary">{req.name}</span>
                                  <span className={`px-2 py-0.5 rounded text-xs font-medium ${reqStatusConfig.bg} ${reqStatusConfig.text}`}>
                                    {reqStatusConfig.label}
                                  </span>
                                </div>

                                {req.details && (
                                  <p className="text-xs text-secondary mb-2">{req.details}</p>
                                )}

                                {req.deadline && (
                                  <p className="text-xs text-slate-500">Deadline: <span className="text-primary">{req.deadline}</span></p>
                                )}

                                {req.progress && (
                                  <p className="text-xs text-blue-400 mt-1">Progress: {req.progress}</p>
                                )}

                                {req.completion && (
                                  <div className="mt-2">
                                    <div className="flex justify-between text-xs mb-1">
                                      <span className="text-slate-500">Completion</span>
                                      <span className="text-secondary">{req.completion.completed}/{req.completion.total} ({req.completion.percent}%)</span>
                                    </div>
                                    <div className="w-full bg-white dark:bg-slate-700/50 rounded-full h-2">
                                      <div className="bg-green-500 h-2 rounded-full" style={{ width: `${req.completion.percent}%` }}></div>
                                    </div>
                                  </div>
                                )}

                                {req.activeCases && (
                                  <div className="mt-3 space-y-2">
                                    {req.activeCases.map((caseItem, caseIdx) => (
                                      <div key={caseIdx} className="flex items-center justify-between p-2 bg-white dark:bg-slate-900/50 rounded-lg text-xs">
                                        <span className="text-primary">{caseItem.name}</span>
                                        <span className="text-secondary">{caseItem.type}</span>
                                        <span className="text-secondary">{caseItem.reason}</span>
                                      </div>
                                    ))}
                                  </div>
                                )}

                                {req.demographics && (
                                  <div className="mt-3 grid grid-cols-2 gap-3">
                                    <div>
                                      <p className="text-xs text-slate-500 mb-2">Race/Ethnicity</p>
                                      {req.demographics.raceEthnicity.map((item, i) => (
                                        <div key={i} className="flex justify-between text-xs py-1">
                                          <span className="text-secondary">{item.category}</span>
                                          <span className="text-primary">{item.count} ({item.percent}%)</span>
                                        </div>
                                      ))}
                                    </div>
                                    <div>
                                      <p className="text-xs text-slate-500 mb-2">Gender</p>
                                      {req.demographics.gender.map((item, i) => (
                                        <div key={i} className="flex justify-between text-xs py-1">
                                          <span className="text-secondary">{item.category}</span>
                                          <span className="text-primary">{item.count} ({item.percent}%)</span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}

                                {req.eligible && (
                                  <p className="text-xs text-secondary mt-1">
                                    Eligible: <span className="text-green-400">{req.eligible.count}/{req.eligible.total}</span> ({req.eligible.percent}%)
                                  </p>
                                )}

                                {req.current !== undefined && req.total !== undefined && (
                                  <p className="text-xs mt-1">
                                    <span className={req.status === 'violation' ? 'text-red-400' : 'text-green-400'}>
                                      {req.current}/{req.total} ({req.percent}%)
                                    </span>
                                    {req.overdue > 0 && (
                                      <span className="text-red-400 ml-2">• {req.overdue} overdue</span>
                                    )}
                                  </p>
                                )}

                                {req.breakdown && (
                                  <div className="mt-2 space-y-1">
                                    {req.breakdown.map((item, i) => (
                                      <div key={i} className="flex justify-between text-xs">
                                        <span className="text-secondary">{item.level}</span>
                                        <span className="text-primary">{item.count} ({item.percent}%)</span>
                                      </div>
                                    ))}
                                  </div>
                                )}

                                {req.needTraining !== undefined && (
                                  <p className="text-xs mt-1">
                                    <span className="text-amber-700">{req.needTraining} employees need training</span>
                                    <span className="text-slate-500 ml-2">• Deadline: {req.deadline}</span>
                                    <span className="text-slate-500 ml-2">• {req.daysRemaining} days remaining</span>
                                  </p>
                                )}
                              </div>
                            );
                          })}
                        </div>

                        {/* View Details Button */}
                        <div className="flex gap-3 mt-4">
                          <button className="flex-1 px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 text-blue-400 rounded-lg text-sm font-medium transition-all">
                            View Full Documentation
                          </button>
                          <button className="px-4 py-2 bg-slate-50 dark:bg-slate-700/40 hover:bg-slate-700/60 border border-slate-600/50 text-secondary rounded-lg text-sm font-medium transition-all">
                            Export Audit Report
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </main>
      </div>

      {/* Chat Button */}
      <button
        onClick={() => setChatOpen(!chatOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110 z-40"
      >
        {chatOpen ? <X className="w-6 h-6 text-primary" /> : <MessageCircle className="w-6 h-6 text-primary" />}
      </button>

      {chatOpen && (
        <div className="fixed bottom-24 right-6 w-full max-w-96 h-[500px] bg-surface-raised backdrop-blur-xl border border-border rounded-2xl shadow-2xl flex flex-col z-40 mx-4 sm:mx-0">
          <div className="p-4 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-primary">Compliance Assistant</h3>
                <p className="text-xs text-green-400">Online</p>
              </div>
            </div>
          </div>
          <div className="flex-1 p-4 overflow-y-auto">
            <div className="flex gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1">
                <div className="bg-white dark:bg-slate-800/60 p-3 rounded-xl">
                  <p className="text-sm text-slate-700 dark:text-slate-200">I can help you track compliance deadlines, interpret regulatory requirements, document corrective actions, and prepare audit reports. What do you need assistance with?</p>
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 border-t border-border">
            <div className="flex items-center gap-2">
              <input type="text" placeholder="Ask about compliance requirements..." className="flex-1 px-4 py-2 bg-white dark:bg-slate-800/40 border border-border rounded-xl text-primary placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500/50" />
              <button className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
                <Send className="w-5 h-5 text-primary" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

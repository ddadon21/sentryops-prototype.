import React, { useState, useEffect } from 'react';
import { LayoutDashboard, FolderOpen, FileText, Clock, UserCheck, Calendar, FileCheck, CheckCircle, CheckCircle2, TrendingUp, AlertTriangle, DollarSign, Eye, Activity, XCircle, Settings, Bell, Search, ChevronRight, Shield, X, Menu, ChevronLeft, LogOut, Edit, Phone, Mail, ChevronDown, User, MapPin, Building, GraduationCap, Award, Users, Circle, PauseCircle, AlertCircle, HelpCircle, BookOpen, ExternalLink, Download, Briefcase, BadgeCheck, FileWarning, Scale } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import DashboardLayout from '../layouts/DashboardLayout';
import { biNavigation, biProfile, biNotifications } from '../config/biConfig';

// Helper function for verification status icons
const getVerificationIcon = (status) => {
  switch (status) {
    case 'verified': return <CheckCircle2 className="w-4 h-4 text-green-400" />;
    case 'pending': return <Clock className="w-4 h-4 text-amber-400" />;
    case 'in_progress': return <Circle className="w-4 h-4 text-blue-400 animate-pulse" />;
    case 'requires_attention': return <AlertCircle className="w-4 h-4 text-red-400" />;
    case 'restricted': return <Shield className="w-4 h-4 text-slate-500" />;
    default: return <Circle className="w-4 h-4 text-slate-700" />;
  }
};

// Helper function for status badges
const getStatusBadge = (status) => {
  switch (status) {
    case 'verified':
      return <span className="px-2.5 py-1 bg-green-500/10 text-green-400 rounded-lg text-xs font-medium flex items-center gap-1.5"><CheckCircle2 className="w-3 h-3" />Verified</span>;
    case 'pending':
      return <span className="px-2.5 py-1 bg-amber-500/10 text-amber-400 rounded-lg text-xs font-medium flex items-center gap-1.5"><Clock className="w-3 h-3" />Pending</span>;
    case 'in_progress':
      return <span className="px-2.5 py-1 bg-blue-500/10 text-blue-400 rounded-lg text-xs font-medium flex items-center gap-1.5"><Circle className="w-3 h-3" />In Progress</span>;
    case 'requires_attention':
      return <span className="px-2.5 py-1 bg-red-500/10 text-red-400 rounded-lg text-xs font-medium flex items-center gap-1.5"><AlertCircle className="w-3 h-3" />Action Required</span>;
    case 'restricted':
      return <span className="px-2.5 py-1 bg-slate-500/10 text-slate-700 dark:text-slate-400 rounded-lg text-xs font-medium flex items-center gap-1.5"><Shield className="w-3 h-3" />Restricted</span>;
    case 'active':
      return <span className="px-2.5 py-1 bg-green-500/10 text-green-400 rounded-lg text-xs font-medium">Active</span>;
    case 'expiring_soon':
      return <span className="px-2.5 py-1 bg-amber-500/10 text-amber-400 rounded-lg text-xs font-medium flex items-center gap-1.5"><AlertTriangle className="w-3 h-3" />Expiring Soon</span>;
    case 'critical':
      return <span className="px-2.5 py-1 bg-red-500/10 text-red-400 rounded-lg text-xs font-medium flex items-center gap-1.5 animate-pulse"><AlertCircle className="w-3 h-3" />CRITICAL</span>;
    case 'contacted':
      return <span className="px-2.5 py-1 bg-green-500/10 text-green-400 rounded-lg text-xs font-medium">Contacted</span>;
    case 'interviewed':
      return <span className="px-2.5 py-1 bg-blue-500/10 text-blue-400 rounded-lg text-xs font-medium">Interviewed</span>;
    case 'awaiting_response':
      return <span className="px-2.5 py-1 bg-amber-500/10 text-amber-400 rounded-lg text-xs font-medium">Awaiting Response</span>;
    default:
      return <span className="px-2.5 py-1 bg-slate-500/10 text-slate-700 dark:text-slate-400 rounded-lg text-xs font-medium">{status}</span>;
  }
};

export default function SubjectRecords() {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState('subject-records');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [logoutConfirmOpen, setLogoutConfirmOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState('personal');
  const [resourcesOpen, setResourcesOpen] = useState(false);

  // Comprehensive case and applicant data
  const caseInfo = {
    caseId: 'BI-2025-0142',
    applicantName: 'Robert Anthony Martinez',
    position: 'Deputy Sheriff',
    isLateralTransfer: true,
    currentAgency: 'Metro Atlanta Police Department',
    priority: 'HIGH PRIORITY',
    investigator: 'Sgt. Jennifer Walsh',
    startDate: 'January 8, 2025',
    currentStage: 'Employment Verification',
    lastUpdated: 'January 23, 2025 at 4:15 PM'
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
    { id: 'subject-records', label: 'Subject Records', icon: UserCheck },
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

  // Comprehensive subject data with verification statuses
  const subjectData = {
    personal: {
      fullName: 'Robert Anthony Martinez',
      dob: 'March 15, 1992',
      age: '32',
      ssn: {
        value: '***-**-4567',
        status: 'restricted',
        verificationMethod: 'GCIC/NCIC verified',
        verifiedDate: 'January 10, 2025',
        verifiedBy: 'Sgt. Jennifer Walsh'
      },
      driversLicense: {
        number: 'GA-123456789',
        state: 'Georgia',
        class: 'Class C',
        expiration: 'March 15, 2028',
        status: 'verified',
        verificationMethod: 'Georgia DDS records check',
        verifiedDate: 'January 10, 2025',
        endorsements: 'None',
        restrictions: 'Corrective lenses required',
        violations: 'No violations on record'
      },
      phone: '(770) 555-0123',
      email: 'r.martinez@email.com',
      address: {
        street: '1234 Peachtree St NE',
        city: 'Atlanta',
        state: 'GA',
        zip: '30309',
        status: 'verified',
        verificationMethod: 'Utility records and physical verification',
        verifiedDate: 'January 12, 2025',
        residenceDuration: '3 years, 4 months',
        ownership: 'Rented (lease verified)'
      },
      emergencyContact: {
        name: 'Maria Martinez',
        relationship: 'Spouse',
        phone: '(770) 555-0124',
        address: 'Same as applicant',
        status: 'verified'
      },
      maritalStatus: 'Married',
      militaryService: {
        served: true,
        branch: 'U.S. Army',
        rank: 'E-5 Sergeant',
        serviceYears: '2010-2014',
        discharge: 'Honorable',
        status: 'verified',
        verificationMethod: 'DD-214 verified',
        verifiedDate: 'January 15, 2025'
      },
      citizenship: {
        status: 'U.S. Citizen',
        verificationMethod: 'Birth certificate verified',
        verifiedDate: 'January 10, 2025'
      }
    },
    employment: [
      {
        employer: 'Metro Atlanta Police Department',
        position: 'Patrol Officer',
        badge: '#4521',
        duration: 'January 2018 - Present',
        startDate: 'January 8, 2018',
        supervisor: 'Sgt. John Davis',
        supervisorPhone: '(404) 555-0150',
        reason: 'Career advancement - seeking deputy sheriff position',
        status: 'verified',
        verificationMethod: 'HR records and supervisor interview',
        verifiedDate: 'January 18, 2025',
        verifiedBy: 'Sgt. Jennifer Walsh',
        salary: '$58,500/year',
        isCurrentLEO: true,
        iaRecordsRequired: true,
        iaRecordsStatus: 'in_progress',
        iaRecordsNote: 'MANDATORY: Internal Affairs records request submitted January 15, 2025. Awaiting response from Metro Atlanta PD IA Unit.',
        disciplinaryHistory: 'Pending IA records review',
        performanceRating: 'Meets Standards (per supervisor)',
        notes: 'Supervisor reports good performance. No documented concerns. Full IA review pending.'
      },
      {
        employer: 'Atlanta Security Services',
        position: 'Security Supervisor',
        duration: 'June 2015 - December 2017',
        startDate: 'June 1, 2015',
        endDate: 'December 31, 2017',
        supervisor: 'Mike Johnson',
        supervisorPhone: '(404) 555-0160',
        reason: 'Joined law enforcement',
        status: 'verified',
        verificationMethod: 'HR records verified via phone',
        verifiedDate: 'January 16, 2025',
        verifiedBy: 'Sgt. Jennifer Walsh',
        salary: '$42,000/year',
        isCurrentLEO: false,
        disciplinaryHistory: 'None on file',
        performanceRating: 'Excellent',
        notes: 'Supervisor confirmed excellent work ethic and leadership skills. Eligible for rehire.'
      },
      {
        employer: 'Campus Safety - Georgia State University',
        position: 'Security Officer',
        duration: 'August 2012 - May 2015',
        startDate: 'August 15, 2012',
        endDate: 'May 31, 2015',
        supervisor: 'Linda Chen',
        supervisorPhone: '(404) 555-0170',
        reason: 'Career growth - moved to private security',
        status: 'verified',
        verificationMethod: 'University HR records',
        verifiedDate: 'January 17, 2025',
        verifiedBy: 'Sgt. Jennifer Walsh',
        salary: '$28,000/year (part-time while in school)',
        isCurrentLEO: false,
        disciplinaryHistory: 'None on file',
        performanceRating: 'Good',
        notes: 'Worked while completing degree. Supervisor confirmed reliability.'
      }
    ],
    education: [
      {
        institution: 'Georgia State University',
        degree: 'Bachelor of Science in Criminal Justice',
        major: 'Criminal Justice',
        minor: 'Psychology',
        graduated: 'May 2015',
        gpa: '3.7',
        status: 'verified',
        verificationMethod: 'Official transcript received',
        verifiedDate: 'January 14, 2025',
        verifiedBy: 'Sgt. Jennifer Walsh',
        transcriptOnFile: true,
        honors: 'Magna Cum Laude',
        relevantCoursework: 'Criminal Investigation, Constitutional Law, Forensic Psychology'
      },
      {
        institution: 'Georgia Police Academy',
        degree: 'P.O.S.T. Certification',
        major: 'Basic Law Enforcement Training',
        graduated: 'March 2018',
        gpa: 'Honors Graduate',
        status: 'verified',
        verificationMethod: 'POST Council verification',
        verifiedDate: 'January 14, 2025',
        verifiedBy: 'Sgt. Jennifer Walsh',
        transcriptOnFile: true,
        academyRank: '5th of 42 cadets',
        specializations: 'Defensive Tactics, Emergency Vehicle Operations'
      }
    ],
    certifications: [
      {
        name: 'P.O.S.T. Certification (Georgia)',
        issued: 'March 2018',
        expires: 'March 2026',
        status: 'active',
        certNumber: 'GA-POST-2018-45672',
        verificationMethod: 'Georgia POST Council database',
        verifiedDate: 'January 14, 2025',
        issuingAuthority: 'Georgia Peace Officer Standards and Training Council',
        daysUntilExpiration: 425,
        notes: 'Active and in good standing'
      },
      {
        name: 'Advanced Firearms Qualification',
        issued: 'March 2024',
        expires: 'March 2025',
        status: 'expiring_soon',
        certNumber: 'AFQ-2024-1156',
        verificationMethod: 'Metro Atlanta PD training records',
        verifiedDate: 'January 18, 2025',
        issuingAuthority: 'Metro Atlanta Police Department',
        daysUntilExpiration: 55,
        notes: 'Renewal due within 60 days'
      },
      {
        name: 'Crisis Intervention Team (CIT)',
        issued: 'June 2020',
        expires: 'June 2025',
        status: 'active',
        certNumber: 'CIT-GA-2020-892',
        verificationMethod: 'Georgia CIT Council records',
        verifiedDate: 'January 14, 2025',
        issuingAuthority: 'Georgia CIT Council',
        daysUntilExpiration: 157,
        notes: '40-hour certification completed'
      },
      {
        name: 'CPR/First Aid/AED',
        issued: 'January 2023',
        expires: 'January 27, 2025',
        status: 'critical',
        certNumber: 'ARC-2023-78542',
        verificationMethod: 'American Red Cross database',
        verifiedDate: 'January 14, 2025',
        issuingAuthority: 'American Red Cross',
        daysUntilExpiration: 2,
        notes: 'CRITICAL: EXPIRES IN 2 DAYS - Applicant notified January 20, 2025. Must renew before hire.'
      },
      {
        name: 'TASER Certification',
        issued: 'September 2023',
        expires: 'September 2025',
        status: 'active',
        certNumber: 'TASER-2023-4421',
        verificationMethod: 'Axon training records',
        verifiedDate: 'January 18, 2025',
        issuingAuthority: 'Axon Enterprise / Metro Atlanta PD',
        daysUntilExpiration: 245,
        notes: 'Current certification valid'
      }
    ],
    references: [
      {
        name: 'Sgt. John Davis',
        relationship: 'Current Supervisor (Metro Atlanta PD)',
        phone: '(404) 555-0101',
        email: 'j.davis@metroatlantapd.gov',
        status: 'interviewed',
        interviewDate: 'January 18, 2025',
        interviewedBy: 'Sgt. Jennifer Walsh',
        interviewMethod: 'Phone interview',
        yearsKnown: '7 years',
        recommendsHiring: true,
        summary: 'Supervisor for 5 years. Describes applicant as reliable, professional, and well-suited for deputy sheriff role. No disciplinary issues. Strong community policing skills. Notes applicant is seeking advancement opportunities not available at current agency.',
        bradyGiglio: 'No known credibility issues',
        notes: 'Very positive reference. Willing to provide written recommendation.'
      },
      {
        name: 'Captain Sarah Williams',
        relationship: 'Previous Supervisor (Metro Atlanta PD)',
        phone: '(404) 555-0102',
        email: 's.williams@metroatlantapd.gov',
        status: 'interviewed',
        interviewDate: 'January 19, 2025',
        interviewedBy: 'Sgt. Jennifer Walsh',
        interviewMethod: 'Phone interview',
        yearsKnown: '4 years',
        recommendsHiring: true,
        summary: 'Supervised applicant during his first 2 years. Describes him as quick learner with excellent judgment. Promoted him to field training duties. No concerns about character or performance.',
        bradyGiglio: 'No known credibility issues',
        notes: 'Positive reference. Commented on strong ethics.'
      },
      {
        name: 'Officer Michael Brown',
        relationship: 'Colleague/Partner (Metro Atlanta PD)',
        phone: '(404) 555-0103',
        email: 'm.brown@metroatlantapd.gov',
        status: 'awaiting_response',
        attemptedContact: 'January 20, 2025, January 22, 2025',
        interviewedBy: null,
        interviewMethod: 'Phone (voicemail left)',
        yearsKnown: '5 years',
        recommendsHiring: null,
        summary: null,
        notes: 'Two contact attempts made. Voicemails left. Will attempt again January 25, 2025.'
      },
      {
        name: 'Maria Martinez',
        relationship: 'Spouse',
        phone: '(770) 555-0124',
        email: 'm.martinez@email.com',
        status: 'interviewed',
        interviewDate: 'January 21, 2025',
        interviewedBy: 'Sgt. Jennifer Walsh',
        interviewMethod: 'In-person home visit',
        yearsKnown: '10 years (married 6 years)',
        recommendsHiring: true,
        summary: 'Supportive of career move. Confirms no substance abuse issues, stable financial situation. Described applicant as dedicated to law enforcement career. Family aware of job demands.',
        notes: 'Home visit conducted. Residence appeared well-maintained.'
      },
      {
        name: 'Internal Affairs Review (Metro Atlanta PD)',
        relationship: 'MANDATORY - Lateral Transfer Requirement',
        phone: '(404) 555-0199',
        email: 'ia.records@metroatlantapd.gov',
        status: 'in_progress',
        requestDate: 'January 15, 2025',
        interviewedBy: null,
        interviewMethod: 'Formal records request',
        yearsKnown: null,
        recommendsHiring: null,
        summary: null,
        isIAReview: true,
        isMandatory: true,
        notes: 'MANDATORY for lateral transfers. Records request sent to Metro Atlanta PD Internal Affairs Unit. Expected response within 10 business days. Cannot proceed to final review without IA clearance.'
      }
    ],
    // Verification summary counts
    verificationSummary: {
      totalItems: 18,
      verified: 12,
      pending: 4,
      requiresAttention: 2
    },
    // Brady/Giglio status
    bradyGiglio: {
      status: 'pending_review',
      reviewDate: null,
      reviewer: null,
      notes: 'Pending completion of IA records review from current employer. Required for all lateral transfers.'
    }
  };

  const notifications = [
    { id: 1, title: 'CRITICAL: Certification Expiring', message: 'CPR/First Aid expires in 2 DAYS - Applicant must renew before hire', time: '2 hours ago', urgent: true },
    { id: 2, title: 'IA Records Pending', message: 'Metro Atlanta PD IA response pending - submitted Jan 15', time: '8 days ago', urgent: true },
    { id: 3, title: 'Reference Pending', message: 'Officer Michael Brown - 2 contact attempts made', time: '3 days ago', urgent: false },
    { id: 4, title: 'Firearms Cert Expiring', message: 'Advanced Firearms expires in 55 days', time: '1 week ago', urgent: false }
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
      <div className="p-5 lg:p-8 space-y-8 bg-slate-100 dark:bg-transparent min-h-full">
          <div className="max-w-7xl mx-auto">
            {/* Page Header with Case Context */}
            <div className="mb-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white">Subject Records</h2>
                    <span className="px-3 py-1 bg-red-500/10 text-red-400 rounded-lg text-xs font-bold uppercase">
                      {caseInfo.priority}
                    </span>
                    {caseInfo.isLateralTransfer && (
                      <span className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-lg text-xs font-bold uppercase flex items-center gap-1.5">
                        <BadgeCheck className="w-3.5 h-3.5" />
                        Lateral Transfer
                      </span>
                    )}
                  </div>
                  <p className="text-slate-700 dark:text-slate-400">{caseInfo.applicantName} — {caseInfo.position} Application</p>
                </div>
                <div className="flex flex-wrap items-center gap-3 text-sm">
                  <div className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-slate-800/40 rounded-lg border border-slate-700/50">
                    <FileText className="w-4 h-4 text-slate-500" />
                    <span className="text-slate-700 dark:text-slate-400">Case:</span>
                    <span className="text-amber-400 font-medium">{caseInfo.caseId}</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-slate-800/40 rounded-lg border border-slate-700/50">
                    <Clock className="w-4 h-4 text-slate-500" />
                    <span className="text-slate-700 dark:text-slate-400">Stage:</span>
                    <span className="text-slate-900 dark:text-white font-medium">{caseInfo.currentStage}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4 text-xs text-slate-500">
                <span>Assigned to: <span className="text-slate-700 dark:text-slate-300">{caseInfo.investigator}</span></span>
                <span className="text-slate-700">•</span>
                <span>Last updated: {caseInfo.lastUpdated}</span>
              </div>
            </div>

            {/* Verification Status Summary */}
            <div className="mb-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Critical Alerts */}
              <div className="lg:col-span-2 bg-gradient-to-br from-red-500/10 to-red-600/5 border border-red-500/30 rounded-xl p-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-red-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <AlertTriangle className="w-6 h-6 text-red-400" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-base font-semibold text-slate-900 dark:text-white mb-3">Items Requiring Attention</h4>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2 p-2 bg-red-500/10 rounded-lg">
                        <AlertCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0 animate-pulse" />
                        <div>
                          <p className="text-sm text-red-300 font-medium">CRITICAL: CPR/First Aid certification expires January 27, 2025 (2 DAYS)</p>
                          <p className="text-xs text-red-400/70 mt-1">Applicant notified January 20, 2025. Must renew before hire date.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2 p-2 bg-amber-500/10 rounded-lg">
                        <Clock className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm text-amber-300 font-medium">Internal Affairs records pending (MANDATORY for lateral transfers)</p>
                          <p className="text-xs text-amber-400/70 mt-1">Request submitted January 15, 2025 to Metro Atlanta PD IA Unit. Est. response: 10 business days.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2 p-2 bg-amber-500/10 rounded-lg">
                        <Clock className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm text-amber-300 font-medium">Reference contact pending: Officer Michael Brown</p>
                          <p className="text-xs text-amber-400/70 mt-1">2 contact attempts made. Next attempt scheduled January 25, 2025.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Verification Progress */}
              <div className="bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/50 rounded-xl shadow-sm dark:shadow-none p-5">
                <h4 className="text-base font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  Verification Summary
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-700 dark:text-slate-400">Personal Information</span>
                    {getStatusBadge('verified')}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-700 dark:text-slate-400">Employment History</span>
                    {getStatusBadge('in_progress')}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-700 dark:text-slate-400">Education Records</span>
                    {getStatusBadge('verified')}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-700 dark:text-slate-400">Certifications</span>
                    {getStatusBadge('requires_attention')}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-700 dark:text-slate-400">References</span>
                    <span className="text-xs text-slate-700 dark:text-slate-400">4 of 5 completed</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-700 dark:text-slate-400">Criminal History</span>
                    {getStatusBadge('verified')}
                  </div>
                  <div className="pt-2 border-t border-slate-200 dark:border-slate-700/50">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-700 dark:text-slate-300 font-medium">Brady/Giglio Review</span>
                      {getStatusBadge('pending')}
                    </div>
                    <p className="text-xs text-slate-500 mt-1">Pending IA records completion</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Lateral Transfer Notice */}
            {caseInfo.isLateralTransfer && (
              <div className="mb-6 bg-blue-500/5 border border-blue-500/20 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <BadgeCheck className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-blue-300 mb-1">Lateral Transfer Applicant — Additional Requirements Apply</h4>
                    <p className="text-xs text-blue-400/70">
                      Applicant is currently a sworn law enforcement officer with {caseInfo.currentAgency}.
                      Internal Affairs records review is <span className="font-semibold text-blue-300">MANDATORY</span> before case can proceed to final review.
                      Brady/Giglio credibility assessment must be completed based on IA records and supervisor references.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Applicant Header Card */}
            <div className="bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/50 rounded-xl shadow-sm dark:shadow-none p-6 mb-6">
              <div className="flex flex-col lg:flex-row items-start gap-6">
                <div className="w-24 h-24 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center text-slate-900 dark:text-white text-3xl font-bold flex-shrink-0">
                  RM
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{subjectData.personal.fullName}</h3>
                    <CheckCircle2 className="w-5 h-5 text-green-400" title="Identity Verified" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm mb-4">
                    <div className="flex items-start gap-2">
                      <Calendar className="w-4 h-4 text-slate-500 mt-0.5" />
                      <div>
                        <p className="text-xs text-slate-500">Date of Birth</p>
                        <p className="text-slate-700 dark:text-slate-300">{subjectData.personal.dob} ({subjectData.personal.age})</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Shield className="w-4 h-4 text-slate-500 mt-0.5" />
                      <div>
                        <p className="text-xs text-slate-500">SSN (Restricted)</p>
                        <p className="text-slate-700 dark:text-slate-300">{subjectData.personal.ssn.value}</p>
                        <p className="text-xs text-green-400/70">{subjectData.personal.ssn.verificationMethod}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <FileText className="w-4 h-4 text-slate-500 mt-0.5" />
                      <div>
                        <p className="text-xs text-slate-500">Driver's License</p>
                        <p className="text-slate-700 dark:text-slate-300">{subjectData.personal.driversLicense.number}</p>
                        <p className="text-xs text-slate-500">{subjectData.personal.driversLicense.state} • Exp: {subjectData.personal.driversLicense.expiration}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Phone className="w-4 h-4 text-slate-500 mt-0.5" />
                      <div>
                        <p className="text-xs text-slate-500">Contact</p>
                        <p className="text-slate-700 dark:text-slate-300">{subjectData.personal.phone}</p>
                        <p className="text-xs text-slate-700 dark:text-slate-400">{subjectData.personal.email}</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-slate-500 mt-0.5" />
                      <div>
                        <p className="text-xs text-slate-500">Current Address</p>
                        <p className="text-slate-700 dark:text-slate-300">{subjectData.personal.address.street}, {subjectData.personal.address.city}, {subjectData.personal.address.state} {subjectData.personal.address.zip}</p>
                        <p className="text-xs text-green-400/70 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          Verified: {subjectData.personal.address.verificationMethod}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Users className="w-4 h-4 text-slate-500 mt-0.5" />
                      <div>
                        <p className="text-xs text-slate-500">Emergency Contact</p>
                        <p className="text-slate-700 dark:text-slate-300">{subjectData.personal.emergencyContact.name} ({subjectData.personal.emergencyContact.relationship})</p>
                        <p className="text-xs text-slate-700 dark:text-slate-400">{subjectData.personal.emergencyContact.phone}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <button className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-sm font-medium transition-colors flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Export Records
                  </button>
                  <button className="px-4 py-2 bg-white dark:bg-slate-700/50 hover:bg-slate-700 text-slate-900 dark:text-white rounded-xl text-sm font-medium transition-colors flex items-center gap-2 border border-slate-600/50">
                    <Edit className="w-4 h-4" />
                    Edit Info
                  </button>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/50 rounded-xl overflow-hidden">
              <div className="flex border-b border-slate-200 dark:border-slate-700/50 overflow-x-auto">
                <button
                  onClick={() => setSelectedTab('personal')}
                  className={`px-6 py-4 text-sm font-medium transition-all whitespace-nowrap ${selectedTab === 'personal' ? 'bg-amber-500/10 text-amber-400 border-b-2 border-amber-500' : 'text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}
                >
                  Personal Info
                </button>
                <button
                  onClick={() => setSelectedTab('employment')}
                  className={`px-6 py-4 text-sm font-medium transition-all whitespace-nowrap ${selectedTab === 'employment' ? 'bg-amber-500/10 text-amber-400 border-b-2 border-amber-500' : 'text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}
                >
                  Employment History
                </button>
                <button
                  onClick={() => setSelectedTab('education')}
                  className={`px-6 py-4 text-sm font-medium transition-all whitespace-nowrap ${selectedTab === 'education' ? 'bg-amber-500/10 text-amber-400 border-b-2 border-amber-500' : 'text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}
                >
                  Education
                </button>
                <button
                  onClick={() => setSelectedTab('certifications')}
                  className={`px-6 py-4 text-sm font-medium transition-all whitespace-nowrap ${selectedTab === 'certifications' ? 'bg-amber-500/10 text-amber-400 border-b-2 border-amber-500' : 'text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}
                >
                  Certifications
                </button>
                <button
                  onClick={() => setSelectedTab('references')}
                  className={`px-6 py-4 text-sm font-medium transition-all whitespace-nowrap ${selectedTab === 'references' ? 'bg-amber-500/10 text-amber-400 border-b-2 border-amber-500' : 'text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}
                >
                  References
                </button>
              </div>

              <div className="p-6">
                {/* Personal Info Tab */}
                {selectedTab === 'personal' && (
                  <div className="space-y-6">
                    {/* Identity Verification */}
                    <div className="bg-white dark:bg-slate-900/40 rounded-xl p-4">
                      <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                        <User className="w-4 h-4 text-amber-400" />
                        Identity Information
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="bg-white dark:bg-slate-800/40 rounded-lg p-3">
                          <div className="flex items-center justify-between mb-2">
                            <label className="text-xs text-slate-500">Full Legal Name</label>
                            {getVerificationIcon('verified')}
                          </div>
                          <p className="text-sm text-slate-900 dark:text-white font-medium">{subjectData.personal.fullName}</p>
                        </div>
                        <div className="bg-white dark:bg-slate-800/40 rounded-lg p-3">
                          <div className="flex items-center justify-between mb-2">
                            <label className="text-xs text-slate-500">Date of Birth</label>
                            {getVerificationIcon('verified')}
                          </div>
                          <p className="text-sm text-slate-900 dark:text-white font-medium">{subjectData.personal.dob}</p>
                          <p className="text-xs text-slate-500">Age: {subjectData.personal.age} years</p>
                        </div>
                        <div className="bg-white dark:bg-slate-800/40 rounded-lg p-3">
                          <div className="flex items-center justify-between mb-2">
                            <label className="text-xs text-slate-500">SSN (Restricted Access)</label>
                            {getVerificationIcon('restricted')}
                          </div>
                          <p className="text-sm text-slate-900 dark:text-white font-medium">{subjectData.personal.ssn.value}</p>
                          <p className="text-xs text-green-400/70">{subjectData.personal.ssn.verificationMethod}</p>
                          <p className="text-xs text-slate-500">Verified: {subjectData.personal.ssn.verifiedDate}</p>
                        </div>
                        <div className="bg-white dark:bg-slate-800/40 rounded-lg p-3">
                          <div className="flex items-center justify-between mb-2">
                            <label className="text-xs text-slate-500">Citizenship</label>
                            {getVerificationIcon('verified')}
                          </div>
                          <p className="text-sm text-slate-900 dark:text-white font-medium">{subjectData.personal.citizenship.status}</p>
                          <p className="text-xs text-green-400/70">{subjectData.personal.citizenship.verificationMethod}</p>
                        </div>
                        <div className="bg-white dark:bg-slate-800/40 rounded-lg p-3">
                          <div className="flex items-center justify-between mb-2">
                            <label className="text-xs text-slate-500">Marital Status</label>
                            {getVerificationIcon('verified')}
                          </div>
                          <p className="text-sm text-slate-900 dark:text-white font-medium">{subjectData.personal.maritalStatus}</p>
                        </div>
                      </div>
                    </div>

                    {/* Driver's License Details */}
                    <div className="bg-white dark:bg-slate-900/40 rounded-xl p-4">
                      <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                        <FileText className="w-4 h-4 text-amber-400" />
                        Driver's License
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="bg-white dark:bg-slate-800/40 rounded-lg p-3">
                          <div className="flex items-center justify-between mb-2">
                            <label className="text-xs text-slate-500">License Number</label>
                            {getVerificationIcon('verified')}
                          </div>
                          <p className="text-sm text-slate-900 dark:text-white font-medium">{subjectData.personal.driversLicense.number}</p>
                          <p className="text-xs text-slate-500">{subjectData.personal.driversLicense.state} - {subjectData.personal.driversLicense.class}</p>
                        </div>
                        <div className="bg-white dark:bg-slate-800/40 rounded-lg p-3">
                          <label className="text-xs text-slate-500 block mb-2">Expiration</label>
                          <p className="text-sm text-slate-900 dark:text-white font-medium">{subjectData.personal.driversLicense.expiration}</p>
                        </div>
                        <div className="bg-white dark:bg-slate-800/40 rounded-lg p-3">
                          <label className="text-xs text-slate-500 block mb-2">Restrictions</label>
                          <p className="text-sm text-slate-900 dark:text-white font-medium">{subjectData.personal.driversLicense.restrictions}</p>
                        </div>
                        <div className="bg-white dark:bg-slate-800/40 rounded-lg p-3">
                          <label className="text-xs text-slate-500 block mb-2">Driving Record</label>
                          <p className="text-sm text-green-400 font-medium">{subjectData.personal.driversLicense.violations}</p>
                        </div>
                      </div>
                      <p className="text-xs text-slate-500 mt-3">
                        Verification Method: {subjectData.personal.driversLicense.verificationMethod} • Verified: {subjectData.personal.driversLicense.verifiedDate}
                      </p>
                    </div>

                    {/* Contact & Address */}
                    <div className="bg-white dark:bg-slate-900/40 rounded-xl p-4">
                      <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-amber-400" />
                        Contact & Residence
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-white dark:bg-slate-800/40 rounded-lg p-3">
                          <div className="flex items-center justify-between mb-2">
                            <label className="text-xs text-slate-500">Current Address</label>
                            {getVerificationIcon('verified')}
                          </div>
                          <p className="text-sm text-slate-900 dark:text-white font-medium">{subjectData.personal.address.street}</p>
                          <p className="text-sm text-slate-900 dark:text-white">{subjectData.personal.address.city}, {subjectData.personal.address.state} {subjectData.personal.address.zip}</p>
                          <div className="mt-2 space-y-1">
                            <p className="text-xs text-slate-700 dark:text-slate-400">Duration at Address: {subjectData.personal.address.residenceDuration}</p>
                            <p className="text-xs text-slate-700 dark:text-slate-400">Ownership: {subjectData.personal.address.ownership}</p>
                            <p className="text-xs text-green-400/70">{subjectData.personal.address.verificationMethod}</p>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div className="bg-white dark:bg-slate-800/40 rounded-lg p-3">
                            <label className="text-xs text-slate-500 block mb-2">Phone</label>
                            <p className="text-sm text-slate-900 dark:text-white font-medium">{subjectData.personal.phone}</p>
                          </div>
                          <div className="bg-white dark:bg-slate-800/40 rounded-lg p-3">
                            <label className="text-xs text-slate-500 block mb-2">Email</label>
                            <p className="text-sm text-slate-900 dark:text-white font-medium">{subjectData.personal.email}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Military Service */}
                    {subjectData.personal.militaryService.served && (
                      <div className="bg-white dark:bg-slate-900/40 rounded-xl p-4">
                        <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                          <Shield className="w-4 h-4 text-amber-400" />
                          Military Service
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                          <div className="bg-white dark:bg-slate-800/40 rounded-lg p-3">
                            <div className="flex items-center justify-between mb-2">
                              <label className="text-xs text-slate-500">Branch</label>
                              {getVerificationIcon('verified')}
                            </div>
                            <p className="text-sm text-slate-900 dark:text-white font-medium">{subjectData.personal.militaryService.branch}</p>
                          </div>
                          <div className="bg-white dark:bg-slate-800/40 rounded-lg p-3">
                            <label className="text-xs text-slate-500 block mb-2">Rank at Discharge</label>
                            <p className="text-sm text-slate-900 dark:text-white font-medium">{subjectData.personal.militaryService.rank}</p>
                          </div>
                          <div className="bg-white dark:bg-slate-800/40 rounded-lg p-3">
                            <label className="text-xs text-slate-500 block mb-2">Service Years</label>
                            <p className="text-sm text-slate-900 dark:text-white font-medium">{subjectData.personal.militaryService.serviceYears}</p>
                          </div>
                          <div className="bg-white dark:bg-slate-800/40 rounded-lg p-3">
                            <label className="text-xs text-slate-500 block mb-2">Discharge Type</label>
                            <p className="text-sm text-green-400 font-medium">{subjectData.personal.militaryService.discharge}</p>
                          </div>
                        </div>
                        <p className="text-xs text-slate-500 mt-3">
                          Verification Method: {subjectData.personal.militaryService.verificationMethod} • Verified: {subjectData.personal.militaryService.verifiedDate}
                        </p>
                      </div>
                    )}

                    {/* Emergency Contact */}
                    <div className="bg-white dark:bg-slate-900/40 rounded-xl p-4">
                      <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                        <Users className="w-4 h-4 text-amber-400" />
                        Emergency Contact
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-white dark:bg-slate-800/40 rounded-lg p-3">
                          <div className="flex items-center justify-between mb-2">
                            <label className="text-xs text-slate-500">Name</label>
                            {getVerificationIcon('verified')}
                          </div>
                          <p className="text-sm text-slate-900 dark:text-white font-medium">{subjectData.personal.emergencyContact.name}</p>
                        </div>
                        <div className="bg-white dark:bg-slate-800/40 rounded-lg p-3">
                          <label className="text-xs text-slate-500 block mb-2">Relationship</label>
                          <p className="text-sm text-slate-900 dark:text-white font-medium">{subjectData.personal.emergencyContact.relationship}</p>
                        </div>
                        <div className="bg-white dark:bg-slate-800/40 rounded-lg p-3">
                          <label className="text-xs text-slate-500 block mb-2">Phone</label>
                          <p className="text-sm text-slate-900 dark:text-white font-medium">{subjectData.personal.emergencyContact.phone}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Employment Tab */}
                {selectedTab === 'employment' && (
                  <div className="space-y-4">
                    {subjectData.employment.map((job, idx) => (
                      <div key={idx} className={`bg-white dark:bg-slate-900/40 rounded-xl p-4 ${job.isCurrentLEO ? 'border border-blue-500/30' : ''}`}>
                        {/* LEO Status Banner */}
                        {job.isCurrentLEO && (
                          <div className="mb-4 bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
                            <div className="flex items-center gap-2 text-blue-300 text-sm font-medium mb-1">
                              <BadgeCheck className="w-4 h-4" />
                              Current Law Enforcement Position — Lateral Transfer Requirements Apply
                            </div>
                            <p className="text-xs text-blue-400/70">
                              Internal Affairs records review and Brady/Giglio credibility assessment required.
                            </p>
                          </div>
                        )}

                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="text-base font-semibold text-slate-900 dark:text-white">{job.position}</h4>
                              {job.badge && <span className="text-xs text-slate-500">Badge {job.badge}</span>}
                            </div>
                            <p className="text-sm text-amber-400">{job.employer}</p>
                          </div>
                          {getStatusBadge(job.status)}
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                          <div>
                            <p className="text-slate-500 text-xs mb-1">Duration</p>
                            <p className="text-slate-700 dark:text-slate-300">{job.duration}</p>
                          </div>
                          <div>
                            <p className="text-slate-500 text-xs mb-1">Supervisor</p>
                            <p className="text-slate-700 dark:text-slate-300">{job.supervisor}</p>
                            <p className="text-xs text-slate-500">{job.supervisorPhone}</p>
                          </div>
                          <div>
                            <p className="text-slate-500 text-xs mb-1">Salary</p>
                            <p className="text-slate-700 dark:text-slate-300">{job.salary}</p>
                          </div>
                          <div>
                            <p className="text-slate-500 text-xs mb-1">Reason for Leaving</p>
                            <p className="text-slate-700 dark:text-slate-300">{job.reason}</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-4">
                          <div>
                            <p className="text-slate-500 text-xs mb-1">Disciplinary History</p>
                            <p className={`text-slate-700 dark:text-slate-300 ${job.disciplinaryHistory === 'None on file' ? 'text-green-400' : ''}`}>
                              {job.disciplinaryHistory}
                            </p>
                          </div>
                          <div>
                            <p className="text-slate-500 text-xs mb-1">Performance Rating</p>
                            <p className="text-slate-700 dark:text-slate-300">{job.performanceRating}</p>
                          </div>
                        </div>

                        {/* IA Records Status for LEO */}
                        {job.iaRecordsRequired && (
                          <div className={`mt-4 p-3 rounded-lg ${job.iaRecordsStatus === 'in_progress' ? 'bg-amber-500/10 border border-amber-500/20' : 'bg-green-500/10 border border-green-500/20'}`}>
                            <div className="flex items-start gap-2">
                              {job.iaRecordsStatus === 'in_progress' ? (
                                <Clock className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                              ) : (
                                <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                              )}
                              <div>
                                <p className={`text-sm font-medium ${job.iaRecordsStatus === 'in_progress' ? 'text-amber-300' : 'text-green-300'}`}>
                                  Internal Affairs Records Review — {job.iaRecordsStatus === 'in_progress' ? 'PENDING' : 'COMPLETE'}
                                </p>
                                <p className={`text-xs mt-1 ${job.iaRecordsStatus === 'in_progress' ? 'text-amber-400/70' : 'text-green-400/70'}`}>
                                  {job.iaRecordsNote}
                                </p>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Investigator Notes */}
                        {job.notes && (
                          <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700/50">
                            <p className="text-xs text-slate-500 mb-1">Investigator Notes</p>
                            <p className="text-sm text-slate-700 dark:text-slate-400">{job.notes}</p>
                          </div>
                        )}

                        {/* Verification Info */}
                        <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-700/50 flex items-center justify-between text-xs text-slate-500">
                          <span>Verification: {job.verificationMethod}</span>
                          <span>Verified {job.verifiedDate} by {job.verifiedBy}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Education Tab */}
                {selectedTab === 'education' && (
                  <div className="space-y-4">
                    {subjectData.education.map((edu, idx) => (
                      <div key={idx} className="bg-white dark:bg-slate-900/40 rounded-xl p-4">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="text-base font-semibold text-slate-900 dark:text-white">{edu.degree}</h4>
                              {edu.honors && (
                                <span className="px-2 py-0.5 bg-amber-500/10 text-amber-400 rounded text-xs font-medium">
                                  {edu.honors}
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-amber-400">{edu.institution}</p>
                          </div>
                          {getStatusBadge(edu.status)}
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                          <div>
                            <p className="text-slate-500 text-xs mb-1">Major</p>
                            <p className="text-slate-700 dark:text-slate-300">{edu.major}</p>
                          </div>
                          {edu.minor && (
                            <div>
                              <p className="text-slate-500 text-xs mb-1">Minor</p>
                              <p className="text-slate-700 dark:text-slate-300">{edu.minor}</p>
                            </div>
                          )}
                          <div>
                            <p className="text-slate-500 text-xs mb-1">Graduated</p>
                            <p className="text-slate-700 dark:text-slate-300">{edu.graduated}</p>
                          </div>
                          <div>
                            <p className="text-slate-500 text-xs mb-1">GPA / Standing</p>
                            <p className="text-slate-700 dark:text-slate-300">{edu.gpa}</p>
                          </div>
                        </div>

                        {/* Academy-specific info */}
                        {edu.academyRank && (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-4">
                            <div>
                              <p className="text-slate-500 text-xs mb-1">Academy Rank</p>
                              <p className="text-slate-700 dark:text-slate-300">{edu.academyRank}</p>
                            </div>
                            {edu.specializations && (
                              <div>
                                <p className="text-slate-500 text-xs mb-1">Specializations</p>
                                <p className="text-slate-700 dark:text-slate-300">{edu.specializations}</p>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Relevant Coursework */}
                        {edu.relevantCoursework && (
                          <div className="mb-4">
                            <p className="text-slate-500 text-xs mb-1">Relevant Coursework</p>
                            <p className="text-slate-700 dark:text-slate-300 text-sm">{edu.relevantCoursework}</p>
                          </div>
                        )}

                        {/* Transcript Status */}
                        <div className="flex items-center gap-2 text-sm">
                          {edu.transcriptOnFile ? (
                            <>
                              <CheckCircle2 className="w-4 h-4 text-green-400" />
                              <span className="text-green-400">Official transcript on file</span>
                            </>
                          ) : (
                            <>
                              <Clock className="w-4 h-4 text-amber-400" />
                              <span className="text-amber-400">Awaiting official transcript</span>
                            </>
                          )}
                        </div>

                        {/* Verification Info */}
                        <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-700/50 flex items-center justify-between text-xs text-slate-500">
                          <span>Verification: {edu.verificationMethod}</span>
                          <span>Verified {edu.verifiedDate} by {edu.verifiedBy}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Certifications Tab */}
                {selectedTab === 'certifications' && (
                  <div className="space-y-4">
                    {/* Critical Alert for Expiring Certifications */}
                    {subjectData.certifications.some(cert => cert.status === 'critical') && (
                      <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
                        <div className="flex items-start gap-3">
                          <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 animate-pulse" />
                          <div>
                            <h4 className="text-sm font-semibold text-red-300 mb-1">CRITICAL: Certification Expiring Immediately</h4>
                            <p className="text-xs text-red-400/70">
                              One or more certifications are expiring within the next 7 days. Applicant must renew before hire date or hiring may be delayed.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {subjectData.certifications.map((cert, idx) => (
                      <div key={idx} className={`bg-white dark:bg-slate-900/40 rounded-xl p-4 ${cert.status === 'critical' ? 'border-2 border-red-500/50' : cert.status === 'expiring_soon' ? 'border border-amber-500/30' : ''}`}>
                        {/* Critical Badge */}
                        {cert.status === 'critical' && (
                          <div className="mb-3 bg-red-500/20 rounded-lg p-2 flex items-center gap-2">
                            <AlertCircle className="w-4 h-4 text-red-400 animate-pulse" />
                            <span className="text-sm font-bold text-red-300">EXPIRES IN {cert.daysUntilExpiration} DAYS</span>
                          </div>
                        )}

                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="text-base font-semibold text-slate-900 dark:text-white">{cert.name}</h4>
                            </div>
                            <p className="text-sm text-slate-700 dark:text-slate-400">{cert.issuingAuthority}</p>
                          </div>
                          {getStatusBadge(cert.status)}
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                          <div>
                            <p className="text-slate-500 text-xs mb-1">Certificate Number</p>
                            <p className="text-slate-700 dark:text-slate-300">{cert.certNumber}</p>
                          </div>
                          <div>
                            <p className="text-slate-500 text-xs mb-1">Date Issued</p>
                            <p className="text-slate-700 dark:text-slate-300">{cert.issued}</p>
                          </div>
                          <div>
                            <p className="text-slate-500 text-xs mb-1">Expiration Date</p>
                            <p className={`${cert.status === 'critical' ? 'text-red-400 font-bold' : cert.status === 'expiring_soon' ? 'text-amber-400' : 'text-slate-500'}`}>
                              {cert.expires}
                            </p>
                          </div>
                          <div>
                            <p className="text-slate-500 text-xs mb-1">Days Until Expiration</p>
                            <p className={`font-medium ${cert.daysUntilExpiration <= 7 ? 'text-red-400' : cert.daysUntilExpiration <= 60 ? 'text-amber-400' : 'text-green-400'}`}>
                              {cert.daysUntilExpiration} days
                            </p>
                          </div>
                        </div>

                        {/* Notes */}
                        {cert.notes && (
                          <div className={`p-3 rounded-lg ${cert.status === 'critical' ? 'bg-red-500/10' : 'bg-white dark:bg-slate-800/40'}`}>
                            <p className={`text-sm ${cert.status === 'critical' ? 'text-red-300 font-medium' : 'text-slate-500'}`}>
                              {cert.notes}
                            </p>
                          </div>
                        )}

                        {/* Verification Info */}
                        <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-700/50 text-xs text-slate-500">
                          <span>Verification: {cert.verificationMethod} • Verified {cert.verifiedDate}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* References Tab */}
                {selectedTab === 'references' && (
                  <div className="space-y-4">
                    {/* Reference Summary */}
                    <div className="bg-white dark:bg-slate-800/60 rounded-xl p-4 mb-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Users className="w-5 h-5 text-amber-400" />
                          <span className="text-sm font-medium text-slate-900 dark:text-white">Reference Check Progress</span>
                        </div>
                        <span className="text-sm text-slate-700 dark:text-slate-400">
                          {subjectData.references.filter(r => r.status === 'interviewed').length} of {subjectData.references.length} completed
                        </span>
                      </div>
                    </div>

                    {subjectData.references.map((ref, idx) => (
                      <div key={idx} className={`bg-white dark:bg-slate-900/40 rounded-xl p-4 ${ref.isIAReview ? 'border-2 border-amber-500/50' : ''}`}>
                        {/* IA Review Special Banner */}
                        {ref.isIAReview && (
                          <div className="mb-4 bg-amber-500/10 border border-amber-500/20 rounded-lg p-3">
                            <div className="flex items-center gap-2 text-amber-300 text-sm font-bold mb-1">
                              <Scale className="w-4 h-4" />
                              MANDATORY — Internal Affairs Records Review
                            </div>
                            <p className="text-xs text-amber-400/70">
                              Required for all lateral transfers from other law enforcement agencies. Cannot proceed to final hiring recommendation without IA clearance.
                            </p>
                          </div>
                        )}

                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h4 className="text-base font-semibold text-slate-900 dark:text-white mb-1">{ref.name}</h4>
                            <p className="text-sm text-amber-400">{ref.relationship}</p>
                          </div>
                          {getStatusBadge(ref.status)}
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm mb-4">
                          <div>
                            <p className="text-slate-500 text-xs mb-1">Contact</p>
                            <p className="text-slate-700 dark:text-slate-300">{ref.phone}</p>
                            {ref.email && <p className="text-xs text-slate-500">{ref.email}</p>}
                          </div>
                          {ref.yearsKnown && (
                            <div>
                              <p className="text-slate-500 text-xs mb-1">Years Known</p>
                              <p className="text-slate-700 dark:text-slate-300">{ref.yearsKnown}</p>
                            </div>
                          )}
                          {ref.interviewDate && (
                            <div>
                              <p className="text-slate-500 text-xs mb-1">Interview Date</p>
                              <p className="text-slate-700 dark:text-slate-300">{ref.interviewDate}</p>
                            </div>
                          )}
                          {ref.requestDate && !ref.interviewDate && (
                            <div>
                              <p className="text-slate-500 text-xs mb-1">Request Submitted</p>
                              <p className="text-slate-700 dark:text-slate-300">{ref.requestDate}</p>
                            </div>
                          )}
                          {ref.interviewMethod && (
                            <div>
                              <p className="text-slate-500 text-xs mb-1">Interview Method</p>
                              <p className="text-slate-700 dark:text-slate-300">{ref.interviewMethod}</p>
                            </div>
                          )}
                        </div>

                        {/* Interview Summary */}
                        {ref.summary && (
                          <div className="bg-white dark:bg-slate-800/40 rounded-lg p-3 mb-4">
                            <p className="text-xs text-slate-500 mb-2 font-medium">Interview Summary</p>
                            <p className="text-sm text-slate-700 dark:text-slate-300">{ref.summary}</p>
                          </div>
                        )}

                        {/* Recommendation Status */}
                        {ref.recommendsHiring !== null && ref.recommendsHiring !== undefined && (
                          <div className="flex items-center gap-2 mb-4">
                            <span className="text-xs text-slate-500">Recommends Hiring:</span>
                            {ref.recommendsHiring ? (
                              <span className="px-2 py-1 bg-green-500/10 text-green-400 rounded text-xs font-medium flex items-center gap-1">
                                <CheckCircle2 className="w-3 h-3" /> Yes
                              </span>
                            ) : (
                              <span className="px-2 py-1 bg-red-500/10 text-red-400 rounded text-xs font-medium flex items-center gap-1">
                                <XCircle className="w-3 h-3" /> No
                              </span>
                            )}
                          </div>
                        )}

                        {/* Brady/Giglio Status */}
                        {ref.bradyGiglio && (
                          <div className="bg-white dark:bg-slate-800/40 rounded-lg p-3 mb-4">
                            <p className="text-xs text-slate-500 mb-1 font-medium">Brady/Giglio Credibility Assessment</p>
                            <p className="text-sm text-green-400">{ref.bradyGiglio}</p>
                          </div>
                        )}

                        {/* Pending Contact Info */}
                        {ref.attemptedContact && (
                          <div className="bg-amber-500/10 rounded-lg p-3 mb-4">
                            <p className="text-xs text-amber-400/70 mb-1">Contact Attempts</p>
                            <p className="text-sm text-amber-300">{ref.attemptedContact}</p>
                          </div>
                        )}

                        {/* Notes */}
                        {ref.notes && (
                          <div className={`p-3 rounded-lg ${ref.isMandatory ? 'bg-amber-500/10' : 'bg-white dark:bg-slate-800/40'}`}>
                            <p className="text-xs text-slate-500 mb-1">Notes</p>
                            <p className={`text-sm ${ref.isMandatory ? 'text-amber-300' : 'text-slate-500'}`}>
                              {ref.notes}
                            </p>
                          </div>
                        )}

                        {/* Verification Info */}
                        {ref.interviewedBy && (
                          <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-700/50 text-xs text-slate-500">
                            <span>Interviewed by: {ref.interviewedBy}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
      </div>
    </DashboardLayout>
  );
}

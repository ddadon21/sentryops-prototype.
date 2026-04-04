import React, { useState, useEffect } from 'react';
import { LayoutDashboard, FolderOpen, FileText, Clock, UserCheck, Calendar, FileCheck, CheckCircle, CheckCircle2, TrendingUp, AlertTriangle, DollarSign, Eye, Activity, XCircle, Settings, Bell, Search, ChevronRight, Shield, X, Menu, ChevronLeft, LogOut, Plus, Download, Upload, Lock, Archive, Tag, Users, ChevronDown, User, Paperclip, AlertCircle, Filter, RefreshCw, Printer, ExternalLink, BookOpen, HelpCircle, Phone, Mail, MapPin, Circle, Hash, ShieldCheck, Key, Mic, CreditCard, FileWarning } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import DashboardLayout from '../layouts/DashboardLayout';
import { biNavigation, biProfile, biNotifications } from '../config/biConfig';

// Helper: Status badge
const getStatusBadge = (status) => {
  switch (status) {
    case 'Verified':
      return <span className="px-2.5 py-1 bg-green-500/10 text-green-400 rounded-lg text-xs font-medium flex items-center gap-1.5"><CheckCircle2 className="w-3 h-3" />Verified</span>;
    case 'Pending Review':
      return <span className="px-2.5 py-1 bg-amber-500/10 text-amber-700 rounded-lg text-xs font-medium flex items-center gap-1.5"><Clock className="w-3 h-3" />Pending Review</span>;
    case 'Under Review':
      return <span className="px-2.5 py-1 bg-blue-500/10 text-blue-400 rounded-lg text-xs font-medium flex items-center gap-1.5"><Eye className="w-3 h-3" />Under Review</span>;
    case 'Archived':
      return <span className="px-2.5 py-1 bg-slate-500/10 text-secondary rounded-lg text-xs font-medium flex items-center gap-1.5"><Archive className="w-3 h-3" />Archived</span>;
    default:
      return <span className="px-2.5 py-1 bg-slate-500/10 text-secondary rounded-lg text-xs font-medium">{status}</span>;
  }
};

// Helper: Access level badge
const getAccessBadge = (level, legalBasis) => {
  switch (level) {
    case 'Confidential':
      return (
        <span className="px-2.5 py-1 bg-red-500/10 text-red-400 rounded-lg text-xs font-medium flex items-center gap-1.5">
          <Lock className="w-3 h-3" />Confidential
          {legalBasis && <span className="text-red-500/70">({legalBasis})</span>}
        </span>
      );
    case 'Restricted':
      return (
        <span className="px-2.5 py-1 bg-amber-500/10 text-amber-700 rounded-lg text-xs font-medium flex items-center gap-1.5">
          <Key className="w-3 h-3" />Restricted (BI Unit Only)
        </span>
      );
    case 'Standard':
      return (
        <span className="px-2.5 py-1 bg-slate-500/10 text-secondary rounded-lg text-xs font-medium flex items-center gap-1.5">
          <ShieldCheck className="w-3 h-3" />Standard (BI Unit Access)
        </span>
      );
    default:
      return <span className="px-2.5 py-1 bg-slate-500/10 text-secondary rounded-lg text-xs font-medium flex items-center gap-1.5"><Lock className="w-3 h-3" />{level}</span>;
  }
};

// Helper: Evidence type icon
const getEvidenceTypeIcon = (category) => {
  switch (category) {
    case 'Documentation': return <FileText className="w-6 h-6 text-amber-700" />;
    case 'Background Check': return <ShieldCheck className="w-6 h-6 text-blue-400" />;
    case 'References': return <Users className="w-6 h-6 text-green-400" />;
    case 'Employment': return <UserCheck className="w-6 h-6 text-cyan-400" />;
    case 'Interview': return <Mic className="w-6 h-6 text-purple-400" />;
    case 'Financial': return <CreditCard className="w-6 h-6 text-orange-400" />;
    default: return <Paperclip className="w-6 h-6 text-secondary" />;
  }
};

export default function EvidenceTracking() {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState('evidence-tracking');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [logoutConfirmOpen, setLogoutConfirmOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [expandedEvidence, setExpandedEvidence] = useState(null);
  const [activeTab, setActiveTab] = useState('all');

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

  const currentDateTime = {
    date: 'Monday, January 26, 2026',
    time: '9:14 PM EST',
  };

  const investigatorInfo = {
    name: 'Agent Brooks',
    badge: 'BI-107',
    activeCases: 8,
  };

  const navigation = [
    { id: 'bi-dashboard', label: 'BI Dashboard', icon: LayoutDashboard, page: 'BackgroundsDashboard' },
    { id: 'active-cases', label: 'Active Cases', icon: FolderOpen, page: 'ActiveCases' },
    { id: 'case-management', label: 'Case Management', icon: FileText, page: 'CaseManagement' },
    { id: 'investigation-timeline', label: 'Investigation Timeline', icon: Clock, page: 'InvestigationTimeline' },
    { id: 'subject-records', label: 'Subject Records', icon: UserCheck, page: 'SubjectRecords' },
    { id: 'interview-scheduling', label: 'Interview Scheduling', icon: Calendar, page: 'InterviewScheduling' },
    { id: 'evidence-tracking', label: 'Evidence Tracking', icon: FileCheck },
    { id: 'reference-checks', label: 'Reference Checks', icon: CheckCircle, page: 'ReferenceChecks' },
    { id: 'employment-verification', label: 'Employment Verification', icon: TrendingUp, page: 'EmploymentVerification' },
    { id: 'criminal-history', label: 'Criminal History Review', icon: AlertTriangle, page: 'CriminalHistoryReview' },
    { id: 'financial-background', label: 'Financial Background', icon: DollarSign, page: 'FinancialBackground' },
    { id: 'social-media', label: 'Social Media Analysis', icon: Eye, page: 'SocialMediaAnalysis' },
    { id: 'bi-reports', label: 'BI Reports', icon: Activity, page: 'BIReports' },
    { id: 'case-closure', label: 'Case Closure', icon: XCircle, page: 'CaseClosure' }
  ];

  const evidenceItems = [
    {
      id: 'EVD-2024-001',
      name: 'Application Package',
      category: 'Documentation',
      caseId: 'BI-2024-145',
      subject: 'Robert Anthony Martinez',
      description: 'Complete background application packet with signed releases, personal history statement, photo ID, reference contact information',
      fileName: 'Martinez_Application_Package.pdf',
      fileType: 'PDF',
      fileSize: '2.4 MB',
      pageCount: '18 pages',
      status: 'Verified',
      accessLevel: 'Standard',
      legalBasis: null,
      accessibleBy: 'Background investigators, BI Supervisor',
      accessNote: 'No sensitive information (public records)',
      uploadInfo: {
        uploadedBy: 'Agent Brooks (Badge #BI-107)',
        uploadDate: 'Oct 15, 2024 at 9:30 AM EST',
        uploadSource: 'Direct upload (investigator received from HR)',
        uploadMethod: 'Manual file upload via web interface'
      },
      verification: {
        verified: true,
        verifiedDate: 'Oct 15, 2024 at 9:35 AM',
        verifiedBy: 'Agent Brooks (Badge #BI-107)',
        verificationNote: 'Document complete, all pages present',
        checksumStatus: 'SHA-256 verified',
        chainOfCustody: 'Complete (no gaps in access log)'
      },
      contents: [
        'Background application form (completed, signed)',
        'Background investigation release forms (signed)',
        'Personal history statement (10-year history)',
        'Photo identification (GA Driver\'s License copy)',
        'Reference contact information (5 references)',
        'Resume and certifications'
      ],
      chainOfCustody: [
        { date: 'Jan 25, 2026 09:15 AM', who: 'Agent Brooks', action: 'viewed', reason: 'case review' },
        { date: 'Jan 23, 2026 02:30 PM', who: 'Agent Brooks', action: 'viewed', reason: 'interview prep' },
        { date: 'Nov 5, 2024 10:00 AM', who: 'Agent Brooks', action: 'viewed', reason: 'initial review' },
        { date: 'Oct 15, 2024 09:35 AM', who: 'Agent Brooks', action: 'verified', reason: 'upload verification' },
        { date: 'Oct 15, 2024 09:30 AM', who: 'Agent Brooks', action: 'uploaded', reason: 'initial upload' }
      ],
      totalAccessEntries: 18,
      retention: {
        period: '7 years from case closure (POST requirement)',
        currentStatus: 'Active (case open)',
        scheduledDestruction: 'N/A (case not closed)'
      }
    },
    {
      id: 'EVD-2024-002',
      name: 'Criminal History Report',
      category: 'Background Check',
      caseId: 'BI-2024-145',
      subject: 'Robert Anthony Martinez',
      description: 'Official criminal background check - GCIC and FBI National Crime Information Center results. NO CRIMINAL RECORDS FOUND (CLEAR)',
      fileName: 'Martinez_GCIC_FBI_Criminal_History.pdf',
      fileType: 'PDF (digitally signed by GCIC/FBI)',
      fileSize: '856 KB',
      pageCount: '6 pages',
      status: 'Verified',
      accessLevel: 'Confidential',
      legalBasis: 'CJIS Restricted',
      accessibleBy: 'CJIS-authorized investigators only',
      accessNote: 'Federal law (28 CFR Part 20) — all access logged and auditable',
      complianceNotice: 'This document contains Criminal Justice Information System (CJIS) data and is subject to federal regulations (28 CFR 20). Unauthorized access, dissemination, or use is prohibited and subject to criminal penalties.',
      uploadInfo: {
        uploadedBy: 'System (Automated - GCIC/FBI interface)',
        uploadDate: 'Oct 18, 2024 at 10:30 AM EST',
        uploadSource: 'Automated receipt from GCIC/FBI database',
        reviewedBy: 'Agent Brooks (Oct 18, 2024 at 10:35 AM)'
      },
      verification: {
        verified: true,
        verifiedDate: 'Oct 18, 2024 at 10:35 AM',
        verifiedBy: 'Agent Brooks (Badge #BI-107)',
        verificationNote: 'Results clear, no criminal history found',
        checksumStatus: 'SHA-256 verified',
        chainOfCustody: 'Complete'
      },
      contents: [
        'GCIC (Georgia Crime Information Center): Submitted Oct 15, 2024 — Results received Oct 17, 2024 (2-day turnaround) — Result: CLEAR',
        'FBI (National Crime Information Center): Submitted Oct 15, 2024 — Results received Oct 18, 2024 (3-day turnaround) — Result: CLEAR',
        'Traffic history: 1 speeding citation (2022, paid/closed)'
      ],
      investigatorAssessment: [
        'No POST-disqualifying criminal history identified',
        'Applicant meets criminal history standards',
        'Traffic citation disclosed by applicant (matches records)'
      ],
      chainOfCustody: [
        { date: 'Jan 25, 2026 09:20 AM', who: 'Agent Brooks', action: 'viewed', reason: 'case review' },
        { date: 'Nov 7, 2024 10:30 AM', who: 'Agent Brooks', action: 'viewed', reason: 'timeline log' },
        { date: 'Oct 18, 2024 10:35 AM', who: 'Agent Brooks', action: 'verified', reason: 'reviewed results' },
        { date: 'Oct 18, 2024 10:30 AM', who: 'System', action: 'uploaded', reason: 'auto-received from GCIC/FBI' }
      ],
      totalAccessEntries: 8,
      retention: {
        period: '7 years from case closure (POST + CJIS)',
        destructionMethod: 'Secure destruction (shred/wipe)',
        currentStatus: 'Active (case open)'
      }
    },
    {
      id: 'EVD-2024-003',
      name: 'Reference Letters',
      category: 'References',
      caseId: 'BI-2024-145',
      subject: 'Robert Anthony Martinez',
      description: '3 professional reference letters received from former employers and supervisors',
      fileName: 'Martinez_Reference_Letters.pdf',
      fileType: 'PDF (scanned reference letters)',
      fileSize: '1.2 MB',
      pageCount: '5 pages',
      status: 'Pending Review',
      accessLevel: 'Restricted',
      legalBasis: null,
      accessibleBy: 'Background investigators, BI Supervisor',
      accessNote: 'Contains personal opinions and assessments — not disclosed to applicant (confidential references)',
      uploadInfo: {
        uploadedBy: 'Investigator Davis (Badge #BI-109)',
        uploadDate: 'Nov 4, 2024 at 3:00 PM EST',
        uploadSource: 'Mailed reference letters (scanned)',
        originalDocuments: 'Filed in case folder (physical storage)'
      },
      verification: {
        verified: false,
        verifiedDate: null,
        verifiedBy: null,
        verificationNote: 'Awaiting supervisor review for completeness',
        checksumStatus: 'SHA-256 verified',
        chainOfCustody: 'Upload documented, pending review'
      },
      pendingAction: {
        assignedTo: 'BI Supervisor',
        action: 'Supervisor must verify and mark complete',
        requirements: [
          'All 3 reference letters present (complete)',
          'Letters are from references provided by applicant',
          'Letters contain sufficient detail (not generic)',
          'Letters address employment, character, suitability'
        ]
      },
      contents: [
        'Reference Letter #1: John Smith (Former Supervisor, 2020) — ABC Retail Store — Direct supervisor (2 years)',
        'Reference Letter #2: Maria Garcia (College Professor) — Georgia State University — Criminal Justice professor',
        'Reference Letter #3: David Johnson (Current Supervisor) — Metro Atlanta Police Department — Current patrol sergeant'
      ],
      chainOfCustody: [
        { date: 'Jan 25, 2026 09:25 AM', who: 'Agent Brooks', action: 'viewed', reason: 'case review' },
        { date: 'Nov 4, 2024 03:05 PM', who: 'Investigator Davis', action: 'verified upload', reason: 'upload confirmation' },
        { date: 'Nov 4, 2024 03:00 PM', who: 'Investigator Davis', action: 'uploaded', reason: 'initial upload' }
      ],
      totalAccessEntries: 5,
      retention: {
        period: '7 years from case closure',
        currentStatus: 'Active (case open)',
        physicalOriginals: 'Filed in case folder'
      }
    },
    {
      id: 'EVD-2024-004',
      name: 'Employment Verification',
      category: 'Employment',
      caseId: 'BI-2024-145',
      subject: 'Robert Anthony Martinez',
      description: 'Metro PD employment confirmation letter — official HR verification',
      fileName: 'Martinez_Metro_PD_Employment_Verification.pdf',
      fileType: 'PDF (official HR letter)',
      fileSize: '524 KB',
      pageCount: '2 pages',
      status: 'Verified',
      accessLevel: 'Restricted',
      legalBasis: null,
      accessibleBy: 'Background investigators, BI Supervisor',
      accessNote: 'Contains employment details, salary information',
      uploadInfo: {
        uploadedBy: 'System (Automated - email attachment)',
        uploadDate: 'Nov 6, 2024 at 2:00 PM EST',
        uploadSource: 'Email from Metro PD HR Department',
        reviewedBy: 'Agent Brooks (Nov 6, 2024 at 2:05 PM)'
      },
      verification: {
        verified: true,
        verifiedDate: 'Nov 6, 2024 at 2:05 PM',
        verifiedBy: 'Agent Brooks (Badge #BI-107)',
        verificationNote: 'Employment confirmed, dates match',
        checksumStatus: 'SHA-256 verified',
        chainOfCustody: 'Complete'
      },
      verificationContents: [
        'Employer: Metro Atlanta Police Department',
        'Position: Patrol Officer',
        'Employment dates: January 2018 — Present (currently employed)',
        'Salary: $68,000/year (verified)',
        'Eligible for rehire: Yes',
        'Disciplinary history: None on file per HR'
      ],
      chainOfCustody: [
        { date: 'Jan 25, 2026 09:30 AM', who: 'Agent Brooks', action: 'viewed', reason: 'case review' },
        { date: 'Nov 6, 2024 02:05 PM', who: 'Agent Brooks', action: 'verified', reason: 'reviewed results' },
        { date: 'Nov 6, 2024 02:00 PM', who: 'System', action: 'uploaded', reason: 'auto-received via email' }
      ],
      totalAccessEntries: 4,
      retention: {
        period: '7 years from case closure',
        currentStatus: 'Active (case open)'
      }
    },
    {
      id: 'EVD-2024-005',
      name: 'Interview Recording',
      category: 'Interview',
      caseId: 'BI-2024-145',
      subject: 'Robert Anthony Martinez',
      description: 'Initial subject interview — 60 minutes audio recording with transcript',
      fileName: 'Martinez_Subject_Interview_Nov5_2024.mp4',
      fileType: 'MP4 (audio only, no video)',
      fileSize: '245 MB',
      duration: '60 minutes',
      quality: 'High quality (192 kbps stereo)',
      status: 'Archived',
      accessLevel: 'Confidential',
      legalBasis: 'Work Product',
      accessibleBy: 'BI Supervisor only (without approval)',
      accessNote: 'Contains investigator observations, impressions — not disclosed to applicant (work product). Investigator access requires supervisor authorization.',
      uploadInfo: {
        uploadedBy: 'Agent Brooks (Badge #BI-107)',
        uploadDate: 'Nov 5, 2024 at 3:00 PM EST',
        uploadSource: 'Digital recorder (Olympus WS-853)',
        originalFile: 'Backed up to secure archive'
      },
      recordingDetails: {
        interviewDate: 'Nov 5, 2024',
        interviewTime: '2:00 PM — 3:00 PM EST',
        location: 'Background Investigations Office, Room 201',
        interviewer: 'Agent Brooks (Badge #BI-107)',
        interviewee: 'Robert Martinez (Applicant)',
        duration: '60 minutes'
      },
      verification: {
        verified: true,
        verifiedDate: 'Nov 5, 2024 at 3:05 PM',
        verifiedBy: 'Agent Brooks (Badge #BI-107)',
        verificationNote: 'Interview completed, notes transcribed',
        checksumStatus: 'SHA-256 verified',
        chainOfCustody: 'Complete'
      },
      transcript: {
        available: true,
        pageCount: '12 pages (complete)',
        transcribedBy: 'Agent Brooks (manual transcription)',
        transcriptFile: 'Martinez_Interview_Transcript_Nov5.pdf'
      },
      topicsCovered: [
        'Employment history (last 10 years)',
        'Criminal history disclosure',
        'Financial responsibility',
        'Reference contacts (5 references provided)',
        'Background investigation process explained'
      ],
      chainOfCustody: [
        { date: 'Nov 5, 2024 03:05 PM', who: 'Agent Brooks', action: 'archived', reason: 'interview completed, notes transcribed' },
        { date: 'Nov 5, 2024 03:00 PM', who: 'Agent Brooks', action: 'uploaded', reason: 'initial upload from recorder' }
      ],
      totalAccessEntries: 2,
      retention: {
        period: '7 years from case closure',
        currentStatus: 'Archived',
        secureStorage: 'Encrypted archive'
      }
    },
    {
      id: 'EVD-2024-006',
      name: 'Financial Report',
      category: 'Financial',
      caseId: 'BI-2024-145',
      subject: 'Robert Anthony Martinez',
      description: 'Credit report and financial background analysis — Equifax authorized pull',
      fileName: 'Martinez_Credit_Report_Financial_Analysis.pdf',
      fileType: 'PDF (credit report + investigator analysis)',
      fileSize: '1.8 MB',
      pageCount: '8 pages',
      status: 'Under Review',
      accessLevel: 'Confidential',
      legalBasis: 'FCRA Protected',
      accessibleBy: 'Assigned investigator, BI Supervisor only',
      accessNote: 'Contains credit score, financial details — Protected by Fair Credit Reporting Act (FCRA)',
      complianceNotice: 'This report contains consumer credit information protected under the Fair Credit Reporting Act (FCRA). Use is limited to employment screening purposes only. Unauthorized disclosure or use may result in civil and criminal penalties.',
      uploadInfo: {
        uploadedBy: 'System (Automated - credit bureau API)',
        uploadDate: 'Nov 1, 2024 at 9:00 AM EST',
        uploadSource: 'Equifax credit report (authorized pull)',
        analysisBy: 'Agent Brooks (Nov 1, 2024 at 10:00 AM)'
      },
      verification: {
        verified: false,
        verifiedDate: null,
        verifiedBy: null,
        verificationNote: 'Investigator analysis completed — awaiting supervisor review of findings',
        checksumStatus: 'SHA-256 verified',
        chainOfCustody: 'Upload and analysis documented'
      },
      pendingAction: {
        assignedTo: 'BI Supervisor',
        action: 'Supervisor must review financial analysis and confirm findings meet agency financial responsibility standards'
      },
      reportContents: [
        'Credit report: Equifax (authorized applicant consent)',
        'Credit score: 720 (Good — meets 650 minimum threshold)',
        'Accounts: 8 accounts (all current, no delinquencies)',
        'Collections: None',
        'Bankruptcies: None',
        'Judgments/Liens: None',
        'Overall assessment: Financially responsible'
      ],
      investigatorAnalysis: [
        'Financial responsibility: Meets agency standards',
        'Credit score: Above 650 threshold (agency policy)',
        'Payment history: Excellent (no late payments)',
        'Debt-to-income: Reasonable (manageable debt load)',
        'No concerns identified: Recommend approval'
      ],
      chainOfCustody: [
        { date: 'Jan 25, 2026 09:35 AM', who: 'Agent Brooks', action: 'viewed', reason: 'case review' },
        { date: 'Nov 1, 2024 10:00 AM', who: 'Agent Brooks', action: 'analysis completed', reason: 'financial review' },
        { date: 'Nov 1, 2024 09:05 AM', who: 'Agent Brooks', action: 'verified upload', reason: 'reviewed receipt' },
        { date: 'Nov 1, 2024 09:00 AM', who: 'System', action: 'uploaded', reason: 'auto-received from Equifax' }
      ],
      totalAccessEntries: 6,
      retention: {
        period: '7 years from case closure (FCRA + POST)',
        destructionMethod: 'Secure destruction (shred/wipe)',
        currentStatus: 'Active (case open)'
      }
    }
  ];

  const notifications = [
    { id: 1, title: 'New Evidence Uploaded', message: 'Financial Report added to BI-2024-145', time: '30 min ago', urgent: false },
    { id: 2, title: 'Review Required', message: 'Reference Letters pending supervisor review', time: '2 hours ago', urgent: true },
    { id: 3, title: 'Integrity Check Complete', message: 'All 6 files verified — no tampering detected', time: '6 hours ago', urgent: false }
  ];

  const categories = ['all', 'Documentation', 'Background Check', 'References', 'Employment', 'Interview', 'Financial'];
  const statuses = ['all', 'Verified', 'Pending Review', 'Under Review', 'Archived'];

  const getCategoryCount = (cat) => {
    if (cat === 'all') return evidenceItems.length;
    return evidenceItems.filter(item => item.category === cat).length;
  };

  const getStatusCount = (status) => {
    if (status === 'all') return evidenceItems.length;
    return evidenceItems.filter(item => item.status === status).length;
  };

  const filteredEvidence = evidenceItems.filter(item => {
    const catMatch = filterCategory === 'all' || item.category === filterCategory;
    const statusMatch = filterStatus === 'all' || item.status === filterStatus;
    const tabMatch = activeTab === 'all' ||
      (activeTab === 'pending' && (item.status === 'Pending Review' || item.status === 'Under Review')) ||
      (activeTab === 'verified' && item.status === 'Verified') ||
      (activeTab === 'restricted' && (item.accessLevel === 'Confidential' || item.accessLevel === 'Restricted'));
    return catMatch && statusMatch && tabMatch;
  });

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

            {/* Page Header */}
            <div className="mb-6">
              <h2 className="text-2xl lg:text-3xl font-bold text-primary mb-2">Evidence Tracking</h2>
              <p className="text-secondary mb-3">Secure document repository and chain of custody management for background investigations</p>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-500">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-secondary" />
                  {currentDateTime.date} at {currentDateTime.time}
                </span>
                <span className="flex items-center gap-1.5">
                  <Shield className="w-4 h-4 text-amber-700" />
                  Active investigator: {investigatorInfo.name} (Badge #{investigatorInfo.badge})
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-500 mt-1">
                <span className="flex items-center gap-1.5">
                  <FileCheck className="w-4 h-4 text-secondary" />
                  Total evidence items: {evidenceItems.length} items across all active cases
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-secondary" />
                  Storage: Background Investigations Evidence Locker (Room 105)
                </span>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <button className="flex items-center gap-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-medium transition-colors text-sm">
                <Upload className="w-4 h-4" />
                Upload Evidence
              </button>
              <button className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-800/60 border border-slate-700/50 text-secondary rounded-xl font-medium transition-colors text-sm">
                <Search className="w-4 h-4" />
                Search Evidence
              </button>
              <button className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-800/60 border border-slate-700/50 text-secondary rounded-xl font-medium transition-colors text-sm">
                <Download className="w-4 h-4" />
                Export Chain of Custody
              </button>
              <button className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-800/60 border border-slate-700/50 text-secondary rounded-xl font-medium transition-colors text-sm">
                <Printer className="w-4 h-4" />
                Print Evidence Log
              </button>
              <button className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-800/60 border border-slate-700/50 text-secondary rounded-xl font-medium transition-colors text-sm">
                <Eye className="w-4 h-4" />
                Audit Trail
              </button>
              <button className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-800/60 border border-slate-700/50 text-secondary rounded-xl font-medium transition-colors text-sm">
                <Archive className="w-4 h-4" />
                Storage Management
              </button>
            </div>

            {/* Evidence Management Summary */}
            <div className="mb-6 bg-gradient-to-br from-amber-500/10 to-amber-600/5 border border-amber-500/20 rounded-xl p-5">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 bg-amber-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <FileCheck className="w-6 h-6 text-amber-700" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h4 className="text-base font-semibold text-primary">Evidence Management Summary</h4>
                    <span className="text-xs text-slate-500">As of {currentDateTime.date} at {currentDateTime.time}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-4">
                {/* By Status */}
                <div className="bg-white dark:bg-slate-900/40 rounded-lg p-4">
                  <h5 className="text-sm font-semibold text-secondary mb-3 flex items-center gap-2">
                    <Circle className="w-3 h-3 text-amber-700" />By Status
                  </h5>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-green-400 flex items-center gap-1.5"><CheckCircle2 className="w-3 h-3" />Verified (chain complete)</span>
                      <span className="text-primary font-medium">3 items</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-amber-700 flex items-center gap-1.5"><Clock className="w-3 h-3" />Pending Review</span>
                      <span className="text-primary font-medium">2 items</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-secondary flex items-center gap-1.5"><Archive className="w-3 h-3" />Archived</span>
                      <span className="text-primary font-medium">1 item</span>
                    </div>
                  </div>
                </div>

                {/* By Type */}
                <div className="bg-white dark:bg-slate-900/40 rounded-lg p-4">
                  <h5 className="text-sm font-semibold text-secondary mb-3 flex items-center gap-2">
                    <Tag className="w-3 h-3 text-amber-700" />By Type
                  </h5>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-secondary">Documentation</span>
                      <span className="text-primary font-medium">3 items</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-secondary">Background Check Results</span>
                      <span className="text-primary font-medium">2 items</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-secondary">Interview Recordings</span>
                      <span className="text-primary font-medium">1 item</span>
                    </div>
                  </div>
                </div>

                {/* By Case */}
                <div className="bg-white dark:bg-slate-900/40 rounded-lg p-4">
                  <h5 className="text-sm font-semibold text-secondary mb-3 flex items-center gap-2">
                    <FolderOpen className="w-3 h-3 text-amber-700" />By Case
                  </h5>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-secondary">BI-2024-145 (Martinez)</span>
                      <span className="text-primary font-medium">6 items</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Other cases</span>
                      <span className="text-slate-500">0 shown (filtered)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Chain of Custody Status */}
              <div className="bg-white dark:bg-slate-900/40 rounded-lg p-4 mb-4">
                <h5 className="text-sm font-semibold text-secondary mb-3 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-green-400" />Chain of Custody Status
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center gap-2 text-green-400">
                    <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>All evidence items have complete chain of custody</span>
                  </div>
                  <div className="flex items-center gap-2 text-green-400">
                    <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>All digital files have integrity verification (SHA-256)</span>
                  </div>
                  <div className="flex items-center gap-2 text-green-400">
                    <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>All uploads logged with timestamp, uploader, and source</span>
                  </div>
                  <div className="flex items-center gap-2 text-green-400">
                    <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>No missing evidence items (inventory complete)</span>
                  </div>
                </div>
              </div>

              {/* Requiring Action */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-amber-500/5 border border-amber-500/20 rounded-lg p-4">
                  <h5 className="text-sm font-semibold text-amber-700 mb-3 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />Pending Supervisor Review: 2 items
                  </h5>
                  <div className="space-y-2 text-sm">
                    <div className="text-secondary">
                      <span className="text-primary font-medium">Reference Letters</span> (EVD-2024-003) — Uploaded Nov 4, awaiting review
                    </div>
                    <div className="text-secondary">
                      <span className="text-primary font-medium">Financial Report</span> (EVD-2024-006) — Uploaded Nov 1, awaiting review
                    </div>
                  </div>
                </div>

                <div className="bg-red-500/5 border border-red-500/20 rounded-lg p-4">
                  <h5 className="text-sm font-semibold text-red-400 mb-3 flex items-center gap-2">
                    <Lock className="w-4 h-4" />Restricted Access Items: 3 items
                  </h5>
                  <div className="space-y-2 text-sm text-secondary">
                    <div>Criminal History Report <span className="text-red-400/70">(CJIS restricted)</span></div>
                    <div>Financial Report <span className="text-red-400/70">(FCRA — credit information)</span></div>
                    <div>Interview Recording <span className="text-red-400/70">(Confidential — work product)</span></div>
                  </div>
                </div>
              </div>

              {/* Storage Information */}
              <div className="bg-white dark:bg-slate-900/40 rounded-lg p-4 mt-4">
                <h5 className="text-sm font-semibold text-secondary mb-3 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-secondary" />Storage Information
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-secondary">
                  <div><span className="text-slate-500">Physical Location:</span> <span className="text-secondary">BI Evidence Locker, Room 105, 2nd Floor</span></div>
                  <div><span className="text-slate-500">Digital Storage:</span> <span className="text-secondary">Secure server (encrypted, access logged)</span></div>
                  <div><span className="text-slate-500">Retention Policy:</span> <span className="text-secondary">7 years from case closure (per POST requirements)</span></div>
                  <div><span className="text-slate-500">Last Inventory Audit:</span> <span className="text-secondary">January 15, 2026 (all items accounted for)</span></div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 mt-4">
                <button className="px-3 py-1.5 bg-white dark:bg-slate-800/60 hover:bg-slate-800/80 text-secondary rounded-lg text-xs font-medium transition-colors">View Complete Inventory</button>
                <button className="px-3 py-1.5 bg-white dark:bg-slate-800/60 hover:bg-slate-800/80 text-secondary rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5">
                  <RefreshCw className="w-3 h-3" />Run Integrity Check
                </button>
                <button className="px-3 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 rounded-lg text-xs font-medium transition-colors">Request Supervisor Review</button>
              </div>
            </div>

            {/* Status Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-white dark:bg-slate-800/40 border border-border rounded-xl shadow-sm dark:shadow-none p-5">
                <div className="flex items-center justify-between mb-3">
                  <FileCheck className="w-8 h-8 text-blue-400" />
                  <span className="text-2xl font-bold text-primary">{evidenceItems.length}</span>
                </div>
                <p className="text-sm font-medium text-primary mb-1">Total Items in Evidence</p>
                <p className="text-xs text-slate-500">Case BI-2024-145 (Martinez)</p>
                <div className="mt-3 pt-3 border-t border-border dark:border-slate-700/30 space-y-1">
                  <p className="text-xs text-secondary">Documentation: 3 items</p>
                  <p className="text-xs text-secondary">Reports: 2 items</p>
                  <p className="text-xs text-secondary">Recordings: 1 item</p>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-800/40 border border-border rounded-xl shadow-sm dark:shadow-none p-5">
                <div className="flex items-center justify-between mb-3">
                  <CheckCircle className="w-8 h-8 text-green-400" />
                  <span className="text-2xl font-bold text-primary">{evidenceItems.filter(e => e.status === 'Verified').length}</span>
                </div>
                <p className="text-sm font-medium text-primary mb-1">Verified & Secured</p>
                <p className="text-xs text-slate-500">Complete chain of custody</p>
                <div className="mt-3 pt-3 border-t border-border dark:border-slate-700/30 space-y-1">
                  <p className="text-xs text-green-400/80">Criminal History Report</p>
                  <p className="text-xs text-green-400/80">Employment Verification</p>
                  <p className="text-xs text-green-400/80">Application Package</p>
                  <p className="text-xs text-slate-500 mt-1">All: checksum verified, access logged</p>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-800/40 border border-amber-500/30 rounded-xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <Clock className="w-8 h-8 text-amber-700" />
                  <span className="text-2xl font-bold text-primary">{evidenceItems.filter(e => e.status === 'Pending Review' || e.status === 'Under Review').length}</span>
                </div>
                <p className="text-sm font-medium text-primary mb-1">Pending Review</p>
                <p className="text-xs text-slate-500">Awaiting supervisor review</p>
                <div className="mt-3 pt-3 border-t border-border dark:border-slate-700/30 space-y-1.5">
                  <div>
                    <p className="text-xs text-amber-700/80">Reference Letters (Nov 4, 2024)</p>
                    <p className="text-xs text-slate-500 ml-2">Awaiting: review for completeness</p>
                  </div>
                  <div>
                    <p className="text-xs text-amber-700/80">Financial Report (Nov 1, 2024)</p>
                    <p className="text-xs text-slate-500 ml-2">Awaiting: review of findings</p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-800/40 border border-border rounded-xl shadow-sm dark:shadow-none p-5">
                <div className="flex items-center justify-between mb-3">
                  <Archive className="w-8 h-8 text-secondary" />
                  <span className="text-2xl font-bold text-primary">{evidenceItems.filter(e => e.status === 'Archived').length}</span>
                </div>
                <p className="text-sm font-medium text-primary mb-1">Archived</p>
                <p className="text-xs text-slate-500">Completed/closed cases</p>
                <div className="mt-3 pt-3 border-t border-border dark:border-slate-700/30 space-y-1">
                  <p className="text-xs text-secondary">Interview Recording (Nov 5, 2024)</p>
                  <p className="text-xs text-slate-500 mt-1">Retention: 7 years from case closure</p>
                </div>
              </div>
            </div>

            {/* Evidence Management Actions */}
            <div className="bg-white dark:bg-slate-800/40 border border-border rounded-xl shadow-sm dark:shadow-none p-5 mb-6">
              <h3 className="text-sm font-semibold text-primary mb-4 flex items-center gap-2">
                <Settings className="w-4 h-4 text-amber-700" />
                Evidence Management Actions
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <button className="flex items-start gap-3 p-3 bg-white dark:bg-slate-900/40 hover:bg-slate-900/60 rounded-lg transition-colors text-left">
                  <Upload className="w-5 h-5 text-amber-700 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-primary">Upload Evidence</p>
                    <p className="text-xs text-slate-500 mt-0.5">Upload document, report, or recording</p>
                  </div>
                </button>
                <button className="flex items-start gap-3 p-3 bg-white dark:bg-slate-900/40 hover:bg-slate-900/60 rounded-lg transition-colors text-left">
                  <RefreshCw className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-primary">Verify Integrity</p>
                    <p className="text-xs text-slate-500 mt-0.5">Run checksum verification on all files</p>
                  </div>
                </button>
                <button className="flex items-start gap-3 p-3 bg-white dark:bg-slate-900/40 hover:bg-slate-900/60 rounded-lg transition-colors text-left">
                  <FileText className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-primary">Evidence Inventory Report</p>
                    <p className="text-xs text-slate-500 mt-0.5">Generate complete inventory (all cases)</p>
                  </div>
                </button>
                <button className="flex items-start gap-3 p-3 bg-white dark:bg-slate-900/40 hover:bg-slate-900/60 rounded-lg transition-colors text-left">
                  <Lock className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-primary">Request Restricted Access</p>
                    <p className="text-xs text-slate-500 mt-0.5">CJIS records, confidential reports</p>
                  </div>
                </button>
                <button className="flex items-start gap-3 p-3 bg-white dark:bg-slate-900/40 hover:bg-slate-900/60 rounded-lg transition-colors text-left">
                  <Download className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-primary">Export Chain of Custody</p>
                    <p className="text-xs text-slate-500 mt-0.5">Court-ready report (watermarked PDF)</p>
                  </div>
                </button>
                <button className="flex items-start gap-3 p-3 bg-white dark:bg-slate-900/40 hover:bg-slate-900/60 rounded-lg transition-colors text-left">
                  <Eye className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-primary">Audit Trail</p>
                    <p className="text-xs text-slate-500 mt-0.5">Complete access log (who, what, when)</p>
                  </div>
                </button>
                <button className="flex items-start gap-3 p-3 bg-white dark:bg-slate-900/40 hover:bg-slate-900/60 rounded-lg transition-colors text-left">
                  <Archive className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-primary">Archive Evidence</p>
                    <p className="text-xs text-slate-500 mt-0.5">Move to archive (closed cases)</p>
                  </div>
                </button>
                <button className="flex items-start gap-3 p-3 bg-white dark:bg-slate-900/40 hover:bg-slate-900/60 rounded-lg transition-colors text-left">
                  <Printer className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-primary">Print Evidence Log</p>
                    <p className="text-xs text-slate-500 mt-0.5">Print complete evidence log</p>
                  </div>
                </button>
              </div>
            </div>

            {/* Integrity Verification Status */}
            <div className="bg-white dark:bg-slate-800/40 border border-border rounded-xl shadow-sm dark:shadow-none p-5 mb-6">
              <h3 className="text-sm font-semibold text-primary mb-4 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-green-400" />
                File Integrity Verification
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 text-sm">
                <div>
                  <p className="text-slate-500 text-xs mb-1">Automatic Verification</p>
                  <p className="text-secondary">Daily (all files)</p>
                </div>
                <div>
                  <p className="text-slate-500 text-xs mb-1">Manual Verification</p>
                  <p className="text-secondary">On-demand (single/batch)</p>
                </div>
                <div>
                  <p className="text-slate-500 text-xs mb-1">Last Verification</p>
                  <p className="text-secondary">Jan 25, 2026 at 2:00 AM</p>
                </div>
                <div>
                  <p className="text-slate-500 text-xs mb-1">Results</p>
                  <p className="text-green-400 flex items-center gap-1"><CheckCircle2 className="w-3 h-3" />All 6 files verified</p>
                </div>
                <div>
                  <p className="text-slate-500 text-xs mb-1">Alerts</p>
                  <p className="text-secondary">Email if check fails</p>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-1 mb-4 bg-slate-100/80 dark:bg-slate-800/30 rounded-xl p-1 overflow-x-auto">
              {[
                { id: 'all', label: 'All Evidence', count: evidenceItems.length },
                { id: 'pending', label: 'Pending Review', count: evidenceItems.filter(e => e.status === 'Pending Review' || e.status === 'Under Review').length },
                { id: 'verified', label: 'Verified', count: evidenceItems.filter(e => e.status === 'Verified').length },
                { id: 'restricted', label: 'Restricted Access', count: evidenceItems.filter(e => e.accessLevel === 'Confidential' || e.accessLevel === 'Restricted').length }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-amber-500 text-white shadow-lg'
                      : 'text-secondary hover:text-primary hover:bg-slate-100 dark:hover:bg-slate-800/50'
                  }`}
                >
                  {tab.label}
                  <span className={`px-1.5 py-0.5 rounded text-xs ${
                    activeTab === tab.id ? 'bg-white/20 text-primary' : 'bg-white dark:bg-slate-700/50 text-slate-500'
                  }`}>{tab.count}</span>
                </button>
              ))}
            </div>

            {/* Filter & Search */}
            <div className="bg-white dark:bg-slate-800/40 border border-border rounded-xl shadow-sm dark:shadow-none p-4 mb-6">
              <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                <div className="flex items-center gap-2 flex-wrap flex-1">
                  <Tag className="w-4 h-4 text-secondary" />
                  <span className="text-sm font-medium text-primary">Category:</span>
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setFilterCategory(cat)}
                      className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                        filterCategory === cat
                          ? 'bg-amber-500 text-white'
                          : 'bg-white dark:bg-slate-700/50 text-secondary hover:bg-slate-700'
                      }`}
                    >
                      {cat === 'all' ? `All (${getCategoryCount('all')})` : `${cat} (${getCategoryCount(cat)})`}
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <Filter className="w-4 h-4 text-secondary" />
                  <span className="text-sm font-medium text-primary">Status:</span>
                  {statuses.map(status => (
                    <button
                      key={status}
                      onClick={() => setFilterStatus(status)}
                      className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                        filterStatus === status
                          ? 'bg-amber-500 text-white'
                          : 'bg-white dark:bg-slate-700/50 text-secondary hover:bg-slate-700'
                      }`}
                    >
                      {status === 'all' ? `All (${getStatusCount('all')})` : `${status} (${getStatusCount(status)})`}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-border dark:border-slate-700/30">
                <p className="text-sm text-slate-500">Showing {filteredEvidence.length} items (filtered by case BI-2024-145)</p>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span>Sort by:</span>
                  <button className="px-2 py-1 bg-white dark:bg-slate-700/50 rounded text-secondary hover:bg-slate-700">Upload Date</button>
                  <button className="px-2 py-1 bg-slate-100 dark:bg-slate-700/30 rounded text-slate-500 hover:bg-slate-700">Type</button>
                  <button className="px-2 py-1 bg-slate-100 dark:bg-slate-700/30 rounded text-slate-500 hover:bg-slate-700">Size</button>
                </div>
              </div>
            </div>

            {/* Evidence Items */}
            <div className="space-y-6">
              {filteredEvidence.map((item) => {
                const isExpanded = expandedEvidence === item.id;
                return (
                  <div key={item.id} className="bg-white dark:bg-slate-800/40 border border-border rounded-xl overflow-hidden hover:border-amber-500/30 transition-all">
                    {/* Evidence Card Header */}
                    <div className="p-5">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-start gap-4 flex-1">
                          <div className="w-12 h-12 bg-gradient-to-br from-amber-500/20 to-amber-600/10 rounded-xl flex items-center justify-center flex-shrink-0">
                            {getEvidenceTypeIcon(item.category)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-semibold text-primary mb-1">{item.name}</h3>
                            <p className="text-sm text-amber-700 mb-2">
                              Evidence ID: {item.id} | Case ID: {item.caseId}
                            </p>
                            <p className="text-sm text-slate-500 mb-1">Subject: <span className="text-secondary">{item.subject}</span></p>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          {getStatusBadge(item.status)}
                          {getAccessBadge(item.accessLevel, item.legalBasis)}
                        </div>
                      </div>

                      {/* Document Type & Description */}
                      <div className="mb-4">
                        <p className="text-sm text-slate-500 mb-1">Document Type: <span className="text-secondary">{item.category}</span></p>
                        <p className="text-sm text-secondary">{item.description}</p>
                      </div>

                      {/* File Information */}
                      <div className="bg-white dark:bg-slate-900/40 rounded-lg p-3 mb-4">
                        <h4 className="text-xs font-semibold text-secondary mb-2 uppercase tracking-wider">File Information</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-sm">
                          <div className="text-slate-500">File: <span className="text-secondary font-mono text-xs">{item.fileName}</span></div>
                          <div className="text-slate-500">Size: <span className="text-secondary">{item.fileSize} {item.pageCount ? `(${item.pageCount})` : ''}{item.duration ? ` (${item.duration})` : ''}</span></div>
                          <div className="text-slate-500">Format: <span className="text-secondary">{item.fileType}</span></div>
                          <div className="text-slate-500">Integrity: <span className="text-green-400 flex items-center gap-1 inline-flex">{item.verification.checksumStatus} <CheckCircle2 className="w-3 h-3" /></span></div>
                        </div>
                      </div>

                      {/* Upload Information */}
                      <div className="bg-white dark:bg-slate-900/40 rounded-lg p-3 mb-4">
                        <h4 className="text-xs font-semibold text-secondary mb-2 uppercase tracking-wider">Upload Information</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                          <div className="text-slate-500">Uploaded by: <span className="text-secondary">{item.uploadInfo.uploadedBy}</span></div>
                          <div className="text-slate-500">Upload date: <span className="text-secondary">{item.uploadInfo.uploadDate}</span></div>
                          <div className="text-slate-500">Source: <span className="text-secondary">{item.uploadInfo.uploadSource}</span></div>
                          {item.uploadInfo.reviewedBy && (
                            <div className="text-slate-500">Reviewed by: <span className="text-secondary">{item.uploadInfo.reviewedBy}</span></div>
                          )}
                          {item.uploadInfo.uploadMethod && (
                            <div className="text-slate-500">Method: <span className="text-secondary">{item.uploadInfo.uploadMethod}</span></div>
                          )}
                          {item.uploadInfo.originalDocuments && (
                            <div className="text-slate-500">Originals: <span className="text-secondary">{item.uploadInfo.originalDocuments}</span></div>
                          )}
                        </div>
                      </div>

                      {/* Status & Verification */}
                      <div className="bg-white dark:bg-slate-900/40 rounded-lg p-3 mb-4">
                        <h4 className="text-xs font-semibold text-secondary mb-2 uppercase tracking-wider">
                          {item.verification.verified ? 'Verification Status' : 'Review Status'}
                        </h4>
                        {item.verification.verified ? (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                            <div className="text-slate-500">Verification date: <span className="text-secondary">{item.verification.verifiedDate}</span></div>
                            <div className="text-slate-500">Verified by: <span className="text-secondary">{item.verification.verifiedBy}</span></div>
                            <div className="text-slate-500">Verification: <span className="text-green-400">{item.verification.verificationNote}</span></div>
                            <div className="text-slate-500">Chain of custody: <span className="text-green-400">{item.verification.chainOfCustody}</span></div>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <p className="text-sm text-amber-700 flex items-center gap-1.5">
                              <AlertTriangle className="w-3.5 h-3.5" />
                              {item.verification.verificationNote}
                            </p>
                            {item.pendingAction && (
                              <div className="mt-2 bg-amber-500/5 border border-amber-500/20 rounded-lg p-3">
                                <p className="text-xs font-semibold text-amber-700 mb-1">Action Required:</p>
                                <p className="text-sm text-secondary mb-2">Assigned to: {item.pendingAction.assignedTo}</p>
                                <p className="text-sm text-secondary">{item.pendingAction.action}</p>
                                {item.pendingAction.requirements && (
                                  <ul className="mt-2 space-y-1">
                                    {item.pendingAction.requirements.map((req, i) => (
                                      <li key={i} className="text-xs text-secondary flex items-start gap-1.5">
                                        <Circle className="w-2 h-2 mt-1.5 text-amber-700/60 flex-shrink-0" />
                                        {req}
                                      </li>
                                    ))}
                                  </ul>
                                )}
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Access Level */}
                      <div className="bg-white dark:bg-slate-900/40 rounded-lg p-3 mb-4">
                        <h4 className="text-xs font-semibold text-secondary mb-2 uppercase tracking-wider">Access Level</h4>
                        <div className="text-sm space-y-1">
                          <div className="text-slate-500">Accessible by: <span className="text-secondary">{item.accessibleBy}</span></div>
                          <div className="text-slate-500">{item.accessNote}</div>
                        </div>
                      </div>

                      {/* Compliance Notice (if applicable) */}
                      {item.complianceNotice && (
                        <div className="bg-red-500/5 border border-red-500/20 rounded-lg p-3 mb-4">
                          <div className="flex items-start gap-2">
                            <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="text-xs font-semibold text-red-400 mb-1 uppercase tracking-wider">
                                {item.legalBasis === 'CJIS Restricted' ? 'CJIS Compliance Notice' : 'FCRA Compliance Notice'}
                              </p>
                              <p className="text-xs text-red-300/80">{item.complianceNotice}</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Expand/Collapse for detailed content */}
                      <button
                        onClick={() => setExpandedEvidence(isExpanded ? null : item.id)}
                        className="w-full flex items-center justify-center gap-2 py-2 text-sm text-amber-700 hover:text-amber-300 transition-colors"
                      >
                        {isExpanded ? 'Hide Details' : 'Show Contents, Chain of Custody & Retention Details'}
                        <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                      </button>

                      {/* Expanded Details */}
                      {isExpanded && (
                        <div className="mt-3 space-y-4">
                          {/* Contents */}
                          {(item.contents || item.verificationContents || item.reportContents) && (
                            <div className="bg-white dark:bg-slate-900/40 rounded-lg p-3">
                              <h4 className="text-xs font-semibold text-secondary mb-2 uppercase tracking-wider">
                                {item.category === 'Employment' ? 'Verification Contents' : item.category === 'Financial' ? 'Report Contents' : 'Contents'}
                              </h4>
                              <ul className="space-y-1.5">
                                {(item.contents || item.verificationContents || item.reportContents).map((content, i) => (
                                  <li key={i} className="text-sm text-secondary flex items-start gap-2">
                                    <Circle className="w-2 h-2 mt-2 text-amber-700/60 flex-shrink-0" />
                                    {content}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Investigator Assessment (Criminal History) */}
                          {item.investigatorAssessment && (
                            <div className="bg-white dark:bg-slate-900/40 rounded-lg p-3">
                              <h4 className="text-xs font-semibold text-secondary mb-2 uppercase tracking-wider">Investigator Assessment</h4>
                              <ul className="space-y-1.5">
                                {item.investigatorAssessment.map((assessment, i) => (
                                  <li key={i} className="text-sm text-green-400/80 flex items-start gap-2">
                                    <CheckCircle2 className="w-3 h-3 mt-1 flex-shrink-0" />
                                    {assessment}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Investigator Analysis (Financial) */}
                          {item.investigatorAnalysis && (
                            <div className="bg-white dark:bg-slate-900/40 rounded-lg p-3">
                              <h4 className="text-xs font-semibold text-secondary mb-2 uppercase tracking-wider">Investigator Analysis</h4>
                              <ul className="space-y-1.5">
                                {item.investigatorAnalysis.map((analysis, i) => (
                                  <li key={i} className="text-sm text-secondary flex items-start gap-2">
                                    <CheckCircle2 className="w-3 h-3 mt-1 text-green-400/60 flex-shrink-0" />
                                    {analysis}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Recording Details (Interview) */}
                          {item.recordingDetails && (
                            <div className="bg-white dark:bg-slate-900/40 rounded-lg p-3">
                              <h4 className="text-xs font-semibold text-secondary mb-2 uppercase tracking-wider">Recording Details</h4>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                                <div className="text-slate-500">Interview date: <span className="text-secondary">{item.recordingDetails.interviewDate}</span></div>
                                <div className="text-slate-500">Time: <span className="text-secondary">{item.recordingDetails.interviewTime}</span></div>
                                <div className="text-slate-500">Location: <span className="text-secondary">{item.recordingDetails.location}</span></div>
                                <div className="text-slate-500">Interviewer: <span className="text-secondary">{item.recordingDetails.interviewer}</span></div>
                                <div className="text-slate-500">Interviewee: <span className="text-secondary">{item.recordingDetails.interviewee}</span></div>
                                <div className="text-slate-500">Duration: <span className="text-secondary">{item.recordingDetails.duration}</span></div>
                              </div>
                            </div>
                          )}

                          {/* Transcript (Interview) */}
                          {item.transcript && (
                            <div className="bg-white dark:bg-slate-900/40 rounded-lg p-3">
                              <h4 className="text-xs font-semibold text-secondary mb-2 uppercase tracking-wider">Transcript Available</h4>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                                <div className="text-slate-500">Written transcript: <span className="text-secondary">{item.transcript.pageCount}</span></div>
                                <div className="text-slate-500">Transcribed by: <span className="text-secondary">{item.transcript.transcribedBy}</span></div>
                                <div className="text-slate-500">File: <span className="text-secondary font-mono text-xs">{item.transcript.transcriptFile}</span></div>
                              </div>
                            </div>
                          )}

                          {/* Topics Covered (Interview) */}
                          {item.topicsCovered && (
                            <div className="bg-white dark:bg-slate-900/40 rounded-lg p-3">
                              <h4 className="text-xs font-semibold text-secondary mb-2 uppercase tracking-wider">Interview Topics Covered</h4>
                              <ul className="space-y-1.5">
                                {item.topicsCovered.map((topic, i) => (
                                  <li key={i} className="text-sm text-secondary flex items-start gap-2">
                                    <Circle className="w-2 h-2 mt-2 text-purple-400/60 flex-shrink-0" />
                                    {topic}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Chain of Custody */}
                          <div className="bg-white dark:bg-slate-900/40 rounded-lg p-3">
                            <h4 className="text-xs font-semibold text-secondary mb-2 uppercase tracking-wider">
                              Chain of Custody (Last {item.chainOfCustody.length} accesses)
                            </h4>
                            <div className="space-y-2">
                              {item.chainOfCustody.map((entry, i) => (
                                <div key={i} className="flex items-start gap-3 text-sm">
                                  <div className="w-2 h-2 rounded-full bg-amber-400/60 mt-2 flex-shrink-0"></div>
                                  <div>
                                    <span className="text-slate-500 font-mono text-xs">{entry.date}:</span>
                                    <span className="text-secondary ml-2">{entry.who}</span>
                                    <span className="text-slate-500 ml-1">({entry.action} — {entry.reason})</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                            <button className="mt-3 text-xs text-amber-700 hover:text-amber-300 transition-colors">
                              View Complete Access Log ({item.totalAccessEntries} entries)
                            </button>
                          </div>

                          {/* Retention */}
                          <div className="bg-white dark:bg-slate-900/40 rounded-lg p-3">
                            <h4 className="text-xs font-semibold text-secondary mb-2 uppercase tracking-wider">Retention</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                              <div className="text-slate-500">Retention period: <span className="text-secondary">{item.retention.period}</span></div>
                              <div className="text-slate-500">Current status: <span className="text-secondary">{item.retention.currentStatus}</span></div>
                              {item.retention.scheduledDestruction && (
                                <div className="text-slate-500">Scheduled destruction: <span className="text-secondary">{item.retention.scheduledDestruction}</span></div>
                              )}
                              {item.retention.destructionMethod && (
                                <div className="text-slate-500">Destruction method: <span className="text-secondary">{item.retention.destructionMethod}</span></div>
                              )}
                              {item.retention.physicalOriginals && (
                                <div className="text-slate-500">Physical originals: <span className="text-secondary">{item.retention.physicalOriginals}</span></div>
                              )}
                              {item.retention.secureStorage && (
                                <div className="text-slate-500">Secure storage: <span className="text-secondary">{item.retention.secureStorage}</span></div>
                              )}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="flex items-center justify-between pt-4 border-t border-border dark:border-slate-700/30 mt-4">
                        <div className="text-sm text-secondary">
                          Subject: <span className="text-primary font-medium">{item.subject}</span>
                        </div>
                        <div className="flex items-center gap-2 flex-wrap">
                          {item.accessLevel === 'Confidential' ? (
                            <button className="px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg text-xs font-medium transition-colors flex items-center gap-1">
                              <Lock className="w-3 h-3" />View (Auth Required)
                            </button>
                          ) : (
                            <button className="px-3 py-1.5 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded-lg text-xs font-medium transition-colors">
                              View
                            </button>
                          )}
                          <button className="px-3 py-1.5 bg-green-500/10 hover:bg-green-500/20 text-green-400 rounded-lg text-xs font-medium transition-colors">
                            Download
                          </button>
                          <button className="px-3 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 rounded-lg text-xs font-medium transition-colors">
                            Chain of Custody
                          </button>
                          <button className="px-3 py-1.5 bg-white dark:bg-slate-700/50 hover:bg-slate-700/70 text-secondary rounded-lg text-xs font-medium transition-colors flex items-center gap-1">
                            <RefreshCw className="w-3 h-3" />Verify Integrity
                          </button>
                          <button className="px-3 py-1.5 bg-white dark:bg-slate-700/50 hover:bg-slate-700/70 text-secondary rounded-lg text-xs font-medium transition-colors">
                            Print
                          </button>
                          {(item.status === 'Pending Review' || item.status === 'Under Review') && (
                            <button className="px-3 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 rounded-lg text-xs font-medium transition-colors">
                              Request Supervisor Review
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Load More / Export */}
            <div className="flex items-center justify-between mt-6">
              <button className="px-4 py-2 bg-white dark:bg-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-800/60 border border-slate-700/50 text-secondary rounded-xl text-sm font-medium transition-colors">
                Load More Evidence
              </button>
              <div className="flex items-center gap-3">
                <button className="px-4 py-2 bg-white dark:bg-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-800/60 border border-slate-700/50 text-secondary rounded-xl text-sm font-medium transition-colors flex items-center gap-2">
                  <Filter className="w-4 h-4" />Filter Evidence
                </button>
                <button className="px-4 py-2 bg-white dark:bg-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-800/60 border border-slate-700/50 text-secondary rounded-xl text-sm font-medium transition-colors flex items-center gap-2">
                  <Download className="w-4 h-4" />Export All Chain of Custody
                </button>
              </div>
            </div>

            {/* Support & Resources Panel */}
            <div className="mt-8 bg-white dark:bg-slate-800/40 border border-border rounded-xl shadow-sm dark:shadow-none p-6">
              <h3 className="text-lg font-semibold text-primary mb-4 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-amber-700" />
                Support & Resources
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Quick Actions */}
                <div>
                  <h4 className="text-sm font-semibold text-secondary mb-3">Quick Actions</h4>
                  <div className="space-y-2">
                    <button className="w-full flex items-center gap-2 px-3 py-2 bg-white dark:bg-slate-900/40 hover:bg-slate-900/60 rounded-lg transition-colors text-left">
                      <Upload className="w-4 h-4 text-amber-700" />
                      <span className="text-sm text-secondary">Upload New Evidence</span>
                    </button>
                    <button className="w-full flex items-center gap-2 px-3 py-2 bg-white dark:bg-slate-900/40 hover:bg-slate-900/60 rounded-lg transition-colors text-left">
                      <RefreshCw className="w-4 h-4 text-green-400" />
                      <span className="text-sm text-secondary">Run Integrity Verification</span>
                    </button>
                    <button className="w-full flex items-center gap-2 px-3 py-2 bg-white dark:bg-slate-900/40 hover:bg-slate-900/60 rounded-lg transition-colors text-left">
                      <Download className="w-4 h-4 text-blue-400" />
                      <span className="text-sm text-secondary">Export Chain of Custody Report</span>
                    </button>
                    <button className="w-full flex items-center gap-2 px-3 py-2 bg-white dark:bg-slate-900/40 hover:bg-slate-900/60 rounded-lg transition-colors text-left">
                      <Eye className="w-4 h-4 text-purple-400" />
                      <span className="text-sm text-secondary">View Full Audit Trail</span>
                    </button>
                  </div>
                </div>

                {/* Documentation */}
                <div>
                  <h4 className="text-sm font-semibold text-secondary mb-3">Documentation</h4>
                  <div className="space-y-2">
                    <button className="w-full flex items-center gap-2 px-3 py-2 bg-white dark:bg-slate-900/40 hover:bg-slate-900/60 rounded-lg transition-colors text-left">
                      <BookOpen className="w-4 h-4 text-amber-700" />
                      <span className="text-sm text-secondary">Evidence Handling Procedures</span>
                    </button>
                    <button className="w-full flex items-center gap-2 px-3 py-2 bg-white dark:bg-slate-900/40 hover:bg-slate-900/60 rounded-lg transition-colors text-left">
                      <BookOpen className="w-4 h-4 text-amber-700" />
                      <span className="text-sm text-secondary">Chain of Custody Standards</span>
                    </button>
                    <button className="w-full flex items-center gap-2 px-3 py-2 bg-white dark:bg-slate-900/40 hover:bg-slate-900/60 rounded-lg transition-colors text-left">
                      <BookOpen className="w-4 h-4 text-amber-700" />
                      <span className="text-sm text-secondary">CJIS Compliance Guidelines</span>
                    </button>
                    <button className="w-full flex items-center gap-2 px-3 py-2 bg-white dark:bg-slate-900/40 hover:bg-slate-900/60 rounded-lg transition-colors text-left">
                      <BookOpen className="w-4 h-4 text-amber-700" />
                      <span className="text-sm text-secondary">FCRA Requirements Reference</span>
                    </button>
                    <button className="w-full flex items-center gap-2 px-3 py-2 bg-white dark:bg-slate-900/40 hover:bg-slate-900/60 rounded-lg transition-colors text-left">
                      <ExternalLink className="w-4 h-4 text-amber-700" />
                      <span className="text-sm text-secondary">POST Evidence Retention Policy</span>
                    </button>
                  </div>
                </div>

                {/* Contact */}
                <div>
                  <h4 className="text-sm font-semibold text-secondary mb-3">Contact & Support</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-slate-900/40 rounded-lg">
                      <Phone className="w-4 h-4 text-secondary" />
                      <div>
                        <p className="text-sm text-secondary">BI Unit</p>
                        <p className="text-xs text-slate-500">Ext. 4520</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-slate-900/40 rounded-lg">
                      <Mail className="w-4 h-4 text-secondary" />
                      <div>
                        <p className="text-sm text-secondary">Evidence Support</p>
                        <p className="text-xs text-slate-500">evidence@gcso.gov</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-slate-900/40 rounded-lg">
                      <Phone className="w-4 h-4 text-secondary" />
                      <div>
                        <p className="text-sm text-secondary">CJIS Help Desk</p>
                        <p className="text-xs text-slate-500">Ext. 4600 (24/7)</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-slate-900/40 rounded-lg">
                      <Phone className="w-4 h-4 text-secondary" />
                      <div>
                        <p className="text-sm text-secondary">IT Security</p>
                        <p className="text-xs text-slate-500">Ext. 4700 (evidence integrity issues)</p>
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

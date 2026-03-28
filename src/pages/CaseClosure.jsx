import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import {
  LayoutDashboard,
  FileText,
  TrendingUp,
  Settings,
  Bell,
  MessageCircle,
  Search,
  ChevronRight,
  Shield,
  Sparkles,
  X,
  Send,
  Menu,
  ChevronLeft,
  LogOut,
  FolderOpen,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  UserCheck,
  FileCheck,
  DollarSign,
  Eye,
  Download,
  Archive,
  Award,
  ChevronDown,
  ChevronUp,
  User,
  Mail,
  Printer,
  RotateCcw,
  ClipboardCheck,
  FileSearch,
  Scale,
  BadgeCheck,
  AlertCircle,
  ExternalLink,
  Phone,
  Building,
  CreditCard,
  Users,
  Globe,
  Mic,
  FolderArchive,
  History,
  ShieldAlert,
  FileWarning
} from 'lucide-react';
import DashboardLayout from '../layouts/DashboardLayout';
import { biNavigation, biProfile, biNotifications } from '../config/biConfig';

export default function CaseClosure() {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState('case-closure');
  const [chatOpen, setChatOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [logoutConfirmOpen, setLogoutConfirmOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState({});
  const [selectedDisposition, setSelectedDisposition] = useState('');
  const [dispositionRationale, setDispositionRationale] = useState('');
  const [rejectReason, setRejectReason] = useState('');
  const [rejectDetails, setRejectDetails] = useState('');

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

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const navigation = [
    { id: 'bi-dashboard', label: 'BI Dashboard', icon: LayoutDashboard, page: 'BackgroundsDashboard' },
    { id: 'active-cases', label: 'Active Cases', icon: FolderOpen, page: 'ActiveCases' },
    { id: 'case-management', label: 'Case Management', icon: FileText, page: 'CaseManagement' },
    { id: 'investigation-timeline', label: 'Investigation Timeline', icon: Clock, page: 'InvestigationTimeline' },
    { id: 'subject-records', label: 'Subject Records', icon: UserCheck, page: 'SubjectRecords' },
    { id: 'interview-scheduling', label: 'Interview Scheduling', icon: Calendar, page: 'InterviewScheduling' },
    { id: 'evidence-tracking', label: 'Evidence Tracking', icon: FileCheck, page: 'EvidenceTracking' },
    { id: 'reference-checks', label: 'Reference Checks', icon: CheckCircle, page: 'ReferenceChecks' },
    { id: 'employment-verification', label: 'Employment Verification', icon: TrendingUp, page: 'EmploymentVerification' },
    { id: 'criminal-history', label: 'Criminal History Review', icon: AlertTriangle, page: 'CriminalHistoryReview' },
    { id: 'financial-background', label: 'Financial Background', icon: DollarSign, page: 'FinancialBackground' },
    { id: 'social-media', label: 'Social Media Analysis', icon: Eye, page: 'SocialMediaAnalysis' },
    { id: 'bi-reports', label: 'BI Reports', icon: LayoutDashboard, page: 'BIReports' },
    { id: 'case-closure', label: 'Case Closure', icon: XCircle }
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

  const caseData = {
    caseId: 'BI-2024-145',
    subject: 'Robert Anthony Martinez',
    position: 'Deputy Sheriff (Sworn Law Enforcement)',
    assignment: 'Patrol Division',
    applicationType: 'Lateral transfer (current sworn officer)',
    currentAgency: 'Metro Atlanta Police Department',
    applicationDate: 'October 15, 2024',
    investigationStarted: 'October 15, 2024',
    investigationCompleted: 'November 7, 2024',
    duration: 23,
    standardTimeframe: '45-60 days for lateral (expedited)',
    investigator: 'Agent Brooks',
    investigatorBadge: 'BI-107',
    supervisorReviewer: 'BI Supervisor',
    status: 'Investigation Complete - Ready for Final Disposition'
  };

  const iaReviewStatus = {
    status: 'PENDING',
    requestDate: 'January 24, 2026',
    requestingAgency: 'Metro Atlanta Police Department',
    expectedResponse: 'February 3-7, 2026',
    documentsRequested: [
      'Personnel file',
      'Disciplinary history',
      'Citizen complaints',
      'Use of force incidents',
      'Performance evaluations',
      'Brady/Giglio credibility review'
    ],
    isMandatory: true
  };

  const investigationSections = [
    {
      id: 'personal',
      title: 'PERSONAL INFORMATION',
      status: 'Verified',
      completion: 'Complete',
      icon: User,
      details: [
        { label: 'Full name verified', value: 'Robert Anthony Martinez' },
        { label: 'DOB verified', value: 'March 15, 1993 (age 31)' },
        { label: 'SSN verified', value: 'Valid (E-Verify confirmed)' },
        { label: 'Address verified', value: '1234 Main St, Atlanta, GA 30318' },
        { label: 'Contact verified', value: 'Phone and email confirmed' }
      ],
      actions: ['View Details', 'Edit Information']
    },
    {
      id: 'criminal',
      title: 'CRIMINAL HISTORY CHECK (GCIC/FBI)',
      status: 'Clear (No disqualifying history)',
      completion: 'Complete',
      icon: ShieldAlert,
      details: [
        { label: 'GCIC check', value: 'Clear (no GA criminal records)' },
        { label: 'FBI NCIC check', value: 'Clear (no nationwide criminal records)' },
        { label: 'County courts', value: 'Clear (no county criminal records)' },
        { label: 'Federal courts', value: 'Clear (no federal criminal records)' },
        { label: 'Traffic', value: '2 minor speeding tickets (2019, 2021 - paid)' },
        { label: 'Assessment', value: 'Meets POST standards (no disqualifying history)' }
      ],
      actions: ['View Full Criminal Report', 'View GCIC Results', 'View FBI Results']
    },
    {
      id: 'employment',
      title: 'EMPLOYMENT VERIFICATION',
      status: 'All Verified',
      completion: 'Complete',
      icon: Building,
      details: [
        { label: 'Current', value: 'Metro Atlanta PD (2018-Present) - Verified ✓' },
        { label: 'Prior', value: 'Atlanta Security (2015-2017) - Verified ✓' },
        { label: 'Prior', value: 'Campus Safety GSU (2012-2015) - Verified ✓' },
        { label: 'All employers', value: 'Eligible for rehire (100%)' },
        { label: 'Assessment', value: 'Stable employment history, good references' }
      ],
      actions: ['View Employment Timeline', 'View Verification Details']
    },
    {
      id: 'references',
      title: 'REFERENCE CHECKS',
      status: 'Highly Recommended',
      completion: 'Complete (2 of 3)',
      icon: Users,
      details: [
        { label: 'Reference #1', value: 'Sgt. John Davis (current supervisor) ✓', subValue: 'Outcome: STRONGLY POSITIVE (highly recommends)' },
        { label: 'Reference #2', value: 'Capt. Sarah Williams (former supervisor) ✓', subValue: 'Outcome: POSITIVE (recommends for hire)' },
        { label: 'Reference #3', value: 'Officer Michael Brown (colleague) ⏳', subValue: 'Status: Pending callback (not critical - 2 strong refs)' },
        { label: 'Assessment', value: 'Excellent supervisory references' }
      ],
      actions: ['View Reference Interview Notes', 'View All References']
    },
    {
      id: 'financial',
      title: 'FINANCIAL BACKGROUND',
      status: 'Acceptable (Meets minimum standards)',
      completion: 'Complete',
      icon: CreditCard,
      details: [
        { label: 'Credit score', value: '742 (Good, above 650 minimum)' },
        { label: 'Debt-to-income', value: '34% (acceptable, under 50%)' },
        { label: 'Bankruptcies', value: 'None' },
        { label: 'Foreclosures', value: 'None' },
        { label: 'Collections', value: 'None' },
        { label: 'Late payments', value: '1 (2020, COVID period - understandable)' },
        { label: 'Assessment', value: 'Responsible financial management' }
      ],
      actions: ['View Credit Report', 'View Financial Analysis']
    },
    {
      id: 'social',
      title: 'SOCIAL MEDIA REVIEW',
      status: 'Professional (No concerns)',
      completion: 'Complete',
      icon: Globe,
      details: [
        { label: 'Platforms reviewed', value: 'Facebook, LinkedIn, Twitter/X, Instagram' },
        { label: 'Public posts reviewed', value: '142 posts (last 5 years)' },
        { label: 'Flagged content', value: 'None (no concerning posts)' },
        { label: 'Political content', value: 'Minimal, non-controversial (protected)' },
        { label: 'Assessment', value: 'Professional online presence, no concerns' }
      ],
      actions: ['View Social Media Analysis', 'View Sample Posts']
    },
    {
      id: 'interview',
      title: 'SUBJECT INTERVIEW',
      status: 'Positive',
      completion: 'Complete',
      icon: Mic,
      details: [
        { label: 'Interview date', value: 'October 23, 2024' },
        { label: 'Interview duration', value: '60 minutes' },
        { label: 'Interviewer', value: 'Agent Brooks (Badge #BI-107)' },
        { label: 'Topics covered', value: 'Employment, criminal, financial, references' },
        { label: 'Applicant demeanor', value: 'Professional, cooperative, forthcoming' },
        { label: 'Assessment', value: 'No concerns, applicant answered all questions' }
      ],
      actions: ['View Interview Notes', 'View Interview Recording Transcript']
    },
    {
      id: 'evidence',
      title: 'EVIDENCE DOCUMENTATION',
      status: '6 items archived',
      completion: 'Complete',
      icon: FolderArchive,
      details: [
        { label: 'Application package', value: 'Archived ✓' },
        { label: 'Criminal history report', value: 'Archived ✓ (CJIS secured)' },
        { label: 'Reference letters', value: 'Archived ✓' },
        { label: 'Employment verification', value: 'Archived ✓' },
        { label: 'Interview recording', value: 'Archived ✓ (confidential)' },
        { label: 'Financial report', value: 'Archived ✓ (FCRA secured)' },
        { label: 'Chain of custody', value: 'Complete (all access logged)' }
      ],
      actions: ['View Evidence Locker', 'View Chain of Custody', 'Verify Integrity']
    }
  ];

  const caseStatistics = {
    documentsCollected: { value: '6 items', note: 'archived in evidence locker' },
    referencesContacted: { value: '3 references', note: '2 completed, 1 pending' },
    interviewsConducted: { value: '1', note: 'subject interview complete' },
    backgroundChecks: { value: '5', note: 'GCIC, FBI, credit, employment, social' },
    investigationDays: { value: '23 days', note: '' },
    investigatorHours: { value: '42 hours', note: 'estimated' }
  };

  const notifications = [
    { id: 1, title: 'Case Ready', message: 'BI-2024-145 ready for final review', time: '30 min ago', urgent: true },
    { id: 2, title: 'IA Review Pending', message: 'Metro Atlanta PD IA response expected Feb 3-7', time: '2 hours ago', urgent: true },
    { id: 3, title: 'Report Generated', message: 'Comprehensive report available', time: '1 day ago', urgent: false }
  ];

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    timeZoneName: 'short'
  });

  return (
    <DashboardLayout
      navigation={biNavigation}
      profile={biProfile}
      notifications={biNotifications}
      settingsRoute="/bi/settings"
    >
      <div className="p-5 lg:p-8 space-y-8 bg-slate-100 dark:bg-transparent min-h-full">
          {/* Page Header */}
          <div className="mb-6">
            <h2 className="text-2xl lg:text-3xl font-bold text-white mb-2">
              Case Closure - {caseData.subject} ({caseData.caseId})
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-1">Final investigation review and case disposition for hiring decision</p>
            <p className="text-sm text-slate-500 mb-4">Current date: {currentDate}</p>

            <div className="bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/50 rounded-xl p-4 mb-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div>
                  <p className="text-xs text-slate-500 mb-1">BI Supervisor</p>
                  <p className="text-sm text-white font-medium">Background Investigations Unit</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1">Position</p>
                  <p className="text-sm text-white font-medium">{caseData.position}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1">Assignment</p>
                  <p className="text-sm text-white font-medium">{caseData.assignment}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1">Investigation Duration</p>
                  <p className="text-sm text-white font-medium">{caseData.investigationStarted} - {caseData.investigationCompleted} ({caseData.duration} days)</p>
                </div>
              </div>
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-green-500/10 text-green-400 rounded-lg text-sm font-medium border border-green-500/20">
                  {caseData.status}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                <button className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Approve & Close Case
                </button>
                <button className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 border border-red-500/20">
                  <XCircle className="w-4 h-4" />
                  Reject Candidate
                </button>
                <button className="px-4 py-2 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 border border-amber-500/20">
                  <RotateCcw className="w-4 h-4" />
                  Return for Additional Investigation
                </button>
                <button className="px-4 py-2 bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 border border-purple-500/20">
                  <Download className="w-4 h-4" />
                  Download Complete Report
                </button>
                <button className="px-4 py-2 bg-slate-700/50 hover:bg-slate-700/70 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
                  <Archive className="w-4 h-4" />
                  Archive Case
                </button>
                <button className="px-4 py-2 bg-slate-700/50 hover:bg-slate-700/70 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
                  <Printer className="w-4 h-4" />
                  Print Case Summary
                </button>
              </div>
            </div>
          </div>

          {/* Case Disposition Summary */}
          <div className="mb-6 bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/50 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center">
                <ClipboardCheck className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">CASE DISPOSITION SUMMARY</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">Investigation Completed: {caseData.investigationCompleted}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Case Information */}
              <div className="bg-slate-900/40 rounded-xl p-4">
                <h4 className="text-sm font-semibold text-purple-400 mb-3">CASE INFORMATION</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <span className="text-slate-500">├─</span>
                    <span className="text-slate-600 dark:text-slate-400">Applicant:</span>
                    <span className="text-white">{caseData.subject}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-slate-500">├─</span>
                    <span className="text-slate-600 dark:text-slate-400">Case ID:</span>
                    <span className="text-white">{caseData.caseId}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-slate-500">├─</span>
                    <span className="text-slate-600 dark:text-slate-400">Position:</span>
                    <span className="text-white">{caseData.position}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-slate-500">├─</span>
                    <span className="text-slate-600 dark:text-slate-400">Assignment:</span>
                    <span className="text-white">{caseData.assignment}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-slate-500">├─</span>
                    <span className="text-slate-600 dark:text-slate-400">Application date:</span>
                    <span className="text-white">{caseData.applicationDate}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-slate-500">├─</span>
                    <span className="text-slate-600 dark:text-slate-400">Investigation dates:</span>
                    <span className="text-white">{caseData.investigationStarted} - {caseData.investigationCompleted}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-slate-500">├─</span>
                    <span className="text-slate-600 dark:text-slate-400">Investigation duration:</span>
                    <span className="text-white">{caseData.duration} days (acceptable for lateral transfer)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-slate-500">├─</span>
                    <span className="text-slate-600 dark:text-slate-400">Assigned investigator:</span>
                    <span className="text-white">{caseData.investigator} (Badge #{caseData.investigatorBadge})</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-slate-500">└─</span>
                    <span className="text-slate-600 dark:text-slate-400">Supervisor reviewer:</span>
                    <span className="text-white">{caseData.supervisorReviewer}</span>
                  </div>
                </div>
              </div>

              {/* Investigation Status */}
              <div className="bg-slate-900/40 rounded-xl p-4">
                <h4 className="text-sm font-semibold text-purple-400 mb-3">INVESTIGATION STATUS</h4>
                <div className="space-y-2 text-sm mb-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-slate-700 dark:text-slate-300">Background investigation complete</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-slate-700 dark:text-slate-300">All required checks completed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-slate-700 dark:text-slate-300">All documentation collected and archived</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-slate-700 dark:text-slate-300">Investigator assessment complete</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-slate-700 dark:text-slate-300">Supervisor review complete</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-amber-400" />
                    <span className="text-amber-300">Awaiting final hiring authority decision</span>
                  </div>
                </div>

                <h4 className="text-sm font-semibold text-purple-400 mb-3">NEXT STEPS</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <span className="text-slate-500">├─</span>
                    <span className="text-slate-700 dark:text-slate-300">Select final disposition above</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-slate-500">├─</span>
                    <span className="text-slate-700 dark:text-slate-300">Enter disposition rationale (required)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-slate-500">├─</span>
                    <span className="text-slate-700 dark:text-slate-300">Generate final investigation report</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-slate-500">└─</span>
                    <span className="text-slate-700 dark:text-slate-300">Archive case with final decision documented</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              <button className="px-3 py-1.5 bg-slate-700/50 hover:bg-slate-700/70 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-medium transition-colors flex items-center gap-1">
                <FileSearch className="w-3 h-3" />
                View Complete Investigation File
              </button>
              <button className="px-3 py-1.5 bg-slate-700/50 hover:bg-slate-700/70 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-medium transition-colors flex items-center gap-1">
                <Eye className="w-3 h-3" />
                Review All Evidence
              </button>
              <button className="px-3 py-1.5 bg-slate-700/50 hover:bg-slate-700/70 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-medium transition-colors flex items-center gap-1">
                <History className="w-3 h-3" />
                View Investigation Timeline
              </button>
              <button className="px-3 py-1.5 bg-slate-700/50 hover:bg-slate-700/70 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-medium transition-colors flex items-center gap-1">
                <FileText className="w-3 h-3" />
                Generate Final Report
              </button>
            </div>
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Case Overview */}
            <div className="lg:col-span-2 bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">CASE OVERVIEW - {caseData.subject.toUpperCase()}</h3>
              <p className="text-sm text-purple-400 mb-4">Case ID: {caseData.caseId}</p>

              {/* Applicant Information */}
              <div className="bg-slate-900/40 rounded-xl p-4 mb-4">
                <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">APPLICANT INFORMATION</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <div className="flex items-start gap-2">
                    <span className="text-slate-500">├─</span>
                    <span className="text-slate-600 dark:text-slate-400">Full name:</span>
                    <span className="text-white">{caseData.subject}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-slate-500">├─</span>
                    <span className="text-slate-600 dark:text-slate-400">Position applied:</span>
                    <span className="text-white">{caseData.position}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-slate-500">├─</span>
                    <span className="text-slate-600 dark:text-slate-400">Assignment:</span>
                    <span className="text-white">{caseData.assignment}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-slate-500">├─</span>
                    <span className="text-slate-600 dark:text-slate-400">Application type:</span>
                    <span className="text-white">{caseData.applicationType}</span>
                  </div>
                  <div className="flex items-start gap-2 md:col-span-2">
                    <span className="text-slate-500">└─</span>
                    <span className="text-slate-600 dark:text-slate-400">Current agency:</span>
                    <span className="text-white">{caseData.currentAgency}</span>
                  </div>
                </div>
              </div>

              {/* Investigation Timeline */}
              <div className="bg-slate-900/40 rounded-xl p-4 mb-4">
                <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">INVESTIGATION TIMELINE</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <div className="flex items-start gap-2">
                    <span className="text-slate-500">├─</span>
                    <span className="text-slate-600 dark:text-slate-400">Application received:</span>
                    <span className="text-white">{caseData.applicationDate}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-slate-500">├─</span>
                    <span className="text-slate-600 dark:text-slate-400">Investigation initiated:</span>
                    <span className="text-white">{caseData.investigationStarted}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-slate-500">├─</span>
                    <span className="text-slate-600 dark:text-slate-400">Investigation completed:</span>
                    <span className="text-white">{caseData.investigationCompleted}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-slate-500">├─</span>
                    <span className="text-slate-600 dark:text-slate-400">Total duration:</span>
                    <span className="text-white">{caseData.duration} days (acceptable for lateral transfer)</span>
                  </div>
                  <div className="flex items-start gap-2 md:col-span-2">
                    <span className="text-slate-500">└─</span>
                    <span className="text-slate-600 dark:text-slate-400">Standard timeframe:</span>
                    <span className="text-white">{caseData.standardTimeframe}</span>
                  </div>
                </div>
              </div>

              {/* Investigation Team */}
              <div className="bg-slate-900/40 rounded-xl p-4 mb-4">
                <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">INVESTIGATION TEAM</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <span className="text-slate-500">├─</span>
                    <span className="text-slate-600 dark:text-slate-400">Primary investigator:</span>
                    <span className="text-white">{caseData.investigator} (Badge #{caseData.investigatorBadge})</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-slate-500">├─</span>
                    <span className="text-slate-600 dark:text-slate-400">Supervisor reviewer:</span>
                    <span className="text-white">{caseData.supervisorReviewer}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-slate-500">└─</span>
                    <span className="text-slate-600 dark:text-slate-400">Final approver:</span>
                    <span className="text-amber-400">[Pending - Hiring Authority]</span>
                  </div>
                </div>
              </div>

              {/* Investigation Status */}
              <div className="bg-slate-900/40 rounded-xl p-4 mb-4">
                <div className="flex items-center gap-2 mb-3">
                  <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300">INVESTIGATION STATUS:</h4>
                  <span className="px-2 py-0.5 bg-green-500/10 text-green-400 rounded text-xs font-medium">✓ COMPLETE</span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <span className="text-slate-500">├─</span>
                    <span className="text-slate-600 dark:text-slate-400">All required checks:</span>
                    <span className="text-white">Complete (8 of 8)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-slate-500">├─</span>
                    <span className="text-slate-600 dark:text-slate-400">All documentation:</span>
                    <span className="text-white">Collected and archived (6 items)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-slate-500">├─</span>
                    <span className="text-slate-600 dark:text-slate-400">Investigator assessment:</span>
                    <span className="text-white">Complete</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-slate-500">├─</span>
                    <span className="text-slate-600 dark:text-slate-400">Supervisor review:</span>
                    <span className="text-white">Complete</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-slate-500">└─</span>
                    <span className="text-slate-600 dark:text-slate-400">Awaiting:</span>
                    <span className="text-amber-400">Final hiring authority decision</span>
                  </div>
                </div>
              </div>

              {/* IA Review Contingency - CRITICAL */}
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="w-5 h-5 text-amber-400" />
                  <h4 className="text-sm font-semibold text-amber-400">CONTINGENCY: INTERNAL AFFAIRS REVIEW PENDING</h4>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <span className="text-amber-500/50">├─</span>
                    <span className="text-amber-300/70">Status:</span>
                    <span className="text-amber-200">IA review requested from {iaReviewStatus.requestingAgency}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-amber-500/50">├─</span>
                    <span className="text-amber-300/70">Request date:</span>
                    <span className="text-amber-200">{iaReviewStatus.requestDate}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-amber-500/50">├─</span>
                    <span className="text-amber-300/70">Expected response:</span>
                    <span className="text-amber-200">{iaReviewStatus.expectedResponse} (14-21 day turnaround)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-amber-500/50">├─</span>
                    <span className="text-amber-300/70">Requirement:</span>
                    <span className="text-amber-200 font-medium">MANDATORY for lateral transfers (POST)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-amber-500/50">└─</span>
                    <span className="text-amber-300/70">Note:</span>
                    <span className="text-amber-200">Final clearance contingent on IA approval</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar - Case Disposition Actions */}
            <div className="space-y-6">
              <div className="bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/50 rounded-xl p-6">
                <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">CASE DISPOSITION ACTIONS</h4>

                <p className="text-xs text-slate-600 dark:text-slate-400 mb-3">PRIMARY ACTIONS (Select Final Disposition):</p>

                <div className="space-y-3 mb-4">
                  <button className="w-full p-3 bg-green-500/10 hover:bg-green-500/20 border border-green-500/30 rounded-xl text-left transition-colors">
                    <div className="flex items-center gap-2 mb-1">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-sm font-medium text-green-400">APPROVE & CLOSE CASE</span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 ml-6">Recommend applicant for hire (contingent offer approved)</p>
                    <p className="text-xs text-amber-400 ml-6 mt-1">⚠️ Requires: Disposition rationale, supervisor approval</p>
                    <p className="text-xs text-amber-400 ml-6">⚠️ Note: Final clearance contingent on IA review completion</p>
                  </button>

                  <button className="w-full p-3 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 rounded-xl text-left transition-colors">
                    <div className="flex items-center gap-2 mb-1">
                      <XCircle className="w-4 h-4 text-red-400" />
                      <span className="text-sm font-medium text-red-400">REJECT CANDIDATE</span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 ml-6">Do not recommend applicant for hire (disqualifying factors)</p>
                    <p className="text-xs text-amber-400 ml-6 mt-1">⚠️ Requires: Specific disqualification reason, adverse action notice per FCRA (if credit/background basis)</p>
                  </button>

                  <button className="w-full p-3 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 rounded-xl text-left transition-colors">
                    <div className="flex items-center gap-2 mb-1">
                      <RotateCcw className="w-4 h-4 text-amber-400" />
                      <span className="text-sm font-medium text-amber-400">RETURN FOR ADDITIONAL INVESTIGATION</span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 ml-6">Require additional checks, clarification, or follow-up</p>
                    <p className="text-xs text-amber-400 ml-6 mt-1">⚠️ Requires: Specific areas requiring additional investigation</p>
                  </button>
                </div>

                <div className="border-t border-slate-700/50 pt-4 mb-4">
                  <p className="text-xs text-slate-600 dark:text-slate-400 mb-3">CASE MANAGEMENT ACTIONS:</p>
                  <div className="space-y-2">
                    <button className="w-full px-3 py-2 bg-slate-700/30 hover:bg-slate-700/50 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-medium transition-colors flex items-center gap-2">
                      <Download className="w-3 h-3" />
                      Download Complete Report (PDF)
                    </button>
                    <button className="w-full px-3 py-2 bg-slate-700/30 hover:bg-slate-700/50 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-medium transition-colors flex items-center gap-2">
                      <Archive className="w-3 h-3" />
                      Archive Case (after disposition)
                    </button>
                    <button className="w-full px-3 py-2 bg-slate-700/30 hover:bg-slate-700/50 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-medium transition-colors flex items-center gap-2">
                      <Printer className="w-3 h-3" />
                      Print Case Summary
                    </button>
                    <button className="w-full px-3 py-2 bg-slate-700/30 hover:bg-slate-700/50 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-medium transition-colors flex items-center gap-2">
                      <Mail className="w-3 h-3" />
                      Send to Hiring Authority
                    </button>
                    <button className="w-full px-3 py-2 bg-slate-700/30 hover:bg-slate-700/50 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-medium transition-colors flex items-center gap-2">
                      <Clock className="w-3 h-3" />
                      Request Additional Time
                    </button>
                  </div>
                </div>

                <div className="border-t border-slate-700/50 pt-4">
                  <p className="text-xs text-slate-600 dark:text-slate-400 mb-3">CASE STATISTICS:</p>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Documents collected:</span>
                      <span className="text-white">{caseStatistics.documentsCollected.value}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">References contacted:</span>
                      <span className="text-white">{caseStatistics.referencesContacted.value}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Interviews conducted:</span>
                      <span className="text-white">{caseStatistics.interviewsConducted.value}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Background checks:</span>
                      <span className="text-white">{caseStatistics.backgroundChecks.value}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Investigation days:</span>
                      <span className="text-white">{caseStatistics.investigationDays.value}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Investigator hours:</span>
                      <span className="text-white">{caseStatistics.investigatorHours.value} (est.)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Investigation Sections Checklist */}
          <div className="bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/50 rounded-xl p-6 mb-6">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">INVESTIGATION SECTIONS - COMPLETION STATUS</h3>

            <div className="space-y-3">
              {investigationSections.map((section) => {
                const Icon = section.icon;
                const isExpanded = expandedSections[section.id];
                return (
                  <div key={section.id} className="bg-slate-900/40 rounded-xl overflow-hidden">
                    <button
                      onClick={() => toggleSection(section.id)}
                      className="w-full p-4 flex items-center justify-between hover:bg-slate-800/30 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-400" />
                        <Icon className="w-5 h-5 text-purple-400" />
                        <div className="text-left">
                          <span className="text-sm font-medium text-slate-900 dark:text-white">{section.title}</span>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-xs text-slate-600 dark:text-slate-400">Status: {section.status}</span>
                            <span className="text-xs text-slate-500">|</span>
                            <span className="text-xs text-slate-600 dark:text-slate-400">Completion: {section.completion}</span>
                          </div>
                        </div>
                      </div>
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                      )}
                    </button>

                    {isExpanded && (
                      <div className="px-4 pb-4 border-t border-slate-800/50">
                        <div className="pt-3 space-y-2">
                          {section.details.map((detail, idx) => (
                            <div key={idx} className="text-sm">
                              <div className="flex items-start gap-2">
                                <span className="text-slate-500">{idx === section.details.length - 1 ? '└─' : '├─'}</span>
                                <span className="text-slate-600 dark:text-slate-400">{detail.label}:</span>
                                <span className="text-white">{detail.value}</span>
                              </div>
                              {detail.subValue && (
                                <div className="ml-8 text-xs text-slate-500">{detail.subValue}</div>
                              )}
                            </div>
                          ))}
                        </div>
                        <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-slate-800/50">
                          {section.actions.map((action, idx) => (
                            <button key={idx} className="px-2 py-1 bg-slate-700/30 hover:bg-slate-700/50 text-slate-600 dark:text-slate-400 hover:text-slate-700 dark:text-slate-300 rounded text-xs transition-colors">
                              {action}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Lateral Transfer Requirements - IA Review */}
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4">
                <div className="flex items-center gap-3 mb-3">
                  <AlertTriangle className="w-5 h-5 text-amber-400" />
                  <div>
                    <span className="text-sm font-medium text-amber-400">LATERAL TRANSFER REQUIREMENTS</span>
                    <div className="flex items-center gap-2 mt-0.5">
                      <Clock className="w-3 h-3 text-amber-400" />
                      <span className="text-xs text-amber-300">Internal Affairs Review: PENDING (MANDATORY)</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <span className="text-amber-500/50">├─</span>
                    <span className="text-amber-300/70">IA request sent:</span>
                    <span className="text-amber-200">{iaReviewStatus.requestDate}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-amber-500/50">├─</span>
                    <span className="text-amber-300/70">Requesting agency:</span>
                    <span className="text-amber-200">{iaReviewStatus.requestingAgency}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-amber-500/50">├─</span>
                    <span className="text-amber-300/70">Expected response:</span>
                    <span className="text-amber-200">{iaReviewStatus.expectedResponse}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-amber-500/50">├─</span>
                    <span className="text-amber-300/70">Documents requested:</span>
                    <span className="text-amber-200">{iaReviewStatus.documentsRequested.join(', ')}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-amber-500/50">└─</span>
                    <span className="text-amber-300/70">Status:</span>
                    <span className="text-amber-200 font-medium">CANNOT FINALIZE WITHOUT IA CLEARANCE (POST req)</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-amber-500/20">
                  <button className="px-2 py-1 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 rounded text-xs transition-colors">
                    Track IA Request
                  </button>
                  <button className="px-2 py-1 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 rounded text-xs transition-colors">
                    View IA Requirements
                  </button>
                  <button className="px-2 py-1 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 rounded text-xs transition-colors">
                    Contact Metro PD IA
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Investigator Assessment & Key Findings */}
          <div className="bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/50 rounded-xl p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">INVESTIGATOR ASSESSMENT & KEY FINDINGS</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">Prepared by: {caseData.investigator}, Badge #{caseData.investigatorBadge} | Review date: {caseData.investigationCompleted}</p>
              </div>
            </div>

            {/* Overall Assessment */}
            <div className="bg-slate-900/40 rounded-xl p-4 mb-4">
              <h4 className="text-sm font-semibold text-purple-400 mb-3">OVERALL ASSESSMENT</h4>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                Applicant is a currently-employed sworn law enforcement officer seeking lateral transfer from Metro Atlanta Police Department.
                Comprehensive background investigation completed. All checks passed POST and agency standards. No disqualifying factors
                identified. Strong supervisory references. Responsible financial management. Professional online presence. Minor concerns
                (traffic violations, single late payment) are not disqualifying and have appropriate context. Applicant demonstrates excellent
                character, integrity, and professionalism suitable for deputy sheriff role.
              </p>
            </div>

            {/* Strengths */}
            <div className="bg-slate-900/40 rounded-xl p-4 mb-4">
              <h4 className="text-sm font-semibold text-green-400 mb-3 border-b border-green-500/20 pb-2">STRENGTHS IDENTIFIED</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-medium text-white mb-2">1. CLEAN CRIMINAL RECORD:</p>
                  <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1 ml-3">
                    <li>└─ No criminal convictions, arrests, or warrants</li>
                    <li>└─ GCIC and FBI NCIC checks: Clear</li>
                    <li>└─ Meets POST standards for law enforcement</li>
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-medium text-white mb-2">2. PROVEN LAW ENFORCEMENT EXPERIENCE:</p>
                  <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1 ml-3">
                    <li>└─ 7 years sworn law enforcement (Metro Atlanta PD)</li>
                    <li>└─ Current position: Patrol Officer (Zone 3)</li>
                    <li>└─ Active Georgia POST certification (verified)</li>
                    <li>└─ No disciplinary issues (per supervisor)</li>
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-medium text-white mb-2">3. EXCELLENT SUPERVISORY REFERENCES:</p>
                  <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1 ml-3">
                    <li>└─ Current supervisor: Strongly recommends ("top 25%")</li>
                    <li>└─ Former supervisor: Recommends for hire</li>
                    <li>└─ Both describe: Professional, reliable, good judgment</li>
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-medium text-white mb-2">4. STABLE EMPLOYMENT HISTORY:</p>
                  <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1 ml-3">
                    <li>└─ Continuous employment since 2012 (12+ years)</li>
                    <li>└─ Career progression: Security → Supervisor → Sworn LE</li>
                    <li>└─ All employers would rehire (100%)</li>
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-medium text-white mb-2">5. RESPONSIBLE FINANCIAL MANAGEMENT:</p>
                  <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1 ml-3">
                    <li>└─ Credit score 742 (Good, above 650 minimum)</li>
                    <li>└─ Debt-to-income 34% (manageable, under 50%)</li>
                    <li>└─ No bankruptcies, foreclosures, or collections</li>
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-medium text-white mb-2">6. PROFESSIONAL ONLINE PRESENCE:</p>
                  <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1 ml-3">
                    <li>└─ 142 public posts reviewed (last 5 years)</li>
                    <li>└─ Content: LE-related, community engagement</li>
                    <li>└─ No concerning behavior or associations</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Minor Concerns */}
            <div className="bg-slate-900/40 rounded-xl p-4 mb-4">
              <h4 className="text-sm font-semibold text-amber-400 mb-3 border-b border-amber-500/20 pb-2">MINOR CONCERNS (NON-DISQUALIFYING)</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-medium text-white mb-2">1. TRAFFIC VIOLATIONS:</p>
                  <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1 ml-3">
                    <li>└─ 2 minor speeding tickets (2019: 15 mph over, 2021: 12 over)</li>
                    <li>└─ Both paid/closed, no license suspensions</li>
                    <li>└─ Disclosed by applicant (demonstrates honesty)</li>
                    <li>└─ Assessment: Minor, infrequent (acceptable for LE)</li>
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-medium text-white mb-2">2. CREDIT - SINGLE LATE PAYMENT:</p>
                  <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1 ml-3">
                    <li>└─ 1 late payment (April 2020, credit card, 30 days)</li>
                    <li>└─ Context: During COVID-19 pandemic period</li>
                    <li>└─ Resolution: Caught up immediately, no other lates</li>
                    <li>└─ Assessment: Understandable context, not concerning</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Mitigating Factors */}
            <div className="bg-slate-900/40 rounded-xl p-4 mb-4">
              <h4 className="text-sm font-semibold text-blue-400 mb-3 border-b border-blue-500/20 pb-2">MITIGATING FACTORS & CONTEXT</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-medium text-white mb-2">TRAFFIC VIOLATIONS:</p>
                  <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1">
                    <li>• Minor violations: 15 mph and 12 mph over (not excessive)</li>
                    <li>• Infrequent: 2 tickets over 7 years (not pattern)</li>
                    <li>• Disclosed: Applicant disclosed before being asked (honesty)</li>
                    <li>• Context: Common among general public, not LE disqualifier</li>
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-medium text-white mb-2">LATE PAYMENT:</p>
                  <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1">
                    <li>• Single occurrence: Only 1 late payment in entire credit history</li>
                    <li>• Pandemic timing: April 2020 (COVID-19 economic impact)</li>
                    <li>• Immediate resolution: Caught up same month, no recurrence</li>
                    <li>• Strong recovery: 742 credit score demonstrates responsibility</li>
                  </ul>
                </div>
                <div className="md:col-span-2">
                  <p className="text-xs font-medium text-white mb-2">CURRENT SUPERVISOR ENDORSEMENT:</p>
                  <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1">
                    <li>• Strong recommendation: Sgt. Davis "strongly recommends"</li>
                    <li>• Performance rating: "Above average - top 25% of officers"</li>
                    <li>• Character assessment: "Excellent judgment, professional"</li>
                    <li>• Would welcome back: "Absolutely, with open arms"</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Standards Compliance */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="bg-slate-900/40 rounded-xl p-4">
                <h4 className="text-sm font-semibold text-purple-400 mb-3">POST STANDARDS COMPLIANCE</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-slate-700 dark:text-slate-300">No disqualifying criminal convictions</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-slate-700 dark:text-slate-300">No domestic violence convictions</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-slate-700 dark:text-slate-300">No sex offenses</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-slate-700 dark:text-slate-300">No drug trafficking convictions</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-slate-700 dark:text-slate-300">Active POST certification (verified)</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-slate-700 dark:text-slate-300">Meets character and fitness standards</span>
                  </div>
                </div>
              </div>
              <div className="bg-slate-900/40 rounded-xl p-4">
                <h4 className="text-sm font-semibold text-purple-400 mb-3">AGENCY POLICY STANDARDS COMPLIANCE</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-slate-700 dark:text-slate-300">Credit score above 650 minimum (742)</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-slate-700 dark:text-slate-300">No bankruptcies (last 2 years)</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-slate-700 dark:text-slate-300">No foreclosures (last 3 years)</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-slate-700 dark:text-slate-300">Debt-to-income under 50% (34%)</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-slate-700 dark:text-slate-300">No excessive collections (none)</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-slate-700 dark:text-slate-300">Professional references obtained (2 supervisory)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Investigator Recommendation */}
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 mb-4">
              <h4 className="text-sm font-semibold text-green-400 mb-3 border-b border-green-500/20 pb-2">INVESTIGATOR RECOMMENDATION</h4>
              <div className="mb-3">
                <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-lg text-sm font-bold">RECOMMENDATION: APPROVE FOR HIRE</span>
              </div>
              <div className="mb-3">
                <p className="text-xs font-medium text-white mb-2">RATIONALE:</p>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  Applicant meets all POST standards and agency policy requirements for deputy sheriff position. No disqualifying factors identified.
                  Proven law enforcement experience (7 years sworn). Excellent supervisory references from current and former supervisors at
                  Metro Atlanta PD. Strong character and professional reputation. Minor concerns (traffic violations, single late payment) are
                  non-disqualifying and have appropriate context. Credit score (742) demonstrates financial responsibility. Clean criminal
                  record. Professional online presence. No concerns regarding fitness for duty, character, or integrity.
                </p>
              </div>
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3 mb-3">
                <p className="text-xs font-medium text-amber-400 mb-1">CONTINGENCY:</p>
                <p className="text-xs text-amber-200">
                  Final clearance is contingent upon completion of Internal Affairs review from Metro Atlanta Police Department (mandatory for
                  lateral transfers per POST requirements). IA review expected February 3-7, 2026. Assuming IA clearance with no disqualifying
                  findings, recommend approval for hire.
                </p>
              </div>
              <div className="border-t border-green-500/20 pt-3 text-xs text-slate-600 dark:text-slate-400">
                <p>Prepared by: {caseData.investigator} (Badge #{caseData.investigatorBadge})</p>
                <p>Date: {caseData.investigationCompleted}</p>
                <p>Supervisor Review: {caseData.supervisorReviewer} (Approved {caseData.investigationCompleted})</p>
              </div>
            </div>

            {/* Supervisor Concurrence */}
            <div className="bg-slate-900/40 rounded-xl p-4">
              <h4 className="text-sm font-semibold text-purple-400 mb-3">SUPERVISOR CONCURRENCE</h4>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
                I have reviewed the complete background investigation file for Robert Martinez ({caseData.caseId}) and concur with the investigator's
                findings and recommendation. Applicant meets all POST standards and agency policy requirements. Recommend approval for hire
                contingent upon completion of Internal Affairs review from Metro Atlanta Police Department. No concerns identified that would
                preclude employment as deputy sheriff.
              </p>
              <div className="text-xs text-slate-600 dark:text-slate-400">
                <p>Approved by: {caseData.supervisorReviewer}</p>
                <p>Date: {caseData.investigationCompleted}</p>
              </div>
            </div>
          </div>

          {/* Final Disposition Form */}
          <div className="bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">FINAL CASE DISPOSITION</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">To be completed by Hiring Authority</p>

            {/* Disposition Selection */}
            <div className="mb-6">
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">SELECT FINAL DISPOSITION:</p>
              <div className="space-y-3">
                <label className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-colors ${selectedDisposition === 'approve' ? 'bg-green-500/10 border-green-500/30' : 'bg-slate-900/40 border-slate-700/50 hover:border-slate-600/50'}`}>
                  <input
                    type="radio"
                    name="disposition"
                    value="approve"
                    checked={selectedDisposition === 'approve'}
                    onChange={(e) => setSelectedDisposition(e.target.value)}
                    className="mt-1"
                  />
                  <div>
                    <p className="text-sm font-medium text-green-400">APPROVE FOR HIRE</p>
                    <p className="text-xs text-slate-600 dark:text-slate-400">Applicant recommended for hire (contingent offer approved)</p>
                    <p className="text-xs text-slate-500 mt-1">Requires: IA clearance, drug screen, physical, polygraph</p>
                  </div>
                </label>

                <label className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-colors ${selectedDisposition === 'reject' ? 'bg-red-500/10 border-red-500/30' : 'bg-slate-900/40 border-slate-700/50 hover:border-slate-600/50'}`}>
                  <input
                    type="radio"
                    name="disposition"
                    value="reject"
                    checked={selectedDisposition === 'reject'}
                    onChange={(e) => setSelectedDisposition(e.target.value)}
                    className="mt-1"
                  />
                  <div>
                    <p className="text-sm font-medium text-red-400">REJECT - DISQUALIFYING FACTORS</p>
                    <p className="text-xs text-slate-600 dark:text-slate-400">Applicant not recommended due to disqualifying factors</p>
                    <p className="text-xs text-slate-500 mt-1">Requires: Specific disqualification reason (select below)</p>
                  </div>
                </label>

                <label className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-colors ${selectedDisposition === 'return' ? 'bg-amber-500/10 border-amber-500/30' : 'bg-slate-900/40 border-slate-700/50 hover:border-slate-600/50'}`}>
                  <input
                    type="radio"
                    name="disposition"
                    value="return"
                    checked={selectedDisposition === 'return'}
                    onChange={(e) => setSelectedDisposition(e.target.value)}
                    className="mt-1"
                  />
                  <div>
                    <p className="text-sm font-medium text-amber-400">RETURN FOR ADDITIONAL INVESTIGATION</p>
                    <p className="text-xs text-slate-600 dark:text-slate-400">Require additional checks, clarification, or follow-up</p>
                    <p className="text-xs text-slate-500 mt-1">Requires: Specific areas for additional investigation</p>
                  </div>
                </label>
              </div>
            </div>

            {/* Rejection Reasons (shown if reject selected) */}
            {selectedDisposition === 'reject' && (
              <div className="mb-6 p-4 bg-red-500/5 border border-red-500/20 rounded-xl">
                <p className="text-sm font-medium text-red-400 mb-3">IF REJECTING, SELECT DISQUALIFICATION REASON:</p>
                <p className="text-xs text-slate-600 dark:text-slate-400 mb-3">(Required for adverse action notice per FCRA)</p>
                <div className="space-y-2">
                  {[
                    { value: 'criminal', label: 'Criminal history' },
                    { value: 'financial', label: 'Financial issues', note: '⚠️ Requires FCRA adverse action notice' },
                    { value: 'employment', label: 'Employment verification issues' },
                    { value: 'reference', label: 'Reference check concerns' },
                    { value: 'disclosure', label: 'Failed to disclose information' },
                    { value: 'other', label: 'Other' }
                  ].map((reason) => (
                    <label key={reason.value} className="flex items-start gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="rejectReason"
                        value={reason.value}
                        checked={rejectReason === reason.value}
                        onChange={(e) => setRejectReason(e.target.value)}
                        className="mt-0.5"
                      />
                      <div>
                        <span className="text-sm text-slate-700 dark:text-slate-300">{reason.label}</span>
                        {reason.note && <span className="text-xs text-amber-400 ml-2">{reason.note}</span>}
                      </div>
                    </label>
                  ))}
                </div>
                {rejectReason && (
                  <div className="mt-3">
                    <label className="text-xs text-slate-600 dark:text-slate-400 mb-1 block">Specify details:</label>
                    <input
                      type="text"
                      value={rejectDetails}
                      onChange={(e) => setRejectDetails(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-800/40 border border-slate-700/50 rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:border-red-500/50"
                      placeholder="Enter specific concern..."
                    />
                  </div>
                )}
              </div>
            )}

            {/* Disposition Rationale */}
            <div className="mb-6">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">DISPOSITION RATIONALE:</label>
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">(Required - explain basis for decision)</p>
              <textarea
                value={dispositionRationale}
                onChange={(e) => setDispositionRationale(e.target.value)}
                rows={4}
                className="w-full px-4 py-3 bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-700/50 rounded-xl text-white text-sm placeholder-slate-500 focus:outline-none focus:border-purple-500/50 resize-none"
                placeholder="Enter detailed rationale for this disposition decision..."
              />
            </div>

            {/* Hiring Authority Approval */}
            <div className="mb-6 p-4 bg-slate-900/40 rounded-xl">
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">HIRING AUTHORITY APPROVAL:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-slate-600 dark:text-slate-400 mb-1 block">Name:</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 bg-slate-800/40 border border-slate-700/50 rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:border-purple-500/50"
                    placeholder="Enter name..."
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-600 dark:text-slate-400 mb-1 block">Title:</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 bg-slate-800/40 border border-slate-700/50 rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:border-purple-500/50"
                    placeholder="Enter title..."
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-600 dark:text-slate-400 mb-1 block">Date:</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 bg-slate-800/40 border border-slate-700/50 rounded-lg text-white text-sm focus:outline-none focus:border-purple-500/50"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-600 dark:text-slate-400 mb-1 block">Digital Signature:</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 bg-slate-800/40 border border-slate-700/50 rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:border-purple-500/50"
                    placeholder="Type name to sign..."
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 mb-6">
              <button className="px-6 py-2.5 bg-purple-500 hover:bg-purple-600 text-white rounded-xl text-sm font-medium transition-colors">
                Submit Final Disposition
              </button>
              <button className="px-6 py-2.5 bg-slate-700/50 hover:bg-slate-700/70 text-slate-700 dark:text-slate-300 rounded-xl text-sm font-medium transition-colors">
                Save Draft
              </button>
              <button className="px-6 py-2.5 bg-slate-700/50 hover:bg-slate-700/70 text-slate-700 dark:text-slate-300 rounded-xl text-sm font-medium transition-colors">
                Cancel
              </button>
            </div>

            {/* Important Notes */}
            <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="w-4 h-4 text-amber-400" />
                <span className="text-sm font-medium text-amber-400">IMPORTANT NOTES:</span>
              </div>
              <ul className="text-xs text-amber-200 space-y-2">
                <li>• If <strong>APPROVING</strong>: Case will be closed and applicant will receive contingent offer letter. Final clearance requires IA review.</li>
                <li>• If <strong>REJECTING</strong> based on credit/background: FCRA requires adverse action notice. System will generate notice automatically.</li>
                <li>• If <strong>RETURNING</strong> for additional investigation: Case will remain open and assigned investigator will be notified.</li>
              </ul>
            </div>
          </div>
      </div>
    </DashboardLayout>
  );
}

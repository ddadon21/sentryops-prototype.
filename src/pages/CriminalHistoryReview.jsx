import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import {
  Shield,
  AlertTriangle,
  CheckCircle2,
  Clock,
  FileText,
  Search,
  Download,
  Plus,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  ChevronLeft,
  User,
  Calendar,
  ExternalLink,
  Lock,
  Eye,
  Fingerprint,
  Scale,
  Gavel,
  FileCheck,
  XCircle,
  HelpCircle,
  BookOpen,
  PhoneCall,
  History,
  LayoutDashboard,
  FolderOpen,
  UserCheck,
  TrendingUp,
  DollarSign,
  Activity,
  Settings,
  Bell,
  Menu,
  LogOut,
  Printer,
  ClipboardList,
  Flag,
  Car,
  CheckCircle
} from 'lucide-react';
import DashboardLayout from '../layouts/DashboardLayout';
import { biNavigation, biProfile, biNotifications } from '../config/biConfig';

export default function CriminalHistoryReview() {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState('criminal-history');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [logoutConfirmOpen, setLogoutConfirmOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [expandedCheck, setExpandedCheck] = useState('check-1');
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
    { id: 'criminal-history', label: 'Criminal History Review', icon: AlertTriangle },
    { id: 'financial-background', label: 'Financial Background', icon: DollarSign, page: 'FinancialBackground' },
    { id: 'social-media', label: 'Social Media Analysis', icon: Eye, page: 'SocialMediaAnalysis' },
    { id: 'bi-reports', label: 'BI Reports', icon: Activity, page: 'BIReports' },
    { id: 'case-closure', label: 'Case Closure', icon: XCircle, page: 'CaseClosure' }
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

  const notifications = [
    { id: 1, title: 'GCIC Results Received', message: 'Maria Rodriguez - Results ready for review', time: '2 hours ago', urgent: false },
    { id: 2, title: 'Supervisor Review Required', message: 'James Wilson - Arrest record requires review', time: '1 day ago', urgent: true },
    { id: 3, title: 'Check Completed', message: 'Robert Martinez - All clear', time: '3 days ago', urgent: false }
  ];

  // Comprehensive criminal background check records
  const criminalChecks = [
    {
      id: 'check-1',
      subject: 'Robert Martinez',
      caseId: 'BI-2024-145',
      position: 'Deputy Sheriff Applicant',
      status: 'Clear',
      checkDate: '2024-10-18',
      fingerprintsSubmitted: '2024-10-15',
      resultsReceived: '2024-10-18',
      reviewedBy: 'Agent Brooks',
      reviewerBadge: 'BI-107',
      reviewDate: '2024-10-18',
      gcic: { status: 'Clear', submitted: '2024-10-15', received: '2024-10-17', details: 'No criminal records in Georgia' },
      fbiNcic: { status: 'Clear', submitted: '2024-10-15', received: '2024-10-18', details: 'No federal or out-of-state criminal records' },
      stateChecks: [{ state: 'Georgia', status: 'Clear', via: 'GCIC' }],
      countyChecks: [
        { county: 'Gwinnett County', status: 'Clear', details: 'No criminal records' },
        { county: 'Fulton County', status: 'Clear', details: 'No criminal records' }
      ],
      federalCourt: { status: 'Clear', district: 'Northern District of Georgia', details: 'No federal cases found' },
      sexOffenderRegistry: { national: 'Clear', state: 'Clear', details: 'Not a registered sex offender' },
      warrants: 'None',
      arrests: 'None',
      convictions: 'None',
      traffic: {
        violations: [
          { date: '2019-10-15', type: 'Speeding', details: '15 mph over, paid, closed' },
          { date: '2021-03-22', type: 'Speeding', details: '12 mph over, paid, closed' }
        ],
        dui: 'None',
        suspensions: 'None',
        assessment: 'Minor traffic violations (non-disqualifying)'
      },
      postAssessment: {
        felonyConvictions: { status: 'Pass', note: 'No felony convictions' },
        domesticViolence: { status: 'Pass', note: 'No DV convictions' },
        sexOffenses: { status: 'Pass', note: 'No sex offenses' },
        drugTrafficking: { status: 'Pass', note: 'No drug trafficking convictions' },
        moralTurpitude: { status: 'Pass', note: 'No crimes involving moral turpitude' },
        trafficViolations: { status: 'Pass', note: 'Minor violations (non-disqualifying)' },
        overallResult: 'Pass',
        meetsPostStandards: true
      },
      investigatorAssessment: 'Comprehensive background check completed. No criminal history found. GCIC and FBI NCIC both returned clear. County and federal checks clear. Two minor traffic violations (speeding) disclosed by applicant and verified - non-disqualifying. No POST concerns. Clean criminal record. Recommend approval.',
      cjisAccessLog: [
        { date: '2024-10-15', action: 'Fingerprints submitted', by: 'Agent Brooks' },
        { date: '2024-10-18', action: 'Results received and reviewed', by: 'Agent Brooks' },
        { date: '2024-01-27', action: 'Case review access', by: 'BI Supervisor' }
      ]
    },
    {
      id: 'check-2',
      subject: 'Sarah Chen',
      caseId: 'BI-2024-143',
      position: 'Deputy Sheriff Applicant',
      status: 'Clear',
      checkDate: '2024-10-20',
      fingerprintsSubmitted: '2024-10-17',
      resultsReceived: '2024-10-20',
      reviewedBy: 'Investigator Davis',
      reviewerBadge: 'BI-109',
      reviewDate: '2024-10-20',
      gcic: { status: 'Clear', submitted: '2024-10-17', received: '2024-10-19', details: 'No criminal records in Georgia' },
      fbiNcic: { status: 'Clear', submitted: '2024-10-17', received: '2024-10-20', details: 'No federal or out-of-state criminal records' },
      stateChecks: [{ state: 'Georgia', status: 'Clear', via: 'GCIC' }],
      countyChecks: [{ county: 'Gwinnett County', status: 'Clear', details: 'No criminal records' }],
      federalCourt: { status: 'Clear', district: 'Northern District of Georgia', details: 'No federal cases found' },
      sexOffenderRegistry: { national: 'Clear', state: 'Clear', details: 'Not a registered sex offender' },
      warrants: 'None',
      arrests: 'None',
      convictions: 'None',
      traffic: {
        violations: [{ date: '2020-06-10', type: 'Parking', details: 'Parking ticket, paid, closed' }],
        dui: 'None',
        suspensions: 'None',
        assessment: 'Minor parking violation (non-disqualifying)'
      },
      postAssessment: {
        felonyConvictions: { status: 'Pass', note: 'No felony convictions' },
        domesticViolence: { status: 'Pass', note: 'No DV convictions' },
        sexOffenses: { status: 'Pass', note: 'No sex offenses' },
        drugTrafficking: { status: 'Pass', note: 'No drug trafficking convictions' },
        moralTurpitude: { status: 'Pass', note: 'No crimes involving moral turpitude' },
        trafficViolations: { status: 'Pass', note: 'Minor parking ticket (non-disqualifying)' },
        overallResult: 'Pass',
        meetsPostStandards: true
      },
      investigatorAssessment: 'No criminal records found. Excellent background. Clean record. No POST concerns. Recommend approval.',
      cjisAccessLog: [
        { date: '2024-10-17', action: 'Fingerprints submitted', by: 'Investigator Davis' },
        { date: '2024-10-20', action: 'Results received and reviewed', by: 'Investigator Davis' }
      ]
    },
    {
      id: 'check-3',
      subject: 'James Wilson',
      caseId: 'BI-2024-141',
      position: 'Deputy Sheriff Applicant',
      status: 'Review Required',
      checkDate: '2024-10-22',
      fingerprintsSubmitted: '2024-10-19',
      resultsReceived: '2024-10-22',
      reviewedBy: 'Agent Brooks',
      reviewerBadge: 'BI-107',
      reviewDate: '2024-10-22',
      gcic: { status: 'Clear', submitted: '2024-10-19', received: '2024-10-21', details: 'No criminal convictions in Georgia' },
      fbiNcic: { status: 'Clear', submitted: '2024-10-19', received: '2024-10-22', details: 'No federal or out-of-state records' },
      stateChecks: [{ state: 'Georgia', status: 'Clear', via: 'GCIC' }],
      countyChecks: [
        { county: 'Fulton County', status: 'Flag', details: '1 arrest found - see arrest record' },
        { county: 'Gwinnett County', status: 'Clear', details: 'No criminal records' }
      ],
      federalCourt: { status: 'Clear', district: 'Northern District of Georgia', details: 'No federal cases found' },
      sexOffenderRegistry: { national: 'Clear', state: 'Clear', details: 'Not a registered sex offender' },
      warrants: 'None',
      arrests: [{
        date: '2015-09-12',
        agency: 'Georgia State University Police Department',
        location: 'Atlanta, Georgia (Fulton County)',
        charge: 'Disorderly Conduct (misdemeanor)',
        caseNumber: '15-CR-12345',
        court: 'Fulton County State Court',
        disposition: 'CHARGES DISMISSED',
        dispositionDate: '2015-10-15',
        dismissalReason: 'Prosecutorial discretion',
        subjectAge: 21,
        context: 'College student at Georgia State University',
        incidentDetails: 'Disorderly conduct at college party',
        violence: false,
        injuries: false,
        timeSinceIncident: '9 years'
      }],
      convictions: 'None',
      traffic: {
        violations: [
          { date: '2016-04-10', type: 'Speeding', details: 'Paid, closed' },
          { date: '2018-08-22', type: 'Speeding', details: 'Paid, closed' },
          { date: '2020-02-15', type: 'Speeding', details: 'Paid, closed' }
        ],
        dui: 'None',
        suspensions: 'None',
        assessment: 'Multiple speeding tickets (non-disqualifying)'
      },
      postAssessment: {
        felonyConvictions: { status: 'Pass', note: 'No felony convictions' },
        domesticViolence: { status: 'Pass', note: 'No DV convictions' },
        sexOffenses: { status: 'Pass', note: 'No sex offenses' },
        drugTrafficking: { status: 'Pass', note: 'No drug trafficking convictions' },
        moralTurpitude: { status: 'Review', note: 'Misdemeanor arrest with dismissed charges - requires supervisor review' },
        trafficViolations: { status: 'Pass', note: 'Multiple speeding tickets (non-disqualifying)' },
        overallResult: 'Pending Supervisor Review',
        meetsPostStandards: null,
        supervisorDecisionRequired: true,
        policyQuestion: 'Does a single dismissed misdemeanor charge from 9 years ago (age 21, college incident) disqualify applicant under agency policy? POST standards allow hiring (no conviction). Decision is agency discretion.'
      },
      investigatorAssessment: 'Single arrest from 2015 for disorderly conduct at college when subject was 21 years old. Charges were dismissed within one month (no conviction). This was 9 years ago. No other arrests or criminal issues since. Subject has had clean record for 9 years. Charges were dismissed (not convicted). Does not appear disqualifying. However, supervisor must make final policy determination per agency standards. Recommend supervisor approval.',
      investigatorRecommendation: 'Approve',
      pendingSupervisorReview: true,
      cjisAccessLog: [
        { date: '2024-10-19', action: 'Fingerprints submitted', by: 'Agent Brooks' },
        { date: '2024-10-22', action: 'Results received and reviewed', by: 'Agent Brooks' },
        { date: '2024-10-22', action: 'Flagged for supervisor review', by: 'Agent Brooks' }
      ]
    },
    {
      id: 'check-4',
      subject: 'Maria Rodriguez',
      caseId: 'BI-2024-138',
      position: 'Deputy Sheriff Applicant',
      status: 'In Progress',
      checkDate: '2024-11-01',
      fingerprintsSubmitted: '2024-11-01',
      resultsReceived: null,
      reviewedBy: null,
      reviewerBadge: null,
      reviewDate: null,
      fingerprintDetails: {
        submissionDate: '2024-11-01',
        submissionTime: '9:00 AM',
        method: 'LiveScan (electronic)',
        quality: 'Acceptable (all 10 prints captured)',
        trackingNumber: 'LS-2024-138-001'
      },
      gcic: { status: 'Pending', submitted: '2024-11-01', received: null, expectedTurnaround: '24-48 hours', expectedDate: 'Nov 2-3, 2024' },
      fbiNcic: { status: 'Pending', submitted: '2024-11-01', received: null, expectedTurnaround: '48-72 hours', expectedDate: 'Nov 2-4, 2024' },
      stateChecks: [],
      countyChecks: [],
      federalCourt: { status: 'Pending' },
      sexOffenderRegistry: { national: 'Pending', state: 'Pending' },
      warrants: 'Pending',
      arrests: 'Pending',
      convictions: 'Pending',
      traffic: { violations: [], assessment: 'Pending driving record request' },
      postAssessment: null,
      investigatorAssessment: 'Background check initiated Nov 1, 2024. Fingerprints submitted via LiveScan (electronic). GCIC and FBI checks pending. Results expected within 24-48 hours (GCIC) and 48-72 hours (FBI). Will review results upon receipt and complete criminal history assessment. No prior information suggesting concerns.',
      nextActions: [
        { action: 'Monitor for GCIC results', expected: 'Nov 2-3, 2024' },
        { action: 'Monitor for FBI results', expected: 'Nov 2-4, 2024' },
        { action: 'If delayed: Contact GCIC/FBI for status update', expected: 'Nov 5, 2024' },
        { action: 'Upon receipt: Review results and complete assessment', expected: 'Upon receipt' }
      ],
      cjisAccessLog: [{ date: '2024-11-01', action: 'Fingerprints submitted', by: 'Agent Brooks' }]
    }
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Clear':
        return <span className="px-2.5 py-1 bg-green-500/10 text-green-400 rounded-lg text-xs font-medium flex items-center gap-1.5"><CheckCircle2 className="w-3 h-3" />Clear</span>;
      case 'Review Required':
        return <span className="px-2.5 py-1 bg-amber-500/10 text-amber-400 rounded-lg text-xs font-medium flex items-center gap-1.5"><AlertTriangle className="w-3 h-3" />Review Required</span>;
      case 'In Progress':
        return <span className="px-2.5 py-1 bg-blue-500/10 text-blue-400 rounded-lg text-xs font-medium flex items-center gap-1.5"><Clock className="w-3 h-3" />In Progress</span>;
      case 'Pass':
        return <span className="px-2 py-0.5 bg-green-500/10 text-green-400 rounded text-xs">Pass</span>;
      case 'Review':
        return <span className="px-2 py-0.5 bg-amber-500/10 text-amber-400 rounded text-xs">Review</span>;
      case 'Flag':
        return <span className="text-red-400 text-xs flex items-center gap-1"><Flag className="w-3 h-3" />Flag</span>;
      case 'Pending':
        return <span className="text-blue-400 text-xs flex items-center gap-1"><Clock className="w-3 h-3" />Pending</span>;
      default:
        return <span className="text-green-400 text-xs flex items-center gap-1"><CheckCircle2 className="w-3 h-3" />Clear</span>;
    }
  };

  const filteredChecks = criminalChecks.filter(check => {
    if (activeTab === 'clear') return check.status === 'Clear';
    if (activeTab === 'review') return check.status === 'Review Required';
    if (activeTab === 'progress') return check.status === 'In Progress';
    return true;
  });

  const stats = {
    total: criminalChecks.length,
    clear: criminalChecks.filter(c => c.status === 'Clear').length,
    review: criminalChecks.filter(c => c.status === 'Review Required').length,
    inProgress: criminalChecks.filter(c => c.status === 'In Progress').length
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <DashboardLayout
      navigation={biNavigation}
      profile={biProfile}
      notifications={biNotifications}
      settingsRoute="/bi/settings"
    >
      <div className="p-5 lg:p-8 space-y-8 bg-slate-100 dark:bg-transparent min-h-full">
          <div className="space-y-6">
            {/* Page Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">Criminal History Review</h1>
                <p className="text-slate-600 dark:text-slate-400 mt-1">Comprehensive criminal background checks - GCIC, FBI, State, County, Federal</p>
              </div>
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-700 transition-colors"><History className="w-4 h-4" />CJIS Audit Log</button>
                <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-700 transition-colors"><Download className="w-4 h-4" />Export Report</button>
                <button className="flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-500 transition-colors"><Plus className="w-4 h-4" />Request New Check</button>
              </div>
            </div>

            {/* CJIS Restricted Access Warning */}
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-red-500/20 rounded-lg"><Lock className="w-5 h-5 text-red-400" /></div>
                <div className="flex-1">
                  <h3 className="text-red-400 font-medium flex items-center gap-2">CJIS RESTRICTED ACCESS<span className="px-2 py-0.5 bg-red-500/20 text-red-300 rounded text-xs">Criminal Justice Information System</span></h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">All access to criminal history records is logged and auditable per <span className="text-red-400 font-medium">28 CFR Part 20</span>. Unauthorized disclosure is a federal crime. Access restricted to authorized law enforcement personnel only.</p>
                  <div className="flex items-center gap-4 mt-3 text-xs">
                    <span className="text-slate-500">Active Investigator: Agent Brooks (BI-107)</span>
                    <span className="text-slate-600">•</span>
                    <span className="text-slate-500">Monday, January 27, 2026 at 11:11 PM EST</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Statistics Grid */}
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/50 rounded-xl shadow-sm dark:shadow-none p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-slate-800 rounded-lg"><Shield className="w-5 h-5 text-slate-600 dark:text-slate-400" /></div>
                  <div><p className="text-2xl font-semibold text-slate-900 dark:text-white">{stats.total}</p><p className="text-slate-500 text-sm">Total Checks</p></div>
                </div>
              </div>
              <div className="bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/50 rounded-xl shadow-sm dark:shadow-none p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-500/10 rounded-lg"><CheckCircle2 className="w-5 h-5 text-green-400" /></div>
                  <div><p className="text-2xl font-semibold text-slate-900 dark:text-white">{stats.clear}</p><p className="text-slate-500 text-sm">Clear - No Disqualifiers</p></div>
                </div>
              </div>
              <div className="bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/50 rounded-xl shadow-sm dark:shadow-none p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-amber-500/10 rounded-lg"><AlertTriangle className="w-5 h-5 text-amber-400" /></div>
                  <div><p className="text-2xl font-semibold text-slate-900 dark:text-white">{stats.review}</p><p className="text-slate-500 text-sm">Review Required</p></div>
                </div>
              </div>
              <div className="bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/50 rounded-xl shadow-sm dark:shadow-none p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-500/10 rounded-lg"><Clock className="w-5 h-5 text-blue-400" /></div>
                  <div><p className="text-2xl font-semibold text-slate-900 dark:text-white">{stats.inProgress}</p><p className="text-slate-500 text-sm">In Progress</p></div>
                </div>
              </div>
            </div>

            {/* Standard Protocol */}
            <div className="bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/50 rounded-xl shadow-sm dark:shadow-none p-4">
              <h3 className="text-slate-900 dark:text-white font-medium mb-3 flex items-center gap-2"><ClipboardList className="w-5 h-5 text-amber-400" />Standard Background Check Protocol</h3>
              <div className="grid grid-cols-4 gap-4 text-sm">
                <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-400" /><span className="text-slate-600 dark:text-slate-400">GCIC (Georgia Crime Information)</span></div>
                <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-400" /><span className="text-slate-600 dark:text-slate-400">FBI NCIC (National Crime)</span></div>
                <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-400" /><span className="text-slate-600 dark:text-slate-400">State Repositories (All 50)</span></div>
                <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-400" /><span className="text-slate-600 dark:text-slate-400">County Courts (10 Years)</span></div>
                <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-400" /><span className="text-slate-600 dark:text-slate-400">Federal Courts (PACER)</span></div>
                <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-400" /><span className="text-slate-600 dark:text-slate-400">Sex Offender Registries</span></div>
                <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-400" /><span className="text-slate-600 dark:text-slate-400">Traffic History (7 Years)</span></div>
                <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-400" /><span className="text-slate-600 dark:text-slate-400">Warrant Checks (Active)</span></div>
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-3 gap-6">
              {/* Criminal Check Cards */}
              <div className="col-span-2 space-y-4">
                <div className="flex items-center gap-2">
                  {[{ id: 'all', label: 'All Checks', count: stats.total }, { id: 'clear', label: 'Clear', count: stats.clear }, { id: 'review', label: 'Review Required', count: stats.review }, { id: 'progress', label: 'In Progress', count: stats.inProgress }].map(tab => (
                    <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${activeTab === tab.id ? 'bg-amber-500/10 text-amber-400' : 'text-slate-600 dark:text-slate-400 hover:text-slate-700 dark:text-slate-300 hover:bg-slate-800'}`}>{tab.label} ({tab.count})</button>
                  ))}
                </div>

                <div className="space-y-4">
                  {filteredChecks.map(check => (
                    <div key={check.id} className={`bg-slate-800/40 border rounded-xl overflow-hidden ${check.status === 'Review Required' ? 'border-amber-500/30' : check.status === 'In Progress' ? 'border-blue-500/30' : 'border-slate-700/50'}`}>
                      <div className="p-4 cursor-pointer" onClick={() => setExpandedCheck(expandedCheck === check.id ? null : check.id)}>
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-4">
                            <div className={`p-3 rounded-xl ${check.status === 'Clear' ? 'bg-green-500/10' : check.status === 'Review Required' ? 'bg-amber-500/10' : 'bg-blue-500/10'}`}>
                              {check.status === 'Clear' ? <CheckCircle2 className="w-6 h-6 text-green-400" /> : check.status === 'Review Required' ? <AlertTriangle className="w-6 h-6 text-amber-400" /> : <Clock className="w-6 h-6 text-blue-400" />}
                            </div>
                            <div>
                              <div className="flex items-center gap-2"><h3 className="text-slate-900 dark:text-white font-medium">{check.subject}</h3>{getStatusBadge(check.status)}</div>
                              <p className="text-slate-600 dark:text-slate-400 text-sm mt-0.5">{check.caseId} • {check.position}</p>
                              <div className="flex items-center gap-3 mt-2 text-xs text-slate-500">
                                <span className="flex items-center gap-1"><Lock className="w-3 h-3 text-red-400" />CJIS Restricted</span>
                                <span>•</span>
                                <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />Check Date: {formatDate(check.checkDate)}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">{expandedCheck === check.id ? <ChevronUp className="w-5 h-5 text-slate-500" /> : <ChevronDown className="w-5 h-5 text-slate-500" />}</div>
                        </div>
                      </div>

                      {expandedCheck === check.id && (
                        <div className="border-t border-slate-700/50 p-4 space-y-4">
                          <div className="bg-slate-900/40 rounded-lg p-3">
                            <h4 className="text-slate-600 dark:text-slate-400 text-xs font-medium mb-2">BACKGROUND CHECK SUMMARY</h4>
                            <div className="grid grid-cols-2 gap-2 text-sm">
                              <div className="flex justify-between"><span className="text-slate-500">Check date:</span><span className="text-slate-900 dark:text-white">{formatDate(check.checkDate)}</span></div>
                              <div className="flex justify-between"><span className="text-slate-500">Fingerprints submitted:</span><span className="text-slate-900 dark:text-white">{formatDate(check.fingerprintsSubmitted)}</span></div>
                              <div className="flex justify-between"><span className="text-slate-500">Results received:</span><span className="text-slate-900 dark:text-white">{check.resultsReceived ? formatDate(check.resultsReceived) : 'Pending'}</span></div>
                              {check.reviewedBy && <div className="flex justify-between"><span className="text-slate-500">Reviewed by:</span><span className="text-slate-900 dark:text-white">{check.reviewedBy} ({check.reviewerBadge})</span></div>}
                            </div>
                          </div>

                          <div className="bg-slate-900/40 rounded-lg p-3">
                            <h4 className="text-slate-600 dark:text-slate-400 text-xs font-medium mb-3 flex items-center gap-2">
                              {check.status === 'Clear' && <CheckCircle2 className="w-4 h-4 text-green-400" />}
                              {check.status === 'Review Required' && <AlertTriangle className="w-4 h-4 text-amber-400" />}
                              {check.status === 'In Progress' && <Clock className="w-4 h-4 text-blue-400" />}
                              CRIMINAL HISTORY RESULTS
                            </h4>
                            <div className="space-y-3">
                              <div className="flex items-center justify-between py-2 border-b border-slate-800"><div><p className="text-slate-900 dark:text-white text-sm">GCIC (Georgia Crime Information Center)</p><p className="text-slate-500 text-xs">{check.gcic.details || 'State criminal records'}</p></div>{getStatusBadge(check.gcic.status)}</div>
                              <div className="flex items-center justify-between py-2 border-b border-slate-800"><div><p className="text-slate-900 dark:text-white text-sm">FBI NCIC (National Crime Information Center)</p><p className="text-slate-500 text-xs">{check.fbiNcic.details || 'Federal/nationwide records'}</p></div>{getStatusBadge(check.fbiNcic.status)}</div>
                              {check.countyChecks && check.countyChecks.length > 0 && (
                                <div className="py-2 border-b border-slate-800">
                                  <p className="text-slate-900 dark:text-white text-sm mb-2">County Court Checks</p>
                                  {check.countyChecks.map((county, idx) => <div key={idx} className="flex items-center justify-between ml-4 py-1"><span className="text-slate-600 dark:text-slate-400 text-xs">{county.county}</span>{getStatusBadge(county.status)}</div>)}
                                </div>
                              )}
                              <div className="flex items-center justify-between py-2 border-b border-slate-800"><div><p className="text-slate-900 dark:text-white text-sm">Federal Court (PACER)</p><p className="text-slate-500 text-xs">{check.federalCourt.district || 'Federal criminal records'}</p></div>{getStatusBadge(check.federalCourt.status)}</div>
                              {check.sexOffenderRegistry && <div className="flex items-center justify-between py-2 border-b border-slate-800"><div><p className="text-slate-900 dark:text-white text-sm">Sex Offender Registries</p><p className="text-slate-500 text-xs">National and state registries</p></div>{getStatusBadge(check.sexOffenderRegistry.national)}</div>}
                              <div className="grid grid-cols-3 gap-4 pt-2">
                                <div><p className="text-slate-500 text-xs">Warrants</p><p className={`text-sm ${check.warrants === 'None' ? 'text-green-400' : check.warrants === 'Pending' ? 'text-blue-400' : 'text-red-400'}`}>{check.warrants}</p></div>
                                <div><p className="text-slate-500 text-xs">Arrests</p><p className={`text-sm ${check.arrests === 'None' ? 'text-green-400' : check.arrests === 'Pending' ? 'text-blue-400' : 'text-amber-400'}`}>{Array.isArray(check.arrests) ? `${check.arrests.length} found` : check.arrests}</p></div>
                                <div><p className="text-slate-500 text-xs">Convictions</p><p className={`text-sm ${check.convictions === 'None' ? 'text-green-400' : check.convictions === 'Pending' ? 'text-blue-400' : 'text-red-400'}`}>{check.convictions}</p></div>
                              </div>
                            </div>
                          </div>

                          {check.arrests && Array.isArray(check.arrests) && check.arrests.length > 0 && (
                            <div className="bg-amber-500/5 border border-amber-500/20 rounded-lg p-3">
                              <h4 className="text-amber-400 text-xs font-medium mb-3 flex items-center gap-2"><AlertTriangle className="w-4 h-4" />ARREST RECORD - REQUIRES REVIEW</h4>
                              {check.arrests.map((arrest, idx) => (
                                <div key={idx} className="space-y-2 text-sm">
                                  <div className="grid grid-cols-2 gap-2">
                                    <div><span className="text-slate-500">Date:</span><span className="text-slate-900 dark:text-white ml-2">{arrest.date}</span></div>
                                    <div><span className="text-slate-500">Agency:</span><span className="text-slate-900 dark:text-white ml-2">{arrest.agency}</span></div>
                                    <div><span className="text-slate-500">Charge:</span><span className="text-amber-400 ml-2">{arrest.charge}</span></div>
                                    <div><span className="text-slate-500">Case #:</span><span className="text-slate-900 dark:text-white ml-2">{arrest.caseNumber}</span></div>
                                    <div><span className="text-slate-500">Disposition:</span><span className="text-green-400 ml-2">{arrest.disposition}</span></div>
                                    <div><span className="text-slate-500">Age at time:</span><span className="text-slate-900 dark:text-white ml-2">{arrest.subjectAge} years old</span></div>
                                  </div>
                                  <div className="bg-slate-900/40 rounded p-2 mt-2"><p className="text-slate-600 dark:text-slate-400 text-xs"><span className="text-slate-500">Context:</span> {arrest.context}. {arrest.incidentDetails}. No violence: {arrest.violence ? 'No' : 'Yes'}. No injuries: {arrest.injuries ? 'No' : 'Yes'}. Time since incident: {arrest.timeSinceIncident}.</p></div>
                                </div>
                              ))}
                            </div>
                          )}

                          {check.traffic && check.traffic.violations && check.traffic.violations.length > 0 && (
                            <div className="bg-slate-900/40 rounded-lg p-3">
                              <h4 className="text-slate-600 dark:text-slate-400 text-xs font-medium mb-2 flex items-center gap-2"><Car className="w-4 h-4" />TRAFFIC HISTORY (Last 7 Years)</h4>
                              <div className="space-y-1">{check.traffic.violations.map((violation, idx) => <div key={idx} className="flex items-center justify-between text-sm"><span className="text-slate-600 dark:text-slate-400">{violation.type}</span><span className="text-slate-500">{violation.date}</span><span className="text-slate-600 dark:text-slate-400">{violation.details}</span></div>)}</div>
                              <div className="mt-2 pt-2 border-t border-slate-800 grid grid-cols-2 gap-2 text-xs">
                                <div><span className="text-slate-500">DUI History:</span><span className={`ml-2 ${check.traffic.dui === 'None' ? 'text-green-400' : 'text-red-400'}`}>{check.traffic.dui}</span></div>
                                <div><span className="text-slate-500">License Suspensions:</span><span className={`ml-2 ${check.traffic.suspensions === 'None' ? 'text-green-400' : 'text-red-400'}`}>{check.traffic.suspensions}</span></div>
                              </div>
                              <p className="text-slate-500 text-xs mt-2">Assessment: {check.traffic.assessment}</p>
                            </div>
                          )}

                          {check.postAssessment && (
                            <div className={`rounded-lg p-3 ${check.postAssessment.meetsPostStandards === true ? 'bg-green-500/5 border border-green-500/20' : check.postAssessment.meetsPostStandards === false ? 'bg-red-500/5 border border-red-500/20' : 'bg-amber-500/5 border border-amber-500/20'}`}>
                              <h4 className={`text-xs font-medium mb-3 flex items-center gap-2 ${check.postAssessment.meetsPostStandards === true ? 'text-green-400' : check.postAssessment.meetsPostStandards === false ? 'text-red-400' : 'text-amber-400'}`}>
                                <Scale className="w-4 h-4" />POST DISQUALIFIER ASSESSMENT
                                {check.postAssessment.supervisorDecisionRequired && <span className="px-2 py-0.5 bg-amber-500/20 text-amber-300 rounded text-xs ml-2">SUPERVISOR DECISION REQUIRED</span>}
                              </h4>
                              <div className="grid grid-cols-2 gap-2 text-sm">
                                <div className="flex items-center justify-between"><span className="text-slate-600 dark:text-slate-400">Felony Convictions:</span>{getStatusBadge(check.postAssessment.felonyConvictions.status)}</div>
                                <div className="flex items-center justify-between"><span className="text-slate-600 dark:text-slate-400">Domestic Violence:</span>{getStatusBadge(check.postAssessment.domesticViolence.status)}</div>
                                <div className="flex items-center justify-between"><span className="text-slate-600 dark:text-slate-400">Sex Offenses:</span>{getStatusBadge(check.postAssessment.sexOffenses.status)}</div>
                                <div className="flex items-center justify-between"><span className="text-slate-600 dark:text-slate-400">Drug Trafficking:</span>{getStatusBadge(check.postAssessment.drugTrafficking.status)}</div>
                                <div className="flex items-center justify-between"><span className="text-slate-600 dark:text-slate-400">Moral Turpitude:</span>{getStatusBadge(check.postAssessment.moralTurpitude.status)}</div>
                                <div className="flex items-center justify-between"><span className="text-slate-600 dark:text-slate-400">Traffic Violations:</span>{getStatusBadge(check.postAssessment.trafficViolations.status)}</div>
                              </div>
                              {check.postAssessment.policyQuestion && <div className="mt-3 pt-3 border-t border-slate-700/50"><p className="text-amber-400 text-xs font-medium mb-1">POLICY QUESTION FOR SUPERVISOR:</p><p className="text-slate-600 dark:text-slate-400 text-xs">{check.postAssessment.policyQuestion}</p></div>}
                            </div>
                          )}

                          {check.fingerprintDetails && (
                            <div className="bg-blue-500/5 border border-blue-500/20 rounded-lg p-3">
                              <h4 className="text-blue-400 text-xs font-medium mb-2 flex items-center gap-2"><Fingerprint className="w-4 h-4" />FINGERPRINT SUBMISSION</h4>
                              <div className="grid grid-cols-2 gap-2 text-sm">
                                <div><span className="text-slate-500">Submission:</span><span className="text-slate-900 dark:text-white ml-2">{check.fingerprintDetails.submissionDate} at {check.fingerprintDetails.submissionTime}</span></div>
                                <div><span className="text-slate-500">Method:</span><span className="text-slate-900 dark:text-white ml-2">{check.fingerprintDetails.method}</span></div>
                                <div><span className="text-slate-500">Quality:</span><span className="text-green-400 ml-2">{check.fingerprintDetails.quality}</span></div>
                                <div><span className="text-slate-500">Tracking #:</span><span className="text-slate-900 dark:text-white ml-2">{check.fingerprintDetails.trackingNumber}</span></div>
                              </div>
                            </div>
                          )}

                          {check.nextActions && (
                            <div className="bg-slate-900/40 rounded-lg p-3">
                              <h4 className="text-slate-600 dark:text-slate-400 text-xs font-medium mb-2">NEXT ACTIONS</h4>
                              <div className="space-y-2">{check.nextActions.map((action, idx) => <div key={idx} className="flex items-center justify-between text-sm"><span className="text-slate-600 dark:text-slate-400">{action.action}</span><span className="text-blue-400 text-xs">{action.expected}</span></div>)}</div>
                            </div>
                          )}

                          <div className="bg-slate-900/40 rounded-lg p-3">
                            <h4 className="text-slate-600 dark:text-slate-400 text-xs font-medium mb-2">INVESTIGATOR ASSESSMENT</h4>
                            <p className="text-slate-700 dark:text-slate-300 text-sm">{check.investigatorAssessment}</p>
                            {check.investigatorRecommendation && <p className="text-green-400 text-sm mt-2">Recommendation: <span className="font-medium">{check.investigatorRecommendation}</span></p>}
                          </div>

                          <div className="bg-slate-900/40 rounded-lg p-3">
                            <h4 className="text-slate-600 dark:text-slate-400 text-xs font-medium mb-2 flex items-center gap-2"><Lock className="w-3 h-3 text-red-400" />CJIS ACCESS LOG</h4>
                            <div className="space-y-1">{check.cjisAccessLog.map((log, idx) => <div key={idx} className="flex items-center gap-3 text-xs"><span className="text-slate-500 w-24">{log.date}</span><span className="text-slate-600 dark:text-slate-400 flex-1">{log.action}</span><span className="text-slate-500">{log.by}</span></div>)}</div>
                            <p className="text-red-400/60 text-xs mt-2">Protected under 28 CFR Part 20. Unauthorized disclosure is a federal crime.</p>
                          </div>

                          <div className="flex items-center gap-2 pt-2">
                            <button className="flex items-center gap-2 px-3 py-1.5 bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-sm hover:bg-slate-600 transition-colors"><FileText className="w-4 h-4" />View Full Report</button>
                            <button className="flex items-center gap-2 px-3 py-1.5 bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-sm hover:bg-slate-600 transition-colors"><Printer className="w-4 h-4" />Print Report</button>
                            {check.status === 'Review Required' && <button className="flex items-center gap-2 px-3 py-1.5 bg-amber-600 text-white rounded-lg text-sm hover:bg-amber-500 transition-colors"><AlertTriangle className="w-4 h-4" />Request Supervisor Review</button>}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-4">
                <div className="bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/50 rounded-xl shadow-sm dark:shadow-none p-4">
                  <h3 className="text-slate-900 dark:text-white font-medium mb-4 flex items-center gap-2"><Shield className="w-5 h-5 text-amber-400" />Check Status Summary</h3>
                  <div className="space-y-3">
                    <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2"><span className="text-green-400 text-sm font-medium">Clear - No Disqualifiers</span><span className="text-green-400 font-bold">{stats.clear}</span></div>
                      {criminalChecks.filter(c => c.status === 'Clear').map(c => <div key={c.id} className="text-xs text-slate-600 dark:text-slate-400 flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-green-400" />{c.subject} ({c.caseId})</div>)}
                    </div>
                    <div className="bg-amber-500/5 border border-amber-500/20 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2"><span className="text-amber-400 text-sm font-medium">Pending Supervisor Review</span><span className="text-amber-400 font-bold">{stats.review}</span></div>
                      {criminalChecks.filter(c => c.status === 'Review Required').map(c => <div key={c.id} className="text-xs text-slate-600 dark:text-slate-400"><div className="flex items-center gap-1"><AlertTriangle className="w-3 h-3 text-amber-400" />{c.subject} ({c.caseId})</div><p className="text-slate-500 ml-4">{c.arrests && Array.isArray(c.arrests) ? `${c.arrests.length} arrest (charges dismissed)` : 'Requires review'}</p></div>)}
                    </div>
                    <div className="bg-blue-500/5 border border-blue-500/20 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2"><span className="text-blue-400 text-sm font-medium">In Progress</span><span className="text-blue-400 font-bold">{stats.inProgress}</span></div>
                      {criminalChecks.filter(c => c.status === 'In Progress').map(c => <div key={c.id} className="text-xs text-slate-600 dark:text-slate-400"><div className="flex items-center gap-1"><Clock className="w-3 h-3 text-blue-400" />{c.subject} ({c.caseId})</div><p className="text-slate-500 ml-4">Expected: {c.gcic.expectedDate}</p></div>)}
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/50 rounded-xl shadow-sm dark:shadow-none p-4">
                  <h3 className="text-slate-900 dark:text-white font-medium mb-4 flex items-center gap-2"><Lock className="w-5 h-5 text-red-400" />CJIS Compliance</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-400" /><span className="text-slate-600 dark:text-slate-400">Access logging enabled</span></div>
                    <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-400" /><span className="text-slate-600 dark:text-slate-400">28 CFR Part 20 compliant</span></div>
                    <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-400" /><span className="text-slate-600 dark:text-slate-400">Authorized personnel only</span></div>
                    <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-400" /><span className="text-slate-600 dark:text-slate-400">Audit trail maintained</span></div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-slate-700/50"><button className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-sm hover:bg-slate-600 transition-colors"><History className="w-4 h-4" />View CJIS Audit Log</button></div>
                </div>

                <div className="bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/50 rounded-xl shadow-sm dark:shadow-none p-4">
                  <h3 className="text-slate-900 dark:text-white font-medium mb-4 flex items-center gap-2"><HelpCircle className="w-5 h-5 text-amber-400" />Support & Resources</h3>
                  <div className="space-y-2">
                    <a href="#" className="flex items-center gap-3 p-3 bg-slate-900/40 rounded-lg hover:bg-slate-800/60 transition-colors"><BookOpen className="w-4 h-4 text-slate-600 dark:text-slate-400" /><div><p className="text-slate-900 dark:text-white text-sm">POST Disqualifier Guide</p><p className="text-slate-500 text-xs">Georgia POST standards</p></div><ExternalLink className="w-4 h-4 text-slate-500 ml-auto" /></a>
                    <a href="#" className="flex items-center gap-3 p-3 bg-slate-900/40 rounded-lg hover:bg-slate-800/60 transition-colors"><Lock className="w-4 h-4 text-slate-600 dark:text-slate-400" /><div><p className="text-slate-900 dark:text-white text-sm">CJIS Security Policy</p><p className="text-slate-500 text-xs">28 CFR Part 20</p></div><ExternalLink className="w-4 h-4 text-slate-500 ml-auto" /></a>
                    <a href="#" className="flex items-center gap-3 p-3 bg-slate-900/40 rounded-lg hover:bg-slate-800/60 transition-colors"><PhoneCall className="w-4 h-4 text-slate-600 dark:text-slate-400" /><div><p className="text-slate-900 dark:text-white text-sm">Contact GCIC</p><p className="text-slate-500 text-xs">Georgia Crime Information Center</p></div><ExternalLink className="w-4 h-4 text-slate-500 ml-auto" /></a>
                    <a href="#" className="flex items-center gap-3 p-3 bg-slate-900/40 rounded-lg hover:bg-slate-800/60 transition-colors"><Gavel className="w-4 h-4 text-slate-600 dark:text-slate-400" /><div><p className="text-slate-900 dark:text-white text-sm">Agency Policy Manual</p><p className="text-slate-500 text-xs">Criminal history standards</p></div><ExternalLink className="w-4 h-4 text-slate-500 ml-auto" /></a>
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/50 rounded-xl shadow-sm dark:shadow-none p-4">
                  <h3 className="text-slate-900 dark:text-white font-medium mb-4 flex items-center gap-2"><History className="w-5 h-5 text-amber-400" />Recent Activity</h3>
                  <div className="space-y-3">
                    {[{ action: 'Check initiated', subject: 'Maria Rodriguez', date: '2024-11-01', by: 'Agent Brooks' }, { action: 'Flagged for review', subject: 'James Wilson', date: '2024-10-22', by: 'Agent Brooks' }, { action: 'Check completed - Clear', subject: 'Sarah Chen', date: '2024-10-20', by: 'Inv. Davis' }, { action: 'Check completed - Clear', subject: 'Robert Martinez', date: '2024-10-18', by: 'Agent Brooks' }].map((activity, index) => (
                      <div key={index} className="flex items-start gap-3"><div className="w-2 h-2 bg-amber-500 rounded-full mt-1.5"></div><div className="flex-1"><p className="text-slate-700 dark:text-slate-300 text-sm">{activity.action}</p><p className="text-slate-500 text-xs">{activity.subject}</p><p className="text-slate-600 text-xs">{activity.date} • {activity.by}</p></div></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
    </DashboardLayout>
  );
}

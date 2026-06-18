import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { formatStatus } from '@/utils/formatStatus';
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
  Scale,
  FileCheck,
  XCircle,
  HelpCircle,
  BookOpen,
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
  CreditCard,
  PiggyBank,
  Landmark,
  Building2,
  Car,
  GraduationCap,
  Home,
  Wallet,
  TrendingDown,
  AlertCircle,
  CheckCircle,
  Ban
} from 'lucide-react';
import DashboardLayout from '../layouts/DashboardLayout';
import { biNavigation, biProfile, biNotifications } from '../config/biConfig';

export default function FinancialBackground() {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState('financial-background');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [logoutConfirmOpen, setLogoutConfirmOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [expandedReport, setExpandedReport] = useState('report-1');
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
    { id: 'criminal-history', label: 'Criminal History Review', icon: AlertTriangle, page: 'CriminalHistoryReview' },
    { id: 'financial-background', label: 'Financial Background', icon: DollarSign },
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
    { id: 1, title: 'Credit Report Ready', message: 'James Wilson - Review required (high DTI)', time: '30 min ago', urgent: true },
    { id: 2, title: 'Report Complete', message: 'Sarah Chen - Excellent financial status', time: '2 hours ago', urgent: false },
    { id: 3, title: 'FCRA Compliance Reminder', message: 'Adverse action notice due in 5 days', time: '1 day ago', urgent: true }
  ];

  // Comprehensive FCRA-compliant financial records
  const financialReports = [
    {
      id: 'report-1',
      subject: 'Robert Martinez',
      caseId: 'BI-2024-145',
      position: 'Deputy Sheriff Applicant',
      status: 'Approved',
      statusCategory: 'acceptable',
      reportDate: '2024-11-01',
      creditBureau: 'Equifax',
      applicantConsent: { signed: true, date: '2024-10-15', form: 'CR-101' },
      reviewedBy: 'Agent Brooks',
      reviewerBadge: 'BI-107',
      reviewDate: '2024-11-01',
      creditScore: {
        score: 742,
        range: 'Good',
        agencyMinimum: 650,
        exceedsBy: 92
      },
      debt: {
        total: 38000,
        breakdown: [
          { type: 'Mortgage', amount: 0, note: 'No home ownership' },
          { type: 'Auto Loan', amount: 18500, note: '2022 Toyota, current' },
          { type: 'Credit Cards', amount: 8800, note: 'Total across 3 cards' },
          { type: 'Student Loans', amount: 10700, note: 'On-time payments' }
        ],
        monthlyIncome: 4800,
        debtToIncome: 34,
        creditUtilization: 23
      },
      paymentHistory: {
        onTimePercent: 98,
        latePayments: [
          { date: '2020-04-15', type: 'Credit Card', daysLate: 30, context: 'During COVID-19 pandemic period', resolution: 'Caught up immediately, no other lates' }
        ],
        assessment: 'Single late payment 4+ years ago (acceptable)'
      },
      negativeItems: {
        bankruptcies: { count: 0, status: 'None' },
        foreclosures: { count: 0, status: 'None' },
        liens: { count: 0, status: 'None' },
        judgments: { count: 0, status: 'None' },
        collections: { count: 0, status: 'None' }
      },
      accountDetails: {
        totalAccounts: 8,
        breakdown: '1 auto, 3 credit cards, 1 student loan, 3 closed accounts',
        oldestAccount: '12 years (credit card opened 2012)',
        newestAccount: '2 years (auto loan 2022)',
        averageAge: '6.5 years'
      },
      creditInquiries: {
        hardInquiries: 2,
        period: 'last 2 years',
        details: 'Auto loan (2022), Credit card (2023)',
        assessment: 'Normal inquiry pattern (acceptable)'
      },
      policyStandards: {
        creditScore: { status: 'pass', value: 742, threshold: 650 },
        bankruptcies: { status: 'pass', note: 'No active bankruptcies (last 2 years)' },
        foreclosures: { status: 'pass', note: 'No recent foreclosures (last 3 years)' },
        debtToIncome: { status: 'pass', value: 34, threshold: 50 },
        judgmentsLiens: { status: 'pass', note: 'No pattern of unpaid judgments/liens' },
        collections: { status: 'pass', note: 'No excessive collections (>$5K)' }
      },
      investigatorAssessment: 'Good credit score (742) well above minimum requirement (650). Debt-to-income ratio manageable at 34%. Single late payment from 2020 during COVID period (understandable context). No bankruptcies, foreclosures, judgments, liens, or collections. Overall: Responsible financial management. No concerns.',
      recommendation: 'Approved',
      recommendationNote: 'Applicant meets all financial responsibility standards. No financial concerns identified.',
      approvedBy: 'Agent Brooks',
      approvalDate: '2024-11-01',
      fcraAccessLog: [
        { date: '2024-11-01', action: 'Credit report requested', by: 'Agent Brooks' },
        { date: '2024-11-01', action: 'Report received and reviewed', by: 'Agent Brooks' },
        { date: '2025-01-30', action: 'Case review access', by: 'BI Supervisor' }
      ]
    },
    {
      id: 'report-2',
      subject: 'Sarah Chen',
      caseId: 'BI-2024-143',
      position: 'Deputy Sheriff Applicant',
      status: 'Approved (Excellent)',
      statusCategory: 'excellent',
      reportDate: '2024-11-08',
      creditBureau: 'Equifax',
      applicantConsent: { signed: true, date: '2024-10-20', form: 'CR-101' },
      reviewedBy: 'Investigator Davis',
      reviewerBadge: 'BI-109',
      reviewDate: '2024-11-08',
      creditScore: {
        score: 798,
        range: 'Excellent',
        agencyMinimum: 650,
        exceedsBy: 148
      },
      debt: {
        total: 18800,
        breakdown: [
          { type: 'Mortgage', amount: 0, note: 'No mortgage' },
          { type: 'Auto Loan', amount: 16200, note: '2023 Honda, current' },
          { type: 'Credit Cards', amount: 2600, note: 'Total across 2 cards, paid monthly' },
          { type: 'Student Loans', amount: 0, note: 'Paid off 2022' }
        ],
        monthlyIncome: 8400,
        debtToIncome: 24,
        creditUtilization: 6
      },
      paymentHistory: {
        onTimePercent: 100,
        latePayments: [],
        assessment: 'Perfect payment history'
      },
      negativeItems: {
        bankruptcies: { count: 0, status: 'None' },
        foreclosures: { count: 0, status: 'None' },
        liens: { count: 0, status: 'None' },
        judgments: { count: 0, status: 'None' },
        collections: { count: 0, status: 'None' }
      },
      accountDetails: {
        totalAccounts: 6,
        breakdown: '1 auto, 2 credit cards, 3 closed accounts',
        oldestAccount: '8 years (credit card opened 2016)',
        newestAccount: '1 year (auto loan 2023)',
        averageAge: '5 years'
      },
      creditInquiries: {
        hardInquiries: 1,
        period: 'last 2 years',
        details: 'Auto loan (2023)',
        assessment: 'Minimal inquiries (excellent)'
      },
      policyStandards: {
        creditScore: { status: 'pass', value: 798, threshold: 650 },
        bankruptcies: { status: 'pass', note: 'No bankruptcies' },
        foreclosures: { status: 'pass', note: 'No foreclosures' },
        debtToIncome: { status: 'pass', value: 24, threshold: 50 },
        judgmentsLiens: { status: 'pass', note: 'No judgments or liens' },
        collections: { status: 'pass', note: 'No collections' }
      },
      investigatorAssessment: 'Excellent financial health. Credit score 798 (exceptional). Very low debt-to-income ratio (24%). Perfect payment history. No negative items. Financially responsible. No concerns.',
      recommendation: 'Approved (Excellent)',
      recommendationNote: 'Exceeds all financial responsibility standards.',
      approvedBy: 'Investigator Davis',
      approvalDate: '2024-11-08',
      fcraAccessLog: [
        { date: '2024-11-08', action: 'Credit report requested', by: 'Investigator Davis' },
        { date: '2024-11-08', action: 'Report received and reviewed', by: 'Investigator Davis' },
        { date: '2025-01-30', action: 'Case review access', by: 'BI Supervisor' }
      ]
    },
    {
      id: 'report-3',
      subject: 'James Wilson',
      caseId: 'BI-2024-141',
      position: 'Deputy Sheriff Applicant',
      status: 'Conditional',
      statusCategory: 'review',
      reportDate: '2024-11-03',
      creditBureau: 'Equifax',
      applicantConsent: { signed: true, date: '2024-10-22', form: 'CR-101' },
      reviewedBy: 'Agent Brooks',
      reviewerBadge: 'BI-107',
      reviewDate: '2024-11-03',
      creditScore: {
        score: 658,
        range: 'Fair',
        agencyMinimum: 650,
        exceedsBy: 8,
        concernNote: 'Meets minimum by only 8 points'
      },
      debt: {
        total: 31800,
        breakdown: [
          { type: 'Mortgage', amount: 0, note: 'No mortgage' },
          { type: 'Auto Loan', amount: 14200, note: '2019 Ford, current' },
          { type: 'Credit Cards', amount: 9600, note: 'Maxed on 2 of 3 cards', concern: true },
          { type: 'Medical Debt', amount: 8000, note: 'Emergency surgery 2021', concern: true }
        ],
        monthlyIncome: 4200,
        debtToIncome: 76,
        debtToIncomeConcern: true,
        creditUtilization: 67,
        creditUtilizationConcern: true
      },
      paymentHistory: {
        onTimePercent: 88,
        latePayments: [
          { date: '2021-08-15', type: 'Medical Bill', daysLate: 60, context: 'Post-surgery financial stress' },
          { date: '2021-10-22', type: 'Credit Card', daysLate: 30, context: 'During medical recovery' },
          { date: '2022-02-10', type: 'Medical Bill', daysLate: 90, context: 'Disputed billing' },
          { date: '2022-05-18', type: 'Credit Card', daysLate: 30, context: 'Financial stress period' }
        ],
        assessment: 'Pattern of late payments 2021-2022 (concerning)'
      },
      negativeItems: {
        bankruptcies: { count: 0, status: 'None' },
        foreclosures: { count: 0, status: 'None' },
        liens: { count: 0, status: 'None' },
        judgments: {
          count: 1,
          status: '1 judgment',
          details: [
            { amount: 2400, creditor: 'Hospital emergency room', court: 'Fulton County State Court', filed: '2022-08-15', status: 'Unpaid' }
          ]
        },
        collections: {
          count: 2,
          status: '2 accounts ($3,100 total)',
          details: [
            { amount: 1900, originalCreditor: 'Hospital emergency room', collectionDate: '2022-03-10', status: 'Unpaid' },
            { amount: 1200, originalCreditor: 'Urgent care facility', collectionDate: '2022-06-22', status: 'Unpaid' }
          ]
        }
      },
      accountDetails: {
        totalAccounts: 7,
        breakdown: '1 auto, 3 credit cards, 3 closed accounts',
        oldestAccount: '6 years (credit card opened 2018)',
        newestAccount: '5 years (auto loan 2019)',
        averageAge: '4 years'
      },
      creditInquiries: {
        hardInquiries: 4,
        period: 'last 2 years',
        details: 'Credit cards (3), Personal loan denied (1)',
        assessment: 'Higher than normal inquiries (concerning)'
      },
      policyStandards: {
        creditScore: { status: 'pass', value: 658, threshold: 650, note: 'Barely meets minimum' },
        bankruptcies: { status: 'pass', note: 'No bankruptcies' },
        foreclosures: { status: 'pass', note: 'No foreclosures' },
        debtToIncome: { status: 'fail', value: 76, threshold: 50, note: 'Exceeds 50% threshold' },
        judgmentsLiens: { status: 'fail', note: '1 unpaid judgment ($2,400)' },
        collections: { status: 'concern', note: '$3,100 in collections (under $5K threshold but concerning)' }
      },
      concerns: [
        'High debt-to-income ratio (76% - well above 50% threshold)',
        'Medical collections ($3,100 unpaid)',
        'Unpaid judgment ($2,400 medical debt)',
        'High credit utilization (67% - maxed cards)',
        'Pattern of late payments (2021-2022)'
      ],
      context: 'Medical debt collections appear related to emergency surgery in 2021 (per applicant disclosure). Subject experienced medical emergency during pandemic period. Has not resolved medical debt.',
      investigatorAssessment: 'Financial stress evident. Credit score barely meets minimum (658 vs 650 required). High debt-to-income ratio (76%) well above preferred 50% threshold. Medical collections and judgment from 2021-2022 (appears related to emergency medical expenses). High credit utilization (67% - maxed cards). Pattern of late payments during 2021-2022 period.',
      recommendation: 'Conditional Approval Pending Discussion',
      recommendationNote: 'Interview applicant about: (1) Medical debt circumstances, (2) Current payment plan or ability to establish plan, (3) Debt management strategy, (4) Commitment to resolve collections and judgment. If applicant demonstrates payment plan: Consider approval. If no willingness to address debt: May be disqualifying.',
      conditionalAction: 'Interview applicant about medical debt + repayment plan',
      assignedTo: 'Agent Brooks',
      fcraAccessLog: [
        { date: '2024-11-03', action: 'Credit report requested', by: 'Agent Brooks' },
        { date: '2024-11-03', action: 'Report received and reviewed', by: 'Agent Brooks' },
        { date: '2024-11-05', action: 'Conditional status assigned', by: 'Agent Brooks' },
        { date: '2025-01-30', action: 'Case review access', by: 'BI Supervisor' }
      ],
      fcraAdverseActionNote: 'If this report is used as basis for adverse action (denial), applicant MUST receive: (1) Pre-adverse action notice with credit report copy, (2) Opportunity to dispute, (3) Final adverse action notice. FCRA requirements are MANDATORY.'
    }
  ];

  const excellentCount = financialReports.filter(r => r.statusCategory === 'excellent').length;
  const acceptableCount = financialReports.filter(r => r.statusCategory === 'acceptable').length;
  const reviewCount = financialReports.filter(r => r.statusCategory === 'review').length;

  const filteredReports = activeTab === 'all' ? financialReports :
    financialReports.filter(r => r.statusCategory === activeTab);

  const getStatusColor = (category) => {
    switch (category) {
      case 'excellent': return 'green';
      case 'acceptable': return 'blue';
      case 'review': return 'amber';
      default: return 'slate';
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(amount);
  };

  return (
    <DashboardLayout
      navigation={biNavigation}
      profile={biProfile}
      notifications={biNotifications}
      settingsRoute="/bi/settings"
    >
      <div className="p-5 lg:p-8 space-y-8 min-h-full">
          {/* Page Header */}
          <div className="mb-6">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-4">
              <div>
                <h2 className="text-2xl lg:text-3xl font-bold text-primary mb-2">Financial Background</h2>
                <p className="text-secondary mb-2">Credit history and financial responsibility assessment for law enforcement positions</p>
                <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    Monday, January 30, 2026 at 10:12 AM EST
                  </span>
                  <span className="flex items-center gap-1.5">
                    <User className="w-4 h-4" />
                    Agent Brooks (Badge #BI-107)
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <button className="flex items-center gap-2 px-4 py-2 bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 rounded-xl text-sm font-medium transition-colors border border-purple-500/20">
                  <Plus className="w-4 h-4" />Request Credit Report
                </button>
                <button className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-zinc-900/40 hover:bg-slate-100 dark:hover:bg-zinc-900/60 text-secondary rounded-xl text-sm font-medium transition-colors border border-slate-700/50">
                  <FileText className="w-4 h-4" />FCRA Log
                </button>
                <button className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-zinc-900/40 hover:bg-slate-100 dark:hover:bg-zinc-900/60 text-secondary rounded-xl text-sm font-medium transition-colors border border-slate-700/50">
                  <Download className="w-4 h-4" />Export
                </button>
                <button className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-zinc-900/40 hover:bg-slate-100 dark:hover:bg-zinc-900/60 text-secondary rounded-xl text-sm font-medium transition-colors border border-slate-700/50">
                  <Printer className="w-4 h-4" />Print
                </button>
              </div>
            </div>

            {/* FCRA Compliance Notice */}
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 mb-4">
              <div className="flex items-start gap-3">
                <Lock className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-amber-700 mb-1">FCRA PROTECTED - Fair Credit Reporting Act Compliance Required</h4>
                  <p className="text-xs text-amber-300/80">Consumer credit information - authorized use for employment screening only. All access logged per 15 USC 1681. Adverse action notices required if applicant disqualified based on credit information.</p>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <span className="text-secondary">Total credit reports reviewed: <span className="text-primary font-medium">{financialReports.length} subjects</span></span>
              <span className="text-slate-500">|</span>
              <span className="text-secondary">Minimum credit score requirement: <span className="text-primary font-medium">650</span> (agency policy)</span>
            </div>
          </div>

          {/* Financial Responsibility Assessment Summary */}
          <div className="bg-surface border border-border rounded-xl shadow-sm dark:shadow-none p-5 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
                <ClipboardList className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-primary">Financial Responsibility Assessment Summary</h3>
                <p className="text-xs text-slate-500">As of January 30, 2026 at 10:12 AM EST</p>
              </div>
            </div>

            {/* Overall Status */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-medium text-secondary mb-3">Overall Status</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-500">Total subjects assessed:</span>
                    <span className="text-primary font-medium">{financialReports.length} (across multiple cases)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400" />
                    <span className="text-secondary">Approved (excellent):</span>
                    <span className="text-green-400 font-medium">{excellentCount}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-400" />
                    <span className="text-secondary">Approved (meets standards):</span>
                    <span className="text-blue-400 font-medium">{acceptableCount}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-700" />
                    <span className="text-secondary">Conditional (pending discussion):</span>
                    <span className="text-amber-700 font-medium">{reviewCount}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Ban className="w-4 h-4 text-red-400" />
                    <span className="text-secondary">Disqualified:</span>
                    <span className="text-red-400 font-medium">0</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-secondary mb-3">Financial Responsibility Standards (Agency Policy)</h4>
                <div className="space-y-1.5 text-xs text-secondary">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-green-500" />
                    <span>Minimum credit score: 650 (POST recommendation)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-green-500" />
                    <span>No active bankruptcies (within last 2 years)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-green-500" />
                    <span>No recent foreclosures (within last 3 years)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-green-500" />
                    <span>Manageable debt-to-income ratio (&lt;50% preferred)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-green-500" />
                    <span>No pattern of unpaid judgments or liens</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-green-500" />
                    <span>No excessive collections (&gt;$5,000 or pattern)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Subject Summaries */}
            <div className="mt-5 pt-5 border-t border-border">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Excellent */}
                <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400" />
                    <span className="text-sm font-medium text-green-400">Approved - Excellent ({excellentCount})</span>
                  </div>
                  {financialReports.filter(r => r.statusCategory === 'excellent').map(r => (
                    <div key={r.id} className="text-xs text-secondary mb-1">
                      <span className="font-medium">{r.subject}</span> ({r.caseId})
                      <div className="text-slate-500 ml-2">Credit: {r.creditScore.score} | DTI: {r.debt.debtToIncome}%</div>
                    </div>
                  ))}
                </div>

                {/* Acceptable */}
                <div className="bg-blue-500/5 border border-blue-500/20 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-400" />
                    <span className="text-sm font-medium text-blue-400">Approved - Meets Standards ({acceptableCount})</span>
                  </div>
                  {financialReports.filter(r => r.statusCategory === 'acceptable').map(r => (
                    <div key={r.id} className="text-xs text-secondary mb-1">
                      <span className="font-medium">{r.subject}</span> ({r.caseId})
                      <div className="text-slate-500 ml-2">Credit: {r.creditScore.score} | DTI: {r.debt.debtToIncome}%</div>
                    </div>
                  ))}
                </div>

                {/* Review Required */}
                <div className="bg-amber-500/5 border border-amber-500/20 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="w-4 h-4 text-amber-700" />
                    <span className="text-sm font-medium text-amber-700">Conditional - Discussion Required ({reviewCount})</span>
                  </div>
                  {financialReports.filter(r => r.statusCategory === 'review').map(r => (
                    <div key={r.id} className="text-xs text-secondary mb-1">
                      <span className="font-medium">{r.subject}</span> ({r.caseId})
                      <div className="text-slate-500 ml-2">Credit: {r.creditScore.score} | DTI: {r.debt.debtToIncome}%</div>
                      <div className="text-amber-700/80 ml-2 mt-1">Action: {r.conditionalAction}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Investigator Assessment */}
            <div className="mt-4 pt-4 border-t border-border">
              <h4 className="text-sm font-medium text-secondary mb-2">Investigator Assessment</h4>
              <p className="text-sm text-secondary">
                {excellentCount} subject approved (excellent financial health), {acceptableCount} subject approved (meets standards), {reviewCount} subject conditional pending discussion (high debt and medical collections). All subjects meet minimum 650 credit score. Wilson requires applicant interview to discuss collections and debt management plan.
              </p>
            </div>
          </div>

          {/* Status Filter Tabs */}
          <div className="flex flex-wrap gap-2 mb-4">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'all' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' : 'bg-white dark:bg-zinc-900/40 text-secondary hover:text-slate-900 dark:hover:text-white border border-slate-700/50'}`}
            >
              All Reports ({financialReports.length})
            </button>
            <button
              onClick={() => setActiveTab('excellent')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'excellent' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-white dark:bg-zinc-900/40 text-secondary hover:text-slate-900 dark:hover:text-white border border-slate-700/50'}`}
            >
              <span className="flex items-center gap-2">
                <CreditCard className="w-4 h-4" />
                Excellent ({excellentCount})
              </span>
            </button>
            <button
              onClick={() => setActiveTab('acceptable')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'acceptable' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' : 'bg-white dark:bg-zinc-900/40 text-secondary hover:text-slate-900 dark:hover:text-white border border-slate-700/50'}`}
            >
              <span className="flex items-center gap-2">
                <PiggyBank className="w-4 h-4" />
                Acceptable ({acceptableCount})
              </span>
            </button>
            <button
              onClick={() => setActiveTab('review')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'review' ? 'bg-amber-500/20 text-amber-700 border border-amber-500/30' : 'bg-white dark:bg-zinc-900/40 text-secondary hover:text-slate-900 dark:hover:text-white border border-slate-700/50'}`}
            >
              <span className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Review Required ({reviewCount})
              </span>
            </button>
          </div>

          {/* Credit Report Cards */}
          <div className="space-y-6">
            {filteredReports.map((report) => {
              const isExpanded = expandedReport === report.id;
              const statusColor = getStatusColor(report.statusCategory);

              return (
                <div key={report.id} className={`bg-white dark:bg-zinc-900/40 border rounded-xl overflow-hidden ${
                  report.statusCategory === 'excellent' ? 'border-green-500/30' :
                  report.statusCategory === 'acceptable' ? 'border-blue-500/30' : 'border-amber-500/30'
                }`}>
                  {/* Card Header */}
                  <div
                    className="p-5 cursor-pointer hover:bg-slate-100 dark:hover:bg-zinc-900/60 transition-colors"
                    onClick={() => setExpandedReport(isExpanded ? null : report.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          report.statusCategory === 'excellent' ? 'bg-green-500/20' :
                          report.statusCategory === 'acceptable' ? 'bg-blue-500/20' : 'bg-amber-500/20'
                        }`}>
                          {report.statusCategory === 'excellent' ? <CheckCircle2 className="w-6 h-6 text-green-400" /> :
                           report.statusCategory === 'acceptable' ? <CheckCircle2 className="w-6 h-6 text-blue-400" /> :
                           <AlertCircle className="w-6 h-6 text-amber-700" />}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`text-xs font-medium px-2 py-0.5 rounded ${
                              report.statusCategory === 'excellent' ? 'bg-green-500/20 text-green-400' :
                              report.statusCategory === 'acceptable' ? 'bg-blue-500/20 text-blue-400' : 'bg-amber-500/20 text-amber-700'
                            }`}>
                              {formatStatus(report.status)}
                            </span>
                            <span className="text-xs text-slate-500 flex items-center gap-1">
                              <Lock className="w-3 h-3" /> FCRA Protected
                            </span>
                          </div>
                          <h3 className="text-lg font-semibold text-primary">{report.subject}</h3>
                          <p className="text-sm text-purple-400">{report.caseId} - {report.position}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-3xl font-bold text-primary">{report.creditScore.score}</p>
                          <p className="text-xs text-slate-500">Credit Score ({report.creditScore.range})</p>
                          <p className={`text-xs ${report.creditScore.exceedsBy > 50 ? 'text-green-400' : 'text-amber-700'}`}>
                            {report.creditScore.exceedsBy > 0 ? `+${report.creditScore.exceedsBy} above minimum` : 'Meets minimum'}
                          </p>
                        </div>
                        {isExpanded ? <ChevronUp className="w-5 h-5 text-secondary" /> : <ChevronDown className="w-5 h-5 text-secondary" />}
                      </div>
                    </div>

                    {/* Quick Stats Row */}
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-4">
                      <div className="bg-white dark:bg-zinc-950/40 rounded-lg p-3">
                        <p className="text-xs text-slate-500 mb-1">Total Debt</p>
                        <p className="text-sm font-medium text-primary">{formatCurrency(report.debt.total)}</p>
                      </div>
                      <div className="bg-white dark:bg-zinc-950/40 rounded-lg p-3">
                        <p className="text-xs text-slate-500 mb-1">Monthly Income</p>
                        <p className="text-sm font-medium text-primary">{formatCurrency(report.debt.monthlyIncome)}</p>
                      </div>
                      <div className="bg-white dark:bg-zinc-950/40 rounded-lg p-3">
                        <p className="text-xs text-slate-500 mb-1">Debt-to-Income</p>
                        <p className={`text-sm font-medium ${report.debt.debtToIncomeConcern ? 'text-amber-700' : 'text-green-400'}`}>
                          {report.debt.debtToIncome}%
                          {report.debt.debtToIncomeConcern && <AlertTriangle className="w-3 h-3 inline ml-1" />}
                        </p>
                      </div>
                      <div className="bg-white dark:bg-zinc-950/40 rounded-lg p-3">
                        <p className="text-xs text-slate-500 mb-1">Credit Utilization</p>
                        <p className={`text-sm font-medium ${report.debt.creditUtilizationConcern ? 'text-amber-700' : 'text-green-400'}`}>
                          {report.debt.creditUtilization}%
                          {report.debt.creditUtilizationConcern && <AlertTriangle className="w-3 h-3 inline ml-1" />}
                        </p>
                      </div>
                      <div className="bg-white dark:bg-zinc-950/40 rounded-lg p-3">
                        <p className="text-xs text-slate-500 mb-1">On-Time Payments</p>
                        <p className={`text-sm font-medium ${report.paymentHistory.onTimePercent >= 95 ? 'text-green-400' : report.paymentHistory.onTimePercent >= 85 ? 'text-amber-700' : 'text-red-400'}`}>
                          {report.paymentHistory.onTimePercent}%
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Expanded Content */}
                  {isExpanded && (
                    <div className="border-t border-border p-5">
                      {/* Credit Report Summary */}
                      <div className="mb-6">
                        <h4 className="text-sm font-semibold text-primary mb-3 flex items-center gap-2">
                          <FileText className="w-4 h-4 text-purple-400" />
                          Credit Report Summary
                        </h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-slate-500">Report date:</span>
                            <span className="text-secondary ml-2">{new Date(report.reportDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                          </div>
                          <div>
                            <span className="text-slate-500">Credit bureau:</span>
                            <span className="text-secondary ml-2">{report.creditBureau}</span>
                          </div>
                          <div>
                            <span className="text-slate-500">Applicant consent:</span>
                            <span className="text-green-400 ml-2 flex items-center gap-1 inline-flex">
                              <CheckCircle className="w-3.5 h-3.5" /> On file ({report.applicantConsent.date})
                            </span>
                          </div>
                          <div>
                            <span className="text-slate-500">Reviewed by:</span>
                            <span className="text-secondary ml-2">{report.reviewedBy} (#{report.reviewerBadge})</span>
                          </div>
                        </div>
                      </div>

                      {/* Credit Score Assessment */}
                      <div className="mb-6 bg-white dark:bg-zinc-950/40 rounded-xl p-4">
                        <h4 className="text-sm font-semibold text-primary mb-3">Credit Score Assessment</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <div className="flex items-baseline gap-3 mb-2">
                              <span className="text-4xl font-bold text-primary">{report.creditScore.score}</span>
                              <span className={`text-sm font-medium ${
                                report.creditScore.range === 'Excellent' ? 'text-green-400' :
                                report.creditScore.range === 'Good' ? 'text-blue-400' : 'text-amber-700'
                              }`}>({report.creditScore.range})</span>
                            </div>
                            <div className="space-y-1 text-sm">
                              <div className="flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-green-500" />
                                <span className="text-secondary">Agency minimum: 650</span>
                                <span className="text-green-400">(exceeds by {report.creditScore.exceedsBy} points)</span>
                              </div>
                              <div className="text-xs text-slate-500 ml-6">
                                Credit range: 580-669 = Fair, 670-739 = Good, 740-799 = Very Good, 800+ = Exceptional
                              </div>
                            </div>
                          </div>
                          <div>
                            <p className="text-sm text-secondary">
                              <span className="text-secondary font-medium">Assessment:</span> {report.creditScore.concernNote || `Credit score ${report.creditScore.range.toLowerCase()}, demonstrates responsible financial management.`}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Debt Analysis */}
                      <div className="mb-6">
                        <h4 className="text-sm font-semibold text-primary mb-3 flex items-center gap-2">
                          <Wallet className="w-4 h-4 text-purple-400" />
                          Debt Analysis
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-white dark:bg-zinc-950/40 rounded-xl p-4">
                            <p className="text-sm text-slate-500 mb-3">Total Debt: <span className="text-primary font-semibold">{formatCurrency(report.debt.total)}</span></p>
                            <div className="space-y-2">
                              {report.debt.breakdown.map((item, idx) => (
                                <div key={idx} className="flex items-center justify-between text-sm">
                                  <span className="flex items-center gap-2 text-secondary">
                                    {item.type === 'Mortgage' && <Home className="w-4 h-4" />}
                                    {item.type === 'Auto Loan' && <Car className="w-4 h-4" />}
                                    {item.type === 'Credit Cards' && <CreditCard className="w-4 h-4" />}
                                    {item.type === 'Student Loans' && <GraduationCap className="w-4 h-4" />}
                                    {item.type === 'Medical Debt' && <Building2 className="w-4 h-4" />}
                                    {item.type}
                                  </span>
                                  <span className={`font-medium ${item.concern ? 'text-amber-700' : 'text-primary'}`}>
                                    {formatCurrency(item.amount)}
                                    {item.concern && <AlertTriangle className="w-3 h-3 inline ml-1" />}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="space-y-3">
                            <div className="bg-white dark:bg-zinc-950/40 rounded-lg p-3">
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-secondary">Monthly Income (verified)</span>
                                <span className="text-sm font-medium text-primary">{formatCurrency(report.debt.monthlyIncome)}</span>
                              </div>
                            </div>
                            <div className="bg-white dark:bg-zinc-950/40 rounded-lg p-3">
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-secondary">Debt-to-Income Ratio</span>
                                <span className={`text-sm font-medium ${report.debt.debtToIncome > 50 ? 'text-amber-700' : 'text-green-400'}`}>
                                  {report.debt.debtToIncome}%
                                  {report.debt.debtToIncome <= 50 ? ' (PASS)' : ' (CONCERN)'}
                                </span>
                              </div>
                              <p className="text-xs text-slate-500 mt-1">Agency standard: &lt;50% preferred</p>
                            </div>
                            <div className="bg-white dark:bg-zinc-950/40 rounded-lg p-3">
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-secondary">Credit Utilization</span>
                                <span className={`text-sm font-medium ${report.debt.creditUtilization > 30 ? (report.debt.creditUtilization > 50 ? 'text-amber-700' : 'text-amber-800') : 'text-green-400'}`}>
                                  {report.debt.creditUtilization}%
                                </span>
                              </div>
                              <p className="text-xs text-slate-500 mt-1">Recommended: under 30%</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Payment History */}
                      <div className="mb-6">
                        <h4 className="text-sm font-semibold text-primary mb-3 flex items-center gap-2">
                          <History className="w-4 h-4 text-purple-400" />
                          Payment History
                        </h4>
                        <div className="bg-white dark:bg-zinc-950/40 rounded-xl p-4">
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-sm text-secondary">On-time payments:</span>
                            <span className={`text-sm font-medium ${report.paymentHistory.onTimePercent === 100 ? 'text-green-400' : report.paymentHistory.onTimePercent >= 90 ? 'text-blue-400' : 'text-amber-700'}`}>
                              {report.paymentHistory.onTimePercent}% {report.paymentHistory.onTimePercent === 100 ? '(perfect)' : ''}
                            </span>
                          </div>
                          {report.paymentHistory.latePayments.length > 0 ? (
                            <div>
                              <p className="text-sm text-slate-500 mb-2">Late payments (30+ days): {report.paymentHistory.latePayments.length}</p>
                              <div className="space-y-2">
                                {report.paymentHistory.latePayments.map((late, idx) => (
                                  <div key={idx} className="text-xs bg-white dark:bg-zinc-900/60 rounded-lg p-2">
                                    <div className="flex items-center justify-between mb-1">
                                      <span className="text-amber-700">{late.type}: {late.daysLate} days late</span>
                                      <span className="text-slate-500">{late.date}</span>
                                    </div>
                                    <p className="text-secondary">Context: {late.context}</p>
                                    {late.resolution && <p className="text-secondary">Resolution: {late.resolution}</p>}
                                  </div>
                                ))}
                              </div>
                            </div>
                          ) : (
                            <p className="text-sm text-green-400 flex items-center gap-2">
                              <CheckCircle className="w-4 h-4" /> No late payments (perfect history)
                            </p>
                          )}
                          <p className="text-xs text-slate-500 mt-3">Assessment: {report.paymentHistory.assessment}</p>
                        </div>
                      </div>

                      {/* Negative Items */}
                      <div className="mb-6">
                        <h4 className="text-sm font-semibold text-primary mb-3 flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4 text-purple-400" />
                          Negative Items
                        </h4>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                          {Object.entries(report.negativeItems).map(([key, value]) => (
                            <div key={key} className={`rounded-lg p-3 ${value.count > 0 ? 'bg-amber-500/10 border border-amber-500/30' : 'bg-white dark:bg-zinc-950/40'}`}>
                              <p className="text-xs text-slate-500 capitalize mb-1">{key}</p>
                              <p className={`text-sm font-medium ${value.count > 0 ? 'text-amber-700' : 'text-green-400'}`}>
                                {formatStatus(value.status)}
                                {value.count === 0 && <CheckCircle className="w-3.5 h-3.5 inline ml-1" />}
                              </p>
                            </div>
                          ))}
                        </div>

                        {/* Collection/Judgment Details if present */}
                        {report.negativeItems.collections.count > 0 && (
                          <div className="mt-3 bg-amber-500/10 border border-amber-500/30 rounded-lg p-3">
                            <p className="text-sm font-medium text-amber-700 mb-2">Collections Details:</p>
                            {report.negativeItems.collections.details.map((col, idx) => (
                              <div key={idx} className="text-xs text-secondary mb-2 ml-2">
                                <span className="text-amber-300">{formatCurrency(col.amount)}</span> - {col.originalCreditor}
                                <div className="text-slate-500 ml-2">Collection date: {col.collectionDate} | Status: {col.status}</div>
                              </div>
                            ))}
                          </div>
                        )}
                        {report.negativeItems.judgments.count > 0 && (
                          <div className="mt-3 bg-amber-500/10 border border-amber-500/30 rounded-lg p-3">
                            <p className="text-sm font-medium text-amber-700 mb-2">Judgment Details:</p>
                            {report.negativeItems.judgments.details.map((jud, idx) => (
                              <div key={idx} className="text-xs text-secondary mb-2 ml-2">
                                <span className="text-amber-300">{formatCurrency(jud.amount)}</span> - {jud.creditor}
                                <div className="text-slate-500 ml-2">Court: {jud.court} | Filed: {jud.filed} | Status: {jud.status}</div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Agency Policy Standards */}
                      <div className="mb-6">
                        <h4 className="text-sm font-semibold text-primary mb-3 flex items-center gap-2">
                          <Scale className="w-4 h-4 text-purple-400" />
                          Agency Policy Standards
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {Object.entries(report.policyStandards).map(([key, std]) => (
                            <div key={key} className={`flex items-center gap-2 text-sm p-2 rounded-lg ${std.status === 'pass' ? 'bg-green-500/5' : std.status === 'fail' ? 'bg-red-500/5' : 'bg-amber-500/5'}`}>
                              {std.status === 'pass' ? <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" /> :
                               std.status === 'fail' ? <XCircle className="w-4 h-4 text-red-500 flex-shrink-0" /> :
                               <AlertCircle className="w-4 h-4 text-amber-700 flex-shrink-0" />}
                              <span className={`${std.status === 'pass' ? 'text-green-400' : std.status === 'fail' ? 'text-red-400' : 'text-amber-700'}`}>
                                {key === 'creditScore' && `Credit score ≥650: ${std.status.toUpperCase()} (${std.value})`}
                                {key === 'bankruptcies' && `No active bankruptcies: ${std.status.toUpperCase()}`}
                                {key === 'foreclosures' && `No recent foreclosures: ${std.status.toUpperCase()}`}
                                {key === 'debtToIncome' && `Debt-to-income <50%: ${std.status.toUpperCase()} (${std.value}%)`}
                                {key === 'judgmentsLiens' && `No unpaid judgments/liens: ${std.status.toUpperCase()}`}
                                {key === 'collections' && `No excessive collections: ${std.status.toUpperCase()}`}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Concerns (if any) */}
                      {report.concerns && report.concerns.length > 0 && (
                        <div className="mb-6 bg-amber-500/10 border border-amber-500/30 rounded-xl p-4">
                          <h4 className="text-sm font-semibold text-amber-700 mb-3 flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4" />
                            Concerns Identified
                          </h4>
                          <ul className="space-y-1">
                            {report.concerns.map((concern, idx) => (
                              <li key={idx} className="text-sm text-amber-300/80 flex items-start gap-2">
                                <span className="text-amber-700">•</span>
                                {concern}
                              </li>
                            ))}
                          </ul>
                          {report.context && (
                            <div className="mt-3 pt-3 border-t border-amber-500/20">
                              <p className="text-sm text-secondary"><span className="text-secondary font-medium">Context:</span> {report.context}</p>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Investigator Assessment */}
                      <div className="mb-6 bg-white dark:bg-zinc-950/40 rounded-xl p-4">
                        <h4 className="text-sm font-semibold text-primary mb-2">Investigator Assessment</h4>
                        <p className="text-sm text-secondary mb-4">{report.investigatorAssessment}</p>

                        <div className={`p-4 rounded-lg ${
                          report.statusCategory === 'excellent' ? 'bg-green-500/10 border border-green-500/30' :
                          report.statusCategory === 'acceptable' ? 'bg-blue-500/10 border border-blue-500/30' :
                          'bg-amber-500/10 border border-amber-500/30'
                        }`}>
                          <div className="flex items-center gap-2 mb-2">
                            <span className={`text-sm font-semibold ${
                              report.statusCategory === 'excellent' ? 'text-green-400' :
                              report.statusCategory === 'acceptable' ? 'text-blue-400' : 'text-amber-700'
                            }`}>
                              RECOMMENDATION: {report.recommendation.toUpperCase()}
                            </span>
                          </div>
                          <p className="text-sm text-secondary">{report.recommendationNote}</p>
                          {report.approvedBy && (
                            <p className="text-xs text-slate-500 mt-2">
                              {report.statusCategory !== 'review' ? `Approved by: ${report.approvedBy} (${report.approvalDate})` : `Assigned to: ${report.assignedTo} for applicant interview`}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* FCRA Adverse Action Notice (for conditional) */}
                      {report.fcraAdverseActionNote && (
                        <div className="mb-6 bg-red-500/10 border border-red-500/30 rounded-xl p-4">
                          <h4 className="text-sm font-semibold text-red-400 mb-2 flex items-center gap-2">
                            <AlertCircle className="w-4 h-4" />
                            FCRA Adverse Action Notice Requirement
                          </h4>
                          <p className="text-sm text-red-300/80">{report.fcraAdverseActionNote}</p>
                        </div>
                      )}

                      {/* FCRA Compliance & Access Log */}
                      <div className="bg-white dark:bg-zinc-950/60 rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <Lock className="w-4 h-4 text-purple-400" />
                          <h4 className="text-sm font-semibold text-primary">FCRA Compliance</h4>
                        </div>
                        <p className="text-xs text-secondary mb-3">
                          This report contains consumer credit information obtained with applicant consent (signed release on file) and used solely for employment screening purposes per FCRA 15 USC 1681.
                        </p>
                        <div className="border-t border-border pt-3">
                          <p className="text-xs text-slate-500 mb-2">Access Log:</p>
                          <div className="space-y-1">
                            {report.fcraAccessLog.map((log, idx) => (
                              <div key={idx} className="text-xs flex items-center gap-2 text-secondary">
                                <span className="text-slate-500">{log.date}</span>
                                <span>-</span>
                                <span>{log.action}</span>
                                <span className="text-slate-500">by {log.by}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border">
                        <button className="flex items-center gap-2 px-4 py-2 bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 rounded-xl text-sm font-medium transition-colors border border-purple-500/20">
                          <FileText className="w-4 h-4" />View Full Credit Report
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-zinc-900/40 hover:bg-slate-100 dark:hover:bg-zinc-900/60 text-secondary rounded-xl text-sm font-medium transition-colors border border-slate-700/50">
                          <FileCheck className="w-4 h-4" />View Consent Form
                        </button>
                        {report.statusCategory === 'review' && (
                          <>
                            <button className="flex items-center gap-2 px-4 py-2 bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 rounded-xl text-sm font-medium transition-colors border border-amber-500/20">
                              <Calendar className="w-4 h-4" />Schedule Discussion
                            </button>
                            <button className="flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl text-sm font-medium transition-colors border border-red-500/20">
                              <AlertCircle className="w-4 h-4" />Generate Adverse Action Notice
                            </button>
                          </>
                        )}
                        <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-zinc-900/40 hover:bg-slate-100 dark:hover:bg-zinc-900/60 text-secondary rounded-xl text-sm font-medium transition-colors border border-slate-700/50">
                          <Printer className="w-4 h-4" />Print Summary
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
      </div>
    </DashboardLayout>
  );
}

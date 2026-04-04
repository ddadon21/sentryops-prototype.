import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import {
  LayoutDashboard,
  Users,
  FileText,
  TrendingUp,
  Settings,
  Bell,
  MessageCircle,
  Search,
  ChevronRight,
  Shield,
  X,
  Send,
  Menu,
  ChevronLeft,
  LogOut,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  Download,
  Eye,
  AlertTriangle,
  FolderOpen,
  UserCheck,
  FileCheck,
  DollarSign,
  ChevronDown,
  ChevronUp,
  User,
  CreditCard,
  Briefcase,
  Globe,
  TestTube,
  ExternalLink,
  Printer,
  Scale,
  AlertCircle,
  Badge
} from 'lucide-react';
import DashboardLayout from '../layouts/DashboardLayout';
import { biNavigation, biProfile, biNotifications } from '../config/biConfig';

export default function BIReports() {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState('bi-reports');
  const [chatOpen, setChatOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [logoutConfirmOpen, setLogoutConfirmOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [expandedReport, setExpandedReport] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

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
    { id: 'financial-background', label: 'Financial Background', icon: DollarSign, page: 'FinancialBackground' },
    { id: 'social-media', label: 'Social Media Analysis', icon: Eye, page: 'SocialMediaAnalysis' },
    { id: 'bi-reports', label: 'BI Reports', icon: LayoutDashboard },
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

  // Risk Level Definitions
  const riskDefinitions = {
    low: 'No identified concerns. Applicant meets all standards. No elevated risk factors for misconduct, poor performance, or early termination. Standard monitoring.',
    lowMedium: 'Minor concerns identified with mitigating factors. Supervisor aware of concerns. Monitor during probationary period.',
    medium: 'Significant concerns requiring director review. Not automatic disqualifiers but require policy determination. If approved, monitor during probation for stress indicators.',
    high: 'Disqualifying concerns identified. Recommend non-hire based on POST standards or agency policy violations.'
  };

  // Processing time standards
  const processingStandards = {
    swornNewHire: '45-90 days minimum',
    swornLateral: '45-60 days minimum (IA review adds 14-21 days)',
    nonSwornCivilian: '21-30 days minimum'
  };

  const backgroundReports = [
    {
      id: 'BI-2024-145',
      employeeName: 'Robert Martinez',
      employeeId: 'EMP-2024-001',
      department: 'Patrol Division',
      position: 'Deputy Sheriff (Sworn Law Enforcement)',
      assignment: 'Patrol Division',
      hireDate: 'Nov 8, 2024',
      reportDate: 'Nov 7, 2024',
      status: 'Cleared',
      statusLabel: 'CLEARED',
      riskLevel: 'low',
      investigationDates: 'Oct 15, 2024 - Nov 7, 2024',
      duration: '23 days',
      investigator: 'Agent Brooks (Badge #BI-107)',
      supervisor: 'BI Supervisor',
      approvalDate: 'Nov 7, 2024',
      checks: {
        criminal: {
          status: 'clear',
          label: 'CLEAR - No disqualifying criminal history',
          details: [
            'GCIC (Georgia): Clear (no criminal records)',
            'FBI NCIC (National): Clear (no criminal records)',
            'County courts: Clear (no criminal records)',
            'Federal courts: Clear (no criminal records)',
            'Traffic: 2 minor speeding tickets (2019, 2021, paid)',
            'Assessment: Meets POST standards'
          ]
        },
        credit: {
          status: 'acceptable',
          label: 'ACCEPTABLE - Meets minimum standards',
          details: [
            'Credit score: 742 (Good, above 650 minimum)',
            'Debt-to-income: 34% (acceptable, under 50%)',
            'Bankruptcies: None',
            'Foreclosures: None',
            'Collections: None',
            'Late payments: 1 (2020, during COVID - understandable)',
            'Assessment: Responsible financial management'
          ]
        },
        employment: {
          status: 'verified',
          label: 'VERIFIED - All employment confirmed',
          details: [
            'Current: Metro Atlanta PD (2018-Present, verified)',
            'Prior: Atlanta Security (2015-2017, verified)',
            'Prior: Campus Safety GSU (2012-2015, verified)',
            'Eligible for rehire: All employers said YES',
            'Assessment: Stable employment history'
          ]
        },
        references: {
          status: 'excellent',
          label: 'EXCELLENT - All references strongly positive',
          details: [
            'Current supervisor: Strongly recommends (Sgt. Davis)',
            'Former supervisor: Recommends (Capt. Williams)',
            'Disciplinary history: None per supervisors',
            'Assessment: Excellent references'
          ]
        },
        post: {
          status: 'verified',
          label: 'VERIFIED - Active Georgia POST certification',
          details: [
            'Certificate #: POST-GA-123456',
            'Status: Active (verified via GA POST database)',
            'Assessment: Meets POST requirements'
          ]
        },
        lateral: {
          status: 'pending',
          label: 'Internal Affairs Review: PENDING (MANDATORY)',
          details: [
            'IA request sent: Jan 24, 2026',
            'Expected response: Feb 3-7, 2026',
            'NOTE: Final clearance contingent on IA approval'
          ]
        },
        socialMedia: {
          status: 'clear',
          label: 'NO CONCERNS - Professional online presence',
          details: [
            'Platforms reviewed: Facebook, LinkedIn, Twitter/X, Instagram',
            'Public posts reviewed: 142 posts (last 5 years)',
            'Flagged content: None',
            'Assessment: Professional, appropriate content'
          ]
        },
        drugScreen: {
          status: 'negative',
          label: 'NEGATIVE - No substances detected',
          details: [
            'Test date: Nov 5, 2024',
            'Test type: 10-panel urine drug screen',
            'Result: Negative (no substances detected)',
            'Assessment: Meets drug-free workplace policy'
          ]
        }
      },
      assessment: {
        overall: 'Comprehensive background investigation completed. All checks passed POST and agency standards. No disqualifying criminal history. Financial responsibility demonstrated (credit 742, manageable debt). All employment verified, all would rehire. Excellent supervisory references (strongly positive). Professional online presence. Drug screen negative. Lateral transfer from Metro Atlanta PD (currently sworn officer in good standing).',
        concerns: 'None - No disqualifying factors identified in any area',
        suitability: [
          'Meets all POST standards for law enforcement certification',
          'Meets all agency standards for deputy sheriff position',
          'Demonstrates character, integrity, and professionalism',
          'No concerns regarding fitness for duty'
        ],
        recommendation: 'APPROVED FOR HIRE',
        contingency: 'Final clearance pending IA review completion'
      }
    },
    {
      id: 'BI-2024-143',
      employeeName: 'Sarah Chen',
      employeeId: 'EMP-2024-002',
      department: 'Investigations Division',
      position: 'Detective (Sworn Law Enforcement)',
      assignment: 'Investigations Division',
      hireDate: 'Oct 15, 2024 (promotion approved)',
      reportDate: 'Oct 12, 2024',
      status: 'Cleared',
      statusLabel: 'CLEARED (EXCELLENT)',
      riskLevel: 'low',
      investigationDates: 'Oct 10, 2024 - Oct 12, 2024',
      duration: '2 days (expedited for internal promotion)',
      investigator: 'Investigator Davis (Badge #BI-109)',
      supervisor: 'BI Supervisor',
      approvalDate: 'Oct 12, 2024',
      isPromotion: true,
      checks: {
        criminal: {
          status: 'clear',
          label: 'CLEAR - No new criminal history since hire',
          details: [
            'Update check: Oct 11, 2024',
            'GCIC/FBI: Clear (no new records since 2020 hire)',
            'Traffic: 1 parking ticket (2020, paid)',
            'Assessment: Continues to meet POST standards'
          ]
        },
        credit: {
          status: 'excellent',
          label: 'EXCELLENT - Exceeds all standards',
          details: [
            'Credit score: 798 (Excellent, well above minimum)',
            'Debt-to-income: 24% (excellent, well under 50%)',
            'No negative items (bankruptcies, foreclosures, collections)',
            'Assessment: Outstanding financial responsibility'
          ]
        },
        employment: {
          status: 'verified',
          label: 'VERIFIED - Current employee in good standing',
          details: [
            'Current position: Patrol Officer (since 2020)',
            'Performance: Excellent (last 3 evaluations)',
            'Disciplinary history: None',
            'Ready for promotion: Recommended by command',
            'Assessment: Exemplary employee'
          ]
        },
        socialMedia: {
          status: 'clear',
          label: 'NO CONCERNS - Professional online presence maintained',
          details: [
            'Review: No concerning changes since hire',
            'Assessment: Professional boundaries maintained'
          ]
        },
        drugScreen: {
          status: 'negative',
          label: 'NEGATIVE - No substances detected',
          details: [
            'Test date: Oct 10, 2024 (random test)',
            'Result: Negative',
            'Assessment: Continues drug-free status'
          ]
        }
      },
      assessment: {
        overall: 'Outstanding candidate for detective position. Exemplary performance as patrol officer since 2020 hire. No disciplinary issues. Excellent credit (798). Clean criminal record. Command recommends promotion. All checks exceeded requirements.',
        concerns: 'None',
        suitability: [
          'Internal promotion of proven, excellent employee',
          'Exemplary performance record',
          'Command recommendation for advancement'
        ],
        recommendation: 'APPROVED FOR PROMOTION'
      }
    },
    {
      id: 'BI-2024-141',
      employeeName: 'James Wilson',
      employeeId: 'EMP-2024-003',
      department: 'K-9 Unit',
      position: 'K-9 Handler (Sworn Law Enforcement)',
      assignment: 'K-9 Unit',
      hireDate: 'Sep 20, 2024 (conditional offer approved)',
      reportDate: 'Sep 15, 2024',
      status: 'Cleared with Notes',
      statusLabel: 'CLEARED WITH NOTES',
      riskLevel: 'lowMedium',
      investigationDates: 'Aug 20, 2024 - Sep 15, 2024',
      duration: '26 days (acceptable for sworn LE)',
      investigator: 'Agent Brooks (Badge #BI-107)',
      supervisor: 'BI Supervisor',
      approvalDate: 'Sep 15, 2024',
      checks: {
        criminal: {
          status: 'clear-note',
          label: 'CLEAR - No disqualifying criminal history',
          details: [
            'GCIC/FBI: No convictions',
            '⚠️ Arrest found: 1 arrest (2015 - Disorderly conduct)',
            '   └─ Disposition: Charges dismissed (no conviction)',
            '   └─ Context: Age 21, college incident, 9 years ago',
            '   └─ Assessment: Not disqualifying per POST (no conviction)',
            'Traffic: 3 speeding tickets (2016, 2018, 2020 - all paid)',
            'Assessment: Meets POST standards (dismissed charges OK)'
          ]
        },
        credit: {
          status: 'fair',
          label: 'FAIR - Meets minimum but concerns noted',
          details: [
            'Credit score: 658 (Fair, above 650 minimum by 8 points)',
            'Debt-to-income: 76% (high - concerning)',
            'Collections: $3,100 (medical debt 2021-2022)',
            'Judgment: $2,400 (unpaid medical judgment 2022)',
            'Context: Medical emergency surgery 2021 (per applicant)',
            'Recent improvement: Working with creditors, payment plan established',
            'Assessment: Conditional approval pending debt management'
          ]
        },
        applicantDiscussion: {
          status: 'completed',
          label: 'APPLICANT DISCUSSION HELD',
          details: [
            'Date: Sep 10, 2024',
            'Conducted by: Agent Brooks',
            'Topics: Dismissed arrest (2015), medical collections',
            'Findings:',
            '  • Arrest: Applicant took responsibility, immature behavior',
            '  • Medical debt: Emergency surgery 2021, now on payment plan',
            '  • Commitment: Expressed commitment to resolve debt',
            'Assessment: Applicant demonstrated maturity and accountability'
          ]
        },
        employment: {
          status: 'verified',
          label: 'VERIFIED - All employment confirmed',
          details: [
            'Assessment: Stable employment, good references'
          ]
        },
        drugScreen: {
          status: 'negative',
          label: 'NEGATIVE - No substances detected',
          details: []
        }
      },
      assessment: {
        overall: 'Applicant has past concerns but demonstrates growth. Dismissed arrest from 9 years ago (college, age 21) - charges not disqualifying per POST. Credit shows past financial stress (medical emergency 2021) but applicant established payment plan and demonstrated commitment to resolution. Discussed concerns with applicant - showed maturity and accountability.',
        concerns: [
          'Credit score barely above minimum (658 vs 650 required)',
          'High debt-to-income ratio (76% - financial stress indicator)',
          'Medical collections/judgment (being addressed)'
        ],
        mitigatingFactors: [
          'No criminal convictions (dismissed charges OK per POST)',
          'Medical debt context (emergency, not irresponsibility)',
          'Payment plan established (demonstrated commitment)',
          '9 years since arrest (demonstrated maturity over time)'
        ],
        suitability: [
          'Meets minimum POST standards (no disqualifying convictions)',
          'Meets minimum agency financial standards (above 650 score)',
          '⚠️ Supervisor should be aware of financial stress history'
        ],
        recommendation: 'APPROVED WITH SUPERVISOR AWARENESS',
        supervisorNote: 'Approved with awareness of concerns. Will monitor during probation. Applicant understands expectations.'
      }
    },
    {
      id: 'BI-2024-138',
      employeeName: 'Maria Rodriguez',
      employeeId: 'PENDING-2024-004',
      department: 'Human Resources, Administration',
      position: 'HR Coordinator (Non-Sworn Civilian)',
      assignment: 'Human Resources, Administration',
      hireDate: null,
      reportDate: 'Nov 20, 2024',
      status: 'In Progress',
      statusLabel: 'IN PROGRESS',
      riskLevel: null,
      investigationDates: 'November 20, 2024 - Present',
      duration: 'Expected 21-30 days (standard for civilian)',
      investigator: 'Investigator Davis (Badge #BI-109)',
      supervisor: 'BI Supervisor',
      expectedCompletion: 'November 28, 2024 (8 days remaining)',
      checks: {
        criminal: {
          status: 'in-progress',
          label: 'IN PROGRESS',
          details: [
            'Fingerprints submitted: Nov 20, 2024',
            'GCIC: Pending (expected Nov 22-23)',
            'FBI NCIC: Pending (expected Nov 23-25)',
            'Status: Awaiting results'
          ]
        },
        credit: {
          status: 'pending',
          label: 'PENDING',
          details: [
            'Credit report requested: Nov 20, 2024',
            'Applicant consent: On file (signed release)',
            'Expected results: Nov 22, 2024',
            'Status: Awaiting credit bureau response'
          ]
        },
        employment: {
          status: 'in-progress',
          label: 'IN PROGRESS',
          details: [
            'Current employer: City of Atlanta (HR Analyst, 2020-Present)',
            'Prior employer: Private sector HR (2015-2020)',
            'Status: Verification requests sent Nov 21',
            'Expected responses: Nov 25-28, 2024'
          ]
        },
        references: {
          status: 'not-started',
          label: 'NOT YET STARTED',
          details: [
            'References provided: 3 professional, 2 personal',
            'Status: Will initiate after criminal/credit checks complete',
            'Expected completion: Nov 27-28, 2024'
          ]
        },
        socialMedia: {
          status: 'in-progress',
          label: 'IN PROGRESS',
          details: [
            'Platforms identified: LinkedIn (only platform found)',
            'Status: Limited online presence (not concerning)',
            'Expected completion: Nov 22, 2024'
          ]
        },
        drugScreen: {
          status: 'scheduled',
          label: 'SCHEDULED',
          details: [
            'Scheduled date: Nov 25, 2024 at 9:00 AM',
            'Location: Concentra Medical Center',
            'Test type: 10-panel urine drug screen',
            'Results expected: Nov 26, 2024 (24-hour turnaround)'
          ]
        }
      },
      timeline: [
        { date: 'Nov 20', event: 'Investigation initiated, fingerprints submitted' },
        { date: 'Nov 22-23', event: 'Expected GCIC/FBI results' },
        { date: 'Nov 25', event: 'Drug screen scheduled' },
        { date: 'Nov 25-28', event: 'Employment verification responses expected' },
        { date: 'Nov 27-28', event: 'Reference checks to be completed' },
        { date: 'Nov 28', event: 'Expected final report completion' }
      ],
      nextActions: [
        'Monitor for GCIC/FBI results (Nov 22-23)',
        'Review credit report when received (Nov 22)',
        'Confirm drug screen completed (Nov 25)',
        'Follow up on employment verifications (Nov 25-28)',
        'Complete reference checks (Nov 27-28)',
        'Generate final report (Nov 28)'
      ],
      investigatorNotes: 'Background investigation initiated Nov 20, 2024. Fingerprints submitted for GCIC/FBI checks. Credit report and employment verification requests sent. Subject has minimal social media presence (LinkedIn only - professional profile, no concerns). Drug screen scheduled for Nov 25. On track for completion by Nov 28, 2024. No concerns identified to date.',
      preliminaryAssessment: 'No concerns identified (Note: This is preliminary. Final assessment pending results)'
    },
    {
      id: 'BI-2024-139',
      employeeName: 'David Thompson',
      employeeId: 'PENDING-2024-005',
      department: 'Communications Division',
      position: 'Dispatcher (Non-Sworn Civilian)',
      assignment: 'Communications Division',
      hireDate: null,
      reportDate: 'Nov 10, 2024',
      status: 'Review Required',
      statusLabel: 'REVIEW REQUIRED',
      riskLevel: 'medium',
      investigationDates: 'Oct 15, 2024 - Nov 10, 2024',
      duration: '26 days (acceptable for civilian)',
      investigator: 'Agent Brooks (Badge #BI-107)',
      supervisor: 'BI Supervisor',
      approvalDate: 'PENDING DIRECTOR REVIEW',
      checks: {
        criminal: {
          status: 'flag',
          label: 'FLAG - DUI conviction requires director review',
          details: [
            'GCIC/FBI: 1 conviction found',
            '⚠️ CONVICTION: DUI (Driving Under the Influence)',
            '   └─ Date: March 15, 2019 (5+ years ago)',
            '   └─ Location: Fulton County, Georgia',
            '   └─ Disposition: Convicted, completed diversion program',
            '   └─ Sentence: 12 months probation (completed 2020)',
            '   └─ License: Suspended 6 months (reinstated 2019)',
            '   └─ Current status: Conviction on record, probation complete',
            'Post-DUI record: Clean (no issues since 2019)',
            'Assessment: ⚠️ Requires director policy determination'
          ]
        },
        credit: {
          status: 'poor',
          label: 'POOR - Below agency preferred standards',
          details: [
            'Credit score: 598 (Poor, below 650 minimum)',
            'Debt-to-income: 68% (high - concerning)',
            'Collections: $8,200 (medical debt)',
            'Bankruptcies: None',
            'Late payments: Multiple (2021-2022)',
            'Assessment: ⚠️ Below financial responsibility standards'
          ]
        },
        employment: {
          status: 'verified',
          label: 'VERIFIED - All employment confirmed',
          details: [
            'Assessment: Stable employment history'
          ]
        },
        references: {
          status: 'acceptable',
          label: 'ACCEPTABLE - References generally positive',
          details: [
            'Assessment: No concerns from references'
          ]
        },
        drugScreen: {
          status: 'negative',
          label: 'NEGATIVE - No substances detected',
          details: []
        }
      },
      assessment: {
        overall: 'Applicant has two significant concerns: (1) DUI conviction from 2019 (completed diversion, 5+ years ago), and (2) Poor credit (598 score, well below 650 minimum, high debt, medical collections). Both concerns require director review for policy determination.',
        concerns: [
          {
            title: 'DUI CONVICTION (2019)',
            details: [
              'Date: March 2019 (5+ years ago)',
              'Context: Completed diversion, probation finished 2020',
              'Since conviction: Clean record (no further issues)',
              'Policy question: Does DUI disqualify for dispatcher role?'
            ]
          },
          {
            title: 'POOR CREDIT (598 score)',
            details: [
              'Below minimum: 598 vs 650 required (52 points below)',
              'Context: Medical debt collections ($8,200)',
              'Debt load: 68% debt-to-income (concerning)',
              'Policy question: Can waiver be granted for medical debt?'
            ]
          }
        ],
        mitigatingFactors: [
          'DUI: 5+ years ago, completed diversion, clean since',
          'Credit: Medical debt (not consumer irresponsibility)',
          'Employment: Stable history, good references',
          'Position: Non-sworn civilian (not sworn LE officer)'
        ],
        suitability: [],
        recommendation: 'CONDITIONAL - DIRECTOR REVIEW',
        investigatorNote: 'Applicant has DUI conviction (2019, completed diversion, clean since) and poor credit (598, medical debt). Both concerns require director policy determination. For non-sworn dispatcher position, recommend director review to determine if concerns are disqualifying or if waiver/conditional approval appropriate. Mitigating factors: time elapsed, medical debt context, stable employment.',
        supervisorNote: 'Concur with investigator. Forwarding to director for policy determination. Recommend director consider: (1) DUI is 5+ years old with clean record since, (2) Poor credit is medical debt not irresponsibility, (3) Position is non-sworn civilian. Director decision required.',
        directorReview: {
          forwardedTo: 'Director of Administration',
          dateForwarded: 'Nov 10, 2024',
          decisionRequired: 'Policy determination on DUI and credit',
          options: [
            'Approve with conditions',
            'Waive credit requirement',
            'Disqualify based on DUI',
            'Disqualify based on credit',
            'Request additional information'
          ]
        }
      }
    }
  ];

  const notifications = [
    { id: 1, title: 'IA Review Response Received', message: 'Robert Martinez - Metro Atlanta PD responded', time: '2 hours ago', urgent: true },
    { id: 2, title: 'Director Decision Required', message: 'David Thompson case awaiting policy determination', time: '1 day ago', urgent: true },
    { id: 3, title: 'Drug Screen Scheduled', message: 'Maria Rodriguez - Nov 25 at 9:00 AM', time: '2 days ago', urgent: false },
  ];

  const getStatusColor = (status) => {
    const colors = {
      'Cleared': 'bg-emerald-500/20 border-emerald-500/30 text-emerald-400',
      'Cleared with Notes': 'bg-amber-500/20 border-amber-500/30 text-amber-700',
      'In Progress': 'bg-blue-500/20 border-blue-500/30 text-blue-400',
      'Review Required': 'bg-red-500/20 border-red-500/30 text-red-400'
    };
    return colors[status] || 'bg-slate-500/20 border-slate-500/30 text-slate-500';
  };

  const getCheckStatusIcon = (status) => {
    if (status === 'clear' || status === 'verified' || status === 'excellent' || status === 'negative' || status === 'acceptable' || status === 'completed') {
      return <CheckCircle className="w-4 h-4 text-emerald-400" />;
    }
    if (status === 'clear-note' || status === 'fair') {
      return <AlertTriangle className="w-4 h-4 text-amber-700" />;
    }
    if (status === 'in-progress' || status === 'pending' || status === 'scheduled') {
      return <Clock className="w-4 h-4 text-blue-400" />;
    }
    if (status === 'flag' || status === 'poor') {
      return <AlertCircle className="w-4 h-4 text-red-400" />;
    }
    if (status === 'not-started') {
      return <Clock className="w-4 h-4 text-secondary" />;
    }
    return <Clock className="w-4 h-4 text-secondary" />;
  };

  const getRiskBadge = (level) => {
    if (!level) return null;
    const styles = {
      low: 'bg-emerald-500/20 border-emerald-500/30 text-emerald-400',
      lowMedium: 'bg-amber-500/20 border-amber-500/30 text-amber-700',
      medium: 'bg-orange-500/20 border-orange-500/30 text-orange-400',
      high: 'bg-red-500/20 border-red-500/30 text-red-400'
    };
    const labels = {
      low: 'LOW RISK',
      lowMedium: 'LOW-MEDIUM RISK',
      medium: 'MEDIUM RISK',
      high: 'HIGH RISK'
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-bold border ${styles[level]}`}>
        {labels[level]}
      </span>
    );
  };

  const filteredReports = backgroundReports.filter(report => {
    const matchesSearch = report.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         report.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         report.position.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'all' ||
                         report.status.toLowerCase().replace(' ', '-') === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: backgroundReports.length,
    cleared: backgroundReports.filter(r => r.status === 'Cleared').length,
    withNotes: backgroundReports.filter(r => r.status === 'Cleared with Notes').length,
    inProgress: backgroundReports.filter(r => r.status === 'In Progress').length,
    reviewRequired: backgroundReports.filter(r => r.status === 'Review Required').length
  };

  const toggleExpand = (id) => {
    setExpandedReport(expandedReport === id ? null : id);
  };

  const renderCheckSection = (title, icon, check) => {
    if (!check) return null;
    const Icon = icon;
    return (
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <Icon className="w-4 h-4 text-secondary" />
          <span className="text-sm font-semibold text-primary">{title}:</span>
        </div>
        <div className="ml-6 space-y-1">
          <div className="flex items-center gap-2">
            {getCheckStatusIcon(check.status)}
            <span className="text-sm text-secondary">{check.label}</span>
          </div>
          {check.details && check.details.length > 0 && (
            <div className="ml-6 space-y-1 mt-2">
              {check.details.map((detail, idx) => (
                <p key={idx} className={`text-xs ${detail.startsWith('⚠️') || detail.includes('⚠️') ? 'text-amber-700' : 'text-slate-500'}`}>
                  {detail.startsWith('   ') ? detail : `├─ ${detail}`}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <DashboardLayout
      navigation={biNavigation}
      profile={biProfile}
      notifications={biNotifications}
      settingsRoute="/bi/settings"
    >
      <div className="p-5 lg:p-8 space-y-8 min-h-full">
          <div className="max-w-[1600px] mx-auto">
            {/* Page Header */}
            <div className="mb-6">
              <h2 className="text-2xl lg:text-3xl font-bold text-primary mb-2">Background Investigation Reports</h2>
              <p className="text-secondary">Comprehensive background check documentation and status tracking</p>
            </div>

            {/* Processing Standards Info */}
            <div className="mb-6 bg-surface border border-border rounded-xl shadow-sm dark:shadow-none p-4">
              <h3 className="text-sm font-semibold text-primary mb-3 flex items-center gap-2">
                <Scale className="w-4 h-4 text-purple-400" />
                Investigation Processing Standards
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-secondary">Sworn LE (New Hire)</p>
                  <p className="text-primary font-medium">{processingStandards.swornNewHire}</p>
                </div>
                <div>
                  <p className="text-secondary">Sworn LE (Lateral Transfer)</p>
                  <p className="text-primary font-medium">{processingStandards.swornLateral}</p>
                </div>
                <div>
                  <p className="text-secondary">Non-Sworn Civilian</p>
                  <p className="text-primary font-medium">{processingStandards.nonSwornCivilian}</p>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
              <div className="bg-surface border border-border rounded-xl shadow-sm dark:shadow-none p-4">
                <p className="text-secondary text-xs uppercase tracking-wide mb-1">Total Reports</p>
                <p className="text-2xl font-bold text-primary">{stats.total}</p>
              </div>
              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4">
                <p className="text-emerald-400 text-xs uppercase tracking-wide mb-1">Cleared</p>
                <p className="text-2xl font-bold text-emerald-400">{stats.cleared}</p>
              </div>
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4">
                <p className="text-amber-700 text-xs uppercase tracking-wide mb-1">With Notes</p>
                <p className="text-2xl font-bold text-amber-700">{stats.withNotes}</p>
              </div>
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
                <p className="text-blue-400 text-xs uppercase tracking-wide mb-1">In Progress</p>
                <p className="text-2xl font-bold text-blue-400">{stats.inProgress}</p>
              </div>
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
                <p className="text-red-400 text-xs uppercase tracking-wide mb-1">Review Required</p>
                <p className="text-2xl font-bold text-red-400">{stats.reviewRequired}</p>
              </div>
            </div>

            {/* Risk Level Definitions */}
            <div className="mb-6 bg-surface border border-border rounded-xl shadow-sm dark:shadow-none p-4">
              <h3 className="text-sm font-semibold text-primary mb-3 flex items-center gap-2">
                <Shield className="w-4 h-4 text-purple-400" />
                Risk Assessment Definitions
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                <div className="space-y-1">
                  <span className="px-2 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 font-bold">LOW</span>
                  <p className="text-secondary mt-2">{riskDefinitions.low}</p>
                </div>
                <div className="space-y-1">
                  <span className="px-2 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-700 font-bold">LOW-MEDIUM</span>
                  <p className="text-secondary mt-2">{riskDefinitions.lowMedium}</p>
                </div>
                <div className="space-y-1">
                  <span className="px-2 py-1 rounded-full bg-orange-500/20 border border-orange-500/30 text-orange-400 font-bold">MEDIUM</span>
                  <p className="text-secondary mt-2">{riskDefinitions.medium}</p>
                </div>
                <div className="space-y-1">
                  <span className="px-2 py-1 rounded-full bg-red-500/20 border border-red-500/30 text-red-400 font-bold">HIGH</span>
                  <p className="text-secondary mt-2">{riskDefinitions.high}</p>
                </div>
              </div>
            </div>

            {/* Filter Tabs and Export */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div className="bg-white dark:bg-slate-800/40 border border-border rounded-xl overflow-hidden">
                <div className="flex">
                  {['all', 'cleared', 'cleared-with-notes', 'in-progress', 'review-required'].map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setSelectedFilter(filter)}
                      className={`px-4 py-3 text-sm font-medium transition-all capitalize ${
                        selectedFilter === filter
                          ? 'bg-purple-500/10 text-purple-400 border-b-2 border-purple-500'
                          : 'text-secondary hover:text-primary'
                      }`}
                    >
                      {filter.replace(/-/g, ' ')}
                    </button>
                  ))}
                </div>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-xl font-medium transition-colors">
                <Download className="w-5 h-5" />
                Export All Reports
              </button>
            </div>

            {/* Report Cards */}
            <div className="space-y-6">
              {filteredReports.map((report) => {
                const isExpanded = expandedReport === report.id;

                return (
                  <div
                    key={report.id}
                    className={`bg-slate-100/80 dark:bg-slate-800/30 border rounded-xl overflow-hidden transition-all ${
                      report.status === 'Review Required' ? 'border-red-500/50' :
                      report.status === 'Cleared with Notes' ? 'border-amber-500/50' :
                      report.status === 'Cleared' ? 'border-emerald-500/30' :
                      'border-slate-700/50'
                    }`}
                  >
                    {/* Card Header */}
                    <div
                      className="p-4 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors"
                      onClick={() => toggleExpand(report.id)}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-4 flex-1 min-w-0">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${getStatusColor(report.status)}`}>
                            {report.status === 'Cleared' && <CheckCircle className="w-6 h-6" />}
                            {report.status === 'Cleared with Notes' && <AlertTriangle className="w-6 h-6" />}
                            {report.status === 'In Progress' && <Clock className="w-6 h-6" />}
                            {report.status === 'Review Required' && <AlertCircle className="w-6 h-6" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 flex-wrap mb-1">
                              <span className={`px-2 py-0.5 rounded-full text-xs font-bold border ${getStatusColor(report.status)}`}>
                                {report.statusLabel}
                              </span>
                              <h3 className="text-lg font-semibold text-primary">{report.employeeName}</h3>
                              {getRiskBadge(report.riskLevel)}
                            </div>
                            <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-secondary">
                              <span>Employee ID: {report.employeeId}</span>
                              <span>Case ID: {report.id}</span>
                            </div>
                            <p className="text-sm text-secondary mt-1">{report.position}</p>
                            <p className="text-xs text-slate-500">{report.assignment}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {isExpanded ? (
                            <ChevronUp className="w-5 h-5 text-secondary" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-secondary" />
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Expanded Content */}
                    {isExpanded && (
                      <div className="border-t border-border p-4">
                        {/* Investigation Summary */}
                        <div className="mb-6 pb-6 border-b border-border dark:border-slate-700/30">
                          <h4 className="text-sm font-semibold text-primary mb-3 uppercase tracking-wide">Background Investigation Summary</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-slate-500" />
                              <span className="text-secondary">Investigation dates:</span>
                              <span className="text-primary">{report.investigationDates}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-slate-500" />
                              <span className="text-secondary">Duration:</span>
                              <span className="text-primary">{report.duration}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <User className="w-4 h-4 text-slate-500" />
                              <span className="text-secondary">Investigator:</span>
                              <span className="text-primary">{report.investigator}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Users className="w-4 h-4 text-slate-500" />
                              <span className="text-secondary">Supervisor:</span>
                              <span className="text-primary">{report.supervisor}</span>
                            </div>
                            {report.approvalDate && (
                              <div className="flex items-center gap-2">
                                <FileCheck className="w-4 h-4 text-slate-500" />
                                <span className="text-secondary">Approval:</span>
                                <span className="text-primary">{report.approvalDate}</span>
                              </div>
                            )}
                            {report.hireDate && (
                              <div className="flex items-center gap-2">
                                <Briefcase className="w-4 h-4 text-slate-500" />
                                <span className="text-secondary">Hire date:</span>
                                <span className="text-primary">{report.hireDate}</span>
                              </div>
                            )}
                            {report.expectedCompletion && (
                              <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-slate-500" />
                                <span className="text-secondary">Expected completion:</span>
                                <span className="text-primary">{report.expectedCompletion}</span>
                              </div>
                            )}
                          </div>
                          {report.isPromotion && (
                            <div className="mt-3 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg text-sm text-blue-300">
                              NOTE: This is an expedited promotional background for an existing employee. Full pre-employment background completed in 2020. This update verifies no disqualifying changes.
                            </div>
                          )}
                          {report.status === 'Cleared with Notes' && (
                            <div className="mt-3 p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg text-sm text-amber-300">
                              ⚠️ CLEARED WITH SUPERVISOR AWARENESS OF CONCERNS
                            </div>
                          )}
                          {report.status === 'Review Required' && (
                            <div className="mt-3 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-sm text-red-300">
                              ⚠️ FLAGGED FOR DIRECTOR REVIEW DUE TO CONCERNS
                            </div>
                          )}
                        </div>

                        {/* Background Check Results */}
                        <div className="mb-6 pb-6 border-b border-border dark:border-slate-700/30">
                          <h4 className="text-sm font-semibold text-primary mb-4 uppercase tracking-wide flex items-center gap-2">
                            <FileText className="w-4 h-4 text-purple-400" />
                            Background Check Results
                          </h4>
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {renderCheckSection('CRIMINAL HISTORY (GCIC/FBI)', Shield, report.checks.criminal)}
                            {renderCheckSection('CREDIT/FINANCIAL', CreditCard, report.checks.credit)}
                            {renderCheckSection('EMPLOYMENT VERIFICATION', Briefcase, report.checks.employment)}
                            {renderCheckSection('REFERENCE CHECKS', Users, report.checks.references)}
                            {renderCheckSection('POST CERTIFICATION', Badge, report.checks.post)}
                            {renderCheckSection('LATERAL TRANSFER STATUS', ExternalLink, report.checks.lateral)}
                            {renderCheckSection('SOCIAL MEDIA ANALYSIS', Globe, report.checks.socialMedia)}
                            {renderCheckSection('DRUG SCREEN', TestTube, report.checks.drugScreen)}
                            {renderCheckSection('APPLICANT DISCUSSION', User, report.checks.applicantDiscussion)}
                          </div>
                        </div>

                        {/* Timeline (for in-progress) */}
                        {report.timeline && (
                          <div className="mb-6 pb-6 border-b border-border dark:border-slate-700/30">
                            <h4 className="text-sm font-semibold text-primary mb-4 uppercase tracking-wide flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-purple-400" />
                              Investigation Timeline
                            </h4>
                            <div className="space-y-2">
                              {report.timeline.map((item, idx) => (
                                <div key={idx} className="flex items-start gap-3 text-sm">
                                  <span className="text-slate-500 w-20 flex-shrink-0">{item.date}</span>
                                  <span className="text-secondary">{item.event}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Next Actions (for in-progress) */}
                        {report.nextActions && (
                          <div className="mb-6 pb-6 border-b border-border dark:border-slate-700/30">
                            <h4 className="text-sm font-semibold text-primary mb-4 uppercase tracking-wide">Next Actions</h4>
                            <ul className="space-y-2">
                              {report.nextActions.map((action, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-sm text-secondary">
                                  <span className="text-slate-500">├─</span>
                                  {action}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Investigator Notes (for in-progress) */}
                        {report.investigatorNotes && (
                          <div className="mb-6 pb-6 border-b border-border dark:border-slate-700/30">
                            <h4 className="text-sm font-semibold text-primary mb-3 uppercase tracking-wide">Investigator Notes</h4>
                            <p className="text-sm text-secondary">{report.investigatorNotes}</p>
                            {report.preliminaryAssessment && (
                              <div className="mt-3 p-3 bg-slate-100 dark:bg-slate-700/30 rounded-lg">
                                <span className="text-xs text-slate-500 uppercase">Preliminary Assessment:</span>
                                <p className="text-sm text-secondary">{report.preliminaryAssessment}</p>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Investigator Assessment */}
                        {report.assessment && (
                          <div className="mb-6">
                            <h4 className="text-sm font-semibold text-primary mb-4 uppercase tracking-wide flex items-center gap-2">
                              <Scale className="w-4 h-4 text-purple-400" />
                              Investigator Assessment
                            </h4>

                            {/* Overall Evaluation */}
                            <div className="mb-4">
                              <h5 className="text-xs font-semibold text-secondary uppercase mb-2">Overall Evaluation</h5>
                              <p className="text-sm text-secondary">{report.assessment.overall}</p>
                            </div>

                            {/* Concerns */}
                            {report.assessment.concerns && (
                              <div className="mb-4">
                                <h5 className="text-xs font-semibold text-secondary uppercase mb-2">Concerns Identified</h5>
                                {typeof report.assessment.concerns === 'string' ? (
                                  <p className="text-sm text-secondary">{report.assessment.concerns}</p>
                                ) : Array.isArray(report.assessment.concerns) && typeof report.assessment.concerns[0] === 'string' ? (
                                  <ul className="space-y-1">
                                    {report.assessment.concerns.map((concern, idx) => (
                                      <li key={idx} className="text-sm text-amber-700 flex items-start gap-2">
                                        <span>•</span>
                                        {concern}
                                      </li>
                                    ))}
                                  </ul>
                                ) : (
                                  <div className="space-y-3">
                                    {report.assessment.concerns.map((concern, idx) => (
                                      <div key={idx} className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                                        <h6 className="text-sm font-semibold text-red-400 mb-2">⚠️ {concern.title}</h6>
                                        <ul className="space-y-1">
                                          {concern.details.map((detail, didx) => (
                                            <li key={didx} className="text-xs text-secondary">└─ {detail}</li>
                                          ))}
                                        </ul>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            )}

                            {/* Mitigating Factors */}
                            {report.assessment.mitigatingFactors && (
                              <div className="mb-4">
                                <h5 className="text-xs font-semibold text-secondary uppercase mb-2">Mitigating Factors</h5>
                                <ul className="space-y-1">
                                  {report.assessment.mitigatingFactors.map((factor, idx) => (
                                    <li key={idx} className="text-sm text-emerald-400 flex items-start gap-2">
                                      <span>•</span>
                                      {factor}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            {/* Suitability */}
                            {report.assessment.suitability && report.assessment.suitability.length > 0 && (
                              <div className="mb-4">
                                <h5 className="text-xs font-semibold text-secondary uppercase mb-2">Suitability for Position</h5>
                                <ul className="space-y-1">
                                  {report.assessment.suitability.map((item, idx) => (
                                    <li key={idx} className={`text-sm flex items-start gap-2 ${item.includes('⚠️') ? 'text-amber-700' : 'text-slate-500'}`}>
                                      {item.includes('⚠️') ? '' : <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />}
                                      {item}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            {/* Risk Assessment */}
                            {report.riskLevel && (
                              <div className="mb-4 p-3 bg-slate-100 dark:bg-slate-700/30 rounded-lg">
                                <h5 className="text-xs font-semibold text-secondary uppercase mb-2">Risk Assessment</h5>
                                <div className="flex items-start gap-3">
                                  {getRiskBadge(report.riskLevel)}
                                  <p className="text-xs text-secondary">{riskDefinitions[report.riskLevel]}</p>
                                </div>
                              </div>
                            )}

                            {/* Recommendation */}
                            <div className="p-6 bg-transparent dark:bg-slate-700/30 rounded-lg">
                              <h5 className="text-xs font-semibold text-secondary uppercase mb-3">Recommendation</h5>
                              <div className={`inline-flex px-3 py-1.5 rounded-lg text-sm font-bold mb-3 ${
                                report.assessment.recommendation.includes('APPROVED')
                                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                  : 'bg-amber-500/20 text-amber-700 border border-amber-500/30'
                              }`}>
                                {report.assessment.recommendation}
                              </div>

                              {report.assessment.investigatorNote && (
                                <div className="mt-3 text-sm">
                                  <span className="text-slate-500">Investigator ({report.investigator}):</span>
                                  <p className="text-secondary mt-1 italic">"{report.assessment.investigatorNote}"</p>
                                </div>
                              )}

                              {report.assessment.supervisorNote && (
                                <div className="mt-3 text-sm">
                                  <span className="text-slate-500">Supervisor ({report.supervisor}):</span>
                                  <p className="text-secondary mt-1 italic">"{report.assessment.supervisorNote}"</p>
                                </div>
                              )}

                              {report.assessment.contingency && (
                                <div className="mt-3 p-2 bg-blue-500/10 border border-blue-500/30 rounded text-xs text-blue-300">
                                  Contingency: {report.assessment.contingency}
                                </div>
                              )}

                              {/* Director Review (for review-required) */}
                              {report.assessment.directorReview && (
                                <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                                  <h6 className="text-sm font-semibold text-red-400 mb-2">⚠️ AWAITING DIRECTOR REVIEW</h6>
                                  <div className="space-y-1 text-xs text-secondary">
                                    <p>├─ Forwarded to: {report.assessment.directorReview.forwardedTo}</p>
                                    <p>├─ Date forwarded: {report.assessment.directorReview.dateForwarded}</p>
                                    <p>├─ Decision required: {report.assessment.directorReview.decisionRequired}</p>
                                    <p>└─ Options:</p>
                                    <ul className="ml-4 space-y-1">
                                      {report.assessment.directorReview.options.map((option, idx) => (
                                        <li key={idx} className="text-secondary">({idx + 1}) {option}</li>
                                      ))}
                                    </ul>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-3 pt-4 border-t border-border dark:border-slate-700/30">
                          <button className="px-4 py-2 bg-white dark:bg-slate-700/50 hover:bg-slate-700/70 border border-slate-600/50 rounded-lg text-primary text-sm font-medium transition-colors flex items-center gap-2">
                            <Eye className="w-4 h-4" />
                            View Complete Investigation File
                          </button>
                          <button className="px-4 py-2 bg-white dark:bg-slate-700/50 hover:bg-slate-700/70 border border-slate-600/50 rounded-lg text-primary text-sm font-medium transition-colors flex items-center gap-2">
                            <Download className="w-4 h-4" />
                            Download Full Report
                          </button>
                          <button className="px-4 py-2 bg-white dark:bg-slate-700/50 hover:bg-slate-700/70 border border-slate-600/50 rounded-lg text-primary text-sm font-medium transition-colors flex items-center gap-2">
                            <Printer className="w-4 h-4" />
                            Print Report
                          </button>
                          {report.status === 'Cleared' && report.checks.lateral && (
                            <button className="px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 rounded-lg text-blue-400 text-sm font-medium transition-colors flex items-center gap-2">
                              <ExternalLink className="w-4 h-4" />
                              View IA Request Status
                            </button>
                          )}
                          {report.status === 'Review Required' && (
                            <>
                              <button className="px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 rounded-lg text-purple-400 text-sm font-medium transition-colors flex items-center gap-2">
                                <ExternalLink className="w-4 h-4" />
                                Forward to Director
                              </button>
                              <button className="px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 rounded-lg text-purple-400 text-sm font-medium transition-colors flex items-center gap-2">
                                <FileText className="w-4 h-4" />
                                Add Director Notes
                              </button>
                            </>
                          )}
                          {report.status === 'In Progress' && (
                            <button className="px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 rounded-lg text-blue-400 text-sm font-medium transition-colors flex items-center gap-2">
                              <Clock className="w-4 h-4" />
                              Track Progress
                            </button>
                          )}
                          {(report.status === 'Cleared' || report.status === 'Cleared with Notes') && (
                            <button className="px-4 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/30 rounded-lg text-emerald-400 text-sm font-medium transition-colors flex items-center gap-2">
                              <CheckCircle className="w-4 h-4" />
                              Close Case
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {filteredReports.length === 0 && (
              <div className="text-center py-12">
                <FileText className="w-12 h-12 text-slate-700 mx-auto mb-4" />
                <p className="text-secondary">No reports match your search criteria</p>
              </div>
            )}
          </div>
      </div>
    </DashboardLayout>
  );
}

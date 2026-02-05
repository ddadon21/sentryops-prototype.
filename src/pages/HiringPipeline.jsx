import React, { useState } from 'react';
import { Home, Users, FileText, LayoutDashboard, TrendingUp, AlertCircle, Settings, Bell, MessageCircle, Search, ChevronRight, DollarSign, CheckCircle, Shield, X, Send, Menu, ChevronLeft, LogOut, UserPlus, Briefcase, Clock, Award, Filter, Download, Eye, ArrowRight, Calendar, Phone, Mail, MapPin, Star, ChevronDown, ChevronUp, FileCheck, ClipboardCheck, GraduationCap, BarChart3, Target, AlertTriangle, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function HiringPipeline() {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState('hiring-pipeline');
  const [chatOpen, setChatOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [logoutConfirmOpen, setLogoutConfirmOpen] = useState(false);
  const [selectedStage, setSelectedStage] = useState(null);
  const [expandedCandidate, setExpandedCandidate] = useState(null);
  const [selectedPosition, setSelectedPosition] = useState('all');
  const [activeView, setActiveView] = useState('funnel');
  const [expandedMetrics, setExpandedMetrics] = useState(false);
  const [expandedBottlenecks, setExpandedBottlenecks] = useState(true);

  const navigation = [
    { id: 'hr-dashboard', label: 'HR Dashboard', icon: Users, page: 'HRDashboard' },
    { id: 'job-postings', label: 'Job Postings', icon: Briefcase, page: 'JobPostings' },
    { id: 'applicant-tracking', label: 'Applicant Tracking', icon: UserPlus, page: 'ApplicantTracking' },
    { id: 'hiring-pipeline', label: 'Hiring Pipeline', icon: TrendingUp },
    { id: 'compliance', label: 'HR Compliance', icon: ClipboardCheck, page: 'ComplianceManagement' },
    { id: 'onboarding', label: 'New Hire Onboarding', icon: FileCheck, page: 'NewHireOnboarding' },
    { id: 'training-certifications', label: 'Training & Certifications', icon: GraduationCap, page: 'TrainingCertifications' },
    { id: 'employee-records', label: 'Employee Records', icon: FileText, page: 'EmployeeRecords' },
    { id: 'time-off', label: 'Time Off Management', icon: Calendar, page: 'TimeOffManagement' },
    { id: 'performance', label: 'Performance Reviews', icon: Award, page: 'PerformanceReviews' },
    { id: 'hr-reports', label: 'HR Reports', icon: LayoutDashboard, page: 'HRReports' }
  ];

  const notifications = [
    { id: 1, title: 'Interview Panel Confirmed', message: 'Feb 06 Deputy oral board - Major Davis, Lt. Williams, Lt. Thompson confirmed', time: '30 min ago', urgent: false },
    { id: 2, title: 'Offer Response Deadline', message: 'J. Wilson offer expires Feb 05 - follow-up call needed', time: '1 hour ago', urgent: true },
    { id: 3, title: 'Physical Fitness Test', message: '14 candidates scheduled for Feb 07 testing at Training Center', time: '2 hours ago', urgent: false }
  ];

  // Position-specific applicant counts
  const positionBreakdown = {
    deputySheriff: { applicants: 23, vacancies: 8, ratio: 2.9 },
    backgroundInvestigator: { applicants: 12, vacancies: 2, ratio: 6.0 },
    detentionOfficer: { applicants: 8, vacancies: 1, ratio: 8.0 },
    adminAssistant: { applicants: 4, vacancies: 1, ratio: 4.0 }
  };

  const totalApplicants = 77;
  const totalVacancies = 12;

  // Realistic pipeline stages with GCSO-specific data
  const pipelineStages = [
    {
      id: 'application',
      name: 'Application Review',
      count: 47,
      icon: FileText,
      color: 'blue',
      percentOfPipeline: 61.0,
      description: 'Applications submitted, awaiting initial HR review',
      breakdown: {
        deputySheriff: { received: 23, passed: 17, disqualified: 6 },
        backgroundInvestigator: { received: 12, passed: 9, disqualified: 3 },
        detentionOfficer: { received: 8, passed: 6, disqualified: 2 },
        adminAssistant: { received: 4, passed: 3, disqualified: 1 }
      },
      passRate: 73.7,
      nextActions: [
        'Complete initial screening for all 47 applications',
        'Notify disqualified applicants with reason for disqualification',
        'Advance qualified applicants to next stage'
      ],
      candidates: [
        { id: 1, name: 'Marcus Johnson', position: 'Deputy Sheriff', daysInStage: 2, status: 'Pending Review', nextAction: 'Initial screening', actionDate: '2026-02-05', qualifications: 'POST Certified, 2 years patrol experience' },
        { id: 2, name: 'Lisa Williams', position: 'Deputy Sheriff', daysInStage: 1, status: 'New Application', nextAction: 'Document verification', actionDate: '2026-02-05', qualifications: 'Recent POST Academy graduate' },
        { id: 3, name: 'Jennifer Taylor', position: 'Administrative Assistant', daysInStage: 3, status: 'Documents Received', nextAction: 'Skills assessment scheduling', actionDate: '2026-02-06', qualifications: '5 years admin experience, Excel proficient' }
      ]
    },
    {
      id: 'screening',
      name: 'Initial Screening',
      count: 28,
      icon: Search,
      color: 'purple',
      percentOfPipeline: 36.4,
      description: 'Passed application review, preparing for physical test/interview',
      physicalTestSchedule: {
        date: 'February 07, 2026',
        time: '08:00 AM',
        location: 'GCSO Training Center, 2900 Commons Dr',
        candidatesScheduled: 14,
        maxCapacity: 15,
        test: 'Cooper Standards (1.5-mile run, push-ups, sit-ups, 300m sprint)'
      },
      breakdown: {
        deputySheriff: { total: 17, completedPT: 9, scheduledPT: 8 },
        backgroundInvestigator: { total: 9, noPTRequired: true },
        detentionOfficer: { total: 6, awaitingPT: 6 },
        adminAssistant: { total: 3, awaitingInterview: 3 }
      },
      passRate: 85.0,
      candidates: [
        { id: 4, name: 'David Brown', position: 'Deputy Sheriff', daysInStage: 5, status: 'PT Scheduled', nextAction: 'Physical fitness test', actionDate: '2026-02-07', qualifications: 'POST Certified, Forsyth County SO - 3 years' },
        { id: 5, name: 'Michelle Lee', position: 'Background Investigator', daysInStage: 3, status: 'Interview Scheduled', nextAction: 'Oral board interview', actionDate: '2026-02-11', qualifications: 'GCSO Deputy - 6 years, IA experience' }
      ]
    },
    {
      id: 'interview',
      name: 'Oral Board Interviews',
      count: 15,
      icon: Users,
      color: 'amber',
      percentOfPipeline: 19.5,
      description: 'Passed screening/physical test, scheduled for oral board interviews',
      scheduledInterviews: [
        {
          position: 'Deputy Sheriff',
          date: 'February 06, 2026',
          time: '09:00 AM - 16:00 PM',
          location: 'GCSO Headquarters, Conference Room B',
          candidates: 8,
          panel: ['Major R. Davis (Chair)', 'Lt. K. Williams', 'Lt. M. Thompson'],
          format: '30 standardized questions, scenario-based, writing sample',
          materialsReady: true
        },
        {
          position: 'Background Investigator',
          date: 'February 11, 2026',
          time: '10:00 AM - 15:00 PM',
          location: 'GCSO Headquarters, Sheriff\'s Conference Room',
          candidates: 9,
          panel: ['Major R. Davis (Chair)', 'HR Director', 'Lt. K. Hayes'],
          format: 'Structured interview, investigative scenario, writing sample',
          internalApplicants: 7,
          externalApplicants: 2,
          materialsReady: true
        },
        {
          position: 'Detention Officer',
          date: 'February 13, 2026',
          time: '09:00 AM - 14:00 PM',
          location: 'GCSO Detention Center, Admin Conference Room',
          candidates: 6,
          panel: ['Capt. J. Smith (Chair)', 'HR Representative', 'Shift Supervisor'],
          format: 'Structured interview, detention scenarios',
          materialsReady: false,
          note: 'Awaiting physical fitness test completion'
        }
      ],
      passRate: 77.5,
      candidates: [
        { id: 6, name: 'Sarah Chen', position: 'Deputy Sheriff', daysInStage: 8, status: 'Interview Complete', nextAction: 'Panel scoring review', actionDate: '2026-02-04', score: '144/150', rank: '#1 of 9', qualifications: 'DeKalb County PD - 4 years, POST Certified' },
        { id: 7, name: 'Robert Martinez', position: 'Deputy Sheriff', daysInStage: 6, status: 'Interview Scheduled', nextAction: 'Oral board Feb 06', actionDate: '2026-02-06', qualifications: 'Cobb County SO - 5 years, patrol/traffic' },
        { id: 8, name: 'Amanda Garcia', position: 'Background Investigator', daysInStage: 4, status: 'Interview Scheduled', nextAction: 'Command panel Feb 11', actionDate: '2026-02-11', qualifications: 'GCSO Deputy - 8 years, detective experience' }
      ]
    },
    {
      id: 'assessment',
      name: 'Skills Assessment',
      count: 12,
      icon: Award,
      color: 'cyan',
      percentOfPipeline: 15.6,
      description: 'Position-specific skills assessments based on role type',
      assessmentTypes: [
        {
          position: 'Sworn Positions (Deputy, Detention)',
          assessments: ['Physical Fitness Test (Stage 2)', 'Writing Sample (during interview)'],
          note: 'No additional skills assessment beyond interview'
        },
        {
          position: 'Background Investigator',
          assessments: ['Writing Sample - Investigative summary from mock case file', 'Panel evaluates organization, grammar, report format'],
          note: 'Conducted during oral board interview'
        },
        {
          position: 'Administrative Assistant',
          assessments: ['Typing Test - 45 WPM minimum', 'Microsoft Office Proficiency (Word, Excel, Outlook)'],
          note: 'Practical exercises during skills assessment'
        }
      ],
      candidates: [
        { id: 9, name: 'Thomas White', position: 'Deputy Sheriff', daysInStage: 2, status: 'PT Complete', nextAction: 'Advance to interview', actionDate: '2026-02-06', testResult: 'Passed all standards' },
        { id: 10, name: 'Patricia Davis', position: 'Administrative Assistant', daysInStage: 1, status: 'Assessment Scheduled', nextAction: 'Typing/Office skills test', actionDate: '2026-02-06', qualifications: '3 years clerical experience' }
      ]
    },
    {
      id: 'background',
      name: 'Background Investigation',
      count: 8,
      icon: Shield,
      color: 'indigo',
      percentOfPipeline: 10.4,
      description: 'Passed interview, comprehensive POST-compliant background investigation in progress',
      isCriticalBottleneck: true,
      investigatorCapacity: {
        investigators: [
          { name: 'Lt. K. Hayes', title: 'Senior Background Investigator', activeCases: 3, maxCapacity: 4 },
          { name: 'Cpl. J. Adams', title: 'Background Investigator', activeCases: 2, maxCapacity: 4 }
        ],
        totalActive: 5,
        totalCapacity: 8,
        avgDuration: 67,
        minDuration: 45,
        maxDuration: 90
      },
      activeInvestigations: [
        { name: 'J. Martinez', position: 'Deputy Sheriff', daysInProgress: 49, investigator: 'Lt. K. Hayes', status: 'Reference interviews in progress' },
        { name: 'K. Thompson', position: 'Deputy Sheriff', daysInProgress: 44, investigator: 'Lt. K. Hayes', status: 'Employment verification pending' },
        { name: 'R. Williams', position: 'Deputy Sheriff', daysInProgress: 28, investigator: 'Lt. K. Hayes', status: 'Polygraph scheduled Feb 10' },
        { name: 'S. Chen', position: 'Deputy Sheriff', daysInProgress: 23, investigator: 'Cpl. J. Adams', status: 'Criminal history check complete' },
        { name: 'M. Rodriguez', position: 'Deputy Sheriff', daysInProgress: 18, investigator: 'Cpl. J. Adams', status: 'Initial document collection' }
      ],
      postRequirements: [
        'Criminal history check (GCIC/NCIC, FBI fingerprint)',
        'Driving record check (GA DDS)',
        'Employment verification (all prior employers, 10 years)',
        'Education verification (transcripts)',
        'Reference interviews (minimum 5 personal/professional)',
        'Residence verification (current and prior addresses)',
        'Credit history check (financial integrity)',
        'Social media review (public profiles)',
        'Polygraph examination',
        'Investigative report with hire/no-hire recommendation'
      ],
      passRate: 67.5,
      disqualificationReasons: [
        { reason: 'Prior drug use beyond policy thresholds', percentage: 20 },
        { reason: 'Deceptive during polygraph examination', percentage: 15 },
        { reason: 'Domestic violence incidents', percentage: 10 },
        { reason: 'Excessive debt / poor credit', percentage: 10 },
        { reason: 'Prior LE termination not disclosed', percentage: 5 },
        { reason: 'Failed to disclose prior arrests', percentage: 5 },
        { reason: 'Poor references from prior employers', percentage: 5 },
        { reason: 'Other integrity violations', percentage: 30 }
      ],
      candidates: [
        { id: 11, name: 'Daniel Wilson', position: 'Deputy Sheriff', daysInStage: 49, status: 'Investigation Active', nextAction: 'Reference interviews', investigator: 'Lt. K. Hayes', completedItems: 6, totalItems: 10 },
        { id: 12, name: 'Emily Johnson', position: 'Deputy Sheriff', daysInStage: 23, status: 'Investigation Active', nextAction: 'Polygraph scheduled', investigator: 'Cpl. J. Adams', completedItems: 4, totalItems: 10 }
      ]
    },
    {
      id: 'offer',
      name: 'Offer Extended',
      count: 3,
      icon: CheckCircle,
      color: 'green',
      percentOfPipeline: 3.9,
      description: 'Background cleared, medical/psych passed, Sheriff approved, conditional offer extended',
      offersPending: [
        {
          name: 'J. Wilson',
          position: 'Deputy Sheriff',
          refNumber: '2026-APP-0087',
          offerDate: 'January 28, 2026',
          salary: '$48,000 (Step 1 - entry level)',
          startDateOffered: 'March 10, 2026',
          responseDeadline: 'February 05, 2026',
          daysRemaining: 0,
          status: 'NO RESPONSE - Follow-up needed',
          urgent: true,
          notes: 'Candidate mentioned exploring other agency options during background interview'
        },
        {
          name: 'K. Anderson',
          position: 'Deputy Sheriff',
          refNumber: '2026-APP-0103',
          offerDate: 'January 30, 2026',
          acceptedDate: 'January 30, 2026',
          salary: '$48,000 (Step 1 - POST Academy graduate)',
          startDate: 'February 24, 2026',
          status: 'ACCEPTED - Onboarding in progress',
          urgent: false
        },
        {
          name: 'T. Parker',
          position: 'Deputy Sheriff',
          refNumber: '2026-APP-0124',
          offerDate: 'February 01, 2026',
          acceptedDate: 'February 01, 2026',
          salary: '$55,200 (Step 5 - lateral transfer, 8 years exp)',
          startDate: 'March 03, 2026',
          status: 'ACCEPTED - Serving 2-week notice to Clayton County',
          urgent: false
        }
      ],
      acceptanceRate: {
        last12Months: { extended: 10, accepted: 8, declined: 2, rate: 80 },
        declineReasons: ['Accepted higher-paying agency (Gwinnett County Police, Fulton County Sheriff)', 'Relocated out of state']
      },
      salaryCompetitiveness: {
        gcsoDeputy: 48000,
        gwinnettPD: 54120,
        gwinnettPDDiff: '+12.8%',
        fultonSO: 52500,
        fultonSODiff: '+9.4%'
      },
      candidates: [
        { id: 13, name: 'J. Wilson', position: 'Deputy Sheriff', daysInStage: 8, status: 'Awaiting Response', nextAction: 'Follow-up call - URGENT', actionDate: '2026-02-05', urgent: true },
        { id: 14, name: 'K. Anderson', position: 'Deputy Sheriff', daysInStage: 3, status: 'Accepted', nextAction: 'Onboarding tasks', actionDate: '2026-02-24', startDate: 'Feb 24, 2026' }
      ]
    }
  ];

  // Realistic time-to-hire by position
  const timeToHireMetrics = {
    deputySheriff: {
      avgDays: 127,
      breakdown: [
        { stage: 'Application → Screening', days: 7 },
        { stage: 'Screening → Physical Fitness Test', days: 10 },
        { stage: 'Physical Test → Oral Board', days: 14 },
        { stage: 'Interview → Background Start', days: 5 },
        { stage: 'Background Investigation', days: 67 },
        { stage: 'Background → Medical/Psych', days: 10 },
        { stage: 'Medical/Psych → Sheriff Approval', days: 7 },
        { stage: 'Sheriff Approval → Offer', days: 3 },
        { stage: 'Offer → Acceptance', days: 4 }
      ]
    },
    deputyAcademy: {
      avgDays: 165,
      note: 'Same process + 12-week POST Academy (84 days) + scheduling wait (30-60 days)'
    },
    backgroundInvestigator: {
      avgDays: 90,
      note: 'Faster for internal transfers - partial background on file'
    },
    detentionOfficer: {
      avgDays: 110,
      note: 'Similar to Deputy but slightly shorter backgrounds'
    },
    adminAssistant: {
      avgDays: 42,
      note: 'Civilian - no POST requirements, 30-day background vs 67 days'
    }
  };

  // Realistic conversion rates
  const conversionRates = {
    applicationToScreening: 73.7,
    screeningToPhysicalTest: 85.0,
    physicalTestToInterview: 92.0,
    interviewToBackground: 77.5,
    backgroundToCleared: 67.5,
    offerToAccepted: 80.0,
    overallApplicationToHire: 32.5
  };

  // Critical bottlenecks
  const bottlenecks = [
    {
      id: 'background-capacity',
      title: 'Background Investigation Capacity',
      severity: 'critical',
      description: '2 investigators handling all backgrounds for 77 active applicants',
      details: [
        'Current: Lt. Hayes (3 cases) + Cpl. Adams (2 cases) = 5 active',
        'Capacity: 3-4 concurrent cases each = 6-8 max capacity',
        'Duration: 67 days average per investigation',
        'Throughput: 4-6 backgrounds completed per month'
      ],
      impact: 'Limits hiring pace - cannot accelerate regardless of applicant volume',
      solution: 'Hire 2 additional Background Investigators (posting active, 9 candidates interviewing Feb 11)',
      solutionImpact: 'Double capacity from 4-6/month to 8-12/month'
    },
    {
      id: 'interview-availability',
      title: 'Interview Panel Availability',
      severity: 'medium',
      description: 'Command staff have operational duties beyond recruitment',
      details: [
        'Major Davis, Lieutenants required for oral board panels',
        'Cannot conduct interviews daily or ad-hoc',
        'Must schedule dedicated interview days'
      ],
      impact: '15 candidates waiting for interview scheduling',
      solution: 'Batch interviews on dedicated days (1-2 days/month, 8-12 candidates/session)',
      status: 'RESOLVED: Feb 06 (8 Deputy), Feb 11 (9 BI), Feb 13 (6 Detention) scheduled'
    },
    {
      id: 'physical-test-facility',
      title: 'Physical Fitness Test Facility',
      severity: 'low',
      description: 'GCSO Training Center limited to 15 candidates per session',
      details: [
        'Staffing and timing constraints limit capacity',
        'Requires certified proctors for Cooper Standards test',
        'Equipment and timing logistics for 4-part test'
      ],
      impact: 'Cannot test candidates on-demand',
      solution: 'Schedule dedicated test days (monthly or bi-monthly)',
      status: 'RESOLVED: Feb 07 testing scheduled (14 candidates)'
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

  const getStageColor = (color) => {
    const colors = {
      blue: { bg: 'bg-blue-500/20', text: 'text-blue-400', border: 'border-blue-500/30', solid: 'bg-blue-500' },
      purple: { bg: 'bg-purple-500/20', text: 'text-purple-400', border: 'border-purple-500/30', solid: 'bg-purple-500' },
      amber: { bg: 'bg-amber-500/20', text: 'text-amber-400', border: 'border-amber-500/30', solid: 'bg-amber-500' },
      cyan: { bg: 'bg-cyan-500/20', text: 'text-cyan-400', border: 'border-cyan-500/30', solid: 'bg-cyan-500' },
      indigo: { bg: 'bg-indigo-500/20', text: 'text-indigo-400', border: 'border-indigo-500/30', solid: 'bg-indigo-500' },
      green: { bg: 'bg-green-500/20', text: 'text-green-400', border: 'border-green-500/30', solid: 'bg-green-500' }
    };
    return colors[color] || colors.blue;
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return { bg: 'bg-red-500/20', text: 'text-red-400', border: 'border-red-500/30' };
      case 'medium': return { bg: 'bg-amber-500/20', text: 'text-amber-400', border: 'border-amber-500/30' };
      case 'low': return { bg: 'bg-blue-500/20', text: 'text-blue-400', border: 'border-blue-500/30' };
      default: return { bg: 'bg-slate-500/20', text: 'text-slate-400', border: 'border-slate-500/30' };
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex">
      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 border-r border-slate-800/50 backdrop-blur-xl bg-slate-900/30 flex flex-col transform transition-all lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} ${sidebarCollapsed ? 'w-20' : 'w-64'}`}>
        <div className="p-4 border-b border-slate-700/50 flex items-center justify-between">
          {!sidebarCollapsed && (
            <div className="flex items-center gap-2">
              <Shield className="w-8 h-8 text-amber-500" />
              <h1 className="text-xl font-bold text-white">SentryOps</h1>
            </div>
          )}
          {sidebarCollapsed && (
            <Shield className="w-8 h-8 text-amber-500 mx-auto" />
          )}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-2 hover:bg-slate-800/50 rounded-lg transition-colors hidden lg:block"
          >
            {sidebarCollapsed ? <ChevronRight className="w-5 h-5 text-slate-400" /> : <ChevronLeft className="w-5 h-5 text-slate-400" />}
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
                  isActive ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/20' : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
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

        <div className="border-t border-slate-700/50">
          {!sidebarCollapsed && (
            <div className="px-4 py-3">
              <p className="text-xs text-slate-500 text-center">Gwinnett County Sheriff's Office</p>
            </div>
          )}

          <div className="p-4">
            <button
              onClick={() => setLogoutConfirmOpen(true)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-slate-400 hover:bg-slate-800/40 hover:text-slate-300 ${sidebarCollapsed ? 'justify-center' : ''}`}
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
          <div className="relative bg-slate-900 border border-slate-700/50 rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-slate-800/60 rounded-xl flex items-center justify-center">
                <LogOut className="w-6 h-6 text-slate-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Sign Out</h3>
                <p className="text-sm text-slate-400">Are you sure you want to sign out?</p>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setLogoutConfirmOpen(false)}
                className="flex-1 px-4 py-2.5 bg-slate-800/40 hover:bg-slate-800/60 border border-slate-700/50 rounded-xl text-white font-medium transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 px-4 py-2.5 bg-slate-700/40 hover:bg-slate-700/60 border border-slate-600/50 rounded-xl text-white font-medium transition-all"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col min-w-0">
        <header className="border-b border-slate-800/50 backdrop-blur-xl bg-slate-900/30">
          <div className="px-4 lg:px-6 py-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4 flex-1 min-w-0">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 hover:bg-slate-800/50 rounded-lg"
              >
                <Menu className="w-5 h-5 text-slate-400" />
              </button>
              <div className="flex items-center gap-2 text-sm">
                <button
                  onClick={() => navigate(createPageUrl('HRDashboard'))}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  HR Dashboard
                </button>
                <ChevronRight className="w-4 h-4 text-slate-600" />
                <span className="text-white">Recruitment Pipeline</span>
              </div>
            </div>
            <div className="flex items-center gap-2 lg:gap-3">
              <button className="flex items-center gap-2 px-3 py-2 bg-slate-800/40 border border-slate-700/50 rounded-xl text-slate-300 hover:bg-slate-800/60 transition-all text-sm">
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Export Report</span>
              </button>
              <button className="flex items-center gap-2 px-3 py-2 bg-slate-800/40 border border-slate-700/50 rounded-xl text-slate-300 hover:bg-slate-800/60 transition-all text-sm">
                <Calendar className="w-4 h-4" />
                <span className="hidden sm:inline">Schedule Panels</span>
              </button>

              <div className="relative">
                <button
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                  className="p-2 hover:bg-slate-800/50 rounded-lg relative"
                >
                  <Bell className="w-5 h-5 text-slate-400" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>

                {notificationsOpen && (
                  <div className="absolute right-0 top-full mt-2 w-96 bg-slate-900/95 backdrop-blur-xl border border-slate-700/50 rounded-xl shadow-2xl z-50">
                    <div className="p-4 border-b border-slate-700/50">
                      <h3 className="text-sm font-semibold text-white">Notifications</h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.map(notification => (
                        <div key={notification.id} className={`p-4 border-b border-slate-800/30 hover:bg-slate-800/30 cursor-pointer transition-colors ${notification.urgent ? 'bg-amber-500/5' : ''}`}>
                          <div className="flex items-start gap-3">
                            <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${notification.urgent ? 'bg-amber-400' : 'bg-blue-400'}`}></div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-white mb-1">{notification.title}</p>
                              <p className="text-xs text-slate-400 mb-2">{notification.message}</p>
                              <p className="text-xs text-slate-500">{notification.time}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="h-8 w-px bg-slate-700/50"></div>

              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">HR</span>
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-white">HR Director</p>
                  <p className="text-xs text-slate-400">Human Resources</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <div className="max-w-7xl mx-auto">
            {/* GCSO Header */}
            <div className="mb-6">
              <h2 className="text-2xl lg:text-3xl font-bold text-white mb-1">Recruitment Pipeline Analysis</h2>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-slate-400 mb-3">
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  Gwinnett County Sheriff's Office • Lawrenceville, Georgia
                </span>
                <span className="hidden sm:inline">•</span>
                <span>Monday, February 02, 2026 • 18:14 PM EST</span>
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-500">
                <span>Sheriff: Keybo Taylor</span>
                <span className="hidden sm:inline">|</span>
                <span className="text-amber-400 font-medium">Active Pipeline: {totalApplicants} applicants</span>
                <span className="hidden sm:inline">|</span>
                <span>Positions: {totalVacancies} vacancies (8 Deputy, 2 Background Inv, 1 Detention, 1 Admin)</span>
              </div>
              <div className="text-xs text-slate-600 mt-1">
                System: GCSO-HRIS v4.2 | Last Updated: 18:14:22 PM EST
              </div>
            </div>

            {/* Context Alert Bars */}
            <div className="space-y-2 mb-6">
              <div className="flex items-center gap-3 px-4 py-2.5 bg-red-500/10 border border-red-500/20 rounded-lg">
                <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                <span className="text-sm text-red-300">
                  <span className="font-medium">Background investigations:</span> 67-day avg duration - investigator capacity limiting throughput to 4-6/month
                </span>
              </div>
              <div className="flex items-center gap-3 px-4 py-2.5 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span className="text-sm text-amber-300">
                  <span className="font-medium">Interview backlog:</span> 23 candidates scheduled across 3 interview days (Feb 06, 11, 13)
                </span>
              </div>
              <div className="flex items-center gap-3 px-4 py-2.5 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <Activity className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span className="text-sm text-blue-300">
                  <span className="font-medium">Physical fitness testing:</span> Feb 07 session scheduled - 14 candidates, Training Center capacity 15 max
                </span>
              </div>
            </div>

            {/* Pipeline Overview */}
            <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-5 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Active Applicants by Position</h3>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400">Applicants-to-Vacancy Ratio:</span>
                  <span className="text-sm font-bold text-amber-400">6.4:1</span>
                  <span className="text-xs text-slate-500">(Ideal: 8-10:1)</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div className={`p-4 rounded-xl border transition-all cursor-pointer ${selectedPosition === 'deputySheriff' ? 'bg-blue-500/20 border-blue-500/50' : 'bg-slate-900/50 border-slate-700/50 hover:border-slate-600/50'}`}
                  onClick={() => setSelectedPosition(selectedPosition === 'deputySheriff' ? 'all' : 'deputySheriff')}>
                  <div className="flex items-center justify-between mb-2">
                    <Shield className="w-5 h-5 text-blue-400" />
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${positionBreakdown.deputySheriff.ratio < 5 ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}`}>
                      {positionBreakdown.deputySheriff.ratio}:1
                    </span>
                  </div>
                  <p className="text-xl font-bold text-white">{positionBreakdown.deputySheriff.applicants}</p>
                  <p className="text-xs text-slate-400">Deputy Sheriff → {positionBreakdown.deputySheriff.vacancies} vacancies</p>
                </div>

                <div className={`p-4 rounded-xl border transition-all cursor-pointer ${selectedPosition === 'backgroundInvestigator' ? 'bg-purple-500/20 border-purple-500/50' : 'bg-slate-900/50 border-slate-700/50 hover:border-slate-600/50'}`}
                  onClick={() => setSelectedPosition(selectedPosition === 'backgroundInvestigator' ? 'all' : 'backgroundInvestigator')}>
                  <div className="flex items-center justify-between mb-2">
                    <Search className="w-5 h-5 text-purple-400" />
                    <span className="px-2 py-0.5 rounded text-xs font-medium bg-green-500/20 text-green-400">
                      {positionBreakdown.backgroundInvestigator.ratio}:1
                    </span>
                  </div>
                  <p className="text-xl font-bold text-white">{positionBreakdown.backgroundInvestigator.applicants}</p>
                  <p className="text-xs text-slate-400">Background Inv → {positionBreakdown.backgroundInvestigator.vacancies} vacancies</p>
                </div>

                <div className={`p-4 rounded-xl border transition-all cursor-pointer ${selectedPosition === 'detentionOfficer' ? 'bg-amber-500/20 border-amber-500/50' : 'bg-slate-900/50 border-slate-700/50 hover:border-slate-600/50'}`}
                  onClick={() => setSelectedPosition(selectedPosition === 'detentionOfficer' ? 'all' : 'detentionOfficer')}>
                  <div className="flex items-center justify-between mb-2">
                    <Users className="w-5 h-5 text-amber-400" />
                    <span className="px-2 py-0.5 rounded text-xs font-medium bg-green-500/20 text-green-400">
                      {positionBreakdown.detentionOfficer.ratio}:1
                    </span>
                  </div>
                  <p className="text-xl font-bold text-white">{positionBreakdown.detentionOfficer.applicants}</p>
                  <p className="text-xs text-slate-400">Detention Officer → {positionBreakdown.detentionOfficer.vacancies} vacancy</p>
                </div>

                <div className={`p-4 rounded-xl border transition-all cursor-pointer ${selectedPosition === 'adminAssistant' ? 'bg-cyan-500/20 border-cyan-500/50' : 'bg-slate-900/50 border-slate-700/50 hover:border-slate-600/50'}`}
                  onClick={() => setSelectedPosition(selectedPosition === 'adminAssistant' ? 'all' : 'adminAssistant')}>
                  <div className="flex items-center justify-between mb-2">
                    <FileText className="w-5 h-5 text-cyan-400" />
                    <span className="px-2 py-0.5 rounded text-xs font-medium bg-amber-500/20 text-amber-400">
                      {positionBreakdown.adminAssistant.ratio}:1
                    </span>
                  </div>
                  <p className="text-xl font-bold text-white">{positionBreakdown.adminAssistant.applicants}</p>
                  <p className="text-xs text-slate-400">Admin Assistant → {positionBreakdown.adminAssistant.vacancies} vacancy</p>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-3 border-t border-slate-700/50">
                <span className="text-xs text-slate-500">Filter by Position:</span>
                <button
                  onClick={() => setSelectedPosition('all')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${selectedPosition === 'all' ? 'bg-amber-500 text-white' : 'bg-slate-800/60 text-slate-400 hover:text-white'}`}
                >
                  All Positions
                </button>
                <button
                  onClick={() => setSelectedPosition('deputySheriff')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${selectedPosition === 'deputySheriff' ? 'bg-blue-500 text-white' : 'bg-slate-800/60 text-slate-400 hover:text-white'}`}
                >
                  Deputy: {positionBreakdown.deputySheriff.applicants}
                </button>
                <button
                  onClick={() => setSelectedPosition('backgroundInvestigator')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${selectedPosition === 'backgroundInvestigator' ? 'bg-purple-500 text-white' : 'bg-slate-800/60 text-slate-400 hover:text-white'}`}
                >
                  Background Inv: {positionBreakdown.backgroundInvestigator.applicants}
                </button>
              </div>
            </div>

            {/* Bottleneck Analysis */}
            <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl mb-6 overflow-hidden">
              <div
                className="p-5 cursor-pointer hover:bg-slate-800/50 transition-all"
                onClick={() => setExpandedBottlenecks(!expandedBottlenecks)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-500/20 rounded-xl flex items-center justify-center">
                      <Target className="w-5 h-5 text-red-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">Pipeline Bottleneck Analysis</h3>
                      <p className="text-sm text-slate-400">Capacity constraints and resolution status</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-xs font-bold">1 Critical</span>
                    <span className="px-3 py-1 bg-amber-500/20 text-amber-400 rounded-full text-xs font-bold">1 Medium</span>
                    <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-bold">1 Resolved</span>
                    {expandedBottlenecks ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                  </div>
                </div>
              </div>

              {expandedBottlenecks && (
                <div className="border-t border-slate-700/50 p-5 space-y-4">
                  {bottlenecks.map(bottleneck => {
                    const severityColor = getSeverityColor(bottleneck.severity);
                    return (
                      <div key={bottleneck.id} className={`p-4 rounded-xl border ${severityColor.border} ${severityColor.bg}`}>
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase ${severityColor.bg} ${severityColor.text}`}>
                              {bottleneck.severity}
                            </span>
                            <h4 className="font-semibold text-white">{bottleneck.title}</h4>
                          </div>
                          {bottleneck.status && (
                            <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-medium">
                              {bottleneck.status.includes('RESOLVED') ? 'Scheduled' : 'Pending'}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-slate-300 mb-3">{bottleneck.description}</p>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                          <div>
                            <p className="text-xs text-slate-500 mb-2">Details:</p>
                            <ul className="space-y-1">
                              {bottleneck.details.map((detail, idx) => (
                                <li key={idx} className="text-xs text-slate-400 flex items-start gap-2">
                                  <span className="text-slate-600">•</span>
                                  {detail}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <p className="text-xs text-slate-500 mb-2">Impact & Solution:</p>
                            <p className="text-xs text-slate-400 mb-2"><span className="text-slate-500">Impact:</span> {bottleneck.impact}</p>
                            <p className="text-xs text-slate-400"><span className="text-slate-500">Solution:</span> {bottleneck.solution}</p>
                            {bottleneck.solutionImpact && (
                              <p className="text-xs text-green-400 mt-1"><span className="text-slate-500">Expected Result:</span> {bottleneck.solutionImpact}</p>
                            )}
                            {bottleneck.status && (
                              <p className="text-xs text-green-400 mt-2 font-medium">{bottleneck.status}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Time-to-Hire & Conversion Metrics */}
            <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl mb-6 overflow-hidden">
              <div
                className="p-5 cursor-pointer hover:bg-slate-800/50 transition-all"
                onClick={() => setExpandedMetrics(!expandedMetrics)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-500/20 rounded-xl flex items-center justify-center">
                      <BarChart3 className="w-5 h-5 text-indigo-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">Recruitment Metrics & Analysis</h3>
                      <p className="text-sm text-slate-400">Time-to-hire by position, conversion rates, historical data</p>
                    </div>
                  </div>
                  {expandedMetrics ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                </div>
              </div>

              {expandedMetrics && (
                <div className="border-t border-slate-700/50 p-5">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Time-to-Hire */}
                    <div>
                      <h4 className="text-sm font-semibold text-white mb-4">Time-to-Hire by Position Type</h4>
                      <div className="space-y-3">
                        <div className="p-3 bg-slate-900/50 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-white">Deputy Sheriff (POST Certified)</span>
                            <span className="text-lg font-bold text-blue-400">{timeToHireMetrics.deputySheriff.avgDays} days</span>
                          </div>
                          <div className="w-full bg-slate-700/50 rounded-full h-2">
                            <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${(timeToHireMetrics.deputySheriff.avgDays / 165) * 100}%` }}></div>
                          </div>
                        </div>
                        <div className="p-3 bg-slate-900/50 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-white">Deputy Sheriff (Academy Required)</span>
                            <span className="text-lg font-bold text-purple-400">{timeToHireMetrics.deputyAcademy.avgDays}+ days</span>
                          </div>
                          <div className="w-full bg-slate-700/50 rounded-full h-2">
                            <div className="bg-purple-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                          </div>
                          <p className="text-xs text-slate-500 mt-1">{timeToHireMetrics.deputyAcademy.note}</p>
                        </div>
                        <div className="p-3 bg-slate-900/50 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-white">Background Investigator (Internal)</span>
                            <span className="text-lg font-bold text-amber-400">{timeToHireMetrics.backgroundInvestigator.avgDays} days</span>
                          </div>
                          <div className="w-full bg-slate-700/50 rounded-full h-2">
                            <div className="bg-amber-500 h-2 rounded-full" style={{ width: `${(timeToHireMetrics.backgroundInvestigator.avgDays / 165) * 100}%` }}></div>
                          </div>
                          <p className="text-xs text-slate-500 mt-1">{timeToHireMetrics.backgroundInvestigator.note}</p>
                        </div>
                        <div className="p-3 bg-slate-900/50 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-white">Administrative Assistant (Civilian)</span>
                            <span className="text-lg font-bold text-green-400">{timeToHireMetrics.adminAssistant.avgDays} days</span>
                          </div>
                          <div className="w-full bg-slate-700/50 rounded-full h-2">
                            <div className="bg-green-500 h-2 rounded-full" style={{ width: `${(timeToHireMetrics.adminAssistant.avgDays / 165) * 100}%` }}></div>
                          </div>
                          <p className="text-xs text-slate-500 mt-1">{timeToHireMetrics.adminAssistant.note}</p>
                        </div>
                      </div>
                    </div>

                    {/* Conversion Rates */}
                    <div>
                      <h4 className="text-sm font-semibold text-white mb-4">Pipeline Conversion Rates (Historical)</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-2 bg-slate-900/50 rounded-lg">
                          <span className="text-xs text-slate-400">Application → Screening</span>
                          <span className="text-sm font-bold text-white">{conversionRates.applicationToScreening}%</span>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-slate-900/50 rounded-lg">
                          <span className="text-xs text-slate-400">Screening → Physical Test</span>
                          <span className="text-sm font-bold text-white">{conversionRates.screeningToPhysicalTest}%</span>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-slate-900/50 rounded-lg">
                          <span className="text-xs text-slate-400">Physical Test → Interview</span>
                          <span className="text-sm font-bold text-white">{conversionRates.physicalTestToInterview}%</span>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-slate-900/50 rounded-lg">
                          <span className="text-xs text-slate-400">Interview → Background</span>
                          <span className="text-sm font-bold text-white">{conversionRates.interviewToBackground}%</span>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-slate-900/50 rounded-lg">
                          <span className="text-xs text-slate-400">Background → Cleared</span>
                          <span className="text-sm font-bold text-amber-400">{conversionRates.backgroundToCleared}%</span>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-slate-900/50 rounded-lg">
                          <span className="text-xs text-slate-400">Offer → Accepted</span>
                          <span className="text-sm font-bold text-white">{conversionRates.offerToAccepted}%</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-indigo-500/10 border border-indigo-500/30 rounded-lg">
                          <span className="text-sm text-indigo-300 font-medium">Overall: Application → Hire</span>
                          <span className="text-lg font-bold text-indigo-400">{conversionRates.overallApplicationToHire}%</span>
                        </div>
                        <p className="text-xs text-slate-500">
                          Of {totalApplicants} applicants, expect ~{Math.round(totalApplicants * conversionRates.overallApplicationToHire / 100)}-{Math.round(totalApplicants * 0.35)} eventual hires (need {totalVacancies} positions)
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Pipeline Stages */}
            <div className="space-y-4">
              {pipelineStages.map((stage, stageIdx) => {
                const Icon = stage.icon;
                const colorConfig = getStageColor(stage.color);
                const isExpanded = selectedStage === stage.id;

                return (
                  <div key={stage.id} className={`bg-slate-800/40 border rounded-xl overflow-hidden ${stage.isCriticalBottleneck ? 'border-red-500/30' : 'border-slate-700/50'}`}>
                    <div
                      className="p-5 cursor-pointer hover:bg-slate-800/50 transition-all"
                      onClick={() => setSelectedStage(isExpanded ? null : stage.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 flex-1">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colorConfig.bg}`}>
                            <Icon className={`w-6 h-6 ${colorConfig.text}`} />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-1">
                              <h3 className="text-lg font-semibold text-white">{stage.name}</h3>
                              <span className={`px-3 py-1 rounded-full text-sm font-bold ${colorConfig.bg} ${colorConfig.text}`}>
                                {stage.count} candidates
                              </span>
                              {stage.isCriticalBottleneck && (
                                <span className="px-2.5 py-1 bg-red-500/20 text-red-400 rounded-full text-xs font-bold">
                                  BOTTLENECK
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-4 text-xs text-slate-400">
                              <span>Stage {stageIdx + 1} of {pipelineStages.length}</span>
                              <span>•</span>
                              <span>{stage.percentOfPipeline}% of pipeline</span>
                              {stage.passRate && (
                                <>
                                  <span>•</span>
                                  <span className="text-green-400">Historical pass rate: {stage.passRate}%</span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          {stageIdx < pipelineStages.length - 1 && (
                            <ArrowRight className="w-5 h-5 text-slate-600" />
                          )}
                          {isExpanded ? (
                            <ChevronUp className="w-5 h-5 text-slate-400" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-slate-400" />
                          )}
                        </div>
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="border-t border-slate-700/50 p-5 bg-slate-900/30">
                        <p className="text-sm text-slate-400 mb-4">{stage.description}</p>

                        {/* Stage-specific content */}
                        {stage.id === 'screening' && stage.physicalTestSchedule && (
                          <div className="mb-4 p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl">
                            <div className="flex items-center gap-2 mb-3">
                              <Calendar className="w-4 h-4 text-amber-400" />
                              <h4 className="font-semibold text-amber-400">Physical Fitness Test Scheduled</h4>
                            </div>
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
                              <div>
                                <p className="text-xs text-slate-500">Date</p>
                                <p className="text-white font-medium">{stage.physicalTestSchedule.date}</p>
                              </div>
                              <div>
                                <p className="text-xs text-slate-500">Time</p>
                                <p className="text-white font-medium">{stage.physicalTestSchedule.time}</p>
                              </div>
                              <div>
                                <p className="text-xs text-slate-500">Candidates</p>
                                <p className="text-white font-medium">{stage.physicalTestSchedule.candidatesScheduled} / {stage.physicalTestSchedule.maxCapacity} capacity</p>
                              </div>
                              <div>
                                <p className="text-xs text-slate-500">Location</p>
                                <p className="text-white font-medium">{stage.physicalTestSchedule.location}</p>
                              </div>
                            </div>
                            <p className="text-xs text-slate-500 mt-2">Test: {stage.physicalTestSchedule.test}</p>
                          </div>
                        )}

                        {stage.id === 'interview' && stage.scheduledInterviews && (
                          <div className="space-y-3 mb-4">
                            {stage.scheduledInterviews.map((interview, idx) => (
                              <div key={idx} className="p-4 bg-slate-800/60 rounded-xl">
                                <div className="flex items-center justify-between mb-3">
                                  <h4 className="font-semibold text-white">{interview.position} - Oral Board</h4>
                                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${interview.materialsReady ? 'bg-green-500/20 text-green-400' : 'bg-amber-500/20 text-amber-400'}`}>
                                    {interview.materialsReady ? 'Materials Ready' : 'Pending PT Completion'}
                                  </span>
                                </div>
                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
                                  <div>
                                    <p className="text-xs text-slate-500">Date</p>
                                    <p className="text-white font-medium">{interview.date}</p>
                                  </div>
                                  <div>
                                    <p className="text-xs text-slate-500">Time</p>
                                    <p className="text-white font-medium">{interview.time}</p>
                                  </div>
                                  <div>
                                    <p className="text-xs text-slate-500">Candidates</p>
                                    <p className="text-white font-medium">{interview.candidates} scheduled</p>
                                  </div>
                                  <div>
                                    <p className="text-xs text-slate-500">Location</p>
                                    <p className="text-white font-medium">{interview.location}</p>
                                  </div>
                                </div>
                                <div className="mt-3 pt-3 border-t border-slate-700/50">
                                  <p className="text-xs text-slate-500 mb-1">Interview Panel:</p>
                                  <p className="text-xs text-slate-400">{interview.panel.join(' • ')}</p>
                                  <p className="text-xs text-slate-500 mt-2">Format: {interview.format}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {stage.id === 'background' && stage.investigatorCapacity && (
                          <div className="mb-4">
                            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl mb-4">
                              <h4 className="font-semibold text-red-400 mb-3">Investigator Capacity Analysis</h4>
                              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                <div>
                                  <p className="text-xs text-slate-500 mb-2">Current Investigators:</p>
                                  {stage.investigatorCapacity.investigators.map((inv, idx) => (
                                    <div key={idx} className="flex items-center justify-between p-2 bg-slate-900/50 rounded-lg mb-2">
                                      <div>
                                        <p className="text-sm font-medium text-white">{inv.name}</p>
                                        <p className="text-xs text-slate-500">{inv.title}</p>
                                      </div>
                                      <div className="text-right">
                                        <p className="text-sm font-bold text-amber-400">{inv.activeCases}/{inv.maxCapacity} cases</p>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                                <div>
                                  <p className="text-xs text-slate-500 mb-2">Investigation Timeline:</p>
                                  <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                      <span className="text-slate-400">Average Duration:</span>
                                      <span className="text-white font-medium">{stage.investigatorCapacity.avgDuration} days</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                      <span className="text-slate-400">Minimum (Lateral):</span>
                                      <span className="text-white font-medium">{stage.investigatorCapacity.minDuration} days</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                      <span className="text-slate-400">Maximum (Complex):</span>
                                      <span className="text-white font-medium">{stage.investigatorCapacity.maxDuration}+ days</span>
                                    </div>
                                    <div className="flex justify-between text-sm pt-2 border-t border-slate-700/50">
                                      <span className="text-slate-400">Monthly Throughput:</span>
                                      <span className="text-amber-400 font-medium">4-6 investigations</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="p-4 bg-slate-800/60 rounded-xl">
                              <h4 className="font-semibold text-white mb-3">Active Investigations</h4>
                              <div className="space-y-2">
                                {stage.activeInvestigations.map((inv, idx) => (
                                  <div key={idx} className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg">
                                    <div className="flex items-center gap-3">
                                      <div className="w-8 h-8 bg-indigo-500/20 rounded-full flex items-center justify-center">
                                        <Users className="w-4 h-4 text-indigo-400" />
                                      </div>
                                      <div>
                                        <p className="text-sm font-medium text-white">{inv.name}</p>
                                        <p className="text-xs text-slate-500">{inv.position} • {inv.investigator}</p>
                                      </div>
                                    </div>
                                    <div className="text-right">
                                      <p className="text-sm font-bold text-white">{inv.daysInProgress} days</p>
                                      <p className="text-xs text-slate-400">{inv.status}</p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}

                        {stage.id === 'offer' && stage.offersPending && (
                          <div className="mb-4">
                            <div className="space-y-3 mb-4">
                              {stage.offersPending.map((offer, idx) => (
                                <div key={idx} className={`p-4 rounded-xl border ${offer.urgent ? 'bg-red-500/10 border-red-500/30' : 'bg-slate-800/60 border-slate-700/50'}`}>
                                  <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-3">
                                      <h4 className="font-semibold text-white">{offer.name}</h4>
                                      <span className="text-xs text-slate-500">{offer.refNumber}</span>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                      offer.status.includes('ACCEPTED') ? 'bg-green-500/20 text-green-400' :
                                      offer.urgent ? 'bg-red-500/20 text-red-400' : 'bg-amber-500/20 text-amber-400'
                                    }`}>
                                      {offer.status}
                                    </span>
                                  </div>
                                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
                                    <div>
                                      <p className="text-xs text-slate-500">Position</p>
                                      <p className="text-white">{offer.position}</p>
                                    </div>
                                    <div>
                                      <p className="text-xs text-slate-500">Salary</p>
                                      <p className="text-white">{offer.salary}</p>
                                    </div>
                                    <div>
                                      <p className="text-xs text-slate-500">Offer Date</p>
                                      <p className="text-white">{offer.offerDate}</p>
                                    </div>
                                    <div>
                                      <p className="text-xs text-slate-500">{offer.startDate ? 'Start Date' : 'Response Deadline'}</p>
                                      <p className={`${offer.urgent ? 'text-red-400 font-bold' : 'text-white'}`}>
                                        {offer.startDate || offer.startDateOffered}
                                        {offer.daysRemaining === 0 && !offer.startDate && ' (TODAY)'}
                                      </p>
                                    </div>
                                  </div>
                                  {offer.notes && (
                                    <p className="text-xs text-slate-500 mt-3 pt-3 border-t border-slate-700/50">
                                      Note: {offer.notes}
                                    </p>
                                  )}
                                </div>
                              ))}
                            </div>

                            <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl">
                              <h4 className="font-semibold text-amber-400 mb-3">Salary Competitiveness Issue</h4>
                              <div className="grid grid-cols-3 gap-4 text-sm">
                                <div className="text-center p-3 bg-slate-900/50 rounded-lg">
                                  <p className="text-xs text-slate-500 mb-1">GCSO Deputy I</p>
                                  <p className="text-lg font-bold text-white">${stage.salaryCompetitiveness.gcsoDeputy.toLocaleString()}</p>
                                </div>
                                <div className="text-center p-3 bg-slate-900/50 rounded-lg">
                                  <p className="text-xs text-slate-500 mb-1">Gwinnett County PD</p>
                                  <p className="text-lg font-bold text-red-400">${stage.salaryCompetitiveness.gwinnettPD.toLocaleString()}</p>
                                  <p className="text-xs text-red-400">{stage.salaryCompetitiveness.gwinnettPDDiff}</p>
                                </div>
                                <div className="text-center p-3 bg-slate-900/50 rounded-lg">
                                  <p className="text-xs text-slate-500 mb-1">Fulton County SO</p>
                                  <p className="text-lg font-bold text-amber-400">${stage.salaryCompetitiveness.fultonSO.toLocaleString()}</p>
                                  <p className="text-xs text-amber-400">{stage.salaryCompetitiveness.fultonSODiff}</p>
                                </div>
                              </div>
                              <p className="text-xs text-slate-400 mt-3">
                                Risk: Losing qualified candidates to higher-paying agencies during offer stage
                              </p>
                            </div>
                          </div>
                        )}

                        {/* Candidates list */}
                        {stage.candidates && stage.candidates.length > 0 && (
                          <div className="space-y-3">
                            <h4 className="text-sm font-semibold text-slate-300">Candidates in Stage</h4>
                            {stage.candidates.map(candidate => {
                              const isCandidateExpanded = expandedCandidate === candidate.id;
                              return (
                                <div key={candidate.id} className="bg-slate-800/40 rounded-xl overflow-hidden">
                                  <div
                                    className="p-4 cursor-pointer hover:bg-slate-800/60 transition-all"
                                    onClick={() => setExpandedCandidate(isCandidateExpanded ? null : candidate.id)}
                                  >
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center gap-3 flex-1">
                                        <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
                                          <Users className="w-5 h-5 text-blue-400" />
                                        </div>
                                        <div className="flex-1">
                                          <div className="flex items-center gap-3 mb-1">
                                            <h4 className="text-sm font-semibold text-white">{candidate.name}</h4>
                                            <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                                              candidate.status === 'Interview Complete' ? 'bg-green-500/20 text-green-400' :
                                              candidate.status === 'Accepted' ? 'bg-green-500/20 text-green-400' :
                                              candidate.urgent ? 'bg-red-500/20 text-red-400' :
                                              'bg-slate-700/50 text-slate-300'
                                            }`}>
                                              {candidate.status}
                                            </span>
                                            {candidate.score && (
                                              <span className="text-xs text-amber-400 font-bold">{candidate.score}</span>
                                            )}
                                            {candidate.rank && (
                                              <span className="text-xs text-green-400">{candidate.rank}</span>
                                            )}
                                          </div>
                                          <p className="text-xs text-slate-400">{candidate.position}</p>
                                        </div>
                                      </div>
                                      <div className="flex items-center gap-4 text-xs text-slate-400">
                                        <span>{candidate.daysInStage} days in stage</span>
                                        {isCandidateExpanded ? (
                                          <ChevronUp className="w-4 h-4" />
                                        ) : (
                                          <ChevronDown className="w-4 h-4" />
                                        )}
                                      </div>
                                    </div>
                                  </div>

                                  {isCandidateExpanded && (
                                    <div className="border-t border-slate-700/50 p-4 bg-slate-900/50">
                                      <div className="grid grid-cols-2 gap-3 mb-4">
                                        <div className="bg-slate-800/60 rounded-lg p-3">
                                          <p className="text-xs text-slate-400 mb-1">Next Action</p>
                                          <p className="text-sm font-medium text-white">{candidate.nextAction}</p>
                                        </div>
                                        <div className="bg-slate-800/60 rounded-lg p-3">
                                          <p className="text-xs text-slate-400 mb-1">Action Date</p>
                                          <p className="text-sm font-medium text-white">{new Date(candidate.actionDate).toLocaleDateString()}</p>
                                        </div>
                                      </div>
                                      {candidate.qualifications && (
                                        <div className="bg-slate-800/60 rounded-lg p-3 mb-4">
                                          <p className="text-xs text-slate-400 mb-1">Qualifications</p>
                                          <p className="text-sm text-white">{candidate.qualifications}</p>
                                        </div>
                                      )}
                                      {candidate.investigator && (
                                        <div className="bg-slate-800/60 rounded-lg p-3 mb-4">
                                          <p className="text-xs text-slate-400 mb-1">Assigned Investigator</p>
                                          <p className="text-sm text-white">{candidate.investigator}</p>
                                          {candidate.completedItems && (
                                            <div className="mt-2">
                                              <div className="flex justify-between text-xs mb-1">
                                                <span className="text-slate-500">Investigation Progress</span>
                                                <span className="text-slate-400">{candidate.completedItems}/{candidate.totalItems} items</span>
                                              </div>
                                              <div className="w-full bg-slate-700/50 rounded-full h-2">
                                                <div className="bg-indigo-500 h-2 rounded-full" style={{ width: `${(candidate.completedItems / candidate.totalItems) * 100}%` }}></div>
                                              </div>
                                            </div>
                                          )}
                                        </div>
                                      )}
                                      <div className="flex gap-2">
                                        <button className="flex-1 px-3 py-2 bg-green-500/20 hover:bg-green-500/30 border border-green-500/30 text-green-400 rounded-lg text-xs font-medium transition-all">
                                          Advance to Next Stage
                                        </button>
                                        <button className="flex-1 px-3 py-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 text-blue-400 rounded-lg text-xs font-medium transition-all">
                                          View Full Profile
                                        </button>
                                        <button className="px-3 py-2 bg-slate-700/40 hover:bg-slate-700/60 border border-slate-600/50 text-slate-300 rounded-lg text-xs font-medium transition-all">
                                          Add Note
                                        </button>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        )}
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
        {chatOpen ? <X className="w-6 h-6 text-white" /> : <MessageCircle className="w-6 h-6 text-white" />}
      </button>

      {chatOpen && (
        <div className="fixed bottom-24 right-6 w-full max-w-96 h-[500px] bg-slate-900/95 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl flex flex-col z-40 mx-4 sm:mx-0">
          <div className="p-4 border-b border-slate-700/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">Pipeline Assistant</h3>
                <p className="text-xs text-green-400">Online</p>
              </div>
            </div>
          </div>
          <div className="flex-1 p-4 overflow-y-auto">
            <div className="flex gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <div className="bg-slate-800/60 p-3 rounded-xl">
                  <p className="text-sm text-slate-200">I can help you analyze pipeline bottlenecks, review candidate status, check investigator workload, or schedule interview panels. What information do you need?</p>
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 border-t border-slate-700/50">
            <div className="flex items-center gap-2">
              <input type="text" placeholder="Ask about pipeline status..." className="flex-1 px-4 py-2 bg-slate-800/40 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50" />
              <button className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
                <Send className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

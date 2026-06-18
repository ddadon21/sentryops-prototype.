import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { LayoutDashboard, FolderOpen, FileText, Clock, UserCheck, Calendar, FileCheck, CheckCircle, CheckCircle2, TrendingUp, AlertTriangle, DollarSign, Eye, Activity, XCircle, Settings, Bell, Search, ChevronRight, Shield, X, Menu, ChevronLeft, LogOut, Plus, Phone, Mail, ChevronDown, User, Users, AlertCircle, Circle, HelpCircle, BookOpen, ExternalLink, Download, Printer, Filter, MapPin, Briefcase, FileWarning, ClipboardList } from 'lucide-react';
import DashboardLayout from '../layouts/DashboardLayout';
import { biNavigation, biProfile, biNotifications } from '../config/biConfig';

// Helper: Reference status badge
const getRefStatusBadge = (status) => {
  switch (status) {
    case 'Completed':
      return <span className="px-2.5 py-1 bg-green-500/10 text-green-400 rounded-lg text-xs font-medium flex items-center gap-1.5"><CheckCircle2 className="w-3 h-3" />Completed</span>;
    case 'Pending Callback':
      return <span className="px-2.5 py-1 bg-amber-500/10 text-amber-700 rounded-lg text-xs font-medium flex items-center gap-1.5"><Clock className="w-3 h-3" />Pending Callback</span>;
    case 'Not Yet Contacted':
      return <span className="px-2.5 py-1 bg-slate-500/10 text-secondary rounded-lg text-xs font-medium flex items-center gap-1.5"><AlertCircle className="w-3 h-3" />Not Yet Contacted</span>;
    case 'Scheduled':
      return <span className="px-2.5 py-1 bg-blue-500/10 text-blue-400 rounded-lg text-xs font-medium flex items-center gap-1.5"><Calendar className="w-3 h-3" />Scheduled</span>;
    case 'Required':
      return <span className="px-2.5 py-1 bg-red-500/10 text-red-400 rounded-lg text-xs font-medium flex items-center gap-1.5"><AlertTriangle className="w-3 h-3" />Required</span>;
    default:
      return <span className="px-2.5 py-1 bg-slate-500/10 text-secondary rounded-lg text-xs font-medium">{status}</span>;
  }
};

// Helper: Outcome badge (qualitative, not numerical)
const getOutcomeBadge = (outcome) => {
  switch (outcome) {
    case 'Strongly Positive':
      return <span className="px-2.5 py-1 bg-green-500/10 text-green-400 rounded-lg text-xs font-medium">Strongly Positive</span>;
    case 'Positive':
      return <span className="px-2.5 py-1 bg-green-500/10 text-green-300 rounded-lg text-xs font-medium">Positive</span>;
    case 'Neutral':
      return <span className="px-2.5 py-1 bg-slate-500/10 text-secondary rounded-lg text-xs font-medium">Neutral</span>;
    case 'Negative':
      return <span className="px-2.5 py-1 bg-red-500/10 text-red-400 rounded-lg text-xs font-medium">Negative</span>;
    default:
      return null;
  }
};

// Helper: Reference type badge
const getRefTypeBadge = (type) => {
  switch (type) {
    case 'Employment (Current)':
      return <span className="px-2.5 py-1 bg-blue-500/10 text-blue-400 rounded-lg text-xs font-medium flex items-center gap-1"><Briefcase className="w-3 h-3" />Employment (Current)</span>;
    case 'Employment (Former)':
      return <span className="px-2.5 py-1 bg-cyan-500/10 text-cyan-400 rounded-lg text-xs font-medium flex items-center gap-1"><Briefcase className="w-3 h-3" />Employment (Former)</span>;
    case 'Professional LE':
      return <span className="px-2.5 py-1 bg-purple-500/10 text-purple-400 rounded-lg text-xs font-medium flex items-center gap-1"><Shield className="w-3 h-3" />Professional LE</span>;
    case 'Personal':
      return <span className="px-2.5 py-1 bg-amber-500/10 text-amber-700 rounded-lg text-xs font-medium flex items-center gap-1"><Users className="w-3 h-3" />Personal</span>;
    default:
      return <span className="px-2.5 py-1 bg-slate-500/10 text-secondary rounded-lg text-xs font-medium">{type}</span>;
  }
};

export default function ReferenceChecks() {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState('reference-checks');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [logoutConfirmOpen, setLogoutConfirmOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [selectedView, setSelectedView] = useState('pending');
  const [expandedRef, setExpandedRef] = useState(null);

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
    date: 'Monday, January 27, 2026',
    time: '9:27 PM EST',
  };

  const investigatorInfo = {
    name: 'Agent Brooks',
    badge: 'BI-107',
  };

  const navigation = [
    { id: 'bi-dashboard', label: 'BI Dashboard', icon: LayoutDashboard, page: 'BackgroundsDashboard' },
    { id: 'active-cases', label: 'Active Cases', icon: FolderOpen, page: 'ActiveCases' },
    { id: 'case-management', label: 'Case Management', icon: FileText, page: 'CaseManagement' },
    { id: 'investigation-timeline', label: 'Investigation Timeline', icon: Clock, page: 'InvestigationTimeline' },
    { id: 'subject-records', label: 'Subject Records', icon: UserCheck, page: 'SubjectRecords' },
    { id: 'interview-scheduling', label: 'Interview Scheduling', icon: Calendar, page: 'InterviewScheduling' },
    { id: 'evidence-tracking', label: 'Evidence Tracking', icon: FileCheck, page: 'EvidenceTracking' },
    { id: 'reference-checks', label: 'Reference Checks', icon: CheckCircle },
    { id: 'employment-verification', label: 'Employment Verification', icon: TrendingUp, page: 'EmploymentVerification' },
    { id: 'criminal-history', label: 'Criminal History Review', icon: AlertTriangle, page: 'CriminalHistoryReview' },
    { id: 'financial-background', label: 'Financial Background', icon: DollarSign, page: 'FinancialBackground' },
    { id: 'social-media', label: 'Social Media Analysis', icon: Eye, page: 'SocialMediaAnalysis' },
    { id: 'bi-reports', label: 'BI Reports', icon: Activity, page: 'BIReports' },
    { id: 'case-closure', label: 'Case Closure', icon: XCircle, page: 'CaseClosure' }
  ];

  const references = [
    {
      id: 1,
      caseId: 'BI-2024-145',
      subject: 'Robert Martinez',
      positionApplied: 'Deputy Sheriff',
      referenceName: 'Sgt. John Davis',
      rankPosition: 'Patrol Sergeant',
      relationship: 'Current Supervisor',
      relationshipDetail: 'Current direct supervisor (immediate supervisor). Martinez assigned to Sgt. Davis\'s squad since 2022 (3 years). Martinez currently works under Davis.',
      organization: 'Metro Atlanta Police Department',
      badge: '2456',
      phone: '(404) 555-0101',
      email: 'j.davis@metropd.gov',
      status: 'Completed',
      referenceType: 'Employment (Current)',
      yearsKnown: '3 years (2022–Present)',
      capacity: 'Supervisory — Martinez assigned to Davis\'s squad',
      interview: {
        date: 'Jan 23, 2026',
        time: '10:00 AM – 10:22 AM EST (22 minutes)',
        method: 'Phone interview',
        interviewer: 'Agent Brooks (Badge #BI-107)',
        notesPages: '4 pages (comprehensive)'
      },
      outcome: 'Strongly Positive',
      wouldRecommend: 'YES (STRONGLY)',
      recommendQuote: 'Without hesitation. He\'s one of our best officers.',
      performance: {
        overall: '"Above average" (top 25% of officers)',
        workQuality: '"Excellent — thorough reports, good decisions"',
        reliability: '"100% reliable — never misses shifts"',
        professionalism: '"Very professional with public & peers"'
      },
      strengths: [
        'Excellent judgment under pressure',
        'Outstanding report writing',
        'Strong community engagement',
        'Good de-escalation skills',
        'Respected by peers'
      ],
      areasForImprovement: [
        { item: 'Could be more proactive with self-initiated activity', context: 'Not a major issue, just an observation' }
      ],
      concerns: 'None identified',
      concernsQuote: '"No significant weaknesses. He\'s a solid officer."',
      disciplinary: {
        sustainedComplaints: 0,
        unsustainedComplaints: '1 (2020 — unfounded)',
        useOfForce: '2 incidents (both justified)',
        disciplinaryActions: 0
      },
      reasonForLeaving: '"Seeking career advancement. Lateral move appropriate."',
      eligibleForRehire: 'YES',
      rehireQuote: '"Absolutely. Would welcome him back with open arms."',
      bradyGiglio: 'None identified',
      bradyGiglioDetail: 'No credibility impairments, untruthfulness, or bias issues',
      investigatorAssessment: 'Strongly positive reference from current supervisor. No concerns identified. Supervisor supports lateral transfer. Proceed with investigation. This is an excellent reference.'
    },
    {
      id: 2,
      caseId: 'BI-2024-145',
      subject: 'Robert Martinez',
      positionApplied: 'Deputy Sheriff',
      referenceName: 'Capt. Sarah Williams',
      rankPosition: 'Captain, Patrol Division Commander',
      relationship: 'Former Supervisor',
      relationshipDetail: 'Former supervisor (2018–2022). Patrol Division Commander during Martinez\'s first 4 years. No longer direct supervisor (promoted 2022).',
      organization: 'Metro Atlanta Police Department',
      badge: '1789',
      phone: '(404) 555-0102',
      email: 's.williams@metropd.gov',
      status: 'Completed',
      referenceType: 'Employment (Former)',
      yearsKnown: '4 years (supervised 2018–2022)',
      capacity: 'Supervisory — Patrol Division Commander during first 4 years',
      interview: {
        date: 'Jan 23, 2026',
        time: '2:00 PM – 2:18 PM EST (18 minutes)',
        method: 'Phone interview',
        interviewer: 'Agent Brooks (Badge #BI-107)',
        notesPages: '3 pages'
      },
      outcome: 'Positive',
      wouldRecommend: 'YES',
      recommendQuote: '"Yes, I recommend him. He\'s a good officer."',
      performance: {
        overall: '"Solid officer, reliable, good community engagement"',
        workQuality: '"Good reports, thorough investigations"',
        reliability: '"Dependable — showed up and did the work"'
      },
      strengths: [
        'Excellent de-escalation skills',
        'Respected by community residents',
        'Worked well with peers',
        'Handled stressful situations calmly'
      ],
      areasForImprovement: [
        { item: 'Could be more proactive with self-initiated activity', context: 'Consistent with current supervisor\'s feedback' }
      ],
      concerns: 'None identified',
      concernsQuote: null,
      disciplinary: {
        sustainedComplaints: 0,
        disciplinaryActions: 0,
        note: '"No disciplinary issues under my command"'
      },
      reasonForLeaving: '"Has potential for advancement. Lateral move appropriate."',
      eligibleForRehire: 'YES',
      rehireQuote: '"Yes, we\'d take him back if he wanted to return."',
      bradyGiglio: 'None identified',
      bradyGiglioDetail: 'No credibility impairments identified',
      investigatorAssessment: 'Positive reference from former supervisor. Consistent with current supervisor\'s assessment. No concerns. Proceed.'
    },
    {
      id: 3,
      caseId: 'BI-2024-145',
      subject: 'Robert Martinez',
      positionApplied: 'Deputy Sheriff',
      referenceName: 'Officer Michael Brown',
      rankPosition: 'Senior Patrol Officer',
      relationship: 'Colleague / Former Field Training Officer (FTO)',
      relationshipDetail: 'Was Martinez\'s Field Training Officer (FTO) in 2018 and worked alongside him for 6 years.',
      organization: 'Metro Atlanta Police Department',
      badge: '1923',
      phone: '(404) 555-0103',
      email: 'm.brown@metropd.gov',
      status: 'Pending Callback',
      referenceType: 'Professional LE',
      yearsKnown: '6 years (2018–Present)',
      capacity: 'FTO in 2018, then colleague on same patrol shift',
      contactAttempts: [
        {
          attemptNumber: 1,
          date: 'Jan 23, 2026 at 10:30 AM',
          method: 'Phone call to (404) 555-0103',
          outcome: 'Left voicemail (no answer)',
          message: 'Identified self as BI investigator, requested callback for employment reference, left number'
        }
      ],
      nextActions: {
        followUpDate: 'Jan 27, 2026 (4 days after initial contact)',
        action: 'If no callback by Jan 27, attempt second contact',
        escalation: 'If no response after 3 attempts, may substitute with alternate reference (not critical — already have 2 strong supervisor references)',
        priority: 'MEDIUM (not urgent — supervisory refs complete)'
      },
      plannedInterview: {
        estimatedDuration: '15–20 minutes',
        type: 'Phone interview',
        assignedTo: 'Agent Brooks',
        topics: 'FTO experience with Martinez, peer relationship, work performance, professionalism'
      },
      investigatorNotes: 'Officer Brown was Martinez\'s FTO in 2018 when Martinez joined Metro PD. His perspective would be valuable as he trained Martinez and worked alongside him for 6 years. However, not critical — we already have strong positive references from current and former supervisors. If Brown doesn\'t respond after 3 attempts, can proceed without.'
    },
    {
      id: 4,
      caseId: 'BI-2024-145',
      subject: 'Robert Martinez',
      positionApplied: 'Deputy Sheriff',
      referenceName: 'Additional Personal Reference',
      rankPosition: null,
      relationship: 'Personal reference (to be identified)',
      relationshipDetail: null,
      organization: null,
      badge: null,
      phone: null,
      email: null,
      status: 'Required',
      referenceType: 'Personal',
      yearsKnown: null,
      capacity: null,
      policyRequirement: {
        totalRequired: '3–5 total references',
        employmentRequired: '2 required (2 completed)',
        personalRequired: '2–3 required (0 completed)',
        criteria: 'Non-family, known 2+ years, can speak to character'
      },
      actionRequired: {
        action: 'Contact applicant — request 2–3 personal references',
        requiredInfo: 'Name, phone, email, relationship, years known',
        targetDate: 'Jan 28, 2026',
        examples: 'Neighbors, friends, community contacts, volunteer associates. Should not be family members.'
      },
      investigatorNotes: 'Need to contact Martinez and request 2–3 personal references (non-law enforcement contacts who can speak to his character, integrity, and suitability for law enforcement). Examples: neighbors, friends, community contacts, volunteer associates. Should not be family members.'
    }
  ];

  const notifications = [
    { id: 1, title: 'Reference Completed', message: 'Capt. Williams interview documented — Positive', time: '1 hour ago', urgent: false },
    { id: 2, title: 'Follow-up Required', message: 'Officer Brown — No response (1 attempt, follow up Jan 27)', time: '3 hours ago', urgent: true },
    { id: 3, title: 'Action Required', message: 'Personal references needed — contact applicant', time: '5 hours ago', urgent: true }
  ];

  const pendingRefs = references.filter(r => r.status !== 'Completed');
  const completedRefs = references.filter(r => r.status === 'Completed');

  const getFilteredRefs = () => {
    switch (selectedView) {
      case 'pending': return pendingRefs;
      case 'completed': return completedRefs;
      case 'all': return references;
      case 'contactlog': return references.filter(r => r.contactAttempts && r.contactAttempts.length > 0);
      default: return references;
    }
  };

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
              <h2 className="text-2xl lg:text-3xl font-bold text-primary mb-2">Reference Checks</h2>
              <p className="text-secondary mb-3">Professional and personal reference verification for background investigations</p>
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
                  <Users className="w-4 h-4 text-secondary" />
                  Total references tracked: {references.length} references across active cases
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-amber-700" />
                  Pending completion: {pendingRefs.length} references (awaiting callbacks)
                </span>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <button className="flex items-center gap-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-medium transition-colors text-sm">
                <Plus className="w-4 h-4" />Add Reference
              </button>
              <button className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-zinc-900/40 hover:bg-slate-100 dark:hover:bg-zinc-900/60 border border-slate-700/50 text-secondary rounded-xl font-medium transition-colors text-sm">
                <Calendar className="w-4 h-4" />Schedule Interview
              </button>
              <button className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-zinc-900/40 hover:bg-slate-100 dark:hover:bg-zinc-900/60 border border-slate-700/50 text-secondary rounded-xl font-medium transition-colors text-sm">
                <Users className="w-4 h-4" />View All References
              </button>
              <button className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-zinc-900/40 hover:bg-slate-100 dark:hover:bg-zinc-900/60 border border-slate-700/50 text-secondary rounded-xl font-medium transition-colors text-sm">
                <Download className="w-4 h-4" />Export Reference Report
              </button>
              <button className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-zinc-900/40 hover:bg-slate-100 dark:hover:bg-zinc-900/60 border border-slate-700/50 text-secondary rounded-xl font-medium transition-colors text-sm">
                <Phone className="w-4 h-4" />Contact Pending
              </button>
              <button className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-zinc-900/40 hover:bg-slate-100 dark:hover:bg-zinc-900/60 border border-slate-700/50 text-secondary rounded-xl font-medium transition-colors text-sm">
                <Printer className="w-4 h-4" />Print Reference Log
              </button>
            </div>

            {/* Reference Check Status Summary */}
            <div className="mb-6 bg-gradient-to-br from-amber-500/10 to-amber-600/5 border border-amber-500/20 rounded-xl p-5">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 bg-amber-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <ClipboardList className="w-6 h-6 text-amber-700" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h4 className="text-base font-semibold text-primary">Reference Check Status Summary</h4>
                    <span className="text-xs text-slate-500">As of {currentDateTime.date} at {currentDateTime.time}</span>
                  </div>
                </div>
              </div>

              {/* Overall Status */}
              <div className="bg-white dark:bg-zinc-950/40 rounded-lg p-4 mb-4">
                <h5 className="text-sm font-semibold text-secondary mb-3">Overall Status</h5>
                <div className="space-y-1.5 text-sm">
                  <div className="text-secondary">Total references required: <span className="text-primary font-medium">5</span> <span className="text-slate-500">(per policy: 3 personal, 2 employment)</span></div>
                  <div className="text-secondary">References completed: <span className="text-green-400 font-medium">2</span> <span className="text-slate-500">(40% complete)</span></div>
                  <div className="text-secondary">References pending: <span className="text-amber-700 font-medium">2</span> <span className="text-slate-500">(1 awaiting callback, 1 not yet identified)</span></div>
                  <div className="text-secondary">References not yet contacted: <span className="text-primary">0</span></div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-4">
                {/* Completed Summary */}
                <div className="bg-white dark:bg-zinc-950/40 rounded-lg p-4">
                  <h5 className="text-sm font-semibold text-green-400 mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />Completed References (2)
                  </h5>
                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="text-primary font-medium">Sgt. John Davis (Current Supervisor)</p>
                      <p className="text-secondary">Interview: Jan 23, 2026 — Employment reference</p>
                      <p className="text-green-400">Outcome: POSITIVE — Strongly recommends for hire</p>
                    </div>
                    <div>
                      <p className="text-primary font-medium">Capt. Sarah Williams (Former Supervisor)</p>
                      <p className="text-secondary">Interview: Jan 23, 2026 — Employment reference</p>
                      <p className="text-green-400">Outcome: POSITIVE — Recommends for hire</p>
                    </div>
                  </div>
                </div>

                {/* Pending Summary */}
                <div className="bg-white dark:bg-zinc-950/40 rounded-lg p-4">
                  <h5 className="text-sm font-semibold text-amber-700 mb-3 flex items-center gap-2">
                    <Clock className="w-4 h-4" />Pending References (2)
                  </h5>
                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="text-primary font-medium">Officer Michael Brown (Colleague/FTO)</p>
                      <p className="text-secondary">Status: Awaiting callback (1 contact attempt Jan 23)</p>
                      <p className="text-amber-700/80">Next action: Follow up Jan 27 if no response</p>
                    </div>
                    <div>
                      <p className="text-primary font-medium">Additional personal reference (to be added)</p>
                      <p className="text-secondary">Status: Not yet scheduled</p>
                      <p className="text-amber-700/80">Next action: Contact applicant for additional references</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Outcomes */}
              <div className="bg-white dark:bg-zinc-950/40 rounded-lg p-4 mb-4">
                <h5 className="text-sm font-semibold text-secondary mb-3">Reference Check Outcomes</h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center gap-2 text-green-400">
                    <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>All completed references: POSITIVE (2 of 2)</span>
                  </div>
                  <div className="flex items-center gap-2 text-green-400">
                    <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>Would recommend for hire: 2 of 2 said YES</span>
                  </div>
                  <div className="flex items-center gap-2 text-green-400">
                    <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>No concerns identified by either supervisor</span>
                  </div>
                  <div className="flex items-center gap-2 text-amber-700">
                    <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>Cannot finalize without minimum 3 completed</span>
                  </div>
                </div>
              </div>

              {/* Assessment Method Note */}
              <div className="bg-amber-500/5 border border-amber-500/20 rounded-lg p-4 mb-4">
                <h5 className="text-sm font-semibold text-amber-700 mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />Assessment Method Note
                </h5>
                <p className="text-sm text-secondary">
                  References are evaluated <span className="text-primary font-medium">qualitatively</span>, not with numerical ratings or scores. Each reference is assessed individually for: would recommend (Yes/No), performance quality (Excellent/Good/Fair/Poor), disciplinary issues (Yes/No with details), specific concerns (documented), and Brady/Giglio credibility concerns (Yes/No). There is no "overall score" or "average rating."
                </p>
              </div>

              {/* Investigator Assessment */}
              <div className="bg-white dark:bg-zinc-950/40 rounded-lg p-4">
                <h5 className="text-sm font-semibold text-secondary mb-2">Investigator Assessment</h5>
                <p className="text-sm text-secondary">
                  Two strong supervisor references completed (current and former). Both strongly positive with no concerns identified. Pending colleague reference (not critical — already have 2 supervisory refs). Need at least 1 additional personal reference to meet minimum requirements. Recommend contacting applicant for 1–2 additional personal references (non-LE contacts).
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 mt-4">
                <button className="px-3 py-1.5 bg-white dark:bg-zinc-900/60 hover:bg-slate-800/80 text-secondary rounded-lg text-xs font-medium transition-colors">View Completed References</button>
                <button className="px-3 py-1.5 bg-white dark:bg-zinc-900/60 hover:bg-slate-800/80 text-secondary rounded-lg text-xs font-medium transition-colors">Contact Pending References</button>
                <button className="px-3 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 rounded-lg text-xs font-medium transition-colors">Request Additional References from Applicant</button>
              </div>
            </div>

            {/* Status Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-white dark:bg-zinc-900/40 border border-border rounded-xl shadow-sm dark:shadow-none p-5">
                <div className="flex items-center justify-between mb-3">
                  <UserCheck className="w-8 h-8 text-blue-400" />
                  <span className="text-2xl font-bold text-primary">{references.length}</span>
                </div>
                <p className="text-sm font-medium text-primary mb-1">Total References</p>
                <p className="text-xs text-slate-500">Case BI-2024-145 (Martinez)</p>
                <div className="mt-3 pt-3 border-t border-border dark:border-slate-700/30 space-y-1">
                  <p className="text-xs text-secondary">Employment: 2 (current + former supervisor)</p>
                  <p className="text-xs text-secondary">Professional LE: 1 (colleague/FTO)</p>
                  <p className="text-xs text-secondary">Personal: 1 (need 2–3 per policy)</p>
                </div>
              </div>

              <div className="bg-white dark:bg-zinc-900/40 border border-border rounded-xl shadow-sm dark:shadow-none p-5">
                <div className="flex items-center justify-between mb-3">
                  <CheckCircle className="w-8 h-8 text-green-400" />
                  <span className="text-2xl font-bold text-primary">{completedRefs.length}</span>
                </div>
                <p className="text-sm font-medium text-primary mb-1">Completed</p>
                <p className="text-xs text-slate-500">Interview notes documented</p>
                <div className="mt-3 pt-3 border-t border-border dark:border-slate-700/30 space-y-1">
                  <p className="text-xs text-green-400/80">Sgt. Davis — Strongly Positive</p>
                  <p className="text-xs text-green-400/80">Capt. Williams — Positive</p>
                  <p className="text-xs text-slate-500 mt-1">Both recommend for hire</p>
                </div>
              </div>

              <div className="bg-white dark:bg-zinc-900/40 border border-amber-500/30 rounded-xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <Clock className="w-8 h-8 text-amber-700" />
                  <span className="text-2xl font-bold text-primary">{pendingRefs.length}</span>
                </div>
                <p className="text-sm font-medium text-primary mb-1">Pending</p>
                <p className="text-xs text-slate-500">Awaiting contact/callback</p>
                <div className="mt-3 pt-3 border-t border-border dark:border-slate-700/30 space-y-1.5">
                  <div>
                    <p className="text-xs text-amber-700/80">Officer Brown — Awaiting callback</p>
                    <p className="text-xs text-slate-500 ml-2">1 contact attempt (Jan 23)</p>
                  </div>
                  <div>
                    <p className="text-xs text-red-400/80">Personal ref — Not yet identified</p>
                    <p className="text-xs text-slate-500 ml-2">Contact applicant for refs</p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-zinc-900/40 border border-border rounded-xl shadow-sm dark:shadow-none p-5">
                <div className="flex items-center justify-between mb-3">
                  <ClipboardList className="w-8 h-8 text-amber-700" />
                  <span className="text-lg font-bold text-primary">QUALITATIVE</span>
                </div>
                <p className="text-sm font-medium text-primary mb-1">Assessment Summary</p>
                <p className="text-xs text-slate-500">Evaluated individually, not scored</p>
                <div className="mt-3 pt-3 border-t border-border dark:border-slate-700/30 space-y-1">
                  <p className="text-xs text-green-400/80">Would recommend: 2/2 YES</p>
                  <p className="text-xs text-green-400/80">Concerns identified: 0</p>
                  <p className="text-xs text-green-400/80">Brady/Giglio concerns: 0</p>
                </div>
              </div>
            </div>

            {/* Reference Actions */}
            <div className="bg-white dark:bg-zinc-900/40 border border-border rounded-xl shadow-sm dark:shadow-none p-5 mb-6">
              <h3 className="text-sm font-semibold text-primary mb-4 flex items-center gap-2">
                <Settings className="w-4 h-4 text-amber-700" />Reference Check Actions
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <button className="flex items-start gap-3 p-3 bg-white dark:bg-zinc-950/40 hover:bg-slate-900/60 rounded-lg transition-colors text-left">
                  <Plus className="w-5 h-5 text-amber-700 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-primary">Add Reference</p>
                    <p className="text-xs text-slate-500 mt-0.5">Add new personal or professional reference</p>
                  </div>
                </button>
                <button className="flex items-start gap-3 p-3 bg-white dark:bg-zinc-950/40 hover:bg-slate-900/60 rounded-lg transition-colors text-left">
                  <Phone className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-primary">Contact Pending</p>
                    <p className="text-xs text-slate-500 mt-0.5">Call/email pending references</p>
                  </div>
                </button>
                <button className="flex items-start gap-3 p-3 bg-white dark:bg-zinc-950/40 hover:bg-slate-900/60 rounded-lg transition-colors text-left">
                  <Calendar className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-primary">Schedule Interview</p>
                    <p className="text-xs text-slate-500 mt-0.5">Schedule phone/in-person reference check</p>
                  </div>
                </button>
                <button className="flex items-start gap-3 p-3 bg-white dark:bg-zinc-950/40 hover:bg-slate-900/60 rounded-lg transition-colors text-left">
                  <ClipboardList className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-primary">Interview Guide</p>
                    <p className="text-xs text-slate-500 mt-0.5">Standard reference check questions</p>
                  </div>
                </button>
                <button className="flex items-start gap-3 p-3 bg-white dark:bg-zinc-950/40 hover:bg-slate-900/60 rounded-lg transition-colors text-left">
                  <Mail className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-primary">Send Request Form</p>
                    <p className="text-xs text-slate-500 mt-0.5">Email reference request to contact</p>
                  </div>
                </button>
                <button className="flex items-start gap-3 p-3 bg-white dark:bg-zinc-950/40 hover:bg-slate-900/60 rounded-lg transition-colors text-left">
                  <Download className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-primary">Generate Report</p>
                    <p className="text-xs text-slate-500 mt-0.5">Export reference check summary</p>
                  </div>
                </button>
                <button className="flex items-start gap-3 p-3 bg-white dark:bg-zinc-950/40 hover:bg-slate-900/60 rounded-lg transition-colors text-left">
                  <FileText className="w-5 h-5 text-amber-700 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-primary">Add Interview Notes</p>
                    <p className="text-xs text-slate-500 mt-0.5">Document post-interview findings</p>
                  </div>
                </button>
                <button className="flex items-start gap-3 p-3 bg-white dark:bg-zinc-950/40 hover:bg-slate-900/60 rounded-lg transition-colors text-left">
                  <Search className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-primary">Search References</p>
                    <p className="text-xs text-slate-500 mt-0.5">By name, relationship, case, or date</p>
                  </div>
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-1 mb-6 bg-slate-100/80 dark:bg-zinc-900/30 rounded-xl p-1 overflow-x-auto">
              {[
                { id: 'pending', label: 'Pending', count: pendingRefs.length },
                { id: 'completed', label: 'Completed', count: completedRefs.length },
                { id: 'all', label: 'All References', count: references.length },
                { id: 'contactlog', label: 'Contact Log', count: references.filter(r => r.contactAttempts && r.contactAttempts.length > 0).length }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedView(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                    selectedView === tab.id
                      ? 'bg-amber-500 text-white shadow-lg'
                      : 'text-secondary hover:text-primary hover:bg-slate-100 dark:hover:bg-zinc-900/50'
                  }`}
                >
                  {tab.label}
                  <span className={`px-1.5 py-0.5 rounded text-xs ${
                    selectedView === tab.id ? 'bg-white/20 text-primary' : 'bg-white dark:bg-zinc-800/50 text-slate-500'
                  }`}>{tab.count}</span>
                </button>
              ))}
            </div>

            {/* Reference Cards */}
            <div className="space-y-6">
              {getFilteredRefs().map((ref) => {
                const isExpanded = expandedRef === ref.id;
                const isCompleted = ref.status === 'Completed';
                const isPending = ref.status === 'Pending Callback' || ref.status === 'Scheduled';
                const isRequired = ref.status === 'Required';

                return (
                  <div key={ref.id} className={`bg-white dark:bg-zinc-900/40 border rounded-xl overflow-hidden transition-all ${
                    isRequired ? 'border-red-500/30' : isPending ? 'border-amber-500/30' : 'border-slate-700/50 hover:border-amber-500/30'
                  }`}>
                    <div className="p-5">
                      {/* Card Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-1">
                            <h3 className="text-lg font-semibold text-primary">{ref.referenceName}</h3>
                            {getRefStatusBadge(ref.status)}
                          </div>
                          <p className="text-sm text-amber-700 mb-1">{ref.relationship}</p>
                          {ref.organization && (
                            <p className="text-sm text-secondary mb-1">{ref.rankPosition ? `${ref.rankPosition} — ` : ''}{ref.organization}</p>
                          )}
                          <p className="text-sm text-slate-500">Reference for: {ref.subject} (Case {ref.caseId}) — {ref.positionApplied}</p>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          {getRefTypeBadge(ref.referenceType)}
                          {isCompleted && ref.outcome && getOutcomeBadge(ref.outcome)}
                        </div>
                      </div>

                      {/* Contact Info (if available) */}
                      {ref.phone && (
                        <div className="bg-white dark:bg-zinc-950/40 rounded-lg p-3 mb-4">
                          <h4 className="text-xs font-semibold text-secondary mb-2 uppercase tracking-wider">Contact Information</h4>
                          <div className="flex flex-wrap gap-4 text-sm">
                            {ref.referenceName !== 'Additional Personal Reference' && (
                              <>
                                <span className="flex items-center gap-1.5 text-secondary"><Phone className="w-3.5 h-3.5 text-secondary" />{ref.phone}</span>
                                <span className="flex items-center gap-1.5 text-secondary"><Mail className="w-3.5 h-3.5 text-secondary" />{ref.email}</span>
                                {ref.badge && <span className="flex items-center gap-1.5 text-secondary"><Shield className="w-3.5 h-3.5 text-secondary" />Badge #{ref.badge}</span>}
                              </>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Relationship Details */}
                      {ref.relationshipDetail && (
                        <div className="bg-white dark:bg-zinc-950/40 rounded-lg p-3 mb-4">
                          <h4 className="text-xs font-semibold text-secondary mb-2 uppercase tracking-wider">Relationship to Applicant</h4>
                          <div className="text-sm space-y-1">
                            <p className="text-secondary">{ref.relationshipDetail}</p>
                            {ref.yearsKnown && <p className="text-slate-500">Known applicant: <span className="text-secondary">{ref.yearsKnown}</span></p>}
                            {ref.capacity && <p className="text-slate-500">Capacity: <span className="text-secondary">{ref.capacity}</span></p>}
                          </div>
                        </div>
                      )}

                      {/* === COMPLETED REFERENCE CONTENT === */}
                      {isCompleted && ref.interview && (
                        <>
                          {/* Interview Details */}
                          <div className="bg-white dark:bg-zinc-950/40 rounded-lg p-3 mb-4">
                            <h4 className="text-xs font-semibold text-secondary mb-2 uppercase tracking-wider">Interview Details</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                              <div className="text-slate-500">Date: <span className="text-secondary">{ref.interview.date}</span></div>
                              <div className="text-slate-500">Time: <span className="text-secondary">{ref.interview.time}</span></div>
                              <div className="text-slate-500">Method: <span className="text-secondary">{ref.interview.method}</span></div>
                              <div className="text-slate-500">Interviewer: <span className="text-secondary">{ref.interview.interviewer}</span></div>
                              <div className="text-slate-500">Notes: <span className="text-secondary">{ref.interview.notesPages}</span></div>
                            </div>
                          </div>

                          {/* Outcome Section */}
                          <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-4 mb-4">
                            <h4 className="text-sm font-semibold text-primary mb-3 border-b border-green-500/20 pb-2">Reference Interview Outcome</h4>

                            <div className="mb-4">
                              <p className="text-xs font-semibold text-secondary uppercase tracking-wider mb-1">Overall Recommendation</p>
                              <p className="text-sm text-green-400 font-medium flex items-center gap-1.5">
                                <CheckCircle2 className="w-4 h-4" />Would recommend for hire: {ref.wouldRecommend}
                              </p>
                              {ref.recommendQuote && <p className="text-sm text-secondary mt-1 italic">"{ref.recommendQuote}"</p>}
                            </div>

                            {/* Performance */}
                            {ref.performance && (
                              <div className="mb-4">
                                <p className="text-xs font-semibold text-secondary uppercase tracking-wider mb-2">Performance Assessment</p>
                                <div className="space-y-1 text-sm">
                                  {ref.performance.overall && <p className="text-secondary">Overall: <span className="text-secondary">{ref.performance.overall}</span></p>}
                                  {ref.performance.workQuality && <p className="text-secondary">Work quality: <span className="text-secondary">{ref.performance.workQuality}</span></p>}
                                  {ref.performance.reliability && <p className="text-secondary">Reliability: <span className="text-secondary">{ref.performance.reliability}</span></p>}
                                  {ref.performance.professionalism && <p className="text-secondary">Professionalism: <span className="text-secondary">{ref.performance.professionalism}</span></p>}
                                </div>
                              </div>
                            )}

                            {/* Strengths */}
                            {ref.strengths && (
                              <div className="mb-4">
                                <p className="text-xs font-semibold text-secondary uppercase tracking-wider mb-2">Strengths Identified</p>
                                <ol className="space-y-1">
                                  {ref.strengths.map((s, i) => (
                                    <li key={i} className="text-sm text-secondary flex items-start gap-2">
                                      <span className="text-amber-700/60 font-medium text-xs mt-0.5">{i + 1}.</span>{s}
                                    </li>
                                  ))}
                                </ol>
                              </div>
                            )}

                            {/* Areas for Improvement */}
                            {ref.areasForImprovement && ref.areasForImprovement.length > 0 && (
                              <div className="mb-4">
                                <p className="text-xs font-semibold text-secondary uppercase tracking-wider mb-2">Areas for Improvement</p>
                                {ref.areasForImprovement.map((a, i) => (
                                  <div key={i} className="text-sm mb-1">
                                    <p className="text-secondary">{i + 1}. {a.item}</p>
                                    {a.context && <p className="text-slate-500 ml-4 text-xs">Context: "{a.context}"</p>}
                                  </div>
                                ))}
                              </div>
                            )}

                            {/* Concerns */}
                            <div className="mb-4">
                              <p className="text-xs font-semibold text-secondary uppercase tracking-wider mb-1">Concerns / Red Flags</p>
                              <p className="text-sm text-green-400">{ref.concerns}</p>
                              {ref.concernsQuote && <p className="text-xs text-slate-500 mt-0.5">"{ref.concernsQuote}"</p>}
                            </div>
                          </div>

                          {/* Expand for more details */}
                          <button
                            onClick={() => setExpandedRef(isExpanded ? null : ref.id)}
                            className="w-full flex items-center justify-center gap-2 py-2 text-sm text-amber-700 hover:text-amber-300 transition-colors mb-2"
                          >
                            {isExpanded ? 'Hide Details' : 'Show Disciplinary, Rehire, Brady/Giglio & Assessment'}
                            <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                          </button>

                          {isExpanded && (
                            <div className="space-y-6">
                              {/* Disciplinary */}
                              <div className="bg-white dark:bg-zinc-950/40 rounded-lg p-3">
                                <h4 className="text-xs font-semibold text-secondary mb-2 uppercase tracking-wider">Disciplinary History (Per Reference)</h4>
                                <div className="space-y-1 text-sm">
                                  <p className="text-secondary">Sustained complaints: <span className="text-secondary">{ref.disciplinary.sustainedComplaints}</span></p>
                                  {ref.disciplinary.unsustainedComplaints !== undefined && (
                                    <p className="text-secondary">Unsustained complaints: <span className="text-secondary">{ref.disciplinary.unsustainedComplaints}</span></p>
                                  )}
                                  {ref.disciplinary.useOfForce !== undefined && (
                                    <p className="text-secondary">Use of force: <span className="text-secondary">{ref.disciplinary.useOfForce}</span></p>
                                  )}
                                  <p className="text-secondary">Disciplinary actions: <span className="text-secondary">{ref.disciplinary.disciplinaryActions}</span></p>
                                  {ref.disciplinary.note && <p className="text-slate-500 italic text-xs mt-1">{ref.disciplinary.note}</p>}
                                </div>
                              </div>

                              {/* Reason for Leaving / Rehire */}
                              <div className="bg-white dark:bg-zinc-950/40 rounded-lg p-3">
                                <h4 className="text-xs font-semibold text-secondary mb-2 uppercase tracking-wider">Reason for Leaving & Rehire Eligibility</h4>
                                <div className="space-y-1.5 text-sm">
                                  <p className="text-secondary">Reason for leaving: <span className="text-secondary">{ref.reasonForLeaving}</span></p>
                                  <p className="text-secondary">Eligible for rehire: <span className="text-green-400 font-medium">{ref.eligibleForRehire}</span></p>
                                  {ref.rehireQuote && <p className="text-slate-500 italic text-xs">"{ref.rehireQuote}"</p>}
                                </div>
                              </div>

                              {/* Brady/Giglio */}
                              <div className="bg-white dark:bg-zinc-950/40 rounded-lg p-3">
                                <h4 className="text-xs font-semibold text-secondary mb-2 uppercase tracking-wider">Brady/Giglio Concerns</h4>
                                <p className="text-sm text-green-400 font-medium">{ref.bradyGiglio}</p>
                                <p className="text-xs text-slate-500 mt-0.5">{ref.bradyGiglioDetail}</p>
                              </div>

                              {/* Investigator Assessment */}
                              <div className="bg-white dark:bg-zinc-950/40 rounded-lg p-3">
                                <h4 className="text-xs font-semibold text-secondary mb-2 uppercase tracking-wider">Investigator Assessment</h4>
                                <p className="text-sm text-secondary">{ref.investigatorAssessment}</p>
                              </div>
                            </div>
                          )}
                        </>
                      )}

                      {/* === PENDING REFERENCE CONTENT === */}
                      {isPending && (
                        <>
                          {/* Contact Attempts */}
                          {ref.contactAttempts && ref.contactAttempts.length > 0 && (
                            <div className="bg-white dark:bg-zinc-950/40 rounded-lg p-3 mb-4">
                              <h4 className="text-xs font-semibold text-secondary mb-2 uppercase tracking-wider">Contact Attempts</h4>
                              <div className="space-y-3">
                                {ref.contactAttempts.map((attempt, i) => (
                                  <div key={i} className="text-sm">
                                    <p className="text-primary font-medium mb-0.5">Attempt #{attempt.attemptNumber}: {attempt.date}</p>
                                    <p className="text-secondary ml-4">Method: {attempt.method}</p>
                                    <p className="text-secondary ml-4">Outcome: {attempt.outcome}</p>
                                    <p className="text-slate-500 ml-4 text-xs">Message: {attempt.message}</p>
                                  </div>
                                ))}
                              </div>
                              <p className="text-xs text-slate-500 mt-2">Total attempts: {ref.contactAttempts.length}</p>
                            </div>
                          )}

                          {/* Next Actions */}
                          {ref.nextActions && (
                            <div className="bg-amber-500/5 border border-amber-500/20 rounded-lg p-3 mb-4">
                              <h4 className="text-xs font-semibold text-amber-700 mb-2 uppercase tracking-wider">Next Actions</h4>
                              <div className="space-y-1 text-sm">
                                <p className="text-secondary">Follow-up date: <span className="text-primary">{ref.nextActions.followUpDate}</span></p>
                                <p className="text-secondary">Action: <span className="text-secondary">{ref.nextActions.action}</span></p>
                                <p className="text-secondary">Escalation: <span className="text-secondary">{ref.nextActions.escalation}</span></p>
                                <p className="text-secondary">Priority: <span className="text-amber-700">{ref.nextActions.priority}</span></p>
                              </div>
                            </div>
                          )}

                          {/* Planned Interview */}
                          {ref.plannedInterview && (
                            <div className="bg-white dark:bg-zinc-950/40 rounded-lg p-3 mb-4">
                              <h4 className="text-xs font-semibold text-secondary mb-2 uppercase tracking-wider">Interview Details (When Scheduled)</h4>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                                <p className="text-secondary">Duration: <span className="text-secondary">{ref.plannedInterview.estimatedDuration}</span></p>
                                <p className="text-secondary">Type: <span className="text-secondary">{ref.plannedInterview.type}</span></p>
                                <p className="text-secondary">Assigned to: <span className="text-secondary">{ref.plannedInterview.assignedTo}</span></p>
                                <p className="text-secondary">Topics: <span className="text-secondary">{ref.plannedInterview.topics}</span></p>
                              </div>
                            </div>
                          )}

                          {/* Investigator Notes */}
                          {ref.investigatorNotes && (
                            <div className="bg-white dark:bg-zinc-950/40 rounded-lg p-3 mb-4">
                              <h4 className="text-xs font-semibold text-secondary mb-2 uppercase tracking-wider">Investigator Notes</h4>
                              <p className="text-sm text-secondary italic">"{ref.investigatorNotes}"</p>
                            </div>
                          )}
                        </>
                      )}

                      {/* === REQUIRED REFERENCE CONTENT === */}
                      {isRequired && (
                        <>
                          {/* Policy Requirement */}
                          {ref.policyRequirement && (
                            <div className="bg-red-500/5 border border-red-500/20 rounded-lg p-3 mb-4">
                              <h4 className="text-xs font-semibold text-red-400 mb-2 uppercase tracking-wider flex items-center gap-1.5">
                                <AlertTriangle className="w-3.5 h-3.5" />Required — Not Yet Provided
                              </h4>
                              <div className="space-y-1 text-sm">
                                <p className="text-secondary">Agency policy requires: <span className="text-primary">{ref.policyRequirement.totalRequired}</span></p>
                                <p className="text-secondary ml-4">Employment references: <span className="text-green-400">{ref.policyRequirement.employmentRequired}</span></p>
                                <p className="text-secondary ml-4">Personal references: <span className="text-red-400">{ref.policyRequirement.personalRequired}</span></p>
                                <p className="text-secondary">Criteria: <span className="text-secondary">{ref.policyRequirement.criteria}</span></p>
                              </div>
                            </div>
                          )}

                          {/* Action Required */}
                          {ref.actionRequired && (
                            <div className="bg-amber-500/5 border border-amber-500/20 rounded-lg p-3 mb-4">
                              <h4 className="text-xs font-semibold text-amber-700 mb-2 uppercase tracking-wider">Action Required</h4>
                              <div className="space-y-1.5 text-sm">
                                <p className="text-secondary">Action: <span className="text-primary">{ref.actionRequired.action}</span></p>
                                <p className="text-secondary">Required info: <span className="text-secondary">{ref.actionRequired.requiredInfo}</span></p>
                                <p className="text-secondary">Target date: <span className="text-amber-700">{ref.actionRequired.targetDate}</span></p>
                                <p className="text-secondary">Examples: <span className="text-secondary">{ref.actionRequired.examples}</span></p>
                              </div>
                            </div>
                          )}

                          {/* Investigator Notes */}
                          {ref.investigatorNotes && (
                            <div className="bg-white dark:bg-zinc-950/40 rounded-lg p-3 mb-4">
                              <h4 className="text-xs font-semibold text-secondary mb-2 uppercase tracking-wider">Investigator Notes</h4>
                              <p className="text-sm text-secondary italic">"{ref.investigatorNotes}"</p>
                            </div>
                          )}
                        </>
                      )}

                      {/* Contact Log Tab Content */}
                      {selectedView === 'contactlog' && ref.contactAttempts && (
                        <div className="bg-white dark:bg-zinc-950/40 rounded-lg p-3 mb-4">
                          <h4 className="text-xs font-semibold text-secondary mb-2 uppercase tracking-wider">Contact Log for {ref.referenceName}</h4>
                          {ref.contactAttempts.map((attempt, i) => (
                            <div key={i} className="text-sm border-l-2 border-amber-500/30 pl-3 mb-2">
                              <p className="text-primary font-medium">Attempt #{attempt.attemptNumber} — {attempt.date}</p>
                              <p className="text-secondary">Method: {attempt.method}</p>
                              <p className="text-secondary">Outcome: {attempt.outcome}</p>
                              <p className="text-slate-500 text-xs">Message: {attempt.message}</p>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="flex items-center justify-between pt-4 border-t border-border dark:border-slate-700/30 mt-2">
                        <div className="text-sm text-secondary">
                          Case: <span className="text-primary font-medium">{ref.caseId}</span> — {ref.subject}
                        </div>
                        <div className="flex items-center gap-2 flex-wrap">
                          {isCompleted && (
                            <>
                              <button className="px-3 py-1.5 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded-lg text-xs font-medium transition-colors">View Interview Notes</button>
                              <button className="px-3 py-1.5 bg-white dark:bg-zinc-800/50 hover:bg-slate-700/70 text-secondary rounded-lg text-xs font-medium transition-colors">Print Report</button>
                              <button className="px-3 py-1.5 bg-white dark:bg-zinc-800/50 hover:bg-slate-700/70 text-secondary rounded-lg text-xs font-medium transition-colors">View Case File</button>
                            </>
                          )}
                          {isPending && (
                            <>
                              <button className="px-3 py-1.5 bg-green-500/10 hover:bg-green-500/20 text-green-400 rounded-lg text-xs font-medium transition-colors flex items-center gap-1"><Phone className="w-3 h-3" />Call Now</button>
                              <button className="px-3 py-1.5 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded-lg text-xs font-medium transition-colors flex items-center gap-1"><Mail className="w-3 h-3" />Send Email</button>
                              <button className="px-3 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 rounded-lg text-xs font-medium transition-colors">Schedule Interview</button>
                              <button className="px-3 py-1.5 bg-white dark:bg-zinc-800/50 hover:bg-slate-700/70 text-secondary rounded-lg text-xs font-medium transition-colors">Log Contact Attempt</button>
                            </>
                          )}
                          {isRequired && (
                            <>
                              <button className="px-3 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 rounded-lg text-xs font-medium transition-colors flex items-center gap-1"><Mail className="w-3 h-3" />Email Applicant</button>
                              <button className="px-3 py-1.5 bg-green-500/10 hover:bg-green-500/20 text-green-400 rounded-lg text-xs font-medium transition-colors flex items-center gap-1"><Phone className="w-3 h-3" />Call Applicant</button>
                              <button className="px-3 py-1.5 bg-white dark:bg-zinc-800/50 hover:bg-slate-700/70 text-secondary rounded-lg text-xs font-medium transition-colors">Reference Request Form</button>
                              <button className="px-3 py-1.5 bg-white dark:bg-zinc-800/50 hover:bg-slate-700/70 text-secondary rounded-lg text-xs font-medium transition-colors">View Policy</button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer Actions */}
            <div className="flex items-center justify-between mt-6">
              <button className="px-4 py-2 bg-white dark:bg-zinc-900/40 hover:bg-slate-100 dark:hover:bg-zinc-900/60 border border-slate-700/50 text-secondary rounded-xl text-sm font-medium transition-colors">Load More References</button>
              <div className="flex items-center gap-3">
                <button className="px-4 py-2 bg-white dark:bg-zinc-900/40 hover:bg-slate-100 dark:hover:bg-zinc-900/60 border border-slate-700/50 text-secondary rounded-xl text-sm font-medium transition-colors flex items-center gap-2">
                  <Download className="w-4 h-4" />Export All References
                </button>
                <button className="px-4 py-2 bg-white dark:bg-zinc-900/40 hover:bg-slate-100 dark:hover:bg-zinc-900/60 border border-slate-700/50 text-secondary rounded-xl text-sm font-medium transition-colors flex items-center gap-2">
                  <FileText className="w-4 h-4" />View Summary Report
                </button>
              </div>
            </div>

            {/* Support & Resources Panel */}
            <div className="mt-8 bg-white dark:bg-zinc-900/40 border border-border rounded-xl shadow-sm dark:shadow-none p-6">
              <h3 className="text-lg font-semibold text-primary mb-4 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-amber-700" />
                Support & Resources
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Quick Actions */}
                <div>
                  <h4 className="text-sm font-semibold text-secondary mb-3">Quick Actions</h4>
                  <div className="space-y-2">
                    <button className="w-full flex items-center gap-2 px-3 py-2 bg-white dark:bg-zinc-950/40 hover:bg-slate-900/60 rounded-lg transition-colors text-left">
                      <Plus className="w-4 h-4 text-amber-700" />
                      <span className="text-sm text-secondary">Add New Reference</span>
                    </button>
                    <button className="w-full flex items-center gap-2 px-3 py-2 bg-white dark:bg-zinc-950/40 hover:bg-slate-900/60 rounded-lg transition-colors text-left">
                      <Phone className="w-4 h-4 text-green-400" />
                      <span className="text-sm text-secondary">Contact Pending References</span>
                    </button>
                    <button className="w-full flex items-center gap-2 px-3 py-2 bg-white dark:bg-zinc-950/40 hover:bg-slate-900/60 rounded-lg transition-colors text-left">
                      <Download className="w-4 h-4 text-blue-400" />
                      <span className="text-sm text-secondary">Export Reference Report</span>
                    </button>
                    <button className="w-full flex items-center gap-2 px-3 py-2 bg-white dark:bg-zinc-950/40 hover:bg-slate-900/60 rounded-lg transition-colors text-left">
                      <ClipboardList className="w-4 h-4 text-cyan-400" />
                      <span className="text-sm text-secondary">View Interview Guide</span>
                    </button>
                  </div>
                </div>

                {/* Documentation */}
                <div>
                  <h4 className="text-sm font-semibold text-secondary mb-3">Documentation</h4>
                  <div className="space-y-2">
                    <button className="w-full flex items-center gap-2 px-3 py-2 bg-white dark:bg-zinc-950/40 hover:bg-slate-900/60 rounded-lg transition-colors text-left">
                      <BookOpen className="w-4 h-4 text-amber-700" />
                      <span className="text-sm text-secondary">Reference Check Procedures</span>
                    </button>
                    <button className="w-full flex items-center gap-2 px-3 py-2 bg-white dark:bg-zinc-950/40 hover:bg-slate-900/60 rounded-lg transition-colors text-left">
                      <BookOpen className="w-4 h-4 text-amber-700" />
                      <span className="text-sm text-secondary">Standard Interview Questions</span>
                    </button>
                    <button className="w-full flex items-center gap-2 px-3 py-2 bg-white dark:bg-zinc-950/40 hover:bg-slate-900/60 rounded-lg transition-colors text-left">
                      <BookOpen className="w-4 h-4 text-amber-700" />
                      <span className="text-sm text-secondary">Brady/Giglio Assessment Guide</span>
                    </button>
                    <button className="w-full flex items-center gap-2 px-3 py-2 bg-white dark:bg-zinc-950/40 hover:bg-slate-900/60 rounded-lg transition-colors text-left">
                      <ExternalLink className="w-4 h-4 text-amber-700" />
                      <span className="text-sm text-secondary">POST Reference Requirements</span>
                    </button>
                  </div>
                </div>

                {/* Contact */}
                <div>
                  <h4 className="text-sm font-semibold text-secondary mb-3">Contact & Support</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-zinc-950/40 rounded-lg">
                      <Phone className="w-4 h-4 text-secondary" />
                      <div>
                        <p className="text-sm text-secondary">BI Unit</p>
                        <p className="text-xs text-slate-500">Ext. 4520</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-zinc-950/40 rounded-lg">
                      <Mail className="w-4 h-4 text-secondary" />
                      <div>
                        <p className="text-sm text-secondary">BI Support</p>
                        <p className="text-xs text-slate-500">bi.support@gcso.gov</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-zinc-950/40 rounded-lg">
                      <Phone className="w-4 h-4 text-secondary" />
                      <div>
                        <p className="text-sm text-secondary">Legal / Brady-Giglio</p>
                        <p className="text-xs text-slate-500">Ext. 4550 (legal counsel)</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-zinc-950/40 rounded-lg">
                      <Phone className="w-4 h-4 text-secondary" />
                      <div>
                        <p className="text-sm text-secondary">POST Compliance</p>
                        <p className="text-xs text-slate-500">Ext. 4560</p>
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

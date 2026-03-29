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
  Globe,
  Share2,
  ThumbsUp,
  MessageSquare,
  Flag,
  Image,
  Users,
  Briefcase,
  Heart,
  Award,
  ShieldAlert,
  AlertCircle,
  CheckCircle,
  Ban,
  Hash,
  Link,
  Camera
} from 'lucide-react';
import DashboardLayout from '../layouts/DashboardLayout';
import { biNavigation, biProfile, biNotifications } from '../config/biConfig';

export default function SocialMediaAnalysis() {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState('social-media');
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
    { id: 'financial-background', label: 'Financial Background', icon: DollarSign, page: 'FinancialBackground' },
    { id: 'social-media', label: 'Social Media Analysis', icon: Eye },
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
    { id: 1, title: 'Review Required', message: 'James Wilson - Flagged content from college years', time: '1 hour ago', urgent: true },
    { id: 2, title: 'Analysis Complete', message: 'Sarah Chen - Professional presence, approved', time: '3 hours ago', urgent: false },
    { id: 3, title: 'Profile Analysis', message: 'Maria Rodriguez - Minimal online presence, completing', time: '1 day ago', urgent: false }
  ];

  // Comprehensive constitutionally-compliant social media records
  const socialMediaReports = [
    {
      id: 'report-1',
      subject: 'Robert Martinez',
      caseId: 'BI-2024-145',
      position: 'Deputy Sheriff Applicant',
      status: 'Approved',
      statusCategory: 'clear',
      reviewDate: '2024-10-30',
      reviewPeriod: 'Last 5 years (2019-2024)',
      reviewedBy: 'Agent Brooks',
      reviewerBadge: 'BI-107',
      platforms: [
        { name: 'Facebook', handle: 'Robert Martinez', status: 'Public profile', posts: 68, privacy: 'Public' },
        { name: 'LinkedIn', handle: 'robert-martinez-le', status: 'Professional profile', posts: 15, connections: 42 },
        { name: 'Twitter/X', handle: '@martinez_patrol', status: 'Public account', posts: 45, followers: 128 },
        { name: 'Instagram', handle: '@rmartinez_photos', status: 'Public account', posts: 14, privacy: 'Public' }
      ],
      totalPostsReviewed: 142,
      flaggedPosts: 0,
      contentThemes: [
        { theme: 'Law enforcement activities', percentage: 35, description: 'Ride-alongs, community policing' },
        { theme: 'Community engagement', percentage: 30, description: 'Charity events, volunteering' },
        { theme: 'Personal/family', percentage: 25, description: 'Family photos, personal updates' },
        { theme: 'Professional development', percentage: 10, description: 'Training, career milestones' }
      ],
      politicalContent: {
        posts: 3,
        totalPosts: 142,
        description: 'General civic engagement (voting reminders, community support)',
        assessment: 'Appropriate political expression (protected under First Amendment)',
        isProtected: true
      },
      professionalBoundaries: {
        maintainsAppropriate: true,
        noDisparaging: true,
        noConfidentialDisclosure: true,
        noInappropriatePhotos: true,
        noConcerningAssociations: true
      },
      concerningContent: [],
      recentBehavior: {
        period: '2020-2024',
        assessment: 'Professional and appropriate throughout',
        tone: 'Professional, positive, community-focused'
      },
      investigatorAssessment: 'Professional online presence. Posts primarily related to community engagement and law enforcement activities. Subject maintains appropriate professional boundaries. No disparaging comments about employers. No concerning associations. Content reflects positively on character and professionalism.',
      recommendation: 'Approved',
      recommendationNote: 'No social media concerns identified. Professional and appropriate online presence.',
      approvedBy: 'Agent Brooks',
      approvalDate: '2024-10-30'
    },
    {
      id: 'report-2',
      subject: 'Sarah Chen',
      caseId: 'BI-2024-143',
      position: 'Deputy Sheriff Applicant',
      status: 'Approved (Excellent)',
      statusCategory: 'clear',
      reviewDate: '2024-11-01',
      reviewPeriod: 'Last 5 years (2019-2024)',
      reviewedBy: 'Investigator Davis',
      reviewerBadge: 'BI-109',
      platforms: [
        { name: 'Facebook', handle: 'Sarah Chen', status: 'Private profile', posts: 0, privacy: 'Private (limited public content)' },
        { name: 'LinkedIn', handle: 'sarah-chen-professional', status: 'Professional profile', posts: 87, connections: 248 },
        { name: 'Instagram', handle: '@sarahchen_fit', status: 'Private account', posts: 0, privacy: 'Private (no public content)' }
      ],
      totalPostsReviewed: 87,
      flaggedPosts: 0,
      contentThemes: [
        { theme: 'Professional networking', percentage: 45, description: 'Career achievements, certifications' },
        { theme: 'Fitness/wellness', percentage: 30, description: 'Running, healthy lifestyle' },
        { theme: 'Family', percentage: 20, description: 'Family photos, celebrations' },
        { theme: 'Community involvement', percentage: 5, description: 'Volunteering, charity work' }
      ],
      politicalContent: {
        posts: 0,
        totalPosts: 87,
        description: 'No political posts found in public content',
        assessment: 'No political content identified',
        isProtected: true
      },
      professionalBoundaries: {
        maintainsAppropriate: true,
        noDisparaging: true,
        noConfidentialDisclosure: true,
        noInappropriatePhotos: true,
        noConcerningAssociations: true,
        excellentPrivacyAwareness: true
      },
      concerningContent: [],
      recentBehavior: {
        period: '2020-2024',
        assessment: 'Excellent professional presence',
        tone: 'Professional, positive, health-focused'
      },
      investigatorAssessment: 'Very professional online presence. Posts focused on family, fitness, and career development. Private settings on most platforms (appropriate privacy awareness). Limited public content. All reviewed content appropriate. Excellent professional boundaries. No concerns identified.',
      recommendation: 'Approved (Excellent)',
      recommendationNote: 'No social media concerns identified. Excellent professional online presence with appropriate privacy settings.',
      approvedBy: 'Investigator Davis',
      approvalDate: '2024-11-01'
    },
    {
      id: 'report-3',
      subject: 'James Wilson',
      caseId: 'BI-2024-141',
      position: 'Deputy Sheriff Applicant',
      status: 'Conditional',
      statusCategory: 'review',
      reviewDate: '2024-11-02',
      reviewPeriod: 'Last 10 years (2014-2024)',
      reviewedBy: 'Agent Brooks',
      reviewerBadge: 'BI-107',
      platforms: [
        { name: 'Facebook', handle: 'James Wilson', status: 'Public profile', posts: 285, privacy: 'Public' },
        { name: 'Twitter/X', handle: '@jwilson2015', status: 'Public account', posts: 123, followers: 89 },
        { name: 'Instagram', handle: '@jameswilson_atl', status: 'Public account', posts: 15, privacy: 'Public' }
      ],
      totalPostsReviewed: 423,
      flaggedPosts: 5,
      contentBreakdown: {
        collegePeriod: { years: '2014-2019', posts: 358, percentage: 84 },
        recentPeriod: { years: '2020-2024', posts: 65, percentage: 16 }
      },
      contentThemes: [
        { theme: 'College social life (old)', percentage: 55, description: 'Party photos, social events (2014-2019)' },
        { theme: 'Professional content (recent)', percentage: 25, description: 'Career posts (2020-2024)' },
        { theme: 'Sports/recreation', percentage: 15, description: 'Sports, outdoor activities' },
        { theme: 'Political opinions', percentage: 5, description: 'Various political topics' }
      ],
      politicalContent: {
        posts: 8,
        totalPosts: 423,
        description: 'Mix of political opinions on various topics',
        tone: 'Some strong opinions expressed',
        assessment: 'Political opinions are constitutionally protected under First Amendment. Cannot be basis for disqualification unless content advocates illegal activity or demonstrates clear unsuitability (hate speech, threats, etc.). Subject\'s political posts do NOT meet disqualification threshold.',
        isProtected: true,
        notDisqualifying: true
      },
      flaggedContent: [
        {
          id: 1,
          platform: 'Facebook',
          date: '2016-03-15',
          ageAtTime: 22,
          yearsAgo: 10,
          type: 'Party photo with inappropriate caption',
          description: 'College party photo with profanity in caption',
          context: 'College junior, typical college social scene',
          severity: 'Low - immature but not disqualifying'
        },
        {
          id: 2,
          platform: 'Twitter/X',
          date: '2017-08-22',
          ageAtTime: 23,
          yearsAgo: 9,
          type: 'Tweet with crude language',
          description: 'Tweet about dating with crude language',
          context: 'Recent college graduate, immature post',
          severity: 'Low - immature but not disqualifying'
        },
        {
          id: 3,
          platform: 'Facebook',
          date: '2018-10-08',
          ageAtTime: 24,
          yearsAgo: 8,
          type: 'Shared meme',
          description: 'Shared meme with sexual innuendo',
          context: 'Shared content (not original), humor common at time',
          severity: 'Low - shared content, not original'
        },
        {
          id: 4,
          platform: 'Twitter/X',
          date: '2019-01-12',
          ageAtTime: 25,
          yearsAgo: 7,
          type: 'Tweet about nightlife',
          description: 'Comment about bar night with profanity',
          context: 'Social night out, immature language',
          severity: 'Low - immature but not disqualifying'
        },
        {
          id: 5,
          platform: 'Facebook',
          date: '2019-06-28',
          ageAtTime: 25,
          yearsAgo: 7,
          type: 'Shared video',
          description: 'Shared video with inappropriate humor',
          context: 'Shared content (not original), humor common at time',
          severity: 'Low - shared content, not original'
        }
      ],
      professionalBoundaries: {
        maintainsAppropriate: false,
        historicalIssues: true,
        recentBehaviorAppropriate: true,
        noRecentIssues: true
      },
      recentBehavior: {
        period: '2020-2024',
        posts: 65,
        assessment: 'Professional and appropriate - significant maturity shown',
        tone: 'Career-focused, community-engaged, professional',
        noInappropriateContent: true,
        showsGrowth: true
      },
      timeContext: {
        flaggedPostsAge: '5-10 years old (2016-2019)',
        subjectAgeAtTime: '22-25 years old (college/early 20s)',
        timeElapsed: 'Significant (5-10 years)',
        recentBehavior: 'Professional, appropriate, shows maturity'
      },
      concerns: [
        'Inappropriate language in old posts (5-10 years ago)',
        'Immature content from college years (ages 22-25)',
        'Some crude humor shared during early 20s'
      ],
      mitigatingFactors: [
        'All flagged posts are 5-10 years old (college years)',
        'Subject was 22-25 years old at time (early 20s immaturity)',
        'Recent 5 years of posts are professional and appropriate',
        'Subject appears to have matured significantly',
        'No hate speech, threats, or illegal activity advocacy',
        'Political opinions are constitutionally protected'
      ],
      investigatorAssessment: 'Mixed online presence. Several posts from 5-10 years ago (ages 22-25, college/early 20s) contain inappropriate language and immature content. However, recent activity (last 5 years) is significantly more professional. Flagged posts are from college years and appear to reflect immaturity rather than current character. Subject appears to have matured. Recent posts are appropriate and professional. Political posts are protected speech and do not meet disqualification threshold.',
      recommendation: 'Conditional - Discuss Flagged Content',
      recommendationNote: 'Require applicant discussion about old posts. Questions: Has subject matured? Does he understand why posts were inappropriate? Would he delete/address them? If applicant demonstrates growth and understanding: Consider approval. Old posts alone should not disqualify if subject has clearly matured.',
      conditionalAction: 'Interview applicant about old posts and assess maturity',
      assignedTo: 'Agent Brooks'
    },
    {
      id: 'report-4',
      subject: 'Maria Rodriguez',
      caseId: 'BI-2024-138',
      position: 'Deputy Sheriff Applicant',
      status: 'In Progress',
      statusCategory: 'progress',
      reviewDate: '2024-11-03',
      reviewPeriod: 'Last 5 years (2019-2024)',
      reviewedBy: 'Agent Brooks',
      reviewerBadge: 'BI-107',
      platforms: [
        { name: 'LinkedIn', handle: 'maria-rodriguez-professional', status: 'Professional profile', posts: 0, privacy: 'Professional (no posts)' },
        { name: 'Facebook', handle: 'Not found', status: 'Not found or private', posts: 0, privacy: 'N/A' },
        { name: 'Twitter/X', handle: 'Not found', status: 'Not found', posts: 0, privacy: 'N/A' },
        { name: 'Instagram', handle: 'Not found', status: 'Not found or private', posts: 0, privacy: 'N/A' }
      ],
      totalPostsReviewed: 0,
      flaggedPosts: 0,
      contentThemes: [],
      preliminaryFindings: {
        minimalPresence: true,
        linkedInProfessional: true,
        mostAccountsPrivateOrInactive: true,
        limitedPublicContent: true
      },
      nextActions: [
        'Complete search for additional platforms',
        'Verify no other public social media presence',
        'Finalize assessment based on limited online presence'
      ],
      expectedCompletion: '2024-11-04',
      investigatorAssessment: 'Analysis in progress. Subject has minimal social media presence. Very limited public profiles. Most accounts private or inactive. LinkedIn profile professional (no public posts). Limited online footprint is not a concern - some applicants simply have minimal social media presence, which is acceptable.',
      recommendation: 'Pending Completion',
      recommendationNote: 'Will finalize assessment upon completion of review. Minimal online presence is not disqualifying.'
    }
  ];

  const clearCount = socialMediaReports.filter(r => r.statusCategory === 'clear').length;
  const reviewCount = socialMediaReports.filter(r => r.statusCategory === 'review').length;
  const progressCount = socialMediaReports.filter(r => r.statusCategory === 'progress').length;

  const filteredReports = activeTab === 'all' ? socialMediaReports :
    socialMediaReports.filter(r => r.statusCategory === activeTab);

  const getStatusColor = (category) => {
    switch (category) {
      case 'clear': return 'green';
      case 'review': return 'amber';
      case 'progress': return 'blue';
      default: return 'slate';
    }
  };

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
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-4">
              <div>
                <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white mb-2">Social Media Analysis</h2>
                <p className="text-slate-600 dark:text-slate-400 mb-2">Public online presence, digital footprint, and professional conduct assessment</p>
                <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    Thursday, January 30, 2026 at 10:32 AM EST
                  </span>
                  <span className="flex items-center gap-1.5">
                    <User className="w-4 h-4" />
                    Agent Brooks (Badge #BI-107)
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <button className="flex items-center gap-2 px-4 py-2 bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 rounded-xl text-sm font-medium transition-colors border border-purple-500/20">
                  <Plus className="w-4 h-4" />Add Profile
                </button>
                <button className="flex items-center gap-2 px-3 py-2 bg-slate-800/40 hover:bg-slate-800/60 text-slate-700 dark:text-slate-300 rounded-xl text-sm font-medium transition-colors border border-slate-700/50">
                  <BookOpen className="w-4 h-4" />Policy Guidelines
                </button>
                <button className="flex items-center gap-2 px-3 py-2 bg-slate-800/40 hover:bg-slate-800/60 text-slate-700 dark:text-slate-300 rounded-xl text-sm font-medium transition-colors border border-slate-700/50">
                  <Download className="w-4 h-4" />Export
                </button>
                <button className="flex items-center gap-2 px-3 py-2 bg-slate-800/40 hover:bg-slate-800/60 text-slate-700 dark:text-slate-300 rounded-xl text-sm font-medium transition-colors border border-slate-700/50">
                  <Printer className="w-4 h-4" />Print
                </button>
              </div>
            </div>

            {/* Public Information Only Notice */}
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 mb-4">
              <div className="flex items-start gap-3">
                <Globe className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-blue-400 mb-1">PUBLIC INFORMATION ONLY - First Amendment Considerations Apply</h4>
                  <p className="text-xs text-blue-300/80">Analysis limited to publicly accessible content only. No private/protected posts reviewed. No "friending" or "following" to gain access. Political opinions and protected speech cannot be basis for disqualification unless content demonstrates clear unsuitability (hate speech, threats, advocacy of illegal activity).</p>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <span className="text-slate-600 dark:text-slate-400">Total profiles analyzed: <span className="text-slate-900 dark:text-white font-medium">{socialMediaReports.length} subjects</span></span>
              <span className="text-slate-500">|</span>
              <span className="text-slate-600 dark:text-slate-400">Platforms reviewed: <span className="text-slate-900 dark:text-white font-medium">Facebook, LinkedIn, Twitter/X, Instagram</span></span>
            </div>
          </div>

          {/* Social Media Review Status Summary */}
          <div className="bg-white dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700/50 rounded-xl shadow-sm dark:shadow-none p-5 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
                <ClipboardList className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-slate-900 dark:text-white">Social Media Review Status Summary</h3>
                <p className="text-xs text-slate-500">As of January 30, 2026 at 10:32 AM EST</p>
              </div>
            </div>

            {/* Overall Status */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">Overall Status</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-500">Total subjects reviewed:</span>
                    <span className="text-slate-900 dark:text-white font-medium">{socialMediaReports.length} (across multiple cases)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400" />
                    <span className="text-slate-600 dark:text-slate-400">Approved (no concerns):</span>
                    <span className="text-green-400 font-medium">{clearCount}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-400" />
                    <span className="text-slate-600 dark:text-slate-400">Conditional (requires discussion):</span>
                    <span className="text-amber-400 font-medium">{reviewCount}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-400" />
                    <span className="text-slate-600 dark:text-slate-400">In progress:</span>
                    <span className="text-blue-400 font-medium">{progressCount}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Ban className="w-4 h-4 text-red-400" />
                    <span className="text-slate-600 dark:text-slate-400">Disqualified:</span>
                    <span className="text-red-400 font-medium">0</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">Review Guidelines</h4>
                <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                  <div className="flex items-start gap-2">
                    <Globe className="w-3.5 h-3.5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span>Public content only (no private account access)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Scale className="w-3.5 h-3.5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span>First Amendment protections apply (political speech protected)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <History className="w-3.5 h-3.5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span>Time context matters (old posts vs recent behavior)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <MessageSquare className="w-3.5 h-3.5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span>Concerns require discussion (not automatic disqualification)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Eye className="w-3.5 h-3.5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span>Focus on professional suitability indicators</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Subject Summaries */}
            <div className="mt-5 pt-5 border-t border-slate-700/50">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Clear */}
                <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400" />
                    <span className="text-sm font-medium text-green-400">Approved - No Concerns ({clearCount})</span>
                  </div>
                  {socialMediaReports.filter(r => r.statusCategory === 'clear').map(r => (
                    <div key={r.id} className="text-xs text-slate-700 dark:text-slate-300 mb-1">
                      <span className="font-medium">{r.subject}</span> ({r.caseId})
                      <div className="text-slate-500 ml-2">{r.totalPostsReviewed} posts | Professional presence</div>
                    </div>
                  ))}
                </div>

                {/* Review Required */}
                <div className="bg-amber-500/5 border border-amber-500/20 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="w-4 h-4 text-amber-400" />
                    <span className="text-sm font-medium text-amber-400">Conditional - Discussion Required ({reviewCount})</span>
                  </div>
                  {socialMediaReports.filter(r => r.statusCategory === 'review').map(r => (
                    <div key={r.id} className="text-xs text-slate-700 dark:text-slate-300 mb-1">
                      <span className="font-medium">{r.subject}</span> ({r.caseId})
                      <div className="text-slate-500 ml-2">{r.flaggedPosts} flagged posts (old content)</div>
                      <div className="text-amber-400/80 ml-2 mt-1">Action: {r.conditionalAction}</div>
                    </div>
                  ))}
                </div>

                {/* In Progress */}
                <div className="bg-blue-500/5 border border-blue-500/20 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4 text-blue-400" />
                    <span className="text-sm font-medium text-blue-400">In Progress ({progressCount})</span>
                  </div>
                  {socialMediaReports.filter(r => r.statusCategory === 'progress').map(r => (
                    <div key={r.id} className="text-xs text-slate-700 dark:text-slate-300 mb-1">
                      <span className="font-medium">{r.subject}</span> ({r.caseId})
                      <div className="text-slate-500 ml-2">Minimal online presence</div>
                      <div className="text-blue-400/80 ml-2 mt-1">Expected: {r.expectedCompletion}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Important Notes */}
            <div className="mt-4 pt-4 border-t border-slate-700/50">
              <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Important Notes on Social Media Review</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-600 dark:text-slate-400">
                <div className="bg-slate-900/40 rounded-lg p-3">
                  <p className="font-medium text-slate-700 dark:text-slate-300 mb-1">First Amendment Considerations</p>
                  <p>Applicants have constitutional right to free speech. Political opinions, religious views, and other protected speech cannot be basis for disqualification unless content demonstrates clear unsuitability (explicit threats, hate speech, advocacy of illegal activity).</p>
                </div>
                <div className="bg-slate-900/40 rounded-lg p-3">
                  <p className="font-medium text-slate-700 dark:text-slate-300 mb-1">Time Context Matters</p>
                  <p>Posts from many years ago (especially college years) are evaluated with context. People mature and change. Old posts may not reflect current character. Focus is on recent behavior and patterns.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Status Filter Tabs */}
          <div className="flex flex-wrap gap-2 mb-4">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'all' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' : 'bg-slate-800/40 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-700/50'}`}
            >
              All Profiles ({socialMediaReports.length})
            </button>
            <button
              onClick={() => setActiveTab('clear')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'clear' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-slate-800/40 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-700/50'}`}
            >
              <span className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Clear ({clearCount})
              </span>
            </button>
            <button
              onClick={() => setActiveTab('review')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'review' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'bg-slate-800/40 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-700/50'}`}
            >
              <span className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Review Required ({reviewCount})
              </span>
            </button>
            <button
              onClick={() => setActiveTab('progress')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'progress' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' : 'bg-slate-800/40 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-700/50'}`}
            >
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                In Progress ({progressCount})
              </span>
            </button>
          </div>

          {/* Social Media Review Cards */}
          <div className="space-y-4">
            {filteredReports.map((report) => {
              const isExpanded = expandedReport === report.id;
              const statusColor = getStatusColor(report.statusCategory);

              return (
                <div key={report.id} className={`bg-slate-800/40 border rounded-xl overflow-hidden ${
                  report.statusCategory === 'clear' ? 'border-green-500/30' :
                  report.statusCategory === 'review' ? 'border-amber-500/30' : 'border-blue-500/30'
                }`}>
                  {/* Card Header */}
                  <div
                    className="p-5 cursor-pointer hover:bg-slate-800/60 transition-colors"
                    onClick={() => setExpandedReport(isExpanded ? null : report.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          report.statusCategory === 'clear' ? 'bg-green-500/20' :
                          report.statusCategory === 'review' ? 'bg-amber-500/20' : 'bg-blue-500/20'
                        }`}>
                          {report.statusCategory === 'clear' ? <CheckCircle2 className="w-6 h-6 text-green-400" /> :
                           report.statusCategory === 'review' ? <AlertCircle className="w-6 h-6 text-amber-400" /> :
                           <Clock className="w-6 h-6 text-blue-400" />}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`text-xs font-medium px-2 py-0.5 rounded ${
                              report.statusCategory === 'clear' ? 'bg-green-500/20 text-green-400' :
                              report.statusCategory === 'review' ? 'bg-amber-500/20 text-amber-400' : 'bg-blue-500/20 text-blue-400'
                            }`}>
                              {report.status}
                            </span>
                            <span className="text-xs text-slate-500 flex items-center gap-1">
                              <Globe className="w-3 h-3" /> Public Info Only
                            </span>
                          </div>
                          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{report.subject}</h3>
                          <p className="text-sm text-purple-400">{report.caseId} - {report.position}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-2xl font-bold text-slate-900 dark:text-white">{report.totalPostsReviewed}</p>
                          <p className="text-xs text-slate-500">Posts Reviewed</p>
                          {report.flaggedPosts > 0 && (
                            <p className="text-xs text-amber-400">{report.flaggedPosts} flagged (old content)</p>
                          )}
                        </div>
                        {isExpanded ? <ChevronUp className="w-5 h-5 text-slate-600 dark:text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-600 dark:text-slate-400" />}
                      </div>
                    </div>

                    {/* Platforms Row */}
                    <div className="flex flex-wrap gap-2 mt-4">
                      {report.platforms.map((platform, idx) => (
                        <span key={idx} className={`px-2.5 py-1 rounded-lg text-xs font-medium ${
                          platform.posts > 0 ? 'bg-purple-500/10 text-purple-400' : 'bg-slate-700/50 text-slate-500'
                        }`}>
                          {platform.name}: {platform.posts > 0 ? `${platform.posts} posts` : platform.status}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Expanded Content */}
                  {isExpanded && (
                    <div className="border-t border-slate-700/50 p-5">
                      {/* Review Summary */}
                      <div className="mb-6">
                        <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                          <FileText className="w-4 h-4 text-purple-400" />
                          Social Media Review Summary
                        </h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-slate-500">Review date:</span>
                            <span className="text-slate-700 dark:text-slate-300 ml-2">{new Date(report.reviewDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                          </div>
                          <div>
                            <span className="text-slate-500">Review period:</span>
                            <span className="text-slate-700 dark:text-slate-300 ml-2">{report.reviewPeriod}</span>
                          </div>
                          <div>
                            <span className="text-slate-500">Reviewed by:</span>
                            <span className="text-slate-700 dark:text-slate-300 ml-2">{report.reviewedBy} (#{report.reviewerBadge})</span>
                          </div>
                          <div>
                            <span className="text-slate-500">Platforms:</span>
                            <span className="text-slate-700 dark:text-slate-300 ml-2">{report.platforms.length} identified</span>
                          </div>
                        </div>
                      </div>

                      {/* Platform Details */}
                      <div className="mb-6">
                        <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                          <Share2 className="w-4 h-4 text-purple-400" />
                          Platforms Reviewed
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {report.platforms.map((platform, idx) => (
                            <div key={idx} className="bg-slate-900/40 rounded-lg p-3">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-slate-900 dark:text-white">{platform.name}</span>
                                <span className={`text-xs px-2 py-0.5 rounded ${platform.posts > 0 ? 'bg-green-500/20 text-green-400' : 'bg-slate-700/50 text-slate-500'}`}>
                                  {platform.posts > 0 ? `${platform.posts} posts` : 'No public posts'}
                                </span>
                              </div>
                              <div className="text-xs text-slate-600 dark:text-slate-400">
                                <p>Handle: {platform.handle || 'N/A'}</p>
                                <p>Status: {platform.status}</p>
                                {platform.connections && <p>Connections: {platform.connections}</p>}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Content Themes (if available) */}
                      {report.contentThemes && report.contentThemes.length > 0 && (
                        <div className="mb-6">
                          <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                            <Hash className="w-4 h-4 text-purple-400" />
                            Content Analysis
                          </h4>
                          <div className="bg-slate-900/40 rounded-xl p-4">
                            <div className="space-y-3">
                              {report.contentThemes.map((theme, idx) => (
                                <div key={idx}>
                                  <div className="flex items-center justify-between mb-1">
                                    <span className="text-sm text-slate-700 dark:text-slate-300">{theme.theme}</span>
                                    <span className="text-sm text-slate-600 dark:text-slate-400">{theme.percentage}%</span>
                                  </div>
                                  <div className="w-full bg-slate-700/50 rounded-full h-2">
                                    <div
                                      className={`h-2 rounded-full ${
                                        theme.theme.includes('Professional') || theme.theme.includes('Community') ? 'bg-green-500' :
                                        theme.theme.includes('College') || theme.theme.includes('Party') ? 'bg-amber-500' : 'bg-blue-500'
                                      }`}
                                      style={{ width: `${theme.percentage}%` }}
                                    />
                                  </div>
                                  <p className="text-xs text-slate-500 mt-1">{theme.description}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Political Content Assessment */}
                      {report.politicalContent && (
                        <div className="mb-6">
                          <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                            <Scale className="w-4 h-4 text-purple-400" />
                            Political Content Assessment
                          </h4>
                          <div className={`rounded-xl p-4 ${report.politicalContent.isProtected ? 'bg-blue-500/10 border border-blue-500/30' : 'bg-slate-900/40'}`}>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm text-slate-700 dark:text-slate-300">Political posts found:</span>
                              <span className="text-sm text-slate-900 dark:text-white font-medium">{report.politicalContent.posts} of {report.politicalContent.totalPosts} posts</span>
                            </div>
                            <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">{report.politicalContent.description}</p>
                            <div className="bg-blue-500/10 rounded-lg p-3 mt-2">
                              <p className="text-xs text-blue-300 flex items-start gap-2">
                                <Scale className="w-4 h-4 flex-shrink-0 mt-0.5" />
                                <span><strong>First Amendment Note:</strong> {report.politicalContent.assessment}</span>
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Flagged Content (for review cases) */}
                      {report.flaggedContent && report.flaggedContent.length > 0 && (
                        <div className="mb-6">
                          <h4 className="text-sm font-semibold text-amber-400 mb-3 flex items-center gap-2">
                            <Flag className="w-4 h-4" />
                            Flagged Content - Requires Discussion ({report.flaggedContent.length} posts)
                          </h4>
                          <div className="space-y-3">
                            {report.flaggedContent.map((flagged, idx) => (
                              <div key={idx} className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
                                <div className="flex items-start justify-between mb-2">
                                  <div>
                                    <span className="text-sm font-medium text-amber-400">Flagged Post #{flagged.id}</span>
                                    <span className="text-xs text-slate-500 ml-2">({flagged.platform}, {flagged.date})</span>
                                  </div>
                                  <span className="text-xs px-2 py-0.5 bg-amber-500/20 text-amber-300 rounded">{flagged.yearsAgo} years ago</span>
                                </div>
                                <div className="grid grid-cols-2 gap-2 text-xs mb-2">
                                  <div>
                                    <span className="text-slate-500">Age at time:</span>
                                    <span className="text-slate-700 dark:text-slate-300 ml-1">{flagged.ageAtTime} years old</span>
                                  </div>
                                  <div>
                                    <span className="text-slate-500">Type:</span>
                                    <span className="text-slate-700 dark:text-slate-300 ml-1">{flagged.type}</span>
                                  </div>
                                </div>
                                <p className="text-sm text-slate-700 dark:text-slate-300 mb-1">{flagged.description}</p>
                                <p className="text-xs text-slate-500">Context: {flagged.context}</p>
                                <p className="text-xs text-amber-400/80 mt-1">Severity: {flagged.severity}</p>
                              </div>
                            ))}
                          </div>

                          {/* Time Context */}
                          {report.timeContext && (
                            <div className="mt-4 bg-slate-900/60 rounded-lg p-4">
                              <h5 className="text-sm font-medium text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                                <History className="w-4 h-4 text-blue-400" />
                                Time Context (Important)
                              </h5>
                              <div className="grid grid-cols-2 gap-2 text-xs">
                                <div>
                                  <span className="text-slate-500">Flagged posts age:</span>
                                  <span className="text-slate-700 dark:text-slate-300 ml-1">{report.timeContext.flaggedPostsAge}</span>
                                </div>
                                <div>
                                  <span className="text-slate-500">Subject's age at time:</span>
                                  <span className="text-slate-700 dark:text-slate-300 ml-1">{report.timeContext.subjectAgeAtTime}</span>
                                </div>
                                <div>
                                  <span className="text-slate-500">Time elapsed:</span>
                                  <span className="text-slate-700 dark:text-slate-300 ml-1">{report.timeContext.timeElapsed}</span>
                                </div>
                                <div>
                                  <span className="text-slate-500">Recent behavior:</span>
                                  <span className="text-green-400 ml-1">{report.timeContext.recentBehavior}</span>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Recent Behavior (for review cases) */}
                      {report.recentBehavior && report.statusCategory === 'review' && (
                        <div className="mb-6">
                          <h4 className="text-sm font-semibold text-green-400 mb-3 flex items-center gap-2">
                            <TrendingUp className="w-4 h-4" />
                            Recent Behavior ({report.recentBehavior.period})
                          </h4>
                          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-2">
                              <CheckCircle className="w-4 h-4 text-green-400" />
                              <span className="text-sm text-green-400">Recent posts are professional and appropriate</span>
                            </div>
                            <p className="text-sm text-slate-700 dark:text-slate-300">Assessment: {report.recentBehavior.assessment}</p>
                            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">Tone: {report.recentBehavior.tone}</p>
                            {report.recentBehavior.showsGrowth && (
                              <p className="text-xs text-green-400 mt-2">Subject appears to have matured significantly over time.</p>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Mitigating Factors (for review cases) */}
                      {report.mitigatingFactors && report.mitigatingFactors.length > 0 && (
                        <div className="mb-6">
                          <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                            <Award className="w-4 h-4 text-purple-400" />
                            Mitigating Factors
                          </h4>
                          <div className="bg-slate-900/40 rounded-lg p-4">
                            <ul className="space-y-1.5">
                              {report.mitigatingFactors.map((factor, idx) => (
                                <li key={idx} className="text-sm text-slate-700 dark:text-slate-300 flex items-start gap-2">
                                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                                  {factor}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}

                      {/* Professional Boundaries */}
                      {report.professionalBoundaries && (
                        <div className="mb-6">
                          <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                            <ShieldAlert className="w-4 h-4 text-purple-400" />
                            Professional Boundaries Assessment
                          </h4>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                            {Object.entries(report.professionalBoundaries).filter(([key]) => !key.includes('Issues')).map(([key, value]) => (
                              <div key={key} className={`flex items-center gap-2 text-sm p-2 rounded-lg ${value ? 'bg-green-500/5' : 'bg-amber-500/5'}`}>
                                {value ? <CheckCircle className="w-4 h-4 text-green-500" /> : <AlertCircle className="w-4 h-4 text-amber-500" />}
                                <span className={value ? 'text-green-400' : 'text-amber-400'}>
                                  {key === 'maintainsAppropriate' && 'Appropriate boundaries'}
                                  {key === 'noDisparaging' && 'No disparaging comments'}
                                  {key === 'noConfidentialDisclosure' && 'No confidential disclosures'}
                                  {key === 'noInappropriatePhotos' && 'No inappropriate photos'}
                                  {key === 'noConcerningAssociations' && 'No concerning associations'}
                                  {key === 'excellentPrivacyAwareness' && 'Excellent privacy awareness'}
                                  {key === 'recentBehaviorAppropriate' && 'Recent behavior appropriate'}
                                  {key === 'noRecentIssues' && 'No recent issues'}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Preliminary Findings (for in-progress) */}
                      {report.preliminaryFindings && (
                        <div className="mb-6">
                          <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                            <Search className="w-4 h-4 text-purple-400" />
                            Preliminary Findings
                          </h4>
                          <div className="bg-slate-900/40 rounded-lg p-4">
                            <div className="space-y-2 text-sm">
                              {report.preliminaryFindings.minimalPresence && (
                                <p className="text-slate-700 dark:text-slate-300 flex items-center gap-2">
                                  <CheckCircle className="w-4 h-4 text-blue-400" />
                                  Subject has minimal social media presence
                                </p>
                              )}
                              {report.preliminaryFindings.linkedInProfessional && (
                                <p className="text-slate-700 dark:text-slate-300 flex items-center gap-2">
                                  <CheckCircle className="w-4 h-4 text-green-400" />
                                  LinkedIn profile is professional
                                </p>
                              )}
                              {report.preliminaryFindings.mostAccountsPrivateOrInactive && (
                                <p className="text-slate-700 dark:text-slate-300 flex items-center gap-2">
                                  <CheckCircle className="w-4 h-4 text-blue-400" />
                                  Most accounts appear private or inactive
                                </p>
                              )}
                            </div>
                            {report.nextActions && (
                              <div className="mt-4 pt-4 border-t border-slate-700/50">
                                <p className="text-xs text-slate-500 mb-2">Next Actions:</p>
                                <ul className="space-y-1">
                                  {report.nextActions.map((action, idx) => (
                                    <li key={idx} className="text-xs text-slate-600 dark:text-slate-400 flex items-center gap-2">
                                      <Clock className="w-3 h-3 text-blue-400" />
                                      {action}
                                    </li>
                                  ))}
                                </ul>
                                <p className="text-xs text-blue-400 mt-2">Expected completion: {report.expectedCompletion}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Investigator Assessment */}
                      <div className="mb-6 bg-slate-900/40 rounded-xl p-4">
                        <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-2">Investigator Assessment</h4>
                        <p className="text-sm text-slate-700 dark:text-slate-300 mb-4">{report.investigatorAssessment}</p>

                        <div className={`p-4 rounded-lg ${
                          report.statusCategory === 'clear' ? 'bg-green-500/10 border border-green-500/30' :
                          report.statusCategory === 'review' ? 'bg-amber-500/10 border border-amber-500/30' :
                          'bg-blue-500/10 border border-blue-500/30'
                        }`}>
                          <div className="flex items-center gap-2 mb-2">
                            <span className={`text-sm font-semibold ${
                              report.statusCategory === 'clear' ? 'text-green-400' :
                              report.statusCategory === 'review' ? 'text-amber-400' : 'text-blue-400'
                            }`}>
                              RECOMMENDATION: {report.recommendation.toUpperCase()}
                            </span>
                          </div>
                          <p className="text-sm text-slate-700 dark:text-slate-300">{report.recommendationNote}</p>
                          {report.approvedBy && (
                            <p className="text-xs text-slate-500 mt-2">
                              Approved by: {report.approvedBy} ({report.approvalDate})
                            </p>
                          )}
                          {report.assignedTo && (
                            <p className="text-xs text-slate-500 mt-2">
                              Assigned to: {report.assignedTo} for applicant interview
                            </p>
                          )}
                        </div>
                      </div>

                      {/* First Amendment Reminder (for review cases) */}
                      {report.statusCategory === 'review' && (
                        <div className="mb-6 bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
                          <h4 className="text-sm font-semibold text-blue-400 mb-2 flex items-center gap-2">
                            <Scale className="w-4 h-4" />
                            First Amendment Reminder
                          </h4>
                          <p className="text-sm text-blue-300/80">
                            Political opinions and protected speech alone cannot be basis for disqualification. Focus discussion on professional suitability, maturity demonstrated, and understanding of appropriate conduct. Old immature posts (especially from college years) should be evaluated with time context - people mature and change.
                          </p>
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-slate-700/50">
                        <button className="flex items-center gap-2 px-4 py-2 bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 rounded-xl text-sm font-medium transition-colors border border-purple-500/20">
                          <Eye className="w-4 h-4" />View Detailed Analysis
                        </button>
                        {report.statusCategory === 'clear' && (
                          <button className="flex items-center gap-2 px-4 py-2 bg-slate-800/40 hover:bg-slate-800/60 text-slate-700 dark:text-slate-300 rounded-xl text-sm font-medium transition-colors border border-slate-700/50">
                            <Image className="w-4 h-4" />View Sample Posts
                          </button>
                        )}
                        {report.statusCategory === 'review' && (
                          <>
                            <button className="flex items-center gap-2 px-4 py-2 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 rounded-xl text-sm font-medium transition-colors border border-amber-500/20">
                              <Flag className="w-4 h-4" />View Flagged Posts
                            </button>
                            <button className="flex items-center gap-2 px-4 py-2 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 rounded-xl text-sm font-medium transition-colors border border-amber-500/20">
                              <Calendar className="w-4 h-4" />Schedule Discussion
                            </button>
                          </>
                        )}
                        {report.statusCategory === 'progress' && (
                          <button className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded-xl text-sm font-medium transition-colors border border-blue-500/20">
                            <CheckCircle className="w-4 h-4" />Complete Analysis
                          </button>
                        )}
                        <button className="flex items-center gap-2 px-4 py-2 bg-slate-800/40 hover:bg-slate-800/60 text-slate-700 dark:text-slate-300 rounded-xl text-sm font-medium transition-colors border border-slate-700/50">
                          <Printer className="w-4 h-4" />Print Report
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

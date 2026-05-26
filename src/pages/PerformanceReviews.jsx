import React, { useState } from 'react';
import { Users, FileText, LayoutDashboard, TrendingUp, Settings, Bell, Search, ChevronRight, CheckCircle, Shield, X, Menu, ChevronLeft, LogOut, UserPlus, Briefcase, Clock, Award, Download, Calendar, Phone, Mail, FileCheck, AlertTriangle, AlertCircle, ClipboardCheck, GraduationCap, ChevronDown, ChevronUp, Eye, HelpCircle, Printer, Square, Info, Target, Edit, Filter, BarChart3, XCircle, ExternalLink, Circle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function PerformanceReviews() {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState('performance');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [logoutConfirmOpen, setLogoutConfirmOpen] = useState(false);
  const [supportOpen, setSupportOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [expandedOverdue, setExpandedOverdue] = useState(true);
  const [expandedCards, setExpandedCards] = useState({});
  const [selectedReview, setSelectedReview] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDivision, setFilterDivision] = useState('all');

  const navigation = [
    { id: 'hr-dashboard', label: 'HR Dashboard', icon: Users, page: 'HRDashboard' },
    { id: 'job-postings', label: 'Job Postings', icon: Briefcase, page: 'JobPostings' },
    { id: 'applicant-tracking', label: 'Applicant Tracking', icon: UserPlus, page: 'ApplicantTracking' },
    { id: 'hiring-pipeline', label: 'Hiring Pipeline', icon: TrendingUp, page: 'HiringPipeline' },
    { id: 'compliance', label: 'HR Compliance', icon: ClipboardCheck, page: 'ComplianceManagement' },
    { id: 'onboarding', label: 'New Hire Onboarding', icon: FileCheck, page: 'NewHireOnboarding' },
    { id: 'training-certifications', label: 'Training & Certifications', icon: GraduationCap, page: 'TrainingCertifications' },
    { id: 'employee-records', label: 'Employee Records', icon: FileText, page: 'EmployeeRecords' },
    { id: 'time-off', label: 'Time Off Management', icon: Calendar, page: 'TimeOffManagement' },
    { id: 'performance', label: 'Performance Reviews', icon: Award },
    { id: 'hr-reports', label: 'HR Reports', icon: LayoutDashboard, page: 'HRReports' },
    { id: 'hr-calendar', label: 'HR Calendar', icon: Calendar, page: 'HRCalendar' }
  ];

  const notifications = [
    { id: 1, title: 'CRITICAL: Q3 2024 Evaluation Overdue', message: 'Michael Davis (#DCT-8093) - 510+ days overdue, escalate to Sheriff', time: '30 min ago', urgent: true },
    { id: 2, title: '3 Supervisor Reviews Pending', message: 'Sgt. Anderson (2) and Lt. Martinez (1) - Q4 2024 reviews awaiting completion', time: '1 hour ago', urgent: true },
    { id: 3, title: 'Q4 2024 Cycle 89% Complete', message: '6 of 7 evaluations on track - 1 severely overdue (Michael Davis Q3)', time: '3 hours ago', urgent: false },
    { id: 4, title: 'Self-Assessment Submitted', message: 'Robert Martinez completed self-assessment for Q4 2024 review', time: '1 day ago', urgent: false }
  ];

  const evaluationCategories = [
    'Job Knowledge',
    'Quality of Work',
    'Quantity of Work',
    'Initiative and Resourcefulness',
    'Dependability and Reliability',
    'Judgment and Decision Making',
    'Interpersonal Relations and Teamwork',
    'Communication Skills',
    'Adaptability and Flexibility',
    'Adherence to Policies and Procedures'
  ];

  const ratingScale = [
    { score: 1, label: 'Unsatisfactory' },
    { score: 2, label: 'Needs Improvement' },
    { score: 3, label: 'Meets Expectations' },
    { score: 4, label: 'Exceeds Expectations' },
    { score: 5, label: 'Outstanding' }
  ];

  const reviews = [
    {
      id: 7,
      employee: 'Michael Davis',
      badge: 'DCT-8093',
      department: 'Detention Center',
      position: 'Detention Officer',
      shift: 'Detention B-Shift',
      supervisor: 'Major R. Wilson',
      supervisorTitle: 'Detention Commander',
      reviewPeriod: 'Q3 2024',
      periodDates: 'July 1 - September 30, 2024',
      reviewType: 'Annual Performance Evaluation',
      deadline: 'October 31, 2024',
      daysOverdue: 510,
      status: 'overdue',
      hireDate: 'February 8, 2020',
      yearsOfService: '6 years',
      selfAssessment: { status: 'completed', date: 'September 15, 2024' },
      supervisorReview: { status: 'not-completed', date: null, daysOverdue: 510 },
      reviewMeeting: { status: 'pending' },
      signatures: { status: 'pending' },
      personnelFile: { status: 'pending' },
      progress: 20,
      escalationHistory: [
        { date: '11/15/2024', days: 15, action: 'Email reminder sent to Major Wilson', icon: 'email' },
        { date: '12/01/2024', days: 31, action: 'HR Director meeting with Major Wilson', icon: 'meeting' },
        { date: '01/15/2025', days: 76, action: 'Sheriff written directive issued to Major Wilson', icon: 'directive' },
        { date: '02/21/2026', days: 510, action: 'CURRENT STATUS - Still not completed', icon: 'current' }
      ],
      impact: [
        'Cannot apply for Corporal position (requires current evaluation on file - position posted 08/2025, could not apply)',
        'Step increase delayed (pending evaluation approval - estimated $1,200+ annual loss)',
        'Cannot identify training needs or career development opportunities without evaluation',
        'Incomplete personnel file creates audit/legal liability for GCSO'
      ],
      currentNote: 'Michael Davis currently ON MEDICAL LEAVE (see Employee Records page). This may explain partial delay but does NOT excuse 17-month overdue evaluation.',
      requiredActions: [
        'HR Director: Schedule meeting with Major Wilson TODAY',
        'Major Wilson: Complete Michael Davis Q3 2024 evaluation within 7 days (deadline: February 28, 2026)',
        'If Major Wilson cannot complete (employee on extended leave): Document reason for delay in writing',
        'Plan to complete evaluation immediately upon Michael\'s return to duty',
        'HR Director: Document supervisor counseling for Major Wilson (failure to complete evaluation for 17 months = supervisory performance issue)',
        'Sheriff notification: Brief Sheriff Taylor on this severe delay and impact on Michael Davis employment'
      ]
    },
    {
      id: 1,
      employee: 'Marcus Chen',
      badge: 'D-2145',
      department: 'Patrol Division',
      position: 'Deputy Sheriff',
      shift: 'C-Shift (18:00-06:00)',
      supervisor: 'Sgt. Anderson',
      supervisorTitle: 'C-Shift Commander',
      reviewPeriod: 'Q4 2024',
      periodDates: 'October 1 - December 31, 2024',
      reviewType: 'Annual Performance Evaluation',
      deadline: 'January 31, 2025',
      supervisorDeadline: 'January 15, 2025',
      daysOverdue: 37,
      status: 'in-progress',
      hireDate: 'March 14, 2018',
      yearsOfService: '7 years, 3 months',
      selfAssessment: {
        status: 'completed',
        date: 'December 10, 2024',
        components: ['Performance Goals Review (Q4 2024)', 'Strengths and Accomplishments', 'Areas for Development', 'Training Needs', 'Career Goals (promotion aspirations)']
      },
      supervisorReview: {
        status: 'pending',
        date: null,
        daysOverdue: 37,
        reminders: ['01/20/2025', '02/05/2025', '02/20/2025']
      },
      reviewMeeting: { status: 'pending', note: 'Not scheduled - pending supervisor review completion' },
      signatures: { status: 'pending' },
      personnelFile: { status: 'pending' },
      progress: 40,
      supervisorPattern: 'Sgt. Anderson has 3 overdue evaluations (Marcus Chen + 2 others) - pattern requires supervisory intervention',
      nextDeadline: 'February 28, 2026 (5 business days)',
      escalationNote: 'If not completed by 02/28/2026: HR Director escalates to Major Davis (Patrol Commander)'
    },
    {
      id: 2,
      employee: 'Sarah Williams',
      badge: 'D-1987',
      department: 'Patrol Division',
      position: 'Senior Deputy',
      shift: 'D-Shift (14:00-02:00)',
      supervisor: 'Lt. Martinez',
      supervisorTitle: 'Patrol Watch Commander',
      reviewPeriod: 'Q4 2024',
      periodDates: 'October 1 - December 31, 2024',
      reviewType: 'Annual Performance Evaluation',
      deadline: 'January 31, 2025',
      supervisorDeadline: 'January 10, 2025',
      daysOverdue: 42,
      status: 'in-progress',
      hireDate: 'June 22, 2019',
      yearsOfService: '7 years',
      selfAssessment: {
        status: 'completed',
        date: 'December 5, 2024',
        components: ['Performance Goals Review (Q4 2024)', 'Strengths and Accomplishments', 'Areas for Development', 'Training Needs', 'Career Goals (leadership development)']
      },
      supervisorReview: {
        status: 'pending',
        date: null,
        daysOverdue: 42,
        reminders: ['01/15/2025', '02/01/2025']
      },
      reviewMeeting: { status: 'pending', note: 'Not scheduled - pending supervisor review completion' },
      signatures: { status: 'pending' },
      personnelFile: { status: 'pending' },
      progress: 40,
      nextDeadline: 'February 28, 2026 (5 business days)',
      escalationNote: 'If not completed by 02/28/2026: HR Director escalates to Major Davis (Patrol Commander)'
    },
    {
      id: 3,
      employee: 'Robert Martinez',
      badge: 'D-2361',
      department: 'Patrol Division',
      position: 'Deputy Sheriff',
      shift: 'A-Shift (06:00-18:00)',
      supervisor: 'Sgt. Anderson',
      supervisorTitle: 'A-Shift Commander',
      reviewPeriod: 'Q4 2024',
      periodDates: 'October 1 - December 31, 2024',
      reviewType: 'Annual Performance Evaluation',
      deadline: 'January 31, 2025',
      supervisorDeadline: 'March 4, 2026',
      daysOverdue: 0,
      status: 'in-progress',
      hireDate: 'November 3, 2023',
      yearsOfService: '2 years',
      selfAssessment: {
        status: 'completed',
        date: 'February 18, 2026',
        note: 'Submitted 18 days late (agency deadline was Jan 31, 2025)',
        components: ['Performance Goals Review (Q4 2024)', 'Strengths and Accomplishments', 'Areas for Development', 'Training Needs', 'Career Goals']
      },
      supervisorReview: {
        status: 'not-started',
        date: null,
        daysOverdue: 0,
        note: 'Supervisor deadline: March 4, 2026 (14 days from self-assessment submission)'
      },
      reviewMeeting: { status: 'pending' },
      signatures: { status: 'pending' },
      personnelFile: { status: 'pending' },
      progress: 20,
      nextDeadline: 'March 4, 2026 (supervisor review deadline)',
      escalationNote: 'Self-assessment submitted late - supervisor review window is 14 days from submission'
    },
    {
      id: 4,
      employee: 'Jennifer Taylor',
      badge: 'ADM-0145',
      department: 'Administrative Services',
      position: 'Administrative Coordinator',
      shift: 'Day Shift (08:00-17:00)',
      supervisor: 'Director Phillips',
      supervisorTitle: 'Administrative Services Director',
      reviewPeriod: 'Q4 2024',
      periodDates: 'October 1 - December 31, 2024',
      reviewType: 'Annual Performance Evaluation',
      deadline: 'January 31, 2025',
      status: 'completed',
      hireDate: 'August 12, 2021',
      yearsOfService: '5 years',
      selfAssessment: { status: 'completed', date: 'November 15, 2024' },
      supervisorReview: { status: 'completed', date: 'November 22, 2024' },
      reviewMeeting: { status: 'completed', date: 'November 25, 2024' },
      signatures: { status: 'completed', date: 'November 26, 2024' },
      personnelFile: { status: 'completed', date: 'November 28, 2024' },
      completedDate: 'November 28, 2024',
      progress: 100,
      completionNote: 'Completed 64 days ahead of agency deadline. All signatures obtained. Evaluation filed in personnel record.'
    },
    {
      id: 5,
      employee: 'Daniel Wilson',
      badge: 'D-2405',
      department: 'Patrol Division',
      position: 'Deputy Sheriff',
      shift: 'B-Shift (06:00-18:00)',
      supervisor: 'Sgt. Thompson',
      supervisorTitle: 'B-Shift Commander',
      reviewPeriod: 'Q4 2024',
      periodDates: 'October 1 - December 31, 2024',
      reviewType: 'Annual Performance Evaluation',
      deadline: 'January 31, 2025',
      status: 'completed',
      hireDate: 'September 1, 2022',
      yearsOfService: '4 years',
      selfAssessment: { status: 'completed', date: 'November 10, 2024' },
      supervisorReview: { status: 'completed', date: 'November 18, 2024' },
      reviewMeeting: { status: 'completed', date: 'November 20, 2024' },
      signatures: { status: 'completed', date: 'November 22, 2024' },
      personnelFile: { status: 'completed', date: 'November 25, 2024' },
      completedDate: 'November 25, 2024',
      progress: 100,
      completionNote: 'Completed 67 days ahead of agency deadline. All signatures obtained. Evaluation filed in personnel record.'
    },
    {
      id: 6,
      employee: 'Emily Johnson',
      badge: 'HR-0032',
      department: 'Human Resources',
      position: 'HR Specialist',
      shift: 'Day Shift (08:00-17:00)',
      supervisor: 'HR Director',
      supervisorTitle: 'Human Resources Director',
      reviewPeriod: 'Q4 2024',
      periodDates: 'October 1 - December 31, 2024',
      reviewType: 'Annual Performance Evaluation',
      deadline: 'January 31, 2025',
      status: 'completed',
      hireDate: 'April 15, 2023',
      yearsOfService: '3 years',
      selfAssessment: { status: 'completed', date: 'November 18, 2024' },
      supervisorReview: { status: 'completed', date: 'November 25, 2024' },
      reviewMeeting: { status: 'completed', date: 'November 27, 2024' },
      signatures: { status: 'completed', date: 'November 28, 2024' },
      personnelFile: { status: 'completed', date: 'November 30, 2024' },
      completedDate: 'November 30, 2024',
      progress: 100,
      completionNote: 'Completed 62 days ahead of agency deadline. All signatures obtained. Evaluation filed in personnel record.'
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

  const toggleCardExpanded = (id) => {
    setExpandedCards(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const getStatusConfig = (status) => {
    const configs = {
      'in-progress': { bg: 'bg-amber-500/20', text: 'text-amber-700', border: 'border-amber-500/30', label: 'IN PROGRESS' },
      completed: { bg: 'bg-green-500/20', text: 'text-green-400', border: 'border-green-500/30', label: 'COMPLETED' },
      overdue: { bg: 'bg-red-500/20', text: 'text-red-400', border: 'border-red-500/30', label: 'OVERDUE' }
    };
    return configs[status] || configs['in-progress'];
  };

  const getStepIcon = (status) => {
    if (status === 'completed') return <CheckCircle className="w-4 h-4 text-green-400" />;
    if (status === 'pending') return <Circle className="w-4 h-4 text-slate-500" />;
    if (status === 'not-completed' || status === 'not-started') return <XCircle className="w-4 h-4 text-red-400" />;
    return <Clock className="w-4 h-4 text-amber-700" />;
  };

  const statusCounts = {
    all: reviews.length,
    'in-progress': reviews.filter(r => r.status === 'in-progress').length,
    completed: reviews.filter(r => r.status === 'completed').length,
    overdue: reviews.filter(r => r.status === 'overdue').length
  };

  const filteredReviews = reviews.filter(rev => {
    if (rev.status === 'overdue') return false;
    if (activeTab !== 'all' && rev.status !== activeTab) return false;
    if (filterDivision !== 'all' && rev.department !== filterDivision) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return rev.employee.toLowerCase().includes(q) || rev.badge.toLowerCase().includes(q) || rev.department.toLowerCase().includes(q);
    }
    return true;
  });

  const overdueReview = reviews.find(r => r.status === 'overdue');

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
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Logout Confirmation */}
      {logoutConfirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setLogoutConfirmOpen(false)} />
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
              <button onClick={() => setLogoutConfirmOpen(false)} className="flex-1 px-4 py-2.5 bg-white dark:bg-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-800/60 border border-slate-700/50 rounded-xl text-primary font-medium transition-all">Cancel</button>
              <button onClick={handleLogout} className="flex-1 px-4 py-2.5 bg-slate-50 dark:bg-slate-700/40 hover:bg-slate-700/60 border border-slate-600/50 rounded-xl text-primary font-medium transition-all">Sign Out</button>
            </div>
          </div>
        </div>
      )}

      {/* Review Detail Modal */}
      {selectedReview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedReview(null)} />
          <div className="relative bg-white dark:bg-slate-900 border border-border rounded-2xl p-6 max-w-3xl w-full shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 rounded-full flex items-center justify-center ${selectedReview.status === 'overdue' ? 'bg-gradient-to-br from-red-500 to-red-600' : selectedReview.status === 'completed' ? 'bg-gradient-to-br from-green-500 to-green-600' : 'bg-gradient-to-br from-blue-500 to-blue-600'}`}>
                  <span className="text-primary text-lg font-bold">{selectedReview.employee.split(' ').map(n => n[0]).join('')}</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-primary">{selectedReview.employee}</h3>
                  <p className="text-sm text-secondary">{selectedReview.position} • {selectedReview.department}</p>
                  <p className="text-xs text-slate-500 font-mono">Badge #{selectedReview.badge}</p>
                </div>
              </div>
              <button onClick={() => setSelectedReview(null)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800/50 rounded-lg transition-colors">
                <X className="w-5 h-5 text-secondary" />
              </button>
            </div>

            {/* Status Badge */}
            <div className="mb-6">
              {(() => {
                const sc = getStatusConfig(selectedReview.status);
                return (
                  <span className={`px-4 py-1.5 rounded-full text-sm font-bold border ${sc.bg} ${sc.text} ${sc.border}`}>
                    {sc.label} {selectedReview.status === 'overdue' ? `— ${selectedReview.daysOverdue}+ DAYS` : ''}
                  </span>
                );
              })()}
            </div>

            {/* Review Details Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              <div className="bg-white dark:bg-slate-800/40 border border-border rounded-xl shadow-sm dark:shadow-none p-4">
                <p className="text-xs text-slate-500 mb-1">Review Period</p>
                <p className="text-primary font-medium text-sm">{selectedReview.reviewPeriod}</p>
                <p className="text-xs text-secondary">{selectedReview.periodDates}</p>
              </div>
              <div className="bg-white dark:bg-slate-800/40 border border-border rounded-xl shadow-sm dark:shadow-none p-4">
                <p className="text-xs text-slate-500 mb-1">Reviewing Supervisor</p>
                <p className="text-primary font-medium text-sm">{selectedReview.supervisor}</p>
                <p className="text-xs text-secondary">{selectedReview.supervisorTitle}</p>
              </div>
              <div className="bg-white dark:bg-slate-800/40 border border-border rounded-xl shadow-sm dark:shadow-none p-4">
                <p className="text-xs text-slate-500 mb-1">Agency Deadline</p>
                <p className="text-primary font-medium text-sm">{selectedReview.deadline}</p>
                {selectedReview.daysOverdue > 0 && selectedReview.status !== 'completed' && (
                  <p className="text-xs text-red-400 font-medium">{selectedReview.daysOverdue} days overdue</p>
                )}
              </div>
              <div className="bg-white dark:bg-slate-800/40 border border-border rounded-xl shadow-sm dark:shadow-none p-4">
                <p className="text-xs text-slate-500 mb-1">Years of Service</p>
                <p className="text-primary font-medium text-sm">{selectedReview.yearsOfService}</p>
                <p className="text-xs text-secondary">Hired {selectedReview.hireDate}</p>
              </div>
              <div className="bg-white dark:bg-slate-800/40 border border-border rounded-xl shadow-sm dark:shadow-none p-4">
                <p className="text-xs text-slate-500 mb-1">Assignment</p>
                <p className="text-primary font-medium text-sm">{selectedReview.shift}</p>
              </div>
              <div className="bg-white dark:bg-slate-800/40 border border-border rounded-xl shadow-sm dark:shadow-none p-4">
                <p className="text-xs text-slate-500 mb-1">Review Type</p>
                <p className="text-primary font-medium text-sm">{selectedReview.reviewType}</p>
              </div>
            </div>

            {/* 5-Step Workflow */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-primary mb-3">Evaluation Workflow Progress</h4>
              <div className="space-y-3">
                {[
                  { label: 'Employee Self-Assessment', data: selectedReview.selfAssessment },
                  { label: 'Supervisor Review & Rating', data: selectedReview.supervisorReview },
                  { label: 'Review Meeting (Employee & Supervisor)', data: selectedReview.reviewMeeting },
                  { label: 'Signatures & Finalization', data: selectedReview.signatures },
                  { label: 'Personnel File Documentation', data: selectedReview.personnelFile }
                ].map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-800/30 border border-border dark:border-slate-700/30 rounded-lg">
                    <div className="mt-0.5">{getStepIcon(step.data.status)}</div>
                    <div className="flex-1">
                      <p className="text-sm text-primary font-medium">Step {idx + 1}: {step.label}</p>
                      {step.data.date && <p className="text-xs text-secondary mt-1">Completed: {step.data.date}</p>}
                      {step.data.note && <p className="text-xs text-secondary mt-1">{step.data.note}</p>}
                      {step.data.daysOverdue > 0 && (
                        <p className="text-xs text-red-400 mt-1 font-medium">{step.data.daysOverdue} days overdue</p>
                      )}
                      {step.data.reminders && step.data.reminders.length > 0 && (
                        <p className="text-xs text-amber-700 mt-1">Reminders sent: {step.data.reminders.join(', ')}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Evaluation Categories */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-primary mb-3">GCSO Evaluation Categories (5-Point Scale)</h4>
              {selectedReview.status === 'completed' ? (
                <div className="bg-white dark:bg-slate-800/40 border border-border rounded-xl shadow-sm dark:shadow-none p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Shield className="w-4 h-4 text-amber-700" />
                    <p className="text-sm text-amber-700 font-medium">Confidential — Supervisor & HR Eyes Only</p>
                  </div>
                  <p className="text-xs text-secondary">Evaluation ratings are confidential personnel records. Accessible only to: employee, reviewing supervisor, HR Director, command staff, and Sheriff Taylor. Contact HR Director for authorized access.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {evaluationCategories.map((cat, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-2 bg-slate-100/80 dark:bg-slate-800/30 border border-border rounded-lg">
                      <Square className="w-3.5 h-3.5 text-slate-500" />
                      <span className="text-xs text-secondary">{idx + 1}. {cat}</span>
                    </div>
                  ))}
                </div>
              )}
              <div className="mt-3 p-3 bg-slate-50 dark:bg-slate-800/30 border border-border dark:border-slate-700/30 rounded-lg">
                <p className="text-xs text-slate-500">Rating Scale: 1 = Unsatisfactory | 2 = Needs Improvement | 3 = Meets Expectations | 4 = Exceeds Expectations | 5 = Outstanding</p>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex flex-wrap gap-3">
              {selectedReview.status === 'completed' && (
                <>
                  <button className="flex-1 px-4 py-2.5 bg-white dark:bg-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-800/60 border border-slate-700/50 rounded-xl text-primary font-medium transition-all flex items-center justify-center gap-2 text-sm">
                    <Download className="w-4 h-4" /> Download PDF
                  </button>
                  <button className="flex-1 px-4 py-2.5 bg-white dark:bg-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-800/60 border border-slate-700/50 rounded-xl text-primary font-medium transition-all flex items-center justify-center gap-2 text-sm">
                    <Printer className="w-4 h-4" /> Print
                  </button>
                </>
              )}
              {selectedReview.status === 'in-progress' && (
                <>
                  <button className="flex-1 px-4 py-2.5 bg-amber-500 hover:bg-amber-400 rounded-xl text-white font-medium transition-all flex items-center justify-center gap-2 text-sm">
                    <Bell className="w-4 h-4" /> Remind Supervisor
                  </button>
                  <button className="flex-1 px-4 py-2.5 bg-slate-50 dark:bg-slate-700/40 hover:bg-slate-700/60 border border-slate-600/50 rounded-xl text-primary font-medium transition-all flex items-center justify-center gap-2 text-sm">
                    <Clock className="w-4 h-4" /> Set Deadline
                  </button>
                </>
              )}
              {selectedReview.status === 'overdue' && (
                <>
                  <button className="flex-1 px-4 py-2.5 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 rounded-xl text-red-400 font-medium transition-all flex items-center justify-center gap-2 text-sm">
                    <AlertTriangle className="w-4 h-4" /> Escalate to Sheriff
                  </button>
                  <button className="flex-1 px-4 py-2.5 bg-amber-500 hover:bg-amber-400 rounded-xl text-white font-medium transition-all flex items-center justify-center gap-2 text-sm">
                    <Calendar className="w-4 h-4" /> Schedule Meeting
                  </button>
                </>
              )}
              <button onClick={() => setSelectedReview(null)} className="px-4 py-2.5 bg-white dark:bg-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-800/60 border border-slate-700/50 text-secondary rounded-xl font-medium transition-all text-sm">Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="border-b border-border backdrop-blur-xl bg-slate-50 dark:bg-slate-900/30">
          <div className="px-4 lg:px-6 py-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4 flex-1 min-w-0">
              <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden p-2 hover:bg-slate-100 dark:hover:bg-slate-800/50 rounded-lg">
                <Menu className="w-5 h-5 text-secondary" />
              </button>
              <div className="flex items-center gap-2 text-sm">
                <button onClick={() => navigate(createPageUrl('HRDashboard'))} className="text-secondary hover:text-primary transition-colors">HR Dashboard</button>
                <ChevronRight className="w-4 h-4 text-slate-700" />
                <span className="text-primary">Performance Reviews</span>
              </div>
            </div>
            <div className="flex items-center gap-2 lg:gap-3">
              <button className="flex items-center gap-2 px-3 py-2 bg-amber-500 hover:bg-amber-400 rounded-xl text-white font-medium transition-all text-sm">
                <Award className="w-4 h-4" />
                <span className="hidden sm:inline">New Review</span>
              </button>
              <button className="hidden md:flex items-center gap-2 px-3 py-2 bg-white dark:bg-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-800/60 border border-slate-700/50 rounded-xl text-secondary font-medium transition-all text-sm">
                <BarChart3 className="w-4 h-4" />
                <span>Analytics</span>
              </button>
              <button className="hidden lg:flex items-center gap-2 px-3 py-2 bg-white dark:bg-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-800/60 border border-slate-700/50 rounded-xl text-secondary font-medium transition-all text-sm">
                <AlertTriangle className="w-4 h-4" />
                <span>Overdue Report</span>
              </button>

              <div className="relative">
                <button onClick={() => setNotificationsOpen(!notificationsOpen)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800/50 rounded-lg relative">
                  <Bell className="w-5 h-5 text-secondary" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>

                {notificationsOpen && (
                  <div className="absolute right-0 top-full mt-2 w-96 bg-surface-raised backdrop-blur-xl border border-border rounded-xl shadow-2xl z-50">
                    <div className="p-4 border-b border-border">
                      <h3 className="text-sm font-semibold text-primary">Notifications</h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.map(notification => (
                        <div key={notification.id} className={`p-4 border-b border-border dark:border-slate-800/30 hover:bg-slate-100 dark:hover:bg-slate-800/30 cursor-pointer transition-colors ${notification.urgent ? 'bg-amber-500/5' : ''}`}>
                          <div className="flex items-start gap-3">
                            <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${notification.urgent ? 'bg-amber-400' : 'bg-blue-400'}`}></div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-primary mb-1">{notification.title}</p>
                              <p className="text-xs text-secondary mb-2">{notification.message}</p>
                              <p className="text-xs text-slate-500">{notification.time}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-3 border-t border-border">
                      <button className="w-full text-center text-sm text-amber-700 hover:text-amber-300 font-medium">View All</button>
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
                  <p className="text-xs text-secondary">Human Resources</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <div className="max-w-7xl mx-auto">

            {/* Page Title */}
            <div className="mb-6">
              <h2 className="text-2xl lg:text-3xl font-bold text-primary mb-1">Annual Performance Evaluations & Personnel Assessment</h2>
              <p className="text-secondary text-sm">Gwinnett County Sheriff's Office • Lawrenceville, Georgia</p>
              <p className="text-slate-500 text-xs mt-1">Monday, February 21, 2026 • 12:20 AM EST</p>
            </div>

            {/* Info Bar */}
            <div className="mb-6 bg-white dark:bg-slate-800/40 border border-border rounded-xl shadow-sm dark:shadow-none p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-secondary">
                <div className="flex items-center gap-2">
                  <Users className="w-3.5 h-3.5 text-slate-500" />
                  <span>HR Director: <span className="text-secondary">Personnel Admin</span> | Sheriff: <span className="text-secondary">Keybo Taylor</span> | Eval Coordinator: <span className="text-secondary">HR Specialist J. Martinez</span></span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="w-3.5 h-3.5 text-slate-500" />
                  <span>Total Personnel: <span className="text-secondary">178 (164 sworn, 14 civilian)</span> | Review Period: <span className="text-secondary">Q4 2024 (Oct-Dec 2024)</span></span>
                </div>
              </div>
              <div className="mt-2 text-xs text-slate-500 flex items-center gap-2">
                <Shield className="w-3.5 h-3.5" />
                <span>System: GCSO-HRIS v4.2 | Last Updated: 00:20:14 EST</span>
              </div>
            </div>

            {/* Context Alerts */}
            <div className="mb-6 space-y-2">
              <div className="flex items-start gap-3 p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                <AlertTriangle className="w-4 h-4 text-amber-700 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-secondary">Review cycle on track: <span className="text-amber-700 font-medium">89% completion rate</span> for Q4 2024 reviews (due 01/31/2025)</p>
              </div>
              <div className="flex items-start gap-3 p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                <AlertTriangle className="w-4 h-4 text-amber-700 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-secondary"><span className="text-amber-700 font-medium">3 supervisor reviews pending:</span> Marcus Chen, Sarah Williams, Robert Martinez need supervisor input</p>
              </div>
              <div className="flex items-start gap-3 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                <AlertCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-secondary"><span className="text-red-400 font-bold">CRITICAL:</span> 1 overdue review — Michael Davis (Q3 2024) — <span className="text-red-400 font-medium">510+ days overdue</span> — escalate to Major Wilson immediately</p>
              </div>
              <div className="flex items-start gap-3 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <Info className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-secondary">Top performers identified for <span className="text-blue-400 font-medium">confidential promotion eligibility review</span> (2 candidates exceed expectations — details restricted to HR Director and Sheriff)</p>
              </div>
            </div>

            {/* CRITICAL: Michael Davis Overdue Section */}
            {overdueReview && (
              <div className="mb-6 bg-red-500/10 border-2 border-red-500/30 rounded-xl overflow-hidden">
                <button
                  onClick={() => setExpandedOverdue(!expandedOverdue)}
                  className="w-full flex items-center justify-between p-5 hover:bg-red-500/5 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-500/20 rounded-xl flex items-center justify-center">
                      <AlertCircle className="w-6 h-6 text-red-400" />
                    </div>
                    <div className="text-left">
                      <h3 className="text-lg font-bold text-red-400">OVERDUE PERFORMANCE EVALUATION — SUPERVISOR ACCOUNTABILITY</h3>
                      <p className="text-sm text-secondary">{overdueReview.employee} • Badge #{overdueReview.badge} • {overdueReview.position} • {overdueReview.department}</p>
                    </div>
                  </div>
                  {expandedOverdue ? <ChevronUp className="w-5 h-5 text-red-400" /> : <ChevronDown className="w-5 h-5 text-red-400" />}
                </button>

                {expandedOverdue && (
                  <div className="px-5 pb-5 space-y-5">
                    {/* Evaluation Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div className="bg-white dark:bg-slate-900/60 border border-border rounded-xl p-4">
                        <p className="text-xs text-slate-500 mb-1">Review Period</p>
                        <p className="text-primary font-medium">{overdueReview.reviewPeriod}</p>
                        <p className="text-xs text-secondary">{overdueReview.periodDates}</p>
                      </div>
                      <div className="bg-white dark:bg-slate-900/60 border border-border rounded-xl p-4">
                        <p className="text-xs text-slate-500 mb-1">Evaluation Deadline</p>
                        <p className="text-primary font-medium">{overdueReview.deadline}</p>
                        <p className="text-xs text-secondary">GCSO Policy - 30 days after review period end</p>
                      </div>
                      <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
                        <p className="text-xs text-red-300 mb-1">Days Overdue</p>
                        <p className="text-3xl font-bold text-red-400">{overdueReview.daysOverdue}+</p>
                        <p className="text-xs text-red-300">17+ months overdue</p>
                      </div>
                    </div>

                    {/* Assigned Supervisor */}
                    <div className="bg-white dark:bg-slate-900/60 border border-border rounded-xl p-4">
                      <h4 className="text-sm font-semibold text-primary mb-3 flex items-center gap-2">
                        <Users className="w-4 h-4 text-secondary" /> Assigned Supervisor
                      </h4>
                      <p className="text-sm text-secondary mb-3">Reviewing Supervisor: <span className="text-primary font-medium">{overdueReview.supervisor}</span> ({overdueReview.supervisorTitle})</p>
                      <div className="space-y-2">
                        <p className="text-xs text-slate-500 font-medium mb-2">ESCALATION TIMELINE:</p>
                        {overdueReview.escalationHistory.map((item, idx) => (
                          <div key={idx} className={`flex items-start gap-3 p-2 rounded-lg ${item.icon === 'current' ? 'bg-red-500/10 border border-red-500/20' : 'bg-slate-100/80 dark:bg-slate-800/30'}`}>
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${item.icon === 'current' ? 'bg-red-500/30' : 'bg-white dark:bg-slate-700/50'}`}>
                              {item.icon === 'current' ? <AlertCircle className="w-3.5 h-3.5 text-red-400" /> : <CheckCircle className="w-3.5 h-3.5 text-secondary" />}
                            </div>
                            <div>
                              <p className={`text-sm ${item.icon === 'current' ? 'text-red-400 font-medium' : 'text-slate-500'}`}>{item.action}</p>
                              <p className="text-xs text-slate-500">{item.date} ({item.days} days overdue)</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Impact on Employee */}
                    <div className="bg-white dark:bg-slate-900/60 border border-amber-500/20 rounded-xl p-4">
                      <h4 className="text-sm font-semibold text-amber-700 mb-3 flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4" /> Impact on Employee — {overdueReview.employee}
                      </h4>
                      <div className="space-y-2">
                        {overdueReview.impact.map((item, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <XCircle className="w-4 h-4 text-amber-700 mt-0.5 flex-shrink-0" />
                            <p className="text-sm text-secondary">{item}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Current Employee Status */}
                    <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
                      <h4 className="text-sm font-semibold text-blue-400 mb-2 flex items-center gap-2">
                        <Info className="w-4 h-4" /> Current Employee Status
                      </h4>
                      <p className="text-sm text-secondary">{overdueReview.currentNote}</p>
                    </div>

                    {/* Required Immediate Actions */}
                    <div className="bg-white dark:bg-slate-900/60 border border-red-500/20 rounded-xl p-4">
                      <h4 className="text-sm font-semibold text-red-400 mb-3 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4" /> REQUIRED IMMEDIATE ACTIONS
                      </h4>
                      <div className="space-y-2">
                        {overdueReview.requiredActions.map((action, idx) => (
                          <div key={idx} className="flex items-start gap-3 p-2 bg-slate-100/80 dark:bg-slate-800/30 rounded-lg">
                            <Square className="w-4 h-4 text-slate-500 mt-0.5 flex-shrink-0" />
                            <p className="text-sm text-secondary">{action}</p>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                        <p className="text-sm text-red-400 font-medium">Deadline: Evaluation completed by February 28, 2026 (7 days)</p>
                        <p className="text-xs text-secondary mt-1">Responsible: HR Director (enforce policy), Sheriff Taylor (ultimate accountability), Major Wilson (complete evaluation)</p>
                      </div>
                    </div>

                    {/* Supervisor Accountability */}
                    <div className="bg-white dark:bg-slate-900/60 border border-border rounded-xl p-4">
                      <h4 className="text-sm font-semibold text-primary mb-2 flex items-center gap-2">
                        <Shield className="w-4 h-4 text-secondary" /> Supervisor Accountability — Major R. Wilson
                      </h4>
                      <div className="space-y-2 text-sm text-secondary">
                        <p>• Major Wilson has been reminded multiple times (email, meeting, Sheriff directive) without completion</p>
                        <p>• This represents failure to perform essential supervisory duty</p>
                        <p>• Requires escalated accountability: Written counseling, documented improvement plan, potential disciplinary action if not corrected immediately</p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-3">
                      <button className="px-4 py-2.5 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-400 rounded-xl font-medium transition-all text-sm flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4" /> Escalate to Sheriff
                      </button>
                      <button className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 rounded-xl text-white font-medium transition-all text-sm flex items-center gap-2">
                        <Calendar className="w-4 h-4" /> Schedule HR/Wilson Meeting
                      </button>
                      <button className="px-4 py-2.5 bg-slate-50 dark:bg-slate-700/40 hover:bg-slate-700/60 border border-slate-600/50 text-primary rounded-xl font-medium transition-all text-sm flex items-center gap-2">
                        <FileText className="w-4 h-4" /> Document Supervisor Counseling
                      </button>
                      <button className="px-4 py-2.5 bg-slate-50 dark:bg-slate-700/40 hover:bg-slate-700/60 border border-slate-600/50 text-primary rounded-xl font-medium transition-all text-sm flex items-center gap-2">
                        <Clock className="w-4 h-4" /> Set 7-Day Deadline
                      </button>
                      <button
                        onClick={() => setSelectedReview(overdueReview)}
                        className="px-4 py-2.5 bg-white dark:bg-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-800/60 border border-slate-700/50 text-secondary rounded-xl font-medium transition-all text-sm flex items-center gap-2"
                      >
                        <Eye className="w-4 h-4" /> View Personnel File
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Status Summary Cards (3 cards - no avg rating) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div className="bg-white dark:bg-slate-800/40 border border-border rounded-xl shadow-sm dark:shadow-none p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 bg-amber-500/20 rounded-xl flex items-center justify-center">
                    <Clock className="w-5 h-5 text-amber-700" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-primary mb-1">{statusCounts['in-progress']}</p>
                <p className="text-sm text-secondary mb-2">In Progress</p>
                <p className="text-xs text-slate-500">2 awaiting supervisor review • 1 self-assessment just submitted</p>
              </div>

              <div className="bg-white dark:bg-slate-800/40 border border-border rounded-xl shadow-sm dark:shadow-none p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-primary mb-1">{statusCounts.completed}</p>
                <p className="text-sm text-secondary mb-2">Completed</p>
                <p className="text-xs text-slate-500">All completed ahead of Jan 31, 2025 deadline</p>
              </div>

              <div className="bg-white dark:bg-slate-800/40 border border-red-500/30 rounded-xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 bg-red-500/20 rounded-xl flex items-center justify-center">
                    <AlertCircle className="w-5 h-5 text-red-400" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-red-400 mb-1">{statusCounts.overdue}</p>
                <p className="text-sm text-secondary mb-2">Overdue</p>
                <p className="text-xs text-red-400">Michael Davis Q3 2024 — CRITICAL, 510+ days</p>
              </div>
            </div>

            {/* Search and Filter */}
            <div className="mb-4 flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search by name, badge, or department..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-800/40 border border-border rounded-xl text-primary placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-amber-500/50 text-sm"
                />
              </div>
              <select
                value={filterDivision}
                onChange={(e) => setFilterDivision(e.target.value)}
                className="px-4 py-2.5 bg-white dark:bg-slate-800/40 border border-border rounded-xl text-secondary focus:outline-none focus:border-amber-500/50 text-sm"
              >
                <option value="all">All Divisions</option>
                <option value="Patrol Division">Patrol Division</option>
                <option value="Detention Center">Detention Center</option>
                <option value="Administrative Services">Administrative Services</option>
                <option value="Human Resources">Human Resources</option>
              </select>
            </div>

            {/* Status Tabs */}
            <div className="mb-6 flex gap-2 border-b border-border overflow-x-auto">
              {[
                { id: 'all', label: 'All Reviews', count: statusCounts.all - statusCounts.overdue },
                { id: 'in-progress', label: 'In Progress', count: statusCounts['in-progress'] },
                { id: 'completed', label: 'Completed', count: statusCounts.completed },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-all relative whitespace-nowrap ${
                    activeTab === tab.id ? 'text-amber-700' : 'text-secondary hover:text-slate-300'
                  }`}
                >
                  {tab.label}
                  <span className={`px-2 py-0.5 rounded-full text-xs ${
                    activeTab === tab.id ? 'bg-amber-500/20 text-amber-700' : 'bg-white dark:bg-slate-700/50 text-slate-500'
                  }`}>{tab.count}</span>
                  {activeTab === tab.id && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500"></div>
                  )}
                </button>
              ))}
            </div>

            {/* Review Cards */}
            <div className="space-y-6">
              {filteredReviews.map(review => {
                const statusConfig = getStatusConfig(review.status);
                const isExpanded = expandedCards[review.id];

                return (
                  <div key={review.id} className="bg-white dark:bg-slate-800/40 border border-border rounded-xl overflow-hidden hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-all">
                    {/* Card Header */}
                    <div className="p-5">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-4 flex-1">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${review.status === 'completed' ? 'bg-gradient-to-br from-green-500 to-green-600' : 'bg-gradient-to-br from-blue-500 to-blue-600'}`}>
                            <span className="text-primary font-bold">{review.employee.split(' ').map(n => n[0]).join('')}</span>
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 mb-2 flex-wrap">
                              <h3 className="text-lg font-semibold text-primary">{review.employee}</h3>
                              <span className="px-2 py-1 bg-white dark:bg-slate-700/50 rounded text-xs text-secondary font-mono">#{review.badge}</span>
                              <span className={`px-3 py-1 rounded-full text-xs font-bold border ${statusConfig.bg} ${statusConfig.text} ${statusConfig.border}`}>
                                {statusConfig.label}
                              </span>
                            </div>

                            <p className="text-sm text-secondary mb-3">{review.position} • {review.department} • {review.shift}</p>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs text-secondary mb-3">
                              <div className="flex items-center gap-2">
                                <Calendar className="w-3 h-3" />
                                <span>{review.reviewPeriod}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Users className="w-3 h-3" />
                                <span>{review.supervisor}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Clock className="w-3 h-3" />
                                <span>Due: {review.deadline}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Award className="w-3 h-3" />
                                <span>{review.yearsOfService} service</span>
                              </div>
                            </div>

                            {/* Progress Bar */}
                            <div className="mb-3">
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-xs text-slate-500">Evaluation Progress</span>
                                <span className="text-xs text-secondary font-medium">{review.progress}%</span>
                              </div>
                              <div className="w-full h-2 bg-white dark:bg-slate-700/50 rounded-full overflow-hidden">
                                <div
                                  className={`h-full rounded-full transition-all ${review.status === 'completed' ? 'bg-green-500' : 'bg-amber-500'}`}
                                  style={{ width: `${review.progress}%` }}
                                ></div>
                              </div>
                            </div>

                            {/* 5-Step Summary */}
                            <div className="flex items-center gap-4 text-xs flex-wrap">
                              <div className="flex items-center gap-1.5">
                                {getStepIcon(review.selfAssessment.status)}
                                <span className="text-slate-500">Self-Assessment</span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                {getStepIcon(review.supervisorReview.status)}
                                <span className="text-slate-500">Supervisor Review</span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                {getStepIcon(review.reviewMeeting.status)}
                                <span className="text-slate-500">Meeting</span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                {getStepIcon(review.signatures.status)}
                                <span className="text-slate-500">Signatures</span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                {getStepIcon(review.personnelFile.status)}
                                <span className="text-slate-500">Filed</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setSelectedReview(review)}
                            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700/50 rounded-lg transition-colors"
                          >
                            <Eye className="w-5 h-5 text-secondary" />
                          </button>
                          <button
                            onClick={() => toggleCardExpanded(review.id)}
                            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700/50 rounded-lg transition-colors"
                          >
                            {isExpanded ? <ChevronUp className="w-5 h-5 text-secondary" /> : <ChevronDown className="w-5 h-5 text-secondary" />}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Expanded Details */}
                    {isExpanded && (
                      <div className="px-5 pb-5 border-t border-border dark:border-slate-700/30 pt-4 space-y-4">
                        {/* Self-Assessment Details */}
                        <div className="bg-white dark:bg-slate-900/40 border border-border rounded-xl p-4">
                          <h4 className="text-sm font-semibold text-primary mb-3 flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-400" /> Step 1: Employee Self-Assessment
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                            <div>
                              <p className="text-xs text-slate-500 mb-1">Status</p>
                              <p className={`font-medium ${review.selfAssessment.status === 'completed' ? 'text-green-400' : 'text-amber-700'}`}>
                                {review.selfAssessment.status === 'completed' ? 'COMPLETED' : 'PENDING'}
                              </p>
                            </div>
                            {review.selfAssessment.date && (
                              <div>
                                <p className="text-xs text-slate-500 mb-1">Completion Date</p>
                                <p className="text-secondary">{review.selfAssessment.date}</p>
                              </div>
                            )}
                          </div>
                          {review.selfAssessment.note && (
                            <p className="text-xs text-amber-700 mt-2">{review.selfAssessment.note}</p>
                          )}
                          {review.selfAssessment.components && (
                            <div className="mt-3">
                              <p className="text-xs text-slate-500 mb-2">Self-Assessment Components:</p>
                              <div className="space-y-1">
                                {review.selfAssessment.components.map((comp, idx) => (
                                  <div key={idx} className="flex items-center gap-2">
                                    <CheckCircle className="w-3 h-3 text-green-400" />
                                    <span className="text-xs text-secondary">{comp}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Supervisor Review Details */}
                        <div className="bg-white dark:bg-slate-900/40 border border-border rounded-xl p-4">
                          <h4 className="text-sm font-semibold text-primary mb-3 flex items-center gap-2">
                            {getStepIcon(review.supervisorReview.status)} Step 2: Supervisor Review & Rating
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                            <div>
                              <p className="text-xs text-slate-500 mb-1">Status</p>
                              <p className={`font-medium ${review.supervisorReview.status === 'completed' ? 'text-green-400' : review.supervisorReview.daysOverdue > 0 ? 'text-red-400' : 'text-amber-700'}`}>
                                {review.supervisorReview.status === 'completed' ? 'COMPLETED' : review.supervisorReview.daysOverdue > 0 ? `PENDING (${review.supervisorReview.daysOverdue} days overdue)` : review.supervisorReview.status === 'not-started' ? 'NOT YET STARTED' : 'PENDING'}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-500 mb-1">Assigned Supervisor</p>
                              <p className="text-secondary">{review.supervisor} ({review.supervisorTitle})</p>
                            </div>
                            {review.supervisorDeadline && (
                              <div>
                                <p className="text-xs text-slate-500 mb-1">Supervisor Deadline</p>
                                <p className="text-secondary">{review.supervisorDeadline}</p>
                              </div>
                            )}
                            {review.supervisorReview.date && (
                              <div>
                                <p className="text-xs text-slate-500 mb-1">Completion Date</p>
                                <p className="text-secondary">{review.supervisorReview.date}</p>
                              </div>
                            )}
                          </div>
                          {review.supervisorReview.reminders && review.supervisorReview.reminders.length > 0 && (
                            <p className="text-xs text-amber-700 mt-2">Reminders sent: {review.supervisorReview.reminders.join(', ')}</p>
                          )}
                          {review.supervisorReview.note && (
                            <p className="text-xs text-secondary mt-2">{review.supervisorReview.note}</p>
                          )}
                          {review.supervisorPattern && (
                            <div className="mt-3 p-2 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                              <p className="text-xs text-amber-700">{review.supervisorPattern}</p>
                            </div>
                          )}
                        </div>

                        {/* Remaining Steps (condensed for completed reviews) */}
                        {review.status === 'completed' ? (
                          <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4">
                            <h4 className="text-sm font-semibold text-green-400 mb-2 flex items-center gap-2">
                              <CheckCircle className="w-4 h-4" /> Evaluation Complete — All Steps Finalized
                            </h4>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                              <div>
                                <p className="text-slate-500">Review Meeting</p>
                                <p className="text-secondary">{review.reviewMeeting.date}</p>
                              </div>
                              <div>
                                <p className="text-slate-500">Signatures Obtained</p>
                                <p className="text-secondary">{review.signatures.date}</p>
                              </div>
                              <div>
                                <p className="text-slate-500">Filed in Personnel Record</p>
                                <p className="text-secondary">{review.personnelFile.date}</p>
                              </div>
                            </div>
                            <p className="text-xs text-green-400 mt-3">{review.completionNote}</p>
                          </div>
                        ) : (
                          <div className="bg-white dark:bg-slate-900/40 border border-border rounded-xl p-4">
                            <h4 className="text-sm font-semibold text-primary mb-3">Steps 3-5: Pending</h4>
                            <div className="space-y-2 text-xs">
                              <div className="flex items-center gap-2">
                                <Circle className="w-3.5 h-3.5 text-slate-500" />
                                <span className="text-secondary">Step 3: Review Meeting — {review.reviewMeeting.note || 'Pending supervisor review completion'}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Circle className="w-3.5 h-3.5 text-slate-500" />
                                <span className="text-secondary">Step 4: Signatures & Finalization — Pending</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Circle className="w-3.5 h-3.5 text-slate-500" />
                                <span className="text-secondary">Step 5: Personnel File Documentation — Pending</span>
                              </div>
                            </div>
                            {review.nextDeadline && (
                              <div className="mt-3 p-2 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                                <p className="text-xs text-amber-700">Next Deadline: {review.nextDeadline}</p>
                                {review.escalationNote && <p className="text-xs text-secondary mt-1">{review.escalationNote}</p>}
                              </div>
                            )}
                          </div>
                        )}

                        {/* Evaluation Categories Reference */}
                        {review.status === 'completed' ? (
                          <div className="bg-white dark:bg-slate-900/40 border border-border rounded-xl p-4">
                            <div className="flex items-center gap-2 mb-2">
                              <Shield className="w-4 h-4 text-amber-700" />
                              <p className="text-sm text-amber-700 font-medium">Evaluation Ratings — Confidential</p>
                            </div>
                            <p className="text-xs text-secondary">Performance ratings for {review.employee} are confidential personnel records. Access restricted to: employee, reviewing supervisor ({review.supervisor}), HR Director, command staff, and Sheriff Taylor.</p>
                          </div>
                        ) : (
                          <div className="bg-white dark:bg-slate-900/40 border border-border rounded-xl p-4">
                            <h4 className="text-sm font-semibold text-primary mb-3">GCSO Evaluation Categories (Pending Supervisor Rating)</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                              {evaluationCategories.map((cat, idx) => (
                                <div key={idx} className="flex items-center gap-2 p-1.5">
                                  <Square className="w-3 h-3 text-slate-700" />
                                  <span className="text-xs text-secondary">{idx + 1}. {cat}</span>
                                </div>
                              ))}
                            </div>
                            <p className="text-xs text-slate-500 mt-2">Scale: 1 = Unsatisfactory | 2 = Needs Improvement | 3 = Meets Expectations | 4 = Exceeds Expectations | 5 = Outstanding</p>
                          </div>
                        )}

                        {/* Card Action Buttons */}
                        <div className="flex flex-wrap gap-3">
                          {review.status === 'in-progress' && (
                            <>
                              <button className="px-4 py-2 bg-amber-500 hover:bg-amber-400 rounded-xl text-white font-medium transition-all text-sm flex items-center gap-2">
                                <Bell className="w-4 h-4" /> Remind Supervisor
                              </button>
                              <button className="px-4 py-2 bg-slate-50 dark:bg-slate-700/40 hover:bg-slate-700/60 border border-slate-600/50 text-primary rounded-xl font-medium transition-all text-sm flex items-center gap-2">
                                <Clock className="w-4 h-4" /> Set Deadline
                              </button>
                              <button className="px-4 py-2 bg-slate-50 dark:bg-slate-700/40 hover:bg-slate-700/60 border border-slate-600/50 text-primary rounded-xl font-medium transition-all text-sm flex items-center gap-2">
                                <Eye className="w-4 h-4" /> View Self-Assessment
                              </button>
                            </>
                          )}
                          {review.status === 'completed' && (
                            <>
                              <button className="px-4 py-2 bg-slate-50 dark:bg-slate-700/40 hover:bg-slate-700/60 border border-slate-600/50 text-primary rounded-xl font-medium transition-all text-sm flex items-center gap-2">
                                <Download className="w-4 h-4" /> Download PDF
                              </button>
                              <button className="px-4 py-2 bg-slate-50 dark:bg-slate-700/40 hover:bg-slate-700/60 border border-slate-600/50 text-primary rounded-xl font-medium transition-all text-sm flex items-center gap-2">
                                <Printer className="w-4 h-4" /> Print
                              </button>
                            </>
                          )}
                          <button
                            onClick={() => setSelectedReview(review)}
                            className="px-4 py-2 bg-white dark:bg-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-800/60 border border-slate-700/50 text-secondary rounded-xl font-medium transition-all text-sm flex items-center gap-2"
                          >
                            <ExternalLink className="w-4 h-4" /> Full Details
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}

              {filteredReviews.length === 0 && (
                <div className="text-center py-12">
                  <Search className="w-12 h-12 text-slate-700 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-primary mb-2">No Reviews Found</h3>
                  <p className="text-secondary text-sm">Try adjusting your search or filter criteria.</p>
                </div>
              )}
            </div>

            {/* Rating Scale Reference */}
            <div className="mt-8 bg-white dark:bg-slate-800/40 border border-border rounded-xl shadow-sm dark:shadow-none p-5">
              <h4 className="text-sm font-semibold text-primary mb-3 flex items-center gap-2">
                <ClipboardCheck className="w-4 h-4 text-secondary" /> GCSO Performance Evaluation Rating Scale Reference
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                {ratingScale.map(rating => (
                  <div key={rating.score} className="bg-white dark:bg-slate-900/40 border border-border rounded-lg p-3 text-center">
                    <p className="text-xl font-bold text-primary mb-1">{rating.score}</p>
                    <p className="text-xs text-secondary">{rating.label}</p>
                  </div>
                ))}
              </div>
              <div className="mt-3 text-xs text-slate-500 space-y-1">
                <p>• Performance evaluations are confidential personnel records protected under Georgia law</p>
                <p>• Evaluations are used for promotion eligibility, pay decisions, and professional development planning</p>
                <p>• Supervisors must complete evaluations within 30 days of review period end (GCSO Policy 6.01)</p>
                <p>• Employees have the right to review and respond to their evaluation within 10 business days</p>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Support & Resources FAB */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setSupportOpen(!supportOpen)}
          className="w-14 h-14 bg-gradient-to-br from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110"
        >
          {supportOpen ? <X className="w-6 h-6 text-primary" /> : <HelpCircle className="w-6 h-6 text-primary" />}
        </button>

        {supportOpen && (
          <div className="absolute bottom-16 right-0 w-80 bg-surface-raised backdrop-blur-xl border border-border rounded-2xl shadow-2xl overflow-hidden">
            <div className="p-4 border-b border-border">
              <h3 className="text-sm font-semibold text-primary">Performance Evaluation Support</h3>
              <p className="text-xs text-secondary mt-1">GCSO Human Resources Division</p>
            </div>
            <div className="p-4 space-y-3">
              <div className="p-3 bg-white dark:bg-slate-800/40 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/60 cursor-pointer transition-colors">
                <p className="text-sm font-medium text-primary">HR Director</p>
                <p className="text-xs text-secondary">Evaluation policy, confidential records access</p>
                <p className="text-xs text-amber-700 mt-1">Ext. 4500</p>
              </div>
              <div className="p-3 bg-white dark:bg-slate-800/40 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/60 cursor-pointer transition-colors">
                <p className="text-sm font-medium text-primary">Evaluation Coordinator</p>
                <p className="text-xs text-secondary">HR Specialist J. Martinez — scheduling, deadlines</p>
                <p className="text-xs text-amber-700 mt-1">Ext. 4505</p>
              </div>
              <div className="p-3 bg-white dark:bg-slate-800/40 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/60 cursor-pointer transition-colors">
                <p className="text-sm font-medium text-primary">Training Division</p>
                <p className="text-xs text-secondary">Professional development, certification tracking</p>
                <p className="text-xs text-amber-700 mt-1">Ext. 4521</p>
              </div>
              <div className="p-3 bg-white dark:bg-slate-800/40 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/60 cursor-pointer transition-colors">
                <p className="text-sm font-medium text-primary">GCSO Evaluation Policy</p>
                <p className="text-xs text-secondary">Policy 6.01 — Performance Evaluations</p>
              </div>
              <div className="p-3 bg-white dark:bg-slate-800/40 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/60 cursor-pointer transition-colors">
                <p className="text-sm font-medium text-primary">Georgia POST Requirements</p>
                <p className="text-xs text-secondary">Peace Officer Standards & Training</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

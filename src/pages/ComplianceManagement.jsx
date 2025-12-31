import React, { useState } from 'react';
import { Home, Users, FileText, LayoutDashboard, TrendingUp, AlertCircle, Settings, Bell, MessageCircle, Search, ChevronRight, DollarSign, CheckCircle, Shield, Sparkles, X, Send, Menu, ChevronLeft, LogOut, UserPlus, Briefcase, Clock, Award, Filter, Download, Eye, Calendar, CheckCircle2, XCircle, AlertTriangle, FileCheck, BookOpen, Scale, Gavel, ClipboardCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function ComplianceManagement() {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState('compliance');
  const [chatOpen, setChatOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [logoutConfirmOpen, setLogoutConfirmOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const navigation = [
    { id: 'hr-dashboard', label: 'HR Dashboard', icon: Users, page: 'HRDashboard' },
    { id: 'job-postings', label: 'Job Postings', icon: Briefcase, page: 'JobPostings' },
    { id: 'applicant-tracking', label: 'Applicant Tracking', icon: UserPlus, page: 'ApplicantTracking' },
    { id: 'hiring-pipeline', label: 'Hiring Pipeline', icon: TrendingUp, page: 'HiringPipeline' },
    { id: 'compliance', label: 'HR Compliance', icon: ClipboardCheck },
    { id: 'onboarding', label: 'New Hire Onboarding', icon: FileCheck, page: 'NewHireOnboarding' },
    { id: 'employee-records', label: 'Employee Records', icon: FileText, page: 'EmployeeRecords' },
    { id: 'time-off', label: 'Time Off Management', icon: Calendar, page: 'TimeOffManagement' },
    { id: 'performance', label: 'Performance Reviews', icon: Award, page: 'PerformanceReviews' },
    { id: 'hr-reports', label: 'HR Reports', icon: LayoutDashboard, page: 'HRReports' },
    { id: 'settings', label: 'Settings', icon: Settings, page: 'HRSettings' }
  ];

  const notifications = [
    { id: 1, title: 'EEOC Report Due Soon', message: 'Annual EEO-4 filing due Dec 31', time: '15 min ago', urgent: true },
    { id: 2, title: 'Training Compliance Alert', message: '8 employees need CJIS renewal', time: '1 hour ago', urgent: true },
    { id: 3, title: 'Policy Review Required', message: 'Use of Force policy - annual review', time: '2 hours ago', urgent: false }
  ];

  const complianceAreas = [
    {
      id: 1,
      category: 'Equal Employment Opportunity',
      status: 'compliant',
      score: 98,
      lastAudit: '2024-09-15',
      nextReview: '2025-09-15',
      requirements: [
        { name: 'EEO-4 Annual Report', status: 'compliant', dueDate: '2024-12-31' },
        { name: 'Diversity Metrics Tracking', status: 'compliant', dueDate: '2024-11-30' },
        { name: 'Anti-Discrimination Training', status: 'compliant', dueDate: '2025-01-15' },
        { name: 'Reasonable Accommodation Process', status: 'compliant', dueDate: 'Ongoing' }
      ],
      regulatoryBody: 'EEOC',
      description: 'Federal equal employment opportunity compliance'
    },
    {
      id: 2,
      category: 'FMLA Compliance',
      status: 'compliant',
      score: 95,
      lastAudit: '2024-08-20',
      nextReview: '2025-08-20',
      requirements: [
        { name: 'FMLA Eligibility Tracking', status: 'compliant', dueDate: 'Ongoing' },
        { name: 'Leave Documentation', status: 'compliant', dueDate: 'Ongoing' },
        { name: 'Employee Notice Requirements', status: 'compliant', dueDate: 'Ongoing' },
        { name: 'Return-to-Work Procedures', status: 'compliant', dueDate: 'Ongoing' }
      ],
      regulatoryBody: 'DOL',
      description: 'Family and Medical Leave Act compliance'
    },
    {
      id: 3,
      category: 'P.O.S.T. Certification',
      status: 'needs-attention',
      score: 87,
      lastAudit: '2024-11-01',
      nextReview: '2025-05-01',
      requirements: [
        { name: 'Officer Certifications Current', status: 'needs-attention', dueDate: '2024-11-15' },
        { name: 'Training Hours Documentation', status: 'compliant', dueDate: '2024-12-31' },
        { name: 'Continuing Education Credits', status: 'compliant', dueDate: '2024-12-31' },
        { name: 'Firearms Qualifications', status: 'needs-attention', dueDate: '2024-11-20' }
      ],
      regulatoryBody: 'Georgia P.O.S.T. Council',
      description: 'Peace Officer Standards and Training compliance'
    },
    {
      id: 4,
      category: 'ADA Compliance',
      status: 'compliant',
      score: 100,
      lastAudit: '2024-10-10',
      nextReview: '2025-10-10',
      requirements: [
        { name: 'Reasonable Accommodations', status: 'compliant', dueDate: 'Ongoing' },
        { name: 'Accessibility Standards', status: 'compliant', dueDate: 'Ongoing' },
        { name: 'Interactive Process Documentation', status: 'compliant', dueDate: 'Ongoing' },
        { name: 'Medical Documentation Procedures', status: 'compliant', dueDate: 'Ongoing' }
      ],
      regulatoryBody: 'DOJ',
      description: 'Americans with Disabilities Act compliance'
    },
    {
      id: 5,
      category: 'FLSA Wage & Hour',
      status: 'compliant',
      score: 96,
      lastAudit: '2024-07-15',
      nextReview: '2025-07-15',
      requirements: [
        { name: 'Overtime Calculations', status: 'compliant', dueDate: 'Ongoing' },
        { name: 'Time Record Keeping', status: 'compliant', dueDate: 'Ongoing' },
        { name: 'Exempt/Non-Exempt Classifications', status: 'compliant', dueDate: '2025-01-01' },
        { name: 'Minimum Wage Compliance', status: 'compliant', dueDate: 'Ongoing' }
      ],
      regulatoryBody: 'DOL',
      description: 'Fair Labor Standards Act compliance'
    },
    {
      id: 6,
      category: 'CJIS Security',
      status: 'needs-attention',
      score: 89,
      lastAudit: '2024-10-01',
      nextReview: '2025-04-01',
      requirements: [
        { name: 'Security Training Current', status: 'needs-attention', dueDate: '2024-11-30' },
        { name: 'Background Checks Complete', status: 'compliant', dueDate: 'Ongoing' },
        { name: 'Access Control Audit', status: 'compliant', dueDate: '2024-12-15' },
        { name: 'Incident Reporting', status: 'compliant', dueDate: 'Ongoing' }
      ],
      regulatoryBody: 'FBI CJIS',
      description: 'Criminal Justice Information Services security compliance'
    },
    {
      id: 7,
      category: 'Workers Compensation',
      status: 'compliant',
      score: 94,
      lastAudit: '2024-09-01',
      nextReview: '2025-03-01',
      requirements: [
        { name: 'Incident Reporting Procedures', status: 'compliant', dueDate: 'Ongoing' },
        { name: 'Return-to-Work Program', status: 'compliant', dueDate: 'Ongoing' },
        { name: 'Safety Training Documentation', status: 'compliant', dueDate: '2024-12-31' },
        { name: 'Claims Management', status: 'compliant', dueDate: 'Ongoing' }
      ],
      regulatoryBody: 'State Workers Comp Board',
      description: 'Workers compensation and workplace safety compliance'
    },
    {
      id: 8,
      category: 'I-9 Employment Verification',
      status: 'compliant',
      score: 100,
      lastAudit: '2024-10-20',
      nextReview: '2025-04-20',
      requirements: [
        { name: 'Form I-9 Completion', status: 'compliant', dueDate: 'Ongoing' },
        { name: 'Document Verification', status: 'compliant', dueDate: 'Ongoing' },
        { name: 'E-Verify Participation', status: 'compliant', dueDate: 'Ongoing' },
        { name: 'Retention Requirements', status: 'compliant', dueDate: 'Ongoing' }
      ],
      regulatoryBody: 'USCIS',
      description: 'Immigration and employment eligibility verification'
    }
  ];

  const upcomingDeadlines = [
    { task: 'EEOC Annual Report Filing', dueDate: '2024-12-31', priority: 'high', daysRemaining: 40 },
    { task: 'P.O.S.T. Certification Renewals (8 officers)', dueDate: '2024-11-15', priority: 'critical', daysRemaining: -9 },
    { task: 'CJIS Security Training (12 employees)', dueDate: '2024-11-30', priority: 'high', daysRemaining: 9 },
    { task: 'Use of Force Policy Annual Review', dueDate: '2024-12-15', priority: 'medium', daysRemaining: 24 },
    { task: 'Firearms Qualifications (15 officers)', dueDate: '2024-11-20', priority: 'critical', daysRemaining: -1 }
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

  const getStatusConfig = (status) => {
    const configs = {
      compliant: { bg: 'bg-green-500/20', text: 'text-green-400', border: 'border-green-500/30', label: 'COMPLIANT', icon: CheckCircle2 },
      'needs-attention': { bg: 'bg-amber-500/20', text: 'text-amber-400', border: 'border-amber-500/30', label: 'NEEDS ATTENTION', icon: AlertTriangle },
      'non-compliant': { bg: 'bg-red-500/20', text: 'text-red-400', border: 'border-red-500/30', label: 'NON-COMPLIANT', icon: XCircle }
    };
    return configs[status] || configs.compliant;
  };

  const getPriorityConfig = (priority) => {
    const configs = {
      critical: { bg: 'bg-red-500/20', text: 'text-red-400', border: 'border-red-500/30', label: 'CRITICAL' },
      high: { bg: 'bg-amber-500/20', text: 'text-amber-400', border: 'border-amber-500/30', label: 'HIGH' },
      medium: { bg: 'bg-blue-500/20', text: 'text-blue-400', border: 'border-blue-500/30', label: 'MEDIUM' },
      low: { bg: 'bg-slate-500/20', text: 'text-slate-400', border: 'border-slate-500/30', label: 'LOW' }
    };
    return configs[priority] || configs.medium;
  };

  const overallScore = Math.round(complianceAreas.reduce((sum, area) => sum + area.score, 0) / complianceAreas.length);
  const criticalIssues = complianceAreas.filter(a => a.status === 'non-compliant').length;
  const needsAttention = complianceAreas.filter(a => a.status === 'needs-attention').length;
  const compliantAreas = complianceAreas.filter(a => a.status === 'compliant').length;

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
                  <>
                    <span className="flex-1 text-left text-sm font-medium truncate">{item.label}</span>
                    {item.badge && <span className={`px-2 py-0.5 rounded-full text-xs ${isActive ? 'bg-white/20' : 'bg-red-500 text-white'}`}>{item.badge}</span>}
                  </>
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
                <span className="text-white">HR Compliance</span>
              </div>
            </div>
            <div className="flex items-center gap-2 lg:gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-slate-800/40 border border-slate-700/50 rounded-xl text-slate-300 hover:bg-slate-800/60 transition-all">
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Export Report</span>
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
                    <div className="p-3 border-t border-slate-700/50">
                      <button className="w-full text-center text-sm text-amber-400 hover:text-amber-300 font-medium">View All</button>
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
            <div className="mb-6">
              <h2 className="text-2xl lg:text-3xl font-bold text-white mb-2">HR Compliance Dashboard</h2>
              <p className="text-slate-400">Regulatory compliance tracking and audit management</p>
            </div>

            {/* AI Insights */}
            <div className="mb-6 bg-gradient-to-br from-green-500/10 to-emerald-500/5 border border-green-500/20 rounded-xl p-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-6 h-6 text-green-400" />
                </div>
                <div className="flex-1">
                  <h4 className="text-base font-semibold text-white mb-2">AI Compliance Intelligence</h4>
                  <div className="space-y-2 text-sm text-slate-300">
                    <p>• <span className="font-bold text-red-400">CRITICAL: 2 deadlines overdue</span> - P.O.S.T. certs & firearms quals need immediate action</p>
                    <p>• <span className="font-bold text-amber-400">8 employees need CJIS training:</span> Deadline Nov 30 - schedule training sessions now</p>
                    <p>• <span className="font-bold text-green-400">Overall compliance: 94.3%</span> - above 90% target, strong regulatory posture</p>
                    <p>• <span className="font-bold text-blue-400">EEOC report prep:</span> Data collection 85% complete - on track for Dec 31 filing</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Overall Score Card */}
            <div className="mb-6 bg-gradient-to-br from-blue-500/10 to-purple-500/5 border border-blue-500/20 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">Overall Compliance Score</h3>
                  <p className="text-sm text-slate-400">Based on {complianceAreas.length} compliance areas</p>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-bold text-white mb-1">{overallScore}%</div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className={`px-2 py-1 rounded text-xs font-bold ${
                      overallScore >= 95 ? 'bg-green-500/20 text-green-400' :
                      overallScore >= 90 ? 'bg-blue-500/20 text-blue-400' :
                      overallScore >= 85 ? 'bg-amber-500/20 text-amber-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {overallScore >= 95 ? 'EXCELLENT' : overallScore >= 90 ? 'GOOD' : overallScore >= 85 ? 'FAIR' : 'NEEDS WORK'}
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full h-3 bg-slate-800/50 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all ${
                    overallScore >= 95 ? 'bg-gradient-to-r from-green-500 to-emerald-500' :
                    overallScore >= 90 ? 'bg-gradient-to-r from-blue-500 to-cyan-500' :
                    overallScore >= 85 ? 'bg-gradient-to-r from-amber-500 to-yellow-500' :
                    'bg-gradient-to-r from-red-500 to-orange-500'
                  }`}
                  style={{ width: `${overallScore}%` }}
                />
              </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-green-400" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-white mb-1">{compliantAreas}</p>
                <p className="text-sm text-slate-400">Compliant Areas</p>
              </div>

              <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 bg-amber-500/20 rounded-xl flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5 text-amber-400" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-white mb-1">{needsAttention}</p>
                <p className="text-sm text-slate-400">Needs Attention</p>
              </div>

              <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 bg-red-500/20 rounded-xl flex items-center justify-center">
                    <XCircle className="w-5 h-5 text-red-400" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-white mb-1">{criticalIssues}</p>
                <p className="text-sm text-slate-400">Critical Issues</p>
              </div>

              <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-purple-400" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-white mb-1">{upcomingDeadlines.filter(d => d.daysRemaining <= 30).length}</p>
                <p className="text-sm text-slate-400">Deadlines (30 days)</p>
              </div>
            </div>

            {/* Upcoming Deadlines */}
            <div className="mb-6 bg-slate-800/40 border border-slate-700/50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Upcoming Compliance Deadlines</h3>
              <div className="space-y-3">
                {upcomingDeadlines.map((deadline, idx) => {
                  const priorityConfig = getPriorityConfig(deadline.priority);
                  const isOverdue = deadline.daysRemaining < 0;

                  return (
                    <div key={idx} className={`p-4 rounded-xl border ${
                      isOverdue ? 'bg-red-500/10 border-red-500/30' : 'bg-slate-900/50 border-slate-700/50'
                    }`}>
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="text-base font-semibold text-white">{deadline.task}</h4>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold border ${priorityConfig.bg} ${priorityConfig.text} ${priorityConfig.border}`}>
                              {priorityConfig.label}
                            </span>
                            {isOverdue && (
                              <span className="px-2 py-1 bg-red-500/20 border border-red-500/30 rounded text-xs text-red-400 font-bold">
                                OVERDUE
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-slate-400">
                            <span>Due: {new Date(deadline.dueDate).toLocaleDateString()}</span>
                            <span>•</span>
                            <span className={isOverdue ? 'text-red-400 font-bold' : ''}>
                              {isOverdue ? `${Math.abs(deadline.daysRemaining)} days overdue` : `${deadline.daysRemaining} days remaining`}
                            </span>
                          </div>
                        </div>
                        <button className="px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 text-blue-400 rounded-lg text-sm font-medium transition-all">
                          Take Action
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Compliance Areas */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Compliance Areas</h3>
              {complianceAreas.map(area => {
                const statusConfig = getStatusConfig(area.status);
                const StatusIcon = statusConfig.icon;

                return (
                  <div
                    key={area.id}
                    className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-5 hover:bg-slate-800/50 transition-all"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-4 flex-1">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${statusConfig.bg}`}>
                          <StatusIcon className={`w-6 h-6 ${statusConfig.text}`} />
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2 flex-wrap">
                            <h4 className="text-lg font-semibold text-white">{area.category}</h4>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold border ${statusConfig.bg} ${statusConfig.text} ${statusConfig.border}`}>
                              {statusConfig.label}
                            </span>
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-slate-400">Score:</span>
                              <span className={`text-sm font-bold ${
                                area.score >= 95 ? 'text-green-400' :
                                area.score >= 90 ? 'text-blue-400' :
                                area.score >= 85 ? 'text-amber-400' :
                                'text-red-400'
                              }`}>{area.score}%</span>
                            </div>
                          </div>

                          <p className="text-sm text-slate-300 mb-3">{area.description}</p>

                          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-xs text-slate-400 mb-4">
                            <div className="flex items-center gap-2">
                              <Scale className="w-3 h-3" />
                              <span>Regulatory Body: {area.regulatoryBody}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar className="w-3 h-3" />
                              <span>Last Audit: {new Date(area.lastAudit).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="w-3 h-3" />
                              <span>Next Review: {new Date(area.nextReview).toLocaleDateString()}</span>
                            </div>
                          </div>

                          <div className="space-y-2">
                            {area.requirements.map((req, idx) => {
                              const reqStatus = getStatusConfig(req.status);
                              return (
                                <div key={idx} className="flex items-center justify-between p-2 bg-slate-900/50 rounded-lg text-xs">
                                  <div className="flex items-center gap-2 flex-1">
                                    <reqStatus.icon className={`w-3 h-3 ${reqStatus.text}`} />
                                    <span className="text-slate-300">{req.name}</span>
                                  </div>
                                  <span className="text-slate-500">Due: {req.dueDate}</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>

                      <button className="px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 text-blue-400 rounded-lg text-sm font-medium transition-all">
                        View Details
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </main>
      </div>

      {/* AI Chat */}
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
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">Compliance AI Assistant</h3>
                <p className="text-xs text-green-400">Online</p>
              </div>
            </div>
          </div>
          <div className="flex-1 p-4 overflow-y-auto">
            <div className="flex gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <div className="bg-slate-800/60 p-3 rounded-xl">
                  <p className="text-sm text-slate-200">Hi! I can help you track compliance deadlines, interpret regulations, prepare audit reports, and answer questions about HR compliance requirements. What do you need?</p>
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 border-t border-slate-700/50">
            <div className="flex items-center gap-2">
              <input type="text" placeholder="Ask about compliance..." className="flex-1 px-4 py-2 bg-slate-800/40 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50" />
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

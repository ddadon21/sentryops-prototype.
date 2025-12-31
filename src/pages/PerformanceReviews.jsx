import React, { useState } from 'react';
import { Home, Users, FileText, LayoutDashboard, TrendingUp, AlertCircle, Settings, Bell, MessageCircle, Search, ChevronRight, DollarSign, CheckCircle, Shield, Sparkles, X, Send, Menu, ChevronLeft, LogOut, UserPlus, Briefcase, Clock, Award, Filter, Download, Eye, Calendar, Phone, Mail, MapPin, Star, Target, ThumbsUp, ThumbsDown, Edit, ClipboardCheck, GraduationCap, FileCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function PerformanceReviews() {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState('performance');
  const [chatOpen, setChatOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [logoutConfirmOpen, setLogoutConfirmOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('pending');
  const [selectedReview, setSelectedReview] = useState(null);

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
    { id: 'settings', label: 'Settings', icon: Settings, page: 'HRSettings' }
  ];

  const notifications = [
    { id: 1, title: '3 Reviews Pending Approval', message: 'Supervisor reviews awaiting HR sign-off', time: '30 min ago', urgent: true },
    { id: 2, title: 'Review Cycle Deadline', message: 'Q4 reviews due in 5 days', time: '2 hours ago', urgent: true },
    { id: 3, title: 'Self-Assessment Completed', message: 'Deputy Johnson submitted self-review', time: '1 day ago', urgent: false }
  ];

  const [reviews] = useState([
    {
      id: 1,
      employee: 'Marcus Chen',
      badge: 'D-2145',
      department: 'Patrol Division',
      position: 'Deputy Sheriff',
      supervisor: 'Sgt. Anderson',
      reviewPeriod: 'Q4 2024',
      dueDate: '2024-12-15',
      status: 'pending',
      selfAssessment: 'completed',
      supervisorReview: 'in-progress',
      overallRating: null,
      strengths: ['Community engagement', 'Report writing', 'Team collaboration'],
      improvements: ['Time management during high-call volume'],
      yearsOfService: 3
    },
    {
      id: 2,
      employee: 'Sarah Williams',
      badge: 'D-1987',
      department: 'Patrol Division',
      position: 'Senior Deputy',
      supervisor: 'Lt. Martinez',
      reviewPeriod: 'Q4 2024',
      dueDate: '2024-12-15',
      status: 'pending',
      selfAssessment: 'completed',
      supervisorReview: 'pending',
      overallRating: null,
      strengths: ['Leadership', 'Crisis management', 'Training new deputies'],
      improvements: ['Documentation timeliness'],
      yearsOfService: 7
    },
    {
      id: 3,
      employee: 'Robert Martinez',
      badge: 'D-2301',
      department: 'Patrol Division',
      position: 'Deputy Sheriff',
      supervisor: 'Sgt. Anderson',
      reviewPeriod: 'Q4 2024',
      dueDate: '2024-12-15',
      status: 'pending',
      selfAssessment: 'pending',
      supervisorReview: 'pending',
      overallRating: null,
      strengths: [],
      improvements: [],
      yearsOfService: 2
    },
    {
      id: 4,
      employee: 'Jennifer Taylor',
      badge: 'ADM-0145',
      department: 'Administrative Services',
      position: 'Administrative Coordinator',
      supervisor: 'Director Phillips',
      reviewPeriod: 'Q4 2024',
      dueDate: '2024-12-15',
      status: 'completed',
      selfAssessment: 'completed',
      supervisorReview: 'completed',
      overallRating: 4.5,
      strengths: ['Organization', 'Process improvement', 'Interdepartmental coordination'],
      improvements: ['Public speaking skills'],
      yearsOfService: 5,
      completedDate: '2024-11-28'
    },
    {
      id: 5,
      employee: 'Daniel Wilson',
      badge: 'D-2405',
      department: 'Patrol Division',
      position: 'Deputy Sheriff',
      supervisor: 'Sgt. Thompson',
      reviewPeriod: 'Q4 2024',
      dueDate: '2024-12-15',
      status: 'completed',
      selfAssessment: 'completed',
      supervisorReview: 'completed',
      overallRating: 4.8,
      strengths: ['Physical fitness', 'De-escalation techniques', 'Community outreach'],
      improvements: ['Advanced tactical training'],
      yearsOfService: 4,
      completedDate: '2024-11-25'
    },
    {
      id: 6,
      employee: 'Emily Johnson',
      badge: 'HR-0032',
      department: 'Human Resources',
      position: 'HR Specialist',
      supervisor: 'HR Director',
      reviewPeriod: 'Q4 2024',
      dueDate: '2024-12-15',
      status: 'completed',
      selfAssessment: 'completed',
      supervisorReview: 'completed',
      overallRating: 4.2,
      strengths: ['Employee relations', 'Policy knowledge', 'Conflict resolution'],
      improvements: ['HRIS system proficiency'],
      yearsOfService: 3,
      completedDate: '2024-11-30'
    },
    {
      id: 7,
      employee: 'Michael Davis',
      badge: 'DET-0098',
      department: 'Detention Center',
      position: 'Detention Officer',
      supervisor: 'Major Wilson',
      reviewPeriod: 'Q3 2024',
      dueDate: '2024-09-30',
      status: 'overdue',
      selfAssessment: 'completed',
      supervisorReview: 'pending',
      overallRating: null,
      strengths: ['Inmate management', 'Security protocols'],
      improvements: ['Report accuracy'],
      yearsOfService: 6
    }
  ]);

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
      pending: { bg: 'bg-amber-500/20', text: 'text-amber-400', border: 'border-amber-500/30', label: 'IN PROGRESS' },
      completed: { bg: 'bg-green-500/20', text: 'text-green-400', border: 'border-green-500/30', label: 'COMPLETED' },
      overdue: { bg: 'bg-red-500/20', text: 'text-red-400', border: 'border-red-500/30', label: 'OVERDUE' }
    };
    return configs[status] || configs.pending;
  };

  const getAssessmentStatus = (status) => {
    if (status === 'completed') return { icon: CheckCircle, color: 'text-green-400', label: 'Completed' };
    if (status === 'in-progress') return { icon: Clock, color: 'text-amber-400', label: 'In Progress' };
    return { icon: Clock, color: 'text-slate-500', label: 'Pending' };
  };

  const getRatingStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />);
      } else if (i === fullStars && hasHalf) {
        stars.push(<Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400/50" />);
      } else {
        stars.push(<Star key={i} className="w-4 h-4 text-slate-600" />);
      }
    }
    return stars;
  };

  const filteredReviews = reviews.filter(rev => {
    if (activeTab === 'all') return true;
    return rev.status === activeTab;
  });

  const statusCounts = {
    all: reviews.length,
    pending: reviews.filter(r => r.status === 'pending').length,
    completed: reviews.filter(r => r.status === 'completed').length,
    overdue: reviews.filter(r => r.status === 'overdue').length
  };

  const avgRating = reviews.filter(r => r.overallRating).reduce((sum, r) => sum + r.overallRating, 0) / reviews.filter(r => r.overallRating).length || 0;

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

      {/* Review Detail Modal */}
      {selectedReview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedReview(null)}
          />
          <div className="relative bg-slate-900 border border-slate-700/50 rounded-2xl p-6 max-w-2xl w-full shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-lg font-bold">{selectedReview.employee.split(' ').map(n => n[0]).join('')}</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{selectedReview.employee}</h3>
                  <p className="text-sm text-slate-400">{selectedReview.position} • {selectedReview.department}</p>
                  <p className="text-xs text-slate-500 font-mono">{selectedReview.badge}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedReview(null)}
                className="p-2 hover:bg-slate-800/50 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-4">
                <p className="text-xs text-slate-500 mb-1">Review Period</p>
                <p className="text-white font-medium">{selectedReview.reviewPeriod}</p>
              </div>
              <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-4">
                <p className="text-xs text-slate-500 mb-1">Supervisor</p>
                <p className="text-white font-medium">{selectedReview.supervisor}</p>
              </div>
              <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-4">
                <p className="text-xs text-slate-500 mb-1">Years of Service</p>
                <p className="text-white font-medium">{selectedReview.yearsOfService} years</p>
              </div>
              <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-4">
                <p className="text-xs text-slate-500 mb-1">Due Date</p>
                <p className="text-white font-medium">{new Date(selectedReview.dueDate).toLocaleDateString()}</p>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-between p-4 bg-slate-800/40 border border-slate-700/50 rounded-xl">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-slate-400" />
                  <span className="text-white">Self-Assessment</span>
                </div>
                <div className="flex items-center gap-2">
                  {(() => {
                    const status = getAssessmentStatus(selectedReview.selfAssessment);
                    const Icon = status.icon;
                    return (
                      <>
                        <Icon className={`w-4 h-4 ${status.color}`} />
                        <span className={`text-sm ${status.color}`}>{status.label}</span>
                      </>
                    );
                  })()}
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-800/40 border border-slate-700/50 rounded-xl">
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-slate-400" />
                  <span className="text-white">Supervisor Review</span>
                </div>
                <div className="flex items-center gap-2">
                  {(() => {
                    const status = getAssessmentStatus(selectedReview.supervisorReview);
                    const Icon = status.icon;
                    return (
                      <>
                        <Icon className={`w-4 h-4 ${status.color}`} />
                        <span className={`text-sm ${status.color}`}>{status.label}</span>
                      </>
                    );
                  })()}
                </div>
              </div>
            </div>

            {selectedReview.overallRating && (
              <div className="mb-6 p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl">
                <p className="text-sm text-slate-400 mb-2">Overall Rating</p>
                <div className="flex items-center gap-3">
                  <div className="flex">{getRatingStars(selectedReview.overallRating)}</div>
                  <span className="text-2xl font-bold text-white">{selectedReview.overallRating.toFixed(1)}</span>
                  <span className="text-slate-400">/ 5.0</span>
                </div>
              </div>
            )}

            {selectedReview.strengths.length > 0 && (
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
                  <ThumbsUp className="w-4 h-4 text-green-400" /> Key Strengths
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedReview.strengths.map((strength, idx) => (
                    <span key={idx} className="px-3 py-1 bg-green-500/20 border border-green-500/30 rounded-full text-xs text-green-400">
                      {strength}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {selectedReview.improvements.length > 0 && (
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
                  <Target className="w-4 h-4 text-amber-400" /> Areas for Development
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedReview.improvements.map((improvement, idx) => (
                    <span key={idx} className="px-3 py-1 bg-amber-500/20 border border-amber-500/30 rounded-full text-xs text-amber-400">
                      {improvement}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-3">
              {selectedReview.status !== 'completed' && (
                <>
                  <button className="flex-1 px-4 py-2.5 bg-amber-500 hover:bg-amber-400 rounded-xl text-white font-medium transition-all flex items-center justify-center gap-2">
                    <Edit className="w-4 h-4" /> Edit Review
                  </button>
                  <button className="flex-1 px-4 py-2.5 bg-green-500/20 hover:bg-green-500/30 border border-green-500/30 text-green-400 rounded-xl font-medium transition-all">
                    Complete Review
                  </button>
                </>
              )}
              {selectedReview.status === 'completed' && (
                <button className="flex-1 px-4 py-2.5 bg-slate-800/40 hover:bg-slate-800/60 border border-slate-700/50 rounded-xl text-white font-medium transition-all flex items-center justify-center gap-2">
                  <Download className="w-4 h-4" /> Download PDF
                </button>
              )}
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
                <span className="text-white">Performance Reviews</span>
              </div>
            </div>
            <div className="flex items-center gap-2 lg:gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-400 rounded-xl text-white font-medium transition-all">
                <Award className="w-4 h-4" />
                <span className="hidden sm:inline">New Review</span>
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
              <h2 className="text-2xl lg:text-3xl font-bold text-white mb-2">Performance Reviews</h2>
              <p className="text-slate-400">Manage employee evaluations and performance tracking</p>
            </div>

            {/* AI Insights */}
            <div className="mb-6 bg-gradient-to-br from-blue-500/10 to-cyan-500/5 border border-blue-500/20 rounded-xl p-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-6 h-6 text-blue-400" />
                </div>
                <div className="flex-1">
                  <h4 className="text-base font-semibold text-white mb-2">AI Performance Insights</h4>
                  <div className="space-y-2 text-sm text-slate-300">
                    <p>• <span className="font-bold text-green-400">Review cycle on track:</span> 89% completion rate for Q4 reviews</p>
                    <p>• <span className="font-bold text-amber-400">3 supervisor reviews pending:</span> Marcus Chen, Sarah Williams, Robert Martinez need supervisor input</p>
                    <p>• <span className="font-bold text-red-400">1 overdue review:</span> Michael Davis (Q3) - escalate to Major Wilson</p>
                    <p>• <span className="font-bold text-blue-400">Top performers identified:</span> Daniel Wilson (4.8) and Jennifer Taylor (4.5) exceed expectations</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 bg-amber-500/20 rounded-xl flex items-center justify-center">
                    <Clock className="w-5 h-5 text-amber-400" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-white mb-1">{statusCounts.pending}</p>
                <p className="text-sm text-slate-400">In Progress</p>
              </div>

              <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-white mb-1">{statusCounts.completed}</p>
                <p className="text-sm text-slate-400">Completed</p>
              </div>

              <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 bg-red-500/20 rounded-xl flex items-center justify-center">
                    <AlertCircle className="w-5 h-5 text-red-400" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-white mb-1">{statusCounts.overdue}</p>
                <p className="text-sm text-slate-400">Overdue</p>
              </div>

              <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
                    <Star className="w-5 h-5 text-blue-400" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-white mb-1">{avgRating.toFixed(1)}</p>
                <p className="text-sm text-slate-400">Avg Rating</p>
              </div>
            </div>

            {/* Status Tabs */}
            <div className="mb-6 flex gap-2 border-b border-slate-700/50 overflow-x-auto">
              {[
                { id: 'all', label: 'All Reviews', count: statusCounts.all },
                { id: 'pending', label: 'In Progress', count: statusCounts.pending },
                { id: 'completed', label: 'Completed', count: statusCounts.completed },
                { id: 'overdue', label: 'Overdue', count: statusCounts.overdue }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-all relative whitespace-nowrap ${
                    activeTab === tab.id ? 'text-amber-400' : 'text-slate-400 hover:text-slate-300'
                  }`}
                >
                  {tab.label}
                  <span className={`px-2 py-0.5 rounded-full text-xs ${
                    activeTab === tab.id ? 'bg-amber-500/20 text-amber-400' : 'bg-slate-700/50 text-slate-400'
                  }`}>{tab.count}</span>
                  {activeTab === tab.id && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500"></div>
                  )}
                </button>
              ))}
            </div>

            {/* Reviews List */}
            <div className="space-y-4">
              {filteredReviews.map(review => {
                const statusConfig = getStatusConfig(review.status);

                return (
                  <div
                    key={review.id}
                    className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-5 hover:bg-slate-800/50 transition-all cursor-pointer"
                    onClick={() => setSelectedReview(review)}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-bold">{review.employee.split(' ').map(n => n[0]).join('')}</span>
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2 flex-wrap">
                            <h3 className="text-lg font-semibold text-white">{review.employee}</h3>
                            <span className="px-2 py-1 bg-slate-700/50 rounded text-xs text-slate-300 font-mono">{review.badge}</span>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold border ${statusConfig.bg} ${statusConfig.text} ${statusConfig.border}`}>
                              {statusConfig.label}
                            </span>
                          </div>

                          <p className="text-sm text-slate-400 mb-3">{review.position} • {review.department}</p>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs text-slate-400 mb-3">
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
                              <span>Due: {new Date(review.dueDate).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Award className="w-3 h-3" />
                              <span>{review.yearsOfService} years service</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-4 text-xs">
                            <div className="flex items-center gap-2">
                              <span className="text-slate-500">Self:</span>
                              {(() => {
                                const status = getAssessmentStatus(review.selfAssessment);
                                const Icon = status.icon;
                                return <Icon className={`w-4 h-4 ${status.color}`} />;
                              })()}
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-slate-500">Supervisor:</span>
                              {(() => {
                                const status = getAssessmentStatus(review.supervisorReview);
                                const Icon = status.icon;
                                return <Icon className={`w-4 h-4 ${status.color}`} />;
                              })()}
                            </div>
                            {review.overallRating && (
                              <div className="flex items-center gap-2">
                                <span className="text-slate-500">Rating:</span>
                                <div className="flex">{getRatingStars(review.overallRating)}</div>
                                <span className="text-white font-medium">{review.overallRating.toFixed(1)}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <button className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors">
                        <Eye className="w-5 h-5 text-slate-400" />
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
                <h3 className="text-sm font-semibold text-white">Performance AI Assistant</h3>
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
                  <p className="text-sm text-slate-200">Hi! I can help you analyze performance trends, identify top performers, draft review feedback, and track review completion. How can I assist you?</p>
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 border-t border-slate-700/50">
            <div className="flex items-center gap-2">
              <input type="text" placeholder="Ask about reviews..." className="flex-1 px-4 py-2 bg-slate-800/40 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50" />
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

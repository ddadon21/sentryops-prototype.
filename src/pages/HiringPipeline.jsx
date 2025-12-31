import React, { useState } from 'react';
import { Home, Users, FileText, LayoutDashboard, TrendingUp, AlertCircle, Settings, Bell, MessageCircle, Search, ChevronRight, DollarSign, CheckCircle, Shield, Sparkles, X, Send, Menu, ChevronLeft, LogOut, UserPlus, Briefcase, Clock, Award, Filter, Download, Eye, ArrowRight, Calendar, Phone, Mail, MapPin, Star, ChevronDown, ChevronUp, FileCheck, ClipboardCheck, GraduationCap } from 'lucide-react';
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
    { id: 'hr-reports', label: 'HR Reports', icon: LayoutDashboard, page: 'HRReports' },
    { id: 'settings', label: 'Settings', icon: Settings, page: 'HRSettings' }
  ];

  const notifications = [
    { id: 1, title: '5 New Applications', message: 'Deputy Sheriff position received 5 applications', time: '15 min ago', urgent: false },
    { id: 2, title: 'Interview Scheduled', message: 'Background investigator interview - Tomorrow 10 AM', time: '1 hour ago', urgent: true },
    { id: 3, title: '3 Onboarding Tasks Due', message: 'New hire paperwork pending completion', time: '2 hours ago', urgent: true }
  ];

  const pipelineStages = [
    {
      id: 'application',
      name: 'Application Review',
      count: 47,
      icon: FileText,
      color: 'blue',
      candidates: [
        { id: 1, name: 'Marcus Johnson', position: 'Deputy Sheriff', daysInStage: 2, rating: 4.5, nextAction: 'Initial screening', actionDate: '2024-11-05' },
        { id: 2, name: 'Lisa Williams', position: 'Detention Officer', daysInStage: 1, rating: 4.2, nextAction: 'Resume review', actionDate: '2024-11-05' },
        { id: 3, name: 'Jennifer Taylor', position: 'Administrative Assistant', daysInStage: 3, rating: 4.3, nextAction: 'Skills assessment', actionDate: '2024-11-06' }
      ]
    },
    {
      id: 'screening',
      name: 'Initial Screening',
      count: 28,
      icon: Search,
      color: 'purple',
      candidates: [
        { id: 4, name: 'David Brown', position: 'Deputy Sheriff', daysInStage: 5, rating: 4.7, nextAction: 'Phone interview', actionDate: '2024-11-06' },
        { id: 5, name: 'Michelle Lee', position: 'Background Investigator', daysInStage: 3, rating: 4.6, nextAction: 'Reference check', actionDate: '2024-11-07' }
      ]
    },
    {
      id: 'interview',
      name: 'Interviews',
      count: 15,
      icon: Users,
      color: 'amber',
      candidates: [
        { id: 6, name: 'Sarah Chen', position: 'Background Investigator', daysInStage: 8, rating: 4.8, nextAction: 'Panel interview', actionDate: '2024-11-05' },
        { id: 7, name: 'Robert Martinez', position: 'Deputy Sheriff', daysInStage: 6, rating: 4.6, nextAction: '2nd interview', actionDate: '2024-11-06' },
        { id: 8, name: 'Amanda Garcia', position: 'Background Investigator', daysInStage: 4, rating: 4.9, nextAction: 'Final interview', actionDate: '2024-11-07' }
      ]
    },
    {
      id: 'assessment',
      name: 'Skills Assessment',
      count: 12,
      icon: Award,
      color: 'cyan',
      candidates: [
        { id: 9, name: 'Thomas White', position: 'Deputy Sheriff', daysInStage: 2, rating: 4.4, nextAction: 'Physical fitness test', actionDate: '2024-11-08' },
        { id: 10, name: 'Patricia Davis', position: 'Detention Officer', daysInStage: 1, rating: 4.3, nextAction: 'Written exam', actionDate: '2024-11-06' }
      ]
    },
    {
      id: 'background',
      name: 'Background Check',
      count: 8,
      icon: Shield,
      color: 'indigo',
      candidates: [
        { id: 11, name: 'Daniel Wilson', position: 'Deputy Sheriff', daysInStage: 15, rating: 4.7, nextAction: 'Final clearance', actionDate: '2024-11-10' },
        { id: 12, name: 'Emily Johnson', position: 'Background Investigator', daysInStage: 12, rating: 4.8, nextAction: 'CJIS clearance', actionDate: '2024-11-08' }
      ]
    },
    {
      id: 'offer',
      name: 'Offer Extended',
      count: 3,
      icon: CheckCircle,
      color: 'green',
      candidates: [
        { id: 13, name: 'Christopher Lee', position: 'Deputy Sheriff', daysInStage: 3, rating: 4.9, nextAction: 'Awaiting acceptance', actionDate: '2024-11-07' },
        { id: 14, name: 'Nicole Brown', position: 'Detention Officer', daysInStage: 1, rating: 4.7, nextAction: 'Negotiating terms', actionDate: '2024-11-05' }
      ]
    }
  ];

  const pipelineMetrics = {
    totalCandidates: 113,
    avgTimeToHire: 45,
    conversionRate: 23.5,
    offerAcceptanceRate: 87.5,
    dropOffRate: 12.3
  };

  const bottlenecks = [
    { stage: 'Background Check', issue: 'Avg 18 days - 3 days over target', severity: 'high' },
    { stage: 'Interviews', issue: '15 candidates waiting - schedule backlog', severity: 'medium' },
    { stage: 'Skills Assessment', issue: 'Physical test facility limited availability', severity: 'low' }
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
      blue: { bg: 'bg-blue-500/20', text: 'text-blue-400', border: 'border-blue-500/30' },
      purple: { bg: 'bg-purple-500/20', text: 'text-purple-400', border: 'border-purple-500/30' },
      amber: { bg: 'bg-amber-500/20', text: 'text-amber-400', border: 'border-amber-500/30' },
      cyan: { bg: 'bg-cyan-500/20', text: 'text-cyan-400', border: 'border-cyan-500/30' },
      indigo: { bg: 'bg-indigo-500/20', text: 'text-indigo-400', border: 'border-indigo-500/30' },
      green: { bg: 'bg-green-500/20', text: 'text-green-400', border: 'border-green-500/30' }
    };
    return colors[color] || colors.blue;
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
                <span className="text-white">Hiring Pipeline</span>
              </div>
            </div>
            <div className="flex items-center gap-2 lg:gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-slate-800/40 border border-slate-700/50 rounded-xl text-slate-300 hover:bg-slate-800/60 transition-all">
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Export</span>
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
              <h2 className="text-2xl lg:text-3xl font-bold text-white mb-2">Hiring Pipeline</h2>
              <p className="text-slate-400">Track candidates through the recruitment process</p>
            </div>

            {/* AI Insights */}
            <div className="mb-6 bg-gradient-to-br from-amber-500/10 to-orange-500/5 border border-amber-500/20 rounded-xl p-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-amber-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-6 h-6 text-amber-400" />
                </div>
                <div className="flex-1">
                  <h4 className="text-base font-semibold text-white mb-2">AI Pipeline Intelligence</h4>
                  <div className="space-y-2 text-sm text-slate-300">
                    <p>• <span className="font-bold text-red-400">Bottleneck detected:</span> Background checks taking 18 days (3 days over target)</p>
                    <p>• <span className="font-bold text-green-400">Strong candidates ready:</span> 3 candidates ready for final interviews this week</p>
                    <p>• <span className="font-bold text-blue-400">Conversion insight:</span> 23.5% conversion rate - above 18% industry average</p>
                    <p>• <span className="font-bold text-purple-400">Recommendation:</span> Schedule backlog of 15 interviews to maintain pipeline flow</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
              <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-5">
                <div className="flex items-center justify-between mb-2">
                  <Users className="w-5 h-5 text-blue-400" />
                </div>
                <p className="text-2xl font-bold text-white mb-1">{pipelineMetrics.totalCandidates}</p>
                <p className="text-xs text-slate-400">Total in Pipeline</p>
              </div>

              <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-5">
                <div className="flex items-center justify-between mb-2">
                  <Clock className="w-5 h-5 text-purple-400" />
                </div>
                <p className="text-2xl font-bold text-white mb-1">{pipelineMetrics.avgTimeToHire}</p>
                <p className="text-xs text-slate-400">Avg Days to Hire</p>
              </div>

              <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-5">
                <div className="flex items-center justify-between mb-2">
                  <TrendingUp className="w-5 h-5 text-green-400" />
                </div>
                <p className="text-2xl font-bold text-white mb-1">{pipelineMetrics.conversionRate}%</p>
                <p className="text-xs text-slate-400">Conversion Rate</p>
              </div>

              <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-5">
                <div className="flex items-center justify-between mb-2">
                  <CheckCircle className="w-5 h-5 text-amber-400" />
                </div>
                <p className="text-2xl font-bold text-white mb-1">{pipelineMetrics.offerAcceptanceRate}%</p>
                <p className="text-xs text-slate-400">Offer Acceptance</p>
              </div>

              <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-5">
                <div className="flex items-center justify-between mb-2">
                  <AlertCircle className="w-5 h-5 text-red-400" />
                </div>
                <p className="text-2xl font-bold text-white mb-1">{pipelineMetrics.dropOffRate}%</p>
                <p className="text-xs text-slate-400">Drop-off Rate</p>
              </div>
            </div>

            {/* Bottlenecks Alert */}
            {bottlenecks.length > 0 && (
              <div className="mb-6 bg-red-500/10 border border-red-500/20 rounded-xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  <AlertCircle className="w-5 h-5 text-red-400" />
                  <h4 className="text-base font-semibold text-white">Pipeline Bottlenecks Detected</h4>
                </div>
                <div className="space-y-2">
                  {bottlenecks.map((bottleneck, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg">
                      <div>
                        <p className="text-sm font-medium text-white">{bottleneck.stage}</p>
                        <p className="text-xs text-slate-400">{bottleneck.issue}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        bottleneck.severity === 'high' ? 'bg-red-500/20 text-red-400' :
                        bottleneck.severity === 'medium' ? 'bg-amber-500/20 text-amber-400' :
                        'bg-blue-500/20 text-blue-400'
                      }`}>
                        {bottleneck.severity.toUpperCase()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Pipeline Stages */}
            <div className="space-y-4">
              {pipelineStages.map((stage, stageIdx) => {
                const Icon = stage.icon;
                const colorConfig = getStageColor(stage.color);
                const isExpanded = selectedStage === stage.id;

                return (
                  <div key={stage.id} className="bg-slate-800/40 border border-slate-700/50 rounded-xl overflow-hidden">
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
                            </div>
                            <div className="flex items-center gap-4 text-xs text-slate-400">
                              <span>Stage {stageIdx + 1} of {pipelineStages.length}</span>
                              <span>•</span>
                              <span>{((stage.count / pipelineMetrics.totalCandidates) * 100).toFixed(1)}% of pipeline</span>
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
                        <div className="space-y-3">
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
                                          <div className="flex items-center gap-1">
                                            <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                                            <span className="text-xs font-bold text-amber-400">{candidate.rating}</span>
                                          </div>
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
                                    <div className="flex gap-2">
                                      <button className="flex-1 px-3 py-2 bg-green-500/20 hover:bg-green-500/30 border border-green-500/30 text-green-400 rounded-lg text-xs font-medium transition-all">
                                        Move to Next Stage
                                      </button>
                                      <button className="flex-1 px-3 py-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 text-blue-400 rounded-lg text-xs font-medium transition-all">
                                        View Details
                                      </button>
                                      <button className="px-3 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-400 rounded-lg text-xs font-medium transition-all">
                                        Reject
                                      </button>
                                    </div>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </main>
      </div>

      {/* AI Chat Button */}
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
                <h3 className="text-sm font-semibold text-white">Pipeline AI Assistant</h3>
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
                  <p className="text-sm text-slate-200">Hi! I can help you identify bottlenecks, move candidates through stages, predict time-to-hire, and optimize your pipeline. What do you need?</p>
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 border-t border-slate-700/50">
            <div className="flex items-center gap-2">
              <input type="text" placeholder="Ask about pipeline..." className="flex-1 px-4 py-2 bg-slate-800/40 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50" />
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

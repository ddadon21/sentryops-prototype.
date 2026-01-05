import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Home, Users, FileText, LayoutDashboard, TrendingUp, AlertCircle, Settings, Bell, MessageCircle, Search, ChevronRight, Shield, Sparkles, X, Send, Menu, ChevronLeft, LogOut, FolderOpen, Calendar, Clock, CheckCircle, XCircle, AlertTriangle, UserCheck, FileCheck, DollarSign, Eye, Share2, ThumbsUp, MessageSquare, Flag, Image } from 'lucide-react';

export default function SocialMediaAnalysis() {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState('social-media');
  const [chatOpen, setChatOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [logoutConfirmOpen, setLogoutConfirmOpen] = useState(false);

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
    { id: 'bi-reports', label: 'BI Reports', icon: LayoutDashboard, page: 'BIReports' },
    { id: 'case-closure', label: 'Case Closure', icon: XCircle, page: 'CaseClosure' },
    { id: 'settings', label: 'Settings', icon: Settings, page: 'BISettings' }
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

  const socialMediaReports = [
    {
      id: 1,
      caseId: 'BI-2024-145',
      subject: 'Robert Martinez',
      reviewDate: 'Oct 30, 2024',
      status: 'Clear',
      platformsReviewed: ['Facebook', 'LinkedIn', 'Twitter/X', 'Instagram'],
      publicPosts: 142,
      flaggedContent: 0,
      politicalContent: 'Minimal, non-controversial',
      professionalPresence: 'Strong - Active on LinkedIn with law enforcement network',
      concerningBehavior: 'None identified',
      overallAssessment: 'Professional online presence. Posts primarily related to community engagement and law enforcement activities. No red flags.',
      notes: 'Subject maintains appropriate boundaries. No concerning associations or content.',
      recommendation: 'Approved'
    },
    {
      id: 2,
      caseId: 'BI-2024-143',
      subject: 'Sarah Chen',
      reviewDate: 'Nov 1, 2024',
      status: 'Clear',
      platformsReviewed: ['Facebook', 'LinkedIn', 'Instagram'],
      publicPosts: 87,
      flaggedContent: 0,
      politicalContent: 'None',
      professionalPresence: 'Excellent - Active professional networking',
      concerningBehavior: 'None identified',
      overallAssessment: 'Very professional online presence. Posts focused on family, fitness, and career development.',
      notes: 'Private settings on most platforms. Limited public content. All reviewed content appropriate.',
      recommendation: 'Approved'
    },
    {
      id: 3,
      caseId: 'BI-2024-141',
      subject: 'James Wilson',
      reviewDate: 'Nov 2, 2024',
      status: 'Review Required',
      platformsReviewed: ['Facebook', 'Twitter/X', 'Instagram'],
      publicPosts: 423,
      flaggedContent: 3,
      politicalContent: 'Moderate - Some controversial political opinions',
      professionalPresence: 'Limited',
      concerningBehavior: 'Some inappropriate language in older posts (2018-2019)',
      overallAssessment: 'Mixed online presence. Several posts from 5+ years ago contain inappropriate language. Recent activity more professional.',
      notes: 'Flagged posts are from college years. Subject appears to have matured. Recent posts appropriate. Recommend discussion during interview.',
      recommendation: 'Conditional - Discuss flagged content'
    },
    {
      id: 4,
      caseId: 'BI-2024-138',
      subject: 'Maria Rodriguez',
      reviewDate: 'Nov 3, 2024',
      status: 'In Progress',
      platformsReviewed: ['LinkedIn'],
      publicPosts: 0,
      flaggedContent: 0,
      politicalContent: 'N/A',
      professionalPresence: 'Limited online presence',
      concerningBehavior: 'None identified so far',
      overallAssessment: 'Analysis in progress. Subject has minimal social media presence.',
      notes: 'Very limited public profiles. Most accounts private or inactive. LinkedIn profile professional.',
      recommendation: 'Pending completion'
    }
  ];

  const notifications = [
    { id: 1, title: 'Review Required', message: 'James Wilson - Flagged content', time: '1 hour ago', urgent: true },
    { id: 2, title: 'Analysis Complete', message: 'Sarah Chen - All clear', time: '3 hours ago', urgent: false }
  ];

  const clearCount = socialMediaReports.filter(r => r.status === 'Clear').length;
  const reviewCount = socialMediaReports.filter(r => r.status === 'Review Required').length;
  const inProgressCount = socialMediaReports.filter(r => r.status === 'In Progress').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex">
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 border-r border-slate-800/50 backdrop-blur-xl bg-slate-900/30 flex flex-col transform transition-all lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} ${sidebarCollapsed ? 'w-20' : 'w-64'}`}>
        <div className="p-4 border-b border-slate-700/50 flex items-center justify-between">
          {!sidebarCollapsed && (
            <div className="flex items-center gap-2">
              <Shield className="w-8 h-8 text-purple-500" />
              <h1 className="text-xl font-bold text-white">SentryOps</h1>
            </div>
          )}
          {sidebarCollapsed && (
            <Shield className="w-8 h-8 text-purple-500 mx-auto" />
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
                  isActive ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/20' : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
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
                className="flex-1 px-4 py-2.5 bg-purple-600/40 hover:bg-purple-600/60 border border-purple-500/50 rounded-xl text-white font-medium transition-all"
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
              <div className="flex-1 max-w-xl relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input type="text" placeholder="Search social media reports..." className="w-full pl-12 pr-4 py-2 bg-slate-800/40 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/50" />
              </div>
            </div>
            <div className="flex items-center gap-2 lg:gap-3">
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
                        <div key={notification.id} className={`p-4 border-b border-slate-800/30 hover:bg-slate-800/30 cursor-pointer transition-colors ${notification.urgent ? 'bg-purple-500/5' : ''}`}>
                          <div className="flex items-start gap-3">
                            <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${notification.urgent ? 'bg-purple-400' : 'bg-blue-400'}`}></div>
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
                      <button className="w-full text-center text-sm text-purple-400 hover:text-purple-300 font-medium">View All</button>
                    </div>
                  </div>
                )}
              </div>

              <div className="h-8 w-px bg-slate-700/50"></div>

              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">BS</span>
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-white">BI Supervisor</p>
                  <p className="text-xs text-slate-400">Background Investigations</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <div className="mb-6">
            <h2 className="text-2xl lg:text-3xl font-bold text-white mb-2">Social Media Analysis</h2>
            <p className="text-slate-400">Public online presence and behavior assessment</p>
          </div>

          <div className="mb-6 bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-500/20 rounded-xl p-5">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-6 h-6 text-purple-400" />
              </div>
              <div className="flex-1">
                <h4 className="text-base font-semibold text-white mb-2">Social Media Review Summary</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-300">
                  <p>• {socialMediaReports.length} profiles analyzed</p>
                  <p>• {clearCount} profiles cleared</p>
                  <p>• 652 total public posts reviewed</p>
                  <p>• {reviewCount} profile requiring discussion</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-6">
              <div className="flex items-center justify-between mb-2">
                <Eye className="w-8 h-8 text-blue-400" />
                <span className="text-2xl font-bold text-white">{socialMediaReports.length}</span>
              </div>
              <p className="text-sm text-slate-400">Profiles Analyzed</p>
            </div>

            <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-6">
              <div className="flex items-center justify-between mb-2">
                <CheckCircle className="w-8 h-8 text-green-400" />
                <span className="text-2xl font-bold text-white">{clearCount}</span>
              </div>
              <p className="text-sm text-slate-400">Clear</p>
            </div>

            <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-6">
              <div className="flex items-center justify-between mb-2">
                <AlertTriangle className="w-8 h-8 text-amber-400" />
                <span className="text-2xl font-bold text-white">{reviewCount}</span>
              </div>
              <p className="text-sm text-slate-400">Review Required</p>
            </div>

            <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-6">
              <div className="flex items-center justify-between mb-2">
                <Clock className="w-8 h-8 text-blue-400" />
                <span className="text-2xl font-bold text-white">{inProgressCount}</span>
              </div>
              <p className="text-sm text-slate-400">In Progress</p>
            </div>
          </div>

          <div className="space-y-4">
            {socialMediaReports.map((report) => (
              <div key={report.id} className={`bg-slate-800/40 border rounded-xl p-6 ${
                report.status === 'Clear' ? 'border-green-500/30' :
                report.status === 'Review Required' ? 'border-amber-500/30' : 'border-slate-700/50'
              }`}>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">{report.subject}</h3>
                    <p className="text-sm text-purple-400 mb-2">{report.caseId}</p>
                    <p className="text-sm text-slate-400">Review Date: {report.reviewDate}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-lg text-xs font-medium ${
                    report.status === 'Clear' ? 'bg-green-500/10 text-green-400' :
                    report.status === 'Review Required' ? 'bg-amber-500/10 text-amber-400' :
                    'bg-blue-500/10 text-blue-400'
                  }`}>
                    {report.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="bg-slate-900/40 rounded-lg p-3">
                    <p className="text-xs text-slate-500 mb-2">Platforms Reviewed</p>
                    <div className="flex flex-wrap gap-2">
                      {report.platformsReviewed.map((platform, idx) => (
                        <span key={idx} className="px-2 py-1 bg-purple-500/10 text-purple-400 rounded text-xs font-medium">
                          {platform}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-900/40 rounded-lg p-3">
                      <p className="text-xs text-slate-500 mb-1">Public Posts</p>
                      <p className="text-lg font-bold text-white">{report.publicPosts}</p>
                    </div>
                    <div className="bg-slate-900/40 rounded-lg p-3">
                      <p className="text-xs text-slate-500 mb-1">Flagged</p>
                      <p className={`text-lg font-bold ${report.flaggedContent > 0 ? 'text-amber-400' : 'text-green-400'}`}>{report.flaggedContent}</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Political Content:</span>
                      <span className="text-white">{report.politicalContent}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Professional Presence:</span>
                      <span className="text-white">{report.professionalPresence}</span>
                    </div>
                  </div>
                  <div className="bg-slate-900/40 rounded-lg p-3">
                    <p className="text-xs text-slate-500 mb-1">Concerning Behavior</p>
                    <p className={`text-sm ${report.concerningBehavior === 'None identified' ? 'text-green-400' : 'text-amber-400'}`}>
                      {report.concerningBehavior}
                    </p>
                  </div>
                </div>

                <div className="bg-slate-900/40 rounded-lg p-3 mb-4">
                  <p className="text-xs text-slate-500 mb-1">Overall Assessment</p>
                  <p className="text-sm text-slate-300 mb-2">{report.overallAssessment}</p>
                  <p className="text-xs text-slate-400">{report.notes}</p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-700/30">
                  <div className="text-sm">
                    <span className="text-slate-400">Recommendation: </span>
                    <span className={`font-medium ${
                      report.recommendation.includes('Approved') ? 'text-green-400' :
                      report.recommendation.includes('Conditional') ? 'text-amber-400' : 'text-blue-400'
                    }`}>
                      {report.recommendation}
                    </span>
                  </div>
                  <button className="px-4 py-2 bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 rounded-xl text-sm font-medium transition-colors">
                    View Detailed Analysis
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      <button
        onClick={() => setChatOpen(!chatOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-400 hover:to-purple-500 rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110 z-50"
      >
        {chatOpen ? <X className="w-6 h-6 text-white" /> : <MessageCircle className="w-6 h-6 text-white" />}
      </button>

      {chatOpen && (
        <div className="fixed bottom-24 right-6 w-full max-w-96 h-[500px] bg-slate-900/95 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl flex flex-col z-40 mx-4 sm:mx-0">
          <div className="p-4 border-b border-slate-700/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">BI AI Assistant</h3>
                <p className="text-xs text-green-400">Online</p>
              </div>
            </div>
          </div>
          <div className="flex-1 p-4 overflow-y-auto">
            <div className="flex gap-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <div className="bg-slate-800/60 p-3 rounded-xl">
                  <p className="text-sm text-slate-200">I can help analyze social media content, identify red flags, assess professional reputation, and provide context on online behavior. What do you need?</p>
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 border-t border-slate-700/50">
            <div className="flex items-center gap-2">
              <input type="text" placeholder="Ask about social media..." className="flex-1 px-4 py-2 bg-slate-800/40 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/50" />
              <button className="w-10 h-10 bg-purple-500 rounded-xl flex items-center justify-center">
                <Send className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

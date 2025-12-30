import React, { useState } from 'react';
import { Home, Users, FileText, LayoutDashboard, TrendingUp, AlertCircle, Settings, Bell, MessageCircle, Search, ChevronRight, DollarSign, CheckCircle, Shield, ThumbsUp, XCircle, Sparkles, X, Send, Menu, ChevronLeft, LogOut, Calendar, Clock, Filter, ArrowUpCircle, Download, Eye, ChevronDown, ChevronUp, Building2, Radio, Target, Info, FileCheck, TrendingDown, CheckSquare, Square } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function Approvals() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('pending');
  const [chatOpen, setChatOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [logoutConfirmOpen, setLogoutConfirmOpen] = useState(false);
  const [selectedApproval, setSelectedApproval] = useState(null);
  const [approvalAction, setApprovalAction] = useState(null);
  const [actionComment, setActionComment] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [toastMessage, setToastMessage] = useState(null);
  const [budgetExpanded, setBudgetExpanded] = useState(false);
  const [historyDetailModal, setHistoryDetailModal] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [expandedCards, setExpandedCards] = useState([]);
  const [requestInfoModal, setRequestInfoModal] = useState(null);
  const [infoRequest, setInfoRequest] = useState('');

  const currentUser = 'Sheriff Thompson';

  const [approvalsList, setApprovalsList] = useState([
    {
      id: 1,
      type: 'leave',
      title: 'Leave Request',
      submittedBy: 'Deputy Marcus Chen',
      details: 'Annual leave: Dec 15-22',
      division: 'Patrol Division',
      urgent: false,
      submittedDate: '2024-11-01',
      daysAgo: 3,
      justification: 'Pre-planned annual leave for family vacation. All shifts covered by Deputy Rodriguez and Deputy Williams. No conflicts with major operations or events.',
      impact: {
        approved: 'Patrol staffing at 92% during leave period. Deputy Rodriguez and Williams covering shifts. Morale boost from approved PTO.',
        denied: 'Deputy Chen may need to reschedule family plans. Potential morale impact. Next available leave window is February 2025.'
      },
      aiRecommendation: {
        decision: 'approve',
        confidence: 95,
        reasoning: 'No staffing conflicts. Coverage arranged. Within leave policy. Strong attendance record for Deputy Chen (98% in 2024).'
      },
      documents: ['Leave_Request_Form.pdf', 'Coverage_Plan.pdf'],
      relatedApprovals: []
    },
    {
      id: 2,
      type: 'budget',
      title: 'Budget Approval',
      submittedBy: 'Training Division',
      details: 'Q1 2025 Training Budget',
      division: 'Training Division',
      urgent: true,
      amount: 45000,
      submittedDate: '2024-11-02',
      daysAgo: 2,
      justification: 'Mandatory P.O.S.T. certifications for 23 deputies expire Q1 2025. Legal requirement to maintain certification. Includes firearms re-qualification, CPR/First Aid, defensive tactics, and legal updates.',
      impact: {
        approved: 'All 23 deputies maintain certifications. No operational disruptions. Compliance with state law. Training completed by March 31, 2025.',
        denied: 'Deputies lose certification and cannot patrol. Potential liability exposure. Reduced field staffing by 23 officers. Violation of state requirements.'
      },
      budgetImpact: {
        amount: 45000,
        category: 'Training & Development',
        allocated: 180000,
        spent: 135000,
        percentUsed: 75,
        remainingAfter: 0,
        quarterlyBreakdown: { Q1: 45000, Q2: 0, Q3: 0, Q4: 0 }
      },
      aiRecommendation: {
        decision: 'approve',
        confidence: 99,
        reasoning: 'Critical compliance requirement. Legal mandate. Budget available. No alternative options. High risk if denied.',
        urgencyNote: 'Deadline: Dec 20, 2024 to schedule training before certifications expire'
      },
      documents: ['Training_Budget_Request.pdf', 'Certification_Requirements.pdf', 'Vendor_Quotes.pdf'],
      relatedApprovals: []
    },
    {
      id: 3,
      type: 'hiring',
      title: 'Hiring Decision',
      submittedBy: 'Jane Doe',
      details: 'Federal Deputy Position',
      division: 'Field Operations',
      urgent: true,
      submittedDate: '2024-11-02',
      daysAgo: 2,
      justification: 'Exceptional candidate - former FBI agent with 8 years federal law enforcement. Background check complete (clean). Top scorer on civil service exam (97th percentile). Fills critical vacancy in Field Operations. Offer expires Dec 18, 2024.',
      impact: {
        approved: 'Field Operations at 100% staffing. Federal law enforcement experience strengthens investigations unit. Experienced hire reduces training costs. Immediate operational deployment.',
        denied: 'Lose highly qualified candidate. Field Operations remains at 87% staffing. Next qualified candidate not available until March 2025. Continue overtime for current staff.'
      },
      budgetImpact: {
        amount: 78000,
        category: 'Personnel - Annual Salary',
        firstYearCost: 78000,
        benefits: 23400,
        totalFirstYear: 101400
      },
      aiRecommendation: {
        decision: 'approve',
        confidence: 92,
        reasoning: 'Exceptional qualifications. Critical vacancy. Budget available. Offer expires soon. Strong background check. Reduces overtime costs.',
        urgencyNote: 'Offer expires Dec 18, 2024 (3 days)'
      },
      documents: ['Resume.pdf', 'Background_Check.pdf', 'Civil_Service_Scores.pdf', 'Offer_Letter.pdf'],
      relatedApprovals: []
    },
    {
      id: 4,
      type: 'equipment',
      title: 'Equipment Purchase',
      submittedBy: 'IT Department',
      details: 'Body cameras upgrade',
      division: 'Administrative Services',
      urgent: false,
      amount: 125000,
      submittedDate: '2024-10-28',
      daysAgo: 7,
      justification: 'Current body cameras (purchased 2019) end-of-life December 2024. Vendor discontinuing support and cloud storage. New system offers 4K video, auto-activation, real-time streaming, and enhanced evidence management. Critical for transparency and legal protection.',
      impact: {
        approved: '85 new body cameras with 5-year warranty. 4K video quality (vs current 1080p). Auto-activation when weapon drawn. Real-time supervisor monitoring. Cloud storage for 7 years. Enhanced officer safety and accountability.',
        denied: 'Current cameras lose vendor support Jan 1, 2025. No cloud storage after Dec 31. Potential evidence gaps. Liability risk. Technology obsolescence. May face public criticism for outdated equipment.'
      },
      budgetImpact: {
        amount: 125000,
        category: 'Equipment & Technology',
        allocated: 550000,
        spent: 315000,
        percentUsed: 57,
        remainingAfter: 110000,
        quarterlyBreakdown: { Q1: 125000, Q2: 0, Q3: 0, Q4: 0 },
        fiveYearCost: 125000,
        annualMaintenance: 8500
      },
      aiRecommendation: {
        decision: 'approve',
        confidence: 88,
        reasoning: 'Current equipment end-of-life. Vendor support ending. Budget available. Critical for accountability and evidence. Technology upgrade enhances capabilities.',
        considerations: 'Consider negotiating extended payment terms or phased deployment to reduce Q1 impact.'
      },
      documents: ['Equipment_Proposal.pdf', 'Vendor_Comparison.pdf', 'Current_System_EOL_Notice.pdf', 'Cost_Benefit_Analysis.pdf'],
      relatedApprovals: []
    }
  ]);

  const [approvalHistory] = useState([
    {
      id: 'H001',
      type: 'budget',
      title: 'Budget Approval',
      submittedBy: 'Fleet Division',
      details: 'New patrol vehicles (3 units)',
      division: 'Patrol Division',
      amount: 180000,
      decision: 'approved',
      decidedBy: 'Sheriff Thompson',
      decidedDate: '2024-10-25',
      decisionNotes: 'Approved to maintain fleet standards',
      submittedDate: '2024-10-20',
      requestSnapshot: { vehicles: 3, type: 'Ford Explorer', urgency: 'high' }
    },
    {
      id: 'H002',
      type: 'leave',
      title: 'Leave Request',
      submittedBy: 'Sgt. Williams',
      details: 'Personal leave: Nov 1-7',
      division: 'Patrol Division',
      decision: 'approved',
      decidedBy: 'Captain Anderson',
      decidedDate: '2024-10-24',
      decisionNotes: 'Coverage arranged',
      submittedDate: '2024-10-18'
    },
    {
      id: 'H003',
      type: 'equipment',
      title: 'Equipment Purchase',
      submittedBy: 'SWAT Team',
      details: 'Tactical gear upgrade',
      division: 'Special Operations',
      amount: 85000,
      decision: 'denied',
      decidedBy: 'Sheriff Thompson',
      decidedDate: '2024-10-23',
      decisionNotes: 'Budget constraints - resubmit Q1 2025',
      submittedDate: '2024-10-15'
    },
    {
      id: 'H004',
      type: 'hiring',
      title: 'Hiring Decision',
      submittedBy: 'Robert Martinez',
      details: 'Deputy Sheriff Position',
      division: 'Patrol Division',
      decision: 'approved',
      decidedBy: 'Sheriff Thompson',
      decidedDate: '2024-10-22',
      decisionNotes: 'Strong candidate, excellent background',
      submittedDate: '2024-10-10'
    },
    {
      id: 'H005',
      type: 'budget',
      title: 'Budget Approval',
      submittedBy: 'IT Department',
      details: 'Server upgrade',
      division: 'Administrative Services',
      amount: 65000,
      decision: 'approved',
      decidedBy: 'Sheriff Thompson',
      decidedDate: '2024-10-21',
      decisionNotes: 'Critical infrastructure',
      submittedDate: '2024-10-12'
    }
  ]);

  const navigation = [
    { id: 'dashboard', label: 'Executive Dashboard', icon: Home, route: '/command/dashboard' },
    { id: 'detention', label: 'Detention Operations', icon: Building2, route: '/jail/dashboard' },
    { id: 'patrol', label: 'Patrol Operations', icon: Radio, route: '/patrol/cad' },
    { id: 'investigations', label: 'Criminal Investigations', icon: Target, route: '/investigations/cases' },
    { id: 'personnel', label: 'Personnel Overview', icon: Users, route: '/command/personnel' },
    { id: 'org-chart', label: 'Org Chart', icon: LayoutDashboard, route: '/command/orgchart' },
    { id: 'approvals', label: 'Approvals', icon: CheckCircle, badge: approvalsList.length.toString(), route: '/command/approvals' },
    { id: 'budget', label: 'Budget & Resources', icon: DollarSign, route: '/command/budget' },
    { id: 'reports', label: 'Reports & Analytics', icon: TrendingUp, route: '/command/reports' },
    { id: 'alerts', label: 'Command Alerts', icon: AlertCircle, badge: '3', route: '/command/alerts' },
    { id: 'settings', label: 'Settings', icon: Settings, route: '/command/settings' }
  ];

  const notifications = [
    { id: 1, title: '3 Certifications Expiring Soon', message: 'CPR, Firearms, and P.O.S.T. renewals needed', time: '10 min ago', urgent: true },
    { id: 2, title: 'Budget Approval Required', message: 'Q1 2025 Training Budget: $45,000', time: '1 hour ago', urgent: true },
    { id: 3, title: 'Leave Request Submitted', message: 'Deputy Marcus Chen - Dec 15-22', time: '2 hours ago', urgent: false },
  ];

  const budgetOverview = {
    pendingAmount: approvalsList.filter(a => a.amount).reduce((sum, a) => sum + a.amount, 0),
    approvedQ4: approvalHistory
      .filter(h => h.decision === 'approved' && h.amount && new Date(h.decidedDate) >= new Date('2024-10-01'))
      .reduce((sum, h) => sum + h.amount, 0),
    totalApprovedThisYear: 2450000,
    totalBudget: 3000000,
    byDivision: [
      { name: 'Patrol Division', approved: 520000, pending: 0, total: 680000 },
      { name: 'Administrative Services', approved: 380000, pending: 190000, total: 550000 },
      { name: 'Detention', approved: 420000, pending: 0, total: 480000 },
      { name: 'Investigations', approved: 285000, pending: 0, total: 350000 },
      { name: 'Training Division', approved: 180000, pending: 45000, total: 240000 },
      { name: 'Special Operations', approved: 210000, pending: 0, total: 290000 }
    ]
  };

  budgetOverview.remainingBudget = budgetOverview.totalBudget - budgetOverview.totalApprovedThisYear;
  budgetOverview.percentUsed = (budgetOverview.totalApprovedThisYear / budgetOverview.totalBudget) * 100;

  const handleNavigation = (item) => {
    navigate(item.route);
    setSidebarOpen(false);
  };

  const handleLogout = () => {
    navigate(createPageUrl('SignIn'));
  };

  const openApprovalModal = (approval, action) => {
    setSelectedApproval(approval);
    setApprovalAction(action);
    setActionComment('');
  };

  const closeApprovalModal = () => {
    setSelectedApproval(null);
    setApprovalAction(null);
    setActionComment('');
  };

  const confirmApprovalAction = () => {
    if (approvalAction === 'deny' && !actionComment.trim()) {
      showToast('Please provide a reason for denial', 'error');
      return;
    }

    setApprovalsList(approvalsList.filter(a => a.id !== selectedApproval.id));

    const actionText = approvalAction === 'approve' ? 'approved' : 'denied';
    showToast(`${selectedApproval.title} ${actionText} successfully`, 'success');

    closeApprovalModal();
  };

  const showToast = (message, type = 'success') => {
    setToastMessage({ message, type });
    setTimeout(() => setToastMessage(null), 3000);
  };

  const toggleSelectItem = (id) => {
    setSelectedItems(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedItems.length === filteredApprovals.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filteredApprovals.map(a => a.id));
    }
  };

  const bulkApprove = () => {
    if (selectedItems.length === 0) return;
    setApprovalsList(approvalsList.filter(a => !selectedItems.includes(a.id)));
    showToast(`${selectedItems.length} items approved successfully`, 'success');
    setSelectedItems([]);
  };

  const bulkDeny = () => {
    if (selectedItems.length === 0) return;
    setApprovalsList(approvalsList.filter(a => !selectedItems.includes(a.id)));
    showToast(`${selectedItems.length} items denied`, 'success');
    setSelectedItems([]);
  };

  const bulkRequestInfo = () => {
    if (selectedItems.length === 0) return;
    showToast(`Info requested for ${selectedItems.length} items`, 'success');
    setSelectedItems([]);
  };

  const toggleExpandCard = (id) => {
    setExpandedCards(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const openRequestInfoModal = (approval) => {
    setRequestInfoModal(approval);
    setInfoRequest('');
  };

  const closeRequestInfoModal = () => {
    setRequestInfoModal(null);
    setInfoRequest('');
  };

  const sendInfoRequest = () => {
    if (!infoRequest.trim()) {
      showToast('Please enter your information request', 'error');
      return;
    }
    showToast(`Information request sent to ${requestInfoModal.submittedBy}`, 'success');
    closeRequestInfoModal();
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'leave': return Calendar;
      case 'budget': return DollarSign;
      case 'hiring': return Users;
      case 'equipment': return FileText;
      default: return FileText;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'leave': return 'text-blue-400 bg-blue-500/20';
      case 'budget': return 'text-green-400 bg-green-500/20';
      case 'hiring': return 'text-purple-400 bg-purple-500/20';
      case 'equipment': return 'text-amber-400 bg-amber-500/20';
      default: return 'text-slate-400 bg-slate-500/20';
    }
  };

  const filteredApprovals = approvalsList
    .filter(approval => {
      if (filterType === 'all') return true;
      if (filterType === 'urgent') return approval.urgent;
      return approval.type === filterType;
    })
    .sort((a, b) => {
      if (sortBy === 'recent') return a.daysAgo - b.daysAgo;
      if (sortBy === 'oldest') return b.daysAgo - a.daysAgo;
      if (sortBy === 'priority') return (b.urgent ? 1 : 0) - (a.urgent ? 1 : 0);
      return 0;
    });

  const filteredHistory = activeTab === 'my-decisions'
    ? approvalHistory.filter(h => h.decidedBy === currentUser)
    : approvalHistory;

  const urgentCount = approvalsList.filter(a => a.urgent).length;

  const getBudgetStatusColor = (percent) => {
    if (percent >= 95) return 'red';
    if (percent >= 85) return 'amber';
    return 'green';
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
            const isActive = window.location.pathname === item.route;
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

      {/* Overlay for mobile */}
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
                  onClick={() => navigate(createPageUrl('CommandDashboard'))}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Dashboard
                </button>
                <ChevronRight className="w-4 h-4 text-slate-600" />
                <span className="text-white">Approvals</span>
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
                <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">ST</span>
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-white">Sheriff Thompson</p>
                  <p className="text-xs text-slate-400">Administrator</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-2xl lg:text-3xl font-bold text-white mb-2">Approvals Center</h2>
                  <p className="text-slate-400">Review and process pending requests</p>
                </div>
                <div className="flex items-center gap-3">
                  {activeTab === 'pending' && (
                    <>
                      <span className="px-4 py-2 bg-amber-500/20 border border-amber-500/30 rounded-xl text-amber-400 font-semibold">
                        {approvalsList.length} items
                      </span>
                      {urgentCount > 0 && (
                        <span className="px-3 py-1 bg-red-500/20 border border-red-500/30 rounded-full text-red-400 text-sm font-medium">
                          {urgentCount} urgent
                        </span>
                      )}
                    </>
                  )}
                  {(activeTab === 'history' || activeTab === 'my-decisions') && (
                    <button className="flex items-center gap-2 px-4 py-2 bg-slate-800/40 border border-slate-700/50 rounded-xl text-slate-300 hover:bg-slate-800/60 transition-all">
                      <Download className="w-4 h-4" />
                      Export PDF
                    </button>
                  )}
                </div>
              </div>

              <div className="flex gap-2 border-b border-slate-700/50">
                <button
                  onClick={() => setActiveTab('pending')}
                  className={`px-4 py-3 text-sm font-medium transition-all relative ${
                    activeTab === 'pending'
                      ? 'text-amber-400'
                      : 'text-slate-400 hover:text-slate-300'
                  }`}
                >
                  Pending
                  {activeTab === 'pending' && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500"></div>
                  )}
                </button>
                <button
                  onClick={() => setActiveTab('history')}
                  className={`px-4 py-3 text-sm font-medium transition-all relative ${
                    activeTab === 'history'
                      ? 'text-amber-400'
                      : 'text-slate-400 hover:text-slate-300'
                  }`}
                >
                  History
                  {activeTab === 'history' && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500"></div>
                  )}
                </button>
                <button
                  onClick={() => setActiveTab('my-decisions')}
                  className={`px-4 py-3 text-sm font-medium transition-all relative ${
                    activeTab === 'my-decisions'
                      ? 'text-amber-400'
                      : 'text-slate-400 hover:text-slate-300'
                  }`}
                >
                  My Decisions
                  {activeTab === 'my-decisions' && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500"></div>
                  )}
                </button>
              </div>
            </div>

            {/* AI Insights Banner */}
            {activeTab === 'pending' && (
              <div className="mb-6 bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-500/20 rounded-xl p-5">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-5 h-5 text-purple-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-bold text-white mb-3">AI Approval Insights</h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                      {/* Urgent Items */}
                      <div className="bg-slate-800/40 rounded-xl p-3 border border-slate-700/50">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-6 h-6 bg-red-500/20 rounded-lg flex items-center justify-center">
                            <AlertCircle className="w-3 h-3 text-red-400" />
                          </div>
                          <span className="text-xs font-semibold text-slate-300">Urgent Action Needed</span>
                        </div>
                        <div className="space-y-1.5">
                          <p className="text-[10px] text-red-400">• Budget approval ($45K) - Due today</p>
                          <p className="text-[10px] text-red-400">• Hiring decision - Offer expires in 3 days</p>
                          <p className="text-[10px] text-amber-400">• 2 items overdue - Review immediately</p>
                        </div>
                      </div>

                      {/* Recommendations */}
                      <div className="bg-slate-800/40 rounded-xl p-3 border border-slate-700/50">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-6 h-6 bg-green-500/20 rounded-lg flex items-center justify-center">
                            <CheckCircle className="w-3 h-3 text-green-400" />
                          </div>
                          <span className="text-xs font-semibold text-slate-300">AI Recommendations</span>
                        </div>
                        <div className="space-y-1.5">
                          <p className="text-[10px] text-green-400">✅ Equipment ($125K) - Recommend approve</p>
                          <p className="text-[10px] text-green-400">✅ Leave (Chen) - No staffing conflicts</p>
                          <p className="text-[10px] text-slate-400">Within budget, critical needs</p>
                        </div>
                      </div>

                      {/* Budget Impact */}
                      <div className="bg-slate-800/40 rounded-xl p-3 border border-slate-700/50">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-6 h-6 bg-blue-500/20 rounded-lg flex items-center justify-center">
                            <DollarSign className="w-3 h-3 text-blue-400" />
                          </div>
                          <span className="text-xs font-semibold text-slate-300">Budget Status</span>
                        </div>
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] text-slate-400">If all approved:</span>
                            <span className="text-[10px] font-bold text-blue-400">$415K</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] text-slate-400">Total budget used:</span>
                            <span className="text-[10px] font-bold text-green-400">75%</span>
                          </div>
                          <p className="text-[10px] text-green-400">✅ Healthy budget buffer</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <button className="px-3 py-1.5 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 text-blue-400 rounded-lg text-xs font-medium transition-all">
                        View Recommendations
                      </button>
                      <button className="px-3 py-1.5 bg-green-500/20 hover:bg-green-500/30 border border-green-500/30 text-green-400 rounded-lg text-xs font-medium transition-all">
                        Auto-Approve Safe Items
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="mb-6 bg-slate-800/40 border border-slate-700/50 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-green-400" />
                  Budget Overview & Forecast
                </h3>
                <button
                  onClick={() => setBudgetExpanded(!budgetExpanded)}
                  className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors"
                >
                  {budgetExpanded ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                </button>
              </div>

              {/* Main Budget Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-xs text-amber-400">Pending Approvals</p>
                    <AlertCircle className="w-4 h-4 text-amber-400" />
                  </div>
                  <p className="text-2xl font-bold text-white mb-1">${budgetOverview.pendingAmount.toLocaleString()}</p>
                  <p className="text-xs text-slate-400">4 items awaiting decision</p>
                </div>
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-xs text-green-400">Approved Q4 2024</p>
                    <TrendingUp className="w-4 h-4 text-green-400" />
                  </div>
                  <p className="text-2xl font-bold text-white mb-1">${budgetOverview.approvedQ4.toLocaleString()}</p>
                  <div className="flex items-center gap-1">
                    <ArrowUpCircle className="w-3 h-3 text-green-400" />
                    <p className="text-xs text-green-400">+12% vs Q3</p>
                  </div>
                </div>
                <div className={`border rounded-lg p-4 ${
                  getBudgetStatusColor(budgetOverview.percentUsed) === 'red' ? 'bg-red-500/10 border-red-500/20' :
                  getBudgetStatusColor(budgetOverview.percentUsed) === 'amber' ? 'bg-amber-500/10 border-amber-500/20' :
                  'bg-blue-500/10 border-blue-500/20'
                }`}>
                  <div className="flex items-center justify-between mb-1">
                    <p className={`text-xs ${
                      getBudgetStatusColor(budgetOverview.percentUsed) === 'red' ? 'text-red-400' :
                      getBudgetStatusColor(budgetOverview.percentUsed) === 'amber' ? 'text-amber-400' :
                      'text-blue-400'
                    }`}>Remaining FY24</p>
                    <DollarSign className={`w-4 h-4 ${
                      getBudgetStatusColor(budgetOverview.percentUsed) === 'red' ? 'text-red-400' :
                      getBudgetStatusColor(budgetOverview.percentUsed) === 'amber' ? 'text-amber-400' :
                      'text-blue-400'
                    }`} />
                  </div>
                  <p className="text-2xl font-bold text-white mb-1">${budgetOverview.remainingBudget.toLocaleString()}</p>
                  <p className={`text-xs ${
                    getBudgetStatusColor(budgetOverview.percentUsed) === 'red' ? 'text-red-400' :
                    getBudgetStatusColor(budgetOverview.percentUsed) === 'amber' ? 'text-amber-400' :
                    'text-green-400'
                  }`}>{budgetOverview.percentUsed.toFixed(1)}% utilized</p>
                </div>
                <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-xs text-purple-400">Q1 2025 Forecast</p>
                    <Sparkles className="w-4 h-4 text-purple-400" />
                  </div>
                  <p className="text-2xl font-bold text-white mb-1">$385K</p>
                  <p className="text-xs text-slate-400">Based on trends + pending</p>
                </div>
              </div>

              {/* Budget Utilization Bar */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-300">FY24 Budget Utilization</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400">
                      ${budgetOverview.totalApprovedThisYear.toLocaleString()} / ${budgetOverview.totalBudget.toLocaleString()}
                    </span>
                    <span className="text-sm font-bold text-white">{budgetOverview.percentUsed.toFixed(1)}%</span>
                  </div>
                </div>
                <div className="w-full h-3 bg-slate-700/50 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all ${
                      getBudgetStatusColor(budgetOverview.percentUsed) === 'red' ? 'bg-red-500' :
                      getBudgetStatusColor(budgetOverview.percentUsed) === 'amber' ? 'bg-amber-500' :
                      'bg-green-500'
                    }`}
                    style={{ width: `${budgetOverview.percentUsed}%` }}
                  />
                </div>
              </div>

              {/* Quarterly Breakdown */}
              {budgetExpanded && (
                <div className="mb-4 pb-4 border-b border-slate-700/50">
                  <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-blue-400" />
                    Quarterly Trends (FY24)
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                    <div className="bg-slate-900/50 rounded-lg p-3 border border-slate-700/30">
                      <p className="text-xs text-slate-400 mb-1">Q1 2024</p>
                      <p className="text-lg font-bold text-white mb-1">$580K</p>
                      <div className="flex items-center gap-1">
                        <div className="w-full h-1.5 bg-slate-700/50 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-500" style={{ width: '92%' }}></div>
                        </div>
                        <span className="text-xs text-slate-400 whitespace-nowrap">92%</span>
                      </div>
                    </div>
                    <div className="bg-slate-900/50 rounded-lg p-3 border border-slate-700/30">
                      <p className="text-xs text-slate-400 mb-1">Q2 2024</p>
                      <p className="text-lg font-bold text-white mb-1">$625K</p>
                      <div className="flex items-center gap-1">
                        <div className="w-full h-1.5 bg-slate-700/50 rounded-full overflow-hidden">
                          <div className="h-full bg-green-500" style={{ width: '88%' }}></div>
                        </div>
                        <span className="text-xs text-slate-400 whitespace-nowrap">88%</span>
                      </div>
                    </div>
                    <div className="bg-slate-900/50 rounded-lg p-3 border border-slate-700/30">
                      <p className="text-xs text-slate-400 mb-1">Q3 2024</p>
                      <p className="text-lg font-bold text-white mb-1">$445K</p>
                      <div className="flex items-center gap-1">
                        <div className="w-full h-1.5 bg-slate-700/50 rounded-full overflow-hidden">
                          <div className="h-full bg-amber-500" style={{ width: '71%' }}></div>
                        </div>
                        <span className="text-xs text-slate-400 whitespace-nowrap">71%</span>
                      </div>
                    </div>
                    <div className="bg-slate-900/50 rounded-lg p-3 border border-slate-700/30">
                      <p className="text-xs text-slate-400 mb-1">Q4 2024</p>
                      <p className="text-lg font-bold text-white mb-1">$500K</p>
                      <div className="flex items-center gap-1">
                        <div className="w-full h-1.5 bg-slate-700/50 rounded-full overflow-hidden">
                          <div className="h-full bg-green-500" style={{ width: '83%' }}></div>
                        </div>
                        <span className="text-xs text-slate-400 whitespace-nowrap">83%</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 bg-purple-500/5 border border-purple-500/20 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="w-4 h-4 text-purple-400" />
                      <span className="text-xs font-semibold text-purple-400">Q1 2025 Forecast</span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      <div>
                        <p className="text-[10px] text-slate-400 mb-0.5">Predicted Spend</p>
                        <p className="text-sm font-bold text-white">$385K</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-400 mb-0.5">Confidence</p>
                        <p className="text-sm font-bold text-green-400">87%</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-400 mb-0.5">vs Q4 2024</p>
                        <div className="flex items-center gap-1">
                          <TrendingDown className="w-3 h-3 text-red-400" />
                          <p className="text-sm font-bold text-red-400">-23%</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-400 mb-0.5">Baseline + Pending</p>
                        <p className="text-sm font-bold text-white">$340K + $45K</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {budgetExpanded && (
                <div className="pt-4 border-t border-slate-700/50 space-y-3">
                  <h4 className="text-sm font-semibold text-white mb-3">By Division</h4>
                  {budgetOverview.byDivision.map((div, idx) => {
                    const divPercent = (div.approved / div.total) * 100;
                    return (
                      <div key={idx}>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex-1">
                            <span className="text-sm text-slate-300">{div.name}</span>
                            <p className="text-xs text-slate-500">
                              ${div.approved.toLocaleString()} / ${div.total.toLocaleString()}
                              {div.pending > 0 && <span className="text-amber-400 ml-2">(${div.pending.toLocaleString()} pending)</span>}
                            </p>
                          </div>
                          <span className={`text-sm font-bold ${
                            divPercent >= 95 ? 'text-red-400' : divPercent >= 85 ? 'text-amber-400' : 'text-green-400'
                          }`}>{divPercent.toFixed(0)}%</span>
                        </div>
                        <div className="w-full h-2 bg-slate-700/50 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${
                              divPercent >= 95 ? 'bg-red-500' : divPercent >= 85 ? 'bg-amber-500' : 'bg-green-500'
                            }`}
                            style={{ width: `${divPercent}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {activeTab === 'pending' && (
              <>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-6">
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setFilterType('all')}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        filterType === 'all' ? 'bg-amber-500 text-white' : 'bg-slate-800/40 text-slate-300 hover:bg-slate-800/60'
                      }`}
                    >
                      All
                    </button>
                    <button
                      onClick={() => setFilterType('urgent')}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        filterType === 'urgent' ? 'bg-amber-500 text-white' : 'bg-slate-800/40 text-slate-300 hover:bg-slate-800/60'
                      }`}
                    >
                      Urgent
                    </button>
                    <button
                      onClick={() => setFilterType('leave')}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        filterType === 'leave' ? 'bg-amber-500 text-white' : 'bg-slate-800/40 text-slate-300 hover:bg-slate-800/60'
                      }`}
                    >
                      Leave Requests
                    </button>
                    <button
                      onClick={() => setFilterType('budget')}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        filterType === 'budget' ? 'bg-amber-500 text-white' : 'bg-slate-800/40 text-slate-300 hover:bg-slate-800/60'
                      }`}
                    >
                      Budget
                    </button>
                    <button
                      onClick={() => setFilterType('hiring')}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        filterType === 'hiring' ? 'bg-amber-500 text-white' : 'bg-slate-800/40 text-slate-300 hover:bg-slate-800/60'
                      }`}
                    >
                      Hiring
                    </button>
                    <button
                      onClick={() => setFilterType('equipment')}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        filterType === 'equipment' ? 'bg-amber-500 text-white' : 'bg-slate-800/40 text-slate-300 hover:bg-slate-800/60'
                      }`}
                    >
                      Equipment
                    </button>
                  </div>

                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-2 bg-slate-800/40 border border-slate-700/50 rounded-lg text-white text-sm focus:outline-none focus:border-amber-500/50 cursor-pointer"
                  >
                    <option value="recent">Most Recent</option>
                    <option value="oldest">Oldest First</option>
                    <option value="priority">By Priority</option>
                  </select>
                </div>

                {/* Bulk Actions Toolbar */}
                {selectedItems.length > 0 && (
                  <div className="mb-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-xl p-4">
                    <div className="flex items-center justify-between flex-wrap gap-3">
                      <div className="flex items-center gap-3">
                        <CheckSquare className="w-5 h-5 text-blue-400" />
                        <span className="text-sm font-semibold text-white">
                          {selectedItems.length} item{selectedItems.length !== 1 ? 's' : ''} selected
                        </span>
                      </div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <button
                          onClick={bulkApprove}
                          className="px-4 py-2 bg-green-500/20 border border-green-500/30 hover:bg-green-500/30 text-green-400 rounded-lg text-sm font-medium transition-all flex items-center gap-2"
                        >
                          <ThumbsUp className="w-4 h-4" />
                          Approve All
                        </button>
                        <button
                          onClick={bulkDeny}
                          className="px-4 py-2 bg-red-500/20 border border-red-500/30 hover:bg-red-500/30 text-red-400 rounded-lg text-sm font-medium transition-all flex items-center gap-2"
                        >
                          <XCircle className="w-4 h-4" />
                          Deny All
                        </button>
                        <button
                          onClick={bulkRequestInfo}
                          className="px-4 py-2 bg-blue-500/20 border border-blue-500/30 hover:bg-blue-500/30 text-blue-400 rounded-lg text-sm font-medium transition-all flex items-center gap-2"
                        >
                          <Info className="w-4 h-4" />
                          Request Info
                        </button>
                        <button
                          onClick={() => setSelectedItems([])}
                          className="px-4 py-2 bg-slate-700/40 border border-slate-600/50 hover:bg-slate-700/60 text-slate-300 rounded-lg text-sm font-medium transition-all"
                        >
                          Clear
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {filteredApprovals.length === 0 ? (
                  <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-12 text-center">
                    <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">All caught up!</h3>
                    <p className="text-slate-400">No pending approvals at this time.</p>
                  </div>
                ) : (
                  <>
                    {/* Select All Checkbox */}
                    <div className="mb-3 flex items-center gap-2 px-2">
                      <button
                        onClick={toggleSelectAll}
                        className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
                      >
                        {selectedItems.length === filteredApprovals.length ? (
                          <CheckSquare className="w-4 h-4 text-blue-400" />
                        ) : (
                          <Square className="w-4 h-4" />
                        )}
                        <span>Select all</span>
                      </button>
                    </div>

                    <div className="space-y-4">
                      {filteredApprovals.map((approval) => {
                        const TypeIcon = getTypeIcon(approval.type);
                        const typeColor = getTypeColor(approval.type);
                        const isExpanded = expandedCards.includes(approval.id);
                        const isSelected = selectedItems.includes(approval.id);

                        return (
                          <div
                            key={approval.id}
                            className={`bg-slate-800/40 border rounded-xl transition-all ${
                              approval.urgent ? 'border-amber-500/40 bg-amber-500/5' :
                              isSelected ? 'border-blue-500/50 bg-blue-500/5' :
                              'border-slate-700/50'
                            } ${isExpanded ? 'p-6' : 'p-5'}`}
                          >
                            {/* Card Header */}
                            <div className="flex items-start gap-4 mb-4">
                              {/* Checkbox */}
                              <button
                                onClick={() => toggleSelectItem(approval.id)}
                                className="mt-1 flex-shrink-0"
                              >
                                {isSelected ? (
                                  <CheckSquare className="w-5 h-5 text-blue-400" />
                                ) : (
                                  <Square className="w-5 h-5 text-slate-500 hover:text-slate-400 transition-colors" />
                                )}
                              </button>

                              {/* Type Icon */}
                              <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${typeColor}`}>
                                <TypeIcon className="w-6 h-6" />
                              </div>

                              {/* Main Content */}
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-3 mb-3">
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                                      <h3 className="text-lg font-semibold text-white">{approval.title}</h3>
                                      {approval.urgent && (
                                        <span className="px-2 py-0.5 bg-amber-500/20 border border-amber-500/30 rounded text-xs text-amber-400 font-bold">
                                          URGENT
                                        </span>
                                      )}
                                    </div>
                                    <p className="text-sm text-slate-300 mb-2">
                                      <span className="font-medium">{approval.submittedBy}</span> • {approval.details}
                                    </p>
                                    <div className="flex items-center gap-4 text-xs text-slate-400 flex-wrap">
                                      <span className="flex items-center gap-1">
                                        <FileText className="w-3 h-3" />
                                        {approval.division}
                                      </span>
                                      <span className="flex items-center gap-1">
                                        <Clock className="w-3 h-3" />
                                        {approval.daysAgo} days ago
                                      </span>
                                      {approval.amount && (
                                        <span className="flex items-center gap-1 text-green-400 font-semibold">
                                          <DollarSign className="w-3 h-3" />
                                          {approval.amount.toLocaleString()}
                                        </span>
                                      )}
                                      {approval.documents && (
                                        <span className="flex items-center gap-1">
                                          <FileCheck className="w-3 h-3" />
                                          {approval.documents.length} documents
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                </div>

                                {/* AI Recommendation Badge */}
                                {approval.aiRecommendation && (
                                  <div className={`mb-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border ${
                                    approval.aiRecommendation.decision === 'approve'
                                      ? 'bg-green-500/10 border-green-500/30'
                                      : 'bg-red-500/10 border-red-500/30'
                                  }`}>
                                    <Sparkles className={`w-4 h-4 ${
                                      approval.aiRecommendation.decision === 'approve' ? 'text-green-400' : 'text-red-400'
                                    }`} />
                                    <span className={`text-xs font-bold ${
                                      approval.aiRecommendation.decision === 'approve' ? 'text-green-400' : 'text-red-400'
                                    }`}>
                                      AI Recommends: {approval.aiRecommendation.decision.toUpperCase()}
                                    </span>
                                    <span className="text-xs text-slate-400">
                                      ({approval.aiRecommendation.confidence}% confidence)
                                    </span>
                                  </div>
                                )}

                                {/* Justification Preview */}
                                <div className="bg-slate-900/50 rounded-lg p-3 mb-3 border border-slate-700/30">
                                  <p className="text-xs text-slate-400 mb-1 font-semibold">Justification</p>
                                  <p className="text-sm text-slate-300 leading-relaxed">
                                    {isExpanded ? approval.justification : `${approval.justification.substring(0, 120)}...`}
                                  </p>
                                </div>

                                {/* Expanded Details */}
                                {isExpanded && (
                                  <div className="space-y-3 mb-4">
                                    {/* Impact Analysis */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                      <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-3">
                                        <div className="flex items-center gap-2 mb-2">
                                          <ThumbsUp className="w-4 h-4 text-green-400" />
                                          <span className="text-xs font-bold text-green-400">IF APPROVED</span>
                                        </div>
                                        <p className="text-xs text-slate-300 leading-relaxed">{approval.impact.approved}</p>
                                      </div>
                                      <div className="bg-red-500/5 border border-red-500/20 rounded-lg p-3">
                                        <div className="flex items-center gap-2 mb-2">
                                          <TrendingDown className="w-4 h-4 text-red-400" />
                                          <span className="text-xs font-bold text-red-400">IF DENIED</span>
                                        </div>
                                        <p className="text-xs text-slate-300 leading-relaxed">{approval.impact.denied}</p>
                                      </div>
                                    </div>

                                    {/* Budget Impact Details */}
                                    {approval.budgetImpact && (
                                      <div className="bg-blue-500/5 border border-blue-500/20 rounded-lg p-3">
                                        <div className="flex items-center gap-2 mb-3">
                                          <DollarSign className="w-4 h-4 text-blue-400" />
                                          <span className="text-xs font-bold text-blue-400">BUDGET IMPACT</span>
                                        </div>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                          <div>
                                            <p className="text-[10px] text-slate-400 mb-1">Category</p>
                                            <p className="text-xs font-semibold text-white">{approval.budgetImpact.category}</p>
                                          </div>
                                          <div>
                                            <p className="text-[10px] text-slate-400 mb-1">Allocated</p>
                                            <p className="text-xs font-semibold text-white">${approval.budgetImpact.allocated?.toLocaleString()}</p>
                                          </div>
                                          <div>
                                            <p className="text-[10px] text-slate-400 mb-1">Spent</p>
                                            <p className="text-xs font-semibold text-white">${approval.budgetImpact.spent?.toLocaleString()}</p>
                                          </div>
                                          <div>
                                            <p className="text-[10px] text-slate-400 mb-1">% Used</p>
                                            <p className={`text-xs font-semibold ${
                                              approval.budgetImpact.percentUsed >= 90 ? 'text-red-400' :
                                              approval.budgetImpact.percentUsed >= 75 ? 'text-amber-400' :
                                              'text-green-400'
                                            }`}>{approval.budgetImpact.percentUsed}%</p>
                                          </div>
                                        </div>
                                      </div>
                                    )}

                                    {/* AI Recommendation Details */}
                                    {approval.aiRecommendation && (
                                      <div className="bg-purple-500/5 border border-purple-500/20 rounded-lg p-3">
                                        <div className="flex items-center gap-2 mb-2">
                                          <Sparkles className="w-4 h-4 text-purple-400" />
                                          <span className="text-xs font-bold text-purple-400">AI ANALYSIS</span>
                                        </div>
                                        <p className="text-xs text-slate-300 mb-2 leading-relaxed">{approval.aiRecommendation.reasoning}</p>
                                        {approval.aiRecommendation.urgencyNote && (
                                          <div className="flex items-start gap-2 mt-2 pt-2 border-t border-purple-500/10">
                                            <AlertCircle className="w-3 h-3 text-amber-400 mt-0.5 flex-shrink-0" />
                                            <p className="text-xs text-amber-400">{approval.aiRecommendation.urgencyNote}</p>
                                          </div>
                                        )}
                                        {approval.aiRecommendation.considerations && (
                                          <div className="flex items-start gap-2 mt-2 pt-2 border-t border-purple-500/10">
                                            <Info className="w-3 h-3 text-blue-400 mt-0.5 flex-shrink-0" />
                                            <p className="text-xs text-blue-400">{approval.aiRecommendation.considerations}</p>
                                          </div>
                                        )}
                                      </div>
                                    )}

                                    {/* Supporting Documents */}
                                    {approval.documents && approval.documents.length > 0 && (
                                      <div className="bg-slate-900/50 border border-slate-700/30 rounded-lg p-3">
                                        <div className="flex items-center gap-2 mb-2">
                                          <FileCheck className="w-4 h-4 text-slate-400" />
                                          <span className="text-xs font-bold text-slate-300">SUPPORTING DOCUMENTS</span>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                          {approval.documents.map((doc, idx) => (
                                            <button
                                              key={idx}
                                              className="flex items-center gap-1 px-2 py-1 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-600/30 rounded text-xs text-blue-400 transition-all"
                                            >
                                              <FileText className="w-3 h-3" />
                                              {doc}
                                            </button>
                                          ))}
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                )}

                                {/* Action Buttons */}
                                <div className="flex items-center gap-2 flex-wrap">
                                  <button
                                    onClick={() => toggleExpandCard(approval.id)}
                                    className="px-3 py-1.5 bg-slate-700/40 hover:bg-slate-700/60 border border-slate-600/50 rounded-lg text-xs text-slate-300 font-medium transition-all flex items-center gap-1"
                                  >
                                    {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                                    {isExpanded ? 'Show Less' : 'Show Full Details'}
                                  </button>
                                  <button
                                    onClick={() => openRequestInfoModal(approval)}
                                    className="px-3 py-1.5 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 rounded-lg text-xs text-blue-400 font-medium transition-all flex items-center gap-1"
                                  >
                                    <Info className="w-3 h-3" />
                                    Request More Info
                                  </button>
                                  <div className="flex-1"></div>
                                  <button
                                    onClick={() => openApprovalModal(approval, 'approve')}
                                    className="px-4 py-2 bg-green-500/20 border border-green-500/30 hover:bg-green-500/30 rounded-lg transition-all group flex items-center gap-2"
                                  >
                                    <ThumbsUp className="w-4 h-4 text-green-400 group-hover:scale-110 transition-transform" />
                                    <span className="text-sm font-medium text-green-400">Approve</span>
                                  </button>
                                  <button
                                    onClick={() => openApprovalModal(approval, 'deny')}
                                    className="px-4 py-2 bg-red-500/20 border border-red-500/30 hover:bg-red-500/30 rounded-lg transition-all group flex items-center gap-2"
                                  >
                                    <XCircle className="w-4 h-4 text-red-400 group-hover:scale-110 transition-transform" />
                                    <span className="text-sm font-medium text-red-400">Deny</span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </>
                )}
              </>
            )}

            {(activeTab === 'history' || activeTab === 'my-decisions') && (
              <>
                <div className="mb-4 flex flex-col sm:flex-row gap-3">
                  <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                    <input
                      type="text"
                      placeholder="Search history..."
                      className="w-full pl-12 pr-4 py-2.5 bg-slate-800/40 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50"
                    />
                  </div>
                  <select className="px-4 py-2.5 bg-slate-800/40 border border-slate-700/50 rounded-xl text-white text-sm focus:outline-none focus:border-amber-500/50 cursor-pointer">
                    <option>All Types</option>
                    <option>Leave</option>
                    <option>Budget</option>
                    <option>Hiring</option>
                    <option>Equipment</option>
                  </select>
                </div>

                <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-slate-900/50 border-b border-slate-700/50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Type</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Submitted By</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Division</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Amount</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Decision</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Decided By</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Date</th>
                          <th className="px-4 py-3 text-right text-xs font-semibold text-slate-400 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredHistory.map((item) => {
                          const TypeIcon = getTypeIcon(item.type);
                          return (
                            <tr key={item.id} className="border-b border-slate-800/30 hover:bg-slate-800/30 transition-colors">
                              <td className="px-4 py-4">
                                <div className="flex items-center gap-2">
                                  <TypeIcon className="w-4 h-4 text-slate-400" />
                                  <span className="text-sm text-slate-300 capitalize">{item.type}</span>
                                </div>
                              </td>
                              <td className="px-4 py-4">
                                <p className="text-sm text-slate-300">{item.submittedBy}</p>
                                <p className="text-xs text-slate-500">{item.details}</p>
                              </td>
                              <td className="px-4 py-4">
                                <p className="text-sm text-slate-300">{item.division}</p>
                              </td>
                              <td className="px-4 py-4">
                                {item.amount ? (
                                  <p className="text-sm font-mono text-green-400">${item.amount.toLocaleString()}</p>
                                ) : (
                                  <p className="text-sm text-slate-500">-</p>
                                )}
                              </td>
                              <td className="px-4 py-4">
                                <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-bold ${
                                  item.decision === 'approved'
                                    ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                                    : 'bg-red-500/20 text-red-400 border border-red-500/30'
                                }`}>
                                  {item.decision === 'approved' ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                                  {item.decision.toUpperCase()}
                                </span>
                              </td>
                              <td className="px-4 py-4">
                                <p className="text-sm text-slate-300">{item.decidedBy}</p>
                              </td>
                              <td className="px-4 py-4">
                                <p className="text-sm text-slate-300">{new Date(item.decidedDate).toLocaleDateString()}</p>
                              </td>
                              <td className="px-4 py-4 text-right">
                                <button
                                  onClick={() => setHistoryDetailModal(item)}
                                  className="inline-flex items-center gap-1 px-3 py-1.5 text-sm text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 rounded-lg transition-all"
                                >
                                  <Eye className="w-4 h-4" />
                                  View
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}
          </div>
        </main>
      </div>

      {selectedApproval && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={closeApprovalModal}
          />
          <div className="relative bg-slate-900 border border-slate-700/50 rounded-2xl p-6 max-w-md w-full shadow-2xl">
            <div className="flex items-start gap-4 mb-6">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                approvalAction === 'approve' ? 'bg-green-500/20' : 'bg-red-500/20'
              }`}>
                {approvalAction === 'approve' ? (
                  <ThumbsUp className="w-6 h-6 text-green-400" />
                ) : (
                  <XCircle className="w-6 h-6 text-red-400" />
                )}
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-1">
                  {approvalAction === 'approve' ? 'Approve' : 'Deny'} {selectedApproval.title}?
                </h3>
                <p className="text-sm text-slate-400">
                  {selectedApproval.submittedBy} • {selectedApproval.details}
                </p>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-300 mb-2">
                {approvalAction === 'approve' ? 'Comments (optional)' : 'Reason for denial (required)'}
              </label>
              <textarea
                value={actionComment}
                onChange={(e) => setActionComment(e.target.value)}
                placeholder={approvalAction === 'approve' ? 'Add any comments...' : 'Please provide a reason...'}
                rows={4}
                className="w-full px-4 py-3 bg-slate-800/40 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50 resize-none"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={closeApprovalModal}
                className="flex-1 px-4 py-3 bg-slate-800/40 hover:bg-slate-800/60 border border-slate-700/50 rounded-xl text-white font-medium transition-all"
              >
                Cancel
              </button>
              <button
                onClick={confirmApprovalAction}
                className={`flex-1 px-4 py-3 rounded-xl text-white font-medium transition-all ${
                  approvalAction === 'approve'
                    ? 'bg-green-500 hover:bg-green-600'
                    : 'bg-red-500 hover:bg-red-600'
                }`}
              >
                Confirm {approvalAction === 'approve' ? 'Approval' : 'Denial'}
              </button>
            </div>
          </div>
        </div>
      )}

      {historyDetailModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setHistoryDetailModal(null)}
          />
          <div className="relative bg-slate-900 border border-slate-700/50 rounded-2xl p-6 max-w-2xl w-full shadow-2xl max-h-[80vh] overflow-y-auto">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-white mb-1">{historyDetailModal.title}</h3>
                <p className="text-sm text-slate-400">{historyDetailModal.details}</p>
              </div>
              <button
                onClick={() => setHistoryDetailModal(null)}
                className="p-2 hover:bg-slate-800/50 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-800/40 rounded-xl p-4 border border-slate-700/50">
                  <p className="text-xs text-slate-400 mb-1">Submitted By</p>
                  <p className="text-sm font-medium text-white">{historyDetailModal.submittedBy}</p>
                </div>
                <div className="bg-slate-800/40 rounded-xl p-4 border border-slate-700/50">
                  <p className="text-xs text-slate-400 mb-1">Division</p>
                  <p className="text-sm font-medium text-white">{historyDetailModal.division}</p>
                </div>
                {historyDetailModal.amount && (
                  <div className="bg-slate-800/40 rounded-xl p-4 border border-slate-700/50">
                    <p className="text-xs text-slate-400 mb-1">Amount</p>
                    <p className="text-sm font-medium text-green-400">${historyDetailModal.amount.toLocaleString()}</p>
                  </div>
                )}
                <div className="bg-slate-800/40 rounded-xl p-4 border border-slate-700/50">
                  <p className="text-xs text-slate-400 mb-1">Submitted Date</p>
                  <p className="text-sm font-medium text-white">{new Date(historyDetailModal.submittedDate).toLocaleDateString()}</p>
                </div>
              </div>

              <div className={`p-4 rounded-xl border ${
                historyDetailModal.decision === 'approved'
                  ? 'bg-green-500/10 border-green-500/30'
                  : 'bg-red-500/10 border-red-500/30'
              }`}>
                <div className="flex items-center justify-between mb-3">
                  <span className={`inline-flex items-center gap-2 px-3 py-1 rounded text-sm font-bold ${
                    historyDetailModal.decision === 'approved'
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-red-500/20 text-red-400'
                  }`}>
                    {historyDetailModal.decision === 'approved' ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                    {historyDetailModal.decision.toUpperCase()}
                  </span>
                  <div className="text-right">
                    <p className="text-sm text-slate-300">{historyDetailModal.decidedBy}</p>
                    <p className="text-xs text-slate-500">{new Date(historyDetailModal.decidedDate).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="bg-slate-900/50 rounded-lg p-3">
                  <p className="text-xs text-slate-400 mb-1">Decision Notes</p>
                  <p className="text-sm text-slate-200">{historyDetailModal.decisionNotes}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {requestInfoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={closeRequestInfoModal}
          />
          <div className="relative bg-slate-900 border border-slate-700/50 rounded-2xl p-6 max-w-lg w-full shadow-2xl">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <Info className="w-6 h-6 text-blue-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-1">Request More Information</h3>
                <p className="text-sm text-slate-400">
                  {requestInfoModal.submittedBy} • {requestInfoModal.title}
                </p>
              </div>
              <button
                onClick={closeRequestInfoModal}
                className="p-2 hover:bg-slate-800/50 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-300 mb-2">
                What additional information do you need?
              </label>
              <textarea
                value={infoRequest}
                onChange={(e) => setInfoRequest(e.target.value)}
                placeholder="Example: Please provide detailed cost breakdown and vendor comparison..."
                rows={6}
                className="w-full px-4 py-3 bg-slate-800/40 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 resize-none"
              />
              <p className="text-xs text-slate-500 mt-2">
                The requester will receive an email notification and can respond directly.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={closeRequestInfoModal}
                className="flex-1 px-4 py-3 bg-slate-800/40 hover:bg-slate-800/60 border border-slate-700/50 rounded-xl text-white font-medium transition-all"
              >
                Cancel
              </button>
              <button
                onClick={sendInfoRequest}
                className="flex-1 px-4 py-3 bg-blue-500 hover:bg-blue-600 rounded-xl text-white font-medium transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                Send Request
              </button>
            </div>
          </div>
        </div>
      )}

      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-slide-up">
          <div className={`px-6 py-4 rounded-xl border shadow-2xl flex items-center gap-3 ${
            toastMessage.type === 'success'
              ? 'bg-green-500/20 border-green-500/30 text-green-400'
              : 'bg-red-500/20 border-red-500/30 text-red-400'
          }`}>
            {toastMessage.type === 'success' ? (
              <CheckCircle className="w-5 h-5" />
            ) : (
              <AlertCircle className="w-5 h-5" />
            )}
            <p className="font-medium">{toastMessage.message}</p>
          </div>
        </div>
      )}

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
                <h3 className="text-sm font-semibold text-white">Approvals AI Assistant</h3>
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
                  <p className="text-sm text-slate-200">Hi! I can help you review approval requests, provide context on budget items, check personnel availability, and answer questions about pending requests. What do you need?</p>
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 border-t border-slate-700/50">
            <div className="flex items-center gap-2">
              <input type="text" placeholder="Ask about approvals..." className="flex-1 px-4 py-2 bg-slate-800/40 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50" />
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

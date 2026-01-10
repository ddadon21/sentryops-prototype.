import React, { useState, useEffect } from 'react';
import { Home, Users, FileText, Award, LayoutDashboard, TrendingUp, AlertCircle, Settings, Bell, MessageCircle, Search, ChevronRight, DollarSign, CheckCircle, Clock, Shield, ThumbsUp, XCircle, Sparkles, X, Send, Menu, ChevronLeft, LogOut, Building2, Radio, Target, Download, Zap, TrendingDown, ArrowRight, Eye, FileCheck, AlertTriangle, Calendar, User, Filter, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import DashboardLayout from '../layouts/DashboardLayout';

export default function CommandDashboard() {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState('dashboard');
  const [chatOpen, setChatOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [selectedApproval, setSelectedApproval] = useState(null);
  const [approvalAction, setApprovalAction] = useState(null);
  const [actionComment, setActionComment] = useState('');
  const [toastMessage, setToastMessage] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [aiInsightsVisible, setAiInsightsVisible] = useState(true);
  const [approvalFilter, setApprovalFilter] = useState('all'); // all, urgent, normal

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
  };

  // Calculate time pending
  const getTimePending = (minutesAgo) => {
    if (minutesAgo < 60) return `${minutesAgo} min`;
    if (minutesAgo < 1440) return `${Math.floor(minutesAgo / 60)} hours`;
    return `${Math.floor(minutesAgo / 1440)} days`;
  };

  // Approval items with full data including time pending and submitter
  const dashboardApprovals = [
    {
      id: 1,
      type: 'Use of Force Review',
      name: 'Deputy Johnson, Marcus #D-4167',
      details: 'B-Pod incident - OC spray deployment on inmate MARTINEZ',
      urgent: true,
      priority: 'URGENT',
      division: 'Detention Division',
      title: 'Use of Force Review',
      context: 'Inmate refused direct orders, took fighting stance. OC spray deployed. Full restraint applied. Medical evaluation completed - no injuries. Body cam footage available.',
      submittedBy: 'Shift Supervisor Williams',
      timePendingMinutes: 15,
      deadline: '24 hours',
      impact: 'Compliance deadline',
      status: 'under_review'
    },
    {
      id: 2,
      type: 'Emergency Purchase',
      name: 'Detention - Major Wilson',
      details: 'H2-Pod HVAC Repairs',
      urgent: true,
      priority: 'URGENT',
      division: 'Detention Facilities',
      title: 'Emergency Purchase Order',
      amount: 23500,
      context: 'Critical HVAC failure in H2-Pod. Temperature at 84°F. Immediate repair required to maintain ACA accreditation standards.',
      submittedBy: 'Facilities Director Chen',
      timePendingMinutes: 120,
      deadline: 'Immediate',
      impact: 'Temperature 84°F, ACA compliance risk',
      budgetLine: 'Facilities Maintenance'
    },
    {
      id: 3,
      type: 'Overtime Authorization',
      name: 'Patrol Division - Capt. Rodriguez',
      details: 'B-Shift Staffing Shortage - 160 hours @ $52/hr',
      urgent: true,
      priority: 'URGENT',
      division: 'Patrol Division',
      title: 'Overtime Authorization',
      amount: 8320,
      context: '3 deputies out (2 FMLA, 1 Workers Comp). Minimum staffing requires 12 road deputies. Requesting OT authorization for next 2 weeks.',
      submittedBy: 'Capt. Rodriguez',
      timePendingMinutes: 90,
      deadline: '48 hours',
      impact: 'Below minimum staffing',
      budgetLine: 'Patrol Overtime'
    },
    {
      id: 4,
      type: 'Vehicle Replacement',
      name: 'Fleet Management - Anderson',
      details: 'Patrol Unit 247 - Total Loss (Pursuit Damage)',
      urgent: true,
      priority: 'URGENT',
      division: 'Support Services',
      title: 'Emergency Vehicle Replacement',
      amount: 48500,
      context: 'Unit 247 totaled in pursuit. Insurance claim filed. Immediate replacement needed - patrol fleet at minimum operational capacity.',
      submittedBy: 'Fleet Manager Anderson',
      timePendingMinutes: 240,
      deadline: '72 hours',
      impact: 'Fleet at minimum capacity',
      budgetLine: 'Capital Equipment'
    },
    {
      id: 5,
      type: 'Hiring Decision',
      name: 'Rodriguez, Elena M.',
      details: 'Certified Correctional Officer - Detention Division',
      urgent: false,
      priority: 'HIGH',
      division: 'Detention Division',
      title: 'Hiring Decision',
      context: 'Background investigation complete. 5 years experience. All certifications current. Detention at 94% staffing - approval needed to extend offer.',
      submittedBy: 'HR Director Thompson',
      timePendingMinutes: 1440,
      deadline: '5 days',
      impact: 'Position vacant 45 days'
    },
    {
      id: 6,
      type: 'Policy Exception',
      name: 'Lt. Anderson - Investigations',
      details: 'Extended Surveillance - Narcotics Case #2024-1847',
      urgent: false,
      priority: 'NORMAL',
      division: 'Investigations',
      title: 'Policy Exception Request',
      context: 'Multi-agency narcotics investigation. DEA requesting 30-day extension for surveillance operations. Additional overtime estimated $12,000.',
      submittedBy: 'Lt. Anderson',
      timePendingMinutes: 2880,
      deadline: '7 days',
      amount: 12000,
      budgetLine: 'Investigations OT'
    },
    {
      id: 7,
      type: 'Leave Request',
      name: 'Deputy Chen, Michael #D-4521',
      details: 'FMLA - Medical Leave: Dec 15 - Jan 5',
      urgent: false,
      priority: 'NORMAL',
      division: 'Detention Division',
      title: 'FMLA Leave Request',
      context: 'Approved medical procedure. FMLA documentation complete. Coverage plan submitted by Sgt. Williams.',
      submittedBy: 'Deputy Chen',
      timePendingMinutes: 720,
      deadline: '10 days'
    },
    {
      id: 8,
      type: 'Training Authorization',
      name: 'Detention - Sgt. Williams',
      details: 'Crisis Intervention Team Training - 8 Deputies',
      urgent: false,
      priority: 'NORMAL',
      division: 'Training Division',
      title: 'Training Authorization',
      amount: 6400,
      context: '40-hour CIT certification. Addresses mental health incidents in detention. Grant funding available for 50% reimbursement.',
      submittedBy: 'Training Coordinator Smith',
      timePendingMinutes: 4320,
      deadline: '14 days',
      budgetLine: 'Training & Development'
    }
  ];

  const filteredApprovals = approvalFilter === 'all' ? dashboardApprovals :
    approvalFilter === 'urgent' ? dashboardApprovals.filter(a => a.urgent) :
    dashboardApprovals.filter(a => !a.urgent);

  const urgentCount = dashboardApprovals.filter(a => a.urgent).length;

  const notifications = [
    { id: 1, title: 'Critical Incident - Detention', message: 'Use of force incident in B-Pod. Deputy Johnson. Inmate restrained. Medical cleared. Review required.', time: '15 min ago', urgent: true },
    { id: 2, title: 'Facility Alert - H2-Pod HVAC Failure', message: 'Temperature 84°F in federal detainee housing. Emergency repair approval needed. ACA compliance risk.', time: '32 min ago', urgent: true },
    { id: 3, title: 'Staffing Emergency - B-Shift Patrol', message: '3 deputies out (FMLA/WC). Below minimum staffing. Overtime authorization requested.', time: '1 hour ago', urgent: true },
    { id: 4, title: 'Vehicle Totaled - Unit 247', message: 'Pursuit resulted in total loss. No injuries. Insurance claim filed. Replacement approval needed.', time: '2 hours ago', urgent: true },
    { id: 5, title: 'Inmate Medical Transport', message: 'Inmate Anderson transported to Gwinnett Medical - chest pain. Deputy Martinez on hospital guard.', time: '3 hours ago', urgent: false },
    { id: 6, title: 'Jail Capacity Warning', message: 'Current population 842/920 (91.5%). H2-Pod over capacity using emergency beds.', time: '4 hours ago', urgent: false },
    { id: 7, title: 'Certifications Expiring - Detention', message: '12 corrections officers require CPR/First Aid renewal within 30 days. Training scheduled.', time: '5 hours ago', urgent: false },
    { id: 8, title: 'Federal Audit Notification', message: 'U.S. Marshals Service facility inspection scheduled Dec 12-14. H-Pod federal housing review.', time: '6 hours ago', urgent: false },
    { id: 9, title: 'Contraband Discovered - D-Pod', message: 'Cell phone found during routine search. Inmate in administrative segregation. Investigation ongoing.', time: '7 hours ago', urgent: false },
    { id: 10, title: 'Court Transport Schedule', message: 'Tomorrow: 31 inmates scheduled for transport across 5 court sessions. All deputies assigned.', time: '8 hours ago', urgent: false }
  ];

  const openApprovalModal = (approval, action, e) => {
    e.stopPropagation();
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

    const actionText = approvalAction === 'approve' ? 'approved' : 'denied';
    showToast(`${selectedApproval.title} ${actionText} successfully`, 'success');

    closeApprovalModal();
  };

  const showToast = (message, type = 'success') => {
    setToastMessage({ message, type });
    setTimeout(() => setToastMessage(null), 3000);
  };

  const approveAllUrgent = () => {
    showToast(`${urgentCount} urgent approvals processed`, 'success');
  };

  return (
    <DashboardLayout>
      <main className="flex-1 overflow-y-auto p-4 lg:p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl lg:text-3xl font-bold text-white mb-2">Good morning, Sheriff Thompson</h2>
            <div className="flex items-center gap-3 text-slate-400">
              <span>Executive Command Dashboard</span>
              <span className="text-slate-600">•</span>
              <span className="text-amber-400 font-medium">{formatTime(currentTime)} EST</span>
              <span className="text-slate-600">•</span>
              <span className="text-xs text-slate-500">Updated 2 min ago</span>
            </div>
          </div>

          {/* Quick Actions Bar */}
          <div className="hidden lg:flex items-center gap-2">
            <button
              onClick={approveAllUrgent}
              className="flex items-center gap-2 px-4 py-2 bg-green-500/20 border border-green-500/30 text-green-400 rounded-xl text-sm font-medium hover:bg-green-500/30 transition-all"
            >
              <CheckCircle className="w-4 h-4" />
              Approve All Urgent ({urgentCount})
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-red-500/20 border border-red-500/30 text-red-400 rounded-xl text-sm font-medium hover:bg-red-500/30 transition-all">
              <AlertCircle className="w-4 h-4" />
              Send Alert
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-500/20 border border-blue-500/30 text-blue-400 rounded-xl text-sm font-medium hover:bg-blue-500/30 transition-all">
              <Download className="w-4 h-4" />
              Daily Report
            </button>
            <button
              onClick={() => navigate(createPageUrl('ReportsAnalytics'))}
              className="flex items-center gap-2 px-4 py-2 bg-slate-700/40 border border-slate-600/50 text-slate-300 rounded-xl text-sm font-medium hover:bg-slate-700/60 transition-all"
            >
              <Eye className="w-4 h-4" />
              All Metrics
            </button>
          </div>
        </div>

        {/* AI Insights Banner */}
        {aiInsightsVisible && (
          <div className="mb-6 bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-500/20 rounded-xl p-5">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-6 h-6 text-purple-400" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-base font-semibold text-white">AI Insights & Recommendations</h4>
                  <button
                    onClick={() => setAiInsightsVisible(false)}
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-slate-300"><span className="text-red-400 font-semibold">Critical:</span> B-Shift staffing at 75% (9/12 deputies) - recommend approving 6 hours OT immediately to maintain minimum coverage</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-slate-300"><span className="text-amber-400 font-semibold">Budget Alert:</span> Overtime tracking 19% over budget ($78K/$65K) - consider authorizing 2 new patrol hires vs. continued OT spend</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-slate-300"><span className="text-amber-400 font-semibold">Compliance:</span> Federal audit in 2 days - 3 action items pending (H-Pod HVAC, 2 policy reviews). Recommend immediate approval of emergency repairs.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-slate-300"><span className="text-blue-400 font-semibold">Opportunity:</span> CIT training has 50% grant reimbursement available - approve now to reduce net cost from $6,400 to $3,200</p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-purple-500/20">
                  <button className="text-sm text-purple-400 hover:text-purple-300 font-medium">
                    View Detailed Analysis →
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Executive Summary */}
        <div className="mb-6 bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/20 rounded-xl p-5">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <TrendingUp className="w-6 h-6 text-blue-400" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-base font-semibold text-white">Executive Summary</h4>
                <span className="text-xs text-slate-400">Updated 2 min ago</span>
              </div>

              {/* Urgent Section */}
              <div className="mb-4 pb-4 border-b border-blue-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <h5 className="text-sm font-semibold text-red-400">URGENT (Action Required)</h5>
                </div>
                <div className="space-y-1.5 text-sm">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                    <p className="text-slate-300"><span className="font-semibold text-red-400">4 approvals overdue</span> - Use of force review, HVAC emergency ($23.5K), B-Shift OT ($8.3K), vehicle replacement ($48.5K)</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Users className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                    <p className="text-slate-300"><span className="font-semibold text-red-400">B-Shift 20% understaffed</span> - 3 deputies out (2 FMLA, 1 WC) - minimum staffing compromised</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Building2 className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                    <p className="text-slate-300"><span className="font-semibold text-red-400">H2-Pod over capacity</span> - 36/32 inmates - using emergency beds</p>
                  </div>
                </div>
              </div>

              {/* Monitoring Section */}
              <div className="mb-4 pb-4 border-b border-blue-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                  <h5 className="text-sm font-semibold text-amber-400">MONITORING</h5>
                </div>
                <div className="space-y-1.5 text-sm">
                  <div className="flex items-start gap-2">
                    <Shield className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                    <p className="text-slate-300"><span className="font-semibold text-amber-400">Federal audit Dec 12-14</span> - U.S. Marshals H-Pod inspection - 47 databases ready, 3 policies pending</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <TrendingUp className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                    <p className="text-slate-300"><span className="font-semibold text-amber-400">18 bookings today</span>, 14 releases - net population +4 - trending toward 95% capacity</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Calendar className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                    <p className="text-slate-300"><span className="font-semibold text-amber-400">31 court transports tomorrow</span> - 5 sessions across Superior, State, Magistrate courts</p>
                  </div>
                </div>
              </div>

              {/* Operational Status */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <h5 className="text-sm font-semibold text-green-400">OPERATIONAL STATUS</h5>
                </div>
                <div className="space-y-1.5 text-sm">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <p className="text-slate-300"><span className="font-semibold text-green-400">Jail at 91.5% capacity</span> - 842/920 inmates - within normal operating parameters</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Radio className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <p className="text-slate-300"><span className="font-semibold text-green-400">1 hospital guard active</span> - Inmate Anderson at Gwinnett Medical - chest pain evaluation</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Zap className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <p className="text-slate-300"><span className="font-semibold text-green-400">All critical systems online</span> - CAD, RMS, SmartJAIL, radio network operational</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Key Metrics with Trends */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6">
          {[
            {
              label: 'Total Personnel',
              value: '164',
              sublabel: '178 authorized',
              icon: Users,
              color: 'blue',
              clickable: true,
              route: 'PersonnelOverview',
              trend: 'down',
              trendValue: '↓ 14 vacant',
              comparison: 'vs. 178 authorized',
              status: 'warning'
            },
            {
              label: 'On Duty Now',
              value: '87',
              sublabel: '53% of authorized',
              icon: CheckCircle,
              color: 'green',
              clickable: true,
              route: 'PersonnelOverview',
              trend: 'up',
              trendValue: '↑ 2 vs. yesterday',
              comparison: 'B-Shift: UNDERSTAFFED',
              status: 'warning'
            },
            {
              label: 'Pending Approvals',
              value: '8',
              sublabel: `${urgentCount} urgent`,
              icon: Clock,
              color: 'amber',
              clickable: true,
              route: 'Approvals',
              trend: 'up',
              trendValue: '↑ 3 today',
              comparison: 'Avg: 5 per day',
              status: 'critical'
            },
            {
              label: 'Budget Status',
              value: '85%',
              sublabel: 'YTD utilization',
              icon: DollarSign,
              color: 'green',
              clickable: true,
              route: 'BudgetResources',
              trend: 'neutral',
              trendValue: '→ On track',
              comparison: 'OT: 119% of budget',
              status: 'good'
            }
          ].map((stat, idx) => {
            const Icon = stat.icon;
            const statusColors = {
              good: 'border-green-500/30',
              warning: 'border-amber-500/30',
              critical: 'border-red-500/30'
            };
            return (
              <button
                key={idx}
                onClick={() => stat.clickable && navigate(createPageUrl(stat.route))}
                className={`bg-slate-800/40 border ${statusColors[stat.status] || 'border-slate-700/50'} rounded-xl p-6 hover:border-slate-600/50 transition-all text-left group`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    stat.color === 'blue' ? 'bg-blue-500/20' :
                    stat.color === 'amber' ? 'bg-amber-500/20' : 'bg-green-500/20'
                  }`}>
                    <Icon className={`w-6 h-6 ${
                      stat.color === 'blue' ? 'text-blue-400' :
                      stat.color === 'amber' ? 'text-amber-400' : 'text-green-400'
                    }`} />
                  </div>
                  <ChevronRight className={`w-5 h-5 text-slate-400 group-hover:text-amber-400 transition-all ${stat.clickable ? 'group-hover:translate-x-1' : ''}`} />
                </div>
                <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
                <p className="text-sm text-slate-400 mb-2">{stat.label}</p>
                <p className="text-xs text-slate-500 mb-2">{stat.sublabel}</p>
                <div className="flex items-center justify-between pt-2 border-t border-slate-700/30">
                  <span className={`text-xs font-medium ${
                    stat.trend === 'up' ? 'text-green-400' :
                    stat.trend === 'down' ? 'text-red-400' : 'text-slate-400'
                  }`}>{stat.trendValue}</span>
                  <span className="text-xs text-slate-500">{stat.comparison}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Enhanced Pending Approvals with Filters */}
        <div className="mb-6 bg-slate-800/40 border border-slate-700/50 rounded-xl p-4 lg:p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Pending Approvals</h3>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-700/40 border border-slate-600/50 rounded-lg">
                <Filter className="w-4 h-4 text-slate-400" />
                <select
                  value={approvalFilter}
                  onChange={(e) => setApprovalFilter(e.target.value)}
                  className="bg-transparent text-sm text-slate-300 focus:outline-none cursor-pointer"
                >
                  <option value="all">All ({dashboardApprovals.length})</option>
                  <option value="urgent">Urgent ({urgentCount})</option>
                  <option value="normal">Normal ({dashboardApprovals.length - urgentCount})</option>
                </select>
              </div>
              <button
                onClick={() => navigate(createPageUrl('Approvals'))}
                className="text-sm text-amber-400 hover:text-amber-300 underline"
              >
                View all
              </button>
            </div>
          </div>
          <div className="space-y-3">
            {filteredApprovals.slice(0, 6).map((item) => (
              <div
                key={item.id}
                onClick={() => navigate(createPageUrl('Approvals'))}
                className={`flex items-center justify-between gap-4 p-4 rounded-lg border cursor-pointer transition-all hover:scale-[1.01] ${
                  item.urgent ? 'bg-amber-500/10 border-amber-500/30 hover:bg-amber-500/15' : 'bg-slate-900/50 border-slate-700/30 hover:bg-slate-800/50'
                }`}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <p className="text-sm font-medium text-white">{item.type}</p>
                    {item.urgent && <span className="px-2 py-0.5 bg-red-500/20 border border-red-500/30 rounded text-xs text-red-400 font-bold">URGENT</span>}
                    <span className="px-2 py-0.5 bg-slate-700/40 rounded text-xs text-slate-400">Pending {getTimePending(item.timePendingMinutes)}</span>
                  </div>
                  <p className="text-xs text-slate-400 mb-2">{item.name} • {item.details}</p>
                  <div className="flex items-center gap-4 flex-wrap text-xs">
                    {item.amount && (
                      <span className="text-green-400 font-semibold flex items-center gap-1">
                        <DollarSign className="w-3 h-3" />
                        ${item.amount.toLocaleString()}
                      </span>
                    )}
                    <span className="text-slate-500 flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {item.submittedBy}
                    </span>
                    {item.impact && (
                      <span className="text-amber-400 flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" />
                        {item.impact}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={(e) => openApprovalModal(item, 'approve', e)}
                    className="p-2 bg-green-500/20 border border-green-500/30 hover:bg-green-500/30 rounded-lg transition-all"
                    title="Approve"
                  >
                    <ThumbsUp className="w-4 h-4 text-green-400" />
                  </button>
                  <button
                    onClick={(e) => openApprovalModal(item, 'deny', e)}
                    className="p-2 bg-red-500/20 border border-red-500/30 hover:bg-red-500/30 rounded-lg transition-all"
                    title="Deny"
                  >
                    <XCircle className="w-4 h-4 text-red-400" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Staffing by Division */}
        <div className="mb-6 bg-slate-800/40 border border-slate-700/50 rounded-xl p-4 lg:p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Staffing by Division</h3>
          <div className="space-y-4">
            {[
              { division: 'Patrol', current: 56, target: 65, percentage: 86, trend: 'down', status: 'warning' },
              { division: 'Investigations', current: 22, target: 25, percentage: 88, trend: 'neutral', status: 'warning' },
              { division: 'Detention', current: 45, target: 48, percentage: 94, trend: 'up', status: 'good' },
              { division: 'Support Services', current: 28, target: 30, percentage: 93, trend: 'neutral', status: 'good' }
            ].map((div, idx) => (
              <div key={idx}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-white">{div.division}</span>
                    <div className={`w-2 h-2 rounded-full ${
                      div.status === 'good' ? 'bg-green-500' :
                      div.status === 'warning' ? 'bg-amber-500' : 'bg-red-500'
                    }`}></div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-xs font-medium ${
                      div.trend === 'up' ? 'text-green-400' :
                      div.trend === 'down' ? 'text-red-400' : 'text-slate-400'
                    }`}>
                      {div.trend === 'up' ? '↑' : div.trend === 'down' ? '↓' : '→'}
                    </span>
                    <span className="text-sm text-slate-400">{div.current}/{div.target}</span>
                    <span className={`text-sm font-bold ${
                      div.percentage >= 90 ? 'text-green-400' : 'text-amber-400'
                    }`}>{div.percentage}%</span>
                  </div>
                </div>
                <div className="w-full h-2 bg-slate-700/50 rounded-full overflow-hidden">
                  <div className={`h-full ${div.percentage >= 90 ? 'bg-green-500' : 'bg-amber-500'}`} style={{ width: `${div.percentage}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Detention Center Real-Time Operations */}
        <div className="mb-6 bg-gradient-to-br from-red-500/10 to-red-600/5 border border-red-500/20 rounded-xl p-4 lg:p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-white">Gwinnett County Detention Center - Live Status</h3>
            <button
              onClick={() => navigate('/jail/dashboard')}
              className="text-sm text-amber-400 hover:text-amber-300 underline flex items-center gap-1"
            >
              Full Jail Dashboard <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Capacity Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-slate-900/50 border border-slate-700/50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="text-xs text-slate-400">Current Population</div>
                <Users className="w-4 h-4 text-red-400" />
              </div>
              <div className="text-2xl font-bold text-white mb-1">842 / 920</div>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-slate-700 rounded-full h-2">
                  <div className="bg-red-500 h-2 rounded-full" style={{ width: '91.5%' }} />
                </div>
                <span className="text-xs font-bold text-red-400">91.5%</span>
              </div>
            </div>

            <div className="bg-slate-900/50 border border-slate-700/50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="text-xs text-slate-400">Today's Activity</div>
                <TrendingUp className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-sm space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-300">Bookings:</span>
                  <span className="text-white font-bold">18</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-300">Releases:</span>
                  <span className="text-white font-bold">14</span>
                </div>
                <div className="flex justify-between border-t border-slate-700 pt-1">
                  <span className="text-slate-400 text-xs">Net Change:</span>
                  <span className="text-amber-400 font-bold text-xs">+4</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/50 border border-slate-700/50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="text-xs text-slate-400">Critical Alerts</div>
                <AlertCircle className="w-4 h-4 text-red-400" />
              </div>
              <div className="space-y-2">
                <div className="text-sm">
                  <span className="text-red-400 font-bold">H2-Pod:</span>
                  <span className="text-slate-300 text-xs ml-1">Over capacity (36/32)</span>
                </div>
                <div className="text-sm">
                  <span className="text-amber-400 font-bold">HVAC:</span>
                  <span className="text-slate-300 text-xs ml-1">84°F - Emergency repair</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/50 border border-slate-700/50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="text-xs text-slate-400">Medical/Transport</div>
                <Award className="w-4 h-4 text-purple-400" />
              </div>
              <div className="space-y-2">
                <div className="text-sm">
                  <span className="text-purple-400 font-bold">Hospital Guards:</span>
                  <span className="text-white ml-1">1</span>
                </div>
                <div className="text-sm">
                  <span className="text-blue-400 font-bold">Court Tomorrow:</span>
                  <span className="text-white ml-1">31 inmates</span>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Critical Detention Incidents with Status */}
          <div className="bg-slate-900/50 border border-red-500/30 rounded-lg p-4 mb-4">
            <h4 className="text-sm font-semibold text-red-400 mb-3 flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              Critical Incidents Requiring Command Attention
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="bg-slate-800/50 border border-red-500/20 rounded p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-red-500/20 text-red-400 text-xs font-bold rounded">USE OF FORCE</span>
                    <span className="px-2 py-0.5 bg-amber-500/20 text-amber-400 text-xs font-bold rounded">UNDER REVIEW</span>
                  </div>
                  <span className="text-xs text-slate-400">15 min ago</span>
                </div>
                <div className="text-sm text-white font-medium mb-1">B-Pod - Deputy Johnson</div>
                <div className="text-xs text-slate-400 mb-3">OC spray on inmate MARTINEZ. Medical cleared. Body cam footage available.</div>
                <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-700/30">
                  <span className="text-slate-500">Assigned to: IA Supervisor Williams</span>
                  <span className="text-red-400 font-semibold">Due: 8 hours</span>
                </div>
                <div className="mt-2 flex gap-2">
                  <button className="flex-1 px-2 py-1 bg-blue-500/20 border border-blue-500/30 text-blue-400 rounded text-xs hover:bg-blue-500/30">
                    View Details
                  </button>
                  <button className="flex-1 px-2 py-1 bg-slate-700/40 border border-slate-600/50 text-slate-300 rounded text-xs hover:bg-slate-700/60">
                    Request Footage
                  </button>
                </div>
              </div>
              <div className="bg-slate-800/50 border border-purple-500/20 rounded p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-purple-500/20 text-purple-400 text-xs font-bold rounded">MEDICAL EMERGENCY</span>
                    <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 text-xs font-bold rounded">IN PROGRESS</span>
                  </div>
                  <span className="text-xs text-slate-400">3 hours ago</span>
                </div>
                <div className="text-sm text-white font-medium mb-1">C-Pod - Inmate Anderson</div>
                <div className="text-xs text-slate-400 mb-3">Chest pain, transported to Gwinnett Medical. Deputy Martinez on hospital guard.</div>
                <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-700/30">
                  <span className="text-slate-500">Assigned to: Deputy Martinez</span>
                  <span className="text-purple-400 font-semibold">ETA: Pending eval</span>
                </div>
                <div className="mt-2 flex gap-2">
                  <button className="flex-1 px-2 py-1 bg-purple-500/20 border border-purple-500/30 text-purple-400 rounded text-xs hover:bg-purple-500/30">
                    Status Update
                  </button>
                  <button className="flex-1 px-2 py-1 bg-slate-700/40 border border-slate-600/50 text-slate-300 rounded text-xs hover:bg-slate-700/60">
                    Contact Deputy
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Housing Unit Status - Quick View */}
          <div className="bg-slate-900/50 border border-slate-700/50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-semibold text-white">Housing Capacity by Pod</h4>
              <button
                onClick={() => navigate('/jail/dashboard')}
                className="text-xs text-amber-400 hover:text-amber-300"
              >
                View All 16 Pods →
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
              {[
                { pod: 'A-Pod', current: 94, capacity: 96, status: 'near' },
                { pod: 'B-Pod', current: 61, capacity: 64, status: 'normal' },
                { pod: 'E-Pod (Medical)', current: 44, capacity: 48, status: 'near' },
                { pod: 'H2-Pod (ICE)', current: 36, capacity: 32, status: 'over' },
                { pod: 'D-Pod (Female)', current: 73, capacity: 80, status: 'normal' },
                { pod: 'F-Pod (Intake)', current: 52, capacity: 64, status: 'normal' },
                { pod: 'G-Pod (Juvenile)', current: 18, capacity: 24, status: 'normal' },
                { pod: 'H-Pod (Federal)', current: 47, capacity: 48, status: 'near' }
              ].map((unit, idx) => (
                <div key={idx} className={`p-2 rounded border ${
                  unit.status === 'over' ? 'bg-red-500/10 border-red-500/30' :
                  unit.status === 'near' ? 'bg-amber-500/10 border-amber-500/30' :
                  'bg-slate-800/50 border-slate-700/30'
                }`}>
                  <div className="font-medium text-white mb-1">{unit.pod}</div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">{unit.current}/{unit.capacity}</span>
                    <span className={`font-bold ${
                      unit.status === 'over' ? 'text-red-400' :
                      unit.status === 'near' ? 'text-amber-400' :
                      'text-emerald-400'
                    }`}>{Math.round((unit.current / unit.capacity) * 100)}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Patrol Operations Status */}
        <div className="mb-6 bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/20 rounded-xl p-4 lg:p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-white">Patrol Division - Operational Status</h3>
            <div className="text-xs text-slate-400">Updated 2 min ago</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="bg-slate-900/50 border border-slate-700/50 rounded-lg p-4">
              <div className="text-xs text-slate-400 mb-2">Units Deployed</div>
              <div className="flex items-center gap-3">
                <div className="text-3xl font-bold text-white">12</div>
                <div className="flex-1">
                  <div className="text-xs text-slate-400 mb-1">Available: 3</div>
                  <div className="text-xs text-emerald-400 flex items-center gap-1">
                    <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
                    Coverage: Good
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/50 border border-slate-700/50 rounded-lg p-4">
              <div className="text-xs text-slate-400 mb-2">Active Calls</div>
              <div className="flex items-center gap-3">
                <div className="text-3xl font-bold text-amber-400">8</div>
                <div className="flex-1">
                  <div className="text-xs text-slate-400 mb-1">Priority 1: 1</div>
                  <div className="text-xs text-amber-400">Priority 2: 3</div>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/50 border border-slate-700/50 rounded-lg p-4">
              <div className="text-xs text-slate-400 mb-2">Shift Status</div>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-300">A-Shift (Day):</span>
                  <span className="text-emerald-400 flex items-center gap-1">
                    <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
                    15/15
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-300">B-Shift (Eve):</span>
                  <span className="text-red-400 flex items-center gap-1">
                    <span className="w-2 h-2 bg-red-400 rounded-full"></span>
                    9/12
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-900/50 border border-amber-500/20 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-amber-400 mb-3">Current Priority Calls</h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2 bg-slate-800/50 rounded border border-red-500/20">
                <div className="flex items-center gap-3">
                  <span className="px-2 py-0.5 bg-red-500/20 text-red-400 font-bold rounded">P1</span>
                  <div>
                    <div className="text-white font-medium">Domestic Violence - Weapons Involved</div>
                    <div className="text-slate-400">4720 Lawrenceville Hwy • Unit 247, 251 responding</div>
                  </div>
                </div>
                <div className="text-slate-400">3 min</div>
              </div>
              <div className="flex items-center justify-between p-2 bg-slate-800/50 rounded">
                <div className="flex items-center gap-3">
                  <span className="px-2 py-0.5 bg-amber-500/20 text-amber-400 font-bold rounded">P2</span>
                  <div>
                    <div className="text-white font-medium">Suspicious Person - Business District</div>
                    <div className="text-slate-400">2100 Pleasant Hill Rd • Unit 239</div>
                  </div>
                </div>
                <div className="text-slate-400">12 min</div>
              </div>
            </div>
          </div>
        </div>

        {/* Investigations Division Status */}
        <div className="mb-6 bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-500/20 rounded-xl p-4 lg:p-6">
          <h3 className="text-xl font-bold text-white mb-4">Investigations Division</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-900/50 border border-slate-700/50 rounded-lg p-4">
              <div className="text-xs text-slate-400 mb-2">Active Cases</div>
              <div className="text-3xl font-bold text-white mb-2">47</div>
              <div className="text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-400">Homicide:</span>
                  <span className="text-red-400 font-semibold">2</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Robbery:</span>
                  <span className="text-amber-400 font-semibold">8</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Narcotics:</span>
                  <span className="text-purple-400 font-semibold">12</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/50 border border-purple-500/20 rounded-lg p-4">
              <div className="text-xs text-purple-400 mb-2 font-semibold">Multi-Agency Operations</div>
              <div className="text-sm text-white font-medium mb-2">DEA Task Force - Case #2024-1847</div>
              <div className="text-xs text-slate-400">30-day surveillance extension requested. Lt. Anderson lead investigator. Additional OT: $12K estimated.</div>
            </div>

            <div className="bg-slate-900/50 border border-slate-700/50 rounded-lg p-4">
              <div className="text-xs text-slate-400 mb-2">Time-Sensitive</div>
              <div className="text-sm space-y-2">
                <div>
                  <div className="text-white font-medium">Warrant Service</div>
                  <div className="text-xs text-amber-400">3 high-priority warrants pending</div>
                </div>
                <div>
                  <div className="text-white font-medium">Court Deadlines</div>
                  <div className="text-xs text-red-400">2 cases - evidence due 48hrs</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Federal Compliance with Progress Bars */}
        <div className="bg-gradient-to-br from-amber-500/10 to-amber-600/5 border border-amber-500/20 rounded-xl p-4 lg:p-6">
          <h3 className="text-xl font-bold text-white mb-4">Federal Compliance & Upcoming Audits</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-900/50 border border-amber-500/20 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <Shield className="w-5 h-5 text-amber-400" />
                <div className="text-sm font-semibold text-amber-400">U.S. Marshals Service Inspection</div>
              </div>
              <div className="space-y-3 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Scheduled:</span>
                  <span className="text-white font-semibold">Dec 12-14, 2024 (2 days)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Scope:</span>
                  <span className="text-white">H-Pod Federal Housing</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Current Population:</span>
                  <span className="text-amber-400 font-semibold">47 federal detainees</span>
                </div>

                <div className="pt-3 border-t border-slate-700">
                  <div className="text-white font-medium mb-2">Readiness Status:</div>

                  <div className="space-y-2">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-slate-400">Databases:</span>
                        <span className="text-green-400 font-semibold">47/47 (100%)</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-700 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500" style={{width: '100%'}} />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-slate-400">Policies:</span>
                        <span className="text-amber-400 font-semibold">44/47 (94%)</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-700 rounded-full overflow-hidden">
                        <div className="h-full bg-amber-500" style={{width: '94%'}} />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-slate-400">Training Records:</span>
                        <span className="text-amber-400 font-semibold">156/164 (95%)</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-700 rounded-full overflow-hidden">
                        <div className="h-full bg-amber-500" style={{width: '95%'}} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-slate-700">
                  <div className="text-red-400 font-medium mb-1">Action Required:</div>
                  <ul className="text-slate-300 space-y-1 ml-4">
                    <li className="list-disc">3 policies pending final review (Due Dec 11)</li>
                    <li className="list-disc">8 deputies need recertification</li>
                  </ul>
                  <div className="mt-2 text-slate-500">POC: Major Anderson (Detention)</div>
                </div>

                <div className="flex gap-2">
                  <button className="flex-1 px-3 py-1.5 bg-blue-500/20 border border-blue-500/30 text-blue-400 rounded text-xs hover:bg-blue-500/30">
                    View Checklist
                  </button>
                  <button className="flex-1 px-3 py-1.5 bg-slate-700/40 border border-slate-600/50 text-slate-300 rounded text-xs hover:bg-slate-700/60">
                    Download Report
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/50 border border-slate-700/50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <Award className="w-5 h-5 text-blue-400" />
                <div className="text-sm font-semibold text-blue-400">ACA Re-Accreditation Status</div>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Current Status:</span>
                  <span className="text-emerald-400 font-semibold flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" />
                    Accredited
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Expires:</span>
                  <span className="text-white">August 2025</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Compliance Issues:</span>
                  <span className="text-red-400 font-semibold">1 - HVAC H2-Pod</span>
                </div>
                <div className="mt-3 pt-3 border-t border-slate-700">
                  <div className="text-red-400 font-medium">Critical:</div>
                  <div className="text-slate-300 mt-1">H2-Pod HVAC failure must be resolved within 72 hours for ACA compliance. Emergency repair approval pending.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Approval/Deny Modal */}
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
                  {selectedApproval.name} • {selectedApproval.details}
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

      {/* Toast Notification */}
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

      {/* AI Chat Widget */}
      <button
        onClick={() => setChatOpen(!chatOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110 z-50"
      >
        {chatOpen ? <X className="w-6 h-6 text-white" /> : <MessageCircle className="w-6 h-6 text-white" />}
        {!chatOpen && <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-slate-900 animate-pulse"></span>}
      </button>

      {/* AI Chat Panel */}
      {chatOpen && (
        <div className="fixed bottom-24 right-6 w-full max-w-96 h-[500px] bg-slate-900/95 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl flex flex-col z-40 mx-4 sm:mx-0">
          <div className="p-4 border-b border-slate-700/50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">Command AI Assistant</h3>
                <p className="text-xs text-green-400">Online</p>
              </div>
            </div>
          </div>
          <div className="flex-1 p-4 overflow-y-auto">
            <div className="flex gap-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <div className="bg-slate-800/60 p-3 rounded-xl">
                  <p className="text-sm text-slate-200">Hi Sheriff! I can help with executive insights, approval workflows, staffing analysis, budget reports, and more. What do you need?</p>
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 border-t border-slate-700/50">
            <div className="flex items-center gap-2">
              <input type="text" placeholder="Ask about command operations..." className="flex-1 px-4 py-2 bg-slate-800/40 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50" />
              <button className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
                <Send className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

import React, { useState } from 'react';
import { Users, FileText, AlertCircle, Search, DollarSign, CheckCircle, ThumbsUp, XCircle, Sparkles, X, Send, Calendar, Clock, Download, Eye, ChevronDown, ChevronUp, Building2, Info, FileCheck, CheckSquare, Square, Package } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';

export default function Approvals() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('pending');
  const [selectedApproval, setSelectedApproval] = useState(null);
  const [approvalAction, setApprovalAction] = useState(null);
  const [actionComment, setActionComment] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [toastMessage, setToastMessage] = useState(null);
  const [historyDetailModal, setHistoryDetailModal] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [expandedCards, setExpandedCards] = useState([]);
  const [requestInfoModal, setRequestInfoModal] = useState(null);
  const [infoRequest, setInfoRequest] = useState('');
  const [aiSummaryExpanded, setAiSummaryExpanded] = useState(false);

  const currentUser = 'Sheriff Thompson';

  const [approvalsList, setApprovalsList] = useState([
    {
      id: 1,
      type: 'leave',
      title: 'Leave Request',
      submittedBy: 'Deputy Marcus Chen (#4103)',
      submittedByTitle: 'Deputy Sheriff',
      details: 'Annual leave Dec 15-22 (8 days, 64 hours)',
      division: 'Patrol Division - A Shift',
      urgent: false,
      submittedDate: '2024-11-01',
      daysAgo: 3,
      leaveBalance: 120,
      justification: 'Pre-planned annual leave for family vacation (Disney World, Orlando). Deputy Chen has 120 hours accrued leave (max allowable: 200 hours). Shift coverage confirmed: Deputy Rodriguez (#4087) covers Dec 15-18, Deputy Williams (#4028) covers Dec 19-22. No operational conflicts. Chen\'s zone 3 patrol assignment covered by existing A-Shift overlap. Last vacation taken: July 2024.',
      impact: {
        approved: 'Patrol staffing at 92% during leave period. Deputy Rodriguez (#4087) and Williams (#4028) covering shifts with existing OT authorization. Morale boost from approved PTO.',
        denied: 'Deputy Chen may need to reschedule family plans (non-refundable deposits at risk). Potential morale impact. Next available leave window is February 2025.'
      },
      aiRecommendation: {
        decision: 'approve',
        confidence: 95,
        reasoning: 'Sufficient leave balance (120 hrs), adequate shift coverage confirmed, no conflicts detected with current schedule. Strong attendance record (98% in 2024).'
      },
      documents: ['Leave_Request_Form.pdf', 'Coverage_Plan.pdf'],
      relatedApprovals: []
    },
    {
      id: 2,
      type: 'budget',
      title: 'Budget Approval',
      submittedBy: 'Training Director Martinez (#TR-005)',
      submittedByTitle: 'Training Director',
      details: 'Q1 2025 Training Budget ($43,000)',
      division: 'Training Division',
      urgent: true,
      amount: 43000,
      submittedDate: '2024-11-02',
      daysAgo: 2,
      approvalDeadline: '1700 hrs today',
      justification: 'Mandatory P.O.S.T. recertifications for 23 deputies (deadline: March 31, 2025). State mandate requires completion for deputies to maintain peace officer status. Breakdown: Firearms qualification ($18K), Defensive tactics ($14K), Legal updates ($8K), CPR/First Aid ($3K). Training Division secured group rates with POST-certified vendors.',
      impact: {
        approved: 'All 23 deputies maintain certifications. No operational disruptions. Compliance with GA P.O.S.T. requirements. Training completed by March 31, 2025.',
        denied: 'Deputies lose certification and cannot patrol. Potential liability exposure. Reduced field staffing by 23 officers. Violation of state requirements. County liability for non-compliance.'
      },
      budgetImpact: {
        amount: 43000,
        category: 'Training & Development',
        allocated: 180000,
        spent: 135000,
        percentUsed: 75,
        remainingAfter: 2000,
        quarterlyBreakdown: { Q1: 43000, Q2: 0, Q3: 0, Q4: 0 }
      },
      aiRecommendation: {
        decision: 'approve',
        confidence: 99,
        reasoning: 'Critical compliance requirement based on historical patterns, budget availability, operational priority. Legal mandate. No alternative options. High risk if denied.',
        urgencyNote: 'Approval deadline today at 1700 hrs to meet vendor payment schedule'
      },
      documents: ['Training_Budget_Request.pdf', 'Certification_Requirements.pdf', 'Vendor_Quotes.pdf'],
      relatedApprovals: ['Part of Q1 Training Budget (3 of 5 requests approved)'],
      approvalChain: 'Captain → Major → Sheriff (you are: Sheriff)'
    },
    {
      id: 3,
      type: 'hiring',
      title: 'Hiring Decision',
      submittedBy: 'Jane Doe',
      submittedByTitle: 'Candidate',
      details: 'Federal Deputy Position (Court Security Division)',
      division: 'Field Operations - Court Security',
      urgent: true,
      submittedDate: '2024-11-02',
      daysAgo: 2,
      offerExpires: 'Jan 16 (3 days)',
      competingOffer: 'Fulton County SO ($4K higher)',
      backgroundCleared: true,
      justification: 'Candidate: Jane Doe, 8 years law enforcement experience (5 years Fulton County Marshal, 3 years DeKalb County SO). Certifications: P.O.S.T. certified, federal court security certified, bilingual (English/Spanish). Position vacant 47 days. Conditional offer expires Jan 16. Candidate has competing offer from Fulton County SO ($4K higher salary). Salary offered: $58,500 (within GS-7 federal pay scale equivalent). Start date proposed: Feb 1, 2025.',
      impact: {
        approved: 'Court Security Division at 100% staffing. Federal law enforcement experience strengthens unit. Bilingual capability addresses community needs. Experienced hire reduces training costs. Immediate deployment Feb 1.',
        denied: 'Lose highly qualified candidate to Fulton County. Court Security remains at 87% staffing. Next qualified candidate not available until March 2025. Continue overtime for current staff ($2,400/month).'
      },
      budgetImpact: {
        amount: 58500,
        category: 'Personnel - Annual Salary',
        firstYearCost: 58500,
        benefits: 17550,
        totalFirstYear: 76050
      },
      aiRecommendation: {
        decision: 'approve',
        confidence: 89,
        reasoning: 'Candidate qualifications exceed requirements, salary within range, division priority hire. Exceptional experience. Critical vacancy (47 days). Reduces overtime costs.',
        urgencyNote: 'Conditional offer expires Jan 16 (3 days). Competing offer from Fulton County SO.'
      },
      documents: ['Resume.pdf', 'Background_Check.pdf', 'Civil_Service_Scores.pdf', 'Offer_Letter.pdf'],
      relatedApprovals: []
    },
    {
      id: 4,
      type: 'equipment',
      title: 'Equipment Purchase',
      submittedBy: 'IT Director Harrison (#IT-001)',
      submittedByTitle: 'IT Director',
      details: 'Body camera system upgrade (68 Axon Body 4 units)',
      division: 'Administrative Services - IT Division',
      urgent: false,
      amount: 125000,
      submittedDate: '2024-10-28',
      daysAgo: 7,
      vendor: 'Axon',
      pricingExpires: 'Jan 31',
      justification: 'Current Axon Body 2 cameras (purchased 2019, 68 units) reach end-of-life Dec 31, 2024. Vendor (Axon) discontinuing cloud storage and technical support effective Jan 1, 2025. New Axon Body 4 system includes: 68 cameras ($82,450), 5-year cloud storage ($31,200), training ($6,350), extended warranty ($5,000). State compliance requires all patrol deputies have operational body cameras. Pricing locked until Jan 31 - price increases 8% Feb 1. Federal DOJ grant covers $37,500 (applied, pending approval). Net cost to county: $87,500 (or $125K if grant denied).',
      impact: {
        approved: '68 new Axon Body 4 cameras with 5-year warranty. 4K video quality (vs current 1080p). Auto-activation when weapon drawn. Real-time supervisor monitoring. Cloud storage for 7 years. Enhanced officer safety and accountability.',
        denied: 'Current cameras lose vendor support Jan 1, 2025. No cloud storage after Dec 31. Potential evidence gaps. Liability risk. Technology obsolescence. State compliance violation. Price increases 8% after Jan 31.'
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
        annualMaintenance: 8500,
        grantOffset: 37500,
        netCost: 87500
      },
      aiRecommendation: {
        decision: 'approve',
        confidence: 88,
        reasoning: 'Mission-critical equipment, vendor pricing expires Jan 31, current system end-of-life. Budget available. Critical for accountability and evidence. State compliance requirement.',
        considerations: 'Federal DOJ grant ($37,500) pending - net cost $87,500 if approved. Price increases 8% after Jan 31.'
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

  const pendingAmount = approvalsList.filter(a => a.amount).reduce((sum, a) => sum + a.amount, 0);

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

  const filteredApprovals = approvalsList
    .filter(approval => {
      if (filterType === 'all') return true;
      if (filterType === 'urgent') return approval.urgent;
      return approval.type === filterType;
    })
    .sort((a, b) => {
      // Urgent always first
      if (a.urgent && !b.urgent) return -1;
      if (!a.urgent && b.urgent) return 1;
      // Then by recency
      return a.daysAgo - b.daysAgo;
    });

  const filteredHistory = activeTab === 'my-decisions'
    ? approvalHistory.filter(h => h.decidedBy === currentUser)
    : approvalHistory;

  const urgentCount = approvalsList.filter(a => a.urgent).length;

  return (
    <DashboardLayout>
      <div className="p-4 lg:p-6">
          <div className="max-w-[1400px] mx-auto">

            {/* ── Page Header ────────────────────────────────── */}
            <div className="mb-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-white mb-0.5">Command Approvals</h2>
                  <div className="flex items-center gap-2 text-[11px] text-slate-500">
                    <span>Decision execution surface</span>
                    <span className="text-slate-700">·</span>
                    <span>{approvalsList.length} pending</span>
                    {urgentCount > 0 && (
                      <>
                        <span className="text-slate-700">·</span>
                        <span className="text-red-400 font-semibold">{urgentCount} urgent</span>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 bg-green-500/8 border border-green-500/15 rounded text-[10px] font-semibold text-green-400">
                    FY24 Remaining: $550K
                  </span>
                  {activeTab === 'pending' && pendingAmount > 0 && (
                    <span className="px-2.5 py-1 bg-amber-500/8 border border-amber-500/15 rounded text-[10px] font-semibold text-amber-400">
                      ${pendingAmount.toLocaleString()} pending
                    </span>
                  )}
                  {(activeTab === 'history' || activeTab === 'my-decisions') && (
                    <button className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-800/40 border border-slate-700/30 rounded text-[11px] text-slate-400 hover:text-white transition-colors">
                      <Download className="w-3 h-3" />
                      Export
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* ── Tabs ────────────────────────────────── */}
            <div className="flex gap-1.5 mb-4 border-b border-slate-800/50 pb-px">
              <button
                onClick={() => setActiveTab('pending')}
                className={`px-2.5 py-1.5 text-[11px] font-medium transition-all relative flex items-center gap-1.5 ${
                  activeTab === 'pending' ? 'text-white' : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                Pending
                <span className={`px-1 py-px rounded text-[10px] ${activeTab === 'pending' ? 'bg-amber-500/15 text-amber-400' : 'bg-slate-800/50 text-slate-500'}`}>
                  {approvalsList.length}
                </span>
                {activeTab === 'pending' && <div className="absolute bottom-0 left-0 right-0 h-px bg-amber-500"></div>}
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={`px-2.5 py-1.5 text-[11px] font-medium transition-all relative ${
                  activeTab === 'history' ? 'text-white' : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                History
                {activeTab === 'history' && <div className="absolute bottom-0 left-0 right-0 h-px bg-amber-500"></div>}
              </button>
              <button
                onClick={() => setActiveTab('my-decisions')}
                className={`px-2.5 py-1.5 text-[11px] font-medium transition-all relative flex items-center gap-1.5 ${
                  activeTab === 'my-decisions' ? 'text-white' : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                My Decisions
                {activeTab === 'my-decisions' && <div className="absolute bottom-0 left-0 right-0 h-px bg-amber-500"></div>}
              </button>
            </div>

            {/* ── AI Summary Bar (collapsed by default) ────── */}
            {activeTab === 'pending' && (
              <div className="mb-4">
                <button
                  onClick={() => setAiSummaryExpanded(!aiSummaryExpanded)}
                  className="w-full flex items-center gap-2 px-3 py-2 bg-slate-800/20 border border-slate-700/15 rounded hover:bg-slate-800/30 transition-colors"
                >
                  <Sparkles className="w-3 h-3 text-slate-500" />
                  <span className="text-[11px] text-slate-400 flex-1 text-left">
                    <span className="text-slate-500 font-medium">AI Summary:</span>{' '}
                    <span className="text-amber-400">{urgentCount} urgent budget items</span>
                    <span className="text-slate-600 mx-1">·</span>
                    <span className="text-green-400">1 hiring rec high confidence</span>
                    <span className="text-slate-600 mx-1">·</span>
                    <span className="text-slate-400">No projected deficit risk</span>
                  </span>
                  {aiSummaryExpanded ? <ChevronUp className="w-3 h-3 text-slate-600" /> : <ChevronDown className="w-3 h-3 text-slate-600" />}
                </button>

                {aiSummaryExpanded && (
                  <div className="mt-1 px-3 py-2.5 bg-slate-800/15 border border-slate-700/10 rounded space-y-1.5">
                    <p className="text-[10px] text-red-400">• Training Division Q1 budget ($43K) — deadline today 1700 hrs. Vendor payment schedule at risk.</p>
                    <p className="text-[10px] text-red-400">• Federal Deputy hire (Jane Doe) — offer expires Jan 16. Competing offer from Fulton County SO.</p>
                    <p className="text-[10px] text-green-400">• Body camera upgrade ($125K) — 88% confidence approve. Vendor pricing expires Jan 31.</p>
                    <p className="text-[10px] text-slate-400">• All pending within FY24 budget ($170K pending / $550K remaining). No constraints.</p>
                  </div>
                )}
              </div>
            )}

            {/* ── Filter Pills (operational style, matches alerts) ── */}
            {activeTab === 'pending' && (
              <div className="mb-4 flex items-center gap-1.5 flex-wrap">
                {[
                  { id: 'all', label: 'All', count: approvalsList.length },
                  { id: 'urgent', label: 'Urgent', count: urgentCount },
                  { id: 'leave', label: 'Leave', count: approvalsList.filter(a => a.type === 'leave').length },
                  { id: 'budget', label: 'Budget', count: approvalsList.filter(a => a.type === 'budget').length },
                  { id: 'hiring', label: 'Hiring', count: approvalsList.filter(a => a.type === 'hiring').length },
                  { id: 'equipment', label: 'Equipment', count: approvalsList.filter(a => a.type === 'equipment').length },
                ].map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => setFilterType(opt.id)}
                    className={`px-2.5 py-1 rounded text-[11px] font-medium border transition-all ${
                      filterType === opt.id
                        ? 'bg-slate-700/50 border-slate-600/50 text-white'
                        : 'bg-transparent border-slate-700/20 text-slate-500 hover:text-slate-300 hover:border-slate-600/30'
                    }`}
                  >
                    {opt.label}
                    <span className={`ml-1 ${filterType === opt.id ? 'text-slate-400' : 'text-slate-600'}`}>{opt.count}</span>
                  </button>
                ))}
              </div>
            )}

            {activeTab === 'pending' && (
              <>
                {/* Bulk Actions Toolbar */}
                {selectedItems.length > 0 && (
                  <div className="mb-3 flex items-center gap-2 px-3 py-2 bg-slate-800/20 border border-slate-700/15 rounded">
                    <CheckSquare className="w-3.5 h-3.5 text-blue-400" />
                    <span className="text-[11px] font-semibold text-white">
                      {selectedItems.length} selected
                    </span>
                    <div className="flex-1" />
                    <button onClick={bulkApprove} className="px-2 py-1 text-[10px] font-medium text-green-400 hover:bg-green-500/10 rounded transition-colors">Approve All</button>
                    <button onClick={bulkDeny} className="px-2 py-1 text-[10px] font-medium text-red-400 hover:bg-red-500/10 rounded transition-colors">Deny All</button>
                    <button onClick={() => setSelectedItems([])} className="px-2 py-1 text-[10px] font-medium text-slate-500 hover:text-white rounded transition-colors">Clear</button>
                  </div>
                )}

                {filteredApprovals.length === 0 ? (
                  <div className="py-12 text-center">
                    <CheckCircle className="w-10 h-10 text-green-400/50 mx-auto mb-3" />
                    <p className="text-sm font-semibold text-white mb-1">All caught up</p>
                    <p className="text-[11px] text-slate-500">No pending approvals.</p>
                  </div>
                ) : (
                  <>
                    {/* Select All */}
                    <div className="mb-2 flex items-center gap-2 px-1">
                      <button
                        onClick={toggleSelectAll}
                        className="flex items-center gap-1.5 text-[11px] text-slate-500 hover:text-white transition-colors"
                      >
                        {selectedItems.length === filteredApprovals.length ? (
                          <CheckSquare className="w-3.5 h-3.5 text-blue-400" />
                        ) : (
                          <Square className="w-3.5 h-3.5" />
                        )}
                        Select all ({filteredApprovals.length})
                      </button>
                    </div>

                    {/* ── Decision Cards ────────────────────── */}
                    <div className="space-y-px">
                      {filteredApprovals.map((approval) => {
                        const TypeIcon = getTypeIcon(approval.type);
                        const isExpanded = expandedCards.includes(approval.id);
                        const isSelected = selectedItems.includes(approval.id);

                        return (
                          <div
                            key={approval.id}
                            className={`rounded border transition-colors ${
                              isSelected ? 'border-blue-500/30 bg-blue-500/[0.03]' :
                              'border-slate-700/15 bg-slate-800/15 hover:bg-slate-800/25'
                            }`}
                          >
                            {/* ── Compact Row ──────────────────────── */}
                            <div className="flex items-center gap-2.5 px-3.5 py-[9px]">
                              {/* Urgent strip */}
                              <div className={`w-[4px] self-stretch rounded-full flex-shrink-0 ${
                                approval.urgent ? 'bg-amber-500' : 'bg-slate-700/30'
                              }`}></div>

                              {/* Checkbox */}
                              <button onClick={() => toggleSelectItem(approval.id)} className="flex-shrink-0">
                                {isSelected ? (
                                  <CheckSquare className="w-3.5 h-3.5 text-blue-400" />
                                ) : (
                                  <Square className="w-3.5 h-3.5 text-slate-600 hover:text-slate-400 transition-colors" />
                                )}
                              </button>

                              {/* Type pill */}
                              <span className={`px-1.5 py-px border rounded text-[10px] font-semibold flex-shrink-0 leading-tight ${
                                approval.type === 'leave' ? 'bg-blue-500/10 border-blue-500/20 text-blue-400' :
                                approval.type === 'budget' ? 'bg-green-500/10 border-green-500/20 text-green-400' :
                                approval.type === 'hiring' ? 'bg-purple-500/10 border-purple-500/20 text-purple-400' :
                                'bg-amber-500/10 border-amber-500/20 text-amber-400'
                              }`}>
                                {approval.type.charAt(0).toUpperCase() + approval.type.slice(1)}
                              </span>

                              {/* Title */}
                              <span className="text-[13px] font-bold flex-1 min-w-0 truncate text-white">
                                {approval.title} — {approval.details}
                              </span>

                              {/* Amount */}
                              {approval.amount && (
                                <span className="text-[11px] font-semibold text-green-400 flex-shrink-0 font-mono">
                                  ${approval.amount.toLocaleString()}
                                </span>
                              )}

                              {/* Requestor */}
                              <span className="hidden lg:block text-[10px] text-slate-500 flex-shrink-0 max-w-[140px] truncate">
                                {approval.submittedBy.split(' (')[0]}
                              </span>

                              {/* Time pending */}
                              <span className="text-[10px] text-slate-600 flex-shrink-0 font-mono">
                                {approval.daysAgo}d ago
                              </span>

                              {/* Urgent tag + deadline */}
                              {approval.urgent && (
                                <span className="px-1.5 py-px bg-red-500/10 border border-red-500/20 rounded text-[10px] font-bold text-red-400 flex-shrink-0">
                                  {approval.approvalDeadline ? `Due ${approval.approvalDeadline}` :
                                   approval.offerExpires ? `Expires ${approval.offerExpires}` : 'URGENT'}
                                </span>
                              )}

                              {/* AI Recommendation — small bar */}
                              {approval.aiRecommendation && (
                                <span className={`hidden md:inline-flex items-center gap-1 px-1.5 py-px rounded text-[10px] font-semibold flex-shrink-0 ${
                                  approval.aiRecommendation.decision === 'approve'
                                    ? 'text-green-400/80'
                                    : 'text-red-400/80'
                                }`}>
                                  <Sparkles className="w-2.5 h-2.5" />
                                  {approval.aiRecommendation.decision === 'approve' ? 'Approve' : 'Deny'} ({approval.aiRecommendation.confidence}%)
                                </span>
                              )}

                              {/* Approve / Deny */}
                              <div className="flex items-center gap-1 flex-shrink-0 ml-1">
                                <button
                                  onClick={() => openApprovalModal(approval, 'approve')}
                                  className="p-1 rounded hover:bg-green-500/15 transition-colors"
                                  title="Approve"
                                >
                                  <ThumbsUp className="w-3.5 h-3.5 text-green-400" />
                                </button>
                                <button
                                  onClick={() => openApprovalModal(approval, 'deny')}
                                  className="p-1 rounded hover:bg-red-500/15 transition-colors"
                                  title="Deny"
                                >
                                  <XCircle className="w-3.5 h-3.5 text-red-400" />
                                </button>
                                <button
                                  onClick={() => toggleExpandCard(approval.id)}
                                  className="p-1 rounded hover:bg-slate-700/30 transition-colors"
                                  title={isExpanded ? 'Collapse' : 'Expand'}
                                >
                                  {isExpanded ? <ChevronUp className="w-3.5 h-3.5 text-slate-500" /> : <ChevronDown className="w-3.5 h-3.5 text-slate-500" />}
                                </button>
                              </div>
                            </div>

                            {/* ── Expanded Details ──────────────────── */}
                            {isExpanded && (
                              <div className="px-3.5 pb-3 pt-1 ml-[26px] space-y-2.5">
                                {/* Key context row */}
                                <div className="flex items-center gap-3 text-[10px] text-slate-400 flex-wrap">
                                  <span className="flex items-center gap-1">
                                    <Building2 className="w-3 h-3" />
                                    {approval.division}
                                  </span>
                                  {approval.submittedByTitle && (
                                    <>
                                      <span className="text-slate-700">·</span>
                                      <span>{approval.submittedBy.split(' (')[0]} ({approval.submittedByTitle})</span>
                                    </>
                                  )}
                                  {approval.leaveBalance && (
                                    <>
                                      <span className="text-slate-700">·</span>
                                      <span>Leave balance: {approval.leaveBalance} hrs</span>
                                    </>
                                  )}
                                  {approval.backgroundCleared && (
                                    <>
                                      <span className="text-slate-700">·</span>
                                      <span className="text-green-400">Background cleared</span>
                                    </>
                                  )}
                                  {approval.vendor && (
                                    <>
                                      <span className="text-slate-700">·</span>
                                      <span>Vendor: {approval.vendor}</span>
                                    </>
                                  )}
                                  {approval.approvalChain && (
                                    <>
                                      <span className="text-slate-700">·</span>
                                      <span>{approval.approvalChain}</span>
                                    </>
                                  )}
                                </div>

                                {/* Justification */}
                                <div className="bg-slate-900/30 rounded p-2.5 border border-slate-700/15">
                                  <p className="text-[10px] text-slate-500 font-semibold mb-1">Justification</p>
                                  <p className="text-[11px] text-slate-300 leading-relaxed">{approval.justification}</p>
                                </div>

                                {/* Impact Analysis */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                  <div className="bg-green-500/[0.03] border border-green-500/10 rounded p-2.5">
                                    <p className="text-[10px] font-bold text-green-400 mb-1">IF APPROVED</p>
                                    <p className="text-[10px] text-slate-400 leading-relaxed">{approval.impact.approved}</p>
                                  </div>
                                  <div className="bg-red-500/[0.03] border border-red-500/10 rounded p-2.5">
                                    <p className="text-[10px] font-bold text-red-400 mb-1">IF DENIED</p>
                                    <p className="text-[10px] text-slate-400 leading-relaxed">{approval.impact.denied}</p>
                                  </div>
                                </div>

                                {/* Budget impact (inline if exists) */}
                                {approval.budgetImpact && (
                                  <div className="flex items-center gap-4 text-[10px] text-slate-400 bg-slate-900/20 rounded px-2.5 py-2 border border-slate-700/10">
                                    <span className="text-slate-500 font-semibold">Budget:</span>
                                    <span>{approval.budgetImpact.category}</span>
                                    {approval.budgetImpact.allocated && <span>Allocated ${approval.budgetImpact.allocated.toLocaleString()}</span>}
                                    {approval.budgetImpact.spent && <span>Spent ${approval.budgetImpact.spent.toLocaleString()}</span>}
                                    {approval.budgetImpact.percentUsed && (
                                      <span className={
                                        approval.budgetImpact.percentUsed >= 90 ? 'text-red-400' :
                                        approval.budgetImpact.percentUsed >= 75 ? 'text-amber-400' :
                                        'text-green-400'
                                      }>{approval.budgetImpact.percentUsed}% used</span>
                                    )}
                                  </div>
                                )}

                                {/* AI Analysis (expanded, still subdued) */}
                                {approval.aiRecommendation && (
                                  <div className="flex items-start gap-2 text-[10px] text-slate-400">
                                    <Sparkles className="w-3 h-3 text-slate-500 mt-0.5 flex-shrink-0" />
                                    <div>
                                      <span className="text-slate-500 font-semibold">AI Analysis:</span>{' '}
                                      <span>{approval.aiRecommendation.reasoning}</span>
                                      {approval.aiRecommendation.urgencyNote && (
                                        <span className="text-amber-400 ml-1">⚠ {approval.aiRecommendation.urgencyNote}</span>
                                      )}
                                      {approval.aiRecommendation.considerations && (
                                        <span className="text-blue-400 ml-1">{approval.aiRecommendation.considerations}</span>
                                      )}
                                    </div>
                                  </div>
                                )}

                                {/* Documents */}
                                {approval.documents && approval.documents.length > 0 && (
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <FileCheck className="w-3 h-3 text-slate-600" />
                                    {approval.documents.map((doc, idx) => (
                                      <button
                                        key={idx}
                                        className="flex items-center gap-1 px-1.5 py-0.5 bg-slate-800/30 hover:bg-slate-700/30 border border-slate-700/15 rounded text-[10px] text-blue-400 transition-colors"
                                      >
                                        <FileText className="w-2.5 h-2.5" />
                                        {doc}
                                      </button>
                                    ))}
                                  </div>
                                )}

                                {/* Expanded action buttons */}
                                <div className="flex items-center gap-2 pt-1">
                                  <button
                                    onClick={() => openRequestInfoModal(approval)}
                                    className="px-2 py-1 text-[10px] font-medium text-blue-400 hover:bg-blue-500/10 rounded transition-colors flex items-center gap-1"
                                  >
                                    <Info className="w-3 h-3" />
                                    Request Info
                                  </button>
                                  <div className="flex-1" />
                                  <button
                                    onClick={() => openApprovalModal(approval, 'approve')}
                                    className="px-3 py-1.5 bg-green-500/10 border border-green-500/20 hover:bg-green-500/20 rounded text-[11px] font-semibold text-green-400 transition-colors flex items-center gap-1.5"
                                  >
                                    <ThumbsUp className="w-3 h-3" />
                                    Approve
                                  </button>
                                  <button
                                    onClick={() => openApprovalModal(approval, 'deny')}
                                    className="px-3 py-1.5 bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 rounded text-[11px] font-semibold text-red-400 transition-colors flex items-center gap-1.5"
                                  >
                                    <XCircle className="w-3 h-3" />
                                    Deny
                                  </button>
                                </div>
                              </div>
                            )}
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

    </DashboardLayout>
  );
}

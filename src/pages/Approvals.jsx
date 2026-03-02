import React, { useState } from 'react';
import { Users, FileText, AlertCircle, Search, DollarSign, CheckCircle, ThumbsUp, XCircle, Sparkles, X, Send, Calendar, Clock, Download, Eye, ChevronDown, ChevronUp, Building2, Info, FileCheck, CheckSquare, Square, Package, Shield, Wrench, FileSignature, Handshake } from 'lucide-react';
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
  const [sortBy, setSortBy] = useState('urgency');
  const [logFilter, setLogFilter] = useState('all');

  const [approvalsList, setApprovalsList] = useState([
    {
      id: 1,
      type: 'overtime',
      title: 'Overtime Authorization',
      submittedBy: 'Patrol Major Davis',
      submittedByTitle: 'Patrol Major',
      details: 'B-Shift mandatory OT — 6 deputies × 6 hrs ($2,808)',
      division: 'Patrol Division - B Shift',
      urgent: true,
      amount: 2808,
      submittedDate: '2024-11-04',
      daysAgo: 0,
      deadlineHrs: 3,
      justification: 'B-Shift operating at 9/12 deputies (75%). Zones 4 & 7 single-officer patrol — safety policy violation. 6 deputies authorized for 6 hours OT each at 1.5x rate ($46.80/hr). Coverage needed 1800-0000 tonight. Already exceeds quarterly OT budget by 26%.',
      impact: {
        approved: 'All patrol zones dual-officer coverage restored tonight. Officer safety maintained. $2,808 cost. OT budget now at 130% of quarterly allocation.',
        denied: 'Zones 4 & 7 remain single-officer. Policy violation continues. Liability exposure if incident occurs. Mutual aid from Lawrenceville PD only alternative ($4,200 cost).'
      },
      aiRecommendation: {
        decision: 'approve',
        confidence: 96,
        reasoning: 'Officer safety requirement. Single-officer patrol violates SOP-12. OT cost ($2,808) lower than mutual aid alternative ($4,200). Budget impact manageable.',
        urgencyNote: 'B-Shift starts in 3 hours. Deputies need confirmation to report.'
      },
      documents: ['OT_Authorization_Form.pdf', 'Staffing_Report.pdf'],
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
      deadlineHrs: 5,
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
        remainingAfter: 2000
      },
      aiRecommendation: {
        decision: 'approve',
        confidence: 99,
        reasoning: 'Critical compliance requirement. Legal mandate — no alternative. High risk if denied. Budget available ($45K remaining in category).',
        urgencyNote: 'Vendor payment deadline 1700 hrs today. Late payment forfeits group rate.'
      },
      documents: ['Training_Budget_Request.pdf', 'Certification_Requirements.pdf', 'Vendor_Quotes.pdf'],
      relatedApprovals: ['Part of Q1 Training Budget (3 of 5 requests approved)'],
      approvalChain: 'Captain → Major → Sheriff (you are: Sheriff)'
    },
    {
      id: 3,
      type: 'hiring',
      title: 'Hiring Decision',
      submittedBy: 'HR Director Collins',
      submittedByTitle: 'HR Director',
      details: 'Federal Deputy — Jane Doe (Court Security)',
      division: 'Field Operations - Court Security',
      urgent: true,
      submittedDate: '2024-11-02',
      daysAgo: 2,
      deadlineHrs: 72,
      backgroundCleared: true,
      justification: 'Candidate: Jane Doe, 8 years law enforcement (5 yrs Fulton County Marshal, 3 yrs DeKalb County SO). P.O.S.T. certified, federal court security certified, bilingual (English/Spanish). Position vacant 47 days. Competing offer from Fulton County SO ($4K higher). Salary: $58,500 (GS-7 equivalent). Start date: Feb 1, 2025.',
      impact: {
        approved: 'Court Security at 100% staffing. Bilingual capability. Experienced hire reduces training costs. Immediate deployment Feb 1.',
        denied: 'Lose candidate to Fulton County. Court Security at 87%. Next qualified candidate March 2025. Continue $2,400/month OT.'
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
        reasoning: 'Qualifications exceed requirements, salary within range, critical vacancy (47 days). Reduces overtime costs ($2,400/mo).',
        urgencyNote: 'Offer expires Jan 16. Competing offer from Fulton County SO.'
      },
      documents: ['Resume.pdf', 'Background_Check.pdf', 'Civil_Service_Scores.pdf', 'Offer_Letter.pdf'],
      relatedApprovals: []
    },
    {
      id: 4,
      type: 'emergency',
      title: 'Emergency Repair Approval',
      submittedBy: 'Facilities Director Brooks',
      submittedByTitle: 'Facilities Director',
      details: 'Detention HVAC emergency — H2-Pod at 84°F',
      division: 'Detention Facility',
      urgent: true,
      amount: 18500,
      submittedDate: '2024-11-04',
      daysAgo: 0,
      deadlineHrs: 6,
      justification: 'H2-Pod HVAC compressor failure at 0430 today. Temperature 84°F and rising (max safe: 78°F per state detention standards). 36 inmates in pod. Emergency HVAC contractor (Comfort Systems) quoted $18,500 for emergency compressor replacement. Standard repair would be $12,200 but 3-week lead time. State inspection scheduled Jan 22.',
      impact: {
        approved: 'HVAC restored within 8 hours. Inmates safe. State compliance maintained. $18,500 emergency rate.',
        denied: 'Must evacuate H2-Pod (36 inmates) to other pods already at 91.5% capacity. State violation if temp exceeds 85°F. Potential litigation. Inspection failure Jan 22.'
      },
      budgetImpact: {
        amount: 18500,
        category: 'Facility Maintenance - Emergency',
        allocated: 95000,
        spent: 61000,
        percentUsed: 64
      },
      aiRecommendation: {
        decision: 'approve',
        confidence: 97,
        reasoning: 'State compliance requirement. Inmate safety at risk. Emergency rate justified — delay costs more (pod evacuation, litigation risk). Budget available.',
        urgencyNote: 'Contractor on standby. Temperature rising ~1°F/hr. Must authorize by 1200.'
      },
      documents: ['Emergency_Work_Order.pdf', 'Contractor_Quote.pdf', 'Temperature_Log.pdf'],
      relatedApprovals: []
    },
    {
      id: 5,
      type: 'equipment',
      title: 'Equipment Purchase',
      submittedBy: 'IT Director Harrison (#IT-001)',
      submittedByTitle: 'IT Director',
      details: 'Body camera upgrade — 68 Axon Body 4 units',
      division: 'Administrative Services - IT',
      urgent: false,
      amount: 125000,
      submittedDate: '2024-10-28',
      daysAgo: 7,
      deadlineHrs: 432,
      vendor: 'Axon',
      justification: 'Current Axon Body 2 cameras (2019, 68 units) reach end-of-life Dec 31. Vendor discontinuing cloud storage Jan 1, 2025. New system: 68 cameras ($82,450), 5-year cloud ($31,200), training ($6,350), warranty ($5,000). Pricing locked until Jan 31 — increases 8% Feb 1. Federal DOJ grant covers $37,500 (pending). Net cost: $87,500.',
      impact: {
        approved: '68 new 4K cameras. Auto-activation, real-time monitoring, 7-year cloud storage. Enhanced accountability.',
        denied: 'Cameras lose vendor support Jan 1. No cloud storage. Evidence gaps. State compliance violation. Price +8% after Jan 31.'
      },
      budgetImpact: {
        amount: 125000,
        category: 'Equipment & Technology',
        allocated: 550000,
        spent: 315000,
        percentUsed: 57,
        grantOffset: 37500,
        netCost: 87500
      },
      aiRecommendation: {
        decision: 'approve',
        confidence: 88,
        reasoning: 'Mission-critical. Current system EOL. State compliance. Vendor pricing expires Jan 31.',
        considerations: 'DOJ grant ($37,500) pending — net cost $87,500 if approved.'
      },
      documents: ['Equipment_Proposal.pdf', 'Vendor_Comparison.pdf', 'EOL_Notice.pdf', 'Cost_Benefit.pdf'],
      relatedApprovals: []
    },
    {
      id: 6,
      type: 'policy',
      title: 'Policy Update Sign-off',
      submittedBy: 'Chief Deputy Anderson',
      submittedByTitle: 'Chief Deputy',
      details: 'Use-of-Force SOP-127 annual revision',
      division: 'Office of the Sheriff',
      urgent: false,
      submittedDate: '2024-10-30',
      daysAgo: 5,
      deadlineHrs: 408,
      justification: 'GA POST Rule 464-5-.03 requires annual review of use-of-force policy. SOP-127 last updated Jan 2024. Revisions include: updated de-escalation requirements (Section 4.2), body camera activation mandate (Section 6.1), supervisor notification timeline reduced to 30 min (Section 7.3). Legal review completed Dec 2. Training Division prepared rollout plan.',
      impact: {
        approved: 'Compliance with state mandate. Policy distributed to all personnel by Dec 20. Training rollout Jan 6-10.',
        denied: 'State compliance violation. Potential liability in any use-of-force incident after Dec 31. Audit finding if inspected.'
      },
      aiRecommendation: {
        decision: 'approve',
        confidence: 94,
        reasoning: 'State-mandated annual review. Legal has approved revisions. Training plan ready. No operational disruption.'
      },
      documents: ['SOP-127-R1_Draft.pdf', 'Legal_Review.pdf', 'Change_Summary.pdf'],
      relatedApprovals: []
    },
    {
      id: 7,
      type: 'mutual-aid',
      title: 'Mutual Aid Agreement',
      submittedBy: 'Captain Rodriguez',
      submittedByTitle: 'Operations Captain',
      details: 'Lawrenceville PD — Regional Championship traffic support',
      division: 'Patrol Division',
      urgent: false,
      submittedDate: '2024-11-01',
      daysAgo: 3,
      deadlineHrs: 96,
      justification: 'Gwinnett Stadium regional championship game Friday 7:30 PM. Expected 8-10K attendance. Lawrenceville PD requesting 4 GCSO units for traffic control on Sugarloaf/Satellite intersection. Standard mutual aid rate: $52/hr per unit × 4 hrs = $832 total (reimbursed). Joint briefing Thursday 1600.',
      impact: {
        approved: 'Traffic control coverage secured. $832 reimbursed by Lawrenceville. Strengthens interagency relationship. Safe event operations.',
        denied: 'Traffic control gaps at major intersection. Potential liability. Damages interagency relationship.'
      },
      aiRecommendation: {
        decision: 'approve',
        confidence: 92,
        reasoning: 'Standard mutual aid. Fully reimbursed. No cost to GCSO. A-Shift overlap provides available units.'
      },
      documents: ['Mutual_Aid_Request.pdf', 'Traffic_Plan.pdf', 'Event_Brief.pdf'],
      relatedApprovals: []
    },
    {
      id: 8,
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
      justification: 'Pre-planned family vacation (Orlando). 120 hours accrued (max: 200). Shift coverage confirmed: Rodriguez (#4087) covers Dec 15-18, Williams (#4028) covers Dec 19-22. No operational conflicts. Last vacation: July 2024.',
      impact: {
        approved: 'Staffing at 92% during leave. Coverage arranged. Morale boost.',
        denied: 'Non-refundable deposits at risk. Morale impact. Next window February 2025.'
      },
      aiRecommendation: {
        decision: 'approve',
        confidence: 95,
        reasoning: 'Sufficient balance (120 hrs), coverage confirmed, no conflicts. Strong attendance (98% in 2024).'
      },
      documents: ['Leave_Request_Form.pdf', 'Coverage_Plan.pdf'],
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
      case 'equipment': return Package;
      case 'overtime': return Clock;
      case 'emergency': return Wrench;
      case 'policy': return FileSignature;
      case 'mutual-aid': return Handshake;
      default: return FileText;
    }
  };

  // ── Urgency Logic ──────────────────────────────
  // deadlineHrs: hours until decision deadline (from data)
  // < 0 = overdue, < 24 = critical, < 72 = soon
  const getUrgencyState = (approval) => {
    if (approval.deadlineHrs == null) return null;
    if (approval.deadlineHrs <= 0) return 'overdue';
    if (approval.deadlineHrs <= 24) return 'critical';
    if (approval.deadlineHrs <= 72) return 'soon';
    return null;
  };

  const getDeadlineLabel = (approval) => {
    if (approval.deadlineHrs == null) return null;
    if (approval.deadlineHrs <= 0) return 'OVERDUE';
    if (approval.deadlineHrs < 1) return `${Math.round(approval.deadlineHrs * 60)}m left`;
    if (approval.deadlineHrs < 24) return `${Math.round(approval.deadlineHrs)}h left`;
    const days = Math.round(approval.deadlineHrs / 24);
    return `${days}d left`;
  };

  const getPendingTime = (daysAgo) => {
    if (daysAgo === 0) return 'Today';
    if (daysAgo === 1) return '1d';
    return `${daysAgo}d`;
  };

  const filteredApprovals = approvalsList
    .filter(approval => {
      if (filterType === 'all') return true;
      if (filterType === 'urgent') return approval.urgent || (approval.deadlineHrs != null && approval.deadlineHrs <= 24);
      return approval.type === filterType;
    })
    .sort((a, b) => {
      // Always: overdue/critical deadline items pinned to top
      const aDeadline = a.deadlineHrs ?? 9999;
      const bDeadline = b.deadlineHrs ?? 9999;
      const aUrgent = aDeadline <= 24;
      const bUrgent = bDeadline <= 24;
      if (aUrgent && !bUrgent) return -1;
      if (!aUrgent && bUrgent) return 1;
      if (aUrgent && bUrgent) return aDeadline - bDeadline;
      // Secondary sort by user selection
      if (sortBy === 'amount') return (b.amount || 0) - (a.amount || 0);
      if (sortBy === 'oldest') return b.daysAgo - a.daysAgo;
      // Default (urgency): dollar impact then oldest
      const amountDiff = (b.amount || 0) - (a.amount || 0);
      if (amountDiff !== 0) return amountDiff;
      return b.daysAgo - a.daysAgo;
    });

  const filteredHistory = approvalHistory
    .filter(h => {
      if (logFilter === 'approved') return h.decision === 'approved';
      if (logFilter === 'denied') return h.decision === 'denied';
      return true;
    });

  const urgentCount = approvalsList.filter(a => a.urgent || (a.deadlineHrs != null && a.deadlineHrs <= 24)).length;

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
                  {activeTab === 'decision-log' && (
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
                onClick={() => setActiveTab('decision-log')}
                className={`px-2.5 py-1.5 text-[11px] font-medium transition-all relative ${
                  activeTab === 'decision-log' ? 'text-white' : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                Decision Log
                {activeTab === 'decision-log' && <div className="absolute bottom-0 left-0 right-0 h-px bg-amber-500"></div>}
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
                    <span className="text-red-400">{urgentCount} items need decision within 24h</span>
                    <span className="text-slate-600 mx-1">·</span>
                    <span className="text-green-400">All recs high confidence</span>
                    <span className="text-slate-600 mx-1">·</span>
                    <span className="text-slate-400">No projected deficit risk</span>
                  </span>
                  {aiSummaryExpanded ? <ChevronUp className="w-3 h-3 text-slate-600" /> : <ChevronDown className="w-3 h-3 text-slate-600" />}
                </button>

                {aiSummaryExpanded && (
                  <div className="mt-1 px-3 py-2.5 bg-slate-800/15 border border-slate-700/10 rounded space-y-1.5">
                    <p className="text-[10px] text-red-400">• B-Shift OT ($2,808) — deputies need confirmation in 3h. Single-officer patrol safety violation.</p>
                    <p className="text-[10px] text-red-400">• Training budget ($43K) — vendor payment deadline 1700 today. Forfeits group rate if late.</p>
                    <p className="text-[10px] text-red-400">• Detention HVAC emergency ($18.5K) — H2-Pod at 84°F. Contractor on standby. Must authorize by 1200.</p>
                    <p className="text-[10px] text-amber-400">• Federal Deputy hire (Jane Doe) — offer expires in 3 days. Competing offer from Fulton County.</p>
                    <p className="text-[10px] text-green-400">• Body camera upgrade ($125K) — 88% confidence. DOJ grant pending ($37.5K offset).</p>
                    <p className="text-[10px] text-slate-400">• Total pending: ${pendingAmount.toLocaleString()} / $550K remaining FY24. No constraints.</p>
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
                  { id: 'budget', label: 'Budget', count: approvalsList.filter(a => a.type === 'budget').length },
                  { id: 'overtime', label: 'OT', count: approvalsList.filter(a => a.type === 'overtime').length },
                  { id: 'hiring', label: 'Hiring', count: approvalsList.filter(a => a.type === 'hiring').length },
                  { id: 'equipment', label: 'Equipment', count: approvalsList.filter(a => a.type === 'equipment').length },
                  { id: 'emergency', label: 'Emergency', count: approvalsList.filter(a => a.type === 'emergency').length },
                  { id: 'policy', label: 'Policy', count: approvalsList.filter(a => a.type === 'policy').length },
                  { id: 'leave', label: 'Leave', count: approvalsList.filter(a => a.type === 'leave').length },
                ].filter(opt => opt.id === 'all' || opt.id === 'urgent' || opt.count > 0).map(opt => (
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

                <div className="flex-1" />

                {/* Sort toggle */}
                <div className="flex items-center gap-1">
                  <span className="text-[10px] text-slate-600 mr-1">Sort:</span>
                  {[
                    { id: 'urgency', label: 'Urgency' },
                    { id: 'amount', label: 'Amount' },
                    { id: 'oldest', label: 'Oldest' },
                  ].map(s => (
                    <button
                      key={s.id}
                      onClick={() => setSortBy(s.id)}
                      className={`px-2 py-0.5 rounded text-[10px] font-medium transition-all ${
                        sortBy === s.id
                          ? 'bg-slate-700/50 text-white'
                          : 'text-slate-600 hover:text-slate-400'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
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
                        const isExpanded = expandedCards.includes(approval.id);
                        const isSelected = selectedItems.includes(approval.id);
                        const urgencyState = getUrgencyState(approval);
                        const deadlineLabel = getDeadlineLabel(approval);

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
                              {/* Urgency strip — like alerts page */}
                              <div className={`w-[4px] self-stretch rounded-full flex-shrink-0 ${
                                urgencyState === 'overdue' ? 'bg-red-500' :
                                urgencyState === 'critical' ? 'bg-amber-500' :
                                urgencyState === 'soon' ? 'bg-amber-500/60' :
                                'bg-slate-700/30'
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
                                approval.type === 'overtime' ? 'bg-amber-500/10 border-amber-500/20 text-amber-400' :
                                approval.type === 'emergency' ? 'bg-red-500/10 border-red-500/20 text-red-400' :
                                approval.type === 'policy' ? 'bg-slate-400/10 border-slate-400/20 text-slate-400' :
                                approval.type === 'mutual-aid' ? 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400' :
                                'bg-amber-500/10 border-amber-500/20 text-amber-400'
                              }`}>
                                {approval.type === 'mutual-aid' ? 'Mutual Aid' :
                                 approval.type === 'overtime' ? 'OT' :
                                 approval.type.charAt(0).toUpperCase() + approval.type.slice(1)}
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

                              {/* Pending time */}
                              <span className="text-[10px] text-slate-600 flex-shrink-0 font-mono">
                                {getPendingTime(approval.daysAgo)}
                              </span>

                              {/* Deadline indicator */}
                              {deadlineLabel && (
                                <span className={`px-1.5 py-px border rounded text-[10px] font-bold flex-shrink-0 ${
                                  urgencyState === 'overdue' ? 'bg-red-500/15 border-red-500/25 text-red-400' :
                                  urgencyState === 'critical' ? 'bg-red-500/10 border-red-500/20 text-red-400' :
                                  'bg-amber-500/8 border-amber-500/15 text-amber-400'
                                }`}>
                                  {deadlineLabel}
                                </span>
                              )}

                              {/* Overdue pulse */}
                              {urgencyState === 'overdue' && (
                                <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 animate-pulse bg-red-500"></div>
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

            {/* ════════════════════════════════════════════
                DECISION LOG — Institutional audit record
                ════════════════════════════════════════════ */}
            {activeTab === 'decision-log' && (
              <>
                {/* Filters */}
                <div className="mb-4 flex items-center gap-1.5 flex-wrap">
                  {[
                    { id: 'all', label: 'All', count: approvalHistory.length },
                    { id: 'approved', label: 'Approved', count: approvalHistory.filter(h => h.decision === 'approved').length },
                    { id: 'denied', label: 'Denied', count: approvalHistory.filter(h => h.decision === 'denied').length },
                  ].map(opt => (
                    <button
                      key={opt.id}
                      onClick={() => setLogFilter(opt.id)}
                      className={`px-2.5 py-1 rounded text-[11px] font-medium border transition-all ${
                        logFilter === opt.id
                          ? 'bg-slate-700/50 border-slate-600/50 text-white'
                          : 'bg-transparent border-slate-700/20 text-slate-500 hover:text-slate-300 hover:border-slate-600/30'
                      }`}
                    >
                      {opt.label}
                      <span className={`ml-1 ${logFilter === opt.id ? 'text-slate-400' : 'text-slate-600'}`}>{opt.count}</span>
                    </button>
                  ))}
                  <div className="flex-1" />
                  <div className="flex-1 relative max-w-[240px]">
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-600" />
                    <input
                      type="text"
                      placeholder="Search log..."
                      className="w-full pl-8 pr-3 py-1 bg-slate-800/30 border border-slate-700/20 rounded text-[11px] text-white placeholder-slate-600 focus:outline-none focus:border-slate-600/50"
                    />
                  </div>
                </div>

                {/* Table */}
                <div className="border border-slate-700/15 rounded overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-700/20">
                        <th className="px-3 py-2 text-left text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Type</th>
                        <th className="px-3 py-2 text-left text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Title</th>
                        <th className="px-3 py-2 text-left text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Division</th>
                        <th className="px-3 py-2 text-left text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Amount</th>
                        <th className="px-3 py-2 text-left text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Decision</th>
                        <th className="px-3 py-2 text-left text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Decided By</th>
                        <th className="px-3 py-2 text-left text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Date</th>
                        <th className="px-3 py-2 text-right text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Reason</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredHistory.map((item) => (
                        <tr key={item.id} className="border-b border-slate-800/10 hover:bg-slate-800/15 transition-colors">
                          <td className="px-3 py-2.5">
                            <span className="text-[11px] text-slate-400 capitalize">{item.type}</span>
                          </td>
                          <td className="px-3 py-2.5">
                            <p className="text-[11px] font-semibold text-white">{item.title}</p>
                            <p className="text-[10px] text-slate-500">{item.submittedBy} · {item.details}</p>
                          </td>
                          <td className="px-3 py-2.5">
                            <span className="text-[11px] text-slate-400">{item.division}</span>
                          </td>
                          <td className="px-3 py-2.5">
                            {item.amount ? (
                              <span className="text-[11px] font-mono text-green-400">${item.amount.toLocaleString()}</span>
                            ) : (
                              <span className="text-[11px] text-slate-600">—</span>
                            )}
                          </td>
                          <td className="px-3 py-2.5">
                            <span className={`inline-flex items-center gap-1 px-1.5 py-px rounded text-[10px] font-bold border ${
                              item.decision === 'approved'
                                ? 'bg-green-500/10 border-green-500/20 text-green-400'
                                : 'bg-red-500/10 border-red-500/20 text-red-400'
                            }`}>
                              {item.decision === 'approved' ? <CheckCircle className="w-2.5 h-2.5" /> : <XCircle className="w-2.5 h-2.5" />}
                              {item.decision === 'approved' ? 'Approved' : 'Denied'}
                            </span>
                          </td>
                          <td className="px-3 py-2.5">
                            <span className="text-[11px] text-slate-400">{item.decidedBy}</span>
                          </td>
                          <td className="px-3 py-2.5">
                            <span className="text-[10px] text-slate-500 font-mono">{new Date(item.decidedDate).toLocaleDateString()}</span>
                          </td>
                          <td className="px-3 py-2.5 text-right">
                            <button
                              onClick={() => setHistoryDetailModal(item)}
                              className="text-[10px] text-blue-400 hover:text-blue-300 transition-colors"
                            >
                              View
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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

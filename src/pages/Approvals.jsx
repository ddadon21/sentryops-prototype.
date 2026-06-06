import React, { useState } from 'react';
import {
  Users, FileText, AlertCircle, Search, DollarSign, CheckCircle,
  ThumbsUp, XCircle, Sparkles, X, Send, Calendar, Clock, Download,
  ChevronDown, ChevronUp, Building2, Info, FileCheck, CheckSquare,
  Square, Package, Shield, Wrench, FileSignature, Handshake,
  TrendingUp, TrendingDown, AlertTriangle, UserCheck, Gauge, Activity
} from 'lucide-react';
import DashboardLayout from '../layouts/DashboardLayout';

// ─────────────────────────────────────────────────────────────────
// DECISION DATA
// Each item carries: decisionImpactScore, aiRecommendation (with
// confidence), plus 4-dimension impact analysis (financial,
// compliance, staffing, operational) for both approval and denial.
// ─────────────────────────────────────────────────────────────────
const INITIAL_DECISIONS = [
  {
    id: 1,
    type: 'overtime',
    title: 'Overtime Authorization',
    submittedBy: 'Patrol Major Davis',
    submittedByTitle: 'Patrol Major',
    details: 'B-Shift mandatory OT — 6 deputies × 6 hrs',
    division: 'Patrol Division - B Shift',
    urgent: true,
    amount: 2808,
    submittedDate: '2024-11-04',
    daysAgo: 0,
    deadlineHrs: 3,
    decisionImpactScore: 87,
    justification: 'B-Shift operating at 9/12 deputies (75%). Zones 4 & 7 single-officer patrol — safety policy violation. 6 deputies authorized for 6 hours OT each at 1.5x rate ($46.80/hr). Coverage needed 1800-0000 tonight.',
    aiRecommendation: {
      decision: 'approve',
      confidence: 96,
      summary: 'Officer safety violation in progress. OT cost lower than all alternatives.',
      urgencyNote: 'B-Shift starts in 3 hours. Deputies need confirmation to report.'
    },
    financialImpact: {
      approval: '$2,808 OT cost at 1.5x rate. OT budget moves to 130% of quarterly allocation.',
      denial: 'Mutual aid alternative: $4,200 (Lawrenceville PD). Net cost increase: $1,392.'
    },
    complianceImpact: {
      approval: 'SOP-12 two-officer patrol policy restored in all zones.',
      denial: 'SOP-12 violation continues for duration of B-Shift. Documented policy breach if incident occurs.'
    },
    staffingImpact: {
      approval: 'All 12 patrol zones restored to dual-officer coverage through midnight.',
      denial: 'Zones 4 and 7 remain single-officer for 6+ hours. Mutual aid request required immediately.'
    },
    operationalImpact: {
      approval: 'Normal patrol posture. Full response capability across all zones.',
      denial: 'Degraded response in Zones 4 and 7. Any serious incident triggers backup delay of 8–12 min.'
    },
    documents: ['OT_Authorization_Form.pdf', 'Staffing_Report.pdf'],
  },
  {
    id: 2,
    type: 'budget',
    title: 'Q1 Training Budget',
    submittedBy: 'Training Director Martinez',
    submittedByTitle: 'Training Director',
    details: 'POST recertification — 23 deputies ($43,000)',
    division: 'Training Division',
    urgent: true,
    amount: 43000,
    submittedDate: '2024-11-02',
    daysAgo: 2,
    deadlineHrs: 5,
    decisionImpactScore: 95,
    justification: 'Mandatory P.O.S.T. recertifications for 23 deputies (deadline: March 31, 2025). State mandate requires completion for deputies to maintain peace officer status. Breakdown: Firearms ($18K), Defensive tactics ($14K), Legal updates ($8K), CPR/First Aid ($3K). Group rate locked — forfeited if not paid by 1700 today.',
    aiRecommendation: {
      decision: 'approve',
      confidence: 99,
      summary: 'State legal mandate. No alternative. Denial removes 23 deputies from patrol.',
      urgencyNote: 'Vendor payment deadline 1700 today. Group rate lost if late — costs increase 30%.'
    },
    financialImpact: {
      approval: '$43,000 from Training budget (75% spent, $45K remaining). $2K buffer after approval.',
      denial: 'Avoids $43K spend today but future individual recertifications cost ~$56K (+30%). No net savings.'
    },
    complianceImpact: {
      approval: 'GA P.O.S.T. compliance maintained for all 170 sworn personnel through March 2025.',
      denial: '23 deputies lose certification and cannot legally serve as peace officers. State POST violation documented.'
    },
    staffingImpact: {
      approval: 'All 23 deputies retain deployable status. No operational disruption.',
      denial: '23 deputies removed from patrol duty. Staffing drops from 170 to 147 deployable — 3 shifts below minimum.'
    },
    operationalImpact: {
      approval: 'Training completed by March 31. No service delivery impact.',
      denial: 'Patrol capacity drops 14%. All zones understaffed. OT costs increase to cover gaps — far exceeds $43K savings.'
    },
    budgetImpact: { allocated: 180000, spent: 135000, percentUsed: 75, remainingAfter: 2000 },
    documents: ['Training_Budget_Request.pdf', 'POST_Requirements.pdf', 'Vendor_Quotes.pdf'],
  },
  {
    id: 3,
    type: 'hiring',
    title: 'Hiring Decision — Federal Deputy',
    submittedBy: 'HR Director Collins',
    submittedByTitle: 'HR Director',
    details: 'Jane Doe — Court Security (8 yrs experience)',
    division: 'Field Operations - Court Security',
    urgent: true,
    submittedDate: '2024-11-02',
    daysAgo: 2,
    deadlineHrs: 72,
    backgroundCleared: true,
    decisionImpactScore: 76,
    justification: 'Jane Doe — 8 years LE (5 Fulton County Marshal, 3 DeKalb SO). POST certified, federal court security certified, bilingual English/Spanish. Position vacant 47 days. Competing offer from Fulton County ($4K higher). Salary: $58,500. Offer expires Jan 16.',
    aiRecommendation: {
      decision: 'approve',
      confidence: 89,
      summary: 'Exceptional qualifications. Reduces $2,400/month OT immediately. Offer expires 3 days.',
      urgencyNote: 'Competing offer from Fulton County SO. Candidate will accept whichever arrives first.'
    },
    financialImpact: {
      approval: '$76,050 first year (salary $58,500 + benefits $17,550). Eliminates $2,400/mo OT = net savings of $28,800/yr.',
      denial: 'Continue $2,400/month OT ($28,800/year). Next qualified candidate not available until March 2025.'
    },
    complianceImpact: {
      approval: 'Court Security at 100% authorized staffing. Federal court contract maintained.',
      denial: 'Court Security at 87% staffing. Federal court coverage gap risk.'
    },
    staffingImpact: {
      approval: 'Vacancy filled Feb 1. Bilingual capability added. Full court coverage immediately.',
      denial: 'Position vacant minimum 2 more months. Court OT burden continues across team.'
    },
    operationalImpact: {
      approval: 'Spanish-language court capability added. Immediate deployment Feb 1 after onboarding.',
      denial: 'Court Security team continues overloaded. Morale and retention risk increases.'
    },
    budgetImpact: { firstYearCost: 58500, benefits: 17550, totalFirstYear: 76050 },
    documents: ['Resume.pdf', 'Background_Check.pdf', 'Civil_Service_Scores.pdf', 'Offer_Letter.pdf'],
  },
  {
    id: 4,
    type: 'emergency',
    title: 'Emergency HVAC Repair — H2-Pod',
    submittedBy: 'Facilities Director Brooks',
    submittedByTitle: 'Facilities Director',
    details: 'Detention HVAC failure — pod at 84°F, 36 inmates',
    division: 'Detention Facility',
    urgent: true,
    amount: 18500,
    submittedDate: '2024-11-04',
    daysAgo: 0,
    deadlineHrs: 6,
    decisionImpactScore: 97,
    justification: 'H2-Pod HVAC compressor failure at 0430. Temperature 84°F and rising (state max: 78°F). 36 inmates. Comfort Systems quoted $18,500 emergency repair (vs $12,200 standard, 3-week lead time). USMS inspection Jan 22. Contractor on standby — authorization required by 1200.',
    aiRecommendation: {
      decision: 'approve',
      confidence: 97,
      summary: 'Inmate safety at risk. State compliance violation imminent. Delay costs far more.',
      urgencyNote: 'Temperature rising ~1°F/hr. Mandatory state violation at 85°F. Contractor on standby — authorize by 1200.'
    },
    financialImpact: {
      approval: '$18,500 emergency rate vs $12,200 standard. $6,300 premium for same-day service. Budget: 64% spent, funds available.',
      denial: 'Inmate transfer costs: ~$8,000–12,000. Potential litigation exposure: unquantified. USMS contract at risk: $1.2M/yr.'
    },
    complianceImpact: {
      approval: 'ACA and state detention standards maintained. USMS inspection Jan 22 unaffected.',
      denial: 'State detention standards violation at 85°F (imminent). ACA finding. USMS inspection failure Jan 22.'
    },
    staffingImpact: {
      approval: 'No staffing changes required.',
      denial: 'Emergency pod evacuation requires 8–10 staff for 4–6 hours. Facility at 91.5% capacity — no buffer for 36 transfers.'
    },
    operationalImpact: {
      approval: 'HVAC restored within 8 hours. H2-Pod fully operational.',
      denial: 'H2-Pod taken offline. 36 inmates redistributed to already-strained pods. Federal housing at risk.'
    },
    budgetImpact: { allocated: 95000, spent: 61000, percentUsed: 64 },
    documents: ['Emergency_Work_Order.pdf', 'Contractor_Quote.pdf', 'Temperature_Log.pdf'],
  },
  {
    id: 5,
    type: 'equipment',
    title: 'Body Camera System Upgrade',
    submittedBy: 'IT Director Harrison',
    submittedByTitle: 'IT Director',
    details: '68 Axon Body 4 units — EOL Dec 31 ($125,000)',
    division: 'Administrative Services - IT',
    urgent: false,
    amount: 125000,
    submittedDate: '2024-10-28',
    daysAgo: 7,
    deadlineHrs: 432,
    vendor: 'Axon',
    decisionImpactScore: 84,
    justification: 'Current Axon Body 2 cameras (2019) reach EOL Dec 31. Vendor discontinuing cloud storage Jan 1. 68 cameras, 5-year cloud, training, warranty. Pricing locked until Jan 31 (+8% Feb 1). DOJ grant $37,500 pending — net cost $87,500.',
    aiRecommendation: {
      decision: 'approve',
      confidence: 88,
      summary: 'Current system EOL Dec 31. State compliance requires continuous camera operation.',
      considerations: 'DOJ grant ($37,500) pending — net cost $87,500 if approved.'
    },
    financialImpact: {
      approval: '$125,000 gross; $87,500 net after DOJ grant. Price locked until Jan 31 (+8% = $135K after).',
      denial: 'Camera cloud storage ends Jan 1. No recording capability. Each UOF incident creates unquantified civil liability.'
    },
    complianceImpact: {
      approval: 'GA POST evidence integrity mandate satisfied. State compliance maintained.',
      denial: 'GA POST compliance violation Jan 1. Evidence integrity gaps across 142 active cases.'
    },
    staffingImpact: {
      approval: 'No staffing impact. Auto-activation reduces officer administrative burden.',
      denial: 'Manual evidence documentation required for every incident — adds 30–45 min per officer per shift.'
    },
    operationalImpact: {
      approval: '68 cameras upgraded. 4K recording, auto-activation, real-time monitoring, 7-year cloud.',
      denial: 'Evidence gaps in 142 active cases. Civil liability on any unrecorded use-of-force incident.'
    },
    budgetImpact: { allocated: 550000, spent: 315000, percentUsed: 57, grantOffset: 37500, netCost: 87500 },
    documents: ['Equipment_Proposal.pdf', 'Vendor_Comparison.pdf', 'EOL_Notice.pdf', 'Cost_Benefit.pdf'],
  },
  {
    id: 6,
    type: 'policy',
    title: 'Use-of-Force Policy Sign-off',
    submittedBy: 'Chief Deputy Anderson',
    submittedByTitle: 'Chief Deputy',
    details: 'SOP-127 annual revision — GA POST mandate',
    division: 'Office of the Sheriff',
    urgent: false,
    submittedDate: '2024-10-30',
    daysAgo: 5,
    deadlineHrs: 408,
    decisionImpactScore: 72,
    justification: 'GA POST Rule 464-5-.03 requires annual review. SOP-127 last updated Jan 2024. Revisions: updated de-escalation requirements (Section 4.2), body camera activation mandate (Section 6.1), supervisor notification reduced to 30 min (Section 7.3). Legal review completed Dec 2. Training rollout plan ready.',
    aiRecommendation: {
      decision: 'approve',
      confidence: 94,
      summary: 'State-mandated annual review. Legal approved. No operational disruption. 15-minute sign-off.',
    },
    financialImpact: {
      approval: 'No cost. Training rollout covered under existing Q1 training budget.',
      denial: 'No immediate cost. Civil liability exposure on any UOF incident after Dec 31 using outdated policy.'
    },
    complianceImpact: {
      approval: 'GA POST Rule 464-5-.03 satisfied. Policy defensible in any UOF litigation through 2025.',
      denial: 'State compliance violation Dec 31. Any UOF incident after that date uses an expired policy.'
    },
    staffingImpact: {
      approval: 'Training rollout Jan 6–10. No patrol disruption. All personnel updated.',
      denial: 'No immediate staffing impact, but personnel operating under outdated policy creates risk.'
    },
    operationalImpact: {
      approval: 'Updated de-escalation + camera protocols active by Dec 20. Training complete Jan 10.',
      denial: 'Operations continue under Jan 2024 policy. Audit finding if inspected after Dec 31.'
    },
    documents: ['SOP-127-R1_Draft.pdf', 'Legal_Review.pdf', 'Change_Summary.pdf'],
  },
  {
    id: 7,
    type: 'mutual-aid',
    title: 'Mutual Aid Agreement',
    submittedBy: 'Captain Rodriguez',
    submittedByTitle: 'Operations Captain',
    details: 'Lawrenceville PD — Championship game traffic ($832 reimbursed)',
    division: 'Patrol Division',
    urgent: false,
    submittedDate: '2024-11-01',
    daysAgo: 3,
    deadlineHrs: 96,
    decisionImpactScore: 45,
    justification: 'Gwinnett Stadium regional championship Friday 7:30 PM. 8–10K attendance. Lawrenceville PD requests 4 GCSO units for Sugarloaf/Satellite intersection. Rate: $52/hr × 4 units × 4 hrs = $832 fully reimbursed. Joint briefing Thursday 1600.',
    aiRecommendation: {
      decision: 'approve',
      confidence: 92,
      summary: 'Fully reimbursed. No cost. Strengthens interagency relationship. Units available from A-Shift overlap.',
    },
    financialImpact: {
      approval: '$832 OT cost, fully reimbursed by Lawrenceville PD. Net cost: $0.',
      denial: 'No cost. Loss of event revenue relationship for future events.'
    },
    complianceImpact: {
      approval: 'Standard mutual aid protocol. No compliance impact.',
      denial: 'No compliance impact.'
    },
    staffingImpact: {
      approval: '4 OT units from A-Shift overlap. No regular staffing disruption.',
      denial: 'Units not needed. No staffing impact.'
    },
    operationalImpact: {
      approval: 'Safe event operations. Intersection coverage secured. Interagency relationship strengthened.',
      denial: 'Intersection coverage gap. Lawrenceville PD requests mutual aid from another agency — relationship risk.'
    },
    documents: ['Mutual_Aid_Request.pdf', 'Traffic_Plan.pdf', 'Event_Brief.pdf'],
  },
  {
    id: 8,
    type: 'leave',
    title: 'Annual Leave Request',
    submittedBy: 'Deputy Marcus Chen #4103',
    submittedByTitle: 'Deputy Sheriff',
    details: 'Dec 15–22 (8 days / 64 hrs) — coverage confirmed',
    division: 'Patrol Division - A Shift',
    urgent: false,
    submittedDate: '2024-11-01',
    daysAgo: 3,
    leaveBalance: 120,
    deadlineHrs: 96,
    decisionImpactScore: 22,
    justification: 'Pre-planned family vacation. 120 hours accrued (max 200). Coverage: Rodriguez #4087 covers Dec 15–18, Williams #4028 covers Dec 19–22. No conflicts. Last vacation July 2024. Attendance record 98% in 2024.',
    aiRecommendation: {
      decision: 'approve',
      confidence: 95,
      summary: 'Coverage confirmed. Sufficient balance. No operational conflicts. Strong attendance record.',
    },
    financialImpact: {
      approval: 'No cost. Coverage by colleagues at no additional pay.',
      denial: 'Non-refundable deposits at risk (~$1,200 estimated). Morale impact — retention risk.'
    },
    complianceImpact: {
      approval: 'No compliance impact. Leave policy followed.',
      denial: 'No compliance impact.'
    },
    staffingImpact: {
      approval: 'Patrol at 92% during leave period. Coverage pre-arranged and confirmed.',
      denial: 'Deputy Chen available but morale and trust impact. Next request window: February 2025.'
    },
    operationalImpact: {
      approval: 'Minimal impact. Shift coverage arranged across 8 days.',
      denial: 'No operational benefit. Unnecessary morale impact on high-performing deputy.'
    },
    documents: ['Leave_Request_Form.pdf', 'Coverage_Plan.pdf'],
  }
];

const INITIAL_HISTORY = [
  {
    id: 'H001', type: 'budget', title: 'Budget Approval', submittedBy: 'Fleet Division',
    details: 'New patrol vehicles (3 units)', division: 'Patrol Division', amount: 180000,
    decision: 'approved', decidedBy: 'Sheriff Thompson', decidedDate: '2024-10-25',
    decisionNotes: 'Approved to maintain fleet standards', submittedDate: '2024-10-20'
  },
  {
    id: 'H002', type: 'leave', title: 'Leave Request', submittedBy: 'Sgt. Williams',
    details: 'Personal leave: Nov 1-7', division: 'Patrol Division',
    decision: 'approved', decidedBy: 'Captain Anderson', decidedDate: '2024-10-24',
    decisionNotes: 'Coverage arranged', submittedDate: '2024-10-18'
  },
  {
    id: 'H003', type: 'equipment', title: 'Equipment Purchase', submittedBy: 'SWAT Team',
    details: 'Tactical gear upgrade', division: 'Special Operations', amount: 85000,
    decision: 'denied', decidedBy: 'Sheriff Thompson', decidedDate: '2024-10-23',
    decisionNotes: 'Budget constraints — resubmit Q1 2025', submittedDate: '2024-10-15'
  },
  {
    id: 'H004', type: 'hiring', title: 'Hiring Decision', submittedBy: 'Robert Martinez',
    details: 'Deputy Sheriff Position', division: 'Patrol Division',
    decision: 'approved', decidedBy: 'Sheriff Thompson', decidedDate: '2024-10-22',
    decisionNotes: 'Strong candidate, excellent background', submittedDate: '2024-10-10'
  },
  {
    id: 'H005', type: 'budget', title: 'Budget Approval', submittedBy: 'IT Department',
    details: 'Server upgrade', division: 'Administrative Services', amount: 65000,
    decision: 'approved', decidedBy: 'Sheriff Thompson', decidedDate: '2024-10-21',
    decisionNotes: 'Critical infrastructure', submittedDate: '2024-10-12'
  }
];

// ─── Helpers ─────────────────────────────────────────────────────

const getTypeLabel = (type) => ({
  'leave': 'Leave', 'budget': 'Budget', 'hiring': 'Hiring',
  'equipment': 'Equipment', 'overtime': 'OT', 'emergency': 'Emergency',
  'policy': 'Policy', 'mutual-aid': 'Mutual Aid'
}[type] || type);

const getTypePill = (type) => ({
  'overtime':   'bg-amber-100 border-amber-200 text-amber-700 dark:bg-amber-500/10 dark:border-amber-500/20 dark:text-amber-400',
  'budget':     'bg-green-100 border-green-200 text-green-700 dark:bg-green-500/10 dark:border-green-500/20 dark:text-green-400',
  'emergency':  'bg-red-100 border-red-200 text-red-700 dark:bg-red-500/10 dark:border-red-500/20 dark:text-red-400',
  'hiring':     'bg-slate-100 dark:bg-slate-700/40 border-slate-300 dark:border-slate-600/50 text-slate-500',
  'equipment':  'bg-violet-100 border-violet-200 text-violet-700 dark:bg-violet-500/10 dark:border-violet-500/20 dark:text-violet-400',
  'policy':     'bg-slate-400/10 border-slate-400/20 text-slate-500',
  'mutual-aid': 'bg-cyan-500/10 border-cyan-500/20 text-cyan-600 dark:text-cyan-400',
  'leave':      'bg-slate-100 dark:bg-slate-700/40 border-slate-300 dark:border-slate-600/50 text-slate-500',
}[type] || 'bg-slate-100 border-slate-300 text-slate-500');

const getImpactScoreColor = (score) => {
  if (score >= 85) return 'text-red-700 dark:text-red-400';
  if (score >= 65) return 'text-amber-700 dark:text-amber-400';
  if (score >= 40) return 'text-amber-600 dark:text-amber-500';
  return 'text-slate-500';
};

const getImpactScoreBg = (score) => {
  if (score >= 85) return 'bg-red-500/8 border-red-500/20';
  if (score >= 65) return 'bg-amber-500/8 border-amber-500/15';
  if (score >= 40) return 'bg-amber-500/5 border-amber-500/10';
  return 'bg-slate-100 dark:bg-slate-700/20 border-slate-200 dark:border-slate-700/30';
};

const getConfidenceColor = (confidence) => {
  if (confidence >= 95) return 'text-green-600 dark:text-green-400';
  if (confidence >= 85) return 'text-green-600 dark:text-green-400';
  if (confidence >= 70) return 'text-amber-700 dark:text-amber-400';
  return 'text-slate-500';
};

// ─────────────────────────────────────────────────────────────────

export default function Approvals() {
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
  const [sortBy, setSortBy] = useState('urgency');
  const [logFilter, setLogFilter] = useState('all');
  const [decisionsList, setDecisionsList] = useState(INITIAL_DECISIONS);
  const [decisionHistory, setDecisionHistory] = useState(INITIAL_HISTORY);

  // ── Derived values ──────────────────────────────────────────
  const pendingAmount = decisionsList.filter(a => a.amount).reduce((s, a) => s + a.amount, 0);
  const criticalCount = decisionsList.filter(a => a.decisionImpactScore >= 85).length;
  const urgentCount = decisionsList.filter(a => a.urgent || (a.deadlineHrs != null && a.deadlineHrs <= 24)).length;
  const riskExposureIfDenied = '$1.2M federal contract + POST violations + civil liability';

  // Top decisions for AI Executive Summary
  const topDecisions = [...decisionsList]
    .sort((a, b) => b.decisionImpactScore - a.decisionImpactScore)
    .slice(0, 3);

  // ── Urgency helpers ──────────────────────────────────────
  const getUrgencyState = (d) => {
    if (d.deadlineHrs == null) return null;
    if (d.deadlineHrs <= 0) return 'overdue';
    if (d.deadlineHrs <= 24) return 'critical';
    if (d.deadlineHrs <= 72) return 'soon';
    return null;
  };

  const getDeadlineLabel = (d) => {
    if (d.deadlineHrs == null) return null;
    if (d.deadlineHrs <= 0) return 'OVERDUE';
    if (d.deadlineHrs < 1) return `${Math.round(d.deadlineHrs * 60)}m left`;
    if (d.deadlineHrs < 24) return `${Math.round(d.deadlineHrs)}h left`;
    return `${Math.round(d.deadlineHrs / 24)}d left`;
  };

  const getPendingTime = (daysAgo) => {
    if (daysAgo === 0) return 'Today';
    if (daysAgo === 1) return '1d';
    return `${daysAgo}d`;
  };

  // ── Filter + sort ──────────────────────────────────────
  const filteredDecisions = decisionsList
    .filter(d => {
      if (filterType === 'all') return true;
      if (filterType === 'urgent') return d.urgent || (d.deadlineHrs != null && d.deadlineHrs <= 24);
      if (filterType === 'critical') return d.decisionImpactScore >= 85;
      return d.type === filterType;
    })
    .sort((a, b) => {
      const aDeadline = a.deadlineHrs ?? 9999;
      const bDeadline = b.deadlineHrs ?? 9999;
      const aUrgent = aDeadline <= 24;
      const bUrgent = bDeadline <= 24;
      if (aUrgent && !bUrgent) return -1;
      if (!aUrgent && bUrgent) return 1;
      if (aUrgent && bUrgent) return aDeadline - bDeadline;
      if (sortBy === 'amount') return (b.amount || 0) - (a.amount || 0);
      if (sortBy === 'impact') return b.decisionImpactScore - a.decisionImpactScore;
      if (sortBy === 'oldest') return b.daysAgo - a.daysAgo;
      return b.decisionImpactScore - a.decisionImpactScore;
    });

  const filteredHistory = decisionHistory.filter(h => {
    if (logFilter === 'approved') return h.decision === 'approved';
    if (logFilter === 'denied') return h.decision === 'denied';
    return true;
  });

  // ── Actions ──────────────────────────────────────────
  const openModal = (decision, action) => {
    setSelectedApproval(decision);
    setApprovalAction(action);
    setActionComment('');
  };

  const closeModal = () => {
    setSelectedApproval(null);
    setApprovalAction(null);
    setActionComment('');
  };

  const confirmAction = () => {
    if (approvalAction === 'deny' && !actionComment.trim()) {
      showToast('Please provide a reason for denial', 'error');
      return;
    }
    const newEntry = {
      id: `H${Date.now()}`,
      type: selectedApproval.type,
      title: selectedApproval.title,
      submittedBy: selectedApproval.submittedBy,
      details: selectedApproval.details,
      division: selectedApproval.division,
      amount: selectedApproval.amount || null,
      decision: approvalAction === 'approve' ? 'approved' : 'denied',
      decidedBy: 'Sheriff Thompson',
      decidedDate: new Date().toISOString().split('T')[0],
      decisionNotes: actionComment.trim() || (approvalAction === 'approve' ? 'Approved by command authority.' : 'Denied by command authority.'),
      submittedDate: selectedApproval.submittedDate,
      decisionImpactScore: selectedApproval.decisionImpactScore,
    };
    setDecisionHistory(prev => [newEntry, ...prev]);
    setDecisionsList(prev => prev.filter(a => a.id !== selectedApproval.id));
    showToast(`${selectedApproval.title} ${newEntry.decision}`, 'success');
    closeModal();
    setActiveTab('decision-log');
  };

  const showToast = (message, type = 'success') => {
    setToastMessage({ message, type });
    setTimeout(() => setToastMessage(null), 3000);
  };

  const toggleSelectItem = (id) => {
    setSelectedItems(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const toggleSelectAll = () => {
    setSelectedItems(selectedItems.length === filteredDecisions.length ? [] : filteredDecisions.map(a => a.id));
  };

  const bulkDecide = (decision) => {
    if (selectedItems.length === 0) return;
    const items = decisionsList.filter(a => selectedItems.includes(a.id));
    const newEntries = items.map(a => ({
      id: `H${Date.now()}-${a.id}`,
      type: a.type, title: a.title, submittedBy: a.submittedBy,
      details: a.details, division: a.division, amount: a.amount || null,
      decision, decidedBy: 'Sheriff Thompson',
      decidedDate: new Date().toISOString().split('T')[0],
      decisionNotes: `Bulk ${decision} by command authority.`,
      submittedDate: a.submittedDate,
    }));
    setDecisionHistory(prev => [...newEntries, ...prev]);
    setDecisionsList(prev => prev.filter(a => !selectedItems.includes(a.id)));
    showToast(`${selectedItems.length} decisions ${decision}`, 'success');
    setSelectedItems([]);
  };

  const toggleExpand = (id) => {
    setExpandedCards(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const sendInfoRequest = () => {
    if (!infoRequest.trim()) { showToast('Enter your request', 'error'); return; }
    showToast(`Information request sent to ${requestInfoModal.submittedBy}`, 'success');
    setRequestInfoModal(null);
    setInfoRequest('');
  };

  return (
    <DashboardLayout>
      <div className="p-5 lg:p-7">
        <div className="max-w-[1300px] mx-auto">

          {/* ── Page Header ─────────────────────────────────── */}
          <div className="mb-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-primary mb-1">Decision Center</h2>
                <div className="flex items-center gap-2 text-[11px] text-slate-500">
                  <span>Executive command decisions</span>
                  <span className="text-slate-700">·</span>
                  <span>{decisionsList.length} pending</span>
                  {urgentCount > 0 && <><span className="text-slate-700">·</span><span className="text-red-700 dark:text-red-400 font-semibold">{urgentCount} urgent</span></>}
                  {criticalCount > 0 && <><span className="text-slate-700">·</span><span className="text-red-700 dark:text-red-400 font-semibold">{criticalCount} critical impact</span></>}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 bg-green-500/8 border border-green-500/15 rounded text-[10px] font-semibold text-green-600 dark:text-green-400">
                  FY24 Budget: $550K remaining
                </span>
                {activeTab === 'decision-log' && (
                  <button className="flex items-center gap-1.5 px-2.5 py-1 bg-surface border border-border rounded-lg text-[11px] text-secondary hover:bg-slate-50 transition-colors">
                    <Download className="w-3 h-3" />
                    Export
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* ── AI Executive Decision Summary ─────────────── */}
          {activeTab === 'pending' && (
            <div className="mb-4 bg-slate-900 dark:bg-slate-950 border border-slate-700/60 rounded-xl overflow-hidden">
              <div className="px-4 py-2.5 border-b border-slate-700/50 flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-violet-400" />
                <span className="text-[11px] font-bold text-white uppercase tracking-wider">AI Executive Decision Summary</span>
                <div className="ml-auto flex items-center gap-4 text-[10px]">
                  <div className="flex items-center gap-1.5 text-slate-300">
                    <span className="font-mono font-bold text-white">{decisionsList.length}</span>
                    <span className="text-slate-400">pending</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-300">
                    <span className="font-mono font-bold text-white">${pendingAmount.toLocaleString()}</span>
                    <span className="text-slate-400">total value</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono font-bold text-red-400">{criticalCount}</span>
                    <span className="text-slate-400">critical impact</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-slate-400">Denial exposure:</span>
                    <span className="text-red-400 font-semibold">$1.2M+</span>
                  </div>
                </div>
              </div>

              {/* 4-stat strip */}
              <div className="grid grid-cols-4 gap-px bg-slate-700/30">
                {[
                  { label: 'Pending Decisions', value: decisionsList.length, sub: `${urgentCount} need decision today`, color: 'text-white' },
                  { label: 'Total Dollar Value', value: `$${pendingAmount.toLocaleString()}`, sub: 'Across all pending items', color: 'text-green-400' },
                  { label: 'Critical Decisions', value: criticalCount, sub: 'Impact score ≥ 85', color: 'text-red-400' },
                  { label: 'Risk If All Denied', value: '$1.2M+', sub: 'Federal contract + compliance', color: 'text-amber-400' },
                ].map((stat, i) => (
                  <div key={i} className="px-4 py-2.5 bg-slate-900 dark:bg-slate-950">
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                    <p className={`text-2xl font-black leading-none mb-0.5 ${stat.color}`}>{stat.value}</p>
                    <p className="text-[9px] text-slate-500">{stat.sub}</p>
                  </div>
                ))}
              </div>

              {/* Top decisions needing attention */}
              <div className="divide-y divide-slate-700/40">
                {topDecisions.map((d, i) => (
                  <div key={d.id} className="flex items-start gap-3 px-4 py-2.5">
                    <div className="flex items-center gap-2 flex-shrink-0 mt-0.5">
                      <span className="text-[9px] font-black text-slate-500 w-3">{i + 1}</span>
                      <div className={`text-[11px] font-black font-mono ${getImpactScoreColor(d.decisionImpactScore)}`}>{d.decisionImpactScore}</div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-[11px] font-semibold text-white">{d.title}</span>
                        {d.amount && <span className="text-[10px] font-mono text-green-400">${d.amount.toLocaleString()}</span>}
                        {d.deadlineHrs != null && d.deadlineHrs <= 24 && (
                          <span className="text-[9px] font-bold text-red-400 bg-red-500/10 border border-red-500/20 px-1 py-px rounded">{getDeadlineLabel(d)}</span>
                        )}
                      </div>
                      <p className="text-[10px] text-slate-300 leading-snug">
                        <span className="text-violet-300 font-semibold">AI ({d.aiRecommendation.confidence}% confidence): </span>
                        {d.aiRecommendation.recommendation === 'deny' ? 'Deny — ' : 'Approve — '}
                        {d.aiRecommendation.summary}
                      </p>
                      {d.aiRecommendation.urgencyNote && (
                        <p className="text-[9px] text-amber-400 mt-0.5">⚠ {d.aiRecommendation.urgencyNote}</p>
                      )}
                    </div>
                    <div className="flex gap-1.5 flex-shrink-0">
                      <button
                        onClick={() => openModal(d, 'approve')}
                        className="px-2 py-1 bg-green-500/15 hover:bg-green-500/25 border border-green-500/20 rounded text-[10px] font-bold text-green-400 transition-colors"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => openModal(d, 'deny')}
                        className="px-2 py-1 bg-red-500/10 hover:bg-red-500/20 border border-red-500/15 rounded text-[10px] font-bold text-red-400 transition-colors"
                      >
                        Deny
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── Tabs ─────────────────────────────────────────── */}
          <div className="flex gap-1.5 mb-4 border-b border-border pb-px">
            {[
              { id: 'pending', label: 'Pending Decisions', count: decisionsList.length },
              { id: 'decision-log', label: 'Decision Log', count: null },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-2.5 py-1.5 text-[11px] font-medium transition-all relative flex items-center gap-1.5 ${
                  activeTab === tab.id ? 'text-primary' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                }`}
              >
                {tab.label}
                {tab.count !== null && (
                  <span className={`px-1 py-px rounded text-[10px] ${activeTab === tab.id ? 'bg-amber-500/15 text-amber-700 dark:text-amber-400' : 'bg-slate-200 dark:bg-slate-800/50 text-slate-700 dark:text-slate-500'}`}>
                    {tab.count}
                  </span>
                )}
                {activeTab === tab.id && <div className="absolute bottom-0 left-0 right-0 h-px bg-amber-500" />}
              </button>
            ))}
          </div>

          {/* ═══════════════════════════════════════════════
              PENDING DECISIONS
              ═══════════════════════════════════════════════ */}
          {activeTab === 'pending' && (
            <>
              {/* Filter pills + sort */}
              <div className="mb-4 flex items-center gap-1.5 flex-wrap">
                {[
                  { id: 'all',       label: 'All',      count: decisionsList.length },
                  { id: 'urgent',    label: 'Urgent',   count: urgentCount },
                  { id: 'critical',  label: 'Critical Impact', count: criticalCount },
                  { id: 'budget',    label: 'Budget',   count: decisionsList.filter(a => a.type === 'budget').length },
                  { id: 'overtime',  label: 'OT',       count: decisionsList.filter(a => a.type === 'overtime').length },
                  { id: 'hiring',    label: 'Hiring',   count: decisionsList.filter(a => a.type === 'hiring').length },
                  { id: 'equipment', label: 'Equipment',count: decisionsList.filter(a => a.type === 'equipment').length },
                  { id: 'emergency', label: 'Emergency',count: decisionsList.filter(a => a.type === 'emergency').length },
                  { id: 'policy',    label: 'Policy',   count: decisionsList.filter(a => a.type === 'policy').length },
                  { id: 'leave',     label: 'Leave',    count: decisionsList.filter(a => a.type === 'leave').length },
                ].filter(o => o.id === 'all' || o.id === 'urgent' || o.id === 'critical' || o.count > 0).map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => setFilterType(opt.id)}
                    className={`px-2.5 py-1 rounded text-[11px] font-medium border transition-all ${
                      filterType === opt.id
                        ? 'bg-slate-200 dark:bg-slate-700/50 border-slate-300 dark:border-slate-600/50 text-primary'
                        : 'bg-transparent border-slate-300 dark:border-slate-700/40 text-slate-500 hover:text-secondary'
                    }`}
                  >
                    {opt.label}
                    <span className={`ml-1 ${filterType === opt.id ? 'text-slate-500' : 'text-slate-700'}`}>{opt.count}</span>
                  </button>
                ))}
                <div className="flex-1" />
                <div className="flex items-center gap-1">
                  <span className="text-[10px] text-slate-700 mr-1">Sort:</span>
                  {[
                    { id: 'impact', label: 'Impact' },
                    { id: 'urgency', label: 'Urgency' },
                    { id: 'amount', label: 'Amount' },
                  ].map(s => (
                    <button
                      key={s.id}
                      onClick={() => setSortBy(s.id)}
                      className={`px-2 py-0.5 rounded text-[10px] font-medium transition-all ${sortBy === s.id ? 'bg-slate-200 dark:bg-slate-700/50 text-primary' : 'text-slate-700 hover:text-secondary'}`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bulk toolbar */}
              {selectedItems.length > 0 && (
                <div className="mb-3 flex items-center gap-2 px-3 py-2 bg-slate-50 dark:bg-slate-800/35 border border-border rounded">
                  <CheckSquare className="w-3.5 h-3.5 text-secondary" />
                  <span className="text-[11px] font-semibold text-primary">{selectedItems.length} selected</span>
                  <div className="flex-1" />
                  <button onClick={() => bulkDecide('approved')} className="px-2 py-1 text-[10px] font-medium text-green-600 dark:text-green-400 hover:bg-green-500/10 rounded transition-colors">Approve All</button>
                  <button onClick={() => bulkDecide('denied')} className="px-2 py-1 text-[10px] font-medium text-red-700 dark:text-red-400 hover:bg-red-500/10 rounded transition-colors">Deny All</button>
                  <button onClick={() => setSelectedItems([])} className="px-2 py-1 text-[10px] font-medium text-slate-500 hover:text-slate-900 dark:hover:text-white rounded transition-colors">Clear</button>
                </div>
              )}

              {filteredDecisions.length === 0 ? (
                <div className="py-12 text-center">
                  <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400/50 mx-auto mb-3" />
                  <p className="text-sm font-semibold text-primary mb-1">All decisions complete</p>
                  <p className="text-[11px] text-slate-500">No pending decisions.</p>
                </div>
              ) : (
                <>
                  {/* Select all */}
                  <div className="mb-2 flex items-center gap-2 px-1">
                    <button onClick={toggleSelectAll} className="flex items-center gap-1.5 text-[11px] text-slate-500 hover:text-secondary transition-colors">
                      {selectedItems.length === filteredDecisions.length
                        ? <CheckSquare className="w-3.5 h-3.5 text-secondary" />
                        : <Square className="w-3.5 h-3.5" />}
                      Select all ({filteredDecisions.length})
                    </button>
                  </div>

                  {/* ── Decision Cards ─────────────────────── */}
                  <div className="space-y-px">
                    {filteredDecisions.map((decision) => {
                      const isExpanded = expandedCards.includes(decision.id);
                      const isSelected = selectedItems.includes(decision.id);
                      const urgencyState = getUrgencyState(decision);
                      const deadlineLabel = getDeadlineLabel(decision);
                      const ai = decision.aiRecommendation;

                      return (
                        <div
                          key={decision.id}
                          className={`rounded border transition-colors ${
                            isSelected
                              ? 'border-slate-600/40 bg-slate-700/[0.1]'
                              : 'border-border dark:border-slate-700/30 bg-white dark:bg-slate-800/15 hover:bg-slate-50 dark:hover:bg-slate-800/30'
                          }`}
                        >
                          {/* ── Compact Row ── */}
                          <div className="flex items-center gap-2.5 px-3.5 py-[9px]">
                            {/* Urgency strip */}
                            <div className={`w-[4px] self-stretch rounded-full flex-shrink-0 ${
                              urgencyState === 'overdue' ? 'bg-red-500' :
                              urgencyState === 'critical' ? 'bg-amber-500' :
                              urgencyState === 'soon' ? 'bg-amber-400/60' :
                              decision.decisionImpactScore >= 85 ? 'bg-red-400/50' :
                              'bg-slate-200 dark:bg-slate-700/30'
                            }`} />

                            {/* Select */}
                            <button onClick={() => toggleSelectItem(decision.id)} className="flex-shrink-0">
                              {isSelected
                                ? <CheckSquare className="w-3.5 h-3.5 text-secondary" />
                                : <Square className="w-3.5 h-3.5 text-slate-700 hover:text-slate-600 dark:text-slate-400 transition-colors" />}
                            </button>

                            {/* Impact Score */}
                            <div className={`px-1.5 py-px border rounded text-[10px] font-black font-mono flex-shrink-0 leading-tight ${getImpactScoreBg(decision.decisionImpactScore)} ${getImpactScoreColor(decision.decisionImpactScore)}`}>
                              {decision.decisionImpactScore}
                            </div>

                            {/* Type pill */}
                            <span className={`px-1.5 py-px border rounded text-[10px] font-semibold flex-shrink-0 leading-tight ${getTypePill(decision.type)}`}>
                              {getTypeLabel(decision.type)}
                            </span>

                            {/* Title + details */}
                            <span className="text-[13px] font-bold flex-1 min-w-0 truncate text-primary">
                              {decision.details}
                            </span>

                            {/* Amount */}
                            {decision.amount && (
                              <span className="text-[11px] font-semibold text-green-600 dark:text-green-400 flex-shrink-0 font-mono">
                                ${decision.amount.toLocaleString()}
                              </span>
                            )}

                            {/* Submitter */}
                            <span className="hidden lg:block text-[10px] text-slate-500 flex-shrink-0 max-w-[130px] truncate">
                              {decision.submittedBy.split(' (')[0].split(' #')[0]}
                            </span>

                            {/* Age */}
                            <span className="text-[10px] text-slate-700 flex-shrink-0 font-mono">
                              {getPendingTime(decision.daysAgo)}
                            </span>

                            {/* Deadline */}
                            {deadlineLabel && (
                              <span className={`px-1.5 py-px border rounded text-[10px] font-bold flex-shrink-0 ${
                                urgencyState === 'overdue' || urgencyState === 'critical'
                                  ? 'bg-red-100 border-red-200 text-red-700 dark:bg-red-500/10 dark:border-red-500/20 dark:text-red-400'
                                  : 'bg-amber-500/8 border-amber-500/15 text-amber-700 dark:text-amber-400'
                              }`}>
                                {deadlineLabel}
                              </span>
                            )}

                            {/* AI recommendation inline */}
                            {ai && (
                              <span className={`hidden md:inline-flex items-center gap-1 px-1.5 py-px rounded text-[10px] font-semibold flex-shrink-0 border ${
                                ai.decision === 'approve'
                                  ? 'bg-green-500/8 border-green-500/15 text-green-600 dark:text-green-400'
                                  : 'bg-red-500/8 border-red-500/15 text-red-700 dark:text-red-400'
                              }`}>
                                <Sparkles className="w-2.5 h-2.5" />
                                {ai.decision === 'approve' ? 'Approve' : 'Deny'} · {ai.confidence}%
                              </span>
                            )}

                            {/* Action buttons */}
                            <div className="flex items-center gap-1 flex-shrink-0 ml-1">
                              <button
                                onClick={() => openModal(decision, 'approve')}
                                className="p-1 rounded hover:bg-green-500/15 transition-colors"
                                title="Approve"
                              >
                                <ThumbsUp className="w-3.5 h-3.5 text-green-600 dark:text-green-400" />
                              </button>
                              <button
                                onClick={() => openModal(decision, 'deny')}
                                className="p-1 rounded hover:bg-red-500/15 transition-colors"
                                title="Deny"
                              >
                                <XCircle className="w-3.5 h-3.5 text-red-700 dark:text-red-400" />
                              </button>
                              <button
                                onClick={() => toggleExpand(decision.id)}
                                className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-700/30 transition-colors"
                              >
                                {isExpanded ? <ChevronUp className="w-3.5 h-3.5 text-slate-500" /> : <ChevronDown className="w-3.5 h-3.5 text-slate-500" />}
                              </button>
                            </div>
                          </div>

                          {/* ── Expanded: Full Impact Analysis ── */}
                          {isExpanded && (
                            <div className="border-t border-border dark:border-slate-700/30 ml-[22px]">

                              {/* AI Recommendation Panel */}
                              <div className="px-3 pt-3 pb-2 border-b border-border dark:border-slate-700/20 bg-slate-900/[0.02] dark:bg-slate-900/30">
                                <div className="flex items-start gap-2.5">
                                  <div className="flex-shrink-0 mt-0.5">
                                    <Sparkles className="w-3.5 h-3.5 text-violet-500 dark:text-violet-400" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">AI Recommendation</span>
                                      <span className={`px-1.5 py-px border rounded text-[10px] font-bold ${
                                        ai.decision === 'approve'
                                          ? 'bg-green-100 border-green-200 text-green-700 dark:bg-green-500/10 dark:border-green-500/20 dark:text-green-400'
                                          : 'bg-red-100 border-red-200 text-red-700 dark:bg-red-500/10 dark:border-red-500/20 dark:text-red-400'
                                      }`}>
                                        {ai.decision === 'approve' ? 'APPROVE' : 'DENY'}
                                      </span>
                                      <div className="flex items-center gap-1.5 ml-1">
                                        <span className="text-[9px] text-slate-500 uppercase font-bold">Confidence</span>
                                        <div className="w-20 bg-slate-200 dark:bg-slate-700/50 rounded-full h-1">
                                          <div className={`h-1 rounded-full ${ai.confidence >= 90 ? 'bg-green-500' : ai.confidence >= 75 ? 'bg-amber-500' : 'bg-slate-400'}`} style={{ width: `${ai.confidence}%` }} />
                                        </div>
                                        <span className={`text-[10px] font-bold ${getConfidenceColor(ai.confidence)}`}>{ai.confidence}%</span>
                                      </div>
                                    </div>
                                    <p className="text-[11px] text-secondary leading-snug">{ai.summary}</p>
                                    {ai.urgencyNote && (
                                      <p className="text-[10px] text-amber-700 dark:text-amber-400 mt-0.5 flex items-center gap-1">
                                        <AlertTriangle className="w-2.5 h-2.5" />
                                        {ai.urgencyNote}
                                      </p>
                                    )}
                                    {ai.considerations && (
                                      <p className="text-[10px] text-slate-500 mt-0.5">{ai.considerations}</p>
                                    )}
                                  </div>
                                  {/* Impact score + submitter */}
                                  <div className="flex-shrink-0 text-right">
                                    <div className={`text-2xl font-black font-mono leading-none ${getImpactScoreColor(decision.decisionImpactScore)}`}>{decision.decisionImpactScore}</div>
                                    <div className="text-[9px] text-slate-500 mt-0.5">Impact Score</div>
                                    <div className="text-[9px] text-slate-500 mt-1">{decision.submittedBy.split(' (')[0].split(' #')[0]}</div>
                                    <div className="text-[9px] text-slate-700">{decision.division}</div>
                                  </div>
                                </div>
                              </div>

                              {/* Justification */}
                              <div className="px-3 py-2 border-b border-border dark:border-slate-700/20">
                                <p className="text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-1">Request Justification</p>
                                <p className="text-[11px] text-secondary leading-relaxed">{decision.justification}</p>
                                {decision.backgroundCleared && (
                                  <p className="text-[10px] text-green-600 dark:text-green-400 mt-1 flex items-center gap-1">
                                    <CheckCircle className="w-2.5 h-2.5" />
                                    Background check cleared
                                  </p>
                                )}
                                {decision.leaveBalance && (
                                  <p className="text-[10px] text-slate-500 mt-1">Leave balance: {decision.leaveBalance} hrs accrued</p>
                                )}
                              </div>

                              {/* 4-Dimension Impact Analysis */}
                              <div className="border-b border-border dark:border-slate-700/20">
                                <div className="px-3 pt-2 pb-1">
                                  <p className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">Decision Impact Analysis</p>
                                </div>
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-slate-100 dark:bg-slate-700/20">
                                  {[
                                    { icon: DollarSign, label: 'Financial Impact', key: 'financialImpact', iconColor: 'text-green-600 dark:text-green-400' },
                                    { icon: Shield, label: 'Compliance Impact', key: 'complianceImpact', iconColor: 'text-violet-600 dark:text-violet-400' },
                                    { icon: Users, label: 'Staffing Impact', key: 'staffingImpact', iconColor: 'text-blue-600 dark:text-blue-400' },
                                    { icon: Activity, label: 'Operational Impact', key: 'operationalImpact', iconColor: 'text-amber-600 dark:text-amber-400' },
                                  ].map(({ icon: Icon, label, key, iconColor }) => (
                                    <div key={key} className="bg-white dark:bg-slate-800/15 px-3 py-2.5">
                                      <div className="flex items-center gap-1.5 mb-2">
                                        <Icon className={`w-3 h-3 ${iconColor}`} />
                                        <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">{label}</span>
                                      </div>
                                      <div className="grid grid-cols-2 gap-2">
                                        <div className="bg-green-500/[0.03] border border-green-500/10 rounded p-1.5">
                                          <p className="text-[9px] font-bold text-green-600 dark:text-green-400 mb-0.5">IF APPROVED</p>
                                          <p className="text-[10px] text-secondary leading-snug">{decision[key]?.approval}</p>
                                        </div>
                                        <div className="bg-red-500/[0.02] border border-red-500/10 rounded p-1.5">
                                          <p className="text-[9px] font-bold text-red-700 dark:text-red-400 mb-0.5">IF DENIED</p>
                                          <p className="text-[10px] text-secondary leading-snug">{decision[key]?.denial}</p>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>

                                {/* Budget position (when relevant) */}
                                {decision.budgetImpact && (
                                  <div className="px-3 py-2 bg-white dark:bg-slate-800/10 border-t border-border dark:border-slate-700/20">
                                    <div className="flex items-center gap-4 text-[10px] flex-wrap">
                                      <span className="text-slate-500 font-semibold">Budget Position:</span>
                                      {decision.budgetImpact.allocated && (
                                        <span className="text-secondary">Allocated: <span className="text-primary font-mono">${decision.budgetImpact.allocated.toLocaleString()}</span></span>
                                      )}
                                      {decision.budgetImpact.spent && (
                                        <span className="text-secondary">Spent: <span className="text-primary font-mono">${decision.budgetImpact.spent.toLocaleString()}</span></span>
                                      )}
                                      {decision.budgetImpact.percentUsed && (
                                        <span className={decision.budgetImpact.percentUsed >= 90 ? 'text-red-700 dark:text-red-400 font-semibold' : decision.budgetImpact.percentUsed >= 75 ? 'text-amber-700 dark:text-amber-400' : 'text-green-600 dark:text-green-400'}>
                                          {decision.budgetImpact.percentUsed}% used
                                        </span>
                                      )}
                                      {decision.budgetImpact.grantOffset && (
                                        <span className="text-green-600 dark:text-green-400">DOJ Grant offset: ${decision.budgetImpact.grantOffset.toLocaleString()} → Net: ${decision.budgetImpact.netCost?.toLocaleString()}</span>
                                      )}
                                      {decision.budgetImpact.remainingAfter && (
                                        <span className={decision.budgetImpact.remainingAfter < 5000 ? 'text-red-700 dark:text-red-400 font-semibold' : 'text-secondary'}>
                                          After approval: ${decision.budgetImpact.remainingAfter.toLocaleString()} remaining
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                )}
                              </div>

                              {/* Documents + actions */}
                              <div className="px-3 py-2.5">
                                {decision.documents && decision.documents.length > 0 && (
                                  <div className="flex items-center gap-2 flex-wrap mb-2.5">
                                    <FileCheck className="w-3 h-3 text-slate-700" />
                                    {decision.documents.map((doc, idx) => (
                                      <button key={idx} className="flex items-center gap-1 px-1.5 py-0.5 bg-slate-100/80 dark:bg-slate-800/30 hover:bg-slate-200 dark:hover:bg-slate-700/30 border border-border dark:border-slate-700/30 rounded text-[10px] text-secondary transition-colors">
                                        <FileText className="w-2.5 h-2.5" />
                                        {doc}
                                      </button>
                                    ))}
                                  </div>
                                )}
                                <div className="flex items-center gap-2 pt-1 border-t border-border">
                                  <button
                                    onClick={() => setRequestInfoModal(decision)}
                                    className="px-2 py-1 text-[10px] font-medium text-secondary hover:bg-slate-100 dark:hover:bg-slate-700/20 rounded transition-colors flex items-center gap-1"
                                  >
                                    <Info className="w-3 h-3" />
                                    Request Info
                                  </button>
                                  <div className="flex-1" />
                                  <button
                                    onClick={() => openModal(decision, 'approve')}
                                    className="px-4 py-1.5 bg-green-500/10 border border-green-500/20 hover:bg-green-500/20 rounded text-[11px] font-bold text-green-600 dark:text-green-400 transition-colors flex items-center gap-1.5"
                                  >
                                    <ThumbsUp className="w-3 h-3" />
                                    Approve
                                  </button>
                                  <button
                                    onClick={() => openModal(decision, 'deny')}
                                    className="px-4 py-1.5 bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 rounded text-[11px] font-bold text-red-700 dark:text-red-400 transition-colors flex items-center gap-1.5"
                                  >
                                    <XCircle className="w-3 h-3" />
                                    Deny
                                  </button>
                                </div>
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

          {/* ═══════════════════════════════════════════════
              DECISION LOG
              ═══════════════════════════════════════════════ */}
          {activeTab === 'decision-log' && (
            <>
              <div className="mb-4 flex items-center gap-1.5 flex-wrap">
                {[
                  { id: 'all',      label: 'All',      count: decisionHistory.length },
                  { id: 'approved', label: 'Approved', count: decisionHistory.filter(h => h.decision === 'approved').length },
                  { id: 'denied',   label: 'Denied',   count: decisionHistory.filter(h => h.decision === 'denied').length },
                ].map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => setLogFilter(opt.id)}
                    className={`px-2.5 py-1 rounded text-[11px] font-medium border transition-all ${
                      logFilter === opt.id
                        ? 'bg-slate-200 dark:bg-slate-700/50 border-slate-300 dark:border-slate-600/50 text-primary'
                        : 'bg-transparent border-slate-300 dark:border-slate-700/40 text-slate-500 hover:text-secondary'
                    }`}
                  >
                    {opt.label}
                    <span className={`ml-1 ${logFilter === opt.id ? 'text-slate-500' : 'text-slate-700'}`}>{opt.count}</span>
                  </button>
                ))}
                <div className="flex-1" />
                <div className="relative max-w-[240px]">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-700" />
                  <input
                    type="text"
                    placeholder="Search log..."
                    className="w-full pl-8 pr-3 py-1 bg-surface border border-slate-300 dark:border-slate-700/40 rounded text-[11px] text-primary placeholder-slate-500 dark:placeholder-slate-600 focus:outline-none focus:border-slate-600/50"
                  />
                </div>
              </div>

              <div className="border border-border dark:border-slate-700/30 rounded overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="px-3 py-2 text-left text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Type</th>
                      <th className="px-3 py-2 text-left text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Decision</th>
                      <th className="px-3 py-2 text-left text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Division</th>
                      <th className="px-3 py-2 text-left text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Amount</th>
                      <th className="px-3 py-2 text-left text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Outcome</th>
                      <th className="px-3 py-2 text-left text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Decided By</th>
                      <th className="px-3 py-2 text-left text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Date</th>
                      <th className="px-3 py-2 text-right text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredHistory.map((item) => (
                      <tr key={item.id} className="border-b border-slate-100 dark:border-slate-800/10 hover:bg-slate-50 dark:hover:bg-slate-800/15 transition-colors">
                        <td className="px-3 py-2.5">
                          <span className="text-[11px] text-secondary capitalize">{getTypeLabel(item.type)}</span>
                        </td>
                        <td className="px-3 py-2.5">
                          <p className="text-[11px] font-semibold text-primary">{item.title}</p>
                          <p className="text-[10px] text-slate-500">{item.submittedBy} · {item.details}</p>
                        </td>
                        <td className="px-3 py-2.5">
                          <span className="text-[11px] text-secondary">{item.division}</span>
                        </td>
                        <td className="px-3 py-2.5">
                          {item.amount
                            ? <span className="text-[11px] font-mono text-green-600 dark:text-green-400">${item.amount.toLocaleString()}</span>
                            : <span className="text-[11px] text-slate-700">—</span>
                          }
                        </td>
                        <td className="px-3 py-2.5">
                          <span className={`inline-flex items-center gap-1 px-1.5 py-px rounded text-[10px] font-bold border ${
                            item.decision === 'approved'
                              ? 'bg-green-100 border-green-200 text-green-700 dark:bg-green-500/10 dark:border-green-500/20 dark:text-green-400'
                              : 'bg-red-100 border-red-200 text-red-700 dark:bg-red-500/10 dark:border-red-500/20 dark:text-red-400'
                          }`}>
                            {item.decision === 'approved' ? <CheckCircle className="w-2.5 h-2.5" /> : <XCircle className="w-2.5 h-2.5" />}
                            {item.decision === 'approved' ? 'Approved' : 'Denied'}
                          </span>
                        </td>
                        <td className="px-3 py-2.5">
                          <span className="text-[11px] text-secondary">{item.decidedBy}</span>
                        </td>
                        <td className="px-3 py-2.5">
                          <span className="text-[10px] text-slate-500 font-mono">{new Date(item.decidedDate).toLocaleDateString()}</span>
                        </td>
                        <td className="px-3 py-2.5 text-right">
                          <button
                            onClick={() => setHistoryDetailModal(item)}
                            className="text-[10px] text-secondary hover:text-primary transition-colors"
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

      {/* ── Decision Modal ── */}
      {selectedApproval && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={closeModal} />
          <div className="relative bg-white dark:bg-slate-900 border border-border rounded-2xl p-6 max-w-md w-full shadow-2xl">
            <div className="flex items-start gap-4 mb-5">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${approvalAction === 'approve' ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
                {approvalAction === 'approve'
                  ? <ThumbsUp className="w-5 h-5 text-green-600 dark:text-green-400" />
                  : <XCircle className="w-5 h-5 text-red-700 dark:text-red-400" />}
              </div>
              <div className="flex-1">
                <h3 className="text-base font-bold text-primary mb-0.5">
                  {approvalAction === 'approve' ? 'Approve' : 'Deny'}: {selectedApproval.title}
                </h3>
                <p className="text-[11px] text-secondary">{selectedApproval.details}</p>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className={`text-[11px] font-bold font-mono ${getImpactScoreColor(selectedApproval.decisionImpactScore)}`}>
                    Impact: {selectedApproval.decisionImpactScore}/100
                  </span>
                  <span className="text-slate-700">·</span>
                  <span className={`text-[11px] ${getConfidenceColor(selectedApproval.aiRecommendation.confidence)}`}>
                    AI {selectedApproval.aiRecommendation.decision === 'approve' ? 'recommends approval' : 'recommends denial'} ({selectedApproval.aiRecommendation.confidence}% confidence)
                  </span>
                </div>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-[11px] font-semibold text-secondary mb-1.5">
                {approvalAction === 'approve' ? 'Decision rationale (optional)' : 'Reason for denial (required)'}
              </label>
              <textarea
                value={actionComment}
                onChange={(e) => setActionComment(e.target.value)}
                placeholder={approvalAction === 'approve' ? 'Add rationale for audit trail...' : 'Provide reason for denial...'}
                rows={3}
                className="w-full px-3 py-2 bg-surface border border-border rounded-lg text-primary text-xs placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-amber-500/50 resize-none"
              />
            </div>
            <div className="flex gap-2">
              <button onClick={closeModal} className="flex-1 px-4 py-2.5 bg-surface hover:bg-slate-50 dark:hover:bg-slate-800/60 border border-slate-300 dark:border-slate-700/50 rounded-xl text-slate-700 dark:text-white font-medium transition-all text-sm">
                Cancel
              </button>
              <button
                onClick={confirmAction}
                className={`flex-1 px-4 py-2.5 rounded-xl text-white font-medium transition-all text-sm ${approvalAction === 'approve' ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'}`}
              >
                Confirm {approvalAction === 'approve' ? 'Approval' : 'Denial'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── History Detail Modal ── */}
      {historyDetailModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setHistoryDetailModal(null)} />
          <div className="relative bg-white dark:bg-slate-900 border border-border rounded-2xl p-5 max-w-lg w-full shadow-2xl">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-primary mb-0.5">{historyDetailModal.title}</h3>
                <p className="text-[11px] text-secondary">{historyDetailModal.details}</p>
              </div>
              <button onClick={() => setHistoryDetailModal(null)} className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800/50 rounded-lg transition-colors">
                <X className="w-4 h-4 text-secondary" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2 mb-4 text-[10px]">
              <div className="bg-slate-50 dark:bg-slate-800/30 rounded-lg p-2.5 border border-border">
                <p className="text-slate-500 mb-0.5">Submitted By</p>
                <p className="font-medium text-primary">{historyDetailModal.submittedBy}</p>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800/30 rounded-lg p-2.5 border border-border">
                <p className="text-slate-500 mb-0.5">Division</p>
                <p className="font-medium text-primary">{historyDetailModal.division}</p>
              </div>
              {historyDetailModal.amount && (
                <div className="bg-slate-50 dark:bg-slate-800/30 rounded-lg p-2.5 border border-border">
                  <p className="text-slate-500 mb-0.5">Amount</p>
                  <p className="font-medium text-green-600 dark:text-green-400">${historyDetailModal.amount.toLocaleString()}</p>
                </div>
              )}
              <div className="bg-slate-50 dark:bg-slate-800/30 rounded-lg p-2.5 border border-border">
                <p className="text-slate-500 mb-0.5">Submitted</p>
                <p className="font-medium text-primary">{new Date(historyDetailModal.submittedDate).toLocaleDateString()}</p>
              </div>
            </div>
            <div className={`p-3 rounded-xl border ${historyDetailModal.decision === 'approved' ? 'bg-green-500/10 border-green-500/30' : 'bg-red-500/10 border-red-500/30'}`}>
              <div className="flex items-center justify-between mb-2">
                <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded text-[11px] font-bold ${historyDetailModal.decision === 'approved' ? 'text-green-600 dark:text-green-400' : 'text-red-700 dark:text-red-400'}`}>
                  {historyDetailModal.decision === 'approved' ? <CheckCircle className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                  {historyDetailModal.decision.toUpperCase()}
                </span>
                <div className="text-right text-[10px]">
                  <p className="text-secondary">{historyDetailModal.decidedBy}</p>
                  <p className="text-slate-500">{new Date(historyDetailModal.decidedDate).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="bg-slate-50 dark:bg-slate-900/50 rounded p-2.5 border border-slate-200 dark:border-transparent">
                <p className="text-[10px] text-secondary">{historyDetailModal.decisionNotes}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Request Info Modal ── */}
      {requestInfoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => { setRequestInfoModal(null); setInfoRequest(''); }} />
          <div className="relative bg-white dark:bg-slate-900 border border-border rounded-2xl p-5 max-w-md w-full shadow-2xl">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-primary mb-0.5">Request More Information</h3>
                <p className="text-[11px] text-secondary">{requestInfoModal.submittedBy} · {requestInfoModal.title}</p>
              </div>
              <button onClick={() => { setRequestInfoModal(null); setInfoRequest(''); }} className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800/50 rounded-lg transition-colors">
                <X className="w-4 h-4 text-secondary" />
              </button>
            </div>
            <textarea
              value={infoRequest}
              onChange={(e) => setInfoRequest(e.target.value)}
              placeholder="What additional information do you need?"
              rows={4}
              className="w-full px-3 py-2 bg-surface border border-border rounded-lg text-primary text-sm placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500/50 resize-none mb-3"
            />
            <div className="flex gap-2">
              <button onClick={() => { setRequestInfoModal(null); setInfoRequest(''); }} className="flex-1 px-3 py-2 text-xs font-medium text-slate-700 border border-slate-300 hover:bg-slate-50 rounded-lg transition-colors">Cancel</button>
              <button onClick={sendInfoRequest} className="flex-1 px-3 py-2 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors flex items-center justify-center gap-1.5">
                <Send className="w-3.5 h-3.5" />
                Send Request
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Toast ── */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50">
          <div className={`px-4 py-3 rounded-xl border shadow-2xl flex items-center gap-2 ${
            toastMessage.type === 'success'
              ? 'bg-green-500/20 border-green-500/30 text-green-600 dark:text-green-400'
              : 'bg-red-500/20 border-red-500/30 text-red-700 dark:text-red-400'
          }`}>
            {toastMessage.type === 'success' ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
            <p className="text-[11px] font-medium">{toastMessage.message}</p>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

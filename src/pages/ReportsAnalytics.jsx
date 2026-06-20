import React, { useState, useRef } from 'react';
import {
  Users, FileText, TrendingUp, TrendingDown, Search, DollarSign, CheckCircle, Shield,
  Download, Calendar, BarChart3, Activity, Clock, ArrowUpRight, ArrowDownRight,
  Eye, RefreshCw, FileSpreadsheet, Building2, Target, Plus, BookOpen,
  PlayCircle, Printer, ShieldCheck, Phone, CalendarClock, Zap, X,
  Brain, Sparkles, AlertTriangle, MapPin, Award, Flag, Scale, ListChecks,
  Lightbulb, ChevronDown, ChevronUp, Crosshair, Minus
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';

// ── Design system constants (matches BudgetResources) ─────────
const CARD = 'bg-white dark:bg-zinc-900/25 border border-slate-200 dark:border-slate-700/30 rounded-xl';
const CARD_HEADER = 'flex items-center justify-between px-5 py-3.5 border-b border-slate-100 dark:border-slate-800/60';
const BADGE = (color) => {
  if (color === 'red')    return 'px-2 py-0.5 text-[10px] font-bold rounded border bg-red-100 dark:bg-red-500/10 text-red-700 dark:text-red-400 border-red-200 dark:border-red-500/20';
  if (color === 'amber')  return 'px-2 py-0.5 text-[10px] font-bold rounded border bg-amber-100 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-500/20';
  if (color === 'orange') return 'px-2 py-0.5 text-[10px] font-bold rounded border bg-orange-100 dark:bg-orange-500/10 text-orange-700 dark:text-orange-400 border-orange-200 dark:border-orange-500/20';
  if (color === 'green')  return 'px-2 py-0.5 text-[10px] font-bold rounded border bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20';
  if (color === 'blue')   return 'px-2 py-0.5 text-[10px] font-bold rounded border bg-blue-100 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-500/20';
  if (color === 'violet') return 'px-2 py-0.5 text-[10px] font-bold rounded border bg-violet-100 dark:bg-violet-500/10 text-violet-700 dark:text-violet-400 border-violet-200 dark:border-violet-500/20';
  return 'px-2 py-0.5 text-[10px] font-bold rounded border bg-slate-100 dark:bg-zinc-800/40 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-600/30';
};
const primaryBtn = 'inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-lg text-[11px] font-bold bg-amber-500 hover:bg-amber-600 text-white border border-amber-600/40 transition-colors';
const secondaryBtn = 'inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-lg text-[11px] font-semibold bg-white dark:bg-zinc-900/60 hover:bg-slate-50 dark:hover:bg-zinc-800/60 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/40 transition-colors';
// AI insight callout — used wherever the model explains a metric, not just states it
const AI_CALLOUT = 'flex items-start gap-2.5 p-3 bg-amber-50 dark:bg-amber-500/5 border border-amber-200 dark:border-amber-500/20 rounded-lg';

export default function PerformanceCompliance() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [timeRange, setTimeRange] = useState('ytd');
  const [reportDetailModal, setReportDetailModal] = useState(null);
  const [exportModal, setExportModal] = useState(false);
  const [scheduleModal, setScheduleModal] = useState(false);
  const [customReportModal, setCustomReportModal] = useState(false);
  const [comparisonModal, setComparisonModal] = useState(false);
  const [filterCategory, setFilterCategory] = useState('all');
  const [actionedIds, setActionedIds] = useState(new Set());
  const [expandedSummaries, setExpandedSummaries] = useState(new Set());
  const [toast, setToast] = useState(null);
  const toastTimerRef = useRef(null);

  const reportActions = [
    {
      id: 'ra-1',
      urgency: 'Critical',
      decision: 'Sign and submit USMS Inspection Compliance Report.',
      ifIgnored: 'ACA accreditation review blocked — finding risk increases.',
      countdown: '48 hrs',
      actionLabel: 'Sign & Submit',
    },
    {
      id: 'ra-2',
      urgency: 'Critical',
      decision: 'Approve Q4 Overtime Variance Report — Patrol 19% over allocation.',
      ifIgnored: 'Finance cannot close Q4 budget without command sign-off.',
      countdown: '3 days',
      actionLabel: 'Approve',
    },
    {
      id: 'ra-3',
      urgency: 'High',
      decision: 'Certify Annual POST Compliance Report — 8 deputies expiring.',
      ifIgnored: '8 deputies lose enforcement authority Jan 31.',
      countdown: '7 days',
      actionLabel: 'Certify',
    },
    {
      id: 'ra-4',
      urgency: 'Normal',
      decision: 'Schedule Q1 2026 Executive Performance Review Briefing.',
      ifIgnored: 'KPI review delayed — corrective actions pushed to Q2.',
      countdown: '14 days',
      actionLabel: 'Schedule',
    },
  ];

  // ── AI Command Assessment — generated each morning from the metrics below ──
  const aiCommandAssessment = {
    status: 'Stable',
    statusNote: 'No critical operational failures detected. 2 items below require command attention this week.',
    generatedAt: 'Generated 06:42 today · refreshes every 4 hrs',
    findings: [
      { text: 'Patrol Division staffing is 14 positions below authorized strength, the leading driver of overtime growth.', severity: 'high' },
      { text: 'Department-wide clearance rate is 1.5 pts below the 70% target, concentrated in property crime cases.', severity: 'medium' },
      { text: 'Overtime spend is trending 6% above the FY26 forecast for the third straight month.', severity: 'medium' },
      { text: 'Response times remain within an acceptable range across all priority levels.', severity: 'good' },
    ],
    recommendedActions: [
      { text: 'Prioritize Patrol Division recruitment — 14 vacancies are the single largest driver of OT exposure.', cta: 'Open Division Intel', tab: 'operations' },
      { text: 'Reallocate 1–2 investigators to the Property Crime unit to close the clearance gap.', cta: 'Review Division Rankings', tab: 'operations' },
      { text: 'Escalate the ACA HVAC remediation before the 48-hr deadline — audit risk has moved from Low to High.', cta: 'Open Compliance & Liability', tab: 'compliance' },
    ],
  };

  // ── Liability Exposure — snapshot shown on Overview, full detail on Compliance & Liability ──
  const liabilityExposure = {
    level: 'Moderate',
    trendNote: 'Up from Low 60 days ago',
    financialEstimate: 1180000,
    topDrivers: [
      'ACA Detention — 2 open findings, HVAC remediation overdue',
      'GA POST — 8 deputy certifications expire within 30 days',
      'PREA — external audit window opens in 110 days, no prep plan on file',
    ],
  };

  const complianceItems = [
    {
      label: 'CJIS Security Policy', area: 'IT Security / Records',
      status: 'Compliant', pct: 100,
      detail: 'v5.9 — all 164 staff certified',
      nextReview: 'Nov 2026',
      findings: 0,
      aiInsight: 'CJIS compliance has held at 100% for 11 consecutive months. No findings are open and no action is required.',
      route: '/command/risk',
    },
    {
      label: 'ACA Detention Standards', area: 'Detention',
      status: 'At Risk', pct: 62,
      detail: '2 open findings — HVAC remediation overdue',
      nextReview: 'Jan 2026 (reaccreditation)',
      findings: 2,
      aiInsight: 'ACA compliance has fallen from 81% to 62% over the last 60 days. The HVAC finding is past its original remediation window, and a second finding (fire-extinguisher inspection logs) was opened 12 days ago. Estimated audit risk has moved from Low to High. Recommended action: escalate HVAC remediation to County Facilities today and assign a Corrective Action Plan owner for both findings before the 48-hr deadline.',
      route: '/command/risk',
    },
    {
      label: 'PREA Standards', area: 'Detention',
      status: 'At Risk', pct: 92,
      detail: '2 unresolved findings, 1 staff recert overdue',
      nextReview: 'Oct 2026 (external audit)',
      findings: 3,
      aiInsight: 'PREA compliance has fallen 4% over the last 60 days. Two unresolved findings and one overdue staff certification are driving risk. Estimated audit risk has increased from Low to Moderate. Recommended action: schedule the overdue staff recertification within 14 days and assign owners to the two open findings.',
      route: '/command/risk',
    },
    {
      label: 'GA POST Certification', area: 'Personnel',
      status: 'Action Needed', pct: 45,
      detail: '8 deputies expiring within 30 days',
      nextReview: 'Jan 2026',
      findings: 8,
      aiInsight: '8 of 164 commissioned staff have POST certifications expiring within 30 days, including 3 in Patrol Division. If unaddressed, these deputies lose arrest authority on Jan 31 — a direct operational and liability exposure. Recommended action: enroll all 8 in the Jan 12–16 recertification cohort and confirm with command sign-off.',
      route: '/hr/training',
    },
  ];

  const correctiveActionPlans = [
    { id: 'cap-1', finding: 'ACA — HVAC remediation, Detention Pod B',          owner: 'Unassigned',     due: 'Jun 17, 2026 (48 hrs)', status: 'Overdue',     severity: 'Critical' },
    { id: 'cap-2', finding: 'ACA — Fire extinguisher inspection logs incomplete', owner: 'Unassigned',     due: 'Jun 30, 2026',          status: 'Open',        severity: 'High' },
    { id: 'cap-3', finding: 'PREA — Staff recertification overdue (1 staff member)', owner: 'Training Division', due: 'Jun 29, 2026',     status: 'In Progress', severity: 'Medium' },
    { id: 'cap-4', finding: 'PREA — Audit-prep plan not on file',               owner: 'Unassigned',     due: 'Jul 15, 2026',          status: 'Open',        severity: 'Medium' },
    { id: 'cap-5', finding: 'GA POST — 8 deputy certifications expiring',       owner: 'HR / Training',  due: 'Jan 31, 2026',          status: 'In Progress', severity: 'High' },
  ];

  const useOfForceReview = {
    status: 'On Track',
    last90: 7,
    pendingReview: 2,
    overdue: 0,
    detail: '2 incidents currently in 30-day command review — both within the policy window. 0 overdue.',
    aiInsight: 'Use-of-force review timeliness is within the 30-day policy window for all open incidents. No early-warning indicators have been triggered in the last 90 days.',
  };

  const internalAffairsTrends = {
    open: 3,
    filedLast90: 5,
    changeVsPrior: -17,
    detail: '3 open cases (2 administrative, 1 use-of-force-related). Complaint volume down 17% vs the prior 90-day period.',
    aiInsight: 'No officer currently has more than one open complaint, and no early-intervention flags have been triggered. The complaint volume trend is favorable.',
  };

  const financialExposure = {
    total: 1180000,
    drivers: [
      { label: 'ACA non-reaccreditation risk (state per-diem reimbursement)', amount: 640000 },
      { label: 'PREA audit failure — potential grant funding hold', amount: 310000 },
      { label: 'POST decertification — liability if deputies act without valid certification', amount: 175000 },
      { label: 'Use-of-force / training certification gaps', amount: 55000 },
    ],
  };

  const riskForecast = {
    outlook: 'Liability exposure is projected to move from Moderate to High within 14 days if the ACA findings and POST certification gap remain unresolved.',
    recommendedActions: [
      'Escalate the ACA HVAC remediation to County Facilities and assign an owner today',
      'Confirm enrollment of all 8 deputies in the Jan 12–16 POST recertification cohort',
      'Assign a PREA audit-prep lead and schedule a readiness review within 14 days',
    ],
  };

  const keyMetrics = {
    callsForService: {
      total: 145678, change: 5.2,
      rootCause: [
        'Population growth in unincorporated districts (+3.1% YoY)',
        'Summer months historically run 14–18% above the winter baseline',
        'Expanded mental health co-response referrals (+860 calls YTD)',
      ],
      forecast: { day30: '+4,200 calls', day90: '+19,800 calls', risk: 'Medium' },
    },
    responseTime: {
      average: 8.4, target: 8.0,
      rootCause: [
        'Patrol Division staffing is 8% below authorized strength',
        'Call volume up 5.2% YoY without a proportional increase in patrol units',
        'District 3 shift-overlap gap between 1500–1700 hrs',
      ],
      forecast: { day30: '8.5 min', day90: '8.7 min', risk: 'Medium' },
    },
    crimeClearanceRate: {
      rate: 68.5, target: 70.0,
      rootCause: [
        'Detective Unit operating with 3 of 14 positions vacant',
        'Property crime case volume up 6% YTD',
        'Evidence/lab turnaround averaging 11 days, up from 7 a year ago',
      ],
      forecast: { day30: '68.2%', day90: '67.6%', risk: 'High' },
    },
    staffing: {
      current: 164, authorized: 178, percentage: 92.1,
      rootCause: [
        '14 vacancies department-wide — 9 in Patrol Division',
        'August academy class (6 recruits) reaches solo patrol status only after FTO completes in October',
        'Attrition running at 7.2%, consistent with the regional average',
      ],
      forecast: { day30: '91.6%', day90: '94.9%', risk: 'Medium' },
    },
    overtime: {
      hours: 18943, cost: 1247850, change: -8.5,
      rootCause: [
        'Patrol vacancy coverage accounts for 54% of all OT hours',
        'Mandatory court appearances up 9% this quarter',
        'District 3 triggered minimum-staffing call-ins 3 times in May',
      ],
      forecast: { day30: '$1.31M', day90: '$1.38M (Q4 proj.)', risk: 'Medium' },
    },
  };

  const divisionRankings = {
    topPerforming:   { division: 'Investigations',    reason: 'Highest clearance rate (82.3%) and near-full staffing (95%)' },
    mostAtRisk:      { division: 'Detention',         reason: 'Open ACA finding with a 48-hr remediation deadline' },
    mostImproved:    { division: 'Support Services',  reason: 'Fleet utilization up 4% and clearance support above department average' },
    lowestPerforming:{ division: 'Patrol Division',   reason: 'Clearance rate 4.8 pts below department average' },
  };

  const divisionPerformance = [
    {
      name: 'Patrol Division', calls: 89234, responseTime: 7.8, clearanceRate: 45.2, staffing: 92,
      riskLevel: 'Medium',
      aiAssessment: {
        strengths: [
          'Response time 0.2 min under the 8-min target despite the highest call volume in the department',
          'Largest division by call volume — primary point of community contact',
        ],
        weaknesses: [
          'Clearance rate 4.8 pts below the department average',
          'Overtime growth is driven by 9 unfilled positions',
        ],
        recommendation: 'Prioritize Patrol recruitment and consider temporary reassignment of 1–2 investigators to support case follow-up through peak season.',
      },
    },
    {
      name: 'Investigations', calls: 5643, responseTime: 24.5, clearanceRate: 82.3, staffing: 95,
      riskLevel: 'Low',
      aiAssessment: {
        strengths: [
          'Best clearance rate in the department at 82.3%',
          'Felony conviction rate up 6% YoY',
          'Near-full staffing (95%)',
        ],
        weaknesses: [
          'Complex felony case backlog up 14% YoY',
          'Limited surge capacity if Patrol referrals increase',
        ],
        recommendation: 'Monitor backlog growth monthly — if it exceeds 20% YoY, cross-train a patrol officer as a case-support liaison.',
      },
    },
    {
      name: 'Detention', calls: 0, responseTime: 0, clearanceRate: 0, staffing: 94, inmates: 842, capacity: 920,
      riskLevel: 'High',
      aiAssessment: {
        strengths: [
          'Occupancy at 91.5% — within the safe operating range',
          'Zero PREA incidents YTD, 100% of staff trained',
        ],
        weaknesses: [
          'Open ACA finding (HVAC) with a 48-hr remediation deadline',
          'No Corrective Action Plan owner currently assigned to either open finding',
        ],
        recommendation: 'Escalate the HVAC remediation to County Facilities today and assign a CAP owner before the deadline.',
      },
    },
    {
      name: 'Support Services', calls: 12456, responseTime: 15.2, clearanceRate: 68.9, staffing: 89,
      riskLevel: 'Medium',
      aiAssessment: {
        strengths: [
          'Clearance support above the department average',
          'Fleet utilization improved 4% this year',
        ],
        weaknesses: [
          'Lowest staffing in the department — 11% vacancy',
          '$588K annual OT exposure tied to vacancy coverage',
        ],
        recommendation: 'Prioritize Support Services in the Q3 hiring plan and evaluate overtime caps for records/fleet roles.',
      },
    },
  ];

  const monthlyTrends = [
    { month: 'Jan', calls: 12345, arrests: 1045, clearance: 66.2 },
    { month: 'Feb', calls: 11892, arrests: 1023, clearance: 67.1 },
    { month: 'Mar', calls: 13124, arrests: 1156, clearance: 68.3 },
    { month: 'Apr', calls: 12876, arrests: 1089, clearance: 67.8 },
    { month: 'May', calls: 13654, arrests: 1198, clearance: 69.1 },
    { month: 'Jun', calls: 14235, arrests: 1267, clearance: 68.9 },
    { month: 'Jul', calls: 15123, arrests: 1342, clearance: 69.5 },
    { month: 'Aug', calls: 14987, arrests: 1298, clearance: 68.7 },
    { month: 'Sep', calls: 13456, arrests: 1187, clearance: 67.9 },
    { month: 'Oct', calls: 12986, arrests: 1102, clearance: 68.5 },
  ];

  // ── Performance Trends tab — AI pattern recognition ──
  const trendAnalysis = {
    observedPattern: 'Calls for service increase every summer (June–August)',
    averageIncrease: 9.2,
    likelyCauses: [
      'Seasonal and outdoor activity increases',
      'School breaks increase youth-related calls',
      'Special events and tourism traffic',
    ],
    recommendation: 'Increase patrol staffing allocations for May–August. Align the August academy class FTO completion date so new officers are available entering peak season.',
  };

  const anomalyDetections = [
    {
      title: 'Unusual Increase — Property Crime',
      metric: '+21% above expected baseline',
      severity: 'High',
      detail: 'Property crime incidents over the last 30 days exceed the seasonally-adjusted baseline by 21%, concentrated in Districts 1 and 3.',
    },
    {
      title: 'Unusual Decrease — Drug Offense Arrests',
      metric: '-9% below expected baseline',
      severity: 'Medium',
      detail: 'Drug offense arrests are trending below the 12-month baseline despite stable call volume — may indicate a case-initiation gap in the Narcotics unit.',
    },
  ];

  const seasonalIntelligence = [
    { label: 'Summer Peak (Jun–Aug)', value: '14,782 calls/mo', sub: '+18% vs winter',   subColor: 'text-orange-700 dark:text-orange-400'  },
    { label: 'Winter Low (Nov–Feb)',  value: '12,404 calls/mo', sub: 'Lowest volume',     subColor: 'text-emerald-600 dark:text-emerald-400' },
    { label: 'YoY Total 2025',        value: '157,423 calls',  sub: '+5.0% vs 2024',     subColor: 'text-emerald-600 dark:text-emerald-400' },
    { label: 'Best Clearance',        value: 'July — 69.5%',   sub: 'Peak performance',  subColor: 'text-emerald-600 dark:text-emerald-400' },
  ];

  const crimeStats = [
    { category: 'Property Crime',    incidents: 4523, change: -5.8,  arrests: 3102, clearance: 68.6 },
    { category: 'Violent Crime',     incidents: 892,  change: 2.3,   arrests: 745,  clearance: 83.5 },
    { category: 'Drug Offenses',     incidents: 1876, change: -12.4, arrests: 1654, clearance: 88.2 },
    { category: 'Traffic Violations',incidents: 8934, change: 3.2,   arrests: 7823, clearance: 87.6 },
    { category: 'Public Order',      incidents: 2134, change: -1.5,  arrests: 1678, clearance: 78.6 },
  ];

  // ── Crime Stats tab — 30-day forecast, hotspot intelligence, command recommendations ──
  const crimeForecast = [
    { category: 'Vehicle Theft',      next30: 18, direction: 'up'   },
    { category: 'Burglary',           next30: 11, direction: 'up'   },
    { category: 'Violent Crime',      next30: 0,  direction: 'flat' },
    { category: 'Drug Offenses',      next30: -4, direction: 'down' },
    { category: 'Traffic Violations', next30: 3,  direction: 'up'   },
  ];

  const hotspotIntelligence = {
    highestGrowth: [
      { area: 'District 3 — Riverside Corridor',  metric: 'Vehicle theft up 24% (90-day)' },
      { area: 'District 1 — Downtown Commercial', metric: 'Commercial burglary up 16% (90-day)' },
    ],
    emergingPatterns: [
      'Catalytic converter thefts concentrated near the I-85 corridor, overnight hours (0100–0400)',
      'Retail theft increasingly involves organized groups of 2–3 offenders, up from predominantly solo incidents',
    ],
    recurringOffenders: [
      '3 repeat offenders linked to 11 of 18 vehicle thefts in District 3 over the last 90 days',
      '1 individual with an active warrant linked to 6 commercial burglaries in District 1',
    ],
    seasonalPatterns: [
      'Property crime historically rises 12–15% June–August',
      'Domestic violence call volume historically rises during the Nov–Jan holiday period',
    ],
  };

  const commandRecommendations = [
    {
      title: 'Vehicle Theft Spike — District 3 Riverside Corridor',
      severity: 'High',
      actions: [
        'Increase directed patrols in the Riverside Corridor during 0100–0400 hrs',
        'Deploy LPR (license plate reader) assets to I-85 on/off ramps',
        'Coordinate with Investigations on the 3 identified repeat offenders',
      ],
    },
    {
      title: 'Commercial Burglary Pattern — District 1 Downtown',
      severity: 'Medium',
      actions: [
        'Notify the downtown business association of the pattern and prevention measures',
        'Prioritize after-hours alarm response for affected blocks',
        'Investigations to pursue the active warrant on the linked suspect',
      ],
    },
  ];

  const availableReports = [
    {
      id: 1, name: 'Executive Monthly Summary', description: 'Command-level KPIs, trends, and decisions needed',
      category: 'Executive', frequency: 'Monthly', icon: FileText, scheduled: true, views: 342, downloads: 89, lastGenerated: 'May 28, 2026', pages: 12,
      importance: 'Critical',
      aiSummary: {
        findings: ['Clearance rate is 1.5 pts below the 70% target', 'Patrol Division staffing is 14 positions below authorized strength'],
        risks: ['ACA reaccreditation review is blocked if open findings remain past Jan 2026'],
        recommendations: ['Prioritize Patrol recruitment', 'Reallocate 1–2 investigators to Property Crime'],
        requiredActions: ['Command sign-off required before board presentation'],
      },
    },
    {
      id: 2, name: 'Crime Statistics Report', description: 'Detailed crime trends and clearance rates by category',
      category: 'Operations', frequency: 'Weekly', icon: BarChart3, scheduled: true, views: 156, downloads: 45, lastGenerated: 'May 26, 2026', pages: 8,
      importance: 'High',
      aiSummary: {
        findings: ['Property crime down 5.8% YTD', 'Vehicle theft is forecast to rise 18% over the next 30 days in District 3'],
        risks: ['District 3 vehicle theft pattern could escalate without intervention'],
        recommendations: ['Deploy LPR assets to District 3 corridors', 'Increase directed patrols 0100–0400 hrs'],
        requiredActions: ['Patrol Commander to brief District 3 deployment plan'],
      },
    },
    {
      id: 3, name: 'Personnel Compliance Report', description: 'Certifications, training status, POST compliance',
      category: 'HR', frequency: 'Weekly', icon: Users, scheduled: true, views: 234, downloads: 67, lastGenerated: 'May 25, 2026', pages: 6,
      importance: 'Critical',
      aiSummary: {
        findings: ['8 deputies have POST certifications expiring within 30 days', 'CJIS certification is 100% current'],
        risks: ['8 deputies lose arrest authority on Jan 31 if certifications lapse'],
        recommendations: ['Enroll affected deputies in the Jan 12–16 recertification cohort'],
        requiredActions: ['HR to confirm enrollment and report to command by Jun 30'],
      },
    },
    {
      id: 4, name: 'Budget Variance Analysis', description: 'YTD spending vs budget by division and category',
      category: 'Finance', frequency: 'Monthly', icon: DollarSign, scheduled: true, views: 423, downloads: 124, lastGenerated: 'May 28, 2026', pages: 15,
      importance: 'High',
      aiSummary: {
        findings: ['Patrol overtime is 19% over allocation', 'Overall OT spend is down 8.5% YoY'],
        risks: ['Finance cannot close the Q4 budget without command sign-off on the OT variance'],
        recommendations: ['Approve the Q4 OT variance report', 'Reassess District 3 minimum-staffing triggers'],
        requiredActions: ['Sheriff/Undersheriff sign-off required before Jun 18'],
      },
    },
    {
      id: 5, name: 'Use of Force Analysis', description: 'Incidents, trends, and policy compliance review',
      category: 'Operations', frequency: 'Quarterly', icon: Shield, scheduled: true, views: 178, downloads: 52, lastGenerated: 'Apr 1, 2026', pages: 18,
      importance: 'Critical',
      aiSummary: {
        findings: ['7 incidents in the last 90 days, all within the policy review window', '2 incidents currently under 30-day command review'],
        risks: ['A delayed review could create liability exposure if a case ages past 30 days'],
        recommendations: ['Continue the current review cadence — no policy changes recommended this quarter'],
        requiredActions: ['None — informational, no command action required'],
      },
    },
    {
      id: 6, name: 'Community Engagement Metrics', description: 'Public interactions and satisfaction survey results',
      category: 'Community', frequency: 'Monthly', icon: Users, scheduled: false, views: 89, downloads: 23, lastGenerated: 'Apr 28, 2026', pages: 5,
      importance: 'Low',
      aiSummary: {
        findings: ['Satisfaction survey response rate down 6%', 'Community meeting attendance is stable'],
        risks: ['Low priority — no compliance or liability exposure identified'],
        recommendations: ['Consider digital survey outreach to improve response rate'],
        requiredActions: ['None'],
      },
    },
    {
      id: 7, name: 'Fleet Maintenance Report', description: 'Vehicle status, maintenance costs, replacement schedule',
      category: 'Support', frequency: 'Monthly', icon: Activity, scheduled: true, views: 145, downloads: 34, lastGenerated: 'May 15, 2026', pages: 7,
      importance: 'Medium',
      aiSummary: {
        findings: ['3 patrol vehicles are out of service pending repair', 'Fleet utilization is up 4%'],
        risks: ['Extended vehicle downtime could affect patrol coverage in District 2'],
        recommendations: ['Expedite repairs on the 2 vehicles in the shop more than 14 days'],
        requiredActions: ['Support Services to provide a repair ETA at the next command meeting'],
      },
    },
    {
      id: 8, name: 'Training Completion Report', description: 'Officer training hours and certification tracking',
      category: 'Training', frequency: 'Monthly', icon: FileText, scheduled: true, views: 267, downloads: 78, lastGenerated: 'May 20, 2026', pages: 9,
      importance: 'High',
      aiSummary: {
        findings: ['96% of staff are current on annual use-of-force training', 'Detention staff are 100% PREA trained'],
        risks: ['The POST certification gap is the primary near-term compliance risk'],
        recommendations: ['Push the 8 affected deputies into the Jan 12–16 recertification cohort'],
        requiredActions: ['Training Division to confirm completion by Jan 31'],
      },
    },
    {
      id: 9, name: 'Overtime Analysis Report', description: 'Detailed OT tracking and cost analysis by division',
      category: 'Finance', frequency: 'Bi-Weekly', icon: Clock, scheduled: true, views: 198, downloads: 56, lastGenerated: 'May 24, 2026', pages: 6,
      importance: 'High',
      aiSummary: {
        findings: ['Patrol drives 71% of department OT spend', 'District 3 triggered minimum-staffing call-ins 3 times in May'],
        risks: ['Continued Patrol vacancy coverage could push OT 6% above forecast by Q4'],
        recommendations: ['Prioritize Patrol recruitment', 'Review District 3 minimum-staffing thresholds'],
        requiredActions: ['Patrol Commander to present a staffing mitigation plan'],
      },
    },
    {
      id: 10, name: 'Detention Facility Report', description: 'Inmate population, incidents, and facility operations',
      category: 'Operations', frequency: 'Weekly', icon: Building2, scheduled: true, views: 187, downloads: 42, lastGenerated: 'May 27, 2026', pages: 10,
      importance: 'Critical',
      aiSummary: {
        findings: ['Occupancy at 91.5% (842 / 920)', '2 open ACA findings — HVAC remediation overdue'],
        risks: ['ACA reaccreditation review is blocked if findings remain open past Jan 2026'],
        recommendations: ['Escalate HVAC remediation to County Facilities'],
        requiredActions: ['Jail Administrator to assign a CAP owner and report status weekly'],
      },
    },
  ];

  const CATEGORY_STYLE = {
    Executive:  { badge: 'violet', iconBg: 'bg-violet-500/10',  iconColor: 'text-violet-500 dark:text-violet-400'  },
    Operations: { badge: 'blue',   iconBg: 'bg-blue-500/10',    iconColor: 'text-blue-500 dark:text-blue-400'      },
    HR:         { badge: 'green',  iconBg: 'bg-emerald-500/10', iconColor: 'text-emerald-600 dark:text-emerald-400'},
    Finance:    { badge: 'amber',  iconBg: 'bg-amber-500/10',   iconColor: 'text-amber-600 dark:text-amber-400'    },
    Training:   { badge: 'green',  iconBg: 'bg-emerald-500/10', iconColor: 'text-emerald-600 dark:text-emerald-400'},
    Support:    { badge: 'slate',  iconBg: 'bg-slate-500/10',   iconColor: 'text-slate-500 dark:text-slate-400'   },
    Community:  { badge: 'blue',   iconBg: 'bg-blue-500/10',    iconColor: 'text-blue-500 dark:text-blue-400'     },
  };

  const getChangeColor = (change) =>
    change > 0 ? 'text-emerald-600 dark:text-emerald-400' : change < 0 ? 'text-red-600 dark:text-red-400' : 'text-slate-500';

  const getChangeIcon = (change) =>
    change > 0 ? <ArrowUpRight className="w-4 h-4" /> : change < 0 ? <ArrowDownRight className="w-4 h-4" /> : null;

  const getUrgencyAccent = (u) =>
    u === 'Critical' ? 'border-l-red-500' : u === 'High' ? 'border-l-orange-500' : 'border-l-slate-400 dark:border-l-slate-600';

  const getUrgencyBadge = (u) =>
    u === 'Critical' ? BADGE('red') : u === 'High' ? BADGE('orange') : BADGE('slate');

  const getActionBtnClass = (u) => {
    if (u === 'Critical') return 'inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-[11px] font-bold uppercase tracking-wide transition-colors bg-red-600 border border-red-700 text-white hover:bg-red-700';
    if (u === 'High')     return 'inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-[11px] font-bold uppercase tracking-wide transition-colors bg-orange-500 border border-orange-600 text-white hover:bg-orange-600';
    return 'inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-[11px] font-bold uppercase tracking-wide transition-colors bg-slate-700 border border-slate-800 text-white hover:bg-slate-800 dark:bg-zinc-700 dark:border-slate-700 dark:hover:bg-zinc-800';
  };

  const getComplianceBar = (s) =>
    s === 'Compliant' ? 'bg-emerald-500' : s === 'At Risk' ? 'bg-red-500' : 'bg-orange-500';

  const getCompliancePctColor = (s) =>
    s === 'Compliant' ? 'text-emerald-600 dark:text-emerald-400' : s === 'At Risk' ? 'text-red-600 dark:text-red-400' : 'text-orange-700 dark:text-orange-400';

  const getComplianceBadge = (s) =>
    s === 'Compliant' ? BADGE('green') : s === 'At Risk' ? BADGE('red') : BADGE('orange');

  // Risk / liability levels: Low, Medium/Moderate, High, Critical
  const getRiskLevelBadge = (level) => {
    if (level === 'Low') return BADGE('green');
    if (level === 'Medium' || level === 'Moderate') return BADGE('amber');
    if (level === 'High') return BADGE('orange');
    return BADGE('red'); // Critical
  };

  const getRiskLevelColor = (level) => {
    if (level === 'Low') return 'text-emerald-600 dark:text-emerald-400';
    if (level === 'Medium' || level === 'Moderate') return 'text-amber-600 dark:text-amber-400';
    if (level === 'High') return 'text-orange-700 dark:text-orange-400';
    return 'text-red-600 dark:text-red-400'; // Critical
  };

  const getSeverityDotColor = (severity) =>
    severity === 'high' ? 'bg-red-500' : severity === 'medium' ? 'bg-amber-500' : 'bg-emerald-500';

  const IMPORTANCE_ORDER = { Critical: 0, High: 1, Medium: 2, Low: 3 };
  const getImportanceBadge = (importance) => {
    if (importance === 'Critical') return BADGE('red');
    if (importance === 'High') return BADGE('orange');
    if (importance === 'Medium') return BADGE('amber');
    return BADGE('slate');
  };

  // Crime forecast direction — for incident counts, "up" is unfavorable
  const getCrimeDirectionIcon = (direction) => {
    if (direction === 'up') return <TrendingUp className="w-3.5 h-3.5" />;
    if (direction === 'down') return <TrendingDown className="w-3.5 h-3.5" />;
    return <Minus className="w-3.5 h-3.5" />;
  };

  const getCrimeDirectionColor = (direction) =>
    direction === 'up' ? 'text-red-600 dark:text-red-400' : direction === 'down' ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-500';

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => setToast(null), 3500);
  };

  const handleReportAction = (action) => {
    setActionedIds(prev => new Set([...prev, action.id]));
    showToast(`${action.actionLabel} recorded — ${action.decision.slice(0, 55)}…`, 'success');
  };

  const toggleSummary = (id) => {
    setExpandedSummaries(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const filteredReports = (filterCategory === 'all'
    ? availableReports
    : availableReports.filter(r => r.category === filterCategory)
  ).slice().sort((a, b) => IMPORTANCE_ORDER[a.importance] - IMPORTANCE_ORDER[b.importance]);

  const pendingCount  = reportActions.filter(a => !actionedIds.has(a.id)).length;
  const criticalCount = reportActions.filter(a => a.urgency === 'Critical' && !actionedIds.has(a.id)).length;
  const maxCalls      = Math.max(...monthlyTrends.map(m => m.calls));

  return (
    <DashboardLayout>
      <div className="p-5 lg:p-8 space-y-6 bg-slate-100 dark:bg-transparent min-h-full">

        {/* ── Page Header ─────────────────────────── */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-1">Performance &amp; Compliance</h2>
            <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
              <span>FY 2025–26</span>
              <span>·</span>
              <span>Jan 1 – May 28, 2026</span>
              {pendingCount > 0 && (
                <>
                  <span>·</span>
                  <span className="text-orange-700 dark:text-orange-400 font-semibold">{pendingCount} decisions pending</span>
                </>
              )}
              <span>·</span>
              <span className="text-red-700 dark:text-red-400 font-semibold">1 compliance deadline in 48 hrs</span>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-wrap w-full lg:w-auto">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-3 py-2 bg-white dark:bg-zinc-900/40 border border-slate-200 dark:border-slate-700/30 rounded-lg text-slate-700 dark:text-slate-300 text-sm focus:outline-none focus:border-amber-500/50 w-full sm:w-auto"
            >
              <option value="ytd">Year to Date</option>
              <option value="last30">Last 30 Days</option>
              <option value="last90">Last 90 Days</option>
              <option value="thisMonth">This Month</option>
              <option value="lastMonth">Last Month</option>
              <option value="q4">This Quarter</option>
              <option value="lastQuarter">Last Quarter</option>
              <option value="fy2024">Fiscal Year 2024</option>
              <option value="fy2023">Fiscal Year 2023</option>
              <option value="custom">Custom Date Range...</option>
            </select>
            <button onClick={() => setComparisonModal(true)} className={secondaryBtn}><BarChart3 className="w-4 h-4" /> Compare</button>
            <button onClick={() => setCustomReportModal(true)} className={secondaryBtn}><Plus className="w-4 h-4" /> Custom</button>
            <button onClick={() => setExportModal(true)} className={secondaryBtn}><FileSpreadsheet className="w-4 h-4" /> Excel</button>
            <button onClick={() => setScheduleModal(true)} className={secondaryBtn}><CalendarClock className="w-4 h-4" /> Schedule</button>
            <button className={secondaryBtn}><Printer className="w-4 h-4" /> Print</button>
          </div>
        </div>

        {/* ── AI Command Assessment ─────────────────── */}
        <div className={CARD + ' overflow-hidden'}>
          <div className="flex flex-col lg:flex-row lg:items-stretch">
            {/* Status block */}
            <div className="lg:w-64 flex-shrink-0 bg-slate-800 dark:bg-zinc-950/60 border-b lg:border-b-0 lg:border-r border-slate-700/40 p-5 flex flex-col justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 mb-2.5">
                  <Brain className="w-4 h-4 text-amber-400" />
                  <span className="text-[11px] font-bold text-amber-400 uppercase tracking-widest">AI Command Assessment</span>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-pulse absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                  </span>
                  <span className="text-lg font-bold text-white">{aiCommandAssessment.status}</span>
                </div>
                <p className="text-[12px] text-slate-300 leading-snug">{aiCommandAssessment.statusNote}</p>
              </div>
              <p className="text-[10px] text-slate-500">{aiCommandAssessment.generatedAt}</p>
            </div>

            {/* Findings + Recommended Actions */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-100 dark:divide-slate-800/60">
              <div className="p-5">
                <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-3">Key Findings</p>
                <div className="space-y-2.5">
                  {aiCommandAssessment.findings.map((f, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <span className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${getSeverityDotColor(f.severity)}`} />
                      <p className="text-[12px] text-slate-700 dark:text-slate-300 leading-snug">{f.text}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-5">
                <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-3">Recommended Actions</p>
                <div className="space-y-3">
                  {aiCommandAssessment.recommendedActions.map((a, i) => (
                    <div key={i} className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-2.5 flex-1">
                        <Lightbulb className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                        <p className="text-[12px] text-slate-700 dark:text-slate-300 leading-snug">{a.text}</p>
                      </div>
                      <button onClick={() => setActiveTab(a.tab)} className="text-[11px] font-semibold text-amber-700 dark:text-amber-400 hover:underline flex-shrink-0 whitespace-nowrap">
                        {a.cta} →
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Command Decisions Required ───────────── */}
        <div className={CARD}>
          <div className={CARD_HEADER + ' flex-col sm:flex-row sm:items-center gap-2 sm:gap-0'}>
            <div className="flex items-center gap-3 min-w-0">
              <span className="relative flex h-2 w-2 flex-shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              <span className="text-[11px] font-bold text-slate-700 dark:text-slate-200 uppercase tracking-widest break-words">Command Decisions Required</span>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              {criticalCount > 0 && <span className={BADGE('red')}>{criticalCount} Critical</span>}
              <span className="text-[11px] text-slate-500 dark:text-slate-400">{pendingCount} pending</span>
            </div>
          </div>
          <div className="divide-y divide-slate-100 dark:divide-slate-800/50">
            {reportActions.map((action) => {
              const isActioned = actionedIds.has(action.id);
              return (
                <div
                  key={action.id}
                  className={`flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 px-5 py-3 border-l-[3px] transition-colors ${getUrgencyAccent(action.urgency)} ${
                    isActioned
                      ? 'bg-emerald-50/30 dark:bg-emerald-500/5 opacity-60'
                      : 'hover:bg-slate-50 dark:hover:bg-zinc-950/20'
                  }`}
                >
                  {/* Status column */}
                  <div className="flex flex-row sm:flex-col items-center sm:items-start gap-2 sm:gap-1 flex-shrink-0 sm:w-[90px]">
                    {isActioned ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-[10px] font-bold">
                        <CheckCircle className="w-3 h-3" /> Done
                      </span>
                    ) : (
                      <>
                        <span className={getUrgencyBadge(action.urgency)}>{action.urgency}</span>
                        <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {action.countdown}
                        </span>
                      </>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <p className={`text-[13px] font-semibold leading-snug break-words ${isActioned ? 'text-slate-400 dark:text-slate-500 line-through' : 'text-slate-800 dark:text-slate-100'}`}>
                      {action.decision}
                    </p>
                    {!isActioned && (
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-tight break-words">
                        <span className="font-semibold text-slate-600 dark:text-slate-400">Risk: </span>{action.ifIgnored}
                      </p>
                    )}
                  </div>

                  {/* Buttons */}
                  {!isActioned && (
                    <div className="flex items-center gap-2 flex-shrink-0 flex-wrap">
                      <button onClick={() => handleReportAction(action)} className={getActionBtnClass(action.urgency)}>
                        {action.actionLabel}
                      </button>
                      <button className={secondaryBtn}>Delegate</button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Tabs ─────────────────────────────────── */}
        <div className="flex gap-1 border-b border-slate-200 dark:border-slate-700/30 overflow-x-auto">
          {[
            { id: 'overview',    label: 'Overview',               icon: Zap        },
            { id: 'operations',  label: 'Division Intel',         icon: Activity   },
            { id: 'crime',       label: 'Crime Stats',            icon: Target     },
            { id: 'trends',      label: 'Performance Trends',     icon: TrendingUp },
            { id: 'compliance',  label: 'Compliance & Liability', icon: Scale      },
            { id: 'reports',     label: 'Reports Library',        icon: BookOpen   },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-all relative whitespace-nowrap ${
                activeTab === tab.id
                  ? 'text-amber-700 dark:text-amber-400'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500" />
              )}
            </button>
          ))}
        </div>

        {/* ══════════════ OVERVIEW TAB ════════════════ */}
        {activeTab === 'overview' && (
          <div className="space-y-6">

            {/* Key Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

              {/* Calls for Service */}
              <div className={`${CARD} p-5 flex flex-col`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 bg-blue-500/10 rounded-xl flex items-center justify-center">
                    <Phone className="w-4 h-4 text-blue-500 dark:text-blue-400" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wide text-blue-600 dark:text-blue-400">Calls for Service</span>
                </div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white mb-0.5">{keyMetrics.callsForService.total.toLocaleString()}</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-3">Year to Date</p>
                <div className="space-y-1.5 border-t border-slate-100 dark:border-slate-800/60 pt-3">
                  <div className="flex justify-between text-xs"><span className="text-slate-500 dark:text-slate-400">Trend vs 2025</span><span className={`font-bold flex items-center gap-1 ${getChangeColor(keyMetrics.callsForService.change)}`}>{getChangeIcon(keyMetrics.callsForService.change)}{Math.abs(keyMetrics.callsForService.change)}%</span></div>
                  <div className="flex justify-between text-xs"><span className="text-slate-500 dark:text-slate-400">Avg per day</span><span className="font-medium text-slate-700 dark:text-slate-300">6,936 calls</span></div>
                  <div className="flex justify-between text-xs"><span className="text-slate-500 dark:text-slate-400">Peak hours</span><span className="font-medium text-slate-700 dark:text-slate-300">1400–1800 hrs</span></div>
                </div>
                <div className={`${AI_CALLOUT} mt-3`}>
                  <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[10px] font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wide mb-1">Why?</p>
                    <ul className="space-y-1">
                      {keyMetrics.callsForService.rootCause.map((r, i) => (
                        <li key={i} className="text-[11px] text-amber-800/90 dark:text-amber-300/90 leading-snug">• {r}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-slate-100 dark:border-slate-800/60 text-center">
                  <div>
                    <p className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wide mb-1">30-Day</p>
                    <p className="text-xs font-bold text-slate-700 dark:text-slate-300">{keyMetrics.callsForService.forecast.day30}</p>
                  </div>
                  <div>
                    <p className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wide mb-1">90-Day</p>
                    <p className="text-xs font-bold text-slate-700 dark:text-slate-300">{keyMetrics.callsForService.forecast.day90}</p>
                  </div>
                  <div>
                    <p className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wide mb-1">Risk</p>
                    <span className={getRiskLevelBadge(keyMetrics.callsForService.forecast.risk)}>{keyMetrics.callsForService.forecast.risk}</span>
                  </div>
                </div>
              </div>

              {/* Avg Response Time */}
              <div className={`${CARD} p-5 flex flex-col`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 bg-emerald-500/10 rounded-xl flex items-center justify-center">
                    <Clock className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wide text-emerald-600 dark:text-emerald-400">Avg Response Time</span>
                </div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white mb-0.5">{keyMetrics.responseTime.average} min</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-3">All priorities combined</p>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-slate-500 dark:text-slate-400">Target: {keyMetrics.responseTime.target} min</span>
                  <span className="font-bold text-orange-700 dark:text-orange-400">0.4 min above</span>
                </div>
                <div className="w-full h-1.5 bg-slate-200 dark:bg-zinc-800/50 rounded-full overflow-hidden mb-3">
                  <div className="h-full bg-emerald-500" style={{ width: '95%' }} />
                </div>
                <div className="space-y-1.5 border-t border-slate-100 dark:border-slate-800/60 pt-3">
                  <div className="flex justify-between text-xs"><span className="text-slate-500 dark:text-slate-400">P1 Emergency</span><span className="font-medium text-emerald-600 dark:text-emerald-400">3.2 min</span></div>
                  <div className="flex justify-between text-xs"><span className="text-slate-500 dark:text-slate-400">P2 Urgent</span><span className="font-medium text-emerald-600 dark:text-emerald-400">7.8 min</span></div>
                  <div className="flex justify-between text-xs"><span className="text-slate-500 dark:text-slate-400">P3 Routine</span><span className="font-medium text-emerald-600 dark:text-emerald-400">18.4 min</span></div>
                </div>
                <div className={`${AI_CALLOUT} mt-3`}>
                  <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[10px] font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wide mb-1">Why?</p>
                    <ul className="space-y-1">
                      {keyMetrics.responseTime.rootCause.map((r, i) => (
                        <li key={i} className="text-[11px] text-amber-800/90 dark:text-amber-300/90 leading-snug">• {r}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-slate-100 dark:border-slate-800/60 text-center">
                  <div>
                    <p className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wide mb-1">30-Day</p>
                    <p className="text-xs font-bold text-slate-700 dark:text-slate-300">{keyMetrics.responseTime.forecast.day30}</p>
                  </div>
                  <div>
                    <p className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wide mb-1">90-Day</p>
                    <p className="text-xs font-bold text-slate-700 dark:text-slate-300">{keyMetrics.responseTime.forecast.day90}</p>
                  </div>
                  <div>
                    <p className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wide mb-1">Risk</p>
                    <span className={getRiskLevelBadge(keyMetrics.responseTime.forecast.risk)}>{keyMetrics.responseTime.forecast.risk}</span>
                  </div>
                </div>
              </div>

              {/* Clearance Rate */}
              <div className={`${CARD} p-5 flex flex-col`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 bg-purple-500/10 rounded-xl flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-purple-500 dark:text-purple-400" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wide text-purple-600 dark:text-purple-400">Clearance Rate</span>
                </div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white mb-0.5">{keyMetrics.crimeClearanceRate.rate}%</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-3">Cases closed vs total</p>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-slate-500 dark:text-slate-400">Target: {keyMetrics.crimeClearanceRate.target}%</span>
                  <span className="font-bold text-orange-700 dark:text-orange-400">1.5 pts below</span>
                </div>
                <div className="w-full h-1.5 bg-slate-200 dark:bg-zinc-800/50 rounded-full overflow-hidden mb-3">
                  <div className="h-full bg-purple-500" style={{ width: '97.9%' }} />
                </div>
                <div className="space-y-1.5 border-t border-slate-100 dark:border-slate-800/60 pt-3">
                  <div className="flex justify-between text-xs"><span className="text-slate-500 dark:text-slate-400">Violent crimes</span><span className="font-medium text-emerald-600 dark:text-emerald-400">82.1%</span></div>
                  <div className="flex justify-between text-xs"><span className="text-slate-500 dark:text-slate-400">Property crimes</span><span className="font-medium text-orange-700 dark:text-orange-400">56.8%</span></div>
                  <div className="flex justify-between text-xs"><span className="text-slate-500 dark:text-slate-400">YoY change</span><span className="font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1"><ArrowUpRight className="w-3 h-3" />+3.8 pts</span></div>
                </div>
                <div className={`${AI_CALLOUT} mt-3`}>
                  <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[10px] font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wide mb-1">Why?</p>
                    <ul className="space-y-1">
                      {keyMetrics.crimeClearanceRate.rootCause.map((r, i) => (
                        <li key={i} className="text-[11px] text-amber-800/90 dark:text-amber-300/90 leading-snug">• {r}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-slate-100 dark:border-slate-800/60 text-center">
                  <div>
                    <p className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wide mb-1">30-Day</p>
                    <p className="text-xs font-bold text-slate-700 dark:text-slate-300">{keyMetrics.crimeClearanceRate.forecast.day30}</p>
                  </div>
                  <div>
                    <p className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wide mb-1">90-Day</p>
                    <p className="text-xs font-bold text-slate-700 dark:text-slate-300">{keyMetrics.crimeClearanceRate.forecast.day90}</p>
                  </div>
                  <div>
                    <p className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wide mb-1">Risk</p>
                    <span className={getRiskLevelBadge(keyMetrics.crimeClearanceRate.forecast.risk)}>{keyMetrics.crimeClearanceRate.forecast.risk}</span>
                  </div>
                </div>
              </div>

              {/* Staffing Readiness */}
              <div className={`${CARD} p-5 flex flex-col`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 bg-blue-500/10 rounded-xl flex items-center justify-center">
                    <Users className="w-4 h-4 text-blue-500 dark:text-blue-400" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wide text-blue-600 dark:text-blue-400">Staffing Readiness</span>
                </div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white mb-0.5">{keyMetrics.staffing.percentage}%</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-3">{keyMetrics.staffing.current} / {keyMetrics.staffing.authorized} positions</p>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-slate-500 dark:text-slate-400">Target: 95%</span>
                  <span className="font-bold text-orange-700 dark:text-orange-400">-5 positions</span>
                </div>
                <div className="w-full h-1.5 bg-slate-200 dark:bg-zinc-800/50 rounded-full overflow-hidden mb-3">
                  <div className="h-full bg-blue-500" style={{ width: `${keyMetrics.staffing.percentage}%` }} />
                </div>
                <div className="space-y-1.5 border-t border-slate-100 dark:border-slate-800/60 pt-3">
                  <div className="flex justify-between text-xs"><span className="text-slate-500 dark:text-slate-400">Vacancies</span><span className="font-medium text-orange-700 dark:text-orange-400">14 open positions</span></div>
                  <div className="flex justify-between text-xs"><span className="text-slate-500 dark:text-slate-400">Pipeline</span><span className="font-medium text-slate-700 dark:text-slate-300">12 candidates</span></div>
                  <div className="flex justify-between text-xs"><span className="text-slate-500 dark:text-slate-400">Vacancy OT cost</span><span className="font-medium text-red-600 dark:text-red-400">$588K/year</span></div>
                </div>
                <div className={`${AI_CALLOUT} mt-3`}>
                  <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[10px] font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wide mb-1">Why?</p>
                    <ul className="space-y-1">
                      {keyMetrics.staffing.rootCause.map((r, i) => (
                        <li key={i} className="text-[11px] text-amber-800/90 dark:text-amber-300/90 leading-snug">• {r}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-slate-100 dark:border-slate-800/60 text-center">
                  <div>
                    <p className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wide mb-1">30-Day</p>
                    <p className="text-xs font-bold text-slate-700 dark:text-slate-300">{keyMetrics.staffing.forecast.day30}</p>
                  </div>
                  <div>
                    <p className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wide mb-1">90-Day</p>
                    <p className="text-xs font-bold text-slate-700 dark:text-slate-300">{keyMetrics.staffing.forecast.day90}</p>
                  </div>
                  <div>
                    <p className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wide mb-1">Risk</p>
                    <span className={getRiskLevelBadge(keyMetrics.staffing.forecast.risk)}>{keyMetrics.staffing.forecast.risk}</span>
                  </div>
                </div>
              </div>

              {/* Overtime / Budget Performance */}
              <div className={`${CARD} p-5 flex flex-col`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 bg-emerald-500/10 rounded-xl flex items-center justify-center">
                    <DollarSign className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wide text-emerald-600 dark:text-emerald-400">Overtime / Budget</span>
                </div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white mb-0.5">${(keyMetrics.overtime.cost / 1000000).toFixed(1)}M</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-3">{keyMetrics.overtime.hours.toLocaleString()} OT hours YTD</p>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-slate-500 dark:text-slate-400">Target: &lt;10% of budget</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">8.9%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-200 dark:bg-zinc-800/50 rounded-full overflow-hidden mb-3">
                  <div className="h-full bg-emerald-500" style={{ width: '89%' }} />
                </div>
                <div className="space-y-1.5 border-t border-slate-100 dark:border-slate-800/60 pt-3">
                  <div className="flex justify-between text-xs"><span className="text-slate-500 dark:text-slate-400">YoY change</span><span className="font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1"><ArrowDownRight className="w-3 h-3" />-8.5% ($110K saved)</span></div>
                  <div className="flex justify-between text-xs"><span className="text-slate-500 dark:text-slate-400">Shift coverage</span><span className="font-medium text-slate-700 dark:text-slate-300">54% of OT</span></div>
                  <div className="flex justify-between text-xs"><span className="text-slate-500 dark:text-slate-400">vs National avg</span><span className="font-medium text-emerald-600 dark:text-emerald-400">12–26% below</span></div>
                </div>
                <div className={`${AI_CALLOUT} mt-3`}>
                  <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[10px] font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wide mb-1">Why?</p>
                    <ul className="space-y-1">
                      {keyMetrics.overtime.rootCause.map((r, i) => (
                        <li key={i} className="text-[11px] text-amber-800/90 dark:text-amber-300/90 leading-snug">• {r}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-slate-100 dark:border-slate-800/60 text-center">
                  <div>
                    <p className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wide mb-1">30-Day</p>
                    <p className="text-xs font-bold text-slate-700 dark:text-slate-300">{keyMetrics.overtime.forecast.day30}</p>
                  </div>
                  <div>
                    <p className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wide mb-1">90-Day</p>
                    <p className="text-xs font-bold text-slate-700 dark:text-slate-300">{keyMetrics.overtime.forecast.day90}</p>
                  </div>
                  <div>
                    <p className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wide mb-1">Risk</p>
                    <span className={getRiskLevelBadge(keyMetrics.overtime.forecast.risk)}>{keyMetrics.overtime.forecast.risk}</span>
                  </div>
                </div>
              </div>

              {/* Liability Exposure — executive snapshot, full detail on Compliance & Liability tab */}
              <div className={`${CARD} p-5 flex flex-col`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 bg-red-500/10 rounded-xl flex items-center justify-center">
                    <Scale className="w-4 h-4 text-red-600 dark:text-red-400" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wide text-red-600 dark:text-red-400">Liability Exposure</span>
                </div>
                <p className={`text-2xl font-bold mb-0.5 ${getRiskLevelColor(liabilityExposure.level)}`}>{liabilityExposure.level}</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-3">{liabilityExposure.trendNote} · Est. exposure ${(liabilityExposure.financialEstimate / 1000000).toFixed(2)}M</p>
                <div className="space-y-1.5 border-t border-slate-100 dark:border-slate-800/60 pt-3 flex-1">
                  <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1.5">Top Exposure Drivers</p>
                  {liabilityExposure.topDrivers.map((d, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <Flag className="w-3 h-3 text-red-500 dark:text-red-400 flex-shrink-0 mt-0.5" />
                      <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug">{d}</p>
                    </div>
                  ))}
                </div>
                <button onClick={() => setActiveTab('compliance')} className="mt-3 text-[11px] font-semibold text-amber-700 dark:text-amber-400 hover:underline self-start">
                  View Compliance &amp; Liability →
                </button>
              </div>
            </div>

          </div>
        )}

        {/* ══════════════ DIVISION INTEL TAB ══════════ */}
        {activeTab === 'operations' && (
          <div className="space-y-4">
            {/* Intel header strip */}
            <div className="flex items-start gap-3 px-4 py-3 bg-slate-800 dark:bg-zinc-950/60 border border-slate-700/40 rounded-xl">
              <Activity className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
              <p className="text-[12px] text-slate-300 leading-snug">
                <span className="font-bold text-amber-400">Division Intelligence:</span>{' '}
                Investigations leads in clearance rate (82.3%) with near-full staffing. Patrol faces resource pressure — 4.8 pts below the clearance target. Detention's open ACA finding is the department's most urgent compliance risk.
              </p>
            </div>

            {/* Division Rankings */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                { label: 'Top Performing',    icon: Award,         color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-500/10', data: divisionRankings.topPerforming },
                { label: 'Most Improved',      icon: TrendingUp,    color: 'text-blue-600 dark:text-blue-400',       bg: 'bg-blue-500/10',    data: divisionRankings.mostImproved },
                { label: 'Most At-Risk',       icon: AlertTriangle, color: 'text-orange-700 dark:text-orange-400',   bg: 'bg-orange-500/10',  data: divisionRankings.mostAtRisk },
                { label: 'Lowest Performing',  icon: Flag,          color: 'text-red-600 dark:text-red-400',         bg: 'bg-red-500/10',     data: divisionRankings.lowestPerforming },
              ].map((rank, i) => (
                <div key={i} className={`${CARD} p-4`}>
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`w-7 h-7 ${rank.bg} rounded-lg flex items-center justify-center`}>
                      <rank.icon className={`w-3.5 h-3.5 ${rank.color}`} />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">{rank.label}</span>
                  </div>
                  <p className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-1">{rank.data.division}</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">{rank.data.reason}</p>
                </div>
              ))}
            </div>

            {divisionPerformance.map((division, idx) => (
              <div key={idx} className={CARD + ' overflow-hidden'}>
                {/* Division header */}
                <div className={CARD_HEADER + ' flex-col sm:flex-row sm:items-center gap-2 sm:gap-0'}>
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${
                      division.riskLevel === 'Low' ? 'bg-emerald-500' :
                      division.riskLevel === 'High' || division.riskLevel === 'Critical' ? 'bg-red-500' : 'bg-orange-500'
                    }`} />
                    <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100 break-words">{division.name}</h4>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-[9px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Risk Level</span>
                    <span className={getRiskLevelBadge(division.riskLevel)}>{division.riskLevel}</span>
                  </div>
                </div>

                {/* Stats + AI Assessment */}
                <div className="px-5 pt-4 pb-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    {division.calls > 0 && (
                      <div>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">Calls Handled</p>
                        <p className="text-xl font-bold text-slate-800 dark:text-slate-100">{division.calls.toLocaleString()}</p>
                      </div>
                    )}
                    {division.responseTime > 0 && (
                      <div>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">Resp. Time</p>
                        <p className="text-xl font-bold text-slate-800 dark:text-slate-100">{division.responseTime}<span className="text-xs font-normal text-slate-500 ml-1">min</span></p>
                      </div>
                    )}
                    {division.clearanceRate > 0 && (
                      <div>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">Clearance</p>
                        <p className={`text-xl font-bold ${division.clearanceRate >= 70 ? 'text-emerald-600 dark:text-emerald-400' : division.clearanceRate >= 50 ? 'text-orange-700 dark:text-orange-400' : 'text-red-600 dark:text-red-400'}`}>{division.clearanceRate}%</p>
                      </div>
                    )}
                    <div>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">Staffing</p>
                      <p className={`text-xl font-bold ${division.staffing >= 95 ? 'text-emerald-600 dark:text-emerald-400' : division.staffing >= 90 ? 'text-orange-700 dark:text-orange-400' : 'text-red-600 dark:text-red-400'}`}>{division.staffing}%</p>
                    </div>
                    {division.inmates !== undefined && (
                      <>
                        <div>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">Inmate Pop.</p>
                          <p className="text-xl font-bold text-slate-800 dark:text-slate-100">{division.inmates}</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">Occupancy</p>
                          <p className="text-xl font-bold text-emerald-600 dark:text-emerald-400">{Math.round((division.inmates / division.capacity) * 100)}%<span className="text-xs font-normal text-slate-500 ml-1">/ {division.capacity}</span></p>
                        </div>
                      </>
                    )}
                  </div>

                  {/* AI Division Assessment */}
                  <div className="border-t border-slate-100 dark:border-slate-800/60 pt-3 space-y-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <div className="bg-emerald-50 dark:bg-emerald-500/5 border border-emerald-100 dark:border-emerald-500/15 rounded-lg px-3 py-2.5">
                        <p className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wide mb-1.5">Strengths</p>
                        <ul className="space-y-1">
                          {division.aiAssessment.strengths.map((s, i) => (
                            <li key={i} className="text-[11px] text-slate-700 dark:text-slate-300 leading-snug">• {s}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="bg-orange-50 dark:bg-orange-500/5 border border-orange-100 dark:border-orange-500/15 rounded-lg px-3 py-2.5">
                        <p className="text-[10px] font-bold text-orange-700 dark:text-orange-400 uppercase tracking-wide mb-1.5">Weaknesses</p>
                        <ul className="space-y-1">
                          {division.aiAssessment.weaknesses.map((w, i) => (
                            <li key={i} className="text-[11px] text-slate-700 dark:text-slate-300 leading-snug">• {w}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className={AI_CALLOUT}>
                      <Lightbulb className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                      <p className="text-[11px] text-amber-800 dark:text-amber-300 leading-snug">
                        <span className="font-bold uppercase tracking-wide">Recommendation: </span>
                        {division.aiAssessment.recommendation}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ══════════════ CRIME STATS TAB ══════════════ */}
        {activeTab === 'crime' && (
          <div className="space-y-4">
            <div className={CARD + ' overflow-hidden'}>
              <div className={CARD_HEADER}>
                <span className="text-[11px] font-bold text-slate-700 dark:text-slate-200 uppercase tracking-widest">Crime Category Analysis — YTD 2026</span>
                <span className={BADGE('slate')}>5 categories</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50 dark:bg-zinc-950/40 border-b border-slate-200 dark:border-slate-700/30">
                    <tr>
                      {['Category', 'Incidents', 'YoY Change', 'Arrests', 'Clearance Rate'].map(h => (
                        <th key={h} className="px-5 py-3 text-left text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {crimeStats.map((stat, idx) => (
                      <tr key={idx} className="border-b border-slate-100 dark:border-slate-800/30 hover:bg-slate-50 dark:hover:bg-zinc-900/20 transition-colors">
                        <td className="px-5 py-3.5">
                          <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{stat.category}</p>
                        </td>
                        <td className="px-5 py-3.5">
                          <p className="text-sm font-medium text-slate-600 dark:text-slate-300 tabular-nums">{stat.incidents.toLocaleString()}</p>
                        </td>
                        <td className="px-5 py-3.5">
                          <div className={`flex items-center gap-1 ${getChangeColor(stat.change)}`}>
                            {getChangeIcon(stat.change)}
                            <span className="text-sm font-bold tabular-nums">{Math.abs(stat.change)}%</span>
                          </div>
                        </td>
                        <td className="px-5 py-3.5">
                          <p className="text-sm font-medium text-slate-600 dark:text-slate-300 tabular-nums">{stat.arrests.toLocaleString()}</p>
                        </td>
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-3">
                            <span className={`text-sm font-bold tabular-nums ${
                              stat.clearance >= 80 ? 'text-emerald-600 dark:text-emerald-400' :
                              stat.clearance >= 65 ? 'text-orange-700 dark:text-orange-400' : 'text-red-600 dark:text-red-400'
                            }`}>{stat.clearance}%</span>
                            <div className="flex-1 h-1.5 bg-slate-200 dark:bg-zinc-800/50 rounded-full overflow-hidden max-w-[80px]">
                              <div className={`h-full ${
                                stat.clearance >= 80 ? 'bg-emerald-500' :
                                stat.clearance >= 65 ? 'bg-orange-500' : 'bg-red-500'
                              }`} style={{ width: `${stat.clearance}%` }} />
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Crime Forecasting */}
            <div className={CARD + ' overflow-hidden'}>
              <div className={CARD_HEADER}>
                <div className="flex items-center gap-2">
                  <Brain className="w-4 h-4 text-amber-500 dark:text-amber-400" />
                  <span className="text-[11px] font-bold text-slate-700 dark:text-slate-200 uppercase tracking-widest">Crime Forecasting — Next 30 Days</span>
                </div>
                <span className={BADGE('slate')}>AI projection</span>
              </div>
              <div className="p-5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                {crimeForecast.map((f, i) => (
                  <div key={i} className="p-3 rounded-lg border border-slate-200 dark:border-slate-700/40 bg-slate-50 dark:bg-zinc-950/30 text-center">
                    <p className="text-[11px] font-semibold text-slate-600 dark:text-slate-300 mb-2 leading-snug">{f.category}</p>
                    <div className={`flex items-center justify-center gap-1 ${getCrimeDirectionColor(f.direction)}`}>
                      {getCrimeDirectionIcon(f.direction)}
                      <span className="text-lg font-bold tabular-nums">{f.next30 > 0 ? '+' : ''}{f.next30}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hotspot Intelligence */}
            <div className={CARD + ' overflow-hidden'}>
              <div className={CARD_HEADER}>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-amber-500 dark:text-amber-400" />
                  <span className="text-[11px] font-bold text-slate-700 dark:text-slate-200 uppercase tracking-widest">Hotspot Intelligence</span>
                </div>
              </div>
              <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2.5">Highest Growth Areas</p>
                  <div className="space-y-2.5">
                    {hotspotIntelligence.highestGrowth.map((h, i) => (
                      <div key={i} className="flex items-start gap-2.5">
                        <MapPin className="w-3.5 h-3.5 text-red-500 dark:text-red-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-[12px] font-semibold text-slate-700 dark:text-slate-200 leading-snug">{h.area}</p>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400">{h.metric}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2.5">Emerging Patterns</p>
                  <div className="space-y-1.5">
                    {hotspotIntelligence.emergingPatterns.map((p, i) => (
                      <p key={i} className="text-[12px] text-slate-600 dark:text-slate-400 leading-snug">• {p}</p>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2.5">Recurring Offenders</p>
                  <div className="space-y-1.5">
                    {hotspotIntelligence.recurringOffenders.map((p, i) => (
                      <p key={i} className="text-[12px] text-slate-600 dark:text-slate-400 leading-snug">• {p}</p>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2.5">Seasonal Patterns</p>
                  <div className="space-y-1.5">
                    {hotspotIntelligence.seasonalPatterns.map((p, i) => (
                      <p key={i} className="text-[12px] text-slate-600 dark:text-slate-400 leading-snug">• {p}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Command Recommendations */}
            <div className={CARD + ' overflow-hidden'}>
              <div className={CARD_HEADER}>
                <div className="flex items-center gap-2">
                  <Crosshair className="w-4 h-4 text-amber-500 dark:text-amber-400" />
                  <span className="text-[11px] font-bold text-slate-700 dark:text-slate-200 uppercase tracking-widest">Command Recommendations</span>
                </div>
              </div>
              <div className="p-5 space-y-3">
                {commandRecommendations.map((rec, i) => (
                  <div key={i} className="p-4 rounded-lg border border-slate-200 dark:border-slate-700/40">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3 mb-2">
                      <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 min-w-0 break-words">{rec.title}</p>
                      <span className={getRiskLevelBadge(rec.severity) + ' flex-shrink-0 self-start sm:self-auto'}>{rec.severity}</span>
                    </div>
                    <ul className="space-y-1">
                      {rec.actions.map((a, j) => (
                        <li key={j} className="text-[12px] text-slate-600 dark:text-slate-400 leading-snug">• {a}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ══════════════ PERFORMANCE TRENDS TAB ═══════ */}
        {activeTab === 'trends' && (
          <div className="space-y-4">
            {/* AI Trend Analysis */}
            <div className={CARD + ' overflow-hidden'}>
              <div className={CARD_HEADER}>
                <div className="flex items-center gap-2">
                  <Brain className="w-4 h-4 text-amber-500 dark:text-amber-400" />
                  <span className="text-[11px] font-bold text-slate-700 dark:text-slate-200 uppercase tracking-widest">AI Trend Analysis</span>
                </div>
              </div>
              <div className="p-5">
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 mb-1">{trendAnalysis.observedPattern}</p>
                <p className="text-[12px] text-slate-500 dark:text-slate-400 mb-4">Average increase: <span className="font-bold text-slate-700 dark:text-slate-300">+{trendAnalysis.averageIncrease}%</span></p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2">Likely Causes</p>
                    <ul className="space-y-1">
                      {trendAnalysis.likelyCauses.map((c, i) => (
                        <li key={i} className="text-[12px] text-slate-600 dark:text-slate-400 leading-snug">• {c}</li>
                      ))}
                    </ul>
                  </div>
                  <div className={AI_CALLOUT}>
                    <Lightbulb className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[10px] font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wide mb-1">Recommendation</p>
                      <p className="text-[12px] text-amber-800/90 dark:text-amber-300/90 leading-snug">{trendAnalysis.recommendation}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Anomaly Detection */}
            <div className={CARD + ' overflow-hidden'}>
              <div className={CARD_HEADER}>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-500 dark:text-amber-400" />
                  <span className="text-[11px] font-bold text-slate-700 dark:text-slate-200 uppercase tracking-widest">Anomaly Detection</span>
                </div>
                <span className={BADGE('slate')}>{anomalyDetections.length} flagged</span>
              </div>
              <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-3">
                {anomalyDetections.map((a, i) => (
                  <div key={i} className="p-4 rounded-lg border border-slate-200 dark:border-slate-700/40">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3 mb-1.5">
                      <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 min-w-0 break-words">{a.title}</p>
                      <span className={getRiskLevelBadge(a.severity) + ' flex-shrink-0 self-start sm:self-auto'}>{a.severity}</span>
                    </div>
                    <p className="text-[12px] font-bold text-slate-600 dark:text-slate-300 mb-1.5">{a.metric}</p>
                    <p className="text-[12px] text-slate-500 dark:text-slate-400 leading-snug">{a.detail}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Monthly Trends */}
            <div className={CARD}>
              <div className={CARD_HEADER + ' flex-col sm:flex-row sm:items-center gap-2 sm:gap-0'}>
                <div className="flex items-center gap-2 flex-wrap min-w-0">
                  <TrendingUp className="w-4 h-4 text-blue-500 dark:text-blue-400 flex-shrink-0" />
                  <span className="text-[11px] font-bold text-slate-700 dark:text-slate-200 uppercase tracking-widest break-words">Monthly Performance Trends</span>
                  <span className="text-[11px] text-slate-400 dark:text-slate-500">· Rolling 10 months</span>
                </div>
                <div className="flex items-center gap-3 text-[10px] text-slate-400 dark:text-slate-500 flex-shrink-0">
                  <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-blue-400 inline-block" /> Call volume</span>
                  <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" /> Clearance %</span>
                </div>
              </div>

              {/* Intelligence callout */}
              <div className="mx-5 mt-4 mb-2 p-3 bg-amber-50 dark:bg-amber-500/5 border border-amber-200 dark:border-amber-500/20 rounded-lg flex items-start gap-2.5">
                <Zap className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                <p className="text-[11px] text-amber-800 dark:text-amber-300 leading-snug">
                  <span className="font-bold">SentryOps Intelligence:</span>{' '}
                  Clearance rate trending up +3.3 pts Jan–Oct. July peak (69.5%) coincides with tactical deployment surge. Q3 call volume +14% vs Q1 — FY27 summer staffing plan should account for this pattern.
                </p>
              </div>

              <div className="px-5 pb-4 space-y-0.5">
                {monthlyTrends.map((month, idx) => {
                  const isCurrent = idx === monthlyTrends.length - 1;
                  const callsPct  = Math.round((month.calls / maxCalls) * 100);
                  const clrTarget = 68;
                  return (
                    <div
                      key={idx}
                      className={`flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-3 rounded-lg px-3 py-2 transition-colors ${
                        isCurrent
                          ? 'bg-amber-50/60 dark:bg-amber-500/5 border border-amber-200/60 dark:border-amber-500/15'
                          : 'hover:bg-slate-50 dark:hover:bg-zinc-950/20'
                      }`}
                    >
                      <div className="flex items-center justify-between sm:justify-start gap-2 sm:w-14 flex-shrink-0">
                        <span className="text-[12px] font-bold text-slate-700 dark:text-slate-300 sm:w-7">{month.month}</span>
                        {isCurrent && <span className="text-[9px] font-bold text-amber-700 dark:text-amber-400 bg-amber-100 dark:bg-amber-500/20 px-1 py-0.5 rounded">NOW</span>}
                        <span className="text-[10px] text-slate-400 dark:text-slate-500 sm:hidden tabular-nums">{month.arrests.toLocaleString()} arr</span>
                      </div>
                      <div className="flex-1 space-y-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-1 bg-slate-200 dark:bg-zinc-800/50 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-400 dark:bg-blue-500 rounded-full" style={{ width: `${callsPct}%` }} />
                          </div>
                          <span className="text-[10px] text-slate-500 dark:text-slate-400 w-20 sm:w-24 text-right tabular-nums flex-shrink-0">{month.calls.toLocaleString()} calls</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-1 bg-slate-200 dark:bg-zinc-800/50 rounded-full overflow-hidden">
                            <div className={`h-full rounded-full ${month.clearance >= clrTarget ? 'bg-emerald-500' : 'bg-orange-500'}`} style={{ width: `${month.clearance}%` }} />
                          </div>
                          <span className={`text-[10px] font-bold w-20 sm:w-24 text-right tabular-nums flex-shrink-0 ${month.clearance >= clrTarget ? 'text-emerald-600 dark:text-emerald-400' : 'text-orange-700 dark:text-orange-400'}`}>
                            {month.clearance}% clr
                          </span>
                        </div>
                      </div>
                      <span className="hidden sm:inline text-[10px] text-slate-400 dark:text-slate-500 flex-shrink-0 w-16 text-right tabular-nums">{month.arrests.toLocaleString()} arr</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Seasonal Intelligence */}
            <div className={CARD + ' overflow-hidden'}>
              <div className={CARD_HEADER}>
                <span className="text-[11px] font-bold text-slate-700 dark:text-slate-200 uppercase tracking-widest">Seasonal Intelligence</span>
              </div>
              <div className="p-5 grid grid-cols-2 md:grid-cols-4 gap-3">
                {seasonalIntelligence.map((item, i) => (
                  <div key={i} className="bg-slate-50 dark:bg-zinc-950/30 rounded-lg p-3">
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 mb-1.5 leading-tight">{item.label}</p>
                    <p className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-0.5">{item.value}</p>
                    <p className={`text-[10px] font-semibold ${item.subColor}`}>{item.sub}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ══════════════ COMPLIANCE & LIABILITY TAB ═══ */}
        {activeTab === 'compliance' && (
          <div className="space-y-4">
            {/* Liability Exposure Score */}
            <div className={CARD + ' overflow-hidden'}>
              <div className="flex flex-col lg:flex-row lg:items-stretch">
                <div className="lg:w-72 flex-shrink-0 bg-slate-800 dark:bg-zinc-950/60 border-b lg:border-b-0 lg:border-r border-slate-700/40 p-5 flex flex-col justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2.5">
                      <Scale className="w-4 h-4 text-amber-400" />
                      <span className="text-[11px] font-bold text-amber-400 uppercase tracking-widest">Liability Exposure Score</span>
                    </div>
                    <p className={`text-2xl font-bold mb-1 ${getRiskLevelColor(liabilityExposure.level)}`}>{liabilityExposure.level}</p>
                    <p className="text-[12px] text-slate-300 leading-snug">{liabilityExposure.trendNote}</p>
                  </div>
                  <div className="border-t border-slate-700/40 pt-3">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Estimated Financial Exposure</p>
                    <p className="text-xl font-bold text-white">${(liabilityExposure.financialEstimate / 1000000).toFixed(2)}M</p>
                  </div>
                </div>
                <div className="flex-1 p-5">
                  <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-3">Top Exposure Drivers</p>
                  <div className="space-y-2.5">
                    {liabilityExposure.topDrivers.map((d, i) => (
                      <div key={i} className="flex items-start gap-2.5">
                        <Flag className="w-3.5 h-3.5 text-red-500 dark:text-red-400 flex-shrink-0 mt-0.5" />
                        <p className="text-[12px] text-slate-700 dark:text-slate-300 leading-snug">{d}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Compliance Standards */}
            <div className={CARD + ' overflow-hidden'}>
              <div className={CARD_HEADER}>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-amber-500 dark:text-amber-400" />
                  <span className="text-[11px] font-bold text-slate-700 dark:text-slate-200 uppercase tracking-widest">Compliance Standards</span>
                </div>
                <span className={BADGE('slate')}>{complianceItems.length} tracked</span>
              </div>
              <div className="divide-y divide-slate-100 dark:divide-slate-800/60">
                {complianceItems.map((item, i) => (
                  <div key={i} className="p-5">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-3 mb-2.5">
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-slate-800 dark:text-slate-100 break-words">{item.label}</p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 break-words">{item.area} · Next review: {item.nextReview}</p>
                      </div>
                      <span className={getComplianceBadge(item.status) + ' flex-shrink-0 self-start'}>{item.status}</span>
                    </div>
                    <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 mb-3">
                      <span className={`text-sm font-bold tabular-nums ${getCompliancePctColor(item.status)}`}>{item.pct}%</span>
                      <div className="flex-1 min-w-[80px] h-1.5 bg-slate-200 dark:bg-zinc-800/50 rounded-full overflow-hidden">
                        <div className={`h-full ${getComplianceBar(item.status)}`} style={{ width: `${item.pct}%` }} />
                      </div>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 break-words">{item.detail}</span>
                    </div>
                    <div className={AI_CALLOUT}>
                      <Brain className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                      <p className="text-[12px] text-amber-800/90 dark:text-amber-300/90 leading-snug">{item.aiInsight}</p>
                    </div>
                    {item.route && (
                      <button onClick={() => navigate(item.route)} className="mt-3 text-[11px] font-semibold text-amber-700 dark:text-amber-400 hover:underline">
                        View details →
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Corrective Action Plans */}
            <div className={CARD + ' overflow-hidden'}>
              <div className={CARD_HEADER}>
                <div className="flex items-center gap-2">
                  <ListChecks className="w-4 h-4 text-amber-500 dark:text-amber-400" />
                  <span className="text-[11px] font-bold text-slate-700 dark:text-slate-200 uppercase tracking-widest">Corrective Action Plans</span>
                </div>
                <span className={BADGE('slate')}>{correctiveActionPlans.length} tracked</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50 dark:bg-zinc-950/40 border-b border-slate-200 dark:border-slate-700/30">
                    <tr>
                      {['Finding', 'Owner', 'Due', 'Status', 'Severity'].map(h => (
                        <th key={h} className="px-5 py-3 text-left text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {correctiveActionPlans.map((cap) => (
                      <tr key={cap.id} className="border-b border-slate-100 dark:border-slate-800/30 hover:bg-slate-50 dark:hover:bg-zinc-900/20 transition-colors">
                        <td className="px-5 py-3.5">
                          <p className="text-sm font-medium text-slate-700 dark:text-slate-200">{cap.finding}</p>
                        </td>
                        <td className="px-5 py-3.5">
                          <p className={`text-sm ${cap.owner === 'Unassigned' ? 'text-red-600 dark:text-red-400 font-bold' : 'text-slate-600 dark:text-slate-300'}`}>{cap.owner}</p>
                        </td>
                        <td className="px-5 py-3.5">
                          <p className="text-sm text-slate-600 dark:text-slate-300 tabular-nums whitespace-nowrap">{cap.due}</p>
                        </td>
                        <td className="px-5 py-3.5">
                          <span className={cap.status === 'Overdue' ? BADGE('red') : cap.status === 'In Progress' ? BADGE('blue') : BADGE('slate')}>{cap.status}</span>
                        </td>
                        <td className="px-5 py-3.5">
                          <span className={getRiskLevelBadge(cap.severity)}>{cap.severity}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Use-of-Force Review + Internal Affairs Trends */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className={CARD + ' p-5'}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-amber-500 dark:text-amber-400" />
                    <span className="text-[11px] font-bold text-slate-700 dark:text-slate-200 uppercase tracking-widest">Use-of-Force Review</span>
                  </div>
                  <span className={BADGE('green')}>{useOfForceReview.status}</span>
                </div>
                <div className="grid grid-cols-3 gap-2 mb-3 text-center">
                  <div>
                    <p className="text-lg font-bold text-slate-800 dark:text-slate-100">{useOfForceReview.last90}</p>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wide">Last 90 Days</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-slate-800 dark:text-slate-100">{useOfForceReview.pendingReview}</p>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wide">Pending Review</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-slate-800 dark:text-slate-100">{useOfForceReview.overdue}</p>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wide">Overdue</p>
                  </div>
                </div>
                <p className="text-[12px] text-slate-500 dark:text-slate-400 leading-snug mb-3">{useOfForceReview.detail}</p>
                <div className={AI_CALLOUT}>
                  <Brain className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                  <p className="text-[12px] text-amber-800/90 dark:text-amber-300/90 leading-snug">{useOfForceReview.aiInsight}</p>
                </div>
              </div>

              <div className={CARD + ' p-5'}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Flag className="w-4 h-4 text-amber-500 dark:text-amber-400" />
                    <span className="text-[11px] font-bold text-slate-700 dark:text-slate-200 uppercase tracking-widest">Internal Affairs Trends</span>
                  </div>
                  <span className={`flex items-center gap-1 text-xs font-bold ${getChangeColor(internalAffairsTrends.changeVsPrior)}`}>
                    {getChangeIcon(internalAffairsTrends.changeVsPrior)}{Math.abs(internalAffairsTrends.changeVsPrior)}%
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 mb-3 text-center">
                  <div>
                    <p className="text-lg font-bold text-slate-800 dark:text-slate-100">{internalAffairsTrends.open}</p>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wide">Open Cases</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-slate-800 dark:text-slate-100">{internalAffairsTrends.filedLast90}</p>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wide">Filed Last 90 Days</p>
                  </div>
                </div>
                <p className="text-[12px] text-slate-500 dark:text-slate-400 leading-snug mb-3">{internalAffairsTrends.detail}</p>
                <div className={AI_CALLOUT}>
                  <Brain className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                  <p className="text-[12px] text-amber-800/90 dark:text-amber-300/90 leading-snug">{internalAffairsTrends.aiInsight}</p>
                </div>
              </div>
            </div>

            {/* Financial Exposure + AI Risk Forecast */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className={CARD + ' overflow-hidden'}>
                <div className={CARD_HEADER}>
                  <div className="flex items-center gap-2 min-w-0">
                    <DollarSign className="w-4 h-4 text-amber-500 dark:text-amber-400 flex-shrink-0" />
                    <span className="text-[11px] font-bold text-slate-700 dark:text-slate-200 uppercase tracking-widest break-words">Financial Exposure</span>
                  </div>
                  <span className="text-sm font-bold text-red-600 dark:text-red-400 flex-shrink-0">${(financialExposure.total / 1000000).toFixed(2)}M</span>
                </div>
                <div className="p-5 space-y-3">
                  {financialExposure.drivers.map((d, i) => {
                    const pct = Math.round((d.amount / financialExposure.total) * 100);
                    return (
                      <div key={i}>
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <p className="text-[12px] text-slate-600 dark:text-slate-300 leading-snug min-w-0 break-words">{d.label}</p>
                          <span className="text-[12px] font-bold text-slate-700 dark:text-slate-200 whitespace-nowrap flex-shrink-0">${(d.amount / 1000).toFixed(0)}K</span>
                        </div>
                        <div className="h-1.5 bg-slate-200 dark:bg-zinc-800/50 rounded-full overflow-hidden">
                          <div className="h-full bg-red-500 rounded-full" style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className={CARD + ' overflow-hidden'}>
                <div className={CARD_HEADER}>
                  <div className="flex items-center gap-2">
                    <Brain className="w-4 h-4 text-amber-500 dark:text-amber-400" />
                    <span className="text-[11px] font-bold text-slate-700 dark:text-slate-200 uppercase tracking-widest">AI Risk Forecast</span>
                  </div>
                </div>
                <div className="p-5">
                  <div className={AI_CALLOUT}>
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                    <p className="text-[12px] text-amber-800/90 dark:text-amber-300/90 leading-snug">{riskForecast.outlook}</p>
                  </div>
                  <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mt-4 mb-2">Recommended Actions</p>
                  <ul className="space-y-1.5">
                    {riskForecast.recommendedActions.map((a, i) => (
                      <li key={i} className="flex items-start gap-2 text-[12px] text-slate-600 dark:text-slate-400 leading-snug">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ══════════════ REPORTS LIBRARY TAB ══════════ */}
        {activeTab === 'reports' && (
          <div className="space-y-4">
            {/* Search + filter */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search reports by name or category..."
                  className="w-full pl-11 pr-4 py-2.5 bg-white dark:bg-zinc-900/40 border border-slate-200 dark:border-slate-700/30 rounded-lg text-slate-700 dark:text-slate-300 placeholder-slate-400 text-sm focus:outline-none focus:border-amber-500/50"
                />
              </div>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-4 py-2.5 bg-white dark:bg-zinc-900/40 border border-slate-200 dark:border-slate-700/30 rounded-lg text-slate-700 dark:text-slate-300 text-sm focus:outline-none focus:border-amber-500/50 cursor-pointer w-full sm:w-auto"
              >
                <option value="all">All Categories</option>
                <option value="Executive">Executive</option>
                <option value="Operations">Operations</option>
                <option value="HR">HR</option>
                <option value="Finance">Finance</option>
                <option value="Training">Training</option>
                <option value="Support">Support</option>
                <option value="Community">Community</option>
              </select>
            </div>

            {/* Report cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredReports.map(report => {
                const Icon = report.icon;
                const cat  = CATEGORY_STYLE[report.category] || CATEGORY_STYLE['Operations'];
                return (
                  <div key={report.id} className={`${CARD} p-5 hover:border-slate-400 dark:hover:border-slate-600/50 transition-all group`}>
                    <div className="flex items-start gap-4">
                      <div className={`w-10 h-10 ${cat.iconBg} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:opacity-80 transition-opacity`}>
                        <Icon className={`w-5 h-5 ${cat.iconColor}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        {/* Title row */}
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-1.5">
                          <h4 className="text-[13px] font-bold text-slate-800 dark:text-slate-100 leading-tight min-w-0 break-words">{report.name}</h4>
                          <div className="flex items-center gap-1.5 flex-wrap flex-shrink-0">
                            <span className={getImportanceBadge(report.importance)}>{report.importance}</span>
                            <span className={BADGE(cat.badge)}>{report.category}</span>
                            {report.scheduled && <span className={BADGE('green')}>Auto</span>}
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-3 leading-snug break-words">{report.description}</p>

                        {/* Metadata row */}
                        <div className="flex items-center gap-4 flex-wrap text-[10px] text-slate-400 dark:text-slate-500 mb-3">
                          <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{report.frequency}</span>
                          <span className="flex items-center gap-1"><FileText className="w-3 h-3" />{report.pages}p</span>
                          <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{report.views}</span>
                          <span className="flex items-center gap-1"><Download className="w-3 h-3" />{report.downloads}</span>
                        </div>

                        {/* Footer row */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                          <span className="text-[10px] text-slate-400 dark:text-slate-500 flex-shrink-0">
                            Generated {report.lastGenerated}
                          </span>
                          <div className="flex items-center gap-2 flex-wrap sm:justify-end">
                            <button onClick={() => toggleSummary(report.id)} className={secondaryBtn}>
                              <Sparkles className="w-3 h-3" /> {expandedSummaries.has(report.id) ? 'Hide Summary' : 'Generate Summary'}
                              {expandedSummaries.has(report.id) ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                            </button>
                            <button onClick={() => setReportDetailModal(report)} className={primaryBtn}>
                              <Eye className="w-3 h-3" /> View
                            </button>
                            <button className={secondaryBtn}><Download className="w-3 h-3" /> Export</button>
                            <button className={secondaryBtn}><RefreshCw className="w-3 h-3" /> Run</button>
                            {!report.scheduled && (
                              <button onClick={() => setScheduleModal(report)} className={secondaryBtn}>
                                <PlayCircle className="w-3 h-3" /> Schedule
                              </button>
                            )}
                          </div>
                        </div>

                        {/* AI Executive Summary */}
                        {expandedSummaries.has(report.id) && (
                          <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800/60 space-y-3">
                            <div className="flex items-center gap-2">
                              <Brain className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
                              <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">AI Executive Summary</span>
                            </div>
                            <div>
                              <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">Key Findings</p>
                              <ul className="space-y-1">
                                {report.aiSummary.findings.map((f, i) => (
                                  <li key={i} className="text-[12px] text-slate-600 dark:text-slate-400 leading-snug">• {f}</li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">Risks</p>
                              <ul className="space-y-1">
                                {report.aiSummary.risks.map((r, i) => (
                                  <li key={i} className="text-[12px] text-slate-600 dark:text-slate-400 leading-snug">• {r}</li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">Recommendations</p>
                              <ul className="space-y-1">
                                {report.aiSummary.recommendations.map((r, i) => (
                                  <li key={i} className="text-[12px] text-slate-600 dark:text-slate-400 leading-snug">• {r}</li>
                                ))}
                              </ul>
                            </div>
                            <div className={AI_CALLOUT}>
                              <AlertTriangle className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                              <div>
                                <p className="text-[10px] font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wide mb-1">Required Actions</p>
                                <ul className="space-y-1">
                                  {report.aiSummary.requiredActions.map((a, i) => (
                                    <li key={i} className="text-[12px] text-amber-800/90 dark:text-amber-300/90 leading-snug">• {a}</li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>

      {/* Toast notification */}
      {toast && (
        <div className={`fixed bottom-6 right-6 left-6 sm:left-auto z-50 flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg border text-sm font-medium ${
          toast.type === 'success'
            ? 'bg-emerald-50 dark:bg-emerald-900/30 border-emerald-200 dark:border-emerald-500/30 text-emerald-800 dark:text-emerald-300'
            : 'bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-500/30 text-red-800 dark:text-red-300'
        }`}>
          <CheckCircle className="w-4 h-4 flex-shrink-0" />
          <span className="min-w-0 break-words">{toast.message}</span>
          <button onClick={() => setToast(null)} className="ml-1 opacity-60 hover:opacity-100 flex-shrink-0">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </DashboardLayout>
  );
}

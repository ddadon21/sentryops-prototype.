import React, { useState, useEffect, useRef } from 'react';
import { FileText, TrendingUp, AlertCircle, AlertTriangle, MessageCircle, DollarSign, CheckCircle, Sparkles, X, Send, Download, ArrowUpRight, ArrowDownRight, TrendingDown, Calendar, Filter, Eye, PieChart, BarChart3, LineChart, Package, Truck, Wrench, ChevronDown, ChevronUp, Info, ArrowUpCircle, RefreshCw, FileSpreadsheet, Mail, Zap, Clock, Users, Building2, Target, Wallet, CircleDollarSign, Receipt, CreditCard, CalendarClock, Bot, CircleAlert, Lightbulb, Percent, ArrowDown, ArrowUp, Briefcase, ShieldAlert, BadgeCheck, BadgeAlert, Activity, Banknote, PiggyBank, Calculator, FileBarChart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import DashboardLayout from '../layouts/DashboardLayout';

export default function BudgetResources() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview'); // overview, divisions, resources, forecast
  const [chatOpen, setChatOpen] = useState(false);
  const [selectedDivision, setSelectedDivision] = useState(null);
  const [timeRange, setTimeRange] = useState('ytd'); // ytd, q4, monthly
  const [expandedCategories, setExpandedCategories] = useState(new Set());
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [monthDetailModal, setMonthDetailModal] = useState(null);
  const [reallocationModal, setReallocationModal] = useState(false);
  const [exportModal, setExportModal] = useState(false);
  const [varianceReportOpen, setVarianceReportOpen] = useState(false);
  const [aiInsightsExpanded, setAiInsightsExpanded] = useState(true);
  const [confirmActionModal, setConfirmActionModal] = useState(null);
  const [applyAllModal, setApplyAllModal] = useState(false);
  const [actionFilter, setActionFilter] = useState('all');
  const [actionSort, setActionSort] = useState('impact');
  const [selectedActions, setSelectedActions] = useState(new Set([1, 2, 3, 4, 5]));
  const [appliedActionIds, setAppliedActionIds] = useState(new Set());
  const [auditLog, setAuditLog] = useState([
    { id: 'al-1', actionTitle: 'Fleet maintenance contract renegotiated', appliedBy: 'Chief R. Johnson', appliedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), savings: 45000, riskLevel: 'Low', note: 'Vendor agreed to 8% reduction for 3-year extension. Effective immediately.' },
    { id: 'al-2', actionTitle: 'Patrol overtime cap enforced — October', appliedBy: 'Capt. D. Martinez', appliedAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000), savings: 28000, riskLevel: 'Low', note: 'Cap enforced for 4 weeks. No service incidents reported.' },
    { id: 'al-3', actionTitle: 'Deferred HVAC upgrade to Q1 FY2025', appliedBy: 'Dir. S. Park', appliedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000), savings: 62000, riskLevel: 'Medium', note: 'Upgrade deferred pending contractor availability review.' },
  ]);
  const [auditLogExpanded, setAuditLogExpanded] = useState(false);
  const [predictiveExpanded, setPredictiveExpanded] = useState(true);
  const [toast, setToast] = useState(null); // { id, message, saving }
  const [flashSet, setFlashSet] = useState(new Set()); // element keys currently flashing
  const toastTimerRef = useRef(null);
  const [simOT, setSimOT] = useState(0);
  const [simHires, setSimHires] = useState(0);
  const [simFleetDelay, setSimFleetDelay] = useState(0);
  const [expandedActionId, setExpandedActionId] = useState(null);
  const [pendingPOsModal, setPendingPOsModal] = useState(false);
  const [poSpentDelta, setPoSpentDelta] = useState(0);
  const [poAvailableDelta, setPoAvailableDelta] = useState(0);
  const [pendingPOs, setPendingPOs] = useState([
    { id: 'po-001', vendor: 'Fleet Solutions Inc.', description: 'Q4 Fleet Maintenance — Patrol vehicles', division: 'Support Services', amount: 420000, submitted: 'Nov 2, 2024', priority: 'High', category: 'Fleet' },
    { id: 'po-002', vendor: 'Axon Enterprise', description: 'Body camera refresh — 85 units', division: 'Patrol Division', amount: 248500, submitted: 'Oct 28, 2024', priority: 'High', category: 'Equipment' },
    { id: 'po-003', vendor: 'Motorola Solutions', description: 'Radio equipment & maintenance contract', division: 'Support Services', amount: 187000, submitted: 'Nov 4, 2024', priority: 'Medium', category: 'Communications' },
    { id: 'po-004', vendor: 'Correct Care Solutions', description: 'Medical services Q4 — Detention Division', division: 'Detention Division', amount: 165000, submitted: 'Nov 1, 2024', priority: 'High', category: 'Medical' },
    { id: 'po-005', vendor: 'CDW Government', description: 'IT infrastructure refresh — 85 workstations', division: 'Administrative Services', amount: 142000, submitted: 'Oct 30, 2024', priority: 'Medium', category: 'IT' },
    { id: 'po-006', vendor: 'Aramark Correctional', description: 'Inmate food services — Nov & Dec', division: 'Detention Division', amount: 136000, submitted: 'Nov 3, 2024', priority: 'High', category: 'Operations' },
    { id: 'po-007', vendor: 'Galls LLC', description: 'Patrol uniforms & tactical gear Q4', division: 'Patrol Division', amount: 89500, submitted: 'Oct 25, 2024', priority: 'Low', category: 'Equipment' },
    { id: 'po-008', vendor: 'Taser International', description: 'CEW device replacements — 32 units', division: 'Patrol Division', amount: 76800, submitted: 'Nov 5, 2024', priority: 'Medium', category: 'Equipment' },
    { id: 'po-009', vendor: 'Georgia Power', description: 'Facility utilities — Nov & Dec', division: 'Detention Division', amount: 68000, submitted: 'Nov 1, 2024', priority: 'High', category: 'Facilities' },
    { id: 'po-010', vendor: 'SafariLand Group', description: 'Body armor replacement — 45 units', division: 'Patrol Division', amount: 58500, submitted: 'Oct 27, 2024', priority: 'High', category: 'Equipment' },
    { id: 'po-011', vendor: 'WatchGuard Video', description: 'In-car video maintenance contract', division: 'Patrol Division', amount: 45200, submitted: 'Nov 6, 2024', priority: 'Low', category: 'Equipment' },
    { id: 'po-012', vendor: 'Lexipol LLC', description: 'Policy management software renewal', division: 'Administrative Services', amount: 38400, submitted: 'Oct 29, 2024', priority: 'Medium', category: 'IT' },
    { id: 'po-013', vendor: 'Axon Enterprise', description: 'Taser cartridge resupply Q4', division: 'Patrol Division', amount: 34200, submitted: 'Nov 7, 2024', priority: 'Low', category: 'Equipment' },
    { id: 'po-014', vendor: 'Stericycle Inc.', description: 'Medical waste disposal — Nov & Dec', division: 'Detention Division', amount: 28900, submitted: 'Nov 3, 2024', priority: 'Low', category: 'Facilities' },
    { id: 'po-015', vendor: 'Office Depot Business', description: 'Office supplies — all divisions Q4', division: 'Administrative Services', amount: 24000, submitted: 'Nov 5, 2024', priority: 'Low', category: 'Supplies' },
  ]);

  // Budget data
  const fiscalYear = {
    year: 'FY 2024',
    totalBudget: 48500000,
    spent: 41225000,
    committed: 3800000,
    available: 3475000,
    percentSpent: 85,
    percentCommitted: 7.8,
    variance: -250000, // negative = over budget
    projectedYearEnd: 48750000
  };

  const divisionBudgets = [
    {
      id: 1,
      name: 'Patrol Division',
      budget: 15200000,
      spent: 12900000,
      committed: 1200000,
      available: 1100000,
      percentSpent: 84.9,
      variance: -150000,
      categories: [
        { name: 'Personnel', budget: 11500000, spent: 9800000, percent: 85.2 },
        { name: 'Vehicles', budget: 2100000, spent: 1800000, percent: 85.7 },
        { name: 'Equipment', budget: 980000, spent: 820000, percent: 83.7 },
        { name: 'Training', budget: 420000, spent: 310000, percent: 73.8 },
        { name: 'Operations', budget: 200000, spent: 170000, percent: 85.0 }
      ]
    },
    {
      id: 2,
      name: 'Detention Division',
      budget: 18500000,
      spent: 15800000,
      committed: 1400000,
      available: 1300000,
      percentSpent: 85.4,
      variance: 100000,
      categories: [
        { name: 'Personnel', budget: 14200000, spent: 12100000, percent: 85.2 },
        { name: 'Inmate Services', budget: 2800000, spent: 2400000, percent: 85.7 },
        { name: 'Facility Maintenance', budget: 980000, spent: 850000, percent: 86.7 },
        { name: 'Medical', budget: 420000, spent: 360000, percent: 85.7 },
        { name: 'Food Services', budget: 100000, spent: 90000, percent: 90.0 }
      ]
    },
    {
      id: 3,
      name: 'Investigations',
      budget: 5200000,
      spent: 4450000,
      committed: 450000,
      available: 300000,
      percentSpent: 85.6,
      variance: -50000,
      categories: [
        { name: 'Personnel', budget: 4100000, spent: 3500000, percent: 85.4 },
        { name: 'Forensics', budget: 680000, spent: 580000, percent: 85.3 },
        { name: 'Equipment', budget: 280000, spent: 240000, percent: 85.7 },
        { name: 'Training', budget: 140000, spent: 130000, percent: 92.9 }
      ]
    },
    {
      id: 4,
      name: 'Administrative Services',
      budget: 4100000,
      spent: 3480000,
      committed: 380000,
      available: 240000,
      percentSpent: 84.9,
      variance: 50000,
      categories: [
        { name: 'Personnel', budget: 2800000, spent: 2380000, percent: 85.0 },
        { name: 'IT Infrastructure', budget: 680000, spent: 580000, percent: 85.3 },
        { name: 'Facilities', budget: 420000, spent: 360000, percent: 85.7 },
        { name: 'Office Supplies', budget: 200000, spent: 160000, percent: 80.0 }
      ]
    },
    {
      id: 5,
      name: 'Training Division',
      budget: 2600000,
      spent: 2100000,
      committed: 280000,
      available: 220000,
      percentSpent: 80.8,
      variance: 150000,
      categories: [
        { name: 'Personnel', budget: 1200000, spent: 980000, percent: 81.7 },
        { name: 'Programs', budget: 850000, spent: 680000, percent: 80.0 },
        { name: 'Certifications', budget: 380000, spent: 310000, percent: 81.6 },
        { name: 'Equipment', budget: 170000, spent: 130000, percent: 76.5 }
      ]
    },
    {
      id: 6,
      name: 'Support Services',
      budget: 2900000,
      spent: 2495000,
      committed: 90000,
      available: 315000,
      percentSpent: 86.0,
      variance: -100000,
      categories: [
        { name: 'Fleet Maintenance', budget: 1400000, spent: 1200000, percent: 85.7 },
        { name: 'Communications', budget: 780000, spent: 670000, percent: 85.9 },
        { name: 'Records Management', budget: 520000, spent: 445000, percent: 85.6 },
        { name: 'Property & Evidence', budget: 200000, spent: 180000, percent: 90.0 }
      ]
    }
  ];

  const resources = {
    vehicles: {
      total: 245,
      patrol: 128,
      investigation: 42,
      administration: 35,
      support: 40,
      maintenance: 18,
      replacement: 25
    },
    facilities: {
      main: 'Gwinnett Justice & Admin Center',
      detention: 'Gwinnett County Detention Center',
      substations: 4,
      trainingFacility: 1,
      totalSqFt: 485000
    },
    equipment: {
      bodyArmor: { total: 520, needsReplacement: 45 },
      firearms: { total: 680, needsReplacement: 28 },
      radios: { total: 550, needsReplacement: 62 },
      computers: { total: 420, needsReplacement: 85 },
      bodyCameras: { total: 380, needsReplacement: 0 }
    }
  };

  const monthlyTrend = [
    { month: 'Jan', spent: 3800000, budget: 4040000, personnel: 3000000, operations: 520000, training: 150000, equipment: 130000 },
    { month: 'Feb', spent: 3750000, budget: 4040000, personnel: 2950000, operations: 510000, training: 140000, equipment: 150000 },
    { month: 'Mar', spent: 3900000, budget: 4040000, personnel: 3050000, operations: 530000, training: 180000, equipment: 140000 },
    { month: 'Apr', spent: 3850000, budget: 4040000, personnel: 3020000, operations: 525000, training: 160000, equipment: 145000 },
    { month: 'May', spent: 3920000, budget: 4040000, personnel: 3080000, operations: 535000, training: 165000, equipment: 140000 },
    { month: 'Jun', spent: 3980000, budget: 4040000, personnel: 3120000, operations: 540000, training: 170000, equipment: 150000 },
    { month: 'Jul', spent: 4100000, budget: 4040000, personnel: 3200000, operations: 650000, training: 150000, equipment: 100000,
      variance: { overtime: 80000, hvac: 45000, vehicles: 35000 } },
    { month: 'Aug', spent: 4050000, budget: 4040000, personnel: 3180000, operations: 560000, training: 160000, equipment: 150000 },
    { month: 'Sep', spent: 3900000, budget: 4040000, personnel: 3060000, operations: 530000, training: 170000, equipment: 140000 },
    { month: 'Oct', spent: 3975000, budget: 4040000, personnel: 3100000, operations: 545000, training: 180000, equipment: 150000 }
  ];

  const toggleCategory = (divisionId) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(divisionId)) {
      newExpanded.delete(divisionId);
    } else {
      newExpanded.add(divisionId);
    }
    setExpandedCategories(newExpanded);
  };

  const getVarianceColor = (variance) => {
    if (variance > 0) return 'text-green-600 dark:text-green-400';
    if (variance < -100000) return 'text-red-700 dark:text-red-400';
    return 'text-amber-700 dark:text-amber-400';
  };

  const getPercentColor = (percent) => {
    if (percent >= 95) return 'red';
    if (percent >= 85) return 'amber';
    return 'green';
  };

  const overBudgetProjection = fiscalYear.projectedYearEnd - fiscalYear.totalBudget;
  const isOverBudgetProjection = overBudgetProjection > 0;
  const primaryBtn = 'inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold bg-amber-500 hover:bg-amber-600 text-white border border-amber-600/40 transition-colors';
  const secondaryBtn = 'inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold bg-white dark:bg-slate-800/60 hover:bg-slate-50 dark:hover:bg-slate-700/60 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/40 transition-colors';
  const ghostBtn = 'inline-flex items-center gap-1 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors';
  const CARD = 'bg-white dark:bg-slate-800/25 border border-slate-200 dark:border-slate-700/30 rounded-xl';
  const CARD_HEADER = 'flex items-center justify-between px-5 py-3.5 border-b border-slate-100 dark:border-slate-800/60';
  const BADGE = (color) => {
    if (color === 'red') return 'px-2 py-0.5 text-[10px] font-bold rounded bg-red-100 dark:bg-red-500/10 text-red-700 dark:text-red-400';
    if (color === 'amber') return 'px-2 py-0.5 text-[10px] font-bold rounded bg-amber-100 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400';
    if (color === 'green') return 'px-2 py-0.5 text-[10px] font-bold rounded bg-green-100 dark:bg-green-500/10 text-green-700 dark:text-green-400';
    if (color === 'violet') return 'px-2 py-0.5 text-[10px] font-bold rounded bg-violet-100 dark:bg-violet-500/10 text-violet-700 dark:text-violet-400';
    return 'px-2 py-0.5 text-[10px] font-bold rounded bg-slate-100 dark:bg-slate-700/40 text-slate-600 dark:text-slate-400';
  };

  const fmt = (v) => {
    const abs = Math.abs(v);
    if (abs >= 1000000) return `$${(v / 1000000).toFixed(1)}M`;
    if (abs >= 1000) return `$${Math.round(v / 1000)}K`;
    return `$${v}`;
  };

  const recommendedActions = [
    {
      id: 1,
      title: 'Reallocate Training Division surplus to Patrol',
      why: 'Patrol is trending $150K over budget with 61 days left. Without intervention it will close the FY in deficit — impacting next year\'s allocation request.',
      consequence: 'Moves $300K from Training\'s $600K surplus directly into Patrol. Training still closes with $300K buffer. Patrol returns to within budget.',
      impact: 300000, urgency: 'High', confidence: 92, confidenceLabel: 'High',
      riskLevel: 'Low', affectedDepts: ['Patrol Division', 'Training Division'],
      categories: ['urgent', 'cost-saving'],
      affectedAreas: [
        { area: 'Training Division — Available', delta: -300000 },
        { area: 'Patrol Division — Available', delta: 300000 },
        { area: 'Patrol Division — Deficit (eliminated)', delta: 150000 },
      ],
      exactChanges: [
        { account: 'Training Division — Available', before: 600000, after: 300000, delta: -300000 },
        { account: 'Patrol Division — Available', before: 1100000, after: 1400000, delta: 300000 },
        { account: 'Patrol Division — Variance', before: -150000, after: 150000, delta: 300000 },
      ],
    },
    {
      id: 2,
      title: 'Cap overtime to emergencies only — Nov & Dec',
      why: 'Overtime is at 92% utilization with two months remaining and on pace to exceed its allocation by $300K — the single largest controllable cost driver.',
      consequence: 'Hard cap saves $220K. All non-emergency OT requires supervisor sign-off. Patrol coverage maintained through existing scheduling.',
      impact: 220000, urgency: 'High', confidence: 88, confidenceLabel: 'High',
      riskLevel: 'Medium', affectedDepts: ['All Divisions'],
      categories: ['urgent', 'high-impact', 'cost-saving'],
      affectedAreas: [
        { area: 'Patrol Division — Overtime', delta: -120000 },
        { area: 'Detention Division — Overtime', delta: -65000 },
        { area: 'Investigations — Overtime', delta: -35000 },
      ],
      exactChanges: [
        { account: 'Personnel — Overtime (All Divisions)', before: 1840000, after: 1620000, delta: -220000 },
        { account: 'Projected Year-End Total', before: 49700000, after: 49480000, delta: -220000 },
      ],
    },
    {
      id: 3,
      title: 'Defer non-critical equipment purchases to FY 2025',
      why: 'Q4 equipment orders are discretionary and already budgeted in FY25. Executing them now accelerates spend with no operational advantage this year.',
      consequence: 'Defers $180K to next fiscal year. Safety and mission-critical equipment is excluded — reviewed item by item.',
      impact: 180000, urgency: 'Medium', confidence: 79, confidenceLabel: 'Medium',
      riskLevel: 'Low', affectedDepts: ['All Divisions'],
      categories: ['high-impact', 'cost-saving'],
      affectedAreas: [
        { area: 'Equipment Budget', delta: -180000 },
        { area: 'FY2025 Carryover', delta: 180000 },
      ],
      exactChanges: [
        { account: 'Equipment — Discretionary Purchases', before: 420000, after: 240000, delta: -180000 },
        { account: 'Committed — FY2025 Carry-forward', before: 0, after: 180000, delta: 180000 },
      ],
    },
    {
      id: 4,
      title: 'Freeze discretionary spend in Support Services',
      why: 'Support Services has $315K available but $90K already committed, leaving only $225K of true buffer. Uncontrolled end-of-year spend is a common overage source.',
      consequence: 'Saves $100K. Freezes all non-PO\'d, non-essential purchases through Dec 31. No active contracts or services disrupted.',
      impact: 100000, urgency: 'Medium', confidence: 91, confidenceLabel: 'High',
      riskLevel: 'Low', affectedDepts: ['Support Services'],
      categories: ['cost-saving'],
      affectedAreas: [
        { area: 'Support Services — Discretionary', delta: -100000 },
        { area: 'Support Services — Available Buffer', delta: 100000 },
      ],
      exactChanges: [
        { account: 'Support Services — Discretionary', before: 225000, after: 125000, delta: -100000 },
        { account: 'Support Services — Available (true)', before: 225000, after: 325000, delta: 100000 },
      ],
    },
    {
      id: 5,
      title: 'Delay 2 admin hires until January 2025',
      why: 'Two admin positions are open but not operationally critical for Q4. Filling them now adds payroll that pushes the year-end total closer to the limit.',
      consequence: 'Saves $85K in Nov–Dec salary and benefits. Positions remain approved and will be filled on schedule in January.',
      impact: 85000, urgency: 'Low', confidence: 75, confidenceLabel: 'Medium',
      riskLevel: 'Low', affectedDepts: ['Administrative Services'],
      categories: ['cost-saving'],
      affectedAreas: [
        { area: 'Admin Services — Personnel (Nov–Dec)', delta: -85000 },
        { area: 'Available Buffer', delta: 85000 },
      ],
      exactChanges: [
        { account: 'Admin Services — Personnel (Nov–Dec)', before: 485000, after: 400000, delta: -85000 },
        { account: 'Admin Services — Available', before: 240000, after: 325000, delta: 85000 },
      ],
    },
  ];

  const totalActionSavings = recommendedActions.reduce((sum, a) => sum + a.impact, 0);
  const urgencyOrder = { High: 0, Medium: 1, Low: 2 };
  const riskOrder = { Low: 0, Medium: 1, High: 2 };
  const sortedActions = [...recommendedActions].sort((a, b) => {
    if (actionSort === 'impact') return b.impact - a.impact;
    if (actionSort === 'urgency') return urgencyOrder[a.urgency] - urgencyOrder[b.urgency];
    if (actionSort === 'risk') return riskOrder[a.riskLevel] - riskOrder[b.riskLevel];
    return 0;
  });
  const filteredActions = actionFilter === 'all'
    ? sortedActions
    : sortedActions.filter(a => a.categories.includes(actionFilter));
  const selectedActionSavings = [...selectedActions].reduce(
    (sum, id) => sum + (recommendedActions.find(a => a.id === id)?.impact || 0), 0
  );
  const overrunAmount = 1200000;
  const postActionOverrun = overrunAmount - selectedActionSavings;
  const fmtAuditDate = (d) => {
    const diff = Math.floor((Date.now() - d.getTime()) / 86400000);
    if (diff === 0) return 'Today';
    if (diff === 1) return 'Yesterday';
    return `${diff} days ago`;
  };

  // Live forecast — updates as actions are applied
  const BASE_PROJECTION = 49700000;
  const BUDGET = fiscalYear.totalBudget; // 48,500,000
  const appliedSavings = [...appliedActionIds].reduce(
    (sum, id) => sum + (recommendedActions.find(a => a.id === id)?.impact || 0), 0
  );
  const liveProjection = BASE_PROJECTION - appliedSavings;
  const liveOverrun = liveProjection - BUDGET; // positive = over, negative = under budget
  const isLiveOverBudget = liveOverrun > 0;
  const liveAvailable = fiscalYear.available + appliedSavings + poAvailableDelta;
  const liveSpent = fiscalYear.spent + poSpentDelta;
  const liveCommitted = fiscalYear.committed - poSpentDelta - poAvailableDelta;
  const liveCommittedPct = (liveCommitted / fiscalYear.totalBudget) * 100;
  const pendingActions = recommendedActions.filter(a => !appliedActionIds.has(a.id));
  const pendingSavings = pendingActions.reduce((sum, a) => sum + a.impact, 0);
  const projectionAfterAllPending = liveProjection - pendingSavings;
  const projectionAfterAllPendingOverrun = projectionAfterAllPending - BUDGET;

  // Budget Risk Score (0–100, higher = healthier)
  const budgetRiskScore = Math.round(
    (isLiveOverBudget ? 0 : Math.max(0, 100 - (liveOverrun / 50000))) * 0.30 +
    (fiscalYear.percentSpent > 90 ? 35 : fiscalYear.percentSpent > 85 ? 60 : 85) * 0.25 +
    (pendingActions.length === 0 ? 100 : Math.max(0, 100 - pendingActions.length * 12)) * 0.25 +
    ((liveAvailable / BUDGET) > 0.1 ? 90 : (liveAvailable / BUDGET) > 0.05 ? 60 : 30) * 0.20
  );
  const riskLabel = budgetRiskScore >= 75 ? 'Healthy' : budgetRiskScore >= 50 ? 'At Risk' : 'Critical';
  const riskColor = budgetRiskScore >= 75 ? 'green' : budgetRiskScore >= 50 ? 'amber' : 'red';

  // Division heatmap
  const divisionHeatmap = [
    { name: 'Patrol Division', status: 'Critical', variance: 150000, spend: 84.9, trend: 'up', driver: 'OT spike +22% vs prior year · Discretionary overage $45K', link: 'Staffing shortage driving forced OT — see Operations module' },
    { name: 'Detention Division', status: 'Watch', variance: 45000, spend: 85.4, trend: 'stable', driver: 'Medical services trending above contract · Inmate population +8%', link: 'Medical contract renewal due Q1 FY2025' },
    { name: 'Support Services', status: 'Watch', variance: -20000, spend: 82.1, trend: 'down', driver: 'Fleet maintenance deferred to Q1 · Fuel costs down 6%', link: 'Fleet procurement PO pending approval' },
    { name: 'Administrative Services', status: 'Healthy', variance: -180000, spend: 76.3, trend: 'down', driver: 'Training program 18% below historical pace · IT deferral', link: 'Training surplus available for reallocation' },
    { name: 'Investigations', status: 'Healthy', variance: -95000, spend: 78.8, trend: 'stable', driver: 'Case load down 4% YoY · No capital purchases this quarter', link: null },
  ];

  // Simulation
  const simOTSavings = Math.round((fiscalYear.spent * 0.18) * (simOT / 100));
  const simFleetSavings = simFleetDelay > 0 ? Math.round(420000 * Math.min(simFleetDelay / 90, 1)) : 0;
  const simHireSavings = simHires * 85000;
  const totalSimSavings = simOTSavings + simFleetSavings + simHireSavings;
  const simProjection = liveProjection - totalSimSavings;

  const fmtDateTime = (d) => d.toLocaleString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
    hour: 'numeric', minute: '2-digit', hour12: true,
  });

  const flash = (keys) => {
    setFlashSet(new Set(keys));
    setTimeout(() => setFlashSet(new Set()), 1100);
  };

  const showToast = (message) => {
    const tid = Date.now();
    setToast({ id: tid, message, saving: 0 });
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => setToast(null), 4500);
  };

  const approvePO = (po) => {
    setPoSpentDelta(prev => prev + po.amount);
    setPendingPOs(prev => prev.filter(p => p.id !== po.id));
    setAuditLog(prev => [{
      id: `al-${Date.now()}`,
      actionTitle: `PO Approved — ${po.vendor}: ${po.description}`,
      appliedBy: 'Sheriff D. Williams',
      appliedAt: new Date(),
      savings: 0,
      riskLevel: 'Low',
      note: `${fmt(po.amount)} moved from Committed to Spent.`,
    }, ...prev]);
    showToast(`PO Approved — ${fmt(po.amount)} moved to Spent (${po.vendor})`);
  };

  const denyPO = (po) => {
    setPoAvailableDelta(prev => prev + po.amount);
    setPendingPOs(prev => prev.filter(p => p.id !== po.id));
    setAuditLog(prev => [{
      id: `al-${Date.now()}`,
      actionTitle: `PO Denied — ${po.vendor}: ${po.description}`,
      appliedBy: 'Sheriff D. Williams',
      appliedAt: new Date(),
      savings: po.amount,
      riskLevel: 'Low',
      note: `${fmt(po.amount)} returned to Available budget.`,
    }, ...prev]);
    showToast(`PO Denied — ${fmt(po.amount)} returned to Available`);
  };

  const handleExportPDF = () => {
    const auditRows = auditLog.map(e => `
      <tr style="border-bottom:1px solid #e2e8f0">
        <td style="padding:8px 12px;font-size:12px;color:#1e293b">${e.actionTitle}</td>
        <td style="padding:8px 12px;font-size:12px;color:#64748b">${e.appliedBy}</td>
        <td style="padding:8px 12px;font-size:12px;color:#64748b">${fmtDateTime(e.appliedAt)}</td>
        <td style="padding:8px 12px;font-size:12px;font-weight:700;color:#16a34a;text-align:right">${fmt(e.savings)}</td>
      </tr>`).join('');

    const html = '<!DOCTYPE html><html><head><title>GCSO Budget Report — FY 2024</title>'
      + '<style>body{font-family:\'Segoe UI\',Arial,sans-serif;margin:0;padding:0;color:#1e293b}'
      + '@media print{.no-print{display:none}body{margin:0}}</style></head><body>'
      + '<div style="background:#0f172a;color:white;padding:32px 40px 24px">'
      + '<div style="display:flex;justify-content:space-between;align-items:flex-start">'
      + '<div>'
      + '<div style="font-size:11px;font-weight:700;letter-spacing:2px;color:#94a3b8;margin-bottom:4px">GCSO — OFFICIAL FISCAL DOCUMENT</div>'
      + '<div style="font-size:28px;font-weight:800;margin-bottom:4px">Budget Report — FY 2024</div>'
      + '<div style="font-size:14px;color:#cbd5e1">Gwinnett County Sheriff\'s Office · Fiscal Year 2024</div>'
      + '</div>'
      + '<div style="text-align:right">'
      + '<div style="font-size:11px;color:#94a3b8">Generated: ' + fmtDateTime(new Date()) + '</div>'
      + '<div style="font-size:11px;color:#94a3b8;margin-top:4px">Prepared by: Sheriff D. Williams</div>'
      + '<div style="margin-top:8px;padding:4px 12px;background:#1d4ed8;border-radius:4px;font-size:11px;font-weight:700;display:inline-block">CONFIDENTIAL</div>'
      + '</div></div></div>'
      + '<div style="padding:32px 40px">'
      + '<h2 style="font-size:14px;font-weight:700;color:#64748b;letter-spacing:1px;text-transform:uppercase;margin:0 0 16px">Fiscal Summary</h2>'
      + '<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-bottom:32px">'
      + '<div style="border:1px solid #e2e8f0;border-radius:8px;padding:16px">'
      + '<div style="font-size:10px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:1px;margin-bottom:4px">Total Budget</div>'
      + '<div style="font-size:22px;font-weight:800;color:#0f172a">' + fmt(fiscalYear.totalBudget) + '</div>'
      + '<div style="font-size:11px;color:#64748b;margin-top:4px">FY 2024</div></div>'
      + '<div style="border:1px solid #e2e8f0;border-radius:8px;padding:16px">'
      + '<div style="font-size:10px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:1px;margin-bottom:4px">Spent</div>'
      + '<div style="font-size:22px;font-weight:800;color:#0f172a">' + fmt(liveSpent) + '</div>'
      + '<div style="font-size:11px;color:#d97706;margin-top:4px">' + fiscalYear.percentSpent + '% utilized</div></div>'
      + '<div style="border:1px solid #e2e8f0;border-radius:8px;padding:16px">'
      + '<div style="font-size:10px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:1px;margin-bottom:4px">Committed</div>'
      + '<div style="font-size:22px;font-weight:800;color:#0f172a">' + fmt(liveCommitted) + '</div>'
      + '<div style="font-size:11px;color:#64748b;margin-top:4px">' + liveCommittedPct.toFixed(1) + '% of budget</div></div>'
      + '<div style="border:1px solid #e2e8f0;border-radius:8px;padding:16px">'
      + '<div style="font-size:10px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:1px;margin-bottom:4px">Available</div>'
      + '<div style="font-size:22px;font-weight:800;color:#16a34a">' + fmt(liveAvailable) + '</div>'
      + '<div style="font-size:11px;color:#64748b;margin-top:4px">' + ((liveAvailable / fiscalYear.totalBudget) * 100).toFixed(1) + '% remaining</div></div>'
      + '</div>'
      + '<h2 style="font-size:14px;font-weight:700;color:#64748b;letter-spacing:1px;text-transform:uppercase;margin:0 0 12px">Year-End Forecast Scenarios</h2>'
      + '<table style="width:100%;border-collapse:collapse;margin-bottom:32px;font-size:12px">'
      + '<thead><tr style="background:#f8fafc;border-bottom:2px solid #e2e8f0">'
      + '<th style="padding:10px 12px;text-align:left;font-weight:700;color:#64748b">Scenario</th>'
      + '<th style="padding:10px 12px;text-align:right;font-weight:700;color:#64748b">Projected Total</th>'
      + '<th style="padding:10px 12px;text-align:right;font-weight:700;color:#64748b">vs Budget</th>'
      + '<th style="padding:10px 12px;text-align:right;font-weight:700;color:#64748b">Status</th>'
      + '</tr></thead><tbody>'
      + '<tr style="border-bottom:1px solid #e2e8f0;background:#fef2f2">'
      + '<td style="padding:10px 12px">Current pace (no action)</td>'
      + '<td style="padding:10px 12px;text-align:right;font-weight:700;color:#dc2626">$49.73M</td>'
      + '<td style="padding:10px 12px;text-align:right;color:#dc2626">+$1.23M</td>'
      + '<td style="padding:10px 12px;text-align:right;font-weight:700;color:#dc2626">OVER BUDGET</td></tr>'
      + '<tr style="border-bottom:1px solid #e2e8f0;background:#fffbeb">'
      + '<td style="padding:10px 12px">Conservative estimate</td>'
      + '<td style="padding:10px 12px;text-align:right;font-weight:700;color:#d97706">$48.9M</td>'
      + '<td style="padding:10px 12px;text-align:right;color:#d97706">+$400K</td>'
      + '<td style="padding:10px 12px;text-align:right;font-weight:700;color:#d97706">AT RISK</td></tr>'
      + '<tr style="border-bottom:1px solid #e2e8f0;background:#f0fdf4">'
      + '<td style="padding:10px 12px">With cost controls (' + appliedActionIds.size + ' actions applied)</td>'
      + '<td style="padding:10px 12px;text-align:right;font-weight:700;color:#16a34a">' + fmt(liveProjection) + '</td>'
      + '<td style="padding:10px 12px;text-align:right;color:#16a34a">' + (isLiveOverBudget ? '+' + fmt(liveOverrun) : '-' + fmt(Math.abs(liveOverrun))) + '</td>'
      + '<td style="padding:10px 12px;text-align:right;font-weight:700;color:#16a34a">' + (isLiveOverBudget ? 'OVER BUDGET' : 'UNDER BUDGET') + '</td></tr>'
      + '</tbody></table>'
      + '<h2 style="font-size:14px;font-weight:700;color:#64748b;letter-spacing:1px;text-transform:uppercase;margin:0 0 12px">Decision Audit Log</h2>'
      + '<table style="width:100%;border-collapse:collapse;font-size:12px">'
      + '<thead><tr style="background:#f8fafc;border-bottom:2px solid #e2e8f0">'
      + '<th style="padding:10px 12px;text-align:left;font-weight:700;color:#64748b">Action</th>'
      + '<th style="padding:10px 12px;text-align:left;font-weight:700;color:#64748b">Applied By</th>'
      + '<th style="padding:10px 12px;text-align:left;font-weight:700;color:#64748b">Date/Time</th>'
      + '<th style="padding:10px 12px;text-align:right;font-weight:700;color:#64748b">Savings</th>'
      + '</tr></thead><tbody>'
      + (auditRows || '<tr><td colspan="4" style="padding:12px;text-align:center;color:#94a3b8">No actions recorded</td></tr>')
      + '</tbody></table>'
      + '<div style="margin-top:40px;padding-top:16px;border-top:1px solid #e2e8f0;display:flex;justify-content:space-between;font-size:10px;color:#94a3b8">'
      + '<span>GCSO Budget Report · Confidential · FY 2024</span>'
      + '<span>Generated ' + fmtDateTime(new Date()) + '</span></div>'
      + '</div><script>window.onload=function(){window.print();}<\/script></body></html>';
    const win = window.open('', '_blank');
    if (win) { win.document.write(html); win.document.close(); }
  };

  const applyAction = (action) => {
    const entry = {
      id: `al-${Date.now()}`,
      actionTitle: action.title,
      appliedBy: 'Sheriff D. Williams',
      appliedAt: new Date(),
      savings: action.impact,
      riskLevel: action.riskLevel,
      note: action.consequence,
    };
    setAppliedActionIds(prev => new Set([...prev, action.id]));
    setAuditLog(prev => [entry, ...prev]);
    setConfirmActionModal(null);
    flash(['available', 'forecast-bar', 'projection-card']);
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    const tid = Date.now();
    setToast({ id: tid, message: `Action Applied — Budget improved by ${fmt(action.impact)}`, saving: action.impact });
    toastTimerRef.current = setTimeout(() => setToast(null), 4500);
  };

  return (
    <DashboardLayout>
      {/* Sticky Command Strip */}
      <div className="sticky top-0 z-30 px-5 lg:px-8 py-2 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-700/40">
        <div className="max-w-7xl mx-auto flex items-center gap-3 text-[11px] flex-wrap">
          <span className="font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Budget Status</span>
          <span className="w-px h-3.5 bg-slate-200 dark:bg-slate-700" />
          <span className="text-slate-500 dark:text-slate-400">Health:</span>
          <span className={`font-black text-[14px] ${riskColor === 'green' ? 'text-green-600 dark:text-green-400' : riskColor === 'amber' ? 'text-amber-600 dark:text-amber-400' : 'text-red-600 dark:text-red-400'}`}>{budgetRiskScore}/100</span>
          <span className={`px-1.5 py-0.5 text-[10px] font-bold rounded ${riskColor === 'green' ? 'bg-green-100 dark:bg-green-500/10 text-green-700 dark:text-green-400' : riskColor === 'amber' ? 'bg-amber-100 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400' : 'bg-red-100 dark:bg-red-500/10 text-red-700 dark:text-red-400'}`}>{riskLabel}</span>
          <span className="w-px h-3.5 bg-slate-200 dark:bg-slate-700" />
          <span className="text-slate-500 dark:text-slate-400">Forecast:</span>
          <span className={`font-bold ${isLiveOverBudget ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>
            {isLiveOverBudget ? fmt(liveOverrun) + ' Over' : fmt(Math.abs(liveOverrun)) + ' Under'}
          </span>
          <span className="w-px h-3.5 bg-slate-200 dark:bg-slate-700" />
          <span className="text-slate-500 dark:text-slate-400">Actions Pending:</span>
          <span className={`font-bold ${pendingActions.length > 0 ? 'text-amber-600 dark:text-amber-400' : 'text-green-600 dark:text-green-400'}`}>{pendingActions.length}</span>
          <span className="w-px h-3.5 bg-slate-200 dark:bg-slate-700" />
          <span className="text-slate-500 dark:text-slate-400">Savings Available:</span>
          <span className="font-bold text-green-600 dark:text-green-400">{fmt(pendingSavings)}</span>
          <span className="ml-auto text-slate-400 dark:text-slate-500 hidden sm:inline">FY 2024 · 61 days remaining</span>
        </div>
      </div>
      <div className="p-5 lg:p-8">
        <div className="max-w-7xl mx-auto">
            {/* Enhanced Page Header with Fiscal Metrics */}
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 mb-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-2xl lg:text-3xl font-bold text-primary">Budget & Assets</h2>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/40 rounded-lg">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    <span className="text-xs font-bold text-green-600 dark:text-green-400">FISCAL ACTIVE</span>
                  </div>
                </div>
                <p className="text-secondary text-sm mb-3">Fiscal oversight and resource management for FY 2024</p>
                <div className="flex items-center gap-2 text-[11px] text-slate-500">
                  <span className={`font-semibold ${isLiveOverBudget ? 'text-red-700 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>
                    {isLiveOverBudget
                      ? `Projected to exceed budget by ${fmt(liveOverrun)}`
                      : `Overrun prevented — ${fmt(Math.abs(liveOverrun))} under budget`}
                  </span>
                  <span>·</span>
                  <span>61 days left in FY</span>
                  <span>·</span>
                  <span>Last synced: 2 min ago</span>
                  <span>·</span>
                  <span>Forecast confidence: High</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <select
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="px-4 py-2 bg-white dark:bg-slate-800/40 border border-border rounded-xl text-primary text-sm focus:outline-none focus:border-amber-500/50"
                >
                  <option value="ytd">Year to Date</option>
                  <option value="q4">Q4 2024</option>
                  <option value="monthly">Monthly</option>
                </select>
                <button
                  onClick={() => setVarianceReportOpen(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800/40 border border-border rounded-xl text-secondary hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-all"
                >
                  <FileBarChart className="w-4 h-4" />
                  <span className="hidden sm:inline">Variance</span>
                </button>
                <button
                  onClick={() => setReallocationModal(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800/40 border border-border rounded-xl text-secondary hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-all"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span className="hidden sm:inline">Reallocate</span>
                </button>
                <button
                  onClick={handleExportPDF}
                  className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800/40 border border-border rounded-xl text-secondary hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-all"
                >
                  <Download className="w-4 h-4" />
                  <span className="hidden sm:inline">Export</span>
                </button>
              </div>
            </div>

            {/* Forecast Status Banner — updates live */}
            {isLiveOverBudget ? (
              <div className="mb-5 flex items-center gap-3 px-4 py-3 bg-red-50 dark:bg-red-500/5 border border-red-200 dark:border-red-500/20 rounded-xl">
                <ShieldAlert className="w-4 h-4 text-red-700 dark:text-red-400 flex-shrink-0" />
                <div className="flex-1 text-sm">
                  {appliedActionIds.size === 0
                    ? <><span className="font-semibold text-red-700 dark:text-red-400">If no action is taken: </span><span className="text-slate-700 dark:text-slate-300">projected to exceed budget by <span className="font-semibold text-red-700 dark:text-red-400">{fmt(liveOverrun)}</span> by December 31.</span></>
                    : <><span className="font-semibold text-amber-700 dark:text-amber-400">Still at risk: </span><span className="text-slate-700 dark:text-slate-300">{appliedActionIds.size} action{appliedActionIds.size > 1 ? 's' : ''} applied, saving <span className="font-semibold text-green-600 dark:text-green-400">{fmt(appliedSavings)}</span>. Projection is now <span className="font-semibold text-amber-700 dark:text-amber-400">{fmt(liveOverrun)} over budget</span>. {pendingActions.length} action{pendingActions.length > 1 ? 's' : ''} remaining.</span></>
                  }
                </div>
                <button onClick={() => setActiveTab('forecast')} className="flex-shrink-0 text-xs font-semibold text-red-700 dark:text-red-400 hover:underline whitespace-nowrap">
                  View Forecast →
                </button>
              </div>
            ) : appliedActionIds.size > 0 ? (
              <div className="mb-5 flex items-center gap-3 px-4 py-3 bg-green-50 dark:bg-green-500/5 border border-green-200 dark:border-green-500/20 rounded-xl">
                <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0" />
                <div className="flex-1 text-sm">
                  <span className="font-semibold text-green-700 dark:text-green-400">Overrun prevented. </span>
                  <span className="text-slate-700 dark:text-slate-300">FY 2024 now projected at <span className="font-semibold text-green-700 dark:text-green-400">{fmt(liveProjection)}</span> — <span className="font-semibold text-green-700 dark:text-green-400">{fmt(Math.abs(liveOverrun))} under budget.</span></span>
                </div>
              </div>
            ) : null}

            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">              {/* Total Budget */}
              <div className="bg-white dark:bg-slate-800/25 border border-slate-200 dark:border-slate-700/30 rounded-xl shadow-sm dark:shadow-none p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Total Budget</span>
                  <div className="w-8 h-8 bg-slate-100 dark:bg-slate-700/40 rounded-lg flex items-center justify-center">
                    <Wallet className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                  </div>
                </div>
                <p className="text-3xl font-bold text-slate-900 dark:text-white mb-1">{fmt(fiscalYear.totalBudget)}</p>
                <div className="space-y-1.5 border-t border-slate-200 dark:border-slate-700/30 pt-3 mt-3">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500 dark:text-slate-400">Fiscal Year:</span>
                    <span className="font-medium text-slate-700 dark:text-slate-300">{fiscalYear.year}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500 dark:text-slate-400">Monthly Avg:</span>
                    <span className="font-medium text-slate-700 dark:text-slate-300">$4.04M</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500 dark:text-slate-400">Daily Rate:</span>
                    <span className="font-medium text-slate-700 dark:text-slate-300">$133K</span>
                  </div>
                </div>
              </div>

              {/* Spent */}
              <div className="bg-white dark:bg-slate-800/25 border border-slate-200 dark:border-slate-700/30 rounded-xl shadow-sm dark:shadow-none p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Spent</span>
                  <div className="w-8 h-8 bg-slate-100 dark:bg-slate-700/40 rounded-lg flex items-center justify-center">
                    <CircleDollarSign className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  </div>
                </div>
                <p className="text-3xl font-bold text-slate-900 dark:text-white mb-1">{fmt(liveSpent)}</p>
                <div className="mb-3">
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-slate-500 dark:text-slate-400">Budget utilization</span>
                    <span className={`font-bold ${fiscalYear.percentSpent >= 90 ? 'text-red-700 dark:text-red-400' : 'text-amber-600 dark:text-amber-400'}`}>{fiscalYear.percentSpent}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-700/50 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${fiscalYear.percentSpent >= 90 ? 'bg-red-500' : 'bg-amber-500'}`} style={{ width: `${fiscalYear.percentSpent}%` }} />
                  </div>
                </div>
                <div className="space-y-1.5 border-t border-slate-200 dark:border-slate-700/30 pt-3">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500 dark:text-slate-400">This month:</span>
                    <span className="font-medium text-slate-700 dark:text-slate-300">$3.98M</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500 dark:text-slate-400">vs Last month:</span>
                    <span className="font-medium text-amber-600 dark:text-amber-400 flex items-center gap-1">
                      <ArrowUp className="w-3 h-3" />+2.1%
                    </span>
                  </div>
                </div>
              </div>

              {/* Committed */}
              <div className="bg-white dark:bg-slate-800/25 border border-slate-200 dark:border-slate-700/30 rounded-xl shadow-sm dark:shadow-none p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Committed</span>
                  <div className="w-8 h-8 bg-slate-100 dark:bg-slate-700/40 rounded-lg flex items-center justify-center">
                    <Receipt className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                  </div>
                </div>
                <p className="text-3xl font-bold text-slate-900 dark:text-white mb-1">{fmt(liveCommitted)}</p>
                <div className="mb-3">
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-slate-500 dark:text-slate-400">Of total budget</span>
                    <span className="font-bold text-slate-600 dark:text-slate-300">{liveCommittedPct.toFixed(1)}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-700/50 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500 rounded-full" style={{ width: `${Math.min(liveCommittedPct, 100)}%` }} />
                  </div>
                </div>
                <div className="space-y-1.5 border-t border-slate-200 dark:border-slate-700/30 pt-3">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500 dark:text-slate-400">Pending POs:</span>
                    <button
                      onClick={() => setPendingPOsModal(true)}
                      className="font-semibold text-amber-600 dark:text-amber-400 hover:underline"
                    >
                      {pendingPOs.length} orders / {fmt(pendingPOs.reduce((s, p) => s + p.amount, 0))}
                    </button>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500 dark:text-slate-400">Largest:</span>
                    <span className="font-medium text-slate-700 dark:text-slate-300">$420K (Fleet)</span>
                  </div>
                </div>
              </div>

              {/* Available */}
              <div className={`bg-white dark:bg-slate-800/25 border rounded-xl shadow-sm dark:shadow-none p-5 transition-all duration-300 ${flashSet.has('available') ? 'border-green-400 dark:border-green-400 ring-2 ring-green-400/40' : 'border-slate-200 dark:border-slate-700/30'}`}>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Available</span>
                  <div className="w-8 h-8 bg-slate-100 dark:bg-slate-700/40 rounded-lg flex items-center justify-center">
                    <PiggyBank className="w-4 h-4 text-green-600 dark:text-green-400" />
                  </div>
                </div>
                <p className={`text-3xl font-bold mb-1 transition-colors ${flashSet.has('available') ? 'text-green-600 dark:text-green-400' : 'text-slate-900 dark:text-white'}`}>{fmt(liveAvailable)}</p>
                <div className="mb-3">
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-slate-500 dark:text-slate-400">Remaining budget</span>
                    <span className="font-bold text-green-600 dark:text-green-400">{((fiscalYear.available / fiscalYear.totalBudget) * 100).toFixed(1)}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-700/50 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 rounded-full" style={{ width: `${(fiscalYear.available / fiscalYear.totalBudget) * 100}%` }} />
                  </div>
                </div>
                <div className="space-y-1.5 border-t border-slate-200 dark:border-slate-700/30 pt-3">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500 dark:text-slate-400">Days remaining:</span>
                    <span className="font-medium text-slate-700 dark:text-slate-300">61 days</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500 dark:text-slate-400">Per day budget:</span>
                    <span className="font-medium text-green-600 dark:text-green-400">$57K/day</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-5 bg-white dark:bg-slate-800/25 border border-slate-200 dark:border-slate-700/30 rounded-xl shadow-sm dark:shadow-none overflow-hidden">
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100 dark:border-slate-800/60">
                <div className="flex items-center gap-3">
                  <Zap className="w-4 h-4 text-amber-500" />
                  <span className="text-sm font-semibold text-slate-900 dark:text-white">AI Command Center</span>
                  {isLiveOverBudget && (
                    <span className={BADGE('red') + ' flex items-center gap-1'}>
                      <ShieldAlert className="w-3 h-3" /> Overrun: {fmt(liveOverrun)}
                    </span>
                  )}
                </div>
                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${
                  riskColor === 'green' ? 'bg-green-100 dark:bg-green-500/10' :
                  riskColor === 'amber' ? 'bg-amber-100 dark:bg-amber-500/10' :
                  'bg-red-100 dark:bg-red-500/10'
                }`}>
                  <span className={`text-[11px] font-semibold ${riskColor === 'green' ? 'text-green-700 dark:text-green-400' : riskColor === 'amber' ? 'text-amber-700 dark:text-amber-400' : 'text-red-700 dark:text-red-400'}`}>Budget Health</span>
                  <span className={`text-[20px] font-black leading-none ${riskColor === 'green' ? 'text-green-700 dark:text-green-400' : riskColor === 'amber' ? 'text-amber-700 dark:text-amber-400' : 'text-red-700 dark:text-red-400'}`}>{budgetRiskScore}</span>
                  <span className={`text-[11px] ${riskColor === 'green' ? 'text-green-600 dark:text-green-400' : riskColor === 'amber' ? 'text-amber-600 dark:text-amber-400' : 'text-red-600 dark:text-red-400'}`}>/100</span>
                </div>
              </div>

              <div className="px-5 pt-4 pb-2 space-y-2">
                {pendingActions.length === 0 ? (
                  <div className="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-500/5 border border-green-200 dark:border-green-500/20 rounded-xl">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <div>
                      <p className="text-[13px] font-bold text-green-700 dark:text-green-400">All recommended actions applied.</p>
                      <p className="text-[12px] text-slate-500 dark:text-slate-400">FY 2024 closing at {fmt(liveProjection)} — {fmt(Math.abs(liveOverrun))} under budget.</p>
                    </div>
                  </div>
                ) : pendingActions.slice(0, 3).map((action, i) => (
                  <div key={action.id} className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-800/30 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors">
                    <span className="text-[11px] font-black text-slate-400 w-5 flex-shrink-0 mt-0.5">{i + 1}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded flex-shrink-0 ${action.urgency === 'High' ? 'bg-red-100 dark:bg-red-500/10 text-red-700 dark:text-red-400' : action.urgency === 'Medium' ? 'bg-amber-100 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400' : 'bg-slate-100 dark:bg-slate-700/40 text-slate-600 dark:text-slate-400'}`}>{action.urgency}</span>
                        <p className="text-[13px] font-semibold text-slate-800 dark:text-slate-200 truncate">{action.title}</p>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        Save <span className="font-bold text-green-600 dark:text-green-400">{fmt(action.impact)}</span> · {action.riskLevel} risk · {action.confidence}% confidence
                      </p>
                    </div>
                    <button
                      onClick={() => setConfirmActionModal(action)}
                      className="flex-shrink-0 px-3 py-1.5 bg-amber-500 hover:bg-amber-600 border border-amber-600 text-white text-xs font-bold uppercase tracking-wide rounded-lg transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between px-5 py-3 border-t border-slate-200 dark:border-slate-700/30 mt-2">
                <p className="text-[12px] text-slate-600 dark:text-slate-400">
                  Apply all {pendingActions.length} actions →{' '}
                  <span className={`font-bold ${projectionAfterAllPendingOverrun > 0 ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>
                    {fmt(Math.abs(projectionAfterAllPendingOverrun))} {projectionAfterAllPendingOverrun > 0 ? 'over budget' : 'under budget'}
                  </span>
                </p>
                {pendingActions.length > 0 && (
                  <button onClick={() => setApplyAllModal(true)} className="text-[12px] font-bold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1">
                    Apply All {pendingActions.length} Actions <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Decision Center */}
            <div className="flex items-center gap-3 mb-3 mt-1">
              <span className="text-[9px] font-black text-slate-300 dark:text-slate-600 uppercase tracking-[0.2em]">Decision Center</span>
              <div className="flex-1 h-px bg-slate-100 dark:bg-slate-800/80" />
            </div>

            {/* Recommended Actions */}
            <div className="mb-4 bg-white dark:bg-slate-800/25 border border-slate-200 dark:border-slate-700/30 rounded-xl shadow-sm dark:shadow-none overflow-hidden">
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100 dark:border-slate-800/60">
                <div className="flex items-center gap-2.5">
                  <Zap className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                  <span className="text-sm font-semibold text-slate-900 dark:text-white">Recommended Actions</span>
                  <span className="text-[11px] text-slate-400 dark:text-slate-500 hidden sm:inline">{recommendedActions.length} actions · {fmt(totalActionSavings)} potential</span>
                </div>
                <span className={BADGE('amber')}>Action Required</span>
              </div>

              {/* Impact Summary */}
              <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-700/30 grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Card 1: live projection */}
                <div className={`p-3 border rounded-lg ${isLiveOverBudget ? 'bg-red-50 dark:bg-red-500/5 border-red-200 dark:border-red-500/20' : 'bg-green-50 dark:bg-green-500/5 border-green-200 dark:border-green-500/20'}`}>
                  <p className={`text-[10px] font-bold uppercase tracking-wide mb-1 ${isLiveOverBudget ? 'text-red-700 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>
                    {appliedActionIds.size > 0 ? 'Updated Projection' : 'Current Projection'}
                  </p>
                  <p className={`text-xl font-bold ${isLiveOverBudget ? 'text-red-700 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>
                    {fmt(liveProjection)}
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    {((liveProjection / BUDGET) * 100).toFixed(1)}% ·{' '}
                    {isLiveOverBudget
                      ? <span className="text-red-600 dark:text-red-400 font-semibold">{fmt(liveOverrun)} over budget</span>
                      : <span className="text-green-600 dark:text-green-400 font-semibold">{fmt(Math.abs(liveOverrun))} under budget</span>
                    }
                  </p>
                </div>
                {/* Card 2: after all pending applied */}
                <div className={`p-3 border rounded-lg ${pendingActions.length === 0 ? 'bg-slate-50 dark:bg-slate-800/30 border-slate-200 dark:border-slate-700/30' : 'bg-green-50 dark:bg-green-500/5 border-green-200 dark:border-green-500/20'}`}>
                  <p className={`text-[10px] font-bold uppercase tracking-wide mb-1 ${pendingActions.length === 0 ? 'text-slate-600 dark:text-slate-400' : 'text-green-600 dark:text-green-400'}`}>
                    {pendingActions.length === 0 ? 'All Actions Applied' : `After ${pendingActions.length} Remaining Applied`}
                  </p>
                  <p className={`text-xl font-bold ${pendingActions.length === 0 ? 'text-green-600 dark:text-green-400' : 'text-green-600 dark:text-green-400'}`}>
                    {pendingActions.length === 0 ? fmt(liveProjection) : fmt(projectionAfterAllPending)}
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    {pendingActions.length === 0
                      ? '✓ Fully optimised'
                      : `${((projectionAfterAllPending / BUDGET) * 100).toFixed(1)}% · ${projectionAfterAllPendingOverrun < 0 ? fmt(Math.abs(projectionAfterAllPendingOverrun)) + ' under budget' : fmt(projectionAfterAllPendingOverrun) + ' over budget'}`
                    }
                  </p>
                </div>
                {/* Card 3: savings applied / remaining */}
                <div className="p-3 bg-slate-50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700/30 rounded-lg">
                  <p className="text-[10px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wide mb-1">Savings Applied</p>
                  <p className="text-xl font-bold text-slate-900 dark:text-white">{fmt(appliedSavings)}</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    {appliedActionIds.size} of {recommendedActions.length} applied
                    {pendingSavings > 0 && <> · <span className="text-blue-600 dark:text-blue-400 font-semibold">{fmt(pendingSavings)} remaining</span></>}
                  </p>
                </div>
              </div>

              {/* Decision Summary */}
              <div className={`px-5 py-3 border-b border-slate-200 dark:border-slate-700/30 flex items-center gap-3 ${
                appliedActionIds.size === recommendedActions.length
                  ? 'bg-green-50 dark:bg-green-500/5'
                  : 'bg-blue-50 dark:bg-blue-500/5'
              }`}>
                <Target className={`w-4 h-4 flex-shrink-0 ${appliedActionIds.size === recommendedActions.length ? 'text-green-600 dark:text-green-400' : 'text-blue-600 dark:text-blue-400'}`} />
                <p className="text-[13px] font-semibold text-slate-800 dark:text-slate-200">
                  {appliedActionIds.size === 0
                    ? <>Apply all {recommendedActions.length} actions to move from <span className="text-red-600 dark:text-red-400">+{fmt(liveOverrun)} over budget</span> → <span className="text-green-600 dark:text-green-400">{fmt(Math.abs(projectionAfterAllPendingOverrun))} under budget</span> — preventing the overrun entirely.</>
                    : appliedActionIds.size === recommendedActions.length
                    ? <><span className="text-green-600 dark:text-green-400">All {recommendedActions.length} actions applied.</span> FY 2024 closing at {fmt(liveProjection)} — <span className="text-green-600 dark:text-green-400">{fmt(Math.abs(liveOverrun))} under budget.</span></>
                    : <>{appliedActionIds.size} of {recommendedActions.length} actions applied. Projection improved to <span className="text-amber-700 dark:text-amber-400">{fmt(liveProjection)}</span>. Apply {pendingActions.length} more to reach <span className="text-green-600 dark:text-green-400">{fmt(projectionAfterAllPending)}</span> ({fmt(Math.abs(projectionAfterAllPendingOverrun))} under budget).</>
                  }
                </p>
              </div>

              {/* Filters + Sort */}
              <div className="px-5 py-3 border-b border-slate-200 dark:border-slate-700/30 flex items-center gap-2 flex-wrap">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mr-1">Filter:</span>
                {[
                  { id: 'all', label: 'All' },
                  { id: 'urgent', label: 'Urgent' },
                  { id: 'high-impact', label: 'High Impact' },
                  { id: 'cost-saving', label: 'Cost-Saving' },
                ].map(f => (
                  <button
                    key={f.id}
                    onClick={() => setActionFilter(f.id)}
                    className={`px-2.5 py-1 text-[11px] font-semibold rounded-lg transition-colors ${
                      actionFilter === f.id
                        ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'
                        : 'bg-slate-100 dark:bg-slate-700/40 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700/60'
                    }`}
                  >
                    {f.label}
                    {f.id !== 'all' && (
                      <span className="ml-1 opacity-60">{recommendedActions.filter(a => a.categories.includes(f.id)).length}</span>
                    )}
                  </button>
                ))}
                <span className="w-px h-4 bg-slate-200 dark:bg-slate-700/40 mx-1" />
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mr-1">Sort:</span>
                {[
                  { id: 'impact', label: 'Highest Savings' },
                  { id: 'urgency', label: 'Urgency' },
                  { id: 'risk', label: 'Lowest Risk' },
                ].map(s => (
                  <button
                    key={s.id}
                    onClick={() => setActionSort(s.id)}
                    className={`px-2.5 py-1 text-[11px] font-semibold rounded-lg transition-colors ${
                      actionSort === s.id
                        ? 'bg-amber-500 text-white border border-amber-600/30'
                        : 'bg-slate-100 dark:bg-slate-700/40 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700/60'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
                <span className="ml-auto text-[11px] text-slate-500 dark:text-slate-400">
                  {filteredActions.length} of {recommendedActions.length} actions
                </span>
              </div>

              <div className="divide-y divide-slate-100 dark:divide-slate-700/20">
                {filteredActions.map((action, idx) => {
                  const isApplied = appliedActionIds.has(action.id);
                  const isExpanded = expandedActionId === action.id;
                  return (
                    <div key={action.id} className={`px-5 py-3 transition-colors ${isApplied ? 'bg-green-50/60 dark:bg-green-500/5' : 'hover:bg-slate-50 dark:hover:bg-slate-800/10'}`}>
                      <div className="flex items-start gap-3">
                        <span className={`text-[11px] font-bold w-4 flex-shrink-0 tabular-nums mt-0.5 ${isApplied ? 'text-green-500 dark:text-green-400' : 'text-slate-400'}`}>
                          {isApplied ? '✓' : idx + 1}
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            {isApplied ? (
                              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-green-100 dark:bg-green-500/15 text-green-700 dark:text-green-400 text-[10px] font-bold rounded">
                                <CheckCircle className="w-3 h-3" /> Applied
                              </span>
                            ) : (
                              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded flex-shrink-0 ${
                                action.urgency === 'High' ? 'bg-red-100 dark:bg-red-500/10 text-red-700 dark:text-red-400' :
                                action.urgency === 'Medium' ? 'bg-amber-100 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400' :
                                'bg-slate-100 dark:bg-slate-700/40 text-slate-600 dark:text-slate-400'
                              }`}>{action.urgency}</span>
                            )}
                            <span className={`text-[13px] font-semibold ${isApplied ? 'text-slate-400 dark:text-slate-500 line-through' : 'text-slate-800 dark:text-slate-200'}`}>
                              {action.title}
                            </span>
                          </div>
                          {!isApplied && (
                            <p className="text-[12px] text-slate-600 dark:text-slate-400 mb-1 leading-relaxed">{action.why}</p>
                          )}
                          {isApplied ? (
                            <p className="text-[12px] text-green-600 dark:text-green-400">{action.consequence}</p>
                          ) : (
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                                action.riskLevel === 'Low'
                                  ? 'bg-green-50 dark:bg-green-500/5 border-green-200 dark:border-green-500/20 text-green-700 dark:text-green-400'
                                  : action.riskLevel === 'Medium'
                                  ? 'bg-amber-50 dark:bg-amber-500/5 border-amber-200 dark:border-amber-500/20 text-amber-700 dark:text-amber-400'
                                  : 'bg-red-50 dark:bg-red-500/5 border-red-200 dark:border-red-500/20 text-red-700 dark:text-red-400'
                              }`}>
                                <span>{action.riskLevel === 'Low' ? '▼' : action.riskLevel === 'Medium' ? '◆' : '▲'}</span>
                                <span>{action.riskLevel} Risk</span>
                                <span className="opacity-40">·</span>
                                <span className="text-green-600 dark:text-green-400">+{fmt(action.impact)} saved</span>
                              </span>
                              <span className="text-[11px] text-slate-500 dark:text-slate-400">AI: {action.confidence}%</span>
                              <span className="text-[11px] text-slate-400 dark:text-slate-500">·</span>
                              <span className="text-[11px] text-slate-500 dark:text-slate-400">{action.affectedDepts.join(', ')}</span>
                              <button
                                onClick={() => setExpandedActionId(isExpanded ? null : action.id)}
                                className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-0.5 ml-1"
                              >
                                Why trust this? {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                              </button>
                            </div>
                          )}

                          {/* Expandable AI Reasoning */}
                          {!isApplied && isExpanded && (
                            <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-500/5 border border-blue-200 dark:border-blue-500/20 rounded-xl space-y-1.5">
                              <p className="text-[10px] font-bold text-blue-700 dark:text-blue-400 uppercase tracking-wide mb-2">AI Reasoning — {action.confidence}% Confidence</p>
                              {(action.reasoning || [
                                `${action.affectedDepts[0]} spend trending ${action.urgency === 'High' ? '+18%' : '+8%'} above historical baseline`,
                                `Pattern matches FY2022 overrun scenario — similar action saved $${Math.round(action.impact * 0.85 / 1000)}K then`,
                                `${action.riskLevel} operational disruption risk based on prior-year outcomes`,
                                `${action.confidence}% model confidence from 3-year spending data`,
                              ]).map((reason, ri) => (
                                <div key={ri} className="flex items-start gap-2 text-[12px] text-slate-700 dark:text-slate-300">
                                  <span className="text-blue-500 font-bold flex-shrink-0 mt-0.5">✓</span>
                                  <span>{reason}</span>
                                </div>
                              ))}
                              <p className="text-[11px] text-slate-500 dark:text-slate-400 pt-1 border-t border-blue-200 dark:border-blue-500/20 mt-2">{action.consequence}</p>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-3 flex-shrink-0 mt-0.5">
                          {!isApplied && (
                            <div className="text-right hidden sm:block">
                              <p className="text-[13px] font-bold text-green-600 dark:text-green-400">{fmt(action.impact)}</p>
                              <p className="text-[10px] text-slate-500 dark:text-slate-400">{action.confidenceLabel} confidence</p>
                            </div>
                          )}
                          {isApplied ? (
                            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-green-100 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20 rounded-lg">
                              <CheckCircle className="w-3.5 h-3.5 text-green-600 dark:text-green-400" />
                              <span className="text-xs font-bold text-green-700 dark:text-green-400">{fmt(action.impact)} saved</span>
                            </div>
                          ) : (
                            <button
                              onClick={() => setConfirmActionModal(action)}
                              className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 border border-amber-600 text-white text-xs font-bold uppercase tracking-wide rounded-lg transition-colors"
                            >
                              Apply Action
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className={`px-5 py-3 border-t border-slate-200 dark:border-slate-700/30 flex items-center justify-between gap-3 ${appliedActionIds.size === recommendedActions.length ? 'bg-green-50 dark:bg-green-500/5' : 'bg-slate-50 dark:bg-slate-900/20'}`}>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 min-w-0">
                  {appliedActionIds.size > 0
                    ? <><span className="font-semibold text-green-600 dark:text-green-400">{appliedActionIds.size} applied</span> · {fmt(appliedSavings)} saved{pendingActions.length > 0 && <> · <span className="font-semibold text-slate-600 dark:text-slate-300">{pendingActions.length} pending</span> ({fmt(pendingSavings)} more available)</>}</>
                    : <><span className="font-semibold text-slate-700 dark:text-slate-300">{recommendedActions.length} actions pending</span> · {fmt(totalActionSavings)} total available savings</>
                  }
                </div>
                {pendingActions.length > 0 && (
                  <button
                    onClick={() => setApplyAllModal(true)}
                    className="flex-shrink-0 flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 border border-amber-600 text-white text-sm font-bold uppercase tracking-wide rounded-lg transition-colors"
                  >
                    <Zap className="w-3.5 h-3.5" />
                    {appliedActionIds.size > 0 ? `Apply Remaining ${pendingActions.length}` : 'Apply All'} — {fmt(pendingSavings)}
                  </button>
                )}
              </div>
            </div>

            {/* AI Budget Intelligence */}
            <div className="mb-6 bg-white dark:bg-slate-800/25 border border-slate-200 dark:border-slate-700/30 rounded-xl shadow-sm dark:shadow-none">
              <button
                onClick={() => setAiInsightsExpanded(!aiInsightsExpanded)}
                className="w-full flex items-center justify-between px-5 py-3.5 text-left hover:bg-slate-50 dark:hover:bg-slate-800/10 transition-colors rounded-xl"
              >
                <div className="flex items-center gap-2.5">
                  <Bot className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                  <span className="text-sm font-semibold text-slate-900 dark:text-white">Budget Intelligence</span>
                  <span className={BADGE('red')}>1 Alert</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="hidden sm:inline text-[10px] text-slate-500">AI-assisted · Updated 2 min ago</span>
                  {aiInsightsExpanded ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
                </div>
              </button>

              {aiInsightsExpanded && (
                <div className="border-t border-slate-200 dark:border-slate-700/30">
                  <div className="divide-y divide-slate-100 dark:divide-slate-700/20">
                    {[
                      { rank: 1, urgency: 'Critical', urgencyColor: 'text-red-700 dark:text-red-400', urgencyBg: 'bg-red-100 dark:bg-red-500/10', icon: ShieldAlert, action: 'Patrol Division discretionary spend exceeds budget by $150K — halt non-essential purchasing', outcome: 'Prevents overrun · saves up to $170K before year-end' },
                      { rank: 2, urgency: 'High', urgencyColor: 'text-amber-700 dark:text-amber-400', urgencyBg: 'bg-amber-100 dark:bg-amber-500/10', icon: RefreshCw, action: 'Move $150K from Training surplus into Patrol to cover shortfall', outcome: 'Resolves Patrol gap · releases $350K as buffer' },
                      { rank: 3, urgency: 'High', urgencyColor: 'text-amber-700 dark:text-amber-400', urgencyBg: 'bg-amber-100 dark:bg-amber-500/10', icon: TrendingDown, action: 'Reduce discretionary spending 15% across all divisions for Nov–Dec', outcome: 'Saves ~$500K · brings year-end forecast to 100%' },
                      { rank: 4, urgency: 'Medium', urgencyColor: 'text-slate-600 dark:text-slate-400', urgencyBg: 'bg-slate-100 dark:bg-slate-700/40', icon: Clock, action: 'Defer 3 pending approvals totalling $170K until December budget review', outcome: 'Maintains 6.9% unallocated buffer if deferred' },
                    ].map(item => {
                      const Icon = item.icon;
                      return (
                        <div key={item.rank} className="flex items-center gap-3 px-5 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-800/10 transition-colors">
                          <span className="text-[11px] font-bold text-slate-300 dark:text-slate-600 w-4 flex-shrink-0 tabular-nums">{item.rank}</span>
                          <Icon className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                              <span className={`${BADGE(item.urgency === 'Critical' ? 'red' : item.urgency === 'High' ? 'amber' : '')} flex-shrink-0`}>{item.urgency}</span>
                              <span className="text-[12px] font-semibold text-slate-800 dark:text-slate-200">{item.action}</span>
                            </div>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400">{item.outcome}</p>
                          </div>
                          <button onClick={() => setReallocationModal(true)} className={`flex-shrink-0 ${secondaryBtn}`}>Review</button>
                        </div>
                      );
                    })}
                  </div>
                  <div className="px-5 py-3 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between">
                    <button onClick={() => setActiveTab('forecast')} className={ghostBtn}>
                      <LineChart className="w-3.5 h-3.5" /> View Full Forecast
                    </button>
                    <button onClick={() => setReallocationModal(true)} className={secondaryBtn}>
                      <RefreshCw className="w-3.5 h-3.5" /> Reallocation Planner
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Predictive Spike Forecast */}
            <div className="mb-6 bg-white dark:bg-slate-800/25 border border-slate-200 dark:border-slate-700/30 rounded-xl shadow-sm dark:shadow-none">
              <button
                onClick={() => setPredictiveExpanded(!predictiveExpanded)}
                className="w-full flex items-center justify-between px-5 py-3.5 text-left hover:bg-slate-50 dark:hover:bg-slate-800/10 transition-colors rounded-xl"
              >
                <div className="flex items-center gap-2.5">
                  <Activity className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                  <span className="text-sm font-semibold text-slate-900 dark:text-white">Predictive Spend Forecast</span>
                  <span className={BADGE('violet')}>3 Spikes Detected</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="hidden sm:inline text-[10px] text-slate-500">Based on 3-year spending patterns</span>
                  {predictiveExpanded ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
                </div>
              </button>
              {predictiveExpanded && (
                <div className="border-t border-slate-200 dark:border-slate-700/30">
                  <div className="px-5 py-3 border-b border-slate-100 dark:border-slate-700/20 bg-violet-50 dark:bg-violet-500/5">
                    <p className="text-[12px] text-slate-600 dark:text-slate-400">
                      Based on 3 years of historical patterns, the model predicts three elevated-spend windows before fiscal year-end. Preventive action now reduces exposure before each spike arrives.
                    </p>
                  </div>
                  <div className="px-5 pt-3 pb-1">
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-3">Based on 3-year historical patterns. Preventive action now reduces exposure before each spike arrives.</p>
                    <div className="space-y-2">
                    {[
                      { window: 'November 2024', daysOut: 2, risk: 'High', driver: 'Holiday season OT surge — est. $180K spike', amount: 180000, mitigated: true, mitigationAction: 'Action #2: OT cap covers this window' },
                      { window: 'Dec 15–31, 2024', daysOut: 46, risk: 'Medium', driver: 'Year-end discretionary rush — est. $95K spike', amount: 95000, mitigated: true, mitigationAction: 'Action #4: Support Services freeze covers this' },
                      { window: 'Q1 FY2025 Carry-overs', daysOut: 63, risk: 'Low', driver: '$240K committed converting to spend — already planned', amount: 240000, mitigated: false, mitigationAction: null },
                    ].map((spike) => (
                      <div key={spike.window} className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-700/20">
                        <div className="w-10 text-center flex-shrink-0">
                          <p className="text-[17px] font-black text-slate-700 dark:text-slate-300 leading-none">{spike.daysOut}</p>
                          <p className="text-[9px] text-slate-400 uppercase tracking-wide">days</p>
                        </div>
                        <div className="w-px h-8 bg-slate-200 dark:bg-slate-700/40 flex-shrink-0" />
                        <span className={`flex-shrink-0 ${BADGE(spike.risk === 'High' ? 'red' : spike.risk === 'Medium' ? 'amber' : '')}`}>
                          {spike.risk}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="text-[12px] font-semibold text-slate-800 dark:text-slate-200 truncate">{spike.window}</p>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{spike.driver}</p>
                        </div>
                        <div className="flex-shrink-0 flex items-center gap-2">
                          {spike.mitigated ? (
                            <span className="flex items-center gap-1 text-[10px] font-semibold text-green-600 dark:text-green-400">
                              <CheckCircle className="w-3 h-3" /> Mitigated
                            </span>
                          ) : (
                            <span className="text-[10px] font-semibold text-slate-400">Planned</span>
                          )}
                          <span className={`text-[12px] font-bold tabular-nums ${spike.mitigated ? 'text-green-600 dark:text-green-400 line-through opacity-50' : 'text-amber-700 dark:text-amber-400'}`}>
                            +{fmt(spike.amount)}
                          </span>
                        </div>
                      </div>
                    ))}
                    </div>
                  </div>
                  <div className="px-5 py-3 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between">
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">2 of 3 spikes mitigated · Total exposure: $515K</span>
                    <button onClick={() => setActiveTab('forecast')} className={ghostBtn}>
                      Full Forecast <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Audit Log */}
            <div className="mb-6 bg-white dark:bg-slate-800/25 border border-slate-200 dark:border-slate-700/30 rounded-xl shadow-sm dark:shadow-none">
              <button
                onClick={() => setAuditLogExpanded(!auditLogExpanded)}
                className="w-full flex items-center justify-between px-5 py-3.5 text-left hover:bg-slate-50 dark:hover:bg-slate-800/10 transition-colors rounded-xl"
              >
                <div className="flex items-center gap-2.5">
                  <FileText className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                  <span className="text-sm font-semibold text-slate-900 dark:text-white">Decision Audit Log</span>
                  <span className={BADGE('')}>{auditLog.length} entries</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="hidden sm:inline text-[10px] text-slate-500">Who applied what · when · outcome</span>
                  {auditLogExpanded ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
                </div>
              </button>
              {auditLogExpanded && (
                <div className="border-t border-slate-100 dark:border-slate-800/60">
                  {auditLog.length === 0 ? (
                    <div className="px-5 py-6 text-center text-xs text-slate-400 dark:text-slate-500">No actions applied yet.</div>
                  ) : (
                    <div className="divide-y divide-slate-100 dark:divide-slate-800/60">
                      {auditLog.map((entry) => (
                        <div key={entry.id} className="px-5 py-2.5 flex items-center gap-3">
                          <BadgeCheck className="w-4 h-4 text-green-500 dark:text-green-400 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-[12px] font-semibold text-slate-800 dark:text-slate-200">{entry.actionTitle}</span>
                              <span className={BADGE(entry.riskLevel === 'Low' ? 'green' : entry.riskLevel === 'Medium' ? 'amber' : 'red')}>{entry.riskLevel}</span>
                            </div>
                            <div className="flex items-center gap-2 text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">
                              <span className="font-medium">{entry.appliedBy}</span>
                              <span>·</span>
                              <span>{fmtAuditDate(entry.appliedAt)}</span>
                              <span>·</span>
                              <span className="truncate">{entry.note}</span>
                            </div>
                          </div>
                          {entry.savings > 0 && (
                            <span className="flex-shrink-0 text-[12px] font-bold text-green-600 dark:text-green-400 tabular-nums">{fmt(entry.savings)}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="px-5 py-3 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between">
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">
                      Total savings applied: <span className="font-bold text-green-600 dark:text-green-400">{fmt(auditLog.reduce((s, e) => s + e.savings, 0))}</span>
                    </span>
                    <button className={ghostBtn} onClick={handleExportPDF}>
                      <Download className="w-3.5 h-3.5" /> Export Log
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Deep Analytics */}
            <div className="flex items-center gap-3 mb-4 mt-1">
              <span className="text-[9px] font-black text-slate-300 dark:text-slate-600 uppercase tracking-[0.2em]">Deep Analytics</span>
              <div className="flex-1 h-px bg-slate-100 dark:bg-slate-800/80" />
            </div>

            {/* Tabs */}
            <div className="mb-6 flex gap-1 border-b border-border overflow-x-auto">
              {[
                { id: 'overview', label: 'Overview', icon: PieChart },
                { id: 'heatmap', label: 'Division Intel', icon: Target },
                { id: 'divisions', label: 'By Division', icon: BarChart3 },
                { id: 'resources', label: 'Resources', icon: Package },
                { id: 'forecast', label: 'Forecast', icon: LineChart },
                { id: 'simulation', label: 'Simulation', icon: Activity },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-all relative ${
                    activeTab === tab.id ? 'text-amber-700 dark:text-amber-400' : 'text-secondary hover:text-slate-300'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                  {activeTab === tab.id && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500"></div>
                  )}
                </button>
              ))}
            </div>

            {/* OVERVIEW TAB */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Enhanced Fiscal Year Progress */}
                <div className="bg-white dark:bg-slate-800/40 border border-border rounded-xl shadow-sm dark:shadow-none p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <PieChart className="w-5 h-5 text-blue-400" />
                    <h3 className="text-lg font-semibold text-primary">Fiscal Year Progress (FY 2024)</h3>
                  </div>

                  <div className="space-y-5">
                    {/* Main Progress Bar */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold text-secondary">TOTAL EXPENDITURES:</span>
                        <span className="text-sm font-bold text-primary">{fmt(fiscalYear.spent)} / {fmt(fiscalYear.totalBudget)} ({fiscalYear.percentSpent}%)</span>
                      </div>
                      <div className="w-full h-3 bg-white dark:bg-slate-700/50 rounded-full overflow-hidden">
                        <div className={`h-full transition-all ${
                          getPercentColor(fiscalYear.percentSpent) === 'red' ? 'bg-red-500' :
                          getPercentColor(fiscalYear.percentSpent) === 'amber' ? 'bg-amber-500' : 'bg-green-500'
                        }`} style={{ width: `${fiscalYear.percentSpent}%` }} />
                      </div>
                    </div>

                    {/* Breakdown */}
                    <div className="bg-white dark:bg-slate-900/50 rounded-lg p-4 border border-border">
                      <h4 className="text-xs font-bold text-secondary mb-3">BREAKDOWN:</h4>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <p className="text-xs text-secondary mb-1">Spent (Cash Out)</p>
                          <p className="text-lg font-bold text-amber-700 dark:text-amber-400">{fmt(liveSpent)}</p>
                          <p className="text-xs text-slate-500">{fiscalYear.percentSpent}%</p>
                        </div>
                        <div>
                          <p className="text-xs text-secondary mb-1">Committed (Approved, Not Paid)</p>
                          <p className="text-lg font-bold text-purple-400">{fmt(liveCommitted)}</p>
                          <p className="text-xs text-slate-500">{liveCommittedPct.toFixed(1)}%</p>
                        </div>
                        <div>
                          <p className="text-xs text-secondary mb-1">Available (Unallocated)</p>
                          <p className="text-lg font-bold text-green-600 dark:text-green-400">{fmt(liveAvailable)}</p>
                          <p className="text-xs text-slate-500">{((liveAvailable / fiscalYear.totalBudget) * 100).toFixed(1)}%</p>
                        </div>
                      </div>
                    </div>

                    {/* Pending Approvals Impact */}
                    <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertCircle className="w-4 h-4 text-amber-700 dark:text-amber-400" />
                        <h4 className="text-xs font-bold text-amber-700 dark:text-amber-400">IF ALL PENDING APPROVALS APPROVED: +$170K</h4>
                      </div>
                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div>
                          <span className="text-secondary">• New total committed: </span>
                          <span className="font-bold text-primary">$4.0M (8.2%)</span>
                        </div>
                        <div>
                          <span className="text-secondary">• New available: </span>
                          <span className="font-bold text-primary">$3.33M (6.9%)</span>
                        </div>
                      </div>
                    </div>

                    {/* Burn Rate */}
                    <div className="bg-slate-50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-700/20 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <Clock className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                        <h4 className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide">Burn Rate</h4>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                        <div>
                          <p className="text-secondary mb-0.5">Daily average:</p>
                          <p className="font-bold text-primary">$140K</p>
                        </div>
                        <div>
                          <p className="text-secondary mb-0.5">Monthly average:</p>
                          <p className="font-bold text-primary">$4.1M</p>
                        </div>
                        <div>
                          <p className="text-secondary mb-0.5">Days remaining in FY:</p>
                          <p className="font-bold text-amber-700 dark:text-amber-400">61 days</p>
                        </div>
                        <div>
                          <p className="text-secondary mb-0.5">Projected additional spend:</p>
                          <p className="font-bold text-red-700 dark:text-red-400 flex items-center gap-1">$8.5M <AlertTriangle className="w-3 h-3" /></p>
                        </div>
                      </div>
                    </div>

                    {/* Year-End Forecast */}
                    <div className="bg-slate-50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-700/20 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <TrendingUp className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                        <h4 className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide">Year-End Forecast</h4>
                      </div>
                      <div className="space-y-2 text-xs">
                        <div className="flex items-center justify-between p-2 bg-red-500/10 rounded">
                          <span className="text-secondary">• Current pace:</span>
                          <span className="font-bold text-red-700 dark:text-red-400 flex items-center gap-1">$49.73M (103% - OVER BUDGET $1.23M) <AlertCircle className="w-3 h-3" /></span>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-amber-500/10 rounded">
                          <span className="text-secondary">• Conservative estimate:</span>
                          <span className="font-bold text-amber-700 dark:text-amber-400 flex items-center gap-1">$48.9M (101% - OVER $400K) <AlertTriangle className="w-3 h-3" /></span>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-green-500/10 rounded">
                          <span className="text-secondary">• With cost controls:</span>
                          <span className="font-bold text-green-600 dark:text-green-400 flex items-center gap-1">$48.3M (99.6% - UNDER BUDGET $200K) <CheckCircle className="w-3 h-3" /></span>
                        </div>
                      </div>
                    </div>

                    {/* Comparison to Last Year */}
                    <div className="bg-white dark:bg-slate-900/50 border border-border rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <RefreshCw className="w-4 h-4 text-secondary" />
                        <h4 className="text-xs font-bold text-secondary">COMPARISON TO LAST YEAR (FY 2023):</h4>
                      </div>
                      <div className="grid grid-cols-3 gap-3 text-xs">
                        <div>
                          <p className="text-secondary mb-1">Same period last year:</p>
                          <p className="font-bold text-primary">$39.8M (82%)</p>
                        </div>
                        <div>
                          <p className="text-secondary mb-1">Current year:</p>
                          <p className="font-bold text-primary">$41.2M (85%)</p>
                        </div>
                        <div>
                          <p className="text-secondary mb-1">YoY increase:</p>
                          <div className="flex items-center gap-1">
                            <ArrowUpCircle className="w-3 h-3 text-amber-700 dark:text-amber-400" />
                            <p className="font-bold text-amber-700 dark:text-amber-400">+3% ↑</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      <button className={secondaryBtn}>View Detailed Breakdown</button>
                      <button onClick={() => setActiveTab('forecast')} className={secondaryBtn}>Adjust Forecast</button>
                      <button onClick={() => setVarianceReportOpen(true)} className={secondaryBtn}>Variance Report</button>
                    </div>
                  </div>
                </div>

                {/* Monthly Spending Trend */}
                <div className="bg-white dark:bg-slate-800/25 border border-slate-200 dark:border-slate-700/30 rounded-xl shadow-sm dark:shadow-none p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-[13px] font-semibold text-slate-900 dark:text-white uppercase tracking-wide">Monthly Spending</h3>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Click any month for breakdown · Anomalies flagged</p>
                    </div>
                    {monthlyTrend.some(m => m.variance) && (
                      <span className="px-1.5 py-0.5 bg-red-100 dark:bg-red-500/10 text-red-700 dark:text-red-400 text-[11px] font-semibold rounded">1 Anomaly</span>
                    )}
                  </div>
                  <div className="space-y-1.5">
                    {monthlyTrend.map((month, idx) => {
                      const percent = (month.spent / month.budget) * 100;
                      const prevMonth = idx > 0 ? monthlyTrend[idx - 1] : null;
                      const delta = prevMonth ? ((month.spent - prevMonth.spent) / prevMonth.spent) * 100 : null;
                      const isAnomaly = !!month.variance;
                      return (
                        <div
                          key={idx}
                          className={`cursor-pointer rounded-lg px-2 py-2 -mx-2 transition-colors ${
                            isAnomaly
                              ? 'bg-red-50 dark:bg-red-500/5 hover:bg-red-100 dark:hover:bg-red-500/10 border border-red-200 dark:border-red-500/15'
                              : 'hover:bg-slate-50 dark:hover:bg-slate-700/20'
                          }`}
                          onClick={() => setMonthDetailModal(month)}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-slate-500 dark:text-slate-400 w-6">{month.month}</span>
                              {isAnomaly && (
                                <span className="flex items-center gap-1 px-1.5 py-0.5 bg-red-100 dark:bg-red-500/15 text-red-700 dark:text-red-400 text-[10px] font-bold rounded">
                                  <AlertTriangle className="w-2.5 h-2.5" /> Spike
                                </span>
                              )}
                              {!isAnomaly && percent > 100 && <AlertCircle className="w-3 h-3 text-red-700 dark:text-red-400" />}
                            </div>
                            <div className="flex items-center gap-3">
                              {delta !== null && Math.abs(delta) >= 2 && (
                                <span className={`text-[10px] font-medium hidden sm:inline ${delta > 0 ? 'text-red-700 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>
                                  {delta > 0 ? '+' : ''}{delta.toFixed(1)}% vs prior
                                </span>
                              )}
                              <span className="text-xs text-slate-500 dark:text-slate-400">{fmt(month.spent)}</span>
                              <span className={`text-xs font-semibold w-8 text-right ${
                                percent > 100 ? 'text-red-700 dark:text-red-400' : percent > 95 ? 'text-amber-600 dark:text-amber-400' : 'text-slate-600 dark:text-slate-300'
                              }`}>{percent.toFixed(0)}%</span>
                            </div>
                          </div>
                          <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-700/50 rounded-full overflow-hidden">
                            <div className={`h-full rounded-full ${
                              percent > 100 || isAnomaly ? 'bg-red-500' : percent > 95 ? 'bg-amber-500' : 'bg-amber-500'
                            }`} style={{ width: `${Math.min(percent, 100)}%` }} />
                          </div>
                          {isAnomaly && (
                            <p className="text-[10px] text-red-600 dark:text-red-400 mt-1">
                              Spike: OT +{fmt(month.variance.overtime)} · HVAC +{fmt(month.variance.hvac)} · Fleet +{fmt(month.variance.vehicles)}
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* DIVISION INTELLIGENCE HEATMAP TAB */}
            {activeTab === 'heatmap' && (
              <div className="space-y-5">
                <div className="bg-white dark:bg-slate-800/25 border border-slate-200 dark:border-slate-700/30 rounded-xl shadow-sm dark:shadow-none overflow-hidden">
                  <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 dark:border-slate-700/30">
                    <div className="flex items-center gap-3">
                      <Target className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                      <span className="text-sm font-semibold text-slate-900 dark:text-white">Division Intelligence</span>
                    </div>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">Click any row to drill down</span>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-slate-200 dark:border-slate-700/30 bg-slate-50 dark:bg-slate-800/30">
                          <th className="text-left px-5 py-3 text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Division</th>
                          <th className="text-center px-4 py-3 text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Status</th>
                          <th className="text-right px-4 py-3 text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Budget Used</th>
                          <th className="text-right px-4 py-3 text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Variance</th>
                          <th className="text-right px-5 py-3 text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Trend</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-700/20">
                        {divisionHeatmap.map(div => (
                          <React.Fragment key={div.name}>
                            <tr
                              onClick={() => setSelectedDivision(selectedDivision === div.name ? null : div.name)}
                              className="cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/10 transition-colors"
                            >
                              <td className="px-5 py-4 font-semibold text-[13px] text-slate-800 dark:text-slate-200">
                                <div className="flex items-center gap-2">
                                  {div.name}
                                  {selectedDivision === div.name && <ChevronUp className="w-3.5 h-3.5 text-slate-400" />}
                                  {selectedDivision !== div.name && <ChevronDown className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600" />}
                                </div>
                              </td>
                              <td className="px-4 py-4 text-center">
                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-bold ${
                                  div.status === 'Critical' ? 'bg-red-100 dark:bg-red-500/10 text-red-700 dark:text-red-400' :
                                  div.status === 'Watch' ? 'bg-amber-100 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400' :
                                  'bg-green-100 dark:bg-green-500/10 text-green-700 dark:text-green-400'
                                }`}>
                                  <span>{div.status === 'Critical' ? '🔴' : div.status === 'Watch' ? '🟡' : '🟢'}</span>
                                  {div.status}
                                </span>
                              </td>
                              <td className="px-4 py-4 text-right">
                                <div className="flex items-center justify-end gap-2">
                                  <div className="w-20 h-1.5 bg-slate-100 dark:bg-slate-700/50 rounded-full overflow-hidden">
                                    <div className={`h-full rounded-full transition-all ${
                                      div.spend >= 90 ? 'bg-red-500' : div.spend >= 84 ? 'bg-amber-500' : 'bg-green-500'
                                    }`} style={{ width: `${div.spend}%` }} />
                                  </div>
                                  <span className={`text-[12px] font-bold w-10 text-right ${
                                    div.spend >= 90 ? 'text-red-700 dark:text-red-400' : div.spend >= 84 ? 'text-amber-700 dark:text-amber-400' : 'text-green-600 dark:text-green-400'
                                  }`}>{div.spend}%</span>
                                </div>
                              </td>
                              <td className={`px-4 py-4 text-right text-[13px] font-bold ${div.variance > 0 ? 'text-red-700 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>
                                {div.variance > 0 ? '+' : ''}{fmt(div.variance)}
                              </td>
                              <td className={`px-5 py-4 text-right text-[12px] font-semibold ${
                                div.trend === 'up' ? 'text-red-500 dark:text-red-400' : div.trend === 'down' ? 'text-green-500 dark:text-green-400' : 'text-slate-400'
                              }`}>
                                {div.trend === 'up' ? '↑ Rising' : div.trend === 'down' ? '↓ Falling' : '→ Stable'}
                              </td>
                            </tr>
                            {selectedDivision === div.name && (
                              <tr className="bg-slate-50 dark:bg-slate-800/20">
                                <td colSpan={5} className="px-5 py-4">
                                  <div className="space-y-2">
                                    <p className="text-[12px] font-semibold text-slate-700 dark:text-slate-300">Driver: <span className="font-normal text-slate-600 dark:text-slate-400">{div.driver}</span></p>
                                    {div.link && (
                                      <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 dark:bg-blue-500/5 border border-blue-200 dark:border-blue-500/20 rounded-lg">
                                        <ArrowUpRight className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
                                        <p className="text-[12px] text-blue-700 dark:text-blue-400 font-medium">{div.link}</p>
                                      </div>
                                    )}
                                    <button
                                      onClick={() => { setActiveTab('divisions'); }}
                                      className="text-[11px] font-semibold text-amber-600 dark:text-amber-400 hover:underline"
                                    >
                                      Full division breakdown →
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            )}
                          </React.Fragment>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* SIMULATION MODE TAB */}
            {activeTab === 'simulation' && (
              <div className="space-y-5">
                <div className="bg-white dark:bg-slate-800/25 border border-slate-200 dark:border-slate-700/30 rounded-xl shadow-sm dark:shadow-none p-5">
                  <div className="flex items-center gap-3 mb-5">
                    <Activity className="w-4 h-4 text-violet-500 dark:text-violet-400" />
                    <span className="text-sm font-semibold text-slate-900 dark:text-white">Budget Scenario Simulator</span>
                    <span className="px-1.5 py-0.5 bg-violet-100 dark:bg-violet-500/10 text-violet-700 dark:text-violet-400 text-[11px] font-bold rounded">AI Copilot</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
                    {/* Overtime */}
                    <div className="p-4 bg-slate-50 dark:bg-slate-800/30 rounded-xl">
                      <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">
                        Overtime Reduction
                      </label>
                      <input
                        type="range" min="0" max="25" value={simOT}
                        onChange={e => setSimOT(+e.target.value)}
                        className="w-full accent-amber-500 mb-2"
                      />
                      <div className="flex justify-between text-[11px]">
                        <span className="text-slate-400">0%</span>
                        <span className={`font-bold ${simOT > 0 ? 'text-green-600 dark:text-green-400' : 'text-slate-400'}`}>
                          {simOT > 0 ? `−${simOT}% OT = ${fmt(simOTSavings)} saved` : 'No change'}
                        </span>
                        <span className="text-slate-400">25%</span>
                      </div>
                    </div>

                    {/* Hiring freezes */}
                    <div className="p-4 bg-slate-50 dark:bg-slate-800/30 rounded-xl">
                      <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">
                        Hiring Freezes
                      </label>
                      <div className="flex items-center justify-center gap-4 mb-2">
                        <button
                          onClick={() => setSimHires(Math.max(0, simHires - 1))}
                          className="w-9 h-9 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-slate-700 dark:text-slate-300 font-black text-lg flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors"
                        >−</button>
                        <span className="text-2xl font-black text-slate-800 dark:text-slate-200 w-8 text-center">{simHires}</span>
                        <button
                          onClick={() => setSimHires(Math.min(10, simHires + 1))}
                          className="w-9 h-9 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-slate-700 dark:text-slate-300 font-black text-lg flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors"
                        >+</button>
                      </div>
                      <p className={`text-[11px] text-center font-semibold ${simHires > 0 ? 'text-green-600 dark:text-green-400' : 'text-slate-400'}`}>
                        {simHires > 0 ? `${fmt(simHireSavings)} saved` : 'No freezes'}
                      </p>
                    </div>

                    {/* Fleet delay */}
                    <div className="p-4 bg-slate-50 dark:bg-slate-800/30 rounded-xl">
                      <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">
                        Fleet Procurement Delay
                      </label>
                      <input
                        type="range" min="0" max="90" step="30" value={simFleetDelay}
                        onChange={e => setSimFleetDelay(+e.target.value)}
                        className="w-full accent-amber-500 mb-2"
                      />
                      <div className="flex justify-between text-[11px]">
                        <span className="text-slate-400">None</span>
                        <span className={`font-bold ${simFleetDelay > 0 ? 'text-green-600 dark:text-green-400' : 'text-slate-400'}`}>
                          {simFleetDelay > 0 ? `${simFleetDelay} days = ${fmt(simFleetSavings)} saved` : 'On schedule'}
                        </span>
                        <span className="text-slate-400">90d</span>
                      </div>
                    </div>
                  </div>

                  {/* Simulation result */}
                  <div className={`p-5 rounded-xl border ${simProjection > BUDGET ? 'bg-red-50 dark:bg-red-500/5 border-red-200 dark:border-red-500/20' : 'bg-green-50 dark:bg-green-500/5 border-green-200 dark:border-green-500/20'}`}>
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-1">Simulated Year-End Projection</p>
                        <p className={`text-4xl font-black ${simProjection > BUDGET ? 'text-red-700 dark:text-red-400' : 'text-green-700 dark:text-green-400'}`}>{fmt(simProjection)}</p>
                        <p className={`text-[13px] font-semibold mt-1 ${simProjection > BUDGET ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>
                          {simProjection > BUDGET ? fmt(simProjection - BUDGET) + ' over budget' : fmt(BUDGET - simProjection) + ' under budget'}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-1">Total scenario savings</p>
                        <p className="text-2xl font-black text-green-600 dark:text-green-400">{fmt(totalSimSavings)}</p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">vs current {fmt(liveProjection)} projection</p>
                      </div>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-3">Simulation uses 3-year historical spend patterns and current run rates. Results are directional, not a guarantee of outcome.</p>
                </div>
              </div>
            )}

            {/* ENHANCED DIVISIONS TAB */}
            {activeTab === 'divisions' && (
              <div className="space-y-6">
                {divisionBudgets.map(division => {
                  const isExpanded = expandedCategories.has(division.id);
                  const statusColor = division.variance < -100000 ? 'red' : division.variance < 0 ? 'amber' : 'green';
                  const trendIcon = division.variance < 0 ? TrendingUp : division.variance > 50000 ? TrendingDown : ArrowUpCircle;
                  const TrendIcon = trendIcon;

                  return (
                    <div key={division.id} className="bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/40 rounded-xl overflow-hidden">
                      <div className="p-5">
                        <div className="flex items-center justify-between mb-6">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-lg font-semibold text-primary">{division.name}</h3>

                              {/* Status Badge */}
                              {statusColor === 'red' && (
                                <span className="px-2 py-0.5 bg-red-500/20 border border-red-500/30 rounded text-xs text-red-700 dark:text-red-400 font-bold flex items-center gap-1">
                                  <AlertCircle className="w-3 h-3" />
                                  Over Budget
                                </span>
                              )}
                              {statusColor === 'amber' && (
                                <span className="px-2 py-0.5 bg-amber-500/20 border border-amber-500/30 rounded text-xs text-amber-700 dark:text-amber-400 font-bold">
                                  High Usage
                                </span>
                              )}
                              {statusColor === 'green' && division.variance > 50000 && (
                                <span className="px-2 py-0.5 bg-green-500/20 border border-green-500/30 rounded text-xs text-green-600 dark:text-green-400 font-bold">
                                  Under Budget
                                </span>
                              )}
                            </div>

                            <p className="text-sm text-secondary mb-2">
                              {fmt(division.spent)} / {fmt(division.budget)}
                              {division.variance !== 0 && (
                                <span className={`ml-2 font-semibold flex items-center gap-1 inline-flex ${getVarianceColor(division.variance)}`}>
                                  <TrendIcon className="w-3 h-3" />
                                  ({division.variance > 0 ? '+' : ''}{fmt(Math.abs(division.variance))})
                                </span>
                              )}
                            </p>

                            {/* Trend Indicator */}
                            <div className="flex items-center gap-2 text-xs">
                              <span className="text-slate-500">Trend:</span>
                              {division.variance < -100000 && (
                                <span className="text-red-700 dark:text-red-400 font-semibold flex items-center gap-1">
                                  <ArrowUpCircle className="w-3 h-3" />
                                  Trending over (+{fmt(Math.abs(division.variance))} projected overage)
                                </span>
                              )}
                              {division.variance >= -100000 && division.variance < 0 && (
                                <span className="text-amber-700 dark:text-amber-400 font-semibold flex items-center gap-1">
                                  <TrendingUp className="w-3 h-3" />
                                  On track
                                </span>
                              )}
                              {division.variance > 50000 && (
                                <span className="text-green-600 dark:text-green-400 font-semibold flex items-center gap-1">
                                  <TrendingDown className="w-3 h-3" />
                                  Under budget (Highest surplus: {fmt(division.variance)} available)
                                </span>
                              )}
                              {division.variance >= 0 && division.variance <= 50000 && (
                                <span className="text-secondary font-semibold">→ On track</span>
                              )}
                            </div>
                          </div>
                          <button
                            onClick={() => toggleCategory(division.id)}
                            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700/50 rounded-lg transition-colors"
                          >
                            {isExpanded ? <ChevronUp className="w-5 h-5 text-secondary" /> : <ChevronDown className="w-5 h-5 text-secondary" />}
                          </button>
                        </div>

                        <div className="mb-3">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-secondary">Budget Utilization</span>
                            <span className={`text-sm font-bold ${
                              getPercentColor(division.percentSpent) === 'red' ? 'text-red-700 dark:text-red-400' :
                              getPercentColor(division.percentSpent) === 'amber' ? 'text-amber-700 dark:text-amber-400' : 'text-green-600 dark:text-green-400'
                            }`}>{division.percentSpent.toFixed(1)}%</span>
                          </div>
                          <div className="w-full h-3 bg-white dark:bg-slate-700/50 rounded-full overflow-hidden">
                            <div className={`h-full ${
                              getPercentColor(division.percentSpent) === 'red' ? 'bg-red-500' :
                              getPercentColor(division.percentSpent) === 'amber' ? 'bg-amber-500' : 'bg-green-500'
                            }`} style={{ width: `${division.percentSpent}%` }} />
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-3 mb-4">
                          <div className="bg-white dark:bg-slate-900/50 rounded-lg p-3">
                            <p className="text-xs text-secondary mb-1">Spent</p>
                            <p className="text-sm font-bold text-amber-700 dark:text-amber-400">{fmt(division.spent)}</p>
                          </div>
                          <div className="bg-white dark:bg-slate-900/50 rounded-lg p-3">
                            <p className="text-xs text-secondary mb-1">Committed</p>
                            <p className="text-sm font-bold text-purple-400">{fmt(division.committed)}</p>
                          </div>
                          <div className="bg-white dark:bg-slate-900/50 rounded-lg p-3">
                            <p className="text-xs text-secondary mb-1">Available</p>
                            <p className="text-sm font-bold text-green-600 dark:text-green-400">{fmt(division.available)}</p>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-2">
                          <button className={secondaryBtn}>
                            View Details
                          </button>
                          <button
                            onClick={() => setReallocationModal(true)}
                            className={secondaryBtn}
                          >
                            {division.variance < 0 ? 'Reduce Spending' : 'Reallocate Surplus'}
                          </button>
                        </div>
                      </div>

                      {isExpanded && (
                        <div className="border-t border-border p-5 bg-slate-50 dark:bg-slate-900/30">
                          <h4 className="text-sm font-semibold text-primary mb-3">Budget Categories</h4>
                          <div className="space-y-3">
                            {division.categories.map((cat, idx) => (
                              <div key={idx}>
                                <div className="flex items-center justify-between mb-2">
                                  <span className="text-sm text-secondary">{cat.name}</span>
                                  <div className="flex items-center gap-3">
                                    <span className="text-sm text-secondary">{fmt(cat.spent)} / {fmt(cat.budget)}</span>
                                    <span className={`text-sm font-bold ${
                                      cat.percent >= 95 ? 'text-red-700 dark:text-red-400' : cat.percent >= 85 ? 'text-amber-700 dark:text-amber-400' : 'text-green-600 dark:text-green-400'
                                    }`}>{cat.percent.toFixed(1)}%</span>
                                  </div>
                                </div>
                                <div className="w-full h-2 bg-white dark:bg-slate-700/50 rounded-full overflow-hidden">
                                  <div className={`h-full ${
                                    cat.percent >= 95 ? 'bg-red-500' : cat.percent >= 85 ? 'bg-amber-500' : 'bg-green-500'
                                  }`} style={{ width: `${cat.percent}%` }} />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* ENHANCED RESOURCES TAB */}
            {activeTab === 'resources' && (
              <div className="space-y-6">
                {/* Personnel Breakdown */}
                <div className="bg-white dark:bg-slate-800/40 border border-border rounded-xl shadow-sm dark:shadow-none p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
                      <Users className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-primary flex items-center gap-2"><Briefcase className="w-5 h-5 text-blue-400" /> PERSONNEL (Largest expense)</h3>
                      <p className="text-sm text-secondary">Annual Budget: $38.5M (79% of total)</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="bg-white dark:bg-slate-900/50 rounded-lg p-4 border border-border">
                      <p className="text-xs text-secondary mb-1">Spent YTD</p>
                      <p className="text-2xl font-bold text-primary">$32.8M</p>
                      <div className="flex items-center gap-1 mt-1">
                        <span className="text-xs font-semibold text-amber-700 dark:text-amber-400">85% spent</span>
                      </div>
                    </div>
                    <div className="bg-white dark:bg-slate-900/50 rounded-lg p-4 border border-border">
                      <p className="text-xs text-secondary mb-1">Remaining</p>
                      <p className="text-2xl font-bold text-green-600 dark:text-green-400">$5.7M</p>
                      <div className="flex items-center gap-1 mt-1">
                        <span className="text-xs text-slate-500">15% remaining</span>
                      </div>
                    </div>
                    <div className="bg-white dark:bg-slate-900/50 rounded-lg p-4 border border-slate-200 dark:border-slate-700/30">
                      <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Burn Rate</p>
                      <p className="text-2xl font-bold text-slate-900 dark:text-white">$3.3M</p>
                      <div className="flex items-center gap-1 mt-1">
                        <span className="text-xs text-slate-500 dark:text-slate-400">per month avg</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="bg-white dark:bg-slate-900/50 rounded-lg p-4 border border-border">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold text-primary">• Salaries:</span>
                        <div className="text-right">
                          <p className="text-sm font-bold text-primary">$28.2M</p>
                          <p className="text-xs text-green-600 dark:text-green-400">87% spent</p>
                        </div>
                      </div>
                      <div className="w-full h-2 bg-white dark:bg-slate-700/50 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500" style={{ width: '87%' }} />
                      </div>
                    </div>

                    <div className="bg-white dark:bg-slate-900/50 rounded-lg p-4 border border-border">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-primary">• Overtime:</span>
                          <span className="px-2 py-0.5 bg-red-500/20 border border-red-500/30 rounded text-xs text-red-700 dark:text-red-400 font-bold">
                            Over Budget
                          </span>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold text-primary">$3.2M</p>
                          <p className="text-xs text-red-700 dark:text-red-400">92% spent</p>
                        </div>
                      </div>
                      <div className="w-full h-2 bg-white dark:bg-slate-700/50 rounded-full overflow-hidden">
                        <div className="h-full bg-red-500" style={{ width: '92%' }} />
                      </div>
                      <div className="mt-3 pt-3 border-t border-border dark:border-slate-700/30">
                        <p className="text-xs font-bold text-amber-700 dark:text-amber-400 mb-2">Overtime Analysis:</p>
                        <div className="space-y-1 text-xs text-secondary">
                          <div className="flex justify-between">
                            <span>• YTD:</span>
                            <span className="font-medium text-primary">$3.2M</span>
                          </div>
                          <div className="flex justify-between">
                            <span>• Budget:</span>
                            <span className="font-medium text-primary">$3.5M</span>
                          </div>
                          <div className="flex justify-between">
                            <span>• Projected year-end:</span>
                            <span className="font-medium text-red-700 dark:text-red-400 flex items-center gap-1">$3.8M (109% - OVER $300K) <AlertCircle className="w-3 h-3" /></span>
                          </div>
                          <div className="flex justify-between">
                            <span>• Drivers:</span>
                            <span className="font-medium text-secondary">Patrol understaffing, court coverage</span>
                          </div>
                        </div>
                        <div className="mt-3 flex gap-2">
                          <button className={secondaryBtn}>
                            View Details
                          </button>
                          <button className={secondaryBtn}>
                            Reduce Overtime Plan
                          </button>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-2">Projected savings: $220K in 60 days</p>
                      </div>
                    </div>

                    <div className="bg-white dark:bg-slate-900/50 rounded-lg p-4 border border-border">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold text-primary">• Benefits:</span>
                        <div className="text-right">
                          <p className="text-sm font-bold text-primary">$7.1M</p>
                          <p className="text-xs text-green-600 dark:text-green-400">83% spent</p>
                        </div>
                      </div>
                      <div className="w-full h-2 bg-white dark:bg-slate-700/50 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500" style={{ width: '83%' }} />
                      </div>
                    </div>
                  </div>
                </div>
                {/* Vehicles */}
                <div className="bg-white dark:bg-slate-800/40 border border-border rounded-xl shadow-sm dark:shadow-none p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
                      <Truck className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-primary">Fleet Management</h3>
                      <p className="text-sm text-secondary">{resources.vehicles.total} total vehicles</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="bg-white dark:bg-slate-900/50 rounded-lg p-4">
                      <p className="text-xs text-secondary mb-1">Patrol</p>
                      <p className="text-2xl font-bold text-primary">{resources.vehicles.patrol}</p>
                    </div>
                    <div className="bg-white dark:bg-slate-900/50 rounded-lg p-4">
                      <p className="text-xs text-secondary mb-1">Investigation</p>
                      <p className="text-2xl font-bold text-primary">{resources.vehicles.investigation}</p>
                    </div>
                    <div className="bg-white dark:bg-slate-900/50 rounded-lg p-4">
                      <p className="text-xs text-secondary mb-1">Support</p>
                      <p className="text-2xl font-bold text-primary">{resources.vehicles.support}</p>
                    </div>
                    <div className="bg-white dark:bg-slate-900/50 rounded-lg p-4">
                      <p className="text-xs text-secondary mb-1">Administration</p>
                      <p className="text-2xl font-bold text-primary">{resources.vehicles.administration}</p>
                    </div>
                    <div className="bg-white dark:bg-slate-900/50 rounded-lg p-4">
                      <p className="text-xs text-secondary mb-1">In Maintenance</p>
                      <p className="text-2xl font-bold text-amber-700 dark:text-amber-400">{resources.vehicles.maintenance}</p>
                    </div>
                    <div className="bg-white dark:bg-slate-900/50 rounded-lg p-4">
                      <p className="text-xs text-secondary mb-1">Needs Replacement</p>
                      <p className="text-2xl font-bold text-red-700 dark:text-red-400">{resources.vehicles.replacement}</p>
                    </div>
                  </div>
                </div>

                {/* Facilities */}
                <div className="bg-white dark:bg-slate-800/40 border border-border rounded-xl shadow-sm dark:shadow-none p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center">
                      <Building2 className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-primary">Facilities</h3>
                      <p className="text-sm text-secondary">{resources.facilities.totalSqFt.toLocaleString()} sq ft total</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-white dark:bg-slate-900/50 rounded-lg">
                      <span className="text-sm text-secondary">Main Headquarters</span>
                      <span className="text-sm font-medium text-primary">{resources.facilities.main}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white dark:bg-slate-900/50 rounded-lg">
                      <span className="text-sm text-secondary">Detention Center</span>
                      <span className="text-sm font-medium text-primary">{resources.facilities.detention}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white dark:bg-slate-900/50 rounded-lg">
                      <span className="text-sm text-secondary">Substations</span>
                      <span className="text-sm font-medium text-primary">{resources.facilities.substations} locations</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white dark:bg-slate-900/50 rounded-lg">
                      <span className="text-sm text-secondary">Training Facility</span>
                      <span className="text-sm font-medium text-primary">{resources.facilities.trainingFacility} facility</span>
                    </div>
                  </div>
                </div>

                {/* Equipment */}
                <div className="bg-white dark:bg-slate-800/40 border border-border rounded-xl shadow-sm dark:shadow-none p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center">
                      <Wrench className="w-5 h-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-primary">Equipment Inventory</h3>
                      <p className="text-sm text-secondary">Critical equipment status</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {Object.entries(resources.equipment).map(([key, value]) => (
                      <div key={key}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-secondary capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                          <div className="flex items-center gap-3">
                            <span className="text-sm text-secondary">Total: {value.total}</span>
                            <span className={`text-sm font-bold ${value.needsReplacement === 0 ? 'text-green-600 dark:text-green-400' : value.needsReplacement > 50 ? 'text-red-700 dark:text-red-400' : 'text-amber-700 dark:text-amber-400'}`}>
                              Replace: {value.needsReplacement}
                            </span>
                          </div>
                        </div>
                        <div className="w-full h-2 bg-white dark:bg-slate-700/50 rounded-full overflow-hidden">
                          <div className={`h-full ${value.needsReplacement === 0 ? 'bg-green-500' : value.needsReplacement > 50 ? 'bg-red-500' : 'bg-amber-500'}`}
                            style={{ width: `${((value.total - value.needsReplacement) / value.total) * 100}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ENHANCED FORECAST TAB */}
            {activeTab === 'forecast' && (
              <div className="space-y-6">
                <div className="bg-white dark:bg-slate-800/40 border border-border rounded-xl shadow-sm dark:shadow-none p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <LineChart className="w-5 h-5 text-purple-400" />
                    <h3 className="text-lg font-semibold text-primary">BUDGET FORECAST</h3>
                  </div>

                  {/* Scenario Comparison */}
                  <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertCircle className="w-4 h-4 text-red-700 dark:text-red-400" />
                        <span className="text-xs font-bold text-red-700 dark:text-red-400 uppercase tracking-wide">If No Action Taken</span>
                      </div>
                      <p className="text-2xl font-bold text-red-700 dark:text-red-400 mb-0.5">$49.7M</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">103% of budget · $1.2M overrun</p>
                      <div className="border-t border-red-500/20 pt-3 space-y-1 text-xs text-slate-600 dark:text-slate-400">
                        <p>Nov: $4.3M &nbsp;·&nbsp; Dec: $4.2M at current pace</p>
                        <p className="text-red-700 dark:text-red-400 font-medium">Triggers FY25 budget reduction request</p>
                      </div>
                    </div>
                    <div className="bg-green-500/5 border border-green-500/20 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                        <span className="text-xs font-bold text-green-600 dark:text-green-400 uppercase tracking-wide">If Recommended Actions Applied</span>
                      </div>
                      <p className="text-2xl font-bold text-green-600 dark:text-green-400 mb-0.5">$48.3M</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">99.6% of budget · $200K under</p>
                      <div className="border-t border-green-500/20 pt-3 space-y-1 text-xs text-slate-600 dark:text-slate-400">
                        <p>Nov: $3.7M &nbsp;·&nbsp; Dec: $3.6M with controls</p>
                        <p className="text-green-600 dark:text-green-400 font-medium">Maintains 2% operating buffer</p>
                      </div>
                    </div>
                  </div>

                  {/* Current Trajectory */}
                  <div className="mb-6 bg-slate-50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-700/30 rounded-xl p-5">
                    <div className="flex items-center justify-between mb-6">
                    <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">CURRENT TRAJECTORY:</h4>
                      <TrendingUp className="w-5 h-5 text-blue-500" />
                    </div>
                    <p className="text-xs text-secondary mb-3">Based on current spending patterns</p>
                    <div className="text-sm text-secondary space-y-1 mb-4">
                      <p>• Actual spending (Jan-Oct): <span className="font-bold text-primary">$41.2M</span></p>
                      <p>• Budgeted spending: <span className="font-bold text-primary">$40.4M target</span></p>
                      <p>• Forecasted spending (Nov-Dec): <span className="font-bold text-red-700 dark:text-red-400">$8.5M (projected)</span></p>
                    </div>
                  </div>

                  {/* Three Scenarios */}
                  <div className="space-y-4 mb-6">
                    <h4 className="text-sm font-bold text-primary">SCENARIOS:</h4>

                    {/* Scenario 1 - Current Pace */}
                    <div className="bg-slate-50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-700/30 rounded-xl p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <AlertCircle className="w-5 h-5 text-red-700 dark:text-red-400" />
                        <h5 className="text-sm font-bold text-red-700 dark:text-red-400">SCENARIO 1: Current Pace (Do Nothing)</h5>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs mb-3">
                        <div>
                          <p className="text-secondary mb-1">Nov spending:</p>
                          <p className="font-bold text-primary">$4.3M</p>
                        </div>
                        <div>
                          <p className="text-secondary mb-1">Dec spending:</p>
                          <p className="font-bold text-primary">$4.2M</p>
                        </div>
                        <div>
                          <p className="text-secondary mb-1">Year-end total:</p>
                          <p className="font-bold text-primary">$49.7M</p>
                        </div>
                        <div>
                          <p className="text-secondary mb-1">vs Budget:</p>
                          <p className="font-bold text-red-700 dark:text-red-400 flex items-center gap-1">$1.2M OVER (103%) <AlertCircle className="w-3 h-3" /></p>
                        </div>
                      </div>
                    </div>

                    {/* Scenario 2 - Cost Controls */}
                    <div className="bg-slate-50 dark:bg-slate-900/30 border border-green-500/40 rounded-xl p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                        <h5 className="text-sm font-bold text-green-600 dark:text-green-400 flex items-center gap-2">SCENARIO 2: Cost Controls (15% Reduction) <span className="px-1.5 py-0.5 rounded border border-green-500/40 text-[10px]">RECOMMENDED</span></h5>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs mb-3">
                        <div>
                          <p className="text-secondary mb-1">Nov spending:</p>
                          <p className="font-bold text-primary">$3.7M</p>
                        </div>
                        <div>
                          <p className="text-secondary mb-1">Dec spending:</p>
                          <p className="font-bold text-primary">$3.6M</p>
                        </div>
                        <div>
                          <p className="text-secondary mb-1">Year-end total:</p>
                          <p className="font-bold text-primary">$48.5M</p>
                        </div>
                        <div>
                          <p className="text-secondary mb-1">vs Budget:</p>
                          <p className="font-bold text-green-600 dark:text-green-400 flex items-center gap-1">$0 variance (100%) <CheckCircle className="w-3 h-3" /></p>
                        </div>
                      </div>
                    </div>

                    {/* Scenario 3 - Aggressive Controls */}
                    <div className="bg-slate-50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-700/30 rounded-xl p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <TrendingDown className="w-5 h-5 text-blue-400" />
                        <h5 className="text-sm font-bold text-blue-400">SCENARIO 3: Aggressive Controls (25% Reduction)</h5>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs mb-3">
                        <div>
                          <p className="text-secondary mb-1">Nov spending:</p>
                          <p className="font-bold text-primary">$3.2M</p>
                        </div>
                        <div>
                          <p className="text-secondary mb-1">Dec spending:</p>
                          <p className="font-bold text-primary">$3.1M</p>
                        </div>
                        <div>
                          <p className="text-secondary mb-1">Year-end total:</p>
                          <p className="font-bold text-primary">$47.5M</p>
                        </div>
                        <div>
                          <p className="text-secondary mb-1">vs Budget:</p>
                          <p className="font-bold text-green-600 dark:text-green-400 flex items-center gap-1">-$1.0M UNDER (98%) <CheckCircle className="w-3 h-3" /></p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Recommended Actions for Scenario 2 */}
                  <div className="bg-slate-50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-700/30 rounded-xl p-5">
                    <div className="flex items-center gap-2 mb-4">
                      <Zap className="w-5 h-5 text-purple-400" />
                      <h5 className="text-sm font-bold text-slate-800 dark:text-slate-200">RECOMMENDED ACTIONS (Scenario 2):</h5>
                    </div>
                    <div className="space-y-2 text-sm text-secondary mb-4">
                      <div className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 flex-shrink-0"></div>
                        <p>Freeze non-essential purchases</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 flex-shrink-0"></div>
                        <p>Limit overtime to emergencies only</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 flex-shrink-0"></div>
                        <p>Defer equipment purchases to next FY</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 flex-shrink-0"></div>
                        <p>Delay 2 new hires until Jan 2025</p>
                      </div>
                    </div>
                  </div>

                  {/* Reallocation Opportunities */}
                  <div className="mt-6 bg-slate-50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-700/30 rounded-xl p-5">
                    <div className="flex items-center gap-2 mb-4">
                      <RefreshCw className="w-5 h-5 text-green-600 dark:text-green-400" />
                      <h5 className="text-sm font-bold text-slate-800 dark:text-slate-200">REALLOCATION OPPORTUNITIES:</h5>
                    </div>
                    <div className="space-y-3 text-sm">
                      <div className="bg-white dark:bg-slate-900/50 rounded-lg p-3 border border-border">
                        <p className="text-secondary mb-2">• <span className="font-bold text-primary">Training Division</span> surplus: <span className="font-bold text-green-600 dark:text-green-400">$600K</span></p>
                        <div className="pl-4 space-y-1 text-xs text-secondary">
                          <p>→ Move $300K to Patrol (cover OT)</p>
                          <p>→ Move $200K to Administration (HVAC emergency)</p>
                          <p>→ Keep $100K buffer</p>
                        </div>
                      </div>
                      <div className="bg-white dark:bg-slate-900/50 rounded-lg p-3 border border-border">
                        <p className="text-secondary mb-2">• <span className="font-bold text-primary">Investigations</span> under budget: <span className="font-bold text-green-600 dark:text-green-400">$200K</span></p>
                        <div className="pl-4 space-y-1 text-xs text-secondary">
                          <p>→ Move $150K to Support Services (IT needs)</p>
                          <p>→ Keep $50K buffer</p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <button
                        onClick={() => setReallocationModal(true)}
                        className={`${primaryBtn} bg-blue-600 text-white border border-blue-700 hover:bg-blue-700`}
                      >
                        Apply This Plan
                      </button>
                      <button
                        onClick={() => setReallocationModal(true)}
                        className={secondaryBtn}
                      >
                        Compare
                      </button>
                      <button className={secondaryBtn}>
                        Export
                      </button>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-2">Prevents $1.2M budget overrun.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

      {/* Confirm Action Modal */}
      {confirmActionModal && (() => {
        const _beforeProjection = liveProjection;
        const _afterProjection = liveProjection - confirmActionModal.impact;
        const _beforeOverrun = liveOverrun;
        const _afterOverrun = _afterProjection - BUDGET;
        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setConfirmActionModal(null)} />
            <div className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/50 rounded-2xl max-w-lg w-full shadow-2xl max-h-[92vh] flex flex-col overflow-hidden">
              {/* Header */}
              <div className="flex items-start justify-between px-6 pt-5 pb-4 border-b border-slate-200 dark:border-slate-700/30">
                <div>
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">Confirm Action</p>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug">{confirmActionModal.title}</h3>
                </div>
                <button onClick={() => setConfirmActionModal(null)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800/50 rounded-lg transition-colors flex-shrink-0 ml-3">
                  <X className="w-5 h-5 text-slate-500" />
                </button>
              </div>

              {/* Attribution strip */}
              <div className="px-6 py-3 bg-blue-50 dark:bg-blue-500/5 border-b border-slate-100 dark:border-slate-800/50">
                <div className="flex items-center gap-2 mb-1">
                  <ShieldAlert className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                  <p className="text-[12px] font-semibold text-blue-700 dark:text-blue-300">This action will be recorded and applied immediately</p>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400 pl-5 flex-wrap">
                  <span><span className="font-semibold text-slate-700 dark:text-slate-300">Applied by:</span> Sheriff D. Williams</span>
                  <span className="text-slate-300 dark:text-slate-600">·</span>
                  <span>Effective immediately · {fmtDateTime(new Date())}</span>
                </div>
              </div>

              {/* Body */}
              <div className="overflow-y-auto flex-1">
                {/* Primary summary */}
                <div className="px-6 py-5 space-y-4">
                  <p className="text-[13px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wide">This will:</p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2.5 text-[14px] text-slate-800 dark:text-slate-200">
                      <span className="text-green-600 dark:text-green-400 font-bold mt-0.5">•</span>
                      <span>
                        Reduce projected{' '}
                        {_beforeOverrun > 0 ? 'deficit' : 'spend'} by{' '}
                        <span className="font-bold text-green-600 dark:text-green-400">{fmt(confirmActionModal.impact)}</span>
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5 text-[14px] text-slate-800 dark:text-slate-200">
                      <span className="text-green-600 dark:text-green-400 font-bold mt-0.5">•</span>
                      <div className="flex-1">
                        <span className="text-slate-700 dark:text-slate-300">Affect the following budget areas:</span>
                        <div className="mt-2 space-y-1 pl-0.5">
                          {confirmActionModal.affectedAreas.map((a, i) => (
                            <div key={i} className="flex items-center justify-between text-[12px] py-0.5">
                              <span className="text-slate-600 dark:text-slate-400">{a.area}</span>
                              <span className={`font-bold tabular-nums ${a.delta > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`}>
                                {a.delta > 0 ? '+' : ''}{fmt(a.delta)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </li>
                    <li className="flex items-start gap-2.5 text-[14px] text-slate-800 dark:text-slate-200">
                      <span className="text-green-600 dark:text-green-400 font-bold mt-0.5">•</span>
                      <div>
                        <span>Change year-end forecast from:</span>
                        <div className="mt-1.5 pl-0.5 space-y-1">
                          <div className="flex items-center gap-2">
                            <span className={`text-[13px] font-bold tabular-nums ${_beforeOverrun > 0 ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>
                              {fmt(_beforeProjection)} ({_beforeOverrun > 0 ? '+' : ''}{fmt(_beforeOverrun)} {_beforeOverrun > 0 ? 'over' : 'under'})
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <ArrowDown className="w-3.5 h-3.5 text-green-500" />
                            <span className={`text-[13px] font-bold tabular-nums ${_afterOverrun > 0 ? 'text-amber-700 dark:text-amber-400' : 'text-green-600 dark:text-green-400'}`}>
                              {fmt(_afterProjection)} ({_afterOverrun > 0 ? '+' : ''}{fmt(_afterOverrun)} {_afterOverrun > 0 ? 'over' : 'under'})
                            </span>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>

                  {/* Enhanced BEFORE→AFTER forecast bar */}
                  <div className="pt-1">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3 text-[11px]">
                        <span className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                          <span className="w-2.5 h-2.5 rounded-sm bg-red-400/60 inline-block flex-shrink-0"></span>
                          Before
                        </span>
                        <span className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                          <span className={`w-2.5 h-2.5 rounded-sm inline-block flex-shrink-0 ${_afterOverrun > 0 ? 'bg-amber-500' : 'bg-green-500'}`}></span>
                          After
                        </span>
                      </div>
                      <span className="px-2 py-0.5 bg-green-100 dark:bg-green-500/15 text-green-700 dark:text-green-400 text-[10px] font-bold rounded-full">
                        -{fmt(confirmActionModal.impact)} impact
                      </span>
                    </div>
                    <div className="relative w-full h-4 bg-slate-100 dark:bg-slate-800/50 rounded-full overflow-hidden">
                      <div
                        className="absolute inset-y-0 left-0 bg-red-400/40 dark:bg-red-500/30 rounded-full transition-all"
                        style={{ width: `${Math.min((_beforeProjection / BUDGET) * 100, 110)}%` }}
                      />
                      <div
                        className={`absolute inset-y-0 left-0 rounded-full transition-all ${_afterOverrun > 0 ? 'bg-amber-500' : 'bg-green-500'}`}
                        style={{ width: `${Math.min((_afterProjection / BUDGET) * 100, 100)}%` }}
                      />
                      <div className="absolute inset-y-0 right-0 w-0.5 bg-slate-400 dark:bg-slate-500" />
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                      <span>$0</span>
                      <span>Budget: {fmt(BUDGET)}</span>
                    </div>
                  </div>

                  {/* Confidence + Risk */}
                  <div className="flex items-center gap-3 pt-1">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 dark:bg-slate-800/40 rounded-lg">
                      <span className="text-[11px] text-slate-500 dark:text-slate-400">Confidence:</span>
                      <span className="text-[12px] font-bold text-blue-600 dark:text-blue-400">{confirmActionModal.confidence}%</span>
                    </div>
                    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${
                      confirmActionModal.riskLevel === 'Low' ? 'bg-green-100 dark:bg-green-500/10' :
                      confirmActionModal.riskLevel === 'Medium' ? 'bg-amber-100 dark:bg-amber-500/10' :
                      'bg-red-100 dark:bg-red-500/10'
                    }`}>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400">Risk:</span>
                      <span className={`text-[12px] font-bold ${
                        confirmActionModal.riskLevel === 'Low' ? 'text-green-700 dark:text-green-400' :
                        confirmActionModal.riskLevel === 'Medium' ? 'text-amber-700 dark:text-amber-400' :
                        'text-red-700 dark:text-red-400'
                      }`}>{confirmActionModal.riskLevel}</span>
                    </div>
                  </div>

                  {/* Outcome note */}
                  <p className="text-[12px] text-slate-500 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800/50 pt-3">{confirmActionModal.consequence}</p>
                </div>

                {/* Exact budget changes */}
                <div className="px-6 pb-5 border-t border-slate-100 dark:border-slate-800/50">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mt-4 mb-2">Exact Budget Changes</p>
                  <div className="border border-slate-200 dark:border-slate-700/30 rounded-xl overflow-hidden">
                    <table className="w-full text-[12px]">
                      <thead>
                        <tr className="bg-slate-50 dark:bg-slate-800/40 border-b border-slate-200 dark:border-slate-700/30">
                          <th className="text-left px-3 py-2 font-bold text-slate-500 dark:text-slate-400">Account</th>
                          <th className="text-right px-3 py-2 font-bold text-slate-500 dark:text-slate-400">Before</th>
                          <th className="text-right px-3 py-2 font-bold text-slate-500 dark:text-slate-400">After</th>
                          <th className="text-right px-3 py-2 font-bold text-slate-500 dark:text-slate-400">Δ</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-700/20">
                        {confirmActionModal.exactChanges.map((row, i) => (
                          <tr key={i}>
                            <td className="px-3 py-2 text-slate-700 dark:text-slate-300">{row.account}</td>
                            <td className="px-3 py-2 text-right text-slate-400 tabular-nums">{fmt(row.before)}</td>
                            <td className="px-3 py-2 text-right font-semibold text-slate-800 dark:text-slate-200 tabular-nums">{fmt(row.after)}</td>
                            <td className={`px-3 py-2 text-right font-bold tabular-nums ${row.delta > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`}>
                              {row.delta > 0 ? '+' : ''}{fmt(row.delta)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex gap-2 px-6 py-4 border-t border-slate-200 dark:border-slate-700/30 bg-white dark:bg-slate-900">
                <button onClick={() => setConfirmActionModal(null)} className={`flex-1 ${secondaryBtn}`}>Cancel</button>
                <button
                  onClick={() => applyAction(confirmActionModal)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 border border-amber-600 text-white text-sm font-bold uppercase tracking-wide rounded-lg transition-colors"
                >
                  <BadgeCheck className="w-4 h-4" /> Confirm & Apply
                </button>
              </div>
            </div>
          </div>
        );
      })()}

      {/* Apply All Modal — only shows pending (unapplied) actions */}
      {applyAllModal && (() => {
        // Local selection state is initialized to all pending actions
        const pendingInModal = pendingActions; // already-applied ones not shown
        const modalSelectedSavings = [...selectedActions]
          .filter(id => !appliedActionIds.has(id))
          .reduce((sum, id) => sum + (recommendedActions.find(a => a.id === id)?.impact || 0), 0);
        const newProjectionAfterSelected = liveProjection - modalSelectedSavings;
        const newOverrunAfterSelected = newProjectionAfterSelected - BUDGET;
        const selectedInModal = [...selectedActions].filter(id => !appliedActionIds.has(id));
        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setApplyAllModal(false)} />
            <div className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/50 rounded-2xl max-w-lg w-full shadow-2xl max-h-[92vh] flex flex-col overflow-hidden">
              {/* Header */}
              <div className="px-6 pt-6 pb-4 border-b border-slate-200 dark:border-slate-700/30">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      {appliedActionIds.size > 0 ? `Apply Remaining ${pendingInModal.length} Actions` : 'Apply Recommended Actions'}
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">Toggle actions on or off, then confirm</p>
                  </div>
                  <button onClick={() => setApplyAllModal(false)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800/50 rounded-lg transition-colors">
                    <X className="w-5 h-5 text-slate-500" />
                  </button>
                </div>
                {/* Live decision summary */}
                <div className={`p-3 rounded-xl border text-[12px] font-medium ${
                  selectedInModal.length === 0
                    ? 'bg-slate-50 dark:bg-slate-800/30 border-slate-200 dark:border-slate-700/30 text-slate-400'
                    : newOverrunAfterSelected <= 0
                    ? 'bg-green-50 dark:bg-green-500/5 border-green-200 dark:border-green-500/20 text-slate-700 dark:text-slate-300'
                    : 'bg-amber-50 dark:bg-amber-500/5 border-amber-200 dark:border-amber-500/20 text-slate-700 dark:text-slate-300'
                }`}>
                  {selectedInModal.length === 0
                    ? 'Select at least one action to see the updated forecast.'
                    : newOverrunAfterSelected <= 0
                    ? <>Applying these {selectedInModal.length} action{selectedInModal.length > 1 ? 's' : ''} will move FY forecast from <span className={`font-bold ${isLiveOverBudget ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>{fmt(liveProjection)}</span> → <span className="font-bold text-green-700 dark:text-green-400">{fmt(newProjectionAfterSelected)}</span> — <span className="text-green-700 dark:text-green-400 font-bold">{fmt(Math.abs(newOverrunAfterSelected))} under budget.</span></>
                    : <>Forecast improves from <span className="font-bold text-red-600 dark:text-red-400">{fmt(liveProjection)}</span> → <span className="font-bold text-amber-700 dark:text-amber-400">{fmt(newProjectionAfterSelected)}</span> · still <span className="font-bold text-red-600 dark:text-red-400">{fmt(newOverrunAfterSelected)}</span> over. Select more to close the gap.</>
                  }
                </div>
              </div>

              {/* Action list — only pending actions shown */}
              <div className="p-4 space-y-2 overflow-y-auto flex-1">
                {pendingInModal.length === 0 ? (
                  <div className="py-8 text-center">
                    <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
                    <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">All actions have been applied.</p>
                    <p className="text-[12px] text-slate-500 dark:text-slate-400 mt-1">FY 2024 is closing at {fmt(liveProjection)}</p>
                  </div>
                ) : pendingInModal.map(action => {
                  const isSelected = selectedActions.has(action.id);
                  return (
                    <div
                      key={action.id}
                      className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-blue-50 dark:bg-blue-500/5 border-blue-200 dark:border-blue-500/25'
                          : 'bg-slate-50 dark:bg-slate-800/20 border-slate-200 dark:border-slate-700/30 opacity-50'
                      }`}
                      onClick={() => {
                        const next = new Set(selectedActions);
                        if (next.has(action.id)) next.delete(action.id); else next.add(action.id);
                        setSelectedActions(next);
                      }}
                    >
                      <div className={`w-4 h-4 rounded flex-shrink-0 border-2 flex items-center justify-center mt-0.5 ${
                        isSelected ? 'bg-blue-600 border-blue-600' : 'border-slate-400 dark:border-slate-500'
                      }`}>
                        {isSelected && <CheckCircle className="w-3 h-3 text-white" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[13px] font-semibold text-slate-800 dark:text-slate-200 mb-0.5">{action.title}</p>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                            action.urgency === 'High' ? 'bg-red-100 dark:bg-red-500/10 text-red-700 dark:text-red-400' :
                            action.urgency === 'Medium' ? 'bg-amber-100 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400' :
                            'bg-slate-100 dark:bg-slate-700/40 text-slate-600 dark:text-slate-400'
                          }`}>{action.urgency}</span>
                          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                            action.riskLevel === 'Low' ? 'bg-green-100 dark:bg-green-500/10 text-green-700 dark:text-green-400' :
                            'bg-amber-100 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400'
                          }`}>{action.riskLevel} Risk</span>
                          <span className="text-[11px] text-slate-500 dark:text-slate-400">AI: {action.confidence}%</span>
                        </div>
                      </div>
                      <span className="text-[14px] font-bold text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5">{fmt(action.impact)}</span>
                    </div>
                  );
                })}
              </div>

              {/* Footer */}
              <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-700/30 bg-white dark:bg-slate-900">
                {pendingInModal.length > 0 && (
                  <div className="flex items-center justify-between mb-3 text-[12px]">
                    <span className="text-slate-500 dark:text-slate-400">
                      <span className="font-semibold text-slate-700 dark:text-slate-300">{selectedInModal.length}</span> of {pendingInModal.length} pending actions selected
                    </span>
                    <span className="font-bold text-green-600 dark:text-green-400">{fmt(modalSelectedSavings)} savings</span>
                  </div>
                )}
                <div className="flex gap-2">
                  <button onClick={() => setApplyAllModal(false)} className={`flex-1 ${secondaryBtn}`}>
                    {pendingInModal.length === 0 ? 'Close' : 'Cancel'}
                  </button>
                  {pendingInModal.length > 0 && (
                    <button
                      onClick={() => {
                        const toApply = pendingInModal.filter(a => selectedActions.has(a.id));
                        const entries = toApply.map(a => ({
                          id: `al-${Date.now()}-${a.id}`,
                          actionTitle: a.title,
                          appliedBy: 'Sheriff D. Williams',
                          appliedAt: new Date(),
                          savings: a.impact,
                          riskLevel: a.riskLevel,
                          note: a.consequence,
                        }));
                        const totalSaved = toApply.reduce((s, a) => s + a.impact, 0);
                        setAppliedActionIds(prev => new Set([...prev, ...toApply.map(a => a.id)]));
                        setAuditLog(prev => [...entries, ...prev]);
                        setApplyAllModal(false);
                        flash(['available', 'forecast-bar', 'projection-card']);
                        if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
                        setToast({ id: Date.now(), message: `${toApply.length} Action${toApply.length !== 1 ? 's' : ''} Applied — Budget improved by ${fmt(totalSaved)}`, saving: totalSaved });
                        toastTimerRef.current = setTimeout(() => setToast(null), 4500);
                      }}
                      disabled={selectedInModal.length === 0}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 border border-amber-600 disabled:opacity-50 text-white text-sm font-bold uppercase tracking-wide rounded-lg transition-colors"
                    >
                      <BadgeCheck className="w-4 h-4" /> Apply {selectedInModal.length} Action{selectedInModal.length !== 1 ? 's' : ''} — {fmt(modalSelectedSavings)}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* Month Detail Modal */}
      {monthDetailModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMonthDetailModal(null)}
          />
          <div className="relative bg-white dark:bg-slate-900 border border-border rounded-2xl max-w-3xl w-full shadow-2xl max-h-[90vh] flex flex-col overflow-hidden">
            <div className="p-6 overflow-y-auto">
            {(() => {
              const _idx = monthlyTrend.findIndex(m => m.month === monthDetailModal.month);
              const _prev = _idx > 0 ? monthlyTrend[_idx - 1] : null;
              const _delta = _prev ? ((monthDetailModal.spent - _prev.spent) / _prev.spent) * 100 : null;
              const _cats = [
                { label: 'Personnel', value: monthDetailModal.personnel },
                { label: 'Operations', value: monthDetailModal.operations },
                { label: 'Training', value: monthDetailModal.training },
                { label: 'Equipment', value: monthDetailModal.equipment },
              ];
              const _largest = _cats.reduce((a, b) => a.value > b.value ? a : b);
              const _smallest = _cats.reduce((a, b) => a.value < b.value ? a : b);
              const _biggestProblem = monthDetailModal.variance
                ? {
                    label: `Unplanned expense spike — ${fmt(monthDetailModal.variance.overtime + monthDetailModal.variance.hvac + monthDetailModal.variance.vehicles)} above budget`,
                    detail: `Emergency HVAC +${fmt(monthDetailModal.variance.hvac)}, overtime surge +${fmt(monthDetailModal.variance.overtime)}, unplanned vehicle repairs +${fmt(monthDetailModal.variance.vehicles)}.`,
                  }
                : {
                    label: `${_largest.label} — ${((_largest.value / monthDetailModal.spent) * 100).toFixed(0)}% of total spend`,
                    detail: `At ${fmt(_largest.value)}, this is the dominant cost category. Focused controls here have the highest ROI.`,
                  };
              const _biggestOpportunity = {
                label: `${_smallest.label} — most deferrable category at ${fmt(_smallest.value)}`,
                detail: `${_smallest.label} represents ${((_smallest.value / monthDetailModal.spent) * 100).toFixed(0)}% of spend and has the most scheduling flexibility. Consolidation could save 10–15%.`,
              };
              return (
                <>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-primary mb-1">{monthDetailModal.month} 2024 Detailed Breakdown</h3>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-secondary">
                        <span>Total Spent: <span className="font-bold text-primary">{fmt(monthDetailModal.spent)}</span> ({((monthDetailModal.spent / monthDetailModal.budget) * 100).toFixed(0)}% of target)</span>
                        {_delta !== null && (
                          <span className={`font-semibold ${_delta > 0 ? 'text-red-700 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>
                            {_delta > 0 ? '+' : ''}{_delta.toFixed(1)}% vs {_prev.month}
                          </span>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => setMonthDetailModal(null)}
                      className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800/50 rounded-lg transition-colors"
                    >
                      <X className="w-5 h-5 text-secondary" />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
                    <div className="p-3 bg-red-50 dark:bg-red-500/5 border border-red-200 dark:border-red-500/15 rounded-lg">
                      <p className="text-[10px] font-bold text-red-700 dark:text-red-400 uppercase tracking-wide mb-1">Biggest Problem</p>
                      <p className="text-[13px] font-semibold text-slate-800 dark:text-slate-200 mb-0.5">{_biggestProblem.label}</p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">{_biggestProblem.detail}</p>
                    </div>
                    <div className="p-3 bg-green-50 dark:bg-green-500/5 border border-green-200 dark:border-green-500/15 rounded-lg">
                      <p className="text-[10px] font-bold text-green-600 dark:text-green-400 uppercase tracking-wide mb-1">Biggest Opportunity</p>
                      <p className="text-[13px] font-semibold text-slate-800 dark:text-slate-200 mb-0.5">{_biggestOpportunity.label}</p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">{_biggestOpportunity.detail}</p>
                    </div>
                  </div>
                </>
              );
            })()}

            {/* Category Breakdown */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-primary mb-4">BY CATEGORY:</h4>
              <div className="space-y-6">
                {/* Personnel */}
                <div className="bg-white dark:bg-slate-800/40 rounded-xl p-4 border border-slate-700/50">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-blue-400" />
                      <span className="font-semibold text-primary">Personnel:</span>
                    </div>
                    <span className="text-lg font-bold text-blue-400">{fmt(monthDetailModal.personnel)} (78%)</span>
                  </div>
                  <div className="space-y-2 text-sm text-secondary pl-7">
                    <div className="flex justify-between">
                      <span>• Salaries:</span>
                      <span className="font-medium text-primary">{fmt(monthDetailModal.personnel * 0.875)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>• Overtime:</span>
                      <span className={`font-medium ${monthDetailModal.variance?.overtime ? 'text-amber-700 dark:text-amber-400' : 'text-primary'}`}>
                        {fmt(monthDetailModal.personnel * 0.10)}
                        {monthDetailModal.variance?.overtime && <span className="text-xs ml-1 inline-flex items-center gap-0.5">(↑ 25% vs prior month <AlertTriangle className="w-3 h-3" />)</span>}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>• Benefits:</span>
                      <span className="font-medium text-primary">{fmt(monthDetailModal.personnel * 0.025)}</span>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-700/30">
                    <p className="text-[11px] text-slate-600 dark:text-slate-400"><span className="font-semibold text-blue-600 dark:text-blue-400">Optimization:</span> Cap overtime at 8% of monthly personnel budget — saves ~$24K/month</p>
                  </div>
                </div>

                {/* Operations */}
                <div className="bg-white dark:bg-slate-800/40 rounded-xl p-4 border border-slate-700/50">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Wrench className="w-5 h-5 text-green-600 dark:text-green-400" />
                      <span className="font-semibold text-primary">Operations:</span>
                    </div>
                    <span className="text-lg font-bold text-green-600 dark:text-green-400">{fmt(monthDetailModal.operations)} (16%)</span>
                  </div>
                  <div className="space-y-2 text-sm text-secondary pl-7">
                    <div className="flex justify-between">
                      <span>• Vehicle fuel:</span>
                      <span className="font-medium text-primary">{fmt(monthDetailModal.operations * 0.35)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>• Equipment maintenance:</span>
                      <span className="font-medium text-primary">{fmt(monthDetailModal.operations * 0.23)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>• Utilities:</span>
                      <span className="font-medium text-primary">{fmt(monthDetailModal.operations * 0.18)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>• Supplies:</span>
                      <span className="font-medium text-primary">{fmt(monthDetailModal.operations * 0.24)}</span>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-700/30">
                    <p className="text-[11px] text-slate-600 dark:text-slate-400"><span className="font-semibold text-blue-600 dark:text-blue-400">Optimization:</span> Fleet route optimization could reduce fuel costs (35% of ops) by 10% — saves ~$18K/month</p>
                  </div>
                </div>

                {/* Training */}
                <div className="bg-white dark:bg-slate-800/40 rounded-xl p-4 border border-slate-700/50">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Target className="w-5 h-5 text-purple-400" />
                      <span className="font-semibold text-primary">Training:</span>
                    </div>
                    <span className="text-lg font-bold text-purple-400">{fmt(monthDetailModal.training)} (4%)</span>
                  </div>
                  <div className="space-y-2 text-sm text-secondary pl-7">
                    <div className="flex justify-between">
                      <span>• Firearms recertification:</span>
                      <span className="font-medium text-primary">{fmt(monthDetailModal.training * 0.30)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>• Tactical training:</span>
                      <span className="font-medium text-primary">{fmt(monthDetailModal.training * 0.43)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>• CPR/First Aid:</span>
                      <span className="font-medium text-primary">{fmt(monthDetailModal.training * 0.27)}</span>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-700/30">
                    <p className="text-[11px] text-slate-600 dark:text-slate-400"><span className="font-semibold text-blue-600 dark:text-blue-400">Optimization:</span> Consolidate tactical training to quarterly sessions — reduces facility costs by ~$8K/month</p>
                  </div>
                </div>

                {/* Equipment/Capital */}
                <div className="bg-white dark:bg-slate-800/40 rounded-xl p-4 border border-slate-700/50">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Package className="w-5 h-5 text-amber-700 dark:text-amber-400" />
                      <span className="font-semibold text-primary">Equipment/Capital:</span>
                    </div>
                    <span className="text-lg font-bold text-amber-700 dark:text-amber-400">{fmt(monthDetailModal.equipment)} (2%)</span>
                  </div>
                  <div className="space-y-2 text-sm text-secondary pl-7">
                    <div className="flex justify-between">
                      <span>• Body camera repairs:</span>
                      <span className="font-medium text-primary">{fmt(monthDetailModal.equipment * 0.60)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>• Computer upgrades:</span>
                      <span className="font-medium text-primary">{fmt(monthDetailModal.equipment * 0.40)}</span>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-700/30">
                    <p className="text-[11px] text-slate-600 dark:text-slate-400"><span className="font-semibold text-blue-600 dark:text-blue-400">Optimization:</span> Batch body camera repairs — reduces per-unit service cost by 15% (~$9K savings)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Why Over/Under Budget */}
            {monthDetailModal.variance && (
              <div className="mb-6 bg-red-500/10 border border-red-500/30 rounded-xl p-4">
                <h4 className="text-sm font-bold text-red-700 dark:text-red-400 mb-3">WHY OVER BUDGET:</h4>
                <div className="space-y-2 text-sm text-secondary">
                  <p>• Overtime spike due to 4th of July coverage (+{fmt(monthDetailModal.variance.overtime)})</p>
                  <p>• Emergency HVAC repair in jail (+{fmt(monthDetailModal.variance.hvac)})</p>
                  <p>• Unplanned vehicle repairs (+{fmt(monthDetailModal.variance.vehicles)})</p>
                </div>
                <div className="mt-4 pt-4 border-t border-red-500/20">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-secondary">VARIANCE:</span>
                    <span className="text-lg font-bold text-red-700 dark:text-red-400">+{fmt(monthDetailModal.spent - monthDetailModal.budget)} over monthly target</span>
                  </div>
                </div>
              </div>
            )}

            </div>
            <div className="sticky bottom-0 p-4 border-t border-border bg-white dark:bg-slate-900 flex items-center justify-end gap-2">
              <button className={secondaryBtn}>Compare to Previous</button>
              <button className={primaryBtn} onClick={handleExportPDF}><Download className="w-3.5 h-3.5" /> Export Report</button>
            </div>
          </div>
        </div>
      )}

      {/* Pending POs Modal */}
      {pendingPOsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setPendingPOsModal(false)} />
          <div className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/50 rounded-2xl max-w-2xl w-full shadow-2xl max-h-[90vh] flex flex-col overflow-hidden">
            <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-slate-200 dark:border-slate-700/30">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Pending Purchase Orders</h3>
                <p className="text-[12px] text-slate-500 dark:text-slate-400 mt-0.5">
                  {pendingPOs.length} orders · {fmt(pendingPOs.reduce((s, p) => s + p.amount, 0))} committed · Approve to move to Spent, Deny to return to Available
                </p>
              </div>
              <button onClick={() => setPendingPOsModal(false)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-700/20">
              {pendingPOs.length === 0 ? (
                <div className="px-6 py-12 text-center">
                  <CheckCircle className="w-10 h-10 text-green-500 mx-auto mb-3" />
                  <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">All purchase orders resolved</p>
                  <p className="text-xs text-slate-500 mt-1">Actions have been logged to the Decision Audit Log.</p>
                </div>
              ) : pendingPOs.map(po => (
                <div key={po.id} className="flex items-start gap-4 px-6 py-4 hover:bg-slate-50 dark:hover:bg-slate-800/10 transition-colors">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded flex-shrink-0 ${
                        po.priority === 'High' ? 'bg-red-100 dark:bg-red-500/10 text-red-700 dark:text-red-400' :
                        po.priority === 'Medium' ? 'bg-amber-100 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400' :
                        'bg-slate-100 dark:bg-slate-700/40 text-slate-500 dark:text-slate-400'
                      }`}>{po.priority}</span>
                      <span className="text-[13px] font-semibold text-slate-800 dark:text-slate-200 truncate">{po.vendor}</span>
                      <span className="text-[11px] text-slate-400 dark:text-slate-500 flex-shrink-0">{po.id}</span>
                    </div>
                    <p className="text-[12px] text-slate-600 dark:text-slate-400 mb-1">{po.description}</p>
                    <div className="flex items-center gap-3 text-[11px] text-slate-400 dark:text-slate-500">
                      <span>{po.division}</span>
                      <span>·</span>
                      <span>{po.category}</span>
                      <span>·</span>
                      <span>Submitted {po.submitted}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-[14px] font-bold text-slate-800 dark:text-slate-200 tabular-nums">{fmt(po.amount)}</span>
                    <button
                      onClick={() => approvePO(po)}
                      className="flex items-center gap-1 px-3 py-1.5 bg-green-100 dark:bg-green-500/10 hover:bg-green-200 dark:hover:bg-green-500/20 border border-green-300 dark:border-green-500/30 text-green-700 dark:text-green-400 text-xs font-bold rounded-lg transition-colors"
                    >
                      <CheckCircle className="w-3 h-3" /> Approve
                    </button>
                    <button
                      onClick={() => denyPO(po)}
                      className="flex items-center gap-1 px-3 py-1.5 bg-red-50 dark:bg-red-500/10 hover:bg-red-100 dark:hover:bg-red-500/20 border border-red-200 dark:border-red-500/30 text-red-700 dark:text-red-400 text-xs font-bold rounded-lg transition-colors"
                    >
                      <X className="w-3 h-3" /> Deny
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-700/30 bg-slate-50 dark:bg-slate-900/50 flex items-center justify-between">
              <span className="text-[11px] text-slate-500 dark:text-slate-400">
                {pendingPOs.length > 0
                  ? <>{pendingPOs.length} orders pending · <span className="font-semibold text-slate-700 dark:text-slate-300">{fmt(pendingPOs.reduce((s, p) => s + p.amount, 0))}</span> committed</>
                  : 'All orders resolved'}
              </span>
              <button onClick={() => setPendingPOsModal(false)} className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/40 text-slate-700 dark:text-slate-300 text-sm font-semibold rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast notification */}
      {toast && (
        <div
          key={toast.id}
          className="fixed bottom-24 right-6 z-50 flex items-center gap-3 px-4 py-3 bg-slate-900 dark:bg-slate-800 border border-green-500/30 rounded-xl shadow-2xl max-w-sm fade-in-up"
        >
          <div className="w-8 h-8 bg-green-500/15 rounded-lg flex items-center justify-center flex-shrink-0">
            <CheckCircle className="w-4 h-4 text-green-400" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[13px] font-semibold text-white leading-snug">{toast.message}</p>
          </div>
          <button onClick={() => setToast(null)} className="flex-shrink-0 p-1 hover:bg-slate-700 rounded transition-colors">
            <X className="w-3.5 h-3.5 text-slate-400" />
          </button>
        </div>
      )}

      {/* AI Chat Button */}
      <button
        onClick={() => setChatOpen(!chatOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110 z-40"
      >
        {chatOpen ? <X className="w-6 h-6 text-primary" /> : <MessageCircle className="w-6 h-6 text-primary" />}
      </button>

      {/* AI Chat Panel */}
      {chatOpen && (
        <div className="fixed bottom-24 right-6 w-full max-w-96 h-[500px] bg-surface-raised backdrop-blur-xl border border-border rounded-2xl shadow-2xl flex flex-col z-40 mx-4 sm:mx-0">
          <div className="p-4 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-primary">Budget AI Assistant</h3>
                <p className="text-xs text-green-600 dark:text-green-400">Online</p>
              </div>
            </div>
          </div>
          <div className="flex-1 p-4 overflow-y-auto">
            <div className="flex gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1">
                <div className="bg-white dark:bg-slate-800/60 p-3 rounded-xl">
                  <p className="text-sm text-slate-700 dark:text-slate-200">Hi! I can help you analyze budget trends, forecast spending, identify cost savings, compare divisions, and answer questions about fiscal management. What would you like to know?</p>
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 border-t border-border">
            <div className="flex items-center gap-2">
              <input type="text" placeholder="Ask about budget..." className="flex-1 px-4 py-2 bg-white dark:bg-slate-800/40 border border-border rounded-xl text-primary placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500/50" />
              <button className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
                <Send className="w-5 h-5 text-primary" />
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

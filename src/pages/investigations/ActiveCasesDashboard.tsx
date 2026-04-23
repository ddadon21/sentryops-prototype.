import { useState, useEffect } from 'react';
import {
  Search, Filter, X, Plus, Users, Scale,
  FlaskConical, BarChart3, Clock,
  CheckCircle, Link2, ChevronDown, ChevronUp,
  Activity, Phone, Mail, FileText,
  Database, FileWarning, Microscope, Circle,
  AlertTriangle, Zap, TrendingUp, TrendingDown, ArrowRight,
  UserCheck, Eye, ArrowUpRight, ShieldAlert
} from 'lucide-react';
import DashboardLayout from '../../layouts/DashboardLayout';

interface Case {
  id: string;
  caseNumber: string;
  type: 'Homicide' | 'Robbery' | 'Narcotics' | 'Burglary' | 'Assault' | 'Fraud' | 'Sexual Assault';
  title: string;
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  status: 'Active Investigation' | 'Pending Warrant' | 'Awaiting Lab Results' | 'Court Pending' | 'Closed';
  leadDetective: string;
  badge: string;
  assignedTo: string[];
  openedDate: string;
  daysOpen: number;
  location: string;
  suspects: number;
  evidence: number;
  witnesses: number;
  nextAction: string;
  deadline?: string;
  multiAgency?: boolean;
  notes: string;
  criticalReason?: string;
}

interface CommandAction {
  id: string;
  urgency: 'Critical' | 'High' | 'Normal';
  state: 'Pending' | 'In Progress' | 'Completed' | 'Escalated';
  decision: string;
  ifIgnored: string;
  timeSensitivity: string;
  countdown?: string;
  immediateImpact: string;
  shortTermOutcome: string;
  result: string;
  rationale: string;
  actionLabel: 'Approve' | 'Assign' | 'Escalate';
}

interface DetectiveLoad {
  name: string;
  badge: string;
  openCases: number;
  criticalCases: number;
  clearanceRate: number;
  utilization: number;
  risk: 'High' | 'Moderate' | 'Low';
  bottleneck?: string;
  recommendation?: string;
}

const ActiveCasesDashboard = () => {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedPriority, setSelectedPriority] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [insightsExpanded, setInsightsExpanded] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [showConnections, setShowConnections] = useState(false);
  const [showWorkload, setShowWorkload] = useState(false);
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);
  const [urgencySeconds, setUrgencySeconds] = useState(5 * 3600 + 47 * 60 + 22); // 5h 47m countdown

  useEffect(() => {
    const t = setInterval(() => setUrgencySeconds(s => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, []);

  const fmtCountdown = (s: number) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    return `${h}h ${String(m).padStart(2,'0')}m ${String(sec).padStart(2,'0')}s`;
  };

  const cases: Case[] = [
    {
      id: 'INV-2024-0847',
      caseNumber: '2024-0847',
      type: 'Homicide',
      title: 'Shooting Death - Pleasant Hill Road',
      priority: 'Critical',
      status: 'Active Investigation',
      leadDetective: 'Det. Rodriguez, Maria',
      badge: 'I-5234',
      assignedTo: ['Det. Rodriguez', 'Det. Williams', 'Det. Chen'],
      openedDate: '2024-11-28',
      daysOpen: 7,
      location: '4200 Pleasant Hill Rd, Duluth',
      suspects: 2,
      evidence: 47,
      witnesses: 8,
      nextAction: 'Ballistics results expected 12/08',
      deadline: '2024-12-15',
      criticalReason: 'Charge window closes in 14 hrs — ballistics overdue',
      notes: 'Gang-related shooting. 2 suspects identified via surveillance. Witnesses cooperating. Ballistics analysis in progress at GBI lab.'
    },
    {
      id: 'INV-2024-0923',
      caseNumber: '2024-0923',
      type: 'Homicide',
      title: 'Cold Case Review - 2019 Unsolved',
      priority: 'Medium',
      status: 'Active Investigation',
      leadDetective: 'Det. Anderson, Kevin',
      badge: 'I-4892',
      assignedTo: ['Det. Anderson', 'Det. Taylor'],
      openedDate: '2024-10-15',
      daysOpen: 51,
      location: '2800 Lawrenceville Hwy, Lawrenceville',
      suspects: 1,
      evidence: 23,
      witnesses: 4,
      nextAction: 'DNA re-analysis with new technology',
      criticalReason: 'New DNA tech — time-sensitive re-test window before evidence degrades',
      notes: 'Cold case reopened due to new DNA technology. Original evidence being re-tested. One person of interest identified.'
    },
    {
      id: 'INV-2024-1234',
      caseNumber: '2024-1234',
      type: 'Narcotics',
      title: 'DEA Task Force - Fentanyl Distribution Ring',
      priority: 'Critical',
      status: 'Active Investigation',
      leadDetective: 'Lt. Anderson, James',
      badge: 'I-3456',
      assignedTo: ['Lt. Anderson', 'Det. Martinez', 'Det. Johnson', 'DEA SA Wilson'],
      openedDate: '2024-09-12',
      daysOpen: 84,
      location: 'Multi-County Operation',
      suspects: 8,
      evidence: 156,
      witnesses: 12,
      nextAction: 'Surveillance extension requested - 30 days',
      deadline: '2024-12-20',
      multiAgency: true,
      criticalReason: 'Surveillance authorization expires EOD — Sheriff approval required',
      notes: 'Multi-agency DEA task force. Identified major fentanyl distribution network. 30-day surveillance extension pending command approval. Estimated OT: $12K.'
    },
    {
      id: 'INV-2024-1456',
      caseNumber: '2024-1456',
      type: 'Narcotics',
      title: 'Methamphetamine Lab - Residential',
      priority: 'High',
      status: 'Pending Warrant',
      leadDetective: 'Det. Davis, Robert',
      badge: 'I-2987',
      assignedTo: ['Det. Davis', 'Det. Garcia'],
      openedDate: '2024-11-20',
      daysOpen: 15,
      location: '1500 Block Buford Dr, Buford',
      suspects: 3,
      evidence: 34,
      witnesses: 6,
      nextAction: 'Search warrant hearing 12/06',
      deadline: '2024-12-06',
      criticalReason: 'Warrant hearing tomorrow — HAZMAT confirmation still pending',
      notes: 'Suspected meth lab in residential neighborhood. Search warrant drafted. Hearing scheduled for 12/06. HAZMAT on standby.'
    },
    {
      id: 'INV-2024-1567',
      caseNumber: '2024-1567',
      type: 'Robbery',
      title: 'Armed Robbery - Gas Station',
      priority: 'High',
      status: 'Active Investigation',
      leadDetective: 'Det. Wilson, Amanda',
      badge: 'I-4521',
      assignedTo: ['Det. Wilson', 'Det. Brown'],
      openedDate: '2024-12-01',
      daysOpen: 4,
      location: '3400 Lawrenceville Hwy, Tucker',
      suspects: 2,
      evidence: 12,
      witnesses: 3,
      nextAction: 'Surveillance review & suspect identification',
      criticalReason: 'Strong surveillance footage — ID window narrowing as suspects may relocate',
      notes: '2 armed suspects. $2,400 cash taken. Excellent video surveillance. Suspects wore masks but distinctive clothing visible.'
    },
    {
      id: 'INV-2024-1489',
      caseNumber: '2024-1489',
      type: 'Robbery',
      title: 'Pharmacy Robbery Series (3 incidents)',
      priority: 'Critical',
      status: 'Active Investigation',
      leadDetective: 'Det. Patel, Rajesh',
      badge: 'I-3729',
      assignedTo: ['Det. Patel', 'Det. Thompson', 'Det. Clark'],
      openedDate: '2024-11-15',
      daysOpen: 20,
      location: 'Multiple Locations',
      suspects: 2,
      evidence: 28,
      witnesses: 9,
      nextAction: 'Pattern analysis & surveillance of target pharmacies',
      deadline: '2024-12-10',
      criticalReason: 'Escalating series — 4th incident likely within 72 hrs based on pattern',
      notes: '3 pharmacy robberies - same MO. Targeting opioid pain medications. Suspects believed to be same 2 individuals. Surveillance on potential targets.'
    },
    {
      id: 'INV-2024-1678',
      caseNumber: '2024-1678',
      type: 'Sexual Assault',
      title: 'Aggravated Sexual Battery',
      priority: 'Critical',
      status: 'Awaiting Lab Results',
      leadDetective: 'Det. Taylor, Sarah',
      badge: 'I-4167',
      assignedTo: ['Det. Taylor (SVU)', 'Det. Lee (SVU)'],
      openedDate: '2024-11-25',
      daysOpen: 10,
      location: '2100 Block Pleasant Hill Rd, Duluth',
      suspects: 1,
      evidence: 19,
      witnesses: 4,
      nextAction: 'DNA results expected 12/12',
      deadline: '2024-12-12',
      criticalReason: 'Suspect known to victim — ongoing safety risk until arrest',
      notes: 'Sexual assault case. Suspect known to victim. SANE exam completed. DNA submitted to GBI lab. Warrant ready pending lab confirmation.'
    },
    {
      id: 'INV-2024-1712',
      caseNumber: '2024-1712',
      type: 'Burglary',
      title: 'Commercial Burglary - Electronics Store',
      priority: 'Medium',
      status: 'Active Investigation',
      leadDetective: 'Det. Johnson, Marcus',
      badge: 'I-2845',
      assignedTo: ['Det. Johnson', 'Det. Nguyen'],
      openedDate: '2024-11-30',
      daysOpen: 5,
      location: '5600 Peachtree Pkwy, Norcross',
      suspects: 4,
      evidence: 15,
      witnesses: 2,
      nextAction: 'Pawn shop monitoring for stolen items',
      criticalReason: 'Sophisticated entry method — repeat target risk at other electronics retailers',
      notes: '$45K in electronics stolen. Cut through roof access. Sophisticated operation. Monitoring pawn shops and online marketplaces.'
    },
    {
      id: 'INV-2024-1823',
      caseNumber: '2024-1823',
      type: 'Fraud',
      title: 'Identity Theft Ring - 47 Victims',
      priority: 'High',
      status: 'Active Investigation',
      leadDetective: 'Det. Chen, Wei',
      badge: 'I-3892',
      assignedTo: ['Det. Chen', 'Det. Garcia', 'FBI SA Martinez'],
      openedDate: '2024-10-22',
      daysOpen: 44,
      location: 'Countywide',
      suspects: 5,
      evidence: 89,
      witnesses: 47,
      nextAction: 'Federal charges being prepared',
      multiAgency: true,
      criticalReason: 'Federal charges pending — FBI coordination window time-sensitive',
      notes: 'Large-scale identity theft operation. 47 victims identified. $380K in fraudulent charges. Working with FBI. Federal charges pending.'
    },
    {
      id: 'INV-2024-1934',
      caseNumber: '2024-1934',
      type: 'Assault',
      title: 'Aggravated Assault - Domestic Violence',
      priority: 'High',
      status: 'Pending Warrant',
      leadDetective: 'Det. Martinez, Carlos',
      badge: 'I-4678',
      assignedTo: ['Det. Martinez'],
      openedDate: '2024-12-03',
      daysOpen: 2,
      location: '1200 Block Harbins Rd, Dacula',
      suspects: 1,
      evidence: 8,
      witnesses: 3,
      nextAction: 'Warrant execution planned 12/06',
      deadline: '2024-12-06',
      criticalReason: 'Victim hospitalized — suspect at large, escalation risk',
      notes: 'Domestic violence - severe injuries. Victim hospitalized. Suspect fled scene. Warrant approved. Execution planned for 12/06 AM.'
    }
  ];

  const filteredCases = cases.filter(c => {
    const matchesType = selectedType === 'all' || c.type === selectedType;
    const matchesPriority = selectedPriority === 'all' || c.priority === selectedPriority;
    const matchesSearch =
      c.caseNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.leadDetective.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesPriority && matchesSearch;
  });

  const stats = {
    total: cases.length,
    critical: cases.filter(c => c.priority === 'Critical').length,
    homicide: cases.filter(c => c.type === 'Homicide').length,
    robbery: cases.filter(c => c.type === 'Robbery').length,
    narcotics: cases.filter(c => c.type === 'Narcotics').length,
    multiAgency: cases.filter(c => c.multiAgency).length
  };

  const commandActions: CommandAction[] = [
    {
      id: 'cmd-1',
      urgency: 'Critical',
      state: 'Escalated',
      decision: 'Escalate GBI lab for Homicide #2024-0847 before charge window closes.',
      ifIgnored: 'If ignored, suspect release risk increases and prosecution may fail.',
      timeSensitivity: 'Deadline: Today 14:00',
      countdown: '5h 42m remaining',
      immediateImpact: 'GBI prioritizes ballistic queue and command is notified.',
      shortTermOutcome: 'Charging packet is filed within the legal window.',
      result: 'Homicide prosecution path remains viable.',
      rationale: 'Based on legal timing window and overdue forensic dependency.',
      actionLabel: 'Escalate'
    },
    {
      id: 'cmd-2',
      urgency: 'Critical',
      state: 'Pending',
      decision: 'Approve DEA Task Force #2024-1234 surveillance extension.',
      ifIgnored: 'If ignored, operation stops tonight and fentanyl targets disperse.',
      timeSensitivity: 'Deadline: End of day',
      countdown: '8h 11m remaining',
      immediateImpact: 'Surveillance authority remains active through next cycle.',
      shortTermOutcome: 'Task force keeps controlled tracking on all eight targets.',
      result: 'Arrest phase can proceed without restarting intelligence collection.',
      rationale: 'Based on expiring legal authorization and active DEA dependency.',
      actionLabel: 'Approve'
    },
    {
      id: 'cmd-3',
      urgency: 'High',
      state: 'In Progress',
      decision: 'Assign 2 detectives to Robbery Series #2024-1489 task force.',
      ifIgnored: 'If ignored, a fourth robbery is likely within 72 hours.',
      timeSensitivity: 'Target: next shift briefing',
      immediateImpact: 'Coverage expands to target pharmacies and hot zones.',
      shortTermOutcome: 'Pattern disruption likely before next predicted event window.',
      result: 'Robbery trend pressure decreases and victim risk drops.',
      rationale: 'Based on recent robbery pattern increase and repeat MO detection.',
      actionLabel: 'Assign'
    },
    {
      id: 'cmd-4',
      urgency: 'Normal',
      state: 'Pending',
      decision: 'Approve witness relocation support for Sexual Assault #2024-1678.',
      ifIgnored: 'If ignored, victim cooperation and safety posture may degrade.',
      timeSensitivity: 'Decision needed within 24h',
      immediateImpact: 'Victim protection resources are activated immediately.',
      shortTermOutcome: 'Interview continuity and testimony reliability improve.',
      result: 'Case momentum and victim safety confidence both increase.',
      rationale: 'Based on current victim risk profile and interview dependency.',
      actionLabel: 'Approve'
    }
  ];

  const detectiveLoad: DetectiveLoad[] = [
    { name: 'Det. Rodriguez, Maria', badge: 'I-5234', openCases: 3, criticalCases: 1, clearanceRate: 85, utilization: 96, risk: 'High', bottleneck: 'Critical homicide + burglary overlap', recommendation: 'Reassign burglary #2024-1712 immediately.' },
    { name: 'Det. Anderson / Lt. Anderson', badge: 'I-4892 / I-3456', openCases: 2, criticalCases: 1, clearanceRate: 72, utilization: 78, risk: 'Moderate', bottleneck: 'DEA extension approval dependency', recommendation: 'Approve extension to prevent investigative stall.' },
    { name: 'Det. Wilson, Amanda', badge: 'I-4521', openCases: 1, criticalCases: 0, clearanceRate: 80, utilization: 42, risk: 'Low', recommendation: 'Best reassignment candidate for burglary support.' }
  ];

  const getPriorityDot = (priority: string) => {
    switch (priority) {
      case 'Critical': return 'bg-red-500';
      case 'High': return 'bg-amber-500';
      case 'Medium': return 'bg-slate-400';
      case 'Low': return 'bg-slate-600';
      default: return 'bg-slate-600';
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'Critical': return 'bg-red-100 border-red-200 text-red-700 dark:bg-red-500/10 dark:border-red-500/20 dark:text-red-400';
      case 'High': return 'bg-amber-100 border-amber-200 text-amber-700 dark:bg-amber-500/10 dark:border-amber-500/20 dark:text-amber-400';
      case 'Medium': return 'bg-slate-500/10 border-slate-500/20 text-slate-500 dark:text-slate-400';
      case 'Low': return 'bg-blue-500/10 border-blue-500/20 text-blue-400';
      default: return 'bg-slate-500/10 border-slate-500/20 text-slate-500 dark:text-slate-400';
    }
  };

  const getUrgencyStyles = (urgency: CommandAction['urgency']) => {
    switch (urgency) {
      case 'Critical':
        return 'bg-red-100 dark:bg-red-500/10 text-red-700 dark:text-red-300 border-red-200 dark:border-red-500/30';
      case 'High':
        return 'bg-amber-100 dark:bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-500/30';
      default:
        return 'bg-blue-100 dark:bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-500/30';
    }
  };

  const getActionAccent = (urgency: CommandAction['urgency']) => {
    switch (urgency) {
      case 'Critical':
        return 'border-l-red-500';
      case 'High':
        return 'border-l-amber-500';
      default:
        return 'border-l-blue-500';
    }
  };

  const getStateStyles = (state: CommandAction['state']) => {
    switch (state) {
      case 'Escalated':
        return 'bg-red-100 dark:bg-red-500/10 text-red-700 dark:text-red-300 border-red-200 dark:border-red-500/30';
      case 'In Progress':
        return 'bg-blue-100 dark:bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-500/30';
      case 'Completed':
        return 'bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-500/30';
      default:
        return 'bg-amber-100 dark:bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-500/30';
    }
  };

  const getCaseState = (c: Case): CommandAction['state'] => {
    if (c.status === 'Closed') return 'Completed';
    if (c.priority === 'Critical' || c.status === 'Pending Warrant') return 'Escalated';
    if (c.status === 'Active Investigation') return 'In Progress';
    return 'Pending';
  };

  const getRiskStyles = (risk: DetectiveLoad['risk']) => {
    switch (risk) {
      case 'High':
        return 'bg-red-100 dark:bg-red-500/10 text-red-700 dark:text-red-300 border-red-200 dark:border-red-500/30';
      case 'Moderate':
        return 'bg-amber-100 dark:bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-500/30';
      default:
        return 'bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-500/30';
    }
  };

  return (
    <DashboardLayout>
      <div className="p-5 lg:p-8 space-y-8 bg-slate-100 dark:bg-transparent min-h-full">

        {/* Page Header — matches Command */}
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-1">Criminal Investigations</h2>
          <div className="flex items-center gap-2 text-[11px] text-slate-500">
            <span>{stats.total} active cases</span>
            <span>·</span>
            <span>{stats.critical} critical</span>
            <span>·</span>
            <span>75% clearance YTD</span>
            <span>·</span>
            <span>Updated 2 minutes ago</span>
            <span>·</span>
            <span>Data confidence: High</span>
          </div>
        </div>

        {/* Command Actions */}
        <div className="bg-white dark:bg-slate-800/25 border border-slate-200 dark:border-slate-700/30 rounded-xl shadow-sm dark:shadow-none overflow-hidden">
          <div className="flex items-center justify-between gap-3 px-5 py-3 border-b border-slate-200 dark:border-slate-700/30">
            <div className="flex items-center gap-3">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-widest">Command Actions — Immediate Decisions Required</span>
            </div>
            <span className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-700/30 border border-slate-200 dark:border-slate-600/30 text-[11px] font-bold text-slate-800 dark:text-slate-200">
              {commandActions.filter(a => a.urgency === 'Critical').length} Critical Decisions
            </span>
          </div>
          <div className="p-4 space-y-3.5">
            {commandActions.map((action) => (
              <div
                key={action.id}
                className={`rounded-lg border border-slate-200 dark:border-slate-700/30 border-l-[3px] ${getActionAccent(action.urgency)} bg-slate-50 dark:bg-slate-900/30 p-4`}
              >
                <div className="flex items-start gap-4">
                  <div className="flex flex-col gap-2 items-start">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded border text-[10px] font-bold uppercase tracking-wide ${getUrgencyStyles(action.urgency)}`}>
                      {action.urgency}
                    </span>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded border text-[10px] font-semibold uppercase tracking-wide ${getStateStyles(action.state)}`}>
                      {action.state}
                    </span>
                    {action.countdown && (
                      <span className="px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-700/40 text-slate-700 dark:text-slate-200 text-[10px] font-semibold tracking-wide">
                        {action.countdown}
                      </span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0 space-y-2">
                    <p className="text-[14px] text-slate-900 dark:text-slate-100 font-bold leading-5">
                      Decision required: {action.decision}
                    </p>
                    <p className="text-[12px] text-slate-800 dark:text-slate-200 font-medium">
                      At risk if ignored: {action.ifIgnored}
                    </p>
                    <p className="text-[12px] text-slate-700 dark:text-slate-300 font-semibold">
                      {action.timeSensitivity}
                    </p>
                    <p className="text-[11px] text-slate-600 dark:text-slate-300">
                      AI reasoning: {action.rationale}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-[10px]">
                      <div>
                        <p className="font-semibold text-slate-700 dark:text-slate-200 uppercase tracking-wide">Immediate Impact</p>
                        <p className="text-slate-600 dark:text-slate-300">{action.immediateImpact}</p>
                      </div>
                      <div>
                        <p className="font-semibold text-slate-700 dark:text-slate-200 uppercase tracking-wide">Short-Term Outcome</p>
                        <p className="text-slate-600 dark:text-slate-300">{action.shortTermOutcome}</p>
                      </div>
                      <div>
                        <p className="font-semibold text-slate-700 dark:text-slate-200 uppercase tracking-wide">Result</p>
                        <p className="text-slate-600 dark:text-slate-300">{action.result}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button className={`px-3 py-1.5 border rounded text-[12px] font-bold transition-all ${
                      action.urgency === 'Critical'
                        ? 'bg-red-600 border-red-700 text-white hover:bg-red-700'
                        : action.urgency === 'High'
                        ? 'bg-amber-600 border-amber-700 text-white hover:bg-amber-700'
                        : 'bg-blue-600 border-blue-700 text-white hover:bg-blue-700'
                    }`}>
                      {action.actionLabel}
                    </button>
                    <button className="px-3 py-1.5 bg-transparent border border-slate-300 dark:border-slate-600/50 text-slate-700 dark:text-slate-200 rounded text-[12px] font-semibold hover:bg-slate-100 dark:hover:bg-slate-700/40 transition-all">
                      View
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Executive Snapshot Row — matches Command metric cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white dark:bg-slate-800/25 border border-slate-200 dark:border-slate-200 dark:border-slate-700/30 rounded-xl shadow-sm dark:shadow-none p-5 text-left hover:border-slate-600/40 transition-colors">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-slate-500 font-medium">Active Cases</span>
              <Circle className="w-2 h-2 fill-slate-400 text-slate-500 dark:text-slate-400" />
            </div>
            <p className="text-3xl font-bold text-slate-900 dark:text-white mb-1">{stats.total}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Major felony investigations</p>
            <p className="text-[11px] text-emerald-700 dark:text-emerald-400">-2 from last month</p>
          </div>

          <div className="bg-white dark:bg-slate-800/25 border border-slate-200 dark:border-slate-200 dark:border-slate-700/30 rounded-xl shadow-sm dark:shadow-none p-5 text-left hover:border-slate-600/40 transition-colors">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-slate-500 font-medium">Critical Cases</span>
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
              </span>
            </div>
            <p className="text-3xl font-extrabold text-slate-900 dark:text-white mb-1">{stats.critical}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Immediate attention required</p>
            <p className="text-[11px] text-red-700 dark:text-red-400">All require command action today</p>
          </div>

          <div className="bg-white dark:bg-slate-800/25 border border-slate-200 dark:border-slate-200 dark:border-slate-700/30 rounded-xl shadow-sm dark:shadow-none p-5 text-left">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-slate-500 font-medium">Clearance Rate (YTD)</span>
              <Circle className="w-2 h-2 fill-emerald-500 text-emerald-500" />
            </div>
            <p className="text-3xl font-bold text-slate-900 dark:text-white mb-1">75%</p>
            <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400 mb-1">
              <span>65 of 87 cases</span>
              <span className="text-slate-700">·</span>
              <span>+3% vs 2023</span>
            </div>
            <p className="text-[11px] text-emerald-700 dark:text-emerald-400">Meeting 75% target</p>
          </div>

          <div className="bg-white dark:bg-slate-800/25 border border-slate-200 dark:border-slate-200 dark:border-slate-700/30 rounded-xl shadow-sm dark:shadow-none p-5 text-left hover:border-slate-600/40 transition-colors">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-slate-500 font-medium">Multi-Agency Ops</span>
              <Circle className="w-2 h-2 fill-blue-500 text-blue-500" />
            </div>
            <p className="text-3xl font-bold text-slate-900 dark:text-white mb-1">{stats.multiAgency}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">FBI & DEA active</p>
            <p className="text-[11px] text-amber-700 dark:text-amber-400">Federal charges pending: 2</p>
          </div>
        </div>

        {/* Intelligence Summary — collapsible, matches Command pattern */}
        <div className="bg-white dark:bg-slate-800/25 border border-slate-200 dark:border-slate-200 dark:border-slate-700/30 rounded-xl shadow-sm dark:shadow-none border-l-2 border-l-slate-600/40">
          <button
            onClick={() => setInsightsExpanded(!insightsExpanded)}
            className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-slate-50 dark:hover:bg-slate-50 dark:hover:bg-slate-800/10 transition-colors rounded-xl"
          >
            <div className="flex items-center gap-3">
              <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300">Criminal Investigations Intelligence</h3>
              <span className="px-1.5 py-0.5 bg-slate-200 dark:bg-slate-700/30 text-[11px] text-slate-500 rounded">3 Alerts</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="hidden sm:inline text-[10px] text-slate-700">AI-assisted synthesis · Updated 7:28 PM</span>
              {insightsExpanded ? <ChevronUp className="w-4 h-4 text-slate-700" /> : <ChevronDown className="w-4 h-4 text-slate-700" />}
            </div>
          </button>

          {insightsExpanded && (
            <div className="px-5 pb-5 space-y-4 border-t border-slate-200 dark:border-slate-200 dark:border-slate-700/20 pt-4">
              {/* Critical */}
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 flex-shrink-0"></div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-red-700 dark:text-red-400">Homicide #2024-0847 — Ballistics OVERDUE</p>
                  <ul className="space-y-0.5 text-[13px] text-slate-700 dark:text-slate-300">
                    <li>GBI Lab results due today — not received</li>
                    <li>Must charge within 72 hrs (tomorrow 1400)</li>
                    <li>Lead: Det. Rodriguez | Badge #I-5234</li>
                  </ul>
                  <p className="text-[10px] text-slate-500 pt-0.5">GBI Lab · Case file #2024-0847</p>
                </div>
              </div>

              {/* DEA */}
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 flex-shrink-0"></div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-red-700 dark:text-red-400">DEA Task Force — Approval Required by EOD</p>
                  <ul className="space-y-0.5 text-[13px] text-slate-700 dark:text-slate-300">
                    <li>30-day surveillance extension expires today</li>
                    <li>Sheriff approval required for continuation</li>
                    <li>Cost: $12K (DEA funded)</li>
                  </ul>
                  <p className="text-[10px] text-slate-500 pt-0.5">Case #2024-1234 · Fentanyl distribution network</p>
                </div>
              </div>

              {/* Trends */}
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 flex-shrink-0"></div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-amber-700 dark:text-amber-400">Armed Robberies +15% — Trend Alert</p>
                  <ul className="space-y-0.5 text-[13px] text-slate-700 dark:text-slate-300">
                    <li>Dec 2024: 23 incidents (vs 20 Nov)</li>
                    <li>Pharmacy series (3 incidents) — same MO confirmed</li>
                    <li>Recommendation: Robbery task force formation</li>
                  </ul>
                  <p className="text-[10px] text-slate-500 pt-0.5">Crime analytics · Patrol incident reports</p>
                </div>
              </div>

              <div className="pt-2 text-[10px] text-slate-700">
                Analysis based on {stats.total} active cases · 75% clearance rate YTD
              </div>
            </div>
          )}
        </div>

        {/* Case Type Breakdown — matches Command division cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white dark:bg-slate-800/25 border border-slate-200 dark:border-slate-200 dark:border-slate-700/30 rounded-xl shadow-sm dark:shadow-none p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-red-700/60 rounded-full"></div>
                <span className="text-xs text-slate-500 uppercase tracking-wide font-medium">Homicide</span>
              </div>
            </div>
            <p className="text-2xl font-semibold text-slate-900 dark:text-white mb-3">{stats.homicide}</p>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">Clearance YTD</span>
                <span className="text-slate-700 dark:text-slate-300">100% (8/8)</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">Priority</span>
                <span className="text-slate-700 dark:text-slate-300">1 critical, 1 medium</span>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800/25 border border-slate-200 dark:border-slate-200 dark:border-slate-700/30 rounded-xl shadow-sm dark:shadow-none p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-amber-600/50 rounded-full"></div>
                <span className="text-xs text-slate-500 uppercase tracking-wide font-medium">Robbery</span>
              </div>
            </div>
            <p className="text-2xl font-semibold text-slate-900 dark:text-white mb-3">{stats.robbery}</p>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">Clearance YTD</span>
                <span className="text-slate-700 dark:text-slate-300">68% (17/25)</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">Priority</span>
                <span className="text-slate-700 dark:text-slate-300">1 critical series, 1 high</span>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800/25 border border-slate-200 dark:border-slate-200 dark:border-slate-700/30 rounded-xl shadow-sm dark:shadow-none p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-slate-500/50 rounded-full"></div>
                <span className="text-xs text-slate-500 uppercase tracking-wide font-medium">Narcotics</span>
              </div>
            </div>
            <p className="text-2xl font-semibold text-slate-900 dark:text-white mb-3">{stats.narcotics}</p>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">Clearance YTD</span>
                <span className="text-slate-700 dark:text-slate-300">89% (8/9)</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">Active Ops</span>
                <span className="text-slate-700 dark:text-slate-300">1 DEA task force, 1 warrant</span>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800/25 border border-slate-200 dark:border-slate-200 dark:border-slate-700/30 rounded-xl shadow-sm dark:shadow-none p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-slate-500/50 rounded-full"></div>
                <span className="text-xs text-slate-500 uppercase tracking-wide font-medium">Other</span>
              </div>
            </div>
            <p className="text-2xl font-semibold text-slate-900 dark:text-white mb-3">4</p>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">Sexual Assault</span>
                <span className="text-slate-700 dark:text-slate-300">1 (critical)</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">Fraud / Assault / Burglary</span>
                <span className="text-slate-700 dark:text-slate-300">3</span>
              </div>
            </div>
          </div>
        </div>

        {/* Clearance Rate Detail — matches Command compliance section */}
        <div className="bg-white dark:bg-slate-800/25 border border-slate-200 dark:border-slate-200 dark:border-slate-700/30 rounded-xl shadow-sm dark:shadow-none p-5">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-[13px] font-semibold text-slate-900 dark:text-white uppercase tracking-wide">Clearance Rates by Type</h3>
            <span className="text-[11px] text-slate-500">YTD 2024 — National avg: 62%</span>
          </div>
          <div className="space-y-4">
            {[
              { type: 'Homicide', cleared: 8, total: 8, percentage: 100, status: 'on-track', confidence: 99, recommendation: 'Maintain current detective coverage. Cold case review ongoing — low risk.', immediate: 'No action needed.', downstream: 'Cold case DNA result expected within 2 weeks.', outcome: 'Rate holds at 100% — strongest in department.', action: null },
              { type: 'Narcotics', cleared: 8, total: 9, percentage: 89, status: 'on-track', confidence: 91, recommendation: 'Approve DEA task force extension by EOD to sustain rate.', immediate: 'Task force operation continues uninterrupted.', downstream: 'Arrest phase reached within 30 days.', outcome: 'Rate holds at 89%. 8 suspects prosecuted.', action: 'Approve Extension' },
              { type: 'Sexual Assault', cleared: 5, total: 6, percentage: 83, status: 'on-track', confidence: 85, recommendation: 'Expedite GBI lab for #2024-1678. Warrant ready pending DNA confirmation.', immediate: 'Lab prioritization request filed.', downstream: 'DNA result by Dec 12 enables same-week arrest.', outcome: 'Rate reaches 100% (6/6). Victim safety secured.', action: 'Escalate Lab' },
              { type: 'Robbery', cleared: 17, total: 25, percentage: 68, status: 'below-target', confidence: 78, recommendation: 'Form robbery task force. Pharmacy series is highest-leverage case to clear.', immediate: 'Task force authorized, Patel + 2 detectives assigned.', downstream: '4th pharmacy incident deterred. Arrest within 14 days.', outcome: 'Rate rises to ~72%. Closes 7-point gap to target.', action: 'Form Task Force' },
              { type: 'Burglary', cleared: 13, total: 21, percentage: 62, status: 'below-target', confidence: 74, recommendation: 'Assign Det. Wilson (available) to electronics store case #2024-1712.', immediate: 'Wilson assigned. Rodriguez workload reduced.', downstream: 'Electronics case closes within 3 weeks via pawn monitoring.', outcome: 'Rate rises to ~67%. Two moves from annual target.', action: 'Auto Assign' }
            ].map((cat, idx) => (
              <div key={idx} className={`rounded-lg p-3.5 ${cat.status === 'below-target' ? 'bg-amber-500/5 border border-amber-500/10' : 'bg-slate-50 dark:bg-slate-800/20 border border-slate-200 dark:border-slate-200 dark:border-slate-700/20'}`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2.5">
                    <span className="text-sm text-slate-700 dark:text-slate-300 font-medium">{cat.type}</span>
                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-semibold uppercase ${cat.status === 'on-track' ? 'bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400' : 'bg-amber-100 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400'}`}>
                      {cat.status === 'on-track' ? 'On Track' : 'Below Target'}
                    </span>
                    <span className="text-[10px] text-slate-700">{cat.confidence}% confidence</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className="text-xs text-slate-500 dark:text-slate-400">{cat.cleared}/{cat.total}</span>
                    <span className={`text-sm font-semibold ${cat.percentage >= 75 ? 'text-emerald-700 dark:text-emerald-400' : 'text-amber-700 dark:text-amber-400'}`}>{cat.percentage}%</span>
                  </div>
                </div>
                <div className="relative w-full h-1 bg-slate-200 dark:bg-slate-800/50 rounded-full overflow-visible mb-2.5">
                  <div className={`h-full rounded-full ${cat.percentage >= 75 ? 'bg-emerald-500 dark:bg-emerald-500/40' : 'bg-amber-500 dark:bg-amber-500/40'}`} style={{ width: `${cat.percentage}%` }} />
                  <div className="absolute top-[-3px] w-[1.5px] h-[calc(100%+6px)] bg-red-500/50 rounded-full" style={{ left: '75%' }} title="Target: 75%" />
                </div>
                <div className="flex items-start gap-1.5 mb-2">
                  <ArrowRight className="w-3 h-3 text-slate-500 mt-0.5 flex-shrink-0" />
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">{cat.recommendation}</p>
                </div>
                {/* Impact Chain */}
                <div className="ml-4 grid grid-cols-3 gap-2 mb-2.5">
                  <div>
                    <p className="text-[9px] font-bold text-amber-700 dark:text-amber-400/60 uppercase mb-0.5">Immediate</p>
                    <p className="text-[10px] text-slate-500">{cat.immediate}</p>
                  </div>
                  <div>
                    <p className="text-[9px] font-bold text-slate-500 uppercase mb-0.5">Downstream</p>
                    <p className="text-[10px] text-slate-500">{cat.downstream}</p>
                  </div>
                  <div>
                    <p className="text-[9px] font-bold text-emerald-700 dark:text-emerald-400/60 uppercase mb-0.5">Outcome</p>
                    <p className="text-[10px] text-slate-500">{cat.outcome}</p>
                  </div>
                </div>
                {cat.action && (
                  <button className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-[11px] font-semibold transition-all ${cat.status === 'below-target' ? 'bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-400 hover:bg-amber-500/20' : 'bg-slate-100 dark:bg-slate-700/30 border border-slate-300 dark:border-slate-600/30 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-100 dark:hover:bg-slate-700/50'}`}>
                    <Zap className="w-3 h-3" /> {cat.action}
                  </button>
                )}
              </div>
            ))}
            <div className="flex items-center gap-3 pt-2 text-[10px] text-slate-500">
              <div className="flex items-center gap-1.5">
                <div className="w-[1.5px] h-2.5 bg-red-500/50 rounded-full"></div>
                <span>75% target threshold</span>
              </div>
            </div>
          </div>
        </div>

        {/* Connected Cases & Patterns — collapsible */}
        {showConnections && (
          <div className="bg-white dark:bg-slate-800/25 border border-slate-200 dark:border-slate-200 dark:border-slate-700/30 rounded-xl shadow-sm dark:shadow-none p-5">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-[13px] font-semibold text-slate-900 dark:text-white uppercase tracking-wide">Connected Cases & Patterns</h3>
              <button onClick={() => setShowConnections(false)} className="text-slate-500 hover:text-slate-500 dark:text-slate-400">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-4 px-4 py-2.5 bg-slate-50 dark:bg-slate-900/20 rounded border-l-[3px] border-l-amber-700/50">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3">
                    <span className="text-[13px] font-semibold text-slate-900 dark:text-white">Pharmacy Robbery Series</span>
                    <span className="text-[11px] text-slate-700">#2024-1489</span>
                    <span className="px-1.5 py-0.5 border rounded text-[11px] font-medium bg-amber-100 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/20 text-amber-700 dark:text-amber-400">SERIES</span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">3 incidents, same MO — targeting opioid medications</p>
                </div>
                <span className="text-xs text-slate-500 flex-shrink-0">20 days open</span>
              </div>

              <div className="flex items-center gap-4 px-4 py-2.5 bg-slate-50 dark:bg-slate-900/20 rounded border-l-[3px] border-l-red-800/60">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3">
                    <span className="text-[13px] font-semibold text-slate-900 dark:text-white">Gang-Related Shootings</span>
                    <span className="text-[11px] text-slate-700">#2024-0847 + linked</span>
                    <span className="px-1.5 py-0.5 border rounded text-[11px] font-medium bg-red-100 dark:bg-red-500/10 border-red-200 dark:border-red-500/20 text-red-700 dark:text-red-400">CRITICAL</span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Territory dispute — retaliation risk HIGH</p>
                </div>
                <span className="text-xs text-slate-500 flex-shrink-0">7 days open</span>
              </div>

              <div className="flex items-center gap-4 px-4 py-2.5 bg-slate-50 dark:bg-slate-900/20 rounded border-l-[3px] border-l-slate-600/30">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3">
                    <span className="text-[13px] font-semibold text-slate-900 dark:text-white">Identity Theft Ring</span>
                    <span className="text-[11px] text-slate-700">#2024-1823</span>
                    <span className="px-1.5 py-0.5 border rounded text-[11px] font-medium bg-blue-500/10 border-blue-500/20 text-blue-400">MULTI-AGENCY</span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">47 victims, $380K — FBI coordination, federal charges pending</p>
                </div>
                <span className="text-xs text-slate-500 flex-shrink-0">44 days open</span>
              </div>
            </div>
          </div>
        )}

        {/* Case Analytics — collapsible */}
        {showAnalytics && (
          <div className="bg-white dark:bg-slate-800/25 border border-slate-200 dark:border-slate-200 dark:border-slate-700/30 rounded-xl shadow-sm dark:shadow-none p-5">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-[13px] font-semibold text-slate-900 dark:text-white uppercase tracking-wide">Case Analytics</h3>
              <button onClick={() => setShowAnalytics(false)} className="text-slate-500 hover:text-slate-500 dark:text-slate-400">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="border border-slate-200 dark:border-slate-700/20 rounded-lg p-5">
                <span className="text-sm font-medium text-slate-900 dark:text-white">Avg Time to Clearance</span>
                <div className="space-y-2 mt-3 text-xs">
                  <div className="flex justify-between"><span className="text-slate-500 dark:text-slate-400">Homicide</span><span className="text-slate-700 dark:text-slate-300">45 days</span></div>
                  <div className="flex justify-between"><span className="text-slate-500 dark:text-slate-400">Robbery</span><span className="text-slate-700 dark:text-slate-300">22 days</span></div>
                  <div className="flex justify-between"><span className="text-slate-500 dark:text-slate-400">Narcotics</span><span className="text-slate-700 dark:text-slate-300">38 days</span></div>
                  <div className="flex justify-between"><span className="text-slate-500 dark:text-slate-400">Sexual Assault</span><span className="text-slate-700 dark:text-slate-300">67 days</span></div>
                  <div className="flex justify-between"><span className="text-slate-500 dark:text-slate-400">Fraud</span><span className="text-slate-700 dark:text-slate-300">52 days</span></div>
                </div>
              </div>

              <div className="border border-slate-200 dark:border-slate-700/20 rounded-lg p-5">
                <span className="text-sm font-medium text-slate-900 dark:text-white">Evidence Processing</span>
                <div className="space-y-2 mt-3 text-xs">
                  <div className="flex justify-between"><span className="text-slate-500 dark:text-slate-400">Pending lab results</span><span className="text-amber-700 dark:text-amber-400">6 cases</span></div>
                  <div className="flex justify-between"><span className="text-slate-500 dark:text-slate-400">Avg lab turnaround</span><span className="text-red-700 dark:text-red-400">18 days (target: 14)</span></div>
                  <div className="flex justify-between"><span className="text-slate-500 dark:text-slate-400">Ballistics backlog</span><span className="text-amber-700 dark:text-amber-400">2 cases</span></div>
                  <div className="flex justify-between"><span className="text-slate-500 dark:text-slate-400">DNA backlog</span><span className="text-emerald-700 dark:text-emerald-400">0 cases</span></div>
                  <div className="flex justify-between"><span className="text-slate-500 dark:text-slate-400">Fingerprint match</span><span className="text-slate-700 dark:text-slate-300">42%</span></div>
                </div>
              </div>

              <div className="border border-slate-200 dark:border-slate-700/20 rounded-lg p-5">
                <span className="text-sm font-medium text-slate-900 dark:text-white">Comparisons</span>
                <div className="space-y-2 mt-3 text-xs">
                  <div className="flex justify-between"><span className="text-slate-500 dark:text-slate-400">Our clearance</span><span className="text-emerald-700 dark:text-emerald-400">75%</span></div>
                  <div className="flex justify-between"><span className="text-slate-500 dark:text-slate-400">National avg</span><span className="text-slate-700 dark:text-slate-300">62% (+13%)</span></div>
                  <div className="flex justify-between"><span className="text-slate-500 dark:text-slate-400">Georgia avg</span><span className="text-slate-700 dark:text-slate-300">68% (+7%)</span></div>
                  <div className="flex justify-between"><span className="text-slate-500 dark:text-slate-400">Cases vs Nov</span><span className="text-emerald-700 dark:text-emerald-400">-2 (improving)</span></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Detective Load & Risk */}
        <div className="bg-white dark:bg-slate-800/25 border border-slate-200 dark:border-slate-200 dark:border-slate-700/30 rounded-xl shadow-sm dark:shadow-none">
          <button
            onClick={() => setShowWorkload(!showWorkload)}
            className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-slate-50 dark:hover:bg-slate-50 dark:hover:bg-slate-800/10 transition-colors rounded-xl"
          >
            <div className="flex items-center gap-3">
              <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">Detective Load & Risk</h3>
              <span className="px-1.5 py-0.5 bg-slate-200 dark:bg-slate-700/30 text-[11px] text-slate-700 dark:text-slate-300 rounded">3 Detectives</span>
            </div>
            {showWorkload ? <ChevronUp className="w-4 h-4 text-slate-700" /> : <ChevronDown className="w-4 h-4 text-slate-700" />}
          </button>

          {showWorkload && (
            <div className="px-5 pb-5 space-y-3 border-t border-slate-200 dark:border-slate-200 dark:border-slate-700/20 pt-4">
              {/* Recommended Reassignment Banner */}
              <div className="flex items-center justify-between px-4 py-3 bg-amber-500/5 border border-amber-500/15 rounded-lg">
                <div className="flex items-start gap-2.5">
                  <TrendingUp className="w-4 h-4 text-amber-700 dark:text-amber-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-[12px] font-medium text-amber-700 dark:text-amber-400">Recommended Reassignment</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Burglary #2024-1712 → Det. Wilson (available, 80% clearance). Relieves Rodriguez and improves burglary rate.</p>
                  </div>
                </div>
                <button className="ml-4 flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 bg-amber-100 dark:bg-amber-500/15 border border-amber-200 dark:border-amber-500/25 text-amber-700 dark:text-amber-300 rounded-lg text-[11px] font-semibold hover:bg-amber-200 dark:hover:bg-amber-500/25 transition-all">
                  <Zap className="w-3 h-3" /> Auto Assign
                </button>
              </div>

              {detectiveLoad.map((d) => (
                <div key={d.name} className="px-4 py-3.5 bg-slate-50 dark:bg-slate-900/20 rounded-lg border border-slate-200/80 dark:border-slate-700/30 space-y-2.5">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <span className="text-[13px] font-semibold text-slate-900 dark:text-white">{d.name}</span>
                      <span className="text-[11px] text-slate-700 dark:text-slate-300">{d.badge}</span>
                      <span className={`px-1.5 py-0.5 border rounded text-[11px] font-semibold ${getRiskStyles(d.risk)}`}>{d.risk} RISK</span>
                      {d.bottleneck && <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-slate-200 dark:bg-slate-700/40 text-slate-700 dark:text-slate-200">BOTTLENECK</span>}
                    </div>
                    <span className="text-xs text-slate-700 dark:text-slate-300">Clearance: {d.clearanceRate}%</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-[11px]">
                    <div className="text-slate-700 dark:text-slate-300">Open cases: <span className="font-semibold">{d.openCases}</span> · Critical: <span className="font-semibold">{d.criticalCases}</span></div>
                    <div className="md:col-span-2">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-slate-600 dark:text-slate-300">Utilization</span>
                        <span className="font-semibold text-slate-800 dark:text-slate-100">{d.utilization}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-700/50 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${d.utilization >= 90 ? 'bg-red-500' : d.utilization >= 70 ? 'bg-amber-500' : 'bg-emerald-500'}`}
                          style={{ width: `${d.utilization}%` }}
                        />
                      </div>
                    </div>
                  </div>
                  {d.bottleneck && (
                    <p className="text-[11px] text-red-800 dark:text-red-300">Bottleneck: {d.bottleneck}</p>
                  )}
                  {d.recommendation && (
                    <p className="text-[11px] text-slate-700 dark:text-slate-200">Suggested reassignment: {d.recommendation}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* AI Insight Panel */}
        <div className="bg-white dark:bg-slate-800/25 border border-slate-200 dark:border-slate-200 dark:border-slate-700/30 rounded-xl shadow-sm dark:shadow-none p-5">
          <div className="flex items-center gap-2 mb-4">
            <Activity className="w-4 h-4 text-slate-500 dark:text-slate-400" />
            <h3 className="text-[13px] font-semibold text-slate-900 dark:text-white uppercase tracking-wide">AI Decision Guidance</h3>
            <span className="ml-auto text-[10px] text-slate-700">Action-linked · Updated 7:28 PM</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="flex items-start gap-2.5 p-3 bg-red-500/5 border border-red-500/10 rounded-lg">
              <AlertTriangle className="w-3.5 h-3.5 text-red-700 dark:text-red-400 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-0.5">
                  <p className="text-[11px] font-semibold text-red-700 dark:text-red-400">Urgent Deadline Collision</p>
                  <div className="flex items-center gap-1.5">
                    <span className="px-1.5 py-0.5 border rounded text-[9px] font-semibold uppercase bg-red-100 dark:bg-red-500/10 text-red-700 dark:text-red-300 border-red-200 dark:border-red-500/30">Escalated</span>
                    <span className="text-[10px] font-bold text-red-700 dark:text-red-700 dark:text-red-400/70">97% confidence</span>
                  </div>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-1">Homicide charge window + DEA surveillance expiration hit today.</p>
                <p className="text-[10px] text-slate-700 mb-2">Recommended action: Approve DEA extension and escalate lab now.</p>
                <p className="text-[10px] text-slate-600 dark:text-slate-300 mb-2">Based on expiring legal deadlines and unresolved forensic dependency.</p>
                <button className="px-2.5 py-1 bg-red-700 text-white rounded text-[10px] font-semibold hover:bg-red-800 transition-colors">Execute 2-step action</button>
              </div>
            </div>
            <div className="flex items-start gap-2.5 p-3 bg-amber-500/5 border border-amber-500/10 rounded-lg">
              <TrendingUp className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-0.5">
                  <p className="text-[11px] font-semibold text-amber-700 dark:text-amber-400">Robbery Escalation Risk</p>
                  <div className="flex items-center gap-1.5">
                    <span className="px-1.5 py-0.5 border rounded text-[9px] font-semibold uppercase bg-amber-100 dark:bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-500/30">Pending</span>
                    <span className="text-[10px] font-bold text-amber-700 dark:text-amber-400/70">88% confidence</span>
                  </div>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-1">Pattern indicates probable 4th pharmacy robbery within 72 hours.</p>
                <p className="text-[10px] text-slate-700 mb-2">Recommended action: Assign task force before next shift turnover.</p>
                <p className="text-[10px] text-slate-600 dark:text-slate-300 mb-2">Based on pattern clustering and unchanged suspect MO profile.</p>
                <button className="px-2.5 py-1 bg-amber-600 text-white rounded text-[10px] font-semibold hover:bg-amber-700 transition-colors">Assign task force now</button>
              </div>
            </div>
            <div className="flex items-start gap-2.5 p-3 bg-slate-50 dark:bg-slate-700/20 border border-slate-200 dark:border-slate-200 dark:border-slate-700/20 rounded-lg">
              <Users className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-0.5">
                  <p className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">Workload Bottleneck</p>
                  <div className="flex items-center gap-1.5">
                    <span className="px-1.5 py-0.5 border rounded text-[9px] font-semibold uppercase bg-blue-100 dark:bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-500/30">In Progress</span>
                    <span className="text-[10px] font-bold text-slate-500">92% confidence</span>
                  </div>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-1">Rodriguez overload is constraining homicide follow-up speed.</p>
                <p className="text-[10px] text-slate-700 mb-2">Recommended action: Reassign burglary #2024-1712 to Det. Wilson.</p>
                <p className="text-[10px] text-slate-600 dark:text-slate-300 mb-2">Based on current utilization imbalance across detectives.</p>
                <button className="px-2.5 py-1 bg-slate-700 text-white rounded text-[10px] font-semibold hover:bg-slate-800 transition-colors">Apply reassignment</button>
              </div>
            </div>
            <div className="flex items-start gap-2.5 p-3 bg-slate-50 dark:bg-slate-700/20 border border-slate-200 dark:border-slate-200 dark:border-slate-700/20 rounded-lg">
              <TrendingDown className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-0.5">
                  <p className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">Clearance Gap Recovery</p>
                  <div className="flex items-center gap-1.5">
                    <span className="px-1.5 py-0.5 border rounded text-[9px] font-semibold uppercase bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-500/30">Pending</span>
                    <span className="text-[10px] font-bold text-slate-500">81% confidence</span>
                  </div>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-1">Robbery and burglary are below target and trending negative.</p>
                <p className="text-[10px] text-slate-700 mb-2">Recommended action: Approve both task-force staffing and reassignment package.</p>
                <p className="text-[10px] text-slate-600 dark:text-slate-300 mb-2">Based on projected 30-day clearance trajectory against target.</p>
                <button className="px-2.5 py-1 bg-blue-700 text-white rounded text-[10px] font-semibold hover:bg-blue-800 transition-colors">Approve recovery package</button>
              </div>
            </div>
          </div>
        </div>

        {/* Recommended Action */}
        <div className="bg-white dark:bg-slate-900/70 border border-amber-400/35 dark:border-amber-500/35 rounded-xl overflow-hidden shadow-sm dark:shadow-none">
          {/* Urgency header */}
          <div className="flex items-center justify-between px-5 py-3 bg-amber-500/8 border-b border-amber-500/15">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-700 dark:text-amber-400" />
              <span className="text-[12px] font-bold text-amber-700 dark:text-amber-400 uppercase tracking-widest">Recommended Action</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-red-700 dark:text-red-400" />
              <span className="text-[12px] font-bold text-red-700 dark:text-red-400 tabular-nums">Must act within {fmtCountdown(urgencySeconds)}</span>
            </div>
          </div>
          <div className="p-6">
            <p className="text-[15px] text-slate-900 dark:text-white font-semibold mb-1">Approve DEA surveillance extension + escalate Homicide lab request</p>
            <p className="text-[12px] text-slate-500 dark:text-slate-400 mb-4">Two actions. ~5 minutes total. Resolves both URGENT items before EOD. Deferral risks: task force collapse + suspect release on homicide.</p>

            {/* Impact Chain */}
            <div className="mb-4 bg-slate-100 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-200 dark:border-slate-700/20 rounded-lg p-3.5 space-y-2">
              <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest mb-1">Impact Chain</p>
              <div className="flex items-start gap-2">
                <span className="text-[10px] font-bold text-amber-700 dark:text-amber-400 uppercase w-24 flex-shrink-0 mt-0.5">Immediate</span>
                <p className="text-[11px] text-slate-700 dark:text-slate-300">DEA surveillance continues. Lab escalation filed. Both URGENT items cleared from command queue.</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase w-24 flex-shrink-0 mt-0.5">Downstream</span>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">Fentanyl operation reaches arrest phase within 30 days. Homicide charge filed within 72 hrs pending ballistics.</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 uppercase w-24 flex-shrink-0 mt-0.5">Outcome</span>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">4 of 10 active cases progress. Clearance rate protected at 75%. 0 missed legal windows.</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-5 py-3 bg-amber-500 border border-amber-600 text-white rounded-lg text-[13px] font-bold hover:bg-amber-600 transition-all">
                <CheckCircle className="w-4 h-4" /> Approve DEA Extension
              </button>
              <button className="flex items-center gap-2 px-5 py-3 bg-transparent border border-slate-300 dark:border-slate-600/50 text-slate-700 dark:text-slate-300 rounded-lg text-[13px] font-semibold hover:bg-slate-100 dark:hover:bg-slate-700/40 transition-all">
                <ArrowUpRight className="w-4 h-4" /> Escalate Lab Request
              </button>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center gap-3 flex-wrap">
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800/40 border border-slate-300 dark:border-slate-700/40 text-slate-700 dark:text-slate-300 rounded-lg text-[13px] font-medium hover:bg-slate-200 dark:hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-all">
            <Plus className="w-4 h-4" /> New Case
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800/40 border border-slate-300 dark:border-slate-700/40 text-slate-700 dark:text-slate-300 rounded-lg text-[13px] font-medium hover:bg-slate-200 dark:hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-all">
            <Database className="w-4 h-4" /> Search NCIC
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800/40 border border-slate-300 dark:border-slate-700/40 text-slate-700 dark:text-slate-300 rounded-lg text-[13px] font-medium hover:bg-slate-200 dark:hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-all">
            <Users className="w-4 h-4" /> Task Force
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800/40 border border-slate-300 dark:border-slate-700/40 text-slate-700 dark:text-slate-300 rounded-lg text-[13px] font-medium hover:bg-slate-200 dark:hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-all">
            <FileWarning className="w-4 h-4" /> Warrant
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800/40 border border-slate-300 dark:border-slate-700/40 text-slate-700 dark:text-slate-300 rounded-lg text-[13px] font-medium hover:bg-slate-200 dark:hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-all">
            <Microscope className="w-4 h-4" /> Lab Request
          </button>
          <button
            onClick={() => setShowAnalytics(!showAnalytics)}
            className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800/40 border border-slate-300 dark:border-slate-700/40 text-slate-700 dark:text-slate-300 rounded-lg text-[13px] font-medium hover:bg-slate-200 dark:hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-all"
          >
            <BarChart3 className="w-4 h-4" /> Analytics
          </button>
          <button
            onClick={() => setShowConnections(!showConnections)}
            className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800/40 border border-slate-300 dark:border-slate-700/40 text-slate-700 dark:text-slate-300 rounded-lg text-[13px] font-medium hover:bg-slate-200 dark:hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-all"
          >
            <Link2 className="w-4 h-4" /> Case Connections
          </button>
        </div>

        {/* Filters — unified styling */}
        <div className="bg-white dark:bg-slate-800/25 border border-slate-200 dark:border-slate-700/30 rounded-xl shadow-sm dark:shadow-none p-6">
          <div className="flex items-center gap-4 mb-5 p-3 bg-slate-50 dark:bg-slate-900/25 border border-slate-200 dark:border-slate-700/30 rounded-lg">
            <div className="flex-1 relative">
              <Search className="w-4 h-4 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by case number, title, or detective..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-2 bg-slate-100 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/40 rounded-lg text-[13px] text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-slate-400 dark:focus:border-slate-600"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Filter className="w-4 h-4 text-slate-500" />
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-4 py-2 bg-slate-100 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/40 rounded-lg text-slate-700 dark:text-slate-300 text-[13px] focus:outline-none focus:border-slate-400 dark:focus:border-slate-600"
            >
              <option value="all">All Types</option>
              <option value="Homicide">Homicide</option>
              <option value="Sexual Assault">Sexual Assault</option>
              <option value="Robbery">Robbery</option>
              <option value="Narcotics">Narcotics</option>
              <option value="Assault">Assault</option>
              <option value="Burglary">Burglary</option>
              <option value="Fraud">Fraud</option>
            </select>
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="px-4 py-2 bg-slate-100 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/40 rounded-lg text-slate-700 dark:text-slate-300 text-[13px] focus:outline-none focus:border-slate-400 dark:focus:border-slate-600"
            >
              <option value="all">All Priorities</option>
              <option value="Critical">Critical</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>

        {/* Cases List — unified container styling */}
        <div className="space-y-3">
          {filteredCases.map((c) => {
            const caseState = getCaseState(c);
            const secondaryTag = c.deadline && new Date(c.deadline) < new Date(Date.now() + 86400000)
              ? 'DEADLINE'
              : caseState === 'Escalated'
                ? 'ESCALATED'
                : null;

            return (
              <div
                key={c.id}
                className={`bg-white dark:bg-slate-800/25 border rounded-xl shadow-sm dark:shadow-none hover:border-slate-500/70 transition-colors cursor-pointer ${c.priority === 'Critical' ? 'border-red-300/70 dark:border-red-500/35 ring-1 ring-red-300/40 dark:ring-red-500/20' : 'border-slate-200 dark:border-slate-700/30'}`}
                onClick={() => setSelectedCase(c)}
              >
                <div className="flex items-center gap-4 p-6">
                <div className={`w-0.5 self-stretch rounded-full flex-shrink-0 ${getPriorityDot(c.priority)}`}></div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className="text-[13px] font-semibold text-slate-900 dark:text-white">{c.title}</span>
                    <span className={`px-1.5 py-0.5 border rounded text-[11px] font-medium ${getPriorityBadge(c.priority)}`}>{c.priority.toUpperCase()}</span>
                    {secondaryTag && <span className={`px-1.5 py-0.5 border rounded text-[11px] font-semibold ${getStateStyles(caseState)}`}>{secondaryTag}</span>}
                  </div>
                  <div className="flex items-center gap-2 flex-wrap mb-2">
                    <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700/30 border border-slate-200 dark:border-slate-600/30 text-[11px] text-slate-700 dark:text-slate-200">
                      Assigned: {c.leadDetective}
                    </span>
                    {c.deadline && (
                      <span className="px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/25 text-[11px] font-semibold text-amber-800 dark:text-amber-300">
                        Deadline: {c.deadline}
                      </span>
                    )}
                    {c.multiAgency && (
                      <span className="text-[11px] text-blue-700 dark:text-blue-300 font-medium">Multi-agency coordination active</span>
                    )}
                  </div>
                  {c.criticalReason && (
                    <div className="flex items-center gap-1.5 mb-1">
                      <AlertTriangle className="w-3 h-3 text-slate-500 flex-shrink-0" />
                      <span className="text-[11px] text-slate-600 dark:text-slate-300 italic">{c.criticalReason}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-[11px] flex-wrap">
                    <span className="text-slate-500 dark:text-slate-400">{c.type}</span>
                    <span className="text-slate-700">·</span>
                    <span className="text-slate-500 dark:text-slate-400">#{c.caseNumber}</span>
                    <span className="text-slate-700">·</span>
                    <span className="text-slate-500 dark:text-slate-400">{c.leadDetective}</span>
                    <span className="text-slate-700">·</span>
                    <span className="text-slate-500 dark:text-slate-400">{c.evidence} evidence / {c.witnesses} witnesses</span>
                    {c.nextAction && (
                      <>
                        <span className="text-slate-700">·</span>
                      <span className={c.priority === 'Critical' ? 'text-red-800 dark:text-red-300 font-medium' : 'text-amber-800 dark:text-amber-300 font-medium'}>{c.nextAction}</span>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3 flex-shrink-0">
                  <div className="text-right mr-1">
                    <span className={`text-sm font-semibold ${c.daysOpen > 60 ? 'text-red-700 dark:text-red-400' : c.daysOpen > 30 ? 'text-amber-700 dark:text-amber-400' : 'text-slate-700 dark:text-slate-300'}`}>
                      {c.daysOpen}d
                    </span>
                    <div className="text-[11px] text-slate-500">open</div>
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); setSelectedCase(c); }}
                    className="flex items-center gap-1 px-3 py-1.5 bg-transparent border border-slate-300 dark:border-slate-600/40 text-slate-700 dark:text-slate-300 rounded text-[11px] font-semibold hover:bg-slate-100 dark:hover:bg-slate-700/40 transition-all"
                  >
                    <Eye className="w-3 h-3" /> Open
                  </button>
                  <button
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-1 px-3 py-1.5 bg-transparent border border-transparent text-slate-600 dark:text-slate-300 rounded text-[11px] font-medium hover:bg-slate-100 dark:hover:bg-slate-700/30 transition-all"
                  >
                    <UserCheck className="w-3 h-3" /> Reassign
                  </button>
                  <button
                    onClick={(e) => e.stopPropagation()}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded text-[11px] font-semibold text-white transition-all ${c.priority === 'Critical' ? 'bg-red-600 border border-red-700 hover:bg-red-700' : 'bg-amber-600 border border-amber-700 hover:bg-amber-700'}`}
                  >
                    <ShieldAlert className="w-3 h-3" /> Escalate
                  </button>
                </div>
              </div>
              </div>
            );
          })}
        </div>

        {/* Case Detail Modal — unified */}
        {selectedCase && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setSelectedCase(null)}
            />
            <div className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/50 rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
              <button
                onClick={() => setSelectedCase(null)}
                className="absolute top-4 right-4 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-900 dark:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`px-1.5 py-0.5 border rounded text-[11px] font-medium ${getPriorityBadge(selectedCase.priority)}`}>
                    {selectedCase.priority.toUpperCase()}
                  </span>
                  <span className="text-[13px] text-slate-500 dark:text-slate-400">{selectedCase.type}</span>
                  {selectedCase.multiAgency && (
                    <span className="px-1.5 py-0.5 border rounded text-[11px] font-medium bg-blue-500/10 border-blue-500/20 text-blue-400">MULTI-AGENCY</span>
                  )}
                </div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-1">{selectedCase.title}</h2>
                <div className="text-[11px] text-slate-500">
                  Case #{selectedCase.caseNumber} · {selectedCase.daysOpen} days open · Opened {selectedCase.openedDate}
                </div>
              </div>

              {/* Lead Detective */}
              <div className="mb-5 bg-white dark:bg-slate-800/25 border border-slate-200 dark:border-slate-200 dark:border-slate-700/30 rounded-xl shadow-sm dark:shadow-none p-5">
                <h3 className="text-[13px] font-semibold text-slate-900 dark:text-white uppercase tracking-wide mb-3">Lead Detective</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-[13px] text-slate-900 dark:text-white font-medium">{selectedCase.leadDetective}</div>
                    <div className="text-[11px] text-slate-500">Badge: {selectedCase.badge}</div>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 dark:bg-slate-800/40 border border-slate-300 dark:border-slate-700/40 text-slate-700 dark:text-slate-300 rounded-lg text-xs hover:bg-slate-200 dark:hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-all">
                      <Phone className="w-3 h-3" /> Call
                    </button>
                    <button className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 dark:bg-slate-800/40 border border-slate-300 dark:border-slate-700/40 text-slate-700 dark:text-slate-300 rounded-lg text-xs hover:bg-slate-200 dark:hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-all">
                      <Mail className="w-3 h-3" /> Email
                    </button>
                  </div>
                </div>
              </div>

              {/* Status & Evidence */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                <div className="bg-white dark:bg-slate-800/25 border border-slate-200 dark:border-slate-200 dark:border-slate-700/30 rounded-xl shadow-sm dark:shadow-none p-5">
                  <h3 className="text-[13px] font-semibold text-slate-900 dark:text-white uppercase tracking-wide mb-3">Status</h3>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between"><span className="text-slate-500 dark:text-slate-400">Current</span><span className="text-slate-700 dark:text-slate-300">{selectedCase.status}</span></div>
                    <div className="flex justify-between"><span className="text-slate-500 dark:text-slate-400">Opened</span><span className="text-slate-700 dark:text-slate-300">{selectedCase.openedDate}</span></div>
                    <div className="flex justify-between"><span className="text-slate-500 dark:text-slate-400">Last Update</span><span className="text-slate-700 dark:text-slate-300">2 hours ago</span></div>
                  </div>
                </div>
                <div className="bg-white dark:bg-slate-800/25 border border-slate-200 dark:border-slate-200 dark:border-slate-700/30 rounded-xl shadow-sm dark:shadow-none p-5">
                  <h3 className="text-[13px] font-semibold text-slate-900 dark:text-white uppercase tracking-wide mb-3">Evidence & Witnesses</h3>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between"><span className="text-slate-500 dark:text-slate-400">Evidence</span><span className="text-slate-700 dark:text-slate-300">{selectedCase.evidence} collected</span></div>
                    <div className="flex justify-between"><span className="text-slate-500 dark:text-slate-400">Witnesses</span><span className="text-slate-700 dark:text-slate-300">{selectedCase.witnesses} interviewed</span></div>
                    <div className="flex justify-between"><span className="text-slate-500 dark:text-slate-400">Suspects</span><span className="text-slate-700 dark:text-slate-300">{selectedCase.suspects} identified</span></div>
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div className="mb-5 bg-white dark:bg-slate-800/25 border border-slate-200 dark:border-slate-200 dark:border-slate-700/30 rounded-xl shadow-sm dark:shadow-none p-5">
                <h3 className="text-[13px] font-semibold text-slate-900 dark:text-white uppercase tracking-wide mb-4">Case Timeline</h3>
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <CheckCircle className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                      <div className="w-px h-full bg-slate-600 mt-1"></div>
                    </div>
                    <div className="flex-1 pb-4">
                      <div className="text-[13px] text-slate-900 dark:text-white font-medium">Case Opened</div>
                      <div className="text-[11px] text-slate-500">{selectedCase.openedDate}</div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <CheckCircle className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                      <div className="w-px h-full bg-slate-600 mt-1"></div>
                    </div>
                    <div className="flex-1 pb-4">
                      <div className="text-[13px] text-slate-900 dark:text-white font-medium">Evidence Collected</div>
                      <div className="text-[11px] text-slate-500">{selectedCase.evidence} items logged</div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <CheckCircle className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                      <div className="w-px h-full bg-slate-600 mt-1"></div>
                    </div>
                    <div className="flex-1 pb-4">
                      <div className="text-[13px] text-slate-900 dark:text-white font-medium">Witnesses Interviewed</div>
                      <div className="text-[11px] text-slate-500">{selectedCase.witnesses} statements</div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex flex-col items-center">
                      {selectedCase.status === 'Awaiting Lab Results' ? (
                        <Clock className="w-4 h-4 text-amber-700 dark:text-amber-400" />
                      ) : (
                        <CheckCircle className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="text-[13px] text-slate-900 dark:text-white font-medium">{selectedCase.nextAction}</div>
                      {selectedCase.deadline && (
                        <div className="text-[11px] text-red-700 dark:text-red-400">Deadline: {selectedCase.deadline}</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Team */}
              <div className="mb-5 bg-white dark:bg-slate-800/25 border border-slate-200 dark:border-slate-200 dark:border-slate-700/30 rounded-xl shadow-sm dark:shadow-none p-5">
                <h3 className="text-[13px] font-semibold text-slate-900 dark:text-white uppercase tracking-wide mb-3">Assigned Team</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedCase.assignedTo.map((person, idx) => (
                    <span key={idx} className="px-3 py-1.5 bg-slate-100 dark:bg-slate-700/30 text-slate-700 dark:text-slate-300 rounded-lg text-[13px]">
                      {person}
                    </span>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div className="mb-5 bg-white dark:bg-slate-800/25 border border-slate-200 dark:border-slate-200 dark:border-slate-700/30 rounded-xl shadow-sm dark:shadow-none p-5">
                <h3 className="text-[13px] font-semibold text-slate-900 dark:text-white uppercase tracking-wide mb-3">Case Summary</h3>
                <p className="text-[13px] text-slate-700 dark:text-slate-300">{selectedCase.notes}</p>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-2">
                <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800/40 border border-slate-300 dark:border-slate-700/40 text-slate-700 dark:text-slate-300 rounded-lg text-[13px] font-medium hover:bg-slate-200 dark:hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-all">
                  <FileText className="w-4 h-4" /> Update Status
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800/40 border border-slate-300 dark:border-slate-700/40 text-slate-700 dark:text-slate-300 rounded-lg text-[13px] font-medium hover:bg-slate-200 dark:hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-all">
                  <Scale className="w-4 h-4" /> Request Warrant
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800/40 border border-slate-300 dark:border-slate-700/40 text-slate-700 dark:text-slate-300 rounded-lg text-[13px] font-medium hover:bg-slate-200 dark:hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-all">
                  <FlaskConical className="w-4 h-4" /> Lab Request
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800/40 border border-slate-300 dark:border-slate-700/40 text-slate-700 dark:text-slate-300 rounded-lg text-[13px] font-medium hover:bg-slate-200 dark:hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-all">
                  <Link2 className="w-4 h-4" /> Link Cases
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800/40 border border-slate-300 dark:border-slate-700/40 text-slate-700 dark:text-slate-300 rounded-lg text-[13px] font-medium hover:bg-slate-200 dark:hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-all">
                  <Activity className="w-4 h-4" /> Case Notes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ActiveCasesDashboard;

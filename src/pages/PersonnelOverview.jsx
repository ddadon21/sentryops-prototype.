import React, { useState } from 'react';
import { Search, Filter, Download, Mail, Phone, MapPin, AlertCircle, CheckCircle, Clock, ChevronRight, Bell, Users, Award, Calendar, TrendingUp, TrendingDown, MoreVertical, Eye, X, Sparkles, Plus, FileText, BarChart3, Shield, Activity, Star, Briefcase, Zap, Target, ArrowRight, AlertTriangle, Gauge, RefreshCw, Flag, UserCircle, GraduationCap, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import DashboardLayout from '../layouts/DashboardLayout';
import ScheduleTrainingWorkflow from './workforce/ScheduleTrainingWorkflow';
import CertificationReport from './workforce/CertificationReport';
import WorkforceAnalytics from './workforce/WorkforceAnalytics';

export default function PersonnelOverview() {
  const navigate = useNavigate();
  const [quickPeekOpen, setQuickPeekOpen] = useState(false);
  const [peekData, setPeekData] = useState(null);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [aiInsightsVisible, setAiInsightsVisible] = useState(true);
  const [fullProfileOpen, setFullProfileOpen] = useState(false);
  const [fullProfileData, setFullProfileData] = useState(null);
  const [collapsedGroups, setCollapsedGroups] = useState({});
  const [scheduleTrainingOpen, setScheduleTrainingOpen] = useState(false);
  const [scheduleTrainingTarget, setScheduleTrainingTarget] = useState(null);
  const [certReportOpen, setCertReportOpen] = useState(false);
  const [workforceAnalyticsOpen, setWorkforceAnalyticsOpen] = useState(false);
  const [actionedRecommendations, setActionedRecommendations] = useState({});

  const personnel = [
    {
      id: 'P-2024-001',
      name: 'John Smith',
      badge: 'D-4521',
      rank: 'Deputy Sheriff',
      division: 'Patrol',
      shift: 'Day Shift',
      status: 'on-duty',
      photo: 'JS',
      certifications: [
        { name: 'P.O.S.T.', status: 'current', expires: '2025-12-15' },
        { name: 'CPR/First Aid', status: 'expiring', expires: '2024-11-01' },
        { name: 'Firearms', status: 'current', expires: '2025-06-30' }
      ],
      tenure: '5 years',
      email: 'j.smith@sheriff.gov',
      phone: '(555) 100-0001',
      supervisor: 'Sgt. Williams',
      performance: 4.2,
      lastCheckIn: '2 hours ago',
      coverageImpact: 'critical',
      risk: 'CPR/First Aid expiring in 14 days',
      aiInsight: 'Schedule CPR training before Jan 14'
    },
    {
      id: 'P-2024-002',
      name: 'Sarah Johnson',
      badge: 'D-4522',
      rank: 'Senior Deputy',
      division: 'Investigations',
      shift: 'Day Shift',
      status: 'on-duty',
      photo: 'SJ',
      certifications: [
        { name: 'P.O.S.T.', status: 'current', expires: '2026-03-20' },
        { name: 'Detective Cert', status: 'current', expires: '2025-09-15' },
        { name: 'Interview & Interrogation', status: 'current', expires: '2025-12-01' },
        { name: 'CPR/First Aid', status: 'expired', expires: '2024-09-15' }
      ],
      tenure: '8 years',
      email: 's.johnson@sheriff.gov',
      phone: '(555) 100-0002',
      supervisor: 'Lt. Martinez',
      performance: 4.7,
      lastCheckIn: '1 hour ago',
      coverageImpact: 'stable',
      risk: 'CPR/First Aid expired — restricted from field duty',
      restrictionReason: 'CPR/First Aid expired',
      aiInsight: 'Complete CPR recert to restore field duty status'
    },
    {
      id: 'P-2024-003',
      name: 'Michael Chen',
      badge: 'D-4523',
      rank: 'Deputy Sheriff',
      division: 'Detention',
      shift: 'Night Shift',
      status: 'off-duty',
      photo: 'MC',
      certifications: [
        { name: 'P.O.S.T.', status: 'current', expires: '2025-08-10' },
        { name: 'Corrections Officer', status: 'current', expires: '2025-11-30' },
        { name: 'CPR/First Aid', status: 'current', expires: '2025-05-20' }
      ],
      tenure: '3 years',
      email: 'm.chen@sheriff.gov',
      phone: '(555) 100-0003',
      supervisor: 'Sgt. Davis',
      performance: 4.0,
      lastCheckIn: '8 hours ago',
      coverageImpact: 'watch',
      risk: null,
      aiInsight: null
    },
    {
      id: 'P-2024-004',
      name: 'Emily Rodriguez',
      badge: 'C-1105',
      rank: 'Communications Officer',
      division: 'Dispatch',
      shift: 'Evening Shift',
      status: 'on-duty',
      photo: 'ER',
      certifications: [
        { name: 'NCIC Certified', status: 'current', expires: '2025-10-15' },
        { name: 'EMD Certified', status: 'expiring', expires: '2024-10-25' },
        { name: 'CPR/First Aid', status: 'current', expires: '2025-07-01' }
      ],
      tenure: '2 years',
      email: 'e.rodriguez@sheriff.gov',
      phone: '(555) 100-0004',
      supervisor: 'Shift Supervisor Lee',
      performance: 4.3,
      lastCheckIn: '30 min ago',
      coverageImpact: 'critical',
      risk: 'EMD Certified expiring in 7 days',
      aiInsight: 'Renew EMD cert by Oct 25 — night dispatch at 60%'
    },
    {
      id: 'P-2024-005',
      name: 'David Williams',
      badge: 'S-2201',
      rank: 'Sergeant',
      division: 'Patrol',
      shift: 'Day Shift',
      status: 'on-duty',
      photo: 'DW',
      certifications: [
        { name: 'P.O.S.T.', status: 'current', expires: '2026-01-20' },
        { name: 'Supervisor Cert', status: 'current', expires: '2025-11-10' },
        { name: 'Firearms Instructor', status: 'current', expires: '2025-08-30' },
        { name: 'CPR/First Aid', status: 'current', expires: '2025-04-15' }
      ],
      tenure: '12 years',
      email: 'd.williams@sheriff.gov',
      phone: '(555) 100-0005',
      supervisor: 'Lt. Thompson',
      performance: 4.8,
      lastCheckIn: '45 min ago',
      coverageImpact: 'stable',
      risk: null,
      aiInsight: 'Assign as Field Training Officer'
    },
    {
      id: 'P-2024-006',
      name: 'Jennifer Martinez',
      badge: 'D-4524',
      rank: 'Deputy Sheriff',
      division: 'School Resource',
      shift: 'Day Shift',
      status: 'on-leave',
      photo: 'JM',
      certifications: [
        { name: 'P.O.S.T.', status: 'current', expires: '2025-09-25' },
        { name: 'SRO Certification', status: 'current', expires: '2025-12-20' },
        { name: 'CPR/First Aid', status: 'expiring', expires: '2024-10-30' }
      ],
      tenure: '6 years',
      email: 'j.martinez@sheriff.gov',
      phone: '(555) 100-0006',
      supervisor: 'Capt. Anderson',
      performance: 4.5,
      lastCheckIn: '3 days ago',
      coverageImpact: 'watch',
      risk: 'On medical leave — CPR expiring during absence',
      restrictionReason: 'Medical leave',
      aiInsight: 'Schedule CPR renewal for return date'
    },
    {
      id: 'P-2024-007',
      name: 'Robert Taylor',
      badge: 'D-4525',
      rank: 'Deputy Sheriff',
      division: 'Patrol',
      shift: 'Night Shift',
      status: 'on-duty',
      photo: 'RT',
      certifications: [
        { name: 'P.O.S.T.', status: 'current', expires: '2025-11-20' },
        { name: 'CPR/First Aid', status: 'current', expires: '2025-08-15' },
        { name: 'Firearms', status: 'current', expires: '2025-09-10' }
      ],
      tenure: '4 years',
      email: 'r.taylor@sheriff.gov',
      phone: '(555) 100-0007',
      supervisor: 'Sgt. Williams',
      performance: 4.1,
      lastCheckIn: '3 hours ago',
      coverageImpact: 'critical',
      risk: null,
      aiInsight: 'Move to Central Patrol — zone below minimum'
    },
    {
      id: 'P-2024-008',
      name: 'Amanda White',
      badge: 'L-3301',
      rank: 'Lieutenant',
      division: 'Investigations',
      shift: 'Day Shift',
      status: 'on-duty',
      photo: 'AW',
      certifications: [
        { name: 'P.O.S.T.', status: 'current', expires: '2026-05-15' },
        { name: 'Supervisor Cert', status: 'current', expires: '2025-12-01' },
        { name: 'Advanced Investigation', status: 'current', expires: '2025-10-20' },
        { name: 'CPR/First Aid', status: 'current', expires: '2025-06-30' }
      ],
      tenure: '15 years',
      email: 'a.white@sheriff.gov',
      phone: '(555) 100-0008',
      supervisor: 'Captain Reed',
      performance: 4.9,
      lastCheckIn: '20 min ago',
      coverageImpact: 'stable',
      risk: null,
      aiInsight: null
    },
    {
      id: 'P-2024-009',
      name: 'James Brown',
      badge: 'D-4526',
      rank: 'Deputy Sheriff',
      division: 'Detention',
      shift: 'Day Shift',
      status: 'on-duty',
      photo: 'JB',
      certifications: [
        { name: 'P.O.S.T.', status: 'current', expires: '2025-07-10' },
        { name: 'Corrections Officer', status: 'current', expires: '2025-12-15' },
        { name: 'CPR/First Aid', status: 'expiring', expires: '2024-11-05' }
      ],
      tenure: '6 years',
      email: 'j.brown@sheriff.gov',
      phone: '(555) 100-0009',
      supervisor: 'Sgt. Davis',
      performance: 4.4,
      lastCheckIn: '1 hour ago',
      coverageImpact: 'watch',
      risk: 'CPR/First Aid expiring in 18 days',
      aiInsight: 'Schedule CPR recert before Nov 5'
    },
    {
      id: 'P-2024-010',
      name: 'Lisa Anderson',
      badge: 'C-1106',
      rank: 'Communications Officer',
      division: 'Dispatch',
      shift: 'Night Shift',
      status: 'off-duty',
      photo: 'LA',
      certifications: [
        { name: 'NCIC Certified', status: 'current', expires: '2025-09-20' },
        { name: 'EMD Certified', status: 'current', expires: '2025-11-10' },
        { name: 'CPR/First Aid', status: 'current', expires: '2025-05-25' }
      ],
      tenure: '3 years',
      email: 'l.anderson@sheriff.gov',
      phone: '(555) 100-0010',
      supervisor: 'Shift Supervisor Lee',
      performance: 4.2,
      lastCheckIn: '6 hours ago',
      coverageImpact: 'stable',
      risk: null,
      aiInsight: null
    },
    {
      id: 'P-2024-011',
      name: 'Kevin Garcia',
      badge: 'D-4527',
      rank: 'Senior Deputy',
      division: 'Patrol',
      shift: 'Evening Shift',
      status: 'on-duty',
      photo: 'KG',
      certifications: [
        { name: 'P.O.S.T.', status: 'current', expires: '2026-02-15' },
        { name: 'Field Training Officer', status: 'current', expires: '2025-10-30' },
        { name: 'Firearms', status: 'current', expires: '2025-08-20' },
        { name: 'CPR/First Aid', status: 'current', expires: '2025-07-15' }
      ],
      tenure: '10 years',
      email: 'k.garcia@sheriff.gov',
      phone: '(555) 100-0011',
      supervisor: 'Sgt. Williams',
      performance: 4.6,
      lastCheckIn: '15 min ago',
      coverageImpact: 'stable',
      risk: null,
      aiInsight: 'Assign as Field Training Officer'
    },
    {
      id: 'P-2024-012',
      name: 'Maria Lopez',
      badge: 'D-4528',
      rank: 'Deputy Sheriff',
      division: 'School Resource',
      shift: 'Day Shift',
      status: 'on-duty',
      photo: 'ML',
      certifications: [
        { name: 'P.O.S.T.', status: 'current', expires: '2025-12-30' },
        { name: 'SRO Certification', status: 'current', expires: '2026-01-15' },
        { name: 'Crisis Intervention', status: 'current', expires: '2025-09-05' },
        { name: 'CPR/First Aid', status: 'current', expires: '2025-11-20' }
      ],
      tenure: '7 years',
      email: 'm.lopez@sheriff.gov',
      phone: '(555) 100-0012',
      supervisor: 'Capt. Anderson',
      performance: 4.5,
      lastCheckIn: '40 min ago',
      coverageImpact: 'stable',
      risk: null,
      aiInsight: null
    }
  ];

  const notifications = [
    { id: 1, title: '3 Certifications Expiring Soon', message: 'CPR, Firearms, and P.O.S.T. renewals needed', time: '10 min ago', urgent: true },
    { id: 2, title: 'Budget Approval Required', message: 'Q1 2025 Training Budget: $45,000', time: '1 hour ago', urgent: true },
    { id: 3, title: 'Leave Request Submitted', message: 'Deputy Marcus Chen - Dec 15-22', time: '2 hours ago', urgent: false },
    { id: 4, title: 'Shift Coverage Alert', message: 'Night shift needs 2 additional deputies', time: '3 hours ago', urgent: false },
    { id: 5, title: 'Equipment Request', message: 'IT Department - Body cameras upgrade', time: '5 hours ago', urgent: false }
  ];

  const getCertStatus = (certs) => {
    if (certs.some(c => c.status === 'expired')) return { label: 'Expired', color: 'red', icon: AlertCircle };
    if (certs.some(c => c.status === 'expiring')) return { label: 'Expiring Soon', color: 'orange', icon: Clock };
    return { label: 'Current', color: 'green', icon: CheckCircle };
  };

  const getStatusColor = (status) => {
    const colors = {
      'on-duty': 'bg-green-500/20 border-green-500/30 text-green-600 dark:text-green-400',
      'off-duty': 'bg-slate-500/20 border-slate-500/30 text-slate-500',
      'on-leave': 'bg-orange-500/20 border-orange-500/30 text-orange-600 dark:text-orange-400'
    };
    return colors[status] || colors['off-duty'];
  };

  const getOperationalStatus = (person) => {
    const hasCriticalCert = person.certifications.some(c => c.status === 'expired');
    const hasExpiringCert = person.certifications.some(c => c.status === 'expiring');
    if (person.status === 'on-leave') return { label: 'Non-Deployable', color: 'red', icon: AlertTriangle, detail: 'On leave' };
    if (hasCriticalCert) return { label: 'Restricted', color: 'red', icon: AlertCircle, detail: 'Expired certification' };
    if (hasExpiringCert) return { label: 'Cert Expiring', color: 'orange', icon: Clock, detail: 'Renewal required' };
    if (person.status === 'off-duty') return { label: 'Deployable', color: 'green', icon: CheckCircle, detail: 'Off-duty, available' };
    return { label: 'Deployable', color: 'green', icon: CheckCircle, detail: 'Full duty' };
  };

  const getCoverageConfig = (impact) => {
    if (impact === 'critical') return { label: 'Critical', color: 'text-red-700 dark:text-red-400', bg: 'bg-red-500/10 border-red-500/15' };
    if (impact === 'watch') return { label: 'Watch', color: 'text-orange-600 dark:text-orange-400', bg: 'bg-orange-500/10 border-orange-500/15' };
    return { label: 'Stable', color: 'text-green-600 dark:text-green-400', bg: 'bg-green-500/10 border-green-500/15' };
  };

  // Group personnel by operational status for command view
  const groupedPersonnel = (() => {
    const deployable = [];
    const certRisk = [];
    const nonDeployable = [];
    personnel.forEach(p => {
      const op = getOperationalStatus(p);
      if (op.color === 'red') nonDeployable.push(p);
      else if (op.color === 'orange') certRisk.push(p);
      else deployable.push(p);
    });
    return [
      { key: 'deployable', label: 'Deployable Personnel', count: deployable.length, color: 'green', people: deployable },
      { key: 'certRisk', label: 'Certification Risk', count: certRisk.length, color: 'orange', people: certRisk },
      { key: 'nonDeployable', label: 'Non-Deployable', count: nonDeployable.length, color: 'red', people: nonDeployable },
    ].filter(g => g.people.length > 0);
  })();

  const toggleGroup = (key) => {
    setCollapsedGroups(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const openQuickPeek = (person) => {
    setPeekData(person);
    setQuickPeekOpen(true);
  };

  const openFullProfile = (person) => {
    setFullProfileData(person);
    setFullProfileOpen(true);
  };

  const openScheduleTraining = (person = null, certification = null) => {
    setScheduleTrainingTarget(person ? { person, certification } : null);
    setScheduleTrainingOpen(true);
  };

  const closeScheduleTraining = () => {
    setScheduleTrainingOpen(false);
    setScheduleTrainingTarget(null);
  };

  const handleRecommendationAction = (rec) => {
    if (rec.actionType === 'training') {
      openScheduleTraining(rec.person, rec.certification);
    } else {
      setActionedRecommendations(prev => ({ ...prev, [rec.id]: true }));
    }
  };

  const stats = {
    total: 170,
    onDuty: 127,
    expiring: 23,
    openPositions: 12
  };

  // ── AI Staffing Recommendations — recommended actions, ranked by operational impact ──
  const aiStaffingRecommendations = [
    {
      id: 'rec-taylor-reassign',
      icon: RefreshCw,
      title: 'Move Deputy Taylor to Central Patrol',
      rationale: 'Central Patrol is below minimum staffing. Taylor is fully certified on Night Shift with no scheduling conflicts.',
      impacts: [
        { label: 'Restores minimum staffing', tone: 'positive' },
        { label: 'Coverage +8%', tone: 'positive' }
      ],
      person: personnel.find(p => p.id === 'P-2024-007'),
      actionLabel: 'Reassign to Central Patrol',
      actionType: 'reassign'
    },
    {
      id: 'rec-smith-cpr',
      icon: GraduationCap,
      title: 'Schedule CPR Renewal for John Smith',
      rationale: 'CPR/First Aid certification expires in 14 days. Scheduling now keeps Smith deployable with zero coverage disruption.',
      impacts: [
        { label: 'Prevents certification lapse', tone: 'caution' },
        { label: 'No staffing impact', tone: 'neutral' }
      ],
      person: personnel.find(p => p.id === 'P-2024-001'),
      certification: 'CPR/First Aid',
      actionLabel: 'Schedule Training',
      actionType: 'training'
    },
    {
      id: 'rec-garcia-fto',
      icon: Star,
      title: 'Reassign Garcia as Field Training Officer',
      rationale: 'Garcia holds a current FTO certification and a 4.6 performance rating — pairing him with incoming recruits closes the training gap fastest.',
      impacts: [
        { label: 'Reduces training backlog by 12%', tone: 'positive' }
      ],
      person: personnel.find(p => p.id === 'P-2024-011'),
      actionLabel: 'Assign as FTO',
      actionType: 'assign'
    }
  ];

  const getImpactToneClasses = (tone) => {
    if (tone === 'positive') return 'bg-emerald-500/10 border-emerald-500/20 text-emerald-700 dark:text-emerald-400';
    if (tone === 'caution') return 'bg-orange-500/10 border-orange-500/20 text-orange-600 dark:text-orange-400';
    return 'bg-slate-500/10 border-slate-500/20 text-secondary';
  };

  return (
    <DashboardLayout>
      <div className="p-5 lg:p-8">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col xl:flex-row gap-4">
            {/* Main Content */}
            <div className="flex-1 min-w-0">
                {/* ── Page Header ─────────────────────────────── */}
                <div className="mb-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3">
                    <div className="min-w-0">
                      <h2 className="text-xl font-bold text-primary mb-1">Workforce Readiness</h2>
                      <p className="text-[11px] text-slate-500 break-words">Deployable personnel, certification risk &amp; readiness — agency workforce command center</p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-100/80 dark:bg-zinc-900/30 border border-border rounded-lg text-[11px] text-secondary hover:text-primary transition-colors">
                        <Download className="w-3 h-3" />
                        Staffing Report
                      </button>
                    </div>
                  </div>
                </div>

                {/* ── Workforce Status Row (4 cards) ──────────── */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                  {/* Workforce Health — composite score is healthy */}
                  <div className="bg-slate-100/80 dark:bg-zinc-900/30 border border-emerald-500/20 rounded-xl p-3">
                    <div className="flex items-center gap-2 mb-1.5">
                      <Gauge className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Workforce Health</span>
                    </div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">87%</span>
                      <span className="text-[10px] text-slate-500">composite</span>
                    </div>
                    <p className="text-[9px] text-slate-700 mt-0.5">Staffing + compliance + retention</p>
                  </div>

                  {/* Patrol Coverage — below optimal, needs attention */}
                  <div className="bg-slate-100/80 dark:bg-zinc-900/30 border border-orange-500/20 rounded-xl p-3">
                    <div className="flex items-center gap-2 mb-1.5">
                      <Shield className="w-3.5 h-3.5 text-orange-600 dark:text-orange-400" />
                      <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Patrol Coverage</span>
                    </div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-2xl font-bold text-orange-600 dark:text-orange-400">75%</span>
                      <span className="text-[10px] text-orange-600 dark:text-orange-400/60">127/170</span>
                    </div>
                    <p className="text-[9px] text-orange-600 dark:text-orange-400/70 mt-0.5">4 positions below optimal</p>
                  </div>

                  {/* Certification Compliance — below target, needs attention */}
                  <div className="bg-slate-100/80 dark:bg-zinc-900/30 border border-orange-500/20 rounded-xl p-3">
                    <div className="flex items-center gap-2 mb-1.5">
                      <Award className="w-3.5 h-3.5 text-orange-600 dark:text-orange-400" />
                      <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Cert Compliance</span>
                    </div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-2xl font-bold text-orange-600 dark:text-orange-400">86%</span>
                      <span className="text-[10px] text-slate-500">target: 95%</span>
                    </div>
                    <p className="text-[9px] text-red-700 dark:text-red-400/70 mt-0.5">17 expiring within 30 days</p>
                  </div>

                  {/* Staffing Gap */}
                  <div className="bg-slate-100/80 dark:bg-zinc-900/30 border border-red-500/20 rounded-xl p-3">
                    <div className="flex items-center gap-2 mb-1.5">
                      <Users className="w-3.5 h-3.5 text-red-700 dark:text-red-400" />
                      <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Staffing Gap</span>
                    </div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-2xl font-bold text-red-700 dark:text-red-400">12</span>
                      <span className="text-[10px] text-slate-500">open positions</span>
                    </div>
                    <p className="text-[9px] text-red-700 dark:text-red-400/70 mt-0.5">170 of 182 authorized filled</p>
                  </div>
                </div>


                {/* ── Command Signal Bar (expandable) ─────────── */}
                <div className="mb-4">
                  <button
                    onClick={() => setAiInsightsVisible(!aiInsightsVisible)}
                    className="w-full flex items-center gap-2 px-3 py-2 bg-slate-50 dark:bg-zinc-900/35 border border-border dark:border-slate-700/30 rounded hover:bg-slate-100 dark:hover:bg-zinc-900/30 transition-colors"
                  >
                    <Sparkles className="w-3 h-3 text-slate-500" />
                    <span className="text-[11px] text-secondary flex-1 min-w-0 text-left break-words">
                      17 certs expiring 30d. Patrol at 75% (4 below optimal). 12 open positions — Central Patrol at risk. Turnover 6.5% (below avg).
                    </span>
                    <span className="text-[10px] text-slate-700 flex-shrink-0">{aiInsightsVisible ? 'Less' : 'Details'}</span>
                    {aiInsightsVisible ? <ChevronRight className="w-3 h-3 text-slate-700 rotate-90" /> : <ChevronRight className="w-3 h-3 text-slate-700" />}
                  </button>

                  {aiInsightsVisible && (
                    <div className="mt-1 px-3 py-2.5 bg-slate-50 dark:bg-zinc-900/15 border border-slate-100 dark:border-slate-700/10 rounded space-y-1.5">
                      <p className="text-[10px] text-red-700 dark:text-red-400">&bull; 17 certifications expire within 30 days. 6 are Patrol Deputies — if lapsed, coverage drops to 69%. Schedule training immediately.</p>
                      <p className="text-[10px] text-orange-600 dark:text-orange-400">&bull; Patrol staffing at 75% (127/170). 4 open positions + 8 on leave. Central Patrol zone below minimum staffing.</p>
                      <p className="text-[10px] text-orange-600 dark:text-orange-400">&bull; 12 open positions across divisions. Priority: 4 Patrol (critical), 3 Detention (high). Pipeline: 28 applicants, 42-day avg hire.</p>
                      <p className="text-[10px] text-green-600 dark:text-green-400">&bull; Turnover 6.5% (industry avg 12%). Avg tenure 8.4 years. Workforce retention stable.</p>
                    </div>
                  )}
                </div>

                {/* ── Command Workforce Actions ──────────────── */}
                <div className="mb-4">
                  <div className="flex items-center gap-3 flex-wrap">
                    <button className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold rounded text-[11px] transition-colors">
                      <Plus className="w-3 h-3" />Add Personnel
                    </button>
                    <button onClick={() => openScheduleTraining(personnel.find(p => p.id === 'P-2024-001'), 'CPR/First Aid')} className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100/80 dark:bg-zinc-900/30 hover:bg-slate-200 dark:hover:bg-zinc-900/60 border border-slate-700/50 text-secondary rounded text-[11px] font-medium transition-colors">
                      <Calendar className="w-3 h-3" />Schedule Training
                    </button>
                    <button onClick={() => setCertReportOpen(true)} className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100/80 dark:bg-zinc-900/30 hover:bg-slate-200 dark:hover:bg-zinc-900/60 border border-slate-700/50 text-secondary rounded text-[11px] font-medium transition-colors">
                      <FileText className="w-3 h-3" />Certification Report
                    </button>
                    <button onClick={() => setWorkforceAnalyticsOpen(true)} className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100/80 dark:bg-zinc-900/30 hover:bg-slate-200 dark:hover:bg-zinc-900/60 border border-slate-700/50 text-secondary rounded text-[11px] font-medium transition-colors">
                      <BarChart3 className="w-3 h-3" />Workforce Analytics
                    </button>
                    <button className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100/80 dark:bg-zinc-900/30 hover:bg-slate-200 dark:hover:bg-zinc-900/60 border border-slate-700/50 text-secondary rounded text-[11px] font-medium transition-colors">
                      <Download className="w-3 h-3" />Import Roster
                    </button>
                  </div>
                </div>

                {/* ── AI Staffing Recommendations ─────────────── */}
                <div className="mb-4 bg-slate-900 dark:bg-black border border-slate-700/60 rounded-xl p-4">
                  <div className="flex items-center gap-2.5 mb-3">
                    <div className="w-7 h-7 rounded-lg bg-blue-500/15 border border-blue-500/25 flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm font-bold text-white">AI Staffing Recommendations</h3>
                      <p className="text-[10px] text-slate-400 break-words">Recommended actions, ranked by operational impact — not just problems, the moves that fix them</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
                    {aiStaffingRecommendations.map(rec => {
                      const Icon = rec.icon;
                      const actioned = !!actionedRecommendations[rec.id];
                      return (
                        <div key={rec.id} className="flex flex-col bg-slate-800/40 border border-slate-700/50 rounded-lg p-3.5">
                          <div className="flex items-start gap-2.5 mb-2.5">
                            <div className="w-7 h-7 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0">
                              <Icon className="w-3.5 h-3.5 text-blue-400" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-[12px] font-semibold text-white leading-snug break-words">{rec.title}</p>
                              <p className="text-[10px] text-slate-400 mt-1 leading-relaxed break-words">{rec.rationale}</p>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-1.5 mb-3">
                            {rec.impacts.map((impact, idx) => (
                              <span key={idx} className={`px-2 py-0.5 rounded-full border text-[9px] font-medium ${getImpactToneClasses(impact.tone)}`}>
                                {impact.label}
                              </span>
                            ))}
                          </div>
                          <button
                            onClick={() => handleRecommendationAction(rec)}
                            disabled={actioned}
                            className={`mt-auto w-full flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-colors ${
                              actioned
                                ? 'bg-emerald-500/15 border border-emerald-500/25 text-emerald-400 cursor-default'
                                : 'bg-amber-500 hover:bg-amber-600 text-slate-900'
                            }`}
                          >
                            {actioned ? (
                              <>
                                <CheckCircle className="w-3 h-3" />
                                Action Queued
                              </>
                            ) : (
                              <>
                                {rec.actionLabel}
                                <ArrowRight className="w-3 h-3" />
                              </>
                            )}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* ── Table Toolbar ──────────────────────────── */}
                <div className="mb-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                  <div className="flex-1 relative min-w-0">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
                    <input
                      type="text"
                      placeholder="Search name, badge, division, rank..."
                      className="w-full pl-9 pr-3 py-2 bg-slate-100/80 dark:bg-zinc-900/30 border border-border rounded text-[11px] text-primary placeholder-slate-600 focus:outline-none focus:border-amber-500/40 transition-all"
                    />
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => setFiltersOpen(!filtersOpen)}
                      className="flex items-center gap-1.5 px-3 py-2 bg-slate-100/80 dark:bg-zinc-900/30 border border-border rounded text-[11px] text-secondary hover:text-primary transition-colors"
                    >
                      <Filter className="w-3 h-3" />Filters
                    </button>
                    <button className="flex items-center gap-1.5 px-3 py-2 bg-slate-100/80 dark:bg-zinc-900/30 border border-border rounded text-[11px] text-secondary hover:text-primary transition-colors">
                      <Download className="w-3 h-3" />Export
                    </button>
                  </div>
                </div>

                {filtersOpen && (
                  <div className="mb-3 bg-slate-50 dark:bg-zinc-900/35 border border-border dark:border-slate-700/30 rounded p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-semibold text-secondary uppercase tracking-wider">Filters</span>
                      <button className="text-[10px] text-amber-700 dark:text-amber-400 hover:text-amber-300">Clear</button>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <select className="px-2.5 py-1.5 bg-white dark:bg-zinc-950/40 border border-slate-700/50 rounded text-[11px] text-primary focus:outline-none focus:border-amber-500/40">
                        <option>All Divisions</option>
                        <option>Patrol</option>
                        <option>Investigations</option>
                        <option>Detention</option>
                        <option>Dispatch</option>
                        <option>School Resource</option>
                      </select>
                      <select className="px-2.5 py-1.5 bg-white dark:bg-zinc-950/40 border border-slate-700/50 rounded text-[11px] text-primary focus:outline-none focus:border-amber-500/40">
                        <option>All Ranks</option>
                        <option>Deputy Sheriff</option>
                        <option>Senior Deputy</option>
                        <option>Sergeant</option>
                        <option>Lieutenant</option>
                      </select>
                      <select className="px-2.5 py-1.5 bg-white dark:bg-zinc-950/40 border border-slate-700/50 rounded text-[11px] text-primary focus:outline-none focus:border-amber-500/40">
                        <option>All Status</option>
                        <option>On Duty</option>
                        <option>Off Duty</option>
                        <option>On Leave</option>
                      </select>
                      <select className="px-2.5 py-1.5 bg-white dark:bg-zinc-950/40 border border-slate-700/50 rounded text-[11px] text-primary focus:outline-none focus:border-amber-500/40">
                        <option>All Certs</option>
                        <option>Current</option>
                        <option>Expiring</option>
                        <option>Expired</option>
                      </select>
                    </div>
                  </div>
                )}


                {/* ═══════════════════════════════════════════════
                     OPERATIONAL PERSONNEL TABLE
                     Grouped by deployability. Collapsible sections.
                     ═══════════════════════════════════════════════ */}
                <div className="space-y-2">
                  {groupedPersonnel.map(group => {
                    const isCollapsed = collapsedGroups[group.key];
                    return (
                      <div key={group.key} className="border border-border rounded overflow-hidden">
                        {/* Group Header — clickable to collapse */}
                        <button
                          onClick={() => toggleGroup(group.key)}
                          className={`w-full px-3 py-2 flex items-center gap-2 transition-colors ${
                            group.color === 'red' ? 'bg-red-500/[0.04] hover:bg-red-500/[0.07] border-b border-red-500/10' :
                            group.color === 'orange' ? 'bg-orange-500/[0.03] hover:bg-orange-500/[0.06] border-b border-orange-500/10' :
                            'bg-green-500/[0.02] hover:bg-green-500/[0.04] border-b border-green-500/10'
                          }`}
                        >
                          <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                            group.color === 'red' ? 'bg-red-500' : group.color === 'orange' ? 'bg-orange-500' : 'bg-green-500'
                          }`}></div>
                          <span className={`text-[11px] font-bold uppercase tracking-wider ${
                            group.color === 'red' ? 'text-red-700 dark:text-red-400' : group.color === 'orange' ? 'text-orange-600 dark:text-orange-400' : 'text-green-600 dark:text-green-400'
                          }`}>{group.label}</span>
                          <span className="text-[10px] text-slate-500">({group.count})</span>
                          <ChevronRight className={`w-3 h-3 text-slate-700 ml-auto transition-transform ${isCollapsed ? '' : 'rotate-90'}`} />
                        </button>

                        {!isCollapsed && (
                          <>
                            {/* Column Headers — desktop only; mobile rows are stacked cards instead */}
                            <div className="hidden lg:grid grid-cols-[1fr_80px_100px_90px_1fr_1fr_90px] gap-1 px-3 py-1.5 bg-slate-50 dark:bg-zinc-950/30 border-b border-border text-[9px] font-semibold text-slate-500 uppercase tracking-wider">
                              <span>Personnel</span>
                              <span>Division</span>
                              <span>Deployability</span>
                              <span>Coverage</span>
                              <span>Risk</span>
                              <span>Recommended Action</span>
                              <span className="text-right">Actions</span>
                            </div>

                            {/* Personnel Rows */}
                            {group.people.map(person => {
                              const opStatus = getOperationalStatus(person);
                              const OpIcon = opStatus.icon;
                              const covConfig = getCoverageConfig(person.coverageImpact);

                              return (
                                <div
                                  key={person.id}
                                  className={`flex flex-col gap-2 lg:grid lg:grid-cols-[1fr_80px_100px_90px_1fr_1fr_90px] lg:gap-1 lg:items-start px-3 py-3.5 border-b border-border hover:bg-slate-50 dark:hover:bg-slate-50 dark:hover:bg-zinc-900/15 transition-colors ${
                                    opStatus.color === 'red' ? 'bg-red-500/[0.02]' :
                                    opStatus.color === 'orange' ? 'bg-orange-500/[0.01]' : ''
                                  }`}
                                >
                                  {/* Personnel */}
                                  <div
                                    className="flex items-center gap-2.5 cursor-pointer group min-w-0"
                                    onClick={() => openQuickPeek(person)}
                                  >
                                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 text-[11px] font-bold ${
                                      opStatus.color === 'red' ? 'bg-red-500/15 text-red-700 dark:text-red-400' :
                                      opStatus.color === 'orange' ? 'bg-orange-500/15 text-orange-600 dark:text-orange-400' :
                                      'bg-slate-50 dark:bg-zinc-800/40 text-slate-500'
                                    }`}>
                                      {person.photo}
                                    </div>
                                    <div className="min-w-0 flex-1">
                                      <p className="text-[11px] font-semibold text-amber-700 dark:text-amber-400 group-hover:text-amber-600 dark:group-hover:text-amber-300 transition-colors break-words lg:truncate">{person.name}</p>
                                      <p className="text-[10px] text-slate-500">{person.rank} &middot; <span className="font-mono">{person.badge}</span></p>
                                    </div>
                                  </div>

                                  {/* Division + Deployability + Coverage — grouped on mobile, separate columns on desktop */}
                                  <div className="flex items-start gap-3 flex-wrap lg:contents">
                                    {/* Division */}
                                    <div className="pt-0.5">
                                      <p className="text-[10px] text-secondary">{person.division}</p>
                                      <p className="text-[9px] text-slate-700">{person.shift}</p>
                                    </div>

                                    {/* Deployability */}
                                    <div className="pt-0.5">
                                      <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded border text-[9px] font-bold w-fit ${
                                        opStatus.color === 'red' ? 'bg-red-100 border-red-200 text-red-700 dark:bg-red-500/10 dark:border-red-500/20 dark:text-red-400' :
                                        opStatus.color === 'orange' ? 'bg-orange-100 border-orange-200 text-orange-600 dark:bg-orange-500/10 dark:border-orange-500/20 dark:text-orange-400' :
                                        'bg-green-100 border-green-200 text-green-700 dark:bg-green-500/10 dark:border-green-500/20 dark:text-green-400'
                                      }`}>
                                        <OpIcon className="w-3 h-3" />
                                        {opStatus.label}
                                      </div>
                                      {/* Restriction reason for non-deployable/restricted */}
                                      {person.restrictionReason && (
                                        <p className="text-[9px] text-red-700 dark:text-red-400/70 mt-0.5">{person.restrictionReason}</p>
                                      )}
                                    </div>

                                    {/* Coverage Impact */}
                                    <div className="pt-1">
                                      <span className={`text-[10px] font-bold ${covConfig.color}`}>{covConfig.label}</span>
                                    </div>
                                  </div>

                                  {/* Risk */}
                                  <div className="pt-0.5">
                                    {person.risk ? (
                                      <div className="flex items-start gap-1">
                                        <AlertTriangle className="w-3 h-3 text-orange-600 dark:text-orange-400 mt-0.5 flex-shrink-0" />
                                        <p className="text-[10px] text-orange-600 dark:text-orange-400 break-words min-w-0">{person.risk}</p>
                                      </div>
                                    ) : (
                                      <span className="text-[10px] text-slate-700">&mdash;</span>
                                    )}
                                  </div>

                                  {/* Recommended Action */}
                                  <div className="pt-0.5">
                                    {person.aiInsight ? (
                                      <div className="flex items-start gap-1">
                                        <ArrowRight className="w-3 h-3 text-secondary mt-0.5 flex-shrink-0" />
                                        <p className="text-[10px] text-secondary font-medium break-words min-w-0">{person.aiInsight}</p>
                                      </div>
                                    ) : (
                                      <span className="text-[10px] text-slate-700">&mdash;</span>
                                    )}
                                  </div>

                                  {/* Quick Actions */}
                                  <div className="flex items-center justify-start lg:justify-end gap-0.5 pt-0.5">
                                    <button
                                      onClick={() => openQuickPeek(person)}
                                      className="p-1.5 text-slate-500 hover:text-amber-600 dark:text-amber-400 hover:bg-amber-500/10 rounded transition-all"
                                      title="View Profile"
                                    >
                                      <Eye className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                      className="p-1.5 text-slate-500 hover:text-secondary hover:bg-slate-100 dark:hover:bg-zinc-800/30 rounded transition-all"
                                      title="Reassign"
                                    >
                                      <RefreshCw className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                      onClick={() => openScheduleTraining(person, person.certifications.find(c => c.status === 'expiring' || c.status === 'expired')?.name || null)}
                                      className="p-1.5 text-slate-500 hover:text-green-600 dark:text-green-400 hover:bg-green-500/10 rounded transition-all"
                                      title="Schedule Training"
                                    >
                                      <Calendar className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                      className="p-1.5 text-slate-500 hover:text-red-600 dark:text-red-400 hover:bg-red-500/10 rounded transition-all"
                                      title="Notify Supervisor"
                                    >
                                      <Flag className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                </div>
                              );
                            })}
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>




              {/* ═══ Right Panel — 3 Operational Widgets ═══ */}
              <div className="w-full xl:w-64 shrink-0 space-y-3">

                {/* Widget 1: Operational Coverage */}
                <div className="bg-slate-50 dark:bg-zinc-900/15 border border-border rounded p-3">
                  <div className="flex items-center gap-2 mb-2.5">
                    <Shield className="w-3.5 h-3.5 text-secondary" />
                    <span className="text-[11px] font-bold text-primary">Operational Coverage</span>
                  </div>
                  <div className="space-y-2">
                    {[
                      { division: 'Patrol', current: 64, required: 68, color: 'orange' },
                      { division: 'Investigations', current: 22, required: 24, color: 'green' },
                      { division: 'Detention', current: 49, required: 52, color: 'orange' },
                      { division: 'Dispatch', current: 24, required: 26, color: 'green' },
                    ].map((d, i) => (
                      <div key={i}>
                        <div className="flex items-center justify-between text-[10px] mb-0.5">
                          <span className="text-secondary">{d.division}</span>
                          <span className="text-secondary font-mono">{d.current}/{d.required}</span>
                        </div>
                        <div className="w-full h-1 bg-slate-200 dark:bg-zinc-900 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              d.current / d.required >= 0.95 ? 'bg-green-500' :
                              d.current / d.required >= 0.85 ? 'bg-orange-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${(d.current / d.required) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-2.5 pt-2 border-t border-border dark:border-slate-700/30 flex items-center justify-between text-[10px]">
                    <span className="text-slate-500">Total on duty:</span>
                    <span className="text-primary font-bold">127/170 (75%)</span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] mt-0.5">
                    <span className="text-slate-500">On leave:</span>
                    <span className="text-orange-600 dark:text-orange-400">8</span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] mt-0.5">
                    <span className="text-slate-500">Off duty:</span>
                    <span className="text-secondary">35</span>
                  </div>
                </div>

                {/* Widget 2: Certification Risk */}
                <div className="bg-slate-50 dark:bg-zinc-900/15 border border-orange-500/15 rounded p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-3.5 h-3.5 text-orange-600 dark:text-orange-400" />
                    <span className="text-[11px] font-bold text-primary">Certification Risk</span>
                  </div>
                  <div className="flex items-baseline gap-1.5 mb-2">
                    <span className="text-2xl font-bold text-orange-600 dark:text-orange-400">23</span>
                    <span className="text-[10px] text-slate-500">expiring</span>
                  </div>
                  <div className="space-y-1.5 text-[10px]">
                    <div className="flex justify-between">
                      <span className="text-secondary">Urgent (&lt;7 days):</span>
                      <span className="text-red-700 dark:text-red-400 font-bold">5</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-secondary">Next 30 days:</span>
                      <span className="text-orange-600 dark:text-orange-400 font-bold">12</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-secondary">Expired:</span>
                      <span className="text-red-700 dark:text-red-400 font-bold">6</span>
                    </div>
                  </div>
                  <div className="mt-2.5 pt-2 border-t border-red-500/10">
                    <p className="text-[9px] font-bold text-red-700 dark:text-red-400 uppercase tracking-wider mb-1">Operational Impact</p>
                    <p className="text-[10px] text-secondary">6 Patrol Deputies affected</p>
                    <p className="text-[10px] text-secondary">Coverage drops to <span className="text-red-700 dark:text-red-400 font-bold">69%</span></p>
                    <p className="text-[10px] text-secondary">Training required within <span className="text-orange-600 dark:text-orange-400 font-bold">21 days</span></p>
                  </div>
                  <button onClick={() => openScheduleTraining(personnel.find(p => p.id === 'P-2024-001'), 'CPR/First Aid')} className="mt-2.5 w-full px-2.5 py-1.5 bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/20 text-amber-700 dark:text-amber-400 rounded text-[10px] font-semibold transition-colors">
                    Schedule Training
                  </button>
                </div>

              </div>
            </div>
          </div>
        </div>

      {/* Quick Peek Drawer */}
      {quickPeekOpen && peekData && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            onClick={() => setQuickPeekOpen(false)}
          />
          <div className="relative w-full max-w-[480px] bg-white dark:bg-zinc-950 border-l border-border shadow-2xl overflow-y-auto">
            <div className="sticky top-0 bg-slate-900/95 backdrop-blur-xl border-b border-border p-6 z-10">
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-primary font-medium">{peekData.photo}</span>
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-lg font-semibold text-primary break-words">{peekData.name}</h3>
                    <p className="text-sm text-secondary">{peekData.rank}</p>
                  </div>
                </div>
                <button
                  onClick={() => setQuickPeekOpen(false)}
                  className="p-2 hover:bg-slate-100 dark:hover:bg-zinc-900/50 rounded-lg transition-colors flex-shrink-0"
                >
                  <X className="w-5 h-5 text-secondary" />
                </button>
              </div>
              <button onClick={() => { setQuickPeekOpen(false); openFullProfile(peekData); }} className="w-full px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-sm font-medium transition-colors">
                Open Full Profile
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Status */}
              <div>
                <div className={`flex items-center gap-2 px-3 py-2 border rounded-xl text-sm font-medium ${getStatusColor(peekData.status)}`}>
                  <div className="w-2 h-2 rounded-full bg-current"></div>
                  <span className="capitalize">{peekData.status.replace('-', ' ')}</span>
                </div>
              </div>

              {/* Key Info */}
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-slate-100/80 dark:bg-zinc-900/30 rounded-xl p-4 border border-slate-700/50">
                  <p className="text-xs text-secondary mb-1">Badge</p>
                  <p className="text-sm font-medium text-primary font-mono">{peekData.badge}</p>
                </div>
                <div className="bg-slate-100/80 dark:bg-zinc-900/30 rounded-xl p-4 border border-slate-700/50">
                  <p className="text-xs text-secondary mb-1">Division</p>
                  <p className="text-sm font-medium text-primary">{peekData.division}</p>
                </div>
                <div className="bg-slate-100/80 dark:bg-zinc-900/30 rounded-xl p-4 border border-slate-700/50">
                  <p className="text-xs text-secondary mb-1">Shift</p>
                  <p className="text-sm font-medium text-primary">{peekData.shift}</p>
                </div>
                <div className="bg-slate-100/80 dark:bg-zinc-900/30 rounded-xl p-4 border border-slate-700/50">
                  <p className="text-xs text-secondary mb-1">Tenure</p>
                  <p className="text-sm font-medium text-primary">{peekData.tenure}</p>
                </div>
              </div>

              {/* Contact */}
              <div>
                <h4 className="text-sm font-semibold text-primary mb-3">Contact</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-secondary">
                    <Mail className="w-4 h-4 text-secondary" />
                    <span>{peekData.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-secondary">
                    <Phone className="w-4 h-4 text-secondary" />
                    <span>{peekData.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-secondary">
                    <Users className="w-4 h-4 text-secondary" />
                    <span>Reports to: {peekData.supervisor}</span>
                  </div>
                </div>
              </div>

              {/* Certifications */}
              <div>
                <h4 className="text-sm font-semibold text-primary mb-3">Certifications</h4>
                <div className="space-y-2">
                  {peekData.certifications.map((cert, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-slate-100/80 dark:bg-zinc-900/30 rounded-lg border border-slate-700/50">
                      <div className="flex items-center gap-3">
                        {cert.status === 'current' ? (
                          <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                        ) : cert.status === 'expiring' ? (
                          <Clock className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                        ) : (
                          <AlertCircle className="w-4 h-4 text-red-700 dark:text-red-400" />
                        )}
                        <div>
                          <p className="text-sm text-primary">{cert.name}</p>
                          <p className="text-xs text-secondary">Expires: {cert.expires}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="pt-4 border-t border-border space-y-3">
                <button className="w-full flex items-center gap-3 px-4 py-3 bg-slate-100/80 dark:bg-zinc-900/30 hover:bg-slate-200 dark:hover:bg-zinc-900/60 border border-slate-700/50 hover:border-slate-600/50 rounded-xl text-primary transition-all">
                  <Mail className="w-5 h-5 text-secondary" />
                  <span className="text-sm font-medium">Send Message</span>
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 bg-slate-100/80 dark:bg-zinc-900/30 hover:bg-slate-200 dark:hover:bg-zinc-900/60 border border-slate-700/50 hover:border-slate-600/50 rounded-xl text-primary transition-all">
                  <Calendar className="w-5 h-5 text-amber-700 dark:text-amber-400" />
                  <span className="text-sm font-medium">View Schedule</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}




      {/* ── New workforce modals ── */}
      <ScheduleTrainingWorkflow
        isOpen={scheduleTrainingOpen}
        onClose={closeScheduleTraining}
        personnel={personnel}
        preselectedPerson={scheduleTrainingTarget?.person ?? null}
        preselectedCert={scheduleTrainingTarget?.certification ?? null}
      />
      <CertificationReport
        isOpen={certReportOpen}
        onClose={() => setCertReportOpen(false)}
        personnel={personnel}
        onScheduleTraining={(person, cert) => { setCertReportOpen(false); openScheduleTraining(person, cert); }}
      />
      <WorkforceAnalytics
        isOpen={workforceAnalyticsOpen}
        onClose={() => setWorkforceAnalyticsOpen(false)}
      />

      {/* Legacy panel block — replaced; keep sentinel comment only */}
      {false && scheduleTrainingOpen && scheduleTrainingTarget?.person && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            onClick={closeScheduleTraining}
          />
          <div className="relative w-full max-w-[440px] bg-white dark:bg-zinc-950 border-l border-border shadow-2xl overflow-y-auto">
            <div className="sticky top-0 bg-slate-900/95 backdrop-blur-xl border-b border-border p-6 z-10">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-green-500/15 border border-green-500/25 flex items-center justify-center">
                    <GraduationCap className="w-4 h-4 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-primary">Schedule Training</h3>
                    <p className="text-[11px] text-secondary">Connected to HR &bull; Training Management</p>
                  </div>
                </div>
                <button
                  onClick={closeScheduleTraining}
                  className="p-2 hover:bg-slate-100 dark:hover:bg-zinc-900/50 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-secondary" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-5">
              {!scheduleTrainingConfirmed ? (
                <>
                  {/* Pre-filled employee — no search required */}
                  <div>
                    <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-2">Employee</p>
                    <div className="flex items-center gap-3 p-3 bg-slate-100/80 dark:bg-zinc-900/30 border border-slate-700/50 rounded-xl">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-xs font-medium">{scheduleTrainingTarget.person.photo}</span>
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-primary">{scheduleTrainingTarget.person.name}</p>
                        <p className="text-xs text-secondary">{scheduleTrainingTarget.person.rank} &bull; Badge {scheduleTrainingTarget.person.badge} &bull; {scheduleTrainingTarget.person.division}</p>
                      </div>
                    </div>
                  </div>

                  {/* Pre-filled certification */}
                  <div>
                    <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-2">Certification</p>
                    <div className="flex items-center gap-2.5 p-3 bg-slate-100/80 dark:bg-zinc-900/30 border border-slate-700/50 rounded-xl">
                      {(() => {
                        const cert = scheduleTrainingTarget.person.certifications?.find(c => c.name === scheduleTrainingTarget.certification);
                        const iconClass = cert?.status === 'expired' ? 'text-red-700 dark:text-red-400' : cert?.status === 'expiring' ? 'text-orange-600 dark:text-orange-400' : 'text-slate-500';
                        return <Award className={`w-4 h-4 flex-shrink-0 ${iconClass}`} />;
                      })()}
                      <div className="min-w-0">
                        <p className="text-sm text-primary">{scheduleTrainingTarget.certification || 'General Certification Renewal'}</p>
                        {(() => {
                          const cert = scheduleTrainingTarget.person.certifications?.find(c => c.name === scheduleTrainingTarget.certification);
                          if (!cert) return null;
                          const textClass = cert.status === 'expired' ? 'text-red-700 dark:text-red-400' : cert.status === 'expiring' ? 'text-orange-600 dark:text-orange-400' : 'text-secondary';
                          return <p className={`text-xs ${textClass}`}>Currently {cert.status} &bull; Expires {cert.expires}</p>;
                        })()}
                      </div>
                    </div>
                  </div>

                  {/* Session selector */}
                  <div>
                    <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-2">Available Sessions</p>
                    <div className="space-y-2">
                      {[
                        { date: 'Mon, Jun 15 — 08:00', location: 'Training Annex B', seats: '6 seats open' },
                        { date: 'Wed, Jun 17 — 13:00', location: 'HQ Conference Room 2', seats: '3 seats open' },
                        { date: 'Fri, Jun 19 — 09:30', location: 'Training Annex A', seats: '8 seats open' },
                      ].map((session, idx) => (
                        <label key={idx} className="flex items-center gap-2.5 p-3 bg-slate-100/80 dark:bg-zinc-900/30 border border-slate-700/50 rounded-xl cursor-pointer hover:border-amber-500/40 transition-colors">
                          <input type="radio" name="trainingSession" defaultChecked={idx === 0} className="accent-amber-500" />
                          <div>
                            <p className="text-sm text-primary font-medium">{session.date}</p>
                            <p className="text-xs text-secondary">{session.location} &bull; {session.seats}</p>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => setScheduleTrainingConfirmed(true)}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold rounded-xl text-sm transition-colors"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Confirm &amp; Sync to HR
                  </button>
                  <p className="text-[10px] text-slate-500 text-center leading-relaxed">
                    Schedules the session and syncs the record to HR &gt; Training Management — {scheduleTrainingTarget.person.name.split(' ')[0]} won&apos;t need to be searched again.
                  </p>
                </>
              ) : (
                <div className="text-center py-6">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-green-500/15 border border-green-500/25 flex items-center justify-center">
                    <CheckCircle className="w-7 h-7 text-green-600 dark:text-green-400" />
                  </div>
                  <h4 className="text-base font-semibold text-primary mb-1">Training Scheduled</h4>
                  <p className="text-sm text-secondary mb-6">
                    {scheduleTrainingTarget.person.name}&rsquo;s {scheduleTrainingTarget.certification || 'training'} session is scheduled and synced to HR &gt; Training Management.
                  </p>
                  <div className="space-y-2">
                    <button
                      onClick={() => navigate(createPageUrl('TrainingCertifications'), { state: { employeeId: scheduleTrainingTarget.person.id, employeeName: scheduleTrainingTarget.person.name, certification: scheduleTrainingTarget.certification } })}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-100/80 dark:bg-zinc-900/30 hover:bg-slate-200 dark:hover:bg-zinc-900/60 border border-slate-700/50 text-secondary hover:text-primary rounded-xl text-sm font-medium transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      View in HR &gt; Training Management
                    </button>
                    <button
                      onClick={closeScheduleTraining}
                      className="w-full px-4 py-2.5 text-secondary hover:text-primary text-sm font-medium transition-colors"
                    >
                      Done
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Full Personnel Profile Modal */}
      {fullProfileOpen && fullProfileData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm"
            onClick={() => setFullProfileOpen(false)}
          />
          <div className="relative w-full max-w-5xl bg-white dark:bg-zinc-950 border border-border rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-slate-900/95 backdrop-blur-xl border-b border-border p-6 z-10">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-primary text-xl font-bold">{fullProfileData.photo}</span>
                  </div>
                  <div className="min-w-0">
                    <h2 className="text-2xl font-bold text-primary mb-1 break-words">{fullProfileData.name}</h2>
                    <div className="flex items-center gap-3 text-sm text-secondary flex-wrap">
                      <span>{fullProfileData.rank}</span>
                      <span>•</span>
                      <span className="font-mono">{fullProfileData.badge}</span>
                      <span>•</span>
                      <span>{fullProfileData.division}</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setFullProfileOpen(false)}
                  className="p-2 hover:bg-slate-100 dark:hover:bg-zinc-900/50 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6 text-secondary" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Main Info */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Status & Quick Info */}
                  <div className="bg-surface border border-border rounded-xl shadow-sm dark:shadow-none p-5">
                    <h3 className="text-lg font-bold text-primary mb-4">Status & Information</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <p className="text-xs text-secondary mb-1">Current Status</p>
                        <div className={`inline-flex items-center gap-2 px-3 py-1.5 border rounded-lg text-sm font-medium ${getStatusColor(fullProfileData.status)}`}>
                          <div className="w-2 h-2 rounded-full bg-current"></div>
                          <span className="capitalize">{fullProfileData.status.replace('-', ' ')}</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-secondary mb-1">Tenure</p>
                        <p className="text-sm font-medium text-primary">{fullProfileData.tenure}</p>
                      </div>
                      <div>
                        <p className="text-xs text-secondary mb-1">Shift Assignment</p>
                        <p className="text-sm font-medium text-primary">{fullProfileData.shift}</p>
                      </div>
                      <div>
                        <p className="text-xs text-secondary mb-1">Supervisor</p>
                        <p className="text-sm font-medium text-primary">{fullProfileData.supervisor}</p>
                      </div>
                      <div>
                        <p className="text-xs text-secondary mb-1">Last Check-in</p>
                        <p className="text-sm font-medium text-primary">{fullProfileData.lastCheckIn}</p>
                      </div>
                      <div>
                        <p className="text-xs text-secondary mb-1">Performance Rating</p>
                        <div className="flex items-center gap-2">
                          <Star className={`w-5 h-5 ${fullProfileData.performance >= 4.5 ? 'text-amber-700 dark:text-amber-400' : fullProfileData.performance >= 4.0 ? 'text-amber-700 dark:text-amber-400' : 'text-slate-500'}`} />
                          <span className={`text-lg font-bold ${fullProfileData.performance >= 4.5 ? 'text-amber-700 dark:text-amber-400' : fullProfileData.performance >= 4.0 ? 'text-amber-700 dark:text-amber-400' : 'text-slate-500'}`}>
                            {fullProfileData.performance.toFixed(1)}
                          </span>
                          <span className="text-xs text-secondary">/5.0</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Activity Stats */}
                  <div className="bg-surface border border-border rounded-xl shadow-sm dark:shadow-none p-5">
                    <h3 className="text-lg font-bold text-primary mb-4 flex items-center gap-2">
                      <Activity className="w-5 h-5 text-secondary" />
                      Activity Statistics (Last 30 Days)
                    </h3>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-white dark:bg-zinc-950/50 rounded-lg">
                        <p className="text-2xl font-bold text-primary">142</p>
                        <p className="text-xs text-secondary mt-1">Calls for Service</p>
                      </div>
                      <div className="text-center p-4 bg-white dark:bg-zinc-950/50 rounded-lg">
                        <p className="text-2xl font-bold text-primary">28</p>
                        <p className="text-xs text-secondary mt-1">Reports Written</p>
                      </div>
                      <div className="text-center p-4 bg-white dark:bg-zinc-950/50 rounded-lg">
                        <p className="text-2xl font-bold text-amber-700 dark:text-amber-400">12</p>
                        <p className="text-xs text-secondary mt-1">Arrests Made</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-6 mt-4">
                      <div className="text-center p-4 bg-white dark:bg-zinc-950/50 rounded-lg">
                        <p className="text-xl font-bold text-primary">8.5 hrs</p>
                        <p className="text-xs text-secondary mt-1">Avg Response Time</p>
                      </div>
                      <div className="text-center p-4 bg-white dark:bg-zinc-950/50 rounded-lg">
                        <p className="text-xl font-bold text-indigo-400">97%</p>
                        <p className="text-xs text-secondary mt-1">Case Closure Rate</p>
                      </div>
                    </div>
                  </div>

                  {/* Certifications & Training */}
                  <div className="bg-surface border border-border rounded-xl shadow-sm dark:shadow-none p-5">
                    <h3 className="text-lg font-bold text-primary mb-4 flex items-center gap-2">
                      <Award className="w-5 h-5 text-secondary" />
                      Certifications & Training History
                    </h3>
                    <div className="space-y-3">
                      {fullProfileData.certifications.map((cert, idx) => (
                        <div key={idx} className={`p-4 rounded-lg border ${
                          cert.status === 'expired' ? 'bg-red-500/10 border-red-500/30' :
                          cert.status === 'expiring' ? 'bg-orange-500/10 border-orange-500/30' :
                          'bg-white dark:bg-zinc-950/50 border-slate-700/50'
                        }`}>
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-3">
                              {cert.status === 'current' ? (
                                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5" />
                              ) : cert.status === 'expiring' ? (
                                <Clock className="w-5 h-5 text-orange-600 dark:text-orange-400 mt-0.5" />
                              ) : (
                                <AlertCircle className="w-5 h-5 text-red-700 dark:text-red-400 mt-0.5" />
                              )}
                              <div>
                                <p className="text-sm font-semibold text-primary">{cert.name}</p>
                                <p className="text-xs text-secondary mt-1">Expires: {cert.expires}</p>
                                <p className="text-xs text-slate-500 mt-1">Last renewed: {new Date(cert.expires).getFullYear() - 2}-{new Date(cert.expires).getMonth() + 1}-{new Date(cert.expires).getDate()}</p>
                              </div>
                            </div>
                            <div>
                              {cert.status === 'expired' ? (
                                <span className="px-2 py-1 bg-red-500/20 border border-red-500/30 text-red-700 dark:text-red-400 text-xs rounded">Expired</span>
                              ) : cert.status === 'expiring' ? (
                                <span className="px-2 py-1 bg-orange-500/20 border border-orange-500/30 text-orange-600 dark:text-orange-400 text-xs rounded">Expiring Soon</span>
                              ) : (
                                <span className="px-2 py-1 bg-green-500/20 border border-green-500/30 text-green-600 dark:text-green-400 text-xs rounded">Current</span>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Performance Reviews */}
                  <div className="bg-surface border border-border rounded-xl shadow-sm dark:shadow-none p-5">
                    <h3 className="text-lg font-bold text-primary mb-4 flex items-center gap-2">
                      <Star className="w-5 h-5 text-secondary" />
                      Performance Reviews
                    </h3>
                    <div className="space-y-3">
                      <div className="p-4 bg-white dark:bg-zinc-950/50 rounded-lg border border-slate-700/50">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-primary">2024 Annual Review</span>
                          <div className="flex items-center gap-2">
                            <Star className="w-4 h-4 text-amber-700 dark:text-amber-400" />
                            <span className="text-sm font-bold text-amber-700 dark:text-amber-400">{fullProfileData.performance.toFixed(1)}/5.0</span>
                          </div>
                        </div>
                        <p className="text-xs text-secondary">Excellent performance in all areas. Demonstrates leadership and initiative.</p>
                        <p className="text-xs text-slate-500 mt-2">Reviewed by: {fullProfileData.supervisor} • Jan 15, 2024</p>
                      </div>
                      <div className="p-4 bg-white dark:bg-zinc-950/50 rounded-lg border border-slate-700/50">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-primary">2023 Annual Review</span>
                          <div className="flex items-center gap-2">
                            <Star className="w-4 h-4 text-amber-700 dark:text-amber-400" />
                            <span className="text-sm font-bold text-amber-700 dark:text-amber-400">{(fullProfileData.performance - 0.2).toFixed(1)}/5.0</span>
                          </div>
                        </div>
                        <p className="text-xs text-secondary">Strong work ethic and dedication to duty. Continues to improve.</p>
                        <p className="text-xs text-slate-500 mt-2">Reviewed by: {fullProfileData.supervisor} • Jan 12, 2023</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column - Contact & Equipment */}
                <div className="space-y-6">
                  {/* Contact Information */}
                  <div className="bg-surface border border-border rounded-xl shadow-sm dark:shadow-none p-5">
                    <h3 className="text-lg font-bold text-primary mb-4">Contact</h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs text-secondary mb-1">Email</p>
                        <a href={`mailto:${fullProfileData.email}`} className="flex items-center gap-2 text-sm text-secondary hover:text-primary transition-colors">
                          <Mail className="w-4 h-4" />
                          <span>{fullProfileData.email}</span>
                        </a>
                      </div>
                      <div>
                        <p className="text-xs text-secondary mb-1">Phone</p>
                        <a href={`tel:${fullProfileData.phone}`} className="flex items-center gap-2 text-sm text-secondary hover:text-primary transition-colors">
                          <Phone className="w-4 h-4" />
                          <span>{fullProfileData.phone}</span>
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Equipment Assignments */}
                  <div className="bg-surface border border-border rounded-xl shadow-sm dark:shadow-none p-5">
                    <h3 className="text-lg font-bold text-primary mb-4 flex items-center gap-2">
                      <Shield className="w-5 h-5 text-secondary" />
                      Equipment
                    </h3>
                    <div className="space-y-3">
                      <div className="p-3 bg-white dark:bg-zinc-950/50 rounded-lg">
                        <p className="text-xs text-secondary">Vehicle</p>
                        <p className="text-sm font-medium text-primary">Unit #{fullProfileData.badge.split('-')[1]}</p>
                        <p className="text-xs text-slate-500 mt-1">2023 Ford Police Interceptor</p>
                      </div>
                      <div className="p-3 bg-white dark:bg-zinc-950/50 rounded-lg">
                        <p className="text-xs text-secondary">Radio</p>
                        <p className="text-sm font-medium text-primary">Motorola APX 8000</p>
                        <p className="text-xs text-slate-500 mt-1">ID: R-{fullProfileData.id.split('-')[2]}</p>
                      </div>
                      <div className="p-3 bg-white dark:bg-zinc-950/50 rounded-lg">
                        <p className="text-xs text-secondary">Body Camera</p>
                        <p className="text-sm font-medium text-primary">Axon Body 3</p>
                        <p className="text-xs text-slate-500 mt-1">ID: BC-{fullProfileData.badge.split('-')[1]}</p>
                      </div>
                      <div className="p-3 bg-white dark:bg-zinc-950/50 rounded-lg">
                        <p className="text-xs text-secondary">Firearm</p>
                        <p className="text-sm font-medium text-primary">Glock 17 Gen5</p>
                        <p className="text-xs text-slate-500 mt-1">Serial: G{fullProfileData.id.split('-')[2]}</p>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="bg-surface border border-border rounded-xl shadow-sm dark:shadow-none p-5">
                    <h3 className="text-lg font-bold text-primary mb-4">Actions</h3>
                    <div className="space-y-2">
                      <button className="w-full flex items-center gap-3 px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-sm font-medium transition-colors">
                        <UserCircle className="w-4 h-4" />
                        <span>Edit Profile</span>
                      </button>
                      <button onClick={() => { setFullProfileOpen(false); openScheduleTraining(fullProfileData, fullProfileData.certifications.find(c => c.status === 'expiring' || c.status === 'expired')?.name || null); }} className="w-full flex items-center gap-3 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors">
                        <Calendar className="w-4 h-4" />
                        <span>Schedule Training</span>
                      </button>
                      <button className="w-full flex items-center gap-3 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors">
                        <Briefcase className="w-4 h-4" />
                        <span>Assign to Case</span>
                      </button>
                      <button className="w-full flex items-center gap-3 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors">
                        <Mail className="w-4 h-4" />
                        <span>Send Message</span>
                      </button>
                      <button className="w-full flex items-center gap-3 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors">
                        <Download className="w-4 h-4" />
                        <span>Download Full Record</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

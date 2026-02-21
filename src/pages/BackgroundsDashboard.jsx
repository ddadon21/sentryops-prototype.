import React, { useState, useEffect } from 'react';
import { LayoutDashboard, FolderOpen, FileText, Clock, UserCheck, Calendar, FileCheck, CheckCircle, TrendingUp, AlertTriangle, DollarSign, Eye, Activity, XCircle, Shield, X, Download, Filter, ChevronDown, ChevronRight, MessageCircle, ClipboardCheck, Scale, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import DashboardLayout from '../layouts/DashboardLayout';
import {
  MetricCard, MetricRow, SectionContainer, AlertStrip, AlertStripCompact, PageHeader,
  SURFACE, SPACING, TYPE, STATUS_DOT, STATUS_DOT_MUTED, STATUS_TEXT,
  DOT_SIZE, DOT_SIZE_SMALL
} from '../components/shared';

// ── BI module config for shared layout ────────────────────────

const biNavigation = [
  { id: 'bi-dashboard', label: 'Investigations Command Overview', icon: LayoutDashboard, route: '/bi/dashboard' },
  { id: 'active-cases', label: 'Open Investigations', icon: FolderOpen, route: '/bi/active' },
  { id: 'case-management', label: 'Investigation Case Files', icon: FileText, route: '/bi/cases' },
  { id: 'investigation-timeline', label: 'Case Activity & Audit Log', icon: Clock, route: '/bi/timeline' },
  { id: 'subject-records', label: 'Applicant Records', icon: UserCheck, route: '/bi/subjects' },
  { id: 'interview-scheduling', label: 'Interview Coordination', icon: Calendar, route: '/bi/interviews' },
  { id: 'evidence-tracking', label: 'Documentation & Evidence', icon: FileCheck, route: '/bi/evidence' },
  { id: 'reference-checks', label: 'Reference Verification', icon: CheckCircle, route: '/bi/references' },
  { id: 'employment-verification', label: 'Employment Confirmation', icon: TrendingUp, route: '/bi/employment' },
  { id: 'criminal-history', label: 'Criminal Record Adjudication', icon: AlertTriangle, route: '/bi/criminal' },
  { id: 'financial-background', label: 'Financial Risk Review', icon: DollarSign, route: '/bi/financial' },
  { id: 'social-media', label: 'Digital Footprint Review', icon: Eye, route: '/bi/social' },
  { id: 'bi-reports', label: 'Adjudication Reports', icon: Activity, route: '/bi/reports' },
  { id: 'case-closure', label: 'Final Determinations', icon: XCircle, route: '/bi/closure' }
];

const biProfile = {
  name: 'BI Supervisor',
  role: 'Background Investigations',
  email: 'bi.supervisor@gcso.gov',
  initials: 'BI'
};

const biNotifications = [
  { id: 1, title: 'Investigation Finalized', message: 'Marcus Johnson — Deputy Sheriff cleared', time: '15 min ago', urgent: false },
  { id: 2, title: 'Criminal Record Flag', message: 'Robert Martinez — requires supervisor adjudication', time: '1 hour ago', urgent: true },
  { id: 3, title: 'Employment Gap Identified', message: 'Lisa Chen — 6-month gap documented', time: '2 hours ago', urgent: true },
  { id: 4, title: 'Reference Interview Due', message: '3 reference calls scheduled today', time: '3 hours ago', urgent: true },
  { id: 5, title: 'Case Deadline Approaching', message: 'Thompson case — 5 days remaining', time: '4 hours ago', urgent: false }
];

// ── Component ─────────────────────────────────────────────────

export default function BackgroundsDashboard() {
  const navigate = useNavigate();
  const [chatOpen, setChatOpen] = useState(false);
  const [timeRange, setTimeRange] = useState('month');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [supervisorReviewVisible, setSupervisorReviewVisible] = useState(true);
  const [filterOpen, setFilterOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterOpen && !event.target.closest('.filter-container')) {
        setFilterOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [filterOpen]);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  };

  const metrics = {
    activeCases: 47,
    pendingReview: 12,
    completedThisMonth: 28,
    avgCompletionDays: 14.5,
    casesWithConcerns: 8,
    overdueItems: 3,
    referencesPending: 15,
    clearedForHire: 22,
    notRecommended: 6,
    interviewsToday: 8,
    slaTarget: 18,
    awaitingSupervisorSignOff: 5,
    avgSupervisorWait: 1.2,
    slaBreachCases: 2,
    avgCaseAge: 11.3
  };

  const investigationStages = [
    { stage: 'Application Review', count: 12, description: 'Initial documentation review' },
    { stage: 'Reference Interviews', count: 15, description: '8 scheduled today' },
    { stage: 'Employment Verification', count: 8, description: '3 awaiting employer response' },
    { stage: 'Background Checks', count: 7, description: 'Criminal, financial, digital footprint' },
    { stage: 'Supervisor Review', count: 5, description: 'Final adjudication pending' }
  ];

  const recentActivity = [
    { id: 1, type: 'complete', message: 'Investigation finalized — Elena Rodriguez cleared for hire as Background Investigator', time: '30 min ago', detail: 'Case #BI-2024-0847', user: 'Inv. Smith' },
    { id: 2, type: 'flag', message: 'Documented concern — David Kim financial background requires supervisor adjudication', time: '2 hours ago', detail: 'Case #BI-2024-0863', user: 'Inv. Wilson' },
    { id: 3, type: 'interview', message: 'Reference interview completed — Marcus Johnson, former supervisor contacted', time: '3 hours ago', detail: 'Case #BI-2024-0831', user: 'Inv. Davis' },
    { id: 4, type: 'new', message: 'New investigation initiated — Sarah Chen applying for Detention Officer position', time: '5 hours ago', detail: 'Case #BI-2024-0892', user: 'System' },
    { id: 5, type: 'update', message: 'Employment confirmation received — Robert Martinez, Metro PD confirmed 3-year tenure', time: '1 day ago', detail: 'Case #BI-2024-0844', user: 'Inv. Smith' }
  ];

  const supervisorReviewCases = [
    { id: 1, subject: 'Marcus Johnson', issueType: 'Criminal Record Flag', severity: 'high', daysOpen: 12, nextAction: 'Supervisor adjudication', detail: 'Prior misdemeanor arrest (2019), requires adjudication review', caseNumber: 'BI-2024-0831' },
    { id: 2, subject: 'Robert Martinez', issueType: 'Criminal Record Flag', severity: 'high', daysOpen: 9, nextAction: 'Supervisor adjudication', detail: 'Discrepancy in disclosed vs. documented history', caseNumber: 'BI-2024-0844' },
    { id: 3, subject: 'David Kim', issueType: 'Financial Risk', severity: 'high', daysOpen: 7, nextAction: 'Supervisor adjudication', detail: 'Outstanding debt exceeds threshold ($47,500)', caseNumber: 'BI-2024-0863' },
    { id: 4, subject: 'Jennifer Lopez', issueType: 'Financial Risk', severity: 'medium', daysOpen: 5, nextAction: 'Supervisor adjudication', detail: 'Recent bankruptcy filing requires evaluation', caseNumber: 'BI-2024-0871' },
    { id: 5, subject: 'Lisa Chen', issueType: 'Employment Discrepancy', severity: 'medium', daysOpen: 4, nextAction: 'Supervisor adjudication', detail: '6-month gap in employment history unexplained', caseNumber: 'BI-2024-0856' }
  ];

  const priorityCases = [
    { id: 1, subject: 'Marcus Johnson', position: 'Deputy Sheriff', stage: 'Supervisor Review', daysOpen: 12, priority: 'high', investigator: 'Inv. Smith', nextAction: 'Supervisor sign-off needed', caseNumber: 'BI-2024-0831' },
    { id: 2, subject: 'Lisa Martinez', position: 'Background Investigator', stage: 'Reference Verification', daysOpen: 8, priority: 'high', investigator: 'Inv. Wilson', nextAction: 'Attempt alternate contacts', caseNumber: 'BI-2024-0856' },
    { id: 3, subject: 'David Chen', position: 'Deputy Sheriff', stage: 'Financial Risk Review', daysOpen: 15, priority: 'medium', investigator: 'Inv. Smith', nextAction: 'Request documentation', caseNumber: 'BI-2024-0819' },
    { id: 4, subject: 'Sarah Thompson', position: 'Detention Officer', stage: 'Employment Confirmation', daysOpen: 5, priority: 'low', investigator: 'Inv. Davis', nextAction: 'Follow up Friday', caseNumber: 'BI-2024-0878' }
  ];

  const upcomingDeadlines = [
    { id: 1, subject: 'Marcus Johnson', task: 'Supervisor adjudication decision', dueDate: 'Today', daysLeft: 0, caseNumber: 'BI-2024-0831', compliance: 'POST certification timeline', urgencyGroup: 'today' },
    { id: 2, subject: 'Lisa Martinez', task: 'Complete reference interviews (3 remaining)', dueDate: 'Tomorrow', daysLeft: 1, caseNumber: 'BI-2024-0856', compliance: 'Hiring deadline: Dec 15', urgencyGroup: 'tomorrow' },
    { id: 3, subject: 'David Chen', task: 'Financial documentation review', dueDate: 'Dec 5', daysLeft: 3, caseNumber: 'BI-2024-0819', compliance: 'SLA: 18 days max', urgencyGroup: '3day' },
    { id: 4, subject: 'Sarah Thompson', task: 'Employment confirmation follow-up', dueDate: 'Dec 8', daysLeft: 6, caseNumber: 'BI-2024-0878', compliance: 'Standard SLA', urgencyGroup: '7day' }
  ];

  return (
    <DashboardLayout
      navigation={biNavigation}
      profile={biProfile}
      notifications={biNotifications}
      settingsRoute="/bi/settings"
    >
      <div className="p-5 lg:p-8">
        <div className="max-w-7xl mx-auto space-y-8">

          {/* Page Header — uses shared PageHeader */}
          <PageHeader
            title="Investigations Command Overview"
            subtitle={
              <>
                <span>{formatDate(currentTime)}</span>
                <span className="text-slate-700">·</span>
                <span>{formatTime(currentTime)} EST</span>
                <span className="text-slate-700">·</span>
                <span>Updated 2 minutes ago</span>
              </>
            }
            actions={
              <>
                <button className="flex items-center gap-2 px-4 py-2 bg-slate-800/40 border border-slate-700/40 text-slate-300 rounded-lg text-[13px] font-medium hover:bg-slate-800/60 transition-all">
                  <Download className="w-4 h-4" />
                  Export Report
                </button>
                <div className="relative filter-container">
                  <button
                    onClick={() => setFilterOpen(!filterOpen)}
                    className="flex items-center gap-2 px-4 py-2 bg-slate-800/40 border border-slate-700/40 text-slate-300 rounded-lg text-[13px] font-medium hover:bg-slate-800/60 transition-all"
                  >
                    <Filter className="w-4 h-4" />
                    Filter
                    <ChevronDown className="w-3 h-3" />
                  </button>
                  {filterOpen && (
                    <div className="absolute right-0 top-full mt-2 w-48 bg-slate-900/95 backdrop-blur-xl border border-slate-700/50 rounded-lg shadow-2xl z-50 py-1">
                      <button className="w-full text-left px-4 py-2 text-[13px] text-slate-300 hover:bg-slate-800/50">All Cases</button>
                      <button className="w-full text-left px-4 py-2 text-[13px] text-slate-300 hover:bg-slate-800/50">With Concerns</button>
                      <button className="w-full text-left px-4 py-2 text-[13px] text-slate-300 hover:bg-slate-800/50">Pending Review</button>
                      <button className="w-full text-left px-4 py-2 text-[13px] text-slate-300 hover:bg-slate-800/50">Overdue</button>
                    </div>
                  )}
                </div>
                <select
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="px-4 py-2 bg-slate-800/40 border border-slate-700/40 rounded-lg text-slate-300 text-[13px] focus:outline-none focus:border-slate-600"
                >
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                  <option value="quarter">This Quarter</option>
                  <option value="year">This Year</option>
                </select>
              </>
            }
          />

          {/* Adjudication Exposure Console */}
          <div className={`flex items-center gap-6 px-5 py-3.5 ${SURFACE.card}`} style={{ borderRadius: '0.5rem' }}>
            <div className="flex items-center gap-2.5">
              <div className={`${DOT_SIZE_SMALL} ${STATUS_DOT_MUTED.critical}`}></div>
              <span className={`${TYPE.body} font-semibold`}>Cases Awaiting Sign-Off:</span>
              <span className="text-[13px] font-bold text-white">{metrics.awaitingSupervisorSignOff}</span>
            </div>
            <div className="h-4 w-px bg-slate-600/40"></div>
            <div className="flex items-center gap-2.5">
              <span className={`${TYPE.body} font-semibold`}>Avg Wait:</span>
              <span className="text-[13px] font-bold text-white">{metrics.avgSupervisorWait} days</span>
            </div>
            <div className="h-4 w-px bg-slate-600/40"></div>
            <div className="flex items-center gap-2.5">
              <div className={`${DOT_SIZE_SMALL} ${STATUS_DOT_MUTED.critical}`}></div>
              <span className={`${TYPE.body} font-semibold`}>SLA Breach:</span>
              <span className="text-[13px] font-bold text-white">{metrics.slaBreachCases}</span>
            </div>
            <div className="h-4 w-px bg-slate-600/40"></div>
            <div className="flex items-center gap-2.5">
              <span className={`${TYPE.body} font-semibold`}>Avg Case Age:</span>
              <span className="text-[13px] font-bold text-white">{metrics.avgCaseAge} days</span>
            </div>
          </div>

          {/* Supervisor Review Required — uses AlertStrip */}
          {supervisorReviewVisible && (
            <AlertStrip
              severity="critical"
              dismissible
              onDismiss={() => setSupervisorReviewVisible(false)}
            >
              <div className="-mt-1.5 -ml-3">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <h4 className={TYPE.h3}>Supervisor Review Required</h4>
                    <span className={TYPE.meta}>{supervisorReviewCases.length} pending</span>
                  </div>
                  <button
                    onClick={() => navigate(createPageUrl('CaseManagement'))}
                    className="text-[13px] text-slate-400 hover:text-slate-300 font-medium"
                  >
                    Review All Pending →
                  </button>
                </div>

                <div className="space-y-1">
                  {supervisorReviewCases.map(caseItem => (
                    <div key={caseItem.id} className={`flex items-center gap-4 px-4 py-2.5 ${SURFACE.row} rounded border-l-[3px] ${
                      caseItem.severity === 'high' ? 'border-l-red-800/50' : 'border-l-amber-700/40'
                    }`}>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3">
                          <span className="text-[13px] font-semibold text-white">{caseItem.subject}</span>
                          <span className={TYPE.meta}>{caseItem.caseNumber}</span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1">{caseItem.detail}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <span className={TYPE.meta}>{caseItem.issueType}</span>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`${DOT_SIZE_SMALL} ${caseItem.severity === 'high' ? STATUS_DOT_MUTED.critical : STATUS_DOT_MUTED.warning}`}></span>
                          <span className={TYPE.meta}>{caseItem.daysOpen} days open</span>
                        </div>
                      </div>
                      <div className="flex-shrink-0">
                        <span className="text-xs text-slate-400">{caseItem.nextAction}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AlertStrip>
          )}

          {/* Investigation Status Summary — uses SectionContainer */}
          <SectionContainer
            title="Investigation Status Summary"
            headerRight={<span className={TYPE.meta}>Last sync: 2 min ago</span>}
          >
            <div className="mb-5">
              <div className="flex items-center gap-2 mb-2.5">
                <div className={`${DOT_SIZE_SMALL} ${STATUS_DOT_MUTED.critical}`}></div>
                <h5 className={TYPE.h3}>REQUIRES ACTION</h5>
              </div>
              <div className="space-y-1.5 text-[13px]">
                <div className="flex items-start gap-3 pl-4">
                  <span className="text-slate-600 flex-shrink-0">•</span>
                  <p className="text-slate-400"><span className="text-white font-medium">3 overdue items</span> — Reference checks pending for Thompson, Davis, Williams</p>
                </div>
                <div className="flex items-start gap-3 pl-4">
                  <span className="text-slate-600 flex-shrink-0">•</span>
                  <p className="text-slate-400"><span className="text-white font-medium">5 cases with documented concerns</span> — Awaiting supervisor adjudication</p>
                </div>
                <div className="flex items-start gap-3 pl-4">
                  <span className="text-slate-600 flex-shrink-0">•</span>
                  <p className="text-slate-400"><span className="text-white font-medium">2 compliance deadlines</span> — POST certification expires in 48 hours</p>
                </div>
              </div>
            </div>

            <div className="mb-5">
              <div className="flex items-center gap-2 mb-2.5">
                <div className={`${DOT_SIZE_SMALL} ${STATUS_DOT_MUTED.warning}`}></div>
                <h5 className={TYPE.h3}>IN PROGRESS</h5>
              </div>
              <div className="space-y-1.5 text-[13px]">
                <div className="flex items-start gap-3 pl-4">
                  <span className="text-slate-600 flex-shrink-0">•</span>
                  <p className="text-slate-400"><span className="text-white font-medium">47 active investigations</span> — 12 initial review, 15 reference checks, 8 verifications, 7 history review, 5 final review</p>
                </div>
                <div className="flex items-start gap-3 pl-4">
                  <span className="text-slate-600 flex-shrink-0">•</span>
                  <p className="text-slate-400"><span className="text-white font-medium">15 reference checks pending</span> — 8 interviews scheduled today</p>
                </div>
                <div className="flex items-start gap-3 pl-4">
                  <span className="text-slate-600 flex-shrink-0">•</span>
                  <p className="text-slate-400"><span className="text-white font-medium">12 awaiting supervisor review</span> — Average wait: 1.2 days</p>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2.5">
                <div className={`${DOT_SIZE_SMALL} ${STATUS_DOT_MUTED.neutral}`}></div>
                <h5 className={TYPE.h3}>COMPLETED THIS MONTH</h5>
              </div>
              <div className="space-y-1.5 text-[13px]">
                <div className="flex items-start gap-3 pl-4">
                  <span className="text-slate-600 flex-shrink-0">•</span>
                  <p className="text-slate-400"><span className="text-white font-medium">28 investigations finalized</span> — 22 cleared for hire, 6 not recommended</p>
                </div>
                <div className="flex items-start gap-3 pl-4">
                  <span className="text-slate-600 flex-shrink-0">•</span>
                  <p className="text-slate-400"><span className="text-white font-medium">14.5 day average turnaround</span> — 3.5 days ahead of 18-day SLA target</p>
                </div>
                <div className="flex items-start gap-3 pl-4">
                  <span className="text-slate-600 flex-shrink-0">•</span>
                  <p className="text-slate-400"><span className="text-white font-medium">On track for monthly target</span> — 28 of 35 projected (80%)</p>
                </div>
              </div>
            </div>
          </SectionContainer>

          {/* Compliance Risk Indicator — uses AlertStripCompact */}
          {metrics.slaBreachCases > 0 && (
            <AlertStripCompact severity="warning">
              <div>
                <p className="text-[13px] text-white"><span className="text-slate-400">Compliance Notice:</span> {metrics.slaBreachCases} case(s) have exceeded the 18-day SLA target.</p>
                <p className={`${TYPE.micro} mt-0.5`}>POST certification and hiring timelines may be affected.</p>
              </div>
            </AlertStripCompact>
          )}

          {/* Key Metrics Grid — uses shared MetricCard */}
          <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 ${SPACING.gridGap}`}>
            <MetricCard
              title="Active Investigations"
              value={metrics.activeCases}
              status="neutral"
              onClick={() => navigate(createPageUrl('ActiveCases'))}
            >
              <MetricRow label="Initial Review" value="12" />
              <MetricRow label="Reference Checks" value="15" />
              <MetricRow label="Pending Review" value={metrics.pendingReview} />
            </MetricCard>

            <MetricCard
              title="Documented Concerns"
              value={metrics.casesWithConcerns}
              status="critical"
              onClick={() => navigate(createPageUrl('CriminalHistoryReview'))}
            >
              <MetricRow label="Criminal History" value="3" />
              <MetricRow label="Financial Issues" value="3" />
              <MetricRow label="Employment Gaps" value="2" />
            </MetricCard>

            <MetricCard
              title="Completed This Month"
              value={metrics.completedThisMonth}
              status="neutral"
              onClick={() => navigate(createPageUrl('CaseClosure'))}
            >
              <MetricRow label="Cleared for Hire" value={metrics.clearedForHire} />
              <MetricRow label="Not Recommended" value={metrics.notRecommended} />
              <MetricRow label="Monthly Target" value="35" />
            </MetricCard>

            <MetricCard
              title="Avg Turnaround"
              value={metrics.avgCompletionDays}
              valueSuffix="days"
              status="neutral"
              onClick={() => navigate(createPageUrl('BIReports'))}
            >
              <MetricRow label="SLA Target" value={`${metrics.slaTarget} days`} />
              <MetricRow label="Ahead of Target" value="3.5 days" />
              <MetricRow label="Fastest This Month" value="8 days" />
            </MetricCard>
          </div>

          {/* Secondary Metrics — uses shared MetricCard (sm size) */}
          <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 ${SPACING.gridGap}`}>
            <MetricCard title="Today" value={metrics.interviewsToday} size="sm" status="neutral"
              subtext="Reference Interviews Scheduled"
              alert={{ text: 'Next: 10:30 AM — Thompson ref #2', severity: 'warning' }}
            />
            <MetricCard title="Pending" value={metrics.referencesPending} size="sm" status="warning"
              subtext="References Awaiting Contact"
              alert={{ text: 'Avg response time: 2.3 days', severity: 'warning' }}
            />
            <MetricCard title="Overdue" value={metrics.overdueItems} size="sm" status="critical"
              subtext="Overdue Items"
              alert={{ text: 'Oldest: 4 days — Johnson refs', severity: 'warning' }}
            />
            <MetricCard title="Queue" value={metrics.pendingReview} size="sm" status="neutral"
              subtext="Awaiting Supervisor Review"
              alert={{ text: 'Avg wait: 1.2 days', severity: 'warning' }}
            />
          </div>

          <div className={`grid grid-cols-1 lg:grid-cols-2 ${SPACING.gridGap}`}>
            {/* Investigation Pipeline — uses SectionContainer */}
            <SectionContainer
              title="Investigation Pipeline"
              subtitle={`47 total active — SLA Breach: ${metrics.slaBreachCases} case(s) — Avg Case Age: ${metrics.avgCaseAge} days`}
              headerRight={
                <button
                  onClick={() => navigate(createPageUrl('CaseManagement'))}
                  className="text-[13px] text-slate-400 hover:text-slate-300"
                >
                  View All →
                </button>
              }
            >
              <div className="space-y-3.5">
                {investigationStages.map((stage, idx) => {
                  const isBreaching = stage.stage === 'Supervisor Review';
                  return (
                    <div key={idx}>
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <span className={TYPE.body}>{stage.stage}</span>
                          <span className={TYPE.meta}>— {stage.description}</span>
                        </div>
                        <span className="text-[13px] font-semibold text-slate-300">{stage.count}</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-700/30 rounded-full overflow-hidden relative">
                        <div
                          className={`h-full rounded-full transition-all ${isBreaching ? 'bg-red-700/50' : 'bg-slate-500/40'}`}
                          style={{ width: `${(stage.count / 47) * 100}%` }}
                        />
                        {isBreaching && (
                          <div className="absolute top-0 bottom-0 w-px bg-red-600/40" style={{ left: '21%' }}></div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-4 pt-3 border-t border-slate-700/20 grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-slate-500">Avg Pipeline Time:</span>
                  <span className="text-slate-300 ml-2 font-medium">14.5 days</span>
                </div>
                <div>
                  <span className="text-slate-500">SLA Target:</span>
                  <span className="text-slate-300 ml-2 font-medium">{metrics.slaTarget} days</span>
                </div>
              </div>
            </SectionContainer>

            {/* Recent Activity — uses SectionContainer */}
            <SectionContainer
              title="Recent Activity"
              headerRight={<span className={TYPE.meta}>Last 24 hours</span>}
            >
              <div className="space-y-1">
                {recentActivity.map(activity => {
                  const statusDot = activity.type === 'flag' ? STATUS_DOT_MUTED.critical :
                    activity.type === 'complete' ? 'bg-slate-400/50' : STATUS_DOT_MUTED.neutral;
                  return (
                    <div key={activity.id} className={`flex items-start gap-3 px-4 py-2.5 ${SURFACE.row} rounded ${SURFACE.rowHover} transition-all cursor-pointer`}>
                      <div className={`${DOT_SIZE_SMALL} mt-[7px] flex-shrink-0 ${statusDot}`}></div>
                      <div className="flex-1 min-w-0">
                        <p className={TYPE.body}>{activity.message}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[11px] text-slate-500 font-medium">{activity.user}</span>
                          <span className="text-slate-700 text-[11px]">|</span>
                          <span className={TYPE.micro}>{activity.time}</span>
                          <span className="text-slate-700 text-[11px]">|</span>
                          <span className={TYPE.micro}>{activity.detail}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </SectionContainer>
          </div>

          {/* Priority Cases — uses SectionContainer */}
          <SectionContainer
            title="Priority Cases Requiring Action"
            headerRight={
              <button
                onClick={() => navigate(createPageUrl('ActiveCases'))}
                className="text-[13px] text-slate-400 hover:text-slate-300 font-medium"
              >
                View All →
              </button>
            }
          >
            <div className="space-y-1">
              {priorityCases.map(caseItem => (
                <div key={caseItem.id} className={`flex items-center gap-4 px-4 py-3 ${SURFACE.row} rounded ${SURFACE.rowHover} transition-all cursor-pointer`}>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-4">
                      <span className={`${DOT_SIZE_SMALL} flex-shrink-0 ${
                        caseItem.priority === 'high' ? STATUS_DOT_MUTED.critical :
                        caseItem.priority === 'medium' ? STATUS_DOT_MUTED.warning : STATUS_DOT_MUTED.neutral
                      }`}></span>
                      <span className="text-[13px] font-semibold text-white">{caseItem.subject}</span>
                      <span className={TYPE.micro}>{caseItem.caseNumber}</span>
                    </div>
                    <span className="text-[11px] text-slate-500 ml-[22px]">{caseItem.position}</span>
                  </div>
                  <div className="flex-shrink-0 text-center w-48">
                    <span className={TYPE.body}>{caseItem.stage}</span>
                    <div className={TYPE.micro}>{caseItem.daysOpen} days open</div>
                  </div>
                  <div className="flex-shrink-0 text-right w-56">
                    <span className="text-[13px] font-medium text-slate-200">{caseItem.nextAction}</span>
                    <div className={TYPE.micro}>{caseItem.investigator}</div>
                  </div>
                </div>
              ))}
            </div>
          </SectionContainer>

          {/* Upcoming Deadlines — uses SectionContainer */}
          <SectionContainer
            title="Upcoming Deadlines"
            headerRight={<span className={TYPE.meta}>Compliance and SLA-driven milestones</span>}
          >
            {['today', 'tomorrow', '3day', '7day'].map(group => {
              const items = upcomingDeadlines.filter(d => d.urgencyGroup === group);
              if (items.length === 0) return null;

              const groupConfig = {
                today: { label: 'Today', dot: STATUS_DOT_MUTED.critical, border: 'border-l-red-800/50' },
                tomorrow: { label: 'Tomorrow', dot: STATUS_DOT_MUTED.warning, border: 'border-l-amber-800/40' },
                '3day': { label: 'Within 3 Days', dot: STATUS_DOT_MUTED.neutral, border: 'border-l-slate-600/30' },
                '7day': { label: 'Within 7 Days', dot: 'bg-slate-600/40', border: 'border-l-slate-700/30' }
              }[group];

              return (
                <div key={group} className="mb-4 last:mb-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className={`${DOT_SIZE_SMALL} ${groupConfig.dot}`}></div>
                    <span className={TYPE.h3}>{groupConfig.label}</span>
                  </div>
                  {items.map(deadline => (
                    <div key={deadline.id} className={`flex items-center gap-4 px-4 py-2.5 ${SURFACE.row} rounded border-l-[3px] ${groupConfig.border} ml-3`}>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3">
                          <span className="text-[13px] font-medium text-white">{deadline.subject}</span>
                          <span className={TYPE.micro}>{deadline.caseNumber}</span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-0.5">{deadline.task}</p>
                      </div>
                      <div className="flex-shrink-0 text-right">
                        <span className="text-[13px] font-medium text-slate-300">{deadline.dueDate}</span>
                        <p className={TYPE.micro}>{deadline.compliance}</p>
                      </div>
                    </div>
                  ))}
                </div>
              );
            })}
          </SectionContainer>

          {/* Audit Log Footer */}
          <div className="px-5 py-3 bg-slate-800/10 border border-slate-800/30 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shield className="w-3.5 h-3.5 text-slate-600" />
                <span className="text-xs text-slate-600">All adjudication decisions logged with timestamp and user ID. Audit trail maintained per GCSO Policy 4.12.</span>
              </div>
              <button
                onClick={() => navigate(createPageUrl('InvestigationTimeline'))}
                className="text-xs text-slate-500 hover:text-slate-400"
              >
                View Audit Log
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Help Button */}
      <button
        onClick={() => setChatOpen(!chatOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-slate-700 hover:bg-slate-600 rounded-full shadow-lg flex items-center justify-center transition-all z-40"
      >
        {chatOpen ? <X className="w-6 h-6 text-white" /> : <MessageCircle className="w-6 h-6 text-slate-300" />}
      </button>

      {chatOpen && (
        <div className="fixed bottom-24 right-6 w-full max-w-96 bg-slate-900/95 backdrop-blur-xl border border-slate-700/50 rounded-xl shadow-2xl flex flex-col z-40 mx-4 sm:mx-0">
          <div className="p-4 border-b border-slate-700/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-slate-300" />
              </div>
              <div>
                <h3 className="text-[13px] font-semibold text-white">BI Support & Resources</h3>
                <p className={TYPE.meta}>Quick links and assistance</p>
              </div>
            </div>
          </div>
          <div className="p-4 space-y-2">
            <button className="w-full flex items-center gap-3 p-3 bg-slate-800/30 hover:bg-slate-800/50 rounded-lg transition-all text-left">
              <FileText className="w-5 h-5 text-slate-400" />
              <div>
                <p className="text-[13px] text-white font-medium">Investigation Guidelines</p>
                <p className={TYPE.meta}>POST standards & procedures</p>
              </div>
            </button>
            <button className="w-full flex items-center gap-3 p-3 bg-slate-800/30 hover:bg-slate-800/50 rounded-lg transition-all text-left">
              <ClipboardCheck className="w-5 h-5 text-slate-400" />
              <div>
                <p className="text-[13px] text-white font-medium">Adjudication Checklist</p>
                <p className={TYPE.meta}>Review requirements</p>
              </div>
            </button>
            <button className="w-full flex items-center gap-3 p-3 bg-slate-800/30 hover:bg-slate-800/50 rounded-lg transition-all text-left">
              <Phone className="w-5 h-5 text-slate-400" />
              <div>
                <p className="text-[13px] text-white font-medium">Contact IT Support</p>
                <p className={TYPE.meta}>Technical assistance</p>
              </div>
            </button>
            <button className="w-full flex items-center gap-3 p-3 bg-slate-800/30 hover:bg-slate-800/50 rounded-lg transition-all text-left">
              <Scale className="w-5 h-5 text-slate-400" />
              <div>
                <p className="text-[13px] text-white font-medium">Legal Reference</p>
                <p className={TYPE.meta}>Compliance documentation</p>
              </div>
            </button>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

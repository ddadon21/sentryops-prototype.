import React, { useState, useEffect } from 'react';
import {
  Award, UserPlus, Heart, Scale, ClipboardCheck, FileText, Download,
  AlertTriangle, FileWarning, MessageCircle, X, Send, Sparkles
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import DashboardLayout from '../layouts/DashboardLayout';
import { hrNavigation, hrProfile, hrNotifications } from '../config/hrConfig';
import {
  ExecutiveHeader, KPICard, CriticalAlerts, OperationalQueueCard,
  ExecutiveIntelligence, QuickActions, SupportingMetricCard
} from '../components/dashboard';

export default function HRDashboard() {
  const navigate = useNavigate();
  const [chatOpen, setChatOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (d) => d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
  const formatDate = (d) => d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
  const getGreeting = (d) => {
    const h = d.getHours();
    return h >= 5 && h < 12 ? 'Good morning' : h >= 12 && h < 17 ? 'Good afternoon' : h >= 17 && h < 21 ? 'Good evening' : 'Hey';
  };

  // ── Critical alerts (Level 1: executive summary, no case detail) ─────────
  const criticalAlerts = [
    { tone: 'critical', text: '3 POST certifications expire within 30 days — renewal required' },
    { tone: 'critical', text: '3 FMLA leave requests pending approval (1 past the 48-hour federal deadline)' },
    { tone: 'critical', text: '2 disciplinary hearings scheduled this week — documentation review required' },
    { tone: 'warning', text: 'Annual performance evaluations: 23 overdue (>90 days past due date)' },
  ];

  // ── Operational queues (Level 2 handoff — dashboard summarizes, the
  //    dedicated workspace page is where the underlying records live) ─────
  const operationalQueues = [
    {
      icon: Award, title: 'Certification Compliance', route: '/hr/training',
      stats: [
        { value: 3, label: 'Require Immediate Action', tone: 'critical' },
        { value: 8, label: 'Due Within 60 Days', tone: 'warning' },
      ],
    },
    {
      icon: UserPlus, title: 'New Hire Onboarding', route: '/hr/onboarding',
      stats: [
        { value: 3, label: 'Active Onboarding', tone: 'neutral' },
        { value: 3, label: 'Missing Documents', tone: 'warning' },
        { value: 8, label: 'Days to Next Start Date', tone: 'neutral' },
      ],
    },
    {
      icon: Heart, title: 'FMLA Leave Requests', route: '/hr/timeoff',
      stats: [
        { value: 3, label: 'Pending Review', tone: 'warning' },
        { value: 1, label: 'Overdue (Federal Deadline)', tone: 'critical' },
      ],
    },
    {
      icon: ClipboardCheck, title: 'Performance Reviews', route: '/hr/reviews',
      stats: [
        { value: 23, label: 'Overdue', tone: 'critical' },
        { value: 12, label: 'Due This Week', tone: 'warning' },
      ],
    },
    {
      icon: Scale, title: 'Disciplinary Hearings', route: '/hr/compliance',
      stats: [
        { value: 2, label: 'Scheduled This Week', tone: 'warning' },
      ],
    },
  ];

  // ── Executive Intelligence — daily-briefing style read of the workforce ──
  const intelligenceSummary = [
    'Staffing remains stable at 92.1% (164/178 authorized positions filled).',
    'Recruitment activity has increased — 47 active applicants for Deputy Sheriff I/II alone.',
    'Three POST certifications require immediate attention before their 30-day expiration window.',
    'FMLA requests increased this month, with one request past the 48-hour federal response deadline.',
    'Annual performance evaluations remain the highest compliance risk at 23 overdue (12.9%).',
  ];
  const intelligencePriorities = [
    'Resolve the overdue Deputy R. Martinez FMLA request today — the federal deadline has passed.',
    "Schedule Sgt. K. Thompson's POST recertification training before February 5.",
    'Clear the performance-evaluation backlog with Patrol and CID supervisors.',
  ];

  return (
    <DashboardLayout navigation={hrNavigation} profile={hrProfile} notifications={hrNotifications} settingsRoute="/hr/settings" profileRoute="/hr/profile" activityRoute="/hr/activity" activityModuleFilter="hr">
      <div className="p-5 lg:p-7 space-y-5 bg-slate-100 dark:bg-transparent min-h-full">

        <ExecutiveHeader
          title="Human Resources Operations Center"
          statusLabel="Systems Operational"
          metaItems={[
            { label: `${getGreeting(currentTime)}, Patricia` },
            { label: formatDate(currentTime) },
            { label: `${formatTime(currentTime)} EST` },
            { label: '5 critical items require attention', emphasis: true },
          ]}
        />

        {/* Executive KPIs (Agency/Module Health) */}
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">
          <KPICard accent="amber" label="HR Health Score" gauge={84} statusLabel="Moderate Risk" detail="FMLA backlog · 3 certs expiring · 23 evals overdue" />
          <KPICard accent="red" label="Critical Action Items" value={4} statusLabel="Immediate Action" detail="1 Cert · 1 FMLA Overdue · 2 Hearings" />
          <KPICard accent="amber" label="Staffing Readiness" value="92%" statusLabel="Watch Zone" detail="164/178 authorized · 14 vacant" />
          <KPICard accent="red" label="Evaluation Compliance" value="87%" statusLabel="23 Overdue" detail="155/178 annual evaluations completed" />
        </div>

        <CriticalAlerts alerts={criticalAlerts} />

        {/* High Priority Operational Queues */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <h2 className="text-[11px] font-black text-slate-900 dark:text-white uppercase tracking-widest">High Priority Operational Queues</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
            {operationalQueues.map((queue) => (
              <OperationalQueueCard key={queue.title} {...queue} onNavigate={navigate} />
            ))}
          </div>
        </div>

        <ExecutiveIntelligence
          summary={intelligenceSummary}
          priorities={intelligencePriorities}
          confidenceNote="Confidence: 91% · Model last trained on agency data 6h ago"
        />

        {/* Supporting Metrics (Level 1 informational — last 30 days) */}
        <div className="bg-white dark:bg-zinc-900/40 border border-border rounded-xl shadow-sm dark:shadow-none p-5">
          <h3 className="text-[11px] font-black text-slate-900 dark:text-white uppercase tracking-widest mb-4">Supporting Metrics — Last 30 Days</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <SupportingMetricCard title="STAFFING LEVELS" rows={[
              { label: 'Total Authorized', value: 178 },
              { label: 'Filled Positions', value: 164 },
              { label: 'Vacant Positions', value: '14 (12 sworn, 2 civilian)', tone: 'warning' },
              { label: 'Staffing Level', value: '92.1%' },
            ]} />
            <SupportingMetricCard title="RECRUITMENT" rows={[
              { label: 'Active Applicants', value: '47 (Deputy I/II)' },
              { label: 'Background Checks', value: '12 in progress' },
              { label: 'Avg BI Duration', value: '67 days' },
              { label: 'Conditional Offers', value: '3 pending start', tone: 'success' },
            ]} />
            <SupportingMetricCard title="RETENTION" rows={[
              { label: 'Turnover Rate', value: '2.3% (12-month)', tone: 'success' },
              { label: 'Separations (12 mo)', value: '4 (2 retire, 1 resign, 1 term)' },
              { label: 'Avg Tenure (Sworn)', value: '9.1 years' },
              { label: 'Avg Tenure (Civilian)', value: '5.2 years' },
            ]} />
            <SupportingMetricCard title="LEAVE MANAGEMENT" rows={[
              { label: 'FMLA Requests Pending', value: '3 (48-hr deadline)', tone: 'warning' },
              { label: 'Employees on Leave', value: '4 (3 FMLA, 1 Military)' },
              { label: 'Sick Leave (30 days)', value: '67 hours' },
              { label: 'Vacation (30 days)', value: '142 hours' },
            ]} />
            <SupportingMetricCard title="TRAINING COMPLIANCE" rows={[
              { label: 'POST Certifications', value: '152/152 (100%)', tone: 'success' },
              { label: 'Expiring <30 days', value: '3 deputies', tone: 'warning' },
              { label: 'Deputies in FTO', value: '3 (8-12 weeks)' },
              { label: 'Use of Force Recert Due', value: '23 (March 2026)' },
            ]} />
            <SupportingMetricCard title="WORKERS' COMP" rows={[
              { label: 'Active Claims', value: 8 },
              { label: 'New Claims (30 days)', value: 2 },
              { label: 'Total Paid (YTD)', value: '$12,450' },
              { label: 'Light Duty', value: '2 employees' },
            ]} />
          </div>
        </div>

        {/* Quick Actions */}
        <QuickActions actions={[
          { icon: FileText, label: 'Personnel Action Form', onClick: () => navigate(createPageUrl('EmployeeRecords')) },
          { icon: FileWarning, label: "Workers' Comp Incident", onClick: () => navigate(createPageUrl('EmployeeRecords')) },
          { icon: Scale, label: 'Disciplinary Action', onClick: () => navigate(createPageUrl('ComplianceManagement')) },
          { icon: Download, label: 'Compliance Audit Export', onClick: () => navigate(createPageUrl('HRReports')) },
        ]} />

      </div>

      {/* Chat Button */}
      <button
        onClick={() => setChatOpen(!chatOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110 z-50"
      >
        {chatOpen ? <X className="w-6 h-6 text-primary" /> : <MessageCircle className="w-6 h-6 text-primary" />}
      </button>

      {/* Chat Panel */}
      {chatOpen && (
        <div className="fixed bottom-24 right-6 w-full max-w-96 h-[500px] bg-surface-raised backdrop-blur-xl border border-border rounded-2xl shadow-2xl flex flex-col z-40 mx-4 sm:mx-0">
          <div className="p-4 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-primary">HR Assistant</h3>
                <p className="text-xs text-green-600 dark:text-green-400">Online</p>
              </div>
            </div>
          </div>
          <div className="flex-1 p-4 overflow-y-auto">
            <div className="flex gap-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1">
                <div className="bg-white dark:bg-zinc-900/60 p-3 rounded-xl">
                  <p className="text-sm text-slate-700 dark:text-slate-200">
                    Welcome to the HR Operations Center. I can help you with:
                  </p>
                  <ul className="text-sm text-secondary mt-2 space-y-1">
                    <li>• FMLA eligibility and documentation</li>
                    <li>• POST certification tracking</li>
                    <li>• Disciplinary process guidance</li>
                    <li>• Onboarding checklist compliance</li>
                    <li>• Policy and procedure questions</li>
                  </ul>
                  <p className="text-sm text-amber-300 mt-2">
                    Note: 3 FMLA requests require immediate attention (48-hour federal deadline).
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 border-t border-border">
            <div className="flex items-center gap-2">
              <input type="text" placeholder="Ask about HR compliance..." className="flex-1 px-4 py-2 bg-white dark:bg-zinc-900/40 border border-border rounded-xl text-primary placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-amber-500/50" />
              <button className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center">
                <Send className="w-5 h-5 text-primary" />
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

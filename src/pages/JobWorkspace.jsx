import React, { useState } from 'react';
import {
  ArrowLeft, Calendar, DollarSign, FileText, Users, TrendingUp, MessageCircle,
  X, Send, Sparkles, MapPin, Briefcase, Clock, AlertTriangle
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';
import { hrNavigation, hrProfile, hrNotifications } from '../config/hrConfig';
import { SectionHeader, StatusPill } from '../components/dashboard';
import { getJobPosting } from '../data/jobPostings';

const TONE_TEXT = {
  critical: 'text-red-700 dark:text-red-400',
  warning: 'text-amber-700 dark:text-amber-400',
  success: 'text-emerald-600 dark:text-emerald-400',
  neutral: 'text-primary',
};

const TONE_BG = {
  critical: 'bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800/40',
  warning: 'bg-amber-50 dark:bg-amber-950/15 border-amber-200 dark:border-amber-800/40',
  success: 'bg-emerald-50 dark:bg-emerald-950/15 border-emerald-200 dark:border-emerald-800/30',
};

function Card({ children, className = '' }) {
  return <div className={`bg-white dark:bg-zinc-900/40 border border-border rounded-xl p-5 ${className}`}>{children}</div>;
}

// Dedicated per-position workspace — the "managing" counterpart to the
// Job Postings executive overview's "monitoring" view. Surfaces the full
// detail that doesn't belong on the dashboard: pipeline, interviews,
// competitive analysis, salary analysis, recommendations, history, budget.
export default function JobWorkspace() {
  const navigate = useNavigate();
  const { jobId } = useParams();
  const [chatOpen, setChatOpen] = useState(false);
  const job = getJobPosting(jobId);

  if (!job) {
    return (
      <DashboardLayout navigation={hrNavigation} profile={hrProfile} notifications={hrNotifications} settingsRoute="/hr/settings" profileRoute="/hr/profile" activityRoute="/hr/activity" activityModuleFilter="hr">
        <div className="p-5 lg:p-7">
          <p className="text-secondary">Position not found.</p>
          <button onClick={() => navigate('/hr/jobs')} className="mt-3 text-amber-600 dark:text-amber-400 text-sm font-medium">← Back to Job Postings</button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout navigation={hrNavigation} profile={hrProfile} notifications={hrNotifications} settingsRoute="/hr/settings" profileRoute="/hr/profile" activityRoute="/hr/activity" activityModuleFilter="hr">
      <div className="p-5 lg:p-7 space-y-5 bg-slate-100 dark:bg-transparent min-h-full">

        <button onClick={() => navigate('/hr/jobs')} className="flex items-center gap-1.5 text-sm text-secondary hover:text-primary transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Job Postings
        </button>

        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-3 flex-wrap mb-1">
              <h1 className="text-2xl lg:text-3xl font-bold text-primary">{job.title}</h1>
              <StatusPill health={job.health} />
            </div>
            <p className="text-secondary flex items-center gap-1.5 text-sm">
              <Briefcase className="w-3.5 h-3.5" />{job.division} · {job.hiringAuthority}
              <MapPin className="w-3.5 h-3.5 ml-2" />{job.location}
            </p>
          </div>
          <button className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-white text-sm font-bold rounded-lg whitespace-nowrap">
            {job.primaryAction?.label}
          </button>
        </div>

        {job.competitiveAlert && (
          <div className={`border rounded-xl p-4 flex items-start gap-3 ${TONE_BG[job.competitiveAlert.tone] || TONE_BG.warning}`}>
            <AlertTriangle className={`w-5 h-5 mt-0.5 flex-shrink-0 ${TONE_TEXT[job.competitiveAlert.tone]}`} />
            <div>
              <p className={`text-sm font-bold ${TONE_TEXT[job.competitiveAlert.tone]}`}>{job.competitiveAlert.title}</p>
              <p className="text-sm text-secondary mt-0.5">{job.competitiveAlert.detail}</p>
            </div>
          </div>
        )}

        {/* Executive Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {job.metrics.map((m, i) => (
            <Card key={i} className="text-center">
              <p className={`text-2xl font-black tabular-nums ${TONE_TEXT[m.tone] || 'text-primary'}`}>{m.value}</p>
              <p className="text-xs text-secondary mt-1">{m.label}</p>
              {m.note && <p className="text-[11px] text-secondary/70 mt-0.5">{m.note}</p>}
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

          {/* Overview */}
          <Card>
            <SectionHeader icon={FileText} title="Overview" />
            <div className="space-y-2 text-sm">
              <div className="flex justify-between gap-3"><span className="text-secondary">Posted</span><span className="text-primary font-medium">{job.overview.postedDate}</span></div>
              <div className="flex justify-between gap-3"><span className="text-secondary">Timeline</span><span className="text-primary font-medium text-right">{job.overview.timelineNote}</span></div>
              <div className="flex justify-between gap-3"><span className="text-secondary">Salary Range</span><span className="text-primary font-medium">{job.overview.salaryRange}</span></div>
              {job.overview.shiftDifferential && (
                <div className="flex justify-between gap-3"><span className="text-secondary">Shift Differential</span><span className="text-primary font-medium">{job.overview.shiftDifferential}</span></div>
              )}
              <div className="flex justify-between gap-3"><span className="text-secondary">Classification</span><span className="text-primary font-medium text-right">{job.overview.classification}</span></div>
              <div className="flex justify-between gap-3"><span className="text-secondary">Work Location</span><span className="text-primary font-medium text-right">{job.overview.workLocation}</span></div>
            </div>
            {job.overview.qualifications && (
              <div className="mt-4 pt-4 border-t border-border">
                <p className="text-xs font-bold text-secondary uppercase tracking-wide mb-2">Minimum Qualifications</p>
                <ul className="text-sm text-secondary space-y-1">
                  {job.overview.qualifications.map((q, i) => <li key={i}>• {q}</li>)}
                </ul>
              </div>
            )}
            {job.overview.benefits && (
              <div className="mt-4 pt-4 border-t border-border">
                <p className="text-xs font-bold text-secondary uppercase tracking-wide mb-2">Benefits</p>
                <div className="space-y-1.5">
                  {job.overview.benefits.map((b, i) => (
                    <div key={i} className="flex justify-between gap-3 text-sm">
                      <span className="text-secondary">{b.label}</span>
                      <span className="text-primary font-medium text-right">{b.detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Card>

          {/* Applicant Pipeline */}
          <Card>
            <SectionHeader icon={TrendingUp} title="Applicant Pipeline" />
            {job.pipeline ? (
              <div className="space-y-3">
                {job.pipeline.map((stage, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-primary font-medium">{stage.stage}</span>
                      <span className="text-secondary">{stage.detail}</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                      <div className={`h-full ${stage.color}`} style={{ width: `${stage.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            ) : job.applicantBreakdown ? (
              <div className="grid grid-cols-1 gap-4 text-sm">
                <div>
                  <p className="text-xs font-bold text-secondary uppercase tracking-wide mb-2">Internal ({job.applicantBreakdown.internal.length})</p>
                  <ul className="text-secondary space-y-1">{job.applicantBreakdown.internal.map((p, i) => <li key={i}>• {p}</li>)}</ul>
                </div>
                <div>
                  <p className="text-xs font-bold text-secondary uppercase tracking-wide mb-2">External ({job.applicantBreakdown.external.length})</p>
                  <ul className="text-secondary space-y-1">{job.applicantBreakdown.external.map((p, i) => <li key={i}>• {p}</li>)}</ul>
                </div>
              </div>
            ) : (
              <p className="text-sm text-secondary">{job.applicants} applicants in the pool — no detailed stage breakdown recorded yet.</p>
            )}
          </Card>

          {/* Interview Schedule */}
          {job.interview && (
            <Card>
              <SectionHeader icon={Calendar} title="Interview Schedule" />
              <p className="text-sm font-bold text-primary">{job.interview.title}</p>
              <p className="text-sm text-secondary mt-1">{job.interview.date}</p>
              <p className="text-sm text-secondary">{job.interview.location}</p>
              {job.interview.panel && <p className="text-sm text-secondary mt-2">Panel: {job.interview.panel}</p>}
              <p className="text-sm text-primary font-medium mt-2 flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{job.interview.candidates}</p>
            </Card>
          )}

          {/* Competitive Analysis */}
          {job.competitive && (
            <Card>
              <SectionHeader icon={TrendingUp} title="Competitive Analysis" />
              <div className="space-y-2">
                {job.competitive.map((c, i) => (
                  <div key={i} className="flex items-center justify-between gap-3 text-sm py-1.5 border-b border-border last:border-0">
                    <span className="text-secondary">{c.agency}</span>
                    <div className="text-right">
                      <p className="text-primary font-medium">{c.salary}</p>
                      <p className={`text-xs ${TONE_TEXT[c.tone] || 'text-secondary'}`}>{c.delta}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Salary Analysis */}
          {job.salaryAnalysis && (
            <Card>
              <SectionHeader icon={DollarSign} title="Salary Analysis" />
              <p className="text-sm text-secondary">Range</p>
              <p className="text-lg font-bold text-primary">{job.salaryAnalysis.range}</p>
              <p className="text-sm text-amber-700 dark:text-amber-400 font-medium mt-2">{job.salaryAnalysis.verdict}</p>
              <p className="text-sm text-secondary mt-2">{job.salaryAnalysis.note}</p>
            </Card>
          )}

          {/* Root Cause Analysis */}
          {job.rootCause && (
            <Card>
              <SectionHeader icon={AlertTriangle} title="Root Cause Analysis" />
              <ul className="text-sm text-secondary space-y-2">
                {job.rootCause.map((r, i) => <li key={i}>• {r}</li>)}
              </ul>
            </Card>
          )}

          {/* AI Recommendations */}
          <Card>
            <SectionHeader icon={Sparkles} title="AI Recommendations" />
            <div className="space-y-2">
              {job.recommendations.map((r, i) => (
                <div key={i} className={`text-sm px-3 py-2 rounded-lg border ${TONE_BG[r.tone] || TONE_BG.warning}`}>
                  <span className={TONE_TEXT[r.tone] || 'text-primary'}>{r.text}</span>
                </div>
              ))}
            </div>
            {job.doNotProceedNote && (
              <p className="text-sm text-red-700 dark:text-red-400 font-bold mt-3 pt-3 border-t border-border">{job.doNotProceedNote}</p>
            )}
          </Card>

          {/* Hiring History */}
          <Card>
            <SectionHeader icon={Clock} title="Hiring History" />
            <div className="space-y-2">
              {job.history.map((h, i) => (
                <div key={i} className="flex gap-3 text-sm">
                  <span className="text-secondary whitespace-nowrap">{h.date}</span>
                  <span className="text-primary">{h.event}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Budget Impact */}
          <Card>
            <SectionHeader icon={DollarSign} title="Budget Impact" />
            <p className="text-lg font-bold text-primary">{job.budgetImpact.annualCostRange}</p>
            <p className="text-sm text-secondary mt-1">{job.budgetImpact.note}</p>
          </Card>

          {/* Documents */}
          <Card>
            <SectionHeader icon={FileText} title="Documents" />
            <ul className="text-sm text-secondary space-y-1.5">
              <li className="flex items-center gap-2"><FileText className="w-3.5 h-3.5" />Job Description — {job.title}.pdf</li>
              <li className="flex items-center gap-2"><FileText className="w-3.5 h-3.5" />Posting Approval Memo.pdf</li>
              <li className="flex items-center gap-2"><FileText className="w-3.5 h-3.5" />Salary Survey — Comparable Agencies.xlsx</li>
            </ul>
          </Card>

        </div>
      </div>

      {/* Chat Button */}
      <button
        onClick={() => setChatOpen(!chatOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110 z-50"
      >
        {chatOpen ? <X className="w-6 h-6 text-primary" /> : <MessageCircle className="w-6 h-6 text-primary" />}
      </button>

      {chatOpen && (
        <div className="fixed bottom-24 right-6 w-full max-w-96 h-[500px] bg-surface-raised backdrop-blur-xl border border-border rounded-2xl shadow-2xl flex flex-col z-40 mx-4 sm:mx-0">
          <div className="p-4 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-primary">GCSO Recruitment AI</h3>
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
                <div className="bg-white dark:bg-zinc-900/60 p-3 rounded-xl">
                  <p className="text-sm text-slate-700 dark:text-slate-200">Ask me about {job.title}'s pipeline, competitive pay, or recommended next steps.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 border-t border-border">
            <div className="flex items-center gap-2">
              <input type="text" placeholder="Ask about this position..." className="flex-1 px-4 py-2 bg-white dark:bg-zinc-900/40 border border-border rounded-xl text-primary placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500/50" />
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

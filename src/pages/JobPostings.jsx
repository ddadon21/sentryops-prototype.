import React, { useState } from 'react';
import { Briefcase, MessageCircle, X, Send, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';
import { hrNavigation, hrProfile, hrNotifications } from '../config/hrConfig';
import { ExecutiveHeader, ExecutiveIntelligence, JobCard } from '../components/dashboard';
import { jobPostings } from '../data/jobPostings';

// Executive Overview — each posting is monitored here as a Job Card
// (Position, Status, Vacancies, Applicants, Days Open, Hiring Health,
// Top 3 Risks, Primary Action). Full detail lives in the dedicated
// Job Workspace this page hands off to: "This page is for monitoring.
// The workspace is for managing."
export default function JobPostings() {
  const navigate = useNavigate();
  const [chatOpen, setChatOpen] = useState(false);

  const criticalJobs = jobPostings.filter(j => j.health === 'critical');
  const attentionJobs = jobPostings.filter(j => j.health === 'attention');
  const totalApplicants = jobPostings.reduce((sum, j) => sum + j.applicants, 0);
  const totalVacancies = jobPostings.reduce((sum, j) => sum + j.vacancies, 0);

  const hiringBrief = [
    `${criticalJobs.map(j => j.title).join(' and ')} ${criticalJobs.length > 1 ? 'postings are' : 'posting is'} at high risk of failing to fill.`,
    'Detention Officer hiring velocity is well below target — 8 applicants in 98 days for 1 vacancy.',
    'Deputy Sheriff I/II recruitment is on pace but constrained by a 12.8% salary gap with Gwinnett County Police.',
    'Recommend a salary review for civilian and detention positions — both trail comparable county and private-sector pay.',
  ];

  const sortedJobs = [...jobPostings].sort((a, b) => {
    const order = { critical: 0, attention: 1, healthy: 2 };
    return order[a.health] - order[b.health];
  });

  const openWorkspace = (jobId) => navigate(`/hr/jobs/${jobId}`);
  const handlePrimaryAction = () => {};

  return (
    <DashboardLayout navigation={hrNavigation} profile={hrProfile} notifications={hrNotifications} settingsRoute="/hr/settings" profileRoute="/hr/profile" activityRoute="/hr/activity" activityModuleFilter="hr">
      <div className="p-5 lg:p-7 space-y-5 bg-slate-100 dark:bg-transparent min-h-full">

        <ExecutiveHeader
          title="Job Postings — Executive Overview"
          statusLabel="Recruiting Active"
          metaItems={[
            { label: 'Gwinnett County Sheriff\'s Office' },
            { label: `${jobPostings.length} active postings` },
            { label: `${totalVacancies} vacancies · ${totalApplicants} applicants` },
            { label: `${criticalJobs.length} critical · ${attentionJobs.length} need attention`, emphasis: true },
          ]}
        />

        <ExecutiveIntelligence
          summary={hiringBrief}
          priorities={[
            'Extend the Administrative Assistant posting deadline before it closes in 9 days.',
            'Approve a salary review for Detention Officer and Administrative Assistant to close the pay gap.',
            'Proceed with the February 06 Deputy Sheriff oral boards (8 candidates scheduled).',
          ]}
          confidenceNote="Confidence: 88% · Today's Hiring Brief — model last trained on agency data 6h ago"
        />

        <div>
          <div className="flex items-center gap-2 mb-3">
            <Briefcase className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <h2 className="text-[11px] font-black text-slate-900 dark:text-white uppercase tracking-widest">Active Postings</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {sortedJobs.map((job) => (
              <JobCard key={job.id} job={job} onOpenWorkspace={openWorkspace} onPrimaryAction={handlePrimaryAction} />
            ))}
          </div>
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
                  <p className="text-sm text-slate-700 dark:text-slate-200">Hi! I can help analyze recruitment metrics, suggest salary adjustments based on competitive intelligence, draft job descriptions for GCSO positions, and recommend recruitment strategies. What would you like help with?</p>
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 border-t border-border">
            <div className="flex items-center gap-2">
              <input type="text" placeholder="Ask about GCSO recruitment..." className="flex-1 px-4 py-2 bg-white dark:bg-zinc-900/40 border border-border rounded-xl text-primary placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500/50" />
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

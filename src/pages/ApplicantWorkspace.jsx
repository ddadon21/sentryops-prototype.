import React, { useMemo, useState } from 'react';
import { ArrowLeft, Search, Sparkles, ArrowUpDown, Briefcase, MapPin } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';
import { hrNavigation, hrProfile, hrNotifications } from '../config/hrConfig';
import { SectionHeader, StagePill } from '../components/dashboard';
import { getJobPosting } from '../data/jobPostings';

const SORT_OPTIONS = [
  { key: 'ai', label: 'AI Rank (Best Match)' },
  { key: 'recent', label: 'Most Recent' },
  { key: 'name', label: 'Name (A-Z)' },
  { key: 'stage', label: 'Stage' },
];

// Drill-down list page: Job Workspace -> Applicant Workspace. Mirrors the
// "managing" workspace pattern used for jobs — search, sort, AI ranking,
// click through to an individual Applicant Profile.
export default function ApplicantWorkspace() {
  const navigate = useNavigate();
  const { jobId } = useParams();
  const job = getJobPosting(jobId);
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('ai');
  const [stageFilter, setStageFilter] = useState('all');

  const applicants = job?.applicantList || [];

  const stages = useMemo(() => {
    const set = new Set(applicants.map(a => a.stage));
    return ['all', ...Array.from(set)];
  }, [applicants]);

  const filtered = useMemo(() => {
    let list = applicants.filter(a =>
      a.name.toLowerCase().includes(query.toLowerCase()) &&
      (stageFilter === 'all' || a.stage === stageFilter)
    );
    const sorted = [...list];
    if (sort === 'ai') sorted.sort((a, b) => b.aiScore - a.aiScore);
    else if (sort === 'name') sorted.sort((a, b) => a.name.localeCompare(b.name));
    else if (sort === 'recent') sorted.sort((a, b) => new Date(b.appliedDate) - new Date(a.appliedDate));
    else if (sort === 'stage') sorted.sort((a, b) => a.stage.localeCompare(b.stage));
    return sorted;
  }, [applicants, query, sort, stageFilter]);

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

        <button onClick={() => navigate(`/hr/jobs/${job.id}`)} className="flex items-center gap-1.5 text-sm text-secondary hover:text-primary transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to {job.title}
        </button>

        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-primary">Applicants — {job.title}</h1>
          <p className="text-secondary flex items-center gap-1.5 text-sm mt-1">
            <Briefcase className="w-3.5 h-3.5" />{job.division}
            <MapPin className="w-3.5 h-3.5 ml-2" />{job.location}
            <span className="ml-2">· {applicants.length} total applicants</span>
          </p>
        </div>

        <div className="bg-white dark:bg-zinc-900/40 border border-border rounded-xl p-4 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-secondary absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search applicants by name..."
              className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-zinc-950/40 border border-border rounded-lg text-sm text-primary placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500/50"
            />
          </div>
          <select value={stageFilter} onChange={e => setStageFilter(e.target.value)} className="px-3 py-2 bg-slate-50 dark:bg-zinc-950/40 border border-border rounded-lg text-sm text-primary focus:outline-none focus:border-blue-500/50">
            {stages.map(s => <option key={s} value={s}>{s === 'all' ? 'All Stages' : s}</option>)}
          </select>
          <div className="relative">
            <select value={sort} onChange={e => setSort(e.target.value)} className="pl-8 pr-3 py-2 bg-slate-50 dark:bg-zinc-950/40 border border-border rounded-lg text-sm text-primary focus:outline-none focus:border-blue-500/50 appearance-none">
              {SORT_OPTIONS.map(o => <option key={o.key} value={o.key}>{o.label}</option>)}
            </select>
            {sort === 'ai' ? (
              <Sparkles className="w-4 h-4 text-amber-500 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            ) : (
              <ArrowUpDown className="w-4 h-4 text-secondary absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            )}
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900/40 border border-border rounded-xl p-5">
          <SectionHeader title={`Showing ${filtered.length} of ${applicants.length} applicants`} />
          <div className="divide-y divide-border">
            {filtered.map(a => (
              <button
                key={a.id}
                onClick={() => navigate(`/hr/jobs/${job.id}/applicants/${a.id}`)}
                className="w-full flex items-center justify-between gap-4 py-3 text-left hover:bg-slate-50 dark:hover:bg-zinc-800/40 -mx-2 px-2 rounded-lg transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-blue-500/10 text-blue-700 dark:text-blue-400 flex items-center justify-center text-xs font-black flex-shrink-0">
                    {a.name.split(' ').map(p => p[0]).join('').slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-primary">{a.name}</p>
                    <p className="text-xs text-secondary">Applied {a.appliedDate} · {a.source}{a.internal ? ' · Internal' : ''}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right hidden sm:block">
                    <p className="text-xs text-secondary">AI Score</p>
                    <p className="text-sm font-bold text-primary tabular-nums">{a.aiScore}</p>
                  </div>
                  <StagePill stage={a.stage} />
                </div>
              </button>
            ))}
            {filtered.length === 0 && (
              <p className="text-sm text-secondary py-6 text-center">No applicants match your search.</p>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

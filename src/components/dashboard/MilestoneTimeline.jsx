const STATUS_DOT = {
  done: 'bg-emerald-500',
  current: 'bg-amber-500 ring-4 ring-amber-500/20',
  upcoming: 'bg-slate-300 dark:bg-zinc-700',
};

// Chronological timeline used for Recruitment Timeline — replaces a flat
// list of dates so progress and what's next are visible at a glance.
export default function MilestoneTimeline({ milestones = [] }) {
  return (
    <div className="space-y-0">
      {milestones.map((m, i) => (
        <div key={i} className="flex gap-3">
          <div className="flex flex-col items-center">
            <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 mt-1 ${STATUS_DOT[m.status] || STATUS_DOT.upcoming}`} />
            {i < milestones.length - 1 && <div className="w-px flex-1 bg-border my-1" />}
          </div>
          <div className="pb-4">
            <p className={`text-sm font-bold ${m.status === 'current' ? 'text-amber-700 dark:text-amber-400' : 'text-primary'}`}>{m.label}</p>
            <p className="text-sm text-secondary">{m.date}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

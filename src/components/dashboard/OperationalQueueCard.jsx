import { ArrowRight } from 'lucide-react';

const TONE = {
  critical: 'text-red-700 dark:text-red-400',
  warning: 'text-amber-700 dark:text-amber-400',
  success: 'text-emerald-700 dark:text-emerald-400',
  neutral: 'text-primary',
};

// Executive summary card for a unit of operational work (certifications,
// onboarding, leave requests, reviews, hearings...). The dashboard shows the
// counts only — clicking "View Queue" hands off to the dedicated workspace
// page where the underlying records actually live. This is the level-1 →
// level-2 handoff in the progressive-disclosure model: dashboards summarize,
// workspaces contain the records.
export default function OperationalQueueCard({ icon: Icon, title, stats = [], route, onNavigate, ctaLabel = 'View Queue' }) {
  return (
    <div className="bg-white dark:bg-zinc-900/30 border border-slate-200 dark:border-slate-700/30 rounded-xl p-4 flex flex-col gap-3 h-full">
      <div className="flex items-center gap-2.5">
        {Icon && (
          <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center flex-shrink-0">
            <Icon className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          </div>
        )}
        <h4 className="text-[12px] font-bold text-slate-900 dark:text-white uppercase tracking-wide leading-tight">{title}</h4>
      </div>

      <div className="space-y-1 flex-1">
        {stats.map((stat, i) => (
          <div key={i} className="flex items-baseline gap-1.5">
            <span className={`text-sm font-black tabular-nums ${TONE[stat.tone] || TONE.neutral}`}>{stat.value}</span>
            <span className="text-[11px] text-slate-500">{stat.label}</span>
          </div>
        ))}
      </div>

      <button
        onClick={() => onNavigate?.(route)}
        className="w-full flex items-center justify-center gap-1.5 px-2.5 py-1.5 bg-slate-100 dark:bg-zinc-800/30 border border-slate-300 dark:border-slate-600/40 text-slate-700 dark:text-slate-300 rounded text-[11px] font-semibold hover:bg-slate-200 dark:hover:bg-zinc-800/50 transition-all"
      >
        {ctaLabel}<ArrowRight className="w-3 h-3" />
      </button>
    </div>
  );
}

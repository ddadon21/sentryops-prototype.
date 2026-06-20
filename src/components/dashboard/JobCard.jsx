import { Users, MapPin, Clock, ArrowRight, AlertTriangle } from 'lucide-react';
import StatusPill from './StatusPill';

const ICON_TONE = {
  blue: 'bg-blue-500/15 text-blue-600 dark:text-blue-400',
  purple: 'bg-purple-500/15 text-purple-600 dark:text-purple-400',
  amber: 'bg-amber-500/15 text-amber-600 dark:text-amber-400',
  red: 'bg-red-500/15 text-red-600 dark:text-red-400',
};

const HEALTH_BORDER = {
  healthy: 'border-border',
  attention: 'border-amber-300 dark:border-amber-700/40',
  critical: 'border-red-300 dark:border-red-700/50 ring-1 ring-red-500/10',
};

// Executive Overview job card — Position, Status, Vacancies, Applicants,
// Days Open, Hiring Health, Top 3 Risks, Primary Action. Full detail
// (pipeline, competitive analysis, salary, recommendations...) lives in
// the dedicated Job Workspace this card hands off to.
export default function JobCard({ job, onOpenWorkspace, onPrimaryAction }) {
  const isCritical = job.health === 'critical';

  return (
    <div className={`bg-white dark:bg-zinc-900/40 border rounded-xl p-5 flex flex-col gap-4 ${HEALTH_BORDER[job.health] || HEALTH_BORDER.healthy}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${ICON_TONE[job.iconColor] || ICON_TONE.blue}`}>
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-primary leading-tight">{job.title}</h3>
            <p className="text-xs text-secondary flex items-center gap-1 mt-0.5">
              <MapPin className="w-3 h-3" />{job.location}
            </p>
          </div>
        </div>
        <StatusPill health={job.health} />
      </div>

      <div className="grid grid-cols-3 gap-2">
        <div className="bg-slate-50 dark:bg-zinc-950/40 rounded-lg p-2 text-center">
          <p className="text-lg font-black text-primary tabular-nums">{job.vacancies}</p>
          <p className="text-[10px] text-secondary uppercase tracking-wide">Vacancies</p>
        </div>
        <div className="bg-slate-50 dark:bg-zinc-950/40 rounded-lg p-2 text-center">
          <p className="text-lg font-black text-primary tabular-nums">{job.applicants}</p>
          <p className="text-[10px] text-secondary uppercase tracking-wide">Applicants</p>
        </div>
        <div className="bg-slate-50 dark:bg-zinc-950/40 rounded-lg p-2 text-center">
          <p className="text-lg font-black text-primary tabular-nums">{job.daysOpen}</p>
          <p className="text-[10px] text-secondary uppercase tracking-wide">Days Open</p>
        </div>
      </div>

      {job.topRisks?.length > 0 && (
        <div className={`rounded-lg p-3 space-y-1.5 ${isCritical ? 'bg-red-50 dark:bg-red-950/20' : 'bg-amber-50 dark:bg-amber-950/15'}`}>
          {job.topRisks.slice(0, 3).map((risk, i) => (
            <div key={i} className="flex items-start gap-1.5">
              <AlertTriangle className={`w-3 h-3 mt-0.5 flex-shrink-0 ${isCritical ? 'text-red-600 dark:text-red-400' : 'text-amber-600 dark:text-amber-400'}`} />
              <p className={`text-xs ${isCritical ? 'text-red-800 dark:text-red-300' : 'text-amber-800 dark:text-amber-300'}`}>{risk}</p>
            </div>
          ))}
        </div>
      )}

      <div className="flex items-center gap-2 mt-auto pt-1">
        <button
          onClick={() => onOpenWorkspace?.(job.id)}
          className="flex-1 px-3 py-2 bg-slate-100 dark:bg-zinc-800/60 hover:bg-slate-200 dark:hover:bg-zinc-700/60 text-primary text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-colors"
        >
          View Position Workspace <ArrowRight className="w-3 h-3" />
        </button>
        <button
          onClick={() => onPrimaryAction?.(job)}
          className={`px-3 py-2 text-xs font-bold rounded-lg whitespace-nowrap transition-colors ${
            isCritical
              ? 'bg-red-600 hover:bg-red-500 text-white'
              : 'bg-amber-500 hover:bg-amber-400 text-white'
          }`}
        >
          {job.primaryAction?.label}
        </button>
      </div>
    </div>
  );
}

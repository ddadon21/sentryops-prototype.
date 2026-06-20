import { ChevronRight } from 'lucide-react';

// Funnel-style stage flow with counts at each step — replaces plain text
// so drop-off is visible at a glance. `stages` is [{ stage, count, detail }].
export default function PipelineFlow({ stages = [] }) {
  const max = Math.max(1, ...stages.map(s => s.count));

  return (
    <div className="flex flex-col md:flex-row items-stretch gap-2">
      {stages.map((s, i) => (
        <div key={s.stage} className="flex items-center flex-1 gap-2">
          <div className="flex-1 bg-slate-50 dark:bg-zinc-950/40 rounded-lg p-3 text-center">
            <p className="text-2xl font-black text-primary tabular-nums">{s.count}</p>
            <p className="text-[11px] font-bold text-secondary uppercase tracking-wide mt-1">{s.stage}</p>
            <p className="text-[11px] text-secondary/70 mt-0.5">{s.detail}</p>
            <div className="w-full h-1.5 bg-slate-200 dark:bg-zinc-800 rounded-full overflow-hidden mt-2">
              <div className="h-full bg-blue-500" style={{ width: `${(s.count / max) * 100}%` }} />
            </div>
          </div>
          {i < stages.length - 1 && (
            <ChevronRight className="w-4 h-4 text-secondary/50 hidden md:block flex-shrink-0" />
          )}
        </div>
      ))}
    </div>
  );
}

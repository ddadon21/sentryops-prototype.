// Shared "Executive Header" block for module dashboards (Command, HR, ...).
// Title + live meta line (greeting · date · time · pending-count) on the
// left, a system-status pill on the right. Layout/spacing is locked so every
// module's dashboard opens with the same visual rhythm.
export default function ExecutiveHeader({ title, metaItems = [], statusLabel = 'Systems Operational', statusTone = 'emerald' }) {
  const dotColor = {
    emerald: 'bg-emerald-500',
    amber: 'bg-amber-500',
    red: 'bg-red-500',
  }[statusTone] || 'bg-emerald-500';

  return (
    <div className="flex items-start justify-between gap-3">
      <div>
        <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">{title}</h1>
        <div className="flex items-center flex-wrap gap-x-2 gap-y-1 mt-1 text-[11px] text-slate-500">
          {metaItems.filter(Boolean).map((item, i) => (
            <span key={i} className="flex items-center gap-2">
              {i > 0 && <span>·</span>}
              <span className={item.emphasis ? 'text-amber-700 dark:text-amber-400 font-semibold' : 'font-semibold text-slate-700 dark:text-slate-300'}>
                {item.label}
              </span>
            </span>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white dark:bg-zinc-900/40 border border-slate-200 dark:border-slate-700/30 rounded-lg flex-shrink-0">
        <div className={`w-1.5 h-1.5 rounded-full ${dotColor}`}></div>
        <span className="text-[11px] font-medium text-slate-600 dark:text-slate-300 hidden sm:inline">{statusLabel}</span>
      </div>
    </div>
  );
}

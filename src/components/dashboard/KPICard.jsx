import HealthGauge from './HealthGauge';

// Locked accent system: amber = watch, red = critical, emerald = healthy.
const ACCENT = {
  amber: { border: 'border-amber-200/60 dark:border-amber-500/20', borderL: 'border-l-amber-500', tint: 'bg-amber-500/[0.03]', label: 'text-amber-700 dark:text-amber-400' },
  red: { border: 'border-red-200/60 dark:border-red-500/20', borderL: 'border-l-red-500', tint: 'bg-red-500/[0.03]', label: 'text-red-700 dark:text-red-400' },
  emerald: { border: 'border-emerald-200/60 dark:border-emerald-500/20', borderL: 'border-l-emerald-500', tint: 'bg-emerald-500/[0.03]', label: 'text-emerald-700 dark:text-emerald-400' },
};

// One of the 4 hero metric cards used by every module's Executive KPI row.
// Pass `gauge` (a 0-100 score) for the health-score variant, or `value` for
// a plain stat card — both share identical sizing/spacing/typography.
export default function KPICard({ accent = 'amber', label, value, gauge, statusLabel, detail }) {
  const a = ACCENT[accent] || ACCENT.amber;
  return (
    <div className={`bg-white dark:bg-zinc-900/30 border ${a.border} border-l-[3px] ${a.borderL} rounded-xl p-4 relative overflow-hidden`}>
      <div className={`absolute inset-0 ${a.tint} pointer-events-none`} />
      <p className={`text-[9px] font-black uppercase tracking-[0.15em] ${a.label} mb-2`}>{label}</p>
      {gauge != null ? (
        <div className="flex items-center gap-3">
          <HealthGauge score={gauge} />
          <div>
            {statusLabel && <p className={`text-[10px] font-black uppercase tracking-wide ${a.label}`}>{statusLabel}</p>}
            {detail && <p className="text-[9px] text-slate-500 mt-0.5 leading-relaxed">{detail}</p>}
          </div>
        </div>
      ) : (
        <>
          <p className="text-5xl font-black tabular-nums text-slate-900 dark:text-white leading-none mb-1">{value}</p>
          {statusLabel && <p className={`text-[10px] font-black uppercase tracking-wide ${a.label}`}>{statusLabel}</p>}
          {detail && <p className="text-[9px] text-slate-500 mt-0.5">{detail}</p>}
        </>
      )}
    </div>
  );
}

const TONE = {
  critical: 'text-red-700 dark:text-red-400 font-medium',
  warning: 'text-amber-700 dark:text-amber-400 font-medium',
  success: 'text-emerald-600 dark:text-emerald-400',
  neutral: 'text-primary font-medium',
};

// One box in the Supporting Metrics grid at the bottom of a module
// dashboard — informational, lower priority than the Operational Queues
// above it. `rows` is [{ label, value, tone }].
export default function SupportingMetricCard({ title, rows = [] }) {
  return (
    <div className="bg-white dark:bg-zinc-950/40 rounded-xl p-4">
      <h4 className="text-sm font-semibold text-secondary mb-3">{title}</h4>
      <div className="space-y-2 text-sm">
        {rows.map((row, i) => (
          <div key={i} className="flex justify-between gap-3">
            <span className="text-secondary">{row.label}</span>
            <span className={TONE[row.tone] || TONE.neutral}>{row.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

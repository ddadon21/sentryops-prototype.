const HEALTH = {
  healthy: { dot: '🟢', label: 'Healthy', cls: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20' },
  attention: { dot: '🟡', label: 'Needs Attention', cls: 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20' },
  critical: { dot: '🔴', label: 'Critical', cls: 'bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20' },
};

// Hiring-health indicator (🟢/🟡/🔴) — visible without opening anything.
export default function StatusPill({ health, label }) {
  const h = HEALTH[health] || HEALTH.healthy;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-bold whitespace-nowrap ${h.cls}`}>
      <span>{h.dot}</span>
      {label || h.label}
    </span>
  );
}

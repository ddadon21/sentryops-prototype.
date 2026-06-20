// Horizontal below/at/above-market indicator — executive understanding
// of competitive position within three seconds. `pct` 0-100, 50 = at market.
export default function MarketGauge({ pct = 50, position = 'At Market' }) {
  const tone = pct < 42 ? 'bg-red-500' : pct > 58 ? 'bg-emerald-500' : 'bg-amber-500';
  const text = pct < 42 ? 'text-red-700 dark:text-red-400' : pct > 58 ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-700 dark:text-amber-400';

  return (
    <div>
      <div className="relative w-full h-2.5 bg-gradient-to-r from-red-500/30 via-amber-500/30 to-emerald-500/30 rounded-full">
        <div
          className={`absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-white dark:border-zinc-900 ${tone}`}
          style={{ left: `calc(${Math.min(96, Math.max(2, pct))}% - 6px)` }}
        />
      </div>
      <div className="flex justify-between text-[10px] text-secondary uppercase tracking-wide mt-1">
        <span>Below Market</span>
        <span>At Market</span>
        <span>Above Market</span>
      </div>
      <p className={`text-sm font-bold mt-1.5 ${text}`}>{position}</p>
    </div>
  );
}

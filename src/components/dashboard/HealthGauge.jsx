// Radial health-score gauge shared by every module's Executive Header.
// Originally inlined in CommandDashboard; extracted so other modules render
// an identical gauge for their own health score.
export default function HealthGauge({ score, size = 56 }) {
  const r = 32, circ = 2 * Math.PI * r, filled = (score / 100) * circ;
  const color = score >= 85 ? '#22c55e' : score >= 70 ? '#f59e0b' : '#ef4444';
  return (
    <svg viewBox="0 0 80 80" style={{ width: size, height: size }} className="flex-shrink-0">
      <circle cx="40" cy="40" r={r} fill="none" strokeWidth="7" stroke="rgba(148,163,184,0.15)" />
      <circle cx="40" cy="40" r={r} fill="none" strokeWidth="7" stroke={color}
        strokeDasharray={`${filled} ${circ}`} strokeLinecap="round"
        transform="rotate(-90 40 40)" />
      <text x="40" y="37" textAnchor="middle" fontSize="16" fontWeight="900" fill={color}>{score}</text>
      <text x="40" y="52" textAnchor="middle" fontSize="8" fill="rgba(148,163,184,0.55)">/100</text>
    </svg>
  );
}

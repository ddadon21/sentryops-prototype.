import { AlertTriangle, AlertCircle } from 'lucide-react';

const TONE = {
  critical: { icon: AlertTriangle, text: 'text-red-700 dark:text-red-400' },
  warning: { icon: AlertCircle, text: 'text-amber-700 dark:text-amber-400' },
};

// Critical Alerts strip — sits directly under the Executive KPI row on every
// module dashboard. `alerts` is [{ tone: 'critical'|'warning', text }].
export default function CriticalAlerts({ alerts = [] }) {
  if (alerts.length === 0) return null;
  return (
    <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
      <div className="space-y-2">
        {alerts.map((alert, i) => {
          const t = TONE[alert.tone] || TONE.warning;
          const Icon = t.icon;
          return (
            <div key={i} className="flex items-center gap-2">
              <Icon className={`w-4 h-4 flex-shrink-0 ${t.text}`} />
              <span className={`text-sm font-medium ${t.text}`}>{alert.text}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

import React from 'react';
import { surface, alertStrip, type } from './tokens';

interface AlertStripProps {
  severity: 'critical' | 'warning' | 'info';
  children: React.ReactNode;
}

const borderMap: Record<string, string> = {
  critical: alertStrip.critical,
  warning:  alertStrip.warning,
  info:     alertStrip.info,
};

const dotMap: Record<string, string> = {
  critical: 'bg-red-700/60',
  warning:  'bg-amber-700/50',
  info:     'bg-slate-500/50',
};

export default function AlertStrip({ severity, children }: AlertStripProps) {
  return (
    <div className={`${surface.card} ${alertStrip.borderWidth} ${borderMap[severity]} px-5 py-3 mb-8`}>
      <div className="flex items-center gap-3">
        <div className={`w-1.5 h-1.5 ${dotMap[severity]} rounded-full flex-shrink-0`} />
        <div className={type.body}>{children}</div>
      </div>
    </div>
  );
}

import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import {
  SURFACE, SPACING, TYPE, DOT_SIZE,
  STATUS_DOT, STATUS_TEXT,
  type StatusSeverity
} from './tokens';

// ── MetricCard ──────────────────────────────────────────────────
// Unified metric card. All dashboards must use this component.
// Command Overview is the canonical reference.
//
// Fixed spec:
//   Container:  bg-slate-800/25 | border-slate-700/30 | rounded-xl | p-5
//   Title:      text-xs text-slate-500 font-medium
//   Value (lg): text-3xl font-bold text-white
//   Value (sm): text-xl font-semibold text-white
//   Dot:        w-2 h-2 rounded-full
//   Hover:      hover:border-slate-600/40
//   Padding:    p-5 (never changes)
//   Border:     rounded-xl (never changes)

interface MetricCardProps {
  /** Small label above the number */
  title: string;
  /** The primary metric value */
  value: string | number;
  /** Optional unit suffix displayed smaller (e.g., "days") */
  valueSuffix?: string;
  /** Status dot color in the title row */
  status?: StatusSeverity;
  /** Optional trend indicator next to value */
  trend?: {
    direction: 'up' | 'down';
    value: string;
    sentiment: 'positive' | 'negative';
  };
  /** Single line of subtext below value */
  subtext?: string;
  /** Alert line below subtext (colored by severity) */
  alert?: {
    text: string;
    severity: 'critical' | 'warning';
  };
  /** Size variant: lg (primary) or sm (secondary) */
  size?: 'lg' | 'sm';
  /** Makes card clickable. Renders as button if provided. */
  onClick?: () => void;
  /** Breakdown rows or any custom content below the value */
  children?: React.ReactNode;
}

export default function MetricCard({
  title,
  value,
  valueSuffix,
  status = 'neutral',
  trend,
  subtext,
  alert,
  size = 'lg',
  onClick,
  children,
}: MetricCardProps) {
  const containerClasses = `${SURFACE.card} ${SPACING.card} text-left ${SURFACE.cardHover} transition-colors`;
  const valueClasses = size === 'lg'
    ? 'text-3xl font-bold text-white'
    : 'text-xl font-semibold text-white';

  const content = (
    <>
      {/* Title row: label + status dot */}
      <div className="flex items-center justify-between mb-3">
        <span className={TYPE.label}>{title}</span>
        <div className={`${DOT_SIZE} ${STATUS_DOT[status]}`} />
      </div>

      {/* Value row */}
      <div className="flex items-baseline gap-2 mb-1">
        <p className={valueClasses}>
          {value}
          {valueSuffix && (
            <span className="text-base text-slate-500 ml-1">{valueSuffix}</span>
          )}
        </p>
        {trend && (
          <span className={`flex items-center gap-0.5 text-xs font-medium ${
            trend.sentiment === 'positive' ? STATUS_TEXT.success : STATUS_TEXT.critical
          }`}>
            {trend.direction === 'up'
              ? <ArrowUpRight className="w-3 h-3" />
              : <ArrowDownRight className="w-3 h-3" />
            }
            {trend.value}
          </span>
        )}
      </div>

      {/* Subtext */}
      {subtext && (
        <p className="text-xs text-slate-400 mb-1">{subtext}</p>
      )}

      {/* Alert line */}
      {alert && (
        <p className={`text-[11px] ${STATUS_TEXT[alert.severity]}`}>{alert.text}</p>
      )}

      {/* Custom breakdown content */}
      {children && (
        <div className="mt-3 space-y-1.5">
          {children}
        </div>
      )}
    </>
  );

  if (onClick) {
    return (
      <button onClick={onClick} className={containerClasses}>
        {content}
      </button>
    );
  }

  return <div className={containerClasses}>{content}</div>;
}

// ── MetricRow ───────────────────────────────────────────────────
// Standardized breakdown row inside a MetricCard.
// Usage: <MetricCard><MetricRow label="..." value="..." /></MetricCard>
export function MetricRow({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex items-center justify-between text-xs">
      <span className="text-slate-500">{label}</span>
      <span className="text-slate-300">{value}</span>
    </div>
  );
}

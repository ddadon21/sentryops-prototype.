import React from 'react';
import { X } from 'lucide-react';
import {
  SURFACE, SPACING, ALERT_STRIP_BORDER_WIDTH,
  ALERT_BORDER, STATUS_DOT_MUTED, DOT_SIZE_SMALL,
  type StatusSeverity
} from './tokens';

// ── AlertStrip ──────────────────────────────────────────────────
// Unified alert / risk / compliance strip. One component, everywhere.
//
// Fixed spec:
//   Container:      bg-slate-800/25 | border border-slate-700/30 | rounded-xl | p-5
//   Left border:    3px (border-l-[3px])
//   Border color:   critical → red-800/60, warning → amber-700/50, neutral → slate-600/40
//   Dot:            w-1.5 h-1.5 rounded-full (muted variant)
//   Icon spacing:   gap-3 between dot and content
//   Label type:     text-[13px] text-white for primary, text-[11px] text-slate-500 for secondary

type AlertSeverity = 'critical' | 'warning' | 'neutral';

interface AlertStripProps {
  /** Determines left border color and dot color */
  severity: AlertSeverity;
  /** Whether the strip can be dismissed */
  dismissible?: boolean;
  /** Called when dismiss button is clicked */
  onDismiss?: () => void;
  /** Content of the alert */
  children: React.ReactNode;
  /** Additional className */
  className?: string;
}

export default function AlertStrip({
  severity,
  dismissible = false,
  onDismiss,
  children,
  className = '',
}: AlertStripProps) {
  return (
    <div className={`${SURFACE.card} ${SPACING.card} ${ALERT_STRIP_BORDER_WIDTH} ${ALERT_BORDER[severity]} ${className}`}>
      <div className="flex items-start gap-3">
        <div className={`${DOT_SIZE_SMALL} ${STATUS_DOT_MUTED[severity === 'neutral' ? 'neutral' : severity]} mt-1.5 flex-shrink-0`} />
        <div className="flex-1 min-w-0">
          {children}
        </div>
        {dismissible && onDismiss && (
          <button
            onClick={onDismiss}
            className="text-slate-500 hover:text-slate-400 transition-colors flex-shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}

// ── Compact AlertStrip variant ──────────────────────────────────
// For single-line compliance notices (less padding)
export function AlertStripCompact({
  severity,
  children,
  className = '',
}: Omit<AlertStripProps, 'dismissible' | 'onDismiss'>) {
  return (
    <div className={`${SURFACE.card} px-5 py-3 ${ALERT_STRIP_BORDER_WIDTH} ${ALERT_BORDER[severity]} ${className}`}>
      <div className="flex items-center gap-3">
        <div className={`${DOT_SIZE_SMALL} ${STATUS_DOT_MUTED[severity === 'neutral' ? 'neutral' : severity]} flex-shrink-0`} />
        <div className="flex-1 min-w-0">
          {children}
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { TYPE, SPACING } from './tokens';

// ── PageHeader ──────────────────────────────────────────────────
// Shared page-level header with slots. All dashboards must use this.
//
// Fixed spec:
//   Container: mb-8, flex responsive row
//   Title:     text-xl font-bold text-white mb-1
//   Subtitle:  flexible (ReactNode), but typically text-[11px] text-slate-500
//   Height:    determined by content, but container structure is identical
//   Actions:   right-aligned slot, flex row with gap-2
//   Padding:   none (parent controls page padding)
//
// The structure never changes. Only the slot content varies.

interface PageHeaderProps {
  /** Page title (e.g., "Executive Command Dashboard") */
  title: string;
  /** Subtitle content — typically spans with · separators */
  subtitle?: React.ReactNode;
  /** Right-side action buttons / controls */
  actions?: React.ReactNode;
}

export default function PageHeader({
  title,
  subtitle,
  actions,
}: PageHeaderProps) {
  return (
    <div className={`${SPACING.section} flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4`}>
      <div>
        <h2 className={`${TYPE.h1} mb-1`}>{title}</h2>
        {subtitle && (
          <div className="flex items-center gap-2 text-[11px] text-slate-500">
            {subtitle}
          </div>
        )}
      </div>
      {actions && (
        <div className="flex items-center gap-2">
          {actions}
        </div>
      )}
    </div>
  );
}

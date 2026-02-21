import React from 'react';
import { SURFACE, SPACING, TYPE } from './tokens';

// ── SectionContainer ────────────────────────────────────────────
// Standardized section wrapper. All dashboards must use this.
//
// Fixed spec:
//   Background:    bg-slate-800/25
//   Border:        border border-slate-700/30
//   Border radius: rounded-xl
//   Padding:       p-5
//   Margin bottom: mb-8 (controlled by parent layout, not this component)
//
// No exceptions. No per-page overrides.

interface SectionContainerProps {
  /** Section title (rendered as H2: text-sm font-medium text-white) */
  title?: string;
  /** Subtitle below title */
  subtitle?: string;
  /** Right-side header content (e.g., "View All →" link) */
  headerRight?: React.ReactNode;
  /** Section content */
  children: React.ReactNode;
  /** Additional className for the outer container (use sparingly) */
  className?: string;
}

export default function SectionContainer({
  title,
  subtitle,
  headerRight,
  children,
  className = '',
}: SectionContainerProps) {
  return (
    <div className={`${SURFACE.card} ${SPACING.card} ${className}`}>
      {/* Header row */}
      {(title || headerRight) && (
        <div className="flex items-center justify-between mb-5">
          <div>
            {title && <h3 className={TYPE.h2}>{title}</h3>}
            {subtitle && <p className={`${TYPE.meta} mt-1`}>{subtitle}</p>}
          </div>
          {headerRight && <div>{headerRight}</div>}
        </div>
      )}
      {children}
    </div>
  );
}

// ── SentryOps Design Tokens ─────────────────────────────────────
// Single source of truth. No hex values, no new colors outside this file.
// Every shared component imports from here. Dashboards never hardcode tokens.

// ── Semantic Status Colors ──────────────────────────────────────
// Only these four semantic states exist. No teal, no orange, no light-green.
export const STATUS_DOT = {
  critical: 'bg-red-500',
  warning:  'bg-amber-500',
  success:  'bg-emerald-500',
  neutral:  'bg-slate-500',
} as const;

export const STATUS_DOT_MUTED = {
  critical: 'bg-red-700/60',
  warning:  'bg-amber-700/50',
  success:  'bg-emerald-500/50',
  neutral:  'bg-slate-500/50',
} as const;

export const STATUS_TEXT = {
  critical: 'text-red-400',
  warning:  'text-amber-400',
  success:  'text-emerald-400',
  neutral:  'text-slate-400',
} as const;

// ── Alert Strip Left Borders ────────────────────────────────────
export const ALERT_BORDER = {
  critical: 'border-l-red-800/60',
  warning:  'border-l-amber-700/50',
  neutral:  'border-l-slate-600/40',
} as const;

// ── Surface Tokens ──────────────────────────────────────────────
export const SURFACE = {
  card:      'bg-slate-800/25 border border-slate-700/30 rounded-xl',
  cardHover: 'hover:border-slate-600/40',
  row:       'bg-slate-900/20',
  rowHover:  'hover:bg-slate-800/30',
} as const;

// ── Spacing Tokens ──────────────────────────────────────────────
export const SPACING = {
  card:        'p-5',
  section:     'mb-8',
  gridGap:     'gap-5',
  sectionGap:  'space-y-8',
} as const;

// ── Typography Scale ────────────────────────────────────────────
// H1:    Page title
// H2:    Section title (inside cards, panels)
// H3:    Subsection label (uppercase groups inside sections)
// Body:  Standard content
// Label: Metric card labels, small labels
// Meta:  Small muted text
// Micro: Smallest annotations
export const TYPE = {
  h1:    'text-xl font-bold text-white',
  h2:    'text-sm font-medium text-white',
  h3:    'text-[13px] font-semibold text-white uppercase tracking-wide',
  body:  'text-[13px] text-slate-300',
  label: 'text-xs text-slate-500 font-medium',
  meta:  'text-xs text-slate-500',
  micro: 'text-[11px] text-slate-500',
} as const;

// ── Dot Sizes ───────────────────────────────────────────────────
// Standard status indicator in metric cards and section headers
export const DOT_SIZE = 'w-2 h-2 rounded-full';
// Inline content dot (activity rows, notification dots)
export const DOT_SIZE_SMALL = 'w-1.5 h-1.5 rounded-full';

// ── Alert Strip ─────────────────────────────────────────────────
export const ALERT_STRIP_BORDER_WIDTH = 'border-l-[3px]';

export type StatusSeverity = 'critical' | 'warning' | 'success' | 'neutral';

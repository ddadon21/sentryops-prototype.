// ── Design Tokens ─────────────────────────────────────────────
// Single source of truth for the entire SentryOps design system.
// No new hex values, no inline overrides. Every surface references these.

// ── Semantic Status Colors ────────────────────────────────────
export const status = {
  success:  { bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', text: 'text-emerald-400', dot: 'bg-emerald-500' },
  warning:  { bg: 'bg-amber-500/10',   border: 'border-amber-500/20',   text: 'text-amber-400',   dot: 'bg-amber-500'   },
  critical: { bg: 'bg-red-500/10',     border: 'border-red-500/20',     text: 'text-red-400',     dot: 'bg-red-500'     },
  info:     { bg: 'bg-blue-500/10',    border: 'border-blue-500/20',    text: 'text-blue-400',    dot: 'bg-blue-500'    },
  neutral:  { bg: 'bg-slate-800/25',   border: 'border-slate-700/30',   text: 'text-slate-400',   dot: 'bg-slate-500'   },
} as const;

// ── Surface Tokens ────────────────────────────────────────────
export const surface = {
  card:       'bg-slate-800/25 border border-slate-700/30 rounded-xl',
  cardHover:  'hover:border-slate-600/40 transition-colors',
  page:       'p-5 lg:p-8',
  inner:      'bg-slate-900/20',
  innerHover: 'hover:bg-slate-800/30 transition-all',
} as const;

// ── Spacing Tokens ────────────────────────────────────────────
export const spacing = {
  sectionGap:   'mb-8',          // gap between major sections
  cardPadding:  'p-5',           // internal card padding
  cardGap:      'gap-5',         // gap between cards in a grid
  itemGap:      'gap-1',         // gap between list items
  headerBottom: 'mb-5',          // space below section headers
} as const;

// ── Typography Scale ──────────────────────────────────────────
export const type = {
  pageTitle:    'text-xl font-bold text-white',                                     // H1
  sectionTitle: 'text-[13px] font-semibold text-white uppercase tracking-wide',     // H2
  cardTitle:    'text-xs text-slate-500 uppercase tracking-wide font-medium',       // H3
  cardValue:    'text-2xl font-semibold text-white',                                // Primary value
  body:         'text-[13px] text-slate-300',                                       // Standard body
  meta:         'text-[11px] text-slate-500',                                       // Small muted
  label:        'text-xs text-slate-400',                                           // Form labels / sub-labels
} as const;

// ── Alert Strip ───────────────────────────────────────────────
export const alertStrip = {
  borderWidth: 'border-l-[3px]',
  critical:    'border-l-red-800/60',
  warning:     'border-l-amber-700/50',
  info:        'border-l-slate-600/30',
} as const;

// ── Sidebar (locked) ──────────────────────────────────────────
export const sidebar = {
  width:           'w-64',
  collapsedWidth:  'w-20',
  navItemPadding:  'px-4 py-2.5',
  navItemGap:      'gap-3',
  navItemFont:     'text-[13px] font-medium',
  iconSize:        'w-[18px] h-[18px]',
  activeState:     'bg-slate-700/40 text-white border-l-2 border-l-amber-500',
  inactiveState:   'text-slate-400 hover:bg-slate-800/30 hover:text-slate-300',
  sectionSpacing:  'space-y-1',
} as const;

// ── Header (locked) ──────────────────────────────────────────
export const header = {
  height:     'py-4',
  padding:    'px-4 lg:px-6',
  border:     'border-b border-slate-800/50',
  background: 'backdrop-blur-xl bg-slate-900/30',
} as const;

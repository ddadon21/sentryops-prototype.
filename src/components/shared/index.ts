// ── Shared Design System ────────────────────────────────────────
// All dashboard components import from here.
// No inline token values. No per-page overrides.

export { default as MetricCard, MetricRow } from './MetricCard';
export { default as SectionContainer } from './SectionContainer';
export { default as AlertStrip, AlertStripCompact } from './AlertStrip';
export { default as PageHeader } from './PageHeader';

export {
  STATUS_DOT, STATUS_DOT_MUTED, STATUS_TEXT,
  ALERT_BORDER, SURFACE, SPACING, TYPE,
  DOT_SIZE, DOT_SIZE_SMALL, ALERT_STRIP_BORDER_WIDTH,
  type StatusSeverity,
} from './tokens';

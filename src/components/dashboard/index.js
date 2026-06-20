// Shared SentryOps dashboard architecture: every module's Executive
// Dashboard (Command, HR, Investigations, ...) is composed from these
// pieces so they share one product language. See ExecutiveHeader →
// KPICard → CriticalAlerts → OperationalQueueCard → ExecutiveIntelligence →
// SupportingMetricCard → QuickActions for the locked section order.
export { default as ExecutiveHeader } from './ExecutiveHeader';
export { default as HealthGauge } from './HealthGauge';
export { default as KPICard } from './KPICard';
export { default as CriticalAlerts } from './CriticalAlerts';
export { default as OperationalQueueCard } from './OperationalQueueCard';
export { default as ExecutiveIntelligence } from './ExecutiveIntelligence';
export { default as QuickActions } from './QuickActions';
export { default as SupportingMetricCard } from './SupportingMetricCard';
export { default as StatusPill } from './StatusPill';
export { default as SectionHeader } from './SectionHeader';
export { default as JobCard } from './JobCard';

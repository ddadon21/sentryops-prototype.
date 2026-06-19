import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

export type ActivityModule = 'command' | 'hr' | 'jail' | 'patrol' | 'investigations' | 'bi' | 'budget' | 'compliance' | 'system';
export type ActivitySeverity = 'info' | 'success' | 'warning' | 'critical';

export interface ActivityEvent {
  id: string;
  timestamp: string;        // ISO
  module: ActivityModule;
  title: string;
  message: string;
  severity: ActivitySeverity;
  actor: string;             // who/what triggered it
  route?: string;            // where to go to see the related record
  read: boolean;
}

interface ActivityContextValue {
  events: ActivityEvent[];
  unreadCount: number;
  addEvent: (event: Omit<ActivityEvent, 'id' | 'timestamp' | 'read'>) => ActivityEvent;
  markRead: (id: string) => void;
  markAllRead: () => void;
  clearAll: () => void;
}

const STORAGE_KEY = 'sentryops_activity_events';

const SEED_EVENTS: ActivityEvent[] = [
  {
    id: 'seed-1',
    timestamp: new Date(Date.now() - 12 * 60 * 1000).toISOString(),
    module: 'budget',
    title: 'Overtime request approved — Deputy Chen',
    message: 'B-Shift coverage (6 hrs) approved by Sheriff Thompson. Budget category Overtime updated.',
    severity: 'success',
    actor: 'Sheriff Thompson',
    route: '/command/budget',
    read: true,
  },
  {
    id: 'seed-2',
    timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
    module: 'hr',
    title: 'Candidate advanced to Background Investigation',
    message: 'Applicant M. Rivera moved from Conditional Offer to Background Investigation stage.',
    severity: 'info',
    actor: 'HR — Hiring Pipeline',
    route: '/hr/pipeline',
    read: true,
  },
  {
    id: 'seed-3',
    timestamp: new Date(Date.now() - 90 * 60 * 1000).toISOString(),
    module: 'jail',
    title: 'Housing Unit Pod-C reached 92% capacity',
    message: 'AI flagged Pod-C approaching overcapacity threshold. Review recommended before next booking.',
    severity: 'warning',
    actor: 'AI Intelligence',
    route: '/jail/custody',
    read: true,
  },
  {
    id: 'seed-4',
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    module: 'compliance',
    title: 'Corrective Action Plan completed — UoF Reporting Timeliness',
    message: 'CAP-2026-014 marked complete by IA. Compliance finding pending verification.',
    severity: 'success',
    actor: 'Internal Affairs',
    route: '/command/reports',
    read: true,
  },
];

// Simulated agency-wide events, popped live every few minutes for demo purposes.
const SYNTHETIC_EVENTS: Omit<ActivityEvent, 'id' | 'timestamp' | 'read'>[] = [
  {
    module: 'patrol',
    title: 'Patrol staffing updated',
    message: 'B-Shift roster adjusted — 2 units reassigned to cover District 4.',
    severity: 'info',
    actor: 'Patrol — Unit Management',
    route: '/patrol/units',
  },
  {
    module: 'patrol',
    title: 'Vehicle 421 entered maintenance',
    message: 'Unit 421 flagged for scheduled maintenance and taken out of rotation.',
    severity: 'warning',
    actor: 'Fleet Maintenance',
    route: '/patrol/units',
  },
  {
    module: 'budget',
    title: 'Budget request approved',
    message: 'Q2 Training Budget request approved by Sheriff Thompson.',
    severity: 'success',
    actor: 'Sheriff Thompson',
    route: '/command/budget',
  },
  {
    module: 'investigations',
    title: 'Investigation closed',
    message: 'Case #2026-0143 closed and referred for prosecution.',
    severity: 'success',
    actor: 'Investigations — Case Management',
    route: '/investigations/cases',
  },
  {
    module: 'hr',
    title: 'New deputy onboarded',
    message: 'Deputy R. Alvarez completed onboarding and is now active.',
    severity: 'info',
    actor: 'HR — Onboarding',
    route: '/hr/onboarding',
  },
];

const SYNTHETIC_EVENT_INTERVAL_MS = 5 * 60 * 1000;

function loadEvents(): ActivityEvent[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return SEED_EVENTS;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    return SEED_EVENTS;
  } catch {
    return SEED_EVENTS;
  }
}

const ActivityContext = createContext<ActivityContextValue | undefined>(undefined);

export function ActivityProvider({ children }: { children: React.ReactNode }) {
  const [events, setEvents] = useState<ActivityEvent[]>(() => loadEvents());

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events.slice(0, 200)));
  }, [events]);

  const addEvent = useCallback((event: Omit<ActivityEvent, 'id' | 'timestamp' | 'read'>) => {
    const newEvent: ActivityEvent = {
      ...event,
      id: `evt-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      timestamp: new Date().toISOString(),
      read: false,
    };
    setEvents(prev => [newEvent, ...prev]);
    return newEvent;
  }, []);

  // Live agency activity simulation — pops the first event right at login,
  // then a new one every 5 minutes for the rest of the session.
  useEffect(() => {
    let i = 0;
    const fire = () => {
      addEvent(SYNTHETIC_EVENTS[i % SYNTHETIC_EVENTS.length]);
      i += 1;
    };
    fire();
    const interval = setInterval(fire, SYNTHETIC_EVENT_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [addEvent]);

  const markRead = useCallback((id: string) => {
    setEvents(prev => prev.map(e => (e.id === id ? { ...e, read: true } : e)));
  }, []);

  const markAllRead = useCallback(() => {
    setEvents(prev => prev.map(e => ({ ...e, read: true })));
  }, []);

  const clearAll = useCallback(() => {
    setEvents([]);
  }, []);

  const unreadCount = useMemo(() => events.filter(e => !e.read).length, [events]);

  const value = useMemo(
    () => ({ events, unreadCount, addEvent, markRead, markAllRead, clearAll }),
    [events, unreadCount, addEvent, markRead, markAllRead, clearAll]
  );

  return <ActivityContext.Provider value={value}>{children}</ActivityContext.Provider>;
}

export function useActivity() {
  const ctx = useContext(ActivityContext);
  if (!ctx) throw new Error('useActivity must be used within an ActivityProvider');
  return ctx;
}

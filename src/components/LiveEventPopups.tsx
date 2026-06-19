import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, AlertTriangle, Info, XCircle, X } from 'lucide-react';
import {
  useActivity,
  SYNTHETIC_EVENTS,
  SYNTHETIC_EVENT_INTERVAL_MS,
  type ActivityEvent,
  type ActivitySeverity,
} from '../contexts/ActivityContext';

const SEVERITY_ICON: Record<ActivitySeverity, typeof Info> = {
  info: Info,
  success: CheckCircle,
  warning: AlertTriangle,
  critical: XCircle,
};

const SEVERITY_STYLE: Record<ActivitySeverity, { border: string; icon: string }> = {
  info:     { border: 'border-l-slate-400',   icon: 'text-slate-500' },
  success:  { border: 'border-l-emerald-500', icon: 'text-emerald-500' },
  warning:  { border: 'border-l-amber-500',   icon: 'text-amber-500' },
  critical: { border: 'border-l-red-500',     icon: 'text-red-500' },
};

const TOAST_LIFETIME_MS = 7000;
const MAX_VISIBLE = 4;

interface LiveEventPopupsProps {
  sidebarCollapsed: boolean;
}

// Agency Activity Center — live pop-ups for cross-module events, sliding
// out from behind the sidebar's bottom-left edge as they happen.
export default function LiveEventPopups({ sidebarCollapsed }: LiveEventPopupsProps) {
  const { events, addEvent, markRead } = useActivity();
  const navigate = useNavigate();
  const [toasts, setToasts] = useState<ActivityEvent[]>([]);
  const [enteringIds, setEnteringIds] = useState<Set<string>>(new Set());
  const seenIds = useRef<Set<string> | null>(null);

  // Live agency activity simulation — pops the first event right when the
  // dashboard mounts (login), then a new one every 5 minutes thereafter.
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

  useEffect(() => {
    if (seenIds.current === null) {
      // Don't pop up toasts for events that already existed on first load.
      seenIds.current = new Set(events.map(e => e.id));
      return;
    }
    const fresh = events.filter(e => !seenIds.current!.has(e.id));
    if (fresh.length === 0) return;

    fresh.forEach(e => seenIds.current!.add(e.id));
    setToasts(prev => [...fresh, ...prev].slice(0, MAX_VISIBLE));
    setEnteringIds(prev => {
      const next = new Set(prev);
      fresh.forEach(e => next.add(e.id));
      return next;
    });

    // Flip off the "entering" state a beat after mount so the transition
    // from off-screen (behind the sidebar) to resting position animates.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setEnteringIds(prev => {
          const next = new Set(prev);
          fresh.forEach(e => next.delete(e.id));
          return next;
        });
      });
    });

    fresh.forEach(e => {
      setTimeout(() => dismiss(e.id), TOAST_LIFETIME_MS);
    });
  }, [events]);

  const dismiss = (id: string) => setToasts(prev => prev.filter(t => t.id !== id));

  const handleClick = (event: ActivityEvent) => {
    markRead(event.id);
    dismiss(event.id);
    if (event.route) navigate(event.route);
  };

  if (toasts.length === 0) return null;

  return (
    <div
      className={`fixed bottom-5 z-40 flex flex-col-reverse gap-2 w-80 max-w-[calc(100vw-2.5rem)] left-5 ${
        sidebarCollapsed ? 'lg:left-24' : 'lg:left-[280px]'
      }`}
    >
      {toasts.map(event => {
        const Icon = SEVERITY_ICON[event.severity];
        const style = SEVERITY_STYLE[event.severity];
        const entering = enteringIds.has(event.id);
        return (
          <div
            key={event.id}
            onClick={() => handleClick(event)}
            className={`flex items-start gap-2.5 p-3 rounded-lg border border-border border-l-[3px] ${style.border} bg-surface-raised backdrop-blur-xl shadow-2xl cursor-pointer transition-all duration-500 ease-out ${
              entering ? 'opacity-0 -translate-x-[220px]' : 'opacity-100 translate-x-0 hover:-translate-y-0.5'
            }`}
          >
            <Icon className={`w-4 h-4 mt-0.5 flex-shrink-0 ${style.icon}`} />
            <div className="flex-1 min-w-0">
              <p className="text-[12.5px] font-semibold text-primary leading-snug">{event.title}</p>
              <p className="text-[11px] text-muted leading-snug mt-0.5">{event.message}</p>
            </div>
            <button
              onClick={(e) => { e.stopPropagation(); dismiss(event.id); }}
              className="text-muted hover:text-primary flex-shrink-0"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
}

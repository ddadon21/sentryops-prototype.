import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, AlertTriangle, Info, XCircle, X } from 'lucide-react';
import { useActivity, type ActivityEvent, type ActivitySeverity } from '../contexts/ActivityContext';

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

// Agency Activity Center — live pop-ups for cross-module events as they happen.
export default function LiveEventPopups() {
  const { events, markRead } = useActivity();
  const navigate = useNavigate();
  const [toasts, setToasts] = useState<ActivityEvent[]>([]);
  const seenIds = useRef<Set<string> | null>(null);

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
    fresh.forEach(e => {
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== e.id));
      }, TOAST_LIFETIME_MS);
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
    <div className="fixed bottom-5 left-5 z-[100] flex flex-col-reverse gap-2 w-80 max-w-[calc(100vw-2.5rem)]">
      {toasts.map(event => {
        const Icon = SEVERITY_ICON[event.severity];
        const style = SEVERITY_STYLE[event.severity];
        return (
          <div
            key={event.id}
            onClick={() => handleClick(event)}
            className={`flex items-start gap-2.5 p-3 rounded-lg border border-border border-l-[3px] ${style.border} bg-surface-raised backdrop-blur-xl shadow-2xl cursor-pointer transition-transform hover:-translate-y-0.5`}
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

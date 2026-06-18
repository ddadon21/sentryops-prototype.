import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, AlertTriangle, Info, XCircle, Sparkles } from 'lucide-react';
import DashboardLayout from '../layouts/DashboardLayout';
import { useActivity, type ActivityModule, type ActivitySeverity } from '../contexts/ActivityContext';

const MODULE_LABELS: Record<ActivityModule, string> = {
  command: 'Command',
  hr: 'HR',
  jail: 'Detention',
  patrol: 'Patrol',
  investigations: 'Investigations',
  bi: 'Background Investigations',
  budget: 'Budget',
  compliance: 'Compliance',
  system: 'System',
};

const SEVERITY_CONFIG: Record<ActivitySeverity, { icon: typeof Info; pill: string; dot: string }> = {
  info:     { icon: Info,          pill: 'bg-slate-500/10 border-slate-500/20 text-slate-500', dot: 'bg-slate-400' },
  success:  { icon: CheckCircle,   pill: 'bg-emerald-100 border-emerald-200 text-emerald-700 dark:bg-emerald-500/10 dark:border-emerald-500/20 dark:text-emerald-400', dot: 'bg-emerald-500' },
  warning:  { icon: AlertTriangle, pill: 'bg-amber-100 border-amber-200 text-amber-700 dark:bg-amber-500/10 dark:border-amber-500/20 dark:text-amber-400', dot: 'bg-amber-500' },
  critical: { icon: XCircle,       pill: 'bg-red-100 border-red-200 text-red-700 dark:bg-red-500/10 dark:border-red-500/20 dark:text-red-400', dot: 'bg-red-500' },
};

function formatTimestamp(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins} min ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  const days = Math.floor(hours / 24);
  return `${days} day${days > 1 ? 's' : ''} ago`;
}

export default function ActivityFeed() {
  const { events, unreadCount, markRead, markAllRead } = useActivity();
  const navigate = useNavigate();
  const [moduleFilter, setModuleFilter] = useState<ActivityModule | 'all'>('all');
  const [severityFilter, setSeverityFilter] = useState<ActivitySeverity | 'all'>('all');

  const filteredEvents = useMemo(() => {
    return events.filter(e => {
      if (moduleFilter !== 'all' && e.module !== moduleFilter) return false;
      if (severityFilter !== 'all' && e.severity !== severityFilter) return false;
      return true;
    });
  }, [events, moduleFilter, severityFilter]);

  const moduleOptions = useMemo(() => {
    const present = new Set(events.map(e => e.module));
    return Array.from(present);
  }, [events]);

  const handleEventClick = (id: string, route?: string) => {
    markRead(id);
    if (route) navigate(route);
  };

  return (
    <DashboardLayout>
      <div className="p-5 lg:p-7">
        <div className="max-w-[900px] mx-auto">

          <div className="mb-4 flex items-start justify-between">
            <div>
              <h2 className="text-xl font-bold text-primary mb-1">Activity Center</h2>
              <div className="flex items-center gap-2 text-[11px] text-slate-500">
                <Sparkles className="w-3 h-3 text-violet-400" />
                <span>Live cross-module events from HR, Detention, Patrol, Investigations, Budget &amp; Compliance</span>
                {unreadCount > 0 && (
                  <>
                    <span className="text-slate-700">·</span>
                    <span className="text-amber-600 dark:text-amber-400 font-semibold">{unreadCount} unread</span>
                  </>
                )}
              </div>
            </div>
            {unreadCount > 0 && (
              <button
                onClick={markAllRead}
                className="px-2.5 py-1 text-[11px] font-medium text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-500/20 rounded hover:bg-amber-50 dark:hover:bg-amber-500/10 transition-colors"
              >
                Mark all read
              </button>
            )}
          </div>

          <div className="mb-3 flex items-center gap-1.5 flex-wrap">
            <button
              onClick={() => setModuleFilter('all')}
              className={`px-2.5 py-1 rounded text-[11px] font-medium border transition-all ${
                moduleFilter === 'all'
                  ? 'bg-slate-200 dark:bg-zinc-800/50 border-slate-300 dark:border-slate-600/50 text-primary'
                  : 'bg-transparent border-slate-300 dark:border-slate-700/40 text-slate-500 hover:text-secondary'
              }`}
            >
              All Modules
            </button>
            {moduleOptions.map(mod => (
              <button
                key={mod}
                onClick={() => setModuleFilter(mod)}
                className={`px-2.5 py-1 rounded text-[11px] font-medium border transition-all ${
                  moduleFilter === mod
                    ? 'bg-slate-200 dark:bg-zinc-800/50 border-slate-300 dark:border-slate-600/50 text-primary'
                    : 'bg-transparent border-slate-300 dark:border-slate-700/40 text-slate-500 hover:text-secondary'
                }`}
              >
                {MODULE_LABELS[mod]}
              </button>
            ))}
            <div className="w-px h-4 bg-slate-300 dark:bg-zinc-800/40 mx-1" />
            {(['critical', 'warning', 'success', 'info'] as ActivitySeverity[]).map(sev => (
              <button
                key={sev}
                onClick={() => setSeverityFilter(severityFilter === sev ? 'all' : sev)}
                className={`px-2.5 py-1 rounded text-[11px] font-medium border capitalize transition-all ${
                  severityFilter === sev
                    ? SEVERITY_CONFIG[sev].pill
                    : 'bg-transparent border-slate-300 dark:border-slate-700/40 text-slate-500 hover:text-secondary'
                }`}
              >
                {sev}
              </button>
            ))}
          </div>

          <div className="space-y-px">
            {filteredEvents.map(event => {
              const sev = SEVERITY_CONFIG[event.severity];
              const Icon = sev.icon;
              return (
                <div
                  key={event.id}
                  onClick={() => handleEventClick(event.id, event.route)}
                  className={`flex items-start gap-3 px-3.5 py-2.5 rounded border transition-colors cursor-pointer ${
                    event.read
                      ? 'border-border dark:border-slate-700/30 bg-white dark:bg-zinc-900/15 opacity-70'
                      : 'border-border dark:border-slate-700/30 bg-white dark:bg-zinc-900/15 hover:bg-slate-50 dark:hover:bg-zinc-900/30'
                  }`}
                >
                  <div className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${event.read ? 'bg-slate-300 dark:bg-zinc-700' : sev.dot}`} />
                  <Icon className={`w-3.5 h-3.5 mt-0.5 flex-shrink-0 ${sev.pill.split(' ').find(c => c.startsWith('text-'))}`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-[13px] font-semibold text-primary">{event.title}</span>
                      <span className="px-1.5 py-px border rounded text-[10px] font-medium text-slate-500 border-slate-300 dark:border-slate-700/40 flex-shrink-0">
                        {MODULE_LABELS[event.module]}
                      </span>
                    </div>
                    <p className="text-[11px] text-secondary leading-snug mb-1">{event.message}</p>
                    <div className="flex items-center gap-2 text-[10px] text-slate-500">
                      <span>{event.actor}</span>
                      <span>·</span>
                      <span>{formatTimestamp(event.timestamp)}</span>
                    </div>
                  </div>
                </div>
              );
            })}
            {filteredEvents.length === 0 && (
              <div className="flex items-center gap-2 px-4 py-6 justify-center text-[12px] text-slate-500">
                No activity matches the selected filters.
              </div>
            )}
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
}

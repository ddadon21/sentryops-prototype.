import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, History, Zap, ArrowRight } from 'lucide-react';
import {
  searchCommandIndex,
  getRecentSearches,
  addRecentSearch,
  quickActions,
  type CommandEntry,
} from '../data/commandIndex';

interface CommandPaletteProps {
  open: boolean;
  initialQuery?: string;
  onClose: () => void;
}

type FlatItem =
  | { kind: 'recent'; value: string }
  | { kind: 'action'; value: typeof quickActions[number] }
  | { kind: 'result'; value: CommandEntry };

export default function CommandPalette({ open, initialQuery = '', onClose }: CommandPaletteProps) {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [query, setQuery] = useState(initialQuery);
  const [activeIndex, setActiveIndex] = useState(0);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  useEffect(() => {
    if (open) {
      setQuery(initialQuery);
      setActiveIndex(0);
      setRecentSearches(getRecentSearches());
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open, initialQuery]);

  const results = useMemo(() => searchCommandIndex(query), [query]);

  const groupedResults = useMemo(() => {
    const groups: { group: string; items: CommandEntry[] }[] = [];
    for (const item of results) {
      const existing = groups.find(g => g.group === item.group);
      if (existing) existing.items.push(item);
      else groups.push({ group: item.group, items: [item] });
    }
    return groups;
  }, [results]);

  const flatItems: FlatItem[] = useMemo(() => {
    if (!query.trim()) {
      return [
        ...recentSearches.map(value => ({ kind: 'recent' as const, value })),
        ...quickActions.map(value => ({ kind: 'action' as const, value })),
      ];
    }
    return results.map(value => ({ kind: 'result' as const, value }));
  }, [query, recentSearches, results]);

  useEffect(() => {
    itemRefs.current[activeIndex]?.scrollIntoView({ block: 'nearest' });
  }, [activeIndex]);

  const goTo = (route: string) => {
    if (query.trim()) addRecentSearch(query);
    navigate(route);
    onClose();
  };

  const handleSelect = (item: FlatItem) => {
    if (item.kind === 'recent') {
      setQuery(item.value);
      setActiveIndex(0);
      return;
    }
    if (item.kind === 'action') {
      goTo(item.value.route);
      return;
    }
    goTo(item.value.route);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex(i => Math.min(i + 1, flatItems.length - 1));
      return;
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex(i => Math.max(i - 1, 0));
      return;
    }
    if (e.key === 'Enter') {
      e.preventDefault();
      const item = flatItems[activeIndex];
      if (item) handleSelect(item);
    }
  };

  if (!open) return null;

  let runningIndex = -1;
  const nextIndex = () => ++runningIndex;

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center pt-[12vh] px-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div
        className="relative w-full max-w-xl bg-surface-raised dark:bg-zinc-950 border border-border rounded-xl shadow-2xl overflow-hidden animate-[command-palette-in_0.12s_ease-out]"
        onKeyDown={handleKeyDown}
      >
        <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
          <Search className="w-4 h-4 text-muted flex-shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={e => { setQuery(e.target.value); setActiveIndex(0); }}
            placeholder="Search SentryOps..."
            className="flex-1 bg-transparent outline-none text-[14px] text-primary placeholder-slate-400 dark:placeholder-slate-500"
          />
          <kbd className="text-[10px] font-medium text-muted border border-border rounded px-1.5 py-0.5">Esc</kbd>
        </div>

        <div className="max-h-[60vh] overflow-y-auto py-2">
          {!query.trim() && (
            <>
              {recentSearches.length > 0 && (
                <div className="px-2 pb-2">
                  <p className="px-3 pt-2 pb-1 text-[10px] font-bold text-slate-400 dark:text-slate-600 uppercase tracking-widest">Recent Searches</p>
                  {recentSearches.map(rs => {
                    const idx = nextIndex();
                    return (
                      <div
                        key={rs}
                        ref={el => { itemRefs.current[idx] = el; }}
                        onMouseEnter={() => setActiveIndex(idx)}
                        onClick={() => handleSelect({ kind: 'recent', value: rs })}
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer text-[13px] ${
                          activeIndex === idx ? 'bg-slate-100 dark:bg-zinc-800/60 text-primary' : 'text-secondary'
                        }`}
                      >
                        <History className="w-3.5 h-3.5 text-muted flex-shrink-0" />
                        <span className="flex-1 truncate">{rs}</span>
                      </div>
                    );
                  })}
                </div>
              )}

              <div className="px-2">
                <p className="px-3 pt-2 pb-1 text-[10px] font-bold text-slate-400 dark:text-slate-600 uppercase tracking-widest">Quick Actions</p>
                {quickActions.map(action => {
                  const idx = nextIndex();
                  return (
                    <div
                      key={action.id}
                      ref={el => { itemRefs.current[idx] = el; }}
                      onMouseEnter={() => setActiveIndex(idx)}
                      onClick={() => handleSelect({ kind: 'action', value: action })}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer text-[13px] ${
                        activeIndex === idx ? 'bg-slate-100 dark:bg-zinc-800/60 text-primary' : 'text-secondary'
                      }`}
                    >
                      <Zap className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 flex-shrink-0" />
                      <span className="flex-1 truncate">{action.label}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-muted flex-shrink-0" />
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {query.trim() && groupedResults.length === 0 && (
            <div className="px-4 py-8 text-center text-[13px] text-muted">No results for &ldquo;{query}&rdquo;</div>
          )}

          {query.trim() && groupedResults.map(group => (
            <div key={group.group} className="px-2 pb-2">
              <p className="px-3 pt-2 pb-1 text-[10px] font-bold text-slate-400 dark:text-slate-600 uppercase tracking-widest">{group.group}</p>
              {group.items.map(entry => {
                const idx = nextIndex();
                return (
                  <div
                    key={entry.id}
                    ref={el => { itemRefs.current[idx] = el; }}
                    onMouseEnter={() => setActiveIndex(idx)}
                    onClick={() => handleSelect({ kind: 'result', value: entry })}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer text-[13px] ${
                      activeIndex === idx ? 'bg-slate-100 dark:bg-zinc-800/60 text-primary' : 'text-secondary'
                    }`}
                  >
                    <span className="flex-1 truncate">{entry.label}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-muted flex-shrink-0" />
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

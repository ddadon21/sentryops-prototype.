import { FileText } from 'lucide-react';

// AI-style executive briefing, identical visual treatment across modules:
// a short bullet summary of "what's true right now" followed by a
// recommended-priorities list. Mirrors CommandDashboard's Executive
// Intelligence Summary panel.
export default function ExecutiveIntelligence({ summary = [], priorities = [], confidenceNote }) {
  return (
    <div className="bg-white dark:bg-zinc-900/25 border border-blue-200/50 dark:border-blue-500/20 border-l-[3px] border-l-blue-500 rounded-xl shadow-sm dark:shadow-none overflow-hidden">
      <div className="flex items-center justify-between px-5 py-3 bg-blue-50/40 dark:bg-blue-500/5 border-b border-blue-200/50 dark:border-blue-500/20">
        <div className="flex items-center gap-3">
          <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span className="text-[11px] font-black text-slate-900 dark:text-white uppercase tracking-widest">Executive Intelligence</span>
        </div>
        <span className="px-1.5 py-0.5 bg-blue-100 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 text-[9px] font-black text-blue-700 dark:text-blue-400 rounded tracking-widest uppercase">AI Briefing</span>
      </div>
      <div className="p-5 space-y-4">
        <ul className="space-y-1.5">
          {summary.map((line, i) => (
            <li key={i} className="flex items-start gap-2.5 text-[13px] text-slate-700 dark:text-slate-300">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
              {line}
            </li>
          ))}
        </ul>

        {priorities.length > 0 && (
          <div className="pt-3 border-t border-blue-100 dark:border-blue-500/10">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Recommended Priorities</p>
            <ol className="space-y-1">
              {priorities.map((p, i) => (
                <li key={i} className="flex items-start gap-2.5 text-[12px] text-slate-700 dark:text-slate-300">
                  <span className="text-[10px] font-black text-blue-600 dark:text-blue-400 flex-shrink-0">{i + 1}.</span>
                  {p}
                </li>
              ))}
            </ol>
          </div>
        )}

        {confidenceNote && <p className="text-[10px] text-slate-400 pt-1">{confidenceNote}</p>}
      </div>
    </div>
  );
}

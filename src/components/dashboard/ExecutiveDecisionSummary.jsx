const HEALTH_ACCENT = {
  Critical: 'border-l-red-500 bg-red-50/60 dark:bg-red-950/15',
  'High Risk': 'border-l-amber-500 bg-amber-50/60 dark:bg-amber-950/10',
  Healthy: 'border-l-emerald-500 bg-emerald-50/60 dark:bg-emerald-950/10',
};

const HEALTH_TEXT = {
  Critical: 'text-red-700 dark:text-red-400',
  'High Risk': 'text-amber-700 dark:text-amber-400',
  Healthy: 'text-emerald-600 dark:text-emerald-400',
};

// The single most important card on a workspace page — reads like an
// executive briefing, not a dashboard. Answers: health, probability of
// success, why it's failing, what to do, by when, and what happens if
// the recommendation is approved.
export default function ExecutiveDecisionSummary({ summary }) {
  if (!summary) return null;
  const accent = HEALTH_ACCENT[summary.health] || HEALTH_ACCENT.Healthy;
  const text = HEALTH_TEXT[summary.health] || HEALTH_TEXT.Healthy;

  return (
    <div className={`border-l-4 border border-border rounded-xl p-5 ${accent}`}>
      <h3 className="text-[11px] font-black text-slate-900 dark:text-white uppercase tracking-widest mb-4">Executive Decision Summary</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-xs text-secondary uppercase tracking-wide mb-1">Hiring Health</p>
          <p className={`text-xl font-black ${text}`}>{summary.health}</p>
        </div>
        <div>
          <p className="text-xs text-secondary uppercase tracking-wide mb-1">Probability of Successful Hire</p>
          <p className={`text-xl font-black ${text}`}>{summary.probability}%</p>
        </div>
      </div>
      <div className="space-y-3 text-sm">
        <div>
          <p className="text-xs font-bold text-secondary uppercase tracking-wide">Primary Issue</p>
          <p className="text-primary mt-0.5">{summary.primaryIssue}</p>
        </div>
        <div>
          <p className="text-xs font-bold text-secondary uppercase tracking-wide">Recommendation</p>
          <p className="text-primary font-medium mt-0.5">{summary.recommendation}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <p className="text-xs font-bold text-secondary uppercase tracking-wide">Decision Deadline</p>
            <p className={`font-bold mt-0.5 ${text}`}>{summary.deadline}</p>
          </div>
          <div>
            <p className="text-xs font-bold text-secondary uppercase tracking-wide">Expected Result</p>
            <p className="text-primary mt-0.5">{summary.expectedResult}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

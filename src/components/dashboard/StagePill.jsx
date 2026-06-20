const STAGE = {
  Applied: 'bg-slate-500/10 text-slate-700 dark:text-slate-400 border-slate-500/20',
  'Phone Screen': 'bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20',
  Interview: 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20',
  Background: 'bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-500/20',
  'Conditional Offer': 'bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 border-cyan-500/20',
  Hired: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20',
  Disqualified: 'bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20',
};

// Applicant stage badge — used in Applicant Workspace lists and profiles.
export default function StagePill({ stage }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full border text-xs font-bold whitespace-nowrap ${STAGE[stage] || STAGE.Applied}`}>
      {stage}
    </span>
  );
}

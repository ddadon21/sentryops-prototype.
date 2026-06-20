// Row of quick-action buttons. `actions` is [{ icon, label, onClick }].
export default function QuickActions({ actions = [] }) {
  if (actions.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-2">
      {actions.map((action, i) => {
        const Icon = action.icon;
        return (
          <button
            key={i}
            onClick={action.onClick}
            className="px-4 py-2 bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-400 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 border border-amber-500/20"
          >
            {Icon && <Icon className="w-4 h-4" />}
            {action.label}
          </button>
        );
      })}
    </div>
  );
}

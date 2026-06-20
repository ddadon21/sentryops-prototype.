// Consistent section title used inside workspace pages (e.g. JobWorkspace).
export default function SectionHeader({ icon: Icon, title, action }) {
  return (
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center gap-2">
        {Icon && <Icon className="w-4 h-4 text-amber-600 dark:text-amber-400" />}
        <h3 className="text-[11px] font-black text-slate-900 dark:text-white uppercase tracking-widest">{title}</h3>
      </div>
      {action}
    </div>
  );
}

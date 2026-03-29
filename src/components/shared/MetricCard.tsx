import React from 'react';
import { ChevronRight } from 'lucide-react';
import { surface, type } from './tokens';

interface MetricCardProps {
  title: string;
  value: string | number;
  valueSuffix?: string;
  statusDot?: 'success' | 'warning' | 'critical' | 'info' | 'neutral';
  children?: React.ReactNode;    // breakdown rows
  onClick?: () => void;
}

const dotColor: Record<string, string> = {
  success:  'bg-emerald-500',
  warning:  'bg-amber-600/50',
  critical: 'bg-red-700/60',
  info:     'bg-blue-500',
  neutral:  'bg-slate-500/50',
};

export default function MetricCard({ title, value, valueSuffix, statusDot = 'neutral', children, onClick }: MetricCardProps) {
  const Tag = onClick ? 'button' : 'div';
  return (
    <Tag
      onClick={onClick}
      className={`${surface.card} ${surface.cardHover} p-5 text-left ${onClick ? 'group cursor-pointer' : ''}`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className={`w-1.5 h-1.5 ${dotColor[statusDot]} rounded-full`} />
          <span className={type.cardTitle}>{title}</span>
        </div>
        {onClick && (
          <ChevronRight className="w-4 h-4 text-slate-700 group-hover:text-slate-400 transition-all" />
        )}
      </div>
      <p className={type.cardValue + ' mb-3'}>
        {value}
        {valueSuffix && <span className="text-base text-slate-500 ml-1">{valueSuffix}</span>}
      </p>
      {children && (
        <div className="space-y-1.5">
          {children}
        </div>
      )}
    </Tag>
  );
}

// Standardized row inside a MetricCard
export function MetricRow({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex items-center justify-between text-xs">
      <span className="text-slate-500">{label}</span>
      <span className="text-slate-500">{value}</span>
    </div>
  );
}

import React from 'react';
import { type } from './tokens';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  children?: React.ReactNode; // right-side action group
}

export default function PageHeader({ title, subtitle, children }: PageHeaderProps) {
  return (
    <div className="mb-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
      <div>
        <h2 className={type.pageTitle + ' mb-1'}>{title}</h2>
        {subtitle && (
          <div className={type.meta}>{subtitle}</div>
        )}
      </div>
      {children && (
        <div className="flex items-center gap-2">
          {children}
        </div>
      )}
    </div>
  );
}

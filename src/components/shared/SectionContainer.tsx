import React from 'react';
import { surface, spacing, type } from './tokens';

interface SectionContainerProps {
  title?: string;
  titleRight?: React.ReactNode;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}

export default function SectionContainer({ title, titleRight, subtitle, children, className = '' }: SectionContainerProps) {
  return (
    <div className={`${surface.card} ${spacing.cardPadding} ${spacing.sectionGap} ${className}`}>
      {title && (
        <div className={`flex items-center justify-between ${spacing.headerBottom}`}>
          <div>
            <h3 className={type.sectionTitle}>{title}</h3>
            {subtitle && <p className={type.meta + ' mt-1'}>{subtitle}</p>}
          </div>
          {titleRight && <div>{titleRight}</div>}
        </div>
      )}
      {children}
    </div>
  );
}

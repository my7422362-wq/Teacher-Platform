import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface PageHeaderProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  actions?: ReactNode;
  breadcrumbs?: ReactNode;
}

export function PageHeader({
  title,
  description,
  actions,
  breadcrumbs,
  className,
  ...props
}: PageHeaderProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-4 border-b pb-5 md:flex-row md:items-center md:justify-between',
        className
      )}
      {...props}
      dir="rtl"
    >
      <div className="flex-1 space-y-1.5 text-right">
        {breadcrumbs && <div className="mb-2 text-sm text-muted-foreground">{breadcrumbs}</div>}
        <h1 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">{title}</h1>
        {description && <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>}
      </div>
      {actions && (
        <div className="flex flex-wrap items-center justify-start gap-2 md:justify-end shrink-0">
          {actions}
        </div>
      )}
    </div>
  );
}

PageHeader.displayName = 'PageHeader';

import type { ComponentType, HTMLAttributes, ReactNode } from 'react';
import type { LucideProps } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './button';

export interface EmptyStateProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  icon?: ComponentType<LucideProps> | ReactNode;
  actionLabel?: string;
  onAction?: () => void;
  action?: ReactNode;
}

export function EmptyState({
  title = 'لا توجد بيانات',
  description = 'لم نجد أي سجلات تطابق بحثك حالياً.',
  icon: Icon,
  actionLabel,
  onAction,
  action,
  className,
  ...props
}: EmptyStateProps) {
  // Check if it's a React component (like Lucide icons)
  const renderIcon = () => {
    if (!Icon) return null;
    if (typeof Icon === 'function' || (typeof Icon === 'object' && 'displayName' in Icon)) {
      const LucideIcon = Icon as ComponentType<LucideProps>;
      return <LucideIcon className="h-10 w-10 text-muted-foreground/70" />;
    }
    return Icon;
  };

  return (
    <div
      className={cn(
        'flex min-h-[320px] flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center animate-fade-in',
        className
      )}
      {...props}
    >
      {Icon && (
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted/50 mb-4">
          {renderIcon()}
        </div>
      )}
      <h3 className="text-lg font-semibold tracking-tight mb-1 text-foreground">{title}</h3>
      {description && (
        <p className="max-w-sm text-sm text-muted-foreground mb-6 leading-relaxed">
          {description}
        </p>
      )}
      {action || (actionLabel && onAction && (
        <Button onClick={onAction} variant="outline" size="sm">
          {actionLabel}
        </Button>
      ))}
    </div>
  );
}

EmptyState.displayName = 'EmptyState';

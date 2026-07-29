import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import { Inbox } from 'lucide-react';

export interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({
  title,
  description,
  icon,
  action,
  className,
}: EmptyStateProps) {
  const { t } = useTranslation();

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center rounded-lg border border-dashed border-[rgba(212,181,158,0.15)] p-8 text-center bg-[#16342D]/50',
        className
      )}
    >
      <div className="mb-4 text-[rgba(249,246,240,0.35)]">
        {icon || <Inbox className="h-12 w-12" />}
      </div>
      <h3 className="mb-1 text-lg font-semibold text-[#F9F6F0]">{title ?? t('common.noData')}</h3>
      <p className="mb-4 text-sm text-[rgba(249,246,240,0.55)]">{description ?? t('common.noDataDescription')}</p>
      {action}
    </div>
  );
}

import { cn } from '@/lib/utils';
import { Inbox } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({
  title = 'لا توجد بيانات',
  description = 'لم يتم العثور على أي عناصر لعرضها',
  icon,
  action,
  className,
}: EmptyStateProps) {
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
      <h3 className="mb-1 text-lg font-semibold text-[#F9F6F0]">{title}</h3>
      <p className="mb-4 text-sm text-[rgba(249,246,240,0.55)]">{description}</p>
      {action}
    </div>
  );
}


import { cn } from '@/lib/utils';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
}

export function ErrorState({
  title = 'حدث خطأ',
  message = 'عذراً، حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.',
  onRetry,
  className,
}: ErrorStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center rounded-lg border border-destructive/20 bg-destructive/5 p-8 text-center',
        className
      )}
    >
      <AlertTriangle className="mb-4 h-12 w-12 text-destructive" />
      <h3 className="mb-1 text-lg font-semibold text-destructive">{title}</h3>
      <p className="mb-4 text-sm text-[rgba(249,246,240,0.55)]">{message}</p>
      {onRetry && (
        <Button variant="outline" onClick={onRetry}>
          إعادة المحاولة
        </Button>
      )}
    </div>
  );
}


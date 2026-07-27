import { useState } from 'react';
import type { ComponentType, HTMLAttributes, ReactNode } from 'react';
import { AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';
import type { LucideProps } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './button';

export interface ErrorStateProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  error?: Error | string;
  errorCode?: string | number;
  icon?: ComponentType<LucideProps> | ReactNode;
  onRetry?: () => void;
  retryLabel?: string;
}

export function ErrorState({
  title = 'حدث خطأ ما',
  description = 'نواجه مشكلة في معالجة طلبك حالياً. يرجى المحاولة مرة أخرى.',
  error,
  errorCode,
  icon: Icon,
  onRetry,
  retryLabel = 'إعادة المحاولة',
  className,
  ...props
}: ErrorStateProps) {
  const [showDetails, setShowDetails] = useState(false);

  const errorMessage = error instanceof Error ? error.message : error;

  const renderIcon = () => {
    if (!Icon) return <AlertCircle className="h-10 w-10 text-destructive" />;
    if (typeof Icon === 'function' || (typeof Icon === 'object' && 'displayName' in Icon)) {
      const LucideIcon = Icon as ComponentType<LucideProps>;
      return <LucideIcon className="h-10 w-10 text-destructive" />;
    }
    return Icon;
  };

  return (
    <div
      className={cn(
        'flex min-h-[300px] flex-col items-center justify-center rounded-lg border border-destructive/20 bg-destructive/5 p-8 text-center',
        className
      )}
      {...props}
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10 mb-4">
        {renderIcon()}
      </div>

      <h3 className="text-lg font-semibold tracking-tight mb-2 text-foreground">
        {title} {errorCode && <span className="text-muted-foreground">({errorCode})</span>}
      </h3>

      <p className="max-w-md text-sm text-muted-foreground mb-6 leading-relaxed">
        {description}
      </p>

      {errorMessage && (
        <div className="w-full max-w-md mb-6">
          <button
            type="button"
            onClick={() => setShowDetails(!showDetails)}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            {showDetails ? (
              <>
                <span>إخفاء التفاصيل الفنية</span>
                <ChevronUp className="h-3 w-3" />
              </>
            ) : (
              <>
                <span>عرض التفاصيل الفنية</span>
                <ChevronDown className="h-3 w-3" />
              </>
            )}
          </button>

          {showDetails && (
            <pre className="mt-2 overflow-x-auto rounded bg-muted p-3 text-right text-xs font-mono text-destructive border border-destructive/15 max-h-40 text-wrap">
              {errorMessage}
            </pre>
          )}
        </div>
      )}

      {onRetry && (
        <Button onClick={onRetry} variant="destructive" size="sm">
          {retryLabel}
        </Button>
      )}
    </div>
  );
}

ErrorState.displayName = 'ErrorState';

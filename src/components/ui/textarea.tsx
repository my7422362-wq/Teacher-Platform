import { forwardRef, type TextareaHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <div className="w-full">
        <textarea
          className={cn(
            'flex min-h-[80px] w-full rounded-xl border border-[rgba(212,181,158,0.18)] bg-[#16342D] px-4 py-3 text-sm text-[#F9F6F0] shadow-sm transition-all placeholder:text-[rgba(249,246,240,0.45)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#D4B59E] focus-visible:border-[#D4B59E] disabled:cursor-not-allowed disabled:opacity-50',
            error && 'border-destructive focus-visible:ring-destructive focus-visible:border-destructive',
            className
          )}
          ref={ref}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-destructive">{error}</p>}
      </div>
    );
  }
);
Textarea.displayName = 'Textarea';

export { Textarea };


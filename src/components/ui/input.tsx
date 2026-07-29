import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  endAdornment?: ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, endAdornment, ...props }, ref) => {
    return (
      <div className="w-full">
        <div className="relative">
          <input
            type={type}
            className={cn(
              'flex h-10 w-full rounded-xl border border-[rgba(212,181,158,0.18)] bg-[#16342D] px-4 py-2 text-sm text-[#F9F6F0] shadow-sm transition-all file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-[#F9F6F0] placeholder:text-[rgba(249,246,240,0.45)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#D4B59E] focus-visible:border-[#D4B59E] disabled:cursor-not-allowed disabled:opacity-50',
              endAdornment && 'pe-10',
              error && 'border-destructive focus-visible:ring-destructive focus-visible:border-destructive',
              className
            )}
            ref={ref}
            {...props}
          />
          {endAdornment && (
            <div className="absolute inset-y-0 end-0 flex items-center pe-3">{endAdornment}</div>
          )}
        </div>
        {error && <p className="mt-1 text-sm text-destructive">{error}</p>}
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input };


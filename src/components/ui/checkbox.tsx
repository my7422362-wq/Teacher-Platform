import { forwardRef, type InputHTMLAttributes } from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>;

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, ...props }, ref) => (
    <span className="relative inline-flex h-4 w-4 shrink-0 items-center justify-center">
      <input
        type="checkbox"
        ref={ref}
        className={cn(
          'peer h-4 w-4 shrink-0 cursor-pointer appearance-none rounded-[4px] border border-[rgba(212,181,158,0.35)] bg-[#16342D] transition-colors checked:border-[#D4B59E] checked:bg-[#D4B59E] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#D4B59E] disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        {...props}
      />
      <Check className="pointer-events-none absolute h-3 w-3 text-[#0F2520] opacity-0 peer-checked:opacity-100" />
    </span>
  )
);
Checkbox.displayName = 'Checkbox';

export { Checkbox };

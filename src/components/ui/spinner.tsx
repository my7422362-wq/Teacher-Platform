import type { HTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const spinnerVariants = cva(
  'animate-spin rounded-full border-solid border-current border-t-transparent',
  {
    variants: {
      size: {
        xs: 'h-3.5 w-3.5 border-[1.5px]',
        sm: 'h-5 w-5 border-2',
        md: 'h-8 w-8 border-[2.5px]',
        lg: 'h-12 w-12 border-3',
        xl: 'h-16 w-16 border-4',
      },
      variant: {
        default: 'text-primary',
        secondary: 'text-secondary-foreground',
        muted: 'text-muted-foreground',
        white: 'text-white',
        destructive: 'text-destructive',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'default',
    },
  }
);

export interface SpinnerProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof spinnerVariants> {}

export function Spinner({ className, size, variant, ...props }: SpinnerProps) {
  return (
    <div
      role="status"
      className={cn(spinnerVariants({ size, variant }), className)}
      {...props}
    >
      <span className="sr-only">جاري التحميل...</span>
    </div>
  );
}

Spinner.displayName = 'Spinner';

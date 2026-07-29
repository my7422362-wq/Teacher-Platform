import { type HTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-lg border px-3 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-[#21483F] text-[#D4B59E] shadow-sm',
        secondary: 'border-transparent bg-[#D4B59E] text-[#0F2520] shadow-sm',
        destructive: 'border-transparent bg-destructive text-destructive-foreground shadow-sm',
        outline: 'border-[rgba(212,181,158,0.25)] text-[rgba(249,246,240,0.75)]',
        success: 'border-transparent bg-[#6DA67A] text-[#0F2520] shadow-sm',
        warning: 'border-transparent bg-[#D4B59E] text-[#0F2520] shadow-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };


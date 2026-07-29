import { cn } from '@/lib/utils';

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('animate-pulse rounded-lg bg-[#1B4038]/80', className)}
      {...props}
    />
  );
}

export { Skeleton };


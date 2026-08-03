import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  text?: string;
}

const sizeMap = {
  sm: 'h-4 w-4',
  md: 'h-8 w-8',
  lg: 'h-12 w-12',
};

export function Loader({ size = 'md', className, text }: LoaderProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center gap-2', className)}>
        <Loader2 className={cn('animate-spin text-[#D4B59E]', sizeMap[size])} />
      {text && <p className="text-sm text-[rgba(249,246,240,0.75)]">{text}</p>}
    </div>
  );
}


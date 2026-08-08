import { forwardRef, useState, type HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const sizeMap = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-12 w-12 text-base',
  xl: 'h-16 w-16 text-lg',
};

const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, src, alt, fallback, size = 'md', ...props }, ref) => {
    const [failed, setFailed] = useState(false);
    const initials = fallback
      ? fallback.slice(0, 2)
      : alt
        ? alt.slice(0, 2)
        : '؟';

    return (
      <div
        ref={ref}
        className={cn(
          'relative flex shrink-0 overflow-hidden rounded-full',
          sizeMap[size],
          className
        )}
        {...props}
      >
        {src && !failed ? (
          <img
            src={src}
            alt={alt || ''}
            className="h-full w-full object-cover"
            onError={() => setFailed(true)}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-[#1B4038] font-medium text-[rgba(249,246,240,0.55)]">
            {initials}
          </div>
        )}
      </div>
    );
  }
);
Avatar.displayName = 'Avatar';

export { Avatar };


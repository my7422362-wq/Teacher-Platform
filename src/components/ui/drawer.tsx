import { type ReactNode, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  position?: 'left' | 'right';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeMap = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
};

export function Drawer({
  isOpen,
  onClose,
  title,
  children,
  position = 'right',
  size = 'md',
  className,
}: DrawerProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: position === 'right' ? '100%' : '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: position === 'right' ? '100%' : '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className={cn(
                'fixed inset-y-0 flex w-full flex-col border-l border-[rgba(212,181,158,0.12)] bg-[#21483F] shadow-elevated',
                position === 'right' ? 'right-0' : 'left-0',
                sizeMap[size],
                className
              )}
          >
            <div className="flex items-center justify-between border-b border-[rgba(212,181,158,0.12)] px-4 py-3">
              {title && <h2 className="text-lg font-semibold text-[#F9F6F0]">{title}</h2>}
              <button
                onClick={onClose}
                className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 text-[#F9F6F0]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}


import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CourseBadgeProps {
  text: string;
  className?: string;
}

const badgeVariants: Record<string, string> = {
  'جديد': 'bg-gradient-to-r from-blue-500/90 to-purple-500/90 text-white shadow-lg shadow-blue-500/20',
  'الأكثر اشتراكًا': 'bg-gradient-to-r from-amber-500/90 to-orange-500/90 text-white shadow-lg shadow-amber-500/20',
  'خصم': 'bg-gradient-to-r from-green-500/90 to-emerald-500/90 text-white shadow-lg shadow-green-500/20',
};

const badgeDefault = 'bg-gradient-to-r from-blue-500/90 to-purple-500/90 text-white shadow-lg shadow-blue-500/20';

export function CourseBadge({ text, className }: CourseBadgeProps) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={cn(
        'inline-flex items-center px-3 py-1.5 rounded-xl text-xs font-bold backdrop-blur-sm',
        'border border-white/20',
        badgeVariants[text] || badgeDefault,
        className
      )}
    >
      {text}
    </motion.span>
  );
}


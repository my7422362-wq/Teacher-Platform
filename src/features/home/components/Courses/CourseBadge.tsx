import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CourseBadgeProps {
  text: string;
  className?: string;
}

const badgeVariants: Record<string, string> = {
  'جديد': 'bg-[#D4B59E] text-[#0F2520] shadow-lg shadow-[rgba(212,181,158,0.2)]',
  'الأكثر اشتراكًا': 'bg-[#D4B59E] text-[#0F2520] shadow-lg shadow-[rgba(212,181,158,0.2)]',
  'خصم': 'bg-[#6DA67A] text-[#0F2520] shadow-lg shadow-[rgba(109,166,122,0.2)]',
};

const badgeDefault = 'bg-[#D4B59E] text-[#0F2520] shadow-lg shadow-[rgba(212,181,158,0.2)]';

export function CourseBadge({ text, className }: CourseBadgeProps) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={cn(
        'inline-flex items-center px-3 py-1.5 rounded-xl text-xs font-bold backdrop-blur-sm',
        'border border-[rgba(255,255,255,0.15)]',
        badgeVariants[text] || badgeDefault,
        className
      )}
    >
      {text}
    </motion.span>
  );
}

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import { ArrowLeft } from 'lucide-react';

interface CourseButtonProps {
  slug: string;
  className?: string;
}

export function CourseButton({ slug, className }: CourseButtonProps) {
  const { t } = useTranslation();

  return (
    <Link to={`/courses/${slug}`}>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          'relative group cursor-pointer w-full overflow-hidden rounded-2xl',
          'bg-[#D4B59E]',
          'hover:bg-[#C7A187]',
          'border border-[rgba(255,255,255,0.1)] hover:border-[rgba(255,255,255,0.2)]',
          'shadow-lg shadow-[rgba(212,181,158,0.1)] hover:shadow-[rgba(212,181,158,0.2)]',
          'transition-all duration-300',
          className
        )}
      >
        {/* Shimmer overlay */}
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        <div className="relative flex items-center justify-center gap-2 px-4 py-3">
          <span className="text-sm font-bold text-[#0F2520]">{t('courses.viewDetails')}</span>
          <ArrowLeft className="w-4 h-4 text-[#0F2520]/70 group-hover:-translate-x-1 transition-transform duration-300" />
        </div>
      </motion.button>
    </Link>
  );
}

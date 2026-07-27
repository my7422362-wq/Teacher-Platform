import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ArrowLeft } from 'lucide-react';

interface CourseButtonProps {
  slug: string;
  className?: string;
}

export function CourseButton({ slug, className }: CourseButtonProps) {
  return (
    <Link to={`/courses/${slug}`}>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          'relative group cursor-pointer w-full overflow-hidden rounded-2xl',
          'bg-gradient-to-r from-blue-600/80 via-blue-500/80 to-purple-600/80',
          'hover:from-blue-500 hover:via-blue-400 hover:to-purple-500',
          'border border-white/10 hover:border-white/20',
          'shadow-lg shadow-blue-500/10 hover:shadow-blue-500/25',
          'transition-all duration-300',
          className
        )}
      >
        {/* Shimmer overlay */}
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <div className="relative flex items-center justify-center gap-2 px-4 py-3">
          <span className="text-sm font-bold text-white">عرض التفاصيل</span>
          <ArrowLeft className="w-4 h-4 text-white/80 group-hover:-translate-x-1 transition-transform duration-300" />
        </div>
      </motion.button>
    </Link>
  );
}


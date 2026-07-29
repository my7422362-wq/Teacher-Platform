import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { COURSE_CATEGORIES, type CourseCategory } from './courses.data';

interface CourseTabsProps {
  activeTab: CourseCategory;
  onTabChange: (tab: CourseCategory) => void;
  className?: string;
}

const tabVariants = {
  inactive: {
    opacity: 0.7,
    scale: 1,
    transition: { duration: 0.2, ease: 'easeOut' as const },
  },
  active: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, ease: 'easeOut' as const },
  },
};

export function CourseTabs({ activeTab, onTabChange, className }: CourseTabsProps) {
  return (
    <div
      className={cn(
        'flex flex-wrap items-center justify-center gap-2 sm:gap-3',
        className
      )}
    >
      {COURSE_CATEGORIES.map((tab) => {
        const isActive = activeTab === tab;

        return (
          <motion.button
            key={tab}
            variants={tabVariants}
            animate={isActive ? 'active' : 'inactive'}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onTabChange(tab)}
            className={cn(
              'relative overflow-hidden rounded-xl px-4 sm:px-5 py-2.5',
              'text-sm font-medium transition-all duration-300 cursor-pointer',
              isActive
                ? [
                    'bg-[#D4B59E]',
                    'text-[#0F2520] shadow-lg shadow-[rgba(212,181,158,0.2)]',
                    'border border-[rgba(212,181,158,0.3)]',
                  ]
                : [
                    'bg-[rgba(255,255,255,0.04)] backdrop-blur-sm',
                    'text-[rgba(249,246,240,0.55)] hover:text-[rgba(249,246,240,0.85)]',
                    'border border-[rgba(212,181,158,0.1)] hover:border-[rgba(212,181,158,0.2)]',
                    'hover:bg-[rgba(255,255,255,0.06)]',
                  ]
            )}
          >
            {/* Active tab glow */}
            {isActive && (
              <motion.div
                layoutId="activeTabGlow"
                className="absolute inset-0 rounded-xl bg-gradient-to-r from-[rgba(212,181,158,0.2)] to-[rgba(212,181,158,0.1)] blur-md"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}

            {/* Active tab shimmer */}
            {isActive && (
              <div className="absolute inset-0 -translate-x-full animate-[shimmer_3s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            )}

            {/* Tab content */}
            <span className="relative z-10">{tab}</span>
          </motion.button>
        );
      })}
    </div>
  );
}

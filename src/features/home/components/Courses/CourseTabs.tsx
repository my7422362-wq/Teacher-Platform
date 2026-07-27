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
    transition: { duration: 0.2, ease: 'easeOut' },
  },
  active: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, ease: 'easeOut' },
  },
};

export function CourseTabs({ activeTab, onTabChange, className }: CourseTabsProps) {
  return (
    <div
      className={cn(
        'flex flex-wrap items-center justify-center gap-2 sm:gap-3',
        className
      )}
      dir="rtl"
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
                    'bg-gradient-to-r from-blue-600/90 to-purple-600/90',
                    'text-white shadow-lg shadow-blue-500/20',
                    'border border-blue-400/30',
                  ]
                : [
                    'bg-white/5 backdrop-blur-sm',
                    'text-gray-400 hover:text-gray-200',
                    'border border-white/10 hover:border-white/20',
                    'hover:bg-white/[0.07]',
                  ]
            )}
          >
            {/* Active tab glow */}
            {isActive && (
              <motion.div
                layoutId="activeTabGlow"
                className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400/20 to-purple-400/20 blur-md"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}

            {/* Active tab shimmer */}
            {isActive && (
              <div className="absolute inset-0 -translate-x-full animate-[shimmer_3s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            )}

            {/* Tab content */}
            <span className="relative z-10">{tab}</span>
          </motion.button>
        );
      })}
    </div>
  );
}


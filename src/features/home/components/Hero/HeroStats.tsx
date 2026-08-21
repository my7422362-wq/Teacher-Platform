import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { usePlatformStats } from '@/features/home/lib/platform-stats';

// Repeated 4x so the strip stays full even on ultra-wide screens, and loops
// seamlessly: shifting by exactly one copy's width (-25% of the 4-copy
// track) lands back on an identical frame.
const COPIES = 4;

export function HeroStats() {
  const { t } = useTranslation();
  const stats = usePlatformStats();

  const items = [
    { value: stats.totalStudents, labelKey: 'hero.stats.students' },
    { value: stats.totalCourses, labelKey: 'hero.stats.courses' },
    { value: stats.totalTeachers, labelKey: 'hero.stats.teachers' },
    { value: stats.totalLessons, labelKey: 'hero.stats.lessons' },
  ];
  const marqueeItems = Array.from({ length: COPIES }, () => items).flat();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut', delay: 0.4 }}
      className="w-full overflow-hidden bg-[rgba(255,255,255,0.04)] backdrop-blur-xl border-y border-[rgba(212,181,158,0.12)]"
    >
      <div className="relative py-4 sm:py-6 [mask-image:linear-gradient(to_right,transparent,black_2%,black_98%,transparent)] sm:[mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent)]">
        <motion.div
          className="flex w-max gap-8 px-4 sm:gap-16 sm:px-6"
          animate={{ x: ['0%', `-${100 / COPIES}%`] }}
          transition={{ duration: 16, ease: 'linear', repeat: Infinity }}
        >
          {marqueeItems.map((stat, i) => (
            <div
              key={`${stat.labelKey}-${i}`}
              className="flex shrink-0 flex-col items-center text-center min-w-20 sm:min-w-28"
            >
              <div className="text-lg sm:text-2xl font-bold text-[#D4B59E]">{stat.value.toLocaleString()}+</div>
              <div className="text-[11px] sm:text-sm text-[rgba(249,246,240,0.55)] mt-1 whitespace-nowrap">
                {t(stat.labelKey)}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}

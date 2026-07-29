import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import { CourseTabs } from './CourseTabs';
import { CourseCard } from './CourseCard';
import { COURSES_DATA, type CourseCategory } from './courses.data';

interface CoursesSectionProps {
  className?: string;
}

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const itemFadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' as const },
  },
};

export function CoursesSection({ className }: CoursesSectionProps) {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<CourseCategory>('الكل');

  const filteredCourses = useMemo(() => {
    if (activeTab === 'الكل') return COURSES_DATA;
    return COURSES_DATA.filter((course) => course.category === activeTab);
  }, [activeTab]);

  return (
    <section
      id="featured-courses"
      className={cn(
        'relative overflow-hidden py-20 sm:py-24 lg:py-28',
        className
      )}
    >
      {/* Dark navy background */}
      <div className="absolute inset-0 bg-[#0F2520] -z-20" />

      {/* Gradient orbs */}
      <div className="absolute top-1/3 -right-32 w-[500px] h-[500px] rounded-full bg-[#D4B59E]/20 blur-[120px] -z-10 animate-[orb-float_8s_ease-in-out_infinite]" />
      <div className="absolute bottom-1/3 -left-32 w-[400px] h-[400px] rounded-full bg-[#C7A187]/15 blur-[100px] -z-10 animate-[orb-float-2_10s_ease-in-out_infinite]" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-blue-600/5 blur-[150px] -z-10" />

      {/* Top-right accent glow */}
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-gradient-to-bl from-[#D4B59E]/10 to-transparent rounded-full blur-[80px] -z-10" />

      {/* Glowing particles */}
      <div className="absolute top-[20%] left-[10%] w-2 h-2 rounded-full bg-blue-400/30 blur-[2px] animate-[particle-float_6s_ease-in-out_infinite] -z-10" />
      <div className="absolute top-[60%] right-[15%] w-3 h-3 rounded-full bg-purple-400/20 blur-[3px] animate-[particle-float_8s_ease-in-out_infinite_reverse] -z-10" />
      <div className="absolute top-[30%] right-[25%] w-1.5 h-1.5 rounded-full bg-blue-300/25 blur-[1px] animate-[particle-float_7s_ease-in-out_infinite] -z-10" />
      <div className="absolute bottom-[25%] left-[5%] w-2.5 h-2.5 rounded-full bg-purple-300/20 blur-[2px] animate-[particle-float_9s_ease-in-out_infinite_reverse] -z-10" />

      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
          >
            {/* Badge */}
            <motion.div
              variants={itemFadeUp}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-6"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#D4B59E]" />
              </span>
              <span className="text-sm font-medium text-[rgba(249,246,240,0.75)]">{t('courses.badge')}</span>
            </motion.div>

            {/* Title */}
            <motion.h2
              variants={itemFadeUp}
              className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight"
            >
              <span className="bg-gradient-to-r from-[#D4B59E] via-[#C7A187] to-[#D4B59E] bg-clip-text text-transparent bg-[length:200%_auto] animate-[gradient-shift_3s_ease_infinite]">
                {t('courses.title')}
              </span>
            </motion.h2>

            {/* Description */}
            <motion.p
              variants={itemFadeUp}
              className="mt-6 text-base sm:text-lg text-[rgba(249,246,240,0.55)] leading-relaxed max-w-2xl mx-auto"
            >
              {t('courses.description')}
            </motion.p>
          </motion.div>

          {/* Filter Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-10 sm:mb-12"
          >
            <CourseTabs
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />
          </motion.div>

          {/* Courses Grid */}
          {filteredCourses.length > 0 ? (
            <motion.div
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            >
              {filteredCourses.map((course, index) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  index={index}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center py-16"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/5 border border-white/10 mb-4">
                <span className="text-2xl">📚</span>
              </div>
              <p className="text-[rgba(249,246,240,0.55)] text-lg">
                {t('courses.empty')}
              </p>
            </motion.div>
          )}
        </div>
      </div>

      {/* Bottom fade gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0F2520] to-transparent -z-10" />
    </section>
  );
}


import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import { Spinner, ErrorState } from '@/components/ui';
import { usePublicCourses } from '@/features/home/components/Courses/queries';
import { TeacherCard } from './TeacherCard';
import { summarizeTeachers } from './summarize';

interface MeetTeachersProps {
  className?: string;
}

const itemFadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};

export function MeetTeachers({ className }: MeetTeachersProps) {
  const { t } = useTranslation();
  const { data: courses = [], isLoading, isError, refetch } = usePublicCourses();

  const teachers = useMemo(() => summarizeTeachers(courses), [courses]);

  return (
    <section id="our-teachers" className={cn('relative overflow-hidden py-20 sm:py-24 lg:py-28', className)}>
      <div className="absolute inset-0 bg-[#0F2520] -z-20" />
      <div className="absolute top-1/3 -right-32 w-[500px] h-[500px] rounded-full bg-[#D4B59E]/20 blur-[120px] -z-10 animate-[orb-float_8s_ease-in-out_infinite]" />
      <div className="absolute bottom-1/3 -left-32 w-[400px] h-[400px] rounded-full bg-[#C7A187]/15 blur-[100px] -z-10 animate-[orb-float-2_10s_ease-in-out_infinite]" />

      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
          >
            <motion.div
              variants={itemFadeUp}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-6"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#D4B59E]" />
              </span>
              <span className="text-sm font-medium text-[rgba(249,246,240,0.75)]">{t('ourTeachers.badge')}</span>
            </motion.div>

            <motion.h2 variants={itemFadeUp} className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-[#D4B59E] via-[#C7A187] to-[#D4B59E] bg-clip-text text-transparent bg-[length:200%_auto] animate-[gradient-shift_3s_ease_infinite]">
                {t('ourTeachers.title')}
              </span>
            </motion.h2>

            <motion.p
              variants={itemFadeUp}
              className="mt-6 text-base sm:text-lg text-[rgba(249,246,240,0.55)] leading-relaxed max-w-2xl mx-auto"
            >
              {t('ourTeachers.description')}
            </motion.p>
          </motion.div>

          {isLoading ? (
            <div className="flex justify-center py-16">
              <Spinner />
            </div>
          ) : isError ? (
            <ErrorState description={t('ourTeachers.loadFailed')} onRetry={() => refetch()} />
          ) : teachers.length === 0 ? (
            <p className="text-center text-[rgba(249,246,240,0.55)] text-lg py-16">{t('ourTeachers.empty')}</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {teachers.map((teacher, index) => (
                <TeacherCard key={teacher.teacherId} teacher={teacher} index={index} />
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0F2520] to-transparent -z-10" />
    </section>
  );
}

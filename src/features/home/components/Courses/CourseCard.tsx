import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import { BookOpen } from 'lucide-react';
import { CourseBadge } from './CourseBadge';
import { CourseInfo } from './CourseInfo';
import { CourseMeta } from './CourseMeta';
import { CourseButton } from './CourseButton';
import type { PublicCourse } from '@/services';

interface CourseCardProps {
  course: PublicCourse;
  index: number;
  className?: string;
}

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut' as const,
      delay,
    },
  }),
};

/**
 * Generates a deterministic gradient for course image placeholder based on course id
 */
function getCourseGradient(id: number): string {
  const gradients = [
    'from-[#D4B59E]/40 via-purple-600/30 to-indigo-900/40',
    'from-purple-600/40 via-pink-600/30 to-rose-900/40',
    'from-cyan-600/40 via-blue-600/30 to-indigo-900/40',
    'from-emerald-600/40 via-teal-600/30 to-cyan-900/40',
    'from-amber-600/40 via-orange-600/30 to-red-900/40',
    'from-violet-600/40 via-purple-600/30 to-fuchsia-900/40',
    'from-sky-600/40 via-blue-600/30 to-indigo-900/40',
    'from-rose-600/40 via-pink-600/30 to-purple-900/40',
  ];
  return gradients[id % gradients.length];
}

/**
 * Generates a pattern overlay for the course image
 */
function getCoursePattern(id: number): string {
  const patterns = [
    'radial-gradient(circle at 20% 30%, rgba(59,130,246,0.15) 0%, transparent 50%)',
    'radial-gradient(circle at 80% 20%, rgba(168,85,247,0.15) 0%, transparent 50%)',
    'radial-gradient(circle at 50% 50%, rgba(6,182,212,0.15) 0%, transparent 50%)',
    'radial-gradient(circle at 30% 70%, rgba(16,185,129,0.15) 0%, transparent 50%)',
    'radial-gradient(circle at 70% 40%, rgba(245,158,11,0.15) 0%, transparent 50%)',
    'radial-gradient(circle at 40% 60%, rgba(139,92,246,0.15) 0%, transparent 50%)',
    'radial-gradient(circle at 60% 30%, rgba(14,165,233,0.15) 0%, transparent 50%)',
    'radial-gradient(circle at 50% 50%, rgba(244,63,94,0.15) 0%, transparent 50%)',
  ];
  return patterns[id % patterns.length];
}

export function CourseCard({ course, index, className }: CourseCardProps) {
  const { t } = useTranslation();

  return (
    <motion.div
      custom={0.08 * index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      className={cn(
        'relative group',
        className
      )}
    >
      <div
        className={cn(
          'relative h-full overflow-hidden rounded-3xl',
          'bg-white/5 backdrop-blur-xl border border-white/10',
          'shadow-lg shadow-blue-500/5',
          'transition-all duration-500 ease-out',
          'hover:border-blue-500/30 hover:bg-white/[0.08]',
          'hover:shadow-xl hover:shadow-blue-500/20 hover:shadow-purple-500/10',
          'hover:-translate-y-2 hover:scale-[1.02]'
        )}
      >
        {/* Hover glow */}
        <div className="absolute -inset-2 bg-gradient-to-r from-[#D4B59E]/0 via-blue-600/10 to-[#C7A187]/0 opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-700 pointer-events-none" />

        {/* Top accent line */}
        <div className="absolute top-0 left-[5%] right-[5%] h-px bg-gradient-to-r from-transparent via-[#C7A187]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Course Image (16:9 ratio) */}
        <div className="relative w-full aspect-video overflow-hidden rounded-t-3xl">
          {course.thumbnail ? (
            <img src={course.thumbnail} alt={course.title} className="absolute inset-0 h-full w-full object-cover" />
          ) : (
            <>
              {/* Gradient background */}
              <div
                className={cn(
                  'absolute inset-0 bg-gradient-to-br',
                  getCourseGradient(course.id)
                )}
              />

              {/* Radial pattern */}
              <div
                className="absolute inset-0"
                style={{ background: getCoursePattern(course.id) }}
              />

              {/* Decorative dots */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-4 right-4 w-16 h-16 border border-white/10 rounded-full" />
                <div className="absolute bottom-4 left-4 w-24 h-24 border border-white/5 rounded-full" />
                <div className="absolute top-8 left-8 w-8 h-8 border border-white/10 rounded-full" />
              </div>

              {/* Book icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-white/15 transition-all duration-500">
                  <BookOpen className="w-7 h-7 text-white/70" />
                </div>
              </div>
            </>
          )}

          {/* Gradient overlay at bottom */}
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0F2520]/80 to-transparent" />

          {/* Badge */}
          {course.isFeatured && (
            <div className="absolute top-3 right-3 z-10">
              <CourseBadge text={t('courses.featuredBadge')} />
            </div>
          )}

          {/* Price tag */}
          <div className="absolute bottom-3 left-3 z-10">
            <div className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-black/40 backdrop-blur-sm border border-white/10">
              <span className="text-lg font-bold text-white">{course.price}</span>
              <span className="text-xs text-[rgba(249,246,240,0.55)]">{course.currency}</span>
            </div>
          </div>
        </div>

        {/* Card Content */}
        <div className="p-5 space-y-4">
          <CourseInfo
            title={course.title}
            description={course.description}
            categoryName={course.categoryName}
            teacherName={course.teacherName}
          />

          <CourseMeta
            students={course.studentsCount}
            lessons={course.lessonsCount}
            hours={course.duration}
          />

          <CourseButton slug={course.slug} />
        </div>

        {/* Bottom accent line */}
        <div className="absolute bottom-0 left-[5%] right-[5%] h-px bg-gradient-to-r from-transparent via-[#C7A187]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
    </motion.div>
  );
}

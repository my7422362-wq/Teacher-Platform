import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Spinner, ErrorState } from '@/components/ui';
import { CourseTabs } from './CourseTabs';
import { TeacherCoursesGroup } from './TeacherCoursesGroup';
import { usePublicCourses } from './queries';
import type { PublicCourse } from '@/services';

interface CoursesSectionProps {
  className?: string;
  /** Overrides for standalone-page reuse (default copy is home-page framing). */
  badgeKey?: string;
  titleKey?: string;
  descriptionKey?: string;
  /** Home-page preview mode: cap how many teachers/courses show, with a
   *  "browse all courses" link to the full /courses catalog. Omit both for
   *  the full, unlimited catalog view. */
  limitTeachers?: number;
  limitCoursesPerTeacher?: number;
}

interface TeacherGroup {
  teacherId: number;
  teacherName: string;
  courses: PublicCourse[];
}

function groupByTeacher(courses: PublicCourse[]): TeacherGroup[] {
  const groups = new Map<number, TeacherGroup>();
  for (const course of courses) {
    const existing = groups.get(course.teacherId);
    if (existing) {
      existing.courses.push(course);
    } else {
      groups.set(course.teacherId, { teacherId: course.teacherId, teacherName: course.teacherName, courses: [course] });
    }
  }
  return Array.from(groups.values()).sort((a, b) => b.courses.length - a.courses.length);
}

const itemFadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' as const },
  },
};

export function CoursesSection({
  className,
  badgeKey = 'courses.badge',
  titleKey = 'courses.title',
  descriptionKey = 'courses.description',
  limitTeachers,
  limitCoursesPerTeacher,
}: CoursesSectionProps) {
  const { t } = useTranslation();
  const { data: courses = [], isLoading, isError, refetch } = usePublicCourses();
  const [activeTab, setActiveTab] = useState<string>(t('courses.allCategories'));

  const categories = useMemo(() => {
    const unique = Array.from(new Set(courses.map((c) => c.categoryName)));
    return [t('courses.allCategories'), ...unique];
  }, [courses, t]);

  const filteredCourses = useMemo(() => {
    if (activeTab === t('courses.allCategories')) return courses;
    return courses.filter((course) => course.categoryName === activeTab);
  }, [courses, activeTab, t]);

  const teacherGroups = useMemo(() => {
    const groups = groupByTeacher(filteredCourses);
    const limited = limitTeachers ? groups.slice(0, limitTeachers) : groups;
    return limitCoursesPerTeacher
      ? limited.map((group) => ({ ...group, courses: group.courses.slice(0, limitCoursesPerTeacher) }))
      : limited;
  }, [filteredCourses, limitTeachers, limitCoursesPerTeacher]);

  const isPreview = limitTeachers !== undefined || limitCoursesPerTeacher !== undefined;

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
              <span className="text-sm font-medium text-[rgba(249,246,240,0.75)]">{t(badgeKey)}</span>
            </motion.div>

            {/* Title */}
            <motion.h2
              variants={itemFadeUp}
              className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight"
            >
              <span className="bg-gradient-to-r from-[#D4B59E] via-[#C7A187] to-[#D4B59E] bg-clip-text text-transparent bg-[length:200%_auto] animate-[gradient-shift_3s_ease_infinite]">
                {t(titleKey)}
              </span>
            </motion.h2>

            {/* Description */}
            <motion.p
              variants={itemFadeUp}
              className="mt-6 text-base sm:text-lg text-[rgba(249,246,240,0.55)] leading-relaxed max-w-2xl mx-auto"
            >
              {t(descriptionKey)}
            </motion.p>
          </motion.div>

          {isLoading ? (
            <div className="flex justify-center py-16">
              <Spinner />
            </div>
          ) : isError ? (
            <ErrorState description={t('courses.loadFailed')} onRetry={() => refetch()} />
          ) : (
            <>
              {/* Filter Tabs */}
              {!isPreview && categories.length > 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mb-10 sm:mb-12"
                >
                  <CourseTabs
                    categories={categories}
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                  />
                </motion.div>
              )}

              {/* Courses grouped by teacher */}
              {teacherGroups.length > 0 ? (
                <div className="space-y-14">
                  {teacherGroups.map((group) => (
                    <TeacherCoursesGroup
                      key={group.teacherId}
                      teacherName={group.teacherName}
                      courses={group.courses}
                    />
                  ))}
                </div>
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

              {isPreview && teacherGroups.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="mt-14 text-center"
                >
                  <Link
                    to="/courses"
                    className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-[#D4B59E] to-[#C7A187] px-8 py-4 text-base font-bold text-[#0F2520] shadow-lg shadow-blue-600/20 transition-all duration-300 hover:from-[#D4B59E] hover:to-[#D4B59E]"
                  >
                    {t('courses.browseAll')}
                    <ArrowLeft className="h-4 w-4" />
                  </Link>
                </motion.div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Bottom fade gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0F2520] to-transparent -z-10" />
    </section>
  );
}

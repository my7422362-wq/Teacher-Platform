import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { GraduationCap } from 'lucide-react';
import { CourseCard } from './CourseCard';
import type { PublicCourse } from '@/services';

interface TeacherCoursesGroupProps {
  teacherName: string;
  courses: PublicCourse[];
}

export function TeacherCoursesGroup({ teacherName, courses }: TeacherCoursesGroupProps) {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-3 border-b border-white/10 pb-4"
      >
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#D4B59E]/15 text-[#D4B59E]">
          <GraduationCap className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-[#F9F6F0]">{teacherName}</h3>
          <p className="text-sm text-[rgba(249,246,240,0.55)]">
            {t('courses.teacherCoursesCount', { count: courses.length })}
          </p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {courses.map((course, index) => (
          <CourseCard key={course.id} course={course} index={index} />
        ))}
      </div>
    </div>
  );
}

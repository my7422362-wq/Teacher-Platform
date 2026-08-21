import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Users, BookOpen } from 'lucide-react';
import type { TeacherSummary } from './summarize';

export function TeacherCard({ teacher, index }: { teacher: TeacherSummary; index: number }) {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: 0.08 * index, ease: 'easeOut' }}
      className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-[#D4B59E]/30 hover:bg-white/[0.08]"
    >
      <div className="flex items-center gap-4">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#D4B59E]/30 to-[#C7A187]/30 border border-white/10 text-xl font-bold text-[#D4B59E]">
          {teacher.teacherName.charAt(0)}
        </div>
        <div className="min-w-0">
          <h3 className="truncate text-lg font-bold text-[#F9F6F0]">{teacher.teacherName}</h3>
          <div className="mt-1 flex flex-wrap gap-1.5">
            {teacher.subjects.map((subject) => (
              <span
                key={subject}
                className="rounded-full bg-[#D4B59E]/15 px-2.5 py-0.5 text-xs font-medium text-[#D4B59E]"
              >
                {subject}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-5 flex items-center gap-4 text-sm text-[rgba(249,246,240,0.65)]">
        <div className="flex items-center gap-1.5">
          <BookOpen className="h-4 w-4 text-[#D4B59E]" />
          {t('ourTeachers.coursesCount', { count: teacher.coursesCount })}
        </div>
        <div className="flex items-center gap-1.5">
          <Users className="h-4 w-4 text-[#D4B59E]" />
          {t('ourTeachers.studentsCount', { count: teacher.studentsCount })}
        </div>
      </div>

      <Link
        to="/courses"
        className="mt-5 block w-full rounded-xl border border-white/10 bg-white/5 py-2.5 text-center text-sm font-medium text-[#F9F6F0] transition-colors hover:border-[#D4B59E]/40 hover:bg-white/10"
      >
        {t('ourTeachers.viewCourses')}
      </Link>
    </motion.div>
  );
}

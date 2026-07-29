import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import { Star, Users, BookOpen, Clock } from 'lucide-react';

interface CourseMetaProps {
  rating: number;
  students: number;
  lessons: number;
  hours: number;
  className?: string;
}

export function CourseMeta({
  rating,
  students,
  lessons,
  hours,
  className,
}: CourseMetaProps) {
  const { t } = useTranslation();

  return (
    <div
      className={cn(
        'grid grid-cols-2 gap-2',
        className
      )}
    >
      {/* Rating */}
      <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[rgba(255,255,255,0.04)] border border-[rgba(212,181,158,0.08)]">
        <Star className="w-3.5 h-3.5 text-[#D4B59E] fill-[#D4B59E]" />
        <span className="text-sm font-bold text-[#D4B59E]">{rating}</span>
      </div>

      {/* Students */}
      <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[rgba(255,255,255,0.04)] border border-[rgba(212,181,158,0.08)]">
        <Users className="w-3.5 h-3.5 text-[#D4B59E]" />
        <span className="text-xs text-[rgba(249,246,240,0.65)]">
          {students >= 1000
            ? `${(students / 1000).toFixed(students % 1000 === 0 ? 0 : 1)}k`
            : students}
        </span>
      </div>

      {/* Lessons */}
      <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[rgba(255,255,255,0.04)] border border-[rgba(212,181,158,0.08)]">
        <BookOpen className="w-3.5 h-3.5 text-[#D4B59E]" />
        <span className="text-xs text-[rgba(249,246,240,0.65)]">{lessons} {t('courses.lessonsUnit')}</span>
      </div>

      {/* Hours */}
      <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[rgba(255,255,255,0.04)] border border-[rgba(212,181,158,0.08)]">
        <Clock className="w-3.5 h-3.5 text-[#D4B59E]" />
        <span className="text-xs text-[rgba(249,246,240,0.65)]">{hours} {t('courses.hoursUnit')}</span>
      </div>
    </div>
  );
}

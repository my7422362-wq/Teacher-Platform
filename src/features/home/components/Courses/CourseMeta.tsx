import { motion } from 'framer-motion';
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
  return (
    <div
      className={cn(
        'grid grid-cols-2 gap-2',
        className
      )}
    >
      {/* Rating */}
      <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 border border-white/5">
        <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
        <span className="text-sm font-bold text-amber-400">{rating}</span>
      </div>

      {/* Students */}
      <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 border border-white/5">
        <Users className="w-3.5 h-3.5 text-blue-400" />
        <span className="text-xs text-gray-300">
          {students >= 1000
            ? `${(students / 1000).toFixed(students % 1000 === 0 ? 0 : 1)}k`
            : students}
        </span>
      </div>

      {/* Lessons */}
      <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 border border-white/5">
        <BookOpen className="w-3.5 h-3.5 text-purple-400" />
        <span className="text-xs text-gray-300">{lessons} درس</span>
      </div>

      {/* Hours */}
      <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 border border-white/5">
        <Clock className="w-3.5 h-3.5 text-emerald-400" />
        <span className="text-xs text-gray-300">{hours} ساعة</span>
      </div>
    </div>
  );
}


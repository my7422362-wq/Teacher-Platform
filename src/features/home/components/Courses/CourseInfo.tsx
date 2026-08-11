import { cn } from '@/lib/utils';
import { BookOpen, GraduationCap } from 'lucide-react';

interface CourseInfoProps {
  title: string;
  description: string;
  categoryName: string;
  teacherName: string;
  className?: string;
}

export function CourseInfo({
  title,
  description,
  categoryName,
  teacherName,
  className,
}: CourseInfoProps) {
  return (
    <div className={cn('space-y-3', className)}>
      {/* Category line */}
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-lg bg-[rgba(212,181,158,0.15)] flex items-center justify-center">
          <BookOpen className="w-3.5 h-3.5 text-[#D4B59E]" />
        </div>
        <span className="text-xs font-medium text-[#D4B59E]/80">{categoryName}</span>
      </div>

      {/* Title */}
      <h3 className="text-lg font-bold text-[#F9F6F0] leading-snug line-clamp-2 group-hover:text-[#D4B59E] transition-colors duration-300">
        {title}
      </h3>

      {/* Description */}
      <p className="text-sm text-[rgba(249,246,240,0.55)] leading-relaxed line-clamp-2">
        {description}
      </p>

      {/* Teacher */}
      <div className="flex items-center gap-2 pt-1">
        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[rgba(212,181,158,0.3)] to-[rgba(212,181,158,0.15)] flex items-center justify-center">
          <GraduationCap className="w-3.5 h-3.5 text-[#D4B59E]" />
        </div>
        <span className="text-xs font-medium text-[rgba(249,246,240,0.55)]">
          {teacherName}
        </span>
      </div>
    </div>
  );
}

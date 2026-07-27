import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { BookOpen, GraduationCap } from 'lucide-react';

interface CourseInfoProps {
  title: string;
  subtitle: string;
  topics: string[];
  teacherName: string;
  subject: string;
  className?: string;
}

export function CourseInfo({
  title,
  subtitle,
  topics,
  teacherName,
  subject,
  className,
}: CourseInfoProps) {
  return (
    <div className={cn('space-y-3', className)}>
      {/* Subject line */}
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-lg bg-blue-500/15 flex items-center justify-center">
          <BookOpen className="w-3.5 h-3.5 text-blue-400" />
        </div>
        <span className="text-xs font-medium text-blue-400/80">{subject}</span>
      </div>

      {/* Title */}
      <h3 className="text-lg font-bold text-white leading-snug line-clamp-2 group-hover:text-blue-300 transition-colors duration-300">
        {title}
      </h3>

      {/* Subtitle */}
      <p className="text-sm text-gray-400 leading-relaxed line-clamp-1">
        {subtitle}
      </p>

      {/* Topics */}
      <div className="flex flex-wrap gap-2">
        {topics.map((topic) => (
          <span
            key={topic}
            className="inline-flex items-center px-2.5 py-1 rounded-lg bg-white/5 border border-white/5 text-xs text-gray-300"
          >
            {topic}
          </span>
        ))}
      </div>

      {/* Teacher */}
      <div className="flex items-center gap-2 pt-1">
        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500/30 to-purple-500/30 flex items-center justify-center">
          <GraduationCap className="w-3.5 h-3.5 text-purple-400" />
        </div>
        <span className="text-xs font-medium text-gray-400">
          {teacherName}
        </span>
      </div>
    </div>
  );
}


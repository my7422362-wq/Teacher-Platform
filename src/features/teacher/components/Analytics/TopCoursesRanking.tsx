import { useTranslation } from 'react-i18next';
import { Card, CardContent, EmptyState } from '@/components/ui';
import { TrendingUp } from 'lucide-react';
import type { TopCourseItem } from './types';

export function TopCoursesRanking({ courses }: { courses: TopCourseItem[] }) {
  const { t } = useTranslation();

  if (courses.length === 0) {
    return (
      <EmptyState icon={<TrendingUp className="h-12 w-12" />} description={t('teacherPages.analytics.topCourses.empty')} />
    );
  }

  const maxStudents = Math.max(...courses.map((c) => c.studentsCount), 1);

  return (
    <Card>
      <CardContent className="divide-y divide-[rgba(212,181,158,0.12)] p-0">
        {courses.map((course, index) => (
          <div key={course.id} className="flex items-center gap-4 p-4">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#D4B59E]/15 text-sm font-semibold text-[#D4B59E]">
              {index + 1}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate font-medium text-[#F9F6F0]">{course.title}</p>
              <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-[#0F2520]">
                <div
                  className="h-full rounded-full bg-[#D4B59E]"
                  style={{ width: `${(course.studentsCount / maxStudents) * 100}%` }}
                />
              </div>
              <div className="mt-1.5 flex items-center justify-between text-xs text-[rgba(249,246,240,0.55)]">
                <span>{t('teacherPages.analytics.topCourses.students', { count: course.studentsCount })}</span>
                <span>
                  {t('teacherPages.analytics.topCourses.revenue')}: {course.revenue.toLocaleString()} {course.currency}
                </span>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

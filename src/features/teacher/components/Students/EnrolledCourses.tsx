import { useTranslation } from 'react-i18next';
import { Card, CardContent, Badge, EmptyState } from '@/components/ui';
import type { StudentCourseEntry } from './data';

export function EnrolledCourses({ courses }: { courses: StudentCourseEntry[] }) {
  const { t } = useTranslation();

  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold text-[#F9F6F0]">
        {t('teacherPages.studentDetail.coursesTitle')}
      </h2>

      {courses.length === 0 ? (
        <EmptyState description={t('teacherPages.studentDetail.coursesEmpty')} />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {courses.map(({ course, progress }) => (
            <Card key={course.id}>
              <CardContent className="space-y-3 p-5">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold text-[#F9F6F0]">{course.title}</h3>
                  <Badge variant={progress.isCompleted ? 'success' : 'outline'}>
                    {progress.percentComplete}%
                  </Badge>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#0F2520]">
                  <div
                    className="h-full rounded-full bg-[#D4B59E]"
                    style={{ width: `${progress.percentComplete}%` }}
                  />
                </div>
                <p className="text-xs text-[rgba(249,246,240,0.55)]">
                  {progress.completedLessonsCount} / {progress.totalLessonsCount}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
}

import { useTranslation } from 'react-i18next';
import { Card, CardContent, Badge, EmptyState, ErrorState, Spinner } from '@/components/ui';
import { useStudentCourses } from './queries';

export function EnrolledCourses({ studentId }: { studentId: number }) {
  const { t } = useTranslation();
  const { data: courses = [], isLoading, isError, refetch } = useStudentCourses(studentId);

  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold text-[#F9F6F0]">
        {t('teacherPages.studentDetail.coursesTitle')}
      </h2>

      {isLoading ? (
        <div className="flex justify-center py-10">
          <Spinner size="sm" />
        </div>
      ) : isError ? (
        <ErrorState description={t('teacherPages.students.toast.loadFailed')} onRetry={() => refetch()} />
      ) : courses.length === 0 ? (
        <EmptyState description={t('teacherPages.studentDetail.coursesEmpty')} />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {courses.map((entry) => (
            <Card key={entry.courseId}>
              <CardContent className="space-y-3 p-5">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold text-[#F9F6F0]">{entry.courseTitle}</h3>
                  <Badge variant={entry.progressPercent >= 100 ? 'success' : 'outline'}>
                    {entry.progressPercent}%
                  </Badge>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#0F2520]">
                  <div
                    className="h-full rounded-full bg-[#D4B59E]"
                    style={{ width: `${entry.progressPercent}%` }}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
}

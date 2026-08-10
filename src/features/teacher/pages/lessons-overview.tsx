import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { PageHeader } from '@/components/shared/page-header';
import { Card, CardContent, Badge, Spinner, ErrorState, EmptyState } from '@/components/ui';
import { ListVideo } from 'lucide-react';
import { useTeacherCourses } from '@/features/teacher/components/Courses/queries';

export function TeacherLessonsOverviewPage() {
  const { t } = useTranslation();
  const { data: courses = [], isLoading, isError, refetch } = useTeacherCourses();

  return (
    <div className="space-y-6">
      <PageHeader title={t('teacherPages.lessons.title')} description={t('teacherPages.lessons.description')} />

      {isLoading ? (
        <div className="flex justify-center py-16">
          <Spinner />
        </div>
      ) : isError ? (
        <ErrorState description={t('teacherPages.courses.toast.loadFailed')} onRetry={() => refetch()} />
      ) : courses.length === 0 ? (
        <EmptyState description={t('teacherPages.courses.empty')} />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <Link key={course.id} to={`/teacher/courses/${course.slug}/lessons`}>
              <Card>
                <CardContent className="flex items-center gap-4 p-5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#D4B59E]/15 text-[#D4B59E]">
                    <ListVideo className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium text-[#F9F6F0]">{course.title}</p>
                    <Badge variant="outline" className="mt-1">
                      {t('teacherPages.lessons.lessonsCount', { count: course.lessonsCount })}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

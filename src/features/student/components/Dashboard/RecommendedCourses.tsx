import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Card, CardContent, EmptyState, Spinner, ErrorState } from '@/components/ui';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Sparkles } from 'lucide-react';
import { useMyCourses, useRecommendedCourses } from './queries';

export function RecommendedCourses() {
  const { t } = useTranslation();
  const { data: myCourses = [] } = useMyCourses();
  const { data: allCourses = [], isLoading, isError, refetch } = useRecommendedCourses();

  const enrolledIds = new Set(myCourses.map((c) => c.courseId));
  const recommended = allCourses.filter((c) => !enrolledIds.has(c.id)).slice(0, 3);

  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold text-[#F9F6F0]">
        {t('studentPages.dashboard.recommended.title')}
      </h2>

      {isLoading ? (
        <div className="flex justify-center py-10">
          <Spinner />
        </div>
      ) : isError ? (
        <ErrorState description={t('studentPages.dashboard.recommended.loadFailed')} onRetry={() => refetch()} />
      ) : recommended.length === 0 ? (
        <EmptyState
          icon={<Sparkles className="h-12 w-12" />}
          description={t('studentPages.dashboard.recommended.empty')}
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {recommended.map((course) => (
            <Card key={course.id}>
              <CardContent className="space-y-3 p-5">
                <h3 className="font-semibold text-[#F9F6F0]">{course.title}</h3>
                <p className="text-sm text-[rgba(249,246,240,0.65)]">{course.teacherName}</p>
                <p className="text-sm font-semibold text-[#F9F6F0]">
                  {course.price} {course.currency}
                </p>
                <Link
                  to={`/courses/${course.slug}`}
                  className={cn(buttonVariants({ variant: 'secondary', size: 'sm' }), 'w-full')}
                >
                  {t('studentPages.dashboard.recommended.viewCourse')}
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
}

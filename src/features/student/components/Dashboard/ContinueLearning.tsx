import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Card, CardContent, EmptyState } from '@/components/ui';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { PlayCircle } from 'lucide-react';
import { inProgressCourses } from './data';

export function ContinueLearning() {
  const { t } = useTranslation();

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-[#F9F6F0]">
          {t('studentPages.dashboard.continueLearning.title')}
        </h2>
        <Link to="/student/courses" className="text-sm text-[#D4B59E] hover:underline">
          {t('common.viewAll')}
        </Link>
      </div>

      {inProgressCourses.length === 0 ? (
        <EmptyState description={t('studentPages.dashboard.continueLearning.empty')} />
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {inProgressCourses.map(({ course, progress }) => (
            <Card key={course.id}>
              <CardContent className="space-y-4 p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-semibold text-[#F9F6F0]">{course.title}</h3>
                    <p className="text-sm text-[rgba(249,246,240,0.65)]">{course.teacherName}</p>
                  </div>
                  <span className="shrink-0 text-sm font-semibold text-[#D4B59E]">
                    {progress.percentComplete}%
                  </span>
                </div>

                <div className="h-2 w-full overflow-hidden rounded-full bg-[#0F2520]">
                  <div
                    className="h-full rounded-full bg-[#D4B59E]"
                    style={{ width: `${progress.percentComplete}%` }}
                  />
                </div>

                <div className="flex items-center justify-between gap-3">
                  <p className="text-xs text-[rgba(249,246,240,0.55)]">
                    {t('studentPages.dashboard.continueLearning.lessonsProgress', {
                      completed: progress.completedLessonsCount,
                      total: progress.totalLessonsCount,
                    })}
                  </p>
                  <Link
                    to={`/courses/${course.slug}`}
                    className={cn(buttonVariants({ variant: 'secondary', size: 'sm' }))}
                  >
                    <PlayCircle className="h-4 w-4" />
                    {t('studentPages.dashboard.continueLearning.resume')}
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
}

import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import {
  Card,
  CardContent,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Badge,
  EmptyState,
  Spinner,
  ErrorState,
} from '@/components/ui';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useMyCourses } from './queries';
import type { StudentCourseProgress } from '@/features/teacher/components/Students/types';

type FilterKey = 'all' | 'inProgress' | 'completed';

export function MyCoursesList() {
  const { t } = useTranslation();
  const { data: courses = [], isLoading, isError, refetch } = useMyCourses();

  const filters: Record<FilterKey, StudentCourseProgress[]> = {
    all: courses,
    inProgress: courses.filter((c) => c.progressPercent < 100),
    completed: courses.filter((c) => c.progressPercent >= 100),
  };

  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold text-[#F9F6F0]">
        {t('studentPages.dashboard.myCourses.title')}
      </h2>

      {isLoading ? (
        <div className="flex justify-center py-10">
          <Spinner />
        </div>
      ) : isError ? (
        <ErrorState description={t('studentPages.courses.toast.loadFailed')} onRetry={() => refetch()} />
      ) : (
        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">{t('studentPages.dashboard.myCourses.tabs.all')}</TabsTrigger>
            <TabsTrigger value="inProgress">{t('studentPages.dashboard.myCourses.tabs.inProgress')}</TabsTrigger>
            <TabsTrigger value="completed">{t('studentPages.dashboard.myCourses.tabs.completed')}</TabsTrigger>
          </TabsList>

          {(Object.keys(filters) as FilterKey[]).map((key) => (
            <TabsContent key={key} value={key}>
              {filters[key].length === 0 ? (
                <EmptyState description={t('studentPages.dashboard.myCourses.empty')} />
              ) : (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {filters[key].map((entry) => (
                    <Card key={entry.courseId}>
                      <CardContent className="space-y-3 p-5">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-semibold text-[#F9F6F0]">{entry.courseTitle}</h3>
                          <Badge variant={entry.progressPercent >= 100 ? 'success' : 'outline'}>
                            {entry.progressPercent >= 100
                              ? t('studentPages.dashboard.myCourses.tabs.completed')
                              : t('studentPages.dashboard.myCourses.tabs.inProgress')}
                          </Badge>
                        </div>
                        <p className="text-sm text-[rgba(249,246,240,0.65)]">{entry.teacherName}</p>
                        <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#0F2520]">
                          <div
                            className="h-full rounded-full bg-[#D4B59E]"
                            style={{ width: `${entry.progressPercent}%` }}
                          />
                        </div>
                        <Link
                          to={`/courses/${entry.slug}`}
                          className={cn(buttonVariants({ variant: 'outline', size: 'sm' }), 'w-full')}
                        >
                          {t('studentPages.dashboard.continueLearning.resume')}
                        </Link>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      )}
    </section>
  );
}

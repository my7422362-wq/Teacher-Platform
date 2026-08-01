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
} from '@/components/ui';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { enrolledCourses, inProgressCourses, completedCourses, type EnrolledCourse } from './data';

type FilterKey = 'all' | 'inProgress' | 'completed';

const FILTERS: Record<FilterKey, EnrolledCourse[]> = {
  all: enrolledCourses,
  inProgress: inProgressCourses,
  completed: completedCourses,
};

export function MyCoursesList() {
  const { t } = useTranslation();

  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold text-[#F9F6F0]">
        {t('studentPages.dashboard.myCourses.title')}
      </h2>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">{t('studentPages.dashboard.myCourses.tabs.all')}</TabsTrigger>
          <TabsTrigger value="inProgress">{t('studentPages.dashboard.myCourses.tabs.inProgress')}</TabsTrigger>
          <TabsTrigger value="completed">{t('studentPages.dashboard.myCourses.tabs.completed')}</TabsTrigger>
        </TabsList>

        {(Object.keys(FILTERS) as FilterKey[]).map((key) => (
          <TabsContent key={key} value={key}>
            {FILTERS[key].length === 0 ? (
              <EmptyState description={t('studentPages.dashboard.myCourses.empty')} />
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {FILTERS[key].map(({ course, progress }) => (
                  <Card key={course.id}>
                    <CardContent className="space-y-3 p-5">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-semibold text-[#F9F6F0]">{course.title}</h3>
                        <Badge variant={progress.isCompleted ? 'success' : 'outline'}>
                          {progress.isCompleted
                            ? t('studentPages.dashboard.myCourses.tabs.completed')
                            : t('studentPages.dashboard.myCourses.tabs.inProgress')}
                        </Badge>
                      </div>
                      <p className="text-sm text-[rgba(249,246,240,0.65)]">{course.teacherName}</p>
                      <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#0F2520]">
                        <div
                          className="h-full rounded-full bg-[#D4B59E]"
                          style={{ width: `${progress.percentComplete}%` }}
                        />
                      </div>
                      <Link
                        to={`/courses/${course.slug}`}
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
    </section>
  );
}

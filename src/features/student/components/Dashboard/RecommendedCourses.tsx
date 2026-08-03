import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Card, CardContent, EmptyState } from '@/components/ui';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Star, Sparkles } from 'lucide-react';
import { recommendedCourses } from './data';

export function RecommendedCourses() {
  const { t } = useTranslation();

  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold text-[#F9F6F0]">
        {t('studentPages.dashboard.recommended.title')}
      </h2>

      {recommendedCourses.length === 0 ? (
        <EmptyState
          icon={<Sparkles className="h-12 w-12" />}
          description={t('studentPages.dashboard.recommended.empty')}
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {recommendedCourses.slice(0, 3).map((course) => (
            <Card key={course.id}>
              <CardContent className="space-y-3 p-5">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold text-[#F9F6F0]">{course.title}</h3>
                  <span className="flex shrink-0 items-center gap-1 text-sm text-[#D4B59E]">
                    <Star className="h-3.5 w-3.5 fill-current" />
                    {course.rating}
                  </span>
                </div>
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

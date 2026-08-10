import { useTranslation } from 'react-i18next';
import { PageHeader } from '@/components/shared/page-header';
import { Spinner, ErrorState } from '@/components/ui';
import { StatsOverview, AttendanceChart } from '@/features/teacher/components/Dashboard';
import { GradesOverviewStats, useGradesOverview } from '@/features/teacher/components/Grades';
import { TopCoursesRanking, useTopCourses } from '@/features/teacher/components/Analytics';

export function TeacherAnalyticsPage() {
  const { t } = useTranslation();
  const { data: gradesOverview, isLoading: gradesLoading, isError: gradesError, refetch: refetchGrades } = useGradesOverview();
  const { data: topCourses, isLoading: coursesLoading, isError: coursesError, refetch: refetchCourses } = useTopCourses();

  return (
    <div className="space-y-8">
      <PageHeader
        title={t('teacherPages.analytics.title')}
        description={t('teacherPages.analytics.description')}
      />

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-[#F9F6F0]">{t('teacherPages.analytics.sectionOverview')}</h2>
        <StatsOverview />
      </section>

      <AttendanceChart />

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-[#F9F6F0]">{t('teacherPages.analytics.sectionPerformance')}</h2>
        {gradesLoading ? (
          <div className="flex justify-center py-8">
            <Spinner />
          </div>
        ) : gradesError || !gradesOverview ? (
          <ErrorState description={t('teacherPages.grades.toast.loadFailed')} onRetry={() => refetchGrades()} />
        ) : (
          <GradesOverviewStats overview={gradesOverview} />
        )}
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-[#F9F6F0]">{t('teacherPages.analytics.sectionTopCourses')}</h2>
        {coursesLoading ? (
          <div className="flex justify-center py-8">
            <Spinner />
          </div>
        ) : coursesError ? (
          <ErrorState description={t('teacherPages.courses.toast.loadFailed')} onRetry={() => refetchCourses()} />
        ) : (
          <TopCoursesRanking courses={topCourses} />
        )}
      </section>
    </div>
  );
}

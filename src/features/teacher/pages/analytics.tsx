import { useTranslation } from 'react-i18next';
import { PageHeader } from '@/components/shared/page-header';
import { StatsOverview, AttendanceChart, EnrollmentChart } from '@/features/teacher/components/Dashboard';
import { GradesOverviewStats, getGradesOverview } from '@/features/teacher/components/Grades';
import { TopCoursesRanking, getTopCourses } from '@/features/teacher/components/Analytics';

export function TeacherAnalyticsPage() {
  const { t } = useTranslation();
  const gradesOverview = getGradesOverview();
  const topCourses = getTopCourses();

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

      <div className="grid gap-8 lg:grid-cols-2">
        <AttendanceChart />
        <EnrollmentChart />
      </div>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-[#F9F6F0]">{t('teacherPages.analytics.sectionPerformance')}</h2>
        <GradesOverviewStats overview={gradesOverview} />
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-[#F9F6F0]">{t('teacherPages.analytics.sectionTopCourses')}</h2>
        <TopCoursesRanking courses={topCourses} />
      </section>
    </div>
  );
}

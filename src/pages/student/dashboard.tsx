import { useTranslation } from 'react-i18next';
import { PageHeader } from '@/components/common/page-header';
import {
  StatsOverview,
  ContinueLearning,
  Schedule,
  Grades,
  NotificationsPanel,
  currentStudent,
} from '@/features/student/components/Dashboard';

export function StudentDashboardPage() {
  const { t } = useTranslation();

  return (
    <div className="space-y-8">
      <PageHeader
        title={t('studentPages.dashboard.welcome', { name: currentStudent.name })}
        description={t('studentPages.dashboard.welcomeSubtitle')}
      />

      <StatsOverview />

      <ContinueLearning />

      <div className="grid gap-8 lg:grid-cols-2">
        <Schedule limit={3} viewAllHref="/student/schedule" />
        <Grades limit={3} viewAllHref="/student/grades" />
      </div>

      <NotificationsPanel limit={3} viewAllHref="/student/notifications" />
    </div>
  );
}

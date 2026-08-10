import { useTranslation } from 'react-i18next';
import { PageHeader } from '@/components/shared/page-header';
import { useAuth } from '@/providers';
import {
  StatsOverview,
  ContinueLearning,
  Schedule,
  Grades,
  NotificationsPanel,
} from '@/features/student/components/Dashboard';

export function StudentDashboardPage() {
  const { t } = useTranslation();
  const { currentUser } = useAuth();

  return (
    <div className="space-y-8">
      <PageHeader
        title={t('studentPages.dashboard.welcome', { name: currentUser?.name ?? '' })}
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


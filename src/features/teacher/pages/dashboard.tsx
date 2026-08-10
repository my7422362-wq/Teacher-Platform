import { useTranslation } from 'react-i18next';
import { PageHeader } from '@/components/shared/page-header';
import { useAuth } from '@/providers/auth-provider';
import {
  StatsOverview,
  AttendanceChart,
  RecentNotifications,
  QuickActions,
} from '@/features/teacher/components/Dashboard';

export function TeacherDashboardPage() {
  const { t } = useTranslation();
  const { currentUser } = useAuth();

  return (
    <div className="space-y-8">
      <PageHeader
        title={t('teacherPages.dashboard.welcome', { name: currentUser?.name ?? '' })}
        description={t('teacherPages.dashboard.welcomeSubtitle')}
      />

      <StatsOverview />

      <QuickActions />

      <div className="grid gap-8 lg:grid-cols-2">
        <AttendanceChart />
        <RecentNotifications />
      </div>
    </div>
  );
}

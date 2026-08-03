import { useTranslation } from 'react-i18next';
import { PageHeader } from '@/components/shared/page-header';
import {
  StatsOverview,
  AttendanceChart,
  EnrollmentChart,
  TodaySchedule,
  RecentNotifications,
  QuickActions,
  currentTeacher,
} from '@/features/teacher/components/Dashboard';

export function TeacherDashboardPage() {
  const { t } = useTranslation();

  return (
    <div className="space-y-8">
      <PageHeader
        title={t('teacherPages.dashboard.welcome', { name: currentTeacher.name })}
        description={t('teacherPages.dashboard.welcomeSubtitle')}
      />

      <StatsOverview />

      <QuickActions />

      <div className="grid gap-8 lg:grid-cols-2">
        <AttendanceChart />
        <EnrollmentChart />
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <TodaySchedule />
        <RecentNotifications />
      </div>
    </div>
  );
}


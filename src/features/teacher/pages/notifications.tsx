import { useTranslation } from 'react-i18next';
import { PageHeader } from '@/components/shared/page-header';
import { NotificationsList } from '@/features/teacher/components/Notifications';

export function TeacherNotificationsPage() {
  const { t } = useTranslation();

  return (
    <div className="space-y-8">
      <PageHeader
        title={t('teacherPages.notifications.title')}
        description={t('teacherPages.notifications.description')}
      />
      <NotificationsList />
    </div>
  );
}

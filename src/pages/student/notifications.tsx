import { useTranslation } from 'react-i18next';
import { PageHeader } from '@/components/common/page-header';
import { NotificationsPanel } from '@/features/student/components/Dashboard';

export function StudentNotificationsPage() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('studentPages.notifications.title')}
        description={t('studentPages.notifications.description')}
      />
      <NotificationsPanel />
    </div>
  );
}

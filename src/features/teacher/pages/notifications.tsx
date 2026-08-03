import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PageHeader } from '@/components/shared/page-header';
import { NotificationComposer, NotificationLog, getNotificationLog } from '@/features/teacher/components/Notifications';

export function TeacherNotificationsPage() {
  const { t } = useTranslation();
  const [entries, setEntries] = useState(getNotificationLog);

  return (
    <div className="space-y-8">
      <PageHeader
        title={t('teacherPages.notifications.title')}
        description={t('teacherPages.notifications.description')}
      />
      <NotificationComposer onSent={() => setEntries(getNotificationLog())} />
      <NotificationLog entries={entries} />
    </div>
  );
}


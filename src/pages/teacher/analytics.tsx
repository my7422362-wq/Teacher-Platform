import { useTranslation } from 'react-i18next';
import { PageHeader } from '@/components/common/page-header';

export function TeacherAnalyticsPage() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('teacherPages.analytics.title')}
        description={t('teacherPages.analytics.description')}
      />
    </div>
  );
}

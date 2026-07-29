import { useTranslation } from 'react-i18next';
import { PageHeader } from '@/components/common/page-header';

export function StudentDashboardPage() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('studentPages.dashboard.title')}
        description={t('studentPages.dashboard.description')}
      />
    </div>
  );
}

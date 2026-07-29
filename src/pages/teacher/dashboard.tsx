import { useTranslation } from 'react-i18next';
import { PageHeader } from '@/components/common/page-header';

export function TeacherDashboardPage() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('teacherPages.dashboard.title')}
        description={t('teacherPages.dashboard.description')}
      />
    </div>
  );
}

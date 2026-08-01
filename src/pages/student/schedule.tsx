import { useTranslation } from 'react-i18next';
import { PageHeader } from '@/components/common/page-header';
import { Schedule } from '@/features/student/components/Dashboard';

export function StudentSchedulePage() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('studentPages.schedule.title')}
        description={t('studentPages.schedule.description')}
      />
      <Schedule />
    </div>
  );
}

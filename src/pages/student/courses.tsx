import { useTranslation } from 'react-i18next';
import { PageHeader } from '@/components/common/page-header';

export function StudentCoursesPage() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('studentPages.courses.title')}
        description={t('studentPages.courses.description')}
      />
    </div>
  );
}

import { useTranslation } from 'react-i18next';
import { PageHeader } from '@/components/common/page-header';
import { Grades } from '@/features/student/components/Dashboard';

export function StudentGradesPage() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('studentPages.grades.title')}
        description={t('studentPages.grades.description')}
      />
      <Grades />
    </div>
  );
}

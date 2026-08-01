import { useTranslation } from 'react-i18next';
import { PageHeader } from '@/components/common/page-header';
import { ExamsList } from '@/features/student/components/Dashboard';

export function StudentExamsPage() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('studentPages.exams.title')}
        description={t('studentPages.exams.description')}
      />
      <ExamsList />
    </div>
  );
}

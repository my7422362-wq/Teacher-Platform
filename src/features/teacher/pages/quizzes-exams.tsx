import { useTranslation } from 'react-i18next';
import { PageHeader } from '@/components/shared/page-header';
import { QuizzesExamsGrid } from '@/features/teacher/components/QuizzesExams';

export function TeacherQuizzesExamsPage() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('teacherPages.quizzesExams.title')}
        description={t('teacherPages.quizzesExams.description')}
      />
      <QuizzesExamsGrid />
    </div>
  );
}


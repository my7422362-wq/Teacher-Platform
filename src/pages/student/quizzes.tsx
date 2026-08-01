import { useTranslation } from 'react-i18next';
import { PageHeader } from '@/components/common/page-header';
import { QuizzesList } from '@/features/student/components/Dashboard';

export function StudentQuizzesPage() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('studentPages.quizzes.title')}
        description={t('studentPages.quizzes.description')}
      />
      <QuizzesList />
    </div>
  );
}

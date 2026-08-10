import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { PageHeader } from '@/components/shared/page-header';
import { Spinner, ErrorState } from '@/components/ui';
import { ArrowRight } from 'lucide-react';
import { useTeacherQuiz, QuizQuestionsList } from '@/features/teacher/components/QuizzesExams';

export function TeacherQuizQuestionsPage() {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const quizId = Number(id);
  const { data: quiz, isLoading, isError, refetch } = useTeacherQuiz(quizId);

  return (
    <div className="space-y-6">
      <Link to="/teacher/quizzes-exams" className="inline-flex items-center gap-1.5 text-sm text-[#D4B59E] hover:underline">
        <ArrowRight className="h-4 w-4" />
        {t('teacherPages.quizzesExams.backToQuizzesExams')}
      </Link>

      {isLoading ? (
        <div className="flex justify-center py-16">
          <Spinner />
        </div>
      ) : isError || !quiz ? (
        <ErrorState description={t('teacherPages.quizzesExams.toast.loadFailed')} onRetry={() => refetch()} />
      ) : (
        <>
          <PageHeader title={quiz.title} description={t('teacherPages.quizzesExams.manageQuestions')} />
          <QuizQuestionsList quizId={quizId} />
        </>
      )}
    </div>
  );
}

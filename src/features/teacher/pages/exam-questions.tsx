import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { PageHeader } from '@/components/shared/page-header';
import { Spinner, ErrorState } from '@/components/ui';
import { ArrowRight } from 'lucide-react';
import { useTeacherExam, ExamQuestionsList } from '@/features/teacher/components/QuizzesExams';

export function TeacherExamQuestionsPage() {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const examId = Number(id);
  const { data: exam, isLoading, isError, refetch } = useTeacherExam(examId);

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
      ) : isError || !exam ? (
        <ErrorState description={t('teacherPages.quizzesExams.toast.loadFailed')} onRetry={() => refetch()} />
      ) : (
        <>
          <PageHeader title={exam.title} description={t('teacherPages.quizzesExams.manageQuestions')} />
          <ExamQuestionsList examId={examId} />
        </>
      )}
    </div>
  );
}

import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { PageHeader } from '@/components/common/page-header';
import { ArrowRight } from 'lucide-react';
import { getQuiz, QuizQuestionsList } from '@/features/teacher/components/QuizzesExams';

export function TeacherQuizQuestionsPage() {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const quiz = getQuiz(Number(id));

  if (!quiz) return null;

  return (
    <div className="space-y-6">
      <Link to="/teacher/quizzes-exams" className="inline-flex items-center gap-1.5 text-sm text-[#D4B59E] hover:underline">
        <ArrowRight className="h-4 w-4" />
        {t('teacherPages.quizzesExams.backToQuizzesExams')}
      </Link>
      <PageHeader title={quiz.title} description={t('teacherPages.quizzesExams.manageQuestions')} />
      <QuizQuestionsList quizId={quiz.id} />
    </div>
  );
}

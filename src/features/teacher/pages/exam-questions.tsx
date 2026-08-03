import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { PageHeader } from '@/components/shared/page-header';
import { ArrowRight } from 'lucide-react';
import { getExam, ExamQuestionsList } from '@/features/teacher/components/QuizzesExams';

export function TeacherExamQuestionsPage() {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const exam = getExam(Number(id));

  if (!exam) return null;

  return (
    <div className="space-y-6">
      <Link to="/teacher/quizzes-exams" className="inline-flex items-center gap-1.5 text-sm text-[#D4B59E] hover:underline">
        <ArrowRight className="h-4 w-4" />
        {t('teacherPages.quizzesExams.backToQuizzesExams')}
      </Link>
      <PageHeader title={exam.title} description={t('teacherPages.quizzesExams.manageQuestions')} />
      <ExamQuestionsList examId={exam.id} />
    </div>
  );
}


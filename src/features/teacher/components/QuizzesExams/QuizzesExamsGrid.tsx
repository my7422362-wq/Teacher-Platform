import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { useQueries } from '@tanstack/react-query';
import {
  Card,
  CardContent,
  Badge,
  Button,
  Modal,
  EmptyState,
  ErrorState,
  Spinner,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@/components/ui';
import { Pencil, Trash2, Plus, ListChecks, BarChart3 } from 'lucide-react';
import { teacherQuizService, teacherExamService } from '@/services';
import { useTeacherCourses } from '@/features/teacher/components/Courses/queries';
import { useDeleteQuiz, useDeleteExam } from './queries';
import { QuizFormModal } from './QuizFormModal';
import { ExamFormModal } from './ExamFormModal';
import type { TeacherQuiz, TeacherExam } from './types';

interface QuizCardData {
  quiz: TeacherQuiz;
  courseTitle: string;
}

interface ExamCardData {
  exam: TeacherExam;
  courseTitle: string;
}

export function QuizzesExamsGrid() {
  const { t } = useTranslation();
  const { data: courses = [], isLoading: coursesLoading, isError: coursesError, refetch: refetchCourses } = useTeacherCourses();

  // N+1 across courses — there is no global "list all quizzes/exams" endpoint, only
  // GET /courses/{course}/quizzes and GET /courses/{course}/exams (course by slug).
  // Mirrors the aggregation style used by payment.service.ts's listAllInstallments().
  const quizQueries = useQueries({
    queries: courses.map((course) => ({
      queryKey: ['teacher', 'quizzes-by-course', course.slug] as const,
      queryFn: () => teacherQuizService.listByCourse(course.slug),
    })),
  });
  const examQueries = useQueries({
    queries: courses.map((course) => ({
      queryKey: ['teacher', 'exams-by-course', course.slug] as const,
      queryFn: () => teacherExamService.listByCourse(course.slug),
    })),
  });

  const quizzesLoading = coursesLoading || quizQueries.some((q) => q.isLoading);
  const quizzesError = coursesError || quizQueries.some((q) => q.isError);
  const examsLoading = coursesLoading || examQueries.some((q) => q.isLoading);
  const examsError = coursesError || examQueries.some((q) => q.isError);

  const quizzes: QuizCardData[] = courses.flatMap((course, index) =>
    (quizQueries[index]?.data ?? []).map((quiz) => ({ quiz, courseTitle: course.title }))
  );
  const exams: ExamCardData[] = courses.flatMap((course, index) =>
    (examQueries[index]?.data ?? []).map((exam) => ({ exam, courseTitle: course.title }))
  );

  const deleteQuiz = useDeleteQuiz();
  const deleteExam = useDeleteExam();

  const [editingQuiz, setEditingQuiz] = useState<TeacherQuiz | null>(null);
  const [quizFormOpen, setQuizFormOpen] = useState(false);
  const [deletingQuiz, setDeletingQuiz] = useState<TeacherQuiz | null>(null);

  const [editingExam, setEditingExam] = useState<TeacherExam | null>(null);
  const [examFormOpen, setExamFormOpen] = useState(false);
  const [deletingExam, setDeletingExam] = useState<TeacherExam | null>(null);

  async function handleConfirmDeleteQuiz() {
    if (!deletingQuiz) return;
    try {
      await deleteQuiz.mutateAsync(deletingQuiz.id);
      toast.success(t('teacherPages.quizzesExams.toast.quizDeleted'));
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t('teacherPages.quizzesExams.toast.quizDeleteFailed'));
    } finally {
      setDeletingQuiz(null);
    }
  }

  async function handleConfirmDeleteExam() {
    if (!deletingExam) return;
    try {
      await deleteExam.mutateAsync(deletingExam.id);
      toast.success(t('teacherPages.quizzesExams.toast.examDeleted'));
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t('teacherPages.quizzesExams.toast.examDeleteFailed'));
    } finally {
      setDeletingExam(null);
    }
  }

  function retryQuizzes() {
    refetchCourses();
    quizQueries.forEach((q) => q.refetch());
  }

  function retryExams() {
    refetchCourses();
    examQueries.forEach((q) => q.refetch());
  }

  return (
    <section className="space-y-4">
      <Tabs defaultValue="quizzes">
        <TabsList>
          <TabsTrigger value="quizzes">{t('teacherPages.quizzesExams.tabQuizzes')}</TabsTrigger>
          <TabsTrigger value="exams">{t('teacherPages.quizzesExams.tabExams')}</TabsTrigger>
        </TabsList>

        <TabsContent value="quizzes">
          <div className="flex justify-end pb-4">
            <Button
              onClick={() => {
                setEditingQuiz(null);
                setQuizFormOpen(true);
              }}
              className="bg-[#D4B59E] text-[#0F2520] hover:bg-[#C7A187]"
            >
              <Plus className="h-4 w-4" />
              {t('teacherPages.quizzesExams.addQuiz')}
            </Button>
          </div>

          {quizzesLoading ? (
            <div className="flex justify-center py-16">
              <Spinner />
            </div>
          ) : quizzesError ? (
            <ErrorState description={t('teacherPages.quizzesExams.toast.loadFailed')} onRetry={retryQuizzes} />
          ) : quizzes.length === 0 ? (
            <EmptyState description={t('teacherPages.quizzesExams.emptyQuizzes')} />
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {quizzes.map(({ quiz, courseTitle }) => (
                <Card key={quiz.id}>
                  <CardContent className="space-y-3 p-5">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-semibold text-[#F9F6F0]">{quiz.title}</h3>
                      <Badge variant={quiz.isPublished ? 'success' : 'outline'} className="shrink-0">
                        {quiz.isPublished
                          ? t('teacherPages.courses.statusPublished')
                          : t('teacherPages.courses.statusDraft')}
                      </Badge>
                    </div>
                    <p className="text-sm text-[rgba(249,246,240,0.65)]">{courseTitle}</p>
                    {quiz.sectionTitle && (
                      <p className="text-xs text-[rgba(249,246,240,0.5)]">{quiz.sectionTitle}</p>
                    )}
                    <p className="text-xs text-[rgba(249,246,240,0.55)]">
                      {t('teacherPages.quizzesExams.questionsCount', { count: quiz.questionsCount ?? quiz.questions.length })}
                    </p>

                    <div className="flex flex-wrap gap-2 pt-1">
                      <Button variant="outline" size="sm" onClick={() => { setEditingQuiz(quiz); setQuizFormOpen(true); }}>
                        <Pencil className="h-3.5 w-3.5" />
                        {t('teacherPages.quizzesExams.editQuiz')}
                      </Button>
                      <Link to={`/teacher/quizzes/${quiz.id}/questions`}>
                        <Button variant="outline" size="sm">
                          <ListChecks className="h-3.5 w-3.5" />
                          {t('teacherPages.quizzesExams.manageQuestions')}
                        </Button>
                      </Link>
                      <Link to={`/teacher/quizzes/${quiz.id}/results`}>
                        <Button variant="outline" size="sm">
                          <BarChart3 className="h-3.5 w-3.5" />
                          {t('teacherPages.quizzesExams.viewResults')}
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-destructive hover:bg-destructive/10"
                        onClick={() => setDeletingQuiz(quiz)}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="exams">
          <div className="flex justify-end pb-4">
            <Button
              onClick={() => {
                setEditingExam(null);
                setExamFormOpen(true);
              }}
              className="bg-[#D4B59E] text-[#0F2520] hover:bg-[#C7A187]"
            >
              <Plus className="h-4 w-4" />
              {t('teacherPages.quizzesExams.addExam')}
            </Button>
          </div>

          {examsLoading ? (
            <div className="flex justify-center py-16">
              <Spinner />
            </div>
          ) : examsError ? (
            <ErrorState description={t('teacherPages.quizzesExams.toast.loadFailed')} onRetry={retryExams} />
          ) : exams.length === 0 ? (
            <EmptyState description={t('teacherPages.quizzesExams.emptyExams')} />
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {exams.map(({ exam, courseTitle }) => (
                <Card key={exam.id}>
                  <CardContent className="space-y-3 p-5">
                    <h3 className="font-semibold text-[#F9F6F0]">{exam.title}</h3>
                    <p className="text-sm text-[rgba(249,246,240,0.65)]">{courseTitle}</p>
                    <p className="text-xs text-[rgba(249,246,240,0.55)]">
                      {t('teacherPages.quizzesExams.questionsCount', { count: exam.questionsCount ?? exam.questions.length })}
                    </p>
                    <Badge variant="outline" className="shrink-0">
                      {new Date(exam.startDate).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })}
                    </Badge>

                    <div className="flex flex-wrap gap-2 pt-1">
                      <Button variant="outline" size="sm" onClick={() => { setEditingExam(exam); setExamFormOpen(true); }}>
                        <Pencil className="h-3.5 w-3.5" />
                        {t('teacherPages.quizzesExams.editExam')}
                      </Button>
                      <Link to={`/teacher/exams/${exam.id}/questions`}>
                        <Button variant="outline" size="sm">
                          <ListChecks className="h-3.5 w-3.5" />
                          {t('teacherPages.quizzesExams.manageQuestions')}
                        </Button>
                      </Link>
                      <Link to={`/teacher/exams/${exam.id}/results`}>
                        <Button variant="outline" size="sm">
                          <BarChart3 className="h-3.5 w-3.5" />
                          {t('teacherPages.quizzesExams.viewResults')}
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-destructive hover:bg-destructive/10"
                        onClick={() => setDeletingExam(exam)}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      <QuizFormModal isOpen={quizFormOpen} onClose={() => setQuizFormOpen(false)} quiz={editingQuiz} />
      <ExamFormModal isOpen={examFormOpen} onClose={() => setExamFormOpen(false)} exam={editingExam} />

      <Modal
        isOpen={deletingQuiz !== null}
        onClose={() => setDeletingQuiz(null)}
        title={t('teacherPages.quizzesExams.deleteConfirmTitle')}
        size="sm"
      >
        <p className="text-sm text-[rgba(249,246,240,0.75)]">
          {t('teacherPages.quizzesExams.deleteConfirmMessage', { title: deletingQuiz?.title })}
        </p>
        <div className="mt-6 flex justify-end gap-3">
          <Button variant="outline" onClick={() => setDeletingQuiz(null)}>
            {t('teacherPages.courses.cancel')}
          </Button>
          <Button
            onClick={handleConfirmDeleteQuiz}
            loading={deleteQuiz.isPending}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {t('teacherPages.courses.confirm')}
          </Button>
        </div>
      </Modal>

      <Modal
        isOpen={deletingExam !== null}
        onClose={() => setDeletingExam(null)}
        title={t('teacherPages.quizzesExams.deleteConfirmTitle')}
        size="sm"
      >
        <p className="text-sm text-[rgba(249,246,240,0.75)]">
          {t('teacherPages.quizzesExams.deleteConfirmMessage', { title: deletingExam?.title })}
        </p>
        <div className="mt-6 flex justify-end gap-3">
          <Button variant="outline" onClick={() => setDeletingExam(null)}>
            {t('teacherPages.courses.cancel')}
          </Button>
          <Button
            onClick={handleConfirmDeleteExam}
            loading={deleteExam.isPending}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {t('teacherPages.courses.confirm')}
          </Button>
        </div>
      </Modal>
    </section>
  );
}

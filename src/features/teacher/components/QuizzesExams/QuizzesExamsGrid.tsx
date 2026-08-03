import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import {
  Card,
  CardContent,
  Badge,
  Button,
  Modal,
  EmptyState,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@/components/ui';
import { Pencil, Trash2, Plus, ListChecks, BarChart3 } from 'lucide-react';
import { getQuizzes, deleteQuiz } from './quiz-store';
import { getExams, deleteExam } from './exam-store';
import { getCourses } from '@/features/teacher/components/Courses/course-store';
import { QuizFormModal } from './QuizFormModal';
import { ExamFormModal } from './ExamFormModal';
import type { Quiz, Exam } from '@/types';

export function QuizzesExamsGrid() {
  const { t } = useTranslation();
  const courses = getCourses();

  const [quizzes, setQuizzes] = useState<Quiz[]>(getQuizzes);
  const [exams, setExams] = useState<Exam[]>(getExams);

  const [editingQuiz, setEditingQuiz] = useState<Quiz | null>(null);
  const [quizFormOpen, setQuizFormOpen] = useState(false);
  const [deletingQuiz, setDeletingQuiz] = useState<Quiz | null>(null);

  const [editingExam, setEditingExam] = useState<Exam | null>(null);
  const [examFormOpen, setExamFormOpen] = useState(false);
  const [deletingExam, setDeletingExam] = useState<Exam | null>(null);

  function courseName(courseId: number) {
    return courses.find((c) => c.id === courseId)?.title ?? '';
  }

  function handleConfirmDeleteQuiz() {
    if (!deletingQuiz) return;
    deleteQuiz(deletingQuiz.id);
    toast.success(t('teacherPages.quizzesExams.toast.quizDeleted'));
    setDeletingQuiz(null);
    setQuizzes(getQuizzes());
  }

  function handleConfirmDeleteExam() {
    if (!deletingExam) return;
    deleteExam(deletingExam.id);
    toast.success(t('teacherPages.quizzesExams.toast.examDeleted'));
    setDeletingExam(null);
    setExams(getExams());
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

          {quizzes.length === 0 ? (
            <EmptyState description={t('teacherPages.quizzesExams.emptyQuizzes')} />
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {quizzes.map((quiz) => (
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
                    <p className="text-sm text-[rgba(249,246,240,0.65)]">{courseName(quiz.courseId)}</p>
                    <p className="text-xs text-[rgba(249,246,240,0.55)]">
                      {t('teacherPages.quizzesExams.questionsCount', { count: quiz.questionsCount })}
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

          {exams.length === 0 ? (
            <EmptyState description={t('teacherPages.quizzesExams.emptyExams')} />
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {exams.map((exam) => (
                <Card key={exam.id}>
                  <CardContent className="space-y-3 p-5">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-semibold text-[#F9F6F0]">{exam.title}</h3>
                      <Badge variant={exam.isPublished ? 'success' : 'outline'} className="shrink-0">
                        {exam.isPublished
                          ? t('teacherPages.courses.statusPublished')
                          : t('teacherPages.courses.statusDraft')}
                      </Badge>
                    </div>
                    <p className="text-sm text-[rgba(249,246,240,0.65)]">{courseName(exam.courseId)}</p>
                    <p className="text-xs text-[rgba(249,246,240,0.55)]">
                      {t('teacherPages.quizzesExams.questionsCount', { count: exam.questionsCount })}
                    </p>

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

      <QuizFormModal
        isOpen={quizFormOpen}
        onClose={() => setQuizFormOpen(false)}
        quiz={editingQuiz}
        onSaved={() => setQuizzes(getQuizzes())}
      />
      <ExamFormModal
        isOpen={examFormOpen}
        onClose={() => setExamFormOpen(false)}
        exam={editingExam}
        onSaved={() => setExams(getExams())}
      />

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
          <Button onClick={handleConfirmDeleteQuiz} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
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
          <Button onClick={handleConfirmDeleteExam} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
            {t('teacherPages.courses.confirm')}
          </Button>
        </div>
      </Modal>
    </section>
  );
}

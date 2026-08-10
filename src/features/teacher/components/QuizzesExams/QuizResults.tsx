import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import {
  Card,
  CardContent,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  Badge,
  Button,
  Modal,
  Input,
  Textarea,
  EmptyState,
  ErrorState,
  Spinner,
} from '@/components/ui';
import { BarChart3, Pencil } from 'lucide-react';
import { useQuizSubmissions, useGradeQuizSubmission } from './queries';
import { useTeacherStudentsList } from '@/features/teacher/components/Students/queries';
import type { QuizSubmission } from './types';

const STATUS_VARIANT: Record<string, 'success' | 'destructive' | 'outline'> = {
  passed: 'success',
  failed: 'destructive',
};

interface GradeFormValues {
  score: number;
  feedback: string;
}

export function QuizResults({ quizId }: { quizId: number }) {
  const { t, i18n } = useTranslation();
  const { data: submissions = [], isLoading, isError, refetch } = useQuizSubmissions(quizId);
  const { data: students = [] } = useTeacherStudentsList();
  const gradeSubmission = useGradeQuizSubmission(quizId);

  function studentName(userId: number) {
    return students.find((s) => s.id === userId)?.name ?? `#${userId}`;
  }

  const [grading, setGrading] = useState<QuizSubmission | null>(null);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<GradeFormValues>({
    defaultValues: { score: 0, feedback: '' },
  });

  function openGrade(submission: QuizSubmission) {
    setGrading(submission);
    reset({ score: submission.score, feedback: submission.feedback ?? '' });
  }

  const onSubmitGrade = async (values: GradeFormValues) => {
    if (!grading) return;
    try {
      await gradeSubmission.mutateAsync({ submissionId: grading.id, score: values.score, feedback: values.feedback || undefined });
      toast.success(t('teacherPages.quizzesExams.toast.gradeSaved'));
      setGrading(null);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t('teacherPages.quizzesExams.toast.gradeFailed'));
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-16">
        <Spinner />
      </div>
    );
  }

  if (isError) {
    return <ErrorState description={t('teacherPages.quizzesExams.toast.loadFailed')} onRetry={() => refetch()} />;
  }

  return (
    <section className="space-y-4">
      {submissions.length === 0 ? (
        <EmptyState icon={<BarChart3 className="h-12 w-12" />} description={t('teacherPages.quizzesExams.results.empty')} />
      ) : (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('teacherPages.quizzesExams.results.student')}</TableHead>
                  <TableHead>{t('teacherPages.quizzesExams.results.score')}</TableHead>
                  <TableHead>{t('teacherPages.quizzesExams.results.status')}</TableHead>
                  <TableHead>{t('teacherPages.quizzesExams.results.date')}</TableHead>
                  <TableHead />
                </TableRow>
              </TableHeader>
              <TableBody>
                {submissions.map((submission) => (
                  <TableRow key={submission.id}>
                    <TableCell>{studentName(submission.userId)}</TableCell>
                    <TableCell>{submission.score} / {submission.totalScore}</TableCell>
                    <TableCell>
                      <Badge variant={STATUS_VARIANT[submission.status] ?? 'outline'}>
                        {submission.status === 'passed'
                          ? t('teacherPages.quizzesExams.results.passed')
                          : submission.status === 'failed'
                            ? t('teacherPages.quizzesExams.results.failed')
                            : submission.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {submission.createdAt ? new Date(submission.createdAt).toLocaleString(i18n.language) : '—'}
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm" onClick={() => openGrade(submission)}>
                        <Pencil className="h-3.5 w-3.5" />
                        {t('teacherPages.quizzesExams.results.grade')}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      <Modal isOpen={grading !== null} onClose={() => setGrading(null)} title={t('teacherPages.quizzesExams.results.gradeTitle')} size="sm">
        <form onSubmit={handleSubmit(onSubmitGrade)} className="space-y-4" noValidate>
          <div className="space-y-2">
            <label className="text-sm font-medium text-[#F9F6F0]">
              {t('teacherPages.quizzesExams.results.scoreOutOf', { total: grading?.totalScore ?? 0 })}
            </label>
            <Input
              type="number"
              min={0}
              max={grading?.totalScore}
              error={errors.score?.message}
              {...register('score', { valueAsNumber: true, required: true, min: 0, max: grading?.totalScore ?? 100 })}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-[#F9F6F0]">{t('teacherPages.quizzesExams.results.feedback')}</label>
            <Textarea rows={3} {...register('feedback')} />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" onClick={() => setGrading(null)}>
              {t('teacherPages.courses.cancel')}
            </Button>
            <Button type="submit" loading={gradeSubmission.isPending} className="bg-[#D4B59E] text-[#0F2520] hover:bg-[#C7A187]">
              {t('teacherPages.courses.save')}
            </Button>
          </div>
        </form>
      </Modal>
    </section>
  );
}

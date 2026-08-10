import { useTranslation } from 'react-i18next';
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
  EmptyState,
  ErrorState,
  Spinner,
} from '@/components/ui';
import { BarChart3 } from 'lucide-react';
import { useExamAttempts } from './queries';
import { useTeacherStudentsList } from '@/features/teacher/components/Students/queries';

const STATUS_VARIANT: Record<string, 'success' | 'destructive' | 'outline'> = {
  passed: 'success',
  failed: 'destructive',
};

export function ExamResults({ examId }: { examId: number }) {
  const { t, i18n } = useTranslation();
  const { data: attempts = [], isLoading, isError, refetch } = useExamAttempts(examId);
  const { data: students = [] } = useTeacherStudentsList();

  function studentName(userId: number) {
    return students.find((s) => s.id === userId)?.name ?? `#${userId}`;
  }

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
      {attempts.length === 0 ? (
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
                </TableRow>
              </TableHeader>
              <TableBody>
                {attempts.map((attempt) => (
                  <TableRow key={attempt.id}>
                    <TableCell>{studentName(attempt.userId)}</TableCell>
                    <TableCell>{attempt.score}</TableCell>
                    <TableCell>
                      <Badge variant={STATUS_VARIANT[attempt.status] ?? 'outline'}>
                        {attempt.status === 'passed'
                          ? t('teacherPages.quizzesExams.results.passed')
                          : attempt.status === 'failed'
                            ? t('teacherPages.quizzesExams.results.failed')
                            : attempt.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {attempt.submittedAt ? new Date(attempt.submittedAt).toLocaleString(i18n.language) : '—'}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </section>
  );
}

import { useTranslation } from 'react-i18next';
import { Card, CardContent, Table, TableHeader, TableBody, TableRow, TableHead, TableCell, Badge, EmptyState } from '@/components/ui';
import { BarChart3 } from 'lucide-react';
import { mockUsers, mockExamAttempts } from '@/mock';
import { getLocalExamAttempts } from '@/features/student/components/Dashboard/submissions-store';
import { getExam } from './exam-store';

export function ExamResults({ examId }: { examId: number }) {
  const { t, i18n } = useTranslation();
  const exam = getExam(examId);

  const attempts = [...mockExamAttempts, ...getLocalExamAttempts()]
    .filter((a) => a.examId === examId)
    .sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());

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
                {attempts.map((attempt) => {
                  const passed = exam ? attempt.score >= exam.passingScore : true;
                  return (
                    <TableRow key={attempt.id}>
                      <TableCell>{mockUsers.find((u) => u.id === attempt.userId)?.name ?? '—'}</TableCell>
                      <TableCell>
                        {attempt.score} / {attempt.totalScore}
                      </TableCell>
                      <TableCell>
                        <Badge variant={passed ? 'success' : 'destructive'}>
                          {passed ? t('teacherPages.quizzesExams.results.passed') : t('teacherPages.quizzesExams.results.failed')}
                        </Badge>
                      </TableCell>
                      <TableCell>{new Date(attempt.submittedAt).toLocaleString(i18n.language)}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </section>
  );
}

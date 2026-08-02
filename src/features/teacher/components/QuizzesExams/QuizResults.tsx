import { useTranslation } from 'react-i18next';
import { Card, CardContent, Table, TableHeader, TableBody, TableRow, TableHead, TableCell, Badge, EmptyState } from '@/components/ui';
import { BarChart3 } from 'lucide-react';
import { mockUsers, mockQuizSubmissions } from '@/mock';
import { getLocalQuizSubmissions } from '@/features/student/components/Dashboard/submissions-store';
import { getQuiz } from './quiz-store';

export function QuizResults({ quizId }: { quizId: number }) {
  const { t, i18n } = useTranslation();
  const quiz = getQuiz(quizId);

  const submissions = [...mockQuizSubmissions, ...getLocalQuizSubmissions()]
    .filter((s) => s.quizId === quizId)
    .sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());

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
                  <TableHead>{t('teacherPages.quizzesExams.results.attempt')}</TableHead>
                  <TableHead>{t('teacherPages.quizzesExams.results.score')}</TableHead>
                  <TableHead>{t('teacherPages.quizzesExams.results.status')}</TableHead>
                  <TableHead>{t('teacherPages.quizzesExams.results.date')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {submissions.map((submission) => {
                  const scorePercent = submission.totalScore
                    ? (submission.score / submission.totalScore) * 100
                    : 0;
                  const passed = quiz ? scorePercent >= quiz.passingScore : true;
                  return (
                    <TableRow key={submission.id}>
                      <TableCell>{mockUsers.find((u) => u.id === submission.userId)?.name ?? '—'}</TableCell>
                      <TableCell>{submission.attemptNumber}</TableCell>
                      <TableCell>
                        {submission.score} / {submission.totalScore}
                      </TableCell>
                      <TableCell>
                        <Badge variant={passed ? 'success' : 'destructive'}>
                          {passed ? t('teacherPages.quizzesExams.results.passed') : t('teacherPages.quizzesExams.results.failed')}
                        </Badge>
                      </TableCell>
                      <TableCell>{new Date(submission.submittedAt).toLocaleString(i18n.language)}</TableCell>
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

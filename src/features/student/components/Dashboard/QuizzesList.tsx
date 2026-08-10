import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Card, CardContent, Badge, EmptyState, Spinner, ErrorState } from '@/components/ui';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { HelpCircle } from 'lucide-react';
import { useMyQuizzes } from './quiz-exam-queries';

export function QuizzesList() {
  const { t } = useTranslation();
  const { data: quizzes, isLoading, isError, refetch } = useMyQuizzes();

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <Spinner />
      </div>
    );
  }

  if (isError) {
    return <ErrorState description={t('studentPages.dashboard.quizzes.toast.loadFailed')} onRetry={() => refetch()} />;
  }

  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold text-[#F9F6F0]">
        {t('studentPages.dashboard.quizzes.title')}
      </h2>

      {quizzes.length === 0 ? (
        <EmptyState
          icon={<HelpCircle className="h-12 w-12" />}
          description={t('studentPages.dashboard.quizzes.empty')}
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {quizzes.map((quiz) => (
            <Card key={quiz.quizId}>
              <CardContent className="space-y-3 p-5">
                <div>
                  <h3 className="font-semibold text-[#F9F6F0]">{quiz.title}</h3>
                  <p className="text-sm text-[rgba(249,246,240,0.65)]">{quiz.courseName}</p>
                </div>

                <div className="flex flex-wrap gap-2 text-xs text-[rgba(249,246,240,0.55)]">
                  <span>{t('studentPages.dashboard.quizzes.questionsCount', { count: quiz.questionsCount })}</span>
                  <span>·</span>
                  <span>{t('studentPages.dashboard.quizzes.timeLimit', { minutes: quiz.timeLimit })}</span>
                </div>

                <p className="text-xs text-[rgba(249,246,240,0.55)]">
                  {t('studentPages.dashboard.quizzes.attempts', { used: quiz.attemptsUsed, max: quiz.maxAttempts })}
                </p>

                {quiz.bestScore !== undefined && (
                  <Badge variant={quiz.bestStatus === 'passed' ? 'success' : 'destructive'}>
                    {t('studentPages.dashboard.quizzes.bestScore', { score: quiz.bestScore })}
                  </Badge>
                )}

                {quiz.canAttempt ? (
                  <Link
                    to={`/student/quizzes/${quiz.quizId}`}
                    className={cn(buttonVariants({ variant: 'secondary', size: 'sm' }), 'w-full')}
                  >
                    {quiz.attemptsUsed > 0
                      ? t('studentPages.dashboard.quizzes.retake')
                      : t('studentPages.dashboard.quizzes.start')}
                  </Link>
                ) : (
                  <span
                    className={cn(
                      buttonVariants({ variant: 'outline', size: 'sm' }),
                      'w-full cursor-not-allowed opacity-50'
                    )}
                  >
                    {t('studentPages.dashboard.quizzes.noAttemptsLeft')}
                  </span>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
}

import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { PageHeader } from '@/components/shared/page-header';
import { Card, CardContent, Button, Badge, Input, Spinner, ErrorState } from '@/components/ui';
import { useTeacherQuiz, useQuizProgress } from '@/features/teacher/components/QuizzesExams';
import { useSubmitQuiz } from '@/features/student/components/Dashboard/quiz-exam-queries';
import { cn } from '@/lib/utils';

function formatTime(totalSeconds: number): string {
  const clamped = Math.max(0, totalSeconds);
  const m = Math.floor(clamped / 60).toString().padStart(2, '0');
  const s = Math.floor(clamped % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

export function QuizTakePage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const quizId = Number(id);
  const { data: quiz, isLoading, isError, refetch } = useTeacherQuiz(quizId);
  const { data: progress, isLoading: progressLoading, refetch: refetchProgress } = useQuizProgress(quizId);
  const submitQuiz = useSubmitQuiz(quizId);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [result, setResult] = useState<{ score: number; status: string } | null>(null);
  // -1 = "timer not started yet" (distinct from 0 = "time's up"), so the
  // countdown effect below can't mistake a not-yet-initialized timer for
  // an expired one and auto-submit an empty attempt the instant the quiz loads.
  const [timeLeft, setTimeLeft] = useState(-1);

  useEffect(() => {
    if (quiz) setTimeLeft(quiz.timeLimit * 60);
  }, [quiz]);

  async function handleSubmit() {
    if (!quiz) return;
    const positionalAnswers = quiz.questions.map((q) => answers[q.id] ?? '');
    try {
      const { submission } = await submitQuiz.mutateAsync(positionalAnswers);
      const percent = submission.totalScore > 0 ? Math.round((submission.score / submission.totalScore) * 100) : 0;
      setResult({ score: percent, status: submission.status });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t('quizTakePage.submitFailed'));
    }
  }

  useEffect(() => {
    if (timeLeft < 0 || result || submitQuiz.isPending) return;
    if (timeLeft === 0) {
      handleSubmit();
      return;
    }
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft, result, submitQuiz.isPending]);

  if (isLoading || progressLoading) {
    return (
      <div className="flex justify-center py-16">
        <Spinner />
      </div>
    );
  }

  if (isError || !quiz) {
    return <ErrorState description={t('quizTakePage.notFound')} onRetry={() => refetch()} />;
  }

  if (!result && progress && !progress.canAttempt) {
    return (
      <div className="space-y-6">
        <PageHeader title={quiz.title} description={t('quizTakePage.noAttemptsLeft')} />
        {progress.bestResult && (
          <Badge variant={progress.bestResult.passed ? 'success' : 'destructive'}>
            {t('quizTakePage.resultScorePercent', { score: progress.bestResult.score })}
          </Badge>
        )}
        <div>
          <Button onClick={() => navigate('/student/dashboard')}>{t('quizTakePage.backToDashboard')}</Button>
        </div>
      </div>
    );
  }

  if (result) {
    const passed = result.status === 'passed';
    return (
      <div className="space-y-6">
        <PageHeader title={quiz.title} />
        <Card>
          <CardContent className="space-y-4 p-8 text-center">
            <p className="text-sm text-[rgba(249,246,240,0.65)]">{t('quizTakePage.resultTitle')}</p>
            <p className="text-4xl font-bold text-[#F9F6F0]">
              {t('quizTakePage.resultScorePercent', { score: result.score })}
            </p>
            <Badge variant={passed ? 'success' : 'destructive'} className="mx-auto w-fit">
              {passed ? t('quizTakePage.passed') : t('quizTakePage.failed')}
            </Badge>
            <div className="flex flex-wrap justify-center gap-3 pt-4">
              <Button variant="outline" onClick={() => navigate('/student/dashboard')}>
                {t('quizTakePage.backToDashboard')}
              </Button>
              {progress && progress.remainingAttempts - 1 > 0 && (
                <Button
                  onClick={async () => {
                    await refetchProgress();
                    setResult(null);
                    setAnswers({});
                    setCurrentIndex(0);
                    setTimeLeft(quiz.timeLimit * 60);
                  }}
                >
                  {t('quizTakePage.retake')}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (quiz.questions.length === 0) {
    return (
      <div className="space-y-6">
        <PageHeader title={quiz.title} description={t('quizTakePage.noQuestions')} />
        <Button onClick={() => navigate('/student/dashboard')}>{t('quizTakePage.backToDashboard')}</Button>
      </div>
    );
  }

  if (timeLeft < 0) {
    return (
      <div className="flex justify-center py-16">
        <Spinner />
      </div>
    );
  }

  const question = quiz.questions[currentIndex];
  const isLast = currentIndex === quiz.questions.length - 1;
  const isOptionType = question.type === 'multiple_choice' || question.type === 'true_false';

  return (
    <div className="space-y-6">
      <PageHeader
        title={quiz.title}
        description={t('quizTakePage.questionOf', { current: currentIndex + 1, total: quiz.questions.length })}
        action={
          <Badge variant={timeLeft <= 30 ? 'destructive' : 'outline'}>
            {t('quizTakePage.timeRemaining', { time: formatTime(timeLeft) })}
          </Badge>
        }
      />

      <Card>
        <CardContent className="space-y-4 p-6">
          <p className="text-lg font-medium text-[#F9F6F0]">{question.text}</p>

          {isOptionType ? (
            <div className="space-y-2">
              {question.options.map((option) => {
                const selected = answers[question.id] === option;
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setAnswers((prev) => ({ ...prev, [question.id]: option }))}
                    className={cn(
                      'w-full rounded-lg border px-4 py-3 text-start text-sm transition-colors',
                      selected
                        ? 'border-[#D4B59E] bg-[#D4B59E]/15 text-[#F9F6F0]'
                        : 'border-[rgba(212,181,158,0.18)] text-[rgba(249,246,240,0.75)] hover:border-[#D4B59E]/40'
                    )}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          ) : (
            <Input
              value={answers[question.id] ?? ''}
              onChange={(e) => setAnswers((prev) => ({ ...prev, [question.id]: e.target.value }))}
            />
          )}
        </CardContent>
      </Card>

      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          disabled={currentIndex === 0}
          onClick={() => setCurrentIndex((i) => Math.max(0, i - 1))}
        >
          {t('quizTakePage.previous')}
        </Button>
        {isLast ? (
          <Button onClick={handleSubmit} loading={submitQuiz.isPending}>
            {t('quizTakePage.submit')}
          </Button>
        ) : (
          <Button onClick={() => setCurrentIndex((i) => Math.min(quiz.questions.length - 1, i + 1))}>
            {t('quizTakePage.next')}
          </Button>
        )}
      </div>
    </div>
  );
}

import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { PageHeader } from '@/components/shared/page-header';
import { Card, CardContent, Button, Badge, Spinner, ErrorState } from '@/components/ui';
import { useTeacherExam, useExamProgress } from '@/features/teacher/components/QuizzesExams';
import { useAttemptExam } from '@/features/student/components/Dashboard/quiz-exam-queries';
import { cn } from '@/lib/utils';

function formatTime(totalSeconds: number): string {
  const clamped = Math.max(0, totalSeconds);
  const m = Math.floor(clamped / 60).toString().padStart(2, '0');
  const s = Math.floor(clamped % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

export function ExamTakePage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const examId = Number(id);
  const { data: exam, isLoading, isError, refetch } = useTeacherExam(examId);
  const { data: progress, isLoading: progressLoading } = useExamProgress(examId);
  const attemptExam = useAttemptExam(examId);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<{ score: number; status: string } | null>(null);
  // -1 = "timer not started yet" (distinct from 0 = "time's up"), so the
  // countdown effect below can't mistake a not-yet-initialized timer for
  // an expired one and auto-submit an empty attempt the instant the exam loads.
  const [timeLeft, setTimeLeft] = useState(-1);

  useEffect(() => {
    if (exam) setTimeLeft(exam.durationMinutes * 60);
  }, [exam]);

  const now = Date.now();
  const timeStatus =
    exam && now < new Date(exam.startDate).getTime()
      ? 'upcoming'
      : exam && now > new Date(exam.endDate).getTime()
        ? 'closed'
        : 'open';
  const blocked = !!progress?.alreadyAttempted || timeStatus !== 'open';

  async function handleSubmit() {
    if (!exam) return;
    const positionalAnswers = exam.questions.map((q) => answers[q.id] ?? '');
    try {
      const { attempt } = await attemptExam.mutateAsync(positionalAnswers);
      setResult({ score: attempt.score, status: attempt.status });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t('examTakePage.submitFailed'));
    }
  }

  useEffect(() => {
    if (timeLeft < 0 || result || blocked || attemptExam.isPending) return;
    if (timeLeft === 0) {
      handleSubmit();
      return;
    }
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft, result, blocked, attemptExam.isPending]);

  if (isLoading || progressLoading) {
    return (
      <div className="flex justify-center py-16">
        <Spinner />
      </div>
    );
  }

  if (isError || !exam) {
    return <ErrorState description={t('examTakePage.notFound')} onRetry={() => refetch()} />;
  }

  if (blocked && !result) {
    const message = progress?.alreadyAttempted
      ? t('examTakePage.alreadySubmitted')
      : timeStatus === 'upcoming'
        ? t('examTakePage.notOpenYet')
        : t('examTakePage.closed');

    return (
      <div className="space-y-6">
        <PageHeader title={exam.title} description={message} />
        {progress?.bestResult && (
          <Badge variant={progress.bestResult.passed ? 'success' : 'destructive'}>
            {t('examTakePage.resultScorePercent', { score: progress.bestResult.score })}
          </Badge>
        )}
        <div>
          <Button onClick={() => navigate('/student/dashboard')}>{t('examTakePage.backToDashboard')}</Button>
        </div>
      </div>
    );
  }

  if (result) {
    const passed = result.status === 'passed';
    return (
      <div className="space-y-6">
        <PageHeader title={exam.title} />
        <Card>
          <CardContent className="space-y-4 p-8 text-center">
            <p className="text-sm text-[rgba(249,246,240,0.65)]">{t('examTakePage.resultTitle')}</p>
            <p className="text-4xl font-bold text-[#F9F6F0]">
              {t('examTakePage.resultScorePercent', { score: result.score })}
            </p>
            <Badge variant={passed ? 'success' : 'destructive'} className="mx-auto w-fit">
              {passed ? t('examTakePage.passed') : t('examTakePage.failed')}
            </Badge>
            <div className="pt-4">
              <Button onClick={() => navigate('/student/dashboard')}>{t('examTakePage.backToDashboard')}</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (exam.questions.length === 0) {
    return (
      <div className="space-y-6">
        <PageHeader title={exam.title} description={t('examTakePage.noQuestions')} />
        <Button onClick={() => navigate('/student/dashboard')}>{t('examTakePage.backToDashboard')}</Button>
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

  const question = exam.questions[currentIndex];
  const isLast = currentIndex === exam.questions.length - 1;

  return (
    <div className="space-y-6">
      <PageHeader
        title={exam.title}
        description={t('examTakePage.questionOf', { current: currentIndex + 1, total: exam.questions.length })}
        action={
          <Badge variant={timeLeft <= 60 ? 'destructive' : 'outline'}>
            {t('examTakePage.timeRemaining', { time: formatTime(timeLeft) })}
          </Badge>
        }
      />

      <Card>
        <CardContent className="space-y-4 p-6">
          <p className="text-lg font-medium text-[#F9F6F0]">{question.text}</p>

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
        </CardContent>
      </Card>

      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          disabled={currentIndex === 0}
          onClick={() => setCurrentIndex((i) => Math.max(0, i - 1))}
        >
          {t('examTakePage.previous')}
        </Button>
        {isLast ? (
          <Button onClick={handleSubmit} loading={attemptExam.isPending}>
            {t('examTakePage.submit')}
          </Button>
        ) : (
          <Button onClick={() => setCurrentIndex((i) => Math.min(exam.questions.length - 1, i + 1))}>
            {t('examTakePage.next')}
          </Button>
        )}
      </div>
    </div>
  );
}

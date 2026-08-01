import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { PageHeader } from '@/components/common/page-header';
import { Card, CardContent, Button, Badge } from '@/components/ui';
import { mockExams } from '@/mock';
import { CURRENT_STUDENT_ID, getExamsOverview } from '@/features/student/components/Dashboard/data';
import { saveExamAttempt } from '@/features/student/components/Dashboard/submissions-store';
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
  const exam = mockExams.find((e) => e.id === Number(id));
  const overview = getExamsOverview().find((e) => e.examId === Number(id));

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [result, setResult] = useState<{ score: number; total: number } | null>(null);
  const [timeLeft, setTimeLeft] = useState(() => (exam ? exam.duration * 60 : 0));

  const blocked = overview && (overview.timeStatus !== 'open' || overview.score !== undefined);

  function handleSubmit() {
    if (!exam) return;
    let score = 0;
    exam.questions.forEach((question) => {
      if (answers[question.id] === question.correctAnswer) score += question.points;
    });

    saveExamAttempt({
      id: Date.now(),
      examId: exam.id,
      userId: CURRENT_STUDENT_ID,
      score,
      totalScore: exam.totalScore,
      status: 'graded',
      submittedAt: new Date().toISOString(),
    });

    setResult({ score, total: exam.totalScore });
  }

  useEffect(() => {
    if (!exam || result || blocked) return;
    if (timeLeft <= 0) {
      handleSubmit();
      return;
    }
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft, result, exam, blocked]);

  if (!exam) {
    return (
      <div className="space-y-6">
        <PageHeader title={t('examTakePage.notFound')} />
      </div>
    );
  }

  if (blocked && !result) {
    const message =
      overview!.score !== undefined
        ? t('examTakePage.alreadySubmitted')
        : overview!.timeStatus === 'upcoming'
          ? t('examTakePage.notOpenYet')
          : t('examTakePage.closed');

    return (
      <div className="space-y-6">
        <PageHeader title={exam.title} description={message} />
        {overview!.score !== undefined && (
          <Badge variant="success">
            {t('examTakePage.resultScore', { score: overview!.score, total: overview!.totalScore })}
          </Badge>
        )}
        <div>
          <Button onClick={() => navigate('/student/dashboard')}>{t('examTakePage.backToDashboard')}</Button>
        </div>
      </div>
    );
  }

  if (result) {
    const passed = result.score >= exam.passingScore;
    return (
      <div className="space-y-6">
        <PageHeader title={exam.title} />
        <Card>
          <CardContent className="space-y-4 p-8 text-center">
            <p className="text-sm text-[rgba(249,246,240,0.65)]">{t('examTakePage.resultTitle')}</p>
            <p className="text-4xl font-bold text-[#F9F6F0]">
              {t('examTakePage.resultScore', { score: result.score, total: result.total })}
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
          <Button onClick={handleSubmit}>{t('examTakePage.submit')}</Button>
        ) : (
          <Button onClick={() => setCurrentIndex((i) => Math.min(exam.questions.length - 1, i + 1))}>
            {t('examTakePage.next')}
          </Button>
        )}
      </div>
    </div>
  );
}

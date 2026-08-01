import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { PageHeader } from '@/components/common/page-header';
import { Card, CardContent, Button, Badge, Input } from '@/components/ui';
import { mockQuizzes } from '@/mock';
import { CURRENT_STUDENT_ID, getQuizzesOverview } from '@/features/student/components/Dashboard/data';
import { saveQuizSubmission } from '@/features/student/components/Dashboard/submissions-store';
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
  const quiz = mockQuizzes.find((q) => q.id === Number(id));
  const overview = getQuizzesOverview().find((q) => q.quizId === Number(id));

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [result, setResult] = useState<{ score: number; total: number } | null>(null);
  const [timeLeft, setTimeLeft] = useState(() => (quiz ? quiz.timeLimit * 60 : 0));

  const alreadyMaxed = !!overview && overview.attemptsUsed >= overview.maxAttempts;

  function handleSubmit() {
    if (!quiz) return;
    let score = 0;
    const total = quiz.questions.reduce((sum, q) => sum + q.points, 0);
    quiz.questions.forEach((question) => {
      const given = answers[question.id];
      const correct = Array.isArray(question.correctAnswer)
        ? question.correctAnswer.includes(given)
        : question.correctAnswer === given;
      if (correct) score += question.points;
    });

    saveQuizSubmission({
      id: Date.now(),
      quizId: quiz.id,
      userId: CURRENT_STUDENT_ID,
      attemptNumber: (overview?.attemptsUsed ?? 0) + 1,
      score,
      totalScore: total,
      status: 'graded',
      submittedAt: new Date().toISOString(),
    });

    setResult({ score, total });
  }

  useEffect(() => {
    if (!quiz || result || alreadyMaxed) return;
    if (timeLeft <= 0) {
      handleSubmit();
      return;
    }
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft, result, quiz, alreadyMaxed]);

  if (!quiz) {
    return (
      <div className="space-y-6">
        <PageHeader title={t('quizTakePage.notFound')} />
      </div>
    );
  }

  if (alreadyMaxed && !result) {
    return (
      <div className="space-y-6">
        <PageHeader title={quiz.title} description={t('quizTakePage.noAttemptsLeft')} />
        <Button onClick={() => navigate('/student/dashboard')}>{t('quizTakePage.backToDashboard')}</Button>
      </div>
    );
  }

  if (result) {
    const passed = (result.score / result.total) * 100 >= quiz.passingScore;
    return (
      <div className="space-y-6">
        <PageHeader title={quiz.title} />
        <Card>
          <CardContent className="space-y-4 p-8 text-center">
            <p className="text-sm text-[rgba(249,246,240,0.65)]">{t('quizTakePage.resultTitle')}</p>
            <p className="text-4xl font-bold text-[#F9F6F0]">
              {t('quizTakePage.resultScore', { score: result.score, total: result.total })}
            </p>
            <Badge variant={passed ? 'success' : 'destructive'} className="mx-auto w-fit">
              {passed ? t('quizTakePage.passed') : t('quizTakePage.failed')}
            </Badge>
            <div className="flex flex-wrap justify-center gap-3 pt-4">
              <Button variant="outline" onClick={() => navigate('/student/dashboard')}>
                {t('quizTakePage.backToDashboard')}
              </Button>
              {!!overview && overview.attemptsUsed < quiz.maxAttempts && (
                <Button
                  onClick={() => {
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
          <Button onClick={handleSubmit}>{t('quizTakePage.submit')}</Button>
        ) : (
          <Button onClick={() => setCurrentIndex((i) => Math.min(quiz.questions.length - 1, i + 1))}>
            {t('quizTakePage.next')}
          </Button>
        )}
      </div>
    </div>
  );
}

import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Card, CardContent, Badge, EmptyState } from '@/components/ui';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { GraduationCap } from 'lucide-react';
import { getExamsOverview } from './data';
import type { ExamOverview } from './data';

const STATUS_VARIANT: Record<ExamOverview['timeStatus'], 'outline' | 'success' | 'secondary'> = {
  upcoming: 'outline',
  open: 'success',
  closed: 'secondary',
};

export function ExamsList() {
  const { t, i18n } = useTranslation();
  const exams = getExamsOverview();

  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold text-[#F9F6F0]">
        {t('studentPages.dashboard.exams.title')}
      </h2>

      {exams.length === 0 ? (
        <EmptyState
          icon={<GraduationCap className="h-12 w-12" />}
          description={t('studentPages.dashboard.exams.empty')}
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {exams.map((exam) => (
            <Card key={exam.examId}>
              <CardContent className="space-y-3 p-5">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-semibold text-[#F9F6F0]">{exam.title}</h3>
                    <p className="text-sm text-[rgba(249,246,240,0.65)]">{exam.courseName}</p>
                  </div>
                  <Badge variant={STATUS_VARIANT[exam.timeStatus]} className="shrink-0">
                    {t(`studentPages.dashboard.exams.status${exam.timeStatus[0].toUpperCase()}${exam.timeStatus.slice(1)}`)}
                  </Badge>
                </div>

                <p className="text-xs text-[rgba(249,246,240,0.55)]">
                  {exam.timeStatus === 'upcoming'
                    ? t('studentPages.dashboard.exams.opensOn', {
                        date: new Date(exam.startDate).toLocaleDateString(i18n.language),
                      })
                    : t('studentPages.dashboard.exams.closesOn', {
                        date: new Date(exam.endDate).toLocaleDateString(i18n.language),
                      })}
                </p>

                {exam.score !== undefined ? (
                  <Badge variant="success">
                    {t('studentPages.dashboard.exams.viewResult', {
                      score: exam.score,
                      total: exam.totalScore,
                    })}
                  </Badge>
                ) : exam.timeStatus === 'open' ? (
                  <Link
                    to={`/student/exams/${exam.examId}`}
                    className={cn(buttonVariants({ variant: 'secondary', size: 'sm' }), 'w-full')}
                  >
                    {t('studentPages.dashboard.exams.start')}
                  </Link>
                ) : (
                  <span
                    className={cn(
                      buttonVariants({ variant: 'outline', size: 'sm' }),
                      'w-full cursor-not-allowed opacity-50'
                    )}
                  >
                    {t(`studentPages.dashboard.exams.status${exam.timeStatus[0].toUpperCase()}${exam.timeStatus.slice(1)}`)}
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

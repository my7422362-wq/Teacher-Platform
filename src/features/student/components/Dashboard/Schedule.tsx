import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Card, CardContent, Badge, EmptyState } from '@/components/ui';
import { Clock, GraduationCap } from 'lucide-react';
import { getSchedule } from './data';

function daysUntil(date: string): number {
  const diffMs = new Date(date).getTime() - Date.now();
  return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
}

interface ScheduleProps {
  limit?: number;
  viewAllHref?: string;
}

export function Schedule({ limit, viewAllHref }: ScheduleProps) {
  const { t } = useTranslation();
  const items = getSchedule();
  const visible = limit ? items.slice(0, limit) : items;

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-[#F9F6F0]">
          {t('studentPages.dashboard.schedule.title')}
        </h2>
        {viewAllHref && (
          <Link to={viewAllHref} className="text-sm text-[#D4B59E] hover:underline">
            {t('common.viewAll')}
          </Link>
        )}
      </div>

      {visible.length === 0 ? (
        <EmptyState description={t('studentPages.dashboard.schedule.empty')} />
      ) : (
        <Card>
          <CardContent className="divide-y divide-[rgba(212,181,158,0.12)] p-0">
            {visible.map((item) => {
              const days = daysUntil(item.date);
              const dueLabel =
                days <= 0
                  ? t('studentPages.dashboard.schedule.dueToday')
                  : days === 1
                    ? t('studentPages.dashboard.schedule.dueTomorrow')
                    : t('studentPages.dashboard.schedule.dueIn', { days });
              const Icon = item.kind === 'exam' ? GraduationCap : Clock;

              return (
                <div key={item.id} className="flex items-center gap-4 p-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#D4B59E]/15 text-[#D4B59E]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium text-[#F9F6F0]">{item.title}</p>
                    <div className="flex items-center gap-2">
                      <p className="truncate text-sm text-[rgba(249,246,240,0.55)]">{item.courseName}</p>
                      <Badge variant={item.kind === 'exam' ? 'secondary' : 'outline'} className="shrink-0">
                        {item.kind === 'exam'
                          ? t('studentPages.dashboard.schedule.kindExam')
                          : t('studentPages.dashboard.schedule.kindAssignment')}
                      </Badge>
                    </div>
                  </div>
                  <span className="shrink-0 text-sm font-medium text-[#D4B59E]">{dueLabel}</span>
                </div>
              );
            })}
          </CardContent>
        </Card>
      )}
    </section>
  );
}

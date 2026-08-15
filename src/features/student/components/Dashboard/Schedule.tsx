import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Card, CardContent, EmptyState, Spinner, ErrorState } from '@/components/ui';
import { CalendarDays, Clock } from 'lucide-react';
import { useMyGroups } from './queries';
import type { ScheduleDay } from '@/features/teacher/components/Groups/types';

const DAY_ORDER: ScheduleDay[] = ['saturday', 'sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday'];

interface ScheduleProps {
  limit?: number;
  viewAllHref?: string;
}

/** Real weekly session times, sourced from the group(s) the student
 *  belongs to (GET /students/{id}/groups), not exam dates — exams live
 *  on the Exams page instead. */
export function Schedule({ limit, viewAllHref }: ScheduleProps) {
  const { t } = useTranslation();
  const { data: groups = [], isLoading, isError, refetch } = useMyGroups();

  const slots = groups
    .flatMap((group) => group.schedule.map((slot) => ({ ...slot, groupName: group.name })))
    .sort((a, b) => {
      const dayDiff = DAY_ORDER.indexOf(a.day) - DAY_ORDER.indexOf(b.day);
      return dayDiff !== 0 ? dayDiff : a.startTime.localeCompare(b.startTime);
    });
  const visible = limit ? slots.slice(0, limit) : slots;

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

      {isLoading ? (
        <div className="flex justify-center py-10">
          <Spinner />
        </div>
      ) : isError ? (
        <ErrorState description={t('studentPages.dashboard.schedule.loadFailed')} onRetry={() => refetch()} />
      ) : visible.length === 0 ? (
        <EmptyState
          icon={<CalendarDays className="h-12 w-12" />}
          description={t('studentPages.dashboard.schedule.empty')}
        />
      ) : (
        <Card>
          <CardContent className="divide-y divide-[rgba(212,181,158,0.12)] p-0">
            {visible.map((slot, i) => (
              <div key={i} className="flex items-center gap-4 p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#D4B59E]/15 text-[#D4B59E]">
                  <Clock className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium text-[#F9F6F0]">
                    {t(`teacherPages.groups.days.${slot.day}`)}
                  </p>
                  <p className="truncate text-sm text-[rgba(249,246,240,0.55)]">{slot.groupName}</p>
                </div>
                <span className="shrink-0 text-sm font-medium text-[#D4B59E]" dir="ltr">
                  {slot.startTime}–{slot.endTime}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </section>
  );
}

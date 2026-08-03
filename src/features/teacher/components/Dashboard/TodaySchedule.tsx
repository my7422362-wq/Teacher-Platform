import { useTranslation } from 'react-i18next';
import { Card, CardContent, EmptyState } from '@/components/ui';
import { CalendarClock } from 'lucide-react';
import { getTodaySchedule } from './data';

export function TodaySchedule() {
  const { t } = useTranslation();
  const entries = getTodaySchedule();

  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold text-[#F9F6F0]">
        {t('teacherPages.dashboard.schedule.title')}
      </h2>

      {entries.length === 0 ? (
        <EmptyState
          icon={<CalendarClock className="h-12 w-12" />}
          description={t('teacherPages.dashboard.schedule.empty')}
        />
      ) : (
        <Card>
          <CardContent className="divide-y divide-[rgba(212,181,158,0.12)] p-0">
            {entries.map((entry) => (
              <div key={entry.groupId} className="flex items-center gap-4 p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#D4B59E]/15 text-[#D4B59E]">
                  <CalendarClock className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium text-[#F9F6F0]">{entry.groupName}</p>
                  <p className="truncate text-sm text-[rgba(249,246,240,0.55)]">{entry.courseName}</p>
                </div>
                <div className="shrink-0 text-end">
                  <p className="text-sm font-medium text-[#D4B59E]">
                    {entry.startTime} - {entry.endTime}
                  </p>
                  <p className="text-xs text-[rgba(249,246,240,0.45)]">
                    {t('teacherPages.dashboard.schedule.studentsCount', { count: entry.studentsCount })}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </section>
  );
}

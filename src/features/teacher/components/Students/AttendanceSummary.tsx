import { useTranslation } from 'react-i18next';
import { Card, CardContent, Badge, EmptyState } from '@/components/ui';
import { CalendarCheck } from 'lucide-react';
import type { AttendanceSummary as AttendanceSummaryType } from './data';

const STATUS_VARIANT = {
  present: 'success',
  late: 'outline',
  absent: 'destructive',
} as const;

export function AttendanceSummary({ attendance }: { attendance: AttendanceSummaryType }) {
  const { t, i18n } = useTranslation();

  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold text-[#F9F6F0]">
        {t('teacherPages.studentDetail.attendanceTitle')}
      </h2>

      {attendance.totalSessions === 0 ? (
        <EmptyState
          icon={<CalendarCheck className="h-12 w-12" />}
          description={t('teacherPages.studentDetail.attendanceEmpty')}
        />
      ) : (
        <Card>
          <CardContent className="p-0">
            <div className="flex items-center justify-between border-b border-[rgba(212,181,158,0.12)] p-4">
              <span className="text-sm text-[rgba(249,246,240,0.65)]">
                {t('teacherPages.studentDetail.attendanceRate')}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-[#D4B59E]">{attendance.rate}%</span>
                <span className="text-xs text-[rgba(249,246,240,0.45)]">
                  ({t('teacherPages.studentDetail.attendanceSessions', { count: attendance.totalSessions })})
                </span>
              </div>
            </div>
            <div className="divide-y divide-[rgba(212,181,158,0.12)]">
              {attendance.recent.map((record, i) => (
                <div key={i} className="flex items-center justify-between p-3 px-4">
                  <span className="text-sm text-[rgba(249,246,240,0.75)]">{record.groupName}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-[rgba(249,246,240,0.45)]">
                      {new Date(record.date).toLocaleDateString(i18n.language)}
                    </span>
                    <Badge variant={STATUS_VARIANT[record.status]}>
                      {t(`teacherPages.studentDetail.status${record.status[0].toUpperCase()}${record.status.slice(1)}`)}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </section>
  );
}

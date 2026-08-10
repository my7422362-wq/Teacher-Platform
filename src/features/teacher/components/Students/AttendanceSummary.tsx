import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, Badge, EmptyState, ErrorState, Spinner } from '@/components/ui';
import { CalendarCheck } from 'lucide-react';
import { useStudentAttendance } from './queries';

const STATUS_VARIANT = {
  present: 'success',
  late: 'outline',
  excused: 'outline',
  absent: 'destructive',
} as const;

export function AttendanceSummary({ studentId }: { studentId: number }) {
  const { t, i18n } = useTranslation();
  const { data: records = [], isLoading, isError, refetch } = useStudentAttendance(studentId);

  const sorted = useMemo(
    () => [...records].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
    [records]
  );
  const rate = useMemo(() => {
    if (records.length === 0) return 0;
    const present = records.filter((r) => r.status !== 'absent').length;
    return Math.round((present / records.length) * 100);
  }, [records]);

  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold text-[#F9F6F0]">
        {t('teacherPages.studentDetail.attendanceTitle')}
      </h2>

      {isLoading ? (
        <div className="flex justify-center py-10">
          <Spinner size="sm" />
        </div>
      ) : isError ? (
        <ErrorState description={t('teacherPages.students.toast.loadFailed')} onRetry={() => refetch()} />
      ) : records.length === 0 ? (
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
                <span className="text-lg font-bold text-[#D4B59E]">{rate}%</span>
                <span className="text-xs text-[rgba(249,246,240,0.45)]">
                  ({t('teacherPages.studentDetail.attendanceSessions', { count: records.length })})
                </span>
              </div>
            </div>
            <div className="divide-y divide-[rgba(212,181,158,0.12)]">
              {sorted.slice(0, 8).map((record, i) => (
                <div key={i} className="flex items-center justify-between p-3 px-4">
                  <span className="text-xs text-[rgba(249,246,240,0.45)]">
                    {new Date(record.date).toLocaleDateString(i18n.language)}
                  </span>
                  <Badge variant={STATUS_VARIANT[record.status]}>
                    {record.status === 'excused'
                      ? t('teacherPages.attendance.statusExcused')
                      : t(`teacherPages.studentDetail.status${record.status[0].toUpperCase()}${record.status.slice(1)}`)}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </section>
  );
}

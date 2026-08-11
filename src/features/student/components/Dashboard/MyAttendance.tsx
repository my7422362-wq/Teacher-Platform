import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, Badge, EmptyState, ErrorState, Spinner } from '@/components/ui';
import { CalendarCheck } from 'lucide-react';
import { useAuth } from '@/providers';
import { useStudentAttendance } from '@/features/teacher/components/Students/queries';

const STATUS_VARIANT = {
  present: 'success',
  late: 'outline',
  excused: 'outline',
  absent: 'destructive',
} as const;

/** GET /students/{student}/attendance — reused as-is from the teacher's
 *  per-student view, just called with the logged-in student's own id.
 *  No group name shown: the attendance record only has group_id, and
 *  students can't call GET /groups/{group} (teacher/admin only). */
export function MyAttendance() {
  const { t, i18n } = useTranslation();
  const { currentUser } = useAuth();
  const studentId = Number(currentUser?.id);
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

  if (isLoading) {
    return (
      <div className="flex justify-center py-16">
        <Spinner />
      </div>
    );
  }

  if (isError) {
    return <ErrorState description={t('studentPages.attendance.loadFailed')} onRetry={() => refetch()} />;
  }

  if (records.length === 0) {
    return (
      <EmptyState icon={<CalendarCheck className="h-12 w-12" />} description={t('studentPages.attendance.empty')} />
    );
  }

  return (
    <Card>
      <CardContent className="p-0">
        <div className="flex items-center justify-between border-b border-[rgba(212,181,158,0.12)] p-4">
          <span className="text-sm text-[rgba(249,246,240,0.65)]">{t('studentPages.attendance.rate')}</span>
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-[#D4B59E]">{rate}%</span>
            <span className="text-xs text-[rgba(249,246,240,0.45)]">
              ({t('studentPages.attendance.sessions', { count: records.length })})
            </span>
          </div>
        </div>
        <div className="divide-y divide-[rgba(212,181,158,0.12)]">
          {sorted.map((record, i) => (
            <div key={i} className="flex items-center justify-between p-3 px-4">
              <span className="text-sm text-[rgba(249,246,240,0.65)]">
                {new Date(record.date).toLocaleDateString(i18n.language)}
              </span>
              <Badge variant={STATUS_VARIANT[record.status]}>
                {t(`studentPages.attendance.status.${record.status}`)}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

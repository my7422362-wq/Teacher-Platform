import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { Card, CardContent, Input, Select, Avatar, EmptyState, ErrorState, Spinner, type SelectOption } from '@/components/ui';
import { cn } from '@/lib/utils';
import { Users } from 'lucide-react';
import { useTeacherGroups } from '@/features/teacher/components/Groups/queries';
import { useGroupAttendance, useMarkAttendance } from './queries';
import { AttendanceStats } from './AttendanceStats';
import type { AttendanceStatus } from './types';

function todayISO(): string {
  const date = new Date();
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

const STATUS_OPTIONS: { value: AttendanceStatus; labelKey: string; activeClass: string }[] = [
  { value: 'present', labelKey: 'teacherPages.studentDetail.statusPresent', activeClass: 'bg-[#6DA67A] text-[#0F2520]' },
  { value: 'late', labelKey: 'teacherPages.studentDetail.statusLate', activeClass: 'bg-[#D4B59E] text-[#0F2520]' },
  { value: 'excused', labelKey: 'teacherPages.attendance.statusExcused', activeClass: 'bg-[#8FA6C4] text-[#0F2520]' },
  { value: 'absent', labelKey: 'teacherPages.studentDetail.statusAbsent', activeClass: 'bg-destructive text-destructive-foreground' },
];

export function AttendanceTaker() {
  const { t } = useTranslation();
  const { data: groups = [], isLoading: groupsLoading } = useTeacherGroups();
  const [groupId, setGroupId] = useState<number>(0);
  const [date, setDate] = useState(todayISO());

  const activeGroupId = groupId || groups[0]?.id || 0;
  const { data: records = [], isLoading: recordsLoading, isError, refetch } = useGroupAttendance(activeGroupId);
  const markAttendance = useMarkAttendance(activeGroupId);

  const groupOptions: SelectOption[] = groups.map((g) => ({ value: String(g.id), label: g.name }));
  const activeGroup = groups.find((g) => g.id === activeGroupId);

  const roster = useMemo(() => {
    if (!activeGroup) return [];
    return activeGroup.students.map((student) => {
      const record = records.find((r) => r.studentId === student.id && r.date === date);
      return { studentId: student.id, name: student.name, avatar: student.avatar, status: record?.status ?? null };
    });
  }, [activeGroup, records, date]);

  const stats = useMemo(() => {
    const total = records.length;
    const presentDays = records.filter((r) => r.status === 'present').length;
    const absentDays = records.filter((r) => r.status === 'absent').length;
    const lateDays = records.filter((r) => r.status === 'late').length;
    const excusedDays = records.filter((r) => r.status === 'excused').length;
    return {
      rate: total ? Math.round(((presentDays + lateDays) / total) * 100) : 0,
      presentDays,
      absentDays,
      lateDays,
      excusedDays,
    };
  }, [records]);

  async function handleMark(studentId: number, status: AttendanceStatus) {
    try {
      await markAttendance.mutateAsync({ date, studentId, status });
      toast.success(t('teacherPages.attendance.savedToast'));
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t('teacherPages.attendance.toast.saveFailed'));
    }
  }

  if (groupsLoading) {
    return (
      <div className="flex justify-center py-16">
        <Spinner />
      </div>
    );
  }

  if (groups.length === 0) {
    return <EmptyState icon={<Users className="h-12 w-12" />} description={t('teacherPages.attendance.selectGroupPrompt')} />;
  }

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="sm:w-64">
          <Select
            label={t('teacherPages.attendance.filterGroup')}
            options={groupOptions}
            value={String(activeGroupId)}
            onChange={(v) => setGroupId(Number(v))}
          />
        </div>
        <div className="sm:w-56">
          <label className="mb-2 block text-sm font-medium text-[#F9F6F0]">
            {t('teacherPages.attendance.filterDate')}
          </label>
          <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
      </div>

      {recordsLoading ? (
        <div className="flex justify-center py-16">
          <Spinner />
        </div>
      ) : isError ? (
        <ErrorState description={t('teacherPages.attendance.toast.loadFailed')} onRetry={() => refetch()} />
      ) : (
        <>
          <AttendanceStats stats={stats} />

          {roster.length === 0 ? (
            <EmptyState description={t('teacherPages.attendance.noStudents')} />
          ) : (
            <Card>
              <CardContent className="divide-y divide-[rgba(212,181,158,0.12)] p-0">
                {roster.map((entry) => (
                  <div key={entry.studentId} className="flex items-center gap-4 p-4">
                    <Avatar src={entry.avatar ?? undefined} alt={entry.name} size="sm" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium text-[#F9F6F0]">{entry.name}</p>
                      {!entry.status && (
                        <p className="text-xs text-[rgba(249,246,240,0.45)]">{t('teacherPages.attendance.notMarked')}</p>
                      )}
                    </div>
                    <div className="flex shrink-0 flex-wrap gap-2">
                      {STATUS_OPTIONS.map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => handleMark(entry.studentId, option.value)}
                          className={cn(
                            'rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors',
                            entry.status === option.value
                              ? cn('border-transparent', option.activeClass)
                              : 'border-[rgba(212,181,158,0.25)] bg-transparent text-[#F9F6F0] hover:bg-[#16342D]'
                          )}
                        >
                          {t(option.labelKey)}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </>
      )}
    </section>
  );
}

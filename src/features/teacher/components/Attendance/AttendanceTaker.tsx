import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { Card, CardContent, Input, Select, Avatar, EmptyState, type SelectOption } from '@/components/ui';
import { cn } from '@/lib/utils';
import { Users } from 'lucide-react';
import { getTeacherGroups, getRoster, getGroupStats, type RosterEntry } from './data';
import { setAttendance } from './attendance-store';
import { AttendanceStats } from './AttendanceStats';
import type { AttendanceRecord } from '@/types';

function todayISO(): string {
  const date = new Date();
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

const STATUS_OPTIONS: { value: AttendanceRecord['status']; labelKey: string; activeClass: string }[] = [
  { value: 'present', labelKey: 'teacherPages.studentDetail.statusPresent', activeClass: 'bg-[#6DA67A] text-[#0F2520]' },
  { value: 'late', labelKey: 'teacherPages.studentDetail.statusLate', activeClass: 'bg-[#D4B59E] text-[#0F2520]' },
  { value: 'absent', labelKey: 'teacherPages.studentDetail.statusAbsent', activeClass: 'bg-destructive text-destructive-foreground' },
];

export function AttendanceTaker() {
  const { t } = useTranslation();
  const groups = useMemo(() => getTeacherGroups(), []);
  const [groupId, setGroupId] = useState<number>(groups[0]?.id ?? 0);
  const [date, setDate] = useState(todayISO());
  const [roster, setRoster] = useState<RosterEntry[]>(() => (groups[0] ? getRoster(groups[0].id, todayISO()) : []));

  const groupOptions: SelectOption[] = groups.map((g) => ({ value: String(g.id), label: g.name }));

  function refresh(nextGroupId: number, nextDate: string) {
    setRoster(getRoster(nextGroupId, nextDate));
  }

  function handleGroupChange(value: string) {
    const id = Number(value);
    setGroupId(id);
    refresh(id, date);
  }

  function handleDateChange(value: string) {
    setDate(value);
    refresh(groupId, value);
  }

  function handleMark(studentId: number, status: AttendanceRecord['status']) {
    setAttendance(groupId, studentId, date, status);
    refresh(groupId, date);
    toast.success(t('teacherPages.attendance.savedToast'));
  }

  const stats = useMemo(() => (groupId ? getGroupStats(groupId) : null), [groupId, roster]);

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
            value={String(groupId)}
            onChange={handleGroupChange}
          />
        </div>
        <div className="sm:w-56">
          <label className="mb-2 block text-sm font-medium text-[#F9F6F0]">
            {t('teacherPages.attendance.filterDate')}
          </label>
          <Input type="date" value={date} onChange={(e) => handleDateChange(e.target.value)} />
        </div>
      </div>

      {stats && <AttendanceStats stats={stats} />}

      {roster.length === 0 ? (
        <EmptyState description={t('teacherPages.attendance.noStudents')} />
      ) : (
        <Card>
          <CardContent className="divide-y divide-[rgba(212,181,158,0.12)] p-0">
            {roster.map((entry) => (
              <div key={entry.studentId} className="flex items-center gap-4 p-4">
                <Avatar src={entry.avatar} alt={entry.name} size="sm" />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium text-[#F9F6F0]">{entry.name}</p>
                  {!entry.status && (
                    <p className="text-xs text-[rgba(249,246,240,0.45)]">{t('teacherPages.attendance.notMarked')}</p>
                  )}
                </div>
                <div className="flex shrink-0 gap-2">
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
    </section>
  );
}

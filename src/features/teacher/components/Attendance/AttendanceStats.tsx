import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/components/ui';
import { TrendingUp, CheckCircle2, XCircle, Clock, type LucideIcon } from 'lucide-react';

export interface GroupAttendanceStats {
  rate: number;
  presentDays: number;
  absentDays: number;
  lateDays: number;
  excusedDays: number;
}

interface StatItem {
  icon: LucideIcon;
  value: string | number;
  labelKey: string;
}

export function AttendanceStats({ stats }: { stats: GroupAttendanceStats }) {
  const { t } = useTranslation();

  const items: StatItem[] = [
    { icon: TrendingUp, value: `${stats.rate}%`, labelKey: 'teacherPages.attendance.stats.rate' },
    { icon: CheckCircle2, value: stats.presentDays, labelKey: 'teacherPages.attendance.stats.present' },
    { icon: XCircle, value: stats.absentDays, labelKey: 'teacherPages.attendance.stats.absent' },
    { icon: Clock, value: stats.lateDays, labelKey: 'teacherPages.attendance.stats.late' },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {items.map(({ icon: Icon, value, labelKey }) => (
        <Card key={labelKey}>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#D4B59E]/15 text-[#D4B59E]">
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#F9F6F0]">{value}</p>
              <p className="text-sm text-[rgba(249,246,240,0.65)]">{t(labelKey)}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

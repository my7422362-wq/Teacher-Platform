import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/components/ui';
import { Users, BookOpen, UserCog, UsersRound, ClipboardList, Wallet, type LucideIcon } from 'lucide-react';
import { getTeacherStats } from './data';

interface StatItem {
  icon: LucideIcon;
  value: string | number;
  labelKey: string;
}

export function StatsOverview() {
  const { t } = useTranslation();
  const stats = getTeacherStats();

  const items: StatItem[] = [
    { icon: Users, value: stats.totalStudents, labelKey: 'teacherPages.dashboard.stats.students' },
    { icon: BookOpen, value: stats.totalCourses, labelKey: 'teacherPages.dashboard.stats.courses' },
    { icon: UserCog, value: stats.totalTeachers, labelKey: 'teacherPages.dashboard.stats.teachers' },
    { icon: UsersRound, value: stats.totalGroups, labelKey: 'teacherPages.dashboard.stats.groups' },
    { icon: ClipboardList, value: stats.totalExamsAndQuizzes, labelKey: 'teacherPages.dashboard.stats.examsQuizzes' },
    { icon: Wallet, value: `${stats.totalRevenue.toLocaleString()} SAR`, labelKey: 'teacherPages.dashboard.stats.revenue' },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
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

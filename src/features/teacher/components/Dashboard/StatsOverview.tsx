import { useTranslation } from 'react-i18next';
import { Card, CardContent, Spinner } from '@/components/ui';
import { Users, BookOpen, UsersRound, Wallet, type LucideIcon } from 'lucide-react';
import { useTeacherStudentsList } from '../Students/queries';
import { useTeacherCourses } from '../Courses/queries';
import { useTeacherGroups } from '../Groups/queries';
import { useTeacherPayments } from '../Payments/queries';

interface StatItem {
  icon: LucideIcon;
  value: string | number;
  labelKey: string;
}

export function StatsOverview() {
  const { t } = useTranslation();
  const { data: students, isLoading: studentsLoading } = useTeacherStudentsList();
  const { data: courses, isLoading: coursesLoading } = useTeacherCourses();
  const { data: groups, isLoading: groupsLoading } = useTeacherGroups();
  const { data: payments, isLoading: paymentsLoading } = useTeacherPayments();

  if (studentsLoading || coursesLoading || groupsLoading || paymentsLoading) {
    return (
      <div className="flex justify-center py-8">
        <Spinner />
      </div>
    );
  }

  const totalRevenue = (payments ?? [])
    .filter((p) => p.status === 'approved')
    .reduce((sum, p) => sum + p.amount, 0);

  const items: StatItem[] = [
    { icon: Users, value: students?.length ?? 0, labelKey: 'teacherPages.dashboard.stats.students' },
    { icon: BookOpen, value: courses?.length ?? 0, labelKey: 'teacherPages.dashboard.stats.courses' },
    { icon: UsersRound, value: groups?.length ?? 0, labelKey: 'teacherPages.dashboard.stats.groups' },
    { icon: Wallet, value: totalRevenue.toLocaleString(), labelKey: 'teacherPages.dashboard.stats.revenue' },
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

import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/components/ui';
import { BookOpen, CheckCircle2, TrendingUp, Award, type LucideIcon } from 'lucide-react';
import { enrolledCourses, completedCourses, avgProgress, studentCertificates } from './data';

interface StatItem {
  icon: LucideIcon;
  value: string | number;
  labelKey: string;
}

export function StatsOverview() {
  const { t } = useTranslation();

  const stats: StatItem[] = [
    { icon: BookOpen, value: enrolledCourses.length, labelKey: 'studentPages.dashboard.stats.enrolledCourses' },
    { icon: CheckCircle2, value: completedCourses.length, labelKey: 'studentPages.dashboard.stats.completedCourses' },
    { icon: TrendingUp, value: `${avgProgress}%`, labelKey: 'studentPages.dashboard.stats.avgProgress' },
    { icon: Award, value: studentCertificates.length, labelKey: 'studentPages.dashboard.stats.certificates' },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {stats.map(({ icon: Icon, value, labelKey }) => (
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

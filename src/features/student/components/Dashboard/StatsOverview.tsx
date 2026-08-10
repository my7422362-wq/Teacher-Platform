import { useTranslation } from 'react-i18next';
import { Card, CardContent, Spinner } from '@/components/ui';
import { BookOpen, CheckCircle2, TrendingUp, Award, type LucideIcon } from 'lucide-react';
import { useMyCourses, useMyCertificates } from './queries';

interface StatItem {
  icon: LucideIcon;
  value: string | number;
  labelKey: string;
}

export function StatsOverview() {
  const { t } = useTranslation();
  const { data: courses, isLoading: coursesLoading } = useMyCourses();
  const { data: certificates, isLoading: certificatesLoading } = useMyCertificates();

  if (coursesLoading || certificatesLoading) {
    return (
      <div className="flex justify-center py-8">
        <Spinner />
      </div>
    );
  }

  const enrolled = courses ?? [];
  const completed = enrolled.filter((c) => c.progressPercent >= 100);
  const avgProgress = enrolled.length
    ? Math.round(enrolled.reduce((sum, c) => sum + c.progressPercent, 0) / enrolled.length)
    : 0;

  const stats: StatItem[] = [
    { icon: BookOpen, value: enrolled.length, labelKey: 'studentPages.dashboard.stats.enrolledCourses' },
    { icon: CheckCircle2, value: completed.length, labelKey: 'studentPages.dashboard.stats.completedCourses' },
    { icon: TrendingUp, value: `${avgProgress}%`, labelKey: 'studentPages.dashboard.stats.avgProgress' },
    { icon: Award, value: certificates?.length ?? 0, labelKey: 'studentPages.dashboard.stats.certificates' },
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

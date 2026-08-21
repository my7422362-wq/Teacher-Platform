import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui';
import { UsersRound, Users, BookOpen, Receipt, Clock3, type LucideIcon } from 'lucide-react';
import type { AdminOverview } from '@/services';

interface StatItem {
  icon: LucideIcon;
  value: string | number;
  labelKey: string;
  href?: string;
  accent?: boolean;
}

export function OverviewStats({ overview }: { overview: AdminOverview }) {
  const { t } = useTranslation();

  const items: StatItem[] = [
    { icon: UsersRound, value: overview.totalTeachers, labelKey: 'adminPages.overview.stats.teachers', href: '/admin/teachers' },
    { icon: Users, value: overview.totalStudents, labelKey: 'adminPages.overview.stats.students', href: '/admin/students' },
    { icon: BookOpen, value: overview.totalCourses, labelKey: 'adminPages.overview.stats.courses', href: '/admin/courses' },
    {
      icon: Receipt,
      value: `${overview.totalRevenue.toLocaleString()}`,
      labelKey: 'adminPages.overview.stats.revenue',
      href: '/admin/payments',
    },
    {
      icon: Clock3,
      value: overview.pendingPayments,
      labelKey: 'adminPages.overview.stats.pendingPayments',
      href: '/admin/payments',
      accent: overview.pendingPayments > 0,
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
      {items.map(({ icon: Icon, value, labelKey, href, accent }) => {
        const card = (
          <Card className={accent ? 'border-[#D4B59E]/50' : undefined}>
            <CardContent className="flex items-center gap-4 p-5">
              <div
                className={
                  accent
                    ? 'flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-destructive/15 text-destructive'
                    : 'flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#D4B59E]/15 text-[#D4B59E]'
                }
              >
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#F9F6F0]">{value}</p>
                <p className="text-sm text-[rgba(249,246,240,0.65)]">{t(labelKey)}</p>
              </div>
            </CardContent>
          </Card>
        );
        return href ? (
          <Link key={labelKey} to={href} className="block transition-transform hover:-translate-y-0.5">
            {card}
          </Link>
        ) : (
          <div key={labelKey}>{card}</div>
        );
      })}
    </div>
  );
}

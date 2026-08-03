import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui';
import { BookOpen, Users, BarChart3, type LucideIcon } from 'lucide-react';

interface Action {
  icon: LucideIcon;
  labelKey: string;
  path: string;
}

const ACTIONS: Action[] = [
  { icon: BookOpen, labelKey: 'teacherPages.dashboard.quickActions.manageCourses', path: '/teacher/courses' },
  { icon: Users, labelKey: 'teacherPages.dashboard.quickActions.manageStudents', path: '/teacher/students' },
  { icon: BarChart3, labelKey: 'teacherPages.dashboard.quickActions.viewAnalytics', path: '/teacher/analytics' },
];

export function QuickActions() {
  const { t } = useTranslation();

  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold text-[#F9F6F0]">
        {t('teacherPages.dashboard.quickActions.title')}
      </h2>

      <div className="grid gap-4 sm:grid-cols-3">
        {ACTIONS.map(({ icon: Icon, labelKey, path }) => (
          <Link key={path} to={path}>
            <Card>
              <CardContent className="flex items-center gap-3 p-5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#D4B59E]/15 text-[#D4B59E]">
                  <Icon className="h-5 w-5" />
                </div>
                <p className="font-medium text-[#F9F6F0]">{t(labelKey)}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}

import { useTranslation } from 'react-i18next';
import { DashboardLayout } from './dashboard-layout';
import { LayoutDashboard, BookOpen, Users, BarChart3 } from 'lucide-react';

export function TeacherLayout() {
  const { t } = useTranslation();

  const sidebarItems = [
    { icon: <LayoutDashboard className="h-4 w-4" />, label: t('dashboardLayout.sidebar.dashboard'), path: '/teacher/dashboard' },
    { icon: <BookOpen className="h-4 w-4" />, label: t('dashboardLayout.sidebar.courses'), path: '/teacher/courses' },
    { icon: <Users className="h-4 w-4" />, label: t('dashboardLayout.sidebar.students'), path: '/teacher/students' },
    { icon: <BarChart3 className="h-4 w-4" />, label: t('dashboardLayout.sidebar.analytics'), path: '/teacher/analytics' },
  ];

  return <DashboardLayout sidebarItems={sidebarItems} role="teacher" />;
}

import { useTranslation } from 'react-i18next';
import { DashboardLayout } from './dashboard-layout';
import { LayoutDashboard, BookOpen, User } from 'lucide-react';

export function StudentLayout() {
  const { t } = useTranslation();

  const sidebarItems = [
    { icon: <LayoutDashboard className="h-4 w-4" />, label: t('dashboardLayout.sidebar.dashboard'), path: '/student/dashboard' },
    { icon: <BookOpen className="h-4 w-4" />, label: t('dashboardLayout.sidebar.myCourses'), path: '/student/courses' },
    { icon: <User className="h-4 w-4" />, label: t('dashboardLayout.sidebar.profile'), path: '/student/profile' },
  ];

  return <DashboardLayout sidebarItems={sidebarItems} role="student" />;
}

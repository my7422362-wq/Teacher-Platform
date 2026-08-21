import { useTranslation } from 'react-i18next';
import { DashboardLayout } from './dashboard-layout';
import { LayoutDashboard, UsersRound, Users, BookOpen, Receipt, Settings } from 'lucide-react';

export function AdminLayout() {
  const { t } = useTranslation();

  const sidebarItems = [
    { icon: <LayoutDashboard className="h-4 w-4" />, label: t('dashboardLayout.sidebar.dashboard'), path: '/admin/dashboard' },
    { icon: <UsersRound className="h-4 w-4" />, label: t('adminPages.sidebar.teachers'), path: '/admin/teachers' },
    { icon: <Users className="h-4 w-4" />, label: t('adminPages.sidebar.students'), path: '/admin/students' },
    { icon: <BookOpen className="h-4 w-4" />, label: t('adminPages.sidebar.courses'), path: '/admin/courses' },
    { icon: <Receipt className="h-4 w-4" />, label: t('dashboardLayout.sidebar.payments'), path: '/admin/payments' },
    { icon: <Settings className="h-4 w-4" />, label: t('dashboardLayout.settings'), path: '/admin/settings' },
  ];

  return <DashboardLayout sidebarItems={sidebarItems} role="admin" />;
}

import { useTranslation } from 'react-i18next';
import { DashboardLayout } from './dashboard-layout';
import { LayoutDashboard, BookOpen, Tag, ListVideo, HelpCircle, Users, UsersRound, ClipboardCheck, CalendarCheck, CalendarDays, Receipt, Bell, BarChart3, Settings } from 'lucide-react';

export function TeacherLayout() {
  const { t } = useTranslation();

  const sidebarItems = [
    { icon: <LayoutDashboard className="h-4 w-4" />, label: t('dashboardLayout.sidebar.dashboard'), path: '/teacher/dashboard' },
    { icon: <BookOpen className="h-4 w-4" />, label: t('dashboardLayout.sidebar.courses'), path: '/teacher/courses' },
    { icon: <Tag className="h-4 w-4" />, label: t('dashboardLayout.sidebar.categories'), path: '/teacher/categories' },
    { icon: <ListVideo className="h-4 w-4" />, label: t('dashboardLayout.sidebar.lessons'), path: '/teacher/lessons' },
    { icon: <CalendarDays className="h-4 w-4" />, label: t('dashboardLayout.sidebar.groups'), path: '/teacher/groups' },
    { icon: <HelpCircle className="h-4 w-4" />, label: t('dashboardLayout.sidebar.quizzesExams'), path: '/teacher/quizzes-exams' },
    { icon: <ClipboardCheck className="h-4 w-4" />, label: t('dashboardLayout.sidebar.grades'), path: '/teacher/grades' },
    { icon: <CalendarCheck className="h-4 w-4" />, label: t('dashboardLayout.sidebar.attendance'), path: '/teacher/attendance' },
    { icon: <Users className="h-4 w-4" />, label: t('dashboardLayout.sidebar.students'), path: '/teacher/students' },
    { icon: <UsersRound className="h-4 w-4" />, label: t('dashboardLayout.sidebar.parents'), path: '/teacher/parents' },
    { icon: <Receipt className="h-4 w-4" />, label: t('dashboardLayout.sidebar.payments'), path: '/teacher/payments' },
    { icon: <Bell className="h-4 w-4" />, label: t('dashboardLayout.sidebar.notifications'), path: '/teacher/notifications' },
    { icon: <BarChart3 className="h-4 w-4" />, label: t('dashboardLayout.sidebar.analytics'), path: '/teacher/analytics' },
    { icon: <Settings className="h-4 w-4" />, label: t('dashboardLayout.settings'), path: '/teacher/settings' },
  ];

  return <DashboardLayout sidebarItems={sidebarItems} role="teacher" />;
}

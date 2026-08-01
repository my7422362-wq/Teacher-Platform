import { useTranslation } from 'react-i18next';
import { DashboardLayout } from './dashboard-layout';
import {
  LayoutDashboard,
  BookOpen,
  User,
  Calendar,
  HelpCircle,
  GraduationCap,
  ClipboardCheck,
  BookOpenCheck,
  Award,
  Bell,
  Receipt,
} from 'lucide-react';

export function StudentLayout() {
  const { t } = useTranslation();

  const sidebarItems = [
    { icon: <LayoutDashboard className="h-4 w-4" />, label: t('dashboardLayout.sidebar.dashboard'), path: '/student/dashboard' },
    { icon: <BookOpen className="h-4 w-4" />, label: t('dashboardLayout.sidebar.myCourses'), path: '/student/courses' },
    { icon: <Calendar className="h-4 w-4" />, label: t('dashboardLayout.sidebar.schedule'), path: '/student/schedule' },
    { icon: <HelpCircle className="h-4 w-4" />, label: t('dashboardLayout.sidebar.quizzes'), path: '/student/quizzes' },
    { icon: <GraduationCap className="h-4 w-4" />, label: t('dashboardLayout.sidebar.exams'), path: '/student/exams' },
    { icon: <ClipboardCheck className="h-4 w-4" />, label: t('dashboardLayout.sidebar.grades'), path: '/student/grades' },
    { icon: <BookOpenCheck className="h-4 w-4" />, label: t('dashboardLayout.sidebar.revisionMaterials'), path: '/student/revision' },
    { icon: <Award className="h-4 w-4" />, label: t('dashboardLayout.sidebar.certificates'), path: '/student/certificates' },
    { icon: <Bell className="h-4 w-4" />, label: t('dashboardLayout.sidebar.notifications'), path: '/student/notifications' },
    { icon: <Receipt className="h-4 w-4" />, label: t('dashboardLayout.sidebar.payments'), path: '/student/payments' },
    { icon: <User className="h-4 w-4" />, label: t('dashboardLayout.sidebar.profile'), path: '/student/profile' },
  ];

  return <DashboardLayout sidebarItems={sidebarItems} role="student" />;
}

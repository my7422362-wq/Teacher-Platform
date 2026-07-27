import { DashboardLayout } from './dashboard-layout';
import { LayoutDashboard, BookOpen, Users, BarChart3 } from 'lucide-react';

const sidebarItems = [
  { icon: <LayoutDashboard className="h-4 w-4" />, label: 'لوحة التحكم', path: '/teacher/dashboard' },
  { icon: <BookOpen className="h-4 w-4" />, label: 'الدورات', path: '/teacher/courses' },
  { icon: <Users className="h-4 w-4" />, label: 'الطلاب', path: '/teacher/students' },
  { icon: <BarChart3 className="h-4 w-4" />, label: 'التحليلات', path: '/teacher/analytics' },
];

export function TeacherLayout() {
  return <DashboardLayout sidebarItems={sidebarItems} role="teacher" />;
}


import { DashboardLayout } from './dashboard-layout';
import { LayoutDashboard, BookOpen, User } from 'lucide-react';

const sidebarItems = [
  { icon: <LayoutDashboard className="h-4 w-4" />, label: 'لوحة التحكم', path: '/student/dashboard' },
  { icon: <BookOpen className="h-4 w-4" />, label: 'دوراتي', path: '/student/courses' },
  { icon: <User className="h-4 w-4" />, label: 'الملف الشخصي', path: '/student/profile' },
];

export function StudentLayout() {
  return <DashboardLayout sidebarItems={sidebarItems} role="student" />;
}


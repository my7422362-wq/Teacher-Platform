import { useState } from 'react';
import type { ReactNode } from 'react';
import { Outlet, useLocation, Link, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  GraduationCap,
  Bell,
  Menu,
  X,
  LogOut,
  ChevronDown,
  User,
  Settings,
} from 'lucide-react';
import {
  Avatar,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui';

interface SidebarItem {
  icon: ReactNode;
  label: string;
  path: string;
}

interface DashboardLayoutProps {
  sidebarItems: SidebarItem[];
  role: 'student' | 'teacher';
}

export function DashboardLayout({ sidebarItems, role }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Add logout logic here in future
    console.log('Logging out...');
    navigate('/login');
  };

  return (
    <div className="flex min-h-screen bg-muted/20" dir="rtl">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 right-0 z-50 flex w-64 flex-col border-l border-border/40 bg-background transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0',
          sidebarOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="flex h-16 items-center justify-between border-b border-border/40 px-4">
          <Link to="/" className="flex items-center gap-2 font-bold text-lg text-foreground hover:opacity-90">
            <GraduationCap className="h-6 w-6 text-primary" />
            <span>نظام التعلم</span>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden rounded-md p-1 hover:bg-muted"
            aria-label="إغلاق القائمة"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-1.5">
            {sidebarItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={cn(
                      'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200',
                      isActive
                        ? 'bg-primary text-primary-foreground shadow-sm'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    )}
                  >
                    <span className={cn('shrink-0', isActive ? 'text-inherit' : 'text-muted-foreground/80')}>{item.icon}</span>
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="border-t border-border/40 p-4">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
          >
            <LogOut className="h-4 w-4" />
            تسجيل الخروج
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col">
        {/* Top header */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border/40 bg-background/80 backdrop-blur-md px-4 lg:px-6">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden rounded-md p-1.5 hover:bg-muted text-foreground"
            aria-label="فتح القائمة"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="flex-1" />

          <div className="flex items-center gap-4">
            <Link
              to={`/${role}/notifications`}
              className="relative rounded-full p-2 text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-all"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground ring-2 ring-background">
                3
              </span>
            </Link>

            {/* Profile Dropdown Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-2 rounded-lg hover:bg-muted/80 p-1.5 px-2.5 transition-colors focus-visible:ring-1 focus-visible:ring-ring border border-transparent">
                <Avatar size="sm" fallback="أ" />
                <span className="hidden text-sm font-medium md:inline text-foreground">أحمد محمد</span>
                <ChevronDown className="hidden h-4 w-4 md:inline text-muted-foreground/80" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 mt-1">
                <div className="px-2 py-2 text-right">
                  <p className="text-sm font-semibold text-foreground">أحمد محمد</p>
                  <p className="text-xs text-muted-foreground truncate">ahmed@example.com</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate(`/${role}/profile`)}>
                  <User className="h-4 w-4 me-2 text-muted-foreground" />
                  الملف الشخصي
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate(`/${role}/settings`)}>
                  <Settings className="h-4 w-4 me-2 text-muted-foreground" />
                  الإعدادات
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-destructive focus:bg-destructive/10 focus:text-destructive"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4 me-2" />
                  تسجيل الخروج
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}



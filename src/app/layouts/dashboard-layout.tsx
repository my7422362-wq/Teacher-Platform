import { useState } from 'react';
import type { ReactNode } from 'react';
import { Outlet, useLocation, Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import { useAuth } from '@/app/providers';
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
import { LanguageSwitcher } from '@/components/common/language-switcher';

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
  const { t } = useTranslation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    toast.success(t('auth.toast.logoutSuccess'));
    navigate('/login');
  };

  return (
    <div className="flex min-h-screen bg-[#0F2520]">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 right-0 z-50 flex w-64 flex-col border-l border-[rgba(212,181,158,0.1)] bg-[#0F2520] transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0',
          sidebarOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="flex h-16 items-center justify-between border-b border-[rgba(212,181,158,0.1)] px-4">
          <Link to="/" className="flex items-center gap-2 font-bold text-lg text-[#F9F6F0] hover:opacity-90">
            <GraduationCap className="h-6 w-6 text-[#D4B59E]" />
            <span>{t('common.brand')}</span>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden rounded-md p-1 hover:bg-[#16342D] text-[rgba(249,246,240,0.55)]"
            aria-label={t('dashboardLayout.closeMenu')}
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
                      'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200',
                      isActive
                        ? 'bg-[#D4B59E] text-[#0F2520] shadow-sm'
                        : 'text-[rgba(249,246,240,0.55)] hover:bg-[#16342D] hover:text-[#F9F6F0]'
                    )}
                  >
                    <span className={cn('shrink-0', isActive ? 'text-[#0F2520]' : 'text-[rgba(249,246,240,0.35)]')}>{item.icon}</span>
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="border-t border-[rgba(212,181,158,0.1)] p-4">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-[rgba(249,246,240,0.45)] hover:bg-[#16342D] hover:text-[#F9F6F0] transition-colors"
          >
            <LogOut className="h-4 w-4" />
            {t('dashboardLayout.logout')}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col">
        {/* Top header */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-[rgba(212,181,158,0.12)] bg-[#0F2520]/95 backdrop-blur-md shadow-card px-4 lg:px-6">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden rounded-md p-1.5 hover:bg-[#16342D] text-[rgba(249,246,240,0.55)]"
            aria-label={t('dashboardLayout.openMenu')}
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="flex-1" />

          <div className="flex items-center gap-4">
            <LanguageSwitcher />

            <Link
              to={`/${role}/notifications`}
              className="relative rounded-full p-2 text-[rgba(249,246,240,0.55)] hover:text-[#D4B59E] hover:bg-[#16342D] transition-all"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-white ring-2 ring-[#0F2520]">
                3
              </span>
            </Link>

            {/* Profile Dropdown Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-2 rounded-lg hover:bg-[#16342D] p-1.5 px-2.5 transition-colors focus-visible:ring-1 focus-visible:ring-[#D4B59E] border border-[rgba(212,181,158,0.1)]">
                <Avatar size="sm" fallback={currentUser?.name} />
                <span className="hidden text-sm font-medium md:inline text-[#F9F6F0]">{currentUser?.name}</span>
                <ChevronDown className="hidden h-4 w-4 md:inline text-[rgba(249,246,240,0.45)]" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 mt-1">
                <div className="px-2 py-2">
                  <p className="text-sm font-semibold text-[#F9F6F0]">{currentUser?.name}</p>
                  <p className="text-xs text-[rgba(249,246,240,0.55)] truncate">{currentUser?.email}</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate(`/${role}/profile`)}>
                  <User className="h-4 w-4 me-2 text-[rgba(249,246,240,0.45)]" />
                  {t('dashboardLayout.profile')}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate(`/${role}/settings`)}>
                  <Settings className="h-4 w-4 me-2 text-[rgba(249,246,240,0.45)]" />
                  {t('dashboardLayout.settings')}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-destructive focus:bg-destructive/10 focus:text-destructive"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4 me-2" />
                  {t('dashboardLayout.logout')}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6 bg-[#0F2520]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}


import { Link, useNavigate } from 'react-router-dom';
import { LogIn, UserPlus, LogOut, LayoutDashboard, ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { useAuth } from '@/providers';
import {
  Avatar,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui';
import { LanguageDropdown } from './LanguageDropdown';

export function NavbarActions() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isAuthenticated, currentUser, role, logout } = useAuth();

  async function handleLogout() {
    await logout();
    toast.success(t('auth.toast.logoutSuccess'));
    navigate('/');
  }

  return (
    <div className="hidden md:flex items-center gap-3">
      <LanguageDropdown />

      {isAuthenticated && currentUser ? (
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-[#F9F6F0] hover:bg-[#16342D] transition-colors cursor-pointer">
            <Avatar size="sm" src={currentUser.avatar} fallback={currentUser.name} />
            <span className="max-w-[140px] truncate">{currentUser.name}</span>
            <ChevronDown className="h-4 w-4 text-[rgba(249,246,240,0.45)]" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 mt-1">
            <div className="px-2 py-2">
              <p className="truncate text-sm font-semibold text-[#F9F6F0]">{currentUser.name}</p>
              <p className="truncate text-xs text-[rgba(249,246,240,0.55)]">{currentUser.email}</p>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate(`/${role}/dashboard`)}>
              <LayoutDashboard className="h-4 w-4 me-2 text-[rgba(249,246,240,0.45)]" />
              {t('nav.dashboard')}
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
      ) : (
        <>
          <Link
            to="/login"
            className="flex items-center gap-1.5 text-sm font-medium text-[rgba(249,246,240,0.55)] hover:text-[#F9F6F0] transition-colors px-4 py-2 rounded-xl hover:bg-[#16342D]"
          >
            <LogIn className="h-4 w-4" />
            {t('nav.login')}
          </Link>

          <Link to="/register">
            <button className="bg-[#D4B59E] hover:bg-[#C7A187] text-[#0F2520] rounded-xl px-5 py-2 text-sm font-medium transition-all duration-300 cursor-pointer shadow-sm">
              <UserPlus className="h-4 w-4 ml-1 inline" />
              {t('nav.register')}
            </button>
          </Link>
        </>
      )}
    </div>
  );
}

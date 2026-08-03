import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/providers';
import type { AuthRole } from '../types';

const ROLE_HOME: Record<AuthRole, string> = {
  student: '/student/dashboard',
  teacher: '/teacher/dashboard',
  guest: '/',
};

/**
 * Guards routes meant only for signed-out visitors (login, register,
 * forgot-password). Already-authenticated users are redirected to their
 * dashboard instead of seeing the auth forms again. Guests are not
 * "authenticated" here, so they can still freely visit these pages.
 */
export function GuestRoute() {
  const { isAuthenticated, role, loading } = useAuth();

  if (loading) return null;

  if (isAuthenticated && role) {
    return <Navigate to={ROLE_HOME[role]} replace />;
  }

  return <Outlet />;
}


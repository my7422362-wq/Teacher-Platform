import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/app/providers';
import { Loader } from '@/components/ui';
import type { AuthRole } from '../types';

interface ProtectedRouteProps {
  allowedRoles?: AuthRole[];
}

/**
 * Guards nested routes behind authentication. Unauthenticated visitors
 * (including guests, who are not considered "authenticated") are redirected
 * to /login, preserving the originally requested location so login can
 * send them back afterwards.
 */
export function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
  const { isAuthenticated, role, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0F2520]">
        <Loader />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && role && !allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

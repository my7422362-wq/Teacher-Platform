import { Outlet } from 'react-router-dom';

/**
 * Minimal shell for auth routes (login/register/forgot-password). Each page
 * builds its own presentation (split-screen for login, centered card for
 * register/forgot-password via AuthCard) since their layouts differ.
 */
export function AuthLayout() {
  return (
    <div className="min-h-screen bg-[#0F2520]">
      <Outlet />
    </div>
  );
}

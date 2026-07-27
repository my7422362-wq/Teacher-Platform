import { Outlet } from 'react-router-dom';

export function AuthLayout() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/50 px-4 py-12">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold">نظام إدارة التعلم</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            منصة تعليمية متكاملة للمعلم والطالب
          </p>
        </div>
        <Outlet />
      </div>
    </div>
  );
}


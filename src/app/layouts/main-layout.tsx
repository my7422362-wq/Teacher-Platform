import { Outlet } from 'react-router-dom';

export function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="text-xl font-bold">نظام إدارة التعلم</div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="/" className="text-sm font-medium hover:text-primary">
              الرئيسية
            </a>
            <a href="/courses" className="text-sm font-medium hover:text-primary">
              الدورات
            </a>
            <a href="/about" className="text-sm font-medium hover:text-primary">
              عن المنصة
            </a>
          </nav>
          <div className="flex items-center gap-4">
            <a
              href="/login"
              className="text-sm font-medium hover:text-primary"
            >
              تسجيل الدخول
            </a>
            <a
              href="/register"
              className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              إنشاء حساب
            </a>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} نظام إدارة التعلم. جميع الحقوق محفوظة.
        </div>
      </footer>
    </div>
  );
}


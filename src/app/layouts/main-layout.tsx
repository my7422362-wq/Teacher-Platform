import { Outlet, NavLink, Link } from 'react-router-dom';
import { GraduationCap } from 'lucide-react';
import { cn } from '@/lib/utils';

export function MainLayout() {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      'text-sm font-medium transition-colors hover:text-primary relative py-1.5',
      isActive
        ? 'text-primary font-semibold after:absolute after:bottom-0 after:right-0 after:h-0.5 after:w-full after:bg-primary after:rounded-full'
        : 'text-muted-foreground'
    );

  return (
    <div className="flex min-h-screen flex-col bg-background" dir="rtl">
      {/* Glassmorphic sticky header */}
      <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2 font-bold text-lg text-foreground hover:opacity-90">
            <GraduationCap className="h-6 w-6 text-primary" />
            <span>نظام التعلم</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <NavLink to="/" className={linkClass}>
              الرئيسية
            </NavLink>
            <NavLink to="/courses" className={linkClass}>
              الدورات
            </NavLink>
            <NavLink to="/about" className={linkClass}>
              عن المنصة
            </NavLink>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 rounded-md hover:bg-muted/50"
            >
              تسجيل الدخول
            </Link>
            <Link
              to="/register"
              className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/95 transition-colors shadow-sm"
            >
              إنشاء حساب
            </Link>
          </div>
        </div>
      </header>

      {/* Main outlet */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Structured Footer */}
      <footer className="border-t border-border/40 bg-muted/30 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 mb-8">
            <div className="space-y-3 text-right">
              <div className="flex items-center gap-2 font-bold text-lg">
                <GraduationCap className="h-6 w-6 text-primary" />
                <span>نظام إدارة التعلم</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                منصة تعليمية متطورة تهدف لتمكين المعلمين ومساعدة الطلاب على تحقيق التميز الدراسي.
              </p>
            </div>
            
            <div className="space-y-3 text-right">
              <h4 className="text-sm font-semibold text-foreground">روابط سريعة</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/courses" className="hover:text-primary transition-colors">تصفح الدورات</Link></li>
                <li><Link to="/about" className="hover:text-primary transition-colors">عن المنصة</Link></li>
                <li><Link to="/contact" className="hover:text-primary transition-colors">اتصل بنا</Link></li>
              </ul>
            </div>

            <div className="space-y-3 text-right">
              <h4 className="text-sm font-semibold text-foreground">الدعم الفني</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/faq" className="hover:text-primary transition-colors">الأسئلة الشائعة</Link></li>
                <li><Link to="/privacy" className="hover:text-primary transition-colors">سياسة الخصوصية</Link></li>
                <li><Link to="/terms" className="hover:text-primary transition-colors">شروط الاستخدام</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border/30 pt-6 text-center text-xs text-muted-foreground">
            © {new Date().getFullYear()} نظام إدارة التعلم. جميع الحقوق محفوظة.
          </div>
        </div>
      </footer>
    </div>
  );
}



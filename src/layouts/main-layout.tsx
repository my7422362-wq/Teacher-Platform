import { Outlet, NavLink, Link } from 'react-router-dom';
import { GraduationCap } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import { LanguageSwitcher } from '@/components/shared/language-switcher';

export function MainLayout() {
  const { t } = useTranslation();

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      'text-sm font-medium transition-colors relative py-1.5',
      isActive
        ? 'text-[#D4B59E] font-semibold after:absolute after:bottom-0 after:right-0 after:h-0.5 after:w-full after:bg-[#D4B59E] after:rounded-full'
        : 'text-[rgba(249,246,240,0.55)] hover:text-[#F9F6F0]'
    );

  return (
    <div className="flex min-h-screen flex-col bg-[#0F2520]">
      {/* Premium sticky header */}
      <header className="sticky top-0 z-40 w-full border-b border-[rgba(212,181,158,0.12)] bg-[#0F2520]/95 backdrop-blur-md shadow-card">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2 font-bold text-lg text-[#F9F6F0] hover:opacity-80 transition-opacity">
            <GraduationCap className="h-6 w-6 text-[#D4B59E]" />
            <span>{t('common.brand')}</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <NavLink to="/" className={linkClass}>
              {t('mainLayout.home')}
            </NavLink>
            <NavLink to="/courses" className={linkClass}>
              {t('mainLayout.courses')}
            </NavLink>
            <NavLink to="/about" className={linkClass}>
              {t('mainLayout.about')}
            </NavLink>
          </nav>

          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <Link
              to="/login"
              className="text-sm font-medium text-[rgba(249,246,240,0.55)] hover:text-[#F9F6F0] transition-colors px-4 py-2 rounded-xl hover:bg-[#16342D]"
            >
              {t('mainLayout.login')}
            </Link>
            <Link
              to="/register"
              className="rounded-xl bg-[#D4B59E] px-5 py-2.5 text-sm font-medium text-[#0F2520] hover:bg-[#C7A187] transition-colors shadow-sm"
            >
              {t('mainLayout.register')}
            </Link>
          </div>
        </div>
      </header>

      {/* Main outlet */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Premium Footer */}
      <footer className="border-t border-[rgba(212,181,158,0.12)] bg-[#0F2520] py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 mb-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2.5 font-bold text-lg text-[#F9F6F0]">
                <GraduationCap className="h-6 w-6 text-[#D4B59E]" />
                <span>{t('common.brand')}</span>
              </div>
              <p className="text-sm text-[rgba(249,246,240,0.55)] leading-relaxed max-w-xs">
                {t('mainLayout.footer.description')}
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-[#F9F6F0]">{t('mainLayout.footer.quickLinksTitle')}</h4>
              <ul className="space-y-3 text-sm text-[rgba(249,246,240,0.55)]">
                <li><Link to="/courses" className="hover:text-[#D4B59E] transition-colors">{t('mainLayout.footer.browseCourses')}</Link></li>
                <li><Link to="/about" className="hover:text-[#D4B59E] transition-colors">{t('mainLayout.footer.aboutPlatform')}</Link></li>
                <li><Link to="/contact" className="hover:text-[#D4B59E] transition-colors">{t('mainLayout.footer.contactUs')}</Link></li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-[#F9F6F0]">{t('mainLayout.footer.supportTitle')}</h4>
              <ul className="space-y-3 text-sm text-[rgba(249,246,240,0.55)]">
                <li><Link to="/faq" className="hover:text-[#D4B59E] transition-colors">{t('mainLayout.footer.faq')}</Link></li>
                <li><Link to="/privacy" className="hover:text-[#D4B59E] transition-colors">{t('mainLayout.footer.privacy')}</Link></li>
                <li><Link to="/terms" className="hover:text-[#D4B59E] transition-colors">{t('mainLayout.footer.terms')}</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-[rgba(212,181,158,0.12)] pt-8 text-center text-xs text-[rgba(249,246,240,0.45)]">
            © {new Date().getFullYear()} {t('common.brand')}. {t('mainLayout.footer.copyright')}
          </div>
        </div>
      </footer>
    </div>
  );
}


import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { LoginForm, AuthImagePanel } from '@/features/auth';
import { LanguageSwitcher } from '@/components/shared/language-switcher';

export function LoginPage() {
  const { t } = useTranslation();

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Left: Login form */}
      <div className="relative flex items-center justify-center px-6 py-12 sm:px-10 lg:px-16">
        <div className="absolute top-4 left-4">
          <LanguageSwitcher />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="w-full max-w-md space-y-8"
        >
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#D4B59E] text-[#0F2520] shadow-sm">
              <GraduationCap className="h-8 w-8" />
            </div>
            <h1 className="mt-2 text-2xl font-bold text-[#F9F6F0]">{t('auth.login.title')}</h1>
            <p className="text-sm text-[rgba(249,246,240,0.55)]">
              {t('auth.login.description')}
            </p>
          </div>

          <LoginForm />
        </motion.div>
      </div>

      {/* Right: Teacher image */}
      <div className="relative hidden lg:block">
        <AuthImagePanel />
      </div>
    </div>
  );
}


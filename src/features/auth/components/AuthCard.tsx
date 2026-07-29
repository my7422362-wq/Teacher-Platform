import { type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from '@/components/common/language-switcher';

interface AuthCardProps {
  title: string;
  description: string;
  children: ReactNode;
}

/**
 * Centered branded card used by Register and Forgot Password pages.
 * Mirrors the original AuthLayout presentation (unchanged visual language),
 * now scoped per-page so Login can use its own full-bleed split layout.
 */
export function AuthCard({ title, description, children }: AuthCardProps) {
  const { t } = useTranslation();

  return (
    <div
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0F2520] px-4 py-12"
     
    >
      <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full border border-[rgba(212,181,158,0.1)] opacity-50 pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 h-32 w-32 rounded-full border border-[rgba(212,181,158,0.08)] opacity-40 pointer-events-none" />

      <div className="absolute top-4 left-4 z-20">
        <LanguageSwitcher />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-md space-y-6"
      >
        <div className="text-center flex flex-col items-center gap-2">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#D4B59E] text-[#0F2520] shadow-sm">
            <GraduationCap className="h-8 w-8" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight mt-2 text-[#F9F6F0]">{t('common.brand')}</h1>
          <p className="text-sm text-[rgba(249,246,240,0.55)]">
            {t('auth.brandTagline')}
          </p>
        </div>

        <div className="rounded-2xl border border-[rgba(212,181,158,0.18)] bg-[#21483F] p-8 shadow-card">
          <div className="mb-6 text-center space-y-1">
            <h2 className="text-xl font-semibold text-[#F9F6F0]">{title}</h2>
            <p className="text-sm text-[rgba(249,246,240,0.65)]">{description}</p>
          </div>
          {children}
        </div>
      </motion.div>
    </div>
  );
}

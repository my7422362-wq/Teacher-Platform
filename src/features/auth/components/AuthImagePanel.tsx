import { motion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';

/**
 * Right-hand panel of the split-screen login page. Reuses the existing
 * hero image asset (`/hero.jpg`) already used on the home page hero.
 */
export function AuthImagePanel() {
  const { t } = useTranslation();

  return (
    <div className="relative h-full w-full overflow-hidden">
      <img src="/hero.jpg" alt={t('about.badgeSecondary')} className="h-full w-full object-cover" />

      <div className="absolute inset-0 bg-gradient-to-t from-[#0F2520] via-[#0F2520]/35 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-l from-[#0F2520]/70 via-transparent to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
        className="absolute top-10 inset-x-10 flex justify-end"
      >
        <div className="flex items-center gap-2 rounded-xl border border-[rgba(212,181,158,0.25)] bg-[#0F2520]/70 backdrop-blur px-4 py-2 text-xs font-medium text-[#D4B59E] shadow-lg">
          <ShieldCheck className="h-3.5 w-3.5" />
          {t('auth.imagePanel.badge')}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
        className="absolute bottom-12 inset-x-10 text-right space-y-2"
      >
        <p className="text-2xl font-bold text-[#F9F6F0]">{t('auth.imagePanel.title')}</p>
        <p className="text-sm text-[rgba(249,246,240,0.75)] leading-relaxed max-w-sm ms-auto">
          {t('auth.imagePanel.description')}
        </p>
      </motion.div>
    </div>
  );
}

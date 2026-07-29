import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { HERO_STATISTICS } from '@/features/home/data';

const statItem = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: 'easeOut' as const },
  },
};

export function HeroStats() {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut', delay: 0.4 }}
      className="mt-10 p-6 rounded-2xl bg-[rgba(255,255,255,0.04)] backdrop-blur-xl border border-[rgba(212,181,158,0.12)] shadow-lg hover:border-[rgba(212,181,158,0.2)] transition-all duration-300"
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {HERO_STATISTICS.map((stat, i) => (
          <motion.div
            key={stat.labelKey}
            custom={i}
            variants={statItem}
            className="text-center"
          >
            <div className="text-xl sm:text-2xl font-bold text-[#D4B59E]">
              {t(stat.valueKey)}
            </div>
            <div className="text-xs sm:text-sm text-[rgba(249,246,240,0.55)] mt-1">
              {t(stat.labelKey)}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}


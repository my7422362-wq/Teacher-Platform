import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Lightbulb, TrendingUp, ClipboardCheck, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AboutUsProps {
  className?: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};

const itemFadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};

const FEATURES: { icon: LucideIcon; key: string }[] = [
  { icon: Lightbulb, key: 'feature1' },
  { icon: TrendingUp, key: 'feature2' },
  { icon: ClipboardCheck, key: 'feature3' },
];

export function AboutUs({ className }: AboutUsProps) {
  const { t } = useTranslation();

  return (
    <section id="about-us" className={cn('relative overflow-hidden py-20 sm:py-24 lg:py-28', className)}>
      <div className="absolute inset-0 bg-[#0F2520] -z-20" />
      <div className="absolute top-1/3 -right-32 w-[500px] h-[500px] rounded-full bg-[#D4B59E]/20 blur-[120px] -z-10 animate-[orb-float_8s_ease-in-out_infinite]" />
      <div className="absolute bottom-1/3 -left-32 w-[400px] h-[400px] rounded-full bg-[#C7A187]/15 blur-[100px] -z-10 animate-[orb-float-2_10s_ease-in-out_infinite]" />

      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="max-w-3xl mx-auto text-center mb-14"
        >
          <motion.div
            variants={itemFadeUp}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-6"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#D4B59E]" />
            </span>
            <span className="text-sm font-medium text-[rgba(249,246,240,0.75)]">{t('aboutUs.badge')}</span>
          </motion.div>

          <motion.h2 variants={itemFadeUp} className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
            <span className="bg-gradient-to-r from-[#D4B59E] via-[#C7A187] to-[#D4B59E] bg-clip-text text-transparent bg-[length:200%_auto] animate-[gradient-shift_3s_ease_infinite]">
              {t('aboutUs.title')}
            </span>
          </motion.h2>

          <motion.p
            variants={itemFadeUp}
            className="mt-6 text-base sm:text-lg text-[rgba(249,246,240,0.55)] leading-relaxed"
          >
            {t('aboutUs.mission')}
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto"
        >
          {FEATURES.map(({ icon: Icon, key }) => (
            <motion.div
              key={key}
              variants={itemFadeUp}
              className="flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-6 py-8 text-center backdrop-blur-xl transition-colors hover:border-[#D4B59E]/30"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#D4B59E]/15 text-[#D4B59E]">
                <Icon className="h-6 w-6" />
              </div>
              <p className="text-sm text-[rgba(249,246,240,0.75)]">{t(`aboutUs.features.${key}`)}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0F2520] to-transparent -z-10" />
    </section>
  );
}

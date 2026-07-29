import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ABOUT_TEACHER_DATA } from './about.data';

const itemFadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' as const },
  },
};

export function SectionHeader() {
  const { t } = useTranslation();
  const { badgeKey, titleKey, descriptionKey } = ABOUT_TEACHER_DATA.section;
  const badge = t(badgeKey);
  const title = t(titleKey);
  const description = t(descriptionKey);

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      className="text-center max-w-3xl mx-auto mb-16"
    >
      {/* Badge */}
      <motion.div
        variants={itemFadeUp}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(212,181,158,0.1)] border border-[rgba(212,181,158,0.2)] backdrop-blur-sm mb-6"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4B59E] opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#D4B59E]" />
        </span>
        <span className="text-sm font-medium text-[rgba(249,246,240,0.8)]">{badge}</span>
      </motion.div>

      {/* Title */}
      <motion.h2
        variants={itemFadeUp}
        className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight"
      >
        <span className="text-[#D4B59E]">{title}</span>
      </motion.h2>

      {/* Description */}
      <motion.p
        variants={itemFadeUp}
        className="mt-6 text-base sm:text-lg text-[rgba(249,246,240,0.65)] leading-relaxed max-w-2xl mx-auto"
      >
        {description}
      </motion.p>
    </motion.div>
  );
}


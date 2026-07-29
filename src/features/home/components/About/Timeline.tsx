import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ABOUT_TEACHER_DATA } from './about.data';

const itemFadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const, delay },
  }),
};

export function Timeline() {
  const { t } = useTranslation();

  return (
    <div className="relative w-full py-10">
      {/* Animated connecting line */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 1.2, ease: 'easeInOut', delay: 0.3 }}
        className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-[rgba(212,181,158,0.15)] via-[#D4B59E]/50 to-[rgba(212,181,158,0.15)] origin-right"
        style={{ transformOrigin: 'right center' }}
      />

      {/* Timeline items */}
      <div className="relative grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4">
        {ABOUT_TEACHER_DATA.timeline.map((item, index) => (
          <motion.div
            key={item.year}
            custom={0.4 + index * 0.15}
            variants={itemFadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="relative flex flex-col items-center text-center"
          >
            {/* Circle dot on the line */}
            <div className="relative z-10 w-5 h-5 rounded-full bg-gradient-to-br from-[#D4B59E] to-[#C7A187] shadow-lg shadow-[rgba(212,181,158,0.3)] mb-4">
              <div className="absolute inset-0 rounded-full bg-[rgba(212,181,158,0.3)] animate-ping" />
            </div>

            {/* Year */}
            <span className="text-sm font-bold text-[#D4B59E] mb-1">
              {item.year}
            </span>

            {/* Label */}
            <span className="text-sm text-[rgba(249,246,240,0.55)] leading-relaxed max-w-[140px]">
              {t(item.labelKey)}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}


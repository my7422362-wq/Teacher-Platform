import { motion } from 'framer-motion';
import { Target } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { ABOUT_TEACHER_DATA } from './about.data';

const itemFadeRight = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: 'easeOut' as const },
  },
};

export function MissionCard() {
  const { t } = useTranslation();
  const title = t(ABOUT_TEACHER_DATA.mission.titleKey);
  const paragraph = t(ABOUT_TEACHER_DATA.mission.paragraphKey);

  return (
    <motion.div
      variants={itemFadeRight}
      className="relative group overflow-hidden rounded-3xl bg-[rgba(255,255,255,0.04)] backdrop-blur-xl border border-[rgba(212,181,158,0.12)] p-8 shadow-lg hover:border-[#D4B59E]/30 hover:bg-[rgba(255,255,255,0.06)] transition-all duration-500"
    >
      {/* Glow effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-[rgba(212,181,158,0)] via-[rgba(212,181,158,0.05)] to-[rgba(212,181,158,0)] opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-10" />

      {/* Top accent gradient line */}
      <div className="absolute top-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-[rgba(212,181,158,0.5)] to-transparent" />

      {/* Icon + Title */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-14 h-14 rounded-2xl bg-[rgba(212,181,158,0.12)] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          <Target className="w-7 h-7 text-[#D4B59E]" />
        </div>
        <h3 className="text-2xl font-bold text-[#F9F6F0]">{title}</h3>
      </div>

      {/* Paragraph */}
      <p className="text-base sm:text-lg text-[rgba(249,246,240,0.65)] leading-relaxed">
        {paragraph}
      </p>

      {/* Decorative bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(212,181,158,0.15)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.div>
  );
}


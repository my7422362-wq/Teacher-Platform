import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Play } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { HERO_CONTENT } from '@/features/home/data';

const itemFadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};

export function HeroContent() {
  const { t } = useTranslation();

  return (
    <div className="relative z-10 order-2 lg:order-1">
      {/* Badge */}
      <motion.div
        variants={itemFadeUp}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(212,181,158,0.1)] border border-[rgba(212,181,158,0.2)] backdrop-blur-sm mb-6"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4B59E] opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#D4B59E]" />
        </span>
        <span className="text-sm font-medium text-[rgba(249,246,240,0.8)]">
          {t(HERO_CONTENT.badge)}
        </span>
      </motion.div>

      {/* Heading */}
      <motion.h1
        variants={itemFadeUp}
        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
      >
        <span className="text-[#F9F6F0]">{t(HERO_CONTENT.titleLine1)}</span>
        <br />
        <span className="text-[#D4B59E]">
          {t(HERO_CONTENT.titleLine2)}
        </span>
      </motion.h1>

      {/* Description */}
      <motion.p
        variants={itemFadeUp}
        className="mt-6 text-base sm:text-lg text-[rgba(249,246,240,0.65)] leading-relaxed max-w-xl"
      >
        {t(HERO_CONTENT.description)}
      </motion.p>

      {/* CTA Buttons */}
      <motion.div
        variants={itemFadeUp}
        className="mt-8 flex flex-wrap items-center gap-4"
      >
        <Link to="/register">
          <button className="relative group overflow-hidden bg-[#D4B59E] hover:bg-[#C7A187] text-[#0F2520] border-0 rounded-xl px-8 py-3.5 text-base font-semibold shadow-lg shadow-[rgba(212,181,158,0.25)] hover:shadow-[rgba(212,181,158,0.35)] transition-all duration-300 cursor-pointer">
            <span className="relative z-10 flex items-center gap-2">
              {t(HERO_CONTENT.primaryCta)}
              <ArrowLeft className="h-4 w-4 group-hover:translate-x-[-4px] transition-transform" />
            </span>
            <div className="absolute inset-0 bg-white/20 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 rounded-xl" />
          </button>
        </Link>

        <Link to="/courses">
          <button className="bg-[rgba(255,255,255,0.04)] hover:bg-[rgba(255,255,255,0.08)] text-[#F9F6F0] border border-[rgba(212,181,158,0.2)] hover:border-[rgba(212,181,158,0.35)] rounded-xl px-8 py-3.5 text-base font-semibold backdrop-blur-sm transition-all duration-300 group cursor-pointer">
            <Play className="h-4 w-4 ml-1 inline group-hover:scale-110 transition-transform" />
            {t(HERO_CONTENT.secondaryCta)}
          </button>
        </Link>
      </motion.div>
    </div>
  );
}


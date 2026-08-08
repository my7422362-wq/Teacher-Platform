import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { HERO_FLOATING_CARDS } from '@/features/home/data';
import { FloatingCard } from './FloatingCard';

const itemFadeLeft = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};

export function HeroImage() {
  const [imageLoaded, setImageLoaded] = useState(false);
  const { t } = useTranslation();

  return (
    <div className="relative order-1 lg:order-2 flex items-center justify-center min-h-[400px] md:min-h-[500px] lg:min-h-[600px]">
      {/* Very subtle emerald gradient behind the container */}
      <div className="absolute w-[280px] h-[360px] md:w-[360px] md:h-[460px] lg:w-[420px] lg:h-[540px] rounded-[32px] bg-gradient-to-br from-[rgba(212,181,158,0.05)] via-[rgba(20,58,48,0.4)] to-transparent blur-3xl" />

      {/* Premium image container */}
      <motion.div
        variants={itemFadeLeft}
        whileHover={{ scale: 1.015 }}
        className="relative z-10 w-[280px] h-[360px] md:w-[360px] md:h-[460px] lg:w-[420px] lg:h-[540px] rounded-[24px] bg-[#12291F] border border-[rgba(212,181,158,0.4)] shadow-[0_30px_70px_-20px_rgba(0,0,0,0.6)] p-[5%] transition-transform duration-300"
      >
        <div className="relative w-full h-full rounded-[16px] overflow-hidden">
          <img
            src="/hero.jpg"
            alt={t('about.badgeSecondary')}
            loading="eager"
            fetchPriority="high"
            onLoad={() => setImageLoaded(true)}
            className={`w-full h-full object-cover transition-opacity duration-500 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
          {!imageLoaded && <div className="absolute inset-0 bg-white/5 animate-pulse" />}
        </div>
      </motion.div>

      {/* Floating Cards - remain above the image with higher z-index */}
      <FloatingCard
        icon={HERO_FLOATING_CARDS[0].icon}
        textKey={HERO_FLOATING_CARDS[0].textKey}
        position="top-[5%] left-[5%] md:left-[10%] lg:left-[5%]"
        delay={0.5}
      />

      <FloatingCard
        icon={HERO_FLOATING_CARDS[1].icon}
        textKey={HERO_FLOATING_CARDS[1].textKey}
        position="top-[40%] right-[2%] sm:right-[0%] lg:-right-[5%]"
        delay={0.65}
      />

      <FloatingCard
        icon={HERO_FLOATING_CARDS[2].icon}
        textKey={HERO_FLOATING_CARDS[2].textKey}
        position="bottom-[10%] left-[10%] md:left-[15%] lg:left-[10%]"
        delay={0.8}
      />
    </div>
  );
}

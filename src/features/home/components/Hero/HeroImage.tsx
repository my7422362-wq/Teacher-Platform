import { useState } from 'react';
import { motion } from 'framer-motion';
import { HERO_FLOATING_CARDS } from '@/features/home/data';
import { FloatingCard } from './FloatingCard';

const itemFadeLeft = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};

export function HeroImage() {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="relative order-1 lg:order-2 flex items-center justify-center min-h-[400px] md:min-h-[500px] lg:min-h-[600px]">
      {/* Large glowing blue/purple circular background behind the image */}
      <div className="absolute w-[360px] h-[360px] md:w-[460px] md:h-[460px] lg:w-[560px] lg:h-[560px] rounded-full bg-gradient-to-br from-blue-500/40 via-purple-500/30 to-blue-600/20 blur-[4px] animate-[glow-pulse_4s_ease-in-out_infinite]" />

      {/* Secondary larger glow ring */}
      <div className="absolute w-[320px] h-[320px] md:w-[410px] md:h-[410px] lg:w-[500px] lg:h-[500px] rounded-full border border-blue-400/25 shadow-[0_0_60px_rgba(59,130,246,0.15)] animate-[float_6s_ease-in-out_infinite]" />

      {/* Tertiary ring - reverse direction */}
      <div className="absolute w-[280px] h-[280px] md:w-[360px] md:h-[360px] lg:w-[440px] lg:h-[440px] rounded-full border border-purple-400/15 shadow-[0_0_40px_rgba(168,85,247,0.1)] animate-[float_8s_ease-in-out_infinite_reverse]" />

      {/* Soft blur overlay effect */}
      <div className="absolute w-[400px] h-[400px] md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px] rounded-full bg-blue-500/5 blur-[60px]" />

      {/* Teacher image */}
      <motion.div
        variants={itemFadeLeft}
        whileHover={{ scale: 1.03 }}
        className="relative z-10 w-[220px] h-[220px] md:w-[280px] md:h-[280px] lg:w-[340px] lg:h-[340px] rounded-2xl overflow-hidden border-2 border-white/10 shadow-2xl shadow-blue-500/20 hover:shadow-blue-500/40 hover:border-white/20 transition-shadow duration-300 animate-[float-slow_6s_ease-in-out_infinite]"
      >
        <img
          src="/hero.jpg"
          alt="المعلم - Teacher"
          loading="eager"
          fetchPriority="high"
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full object-contain transition-opacity duration-500 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
        {/* Loading shimmer */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/40 to-purple-600/40 animate-pulse" />
        )}
        {/* Image overlay gradient for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />

        {/* Decorative dots */}
        <div className="absolute -top-2 -left-2 w-4 h-4 rounded-full bg-blue-400/60" />
        <div className="absolute -bottom-2 -right-2 w-4 h-4 rounded-full bg-purple-400/60" />
        <div className="absolute top-1/2 -right-3 w-3 h-3 rounded-full bg-blue-300/40" />
        <div className="absolute top-1/3 -left-3 w-3 h-3 rounded-full bg-purple-300/40" />
      </motion.div>

      {/* Floating Cards - remain above the image with higher z-index */}
      <FloatingCard
        icon={HERO_FLOATING_CARDS[0].icon}
        text={HERO_FLOATING_CARDS[0].text}
        position="top-[5%] left-[5%] md:left-[10%] lg:left-[5%]"
        delay={0.5}
      />

      <FloatingCard
        icon={HERO_FLOATING_CARDS[1].icon}
        text={HERO_FLOATING_CARDS[1].text}
        position="top-[40%] -right-[5%] md:right-[0%] lg:-right-[5%]"
        delay={0.65}
      />

      <FloatingCard
        icon={HERO_FLOATING_CARDS[2].icon}
        text={HERO_FLOATING_CARDS[2].text}
        position="bottom-[10%] left-[10%] md:left-[15%] lg:left-[10%]"
        delay={0.8}
      />
    </div>
  );
}


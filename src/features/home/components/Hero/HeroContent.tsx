import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Play } from 'lucide-react';
import { HERO_CONTENT } from '@/features/home/data';

const itemFadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};

export function HeroContent() {
  return (
    <div className="relative z-10 order-2 lg:order-1">
      {/* Badge */}
      <motion.div
        variants={itemFadeUp}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-6"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500" />
        </span>
        <span className="text-sm font-medium text-gray-300">
          {HERO_CONTENT.badge}
        </span>
      </motion.div>

      {/* Heading */}
      <motion.h1
        variants={itemFadeUp}
        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
      >
        <span className="text-white">{HERO_CONTENT.titleLine1}</span>
        <br />
        <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-purple-500 bg-clip-text text-transparent bg-[length:200%_auto] animate-[gradient-shift_3s_ease_infinite]">
          {HERO_CONTENT.titleLine2}
        </span>
      </motion.h1>

      {/* Description */}
      <motion.p
        variants={itemFadeUp}
        className="mt-6 text-base sm:text-lg text-gray-400 leading-relaxed max-w-xl"
      >
        {HERO_CONTENT.description}
      </motion.p>

      {/* CTA Buttons */}
      <motion.div
        variants={itemFadeUp}
        className="mt-8 flex flex-wrap items-center gap-4"
      >
        <Link to="/register">
          <button className="relative group overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white border-0 rounded-xl px-8 py-3.5 text-base font-semibold shadow-lg shadow-blue-600/25 hover:shadow-blue-500/40 transition-all duration-300 cursor-pointer">
            <span className="relative z-10 flex items-center gap-2">
              {HERO_CONTENT.primaryCta}
              <ArrowLeft className="h-4 w-4 group-hover:translate-x-[-4px] transition-transform" />
            </span>
            <div className="absolute inset-0 bg-white/10 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 rounded-xl" />
          </button>
        </Link>

        <Link to="/courses">
          <button className="bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20 rounded-xl px-8 py-3.5 text-base font-semibold backdrop-blur-sm transition-all duration-300 group cursor-pointer">
            <Play className="h-4 w-4 ml-1 inline group-hover:scale-110 transition-transform" />
            {HERO_CONTENT.secondaryCta}
          </button>
        </Link>
      </motion.div>
    </div>
  );
}


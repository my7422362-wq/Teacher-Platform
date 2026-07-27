import { motion } from 'framer-motion';
import { Target } from 'lucide-react';
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
  const { title, paragraph } = ABOUT_TEACHER_DATA.mission;

  return (
    <motion.div
      variants={itemFadeRight}
      className="relative group overflow-hidden rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 shadow-lg hover:border-blue-500/30 hover:bg-white/[0.07] transition-all duration-500"
    >
      {/* Glow effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/0 via-blue-600/5 to-purple-600/0 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-10" />

      {/* Top accent gradient line */}
      <div className="absolute top-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />

      {/* Icon + Title */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          <Target className="w-7 h-7 text-blue-400" />
        </div>
        <h3 className="text-2xl font-bold text-white">{title}</h3>
      </div>

      {/* Paragraph */}
      <p className="text-base sm:text-lg text-gray-400 leading-relaxed">
        {paragraph}
      </p>

      {/* Decorative bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.div>
  );
}


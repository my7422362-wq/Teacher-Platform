import { motion } from 'framer-motion';
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
  const { badge, title, description } = ABOUT_TEACHER_DATA.section;

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
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-6"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500" />
        </span>
        <span className="text-sm font-medium text-gray-300">{badge}</span>
      </motion.div>

      {/* Title */}
      <motion.h2
        variants={itemFadeUp}
        className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight"
      >
        <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-purple-500 bg-clip-text text-transparent bg-[length:200%_auto] animate-[gradient-shift_3s_ease_infinite]">
          {title}
        </span>
      </motion.h2>

      {/* Description */}
      <motion.p
        variants={itemFadeUp}
        className="mt-6 text-base sm:text-lg text-gray-400 leading-relaxed max-w-2xl mx-auto"
      >
        {description}
      </motion.p>
    </motion.div>
  );
}


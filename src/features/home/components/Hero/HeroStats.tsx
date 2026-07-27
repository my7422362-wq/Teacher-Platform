import { motion } from 'framer-motion';
import { HERO_STATISTICS } from '@/features/home/data';

const statItem = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: 'easeOut' as const },
  },
};

export function HeroStats() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut', delay: 0.4 }}
      className="mt-10 p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-lg hover:border-white/20 transition-all duration-300"
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {HERO_STATISTICS.map((stat, i) => (
          <motion.div
            key={stat.label}
            custom={i}
            variants={statItem}
            className="text-center"
          >
            <div className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              {stat.value}
            </div>
            <div className="text-xs sm:text-sm text-gray-500 mt-1">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}


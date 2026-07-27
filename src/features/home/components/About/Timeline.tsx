import { motion } from 'framer-motion';
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
  return (
    <div className="relative w-full py-10">
      {/* Animated connecting line */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 1.2, ease: 'easeInOut', delay: 0.3 }}
        className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500/20 via-blue-500/50 to-purple-500/20 origin-right"
        style={{ transformOrigin: 'right center' }}
      />

      {/* Timeline items */}
      <div className="relative grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4">
        {ABOUT_TEACHER_DATA.timeline.map((item, index) => (
          <motion.div
            key={item.label}
            custom={0.4 + index * 0.15}
            variants={itemFadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="relative flex flex-col items-center text-center"
          >
            {/* Circle dot on the line */}
            <div className="relative z-10 w-5 h-5 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg shadow-blue-500/30 mb-4">
              <div className="absolute inset-0 rounded-full bg-blue-400/30 animate-ping" />
            </div>

            {/* Year */}
            <span className="text-sm font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-1">
              {item.year}
            </span>

            {/* Label */}
            <span className="text-sm text-gray-400 leading-relaxed max-w-[140px]">
              {item.label}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}


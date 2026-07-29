import { motion } from 'framer-motion';
import { GraduationCap, Sparkles, Star, BookOpen } from 'lucide-react';

const itemFadeLeft = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

const floatingVariants = {
  animate: (delay: number) => ({
    y: [0, -12, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: 'easeInOut',
      delay,
    },
  }),
};

export function TeacherImage() {
  return (
    <div className="relative flex items-center justify-center min-h-[400px] md:min-h-[500px]">
      {/* Main glowing circle behind image */}
      <div className="absolute w-[300px] h-[300px] md:w-[380px] md:h-[380px] lg:w-[440px] lg:h-[440px] rounded-full bg-gradient-to-br from-[#D4B59E]/30 via-purple-500/20 to-blue-600/10 blur-[2px] animate-[glow-pulse_4s_ease-in-out_infinite]" />

      {/* Secondary glow ring */}
      <div className="absolute w-[260px] h-[260px] md:w-[330px] md:h-[330px] lg:w-[390px] lg:h-[390px] rounded-full border border-blue-400/20 animate-[float_6s_ease-in-out_infinite]" />

      {/* Tertiary ring */}
      <div className="absolute w-[220px] h-[220px] md:w-[280px] md:h-[280px] lg:w-[340px] lg:h-[340px] rounded-full border border-purple-400/10 animate-[float_8s_ease-in-out_infinite_reverse]" />

      {/* Decorative floating elements */}
      <motion.div
        custom={0}
        variants={floatingVariants}
        animate="animate"
        className="absolute top-[12%] right-[12%] md:right-[18%] lg:right-[15%]"
      >
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D4B59E]/20 to-[#D4B59E]/20 backdrop-blur-sm border border-white/10 flex items-center justify-center">
          <Sparkles className="w-4 h-4 text-[#D4B59E]" />
        </div>
      </motion.div>

      <motion.div
        custom={1.5}
        variants={floatingVariants}
        animate="animate"
        className="absolute bottom-[18%] left-[10%] md:left-[15%] lg:left-[12%]"
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 backdrop-blur-sm border border-white/10 flex items-center justify-center">
          <Star className="w-3.5 h-3.5 text-[#D4B59E]" />
        </div>
      </motion.div>

      <motion.div
        custom={3}
        variants={floatingVariants}
        animate="animate"
        className="absolute top-[30%] left-[8%] md:left-[12%] lg:left-[8%]"
      >
        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#D4B59E]/20 to-cyan-500/20 backdrop-blur-sm border border-white/10 flex items-center justify-center">
          <BookOpen className="w-3 h-3 text-[#D4B59E]" />
        </div>
      </motion.div>

      {/* Main teacher image placeholder */}
      <motion.div
        variants={itemFadeLeft}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="relative z-10 w-[200px] h-[200px] md:w-[260px] md:h-[260px] lg:w-[320px] lg:h-[320px] rounded-full overflow-hidden border-2 border-white/10 shadow-2xl shadow-blue-500/20"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#D4B59E]/40 to-[#C7A187]/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <GraduationCap className="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 text-white/80" />
        </div>

        {/* Decorative dots */}
        <div className="absolute -top-2 -left-2 w-4 h-4 rounded-full bg-blue-400/60" />
        <div className="absolute -bottom-2 -right-2 w-4 h-4 rounded-full bg-purple-400/60" />
        <div className="absolute top-1/2 -right-3 w-3 h-3 rounded-full bg-blue-300/40" />
        <div className="absolute top-1/3 -left-3 w-3 h-3 rounded-full bg-purple-300/40" />
      </motion.div>
    </div>
  );
}


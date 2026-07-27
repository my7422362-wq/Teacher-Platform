import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ExperienceCardProps {
  value: string;
  label: string;
  delay?: number;
  className?: string;
}

const itemFadeUp = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: 'easeOut' as const, delay },
  }),
};

export function ExperienceCard({
  value,
  label,
  delay = 0,
  className,
}: ExperienceCardProps) {
  return (
    <motion.div
      custom={delay}
      variants={itemFadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      className={cn(
        'relative group overflow-hidden rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 text-center',
        'hover:border-blue-500/30 hover:bg-white/[0.07] transition-all duration-300',
        'shadow-lg shadow-blue-500/5',
        className
      )}
    >
      {/* Hover glow effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/0 via-blue-600/5 to-purple-600/0 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-10" />

      {/* Gradient border line on top */}
      <div className="absolute top-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />

      {/* Animated gradient icon background */}
      <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500/30 to-purple-500/30 animate-[glow-pulse_3s_ease-in-out_infinite]" />
      </div>

      {/* Value */}
      <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-400 via-blue-500 to-purple-500 bg-clip-text text-transparent bg-[length:200%_auto] animate-[gradient-shift_3s_ease_infinite]">
        {value}
      </div>

      {/* Label */}
      <div className="text-sm text-gray-400 mt-2 font-medium">{label}</div>
    </motion.div>
  );
}


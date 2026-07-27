import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FeatureCardProps {
  text: string;
  index: number;
  className?: string;
}

const itemFadeUp = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: 'easeOut' as const, delay },
  }),
};

export function FeatureCard({ text, index, className }: FeatureCardProps) {
  return (
    <motion.div
      custom={0.3 + index * 0.1}
      variants={itemFadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      className={cn(
        'relative group overflow-hidden rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-5 flex items-center gap-4 shadow-lg',
        'hover:border-blue-500/30 hover:bg-white/[0.07] transition-all duration-300',
        className
      )}
    >
      {/* Hover glow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/0 via-blue-600/5 to-purple-600/0 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-10" />

      {/* Check icon */}
      <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
        <CheckCircle className="w-5 h-5 text-green-400" />
      </div>

      {/* Text */}
      <span className="text-base font-medium text-gray-200">{text}</span>
    </motion.div>
  );
}


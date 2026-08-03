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
        'relative group overflow-hidden rounded-2xl bg-[rgba(255,255,255,0.04)] backdrop-blur-xl border border-[rgba(212,181,158,0.12)] p-5 flex items-center gap-4 shadow-lg',
        'hover:border-[#D4B59E]/30 hover:bg-[rgba(255,255,255,0.06)] transition-all duration-300',
        className
      )}
    >
      {/* Hover glow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-[rgba(212,181,158,0)] via-[rgba(212,181,158,0.05)] to-[rgba(212,181,158,0)] opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-10" />

      {/* Check icon */}
      <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[rgba(109,166,122,0.15)] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
        <CheckCircle className="w-5 h-5 text-[#6DA67A]" />
      </div>

      {/* Text */}
      <span className="text-base font-medium text-[rgba(249,246,240,0.85)]">{text}</span>
    </motion.div>
  );
}


/**
 * StatisticCard - Premium glassmorphism statistics card
 *
 * Reusable card component with hover effects, icon, animated counter,
 * and staggered fade-up animation.
 */

import { type LucideIcon } from 'lucide-react';
import { motion, type Variants } from 'framer-motion';
import { cn } from '@/lib/utils';
import { AnimatedCounter } from './AnimatedCounter';

interface StatisticCardProps {
  icon: LucideIcon;
  value: number;
  suffix: string;
  title: string;
  description: string;
  index: number;
  className?: string;
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      delay: index * 0.15,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  }),
};

export function StatisticCard({
  icon: Icon,
  value,
  suffix,
  title,
  description,
  index,
  className,
}: StatisticCardProps) {
  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      whileHover={{ y: -8, scale: 1.03 }}
      className={cn(
        'relative group overflow-hidden rounded-3xl p-8 text-center',
        'bg-white/[0.04] backdrop-blur-xl border border-white/10',
        'hover:bg-white/[0.07] hover:border-purple-500/30',
        'shadow-lg shadow-black/20 hover:shadow-purple-500/10',
        'transition-all duration-500 ease-out',
        className
      )}
    >
      {/* Hover glow effect */}
      <div className="absolute -inset-[1px] bg-gradient-to-br from-purple-600/0 via-blue-600/0 to-[#C7A187]/0 opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-700 -z-10 rounded-3xl" />

      {/* Top gradient line */}
      <div className="absolute top-0 left-[15%] right-[15%] h-px bg-gradient-to-r from-transparent via-[#C7A187]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Icon container */}
      <div className="relative mx-auto mb-5 flex h-16 w-16 items-center justify-center">
        {/* Glow ring */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#D4B59E]/20 to-[#D4B59E]/20 blur-md group-hover:blur-xl transition-all duration-500" />
        {/* Inner circle */}
        <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#D4B59E]/10 to-[#D4B59E]/10 border border-white/10 group-hover:border-purple-400/30 group-hover:scale-110 transition-all duration-500">
          <Icon className="h-6 w-6 text-[#D4B59E] group-hover:text-[#D4B59E] transition-colors duration-500" />
        </div>
      </div>

      {/* Animated counter */}
      <div className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white via-blue-200 to-white bg-clip-text text-transparent">
        <AnimatedCounter target={value} suffix={suffix} duration={2} />
      </div>

      {/* Title */}
      <h3 className="mt-3 text-lg font-semibold text-white">
        {title}
      </h3>

      {/* Description */}
      <p className="mt-2 text-sm text-[rgba(249,246,240,0.55)] leading-relaxed">
        {description}
      </p>

      {/* Bottom accent glow */}
      <div className="absolute bottom-0 left-[20%] right-[20%] h-px bg-gradient-to-r from-transparent via-[#C7A187]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.div>
  );
}


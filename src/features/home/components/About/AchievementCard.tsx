import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import {
  GraduationCap,
  Users,
  Star,
  BookOpen,
  Headphones,
  RefreshCw,
  type LucideIcon,
} from 'lucide-react';

interface AchievementCardProps {
  value: string;
  label: string;
  iconName: string;
  delay?: number;
  className?: string;
}

// Map string icon names to Lucide components
function getIcon(iconName: string): LucideIcon {
  const iconMap: Record<string, LucideIcon> = {
    GraduationCap,
    Users,
    Star,
    BookOpen,
    Headphones,
    RefreshCw,
  };
  return iconMap[iconName] || Star;
}

const itemFadeUp = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: 'easeOut' as const, delay },
  }),
};

export function AchievementCard({
  value,
  label,
  iconName,
  delay = 0,
  className,
}: AchievementCardProps) {
  const Icon = getIcon(iconName);

  return (
    <motion.div
      custom={delay}
      variants={itemFadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      className={cn(
        'relative group overflow-hidden rounded-3xl bg-[rgba(255,255,255,0.04)] backdrop-blur-xl border border-[rgba(212,181,158,0.12)] p-5 text-center',
        'hover:border-[#D4B59E]/30 hover:bg-[rgba(255,255,255,0.06)] transition-all duration-300',
        'shadow-lg hover:shadow-luxury',
        'hover:-translate-y-1',
        className
      )}
    >
      {/* Hover glow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-[rgba(212,181,158,0)] via-[rgba(212,181,158,0.05)] to-[rgba(212,181,158,0)] opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-10" />

      {/* Top accent line */}
      <div className="absolute top-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-[rgba(212,181,158,0.5)] to-transparent" />

      {/* Icon */}
      <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 rounded-2xl bg-[rgba(212,181,158,0.12)] group-hover:scale-110 transition-transform duration-300">
        <Icon className="w-5 h-5 text-[#D4B59E]" />
      </div>

      {/* Value */}
      <div className="text-2xl sm:text-3xl font-bold text-[#D4B59E]">
        {value}
      </div>

      {/* Label */}
      <div className="text-xs sm:text-sm text-[rgba(249,246,240,0.55)] mt-1">{label}</div>
    </motion.div>
  );
}


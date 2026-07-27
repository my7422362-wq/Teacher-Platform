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
        'relative group overflow-hidden rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-5 text-center',
        'hover:border-purple-500/30 hover:bg-white/[0.07] transition-all duration-300',
        'shadow-lg shadow-purple-500/5 hover:shadow-purple-500/10',
        'hover:-translate-y-1',
        className
      )}
    >
      {/* Hover glow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/0 via-purple-600/5 to-blue-600/0 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-10" />

      {/* Top accent line */}
      <div className="absolute top-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />

      {/* Icon */}
      <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 rounded-2xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 group-hover:scale-110 transition-transform duration-300">
        <Icon className="w-5 h-5 text-purple-400" />
      </div>

      {/* Value */}
      <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
        {value}
      </div>

      {/* Label */}
      <div className="text-xs sm:text-sm text-gray-400 mt-1">{label}</div>
    </motion.div>
  );
}


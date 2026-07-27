import { motion } from 'framer-motion';
import { Lightbulb, TrendingUp, Award } from 'lucide-react';

interface FloatingCardProps {
  icon: string;
  text: string;
  position: string;
  delay: number;
}

function getCardIcon(iconName: string) {
  switch (iconName) {
    case 'Lightbulb':
      return <Lightbulb className="h-4 w-4 text-yellow-400" />;
    case 'TrendingUp':
      return <TrendingUp className="h-4 w-4 text-green-400" />;
    case 'Award':
      return <Award className="h-4 w-4 text-purple-400" />;
    default:
      return <Lightbulb className="h-4 w-4 text-blue-400" />;
  }
}

function getCardBg(iconName: string) {
  switch (iconName) {
    case 'Lightbulb':
      return 'bg-yellow-500/20';
    case 'TrendingUp':
      return 'bg-green-500/20';
    case 'Award':
      return 'bg-purple-500/20';
    default:
      return 'bg-blue-500/20';
  }
}

export function FloatingCard({ icon, text, position, delay }: FloatingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut', delay }}
      className={`absolute ${position} flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-white/10 backdrop-blur-xl border border-white/10 shadow-lg hover:bg-white/15 transition-all duration-300`}
    >
      <div className={`flex items-center justify-center w-8 h-8 rounded-lg ${getCardBg(icon)}`}>
        {getCardIcon(icon)}
      </div>
      <span className="text-xs sm:text-sm font-medium text-gray-200 whitespace-nowrap">
        {text}
      </span>
    </motion.div>
  );
}


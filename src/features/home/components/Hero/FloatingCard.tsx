import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Lightbulb, TrendingUp, Award } from 'lucide-react';

interface FloatingCardProps {
  icon: string;
  textKey: string;
  position: string;
  delay: number;
}

function getCardIcon(iconName: string) {
  switch (iconName) {
    case 'Lightbulb':
      return <Lightbulb className="h-3.5 w-3.5 text-[#D4B59E]" />;
    case 'TrendingUp':
      return <TrendingUp className="h-3.5 w-3.5 text-[#D4B59E]" />;
    case 'Award':
      return <Award className="h-3.5 w-3.5 text-[#D4B59E]" />;
    default:
      return <Lightbulb className="h-3.5 w-3.5 text-[#D4B59E]" />;
  }
}

export function FloatingCard({ icon, textKey, position, delay }: FloatingCardProps) {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, x: 40, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut', delay }}
      className={`absolute ${position} z-20 flex items-center gap-2 px-3 py-2 rounded-lg bg-[#0F2520] border border-[rgba(212,181,158,0.2)] shadow-[0_10px_25px_-8px_rgba(0,0,0,0.4)] animate-float-card`}
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="flex items-center justify-center w-6 h-6 rounded-md bg-[rgba(212,181,158,0.12)] shrink-0">
        {getCardIcon(icon)}
      </div>
      <span className="text-[11px] sm:text-xs font-medium text-[#F9F6F0]/85 whitespace-nowrap">
        {t(textKey)}
      </span>
    </motion.div>
  );
}

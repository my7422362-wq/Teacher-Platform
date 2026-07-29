import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import { NAV_LINKS } from '@/features/home/data';

interface NavLinksProps {
  activeSection: string;
  onLinkClick?: (href: string) => void;
}

const navItemVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.1 + i * 0.05, duration: 0.4, ease: 'easeOut' as const },
  }),
};

export function NavLinks({ activeSection, onLinkClick }: NavLinksProps) {
  const { t } = useTranslation();

  return (
    <ul className="hidden md:flex items-center gap-1">
      {NAV_LINKS.map((link, i) => (
        <motion.li
          key={link.href}
          custom={i}
          variants={navItemVariants}
          initial="hidden"
          animate="visible"
        >
          <a
            href={link.href}
            onClick={() => onLinkClick?.(link.href)}
            className={cn(
              'relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200',
              activeSection === link.href
                ? 'text-[#D4B59E] font-semibold'
                : 'text-[rgba(249,246,240,0.55)] hover:text-[#F9F6F0] hover:bg-[#16342D]'
            )}
          >
            {t(link.labelKey)}
            {activeSection === link.href && (
              <motion.span
                layoutId="activeNav"
                className="absolute -bottom-1 left-2 right-2 h-0.5 bg-[#D4B59E] rounded-full"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}
          </a>
        </motion.li>
      ))}
    </ul>
  );
}


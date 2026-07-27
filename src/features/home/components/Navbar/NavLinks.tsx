import { motion } from 'framer-motion';
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
                ? 'text-blue-400'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            )}
          >
            {link.label}
            {activeSection === link.href && (
              <motion.span
                layoutId="activeNav"
                className="absolute inset-0 bg-blue-500/10 rounded-lg border border-blue-500/30"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}
            {activeSection === link.href && (
              <motion.span
                layoutId="activeUnderline"
                className="absolute -bottom-0.5 left-2 right-2 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}
          </a>
        </motion.li>
      ))}
    </ul>
  );
}


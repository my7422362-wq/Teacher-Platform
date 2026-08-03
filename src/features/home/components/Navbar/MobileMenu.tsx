import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, X, LogIn, UserPlus } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import { NAV_LINKS } from '@/features/home/data';
import { LanguageDropdown } from './LanguageDropdown';

interface MobileMenuProps {
  isOpen: boolean;
  activeSection: string;
  onClose: () => void;
  onNavClick: (href: string) => void;
}

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const drawerVariants = {
  hidden: { x: '100%', opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { type: 'spring' as const, damping: 25, stiffness: 200 },
  },
  exit: {
    x: '100%',
    opacity: 0,
    transition: { duration: 0.2, ease: 'easeIn' as const },
  },
};

export function MobileMenu({ isOpen, activeSection, onClose, onNavClick }: MobileMenuProps) {
  const { t } = useTranslation();

  return (
    <>
      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 bg-black/60 z-40 md:hidden"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed top-0 left-0 bottom-0 w-[280px] z-50 md:hidden bg-[#0F2520] border-l border-[rgba(212,181,158,0.12)] shadow-elevated"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-[rgba(212,181,158,0.12)]">
              <Link
                to="/"
                className="flex items-center gap-2.5"
                onClick={onClose}
              >
                <GraduationCap className="h-6 w-6 text-[#D4B59E]" />
                <span className="font-bold text-[#F9F6F0]">{t('common.brand')}</span>
              </Link>
              <button
                type="button"
                className="h-8 w-8 rounded-lg text-[rgba(249,246,240,0.55)] hover:text-[#F9F6F0] hover:bg-[#16342D] transition-all flex items-center justify-center cursor-pointer"
                onClick={onClose}
                aria-label={t('nav.closeMenu')}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Navigation links */}
            <div className="p-4 space-y-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => {
                    onNavClick(link.href);
                    onClose();
                  }}
                  className={cn(
                    'block px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200',
                    activeSection === link.href
                      ? 'text-[#0F2520] bg-[#D4B59E] font-semibold'
                      : 'text-[rgba(249,246,240,0.55)] hover:text-[#F9F6F0] hover:bg-[#16342D]'
                  )}
                >
                  {t(link.labelKey)}
                </a>
              ))}
              <div className="pt-1">
                <LanguageDropdown />
              </div>
            </div>

            {/* Auth buttons */}
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[rgba(212,181,158,0.12)] space-y-3 bg-[#0F2520]">
              <Link
                to="/login"
                onClick={onClose}
                className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl text-sm font-medium text-[rgba(249,246,240,0.55)] hover:text-[#F9F6F0] hover:bg-[#16342D] transition-all border border-[rgba(212,181,158,0.18)]"
              >
                <LogIn className="h-4 w-4" />
                {t('nav.login')}
              </Link>
              <Link
                to="/register"
                onClick={onClose}
                className="block w-full"
              >
                <button className="w-full bg-[#D4B59E] hover:bg-[#C7A187] text-[#0F2520] rounded-xl py-3 text-sm font-medium shadow-sm cursor-pointer">
                  <UserPlus className="h-4 w-4 ml-1 inline" />
                  {t('nav.register')}
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}


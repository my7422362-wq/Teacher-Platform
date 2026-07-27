import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, X, LogIn, UserPlus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { NAV_LINKS } from '@/features/home/data';

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
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
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
            className="fixed top-0 left-0 bottom-0 w-[280px] z-50 md:hidden bg-[#050816] border-l border-white/10 shadow-2xl"
            dir="rtl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <Link
                to="/"
                className="flex items-center gap-2.5"
                onClick={onClose}
              >
                <GraduationCap className="h-6 w-6 text-blue-400" />
                <span className="font-bold text-white">منصة التعلم</span>
              </Link>
              <button
                type="button"
                className="h-8 w-8 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all flex items-center justify-center cursor-pointer"
                onClick={onClose}
                aria-label="إغلاق القائمة"
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
                      ? 'text-blue-400 bg-blue-500/10 border border-blue-500/20'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  )}
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Auth buttons */}
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10 space-y-3">
              <Link
                to="/login"
                onClick={onClose}
                className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-all border border-white/10"
              >
                <LogIn className="h-4 w-4" />
                تسجيل الدخول
              </Link>
              <Link
                to="/register"
                onClick={onClose}
                className="block w-full"
              >
                <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white border-0 rounded-xl py-3 text-sm font-medium shadow-lg shadow-blue-600/20 cursor-pointer">
                  <UserPlus className="h-4 w-4 ml-1 inline" />
                  إنشاء حساب
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}


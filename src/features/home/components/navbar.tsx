/**
 * Navbar - Premium dark glassmorphism navigation bar
 *
 * RTL Arabic navbar with logo, nav links, auth buttons, theme toggle,
 * and responsive mobile side drawer. Uses Framer Motion for animations.
 */

import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, Menu, X, Sun, Moon, LogIn, UserPlus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { NAV_LINKS } from '@/features/home/data';
import { useTheme } from '@/app/providers/theme-provider';
import { useMediaQuery } from '@/hooks/use-media-query';

interface NavbarProps {
  className?: string;
}

const navItemVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.1 + i * 0.05, duration: 0.4, ease: 'easeOut' as const },
  }),
};

const mobileDrawerVariants = {
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

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

export function Navbar({ className }: NavbarProps) {
  const [isMobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('#hero');
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Detect active section
      const sections = NAV_LINKS.map((link) => link.href.replace('#', ''));
      for (const section of sections.reverse()) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(`#${section}`);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileOpen]);

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 px-4 pt-4',
        className
      )}
      dir="rtl"
    >
      <div
        className={cn(
          'mx-auto max-w-7xl rounded-2xl transition-all duration-300',
          scrolled
            ? 'bg-[#050816]/80 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)]'
            : 'bg-[#050816]/40 backdrop-blur-lg border border-white/5'
        )}
      >
        <div className="flex h-16 items-center justify-between px-6">
          {/* Right: Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5 group"
          >
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg opacity-40 group-hover:opacity-70 blur-sm transition-opacity duration-300" />
              <GraduationCap className="relative h-7 w-7 text-blue-400 group-hover:text-blue-300 transition-colors" />
            </div>
            <span className="font-bold text-lg text-white">
              منصة التعلم
            </span>
          </Link>

          {/* Center: Desktop nav links */}
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
                </a>
              </motion.li>
            ))}
          </ul>

          {/* Left: Desktop auth + theme toggle */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/login"
              className="flex items-center gap-1.5 text-sm font-medium text-gray-400 hover:text-white transition-colors px-3 py-1.5 rounded-lg hover:bg-white/5"
            >
              <LogIn className="h-4 w-4" />
              تسجيل الدخول
            </Link>

            <Link to="/register">
              <Button
                className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white border-0 rounded-xl px-5 shadow-lg shadow-blue-600/20 hover:shadow-blue-500/30 transition-all duration-300"
              >
                <UserPlus className="h-4 w-4 ml-1" />
                إنشاء حساب
              </Button>
            </Link>

            <button
              type="button"
              onClick={toggleTheme}
              className="flex items-center justify-center h-9 w-9 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-200"
              aria-label={theme === 'dark' ? 'تفعيل الوضع النهاري' : 'تفعيل الوضع الليلي'}
            >
              {theme === 'dark' ? (
                <Sun className="h-4.5 w-4.5" />
              ) : (
                <Moon className="h-4.5 w-4.5" />
              )}
            </button>
          </div>

          {/* Mobile: hamburger + theme toggle */}
          <div className="md:hidden flex items-center gap-2">
            <button
              type="button"
              onClick={toggleTheme}
              className="flex items-center justify-center h-9 w-9 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-200"
              aria-label={theme === 'dark' ? 'تفعيل الوضع النهاري' : 'تفعيل الوضع الليلي'}
            >
              {theme === 'dark' ? (
                <Sun className="h-4.5 w-4.5" />
              ) : (
                <Moon className="h-4.5 w-4.5" />
              )}
            </button>

            <button
              type="button"
              className="inline-flex items-center justify-center h-9 w-9 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-200"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label={isMobileOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
            >
              {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile side drawer overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile side drawer */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            variants={mobileDrawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed top-0 left-0 bottom-0 w-[280px] z-50 md:hidden bg-[#050816] border-l border-white/10 shadow-2xl"
            dir="rtl"
          >
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <Link
                to="/"
                className="flex items-center gap-2.5"
                onClick={() => setMobileOpen(false)}
              >
                <GraduationCap className="h-6 w-6 text-blue-400" />
                <span className="font-bold text-white">
                  منصة التعلم
                </span>
              </Link>
              <button
                type="button"
                className="h-8 w-8 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all flex items-center justify-center"
                onClick={() => setMobileOpen(false)}
                aria-label="إغلاق القائمة"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-4 space-y-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
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

            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10 space-y-3">
              <Link
                to="/login"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-all border border-white/10"
              >
                <LogIn className="h-4 w-4" />
                تسجيل الدخول
              </Link>
              <Link
                to="/register"
                onClick={() => setMobileOpen(false)}
                className="block w-full"
              >
                <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white border-0 rounded-xl shadow-lg shadow-blue-600/20">
                  <UserPlus className="h-4 w-4 ml-1" />
                  إنشاء حساب
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}


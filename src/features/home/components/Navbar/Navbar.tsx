import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import { NAV_LINKS } from '@/features/home/data';
import { Logo } from './Logo';
import { NavLinks } from './NavLinks';
import { NavbarActions } from './NavbarActions';
import { MobileMenu } from './MobileMenu';

interface NavbarProps {
  className?: string;
}

export function Navbar({ className }: NavbarProps) {
  const { t } = useTranslation();
  const [isMobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('#hero');
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

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

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

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

  const handleNavClick = (href: string) => {
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={cn('fixed top-0 left-0 right-0 z-50 px-4 pt-4', className)}>
      <motion.div
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={cn(
          'mx-auto max-w-7xl rounded-2xl transition-all duration-300',
          scrolled
            ? 'bg-[#0F2520]/95 backdrop-blur-lg border border-[rgba(212,181,158,0.15)] shadow-elevated'
            : 'bg-[#0F2520]/80 backdrop-blur-md border border-[rgba(212,181,158,0.08)]'
        )}
      >
        <div className="flex h-16 items-center justify-between px-6">
          {/* Right: Logo */}
          <Logo />

          {/* Center: Desktop nav links */}
          <NavLinks activeSection={activeSection} onLinkClick={handleNavClick} />

          {/* Left: Desktop auth buttons */}
          <NavbarActions />

          {/* Mobile: Hamburger */}
          <div className="md:hidden flex items-center gap-2">
            <button
              type="button"
              className="inline-flex items-center justify-center h-9 w-9 rounded-lg text-[rgba(249,246,240,0.55)] hover:text-[#F9F6F0] hover:bg-[#16342D] transition-all duration-200 cursor-pointer"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label={isMobileOpen ? t('nav.closeMenu') : t('nav.openMenu')}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Mobile side drawer */}
      <MobileMenu
        isOpen={isMobileOpen}
        activeSection={activeSection}
        onClose={() => setMobileOpen(false)}
        onNavClick={handleNavClick}
      />
    </nav>
  );
}


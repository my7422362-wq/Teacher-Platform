import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useDirection } from '@/providers';
import { cn } from '@/lib/utils';
import type { SupportedLanguage } from '@/i18n/config';

interface LanguageDropdownProps {
  className?: string;
}

const LANGUAGE_OPTIONS: { code: SupportedLanguage; flag: string }[] = [
  { code: 'ar', flag: '🇸🇦' },
  { code: 'en', flag: '🇺🇸' },
];

/**
 * Navbar-only language selector. Reuses the app's existing i18n setup and
 * the language/direction state from `useDirection()` — no separate
 * translation or persistence logic is introduced here.
 */
export function LanguageDropdown({ className }: LanguageDropdownProps) {
  const { t } = useTranslation();
  const { language, setLanguage } = useDirection();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const handleSelect = (code: SupportedLanguage) => {
    setLanguage(code);
    setIsOpen(false);
  };

  return (
    <div className={cn('relative', className)} ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        className={cn(
          'flex w-full items-center gap-1.5 text-sm font-medium text-[rgba(249,246,240,0.75)] hover:text-[#F9F6F0] transition-colors px-3 py-2 rounded-xl border border-[rgba(212,181,158,0.15)] hover:border-[rgba(212,181,158,0.3)] hover:bg-[#16342D] cursor-pointer',
          isOpen && 'border-[#D4B59E]/40 bg-[#16342D] text-[#F9F6F0]'
        )}
      >
        <span aria-hidden="true">🌐</span>
        <span className="flex-1 text-start">{t(`languageSwitcher.${language}`)}</span>
        <ChevronDown
          className={cn('h-3.5 w-3.5 shrink-0 transition-transform duration-200', isOpen && 'rotate-180')}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -6 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            role="menu"
            className="absolute start-0 top-full z-50 mt-2 w-44 origin-top rounded-2xl border border-[rgba(212,181,158,0.2)] bg-[#0F2520]/90 backdrop-blur-xl p-1.5 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)]"
          >
            {LANGUAGE_OPTIONS.map((option) => {
              const isActive = option.code === language;
              return (
                <button
                  key={option.code}
                  type="button"
                  role="menuitem"
                  onClick={() => handleSelect(option.code)}
                  className={cn(
                    'flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm transition-colors duration-150 cursor-pointer',
                    isActive
                      ? 'bg-[#D4B59E]/15 text-[#D4B59E] font-bold'
                      : 'text-[#F9F6F0] hover:bg-white/5'
                  )}
                >
                  <span className="text-base leading-none" aria-hidden="true">{option.flag}</span>
                  <span className="flex-1 text-start">{t(`languageSwitcher.${option.code}`)}</span>
                  {isActive && <Check className="h-4 w-4 shrink-0" />}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}


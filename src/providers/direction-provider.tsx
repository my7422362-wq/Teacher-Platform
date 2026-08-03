import { createContext, useContext, useEffect, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { STORAGE_KEYS } from '@/constants';
import type { SupportedLanguage } from '@/i18n/config';

type Direction = 'rtl' | 'ltr';

interface DirectionContextType {
  direction: Direction;
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  toggleLanguage: () => void;
  isRTL: boolean;
}

const DirectionContext = createContext<DirectionContextType | undefined>(undefined);

export function DirectionProvider({ children }: { children: ReactNode }) {
  const { i18n } = useTranslation();
  const language: SupportedLanguage = i18n.language === 'en' ? 'en' : 'ar';
  const direction: Direction = language === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    document.documentElement.dir = direction;
    document.documentElement.lang = language;
  }, [direction, language]);

  const setLanguage = (lang: SupportedLanguage) => {
    i18n.changeLanguage(lang);
    window.localStorage.setItem(STORAGE_KEYS.LOCALE, lang);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'ar' ? 'en' : 'ar');
  };

  return (
    <DirectionContext.Provider value={{ direction, language, setLanguage, toggleLanguage, isRTL: direction === 'rtl' }}>
      {children}
    </DirectionContext.Provider>
  );
}

export function useDirection() {
  const context = useContext(DirectionContext);
  if (!context) {
    throw new Error('useDirection must be used within a DirectionProvider');
  }
  return context;
}

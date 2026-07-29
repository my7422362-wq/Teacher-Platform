import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { STORAGE_KEYS } from '@/constants';
import ar from './locales/ar.json';
import en from './locales/en.json';

export type SupportedLanguage = 'ar' | 'en';

function getInitialLanguage(): SupportedLanguage {
  const saved = window.localStorage.getItem(STORAGE_KEYS.LOCALE);
  return saved === 'en' ? 'en' : 'ar';
}

i18n.use(initReactI18next).init({
  resources: {
    ar: { translation: ar },
    en: { translation: en },
  },
  lng: getInitialLanguage(),
  fallbackLng: 'ar',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;

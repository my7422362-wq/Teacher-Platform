import { useEffect } from 'react';
import { useLocalStorage } from './use-local-storage';
import { APP_LOCALE } from '@/constants';

type Direction = 'rtl' | 'ltr';

export function useDirection() {
  const [direction, setDirection] = useLocalStorage<Direction>('direction', APP_LOCALE === 'ar' ? 'rtl' : 'ltr');

  useEffect(() => {
    document.documentElement.dir = direction;
    document.documentElement.lang = direction === 'rtl' ? 'ar' : 'en';
  }, [direction]);

  const toggleDirection = () => {
    setDirection((prev) => (prev === 'rtl' ? 'ltr' : 'rtl'));
  };

  return { direction, setDirection, toggleDirection, isRTL: direction === 'rtl' };
}


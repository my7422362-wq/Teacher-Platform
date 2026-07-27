import { createContext, useContext, useEffect, type ReactNode } from 'react';
import { useLocalStorage } from '@/hooks/use-local-storage';

type Direction = 'rtl' | 'ltr';

interface DirectionContextType {
  direction: Direction;
  setDirection: (dir: Direction) => void;
  toggleDirection: () => void;
  isRTL: boolean;
}

const DirectionContext = createContext<DirectionContextType | undefined>(undefined);

export function DirectionProvider({ children }: { children: ReactNode }) {
  const [direction, setDirection] = useLocalStorage<Direction>(
    'direction',
    (import.meta.env.VITE_APP_DIRECTION as Direction) || 'rtl'
  );

  useEffect(() => {
    document.documentElement.dir = direction;
    document.documentElement.lang = direction === 'rtl' ? 'ar' : 'en';
  }, [direction]);

  const toggleDirection = () => {
    setDirection((prev) => (prev === 'rtl' ? 'ltr' : 'rtl'));
  };

  return (
    <DirectionContext.Provider
      value={{ direction, setDirection, toggleDirection, isRTL: direction === 'rtl' }}
    >
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


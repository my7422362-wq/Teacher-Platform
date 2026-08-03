import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  type ReactNode,
} from 'react';
import { useLocalStorage } from '@/hooks/use-local-storage';

export type ThemeMode = 'light' | 'dark';

const themes = ['light', 'dark'] as const satisfies readonly ThemeMode[];

interface ThemeContextType {
  theme: ThemeMode;
  themes: typeof themes;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
}

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: ThemeMode;
  storageKey?: string;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({
  children,
  defaultTheme = 'light',
  storageKey = 'theme',
}: ThemeProviderProps) {
  const [theme, setTheme] = useLocalStorage<ThemeMode>(storageKey, defaultTheme);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove(...themes);
    root.classList.add(theme);
    root.dataset.theme = theme;
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const value = useMemo<ThemeContextType>(
    () => ({
      theme,
      themes,
      setTheme,
      toggleTheme,
    }),
    [theme, setTheme]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}


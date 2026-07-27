import { type ReactNode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { QueryProvider } from './query-provider';
import { ThemeProvider } from './theme-provider';
import { DirectionProvider } from './direction-provider';
import { Toaster } from 'sonner';

interface AppProvidersProps {
  children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <BrowserRouter>
      <QueryProvider>
        <ThemeProvider>
          <DirectionProvider>
            {children}
            <Toaster
              position="top-center"
              richColors
              closeButton
              dir={document.documentElement.dir as 'rtl' | 'ltr'}
            />
          </DirectionProvider>
        </ThemeProvider>
      </QueryProvider>
    </BrowserRouter>
  );
}


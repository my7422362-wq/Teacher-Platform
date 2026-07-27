import { type ReactNode } from 'react';
import { AuthProvider } from './auth-provider';
import { DirectionProvider } from './direction-provider';
import { QueryProvider } from './query-provider';
import { ThemeProvider } from './theme-provider';

interface AppProvidersProps {
  children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <ThemeProvider>
      <DirectionProvider>
        <QueryProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </QueryProvider>
      </DirectionProvider>
    </ThemeProvider>
  );
}


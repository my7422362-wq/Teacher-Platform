import { type ReactNode } from 'react';
import { Toaster } from 'sonner';
import { AuthProvider } from './auth-provider';
import { DirectionProvider, useDirection } from './direction-provider';
import { QueryProvider } from './query-provider';
import { ThemeProvider } from './theme-provider';

interface AppProvidersProps {
  children: ReactNode;
}

function AppToaster() {
  const { direction } = useDirection();

  return (
    <Toaster
      position="top-center"
      dir={direction}
      theme="dark"
      richColors
      toastOptions={{
        style: {
          background: '#21483F',
          border: '1px solid rgba(212,181,158,0.25)',
          color: '#F9F6F0',
        },
      }}
    />
  );
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <ThemeProvider>
      <DirectionProvider>
        <QueryProvider>
          <AuthProvider>
            {children}
            <AppToaster />
          </AuthProvider>
        </QueryProvider>
      </DirectionProvider>
    </ThemeProvider>
  );
}


import {
  createContext,
  useContext,
  useMemo,
  type ReactNode,
} from 'react';

export type AuthRole = 'student' | 'teacher';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: AuthRole;
}

interface AuthContextValue {
  user: AuthUser | null;
  role: AuthRole | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: AuthProviderProps) {
  const value = useMemo<AuthContextValue>(
    () => ({
      user: null,
      role: null,
      isAuthenticated: false,
      isLoading: false,
    }),
    []
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
  type ReactNode,
} from 'react';
import { authService } from '@/services/auth.service';
import { sessionService } from '@/services/session.service';
import type { AuthRole, AuthUser, LoginInput, RegisterInput } from '@/features/auth/types';

export type { AuthRole, AuthUser };

interface AuthContextValue {
  currentUser: AuthUser | null;
  role: AuthRole | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (input: LoginInput) => Promise<AuthUser>;
  register: (input: RegisterInput) => Promise<AuthUser>;
  logout: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  loginAsGuest: () => AuthUser;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const session = sessionService.getSession();
    setCurrentUser(session?.user ?? null);
    setLoading(false);
  }, []);

  const login = useCallback(async (input: LoginInput) => {
    const { data } = await authService.login(input);
    sessionService.setSession({ user: data.user, token: data.token });
    if (input.remember) {
      sessionService.setRememberedEmail(input.email);
    } else {
      sessionService.clearRememberedEmail();
    }
    setCurrentUser(data.user);
    return data.user;
  }, []);

  const register = useCallback(async (input: RegisterInput) => {
    const { data } = await authService.register(input);
    sessionService.setSession({ user: data.user, token: data.token });
    setCurrentUser(data.user);
    return data.user;
  }, []);

  const logout = useCallback(async () => {
    await authService.logout();
    setCurrentUser(null);
  }, []);

  const forgotPassword = useCallback(async (email: string) => {
    await authService.forgotPassword(email);
  }, []);

  const loginAsGuest = useCallback(() => {
    const guest: AuthUser = {
      id: `guest-${Date.now()}`,
      name: 'زائر',
      email: '',
      role: 'guest',
    };
    sessionService.setSession({ user: guest, token: 'guest' });
    setCurrentUser(guest);
    return guest;
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      currentUser,
      role: currentUser?.role ?? null,
      isAuthenticated: currentUser !== null && currentUser.role !== 'guest',
      loading,
      login,
      register,
      logout,
      forgotPassword,
      loginAsGuest,
    }),
    [currentUser, loading, login, register, logout, forgotPassword, loginAsGuest]
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

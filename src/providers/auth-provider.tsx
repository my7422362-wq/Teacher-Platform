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
  requestRegisterOtp: (input: RegisterInput) => Promise<RegisterInput>;
  resendRegisterOtp: (email: string) => Promise<void>;
  completeRegister: (input: RegisterInput, otp: string) => Promise<AuthUser>;
  logout: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  loginAsGuest: () => AuthUser;
  updateProfile: (data: Partial<Pick<AuthUser, 'name' | 'avatar' | 'grade' | 'phone'>>) => Promise<AuthUser>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>;
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

  const establishSession = useCallback((user: AuthUser, token: string, remember: boolean, email: string) => {
    sessionService.setSession({ user, token });
    if (remember) {
      sessionService.setRememberedEmail(email);
    } else {
      sessionService.clearRememberedEmail();
    }
    setCurrentUser(user);
    return user;
  }, []);

  const login = useCallback(
    async (input: LoginInput) => {
      const { user, token } = await authService.login(input);
      return establishSession(user, token, input.remember, input.email);
    },
    [establishSession]
  );

  /**
   * Creates the account — the backend sends the verification OTP itself as
   * part of /auth/register (confirmed via its response message), so this
   * must NOT also call sendOtp: doing so immediately re-requests a code
   * within the backend's cooldown window and fails with a 429, even though
   * registration succeeded and the first code was already emailed. The
   * account only becomes usable once completeRegister() verifies it.
   */
  const requestRegisterOtp = useCallback(async (input: RegisterInput) => {
    await authService.register(input);
    return input;
  }, []);

  const resendRegisterOtp = useCallback(async (email: string) => {
    await authService.sendOtp(email);
  }, []);

  const completeRegister = useCallback(
    async (input: RegisterInput, otp: string) => {
      // verify-otp only activates the account — it returns no session, so
      // log in right after with the credentials still held from the
      // register step. The role used everywhere downstream comes from this
      // backend response, never from the client-submitted form value.
      await authService.verifyOtp(input.email, otp);
      const { user, token } = await authService.login({ email: input.email, password: input.password, remember: false });
      return establishSession(user, token, false, input.email);
    },
    [establishSession]
  );

  const logout = useCallback(async () => {
    await authService.logout();
    setCurrentUser(null);
  }, []);

  const forgotPassword = useCallback(async (email: string) => {
    await authService.forgotPassword(email);
  }, []);

  const updateProfile = useCallback(
    async (data: Partial<Pick<AuthUser, 'name' | 'avatar' | 'grade' | 'phone'>>) => {
      if (!currentUser) throw new Error('Not authenticated');
      const { data: updatedUser } = await authService.updateProfile(currentUser.id, data);
      const session = sessionService.getSession();
      if (session) {
        sessionService.setSession({ ...session, user: updatedUser });
      }
      setCurrentUser(updatedUser);
      return updatedUser;
    },
    [currentUser]
  );

  const changePassword = useCallback(
    async (currentPassword: string, newPassword: string) => {
      if (!currentUser) throw new Error('Not authenticated');
      await authService.changePassword(currentUser.id, currentPassword, newPassword);
    },
    [currentUser]
  );

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
      requestRegisterOtp,
      resendRegisterOtp,
      completeRegister,
      logout,
      forgotPassword,
      loginAsGuest,
      updateProfile,
      changePassword,
    }),
    [
      currentUser,
      loading,
      login,
      requestRegisterOtp,
      resendRegisterOtp,
      completeRegister,
      logout,
      forgotPassword,
      loginAsGuest,
      updateProfile,
      changePassword,
    ]
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

import type { ApiResponse, User } from '@/types';
import type { AuthUser, LoginInput, RegisterInput } from '@/features/auth/types';
import { storageService, type StoredAccount } from '@/services/storage.service';
import { sessionService } from '@/services/session.service';
import i18n from '@/i18n/config';

/**
 * Simulates network latency so loading states feel real during the mock phase.
 */
function delay<T>(value: T, ms = 500): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

function toAuthUser(account: StoredAccount): AuthUser {
  return {
    id: account.id,
    name: account.name,
    email: account.email,
    phone: account.phone,
    grade: account.grade,
    governorate: account.governorate,
    role: account.role,
  };
}

function createToken(): string {
  return typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `token-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export const authService = {
  /**
   * Log in with email and password.
   *
   * MOCK IMPLEMENTATION — validates against accounts stored in localStorage.
   * Replace with the real API call (commented below) once Laravel is ready.
   */
  async login({ email, password }: LoginInput): Promise<ApiResponse<{ user: AuthUser; token: string }>> {
    // TODO: Replace with real API call
    // return post<{ user: User; token: string }>(`${BASE}/login`, { email, password });

    const account = storageService.findByEmail(email);
    if (!account || account.password !== password) {
      await delay(null, 400);
      throw new Error(i18n.t('auth.errors.invalidCredentials'));
    }

    return delay({
      success: true,
      message: i18n.t('auth.messages.loginSuccess'),
      data: { user: toAuthUser(account), token: createToken() },
    });
  },

  /**
   * Register a new account.
   *
   * MOCK IMPLEMENTATION — persists the account in localStorage.
   */
  async register(input: RegisterInput): Promise<ApiResponse<{ user: AuthUser; token: string }>> {
    // TODO: Replace with real API call
    // return post<{ user: User; token: string }>(`${BASE}/register`, data);

    if (storageService.emailExists(input.email)) {
      await delay(null, 400);
      throw new Error(i18n.t('auth.errors.emailExists'));
    }

    const account: StoredAccount = {
      id: createToken(),
      name: input.name.trim(),
      email: input.email.trim().toLowerCase(),
      phone: input.phone.trim(),
      grade: input.grade,
      governorate: input.governorate,
      password: input.password,
      role: 'student',
      createdAt: new Date().toISOString(),
    };
    storageService.addAccount(account);

    return delay({
      success: true,
      message: i18n.t('auth.messages.registerSuccess'),
      data: { user: toAuthUser(account), token: createToken() },
    });
  },

  /**
   * Log out the current user (clears the local session only).
   */
  async logout(): Promise<ApiResponse<null>> {
    // TODO: Replace with real API call
    // return post<null>(`${BASE}/logout`);
    sessionService.clearSession();
    return delay({ success: true, message: i18n.t('auth.messages.logoutSuccess'), data: null }, 150);
  },

  /**
   * Send password reset link. UI-only mock — always resolves successfully.
   */
  async forgotPassword(email: string): Promise<ApiResponse<null>> {
    // TODO: Replace with real API call
    // return post<null>(`${BASE}/forgot-password`, { email });
    void email;
    return delay({
      success: true,
      message: i18n.t('auth.messages.forgotPasswordSent'),
      data: null,
    });
  },

  /**
   * Reset password with token.
   */
  async resetPassword(_token: string, _email: string, _password: string, _passwordConfirmation: string): Promise<ApiResponse<null>> {
    // TODO: Replace with real API call
    // return post<null>(`/auth/reset-password`, { token, email, password, password_confirmation: passwordConfirmation });
    throw new Error('Not implemented — auth.resetPassword');
  },

  /**
   * Get the currently authenticated user profile.
   */
  async me(): Promise<ApiResponse<User>> {
    // TODO: Replace with real API call
    // return get<User>(`/auth/me`);
    throw new Error('Not implemented — auth.me');
  },

  /**
   * Update the authenticated user's profile.
   */
  async updateProfile(_data: Partial<User>): Promise<ApiResponse<User>> {
    // TODO: Replace with real API call
    // return put<User>(`/auth/profile`, data);
    throw new Error('Not implemented — auth.updateProfile');
  },
};

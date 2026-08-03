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
    avatar: account.avatar,
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
   * Checks whether an email is free to register, without creating the
   * account — used to gate registration behind an OTP step.
   *
   * MOCK IMPLEMENTATION — checks against accounts stored in localStorage.
   */
  async checkEmailAvailable(email: string): Promise<ApiResponse<null>> {
    // TODO: Replace with real API call
    // return post<null>(`${BASE}/register/check-email`, { email });
    if (storageService.emailExists(email)) {
      await delay(null, 300);
      throw new Error(i18n.t('auth.errors.emailExists'));
    }
    return delay({ success: true, message: '', data: null }, 300);
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
      role: input.role,
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
   * Update the authenticated user's profile (name/avatar/grade/phone).
   *
   * MOCK IMPLEMENTATION — patches the account stored in localStorage.
   */
  async updateProfile(
    userId: string,
    data: Partial<Pick<AuthUser, 'name' | 'avatar' | 'grade' | 'phone'>>
  ): Promise<ApiResponse<AuthUser>> {
    // TODO: Replace with real API call
    // return put<User>(`/auth/profile`, data);
    const updated = storageService.updateAccount(userId, data);
    if (!updated) {
      throw new Error(i18n.t('auth.errors.accountNotFound'));
    }

    return delay({
      success: true,
      message: i18n.t('auth.messages.profileUpdateSuccess'),
      data: toAuthUser(updated),
    });
  },

  /**
   * Change the authenticated user's password after verifying the current one.
   *
   * MOCK IMPLEMENTATION — compares against the plaintext password stored in
   * localStorage (mock-only, see StoredAccount).
   */
  async changePassword(
    userId: string,
    currentPassword: string,
    newPassword: string
  ): Promise<ApiResponse<null>> {
    // TODO: Replace with real API call
    // return post<null>(`/auth/change-password`, { currentPassword, newPassword });
    const account = storageService.findById(userId);
    if (!account || account.password !== currentPassword) {
      await delay(null, 400);
      throw new Error(i18n.t('auth.errors.currentPasswordIncorrect'));
    }

    storageService.updateAccount(userId, { password: newPassword });

    return delay({
      success: true,
      message: i18n.t('auth.messages.passwordChangeSuccess'),
      data: null,
    });
  },
};

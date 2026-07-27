import type { ApiResponse, User } from '@/types';

const BASE = '/auth';

export const authService = {
  /**
   * Log in with email and password.
   */
  async login(email: string, password: string): Promise<ApiResponse<{ user: User; token: string }>> {
    // TODO: Replace with real API call
    // return post<{ user: User; token: string }>(`${BASE}/login`, { email, password });
    throw new Error('Not implemented — auth.login');
  },

  /**
   * Register a new account.
   */
  async register(data: Partial<User> & { password: string; passwordConfirmation: string }): Promise<ApiResponse<{ user: User; token: string }>> {
    // TODO: Replace with real API call
    // return post<{ user: User; token: string }>(`${BASE}/register`, data);
    throw new Error('Not implemented — auth.register');
  },

  /**
   * Log out the current user.
   */
  async logout(): Promise<ApiResponse<null>> {
    // TODO: Replace with real API call
    // return post<null>(`${BASE}/logout`);
    throw new Error('Not implemented — auth.logout');
  },

  /**
   * Send password reset link.
   */
  async forgotPassword(email: string): Promise<ApiResponse<null>> {
    // TODO: Replace with real API call
    // return post<null>(`${BASE}/forgot-password`, { email });
    throw new Error('Not implemented — auth.forgotPassword');
  },

  /**
   * Reset password with token.
   */
  async resetPassword(token: string, email: string, password: string, passwordConfirmation: string): Promise<ApiResponse<null>> {
    // TODO: Replace with real API call
    // return post<null>(`${BASE}/reset-password`, { token, email, password, password_confirmation: passwordConfirmation });
    throw new Error('Not implemented — auth.resetPassword');
  },

  /**
   * Get the currently authenticated user profile.
   */
  async me(): Promise<ApiResponse<User>> {
    // TODO: Replace with real API call
    // return get<User>(`${BASE}/me`);
    throw new Error('Not implemented — auth.me');
  },

  /**
   * Update the authenticated user's profile.
   */
  async updateProfile(data: Partial<User>): Promise<ApiResponse<User>> {
    // TODO: Replace with real API call
    // return put<User>(`${BASE}/profile`, data);
    throw new Error('Not implemented — auth.updateProfile');
  },
};


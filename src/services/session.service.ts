import { STORAGE_KEYS } from '@/constants';
import type { AuthUser } from '@/features/auth/types';

export interface AuthSession {
  user: AuthUser;
  token: string;
}

/**
 * Persists the current session in localStorage (not sessionStorage) so a
 * logged-in user stays logged in after closing and reopening the browser.
 */
export const sessionService = {
  getSession(): AuthSession | null {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEYS.AUTH_SESSION);
      return raw ? (JSON.parse(raw) as AuthSession) : null;
    } catch {
      return null;
    }
  },

  setSession(session: AuthSession) {
    window.localStorage.setItem(STORAGE_KEYS.AUTH_SESSION, JSON.stringify(session));
  },

  clearSession() {
    window.localStorage.removeItem(STORAGE_KEYS.AUTH_SESSION);
  },

  getRememberedEmail(): string {
    return window.localStorage.getItem(STORAGE_KEYS.REMEMBERED_EMAIL) ?? '';
  },

  setRememberedEmail(email: string) {
    window.localStorage.setItem(STORAGE_KEYS.REMEMBERED_EMAIL, email);
  },

  clearRememberedEmail() {
    window.localStorage.removeItem(STORAGE_KEYS.REMEMBERED_EMAIL);
  },
};

import { STORAGE_KEYS } from '@/constants';
import type { AuthRole } from '@/features/auth/types';

/**
 * A locally-patched account record backing the profile-update/change-password
 * mocks below, which have no matching backend endpoint yet (see
 * auth.service.ts). Account creation/login/OTP no longer touch this store —
 * those go through the real backend — so this only ever holds data written
 * by updateAccount for an already-authenticated session.
 */
export interface StoredAccount {
  id: string;
  name: string;
  email: string;
  phone: string;
  grade: string;
  governorate: string;
  avatar?: string;
  password: string;
  role: AuthRole;
  createdAt: string;
}

function readAccounts(): StoredAccount[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEYS.REGISTERED_USERS);
    return raw ? (JSON.parse(raw) as StoredAccount[]) : [];
  } catch {
    return [];
  }
}

function writeAccounts(accounts: StoredAccount[]) {
  window.localStorage.setItem(STORAGE_KEYS.REGISTERED_USERS, JSON.stringify(accounts));
}

export const storageService = {
  findById(id: string): StoredAccount | null {
    return readAccounts().find((account) => account.id === id) ?? null;
  },

  updateAccount(id: string, patch: Partial<StoredAccount>): StoredAccount | null {
    const accounts = readAccounts();
    const index = accounts.findIndex((account) => account.id === id);
    if (index === -1) return null;

    const updated = { ...accounts[index], ...patch };
    accounts[index] = updated;
    writeAccounts(accounts);
    return updated;
  },
};

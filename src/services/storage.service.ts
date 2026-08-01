import { STORAGE_KEYS } from '@/constants';
import type { AuthRole } from '@/features/auth/types';

/**
 * A registered account as persisted in localStorage.
 *
 * Mock-only: the platform has no backend, so the password is kept as-is
 * for local comparison during login. This must be replaced by real
 * server-side hashing once Laravel APIs are wired in.
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

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export const storageService = {
  getAccounts(): StoredAccount[] {
    return readAccounts();
  },

  findByEmail(email: string): StoredAccount | null {
    const target = normalizeEmail(email);
    return readAccounts().find((account) => account.email.toLowerCase() === target) ?? null;
  },

  emailExists(email: string): boolean {
    return storageService.findByEmail(email) !== null;
  },

  findById(id: string): StoredAccount | null {
    return readAccounts().find((account) => account.id === id) ?? null;
  },

  addAccount(account: StoredAccount): StoredAccount {
    const accounts = readAccounts();
    accounts.push(account);
    writeAccounts(accounts);
    return account;
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

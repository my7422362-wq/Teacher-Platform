/**
 * Core auth types shared across the mock auth system.
 * Kept separate from the global `Role`/`User` types in `@/types` (used by
 * course/student/teacher mock data) since `guest` is an auth-only concept.
 */
export type AuthRole = 'student' | 'teacher' | 'guest';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  phone?: string;
  grade?: string;
  governorate?: string;
  avatar?: string;
  role: AuthRole;
}

export interface LoginInput {
  email: string;
  password: string;
  remember: boolean;
}

export interface RegisterInput {
  name: string;
  email: string;
  phone: string;
  role: 'student' | 'teacher';
  grade: string;
  governorate: string;
  password: string;
  passwordConfirmation: string;
}

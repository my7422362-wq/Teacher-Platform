/**
 * Auth feature module — mock frontend authentication.
 */
export type { AuthRole, AuthUser, LoginInput, RegisterInput } from './types';
export {
  createLoginSchema,
  createRegisterSchema,
  createForgotPasswordSchema,
} from './schemas';
export type {
  LoginFormValues,
  RegisterFormValues,
  ForgotPasswordFormValues,
} from './schemas';
export { GRADE_OPTIONS, GOVERNORATE_OPTIONS } from './data/education';

export { LoginForm } from './components/LoginForm';
export { RegisterForm } from './components/RegisterForm';
export { ForgotPasswordForm } from './components/ForgotPasswordForm';
export { PasswordInput } from './components/PasswordInput';
export { AuthCard } from './components/AuthCard';
export { AuthImagePanel } from './components/AuthImagePanel';
export { ProtectedRoute } from './components/ProtectedRoute';
export { GuestRoute } from './components/GuestRoute';

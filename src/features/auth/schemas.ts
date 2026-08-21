import { z } from 'zod';
import type { TFunction } from 'i18next';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const EGYPT_PHONE_REGEX = /^01[0125][0-9]{8}$/;

/**
 * Schemas are built as factory functions (instead of module-level
 * constants) so validation messages update live when the language changes.
 * Callers should rebuild them with `useMemo(() => createXSchema(t), [t])`.
 */

function emailSchema(t: TFunction) {
  return z
    .string()
    .trim()
    .min(1, t('auth.validation.emailRequired'))
    .regex(EMAIL_REGEX, t('auth.validation.emailInvalid'));
}

function phoneSchema(t: TFunction) {
  return z
    .string()
    .trim()
    .min(1, t('auth.validation.phoneRequired'))
    .regex(EGYPT_PHONE_REGEX, t('auth.validation.phoneInvalid'));
}

function passwordSchema(t: TFunction) {
  return z
    .string()
    .min(1, t('auth.validation.passwordRequired'))
    .min(6, t('auth.validation.passwordMin'));
}

export function createLoginSchema(t: TFunction) {
  return z.object({
    email: emailSchema(t),
    password: z.string().min(1, t('auth.validation.passwordRequired')),
    remember: z.boolean(),
  });
}
export type LoginFormValues = z.infer<ReturnType<typeof createLoginSchema>>;

/** Public registration is student-only — teacher accounts are created by
 *  an admin (via the admin dashboard) so every teacher is vetted, not
 *  self-declared. `role` stays a literal here rather than a free choice. */
export function createRegisterSchema(t: TFunction) {
  return z
    .object({
      name: z.string().trim().min(3, t('auth.validation.nameRequired')),
      email: emailSchema(t),
      phone: phoneSchema(t),
      role: z.literal('student'),
      grade: z.string().min(1, t('auth.validation.gradeRequired')),
      governorate: z.string().min(1, t('auth.validation.governorateRequired')),
      password: passwordSchema(t),
      passwordConfirmation: z.string().min(1, t('auth.validation.confirmPasswordRequired')),
    })
    .refine((data) => data.password === data.passwordConfirmation, {
      message: t('auth.validation.passwordMismatch'),
      path: ['passwordConfirmation'],
    });
}
export type RegisterFormValues = z.infer<ReturnType<typeof createRegisterSchema>>;

export function createForgotPasswordSchema(t: TFunction) {
  return z.object({
    email: emailSchema(t),
  });
}
export type ForgotPasswordFormValues = z.infer<ReturnType<typeof createForgotPasswordSchema>>;

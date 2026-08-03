import { z } from 'zod';
import type { TFunction } from 'i18next';

export function createProfileInfoSchema(t: TFunction) {
  return z.object({
    name: z.string().trim().min(3, t('auth.validation.nameRequired')),
    grade: z.string().min(1, t('auth.validation.gradeRequired')),
  });
}
export type ProfileInfoFormValues = z.infer<ReturnType<typeof createProfileInfoSchema>>;

export function createChangePasswordSchema(t: TFunction) {
  return z
    .object({
      currentPassword: z.string().min(1, t('auth.validation.currentPasswordRequired')),
      newPassword: z
        .string()
        .min(1, t('auth.validation.passwordRequired'))
        .min(6, t('auth.validation.passwordMin')),
      confirmNewPassword: z.string().min(1, t('auth.validation.confirmPasswordRequired')),
    })
    .refine((data) => data.newPassword === data.confirmNewPassword, {
      message: t('auth.validation.passwordMismatch'),
      path: ['confirmNewPassword'],
    });
}
export type ChangePasswordFormValues = z.infer<ReturnType<typeof createChangePasswordSchema>>;

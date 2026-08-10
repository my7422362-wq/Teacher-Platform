import { z } from 'zod';
import type { TFunction } from 'i18next';

export function createParentSchema(t: TFunction, requirePassword: boolean) {
  return z.object({
    name: z.string().trim().min(3, t('teacherPages.parents.validation.nameRequired')),
    email: z
      .string()
      .trim()
      .min(1, t('teacherPages.parents.validation.emailRequired'))
      .email(t('teacherPages.parents.validation.emailInvalid')),
    phone: z.string().trim(),
    password: requirePassword
      ? z.string().min(8, t('teacherPages.parents.validation.passwordMin'))
      : z.string().optional(),
    studentIds: z.array(z.number()),
  });
}
export type ParentSchemaValues = z.infer<ReturnType<typeof createParentSchema>>;

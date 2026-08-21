import { z } from 'zod';
import type { TFunction } from 'i18next';

export function createTeacherSchema(t: TFunction) {
  return z.object({
    name: z.string().trim().min(3, t('adminPages.teachers.validation.nameRequired')),
    email: z.string().trim().email(t('adminPages.teachers.validation.emailInvalid')),
    phone: z.string().trim().min(8, t('adminPages.teachers.validation.phoneRequired')),
    password: z.string().min(8, t('adminPages.teachers.validation.passwordMin')),
  });
}
export type TeacherFormSchemaValues = z.infer<ReturnType<typeof createTeacherSchema>>;

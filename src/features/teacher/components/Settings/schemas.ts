import { z } from 'zod';
import type { TFunction } from 'i18next';

export function createAccountSchema(t: TFunction) {
  return z.object({
    name: z.string().trim().min(3, t('auth.validation.nameRequired')),
    phone: z.string().trim().min(1, t('auth.validation.phoneRequired')),
  });
}
export type AccountFormValues = z.infer<ReturnType<typeof createAccountSchema>>;

import { z } from 'zod';
import type { TFunction } from 'i18next';

export function createCategorySchema(t: TFunction) {
  return z.object({
    name: z.string().trim().min(2, t('teacherPages.categories.validation.nameRequired')),
    description: z.string().trim(),
    icon: z.string().trim(),
    isActive: z.boolean(),
  });
}
export type CategoryFormSchemaValues = z.infer<ReturnType<typeof createCategorySchema>>;

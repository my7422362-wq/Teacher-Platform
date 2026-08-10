import { z } from 'zod';
import type { TFunction } from 'i18next';

export function createGroupSchema(t: TFunction) {
  return z.object({
    name: z.string().trim().min(3, t('teacherPages.groups.validation.nameRequired')),
    description: z.string().trim(),
    studentIds: z.array(z.number()).min(1, t('teacherPages.groups.validation.studentsRequired')),
  });
}
export type GroupSchemaValues = z.infer<ReturnType<typeof createGroupSchema>>;

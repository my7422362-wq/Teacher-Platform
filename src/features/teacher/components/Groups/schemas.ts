import { z } from 'zod';
import type { TFunction } from 'i18next';

const scheduleDayEnum = z.enum(['saturday', 'sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday']);

export function createGroupSchema(t: TFunction) {
  return z.object({
    name: z.string().trim().min(3, t('teacherPages.groups.validation.nameRequired')),
    description: z.string().trim(),
    studentIds: z.array(z.number()).min(1, t('teacherPages.groups.validation.studentsRequired')),
    schedule: z.array(
      z.object({
        day: scheduleDayEnum,
        startTime: z.string().trim().min(1, t('teacherPages.groups.validation.timeRequired')),
        endTime: z.string().trim().min(1, t('teacherPages.groups.validation.timeRequired')),
      })
    ),
  });
}
export type GroupSchemaValues = z.infer<ReturnType<typeof createGroupSchema>>;

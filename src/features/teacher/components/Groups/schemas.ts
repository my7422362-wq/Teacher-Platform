import { z } from 'zod';
import type { TFunction } from 'i18next';

const DAY_ENUM = [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
] as const;

export function createGroupSchema(t: TFunction) {
  return z.object({
    name: z.string().trim().min(3, t('teacherPages.groups.validation.nameRequired')),
    courseId: z.number().min(1, t('teacherPages.groups.validation.courseRequired')),
    studentIds: z.array(z.number()).min(1, t('teacherPages.groups.validation.studentsRequired')),
    schedule: z
      .array(
        z.object({
          day: z.enum(DAY_ENUM),
          startTime: z.string().min(1, t('teacherPages.groups.validation.timeRequired')),
          endTime: z.string().min(1, t('teacherPages.groups.validation.timeRequired')),
        })
      )
      .min(1, t('teacherPages.groups.validation.scheduleRequired')),
  });
}
export type GroupSchemaValues = z.infer<ReturnType<typeof createGroupSchema>>;

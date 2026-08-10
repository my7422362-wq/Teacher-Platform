import { z } from 'zod';
import type { TFunction } from 'i18next';

export function createLessonSchema(t: TFunction) {
  return z.object({
    title: z.string().trim().min(3, t('teacherPages.lessons.validation.titleRequired')),
    description: z.string().trim().min(1, t('teacherPages.lessons.validation.descriptionRequired')),
    duration: z.number(t('teacherPages.lessons.validation.durationRequired')).min(
      0,
      t('teacherPages.lessons.validation.durationRequired')
    ),
    isPreview: z.boolean(),
  });
}
export type LessonFormSchemaValues = z.infer<ReturnType<typeof createLessonSchema>>;

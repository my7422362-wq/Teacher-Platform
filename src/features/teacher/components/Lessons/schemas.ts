import { z } from 'zod';
import type { TFunction } from 'i18next';

export function createLessonSchema(t: TFunction) {
  return z.object({
    title: z.string().trim().min(3, t('teacherPages.lessons.validation.titleRequired')),
    description: z.string().trim().min(1, t('teacherPages.lessons.validation.descriptionRequired')),
    duration: z.string().trim().min(1, t('teacherPages.lessons.validation.durationRequired')),
    type: z.enum(['video', 'article', 'quiz', 'assignment']),
    isFree: z.boolean(),
    isPublished: z.boolean(),
    videoFileName: z.string().optional(),
    pdfFileName: z.string().optional(),
  });
}
export type LessonFormSchemaValues = z.infer<ReturnType<typeof createLessonSchema>>;

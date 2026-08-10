import { z } from 'zod';
import type { TFunction } from 'i18next';

export function createCourseSchema(t: TFunction) {
  return z.object({
    title: z.string().trim().min(3, t('teacherPages.courses.validation.titleRequired')),
    description: z.string().trim().min(10, t('teacherPages.courses.validation.descriptionRequired')),
    price: z.number(t('teacherPages.courses.validation.priceInvalid')).min(
      0,
      t('teacherPages.courses.validation.priceInvalid')
    ),
    currency: z.string().trim().min(1, t('teacherPages.courses.validation.currencyRequired')),
    duration: z.number(t('teacherPages.courses.validation.durationInvalid')).min(
      1,
      t('teacherPages.courses.validation.durationInvalid')
    ),
    level: z.enum(['beginner', 'intermediate', 'advanced']),
    categoryId: z.number(t('teacherPages.courses.validation.categoryRequired')).min(
      1,
      t('teacherPages.courses.validation.categoryRequired')
    ),
    isFeatured: z.boolean(),
    isPublished: z.boolean(),
  });
}
export type CourseFormValues = z.infer<ReturnType<typeof createCourseSchema>>;

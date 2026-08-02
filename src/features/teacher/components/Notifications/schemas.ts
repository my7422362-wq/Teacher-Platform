import { z } from 'zod';
import type { TFunction } from 'i18next';

export function createComposeSchema(t: TFunction) {
  return z
    .object({
      scope: z.enum(['all', 'group', 'student']),
      groupId: z.number().optional(),
      studentId: z.number().optional(),
      title: z.string().trim().min(1, t('teacherPages.notifications.validation.titleRequired')),
      message: z.string().trim().min(1, t('teacherPages.notifications.validation.messageRequired')),
      type: z.enum(['info', 'success', 'warning', 'error']),
    })
    .refine((data) => data.scope !== 'group' || !!data.groupId, {
      message: t('teacherPages.notifications.validation.groupRequired'),
      path: ['groupId'],
    })
    .refine((data) => data.scope !== 'student' || !!data.studentId, {
      message: t('teacherPages.notifications.validation.studentRequired'),
      path: ['studentId'],
    });
}
export type ComposeSchemaValues = z.infer<ReturnType<typeof createComposeSchema>>;

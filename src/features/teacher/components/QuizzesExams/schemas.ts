import { z } from 'zod';
import type { TFunction } from 'i18next';

export function createQuizSchema(t: TFunction) {
  return z.object({
    title: z.string().trim().min(3, t('teacherPages.quizzesExams.validation.titleRequired')),
    description: z.string().trim().min(1, t('teacherPages.quizzesExams.validation.descriptionRequired')),
    courseId: z.number().min(1, t('teacherPages.quizzesExams.validation.courseRequired')),
    lessonId: z.number(),
    timeLimit: z.number(t('teacherPages.quizzesExams.validation.numberInvalid')).min(1),
    passingScore: z.number(t('teacherPages.quizzesExams.validation.numberInvalid')).min(0),
    maxAttempts: z.number(t('teacherPages.quizzesExams.validation.numberInvalid')).min(1),
    isPublished: z.boolean(),
  });
}
export type QuizSchemaValues = z.infer<ReturnType<typeof createQuizSchema>>;

export function createExamSchema(t: TFunction) {
  return z.object({
    title: z.string().trim().min(3, t('teacherPages.quizzesExams.validation.titleRequired')),
    description: z.string().trim().min(1, t('teacherPages.quizzesExams.validation.descriptionRequired')),
    courseId: z.number().min(1, t('teacherPages.quizzesExams.validation.courseRequired')),
    startDate: z.string().min(1, t('teacherPages.quizzesExams.validation.dateRequired')),
    endDate: z.string().min(1, t('teacherPages.quizzesExams.validation.dateRequired')),
    duration: z.number(t('teacherPages.quizzesExams.validation.numberInvalid')).min(1),
    passingScore: z.number(t('teacherPages.quizzesExams.validation.numberInvalid')).min(0),
    isPublished: z.boolean(),
  });
}
export type ExamSchemaValues = z.infer<ReturnType<typeof createExamSchema>>;

export function createQuizQuestionSchema(t: TFunction) {
  return z.object({
    text: z.string().trim().min(3, t('teacherPages.quizzesExams.validation.questionTextRequired')),
    type: z.enum(['multiple_choice', 'true_false', 'short_answer', 'essay']),
    optionsText: z.string().optional(),
    correctAnswer: z.string().trim(),
    points: z.number(t('teacherPages.quizzesExams.validation.numberInvalid')).min(1),
  });
}
export type QuizQuestionSchemaValues = z.infer<ReturnType<typeof createQuizQuestionSchema>>;

export function createExamQuestionSchema(t: TFunction) {
  return z.object({
    text: z.string().trim().min(3, t('teacherPages.quizzesExams.validation.questionTextRequired')),
    type: z.enum(['multiple_choice', 'true_false']),
    optionsText: z.string().optional(),
    correctAnswer: z.string().trim().min(1, t('teacherPages.quizzesExams.validation.correctAnswerRequired')),
    points: z.number(t('teacherPages.quizzesExams.validation.numberInvalid')).min(1),
  });
}
export type ExamQuestionSchemaValues = z.infer<ReturnType<typeof createExamQuestionSchema>>;

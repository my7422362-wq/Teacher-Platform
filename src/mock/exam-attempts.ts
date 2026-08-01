import type { ExamAttempt } from '@/types';

export const mockExamAttempts: ExamAttempt[] = [
  {
    id: 1,
    examId: 1,
    userId: 2,
    score: 20,
    totalScore: 30,
    status: 'graded',
    submittedAt: '2024-06-05T10:00:00Z',
  },
];

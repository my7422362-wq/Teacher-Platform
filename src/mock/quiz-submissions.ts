import type { QuizSubmission } from '@/types';

export const mockQuizSubmissions: QuizSubmission[] = [
  {
    id: 1,
    quizId: 1,
    userId: 2,
    attemptNumber: 1,
    score: 30,
    totalScore: 30,
    status: 'graded',
    submittedAt: '2024-06-10T12:00:00Z',
  },
];

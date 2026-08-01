import type { QuizSubmission, ExamAttempt } from '@/types';

const QUIZ_SUBMISSIONS_KEY = 'lms_local_quiz_submissions';
const EXAM_ATTEMPTS_KEY = 'lms_local_exam_attempts';

function read<T>(key: string): T[] {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T[]) : [];
  } catch {
    return [];
  }
}

function write<T>(key: string, value: T[]): void {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getLocalQuizSubmissions(): QuizSubmission[] {
  return read<QuizSubmission>(QUIZ_SUBMISSIONS_KEY);
}

export function saveQuizSubmission(submission: QuizSubmission): void {
  write(QUIZ_SUBMISSIONS_KEY, [...getLocalQuizSubmissions(), submission]);
}

export function getLocalExamAttempts(): ExamAttempt[] {
  return read<ExamAttempt>(EXAM_ATTEMPTS_KEY);
}

export function saveExamAttempt(attempt: ExamAttempt): void {
  write(EXAM_ATTEMPTS_KEY, [...getLocalExamAttempts(), attempt]);
}

import { mockQuizzes } from '@/mock';
import type { Quiz, Question } from '@/types';

const QUIZZES_KEY = 'lms_quizzes_state';

function read(): Quiz[] {
  try {
    const raw = localStorage.getItem(QUIZZES_KEY);
    if (raw) return JSON.parse(raw) as Quiz[];
  } catch {
    // fall through to seed
  }
  const seeded = [...mockQuizzes];
  write(seeded);
  return seeded;
}

function write(quizzes: Quiz[]): void {
  localStorage.setItem(QUIZZES_KEY, JSON.stringify(quizzes));
}

export function getQuizzes(): Quiz[] {
  return read();
}

export function getQuiz(id: number): Quiz | undefined {
  return read().find((q) => q.id === id);
}

export interface QuizFormValues {
  title: string;
  description: string;
  courseId: number;
  lessonId: number;
  timeLimit: number;
  passingScore: number;
  maxAttempts: number;
  isPublished: boolean;
}

export function createQuiz(values: QuizFormValues): Quiz {
  const quizzes = read();
  const id = quizzes.length ? Math.max(...quizzes.map((q) => q.id)) + 1 : 1;
  const now = new Date().toISOString();

  const quiz: Quiz = {
    id,
    ...values,
    questionsCount: 0,
    questions: [],
    createdAt: now,
    updatedAt: now,
  };

  write([...quizzes, quiz]);
  return quiz;
}

export function updateQuiz(id: number, values: QuizFormValues): Quiz | null {
  const quizzes = read();
  const index = quizzes.findIndex((q) => q.id === id);
  if (index === -1) return null;

  const updated: Quiz = { ...quizzes[index], ...values, updatedAt: new Date().toISOString() };
  quizzes[index] = updated;
  write(quizzes);
  return updated;
}

export function deleteQuiz(id: number): void {
  write(read().filter((q) => q.id !== id));
}

export type QuestionFormValues = Omit<Question, 'id' | 'quizId' | 'order'>;

export function addQuestion(quizId: number, values: QuestionFormValues): void {
  const quizzes = read();
  const quiz = quizzes.find((q) => q.id === quizId);
  if (!quiz) return;

  const nextId = quizzes.flatMap((q) => q.questions).reduce((max, q) => Math.max(max, q.id), 0) + 1;
  const order = quiz.questions.length + 1;
  quiz.questions.push({ id: nextId, quizId, order, ...values });
  quiz.questionsCount = quiz.questions.length;
  write(quizzes);
}

export function updateQuestion(quizId: number, questionId: number, values: QuestionFormValues): void {
  const quizzes = read();
  const quiz = quizzes.find((q) => q.id === quizId);
  if (!quiz) return;

  const question = quiz.questions.find((q) => q.id === questionId);
  if (!question) return;

  Object.assign(question, values);
  write(quizzes);
}

export function deleteQuestion(quizId: number, questionId: number): void {
  const quizzes = read();
  const quiz = quizzes.find((q) => q.id === quizId);
  if (!quiz) return;

  quiz.questions = quiz.questions.filter((q) => q.id !== questionId).map((q, index) => ({ ...q, order: index + 1 }));
  quiz.questionsCount = quiz.questions.length;
  write(quizzes);
}

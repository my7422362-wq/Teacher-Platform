import { mockExams } from '@/mock';
import type { Exam, ExamQuestion } from '@/types';

const EXAMS_KEY = 'lms_exams_state';

function read(): Exam[] {
  try {
    const raw = localStorage.getItem(EXAMS_KEY);
    if (raw) return JSON.parse(raw) as Exam[];
  } catch {
    // fall through to seed
  }
  const seeded = [...mockExams];
  write(seeded);
  return seeded;
}

function write(exams: Exam[]): void {
  localStorage.setItem(EXAMS_KEY, JSON.stringify(exams));
}

export function getExams(): Exam[] {
  return read();
}

export function getExam(id: number): Exam | undefined {
  return read().find((e) => e.id === id);
}

export interface ExamFormValues {
  title: string;
  description: string;
  courseId: number;
  startDate: string;
  endDate: string;
  duration: number;
  passingScore: number;
  isPublished: boolean;
}

export function createExam(values: ExamFormValues): Exam {
  const exams = read();
  const id = exams.length ? Math.max(...exams.map((e) => e.id)) + 1 : 1;
  const now = new Date().toISOString();

  const exam: Exam = {
    id,
    ...values,
    totalScore: 0,
    questionsCount: 0,
    questions: [],
    createdAt: now,
    updatedAt: now,
  };

  write([...exams, exam]);
  return exam;
}

export function updateExam(id: number, values: ExamFormValues): Exam | null {
  const exams = read();
  const index = exams.findIndex((e) => e.id === id);
  if (index === -1) return null;

  const updated: Exam = { ...exams[index], ...values, updatedAt: new Date().toISOString() };
  exams[index] = updated;
  write(exams);
  return updated;
}

export function deleteExam(id: number): void {
  write(read().filter((e) => e.id !== id));
}

export type ExamQuestionFormValues = Omit<ExamQuestion, 'id' | 'examId' | 'order'>;

function recomputeTotalScore(exam: Exam): void {
  exam.totalScore = exam.questions.reduce((sum, q) => sum + q.points, 0);
  exam.questionsCount = exam.questions.length;
}

export function addExamQuestion(examId: number, values: ExamQuestionFormValues): void {
  const exams = read();
  const exam = exams.find((e) => e.id === examId);
  if (!exam) return;

  const nextId = exams.flatMap((e) => e.questions).reduce((max, q) => Math.max(max, q.id), 0) + 1;
  const order = exam.questions.length + 1;
  exam.questions.push({ id: nextId, examId, order, ...values });
  recomputeTotalScore(exam);
  write(exams);
}

export function updateExamQuestion(examId: number, questionId: number, values: ExamQuestionFormValues): void {
  const exams = read();
  const exam = exams.find((e) => e.id === examId);
  if (!exam) return;

  const question = exam.questions.find((q) => q.id === questionId);
  if (!question) return;

  Object.assign(question, values);
  recomputeTotalScore(exam);
  write(exams);
}

export function deleteExamQuestion(examId: number, questionId: number): void {
  const exams = read();
  const exam = exams.find((e) => e.id === examId);
  if (!exam) return;

  exam.questions = exam.questions.filter((q) => q.id !== questionId).map((q, index) => ({ ...q, order: index + 1 }));
  recomputeTotalScore(exam);
  write(exams);
}

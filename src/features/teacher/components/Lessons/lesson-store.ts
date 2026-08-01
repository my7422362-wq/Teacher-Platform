import { mockLessons } from '@/mock';
import type { Lesson } from '@/types';

const LESSONS_KEY = 'lms_lessons_state';

function read(): Lesson[] {
  try {
    const raw = localStorage.getItem(LESSONS_KEY);
    if (raw) return JSON.parse(raw) as Lesson[];
  } catch {
    // fall through to seed
  }
  const seeded = [...mockLessons];
  write(seeded);
  return seeded;
}

function write(lessons: Lesson[]): void {
  localStorage.setItem(LESSONS_KEY, JSON.stringify(lessons));
}

export function getLessonsForCourse(courseId: number): Lesson[] {
  return read()
    .filter((l) => l.courseId === courseId)
    .sort((a, b) => a.order - b.order);
}

export interface LessonFormValues {
  title: string;
  description: string;
  duration: string;
  type: Lesson['type'];
  isFree: boolean;
  isPublished: boolean;
  videoFileName?: string;
  pdfFileName?: string;
}

export function createLesson(courseId: number, values: LessonFormValues): Lesson {
  const lessons = read();
  const id = lessons.length ? Math.max(...lessons.map((l) => l.id)) + 1 : 1;
  const courseLessons = lessons.filter((l) => l.courseId === courseId);
  const order = courseLessons.length ? Math.max(...courseLessons.map((l) => l.order)) + 1 : 1;
  const now = new Date().toISOString();

  const lesson: Lesson = {
    id,
    courseId,
    order,
    ...values,
    createdAt: now,
    updatedAt: now,
  };

  write([...lessons, lesson]);
  return lesson;
}

export function updateLesson(id: number, values: LessonFormValues): Lesson | null {
  const lessons = read();
  const index = lessons.findIndex((l) => l.id === id);
  if (index === -1) return null;

  const updated: Lesson = {
    ...lessons[index],
    ...values,
    updatedAt: new Date().toISOString(),
  };
  lessons[index] = updated;
  write(lessons);
  return updated;
}

export function deleteLesson(id: number): void {
  write(read().filter((l) => l.id !== id));
}

export function moveLesson(id: number, direction: 'up' | 'down'): void {
  const lessons = read();
  const lesson = lessons.find((l) => l.id === id);
  if (!lesson) return;

  const siblings = lessons
    .filter((l) => l.courseId === lesson.courseId)
    .sort((a, b) => a.order - b.order);
  const index = siblings.findIndex((l) => l.id === id);
  const swapIndex = direction === 'up' ? index - 1 : index + 1;
  if (swapIndex < 0 || swapIndex >= siblings.length) return;

  const sibling = siblings[swapIndex];
  const currentOrder = lesson.order;
  lesson.order = sibling.order;
  sibling.order = currentOrder;

  write(lessons);
}

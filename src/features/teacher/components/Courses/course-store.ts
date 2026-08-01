import { mockCourses } from '@/mock';
import type { Course } from '@/types';

const COURSES_KEY = 'lms_courses_state';

function read(): Course[] {
  try {
    const raw = localStorage.getItem(COURSES_KEY);
    if (raw) return JSON.parse(raw) as Course[];
  } catch {
    // fall through to seed
  }
  const seeded = [...mockCourses];
  write(seeded);
  return seeded;
}

function write(courses: Course[]): void {
  localStorage.setItem(COURSES_KEY, JSON.stringify(courses));
}

export function getCourses(): Course[] {
  return read();
}

export interface CourseFormValues {
  title: string;
  description: string;
  price: number;
  duration: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  isPublished: boolean;
}

export function createCourse(values: CourseFormValues, teacherId: number, teacherName: string): Course {
  const courses = read();
  const id = courses.length ? Math.max(...courses.map((c) => c.id)) + 1 : 1;
  const now = new Date().toISOString();

  const course: Course = {
    id,
    title: values.title,
    slug: `course-${id}`,
    description: values.description,
    thumbnail: '/images/courses/placeholder.jpg',
    price: values.price,
    currency: 'SAR',
    duration: values.duration,
    level: values.level,
    category: values.category,
    tags: [],
    teacherId,
    teacherName,
    rating: 0,
    studentsCount: 0,
    lessonsCount: 0,
    isPublished: values.isPublished,
    isFeatured: false,
    createdAt: now,
    updatedAt: now,
  };

  write([...courses, course]);
  return course;
}

export function updateCourse(id: number, values: CourseFormValues): Course | null {
  const courses = read();
  const index = courses.findIndex((c) => c.id === id);
  if (index === -1) return null;

  const updated: Course = {
    ...courses[index],
    title: values.title,
    description: values.description,
    price: values.price,
    duration: values.duration,
    level: values.level,
    category: values.category,
    isPublished: values.isPublished,
    updatedAt: new Date().toISOString(),
  };
  courses[index] = updated;
  write(courses);
  return updated;
}

export function deleteCourse(id: number): void {
  write(read().filter((c) => c.id !== id));
}

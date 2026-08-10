/**
 * Real backend course shape (teacher-scoped), distinct from the legacy
 * mock `Course` type in `@/types`. Only fields the backend's CourseResource
 * actually returns — no fabricated rating/tags placeholders.
 */

export interface TeacherCourseCategory {
  id: number;
  name: string;
}

export interface TeacherCourse {
  id: number;
  title: string;
  slug: string;
  description: string;
  thumbnail: string | null;
  price: number;
  currency: string;
  duration: number;
  level: 'beginner' | 'intermediate' | 'advanced';
  category: TeacherCourseCategory;
  isFeatured: boolean;
  isPublished: boolean;
  studentsCount: number;
  lessonsCount: number;
  createdAt: string | null;
}

export interface TeacherCourseFormValues {
  categoryId: number;
  title: string;
  description: string;
  price: number;
  currency: string;
  duration: number;
  level: 'beginner' | 'intermediate' | 'advanced';
  isFeatured: boolean;
  isPublished: boolean;
  thumbnail?: File | null;
}

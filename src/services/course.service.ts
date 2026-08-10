import axios from 'axios';
import api from '@/services/api';
import i18n from '@/i18n/config';
import type {
  TeacherCourse,
  TeacherCourseFormValues,
} from '@/features/teacher/components/Courses/types';

interface CourseResourceDto {
  id: number;
  title: string;
  slug: string;
  description: string;
  thumbnail: string | null;
  price: string;
  currency: string;
  duration: number;
  level: 'beginner' | 'intermediate' | 'advanced';
  featured: boolean;
  is_published: boolean;
  teacher: { id: number; name: string };
  category: { id: number; name: string };
  lessons_count: string;
  students_count: string;
  created_at: string | null;
}

function mapCourse(dto: CourseResourceDto): TeacherCourse {
  return {
    id: dto.id,
    title: dto.title,
    slug: dto.slug,
    description: dto.description,
    thumbnail: dto.thumbnail,
    price: Number(dto.price),
    currency: dto.currency,
    duration: dto.duration,
    level: dto.level,
    category: dto.category,
    isFeatured: dto.featured,
    isPublished: dto.is_published,
    studentsCount: Number(dto.students_count),
    lessonsCount: Number(dto.lessons_count),
    createdAt: dto.created_at,
  };
}

function buildCourseFormData(values: TeacherCourseFormValues): FormData {
  const formData = new FormData();
  formData.append('category_id', String(values.categoryId));
  formData.append('title', values.title);
  formData.append('description', values.description);
  formData.append('price', String(values.price));
  formData.append('currency', values.currency);
  formData.append('duration', String(values.duration));
  formData.append('level', values.level);
  formData.append('is_featured', values.isFeatured ? '1' : '0');
  formData.append('is_published', values.isPublished ? '1' : '0');
  if (values.thumbnail) formData.append('thumbnail', values.thumbnail);
  return formData;
}

function extractErrorMessage(error: unknown, fallback: string): string {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as { message?: string; errors?: Record<string, string[]> } | undefined;
    const firstValidationError = data?.errors && Object.values(data.errors)[0]?.[0];
    if (firstValidationError) return firstValidationError;
    if (data?.message) return data.message;
  }
  return fallback;
}

/**
 * Real API — teacher-scoped course management (/teacher/courses/*).
 * Courses are addressed by slug in the backend, not numeric id.
 */
export const teacherCourseService = {
  async list(): Promise<TeacherCourse[]> {
    try {
      const { data } = await api.get<{ data: CourseResourceDto[] }>('/teacher/courses');
      return data.data.map(mapCourse);
    } catch (error) {
      throw new Error(extractErrorMessage(error, i18n.t('teacherPages.courses.toast.loadFailed')));
    }
  },

  async create(values: TeacherCourseFormValues): Promise<TeacherCourse> {
    try {
      const formData = buildCourseFormData(values);
      const { data } = await api.post<{ data: CourseResourceDto }>('/teacher/courses', formData);
      return mapCourse(data.data);
    } catch (error) {
      throw new Error(extractErrorMessage(error, i18n.t('teacherPages.courses.toast.saveFailed')));
    }
  },

  async update(slug: string, values: TeacherCourseFormValues): Promise<TeacherCourse> {
    try {
      const formData = buildCourseFormData(values);
      // Laravel can't parse multipart bodies on PUT (a PHP limitation, not
      // just Laravel's) — send POST with a _method override instead, which
      // is what the backend's route actually expects for this endpoint.
      formData.append('_method', 'PUT');
      const { data } = await api.post<{ data: CourseResourceDto }>(`/teacher/courses/${slug}`, formData);
      return mapCourse(data.data);
    } catch (error) {
      throw new Error(extractErrorMessage(error, i18n.t('teacherPages.courses.toast.saveFailed')));
    }
  },

  async remove(slug: string): Promise<void> {
    try {
      await api.delete(`/teacher/courses/${slug}`);
    } catch (error) {
      throw new Error(extractErrorMessage(error, i18n.t('teacherPages.courses.toast.deleteFailed')));
    }
  },

  async publish(slug: string): Promise<TeacherCourse> {
    try {
      const { data } = await api.patch<{ data: CourseResourceDto }>(`/teacher/courses/${slug}/publish`);
      return mapCourse(data.data);
    } catch (error) {
      throw new Error(extractErrorMessage(error, i18n.t('teacherPages.courses.toast.saveFailed')));
    }
  },

  async unpublish(slug: string): Promise<TeacherCourse> {
    try {
      const { data } = await api.patch<{ data: CourseResourceDto }>(`/teacher/courses/${slug}/unpublish`);
      return mapCourse(data.data);
    } catch (error) {
      throw new Error(extractErrorMessage(error, i18n.t('teacherPages.courses.toast.saveFailed')));
    }
  },
};

export interface CourseCategoryOption {
  id: number;
  name: string;
}

/** Real API — GET /categories (public, active categories only). */
export async function listCourseCategories(): Promise<CourseCategoryOption[]> {
  const { data } = await api.get<{ data: { id: number; name: string }[] }>('/categories');
  return data.data.map((category) => ({ id: category.id, name: category.name }));
}

export interface PublicCourse {
  id: number;
  title: string;
  slug: string;
  teacherName: string;
  price: number;
  currency: string;
  thumbnail: string | null;
}

function mapPublicCourse(dto: CourseResourceDto): PublicCourse {
  return {
    id: dto.id,
    title: dto.title,
    slug: dto.slug,
    teacherName: dto.teacher.name,
    price: Number(dto.price),
    currency: dto.currency,
    thumbnail: dto.thumbnail,
  };
}

/** Real API — GET /courses (public catalog, published courses only, no auth required).
 *  No rating/review field exists on the real CourseResource, so it isn't shown anywhere this is used. */
export const publicCourseService = {
  async list(): Promise<PublicCourse[]> {
    try {
      const { data } = await api.get<{ data: CourseResourceDto[] }>('/courses');
      return data.data.map(mapPublicCourse);
    } catch (error) {
      throw new Error(extractErrorMessage(error, i18n.t('studentPages.dashboard.recommended.loadFailed')));
    }
  },
};

import axios from 'axios';
import api from '@/services/api';
import i18n from '@/i18n/config';

interface AdminOverviewDto {
  total_teachers: number;
  total_students: number;
  total_courses: number;
  total_payments: number;
  total_revenue: number;
  pending_payments: number;
}

export interface AdminOverview {
  totalTeachers: number;
  totalStudents: number;
  totalCourses: number;
  totalPayments: number;
  totalRevenue: number;
  pendingPayments: number;
}

interface AdminUserDto {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  photo_url: string | null;
  status: string;
  created_at: string | null;
  courses_count?: string | number;
  students_count?: string | number;
}

export interface AdminTeacher {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  avatar: string | null;
  status: string;
  coursesCount: number;
  studentsCount: number;
  createdAt: string | null;
}

export interface AdminStudent {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  avatar: string | null;
  status: string;
  createdAt: string | null;
}

export interface CreateTeacherValues {
  name: string;
  email: string;
  phone: string;
  password: string;
}

interface AdminCourseDto {
  id: number;
  title: string;
  slug: string;
  thumbnail: string | null;
  price: string;
  currency: string;
  is_published: boolean;
  teacher: { id: number; name: string };
  category: { id: number; name: string };
  students_count: string;
  created_at: string | null;
}

export interface AdminCourse {
  id: number;
  title: string;
  slug: string;
  thumbnail: string | null;
  price: number;
  currency: string;
  isPublished: boolean;
  teacherId: number;
  teacherName: string;
  categoryName: string;
  studentsCount: number;
  createdAt: string | null;
}

function mapTeacher(dto: AdminUserDto): AdminTeacher {
  return {
    id: dto.id,
    name: dto.name,
    email: dto.email,
    phone: dto.phone,
    avatar: dto.photo_url,
    status: dto.status,
    coursesCount: Number(dto.courses_count ?? 0),
    studentsCount: Number(dto.students_count ?? 0),
    createdAt: dto.created_at,
  };
}

function mapStudent(dto: AdminUserDto): AdminStudent {
  return {
    id: dto.id,
    name: dto.name,
    email: dto.email,
    phone: dto.phone,
    avatar: dto.photo_url,
    status: dto.status,
    createdAt: dto.created_at,
  };
}

function mapCourse(dto: AdminCourseDto): AdminCourse {
  return {
    id: dto.id,
    title: dto.title,
    slug: dto.slug,
    thumbnail: dto.thumbnail,
    price: Number(dto.price),
    currency: dto.currency,
    isPublished: dto.is_published,
    teacherId: dto.teacher?.id ?? 0,
    teacherName: dto.teacher?.name ?? '',
    categoryName: dto.category?.name ?? '',
    studentsCount: Number(dto.students_count ?? 0),
    createdAt: dto.created_at,
  };
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

/** Real API — platform-wide admin views. None of these endpoints existed
 *  before this feature; field names are a best-effort guess following the
 *  same conventions every other confirmed endpoint in this backend uses —
 *  expect to adjust against the real payload once tested live. */
export const adminService = {
  async getOverview(): Promise<AdminOverview> {
    try {
      const { data } = await api.get<{ data: AdminOverviewDto }>('/admin/overview');
      const dto = data.data;
      return {
        totalTeachers: dto.total_teachers,
        totalStudents: dto.total_students,
        totalCourses: dto.total_courses,
        totalPayments: dto.total_payments,
        totalRevenue: dto.total_revenue,
        pendingPayments: dto.pending_payments,
      };
    } catch (error) {
      throw new Error(extractErrorMessage(error, i18n.t('adminPages.overview.toast.loadFailed')));
    }
  },

  async listTeachers(): Promise<AdminTeacher[]> {
    try {
      const { data } = await api.get<{ data: AdminUserDto[] }>('/admin/teachers');
      return data.data.map(mapTeacher);
    } catch (error) {
      throw new Error(extractErrorMessage(error, i18n.t('adminPages.teachers.toast.loadFailed')));
    }
  },

  async createTeacher(values: CreateTeacherValues): Promise<AdminTeacher> {
    try {
      const { data } = await api.post<{ data: AdminUserDto }>('/admin/teachers', {
        name: values.name,
        email: values.email,
        phone: values.phone,
        password: values.password,
      });
      return mapTeacher(data.data);
    } catch (error) {
      throw new Error(extractErrorMessage(error, i18n.t('adminPages.teachers.toast.createFailed')));
    }
  },

  async deleteTeacher(teacherId: number): Promise<void> {
    try {
      await api.delete(`/admin/users/${teacherId}`);
    } catch (error) {
      throw new Error(extractErrorMessage(error, i18n.t('adminPages.teachers.toast.deleteFailed')));
    }
  },

  async listStudents(): Promise<AdminStudent[]> {
    try {
      const { data } = await api.get<{ data: AdminUserDto[] }>('/admin/students');
      return data.data.map(mapStudent);
    } catch (error) {
      throw new Error(extractErrorMessage(error, i18n.t('adminPages.students.toast.loadFailed')));
    }
  },

  async listCourses(): Promise<AdminCourse[]> {
    try {
      const { data } = await api.get<{ data: AdminCourseDto[] }>('/admin/courses');
      return data.data.map(mapCourse);
    } catch (error) {
      throw new Error(extractErrorMessage(error, i18n.t('adminPages.courses.toast.loadFailed')));
    }
  },
};

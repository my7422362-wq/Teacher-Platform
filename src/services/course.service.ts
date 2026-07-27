import type { Course, Lesson, ApiResponse } from '@/types';
import { mockCourses, mockLessons } from '@/mock';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const courseService = {
  async getAll(): Promise<ApiResponse<Course[]>> {
    await delay(500);
    return {
      success: true,
      message: 'تم جلب الدورات بنجاح',
      data: mockCourses,
    };
  },

  async getById(id: number): Promise<ApiResponse<Course>> {
    await delay(300);
    const course = mockCourses.find((c) => c.id === id);
    if (!course) {
      throw { success: false, message: 'الدورة غير موجودة' };
    }
    return {
      success: true,
      message: 'تم جلب الدورة بنجاح',
      data: course,
    };
  },

  async getLessons(courseId: number): Promise<ApiResponse<Lesson[]>> {
    await delay(300);
    const lessons = mockLessons.filter((l) => l.courseId === courseId);
    return {
      success: true,
      message: 'تم جلب الدروس بنجاح',
      data: lessons,
    };
  },

  async create(course: Partial<Course>): Promise<ApiResponse<Course>> {
    await delay(500);
    const newCourse: Course = {
      id: mockCourses.length + 1,
      ...course,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    } as Course;
    return {
      success: true,
      message: 'تم إنشاء الدورة بنجاح',
      data: newCourse,
    };
  },

  async update(id: number, course: Partial<Course>): Promise<ApiResponse<Course>> {
    await delay(500);
    const existing = mockCourses.find((c) => c.id === id);
    if (!existing) {
      throw { success: false, message: 'الدورة غير موجودة' };
    }
    return {
      success: true,
      message: 'تم تحديث الدورة بنجاح',
      data: { ...existing, ...course, updatedAt: new Date().toISOString() },
    };
  },

  async delete(id: number): Promise<ApiResponse<null>> {
    await delay(500);
    return {
      success: true,
      message: 'تم حذف الدورة بنجاح',
      data: null,
    };
  },
};


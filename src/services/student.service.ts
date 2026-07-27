import type { ApiResponse } from '@/types';
import { mockStudents } from '@/mock';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const studentService = {
  async getAll(): Promise<ApiResponse<typeof mockStudents>> {
    await delay(500);
    return {
      success: true,
      message: 'تم جلب الطلاب بنجاح',
      data: mockStudents,
    };
  },

  async getById(id: number) {
    await delay(300);
    const student = mockStudents.find((s) => s.id === id);
    if (!student) {
      throw { success: false, message: 'الطالب غير موجود' };
    }
    return {
      success: true,
      message: 'تم جلب بيانات الطالب بنجاح',
      data: student,
    };
  },

  async getEnrolledCourses(studentId: number) {
    await delay(300);
    return {
      success: true,
      message: 'تم جلب الدورات المسجل فيها بنجاح',
      data: [],
    };
  },
};


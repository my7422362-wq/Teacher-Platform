import type { ApiResponse } from '@/types';
import { mockCourses, mockStudents } from '@/mock';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const teacherService = {
  async getDashboard(): Promise<
    ApiResponse<{
      totalStudents: number;
      totalCourses: number;
      totalRevenue: number;
      averageRating: number;
      recentEnrollments: number;
      completionRate: number;
    }>
  > {
    await delay(500);
    return {
      success: true,
      message: 'تم جلب بيانات لوحة التحكم بنجاح',
      data: {
        totalStudents: mockStudents.length,
        totalCourses: mockCourses.length,
        totalRevenue: 45600,
        averageRating: 4.7,
        recentEnrollments: 12,
        completionRate: 68,
      },
    };
  },

  async getAnalytics(): Promise<
    ApiResponse<{
      monthlyStudents: { month: string; count: number }[];
      coursePerformance: { courseId: number; courseName: string; students: number; rating: number }[];
    }>
  > {
    await delay(500);
    return {
      success: true,
      message: 'تم جلب التحليلات بنجاح',
      data: {
        monthlyStudents: [
          { month: 'يناير', count: 5 },
          { month: 'فبراير', count: 8 },
          { month: 'مارس', count: 12 },
          { month: 'أبريل', count: 15 },
          { month: 'مايو', count: 20 },
          { month: 'يونيو', count: 25 },
        ],
        coursePerformance: mockCourses.map((c) => ({
          courseId: c.id,
          courseName: c.title,
          students: c.studentsCount,
          rating: c.rating,
        })),
      },
    };
  },
};


import type { ApiResponse, User, Course } from '@/types';

export interface TeacherDashboard {
  totalStudents: number;
  totalCourses: number;
  totalRevenue: number;
  averageRating: number;
  recentEnrollments: number;
  completionRate: number;
}

export interface TeacherAnalytics {
  monthlyStudents: { month: string; count: number }[];
  coursePerformance: { courseId: number; courseName: string; students: number; rating: number }[];
}

export const teacherService = {
  /**
   * Get teacher dashboard stats.
   */
  async getDashboard(): Promise<ApiResponse<TeacherDashboard>> {
    // TODO: Replace with real API call
    // return get<TeacherDashboard>('/teachers/dashboard');
    throw new Error('Not implemented — teacher.getDashboard');
  },

  /**
   * Get teacher analytics data.
   */
  async getAnalytics(): Promise<ApiResponse<TeacherAnalytics>> {
    // TODO: Replace with real API call
    // return get<TeacherAnalytics>('/teachers/analytics');
    throw new Error('Not implemented — teacher.getAnalytics');
  },

  /**
   * Get all teachers (admin).
   */
  async getAll(_params?: Record<string, unknown>): Promise<ApiResponse<User[]>> {
    // TODO: Replace with real API call
    // return get<User[]>('/teachers', { params });
    throw new Error('Not implemented — teacher.getAll');
  },

  /**
   * Get a single teacher by ID.
   */
  async getById(_id: number): Promise<ApiResponse<User>> {
    // TODO: Replace with real API call
    // return get<User>(`/teachers/${id}`);
    throw new Error('Not implemented — teacher.getById');
  },

  /**
   * Get courses taught by a teacher.
   */
  async getCourses(_teacherId: number): Promise<ApiResponse<Course[]>> {
    // TODO: Replace with real API call
    // return get<Course[]>(`/teachers/${teacherId}/courses`);
    throw new Error('Not implemented — teacher.getCourses');
  },
};

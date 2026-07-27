import type { ApiResponse, User, Course } from '@/types';

const BASE = '/teachers';

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
    // return get<TeacherDashboard>(`${BASE}/dashboard`);
    throw new Error('Not implemented — teacher.getDashboard');
  },

  /**
   * Get teacher analytics data.
   */
  async getAnalytics(): Promise<ApiResponse<TeacherAnalytics>> {
    // TODO: Replace with real API call
    // return get<TeacherAnalytics>(`${BASE}/analytics`);
    throw new Error('Not implemented — teacher.getAnalytics');
  },

  /**
   * Get all teachers (admin).
   */
  async getAll(params?: Record<string, unknown>): Promise<ApiResponse<User[]>> {
    // TODO: Replace with real API call
    // return get<User[]>(BASE, { params });
    throw new Error('Not implemented — teacher.getAll');
  },

  /**
   * Get a single teacher by ID.
   */
  async getById(id: number): Promise<ApiResponse<User>> {
    // TODO: Replace with real API call
    // return get<User>(`${BASE}/${id}`);
    throw new Error('Not implemented — teacher.getById');
  },

  /**
   * Get courses taught by a teacher.
   */
  async getCourses(teacherId: number): Promise<ApiResponse<Course[]>> {
    // TODO: Replace with real API call
    // return get<Course[]>(`${BASE}/${teacherId}/courses`);
    throw new Error('Not implemented — teacher.getCourses');
  },
};


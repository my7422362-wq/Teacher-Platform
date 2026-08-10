import axios from 'axios';
import api from '@/services/api';
import i18n from '@/i18n/config';
import type { ApiResponse, User, Course } from '@/types';
import type { GradesOverview } from '@/features/teacher/components/Grades/types';

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

interface GradesRankingDto {
  student_id: number;
  name: string;
  photo_url?: string | null;
  average_percent: number;
  graded_count: number;
  passed_count: number;
  failed_count: number;
}

interface GradesOverviewDto {
  overall_average: number;
  total_graded: number;
  total_passed: number;
  total_failed: number;
  pass_rate: number;
  fail_rate: number;
  ranking: GradesRankingDto[];
}

function extractErrorMessage(error: unknown, fallback: string): string {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as { message?: string } | undefined;
    if (data?.message) return data.message;
  }
  return fallback;
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
   * Aggregated grade stats + student ranking, computed server-side.
   * REAL API — GET /teachers/grades. Response shape isn't documented
   * anywhere (not in the OpenAPI spec), so this follows the same snake_case
   * convention every other confirmed endpoint in this app uses — if the
   * numbers come back wrong/zero, the field names here need adjusting
   * against the real payload.
   */
  async getGrades(): Promise<GradesOverview> {
    try {
      const { data } = await api.get<{ data: GradesOverviewDto }>('/teachers/grades');
      const dto = data.data;
      return {
        overallAverage: dto.overall_average,
        totalGraded: dto.total_graded,
        totalPassed: dto.total_passed,
        totalFailed: dto.total_failed,
        passRate: dto.pass_rate,
        failRate: dto.fail_rate,
        ranking: (dto.ranking ?? [])
          .slice()
          .sort((a, b) => b.average_percent - a.average_percent)
          .map((r, index) => ({
            rank: index + 1,
            studentId: r.student_id,
            name: r.name,
            avatar: r.photo_url ?? null,
            averagePercent: r.average_percent,
            gradedCount: r.graded_count,
            passedCount: r.passed_count,
            failedCount: r.failed_count,
          })),
      };
    } catch (error) {
      throw new Error(extractErrorMessage(error, i18n.t('teacherPages.grades.toast.loadFailed')));
    }
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

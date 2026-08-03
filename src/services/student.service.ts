import type { ApiResponse, User, Course, Progress } from '@/types';

export const studentService = {
  /**
   * Get all students (teacher/admin).
   */
  async getAll(_params?: Record<string, unknown>): Promise<ApiResponse<User[]>> {
    // TODO: Replace with real API call
    // return get<User[]>('/students', { params });
    throw new Error('Not implemented — student.getAll');
  },

  /**
   * Get a single student by ID.
   */
  async getById(_id: number): Promise<ApiResponse<User>> {
    // TODO: Replace with real API call
    // return get<User>(`/students/${id}`);
    throw new Error('Not implemented — student.getById');
  },

  /**
   * Get courses a student is enrolled in.
   */
  async getEnrolledCourses(_studentId: number): Promise<ApiResponse<Course[]>> {
    // TODO: Replace with real API call
    // return get<Course[]>(`/students/${studentId}/courses`);
    throw new Error('Not implemented — student.getEnrolledCourses');
  },

  /**
   * Get progress for a student in a specific course.
   */
  async getProgress(_studentId: number, _courseId: number): Promise<ApiResponse<Progress>> {
    // TODO: Replace with real API call
    // return get<Progress>(`/students/${studentId}/courses/${courseId}/progress`);
    throw new Error('Not implemented — student.getProgress');
  },

  /**
   * Enroll a student in a course.
   */
  async enroll(_studentId: number, _courseId: number): Promise<ApiResponse<null>> {
    // TODO: Replace with real API call
    // return post<null>(`/students/${studentId}/enroll`, { course_id: courseId });
    throw new Error('Not implemented — student.enroll');
  },

  /**
   * Update student profile (admin/self).
   */
  async update(_id: number, _data: Partial<User>): Promise<ApiResponse<User>> {
    // TODO: Replace with real API call
    // return put<User>(`/students/${id}`, data);
    throw new Error('Not implemented — student.update');
  },
};

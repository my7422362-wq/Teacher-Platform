import type { ApiResponse, User, Course, Progress } from '@/types';

const BASE = '/students';

export const studentService = {
  /**
   * Get all students (teacher/admin).
   */
  async getAll(params?: Record<string, unknown>): Promise<ApiResponse<User[]>> {
    // TODO: Replace with real API call
    // return get<User[]>(BASE, { params });
    throw new Error('Not implemented — student.getAll');
  },

  /**
   * Get a single student by ID.
   */
  async getById(id: number): Promise<ApiResponse<User>> {
    // TODO: Replace with real API call
    // return get<User>(`${BASE}/${id}`);
    throw new Error('Not implemented — student.getById');
  },

  /**
   * Get courses a student is enrolled in.
   */
  async getEnrolledCourses(studentId: number): Promise<ApiResponse<Course[]>> {
    // TODO: Replace with real API call
    // return get<Course[]>(`${BASE}/${studentId}/courses`);
    throw new Error('Not implemented — student.getEnrolledCourses');
  },

  /**
   * Get progress for a student in a specific course.
   */
  async getProgress(studentId: number, courseId: number): Promise<ApiResponse<Progress>> {
    // TODO: Replace with real API call
    // return get<Progress>(`${BASE}/${studentId}/courses/${courseId}/progress`);
    throw new Error('Not implemented — student.getProgress');
  },

  /**
   * Enroll a student in a course.
   */
  async enroll(studentId: number, courseId: number): Promise<ApiResponse<null>> {
    // TODO: Replace with real API call
    // return post<null>(`${BASE}/${studentId}/enroll`, { course_id: courseId });
    throw new Error('Not implemented — student.enroll');
  },

  /**
   * Update student profile (admin/self).
   */
  async update(id: number, data: Partial<User>): Promise<ApiResponse<User>> {
    // TODO: Replace with real API call
    // return put<User>(`${BASE}/${id}`, data);
    throw new Error('Not implemented — student.update');
  },
};


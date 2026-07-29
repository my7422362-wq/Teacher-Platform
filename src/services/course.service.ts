import type { ApiResponse, Course, Lesson, Category } from '@/types';

export const courseService = {
  /**
   * Get all courses (with optional filters).
   */
  async getAll(_params?: Record<string, unknown>): Promise<ApiResponse<Course[]>> {
    // TODO: Replace with real API call
    // return get<Course[]>('/courses', { params });
    throw new Error('Not implemented — course.getAll');
  },

  /**
   * Get a single course by ID.
   */
  async getById(_id: number): Promise<ApiResponse<Course>> {
    // TODO: Replace with real API call
    // return get<Course>(`/courses/${id}`);
    throw new Error('Not implemented — course.getById');
  },

  /**
   * Get lessons for a course.
   */
  async getLessons(_courseId: number): Promise<ApiResponse<Lesson[]>> {
    // TODO: Replace with real API call
    // return get<Lesson[]>(`/courses/${courseId}/lessons`);
    throw new Error('Not implemented — course.getLessons');
  },

  /**
   * Create a new course.
   */
  async create(_data: Partial<Course>): Promise<ApiResponse<Course>> {
    // TODO: Replace with real API call
    // return post<Course>('/courses', data);
    throw new Error('Not implemented — course.create');
  },

  /**
   * Update an existing course.
   */
  async update(_id: number, _data: Partial<Course>): Promise<ApiResponse<Course>> {
    // TODO: Replace with real API call
    // return put<Course>(`/courses/${id}`, data);
    throw new Error('Not implemented — course.update');
  },

  /**
   * Delete a course.
   */
  async delete(_id: number): Promise<ApiResponse<null>> {
    // TODO: Replace with real API call
    // return del<null>(`/courses/${id}`);
    throw new Error('Not implemented — course.delete');
  },

  /**
   * Get all categories.
   */
  async getCategories(): Promise<ApiResponse<Category[]>> {
    // TODO: Replace with real API call
    // return get<Category[]>('/categories');
    throw new Error('Not implemented — course.getCategories');
  },
};

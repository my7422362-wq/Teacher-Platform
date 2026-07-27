import type { ApiResponse, Course, Lesson, Category } from '@/types';

const BASE = '/courses';

export const courseService = {
  /**
   * Get all courses (with optional filters).
   */
  async getAll(params?: Record<string, unknown>): Promise<ApiResponse<Course[]>> {
    // TODO: Replace with real API call
    // return get<Course[]>(BASE, { params });
    throw new Error('Not implemented — course.getAll');
  },

  /**
   * Get a single course by ID.
   */
  async getById(id: number): Promise<ApiResponse<Course>> {
    // TODO: Replace with real API call
    // return get<Course>(`${BASE}/${id}`);
    throw new Error('Not implemented — course.getById');
  },

  /**
   * Get lessons for a course.
   */
  async getLessons(courseId: number): Promise<ApiResponse<Lesson[]>> {
    // TODO: Replace with real API call
    // return get<Lesson[]>(`${BASE}/${courseId}/lessons`);
    throw new Error('Not implemented — course.getLessons');
  },

  /**
   * Create a new course.
   */
  async create(data: Partial<Course>): Promise<ApiResponse<Course>> {
    // TODO: Replace with real API call
    // return post<Course>(BASE, data);
    throw new Error('Not implemented — course.create');
  },

  /**
   * Update an existing course.
   */
  async update(id: number, data: Partial<Course>): Promise<ApiResponse<Course>> {
    // TODO: Replace with real API call
    // return put<Course>(`${BASE}/${id}`, data);
    throw new Error('Not implemented — course.update');
  },

  /**
   * Delete a course.
   */
  async delete(id: number): Promise<ApiResponse<null>> {
    // TODO: Replace with real API call
    // return del<null>(`${BASE}/${id}`);
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


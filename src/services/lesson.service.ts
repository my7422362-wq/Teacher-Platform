import type { ApiResponse, Lesson } from '@/types';

const BASE = '/lessons';

export const lessonService = {
  /**
   * Get all lessons for a course.
   */
  async getAll(courseId: number): Promise<ApiResponse<Lesson[]>> {
    // TODO: Replace with real API call
    // return get<Lesson[]>(`/courses/${courseId}${BASE}`);
    throw new Error('Not implemented — lesson.getAll');
  },

  /**
   * Get a single lesson by ID.
   */
  async getById(id: number): Promise<ApiResponse<Lesson>> {
    // TODO: Replace with real API call
    // return get<Lesson>(`${BASE}/${id}`);
    throw new Error('Not implemented — lesson.getById');
  },

  /**
   * Create a new lesson.
   */
  async create(data: Partial<Lesson>): Promise<ApiResponse<Lesson>> {
    // TODO: Replace with real API call
    // return post<Lesson>(BASE, data);
    throw new Error('Not implemented — lesson.create');
  },

  /**
   * Update an existing lesson.
   */
  async update(id: number, data: Partial<Lesson>): Promise<ApiResponse<Lesson>> {
    // TODO: Replace with real API call
    // return put<Lesson>(`${BASE}/${id}`, data);
    throw new Error('Not implemented — lesson.update');
  },

  /**
   * Delete a lesson.
   */
  async delete(id: number): Promise<ApiResponse<null>> {
    // TODO: Replace with real API call
    // return del<null>(`${BASE}/${id}`);
    throw new Error('Not implemented — lesson.delete');
  },

  /**
   * Reorder lessons (batch update positions).
   */
  async reorder(items: { id: number; order: number }[]): Promise<ApiResponse<Lesson[]>> {
    // TODO: Replace with real API call
    // return put<Lesson[]>(`${BASE}/reorder`, { items });
    throw new Error('Not implemented — lesson.reorder');
  },
};


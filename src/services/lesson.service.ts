import type { ApiResponse, Lesson } from '@/types';

export const lessonService = {
  /**
   * Get all lessons for a course.
   */
  async getAll(_courseId: number): Promise<ApiResponse<Lesson[]>> {
    // TODO: Replace with real API call
    // return get<Lesson[]>(`/courses/${courseId}/lessons`);
    throw new Error('Not implemented — lesson.getAll');
  },

  /**
   * Get a single lesson by ID.
   */
  async getById(_id: number): Promise<ApiResponse<Lesson>> {
    // TODO: Replace with real API call
    // return get<Lesson>(`/lessons/${id}`);
    throw new Error('Not implemented — lesson.getById');
  },

  /**
   * Create a new lesson.
   */
  async create(_data: Partial<Lesson>): Promise<ApiResponse<Lesson>> {
    // TODO: Replace with real API call
    // return post<Lesson>('/lessons', data);
    throw new Error('Not implemented — lesson.create');
  },

  /**
   * Update an existing lesson.
   */
  async update(_id: number, _data: Partial<Lesson>): Promise<ApiResponse<Lesson>> {
    // TODO: Replace with real API call
    // return put<Lesson>(`/lessons/${id}`, data);
    throw new Error('Not implemented — lesson.update');
  },

  /**
   * Delete a lesson.
   */
  async delete(_id: number): Promise<ApiResponse<null>> {
    // TODO: Replace with real API call
    // return del<null>(`/lessons/${id}`);
    throw new Error('Not implemented — lesson.delete');
  },

  /**
   * Reorder lessons (batch update positions).
   */
  async reorder(_items: { id: number; order: number }[]): Promise<ApiResponse<Lesson[]>> {
    // TODO: Replace with real API call
    // return put<Lesson[]>('/lessons/reorder', { items });
    throw new Error('Not implemented — lesson.reorder');
  },
};

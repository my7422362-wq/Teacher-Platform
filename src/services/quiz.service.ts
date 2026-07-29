import type { ApiResponse, Quiz, Answer } from '@/types';

export const quizService = {
  /**
   * Get all quizzes for a course.
   */
  async getAll(_courseId: number): Promise<ApiResponse<Quiz[]>> {
    // TODO: Replace with real API call
    // return get<Quiz[]>(`/courses/${courseId}/quizzes`);
    throw new Error('Not implemented — quiz.getAll');
  },

  /**
   * Get a single quiz by ID (includes questions).
   */
  async getById(_id: number): Promise<ApiResponse<Quiz>> {
    // TODO: Replace with real API call
    // return get<Quiz>(`/quizzes/${id}`);
    throw new Error('Not implemented — quiz.getById');
  },

  /**
   * Create a new quiz.
   */
  async create(_data: Partial<Quiz>): Promise<ApiResponse<Quiz>> {
    // TODO: Replace with real API call
    // return post<Quiz>('/quizzes', data);
    throw new Error('Not implemented — quiz.create');
  },

  /**
   * Update an existing quiz.
   */
  async update(_id: number, _data: Partial<Quiz>): Promise<ApiResponse<Quiz>> {
    // TODO: Replace with real API call
    // return put<Quiz>(`/quizzes/${id}`, data);
    throw new Error('Not implemented — quiz.update');
  },

  /**
   * Delete a quiz.
   */
  async delete(_id: number): Promise<ApiResponse<null>> {
    // TODO: Replace with real API call
    // return del<null>(`/quizzes/${id}`);
    throw new Error('Not implemented — quiz.delete');
  },

  /**
   * Submit a quiz attempt.
   */
  async submit(_quizId: number, _data: { answers: Partial<Answer>[] }): Promise<ApiResponse<{ score: number; passed: boolean }>> {
    // TODO: Replace with real API call
    // return post<{ score: number; passed: boolean }>(`/quizzes/${quizId}/submit`, data);
    throw new Error('Not implemented — quiz.submit');
  },

  /**
   * Grade a quiz submission (teacher).
   */
  async grade(_submissionId: number, _data: { score: number; feedback?: string }): Promise<ApiResponse<Answer>> {
    // TODO: Replace with real API call
    // return post<Answer>(`/quizzes/submissions/${submissionId}/grade`, data);
    throw new Error('Not implemented — quiz.grade');
  },
};

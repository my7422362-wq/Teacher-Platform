import type { ApiResponse, Quiz, Answer } from '@/types';

const BASE = '/quizzes';

export const quizService = {
  /**
   * Get all quizzes for a course.
   */
  async getAll(courseId: number): Promise<ApiResponse<Quiz[]>> {
    // TODO: Replace with real API call
    // return get<Quiz[]>(`/courses/${courseId}${BASE}`);
    throw new Error('Not implemented — quiz.getAll');
  },

  /**
   * Get a single quiz by ID (includes questions).
   */
  async getById(id: number): Promise<ApiResponse<Quiz>> {
    // TODO: Replace with real API call
    // return get<Quiz>(`${BASE}/${id}`);
    throw new Error('Not implemented — quiz.getById');
  },

  /**
   * Create a new quiz.
   */
  async create(data: Partial<Quiz>): Promise<ApiResponse<Quiz>> {
    // TODO: Replace with real API call
    // return post<Quiz>(BASE, data);
    throw new Error('Not implemented — quiz.create');
  },

  /**
   * Update an existing quiz.
   */
  async update(id: number, data: Partial<Quiz>): Promise<ApiResponse<Quiz>> {
    // TODO: Replace with real API call
    // return put<Quiz>(`${BASE}/${id}`, data);
    throw new Error('Not implemented — quiz.update');
  },

  /**
   * Delete a quiz.
   */
  async delete(id: number): Promise<ApiResponse<null>> {
    // TODO: Replace with real API call
    // return del<null>(`${BASE}/${id}`);
    throw new Error('Not implemented — quiz.delete');
  },

  /**
   * Submit a quiz attempt.
   */
  async submit(quizId: number, data: { answers: Partial<Answer>[] }): Promise<ApiResponse<{ score: number; passed: boolean }>> {
    // TODO: Replace with real API call
    // return post<{ score: number; passed: boolean }>(`${BASE}/${quizId}/submit`, data);
    throw new Error('Not implemented — quiz.submit');
  },

  /**
   * Grade a quiz submission (teacher).
   */
  async grade(submissionId: number, data: { score: number; feedback?: string }): Promise<ApiResponse<Answer>> {
    // TODO: Replace with real API call
    // return post<Answer>(`${BASE}/submissions/${submissionId}/grade`, data);
    throw new Error('Not implemented — quiz.grade');
  },
};


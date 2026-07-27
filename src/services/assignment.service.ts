import type { ApiResponse, Assignment, Submission } from '@/types';

const BASE = '/assignments';

export const assignmentService = {
  /**
   * Get all assignments for a course.
   */
  async getAll(courseId: number): Promise<ApiResponse<Assignment[]>> {
    // TODO: Replace with real API call
    // return get<Assignment[]>(`/courses/${courseId}${BASE}`);
    throw new Error('Not implemented — assignment.getAll');
  },

  /**
   * Get a single assignment by ID.
   */
  async getById(id: number): Promise<ApiResponse<Assignment>> {
    // TODO: Replace with real API call
    // return get<Assignment>(`${BASE}/${id}`);
    throw new Error('Not implemented — assignment.getById');
  },

  /**
   * Create a new assignment.
   */
  async create(data: Partial<Assignment>): Promise<ApiResponse<Assignment>> {
    // TODO: Replace with real API call
    // return post<Assignment>(BASE, data);
    throw new Error('Not implemented — assignment.create');
  },

  /**
   * Update an existing assignment.
   */
  async update(id: number, data: Partial<Assignment>): Promise<ApiResponse<Assignment>> {
    // TODO: Replace with real API call
    // return put<Assignment>(`${BASE}/${id}`, data);
    throw new Error('Not implemented — assignment.update');
  },

  /**
   * Delete an assignment.
   */
  async delete(id: number): Promise<ApiResponse<null>> {
    // TODO: Replace with real API call
    // return del<null>(`${BASE}/${id}`);
    throw new Error('Not implemented — assignment.delete');
  },

  /**
   * Submit an assignment (student).
   */
  async submit(assignmentId: number, data: FormData | Partial<Submission>): Promise<ApiResponse<Submission>> {
    // TODO: Replace with real API call
    // return post<Submission>(`${BASE}/${assignmentId}/submit`, data, {
    //   headers: data instanceof FormData ? { 'Content-Type': 'multipart/form-data' } : undefined,
    // });
    throw new Error('Not implemented — assignment.submit');
  },

  /**
   * Grade a submission (teacher).
   */
  async grade(submissionId: number, data: { score: number; feedback?: string }): Promise<ApiResponse<Submission>> {
    // TODO: Replace with real API call
    // return post<Submission>(`${BASE}/submissions/${submissionId}/grade`, data);
    throw new Error('Not implemented — assignment.grade');
  },
};


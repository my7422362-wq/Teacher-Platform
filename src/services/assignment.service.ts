import type { ApiResponse, Assignment, Submission } from '@/types';

export const assignmentService = {
  /**
   * Get all assignments for a course.
   */
  async getAll(_courseId: number): Promise<ApiResponse<Assignment[]>> {
    // TODO: Replace with real API call
    // return get<Assignment[]>(`/courses/${courseId}/assignments`);
    throw new Error('Not implemented — assignment.getAll');
  },

  /**
   * Get a single assignment by ID.
   */
  async getById(_id: number): Promise<ApiResponse<Assignment>> {
    // TODO: Replace with real API call
    // return get<Assignment>(`/assignments/${id}`);
    throw new Error('Not implemented — assignment.getById');
  },

  /**
   * Create a new assignment.
   */
  async create(_data: Partial<Assignment>): Promise<ApiResponse<Assignment>> {
    // TODO: Replace with real API call
    // return post<Assignment>('/assignments', data);
    throw new Error('Not implemented — assignment.create');
  },

  /**
   * Update an existing assignment.
   */
  async update(_id: number, _data: Partial<Assignment>): Promise<ApiResponse<Assignment>> {
    // TODO: Replace with real API call
    // return put<Assignment>(`/assignments/${id}`, data);
    throw new Error('Not implemented — assignment.update');
  },

  /**
   * Delete an assignment.
   */
  async delete(_id: number): Promise<ApiResponse<null>> {
    // TODO: Replace with real API call
    // return del<null>(`/assignments/${id}`);
    throw new Error('Not implemented — assignment.delete');
  },

  /**
   * Submit an assignment (student).
   */
  async submit(_assignmentId: number, _data: FormData | Partial<Submission>): Promise<ApiResponse<Submission>> {
    // TODO: Replace with real API call
    // return post<Submission>(`/assignments/${assignmentId}/submit`, data, {
    //   headers: data instanceof FormData ? { 'Content-Type': 'multipart/form-data' } : undefined,
    // });
    throw new Error('Not implemented — assignment.submit');
  },

  /**
   * Grade a submission (teacher).
   */
  async grade(_submissionId: number, _data: { score: number; feedback?: string }): Promise<ApiResponse<Submission>> {
    // TODO: Replace with real API call
    // return post<Submission>(`/assignments/submissions/${submissionId}/grade`, data);
    throw new Error('Not implemented — assignment.grade');
  },
};

import axios from 'axios';
import api from '@/services/api';
import i18n from '@/i18n/config';
import { decodeQuestions } from '@/features/teacher/components/QuizzesExams/question-codec';
import type {
  TeacherExam,
  TeacherExamFormValues,
  ExamQuestion,
  ExamAttempt,
  AttemptProgress,
  AttemptSummary,
} from '@/features/teacher/components/QuizzesExams/types';

interface ExamResourceDto {
  id: number;
  course_id: number;
  title: string;
  description: string | null;
  start_date: string;
  end_date: string;
  duration_minutes: number;
  passing_score: number;
  questions: unknown[] | null;
  created_at: string | null;
}

interface ExamListResourceDto extends ExamResourceDto {
  course: { id: number; title: string; slug: string };
  questions_count: number;
}

interface ExamAttemptDto {
  id: number;
  exam_id: number;
  user_id: number;
  answers: unknown;
  score: number;
  status: string;
  started_at: string;
  submitted_at: string | null;
}

interface AttemptSummaryDto {
  attemptId?: number;
  submissionId?: number;
  attemptNumber?: number;
  score: number;
  rawScore?: number;
  totalScore?: number;
  passed?: boolean;
  status?: string;
  feedback?: string | null;
  submittedAt: string | null;
}

interface ExamProgressDto {
  alreadyAttempted: boolean;
  attemptsUsed: number;
  maxAttempts: number;
  remainingAttempts: number;
  canAttempt: boolean;
  bestResult: AttemptSummaryDto | null;
  latestAttempt: AttemptSummaryDto | null;
  attempts: AttemptSummaryDto[];
}

function mapAttemptSummary(dto: AttemptSummaryDto): AttemptSummary {
  return {
    id: dto.attemptId ?? dto.submissionId ?? 0,
    attemptNumber: dto.attemptNumber,
    score: dto.score,
    rawScore: dto.rawScore,
    totalScore: dto.totalScore,
    passed: dto.passed ?? dto.status === 'passed',
    status: dto.status ?? (dto.passed ? 'passed' : 'failed'),
    feedback: dto.feedback,
    submittedAt: dto.submittedAt,
  };
}

function mapProgress(dto: ExamProgressDto): AttemptProgress {
  return {
    alreadyAttempted: dto.alreadyAttempted,
    attemptsUsed: dto.attemptsUsed,
    maxAttempts: dto.maxAttempts,
    remainingAttempts: dto.remainingAttempts,
    canAttempt: dto.canAttempt,
    bestResult: dto.bestResult ? mapAttemptSummary(dto.bestResult) : null,
    latestAttempt: dto.latestAttempt ? mapAttemptSummary(dto.latestAttempt) : null,
    attempts: dto.attempts.map(mapAttemptSummary),
  };
}

function mapExam(dto: ExamResourceDto): TeacherExam {
  return {
    id: dto.id,
    courseId: dto.course_id,
    title: dto.title,
    description: dto.description,
    startDate: dto.start_date,
    endDate: dto.end_date,
    durationMinutes: dto.duration_minutes,
    passingScore: dto.passing_score,
    questions: decodeQuestions<ExamQuestion>(dto.questions),
    createdAt: dto.created_at,
  };
}

function mapExamListItem(dto: ExamListResourceDto): TeacherExam {
  return {
    ...mapExam(dto),
    questionsCount: dto.questions_count,
  };
}

function mapAttempt(dto: ExamAttemptDto): ExamAttempt {
  return {
    id: dto.id,
    examId: dto.exam_id,
    userId: dto.user_id,
    answers: dto.answers,
    score: dto.score,
    status: dto.status,
    startedAt: dto.started_at,
    submittedAt: dto.submitted_at,
  };
}

function extractErrorMessage(error: unknown, fallback: string): string {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as { message?: string; errors?: Record<string, string[]> } | undefined;
    const firstValidationError = data?.errors && Object.values(data.errors)[0]?.[0];
    if (firstValidationError) return firstValidationError;
    if (data?.message) return data.message;
  }
  return fallback;
}

export const teacherExamService = {
  /** Course-scoped listing (course identified by slug) — there is no global "list all exams" endpoint. */
  async listByCourse(courseSlug: string): Promise<TeacherExam[]> {
    try {
      const { data } = await api.get<{ data: ExamListResourceDto[] }>(`/courses/${courseSlug}/exams`);
      return data.data.map(mapExamListItem);
    } catch (error) {
      throw new Error(extractErrorMessage(error, i18n.t('teacherPages.quizzesExams.toast.loadFailed')));
    }
  },

  async getById(examId: number): Promise<TeacherExam> {
    try {
      const { data } = await api.get<{ data: ExamResourceDto }>(`/exams/${examId}`);
      return mapExam(data.data);
    } catch (error) {
      throw new Error(extractErrorMessage(error, i18n.t('teacherPages.quizzesExams.toast.loadFailed')));
    }
  },

  /** GET /exams/{exam}/progress — the current user's own server-verified
   *  attempt for this exam (maxAttempts is always 1). */
  async getProgress(examId: number): Promise<AttemptProgress> {
    try {
      const { data } = await api.get<{ data: ExamProgressDto }>(`/exams/${examId}/progress`);
      return mapProgress(data.data);
    } catch (error) {
      throw new Error(extractErrorMessage(error, i18n.t('teacherPages.quizzesExams.toast.loadFailed')));
    }
  },

  async create(values: TeacherExamFormValues): Promise<TeacherExam> {
    try {
      const { data } = await api.post<{ data: ExamResourceDto }>('/exams', {
        course_id: values.courseId,
        title: values.title,
        description: values.description || null,
        start_date: values.startDate,
        end_date: values.endDate,
        duration_minutes: values.durationMinutes,
        passing_score: values.passingScore,
      });
      return mapExam(data.data);
    } catch (error) {
      throw new Error(extractErrorMessage(error, i18n.t('teacherPages.quizzesExams.toast.examSaveFailed')));
    }
  },

  async update(examId: number, values: TeacherExamFormValues): Promise<TeacherExam> {
    try {
      const { data } = await api.put<{ data: ExamResourceDto }>(`/exams/${examId}`, {
        title: values.title,
        description: values.description || null,
        start_date: values.startDate,
        end_date: values.endDate,
        duration_minutes: values.durationMinutes,
        passing_score: values.passingScore,
      });
      return mapExam(data.data);
    } catch (error) {
      throw new Error(extractErrorMessage(error, i18n.t('teacherPages.quizzesExams.toast.examSaveFailed')));
    }
  },

  async remove(examId: number): Promise<void> {
    try {
      await api.delete(`/exams/${examId}`);
    } catch (error) {
      throw new Error(extractErrorMessage(error, i18n.t('teacherPages.quizzesExams.toast.examDeleteFailed')));
    }
  },

  /** No per-question endpoints exist for exams (unlike quizzes) — the
   *  backend stores whatever's sent under `questions` as-is, so the whole
   *  array is replaced wholesale. Sent as plain objects, not JSON strings. */
  async saveQuestions(examId: number, questions: ExamQuestion[]): Promise<TeacherExam> {
    try {
      const { data } = await api.put<{ data: ExamResourceDto }>(`/exams/${examId}`, {
        questions,
      });
      return mapExam(data.data);
    } catch (error) {
      throw new Error(extractErrorMessage(error, i18n.t('teacherPages.quizzesExams.toast.examSaveFailed')));
    }
  },

  /** Student-facing — POST /exams/{exam}/attempt. Single attempt, only
   *  within [start_date, end_date] — both enforced server-side; the
   *  backend rejects a second attempt or one outside the window with a 400. */
  async attempt(examId: number, answers: string[]): Promise<{ attempt: ExamAttempt; progress: AttemptProgress }> {
    try {
      const { data } = await api.post<{ message: string; attempt: ExamAttemptDto; progress: ExamProgressDto }>(
        `/exams/${examId}/attempt`,
        { answers }
      );
      return { attempt: mapAttempt(data.attempt), progress: mapProgress(data.progress) };
    } catch (error) {
      throw new Error(extractErrorMessage(error, i18n.t('studentPages.dashboard.exams.toast.submitFailed')));
    }
  },

  /** Read-only — the backend has no manual-grade endpoint for exam attempts (auto-graded, mc/true_false only). */
  async listAttempts(examId: number): Promise<ExamAttempt[]> {
    try {
      const { data } = await api.get<{ data: ExamAttemptDto[] }>(`/exams/${examId}/attempts`);
      return data.data.map(mapAttempt);
    } catch (error) {
      throw new Error(extractErrorMessage(error, i18n.t('teacherPages.quizzesExams.toast.loadFailed')));
    }
  },
};

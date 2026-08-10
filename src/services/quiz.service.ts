import axios from 'axios';
import api from '@/services/api';
import i18n from '@/i18n/config';
import { decodeQuestions } from '@/features/teacher/components/QuizzesExams/question-codec';
import type {
  TeacherQuiz,
  TeacherQuizFormValues,
  QuizQuestion,
  QuizSubmission,
  AttemptProgress,
  AttemptSummary,
} from '@/features/teacher/components/QuizzesExams/types';

interface QuizResourceDto {
  id: number;
  course_section_id: number | null;
  course_id: number | null;
  lesson_id: number | null;
  max_attempts: number;
  is_published: boolean;
  title: string;
  description: string | null;
  passing_score: number;
  time_limit: number;
  questions: unknown[] | null;
  created_at: string | null;
}

interface QuizListResourceDto extends QuizResourceDto {
  section: { id: number; course_id: number; title: string } | null;
  questions_count: number;
}

interface QuizSubmissionDto {
  id: number;
  quiz_id: number;
  user_id: number;
  answers: unknown;
  score: number;
  total_score: number;
  status: string;
  feedback: string | null;
  created_at: string | null;
}

interface AttemptSummaryDto {
  submissionId?: number;
  attemptId?: number;
  attemptNumber?: number;
  score: number;
  rawScore?: number;
  totalScore?: number;
  passed?: boolean;
  status?: string;
  feedback?: string | null;
  submittedAt: string | null;
}

interface QuizProgressDto {
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
    id: dto.submissionId ?? dto.attemptId ?? 0,
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

function mapProgress(dto: QuizProgressDto): AttemptProgress {
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

function mapQuiz(dto: QuizResourceDto): TeacherQuiz {
  return {
    id: dto.id,
    courseSectionId: dto.course_section_id,
    courseId: dto.course_id,
    lessonId: dto.lesson_id,
    maxAttempts: dto.max_attempts,
    isPublished: dto.is_published,
    title: dto.title,
    description: dto.description,
    passingScore: dto.passing_score,
    timeLimit: dto.time_limit,
    questions: decodeQuestions<QuizQuestion>(dto.questions),
    createdAt: dto.created_at,
  };
}

function mapQuizListItem(dto: QuizListResourceDto): TeacherQuiz {
  return {
    ...mapQuiz(dto),
    courseId: dto.course_id ?? dto.section?.course_id ?? null,
    sectionTitle: dto.section?.title,
    questionsCount: dto.questions_count,
  };
}

function mapSubmission(dto: QuizSubmissionDto): QuizSubmission {
  return {
    id: dto.id,
    quizId: dto.quiz_id,
    userId: dto.user_id,
    answers: dto.answers,
    score: dto.score,
    totalScore: dto.total_score,
    status: dto.status,
    feedback: dto.feedback,
    createdAt: dto.created_at,
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

export const teacherQuizService = {
  /** Course-scoped listing (course identified by slug) — there is no global "list all quizzes" endpoint. */
  async listByCourse(courseSlug: string): Promise<TeacherQuiz[]> {
    try {
      const { data } = await api.get<{ data: QuizListResourceDto[] }>(`/courses/${courseSlug}/quizzes`);
      return data.data.map(mapQuizListItem);
    } catch (error) {
      throw new Error(extractErrorMessage(error, i18n.t('teacherPages.quizzesExams.toast.loadFailed')));
    }
  },

  async getById(quizId: number): Promise<TeacherQuiz> {
    try {
      const { data } = await api.get<{ data: QuizResourceDto }>(`/quizzes/${quizId}`);
      return mapQuiz(data.data);
    } catch (error) {
      throw new Error(extractErrorMessage(error, i18n.t('teacherPages.quizzesExams.toast.loadFailed')));
    }
  },

  /** GET /quizzes/{quiz}/progress — the current user's own server-verified
   *  attempt history for this quiz (works for students taking it and
   *  reflects real DB state, not a client-side guess). */
  async getProgress(quizId: number): Promise<AttemptProgress> {
    try {
      const { data } = await api.get<{ data: QuizProgressDto }>(`/quizzes/${quizId}/progress`);
      return mapProgress(data.data);
    } catch (error) {
      throw new Error(extractErrorMessage(error, i18n.t('teacherPages.quizzesExams.toast.loadFailed')));
    }
  },

  async create(values: TeacherQuizFormValues): Promise<TeacherQuiz> {
    try {
      const { data } = await api.post<{ data: QuizResourceDto }>('/quizzes', {
        course_section_id: values.courseSectionId,
        title: values.title,
        description: values.description || null,
        passing_score: values.passingScore,
        time_limit: values.timeLimit,
        max_attempts: values.maxAttempts,
        is_published: values.isPublished,
      });
      return mapQuiz(data.data);
    } catch (error) {
      throw new Error(extractErrorMessage(error, i18n.t('teacherPages.quizzesExams.toast.quizSaveFailed')));
    }
  },

  async update(quizId: number, values: TeacherQuizFormValues): Promise<TeacherQuiz> {
    try {
      const { data } = await api.put<{ data: QuizResourceDto }>(`/quizzes/${quizId}`, {
        title: values.title,
        description: values.description || null,
        passing_score: values.passingScore,
        time_limit: values.timeLimit,
        max_attempts: values.maxAttempts,
        is_published: values.isPublished,
      });
      return mapQuiz(data.data);
    } catch (error) {
      throw new Error(extractErrorMessage(error, i18n.t('teacherPages.quizzesExams.toast.quizSaveFailed')));
    }
  },

  async remove(quizId: number): Promise<void> {
    try {
      await api.delete(`/quizzes/${quizId}`);
    } catch (error) {
      throw new Error(extractErrorMessage(error, i18n.t('teacherPages.quizzesExams.toast.quizDeleteFailed')));
    }
  },

  /** Real per-question REST endpoints — the backend assigns integer ids
   *  itself, so new questions are sent without an id. */
  async addQuestion(quizId: number, question: Omit<QuizQuestion, 'id'>): Promise<TeacherQuiz> {
    try {
      const { data } = await api.post<{ message: string; data: QuizResourceDto }>(`/quizzes/${quizId}/questions`, {
        text: question.text,
        type: question.type,
        options: question.options,
        correctAnswer: question.correctAnswer,
        points: question.points,
      });
      return mapQuiz(data.data);
    } catch (error) {
      throw new Error(extractErrorMessage(error, i18n.t('teacherPages.quizzesExams.toast.quizSaveFailed')));
    }
  },

  async updateQuestion(quizId: number, questionId: number, question: Omit<QuizQuestion, 'id'>): Promise<TeacherQuiz> {
    try {
      const { data } = await api.put<{ message: string; data: QuizResourceDto }>(
        `/quizzes/${quizId}/questions/${questionId}`,
        {
          text: question.text,
          type: question.type,
          options: question.options,
          correctAnswer: question.correctAnswer,
          points: question.points,
        }
      );
      return mapQuiz(data.data);
    } catch (error) {
      throw new Error(extractErrorMessage(error, i18n.t('teacherPages.quizzesExams.toast.quizSaveFailed')));
    }
  },

  async removeQuestion(quizId: number, questionId: number): Promise<TeacherQuiz> {
    try {
      const { data } = await api.delete<{ message: string; data: QuizResourceDto }>(
        `/quizzes/${quizId}/questions/${questionId}`
      );
      return mapQuiz(data.data);
    } catch (error) {
      throw new Error(extractErrorMessage(error, i18n.t('teacherPages.quizzesExams.toast.quizDeleteFailed')));
    }
  },

  /** Student-facing — POST /quizzes/{quiz}/submit. Answers are positional
   *  (index-matched to the quiz's questions array). The top-level response
   *  score/totalScore are RAW POINTS — use the returned progress for a
   *  percentage/pass-fail view. */
  async submit(quizId: number, answers: string[]): Promise<{ submission: QuizSubmission; progress: AttemptProgress }> {
    try {
      const { data } = await api.post<{
        message: string;
        data: {
          id: number;
          quizId: number;
          userId: number;
          attemptNumber: number;
          score: number;
          totalScore: number;
          status: string;
          submittedAt: string | null;
        };
        progress: QuizProgressDto;
      }>(`/quizzes/${quizId}/submit`, { answers });
      return {
        submission: {
          id: data.data.id,
          quizId: data.data.quizId,
          userId: data.data.userId,
          answers,
          score: data.data.score,
          totalScore: data.data.totalScore,
          status: data.data.status,
          feedback: null,
          createdAt: data.data.submittedAt,
        },
        progress: mapProgress(data.progress),
      };
    } catch (error) {
      throw new Error(extractErrorMessage(error, i18n.t('studentPages.dashboard.quizzes.toast.submitFailed')));
    }
  },

  async listSubmissions(quizId: number): Promise<QuizSubmission[]> {
    try {
      const { data } = await api.get<{ data: QuizSubmissionDto[] }>(`/quizzes/${quizId}/submissions`);
      return data.data.map(mapSubmission);
    } catch (error) {
      throw new Error(extractErrorMessage(error, i18n.t('teacherPages.quizzesExams.toast.loadFailed')));
    }
  },

  /** score is RAW POINTS compared against the submission's own totalScore
   *  server-side — not a 0-100 percentage. */
  async gradeSubmission(submissionId: number, score: number, feedback?: string): Promise<QuizSubmission> {
    try {
      const { data } = await api.post<{ message: string; submission: QuizSubmissionDto }>(
        `/quizzes/submissions/${submissionId}/grade`,
        { score, feedback: feedback || undefined }
      );
      return mapSubmission(data.submission);
    } catch (error) {
      throw new Error(extractErrorMessage(error, i18n.t('teacherPages.quizzesExams.toast.gradeFailed')));
    }
  },
};

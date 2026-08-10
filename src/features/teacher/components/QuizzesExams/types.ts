/**
 * Real backend shapes for Quiz/Exam.
 *
 * IMPORTANT — `questions` shape: quizzes now have dedicated per-question
 * REST endpoints (POST/PUT/DELETE /quizzes/{quiz}/questions/{question})
 * with server-managed integer ids, so QuizQuestion.id is a real number.
 * Exams have no such endpoints — their `questions` field is still a bulk
 * JSON blob replaced wholesale via PUT /exams/{exam}, so ExamQuestion.id
 * stays a client-generated string (the backend stores it as-is, no
 * coercion). Don't unify these two id types — they have different real
 * backend semantics now.
 *
 * IMPORTANT — score units are inconsistent between endpoints, confirmed
 * from the real controller source:
 *  - Quiz submit's top-level `data.score`/`data.totalScore` are RAW POINTS
 *    (not a percentage).
 *  - Quiz/Exam `progress` payloads (bestResult/latestAttempt/attempts[])
 *    report `score` as a PERCENTAGE (0-100), matching passing_score's
 *    0-100 scale — always prefer these for display.
 *  - Exam attempt's `attempt.score` is already a percentage.
 *  - Teacher's GET /quizzes/{quiz}/submissions returns raw Eloquent rows
 *    (score = raw points, total_score = raw max) — NOT a percentage.
 */

export type QuestionType = 'multiple_choice' | 'true_false' | 'short_answer' | 'essay';

export interface QuizQuestion {
  id: number;
  text: string;
  type: QuestionType;
  options: string[];
  correctAnswer: string;
  points: number;
}

export interface TeacherQuiz {
  id: number;
  courseSectionId: number | null;
  courseId: number | null;
  lessonId: number | null;
  maxAttempts: number;
  isPublished: boolean;
  /** Only populated when fetched via listByCourse (course-scoped listing). */
  sectionTitle?: string;
  /** Only populated when fetched via listByCourse. */
  questionsCount?: number;
  title: string;
  description: string | null;
  passingScore: number;
  timeLimit: number;
  questions: QuizQuestion[];
  createdAt: string | null;
}

export interface TeacherQuizFormValues {
  title: string;
  description: string;
  courseSectionId: number;
  passingScore: number;
  timeLimit: number;
  maxAttempts: number;
  isPublished: boolean;
}

/** Exams only support auto-gradable question types (no manual-grade endpoint exists for exams). */
export type ExamQuestionType = 'multiple_choice' | 'true_false';

export interface ExamQuestion {
  id: string;
  text: string;
  type: ExamQuestionType;
  options: string[];
  correctAnswer: string;
  points: number;
}

export interface TeacherExam {
  id: number;
  courseId: number;
  /** Only populated when fetched via listByCourse. */
  questionsCount?: number;
  title: string;
  description: string | null;
  startDate: string;
  endDate: string;
  durationMinutes: number;
  passingScore: number;
  questions: ExamQuestion[];
  createdAt: string | null;
}

export interface TeacherExamFormValues {
  title: string;
  description: string;
  courseId: number;
  startDate: string;
  endDate: string;
  durationMinutes: number;
  passingScore: number;
}

export interface QuizSubmission {
  id: number;
  quizId: number;
  userId: number;
  answers: unknown;
  /** Raw points as stored — NOT a percentage. Compare against totalScore, not passingScore. */
  score: number;
  totalScore: number;
  status: string;
  feedback: string | null;
  createdAt: string | null;
}

export interface ExamAttempt {
  id: number;
  examId: number;
  userId: number;
  answers: unknown;
  /** Already a percentage (0-100). */
  score: number;
  status: string;
  startedAt: string;
  submittedAt: string | null;
}

/** GET /quizzes/{quiz}/progress and GET /exams/{exam}/progress — the
 *  authoritative, server-verified record of the current user's own
 *  attempts. Both endpoints return this same shape (id field renamed per
 *  caller). Scores inside are percentages (0-100). */
export interface AttemptSummary {
  id: number;
  attemptNumber?: number;
  score: number;
  rawScore?: number;
  totalScore?: number;
  passed: boolean;
  status: string;
  feedback?: string | null;
  submittedAt: string | null;
}

export interface AttemptProgress {
  alreadyAttempted: boolean;
  attemptsUsed: number;
  maxAttempts: number;
  remainingAttempts: number;
  canAttempt: boolean;
  bestResult: AttemptSummary | null;
  latestAttempt: AttemptSummary | null;
  attempts: AttemptSummary[];
}

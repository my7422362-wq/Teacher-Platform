import {
  mockCourses,
  mockProgress,
  mockAssignments,
  mockCertificates,
  mockNotifications,
  mockUsers,
  mockSubmissions,
  mockPayments,
  mockQuizzes,
  mockExams,
  mockQuizSubmissions,
  mockExamAttempts,
  mockRevisionMaterials,
} from '@/mock';
import type { Course, Progress } from '@/types';
import { getLocalQuizSubmissions, getLocalExamAttempts } from './submissions-store';

/**
 * The real auth session (string UUIDs) isn't linked to the numeric mock
 * dataset yet, so the dashboard renders against this fixed demo student
 * until a backend/auth bridge exists.
 */
export const CURRENT_STUDENT_ID = 2;

export const currentStudent = mockUsers.find((u) => u.id === CURRENT_STUDENT_ID)!;

export interface EnrolledCourse {
  course: Course;
  progress: Progress;
}

export const enrolledCourses: EnrolledCourse[] = mockProgress
  .filter((p) => p.userId === CURRENT_STUDENT_ID)
  .map((progress) => ({
    course: mockCourses.find((c) => c.id === progress.courseId)!,
    progress,
  }));

export const inProgressCourses = enrolledCourses.filter((e) => !e.progress.isCompleted);
export const completedCourses = enrolledCourses.filter((e) => e.progress.isCompleted);

export const avgProgress = enrolledCourses.length
  ? Math.round(
      enrolledCourses.reduce((sum, e) => sum + e.progress.percentComplete, 0) / enrolledCourses.length
    )
  : 0;

const enrolledCourseIds = new Set(enrolledCourses.map((e) => e.course.id));

export const upcomingAssignments = mockAssignments
  .filter((a) => enrolledCourseIds.has(a.courseId) && new Date(a.dueDate).getTime() > Date.now())
  .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());

export const studentNotifications = mockNotifications
  .filter((n) => n.userId === CURRENT_STUDENT_ID)
  .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

export const studentCertificates = mockCertificates.filter((c) => c.userId === CURRENT_STUDENT_ID);

export interface GradedResult {
  submissionId: number;
  assignmentTitle: string;
  courseName?: string;
  score: number;
  maxScore: number;
  passingScore: number;
  gradedAt: string;
}

export const gradedResults: GradedResult[] = mockSubmissions
  .filter((s) => s.userId === CURRENT_STUDENT_ID && s.status === 'graded' && s.score !== undefined)
  .map((s) => {
    const assignment = mockAssignments.find((a) => a.id === s.assignmentId);
    const course = assignment ? mockCourses.find((c) => c.id === assignment.courseId) : undefined;
    return {
      submissionId: s.id,
      assignmentTitle: s.assignmentTitle ?? assignment?.title ?? '',
      courseName: course?.title,
      score: s.score!,
      maxScore: assignment?.maxScore ?? 100,
      passingScore: assignment?.passingScore ?? 0,
      gradedAt: s.gradedAt ?? s.submittedAt,
    };
  })
  .sort((a, b) => new Date(b.gradedAt).getTime() - new Date(a.gradedAt).getTime());

export const recommendedCourses = mockCourses
  .filter((c) => c.isPublished && !enrolledCourseIds.has(c.id))
  .sort((a, b) => b.rating - a.rating);

export const studentPayments = mockPayments
  .filter((p) => p.userId === CURRENT_STUDENT_ID)
  .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

export const revisionMaterials = mockRevisionMaterials.filter((m) => enrolledCourseIds.has(m.courseId));

function courseName(courseId: number): string | undefined {
  return mockCourses.find((c) => c.id === courseId)?.title;
}

export interface QuizOverview {
  quizId: number;
  title: string;
  courseName?: string;
  questionsCount: number;
  timeLimit: number;
  maxAttempts: number;
  passingScorePercent: number;
  attemptsUsed: number;
  bestScore?: number;
  totalScore?: number;
  lastSubmittedAt?: string;
}

/** Recomputed on every call (not cached) so a freshly taken quiz shows up as soon as the dashboard remounts. */
export function getQuizzesOverview(): QuizOverview[] {
  const submissions = [
    ...mockQuizSubmissions.filter((s) => s.userId === CURRENT_STUDENT_ID),
    ...getLocalQuizSubmissions().filter((s) => s.userId === CURRENT_STUDENT_ID),
  ];

  return mockQuizzes
    .filter((quiz) => enrolledCourseIds.has(quiz.courseId))
    .map((quiz) => {
      const attempts = submissions.filter((s) => s.quizId === quiz.id);
      const best = attempts.reduce<(typeof attempts)[number] | undefined>(
        (acc, s) => (!acc || s.score > acc.score ? s : acc),
        undefined
      );
      return {
        quizId: quiz.id,
        title: quiz.title,
        courseName: courseName(quiz.courseId),
        questionsCount: quiz.questionsCount,
        timeLimit: quiz.timeLimit,
        maxAttempts: quiz.maxAttempts,
        passingScorePercent: quiz.passingScore,
        attemptsUsed: attempts.length,
        bestScore: best?.score,
        totalScore: best?.totalScore,
        lastSubmittedAt: best?.submittedAt,
      };
    });
}

export interface ExamOverview {
  examId: number;
  title: string;
  courseName?: string;
  startDate: string;
  endDate: string;
  duration: number;
  totalScore: number;
  passingScore: number;
  timeStatus: 'upcoming' | 'open' | 'closed';
  score?: number;
}

/** Recomputed on every call so a freshly submitted exam attempt shows up immediately. */
export function getExamsOverview(): ExamOverview[] {
  const attempts = [
    ...mockExamAttempts.filter((a) => a.userId === CURRENT_STUDENT_ID),
    ...getLocalExamAttempts().filter((a) => a.userId === CURRENT_STUDENT_ID),
  ];
  const now = Date.now();

  return mockExams
    .filter((exam) => enrolledCourseIds.has(exam.courseId))
    .map((exam) => {
      const attempt = attempts.find((a) => a.examId === exam.id);
      const start = new Date(exam.startDate).getTime();
      const end = new Date(exam.endDate).getTime();
      const timeStatus: ExamOverview['timeStatus'] = now < start ? 'upcoming' : now > end ? 'closed' : 'open';
      return {
        examId: exam.id,
        title: exam.title,
        courseName: courseName(exam.courseId),
        startDate: exam.startDate,
        endDate: exam.endDate,
        duration: exam.duration,
        totalScore: exam.totalScore,
        passingScore: exam.passingScore,
        timeStatus,
        score: attempt?.score,
      };
    });
}

export interface ScheduleItem {
  id: string;
  kind: 'assignment' | 'exam';
  title: string;
  courseName?: string;
  date: string;
}

/** Merges upcoming assignment due dates with upcoming exam windows into one chronological list. */
export function getSchedule(): ScheduleItem[] {
  const assignmentItems: ScheduleItem[] = upcomingAssignments.map((a) => ({
    id: `assignment-${a.id}`,
    kind: 'assignment',
    title: a.title,
    courseName: courseName(a.courseId),
    date: a.dueDate,
  }));

  const examItems: ScheduleItem[] = mockExams
    .filter((e) => enrolledCourseIds.has(e.courseId) && new Date(e.startDate).getTime() > Date.now())
    .map((e) => ({
      id: `exam-${e.id}`,
      kind: 'exam',
      title: e.title,
      courseName: courseName(e.courseId),
      date: e.startDate,
    }));

  return [...assignmentItems, ...examItems].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
}

export interface GradeItem {
  id: string;
  kind: 'assignment' | 'quiz' | 'exam';
  title: string;
  courseName?: string;
  score: number;
  maxScore: number;
  passingScore: number;
  gradedAt: string;
}

/** Combines assignment, quiz, and exam results into one "Grades" feed, freshest first. */
export function getGrades(): GradeItem[] {
  const assignmentGrades: GradeItem[] = gradedResults.map((r) => ({
    id: `assignment-${r.submissionId}`,
    kind: 'assignment',
    title: r.assignmentTitle,
    courseName: r.courseName,
    score: r.score,
    maxScore: r.maxScore,
    passingScore: r.passingScore,
    gradedAt: r.gradedAt,
  }));

  const quizGrades: GradeItem[] = getQuizzesOverview()
    .filter((q) => q.bestScore !== undefined)
    .map((q) => ({
      id: `quiz-${q.quizId}`,
      kind: 'quiz',
      title: q.title,
      courseName: q.courseName,
      score: q.bestScore!,
      maxScore: q.totalScore!,
      passingScore: Math.round((q.passingScorePercent / 100) * q.totalScore!),
      gradedAt: q.lastSubmittedAt!,
    }));

  const examGrades: GradeItem[] = getExamsOverview()
    .filter((e) => e.score !== undefined)
    .map((e) => ({
      id: `exam-${e.examId}`,
      kind: 'exam',
      title: e.title,
      courseName: e.courseName,
      score: e.score!,
      maxScore: e.totalScore,
      passingScore: e.passingScore,
      gradedAt: e.endDate,
    }));

  return [...assignmentGrades, ...quizGrades, ...examGrades].sort(
    (a, b) => new Date(b.gradedAt).getTime() - new Date(a.gradedAt).getTime()
  );
}

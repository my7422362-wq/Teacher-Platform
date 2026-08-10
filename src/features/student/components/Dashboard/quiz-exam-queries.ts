import { useMutation, useQueries, useQueryClient } from '@tanstack/react-query';
import { teacherQuizService, teacherExamService } from '@/services';
import { useMyCourses } from './queries';

export interface StudentQuizOverview {
  quizId: number;
  title: string;
  courseName: string;
  questionsCount: number;
  timeLimit: number;
  passingScore: number;
  maxAttempts: number;
  attemptsUsed: number;
  canAttempt: boolean;
  bestScore?: number;
  bestStatus?: string;
}

/** Attempt history now comes from the real GET /quizzes/{quiz}/progress
 *  endpoint (server-verified), not a client-side cache — one progress
 *  fetch per quiz on top of the per-course quiz listing. */
export function useMyQuizzes() {
  const { data: courses = [], isLoading: coursesLoading, isError: coursesError, refetch: refetchCourses } = useMyCourses();

  const quizListQueries = useQueries({
    queries: courses.map((course) => ({
      queryKey: ['student', 'quizzes-by-course', course.slug],
      queryFn: () => teacherQuizService.listByCourse(course.slug),
    })),
  });

  const quizListLoading = coursesLoading || quizListQueries.some((q) => q.isLoading);
  const quizListError = coursesError || quizListQueries.some((q) => q.isError);

  const flatQuizzes = courses.flatMap((course, index) =>
    (quizListQueries[index]?.data ?? []).map((quiz) => ({ quiz, courseName: course.courseTitle }))
  );

  const progressQueries = useQueries({
    queries: flatQuizzes.map(({ quiz }) => ({
      queryKey: ['quiz-progress', quiz.id],
      queryFn: () => teacherQuizService.getProgress(quiz.id),
      enabled: !quizListLoading,
    })),
  });

  const isLoading = quizListLoading || progressQueries.some((q) => q.isLoading);
  const isError = quizListError || progressQueries.some((q) => q.isError);

  const data: StudentQuizOverview[] = flatQuizzes.map(({ quiz, courseName }, index) => {
    const progress = progressQueries[index]?.data;
    return {
      quizId: quiz.id,
      title: quiz.title,
      courseName,
      questionsCount: quiz.questionsCount ?? quiz.questions.length,
      timeLimit: quiz.timeLimit,
      passingScore: quiz.passingScore,
      maxAttempts: quiz.maxAttempts,
      attemptsUsed: progress?.attemptsUsed ?? 0,
      canAttempt: progress?.canAttempt ?? true,
      bestScore: progress?.bestResult?.score,
      bestStatus: progress?.bestResult?.status,
    };
  });

  function refetch() {
    refetchCourses();
    quizListQueries.forEach((q) => q.refetch());
    progressQueries.forEach((q) => q.refetch());
  }

  return { data, isLoading, isError, refetch };
}

export interface StudentExamOverview {
  examId: number;
  title: string;
  courseName: string;
  startDate: string;
  endDate: string;
  durationMinutes: number;
  passingScore: number;
  timeStatus: 'upcoming' | 'open' | 'closed';
  attempted: boolean;
  score?: number;
  status?: string;
}

/** Exams are single-attempt, enforced server-side within [start_date,
 *  end_date]. "attempted" now comes from the real GET /exams/{exam}/progress
 *  endpoint, so it's accurate across devices/browsers. */
export function useMyExams() {
  const { data: courses = [], isLoading: coursesLoading, isError: coursesError, refetch: refetchCourses } = useMyCourses();

  const examListQueries = useQueries({
    queries: courses.map((course) => ({
      queryKey: ['student', 'exams-by-course', course.slug],
      queryFn: () => teacherExamService.listByCourse(course.slug),
    })),
  });

  const examListLoading = coursesLoading || examListQueries.some((q) => q.isLoading);
  const examListError = coursesError || examListQueries.some((q) => q.isError);

  const flatExams = courses.flatMap((course, index) =>
    (examListQueries[index]?.data ?? []).map((exam) => ({ exam, courseName: course.courseTitle }))
  );

  const progressQueries = useQueries({
    queries: flatExams.map(({ exam }) => ({
      queryKey: ['exam-progress', exam.id],
      queryFn: () => teacherExamService.getProgress(exam.id),
      enabled: !examListLoading,
    })),
  });

  const isLoading = examListLoading || progressQueries.some((q) => q.isLoading);
  const isError = examListError || progressQueries.some((q) => q.isError);
  const now = Date.now();

  const data: StudentExamOverview[] = flatExams.map(({ exam, courseName }, index) => {
    const progress = progressQueries[index]?.data;
    const start = new Date(exam.startDate).getTime();
    const end = new Date(exam.endDate).getTime();
    const timeStatus: StudentExamOverview['timeStatus'] = now < start ? 'upcoming' : now > end ? 'closed' : 'open';
    return {
      examId: exam.id,
      title: exam.title,
      courseName,
      startDate: exam.startDate,
      endDate: exam.endDate,
      durationMinutes: exam.durationMinutes,
      passingScore: exam.passingScore,
      timeStatus,
      attempted: progress?.alreadyAttempted ?? false,
      score: progress?.bestResult?.score,
      status: progress?.bestResult?.status,
    };
  });

  function refetch() {
    refetchCourses();
    examListQueries.forEach((q) => q.refetch());
    progressQueries.forEach((q) => q.refetch());
  }

  return { data, isLoading, isError, refetch };
}

export interface StudentGradeItem {
  id: string;
  kind: 'quiz' | 'exam';
  title: string;
  courseName: string;
  score: number;
  passed: boolean;
}

/** Built entirely from useMyQuizzes/useMyExams (quiz best score + exam
 *  attempt result) — there's no assignment-grades endpoint exposed to
 *  students at all, so assignment grades can't be part of this feed. */
export function useMyGrades() {
  const { data: quizzes, isLoading: quizzesLoading, isError: quizzesError } = useMyQuizzes();
  const { data: exams, isLoading: examsLoading, isError: examsError } = useMyExams();

  const quizGrades: StudentGradeItem[] = quizzes
    .filter((q) => q.bestScore !== undefined)
    .map((q) => ({
      id: `quiz-${q.quizId}`,
      kind: 'quiz' as const,
      title: q.title,
      courseName: q.courseName,
      score: q.bestScore!,
      passed: q.bestStatus === 'passed',
    }));

  const examGrades: StudentGradeItem[] = exams
    .filter((e) => e.attempted)
    .map((e) => ({
      id: `exam-${e.examId}`,
      kind: 'exam' as const,
      title: e.title,
      courseName: e.courseName,
      score: e.score!,
      passed: e.status === 'passed',
    }));

  return {
    data: [...quizGrades, ...examGrades],
    isLoading: quizzesLoading || examsLoading,
    isError: quizzesError || examsError,
  };
}

export function useSubmitQuiz(quizId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (answers: string[]) => teacherQuizService.submit(quizId, answers),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['quiz-progress', quizId] }),
  });
}

export function useAttemptExam(examId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (answers: string[]) => teacherExamService.attempt(examId, answers),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['exam-progress', examId] }),
  });
}

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { teacherQuizService, teacherExamService } from '@/services';
import type {
  TeacherQuizFormValues,
  TeacherExamFormValues,
  QuizQuestion,
  ExamQuestion,
} from './types';

const quizKey = (id: number) => ['teacher', 'quiz', id] as const;
const examKey = (id: number) => ['teacher', 'exam', id] as const;
const quizSubmissionsKey = (id: number) => ['teacher', 'quiz-submissions', id] as const;
const examAttemptsKey = (id: number) => ['teacher', 'exam-attempts', id] as const;
const quizProgressKey = (id: number) => ['quiz-progress', id] as const;
const examProgressKey = (id: number) => ['exam-progress', id] as const;

/** Shared prefix — invalidating it refreshes every course-scoped quiz list at once (used by the grid). */
const quizzesByCourseKeyPrefix = ['teacher', 'quizzes-by-course'] as const;
const quizzesByCourseKey = (courseSlug: string) => [...quizzesByCourseKeyPrefix, courseSlug] as const;

/** Shared prefix — invalidating it refreshes every course-scoped exam list at once (used by the grid). */
const examsByCourseKeyPrefix = ['teacher', 'exams-by-course'] as const;
const examsByCourseKey = (courseSlug: string) => [...examsByCourseKeyPrefix, courseSlug] as const;

export function useQuizzesByCourse(courseSlug: string) {
  return useQuery({
    queryKey: quizzesByCourseKey(courseSlug),
    queryFn: () => teacherQuizService.listByCourse(courseSlug),
    enabled: !!courseSlug,
  });
}

export function useExamsByCourse(courseSlug: string) {
  return useQuery({
    queryKey: examsByCourseKey(courseSlug),
    queryFn: () => teacherExamService.listByCourse(courseSlug),
    enabled: !!courseSlug,
  });
}

export function useTeacherQuiz(quizId: number) {
  return useQuery({ queryKey: quizKey(quizId), queryFn: () => teacherQuizService.getById(quizId), enabled: !!quizId });
}

/** GET /quizzes/{quiz}/progress — the authenticated user's own real
 *  attempt history (works both for a student taking it and anyone else
 *  checking their own progress). */
export function useQuizProgress(quizId: number) {
  return useQuery({
    queryKey: quizProgressKey(quizId),
    queryFn: () => teacherQuizService.getProgress(quizId),
    enabled: !!quizId,
  });
}

export function useExamProgress(examId: number) {
  return useQuery({
    queryKey: examProgressKey(examId),
    queryFn: () => teacherExamService.getProgress(examId),
    enabled: !!examId,
  });
}

export function useCreateQuiz() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (values: TeacherQuizFormValues) => teacherQuizService.create(values),
    onSuccess: (quiz) => {
      queryClient.invalidateQueries({ queryKey: quizKey(quiz.id) });
      queryClient.invalidateQueries({ queryKey: quizzesByCourseKeyPrefix });
    },
  });
}

export function useUpdateQuiz() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ quizId, values }: { quizId: number; values: TeacherQuizFormValues }) =>
      teacherQuizService.update(quizId, values),
    onSuccess: (quiz) => {
      queryClient.invalidateQueries({ queryKey: quizKey(quiz.id) });
      queryClient.invalidateQueries({ queryKey: quizzesByCourseKeyPrefix });
    },
  });
}

export function useDeleteQuiz() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (quizId: number) => teacherQuizService.remove(quizId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: quizzesByCourseKeyPrefix }),
  });
}

export function useAddQuizQuestion(quizId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (question: Omit<QuizQuestion, 'id'>) => teacherQuizService.addQuestion(quizId, question),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: quizKey(quizId) });
      queryClient.invalidateQueries({ queryKey: quizzesByCourseKeyPrefix });
    },
  });
}

export function useUpdateQuizQuestion(quizId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ questionId, question }: { questionId: number; question: Omit<QuizQuestion, 'id'> }) =>
      teacherQuizService.updateQuestion(quizId, questionId, question),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: quizKey(quizId) });
      queryClient.invalidateQueries({ queryKey: quizzesByCourseKeyPrefix });
    },
  });
}

export function useRemoveQuizQuestion(quizId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (questionId: number) => teacherQuizService.removeQuestion(quizId, questionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: quizKey(quizId) });
      queryClient.invalidateQueries({ queryKey: quizzesByCourseKeyPrefix });
    },
  });
}

export function useQuizSubmissions(quizId: number) {
  return useQuery({
    queryKey: quizSubmissionsKey(quizId),
    queryFn: () => teacherQuizService.listSubmissions(quizId),
    enabled: !!quizId,
  });
}

export function useGradeQuizSubmission(quizId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ submissionId, score, feedback }: { submissionId: number; score: number; feedback?: string }) =>
      teacherQuizService.gradeSubmission(submissionId, score, feedback),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: quizSubmissionsKey(quizId) }),
  });
}

export function useTeacherExam(examId: number) {
  return useQuery({ queryKey: examKey(examId), queryFn: () => teacherExamService.getById(examId), enabled: !!examId });
}

export function useCreateExam() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (values: TeacherExamFormValues) => teacherExamService.create(values),
    onSuccess: (exam) => {
      queryClient.invalidateQueries({ queryKey: examKey(exam.id) });
      queryClient.invalidateQueries({ queryKey: examsByCourseKeyPrefix });
    },
  });
}

export function useUpdateExam() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ examId, values }: { examId: number; values: TeacherExamFormValues }) =>
      teacherExamService.update(examId, values),
    onSuccess: (exam) => {
      queryClient.invalidateQueries({ queryKey: examKey(exam.id) });
      queryClient.invalidateQueries({ queryKey: examsByCourseKeyPrefix });
    },
  });
}

export function useDeleteExam() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (examId: number) => teacherExamService.remove(examId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: examsByCourseKeyPrefix }),
  });
}

export function useSaveExamQuestions(examId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (questions: ExamQuestion[]) => teacherExamService.saveQuestions(examId, questions),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: examKey(examId) });
      queryClient.invalidateQueries({ queryKey: examsByCourseKeyPrefix });
    },
  });
}

export function useExamAttempts(examId: number) {
  return useQuery({
    queryKey: examAttemptsKey(examId),
    queryFn: () => teacherExamService.listAttempts(examId),
    enabled: !!examId,
  });
}

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { teacherCourseService, categoryService } from '@/services';
import type { TeacherCourseFormValues } from './types';

export const TEACHER_COURSES_KEY = ['teacher', 'courses'] as const;
export const COURSE_CATEGORIES_KEY = ['course-categories'] as const;

export function useTeacherCourses() {
  return useQuery({
    queryKey: TEACHER_COURSES_KEY,
    queryFn: teacherCourseService.list,
  });
}

export function useCourseCategories() {
  return useQuery({
    queryKey: COURSE_CATEGORIES_KEY,
    queryFn: categoryService.list,
  });
}

export function useCreateCourse() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (values: TeacherCourseFormValues) => teacherCourseService.create(values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TEACHER_COURSES_KEY });
    },
  });
}

export function useUpdateCourse() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ slug, values }: { slug: string; values: TeacherCourseFormValues }) =>
      teacherCourseService.update(slug, values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TEACHER_COURSES_KEY });
    },
  });
}

export function useDeleteCourse() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (slug: string) => teacherCourseService.remove(slug),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TEACHER_COURSES_KEY });
    },
  });
}

export function useTogglePublishCourse() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ slug, publish }: { slug: string; publish: boolean }) =>
      publish ? teacherCourseService.publish(slug) : teacherCourseService.unpublish(slug),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TEACHER_COURSES_KEY });
    },
  });
}

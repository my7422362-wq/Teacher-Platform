import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getCourseSections, sectionService, lessonService } from '@/services';
import type { TeacherSectionFormValues, TeacherLessonFormValues } from './types';

export const courseSectionsKey = (courseSlug: string) => ['teacher', 'course-sections', courseSlug] as const;

export function useCourseSections(courseSlug: string) {
  return useQuery({
    queryKey: courseSectionsKey(courseSlug),
    queryFn: () => getCourseSections(courseSlug),
    enabled: !!courseSlug,
  });
}

export function useCreateSection(courseSlug: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (values: TeacherSectionFormValues) => sectionService.create(courseSlug, values),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: courseSectionsKey(courseSlug) }),
  });
}

export function useUpdateSection(courseSlug: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ sectionId, values }: { sectionId: number; values: TeacherSectionFormValues }) =>
      sectionService.update(sectionId, values),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: courseSectionsKey(courseSlug) }),
  });
}

export function useDeleteSection(courseSlug: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (sectionId: number) => sectionService.remove(sectionId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: courseSectionsKey(courseSlug) }),
  });
}

export function useCreateLesson(courseSlug: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      courseSectionId,
      values,
      video,
    }: {
      courseSectionId: number;
      values: TeacherLessonFormValues;
      video?: File | null;
    }) => {
      return lessonService.create(courseSectionId, values).then(async (lesson) => {
        if (video) await lessonService.uploadVideo(lesson.id, video);
        return lesson;
      });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: courseSectionsKey(courseSlug) }),
  });
}

export function useUpdateLesson(courseSlug: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      lessonId,
      values,
      video,
    }: {
      lessonId: number;
      values: TeacherLessonFormValues;
      video?: File | null;
    }) => {
      return lessonService.update(lessonId, values).then(async (lesson) => {
        if (video) await lessonService.uploadVideo(lesson.id, video);
        return lesson;
      });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: courseSectionsKey(courseSlug) }),
  });
}

export function useDeleteLesson(courseSlug: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (lessonId: number) => lessonService.remove(lessonId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: courseSectionsKey(courseSlug) }),
  });
}

export function useMoveLesson(courseSlug: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (lessons: { id: number; order: number }[]) => lessonService.reorder(lessons),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: courseSectionsKey(courseSlug) }),
  });
}

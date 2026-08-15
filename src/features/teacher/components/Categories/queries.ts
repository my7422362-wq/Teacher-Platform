import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { categoryService, type CategoryFormValues } from '@/services';
import { COURSE_CATEGORIES_KEY } from '@/features/teacher/components/Courses/queries';

export function useTeacherCategories() {
  return useQuery({
    queryKey: COURSE_CATEGORIES_KEY,
    queryFn: categoryService.list,
  });
}

export function useCreateCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (values: CategoryFormValues) => categoryService.create(values),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: COURSE_CATEGORIES_KEY }),
  });
}

export function useUpdateCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ categoryId, values }: { categoryId: number; values: CategoryFormValues }) =>
      categoryService.update(categoryId, values),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: COURSE_CATEGORIES_KEY }),
  });
}

export function useDeleteCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (categoryId: number) => categoryService.remove(categoryId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: COURSE_CATEGORIES_KEY }),
  });
}

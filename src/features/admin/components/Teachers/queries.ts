import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { adminService, type CreateTeacherValues } from '@/services';

const TEACHERS_KEY = ['admin', 'teachers'];

export function useAdminTeachers() {
  return useQuery({
    queryKey: TEACHERS_KEY,
    queryFn: () => adminService.listTeachers(),
  });
}

export function useCreateTeacher() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (values: CreateTeacherValues) => adminService.createTeacher(values),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: TEACHERS_KEY }),
  });
}

export function useDeleteTeacher() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (teacherId: number) => adminService.deleteTeacher(teacherId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: TEACHERS_KEY }),
  });
}

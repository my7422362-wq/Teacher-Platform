import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { groupService, studentService } from '@/services';
import type { TeacherGroupFormValues } from './types';

export const groupsKey = ['teacher', 'groups'] as const;
export const studentsListKey = ['teacher', 'students-list'] as const;

export function useTeacherGroups() {
  return useQuery({ queryKey: groupsKey, queryFn: groupService.list });
}

export function useStudentsList() {
  return useQuery({ queryKey: studentsListKey, queryFn: studentService.list, staleTime: 5 * 60 * 1000 });
}

export function useCreateGroup() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (values: TeacherGroupFormValues) => groupService.create(values),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: groupsKey }),
  });
}

export function useUpdateGroup() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ groupId, values }: { groupId: number; values: TeacherGroupFormValues }) =>
      groupService.update(groupId, values),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: groupsKey }),
  });
}

export function useDeleteGroup() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (groupId: number) => groupService.remove(groupId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: groupsKey }),
  });
}

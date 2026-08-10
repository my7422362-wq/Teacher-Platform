import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { parentService, communicationLogService } from '@/services';
import type { TeacherParentFormValues, CommunicationChannel } from './types';

export const parentsKey = ['teacher', 'parents'] as const;
export const parentKey = (id: number) => ['teacher', 'parent', id] as const;
export const communicationLogKey = (parentId: number) => ['teacher', 'communication-log', parentId] as const;

export function useTeacherParents() {
  return useQuery({ queryKey: parentsKey, queryFn: parentService.list });
}

export function useTeacherParent(parentId: number) {
  return useQuery({ queryKey: parentKey(parentId), queryFn: () => parentService.getById(parentId), enabled: !!parentId });
}

export function useCreateParent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (values: TeacherParentFormValues) => parentService.create(values),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: parentsKey }),
  });
}

export function useUpdateParent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ parentId, values }: { parentId: number; values: TeacherParentFormValues }) =>
      parentService.update(parentId, values),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: parentsKey }),
  });
}

export function useDeleteParent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (parentId: number) => parentService.remove(parentId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: parentsKey }),
  });
}

export function useCommunicationLog(parentId: number) {
  return useQuery({
    queryKey: communicationLogKey(parentId),
    queryFn: () => communicationLogService.listForParent(parentId),
    enabled: !!parentId,
  });
}

export function useAddCommunicationLogEntry(parentId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ message, type }: { message: string; type: CommunicationChannel }) =>
      communicationLogService.add(parentId, message, type),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: communicationLogKey(parentId) }),
  });
}

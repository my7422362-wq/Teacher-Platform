import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { attendanceService } from '@/services';
import type { AttendanceStatus } from './types';

export const groupAttendanceKey = (groupId: number) => ['teacher', 'attendance', groupId] as const;

/** Fetches every attendance record for the group (no date filter) — used to
 *  derive both the selected day's roster and the overall stats client-side. */
export function useGroupAttendance(groupId: number) {
  return useQuery({
    queryKey: groupAttendanceKey(groupId),
    queryFn: () => attendanceService.listForGroup(groupId),
    enabled: !!groupId,
  });
}

export function useMarkAttendance(groupId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ date, studentId, status }: { date: string; studentId: number; status: AttendanceStatus }) =>
      attendanceService.mark(groupId, date, studentId, status),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: groupAttendanceKey(groupId) }),
  });
}

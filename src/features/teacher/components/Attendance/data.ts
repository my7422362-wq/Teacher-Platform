import { mockStudents, mockCourses } from '@/mock';
import { getGroups } from '@/features/teacher/components/Groups/group-store';
import { getAttendanceRecords, getRecordsForGroupAndDate } from './attendance-store';
import type { AttendanceRecord } from '@/types';

export const CURRENT_TEACHER_ID = 1;

export interface GroupOption {
  id: number;
  name: string;
  courseName?: string;
  studentIds: number[];
}

export function getTeacherGroups(): GroupOption[] {
  return getGroups()
    .filter((g) => g.teacherId === CURRENT_TEACHER_ID)
    .map((g) => ({
      id: g.id,
      name: g.name,
      courseName: mockCourses.find((c) => c.id === g.courseId)?.title,
      studentIds: g.studentIds,
    }));
}

export interface RosterEntry {
  studentId: number;
  name: string;
  avatar: string;
  status: AttendanceRecord['status'] | null;
}

export function getRoster(groupId: number, dateISO: string): RosterEntry[] {
  const group = getGroups().find((g) => g.id === groupId);
  if (!group) return [];

  const records = getRecordsForGroupAndDate(groupId, dateISO);

  return group.studentIds.map((studentId) => {
    const student = mockStudents.find((s) => s.id === studentId);
    const record = records.find((r) => r.studentId === studentId);
    return {
      studentId,
      name: student?.name ?? '',
      avatar: student?.avatar ?? '',
      status: record?.status ?? null,
    };
  });
}

export interface GroupAttendanceStats {
  rate: number;
  presentDays: number;
  absentDays: number;
  lateDays: number;
}

export function getGroupStats(groupId: number): GroupAttendanceStats {
  const records = getAttendanceRecords().filter((r) => r.groupId === groupId);
  const presentDays = records.filter((r) => r.status === 'present').length;
  const absentDays = records.filter((r) => r.status === 'absent').length;
  const lateDays = records.filter((r) => r.status === 'late').length;
  const total = records.length;

  return {
    rate: total ? Math.round(((presentDays + lateDays) / total) * 100) : 0,
    presentDays,
    absentDays,
    lateDays,
  };
}

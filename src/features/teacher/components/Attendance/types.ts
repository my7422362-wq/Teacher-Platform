export type AttendanceStatus = 'present' | 'absent' | 'excused' | 'late';

export interface AttendanceRecord {
  id: number;
  groupId: number;
  studentId: number;
  studentName: string;
  studentAvatar: string | null;
  date: string;
  status: AttendanceStatus;
}

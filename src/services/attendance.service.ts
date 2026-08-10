import axios from 'axios';
import api from '@/services/api';
import i18n from '@/i18n/config';
import type { AttendanceRecord, AttendanceStatus } from '@/features/teacher/components/Attendance/types';

interface AttendanceResourceDto {
  id: number;
  group_id: number;
  student: { id: number; name: string; photo_url: string | null };
  date: string;
  status: AttendanceStatus;
  created_at: string | null;
}

function mapRecord(dto: AttendanceResourceDto): AttendanceRecord {
  return {
    id: dto.id,
    groupId: dto.group_id,
    studentId: dto.student.id,
    studentName: dto.student.name,
    studentAvatar: dto.student.photo_url,
    date: dto.date,
    status: dto.status,
  };
}

function extractErrorMessage(error: unknown, fallback: string): string {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as { message?: string; errors?: Record<string, string[]> } | undefined;
    const firstValidationError = data?.errors && Object.values(data.errors)[0]?.[0];
    if (firstValidationError) return firstValidationError;
    if (data?.message) return data.message;
  }
  return fallback;
}

export const attendanceService = {
  async listForGroup(groupId: number, date?: string): Promise<AttendanceRecord[]> {
    try {
      const { data } = await api.get<{ data: AttendanceResourceDto[] }>(`/groups/${groupId}/attendance`, {
        params: date ? { date } : undefined,
      });
      return data.data.map(mapRecord);
    } catch (error) {
      throw new Error(extractErrorMessage(error, i18n.t('teacherPages.attendance.toast.loadFailed')));
    }
  },

  async mark(groupId: number, date: string, studentId: number, status: AttendanceStatus): Promise<void> {
    try {
      await api.post(`/groups/${groupId}/attendance`, {
        date,
        attendance: [{ student_id: studentId, status }],
      });
    } catch (error) {
      throw new Error(extractErrorMessage(error, i18n.t('teacherPages.attendance.toast.saveFailed')));
    }
  },
};

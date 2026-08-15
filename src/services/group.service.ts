import axios from 'axios';
import api from '@/services/api';
import i18n from '@/i18n/config';
import type {
  TeacherGroup,
  TeacherGroupFormValues,
  GroupScheduleSlot,
} from '@/features/teacher/components/Groups/types';

interface UserResourceDto {
  id: number;
  name: string;
  photo_url: string | null;
}

interface ScheduleSlotDto {
  day: GroupScheduleSlot['day'];
  start_time: string;
  end_time: string;
}

interface GroupResourceDto {
  id: number;
  name: string;
  description: string | null;
  teacher: UserResourceDto | null;
  students: UserResourceDto[];
  schedule: ScheduleSlotDto[] | null;
  created_at: string | null;
}

function mapGroup(dto: GroupResourceDto): TeacherGroup {
  return {
    id: dto.id,
    name: dto.name,
    description: dto.description,
    students: (dto.students ?? []).map((s) => ({ id: s.id, name: s.name, avatar: s.photo_url })),
    schedule: (dto.schedule ?? []).map((s) => ({ day: s.day, startTime: s.start_time, endTime: s.end_time })),
    createdAt: dto.created_at,
  };
}

function toScheduleDto(schedule: GroupScheduleSlot[]): ScheduleSlotDto[] {
  return schedule.map((s) => ({ day: s.day, start_time: s.startTime, end_time: s.endTime }));
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

export const groupService = {
  async list(): Promise<TeacherGroup[]> {
    try {
      const { data } = await api.get<{ data: GroupResourceDto[] }>('/groups');
      return data.data.map(mapGroup);
    } catch (error) {
      throw new Error(extractErrorMessage(error, i18n.t('teacherPages.groups.toast.loadFailed')));
    }
  },

  async getById(groupId: number): Promise<TeacherGroup> {
    try {
      const { data } = await api.get<{ data: GroupResourceDto }>(`/groups/${groupId}`);
      return mapGroup(data.data);
    } catch (error) {
      throw new Error(extractErrorMessage(error, i18n.t('teacherPages.groups.toast.loadFailed')));
    }
  },

  async create(values: TeacherGroupFormValues): Promise<TeacherGroup> {
    try {
      const { data } = await api.post<{ data: GroupResourceDto }>('/groups', {
        name: values.name,
        description: values.description || null,
        students: values.studentIds,
        schedule: toScheduleDto(values.schedule),
      });
      return mapGroup(data.data);
    } catch (error) {
      throw new Error(extractErrorMessage(error, i18n.t('teacherPages.groups.toast.saveFailed')));
    }
  },

  async update(groupId: number, values: TeacherGroupFormValues): Promise<TeacherGroup> {
    try {
      const { data } = await api.put<{ data: GroupResourceDto }>(`/groups/${groupId}`, {
        name: values.name,
        description: values.description || null,
        students: values.studentIds,
        schedule: toScheduleDto(values.schedule),
      });
      return mapGroup(data.data);
    } catch (error) {
      throw new Error(extractErrorMessage(error, i18n.t('teacherPages.groups.toast.saveFailed')));
    }
  },

  async remove(groupId: number): Promise<void> {
    try {
      await api.delete(`/groups/${groupId}`);
    } catch (error) {
      throw new Error(extractErrorMessage(error, i18n.t('teacherPages.groups.toast.deleteFailed')));
    }
  },

  /** Student-facing — the group(s) the authenticated student belongs to,
   *  including their weekly session schedule. */
  async listForStudent(studentId: number): Promise<TeacherGroup[]> {
    try {
      const { data } = await api.get<{ data: GroupResourceDto[] }>(`/students/${studentId}/groups`);
      return data.data.map(mapGroup);
    } catch (error) {
      throw new Error(extractErrorMessage(error, i18n.t('studentPages.dashboard.schedule.loadFailed')));
    }
  },
};

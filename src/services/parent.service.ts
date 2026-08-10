import axios from 'axios';
import api from '@/services/api';
import i18n from '@/i18n/config';
import type { TeacherParent, TeacherParentFormValues } from '@/features/teacher/components/Parents/types';

interface UserResourceDto {
  id: number;
  name: string;
  photo_url: string | null;
}

interface ParentResourceDto {
  id: number | string;
  name: string;
  email: string;
  phone: string | null;
  status: string;
  students: UserResourceDto[];
  created_at: string | null;
}

function mapParent(dto: ParentResourceDto): TeacherParent {
  return {
    id: Number(dto.id),
    name: dto.name,
    email: dto.email,
    phone: dto.phone,
    status: dto.status,
    students: (dto.students ?? []).map((s) => ({ id: s.id, name: s.name, avatar: s.photo_url })),
    createdAt: dto.created_at,
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

export const parentService = {
  async list(): Promise<TeacherParent[]> {
    try {
      const { data } = await api.get<{ data: ParentResourceDto[] }>('/parents');
      return data.data.map(mapParent);
    } catch (error) {
      throw new Error(extractErrorMessage(error, i18n.t('teacherPages.parents.toast.loadFailed')));
    }
  },

  async getById(parentId: number): Promise<TeacherParent> {
    try {
      const { data } = await api.get<{ data: ParentResourceDto }>(`/parents/${parentId}`);
      return mapParent(data.data);
    } catch (error) {
      throw new Error(extractErrorMessage(error, i18n.t('teacherPages.parents.toast.loadFailed')));
    }
  },

  async create(values: TeacherParentFormValues): Promise<TeacherParent> {
    try {
      const { data } = await api.post<{ data: ParentResourceDto }>('/parents', {
        name: values.name,
        email: values.email,
        password: values.password,
        phone: values.phone || null,
        students: values.studentIds,
      });
      return mapParent(data.data);
    } catch (error) {
      throw new Error(extractErrorMessage(error, i18n.t('teacherPages.parents.toast.saveFailed')));
    }
  },

  async update(parentId: number, values: TeacherParentFormValues): Promise<TeacherParent> {
    try {
      const { data } = await api.put<{ data: ParentResourceDto }>(`/parents/${parentId}`, {
        name: values.name,
        email: values.email,
        phone: values.phone || null,
        students: values.studentIds,
      });
      return mapParent(data.data);
    } catch (error) {
      throw new Error(extractErrorMessage(error, i18n.t('teacherPages.parents.toast.saveFailed')));
    }
  },

  async remove(parentId: number): Promise<void> {
    try {
      await api.delete(`/parents/${parentId}`);
    } catch (error) {
      throw new Error(extractErrorMessage(error, i18n.t('teacherPages.parents.toast.deleteFailed')));
    }
  },
};

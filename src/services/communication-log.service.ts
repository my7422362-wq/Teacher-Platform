import axios from 'axios';
import api from '@/services/api';
import i18n from '@/i18n/config';
import type { CommunicationLogItem, CommunicationChannel } from '@/features/teacher/components/Parents/types';

interface CommunicationLogDto {
  id: number;
  parent: { id: number };
  teacher: { id: number };
  message: string;
  type: CommunicationChannel;
  logged_at: string;
}

function mapEntry(dto: CommunicationLogDto): CommunicationLogItem {
  return {
    id: dto.id,
    parentId: dto.parent.id,
    teacherId: dto.teacher.id,
    message: dto.message,
    type: dto.type,
    loggedAt: dto.logged_at,
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

export const communicationLogService = {
  /** The API has no parent-scoped filter param — fetch all and filter client-side. */
  async listForParent(parentId: number): Promise<CommunicationLogItem[]> {
    try {
      const { data } = await api.get<{ data: CommunicationLogDto[] }>('/communication-log');
      return data.data.map(mapEntry).filter((e) => e.parentId === parentId);
    } catch (error) {
      throw new Error(extractErrorMessage(error, i18n.t('teacherPages.parentDetail.toast.loadFailed')));
    }
  },

  async add(parentId: number, message: string, type: CommunicationChannel): Promise<CommunicationLogItem> {
    try {
      const { data } = await api.post<{ data: CommunicationLogDto }>('/communication-log', {
        parent_id: parentId,
        message,
        type,
        logged_at: new Date().toISOString(),
      });
      return mapEntry(data.data);
    } catch (error) {
      throw new Error(extractErrorMessage(error, i18n.t('teacherPages.parentDetail.toast.saveFailed')));
    }
  },

  async remove(entryId: number): Promise<void> {
    try {
      await api.delete(`/communication-log/${entryId}`);
    } catch (error) {
      throw new Error(extractErrorMessage(error, i18n.t('teacherPages.parentDetail.toast.deleteFailed')));
    }
  },
};

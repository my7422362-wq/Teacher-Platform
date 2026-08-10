import axios from 'axios';
import api from '@/services/api';
import i18n from '@/i18n/config';
import type { TeacherNotificationItem, NotificationKind } from '@/features/teacher/components/Notifications/types';

/**
 * The backend only exposes the authenticated user's own notification
 * inbox (list/mark-read/mark-all-read) — there is no endpoint for a
 * teacher to push a notification to students, so the old "compose and
 * send" feature has no real equivalent and was dropped. Field mapping
 * follows Laravel's standard DatabaseNotification shape (id/data/read_at)
 * with fallbacks in case the API instead returns flattened fields.
 */

const KNOWN_KINDS: NotificationKind[] = ['info', 'success', 'warning', 'error'];

interface NotificationDataDto {
  title?: string;
  message?: string;
  body?: string;
  type?: string;
  link?: string;
}

interface NotificationDto {
  id: string;
  data?: NotificationDataDto;
  title?: string;
  message?: string;
  body?: string;
  type?: string;
  link?: string;
  read_at: string | null;
  created_at: string | null;
}

function extractErrorMessage(error: unknown, fallback: string): string {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as { message?: string } | undefined;
    if (data?.message) return data.message;
  }
  return fallback;
}

function mapNotification(dto: NotificationDto): TeacherNotificationItem {
  const payload = dto.data ?? dto;
  const type = payload.type;
  return {
    id: dto.id,
    title: payload.title ?? '',
    message: payload.message ?? payload.body ?? '',
    kind: (KNOWN_KINDS as string[]).includes(type ?? '') ? (type as NotificationKind) : 'info',
    link: payload.link ?? null,
    isRead: dto.read_at !== null,
    createdAt: dto.created_at,
  };
}

export const notificationService = {
  async list(): Promise<TeacherNotificationItem[]> {
    try {
      const { data } = await api.get<{ data: NotificationDto[] }>('/notifications');
      return data.data
        .map(mapNotification)
        .sort((a, b) => new Date(b.createdAt ?? 0).getTime() - new Date(a.createdAt ?? 0).getTime());
    } catch (error) {
      throw new Error(extractErrorMessage(error, i18n.t('teacherPages.notifications.toast.loadFailed')));
    }
  },

  async markRead(id: string): Promise<void> {
    try {
      await api.put(`/notifications/${id}/read`);
    } catch (error) {
      throw new Error(extractErrorMessage(error, i18n.t('teacherPages.notifications.toast.markFailed')));
    }
  },

  async markAllRead(): Promise<void> {
    try {
      await api.put('/notifications/read-all');
    } catch (error) {
      throw new Error(extractErrorMessage(error, i18n.t('teacherPages.notifications.toast.markFailed')));
    }
  },
};

import { mockStudents, mockNotifications } from '@/mock';
import { getLocalNotifications, saveNotification } from '@/features/notifications';
import { getTeacherGroups } from '@/features/teacher/components/Attendance/data';
import type { Notification } from '@/types';

export type RecipientScope = 'all' | 'group' | 'student';

export interface ComposeNotificationInput {
  scope: RecipientScope;
  groupId?: number;
  studentId?: number;
  title: string;
  message: string;
  type: Notification['type'];
}

function resolveRecipientIds(input: ComposeNotificationInput): number[] {
  if (input.scope === 'student' && input.studentId) return [input.studentId];
  if (input.scope === 'group' && input.groupId) {
    const group = getTeacherGroups().find((g) => g.id === input.groupId);
    return group?.studentIds ?? [];
  }
  return mockStudents.map((s) => s.id);
}

export function sendNotification(input: ComposeNotificationInput): number {
  const recipientIds = resolveRecipientIds(input);
  const createdAt = new Date().toISOString();
  const baseId = Date.now();

  recipientIds.forEach((studentId, index) => {
    saveNotification({
      id: baseId + index,
      userId: studentId,
      title: input.title,
      message: input.message,
      type: input.type,
      isRead: false,
      createdAt,
    });
  });

  return recipientIds.length;
}

export interface NotificationLogEntry {
  key: string;
  title: string;
  message: string;
  type: Notification['type'];
  createdAt: string;
  recipientNames: string[];
}

export function getNotificationLog(): NotificationLogEntry[] {
  const studentIds = new Set(mockStudents.map((s) => s.id));
  const all = [...mockNotifications, ...getLocalNotifications()].filter((n) => studentIds.has(n.userId));

  const groups = new Map<string, NotificationLogEntry>();
  for (const n of all) {
    const key = `${n.title}|${n.message}|${n.createdAt}`;
    const studentName = mockStudents.find((s) => s.id === n.userId)?.name ?? '';
    const existing = groups.get(key);
    if (existing) {
      existing.recipientNames.push(studentName);
    } else {
      groups.set(key, {
        key,
        title: n.title,
        message: n.message,
        type: n.type,
        createdAt: n.createdAt,
        recipientNames: [studentName],
      });
    }
  }

  return Array.from(groups.values()).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

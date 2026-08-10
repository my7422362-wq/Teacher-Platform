export type NotificationKind = 'info' | 'success' | 'warning' | 'error';

export interface TeacherNotificationItem {
  id: string;
  title: string;
  message: string;
  kind: NotificationKind;
  link: string | null;
  isRead: boolean;
  createdAt: string | null;
}

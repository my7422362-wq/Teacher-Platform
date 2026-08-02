import type { Notification } from '@/types';

const NOTIFICATIONS_KEY = 'lms_local_notifications';

function read(): Notification[] {
  try {
    const raw = localStorage.getItem(NOTIFICATIONS_KEY);
    return raw ? (JSON.parse(raw) as Notification[]) : [];
  } catch {
    return [];
  }
}

function write(notifications: Notification[]): void {
  localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(notifications));
}

export function getLocalNotifications(): Notification[] {
  return read();
}

export function saveNotification(notification: Notification): void {
  write([...read(), notification]);
}

import { useTranslation } from 'react-i18next';
import { Card, CardContent, Button, EmptyState, ErrorState, Spinner } from '@/components/ui';
import { cn } from '@/lib/utils';
import { Bell, Info, CheckCircle2, AlertTriangle, XCircle, type LucideIcon } from 'lucide-react';
import { useTeacherNotifications, useMarkNotificationRead, useMarkAllNotificationsRead } from './queries';
import type { NotificationKind } from './types';

const ICONS: Record<NotificationKind, LucideIcon> = {
  info: Info,
  success: CheckCircle2,
  warning: AlertTriangle,
  error: XCircle,
};

export function NotificationsList() {
  const { t, i18n } = useTranslation();
  const { data: notifications = [], isLoading, isError, refetch } = useTeacherNotifications();
  const markRead = useMarkNotificationRead();
  const markAllRead = useMarkAllNotificationsRead();

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  if (isLoading) {
    return (
      <div className="flex justify-center py-16">
        <Spinner />
      </div>
    );
  }

  if (isError) {
    return <ErrorState description={t('teacherPages.notifications.toast.loadFailed')} onRetry={() => refetch()} />;
  }

  return (
    <section className="space-y-4">
      {unreadCount > 0 && (
        <div className="flex justify-end">
          <Button variant="outline" size="sm" onClick={() => markAllRead.mutate()} loading={markAllRead.isPending}>
            {t('teacherPages.notifications.markAllRead')}
          </Button>
        </div>
      )}

      {notifications.length === 0 ? (
        <EmptyState icon={<Bell className="h-12 w-12" />} description={t('teacherPages.notifications.empty')} />
      ) : (
        <Card>
          <CardContent className="divide-y divide-[rgba(212,181,158,0.12)] p-0">
            {notifications.map((notification) => {
              const Icon = ICONS[notification.kind];
              return (
                <button
                  key={notification.id}
                  type="button"
                  onClick={() => !notification.isRead && markRead.mutate(notification.id)}
                  className="flex w-full items-start gap-3 p-4 text-start transition-colors hover:bg-[#1B4038]"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#D4B59E]/15 text-[#D4B59E]">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className={cn('text-sm text-[#F9F6F0]', !notification.isRead && 'font-semibold')}>
                      {notification.title}
                    </p>
                    <p className="mt-1 text-sm text-[rgba(249,246,240,0.65)]">{notification.message}</p>
                    <p className="mt-1 text-xs text-[rgba(249,246,240,0.45)]">
                      {notification.createdAt ? new Date(notification.createdAt).toLocaleString(i18n.language) : ''}
                    </p>
                  </div>
                  {!notification.isRead && <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#D4B59E]" />}
                </button>
              );
            })}
          </CardContent>
        </Card>
      )}
    </section>
  );
}

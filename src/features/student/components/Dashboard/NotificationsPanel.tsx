import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Card, CardContent, Button, EmptyState, Spinner, ErrorState } from '@/components/ui';
import { cn } from '@/lib/utils';
import { Bell, Info, CheckCircle2, AlertTriangle, XCircle, type LucideIcon } from 'lucide-react';
import {
  useTeacherNotifications,
  useMarkNotificationRead,
  useMarkAllNotificationsRead,
} from '@/features/teacher/components/Notifications/queries';
import type { NotificationKind } from '@/features/teacher/components/Notifications/types';

const ICONS: Record<NotificationKind, LucideIcon> = {
  info: Info,
  success: CheckCircle2,
  warning: AlertTriangle,
  error: XCircle,
};

interface NotificationsPanelProps {
  limit?: number;
  viewAllHref?: string;
}

/** GET /notifications is always scoped to the authenticated user, so the
 *  same real service backing the teacher's notification inbox works
 *  unchanged here. */
export function NotificationsPanel({ limit, viewAllHref }: NotificationsPanelProps) {
  const { t } = useTranslation();
  const { data: notifications = [], isLoading, isError, refetch } = useTeacherNotifications();
  const markRead = useMarkNotificationRead();
  const markAllRead = useMarkAllNotificationsRead();

  const visible = limit ? notifications.slice(0, limit) : notifications;
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-[#F9F6F0]">
          {t('studentPages.dashboard.notifications.title')}
        </h2>
        {viewAllHref ? (
          <Link to={viewAllHref} className="text-sm text-[#D4B59E] hover:underline">
            {t('common.viewAll')}
          </Link>
        ) : (
          unreadCount > 0 && (
            <Button variant="outline" size="sm" onClick={() => markAllRead.mutate()} loading={markAllRead.isPending}>
              {t('teacherPages.notifications.markAllRead')}
            </Button>
          )
        )}
      </div>

      {isLoading ? (
        <div className="flex justify-center py-10">
          <Spinner />
        </div>
      ) : isError ? (
        <ErrorState description={t('teacherPages.notifications.toast.loadFailed')} onRetry={() => refetch()} />
      ) : visible.length === 0 ? (
        <EmptyState icon={<Bell className="h-12 w-12" />} description={t('studentPages.dashboard.notifications.empty')} />
      ) : (
        <Card>
          <CardContent className="divide-y divide-[rgba(212,181,158,0.12)] p-0">
            {visible.map((notification) => {
              const Icon = ICONS[notification.kind];
              return (
                <button
                  key={notification.id}
                  type="button"
                  onClick={() => !notification.isRead && markRead.mutate(notification.id)}
                  className="flex w-full items-start gap-3 p-4 text-start transition-colors hover:bg-[#1B4038]"
                >
                  <Icon className="mt-0.5 h-5 w-5 shrink-0 text-[#D4B59E]" />
                  <div className="min-w-0 flex-1">
                    <p className={cn('text-sm text-[#F9F6F0]', !notification.isRead && 'font-semibold')}>
                      {notification.title}
                    </p>
                    <p className="truncate text-xs text-[rgba(249,246,240,0.55)]">{notification.message}</p>
                  </div>
                  {!notification.isRead && (
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#D4B59E]" />
                  )}
                </button>
              );
            })}
          </CardContent>
        </Card>
      )}
    </section>
  );
}

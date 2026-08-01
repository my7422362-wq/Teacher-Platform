import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Card, CardContent, EmptyState } from '@/components/ui';
import { cn } from '@/lib/utils';
import { Bell, Info, CheckCircle2, AlertTriangle, XCircle, type LucideIcon } from 'lucide-react';
import { teacherNotifications } from './data';
import type { Notification } from '@/types';

const ICONS: Record<Notification['type'], LucideIcon> = {
  info: Info,
  success: CheckCircle2,
  warning: AlertTriangle,
  error: XCircle,
};

export function RecentNotifications() {
  const { t } = useTranslation();
  const visible = teacherNotifications.slice(0, 4);

  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold text-[#F9F6F0]">
        {t('teacherPages.dashboard.notifications.title')}
      </h2>

      {visible.length === 0 ? (
        <EmptyState icon={<Bell className="h-12 w-12" />} description={t('teacherPages.dashboard.notifications.empty')} />
      ) : (
        <Card>
          <CardContent className="divide-y divide-[rgba(212,181,158,0.12)] p-0">
            {visible.map((notification) => {
              const Icon = ICONS[notification.type];
              return (
                <Link
                  key={notification.id}
                  to={notification.link ?? '#'}
                  className="flex items-start gap-3 p-4 transition-colors hover:bg-[#1B4038]"
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
                </Link>
              );
            })}
          </CardContent>
        </Card>
      )}
    </section>
  );
}

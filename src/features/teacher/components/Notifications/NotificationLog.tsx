import { useTranslation } from 'react-i18next';
import { Card, CardContent, Badge, EmptyState } from '@/components/ui';
import { Bell, Info, CheckCircle2, AlertTriangle, XCircle, type LucideIcon } from 'lucide-react';
import type { NotificationLogEntry } from './data';
import type { Notification } from '@/types';

const ICONS: Record<Notification['type'], LucideIcon> = {
  info: Info,
  success: CheckCircle2,
  warning: AlertTriangle,
  error: XCircle,
};

export function NotificationLog({ entries }: { entries: NotificationLogEntry[] }) {
  const { t, i18n } = useTranslation();

  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold text-[#F9F6F0]">{t('teacherPages.notifications.logTitle')}</h2>

      {entries.length === 0 ? (
        <EmptyState icon={<Bell className="h-12 w-12" />} description={t('teacherPages.notifications.logEmpty')} />
      ) : (
        <Card>
          <CardContent className="divide-y divide-[rgba(212,181,158,0.12)] p-0">
            {entries.map((entry) => {
              const Icon = ICONS[entry.type];
              return (
                <div key={entry.key} className="flex items-start gap-3 p-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#D4B59E]/15 text-[#D4B59E]">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-medium text-[#F9F6F0]">{entry.title}</p>
                      <Badge variant="outline">
                        {t('teacherPages.notifications.recipients', { count: entry.recipientNames.length })}
                      </Badge>
                    </div>
                    <p className="mt-1 text-sm text-[rgba(249,246,240,0.65)]">{entry.message}</p>
                    <p
                      className="mt-1 truncate text-xs text-[rgba(249,246,240,0.45)]"
                      title={entry.recipientNames.join('، ')}
                    >
                      {entry.recipientNames.join('، ')}
                    </p>
                  </div>
                  <span className="shrink-0 text-xs text-[rgba(249,246,240,0.45)]">
                    {new Date(entry.createdAt).toLocaleString(i18n.language)}
                  </span>
                </div>
              );
            })}
          </CardContent>
        </Card>
      )}
    </section>
  );
}

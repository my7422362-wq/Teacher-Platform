import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/components/ui';
import { Wallet, Clock, AlertTriangle, type LucideIcon } from 'lucide-react';
import type { PaymentsOverview } from './data';

interface StatItem {
  icon: LucideIcon;
  value: string;
  labelKey: string;
  sublabel?: string;
}

export function PaymentsOverviewStats({ overview }: { overview: PaymentsOverview }) {
  const { t } = useTranslation();

  const items: StatItem[] = [
    { icon: Wallet, value: `${overview.totalCollected.toLocaleString()} SAR`, labelKey: 'teacherPages.payments.stats.collected' },
    { icon: Clock, value: `${overview.totalPending.toLocaleString()} SAR`, labelKey: 'teacherPages.payments.stats.pending' },
    {
      icon: AlertTriangle,
      value: `${overview.totalOverdue.toLocaleString()} SAR`,
      labelKey: 'teacherPages.payments.stats.overdue',
      sublabel: t('teacherPages.payments.stats.overdueCount', { count: overview.overdueCount }),
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {items.map(({ icon: Icon, value, labelKey, sublabel }) => (
        <Card key={labelKey}>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#D4B59E]/15 text-[#D4B59E]">
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#F9F6F0]">{value}</p>
              <p className="text-sm text-[rgba(249,246,240,0.65)]">{t(labelKey)}</p>
              {sublabel && <p className="text-xs text-[rgba(249,246,240,0.45)]">{sublabel}</p>}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

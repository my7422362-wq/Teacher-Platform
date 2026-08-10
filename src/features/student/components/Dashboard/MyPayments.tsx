import { useTranslation } from 'react-i18next';
import {
  Card,
  CardContent,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  Badge,
  EmptyState,
  Spinner,
  ErrorState,
} from '@/components/ui';
import { Receipt } from 'lucide-react';
import { useMyPayments } from './queries';
import type { TeacherPayment } from '@/features/teacher/components/Payments/types';

const STATUS_VARIANT: Record<TeacherPayment['status'], 'success' | 'warning' | 'destructive'> = {
  approved: 'success',
  pending: 'warning',
  rejected: 'destructive',
};

export function MyPayments() {
  const { t, i18n } = useTranslation();
  const { data: payments = [], isLoading, isError, refetch } = useMyPayments();

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <Spinner />
      </div>
    );
  }

  if (isError) {
    return <ErrorState description={t('studentPages.dashboard.payments.loadFailed')} onRetry={() => refetch()} />;
  }

  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold text-[#F9F6F0]">
        {t('studentPages.dashboard.payments.title')}
      </h2>

      {payments.length === 0 ? (
        <EmptyState
          icon={<Receipt className="h-12 w-12" />}
          description={t('studentPages.dashboard.payments.empty')}
        />
      ) : (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('studentPages.dashboard.payments.amount')}</TableHead>
                  <TableHead>{t('studentPages.dashboard.payments.method')}</TableHead>
                  <TableHead>{t('studentPages.dashboard.payments.status')}</TableHead>
                  <TableHead>{t('studentPages.dashboard.payments.date')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell>{payment.amount}</TableCell>
                    <TableCell>{payment.paymentMethod}</TableCell>
                    <TableCell>
                      <Badge variant={STATUS_VARIANT[payment.status]}>
                        {t(`studentPages.dashboard.payments.statusValues.${payment.status}`)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {payment.createdAt ? new Date(payment.createdAt).toLocaleDateString(i18n.language) : '—'}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </section>
  );
}

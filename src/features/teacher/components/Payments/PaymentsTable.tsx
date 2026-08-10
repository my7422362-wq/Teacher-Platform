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
  ErrorState,
  Spinner,
} from '@/components/ui';
import { Receipt } from 'lucide-react';
import { useTeacherPayments } from './queries';
import type { TeacherPayment } from './types';

const STATUS_VARIANT: Record<TeacherPayment['status'], 'success' | 'warning' | 'destructive'> = {
  approved: 'success',
  pending: 'warning',
  rejected: 'destructive',
};

export function PaymentsTable() {
  const { t, i18n } = useTranslation();
  const { data: payments = [], isLoading, isError, refetch } = useTeacherPayments();

  if (isLoading) {
    return (
      <div className="flex justify-center py-16">
        <Spinner />
      </div>
    );
  }

  if (isError) {
    return <ErrorState description={t('teacherPages.payments.toast.loadFailed')} onRetry={() => refetch()} />;
  }

  return (
    <section className="space-y-4">
      {payments.length === 0 ? (
        <EmptyState icon={<Receipt className="h-12 w-12" />} description={t('teacherPages.payments.paymentsTable.empty')} />
      ) : (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('teacherPages.payments.paymentsTable.student')}</TableHead>
                  <TableHead>{t('teacherPages.payments.paymentsTable.amount')}</TableHead>
                  <TableHead>{t('teacherPages.payments.paymentsTable.method')}</TableHead>
                  <TableHead>{t('teacherPages.payments.paymentsTable.status')}</TableHead>
                  <TableHead>{t('teacherPages.payments.paymentsTable.date')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell>{payment.studentName}</TableCell>
                    <TableCell>{payment.amount}</TableCell>
                    <TableCell>{payment.paymentMethod}</TableCell>
                    <TableCell>
                      <Badge variant={STATUS_VARIANT[payment.status]}>
                        {t(`teacherPages.payments.paymentsTable.statusValues.${payment.status}`)}
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

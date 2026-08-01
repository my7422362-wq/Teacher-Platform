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
} from '@/components/ui';
import { Receipt } from 'lucide-react';
import type { PaymentRequest } from '@/types';

const STATUS_VARIANT: Record<PaymentRequest['status'], 'success' | 'warning' | 'destructive'> = {
  approved: 'success',
  pending: 'warning',
  rejected: 'destructive',
};

export function ParentPayments({ payments }: { payments: (PaymentRequest & { courseName: string })[] }) {
  const { t, i18n } = useTranslation();

  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold text-[#F9F6F0]">
        {t('teacherPages.parentDetail.expensesTitle')}
      </h2>

      {payments.length === 0 ? (
        <EmptyState
          icon={<Receipt className="h-12 w-12" />}
          description={t('teacherPages.parentDetail.expensesEmpty')}
        />
      ) : (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('studentPages.dashboard.payments.course')}</TableHead>
                  <TableHead>{t('studentPages.dashboard.payments.amount')}</TableHead>
                  <TableHead>{t('studentPages.dashboard.payments.method')}</TableHead>
                  <TableHead>{t('studentPages.dashboard.payments.status')}</TableHead>
                  <TableHead>{t('studentPages.dashboard.payments.date')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell>{payment.courseName}</TableCell>
                    <TableCell>
                      {payment.amount} {payment.currency}
                    </TableCell>
                    <TableCell>
                      {t(`studentPages.dashboard.payments.methodValues.${payment.paymentMethod}`)}
                    </TableCell>
                    <TableCell>
                      <Badge variant={STATUS_VARIANT[payment.status]}>
                        {t(`studentPages.dashboard.payments.statusValues.${payment.status}`)}
                      </Badge>
                    </TableCell>
                    <TableCell>{new Date(payment.createdAt).toLocaleDateString(i18n.language)}</TableCell>
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

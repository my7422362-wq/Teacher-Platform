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
import { studentPayments } from './data';
import type { PaymentRequest } from '@/types';

const STATUS_VARIANT: Record<PaymentRequest['status'], 'success' | 'warning' | 'destructive'> = {
  approved: 'success',
  pending: 'warning',
  rejected: 'destructive',
};

export function MyPayments() {
  const { t, i18n } = useTranslation();

  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold text-[#F9F6F0]">
        {t('studentPages.dashboard.payments.title')}
      </h2>

      {studentPayments.length === 0 ? (
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
                  <TableHead>{t('studentPages.dashboard.payments.course')}</TableHead>
                  <TableHead>{t('studentPages.dashboard.payments.amount')}</TableHead>
                  <TableHead>{t('studentPages.dashboard.payments.method')}</TableHead>
                  <TableHead>{t('studentPages.dashboard.payments.status')}</TableHead>
                  <TableHead>{t('studentPages.dashboard.payments.date')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {studentPayments.map((payment) => (
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

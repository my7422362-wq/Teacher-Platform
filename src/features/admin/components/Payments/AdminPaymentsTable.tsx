import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
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
  Button,
  EmptyState,
  ErrorState,
  Spinner,
} from '@/components/ui';
import { Receipt, Check, X } from 'lucide-react';
import { useAdminPayments, useAdminApprovePayment, useAdminRejectPayment } from './queries';
import type { TeacherPayment } from '@/features/teacher/components/Payments/types';

const STATUS_VARIANT: Record<TeacherPayment['status'], 'success' | 'warning' | 'destructive'> = {
  approved: 'success',
  pending: 'warning',
  rejected: 'destructive',
};

export function AdminPaymentsTable() {
  const { t, i18n } = useTranslation();
  const { data: payments = [], isLoading, isError, refetch } = useAdminPayments();
  const approvePayment = useAdminApprovePayment();
  const rejectPayment = useAdminRejectPayment();

  async function handleApprove(payment: TeacherPayment) {
    try {
      await approvePayment.mutateAsync(payment);
      toast.success(t('teacherPages.payments.toast.approved'));
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t('teacherPages.payments.toast.approveFailed'));
    }
  }

  async function handleReject(payment: TeacherPayment) {
    try {
      await rejectPayment.mutateAsync(payment.id);
      toast.success(t('teacherPages.payments.toast.rejected'));
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t('teacherPages.payments.toast.rejectFailed'));
    }
  }

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

  if (payments.length === 0) {
    return <EmptyState icon={<Receipt className="h-12 w-12" />} description={t('teacherPages.payments.paymentsTable.empty')} />;
  }

  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('teacherPages.payments.paymentsTable.student')}</TableHead>
              <TableHead>{t('teacherPages.payments.paymentsTable.course')}</TableHead>
              <TableHead>{t('teacherPages.payments.paymentsTable.amount')}</TableHead>
              <TableHead>{t('teacherPages.payments.paymentsTable.method')}</TableHead>
              <TableHead>{t('teacherPages.payments.paymentsTable.senderPhone')}</TableHead>
              <TableHead>{t('teacherPages.payments.paymentsTable.receipt')}</TableHead>
              <TableHead>{t('teacherPages.payments.paymentsTable.status')}</TableHead>
              <TableHead>{t('teacherPages.payments.paymentsTable.date')}</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell>{payment.studentName}</TableCell>
                <TableCell>{payment.courseTitle ?? '—'}</TableCell>
                <TableCell>{payment.amount}</TableCell>
                <TableCell>{payment.paymentMethod}</TableCell>
                <TableCell dir="ltr">{payment.senderPhone ?? '—'}</TableCell>
                <TableCell>
                  {payment.receiptUrl ? (
                    <a
                      href={payment.receiptUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[#D4B59E] hover:underline"
                    >
                      <Receipt className="h-4 w-4" />
                      {t('teacherPages.payments.paymentsTable.viewReceipt')}
                    </a>
                  ) : (
                    '—'
                  )}
                </TableCell>
                <TableCell>
                  <Badge variant={STATUS_VARIANT[payment.status]}>
                    {t(`teacherPages.payments.paymentsTable.statusValues.${payment.status}`)}
                  </Badge>
                </TableCell>
                <TableCell>
                  {payment.createdAt ? new Date(payment.createdAt).toLocaleDateString(i18n.language) : '—'}
                </TableCell>
                <TableCell>
                  {payment.status === 'pending' && (
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-emerald-500 hover:bg-emerald-500/10"
                        loading={approvePayment.isPending}
                        onClick={() => handleApprove(payment)}
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:bg-destructive/10"
                        loading={rejectPayment.isPending}
                        onClick={() => handleReject(payment)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

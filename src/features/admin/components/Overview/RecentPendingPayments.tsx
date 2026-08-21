import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { Card, CardContent, Button, EmptyState, Spinner } from '@/components/ui';
import { Receipt, Check, X } from 'lucide-react';
import {
  useAdminPayments,
  useAdminApprovePayment,
  useAdminRejectPayment,
} from '@/features/admin/components/Payments';

export function RecentPendingPayments() {
  const { t } = useTranslation();
  const { data: payments = [], isLoading } = useAdminPayments();
  const approvePayment = useAdminApprovePayment();
  const rejectPayment = useAdminRejectPayment();

  const pending = payments
    .filter((p) => p.status === 'pending')
    .sort((a, b) => new Date(b.createdAt ?? 0).getTime() - new Date(a.createdAt ?? 0).getTime())
    .slice(0, 5);

  async function handleApprove(payment: (typeof pending)[number]) {
    try {
      await approvePayment.mutateAsync(payment);
      toast.success(t('teacherPages.payments.toast.approved'));
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t('teacherPages.payments.toast.approveFailed'));
    }
  }

  async function handleReject(payment: (typeof pending)[number]) {
    try {
      await rejectPayment.mutateAsync(payment.id);
      toast.success(t('teacherPages.payments.toast.rejected'));
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t('teacherPages.payments.toast.rejectFailed'));
    }
  }

  return (
    <Card>
      <CardContent className="space-y-4 p-5">
        <div className="flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-base font-semibold text-[#F9F6F0]">
            <Receipt className="h-4 w-4 text-[#D4B59E]" />
            {t('adminPages.overview.pendingPayments.title')}
          </h2>
          <Link to="/admin/payments" className="text-sm text-[#D4B59E] hover:underline">
            {t('common.viewAll')}
          </Link>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-6">
            <Spinner size="sm" />
          </div>
        ) : pending.length === 0 ? (
          <EmptyState description={t('adminPages.overview.pendingPayments.empty')} />
        ) : (
          <div className="divide-y divide-[rgba(212,181,158,0.12)]">
            {pending.map((payment) => (
              <div key={payment.id} className="flex items-center gap-3 py-3">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-[#F9F6F0]">{payment.studentName}</p>
                  <p className="truncate text-xs text-[rgba(249,246,240,0.55)]">
                    {payment.courseTitle ?? '—'} · {payment.amount}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-1">
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
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

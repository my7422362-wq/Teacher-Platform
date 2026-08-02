import { useMemo, useState } from 'react';
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
  Avatar,
  Badge,
  Button,
  Select,
  EmptyState,
  type SelectOption,
} from '@/components/ui';
import { Bell, CheckCircle2 } from 'lucide-react';
import { getInstallmentRows, sendPaymentReminder, type InstallmentRow } from './data';
import { markInstallmentPaid } from './installment-store';

type StatusFilter = 'all' | 'paid' | 'pending' | 'overdue';

function rowStatus(row: InstallmentRow): Exclude<StatusFilter, 'all'> {
  if (row.status === 'paid') return 'paid';
  return row.isOverdue ? 'overdue' : 'pending';
}

const STATUS_VARIANT: Record<Exclude<StatusFilter, 'all'>, 'success' | 'outline' | 'destructive'> = {
  paid: 'success',
  pending: 'outline',
  overdue: 'destructive',
};

export function InstallmentsTable() {
  const { t, i18n } = useTranslation();
  const [rows, setRows] = useState<InstallmentRow[]>(getInstallmentRows);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');

  const statusOptions: SelectOption[] = useMemo(
    () => [
      { value: 'all', label: t('teacherPages.payments.statusAll') },
      { value: 'paid', label: t('teacherPages.payments.statusPaid') },
      { value: 'pending', label: t('teacherPages.payments.statusPending') },
      { value: 'overdue', label: t('teacherPages.payments.statusOverdue') },
    ],
    [t]
  );

  const filtered = rows.filter((row) => statusFilter === 'all' || rowStatus(row) === statusFilter);

  function refresh() {
    setRows(getInstallmentRows());
  }

  function handleMarkPaid(row: InstallmentRow) {
    markInstallmentPaid(row.id, row.paymentMethod ?? 'cash');
    toast.success(t('teacherPages.payments.toast.marked'));
    refresh();
  }

  function handleSendReminder(row: InstallmentRow) {
    sendPaymentReminder(row);
    toast.success(t('teacherPages.payments.toast.reminderSent'));
  }

  return (
    <section className="space-y-4">
      <div className="sm:w-56">
        <Select
          label={t('teacherPages.payments.filterStatus')}
          options={statusOptions}
          value={statusFilter}
          onChange={(v) => setStatusFilter(v as StatusFilter)}
        />
      </div>

      {filtered.length === 0 ? (
        <EmptyState description={t('teacherPages.payments.installmentsTable.empty')} />
      ) : (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('teacherPages.payments.installmentsTable.student')}</TableHead>
                  <TableHead>{t('teacherPages.payments.installmentsTable.course')}</TableHead>
                  <TableHead>{t('teacherPages.payments.installmentsTable.installment')}</TableHead>
                  <TableHead>{t('teacherPages.payments.installmentsTable.amount')}</TableHead>
                  <TableHead>{t('teacherPages.payments.installmentsTable.dueDate')}</TableHead>
                  <TableHead>{t('teacherPages.payments.installmentsTable.status')}</TableHead>
                  <TableHead />
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((row) => {
                  const status = rowStatus(row);
                  return (
                    <TableRow key={row.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar src={row.studentAvatar} alt={row.studentName} size="sm" />
                          <span className="font-medium text-[#F9F6F0]">{row.studentName}</span>
                        </div>
                      </TableCell>
                      <TableCell>{row.courseName}</TableCell>
                      <TableCell>
                        {t('teacherPages.payments.installmentsTable.installmentOf', {
                          number: row.installmentNumber,
                          total: row.totalInstallments,
                        })}
                      </TableCell>
                      <TableCell>
                        {row.amount} {row.currency}
                      </TableCell>
                      <TableCell>{new Date(row.dueDate).toLocaleDateString(i18n.language)}</TableCell>
                      <TableCell>
                        <Badge variant={STATUS_VARIANT[status]}>{t(`teacherPages.payments.status${status[0].toUpperCase()}${status.slice(1)}`)}</Badge>
                      </TableCell>
                      <TableCell>
                        {row.status === 'pending' && (
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" onClick={() => handleMarkPaid(row)}>
                              <CheckCircle2 className="h-3.5 w-3.5" />
                              {t('teacherPages.payments.installmentsTable.markPaid')}
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => handleSendReminder(row)}>
                              <Bell className="h-3.5 w-3.5" />
                              {t('teacherPages.payments.installmentsTable.sendReminder')}
                            </Button>
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </section>
  );
}

import { useMemo, useState } from 'react';
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
  Avatar,
  Badge,
  Select,
  EmptyState,
  ErrorState,
  Spinner,
  type SelectOption,
} from '@/components/ui';
import { useTeacherInstallments } from './queries';
import type { TeacherInstallment } from './types';

type StatusFilter = 'all' | 'paid' | 'pending' | 'overdue';

function rowStatus(row: TeacherInstallment): Exclude<StatusFilter, 'all'> {
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
  const { data: installments = [], isLoading, isError, refetch } = useTeacherInstallments();
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

  const filtered = installments.filter((row) => statusFilter === 'all' || rowStatus(row) === statusFilter);

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
                  <TableHead>{t('teacherPages.payments.installmentsTable.amount')}</TableHead>
                  <TableHead>{t('teacherPages.payments.installmentsTable.dueDate')}</TableHead>
                  <TableHead>{t('teacherPages.payments.installmentsTable.status')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((row) => {
                  const status = rowStatus(row);
                  return (
                    <TableRow key={row.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar src={row.studentAvatar ?? undefined} alt={row.studentName} size="sm" />
                          <span className="font-medium text-[#F9F6F0]">{row.studentName}</span>
                        </div>
                      </TableCell>
                      <TableCell>{row.courseTitle}</TableCell>
                      <TableCell>
                        {row.amount} {row.currency}
                      </TableCell>
                      <TableCell>{new Date(row.dueDate).toLocaleDateString(i18n.language)}</TableCell>
                      <TableCell>
                        <Badge variant={STATUS_VARIANT[status]}>
                          {t(`teacherPages.payments.status${status[0].toUpperCase()}${status.slice(1)}`)}
                        </Badge>
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

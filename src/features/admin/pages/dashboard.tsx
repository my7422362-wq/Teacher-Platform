import { useTranslation } from 'react-i18next';
import { PageHeader } from '@/components/shared/page-header';
import { Spinner, ErrorState } from '@/components/ui';
import { OverviewStats, TopTeachers, RecentPendingPayments, useAdminOverview } from '@/features/admin/components/Overview';

export function AdminDashboardPage() {
  const { t } = useTranslation();
  const { data: overview, isLoading, isError, refetch } = useAdminOverview();

  return (
    <div className="space-y-8">
      <PageHeader title={t('adminPages.overview.title')} description={t('adminPages.overview.description')} />

      {isLoading ? (
        <div className="flex justify-center py-16">
          <Spinner />
        </div>
      ) : isError || !overview ? (
        <ErrorState description={t('adminPages.overview.toast.loadFailed')} onRetry={() => refetch()} />
      ) : (
        <>
          <OverviewStats overview={overview} />
          <div className="grid gap-4 lg:grid-cols-2">
            <RecentPendingPayments />
            <TopTeachers />
          </div>
        </>
      )}
    </div>
  );
}

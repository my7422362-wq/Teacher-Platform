import { useTranslation } from 'react-i18next';
import { PageHeader } from '@/components/shared/page-header';
import { AdminPaymentsTable } from '@/features/admin/components/Payments';

export function AdminPaymentsPage() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <PageHeader title={t('adminPages.payments.title')} description={t('adminPages.payments.description')} />
      <AdminPaymentsTable />
    </div>
  );
}

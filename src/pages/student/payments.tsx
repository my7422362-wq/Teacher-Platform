import { useTranslation } from 'react-i18next';
import { PageHeader } from '@/components/common/page-header';
import { MyPayments } from '@/features/student/components/Dashboard';

export function StudentPaymentsPage() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('studentPages.payments.title')}
        description={t('studentPages.payments.description')}
      />
      <MyPayments />
    </div>
  );
}

import { useTranslation } from 'react-i18next';
import { PageHeader } from '@/components/common/page-header';
import { PaymentsGrid } from '@/features/teacher/components/Payments';

export function TeacherPaymentsPage() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <PageHeader title={t('teacherPages.payments.title')} description={t('teacherPages.payments.description')} />
      <PaymentsGrid />
    </div>
  );
}

import { useTranslation } from 'react-i18next';
import { PageHeader } from '@/components/shared/page-header';
import { TeachersGrid } from '@/features/admin/components/Teachers';

export function AdminTeachersPage() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <PageHeader title={t('adminPages.teachers.title')} description={t('adminPages.teachers.description')} />
      <TeachersGrid />
    </div>
  );
}

import { useTranslation } from 'react-i18next';
import { PageHeader } from '@/components/shared/page-header';
import { StudentsTable } from '@/features/admin/components/Students';

export function AdminStudentsPage() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <PageHeader title={t('adminPages.students.title')} description={t('adminPages.students.description')} />
      <StudentsTable />
    </div>
  );
}

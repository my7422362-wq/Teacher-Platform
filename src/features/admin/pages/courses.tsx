import { useTranslation } from 'react-i18next';
import { PageHeader } from '@/components/shared/page-header';
import { CoursesTable } from '@/features/admin/components/Courses';

export function AdminCoursesPage() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <PageHeader title={t('adminPages.courses.title')} description={t('adminPages.courses.description')} />
      <CoursesTable />
    </div>
  );
}

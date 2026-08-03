import { useTranslation } from 'react-i18next';
import { PageHeader } from '@/components/shared/page-header';
import { ParentsTable } from '@/features/teacher/components/Parents';

export function TeacherParentsPage() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('teacherPages.parents.title')}
        description={t('teacherPages.parents.description')}
      />
      <ParentsTable />
    </div>
  );
}


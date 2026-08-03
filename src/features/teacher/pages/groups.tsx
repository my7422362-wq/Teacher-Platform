import { useTranslation } from 'react-i18next';
import { PageHeader } from '@/components/shared/page-header';
import { GroupsGrid } from '@/features/teacher/components/Groups';

export function TeacherGroupsPage() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <PageHeader title={t('teacherPages.groups.title')} description={t('teacherPages.groups.description')} />
      <GroupsGrid />
    </div>
  );
}


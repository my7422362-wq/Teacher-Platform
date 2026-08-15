import { useTranslation } from 'react-i18next';
import { PageHeader } from '@/components/shared/page-header';
import { CategoriesGrid } from '@/features/teacher/components/Categories';

export function TeacherCategoriesPage() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('teacherPages.categories.title')}
        description={t('teacherPages.categories.description')}
      />
      <CategoriesGrid />
    </div>
  );
}

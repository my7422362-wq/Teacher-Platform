import { useTranslation } from 'react-i18next';
import { PageHeader } from '@/components/common/page-header';
import { MyCoursesList, RecommendedCourses } from '@/features/student/components/Dashboard';

export function StudentCoursesPage() {
  const { t } = useTranslation();

  return (
    <div className="space-y-8">
      <PageHeader
        title={t('studentPages.courses.title')}
        description={t('studentPages.courses.description')}
      />
      <MyCoursesList />
      <RecommendedCourses />
    </div>
  );
}

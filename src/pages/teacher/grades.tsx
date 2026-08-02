import { useTranslation } from 'react-i18next';
import { PageHeader } from '@/components/common/page-header';
import { GradesOverviewStats, StudentRanking, getGradesOverview } from '@/features/teacher/components/Grades';

export function TeacherGradesPage() {
  const { t } = useTranslation();
  const overview = getGradesOverview();

  return (
    <div className="space-y-8">
      <PageHeader title={t('teacherPages.grades.title')} description={t('teacherPages.grades.description')} />
      <GradesOverviewStats overview={overview} />
      <StudentRanking ranking={overview.ranking} />
    </div>
  );
}

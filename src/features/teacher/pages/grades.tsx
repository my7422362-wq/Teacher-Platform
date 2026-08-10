import { useTranslation } from 'react-i18next';
import { PageHeader } from '@/components/shared/page-header';
import { Spinner, ErrorState } from '@/components/ui';
import { GradesOverviewStats, StudentRanking, useGradesOverview } from '@/features/teacher/components/Grades';

export function TeacherGradesPage() {
  const { t } = useTranslation();
  const { data: overview, isLoading, isError, refetch } = useGradesOverview();

  return (
    <div className="space-y-8">
      <PageHeader title={t('teacherPages.grades.title')} description={t('teacherPages.grades.description')} />

      {isLoading ? (
        <div className="flex justify-center py-16">
          <Spinner />
        </div>
      ) : isError || !overview ? (
        <ErrorState description={t('teacherPages.grades.toast.loadFailed')} onRetry={() => refetch()} />
      ) : (
        <>
          <GradesOverviewStats overview={overview} />
          <StudentRanking ranking={overview.ranking} />
        </>
      )}
    </div>
  );
}

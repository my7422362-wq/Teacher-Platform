import { useTranslation } from 'react-i18next';
import { PageHeader } from '@/components/shared/page-header';
import { RevisionMaterials } from '@/features/student/components/Dashboard';

export function StudentRevisionPage() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('studentPages.revision.title')}
        description={t('studentPages.revision.description')}
      />
      <RevisionMaterials />
    </div>
  );
}


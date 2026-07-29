import { useTranslation } from 'react-i18next';
import { PageHeader } from '@/components/common/page-header';

export function StudentProfilePage() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('studentPages.profile.title')}
        description={t('studentPages.profile.description')}
      />
    </div>
  );
}

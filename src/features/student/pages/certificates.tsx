import { useTranslation } from 'react-i18next';
import { PageHeader } from '@/components/shared/page-header';
import { CertificatesGallery } from '@/features/student/components/Dashboard';

export function StudentCertificatesPage() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('studentPages.certificates.title')}
        description={t('studentPages.certificates.description')}
      />
      <CertificatesGallery />
    </div>
  );
}


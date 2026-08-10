import { useTranslation } from 'react-i18next';
import { Card, CardContent, EmptyState, Spinner, ErrorState } from '@/components/ui';
import { Award } from 'lucide-react';
import { useMyCertificates } from './queries';

export function CertificatesGallery() {
  const { t, i18n } = useTranslation();
  const { data: certificates = [], isLoading, isError, refetch } = useMyCertificates();

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <Spinner />
      </div>
    );
  }

  if (isError) {
    return <ErrorState description={t('studentPages.dashboard.certificates.loadFailed')} onRetry={() => refetch()} />;
  }

  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold text-[#F9F6F0]">
        {t('studentPages.dashboard.certificates.title')}
      </h2>

      {certificates.length === 0 ? (
        <EmptyState
          icon={<Award className="h-12 w-12" />}
          description={t('studentPages.dashboard.certificates.empty')}
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {certificates.map((certificate) => (
            <Card key={certificate.id}>
              <CardContent className="space-y-4 p-5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#D4B59E]/15 text-[#D4B59E]">
                  <Award className="h-5 w-5" />
                </div>

                <div>
                  <h3 className="font-semibold text-[#F9F6F0]">{certificate.courseTitle}</h3>
                  <p className="mt-1 text-xs text-[rgba(249,246,240,0.55)]">
                    {t('studentPages.dashboard.certificates.issuedOn', {
                      date: new Date(certificate.issuedAt).toLocaleDateString(i18n.language),
                    })}
                  </p>
                </div>

                <p className="rounded-lg bg-[#0F2520] px-3 py-2 font-mono text-xs text-[rgba(249,246,240,0.65)]">
                  {t('studentPages.dashboard.certificates.code')}: {certificate.certificateCode}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
}

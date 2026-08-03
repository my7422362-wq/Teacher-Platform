import { useTranslation } from 'react-i18next';
import { Card, CardContent, EmptyState } from '@/components/ui';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Award, Download } from 'lucide-react';
import { studentCertificates } from './data';

export function CertificatesGallery() {
  const { t, i18n } = useTranslation();

  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold text-[#F9F6F0]">
        {t('studentPages.dashboard.certificates.title')}
      </h2>

      {studentCertificates.length === 0 ? (
        <EmptyState
          icon={<Award className="h-12 w-12" />}
          description={t('studentPages.dashboard.certificates.empty')}
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {studentCertificates.map((certificate) => (
            <Card key={certificate.id}>
              <CardContent className="space-y-4 p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#D4B59E]/15 text-[#D4B59E]">
                    <Award className="h-5 w-5" />
                  </div>
                  <span className="rounded-lg bg-[#D4B59E]/15 px-2.5 py-1 text-sm font-semibold text-[#D4B59E]">
                    {certificate.grade}
                  </span>
                </div>

                <div>
                  <h3 className="font-semibold text-[#F9F6F0]">{certificate.courseName}</h3>
                  <p className="mt-1 text-xs text-[rgba(249,246,240,0.55)]">
                    {t('studentPages.dashboard.certificates.issuedOn', {
                      date: new Date(certificate.issuedAt).toLocaleDateString(i18n.language),
                    })}
                  </p>
                </div>

                <a
                  href={certificate.certificateUrl}
                  className={cn(buttonVariants({ variant: 'outline', size: 'sm' }), 'w-full')}
                >
                  <Download className="h-4 w-4" />
                  {t('studentPages.dashboard.certificates.download')}
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
}

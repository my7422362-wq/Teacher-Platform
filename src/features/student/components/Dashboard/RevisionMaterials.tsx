import { useTranslation } from 'react-i18next';
import { Card, CardContent, EmptyState } from '@/components/ui';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { FileText, Video, Layers, BookOpenCheck } from 'lucide-react';
import { revisionMaterials } from './data';
import type { RevisionMaterial } from '@/types';

const TYPE_ICON: Record<RevisionMaterial['type'], typeof FileText> = {
  summary: FileText,
  video: Video,
  flashcards: Layers,
};

const TYPE_KEY: Record<RevisionMaterial['type'], string> = {
  summary: 'studentPages.dashboard.revisionMaterials.typeSummary',
  video: 'studentPages.dashboard.revisionMaterials.typeVideo',
  flashcards: 'studentPages.dashboard.revisionMaterials.typeFlashcards',
};

export function RevisionMaterials() {
  const { t } = useTranslation();

  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold text-[#F9F6F0]">
        {t('studentPages.dashboard.revisionMaterials.title')}
      </h2>

      {revisionMaterials.length === 0 ? (
        <EmptyState
          icon={<BookOpenCheck className="h-12 w-12" />}
          description={t('studentPages.dashboard.revisionMaterials.empty')}
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {revisionMaterials.map((material) => {
            const Icon = TYPE_ICON[material.type];
            return (
              <Card key={material.id}>
                <CardContent className="space-y-3 p-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#D4B59E]/15 text-[#D4B59E]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-xs font-medium text-[#D4B59E]">{t(TYPE_KEY[material.type])}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#F9F6F0]">{material.title}</h3>
                    <p className="mt-1 text-sm text-[rgba(249,246,240,0.65)]">{material.description}</p>
                  </div>
                  <a
                    href={material.url}
                    className={cn(buttonVariants({ variant: 'outline', size: 'sm' }), 'w-full')}
                  >
                    {t('studentPages.dashboard.revisionMaterials.view')}
                  </a>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </section>
  );
}

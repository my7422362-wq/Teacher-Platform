import { useTranslation } from 'react-i18next';
import { EmptyState } from '@/components/ui';
import { BookOpenCheck } from 'lucide-react';

/** The backend has no endpoint to list revision materials for a course
 *  (GET /courses/{course}/revision-materials is commented out in the
 *  route file), so this can only show an honest "not available" state —
 *  there's no real data to fetch here yet. */
export function RevisionMaterials() {
  const { t } = useTranslation();

  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold text-[#F9F6F0]">
        {t('studentPages.dashboard.revisionMaterials.title')}
      </h2>
      <EmptyState
        icon={<BookOpenCheck className="h-12 w-12" />}
        description={t('studentPages.dashboard.revisionMaterials.unavailable')}
      />
    </section>
  );
}

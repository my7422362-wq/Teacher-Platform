import { useTranslation } from 'react-i18next';
import { Modal, Badge } from '@/components/ui';
import type { TeacherLesson } from './types';

export function LessonPreviewModal({
  isOpen,
  onClose,
  lesson,
}: {
  isOpen: boolean;
  onClose: () => void;
  lesson: TeacherLesson | null;
}) {
  const { t } = useTranslation();
  if (!lesson) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t('teacherPages.lessons.previewTitle')} size="lg">
      <div className="space-y-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold text-[#F9F6F0]">{lesson.title}</h3>
            {lesson.isPreview && <Badge variant="outline">{t('teacherPages.lessons.fields.isFree')}</Badge>}
          </div>
          {lesson.description && (
            <p className="mt-1 text-sm text-[rgba(249,246,240,0.65)]">{lesson.description}</p>
          )}
        </div>

        <div>
          <p className="mb-2 text-xs font-medium text-[rgba(249,246,240,0.45)]">
            {t('teacherPages.lessons.fields.video')}
          </p>
          {lesson.videoUrl ? (
            <video controls className="aspect-video w-full rounded-xl border border-[rgba(212,181,158,0.18)] bg-black">
              <source src={lesson.videoUrl} />
            </video>
          ) : (
            <p className="rounded-xl border border-dashed border-[rgba(212,181,158,0.18)] p-4 text-center text-sm text-[rgba(249,246,240,0.45)]">
              {t('teacherPages.lessons.noVideo')}
            </p>
          )}
        </div>
      </div>
    </Modal>
  );
}

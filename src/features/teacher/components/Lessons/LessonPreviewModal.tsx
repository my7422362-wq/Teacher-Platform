import { useTranslation } from 'react-i18next';
import { Modal, Badge } from '@/components/ui';
import { PlayCircle, FileText } from 'lucide-react';
import type { Lesson } from '@/types';

export function LessonPreviewModal({
  isOpen,
  onClose,
  lesson,
}: {
  isOpen: boolean;
  onClose: () => void;
  lesson: Lesson | null;
}) {
  const { t } = useTranslation();
  if (!lesson) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t('teacherPages.lessons.previewTitle')} size="lg">
      <div className="space-y-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold text-[#F9F6F0]">{lesson.title}</h3>
            <Badge variant="outline">{t(`teacherPages.lessons.types.${lesson.type}`)}</Badge>
          </div>
          <p className="mt-1 text-sm text-[rgba(249,246,240,0.65)]">{lesson.description}</p>
        </div>

        <div>
          <p className="mb-2 text-xs font-medium text-[rgba(249,246,240,0.45)]">
            {t('teacherPages.lessons.fields.video')}
          </p>
          {lesson.videoFileName ? (
            <div className="flex aspect-video items-center justify-center gap-2 rounded-xl border border-[rgba(212,181,158,0.18)] bg-[#0F2520]">
              <PlayCircle className="h-10 w-10 text-[#D4B59E]" />
              <span className="text-sm text-[rgba(249,246,240,0.75)]">{lesson.videoFileName}</span>
            </div>
          ) : (
            <p className="rounded-xl border border-dashed border-[rgba(212,181,158,0.18)] p-4 text-center text-sm text-[rgba(249,246,240,0.45)]">
              {t('teacherPages.lessons.noVideo')}
            </p>
          )}
        </div>

        <div>
          <p className="mb-2 text-xs font-medium text-[rgba(249,246,240,0.45)]">
            {t('teacherPages.lessons.fields.pdf')}
          </p>
          {lesson.pdfFileName ? (
            <div className="flex items-center gap-3 rounded-xl border border-[rgba(212,181,158,0.18)] bg-[#16342D] p-4">
              <FileText className="h-8 w-8 shrink-0 text-[#D4B59E]" />
              <span className="text-sm text-[#F9F6F0]">{lesson.pdfFileName}</span>
            </div>
          ) : (
            <p className="rounded-xl border border-dashed border-[rgba(212,181,158,0.18)] p-4 text-center text-sm text-[rgba(249,246,240,0.45)]">
              {t('teacherPages.lessons.noPdf')}
            </p>
          )}
        </div>
      </div>
    </Modal>
  );
}

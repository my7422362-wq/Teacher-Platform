import { useEffect, useMemo, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import { Modal, Button, Input, Textarea, Checkbox } from '@/components/ui';
import { Video, X } from 'lucide-react';
import { createLessonSchema, type LessonFormSchemaValues } from './schemas';
import { useCreateLesson, useUpdateLesson } from './queries';
import type { TeacherLesson } from './types';

const DEFAULT_VALUES: LessonFormSchemaValues = {
  title: '',
  description: '',
  duration: 0,
  isPreview: false,
};

interface LessonFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseSlug: string;
  courseSectionId: number;
  lesson: TeacherLesson | null;
}

export function LessonFormModal({ isOpen, onClose, courseSlug, courseSectionId, lesson }: LessonFormModalProps) {
  const { t } = useTranslation();
  const schema = useMemo(() => createLessonSchema(t), [t]);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const createLesson = useCreateLesson(courseSlug);
  const updateLesson = useUpdateLesson(courseSlug);
  const submitting = createLesson.isPending || updateLesson.isPending;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LessonFormSchemaValues>({
    resolver: zodResolver(schema),
    defaultValues: DEFAULT_VALUES,
  });

  useEffect(() => {
    if (!isOpen) return;
    setVideoFile(null);
    reset(
      lesson
        ? {
            title: lesson.title,
            description: lesson.description ?? '',
            duration: lesson.duration ?? 0,
            isPreview: lesson.isPreview,
          }
        : DEFAULT_VALUES
    );
  }, [isOpen, lesson, reset]);

  const onSubmit = async (values: LessonFormSchemaValues) => {
    try {
      if (lesson) {
        await updateLesson.mutateAsync({ lessonId: lesson.id, values, video: videoFile });
        toast.success(t('teacherPages.lessons.toast.updated'));
      } else {
        await createLesson.mutateAsync({ courseSectionId, values, video: videoFile });
        toast.success(t('teacherPages.lessons.toast.created'));
      }
      onClose();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t('teacherPages.lessons.toast.saveFailed'));
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={lesson ? t('teacherPages.lessons.editLesson') : t('teacherPages.lessons.addLesson')}
      size="lg"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <div className="space-y-2">
          <label className="text-sm font-medium text-[#F9F6F0]">{t('teacherPages.lessons.fields.title')}</label>
          <Input error={errors.title?.message} {...register('title')} />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-[#F9F6F0]">{t('teacherPages.lessons.fields.description')}</label>
          <Textarea rows={3} error={errors.description?.message} {...register('description')} />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-[#F9F6F0]">{t('teacherPages.lessons.fields.durationMinutes')}</label>
          <Input
            type="number"
            min={0}
            error={errors.duration?.message}
            {...register('duration', { valueAsNumber: true })}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-[#F9F6F0]">{t('teacherPages.lessons.fields.video')}</label>
          <input
            ref={videoInputRef}
            type="file"
            accept="video/*"
            className="hidden"
            onChange={(e) => setVideoFile(e.target.files?.[0] ?? null)}
          />
          {videoFile ? (
            <div className="flex items-center justify-between rounded-xl border border-[rgba(212,181,158,0.18)] bg-[#16342D] px-4 py-2 text-sm text-[#F9F6F0]">
              <span className="flex items-center gap-2 truncate">
                <Video className="h-4 w-4 shrink-0 text-[#D4B59E]" />
                {videoFile.name}
              </span>
              <button
                type="button"
                onClick={() => setVideoFile(null)}
                className="shrink-0 text-[rgba(249,246,240,0.45)] hover:text-destructive"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : lesson?.videoUrl ? (
            <div className="flex items-center justify-between rounded-xl border border-[rgba(212,181,158,0.18)] bg-[#16342D] px-4 py-2 text-sm text-[rgba(249,246,240,0.65)]">
              <span className="flex items-center gap-2 truncate">
                <Video className="h-4 w-4 shrink-0 text-[#D4B59E]" />
                {t('teacherPages.lessons.videoAlreadyUploaded')}
              </span>
              <Button type="button" variant="outline" size="sm" onClick={() => videoInputRef.current?.click()}>
                {t('teacherPages.lessons.replaceVideo')}
              </Button>
            </div>
          ) : (
            <Button type="button" variant="outline" size="sm" onClick={() => videoInputRef.current?.click()}>
              <Video className="h-4 w-4" />
              {t('teacherPages.lessons.uploadVideo')}
            </Button>
          )}
        </div>

        <label className="flex items-center gap-2 text-sm text-[#F9F6F0] cursor-pointer">
          <Checkbox {...register('isPreview')} />
          {t('teacherPages.lessons.fields.isFree')}
        </label>

        <div className="flex justify-end gap-3 pt-2">
          <Button type="button" variant="outline" onClick={onClose}>
            {t('teacherPages.courses.cancel')}
          </Button>
          <Button type="submit" loading={submitting} className="bg-[#D4B59E] text-[#0F2520] hover:bg-[#C7A187]">
            {t('teacherPages.courses.save')}
          </Button>
        </div>
      </form>
    </Modal>
  );
}

import { useEffect, useMemo, useRef, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import { Modal, Button, Input, Textarea, Select, Checkbox, type SelectOption } from '@/components/ui';
import { Video, FileText, X } from 'lucide-react';
import { createLessonSchema, type LessonFormSchemaValues } from './schemas';
import { createLesson, updateLesson } from './lesson-store';
import type { Lesson } from '@/types';

const DEFAULT_VALUES: LessonFormSchemaValues = {
  title: '',
  description: '',
  duration: '',
  type: 'video',
  isFree: false,
  isPublished: true,
  videoFileName: undefined,
  pdfFileName: undefined,
};

interface LessonFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseId: number;
  lesson: Lesson | null;
  onSaved: () => void;
}

export function LessonFormModal({ isOpen, onClose, courseId, lesson, onSaved }: LessonFormModalProps) {
  const { t } = useTranslation();
  const [submitting, setSubmitting] = useState(false);
  const schema = useMemo(() => createLessonSchema(t), [t]);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const pdfInputRef = useRef<HTMLInputElement>(null);

  const typeOptions: SelectOption[] = useMemo(
    () => [
      { value: 'video', label: t('teacherPages.lessons.types.video') },
      { value: 'article', label: t('teacherPages.lessons.types.article') },
      { value: 'quiz', label: t('teacherPages.lessons.types.quiz') },
      { value: 'assignment', label: t('teacherPages.lessons.types.assignment') },
    ],
    [t]
  );

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<LessonFormSchemaValues>({
    resolver: zodResolver(schema),
    defaultValues: DEFAULT_VALUES,
  });

  const videoFileName = watch('videoFileName');
  const pdfFileName = watch('pdfFileName');

  useEffect(() => {
    if (!isOpen) return;
    reset(
      lesson
        ? {
            title: lesson.title,
            description: lesson.description,
            duration: lesson.duration,
            type: lesson.type,
            isFree: lesson.isFree,
            isPublished: lesson.isPublished,
            videoFileName: lesson.videoFileName,
            pdfFileName: lesson.pdfFileName,
          }
        : DEFAULT_VALUES
    );
  }, [isOpen, lesson, reset]);

  const onSubmit = async (values: LessonFormSchemaValues) => {
    setSubmitting(true);
    try {
      if (lesson) {
        updateLesson(lesson.id, values);
        toast.success(t('teacherPages.lessons.toast.updated'));
      } else {
        createLesson(courseId, values);
        toast.success(t('teacherPages.lessons.toast.created'));
      }
      onSaved();
      onClose();
    } finally {
      setSubmitting(false);
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

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium text-[#F9F6F0]">{t('teacherPages.lessons.fields.duration')}</label>
            <Input
              placeholder={t('teacherPages.lessons.fields.durationPlaceholder')}
              error={errors.duration?.message}
              {...register('duration')}
            />
          </div>

          <Controller
            control={control}
            name="type"
            render={({ field }) => (
              <Select
                label={t('teacherPages.lessons.fields.type')}
                options={typeOptions}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-[#F9F6F0]">{t('teacherPages.lessons.fields.video')}</label>
          <input
            ref={videoInputRef}
            type="file"
            accept="video/*"
            className="hidden"
            onChange={(e) => setValue('videoFileName', e.target.files?.[0]?.name)}
          />
          {videoFileName ? (
            <div className="flex items-center justify-between rounded-xl border border-[rgba(212,181,158,0.18)] bg-[#16342D] px-4 py-2 text-sm text-[#F9F6F0]">
              <span className="flex items-center gap-2 truncate">
                <Video className="h-4 w-4 shrink-0 text-[#D4B59E]" />
                {videoFileName}
              </span>
              <button
                type="button"
                onClick={() => setValue('videoFileName', undefined)}
                className="shrink-0 text-[rgba(249,246,240,0.45)] hover:text-destructive"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <Button type="button" variant="outline" size="sm" onClick={() => videoInputRef.current?.click()}>
              <Video className="h-4 w-4" />
              {t('teacherPages.lessons.uploadVideo')}
            </Button>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-[#F9F6F0]">{t('teacherPages.lessons.fields.pdf')}</label>
          <input
            ref={pdfInputRef}
            type="file"
            accept="application/pdf"
            className="hidden"
            onChange={(e) => setValue('pdfFileName', e.target.files?.[0]?.name)}
          />
          {pdfFileName ? (
            <div className="flex items-center justify-between rounded-xl border border-[rgba(212,181,158,0.18)] bg-[#16342D] px-4 py-2 text-sm text-[#F9F6F0]">
              <span className="flex items-center gap-2 truncate">
                <FileText className="h-4 w-4 shrink-0 text-[#D4B59E]" />
                {pdfFileName}
              </span>
              <button
                type="button"
                onClick={() => setValue('pdfFileName', undefined)}
                className="shrink-0 text-[rgba(249,246,240,0.45)] hover:text-destructive"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <Button type="button" variant="outline" size="sm" onClick={() => pdfInputRef.current?.click()}>
              <FileText className="h-4 w-4" />
              {t('teacherPages.lessons.uploadPdf')}
            </Button>
          )}
        </div>

        <div className="flex flex-wrap gap-4">
          <label className="flex items-center gap-2 text-sm text-[#F9F6F0] cursor-pointer">
            <Checkbox {...register('isFree')} />
            {t('teacherPages.lessons.fields.isFree')}
          </label>
          <label className="flex items-center gap-2 text-sm text-[#F9F6F0] cursor-pointer">
            <Checkbox {...register('isPublished')} />
            {t('teacherPages.lessons.fields.isPublished')}
          </label>
        </div>

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

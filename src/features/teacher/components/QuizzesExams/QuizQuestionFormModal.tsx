import { useEffect, useMemo, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import { Modal, Button, Textarea, Input, Select, type SelectOption } from '@/components/ui';
import { createQuizQuestionSchema, type QuizQuestionSchemaValues } from './schemas';
import { addQuestion, updateQuestion } from './quiz-store';
import type { Question } from '@/types';

const DEFAULT_VALUES: QuizQuestionSchemaValues = {
  text: '',
  type: 'multiple_choice',
  optionsText: '',
  correctAnswer: '',
  points: 10,
};

interface QuizQuestionFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  quizId: number;
  question: Question | null;
  onSaved: () => void;
}

export function QuizQuestionFormModal({ isOpen, onClose, quizId, question, onSaved }: QuizQuestionFormModalProps) {
  const { t } = useTranslation();
  const [submitting, setSubmitting] = useState(false);
  const schema = useMemo(() => createQuizQuestionSchema(t), [t]);

  const typeOptions: SelectOption[] = useMemo(
    () => [
      { value: 'multiple_choice', label: t('teacherPages.quizzesExams.questionTypes.multiple_choice') },
      { value: 'true_false', label: t('teacherPages.quizzesExams.questionTypes.true_false') },
      { value: 'short_answer', label: t('teacherPages.quizzesExams.questionTypes.short_answer') },
      { value: 'essay', label: t('teacherPages.quizzesExams.questionTypes.essay') },
    ],
    [t]
  );

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm<QuizQuestionSchemaValues>({
    resolver: zodResolver(schema),
    defaultValues: DEFAULT_VALUES,
  });

  const type = watch('type');
  const optionsText = watch('optionsText');

  const parsedOptions = useMemo(
    () =>
      type === 'true_false'
        ? ['صح', 'خطأ']
        : (optionsText ?? '').split('\n').map((line) => line.trim()).filter(Boolean),
    [type, optionsText]
  );
  const answerOptions: SelectOption[] = parsedOptions.map((opt) => ({ value: opt, label: opt }));

  useEffect(() => {
    if (!isOpen) return;
    reset(
      question
        ? {
            text: question.text,
            type: question.type,
            optionsText: question.options.join('\n'),
            correctAnswer: Array.isArray(question.correctAnswer) ? question.correctAnswer.join(', ') : question.correctAnswer,
            points: question.points,
          }
        : DEFAULT_VALUES
    );
  }, [isOpen, question, reset]);

  const onSubmit = async (values: QuizQuestionSchemaValues) => {
    setSubmitting(true);
    try {
      const options =
        values.type === 'true_false' ? ['صح', 'خطأ'] : (values.optionsText ?? '').split('\n').map((l) => l.trim()).filter(Boolean);

      const payload = {
        text: values.text,
        type: values.type,
        options: values.type === 'short_answer' || values.type === 'essay' ? [] : options,
        correctAnswer: values.correctAnswer,
        points: values.points,
      };

      if (question) {
        updateQuestion(quizId, question.id, payload);
        toast.success(t('teacherPages.quizzesExams.toast.questionUpdated'));
      } else {
        addQuestion(quizId, payload);
        toast.success(t('teacherPages.quizzesExams.toast.questionAdded'));
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
      title={question ? t('teacherPages.quizzesExams.editQuestion') : t('teacherPages.quizzesExams.addQuestion')}
      size="lg"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <div className="space-y-2">
          <label className="text-sm font-medium text-[#F9F6F0]">{t('teacherPages.quizzesExams.questionFields.text')}</label>
          <Textarea rows={2} error={errors.text?.message} {...register('text')} />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Controller
            control={control}
            name="type"
            render={({ field }) => (
              <Select
                label={t('teacherPages.quizzesExams.questionFields.type')}
                options={typeOptions}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
          <div className="space-y-2">
            <label className="text-sm font-medium text-[#F9F6F0]">{t('teacherPages.quizzesExams.questionFields.points')}</label>
            <Input type="number" min={1} error={errors.points?.message} {...register('points', { valueAsNumber: true })} />
          </div>
        </div>

        {type === 'multiple_choice' && (
          <div className="space-y-2">
            <label className="text-sm font-medium text-[#F9F6F0]">{t('teacherPages.quizzesExams.questionFields.options')}</label>
            <Textarea
              rows={4}
              placeholder={t('teacherPages.quizzesExams.questionFields.optionsPlaceholder')}
              {...register('optionsText')}
            />
          </div>
        )}

        {(type === 'multiple_choice' || type === 'true_false') && (
          <Controller
            control={control}
            name="correctAnswer"
            render={({ field }) => (
              <Select
                label={t('teacherPages.quizzesExams.questionFields.correctAnswer')}
                options={answerOptions}
                value={field.value}
                onChange={field.onChange}
                error={errors.correctAnswer?.message}
              />
            )}
          />
        )}

        {type === 'short_answer' && (
          <div className="space-y-2">
            <label className="text-sm font-medium text-[#F9F6F0]">
              {t('teacherPages.quizzesExams.questionFields.correctAnswer')}
            </label>
            <Input
              placeholder={t('teacherPages.quizzesExams.questionFields.correctAnswerPlaceholder')}
              error={errors.correctAnswer?.message}
              {...register('correctAnswer')}
            />
          </div>
        )}

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

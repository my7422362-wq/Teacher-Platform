import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { Modal, Button, Input, Select } from '@/components/ui';
import { useTeacherCourses } from '@/features/teacher/components/Courses/queries';
import { useCreateMeeting } from './queries';

interface MeetingFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function defaultScheduledAt(): string {
  const now = new Date(Date.now() + 5 * 60 * 1000);
  now.setSeconds(0, 0);
  const offset = now.getTimezoneOffset();
  return new Date(now.getTime() - offset * 60 * 1000).toISOString().slice(0, 16);
}

export function MeetingFormModal({ isOpen, onClose }: MeetingFormModalProps) {
  const { t } = useTranslation();
  const { data: courses = [] } = useTeacherCourses();
  const createMeeting = useCreateMeeting();

  const [courseSlug, setCourseSlug] = useState('');
  const [title, setTitle] = useState('');
  const [scheduledAt, setScheduledAt] = useState(defaultScheduledAt());

  useEffect(() => {
    if (!isOpen) return;
    setCourseSlug(courses[0]?.slug ?? '');
    setTitle('');
    setScheduledAt(defaultScheduledAt());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const courseOptions = courses.map((c) => ({ value: c.slug, label: c.title }));

  async function handleSubmit() {
    if (!courseSlug) {
      toast.error(t('meetings.validation.courseRequired'));
      return;
    }
    if (!title.trim()) {
      toast.error(t('meetings.validation.titleRequired'));
      return;
    }
    try {
      await createMeeting.mutateAsync({
        courseSlug,
        values: { title: title.trim(), scheduledAt: new Date(scheduledAt).toISOString() },
      });
      toast.success(t('meetings.toast.created'));
      onClose();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t('meetings.toast.saveFailed'));
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t('meetings.createMeeting')} size="md">
      <div className="space-y-4">
        <Select
          label={t('meetings.fields.course')}
          options={courseOptions}
          value={courseSlug}
          onChange={setCourseSlug}
        />

        <div className="space-y-2">
          <label className="text-sm font-medium text-[#F9F6F0]">{t('meetings.fields.title')}</label>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-[#F9F6F0]">{t('meetings.fields.scheduledAt')}</label>
          <Input type="datetime-local" value={scheduledAt} onChange={(e) => setScheduledAt(e.target.value)} />
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <Button type="button" variant="outline" onClick={onClose}>
            {t('teacherPages.courses.cancel')}
          </Button>
          <Button
            type="button"
            onClick={handleSubmit}
            loading={createMeeting.isPending}
            className="bg-[#D4B59E] text-[#0F2520] hover:bg-[#C7A187]"
          >
            {t('teacherPages.courses.save')}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

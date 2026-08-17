import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { Card, CardContent, Badge, Button, Modal, EmptyState, ErrorState, Spinner } from '@/components/ui';
import { Video, Trash2, Plus, Calendar } from 'lucide-react';
import { useTeacherMeetings, useDeleteMeeting, type TeacherMeetingItem } from './queries';
import { MeetingFormModal } from './MeetingFormModal';

export function MeetingsGrid() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { data: meetings, isLoading, isError, refetch } = useTeacherMeetings();
  const deleteMeeting = useDeleteMeeting();
  const [formOpen, setFormOpen] = useState(false);
  const [deletingItem, setDeletingItem] = useState<TeacherMeetingItem | null>(null);

  async function handleConfirmDelete() {
    if (!deletingItem) return;
    try {
      await deleteMeeting.mutateAsync({ meetingId: deletingItem.meeting.id, courseSlug: deletingItem.meeting.courseSlug });
      toast.success(t('meetings.toast.deleted'));
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t('meetings.toast.deleteFailed'));
    } finally {
      setDeletingItem(null);
    }
  }

  function handleStart(item: TeacherMeetingItem) {
    const params = new URLSearchParams({ room: item.meeting.roomName, title: item.meeting.title });
    navigate(`/teacher/meetings/room?${params.toString()}`);
  }

  if (isLoading) {
    return (
      <div className="flex justify-center py-16">
        <Spinner />
      </div>
    );
  }

  if (isError) {
    return <ErrorState description={t('meetings.toast.loadFailed')} onRetry={() => refetch()} />;
  }

  return (
    <section className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={() => setFormOpen(true)} className="bg-[#D4B59E] text-[#0F2520] hover:bg-[#C7A187]">
          <Plus className="h-4 w-4" />
          {t('meetings.createMeeting')}
        </Button>
      </div>

      {meetings.length === 0 ? (
        <EmptyState icon={<Video className="h-12 w-12" />} description={t('meetings.empty')} />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {meetings.map((item) => {
            const isPast = new Date(item.meeting.scheduledAt).getTime() < Date.now();
            return (
              <Card key={item.meeting.id}>
                <CardContent className="space-y-3 p-5">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold text-[#F9F6F0]">{item.meeting.title}</h3>
                    <Badge variant={isPast ? 'outline' : 'success'} className="shrink-0">
                      {isPast ? t('meetings.statusPast') : t('meetings.statusUpcoming')}
                    </Badge>
                  </div>
                  <p className="text-sm text-[rgba(249,246,240,0.65)]">{item.courseTitle}</p>
                  <div className="flex items-center gap-1.5 text-xs text-[rgba(249,246,240,0.55)]">
                    <Calendar className="h-3.5 w-3.5" />
                    {new Date(item.meeting.scheduledAt).toLocaleString(i18n.language, {
                      dateStyle: 'medium',
                      timeStyle: 'short',
                    })}
                  </div>
                  <div className="flex gap-2 pt-1">
                    <Button variant="outline" size="sm" className="flex-1" onClick={() => handleStart(item)}>
                      <Video className="h-3.5 w-3.5" />
                      {t('meetings.start')}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-destructive hover:bg-destructive/10"
                      onClick={() => setDeletingItem(item)}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      <MeetingFormModal isOpen={formOpen} onClose={() => setFormOpen(false)} />

      <Modal
        isOpen={deletingItem !== null}
        onClose={() => setDeletingItem(null)}
        title={t('meetings.deleteConfirmTitle')}
        size="sm"
      >
        <p className="text-sm text-[rgba(249,246,240,0.75)]">
          {t('meetings.deleteConfirmMessage', { title: deletingItem?.meeting.title })}
        </p>
        <div className="mt-6 flex justify-end gap-3">
          <Button variant="outline" onClick={() => setDeletingItem(null)}>
            {t('teacherPages.courses.cancel')}
          </Button>
          <Button
            onClick={handleConfirmDelete}
            loading={deleteMeeting.isPending}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {t('teacherPages.courses.confirm')}
          </Button>
        </div>
      </Modal>
    </section>
  );
}

import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, Badge, Button, EmptyState, Spinner, ErrorState } from '@/components/ui';
import { Video, Calendar } from 'lucide-react';
import { useMyMeetings } from './queries';
import type { Meeting } from '@/services';

/** A meeting is joinable a bit before its scheduled time and stays
 *  joinable afterward — there's no server-signaled "live now" state, so
 *  this is a simple time-window heuristic rather than fabricated status. */
function isJoinable(meeting: Meeting): boolean {
  const minutesUntilStart = (new Date(meeting.scheduledAt).getTime() - Date.now()) / 60000;
  return minutesUntilStart <= 15;
}

export function MeetingsList() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { data: meetings = [], isLoading, isError, refetch } = useMyMeetings();

  function handleJoin(meeting: Meeting) {
    const params = new URLSearchParams({ room: meeting.roomName, title: meeting.title });
    navigate(`/student/meetings/room?${params.toString()}`);
  }

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <Spinner />
      </div>
    );
  }

  if (isError) {
    return <ErrorState description={t('meetings.toast.loadFailed')} onRetry={() => refetch()} />;
  }

  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold text-[#F9F6F0]">{t('meetings.title')}</h2>

      {meetings.length === 0 ? (
        <EmptyState icon={<Video className="h-12 w-12" />} description={t('meetings.empty')} />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {meetings.map((meeting) => {
            const joinable = isJoinable(meeting);
            return (
              <Card key={meeting.id}>
                <CardContent className="space-y-3 p-5">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold text-[#F9F6F0]">{meeting.title}</h3>
                    {joinable && <Badge variant="success">{t('meetings.statusReady')}</Badge>}
                  </div>
                  <p className="text-sm text-[rgba(249,246,240,0.65)]">{meeting.courseTitle}</p>
                  <div className="flex items-center gap-1.5 text-xs text-[rgba(249,246,240,0.55)]">
                    <Calendar className="h-3.5 w-3.5" />
                    {new Date(meeting.scheduledAt).toLocaleString(i18n.language, {
                      dateStyle: 'medium',
                      timeStyle: 'short',
                    })}
                  </div>
                  <Button
                    variant={joinable ? 'secondary' : 'outline'}
                    size="sm"
                    className="w-full"
                    disabled={!joinable}
                    onClick={() => handleJoin(meeting)}
                  >
                    <Video className="h-3.5 w-3.5" />
                    {joinable ? t('meetings.join') : t('meetings.notYet')}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </section>
  );
}

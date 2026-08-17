import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { MeetingRoom } from '@/features/meetings/components/MeetingRoom';

export function StudentMeetingRoomPage() {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const roomName = searchParams.get('room') ?? '';
  const title = searchParams.get('title') ?? t('meetings.title');

  if (!roomName) {
    return <p className="text-sm text-destructive">{t('meetings.roomNotFound')}</p>;
  }

  return <MeetingRoom roomName={roomName} title={title} backHref="/student/meetings" />;
}

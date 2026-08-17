import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft } from 'lucide-react';
import { getJitsiEmbedUrl } from '../lib/room';

interface MeetingRoomProps {
  roomName: string;
  title: string;
  backHref: string;
} 

/** Embeds Jitsi Meet's own web client directly in an iframe — it already
 *  ships full meeting UI (mute, camera, chat, screen share), so no SDK
 *  integration is needed for this to work inside the platform. */
export function MeetingRoom({ roomName, title, backHref }: MeetingRoomProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col gap-3">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-[#F9F6F0]">{title}</h1>
        </div>
        <button
          type="button"
          onClick={() => navigate(backHref)}
          className="flex items-center gap-1.5 rounded-lg border border-[rgba(212,181,158,0.18)] px-3 py-1.5 text-sm text-[rgba(249,246,240,0.75)] hover:border-[#D4B59E] hover:text-[#D4B59E]"
        >
          <ArrowLeft className="h-4 w-4" />
          {t('meetings.leaveRoom')}
        </button>
      </div>
      <iframe
        src={getJitsiEmbedUrl(roomName)}
        title={title}
        allow="camera; microphone; fullscreen; display-capture; autoplay"
        className="min-h-0 flex-1 rounded-2xl border border-[rgba(212,181,158,0.18)]"
      />
    </div>
  );
}

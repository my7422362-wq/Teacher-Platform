import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { Card, CardContent, Button, Textarea, Select, Badge, EmptyState, type SelectOption } from '@/components/ui';
import { MessageCircle, Phone, Mail, Users } from 'lucide-react';
import { saveCommunicationLogEntry } from './communication-store';
import { CURRENT_TEACHER_ID } from './data';
import type { CommunicationLogEntry } from '@/types';

const CHANNEL_ICON = {
  call: Phone,
  whatsapp: MessageCircle,
  email: Mail,
  meeting: Users,
} as const;

interface CommunicationLogProps {
  parentId: number;
  entries: CommunicationLogEntry[];
}

export function CommunicationLog({ parentId, entries: initialEntries }: CommunicationLogProps) {
  const { t, i18n } = useTranslation();
  const [entries, setEntries] = useState(initialEntries);
  const [channel, setChannel] = useState<CommunicationLogEntry['channel']>('call');
  const [summary, setSummary] = useState('');

  const channelOptions: SelectOption[] = useMemo(
    () => [
      { value: 'call', label: t('teacherPages.parentDetail.channelCall') },
      { value: 'whatsapp', label: t('teacherPages.parentDetail.channelWhatsapp') },
      { value: 'email', label: t('teacherPages.parentDetail.channelEmail') },
      { value: 'meeting', label: t('teacherPages.parentDetail.channelMeeting') },
    ],
    [t]
  );

  function handleAdd() {
    const trimmed = summary.trim();
    if (!trimmed) return;

    const entry: CommunicationLogEntry = {
      id: Date.now(),
      parentId,
      teacherId: CURRENT_TEACHER_ID,
      channel,
      summary: trimmed,
      date: new Date().toISOString(),
    };
    saveCommunicationLogEntry(entry);
    setEntries((prev) => [entry, ...prev]);
    setSummary('');
    toast.success(t('teacherPages.parentDetail.entryAdded'));
  }

  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold text-[#F9F6F0]">
        {t('teacherPages.parentDetail.communicationTitle')}
      </h2>

      <Card>
        <CardContent className="space-y-3 p-5">
          <div className="sm:w-56">
            <Select options={channelOptions} value={channel} onChange={(v) => setChannel(v as CommunicationLogEntry['channel'])} />
          </div>
          <Textarea
            placeholder={t('teacherPages.parentDetail.summaryPlaceholder')}
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            rows={3}
          />
          <Button
            onClick={handleAdd}
            disabled={!summary.trim()}
            className="bg-[#D4B59E] text-[#0F2520] hover:bg-[#C7A187]"
          >
            {t('teacherPages.parentDetail.addEntry')}
          </Button>
        </CardContent>
      </Card>

      {entries.length === 0 ? (
        <EmptyState
          icon={<MessageCircle className="h-12 w-12" />}
          description={t('teacherPages.parentDetail.communicationEmpty')}
        />
      ) : (
        <Card>
          <CardContent className="divide-y divide-[rgba(212,181,158,0.12)] p-0">
            {entries.map((entry) => {
              const Icon = CHANNEL_ICON[entry.channel];
              return (
                <div key={entry.id} className="flex items-start gap-3 p-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#D4B59E]/15 text-[#D4B59E]">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">
                        {t(`teacherPages.parentDetail.channel${entry.channel[0].toUpperCase()}${entry.channel.slice(1)}`)}
                      </Badge>
                      <span className="text-xs text-[rgba(249,246,240,0.45)]">
                        {new Date(entry.date).toLocaleString(i18n.language)}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-[#F9F6F0]">{entry.summary}</p>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      )}
    </section>
  );
}

import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { Card, CardContent, Button, Textarea, Select, Badge, EmptyState, ErrorState, Spinner, type SelectOption } from '@/components/ui';
import { MessageCircle, Phone, Mail, Users } from 'lucide-react';
import { useCommunicationLog, useAddCommunicationLogEntry } from './queries';
import type { CommunicationChannel } from './types';

const CHANNEL_ICON: Record<CommunicationChannel, typeof Phone> = {
  call: Phone,
  sms: MessageCircle,
  email: Mail,
  in_person: Users,
};

export function CommunicationLog({ parentId }: { parentId: number }) {
  const { t, i18n } = useTranslation();
  const { data: entries = [], isLoading, isError, refetch } = useCommunicationLog(parentId);
  const addEntry = useAddCommunicationLogEntry(parentId);
  const [channel, setChannel] = useState<CommunicationChannel>('call');
  const [message, setMessage] = useState('');

  const channelOptions: SelectOption[] = useMemo(
    () => [
      { value: 'call', label: t('teacherPages.parentDetail.channelCall') },
      { value: 'sms', label: t('teacherPages.parentDetail.channelSms') },
      { value: 'email', label: t('teacherPages.parentDetail.channelEmail') },
      { value: 'in_person', label: t('teacherPages.parentDetail.channelInPerson') },
    ],
    [t]
  );

  async function handleAdd() {
    const trimmed = message.trim();
    if (!trimmed) return;
    try {
      await addEntry.mutateAsync({ message: trimmed, type: channel });
      setMessage('');
      toast.success(t('teacherPages.parentDetail.entryAdded'));
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t('teacherPages.parentDetail.toast.saveFailed'));
    }
  }

  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold text-[#F9F6F0]">
        {t('teacherPages.parentDetail.communicationTitle')}
      </h2>

      <Card>
        <CardContent className="space-y-3 p-5">
          <div className="sm:w-56">
            <Select options={channelOptions} value={channel} onChange={(v) => setChannel(v as CommunicationChannel)} />
          </div>
          <Textarea
            placeholder={t('teacherPages.parentDetail.summaryPlaceholder')}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={3}
          />
          <Button
            onClick={handleAdd}
            disabled={!message.trim()}
            loading={addEntry.isPending}
            className="bg-[#D4B59E] text-[#0F2520] hover:bg-[#C7A187]"
          >
            {t('teacherPages.parentDetail.addEntry')}
          </Button>
        </CardContent>
      </Card>

      {isLoading ? (
        <div className="flex justify-center py-10">
          <Spinner size="sm" />
        </div>
      ) : isError ? (
        <ErrorState description={t('teacherPages.parentDetail.toast.loadFailed')} onRetry={() => refetch()} />
      ) : entries.length === 0 ? (
        <EmptyState
          icon={<MessageCircle className="h-12 w-12" />}
          description={t('teacherPages.parentDetail.communicationEmpty')}
        />
      ) : (
        <Card>
          <CardContent className="divide-y divide-[rgba(212,181,158,0.12)] p-0">
            {entries.map((entry) => {
              const Icon = CHANNEL_ICON[entry.type];
              return (
                <div key={entry.id} className="flex items-start gap-3 p-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#D4B59E]/15 text-[#D4B59E]">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">
                        {t(`teacherPages.parentDetail.channel${entry.type === 'in_person' ? 'InPerson' : entry.type[0].toUpperCase() + entry.type.slice(1)}`)}
                      </Badge>
                      <span className="text-xs text-[rgba(249,246,240,0.45)]">
                        {new Date(entry.loggedAt).toLocaleString(i18n.language)}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-[#F9F6F0]">{entry.message}</p>
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

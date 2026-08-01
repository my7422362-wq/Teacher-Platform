import type { CommunicationLogEntry } from '@/types';

export const mockCommunicationLog: CommunicationLogEntry[] = [
  {
    id: 1,
    parentId: 1,
    teacherId: 1,
    channel: 'call',
    summary: 'اتصال لمتابعة مستوى سارة، والدها راضي جدًا عن تقدمها.',
    date: '2024-06-05T11:00:00Z',
  },
  {
    id: 2,
    parentId: 4,
    teacherId: 1,
    channel: 'whatsapp',
    summary: 'رسالة واتساب لتنبيه ولي أمر عمر بانخفاض نسبة الحضور مؤخرًا.',
    date: '2024-06-08T15:30:00Z',
  },
  {
    id: 3,
    parentId: 4,
    teacherId: 1,
    channel: 'call',
    summary: 'اتصال متابعة، اتفقنا إن عمر هيلتزم بالحضور من الأسبوع الجاي.',
    date: '2024-06-09T10:00:00Z',
  },
];

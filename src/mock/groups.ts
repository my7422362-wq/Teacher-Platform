import type { Group, GroupScheduleSlot } from '@/types';

const DAY_KEYS: GroupScheduleSlot['day'][] = [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
];

const today = DAY_KEYS[new Date().getDay()];
const otherDay = DAY_KEYS[(new Date().getDay() + 2) % 7];

export const mockGroups: Group[] = [
  {
    id: 1,
    name: 'مجموعة بايثون - السبت والثلاثاء',
    courseId: 1,
    teacherId: 1,
    studentIds: [2, 3],
    schedule: [
      { day: today, startTime: '16:00', endTime: '17:30' },
      { day: otherDay, startTime: '16:00', endTime: '17:30' },
    ],
    createdAt: '2024-02-01T00:00:00Z',
  },
  {
    id: 2,
    name: 'مجموعة React - الأحد والأربعاء',
    courseId: 2,
    teacherId: 1,
    studentIds: [2, 4],
    schedule: [
      { day: today, startTime: '18:00', endTime: '19:30' },
      { day: otherDay, startTime: '18:00', endTime: '19:30' },
    ],
    createdAt: '2024-02-15T00:00:00Z',
  },
  {
    id: 3,
    name: 'مجموعة تعلم الآلة - الاثنين',
    courseId: 3,
    teacherId: 1,
    studentIds: [2, 5],
    schedule: [{ day: otherDay, startTime: '17:00', endTime: '19:00' }],
    createdAt: '2024-03-05T00:00:00Z',
  },
  {
    id: 4,
    name: 'مجموعة قواعد البيانات - الخميس',
    courseId: 4,
    teacherId: 1,
    studentIds: [3, 4, 5],
    schedule: [{ day: otherDay, startTime: '15:00', endTime: '16:30' }],
    createdAt: '2024-04-05T00:00:00Z',
  },
];

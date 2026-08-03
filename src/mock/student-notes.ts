import type { StudentNote } from '@/types';

export const mockStudentNotes: StudentNote[] = [
  {
    id: 1,
    studentId: 2,
    teacherId: 1,
    text: 'طالبة متميزة ومتفاعلة جدًا في الحصص، بتسلم الواجبات دايمًا قبل الميعاد.',
    createdAt: '2024-06-10T09:00:00Z',
  },
  {
    id: 2,
    studentId: 5,
    teacherId: 1,
    text: 'محتاج متابعة، معدل حضوره قل في الأسابيع الأخيرة. لازم أكلم ولي الأمر.',
    createdAt: '2024-06-08T14:00:00Z',
  },
];

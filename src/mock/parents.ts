import type { Parent } from '@/types';

export const mockParents: Parent[] = [
  {
    id: 1,
    name: 'خالد سعيد',
    relationship: 'father',
    email: 'khaled.saeed@example.com',
    phone: '0555111222',
    studentId: 2,
    createdAt: '2024-02-01T00:00:00Z',
  },
  {
    id: 2,
    name: 'منى علي',
    relationship: 'mother',
    email: 'mona.ali@example.com',
    phone: '0555333444',
    studentId: 3,
    createdAt: '2024-03-01T00:00:00Z',
  },
  {
    id: 3,
    name: 'سعاد أحمد',
    relationship: 'mother',
    email: 'souad.ahmed@example.com',
    phone: '0555555666',
    studentId: 4,
    createdAt: '2024-01-15T00:00:00Z',
  },
  {
    id: 4,
    name: 'حسن محمود',
    relationship: 'father',
    email: 'hassan.mahmoud@example.com',
    phone: '0555777888',
    studentId: 5,
    createdAt: '2024-04-10T00:00:00Z',
  },
];

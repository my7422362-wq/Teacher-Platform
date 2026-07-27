import type { User } from '@/types';

export const mockUsers: User[] = [
  {
    id: 1,
    name: 'أحمد محمد',
    email: 'ahmed@example.com',
    phone: '0555123456',
    avatar: '/images/avatars/1.jpg',
    role: 'teacher',
    status: 'active',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-06-15T00:00:00Z',
  },
  {
    id: 2,
    name: 'سارة خالد',
    email: 'sara@example.com',
    phone: '0555123457',
    avatar: '/images/avatars/2.jpg',
    role: 'student',
    status: 'active',
    createdAt: '2024-02-01T00:00:00Z',
    updatedAt: '2024-06-15T00:00:00Z',
  },
  {
    id: 3,
    name: 'محمد علي',
    email: 'mohamed@example.com',
    phone: '0555123458',
    avatar: '/images/avatars/3.jpg',
    role: 'student',
    status: 'active',
    createdAt: '2024-03-01T00:00:00Z',
    updatedAt: '2024-06-15T00:00:00Z',
  },
];

export const mockCurrentUser: User = mockUsers[0];


import type { Notification } from '@/types';

export const mockNotifications: Notification[] = [
  {
    id: 1,
    userId: 1,
    title: 'تسجيل طالب جديد',
    message: 'قام الطالب محمد علي بالتسجيل في دورة أساسيات البرمجة',
    type: 'info',
    isRead: false,
    link: '/teacher/students/3',
    createdAt: '2024-06-15T08:30:00Z',
  },
  {
    id: 2,
    userId: 1,
    title: 'إكمال دورة',
    message: 'أكملت الطالبة سارة خالد دورة أساسيات البرمجة بنجاح',
    type: 'success',
    isRead: false,
    link: '/teacher/students/2',
    createdAt: '2024-06-14T14:20:00Z',
  },
  {
    id: 3,
    userId: 1,
    title: 'تقييم جديد',
    message: 'قام طالب بتقييم دورة React بتقييم 5 نجوم',
    type: 'success',
    isRead: true,
    link: '/teacher/courses/2',
    createdAt: '2024-06-13T10:15:00Z',
  },
  {
    id: 4,
    userId: 1,
    title: 'تذكير بموعد',
    message: 'موعد تسليم الواجب النهائي لدورة بايثون بعد غد',
    type: 'warning',
    isRead: true,
    link: '/teacher/courses/1',
    createdAt: '2024-06-12T09:00:00Z',
  },
];


import type { Submission } from '@/types';

function daysAgo(days: number): string {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString();
}

export const mockSubmissions: Submission[] = [
  {
    id: 1,
    assignmentId: 4,
    userId: 2,
    studentName: 'سارة خالد',
    assignmentTitle: 'مشروع نهائي: حاسبة بسيطة بلغة بايثون',
    submissionText: 'تم رفع الكود على GitHub',
    attachments: [],
    score: 95,
    feedback: 'عمل ممتاز، الكود منظم وواضح',
    gradedBy: 1,
    status: 'graded',
    submittedAt: daysAgo(19),
    gradedAt: daysAgo(17),
    createdAt: daysAgo(19),
    updatedAt: daysAgo(17),
  },
  {
    id: 2,
    assignmentId: 5,
    userId: 2,
    studentName: 'سارة خالد',
    assignmentTitle: 'بناء صفحة ملف شخصي بـ React',
    submissionText: 'تم رفع الكود على GitHub',
    attachments: [],
    score: 72,
    feedback: 'جيد، لكن راجع تنسيق الـ CSS في الجوال',
    gradedBy: 1,
    status: 'graded',
    submittedAt: daysAgo(4),
    gradedAt: daysAgo(2),
    createdAt: daysAgo(4),
    updatedAt: daysAgo(2),
  },
];

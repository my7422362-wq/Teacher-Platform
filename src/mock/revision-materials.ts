import type { RevisionMaterial } from '@/types';

export const mockRevisionMaterials: RevisionMaterial[] = [
  {
    id: 1,
    courseId: 1,
    title: 'ملخص أساسيات بايثون',
    description: 'ملخص PDF لكل نقاط دورة أساسيات البرمجة بلغة بايثون',
    type: 'summary',
    url: '/revisions/python-summary.pdf',
    createdAt: '2024-06-01T00:00:00Z',
  },
  {
    id: 2,
    courseId: 1,
    title: 'فيديو مراجعة نهائية - بايثون',
    description: 'مراجعة سريعة لكل الدروس قبل الامتحان النهائي',
    type: 'video',
    url: '/revisions/python-review.mp4',
    createdAt: '2024-06-02T00:00:00Z',
  },
  {
    id: 3,
    courseId: 2,
    title: 'ملخص React Hooks',
    description: 'شرح مبسط لكل الـ Hooks الأساسية في React',
    type: 'summary',
    url: '/revisions/react-hooks-summary.pdf',
    createdAt: '2024-06-08T00:00:00Z',
  },
  {
    id: 4,
    courseId: 3,
    title: 'بطاقات مراجعة: تعلم الآلة',
    description: 'بطاقات تعلم سريعة لأهم مصطلحات ومفاهيم تعلم الآلة',
    type: 'flashcards',
    url: '/revisions/ml-flashcards',
    createdAt: '2024-06-09T00:00:00Z',
  },
];

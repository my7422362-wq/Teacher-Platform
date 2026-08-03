import type { Quiz } from '@/types';

export const mockQuizzes: Quiz[] = [
  {
    id: 1,
    courseId: 1,
    lessonId: 4,
    title: 'اختبار أساسيات بايثون',
    description: 'اختبر معرفتك بأساسيات لغة البرمجة بايثون',
    timeLimit: 15,
    passingScore: 70,
    maxAttempts: 3,
    questionsCount: 3,
    questions: [
      {
        id: 1,
        quizId: 1,
        text: 'ما هي الكلمة المفتاحية المستخدمة لتعريف دالة في بايثون؟',
        type: 'multiple_choice',
        options: ['function', 'def', 'define', 'func'],
        correctAnswer: 'def',
        points: 10,
        order: 1,
      },
      {
        id: 2,
        quizId: 1,
        text: 'في بايثون، السلاسل النصية غير قابلة للتغيير.',
        type: 'true_false',
        options: ['صح', 'خطأ'],
        correctAnswer: 'صح',
        points: 10,
        order: 2,
      },
      {
        id: 3,
        quizId: 1,
        text: 'ما مخرج الكود التالي: print(type(3.14))',
        type: 'multiple_choice',
        options: ['<class \'int\'>', '<class \'float\'>', '<class \'str\'>', '<class \'list\'>'],
        correctAnswer: '<class \'float\'>',
        points: 10,
        order: 3,
      },
    ],
    isPublished: true,
    createdAt: '2024-01-20T00:00:00Z',
    updatedAt: '2024-06-02T00:00:00Z',
  },
];


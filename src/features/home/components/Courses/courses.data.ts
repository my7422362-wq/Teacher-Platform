/**
 * Courses data for the Featured Courses section
 *
 * All Arabic content for the 8 courses.
 */

export interface CourseItem {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  topics: string[];
  category: string;
  lessons: number;
  hours: number;
  students: number;
  rating: number;
  price: number;
  badge?: string;
  image?: string;
  teacherName: string;
  subject: string;
}

export const COURSES_DATA: CourseItem[] = [
  {
    id: 1,
    slug: 'دورة-تأسيس-اللغة-العربية',
    title: 'دورة تأسيس اللغة العربية',
    subtitle: 'مناسبة للطلاب الضعاف',
    topics: ['النحو', 'القراءة', 'الإملاء'],
    category: 'التأسيس',
    lessons: 35,
    hours: 18,
    students: 1200,
    rating: 4.9,
    price: 600,
    badge: 'جديد',
    teacherName: 'أ. عبدالله سعيد',
    subject: 'اللغة العربية',
  },
  {
    id: 2,
    slug: 'دورة-الصف-الأول-الثانوي',
    title: 'دورة الصف الأول الثانوي',
    subtitle: 'شرح المنهج كامل',
    topics: ['النحو', 'البلاغة', 'الأدب'],
    category: 'أولى ثانوي',
    lessons: 52,
    hours: 32,
    students: 1850,
    rating: 4.8,
    price: 900,
    teacherName: 'أ. عبدالله سعيد',
    subject: 'اللغة العربية',
  },
  {
    id: 3,
    slug: 'دورة-الصف-الثاني-الثانوي',
    title: 'دورة الصف الثاني الثانوي',
    subtitle: 'شرح المنهج كامل',
    topics: ['النحو', 'البلاغة', 'النصوص'],
    category: 'ثانية ثانوي',
    lessons: 58,
    hours: 36,
    students: 1600,
    rating: 4.9,
    price: 1000,
    teacherName: 'أ. عبدالله سعيد',
    subject: 'اللغة العربية',
  },
  {
    id: 4,
    slug: 'دورة-الصف-الثالث-الثانوي',
    title: 'دورة الصف الثالث الثانوي',
    subtitle: 'الكورس الكامل',
    topics: ['النحو', 'البلاغة', 'الأدب', 'النصوص'],
    category: 'ثالثة ثانوي',
    lessons: 85,
    hours: 52,
    students: 2500,
    rating: 5.0,
    price: 1200,
    badge: 'الأكثر اشتراكًا',
    teacherName: 'أ. عبدالله سعيد',
    subject: 'اللغة العربية',
  },
  {
    id: 5,
    slug: 'دورة-النحو-من-الصفر-للاحتراف',
    title: 'دورة النحو من الصفر للاحتراف',
    subtitle: 'إتقان قواعد النحو بسهولة',
    topics: ['النحو', 'الإعراب', 'الصرف'],
    category: 'التأسيس',
    lessons: 40,
    hours: 24,
    students: 980,
    rating: 4.8,
    price: 750,
    teacherName: 'أ. عبدالله سعيد',
    subject: 'اللغة العربية',
  },
  {
    id: 6,
    slug: 'دورة-البلاغة-والأدب',
    title: 'دورة البلاغة والأدب',
    subtitle: 'شرح البلاغة والأدب والنصوص',
    topics: ['البلاغة', 'الأدب', 'النصوص'],
    category: 'ثانية ثانوي',
    lessons: 30,
    hours: 17,
    students: 760,
    rating: 4.7,
    price: 650,
    teacherName: 'أ. عبدالله سعيد',
    subject: 'اللغة العربية',
  },
  {
    id: 7,
    slug: 'دورة-التعبير-والنصوص',
    title: 'دورة التعبير والنصوص',
    subtitle: 'التعبير والكتابة الإبداعية',
    topics: ['التعبير', 'الكتابة', 'النصوص'],
    category: 'أولى ثانوي',
    lessons: 22,
    hours: 12,
    students: 640,
    rating: 4.8,
    price: 500,
    teacherName: 'أ. عبدالله سعيد',
    subject: 'اللغة العربية',
  },
  {
    id: 8,
    slug: 'دورة-المراجعة-النهائية-الشاملة',
    title: 'دورة المراجعة النهائية الشاملة',
    subtitle: 'ليلة الامتحان',
    topics: ['النحو', 'البلاغة', 'الأدب', 'النصوص'],
    category: 'المراجعات',
    lessons: 28,
    hours: 15,
    students: 3000,
    rating: 5.0,
    price: 450,
    badge: 'خصم',
    teacherName: 'أ. عبدالله سعيد',
    subject: 'اللغة العربية',
  },
];

export const COURSE_CATEGORIES = [
  'الكل',
  'التأسيس',
  'أولى ثانوي',
  'ثانية ثانوي',
  'ثالثة ثانوي',
  'المراجعات',
] as const;

export type CourseCategory = (typeof COURSE_CATEGORIES)[number];


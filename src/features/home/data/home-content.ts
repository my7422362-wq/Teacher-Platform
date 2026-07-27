/**
 * Home feature static content and mock data
 *
 * All Arabic text content for the landing page sections.
 */

import type { Course } from '@/types';

// ─── Navbar ────────────────────────────────────────────
export const NAV_LINKS = [
  { label: 'الرئيسية', href: '#hero' },
  { label: 'عن المعلم', href: '#about-teacher' },
  { label: 'الدورات', href: '#featured-courses' },
  { label: 'آراء الطلاب', href: '#testimonials' },
  { label: 'تواصل معنا', href: '#cta' },
] as const;

// ─── Hero Section ──────────────────────────────────────
export const HERO_CONTENT = {
  badge: 'تعلم بذكاء، وتفوق بثقة',
  titleLine1: 'تعلّم بطريقة أفضل مع أستاذ',
  titleLine2: ' عبدالله سعيد',
  description:
    'منصة تعليمية متخصصة في تدريس اللغة العربية، تقدم شرحًا مبسطًا ومنظمًا، وتدريبات تفاعلية، واختبارات دورية، ومتابعة مستمرة، لمساعدة الطلاب على فهم المنهج وإتقان جميع فروع اللغة العربية وتحقيق أعلى الدرجات بثقة وتميز.',
  primaryCta: 'ابدأ التعلم الآن',
  secondaryCta: 'تصفح الدورات',
} as const;

// ─── Hero Floating Cards ───────────────────────────────
export const HERO_FLOATING_CARDS = [
  {
    icon: 'Lightbulb',
    text: 'شرح مبسط وأساليب مميزة',
  },
  {
    icon: 'TrendingUp',
    text: 'متابعة مستمرة لتقدمك',
  },
  {
    icon: 'Award',
    text: 'شهادات معتمدة عند إتمام الدورات',
  },
] as const;

// ─── Hero Statistics ───────────────────────────────────
export const HERO_STATISTICS = [
  { value: '+1000', label: 'طالب وطالبة' },
  { value: '+100', label: 'دورة تعليمية' },
  { value: '+10', label: 'سنوات خبرة' },
  { value: '95%+', label: 'نسبة النجاح' },
] as const;

// ─── About Teacher ─────────────────────────────────────
export const ABOUT_TEACHER = {
  name: 'أحمد محمد',
  title: 'مهندس برمجيات ومعتمد في تطوير التطبيقات',
  bio: 'أكثر من ١٠ سنوات من الخبرة في مجال البرمجة وتطوير الويب. عملت مع شركات كبرى وساعدت مئات الطلاب على إتقان البرمجة وبناء مشاريعهم الخاصة.',
  image: '/images/teacher.jpg',
  credentials: [
    { label: 'سنوات الخبرة', value: '١٠+' },
    { label: 'الطلاب المسجلين', value: '٤٠٠+' },
    { label: 'الدورات', value: '١٢' },
    { label: 'التقييم', value: '٤.٩' },
  ],
} as const;

// ─── Statistics Section ────────────────────────────────
export interface StatisticItem {
  value: string;
  label: string;
  suffix?: string;
}

export const STATISTICS: StatisticItem[] = [
  { value: '٤٠٠', label: 'طالب مسجل', suffix: '+' },
  { value: '١٢', label: 'دورة تدريبية', suffix: '' },
  { value: '٩٥', label: 'نسبة النجاح', suffix: '%' },
  { value: '٤.٩', label: 'تقييم الطلاب', suffix: '' },
];

// ─── Featured Courses ──────────────────────────────────
export function getFeaturedCourses(courses: Course[]): Course[] {
  return courses.filter((course) => course.isFeatured).slice(0, 4);
}

// ─── Why Choose Us ─────────────────────────────────────
export interface WhyChooseUsItem {
  icon: string;
  title: string;
  description: string;
}

export const WHY_CHOOSE_US: WhyChooseUsItem[] = [
  {
    icon: 'graduation-cap',
    title: 'خبرة أكاديمية',
    description: 'مناهج تعليمية مُعدّة بعناية وفق أفضل الممارسات العالمية.',
  },
  {
    icon: 'users',
    title: 'دعم مستمر',
    description: 'دعم فني وأكاديمي متاح طوال فترة الدراسة عبر قنوات التواصل.',
  },
  {
    icon: 'certificate',
    title: 'شهادات معتمدة',
    description: 'شهادة إتمام معتمدة بعد إنهاء كل دورة بنجاح.',
  },
  {
    icon: 'clock',
    title: 'مرونة في المواعيد',
    description: 'دورات مسجلة ومباشرة تناسب جميع الأوقات والجداول.',
  },
  {
    icon: 'book-open',
    title: 'محتوى تفاعلي',
    description: 'فيديوهات وتمارين ومشاريع عملية لتطبيق ما تتعلمه.',
  },
  {
    icon: 'trending-up',
    title: 'تطوير مستمر',
    description: 'محتوى محدّث باستمرار لمواكبة أحدث التقنيات.',
  },
];

// ─── Testimonials ──────────────────────────────────────
export interface TestimonialItem {
  id: number;
  name: string;
  title: string;
  avatar: string;
  content: string;
  rating: number;
}

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 1,
    name: 'سارة عبدالله',
    title: 'طالبة في دورة بايثون',
    avatar: '/images/avatars/student-1.jpg',
    content:
      'دورة رائعة! الأسلوب سلس والمحتوى منظم. استفدت كثيراً وبدأت مشواري في البرمجة بفضل الله ثم بفضل جهود المعلم أحمد.',
    rating: 5,
  },
  {
    id: 2,
    name: 'خالد الفهد',
    title: 'طالب في دورة رياكت',
    avatar: '/images/avatars/student-2.jpg',
    content:
      'من أفضل الدورات التي حضرتها. الشرح عميق والتطبيقات العملية مفيدة جداً. أنصح بها كل من يرغب في دخول مجال تطوير الويب.',
    rating: 5,
  },
  {
    id: 3,
    name: 'نورة الصالح',
    title: 'طالبة في دورة تعلم الآلة',
    avatar: '/images/avatars/student-3.jpg',
    content:
      'الدورة متكاملة وتغطي جميع الجوانب النظرية والعملية. المعلم أحمد متمكن ويجيب على جميع الأسئلة بوضوح.',
    rating: 4,
  },
];

// ─── FAQ Section ───────────────────────────────────────
export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'كيف يمكنني التسجيل في الدورة؟',
    answer:
      'بعد إنشاء حساب في المنصة، يمكنك تصفح الدورات المتاحة والضغط على زر "الاشتراك" للدورة التي ترغب بها، ثم اتبع خطوات الدفع إن وجدت.',
  },
  {
    id: 'faq-2',
    question: 'هل الدورات مسجلة أم مباشرة؟',
    answer:
      'نوفر مزيجاً من الدورات المسجلة التي يمكنك مشاهدتها في أي وقت، والدورات المباشرة التي تُعقد وفق جدول زمني محدد.',
  },
  {
    id: 'faq-3',
    question: 'هل أحصل على شهادة بعد إتمام الدورة؟',
    answer:
      'نعم، بعد إتمام جميع متطلبات الدورة واجتياز التقييمات ستحصل على شهادة إتمام معتمدة قابلة للتحميل والمشاركة.',
  },
  {
    id: 'faq-4',
    question: 'ما هي طرق الدفع المتاحة؟',
    answer:
      'نقبل الدفع عبر البطاقات الائتمانية (فيزا/ماستركارد) ، PayPal ، والتحويل البنكي المحلي.',
  },
  {
    id: 'faq-5',
    question: 'هل يمكنني استرداد الرسوم؟',
    answer:
      'نعم، نوفر سياسة استرداد رسوم خلال أول ١٠ أيام من تاريخ التسجيل في الدورة إذا لم تكن راضياً عن المحتوى.',
  },
];

// ─── CTA Section ───────────────────────────────────────
export const CTA_CONTENT = {
  title: 'ابدأ رحلة التعلم اليوم',
  description: 'انضم إلى مئات الطلاب الذين بدأوا مشوارهم في عالم البرمجة والتقنية.',
  buttonText: 'سجّل الآن مجاناً',
} as const;

// ─── Footer ────────────────────────────────────────────
export const FOOTER_CONTENT = {
  description: 'منصة تعليمية متطورة تهدف لتمكين الطلاب وتعليم البرمجة وتقنية المعلومات بأسلوب عصري تفاعلي.',
  quickLinks: [
    { label: 'الرئيسية', href: '/' },
    { label: 'الدورات', href: '/courses' },
    { label: 'عن المنصة', href: '/about' },
    { label: 'المدونة', href: '/blog' },
  ],
  supportLinks: [
    { label: 'الأسئلة الشائعة', href: '#faq' },
    { label: 'سياسة الخصوصية', href: '/privacy' },
    { label: 'شروط الاستخدام', href: '/terms' },
    { label: 'اتصل بنا', href: '/contact' },
  ],
  socialLinks: [
    { label: 'تويتر', href: '#', icon: 'twitter' },
    { label: 'لينكد إن', href: '#', icon: 'linkedin' },
    { label: 'يوتيوب', href: '#', icon: 'youtube' },
  ],
  copyright: 'جميع الحقوق محفوظة.',
  brandName: 'منصة التعلم الذكية',
} as const;


/**
 * Home feature static content and mock data
 *
 * Text fields hold i18n translation keys (see src/i18n/locales/*.json).
 * Non-text fields (href, icon, numeric ids) remain literal.
 */

// ─── Navbar ────────────────────────────────────────────
export const NAV_LINKS = [
  { labelKey: 'nav.home', href: '#hero' },
  { labelKey: 'nav.aboutTeacher', href: '#about-teacher' },
  { labelKey: 'nav.courses', href: '#featured-courses' },
  { labelKey: 'nav.testimonials', href: '#testimonials' },
  { labelKey: 'nav.contact', href: '#contact' },
] as const;

// ─── Hero Section ──────────────────────────────────────
export const HERO_CONTENT = {
  badge: 'hero.badge',
  titleLine1: 'hero.titleLine1',
  titleLine2: 'hero.titleLine2',
  description: 'hero.description',
  primaryCta: 'hero.primaryCta',
  secondaryCta: 'hero.secondaryCta',
} as const;

// ─── Hero Floating Cards ───────────────────────────────
export const HERO_FLOATING_CARDS = [
  {
    icon: 'Lightbulb',
    textKey: 'hero.floatingCards.Lightbulb',
  },
  {
    icon: 'TrendingUp',
    textKey: 'hero.floatingCards.TrendingUp',
  },
  {
    icon: 'Award',
    textKey: 'hero.floatingCards.Award',
  },
] as const;

// ─── Hero Statistics ───────────────────────────────────
export const HERO_STATISTICS = [
  { valueKey: 'hero.stats.students.value', labelKey: 'hero.stats.students.label' },
  { valueKey: 'hero.stats.courses.value', labelKey: 'hero.stats.courses.label' },
  { valueKey: 'hero.stats.experience.value', labelKey: 'hero.stats.experience.label' },
  { valueKey: 'hero.stats.successRate.value', labelKey: 'hero.stats.successRate.label' },
] as const;

// ─── Why Choose Us ─────────────────────────────────────
export interface WhyChooseUsItem {
  icon: string;
  titleKey: string;
  descriptionKey: string;
}

export const WHY_CHOOSE_US: WhyChooseUsItem[] = [
  { icon: 'graduation-cap', titleKey: 'whyChooseUs.items.graduation-cap.title', descriptionKey: 'whyChooseUs.items.graduation-cap.description' },
  { icon: 'users', titleKey: 'whyChooseUs.items.users.title', descriptionKey: 'whyChooseUs.items.users.description' },
  { icon: 'certificate', titleKey: 'whyChooseUs.items.certificate.title', descriptionKey: 'whyChooseUs.items.certificate.description' },
  { icon: 'clock', titleKey: 'whyChooseUs.items.clock.title', descriptionKey: 'whyChooseUs.items.clock.description' },
  { icon: 'book-open', titleKey: 'whyChooseUs.items.book-open.title', descriptionKey: 'whyChooseUs.items.book-open.description' },
  { icon: 'trending-up', titleKey: 'whyChooseUs.items.trending-up.title', descriptionKey: 'whyChooseUs.items.trending-up.description' },
];

// ─── Testimonials ──────────────────────────────────────
// Kept in Arabic — these are attributed to named students and are treated
// as content, not UI chrome (see localization scoping note in the summary).
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
  questionKey: string;
  answerKey: string;
}

export const FAQ_ITEMS: FAQItem[] = [
  { id: 'faq-1', questionKey: 'faq.items.faq-1.question', answerKey: 'faq.items.faq-1.answer' },
  { id: 'faq-2', questionKey: 'faq.items.faq-2.question', answerKey: 'faq.items.faq-2.answer' },
  { id: 'faq-3', questionKey: 'faq.items.faq-3.question', answerKey: 'faq.items.faq-3.answer' },
  { id: 'faq-4', questionKey: 'faq.items.faq-4.question', answerKey: 'faq.items.faq-4.answer' },
  { id: 'faq-5', questionKey: 'faq.items.faq-5.question', answerKey: 'faq.items.faq-5.answer' },
];

// ─── Contact Section ────────────────────────────────────
// Real, working contact details only — no contact form, since there's no
// backend endpoint yet to receive submissions (see auth.service.ts for the
// project's stance on not faking functionality that doesn't exist).
export const CONTACT_CONTENT = {
  badgeKey: 'contact.badge',
  titleKey: 'contact.title',
  descriptionKey: 'contact.description',
  emailLabelKey: 'contact.emailLabel',
  phoneLabelKey: 'contact.phoneLabel',
  email: 'moyoussef2192004@gmail.com',
  phone: '01013556821',
  whatsappUrl: 'https://wa.me/201013556821',
} as const;

// ─── CTA Section ───────────────────────────────────────
export const CTA_CONTENT = {
  title: 'cta.title',
  description: 'cta.description',
  buttonText: 'cta.buttonText',
} as const;

// ─── Footer ────────────────────────────────────────────
// NOTE: quickLinks/supportLinks only include routes that actually exist in
// src/router/index.tsx. Don't add an entry here unless there's a real page
// behind it — a footer link to a 404 is worse than no link.
export const FOOTER_CONTENT = {
  descriptionKey: 'footer.description',
  brandNameKey: 'footer.brandName',
  copyrightKey: 'footer.copyright',
  quickLinks: [
    { labelKey: 'footer.quickLinks.home', href: '/' },
    { labelKey: 'footer.quickLinks.courses', href: '/courses' },
    { labelKey: 'footer.quickLinks.about', href: '/about' },
    { labelKey: 'footer.quickLinks.blog', href: '/blog' },
  ],
  supportLinks: [{ labelKey: 'footer.supportLinks.faq', href: '/faq' }],
} as const;

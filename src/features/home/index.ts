/**
 * Home feature module
 *
 * Handles the landing/home page sections and featured content.
 *
 * Import pattern:
 *   import { Navbar, HeroSection, FeaturedCourses } from '@/features/home';
 *   import type { TestimonialItem, FAQItem } from '@/features/home';
 */

// ─── Components ────────────────────────────────────────
export { Navbar } from './components/Navbar';
export { HeroSection } from './components/Hero';
export { AboutTeacher } from './components/About';
export { CoursesSection } from './components/Courses';
export { WhyChooseUs } from './components/why-choose-us';
export { ResultsSection } from './components/results-section';
export { TrialBookingSection } from './components/trial-booking-section';
export { Testimonials } from './components/testimonials';
export { BlogSection } from './components/blog-section';
export { FAQSection } from './components/faq-section';
export { ContactSection } from './components/contact-section';
export { CTASection } from './components/cta-section';
export { Footer } from './components/footer';

// ─── Data ──────────────────────────────────────────────
export {
  NAV_LINKS,
  HERO_CONTENT,
  HERO_FLOATING_CARDS,
  HERO_STATISTICS,
  WHY_CHOOSE_US,
  TESTIMONIALS,
  FAQ_ITEMS,
  CONTACT_CONTENT,
  CTA_CONTENT,
  FOOTER_CONTENT,
} from './data';

// ─── Types ─────────────────────────────────────────────
export type { WhyChooseUsItem } from './data';
export type { TestimonialItem } from './data';
export type { FAQItem } from './data';



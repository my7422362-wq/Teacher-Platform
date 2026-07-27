import {
  Navbar,
  HeroSection,
  AboutTeacher,
  CoursesSection,
  WhyChooseUs,
  Testimonials,
  FAQSection,
  CTASection,
  Footer,
} from '@/features/home';

export function HomePage() {
  return (
    <div dir="rtl">
      <Navbar />
      <main>
        <HeroSection />
        <AboutTeacher />
        <CoursesSection />
        <WhyChooseUs />
        <Testimonials />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}


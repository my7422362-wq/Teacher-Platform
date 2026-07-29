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
    <div>
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


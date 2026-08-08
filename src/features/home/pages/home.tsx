import {
  Navbar,
  HeroSection,
  AboutTeacher,
  CoursesSection,
  WhyChooseUs,
  ResultsSection,
  TrialBookingSection,
  Testimonials,
  BlogSection,
  FAQSection,
  ContactSection,
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
        <ResultsSection />
        <TrialBookingSection />
        <Testimonials />
        <BlogSection />
        <FAQSection />
        <ContactSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}


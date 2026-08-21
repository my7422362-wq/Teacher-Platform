import {
  Navbar,
  HeroSection,
  AboutUs,
  MeetTeachers,
  CoursesSection,
  WhyChooseUs,
  ResultsSection,
  TrialBookingSection,
  Testimonials,
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
        <AboutUs />
        <MeetTeachers />
        <CoursesSection limitTeachers={4} limitCoursesPerTeacher={3} />
        <WhyChooseUs />
        <ResultsSection />
        <TrialBookingSection />
        <Testimonials />
        <FAQSection />
        <ContactSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}


// FILE: src/app/page.tsx — Trang chu voi Registration section

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroBanner } from "@/components/landing/HeroBanner";
import { PhilosophySection } from "@/components/landing/PhilosophySection";
import { CourseSection } from "@/components/landing/CourseSection";
import { TuitionSection } from "@/components/landing/TuitionSection";
import { BooksSection } from "@/components/landing/BooksSection";
import { RegistrationSection } from "@/components/landing/RegistrationSection";
import { SectionDivider } from "@/components/landing/SectionDivider";

export default function HomePage() {
  return (
    <>
      <Header />
      <HeroBanner />

      <main>
        <PhilosophySection />
        <SectionDivider />
        <TuitionSection />
        <SectionDivider />
        <CourseSection />
        <SectionDivider />
        <BooksSection />
        <SectionDivider />
        <RegistrationSection />
      </main>

      <Footer />
    </>
  );
}
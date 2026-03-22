import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroBanner } from "@/components/landing/HeroBanner";
import { CourseSection } from "@/components/landing/CourseSection";
import { TuitionSection } from "@/components/landing/TuitionSection";
import { BooksSection } from "@/components/landing/BooksSection";
import { PhilosophySection } from "@/components/landing/PhilosophySection";

export default function HomePage() {
  return (
    <>
      <Header />
      <HeroBanner />

      <main>
        <PhilosophySection />
        <CourseSection />
        <TuitionSection />
        <BooksSection />
      </main>

      <Footer />
    </>
  );
}

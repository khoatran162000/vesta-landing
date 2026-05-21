// FILE: src/app/page.tsx — Trang chủ với thứ tự mới
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PhilosophySection } from "@/components/landing/PhilosophySection";
import { CourseSection } from "@/components/landing/CourseSection";
import { TuitionSection } from "@/components/landing/TuitionSection";
import { BooksSection } from "@/components/landing/BooksSection";
import { TeacherProfileSection } from "@/components/landing/TeacherProfileSection";
import { RegistrationSection } from "@/components/landing/RegistrationSection";
import { SectionDivider } from "@/components/landing/SectionDivider";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <PhilosophySection />
        <SectionDivider />
        <CourseSection />
        <SectionDivider />
        <BooksSection />
        <SectionDivider />
        <TuitionSection />
        <SectionDivider />
        <TeacherProfileSection />
        <SectionDivider />
        <RegistrationSection />
      </main>
      <Footer />
    </>
  );
}
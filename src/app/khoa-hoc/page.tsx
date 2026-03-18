/**
 * FILE: page.tsx
 * PATH: apps/landing/src/app/khoa-hoc/page.tsx
 * MÔ TẢ: Trang danh sách khoá học — /khoa-hoc
 */

import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CourseSection } from "@/components/landing/CourseSection";

export const metadata: Metadata = {
  title: "Các Khoá Học IELTS",
  description: "Danh sách các khoá học IELTS tại VESTA Academy — từ 5.0+ đến 7.0+, 1-1, Intensive, Writing, Phát Âm.",
};

export default function CoursesPage() {
  return (
    <>
      <Header />
      <main><CourseSection /></main>
      <Footer />
    </>
  );
}

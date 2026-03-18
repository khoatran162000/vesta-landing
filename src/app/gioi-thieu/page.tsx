/**
 * FILE: page.tsx
 * PATH: apps/landing/src/app/gioi-thieu/page.tsx
 * MÔ TẢ: Trang giới thiệu trung tâm — /gioi-thieu
 */

import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Giới Thiệu",
  description: "Giới thiệu về VESTA Academy — Trung tâm luyện thi IELTS uy tín tại Hà Nội từ 2012.",
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="mx-auto min-h-[60vh] max-w-[1200px] px-6 py-16">
        <h2 className="font-display text-3xl font-bold text-royal">Giới Thiệu</h2>
        <p className="mt-4 text-muted">Trang giới thiệu trung tâm — nội dung sẽ được cập nhật.</p>
      </main>
      <Footer />
    </>
  );
}

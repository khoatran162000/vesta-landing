// FILE: src/app/dang-ky/page.tsx — Trang đăng ký học viên
"use client";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StudentRegistrationForm } from "@/components/landing/StudentRegistrationForm";

export default function RegisterPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-[960px] px-4 py-12">
        <StudentRegistrationForm />
      </main>
      <Footer />
    </>
  );
}
/**
 * FILE: page.tsx
 * PATH: apps/landing/src/app/dang-ky-hoc/page.tsx
 * MÔ TẢ: Nhúng Google Form đăng ký học — /dang-ky-hoc
 */

import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Đăng Ký Học",
  description: "Đăng ký khoá học IELTS tại VESTA Academy. Cam kết đầu ra, lộ trình cá nhân hoá.",
};

export default function CourseRegisterPage() {
  const formUrl = process.env.NEXT_PUBLIC_GOOGLE_FORM_REGISTER;
  return (
    <>
      <Header />
      <main className="mx-auto min-h-[60vh] max-w-[1200px] px-6 py-16">
        <div className="text-center">
          <h2 className="font-display text-3xl font-bold text-royal">Đăng Ký Học</h2>
          <p className="mt-3 text-muted">Điền thông tin bên dưới để đăng ký khoá học IELTS phù hợp với bạn.</p>
        </div>
        <div className="mt-10 flex justify-center">
          {formUrl ? (
            <iframe src={`${formUrl}?embedded=true`} width="100%" height="900"
              className="max-w-[720px] rounded-xl border border-silver/30 shadow-sm"
              title="Form đăng ký học" loading="lazy">Đang tải form...</iframe>
          ) : (
            <div className="rounded-xl border border-gold/20 bg-gold/5 px-8 py-12 text-center">
              <p className="text-muted">Google Form chưa được cấu hình.<br />
                Vui lòng thêm <code className="rounded bg-cream-dark px-2 py-0.5 text-sm">NEXT_PUBLIC_GOOGLE_FORM_REGISTER</code> vào file <code className="rounded bg-cream-dark px-2 py-0.5 text-sm">.env.local</code></p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

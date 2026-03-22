/**
 * FILE: page.tsx
 * PATH: apps/landing/src/app/dang-ky-kiem-tra/page.tsx
 * MÔ TẢ: Nhúng Google Form đăng ký kiểm tra đầu vào — /dang-ky-kiem-tra
 */

import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Đăng Ký Kiểm Tra Đầu Vào",
  description: "Đăng ký kiểm tra đầu vào miễn phí tại VESTA Academy để xác định trình độ và lộ trình IELTS phù hợp.",
};

export default function EntranceTestPage() {
  const formUrl = process.env.NEXT_PUBLIC_GOOGLE_FORM_TEST;
  return (
    <>
      <Header />
      <main className="mx-auto min-h-[60vh] max-w-[1200px] px-6 py-16">
        <div className="text-center">
          <h2 className="font-display text-3xl font-bold text-royal">Đăng Ký Kiểm Tra Đầu Vào</h2>
          <p className="mt-3 text-muted">Hoàn thành form bên dưới để đăng ký kiểm tra trình độ miễn phí.</p>
        </div>
        <div className="mt-10 flex justify-center">
          {formUrl ? (
            <iframe src={`${formUrl}?embedded=true`} width="100%" height="900"
              className="max-w-[720px] rounded-xl border border-silver/30 shadow-sm"
              title="Form đăng ký kiểm tra đầu vào" loading="lazy">Đang tải form...</iframe>
          ) : (
            <div className="rounded-xl border border-gold/20 bg-gold/5 px-8 py-12 text-center">
              <p className="text-muted"><br />
                Đang cập nhật<code className="rounded bg-cream-dark px-2 py-0.5 text-sm"></code>Form Đăng Ký<code className="rounded bg-cream-dark px-2 py-0.5 text-sm"></code></p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

// FILE: src/components/landing/RegistrationSection.tsx — Dang ky hoc

import { ScrollReveal } from "./ScrollReveal";

export function RegistrationSection() {
  return (
    <div className="mx-auto max-w-[1200px] px-6 pb-[60px]" id="registration">
      <ScrollReveal>
        <div className="mx-auto max-w-[700px] overflow-hidden rounded-2xl border border-gold/30 bg-white p-10 text-center shadow-sm">
          {/* Title */}
          <h3 className="flex items-center justify-center gap-2 font-display text-[1.5rem] font-bold text-royal">
            📋 Đăng Ký Học Tại Vesta Uni
          </h3>

          {/* QR Code */}
          <div className="mx-auto my-6 w-[220px] overflow-hidden rounded-xl border-2 border-gold/30 p-4">
            <p className="text-[0.7rem] font-bold uppercase tracking-widest text-royal">Link đăng kí</p>
            <p className="text-[0.65rem] uppercase tracking-wider text-muted">Học các lớp</p>
            <img src="/images/qr-register.png" alt="QR Đăng ký học" className="mx-auto mt-3 h-[140px] w-[140px] object-contain" />
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a href="goo.gl/xahbn4" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-8 py-3 text-[0.85rem] font-bold text-white shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg"
              style={{ background: "linear-gradient(135deg, #A31D2B, #C93040)" }}>
              ĐĂNG KÝ HỌC NGAY →
            </a>

            <a href="goo.gl/xahbn4" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-8 py-3 text-[0.85rem] font-bold text-white shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg"
              style={{ background: "linear-gradient(135deg, #C9A84C, #B89530)" }}>
              📝 Đăng Ký Kiểm Tra FREE
            </a>

            <a href="bit.ly/3H01lRL" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-royal px-8 py-3 text-[0.85rem] font-bold text-white shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg">
              🏆 Thành Tích Học Viên
            </a>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}
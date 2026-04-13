// FILE: src/components/landing/TuitionSection.tsx — Thong tin hoc phi (light theme)

import { ScrollReveal } from "./ScrollReveal";

export function TuitionSection() {
  return (
    <div className="mx-auto max-w-[960px] px-6 pb-10" id="tuition">
      <div className="pb-10 pt-[60px]">
      <div className="mb-2 flex items-center gap-3">
        <span className="text-xl">🚩</span>
        <h3 className="font-display text-[2rem] font-bold text-royal">Thông Tin Về Học Phí</h3>
      </div>
      <div className="h-[2px] w-full" style={{ background: "linear-gradient(90deg, #C9A84C, #E8D48B)" }} />
    </div>

      <div className="mx-auto max-w-[960px] space-y-5">
        {/* Card 1 */}
        <ScrollReveal>
          <div className="flex overflow-hidden rounded-xl border border-silver/30 bg-white shadow-sm">
            <div className="w-1.5 shrink-0" style={{ background: "linear-gradient(180deg, #C93040, #A31D2B)" }} />
            <div className="px-7 py-6">
              <p className="text-[0.92rem] leading-[1.85] text-[#1a1a2e]">
                🎓 Học phí được đóng theo khóa, trước khai giảng 1 tuần. Bao gồm phí mở tài khoản, tài liệu, link luyện tập kĩ năng hàng ngày, gói chấm chữa không giới hạn, số buổi học trực tiếp và dịch vụ hỗ trợ 24/7.
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Card 2 */}
        <ScrollReveal delay={0.1}>
          <div className="flex overflow-hidden rounded-xl border border-silver/30 bg-white shadow-sm">
            <div className="w-1.5 shrink-0" style={{ background: "linear-gradient(180deg, #C93040, #A31D2B)" }} />
            <div className="px-7 py-6">
              <p className="text-[0.92rem] leading-[1.85] text-[#1a1a2e]">
                🎓 Học viên có thể <strong className="font-bold text-royal">học thử miễn phí buổi đầu</strong>, nhưng do lượng đăng kí đông, cần dự tính trước việc bị lùi sang khóa sau. Học viên xin nghỉ học sau buổi đầu và sau khi được giao tài khoản vào hệ thống sẽ không được hoàn học phí.
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Card 3 — Highlight: Giảm 5% */}
        <ScrollReveal delay={0.15}>
          <div className="flex overflow-hidden rounded-xl border border-gold/80 bg-[#FFF9E6] shadow-sm">
            <div className="w-full py-5 text-center">
              <p className="text-[1.15rem] font-bold" style={{ color: "#C93040" }}>
                🎁 GIẢM 5% cho học sinh cũ
              </p>
              <p className="mt-1.5 text-[0.88rem] text-[#1a1a2e]">
                Học bổng 30% cho hoàn cảnh khó khăn — gửi thư xin bài test, cần đạt 90%
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Card 4 — Thanh toán */}
        <ScrollReveal delay={0.2}>
          <div className="flex overflow-hidden rounded-xl border border-silver/30 bg-white shadow-sm">
            <div className="w-1.5 shrink-0" style={{ background: "linear-gradient(180deg, #C93040, #A31D2B)" }} />
            <div className="px-7 py-5">
              <p className="text-[0.92rem] leading-[1.85] text-[#1a1a2e]">
                ☆ Thanh toán qua chuyển khoản hoặc quẹt thẻ POS (phụ thu 0.7%)
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Bank info — navy background */}
        <ScrollReveal delay={0.25}>
          <div className="overflow-hidden rounded-2xl text-center text-white" style={{ background: "linear-gradient(170deg, #0F1B3D 0%, #1B2A5B 100%)" }}>
            <div className="flex flex-col items-center gap-6 px-8 py-8 md:flex-row md:justify-center md:gap-12">
              <div>
                <p className="text-[1 rem] uppercase tracking-[0.2em] text-white">Chuyển khoản đến</p>
                <p className="mt-2 font-display text-[1.3rem] font-bold tracking-wider text-gold">
                  VESTA UNI — TECHCOMBANK 123777789
                </p>
                <p className="mt-2 text-[0.82rem] text-white/70">
                  Nội dung: TÊN HỌC VIÊN, SĐT, TÊN KHÓA HỌC, CCCD người đóng phí
                </p>
              </div>
              <div className="shrink-0 flex flex-col items-center">
                <img src="/images/qr-bank.jpg" alt="QR Chuyển khoản" className="h-[180px] w-[180px] rounded-lg bg-white p-2" />
                <p className="mt-3 text-[0.85rem] uppercase tracking-[0.15em] text-gold">Quét QR để chuyển khoản</p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
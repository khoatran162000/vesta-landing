// FILE: src/components/landing/TuitionSection.tsx — Học phí (fetch động, fallback)
"use client";
import { useEffect, useState } from "react";
import { ScrollReveal } from "./ScrollReveal";
import { fetchBlock, resolveUrl } from "@/lib/siteContent";

const DEFAULT = {
  notes: [
    { style: "normal", html: `🎓 Học phí được đóng theo khóa, trước khai giảng 1 tuần. Bao gồm phí mở tài khoản, tài liệu, link luyện tập kĩ năng hàng ngày, gói chấm chữa không giới hạn, số buổi học trực tiếp và dịch vụ hỗ trợ 24/7.` },
    { style: "normal", html: `🎓 Học viên có thể <strong>học thử miễn phí buổi đầu</strong>, nhưng do lượng đăng kí đông, cần dự tính trước việc bị lùi sang khóa sau. Học viên xin nghỉ học sau buổi đầu và sau khi được giao tài khoản vào hệ thống sẽ không được hoàn học phí.` },
    { style: "highlight", html: `🎁 GIẢM 5% cho học sinh cũ`, sub: `Học bổng 30% cho hoàn cảnh khó khăn — gửi thư xin bài test, cần đạt 90%` },
    { style: "normal", html: `☆ Thanh toán qua chuyển khoản hoặc quẹt thẻ POS (phụ thu 0.7%)` },
  ],
  bank: { label: "Chuyển khoản đến", name: "VESTA UNI — TECHCOMBANK 123777789", note: "Nội dung: TÊN HỌC VIÊN, SĐT, TÊN KHÓA HỌC, CCCD người đóng phí", qrUrl: "/images/qr-bank.jpg" },
};

export function TuitionSection() {
  const [d, setD] = useState(DEFAULT);
  useEffect(() => { fetchBlock("tuition").then((data) => { if (data?.notes) setD({ ...DEFAULT, ...data, bank: { ...DEFAULT.bank, ...(data.bank || {}) } }); }); }, []);
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
        {d.notes.map((n: any, i: number) => n.style === "highlight" ? (
          <ScrollReveal key={i} delay={i * 0.05}>
            <div className="flex overflow-hidden rounded-xl border border-gold/80 bg-[#FFF9E6] shadow-sm">
              <div className="w-full py-5 text-center">
                <p className="text-[1.15rem] font-bold" style={{ color: "#C93040" }} dangerouslySetInnerHTML={{ __html: n.html }} />
                {n.sub && <p className="mt-1.5 text-[0.88rem] text-[#1a1a2e]">{n.sub}</p>}
              </div>
            </div>
          </ScrollReveal>
        ) : (
          <ScrollReveal key={i} delay={i * 0.05}>
            <div className="flex overflow-hidden rounded-xl border border-silver/30 bg-white shadow-sm">
              <div className="w-1.5 shrink-0" style={{ background: "linear-gradient(180deg, #C93040, #A31D2B)" }} />
              <div className="px-7 py-6">
                <p className="text-[0.92rem] leading-[1.85] text-[#1a1a2e] [&_strong]:font-bold [&_strong]:text-royal" dangerouslySetInnerHTML={{ __html: n.html }} />
              </div>
            </div>
          </ScrollReveal>
        ))}
        <ScrollReveal delay={0.25}>
          <div className="overflow-hidden rounded-2xl text-center text-white" style={{ background: "linear-gradient(170deg, #0F1B3D 0%, #1B2A5B 100%)" }}>
            <div className="flex flex-col items-center gap-6 px-8 py-8 md:flex-row md:justify-center md:gap-12">
              <div>
                <p className="text-[1rem] uppercase tracking-[0.2em] text-white">{d.bank.label}</p>
                <p className="mt-2 font-display text-[1.3rem] font-bold tracking-wider text-gold">{d.bank.name}</p>
                <p className="mt-2 text-[0.82rem] text-white/70">{d.bank.note}</p>
              </div>
              <div className="shrink-0 flex flex-col items-center">
                <img src={resolveUrl(d.bank.qrUrl)} alt="QR Chuyển khoản" className="h-[180px] w-[180px] rounded-lg bg-white p-2" />
                <p className="mt-3 text-[0.85rem] uppercase tracking-[0.15em] text-gold">Quét QR để chuyển khoản</p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
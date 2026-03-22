import { TUITION_ITEMS, SITE_INFO } from "@/lib/constants";
import { ScrollReveal } from "./ScrollReveal";

export function TuitionSection() {
  return (
    <div className="mx-auto max-w-[1200px] px-6" id="tuition">
      <ScrollReveal>
        <div className="relative my-10 overflow-hidden rounded-[20px] px-9 py-[50px] text-white max-md:mx-3 max-md:px-5 max-md:py-9"
          style={{ background: "linear-gradient(170deg, #0F1B3D 0%, #1B2A5B 100%)" }}>
          <div className="pointer-events-none absolute -right-[20%] -top-1/2 h-[500px] w-[500px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 60%)" }} />

          <h3 className="relative z-10 mb-7 font-display text-[1.8rem] font-bold text-gold">
            Thông Tin Học Phí
            <span className="mt-2.5 block h-[2px] w-[50px] bg-gold" />
          </h3>

          <div className="relative z-10 grid grid-cols-1 gap-5 sm:grid-cols-[repeat(auto-fit,minmax(280px,1fr))]">
            {TUITION_ITEMS.map((item, i) => (
              <div key={i} className={`rounded-xl border p-5 transition-colors hover:bg-white/8 ${item.highlight ? "border-gold/30 bg-gold/10" : "border-gold/15 bg-white/5"}`}>
                <div className="mb-2 text-[1.1rem]">{item.icon}</div>
                <p className="text-[0.85rem] leading-[1.7] text-silver-light [&_strong]:font-semibold [&_strong]:text-gold-light"
                  dangerouslySetInnerHTML={{ __html: item.content }} />
              </div>
            ))}
          </div>

          <div className="relative z-10 mt-6 overflow-hidden rounded-xl" style={{ background: "linear-gradient(160deg, #0F1B3D 0%, #1B2A5B 100%)" }}>
            <div className="flex flex-col items-center gap-8 px-8 py-8 md:flex-row md:justify-between">
              {/* Bên trái — Thông tin chuyển khoản */}
              <div className="text-center md:text-left">
                <p className="font-display text-[0.95rem] italic tracking-wide text-gold-light">
                  CHUYỂN KHOẢN ĐẾN
                </p>
                <p className="mt-2 font-display text-[clamp(1.4rem,3vw,2rem)] font-bold tracking-wide text-white">
                  {SITE_INFO.bankHolder} — {SITE_INFO.bankName} {SITE_INFO.bankAccount}
                </p>
                <p className="mt-2 font-display text-[0.95rem] italic tracking-wide text-gold-light/80">
                  Nội dung: TÊN HỌC VIÊN, SĐT, TÊN KHÓA HỌC, CCCD người đóng phí
                </p>
              </div>

              {/* Bên phải — QR Code */}
              <div className="shrink-0 text-center">
                <div className="overflow-hidden rounded-xl bg-white p-3 shadow-lg">
                  {/* TODO: Thay src bằng ảnh QR thật của khách hàng */}
                  <img
                    src="/images/qr-bank.jpg"
                    alt="QR chuyển khoản Techcombank VESTA UNI"
                    className="mx-auto h-[200px] w-[200px] object-contain"
                  />
                </div>
                <p className="mt-3 font-display text-[0.8rem] font-bold uppercase tracking-[0.15em] text-gold-light/70">
                  Quét QR để chuyển khoản
                </p>
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}

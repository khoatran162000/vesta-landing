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

          <div className="relative z-10 mt-6 rounded-xl border border-gold/20 bg-white/6 px-6 py-5">
            <p className="text-[0.84rem] leading-[1.8] text-silver-light">
              ✦ Thanh toán qua <strong className="text-gold-light">chuyển khoản</strong> hoặc <strong className="text-gold-light">quẹt thẻ POS</strong> (phụ thu 0.7%).
            </p>
            <p className="my-1.5 font-body text-[1.1rem] font-bold tracking-wider text-gold">
              {SITE_INFO.bankHolder} — {SITE_INFO.bankName} {SITE_INFO.bankAccount}
            </p>
            <p className="text-[0.84rem] leading-[1.8] text-silver-light">
              Nội dung CK: <strong className="text-gold-light">TÊN HỌC VIÊN · SĐT · TÊN KHÓA · CCCD</strong> người đóng phí.
            </p>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}

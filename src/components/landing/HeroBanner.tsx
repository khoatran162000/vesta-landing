import { HERO_MILESTONES } from "@/lib/constants";

export function HeroBanner() {
  return (
    <section
      className="relative overflow-hidden px-8 py-[70px] text-center max-md:px-5 max-md:py-[50px]"
      style={{ background: "linear-gradient(170deg, #1B2A5B 0%, #243778 50%, #2E4494 100%)" }}
    >
      <div className="pointer-events-none absolute left-1/2 top-[-100px] h-[800px] w-[800px] -translate-x-1/2 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 60%)" }} />
      <div className="pointer-events-none absolute bottom-5 left-1/2 -translate-x-1/2 text-[0.9rem] tracking-[0.5em] text-gold/20">◇ ◇ ◇</div>

      <h2 className="relative z-10 font-display text-[clamp(2.2rem,5vw,3.8rem)] font-bold leading-[1.2] text-white">
        Lộ Trình <em className="italic text-gold">IELTS</em> Cốt Lõi
      </h2>
      <p className="relative z-10 mx-auto mt-4 max-w-[660px] text-base font-light text-silver-light">
        Ba chặng đường — từ nền tảng đến thành thạo.<br />Học nhanh · Thi chắc · Cam kết đầu ra.
      </p>

      <div className="relative z-10 mx-auto mt-10 flex max-w-[440px] items-center justify-center">
        {HERO_MILESTONES.map((label, i) => (
          <div key={label} className="relative flex flex-1 flex-col items-center">
            <div className="relative z-[2] h-[22px] w-[22px] rounded-full border-[3px] border-gold-light bg-gold"
              style={{ boxShadow: "0 0 12px rgba(201,168,76,0.4)" }} />
            {i < HERO_MILESTONES.length - 1 && (
              <div className="absolute left-1/2 top-[10px] z-[1] h-[2px] w-full"
                style={{ background: "linear-gradient(90deg, #C9A84C, #B8C0CC)" }} />
            )}
            <span className="mt-2.5 text-[0.85rem] font-bold tracking-wide text-gold-light">{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

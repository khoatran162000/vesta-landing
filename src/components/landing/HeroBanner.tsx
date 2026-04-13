// FILE: src/components/landing/HeroBanner.tsx — Banner code (khong dung PNG)

export function HeroBanner() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #5A0A14 0%, #7B1520 30%, #8B1E2B 50%, #9B2535 70%, #A31D2B 100%)" }}
    >
      {/* Subtle radial glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)" }}
      />

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center gap-5 px-8 py-8">
        {/* Logo */}
        <img
          src="/images/logo.jpg"
          alt="VESTA Logo"
          className="h-[70px] w-[70px] object-contain"
        />

        {/* Text */}
        <div>
          <h1 className="font-display text-[2.2rem] font-bold uppercase tracking-[0.12em] text-white leading-tight">
            VESTA UNI
          </h1>
          <p className="font-display text-[0.85rem] font-medium uppercase tracking-[0.3em] text-gold">
            Fast Track to High Scores
          </p>
        </div>
      </div>

      {/* Gold line bottom */}
      <div className="h-[3px]" style={{ background: "linear-gradient(90deg, #C9A84C, #E8D48B, #C9A84C)" }} />
    </section>
  );
}
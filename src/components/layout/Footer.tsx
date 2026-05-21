// FILE: src/components/layout/Footer.tsx — Footer theo design mới

export function Footer() {
  return (
    <footer
      className="relative overflow-hidden"
      style={{
        background:
          "linear-gradient(160deg, #6B1520 0%, #8B1E2B 50%, #A31D2B 100%)",
      }}
    >
      {/* Gold line top */}
      <div
        className="h-[3px]"
        style={{
          background:
            "linear-gradient(90deg, transparent, #C9A84C, #E8D48B, #C9A84C, transparent)",
        }}
      />

      <div className="mx-auto max-w-[1200px] px-8 py-8">
        {/* Tên công ty + MST */}
        <h4 className="text-center font-display text-[0.95rem] font-bold uppercase tracking-[0.1em] text-white">
          Công ty TNHH VESTA UNI — MST: 0111130332
        </h4>

        {/* Địa chỉ */}
        <p className="mx-auto mt-2.5 text-center text-[0.82rem] leading-relaxed text-white/70">
          Số 9 Khu thương mại, khu B (Khu 361) Học viện Kỹ thuật Quân sự,
          đường Hoàng Quốc Việt, P. Nghĩa Đô, Hà Nội
        </p>

        {/* Contact row 1: website + email */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
          <a
            href="https://www.vestaedu.online"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-[0.82rem] text-white/80 transition-colors hover:text-white"
          >
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/15 text-[0.6rem]">
              🌐
            </span>
            www.vestaedu.online
          </a>
          <span className="hidden text-white/30 sm:inline">|</span>
          <a
            href="mailto:vestaunivn@gmail.com"
            className="flex items-center gap-2 text-[0.82rem] text-white/80 transition-colors hover:text-white"
          >
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/15 text-[0.6rem]">
              ✉
            </span>
            vestaunivn@gmail.com
          </a>
        </div>

        {/* Contact row 2: phone + zalo */}
        <div className="mt-2.5 flex items-center justify-center">
          <span className="flex items-center gap-2 text-[0.82rem] text-white/80">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/15 text-[0.6rem]">
              📞
            </span>
            Phone + Zalo: 0838 779 988 | 033 678 1368
          </span>
        </div>

        {/* Divider */}
        <div
          className="mx-auto mt-6 h-[1px] w-full max-w-[700px]"
          style={{
            background:
              "linear-gradient(90deg, transparent, #C9A84C60, transparent)",
          }}
        />
      </div>
    </footer>
  );
}
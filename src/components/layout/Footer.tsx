// FILE: src/components/layout/Footer.tsx — Footer theo design moi

import { SITE_INFO } from "@/lib/constants";

export function Footer() {
  return (
    <>
      <footer className="relative overflow-hidden" style={{ background: "linear-gradient(160deg, #6B1520 0%, #8B1E2B 50%, #A31D2B 100%)" }}>
        <div className="mx-auto max-w-[1200px] px-8 py-6">

          {/* Tên công ty + MST */}
          <div className="text-center">
            <h4 className="font-display text-[0.9rem] font-bold uppercase tracking-[0.15em] text-white">
              Công ty TNHH VESTA UNI — MST: 0111130332
            </h4>
            <p className="mt-1 text-[0.8rem] text-white/70">
              60 Hoàng Quốc Việt, Cầu Giấy, Hà Nội
            </p>
          </div>

          {/* Contact row */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-7 gap-y-2">
            <a href={SITE_INFO.websiteHref} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[0.78rem] text-white/80 transition-colors hover:text-white">
              <span className="inline-block h-2 w-2 rounded-full bg-green-400" />
              {SITE_INFO.website}
            </a>
            <a href={`mailto:${SITE_INFO.email}`}
              className="flex items-center gap-1.5 text-[0.78rem] text-white/80 transition-colors hover:text-white">
              <span className="inline-block h-2 w-2 rounded-full bg-blue-400" />
              {SITE_INFO.email}
            </a>
            <a href={SITE_INFO.phoneHref}
              className="flex items-center gap-1.5 text-[0.78rem] text-white/80 transition-colors hover:text-white">
              <span className="inline-block h-2 w-2 rounded-full bg-green-400" />
              Phone + Zalo: {SITE_INFO.phone}
            </a>
            <a href={SITE_INFO.facebookHref} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[0.78rem] text-white/80 transition-colors hover:text-white">
              <span className="inline-block h-2 w-2 rounded-full bg-blue-400" />
              Facebook: {SITE_INFO.facebook}
            </a>
          </div>

          {/* Divider */}
          <div className="mx-auto mt-5 h-px w-full max-w-[800px] bg-white/20" />

          {/* Tagline */}
          <p className="mt-4 pb-1 text-center font-display text-[0.85rem] font-bold uppercase tracking-[0.25em] text-gold">
            VESTA UNI — Fast Track to High Scores
          </p>

        </div>
      </footer>
    </>
  );
}
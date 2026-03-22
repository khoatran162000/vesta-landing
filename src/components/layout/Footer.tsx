/**
 * FILE: Footer.tsx
 * PATH: apps/landing/src/components/layout/Footer.tsx
 * MÔ TẢ: Footer theo thiết kế khách hàng — nền đỏ, căn giữa, thông tin công ty + MST
 */

import { SITE_INFO } from "@/lib/constants";

export function Footer() {
  return (
    <>
      {/* Gold line trên cùng */}
      <div className="gold-line" />

      <footer className="relative overflow-hidden" style={{ background: "linear-gradient(160deg, #A31D2B 0%, #BF2636 50%, #C93040 100%)" }}>
        <div className="mx-auto max-w-[1200px] px-8 py-5">

          {/* Tên công ty + MST */}
          <div className="text-center">
            <h4 className="font-display text-lg font-bold uppercase tracking-[0.12em] text-white">
              Công ty TNHH VESTA UNI — MST: 0111130332
            </h4>
            <p className="mt-1.5 text-[0.85rem] text-white/80">
              60 Hoàng Quốc Việt, Cầu Giấy, Hà Nội
            </p>
          </div>

          {/* Contact row */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            <ContactItem icon="🌐" color="#4CAF50" href={SITE_INFO.websiteHref} external>
              {SITE_INFO.website}
            </ContactItem>
            <ContactItem icon="✉" color="#2196F3" href={`mailto:${SITE_INFO.email}`}>
              {SITE_INFO.email}
            </ContactItem>
            <ContactItem icon="📞" color="#4CAF50" href={SITE_INFO.phoneHref}>
              Phone + Zalo: {SITE_INFO.phone}
            </ContactItem>
            <ContactItem icon="f" color="#1877F2" href={SITE_INFO.facebookHref} external>
              Facebook: {SITE_INFO.facebook}
            </ContactItem>
          </div>

          {/* Divider */}
          <div className="mx-auto mt-7 h-px w-full max-w-[800px] bg-white/20" />

          {/* Tagline */}
          <p className="mt-5 text-center font-display text-[1rem] font-bold uppercase tracking-[0.25em] text-gold">
            VESTA UNI — Fast Track to High Scores
          </p>

        </div>
      </footer>
    </>
  );
}

function ContactItem({
  icon,
  color,
  href,
  external,
  children,
}: {
  icon: string;
  color: string;
  href: string;
  external?: boolean;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="flex items-center gap-2 text-[0.82rem] text-white/90 transition-colors hover:text-white"
    >
      <span
        className="flex h-5 w-5 items-center justify-center rounded-sm text-[0.6rem] text-white"
        style={{ backgroundColor: color }}
      >
        {icon}
      </span>
      {children}
    </a>
  );
}
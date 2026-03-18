import { SITE_INFO } from "@/lib/constants";

export function Footer() {
  return (
    <>
      <div className="gold-line" />
      <footer className="relative overflow-hidden" style={{ background: "linear-gradient(160deg, #0F1B3D 0%, #1B2A5B 100%)" }}>
        <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse 600px 300px at 50% 100%, rgba(201,168,76,0.05) 0%, transparent 70%)" }} />

        <div className="relative z-10 mx-auto grid max-w-[1200px] grid-cols-1 gap-10 px-8 pb-9 pt-[50px] md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <h4 className="font-display text-[1.6rem] tracking-[0.12em] text-gold">{SITE_INFO.name}</h4>
            <p className="mb-4 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-silver">Học Nhanh · Thi Chắc · Since 2012</p>
            <p className="text-[0.82rem] leading-[1.7] text-white/70">Trung tâm luyện thi IELTS uy tín tại Hà Nội. Cam kết đầu ra, phương pháp giảng dạy hiệu quả, lộ trình cá nhân hoá cho từng học viên.</p>
          </div>
          <div>
            <h5 className="mb-4 text-[0.75rem] font-bold uppercase tracking-[0.15em] text-gold">Liên Hệ</h5>
            <p className="py-1 text-[0.84rem] leading-relaxed text-white/70">📍 {SITE_INFO.address}</p>
            <FL href={SITE_INFO.phoneHref}>📞 {SITE_INFO.phone}</FL>
            <FL href={`mailto:${SITE_INFO.email}`}>✉ {SITE_INFO.email}</FL>
            <FL href={SITE_INFO.websiteHref} ext>🌐 {SITE_INFO.website}</FL>
          </div>
          <div>
            <h5 className="mb-4 text-[0.75rem] font-bold uppercase tracking-[0.15em] text-gold">Liên Kết</h5>
            <FL href={SITE_INFO.facebookHref} ext>Facebook: {SITE_INFO.facebook}</FL>
            <FL href={SITE_INFO.registerLink} ext>📋 Đăng ký học</FL>
            <FL href={SITE_INFO.achievementsLink} ext>🏅 Thành tích học sinh</FL>
          </div>
        </div>

        <div className="relative z-10 mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-3 border-t border-gold/15 px-8 py-5">
          <p className="text-[0.75rem] text-white/50">
            © 2012–2026 VESTA Academy. Học nhanh — Thi chắc.
          <a href="/quan-tri/dang-nhap" className="ml-3 text-white/30 transition-colors hover:text-gold/50">
            Quản trị
          </a>
          </p>
          <a href={SITE_INFO.registerLink} target="_blank" rel="noopener noreferrer" className="cta-btn">✦ Đăng Ký Ngay</a>
        </div>
      </footer>
    </>
  );
}

function FL({ href, ext, children }: { href: string; ext?: boolean; children: React.ReactNode }) {
  return (
    <a href={href} target={ext ? "_blank" : undefined} rel={ext ? "noopener noreferrer" : undefined}
      className="block py-1 text-[0.84rem] leading-relaxed text-white/70 transition-colors hover:text-gold-light">{children}</a>
  );
}

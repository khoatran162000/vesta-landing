"use client";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";

const SKILL_SUBS = [
  { label: "Đọc (Reading)", href: "/luyen-ki-nang/doc" },
  { label: "Nghe (Listening)", href: "/luyen-ki-nang/nghe" },
  { label: "Viết (Writing)", href: "/luyen-ki-nang/viet" },
  { label: "Nói (Speaking)", href: "/luyen-ki-nang/noi" },
  { label: "Từ Vựng (Vocabulary)", href: "/luyen-ki-nang/tu-vung" },
  { label: "Ngữ Pháp (Grammar)", href: "/luyen-ki-nang/ngu-phap" },
];

const NAV_TABS: {
  label: string; href: string; external?: boolean;
  children?: { label: string; href: string }[];
}[] = [
  { label: "Khoá Học", href: "/#courses" },
  { label: "Blog & Tài Liệu", href: "/blog" },
  { label: "Đăng Ký", href: "/dang-ky" },
  {
    label: "Thành Tích Học Sinh",
    href: "https://www.facebook.com/media/set?set=a.1026314444164560&type=3",
    external: true,
  },
  { label: "Luyện Kĩ Năng", href: "/luyen-ki-nang", children: SKILL_SUBS },
  {
    label: "Student Portal",
    href: process.env.NEXT_PUBLIC_STUDENT_URL || "https://student.trankhoademo.io.vn",
    external: true,
  },
  { label: "Đặt Lịch Tư Vấn", href: "/dat-lich-tu-van" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <>
      {/* ═══ HEADER TOP ═══ */}
      <header
        className="relative overflow-hidden"
        style={{ background: "linear-gradient(160deg, #6B1520 0%, #8B1E2B 50%, #A31D2B 100%)" }}
      >
        <div className="relative z-10 mx-auto flex max-w-[1200px] items-center justify-center gap-4 px-8 py-5">
          <Link href="/" className="flex items-center gap-4">
            <img src="/images/logo.jpg" alt="VESTA UNI Logo" className="h-14 w-14 rounded-xl object-contain" />
            <div>
              <h1 className="font-display text-[2rem] font-bold leading-none tracking-[0.15em] text-white">VESTA UNI</h1>
              <p className="mt-1 text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-gold">Fast Track to High Scores</p>
            </div>
          </Link>
        </div>
      </header>

      {/* ═══ GOLD LINE ═══ */}
      <div className="h-[3px]" style={{ background: "linear-gradient(90deg, transparent, #C9A84C, #E8D48B, #C9A84C, transparent)" }} />

      {/* ═══ NAV BAR ═══ */}
      <nav className="sticky top-0 z-40" style={{ background: "linear-gradient(160deg, #7A1A28 0%, #9B2233 50%, #B12638 100%)" }}>
        {/* Desktop */}
        <div ref={dropdownRef} className="mx-auto hidden max-w-[1200px] items-center justify-center px-2 md:flex">
          {NAV_TABS.map((tab) => {
            if (tab.children) {
              const isOpen = openDropdown === tab.label;
              return (
                <div key={tab.label} className="relative">
                  <button
                    onClick={() => setOpenDropdown(isOpen ? null : tab.label)}
                    className="flex items-center gap-1 px-4 py-3 text-[0.78rem] font-medium tracking-wide text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    {tab.label}
                    <ChevronDown size={13} className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                  {isOpen && (
                    <div className="absolute left-0 top-full z-50 min-w-[200px] overflow-hidden rounded-b-xl bg-white py-1 shadow-xl">
                      {tab.children.map((sub) => (
                        <Link key={sub.href} href={sub.href} onClick={() => setOpenDropdown(null)}
                          className="block px-5 py-2.5 text-[0.8rem] font-medium text-[#1a1a2e] transition-colors hover:bg-cream hover:text-royal">
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }
            if (tab.external) {
              return (
                <a key={tab.label} href={tab.href} target="_blank" rel="noopener noreferrer"
                  className="px-4 py-3 text-[0.78rem] font-medium tracking-wide text-white/80 transition-colors hover:bg-white/10 hover:text-white">
                  {tab.label}
                </a>
              );
            }
            return (
              <Link key={tab.label} href={tab.href}
                className="px-4 py-3 text-[0.78rem] font-medium tracking-wide text-white/80 transition-colors hover:bg-white/10 hover:text-white">
                {tab.label}
              </Link>
            );
          })}
        </div>

        {/* Mobile hamburger */}
        <div className="flex items-center justify-between px-4 py-2 md:hidden">
          <span className="text-[0.78rem] font-medium text-white/70">Menu</span>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="rounded-lg p-2 text-white/70 hover:text-white" aria-label="Toggle menu">
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile dropdown */}
        {mobileOpen && (
          <div className="border-t border-white/10 px-4 pb-3 md:hidden">
            {NAV_TABS.map((tab) => {
              if (tab.children) {
                return (
                  <div key={tab.label}>
                    <button onClick={() => setOpenDropdown(openDropdown === tab.label ? null : tab.label)}
                      className="flex w-full items-center justify-between rounded-lg px-4 py-2.5 text-[0.82rem] font-medium text-white/80 hover:bg-white/10">
                      {tab.label}
                      <ChevronDown size={14} className={`transition-transform ${openDropdown === tab.label ? "rotate-180" : ""}`} />
                    </button>
                    {openDropdown === tab.label && (
                      <div className="ml-4 border-l border-white/10 pl-3">
                        {tab.children.map((sub) => (
                          <Link key={sub.href} href={sub.href} onClick={() => { setMobileOpen(false); setOpenDropdown(null); }}
                            className="block rounded-lg px-3 py-2 text-[0.78rem] text-white/70 hover:bg-white/10 hover:text-white">
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }
              if (tab.external) {
                return (
                  <a key={tab.label} href={tab.href} target="_blank" rel="noopener noreferrer" onClick={() => setMobileOpen(false)}
                    className="block rounded-lg px-4 py-2.5 text-[0.82rem] font-medium text-white/80 hover:bg-white/10 hover:text-white">
                    {tab.label}
                  </a>
                );
              }
              return (
                <Link key={tab.label} href={tab.href} onClick={() => setMobileOpen(false)}
                  className="block rounded-lg px-4 py-2.5 text-[0.82rem] font-medium text-white/80 hover:bg-white/10 hover:text-white">
                  {tab.label}
                </Link>
              );
            })}
          </div>
        )}
      </nav>
    </>
  );
}
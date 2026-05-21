"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const NAV_TABS = [
  { label: "Các Khóa Học", href: "/#courses" },
  { label: "Học Phí", href: "/#tuition" },
  { label: "Sách & Giáo Trình", href: "/#books" },
  { label: "Blog IELTS Tips", href: "/blog" },
  { label: "Đăng Ký Kiểm Tra", href: "/dang-ky" },
  { label: "Đăng Ký Học", href: "/dang-ky" },
  { label: "Thành Tích Học Sinh", href: "https://bit.ly/3H01lRL", external: true },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* ═══════ HEADER TOP — Logo + tên căn giữa ═══════ */}
      <header
        className="relative overflow-hidden"
        style={{
          background:
            "linear-gradient(160deg, #6B1520 0%, #8B1E2B 50%, #A31D2B 100%)",
        }}
      >
        <div className="relative z-10 mx-auto flex max-w-[1200px] items-center justify-center gap-4 px-8 py-5">
          <Link href="/" className="flex items-center gap-4">
            <img
              src="/images/logo.jpg"
              alt="VESTA UNI Logo"
              className="h-14 w-14 rounded-xl object-contain"
            />
            <div>
              <h1 className="font-display text-[2rem] font-bold leading-none tracking-[0.15em] text-white">
                VESTA UNI
              </h1>
              <p className="mt-1 text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-gold">
                Fast Track to High Scores
              </p>
            </div>
          </Link>
        </div>
      </header>

      {/* ═══════ GOLD LINE ═══════ */}
      <div
        className="h-[3px]"
        style={{
          background:
            "linear-gradient(90deg, transparent, #C9A84C, #E8D48B, #C9A84C, transparent)",
        }}
      />

      {/* ═══════ NAV BAR — Tabs bên dưới ═══════ */}
      <nav
        className="sticky top-0 z-40"
        style={{
          background:
            "linear-gradient(160deg, #7A1A28 0%, #9B2233 50%, #B12638 100%)",
        }}
      >
        {/* Desktop */}
        <div className="mx-auto hidden max-w-[1200px] items-center justify-center px-4 md:flex">
          {NAV_TABS.map((tab) =>
            tab.external ? (
              <a
                key={tab.label}
                href={tab.href}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 text-[0.8rem] font-medium tracking-wide text-white/80 transition-colors hover:bg-white/10 hover:text-white"
              >
                {tab.label}
              </a>
            ) : (
              <Link
                key={tab.label}
                href={tab.href}
                className="px-5 py-3 text-[0.8rem] font-medium tracking-wide text-white/80 transition-colors hover:bg-white/10 hover:text-white"
              >
                {tab.label}
              </Link>
            )
          )}
        </div>

        {/* Mobile hamburger */}
        <div className="flex items-center justify-between px-4 py-2 md:hidden">
          <span className="text-[0.78rem] font-medium text-white/70">Menu</span>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded-lg p-2 text-white/70 transition-colors hover:text-white"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile dropdown */}
        {mobileOpen && (
          <div className="border-t border-white/10 px-4 pb-3 md:hidden">
            {NAV_TABS.map((tab) =>
              tab.external ? (
                <a
                  key={tab.label}
                  href={tab.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-lg px-4 py-2.5 text-[0.82rem] font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                >
                  {tab.label}
                </a>
              ) : (
                <Link
                  key={tab.label}
                  href={tab.href}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-lg px-4 py-2.5 text-[0.82rem] font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                >
                  {tab.label}
                </Link>
              )
            )}
          </div>
        )}
      </nav>
    </>
  );
}
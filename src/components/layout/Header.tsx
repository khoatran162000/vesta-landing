"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { SITE_INFO, NAV_ITEMS, type NavItem } from "@/lib/constants";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <div className="gold-line" />
      <header className="relative overflow-hidden" style={{ background: "linear-gradient(160deg, #6B1520 0%, #8B1E2B 50%, #A31D2B 100%)" }}>
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 600px 400px at 20% 50%, rgba(255,255,255,0.05) 0%, transparent 70%),
              radial-gradient(ellipse 500px 500px at 80% 30%, rgba(255,255,255,0.03) 0%, transparent 70%)
            `,
          }}
        />

        {/* Top bar */}
        <div className="relative z-10 mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-5 px-8 py-6">
          <Link href="/" className="flex items-center gap-4">
            <img
              src="/images/logo.jpg"
              alt="VESTA UNI Logo"
              className="h-16 w-16 rounded-xl object-contain"
            />
            <div>
              <h1 className="font-display text-[2rem] font-bold leading-none tracking-[0.15em] text-gold">
                {SITE_INFO.name}
              </h1>
              <p className="mt-1 text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-silver">
                {SITE_INFO.tagline}
              </p>
            </div>
          </Link>

          <div className="hidden flex-wrap items-center gap-4 md:flex">
            <ContactLink href={SITE_INFO.phoneHref} icon="📞">{SITE_INFO.phone}</ContactLink>
            <ContactLink href={SITE_INFO.websiteHref} icon="🌐" external>{SITE_INFO.website}</ContactLink>
            <ContactLink href={`mailto:${SITE_INFO.email}`} icon="✉">{SITE_INFO.email}</ContactLink>
            <ContactLink href={SITE_INFO.facebookHref} icon="f" external>{SITE_INFO.facebook}</ContactLink>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded-lg border border-gold/20 p-2 text-silver-light transition-colors hover:text-gold md:hidden"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Nav desktop */}
        <nav className="relative z-10 mx-auto hidden max-w-[1200px] px-8 pb-5 md:block">
          <ul className="flex flex-wrap gap-1.5">
            {NAV_ITEMS.map((item) => (
              <li key={item.label}><NavLink item={item} /></li>
            ))}
          </ul>
        </nav>

        {/* Nav mobile */}
        {mobileOpen && (
          <nav className="relative z-10 border-t border-gold/10 px-6 pb-5 md:hidden">
            <ul className="flex flex-col gap-1 pt-3">
              {NAV_ITEMS.map((item) => (
                <li key={item.label}>
                  <NavLink item={item} onClick={() => setMobileOpen(false)} />
                </li>
              ))}
            </ul>
            <div className="mt-4 flex flex-col gap-2 border-t border-gold/10 pt-4">
              <ContactLink href={SITE_INFO.phoneHref} icon="📞">{SITE_INFO.phone}</ContactLink>
              <ContactLink href={`mailto:${SITE_INFO.email}`} icon="✉">{SITE_INFO.email}</ContactLink>
            </div>
          </nav>
        )}
      </header>
      <div className="gold-line" />
    </>
  );
}

function ContactLink({ href, icon, external, children }: { href: string; icon: string; external?: boolean; children: React.ReactNode }) {
  return (
    <a href={href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined}
      className="flex items-center gap-1.5 text-[0.82rem] font-normal text-silver-light transition-colors hover:text-gold-light">
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gold/15 text-[0.75rem]">{icon}</span>
      {children}
    </a>
  );
}

function NavLink({ item, onClick }: { item: NavItem; onClick?: () => void }) {
  const cls = "block rounded-md border border-transparent px-[18px] py-2 text-[0.78rem] font-medium tracking-wide text-silver transition-all hover:border-gold/20 hover:bg-gold/8 hover:text-gold";
  if (item.external) {
    return <a href={item.href} target="_blank" rel="noopener noreferrer" className={cls} onClick={onClick}>{item.label}</a>;
  }
  return <Link href={item.href} className={cls} onClick={onClick}>{item.label}</Link>;
}

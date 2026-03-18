/**
 * FILE: layout.tsx
 * PATH: apps/landing/src/app/quan-tri/layout.tsx
 * MÔ TẢ: Layout sidebar riêng cho khu vực CMS quản trị nội dung
 */

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileText, UserCircle, LogOut, Home } from "lucide-react";

const sidebarLinks = [
  { href: "/quan-tri/bai-viet", label: "Bài viết", icon: FileText },
  { href: "/quan-tri/ho-so", label: "Hồ sơ cá nhân", icon: UserCircle },
];

export default function CmsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-cream">
      <aside className="sticky top-0 flex h-screen w-60 shrink-0 flex-col border-r border-silver/30 bg-white">
        <div className="border-b border-silver/20 px-5 py-5">
          <Link href="/" className="font-display text-xl font-bold text-royal">VESTA</Link>
          <p className="mt-0.5 text-[0.68rem] font-semibold uppercase tracking-widest text-muted">Quản trị nội dung</p>
        </div>
        <nav className="flex-1 space-y-1 px-3 py-4">
          {sidebarLinks.map((link) => {
            const isActive = pathname.startsWith(link.href);
            return (
              <Link key={link.href} href={link.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${isActive ? "bg-royal/8 text-royal" : "text-muted hover:bg-cream-dark hover:text-royal"}`}>
                <link.icon size={18} />{link.label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-silver/20 px-3 py-4 space-y-1">
          <Link href="/" className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted transition-colors hover:bg-cream-dark hover:text-royal">
            <Home size={18} />Về trang chủ
          </Link>
          <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted transition-colors hover:bg-red-50 hover:text-red-600">
            <LogOut size={18} />Đăng xuất
          </button>
        </div>
      </aside>
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}

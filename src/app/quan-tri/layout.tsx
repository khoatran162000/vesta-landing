/**
 * FILE: layout.tsx
 * PATH: apps/landing/src/app/quan-tri/layout.tsx
 * MÔ TẢ: Layout CMS — AuthGuard + sidebar hiển thị tên user thật + logout
 */

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FileText, UserCircle, LogOut, Home } from "lucide-react";
import { AuthGuard } from "@/components/layout/AuthGuard";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const sidebarLinks = [
  { href: "/quan-tri/bai-viet", label: "Bài viết", icon: FileText },
  { href: "/quan-tri/ho-so", label: "Hồ sơ cá nhân", icon: UserCircle },
];

const roleLabels: Record<string, string> = {
  ADMIN: "Quản trị viên",
  CONTENT_CREATOR: "Marketing",
  TEACHER: "Giáo viên",
  STUDENT: "Học viên",
};

interface UserInfo {
  fullName: string;
  email: string;
  role: string;
}

export default function CmsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<UserInfo | null>(null);

  // Fetch user info cho sidebar
  useEffect(() => {
    if (pathname === "/quan-tri/dang-nhap") return;

    const token = localStorage.getItem("accessToken");
    if (!token) return;

    fetch(`${API_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setUser(data.data);
      })
      .catch(() => {});
  }, [pathname]);

  // Trang đăng nhập không hiện sidebar
  if (pathname === "/quan-tri/dang-nhap") {
    return <AuthGuard>{children}</AuthGuard>;
  }

  function handleLogout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    router.replace("/quan-tri/dang-nhap");
  }

  return (
    <AuthGuard>
      <div className="flex min-h-screen bg-cream">
        <aside className="sticky top-0 flex h-screen w-60 shrink-0 flex-col border-r border-silver/30 bg-white">
          {/* Brand */}
          <div className="border-b border-silver/20 px-5 py-5">
            <Link href="/" className="font-display text-xl font-bold text-royal">VESTA</Link>
            <p className="mt-0.5 text-[0.68rem] font-semibold uppercase tracking-widest text-muted">Quản trị nội dung</p>
          </div>

          {/* User info */}
          {user && (
            <div className="border-b border-silver/20 px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-royal/10 text-sm font-bold text-royal">
                  {user.fullName.charAt(0)}
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-[#1a1a2e]">{user.fullName}</p>
                  <p className="truncate text-[0.65rem] text-muted">{roleLabels[user.role] || user.role}</p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
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

          {/* Bottom */}
          <div className="border-t border-silver/20 px-3 py-4 space-y-1">
            <Link href="/" className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted transition-colors hover:bg-cream-dark hover:text-royal">
              <Home size={18} />Về trang chủ
            </Link>
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted transition-colors hover:bg-red-50 hover:text-red-600"
            >
              <LogOut size={18} />Đăng xuất
            </button>
          </div>
        </aside>

        <main className="flex-1 p-8">{children}</main>
      </div>
    </AuthGuard>
  );
}
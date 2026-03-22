/**
 * FILE: AuthGuard.tsx
 * PATH: apps/landing/src/components/layout/AuthGuard.tsx
 * MÔ TẢ: Bảo vệ trang CMS — kiểm tra token, redirect về đăng nhập nếu chưa login
 */

"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [authorized, setAuthorized] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    // Trang đăng nhập không cần check
    if (pathname === "/quan-tri/dang-nhap") {
      setAuthorized(true);
      setChecking(false);
      return;
    }

    const token = localStorage.getItem("accessToken");

    if (!token) {
      router.replace("/quan-tri/dang-nhap");
      return;
    }

    // Verify token còn hạn bằng cách gọi API /auth/me
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then(() => {
        setAuthorized(true);
        setChecking(false);
      })
      .catch(() => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        router.replace("/quan-tri/dang-nhap");
      });
  }, [pathname, router]);

  // Đang kiểm tra — hiện loading
  if (checking && pathname !== "/quan-tri/dang-nhap") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-cream">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-gold border-t-transparent" />
          <p className="mt-3 text-sm text-muted">Đang xác thực...</p>
        </div>
      </div>
    );
  }

  // Chưa xác thực — không render gì (đang redirect)
  if (!authorized && pathname !== "/quan-tri/dang-nhap") {
    return null;
  }

  return <>{children}</>;
}
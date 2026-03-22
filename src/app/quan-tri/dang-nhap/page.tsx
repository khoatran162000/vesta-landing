/**
 * FILE: page.tsx
 * PATH: apps/landing/src/app/quan-tri/dang-nhap/page.tsx
 * MÔ TẢ: Trang đăng nhập CMS cho Marketing/Admin — /quan-tri/dang-nhap
 */

"use client";

import { useState } from "react";
import { SITE_INFO } from "@/lib/constants";

export default function CmsLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      localStorage.setItem("accessToken", data.data.accessToken);
      localStorage.setItem("refreshToken", data.data.refreshToken);
      window.location.href = "/quan-tri/bai-viet";
    } catch (err: any) {
      setError(err.message || "Đã có lỗi xảy ra");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-cream px-4">
      <div className="w-full max-w-md rounded-2xl border border-silver/30 bg-white p-8 shadow-sm">
        <div className="mb-8 text-center">
          <h1 className="font-display text-3xl font-bold text-royal">{SITE_INFO.name}</h1>
          <p className="mt-1 text-sm text-muted">Đăng nhập quản trị nội dung</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-royal">Email</label>
            <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com"
              className="w-full rounded-lg border border-silver/40 bg-cream px-4 py-2.5 text-sm outline-none transition-colors focus:border-gold focus:ring-1 focus:ring-gold/30" />
          </div>
          <div>
            <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-royal">Mật khẩu</label>
            <input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••"
              className="w-full rounded-lg border border-silver/40 bg-cream px-4 py-2.5 text-sm outline-none transition-colors focus:border-gold focus:ring-1 focus:ring-gold/30" />
          </div>
          {error && <p className="rounded-lg bg-red-50 px-4 py-2.5 text-sm text-red-600">{error}</p>}
          <button type="submit" disabled={loading} className="cta-btn w-full justify-center disabled:opacity-60">
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>
        </form>
      </div>
    </div>
  );
}

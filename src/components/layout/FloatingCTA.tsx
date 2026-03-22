/**
 * FILE: FloatingCTA.tsx
 * PATH: apps/landing/src/components/layout/FloatingCTA.tsx
 * MÔ TẢ: Nút "ĐĂNG KÝ HỌC NGAY" trôi nổi — luôn hiển thị khi lướt trang
 */

"use client";

import { useState, useEffect } from "react";
import { SITE_INFO } from "@/lib/constants";

export function FloatingCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function handleScroll() {
      // Hiện sau khi cuộn xuống 300px
      setVisible(window.scrollY > 300);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <a
      href={SITE_INFO.registerLink}
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-1.5 rounded-full px-4 py-2.5 text-xs font-bold tracking-wide text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl ${
        visible
          ? "translate-y-0 opacity-100"
          : "translate-y-4 opacity-0 pointer-events-none"
      }`}
      style={{
        background: "linear-gradient(135deg, #C93040, #A31D2B)",
        boxShadow: visible ? "0 8px 30px rgba(169, 29, 43, 0.4)" : "none",
      }}
    >
      <span className="text-base">✦</span>
      ĐĂNG KÝ HỌC NGAY
    </a>
  );
}
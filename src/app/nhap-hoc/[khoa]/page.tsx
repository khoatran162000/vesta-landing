// FILE: src/app/nhap-hoc/[khoa]/page.tsx — Trang hướng dẫn nhập học (iframe file tĩnh, cô lập CSS)
"use client";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowLeft, Loader2 } from "lucide-react";

// Whitelist slug hợp lệ → tránh trỏ iframe tới file không tồn tại
const VALID = ["ielts4plus", "ielts5plus", "ielts6plus", "ielts7plus", "intensive"] as const;

export default function NhapHocPage() {
  const { khoa } = useParams<{ khoa: string }>();
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);

  const slug = String(khoa || "").toLowerCase();
  const isValid = (VALID as readonly string[]).includes(slug);

  if (!isValid) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#F0F2F6] px-6 text-center">
        <p className="text-lg font-semibold text-[#1B2A5C]">Không tìm thấy hướng dẫn nhập học cho khóa này.</p>
        <button onClick={() => router.push("/#courses")}
          className="inline-flex items-center gap-2 rounded-full bg-[#1B2A5C] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#2A3F7A]">
          <ArrowLeft size={16} />Về danh sách khóa học
        </button>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#F0F2F6]">
      {/* Thanh quay lại — nổi trên iframe */}
      <button onClick={() => router.push("/#courses")}
        className="fixed left-4 top-4 z-20 inline-flex items-center gap-1.5 rounded-full bg-[#1B2A5C]/95 px-4 py-2 text-sm font-semibold text-white shadow-lg backdrop-blur hover:bg-[#2A3F7A]">
        <ArrowLeft size={16} />Quay lại
      </button>

      {!loaded && (
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <Loader2 size={32} className="animate-spin text-[#C9A84C]" />
        </div>
      )}

      <iframe
        src={`/nhap-hoc/${slug}.html`}
        title="Hướng dẫn nhập học"
        onLoad={() => setLoaded(true)}
        className="h-screen w-full border-0"
      />
    </div>
  );
}
// FILE: src/app/nhap-hoc/[khoa]/page.tsx — Trang hướng dẫn nhập học (HTML lấy từ DB qua API, iframe srcdoc cô lập CSS)
"use client";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { ArrowLeft, Loader2 } from "lucide-react";
const API_URL = process.env.NEXT_PUBLIC_API_URL;
export default function NhapHocPage() {
  const { khoa } = useParams<{ khoa: string }>();
  const router = useRouter();
  const slug = String(khoa || "").toLowerCase();
  const isValid = /^[a-z0-9]+$/.test(slug);   // slug hợp lệ = chữ thường + số (tránh path lạ)
  const [html, setHtml] = useState<string | null>(null);
  const [status, setStatus] = useState<"loading" | "ok" | "empty">("loading");
  useEffect(() => {
    if (!isValid) return;
    (async () => {
      try {
        const res = await fetch(`${API_URL}/site-content/enroll_${slug}`, { cache: "no-store" });
        const json = await res.json();
        const content = json?.data?.data?.html || "";
        if (content) { setHtml(content); setStatus("ok"); }
        else setStatus("empty");
      } catch { setStatus("empty"); }
    })();
  }, [slug, isValid]);
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
      {status === "loading" && (
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <Loader2 size={32} className="animate-spin text-[#C9A84C]" />
        </div>
      )}
      {status === "empty" && (
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
          <p className="text-lg font-semibold text-[#1B2A5C]">Nội dung hướng dẫn đang được cập nhật.</p>
          <button onClick={() => router.push("/#courses")}
            className="inline-flex items-center gap-2 rounded-full bg-[#1B2A5C] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#2A3F7A]">
            <ArrowLeft size={16} />Về danh sách khóa học
          </button>
        </div>
      )}
      {status === "ok" && html !== null && (
        <iframe
          srcDoc={html}
          title="Hướng dẫn nhập học"
          className="h-screen w-full border-0"
        />
      )}
    </div>
  );
}
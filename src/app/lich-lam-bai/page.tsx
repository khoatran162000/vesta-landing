// FILE: src/app/lich-lam-bai/page.tsx — Trang lịch làm bài công khai (landing)
"use client";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import CalendarView, { CalData } from "@/components/calendar/CalendarView";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function LichLamBaiPage() {
  const [data, setData] = useState<CalData | null>(null);
  const [status, setStatus] = useState<"loading" | "ok" | "empty">("loading");
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API_URL}/site-content/calendar_all`, { cache: "no-store" });
        const json = await res.json();
        const d = json?.data?.data;
        if (d && Object.keys(d).length) { setData(d); setStatus("ok"); }
        else setStatus("empty");
      } catch { setStatus("empty"); }
    })();
  }, []);
  if (status === "loading") return <div className="flex min-h-screen items-center justify-center bg-[#faf8f4]"><Loader2 size={32} className="animate-spin text-[#c9a84c]" /></div>;
  if (status === "empty" || !data) return <div className="flex min-h-screen items-center justify-center bg-[#faf8f4] px-6 text-center text-[#1a2a6c]">Lịch làm bài đang được cập nhật.</div>;
  return <CalendarView data={data} />;
}
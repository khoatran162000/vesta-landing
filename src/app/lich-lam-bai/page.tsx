// FILE: src/app/lich-lam-bai/page.tsx — Lịch làm bài công khai (ưu tiên HTML dán, fallback form)
"use client";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import CalendarView, { CalData } from "@/components/calendar/CalendarView";
const API_URL = process.env.NEXT_PUBLIC_API_URL;
const MOBILE_FIX = `<style>@media (max-width:640px){html,body{overflow-x:hidden!important}*{max-width:100%!important;overflow-wrap:anywhere}img,table,video,figure{max-width:100%!important;height:auto}}</style>`;
function withFix(h: string): string { if (!h) return h; return /<\/head>/i.test(h) ? h.replace(/<\/head>/i, MOBILE_FIX + "</head>") : MOBILE_FIX + h; }
export default function LichLamBaiPage() {
  const [html, setHtml] = useState<string | null>(null);
  const [data, setData] = useState<CalData | null>(null);
  const [status, setStatus] = useState<"loading" | "ok" | "empty">("loading");
  useEffect(() => {
    (async () => {
      try {
        const r = await fetch(`${API_URL}/site-content/calendar_html`, { cache: "no-store" });
        const j = await r.json();
        const hv = j?.data?.data?.html;
        if (hv && String(hv).trim()) { setHtml(withFix(String(hv))); setStatus("ok"); return; }
      } catch {}
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
  if (html) return <iframe srcDoc={html} title="Lịch làm bài" sandbox="allow-scripts allow-popups" className="w-full border-0" style={{ height: "100vh" }} />;
  if (status === "empty" || !data) return <div className="flex min-h-screen items-center justify-center bg-[#faf8f4] px-6 text-center text-[#1a2a6c]">Lịch làm bài đang được cập nhật.</div>;
  return <CalendarView data={data} />;
}

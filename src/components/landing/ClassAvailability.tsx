// FILE: src/components/landing/ClassAvailability.tsx — Danh sách lớp đang mở theo trình độ (public)
"use client";
import { useState } from "react";
const API_URL = process.env.NEXT_PUBLIC_API_URL;
export function ClassAvailability({ level }: { level?: string | null }) {
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [classes, setClasses] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  if (!level) return null; // khoá chưa gán trình độ → không hiện nút
  async function toggle() {
    const next = !open;
    setOpen(next);
    if (next && !loaded) {
      setLoading(true);
      try {
        const r = await fetch(`${API_URL}/classes/public?course=${encodeURIComponent(level!)}`);
        const json = await r.json();
        if (json?.success && Array.isArray(json.data)) setClasses(json.data);
      } catch {}
      setLoading(false);
      setLoaded(true);
    }
  }
  return (
    <div className="mt-5 border-t border-silver/20 pt-4">
      <button onClick={toggle}
        className="inline-flex items-center gap-1.5 text-[0.88rem] font-semibold text-royal underline underline-offset-2 hover:text-gold transition-colors">
        {open ? "Ẩn lớp đang mở" : "Xem lớp đang mở"}
      </button>
      {open && (
        <div className="mt-3 space-y-2">
          {loading ? (
            <p className="text-sm text-muted">Đang tải…</p>
          ) : classes.length === 0 ? (
            <p className="text-sm text-muted">Chưa có lớp đang mở cho khoá này.</p>
          ) : (
            classes.map((cl) => (
              <div key={cl.id}
                className={`flex flex-wrap items-center justify-between gap-2 rounded-lg border px-4 py-2.5 ${cl.isFull ? "border-silver/30 bg-cream/40 opacity-70" : "border-silver/40 bg-white"}`}>
                <div>
                  <p className="text-[0.9rem] font-bold text-[#1a1a2e]">{cl.name}</p>
                  <p className="text-[0.78rem] text-muted">
                    {[cl.schedule, cl.teacher].filter(Boolean).join(" • ")}
                  </p>
                </div>
                {cl.isFull ? (
                  <span className="shrink-0 rounded-full bg-silver/30 px-3 py-1 text-[0.7rem] font-bold uppercase text-muted">Đã đầy</span>
                ) : cl.slotsLeft !== null ? (
                  <span className="shrink-0 rounded-full bg-green-50 px-3 py-1 text-[0.7rem] font-bold uppercase text-green-700">Còn {cl.slotsLeft} chỗ</span>
                ) : (
                  <span className="shrink-0 rounded-full bg-royal/8 px-3 py-1 text-[0.7rem] font-bold uppercase text-royal">Đang nhận</span>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
// FILE: src/app/dat-lich-tu-van/page.tsx — Đặt lịch tư vấn (gửi về email GV)
"use client";
import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Loader2, CheckCircle, Send, Phone, Mail, MapPin } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function ConsultationPage() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", question: "", preferredTime: "" });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const set = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.phone) {
      setError("Vui lòng nhập họ tên và số điện thoại");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_URL}/consultation`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setSent(true);
      } else {
        setError(data.message || "Gửi thất bại. Vui lòng thử lại.");
      }
    } catch {
      setError("Lỗi kết nối. Vui lòng thử lại.");
    }
    setLoading(false);
  }

  return (
    <>
      <Header />
      <main className="mx-auto max-w-[960px] px-6 py-12">
        <div className="grid gap-8 lg:grid-cols-5">
          {/* Left — Info */}
          <div className="lg:col-span-2">
            <h2 className="font-display text-[2rem] font-bold text-royal">📅 Đặt Lịch Tư Vấn</h2>
            <p className="mt-3 text-[0.9rem] leading-relaxed text-muted">
              Điền thông tin bên dưới, giáo viên sẽ liên hệ tư vấn lộ trình IELTS phù hợp nhất cho bạn.
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-royal/10">
                  <Phone size={16} className="text-royal" />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#1a1a2e]">Điện thoại / Zalo</p>
                  <p className="text-sm text-muted">0838 779 988 · 033 678 1368</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-royal/10">
                  <Mail size={16} className="text-royal" />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#1a1a2e]">Email</p>
                  <p className="text-sm text-muted">huongly.ams@gmail.com</p>
                  <p className="text-sm text-muted">vestaunivn@gmail.com</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-royal/10">
                  <MapPin size={16} className="text-royal" />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#1a1a2e]">Địa chỉ</p>
                  <p className="text-sm text-muted">Số 9 Khu thương mại, khu B Khu 361 HVKTQS, Hoàng Quốc Việt, Nghĩa Đô, Hà Nội</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right — Form */}
          <div className="lg:col-span-3">
            {sent ? (
              <div className="rounded-2xl border border-green-200 bg-green-50 p-10 text-center">
                <CheckCircle size={48} className="mx-auto mb-4 text-green-600" />
                <h3 className="font-display text-xl font-bold text-green-800">Đã gửi thành công!</h3>
                <p className="mt-2 text-sm text-green-700">
                  Giáo viên sẽ liên hệ bạn trong thời gian sớm nhất. Cảm ơn bạn đã quan tâm đến VESTA UNI!
                </p>
                <button
                  onClick={() => {
                    setSent(false);
                    setForm({ name: "", phone: "", email: "", question: "", preferredTime: "" });
                  }}
                  className="mt-4 rounded-lg border border-green-300 px-4 py-2 text-sm text-green-700 hover:bg-green-100"
                >
                  Gửi yêu cầu khác
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="overflow-hidden rounded-2xl border border-silver/20 bg-white shadow-sm">
                <div className="px-7 py-5" style={{ background: "linear-gradient(135deg, #0F1B3D, #1B2A5B)" }}>
                  <h3 className="font-display text-lg font-bold text-white">Thông tin liên hệ</h3>
                  <p className="mt-1 text-[0.75rem] text-white/50">Điền form → Giáo viên liên hệ tư vấn miễn phí</p>
                </div>

                <div className="space-y-4 p-7">
                  {error && (
                    <div className="rounded-lg bg-red-50 px-4 py-2 text-sm text-red-600">{error}</div>
                  )}

                  <div>
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-muted">
                      Họ và tên <span className="text-red-500">*</span>
                    </label>
                    <input type="text" value={form.name} onChange={(e) => set("name", e.target.value)} required placeholder="Nguyễn Văn A"
                      className="w-full rounded-lg border border-silver/40 px-4 py-2.5 text-sm outline-none focus:border-gold focus:ring-1 focus:ring-gold/30" />
                  </div>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-muted">
                        Số điện thoại <span className="text-red-500">*</span>
                      </label>
                      <input type="tel" value={form.phone} onChange={(e) => set("phone", e.target.value)} required placeholder="0912345678"
                        className="w-full rounded-lg border border-silver/40 px-4 py-2.5 text-sm outline-none focus:border-gold focus:ring-1 focus:ring-gold/30" />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-muted">Email</label>
                      <input type="email" value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="email@gmail.com"
                        className="w-full rounded-lg border border-silver/40 px-4 py-2.5 text-sm outline-none focus:border-gold focus:ring-1 focus:ring-gold/30" />
                    </div>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-muted">Thời gian thuận tiện liên hệ</label>
                    <select value={form.preferredTime} onChange={(e) => set("preferredTime", e.target.value)}
                      className="w-full rounded-lg border border-silver/40 bg-white px-4 py-2.5 text-sm outline-none focus:border-gold">
                      <option value="">— Chọn —</option>
                      <option value="Sáng (8-12h)">Sáng (8-12h)</option>
                      <option value="Chiều (13-17h)">Chiều (13-17h)</option>
                      <option value="Tối (18-21h)">Tối (18-21h)</option>
                      <option value="Bất kỳ">Bất kỳ lúc nào</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-muted">Câu hỏi / Nội dung cần tư vấn</label>
                    <textarea value={form.question} onChange={(e) => set("question", e.target.value)} rows={4}
                      placeholder="VD: Em muốn hỏi về khoá IELTS 7+, lịch học và mức phí..."
                      className="w-full resize-none rounded-lg border border-silver/40 px-4 py-2.5 text-sm outline-none focus:border-gold focus:ring-1 focus:ring-gold/30" />
                  </div>

                  <button type="submit" disabled={loading}
                    className="flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:shadow-xl disabled:opacity-60"
                    style={{ background: "linear-gradient(135deg, #0F1B3D, #1B2A5B)" }}>
                    {loading ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />Đang gửi...
                      </>
                    ) : (
                      <>
                        <Send size={16} />Gửi yêu cầu tư vấn
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
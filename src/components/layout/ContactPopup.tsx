/**
 * FILE: ContactPopup.tsx
 * PATH: apps/landing/src/components/layout/ContactPopup.tsx
 * MÔ TẢ: Nút chat góc trái dưới — mở popup chọn Zalo hoặc gửi email
 */

"use client";

import { useState } from "react";
import { MessageCircle, X, Send, Phone } from "lucide-react";
import { SITE_INFO } from "@/lib/constants";

export function ContactPopup() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"menu" | "email">("menu");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  function resetForm() {
    setName("");
    setPhone("");
    setMessage("");
    setSent(false);
    setMode("menu");
  }

  function handleClose() {
    setOpen(false);
    setTimeout(resetForm, 300);
  }

  async function handleSendEmail(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setSending(true);
    try {
      // TODO: Khi có Backend, gửi qua API:
      // await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contact`, {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ name, phone, message }),
      // });

      // Tạm thời: mở email client với nội dung đã điền sẵn
      const subject = encodeURIComponent(`[Website] Câu hỏi từ ${name}`);
      const body = encodeURIComponent(
        `Họ tên: ${name}\nSố điện thoại: ${phone || "Không cung cấp"}\n\nCâu hỏi:\n${message}`
      );
      window.open(`mailto:${SITE_INFO.email}?subject=${subject}&body=${body}`, "_blank");

      setSent(true);
    } finally {
      setSending(false);
    }
  }

  // Zalo chat link — thay số Zalo của công ty
  const zaloLink = `https://zalo.me/${SITE_INFO.phone.replace(/\s/g, "")}`;

  return (
    <>
      {/* ═══════ NÚT MỞ POPUP — góc trái dưới ═══════ */}
      <button
        onClick={() => { setOpen(true); setMode("menu"); }}
        className={`fixed bottom-20 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full text-white shadow-lg transition-all duration-300 hover:scale-110 ${
          open ? "scale-0 opacity-0" : "scale-100 opacity-100"
        }`}
        style={{
          background: "linear-gradient(135deg, #0068FF, #0055CC)",
          boxShadow: "0 6px 24px rgba(0, 104, 255, 0.4)",
        }}
        aria-label="Liên hệ tư vấn"
      >
        <MessageCircle size={24} />
      </button>

      {/* Pulse animation ring */}
      {!open && (
        <div className="fixed bottom-20 right-6 z-40 h-14 w-14 animate-ping rounded-full opacity-30"
          style={{ background: "#0068FF" }} />
      )}

      {/* ═══════ POPUP ═══════ */}
      <div className={`fixed bottom-36 right-6 z-50 w-[340px] origin-bottom-right transition-all duration-300 ${
        open ? "scale-100 opacity-100" : "scale-0 opacity-0 pointer-events-none"
      }`}>
        <div className="overflow-hidden rounded-2xl border border-silver/20 bg-white shadow-2xl">

          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4"
            style={{ background: "linear-gradient(135deg, #0068FF, #0055CC)" }}>
            <div>
              <h4 className="text-sm font-bold text-white">VESTA Academy</h4>
              <p className="text-[0.7rem] text-white/70">Chúng tôi sẵn sàng hỗ trợ bạn!</p>
            </div>
            <button onClick={handleClose}
              className="rounded-full p-1.5 text-white/70 transition-colors hover:bg-white/20 hover:text-white">
              <X size={18} />
            </button>
          </div>

          {/* ═══════ MODE: MENU — chọn Zalo hoặc Email ═══════ */}
          {mode === "menu" && (
            <div className="p-5 space-y-3">
              <p className="text-sm text-muted">Bạn muốn liên hệ qua kênh nào?</p>

              {/* Zalo */}
              <a
                href={zaloLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center gap-3 rounded-xl border border-[#0068FF]/20 bg-[#0068FF]/5 px-4 py-3.5 transition-colors hover:bg-[#0068FF]/10"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-lg font-bold text-white"
                  style={{ background: "#0068FF" }}>
                  Z
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#0068FF]">Chat qua Zalo</p>
                  <p className="text-[0.7rem] text-muted">Phản hồi nhanh trong giờ hành chính</p>
                </div>
              </a>

              {/* Gọi điện */}
              <a
                href={SITE_INFO.phoneHref}
                className="flex w-full items-center gap-3 rounded-xl border border-green-500/20 bg-green-50 px-4 py-3.5 transition-colors hover:bg-green-100"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-500 text-white">
                  <Phone size={18} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-green-700">Gọi điện: {SITE_INFO.phone}</p>
                  <p className="text-[0.7rem] text-muted">Tư vấn trực tiếp</p>
                </div>
              </a>

              {/* Email */}
              <button
                onClick={() => setMode("email")}
                className="flex w-full items-center gap-3 rounded-xl border border-gold/20 bg-gold/5 px-4 py-3.5 text-left transition-colors hover:bg-gold/10"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold text-navy text-sm font-bold">
                  ✉
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#8B7530]">Gửi câu hỏi qua Email</p>
                  <p className="text-[0.7rem] text-muted">Phản hồi trong vòng 24h</p>
                </div>
              </button>
            </div>
          )}

          {/* ═══════ MODE: EMAIL FORM ═══════ */}
          {mode === "email" && !sent && (
            <form onSubmit={handleSendEmail} className="p-5 space-y-3">
              <button type="button" onClick={() => setMode("menu")}
                className="mb-1 text-xs text-muted hover:text-royal">
                ← Quay lại
              </button>

              <div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Họ và tên *"
                  required
                  className="w-full rounded-lg border border-silver/40 bg-cream px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-gold focus:ring-1 focus:ring-gold/30"
                />
              </div>

              <div>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Số điện thoại (tuỳ chọn)"
                  className="w-full rounded-lg border border-silver/40 bg-cream px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-gold focus:ring-1 focus:ring-gold/30"
                />
              </div>

              <div>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Câu hỏi của bạn *"
                  required
                  rows={3}
                  className="w-full resize-none rounded-lg border border-silver/40 bg-cream px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-gold focus:ring-1 focus:ring-gold/30"
                />
              </div>

              <button
                type="submit"
                disabled={sending || !name.trim() || !message.trim()}
                className="flex w-full items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-bold text-white transition-all hover:opacity-90 disabled:opacity-50"
                style={{ background: "linear-gradient(135deg, #C9A84C, #E8D48B)", color: "#0F1B3D" }}
              >
                <Send size={14} />
                {sending ? "Đang gửi..." : "Gửi câu hỏi"}
              </button>
            </form>
          )}

          {/* ═══════ MODE: SENT SUCCESS ═══════ */}
          {mode === "email" && sent && (
            <div className="p-5 text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-2xl">
                ✓
              </div>
              <p className="text-sm font-semibold text-royal">Đã gửi thành công!</p>
              <p className="mt-1 text-xs text-muted">
                Chúng tôi sẽ phản hồi qua email trong vòng 24h.
              </p>
              <button onClick={handleClose}
                className="mt-4 text-xs font-medium text-gold hover:text-gold-bright">
                Đóng
              </button>
            </div>
          )}

        </div>
      </div>
    </>
  );
}
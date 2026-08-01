// FILE: src/app/tra-cuu-don/page.tsx — Tra cứu đơn (mã + email): xem trạng thái, thanh toán (nếu có giá), tải file
"use client";
import { useState } from "react";
import { Loader2, ArrowLeft, Download, Search } from "lucide-react";
import Link from "next/link";
import { resolveUrl } from "@/lib/siteContent";
import PaymentQR from "@/components/shop/PaymentQR";
const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api";
const fmtVND = (n: number) => n.toLocaleString("vi-VN") + "₫";
const STATUS: Record<string, string> = { PENDING: "Chờ thanh toán", PAID: "Đã thanh toán — đang xử lý", DELIVERED: "Đã giao", CANCELLED: "Đã huỷ" };

export default function TraCuuDonPage() {
  const [code, setCode] = useState(""); const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false); const [err, setErr] = useState("");
  const [order, setOrder] = useState<any>(null);

  async function lookup() {
    if (!code.trim() || !email.trim()) return setErr("Nhập mã đơn và email");
    setLoading(true); setErr(""); setOrder(null);
    try {
      const r = await fetch(`${API}/orders/track?code=${encodeURIComponent(code.trim())}&email=${encodeURIComponent(email.trim())}`);
      const j = await r.json();
      if (!j.success) { setErr(j.message || "Không tìm thấy đơn"); setLoading(false); return; }
      setOrder(j.data);
    } catch { setErr("Lỗi kết nối"); }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-[#F0F2F6] px-4 py-10">
      <div className="mx-auto max-w-[560px]">
        <Link href="/tai-lieu" className="mb-6 inline-flex items-center gap-1.5 text-sm text-[#1B2A5C] hover:underline"><ArrowLeft size={15} />Tài liệu</Link>
        <h1 className="font-display text-3xl font-bold text-[#1B2A5C]">Tra cứu đơn hàng</h1>
        <p className="mb-6 mt-1 text-[#1B2A5C]/70">Nhập mã đơn và email để xem trạng thái, thanh toán và tải tài liệu / bài chữa.</p>

        <div className="rounded-2xl bg-white p-6 shadow-lg">
          <input value={code} onChange={(e) => setCode(e.target.value.toUpperCase())} placeholder="Mã đơn (VD: VESTAABC123)" className="mb-2 w-full rounded-lg border border-silver/40 px-3 py-2 font-mono outline-none focus:border-gold" />
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email đã dùng khi đặt" className="mb-3 w-full rounded-lg border border-silver/40 px-3 py-2 outline-none focus:border-gold" />
          {err && <div className="mb-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{err}</div>}
          <button onClick={lookup} disabled={loading} className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#1B2A5C] py-2.5 font-semibold text-white hover:bg-[#2A3F7A]">{loading ? <Loader2 size={16} className="animate-spin" /> : <Search size={16} />}Tra cứu</button>
        </div>

        {order && (
          <div className="mt-5 rounded-2xl bg-white p-6 shadow-lg">
            <div className="mb-3 flex items-center justify-between">
              <span className="font-mono font-bold text-[#1B2A5C]">{order.code}</span>
              <span className="rounded-full bg-[#F0F2F6] px-3 py-1 text-sm font-semibold text-[#1B2A5C]">{STATUS[order.status] || order.status}</span>
            </div>
            <div className="mb-4 text-sm text-gray-600">
              {order.kind === "MATERIAL" ? <>Tài liệu: <b>{order.materialTitle}</b></> : <>Chấm bài: <b>{order.gradingType === "speaking" ? "Speaking" : "Writing"}</b></>}
            </div>

            {/* Đã giao → tải */}
            {order.status === "DELIVERED" && order.deliverUrl ? (
              <a href={resolveUrl(order.deliverUrl)} target="_blank" rel="noopener noreferrer" className="flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 py-3 font-semibold text-white hover:bg-green-700"><Download size={17} />Tải tài liệu / bài chữa</a>
            ) : order.status === "PAID" ? (
              <div className="rounded-lg bg-blue-50 p-3 text-center text-sm text-blue-700">Đã nhận thanh toán. Đơn đang được xử lý, bạn sẽ tải được file khi hoàn tất.</div>
            ) : order.amount > 0 ? (
              // có giá → hiện QR thanh toán
              <>
                <PaymentQR amount={order.amount} code={order.code} />
                <p className="mt-2 text-center text-xs text-gray-500">Sau khi chuyển khoản, hệ thống cần ít phút để đối chiếu. Tra lại đơn để cập nhật trạng thái.</p>
              </>
            ) : (
              <div className="rounded-lg bg-amber-50 p-3 text-center text-sm text-amber-700">
                {order.kind === "GRADING" ? "Giáo viên đang xem bài và sẽ báo giá sớm. Vui lòng tra lại sau." : "Đơn đang chờ xử lý."}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
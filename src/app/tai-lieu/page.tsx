// FILE: src/app/tai-lieu/page.tsx — Tài liệu (free tải luôn / paid mua qua CK)
"use client";
import { useState, useEffect } from "react";
import { Loader2, Download, ShoppingCart, FileText, X, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { resolveUrl } from "@/lib/siteContent";
import PaymentQR from "@/components/shop/PaymentQR";
const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api";
const fmtVND = (n: number) => n.toLocaleString("vi-VN") + "₫";

interface Item { id: string; title: string; description: string | null; type: string; price: number; fileUrl: string | null; thumbnailUrl: string | null; category: string | null; }

export default function TaiLieuPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [buy, setBuy] = useState<Item | null>(null);

  useEffect(() => {
    (async () => {
      try { const r = await fetch(`${API}/materials`); const j = await r.json(); if (j.success) setItems(j.data || []); } catch {}
      setLoading(false);
    })();
  }, []);

  async function downloadFree(it: Item) {
    try {
      const r = await fetch(`${API}/materials/${it.id}/download`);
      const j = await r.json();
      if (j.success && j.data.fileUrl) window.open(resolveUrl(j.data.fileUrl), "_blank");
      else alert(j.message || "Không tải được");
    } catch { alert("Lỗi tải"); }
  }

  const cats = [...new Set(items.map((x) => x.category).filter(Boolean))] as string[];

  return (
    <div className="min-h-screen bg-[#F0F2F6] px-4 py-10">
      <div className="mx-auto max-w-[1000px]">
        <Link href="/" className="mb-6 inline-flex items-center gap-1.5 text-sm text-[#1B2A5C] hover:underline"><ArrowLeft size={15} />Về trang chủ</Link>
        <h1 className="font-display text-3xl font-bold text-[#1B2A5C]">Tài liệu VESTA</h1>
        <p className="mb-6 mt-1 text-[#1B2A5C]/70">Tài liệu luyện thi IELTS — miễn phí tải ngay, tài liệu cao cấp có phí.</p>
        <div className="mb-8 text-center">
          <Link href="/cham-bai" className="mr-2 inline-block rounded-full bg-[#1B2A5C] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#2A3F7A]">Dịch vụ chấm chữa bài →</Link>
          <Link href="/tra-cuu-don" className="inline-block rounded-full border border-[#1B2A5C] px-5 py-2.5 text-sm font-semibold text-[#1B2A5C] hover:bg-white">Tra cứu đơn hàng</Link>
        </div>

        {loading ? (
          <div className="flex justify-center py-20"><Loader2 size={28} className="animate-spin text-gold" /></div>
        ) : items.length === 0 ? (
          <div className="rounded-xl bg-white py-16 text-center text-gray-500">Chưa có tài liệu.</div>
        ) : (
          (cats.length ? cats.concat(items.some((x) => !x.category) ? ["Khác"] : []) : ["Khác"]).map((cat) => {
            const list = items.filter((x) => (x.category || "Khác") === cat);
            if (!list.length) return null;
            return (
              <div key={cat} className="mb-8">
                <h2 className="mb-3 font-display text-xl font-bold text-[#1B2A5C]">{cat}</h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {list.map((it) => (
                    <div key={it.id} className="flex flex-col rounded-xl border border-silver/30 bg-white p-4 shadow-sm">
                      <div className="flex items-start gap-3">
                        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#1B2A5C]/10 text-[#1B2A5C]">
                          {it.thumbnailUrl ? <img src={resolveUrl(it.thumbnailUrl)} alt="" className="h-12 w-12 rounded-lg object-cover" /> : <FileText size={22} />}
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="font-bold text-[#1a1a2e]">{it.title}</div>
                          {it.description && <div className="mt-0.5 text-sm text-gray-500">{it.description}</div>}
                        </div>
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <span className={`rounded-full px-2.5 py-0.5 text-sm font-bold ${it.type === "PAID" ? "bg-amber-50 text-amber-700" : "bg-green-50 text-green-700"}`}>{it.type === "PAID" ? fmtVND(it.price) : "Miễn phí"}</span>
                        {it.type === "PAID"
                          ? <button onClick={() => setBuy(it)} className="inline-flex items-center gap-1.5 rounded-lg bg-[#C9A84C] px-4 py-2 text-sm font-semibold text-white hover:bg-[#A6882E]"><ShoppingCart size={15} />Mua</button>
                          : <button onClick={() => downloadFree(it)} className="inline-flex items-center gap-1.5 rounded-lg bg-[#1B2A5C] px-4 py-2 text-sm font-semibold text-white hover:bg-[#2A3F7A]"><Download size={15} />Tải về</button>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })
        )}
      </div>
      {buy && <BuyModal item={buy} close={() => setBuy(null)} />}
    </div>
  );
}

function BuyModal({ item, close }: { item: Item; close: () => void }) {
  const [name, setName] = useState(""); const [email, setEmail] = useState(""); const [phone, setPhone] = useState("");
  const [order, setOrder] = useState<{ code: string; amount: number } | null>(null);
  const [loading, setLoading] = useState(false); const [err, setErr] = useState("");

  async function submit() {
    if (!name.trim() || !email.trim()) return setErr("Nhập tên và email");
    setLoading(true); setErr("");
    try {
      const r = await fetch(`${API}/orders`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ kind: "MATERIAL", materialId: item.id, customerName: name, customerEmail: email, customerPhone: phone }) });
      const j = await r.json();
      if (!j.success) { setErr(j.message || "Lỗi tạo đơn"); setLoading(false); return; }
      setOrder(j.data);
    } catch { setErr("Lỗi kết nối"); }
    setLoading(false);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onMouseDown={(e) => e.target === e.currentTarget && close()}>
      <div className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-display text-xl font-bold text-[#1B2A5C]">{order ? "Thanh toán" : "Mua tài liệu"}</h3>
          <button onClick={close} className="text-gray-400 hover:text-[#1B2A5C]"><X size={20} /></button>
        </div>
        {!order ? (
          <>
            <div className="mb-4 rounded-lg bg-[#F0F2F6] p-3">
              <div className="font-bold text-[#1a1a2e]">{item.title}</div>
              <div className="text-lg font-bold text-[#B22234]">{fmtVND(item.price)}</div>
            </div>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Họ tên" className="mb-2 w-full rounded-lg border border-silver/40 px-3 py-2 outline-none focus:border-gold" />
            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email (để nhận tài liệu)" className="mb-2 w-full rounded-lg border border-silver/40 px-3 py-2 outline-none focus:border-gold" />
            <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="SĐT (tuỳ chọn)" className="mb-3 w-full rounded-lg border border-silver/40 px-3 py-2 outline-none focus:border-gold" />
            {err && <div className="mb-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{err}</div>}
            <button onClick={submit} disabled={loading} className="w-full rounded-lg bg-[#C9A84C] py-2.5 font-semibold text-white hover:bg-[#A6882E]">{loading ? "Đang tạo đơn..." : "Tạo đơn & nhận QR"}</button>
          </>
        ) : (
          <>
            <PaymentQR amount={order.amount} code={order.code} />
            <p className="mt-3 text-center text-sm text-gray-600">Mã đơn: <b className="text-[#1B2A5C]">{order.code}</b>. Lưu lại để <Link href="/tra-cuu-don" className="text-[#1B2A5C] underline">tra cứu & tải tài liệu</Link> sau khi thanh toán được xác nhận.</p>
          </>
        )}
      </div>
    </div>
  );
}
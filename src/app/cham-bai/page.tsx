// FILE: src/app/cham-bai/page.tsx — Nộp bài chấm chữa (Writing/Speaking) → admin báo giá sau
"use client";
import { useState } from "react";
import { Loader2, ArrowLeft, CheckCircle } from "lucide-react";
import Link from "next/link";
import WritingPromptPicker, { Prompt } from "@/components/WritingPromptPicker";
const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api";

export default function ChamBaiPage() {
  const [gradingType, setGradingType] = useState<"essay" | "speaking">("essay");
  const [essayText, setEssayText] = useState(""); const [speakingLink, setSpeakingLink] = useState("");
  const [name, setName] = useState(""); const [email, setEmail] = useState(""); const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false); const [err, setErr] = useState("");
  const [done, setDone] = useState<{ code: string } | null>(null);

  function useThisPrompt(p: Prompt) {
    const header = `ĐỀ BÀI (Task 2 · ${p.topic}):\n${p.prompt}\n\n----- BÀI LÀM CỦA HỌC VIÊN -----\n`;
    setEssayText((prev) => (prev.startsWith("ĐỀ BÀI") ? header : header + prev));
    // đưa con trỏ xuống vùng viết bài
    setTimeout(() => {
      const ta = document.querySelector<HTMLTextAreaElement>("#essay-input");
      if (ta) { ta.focus(); ta.setSelectionRange(ta.value.length, ta.value.length); ta.scrollTop = ta.scrollHeight; }
    }, 50);
  }

  async function submit() {
    if (!name.trim() || !email.trim()) return setErr("Nhập tên và email");
    if (gradingType === "essay" && !essayText.trim()) return setErr("Dán bài luận cần chấm");
    if (gradingType === "speaking" && !speakingLink.trim()) return setErr("Dán link ghi âm/video Speaking");
    setLoading(true); setErr("");
    try {
      const r = await fetch(`${API}/orders`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ kind: "GRADING", gradingType, essayText: gradingType === "essay" ? essayText : null, speakingLink: gradingType === "speaking" ? speakingLink : null, customerName: name, customerEmail: email, customerPhone: phone }) });
      const j = await r.json();
      if (!j.success) { setErr(j.message || "Lỗi gửi bài"); setLoading(false); return; }
      setDone({ code: j.data.code });
    } catch { setErr("Lỗi kết nối"); }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-[#F0F2F6] px-4 py-10">
      <div className="mx-auto max-w-[720px]">
        <Link href="/tai-lieu" className="mb-6 inline-flex items-center gap-1.5 text-sm text-[#1B2A5C] hover:underline"><ArrowLeft size={15} />Tài liệu</Link>
        <h1 className="font-display text-3xl font-bold text-[#1B2A5C]">Dịch vụ chấm chữa bài</h1>
        <div className="mb-6 mt-1 space-y-2 text-[#1B2A5C]/70">
          <p>Mời bạn dán vào ô dưới bài viết hoặc bài nói, bạn sẽ nhận được bài chấm chữa trong vòng 24 giờ (trừ lễ tết) bạn nhé!</p>
          <p>Bạn có thể tự chọn đề (cả Task 1 và Task 2 viết, bất kì phần nói nào) hoặc cũng có thể chọn đề dự đoán từ Vesta cho Writing Task 2 dưới đây.</p>
          <p>Bạn có thể bấm giờ như khi đi thi hoặc không, tùy vào mục đích luyện tập của bạn, nhưng nhất định không nộp bài đã qua chỉnh sửa AI hoặc bài có máy hỗ trợ viết.</p>
          <p>Mục đích của chấm chữa bài là giúp bạn sửa được vấn đề trước khi đi thi. Vậy nên bạn cần làm thực lực để bộc lộ được hết điểm yếu nhé.</p>
        </div>

        {done ? (
          <div className="rounded-2xl border border-green-200 bg-white p-8 text-center shadow-lg">
            <CheckCircle size={48} className="mx-auto mb-3 text-green-600" />
            <h2 className="font-display text-2xl font-bold text-[#1B2A5C]">Đã nhận bài của bạn!</h2>
            <p className="mt-2 text-gray-600">Mã đơn của bạn: <b className="text-[#1B2A5C]">{done.code}</b></p>
            <p className="mt-2 text-sm text-gray-600">Giáo viên sẽ xem bài và <b>báo giá</b> sớm. Dùng mã đơn + email để <Link href="/tra-cuu-don" className="text-[#1B2A5C] underline">tra cứu đơn</Link> — khi có giá, bạn thanh toán và nhận bài chữa.</p>
            <Link href="/tra-cuu-don" className="mt-5 inline-block rounded-full bg-[#1B2A5C] px-6 py-2.5 font-semibold text-white hover:bg-[#2A3F7A]">Tra cứu đơn ngay</Link>
          </div>
        ) : (
          <div className="rounded-2xl bg-white p-6 shadow-lg">
            <div className="mb-4 flex gap-2">
              <button onClick={() => setGradingType("essay")} className={`flex-1 rounded-lg py-2.5 text-sm font-semibold ${gradingType === "essay" ? "bg-[#1B2A5C] text-white" : "bg-[#F0F2F6] text-[#1B2A5C]"}`}>Writing (bài luận)</button>
              <button onClick={() => setGradingType("speaking")} className={`flex-1 rounded-lg py-2.5 text-sm font-semibold ${gradingType === "speaking" ? "bg-[#1B2A5C] text-white" : "bg-[#F0F2F6] text-[#1B2A5C]"}`}>Speaking (ghi âm)</button>
            </div>
            {gradingType === "essay" ? (
              <div className="mb-3">
                <div className="mb-3"><WritingPromptPicker onUse={useThisPrompt} /></div>
                <label className="block"><span className="mb-1 block text-sm font-bold text-[#1B2A5C]">Bài luận cần chấm</span>
                  <textarea id="essay-input" value={essayText} onChange={(e) => setEssayText(e.target.value)} rows={12} placeholder="Dán toàn bộ bài luận vào đây... (hoặc bấm 'Chọn đề viết' ở trên để lấy đề)" className="w-full rounded-lg border border-silver/40 px-3 py-2 outline-none focus:border-gold" /></label>
                <Link href="/kho-de-viet" className="mt-1 inline-block text-xs text-[#1B2A5C] underline">Xem toàn bộ kho đề →</Link>
              </div>
            ) : (
              <label className="mb-3 block"><span className="mb-1 block text-sm font-bold text-[#1B2A5C]">Link ghi âm/video Speaking</span>
                <input value={speakingLink} onChange={(e) => setSpeakingLink(e.target.value)} placeholder="Link Google Drive / YouTube / SoundCloud..." className="w-full rounded-lg border border-silver/40 px-3 py-2 outline-none focus:border-gold" />
                <span className="mt-1 block text-xs text-gray-500">Đảm bảo link ở chế độ ai có link cũng xem/nghe được.</span></label>
            )}
            <div className="mb-3 grid grid-cols-1 gap-2 sm:grid-cols-3">
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Họ tên" className="rounded-lg border border-silver/40 px-3 py-2 outline-none focus:border-gold" />
              <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="rounded-lg border border-silver/40 px-3 py-2 outline-none focus:border-gold" />
              <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="SĐT (tuỳ chọn)" className="rounded-lg border border-silver/40 px-3 py-2 outline-none focus:border-gold" />
            </div>
            {err && <div className="mb-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{err}</div>}
            <button onClick={submit} disabled={loading} className="w-full rounded-lg bg-[#C9A84C] py-3 font-semibold text-white hover:bg-[#A6882E]">{loading ? <span className="inline-flex items-center gap-2"><Loader2 size={16} className="animate-spin" />Đang gửi...</span> : "Gửi bài & nhận mã đơn"}</button>
          </div>
        )}
      </div>
    </div>
  );
}
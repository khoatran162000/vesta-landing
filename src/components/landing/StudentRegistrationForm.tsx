// FILE: src/components/landing/StudentRegistrationForm.tsx
// Form đăng ký học viên mới — hiện trên Landing Page
// Sau khi đăng ký → hiện thông tin tài khoản + mời làm test

"use client";

import { useState } from "react";
import { Loader2, CheckCircle, Copy, ExternalLink } from "lucide-react";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api";
const STUDENT_PORTAL = process.env.NEXT_PUBLIC_STUDENT_URL || "http://localhost:3002";

const COURSES = [
  { value: "5+", label: "IELTS 5+" },
  { value: "6+", label: "IELTS 6+" },
  { value: "7+", label: "IELTS 7+" },
  { value: "1-1", label: "IELTS 1-1 Phá Tắc Band" },
  { value: "intensive", label: "IELTS Intensive Bứt Phá" },
  { value: "writing", label: "Viết / Nói — Phá Tắc Band" },
  { value: "pronunciation", label: "Phát Âm Cơ Bản" },
];

interface AccountInfo {
  fullName: string;
  email: string;
  phone: string;
  studentCode: string;
  password: string;
}

export function StudentRegistrationForm() {
  const [step, setStep] = useState<"form" | "success">("form");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [account, setAccount] = useState<AccountInfo | null>(null);
  const [copied, setCopied] = useState(false);

  // Form fields
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [cccd, setCccd] = useState("");
  const [course, setCourse] = useState("");
  const [studyMode, setStudyMode] = useState("OFFLINE");
  const [notes, setNotes] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${API}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: fullName.trim(),
          email: email.trim(),
          phone: phone.trim(),
          cccd: cccd.trim() || undefined,
          course: course || undefined,
          studyMode,
          notes: notes.trim() || undefined,
        }),
      });
      const data = await res.json();

      if (data.success && data.data) {
        setAccount(data.data);
        setStep("success");
      } else {
        setError(data.message || "Đăng ký thất bại. Vui lòng thử lại.");
      }
    } catch {
      setError("Lỗi kết nối. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  }

  function copyAccount() {
    if (!account) return;
    const text = `Tài khoản VESTA UNI\nMã học viên: ${account.studentCode}\nMật khẩu: ${account.password}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  // ═══════ SUCCESS — Hiện thông tin tài khoản ═══════
  if (step === "success" && account) {
    return (
      <div className="mx-auto max-w-[520px] overflow-hidden rounded-2xl border border-silver/20 bg-white shadow-lg">
        {/* Header */}
        <div
          className="px-6 py-8 text-center"
          style={{ background: "linear-gradient(135deg, #0F1B3D, #1B2A5B)" }}
        >
          <CheckCircle size={48} className="mx-auto mb-3 text-green-400" />
          <h3 className="font-display text-2xl font-bold text-white">
            Đăng ký thành công! 🎉
          </h3>
          <p className="mt-2 text-sm text-white/60">
            Chào {account.fullName}, chào mừng bạn đến VESTA UNI
          </p>
        </div>

        <div className="p-6">
          {/* Welcome message */}
          <div className="mb-5 rounded-xl bg-cream p-4 text-[0.85rem] leading-relaxed text-[#1a1a2e]">
            <p>
              Chào <strong>{account.fullName}</strong>, VESTA UNI chào mừng bạn
              đã gia nhập hành trình luyện IELTS nhanh và chắc. 🎯
            </p>
            <p className="mt-2">
              Vui lòng lưu nhớ mã học viên để đăng nhập làm bài kiểm tra trình
              độ và cùng ôn luyện tới đích.
            </p>
          </div>

          {/* Account info cards */}
          <div className="mb-4 rounded-xl border-l-4 border-navy bg-[#f0f2f8] px-5 py-4">
            <p className="mb-1 text-[0.65rem] font-bold uppercase tracking-wider text-muted">
              MÃ HỌC VIÊN (Tên đăng nhập)
            </p>
            <p className="font-mono text-xl font-bold text-navy">
              {account.studentCode}
            </p>
          </div>

          <div className="mb-5 rounded-xl border-l-4 border-gold bg-[#FFF9E6] px-5 py-4">
            <p className="mb-1 text-[0.65rem] font-bold uppercase tracking-wider text-muted">
              MẬT KHẨU
            </p>
            <p className="font-mono text-xl font-bold text-navy">
              {account.password}
            </p>
          </div>

          {/* Copy button */}
          <button
            onClick={copyAccount}
            className="mb-4 flex w-full items-center justify-center gap-2 rounded-lg border border-silver/30 py-2.5 text-sm font-medium text-muted transition-colors hover:bg-cream-dark"
          >
            {copied ? (
              <>
                <CheckCircle size={15} className="text-green-600" />
                <span className="text-green-600">Đã sao chép!</span>
              </>
            ) : (
              <>
                <Copy size={15} />
                Sao chép thông tin tài khoản
              </>
            )}
          </button>

          {/* Warning */}
          <p className="mb-5 text-center text-xs text-crimson">
            ⚠ Vui lòng đổi mật khẩu sau lần đăng nhập đầu tiên
          </p>

          {/* CTA — Go to test */}
          <a
            href={`${STUDENT_PORTAL}/dang-nhap`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:shadow-xl"
            style={{ background: "linear-gradient(135deg, #0F1B3D, #1B2A5B)" }}
          >
            Đăng nhập làm bài kiểm tra trình độ
            <ExternalLink size={15} />
          </a>

          <p className="mt-3 text-center text-xs text-muted">
            Thông tin tài khoản cũng đã được gửi vào email{" "}
            <strong>{account.email}</strong>
          </p>
        </div>
      </div>
    );
  }

  // ═══════ FORM — Đăng ký ═══════
  return (
    <div className="mx-auto max-w-[520px] overflow-hidden rounded-2xl border border-silver/20 bg-white shadow-lg">
      {/* Header */}
      <div
        className="px-6 py-6 text-center"
        style={{ background: "linear-gradient(135deg, #0F1B3D, #1B2A5B)" }}
      >
        <h3 className="font-display text-xl font-bold text-white">
          🎓 Đăng ký học tại VESTA UNI
        </h3>
        <p className="mt-1.5 text-[0.78rem] text-white/50">
          Điền thông tin → Nhận tài khoản ngay → Làm test trình độ
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 p-6">
        {error && (
          <div className="rounded-lg bg-red-50 px-4 py-2.5 text-sm text-crimson">
            {error}
          </div>
        )}

        {/* Họ tên */}
        <div>
          <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-muted">
            Họ và tên <span className="text-crimson">*</span>
          </label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            placeholder="Nguyễn Văn A"
            className="w-full rounded-lg border border-silver/40 px-4 py-2.5 text-sm outline-none focus:border-gold focus:ring-1 focus:ring-gold/30"
          />
        </div>

        {/* Email + Phone */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-muted">
              Email <span className="text-crimson">*</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="email@gmail.com"
              className="w-full rounded-lg border border-silver/40 px-4 py-2.5 text-sm outline-none focus:border-gold focus:ring-1 focus:ring-gold/30"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-muted">
              Số điện thoại <span className="text-crimson">*</span>
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              placeholder="0912345678"
              className="w-full rounded-lg border border-silver/40 px-4 py-2.5 text-sm outline-none focus:border-gold focus:ring-1 focus:ring-gold/30"
            />
          </div>
        </div>

        {/* CCCD */}
        <div>
          <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-muted">
            Số CCCD <span className="text-xs font-normal text-muted">(không bắt buộc)</span>
          </label>
          <input
            type="text"
            value={cccd}
            onChange={(e) => setCccd(e.target.value)}
            placeholder="001234567890"
            className="w-full rounded-lg border border-silver/40 px-4 py-2.5 text-sm outline-none focus:border-gold focus:ring-1 focus:ring-gold/30"
          />
        </div>

        {/* Course + Study mode */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-muted">
              Khoá học quan tâm
            </label>
            <select
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              className="w-full rounded-lg border border-silver/40 bg-white px-4 py-2.5 text-sm outline-none focus:border-gold focus:ring-1 focus:ring-gold/30"
            >
              <option value="">— Chọn khoá —</option>
              {COURSES.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-muted">
              Hình thức học
            </label>
            <div className="flex gap-3 pt-1">
              {["OFFLINE", "ONLINE"].map((mode) => (
                <label
                  key={mode}
                  className={`flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-lg border-2 py-2.5 text-sm font-medium transition-colors ${
                    studyMode === mode
                      ? "border-navy bg-navy/5 text-navy"
                      : "border-silver/30 text-muted hover:border-gold/30"
                  }`}
                >
                  <input
                    type="radio"
                    name="studyMode"
                    value={mode}
                    checked={studyMode === mode}
                    onChange={() => setStudyMode(mode)}
                    className="hidden"
                  />
                  {mode === "OFFLINE" ? "🏫 Offline" : "💻 Online"}
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-muted">
            Ghi chú thêm{" "}
            <span className="text-xs font-normal text-muted">
              (không bắt buộc)
            </span>
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={2}
            placeholder="VD: Em muốn học buổi tối, hoặc em có voucher 800K..."
            className="w-full resize-none rounded-lg border border-silver/40 px-4 py-2.5 text-sm outline-none focus:border-gold focus:ring-1 focus:ring-gold/30"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:shadow-xl disabled:opacity-60"
          style={{ background: "linear-gradient(135deg, #C9A84C, #E8D48B)" }}
        >
          {loading ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Đang đăng ký...
            </>
          ) : (
            <>🎯 Đăng ký & Nhận tài khoản ngay</>
          )}
        </button>

        <p className="text-center text-[0.7rem] text-muted">
          Sau khi đăng ký, bạn sẽ nhận tài khoản để đăng nhập làm bài kiểm tra
          trình độ miễn phí
        </p>
      </form>
    </div>
  );
}
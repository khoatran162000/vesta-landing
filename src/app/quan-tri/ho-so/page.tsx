/**
 * FILE: page.tsx
 * PATH: apps/landing/src/app/quan-tri/ho-so/page.tsx
 * MÔ TẢ: Cập nhật hồ sơ cá nhân + đổi mật khẩu — /quan-tri/ho-so
 */

"use client";

import { useState } from "react";
import { Save, Camera } from "lucide-react";

export default function ProfilePage() {
  const [fullName, setFullName] = useState("Nguyễn Văn A");
  const [email] = useState("marketing@vestauni.vn");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleUpdateProfile() {
    setSaving(true);
    try { alert("API chưa sẵn sàng."); } finally { setSaving(false); }
  }

  async function handleChangePassword() {
    if (!currentPassword || !newPassword) return;
    alert("API chưa sẵn sàng.");
  }

  return (
    <div className="mx-auto max-w-[640px]">
      <h2 className="mb-8 font-display text-2xl font-bold text-royal">Hồ sơ cá nhân</h2>

      <div className="space-y-8 rounded-xl border border-silver/30 bg-white p-6">
        <div className="flex items-center gap-5">
          <div className="relative">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-royal/10 font-display text-2xl font-bold text-royal">{fullName.charAt(0)}</div>
            <button className="absolute -bottom-1 -right-1 rounded-full border-2 border-white bg-gold p-1.5 text-navy transition-transform hover:scale-110"><Camera size={12} /></button>
          </div>
          <div>
            <p className="text-lg font-semibold text-royal">{fullName}</p>
            <p className="text-sm text-muted">{email}</p>
          </div>
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-royal">Họ và tên</label>
          <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)}
            className="w-full rounded-lg border border-silver/40 bg-cream px-4 py-2.5 text-sm outline-none transition-colors focus:border-gold focus:ring-1 focus:ring-gold/30" />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-royal">Email</label>
          <input type="email" value={email} disabled className="w-full rounded-lg border border-silver/20 bg-cream-dark px-4 py-2.5 text-sm text-muted" />
          <p className="mt-1 text-xs text-muted">Email không thể thay đổi. Liên hệ Admin nếu cần.</p>
        </div>
        <button onClick={handleUpdateProfile} disabled={saving} className="cta-btn gap-1.5 text-sm disabled:opacity-60">
          <Save size={16} />{saving ? "Đang lưu..." : "Cập nhật hồ sơ"}
        </button>
      </div>

      <div className="mt-8 space-y-5 rounded-xl border border-silver/30 bg-white p-6">
        <h3 className="font-display text-lg font-bold text-royal">Đổi mật khẩu</h3>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-royal">Mật khẩu hiện tại</label>
          <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} placeholder="••••••••"
            className="w-full rounded-lg border border-silver/40 bg-cream px-4 py-2.5 text-sm outline-none transition-colors focus:border-gold focus:ring-1 focus:ring-gold/30" />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-royal">Mật khẩu mới</label>
          <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="••••••••"
            className="w-full rounded-lg border border-silver/40 bg-cream px-4 py-2.5 text-sm outline-none transition-colors focus:border-gold focus:ring-1 focus:ring-gold/30" />
        </div>
        <button onClick={handleChangePassword} disabled={!currentPassword || !newPassword}
          className="rounded-lg border border-royal/20 bg-royal/5 px-5 py-2.5 text-sm font-semibold text-royal transition-colors hover:bg-royal/10 disabled:opacity-50">
          Đổi mật khẩu
        </button>
      </div>
    </div>
  );
}

/**
 * FILE: page.tsx
 * PATH: apps/landing/src/app/quan-tri/ho-so/page.tsx
 * MÔ TẢ: Hồ sơ cá nhân — load dữ liệu thật từ API, cập nhật profile + đổi mật khẩu
 */

"use client";

import { useState, useEffect } from "react";
import { Save, Camera, Loader2 } from "lucide-react";

interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  role: string;
  avatarUrl: string | null;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

function getToken() {
  return localStorage.getItem("accessToken") || "";
}

export default function ProfilePage() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [fullName, setFullName] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);
  const [profileMsg, setProfileMsg] = useState("");
  const [passwordMsg, setPasswordMsg] = useState("");

  // Fetch user data từ API
  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await fetch(`${API_URL}/auth/me`, {
          headers: { Authorization: `Bearer ${getToken()}` },
        });
        const data = await res.json();
        if (data.success) {
          setUser(data.data);
          setFullName(data.data.fullName);
        }
      } catch {
        // AuthGuard sẽ xử lý redirect
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, []);

  // Upload avatar
  async function handleAvatarUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setProfileMsg("");
    const formData = new FormData();
    formData.append("avatar", file);
    formData.append("fullName", fullName);

    try {
      const res = await fetch(`${API_URL}/auth/profile`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${getToken()}` },
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setUser(data.data);
        setProfileMsg("✅ Cập nhật avatar thành công!");
      } else {
        setProfileMsg(`❌ ${data.message}`);
      }
    } catch {
      setProfileMsg("❌ Lỗi upload avatar");
    }
    e.target.value = "";
  }

  // Cập nhật hồ sơ
  async function handleUpdateProfile() {
    setSavingProfile(true);
    setProfileMsg("");
    try {
      const res = await fetch(`${API_URL}/auth/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({ fullName }),
      });
      const data = await res.json();
      if (data.success) {
        setUser(data.data);
        setProfileMsg("✅ Cập nhật hồ sơ thành công!");
      } else {
        setProfileMsg(`❌ ${data.message}`);
      }
    } catch {
      setProfileMsg("❌ Lỗi kết nối server");
    } finally {
      setSavingProfile(false);
    }
  }

  // Đổi mật khẩu
  async function handleChangePassword() {
    if (!currentPassword || !newPassword) return;
    if (newPassword.length < 6) {
      setPasswordMsg("❌ Mật khẩu mới phải có ít nhất 6 ký tự");
      return;
    }
    setSavingPassword(true);
    setPasswordMsg("");
    try {
      const res = await fetch(`${API_URL}/auth/change-password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = await res.json();
      if (data.success) {
        setPasswordMsg("✅ Đổi mật khẩu thành công!");
        setCurrentPassword("");
        setNewPassword("");
      } else {
        setPasswordMsg(`❌ ${data.message}`);
      }
    } catch {
      setPasswordMsg("❌ Lỗi kết nối server");
    } finally {
      setSavingPassword(false);
    }
  }

  // Role label tiếng Việt
  function getRoleLabel(role: string) {
    const map: Record<string, string> = {
      ADMIN: "Quản trị viên",
      CONTENT_CREATOR: "Marketing",
      TEACHER: "Giáo viên",
      STUDENT: "Học viên",
    };
    return map[role] || role;
  }

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Loader2 size={24} className="animate-spin text-gold" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="mx-auto max-w-[640px]">
      <h2 className="mb-8 font-display text-2xl font-bold text-royal">Hồ sơ cá nhân</h2>

      {/* Avatar + Info */}
      <div className="space-y-8 rounded-xl border border-silver/30 bg-white p-6">
        <div className="flex items-center gap-5">
          <div className="relative">
            {user.avatarUrl ? (
              <img src={user.avatarUrl.startsWith("http") ? user.avatarUrl : `${API_URL?.replace("/api", "")}${user.avatarUrl}`} alt={user.fullName}
                className="h-20 w-20 rounded-full object-cover" />
            ) : (
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-royal/10 font-display text-2xl font-bold text-royal">
                {user.fullName.charAt(0)}
              </div>
            )}
            <button
              onClick={() => document.getElementById("avatar-input")?.click()}
              className="absolute -bottom-1 -right-1 rounded-full border-2 border-white bg-gold p-1.5 text-navy transition-transform hover:scale-110"
            >
              <Camera size={12} />
            </button>
            <input
              id="avatar-input"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarUpload}
            />
          </div>
          <div>
            <p className="text-lg font-semibold text-royal">{user.fullName}</p>
            <p className="text-sm text-muted">{user.email}</p>
            <span className="mt-1 inline-block rounded-full bg-gold/15 px-3 py-0.5 text-xs font-semibold text-gold">
              {getRoleLabel(user.role)}
            </span>
          </div>
        </div>

        {/* Cập nhật tên */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-royal">Họ và tên</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full rounded-lg border border-silver/40 bg-cream px-4 py-2.5 text-sm outline-none transition-colors focus:border-gold focus:ring-1 focus:ring-gold/30"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-royal">Email</label>
          <input
            type="email"
            value={user.email}
            disabled
            className="w-full rounded-lg border border-silver/20 bg-cream-dark px-4 py-2.5 text-sm text-muted"
          />
          <p className="mt-1 text-xs text-muted">Email không thể thay đổi. Liên hệ Admin nếu cần.</p>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-royal">Vai trò</label>
          <input
            type="text"
            value={getRoleLabel(user.role)}
            disabled
            className="w-full rounded-lg border border-silver/20 bg-cream-dark px-4 py-2.5 text-sm text-muted"
          />
        </div>

        {profileMsg && (
          <p className={`rounded-lg px-4 py-2.5 text-sm ${profileMsg.startsWith("✅") ? "bg-green-50 text-green-700" : "bg-red-50 text-red-600"}`}>
            {profileMsg}
          </p>
        )}

        <button
          onClick={handleUpdateProfile}
          disabled={savingProfile || fullName === user.fullName}
          className="cta-btn gap-1.5 text-sm disabled:opacity-60"
        >
          <Save size={16} />
          {savingProfile ? "Đang lưu..." : "Cập nhật hồ sơ"}
        </button>
      </div>

      {/* Đổi mật khẩu */}
      <div className="mt-8 space-y-5 rounded-xl border border-silver/30 bg-white p-6">
        <h3 className="font-display text-lg font-bold text-royal">Đổi mật khẩu</h3>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-royal">Mật khẩu hiện tại</label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full rounded-lg border border-silver/40 bg-cream px-4 py-2.5 text-sm outline-none transition-colors focus:border-gold focus:ring-1 focus:ring-gold/30"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-royal">Mật khẩu mới</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full rounded-lg border border-silver/40 bg-cream px-4 py-2.5 text-sm outline-none transition-colors focus:border-gold focus:ring-1 focus:ring-gold/30"
          />
          <p className="mt-1 text-xs text-muted">Tối thiểu 6 ký tự</p>
        </div>

        {passwordMsg && (
          <p className={`rounded-lg px-4 py-2.5 text-sm ${passwordMsg.startsWith("✅") ? "bg-green-50 text-green-700" : "bg-red-50 text-red-600"}`}>
            {passwordMsg}
          </p>
        )}

        <button
          onClick={handleChangePassword}
          disabled={savingPassword || !currentPassword || !newPassword}
          className="rounded-lg border border-royal/20 bg-royal/5 px-5 py-2.5 text-sm font-semibold text-royal transition-colors hover:bg-royal/10 disabled:opacity-50"
        >
          {savingPassword ? "Đang xử lý..." : "Đổi mật khẩu"}
        </button>
      </div>
    </div>
  );
}
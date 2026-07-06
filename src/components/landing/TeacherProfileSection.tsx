// FILE: src/components/landing/TeacherProfileSection.tsx — Profile giáo viên (fetch động từ API)
"use client";
import { useEffect, useState } from "react";
import {
  Presentation, Landmark, GraduationCap, Users, Scale,
  Briefcase, BookOpen, Star, Target, Award,
} from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
function resolveUrl(url?: string | null): string {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  return `${(API_URL || "").replace(/\/api\/?$/, "")}${url}`;
}

// Map icon key (admin lưu) → component lucide
const ICON_MAP: Record<string, any> = {
  podium: Presentation,
  landmark: Landmark,
  cap: GraduationCap,
  users: Users,
  scale: Scale,
  briefcase: Briefcase,
  book: BookOpen,
  star: Star,
  target: Target,
  award: Award,
};

interface Badge { num: string; label: string; }
interface Credential { icon: string; text: string; }
interface Teacher {
  id: string;
  name: string;
  ma?: string | null;
  subtitle: string;
  photoUrl?: string | null;
  badges: Badge[];
  credentials: Credential[];
}

export function TeacherProfileSection() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch(`${API_URL}/teachers`)
      .then((r) => r.json())
      .then((json) => {
        if (json?.success && Array.isArray(json.data)) setTeachers(json.data);
      })
      .catch(() => {})
      .finally(() => setLoaded(true));
  }, []);

  // Chưa load xong hoặc không có GV nào → không render section (tránh nhấp nháy / khoảng trống)
  if (!loaded || teachers.length === 0) return null;

  return (
    <div className="mx-auto max-w-[960px] px-6" id="teacher">
      <ScrollReveal>
        <div className="pb-10 pt-[60px]">
          <div className="mb-2 flex items-center gap-3">
            <span className="text-xl">🚩</span>
            <h3 className="font-display text-[2rem] font-bold text-royal">Đội Ngũ Giáo Viên</h3>
          </div>
          <div className="h-[2px] w-full" style={{ background: "linear-gradient(90deg, #C9A84C, #E8D48B)" }} />
        </div>
      </ScrollReveal>

      <div className="space-y-8 pb-8">
        {teachers.map((t, i) => (
          <ScrollReveal key={t.id} delay={i * 0.05}>
            <TeacherCard teacher={t} />
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}

function TeacherCard({ teacher }: { teacher: Teacher }) {
  const badges = Array.isArray(teacher.badges) ? teacher.badges : [];
  const credentials = Array.isArray(teacher.credentials) ? teacher.credentials : [];
  const photo = resolveUrl(teacher.photoUrl);

  return (
    <div className="overflow-hidden rounded-2xl border border-silver/30 bg-white shadow-[0_2px_20px_rgba(15,27,61,0.06)]">
      {/* Header navy + tên */}
      <div className="relative px-6 py-5 text-center" style={{ background: "linear-gradient(135deg, #0F1B3D, #1B2A5B)" }}>
        <h4 className="font-display text-[2.1rem] font-bold leading-tight text-white">
          <span className="text-gold-light">IELTS</span> {teacher.name}
          {teacher.ma && <span className="text-[1.3rem] text-silver"> {teacher.ma}</span>}
        </h4>
        <p className="mt-1.5 text-[0.9rem] italic text-silver">{teacher.subtitle}</p>
        <div className="mt-2 tracking-[0.5em] text-[0.85rem] text-gold">★ ★ ★</div>
        <div className="absolute inset-x-0 bottom-0 h-[2px]" style={{ background: "linear-gradient(90deg, #C9A84C, #E8D48B, #C9A84C)" }} />
      </div>

      {/* Body 2 cột */}
      <div className="grid grid-cols-1 gap-5 px-6 py-6 md:grid-cols-[290px_1fr]">
        {/* Cột trái: ảnh + badge */}
        <div className="mx-auto flex w-full max-w-[290px] flex-col">
          <div
            className="relative flex aspect-[3/3.3] w-full items-end justify-center overflow-hidden rounded-xl border border-silver/40"
            style={{ background: "radial-gradient(circle at 50% 38%, #fff 0%, #F0EDE5 100%)" }}
          >
            {/* Logo mờ nền */}
            <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[58%] text-center" style={{ color: "rgba(201,168,76,0.26)" }}>
              <div className="text-[2.2rem] leading-none">🔥</div>
              <div className="font-display text-[1.9rem] font-bold leading-none tracking-[5px]">VESTA</div>
              <div className="mt-1 text-[0.58rem] tracking-[3px]">SINCE 2013</div>
            </div>
            {photo ? (
              <img src={photo} alt={teacher.name} className="relative z-10 h-full w-full object-contain object-bottom" />
            ) : (
              <div className="relative z-10 pb-4 text-center text-[0.78rem] leading-tight text-muted">
                <span className="mb-1.5 block text-[2rem] opacity-45">📷</span>
                Ảnh chân dung<br />{teacher.name}
              </div>
            )}
          </div>

          {/* Badge số */}
          {badges.length > 0 && (
            <div className="mt-3.5 grid grid-cols-3 gap-2">
              {badges.map((b, i) => (
                <div key={i} className="rounded-[10px] border border-gold/40 bg-cream px-1 pb-1.5 pt-2.5 text-center">
                  <div className="font-display text-[1.55rem] font-bold leading-none text-royal">{b.num}</div>
                  <div className="mt-1.5 text-[0.5rem] font-bold uppercase tracking-wide text-gold">{b.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Cột phải: thành tích */}
        <div className="flex flex-col">
          {credentials.map((c, i) => {
            const Icon = ICON_MAP[c.icon] || Star;
            const isLast = i === credentials.length - 1;
            return (
              <div key={i} className={`flex items-start gap-3 py-2 ${isLast ? "" : "border-b border-dashed border-royal/10"}`}>
                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-gold-light"
                  style={{ background: "linear-gradient(135deg, #0F1B3D, #1B2A5B)" }}
                >
                  <Icon size={16} />
                </span>
                <span className="pt-0.5 text-[0.85rem] leading-[1.55] text-[#1a1a2e]">{c.text}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Dải chân slogan */}
      <div
        className="px-4 py-2.5 text-center font-display text-[1.05rem] font-bold tracking-wide text-gold"
        style={{ background: "linear-gradient(135deg, #0F1B3D, #1B2A5B)" }}
      >
        <span className="text-gold-light">★</span> Học Nhanh - Thi Chắc - Phá Tắc Band <span className="text-gold-light">★</span>
      </div>
    </div>
  );
}
// FILE: src/app/bai-tap-tuong-tac/page.tsx — Khách làm bài tập PUBLIC (không cần login)
"use client";
import { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";
import { Target, Play, Loader2, FileQuestion } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const TYPE_LABELS: Record<string, string> = {
  QUIZ: "Trắc nghiệm",
  FILL_BLANK: "Điền chỗ trống",
  MATCHING: "Nối câu",
  VOCAB_CHECK: "Từ vựng",
};

export default function PublicExercisesPage() {
  const [exercises, setExercises] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Gọi không kèm token → backend tự lọc chỉ trả bài PUBLIC + isPublished
    fetch(`${API_URL}/interactive`)
      .then((r) => r.json())
      .then((d) => { if (d.success) setExercises(d.data || []); })
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Header />
      <main className="mx-auto max-w-[960px] px-6 py-12">
        <div className="mb-10 text-center">
          <h2 className="font-display text-[2.2rem] font-bold text-royal">🎯 Bài Tập Tương Tác</h2>
          <p className="mx-auto mt-3 max-w-[520px] text-muted">
            Luyện tập miễn phí các bài Quiz, từ vựng, ngữ pháp. Đăng ký khoá học để mở khoá toàn bộ bài tập theo lộ trình.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20"><Loader2 size={24} className="animate-spin text-gold" /></div>
        ) : exercises.length === 0 ? (
          <div className="rounded-2xl border border-silver/20 bg-white py-16 text-center">
            <FileQuestion size={40} className="mx-auto mb-3 text-silver" />
            <p className="text-sm text-muted">Chưa có bài tập công khai nào. Vui lòng quay lại sau!</p>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {exercises.map((ex) => (
              <div key={ex.id} className="flex flex-col justify-between overflow-hidden rounded-2xl border border-silver/20 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
                <div className="flex items-center gap-3 px-5 py-4" style={{ background: "linear-gradient(135deg, #7c3aeddd, #7c3aed)" }}>
                  <Target size={20} className="text-white" />
                  <span className="rounded-full bg-white/20 px-2 py-0.5 text-[0.65rem] font-bold text-white">
                    {TYPE_LABELS[ex.type] || ex.type}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-bold text-[#1a1a2e]">{ex.title}</h3>
                  {ex.description && <p className="mt-1 text-xs text-muted line-clamp-2">{ex.description}</p>}
                  <p className="mt-2 text-xs text-muted">{ex.questionCount || 0} câu hỏi</p>
                  <Link href={`/bai-tap-tuong-tac/${ex.id}`} className="mt-4 flex items-center justify-center gap-1.5 rounded-lg py-2.5 text-sm font-bold text-white" style={{ background: "linear-gradient(135deg, #0F1B3D, #1B2A5B)" }}>
                    <Play size={14} />Làm thử
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-10 rounded-2xl border border-gold/30 bg-gradient-to-br from-cream to-cream-dark p-6 text-center">
          <h3 className="font-display text-xl font-bold text-royal">Muốn luyện tập theo lộ trình bài bản?</h3>
          <p className="mt-2 text-sm text-muted">Đăng ký khoá học để mở khoá toàn bộ bài tập + theo dõi tiến độ + chấm chữa từ giáo viên.</p>
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            <Link href="/dat-lich-tu-van" className="rounded-full bg-royal px-6 py-2.5 text-sm font-bold text-white hover:bg-royal-mid">📅 Đặt lịch tư vấn</Link>
            <Link href="/dang-ky" className="rounded-full border border-gold/40 bg-gold/10 px-6 py-2.5 text-sm font-bold text-royal hover:bg-gold/20">✍️ Đăng ký ngay</Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

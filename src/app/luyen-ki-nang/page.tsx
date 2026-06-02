// FILE: src/app/luyen-ki-nang/page.tsx — 6 kĩ năng
"use client";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";
import { Lock, ArrowRight } from "lucide-react";

const SKILLS = [
  { slug: "doc", label: "Đọc (Reading)", icon: "📖", color: "#2563eb", desc: "Luyện kĩ thuật đọc hiểu, tìm thông tin, T/F/NG, Matching Headings, Summary Completion." },
  { slug: "nghe", label: "Nghe (Listening)", icon: "🎧", color: "#7c3aed", desc: "Luyện nghe Section 1-4, note completion, multiple choice, map labelling." },
  { slug: "viet", label: "Viết (Writing)", icon: "✏️", color: "#C9A84C", desc: "Luyện viết Task 1 (Line, Bar, Pie, Map, Process) và Task 2 (Opinion, Discussion, Account)." },
  { slug: "noi", label: "Nói (Speaking)", icon: "🎤", color: "#C93040", desc: "Luyện nói Part 1 (trả lời ngắn), Part 2 (monologue 2 phút), Part 3 (thảo luận sâu)." },
  { slug: "tu-vung", label: "Từ Vựng (Vocabulary)", icon: "📚", color: "#059669", desc: "Học từ vựng theo 10 chủ điểm IELTS, collocations, academic word list, paraphrasing." },
  { slug: "ngu-phap", label: "Ngữ Pháp (Grammar)", icon: "📐", color: "#d97706", desc: "Ôn ngữ pháp viết: câu phức, mệnh đề quan hệ, bị động, điều kiện, so sánh." },
];

export default function PracticeSkillsPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-[960px] px-6 py-12">
        <div className="mb-10 text-center">
          <h2 className="font-display text-[2.2rem] font-bold text-royal">📚 Luyện Kĩ Năng</h2>
          <p className="mx-auto mt-3 max-w-[520px] text-muted">
            Chọn kĩ năng muốn luyện. Đăng ký khoá học hoặc mua giáo trình để truy cập toàn bộ bài luyện.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SKILLS.map((skill) => (
            <Link key={skill.slug} href={`/luyen-ki-nang/${skill.slug}`}
              className="group overflow-hidden rounded-2xl border border-silver/20 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
              <div className="flex items-center gap-3 px-6 py-4" style={{ background: `linear-gradient(135deg, ${skill.color}dd, ${skill.color})` }}>
                <span className="text-2xl">{skill.icon}</span>
                <h3 className="font-display text-lg font-bold text-white">{skill.label}</h3>
              </div>
              <div className="p-5">
                <p className="mb-4 text-[0.85rem] leading-relaxed text-muted">{skill.desc}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-amber-600">
                    <Lock size={13} />
                    Cần đăng ký
                  </div>
                  <span className="flex items-center gap-1 text-xs font-semibold opacity-0 transition-opacity group-hover:opacity-100" style={{ color: skill.color }}>
                    Xem chi tiết <ArrowRight size={12} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
// FILE: src/app/luyen-ki-nang/[skill]/page.tsx — Chi tiết từng kĩ năng
"use client";
import { useParams } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";
import { Lock, BookOpen, ArrowLeft, ArrowRight } from "lucide-react";

const SKILL_MAP: Record<string, {
  label: string;
  icon: string;
  color: string;
  intro: string;
  levels: { name: string; topics: string[] }[];
}> = {
  doc: {
    label: "Đọc (Reading)",
    icon: "📖",
    color: "#2563eb",
    intro: "Luyện kĩ thuật đọc hiểu IELTS Reading — từ skimming/scanning cơ bản đến các dạng câu hỏi nâng cao theo từng band.",
    levels: [
      { name: "Band 5+", topics: ["T/F/NG cơ bản", "Matching Information", "Sentence Completion", "Summary Completion", "Short Answer"] },
      { name: "Band 6+", topics: ["Matching Headings", "Multiple Choice", "List of Headings", "Paragraph matching", "Flow-chart"] },
      { name: "Band 7+", topics: ["Complex T/F/NG", "Matching Features", "Summary with word list", "Skimming & Scanning nâng cao", "Timed Reading"] },
      { name: "Đề thi thử", topics: ["Full Reading Test 1-5", "Academic Reading", "General Reading", "Timed 60 phút"] },
    ],
  },
  nghe: {
    label: "Nghe (Listening)",
    icon: "🎧",
    color: "#7c3aed",
    intro: "Luyện nghe IELTS Listening đủ 4 section, từ form completion cơ bản đến academic lecture phức tạp.",
    levels: [
      { name: "Band 5+", topics: ["Section 1: Form/Note Completion", "Section 2: Map/Plan Labelling", "Multiple Choice cơ bản", "Matching"] },
      { name: "Band 6+", topics: ["Section 3: Discussion", "Section 4: Lecture", "Sentence Completion", "Table Completion"] },
      { name: "Band 7+", topics: ["Dictation nâng cao", "Connected speech", "Accent training", "Speed listening"] },
      { name: "Đề thi thử", topics: ["Full Listening Test 1-5", "Timed 30 phút", "Answer sheet practice"] },
    ],
  },
  viet: {
    label: "Viết (Writing)",
    icon: "✏️",
    color: "#C9A84C",
    intro: "Phương pháp viết Task 1 & Task 2 theo academic style, đảm bảo coherence và band 7+ về task achievement.",
    levels: [
      { name: "Band 5+", topics: ["Task 1: Line Graph", "Task 1: Bar Chart", "Task 2: Introduction", "Task 2: Body paragraph cơ bản"] },
      { name: "Band 6+", topics: ["Task 1: Pie Chart + Table", "Task 1: Map + Process", "Task 2: Argumentative", "Task 2: Discussion"] },
      { name: "Band 7+", topics: ["Task 2: Account", "Task 2: Mixed question", "Coherence & Cohesion nâng cao", "Academic style"] },
      { name: "Đề thi thử", topics: ["Full Writing Test 1-5", "Task 1 + Task 2 (60 phút)", "Peer review"] },
    ],
  },
  noi: {
    label: "Nói (Speaking)",
    icon: "🎤",
    color: "#C93040",
    intro: "Luyện nói IELTS Speaking 3 phần — từ template cơ bản đến abstract discussion ở Part 3.",
    levels: [
      { name: "Band 5+", topics: ["Part 1: Câu hỏi thường gặp", "Template: I'm the kind of person who", "Pronunciation cơ bản"] },
      { name: "Band 6+", topics: ["Part 1: It depends", "Part 2: Describing people", "Part 2: Describing places", "Connected speech"] },
      { name: "Band 7+", topics: ["Part 2: Abstract topics", "Part 3: Discussion sâu", "Idiomatic expressions", "Fluency drill"] },
      { name: "Đề thi thử", topics: ["Full Speaking Test 1-5", "Video recording", "Self-assessment"] },
    ],
  },
  "tu-vung": {
    label: "Từ Vựng (Vocabulary)",
    icon: "📚",
    color: "#059669",
    intro: "Học từ vựng IELTS theo 10 chủ điểm chính, kết hợp Academic Word List và collocations cấp độ.",
    levels: [
      { name: "A2-B1", topics: ["500 từ cơ bản", "Daily life vocabulary", "Collocations cơ bản", "Word families"] },
      { name: "B2", topics: ["Academic Word List", "Topic: Environment", "Topic: Education", "Topic: Technology"] },
      { name: "C1", topics: ["Advanced collocations", "Paraphrasing", "Topic: Society", "Topic: Health & Science"] },
      { name: "Tổng ôn", topics: ["Flashcard 3000 từ", "Vocab in context", "Word formation", "Synonym/Antonym"] },
    ],
  },
  "ngu-phap": {
    label: "Ngữ Pháp (Grammar)",
    icon: "📐",
    color: "#d97706",
    intro: "Ôn ngữ pháp cốt lõi cho IELTS Writing — câu phức, mệnh đề, inversion và các cấu trúc band 7+.",
    levels: [
      { name: "Cơ bản", topics: ["Thì hiện tại/quá khứ/tương lai", "Câu bị động", "Câu so sánh", "Mạo từ a/an/the"] },
      { name: "Trung cấp", topics: ["Mệnh đề quan hệ", "Câu điều kiện", "Reported speech", "Câu phức (complex sentence)"] },
      { name: "Nâng cao", topics: ["Inversion", "Cleft sentence", "Participle clause", "Nominal clause"] },
      { name: "Luyện đề", topics: ["Grammar in Writing Task 2", "Error correction", "Sentence transformation", "Timed quiz"] },
    ],
  },
};

export default function SkillDetailPage() {
  const params = useParams();
  const skill = params.skill as string;
  const data = SKILL_MAP[skill];

  if (!data) {
    return (
      <>
        <Header />
        <main className="mx-auto max-w-[700px] py-20 text-center">
          <p className="text-muted">Không tìm thấy kĩ năng này.</p>
          <Link href="/luyen-ki-nang" className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-gold hover:underline">
            <ArrowLeft size={14} />Quay lại danh sách
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="mx-auto max-w-[960px] px-6 py-12">
        <Link href="/luyen-ki-nang" className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted hover:text-royal">
          <ArrowLeft size={15} />Quay lại danh sách kĩ năng
        </Link>

        <div className="mb-8 flex items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-3xl" style={{ background: `${data.color}15` }}>
            {data.icon}
          </div>
          <div>
            <h2 className="font-display text-[2rem] font-bold text-royal">{data.label}</h2>
            <p className="mt-2 text-[0.9rem] leading-relaxed text-muted">{data.intro}</p>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {data.levels.map((level) => (
            <div key={level.name} className="overflow-hidden rounded-2xl border border-silver/20 bg-white shadow-sm">
              <div className="flex items-center justify-between px-5 py-3" style={{ background: `linear-gradient(135deg, ${data.color}dd, ${data.color})` }}>
                <h3 className="font-display text-lg font-bold text-white">{level.name}</h3>
                <span className="rounded-full bg-white/20 px-3 py-1 text-[0.65rem] font-bold text-white">{level.topics.length} bài</span>
              </div>
              <div className="p-5">
                <ul className="mb-4 space-y-1.5">
                  {level.topics.map((t, i) => (
                    <li key={i} className="flex items-center gap-2 text-[0.85rem] text-[#1a1a2e]">
                      <BookOpen size={13} className="shrink-0 text-muted" />{t}
                    </li>
                  ))}
                </ul>
                <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-2.5 text-center">
                  <Lock size={16} className="mx-auto mb-1 text-amber-600" />
                  <p className="text-xs font-medium text-amber-800">Đăng ký khoá học để luyện tập</p>
                  <Link href="/dang-ky" className="mt-2 inline-flex items-center gap-1 rounded-full px-4 py-1.5 text-[0.7rem] font-bold text-white" style={{ background: data.color }}>
                    Đăng ký <ArrowRight size={10} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA bottom */}
        <div className="mt-10 rounded-2xl border border-gold/30 bg-gradient-to-br from-cream to-cream-dark p-6 text-center">
          <h3 className="font-display text-xl font-bold text-royal">Sẵn sàng bắt đầu?</h3>
          <p className="mt-2 text-sm text-muted">Liên hệ giáo viên để được tư vấn lộ trình phù hợp với trình độ.</p>
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            <Link href="/dat-lich-tu-van" className="rounded-full bg-royal px-6 py-2.5 text-sm font-bold text-white hover:bg-royal-mid">
              📅 Đặt lịch tư vấn
            </Link>
            <Link href="/dang-ky" className="rounded-full border border-gold/40 bg-gold/10 px-6 py-2.5 text-sm font-bold text-royal hover:bg-gold/20">
              ✍️ Đăng ký ngay
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
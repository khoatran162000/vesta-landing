// FILE: src/components/landing/TeacherProfileSection.tsx — Profile giáo viên (poster card, nhiều GV)
import {
  Presentation, Landmark, GraduationCap, Users, Scale,
  Briefcase, BookOpen, Star, Target, Award,
} from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";

// Map loại icon → component lucide (sau này admin chọn từ danh sách key này)
const ICON_MAP = {
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
} as const;

type IconKey = keyof typeof ICON_MAP;

interface Credential {
  icon: IconKey;
  text: string;
}
interface Badge {
  num: string;
  label: string;
}
interface Teacher {
  name: string;        // phần tên sau chữ "IELTS"
  ma?: string;         // hậu tố học vị, vd "(M.A.)"
  subtitle: string;
  photoLabel: string;  // nhãn placeholder ảnh
  badges: Badge[];
  credentials: Credential[];
}

const TEACHERS: Teacher[] = [
  {
    name: "Ms. Ly Le",
    ma: "(M.A.)",
    subtitle: "Dạy cả online và offline các trình độ, Chuyên Phá Tắc Band",
    photoLabel: "Ms. Ly Le",
    badges: [
      { num: "16", label: "Năm KN" },
      { num: "8.5", label: "IELTS" },
      { num: "9.0", label: "Speaking" },
    ],
    credentials: [
      { icon: "podium", text: "Cựu giám khảo hội thi nói Cambridge, hệ KET, PET" },
      { icon: "landmark", text: "Cựu giảng viên ĐHNN - ĐHQGHN (ULIS), cựu giáo viên Hà Nội - Amsterdam và Greenfield School, hệ Cambridge" },
      { icon: "cap", text: "Cựu học sinh chuyên Anh Hà Nội - Amsterdam và cựu sinh viên lớp Chất lượng cao, Đại học Ngoại ngữ - ĐHQGHN" },
      { icon: "users", text: "Kinh nghiệm giảng dạy 16 năm, chuyên IELTS, huấn luyện đội tuyển tiếng Anh quốc gia HN - Amsterdam kỹ năng Viết, Nói" },
      { icon: "scale", text: "Thạc sĩ ngành Lý luận giảng dạy (Victoria University, Úc)" },
      { icon: "briefcase", text: "Thạc sĩ ngành Quản trị kinh doanh quốc tế (Derby University, Anh)" },
      { icon: "book", text: 'Đồng tác giả cuốn "Bài luận mẫu tiếng Anh cho học sinh chuyên" và "...cho học sinh THPT 3 miền"' },
      { icon: "star", text: "Điểm IELTS Tổng: 8.5 (2021), Nói: 9.0 (2017), kinh nghiệm thi cả trên máy và trên giấy" },
      { icon: "target", text: "Chấm Nói, Viết sát tay, dự đoán đề chuẩn, học sinh điểm cao" },
    ],
  },
  {
    name: "Mr. Nguyễn Đức Anh",
    subtitle: "Dạy cả online và offline các trình độ, Chuyên Phá Tắc Band",
    photoLabel: "Mr. Nguyễn Đức Anh",
    badges: [
      { num: "7", label: "Năm KN" },
      { num: "7.5", label: "IELTS" },
      { num: "8.5", label: "Reading" },
    ],
    credentials: [
      { icon: "podium", text: "Cử nhân Xuất Sắc chuyên ngành sư phạm Tiếng Anh, Đại học Ngoại Ngữ, ĐHQGHN (ULIS)" },
      { icon: "star", text: "IELTS 7.5 (Overall) — 8.5 Reading | 7.0 Speaking | 7.0 Writing" },
      { icon: "briefcase", text: "Có 7 năm kinh nghiệm luyện thi IELTS, Tiếng Anh chuyên các cấp" },
      { icon: "cap", text: "Chuyên giảng dạy các kỹ năng: Reading, Listening, Speaking từ cơ bản đến nâng cao" },
      { icon: "users", text: "Kinh nghiệm hướng dẫn học sinh, sinh viên đạt band cao, cải thiện điểm số vượt bậc" },
      { icon: "target", text: "Phương pháp giảng dạy khoa học, dễ hiểu, cá nhân hóa theo từng học viên" },
      { icon: "book", text: "Cập nhật kiến thức và đề thi mới nhất, bám sát xu hướng ra đề IELTS" },
      { icon: "award", text: "Truyền cảm hứng, tạo động lực, giúp học viên tự tin chinh phục mục tiêu" },
    ],
  },
];

export function TeacherProfileSection() {
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
        {TEACHERS.map((t, i) => (
          <ScrollReveal key={i} delay={i * 0.05}>
            <TeacherCard teacher={t} />
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}

function TeacherCard({ teacher }: { teacher: Teacher }) {
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
            {/* Placeholder ảnh — thay bằng <img> khi có ảnh tách nền */}
            <div className="relative z-10 pb-4 text-center text-[0.78rem] leading-tight text-muted">
              <span className="mb-1.5 block text-[2rem] opacity-45">📷</span>
              Ảnh chân dung<br />{teacher.photoLabel}
            </div>
          </div>

          {/* 3 badge số */}
          <div className="mt-3.5 grid grid-cols-3 gap-2">
            {teacher.badges.map((b, i) => (
              <div key={i} className="rounded-[10px] border border-gold/40 bg-cream px-1 pb-1.5 pt-2.5 text-center">
                <div className="font-display text-[1.55rem] font-bold leading-none text-royal">{b.num}</div>
                <div className="mt-1.5 text-[0.5rem] font-bold uppercase tracking-wide text-gold">{b.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Cột phải: thành tích */}
        <div className="flex flex-col">
          {teacher.credentials.map((c, i) => {
            const Icon = ICON_MAP[c.icon];
            const isLast = i === teacher.credentials.length - 1;
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
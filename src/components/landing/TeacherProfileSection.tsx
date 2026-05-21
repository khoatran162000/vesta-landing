// FILE: src/components/landing/TeacherProfileSection.tsx — Profile giáo viên

import { ScrollReveal } from "./ScrollReveal";

const CREDENTIALS = [
  "Cựu giám khảo hỏi thi nói Cambridge, hệ KET, PET",
  "Cựu giảng viên Trường Đại học Ngoại ngữ, ĐHQGHN, ULIS",
  "Cựu giáo viên Trường THPT Chuyên Hà Nội - Amsterdam",
  "Cựu giáo viên Greenfield School, hệ Cambridge",
  "Cựu học sinh chuyên Anh, Hà Nội - Amsterdam",
  "Cựu sinh viên lớp Chất lượng cao, Đại học Ngoại ngữ, ĐHQGHN",
  "Thạc sĩ Lý luận Giảng dạy, Victoria University, Úc",
  "Thạc sĩ Quản trị Kinh doanh Quốc tế, University of Derby, Anh",
  "Kinh nghiệm giảng dạy 16 năm, chuyên IELTS, Cambridge English và tiếng Anh học thuật",
  "Từng tham gia huấn luyện đội tuyển tiếng Anh Quốc gia của học sinh Hà Nội - Amsterdam ở kỹ năng viết và nói",
  'Đồng tác giả sách "Bài Luận Mẫu Tiếng Anh Cho Học Sinh Chuyên" và "Bài Luận Mẫu Tiếng Anh Cho Học Sinh THPT 3 Miền"',
  "IELTS Overall 8.5, Speaking 9.0",
];

export function TeacherProfileSection() {
  return (
    <div className="mx-auto max-w-[960px] px-6" id="teacher">
      <ScrollReveal>
        <div className="pb-10 pt-[60px]">
          <div className="mb-2 flex items-center gap-3">
            <span className="text-xl">🚩</span>
            <h3 className="font-display text-[2rem] font-bold text-royal">
              Giáo Viên — Ms. Ly Le
            </h3>
          </div>
          <div
            className="h-[2px] w-full"
            style={{
              background: "linear-gradient(90deg, #C9A84C, #E8D48B)",
            }}
          />
        </div>
      </ScrollReveal>

      <ScrollReveal>
        <div className="mb-10 overflow-hidden rounded-2xl border border-silver/30 bg-white shadow-[0_2px_20px_rgba(15,27,61,0.06)]">
          {/* Header */}
          <div
            className="px-8 py-6"
            style={{
              background:
                "linear-gradient(135deg, #0F1B3D, #1B2A5B)",
            }}
          >
            <p
              className="mb-1 text-[0.65rem] font-bold uppercase tracking-[0.2em]"
              style={{ color: "#C9A84C" }}
            >
              FOUNDER & HEAD TEACHER
            </p>
            <h4 className="font-display text-[1.5rem] font-bold text-white">
              👩‍🏫 Kinh nghiệm & Chuyên môn nổi bật
            </h4>
          </div>

          {/* Credentials list */}
          <div className="px-8 py-6">
            <ul className="space-y-3">
              {CREDENTIALS.map((item, i) => {
                const isScore = item.includes("IELTS Overall");
                return (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-[0.9rem] leading-[1.75]"
                  >
                    <span
                      className="mt-[0.45rem] flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[0.55rem] font-bold text-white"
                      style={{
                        background: isScore
                          ? "linear-gradient(135deg, #C9A84C, #E8D48B)"
                          : "linear-gradient(135deg, #0F1B3D, #1B2A5B)",
                        color: isScore ? "#0F1B3D" : "#C9A84C",
                      }}
                    >
                      {isScore ? "★" : "✓"}
                    </span>
                    <span
                      className={
                        isScore
                          ? "font-bold text-[#0F1B3D]"
                          : "text-[#1a1a2e]"
                      }
                    >
                      {item}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}
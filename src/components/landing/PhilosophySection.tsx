/**
 * FILE: PhilosophySection.tsx
 * PATH: apps/landing/src/components/landing/PhilosophySection.tsx
 * MÔ TẢ: Phong Cách Dạy & Nội Quy Học Viên — 3 card với border vàng bên trái
 */

import { ScrollReveal } from "./ScrollReveal";

const RULES = [
  {
    content: `Mọi khóa học đều <strong>đảm bảo đầu ra</strong>, nhưng chương trình học nặng và đòi hỏi học viên bỏ nhiều nỗ lực và sự tự giác. <strong class="uppercase">Kiến thức không phải hàng hóa.</strong> Học phí không mua được năng lực — giáo viên chỉ cho học viên con đường nhanh nhất, luyện tập những bài chuẩn nhất, và học viên phải chăm thì mới cải thiện được. Lộ trình tại Vesta Uni phù hợp với các bạn <strong>QUYẾT TÂM</strong> để thi được điểm cao nhất, trong thời gian ngắn nhất 💯.`,
  },
  {
    content: `✨ Học viên cần <strong>cam kết làm đủ bài tập</strong> ngoài việc học trên lớp. Nếu ý thức học không tốt, giáo viên sẽ buộc dừng học và bảo lưu sang khóa sau. Học viên bị buộc dừng sẽ không còn tiếp cận kho học liệu và không được hoàn học phí.`,
  },
  {
    content: `✨ Giáo viên thông báo tiến độ học vào giữa và cuối khóa. Phụ huynh và học viên chủ động liên hệ qua email: <strong>huongly.ams@gmail.com</strong> hoặc Zalo: <strong>0336781368</strong>`,
  },
];

export function PhilosophySection() {
  return (
    <div className="mx-auto max-w-[1200px] px-6" id="philosophy">
      <ScrollReveal>
        <div className="pb-10 pt-[60px]">
          {/* Title */}
          <div className="text-center">
            <h3 className="section-title-underline inline-block font-display text-[2rem] font-bold text-royal">
                Phong Cách Dạy & Nội Quy Học Viên
            </h3>
            </div>
        </div>
      </ScrollReveal>

      {/* Cards */}
      <div className="space-y-5 pb-10">
        {RULES.map((rule, i) => (
          <ScrollReveal key={i} delay={i * 0.1}>
            <div className="flex overflow-hidden rounded-xl border border-silver/30 bg-white shadow-sm">
              {/* Gold left border */}
              <div className="w-1.5 shrink-0" style={{ background: "linear-gradient(180deg, #C9A84C, #E8D48B)" }} />

              {/* Content */}
              <div className="px-7 py-6">
                <p
                  className="text-[0.92rem] leading-[1.85] text-[#1a1a2e] [&_strong]:font-bold [&_strong]:text-royal"
                  dangerouslySetInnerHTML={{ __html: rule.content }}
                />
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}
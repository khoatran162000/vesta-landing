// FILE: src/components/landing/PhilosophySection.tsx — 2 boxes theo yêu cầu mới
import { ScrollReveal } from "./ScrollReveal";

const RULES = [
  {
    content: `Mọi khóa học đều <strong>đảm bảo đầu ra</strong>, nhưng học viên cần cam kết làm đủ bài tập hằng ngày (60-90 phút luyện). Chương trình học thiết kế theo chuẩn thi, giáo viên chỉ cho học viên kĩ thuật học chuẩn nhất, nhưng học viên cần làm bài thực sự thì mới lên trình. ✨ Nếu học viên liên tục có ý thức học không tốt, giáo viên sẽ buộc dừng học. Học viên bị buộc dừng sẽ không còn tiếp cận kho học liệu và không được hoàn học phí.`,
  },
  {
    content: `✨ Giáo viên thông báo tiến độ học vào giữa và cuối khóa. Ngoài hai thời điểm trên, phụ huynh và học viên muốn cập nhật tiến độ, mời chủ động liên hệ qua email: <strong><a href="mailto:huongly.ams@gmail.com" class="underline">huongly.ams@gmail.com</a></strong> hoặc Zalo: <strong>0336781368</strong>. Địa chỉ học trực tiếp: <strong>Ngõ 60 Hoàng Quốc Việt, Cầu Giấy, Hà Nội</strong>. Học online cùng lịch với học trực tiếp. Học online hay offline đều hiệu quả như nhau vì giáo viên có phương pháp sát sao, kiểm soát tốt việc học của các con sao cho không bị mất tập trung.`,
  },
];

export function PhilosophySection() {
  return (
    <div className="mx-auto max-w-[960px] px-6" id="philosophy">
      <ScrollReveal>
        <div className="pb-10 pt-[60px]">
          <div className="mb-2 flex items-center gap-3">
            <span className="text-xl">🚩</span>
            <h3 className="font-display text-[2rem] font-bold text-royal">
              Phong Cách Dạy & Nội Quy Học Viên
            </h3>
          </div>
          <div className="h-[2px] w-full" style={{ background: "linear-gradient(90deg, #C9A84C, #E8D48B)" }} />
        </div>
      </ScrollReveal>
      <div className="mx-auto max-w-[960px] space-y-5 pb-10">
        {RULES.map((rule, i) => (
          <ScrollReveal key={i} delay={i * 0.1}>
            <div className="flex overflow-hidden rounded-xl border border-silver/30 bg-white shadow-sm">
              <div className="w-1.5 shrink-0" style={{ background: "linear-gradient(180deg, #C9A84C, #E8D48B)" }} />
              <div className="px-7 py-6">
                <p
                  className="text-[0.92rem] leading-[1.85] text-[#1a1a2e] [&_strong]:font-bold [&_strong]:text-royal [&_a]:text-royal"
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
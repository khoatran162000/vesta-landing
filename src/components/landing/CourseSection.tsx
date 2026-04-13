// FILE: src/components/landing/CourseSection.tsx — Cac khoa hoc (chinh xac theo screenshots)

import { ScrollReveal } from "./ScrollReveal";

/* ═══════ FULL WIDTH COURSES (badge trong header) ═══════ */
const FULL_COURSES = [
  {
    title: "IELTS 5+",
    badge: "CẤP TỐC 10 TUẦN",
    features: [
      { icon: "🧠", text: "Nạp 200 từ vựng học thuật/tuần, xoay quanh 10 chủ điểm thi IELTS." },
      { icon: "✏️", text: "Xây dựng ngữ pháp từ trình độ 2.0, cam kết viết thạo bài luận chuẩn 5.5 chỉ sau một khóa." },
      { icon: "💡", text: "Rèn kỹ năng nghe, nói, đọc, viết bài bản, đặc biệt đẩy bật kỹ năng đọc và nghe." },
    ],
    commitment: "Cam kết chuẩn đầu ra 5.0+",
    scheduleLabel: "THỜI LƯỢNG",
    schedule: "30 buổi | 18:00–20:00 T2,4,6 hoặc T3,4,7",
    price: "8.400.000 VND",
    onlinePrice: "Online: 7.800.000",
  },
  {
    title: "IELTS 6+",
    badge: "12 TUẦN",
    features: [
      { icon: "🧠", text: "Nạp 300 từ vựng học thuật/tuần, xoay quanh 10 chủ điểm thi IELTS." },
      { icon: "✏️", text: "Củng cố ngữ pháp viết chắc chắn, cam kết viết thạo bài luận chuẩn 6.5 chỉ sau một khóa." },
      { icon: "📝", text: "Rèn bài bản kỹ thuật viết Task 1 chuẩn 6.5." },
      { icon: "💡", text: "Luyện sâu kỹ năng đọc, nghe, chuẩn âm kỹ năng nói." },
    ],
    commitment: "Cam kết chuẩn đầu ra 6.0+",
    scheduleLabel: "THỜI LƯỢNG",
    schedule: "36 buổi | 20:00–22:00 T2,4,6",
    price: "12.000.000 VND",
    onlinePrice: "Online: 11.400.000",
  },
  {
    title: "IELTS 7+",
    badge: "45 BUỔI",
    features: [
      { icon: "🧠", text: "Nạp 500 từ vựng học thuật/tuần, xoay quanh 10 chủ điểm thi IELTS." },
      { icon: "📝", text: "Rèn bài bản kỹ thuật đọc, nghe đạt 8+." },
      { icon: "💎", text: "Học kỹ thuật trả lời câu hỏi Speaking dự đoán cho kỳ thi." },
      { icon: "✏️", text: "Cam kết viết thạo bài luận chuẩn 7+ chỉ sau một khóa." },
    ],
    commitment: "Cam kết chuẩn đầu ra 7.0+",
    scheduleLabel: "THỜI LƯỢNG",
    schedule: "45 buổi | 19:30–21:30 T3,5 (30 tuần) hoặc T3,5,7 (15 tuần)",
    price: "13.600.000 VND",
    onlinePrice: "Online: 12.800.000",
  },
  {
    title: "IELTS 1-1 Phá Tắc Band",
    badge: "LIÊN HỆ",
    badgeOutline: false,
    features: [
      { icon: "🚀", text: "Lộ trình học nhanh nhất, bài tập thiết kế riêng giúp tăng band có chiến thuật." },
      { icon: "🧠", text: "Nạp đủ lượng từ vựng cho các chủ điểm thi IELTS." },
      { icon: "📝", text: "Bài viết và ý mẫu cho 400 đề thi dự đoán." },
      { icon: "🎯", text: "Chấm chữa bài không giới hạn." },
      { icon: "💎", text: "Bài nói mẫu dựng sẵn với 350 câu hỏi thi dự đoán." },
    ],
    commitment: "Cam kết tăng ít nhất 1 band sau 1 khóa học.",
    cta: "💰 Liên hệ để được tư vấn phù hợp",
  },
  {
    title: "IELTS Intensive Bứt Phá",
    badge: "60 BUỔI",
    features: [
      { icon: "📊", text: "Đầu vào 6.0+ → Đầu ra 7.0 trở lên." },
      { icon: "🧠", text: "Ôn từ vựng, luyện đề đọc nghe, chữa viết nói không giới hạn." },
      { icon: "📝", text: "Đề dự đoán tỉ lệ trúng cao, ép học bổ sung từ vựng và chỉnh kĩ năng." },
      { icon: "✏️", text: "Template nói, viết độc đáo, không trùng mẫu đại trà. Bài viết được sửa kỹ kèm bài mẫu." },
    ],
    commitment: "Chống lười và tăng band hiệu quả.",
    scheduleLabel: "LỊCH HỌC",
    schedule: "60 buổi liên tục T2–T7: 10:00–12:00 (Đọc), 13:30–15:30 (Nghe), 15:30–16:30 (Viết)",
    price: "7.890.000 VND / 60 buổi",
  },
];

/* ═══════ HALF WIDTH COURSES (badge DƯỚI header, bên trái) ═══════ */
const HALF_COURSES = [
  {
    title: "Viết / Nói — Phá Tắc Band",
    badge: "20 BUỔI",
    features: [
      { icon: "✏️", text: "Cam kết bật điểm viết lên band 7+." },
      { icon: "📝", text: "Phương pháp viết chuẩn theo 4 tiêu chí chấm điểm, luyện 100 đề dự đoán mới nhất." },
      { icon: "🎯", text: "Chấm và chữa bài không giới hạn, học đến khi đạt yêu cầu." },
    ],
    scheduleLabel: "LỊCH HỌC",
    schedule: "15:30 chiều T2, T4, T6 | Online & Offline",
    price: "7.800.000 VND / khóa",
  },
  {
    title: "Phát Âm Cơ Bản",
    badge: "24 BUỔI",
    features: [
      { icon: "🎯", text: "Cam kết chỉnh được tất cả các âm sai khi nói tiếng Anh." },
      { icon: "💎", text: "Luyện âm cơ bản, âm gió, âm cuối, nối âm và ngữ điệu tự nhiên. Bổ sung từ vựng A2, B1, luyện phản xạ nói hội thoại." },
      { icon: "🧑", text: "Đối tượng: mất gốc, phát âm sai, nói không rõ, thiếu tự tin, nói đều, nói lắp, nói ngọng. Lớp tối đa 5 bạn." },
    ],
    scheduleLabel: "LỊCH HỌC",
    schedule: "21:00–22:00 tối T3, T5, T7 | Online & Offline",
    price: "6.800.000 VND / khóa",
  },
];

/* ═══════ HỖ TRỢ ĐĂNG KÝ THI (header khác) ═══════ */
const SUPPORT_COURSE = {
  title: "Hỗ Trợ Đăng Ký Thi IELTS",
  headerIcon: "🎓",
  badge: "ƯU ĐÃI",
  badgeOutline: true,
  features: [
    { icon: "📝", text: "Đăng ký thi IELTS tại BC & IDP." },
    { icon: "🖥️", text: "Chọn ca thi Speaking phù hợp." },
    { icon: "🎁", text: "Quà tặng: Gói ôn luyện PREMIUM READY của BC trong 123 ngày." },
  ],
  specialPrice: "Lệ phí ưu đãi: 4.550.000 VND",
  originalPrice: "Giá gốc: 4.664.000",
};

export function CourseSection() {
  return (
    <div className="mx-auto max-w-[960px] px-6" id="courses">
      <div className="pb-10 pt-[60px]">
        <div className="mb-2 flex items-center gap-3">
          <span className="text-xl">🚩</span>
          <h3 className="font-display text-[2rem] font-bold text-royal">Các Khóa Học</h3>
        </div>
        <div className="h-[2px] w-full" style={{ background: "linear-gradient(90deg, #C9A84C, #E8D48B)" }} />
      </div>

      <div className="mx-auto max-w-[960px] space-y-7 pb-8">
        {/* Full width courses */}
        {FULL_COURSES.map((course, i) => (
          <ScrollReveal key={i} delay={i * 0.05}>
            <FullCourseCard course={course} />
          </ScrollReveal>
        ))}

        {/* Half width courses — side by side */}
        <ScrollReveal>
          <div className="grid grid-cols-1 gap-7 md:grid-cols-2">
            {HALF_COURSES.map((course, i) => (
              <HalfCourseCard key={i} course={course} />
            ))}
          </div>
        </ScrollReveal>

        {/* Hỗ Trợ Đăng Ký Thi */}
        <ScrollReveal>
          <SupportCard />
        </ScrollReveal>
      </div>
    </div>
  );
}

/* ═══════ FULL WIDTH CARD ═══════ */
function FullCourseCard({ course }: { course: any }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-silver/30 bg-white shadow-[0_2px_20px_rgba(15,27,61,0.06)]">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4" style={{ background: "linear-gradient(135deg, #0F1B3D, #1B2A5B)" }}>
        <h4 className="flex items-center gap-2 font-display text-[1.5rem] font-bold text-white">
          <span>📜</span> {course.title}
        </h4>
        <span className={`shrink-0 rounded-full px-4 py-1.5 text-[0.7rem] font-bold uppercase tracking-wide ${
          course.badgeOutline ? "border border-white/40 text-white" : "text-navy"
        }`}
          style={course.badgeOutline ? undefined : { background: "linear-gradient(135deg, #C9A84C, #E8D48B)" }}>
          {course.badge}
        </span>
      </div>

      {/* Body */}
      <div className="px-6 py-5">
        <ul className="space-y-2.5">
          {course.features.map((feat: any, i: number) => (
            <li key={i} className="flex items-start gap-3 text-[0.88rem] leading-[1.7] text-[#1a1a2e]">
              <span className="mt-0.5 shrink-0 text-base">{feat.icon}</span>
              <span>{feat.text}</span>
            </li>
          ))}
        </ul>

        {course.commitment && (
          <p className="mt-4 flex items-center gap-2 text-[0.88rem] font-bold text-[#1a1a2e]">
            <span>🎯</span> {course.commitment}
          </p>
        )}

        {/* Schedule + Price */}
        {(course.schedule || course.price) && (
          <div className="mt-5 flex flex-wrap items-end justify-between gap-4 border-t border-silver/20 pt-4">
            {course.schedule && (
              <div>
                <p className="text-[0.65rem] font-bold uppercase tracking-widest text-muted">{course.scheduleLabel}</p>
                <p className="mt-1 text-[0.88rem] font-bold text-[#1a1a2e]">{course.schedule}</p>
              </div>
            )}
            {course.price && (
              <div>
                <p className="text-[0.65rem] font-bold uppercase tracking-widest text-muted">HỌC PHÍ</p>
                <p className="mt-1 font-display text-[1.2rem] font-bold italic" style={{ color: "#C93040" }}>
                  {course.price}
                </p>
                {course.onlinePrice && <p className="text-[0.78rem] text-muted">({course.onlinePrice})</p>}
              </div>
            )}
          </div>
        )}

        {/* CTA for 1-1 */}
        {course.cta && (
          <p className="mt-5 text-center text-[0.95rem] text-gold">
            <a href="#registration" className="font-semibold underline underline-offset-2 hover:text-royal transition-colors">
              {course.cta}
            </a>
          </p>
        )}
      </div>
    </div>
  );
}

/* ═══════ HALF WIDTH CARD (badge DƯỚI header, bên trái) ═══════ */
function HalfCourseCard({ course }: { course: any }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-silver/30 bg-white shadow-[0_2px_20px_rgba(15,27,61,0.06)]">
      {/* Header — title + badge bên dưới */}
      <div className="px-6 pb-4 pt-5" style={{ background: "linear-gradient(135deg, #0F1B3D, #1B2A5B)" }}>
        <h4 className="flex items-center gap-2 font-display text-[1.3rem] font-bold text-white">
          <span>📜</span> {course.title}
        </h4>
        <span className="mt-2 inline-block rounded-full px-4 py-1 text-[0.68rem] font-bold uppercase tracking-wide text-navy"
          style={{ background: "linear-gradient(135deg, #C9A84C, #E8D48B)" }}>
          {course.badge}
        </span>
      </div>

      {/* Body */}
      <div className="px-6 py-5">
        <ul className="space-y-2.5">
          {course.features.map((feat: any, i: number) => (
            <li key={i} className="flex items-start gap-3 text-[0.88rem] leading-[1.7] text-[#1a1a2e]">
              <span className="mt-0.5 shrink-0 text-base">{feat.icon}</span>
              <span>{feat.text}</span>
            </li>
          ))}
        </ul>

        {(course.schedule || course.price) && (
          <div className="mt-5 border-t border-silver/20 pt-4">
            {course.schedule && (
              <div className="mb-2">
                <p className="text-[0.65rem] font-bold uppercase tracking-widest text-muted">{course.scheduleLabel}</p>
                <p className="mt-1 text-[0.88rem] font-bold text-[#1a1a2e]">{course.schedule}</p>
              </div>
            )}
            {course.price && (
              <div>
                <p className="text-[0.65rem] font-bold uppercase tracking-widest text-muted">HỌC PHÍ</p>
                <p className="mt-1 font-display text-[1.2rem] font-bold italic" style={{ color: "#C93040" }}>
                  {course.price}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/* ═══════ SUPPORT CARD (Hỗ Trợ Đăng Ký Thi) ═══════ */
function SupportCard() {
  return (
    <div className="overflow-hidden rounded-2xl border border-silver/30 bg-white shadow-[0_2px_20px_rgba(15,27,61,0.06)]">
      <div className="flex items-center justify-between px-6 py-4" style={{ background: "linear-gradient(135deg, #C9A84C, #E8D48B)" }}>
        <h4 className="flex items-center gap-2 font-display text-[1.6rem] font-bold text-white">
          <span>🎓</span> {SUPPORT_COURSE.title}
        </h4>
        <span className="shrink-0 rounded-full bg-white px-4 py-1.5 text-[0.7rem] font-bold uppercase tracking-wide text-gold">
          {SUPPORT_COURSE.badge}
        </span>
      </div>

      <div className="px-6 py-5">
        <ul className="space-y-2.5">
          {SUPPORT_COURSE.features.map((feat, i) => (
            <li key={i} className="flex items-start gap-3 text-[0.88rem] leading-[1.7] text-[#1a1a2e]">
              <span className="mt-0.5 shrink-0 text-base">{feat.icon}</span>
              <span>{feat.text}</span>
            </li>
          ))}
        </ul>

        <p className="mt-5 text-center text-[1rem]">
          <span className="text-gold">💰</span>{" "}
          <span className="font-display text-[1.2rem] font-bold italic" style={{ color: "#C93040" }}>
            {SUPPORT_COURSE.specialPrice}
          </span>{" "}
          <span className="text-[0.88rem] text-muted">({SUPPORT_COURSE.originalPrice})</span>
        </p>
      </div>
    </div>
  );
}
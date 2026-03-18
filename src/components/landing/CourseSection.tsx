import { COURSES, type Course, type AccentType } from "@/lib/constants";
import { ScrollReveal } from "./ScrollReveal";
import { SectionTitle } from "./SectionTitle";

const accentClassMap: Record<AccentType, string> = {
  blue: "accent-blue", gold: "accent-gold", silver: "accent-silver", mixed: "accent-mixed",
};

export function CourseSection() {
  return (
    <div className="mx-auto max-w-[1200px] px-6" id="courses">
      <SectionTitle title="Các Khóa Học" subtitle="Học online và offline cùng lúc · Địa chỉ: Ngõ 60 Hoàng Quốc Việt, Cầu Giấy, Hà Nội" />
      <div className="grid grid-cols-1 gap-7 pb-8 sm:grid-cols-[repeat(auto-fill,minmax(340px,1fr))]">
        {COURSES.map((course, i) => (
          <ScrollReveal key={course.id} delay={i * 0.05}>
            <CourseCard course={course} />
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}

function CourseCard({ course }: { course: Course }) {
  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-silver/30 bg-white shadow-[0_2px_20px_rgba(15,27,61,0.06)] transition-all duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 hover:shadow-[0_16px_48px_rgba(15,27,61,0.12)]">
      <div className={`h-[5px] ${accentClassMap[course.accent]}`} />
      <div className="flex items-start justify-between gap-3 px-6 pt-6">
        <h4 className="font-display text-2xl font-bold leading-tight text-royal">{course.title}</h4>
        <span className={`shrink-0 whitespace-nowrap rounded-full px-3 py-[5px] text-[0.68rem] font-bold uppercase tracking-wide ${course.badge.type === "target" ? "badge-target" : "badge-special"}`}>
          {course.badge.label}
        </span>
      </div>
      <div className="px-6 pt-4">
        <ul>{course.features.map((feat, i) => (<li key={i} className="diamond-bullet text-[#1a1a2e]">{feat}</li>))}</ul>
      </div>
      <div className="mt-auto flex flex-wrap gap-2.5 px-6 py-[18px]">
        {course.meta.map((m, i) => (
          <span key={i} className={`inline-flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-[0.78rem] font-medium ${m.chipType === "time" ? "chip-time" : m.chipType === "price" ? "chip-price" : "chip-schedule"}`}>
            {m.icon && <span>{m.icon}</span>}{m.label}
          </span>
        ))}
      </div>
      {course.dates && (
        <div className="px-6 pb-5 text-[0.78rem] leading-[1.7] text-muted">
          <strong className="font-semibold text-royal">Khai giảng 2026:</strong> {course.dates}
          {course.datesNote && (<><br /><em>{course.datesNote}</em></>)}
        </div>
      )}
    </div>
  );
}

// FILE: src/components/landing/CourseSection.tsx — Khoá học (fetch động từ API)
"use client";
import { useEffect, useState } from "react";
import { ScrollReveal } from "./ScrollReveal";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export function CourseSection() {
  const [courses, setCourses] = useState<any[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch(`${API_URL}/courses`)
      .then((r) => r.json())
      .then((json) => { if (json?.success && Array.isArray(json.data)) setCourses(json.data); })
      .catch(() => {})
      .finally(() => setLoaded(true));
  }, []);

  if (!loaded || courses.length === 0) return null;

  const fullCourses = courses.filter((c) => c.cardType === "FULL");
  const halfCourses = courses.filter((c) => c.cardType === "HALF");
  const supportCourses = courses.filter((c) => c.cardType === "SUPPORT");

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
        {fullCourses.map((course, i) => (
          <ScrollReveal key={course.id} delay={i * 0.05}>
            <FullCourseCard course={course} />
          </ScrollReveal>
        ))}
        {halfCourses.length > 0 && (
          <ScrollReveal>
            <div className="grid grid-cols-1 gap-7 md:grid-cols-2">
              {halfCourses.map((course) => <HalfCourseCard key={course.id} course={course} />)}
            </div>
          </ScrollReveal>
        )}
        {supportCourses.map((course) => (
          <ScrollReveal key={course.id}>
            <SupportCard course={course} />
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}

function FullCourseCard({ course }: { course: any }) {
  const features = Array.isArray(course.features) ? course.features : [];
  return (
    <div className="overflow-hidden rounded-2xl border border-silver/30 bg-white shadow-[0_2px_20px_rgba(15,27,61,0.06)]">
      <div className="flex items-center justify-between px-6 py-4" style={{ background: course.isSpecial ? "linear-gradient(135deg, #7B1520, #A31D2B)" : "linear-gradient(135deg, #0F1B3D, #1B2A5B)" }}>
        <h4 className="flex items-center gap-2 font-display text-[1.5rem] font-bold text-white">
          <span>📜</span> {course.title}
        </h4>
        {course.badge && (
          <span className={`shrink-0 rounded-full px-4 py-1.5 text-[0.7rem] font-bold uppercase tracking-wide ${course.badgeOutline ? "border border-white/40 text-white" : "text-navy"}`}
            style={course.badgeOutline ? undefined : { background: "linear-gradient(135deg, #C9A84C, #E8D48B)" }}>
            {course.badge}
          </span>
        )}
      </div>
      <div className="px-6 py-5">
        <ul className="space-y-2.5">
          {features.map((feat: any, i: number) => (
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
                {!course.isSpecial && <p className="text-[0.65rem] font-bold uppercase tracking-widest text-muted">HỌC PHÍ</p>}
                <p className="mt-1 font-display text-[1.1rem] font-bold italic" style={{ color: "#C93040" }}>{course.price}</p>
                {course.onlinePrice && <p className="text-[0.78rem] text-muted">({course.onlinePrice})</p>}
              </div>
            )}
          </div>
        )}
        {course.cta && (
          <p className="mt-5 text-center text-[0.95rem] text-gold">
            <a
              href={course.ctaLink || "#registration"}
              {...(course.ctaLink?.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="font-semibold underline underline-offset-2 hover:text-royal transition-colors"
            >
              {course.cta}
            </a>
          </p>
        )}
      </div>
    </div>
  );
}

function HalfCourseCard({ course }: { course: any }) {
  const features = Array.isArray(course.features) ? course.features : [];
  return (
    <div className="overflow-hidden rounded-2xl border border-silver/30 bg-white shadow-[0_2px_20px_rgba(15,27,61,0.06)]">
      <div className="px-6 pb-4 pt-5" style={{ background: "linear-gradient(135deg, #0F1B3D, #1B2A5B)" }}>
        <h4 className="flex items-center gap-2 font-display text-[1.3rem] font-bold text-white">
          <span>📜</span> {course.title}
        </h4>
        {course.badge && (
          <span className="mt-2 inline-block rounded-full px-4 py-1 text-[0.68rem] font-bold uppercase tracking-wide text-navy"
            style={{ background: "linear-gradient(135deg, #C9A84C, #E8D48B)" }}>
            {course.badge}
          </span>
        )}
      </div>
      <div className="px-6 py-5">
        <ul className="space-y-2.5">
          {features.map((feat: any, i: number) => (
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
                <p className="mt-1 font-display text-[1.2rem] font-bold italic" style={{ color: "#C93040" }}>{course.price}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function SupportCard({ course }: { course: any }) {
  const features = Array.isArray(course.features) ? course.features : [];
  return (
    <div className="overflow-hidden rounded-2xl border border-silver/30 bg-white shadow-[0_2px_20px_rgba(15,27,61,0.06)]">
      <div className="flex items-center justify-between px-6 py-4" style={{ background: "linear-gradient(135deg, #C9A84C, #E8D48B)" }}>
        <h4 className="flex items-center gap-2 font-display text-[1.6rem] font-bold text-white">
          <span>🎓</span> {course.title}
        </h4>
        {course.badge && (
          <span className="shrink-0 rounded-full bg-white px-4 py-1.5 text-[0.7rem] font-bold uppercase tracking-wide text-gold">
            {course.badge}
          </span>
        )}
      </div>
      <div className="px-6 py-5">
        <ul className="space-y-2.5">
          {features.map((feat: any, i: number) => (
            <li key={i} className="flex items-start gap-3 text-[0.88rem] leading-[1.7] text-[#1a1a2e]">
              <span className="mt-0.5 shrink-0 text-base">{feat.icon}</span>
              <span>{feat.text}</span>
            </li>
          ))}
        </ul>
        {(course.specialPrice || course.originalPrice) && (
          <p className="mt-5 text-center text-[1rem]">
            <span className="text-gold">💰</span>{" "}
            {course.specialPrice && <span className="font-display text-[1.2rem] font-bold italic" style={{ color: "#C93040" }}>{course.specialPrice}</span>}{" "}
            {course.originalPrice && <span className="text-[0.88rem] text-muted">({course.originalPrice})</span>}
          </p>
        )}
      </div>
    </div>
  );
}
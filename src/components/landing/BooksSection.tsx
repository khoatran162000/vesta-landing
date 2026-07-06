// FILE: src/components/landing/BooksSection.tsx — Sách & Giáo trình (fetch động)
"use client";
import { useEffect, useState } from "react";
import { ScrollReveal } from "./ScrollReveal";
import { fetchBlock } from "@/lib/siteContent";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export function BooksSection() {
  const [books, setBooks] = useState<any[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [sparkHtml, setSparkHtml] = useState(
    `<strong class="font-bold text-royal">SPARK tập 1 & 2:</strong> Tuyển tập ý chi tiết cho tất cả các bài luận IELTS — gồm hơn 600 đề kèm ý chi tiết, giúp viết nhanh bài luận chuẩn IELTS mang tính tranh biện cao. Cung cấp từ chuyên ngành, từ học thuật trình độ cao, cùng cấu trúc câu mẫu sẵn.`,
  );
  useEffect(() => {
    fetchBlock("books_spark").then((d) => {
      if (d?.html) setSparkHtml(d.html);
    });
  }, []);
  useEffect(() => {
    fetch(`${API_URL}/books`)
      .then((r) => r.json())
      .then((json) => {
        if (json?.success && Array.isArray(json.data)) setBooks(json.data);
      })
      .catch(() => {})
      .finally(() => setLoaded(true));
  }, []);

  if (!loaded || books.length === 0) return null;

  return (
    <div className="mx-auto max-w-[960px] px-6 pb-[60px]" id="books">
      <div className="pb-10 pt-[60px]">
        <div className="mb-2 flex items-center gap-3">
          <span className="text-xl">🚩</span>
          <h3 className="font-display text-[2rem] font-bold text-royal">
            Sách & Giáo Trình
          </h3>
        </div>
        <div
          className="h-[2px] w-full"
          style={{ background: "linear-gradient(90deg, #C9A84C, #E8D48B)" }}
        />
      </div>

      {/* SPARK description — tạm hardcode, sẽ đưa vào SiteContent ở vòng cuối */}
      <ScrollReveal>
        <div className="mx-auto mb-8 flex max-w-[960px] overflow-hidden rounded-xl border border-silver/30 bg-white shadow-sm">
          <div
            className="w-1.5 shrink-0"
            style={{ background: "linear-gradient(180deg, #C9A84C, #E8D48B)" }}
          />
          <div className="px-7 py-6">
            <p
              className="text-[0.92rem] leading-[1.85] text-[#1a1a2e] [&_strong]:font-bold [&_strong]:text-royal"
              dangerouslySetInnerHTML={{ __html: sparkHtml }}
            />
          </div>
        </div>
      </ScrollReveal>

      {/* Book grid */}
      <ScrollReveal>
        <div className="mx-auto grid max-w-[960px] grid-cols-2 gap-5 md:grid-cols-4">
          {books.map((book) => (
            <div
              key={book.id}
              className="overflow-hidden rounded-xl border border-gold/30 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              <div
                className="h-[3px]"
                style={{
                  background: book.highlight
                    ? "linear-gradient(90deg, #C93040, #A31D2B)"
                    : "linear-gradient(90deg, #C9A84C, #E8D48B)",
                }}
              />
              <div className="px-5 py-6 text-center">
                <h5 className="font-display text-[1.2rem] font-bold text-royal">
                  {book.title}
                </h5>
                <p
                  className="mt-2 font-display text-[1.15rem] font-bold italic"
                  style={{ color: "#C93040" }}
                >
                  {book.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </ScrollReveal>
    </div>
  );
}

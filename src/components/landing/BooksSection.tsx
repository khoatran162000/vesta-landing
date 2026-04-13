// FILE: src/components/landing/BooksSection.tsx — Sach & Giao trinh

import { ScrollReveal } from "./ScrollReveal";

const BOOKS = [
  { title: "Giáo trình 5+", price: "269.000đ", highlight: false },
  { title: "Giáo trình 6+", price: "289.000đ", highlight: false },
  { title: "Giáo trình 7+", price: "279.000đ", highlight: false },
  { title: "SPARK 1", price: "777.000đ", highlight: false },
  { title: "SPARK 2", price: "888.000đ", highlight: false },
  { title: "Combo 2 cuốn", price: "1.456.000đ", highlight: true },
];

export function BooksSection() {
  return (
    <div className="mx-auto max-w-[960px] px-6 pb-[60px]" id="books">
      <div className="pb-10 pt-[60px]">
      <div className="mb-2 flex items-center gap-3">
        <span className="text-xl">🚩</span>
        <h3 className="font-display text-[2rem] font-bold text-royal">Sách & Giáo Trình</h3>
      </div>
      <div className="h-[2px] w-full" style={{ background: "linear-gradient(90deg, #C9A84C, #E8D48B)" }} />
    </div>

      {/* SPARK description */}
      <ScrollReveal>
        <div className="mx-auto mb-8 flex max-w-[960px] overflow-hidden rounded-xl border border-silver/30 bg-white shadow-sm">
          <div className="w-1.5 shrink-0" style={{ background: "linear-gradient(180deg, #C9A84C, #E8D48B)" }} />
          <div className="px-7 py-6">
            <p className="text-[0.92rem] leading-[1.85] text-[#1a1a2e]">
              <strong className="font-bold text-royal">SPARK tập 1 & 2:</strong> Tuyển tập ý chi tiết cho tất cả các bài luận IELTS — gồm hơn 600 đề kèm ý chi tiết, giúp viết nhanh bài luận chuẩn IELTS mang tính tranh biện cao. Cung cấp từ chuyên ngành, từ học thuật trình độ cao, cùng cấu trúc câu mẫu sẵn.
            </p>
          </div>
        </div>
      </ScrollReveal>

      {/* Book grid */}
      <ScrollReveal>
        <div className="mx-auto grid max-w-[960px] grid-cols-2 gap-5 md:grid-cols-4">
          {BOOKS.map((book) => (
            <div key={book.title}
              className="overflow-hidden rounded-xl border border-gold/30 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
              <div className="h-[3px]" style={{
                background: book.highlight ? "linear-gradient(90deg, #C93040, #A31D2B)" : "linear-gradient(90deg, #C9A84C, #E8D48B)",
              }} />
              <div className="px-5 py-6 text-center">
                <h5 className="font-display text-[1.2rem] font-bold text-royal">{book.title}</h5>
                <p className="mt-2 font-display text-[1.15rem] font-bold italic" style={{ color: "#C93040" }}>{book.price}</p>
              </div>
            </div>
          ))}
        </div>
      </ScrollReveal>
    </div>
  );
}
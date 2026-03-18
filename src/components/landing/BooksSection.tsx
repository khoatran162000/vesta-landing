import { BOOKS } from "@/lib/constants";
import { ScrollReveal } from "./ScrollReveal";
import { SectionTitle } from "./SectionTitle";

export function BooksSection() {
  return (
    <div className="mx-auto max-w-[1200px] px-6 pb-[60px]" id="books">
      <SectionTitle title="Sách & Giáo Trình" />
      <ScrollReveal>
        <p className="mx-auto mb-6 max-w-[800px] px-5 text-center text-[0.82rem] leading-relaxed text-muted">
          <strong className="font-semibold text-royal">SPARK tập 1 & 2:</strong> Tuyển tập ý chi tiết cho hơn 600 đề IELTS — kèm ý chi tiết tới từng câu, từ chuyên ngành trình độ cao, và cấu trúc câu mẫu sẵn để triển khai bài luận mang tính tranh biện cao.
        </p>
      </ScrollReveal>
      <ScrollReveal>
        <div className="grid grid-cols-2 gap-[18px] sm:grid-cols-3 md:grid-cols-[repeat(auto-fit,minmax(200px,1fr))]">
          {BOOKS.map((book) => (
            <div key={book.title} className={`group rounded-[14px] border border-silver/30 p-7 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_36px_rgba(15,27,61,0.08)] ${book.featured ? "bg-linear-to-br from-gold/8 to-gold/2" : "bg-white"}`}>
              <div className="mb-2.5 text-[2rem]">{book.icon}</div>
              <h5 className="mb-1.5 font-display text-[1.15rem] font-bold text-royal">{book.title}</h5>
              <div className="text-[1.1rem] font-bold text-gold">
                {book.price}
                {book.priceNote && <small className="text-[0.75rem] font-normal text-muted"> {book.priceNote}</small>}
              </div>
            </div>
          ))}
        </div>
      </ScrollReveal>
    </div>
  );
}

import { ScrollReveal } from "./ScrollReveal";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
}

export function SectionTitle({ title, subtitle }: SectionTitleProps) {
  return (
    <ScrollReveal>
      <div className="py-[60px] pb-10 text-center">
        <h3 className="section-title-underline inline-block font-display text-[2rem] font-bold text-royal">
          {title}
        </h3>
        {subtitle && (
          <p className="mt-2 text-[0.9rem] font-light text-muted">{subtitle}</p>
        )}
      </div>
    </ScrollReveal>
  );
}

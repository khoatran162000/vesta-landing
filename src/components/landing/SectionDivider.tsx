// FILE: src/components/landing/SectionDivider.tsx — Đường ngăn cách giữa các section

export function SectionDivider() {
  return (
    <div className="mx-auto flex max-w-[500px] items-center justify-center gap-0 px-6 py-1">
      {/* Dot trái */}
      <span
        className="inline-block h-[5px] w-[5px] shrink-0 rounded-full"
        style={{ background: "#C9A84C" }}
      />
      {/* Dashes trái */}
      <div
        className="mx-1 h-[2px] flex-1"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, #C9A84C 0px, #C9A84C 14px, transparent 14px, transparent 20px)",
        }}
      />
      {/* Sun icon */}
      <span className="mx-3 text-xl leading-none">☀️</span>
      {/* Dashes phải */}
      <div
        className="mx-1 h-[2px] flex-1"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, #C9A84C 0px, #C9A84C 14px, transparent 14px, transparent 20px)",
        }}
      />
      {/* Dot phải */}
      <span
        className="inline-block h-[5px] w-[5px] shrink-0 rounded-full"
        style={{ background: "#C9A84C" }}
      />
    </div>
  );
}
// FILE: src/components/WritingPromptPicker.tsx — Bốc ngẫu nhiên 1 đề Writing Task 2.
// Dùng ở trang chấm bài (có nút "Dùng đề này") và trang Kho đề.
"use client";
import { useState } from "react";
import { Shuffle, ArrowRight } from "lucide-react";
import data from "@/data/writingPrompts.json";

export type Prompt = { id: number; topic: string; prompt: string };
const PROMPTS: Prompt[] = (data as any).prompts || [];

export function pickRandom(exceptId?: number): Prompt | null {
  if (PROMPTS.length === 0) return null;
  if (PROMPTS.length === 1) return PROMPTS[0];
  let p = PROMPTS[Math.floor(Math.random() * PROMPTS.length)];
  let guard = 0;
  while (exceptId != null && p.id === exceptId && guard++ < 10) {
    p = PROMPTS[Math.floor(Math.random() * PROMPTS.length)];
  }
  return p;
}

export default function WritingPromptPicker({ onUse }: { onUse?: (p: Prompt) => void }) {
  const [current, setCurrent] = useState<Prompt | null>(null);
  function roll() { setCurrent(pickRandom(current?.id)); }

  return (
    <div className="rounded-xl border border-[#C9A84C]/40 bg-[#FBF7EC] p-4">
      {!current ? (
        <button type="button" onClick={roll}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#1B2A5C] py-2.5 text-sm font-semibold text-white hover:bg-[#2A3F7A]">
          <Shuffle size={16} />🎲 Chọn đề viết ngẫu nhiên
        </button>
      ) : (
        <div>
          <div className="mb-2 flex items-center justify-between">
            <span className="rounded-full bg-[#1B2A5C]/10 px-2.5 py-0.5 text-[0.7rem] font-bold text-[#1B2A5C]">{current.topic}</span>
            <span className="text-[0.7rem] text-gray-500">Đề #{current.id} · Task 2</span>
          </div>
          <p className="text-[0.95rem] leading-relaxed text-[#1a1a2e]">{current.prompt}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <button type="button" onClick={roll}
              className="inline-flex items-center gap-1.5 rounded-lg border border-[#1B2A5C]/30 px-3 py-1.5 text-xs font-semibold text-[#1B2A5C] hover:bg-white">
              <Shuffle size={13} />Đổi đề khác
            </button>
            {onUse && (
              <button type="button" onClick={() => onUse(current)}
                className="inline-flex items-center gap-1.5 rounded-lg bg-[#C9A84C] px-3 py-1.5 text-xs font-bold text-white hover:bg-[#A6882E]">
                Dùng đề này<ArrowRight size={13} />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
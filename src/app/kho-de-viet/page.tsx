// FILE: src/app/kho-de-viet/page.tsx — Kho đề IELTS Writing Task 2 (xem, lọc chủ đề, random)
"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Search } from "lucide-react";
import data from "@/data/writingPrompts.json";
import WritingPromptPicker, { Prompt } from "@/components/WritingPromptPicker";

const PROMPTS: Prompt[] = (data as any).prompts || [];

export default function KhoDeVietPage() {
  const [q, setQ] = useState("");
  const [topic, setTopic] = useState("");
  const topics = useMemo(() => Array.from(new Set(PROMPTS.map((p) => p.topic))).sort(), []);
  const list = useMemo(() => {
    const kw = q.trim().toLowerCase();
    return PROMPTS.filter((p) =>
      (!topic || p.topic === topic) &&
      (!kw || p.prompt.toLowerCase().includes(kw) || p.topic.toLowerCase().includes(kw))
    );
  }, [q, topic]);

  return (
    <div className="min-h-screen bg-[#F0F2F6] px-4 py-10">
      <div className="mx-auto max-w-[820px]">
        <Link href="/cham-bai" className="mb-6 inline-flex items-center gap-1.5 text-sm text-[#1B2A5C] hover:underline"><ArrowLeft size={15} />Chấm chữa bài</Link>
        <h1 className="font-display text-3xl font-bold text-[#1B2A5C]">Kho đề IELTS Writing Task 2</h1>
        <p className="mb-6 mt-1 text-[#1B2A5C]/70">{PROMPTS.length} đề · Bấm nút bên dưới để bốc ngẫu nhiên, hoặc lọc theo chủ đề để chọn đề luyện.</p>

        <div className="mb-6"><WritingPromptPicker /></div>

        <div className="mb-4 flex flex-wrap gap-2">
          <div className="relative flex-1 min-w-[200px]">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Tìm theo từ khoá..."
              className="w-full rounded-lg border border-silver/40 bg-white py-2 pl-9 pr-3 text-sm outline-none focus:border-gold" />
          </div>
          <select value={topic} onChange={(e) => setTopic(e.target.value)}
            className="rounded-lg border border-silver/40 bg-white px-3 py-2 text-sm outline-none focus:border-gold">
            <option value="">Tất cả chủ đề</option>
            {topics.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>

        <div className="space-y-3">
          {list.map((p) => (
            <div key={p.id} className="rounded-xl border border-silver/30 bg-white p-4">
              <div className="mb-1.5 flex items-center justify-between">
                <span className="rounded-full bg-[#1B2A5C]/10 px-2.5 py-0.5 text-[0.7rem] font-bold text-[#1B2A5C]">{p.topic}</span>
                <span className="text-[0.7rem] text-gray-400">Đề #{p.id}</span>
              </div>
              <p className="text-[0.95rem] leading-relaxed text-[#1a1a2e]">{p.prompt}</p>
            </div>
          ))}
          {list.length === 0 && <div className="rounded-xl border border-silver/30 bg-white py-12 text-center text-sm text-gray-500">Không tìm thấy đề phù hợp.</div>}
        </div>
      </div>
    </div>
  );
}
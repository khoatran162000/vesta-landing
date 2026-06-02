// FILE: src/app/bai-tap-tuong-tac/[id]/page.tsx — Khách làm bài PUBLIC (không lưu điểm)
"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";
import { ArrowLeft, Loader2, CheckCircle2, XCircle, Send, RotateCcw, Trophy, Lock } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function PublicDoExercisePage() {
  const { id } = useParams();
  const [exercise, setExercise] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [needLogin, setNeedLogin] = useState(false);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    fetch(`${API_URL}/interactive/${id}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.success) setExercise(d.data);
        else if (d.message?.includes("đăng nhập")) setNeedLogin(true);
      })
      .finally(() => setLoading(false));
  }, [id]);

  function setAnswer(qId: string, value: any) {
    setAnswers((prev) => ({ ...prev, [qId]: value }));
  }

  async function handleSubmit() {
    setSubmitting(true);
    const res = await fetch(`${API_URL}/interactive/${id}/check`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answers }),
    });
    const data = await res.json();
    setSubmitting(false);
    if (data.success) {
      setResult(data.data);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      alert(data.message || "Lỗi chấm bài");
    }
  }

  function handleRetry() {
    setAnswers({});
    setResult(null);
  }

  if (loading)
    return (<><Header /><div className="flex justify-center py-20"><Loader2 size={24} className="animate-spin text-gold" /></div><Footer /></>);

  if (needLogin)
    return (
      <>
        <Header />
        <main className="mx-auto max-w-[700px] px-6 py-20 text-center">
          <Lock size={48} className="mx-auto mb-4 text-amber-600" />
          <h2 className="font-display text-xl font-bold text-royal">Bài tập này dành cho học viên</h2>
          <p className="mt-2 text-sm text-muted">Vui lòng đăng nhập Student Portal để làm bài này, hoặc đăng ký khoá học.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/bai-tap-tuong-tac" className="rounded-full border border-silver/40 px-6 py-2.5 text-sm font-bold text-muted hover:bg-cream-dark">← Bài tập khác</Link>
            <Link href="/dang-ky" className="rounded-full bg-royal px-6 py-2.5 text-sm font-bold text-white hover:bg-royal-mid">Đăng ký học</Link>
          </div>
        </main>
        <Footer />
      </>
    );

  if (!exercise)
    return (<><Header /><main className="mx-auto max-w-[700px] py-20 text-center"><p className="text-muted">Không tìm thấy bài tập.</p><Link href="/bai-tap-tuong-tac" className="mt-4 inline-block text-sm font-semibold text-gold hover:underline">← Quay lại</Link></main><Footer /></>);

  const questions = Array.isArray(exercise.questions) ? exercise.questions : [];
  const allAnswered = questions.every((q: any) => answers[q.id] !== undefined && answers[q.id] !== "");

  return (
    <>
      <Header />
      <main className="mx-auto max-w-[760px] px-6 py-12">
        <Link href="/bai-tap-tuong-tac" className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted hover:text-royal">
          <ArrowLeft size={15} />Quay lại danh sách
        </Link>

        <div className="mb-6">
          <h1 className="font-display text-2xl font-bold text-royal">{exercise.title}</h1>
          {exercise.description && <p className="mt-1 text-sm text-muted">{exercise.description}</p>}
          <p className="mt-1 text-xs text-muted">{questions.length} câu hỏi · Làm thử miễn phí (không lưu điểm)</p>
        </div>

        {result && (
          <div className="mb-6 rounded-2xl border border-gold/30 bg-gradient-to-br from-gold/10 to-amber-50 p-6 text-center">
            <Trophy size={36} className="mx-auto mb-2 text-gold" />
            <p className="text-3xl font-bold text-royal">{result.score}%</p>
            <p className="text-sm text-muted">Đúng {result.correct}/{result.total} câu</p>
            <button onClick={handleRetry} className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-silver/40 px-5 py-2 text-sm font-medium text-muted hover:bg-cream-dark">
              <RotateCcw size={14} />Làm lại
            </button>
          </div>
        )}

        <div className="space-y-4">
          {questions.map((q: any, i: number) => {
            const detail = result?.detail?.find((d: any) => d.id === q.id);
            return (
              <div key={q.id} className="rounded-xl border border-silver/20 bg-white p-5">
                <div className="mb-3 flex items-start gap-2">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-royal/8 text-xs font-bold text-royal">{i + 1}</span>
                  <p className="flex-1 font-medium text-[#1a1a2e]">{q.content}</p>
                  {detail && (detail.isCorrect
                    ? <CheckCircle2 size={20} className="shrink-0 text-green-500" />
                    : <XCircle size={20} className="shrink-0 text-red-500" />)}
                </div>

                {(exercise.type === "QUIZ" || exercise.type === "VOCAB_CHECK") && Array.isArray(q.options) && (
                  <div className="space-y-2 pl-8">
                    {q.options.map((opt: string, j: number) => {
                      const letter = String.fromCharCode(65 + j);
                      const selected = answers[q.id] === letter;
                      const isCorrectAns = detail && detail.correctAnswer === letter;
                      const isWrongPick = detail && selected && !detail.isCorrect;
                      return (
                        <button key={j} disabled={!!result} onClick={() => setAnswer(q.id, letter)}
                          className={`flex w-full items-center gap-2 rounded-lg border px-3 py-2 text-left text-sm transition-colors ${
                            isCorrectAns ? "border-green-400 bg-green-50" :
                            isWrongPick ? "border-red-400 bg-red-50" :
                            selected ? "border-gold bg-gold/10" :
                            "border-silver/30 hover:border-gold/50"
                          } ${result ? "cursor-default" : ""}`}>
                          <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                            selected || isCorrectAns ? "bg-royal text-white" : "bg-cream text-muted"
                          }`}>{letter}</span>
                          <span className="text-[#1a1a2e]">{opt}</span>
                        </button>
                      );
                    })}
                  </div>
                )}

                {exercise.type === "FILL_BLANK" && (
                  <div className="pl-8">
                    <input type="text" disabled={!!result} value={answers[q.id] || ""}
                      onChange={(e) => setAnswer(q.id, e.target.value)} placeholder="Nhập đáp án..."
                      className={`w-full rounded-lg border px-3 py-2 text-sm outline-none ${
                        detail ? (detail.isCorrect ? "border-green-400 bg-green-50" : "border-red-400 bg-red-50") : "border-silver/40 focus:border-gold"
                      }`} />
                    {detail && !detail.isCorrect && (
                      <p className="mt-1 text-xs text-green-600">Đáp án đúng: <strong>{String(detail.correctAnswer)}</strong></p>
                    )}
                  </div>
                )}

                {detail?.explanation && (
                  <div className="mt-3 ml-8 rounded-lg bg-cream/60 px-3 py-2 text-xs text-muted">💡 {detail.explanation}</div>
                )}
              </div>
            );
          })}
        </div>

        {!result && (
          <button onClick={handleSubmit} disabled={submitting || !allAnswered}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold text-white disabled:opacity-60"
            style={{ background: "linear-gradient(135deg, #0F1B3D, #1B2A5B)" }}>
            {submitting ? <><Loader2 size={16} className="animate-spin" />Đang chấm...</> : <><Send size={16} />Nộp bài ({Object.keys(answers).length}/{questions.length})</>}
          </button>
        )}

        {result && (
          <div className="mt-6 rounded-xl border border-gold/30 bg-gold/5 p-5 text-center">
            <p className="text-sm text-muted">Thích bài tập này? Đăng ký khoá học để luyện tập đầy đủ + lưu tiến độ.</p>
            <Link href="/dang-ky" className="mt-3 inline-flex rounded-full bg-royal px-6 py-2 text-sm font-bold text-white hover:bg-royal-mid">Đăng ký học</Link>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}

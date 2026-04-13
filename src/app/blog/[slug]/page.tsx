// FILE: src/app/blog/[slug]/page.tsx — Chi tiết bài viết blog theo design VESTA UNI

"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

/* ────────────────────────── Types ────────────────────────── */
interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  thumbnailUrl?: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  author?: { fullName: string; avatarUrl?: string };
  category?: string;
  tags?: string[];
}

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
const API_BASE = API.replace(/\/api\/?$/, ""); // e.g. http://localhost:5001

/* ────────────────────────── Helper: resolve image URL ────────────────────────── */
function resolveUrl(url?: string | null): string {
  if (!url) return "";
  if (url.startsWith("http")) return url; // already absolute
  return `${API_BASE}${url.startsWith("/") ? "" : "/"}${url}`;
}

/* ────────────────────────── Helper: extract headings for sticky nav ────────────────────────── */
function extractHeadings(html: string): { id: string; text: string }[] {
  if (typeof window === "undefined") return [];
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  const headings: { id: string; text: string }[] = [];
  doc.querySelectorAll("h2, h3").forEach((el, i) => {
    const text = el.textContent?.trim() || "";
    if (text) {
      const id = `section-${i}`;
      headings.push({ id, text });
    }
  });
  return headings;
}

/* ────────────────────────── Helper: inject IDs into content headings ────────────────────────── */
function injectHeadingIds(html: string): string {
  if (typeof window === "undefined") return html;
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  let i = 0;
  doc.querySelectorAll("h2, h3").forEach((el) => {
    el.setAttribute("id", `section-${i}`);
    i++;
  });
  return doc.body.innerHTML;
}

/* ────────────────────────── Format date ────────────────────────── */
function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

/* ────────────────────────── Reading time estimate ────────────────────────── */
function estimateReadingTime(html: string): number {
  const text = html.replace(/<[^>]*>/g, "");
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

/* ════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ════════════════════════════════════════════════════════════ */
export default function BlogDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [headings, setHeadings] = useState<{ id: string; text: string }[]>([]);
  const [activeSection, setActiveSection] = useState<string>("");
  const [showStickyNav, setShowStickyNav] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  /* ── Fetch post — try slug endpoint, then fallback to list filter ── */
  useEffect(() => {
    if (!slug) return;
    setLoading(true);

    const tryFetch = async () => {
      // Route chính: GET /api/posts/detail/:slug
      try {
        const res = await fetch(`${API}/posts/detail/${slug}`);
        if (res.ok) {
          const data = await res.json();
          return data.data || data;
        }
      } catch (err) {
        console.error("Fetch post error:", err);
      }
      return null;
    };

    tryFetch()
      .then((p) => {
        setPost(p);
        if (p) {
          const h = extractHeadings(p.content || "");
          setHeadings(h);
        }
      })
      .finally(() => setLoading(false));
  }, [slug]);

  /* ── Sticky nav visibility + active section tracking ── */
  useEffect(() => {
    const handleScroll = () => {
      // Show sticky nav after hero is out of view
      if (heroRef.current) {
        const heroBottom = heroRef.current.getBoundingClientRect().bottom;
        setShowStickyNav(heroBottom < 0);
      }

      // Track active section
      if (headings.length === 0) return;
      let current = "";
      for (const h of headings) {
        const el = document.getElementById(h.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) current = h.id;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [headings]);

  /* ── Scroll to section ── */
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = headings.length > 0 ? 72 : 0;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  /* ── Loading state ── */
  if (loading) {
    return (
      <div className="min-h-screen bg-[#f7f6f2]">
        <Header />
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="h-10 w-10 animate-spin rounded-full border-[3px] border-gold/30 border-t-gold" />
            <p className="text-sm text-muted">Đang tải bài viết...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  /* ── Not found ── */
  if (!post) {
    return (
      <div className="min-h-screen bg-[#f7f6f2]">
        <Header />
        <div className="flex min-h-[60vh] flex-col items-center justify-center px-6">
          <p className="mb-2 text-6xl">📄</p>
          <h2 className="font-display text-2xl font-bold text-royal">
            Không tìm thấy bài viết
          </h2>
          <p className="mt-2 text-muted">
            Bài viết này không tồn tại hoặc đã bị xoá.
          </p>
          <Link
            href="/blog"
            className="mt-6 rounded-full px-6 py-2.5 text-sm font-bold text-white transition-colors"
            style={{ background: "linear-gradient(135deg, #0F1B3D, #1B2A5B)" }}
          >
            ← Quay lại Blog
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const readingTime = estimateReadingTime(post.content || "");
  const withIds = injectHeadingIds(post.content || "");
  // Resolve relative URLs in content (uploaded images, etc.)
  const processedContent = withIds.replace(
    /src="(\/uploads\/[^"]+)"/g,
    (_, path) => `src="${API_BASE}${path}"`
  );

  return (
    <div className="min-h-screen bg-[#f7f6f2]">
      {/* ═══════════════════ SHARED HEADER ═══════════════════ */}
      <Header />

      {/* ═══════════════════ HERO HEADER ═══════════════════ */}
      <div
        ref={heroRef}
        className="relative overflow-hidden"
        style={{
          background:
            "linear-gradient(165deg, #0A0F1F 0%, #0F1B3D 30%, #1B2A5B 60%, #2A3A6B 100%)",
        }}
      >
        {/* Subtle pattern overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />

        <div className="relative mx-auto max-w-[960px] px-6 pb-12 pt-10">
          {/* Category label */}
          <p
            className="mb-4 text-[0.7rem] font-bold uppercase tracking-[0.25em]"
            style={{ color: "#C9A84C" }}
          >
            VESTA UNI · {post.category || "IELTS TIPS & TRICKS"}
          </p>

          {/* Title */}
          <h1 className="font-display text-[2.2rem] font-bold leading-[1.25] text-white sm:text-[2.8rem]">
            {post.title}
          </h1>

          {/* Section navigation links — scroll to content */}
          {headings.length > 0 && (
            <div className="mt-5 flex flex-wrap items-center gap-x-1 gap-y-1 text-[0.78rem]">
              {headings.map((h, i) => (
                <span key={h.id} className="flex items-center">
                  {i > 0 && <span className="mx-1.5 text-white/20">·</span>}
                  <button
                    onClick={() => scrollTo(h.id)}
                    className="text-white/50 transition-colors hover:text-gold"
                  >
                    {h.text}
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Bottom gold accent line */}
        <div
          className="h-[3px]"
          style={{
            background:
              "linear-gradient(90deg, transparent, #C9A84C, #E8D48B, #C9A84C, transparent)",
          }}
        />
      </div>

      {/* ═══════════════════ STICKY NAVIGATION ═══════════════════ */}
      {headings.length > 2 && (
        <div
          className={`sticky top-0 z-40 border-b border-white/10 transition-all duration-300 ${
            showStickyNav
              ? "translate-y-0 opacity-100"
              : "-translate-y-full opacity-0"
          }`}
          style={{
            background:
              "linear-gradient(135deg, #0F1B3D, #1B2A5B)",
          }}
        >
          <div className="mx-auto max-w-[960px] px-6">
            <nav className="hide-scrollbar flex gap-1 overflow-x-auto py-2.5">
              {headings.map((h) => (
                <button
                  key={h.id}
                  onClick={() => scrollTo(h.id)}
                  className={`shrink-0 rounded-md px-3 py-1.5 text-[0.68rem] font-bold uppercase tracking-[0.1em] transition-colors ${
                    activeSection === h.id
                      ? "bg-white/15 text-gold"
                      : "text-white/60 hover:bg-white/5 hover:text-white/90"
                  }`}
                >
                  {h.text.length > 25 ? h.text.slice(0, 25) + "…" : h.text}
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* ═══════════════════ CONTENT AREA ═══════════════════ */}
      <div className="mx-auto max-w-[960px] px-6 pb-20 pt-10">
        {/* Thumbnail image */}
        {post.thumbnailUrl && (
          <div className="mb-10 overflow-hidden rounded-2xl shadow-[0_4px_30px_rgba(15,27,61,0.1)]">
            <img
              src={resolveUrl(post.thumbnailUrl)}
              alt={post.title}
              className="w-full object-cover"
            />
          </div>
        )}

        {/* Article content — styled via vesta-article class */}
        <article
          ref={contentRef}
          className="vesta-article"
          dangerouslySetInnerHTML={{ __html: processedContent }}
        />

        {/* ── Bottom divider ── */}
        <div className="mx-auto my-14 flex max-w-[600px] items-center justify-center gap-0">
          <span
            className="inline-block h-[5px] w-[5px] shrink-0 rounded-full"
            style={{ background: "#C9A84C" }}
          />
          <div
            className="mx-1 h-[2px] flex-1"
            style={{
              backgroundImage:
                "repeating-linear-gradient(90deg, #C9A84C 0px, #C9A84C 14px, transparent 14px, transparent 20px)",
            }}
          />
          <span className="mx-3 text-xl leading-none">🌤️</span>
          <div
            className="mx-1 h-[2px] flex-1"
            style={{
              backgroundImage:
                "repeating-linear-gradient(90deg, #C9A84C 0px, #C9A84C 14px, transparent 14px, transparent 20px)",
            }}
          />
          <span
            className="inline-block h-[5px] w-[5px] shrink-0 rounded-full"
            style={{ background: "#C9A84C" }}
          />
        </div>

        {/* ── Back to blog ── */}
        <div className="text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-full px-8 py-3 text-[0.82rem] font-bold text-white shadow-lg transition-all hover:shadow-xl"
            style={{
              background: "linear-gradient(135deg, #0F1B3D, #1B2A5B)",
            }}
          >
            ← Quay lại danh sách bài viết
          </Link>
        </div>
      </div>

      {/* ═══════════════════ ARTICLE FOOTER ═══════════════════ */}
      <div
        className="border-t border-white/10 py-4 text-center text-[0.72rem] tracking-[0.1em] text-white/60"
        style={{
          background: "linear-gradient(135deg, #0F1B3D, #1B2A5B)",
        }}
      >
        <span className="font-bold text-gold">VESTA UNI</span>
        <span className="mx-2">·</span>
        60 Hoàng Quốc Việt, Cầu Giấy, Hà Nội
        <span className="mx-2">·</span>
        {post.title}
      </div>

      {/* ═══════════════════ SHARED FOOTER ═══════════════════ */}
      <Footer />

      {/* ═══════════════════ ARTICLE STYLES ═══════════════════ */}
      <style jsx global>{`
        /* ── Hide scrollbar for sticky nav ── */
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        /* ════════════════════════════════════════════
           VESTA ARTICLE — TipTap Content Styling
           ════════════════════════════════════════════ */
        .vesta-article {
          font-family: "Georgia", "Noto Serif", serif;
          font-size: 0.92rem;
          line-height: 1.9;
          color: #1a1a2e;
        }

        /* ── Headings ── */
        .vesta-article h1 {
          font-family: "Cormorant Garamond", "Georgia", serif;
          font-size: 2rem;
          font-weight: 700;
          color: #0F1B3D;
          margin: 2.5rem 0 1rem;
          padding-bottom: 0.5rem;
          border-bottom: 2px solid;
          border-image: linear-gradient(90deg, #C9A84C, #E8D48B, transparent) 1;
        }

        .vesta-article h2 {
          font-family: "Cormorant Garamond", "Georgia", serif;
          font-size: 1.65rem;
          font-weight: 700;
          color: #0F1B3D;
          margin: 2.5rem 0 1rem;
          padding-bottom: 0.4rem;
          border-bottom: 2px solid;
          border-image: linear-gradient(90deg, #C9A84C, #E8D48B, transparent) 1;
          scroll-margin-top: 80px;
        }

        .vesta-article h3 {
          font-family: "Cormorant Garamond", "Georgia", serif;
          font-size: 1.3rem;
          font-weight: 700;
          color: #0F1B3D;
          margin: 2rem 0 0.8rem;
          scroll-margin-top: 80px;
        }

        .vesta-article h4 {
          font-size: 1.05rem;
          font-weight: 700;
          color: #0F1B3D;
          margin: 1.5rem 0 0.6rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        /* ── Paragraphs ── */
        .vesta-article p {
          margin: 0.8rem 0;
        }

        /* ── Strong / Bold ── */
        .vesta-article strong,
        .vesta-article b {
          font-weight: 700;
          color: #0F1B3D;
        }

        /* ── Italic ── */
        .vesta-article em,
        .vesta-article i {
          font-style: italic;
          color: #333;
        }

        /* ── Links ── */
        .vesta-article a {
          color: #C9A84C;
          text-decoration: underline;
          text-decoration-color: #C9A84C40;
          text-underline-offset: 3px;
          transition: all 0.2s;
        }
        .vesta-article a:hover {
          color: #0F1B3D;
          text-decoration-color: #0F1B3D;
        }

        /* ── Unordered lists ── */
        .vesta-article ul {
          margin: 1rem 0;
          padding-left: 0;
          list-style: none;
        }
        .vesta-article ul li {
          position: relative;
          padding-left: 1.5rem;
          margin-bottom: 0.5rem;
        }
        .vesta-article ul li::before {
          content: "";
          position: absolute;
          left: 0;
          top: 0.65em;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #C9A84C;
        }

        /* ── Ordered lists ── */
        .vesta-article ol {
          margin: 1rem 0;
          padding-left: 0;
          list-style: none;
          counter-reset: vesta-counter;
        }
        .vesta-article ol li {
          position: relative;
          padding-left: 2.2rem;
          margin-bottom: 0.6rem;
          counter-increment: vesta-counter;
        }
        .vesta-article ol li::before {
          content: counter(vesta-counter);
          position: absolute;
          left: 0;
          top: 0.15em;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: linear-gradient(135deg, #0F1B3D, #1B2A5B);
          color: #C9A84C;
          font-size: 0.7rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: sans-serif;
        }

        /* ── Blockquotes — styled as info/strategy cards ── */
        .vesta-article blockquote {
          margin: 1.5rem 0;
          padding: 1.2rem 1.5rem;
          border-left: 4px solid;
          border-image: linear-gradient(180deg, #0F1B3D, #1B2A5B) 1;
          background: linear-gradient(135deg, #f8f9fc, #eef1f7);
          border-radius: 0 12px 12px 0;
          font-style: normal;
        }
        .vesta-article blockquote p {
          margin: 0.4rem 0;
          color: #1a1a2e;
        }
        .vesta-article blockquote strong {
          color: #0F1B3D;
        }

        /* ── Code blocks — styled as navy answer bars ── */
        .vesta-article pre {
          margin: 1.5rem 0;
          padding: 1rem 1.5rem;
          background: linear-gradient(135deg, #0F1B3D, #1B2A5B);
          border-radius: 10px;
          overflow-x: auto;
          font-size: 0.82rem;
          line-height: 1.6;
        }
        .vesta-article pre code {
          color: #C9A84C;
          font-family: "JetBrains Mono", "Fira Code", monospace;
          font-size: 0.82rem;
          background: none;
          padding: 0;
          border-radius: 0;
        }

        /* ── Inline code ── */
        .vesta-article code {
          background: #f0ece3;
          color: #C93040;
          padding: 0.15em 0.4em;
          border-radius: 4px;
          font-size: 0.85em;
          font-family: "JetBrains Mono", "Fira Code", monospace;
        }

        /* ── Horizontal rule — gold dashed divider ── */
        .vesta-article hr {
          border: none;
          margin: 2.5rem auto;
          height: 2px;
          max-width: 400px;
          background-image: repeating-linear-gradient(
            90deg,
            #C9A84C 0px,
            #C9A84C 14px,
            transparent 14px,
            transparent 20px
          );
        }

        /* ── Tables ── */
        .vesta-article table {
          width: 100%;
          margin: 1.5rem 0;
          border-collapse: collapse;
          border-radius: 10px;
          overflow: hidden;
          font-size: 0.85rem;
          font-family: sans-serif;
          box-shadow: 0 2px 16px rgba(15, 27, 61, 0.06);
        }
        .vesta-article thead {
          background: linear-gradient(135deg, #0F1B3D, #1B2A5B);
        }
        .vesta-article thead th {
          color: #C9A84C;
          font-weight: 700;
          font-size: 0.78rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          padding: 0.9rem 1rem;
          text-align: left;
          border: none;
        }
        .vesta-article tbody td {
          padding: 0.75rem 1rem;
          border-bottom: 1px solid #e8e5dd;
          color: #1a1a2e;
        }
        .vesta-article tbody tr:nth-child(even) {
          background: #faf9f6;
        }
        .vesta-article tbody tr:last-child td {
          border-bottom: none;
        }

        /* ── Images ── */
        .vesta-article img {
          max-width: 100%;
          height: auto;
          border-radius: 12px;
          margin: 1.5rem 0;
          box-shadow: 0 4px 20px rgba(15, 27, 61, 0.08);
        }

        /* ── Highlighted/marked text ── */
        .vesta-article mark {
          background: linear-gradient(180deg, transparent 50%, #E8D48B60 50%);
          padding: 0 2px;
          color: inherit;
        }

        /* ── YouTube embeds ── */
        .vesta-article iframe {
          width: 100%;
          aspect-ratio: 16/9;
          border-radius: 12px;
          margin: 1.5rem 0;
          border: none;
          box-shadow: 0 4px 20px rgba(15, 27, 61, 0.08);
        }

        /* ── Warning/alert styling for blockquotes starting with ⚠ ── */
        .vesta-article blockquote:has(> p:first-child > strong:first-child) {
          border-image: linear-gradient(180deg, #C9A84C, #E8D48B) 1;
          background: linear-gradient(135deg, #FFF9E6, #FFF5D4);
        }

        /* ── Task lists from TipTap ── */
        .vesta-article ul[data-type="taskList"] {
          padding-left: 0;
        }
        .vesta-article ul[data-type="taskList"] li {
          padding-left: 0;
        }
        .vesta-article ul[data-type="taskList"] li::before {
          display: none;
        }

        /* ── First paragraph — slightly larger ── */
        .vesta-article > p:first-of-type {
          font-size: 1rem;
          line-height: 2;
        }

        /* ── Responsive adjustments ── */
        @media (max-width: 640px) {
          .vesta-article {
            font-size: 0.88rem;
          }
          .vesta-article h1 {
            font-size: 1.5rem;
          }
          .vesta-article h2 {
            font-size: 1.35rem;
          }
          .vesta-article h3 {
            font-size: 1.15rem;
          }
          .vesta-article table {
            font-size: 0.78rem;
          }
          .vesta-article thead th,
          .vesta-article tbody td {
            padding: 0.6rem 0.7rem;
          }
        }
      `}</style>
    </div>
  );
}
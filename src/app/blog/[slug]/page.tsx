/**
 * FILE: page.tsx
 * PATH: apps/landing/src/app/blog/[slug]/page.tsx
 * MÔ TẢ: Chi tiết bài viết (public) — đọc từ API thật + bài viết liên quan
 */

"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ArrowLeft, Clock, User, Loader2 } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  thumbnailUrl: string | null;
  tags: string[];
  status: string;
  createdAt: string;
  author: { fullName: string; avatarUrl: string | null };
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()}`;
}

function getImageUrl(url: string | null) {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  return `${API_URL?.replace("/api", "")}${url}`;
}

function estimateReadTime(html: string) {
  const text = html.replace(/<[^>]*>/g, "");
  const words = text.split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.ceil(words / 200))} phút đọc`;
}

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [related, setRelated] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function fetchPost() {
      try {
        const res = await fetch(`${API_URL}/posts/detail/${slug}`);
        const data = await res.json();
        if (data.success) {
          setPost(data.data);
        } else {
          setNotFound(true);
        }
      } catch {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    }

    async function fetchRelated() {
      try {
        const res = await fetch(`${API_URL}/posts?status=PUBLISHED&limit=4`);
        const data = await res.json();
        if (data.success) {
          setRelated(data.data.filter((p: Post) => p.slug !== slug).slice(0, 3));
        }
      } catch {}
    }

    fetchPost();
    fetchRelated();
  }, [slug]);

  if (loading) {
    return (
      <>
        <Header />
        <div className="flex min-h-[60vh] items-center justify-center">
          <Loader2 size={28} className="animate-spin text-gold" />
        </div>
        <Footer />
      </>
    );
  }

  if (notFound || !post) {
    return (
      <>
        <Header />
        <main className="mx-auto flex min-h-[60vh] max-w-[1200px] items-center justify-center px-6 py-16">
          <div className="text-center">
            <h2 className="font-display text-3xl font-bold text-royal">Bài viết không tồn tại</h2>
            <p className="mt-3 text-muted">Bài viết bạn tìm kiếm không tồn tại hoặc đã bị xoá.</p>
            <Link href="/blog" className="cta-btn mt-6 inline-flex text-sm"><ArrowLeft size={16} />Quay lại Blog</Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const readTime = estimateReadTime(post.content);

  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <div className="relative overflow-hidden px-6 py-16 text-center"
          style={{ background: "linear-gradient(170deg, #1B2A5B 0%, #243778 50%, #2E4494 100%)" }}>
          <div className="relative z-10 mx-auto max-w-[720px]">
            <div className="mb-4 flex flex-wrap items-center justify-center gap-2">
              {(post.tags || []).map((tag) => (
                <span key={tag} className="rounded-full bg-gold/15 px-3 py-1 text-xs font-semibold text-gold-light">{tag}</span>
              ))}
            </div>
            <h1 className="font-display text-[clamp(1.8rem,4vw,2.8rem)] font-bold leading-tight text-white">{post.title}</h1>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-5 text-sm text-silver-light">
              <span className="flex items-center gap-1.5"><User size={14} />{post.author?.fullName}</span>
              <span className="flex items-center gap-1.5"><Clock size={14} />{readTime}</span>
              <span>{formatDate(post.createdAt)}</span>
            </div>
          </div>
        </div>

        {/* Thumbnail */}
        {post.thumbnailUrl && (
          <div className="mx-auto -mt-8 max-w-[840px] px-6">
            <img src={getImageUrl(post.thumbnailUrl)} alt={post.title}
              className="w-full rounded-2xl object-cover shadow-lg" style={{ aspectRatio: "16/9" }} />
          </div>
        )}

        {/* Content */}
        <article className="mx-auto max-w-[720px] px-6 py-12">
          <div className="prose prose-lg max-w-none
            prose-headings:font-display prose-headings:text-royal prose-headings:mt-10 prose-headings:mb-4
            prose-h2:text-2xl prose-h3:text-xl
            prose-p:text-[#1a1a2e] prose-p:leading-[1.8]
            prose-a:text-royal prose-a:underline prose-a:decoration-gold/40 hover:prose-a:decoration-gold
            prose-strong:text-royal prose-strong:font-semibold
            prose-ul:my-4 prose-li:text-[#1a1a2e] prose-li:leading-[1.8]
            prose-blockquote:border-l-4 prose-blockquote:border-l-gold prose-blockquote:bg-cream prose-blockquote:rounded-r-xl prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:not-italic prose-blockquote:text-royal/80
            prose-img:rounded-xl prose-img:shadow-md
            prose-hr:border-silver/30"
            dangerouslySetInnerHTML={{ __html: post.content }} />
        </article>

        {/* Back + CTA */}
        <div className="mx-auto max-w-[720px] px-6 pb-8">
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-silver/30 bg-white p-6">
            <Link href="/blog" className="flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-royal">
              <ArrowLeft size={16} />Quay lại Blog
            </Link>
            <a href="https://goo.gl/xahbn4" target="_blank" rel="noopener noreferrer" className="cta-btn text-sm">
              Đăng ký học tại VESTA
            </a>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mx-auto max-w-[1200px] px-6 pb-16">
            <h3 className="mb-8 text-center font-display text-2xl font-bold text-royal">Bài viết liên quan</h3>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {related.map((r) => (
                <Link key={r.id} href={`/blog/${r.slug}`}
                  className="group overflow-hidden rounded-xl border border-silver/30 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <div className="aspect-[16/10] overflow-hidden">
                    {r.thumbnailUrl && (
                      <img src={getImageUrl(r.thumbnailUrl)} alt={r.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    )}
                  </div>
                  <div className="p-5">
                    <h4 className="font-display text-lg font-bold leading-snug text-royal transition-colors group-hover:text-gold line-clamp-2">{r.title}</h4>
                    <p className="mt-2 text-xs text-muted">{formatDate(r.createdAt)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
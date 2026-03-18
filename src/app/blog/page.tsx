/**
 * FILE: page.tsx
 * PATH: apps/landing/src/app/blog/page.tsx
 */

"use client";

import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { usePostStore } from "@/lib/mockPosts";
import { Clock, User, ArrowRight } from "lucide-react";

export default function BlogPage() {
  const allPosts = usePostStore((s) => s.posts);
  const posts = allPosts.filter((p) => p.status === "PUBLISHED");

  return (
    <>
      <Header />
      <main className="mx-auto max-w-[1200px] px-6 py-16">
        <div className="mb-12 text-center">
          <h2 className="font-display text-[2.5rem] font-bold text-royal">IELTS Tips &amp; Blog</h2>
          <p className="mx-auto mt-3 max-w-[560px] text-muted">
            Chia sẻ kiến thức, phương pháp và kinh nghiệm luyện thi IELTS từ đội ngũ giáo viên VESTA Academy.
          </p>
          <div className="mx-auto mt-4 h-[2px] w-[60px] bg-gradient-to-r from-gold to-gold-light" />
        </div>

        {posts.length === 0 && (
          <div className="py-20 text-center text-muted">Chưa có bài viết nào được xuất bản.</div>
        )}

        {posts.length > 0 && (
          <Link href={`/blog/${posts[0].slug}`}
            className="group mb-12 block overflow-hidden rounded-2xl border border-silver/30 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(15,27,61,0.1)]">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="aspect-[16/10] overflow-hidden md:aspect-auto">
                <img src={posts[0].thumbnailUrl} alt={posts[0].title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="flex flex-col justify-center p-8">
                <div className="mb-3 flex flex-wrap gap-2">
                  {posts[0].tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-royal/8 px-3 py-1 text-xs font-semibold text-royal">{tag}</span>
                  ))}
                </div>
                <h3 className="font-display text-2xl font-bold leading-tight text-royal transition-colors group-hover:text-gold">{posts[0].title}</h3>
                <p className="mt-3 text-[0.9rem] leading-relaxed text-muted line-clamp-3">{posts[0].excerpt}</p>
                <div className="mt-5 flex items-center gap-4 text-xs text-muted">
                  <span className="flex items-center gap-1.5"><User size={13} />{posts[0].author}</span>
                  <span className="flex items-center gap-1.5"><Clock size={13} />{posts[0].readTime}</span>
                  <span>{posts[0].createdAt}</span>
                </div>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-gold transition-colors group-hover:text-gold-bright">
                  Đọc bài viết <ArrowRight size={14} />
                </span>
              </div>
            </div>
          </Link>
        )}

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.slice(1).map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`}
              className="group overflow-hidden rounded-2xl border border-silver/30 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(15,27,61,0.1)]">
              <div className="aspect-[16/10] overflow-hidden">
                <img src={post.thumbnailUrl} alt={post.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="p-6">
                <div className="mb-2.5 flex flex-wrap gap-1.5">
                  {post.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-royal/8 px-2.5 py-0.5 text-[0.65rem] font-semibold text-royal">{tag}</span>
                  ))}
                </div>
                <h3 className="font-display text-xl font-bold leading-snug text-royal transition-colors group-hover:text-gold">{post.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted line-clamp-2">{post.excerpt}</p>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs text-muted">
                    <span className="flex items-center gap-1"><Clock size={12} />{post.readTime}</span>
                    <span>{post.createdAt}</span>
                  </div>
                  <span className="text-xs font-semibold text-gold transition-colors group-hover:text-gold-bright">Đọc thêm →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
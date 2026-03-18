/**
 * FILE: page.tsx
 * PATH: apps/landing/src/app/quan-tri/bai-viet/page.tsx
 * MÔ TẢ: Danh sách bài viết CRUD — hiển thị tất cả fields, xoá có xác nhận, filter trạng thái
 */
 
"use client";
 
import { useState } from "react";
import Link from "next/link";
import { Plus, Pencil, Trash2, Eye, ExternalLink, Search, Filter } from "lucide-react";
import { usePostStore } from "@/lib/mockPosts";
 
export default function PostListPage() {
  const { posts, remove } = usePostStore();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"ALL" | "PUBLISHED" | "DRAFT">("ALL");
  const [deleteId, setDeleteId] = useState<string | null>(null);
 
  // Filter posts
  const filtered = posts.filter((post) => {
    const matchSearch =
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    const matchStatus = statusFilter === "ALL" || post.status === statusFilter;
    return matchSearch && matchStatus;
  });
 
  function handleDelete(id: string) {
    remove(id);
    setDeleteId(null);
  }
 
  return (
    <div className="mx-auto max-w-[1100px]">
      {/* Page header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold text-royal">Bài viết</h2>
          <p className="mt-1 text-sm text-muted">
            {posts.length} bài viết · {posts.filter((p) => p.status === "PUBLISHED").length} đã xuất bản
          </p>
        </div>
        <Link href="/quan-tri/bai-viet/tao-moi" className="cta-btn gap-1.5 text-sm">
          <Plus size={16} />
          Tạo bài viết
        </Link>
      </div>
 
      {/* Search + Filter */}
      <div className="mb-6 flex flex-wrap gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm theo tiêu đề hoặc tag..."
            className="w-full rounded-lg border border-silver/40 bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition-colors focus:border-gold focus:ring-1 focus:ring-gold/30"
          />
        </div>
        <div className="flex items-center gap-1.5 rounded-lg border border-silver/40 bg-white px-3">
          <Filter size={14} className="text-muted" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as "ALL" | "PUBLISHED" | "DRAFT")}
            className="border-none bg-transparent py-2.5 text-sm outline-none"
          >
            <option value="ALL">Tất cả</option>
            <option value="PUBLISHED">Đã xuất bản</option>
            <option value="DRAFT">Bản nháp</option>
          </select>
        </div>
      </div>
 
      {/* Posts table */}
      <div className="overflow-hidden rounded-xl border border-silver/30 bg-white">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-silver/20 bg-cream">
              <th className="px-5 py-3.5 font-semibold text-royal">Bài viết</th>
              <th className="hidden px-5 py-3.5 font-semibold text-royal md:table-cell">Tags</th>
              <th className="px-5 py-3.5 font-semibold text-royal">Trạng thái</th>
              <th className="hidden px-5 py-3.5 font-semibold text-royal sm:table-cell">Ngày tạo</th>
              <th className="px-5 py-3.5 text-right font-semibold text-royal">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((post) => (
              <tr key={post.id} className="border-b border-silver/10 transition-colors hover:bg-cream/50">
                {/* Bài viết: thumbnail + title + excerpt */}
                <td className="px-5 py-4">
                  <div className="flex items-start gap-3">
                    {post.thumbnailUrl && (
                      <img
                        src={post.thumbnailUrl}
                        alt=""
                        className="hidden h-12 w-20 shrink-0 rounded-lg object-cover sm:block"
                      />
                    )}
                    <div className="min-w-0">
                      <p className="font-medium text-[#1a1a2e] line-clamp-1">{post.title}</p>
                      <p className="mt-0.5 text-xs text-muted line-clamp-1">{post.excerpt}</p>
                    </div>
                  </div>
                </td>
 
                {/* Tags */}
                <td className="hidden px-5 py-4 md:table-cell">
                  <div className="flex flex-wrap gap-1">
                    {post.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="rounded-full bg-royal/8 px-2 py-0.5 text-[0.65rem] font-semibold text-royal">
                        {tag}
                      </span>
                    ))}
                    {post.tags.length > 2 && (
                      <span className="text-[0.65rem] text-muted">+{post.tags.length - 2}</span>
                    )}
                  </div>
                </td>
 
                {/* Trạng thái */}
                <td className="px-5 py-4">
                  <span
                    className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                      post.status === "PUBLISHED"
                        ? "bg-green-50 text-green-700"
                        : "bg-amber-50 text-amber-700"
                    }`}
                  >
                    {post.status === "PUBLISHED" ? "Đã xuất bản" : "Bản nháp"}
                  </span>
                </td>
 
                {/* Ngày tạo + Thời gian đọc */}
                <td className="hidden px-5 py-4 sm:table-cell">
                  <p className="text-sm text-[#1a1a2e]">{post.createdAt}</p>
                  <p className="text-xs text-muted">{post.readTime}</p>
                </td>
 
                {/* Thao tác */}
                <td className="px-5 py-4">
                  <div className="flex items-center justify-end gap-1">
                    {post.status === "PUBLISHED" && (
                      <Link
                        href={`/blog/${post.slug}`}
                        target="_blank"
                        className="rounded-lg p-2 text-muted transition-colors hover:bg-cream-dark hover:text-royal"
                        title="Xem trên website"
                      >
                        <ExternalLink size={15} />
                      </Link>
                    )}
                    <Link
                      href={`/quan-tri/bai-viet/${post.id}`}
                      className="rounded-lg p-2 text-muted transition-colors hover:bg-cream-dark hover:text-royal"
                      title="Chỉnh sửa"
                    >
                      <Pencil size={15} />
                    </Link>
                    <button
                      onClick={() => setDeleteId(post.id)}
                      className="rounded-lg p-2 text-muted transition-colors hover:bg-red-50 hover:text-red-600"
                      title="Xoá"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
 
        {filtered.length === 0 && (
          <div className="px-5 py-16 text-center text-muted">
            {search || statusFilter !== "ALL"
              ? "Không tìm thấy bài viết nào phù hợp."
              : "Chưa có bài viết nào. Bấm \"Tạo bài viết\" để bắt đầu."}
          </div>
        )}
      </div>
 
      {/* Delete confirmation modal */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy/40 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h3 className="font-display text-xl font-bold text-royal">Xác nhận xoá</h3>
            <p className="mt-2 text-sm text-muted">
              Bạn có chắc muốn xoá bài viết <strong className="text-[#1a1a2e]">
                &quot;{posts.find((p) => p.id === deleteId)?.title}&quot;
              </strong>? Hành động này không thể hoàn tác.
            </p>
            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="rounded-lg border border-silver/40 px-4 py-2 text-sm font-medium text-muted transition-colors hover:bg-cream-dark"
              >
                Huỷ
              </button>
              <button
                onClick={() => handleDelete(deleteId)}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700"
              >
                Xoá bài viết
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
 
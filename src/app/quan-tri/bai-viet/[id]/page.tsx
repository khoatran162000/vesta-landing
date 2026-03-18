/**
 * FILE: page.tsx
 * PATH: apps/landing/src/app/quan-tri/bai-viet/[id]/page.tsx
 * MÔ TẢ: Chỉnh sửa bài viết — load data có sẵn vào form, cập nhật qua Zustand store
 */
 
"use client";
 
import { useState, useRef, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Save, ImagePlus, X, Plus } from "lucide-react";
import Link from "next/link";
import { RichTextEditor } from "@/components/blog/RichTextEditor";
import { usePostStore } from "@/lib/mockPosts";
 
export default function EditPostPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { getById, update } = usePostStore();
  const post = getById(id);
 
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState<"DRAFT" | "PUBLISHED">("DRAFT");
  const [thumbnail, setThumbnail] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [saving, setSaving] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const thumbnailInputRef = useRef<HTMLInputElement>(null);
 
  // Load post data vào form
  useEffect(() => {
    if (post && !loaded) {
      setTitle(post.title);
      setExcerpt(post.excerpt);
      setContent(post.content);
      setStatus(post.status);
      setThumbnail(post.thumbnailUrl);
      setTags([...post.tags]);
      setLoaded(true);
    }
  }, [post, loaded]);
 
  // === Tags ===
  function addTag() {
    const tag = tagInput.trim();
    if (!tag || tags.includes(tag)) return;
    setTags([...tags, tag]);
    setTagInput("");
  }
 
  function removeTag(tag: string) {
    setTags(tags.filter((t) => t !== tag));
  }
 
  function handleTagKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag();
    }
  }
 
  // === Thumbnail ===
  function handleThumbnail(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setThumbnail(reader.result as string);
    reader.readAsDataURL(file);
    e.target.value = "";
  }
 
  // === Save ===
  function handleSave() {
    if (!title.trim()) return;
    setSaving(true);
 
    update(id, {
      title: title.trim(),
      excerpt: excerpt.trim(),
      content,
      thumbnailUrl: thumbnail,
      tags,
      status,
    });
 
    setTimeout(() => {
      setSaving(false);
      router.push("/quan-tri/bai-viet");
    }, 500);
  }
 
  // Not found
  if (!post) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="text-center">
          <h2 className="font-display text-2xl font-bold text-royal">Bài viết không tồn tại</h2>
          <p className="mt-2 text-muted">Bài viết với ID &quot;{id}&quot; không được tìm thấy.</p>
          <Link href="/quan-tri/bai-viet" className="cta-btn mt-4 inline-flex text-sm">
            <ArrowLeft size={16} />Quay lại danh sách
          </Link>
        </div>
      </div>
    );
  }
 
  return (
    <div className="mx-auto max-w-[900px]">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/quan-tri/bai-viet" className="rounded-lg p-2 text-muted transition-colors hover:bg-cream-dark hover:text-royal">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h2 className="font-display text-2xl font-bold text-royal">Chỉnh sửa bài viết</h2>
            <p className="text-xs text-muted">ID: {id} · Slug: {post.slug}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <select value={status} onChange={(e) => setStatus(e.target.value as "DRAFT" | "PUBLISHED")}
            className="rounded-lg border border-silver/40 bg-cream px-3 py-2 text-sm outline-none focus:border-gold">
            <option value="DRAFT">Bản nháp</option>
            <option value="PUBLISHED">Xuất bản</option>
          </select>
          <button onClick={handleSave} disabled={saving || !title.trim()}
            className="cta-btn gap-1.5 text-sm disabled:opacity-60">
            <Save size={16} />{saving ? "Đang lưu..." : "Cập nhật"}
          </button>
        </div>
      </div>
 
      <div className="space-y-6">
        {/* Tiêu đề */}
        <div className="rounded-xl border border-silver/30 bg-white p-6">
          <label className="mb-1.5 block text-sm font-medium text-royal">Tiêu đề bài viết <span className="text-red-500">*</span></label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-lg border border-silver/40 bg-cream px-4 py-3 text-base outline-none transition-colors focus:border-gold focus:ring-1 focus:ring-gold/30" />
        </div>
 
        {/* Mô tả ngắn */}
        <div className="rounded-xl border border-silver/30 bg-white p-6">
          <label className="mb-1.5 block text-sm font-medium text-royal">Mô tả ngắn (excerpt)</label>
          <textarea value={excerpt} onChange={(e) => setExcerpt(e.target.value)}
            placeholder="Tóm tắt nội dung bài viết trong 1-2 câu."
            rows={3}
            className="w-full resize-none rounded-lg border border-silver/40 bg-cream px-4 py-3 text-sm outline-none transition-colors focus:border-gold focus:ring-1 focus:ring-gold/30" />
          <p className="mt-1 text-xs text-muted">{excerpt.length}/300 ký tự</p>
        </div>
 
        {/* Tags */}
        <div className="rounded-xl border border-silver/30 bg-white p-6">
          <label className="mb-1.5 block text-sm font-medium text-royal">Tags</label>
          <div className="flex flex-wrap items-center gap-2 rounded-lg border border-silver/40 bg-cream px-3 py-2">
            {tags.map((tag) => (
              <span key={tag} className="flex items-center gap-1 rounded-full bg-royal/10 px-3 py-1 text-xs font-semibold text-royal">
                {tag}
                <button onClick={() => removeTag(tag)} className="ml-0.5 rounded-full p-0.5 transition-colors hover:bg-royal/20">
                  <X size={12} />
                </button>
              </span>
            ))}
            <input type="text" value={tagInput} onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleTagKeyDown} placeholder="Thêm tag..."
              className="min-w-[120px] flex-1 border-none bg-transparent py-1 text-sm outline-none" />
            {tagInput.trim() && (
              <button onClick={addTag} className="rounded-full bg-gold/15 p-1.5 text-gold transition-colors hover:bg-gold/25">
                <Plus size={14} />
              </button>
            )}
          </div>
        </div>
 
        {/* Thumbnail */}
        <div className="rounded-xl border border-silver/30 bg-white p-6">
          <label className="mb-3 block text-sm font-medium text-royal">Ảnh đại diện (thumbnail)</label>
          {thumbnail ? (
            <div className="relative inline-block">
              <img src={thumbnail} alt="Thumbnail" className="h-48 rounded-lg object-cover shadow-sm" />
              <button onClick={() => setThumbnail("")}
                className="absolute -right-2 -top-2 rounded-full bg-red-500 p-1 text-white shadow-md transition-transform hover:scale-110">
                <X size={14} />
              </button>
            </div>
          ) : (
            <button onClick={() => thumbnailInputRef.current?.click()}
              className="flex h-48 w-full items-center justify-center rounded-lg border-2 border-dashed border-silver/40 bg-cream transition-colors hover:border-gold/40 hover:bg-gold/5">
              <div className="text-center">
                <ImagePlus size={32} className="mx-auto mb-2 text-muted" />
                <p className="text-sm font-medium text-muted">Bấm để chọn ảnh thumbnail</p>
              </div>
            </button>
          )}
          <input ref={thumbnailInputRef} type="file" accept="image/*" className="hidden" onChange={handleThumbnail} />
        </div>
 
        {/* Nội dung — TipTap Editor */}
        <div className="rounded-xl border border-silver/30 bg-white p-6">
          <label className="mb-3 block text-sm font-medium text-royal">Nội dung bài viết</label>
          {loaded && <RichTextEditor content={content} onChange={setContent} />}
        </div>
      </div>
    </div>
  );
}
 
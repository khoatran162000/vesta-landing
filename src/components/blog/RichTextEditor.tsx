"use client";
 
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Color from "@tiptap/extension-color";
import { TextStyle } from "@tiptap/extension-text-style";
import Highlight from "@tiptap/extension-highlight";
import Youtube from "@tiptap/extension-youtube";
import { useCallback, useRef } from "react";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Quote,
  Minus,
  Link as LinkIcon,
  Unlink,
  ImagePlus,
  Video,
  Highlighter,
  Undo,
  Redo,
  Code,
  Palette,
} from "lucide-react";
 
interface RichTextEditorProps {
  content: string;
  onChange: (html: string) => void;
  placeholder?: string;
}
 
export function RichTextEditor({
  content,
  onChange,
  placeholder = "Viết nội dung bài viết tại đây...",
}: RichTextEditorProps) {
  const imageInputRef = useRef<HTMLInputElement>(null);
 
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      Underline,
      TextStyle,
      Color,
      Highlight.configure({ multicolor: true }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { class: "text-royal underline hover:text-gold" },
      }),
      Image.configure({
        HTMLAttributes: { class: "rounded-lg max-w-full mx-auto my-4" },
        allowBase64: true,
      }),
      Youtube.configure({
        HTMLAttributes: { class: "rounded-lg overflow-hidden my-4 mx-auto" },
        width: 640,
        height: 360,
      }),
      Placeholder.configure({ placeholder }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "min-h-[400px] px-5 py-4 outline-none prose prose-sm max-w-none " +
          "prose-headings:font-display prose-headings:text-royal " +
          "prose-p:text-[#1a1a2e] prose-p:leading-relaxed " +
          "prose-a:text-royal prose-a:underline " +
          "prose-blockquote:border-l-gold prose-blockquote:bg-cream/50 prose-blockquote:rounded-r-lg prose-blockquote:py-1 prose-blockquote:px-4 " +
          "prose-img:rounded-lg prose-img:shadow-sm " +
          "prose-code:bg-cream-dark prose-code:rounded prose-code:px-1.5 prose-code:py-0.5 prose-code:text-sm",
      },
    },
  });
 
  // === Chèn ảnh ===
  const handleImageUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (!files || !editor) return;
 
      Array.from(files).forEach((file) => {
        if (!file.type.startsWith("image/")) return;
 
        // TODO: Khi có Backend, thay bằng upload lên server:
        // const formData = new FormData();
        // formData.append("file", file);
        // const res = await fetch(`${API_URL}/upload`, { method: "POST", body: formData });
        // const { url } = await res.json();
        // editor.chain().focus().setImage({ src: url }).run();
 
        // Hiện tại: preview local bằng base64
        const reader = new FileReader();
        reader.onload = () => {
          editor
            .chain()
            .focus()
            .setImage({ src: reader.result as string, alt: file.name })
            .run();
        };
        reader.readAsDataURL(file);
      });
 
      // Reset input để có thể chọn lại cùng file
      e.target.value = "";
    },
    [editor]
  );
 
  // === Nhúng video YouTube ===
  const addYoutubeVideo = useCallback(() => {
    if (!editor) return;
    const url = prompt("Dán link YouTube vào đây:");
    if (!url) return;
 
    // Validate YouTube URL
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?v=|embed\/|shorts\/)|youtu\.be\/)/;
    if (!youtubeRegex.test(url)) {
      alert("Link không hợp lệ. Vui lòng dán link YouTube (youtube.com hoặc youtu.be).");
      return;
    }
 
    editor.commands.setYoutubeVideo({ src: url });
  }, [editor]);
 
  // === Chèn link ===
  const addLink = useCallback(() => {
    if (!editor) return;
    const previousUrl = editor.getAttributes("link").href;
    const url = prompt("Nhập URL:", previousUrl || "https://");
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);
 
  // === Đổi màu chữ ===
  const setColor = useCallback(() => {
    if (!editor) return;
    const color = prompt("Nhập mã màu (ví dụ: #C9A84C, red, blue):", "#1B2A5B");
    if (!color) return;
    editor.chain().focus().setColor(color).run();
  }, [editor]);
 
  if (!editor) return null;
 
  return (
    <div className="overflow-hidden rounded-lg border border-silver/40 bg-white">
      {/* ═══════════════ TOOLBAR ═══════════════ */}
      <div className="flex flex-wrap items-center gap-0.5 border-b border-silver/30 bg-cream px-2 py-1.5">
        {/* Undo / Redo */}
        <ToolbarGroup>
          <ToolbarBtn
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            title="Hoàn tác (Ctrl+Z)"
          >
            <Undo size={15} />
          </ToolbarBtn>
          <ToolbarBtn
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            title="Làm lại (Ctrl+Y)"
          >
            <Redo size={15} />
          </ToolbarBtn>
        </ToolbarGroup>
 
        <ToolbarDivider />
 
        {/* Headings */}
        <ToolbarGroup>
          <ToolbarBtn
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            active={editor.isActive("heading", { level: 1 })}
            title="Tiêu đề 1"
          >
            <Heading1 size={15} />
          </ToolbarBtn>
          <ToolbarBtn
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            active={editor.isActive("heading", { level: 2 })}
            title="Tiêu đề 2"
          >
            <Heading2 size={15} />
          </ToolbarBtn>
          <ToolbarBtn
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            active={editor.isActive("heading", { level: 3 })}
            title="Tiêu đề 3"
          >
            <Heading3 size={15} />
          </ToolbarBtn>
        </ToolbarGroup>
 
        <ToolbarDivider />
 
        {/* Text formatting */}
        <ToolbarGroup>
          <ToolbarBtn
            onClick={() => editor.chain().focus().toggleBold().run()}
            active={editor.isActive("bold")}
            title="In đậm (Ctrl+B)"
          >
            <Bold size={15} />
          </ToolbarBtn>
          <ToolbarBtn
            onClick={() => editor.chain().focus().toggleItalic().run()}
            active={editor.isActive("italic")}
            title="In nghiêng (Ctrl+I)"
          >
            <Italic size={15} />
          </ToolbarBtn>
          <ToolbarBtn
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            active={editor.isActive("underline")}
            title="Gạch chân (Ctrl+U)"
          >
            <UnderlineIcon size={15} />
          </ToolbarBtn>
          <ToolbarBtn
            onClick={() => editor.chain().focus().toggleStrike().run()}
            active={editor.isActive("strike")}
            title="Gạch ngang"
          >
            <Strikethrough size={15} />
          </ToolbarBtn>
          <ToolbarBtn
            onClick={() => editor.chain().focus().toggleCode().run()}
            active={editor.isActive("code")}
            title="Code inline"
          >
            <Code size={15} />
          </ToolbarBtn>
        </ToolbarGroup>
 
        <ToolbarDivider />
 
        {/* Color & Highlight */}
        <ToolbarGroup>
          <ToolbarBtn onClick={setColor} title="Đổi màu chữ">
            <Palette size={15} />
          </ToolbarBtn>
          <ToolbarBtn
            onClick={() => editor.chain().focus().toggleHighlight({ color: "#FEF08A" }).run()}
            active={editor.isActive("highlight")}
            title="Tô sáng vàng"
          >
            <Highlighter size={15} />
          </ToolbarBtn>
        </ToolbarGroup>
 
        <ToolbarDivider />
 
        {/* Alignment */}
        <ToolbarGroup>
          <ToolbarBtn
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
            active={editor.isActive({ textAlign: "left" })}
            title="Căn trái"
          >
            <AlignLeft size={15} />
          </ToolbarBtn>
          <ToolbarBtn
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
            active={editor.isActive({ textAlign: "center" })}
            title="Căn giữa"
          >
            <AlignCenter size={15} />
          </ToolbarBtn>
          <ToolbarBtn
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
            active={editor.isActive({ textAlign: "right" })}
            title="Căn phải"
          >
            <AlignRight size={15} />
          </ToolbarBtn>
        </ToolbarGroup>
 
        <ToolbarDivider />
 
        {/* Lists & Block */}
        <ToolbarGroup>
          <ToolbarBtn
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            active={editor.isActive("bulletList")}
            title="Danh sách"
          >
            <List size={15} />
          </ToolbarBtn>
          <ToolbarBtn
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            active={editor.isActive("orderedList")}
            title="Danh sách số"
          >
            <ListOrdered size={15} />
          </ToolbarBtn>
          <ToolbarBtn
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            active={editor.isActive("blockquote")}
            title="Trích dẫn"
          >
            <Quote size={15} />
          </ToolbarBtn>
          <ToolbarBtn
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
            title="Đường kẻ ngang"
          >
            <Minus size={15} />
          </ToolbarBtn>
        </ToolbarGroup>
 
        <ToolbarDivider />
 
        {/* Link */}
        <ToolbarGroup>
          <ToolbarBtn
            onClick={addLink}
            active={editor.isActive("link")}
            title="Chèn link"
          >
            <LinkIcon size={15} />
          </ToolbarBtn>
          {editor.isActive("link") && (
            <ToolbarBtn
              onClick={() => editor.chain().focus().unsetLink().run()}
              title="Xoá link"
            >
              <Unlink size={15} />
            </ToolbarBtn>
          )}
        </ToolbarGroup>
 
        <ToolbarDivider />
 
        {/* Image & Video */}
        <ToolbarGroup>
          <ToolbarBtn
            onClick={() => imageInputRef.current?.click()}
            title="Chèn ảnh (chọn 1 hoặc nhiều ảnh)"
          >
            <ImagePlus size={15} />
          </ToolbarBtn>
          <ToolbarBtn onClick={addYoutubeVideo} title="Nhúng video YouTube">
            <Video size={15} />
          </ToolbarBtn>
        </ToolbarGroup>
      </div>
 
      {/* Hidden file input cho upload ảnh */}
      <input
        ref={imageInputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={handleImageUpload}
      />
 
      {/* ═══════════════ EDITOR CONTENT ═══════════════ */}
      <EditorContent editor={editor} />
 
      {/* ═══════════════ FOOTER INFO ═══════════════ */}
      <div className="flex items-center justify-between border-t border-silver/20 bg-cream px-4 py-2">
        <p className="text-xs text-muted">
          Tip: Bôi đen text để thấy thanh công cụ nhanh · Kéo thả ảnh vào editor cũng được
        </p>
        <p className="text-xs text-muted">
          {editor.storage.characterCount?.characters?.() ?? 0} ký tự
        </p>
      </div>
    </div>
  );
}
 
/* ═══════════════ TOOLBAR SUB-COMPONENTS ═══════════════ */
 
function ToolbarBtn({
  onClick,
  active,
  disabled,
  title,
  children,
}: {
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`rounded p-1.5 transition-colors ${
        active
          ? "bg-royal/10 text-royal"
          : "text-muted hover:bg-silver/20 hover:text-royal"
      } ${disabled ? "cursor-not-allowed opacity-30" : ""}`}
    >
      {children}
    </button>
  );
}
 
function ToolbarGroup({ children }: { children: React.ReactNode }) {
  return <div className="flex items-center gap-0.5">{children}</div>;
}
 
function ToolbarDivider() {
  return <div className="mx-1 h-5 w-px bg-silver/40" />;
}
 
/**
 * FILE: mockPosts.ts
 * PATH: apps/landing/src/lib/mockPosts.ts
 * MÔ TẢ: Dữ liệu bài viết mẫu + Zustand store quản lý CRUD
 *         Khi có Backend API → xoá file này, thay bằng React Query hooks gọi API
 */
 
import { create } from "zustand";
 
// ═══════════════════════ INTERFACE ═══════════════════════
 
export interface MockPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  thumbnailUrl: string;
  author: string;
  createdAt: string;
  readTime: string;
  tags: string[];
  status: "DRAFT" | "PUBLISHED";
}
 
// Dữ liệu form khi tạo/sửa bài viết (không có id, createdAt — tự sinh)
export interface PostFormData {
  title: string;
  excerpt: string;
  content: string;
  thumbnailUrl: string;
  tags: string[];
  status: "DRAFT" | "PUBLISHED";
}
 
// ═══════════════════════ DỮ LIỆU MẪU ═══════════════════════
 
const INITIAL_POSTS: MockPost[] = [
  {
    id: "1",
    slug: "10-meo-luyen-listening-ielts-hieu-qua",
    title: "10 Mẹo Luyện Listening IELTS Hiệu Quả Cho Người Mới Bắt Đầu",
    excerpt:
      "Listening là kỹ năng khiến nhiều thí sinh lo lắng nhất. Bài viết này chia sẻ 10 phương pháp đã được kiểm chứng giúp bạn cải thiện band điểm Listening từ 5.0 lên 7.0 chỉ trong 3 tháng.",
    thumbnailUrl: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=800&h=450&fit=crop",
    author: "VESTA Academy",
    createdAt: "15/03/2026",
    readTime: "8 phút đọc",
    tags: ["Listening", "Tips", "Beginner"],
    status: "PUBLISHED",
    content: `
      <h2>Tại sao Listening lại khó?</h2>
      <p>Phần thi Listening trong IELTS yêu cầu thí sinh nghe và trả lời 40 câu hỏi trong khoảng 30 phút. Âm thanh chỉ được phát <strong>một lần duy nhất</strong>, không có cơ hội nghe lại.</p>
      <p>Tuy nhiên, với phương pháp luyện tập đúng đắn, bạn hoàn toàn có thể đạt band 7.0+. Dưới đây là 10 mẹo mà VESTA Academy đã áp dụng thành công cho hàng trăm học viên.</p>
      <h2>1. Nghe chủ động, không nghe thụ động</h2>
      <p>Nhiều bạn có thói quen bật podcast tiếng Anh làm "nhạc nền". Cách này gần như <strong>không hiệu quả</strong>. Thay vào đó, hãy dành 20 phút mỗi ngày nghe tập trung 100%.</p>
      <h2>2. Làm quen với nhiều giọng nói</h2>
      <p>IELTS sử dụng giọng Anh, Úc, Mỹ, và cả giọng Ấn Độ. Hãy xoay vòng giữa BBC, CNN, ABC Australia.</p>
      <h2>3. Phương pháp "Nghe — Viết — So"</h2>
      <ul>
        <li><strong>Nghe</strong> một đoạn audio 1-2 phút</li>
        <li><strong>Viết</strong> lại mọi thứ bạn nghe được (dictation)</li>
        <li><strong>So</strong> với transcript gốc — đánh dấu những từ bỏ sót</li>
      </ul>
      <p>Lặp lại quy trình này 30 ngày, bạn sẽ thấy sự khác biệt rõ rệt.</p>
      <blockquote><p>"Listening không phải là tài năng bẩm sinh — đó là kỹ năng luyện được."</p></blockquote>
    `,
  },
  {
    id: "2",
    slug: "cach-viet-ielts-writing-task-2-dat-band-7",
    title: "Cách Viết IELTS Writing Task 2 Đạt Band 7+ Từ Con Số 0",
    excerpt:
      "Writing Task 2 chiếm 2/3 điểm Writing và là phần khiến nhiều thí sinh Việt Nam điểm thấp nhất. Bài viết phân tích chi tiết cấu trúc bài luận và những lỗi cần tránh.",
    thumbnailUrl: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&h=450&fit=crop",
    author: "VESTA Academy",
    createdAt: "12/03/2026",
    readTime: "12 phút đọc",
    tags: ["Writing", "Task 2", "Band 7+"],
    status: "PUBLISHED",
    content: `
      <h2>Task 2 quan trọng như thế nào?</h2>
      <p>Task 2 chiếm <strong>gấp đôi</strong> số điểm so với Task 1. Nếu bạn viết Task 2 tốt, bạn vẫn có thể đạt band 7.0 overall Writing.</p>
      <h2>4 tiêu chí chấm điểm</h2>
      <ul>
        <li><strong>Task Response:</strong> Trả lời đúng câu hỏi</li>
        <li><strong>Coherence & Cohesion:</strong> Mạch lạc, liên kết</li>
        <li><strong>Lexical Resource:</strong> Vốn từ phong phú</li>
        <li><strong>Grammatical Range & Accuracy:</strong> Ngữ pháp đa dạng, chính xác</li>
      </ul>
      <h2>Cấu trúc bài luận chuẩn band 7</h2>
      <ul>
        <li><strong>Introduction (3-4 câu):</strong> Paraphrase đề + thesis statement</li>
        <li><strong>Body 1 (6-8 câu):</strong> Luận điểm 1 + giải thích + ví dụ</li>
        <li><strong>Body 2 (6-8 câu):</strong> Luận điểm 2 + giải thích + ví dụ</li>
        <li><strong>Conclusion (2-3 câu):</strong> Tóm tắt quan điểm</li>
      </ul>
      <blockquote><p>"Bí quyết Writing band 7 không phải viết hay — mà là viết đúng cấu trúc và ít lỗi ngữ pháp."</p></blockquote>
    `,
  },
  {
    id: "3",
    slug: "tu-vung-ielts-theo-chu-de-50-tu-must-know",
    title: "Từ Vựng IELTS Theo Chủ Đề: 50 Từ Must-Know Cho Band 6.0+",
    excerpt:
      "Tổng hợp 50 từ vựng học thuật quan trọng nhất theo 5 chủ đề thường gặp: Education, Technology, Environment, Health và Society.",
    thumbnailUrl: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=800&h=450&fit=crop",
    author: "VESTA Academy",
    createdAt: "08/03/2026",
    readTime: "10 phút đọc",
    tags: ["Vocabulary", "Band 6+", "Study Guide"],
    status: "PUBLISHED",
    content: `
      <h2>Tại sao từ vựng theo chủ đề quan trọng?</h2>
      <p>Từ vựng không chỉ ảnh hưởng đến Writing và Speaking mà còn giúp bạn hiểu nhanh hơn trong Reading và Listening. Hãy học theo <strong>10 chủ đề thi IELTS phổ biến nhất</strong>.</p>
      <h2>1. Education — 10 từ</h2>
      <ul>
        <li><strong>curriculum</strong>: The national curriculum should include more practical subjects.</li>
        <li><strong>academic performance</strong>: influenced by many factors.</li>
        <li><strong>vocational training</strong>: provides practical skills for specific careers.</li>
      </ul>
      <h2>2. Technology — 10 từ</h2>
      <ul>
        <li><strong>artificial intelligence</strong>: transforming the healthcare industry.</li>
        <li><strong>automation</strong>: may lead to job displacement.</li>
        <li><strong>digital literacy</strong>: now considered a fundamental skill.</li>
      </ul>
      <blockquote><p>"Biết 50 từ nhưng dùng được cả 50 — tốt hơn biết 500 từ nhưng chỉ dùng được 50."</p></blockquote>
    `,
  },
  {
    id: "4",
    slug: "speaking-ielts-part-2-cach-noi-2-phut-khong-het-y",
    title: "Speaking IELTS Part 2: Cách Nói Đủ 2 Phút Mà Không Hết Ý",
    excerpt:
      "Part 2 yêu cầu nói liên tục 2 phút — nỗi sợ lớn nhất của thí sinh Việt. Bài viết hướng dẫn framework PAST giúp triển khai ý tưởng mượt mà.",
    thumbnailUrl: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&h=450&fit=crop",
    author: "VESTA Academy",
    createdAt: "05/03/2026",
    readTime: "7 phút đọc",
    tags: ["Speaking", "Part 2", "Framework"],
    status: "DRAFT",
    content: `
      <h2>Framework PAST — Nói đủ 2 phút dễ dàng</h2>
      <ul>
        <li><strong>P — Point:</strong> Nêu câu trả lời chính</li>
        <li><strong>A — Add detail:</strong> Thêm chi tiết (khi nào, ở đâu, với ai)</li>
        <li><strong>S — Story:</strong> Kể một câu chuyện ngắn</li>
        <li><strong>T — Thought:</strong> Chia sẻ cảm xúc, suy nghĩ</li>
      </ul>
      <blockquote><p>"Part 2 không phải bài thuyết trình — đó là cuộc trò chuyện một chiều."</p></blockquote>
    `,
  },
];
 
// ═══════════════════════ ZUSTAND STORE ═══════════════════════
 
interface PostStore {
  posts: MockPost[];
  getById: (id: string) => MockPost | undefined;
  getBySlug: (slug: string) => MockPost | undefined;
  getPublished: () => MockPost[];
  create: (data: PostFormData) => MockPost;
  update: (id: string, data: PostFormData) => MockPost | undefined;
  remove: (id: string) => void;
}
 
/**
 * Helper: tạo slug từ tiêu đề tiếng Việt
 */
function createSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}
 
/**
 * Helper: ước tính thời gian đọc
 */
function estimateReadTime(html: string): string {
  const textOnly = html.replace(/<[^>]*>/g, "");
  const wordCount = textOnly.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(wordCount / 200));
  return `${minutes} phút đọc`;
}
 
/**
 * Helper: format ngày hiện tại dd/mm/yyyy
 */
function formatToday(): string {
  const d = new Date();
  return `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()}`;
}
 
export const usePostStore = create<PostStore>((set, get) => ({
  posts: INITIAL_POSTS,
 
  getById: (id) => get().posts.find((p) => p.id === id),
 
  getBySlug: (slug) => get().posts.find((p) => p.slug === slug),
 
  getPublished: () => get().posts.filter((p) => p.status === "PUBLISHED"),
 
  create: (data) => {
    const newPost: MockPost = {
      id: String(Date.now()),
      slug: createSlug(data.title),
      title: data.title,
      excerpt: data.excerpt,
      content: data.content,
      thumbnailUrl: data.thumbnailUrl || "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=450&fit=crop",
      author: "VESTA Academy",
      createdAt: formatToday(),
      readTime: estimateReadTime(data.content),
      tags: data.tags,
      status: data.status,
    };
    set((state) => ({ posts: [newPost, ...state.posts] }));
    return newPost;
  },
 
  update: (id, data) => {
    let updated: MockPost | undefined;
    set((state) => ({
      posts: state.posts.map((p) => {
        if (p.id !== id) return p;
        updated = {
          ...p,
          title: data.title,
          slug: createSlug(data.title),
          excerpt: data.excerpt,
          content: data.content,
          thumbnailUrl: data.thumbnailUrl || p.thumbnailUrl,
          tags: data.tags,
          status: data.status,
          readTime: estimateReadTime(data.content),
        };
        return updated;
      }),
    }));
    return updated;
  },
 
  remove: (id) => {
    set((state) => ({ posts: state.posts.filter((p) => p.id !== id) }));
  },
}));
 
// ═══════════════════════ EXPORT HELPERS (cho trang blog public) ═══════════════════════
 
export function getPostBySlug(slug: string): MockPost | undefined {
  return usePostStore.getState().getBySlug(slug);
}
 
export function getPublishedPosts(): MockPost[] {
  return usePostStore.getState().getPublished();
}
 
export function getAllPosts(): MockPost[] {
  return usePostStore.getState().posts;
}
 
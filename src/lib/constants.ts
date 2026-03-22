export const SITE_INFO = {
  name: "VESTA",
  tagline: "Fast Track to High Scores · Since 2012",
  phone: "083 877 9988",
  phoneHref: "tel:0838779988",
  website: "vestaedu.online",
  websiteHref: "https://www.vestaedu.online",
  email: "vestaacademyvn@gmail.com",
  facebook: "VestaAcademyVN",
  facebookHref: "https://facebook.com/VestaAcademyVN",
  address: "Ngõ 60 Hoàng Quốc Việt, Cầu Giấy, Hà Nội",
  registerLink: "https://goo.gl/xahbn4",
  achievementsLink: "https://www.facebook.com/VestaAcademyVN/photos",
  bankName: "TECHCOMBANK",
  bankAccount: "123777789",
  bankHolder: "VESTA UNI",
} as const;

// ═══════════════════════ NAVIGATION ═══════════════════════

export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

export const NAV_ITEMS: NavItem[] = [
  { label: "Các Khóa Học", href: "/#courses" },
  { label: "Học Phí", href: "/#tuition" },
  { label: "Sách & Giáo Trình", href: "/#books" },
  { label: "Blog IELTS Tips", href: "/blog" },
  { label: "Đăng Ký Kiểm Tra", href: "/dang-ky-kiem-tra" },
  { label: "Đăng Ký Học", href: SITE_INFO.registerLink, external: true },
  { label: "Thành Tích Học Sinh", href: SITE_INFO.achievementsLink, external: true },
];

// ═══════════════════════ HERO ═══════════════════════

export const HERO_MILESTONES = ["5.0+", "6.0+", "7.0+"] as const;

// ═══════════════════════ COURSES ═══════════════════════

export type AccentType = "blue" | "gold" | "silver" | "mixed";
export type BadgeType = "target" | "special";

export interface Course {
  id: string;
  title: string;
  accent: AccentType;
  badge: { label: string; type: BadgeType };
  features: string[];
  meta: { icon: string; label: string; chipType: "time" | "price" | "schedule" }[];
  dates?: string;
  datesNote?: string;
}

export const COURSES: Course[] = [
  {
    id: "ielts-5",
    title: "IELTS 5+",
    accent: "blue",
    badge: { label: "Đầu ra 5.0+", type: "target" },
    features: [
      "Nạp 200 từ vựng học thuật/tuần, xoay quanh 10 chủ điểm thi IELTS",
      "Xây dựng ngữ pháp từ trình độ 2.0, cam kết viết thạo bài luận chuẩn 5.5 sau một khóa",
      "Rèn kỹ năng nghe, nói, đọc, viết bài bản - đặc biệt đẩy bật kỹ năng đọc và nghe",
    ],
    meta: [
      { icon: "⏰", label: "10 tuần · 30 buổi", chipType: "time" },
      { icon: "🕕", label: "18:00-19:30 T2,4,6 hoặc T3,4,7", chipType: "schedule" },
      { icon: "💰", label: "8.400.000đ", chipType: "price" },
      { icon: "", label: "Online: 7.800.000đ", chipType: "schedule" },
    ],
    dates: "23/2, 17/3, 20/4, 26/5, 22/6, 28/7",
    datesNote: "1 buổi/tuần ôn tập kiểm tra - không học mới, không quá tải.",
  },
  {
    id: "ielts-6",
    title: "IELTS 6+",
    accent: "gold",
    badge: { label: "Đầu ra 6.0+", type: "target" },
    features: [
      "Nạp 300 từ vựng học thuật/tuần, xoay quanh 10 chủ điểm thi IELTS",
      "Củng cố ngữ pháp, cam kết viết thạo bài luận chuẩn 6.5 sau một khóa",
      "Rèn bài bản kỹ thuật viết Task 1 chuẩn 6.5",
      "Luyện sâu kỹ năng đọc, nghe, chuẩn âm kỹ năng nói",
    ],
    meta: [
      { icon: "⏰", label: "12 tuần · 36 buổi", chipType: "time" },
      { icon: "🕗", label: "20:00–21:30 T2,4,6", chipType: "schedule" },
      { icon: "💰", label: "12.000.000đ", chipType: "price" },
      { icon: "", label: "Online: 11.400.000đ", chipType: "schedule" },
    ],
    dates: "16/3, 13/4, 4/5, 15/6, 6/7",
  },
  {
    id: "ielts-7",
    title: "IELTS 7+",
    accent: "gold",
    badge: { label: "Đầu ra 7.0+", type: "target" },
    features: [
      "Nạp 500 từ vựng học thuật/tuần, xoay quanh 10 chủ điểm thi IELTS",
      "Rèn bài bản kỹ thuật đọc, nghe đạt 8+",
      "Học kỹ thuật trả lời Speaking dự đoán cho kỳ thi",
      "Cam kết viết thạo bài luận chuẩn 7+ sau một khóa",
    ],
    meta: [
      { icon: "⏰", label: "45 buổi · 15–30 tuần", chipType: "time" },
      { icon: "🕖", label: "19:30–21:00 T3,5 hoặc T3,5,7", chipType: "schedule" },
      { icon: "💰", label: "13.600.000đ", chipType: "price" },
      { icon: "", label: "Online: 12.800.000đ", chipType: "schedule" },
    ],
    dates: "24/3, 5/5, 9/6, 21/7",
  },
  {
    id: "ielts-1-1",
    title: "IELTS 1-1 Phá Tắc Band",
    accent: "mixed",
    badge: { label: "Cá nhân hóa", type: "special" },
    features: [
      "Lộ trình nhanh nhất, bài tập thiết kế riêng theo năng lực từng học viên",
      "Nạp đủ từ vựng cho các chủ điểm thi IELTS",
      "Bài viết và ý mẫu cho 400 đề thi dự đoán · Chấm chữa không giới hạn",
      "Bài nói mẫu dựng sẵn với 350 câu hỏi dự đoán",
      "Cam kết tăng ít nhất 1 band sau 1 khóa",
    ],
    meta: [{ icon: "💰", label: "Liên hệ tư vấn", chipType: "price" }],
  },
  {
    id: "ielts-intensive",
    title: "IELTS Intensive Bứt Phá",
    accent: "blue",
    badge: { label: "6.0+ → 7.0+", type: "target" },
    features: [
      "Đầu vào 6.0+, đầu ra 7.0 trở lên",
      "Luyện đề đọc nghe, chữa viết nói không giới hạn",
      "Đề dự đoán tỉ lệ trúng cao, template nói viết độc đáo",
      "Chống lười và tăng band hiệu quả",
    ],
    meta: [
      { icon: "⏰", label: "60 buổi liên tục", chipType: "time" },
      { icon: "", label: "10:00–16:30 T2–T7", chipType: "schedule" },
      { icon: "💰", label: "7.890.000đ", chipType: "price" },
    ],
  },
  {
    id: "writing",
    title: "Viết — Phá Tắc Band Điểm",
    accent: "gold",
    badge: { label: "Writing 7+", type: "target" },
    features: [
      "20 buổi cam kết bật điểm viết lên band 7+",
      "Phương pháp viết chuẩn 4 tiêu chí chấm điểm",
      "Luyện 100 đề dự đoán mới nhất, chuẩn bị ý tưởng và từ vựng từng dạng đề",
      "Chấm và chữa bài không giới hạn",
    ],
    meta: [
      { icon: "⏰", label: "20 buổi", chipType: "time" },
      { icon: "", label: "15:30 chiều T2, T4, T6", chipType: "schedule" },
      { icon: "💰", label: "7.700.000đ", chipType: "price" },
    ],
  },
  {
    id: "pronunciation",
    title: "Phát Âm Cơ Bản",
    accent: "silver",
    badge: { label: "Tối đa 4 người", type: "special" },
    features: [
      "Sửa triệt để lỗi phát âm phổ biến của người Việt",
      "Luyện âm gió, âm cuối, nối âm và ngữ điệu tự nhiên",
      "Dành cho người mất gốc, nói đều, nói lắp, nói ngọng, thiếu trọng âm",
      "Cam kết phản xạ phát âm đúng khi nói câu hoàn chỉnh",
    ],
    meta: [
      { icon: "⏰", label: "8 tuần · 24 buổi", chipType: "time" },
      { icon: "", label: "Giờ tùy chọn", chipType: "schedule" },
      { icon: "💰", label: "5.500.000đ", chipType: "price" },
    ],
  },
  {
    id: "exam-registration",
    title: "Hỗ Trợ Đăng Ký Thi IELTS",
    accent: "silver",
    badge: { label: "BC & IDP", type: "special" },
    features: [
      "Đăng ký thi IELTS tại British Council & IDP",
      "Chọn ca thi Speaking phù hợp",
      "Quà tặng: Gói ôn luyện Premium Ready của BC trong 123 ngày",
    ],
    meta: [
      { icon: "💰", label: "4.550.000đ (gốc 4.664.000đ)", chipType: "price" },
    ],
  },
];

// ═══════════════════════ TUITION ═══════════════════════

export interface TuitionItem {
  icon: string;
  content: string;
  highlight?: boolean;
}

export const TUITION_ITEMS: TuitionItem[] = [
  {
    icon: "💳",
    content:
      'Học phí đóng <strong>theo khóa, trước khai giảng 1 tuần</strong>. Bao gồm phí mở tài khoản hệ thống, tài liệu, link luyện tập hằng ngày, và các buổi học trực tiếp với giáo viên.',
  },
  {
    icon: "🎁",
    content:
      'Học viên có thể <strong>học thử miễn phí buổi đầu</strong>. Do lượng đăng ký đông, học viên học thử cần dự tính trước việc sẽ bị lùi sang khóa sau.',
  },
  {
    icon: "🔄",
    content:
      'Nghỉ sau khi học chính thức: <strong>hoàn 50% học phí</strong> (trừ phí học liệu). Nghỉ sau 5 buổi: <strong>không hoàn học phí</strong>. Bị buộc dừng: không tiếp cận kho học liệu, không hoàn phí.',
  },
  {
    icon: "🏆",
    content:
      '<strong>Giảm 5%</strong> cho học sinh cũ. <strong>Học bổng 30%</strong> cho hoàn cảnh khó khăn (gửi thư xin bài test — cần đạt 90% để nhận học bổng).',
    highlight: true,
  },
];

// ═══════════════════════ BOOKS ═══════════════════════

export interface Book {
  icon: string;
  title: string;
  price: string;
  priceNote?: string;
  featured?: boolean;
}

export const BOOKS: Book[] = [
  { icon: "📘", title: "Giáo Trình 5+", price: "269K" },
  { icon: "📙", title: "Giáo Trình 6+", price: "289K" },
  { icon: "📗", title: "Giáo Trình 7+", price: "279K" },
  { icon: "✨", title: "SPARK 1", price: "777K" },
  { icon: "🌟", title: "SPARK 2", price: "888K" },
  {
    icon: "🎁",
    title: "Combo 2 cuốn SPARK",
    price: "1.456K",
    priceNote: "/ 2 cuốn",
    featured: true,
  },
];
